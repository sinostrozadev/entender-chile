#!/usr/bin/env node
/**
 * short.js - El Short diario: cinco cosas que hay que saber, en vertical.
 *
 * No necesita texto nuevo: toma las [TESIS] de los cinco primeros bloques de
 * noticia del guion del día (ya parseado en out/FECHA/parsed.json) y la cifra
 * principal de cada bloque, arma un guion corto con el MISMO formato de marcas
 * y lo pasa por el pipeline de siempre: parse → voz (con pausa por sección,
 * donde suena la cortina) → timeline → render con la composición Short
 * (1080x1920, src/short-entry.tsx).
 *
 * Uso:
 *   node scripts/short.js [--fecha AAAA-MM-DD] [--clave] [--voz] [--sin-fondo] [--render]
 *
 *   --clave      Short de la Clave del día (4 tesis) en vez del informe (5).
 *                RETIRADO DE PRODUCCIÓN el 16-09-2026 (Santiago: "ese está
 *                malo, no me gusta y no sirve de nada"; lo medido: un tercio
 *                de las vistas del Short del informe y 7 de 9 pares llevaron
 *                menos del 6% de su público a la Clave larga). El modo sigue
 *                aquí por si se retoma, pero ningún workflow lo invoca.
 *                OJO si se retoma: dia.js escribe informe y clave en la misma
 *                carpeta out/FECHA/, así que cada Short se produce justo
 *                después de su dia.js.
 *
 *   --voz        usa Azure si hay AZURE_SPEECH_KEY/REGION (si no, voz simulada)
 *   --sin-fondo  piel papel; por defecto va el fondo marino con el mapa
 *                (public/fondos/fondo-chile-vertical.png), decidido el 30-08
 *   --render     produce out/FECHA/FECHA-short.mp4 (o -short-papel.mp4)
 *
 * Requiere que dia.js ya haya corrido ese día (existe out/FECHA/parsed.json).
 */
const fs = require("fs");
const path = require("path");
const { entornoDe } = require("./pausas.js");
const { execFileSync } = require("child_process");

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const fecha = opt("--fecha") || process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());
const esClave = args.includes("--clave");
const conVoz = args.includes("--voz");
const conFondo = !args.includes("--sin-fondo");
const conRender = args.includes("--render");
const HANDLE = process.env.HANDLE || "@entenderchile";
const FONDO = esClave && fs.existsSync(path.join("public", "fondos", "fondo-clave-vertical.png"))
  ? "fondos/fondo-clave-vertical.png" : "fondos/fondo-chile-vertical.png";
const CUANTAS = esClave ? 4 : 5;
const SERIE = esClave ? "short-clave" : "short";

const OUT_DIA = path.join("out", fecha);
const OUT = path.join(OUT_DIA, SERIE);
const rutaParsed = path.join(OUT_DIA, "parsed.json");
if (!fs.existsSync(rutaParsed)) {
  console.error(`No existe ${rutaParsed}: corre primero node scripts/dia.js (la edición del ${fecha}).`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });
const run = (script, extra, env = {}) =>
  execFileSync("node", [path.join(__dirname, script), ...extra], { stdio: "inherit", env: { ...process.env, ...env } });

