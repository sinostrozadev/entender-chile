// Cose los paneles de GPT en un mural continuo, lo mide y lo parte.
//
// Por qué existe: GPT no sabe hacer una imagen de 27.580 x 1.080 (la pide con
// razón de 25:1 y devuelve cualquier cosa), pero sí sabe hacer catorce paneles
// de 2.520 x 1.080 que se continúan, si el prompt le describe la CADENA DE
// SUPERFICIES: con qué termina cada panel es con lo que empieza el siguiente.
// El 07-10-2026 la prueba salió bien hasta en la juntura 10->11, que se pidió
// en otra conversación y calzó igual porque se le pasaron los colores medidos.
//
// Por qué el solape es por juntura y no parejo: tres junturas llegaron con una
// distancia RGB sobre 45 en las tiras de entrega, y ensanchar el cruce reparte
// ese salto en más píxeles. Lo probó la juntura 5->6 del mural de seis: pasó de
// 0,0554 a 0,0382 solo con ensanchar.
//
// Por qué parte el resultado: 27.580 px superan el tope de textura de los
// navegadores (16.384 en la mayoría) y Chromium no avisa, deja el fondo negro.
//
// sharp no es dependencia del repo. Se busca en SHARP_DIR si está, y si no
// donde node lo encuentre.
//
// uso:
//   node scripts/mural-coser.js --paneles contenido/claves/mural --salida public/claves/licencia-medica/mural14 --anchas 7,12,13

const path = require("path");
const fs = require("fs");
const sharp = require(process.env.SHARP_DIR ? path.resolve(process.env.SHARP_DIR) : "sharp");

const arg = (nombre, porDefecto) => {
  const i = process.argv.indexOf("--" + nombre);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : porDefecto;
};

const dirPaneles = arg("paneles", "contenido/claves/mural");
const salida = arg("salida", "public/claves/licencia-medica/mural");
const anchas = new Set(arg("anchas", "").split(",").filter(Boolean).map(Number));
const SOLAPE_NORMAL = Number(arg("solape", 500));
const SOLAPE_ANCHO = Number(arg("solape-ancho", 900));
const TROZOS = Number(arg("trozos", 3));

const archivos = fs.readdirSync(dirPaneles)
  .filter((f) => /^panel-\d{2}\.jpg$/.test(f)).sort()
  .map((f) => path.join(dirPaneles, f));
if (!archivos.length) { console.error("no hay paneles panel-NN.jpg en " + dirPaneles); process.exit(1); }

const solape = (s) => (anchas.has(s) ? SOLAPE_ANCHO : SOLAPE_NORMAL);

(async () => {
  const m0 = await sharp(archivos[0]).metadata();
  const ANCHO = m0.width, ALTO = m0.height, N = archivos.length;
  const offsets = [0];
  for (let i = 1; i < N; i++) offsets.push(offsets[i - 1] + ANCHO - solape(i));
  const total = offsets[N - 1] + ANCHO;
  console.log(N + " paneles de " + ANCHO + "x" + ALTO + " -> mural de " + total + " px");

  const capas = [];
  for (let i = 1; i <= N; i++) {
    const { data } = await sharp(archivos[i - 1]).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const rampa = i === 1 ? 0 : solape(i - 1);
    const rgba = Buffer.alloc(ANCHO * ALTO * 4);
    for (let y = 0; y < ALTO; y++) {
      for (let x = 0; x < ANCHO; x++) {
        const o3 = (y * ANCHO + x) * 3, o4 = (y * ANCHO + x) * 4;
        rgba[o4] = data[o3]; rgba[o4 + 1] = data[o3 + 1]; rgba[o4 + 2] = data[o3 + 2];
        // coseno levantado y no rampa recta: el cruce no deja una costura con filo
        rgba[o4 + 3] = x < rampa ? Math.round(255 * (0.5 - 0.5 * Math.cos(Math.PI * ((x + 0.5) / rampa)))) : 255;
      }
    }
    capas.push({ input: rgba, raw: { width: ANCHO, height: ALTO, channels: 4 }, left: offsets[i - 1], top: 0 });
  }

  // OJO: componer sobre un lienzo de 3 canales con capas que llevan alfa
  // devuelve RGBA, no RGB. Leerlo como 3 canales da una imagen rayada que
  // parece corrupta y manda cualquier medición al tacho. Pasó el 07-10-2026.
  const crudo = await sharp({ create: { width: total, height: ALTO, channels: 3, background: "#0b1623" } })
    .composite(capas).raw().toBuffer();
  const C = crudo.length / (total * ALTO);
  if (C !== 4 && C !== 3) throw new Error("canales inesperados: " + C);

  // medición: el paso de luz en cada juntura contra la variación propia de su
  // ventana. Un umbral fijo sin contexto exagera, porque un mural tiene luz que
  // cambia por sí sola.
  const lum = (x, y) => { const o = (y * total + x) * C; return (0.2126 * crudo[o] + 0.7152 * crudo[o + 1] + 0.0722 * crudo[o + 2]) / 255; };
  const perfil = new Float64Array(total);
  for (let x = 0; x < total; x++) { let s = 0; for (let y = 0; y < ALTO; y++) s += lum(x, y); perfil[x] = s / ALTO; }
  console.log("\njuntura  solape    paso   p90 ventana   veredicto");
  for (let s = 1; s < N; s++) {
    const centro = Math.round(offsets[s] + solape(s) / 2);
    const medias = [];
    for (let x = Math.max(0, centro - 500); x + 25 <= Math.min(total, centro + 500); x += 25) {
      let m = 0; for (let k = 0; k < 25; k++) m += perfil[x + k];
      medias.push({ x, m: m / 25 });
    }
    const pasos = medias.slice(1).map((v, i) => ({ x: v.x, d: Math.abs(v.m - medias[i].m) }));
    const enJuntura = pasos.reduce((a, b) => (Math.abs(b.x - centro) < Math.abs(a.x - centro) ? b : a)).d;
    const p90 = pasos.map((p) => p.d).sort((a, b) => a - b)[Math.floor(pasos.length * 0.9)];
    console.log(String(s).padStart(2) + "->" + String(s + 1).padStart(2) + "    " + String(solape(s)).padStart(4) +
      "  " + enJuntura.toFixed(4) + "      " + p90.toFixed(4) + "   " + (enJuntura <= Math.max(p90, 0.004) ? "invisible" : "MIRAR DE CERCA"));
  }

  fs.mkdirSync(path.dirname(salida), { recursive: true });
  const base = Math.floor(total / TROZOS);
  console.log("");
  for (let i = 0; i < TROZOS; i++) {
    const left = i * base, width = i === TROZOS - 1 ? total - left : base;
    const f = `${salida}-${i + 1}.jpg`;
    await sharp(crudo, { raw: { width: total, height: ALTO, channels: C } })
      .extract({ left, top: 0, width, height: ALTO })
      .removeAlpha().jpeg({ quality: 80, mozjpeg: true }).toFile(f);
    console.log(f, width + "x" + ALTO, (fs.statSync(f).size / 1048576).toFixed(2) + " MB");
  }
  console.log("\nanchoMural para el guion: " + total);
  console.log("offsets de panel: " + offsets.join(" "));
})();
