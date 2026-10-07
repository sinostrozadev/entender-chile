// Taller de notas y timbres. Tres cosas, para que Santiago pueda señalar en vez
// de describir:
//
//   piano-notas.wav  un piano tocando todas las notas, cromáticas primero y
//                    después solo las del dórico, con su tiempo anotado
//   timbres.wav      la misma frase en tres timbres, para elegir el timbre con
//                    la melodía quieta
//   tu-idea.wav      la idea que me describió, tocada, en tres juegos de notas
//
// LA IDEA, dicha por él el 07-10-2026: "la base va marcando, corchea corchea
// silencio de negra, cuatro veces, ese es un compás. La melodía es negra
// corchea corchea corchea suspendido, y el resto del compás silencio. La base
// quizás como un violín corto, armónico, y la melodía con esas campanas."
//
// Va a 132 por minuto, que es lo que deja el compás en 3,6 segundos: largo de
// sello. Más lento se le va lo de acción que él describe, más rápido no se
// alcanza a oír la suspensión del final.
//
// uso: node scripts/taller-notas.js <carpeta>

const fs = require("fs");
const path = require("path");
const { sala, barra, pianoFieltro, pulsar, cuerdaArco, seccionCuerdas } = require("./motor-sonido");

const SR = 32000;
const DESTINO = process.argv[2] || "public/sonidos/taller";
const RE = 146.83;
const nota = (st) => RE * Math.pow(2, st / 12);
const NOMBRE = ["re", "re#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si", "do", "do#"];
// la octava sube en DO y no en re, así que el número se cuenta desde do: con
// re3 en el cero, el do que viene después es do4 y no do3
const nombreDe = (st) => NOMBRE[((st % 12) + 12) % 12] + (3 + Math.floor((st + 2) / 12));

const lienzo = (seg) => new Float32Array(Math.round(seg * SR));
const poner = (d, onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  for (let k = 0; k < onda.length && i0 + k < d.length; k++) d[i0 + k] += onda[k] * niv;
};
const escribir = (nombre, x, objetivo = 0.5) => {
  let p = 0; for (let i = 0; i < x.length; i++) if (Math.abs(x[i]) > p) p = Math.abs(x[i]);
  const k = p > 0 ? objetivo / p : 1;
  const m = new Int16Array(x.length);
  for (let i = 0; i < x.length; i++) m[i] = Math.max(-32768, Math.min(32767, Math.round(x[i] * k * 32767)));
  const b = Buffer.from(m.buffer), c = Buffer.alloc(44);
  c.write("RIFF", 0); c.writeUInt32LE(36 + b.length, 4); c.write("WAVE", 8); c.write("fmt ", 12);
  c.writeUInt32LE(16, 16); c.writeUInt16LE(1, 20); c.writeUInt16LE(1, 22); c.writeUInt32LE(SR, 24);
  c.writeUInt32LE(SR * 2, 28); c.writeUInt16LE(2, 32); c.writeUInt16LE(16, 34); c.write("data", 36); c.writeUInt32LE(b.length, 40);
  fs.mkdirSync(DESTINO, { recursive: true });
  fs.writeFileSync(path.join(DESTINO, nombre), Buffer.concat([c, b]));
  console.log("  " + nombre.padEnd(20), (x.length / SR).toFixed(1) + "s");
};
const conSala = (x, mojado = 0.26) => {
  const r = sala(x, SR, 1, 0.78);
  for (let i = 0; i < x.length; i++) x[i] = x[i] * (1 - mojado) + r[i] * mojado * 1.9;
  return x;
};

// ===== 1. EL PIANO CON TODAS LAS NOTAS =====
console.log("PIANO DE REFERENCIA");
{
  const PASO = 0.62;
  const crom = []; for (let st = 0; st <= 24; st++) crom.push(st);
  const DORICO = [0, 2, 3, 5, 7, 9, 10];
  const esc = []; for (let o = 0; o < 2; o++) for (const g of DORICO) esc.push(g + 12 * o); esc.push(24);
  const x = lienzo((crom.length + esc.length) * PASO + 5);
  crom.forEach((st, i) => poner(x, pianoFieltro(nota(st), SR, 3.5, { fieltro: 1.2, cuerdas: 3, cola: 2.0 }), 0.4 + i * PASO, 0.8));
  const t0 = 0.4 + crom.length * PASO + 2;
  esc.forEach((st, i) => poner(x, pianoFieltro(nota(st), SR, 3.5, { fieltro: 1.2, cuerdas: 3, cola: 2.0 }), t0 + i * PASO, 0.8));
  escribir("piano-notas.wav", conSala(x, 0.2));
  console.log("  CROMÁTICA, de re3 a re5, una cada 0,62 s desde el segundo 0,4:");
  console.log("   ", crom.map((st, i) => (0.4 + i * PASO).toFixed(1) + "s " + nombreDe(st)).join("  "));
  console.log("  Y DESPUÉS, desde el segundo " + t0.toFixed(1) + ", SOLO LAS DEL DÓRICO, que son las que recomiendo:");
  console.log("   ", esc.map((st, i) => (t0 + i * PASO).toFixed(1) + "s " + nombreDe(st)).join("  "));
}