// 1) Elegir los bloques: los cinco primeros de noticia (Apertura, Agenda,
//    Dato curioso, En titulares y Cierre no cuentan) con su tesis y su cifra.
const parsed = JSON.parse(fs.readFileSync(rutaParsed, "utf8"));
const NO_NOTICIA = esClave ? /cierre|despedida/i : /apertura|cierre|agenda|dato curioso|en titulares|lo que queda|el tiempo/i;
const bloques = [];
let actual = null;
for (const ev of parsed.eventos) {
  if (ev.tipo === "seccion") { actual = { nombre: ev.texto, tesis: null, dato: null, fuente: null }; bloques.push(actual); continue; }
  if (!actual) continue;
  if (ev.tipo === "tesis" && !actual.tesis) { actual.tesis = ev; if (ev.fuenteSeccion) actual.fuente = ev.fuenteSeccion; }
  if (ev.tipo === "dato" && !ev.automatico && !actual.dato && ev.series?.length) { actual.dato = ev; if (!actual.fuente) actual.fuente = ev.fuente; }
}
const candidatos = bloques.filter((b) => b.tesis && !NO_NOTICIA.test(b.nombre));
// Clave (decidido el 30-08, idea de Santiago): el gancho con su respuesta
// completa, y después las preguntas que la Clave responde, sin responderlas.
// Informe: las cinco tesis.
const elegidos = esClave ? candidatos.slice(0, 1) : candidatos.slice(0, CUANTAS);
const preguntas = esClave ? candidatos.slice(1, 4).map((b) => b.nombre) : [];
if (elegidos.length < (esClave ? 1 : 3) || (esClave && preguntas.length < 2)) {
  console.error(`Solo ${candidatos.length} bloques con tesis: no da para un Short.`); process.exit(1);
}

