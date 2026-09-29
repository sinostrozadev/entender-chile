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
// DOS MODOS, porque hay dos clases de imagen y lo que sirve para una arruina
// la otra:
//
//   --modo luz     (el de siempre) para dibujos de línea de un solo color: el
//                  alfa sale de la luminancia y el color se reemplaza por una
//                  tinta plana. Un trazo a medio tono queda a medio alfa.
//   --modo borde   para imágenes con color y volumen, como la que devolvió GPT
//                  el 29-09 con el atril de madera. Acá el color se CONSERVA y
//                  el fondo se encuentra desde los bordes del cuadro hacia
//                  adentro, como un balde de pintura. Es la única forma de no
//                  agujerear lo que es blanco DENTRO del motivo: el modo luz
//                  habría borrado los reflejos del metal.
//
// En modo borde el color se despega del fondo además de recortarse: un píxel
// del borde es una mezcla del motivo y del blanco, y si se deja tal cual queda
// una aureola clara que sobre el video oscuro se ve. La cuenta que la saca es
// la de siempre: color = (visto - fondo * (1 - alfa)) / alfa.
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

// LOS COLORES DEL FONDO, medidos y no supuestos: los dos más repetidos en el
// borde del cuadro, no la mediana.
//
// Son DOS y no uno por el damero (29-09-2026). Los generadores entregan a
// veces la transparencia PINTADA: un damero gris de dos tonos dibujado como
// si fuera el fondo de un editor. Con un solo color de referencia la mediana
// cae justo entre los dos grises del damero y no se parece a ninguno, así que
// el recorte dejaba la mitad de los cuadritos puestos. Con los dos modos del
// borde, el damero se va entero.
const coloresDelBorde = (plano, ancho, alto, paso, canales) => {
  const cuenta = new Map();
  const anotar = (x, y) => {
    const i = y * paso + x * canales;
    // se agrupa de a 8 niveles: un degradado suave no genera mil colores
    const k = (plano[i] >> 3) * 1024 + (plano[i + 1] >> 3) * 32 + (plano[i + 2] >> 3);
    const v = cuenta.get(k) || { n: 0, r: 0, g: 0, b: 0 };
    v.n++; v.r += plano[i]; v.g += plano[i + 1]; v.b += plano[i + 2];
    cuenta.set(k, v);
  };
  for (let x = 0; x < ancho; x++) { anotar(x, 0); anotar(x, alto - 1); }
  for (let y = 0; y < alto; y++) { anotar(0, y); anotar(ancho - 1, y); }
  const orden = [...cuenta.values()].sort((a, b) => b.n - a.n);
  const total = 2 * (ancho + alto);
  const salida = [];
  for (const v of orden) {
    const c = [Math.round(v.r / v.n), Math.round(v.g / v.n), Math.round(v.b / v.n)];
    // un color que se parece a uno ya aceptado es el mismo con otro nombre:
    // un degradado suave reparte el mismo fondo en varios cajones
    if (salida.some((f) => Math.max(Math.abs(f[0] - c[0]), Math.abs(f[1] - c[1]), Math.abs(f[2] - c[2])) <= 20)) continue;
    // el primero entra siempre; los demás solo si ocupan un pedazo real del
    // marco, para no confundir una esquina del motivo con el fondo
    if (salida.length && v.n / total < 0.04) break;
    salida.push(c);
    if (salida.length === 3) break;
  }
  return salida;
};