// ===== 2. TRES TIMBRES, LA MISMA FRASE =====
// Se mueve SOLO el timbre. Con la melodía quieta se puede elegir el timbre; si
// cambian las dos cosas a la vez no se sabe cuál gustó.
const FRASE = [[0, 12, 1.0], [0.45, 10, 0.6], [0.68, 9, 0.65], [0.91, 5, 0.9]];
const TIMBRES = [
  { n: "1 campana", por: "lo que ya tenemos", f: (st) => barra(nota(st), SR, 5, { tipo: "metal", cola: 2.6, mazo: 0.78 }) },
  { n: "2 cuerda pulsada", por: "arpa o guitarra sin púa: más madera, menos brillo, se apaga antes", f: (st) => pulsar(nota(st), SR, 4, 0.38, 0.9972) },
  { n: "3 armónico de cuerda", por: "el dedo apoyado sin pisar: suena un solo parcial y queda flautado, casi sin ataque", f: (st) => cuerdaArco(nota(st), SR, 4, { tipo: "armonico", cola: 1.5, ataque: 0.05 }) },
  { n: "4 sección de cuerdas", por: "nueve músicos, cada uno un pelo desafinado y un pelo a destiempo. ESTO es lo que suena a orquesta", f: (st) => seccionCuerdas(nota(st), SR, 4, { musicos: 9, cola: 1.2, ataque: 0.03 }) },
];
console.log("");
console.log("TRES TIMBRES, la misma frase");
{
  const U = 5;
  const x = lienzo(TIMBRES.length * U + 3);
  TIMBRES.forEach((t, i) => {
    const t0 = 0.5 + i * U;
    FRASE.forEach(([dt, st, v]) => poner(x, t.f(st), t0 + dt, v));
    poner(x, pianoFieltro(nota(-24), SR, 5, { fieltro: 1.2, cuerdas: 3, cola: 3.0 }), t0, 0.26);
    console.log("     " + (0.5 + i * U).toFixed(1) + "s  " + t.n.padEnd(22) + t.por);
  });
  escribir("timbres.wav", conSala(x));
}

// ===== 3. LA IDEA DE SANTIAGO, TOCADA =====
const BPM = 132, NEGRA = 60 / BPM, CORCHEA = NEGRA / 2, COMPAS = NEGRA * 8;
// base: corchea corchea, silencio de negra, cuatro veces
const BASE_T = [];
for (let c = 0; c < 4; c++) { BASE_T.push(c * NEGRA * 2); BASE_T.push(c * NEGRA * 2 + CORCHEA); }
// melodía: negra, corchea, corchea, corchea sostenida, y el resto en silencio
const MEL_T = [0, NEGRA, NEGRA + CORCHEA, NEGRA + CORCHEA * 2];

// Las notas. La base va en quintas, re y la, que es el intervalo sin tercera y
// por lo tanto sin veredicto. Lo que cambia entre las tres es DÓNDE ATERRIZA la
// melodía, que es lo único que decide si la frase queda pidiendo seguir o no.
const IDEAS = [
  { n: "A aterriza en la cuarta (sol)", por: "la suspensión clásica. Es la que más pide continuar",
    base: [-12, -5, -12, -5, -12, -5, -12, -5], mel: [24, 22, 21, 17] },
  { n: "B aterriza en la segunda (mi)", por: "más abierta todavía, y suena más de hoy. Es la que menos se cierra",
    base: [-12, -5, -12, -5, -12, -5, -12, -5], mel: [24, 22, 21, 14] },
  { n: "C la base camina y aterriza en la quinta (la)", por: "los dos últimos pares bajan a do y sol. La más firme de las tres, pero sigue sin tercera",
    base: [-12, -5, -12, -5, -14, -7, -14, -7], mel: [24, 22, 21, 19] },
];
console.log("");
console.log("TU IDEA, TOCADA. Base en sección de cuerdas corta, melodía en campana. " + BPM + " por minuto, compás de " + COMPAS.toFixed(2) + "s");
{
  const U = COMPAS * 2 + 2;
  const x = lienzo(IDEAS.length * U + 3);
  IDEAS.forEach((idea, i) => {
    const t0 = 0.5 + i * U;
    for (let rep = 0; rep < 2; rep++) {
      const tb = t0 + rep * COMPAS;
      // la base en SECCIÓN y no en un instrumento solo: eso es lo que suena a
      // orquesta. Golpe de arco corto, que es el "corto" que él pidió.
      BASE_T.forEach((dt, k) => poner(x, seccionCuerdas(nota(idea.base[k]), SR, 1.2, { musicos: 9, cola: 0.26, ataque: 0.014, brillo: 0.46 }), tb + dt, k % 2 === 0 ? 0.55 : 0.40));
      idea.mel.forEach((st, k) => {
        const largo = k === idea.mel.length - 1 ? 3.4 : 1.6;
        poner(x, barra(nota(st), SR, largo + 1.5, { tipo: "metal", cola: largo, mazo: 0.78 }), tb + MEL_T[k], [1.0, 0.6, 0.62, 0.95][k]);
      });
      poner(x, pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.2 }), tb, 0.3);
    }
    console.log("     " + t0.toFixed(1) + "s  " + idea.n);
    console.log("            " + idea.por);
    console.log("            base: " + idea.base.map(nombreDe).join(" ") + "   |   melodía: " + idea.mel.map(nombreDe).join(" "));
  });
  escribir("tu-idea.wav", conSala(x, 0.28));
}

