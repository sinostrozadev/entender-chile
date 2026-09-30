// QUÉ TARJETA LE TOCA A CADA PÁRRAFO: la medición, no la decisión (30-09-2026).
//
// Por qué existe: narración es la única ranura con más de una tarjeta (párrafo,
// dibujo y texto, dibujo solo) y hoy nada elige entre ellas, así que los
// catorce dibujos de la biblioteca no aparecen en ningún video publicado. Antes
// de escribir el criterio hay que saber qué produciría sobre los guiones que ya
// existen, porque una regla que suena razonable puede poner el mismo dibujo
// nueve veces en una edición. Eso es exactamente lo que pasa sin guardas.
//
// Qué mide: sobre los párrafos NARRADOS de todos los guiones del informe,
// cuántos caerían en cada tarjeta con la regla cruda y cuántos con guardas.
// No toca el video ni el timeline: solo cuenta y escribe el JSON que lee el
// taller.
//
// Uso:  node scripts/ranura-narracion.js          (escribe el JSON)
//       node scripts/ranura-narracion.js --ver    (solo muestra)
const fs = require("fs");
const path = require("path");
const { parrafosDe, encaja } = require("./conteo-conceptos.js");
const { CATEGORIAS } = require("./vocabulario.js");

const GUIONES = path.join("contenido", "guiones", "informe");
const DIBUJOS = path.join("contenido", "biblioteca", "grabado");
const SALIDA = path.join("contenido", "config", "ranura-narracion.json");

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// UNA CIFRA QUE EL CANAL EXIGE MOSTRAR CON SU FUENTE. La regla del 28-09 dice
// que la imagen reemplaza la prosa y nunca el dato, así que un párrafo con
// cifra no puede perder su texto. No cuenta un año ni una hora: "el 2027" o
// "las 14 horas" no son un dato que haya que acreditar.
const TIENE_CIFRA = /\d+(?:,\d+)?\s*%|\$\s?\d|\d{1,3}(?:\.\d{3})+|\bmil(?:lones|es)?\b|\bpor ciento\b/i;

// Los términos vienen agrupados por familia en el vocabulario; acá se aplanan.
const TERMINOS = [];
for (const grupo of CATEGORIAS) for (const t of grupo.terminos) TERMINOS.push([t[0], t[1]]);

// Cuántas variantes tiene cada concepto dibujado: es el tope de veces que se
// puede usar en una edición sin repetir el MISMO dibujo.
const VARIANTES = {};
for (const f of fs.readdirSync(DIBUJOS).filter((n) => n.endsWith(".png"))) {
  const c = f.replace(/-[a-z]\.png$/, "");
  VARIANTES[c] = (VARIANTES[c] || 0) + 1;
}

// El concepto dibujable de un párrafo, o null. Gana el primero del vocabulario,
// que es el mismo orden que usa el conteo, para que las dos mediciones digan lo
// mismo sobre el mismo texto.
const conceptoDe = (texto) => {
  const plano = " " + sinTildes(texto) + " ";
  for (const [c, variantes] of TERMINOS)
    for (const v of variantes)
      if (encaja(plano, sinTildes(v)) >= 0) return VARIANTES[c] ? c : null;
  return null;
};

const mediana = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

const archivos = fs.readdirSync(GUIONES).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort();
const ediciones = [];
let parrafos = 0, conCifra = 0, conConcepto = 0;

for (const f of archivos) {
  const filas = parrafosDe(fs.readFileSync(path.join(GUIONES, f), "utf8"))
    // un titular dura cuatro segundos: ahí no cabe un dibujo que dura un párrafo
    .filter((x) => !x.titular);
  const candidato = filas.map((fila) => {
    parrafos++;
    const cifra = TIENE_CIFRA.test(fila.texto);
    if (cifra) conCifra++;
    const c = conceptoDe(fila.texto);
    if (c) conConcepto++;
    return cifra ? null : c;
  });

  // LAS GUARDAS. Sin ellas la regla pone el mismo dibujo hasta nueve veces en
  // una edición y hasta ocho párrafos seguidos ilustrados, que es justo lo que
  // Santiago temía cuando preguntó si veinte dibujos parecidos cansan.
  const usado = {};
  let anterior = false;
  const puestos = candidato.map((c) => {
    if (!c || anterior || (usado[c] || 0) >= VARIANTES[c]) { anterior = false; return null; }
    usado[c] = (usado[c] || 0) + 1;
    anterior = true;
    return c;
  }).filter(Boolean);

  ediciones.push({
    fecha: f.slice(0, 10),
    parrafos: filas.length,
    crudo: candidato.filter(Boolean).length,
    conGuardas: puestos.length,
    conceptos: new Set(puestos).size,
  });
}

const crudos = ediciones.map((e) => e.crudo);
const guardados = ediciones.map((e) => e.conGuardas);
const resumen = {
  generado: new Date().toISOString().slice(0, 10),
  guiones: archivos.length,
  parrafos,
  conCifra,
  conConcepto,
  dibujosDisponibles: Object.keys(VARIANTES).length,
  variantes: Object.values(VARIANTES).reduce((a, b) => a + b, 0),
  crudo: { mediana: mediana(crudos), min: Math.min(...crudos), max: Math.max(...crudos) },
  conGuardas: { mediana: mediana(guardados), min: Math.min(...guardados), max: Math.max(...guardados) },
  conceptosPorEdicion: mediana(ediciones.map((e) => e.conceptos)),
  ediciones,
};

const pc = (n) => `${Math.round(n * 100 / parrafos)}%`;
console.log(`${archivos.length} guiones · ${parrafos} párrafos narrados`);
console.log(`  con una cifra que hay que mostrar: ${conCifra} (${pc(conCifra)})`);
console.log(`  con un concepto que ya tiene dibujo: ${conConcepto} (${pc(conConcepto)})`);
console.log(`  dibujos por edición, regla cruda:   mediana ${resumen.crudo.mediana}, de ${resumen.crudo.min} a ${resumen.crudo.max}`);
console.log(`  dibujos por edición, con guardas:   mediana ${resumen.conGuardas.mediana}, de ${resumen.conGuardas.min} a ${resumen.conGuardas.max}`);

if (!process.argv.includes("--ver")) {
  fs.writeFileSync(SALIDA, JSON.stringify(resumen, null, 2) + "\n");
  console.log(`escrito ${SALIDA}`);
}