const recortarPorBorde = (png, plano, canales, paso, opciones) => {
  const { ancho, alto } = png;
  const duro = opciones.duro ?? 0.05;     // igual al fondo hasta acá: transparente
  const suave = opciones.suave ?? 0.20;   // de acá en adelante: motivo entero
  const fondos = coloresDelBorde(plano, ancho, alto, paso, canales);
  const fondo = fondos[0];
  // la distancia es al MÁS PARECIDO de los colores de fondo, no al primero
  const distA = (i, f) => Math.max(
    Math.abs(plano[i] - f[0]), Math.abs(plano[i + 1] - f[1]), Math.abs(plano[i + 2] - f[2])) / 255;
  const cerca = (i) => {
    let mejor = fondos[0], d = distA(i, fondos[0]);
    for (let k = 1; k < fondos.length; k++) {
      const e = distA(i, fondos[k]);
      if (e < d) { d = e; mejor = fondos[k]; }
    }
    return { d, f: mejor };
  };
  const dist = (i) => cerca(i).d;

  // el balde de pintura entra por los cuatro bordes. Se usa una pila propia y
  // no recursión: un cuadro de 1920x1080 desborda la pila de node enseguida
  const visto = new Uint8Array(ancho * alto);
  const pila = [];
  const meter = (x, y) => {
    if (x < 0 || y < 0 || x >= ancho || y >= alto) return;
    const n = y * ancho + x;
    if (visto[n]) return;
    if (dist(y * paso + x * canales) > suave) return;
    visto[n] = 1;
    pila.push(n);
  };
  for (let x = 0; x < ancho; x++) { meter(x, 0); meter(x, alto - 1); }
  for (let y = 0; y < alto; y++) { meter(0, y); meter(ancho - 1, y); }
  while (pila.length) {
    const n = pila.pop();
    const x = n % ancho, y = (n - x) / ancho;
    meter(x - 1, y); meter(x + 1, y); meter(x, y - 1); meter(x, y + 1);
  }

  const px = Buffer.alloc(ancho * alto * 4);
  let opacos = 0;
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const i = y * paso + x * canales, o = (y * ancho + x) * 4;
      let a = 1;
      let suyo = fondo;
      if (visto[y * ancho + x]) {
        const c = cerca(i);
        suyo = c.f;
        a = c.d <= duro ? 0 : (c.d - duro) / Math.max(0.001, suave - duro);
        if (a > 1) a = 1;
      }
      if (a <= 0) { px[o + 3] = 0; continue; }
      for (let k = 0; k < 3; k++) {
        // despegar del fondo: sin esto el borde se queda con la mezcla y deja
        // una aureola del color del fondo, que sobre el video oscuro se ve
        const v = a >= 0.98 ? plano[i + k] : (plano[i + k] - suyo[k] * (1 - a)) / a;
        px[o + k] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
      }
      px[o + 3] = Math.round(a * 255);
      if (a > 0.5) opacos++;
    }
  }
  return { px, opacos, fondos };
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

  // SI YA VIENE RECORTADA, NO SE TOCA (29-09-2026). Resultó que GPT sí
  // entrega PNG con canal alfa cuando se le pide: el atril del 29-09 llegó con
  // 82% del cuadro transparente y el borde ya suavizado. Volver a calcular el
  // alfa encima de eso solo puede empeorarlo, así que se copia tal cual.
  if (canales === 4 && !opciones.forzar) {
    let transparentes = 0;
    for (let y = 0; y < png.alto; y++) {
      for (let x = 0; x < png.ancho; x++) if (plano[y * paso + x * canales + 3] < 8) transparentes++;
    }
    const cuota = transparentes / (png.ancho * png.alto);
    if (cuota > 0.05) {
      const px = Buffer.alloc(png.ancho * png.alto * 4);
      let opacos = 0;
      for (let y = 0; y < png.alto; y++) {
        for (let x = 0; x < png.ancho; x++) {
          const i = y * paso + x * canales, o = (y * png.ancho + x) * 4;
          for (let k = 0; k < 4; k++) px[o + k] = plano[i + k];
          if (plano[i + 3] > 128) opacos++;
        }
      }
      fs.writeFileSync(salida, escribirRGBA(png.ancho, png.alto, px));
      return { ancho: png.ancho, alto: png.alto, estilo: "ya venía recortada",
        cubre: Number(((opacos / (png.ancho * png.alto)) * 100).toFixed(1)) };
    }
  }

  if (opciones.modo === "borde") {
    const r = recortarPorBorde(png, plano, canales, paso, opciones);
    fs.writeFileSync(salida, escribirRGBA(png.ancho, png.alto, r.px));
    return { ancho: png.ancho, alto: png.alto, estilo: "borde",
      fondo: r.fondos.map((f) => "#" + f.map((c) => c.toString(16).padStart(2, "0")).join("")).join(" y "),
      cubre: Number(((r.opacos / (png.ancho * png.alto)) * 100).toFixed(1)) };
  }

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

module.exports = { recortar, leerPNG, desfiltrar };

if (require.main === module) {
  const args = process.argv.slice(2);
  const valor = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : args[i + 1]; };
  const opciones = {
    piso: Number(valor("--piso", 0.18)), techo: Number(valor("--techo", 0.50)),
    tinta: valor("--tinta", "E8E7E1"),
    invertir: args.includes("--invertir") ? true : args.includes("--no-invertir") ? false : undefined,
    modo: valor("--modo", "luz"),
    forzar: args.includes("--forzar"),
    duro: Number(valor("--duro", 0.05)), suave: Number(valor("--suave", 0.20)),
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
    console.log(`${salida}  ${r.ancho}x${r.alto}  ${r.estilo}` +
      (r.fondo ? `  fondo ${r.fondo}` : "") + `  motivo ${r.cubre}% del cuadro`);
  }
}
