// Genera la cama de música de una Clave a partir de SU PROPIO guion.
//
// Por qué se genera y no se guarda: la música sigue el recorrido de la cámara,
// así que depende del guion. Guardarla sería guardar una copia que se
// desactualiza sola, y son 37 MB de WAV por Clave en un repo donde el espacio
// ya preocupa. Se genera antes de renderizar, como las carátulas.
//
// LA IDEA, y es la misma que hizo funcionar el sonido del viaje: la música no
// sigue al reloj, sigue a la cámara. El acorde cambia en cada sección y GLISA
// durante el segundo y medio en que el mural se mueve. Nadie va a saber por
// qué, pero la pieza se siente yendo a alguna parte porque literalmente va.
//
// Las catorce raíces hacen un arco en La eólico que vuelve a casa, siguiendo el
// arco de la Clave y no un patrón musical: arranca en La, se abre al relativo
// mayor en la Promesa, retrocede a Sol en "De dónde viene", sube a la
// explicación, tensa en la dominante cuando aparecen la fiscalización y las
// consecuencias, y baja a serenarse hasta volver a La en el Cierre.
//
// NO ES UN DRON: es un acorde de tres voces abiertas, y la tercera cambia de
// menor a mayor según el grado, así que el GLISADO del viaje también dobla el
// color del acorde. Eso es lo que hacía falta para que no sonara a una nota
// larga puesta debajo.
//
// Lo que lo saca de sintético está en scripts/motor-sonido.js y son cuatro
// cosas: parciales inarmónicos como los de una cuerda real, deriva de afinación
// independiente por parcial, aire, y sala. La sala es la más grande de las
// cuatro por lejos.
//
// Y los bloques de DATO van en SILENCIO ABSOLUTO, medio segundo antes y medio
// después. Es el único énfasis que no compite con nada, y cae justo donde el
// mural ya se apaga y el número queda solo.
//
// uso: node scripts/clave-musica.js --guion ejemplos/clave-mural14.json --salida public/sonidos/cama-clave.wav

const fs = require("fs");
const path = require("path");
const { seno, azar, pulsar, sala } = require("./motor-sonido");

const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const guion = JSON.parse(fs.readFileSync(arg("guion"), "utf8"));
const salida = arg("salida", "public/sonidos/cama-clave.wav");
const SR = Number(arg("sr", 32000));
const PICO = Number(arg("pico", 0.075));
const MOJADO = Number(arg("sala", 0.34));   // cuánta sala se mezcla
const FPS = 24;

const LA = 110;
const nota = (st) => LA * Math.pow(2, st / 12);
const ESCALA = [0, 2, 3, 5, 7, 8, 10]; // La eólico
const ARCO = [0, 3, -2, -2, 5, 5, 8, 7, 7, 8, 5, 3, -2, 0];

// La tríada del grado, sacada de la escala y no inventada: así el acorde de
// cada sección es el que le toca en el modo, y el menor y el mayor caen solos
// donde corresponde. Voces abiertas (raíz abajo, quinta una octava más arriba,
// tercera dos) porque una tríada cerrada a 110 Hz es puro barro.
const VOCES = ARCO.map((st) => {
  const oct = Math.floor(st / 12), rel = st - 12 * oct, i = ESCALA.indexOf(rel);
  const g = (k) => ESCALA[(i + k) % 7] + 12 * Math.floor((i + k) / 7) + 12 * oct;
  return [st, g(2) + 12, g(4) + 12]; // raíz abajo, tercera y quinta una octava arriba
});

const viaje = guion.viajeSeg ?? 1.5;
let fr = 0, cur = -1;
const secciones = [], datos = [];
for (const b of guion.bloques) {
  const dur = Math.round(b.seg * FPS);
  if (b.parada !== cur) { cur = b.parada; secciones.push({ parada: b.parada, t: fr / FPS }); }
  if (b.tipo === "dato") datos.push({ de: fr / FPS, a: (fr + dur) / FPS });
  fr += dur;
}
const TOTAL = fr / FPS, n = Math.round(TOTAL * SR);

const suave = (x) => x * x * (3 - 2 * x);
const vocesEn = (t) => {
  let i = 0;
  while (i + 1 < secciones.length && secciones[i + 1].t <= t) i++;
  const act = VOCES[secciones[i].parada % VOCES.length];
  if (i === 0) return act;
  const ini = secciones[i].t;
  if (t >= ini + viaje) return act;
  const ant = VOCES[secciones[i - 1].parada % VOCES.length];
  const k = suave((t - ini) / viaje);
  return act.map((v, j) => ant[j] + (v - ant[j]) * k);
};

// mismo bulto que usa viaje.wav, 30t²(1-t)², cero en los dos extremos
const bultoViaje = (t) => {
  for (let i = 1; i < secciones.length; i++) {
    const ini = secciones[i].t;
    if (t >= ini && t < ini + viaje) { const x = (t - ini) / viaje; return 30 * x * x * (1 - x) * (1 - x) / 1.875; }
  }
  return 0;
};

