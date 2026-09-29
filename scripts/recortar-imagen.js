// RECORTA UNA IMAGEN DE LA BIBLIOTECA (29-09-2026).
//
// Santiago: "le puedes pedir imágenes recortadas a gpt? Si no las puede
// entregar recortadas, las puedes recortar tú?". Sí, y este es el archivo.
//
// Qué hace: toma un dibujo de línea clara sobre fondo oscuro parejo y
// devuelve un PNG con transparencia de verdad. El fondo no se borra por
// color, se borra por LUZ: el alfa de cada píxel sale de su luminancia, así
// que un trazo a medio tono queda a medio alfa y los bordes no se dentan.
// Recortar por color (el típico "quitar el #23262A") deja una aureola porque
// el antialias del trazo es una mezcla de los dos.
//
// Por qué importa, y no es cosmética: hoy el video pone estas imágenes con
// `mixBlendMode: screen`, una máscara redonda y el contraste subido a 1,38,
// tres parches para que el fondo propio del PNG no se vea. Con el PNG
// recortado sobran los tres, el dibujo se puede poner sobre CUALQUIER cosa,
// se puede teñir del color de la sección, y dos dibujos se pueden superponer,
// que es justamente el juego de mezclar que quiere Santiago (la PDI mas la
// muerte). Sin transparencia esa mezcla no existe: un rectángulo tapa al otro.
//
// Sin dependencias: PNG a mano con zlib, que viene con node. Acepta 8 bits
// por canal, color 2 (RGB) o 6 (RGBA), sin entrelazar, que es lo que entregan
// los generadores.
//
// Uso:  node scripts/recortar-imagen.js entrada.png salida.png [--piso 0.10]
//                                       [--techo 0.45] [--tinta E8E7E1]
//       node scripts/recortar-imagen.js --carpeta contenido/biblioteca/pruebas
//       ... y --invertir para el estilo papel, donde el dibujo es lo oscuro
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const leerPNG = (buf) => {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("no es PNG");
  let off = 8, ihdr = null;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const tipo = buf.slice(off + 4, off + 8).toString("latin1");
    const datos = buf.slice(off + 8, off + 8 + len);
    if (tipo === "IHDR") {
      ihdr = { ancho: datos.readUInt32BE(0), alto: datos.readUInt32BE(4),
        bits: datos[8], color: datos[9], entrelazado: datos[12] };
    } else if (tipo === "IDAT") idat.push(datos);
    else if (tipo === "IEND") break;
    off += 12 + len;
  }
  if (!ihdr) throw new Error("sin IHDR");
  if (ihdr.bits !== 8) throw new Error(`solo 8 bits por canal, este tiene ${ihdr.bits}`);
  if (ihdr.entrelazado) throw new Error("entrelazado: no soportado");
  if (ihdr.color !== 2 && ihdr.color !== 6) throw new Error(`color ${ihdr.color}: solo RGB o RGBA`);
  return { ...ihdr, crudo: zlib.inflateSync(Buffer.concat(idat)) };
};

