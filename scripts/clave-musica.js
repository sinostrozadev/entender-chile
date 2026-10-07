// Genera la cama de música de una Clave a partir de SU PROPIO guion.
//
// POR QUÉ SUENA ASÍ Y NO A SUSPENSO (decisión del 07-10-2026, reemplaza la
// regla dura 30). Lo que este canal hace, siempre, es abrirle la tapa a un
// mecanismo: quién autoriza una licencia, quién paga, qué gatilla un sumario.
// El sujeto es un SISTEMA y el placer que ofrece es ver los engranajes. El
// suspenso dice "algo anda mal". Esto tiene que decir "así funciona".
//
// De ahí sale todo lo demás:
//
// FORMA: proceso aditivo. Células cortas que se repiten y se desfasan entre
// sí, que es literalmente el sonido de un sistema con partes. Las células miden
// 5, 7 y 8 pulsos, que son primos entre sí, así que vuelven a coincidir recién
// recién a los 1.120 pulsos, catorce minutos, más de lo que dura una Clave. La
// cama no se repite igual ni una sola vez dentro de la pieza. Y las voces ENTRAN de a una a medida que la cámara
// avanza, porque la Clave ya es una explicación aditiva: sección a sección
// sumas piezas hasta que el mecanismo completo queda a la vista. El proceso
// aditivo es la forma musical exacta de eso, no una metáfora.
//
// ESCALA: dórico. Ni menor ni mayor. El menor natural tiene la sexta bemol, que
// es justo la nota que lo hace sonar triste y fatal, el color del suspenso. El
// mayor es afirmativo, "todo está bien". El dórico es menor con sexta natural:
// serio sin ser triste, grave sin ser condenado, y sobre todo AMBIGUO respecto
// del desenlace. El modo mismo se niega a editorializar, que es lo que pide la
// regla 2. De paso queda al lado de la música andina y chilena sin disfrazarse,
// mismo criterio que el verde pátina.
//
// ARMONÍA SIN TERCERAS. Las voces se apilan en quintas y cuartas. Sin tercera
// no hay mayor ni menor, o sea no hay veredicto, y además queda una suspensión
// que no resuelve: dice "hay más en esto", que es cierto. Es el mismo intervalo
// que Santiago eligió para el sello del canal el 27-08-2026, re - la - re, y
// por eso la cama está en RE: la tónica de la cama es la raíz del sello.
//
// TIMBRE: barra percutida, el mismo del sello. Un canal tiene un sonido, no una
// colección. Y golpeado y no frotado por una razón editorial: una nota golpeada
// dice y se retira, una nota frotada insiste. Un canal que promete no insistir
// necesita esa gramática.
//
// LO QUE CAMBIA EN CADA CLAVE son las células, que salen de los números de la
// pieza (las paradas de la cámara). Dos Claves distintas no suenan igual. El
// sello sí es siempre el mismo, porque un sello es marca; una cama idéntica
// bajo cada video es el patrón de contenido inauténtico que YouTube castiga, y
// la regla 39 nos pone fecha para postular al Programa de Socios.
//
// SILENCIOS. Los bloques de DATO van en silencio absoluto: es el único énfasis
// que no compite con nada y cae donde el mural ya se apaga. Y la regla dura 28
// manda cero música en notas de duelo o violencia, así que las secciones que
// hablen de eso se apagan solas y el generador dice cuáles apagó.
//
// uso: node scripts/clave-musica.js --guion ejemplos/clave-mural14.json --salida public/sonidos/cama-clave.wav

const fs = require("fs");
const path = require("path");
const { azar, sala, barra, pianoFieltro, caja } = require("./motor-sonido");

const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const guion = JSON.parse(fs.readFileSync(arg("guion"), "utf8"));
const salida = arg("salida", "public/sonidos/cama-clave.wav");
const SR = Number(arg("sr", 32000));
const PICO = Number(arg("pico", 0.085));
const MOJADO = Number(arg("sala", 0.32));
const PULSO = Number(arg("pulso", 0.75));
const FPS = 24;

const RE = 146.83;                       // re3, la raíz del sello del canal
const DORICO = [0, 2, 3, 5, 7, 9, 10];   // re mi fa sol la SI do: la si natural es el modo
const PENTA = [0, 3, 5, 7, 10];
const nota = (st) => RE * Math.pow(2, st / 12);
const gradoA = (escala, g) => escala[((g % escala.length) + escala.length) % escala.length] + 12 * Math.floor(g / escala.length);

