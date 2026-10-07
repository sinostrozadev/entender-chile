// La música de una Clave, generada desde su propio guion.
//
// LA CAMA ES EL LOOP DE LOS OCHO COMPASES que dictó Santiago, no otra cosa.
// Hasta el 07-10-2026 yo tenía dos músicas distintas: su frase de ocho compases
// como intro de 33 segundos, y abajo una cama mía de células en dórico. Él lo
// cazó al tiro: "la cama que creamos de los 8 compases, no la pusiste". Tenía
// razón y era un error de concepto, no de mezcla: estábamos trabajando una CAMA
// y yo la había usado de sello.
//
//   compás 1  re4 re4 la4 re5      5  igual al 1
//   compás 2  re4 re4 re5 do5      6  igual al 2
//   compás 3  igual al 1           7  igual al 1
//   compás 4  re4 re4 re5 mi5      8  igual al 4
//
// La base es su rítmica: corchea corchea y silencio de negra, cuatro veces por
// compás, siguiendo la nota principal. La melodía es negra corchea corchea
// corchea sostenida, en campana. El período no resuelve nunca, porque el mi es
// la novena.
//
// LOS TONOS CAMBIAN CON LA SECCIÓN: la frase entera se transporta al centro de
// cada sección, que es lo que ata la música a la cámara.
//
// LA TENSIÓN VA ENCIMA DE LA CAMA, no en vez de ella. También lo corrigió él, y
// es obvio en cuanto se dice: la tensión es algo que SE SUMA a lo que ya está
// sonando, no un reemplazo.
//
// Los bloques de DATO van en silencio absoluto, y la regla dura 28 apaga entera
// cualquier sección de duelo o violencia.
//
// uso: node scripts/clave-musica.js --guion G.json --salida S.wav [--tension N]

const fs = require("fs");
const path = require("path");
const { azar, sala, barra, pianoFieltro, caja, seccionCuerdas, seccionCreciente } = require("./motor-sonido");

const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const guion = JSON.parse(fs.readFileSync(arg("guion"), "utf8"));
const salida = arg("salida", "public/sonidos/cama-clave.wav");
const SR = Number(arg("sr", 32000));
const PICO = Number(arg("pico", 0.085));
const MOJADO = Number(arg("sala", 0.30));
// qué secciones lleva la tensión, contadas desde 1: "9-13" crece desde el
// comienzo de la 9 hasta el final de la 13. Una sola, "9", es solo esa.
const RANGO = String(arg("tension", "")).split("-").map(Number).filter((x) => x > 0);
const FPS = 24;

const RE = 146.83;
const nota = (st) => RE * Math.pow(2, st / 12);
const ESCALA = [0, 2, 3, 5, 7, 8, 10];
const gradoA = (esc, g) => esc[((g % esc.length) + esc.length) % esc.length] + 12 * Math.floor(g / esc.length);

const BPM = 132, NEGRA = 60 / BPM, CORCHEA = NEGRA / 2, COMPAS = NEGRA * 8;
const BASE_T = []; for (let c = 0; c < 4; c++) { BASE_T.push(c * NEGRA * 2); BASE_T.push(c * NEGRA * 2 + CORCHEA); }
const MEL_T = [0, NEGRA, NEGRA + CORCHEA, NEGRA + CORCHEA * 2];
// CUATRO compases, no ocho. Santiago lo preguntó y tiene razón: cuando decidió
// que el compás 8 fuera igual al 4, los compases 5 a 8 quedaron idénticos a los
// 1 a 4. O sea la frase SIEMPRE fue de cuatro, y escribirla de ocho era escribir
// dos veces lo mismo.
const A = [12, 12, 19, 24];   // re4 re4 la4 re5
const B = [12, 12, 24, 22];   // re4 re4 re5 do5
const C = [12, 12, 24, 26];   // re4 re4 re5 mi5
const FRASE = [A, B, A, C];

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
const bordes = (t) => Math.min(suave(Math.min(1, t / 4)), suave(Math.min(1, (TOTAL - t) / 4)));

// el centro de cada sección, entre los grados estables del modo y nunca una
// tercera: la armonía se mueve con la cámara y sigue sin dar veredicto
let sem = (guion.paradas || [0]).reduce((a, b) => a + b, 0) + secciones.length;
const dado = () => (sem = (sem * 48271) % 2147483647) / 2147483647;
const ESTABLES = [0, 4, 3, 6, 1];
const CENTROS = [0];
for (let i = 1; i < secciones.length; i++) {
  const prev = ESTABLES.indexOf(CENTROS[i - 1]);
  CENTROS.push(ESTABLES[((prev + [1, -1, 2, -2][Math.floor(dado() * 4)]) % 5 + 5) % 5]);
}
CENTROS[CENTROS.length - 1] = 0;
const centroDe = (i) => gradoA(ESCALA, CENTROS[Math.min(i, CENTROS.length - 1)]);

