#!/usr/bin/env node
/**
 * short-urgente.js - El Short exprés: de un guion de última hora a video.
 *
 * Fase 2 del agente de guardia (diseño aprobado 02-09; construido 03-09 con
 * el primer caso real: la Encuesta de Operadores Financieros). La rutina de
 * guardia redacta contenido/urgente/GUION-<slug>.md (mismo formato de marcas
 * del canal) y este script lo convierte en pieza por el pipeline de siempre:
 * parse → voz → timeline → render vertical con la piel VINO (última hora).
 *
 * Uso:
 *   node scripts/short-urgente.js contenido/urgente/GUION-<slug>.md [--voz] [--render] [--subir]
 *
 * Deduplicación: si contenido/urgente/SUBIDO-<slug>.txt existe, no hace nada
 * (un hallazgo = un Short, aunque el guardia lo vea en cinco corridas).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const args = process.argv.slice(2);
const rutaGuion = args.find((a) => a.endsWith(".md"));
if (!rutaGuion || !fs.existsSync(rutaGuion)) {
  console.error("Uso: node scripts/short-urgente.js contenido/urgente/GUION-<slug>.md [--voz] [--render] [--subir]");
  process.exit(1);
}
const conVoz = args.includes("--voz");
const conRender = args.includes("--render");
const conSubir = args.includes("--subir");
const HANDLE = process.env.HANDLE || "@entenderchile";

const slug = path.basename(rutaGuion).replace(/^GUION-/, "").replace(/\.md$/, "");
const fecha = slug.slice(0, 10);
const marcaSubido = path.join("contenido", "urgente", `SUBIDO-${slug}.txt`);
if (fs.existsSync(marcaSubido)) {
  console.log(`Ya subido (${marcaSubido}): un hallazgo = un Short. Nada que hacer.`);
  process.exit(0);
}

const OUT = path.join("out", "urgente", slug);
fs.mkdirSync(OUT, { recursive: true });
fs.copyFileSync(rutaGuion, path.join(OUT, "guion.md"));
const run = (script, extra, env = {}) =>
  execFileSync("node", [path.join(__dirname, script), ...extra], { stdio: "inherit", env: { ...process.env, ...env } });

// pipeline de siempre
run("parse.js", [path.join(OUT, "guion.md"), OUT + "/"]);
const azure = process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION;
if (conVoz && azure) run("tts-azure.js", [path.join(OUT, "narracion.txt"), OUT + "/"]);
else {
  if (conVoz) console.log("(sin AZURE_SPEECH_KEY/REGION: voz simulada)");
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
}
let audio = null;
if (fs.existsSync(path.join(OUT, "narracion.mp3"))) {
  audio = `urgente-${slug}.mp3`;
  fs.mkdirSync("public", { recursive: true });
  fs.copyFileSync(path.join(OUT, "narracion.mp3"), path.join("public", audio));
}
const son = (f) => (fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null);
const env = { FECHA_EDICION: fecha, SERIE: "urgente", EN_FRIO: "1" }; // parte directo, sin pantalla muerta
const sello = son("sello.wav"); if (sello) env.LOGO = sello;
const cierre = son("cierre.wav"); if (cierre) env.CIERRE = cierre;
run("build-timeline.js", [path.join(OUT, "parsed.json"), path.join(OUT, "alignment.json"), path.join(OUT, "timeline.json"), ...(audio ? [audio] : [])], env);

// lo propio del Short urgente: vertical, piel VINO, eyebrow de última hora
const tl = JSON.parse(fs.readFileSync(path.join(OUT, "timeline.json"), "utf8"));
tl.meta.width = 1080; tl.meta.height = 1920;
tl.meta.handle = HANDLE;
tl.meta.eyebrow = "Última hora";
tl.meta.numerar = false;
tl.meta.selloEn = -1; // sin sello visual: no cabe en un Short (ver src/Short.tsx)
tl.meta.fondo = fs.existsSync(path.join("public", "fondos", "fondo-urgente-vertical.png"))
  ? "fondos/fondo-urgente-vertical.png" : null;
fs.writeFileSync(path.join(OUT, "timeline.json"), JSON.stringify(tl, null, 2));
console.log(`Short urgente "${slug}": ${tl.meta.duracionSeg}s, piel ${tl.meta.fondo ? "vino" : "papel"}.`);

const video = path.join("out", "urgente", `${slug}.mp4`);
if (conRender) {
  execFileSync("npx", ["remotion", "render", "src/short-entry.tsx", "Short", video, `--props=./${path.join(OUT, "timeline.json")}`], { stdio: "inherit" });
  console.log(`Render listo: ${video}`);
}
if (conSubir) {
  // Programado a 5 minutos de la subida (Santiago, 23-09): es última hora,
  // pero la guardia le avisa al teléfono y esos minutos son para verlo antes.
  run("youtube-subir.js", ["--urgente", slug, "--en-minutos", "5"]);
}
