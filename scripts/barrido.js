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
const TIMEOUT_MS = 15000;
const CONCURRENCIA = 6;
const SIN_ESCRIBIR = process.argv.includes("--dry");

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
  const cfg = JSON.parse(fs.readFileSync(path.join(DIR, "fuentes.json"), "utf8"));

  const objetivos = [
    ...cfg.feeds.map((f) => ({ tipo: "feed", id: f.id, area: null, medio: f.medio, url: f.url })),
    ...cfg.consultas.map((c) => ({
      tipo: "consulta", id: c.id, area: c.area, medio: null,
      url: `https://news.google.com/rss/search?q=${encodeURIComponent(c.q + " when:2d")}&hl=es-419&gl=CL&ceid=CL:es-419`,
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

  // deduplicar dentro del día: se conserva la primera aparición y se anota
  // en cuántas fuentes salió (una noticia en 5 medios pesa distinto que en 1)
  const porClave = new Map();
  for (const n of crudas.flat()) {
    const k = clave(n.titulo);
    if (!k) continue;
    const previa = porClave.get(k);
    if (previa) {
      previa.repeticiones++;
      if (n.area && !previa.areas.includes(n.area)) previa.areas.push(n.area);
      if (!previa.medios.includes(n.medio)) previa.medios.push(n.medio);
    } else {
      porClave.set(k, {
        clave: k, titulo: n.titulo, medio: n.medio, url: n.url, publicado: n.publicado,
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

  // La vista para la preselección NO es el archivo completo: mil titulares no
  // caben en un prompt. Entra lo que tiene señal, con el motivo explícito.
  const INVESTIGACION = new Set(["ciper", "exante", "interferencia"]);
  const TOPE = 250;
  for (const n of noticias) {
    n.motivo_destaque =
      n.visto_antes ? "continúa una historia de días previos"
      : n.repeticiones >= 2 ? `corroborada en ${n.repeticiones} fuentes`
      : INVESTIGACION.has(n.origen) ? "exclusiva de medio de investigación"
      : null;
  }
  const destacadas = noticias.filter((n) => n.motivo_destaque && !n.ruido_probable).slice(0, TOPE);

  const salida = {
    fecha,
    generado: new Date().toISOString(),
    fuentes_consultadas: objetivos.length,
    fuentes_caidas: fallas,
    total_bruto: crudas.flat().length,
    total_unico: noticias.length,
    continuan_de_dias_previos: continuan,
    destacadas: destacadas.length,
    ruido_probable: noticias.filter((n) => n.ruido_probable).length,
    noticias,
  };

  console.log(`\n  bruto ${salida.total_bruto} → únicos ${salida.total_unico} · ${destacadas.length} con señal · ${salida.ruido_probable} ruido · ${continuan} vienen de días previos · ${fallas.length} fuentes caídas`);

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
  // Las URL de Google News son redirecciones de 500 caracteres: ocupan el 70%
  // del archivo y no aportan (el enlace útil está en el JSON). Solo se muestra
  // la URL cuando es directa al medio.
  const linea = (n) => `- ${n.titulo}\n  ${n.medios.slice(0, 3).join(", ")} · ${n.motivo_destaque}` +
    (n.visto_antes ? ` (desde el ${dm(n.visto_antes)})` : "") +
    (n.url && !n.url.includes("news.google.com") ? `\n  ${n.url}` : "");
  const md = [
    `# Barrido del ${dm(fecha)}`, "",
    `${destacadas.length} noticias con señal, de ${salida.total_unico} únicas recogidas en ${objetivos.length} fuentes (${salida.total_bruto} titulares brutos).`,
    `Entra al listado lo que continúa una historia previa, lo corroborado por dos o más fuentes, y las exclusivas de medios de investigación. El resto queda en el JSON del día.`,
    `${continuan} vienen de días previos. ${salida.ruido_probable} descartadas como ruido (deportes en vivo, sorteos, cotización rutinaria).`,
    fallas.length ? `Fuentes caídas: ${fallas.map((f) => f.id).join(", ")}.` : "Ninguna fuente cayó.",
    "", "Material bruto para la preselección: no es contenido publicable ni está verificado.", "",
    ...[...porArea.entries()].map(([area, lista]) =>
      [`## ${area} (${lista.length})`, "", ...lista.map(linea), ""].join("\n")),
  ].join("\n");
  fs.writeFileSync(path.join(DIR, `${fecha}.md`), md);
  console.log(`\n  → ${path.join(DIR, fecha)}.json y .md`);
}

main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
