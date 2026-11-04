#!/usr/bin/env node
/**
 * barrido.js - Primer paso del día: junta lo que publicó la prensa chilena
 * y lo deja como material bruto para la preselección.
 *
 *   node scripts/barrido.js              → barrido de hoy
 *   node scripts/barrido.js --dry        → no escribe archivos, solo reporta
 *
 * Lee contenido/barrido/fuentes.json (feeds directos + consultas de Google
 * News) y escribe contenido/barrido/AAAA-MM-DD.json y .md.
 *
 * Por qué un script y no una IA: bajar y deduplicar es mecánico, gratis y
 * verificable. La inteligencia se gasta en seleccionar, no en descargar.
 *
 * Nunca falla la edición: si una fuente cae, se anota y se sigue. Si el
 * barrido entero falla, GPT investiga como siempre.
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join("contenido", "barrido");
const DIAS_MEMORIA = 7;          // ventana para detectar temas que continúan
// El barrido corre de madrugada y alimenta la edición de HOY: solo entra lo
// publicado desde la medianoche de AYER en Chile. Sin esto, una noticia de
// hace tres días vuelve a aparecer como si fuera nueva.
const TIMEOUT_MS = 15000;
const CONCURRENCIA = 6;
const SIN_ESCRIBIR = process.argv.includes("--dry");
// --si-falta: no escribir si el barrido de hoy ya existe. Es la guarda contra
// el cron atrasado de GitHub: sin ella, un disparo de la tarde pisaría el
// barrido de la madrugada con material de otra ventana y ensuciaría la
// continuidad de los días siguientes.
const SOLO_SI_FALTA = process.argv.includes("--si-falta");

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

// ---------- utilidades ----------
const desescapar = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// clave de identidad de una noticia: titular sin tildes, sin puntuación y sin
// las palabras vacías que los medios cambian entre sí ("el", "la", "de"...).
const VACIAS = new Set(["el","la","los","las","un","una","de","del","al","y","o","en","a","por","para","con","que","se","su","sus","es","son","tras","sobre","desde","hasta"]);
const clave = (titulo) => titulo.toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9\s]/g, " ")
  .split(/\s+/).filter((p) => p.length > 2 && !VACIAS.has(p))
  .sort().join(" ");

// Medianoche de ayer en Chile, como instante UTC. El desfase se calcula en
// vivo para que el cambio de hora de septiembre no lo rompa.
function desdeCuando(fechaHoy) {
  const ahora = new Date();
  const offsetMs = new Date(ahora.toLocaleString("en-US", { timeZone: "America/Santiago" }))
                 - new Date(ahora.toLocaleString("en-US", { timeZone: "UTC" }));
  const [Y, M, D] = fechaHoy.split("-").map(Number);
  return Date.UTC(Y, M - 1, D) - offsetMs - 24 * 3600 * 1000;
}

async function bajar(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; EntenderChile/1.0; barrido diario)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally { clearTimeout(t); }
}

// EL LINK ROTO DE INTERFERENCIA (03-11-2026). El <link> del feed de
// Interferencia no trae una URL sino una etiqueta <a href="/articulos/...">
// entera; al tomarla literal queda pegada al dominio y percent-encoded
// ("https://interferencia.cl/%3Ca%20href%3D%22/articulos/..."). Pasó tres
// días seguidos (01, 02 y 03-11-2026) y esas noticias llegaban al barrido sin
// un enlace que se pudiera abrir. Se decodifica, se saca el href con el mismo
// patrón que el link de Atom y se resuelve contra el dominio del medio.
function arreglarUrlInterferencia(url) {
  if (!/^https:\/\/interferencia\.cl\/%3Ca/i.test(url)) return url;
  let crudo;
  try { crudo = decodeURIComponent(url.slice("https://interferencia.cl/".length)); }
  catch { return url; }
  const m = crudo.match(/<a[^>]*href="([^"]+)"/i);
  if (!m) return url;
  try { return new URL(m[1], "https://interferencia.cl").href; }
  catch { return url; }
}

// Parser de RSS/Atom suficiente para feeds de prensa (sin dependencias).
function parsear(xml, medioPorDefecto) {
  const bloques = xml.split(/<item[\s>]|<entry[\s>]/).slice(1);
  const campo = (b, tag) => {
    const m = b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
    return m ? desescapar(m[1]) : "";
  };
  return bloques.map((b) => {
    let titulo = campo(b, "title");
    const medioEtiqueta = campo(b, "source");
    // Google News titula "Titular - Medio": se separa
    let medio = medioEtiqueta || medioPorDefecto;
    if (medioEtiqueta) {
      const corte = titulo.lastIndexOf(` - ${medioEtiqueta}`);
      if (corte > 0) titulo = titulo.slice(0, corte).trim();
    }
    let url = campo(b, "link");
    if (!url) { const m = b.match(/<link[^>]*href="([^"]+)"/i); if (m) url = m[1]; }
    url = arreglarUrlInterferencia(url);
    const publicado = campo(b, "pubDate") || campo(b, "published") || campo(b, "updated");
    return { titulo, medio, url, publicado };
  }).filter((n) => n.titulo && n.titulo.length > 15);
}

async function enTandas(items, fn) {
  const salida = [];
  for (let i = 0; i < items.length; i += CONCURRENCIA) {
    salida.push(...await Promise.all(items.slice(i, i + CONCURRENCIA).map(fn)));
  }
  return salida;
}

// ---------- barrido ----------
async function main() {
  if (SOLO_SI_FALTA && fs.existsSync(path.join(DIR, `${fecha}.md`))) {
    console.log(`El barrido del ${fecha} ya existe; nada que hacer (--si-falta).`);
    return;
  }
  const cfg = JSON.parse(fs.readFileSync(path.join(DIR, "fuentes.json"), "utf8"));

  const objetivos = [
    ...cfg.feeds.map((f) => ({ tipo: "feed", id: f.id, area: null, medio: f.medio, url: f.url })),
    ...cfg.consultas.map((c) => ({
      tipo: "consulta", id: c.id, area: c.area, medio: null,
      url: `https://news.google.com/rss/search?q=${encodeURIComponent(c.q + " when:1d")}&hl=es-419&gl=CL&ceid=CL:es-419`,
    })),
  ];

  console.log(`Barrido del ${fecha}: ${objetivos.length} fuentes (${cfg.feeds.length} feeds, ${cfg.consultas.length} consultas).\n`);

  const fallas = [];
  const crudas = await enTandas(objetivos, async (o) => {
    try {
      const xml = await bajar(o.url);
      const items = parsear(xml, o.medio);
      console.log(`  ${items.length.toString().padStart(3)} · ${o.id}`);
      return items.map((n) => ({ ...n, origen: o.id, area: o.area }));
    } catch (e) {
      console.log(`    ✗ ${o.id}: ${e.message}`);
      fallas.push({ id: o.id, url: o.url, error: e.message });
      return [];
    }
  });

  // Ventana del día: fuera lo publicado antes de ayer. Lo que no trae fecha
  // legible NO se descarta (varios feeds la omiten), pero queda marcado y solo
  // llega al listado de trabajo si otra fuente lo corrobora.
  const desde = desdeCuando(fecha);
  let fueraDeVentana = 0, sinFecha = 0;
  const enVentana = crudas.flat().filter((n) => {
    const t = Date.parse(n.publicado || "");
    if (!Number.isFinite(t)) { n.sin_fecha = true; sinFecha++; return true; }
    if (t < desde) { fueraDeVentana++; return false; }
    return true;
  });

  // deduplicar dentro del día: se conserva la primera aparición y se anota
  // en cuántas fuentes salió (una noticia en 5 medios pesa distinto que en 1)
  const porClave = new Map();
  for (const n of enVentana) {
    const k = clave(n.titulo);
    if (!k) continue;
    const previa = porClave.get(k);
    if (previa) {
      previa.repeticiones++;
      if (n.area && !previa.areas.includes(n.area)) previa.areas.push(n.area);
      if (!previa.medios.includes(n.medio)) previa.medios.push(n.medio);
      if (!previa.origenes.includes(n.origen)) previa.origenes.push(n.origen);
    } else {
      porClave.set(k, {
        clave: k, titulo: n.titulo, medio: n.medio, url: n.url, publicado: n.publicado,
        origen: n.origen, origenes: [n.origen],
        areas: n.area ? [n.area] : [], medios: [n.medio], repeticiones: 1, visto_antes: null,
      });
    }
  }

  // continuidad: ¿este tema ya apareció en los días previos?
  const previos = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f < `${fecha}.json`).sort().slice(-DIAS_MEMORIA)
    : [];
  const historia = new Map();
  for (const f of previos) {
    const dia = f.replace(".json", "");
    try {
      for (const n of JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")).noticias || []) {
        if (!historia.has(n.clave)) historia.set(n.clave, dia);
      }
    } catch { /* un barrido corrupto no rompe el de hoy */ }
  }
  let continuan = 0;
  for (const n of porClave.values()) {
    const desde = historia.get(n.clave);
    if (desde) { n.visto_antes = desde; continuan++; }
  }

  // orden: primero lo que más medios levantaron (proxy de relevancia)
  const noticias = [...porClave.values()].sort((a, b) =>
    b.repeticiones - a.repeticiones || a.titulo.localeCompare(b.titulo));

  // Ruido evidente: se marca, no se borra. Un partido de fútbol no entra al
  // informe, pero la quiebra de un club sí, y esa distinción no la hace un regex.
  const RUIDO = /\b(en vivo|minuto a minuto|horóscopo|farándula|streaming|dónde ver|a qué hora juega|formaciones|resultado del sorteo|loto|kino|dólar hoy|cotización de cierre)\b/i;
  for (const n of noticias) if (RUIDO.test(n.titulo)) n.ruido_probable = true;

  // Corroboración POR TEMA: el mismo hecho contado con titulares distintos.
  // El 29-08 un tornado en Ñuble salió en tres medios con tres titulares y
  // ninguno pasó, porque la corroboración exigía el titular idéntico. Dos
  // noticias de medios distintos que comparten TRES palabras poco comunes del
  // día (cada una en 8 titulares o menos, con plural quitado) se cuentan como
  // corroboradas entre sí. Calibrado el 29-08 sobre 777 titulares: con una
  // sola palabra rara entraban 400-600 falsos (piloto/pilotos, trayectoria);
  // con tres, +104 y casi todos reales. Se anota el motivo; la olla juzga.
  const PARADAS = new Set(["chile","chileno","chilena","chilenos","gobierno","santiago","region","regional","nuevo","nueva","nuevos","nuevas","contra","despues","durante","sobre","entre","hasta","desde","segun","porque","cuando","donde","mientras","tambien","ministro","ministra","ministerio","presidente","diputado","diputada","diputados","senador","senadora","senado","camara","proyecto","personas","millones","pesos","anuncia","anuncian","podria","podrian","habria","tras","hacia","ahora","hoy","ayer","manana","semana","sigue","siguen","frente","parte","primer","primera","mayor","menor","gran","grande"]);
  const norm = (t) => (t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const raiz = (w) => (w.length > 5 ? w.replace(/(es|s)$/, "") : w);
  const tokens = (t) => new Set(norm(t).split(/[^a-z0-9ñ]+/).filter((w) => w.length >= 5 && !PARADAS.has(w)).map(raiz));
  const df = new Map();
  const toks = noticias.map((n) => { const s = tokens(n.titulo); for (const w of s) df.set(w, (df.get(w) || 0) + 1); return s; });
  let porTema = 0;
  for (let i = 0; i < noticias.length; i++) {
    const a = noticias[i];
    const r8 = new Set([...toks[i]].filter((w) => df.get(w) <= 8));
    if (r8.size < 3) continue;
    for (let j = i + 1; j < noticias.length; j++) {
      const b = noticias[j];
      if (a.medios.some((m) => b.medios.includes(m))) continue; // el mismo medio no se corrobora a sí mismo
      let c8 = 0;
      for (const w of toks[j]) if (r8.has(w)) c8++;
      if (c8 >= 3) {
        a.mismo_tema = (a.mismo_tema || 0) + 1; b.mismo_tema = (b.mismo_tema || 0) + 1;
        (a.relacionadas ||= []).push(b.titulo); (b.relacionadas ||= []).push(a.titulo);
        porTema++;
      }
    }
  }

  // Palabras de ALARMA: una emergencia o un hecho grave entra con señal aunque
  // un solo medio lo haya dado todavía (el tornado del 29-08 a las 02:11 lo
  // tenía un medio regional; a las 03:10 la olla ya había cerrado). Lista
  // corta y literal: +18 sobre 777 titulares el 29-08, todos pertinentes.
  const ALARMA = /\b(tornado|tromba marina|terremoto|sismo|tsunami|aluvi[oó]n|erupci[oó]n|incendio forestal|megaincendio|apag[oó]n|evacuaci[oó]n|evacuan|alerta roja|estado de cat[aá]strofe|estado de excepci[oó]n|toque de queda|derrumbe|explosi[oó]n|descarrilamiento|colapso|femicidio|masacre|balacera|secuestro|fallecidos|muertos|desaparecid[oa]s?|brote|intoxicaci[oó]n|derrame|paro nacional|huelga)\b/i;
  for (const n of noticias) { const m = norm(n.titulo).match(ALARMA); if (m) n.alarma = m[1]; }

  // La vista para la preselección NO es el archivo completo: mil titulares no
  // caben en un prompt. Entra lo que tiene señal, con el motivo explícito.
  const INVESTIGACION = new Set(["ciper", "exante", "interferencia"]);
  const TOPE = 300; // 29-08: con "mismo tema" y "alarma", 250 recortaba (252 con señal)
  // La continuidad NO es pasaje de entrada: las consultas piden dos días, así
  // que casi todo aparece "ayer" también (563 de 588 el 27-08, y el archivo de
  // trabajo se fue a 48 KB). Entra lo corroborado y las exclusivas; que un tema
  // venga de días previos se ANOTA sobre esas, como contexto para el editor.
  for (const n of noticias) {
    n.motivo_destaque =
      n.repeticiones >= 2 ? `corroborada en ${n.repeticiones} fuentes`
      : n.origenes.some((o) => INVESTIGACION.has(o)) ? "exclusiva de medio de investigación"
      : n.mismo_tema ? `mismo tema en ${n.mismo_tema + 1} medios con titulares distintos`
      : n.alarma ? `alarma: ${n.alarma} (un solo medio por ahora)`
      : null;
  }
  const conSenal = noticias
    .filter((n) => n.motivo_destaque && !n.ruido_probable)
    .filter((n) => !n.sin_fecha || n.repeticiones >= 2 || n.mismo_tema || n.alarma);
  const destacadas = conSenal.slice(0, TOPE);
  const cuenta = (pred) => destacadas.filter(pred).length;
  console.log(`  señal: ${cuenta((n) => n.repeticiones >= 2)} corroboradas por titular · ` +
    `${cuenta((n) => n.repeticiones < 2 && n.motivo_destaque.startsWith("exclusiva"))} exclusivas · ` +
    `${cuenta((n) => n.motivo_destaque.startsWith("mismo tema"))} mismo tema · ` +
    `${cuenta((n) => n.motivo_destaque.startsWith("alarma"))} alarma` +
    (conSenal.length > TOPE ? ` · OJO: ${conSenal.length - TOPE} con señal quedaron fuera por el tope de ${TOPE}` : ""));

  const salida = {
    fecha,
    generado: new Date().toISOString(),
    fuentes_consultadas: objetivos.length,
    fuentes_caidas: fallas,
    total_bruto: crudas.flat().length,
    ventana_desde: new Date(desde).toISOString(),
    descartadas_por_antiguas: fueraDeVentana,
    sin_fecha: sinFecha,
    total_unico: noticias.length,
    continuan_de_dias_previos: continuan,
    destacadas: destacadas.length,
    ruido_probable: noticias.filter((n) => n.ruido_probable).length,
    noticias,
  };

  console.log(`\n  bruto ${salida.total_bruto} → ${enVentana.length} en ventana (${fueraDeVentana} antiguas fuera, ${sinFecha} sin fecha) → únicos ${salida.total_unico} · ${destacadas.length} con señal · ${salida.ruido_probable} ruido · ${continuan} vienen de días previos · ${fallas.length} fuentes caídas`);

  if (SIN_ESCRIBIR) { console.log("\n(--dry: no se escribió nada)"); return; }

  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, `${fecha}.json`), JSON.stringify(salida, null, 1));

  // resumen legible: SOLO las destacadas, agrupadas por área. Es lo que lee
  // la tarea de preselección; el JSON queda como archivo completo del día.
  const porArea = new Map();
  for (const n of destacadas) {
    const a = n.areas[0] || "Sin área";
    if (!porArea.has(a)) porArea.set(a, []);
    porArea.get(a).push(n);
  }
  const dm = (f) => f.split("-").reverse().join("-");
  // Las URL de Google News son redirecciones largas, pero SIN ellas la
  // preselección citaba la portada o la sección del medio en vez de la nota
  // (auditorías del 18, 20 y 21-09). Se imprimen igual, marcadas: en el
  // navegador redirigen a la nota, y son mejor cita que una portada.
  const linea = (n) => `- ${n.titulo}\n  ${n.medios.slice(0, 3).join(", ")} · ${n.motivo_destaque}` +
    (n.visto_antes ? ` (desde el ${dm(n.visto_antes)})` : "") +
    (n.url ? `\n  ${n.url}${n.url.includes("news.google.com") ? "  (vía Google News: redirige a la nota; cita esta y no la portada del medio)" : ""}` : "");
  const md = [
    `# Barrido del ${dm(fecha)}`, "",
    `${destacadas.length} noticias con señal, de ${salida.total_unico} únicas recogidas en ${objetivos.length} fuentes (${salida.total_bruto} titulares brutos).`,
    `Entra lo corroborado por dos o más fuentes (titular idéntico o tres palabras poco comunes en común entre medios distintos), las exclusivas de medios de investigación y las alarmas (emergencias y hechos graves, aunque las dé un solo medio); venir de días previos se anota como contexto. El resto queda en el JSON del día.`,
    `${continuan} vienen de días previos. ${salida.ruido_probable} descartadas como ruido (deportes en vivo, sorteos, cotización rutinaria).`,
    fallas.length ? `Fuentes caídas: ${fallas.map((f) => f.id).join(", ")}.` : "Ninguna fuente cayó.",
    "", "Material bruto para la preselección: no es contenido publicable ni está verificado.", "",
    ...[...porArea.entries()].map(([area, lista]) =>
      [`## ${area} (${lista.length})`, "", ...lista.map(linea), ""].join("\n")),
  ].join("\n");
  fs.writeFileSync(path.join(DIR, `${fecha}.md`), md);
  console.log(`\n  → ${path.join(DIR, fecha)}.json y .md`);
}

// Se exporta solo para probar el arreglo de Interferencia sin correr el
// barrido; desde la línea de comandos se comporta igual que siempre.
if (require.main === module) {
  main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
}
module.exports = { arreglarUrlInterferencia };
