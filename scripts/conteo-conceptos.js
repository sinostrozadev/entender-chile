// CUENTA LOS CONCEPTOS EN LOS GUIONES DEL INFORME (29-09-2026).
//
// Para qué: la biblioteca de imágenes se arma a ciegas si no se sabe qué
// aparece de verdad y con qué frecuencia. Antes de pedirle a nadie cuarenta
// dibujos conviene saber cuáles de esos cuarenta van a usarse todas las
// semanas y cuáles una vez al mes.
//
// Qué cuenta: los párrafos NARRADOS, que son los que se dicen en voz alta y
// por lo tanto los únicos donde una imagen puede ir en lugar del texto. No
// cuenta títulos de sección, ni las líneas de [FUENTE], [DATO] o [TESIS], ni
// la cabecera del archivo.
//
// DOS COSAS QUE PARECEN PÁRRAFOS Y NO LO SON, y que en la primera corrida
// inflaron el total de 1.900 a 3.151:
//
//   la lista de FUENTES   va al final, dentro de "## Cierre", y son cuarenta
//                         líneas por guion que nadie lee en voz alta.
//   los TITULARES         sí se narran, pero son una línea de cuatro segundos
//                         cada una. Ahí no cabe una imagen que dure un
//                         párrafo, así que se cuentan aparte y no se mezclan.
//
// Cómo cuenta: una vez por párrafo. Si un párrafo dice "gobierno" cuatro
// veces sigue siendo un párrafo, porque lo que se pregunta es en cuántos
// párrafos se PODRÍA poner ese dibujo.
//
// Uso:  node scripts/conteo-conceptos.js            (escribe los dos archivos)
//       node scripts/conteo-conceptos.js --ver      (solo muestra, no escribe)
const fs = require("fs");
const path = require("path");
const { CATEGORIAS } = require("./vocabulario.js");

