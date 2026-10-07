// Motor de la cama, versión 2. Lo que separa "sintético" de "tocado" no son más
// osciladores: son cuatro cosas que tiene cualquier instrumento real y ningún
// seno tiene.
//
// 1. INARMONICIDAD. Una cuerda real no da 1, 2, 3, 4 veces la fundamental: da
//    f*n*raíz(1+B*n²), porque tiene grosor y se resiste a doblarse. Esa pequeña
//    desafinación de los agudos es lo que el oído reconoce como "cuerda".
// 2. DERIVA. Ningún instrumento sostiene una afinación perfecta. Cada parcial
//    camina por su cuenta unas milésimas.
// 3. AIRE. Hay ruido en la cosa que vibra, no solo tono.
// 4. SALA. Lo seco siempre suena falso. Esta es la palanca más grande de las
//    cuatro, y por lejos.
//
// La cuerda pulsada no es una imitación: Karplus y Strong es la física de una
// cuerda pulsada, un ruido corto dando vueltas por un retardo que pierde agudos
// en cada vuelta. Por eso suena a cuerda y no a sintetizador imitando una.

const TAB = new Float32Array(4096);
for (let i = 0; i < 4096; i++) TAB[i] = Math.sin(2 * Math.PI * i / 4096);
const seno = (f) => { const x = f * 4096, i = x | 0, a = x - i; return TAB[i & 4095] * (1 - a) + TAB[(i + 1) & 4095] * a; };

// ruido con semilla, para que dos corridas den el mismo archivo
let sem = 20261007;
const azar = () => { sem = (sem * 1103515245 + 12345) & 0x7fffffff; return sem / 0x3fffffff - 1; };

// Cuerda pulsada. El filtro del ataque decide si es púa o yema: acá va suave,
// porque esto acompaña una voz y no la pelea.
const pulsar = (f, sr, seg, brillo = 0.45, amort = 0.996) => {
  const N = Math.max(2, Math.round(sr / f));
  const buf = new Float32Array(N);
  let prev = 0;
  for (let i = 0; i < N; i++) { prev = prev * (1 - brillo) + azar() * brillo; buf[i] = prev; }
  const n = Math.round(seg * sr), out = new Float32Array(n);
  let p = 0, y = 0;
  for (let i = 0; i < n; i++) {
    const s = 0.5 * (buf[p] + y);
    y = buf[p];
    out[i] = buf[p];
    buf[p] = s * amort;
    p = (p + 1) % N;
  }
  return out;
};

// Sala de Schroeder: cuatro peines en paralelo y dos pasatodo en serie. Los
// retardos son primos entre sí a propósito, si no la cola suena a tubo.
const sala = (x, sr, tam = 1, realim = 0.82) => {
  const peines = [29.7, 37.1, 41.1, 43.7].map((ms) => ({ d: new Float32Array(Math.round(ms * tam * sr / 1000)), p: 0, lp: 0 }));
  const todos = [5.0, 1.7].map((ms) => ({ d: new Float32Array(Math.round(ms * sr / 1000)), p: 0 }));
  const out = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) {
    let v = 0;
    for (const c of peines) {
      const s = c.d[c.p];
      v += s;
      // el peine pierde agudos en cada vuelta, como pierde agudos una sala
      c.lp = c.lp * 0.34 + s * 0.66;
      c.d[c.p] = x[i] + c.lp * realim;
      c.p = (c.p + 1) % c.d.length;
    }
    v /= 4;
    for (const a of todos) {
      const s = a.d[a.p];
      const y = -0.7 * v + s;
      a.d[a.p] = v + 0.7 * y;
      a.p = (a.p + 1) % a.d.length;
      v = y;
    }
    out[i] = v;
  }
  return out;
};

module.exports = { seno, azar, pulsar, sala };

