#!/usr/bin/env node
/**
 * dia.js - Flujo diario completo en un comando.
 *
 * Uso:
 *   node scripts/dia.js                       → guion del informe de HOY (contenido/guiones/informe/AAAA-MM-DD.md), voz simulada
 *   node scripts/dia.js --clave               → guion de Claves de HOY (contenido/guiones/claves/AAAA-MM-DD-*.md)
 *   node scripts/dia.js <ruta.md>             → un guion específico
 *   ... --voz                                 → voz real ElevenLabs (ELEVENLABS_API_KEY y VOICE_ID)
 *   ... --render                              → además renderiza el MP4
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
    const candidatos = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.startsWith(fecha) && f.endsWith(".md")) : [];
    if (!candidatos.length) {
      if (args.includes("--si-existe")) { console.log("Hoy no hay guion de Claves; nada que producir."); process.exit(0); }
      console.error(`No hay guion de Claves de hoy en ${dir}/${fecha}-*.md`);
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

console.log(`Guion: ${guion}\nSalidas: ${OUT}\n`);
console.log("── 1/4 · Parseando guion ─────────────────────────");
run("parse.js", [guion, OUT]);

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

console.log("── 4/4 · Capítulos y descripción ─────────────────");
const capitulos = capturar("chapters.js", [path.join(OUT, "timeline.json")]);
process.stdout.write(capitulos);
const parsed = JSON.parse(fs.readFileSync(path.join(OUT, "parsed.json"), "utf8"));
const descripcion = [parsed.descripcion || "", "", "Capítulos:", capitulos.trim(), "",
  "Fuentes de esta edición:", ...(parsed.fuentes || [])].join("\n");
const rutaDesc = path.join("contenido", "descripciones", `${fecha}-${etiqueta}.txt`);
fs.mkdirSync(path.dirname(rutaDesc), { recursive: true });
fs.writeFileSync(rutaDesc, descripcion);
fs.copyFileSync(path.join(OUT, "parsed.json"), path.join(OUT, `parsed-${etiqueta}.json`)); // la Clave pisa parsed.json: copia por pieza (el 30-08 el informe subió con el título de la Clave)
console.log(`\nDescripción lista para pegar: ${rutaDesc}`);

// Las tres carátulas del día. La lógica vive en scripts/miniaturas.js desde
// el 27-09-2026: el video de prueba rinde las mismas y una sola copia evita
// que las dos se separen.
miniaturas({ parsed, fecha, esClave, OUT });

const video = path.join(OUT, `${fecha}-${etiqueta}.mp4`);
if (conRender) {
  console.log("── Render ────────────────────────────────────────");
  // --concurrency=100%: el runner de Actions tiene 4 núcleos y el default de
  // remotion usaba 2; el render de un informe tardaba 55 a 105 min (ACTIONS 1).
  execFileSync("npx", ["remotion", "render", "Informe", video,
    `--props=./${path.join(OUT, "timeline.json")}`, "--concurrency=100%"], { stdio: "inherit" });
  console.log(`\nListo: ${video}`);
} else {
  console.log("\nSiguiente paso:");
  console.log("  npx remotion studio" + `  (props: ${path.join(OUT, "timeline.json")})`);
  console.log(`  node scripts/dia.js${esClave ? " --clave" : ""}${conVoz ? " --voz" : ""} --render`);
}