const GUIONES = path.join("contenido", "guiones", "informe");
const SALIDA_MD = path.join("contenido", "biblioteca", "CONCEPTOS.md");
const SALIDA_JSON = path.join("contenido", "biblioteca", "conceptos.json");
// el mismo dato, como archivo suelto que el Taller publica junto a su página:
// el taller vive en claude.ai y no puede leer el repositorio
const SALIDA_TALLER = path.join("taller", "conceptos.js");

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// los párrafos narrados de un guion: líneas sueltas de prosa, sin marcas
const parrafosDe = (texto) => {
  const fuera = [];
  let enGuion = false;
  let seccion = "";
  for (const linea of texto.split("\n")) {
    const t = linea.trim();
    if (!enGuion) { if (/^guion:/i.test(t)) enGuion = true; continue; }
    if (!t) continue;
    if (/^fuentes:/i.test(sinTildes(t))) break;  // de acá al final es bibliografía
    if (t.startsWith("##")) { seccion = t.replace(/^#+\s*/, "").replace(/\s*\[.*\]\s*$/, ""); continue; }
    if (t.startsWith("#")) continue;
    if (t.startsWith("[")) continue;            // FUENTE, DATO, TESIS, ESQUEMA
    if (t.startsWith("-")) continue;            // viñetas: fuentes o notas
    if (/^(titulo|descripcion|caratula|clima)/i.test(sinTildes(t))) continue;
    fuera.push({ texto: t, titular: /titulares/i.test(sinTildes(seccion)) });
  }
  return fuera;
};

// una variante encaja si aparece como palabra, no dentro de otra: "core " no
// puede encontrarse dentro de "correo" ni "iva " dentro de "privado"
const encaja = (plano, variante) => {
  const v = variante.trim();
  const i0 = plano.indexOf(v);
  if (i0 < 0) return false;
  let desde = 0;
  for (;;) {
    const i = plano.indexOf(v, desde);
    if (i < 0) return false;
    const antes = i === 0 ? " " : plano[i - 1];
    const despues = i + v.length >= plano.length ? " " : plano[i + v.length];
    if (!/[a-z0-9]/.test(antes) && !/[a-z0-9]/.test(despues)) return true;
    desde = i + 1;
  }
};

const archivos = fs.readdirSync(GUIONES).filter((f) => f.endsWith(".md")).sort();
const parrafos = [];
const titulares = [];
for (const f of archivos) {
  for (const p of parrafosDe(fs.readFileSync(path.join(GUIONES, f), "utf8"))) {
    const fila = { dia: f.replace(/\.md$/, ""), plano: sinTildes(p.texto), largo: p.texto.length };
    (p.titular ? titulares : parrafos).push(fila);
  }
}

const cuenta = {};
const conAlguno = new Set();
const porParrafo = parrafos.map(() => new Set());
for (const cat of CATEGORIAS) {
  for (const [nombre, variantes] of cat.terminos) {
    let n = 0;
    parrafos.forEach((p, i) => {
      if (variantes.some((v) => encaja(p.plano, v))) {
        n++; conAlguno.add(i); porParrafo[i].add(cat.clave);
      }
    });
    cuenta[nombre] = { categoria: cat.clave, parrafos: n };
  }
}

// cuántas categorías toca un párrafo: es el número que dice si el juego de
// combinar dos dibujos (organización mas hecho) tiene material o no
const mezclas = {};
porParrafo.forEach((s) => { const k = s.size; mezclas[k] = (mezclas[k] || 0) + 1; });

const total = parrafos.length;
const pc = (n) => `${((n / total) * 100).toFixed(1)}%`;

let md = `# La biblioteca: qué aparece de verdad en el informe\n\n`;
md += `Generado por \`scripts/conteo-conceptos.js\` sobre ${archivos.length} guiones `;
md += `(${archivos[0]} a ${archivos[archivos.length - 1]}), ${total} párrafos narrados.\n`;
md += `No se edita a mano: se vuelve a correr.\n\n`;
md += `Aparte quedan ${titulares.length} titulares, que también se narran pero duran\n`;
md += `cuatro segundos cada uno: ahí no cabe una imagen que dure un párrafo.\n\n`;
md += `Se cuenta **una vez por párrafo**, no por aparición: la pregunta es en `;
md += `cuántos párrafos se podría poner ese dibujo, no cuántas veces se dice la palabra.\n\n`;
md += `## Lo que importa antes de la lista\n\n`;
md += `- **${conAlguno.size} de ${total} párrafos (${pc(conAlguno.size)})** tocan al menos un concepto de esta lista.\n`;
for (const k of Object.keys(mezclas).sort((a, b) => a - b)) {
  md += `- párrafos que tocan ${k} categoría${k === "1" ? "" : "s"}: ${mezclas[k]} (${pc(mezclas[k])})\n`;
}
md += `\nEl juego de **mezclar dos dibujos** (la organización mas el hecho) solo\n`;
md += `sirve donde hay dos categorías o más. Ese número está arriba.\n`;

for (const cat of CATEGORIAS) {
  const filas = cat.terminos.map(([n, , m]) => [n, cuenta[n].parrafos, m]).sort((a, b) => b[1] - a[1]);
  md += `\n## ${cat.titulo}\n\n| concepto | párrafos | del total | motivo |\n|---|---:|---:|---|\n`;
  for (const [n, v, m] of filas) md += `| ${n} | ${v} | ${pc(v)} | ${m} |\n`;
}

const json = {
  generado: new Date().toISOString().slice(0, 10),
  guiones: archivos.length, parrafos: total, conAlguno: conAlguno.size,
  categorias: CATEGORIAS.map((c) => ({
    clave: c.clave, titulo: c.titulo,
    terminos: c.terminos.map(([n, v, motivo]) => ({ nombre: n, parrafos: cuenta[n].parrafos, motivo, variantes: v }))
      .sort((a, b) => b.parrafos - a.parrafos),
  })),
};

if (process.argv.includes("--ver")) {
  console.log(md);
} else {
  fs.writeFileSync(SALIDA_MD, md);
  fs.writeFileSync(SALIDA_JSON, JSON.stringify(json, null, 1));
  fs.writeFileSync(SALIDA_TALLER,
    "// GENERADO por scripts/conteo-conceptos.js. No se edita a mano.\n" +
    "window.CONCEPTOS = " + JSON.stringify(json) + ";\n");
  console.log(`${total} párrafos de ${archivos.length} guiones`);
  console.log(`${conAlguno.size} tocan algún concepto (${pc(conAlguno.size)})`);
  console.log(`escritos ${SALIDA_MD}, ${SALIDA_JSON} y ${SALIDA_TALLER}`);
}
