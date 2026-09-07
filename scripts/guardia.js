#!/usr/bin/env node
/**
 * guardia.js - El agente de guardia: barrido LIVIANO de última hora.
 *
 * Corre cada 2 horas (despertador de la rutina "Guardia" → guardia.yml).
 * No reemplaza al barrido de la madrugada: mira solo lo RECIENTE (últimas
 * VENTANA_H horas) de los feeds de portada y decide, con criterio MECÁNICO,
 * si algo amerita captura inmediata. Diseño aprobado por Santiago el 02-09
 * (bitacora/PENDIENTES.md, "EL AGENTE DE GUARDIA").
 *
 * Criterio "muy importante", 2 de 4 señales sobre el mismo tema (y que NO
 * sea deporte ni farándula: ver FUERA):
 *   ALARMA     una palabra de la lista del barrido en el titular
 *   PORTADAS   el tema aparece en 3 o más medios distintos
 *   INDICADOR  encuesta o cifra de fuente identificable (Cadem, INE, BC...)
 *   ANUNCIADO  calza con un dato que el informe de hoy anunció
 *              (PENDIENTE DE CIERRE de hoy o hito de "Agenda de hoy")
 * Lo ANUNCIADO ya publicado se reporta siempre, aunque sume una sola señal.
 *
 * Si caza algo: escribe contenido/urgente/FECHA-HHMM-<slug>.md con el
 * material bruto (titulares, medios, URLs, señales). La rutina de guardia lo
 * ve aparecer y notifica al teléfono. De-dup: contenido/urgente/.visto.json
 * guarda las claves ya reportadas (3 días) para no re-alertar cada 2 horas.
 *
 * Uso: node scripts/guardia.js [--dry]
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join("contenido", "urgente");
const TIMEOUT_MS = 15000;
const CONCURRENCIA = 6;
const iv = process.argv.indexOf("--ventana");
const VENTANA_H = iv >= 0 ? Number(process.argv[iv + 1]) : 3; // corridas cada 2 h + colchón
const DRY = process.argv.includes("--dry");

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());
const horaChile = new Intl.DateTimeFormat("es-CL", {
  timeZone: "America/Santiago", hour: "2-digit", minute: "2-digit", hour12: false,
}).format(new Date());

// ---- helpers compartidos con el barrido (copiados: barrido.js no es módulo) ----
const desescapar = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const VACIAS = new Set(["el","la","los","las","un","una","de","del","al","y","o","en","a","por","para","con","que","se","su","sus","es","son","tras","sobre","desde","hasta"]);
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const palabras = (t) => norm(t).replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((p) => p.length > 3 && !VACIAS.has(p));
// FUERA DE LA GUARDIA (regla dura 13: el canal no cubre deporte de rutina ni
// farándula). Vivía solo en los prompts, así que el detector la ignoraba: el
// 06-09 el debut de un arquero de Colo Colo juntaba 3 portadas, tantas como la
// encuesta Criteria. Sin este filtro no se puede abrir el umbral sin meter ruido.
const FUERA = /\b(colo.?colo|universidad de chile|la u\b|udechile|católica|wanderers|cobreloa|copa chile|libertadores|sudamericana|la roja|selecci[oó]n chilena|gol(es|azo)?\b|arquero|delantero|entrenador|dt\b|fichaje|transferible|partido|clásico|penal(es)? en el|tenis|atp\b|f[uú]tbol|futbolista|hincha|estadio|farándula|farandula|reality|teleserie|instagram de|romance|pareja de|influencer)\b/i;
// INDICADOR: encuesta o cifra de fuente identificable. Es lo que el canal SÍ
// cubre y quedaba fuera porque una encuesta no trae palabras de alarma: el
// 06-09 se perdieron Criteria (aprobación de Kast en 30%) y Cadem (Argentina),
// las dos con 3 portadas. Señal nueva desde el 06-09, a pedido de Santiago.
const INDICADOR = /\b(cadem|criteria|activa research|panel ciudadano|pulso ciudadano|encuesta|sondeo|imacec|\bipc\b|inflaci[oó]n|desempleo|desocupaci[oó]n|banco central|\bine\b|cuentas nacionales|balanza comercial|tasa de pol[ií]tica monetaria|\btpm\b|aprobaci[oó]n|desaprobaci[oó]n)\b/i;
const ALARMA = /\b(tornado|tromba marina|terremoto|sismo|tsunami|aluvi[oó]n|erupci[oó]n|incendio forestal|megaincendio|apag[oó]n|evacuaci[oó]n|evacuan|alerta roja|estado de cat[aá]strofe|estado de excepci[oó]n|toque de queda|derrumbe|explosi[oó]n|descarrilamiento|colapso|femicidio|masacre|balacera|secuestro|fallecidos|muertos|desaparecid[oa]s?|brote|intoxicaci[oó]n|derrame|paro nacional|huelga|renuncia del ministro|renunci[oó]|muere|muri[oó]|asesinat[oa]|homicidio|cat[aá]strofe|accidente|choque|colisi[oó]n|emergencia|atentado|bomba|tiroteo|reh[eé]n|fuga masiva|mot[ií]n|socav[oó]n|marejada|inundaci[oó]n|desborde)\b/i;

async function bajar(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; EntenderChile/1.0; guardia)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally { clearTimeout(t); }
}
function parsear(xml, medioPorDefecto) {
  const bloques = xml.split(/<item[\s>]|<entry[\s>]/).slice(1);
  const campo = (b, tag) => {
    const m = b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
    return m ? desescapar(m[1]) : "";
  };
  return bloques.map((b) => {
    let titulo = campo(b, "title");
    const medioEtiqueta = campo(b, "source");
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

// ---- lo anunciado hoy: PENDIENTE DE CIERRE con fecha de hoy + Agenda ----
function anunciadosDeHoy() {
  const ruta = path.join("contenido", "informes", `${fecha}.md`);
  if (!fs.existsSync(ruta)) return [];
  const md = fs.readFileSync(ruta, "utf8");
  const temas = [];
  for (const m of md.matchAll(/^PENDIENTE DE CIERRE:\s*([^|]+)\|\s*(\S+)/gim)) {
    if (m[2].trim() === fecha) temas.push(m[1].trim());
  }
  const ag = md.match(/##\s*Agenda de hoy([\s\S]*?)(\n##|$)/i);
  if (ag) {
    for (const linea of ag[1].split("\n")) {
      if (/publica|informa|da a conocer|entrega (el|la|los|las)|fallo|sentencia|resoluci[oó]n|dato de|cifra de/i.test(linea) && linea.trim().length > 15)
        temas.push(linea.replace(/^[-*\s]+/, "").trim().slice(0, 120));
    }
  }
  return temas;
}

// ---- agrupar por tema: dos titulares comparten tema si comparten >=3 palabras ----
function agrupar(noticias) {
  const grupos = [];
  for (const n of noticias) {
    n._p = new Set(palabras(n.titulo));
    let mejor = null, mejorComun = 0;
    for (const g of grupos) {
      let comun = 0;
      for (const p of n._p) if (g.palabras.has(p)) comun++;
      if (comun >= 3 && comun > mejorComun) { mejor = g; mejorComun = comun; }
    }
    if (mejor) { mejor.items.push(n); for (const p of n._p) mejor.palabras.add(p); }
    else grupos.push({ items: [n], palabras: new Set(n._p) });
  }
  return grupos;
}

async function main() {
  const cfg = JSON.parse(fs.readFileSync(path.join("contenido", "barrido", "fuentes.json"), "utf8"));
  const desde = Date.now() - VENTANA_H * 3600 * 1000;

  const porFeed = await enTandas(cfg.feeds, async (f) => {
    try { return parsear(await bajar(f.url), f.medio); }
    catch (e) { console.log(`(sin ${f.medio}: ${e.message})`); return []; }
  });
  const recientes = porFeed.flat().filter((n) => {
    const t = Date.parse(n.publicado);
    return Number.isFinite(t) ? t >= desde : false; // sin fecha no entra: el guardia solo mira lo fresco
  });
  console.log(`guardia ${fecha} ${horaChile}: ${recientes.length} titulares en las últimas ${VENTANA_H} h`);

  const anunciados = anunciadosDeHoy();
  const anunciadoDe = (g) => anunciados.find((a) => {
    const pa = new Set(palabras(a));
    let comun = 0;
    for (const p of g.palabras) if (pa.has(p)) comun++;
    return comun >= 2;
  });

  // de-dup contra lo ya reportado (72 h)
  fs.mkdirSync(DIR, { recursive: true });
  const rutaVisto = path.join(DIR, ".visto.json");
  const visto = fs.existsSync(rutaVisto) ? JSON.parse(fs.readFileSync(rutaVisto, "utf8")) : [];
  const corte = Date.now() - 72 * 3600 * 1000;
  const vigentes = visto.filter((v) => v.t >= corte);
  const yaVisto = (firma) => vigentes.some((v) => {
    const pv = new Set(v.firma.split(" "));
    let comun = 0;
    for (const p of firma.split(" ")) if (pv.has(p)) comun++;
    return comun >= 3;
  });

  const hallazgos = [];
  for (const g of agrupar(recientes)) {
    const medios = new Set(g.items.map((i) => i.medio));
    const alarma = g.items.map((i) => norm(i.titulo).match(ALARMA)).find(Boolean);
    const anunciado = anunciadoDe(g);
    const fuera = g.items.every((i) => FUERA.test(norm(i.titulo)));
    const indicador = g.items.map((i) => norm(i.titulo).match(INDICADOR)).find(Boolean);
    const senales = [];
    if (alarma) senales.push(`ALARMA ("${alarma[1]}")`);
    if (medios.size >= 3) senales.push(`PORTADAS (${medios.size} medios)`);
    if (indicador) senales.push(`INDICADOR ("${indicador[1]}")`);
    if (anunciado) senales.push(`ANUNCIADO ("${anunciado.slice(0, 60)}")`);
    if (process.argv.includes("--debug") && (senales.length || medios.size >= 2))
      console.log(`  [debug] ${medios.size} medio(s) · ${senales.join("+") || "sin señal fuerte"}${fuera ? " · FUERA (deporte/farándula)" : ""} · ${g.items[0].titulo.slice(0, 70)}`);
    const importa = (senales.length >= 2 && !fuera) || Boolean(anunciado);
    if (!importa) continue;
    const principal = g.items.slice().sort((a, b) => b.titulo.length - a.titulo.length)[0];
    const firma = palabras(principal.titulo).sort().slice(0, 8).join(" ");
    if (yaVisto(firma)) { console.log(`  (ya reportado: ${principal.titulo.slice(0, 60)})`); continue; }
    hallazgos.push({ principal, g, senales, firma });
  }

  if (!hallazgos.length) { console.log("guardia: sin novedades que ameriten captura."); return; }
  // UNO POR RONDA (06-09): con la señal INDICADOR el detector puede cazar dos
  // temas a la vez (el 06-09: Criteria y Cadem el mismo domingo) y saldrían dos
  // Shorts de golpe. Se queda el más fuerte (más señales, luego más medios); si
  // el otro sigue vigente, la ronda de dos horas después lo toma.
  if (hallazgos.length > 1) {
    hallazgos.sort((a, b) => (b.senales.length - a.senales.length) || (new Set(b.g.items.map((i) => i.medio)).size - new Set(a.g.items.map((i) => i.medio)).size));
    for (const h of hallazgos.slice(1)) console.log(`  (queda para la ronda siguiente: ${h.principal.titulo.slice(0, 60)})`);
    hallazgos.length = 1;
  }

  for (const h of hallazgos) {
    const slug = palabras(h.principal.titulo).slice(0, 4).join("-").slice(0, 48) || "hallazgo";
    const hhmm = horaChile.replace(":", "");
    const ruta = path.join(DIR, `${fecha}-${hhmm}-${slug}.md`);
    const md = [
      `# URGENTE · ${h.principal.titulo}`,
      "",
      `Detectado por el guardia el ${fecha} a las ${horaChile} (hora de Chile).`,
      `Señales: ${h.senales.join(" · ")}.`,
      "",
      "## Titulares del tema (material bruto, sin verificar)",
      ...h.g.items.slice(0, 8).map((i) => `- ${i.titulo} | ${i.medio} | ${i.url}`),
      "",
      "REGLA: toda cifra que se publique a partir de esto debe venir de fuente",
      "primaria u oficial; si solo hay prensa, se atribuye al medio.",
      "",
    ].join("\n");
    if (DRY) { console.log(`[dry] escribiría ${ruta}:\n${md}`); continue; }
    fs.writeFileSync(ruta, md);
    vigentes.push({ t: Date.now(), firma: h.firma });
    console.log(`URGENTE → ${ruta} (${h.senales.join(" · ")})`);
  }
  if (!DRY) fs.writeFileSync(rutaVisto, JSON.stringify(vigentes, null, 1) + "\n");
}

main().catch((e) => { console.error("error del guardia:", e.message); process.exit(1); });
