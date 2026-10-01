#!/usr/bin/env node
/**
 * build-timeline.js - Cruza parsed.json con alignment.json (real o simulado)
 * y produce el timeline.json que consume Remotion.
 *
 * Uso: node scripts/build-timeline.js out/parsed.json out/alignment.json out/timeline.json [narracion.mp3]
 */
const fs = require("fs");
const path = require("path");
const { copiarSecciones, imagenDe, carpetaPublica } = require("./imagenes-secciones.js");
const { repartidor } = require("./dibujo-parrafo.js");
const { entera } = require("./imagen-entera.js");

const [, , parsedPath, alignPath, salida = "out/timeline.json", audioFile = null] = process.argv;
if (!parsedPath || !alignPath) {
  console.error("Uso: node scripts/build-timeline.js <parsed.json> <alignment.json> [timeline.json] [audio.mp3]");
  process.exit(1);
}
const parsed = JSON.parse(fs.readFileSync(parsedPath, "utf8"));
const al = JSON.parse(fs.readFileSync(alignPath, "utf8"));
const starts = al.character_start_times_seconds;
const ends = al.character_end_times_seconds;
const chars = al.characters;
// La narración arranca cuando TERMINA el sello (2,8 s), no debajo de él:
// pedido de Santiago al escuchar el primer video con voz (29-08). Todo lo que
// viene de la alineación se corre este offset; el sello queda solo con su logo.
// APERTURA EN FRÍO (activada por Santiago el 02-09): si el guion abre con la
// sección "La noticia del día", la voz parte en 0 con la noticia de portada y
// el sello entra en la pausa que cierra esa sección (meta.selloEn); su cola
// corre bajo el arranque de la Apertura, nunca retrasa voz.
// EN_FRIO=1 fuerza la apertura en frío desde afuera: los Shorts (05-09,
// pedido de Santiago) parten directo en el contenido, sin los 3 s de
// pantalla muerta que además quedaban de portada del Short en YouTube.
// EL FONDO DE LAS TARJETAS DE CONTENIDO (27-09-2026). Producción sigue sobre
// papel hasta que Santiago apruebe el video de prueba; FONDO_TARJETA=imagen
// las manda sobre la imagen de su sección (la sección que todavía no tiene
// imagen se queda en papel sola, lo resuelve src/tarjetas.tsx). El día que se
// apruebe, activarlo es una línea en el workflow y nada de código.
//
// La clave viaja al timeline SOLO cuando no es papel, igual que seccionesDir:
// así una edición que no pasa la variable produce el mismo archivo, byte por
// byte, que antes de que el interruptor existiera, y el cambio no puede
// colarse por descuido.
const FONDOS_TARJETA = ["papel", "imagen"];
const FONDO_TARJETA = (process.env.FONDO_TARJETA || "papel").toLowerCase();
if (!FONDOS_TARJETA.includes(FONDO_TARJETA)) {
  console.error(`FONDO_TARJETA no reconocido: "${FONDO_TARJETA}". Valores: ${FONDOS_TARJETA.join(" | ")}.`);
  process.exit(1);
}

// LA SECUENCIA DEL 24-09 EN PRODUCCIÓN (27-09-2026). SECUENCIA=2409 hace que
// el informe se monte como lo aprobó Santiago en el taller: la imagen de la
// sección dura toda la sección y el texto va encima. Está apagada mientras él
// mira el video de prueba; el día que lo apruebe es esta línea en el workflow.
// El número es la fecha en que se aprobó a propósito: si mañana hay otra
// secuencia, tendrá su número y se va a saber cuál está corriendo.
const SECUENCIA = (process.env.SECUENCIA || "").trim();
if (SECUENCIA && SECUENCIA !== "2409") {
  console.error(`SECUENCIA no reconocida: "${SECUENCIA}". Valores: (vacío) | 2409.`);
  process.exit(1);
}

const enFrio = process.env.EN_FRIO === "1" ||
  /la noticia del d[ií]a/i.test((parsed.eventos.find((e) => e.tipo === "seccion") || {}).texto || "");
const INICIO = enFrio ? 0 : Number(process.env.INICIO_NARRACION || 3.0);

