// EL SELLO DE ENTENDER CHILE. Las notas las dictó Santiago el 07-10-2026,
// compás por compás, después de escuchar dieciocho candidatas.
//
//   1  re4 re4 la4 re5      5  re4 re4 la4 re5
//   2  re4 re4 re5 do5      6  re4 re4 re5 do5
//   3  re4 re4 la4 re5      7  re4 re4 la4 re5
//   4  re4 re4 re5 mi5      8  re4 re4 re5 mi5
//
// El octavo compás terminaba en sol5 y lo cambió: "está horrible el compás 8,
// deja el 4 y el 8 como el 4". Tenía razón y la razón es de forma: el sol5 es
// la cuarta de arriba, abre MÁS que el mi, así que el período terminaba más
// abierto de lo que había empezado y no cerraba el arco en ninguna parte. Con
// los dos en mi, la segunda mitad responde a la primera diciendo lo mismo, que
// es lo que hace a un período.
//
// El sello no resuelve nunca: el mi es la novena y queda pidiendo. Eso es a
// propósito, porque lo que viene después es el video.
//
// La rítmica es de él: base de corchea corchea y silencio de negra, cuatro
// veces por compás, y melodía de negra corchea corchea corchea sostenida.
//
// uso: node scripts/sello.js <salida.wav> [--base 4|2|1]

const fs = require("fs");
const path = require("path");
const { sala, barra, pianoFieltro, seccionCuerdas } = require("./motor-sonido");

const SR = 32000;
const salida = process.argv[2] || "public/sonidos/sello.wav";
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
// cada cuántos golpes se entera la base de la melodía. 4 = una vez por compás,
// que es la más seria: moverla en los cuatro la vuelve contramelodía.
const CADA = Number(arg("base", 4));

const BPM = 132, NEGRA = 60 / BPM, CORCHEA = NEGRA / 2, COMPAS = NEGRA * 8;
const RE = 146.83;
const nota = (st) => RE * Math.pow(2, st / 12);

const BASE_T = [];
for (let c = 0; c < 4; c++) { BASE_T.push(c * NEGRA * 2); BASE_T.push(c * NEGRA * 2 + CORCHEA); }
const MEL_T = [0, NEGRA, NEGRA + CORCHEA, NEGRA + CORCHEA * 2];

const A = [12, 12, 19, 24];   // re4 re4 la4 re5
const B = [12, 12, 24, 22];   // re4 re4 re5 do5
const C = [12, 12, 24, 26];   // re4 re4 re5 mi5
const COMPASES = [A, B, A, C, A, B, A, C];

// el bajo busca la octava más cercana a donde venía: si la melodía baja un paso
// el bajo no puede saltar una séptima para arriba
const BAJO_MIN = -14, BAJO_MAX = -2;
const raizCerca = (mel, previa) => {
  const r = (((mel % 12) + 12) % 12) - 12;
  let mejor = r, dist = Infinity;
  for (let o = -1; o <= 1; o++) {
    const c = r + 12 * o;
    if (c < BAJO_MIN || c > BAJO_MAX) continue;
    const d = Math.abs(c - previa);
    if (d < dist) { dist = d; mejor = c; }
  }
  return mejor;
};

const TOTAL = COMPASES.length * COMPAS + 4;
const x = new Float32Array(Math.round(TOTAL * SR));
const poner = (onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  for (let k = 0; k < onda.length && i0 + k < x.length; k++) x[i0 + k] += onda[k] * niv;
};
const cache = new Map();
const cuerda = (st) => {
  if (!cache.has(st)) cache.set(st, seccionCuerdas(nota(st), SR, 1.2, { musicos: 9, cola: 0.26, ataque: 0.014, brillo: 0.46 }));
  return cache.get(st);
};

let previa = -12;
COMPASES.forEach((mel, c) => {
  const tb = 0.4 + c * COMPAS;
  for (let k = 0; k < 4; k++) {
    if (k % CADA === 0) previa = raizCerca(mel[k], previa);
    poner(cuerda(previa), tb + BASE_T[k * 2], 0.55);
    poner(cuerda(previa + 7), tb + BASE_T[k * 2 + 1], 0.40);
  }
  const ultimo = c === COMPASES.length - 1;
  mel.forEach((st, k) => {
    const largo = k === 3 ? (ultimo ? 4.6 : (c % 4 === 3 ? 3.4 : 2.6)) : 1.6;
    poner(barra(nota(st), SR, largo + 1.5, { tipo: "metal", cola: largo, mazo: 0.78 }), tb + MEL_T[k], [1.0, 0.6, 0.62, 0.95][k]);
  });
  poner(pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.2 }), tb, 0.26);
});

const r = sala(x, SR, 1, 0.78);
for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.72 + r[i] * 0.28 * 1.9;
let p = 0; for (let i = 0; i < x.length; i++) if (Math.abs(x[i]) > p) p = Math.abs(x[i]);
const k = p > 0 ? 0.62 / p : 1;
const m = new Int16Array(x.length);
for (let i = 0; i < x.length; i++) m[i] = Math.max(-32768, Math.min(32767, Math.round(x[i] * k * 32767)));
const b = Buffer.from(m.buffer), cab = Buffer.alloc(44);
cab.write("RIFF", 0); cab.writeUInt32LE(36 + b.length, 4); cab.write("WAVE", 8); cab.write("fmt ", 12);
cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22); cab.writeUInt32LE(SR, 24);
cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34); cab.write("data", 36); cab.writeUInt32LE(b.length, 40);
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, Buffer.concat([cab, b]));
console.log(salida, TOTAL.toFixed(1) + "s", "| base cada " + CADA + " golpes");
console.log("compases:", COMPASES.map((c2, i) => (i + 1) + ")" + (c2 === A ? "A" : c2 === B ? "B" : "C")).join(" "));
