#!/usr/bin/env node
/**
 * prueba-video.js - El video de una edición ya publicada, rendido con las
 * imágenes de sección y la carátula que están en CARPETAS DE PRUEBA.
 *
 * Por qué existe (27-09-2026, pedido de Santiago): las imágenes planas de
 * sección y la carátula ilustrada se juzgan pasando en el video, no sueltas en
 * una carpeta. Y se juzgan ANTES de meterlas en producción, porque una vez que
 * están en contenido/secciones/ salen al aire en la edición siguiente.
 *
 * Nada de acá toca producción:
 *   · las imágenes se leen de SECCIONES_DIR (por defecto
 *     contenido/secciones/pruebas) y se copian a public/secciones-prueba/,
 *     nunca a public/secciones/;
 *   · la carátula se lee de CARATULA y se copia a public/caratulas-prueba/;
 *   · todo lo que se genera queda en out/pruebas/AAAA-MM-DD/ (out/ está
 *     ignorado por git) y no se sube nada a ninguna parte.
 *
 * Uso:
 *   node scripts/prueba-video.js 2026-09-26            → el informe completo
 *   node scripts/prueba-video.js 2026-09-26 --corto    → una muestra de uno a dos minutos
 *   ... --fondo papel                                  → las tarjetas como salen hoy al aire
 *   ... --comparar (con --corto)                       → cada sección dos veces: papel y después imagen
 *
 * Con --corto sale la apertura con la carátula y unos cuatro segundos por
 * sección, en el orden real del guion: sirve para ver la FILA de imágenes sin
 * esperar veinte minutos de render. Los segundos por sección se cambian con
 * SEGUNDOS_POR_SECCION.
 *
 * LAS TARJETAS VAN SOBRE LA IMAGEN DE SECCIÓN (27-09-2026, orden de Santiago:
 * "activa el mecanismo"). Acá viene encendido por defecto, porque la prueba es
 * justamente esa; producción sigue en papel hasta que él apruebe el video (el
 * interruptor de allá es FONDO_TARJETA, ver scripts/dia.js). La sección que no
 * tiene imagen de prueba se queda sobre papel, no hay fondo inventado.
 * --fondo papel devuelve la muestra a lo de hoy, para mirar la diferencia.
 *
 * La voz no se vuelve a generar nunca (cero créditos): se reutiliza el audio y
 * la alineación de esa fecha si están en out/AAAA-MM-DD/ o en el release
 * edicion-AAAA-MM-DD, y si no hay, el video sale mudo con la alineación
 * simulada de scripts/mock-tts.js.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ── argumentos ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const corto = args.includes("--corto");
const comparar = args.includes("--comparar");
// --fondo se come el argumento que le sigue: si no se descuenta, un
// "--fondo papel 2026-09-26" tomaría "papel" como fecha y el script se caería
// diciendo una cosa que no es.
const iFondo = args.indexOf("--fondo");
const fondo = iFondo >= 0 ? String(args[iFondo + 1] || "").toLowerCase() : "imagen";
if (!["papel", "imagen"].includes(fondo)) {
  console.error(`--fondo no reconocido: "${fondo}". Valores: papel | imagen.`);
  process.exit(1);
}
const fecha = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--fondo")[0];
if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
  console.error("Uso: node scripts/prueba-video.js AAAA-MM-DD [--corto] [--sin-secuencia] [--comparar] [--fondo papel|imagen]");
  process.exit(1);
}
// LA SECUENCIA DEL 24-09 ES EL MODO POR DEFECTO (27-09-2026). Santiago
// devolvió el primer intento: "la imagen de la sección debe quedar durante
// TODA la sección". Lo aprobado está en src/taller-secuencia.tsx y se dibuja
// desde src/secuencia.tsx; lo de antes (cada tarjeta con su propio fondo)
// queda accesible para comparar, porque comparar contra lo que sale hoy es
// justamente lo que pidió.
const secuencia = !args.includes("--sin-secuencia") && !comparar && !(iFondo >= 0 && fondo === "papel");
if (comparar && !corto) console.log("(--comparar solo existe en la muestra --corto: se ignora)");
if (!secuencia && !args.includes("--sin-secuencia")) console.log("(--comparar y --fondo papel son del modo anterior: la secuencia queda apagada)");

const guion = path.join("contenido", "guiones", "informe", `${fecha}.md`);
if (!fs.existsSync(guion)) {
  console.error(`No existe ${guion}: esta prueba rinde una edición que ya se publicó.`);
  process.exit(1);
}

// ── de dónde salen las imágenes de prueba ─────────────────────────────────
const DIR_PRUEBAS = path.join("contenido", "secciones", "pruebas");
process.env.SECCIONES_DIR = process.env.SECCIONES_DIR || DIR_PRUEBAS;
if (!fs.existsSync(process.env.SECCIONES_DIR)) {
  console.error(`No existe ${process.env.SECCIONES_DIR} (SECCIONES_DIR).`);
  process.exit(1);
}
// La carátula de prueba se llama caratula-AAAA-MM-DD.png y vive en la misma
// carpeta. Si no está, la prueba sigue: la carátula que sale al aire cae al
// pictograma de respaldo, igual que en producción cuando no llega la de GPT.
if (!process.env.CARATULA) {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const c = path.join(process.env.SECCIONES_DIR, `caratula-${fecha}.${ext}`);
    if (fs.existsSync(c)) { process.env.CARATULA = c; break; }
  }
}

// Las fuentes desde public/fuentes: el render no depende de la red (ver src/tema.ts)
process.env.REMOTION_FUENTES_LOCALES = process.env.REMOTION_FUENTES_LOCALES || "1";
process.env.FECHA_EDICION = fecha;
process.env.SERIE = "informe";
// lo lee build-timeline.js y queda en meta.fondoTarjeta; acá "imagen" es el
// valor por defecto, al revés que en producción
process.env.FONDO_TARJETA = fondo;

const OUT = path.join("out", "pruebas", fecha) + path.sep;
fs.mkdirSync(OUT, { recursive: true });
const VIEJO = path.join("out", fecha);          // lo que dejó la edición real, si se produjo acá
const run = (script, extra = []) =>
  execFileSync("node", [path.join("scripts", script), ...extra], { stdio: "inherit" });

console.log(`Edición de prueba: ${fecha}`);
console.log(`  imágenes de sección: ${process.env.SECCIONES_DIR} → public/secciones-prueba/`);
console.log(`  carátula:            ${process.env.CARATULA || "(no hay: sale el pictograma de respaldo)"}`);
console.log(`  montaje:             ${secuencia ? "secuencia del 24-09 (la imagen dura toda la sección)" : "tarjeta por tarjeta"}`);
if (!secuencia) console.log(`  fondo de tarjetas:   ${fondo}${comparar && corto ? " (y --comparar: cada sección con imagen, papel y después imagen)" : ""}`);
console.log(`  salidas:             ${OUT}\n`);

// ── 1 · el guion ──────────────────────────────────────────────────────────
console.log("── 1/4 · Parseando el guion ──────────────────────");
run("parse.js", [guion, OUT]);
const parsed = JSON.parse(fs.readFileSync(path.join(OUT, "parsed.json"), "utf8"));

// ── 2 · la voz: reutilizar, jamás generar ─────────────────────────────────
console.log("── 2/4 · Voz (reutilizada, nunca generada) ───────");
const audioPublico = `${fecha}-informe.mp3`;
let audio = fs.existsSync(path.join("public", audioPublico)) ? audioPublico : null;
if (!audio && fs.existsSync(path.join(VIEJO, "narracion.mp3"))) {
  fs.copyFileSync(path.join(VIEJO, "narracion.mp3"), path.join("public", audioPublico));
  audio = audioPublico;
  console.log(`audio reutilizado de ${path.join(VIEJO, "narracion.mp3")}`);
}
if (!audio) {
  // el release del día es la memoria de la edición: ahí quedó el mp3
  try {
    execFileSync("gh", ["release", "download", `edicion-${fecha}`, "--pattern", audioPublico,
      "--dir", "public", "--clobber"], { stdio: "pipe", timeout: 120000 });
    if (fs.existsSync(path.join("public", audioPublico))) {
      audio = audioPublico;
      console.log(`audio bajado del release edicion-${fecha}`);
    }
  } catch { console.log(`(sin audio en el release edicion-${fecha})`); }
}
// La alineación REAL es la que sincroniza el video con esa voz. Sin ella el
// audio no sirve: los tiempos simulados no calzan con lo que se dice, y un
// video desincronizado enseña menos que uno mudo.
let alineacionReal = false;
for (const f of ["alignment.json", "pausas.json"]) {
  if (fs.existsSync(path.join(VIEJO, f))) {
    fs.copyFileSync(path.join(VIEJO, f), path.join(OUT, f));
    if (f === "alignment.json") alineacionReal = true;
  }
}
if (alineacionReal) console.log(`alineación reutilizada de ${path.join(VIEJO, "alignment.json")}`);
else {
  run("mock-tts.js", [path.join(OUT, "narracion.txt"), path.join(OUT, "alignment.json")]);
  if (audio) console.log("(hay audio pero no su alineación: el video va mudo para no salir desincronizado)");
  audio = null;
}

// ── 3 · el timeline, con las imágenes de prueba ───────────────────────────
console.log("── 3/4 · Timeline ────────────────────────────────");
const son = (f) => (fs.existsSync(path.join("public", "musica", f)) ? `musica/${f}` : null);
const sello = son("sello.wav") || son("logo.mp3");
if (sello) process.env.LOGO = sello; else delete process.env.LOGO;
const cortinas = ["cortina-a.wav", "cortina-b.wav", "cortina-c.wav"].map(son).filter(Boolean);
if (cortinas.length) process.env.CORTINAS = cortinas.join(","); else delete process.env.CORTINAS;
const cierre = son("cierre.wav");
if (cierre) process.env.CIERRE = cierre; else delete process.env.CIERRE;
delete process.env.MUSICA;
run("build-timeline.js", [
  path.join(OUT, "parsed.json"),
  path.join(OUT, "alignment.json"),
  path.join(OUT, "timeline.json"),
  ...(audio ? [audio] : []),
]);
const tl = JSON.parse(fs.readFileSync(path.join(OUT, "timeline.json"), "utf8"));

// LA TRAMPA QUE COSTÓ ENCONTRAR (27-09-2026): el mosaico de transición es el
// único momento en que la imagen de sección se ve a pantalla completa, y
// src/Informe.tsx solo lo enciende donde la narración trae silencio de verdad
// (ev.pausaDur, que sale de pausas.json de la voz de Azure). Con la voz
// simulada no hay pausas.json, así que el video no mostraba NINGUNA imagen y
// la prueba no probaba nada. Si el video va mudo no hay voz que pisar, así que
// acá se le da al mosaico la pausa máxima que igual respeta.
if (!audio && !tl.eventos.some((e) => e.overlay && e.pausaDur)) {
  let primera = true;
  for (const ev of tl.eventos) {
    if (!ev.overlay) continue;
    if (primera) { primera = false; continue; }   // la primera sección abre con el sello
    ev.pausaDur = 2.4;
  }
  fs.writeFileSync(path.join(OUT, "timeline.json"), JSON.stringify(tl, null, 2));
  console.log("(video mudo: se le da al mosaico de sección la pausa máxima, que es lo que deja ver las imágenes)");
}

// ── 4 · las tres carátulas, las mismas que la edición real ────────────────
console.log("── 4/4 · Carátulas ──────────────────────────────");
const { miniaturas } = require("./miniaturas.js");
const { ilustracion } = miniaturas({ parsed, fecha, esClave: false, OUT });

// ── la muestra corta ──────────────────────────────────────────────────────
// Una tarjeta por sección, en el orden del guion, con la transición de
// mosaico entre una y otra: es ahí donde se ve la fila de imágenes. Los
// tiempos se recalculan y el audio se suelta, porque la voz del día no dice
// lo que queda en pantalla.
const SELLO_SEG = 2.8;      // src/Informe.tsx
const MOSAICO_SEG = 3.4;    // lo que tarda el viaje en instalarse y empezar a irse
const PORTADA_SEG = 3.5;
const construirCorto = () => {
  const SEG = Number(process.env.SEGUNDOS_POR_SECCION || 4);
  const HUECO = 0.2;
  const overlays = tl.eventos.filter((e) => e.overlay);
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const portada = ilustracion || null;
  const eventos = [];
  // Solo se puede comparar la sección que TIENE imagen de prueba: en las demás
  // los dos pases saldrían idénticos (las dos veces papel) y solo alargarían
  // la muestra sin mostrar nada.
  const conImagenPrueba = (cat) => !!cat && (tl.meta.secciones || []).some((n) => n.startsWith(`${cat}.`));
  const copiaDe = (card, desde, hasta, extra = {}) => {
    const copia = { ...card, ...extra, from: Number(desde.toFixed(3)), to: Number(hasta.toFixed(3)) };
    // las tarjetas de titulares llevan el tiempo de cada frase adentro: hay
    // que repartir la ventana nueva entre ellas o se quedan todas apagadas
    if (copia.items) {
      const paso = (hasta - desde) / copia.items.length;
      copia.items = copia.items.map((it, k) => ({ texto: it.texto,
        from: Number((desde + paso * k).toFixed(3)), to: Number((desde + paso * (k + 1)).toFixed(3)) }));
    }
    return copia;
  };
  let comparadas = 0;
  let t = (portada ? PORTADA_SEG : 0) + SELLO_SEG;
  overlays.forEach((ov, i) => {
    // el mosaico de esta sección arranca antes de ov.from y se desvanece
    // sobre la tarjeta, igual que en el informe real; la primera sección no
    // lleva mosaico (ahí abre el sello)
    const viaje = i === 0 ? 0 : MOSAICO_SEG;
    const desde = t;
    const dela = tarjetas.filter((c) => c.seccion === ov.texto);
    const card = dela.find((c) => c.tipo === "tesis") || dela[0];
    // LOS DOS PASES de --comparar: la misma tarjeta primero sobre papel y
    // enseguida sobre su imagen, pegadas. Separadas en dos videos no se
    // compara nada, porque la memoria de un fondo dura menos que el render.
    const pases = comparar && conImagenPrueba(ov.categoria) ? ["papel", "imagen"] : [null];
    if (pases.length > 1) comparadas++;
    let corre = desde;
    const tramos = [];
    for (const modo of pases) {
      // el primer pase carga además con el viaje del mosaico, que le tapa el
      // comienzo: si no se le suma, la tarjeta se ve menos que la segunda
      const hasta = corre + (corre === desde ? viaje : 0) + SEG;
      if (card) eventos.push(copiaDe(card, corre, hasta, modo ? { fondo: modo, rotulo: modo } : {}));
      // el banner de sección no está dentro de la tarjeta: si no se parte
      // igual, se queda con el color del primer pase y en el segundo no se lee
      if (modo) tramos.push({ from: Number(corre.toFixed(3)), to: Number(hasta.toFixed(3)), fondo: modo });
      corre = hasta;
    }
    const fin = corre;
    if (tramos.length) tramos[tramos.length - 1].to = Number((fin + HUECO).toFixed(3));
    eventos.push({ ...ov, ...(tramos.length ? { pases: tramos } : {}),
      from: Number(desde.toFixed(3)), to: Number((fin + HUECO).toFixed(3)),
      pausaDur: i === 0 ? null : 2.4 });
    t = fin + HUECO;
  });
  if (comparar) console.log(`(--comparar: ${comparadas} secciones se ven dos veces, papel y después imagen)`);
  // el último rótulo llega hasta el final
  const ultimo = eventos.filter((e) => e.overlay).pop();
  if (ultimo) ultimo.to = Number((t + 1.2).toFixed(3));
  return {
    ...tl,
    audio: null,
    meta: {
      ...tl.meta,
      ...(portada ? { portada, portadaSeg: PORTADA_SEG } : {}),
      selloEn: portada ? PORTADA_SEG : 0,
      inicioNarracion: 0,
      duracionSeg: Number((t + 1.2).toFixed(2)),
    },
    eventos: eventos.sort((a, b) => a.from - b.from),
  };
};

// ── la muestra corta, en modo secuencia ───────────────────────────────────
// Los tiempos los manda la secuencia aprobada (scripts/secuencia-plan.js), no
// al revés: cada sección necesita su preámbulo completo (imagen al 50%,
// título, barrido al 100%) antes de que entre el primer texto, más el viaje
// de la cámara. Si la muestra le diera a cada sección los cuatro segundos de
// siempre, la cabecera no cabría y Santiago vería otra vez algo que no es lo
// que aprobó.
const { planear, PREAMBULO_SEG, PASEO_SEG, PRESENTACION_SEG } = require("./secuencia-plan.js");
const construirCortoSecuencia = () => {
  const SEG = Number(process.env.SEGUNDOS_POR_SECCION || 4);
  const HUECO = 0.2;
  const overlays = tl.eventos.filter((e) => e.overlay);
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const portada = ilustracion || null;
  const portadaSeg = portada ? PORTADA_SEG : 0;
  const eventos = [];
  let t = portadaSeg;
  overlays.forEach((ov, i) => {
    // antes de cada bloque: nada en la principal, la presentación del mosaico
    // después de ella, y el recorrido corto en las demás
    const previo = i === 0 ? 0 : i === 1 ? PRESENTACION_SEG : PASEO_SEG;
    const preambulo = i === 0 ? 0 : PREAMBULO_SEG;
    const desde = t;
    const dela = tarjetas.filter((c) => c.seccion === ov.texto);
    const card = dela.find((c) => c.tipo === "tesis") || dela[0];
    const entra = desde + previo + preambulo;
    const sale = entra + SEG;
    if (card) {
      const copia = { ...card, from: Number(entra.toFixed(3)), to: Number(sale.toFixed(3)) };
      if (copia.items) {
        const paso = SEG / copia.items.length;
        copia.items = copia.items.map((it, k) => ({ texto: it.texto,
          from: Number((entra + paso * k).toFixed(3)), to: Number((entra + paso * (k + 1)).toFixed(3)) }));
      }
      eventos.push(copia);
    }
    eventos.push({ ...ov, from: Number(desde.toFixed(3)), to: Number((sale + HUECO).toFixed(3)) });
    t = sale + HUECO;
  });
  const ultimo = eventos.filter((e) => e.overlay).pop();
  if (ultimo) ultimo.to = Number((t + 1.2).toFixed(3));
  const base = {
    ...tl,
    audio: null,   // los tiempos son de la muestra, no de la voz de ese día
    meta: { ...tl.meta, ...(portada ? { portada, portadaSeg } : {}),
      inicioNarracion: 0, duracionSeg: Number((t + 1.2).toFixed(2)) },
    eventos: eventos.sort((a, b) => a.from - b.from),
  };
  return { ...base, meta: { ...base.meta, secuencia: planear(base, { holgado: true }) } };
};

// ── render ────────────────────────────────────────────────────────────────
const props = corto ? path.join(OUT, "timeline-corto.json") : path.join(OUT, "timeline.json");
if (corto) fs.writeFileSync(props, JSON.stringify(secuencia ? construirCortoSecuencia() : construirCorto(), null, 2));
else if (secuencia) {
  // el informe completo: los tiempos son los de la voz y no se mueven; la
  // cabecera de cada sección se acomoda al aire que haya, que es lo que
  // tendría que pasar también en producción
  const plan = planear(tl, { portada: ilustracion || null, portadaSeg: PORTADA_SEG });
  if (!plan) console.log("(esta edición no tiene secciones suficientes para la secuencia: sale el montaje de siempre)");
  else fs.writeFileSync(props, JSON.stringify({ ...tl, meta: { ...tl.meta, secuencia: plan } }, null, 2));
}
const video = path.join(OUT, `${fecha}-informe-prueba${corto ? "-corto" : ""}.mp4`);
const duracion = JSON.parse(fs.readFileSync(props, "utf8")).meta.duracionSeg;
console.log(`── Render ${corto ? "(muestra corta)" : "(informe completo)"} ─ ${(duracion / 60).toFixed(1)} min de video ─`);
const arranque = Date.now();
// --concurrency=100%: lo mismo que usa dia.js; con el default de remotion el
// render de un informe se iba a más de una hora.
execFileSync("npx", ["remotion", "render", "Informe", video, `--props=./${props}`, "--concurrency=100%",
  ...(process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : []),
], { stdio: "inherit" });

// ── el informe de la prueba ───────────────────────────────────────────────
// Lo importante no es que el render termine: es saber QUÉ sección se vio con
// imagen de prueba y cuál cayó al dibujo por código, que es justo lo que se
// está mirando.
const conImagen = (tl.meta.secciones || []).map((n) => n.replace(/\.(png|jpg)$/, ""));
const delDia = [];
for (const ev of tl.eventos) {
  if (!ev.overlay || !ev.categoria) continue;
  if (!delDia.includes(ev.categoria)) delDia.push(ev.categoria);
}
const usadas = delDia.filter((c) => conImagen.includes(c));
const dibujadas = delDia.filter((c) => !conImagen.includes(c));
const sobrantes = conImagen.filter((c) => !delDia.includes(c));
console.log("\n── Listo ─────────────────────────────────────────");
console.log(`video:       ${video}`);
for (const m of ["miniatura.png", "miniatura-2.png", "miniatura-3.png"]) {
  const r = path.join(OUT, m);
  if (fs.existsSync(r)) console.log(`miniatura:   ${r}`);
}
console.log(`timeline:    ${props}`);
console.log(`carátula:    ${ilustracion || "(ninguna: la que sale al aire es el pictograma de respaldo)"}`);
console.log(`con imagen de prueba (${usadas.length}): ${usadas.join(", ") || "ninguna"}`);
console.log(`con dibujo por código (${dibujadas.length}): ${dibujadas.join(", ") || "ninguna"}`);
console.log(secuencia
  ? "montaje: secuencia del 24-09 (la imagen dura toda la sección; la sección sin imagen va con su color y el grabado)"
  : `montaje: tarjeta por tarjeta, fondo ${fondo}${fondo === "imagen" ? " (las secciones sin imagen quedan sobre papel)" : ""}`);
if (sobrantes.length) console.log(`imágenes de prueba que esta edición no usa: ${sobrantes.join(", ")}`);
console.log(`render: ${((Date.now() - arranque) / 60000).toFixed(1)} min`);