if (chars.length !== parsed.cleanText.length) {
  console.warn(`AVISO: la alineación tiene ${chars.length} caracteres y la narración ${parsed.cleanText.length}. ` +
    "Si usaste ElevenLabs, revisa que enviaste exactamente out/narracion.txt (la alineación puede diferir por normalización).");
}

const esBlanco = (c) => c === " " || c === "\n" || c === "\t";

// EL RITMO DEL PÁRRAFO (29-09-2026). Para qué: cuando el video muestra el
// texto apareciendo palabra por palabra, necesita saber CUÁNDO se dice cada
// una. Repartir el párrafo en partes iguales se acerca, porque el habla es
// pareja, pero se desarma en cuanto hay una pausa, un nombre largo o una
// cifra leída despacio, y ahí el texto va medio segundo adelantado o atrasado
// justo en la palabra que importa.
//
// Qué entrega: una curva de anclas [fracción del párrafo, segundos desde que
// empieza]. Una por palabra hablada. El video ubica su palabra en la curva e
// interpola entre dos anclas.
//
// POR QUÉ UNA CURVA Y NO LOS TIEMPOS DE CADA PALABRA: lo que se escucha y lo
// que se lee no son el mismo texto. La voz dice "doce mil" y la pantalla
// muestra "12.000", así que las palabras no se corresponden una a una y no
// hay a qué amarrarlas. La curva sí se corresponde, porque las dos versiones
// avanzan por el mismo párrafo: al 40% del texto hablado y al 40% del texto
// en pantalla se está diciendo lo mismo.
const MAX_ANCLAS = 48;
function ritmoDe(charStart, charEnd, desde) {
  const fin = Math.min(charEnd, chars.length);
  const largo = fin - charStart;
  if (largo <= 1) return null;
  const crudo = [];
  let enPalabra = false;
  for (let i = charStart; i < fin; i++) {
    const blanco = esBlanco(chars[i]);
    if (!blanco && !enPalabra && starts[i] != null) {
      crudo.push([(i - charStart) / largo, Number((starts[i] + INICIO - desde).toFixed(3))]);
    }
    enPalabra = !blanco;
  }
  if (crudo.length < 2) return null;
  if (crudo.length <= MAX_ANCLAS) return crudo;
  // párrafos muy largos: se muestrea parejo y se conservan los extremos
  const paso = (crudo.length - 1) / (MAX_ANCLAS - 1);
  const salida = [];
  for (let k = 0; k < MAX_ANCLAS; k++) salida.push(crudo[Math.round(k * paso)]);
  return salida;
}
function rangoTiempo(charStart, charEnd) {
  let i = charStart, j = Math.min(charEnd, chars.length) - 1;
  while (i <= j && esBlanco(chars[i])) i++;
  while (j >= i && esBlanco(chars[j])) j--;
  if (i > j) return null;
  return { from: starts[i] + INICIO, to: ends[j] + INICIO };
}

