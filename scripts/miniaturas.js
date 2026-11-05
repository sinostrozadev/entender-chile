#!/usr/bin/env node
/**
 * miniaturas.js - Las tres carátulas de una edición (1280x720, src/marca.tsx).
 *
 * Salió de dia.js el 27-09-2026 sin cambiarle la lógica: el video de prueba
 * (hoy en archivo/scripts/, retirado el 04-11-2026) necesitaba las mismas tres
 * carátulas que la edición real, y copiarlas habría dejado dos verdades que se
 * separan al primer ajuste. Acá vive una sola.
 *
 * Uso: miniaturas({ parsed, fecha, esClave, OUT })
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { entera, caratulaUsable } = require("./imagen-entera.js");

// Miniatura (1280x720, src/marca.tsx): la cifra principal del día + el título.
// Cifra = el primer [DATO] que eligió el guion (no los automáticos). No bloquea.
// LA ETIQUETA DE SERIE DEL INFORME (16-10-2026, decisión de Santiago sobre el
// tablero). En la grilla el informe diario y la Clave se veían iguales, y el
// que buscaba uno abría el otro. La primera idea fue la fecha del día, y se
// descartó con el dato del canal: los largos viven de la búsqueda (13,1% de
// las vistas) y casi nadie los ve el día que salen (0,7% por notificación), así
// que una fecha los envejece justo donde viven. La etiqueta dice lo mismo y no
// caduca. No es literal: el informe dura entre 3 y 4 minutos y la etiqueta
// nombra el formato, no promete el cronómetro (Santiago, 16-10).
//
// El cuerpo es 52 y no 34 porque el tablero lo mostró a 168 píxeles, que es el
// tamaño real en un teléfono: con 34 se leía como una barra gris.
//
// LA CLAVE NO LLEVA ETIQUETA, y eso no es un olvido: se reconoce por ausencia.
// Si algún día la lleva, las dos series vuelven a verse iguales.
// ABAJO A LA IZQUIERDA, no arriba (19-10-2026). Arriba fue un error mío: lo
// elegí mirando la carátula del 16-10, donde ese rincón estaba libre, y el
// tablero lo confirmó con otra del 13-10. Pero GPT compone libre y el gancho
// suele ocupar el tope: el 19-10 la etiqueta tapó "¿Hay clases mañana?" y el
// 17-10 "¿Qué cambia ahora?", con los tres informes ya publicados.
//
// Abajo a la izquierda es la única esquina libre en las tres carátulas que
// miré (escritorio, nieve, traje oscuro), y es la única que YouTube no usa:
// el reloj de duración va abajo a la DERECHA. Aun así una posición fija sobre
// una imagen que otro compone es frágil, y por eso el arreglo de fondo va en
// prompts/caratula-pedido.txt, pidiendo que esa franja quede limpia.
const ETIQUETA_INFORME = { etiqueta: "El día en 3 minutos", posicion: "abajo", cuerpo: 52 };

const miniaturas = ({ parsed, fecha, esClave = false, OUT, guion = null }) => {
  // qué ilustración terminó usando la carátula que sale al aire: el video de
  // prueba la muestra a pantalla completa en su apertura (meta.portada)
  let ilustracion = null;
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
  // Y se COMPRUEBA que ese archivo exista (28-09-2026). public/fondos/ tiene
  // diez de las doce secciones: le faltan emergencia y deporte, porque
  // emergencia nacio el 26-09 al separarla de clima y nadie le hizo su fondo.
  // Una portada de emergencia, que es de lejos la categoria mas frecuente,
  // apuntaba a un archivo inexistente y la tercera miniatura no salia. No
  // rompia la edicion, solo se perdia en silencio.
  const conArchivo = (slug) => slug && entera(path.join("public", "fondos", `seccion-${slug}.jpg`));
  const imagen = conArchivo(img) ? `fondos/seccion-${img}.jpg`
    : esClave ? "fondos/fondo-clave-vertical.png" : "fondos/seccion-regiones.jpg";
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
    // UN SOLO CAMINO DE MINIATURA (16-10-2026, pedido de Santiago). Esta rama
    // dibujaba SIEMPRE la portada por código y nunca miraba la carátula que
    // GPT hizo para esa Clave, aunque estuviera elegida y medida. El 12-10 la
    // Clave de licencias subió con la generada por código y hubo que
    // reemplazarla a mano en YouTube: dos caminos para la misma cosa, y ganaba
    // el que nadie había elegido. La de GPT vive al lado de su guion, con el
    // mismo nombre, en contenido/caratulas/claves/.
    //
    // La fecha no sirve para encontrarla: la edición corre un día y la Clave
    // puede ser de otro (el 12-10 se produjo la del 07-10). Por eso se busca
    // por el nombre del guion, que es exacto.
    let imagenGpt = null;
    if (guion) {
      const base = path.basename(guion).replace(/\.md$/, "").replace(/-imagenes$/, "");
      for (const ext of ["jpg", "png", "jpeg", "webp"]) {
        const orig = path.join("contenido", "caratulas", "claves", `${base}.${ext}`);
        if (!fs.existsSync(orig)) continue;
        const destino = path.join("public", "caratulas", path.basename(orig));
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.copyFileSync(orig, destino);
        imagenGpt = `caratulas/${path.basename(orig)}`;
        break;
      }
    }
    try {
      if (imagenGpt) {
        still("MiniaturaV5", { imagen: imagenGpt }, mini);
        ilustracion = imagenGpt;
        console.log(`Miniatura de la Clave: la carátula de GPT (${imagenGpt}), tal como salió`);
      } else {
        still("MiniaturaV2", { gancho, cifra: "", fecha: "", imagen, modo: "velo-seccion", seccion: bloquePortada || "", serie: "clave" }, mini);
        console.log(`Miniatura de la Clave: SIN carátula de GPT, sale la de respaldo por código (gancho: "${gancho}")`);
      }
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
    //                     DESDE EL 05-10-2026 la V5 no le pinta nada encima:
    //                     el gancho lo escribe GPT dentro de la imagen, así
    //                     que linea1 y linea2 ya no se le pasan. Siguen
    //                     calculándose porque las usan la V4 (el respaldo) y
    //                     la V3 (miniatura-3), que sí pintan texto.
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
    // copia a public/ porque Remotion solo sirve desde ahí.
    //
    // MODO DE PRUEBA (27-09-2026): CARATULA apunta a otro archivo (una carátula
    // que todavía se está evaluando) y la copia va a public/caratulas-prueba/,
    // no a public/caratulas/, para que la carátula real del día no quede
    // reemplazada por una de prueba sin que nadie lo vea.
    const carpeta = process.env.CARATULA ? "caratulas-prueba" : "caratulas";
    const candidatas = process.env.CARATULA
      ? [process.env.CARATULA]
      : ["png", "jpg", "jpeg", "webp"].map((ext) => path.join("contenido", "caratulas", `${fecha}.${ext}`));
    let imagenGpt = null;
    for (const orig of candidatas) {
      if (fs.existsSync(orig)) {
        // UNA ILUSTRACIÓN ROTA ES UNA ILUSTRACIÓN QUE NO ESTÁ (01-11-2026). Acá
        // no se miraba el archivo: el 31-10 llegó un .png que no era imagen y
        // el release salió sin miniatura.png, y el 01-11 uno truncado que subió
        // a YouTube como una franja arriba y el resto negro. Si no sirve, aviso
        // y se sigue buscando; sin ninguna, sale el pictograma de respaldo (V4).
        const u = caratulaUsable(orig);
        if (!u.ok) { console.warn(`Carátula: ${orig} NO SIRVE (${u.motivo}): se trata como ausente.`); continue; }
        const destino = path.join("public", carpeta, path.basename(orig));
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.copyFileSync(orig, destino);
        imagenGpt = `${carpeta}/${path.basename(orig)}`;
        break;
      }
    }
    const pictograma = { linea1, linea2, cifra, etiqueta, seccion: img || "", semilla, clima };
    const planes = [
      imagenGpt
        ? ["miniatura.png", "MiniaturaV5", { imagen: imagenGpt, ...ETIQUETA_INFORME }, `ilustración de GPT (${imagenGpt}) con la etiqueta "${ETIQUETA_INFORME.etiqueta}", clima ${clima}`]
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
    ilustracion = imagenGpt;
  }
  return { ilustracion };
};

module.exports = { miniaturas };
