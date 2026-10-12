// EL TEXTO SE REEMPLAZA, NO SE ACUMULA (12-10-2026, decisión de Santiago: la
// Clave del mural lo hace desde el 06-10 y lo quiso en el informe diario).
//
// El porqué está en la cabecera de src/clave-mural.tsx y se copia acá porque
// es la regla que este archivo cumple: "Un párrafo que crece obliga a leer a
// nuestra velocidad y el espectador siempre va atrasado. Bloques de ocho o
// nueve palabras que se relevan: nunca hay un muro y el ojo queda libre para
// mirar". En el informe el muro era literal: el párrafo narrado salía entero
// desde el primer cuadro, a veces sesenta palabras sobre la imagen de sección.
//
// Lo que hace este archivo es solo PARTIR y FECHAR. Dibujar es de
// src/tarjetas.tsx, como en el resto del pipeline: build-timeline planifica y
// Remotion pinta, así los cortes se pueden revisar en el JSON sin rendir.
//
// CÓMO PARTE. No cuenta de a ocho y corta: eso deja "de" al final de un bloque
// y "la" al comienzo del otro, y obliga a sostener la frase en la memoria a
// través del relevo. Busca, entre todas las maneras de partir el párrafo, la
// que menos cuesta, y el costo dice lo que se lee mal:
//   - alejarse de ocho o nueve palabras (cuadrático: diez está bien, catorce no);
//   - cortar donde no hay pausa: punto gratis, dos puntos o punto y coma casi
//     gratis, coma barato, antes de "y", "que" o "pero" algo más, y en medio
//     de la frase caro;
//   - terminar un bloque en una palabra que pide la siguiente (un artículo, una
//     preposición, "no", una cifra que espera su unidad): carísimo;
//   - dejar un punto adentro del bloque, con media oración nueva colgando.
// Y dos cosas que no se negocian: ningún bloque baja de CINCO palabras (nunca
// una palabra huérfana, ni dos ni tres sueltas en pantalla) ni pasa de ONCE,
// que con la letra del párrafo son tres líneas y caben en el cuadro.
//
// CUÁNDO ENTRA CADA BLOQUE: cuando la voz dice su primera palabra, leído en la
// misma curva `ritmo` que ya usaba el dibujo con texto (ver ritmoDe en
// build-timeline.js y enCurva en src/tarjetas.tsx), menos el mismo adelanto
// con que aparece una palabra. Se calcula con la MISMA cuenta que hace el
// video para cada palabra, así el bloque nunca entra después que su texto.

const OBJETIVO = 8.5;
const MINIMO = 5;
const MAXIMO = 11;

// palabras que piden la siguiente: terminar un bloque en una de ellas deja la
// frase colgando en pantalla durante el relevo
const PIDEN = new Set(("a al ante bajo con contra de del desde durante e el en entre hacia hasta la las lo los mediante " +
  "ni no o para pero por que se según sin sobre su sus tras u un una unos unas y muy más menos cada cuyo cuya " +
  "este esta estos estas ese esa esos esas aquel aquella le les me nos te mi mis tu tus nuestro nuestra " +
  // y los verbos que piden su complemento: "observar si | esta baja", "fue | 44%"
  "si es son era eran fue fueron ser sido está están estaba cerca").split(" "));
// palabras con las que una frase puede arrancar de nuevo: cortar ANTES de ellas
// se lee casi como una coma
const ABREN = new Set("y o pero que porque aunque mientras donde cuando quien quienes como sino ni pues luego".split(" "));

const limpia = (p) => p.toLowerCase().replace(/^[«"“(¿¡]+|[»"”).,;:!?…]+$/g, "");