const CAIDA = 0.5;
const puerta = (t) => {
  for (const d of datos) {
    if (t > d.de - CAIDA && t < d.a + CAIDA) {
      if (t < d.de) return 1 - suave((t - (d.de - CAIDA)) / CAIDA);
      if (t > d.a) return suave((t - d.a) / CAIDA);
      return 0;
    }
  }
  return 1;
};
const bordes = (t) => Math.min(suave(Math.min(1, t / 4)), suave(Math.min(1, (TOTAL - t) / 4)));

// inarmonicidad de cuerda: f_n = n*f*raíz(1+B*n²)
const B = 0.0005;
const parcial = (f, k) => k * f * Math.sqrt(1 + B * k * k);
// raíz, tercera, quinta. La tercera va MÁS BAJA que la quinta a propósito: es
// la que lleva el color, y con una voz encima un color presente estorba. Que se
// note que el acorde es menor o mayor, no que lo anuncie.
const PESOS = [[1, 0.5, 0.22, 0.09], [1, 0.30, 0.10], [1, 0.26]];
const NIVEL = [1.0, 0.30, 0.42];

// cada parcial camina por su cuenta unas milésimas, como cualquier instrumento
const deriva = [];
for (let v = 0; v < 3; v++) for (let k = 0; k < PESOS[v].length; k++)
  deriva.push({ f: 0.043 + Math.abs(azar()) * 0.09, fase: azar() * Math.PI, prof: 0.0010 + Math.abs(azar()) * 0.0008 });

const fases = PESOS.map((p) => p.map(() => 0));
const seco = new Float32Array(n);
let aire = 0;

for (let i = 0; i < n; i++) {
  const t = i / SR;
  const g = puerta(t) * bordes(t);
  if (g <= 0) continue;
  const vs = vocesEn(t);
  const respiro = 0.86 + 0.14 * Math.sin(2 * Math.PI * 0.07 * t);
  const amp = PICO * respiro * (0.6 + 0.4 * bultoViaje(t)) * g;
  let v = 0, norma = 0, d = 0;
  for (let voz = 0; voz < 3; voz++) {
    const f0 = nota(vs[voz]);
    for (let k = 0; k < PESOS[voz].length; k++) {
      const dr = deriva[d++];
      const f = parcial(f0, k + 1) * (1 + dr.prof * Math.sin(2 * Math.PI * dr.f * t + dr.fase));
      fases[voz][k] += f / SR;
      if (fases[voz][k] > 1) fases[voz][k] -= 1;
      v += seno(fases[voz][k]) * PESOS[voz][k] * NIVEL[voz];
      norma += PESOS[voz][k] * NIVEL[voz];
    }
  }
  // aire: ruido muy filtrado, lo que hace que un pad suene tocado y no calculado
  aire = aire * 0.993 + azar() * 0.007;
  seco[i] = (v / norma) * amp + aire * amp * 0.5;
}

// LA CUERDA DE CADA SECCIÓN. Una nota pulsada al empezar el viaje, la raíz
// nueva dos octavas arriba. Marca la estructura con un cuerpo físico en vez de
// con un golpe, y como va dentro del viaje no estorba a nada.
for (let i = 1; i < secciones.length; i++) {
  const t0 = secciones[i].t + 0.12;
  if (puerta(t0) <= 0) continue;
  const f = nota(VOCES[secciones[i].parada % VOCES.length][0] + 24);
  const p = pulsar(f, SR, 3.2, 0.40, 0.9965);
  const i0 = Math.round(t0 * SR);
  for (let k = 0; k < p.length && i0 + k < n; k++) {
    const env = Math.exp(-k / (SR * 0.9));
    seco[i0 + k] += p[k] * env * PICO * 0.52 * bordes((i0 + k) / SR);
  }
}

// LA SALA. De las cuatro cosas que separan lo tocado de lo sintético, esta es
// la más grande, y se nota más que todas las demás juntas.
const mojado = sala(seco, SR, 1, 0.82);
const muestras = new Int16Array(n);
let pico = 0;
for (let i = 0; i < n; i++) { const v = seco[i] * (1 - MOJADO) + mojado[i] * MOJADO * 1.9; pico = Math.max(pico, Math.abs(v)); }
const ajuste = pico > 0 ? Math.min(1, PICO / pico) : 1;
for (let i = 0; i < n; i++) {
  const v = (seco[i] * (1 - MOJADO) + mojado[i] * MOJADO * 1.9) * ajuste;
  muestras[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
}

const buf = Buffer.from(muestras.buffer);
const cab = Buffer.alloc(44);
cab.write("RIFF", 0); cab.writeUInt32LE(36 + buf.length, 4); cab.write("WAVE", 8);
cab.write("fmt ", 12); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22);
cab.writeUInt32LE(SR, 24); cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34);
cab.write("data", 36); cab.writeUInt32LE(buf.length, 40);
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, Buffer.concat([cab, buf]));

let p2 = 0; for (let i = 0; i < n; i++) p2 = Math.max(p2, Math.abs(muestras[i]));
console.log(salida, TOTAL.toFixed(1) + "s", (fs.statSync(salida).size / 1048576).toFixed(1) + " MB",
  "| pico " + (20 * Math.log10(p2 / 32768)).toFixed(1) + " dBFS",
  "| " + secciones.length + " acordes, " + (secciones.length - 1) + " cuerdas, " + datos.length + " datos en silencio");
