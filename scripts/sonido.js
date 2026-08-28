#!/usr/bin/env node
// Genera los sonidos del canal desde cero, por sintesis. No se descarga nada:
// cada archivo sale de este codigo, asi que es nuestro, no lo reclama Content ID
// y suena igual siempre sin depender de una libreria de terceros.
//
//   node scripts/sonido.js
//
// Escribe WAV mono 44,1 kHz en public/musica/. Remotion reproduce WAV directo.

const fs = require("fs");
const path = require("path");

const SR = 44100;
const SALIDA = path.join(__dirname, "..", "public", "musica");

// Un solo motivo para todo el canal: re - la - re. Quinta justa mas octava, el
// intervalo mas neutro que existe. Ni alegre ni triste: sobrio, que es el tono.
const NOTA = { re3: 146.83, la3: 220.0, re4: 293.66, fa4: 349.23, la4: 440.0, re5: 587.33 };

// Timbre: parciales de barra percutida (tipo marimba con cola de campana). Los
// agudos se apagan antes que el fundamental, que es lo que hace que suene a algo
// golpeado y no a un pitido de sintetizador.
const PARCIALES = [
  { mult: 1.0, amp: 1.0, decay: 1.0 },
  { mult: 2.0, amp: 0.3, decay: 0.55 },
  { mult: 3.01, amp: 0.12, decay: 0.35 },
  { mult: 4.2, amp: 0.05, decay: 0.22 },
];

function nota(buf, inicioSeg, freq, durSeg, amp, tau) {
  const i0 = Math.round(inicioSeg * SR);
  const n = Math.round(durSeg * SR);
  const ataque = Math.round(0.006 * SR); // 6 ms: sin esto se oye un clic
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = i < ataque ? i / ataque : 1;
    let v = 0;
    for (const p of PARCIALES) {
      v += p.amp * Math.exp(-t / (tau * p.decay)) * Math.sin(2 * Math.PI * freq * p.mult * t);
    }
    const j = i0 + i;
    if (j < buf.length) buf[j] += v * env * amp;
  }
}

// Un colchon muy bajo de octava grave le da peso al sello sin que se oiga como
// una nota aparte. Es lo que separa un logo sonoro de un timbre de microondas.
function fondo(buf, inicioSeg, freq, durSeg, amp) {
  const i0 = Math.round(inicioSeg * SR);
  const n = Math.round(durSeg * SR);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.25) * Math.exp(-t / (durSeg * 0.45));
    const j = i0 + i;
    if (j < buf.length) buf[j] += amp * env * Math.sin(2 * Math.PI * freq * t);
  }
}

function terminar(buf, pico = 0.72) {
  let max = 0;
  for (const v of buf) max = Math.max(max, Math.abs(v));
  const g = max > 0 ? pico / max : 1;
  const cola = Math.round(0.08 * SR); // desvanecido final: nunca cortar en seco
  for (let i = 0; i < buf.length; i++) {
    let v = buf[i] * g;
    if (i > buf.length - cola) v *= (buf.length - i) / cola;
    buf[i] = Math.tanh(v * 1.05); // saturacion suave, hace de limitador
  }
  return buf;
}

function escribir(nombre, buf) {
  const datos = Buffer.alloc(buf.length * 2);
  for (let i = 0; i < buf.length; i++) {
    datos.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(buf[i] * 32767))), i * 2);
  }
  const cab = Buffer.alloc(44);
  cab.write("RIFF", 0);
  cab.writeUInt32LE(36 + datos.length, 4);
  cab.write("WAVE", 8);
  cab.write("fmt ", 12);
  cab.writeUInt32LE(16, 16);
  cab.writeUInt16LE(1, 20);   // PCM
  cab.writeUInt16LE(1, 22);   // mono
  cab.writeUInt32LE(SR, 24);
  cab.writeUInt32LE(SR * 2, 28);
  cab.writeUInt16LE(2, 32);
  cab.writeUInt16LE(16, 34);
  cab.write("data", 36);
  cab.writeUInt32LE(datos.length, 40);
  const destino = path.join(SALIDA, nombre);
  fs.writeFileSync(destino, Buffer.concat([cab, datos]));
  console.log(`${nombre}  ${(fs.statSync(destino).size / 1024).toFixed(0)} kB  ${(buf.length / SR).toFixed(2)} s`);
}

