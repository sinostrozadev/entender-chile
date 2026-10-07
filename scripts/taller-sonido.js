// Taller de sonido: genera candidatos para ESCUCHARLOS y elegir, no para
// describirlos. La regla 19 dice que la máquina produce y una persona aprueba,
// y una melodía no se aprueba leyendo una explicación.
//
// Produce tres cosas:
//   melodias.wav  seis candidatas a melodía del canal, separadas por silencio
//   cambios.wav   cuatro formas de marcar el cambio de sección, en contexto
//   viaje-*.wav   el aire del viaje en tres intensidades
//
// uso: node scripts/taller-sonido.js <carpeta de salida>

const fs = require("fs");
const path = require("path");
const { azar, sala, barra, pianoFieltro } = require("./motor-sonido");

const SR = 32000;
const DESTINO = process.argv[2] || "public/sonidos/taller";
const RE = 146.83;
const DORICO = [0, 2, 3, 5, 7, 9, 10];
const nota = (st) => RE * Math.pow(2, st / 12);

const lienzo = (seg) => new Float32Array(Math.round(seg * SR));
const poner = (dest, onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  for (let k = 0; k < onda.length && i0 + k < dest.length; k++) dest[i0 + k] += onda[k] * niv;
};

const escribir = (nombre, x, objetivo = 0.5) => {
  let pico = 0;
  for (let i = 0; i < x.length; i++) if (Math.abs(x[i]) > pico) pico = Math.abs(x[i]);
  const k = pico > 0 ? objetivo / pico : 1;
  const m = new Int16Array(x.length);
  for (let i = 0; i < x.length; i++) m[i] = Math.max(-32768, Math.min(32767, Math.round(x[i] * k * 32767)));
  const b = Buffer.from(m.buffer), c = Buffer.alloc(44);
  c.write("RIFF", 0); c.writeUInt32LE(36 + b.length, 4); c.write("WAVE", 8); c.write("fmt ", 12);
  c.writeUInt32LE(16, 16); c.writeUInt16LE(1, 20); c.writeUInt16LE(1, 22); c.writeUInt32LE(SR, 24);
  c.writeUInt32LE(SR * 2, 28); c.writeUInt16LE(2, 32); c.writeUInt16LE(16, 34); c.write("data", 36); c.writeUInt32LE(b.length, 40);
  fs.mkdirSync(DESTINO, { recursive: true });
  const f = path.join(DESTINO, nombre);
  fs.writeFileSync(f, Buffer.concat([c, b]));
  console.log("  " + nombre.padEnd(22), (x.length / SR).toFixed(1) + "s");
  return f;
};

// EL AIRE DEL VIAJE, de nuevo y más suave. El de antes medía 21 dB POR ENCIMA
// de la música, y además barría hasta 5,8 kHz, que ya no es aire sino siseo.
// Acá el techo baja a menos de 2 kHz: queda aire movido, no viento.
const aire = (seg, { f0 = 240, f1 = 1300, q = 0.986 } = {}) => {
  const n = Math.round(seg * SR), out = new Float32Array(n);
  let y1 = 0, y2 = 0;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const env = 30 * t * t * (1 - t) * (1 - t) / 1.875;
    const f = f0 + (f1 - f0) * Math.sin(Math.PI * t);
    const w = 2 * Math.PI * f / SR;
    const y = azar() * (1 - q) + 2 * q * Math.cos(w) * y1 - q * q * y2;
    y2 = y1; y1 = y;
    out[i] = y * env;
  }
  let p = 0; for (let i = 0; i < n; i++) if (Math.abs(out[i]) > p) p = Math.abs(out[i]);
  if (p > 0) for (let i = 0; i < n; i++) out[i] /= p;
  return out;
};

const campana = (st, seg = 4, cola = 2.4) => barra(nota(st), SR, seg, { tipo: "metal", cola, mazo: 0.78 });
const madera = (st, seg = 2.5, cola = 1.2) => barra(nota(st), SR, seg, { tipo: "madera", cola, mazo: 0.8 });

// ================= LAS SEIS CANDIDATAS =================
// Todas en re, todas sin terceras, todas en barra percutida: lo que cambia es
// el GESTO, que es lo único que de verdad se elige.
const MELODIAS = [
  { nombre: "1 el sello de hoy",      notas: [[0, -12], [0.34, -5], [0.68, 0]], por: "re la re. Es lo que ya existe desde el 27-08, va de referencia para comparar" },
  { nombre: "2 con vuelta",           notas: [[0, -12], [0.30, -5], [0.60, 0], [0.90, -2], [1.26, -5]], por: "re la re DO la. El do natural es la séptima del dórico y devuelve la frase al centro" },
  { nombre: "3 la sexta dórica",      notas: [[0, -12], [0.32, -5], [0.64, -3], [0.96, -5]], por: "re la SI la. El si natural es LA nota que distingue al dórico del menor: es el modo diciendo su nombre" },
  { nombre: "4 cuartas apiladas",     notas: [[0, -12], [0.30, -7], [0.60, -2], [0.90, 3]], por: "re sol do fa. Puras cuartas, cero terceras: es el sonido del mecanismo, nada de veredicto" },
  { nombre: "5 pregunta abierta",     notas: [[0, -12], [0.34, -5], [0.68, 2]], por: "re la MI. Termina en la segunda, que no resuelve: dice hay más en esto, que es la propuesta del canal" },
  { nombre: "6 el engranaje",         notas: [[0, -12], [0.40, -5], [0.80, -12], [1.20, -5], [0.20, 0], [0.60, 7], [1.00, 0], [1.40, 7]], por: "dos voces entrelazadas, una grave y una aguda, desfasadas medio pulso. Es el proceso aditivo comprimido en un sello" },
];

