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
  run("tts-elevenlabs.js", [path.join(OUT, "narracion.txt"), OUT]);
  audio = `${fecha}-${etiqueta}.mp3`;
  fs.mkdirSync("public", { recursive: true });
  fs.copyFileSync(path.join(OUT, "narracion.mp3"), path.join("public", audio));
  console.log(`audio copiado a public/${audio}`);
} else {
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
  console.log("(modo prueba: video mudo, cero créditos)");
}

console.log("── 3/4 · Timeline ────────────────────────────────");
// serie, música de fondo y logo sonoro para la composición
process.env.SERIE = etiqueta;
const musicaRel = `musica/${etiqueta}.mp3`;
if (fs.existsSync(path.join("public", musicaRel))) process.env.MUSICA = musicaRel;
else delete process.env.MUSICA;
if (fs.existsSync(path.join("public", "musica", "logo.mp3"))) process.env.LOGO = "musica/logo.mp3";
else delete process.env.LOGO;
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
console.log(`\nDescripción lista para pegar: ${rutaDesc}`);

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
