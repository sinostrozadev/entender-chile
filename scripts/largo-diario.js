#!/usr/bin/env node
/**
 * largo-diario.js - "Entender el caso": el largo por tema renderizado sobre
 * la página real del diario (src/largo-diario.tsx).
 *
 * Por qué existe (02-11-2026). El 01-11-2026 Santiago cambió el modelo del
 * canal: la Clave pasa a ser un largo por tema que explica un caso desde su
 * origen, y su escenario es el diario escrito tal como se ve en la web, con
 * zoom a la noticia del día en que salió cada hito. Este archivo es el espejo
 * de scripts/clave-mural.js para ese formato: arma el material, mide la voz,
 * genera la cama y deja las props del render.
 *
 * Decisiones, y qué las motivó:
 *
 *   LA MARCA VA EN EL GUION, no en un json aparte. El mural declaraba su
 *   material en contenido/claves/flujo/<slug>/mural.json porque salía de coser
 *   y medir paneles después del guion. Acá no hay nada que medir a mano: quien
 *   escribe la sección sabe de qué día es el hito, y una marca
 *   [DIARIO AAAA-MM-DD | slug] al lado del texto no se puede desalinear de
 *   las secciones, que fue el error que más costó con las paradas del mural.
 *
 *   LA PÁGINA SE CAPTURA LOCAL, desde web/dist (scripts/diario-captura.js), y
 *   no se baja de entender.sinodev.cl: el render corre en Actions y no puede
 *   depender de que la web publicada esté arriba ni de que muestre la misma
 *   versión que el repo.
 *
 *   EL SLUG QUE NO ESTÁ ES EL ERROR MÁS PROBABLE (el guionista lo escribe a
 *   mano), así que se informa con la lista entera de slugs de esa fecha: se
 *   corrige copiando uno, sin abrir el json.
 *
 *   EL RELOJ, LA VOZ Y LA CAMA SON LOS DEL MURAL (exportados de
 *   clave-mural.js, no copiados). Lo único propio es `escena`: lo que la
 *   cámara tarda en llegar a la noticia al abrir cada sección, que reemplaza
 *   al viaje del mural.
 *
 * Uso como módulo desde scripts/dia.js:
 *   const { materialDiario, producirDiario } = require("./largo-diario");
 * Uso directo (prueba sin Azure con --mudo):
 *   node scripts/largo-diario.js --guion <ruta.md> [--mudo] [--salida out/prueba-largo]
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { armarBloques } = require("./mural-guion");
const { parseGuion } = require("./parse");
const { slugDe, sintetizarVoz, relojDeBloques, generarCama, escribirCapitulos, MUSICA_DB, FPS } = require("./clave-mural");

const RAIZ = path.join(__dirname, "..");
const CAPTURAS = path.join(RAIZ, "out", "diario");
// Chromium no dibuja una imagen más alta que su textura máxima y no avisa:
// deja el fondo negro (lo pagó el mural el 07-10-2026 con 27.580 px).
const TEXTURA_MAX = 16384;

// LOS TIEMPOS DE LA CÁMARA, en segundos. Los lee src/largo-diario.tsx desde
// las props, así que viven en un solo lugar.
// viaje: el mismo 1,5 del mural, el zoom a la noticia o el paso entre dos
// noticias del mismo día.
const VIAJE = 1.5;
// alejar y fundido: el cambio de día. El plano general dura lo que tarda en
// teclearse una fecha de diez caracteres (0,25 + 10 x 2,2 cuadros = 1,17 s).
const PLANOS = { alejarSeg: 0.6, fundidoSeg: 0.5, generalSeg: 1.2 };

// LA PÁGINA EN TROZOS para el render (ver Pagina en src/largo-diario.tsx: la
// captura entera en un solo <img> se decodificaba en cada cuadro). SOLAPE son
// los píxeles que cada trozo repite del siguiente, para que no haya costura.
const TROZO = 1024, SOLAPE = 4;
const trocear = (fecha, origen, alto) => {
  const dir = path.join(RAIZ, "public", "diario", fecha);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const trozos = [];
  for (let y = 0; y < alto; y += TROZO) trozos.push({ png: `diario/${fecha}/${trozos.length + 1}.png`, y, alto: Math.min(TROZO + SOLAPE, alto - y) });
  // un solo ffmpeg por página: split reparte la imagen y cada rama recorta lo suyo
  const filtro = `[0]split=${trozos.length}${trozos.map((_, i) => `[e${i}]`).join("")};` +
    trozos.map((t, i) => `[e${i}]crop=iw:${t.alto}:0:${t.y}[s${i}]`).join(";");
  execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error", "-y", "-i", origen, "-filter_complex", filtro,
    ...trozos.flatMap((t, i) => ["-map", `[s${i}]`, path.join(RAIZ, "public", t.png)])], { cwd: RAIZ, stdio: "inherit" });
  return trozos;
};

const r3 = (x) => Math.round(x * 1000) / 1000;

// Qué entrada tiene cada sección. Es la misma regla que aplica el componente
// cuadro a cuadro; acá se usa para saber cuánto tiempo pedirle al reloj.
const escenaDe = (paginas, i) => {
  if (i === 0) return PLANOS.generalSeg + VIAJE;
  const a = paginas[i - 1], b = paginas[i];
  if (a.fecha !== b.fecha) return PLANOS.alejarSeg + PLANOS.fundidoSeg + PLANOS.generalSeg + VIAJE;
  const c = a.caja, d = b.caja;
  return c.x !== d.x || c.y !== d.y || c.ancho !== d.ancho || c.alto !== d.alto ? VIAJE : 0;
};

// El material de un largo sobre el diario, o null si el guion no trae marcas
// DIARIO. Misma forma de reporte que materialMural: `problemas` lista lo que
// no calza, y un largo con problemas no se rinde.
const materialDiario = (rutaGuion) => {
  const slug = slugDe(rutaGuion);
  const ruta = path.relative(RAIZ, path.resolve(rutaGuion));
  const md = fs.readFileSync(path.resolve(rutaGuion), "utf8");
  // primero el parser, que es quien sabe en qué línea está una marca mal
  // puesta; si la hay, el guion sí pidió el diario y hay que decirlo
  try { parseGuion(md); }
  catch (e) { return { slug, ruta, paginas: null, problemas: [e.message] }; }
  const { secciones } = armarBloques(md);
  if (!secciones.some((s) => s.diario)) return null;

  const problemas = [];
  // la sección sin marca hereda la anterior; las primeras sin marca toman la
  // primera que la trae, porque el video no puede abrir sin escenario
  const primera = secciones.find((s) => s.diario).diario;
  let previa = primera;
  const pedidas = secciones.map((s) => (previa = s.diario || previa));

  const fechas = [...new Set(pedidas.map((d) => d.fecha))];
  const capturas = {};
  fs.mkdirSync(path.join(RAIZ, "public", "diario"), { recursive: true });
  for (const fecha of fechas) {
    try {
      execFileSync("node", [path.join(RAIZ, "scripts", "diario-captura.js"), fecha, "--salida", CAPTURAS],
        { cwd: RAIZ, stdio: ["ignore", "inherit", "inherit"] });
    } catch (e) {
      problemas.push(`no se pudo capturar la página del ${fecha} (scripts/diario-captura.js salió con código ${e.status})`);
      continue;
    }
    const j = JSON.parse(fs.readFileSync(path.join(CAPTURAS, `${fecha}.json`), "utf8"));
    if (j.alto > TEXTURA_MAX) problemas.push(`la página del ${fecha} mide ${j.alto} px de alto, más que los ${TEXTURA_MAX} que Chromium dibuja: saldría negra`);
    fs.copyFileSync(path.join(CAPTURAS, `${fecha}.png`), path.join(RAIZ, "public", "diario", `${fecha}.png`));
    try { j.trozos = trocear(fecha, path.join(CAPTURAS, `${fecha}.png`), j.alto); }
    catch (e) { problemas.push(`no se pudo cortar en trozos la página del ${fecha}: ${e.message}`); continue; }
    capturas[fecha] = j;
  }

  const paginas = [];
  pedidas.forEach((d, i) => {
    const j = capturas[d.fecha];
    if (!j) return;
    const n = j.noticias.find((x) => x.slug === d.slug);
    if (!n) {
      problemas.push(`sección ${i + 1} ("${secciones[i].titulo}"): la noticia "${d.slug}" no está en la página del ${d.fecha}. ` +
        `Slugs de esa fecha:\n      ${j.noticias.map((x) => x.slug).join("\n      ")}`);
      return;
    }
    paginas[i] = { fecha: d.fecha, png: `diario/${d.fecha}.png`, ancho: j.ancho, alto: j.alto, caja: n.caja, trozos: j.trozos };
  });
  return { slug, ruta, paginas: problemas.length ? null : paginas, problemas };
};

const producirDiario = ({ guion, OUT, fecha, conVoz, mat }) => {
  const md = fs.readFileSync(guion, "utf8");
  const { secciones, bloques } = armarBloques(md);
  const paginas = mat.paginas;
  const dir = path.join(OUT, "largo");
  fs.mkdirSync(dir, { recursive: true });

  const voz = conVoz ? sintetizarVoz({ bloques, dir, voz: `${fecha}-largo-diario.mp3` }) : null;

  // la escena va en el primer bloque de cada sección
  const entradas = bloques.map((b, i) => (i === 0 || bloques[i - 1].parada !== b.parada ? r3(escenaDe(paginas, b.parada)) : 0));
  relojDeBloques(bloques, entradas);
  bloques.forEach((b, i) => {
    if (!entradas[i]) return;
    b.escena = entradas[i];
    // Con voz el reloj ya sumó la escena a los bloques de texto. El dato tiene
    // duración fija y sin voz el bloque dura lo estimado por palabras: en los
    // dos casos, sin sumarla, la cámara se comería el tiempo de lectura.
    if (b.tipo === "dato" || !conVoz) b.seg = r3(b.seg + entradas[i]);
  });

  const props = {
    viajeSeg: VIAJE,
    planos: PLANOS,
    paginas,
    ...(voz ? { voz, musicaDb: MUSICA_DB } : {}),
    bloques,
  };
  const rutaProps = path.join(OUT, "largo-diario.json");
  fs.writeFileSync(rutaProps, JSON.stringify(props, null, 2) + "\n");
  const tension = generarCama({ props, rutaProps, secciones });
  const rutaCap = path.join(OUT, "capitulos-largo-diario.json");
  const fr = escribirCapitulos({ bloques, secciones, rutaCap });
  console.log(`diario: ${secciones.length} secciones, ${new Set(paginas.map((p) => p.fecha)).size} páginas, ${bloques.length} bloques, ` +
    `${Math.floor(fr / FPS / 60)}m${Math.round((fr / FPS) % 60)}s${voz ? ", con voz" : ", sin voz (estimado)"}, tensión ${tension || "ninguna"}`);
  return { rutaProps, rutaCap, duracionSeg: fr / FPS };
};

module.exports = { materialDiario, producirDiario, PLANOS, VIAJE };

if (require.main === module) {
  const args = process.argv.slice(2);
  const opt = (n, d = null) => { const i = args.indexOf(n); return i > -1 && args[i + 1] ? args[i + 1] : d; };
  const guion = opt("--guion");
  if (!guion) { console.error("uso: node scripts/largo-diario.js --guion <ruta.md> [--mudo] [--salida out/prueba-largo]"); process.exit(1); }
  const conVoz = !args.includes("--mudo");
  const OUT = path.resolve(opt("--salida", path.join("out", "prueba-largo")));
  if (conVoz && !(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION)) {
    console.error("con voz hacen falta AZURE_SPEECH_KEY y AZURE_SPEECH_REGION; para probar sin Azure, --mudo");
    process.exit(1);
  }
  const mat = materialDiario(guion);
  if (!mat) { console.error(`${guion} no trae marcas [DIARIO AAAA-MM-DD | slug]: no es un largo sobre el diario`); process.exit(1); }
  if (mat.problemas.length) { console.error(`El largo de ${mat.slug} no se puede armar:\n  - ${mat.problemas.join("\n  - ")}`); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const fecha = (path.basename(guion).match(/^\d{4}-\d{2}-\d{2}/) || ["prueba"])[0];
  const { rutaProps, duracionSeg } = producirDiario({ guion, OUT, fecha, conVoz, mat });
  const video = path.join(OUT, `${path.basename(guion, ".md")}.mp4`);
  const crudo = conVoz ? video.replace(/\.mp4$/, "-sin-nivelar.mp4") : video;
  // el navegador del repo, igual que dia.js: sin la variable Remotion intenta
  // bajar el suyo y fuera de Actions no hay a dónde
  execFileSync("npx", ["remotion", "render", "LargoDiario", crudo, `--props=${rutaProps}`, "--concurrency=100%",
    ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
  ], { cwd: RAIZ, stdio: "inherit" });
  // el nivel se fija contra la voz, como en dia.js; sin voz no hay contra qué,
  // y nivelar la cama sola a -14 LUFS la subiría al volumen de una narración
  if (conVoz) {
    execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error", "-i", crudo,
      "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
      "-y", video], { cwd: RAIZ, stdio: "inherit" });
    fs.unlinkSync(crudo);
  }
  console.log(`\nListo: ${path.relative(process.cwd(), video)} (${duracionSeg.toFixed(1)} s)`);
}
