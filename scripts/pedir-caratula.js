#!/usr/bin/env node
/**
 * pedir-caratula.js - Si el guion del informe de hoy ya existe y su carátula
 * no, abre UN pedido a GPT por el canal de pedidos.
 *
 * Por qué existe (27-09-2026). La carátula del día se genera dentro del mismo
 * turno del guion, para no gastar un despertar extra. El problema es que si
 * ese turno falla, no hay segunda oportunidad: GPT deja un
 * `FECHA-NO-PUDE.md`, ahí se acaba el asunto y el video sale sin portada. Pasó
 * tres días seguidos, del 25 al 27.
 *
 * Y el 27 pasó de la peor manera: GPT escribió que el conector "solo permite
 * crear archivos de texto UTF-8 y no admite subir binarios PNG". Era falso, y
 * él mismo lo reconoció cuando Santiago lo empujó: "revisé la función para
 * archivos de texto y pasé por alto la opción para subir imágenes como blobs
 * binarios. No comprobé ningún cambio del conector". El mismo tipo de tarea
 * había subido un PNG de 4,2 MB tres días antes (commit 9c38b93). Es decir:
 * la constancia de falla era una hipótesis escrita como hecho, y bastó una
 * ejecución nueva para que subiera.
 *
 * De ahí la regla de este script: NO se discute con la nota, se reintenta. El
 * canal de pedidos ya da por cumplido un pedido solo cuando existe el archivo
 * de Salida, así que basta con abrirlo.
 *
 * Es barato y acotado: no hace nada si no hay guion, si la imagen ya está, o
 * si el pedido de hoy ya se abrió. Como mucho, un despertar de GPT al día, y
 * solo los días en que faltó la imagen.
 */
const fs = require("fs");
const path = require("path");
const { entera } = require("./imagen-entera.js");

const FECHA = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

const guion = path.join("contenido", "guiones", "informe", `${FECHA}.md`);
const salida = path.join("contenido", "caratulas", `${FECHA}.png`);
const pedido = path.join("contenido", "urgente", `PEDIDO-caratula-${FECHA}.md`);
const fin = (msg) => { console.log(msg); process.exit(0); };

if (!fs.existsSync(guion)) fin(`sin guion del informe de ${FECHA}: no hay nada que ilustrar todavía.`);

// La imagen vale con cualquiera de las extensiones que busca scripts/dia.js.
// Y tiene que estar COMPLETA: una imagen rota es una imagen que no esta
// (28-09-2026). Asi el reintento cubre tambien el caso en que el archivo llego
// pero llego truncado, que es lo que paso ese dia y salio al aire.
const yaEsta = ["png", "jpg", "jpeg", "webp"]
  .map((e) => path.join("contenido", "caratulas", `${FECHA}.${e}`)).find((p) => entera(p));
if (yaEsta) fin(`la carátula de ${FECHA} ya está en ${yaEsta}: sin pedido.`);

if (fs.existsSync(pedido)) fin(`el pedido de la carátula de ${FECHA} ya está abierto: no se repite.`);

// El contexto sale del guion, que es donde el propio prompt de la carátula
// manda leerlo. Si falta una línea, el pedido igual sirve: el prompt de GPT
// sabe volver al guion.
const txt = fs.readFileSync(guion, "utf8");
const campo = (nombre) => (txt.match(new RegExp(`^${nombre}:\\s*(.+)$`, "m")) || [])[1] || "";
const clima = campo("Clima de carátula") || "institucional";
const gancho = campo("Carátula sugerida");
const tesis = (txt.match(/^\[TESIS\]\s*(.+)$/m) || [])[1] || "";
const noPude = fs.existsSync(path.join("contenido", "caratulas", `${FECHA}-NO-PUDE.md`));

const cuerpo = [
  `# PEDIDO · carátula del informe del ${FECHA.split("-").reverse().join("-")}`,
  "Tarea: imagen",
  `Salida: ${salida}`,
  "Prompt: prompts/imagen-caratula.md",
  `Pedido por: estado.yml, porque el turno del guion terminó sin dejar la imagen${noPude ? " (dejó un NO-PUDE)" : ""}.`,
  "",
  "Este es el REINTENTO automático, en una ejecución nueva. Si en el turno",
  "anterior anotaste que no podías subir un binario, compruébalo de nuevo antes",
  "de repetirlo: el 27-09-2026 esa conclusión resultó equivocada y la imagen",
  "subió sin problema al segundo intento.",
  "",
  `Clima de carátula: ${clima}`,
  ...(gancho ? [`Gancho que va encima: ${gancho}`] : []),
  ...(tesis ? [`Noticia de portada: ${tesis}`] : []),
  "",
  `La fórmula, las reglas duras y el texto del pedido están en`,
  `prompts/imagen-caratula.md. La imagen va en ${salida} (o .jpg), rama main.`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(pedido), { recursive: true });
fs.writeFileSync(pedido, cuerpo);
console.log(`pedido de carátula abierto: ${pedido}`);