// cuánto cuesta cortar DESPUÉS de la palabra `p`, sabiendo que la que sigue es `sig`
function costoCorte(p, sig) {
  let c;
  if (/[.!?…]["”»)]*$/.test(p)) c = 0;
  else if (/[:;]["”»)]*$/.test(p)) c = 1;
  else if (/[,)]["”»]*$/.test(p) || /[”»"]$/.test(p)) c = 3;
  else if (sig && ABREN.has(limpia(sig))) c = 6;
  else c = 12;
  if (PIDEN.has(limpia(p))) c += 25;
  // "después | de participar": la preposición que abre el bloque nuevo deja
  // colgando al anterior igual que si la hubiera cerrado
  if (sig && /^(de|del)$/.test(limpia(sig))) c += 8;
  // una cifra sin puntuación casi siempre espera su unidad ("5 m", "$2.000 millones")
  if (/^[$\d][\d.,%]*$/.test(p)) c += 15;
  return c;
}

// devuelve [{ desde: índice de palabra, hasta: índice excluido }]
function partir(palabras) {
  const n = palabras.length;
  if (n <= MAXIMO) return [{ desde: 0, hasta: n }];
  const mejor = new Array(n + 1).fill(Infinity);
  const previo = new Array(n + 1).fill(-1);
  mejor[0] = 0;
  for (let j = MINIMO; j <= n; j++) {
    for (let largo = MINIMO; largo <= MAXIMO && largo <= j; largo++) {
      const i = j - largo;
      if (mejor[i] === Infinity) continue;
      const corte = j < n ? costoCorte(palabras[j - 1], palabras[j]) : 0;
      // un punto ADENTRO del bloque: el ojo termina una oración y empieza otra
      // que se corta en el relevo. Mejor un bloque corto que cierre la suya.
      let adentro = 0;
      for (let k = i; k < j - 1; k++) if (/[.!?…]["”»)]*$/.test(palabras[k])) adentro += 25;
      const c = mejor[i] + (largo - OBJETIVO) ** 2 + corte + adentro;
      if (c < mejor[j]) { mejor[j] = c; previo[j] = i; }
    }
  }
  // con MINIMO 5 y MAXIMO 11 todo largo desde 12 tiene solución; esto es la
  // red por si alguien cambia los números y deja un hueco
  if (mejor[n] === Infinity) return [{ desde: 0, hasta: n }];
  const tramos = [];
  for (let j = n; j > 0; j = previo[j]) tramos.unshift({ desde: previo[j], hasta: j });
  return tramos;
}

// en qué segundo iba la voz cuando llevaba la fracción `f` del párrafo. Es la
// copia exacta de enCurva en src/tarjetas.tsx: si una cambia, cambia la otra.
function enCurva(ritmo, f, dur) {
  if (!ritmo || ritmo.length < 2) return f * dur;
  if (f <= ritmo[0][0]) return ritmo[0][1];
  for (let i = 1; i < ritmo.length; i++) {
    const [f1, t1] = ritmo[i];
    if (f <= f1) {
      const [f0, t0] = ritmo[i - 1];
      const k = f1 === f0 ? 0 : (f - f0) / (f1 - f0);
      return t0 + k * (t1 - t0);
    }
  }
  const [fu, tu] = ritmo[ritmo.length - 1];
  const resto = Math.max(0.001, 1 - fu);
  return tu + ((f - fu) / resto) * Math.max(0, dur - tu);
}

// texto: lo que se ve (textoPantalla o texto); dur: segundos del párrafo;
// adelanto: lo que la palabra se adelanta a la voz (COMUN.adelantoSeg).
// Devuelve [{ texto, en, desde }]: `en` es dónde empieza el bloque dentro del
// texto (la palabra se ubica en la curva por su posición en el párrafo
// entero, no en el bloque) y `desde` el segundo en que entra, contado desde
// que empieza el párrafo. El primero entra siempre en cero.
function bloquesDe(texto, ritmo, dur, adelanto) {
  const piezas = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(texto))) piezas.push({ p: m[0], en: m.index });
  if (!piezas.length) return null;
  const total = Math.max(1, texto.length);
  return partir(piezas.map((x) => x.p)).map(({ desde, hasta }, k) => {
    const en = piezas[desde].en;
    const fin = piezas[hasta - 1].en + piezas[hasta - 1].p.length;
    const entra = k === 0 ? 0 : Math.max(0, enCurva(ritmo, en / total, dur) - adelanto);
    return { texto: texto.slice(en, fin), en, desde: Number(entra.toFixed(3)) };
  });
}

module.exports = { bloquesDe, partir, costoCorte, OBJETIVO, MINIMO, MAXIMO };
