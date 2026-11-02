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

// ================= SEGUNDA TANDA: EL RITMO COMO VARIABLE =================
// Las seis primeras eran la misma rítmica con distintas notas, todas negras
// parejas y todas al mismo volumen, o sea seis versiones de una. El ritmo es
// por lo menos la mitad de la identidad de una melodía, y el acento la otra:
// sin acentos, hasta un buen ritmo suena a máquina de escribir. Acá cada
// candidata trae su figura y su velocidad por nota.
//
// [tiempo en segundos, grado del dórico, velocidad de 0 a 1]
const RITMOS = [
  {
    nombre: "7 anacrusa",
    por: "dos notas cortas empujando hacia una larga: ta-ta-TAAA. Es la figura de sello más vieja que existe porque funciona",
    notas: [[0, -5, 0.5], [0.13, -3, 0.55], [0.30, 0, 1.0]],
  },
  {
    nombre: "8 con puntillo",
    por: "corchea con puntillo y semicorchea, la figura que cojea. Insiste sin acelerar",
    notas: [[0, -12, 0.95], [0.38, -5, 0.45], [0.50, -5, 0.8], [0.88, 0, 0.5], [1.0, -2, 0.9]],
  },
  {
    nombre: "9 síncopa",
    por: "el acento cae FUERA del pulso. Da inclinación hacia adelante sin apurar nada",
    notas: [[0, -12, 0.6], [0.25, -7, 0.35], [0.62, -5, 1.0], [1.0, -12, 0.45], [1.25, 0, 0.7]],
  },
  {
    nombre: "10 dos largas y un remate",
    por: "dos notas sostenidas y un golpecito corto al final. Afirma y después deja una marca",
    notas: [[0, -12, 0.9], [0.62, -5, 0.85], [1.24, 0, 0.95], [1.40, 2, 0.4]],
  },
  {
    nombre: "11 con silencio adentro",
    por: "una nota, un hueco de medio segundo, y dos juntas. El hueco es lo que se recuerda, y casi ningún sello lo usa",
    notas: [[0, -12, 1.0], [0.78, -5, 0.7], [0.93, 0, 0.85]],
  },
  {
    nombre: "12 hemiola chilena",
    por: "seis por ocho contra tres por cuatro, el cruce de la cueca. Es chileno sin bandera Y es literalmente dos mecanismos engranados, que es de lo que habla el canal",
    notas: [
      [0, -12, 1.0], [0.25, -5, 0.4], [0.50, -5, 0.45], [0.75, 0, 0.9], [1.0, -5, 0.4], [1.25, -5, 0.45],
      [0, 7, 0.7], [0.50, 5, 0.65], [1.0, 7, 0.7],
    ],
  },
  {
    nombre: "13 que acelera",
    por: "las notas se van juntando: el mecanismo tomando revoluciones",
    notas: [[0, -12, 0.95], [0.52, -7, 0.7], [0.88, -5, 0.65], [1.14, -3, 0.6], [1.30, -2, 0.55], [1.40, 0, 0.9]],
  },
  {
    nombre: "14 que frena",
    por: "las notas se van separando: algo que llega y se estaciona. Es el gesto del final, no el de la apertura",
    notas: [[0, -12, 0.9], [0.14, -7, 0.5], [0.36, -5, 0.6], [0.70, -2, 0.7], [1.18, 0, 1.0]],
  },
];

console.log("");
console.log("MELODÍAS, SEGUNDA TANDA: VARÍA EL RITMO");
{
  const unidad = 5;
  const x = lienzo(RITMOS.length * unidad + 2);
  RITMOS.forEach((m, i) => {
    const t0 = 0.6 + i * unidad;
    m.notas.forEach(([dt, st, vel]) => poner(x, campana(st, 5, 2.6), t0 + dt, vel));
    poner(x, pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.4 }), t0, 0.30);
  });
  const rev = sala(x, SR, 1, 0.78);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.72 + rev[i] * 0.28 * 1.9;
  escribir("melodias-ritmo.wav", x);
  RITMOS.forEach((m, i) => console.log("     " + String(0.6 + i * unidad).padStart(5) + "s  " + m.nombre + ": " + m.por));
}