// ===== 4. DOS COMPASES: LAS NOTAS DEL 11 Y LAS DEL 8, EN SU RITMO =====
// Santiago pidió exactamente esto el 07-10-2026: su rítmica de dos capas, con
// las notas de la candidata 11 en el primer compás y las de la 8 en el segundo.
//
// Las notas de la 11 son re la re, que resultan ser el sello del canal desde el
// 27-08. Las de la 8 son re la la re do, o sea la misma subida pero volviendo
// al do, que es la séptima del dórico.
//
// Su melodía tiene CUATRO golpes (negra, corchea, corchea, corchea sostenida) y
// la 11 tiene tres notas, así que la cuarta hay que decidirla. Es la única
// decisión que queda abierta, y por eso es lo único que cambia entre las tres
// versiones de abajo: todo lo demás está fijo.
//
// La base se queda en re y la los dos compases a propósito. Si bajara a do en
// el segundo, el do de la melodía aterrizaría sobre su propia base y la frase
// cerraría; quedándose en re, ese do es la séptima y la frase sigue pidiendo.
const SUSPENDIDAS = [
  { n: "1 cierra arriba en la", st: 31, por: "salta a la octava de la segunda nota. Queda arriba y abierta, es la más luminosa" },
  { n: "2 cierra en mi", st: 26, por: "un grado sobre el re, o sea la novena. La más suspendida de las tres: casi pide la siguiente" },
  { n: "3 cierra abajo en sol", st: 17, por: "se devuelve a la cuarta en vez de seguir subiendo. La suspensión clásica, y contrasta con la subida" },
];

console.log("");
console.log("DOS COMPASES: notas de la 11 y de la 8, en tu rítmica");
{
  const C1 = [12, 19, 24];                // re4 la4 re5, las notas de la 11
  const C2 = [12, 19, 24, 22];            // re4 la4 re5 do5, las notas de la 8
  const BASE = [-12, -5, -12, -5, -12, -5, -12, -5];
  const U = COMPAS * 2 + 2.5;
  const x = lienzo(SUSPENDIDAS.length * U + 3);
  SUSPENDIDAS.forEach((s, i) => {
    const t0 = 0.5 + i * U;
    [0, 1].forEach((compas) => {
      const tb = t0 + compas * COMPAS;
      BASE_T.forEach((dt, k) => poner(x, seccionCuerdas(nota(BASE[k]), SR, 1.2, { musicos: 9, cola: 0.26, ataque: 0.014, brillo: 0.46 }), tb + dt, k % 2 === 0 ? 0.55 : 0.40));
      const mel = compas === 0 ? [...C1, s.st] : C2;
      mel.forEach((st, k) => {
        const largo = k === 3 ? (compas === 0 ? 3.0 : 3.8) : 1.6;
        poner(x, barra(nota(st), SR, largo + 1.5, { tipo: "metal", cola: largo, mazo: 0.78 }), tb + MEL_T[k], [1.0, 0.6, 0.62, 0.95][k]);
      });
      poner(x, pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.2 }), tb, 0.3);
    });
    console.log("     " + t0.toFixed(1) + "s  " + s.n);
    console.log("            " + s.por);
    console.log("            compás 1: " + [...C1, s.st].map(nombreDe).join(" ") + "   |   compás 2: " + C2.map(nombreDe).join(" "));
  });
  escribir("dos-compases.wav", conSala(x, 0.28));
}