const seco = new Float32Array(n);
const poner = (onda, t0, niv) => {
  const i0 = Math.round(t0 * SR);
  if (i0 < 0 || i0 >= n) return;
  for (let k = 0; k < onda.length && i0 + k < n; k++) seco[i0 + k] += onda[k] * niv;
};

const BAJO_MIN = -14, BAJO_MAX = -2;
const raizCerca = (mel, previa) => {
  const r = (((mel % 12) + 12) % 12) - 12;
  let mejor = r, dist = Infinity;
  for (let o = -1; o <= 1; o++) {
    const c = r + 12 * o;
    if (c < BAJO_MIN || c > BAJO_MAX) continue;
    const d = Math.abs(c - previa);
    if (d < dist) { dist = d; mejor = c; }
  }
  return mejor;
};

const memo = new Map();
const cuerda = (st) => {
  if (!memo.has(st)) memo.set(st, seccionCuerdas(nota(st), SR, 1.2, { musicos: 9, cola: 0.26, ataque: 0.014, brillo: 0.46 }));
  return memo.get(st);
};

// LA CAMA: la frase de ocho compases, en loop, transportada al centro de cada
// sección. El loop corre de punta a punta y no se reinicia en cada sección: si
// se reiniciara, las catorce empezarían con las mismas cuatro notas.
let previa = -12;
let compas = 0;
for (let tb = 0.4; tb < TOTAL; tb += COMPAS, compas++) {
  const mel = FRASE[compas % FRASE.length];
  const sec = seccionEn(tb);
  const tr = centroDe(sec);
  const g = puerta(tb) * bordes(tb);
  if (g <= 0) continue;
  for (let k = 0; k < 4; k++) {
    if (k === 0) previa = raizCerca(mel[k] + tr, previa);
    poner(cuerda(previa), tb + BASE_T[k * 2], 0.55 * g * PICO * 2.4);
    poner(cuerda(previa + 7), tb + BASE_T[k * 2 + 1], 0.40 * g * PICO * 2.4);
  }
  mel.forEach((st, k) => {
    const largo = k === 3 ? (compas % 4 === 3 ? 3.4 : 2.6) : 1.6;
    poner(barra(nota(st + tr), SR, largo + 1.5, { tipo: "metal", cola: largo, mazo: 0.78 }), tb + MEL_T[k], [1.0, 0.6, 0.62, 0.95][k] * g * PICO * 2.4);
  });
  poner(pianoFieltro(nota(-24 + tr), SR, 6, { fieltro: 1.2, cuerdas: 3, cola: 3.2 }), tb, 0.26 * g * PICO * 2.4);
}

// EL AIRE DEL VIAJE. Entre el de antes, que sobresalía 21 dB y tapaba todo, y
// el del intento pasado, que a 6 dB sencillamente no se oía, el punto está en el
// medio. Acá apunta a unos 14.
// EL "FSHU". Santiago lo dijo con la boca y eso es una instrucción exacta, no
// una metáfora: "fsh" es una fricativa, ruido ancho y AGUDO, y la "u" es una
// vocal grave y cerrada. O sea el sonido empieza arriba y BAJA.
//
// Lo que yo tenía barría hacia arriba y volvía, con una curva simétrica: eso no
// es un fshu, es un viento. Por eso sonaba mal aunque estuviera al volumen
// correcto. Ahora entra de golpe en lo agudo y cae hacia lo grave mientras se
// apaga, que es lo que hace una boca al decirlo.
const aire = (seg) => {
  const m = Math.round(seg * SR), out = new Float32Array(m);
  let y1 = 0, y2 = 0;
  const ATAQUE = 0.035;
  for (let i = 0; i < m; i++) {
    const t = i / m, tt = i / SR;
    // de 3.400 Hz a 420: la "fsh" y la "u"
    const f = 3400 * Math.pow(420 / 3400, Math.pow(t, 0.62));
    const q = 0.972;
    const w = 2 * Math.PI * f / SR;
    const y = azar() * (1 - q) + 2 * q * Math.cos(w) * y1 - q * q * y2;
    y2 = y1; y1 = y;
    const env = Math.min(1, tt / ATAQUE) * Math.exp(-Math.pow(t, 1.1) * 3.4);
    out[i] = y * env;
  }
  let p = 0; for (let i = 0; i < m; i++) if (Math.abs(out[i]) > p) p = Math.abs(out[i]);
  if (p > 0) for (let i = 0; i < m; i++) out[i] /= p;
  const K = 2.6, tope = Math.tanh(K);
  for (let i = 0; i < m; i++) out[i] = Math.tanh(out[i] * K) / tope;
  return out;
};
secciones.forEach((s, i) => {
  if (i === 0) return;
  // nivel medido contra la cama. A 10 dB quedaba fuerte, así que baja a 5.
  poner(aire(0.95), s.t, PICO * 4.2 * bordes(s.t));
});