const eventos = [];
const porIndice = new Map();
let seccionActual = null;
// además del título de la sección, su SLUG: es el que elige la imagen de
// fondo de cada tarjeta (24-09, Santiago: el contenido no va sobre blanco,
// va sobre la imagen de su sección).
let categoriaActual = null;
// La fecha local de Chile del día de producción. Salió de meta a una constante
// cuando el repartidor de dibujos la necesitó: con ella decide con qué variante
// empieza, así gobierno no sale siempre con el mismo dibujo.
const FECHA = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());
// EL DIBUJO DEL PÁRRAFO (30-09-2026). Apagado salvo con DIBUJOS_PARRAFO=1: es
// un cambio en lo que se ve y lo que se ve lo elige Santiago (regla 19). El
// repartidor es uno por edición porque dos de sus guardas tienen memoria (no
// dos seguidos, y un concepto tantas veces como variantes tenga); el porqué de
// cada guarda está en scripts/dibujo-parrafo.js.
const dibujos = repartidor();
// Los párrafos que ya tienen un dato o un esquema anclado: su tarjeta se reparte
// el intervalo entero del párrafo, así que un dibujo ahí quedaría debajo y no se
// vería. Se calcula antes del recorrido porque el ancla apunta hacia atrás.
const conTarjetaEncima = new Set(
  parsed.eventos.filter((e) => (e.tipo === "dato" || e.tipo === "esquema") && e.anchor != null)
    .map((e) => e.anchor)
);
parsed.eventos.forEach((ev, idx) => {
  if (ev.tipo === "seccion") {
    seccionActual = ev.texto;
    categoriaActual = ev.categoria || imagenDe(ev.texto) || null;
  }
  ev._seccion = seccionActual;
  ev._categoria = categoriaActual;
  if (ev.charStart != null) {
    const r = rangoTiempo(ev.charStart, ev.charEnd);
    if (r) {
      const out = { tipo: ev.tipo, texto: ev.texto, from: r.from, to: r.to };
      if (ev.textoPantalla) out.textoPantalla = ev.textoPantalla; // numerales en pantalla
      if (ev.fuenteSeccion) out.fuenteSeccion = ev.fuenteSeccion; // fuente al pie del bloque
      if (ev._seccion) out.seccion = ev._seccion;
      if (ev._categoria) out.categoria = ev._categoria;
      if (ev.etiqueta) out.etiqueta = ev.etiqueta;
      if (ev.soporte) out.soporte = true;
      // la entrada hablada existe en el timeline para que el banner se ancle a
      // ella y para que se vea cuánto dura, pero no se pinta: es voz, no
      // tarjeta (27-09-2026)
      if (ev.tipo === "entrada") out.muda = true;
      if (ev.tipo === "cita") { out.autor = ev.autor; out.fuente = ev.fuente; }
      // solo donde puede servir: la narración es lo único que se muestra
      // palabra por palabra. En un titular de cuatro segundos sobra.
      if (ev.tipo === "narracion") {
        const r2 = ritmoDe(ev.charStart, ev.charEnd, r.from);
        if (r2) out.ritmo = r2;
        // el veto del guion viaja en ev.sinDibujo; el repartidor decide el resto
        const d = dibujos.dar({ texto: ev.texto, seccion: ev._seccion, sinDibujo: ev.sinDibujo,
          tapado: conTarjetaEncima.has(idx) });
        if (d) { out.imagen = d.ruta; out.imagenPie = d.concepto; }
      }
      porIndice.set(idx, out);
      eventos.push(out);
    }
  }
});
// tarjetas de titulares: toman el intervalo completo de sus frases, con el
// tiempo de cada una para destacar la activa
for (const ev of parsed.eventos) {
  if (ev.tipo !== "titulares" || !ev.itemsIdx) continue;
  const items = ev.itemsIdx.map((i) => porIndice.get(i)).filter(Boolean)
    .map((e) => ({ texto: e.textoPantalla || e.texto, from: e.from, to: e.to }));
  if (!items.length) continue;
  eventos.push({ tipo: "titulares", items, seccion: "En titulares", from: Number((items[0].from - 0.1).toFixed(3)), to: items[items.length - 1].to });
}

// agrupar dato/esquema por ancla para repartirse el intervalo del párrafo
const grupos = new Map();
parsed.eventos.forEach((ev) => {
  if ((ev.tipo === "dato" || ev.tipo === "esquema") && ev.anchor != null) {
    if (!grupos.has(ev.anchor)) grupos.set(ev.anchor, []);
    grupos.get(ev.anchor).push(ev);
  }
});
for (const [anchor, grupo] of grupos) {
  const ancla = porIndice.get(anchor);
  if (!ancla) continue;
  const paso = (ancla.to - ancla.from) / grupo.length;
  grupo.forEach((ev, k) => {
    const from = ancla.from + paso * k;
    const to = k === grupo.length - 1 ? ancla.to : ancla.from + paso * (k + 1);
    const base = { seccion: ev._seccion, ...(ev._categoria ? { categoria: ev._categoria } : {}), caption: ev.caption, from: Number(from.toFixed(3)), to: Number(to.toFixed(3)) };
    if (ev.fuenteSeccion) base.fuenteSeccion = ev.fuenteSeccion;
    if (ev.automatico) base.automatico = true;
    if (ev.tipo === "dato") eventos.push({ tipo: "dato", grafico: ev.grafico, fuente: ev.fuente, series: ev.series, ...base });
    else eventos.push({ tipo: "esquema", titulo: ev.titulo, elementos: ev.elementos, ...base });
  });
}
// banners de sección: persisten hasta la sección siguiente. Si la voz trae
// pausas de sección (pausas.json de tts-azure), el banner o la cortina
// arranca donde EMPIEZA el silencio, no donde termina: así una cortina de
// 1,1 s suena sobre la pausa de 1,2 s y no tapa voz.
const rutaPausas = path.join(path.dirname(alignPath), "pausas.json");
const pausas = (fs.existsSync(rutaPausas) ? JSON.parse(fs.readFileSync(rutaPausas, "utf8")) : [])
  .map((p) => ({ ...p, from: p.from + INICIO }));
