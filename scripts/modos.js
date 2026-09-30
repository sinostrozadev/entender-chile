// COPIA LOS MODOS AL TALLER (30-09-2026).
//
// La fuente de verdad es contenido/config/modos.json, que lee el video al
// compilar. El taller vive en claude.ai y no puede leer el repositorio, así que
// el dato viaja como archivo publicado al lado de su página, igual que
// conceptos.js. Es una copia y no una segunda fuente: si alguien edita
// taller/modos.js a mano, el próximo cambio real lo pisa.
//
// Uso:  node scripts/modos.js
const fs = require("fs");
const path = require("path");

const ORIGEN = path.join("contenido", "config", "modos.json");
const SALIDA = path.join("taller", "modos.js");

const datos = JSON.parse(fs.readFileSync(ORIGEN, "utf8"));
fs.writeFileSync(SALIDA,
  "// GENERADO por scripts/modos.js desde contenido/config/modos.json. No se edita a mano.\n" +
  "window.MODOS = " + JSON.stringify(datos) + ";\n");

const enProduccion = datos.modos.filter((m) => m.enProduccion).length;
console.log(`${datos.modos.length} modos (${enProduccion} alcanzables desde producción) escritos en ${SALIDA}`);
