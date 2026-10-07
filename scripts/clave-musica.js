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
const { azar, sala, barra, pianoFieltro, caja, seccionCuerdas, seccionCreciente } = require("./motor-sonido");

const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const guion = JSON.parse(fs.readFileSync(arg("guion"), "utf8"));
const salida = arg("salida", "public/sonidos/cama-clave.wav");
const SR = Number(arg("sr", 32000));
const PICO = Number(arg("pico", 0.085));
const MOJADO = Number(arg("sala", 0.32));
const PULSO = Number(arg("pulso", 0.75));
// la sección que lleva la cama de tensión en vez de la cama normal, contada
// desde 1. Sin esto, ninguna.
const SEC_TENSION = Number(arg("tension", 0)) - 1;
const CON_SELLO = arg("sello", "1") !== "0";
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
// durante la sección de tensión la cama se calla: la tensión ES la cama de esa
// sección, y las dos juntas solo embarran.
const enTension = (t) => SEC_TENSION >= 0 && seccionEn(t) === SEC_TENSION;

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

// EL AIRE DEL VIAJE VA DENTRO DE ESTA PISTA y ya no como un Audio suelto en el
// componente. Así los tiempos calzan exactos con la cámara, y sobre todo así se
// puede MEZCLAR: suelto, medía 21 dB por encima de la música, que es lo que
// Santiago reclamó. Acá entra a un nivel que se decide mirando la cama.
const aire = (seg, f0 = 240, f1 = 1300) => {
  const m = Math.round(seg * SR), out = new Float32Array(m);
  let y1 = 0, y2 = 0;
  for (let i = 0; i < m; i++) {
    const t = i / m;
    const env = 30 * t * t * (1 - t) * (1 - t) / 1.875;
    const w = 2 * Math.PI * (f0 + (f1 - f0) * Math.sin(Math.PI * t)) / SR;
    const y = azar() * 0.014 + 2 * 0.986 * Math.cos(w) * y1 - 0.986 * 0.986 * y2;
    y2 = y1; y1 = y;
    out[i] = y * env;
  }
  let p = 0; for (let i = 0; i < m; i++) if (Math.abs(out[i]) > p) p = Math.abs(out[i]);
  if (p > 0) for (let i = 0; i < m; i++) out[i] /= p;
  return out;
};