// REGLA DURA 28: cero música en duelo o violencia. Se mira el texto de la
// sección, no el título, porque el título rara vez lo dice.
const LUTO = /\b(muert|falleci|asesinat|asesin|homicid|femicid|víctima|victima|duelo|funeral|suicid|masacre|atentado|violaci|abuso sexual|tortur|desaparecid|cadáver|cadaver|herid[oa]s? grave)/i;

const viaje = guion.viajeSeg ?? 1.5;
let fr = 0, cur = -1;
const secciones = [], datos = [];
for (const b of guion.bloques) {
  const dur = Math.round(b.seg * FPS);
  if (b.parada !== cur) { cur = b.parada; secciones.push({ parada: b.parada, t: fr / FPS, texto: "", fin: 0 }); }
  const s = secciones[secciones.length - 1];
  s.texto += " " + (b.texto || b.etiqueta || "");
  s.fin = (fr + dur) / FPS;
  if (b.tipo === "dato") datos.push({ de: fr / FPS, a: (fr + dur) / FPS });
  fr += dur;
}
const TOTAL = fr / FPS, n = Math.round(TOTAL * SR);
const enLuto = secciones.filter((s) => LUTO.test(s.texto));

const suave = (x) => x * x * (3 - 2 * x);
const seccionEn = (t) => { let i = 0; while (i + 1 < secciones.length && secciones[i + 1].t <= t) i++; return i; };

const CAIDA = 0.5;
const puerta = (t) => {
  for (const s of enLuto) if (t >= s.t - CAIDA && t <= s.fin + CAIDA) return 0;
  for (const d of datos) {
    if (t > d.de - CAIDA && t < d.a + CAIDA) {
      if (t < d.de) return 1 - suave((t - (d.de - CAIDA)) / CAIDA);
      if (t > d.a) return suave((t - d.a) / CAIDA);
      return 0;
    }
  }
  return 1;
};
const bordes = (t) => Math.min(suave(Math.min(1, t / 5)), suave(Math.min(1, (TOTAL - t) / 5)));
const bultoViaje = (t) => {
  for (let i = 1; i < secciones.length; i++) {
    const ini = secciones[i].t;
    if (t >= ini && t < ini + viaje) { const x = (t - ini) / viaje; return 30 * x * x * (1 - x) * (1 - x) / 1.875; }
  }
  return 0;
};

// LAS CÉLULAS SALEN DE LA PIEZA. Caminan por grados y no saltan al azar: el
// movimiento por grados conjuntos siempre suena a melodía, un salto al azar
// suena a error. Arrancan en grado fuerte (tónica o quinta).
const semilla = (guion.paradas || [0]).reduce((a, b) => a + b, 0) + secciones.length;
// Un generador de verdad y no una división entera: el primer intento sacaba el
// paso de Math.floor(semilla/(k+2)), que cambia lentísimo con k, así que las
// tres células salieron escalas corridas (0,2,3,4,5). Una escala corrida suena
// a ejercicio de conservatorio, no a célula.
const dado = (() => { let x = semilla % 2147483647 || 1; return () => (x = (x * 48271) % 2147483647) / 2147483647; })();
const celda = (largo, desfase) => {
  for (let intento = 0; intento < 40; intento++) {
    let g = desfase % 2 === 0 ? 0 : 4;
    const out = [g];
    for (let k = 1; k < largo; k++) {
      // pasos chicos y con vuelta: el movimiento por grados conjuntos siempre
      // suena a melodía, el salto grande suena a error
      const d = [1, -1, 2, -2, 1, -1, 3, -3][Math.floor(dado() * 8)];
      g = g + d;
      if (g > 7 || g < -3) g -= 2 * d; // rebota en vez de salirse del registro
      out.push(g);
    }
    // sirve si se mueve de verdad y vuelve cerca de donde partió: eso es una
    // célula, y no una rampa ni un paseo que se va para siempre
    const rango = Math.max(...out) - Math.min(...out);
    const vuelve = Math.abs(out[out.length - 1] - out[0]) <= 2;
    const subidas = out.slice(1).filter((v, i) => v > out[i]).length;
    const gira = subidas > 0 && subidas < largo - 1;
    if (rango >= 3 && rango <= 7 && vuelve && gira) return out;
  }
  return Array.from({ length: largo }, (_, k) => [0, 2, 4, 2, 3, 1, 0, 2][k % 8]);
};

