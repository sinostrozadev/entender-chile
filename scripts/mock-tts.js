#!/usr/bin/env node
/**
 * mock-tts.js — Simula la respuesta de alineación de ElevenLabs para poder
 * probar el pipeline y el render SIN gastar créditos de voz.
 * Produce el mismo formato: { characters, character_start_times_seconds,
 * character_end_times_seconds } sobre el texto exacto de narracion.txt.
 *
 * Uso: node scripts/mock-tts.js out/narracion.txt out/alignment.json
 */
const fs = require("fs");

const [, , entrada, salida = "out/alignment.json"] = process.argv;
if (!entrada) { console.error("Uso: node scripts/mock-tts.js <narracion.txt> [alignment.json]"); process.exit(1); }
const texto = fs.readFileSync(entrada, "utf8");

const characters = [];
const starts = [];
const ends = [];
let t = 0.35; // pequeño silencio inicial
for (const c of texto) {
  let dur;
  if (c === "\n") dur = 0.32;            // respiración de párrafo (x2 por \n\n)
  else if (/[.!?…]/.test(c)) dur = 0.34; // fin de frase
  else if (/[,;:]/.test(c)) dur = 0.18;
  else if (c === " ") dur = 0.055;
  else dur = 0.062;                      // ~16 caracteres/segundo, ritmo hablado ES
  characters.push(c);
  starts.push(Number(t.toFixed(3)));
  t += dur;
  ends.push(Number(t.toFixed(3)));
}
fs.writeFileSync(salida, JSON.stringify({
  characters,
  character_start_times_seconds: starts,
  character_end_times_seconds: ends,
  _mock: true,
  _duracion: Number(t.toFixed(2)),
}, null, 0));
console.log(`OK: alineación simulada de ${characters.length} caracteres, duración estimada ${(t / 60).toFixed(1)} min.`);
