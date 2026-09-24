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
const run = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { stdio: "inherit" });
const capturar = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { encoding: "utf8" });

console.log(`Guion: ${guion}\nSalidas: ${OUT}\n`);
console.log("── 1/4 · Parseando guion ─────────────────────────");
run("parse.js", [guion, OUT]);

console.log("── 2/4 · Voz ─────────────────────────────────────");
let audio = null;
if (conVoz) {
  // proveedor según qué secrets existan: Azure primero (gratis, voz chilena),
  // ElevenLabs si algún día vuelve (clonación)
  const proveedor =
    process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION ? "tts-azure.js"
    : process.env.ELEVENLABS_API_KEY && process.env.VOICE_ID ? "tts-elevenlabs.js"
    : null;
  if (!proveedor) {
    console.error("--voz requiere AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (o ELEVENLABS_API_KEY + VOICE_ID).");
    process.exit(1);
  }
  console.log(`(proveedor de voz: ${proveedor})`);
  run(proveedor, [path.join(OUT, "narracion.txt"), OUT]);
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
run("build-timeline.js", [
  path.join(OUT, "parsed.json"),
  path.join(OUT, "alignment.json"),
  path.join(OUT, "timeline.json"),
  ...(audio ? [audio] : []),
]);

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

// Miniatura (1280x720, src/marca.tsx): la cifra principal del día + el título.
// Cifra = el primer [DATO] que eligió el guion (no los automáticos). No bloquea.
{
  // Un número pelado y chico no sirve de cifra grande: el 20-09 la portada
  // habría salido con un "1" gigante y la etiqueta "votos de apoyo", que a
  // tamaño de carátula no dice nada. Si no trae unidad ni símbolo y es menor
  // que diez, se prefiere no poner cifra: la V4 se ve bien sin ella.
  const cifraSirve = (v) => {
    if (!v || !v.raw) return false;
    const t = String(v.raw).trim();
    if (!/[%$€a-zA-Z]/.test(t) && Number(t.replace(/[.,]/g, "")) < 10) return false;
    return true;
  };

  // La cifra debe ser LA DE LA PORTADA, no la primera del guion: el 30-08
  // salió "114 votos" junto al titular del Andalién.
  // CORREGIDO EL 24-09: mirar solo el primer bloque dejaba la cifra vacía casi
  // siempre, y con ella la cifra grande de la carátula V4, que es su elemento
  // más fuerte. El motivo: "La noticia del día" es un bloque de resumen y casi
  // nunca lleva [DATO]; el dato vive en el bloque siguiente, que desarrolla esa
  // misma noticia (el 23-09: "La noticia del día" era la lluvia y los 105 mm
  // estaban en "Sistema frontal"). Ahora se miran los DOS primeros bloques con
  // tesis y ahí se corta, que es lo que la guarda original quería proteger.
  let seccion = "", dato = null, bloques = [];
  for (const e of parsed.eventos) {
    if (e.tipo === "seccion") { seccion = e.texto; continue; }
    if (/apertura/i.test(seccion)) continue;
    if (e.tipo === "tesis" && !bloques.includes(seccion)) bloques.push(seccion);
    if (bloques.length && !bloques.includes(seccion)) break;   // ya pasamos a un tercer bloque
    if (bloques.length > 2) break;                              // dos bloques bastan
    if (!dato && e.tipo === "dato" && !e.automatico && e.series?.length && cifraSirve(e.series[0])) dato = { ...e, seccion };
  }
  const bloquePortada = bloques[0] || null;
  // extractos: las tesis de los dos bloques siguientes, como textura desvanecida
  const tesis = [];
  {
    let sec = "", vistos = new Set();
    for (const e of parsed.eventos) {
      if (e.tipo === "seccion") { sec = e.texto; continue; }
      if (/apertura|cierre|agenda|dato curioso|en titulares/i.test(sec)) continue;
      if (e.tipo === "tesis" && !vistos.has(sec)) { vistos.add(sec); tesis.push(e.texto); }
    }
  }
  // Carátula v3 (20-09, decisión de Santiago sobre el tablero: "me gusta, y
  // cobre y tinta"): dos líneas en mayúsculas sobre cajas, la lámina del tema
  // sin velo. El guionista escribe TRES carátulas ("Carátula sugerida:",
  // "Carátula 2:", "Carátula 3:"), cada una "línea 1 / línea 2" con hasta
  // cuatro palabras por línea. La primera sale al aire (miniatura.png); las
  // otras dos se renderizan aparte (miniatura-2.png, miniatura-3.png) y van al
  // release para la prueba A/B de YouTube Studio. La Clave sigue en la V2 con
  // su verde de serie: tiene flujo propio y su carátula se decide allá.
  const { imagenDe } = require("./imagenes-secciones");
  const recortar = (t) => (t.length <= 64 ? t : t.slice(0, 64).replace(/\s+\S*$/, "") + "…");
  const dosLineas = (g) => {
    const partes = g.split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean);
    if (partes.length >= 2) return [partes[0], partes.slice(1).join(" ")];
    const w = g.split(/\s+/); // sin " / ": se parte al medio, o queda en una línea si es corta
    if (w.length <= 4) return [g, ""];
    const m = Math.ceil(w.length / 2);
    return [w.slice(0, m).join(" "), w.slice(m).join(" ")];
  };
  // la categoría la DECLARA el guion en el encabezado del bloque
  // ("## Sistema frontal [clima]"); el texto queda de respaldo para guiones
  // viejos, que es lo que fallaba el 59% de las veces (medido el 24-09)
  const catPortada = (parsed.eventos.find((e) => e.tipo === "seccion" && e.texto === bloquePortada) || {}).categoria || null;
  const img = esClave ? null : imagenDe(`${bloquePortada || ""} ${parsed.titulo || ""}`, catPortada);
  const imagen = img ? `fondos/seccion-${img}.jpg` : esClave ? "fondos/fondo-clave-vertical.png" : "fondos/seccion-regiones.jpg";
  const fechaVisible = fecha.split("-").reverse().join("-");
  // REMOTION_BROWSER_EXECUTABLE deja probar las carátulas sin que Remotion
  // baje su propio Chromium, que es lo que impedía verificarlas fuera de
  // Actions (24-09). En Actions la variable no existe y todo sigue igual.
  const still = (comp, props, salida) => execFileSync("npx", ["remotion", "still", "src/marca.tsx", comp, salida,
    ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
    `--props=${JSON.stringify(props)}`], { stdio: "ignore" });
  if (esClave) {
    const gancho = (parsed.caratula || "").trim() || recortar(parsed.titulo || "");
    const mini = path.join(OUT, "miniatura-clave.png");
    try {
      still("MiniaturaV2", { gancho, cifra: "", fecha: "", imagen, modo: "velo-seccion", seccion: bloquePortada || "", serie: "clave" }, mini);
      console.log(`Miniatura de la Clave: ${mini} (gancho: "${gancho}")`);
    } catch (e) { console.log(`(miniatura no generada: ${e.message.split("\n")[0]})`); }
  } else {
    // TRES DISEÑOS, UN MISMO GANCHO (23-09, decisión de Santiago: "deja 3
    // opciones, 1 la idea tuya, 2 la idea que ya está hoy y 3 la imagen
    // pedida a gpt"). Antes las tres eran el MISMO diseño con tres ganchos
    // distintos, para la prueba A/B de textos; esa prueba queda en pausa
    // hasta que se decida el diseño, porque comparar dos cosas a la vez no
    // enseña nada.
    //   miniatura.png   = V5, la ilustración de GPT (la que sale al aire desde
    //                     el 24-09, decisión de Santiago). Si no llegó, cae a
    //                     la V4 y la edición sigue igual.
    //   miniatura-2.png = V4, pictograma dibujado por código
    //   miniatura-3.png = V3, la que veníamos usando hasta el 23-09
    const ganchos = (parsed.caratulas && parsed.caratulas.length ? parsed.caratulas : [(parsed.caratula || "").trim()]).filter(Boolean);
    if (!ganchos.length) ganchos.push(recortar(parsed.titulo || ""));
    const [linea1, linea2] = dosLineas(ganchos[0]);
    // la cifra grande de la V4: la primera cifra graficable del bloque de
    // portada, con su etiqueta. Si el bloque no trae uno, la V4 va sin cifra.
    const valor = dato?.series?.[0];
    const cifra = valor?.raw ? String(valor.raw).trim().slice(0, 7) : "";
    const etiqueta = valor?.etiqueta ? String(valor.etiqueta).trim().slice(0, 42) : "";
    const semilla = Number(fecha.replace(/-/g, "").slice(-4)) % 97; // variación diaria por código (regla 29)
    // el clima lo declara el guion ("Clima de carátula:"); sin línea, el tono
    // neutro del informe. Decide la luz de la carátula para que no salgan
    // todas en penumbra (Santiago, 23-09).
    const clima = (parsed.clima || "institucional").toLowerCase();
    // la ilustración de GPT vive en contenido/caratulas/FECHA.(png|jpg); se
    // copia a public/ porque Remotion solo sirve desde ahí
    let imagenGpt = null;
    for (const ext of ["png", "jpg", "jpeg", "webp"]) {
      const orig = path.join("contenido", "caratulas", `${fecha}.${ext}`);
      if (fs.existsSync(orig)) {
        const destino = path.join("public", "caratulas", `${fecha}.${ext}`);
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.copyFileSync(orig, destino);
        imagenGpt = `caratulas/${fecha}.${ext}`;
        break;
      }
    }
    const pictograma = { linea1, linea2, cifra, etiqueta, seccion: img || "", semilla, clima };
    const planes = [
      imagenGpt
        ? ["miniatura.png", "MiniaturaV5", { linea1, linea2, imagen: imagenGpt }, `ilustración de GPT (${imagenGpt}), clima ${clima}`]
        : ["miniatura.png", "MiniaturaV4", pictograma, `SIN ilustración de GPT: sale el pictograma de respaldo, clima ${clima}`],
      imagenGpt
        ? ["miniatura-2.png", "MiniaturaV4", pictograma, `pictograma${cifra ? ` + cifra ${cifra}` : ""}, clima ${clima}`]
        : ["miniatura-2.png", "MiniaturaV4", { ...pictograma, cifra: "", etiqueta: "", semilla: semilla + 7, linea1: dosLineas(ganchos[1] || ganchos[0])[0], linea2: dosLineas(ganchos[1] || ganchos[0])[1] }, "pictograma con el segundo gancho"],
      ["miniatura-3.png", "MiniaturaV3", { linea1, linea2, imagen, fecha: fechaVisible, paleta: "casa" }, "diseño anterior al 23-09"],
    ];
    for (const [archivo, comp, props, nota] of planes) {
      const mini = path.join(OUT, archivo);
      try {
        still(comp, props, mini);
        console.log(`Carátula ${archivo}: ${comp}, ${nota}`);
      } catch (e) { console.log(`(carátula ${archivo} no generada: ${e.message.split("\n")[0]})`); }
    }
  }
}

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