// LOS TONOS CAMBIAN CON LA SECCIÓN (07-10-2026, lo pidió Santiago: era lo que
// más le gustaba de la primera versión y lo había perdido al pasar a dórico).
// Cada sección tiene su centro, y los centros se eligen entre los grados
// estables del modo, nunca una tercera: así la armonía SE MUEVE con la cámara
// pero sigue sin dar veredicto. Y termina volviendo a casa.
const CENTROS = (() => {
  const estables = [0, 4, 3, 6, 1];
  const out = [0];
  for (let i = 1; i < secciones.length; i++) {
    const prev = estables.indexOf(out[i - 1]);
    const d = [1, -1, 2, -2][Math.floor(dado() * 4)];
    out.push(estables[((prev + d) % 5 + 5) % 5]);
  }
  out[out.length - 1] = 0; // el cierre vuelve a re
  return out;
})();
const centroDe = (i) => gradoA(DORICO, CENTROS[Math.min(i, CENTROS.length - 1)]);

// LAS VOCES ENTRAN DE A UNA. Cada una tiene su largo de célula, primo con las
// otras, así que se desfasan y nunca vuelven a sonar igual dentro de la pieza.
// Los niveles están puestos para que las CÉLULAS sean el evento principal y el
// ancla solo las sostenga. Al revés, que fue el primer intento, la pieza queda
// en un zumbido grave con tintineos encima y el proceso aditivo no se oye: las
// catorce secciones medían lo mismo tuvieran dos voces o cuatro.
const VOCES = [
  { desde: 1, hasta: 99, largo: 5, oct: 12, cada: 1, tipo: "madera", cola: 1.5, niv: 0.70, mazo: 0.78 },
  { desde: 5, hasta: 13, largo: 7, oct: 24, cada: 2, tipo: "madera", cola: 1.0, niv: 0.52, mazo: 0.82 },
  { desde: 9, hasta: 12, largo: 8, oct: 36, cada: 3, tipo: "metal", cola: 2.6, niv: 0.34, mazo: 0.86 },
].map((v, i) => ({ ...v, patron: celda(v.largo, i) }));

const seco = new Float32Array(n);
const poner = (onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  const g = puerta(t0), b = bordes(t0);
  if (g <= 0 || b <= 0) return;
  const amp = niv * g * b * (0.78 + 0.22 * bultoViaje(t0));
  for (let k = 0; k < onda.length && i0 + k < n; k++) seco[i0 + k] += onda[k] * amp;
};

// EL ANCLA: una nota grave y larga por sección, alternando raíz y quinta. Es lo
// único que sostiene, y va en piano de fieltro porque abajo la barra no tiene
// cuerpo. Quintas y cuartas, nunca una tercera.
secciones.forEach((s, i) => {
  const st = centroDe(i) - 12;
  [st, st + 7].forEach((v, k) => {
    poner(pianoFieltro(nota(v), SR, 9, { fieltro: 1.2, cuerdas: 3, cola: 4.2 }), s.t + k * 0.06, (k ? 0.20 : 0.34) * 0.5);
  });
});

// LAS CÉLULAS, sobre la grilla de pulso
let paso = 0;
for (let t = 0.2; t < TOTAL; t += PULSO, paso++) {
  const sec = seccionEn(t);
  VOCES.forEach((v) => {
    if (sec + 1 < v.desde || sec + 1 > v.hasta) return;
    if (paso % v.cada !== 0) return;
    const g = v.patron[Math.floor(paso / v.cada) % v.patron.length];
    const f = nota(gradoA(DORICO, g) + v.oct + centroDe(sec));
    poner(barra(f, SR, v.cola * 3, { tipo: v.tipo, cola: v.cola, mazo: v.mazo }), t, v.niv * 0.5);
  });
}

