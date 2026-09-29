// LA PUERTA DE LA BIBLIOTECA (29-09-2026).
//
// Santiago, después de tres pruebas de gobierno: "por lo que veo los prompt
// aunque sean específicos no garantizan el resultado. O habrá que ser mucho
// más específico y abarcar todas las aristas desde antes?".
//
// La respuesta, medida sobre esas tres: el prompt pasó de 10 líneas a 45 y los
// defectos no bajaron, se MUDARON. Primero el color, después la bandera,
// después el damero pintado y los edificios vecinos. Un prompt inclina la
// moneda, no la fija, y alargarlo tiene rendimiento decreciente: a partir de
// cierto punto el generador empieza a soltar instrucciones del medio.
//
// Entonces el trabajo no está solo antes. Está repartido en dos:
//
//   el PROMPT       dice lo que es sistemático y se reusa: el estilo, las
//                   reglas del canal, el formato. Se escribe una vez.
//   esta PUERTA     mide lo que se puede medir, cada vez y sin opinión. Lo que
//                   se puede medir es más de lo que parece, y es justo donde
//                   fallaron las tres pruebas.
//
// Lo que esta puerta NO hace, y hay que decirlo: no sabe si el dibujo es La
// Moneda, si se entiende el concepto ni si la imagen es buena. Eso lo miran
// ojos. Lo que hace es que los ojos no se gasten en revisar si el archivo
// tiene canal alfa.
//
// CADA ESTILO SE MIDE CON SU VARA, porque piden cosas distintas: al Grabado se
// le exige canal alfa y aire en los bordes, al Oscuro se le exige justo lo
// contrario (su fondo llena el cuadro), y a un Fondo no se le puede exigir poca
// saturación porque el del canal es verde. Sin perfiles la puerta reprobaría a
// las imágenes que sí están bien.
//
// Uso:  node scripts/revisar-imagen.js imagen.png [--estilo grabado]
//       node scripts/revisar-imagen.js carpeta/ --estilo grabado
//       estilos: grabado (el que rige), oscuro, papel, fondo
const fs = require("fs");
const path = require("path");
const { leerPNG, desfiltrar } = require("./recortar-imagen.js");

const LIMITES = {
  transparencia: 3,     // % mínimo del cuadro que tiene que ser transparente
  calido: 12,           // |R menos B| medio: el hueso es casi neutro
  vivos: 0.05,          // % de píxeles de color vivo tolerado
  borde: 2,             // % de píxeles opacos tolerado en el marco de 8 px
  anchoMin: 1200,
  // NO SE EXIGE 16:9 (29-09-2026). Lo que importa no es la proporción del
  // archivo sino que el dibujo quepa en su mitad de pantalla sin quedar
  // diminuto. La Moneda llegó en 2000x750, que es 2,67 a 1: cabe, pero se ve
  // como una franja. Más allá de 2 a 1 el motivo ya no se lee.
  proporcionMax: 2.0,
  proporcionMin: 0.7,
  contraste: 34,        // desviación de luminancia tolerada en un fondo
};

// el tope de saturación también es por estilo, y no por gusto: el fondo del
// estilo Oscuro es #23262A, un gris AZULADO, y ese color por sí solo ya mide
// 0,167 de saturación. Con el tope del Grabado reprobaría a una imagen perfecta
// por el color que el propio estilo le manda tener.
const PERFILES = {
  grabado: { nombre: "Grabado", satMax: 0.12, incluye: ["canal alfa", "sin damero pintado",
    "una sola tinta", "tinta fría", "sin color vivo", "aire en los bordes", "medidas"] },
  oscuro: { nombre: "Oscuro", satMax: 0.20, incluye: ["sin transparencia", "sin damero pintado",
    "una sola tinta", "tinta fría", "sin color vivo", "medidas"] },
  papel: { nombre: "Papel", satMax: 0.12, incluye: ["sin transparencia", "sin damero pintado",
    "una sola tinta", "sin color vivo", "medidas"] },
  fondo: { nombre: "Fondo", satMax: 1, incluye: ["sin transparencia", "sin damero pintado",
    "sin color vivo", "contraste bajo", "medidas"] },
};

