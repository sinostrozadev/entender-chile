#!/usr/bin/env node
/**
 * gate.js — control previo al render. Corre en el workflow ANTES de renderizar
 * para no gastar minutos de Actions en una edición inválida o rechazada.
 *
 * Falla (exit 1) cuando:
 *   - no existe el guion del informe de hoy,
 *   - algún guion presente no parsea o queda bajo los mínimos
 *     (≥3 secciones para capítulos de YouTube, narración no trivial),
 *   - contenido/revisiones/AAAA-MM-DD.md dice "VEREDICTO: RECHAZADA".
 *
 * La AUSENCIA del archivo de revisión NO bloquea (fail-open): el gate de
 * publicación real es humano, antes de subir a YouTube.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const fecha = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

const errores = [];
const avisos = [];

function chequearGuion(ruta, etiqueta) {
  const out = path.join("out", "gate", etiqueta) + path.sep;
  fs.mkdirSync(out, { recursive: true });
  try {
    execFileSync("node", [path.join("scripts", "parse.js"), ruta, out], { stdio: "pipe" });
  } catch (e) {
    const detalle = ((e.stderr || e.stdout || "").toString().trim() || e.message).slice(0, 300);
    errores.push(`${etiqueta}: el guion no parsea → ${detalle}`);
    return;
  }
  const p = JSON.parse(fs.readFileSync(path.join(out, "parsed.json"), "utf8"));
  const secciones = p.eventos.filter((ev) => ev.tipo === "seccion").length;
  const chars = fs.readFileSync(path.join(out, "narracion.txt"), "utf8").length;
  const min = chars / 16 / 60; // misma estimación que mock-tts
  if (secciones < 3) errores.push(`${etiqueta}: solo ${secciones} secciones — YouTube exige ≥3 capítulos`);
  if (chars < 1000) errores.push(`${etiqueta}: narración de ${chars} caracteres — demasiado corta, algo vino mal`);
  if (min > 18) avisos.push(`${etiqueta}: duración estimada ${min.toFixed(1)} min — más largo de lo previsto`);
  console.log(`✓ ${etiqueta}: parsea · ${secciones} secciones · ~${min.toFixed(1)} min estimados`);
}

const gi = path.join("contenido", "guiones", "informe", `${fecha}.md`);
if (!fs.existsSync(gi)) errores.push(`no existe ${gi} — no hay nada que renderizar`);
else chequearGuion(gi, "informe");

const dirGC = path.join("contenido", "guiones", "claves");
const gc = fs.existsSync(dirGC)
  ? fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))
  : null;
if (gc) chequearGuion(path.join(dirGC, gc), "clave");
else console.log("— clave: hoy no hay guion (ok)");

const rev = path.join("contenido", "revisiones", `${fecha}.md`);
if (fs.existsSync(rev)) {
  const t = fs.readFileSync(rev, "utf8");
  if (/^VEREDICTO:\s*RECHAZADA/im.test(t)) errores.push(`la revisión editorial RECHAZÓ la edición — ver ${rev}`);
  else if (/^VEREDICTO:\s*APROBADA/im.test(t)) console.log("✓ revisión editorial: APROBADA");
  else avisos.push(`${rev} existe pero sin línea "VEREDICTO: APROBADA/RECHAZADA"`);
} else {
  console.log("— sin archivo de revisión de hoy (se renderiza igual; el gate humano es antes de PUBLICAR)");
}

for (const a of avisos) console.log(`AVISO: ${a}`);
if (errores.length) {
  for (const e of errores) console.error(`ERROR: ${e}`);
  process.exit(1);
}
console.log("\nGate OK: a renderizar.");