const seco = new Float32Array(n);
const poner = (onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  const g = puerta(t0), b = bordes(t0);
  if (g <= 0 || b <= 0 || enTension(t0)) return;
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

// EL AIRE DE CADA VIAJE. Entra a un nivel medido contra la cama y no suelto:
// el de antes iba 21 dB por encima de la música y Santiago lo oyó al tiro.
secciones.forEach((s, i) => {
  if (i === 0 || puerta(s.t) <= 0) return;
  const a = aire(viaje);
  const i0 = Math.round(s.t * SR);
  for (let k = 0; k < a.length && i0 + k < n; k++) seco[i0 + k] += a[k] * PICO * 0.85 * bordes((i0 + k) / SR);
});

// LA CAMA DE TENSIÓN de una sección entera. No es un riser: es un fondo que
// aguanta la sección completa y para en seco al terminarla. La subida es tan
// lenta que no se nota mientras pasa.
//
// El piso arranca ALTO, en 0,4 y no en 0,18: con el piso bajo la cama recién se
// empezaba a oír al segundo veinte, que es lo que Santiago cazó. Una cama que
// no se oye durante el primer tercio no está sosteniendo nada.
//
// El contrabajo va en re2, 73 Hz, y no en re1: re1 son 36,7 Hz, por debajo de
// la nota más grave de un contrabajo de verdad, y en la mayoría de los
// parlantes eso no da nota sino retumbe. Es lo que Santiago eligió al comparar.
if (SEC_TENSION >= 0 && SEC_TENSION < secciones.length) {
  const s0 = secciones[SEC_TENSION];
  const fin = (secciones[SEC_TENSION + 1] ? secciones[SEC_TENSION + 1].t : TOTAL) - 0.9;
  const dur = fin - s0.t;
  const VOCES_T = [
    [-12, 0.00, 0.95, 0.38], [0, 0.14, 0.52, 0.42],
    [7, 0.30, 0.40, 0.48], [19, 0.46, 0.26, 0.54], [24, 0.66, 0.16, 0.58],
  ];
  VOCES_T.forEach(([st, frac, niv, brillo]) => {
    const desde = s0.t + dur * frac;
    const largo = fin - desde + 0.2;
    if (largo < 1) return;
    const onda = seccionCreciente(nota(st), SR, largo, {
      musicos: 5, brilloBase: brillo, aspereza: 0.12, parciales: 14,
      envolvente: (t) => {
        const abs = desde + t;
        if (abs >= fin) { const d = (abs - fin) / 0.03; return d >= 1 ? 0 : 1 - d; }
        return Math.pow(Math.max(0, (abs - desde) / Math.max(0.001, fin - desde)), 1.5);
      },
    });
    const i0 = Math.round(desde * SR);
    for (let k = 0; k < onda.length && i0 + k < n; k++) {
      const t = (i0 + k) / SR;
      const global = t >= fin ? 0 : 0.52 + 0.48 * Math.pow((t - s0.t) / dur, 1.7);
      // 3,5 y no 1,5: con 1,5 la tensión quedaba POR DEBAJO de la cama normal,
      // o sea la sección "tensa" sonaba más floja que las otras trece
      seco[i0 + k] += onda[k] * niv * global * PICO * 3.5 * bordes(t);
    }
  });
}

// EL SELLO DEL CANAL, los ocho compases que dictó Santiago. Va al principio y
// es lo único que suena idéntico en todas las Claves: un sello es identidad.
if (CON_SELLO) {
  const BPM = 132, NEG = 60 / BPM, COR = NEG / 2, CP = NEG * 8;
  const BT = []; for (let c = 0; c < 4; c++) { BT.push(c * NEG * 2); BT.push(c * NEG * 2 + COR); }
  const MT = [0, NEG, NEG + COR, NEG + COR * 2];
  const Aa = [12, 12, 19, 24], Bb = [12, 12, 24, 22], Cc = [12, 12, 24, 26];
  const CPS = [Aa, Bb, Aa, Cc, Aa, Bb, Aa, Cc];
  const cerca = (mel, prev) => {
    const r = (((mel % 12) + 12) % 12) - 12;
    let mejor = r, dist = Infinity;
    for (let o = -1; o <= 1; o++) { const c = r + 12 * o; if (c < -14 || c > -2) continue;
      const d = Math.abs(c - prev); if (d < dist) { dist = d; mejor = c; } }
    return mejor;
  };
  const memo = new Map();
  const cu = (st) => { if (!memo.has(st)) memo.set(st, seccionCuerdas(nota(st), SR, 1.2, { musicos: 9, cola: 0.26, ataque: 0.014, brillo: 0.46 })); return memo.get(st); };
  const meter = (onda, t0, niv) => { const i0 = Math.round(t0 * SR);
    for (let k = 0; k < onda.length && i0 + k < n; k++) seco[i0 + k] += onda[k] * niv * PICO * 2.6; };
  let prev = -12;
  CPS.forEach((mel, c) => {
    const tb = 0.4 + c * CP;
    for (let k = 0; k < 4; k++) {
      if (k === 0) prev = cerca(mel[k], prev);
      meter(cu(prev), tb + BT[k * 2], 0.55);
      meter(cu(prev + 7), tb + BT[k * 2 + 1], 0.40);
    }
    mel.forEach((st, k) => {
      const largo = k === 3 ? (c === 7 ? 4.6 : (c % 4 === 3 ? 3.4 : 2.6)) : 1.6;
      meter(barra(nota(st), SR, largo + 1.5, { tipo: "metal", cola: largo, mazo: 0.78 }), tb + MT[k], [1.0, 0.6, 0.62, 0.95][k]);
    });
    meter(pianoFieltro(nota(-24), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.2 }), tb, 0.26);
  });
}

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
// LA SALA TAMBIÉN TIENE QUE CORTARSE. Si la cola sobrevive al corte, el corte
// deja de ser corte: medido, caía solo 7 dB en medio segundo cuando tenía que
// desaparecer. El corte brusco es todo el gesto; sin él esto es solo un fondo
// que se desvanece.
if (SEC_TENSION >= 0 && SEC_TENSION < secciones.length) {
  const fin = (secciones[SEC_TENSION + 1] ? secciones[SEC_TENSION + 1].t : TOTAL) - 0.9;
  for (let i = Math.round(fin * SR); i < n; i++) {
    const d = (i / SR - fin) / 0.14;
    if (d >= 1) break;
    rev[i] *= 1 - d;
  }
  for (let i = Math.round((fin + 0.14) * SR); i < Math.round((fin + 0.9) * SR) && i < n; i++) rev[i] = 0;
}
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
console.log((CON_SELLO ? "con sello, " : "sin sello, ") + (SEC_TENSION >= 0 ? "tensión en la sección " + (SEC_TENSION + 1) + ", " : "sin tensión, ") +
  secciones.length + " secciones, " + datos.length + " datos en silencio, " +
  (enLuto.length ? enLuto.length + " en silencio por la regla 28: " + enLuto.map((s) => s.t.toFixed(0) + "s").join(" ") : "ninguna de duelo o violencia"));
