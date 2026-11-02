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

// ¿Sirve como carátula del informe? (01-11-2026). entera() deja pasar lo que
// no reconoce ("otro formato: no sabemos"), y eso dejó pasar el 31-10 un
// archivo .png de 2 MB que no era una imagen: sin firma PNG, bytes al azar. El
// render de la miniatura falló y el release salió sin miniatura.png. Y el
// 01-11 llegó un PNG truncado en 786.445 bytes (lo mismo que el 28-09), que
// miniaturas.js no revisaba: YouTube recibió una franja de ilustración arriba
// y el resto negro. Para una carátula la regla es más estricta que entera():
// tiene que ser PNG, JPEG o WebP reconocible, completa y horizontal 16:9 (con
// 2 % de tolerancia), porque MiniaturaV5 la estira a 1280x720 y otra
// proporción la deforma o la recorta. Devuelve el motivo para el log.
const dimensiones = (b) => {
  if (b.slice(0, 8).toString("hex") === "89504e470d0a1a0a") return { formato: "png", ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) };
  if (b[0] === 0xFF && b[1] === 0xD8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xFF) { i++; continue; }
      const m = b[i + 1];
      // SOF0 a SOF15, salvo DHT (C4), JPG (C8) y DAC (CC): ahí vienen alto y ancho
      if (m >= 0xC0 && m <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(m)) return { formato: "jpeg", alto: b.readUInt16BE(i + 5), ancho: b.readUInt16BE(i + 7) };
      if (m === 0xD8 || m === 0x01 || (m >= 0xD0 && m <= 0xD7)) { i += 2; continue; }
      i += 2 + b.readUInt16BE(i + 2);
    }
    return { formato: "jpeg", ancho: 0, alto: 0 };
  }
  if (b.slice(0, 4).toString("ascii") === "RIFF" && b.slice(8, 12).toString("ascii") === "WEBP") {
    const tipo = b.slice(12, 16).toString("ascii");
    if (tipo === "VP8X") return { formato: "webp", ancho: 1 + b.readUIntLE(24, 3), alto: 1 + b.readUIntLE(27, 3) };
    if (tipo === "VP8 ") return { formato: "webp", ancho: b.readUInt16LE(26) & 0x3FFF, alto: b.readUInt16LE(28) & 0x3FFF };
    if (tipo === "VP8L") { const v = b.readUInt32LE(21); return { formato: "webp", ancho: 1 + (v & 0x3FFF), alto: 1 + ((v >> 14) & 0x3FFF) }; }
  }
  return null;
};

const caratulaUsable = (ruta) => {
  try {
    if (!ruta || !fs.existsSync(ruta)) return { ok: false, motivo: "no existe" };
    const b = fs.readFileSync(ruta);
    const d = b.length >= 32 ? dimensiones(b) : null;
    if (!d) return { ok: false, motivo: "no es una imagen PNG, JPEG ni WebP (la cabecera no calza)" };
    if (!entera(ruta)) return { ok: false, motivo: `${d.formato.toUpperCase()} incompleto (truncado, sin su cierre)` };
    if (!d.ancho || !d.alto) return { ok: false, motivo: "no se pudo leer su tamaño" };
    const r = d.ancho / d.alto;
    if (Math.abs(r / (16 / 9) - 1) > 0.02) return { ok: false, motivo: `${d.ancho}x${d.alto} no es 16:9 (proporción ${r.toFixed(3)})` };
    return { ok: true, motivo: `${d.formato.toUpperCase()} ${d.ancho}x${d.alto}` };
  } catch (e) { return { ok: false, motivo: e.message }; }
};

module.exports = { entera, caratulaUsable };

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