// ================= TERCERA TANDA: LAS CUATRO FINALISTAS =================
// Santiago eligió la 7 (anacrusa), la 8 (puntillo), la 9 (síncopa), la 10 (dos
// largas), la 11 (silencio adentro) y la 12 (hemiola). Tres lecturas de cada una:
// se mantiene la FIGURA, que es
// lo que eligió, y se mueve lo demás. Así se converge dentro de la familia en
// vez de volver a empezar.
//
// [tiempo, grado, velocidad, cola opcional]
const FINALISTAS = [
  {
    familia: "7 ANACRUSA", variantes: [
      { n: "7a tal cual", por: "la si re. Cierra en la tónica: afirma", notas: [[0, -5, 0.5], [0.13, -3, 0.55], [0.30, 0, 1.0, 3.2]] },
      { n: "7b abierta", por: "igual pero salta a la quinta y queda sin resolver: dice hay más", notas: [[0, -5, 0.5], [0.13, -3, 0.55], [0.30, 7, 1.0, 3.2]] },
      { n: "7c doble empuje", por: "dos anacrusas encadenadas, desde más abajo. Es la misma figura con más carrera", notas: [[0, -12, 0.4], [0.13, -10, 0.45], [0.30, -5, 0.6], [0.43, -3, 0.65], [0.60, 0, 1.0, 3.2]] },
    ],
  },
  {
    familia: "8 PUNTILLO", variantes: [
      { n: "8a tal cual", por: "sube y vuelve al do, la séptima del dórico", notas: [[0, -12, 0.95], [0.38, -5, 0.45], [0.50, -5, 0.8], [0.88, 0, 0.5], [1.0, -2, 0.9, 3.0]] },
      { n: "8b al revés", por: "la misma cojera pero bajando. Es la versión que sirve para cerrar el video", notas: [[0, 0, 0.95], [0.38, -2, 0.45], [0.50, -2, 0.8], [0.88, -5, 0.5], [1.0, -12, 0.9, 3.4]] },
      { n: "8c arriba y sostenida", por: "una octava más arriba y la última aguanta el doble: más brillo, más aire", notas: [[0, 0, 0.9], [0.38, 7, 0.45], [0.50, 7, 0.8], [0.88, 12, 0.5], [1.0, 10, 1.0, 4.2]] },
    ],
  },
  {
    familia: "9 SÍNCOPA", variantes: [
      { n: "9a tal cual", por: "el acento en el 620", notas: [[0, -12, 0.6], [0.25, -7, 0.35], [0.62, -5, 1.0], [1.0, -12, 0.45], [1.25, 0, 0.7, 3.0]] },
      { n: "9b más corrida", por: "el acento se va todavía más atrás. Cuesta más de pillar y por eso engancha más", notas: [[0, -12, 0.6], [0.25, -7, 0.35], [0.78, -5, 1.0], [1.05, -12, 0.45], [1.32, 0, 0.7, 3.0]] },
      { n: "9c con el pulso puesto", por: "una voz grave marcando el pulso derecho debajo. Recién ahí se OYE que la de arriba está corrida", notas: [[0, -24, 0.55], [0.5, -24, 0.4], [1.0, -24, 0.45], [0, -12, 0.5], [0.25, -7, 0.3], [0.62, -5, 0.95], [1.0, -12, 0.4], [1.25, 0, 0.65, 3.0]] },
    ],
  },
  {
    familia: "10 DOS LARGAS Y REMATE", variantes: [
      { n: "10a tal cual", por: "dos sostenidas y un golpecito corto arriba al final", notas: [[0, -12, 0.9, 3.4], [0.62, -5, 0.85, 3.4], [1.24, 0, 0.95, 3.4], [1.40, 2, 0.4]] },
      { n: "10b remate abajo", por: "el remate cae en vez de subir, y queda más abajo. Afirma más y pregunta menos", notas: [[0, -12, 0.9, 3.4], [0.62, -5, 0.85, 3.4], [1.24, 0, 0.95, 3.4], [1.42, -5, 0.45, 3.6]] },
      { n: "10c más lenta, remate doble", por: "las dos largas aguantan casi un segundo cada una y el remate son dos notas. Más ceremonia", notas: [[0, -12, 0.9, 4.0], [0.90, -5, 0.85, 4.0], [1.80, 0, 0.95, 4.0], [1.98, 2, 0.4], [2.12, 3, 0.35]] },
    ],
  },
  {
    familia: "11 SILENCIO ADENTRO", variantes: [
      { n: "11a tal cual", por: "una nota, 780 ms de hueco, y dos juntas", notas: [[0, -12, 1.0, 3.2], [0.78, -5, 0.7], [0.93, 0, 0.85, 3.2]] },
      { n: "11b hueco más largo", por: "el hueco sube a 1,1 s. Es más riesgoso y por eso se recuerda más: el que escucha alcanza a preguntarse si se cortó", notas: [[0, -12, 1.0, 3.2], [1.10, -5, 0.7], [1.25, 0, 0.85, 3.2]] },
      { n: "11c el hueco sostenido", por: "el hueco NO está vacío: queda una nota grave muy baja aguantándolo. El silencio se sostiene en vez de morirse, que es la diferencia entre una pausa y un corte", notas: [[0, -12, 1.0, 3.2], [0.05, -24, 0.22, 4.5], [0.78, -5, 0.7], [0.93, 0, 0.85, 3.2]] },
    ],
  },
  {
    familia: "12 HEMIOLA", variantes: [
      { n: "12a tal cual", por: "grave en seis, aguda en tres", notas: [[0, -12, 1.0], [0.25, -5, 0.4], [0.50, -5, 0.45], [0.75, 0, 0.9], [1.0, -5, 0.4], [1.25, -5, 0.45], [0, 7, 0.7], [0.50, 5, 0.65], [1.0, 7, 0.7, 3.2]] },
      { n: "12b dada vuelta", por: "ahora la de tres va abajo y la de seis arriba. El mismo cruce, al revés", notas: [[0, 12, 0.6], [0.25, 7, 0.3], [0.50, 7, 0.35], [0.75, 10, 0.55], [1.0, 7, 0.3], [1.25, 7, 0.35], [0, -12, 0.95], [0.50, -7, 0.8], [1.0, -12, 0.9, 3.4]] },
      { n: "12c que se arma", por: "primero una voz sola y después entra la otra. El cruce no está: APARECE, que es el proceso aditivo del canal en dos segundos", notas: [[0, -12, 0.9], [0.25, -5, 0.4], [0.50, -5, 0.45], [0.75, 0, 0.8], [1.0, -5, 0.4], [1.25, -5, 0.45], [1.50, -12, 0.9], [1.75, -5, 0.4], [2.0, -5, 0.45], [2.25, 0, 0.8], [1.50, 7, 0.7], [2.0, 5, 0.65], [2.50, 7, 0.75, 3.2]] },
    ],
  },
];

