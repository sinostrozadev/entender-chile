#!/usr/bin/env node
/**
 * imagen-entera.js - ¿este archivo de imagen está COMPLETO?
 *
 * Por qué existe (28-09-2026). La carátula de ese día llegó al repo rota: un
 * PNG de 786 KB sin su marca de cierre, con un chunk que declaraba 2 GB y solo
 * 393 KB de datos de imagen de verdad, o sea como un cuarto del alto. Nadie se
 * dio cuenta porque Chromium es tolerante: decodifica lo que puede y deja el
 * resto en blanco, así que el render no falló, simplemente salió la ilustración
 * cortada al cuarto. Fue a YouTube en la miniatura y en la portada del video.
 *
 * Santiago lo vio y preguntó si era el grano. No lo era, y la pregunta estaba
 * bien hecha: el grano vivía en la composición del video y la miniatura se
 * dibuja en otra, así que no podía tocarla. Lo que faltaba era esto, mirar el
 * archivo.
 *
 * La regla que deja: una imagen rota se trata como una imagen que NO ESTÁ. No
 * se bloquea la edición por una ilustración (eso ya está decidido desde el
 * 24-09), pero tampoco se pinta media imagen y se sube: se cae al respaldo, y
 * el pedido de reintento la vuelve a pedir sola.
 *
 * Es barato: mira la estructura del archivo, no lo decodifica.
 *   PNG  cadena de chunks hasta IEND, sin ninguno que se salga del archivo.
 *   JPG  empieza con SOI (FFD8) y termina con EOI (FFD9).
 */
const fs = require("fs");

const entera = (ruta) => {
  try {
    if (!ruta || !fs.existsSync(ruta)) return false;
    const b = fs.readFileSync(ruta);
    if (b.length < 32) return false;
    if (b.slice(0, 8).toString("hex") === "89504e470d0a1a0a") {
      let i = 8;
      while (i + 8 <= b.length) {
        const len = b.readUInt32BE(i);
        const tipo = b.slice(i + 4, i + 8).toString("ascii");
        if (i + 12 + len > b.length) return false;   // chunk que no cabe: truncado
        if (tipo === "IEND") return true;
        i += 12 + len;
      }
      return false;                                   // se acabó el archivo sin IEND
    }
    if (b[0] === 0xFF && b[1] === 0xD8) return b[b.length - 2] === 0xFF && b[b.length - 1] === 0xD9;
    return true;                                      // otro formato: no sabemos, no estorbamos
  } catch { return false; }
};

module.exports = { entera };

if (require.main === module) {
  const rutas = process.argv.slice(2);
  if (!rutas.length) { console.error("Uso: node scripts/imagen-entera.js <imagen> [imagen...]"); process.exit(2); }
  let malas = 0;
  for (const r of rutas) {
    const ok = entera(r);
    if (!ok) malas++;
    console.log(`${ok ? "completa" : "ROTA    "}  ${r}`);
  }
  process.exit(malas ? 1 : 0);
}