// deshace los filtros de cada fila. Es la parte que no se puede saltar: sin
// esto los bytes que uno lee no son colores, son diferencias contra el vecino
const desfiltrar = ({ ancho, alto, color, crudo }) => {
  const canales = color === 6 ? 4 : 3;
  const paso = ancho * canales;
  const salida = Buffer.alloc(alto * paso);
  let orig = 0;
  for (let y = 0; y < alto; y++) {
    const filtro = crudo[orig++];
    const fila = crudo.slice(orig, orig + paso); orig += paso;
    const destino = y * paso;
    for (let x = 0; x < paso; x++) {
      const a = x >= canales ? salida[destino + x - canales] : 0;
      const b = y > 0 ? salida[destino - paso + x] : 0;
      const c = x >= canales && y > 0 ? salida[destino - paso + x - canales] : 0;
      let v = fila[x];
      if (filtro === 1) v += a;
      else if (filtro === 2) v += b;
      else if (filtro === 3) v += (a + b) >> 1;
      else if (filtro === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else if (filtro !== 0) throw new Error(`filtro ${filtro} desconocido`);
      salida[destino + x] = v & 0xff;
    }
  }
  return { canales, paso, salida };
};

const crc32 = (() => {
  const tabla = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tabla[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = tabla[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

const trozo = (tipo, datos) => {
  const largo = Buffer.alloc(4); largo.writeUInt32BE(datos.length);
  const cuerpo = Buffer.concat([Buffer.from(tipo, "latin1"), datos]);
  const suma = Buffer.alloc(4); suma.writeUInt32BE(crc32(cuerpo));
  return Buffer.concat([largo, cuerpo, suma]);
};

const escribirRGBA = (ancho, alto, pixeles) => {
  const paso = ancho * 4;
  const conFiltro = Buffer.alloc(alto * (paso + 1));
  for (let y = 0; y < alto; y++) {
    conFiltro[y * (paso + 1)] = 0;                       // filtro None
    pixeles.copy(conFiltro, y * (paso + 1) + 1, y * paso, (y + 1) * paso);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(ancho, 0); ihdr.writeUInt32BE(alto, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    trozo("IHDR", ihdr),
    trozo("IDAT", zlib.deflateSync(conFiltro, { level: 9 })),
    trozo("IEND", Buffer.alloc(0)),
  ]);
};

const recortar = (entrada, salida, opciones = {}) => {
  // PISO 0,18 Y NO 0,10, medido: el fondo de los PNG generados no es parejo,
  // trae una viñeta muy suave, y con el piso bajo esa viñeta sobrevivía como
  // un velo claro encima del fondo nuevo. Se ve al tiro poniendo la imagen
  // sobre bandas de colores, que es como conviene revisar cualquier recorte.
  const piso = opciones.piso ?? 0.18;      // debajo de esto es fondo puro
  const techo = opciones.techo ?? 0.50;    // arriba de esto es trazo puro
  const tinta = opciones.tinta ?? "E8E7E1";
  const [tr, tg, tb] = [0, 2, 4].map((i) => parseInt(tinta.slice(i, i + 2), 16));

  const png = leerPNG(fs.readFileSync(entrada));
  const { canales, paso, salida: plano } = desfiltrar(png);

  // OSCURO O PAPEL, sin que nadie lo diga: se mira el borde del cuadro, que
  // siempre es fondo. Si el borde es claro, el dibujo es lo oscuro y el alfa
  // se lee al revés. Así la misma carpeta puede traer los dos estilos.
  let suma = 0, n = 0;
  for (let x = 0; x < png.ancho; x += 3) {
    for (const y of [0, png.alto - 1]) {
      const i = y * paso + x * canales;
      suma += (0.2126 * plano[i] + 0.7152 * plano[i + 1] + 0.0722 * plano[i + 2]) / 255; n++;
    }
  }
  const bordeClaro = suma / Math.max(1, n) > 0.5;
  const invertir = opciones.invertir === undefined ? bordeClaro : opciones.invertir;
  const px = Buffer.alloc(png.ancho * png.alto * 4);
  let opacos = 0;
  for (let y = 0; y < png.alto; y++) {
    for (let x = 0; x < png.ancho; x++) {
      const i = y * paso + x * canales, o = (y * png.ancho + x) * 4;
      // luminancia perceptual: el ojo ve el verde mucho más que el azul, y
      // estos dibujos son grises, así que cualquier otra fórmula da lo mismo
      const bruto = (0.2126 * plano[i] + 0.7152 * plano[i + 1] + 0.0722 * plano[i + 2]) / 255;
      // en el estilo papel el dibujo es lo OSCURO y el fondo lo claro, así que
      // el alfa se lee al revés. Es la misma cuenta, invertida.
      const luz = invertir ? 1 - bruto : bruto;
      let a = (luz - piso) / (techo - piso);
      a = a < 0 ? 0 : a > 1 ? 1 : a;
      px[o] = tr; px[o + 1] = tg; px[o + 2] = tb; px[o + 3] = Math.round(a * 255);
      if (a > 0.5) opacos++;
    }
  }
  fs.writeFileSync(salida, escribirRGBA(png.ancho, png.alto, px));
  const cubre = (opacos / (png.ancho * png.alto)) * 100;
  return { ancho: png.ancho, alto: png.alto, cubre: Number(cubre.toFixed(1)),
    estilo: invertir ? "papel" : "oscuro" };
};

module.exports = { recortar };

if (require.main === module) {
  const args = process.argv.slice(2);
  const valor = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : args[i + 1]; };
  const opciones = {
    piso: Number(valor("--piso", 0.18)), techo: Number(valor("--techo", 0.50)),
    tinta: valor("--tinta", "E8E7E1"),
    invertir: args.includes("--invertir") ? true : args.includes("--no-invertir") ? false : undefined,
  };
  const carpeta = valor("--carpeta", null);
  if (carpeta) {
    const destino = path.join(path.dirname(carpeta), path.basename(carpeta) + "-recortadas");
    fs.mkdirSync(destino, { recursive: true });
    for (const f of fs.readdirSync(carpeta).filter((n) => n.endsWith(".png"))) {
      const r = recortar(path.join(carpeta, f), path.join(destino, f), opciones);
      console.log(`${f}  ${r.ancho}x${r.alto}  ${r.estilo}  trazo ${r.cubre}% del cuadro`);
    }
    console.log(`en ${destino}`);
  } else {
    const [entrada, salida] = args.filter((a) => !a.startsWith("--") && !/^[\d.]+$/.test(a) && a !== opciones.tinta);
    if (!entrada || !salida) { console.error("uso: node scripts/recortar-imagen.js entrada.png salida.png"); process.exit(1); }
    const r = recortar(entrada, salida, opciones);
    console.log(`${salida}  ${r.ancho}x${r.alto}  trazo ${r.cubre}% del cuadro`);
  }
}