console.log("");
console.log("LAS FINALISTAS, tres lecturas cada una");
{
  // seis segundos por variante y no cuatro y medio: la 10c dura 2,1 s y la 12c 2,5,
  // y con colas de tres segundos se montaban encima de la siguiente
  const unidad = 6, hueco = 2;
  let total = 1;
  FINALISTAS.forEach((f) => { total += f.variantes.length * unidad + hueco; });
  const x = lienzo(total + 2);
  let t = 0.6;
  const marcas = [];
  FINALISTAS.forEach((f) => {
    f.variantes.forEach((v) => {
      marcas.push([t, f.familia + "  " + v.n, v.por]);
      v.notas.forEach(([dt, st, vel, cola]) => poner(x, campana(st, cola ? cola + 2 : 5, cola || 2.6), t + dt, vel));
      poner(x, pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.4 }), t, 0.28);
      t += unidad;
    });
    t += hueco;
  });
  const rev = sala(x, SR, 1, 0.78);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * 0.72 + rev[i] * 0.28 * 1.9;
  escribir("finalistas.wav", x);
  marcas.forEach(([tt, n, por]) => {
    const m = Math.floor(tt / 60), s2 = (tt % 60).toFixed(0).padStart(2, "0");
    console.log("     " + m + ":" + s2 + "  " + n.padEnd(34) + por);
  });
}