// PIANO DE FIELTRO. Un piano es una cuerda GOLPEADA, no pulsada, y uno de
// fieltro es uno con el macillo amortiguado: el golpe pierde los agudos y queda
// el cuerpo. NO se puede hacer con Karplus y Strong como la cuerda de arriba, y
// ese fue el primer intento del 07-10-2026: un retardo da armónicos EXACTOS por
// construcción, y medido no había nada fuera de 880 Hz. Un piano vive justo de
// lo contrario.
//
// Va sumando parciales, que permite controlar las tres cosas que hacen a un
// piano y que ninguna cuerda pulsada tiene:
//
// 1. INARMONICIDAD ALTA. Las cuerdas de piano son gruesas y tensas, así que sus
//    agudos se van ARRIBA de donde deberían. Por eso un piano afinado
//    matemáticamente suena desafinado, y por eso los afinadores estiran las
//    octavas.
// 2. CADA PARCIAL MUERE A SU RITMO, y los agudos antes. Eso es lo que hace que
//    una nota de piano se vaya OSCURECIENDO mientras suena en vez de apagarse
//    entera. Es la mitad de lo que el oído reconoce como piano.
// 3. TRES CUERDAS POR NOTA, desafinadas unas diezmilésimas. Un piano de verdad
//    tiene dos o tres por tecla y nunca afinan idéntico: ese coro mínimo es la
//    otra mitad.
const pianoFieltro = (f, sr, seg, { fieltro = 1.7, cuerdas = 3, parciales = 10, cola = 2.6, B = 0.0004 } = {}) => {
  const n = Math.round(seg * sr);
  const out = new Float32Array(n);
  const ATAQUE = Math.max(2, Math.round(0.004 * sr));
  for (let k = 1; k <= parciales; k++) {
    const fk = k * f * Math.sqrt(1 + B * k * k);
    if (fk > sr * 0.45) break;
    // el fieltro es el exponente: mientras más alto, menos agudos deja pasar el
    // macillo, y eso es literalmente lo que hace un macillo amortiguado
    const amp = Math.pow(k, -fieltro);
    const tau = cola / Math.pow(k, 0.55);
    for (let c = 0; c < cuerdas; c++) {
      const desaf = 1 + (c - (cuerdas - 1) / 2) * 0.0006;
      const w = 2 * Math.PI * fk * desaf / sr;
      let fase = azar() * 0.4;
      for (let i = 0; i < n; i++) {
        // OJO con el corte: tiene que mirar SOLO la caída. Mirando la envolvente
        // entera cortaba en la muestra cero, porque el ataque arranca en cero, y
        // la nota duraba 0,3 s en vez de tres segundos.
        const cae = Math.exp(-i / (sr * tau));
        if (cae < 1e-5) break;
        fase += w;
        out[i] += Math.sin(fase) * amp * cae * Math.min(1, i / ATAQUE) / cuerdas;
      }
    }
  }
  // el ruido del macillo cayendo: dura milisegundos y es lo que delata que algo
  // GOLPEÓ. Sin esto la nota aparece en vez de ser tocada.
  let golpe = 0;
  for (let i = 0; i < Math.min(n, Math.round(0.05 * sr)); i++) {
    golpe = golpe * 0.86 + azar() * 0.14;
    out[i] += golpe * 0.22 * Math.exp(-i / (sr * 0.012));
  }
  let pico = 0;
  for (let i = 0; i < n; i++) if (Math.abs(out[i]) > pico) pico = Math.abs(out[i]);
  if (pico > 0) for (let i = 0; i < n; i++) out[i] /= pico;
  return out;
};

