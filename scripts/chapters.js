#!/usr/bin/env node
/**
 * chapters.js — Genera los capítulos de YouTube desde el timeline.
 * Pega la salida al inicio de la descripción del video.
 *
 * Uso: node scripts/chapters.js out/timeline.json
 *
 * Reglas de YouTube para que los capítulos funcionen:
 *   - el primero debe ser 00:00,
 *   - mínimo tres capítulos,
 *   - cada uno de al menos 10 segundos.
 * El script las aplica solo: fija el primero en 00:00 y fusiona
 * secciones más cortas que 10 s con la siguiente.
 */
const fs = require("fs");

const [, , timelinePath = "out/timeline.json"] = process.argv;
const t = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

const mmss = (s) => {
  const total = Math.max(0, Math.floor(s));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const base = `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return h > 0 ? `${h}:${base}` : base;
};

const secciones = t.eventos
  .filter((e) => e.tipo === "seccion")
  .sort((a, b) => a.from - b.from)
  .map((e) => ({ nombre: e.texto, from: e.from }));

if (secciones.length === 0) {
  console.error("El timeline no tiene secciones.");
  process.exit(1);
}

// primer capítulo siempre en 00:00
secciones[0].from = 0;

// fusionar capítulos de menos de 10 s con el siguiente
const capitulos = [];
for (let i = 0; i < secciones.length; i++) {
  const fin = i + 1 < secciones.length ? secciones[i + 1].from : t.meta.duracionSeg;
  if (fin - secciones[i].from < 10 && i + 1 < secciones.length) {
    secciones[i + 1].from = secciones[i].from; // el siguiente absorbe este tramo
    continue;
  }
  capitulos.push(secciones[i]);
}

for (const c of capitulos) console.log(`${mmss(c.from)} ${c.nombre}`);

if (capitulos.length < 3) {
  console.error("\nAVISO: YouTube requiere al menos 3 capítulos; este video tiene menos.");
}