console.log("MELODÍAS");
{
  const total = MELODIAS.length * 5 + 2;
  const x = lienzo(total);
  MELODIAS.forEach((m, i) => {
    const t0 = 0.6 + i * 5;
    m.notas.forEach(([dt, st], k) => poner(x, campana(st, 5, 2.6), t0 + dt, 0.9 - k * 0.06));
    // un re grave sosteniendo, para oírla como suena de verdad y no pelada
    poner(x, pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.4 }), t0, 0.30);
  });
  const rev = sala(x, SR, 1, 0.78);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.72 + rev[i] * 0.28 * 1.9;
  escribir("melodias.wav", x);
  MELODIAS.forEach((m, i) => console.log("     " + String(0.6 + i * 5).padStart(5) + "s  " + m.nombre + ": " + m.por));
}

// ================= LOS CUATRO CAMBIOS DE SECCIÓN =================
// Cada uno va con dos segundos de cama antes y tres después, porque un cambio
// de sección no se juzga solo: se juzga por cómo entra y cómo sale.
const camita = (dest, t0, seg, st) => {
  const CEL = [0, -1, 0, -1, 2];
  for (let k = 0, t = 0; t < seg; t += 0.75, k++) {
    poner(dest, madera(DORICO[(((CEL[k % 5]) % 7) + 7) % 7] + 12 + st, 2.2, 1.3), t0 + t, 0.34);
  }
  poner(dest, pianoFieltro(nota(st - 12), SR, 7, { fieltro: 1.2, cuerdas: 3, cola: 3.8 }), t0, 0.22);
};

// Los cuatro están repartidos A PROPÓSITO en un abanico, de seis decibeles por
// debajo de la cama a seis por encima. El primer intento los dejó a todos entre
// uno y tres, o sea corregí de más: el de hoy sobresalía 21 dB y lo bajé tanto
// que ya no se notaba el cambio. Un abanico se puede elegir, cuatro versiones
// de lo mismo no.
const CAMBIOS = [
  { nombre: "A solo la campana", aire: 0, camp: 1.1, por: "sin nada de aire. El cambio lo marca solo la nota" },
  { nombre: "B campana y aire suave", aire: 0.24, camp: 1.3, por: "la mezcla de hoy pero con el aire 14 dB más abajo y sin el siseo agudo" },
  { nombre: "C solo aire, muy bajo", aire: 0.13, camp: 0, por: "sin campana, y por debajo de la cama. Solo se insinúa que algo se movió" },
  { nombre: "D campana doble", aire: 0.2, camp: 2.2, doble: true, por: "dos campanas a distancia de quinta, la segunda un pelo después: suena a engranaje entrando" },
];

console.log("");
console.log("CAMBIOS DE SECCIÓN");
{
  const unidad = 7.5;
  const x = lienzo(CAMBIOS.length * unidad + 2);
  CAMBIOS.forEach((c, i) => {
    const t0 = 0.5 + i * unidad;
    camita(x, t0, 2.2, 0);          // sección vieja
    const tc = t0 + 2.4;
    if (c.aire) poner(x, aire(1.5), tc, c.aire);
    if (c.camp) {
      poner(x, campana(12, 5, 2.4), tc + 0.12, c.camp);
      if (c.doble) poner(x, campana(19, 5, 2.2), tc + 0.26, c.camp * 0.6);
    }
    camita(x, tc + 1.5, 3.0, 5);    // sección nueva, un tono más arriba
  });
  const rev = sala(x, SR, 1, 0.78);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.74 + rev[i] * 0.26 * 1.9;
  escribir("cambios.wav", x);
  CAMBIOS.forEach((c, i) => console.log("     " + String(0.5 + i * unidad).padStart(5) + "s  " + c.nombre + ": " + c.por));
}

console.log("");
console.log("AIRE DEL VIAJE, tres intensidades (el de hoy medía 21 dB sobre la música)");
[["viaje-suave.wav", 1300], ["viaje-medio.wav", 1900], ["viaje-apenas.wav", 900]].forEach(([n, f1]) => {
  const a = aire(1.5, { f1 });
  const x = lienzo(1.5);
  for (let i = 0; i < a.length; i++) x[i] = a[i];
  escribir(n, x, 0.42);
});
