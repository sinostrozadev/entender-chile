// EL FONDO DE TENSIÓN. Santiago corrigió dos cosas el 07-10-2026:
//
// 1. "Tampoco es tan rápido el incremento, se supone que es para mantener
//    tensión en TODA una sección". O sea esto no es un riser de siete
//    segundos: es una cama que aguanta una sección entera de la Clave, que
//    dura entre cuarenta y sesenta. La subida tiene que ser tan lenta que no
//    se note mientras pasa, y recién al final uno se dé cuenta de que viene
//    creciendo hace un minuto. Acá dura 45 s y el corte va en el 42.
//
// 2. "Hay un sonido que no va". No sé cuál es y no lo voy a adivinar, así que
//    van cuatro versiones que lo AÍSLAN. Los dos sospechosos:
//
//    EL RUIDO DE ARCO. Lo hice crecer con la presión, que es físicamente
//    correcto, pero sostenido durante cuarenta segundos un ruido de banda
//    ancha deja de leerse como crin y se lee como siseo de cinta.
//
//    EL SUB GRAVE. El contrabajo estaba en 36,7 Hz, por DEBAJO de la nota más
//    grave de un contrabajo real, que es un mi de 41. En la mayoría de los
//    parlantes eso no da nota, da retumbe.
//
// uso: node scripts/taller-tension.js <carpeta>

const fs = require("fs");
const path = require("path");
const { sala, seccionCreciente } = require("./motor-sonido");

const SR = 32000;
const DESTINO = process.argv[2] || "public/sonidos/taller";
const RE = 146.83;
const nota = (st) => RE * Math.pow(2, st / 12);
const CORTE = 42, TOTAL = 45;
const n = Math.round(TOTAL * SR);

const voz = (dest, st, desde, niv, { brillo = 0.5, aspereza = 0.12, parciales = 14 } = {}) => {
  const dur = CORTE - desde + 0.2;
  if (dur <= 0.3) return;
  const onda = seccionCreciente(nota(st), SR, dur, {
    musicos: 5, brilloBase: brillo, aspereza, parciales,
    envolvente: (t) => {
      const abs = desde + t;
      if (abs >= CORTE) { const d = (abs - CORTE) / 0.03; return d >= 1 ? 0 : 1 - d; }
      return Math.pow(Math.max(0, (abs - desde) / Math.max(0.001, CORTE - desde)), 1.6);
    },
  });
  const i0 = Math.round(desde * SR);
  for (let i = 0; i < onda.length && i0 + i < dest.length; i++) {
    const t = (i0 + i) / SR;
    // la subida general, MUY lenta: a la mitad del recorrido va recién en un
    // tercio del camino. Es lo que la hace aguantar una sección sin cansar.
    const global = t >= CORTE ? 0 : 0.18 + 0.82 * Math.pow(t / CORTE, 1.9);
    dest[i0 + i] += onda[i] * niv * global;
  }
};

const escribir = (nombre, x) => {
  const r = sala(x, SR, 1, 0.8);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.74 + r[i] * 0.26 * 1.9;
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    if (t > CORTE) { const d = (t - CORTE) / 0.14; x[i] *= d >= 1 ? 0 : 1 - d; }
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
  console.log("  " + nombre.padEnd(22), (x.length / SR).toFixed(0) + "s, corte en " + CORTE + "s");
};

// las voces, con el sub grave y el techo agudo como variables
const armar = ({ grave, aspereza, parciales }) => {
  const x = new Float32Array(n);
  voz(x, grave, 0.0, 0.95, { brillo: 0.38, aspereza, parciales });
  voz(x, grave + 12, 6, 0.52, { brillo: 0.40, aspereza, parciales });
  voz(x, 0, 13, 0.40, { brillo: 0.46, aspereza, parciales });
  voz(x, 7, 20, 0.34, { brillo: 0.50, aspereza, parciales });
  voz(x, 19, 28, 0.22, { brillo: 0.54, aspereza, parciales });
  return x;
};

console.log("CUATRO VERSIONES PARA AISLAR EL SONIDO QUE SOBRA");
escribir("t1-como-estaba.wav", armar({ grave: -24, aspereza: 0.12, parciales: 14 }));
escribir("t2-sin-ruido-arco.wav", armar({ grave: -24, aspereza: 0.0, parciales: 14 }));
escribir("t3-sin-sub-grave.wav", armar({ grave: -12, aspereza: 0.12, parciales: 14 }));
escribir("t4-las-dos-y-mas-oscura.wav", armar({ grave: -12, aspereza: 0.0, parciales: 8 }));
console.log("");
console.log("  t1 es la de antes pero lenta: 45 s en vez de 7");
console.log("  t2 le saca el ruido de arco, que sostenido puede leerse como siseo");
console.log("  t3 sube el contrabajo de 36,7 a 73,4 Hz, o sea a registro de contrabajo real");
console.log("  t4 le saca los dos y además baja el techo de armónicos de 14 a 8");