// La caja: resonadores de dos polos en las frecuencias de una tabla armónica.
// Son siempre las mismas, toque la nota que toque, y por eso todas las notas
// suenan al mismo instrumento.
// Los Q van bastante más bajos que en el primer intento: con resonadores muy
// afilados la caja tardaba casi un segundo en cargarse y la nota SUBÍA en vez
// de caer, que es exactamente lo contrario de un instrumento golpeado.
const caja = (x, sr, modos = [[96, 0.988, 0.42], [147, 0.985, 0.3], [233, 0.982, 0.24], [412, 0.978, 0.14]]) => {
  const out = new Float32Array(x.length);
  for (const [f, r, g] of modos) {
    const w = 2 * Math.PI * f / sr, a1 = 2 * r * Math.cos(w), a2 = -r * r;
    let y1 = 0, y2 = 0;
    for (let i = 0; i < x.length; i++) {
      const y = x[i] * (1 - r) + a1 * y1 + a2 * y2;
      y2 = y1; y1 = y;
      out[i] += y * g;
    }
  }
  return out;
};

module.exports.pianoFieltro = pianoFieltro;
module.exports.caja = caja;

// BARRA PERCUTIDA. Es el timbre que el canal ya eligió el 27-08-2026 para su
// sello, así que la cama usa el mismo y no uno nuevo: un canal tiene un sonido,
// no una colección.
//
// Una barra libre no da armónicos: da 1, 2,76, 5,40 y 8,93 veces la
// fundamental, que no son múltiplos enteros de nada. Por eso una marimba suena
// a madera golpeada y no a nota. Y por eso al constructor de marimbas le toca
// AFINAR la barra rebajándola por abajo hasta llevar el segundo modo a cuatro
// veces la fundamental, dos octavas justas. Esos son los números de acá:
// madera afinada 1 / 3,93 / 9,82, metal 1 / 4 / 10,8 con cola mucho más larga.
//
// Los modos agudos mueren mucho antes que el grave, y eso no es un detalle: es
// lo que hace que un golpe en madera sea un GOLPE y no una nota que aparece.
const MODOS = {
  madera: { r: [1, 3.93, 9.82, 16.1], a: [1, 0.30, 0.11, 0.04], cola: [1, 0.30, 0.14, 0.07] },
  metal: { r: [1, 4.0, 10.8, 19.6], a: [1, 0.42, 0.20, 0.08], cola: [1, 0.62, 0.38, 0.22] },
};

const barra = (f, sr, seg, { tipo = "madera", cola = 1.1, mazo = 0.7 } = {}) => {
  const n = Math.round(seg * sr);
  const out = new Float32Array(n);
  const M = MODOS[tipo] || MODOS.madera;
  const ATAQUE = Math.max(2, Math.round(0.0015 * sr));
  M.r.forEach((rel, k) => {
    const fk = f * rel;
    if (fk > sr * 0.45) return;
    // el mazo blando excita menos los modos agudos, igual que el fieltro del
    // piano: es el mismo fenómeno, con qué dureza golpeas
    const amp = M.a[k] * Math.pow(1 - mazo, k * 0.55 + (k ? 0 : 0)) || M.a[k];
    const tau = cola * M.cola[k];
    const w = 2 * Math.PI * fk / sr;
    let fase = 0;
    for (let i = 0; i < n; i++) {
      const cae = Math.exp(-i / (sr * tau));
      if (cae < 1e-5) break;
      fase += w;
      out[i] += Math.sin(fase) * amp * cae * Math.min(1, i / ATAQUE);
    }
  });
  // el golpe del mazo: dos milisegundos de ruido. Sin esto la nota aparece en
  // vez de ser golpeada, y el oído lo nota aunque no sepa qué le falta.
  let g = 0;
  for (let i = 0; i < Math.min(n, Math.round(0.02 * sr)); i++) {
    g = g * 0.7 + azar() * 0.3;
    out[i] += g * 0.3 * Math.exp(-i / (sr * 0.0035));
  }
  let pico = 0;
  for (let i = 0; i < n; i++) if (Math.abs(out[i]) > pico) pico = Math.abs(out[i]);
  if (pico > 0) for (let i = 0; i < n; i++) out[i] /= pico;
  return out;
};

module.exports.barra = barra;
