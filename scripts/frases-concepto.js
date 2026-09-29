// QUÉ DICEN DE VERDAD LOS PÁRRAFOS DE UN CONCEPTO (29-09-2026).
//
// Nació de dos errores míos en la misma hora, los dos por escribir el motivo de
// un dibujo mirando la PALABRA en vez de las frases donde aparece:
//
//   tribunales  le pedí "una sala de un tribunal oral en lo penal" a un
//               concepto que nombra Cortes en 43 párrafos y tribunal oral en 2.
//   anuncio     le pedí una conferencia de prensa a un concepto que se activa
//               con "Canadá anunció aranceles" y "una feria laboral anunció
//               seiscientas vacantes". Ninguna de las dos fue una conferencia, y
//               dibujar una afirma un hecho que no ocurrió.
//
// Las dos veces la corrección salió de contar, no de discutir. Entonces esto se
// corre ANTES de escribir un motivo, no después de que la imagen salió mal.
//
// Muestra dos cosas: cuántos párrafos trae cada variante, que dice qué acepción
// manda, y una muestra de frases reales, que dice qué se ve.
//
// Uso:  node scripts/frases-concepto.js gobierno
//       node scripts/frases-concepto.js gobierno --frases 20
const path = require("path");
const fs = require("fs");
const { CATEGORIAS } = require("./vocabulario.js");
const { parrafosDe } = require("./conteo-conceptos.js");

const GUIONES = path.join("contenido", "guiones", "informe");
const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const pedido = process.argv[2];
const cuantas = Number(process.argv[process.argv.indexOf("--frases") + 1]) || 12;
if (!pedido) {
  console.error("uso: node scripts/frases-concepto.js <concepto> [--frases 20]");
  process.exit(1);
}

let termino = null, categoria = null;
for (const c of CATEGORIAS) for (const t of c.terminos) if (t[0] === pedido) { termino = t; categoria = c; }
if (!termino) {
  const todos = CATEGORIAS.flatMap((c) => c.terminos.map((t) => t[0]));
  console.error(`no existe el concepto "${pedido}". Son: ${todos.join(", ")}`);
  process.exit(1);
}

const [nombre, variantes, motivo, materia] = termino;
const porVariante = {};
const frases = [];
let total = 0;

for (const archivo of fs.readdirSync(GUIONES).filter((f) => f.endsWith(".md"))) {
  const texto = fs.readFileSync(path.join(GUIONES, archivo), "utf8");
  for (const p of parrafosDe(texto)) {
    if (p.titular) continue;                 // un titular dura cuatro segundos: ahí no cabe un dibujo
    const n = sinTildes(p.texto);
    // la PRIMERA variante que aparece, para que un párrafo cuente una sola vez
    const cual = variantes.find((v) => n.includes(sinTildes(v)));
    if (!cual) continue;
    total++;
    porVariante[cual] = (porVariante[cual] || 0) + 1;
    frases.push({ variante: cual, texto: p.texto });
  }
}

console.log(`\n${nombre.toUpperCase()}  (${categoria.clave})  ${total} párrafos narrados\n`);
console.log(`motivo de hoy:  ${motivo}`);
if (materia) console.log(`materia de hoy: ${materia}`);

console.log(`\nQUÉ ACEPCIÓN MANDA:`);
Object.entries(porVariante).sort((a, b) => b[1] - a[1])
  .forEach(([v, n]) => console.log(`  ${String(n).padStart(4)}  ${v}   ${Math.round(100 * n / total)}%`));

// una muestra repartida entre las variantes y no las primeras del montón, que
// serían todas del mismo guion y del mismo tema
console.log(`\nFRASES REALES (muestra de ${Math.min(cuantas, frases.length)} de ${frases.length}):`);
const paso = Math.max(1, Math.floor(frases.length / cuantas));
frases.filter((_, i) => i % paso === 0).slice(0, cuantas).forEach((f, i) => {
  const t = f.texto.replace(/\s+/g, " ").trim();
  console.log(`  ${String(i + 1).padStart(2)}. [${f.variante}] ${t.length > 200 ? t.slice(0, 200) + "..." : t}`);
});
console.log("");