const lienzo = (seg) => new Float64Array(Math.round(seg * SR));

// --- sello de apertura: 2,6 s -----------------------------------------------
// Las tres notas del motivo, completas. Es el unico lugar donde se oye entero.
{
  const b = lienzo(2.6);
  fondo(b, 0.0, NOTA.re3, 2.5, 0.16);
  nota(b, 0.00, NOTA.re4, 2.4, 0.55, 1.1);
  nota(b, 0.34, NOTA.la4, 2.1, 0.5, 1.1);
  nota(b, 0.68, NOTA.re5, 1.8, 0.42, 1.3);
  escribir("sello.wav", terminar(b));
}

// --- cortinas de seccion: 1,0 s ---------------------------------------------
// Solo dos notas: el motivo insinuado, no repetido. Tres variantes para que
// dentro de un mismo video las transiciones no suenen calcadas.
const CORTINAS = [
  { nombre: "cortina-a.wav", notas: [NOTA.la4, NOTA.re5] },
  { nombre: "cortina-b.wav", notas: [NOTA.re4, NOTA.la4] },
  { nombre: "cortina-c.wav", notas: [NOTA.fa4, NOTA.re5] },
];
for (const c of CORTINAS) {
  const b = lienzo(1.05);
  nota(b, 0.0, c.notas[0], 1.0, 0.5, 0.5);
  nota(b, 0.16, c.notas[1], 0.85, 0.44, 0.55);
  escribir(c.nombre, terminar(b, 0.5)); // mas bajo que el sello: puntua, no anuncia
}

// --- cierre: 3,2 s ----------------------------------------------------------
// El motivo al reves y bajando. Cola larga porque abajo no hay nada que tape.
{
  const b = lienzo(3.2);
  fondo(b, 0.1, NOTA.re3, 3.0, 0.18);
  nota(b, 0.00, NOTA.re5, 2.4, 0.42, 1.2);
  nota(b, 0.40, NOTA.la4, 2.4, 0.48, 1.4);
  nota(b, 0.86, NOTA.re4, 2.3, 0.55, 1.7);
  escribir("cierre.wav", terminar(b));
}

// --- muestra para escuchar ---------------------------------------------------
// node scripts/sonido.js --muestra ruta.wav
// Encadena los cinco sonidos con silencio en medio, para poder juzgarlos de
// una sentada sin tener que renderizar un video entero.
if (process.argv.includes("--muestra")) {
  const destino = process.argv[process.argv.indexOf("--muestra") + 1] || "muestra-sonido.wav";
  const orden = ["sello.wav", "cortina-a.wav", "cortina-b.wav", "cortina-c.wav", "cierre.wav"];
  const trozos = orden.map((f) => {
    const b = fs.readFileSync(path.join(SALIDA, f));
    const n = (b.length - 44) / 2;
    const x = new Float64Array(n);
    for (let i = 0; i < n; i++) x[i] = b.readInt16LE(44 + i * 2) / 32767;
    return x;
  });
  const hueco = Math.round(0.9 * SR);
  const total = trozos.reduce((a, t) => a + t.length + hueco, 0);
  const b = new Float64Array(total);
  let cursor = 0;
  for (const t of trozos) {
    b.set(t, cursor);
    cursor += t.length + hueco;
  }
  const datos = Buffer.alloc(b.length * 2);
  for (let i = 0; i < b.length; i++) datos.writeInt16LE(Math.round(b[i] * 32767), i * 2);
  const cab = Buffer.alloc(44);
  cab.write("RIFF", 0); cab.writeUInt32LE(36 + datos.length, 4); cab.write("WAVE", 8);
  cab.write("fmt ", 12); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20);
  cab.writeUInt16LE(1, 22); cab.writeUInt32LE(SR, 24); cab.writeUInt32LE(SR * 2, 28);
  cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34);
  cab.write("data", 36); cab.writeUInt32LE(datos.length, 40);
  fs.writeFileSync(destino, Buffer.concat([cab, datos]));
  console.log(`muestra: ${destino}  ${(b.length / SR).toFixed(1)} s`);
}
