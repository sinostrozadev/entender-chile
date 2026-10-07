// Genera la cama de música de una Clave a partir de SU PROPIO guion.
//
// Por qué se genera y no se guarda: la música sigue el recorrido de la cámara,
// así que depende del guion. Guardarla sería guardar una copia que se
// desactualiza sola, y además son 50 MB de WAV por Clave en un repo donde el
// espacio ya preocupa. Se genera antes de renderizar, como las carátulas.
//
// LA IDEA, y es la misma que hizo funcionar el sonido del viaje: la música no
// sigue al reloj, sigue a la cámara. La nota raíz cambia en cada sección y
// GLISA durante el viaje, los 1,5 s en que el mural se mueve. Nadie va a saber
// por qué, pero la pieza se siente yendo a alguna parte porque literalmente va.
//
// Las catorce raíces hacen un arco en La eólico que vuelve a casa: arranca en
// La, se abre al relativo mayor en la Promesa, retrocede al pasado en "De dónde
// viene", sube a la explicación, tensa en la dominante cuando aparece la
// fiscalización y sus consecuencias, y baja a serenarse hasta volver a La en el
// Cierre. Es el arco de la Clave, no un adorno encima.
//
// Y los bloques de DATO van en SILENCIO. La música se va medio segundo antes y
// vuelve medio segundo después. El silencio es el único énfasis que no compite
// con nada, y es justo donde el mural se apaga y el número queda solo.
//
// uso: node scripts/clave-musica.js --guion ejemplos/clave-mural14.json --salida public/sonidos/cama-clave.wav

const fs = require("fs");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };

const guion = JSON.parse(fs.readFileSync(arg("guion"), "utf8"));
const salida = arg("salida", "public/sonidos/cama-clave.wav");
const SR = Number(arg("sr", 32000));          // 32 kHz basta: acá no hay nada sobre 2 kHz
const PICO = Number(arg("pico", 0.055));      // unos -25 dBFS, para que no pelee con la voz
const FPS = 24;

// semitonos sobre La (110 Hz), uno por sección
const ARCO = [0, 3, -2, -2, 5, 5, 8, 7, 7, 8, 5, 3, -2, 0];
const LA = 110;
const nota = (st) => LA * Math.pow(2, st / 12);

// cuándo empieza cada sección y dónde están los datos, leídos del guion
const viaje = (guion.viajeSeg ?? 1.5);
let fr = 0, cur = -1;
const secciones = [], datos = [];
for (const b of guion.bloques) {
  const dur = Math.round(b.seg * FPS);
  if (b.parada !== cur) { cur = b.parada; secciones.push({ parada: b.parada, t: fr / FPS }); }
  if (b.tipo === "dato") datos.push({ de: fr / FPS, a: (fr + dur) / FPS });
  fr += dur;
}
const TOTAL = fr / FPS;
const n = Math.round(TOTAL * SR);

// la raíz en el segundo t: fija mientras la cámara está parada, glisando
// durante el viaje. El viaje ocurre al INICIO de cada sección salvo la primera.
const suave = (x) => x * x * (3 - 2 * x);
const raizEn = (t) => {
  let i = 0;
  while (i + 1 < secciones.length && secciones[i + 1].t <= t) i++;
  const st = ARCO[secciones[i].parada % ARCO.length];
  if (i === 0) return nota(st);
  const ini = secciones[i].t;
  if (t < ini + viaje) {
    const prev = ARCO[secciones[i - 1].parada % ARCO.length];
    return nota(prev + (st - prev) * suave((t - ini) / viaje));
  }
  return nota(st);
};

// el bulto del viaje: la música sube mientras la cámara se mueve y vuelve a su
// sitio al llegar. Misma curva que usa viaje.wav, 30t²(1-t)², que vale cero en
// los dos extremos. Así el movimiento y el sonido son la misma cosa.
const bultoViaje = (t) => {
  for (let i = 1; i < secciones.length; i++) {
    const ini = secciones[i].t;
    if (t >= ini && t < ini + viaje) { const x = (t - ini) / viaje; return 30 * x * x * (1 - x) * (1 - x) / 1.875; }
  }
  return 0;
};

// la puerta de silencio de los datos, con medio segundo de entrada y salida
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

// entrada y salida de la pieza entera, cuatro segundos cada una
const bordes = (t) => Math.min(1, suave(Math.min(1, t / 4)), suave(Math.min(1, (TOTAL - t) / 4)));

// tres parciales y dos copias desafinadas 0,15 Hz: el batido lento es lo que
// evita que un dron suene a zumbido de ampolleta
const PARCIALES = [[1, 1.0], [2, 0.26], [3, 0.11], [4, 0.05]];
const fase = PARCIALES.map(() => [0, 0]);

const muestras = new Int16Array(n);
for (let i = 0; i < n; i++) {
  const t = i / SR;
  const f = raizEn(t);
  const respiro = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.07 * t);
  const amp = PICO * respiro * (0.62 + 0.38 * bultoViaje(t)) * puerta(t) * bordes(t);
  let v = 0, norma = 0;
  PARCIALES.forEach(([mult, peso], k) => {
    for (const lado of [0, 1]) {
      const d = lado === 0 ? -0.075 : 0.075;
      fase[k][lado] += 2 * Math.PI * (f * mult + d) / SR;
      v += Math.sin(fase[k][lado]) * peso * 0.5;
    }
    norma += peso;
  });
  muestras[i] = Math.max(-32768, Math.min(32767, Math.round((v / norma) * amp * 32767)));
}

const datosBuf = Buffer.from(muestras.buffer);
const cab = Buffer.alloc(44);
cab.write("RIFF", 0); cab.writeUInt32LE(36 + datosBuf.length, 4); cab.write("WAVE", 8);
cab.write("fmt ", 12); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22);
cab.writeUInt32LE(SR, 24); cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34);
cab.write("data", 36); cab.writeUInt32LE(datosBuf.length, 40);
fs.mkdirSync(require("path").dirname(salida), { recursive: true });
fs.writeFileSync(salida, Buffer.concat([cab, datosBuf]));

let pico = 0; for (let i = 0; i < n; i++) pico = Math.max(pico, Math.abs(muestras[i]));
console.log(salida, (TOTAL).toFixed(1) + "s", (fs.statSync(salida).size / 1048576).toFixed(1) + " MB",
  "| pico " + (20 * Math.log10(pico / 32768)).toFixed(1) + " dBFS",
  "| " + secciones.length + " secciones, " + datos.length + " datos en silencio");
