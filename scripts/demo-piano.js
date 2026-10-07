// Demo suelto: toca los catorce acordes de la Clave en piano de fieltro, para
// poder ELEGIR el instrumento escuchándolo y no leyendo una descripción.
// uso: node scripts/demo-piano.js salida.wav
// Demo: los catorce acordes de la Clave, tocados en piano de fieltro.
const fs = require("fs");
const { pulsar, sala, caja, pianoFieltro } = require("./motor-sonido");
const SR = 32000;
const E = [0, 2, 3, 5, 7, 8, 10];
const ARCO = [0, 3, -2, -2, 5, 5, 8, 7, 7, 8, 5, 3, -2, 0];
const voces = (st) => { const o = Math.floor(st / 12), r = st - 12 * o, i = E.indexOf(r);
  const g = (k) => E[(i + k) % 7] + 12 * Math.floor((i + k) / 7) + 12 * o;
  return [st - 12, st, g(2) + 12, g(4) + 12]; };
const nota = (st) => 110 * Math.pow(2, st / 12);

const PASO = 2.6, n = Math.round((ARCO.length * PASO + 5) * SR);
const seco = new Float32Array(n);
ARCO.forEach((st, i) => {
  const t0 = 0.4 + i * PASO;
  voces(st).forEach((v, k) => {
    const retardo = k * 0.045; // arpegiado mínimo: una mano no cae perfecta
    const p = pianoFieltro(nota(v + 12), SR, 6.5, { fieltro: 1.2, cuerdas: 3, cola: 3.4 });
    const i0 = Math.round((t0 + retardo) * SR);
    const niv = [0.55, 1, 0.42, 0.6][k];
    for (let j = 0; j < p.length && i0 + j < n; j++) seco[i0 + j] += p[j] * niv * 0.30;
  });
});
const cuerpo = caja(seco, SR);
for (let i = 0; i < n; i++) seco[i] += cuerpo[i] * 0.30;
const rev = sala(seco, SR, 1, 0.80);
let pico = 0;
for (let i = 0; i < n; i++) { const v = seco[i] * 0.70 + rev[i] * 0.30 * 1.9; if (Math.abs(v) > pico) pico = Math.abs(v); }
const k = 0.72 / pico;
const m = new Int16Array(n);
for (let i = 0; i < n; i++) m[i] = Math.max(-32768, Math.min(32767, Math.round((seco[i] * 0.70 + rev[i] * 0.30 * 1.9) * k * 32767)));
const b = Buffer.from(m.buffer), c = Buffer.alloc(44);
c.write("RIFF", 0); c.writeUInt32LE(36 + b.length, 4); c.write("WAVE", 8); c.write("fmt ", 12);
c.writeUInt32LE(16, 16); c.writeUInt16LE(1, 20); c.writeUInt16LE(1, 22); c.writeUInt32LE(SR, 24);
c.writeUInt32LE(SR * 2, 28); c.writeUInt16LE(2, 32); c.writeUInt16LE(16, 34); c.write("data", 36); c.writeUInt32LE(b.length, 40);
fs.writeFileSync(process.argv[2], Buffer.concat([c, b]));
console.log(process.argv[2], (n / SR).toFixed(1) + "s", ARCO.length + " acordes");