// EL SUB QUE GLISA. Es lo único frotado de toda la pieza y va 20 dB bajo el
// resto, casi en el límite de lo que se oye. Está porque el GLISADO del cambio
// de centro era lo que a Santiago le gustaba de la primera versión, y una nota
// golpeada no puede glisar: aparece ya afinada. Esto le pone al cambio de
// sección el movimiento que la barra no puede dar, sin romper la gramática.
{
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const g = puerta(t) * bordes(t);
    if (g <= 0) continue;
    const sec = seccionEn(t);
    let st = centroDe(sec) - 24;
    const ini = secciones[sec].t;
    if (sec > 0 && t < ini + viaje) {
      const a = centroDe(sec - 1) - 24;
      st = a + (st - a) * suave((t - ini) / viaje);
    }
    fase += nota(st) / SR;
    if (fase > 1) fase -= 1;
    seco[i] += Math.sin(2 * Math.PI * fase) * 0.030 * g * (0.7 + 0.3 * bultoViaje(t));
  }
}

// LA MARCA DE SECCIÓN: una sola nota en pentatónica, que no puede chocar con
// nada porque la escala no tiene semitonos.
secciones.forEach((s, i) => {
  if (i === 0) return;
  const g = gradoA(PENTA, [0, 2, 4, 1, 3][i % 5]) + 24 + centroDe(i);
  poner(barra(nota(g), SR, 5, { tipo: "metal", cola: 2.2, mazo: 0.8 }), s.t + 0.1, 0.30);
});

// EL SELLO DEL CANAL, re - la - re, igual que en scripts/sonido.js. Es lo único
// que suena idéntico en todas las Claves, y por eso es la identidad.
[[0, -12], [0.34, -5], [0.68, 0]].forEach(([dt, st], k) => {
  poner(barra(nota(st), SR, 6, { tipo: "metal", cola: 2.8, mazo: 0.72 }), 0.5 + dt, [0.5, 0.45, 0.4][k]);
});

const cuerpo = caja(seco, SR);
for (let i = 0; i < n; i++) seco[i] += cuerpo[i] * 0.18;

// LA PUERTA SE APLICA AL BUFFER ENTERO, no al empezar cada nota. Mirarla solo
// en el ataque dejaba pasar las colas: el ancla dura cuatro segundos y las
// campanas casi tres, así que el silencio del dato medía -53 dBFS en vez de
// silencio de verdad. Un silencio a medias no es un énfasis, es un bajón de
// volumen, y se pierde justo lo que lo hacía servir.
for (let i = 0; i < n; i++) {
  const g = puerta(i / SR);
  if (g < 1) seco[i] *= g;
}

const rev = sala(seco, SR, 1, 0.80);
let pico = 0;
for (let i = 0; i < n; i++) { const v = seco[i] * (1 - MOJADO) + rev[i] * MOJADO * 1.9; if (Math.abs(v) > pico) pico = Math.abs(v); }
const ajuste = pico > 0 ? PICO / pico : 1;
const m = new Int16Array(n);
for (let i = 0; i < n; i++) {
  // la sala tambien arrastra cola hacia adentro del silencio, asi que la puerta
  // va de nuevo despues de mezclarla
  const v = (seco[i] * (1 - MOJADO) + rev[i] * MOJADO * 1.9) * ajuste * puerta(i / SR);
  m[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
}

const buf = Buffer.from(m.buffer), cab = Buffer.alloc(44);
cab.write("RIFF", 0); cab.writeUInt32LE(36 + buf.length, 4); cab.write("WAVE", 8); cab.write("fmt ", 12);
cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22); cab.writeUInt32LE(SR, 24);
cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34); cab.write("data", 36); cab.writeUInt32LE(buf.length, 40);
fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, Buffer.concat([cab, buf]));

let p2 = 0; for (let i = 0; i < n; i++) p2 = Math.max(p2, Math.abs(m[i]));
console.log(salida, TOTAL.toFixed(1) + "s", (fs.statSync(salida).size / 1048576).toFixed(1) + " MB",
  "| pico " + (20 * Math.log10(p2 / 32768)).toFixed(1) + " dBFS");
console.log("células de esta Clave (grados del dórico):", VOCES.map((v) => v.patron.join(",")).join("  |  "));
console.log(secciones.length + " secciones, " + datos.length + " datos en silencio, " +
  (enLuto.length ? enLuto.length + " en silencio por la regla 28: " + enLuto.map((s) => s.t.toFixed(0) + "s").join(" ") : "ninguna de duelo o violencia"));
