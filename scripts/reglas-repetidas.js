#!/usr/bin/env node
/**
 * reglas-repetidas.js - Qué reglas incumple GPT una y otra vez.
 *
 * Por qué existe (06-10-2026). Los veredictos del árbol dicen todos APROBADA,
 * porque el validador sobrescribe el archivo en cada vuelta hasta que la pieza
 * pasa. Los CORREGIR, que son los que enseñan algo, viven solo en el historial
 * de git. Así que durante semanas pagamos cuatro vueltas de corrección por
 * noche sin saber qué estábamos corrigiendo.
 *
 * La primera corrida, sobre el 22-09 al 06-10-2026, dio 194 correcciones en 47
 * vueltas, y seis reglas explicaban 33 de ellas. Una regla que se incumple ocho
 * veces en catorce días no es un error de GPT: es un prompt que no aterriza. De
 * ahí salieron los bloques "LAS QUE MÁS FALLAN" de prompts/informe.md,
 * guion-informe.md e investigacion-clave.md, escritos para contarse y no para
 * firmarse.
 *
 * Este script es cómo vamos a saber si eso sirvió. Se corre cada una o dos
 * semanas y se compara con la corrida anterior: si una regla sigue arriba
 * después de que la pusimos a contar, el problema no era la redacción.
 *
 * Uso:  node scripts/reglas-repetidas.js [días]      (por defecto 14)
 */
const { execFileSync } = require("child_process");

const DIAS = Number(process.argv[2] || 14);
const desde = `${DIAS} days ago`;
const git = (args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const archivos = [...new Set(
  git(["log", `--since=${desde}`, "--name-only", "--format=", "--", "contenido/veredictos"])
    .split("\n").map((l) => l.trim()).filter(Boolean)
)];

let vueltas = 0, correcciones = 0;
const porRegla = new Map();
const porPieza = new Map();

for (const f of archivos) {
  const hashes = git(["log", `--since=${desde}`, "--format=%h", "--", f]).split("\n").filter(Boolean);
  for (const h of hashes) {
    let txt = "";
    try { txt = git(["show", `${h}:${f}`]); } catch { continue; }
    if (!/^VEREDICTO:\s*CORREGIR/m.test(txt)) continue;
    const bloque = (txt.split(/^Correcciones:\s*$/m)[1] || "").split(/^(?:Observaciones:|Verificado)/m)[0];
    if (!bloque.trim()) continue;
    vueltas++;
    const pieza = (txt.match(/^PIEZA:\s*(.+)$/m) || [])[1] || "?";
    porPieza.set(pieza, (porPieza.get(pieza) || 0) + 1);
    const items = bloque.split(/^\s*\d+\.\s/m).slice(1);
    correcciones += items.length;
    for (const it of items) {
      const r = (it.replace(/\s+/g, " ").match(/Regla:\s*([^·]+)/) || [])[1];
      if (!r) continue;
      const clave = r.trim().slice(0, 70);
      porRegla.set(clave, (porRegla.get(clave) || 0) + 1);
    }
  }
}

const orden = [...porRegla.entries()].sort((a, b) => b[1] - a[1]);
console.log(`Veredictos CORREGIR de los últimos ${DIAS} días: ${vueltas} vueltas, ${correcciones} correcciones.`);
console.log(`Promedio: ${vueltas ? (correcciones / vueltas).toFixed(1) : 0} correcciones por vuelta.\n`);
console.log("Vueltas por pieza:");
for (const [p, n] of [...porPieza.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${p}`);
console.log("\nReglas que más se repiten (una regla arriba es un prompt que no aterriza):");
for (const [r, n] of orden.slice(0, 15)) console.log(`  ${String(n).padStart(3)}  ${r}`);
if (!orden.length) console.log("  (ninguna: o no hubo correcciones, o no traían línea Regla:)");