const analizar = (archivo, opciones = {}) => {
  const png = leerPNG(fs.readFileSync(archivo));
  const { canales, paso, salida: plano } = desfiltrar(png);
  const { ancho, alto } = png;
  const alfa = (i) => (canales === 4 ? plano[i + 3] : 255);

  let transp = 0, op = 0, sumSat = 0, sumRB = 0, vivos = 0, bordeOp = 0, bordeTot = 0;
  let sumLum = 0, sumLum2 = 0;
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const i = y * paso + x * canales;
      const a = alfa(i);
      const enBorde = x < 8 || y < 8 || x >= ancho - 8 || y >= alto - 8;
      if (enBorde) { bordeTot++; if (a > 128) bordeOp++; }
      if (a < 8) { transp++; continue; }
      if (a < 200) continue;
      op++;
      const r = plano[i], g = plano[i + 1], b = plano[i + 2];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx === 0 ? 0 : (mx - mn) / mx;
      sumSat += sat; sumRB += r - b;
      if (sat > 0.5 && mx > 90) vivos++;
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sumLum += lum; sumLum2 += lum * lum;
    }
  }

  // EL DAMERO PINTADO: se mira la franja de arriba, que es donde un fondo
  // dibujado siempre está entero. Si dos grises casi iguales de claridad se
  // reparten la franja y se alternan en tramos parejos, es un damero.
  const franja = [];
  for (let y = 0; y < Math.min(40, alto); y++) {
    for (let x = 0; x < ancho; x++) {
      const i = y * paso + x * canales;
      if (alfa(i) < 200) continue;
      franja.push(plano[i]);
    }
  }
  let damero = false, tramo = 0;
  if (franja.length > ancho) {
    // los cajones van de a 16 niveles y no de a 8: los cuadros del damero
    // traen antialias en sus cantos y con cajones finos el mismo gris se
    // reparte en dos, que fue lo que hizo que la primera versión no lo viera
    const cuenta = new Map();
    franja.forEach((v) => { const k = v >> 4; cuenta.set(k, (cuenta.get(k) || 0) + 1); });
    const top = [...cuenta.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
    if (top.length === 2) {
      const cubre = (top[0][1] + top[1][1]) / franja.length;
      const sep = Math.abs(top[0][0] - top[1][0]) * 16;
      if (cubre > 0.5 && sep > 30) {
        // ¿se alternan en tramos parejos a lo largo de una fila?
        const y = Math.min(6, alto - 1);
        let cambios = 0, previo = null;
        for (let x = 0; x < ancho; x++) {
          const i = y * paso + x * canales;
          if (alfa(i) < 200) continue;
          const cual = Math.abs((plano[i] >> 4) - top[0][0]) < Math.abs((plano[i] >> 4) - top[1][0]) ? 0 : 1;
          if (previo !== null && cual !== previo) cambios++;
          previo = cual;
        }
        tramo = cambios ? Math.round(ancho / cambios) : 0;
        if (cambios > 8 && tramo >= 3 && tramo <= 80) damero = true;
      }
    }
  }

  const pc = (n, de) => Number(((n / Math.max(1, de)) * 100).toFixed(2));
  return {
    archivo: path.basename(archivo), ancho, alto, conAlfa: canales === 4,
    transparencia: pc(transp, ancho * alto),
    saturacion: Number((sumSat / Math.max(1, op)).toFixed(3)),
    calido: Math.round(sumRB / Math.max(1, op)),
    vivos: pc(vivos, op),
    borde: pc(bordeOp, bordeTot),
    damero, tramo,
    contraste: Number(Math.sqrt(Math.max(0, sumLum2 / Math.max(1, op) - (sumLum / Math.max(1, op)) ** 2)).toFixed(1)),
  };
};

