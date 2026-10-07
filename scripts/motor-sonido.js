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
