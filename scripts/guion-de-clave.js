// Cuál es el guion de la Clave de una fecha. Una sola función, usada por el gate
// y por dia.js.
//
// Por qué existe: el 21-10-2026 la Clave de la semana no se produjo. El gate
// buscaba el primer archivo de esa fecha que terminara en .md, y en la carpeta
// conviven dos: el guion y su compañero de prompts de carátulas,
// "<fecha>-<slug>-imagenes.md". En orden alfabético "-imagenes.md" va antes que
// ".md" (el guion "-" es menor que el punto), así que el gate leyó los prompts de
// carátulas como si fueran el guion, vio cero secciones y bloqueó el render
// entero. dia.js tenía la misma línea y habría tomado el mismo archivo.
//
// No se notó antes porque la Clave de licencias, la única otra con ese par, se
// produjo siempre con la ruta explícita en la mano.
//
// Si por alguna razón queda más de un guion de la misma fecha, no se elige uno
// en silencio: se devuelve la lista y quien llama decide. Elegir el primero es
// justamente lo que falló.
const fs = require("fs");
const path = require("path");

// archivos que acompañan a un guion pero no lo son
const ACOMPANANTES = /-imagenes\.md$/;

function guionesDeClave(dir, fecha) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.startsWith(fecha) && f.endsWith(".md") && !ACOMPANANTES.test(f))
    .sort();
}

module.exports = { guionesDeClave, ACOMPANANTES };