const revisar = (archivo, opciones = {}) => {
  const m = analizar(archivo, opciones);
  const perfil = PERFILES[opciones.estilo || "grabado"] || PERFILES.grabado;
  const pruebas = [];
  const anota = (nombre, bien, dice) => {
    if (!perfil.incluye.includes(nombre)) return;
    pruebas.push({ nombre, bien, dice });
  };

  anota("canal alfa", m.conAlfa && m.transparencia >= LIMITES.transparencia,
    m.conAlfa ? `${m.transparencia}% transparente` : "el PNG no tiene canal alfa");
  anota("sin transparencia", !m.conAlfa || m.transparencia < 1,
    m.transparencia >= 1 ? `${m.transparencia}% transparente, y este estilo lleva fondo` : "opaca, como corresponde");
  anota("sin damero pintado", !m.damero,
    m.damero ? `damero de ${m.tramo} px dibujado en el fondo` : "limpio");
  anota("una sola tinta", m.saturacion <= perfil.satMax,
    `saturación media ${m.saturacion} (tope ${perfil.satMax})`);
  anota("tinta fría", Math.abs(m.calido) <= LIMITES.calido,
    `${m.calido > 0 ? "cálida" : "fría"} en ${Math.abs(m.calido)} puntos de rojo menos azul`);
  anota("sin color vivo", m.vivos <= LIMITES.vivos, `${m.vivos}% de píxeles de color vivo`);
  anota("aire en los bordes", m.borde <= LIMITES.borde, `${m.borde}% del marco está pintado`);
  // un fondo vive DEBAJO del texto: lo que se le exige no es poco color sino
  // poco contraste, porque lo que estorba a una línea de texto es el salto de
  // claridad, no el matiz
  anota("contraste bajo", m.contraste <= LIMITES.contraste,
    `desviación de luminancia ${m.contraste}`);
  const prop = m.ancho / m.alto;
  anota("medidas", m.ancho >= LIMITES.anchoMin && prop <= LIMITES.proporcionMax && prop >= LIMITES.proporcionMin,
    `${m.ancho}x${m.alto}, proporción ${prop.toFixed(2)} a 1` +
    (prop > LIMITES.proporcionMax ? " (muy apaisada: va a verse como una franja)" : ""));

  return { medidas: m, pruebas, estilo: perfil.nombre, pasa: pruebas.every((p) => p.bien) };
};

module.exports = { revisar, analizar, LIMITES, PERFILES };

if (require.main === module) {
  const todos = process.argv.slice(2);
  const iEstilo = todos.indexOf("--estilo");
  const estilo = iEstilo >= 0 ? todos[iEstilo + 1] : "grabado";
  if (!PERFILES[estilo]) {
    console.error(`estilo no reconocido: "${estilo}". Son: ${Object.keys(PERFILES).join(", ")}`);
    process.exit(1);
  }
  const args = todos.filter((a, i) => !a.startsWith("--") && i !== iEstilo + 1);
  const objetivo = args[0];
  if (!objetivo) { console.error("uso: node scripts/revisar-imagen.js <imagen.png | carpeta>"); process.exit(1); }
  const lista = fs.statSync(objetivo).isDirectory()
    ? fs.readdirSync(objetivo).filter((f) => f.toLowerCase().endsWith(".png")).map((f) => path.join(objetivo, f))
    : [objetivo];
  let fallaron = 0;
  for (const archivo of lista) {
    let r;
    try { r = revisar(archivo, { estilo }); } catch (e) {
      console.log(`\n${path.basename(archivo)}\n  NO SE PUDO LEER: ${e.message}`);
      fallaron++; continue;
    }
    console.log(`\n${r.medidas.archivo}   ${r.pasa ? "PASA" : "NO PASA"}   (vara: ${r.estilo})`);
    r.pruebas.forEach((p) => console.log(`  ${p.bien ? "ok  " : "FALLA"} ${p.nombre.padEnd(20)} ${p.dice}`));
    if (!r.pasa) fallaron++;
  }
  if (lista.length > 1) console.log(`\n${lista.length - fallaron} de ${lista.length} pasan la puerta.`);
  process.exit(fallaron ? 1 : 0);
}