const banners = [];
parsed.eventos.forEach((ev) => {
  if (ev.tipo !== "seccion" || ev.anchor == null) return;
  const ancla = porIndice.get(ev.anchor);
  if (!ancla) return;
  const pausa = pausas.find((p) => Math.abs(p.from + p.dur - ancla.from) < 0.4);
  // La categoría se resuelve ACÁ, no en el video: primero la que declara el
  // guion, y si el guion es viejo y no la trae, el clasificador por palabras.
  // Así el lado Remotion nunca tiene que adivinar nada.
  banners.push({ texto: ev.texto, categoria: ev.categoria || imagenDe(ev.texto) || null,
    // cuánto silencio hay de verdad acá: el mosaico de transición dura lo que
    // dura la pausa, ni un cuadro más, para no pisar voz nunca
    pausaDur: pausa ? Number(pausa.dur.toFixed(2)) : null,
    from: Math.max(0, pausa ? pausa.from + 0.05 : ancla.from - 0.1) });
});
banners.forEach((b, i) => {
  eventos.push({ tipo: "seccion", texto: b.texto, ...(b.categoria ? { categoria: b.categoria } : {}),
    ...(b.pausaDur ? { pausaDur: b.pausaDur } : {}), from: b.from, to: i + 1 < banners.length ? banners[i + 1].from : 9e9, overlay: true });
});

eventos.sort((a, b) => a.from - b.from);
const fin = eventos.reduce((m, e) => (e.to < 1e8 ? Math.max(m, e.to) : m), 0);
for (const e of eventos) if (e.to >= 1e8) e.to = Number((fin + 1.2).toFixed(3)); // el último banner llega hasta el final real

