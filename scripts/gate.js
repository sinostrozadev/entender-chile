#!/usr/bin/env node
/**
 * gate.js - control previo al render. Corre en el workflow ANTES de renderizar
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

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
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
  if (secciones < 3) errores.push(`${etiqueta}: solo ${secciones} secciones - YouTube exige ≥3 capítulos`);
  if (chars < 1000) errores.push(`${etiqueta}: narración de ${chars} caracteres - demasiado corta, algo vino mal`);
  if (min > 18) avisos.push(`${etiqueta}: duración estimada ${min.toFixed(1)} min - más largo de lo previsto`);
  console.log(`✓ ${etiqueta}: parsea · ${secciones} secciones · ~${min.toFixed(1)} min estimados`);
}

const gi = path.join("contenido", "guiones", "informe", `${fecha}.md`);
if (!fs.existsSync(gi)) errores.push(`no existe ${gi} - no hay nada que renderizar`);
else chequearGuion(gi, "informe");

const dirGC = path.join("contenido", "guiones", "claves");
const gc = fs.existsSync(dirGC)
  ? fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))
  : null;
if (gc) chequearGuion(path.join(dirGC, gc), "clave");
else console.log("- clave: hoy no hay guion (ok)");

const rev = path.join("contenido", "revisiones", `${fecha}.md`);
let revAprobada = false;
if (fs.existsSync(rev)) {
  const t = fs.readFileSync(rev, "utf8");
  if (/^VEREDICTO:\s*(RECHAZADA|BLOQUEADA)/im.test(t)) errores.push(`la revisión editorial RECHAZÓ o BLOQUEÓ la edición - ver ${rev}`);
  else if (/^VEREDICTO:\s*APROBADA/im.test(t)) { revAprobada = true; console.log("✓ revisión editorial: APROBADA"); }
  else avisos.push(`${rev} existe pero sin línea "VEREDICTO: APROBADA/CORREGIR/BLOQUEADA"`);
} else {
  console.log("- sin archivo de revisión de hoy");
}

// Sin revisión del día, mandan los veredictos POR PIEZA de la cadena v3
// (COMPUERTA 1, 15-09): desde que los videos suben PROGRAMADOS ya no hay gate
// humano antes de publicar, así que el reloj de respaldo no puede renderizar
// un guion que el validador no aprobó. La situación por pieza la calcula
// scripts/estado.js y queda en contenido/estado/FECHA.json ("lista" =
// APROBADA vigente, más nueva que la pieza). Un estado sin ese campo es de
// antes de la v3: ahí se conserva el fail-open de siempre.
const estadoJson = path.join("contenido", "estado", `${fecha}.json`);
if (!revAprobada && fs.existsSync(estadoJson)) {
  const est = JSON.parse(fs.readFileSync(estadoJson, "utf8"));
  const sit = (id) => (est.piezas || []).find((x) => x.id === id)?.situacion;
  if (sit("guion_informe") !== undefined) {
    if (sit("guion_informe") === "lista") console.log("✓ guion del informe: APROBADA vigente del validador");
    else errores.push(`guion del informe sin APROBADA vigente del validador (situación: ${sit("guion_informe")}) - no se renderiza hasta que Claude lo apruebe`);
    if (gc && sit("guion_clave") !== "lista") {
      avisos.push(`guion de la Clave sin APROBADA vigente (situación: ${sit("guion_clave")}): la Clave NO se renderiza en esta corrida; el informe sigue`);
      if (process.env.GITHUB_ENV) fs.appendFileSync(process.env.GITHUB_ENV, "SIN_CLAVE=1\n");
    } else if (gc) console.log("✓ guion de la Clave: APROBADA vigente del validador");
  } else {
    console.log("- estado sin situación por pieza (anterior a la v3): fail-open");
  }
}

for (const a of avisos) console.log(`AVISO: ${a}`);
if (errores.length) {
  for (const e of errores) console.error(`ERROR: ${e}`);
  process.exit(1);
}
console.log("\nGate OK: a renderizar.");
