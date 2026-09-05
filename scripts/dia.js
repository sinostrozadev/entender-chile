#!/usr/bin/env node
/**
 * dia.js - Flujo diario completo en un comando.
 *
 * Uso:
 *   node scripts/dia.js                       → guion del informe de HOY (contenido/guiones/informe/AAAA-MM-DD.md), voz simulada
 *   node scripts/dia.js --clave               → guion de Claves de HOY (contenido/guiones/claves/AAAA-MM-DD-*.md)
 *   node scripts/dia.js <ruta.md>             → un guion específico
 *   ... --voz                                 → voz real ElevenLabs (ELEVENLABS_API_KEY y VOICE_ID)
 *   ... --render                              → además renderiza el MP4
 *
 * Pasos: parse → voz → timeline → capítulos (+ descripción) → (render)
 * Salidas del día en out/AAAA-MM-DD/ y descripción lista en contenido/descripciones/.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// sincronizar con lo que generó la automatización (best-effort)
try {
  require("child_process").execFileSync("git", ["pull", "--ff-only"], { stdio: "pipe" });
  console.log("git pull: repositorio actualizado.");
} catch { console.log("git pull: omitido (sin remoto o sin red)."); }

const args = process.argv.slice(2);
const conVoz = args.includes("--voz");
const conRender = args.includes("--render");
const esClave = args.includes("--clave");
const rutaExplicita = args.find((a) => !a.startsWith("--"));

// fecha local de Chile (FECHA_EDICION la fija el workflow para que un job
// que cruza la medianoche siga hablando de la misma edición)
const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date()); // AAAA-MM-DD

let guion = rutaExplicita;
if (!guion) {
  if (esClave) {
    const dir = path.join("contenido", "guiones", "claves");
    const candidatos = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.startsWith(fecha) && f.endsWith(".md")) : [];
    if (!candidatos.length) {
      if (args.includes("--si-existe")) { console.log("Hoy no hay guion de Claves; nada que producir."); process.exit(0); }
      console.error(`No hay guion de Claves de hoy en ${dir}/${fecha}-*.md`);
      process.exit(1);
    }
    guion = path.join(dir, candidatos[0]);
  } else {
    guion = path.join("contenido", "guiones", "informe", `${fecha}.md`);
  }
}
if (!fs.existsSync(guion)) {
  console.error(`No existe ${guion}. Copia el guion de la Biblioteca ahí y vuelve a correr.`);
  process.exit(1);
}

const etiqueta = esClave ? "clave" : "informe";
const OUT = path.join("out", fecha) + path.sep;
fs.mkdirSync(OUT, { recursive: true });
const run = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { stdio: "inherit" });
const capturar = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { encoding: "utf8" });

console.log(`Guion: ${guion}\nSalidas: ${OUT}\n`);
console.log("── 1/4 · Parseando guion ─────────────────────────");
run("parse.js", [guion, OUT]);

console.log("── 2/4 · Voz ─────────────────────────────────────");
let audio = null;
if (conVoz) {
  // proveedor según qué secrets existan: Azure primero (gratis, voz chilena),
  // ElevenLabs si algún día vuelve (clonación)
  const proveedor =
    process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION ? "tts-azure.js"
    : process.env.ELEVENLABS_API_KEY && process.env.VOICE_ID ? "tts-elevenlabs.js"
    : null;
  if (!proveedor) {
    console.error("--voz requiere AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (o ELEVENLABS_API_KEY + VOICE_ID).");
    process.exit(1);
  }
  console.log(`(proveedor de voz: ${proveedor})`);
  run(proveedor, [path.join(OUT, "narracion.txt"), OUT]);
  audio = `${fecha}-${etiqueta}.mp3`;
  fs.mkdirSync("public", { recursive: true });
  fs.copyFileSync(path.join(OUT, "narracion.mp3"), path.join("public", audio));
  console.log(`audio copiado a public/${audio}`);
} else {
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
  console.log("(modo prueba: video mudo, cero créditos)");
}

console.log("── 3/4 · Timeline ────────────────────────────────");
// Sonido del canal (decidido 27/29-08): NO hay cama musical continua; la
// música puntúa. Sello en la apertura, cortinas en los cambios de sección,
// cierre al final. Todo generado por scripts/sonido.js.
process.env.SERIE = etiqueta;
delete process.env.MUSICA; // la cama continua se retiró
const son = (f) => fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null;
const sello = son("sello.wav") || son("logo.mp3");
if (sello) process.env.LOGO = sello; else delete process.env.LOGO;
const cortinas = ["cortina-a.wav", "cortina-b.wav", "cortina-c.wav"].map(son).filter(Boolean);
if (cortinas.length) process.env.CORTINAS = cortinas.join(","); else delete process.env.CORTINAS;
const cierre = son("cierre.wav");
if (cierre) process.env.CIERRE = cierre; else delete process.env.CIERRE;
run("build-timeline.js", [
  path.join(OUT, "parsed.json"),
  path.join(OUT, "alignment.json"),
  path.join(OUT, "timeline.json"),
  ...(audio ? [audio] : []),
]);

console.log("── 4/4 · Capítulos y descripción ─────────────────");
const capitulos = capturar("chapters.js", [path.join(OUT, "timeline.json")]);
process.stdout.write(capitulos);
const parsed = JSON.parse(fs.readFileSync(path.join(OUT, "parsed.json"), "utf8"));
const descripcion = [parsed.descripcion || "", "", "Capítulos:", capitulos.trim(), "",
  "Fuentes de esta edición:", ...(parsed.fuentes || [])].join("\n");
const rutaDesc = path.join("contenido", "descripciones", `${fecha}-${etiqueta}.txt`);
fs.mkdirSync(path.dirname(rutaDesc), { recursive: true });
fs.writeFileSync(rutaDesc, descripcion);
fs.copyFileSync(path.join(OUT, "parsed.json"), path.join(OUT, `parsed-${etiqueta}.json`)); // la Clave pisa parsed.json: copia por pieza (el 30-08 el informe subió con el título de la Clave)
console.log(`\nDescripción lista para pegar: ${rutaDesc}`);

// Miniatura (1280x720, src/marca.tsx): la cifra principal del día + el título.
// Cifra = el primer [DATO] que eligió el guion (no los automáticos). No bloquea.
{
  // La cifra debe ser LA DE LA PORTADA (el primer bloque de noticia), no la
  // primera del guion: el 30-08 salió "114 votos" junto al titular del Andalién.
  let seccion = "", dato = null, bloquePortada = null;
  for (const e of parsed.eventos) {
    if (e.tipo === "seccion") { seccion = e.texto; continue; }
    if (/apertura/i.test(seccion)) continue;
    if (bloquePortada && seccion !== bloquePortada) break;
    if (e.tipo === "tesis") bloquePortada = seccion;
    if (!dato && e.tipo === "dato" && !e.automatico && e.series?.length && e.series[0].raw) dato = { ...e, seccion };
  }
  // extractos: las tesis de los dos bloques siguientes, como textura desvanecida
  const tesis = [];
  {
    let sec = "", vistos = new Set();
    for (const e of parsed.eventos) {
      if (e.tipo === "seccion") { sec = e.texto; continue; }
      if (/apertura|cierre|agenda|dato curioso|en titulares/i.test(sec)) continue;
      if (e.tipo === "tesis" && !vistos.has(sec)) { vistos.add(sec); tesis.push(e.texto); }
    }
  }
  // Carátula v2 (05-09, iterada con Santiago): gancho del guionista
  // ("Carátula sugerida:"), imagen de la sección de la portada, velo del color
  // de la sección para el informe (con fecha), verde de serie para la Clave.
  // Si el gancho parte con una cifra ("762.326 vacunas botadas"), la cifra va
  // gigante y el resto abajo. Sin línea de carátula, cae al título (y sirve
  // igual: nunca queda una miniatura vacía).
  const { imagenDe } = require("./imagenes-secciones");
  const gcru = (parsed.caratula || "").trim();
  const recortar = (t) => (t.length <= 64 ? t : t.slice(0, 64).replace(/\s+\S*$/, "") + "…");
  let gancho = gcru || recortar(parsed.titulo || "");
  let cifraMini = "";
  const mg = gcru.match(/^([$]?[\d][\d.,]*%?)\s+(.{6,})$/);
  if (mg) { cifraMini = mg[1]; gancho = mg[2]; }
  // La Clave va SIEMPRE con su fondo verde de serie: es colección, no sección
  // (y el matcheo por palabras se equivoca fácil: "regla fiscal" → fiscalía).
  const img = esClave ? null : imagenDe(`${bloquePortada || ""} ${parsed.titulo || ""}`);
  const props = {
    gancho,
    cifra: cifraMini,
    fecha: esClave ? "" : fecha.split("-").reverse().join("-"), // la Clave es atemporal: sin fecha (Santiago, 30-08)
    imagen: img ? `fondos/seccion-${img}.jpg` : esClave ? "fondos/fondo-clave-vertical.png" : "fondos/banner-fondo.png",
    modo: "velo-seccion",
    seccion: bloquePortada || "",
    serie: esClave ? "clave" : "informe",
  };
  const mini = path.join(OUT, esClave ? "miniatura-clave.png" : "miniatura.png");
  try {
    execFileSync("npx", ["remotion", "still", "src/marca.tsx", "MiniaturaV2", mini, `--props=${JSON.stringify(props)}`], { stdio: "ignore" });
    console.log(`Miniatura: ${mini} (gancho: "${gancho}"${cifraMini ? ` · cifra ${cifraMini}` : ""}${gcru ? "" : " — SIN línea de carátula, usé el título"})`);
  } catch (e) {
    console.log(`(miniatura no generada: ${e.message.split("\n")[0]})`);
  }
}

const video = path.join(OUT, `${fecha}-${etiqueta}.mp4`);
if (conRender) {
  console.log("── Render ────────────────────────────────────────");
  execFileSync("npx", ["remotion", "render", "Informe", video,
    `--props=./${path.join(OUT, "timeline.json")}`], { stdio: "inherit" });
  console.log(`\nListo: ${video}`);
} else {
  console.log("\nSiguiente paso:");
  console.log("  npx remotion studio" + `  (props: ${path.join(OUT, "timeline.json")})`);
  console.log(`  node scripts/dia.js${esClave ? " --clave" : ""}${conVoz ? " --voz" : ""} --render`);
}