// LA TENSIÓN, ENCIMA DE LA CAMA Y NO EN VEZ DE ELLA, y cruzando VARIAS
// SECCIONES. Santiago: "debe llegar al clímax antes del cierre y mantenerse
// arriba, generando esa tensión".
//
// Eso cambia la forma por segunda vez. Primero era un riser de 7 segundos,
// después una cama de una sección, y ahora es un arco que cruza varias: crece
// durante minutos, llega arriba justo ANTES del cierre y se queda ahí hasta el
// final. No hay corte en seco: el corte servía cuando la tensión terminaba
// dentro del video, pero acá no termina, termina el video.
//
// El contrabajo va en re2, 73 Hz. Re1 son 36,7, por debajo de la nota más grave
// de un contrabajo real, y en la mayoría de los parlantes eso no da nota sino
// retumbe. Lo eligió él comparando cuatro versiones.
if (RANGO.length) {
  const iDesde = RANGO[0] - 1;
  const iHasta = (RANGO[1] || RANGO[0]) - 1;
  if (iDesde >= 0 && iDesde < secciones.length) {
    const t0 = secciones[iDesde].t;
    // el clímax cae donde termina la última sección del rango, que es justo
    // antes de que empiece la siguiente
    const clima = secciones[iHasta + 1] ? secciones[iHasta + 1].t : TOTAL;
    const dur = clima - t0;
    [[-12, 0.00, 0.95, 0.38], [0, 0.10, 0.52, 0.42], [7, 0.26, 0.40, 0.48],
     [19, 0.46, 0.26, 0.54], [24, 0.68, 0.16, 0.58]]
      .forEach(([st, frac, niv, brillo]) => {
        const desde = t0 + dur * frac, largo = TOTAL - desde;
        if (largo < 1) return;
        const onda = seccionCreciente(nota(st + centroDe(iDesde)), SR, largo, {
          musicos: 5, brilloBase: brillo, aspereza: 0.12, parciales: 14,
          envolvente: (t) => {
            const abs = desde + t;
            // crece hasta el clímax y DE AHÍ SE QUEDA: la tensión que se
            // mantiene arriba es más incómoda que la que sigue subiendo,
            // porque ya no promete que vaya a pasar algo
            if (abs >= clima) return 1;
            return Math.pow(Math.max(0, (abs - desde) / Math.max(0.001, clima - desde)), 1.5);
          },
        });
        const i0 = Math.round(desde * SR);
        for (let k = 0; k < onda.length && i0 + k < n; k++) {
          const t = (i0 + k) / SR;
          const global = t >= clima ? 1 : 0.30 + 0.70 * Math.pow((t - t0) / dur, 1.6);
          seco[i0 + k] += onda[k] * niv * global * PICO * 3.0 * bordes(t) * puerta(t);
        }
      });
  }
}

for (let i = 0; i < n; i++) { const g = puerta(i / SR); if (g < 1) seco[i] *= g; }

const cuerpo = caja(seco, SR);
for (let i = 0; i < n; i++) seco[i] += cuerpo[i] * 0.16;
const rev = sala(seco, SR, 1, 0.80);
let pico = 0;
for (let i = 0; i < n; i++) { const v = seco[i] * (1 - MOJADO) + rev[i] * MOJADO * 1.9; if (Math.abs(v) > pico) pico = Math.abs(v); }
const ajuste = pico > 0 ? PICO / pico : 1;
const m = new Int16Array(n);
for (let i = 0; i < n; i++) {
  const v = (seco[i] * (1 - MOJADO) + rev[i] * MOJADO * 1.9) * ajuste;
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
console.log("cama: la frase de 8 compases en loop, " + compas + " compases, transportada por sección");
console.log((RANGO.length ? "tensión ENCIMA de la cama, secciones " + RANGO.join(" a ") + " y se queda arriba, " : "sin tensión, ") +
  secciones.length + " secciones, " + datos.length + " datos en silencio, " +
  (enLuto.length ? enLuto.length + " apagadas por la regla 28" : "ninguna de duelo"));
