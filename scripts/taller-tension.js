// El sonido de tensión que pidió Santiago el 07-10-2026: "orquestal pero
// sostenido, más violín, chelo y ese violín grande que va al piso (el
// contrabajo), en un tono de tensión que empiece a subir el volumen poco a poco
// hasta llegar al clímax y pare brusco".
//
// OJO, Y ESTO HAY QUE DECIRLO: eso es exactamente un riser, y la regla dura 30,
// que reescribimos hoy mismo, dice "prohibido el lenguaje del suspenso:
// trémolo, dron grave de amenaza, riser, pulso que acelera". No lo construyo a
// escondidas de la regla. Van dos versiones para que decida con las dos en el
// oído:
//
//   A  tal cual lo pidió, con el idioma del suspenso completo: el dron grave de
//      amenaza y el violín subiendo de a un semitono. Es lo que la regla prohíbe.
//   B  el mismo gesto sin ese idioma: crece igual y para igual de brusco, pero
//      la tensión viene de que ENTRAN MÁS VOCES y se abre el registro, no de
//      que algo amenace. Todas las notas en quintas y octavas, ninguna se mueve.
//
// El corte brusco no es lenguaje de suspenso y va en las dos: es un recurso
// rítmico, lo que asusta es lo que viene antes.
//
// uso: node scripts/taller-tension.js <carpeta>

const fs = require("fs");
const path = require("path");
const { sala, seccionLarga } = require("./motor-sonido");

const SR = 32000;
const DESTINO = process.argv[2] || "public/sonidos/taller";
const RE = 146.83;
const nota = (st) => RE * Math.pow(2, st / 12);
const LARGO = 7.5, CORTE = 7.0, TOTAL = 10;

const n = Math.round(TOTAL * SR);
const suave = (t) => t * t * (3 - 2 * t);

// la subida: lenta al principio y acelerando hacia el final, que es como crece
// una tensión de verdad. Cae a cero de golpe en el corte, en 25 ms, que es lo
// justo para que no chasquee y siga siendo brusco.
const envolvente = (t) => {
  if (t >= CORTE) {
    const d = (t - CORTE) / 0.025;
    return d >= 1 ? 0 : (1 - d) * Math.pow(1, 2);
  }
  const x = t / CORTE;
  return Math.pow(x, 2.2);
};

const voz = (dest, st, desde, niv, { brillo = 0.5, desliz = 0 } = {}) => {
  const dur = CORTE - desde + 0.1;
  if (dur <= 0.2) return;
  const onda = seccionLarga(nota(st), SR, dur, { musicos: 9, brillo });
  // el deslizamiento de la versión A: el violín trepa un semitono, que es LA
  // señal de amenaza del cine. Se hace releyendo la onda a paso variable.
  const i0 = Math.round(desde * SR);
  let lectura = 0;
  for (let i = 0; i0 + i < Math.round(CORTE * SR) + Math.round(0.05 * SR) && i < onda.length * 2; i++) {
    const t = (i0 + i) / SR;
    const prog = Math.min(1, (t - desde) / Math.max(0.001, CORTE - desde));
    const paso = desliz ? Math.pow(2, (desliz * suave(prog)) / 12) : 1;
    lectura += paso;
    const k = Math.floor(lectura);
    if (k >= onda.length) break;
    const entra = Math.min(1, (t - desde) / 0.8);
    dest[i0 + i] += onda[k] * niv * envolvente(t) * entra;
  }
};

const escribir = (nombre, x) => {
  const r = sala(x, SR, 1, 0.8);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.74 + r[i] * 0.26 * 1.9;
  // la sala NO puede sobrevivir al corte: si queda cola, el corte deja de ser
  // corte. Se apaga también, un pelo después que el resto.
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    if (t > CORTE) { const d = (t - CORTE) / 0.12; x[i] *= d >= 1 ? 0 : 1 - d; }
  }
  let p = 0; for (let i = 0; i < x.length; i++) if (Math.abs(x[i]) > p) p = Math.abs(x[i]);
  const k = p > 0 ? 0.62 / p : 1;
  const m = new Int16Array(x.length);
  for (let i = 0; i < x.length; i++) m[i] = Math.max(-32768, Math.min(32767, Math.round(x[i] * k * 32767)));
  const b = Buffer.from(m.buffer), c = Buffer.alloc(44);
  c.write("RIFF", 0); c.writeUInt32LE(36 + b.length, 4); c.write("WAVE", 8); c.write("fmt ", 12);
  c.writeUInt32LE(16, 16); c.writeUInt16LE(1, 20); c.writeUInt16LE(1, 22); c.writeUInt32LE(SR, 24);
  c.writeUInt32LE(SR * 2, 28); c.writeUInt16LE(2, 32); c.writeUInt16LE(16, 34); c.write("data", 36); c.writeUInt32LE(b.length, 40);
  fs.mkdirSync(DESTINO, { recursive: true });
  fs.writeFileSync(path.join(DESTINO, nombre), Buffer.concat([c, b]));
  console.log("  " + nombre.padEnd(18), (x.length / SR).toFixed(1) + "s, corte en " + CORTE + "s");
};

// A: como lo pidió, con el idioma completo
{
  const x = new Float32Array(n);
  voz(x, -24, 0.0, 0.95, { brillo: 0.40 });            // contrabajo, el piso
  voz(x, -12, 0.8, 0.50, { brillo: 0.42 });            // contrabajo octava arriba
  voz(x, 7, 2.0, 0.42, { brillo: 0.50 });              // chelo en la
  voz(x, 24, 3.4, 0.30, { brillo: 0.58, desliz: 1 });  // violín que TREPA un semitono
  voz(x, 31, 5.0, 0.20, { brillo: 0.62, desliz: 1 });
  escribir("tension-A.wav", x);
}

// B: el mismo gesto, sin el idioma. Nadie se mueve, todo en quintas y octavas,
// y la tensión viene de que se va llenando el registro.
{
  const x = new Float32Array(n);
  voz(x, -24, 0.0, 0.95, { brillo: 0.38 });   // contrabajo
  voz(x, -12, 1.2, 0.52, { brillo: 0.40 });   // su octava
  voz(x, 0, 2.6, 0.40, { brillo: 0.46 });     // chelo en re
  voz(x, 7, 3.8, 0.34, { brillo: 0.50 });     // chelo en la
  voz(x, 19, 5.0, 0.24, { brillo: 0.56 });    // violín en la
  voz(x, 24, 6.0, 0.18, { brillo: 0.60 });    // violín en re
  escribir("tension-B.wav", x);
}
