#!/usr/bin/env node
/**
 * build-timeline.js - Cruza parsed.json con alignment.json (real o simulado)
 * y produce el timeline.json que consume Remotion.
 *
 * Uso: node scripts/build-timeline.js out/parsed.json out/alignment.json out/timeline.json [narracion.mp3]
 */
const fs = require("fs");
const path = require("path");

const [, , parsedPath, alignPath, salida = "out/timeline.json", audioFile = null] = process.argv;
if (!parsedPath || !alignPath) {
  console.error("Uso: node scripts/build-timeline.js <parsed.json> <alignment.json> [timeline.json] [audio.mp3]");
  process.exit(1);
}
const parsed = JSON.parse(fs.readFileSync(parsedPath, "utf8"));
const al = JSON.parse(fs.readFileSync(alignPath, "utf8"));
const starts = al.character_start_times_seconds;
const ends = al.character_end_times_seconds;
const chars = al.characters;

if (chars.length !== parsed.cleanText.length) {
  console.warn(`AVISO: la alineación tiene ${chars.length} caracteres y la narración ${parsed.cleanText.length}. ` +
    "Si usaste ElevenLabs, revisa que enviaste exactamente out/narracion.txt (la alineación puede diferir por normalización).");
}

const esBlanco = (c) => c === " " || c === "\n" || c === "\t";
function rangoTiempo(charStart, charEnd) {
  let i = charStart, j = Math.min(charEnd, chars.length) - 1;
  while (i <= j && esBlanco(chars[i])) i++;
  while (j >= i && esBlanco(chars[j])) j--;
  if (i > j) return null;
  return { from: starts[i], to: ends[j] };
}

const eventos = [];
const porIndice = new Map();
let seccionActual = null;
parsed.eventos.forEach((ev, idx) => {
  if (ev.tipo === "seccion") seccionActual = ev.texto;
  ev._seccion = seccionActual;
  if (ev.charStart != null) {
    const r = rangoTiempo(ev.charStart, ev.charEnd);
    if (r) {
      const out = { tipo: ev.tipo, texto: ev.texto, from: r.from, to: r.to };
      if (ev._seccion) out.seccion = ev._seccion;
      if (ev.etiqueta) out.etiqueta = ev.etiqueta;
      if (ev.soporte) out.soporte = true;
      if (ev.tipo === "cita") { out.autor = ev.autor; out.fuente = ev.fuente; }
      porIndice.set(idx, out);
      eventos.push(out);
    }
  }
});
// agrupar dato/esquema por ancla para repartirse el intervalo del párrafo
const grupos = new Map();
parsed.eventos.forEach((ev) => {
  if ((ev.tipo === "dato" || ev.tipo === "esquema") && ev.anchor != null) {
    if (!grupos.has(ev.anchor)) grupos.set(ev.anchor, []);
    grupos.get(ev.anchor).push(ev);
  }
});
for (const [anchor, grupo] of grupos) {
  const ancla = porIndice.get(anchor);
  if (!ancla) continue;
  const paso = (ancla.to - ancla.from) / grupo.length;
  grupo.forEach((ev, k) => {
    const from = ancla.from + paso * k;
    const to = k === grupo.length - 1 ? ancla.to : ancla.from + paso * (k + 1);
    const base = { seccion: ev._seccion, caption: ev.caption, from: Number(from.toFixed(3)), to: Number(to.toFixed(3)) };
    if (ev.tipo === "dato") eventos.push({ tipo: "dato", grafico: ev.grafico, fuente: ev.fuente, series: ev.series, ...base });
    else eventos.push({ tipo: "esquema", titulo: ev.titulo, elementos: ev.elementos, ...base });
  });
}
// banners de sección: persisten hasta la sección siguiente. Si la voz trae
// pausas de sección (pausas.json de tts-azure), el banner o la cortina
// arranca donde EMPIEZA el silencio, no donde termina: así una cortina de
// 1,1 s suena sobre la pausa de 1,2 s y no tapa voz.
const rutaPausas = path.join(path.dirname(alignPath), "pausas.json");
const pausas = fs.existsSync(rutaPausas) ? JSON.parse(fs.readFileSync(rutaPausas, "utf8")) : [];
const banners = [];
parsed.eventos.forEach((ev) => {
  if (ev.tipo !== "seccion" || ev.anchor == null) return;
  const ancla = porIndice.get(ev.anchor);
  if (!ancla) return;
  const pausa = pausas.find((p) => Math.abs(p.from + p.dur - ancla.from) < 0.4);
  banners.push({ texto: ev.texto, from: Math.max(0, pausa ? pausa.from + 0.05 : ancla.from - 0.1) });
});
banners.forEach((b, i) => {
  eventos.push({ tipo: "seccion", texto: b.texto, from: b.from, to: i + 1 < banners.length ? banners[i + 1].from : 9e9, overlay: true });
});

eventos.sort((a, b) => a.from - b.from);
const fin = eventos.reduce((m, e) => (e.to < 1e8 ? Math.max(m, e.to) : m), 0);
for (const e of eventos) if (e.to >= 1e8) e.to = Number((fin + 1.2).toFixed(3)); // el último banner llega hasta el final real

const timeline = {
  version: 1,
  meta: {
    titulo: parsed.titulo || "",
    descripcion: parsed.descripcion || "",
    // fecha local de Chile del día de producción (para el sello de inicio)
    fecha: process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(new Date()),
    serie: process.env.SERIE || "informe",          // informe | clave (lo fija dia.js)
    musica: process.env.MUSICA || null,             // ej. "musica/informe.mp3" en public/
    logo: process.env.LOGO || null,                 // logo sonoro del sello (2 s)
    fps: 30,
    width: 1920,
    height: 1080,
    duracionSeg: Number((fin + 1.2).toFixed(2)),
  },
  audio: audioFile,
  fuentes: parsed.fuentes || [],
  eventos,
};
fs.writeFileSync(salida, JSON.stringify(timeline, null, 2));
console.log(`OK: timeline con ${eventos.length} eventos, duración ${(timeline.meta.duracionSeg / 60).toFixed(1)} min → ${salida}`);
