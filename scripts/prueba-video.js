#!/usr/bin/env node
/**
 * prueba-video.js - El video de una edición ya publicada, rendido con las
 * imágenes de sección y la carátula que están en CARPETAS DE PRUEBA.
 *
 * Por qué existe (27-09-2026, pedido de Santiago): las imágenes planas de
 * sección y la carátula ilustrada se juzgan pasando en el video, no sueltas en
 * una carpeta. Y se juzgan ANTES de meterlas en producción, porque una vez que
 * están en contenido/secciones/ salen al aire en la edición siguiente.
 *
 * Nada de acá toca producción:
 *   · las imágenes se leen de SECCIONES_DIR (por defecto
 *     contenido/secciones/pruebas) y se copian a public/secciones-prueba/,
 *     nunca a public/secciones/;
 *   · la carátula se lee de CARATULA y se copia a public/caratulas-prueba/;
 *   · todo lo que se genera queda en out/pruebas/AAAA-MM-DD/ (out/ está
 *     ignorado por git) y no se sube nada a ninguna parte.
 *
 * Uso:
 *   node scripts/prueba-video.js 2026-09-26            → el informe completo
 *   node scripts/prueba-video.js 2026-09-26 --corto    → una muestra de uno a dos minutos
 *
 * Con --corto sale la apertura con la carátula y unos cuatro segundos por
 * sección, en el orden real del guion: sirve para ver la FILA de imágenes sin
 * esperar veinte minutos de render. Los segundos por sección se cambian con
 * SEGUNDOS_POR_SECCION.
 *
 * La voz no se vuelve a generar nunca (cero créditos): se reutiliza el audio y
 * la alineación de esa fecha si están en out/AAAA-MM-DD/ o en el release
 * edicion-AAAA-MM-DD, y si no hay, el video sale mudo con la alineación
 * simulada de scripts/mock-tts.js.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ── argumentos ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const corto = args.includes("--corto");
const fecha = args.find((a) => !a.startsWith("--"));
if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
  console.error("Uso: node scripts/prueba-video.js AAAA-MM-DD [--corto]");
  process.exit(1);
}

const guion = path.join("contenido", "guiones", "informe", `${fecha}.md`);
if (!fs.existsSync(guion)) {
  console.error(`No existe ${guion}: esta prueba rinde una edición que ya se publicó.`);
  process.exit(1);
}

// ── de dónde salen las imágenes de prueba ─────────────────────────────────
const DIR_PRUEBAS = path.join("contenido", "secciones", "pruebas");
process.env.SECCIONES_DIR = process.env.SECCIONES_DIR || DIR_PRUEBAS;
if (!fs.existsSync(process.env.SECCIONES_DIR)) {
  console.error(`No existe ${process.env.SECCIONES_DIR} (SECCIONES_DIR).`);
  process.exit(1);
}
// La carátula de prueba se llama caratula-AAAA-MM-DD.png y vive en la misma
// carpeta. Si no está, la prueba sigue: la carátula que sale al aire cae al
// pictograma de respaldo, igual que en producción cuando no llega la de GPT.
if (!process.env.CARATULA) {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const c = path.join(process.env.SECCIONES_DIR, `caratula-${fecha}.${ext}`);
    if (fs.existsSync(c)) { process.env.CARATULA = c; break; }
  }
}

// Las fuentes desde public/fuentes: el render no depende de la red (ver src/tema.ts)
process.env.REMOTION_FUENTES_LOCALES = process.env.REMOTION_FUENTES_LOCALES || "1";
process.env.FECHA_EDICION = fecha;
process.env.SERIE = "informe";

const OUT = path.join("out", "pruebas", fecha) + path.sep;
fs.mkdirSync(OUT, { recursive: true });
const VIEJO = path.join("out", fecha);          // lo que dejó la edición real, si se produjo acá
const run = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { stdio: "inherit" });

console.log(`Edición de prueba: ${fecha}`);
console.log(`  imágenes de sección: ${process.env.SECCIONES_DIR} → public/secciones-prueba/`);
console.log(`  carátula:            ${process.env.CARATULA || "(no hay: sale el pictograma de respaldo)"}`);
console.log(`  salidas:             ${OUT}\n`);

// ── 1 · el guion ──────────────────────────────────────────────────────────
console.log("── 1/4 · Parseando el guion ──────────────────────");
run("parse.js", [guion, OUT]);
const parsed = JSON.parse(fs.readFileSync(path.join(OUT, "parsed.json"), "utf8"));

// ── 2 · la voz: reutilizar, jamás generar ─────────────────────────────────
console.log("── 2/4 · Voz (reutilizada, nunca generada) ───────");
const audioPublico = `${fecha}-informe.mp3`;
let audio = fs.existsSync(path.join("public", audioPublico)) ? audioPublico : null;
if (!audio && fs.existsSync(path.join(VIEJO, "narracion.mp3"))) {
  fs.copyFileSync(path.join(VIEJO, "narracion.mp3"), path.join("public", audioPublico));
  audio = audioPublico;
  console.log(`audio reutilizado de ${path.join(VIEJO, "narracion.mp3")}`);
}
if (!audio) {
  // el release del día es la memoria de la edición: ahí quedó el mp3
  try {
    execFileSync("gh", ["release", "download", `edicion-${fecha}`, "--pattern", audioPublico,
      "--dir", "public", "--clobber"], { stdio: "pipe", timeout: 120000 });
    if (fs.existsSync(path.join("public", audioPublico))) {
      audio = audioPublico;
      console.log(`audio bajado del release edicion-${fecha}`);
    }
  } catch { console.log(`(sin audio en el release edicion-${fecha})`); }
}
// La alineación REAL es la que sincroniza el video con esa voz. Sin ella el
// audio no sirve: los tiempos simulados no calzan con lo que se dice, y un
// video desincronizado enseña menos que uno mudo.
let alineacionReal = false;
for (const f of ["alignment.json", "pausas.json"]) {
  if (fs.existsSync(path.join(VIEJO, f))) {
    fs.copyFileSync(path.join(VIEJO, f), path.join(OUT, f));
    if (f === "alignment.json") alineacionReal = true;
  }
}
if (alineacionReal) console.log(`alineación reutilizada de ${path.join(VIEJO, "alignment.json")}`);
else {
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
  if (audio) console.log("(hay audio pero no su alineación: el video va mudo para no salir desincronizado)");
  audio = null;
}

// ── 3 · el timeline, con las imágenes de prueba ───────────────────────────
console.log("── 3/4 · Timeline ────────────────────────────────");
const son = (f) => (fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null);
const sello = son("sello.wav") || son("logo.mp3");
if (sello) process.env.LOGO = sello; else delete process.env.LOGO;
const cortinas = ["cortina-a.wav", "cortina-b.wav", "cortina-c.wav"].map(son).filter(Boolean);
if (cortinas.length) process.env.CORTINAS = cortinas.join(","); else delete process.env.CORTINAS;
const cierre = son("cierre.wav");
if (cierre) process.env.CIERRE = cierre; else delete process.env.CIERRE;
delete process.env.MUSICA;
run("build-timeline.js", [
  path.join(OUT, "parsed.json"),
  path.join(OUT, "alignment.json"),
  path.join(OUT, "timeline.json"),
  ...(audio ? [audio] : []),
]);
const tl = JSON.parse(fs.readFileSync(path.join(OUT, "timeline.json"), "utf8"));

// LA TRAMPA QUE COSTÓ ENCONTRAR (27-09-2026): el mosaico de transición es el
// único momento en que la imagen de sección se ve a pantalla completa, y
// src/Informe.tsx solo lo enciende donde la narración trae silencio de verdad
// (ev.pausaDur, que sale de pausas.json de la voz de Azure). Con la voz
// simulada no hay pausas.json, así que el video no mostraba NINGUNA imagen y
// la prueba no probaba nada. Si el video va mudo no hay voz que pisar, así que
// acá se le da al mosaico la pausa máxima que igual respeta.
if (!audio && !tl.eventos.some((e) => e.overlay && e.pausaDur)) {
  let primera = true;
  for (const ev of tl.eventos) {
    if (!ev.overlay) continue;
    if (primera) { primera = false; continue; }   // la primera sección abre con el sello
    ev.pausaDur = 2.4;
  }
  fs.writeFileSync(path.join(OUT, "timeline.json"), JSON.stringify(tl, null, 2));
  console.log("(video mudo: se le da al mosaico de sección la pausa máxima, que es lo que deja ver las imágenes)");
}

// ── 4 · las tres carátulas, las mismas que la edición real ────────────────
console.log("── 4/4 · Carátulas ──────────────────────────────");
const { miniaturas } = require("./miniaturas.js");
const { ilustracion } = miniaturas({ parsed, fecha, esClave: false, OUT });

// ── la muestra corta ──────────────────────────────────────────────────────
// Una tarjeta por sección, en el orden del guion, con la transición de
// mosaico entre una y otra: es ahí donde se ve la fila de imágenes. Los
// tiempos se recalculan y el audio se suelta, porque la voz del día no dice
// lo que queda en pantalla.
const SELLO_SEG = 2.8;      // src/Informe.tsx
const MOSAICO_SEG = 3.4;    // lo que tarda el viaje en instalarse y empezar a irse
const PORTADA_SEG = 3.5;
const construirCorto = () => {
  const SEG = Number(process.env.SEGUNDOS_POR_SECCION || 4);
  const HUECO = 0.2;
  const overlays = tl.eventos.filter((e) => e.overlay);
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const portada = ilustracion || null;
  const eventos = [];
  let t = (portada ? PORTADA_SEG : 0) + SELLO_SEG;
  overlays.forEach((ov, i) => {
    // el mosaico de esta sección arranca antes de ov.from y se desvanece
    // sobre la tarjeta, igual que en el informe real; la primera sección no
    // lleva mosaico (ahí abre el sello)
    const viaje = i === 0 ? 0 : MOSAICO_SEG;
    const desde = t;
    const dela = tarjetas.filter((c) => c.seccion === ov.texto);
    const card = dela.find((c) => c.tipo === "tesis") || dela[0];
    const fin = desde + viaje + SEG;
    if (card) {
      const copia = { ...card, from: Number(desde.toFixed(3)), to: Number(fin.toFixed(3)) };
      // las tarjetas de titulares llevan el tiempo de cada frase adentro: hay
      // que repartir la ventana nueva entre ellas o se quedan todas apagadas
      if (copia.items) {
        const paso = (fin - desde) / copia.items.length;
        copia.items = copia.items.map((it, k) => ({ texto: it.texto,
          from: Number((desde + paso * k).toFixed(3)), to: Number((desde + paso * (k + 1)).toFixed(3)) }));
      }
      eventos.push(copia);
    }
    eventos.push({ ...ov, from: Number(desde.toFixed(3)), to: Number((fin + HUECO).toFixed(3)),
      pausaDur: i === 0 ? null : 2.4 });
    t = fin + HUECO;
  });
  // el último rótulo llega hasta el final
  const ultimo = eventos.filter((e) => e.overlay).pop();
  if (ultimo) ultimo.to = Number((t + 1.2).toFixed(3));
  return {
    ...tl,
    audio: null,
    meta: {
      ...tl.meta,
      ...(portada ? { portada, portadaSeg: PORTADA_SEG } : {}),
      selloEn: portada ? PORTADA_SEG : 0,
      inicioNarracion: 0,
      duracionSeg: Number((t + 1.2).toFixed(2)),
    },
    eventos: eventos.sort((a, b) => a.from - b.from),
  };
};

// ── render ────────────────────────────────────────────────────────────────
const props = corto ? path.join(OUT, "timeline-corto.json") : path.join(OUT, "timeline.json");
if (corto) fs.writeFileSync(props, JSON.stringify(construirCorto(), null, 2));
const video = path.join(OUT, `${fecha}-informe-prueba${corto ? "-corto" : ""}.mp4`);
const duracion = JSON.parse(fs.readFileSync(props, "utf8")).meta.duracionSeg;
console.log(`── Render ${corto ? "(muestra corta)" : "(informe completo)"} ─ ${(duracion / 60).toFixed(1)} min de video ─`);
const arranque = Date.now();
// --concurrency=100%: lo mismo que usa dia.js; con el default de remotion el
// render de un informe se iba a más de una hora.
execFileSync("npx", ["remotion", "render", "Informe", video, `--props=./${props}`, "--concurrency=100%",
  ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
], { stdio: "inherit" });

// ── el informe de la prueba ───────────────────────────────────────────────
// Lo importante no es que el render termine: es saber QUÉ sección se vio con
// imagen de prueba y cuál cayó al dibujo por código, que es justo lo que se
// está mirando.
const conImagen = (tl.meta.secciones || []).map((n) => n.replace(/\.(png|jpg)$/, ""));
const delDia = [];
for (const ev of tl.eventos) {
  if (!ev.overlay || !ev.categoria) continue;
  if (!delDia.includes(ev.categoria)) delDia.push(ev.categoria);
}
const usadas = delDia.filter((c) => conImagen.includes(c));
const dibujadas = delDia.filter((c) => !conImagen.includes(c));
const sobrantes = conImagen.filter((c) => !delDia.includes(c));
console.log("\n── Listo ─────────────────────────────────────────");
console.log(`video:       ${video}`);
for (const m of ["miniatura.png", "miniatura-2.png", "miniatura-3.png"]) {
  const r = path.join(OUT, m);
  if (fs.existsSync(r)) console.log(`miniatura:   ${r}`);
}
console.log(`timeline:    ${props}`);
console.log(`carátula:    ${ilustracion || "(ninguna: la que sale al aire es el pictograma de respaldo)"}`);
console.log(`con imagen de prueba (${usadas.length}): ${usadas.join(", ") || "ninguna"}`);
console.log(`con dibujo por código (${dibujadas.length}): ${dibujadas.join(", ") || "ninguna"}`);
if (sobrantes.length) console.log(`imágenes de prueba que esta edición no usa: ${sobrantes.join(", ")}`);
console.log(`render: ${((Date.now() - arranque) / 60000).toFixed(1)} min`);
