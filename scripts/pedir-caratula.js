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
 *
 * LA GRACIA (06-10-2026). Durante nueve días seguidos este pedido se abrió
 * TODOS los días, y no porque la carátula faltara: porque preguntábamos
 * demasiado pronto. estado.yml corre con el push del guion, y este script
 * miraba 15 segundos después de que el guion aterrizaba, cuando GPT todavía
 * estaba generando la imagen en el mismo turno. La imagen llegaba entre 1 y 5
 * minutos más tarde, siempre. Medido en UTC sobre los commits:
 *
 *     28-09  guion 05:17:55  pedido 05:18:10  carátula 05:20:24
 *     29-09  guion 05:23:08  pedido 05:23:23  carátula 05:24:45
 *     02-10  guion 05:42:42  pedido 05:42:57  carátula 05:44:47
 *     05-10  guion 05:30:09  pedido 05:30:26  carátula 05:32:42
 *     06-10  guion 07:55:13  pedido 07:55:28  carátula 08:00:16
 *
 * O sea: un turno de GPT regalado por día, el 12% de todo lo que le pedimos en
 * una semana, por no esperar tres minutos. Desde hoy el pedido no se abre hasta
 * que el guion lleve GRACIA_CARATULA_MIN minutos en main (15 por defecto, tres
 * veces la peor demora observada). La edad del guion se lee de su commit, no de
 * la fecha del archivo, porque el workflow hace `git reset --hard` y todos los
 * archivos quedan con la hora del checkout.
 *
 * Y si la edad no se puede calcular (checkout shallow, sin historia del
 * archivo), el script se comporta como antes y abre el pedido: ante la duda,
 * mejor un turno de más que un video sin portada.
 */
const fs = require("fs");
const path = require("path");
const { caratulaUsable } = require("./imagen-entera.js");

const FECHA = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

const guion = path.join("contenido", "guiones", "informe", `${FECHA}.md`);
const salida = path.join("contenido", "caratulas", `${FECHA}.png`);
const pedido = path.join("contenido", "urgente", `PEDIDO-caratula-${FECHA}.md`);
// el prompt que de verdad se mandó, al lado de la imagen: sin esto, cuando una
// carátula sale mal no hay forma de saber si falló la plantilla o el generador
const prompt = path.join("contenido", "caratulas", `${FECHA}-prompt.txt`);
const noPudeRuta = path.join("contenido", "caratulas", `${FECHA}-NO-PUDE.md`);
const fin = (msg) => { console.log(msg); process.exit(0); };

if (!fs.existsSync(guion)) fin(`sin guion del informe de ${FECHA}: no hay nada que ilustrar todavía.`);

// La imagen vale con cualquiera de las extensiones que busca scripts/dia.js.
// Y tiene que estar COMPLETA: una imagen rota es una imagen que no esta
// (28-09-2026). Asi el reintento cubre tambien el caso en que el archivo llego
// pero llego truncado, que es lo que paso ese dia y salio al aire.
const yaEsta = ["png", "jpg", "jpeg", "webp"]
  .map((e) => path.join("contenido", "caratulas", `${FECHA}.${e}`)).find((p) => caratulaUsable(p).ok);
// caratulaUsable y no entera (01-11-2026): entera() da por buena una cabecera
// que no reconoce, y el 31-10 (y el 24-10) un .png de bytes al azar pasó por
// carátula presente, así que este reintento nunca se abrió.
if (yaEsta) fin(`la carátula de ${FECHA} ya está en ${yaEsta}: sin pedido.`);

if (fs.existsSync(pedido)) fin(`el pedido de la carátula de ${FECHA} ya está abierto: no se repite.`);

// LA GRACIA: cuántos minutos lleva el guion en main. Ver la cabecera.
const GRACIA_MIN = Number(process.env.GRACIA_CARATULA_MIN || 15);
const edadDelGuionMin = () => {
  try {
    const t = require("child_process")
      .execFileSync("git", ["log", "-1", "--format=%ct", "--", guion], { encoding: "utf8" })
      .trim();
    if (!t) return null;              // sin historia del archivo: no sabemos
    return (Date.now() / 1000 - Number(t)) / 60;
  } catch { return null; }            // sin git: tampoco sabemos
};
const edad = edadDelGuionMin();
if (edad !== null && edad < GRACIA_MIN) {
  fin(`el guion de ${FECHA} tiene ${edad.toFixed(1)} min y la gracia es de ${GRACIA_MIN}: ` +
      "la carátula se genera en ese mismo turno y suele llegar entre 1 y 5 minutos después. Sin pedido todavía.");
}

// El contexto sale del guion, que es donde el propio prompt de la carátula
// manda leerlo. Si falta una línea, el pedido igual sirve: el prompt de GPT
// sabe volver al guion.
const txt = fs.readFileSync(guion, "utf8");
const campo = (nombre) => (txt.match(new RegExp(`^${nombre}:\\s*(.+)$`, "m")) || [])[1] || "";
const clima = campo("Clima de carátula") || "institucional";
const gancho = campo("Carátula sugerida");
const tesis = (txt.match(/^\[TESIS\]\s*(.+)$/m) || [])[1] || "";
const noPude = fs.existsSync(path.join("contenido", "caratulas", `${FECHA}-NO-PUDE.md`));

