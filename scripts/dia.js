#!/usr/bin/env node
/**
 * dia.js - Flujo diario completo en un comando.
 *
 * Uso:
 *   node scripts/dia.js                       → guion del informe de HOY (contenido/guiones/informe/AAAA-MM-DD.md), voz simulada
 *   node scripts/dia.js --clave               → guion de Claves de HOY (contenido/guiones/claves/AAAA-MM-DD-*.md)
 *   node scripts/dia.js <ruta.md>             → un guion específico
 *   ... --voz                                 → voz real Azure (AZURE_SPEECH_KEY y AZURE_SPEECH_REGION; respaldo KEY2/REGION2)
 *   ... --render                              → además renderiza el MP4
 *   CLAVE_FORMATO=diario|mural|clasico        → formato de la Clave (las marcas DIARIO del guion mandan salvo con clasico)
 *
 * Pasos: parse → voz → timeline → capítulos (+ descripción) → (render)
 * Salidas del día en out/AAAA-MM-DD/ y descripción lista en contenido/descripciones/.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { entornoDe } = require("./pausas.js");
const { miniaturas } = require("./miniaturas.js");

// sincronizar con lo que generó la automatización (best-effort)
try {
  require("child_process").execFileSync("git", ["pull", "--ff-only"], { stdio: "pipe" });
  console.log("git pull: repositorio actualizado.");
} catch { console.log("git pull: omitido (sin remoto o sin red)."); }

const args = process.argv.slice(2);
const conVoz = args.includes("--voz");
const conRender = args.includes("--render");
const esClave = args.includes("--clave");
const rutaExplicita = args.find((a) => !a.startsWith("--"));

// fecha local de Chile (FECHA_EDICION la fija el workflow para que un job
// que cruza la medianoche siga hablando de la misma edición)
const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date()); // AAAA-MM-DD

let guion = rutaExplicita;
if (!guion) {
  if (esClave) {
    const dir = path.join("contenido", "guiones", "claves");
    // el mismo selector que el gate: sin él, candidatos[0] podía ser el archivo
    // de prompts de carátulas ("-imagenes.md") y no el guion (21-10-2026)
    const candidatos = require("./guion-de-clave").guionesDeClave(dir, fecha);
    if (!candidatos.length) {
      if (args.includes("--si-existe")) { console.log("Hoy no hay guion de Claves; nada que producir."); process.exit(0); }
      console.error(`No hay guion de Claves de hoy en ${dir}/${fecha}-*.md`);
      process.exit(1);
    }
    if (candidatos.length > 1) {
      console.error(`Hay ${candidatos.length} guiones de Claves de hoy (${candidatos.join(", ")}): pásame la ruta del que va.`);
      process.exit(1);
    }
    guion = path.join(dir, candidatos[0]);
  } else {
    guion = path.join("contenido", "guiones", "informe", `${fecha}.md`);
  }
}
if (!fs.existsSync(guion)) {
  console.error(`No existe ${guion}. Copia el guion de la Biblioteca ahí y vuelve a correr.`);
  process.exit(1);
}

const etiqueta = esClave ? "clave" : "informe";
const OUT = path.join("out", fecha) + path.sep;
fs.mkdirSync(OUT, { recursive: true });
const run = (script, extra = [], env = {}) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { stdio: "inherit", env: { ...process.env, ...env } });
const capturar = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { encoding: "utf8" });

// EL MURAL (12-10-2026, Santiago: "cablea la Clave"). La Clave sale con el
// mural (src/clave-mural.tsx, scripts/clave-mural.js) cuando su carpeta trae
// el material, contenido/claves/flujo/<slug>/mural.json; si no, con el formato
// clásico de siempre.
// EL DIARIO (02-11-2026, "Entender el caso"): si el guion de la Clave trae
// marcas [DIARIO AAAA-MM-DD | slug], el largo sale sobre la página real del
// diario (src/largo-diario.tsx, scripts/largo-diario.js). LAS MARCAS MANDAN,
// aunque CLAVE_FORMATO diga mural: vienen de la pauta que aprobó Santiago y
// son una orden explícita, más reciente que cualquier mural.json que haya
// quedado en la carpeta del tema. El workflow fija "mural" desde el
// 12-10-2026, y con la regla anterior (el diario solo con la variable vacía)
// el formato nuevo no se habría encendido nunca en producción.
// CLAVE_FORMATO es el interruptor:
//   clasico  el formato anterior siempre, aunque haya mural o marcas, para
//            volver atrás
//   diario   exige marcas: un guion sin ellas detiene la corrida
//   (vacío) y mural, cuando el guion TRAE marcas: diario
//   (vacío) y mural, cuando NO las trae: lo de siempre. Con vacío, mural si
//            hay material y calza con el guion, si no clásico. Con mural, un
//            mural que NO calza con su guion (otra cantidad de paneles que de
//            secciones, un trozo que falta) detiene la corrida en vez de caer
//            al clásico
// Un largo con marcas que no se puede armar (una noticia que no está en su
// página, una captura que falla) SIEMPRE detiene la corrida: el guion pidió el
// diario, y un video con otro formato es una sorpresa, no un respaldo. Una
// Clave sin marcas y sin material NUNCA se cae: sale clásica, con aviso,
// porque quedarse sin video de la semana por no haber encargado el mural es
// peor que el formato viejo. Se valida acá por lo mismo que FONDO_TARJETA: un
// valor mal escrito en el workflow tiene que caerse y verse.
const FORMATO_PEDIDO = (process.env.CLAVE_FORMATO || "").trim().toLowerCase();
if (!["", "diario", "mural", "clasico"].includes(FORMATO_PEDIDO)) {
  console.error(`CLAVE_FORMATO no reconocido: "${process.env.CLAVE_FORMATO}". Valores: (vacío) | diario | mural | clasico.`);
  process.exit(1);
}
let diario = null;
if (esClave && FORMATO_PEDIDO !== "clasico") {
  const { materialDiario } = require("./largo-diario.js");
  const mat = materialDiario(guion);
  if (!mat) {
    if (FORMATO_PEDIDO === "diario") {
      console.error(`CLAVE_FORMATO=diario, pero ${guion} no trae marcas [DIARIO AAAA-MM-DD | slug].`);
      process.exit(1);
    }
  } else if (mat.problemas.length) {
    console.error(`El guion pide el diario, pero el largo de ${mat.slug} no se puede armar:\n  - ${mat.problemas.join("\n  - ")}`);
    process.exit(1);
  } else {
    diario = mat;
    console.log(`(formato de la Clave: diario, ${new Set(mat.paginas.map((p) => p.fecha)).size} páginas` +
      `${FORMATO_PEDIDO === "mural" ? "; el guion trae marcas DIARIO y mandan sobre CLAVE_FORMATO=mural" : ""})`);
  }
}
let mural = null;
if (esClave && !diario && FORMATO_PEDIDO !== "clasico" && FORMATO_PEDIDO !== "diario") {
  const { materialMural } = require("./clave-mural.js");
  const mat = materialMural(guion);
  if (!mat) {
    console.log(`(Clave sin mural: no hay contenido/claves/flujo/<slug>/mural.json; sale con el formato clásico)`);
  } else if (mat.problemas.length) {
    console.error(`El mural de ${mat.slug} no calza con su guion:\n  - ${mat.problemas.join("\n  - ")}`);
    if (FORMATO_PEDIDO === "mural") process.exit(1);
    console.warn("(se cae al formato clásico)");
  } else {
    mural = mat;
    console.log(`(formato de la Clave: mural, material en ${mat.ruta})`);
  }
}

console.log(`Guion: ${guion}\nSalidas: ${OUT}\n`);
console.log("── 1/4 · Parseando guion ─────────────────────────");
run("parse.js", [guion, OUT]);

let capitulosDe = path.join(OUT, "timeline.json");
if (diario) {
  // lo mismo que el mural, con la página del diario como escenario
  console.log("── 2-3/4 · Voz, diario y cama ────────────────────");
  if (conVoz && !(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION)) {
    console.error("--voz requiere AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (respaldo: AZURE_SPEECH_KEY2 + AZURE_SPEECH_REGION2).");
    process.exit(1);
  }
  if (!conVoz) console.log("(modo prueba: video sin voz, duraciones estimadas, cero créditos)");
  const { producirDiario } = require("./largo-diario.js");
  diario.salida = producirDiario({ guion, OUT, fecha, conVoz, mat: diario });
  capitulosDe = diario.salida.rutaCap;
} else if (mural) {
  // voz, reloj de bloques, cama y capítulos: todo sale de scripts/clave-mural.js
  console.log("── 2-3/4 · Voz, mural y cama ─────────────────────");
  if (conVoz && !(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION)) {
    console.error("--voz requiere AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (respaldo: AZURE_SPEECH_KEY2 + AZURE_SPEECH_REGION2).");
    process.exit(1);
  }
  if (!conVoz) console.log("(modo prueba: video sin voz, duraciones estimadas, cero créditos)");
  const { producirMural } = require("./clave-mural.js");
  mural.salida = producirMural({ guion, OUT, fecha, conVoz, mat: mural });
  capitulosDe = mural.salida.rutaCap;
} else {
// el formato clásico, tal cual estaba: sin reindentar a propósito, para que el
// diff muestre que no se tocó una línea del camino del informe
console.log("── 2/4 · Voz ─────────────────────────────────────");
let audio = null;
if (conVoz) {
  // Azure es la única voz de producción (26-09-2026): el respaldo cuando el F0
  // gratis se agota NO es otro proveedor, es el recurso S0 de Azure, y lo
  // resuelve tts-azure.js por dentro con AZURE_SPEECH_KEY2/REGION2. El camino
  // de ElevenLabs se retiró a archivo/scripts/tts-elevenlabs.js: tener dos
  // proveedores escondía que la cuota se acabó, que es justo lo que hay que ver.
  const proveedor =
    process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION ? "tts-azure.js"
    : null;
  if (!proveedor) {
    console.error("--voz requiere AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (respaldo: AZURE_SPEECH_KEY2 + AZURE_SPEECH_REGION2).");
    process.exit(1);
  }
  console.log(`(proveedor de voz: ${proveedor})`);
  // Las pausas de esta pieza se pasan explícitas, como las del Short y las del
  // exprés: que cada una diga cuánto calla es lo que evita que un cambio
  // pensado para el informe vuelva a llegarle sola a las otras (28-09-2026).
  run(proveedor, [path.join(OUT, "narracion.txt"), OUT], entornoDe(etiqueta));
  audio = `${fecha}-${etiqueta}.mp3`;
  fs.mkdirSync("public", { recursive: true });
  fs.copyFileSync(path.join(OUT, "narracion.mp3"), path.join("public", audio));
  console.log(`audio copiado a public/${audio}`);
} else {
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
  console.log("(modo prueba: video mudo, cero créditos)");
}

console.log("── 3/4 · Timeline ────────────────────────────────");
// Sonido del canal (decidido 27/29-08): NO hay cama musical continua; la
// música puntúa. Sello en la apertura, cortinas en los cambios de sección,
// cierre al final. Todo generado por scripts/sonido.js.
process.env.SERIE = etiqueta;
delete process.env.MUSICA; // la cama continua se retiró
const son = (f) => fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null;
const sello = son("sello.wav") || son("logo.mp3");
if (sello) process.env.LOGO = sello; else delete process.env.LOGO;
const cortinas = ["cortina-a.wav", "cortina-b.wav", "cortina-c.wav"].map(son).filter(Boolean);
if (cortinas.length) process.env.CORTINAS = cortinas.join(","); else delete process.env.CORTINAS;
const cierre = son("cierre.wav");
if (cierre) process.env.CIERRE = cierre; else delete process.env.CIERRE;
// EL FONDO DE LAS TARJETAS (27-09-2026, decisión de Santiago). El contenido
// sobre la imagen de sección está encendido en el video de prueba y apagado
// acá hasta que él lo apruebe viéndolo pasar. Cuando lo apruebe, prenderlo en
// producción es poner FONDO_TARJETA: imagen en el workflow, una línea.
//
// Se normaliza y se valida ACÁ, y no solo en build-timeline, porque un valor
// mal escrito en un workflow no puede terminar en una edición que sale al aire
// sobre papel como si nada hubiera pasado: tiene que caerse y verse.
process.env.FONDO_TARJETA = (process.env.FONDO_TARJETA || "papel").toLowerCase();
if (!["papel", "imagen"].includes(process.env.FONDO_TARJETA)) {
  console.error(`FONDO_TARJETA no reconocido: "${process.env.FONDO_TARJETA}". Valores: papel | imagen.`);
  process.exit(1);
}
if (process.env.FONDO_TARJETA !== "papel") console.log(`(fondo de tarjetas: ${process.env.FONDO_TARJETA})`);
// EL MONTAJE (27-09-2026). SECUENCIA=2409 monta el informe como se aprobó en
// el taller el 24-09: la imagen de la sección dura toda la sección y el texto
// va encima. Apagado hasta que Santiago apruebe el video de prueba. Se valida
// acá por lo mismo que FONDO_TARJETA: un valor mal escrito en el workflow no
// puede pasar en silencio y salir al aire con el montaje viejo.
process.env.SECUENCIA = (process.env.SECUENCIA || "").trim();
if (process.env.SECUENCIA && process.env.SECUENCIA !== "2409") {
  console.error(`SECUENCIA no reconocida: "${process.env.SECUENCIA}". Valores: (vacío) | 2409.`);
  process.exit(1);
}
if (process.env.SECUENCIA) console.log(`(montaje: secuencia ${process.env.SECUENCIA})`);
// EL TEXTO EN BLOQUES (12-10-2026, decisión de Santiago: el párrafo deja de
// salir entero y se releva en bloques de ocho o nueve palabras, como en la
// Clave del mural). Se valida acá por lo mismo que SECUENCIA: un "si" o un
// "true" en el workflow no puede apagarlo en silencio.
process.env.TEXTO_BLOQUES = (process.env.TEXTO_BLOQUES || "").trim();
if (process.env.TEXTO_BLOQUES && process.env.TEXTO_BLOQUES !== "1") {
  console.error(`TEXTO_BLOQUES no reconocido: "${process.env.TEXTO_BLOQUES}". Valores: (vacío) | 1.`);
  process.exit(1);
}
if (process.env.TEXTO_BLOQUES) console.log("(texto: en bloques que se relevan)");
run("build-timeline.js", [
  path.join(OUT, "parsed.json"),
  path.join(OUT, "alignment.json"),
  path.join(OUT, "timeline.json"),
  ...(audio ? [audio] : []),
]);
// EL GUARDIAN DE LOS TEXTOS SUPERPUESTOS (28-09-2026). Corre ACA, entre el
// timeline y el render, porque es el unico momento en que el aviso sirve: los
// tiempos ya son los de la voz de verdad y el video todavia no se rindio.
// Avisa y no bloquea: parar la edicion por un traspaso feo cuesta el video
// entero, y el aviso queda escrito en el log de la corrida, que es donde se
// mira cuando algo salio raro. El porque esta en scripts/validar-solapes.js.
run("validar-solapes.js", [path.join(OUT, "timeline.json")]);
}

console.log("── 4/4 · Capítulos y descripción ─────────────────");
const capitulos = capturar("chapters.js", [capitulosDe]);
process.stdout.write(capitulos);
const parsed = JSON.parse(fs.readFileSync(path.join(OUT, "parsed.json"), "utf8"));
// EL ENLACE AL INFORME COMPLETO (12-10-2026). Desde que el video del informe
// pasó a 3 o 4 minutos con tres noticias, el resto del día vive solo en la web,
// y el cierre hablado manda "al enlace de la descripción": sin esta línea esa
// frase apuntaría a nada. Va ANTES de "Capítulos:" porque podcast-subir.js
// corta ahí y el episodio también tiene que llevarlo. La URL es la misma que
// usa el feed del podcast (scripts/podcast-subir.js) y la web (web.yml).
const WEB = (process.env.WEB_URL || "https://entender.sinodev.cl").replace(/\/$/, "");
const enlaceInforme = esClave ? [] : ["", `El informe completo de hoy, con todas las noticias del día: ${WEB}/informes/${fecha}/`];
const descripcion = [parsed.descripcion || "", ...enlaceInforme, "", "Capítulos:", capitulos.trim(), "",
  "Fuentes de esta edición:", ...(parsed.fuentes || [])].join("\n");
const rutaDesc = path.join("contenido", "descripciones", `${fecha}-${etiqueta}.txt`);
fs.mkdirSync(path.dirname(rutaDesc), { recursive: true });
fs.writeFileSync(rutaDesc, descripcion);
fs.copyFileSync(path.join(OUT, "parsed.json"), path.join(OUT, `parsed-${etiqueta}.json`)); // la Clave pisa parsed.json: copia por pieza (el 30-08 el informe subió con el título de la Clave)
console.log(`\nDescripción lista para pegar: ${rutaDesc}`);

// Las tres carátulas del día. La lógica vive en scripts/miniaturas.js desde
// el 27-09-2026: el video de prueba rinde las mismas y una sola copia evita
// que las dos se separen.
miniaturas({ parsed, fecha, esClave, OUT, guion });

const video = path.join(OUT, `${fecha}-${etiqueta}.mp4`);
if (conRender) {
  console.log("── Render ────────────────────────────────────────");
  // --concurrency=100%: el runner de Actions tiene 4 núcleos y el default de
  // remotion usaba 2; el render de un informe tardaba 55 a 105 min (ACTIONS 1).
  if (mural || diario) {
    // EL NIVEL VA DESPUÉS DEL RENDER. Un video de narración se nivela contra
    // la voz, y el objetivo de YouTube es -14 LUFS con pico a -1,5: más fuerte
    // lo bajan igual, más bajo queda sonando flojo (medido el 07-10-2026, ver
    // scripts/mezclar-voz.js). Remotion mezcla pero no mide sonoridad, así que
    // el render sale aparte y el loudnorm escribe el archivo final.
    const crudo = path.join(OUT, `${fecha}-${etiqueta}-sin-nivelar.mp4`);
    // REMOTION_BROWSER_EXECUTABLE, igual que en miniaturas.js desde el 24-09:
    // sin esto Remotion intenta bajar su propio Chromium de remotion.media y el
    // render no se puede verificar fuera de Actions, que es donde sí hay red.
    // El 16-10-2026 costó una corrida entera descubrirlo. En Actions la
    // variable no existe y todo sigue igual.
    // el largo sobre el diario se nivela igual: misma voz, misma cama
    const [composicion, rutaProps] = diario
      ? ["LargoDiario", diario.salida.rutaProps]
      : ["ClaveMuralProduccion", mural.salida.rutaProps];
    execFileSync("npx", ["remotion", "render", composicion, crudo,
      `--props=./${rutaProps}`, "--concurrency=100%",
      ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
    ], { stdio: "inherit" });
    execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error", "-i", crudo,
      "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
      "-y", video], { stdio: "inherit" });
    fs.unlinkSync(crudo);
  } else {
    execFileSync("npx", ["remotion", "render", "Informe", video,
      `--props=./${path.join(OUT, "timeline.json")}`, "--concurrency=100%",
      ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
    ], { stdio: "inherit" });
  }
  console.log(`\nListo: ${video}`);
} else {
  console.log("\nSiguiente paso:");
  console.log("  npx remotion studio" + `  (props: ${path.join(OUT, "timeline.json")})`);
  console.log(`  node scripts/dia.js${esClave ? " --clave" : ""}${conVoz ? " --voz" : ""} --render`);
}