const timeline = {
  version: 1,
  meta: {
    titulo: parsed.titulo || "",
    descripcion: parsed.descripcion || "",
    // fecha local de Chile del día de producción (para el sello de inicio)
    fecha: FECHA,
    serie: process.env.SERIE || "informe",          // informe | clave (lo fija dia.js)
    inicioNarracion: audioFile ? INICIO : 0,        // la voz entra después del sello
    // Fondos por sección ENCENDIDOS (03-09, disputa 1 cerrada): imágenes
    // como identificadores con variación diaria por código (src/fondos.tsx).
    fondos: true,
    // Qué secciones tienen imagen propia HOY. Las que no están en esta lista
    // se pintan con su color y su pictograma, que es el mosaico v3 aprobado.
    // Van llegando de a una y el video no espera a tenerlas todas.
    secciones: copiarSecciones(),
    // Los dibujos usados se copian a public/ recién acá, cuando ya se sabe
    // cuáles salieron: copiar los 23 cuando salen 6 es cargar el bundle de
    // Remotion con archivos que nadie va a pedir. La clave solo viaja cuando
    // hay alguno, para que una edición con la regla apagada produzca el mismo
    // archivo byte por byte que antes de que la regla existiera.
    ...(dibujos.copiar() ? { dibujos: dibujos.puestos.length } : {}),
    // De qué carpeta de public/ salen esas imágenes. Solo se escribe en el
    // modo de prueba (SECCIONES_DIR): en producción la clave no existe y el
    // video usa public/secciones/ como siempre, así el timeline del día sale
    // byte por byte igual que antes de que existiera la prueba.
    ...(carpetaPublica() !== "secciones" ? { seccionesDir: carpetaPublica() } : {}),
    // Dónde va el contenido: sobre papel (lo de siempre) o sobre la imagen de
    // su sección. Ver FONDO_TARJETA arriba: la clave solo existe si cambia.
    ...(FONDO_TARJETA !== "papel" ? { fondoTarjeta: FONDO_TARJETA } : {}),
    // El mosaico como transición de sección (24-09, aprobado por Santiago en
    // el taller). MOSAICO=0 vuelve a la cortina de siempre.
    mosaico: process.env.MOSAICO !== "0",
    // LA ENTRADA DE MARCA (01-10-2026). Apagada salvo con ENTRADA_MARCA=1: es un
    // cambio en lo que se ve y lo que se ve lo elige Santiago. La clave solo
    // viaja cuando está encendida, para que una edición sin ella produzca el
    // mismo archivo byte por byte que antes de que existiera.
    ...(process.env.ENTRADA_MARCA === "1" ? { entrada: true } : {}),
    // apertura en frío: el sello suena en la pausa que cierra la primera
    // sección (banners[1].from ya apunta al inicio de ese silencio)
    selloEn: enFrio && banners[1] ? Number(Math.max(0, banners[1].from - 0.05).toFixed(2)) : 0,
    musica: process.env.MUSICA || null,             // cama continua: retirada (null)
    logo: process.env.LOGO || null,                 // sello sonoro de la apertura
    // Cortinas de sección: solo cuando no pueden tapar voz, es decir, si el
    // video es mudo o si la voz trae pausas de sección (pausas.json).
    cortinas: process.env.CORTINAS && (!audioFile || pausas.length)
      ? process.env.CORTINAS.split(",") : null,
    cierre: process.env.CIERRE || null,             // melodía final
    fps: 24, // era 30; 24 = 20% menos cuadros que renderizar (ACTIONS 1, 16-09). Todos los tiempos van en segundos, no en cuadros.
    width: 1920,
    height: 1080,
    duracionSeg: Number((fin + 1.2).toFixed(2)),
  },
  audio: audioFile,
  fuentes: parsed.fuentes || [],
  eventos,
};
// El plan de la secuencia se calcula al final, porque necesita el timeline ya
// armado (las secciones con sus tiempos definitivos). Sin la variable no se
// agrega nada y el archivo sale idéntico al de siempre.
if (SECUENCIA === "2409") {
  // La portada de la secuencia es la ilustración del día (contenido/caratulas/
  // FECHA.png, la que genera GPT). Se copia a public/caratulas/ porque Remotion
  // solo sirve desde public, igual que hace miniaturas.js, y se anota en
  // meta.caratula para que el plan la use. Sin ilustración no hay portada y
  // la secuencia arranca en la principal, sin frenar nada (27-09).
  try {
    const fechaDia = timeline.meta.fecha;
    for (const ext of ["png", "jpg", "jpeg", "webp"]) {
      const orig = path.join("contenido", "caratulas", `${fechaDia}.${ext}`);
      // ...y que este COMPLETA. Una imagen rota se trata como una que no esta
      // (28-09-2026, ver scripts/imagen-entera.js): el 28 la caratula llego
      // truncada al cuarto de su alto, Chromium pinto lo que pudo y eso salio
      // en la portada del video y en la miniatura, a YouTube.
      if (fs.existsSync(orig) && !entera(orig)) {
        console.warn(`portada: ${orig} esta ROTA (archivo incompleto): la edicion sigue sin ilustracion.`);
        continue;
      }
      if (fs.existsSync(orig)) {
        fs.mkdirSync(path.join("public", "caratulas"), { recursive: true });
        fs.copyFileSync(orig, path.join("public", "caratulas", path.basename(orig)));
        timeline.meta.caratula = `caratulas/${path.basename(orig)}`;
        break;
      }
    }
  } catch (e) { console.warn(`portada: ${e.message}`); }
  const { planear } = require("./secuencia-plan.js");
  const plan = planear(timeline);
  if (plan) timeline.meta.secuencia = plan;
  else console.warn("SECUENCIA=2409: esta edición no tiene secciones suficientes; sale el montaje de siempre.");
}
fs.writeFileSync(salida, JSON.stringify(timeline, null, 2));
console.log(`OK: timeline con ${eventos.length} eventos, duración ${(timeline.meta.duracionSeg / 60).toFixed(1)} min → ${salida}`);