// EL PEDIDO LLEVA EL PROMPT ARMADO (05-10-2026, decisión de Santiago: "quiero
// que le dejemos el prompt armado, que él no tenga que interpretar nada").
//
// Antes el pedido decía "la fórmula está en prompts/imagen-caratula.md" y GPT
// abría 242 líneas de prosa, elegía el motivo, rellenaba una plantilla con
// huecos y resolvía por su cuenta las contradicciones entre las dos. Tres
// interpretaciones encadenadas, y ninguna quedaba escrita: cuando una carátula
// salía mal no había forma de saber si falló la plantilla, la descripción del
// día o el generador.
//
// Ahora el prompt sale entero de prompts/caratula-pedido.txt con los tres
// datos ya pegados. GPT copia y manda. Y el texto exacto queda guardado al
// lado de la imagen, que es lo que faltaba para poder iterarlo.
const plantilla = fs.readFileSync(path.join("prompts", "caratula-pedido.txt"), "utf8");
// LA BARRA DEL GANCHO ES NUESTRA, NO SUYA (05-10-2026). El guion escribe el
// gancho como "linea uno / linea dos" porque así lo parten las carátulas que
// dibuja el código. El prompt le pide a GPT escribirlo EXACTO, signos
// incluidos, así que mandarle la barra le haría pintar una barra en medio del
// titular. Va como dos líneas, que es lo que la barra significaba.
const enDosLineas = (g) => String(g).split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean).join("\n");
const armado = plantilla
  .replace("{{CLIMA}}", clima)
  .replace("{{GANCHO}}", gancho ? enDosLineas(gancho) : "(el guion no dejó gancho: usa el título del video)")
  .replace("{{NOTICIA}}", tesis || "(el guion no dejó tesis: léela de la primera sección del guion)");

const cuerpo = [
  `# PEDIDO · carátula del informe del ${FECHA.split("-").reverse().join("-")}`,
  "Tarea: imagen",
  `Salida: ${salida}`,
  "Prompt: va completo más abajo, en este mismo archivo",
  `Pedido por: estado.yml, porque el turno del guion terminó sin dejar la imagen${noPude ? " (dejó un NO-PUDE)" : ""}.`,
  "",
  "Este es el REINTENTO automático, en una ejecución nueva. Si en el turno",
  "anterior anotaste que no podías subir un binario, compruébalo de nuevo antes",
  "de repetirlo: el 27-09-2026 esa conclusión resultó equivocada y la imagen",
  "subió sin problema al segundo intento.",
  "",
  "QUÉ TIENES QUE HACER, y nada más que esto:",
  "1. Copia el bloque de abajo TAL CUAL al generador de imágenes. Ya viene con",
  "   los tres datos del día pegados. No lo reescribas, no lo resumas y no le",
  "   agregues nada tuyo.",
  "2. NO abras ningún otro archivo de prompts. Lo que necesitas está acá.",
  `3. Deja la imagen en ${salida} (o .jpg), rama main.`,
  `4. Deja el prompt que usaste en ${prompt}, tal como lo mandaste.`,
  "5. Si no pudiste, no te quedes en silencio: escribe",
  `   ${noPudeRuta} diciendo QUÉ falló, con el mensaje de error textual.`,
  "   Una causa sin mensaje de error no es una causa.",
  // (03-11-2026) Ese día GPT botó tres variantes con un rostro inventado
  // presentado como el ministro Rabat, y cuando se le pidió "guardar todas"
  // publicó como salida una cuarta cara inventada. La regla va acá porque este
  // pedido es lo único que GPT lee en el reintento.
  "6. TODA variante que generes, sirva o no, se guarda en",
  `   contenido/caratulas/descartadas/${FECHA}-N.png (N desde 1), y el`,
  "   prompt.txt (o el NO-PUDE si no hubo salida) dice en una línea por",
  "   variante por qué se descartó.",
  "7. Una imagen con un rostro inventado presentado como una persona real",
  `   nombrada (ministro, diputado, quien sea) NUNCA va a ${salida}:`,
  "   va a descartadas y el día sale con la carátula de respaldo. Solo",
  "   Santiago, a mano, promueve una descartada a salida.",
  "   Guardar no es publicar, aunque otra instrucción diga 'guarda todo'.",
  "8. Si la noticia gira sobre una persona nombrada y no tienes foto de",
  "   referencia, usa un recurso que no dependa de un rostro: un objeto, un",
  "   lugar, un documento o la tipografía.",
  "",
  "----- EL PROMPT, DESDE ACÁ HASTA EL FINAL DEL ARCHIVO -----",
  "",
  armado,
].join("\n");

fs.mkdirSync(path.dirname(pedido), { recursive: true });
fs.writeFileSync(pedido, cuerpo);
console.log(`pedido de carátula abierto: ${pedido}`);