// 2) Guion corto con las mismas marcas que el informe.
const lineaDato = (d) => {
  const s = d.series;
  // Un cambio, o una comparación de dos valores (antes y después), se muestra
  // como "antes -> después": mostrar solo el primero engaña (Codelco 29-08:
  // salía la ganancia de 2025 como si fuera la noticia).
  // Solo si las dos series miden lo mismo (misma unidad): "9,5%" y "0,8 pp" no
  // son un antes y un después, son dos medidas (Clave del 29-08).
  const mismaUnidad = s.length === 2 && s[0].num != null && s[1].num != null && (s[0].unidad || "") === (s[1].unidad || "");
  if (d.grafico === "cambio" ? s.length === 2 : ((d.grafico === "comparacion" || d.grafico === "lineas") && mismaUnidad)) {
    const t = s[1].tendencia || (s[0].num != null && s[1].num != null ? { dir: s[1].num > s[0].num ? "sube" : s[1].num < s[0].num ? "baja" : "igual", sentido: null } : null);
    const ind = t && (t.dir || t.sentido) ? ` (${[t.dir, t.sentido].filter(Boolean).join(" ")})` : "";
    const etiqueta = d.grafico === "cambio" ? s[0].etiqueta : s[0].etiqueta.replace(/\s*\b(19|20)\d\d\b\s*$/, "").trim() || s[0].etiqueta;
    return `[DATO cambio | ${d.fuente}] ${etiqueta}: ${s[0].raw} -> ${s[1].raw}${ind}`;
  }
  const t = s[0].tendencia;
  const ind = t && (t.dir || t.sentido) ? ` (${[t.dir, t.sentido].filter(Boolean).join(" ")})` : "";
  return `[DATO cifra | ${d.fuente}] ${s[0].etiqueta}: ${s[0].raw}${ind}`;
};
// Apertura y cierre según la serie. El cierre nombra el canal (decidido el
// 30-08): en pantalla va el handle grande, en la voz "Entender Chile".
const tituloClave = (parsed.titulo || "").replace(/\s*#\w+/g, "").trim();
const tituloCorto = tituloClave ? tituloClave.charAt(0).toLowerCase() + tituloClave.slice(1) : "una clave de hoy";
// Si el título de la Clave es una pregunta, se lee tal cual después de un punto.
// LA PRIMERA FRASE DEL SHORT (05-11-2026, rutina de mejora diaria).
//
// Decía "Cinco cosas que hay que saber hoy, Jueves, 5 de noviembre": tres
// segundos y medio de fórmula y fecha antes de que apareciera un solo tema, y
// con un número que desde el 04-11 ya no era verdad (el guion del informe trae
// tres bloques, no cinco).
//
// Lo medido en `bitacora/metricas/2026-11-05.json`: de los 84 Shorts con
// retención propia, los 31 que no llegan al 40 % visto tienen una MEDIANA DE 2
// VISTAS, y los 8 que pasan de 300 vistas van todos entre 50 % y 97 % visto.
// La mediana del canal son 22,5 segundos vistos de unos 44 de Short. En Shorts
// el % visto es la puerta de la distribución, y lo que lo decide es el primer
// segundo, así que ahí va ahora el tema del día y no el calendario.
//
// El tema entra como la PREGUNTA de la carátula sugerida, que el guion escribe
// corta y en forma de pregunta (los 14 guiones del 21-10 al 05-11 la traen
// así), seguida de la promesa con el número REAL de noticias. Si el guion no
// trajo pregunta, se abre con la promesa sola: nunca con la fecha. Una fecha
// hablada además fecha el Short, y el feed de Shorts reparte durante semanas:
// la cola larga del 04-11 necesita piezas que no suenen viejas en diciembre.
const CUANTAS_PALABRA = ["cero", "una", "dos", "tres", "cuatro", "cinco"];
const promesa = elegidos.length === 1
  ? "Esto es lo que hay que saber hoy."
  : `${(CUANTAS_PALABRA[elegidos.length] || elegidos.length).replace(/^./, (c) => c.toUpperCase())} cosas que hay que saber hoy.`;
const preguntaDia = (parsed.caratula || "").split("/")[0].trim();
const apertura = esClave
  ? (/[?!]$/.test(tituloClave) ? `Una clave para entender las noticias. ${tituloClave}` : `Una clave para entender las noticias: ${tituloCorto}.`)
  : (/^¿.+\?$/.test(preguntaDia) ? `${preguntaDia} ${promesa}` : promesa);
const cierreTexto = esClave
  ? "Las respuestas, en la Clave de hoy, en el canal Entender Chile."
  // (04-11-2026) el informe en video se apagó; es texto hablado, por eso sin URL
  : "El día completo está en el diario de Entender Chile. El link, en la descripción.";
// Título fórmula A (Santiago, 05-09): el gancho del día adelante, la serie
// atrás: "El Estrecho es chileno, y otras 4 cosas de hoy". En lista cada
// día se ve distinto y buscable; la serie se reconoce por la cola.
//
// DE DÓNDE SALE EL GANCHO (corregido el 09-09, decisión de Santiago): del
// "Título sugerido" del guion del informe, que está escrito para entenderse
// SOLO. Antes salía de la "Carátula sugerida" y el 08-09 el Short se tituló
// "Buscan comprar al Estado", una metáfora del análisis que, sin el video
// delante, se lee como una privatización; el video largo, con el mismo
// material, se llamó "22 alcaldes bajo protección por el crimen organizado" y
// ese sí funcionó. La carátula es un gancho que se apoya en la imagen de la
// miniatura; el título va solo en el feed. Trabajos distintos, fuentes
// distintas. La carátula queda de respaldo por si el guion no trae título.
//
// El tope existe porque YouTube corta en 100 caracteres y la cola
// ", y otras 4 cosas de hoy #Shorts" ya ocupa 31. Al recortar se prefiere
// cerrar en la primera coma (queda una frase entera: "Muere Camilo Escalona")
// antes que cortar a la mitad con puntos suspensivos.
const TOPE_GANCHO = 66;
const recortarGancho = (t) => {
  if (t.length <= TOPE_GANCHO) return t;
  const coma = t.slice(0, TOPE_GANCHO).search(/[,;:]/);
  if (coma >= 20) return t.slice(0, coma);
  // y nunca terminar en una palabra que deja la frase colgando: "un puente
  // caído en…" se lee como un titular roto (26-09-2026).
  let corte = t.slice(0, TOPE_GANCHO).replace(/\s+\S*$/, "");
  while (/\s(en|de|del|a|al|con|por|para|sobre|y|e|o|u|la|el|los|las|un|una|que|su|sus)$/i.test(corte)) {
    corte = corte.replace(/\s+\S*$/, "");
  }
  return corte + "…";
};
// EL TÍTULO SALE DE LO QUE EL SHORT DICE (27-09-2026, Santiago: "el título
// dice un puente caído, y el short no lo menciona en ningún lado").
//
// Salía del título del INFORME, que resume una edición de doce minutos, y el
// Short cuenta cinco noticias. El 26-09 el informe se titulaba "Curarrehue
// aislada: 7.850 personas sin paso y un puente caído en Lautaro" y el recorte
// a 66 caracteres lo dejó en "...y un puente caído en…": un titular que
// promete un puente que el Short nunca menciona, y encima cortado en una
// preposición. Las dos cosas son la misma: el titular no puede prometer lo que
// el video no entrega.
//
// Ahora el gancho es la TESIS DE LA PRIMERA NOTICIA del propio Short, que por
// construcción se narra adentro. El título del informe queda de respaldo, solo
// si entra entero: si hay que recortarlo, ya no dice lo que decía.
const entero = (parsed.titulo || "").replace(/\s*#\w+/g, "").replace(/\.$/, "").trim();
const ganchoDia = recortarGancho(
  elegidos[0].tesis.texto.replace(/\.$/, "").trim() ||
  (entero.length <= TOPE_GANCHO ? entero : "") ||
  (parsed.caratula || "").trim()
);
const md = [
  esClave
    ? `Título sugerido: Clave: ${tituloClave || "para entender las noticias"} #Shorts`
    // La cola lleva el número REAL de noticias, no el tope CUANTAS: el 05-11-2026
    // el guion trajo tres bloques y el título salía "y otras 4 cosas de hoy",
    // prometiendo dos noticias que el Short nunca narraba. Es la misma regla
    // del 27-09 (el titular no puede prometer lo que el video no entrega), que
    // se rompió sola cuando el informe pasó de cinco bloques a tres.
    : `Título sugerido: ${ganchoDia}, y otras ${elegidos.length - 1} cosas de hoy #Shorts`,
  "Descripción sugerida:",
  esClave
    ? "Una clave para entender las noticias, en un minuto. La Clave completa, en el canal Entender Chile. #Shorts #Chile #noticias"
    // (04-11-2026) El informe en video se apagó: el día completo vive ahora en
    // el diario escrito, y "en el canal" mandaba a un video que ya no existe.
    // La cifra sale de las noticias que de verdad entraron (hoy, tres), para
    // que la descripción no prometa más de las que el Short narra.
    : `Las ${["cero", "una", "dos", "tres", "cuatro", "cinco"][elegidos.length] || elegidos.length} noticias del día en un minuto. El día completo, en el diario escrito: https://entender.sinodev.cl/${fecha}/ #Shorts #Chile #noticias`,
  "Guion:",
  "## Apertura",
  `[TESIS] ${apertura}`,
  ...elegidos.flatMap((b) => [
    `## ${b.nombre}`,
    ...(b.fuente ? [`[FUENTE ${b.fuente}]`] : []),
    ...(b.dato ? [lineaDato(b.dato)] : []),
    `[TESIS] ${b.tesis.texto}`,
  ]),
  ...(esClave ? [
    "## Lo que explica la Clave",
    `[ESQUEMA | Lo que explica la Clave de hoy] ${preguntas.join(" -> ")}`,
    `[TESIS] ${preguntas.map((q, i) => (i === 0 ? q : q.charAt(0).toLowerCase() + q.slice(1))).join(preguntas.length === 2 ? " y " : ", ").replace(/, ([^,]+)$/, " y $1")}.`,
  ] : []),
  "## Cierre",
  `[TESIS] ${cierreTexto}`,
  "Fuentes:",
  ...(parsed.fuentes || []),
  "",
].join("\n");
fs.writeFileSync(path.join(OUT, "guion.md"), md);
console.log(`── Short ${esClave ? "de la Clave" : "del informe"} del ${fecha}: ${elegidos.length} bloques ──`);
elegidos.forEach((b, i) => console.log(`  ${i + 1}. [${b.nombre}] ${b.tesis.texto}${b.dato ? `  ·  ${b.dato.series[0].raw}` : ""}`));
preguntas.forEach((q) => console.log(`     ? ${q}`));

// 3) Pipeline de siempre.
run("parse.js", [path.join(OUT, "guion.md"), OUT + "/"]);
const azure = process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION;
// EL VERTICAL NO ESPERA A NADIE (28-09-2026). Sus pausas de seccion son
// suyas y no las del informe: no tiene viaje de camara ni melodia de
// apertura que aguantar, el corte entre bloques es seco. Se pasan
// explicitas para que ningun cambio en el sintetizador vuelva a
// alargarle los silencios sin que nadie lo pida (paso el 27-09 y el
// Short del 28 salio con 20,2 s de silencio sobre 40 s de voz).
if (conVoz && azure) run("tts-azure.js", [path.join(OUT, "narracion.txt"), OUT + "/"], entornoDe("short"));
else {
  if (conVoz) console.log("(sin AZURE_SPEECH_KEY/REGION: voz simulada)");
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
}
let audio = null;
if (fs.existsSync(path.join(OUT, "narracion.mp3"))) {
  audio = `${fecha}-${SERIE}.mp3`;
  fs.mkdirSync("public", { recursive: true });
  fs.copyFileSync(path.join(OUT, "narracion.mp3"), path.join("public", audio));
}
const son = (f) => (fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null);
const env = { FECHA_EDICION: fecha, SERIE, EN_FRIO: "1" }; // el Short parte directo, sin pantalla muerta
const sello = son("sello.wav"); if (sello) env.LOGO = sello;
const cortinas = ["cortina-a.wav", "cortina-b.wav", "cortina-c.wav"].map(son).filter(Boolean);
if (cortinas.length) env.CORTINAS = cortinas.join(",");
const cierre = son("cierre.wav"); if (cierre) env.CIERRE = cierre;
run("build-timeline.js", [path.join(OUT, "parsed.json"), path.join(OUT, "alignment.json"), path.join(OUT, "timeline.json"), ...(audio ? [audio] : [])], env);

// 4) Lo propio del Short en el timeline: formato vertical, handle y fondo.
const tl = JSON.parse(fs.readFileSync(path.join(OUT, "timeline.json"), "utf8"));
tl.meta.width = 1080; tl.meta.height = 1920;
tl.meta.handle = HANDLE;
// El eyebrow dice lo mismo que el título, con el número real (05-11-2026).
tl.meta.eyebrow = esClave ? "Claves para entender las noticias" : promesa.replace(/\.$/, "");
tl.meta.numerar = !esClave; // "1 de 5" solo tiene sentido en el informe
tl.meta.selloEn = -1; // sin sello visual: no cabe en un Short (ver src/Short.tsx)
tl.meta.fondo = conFondo && fs.existsSync(path.join("public", FONDO)) ? FONDO : null;
fs.writeFileSync(path.join(OUT, "timeline.json"), JSON.stringify(tl, null, 2));
console.log(`OK: Short de ${(tl.meta.duracionSeg / 60).toFixed(1)} min (${tl.meta.duracionSeg}s)${tl.meta.fondo ? " con fondo" : ""} → ${path.join(OUT, "timeline.json")}`);

const video = path.join(OUT_DIA, `${fecha}-${SERIE}${conFondo ? "" : "-papel"}.mp4`);
if (conRender) {
  execFileSync("npx", ["remotion", "render", "src/short-entry.tsx", "Short", video, `--props=./${path.join(OUT, "timeline.json")}`, "--concurrency=100%"], { stdio: "inherit" });
  console.log(`\nListo: ${video}`);
} else {
  console.log(`\nPara verlo: npx remotion render src/short-entry.tsx Short ${video} --props=./${path.join(OUT, "timeline.json")}`);
}
