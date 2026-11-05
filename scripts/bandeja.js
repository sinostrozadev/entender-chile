#!/usr/bin/env node
/**
 * bandeja.js - Lo que espera una decisión de Santiago, en un solo archivo:
 * bitacora/bandeja.json. Encargo del 27-09-2026: "crea en el Taller un sistema
 * de notificaciones: cuando algo necesita mi aprobación, que lo pueda ver ahí".
 *
 * Por qué un json versionado y no un cálculo al vuelo dentro del Taller: lo
 * leen varias cosas distintas y ninguna puede tener su propia idea de qué
 * espera decisión. El módulo Bandeja del Taller (scripts/taller.js) lo muestra
 * con sus botones; las skills de sesión `noche` y `bitacora` lo consultan; y la
 * rutina en MODO AVISADOR
 * (prompts/validador.md) lo usa para COMPROBAR que el aviso que le pidieron
 * mandar corresponde a algo que de verdad está esperando, antes de sonar el
 * teléfono de Santiago. Un aviso falso enseña a ignorar los avisos.
 *
 * Es una vista: la verdad son los archivos. Lee
 *   contenido/estado/clave-<slug>.json   los flujos de la Clave y su etapa
 *   contenido/claves/semana/*-candidatos.md  semanas con candidatos sin elegir
 *   contenido/estado/FECHA.json          el día, por si quedó bloqueado
 *   bitacora/PENDIENTES.md               sección "Dependen de Santiago"
 *   contenido/secciones/PROMPTS-PARA-PEGAR.md   imágenes pedidas sin archivo
 *   contenido/temas/<slug>/propuesta.md  largos de "Entender el caso" propuestos
 *                                        por el seguimiento de temas (02-11-2026)
 *
 * Uso:  node scripts/bandeja.js [--solo-leer] [--fecha AAAA-MM-DD]
 *   --solo-leer imprime el json y no escribe (para probar sin tocar el repo).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const clave = require("./clave.js");
const { urlVer, urlEditar, urlFlujo, hrefArchivo } = require("./botones.js");

const RAIZ = path.join(__dirname, "..");
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const enChile = (d = new Date()) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const AHORA = enChile();
const FECHA = opt("--fecha") || AHORA.slice(0, 10);
const SALIDA = "bitacora/bandeja.json";

const existe = (p) => fs.existsSync(path.join(RAIZ, p));
const leer = (p) => (existe(p) ? fs.readFileSync(path.join(RAIZ, p), "utf8") : "");
const json = (p, def) => { try { return JSON.parse(leer(p)); } catch { return def; } };
// bandeja.json se VERSIONA, así que le aplica la regla dura 34: ni raya larga
// ni raya media en ningún archivo del repo. Los títulos salen de texto escrito
// por otros (PENDIENTES.md tiene rayas de antes de la regla), y sin esto el
// control que se corre antes de cada commit encontraría rayas en un archivo
// generado que nadie escribió a mano. Las dos rayas van como escape unicode
// (U+2014 y U+2013) y no como carácter, para que ese mismo control no se
// tropiece con la línea que existe justamente para cumplirlo.
const sinRayas = (s) => String(s ?? "").replace(/\s*[\u2014\u2013]\s*/g, ", ");
const unaLinea = (s) => sinRayas(s).replace(/\s+/g, " ").trim();
const corta = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const fechas = (n) => Array.from({ length: n }, (_, i) => { const d = new Date(`${FECHA}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - i); return d.toISOString().slice(0, 10); });

// La fecha "desde" de un ítem: cuándo quedó esperando. El commit que tocó el
// archivo es más honesto que su mtime, porque un clon fresco le pone a todos la
// hora del checkout (lo pagó la columna "Llegó" del estado diario).
let esShallow = null;
const clonCompleto = () => { if (esShallow === null) { try { esShallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: RAIZ, encoding: "utf8" }).trim() === "true"; } catch { esShallow = false; } } return !esShallow; };
const desdeDe = (ruta) => {
  try { if (clonCompleto()) { const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ruta], { cwd: RAIZ, encoding: "utf8" }).trim(); if (iso) return enChile(new Date(iso)).slice(0, 10); } } catch { /* sin git */ }
  try { return enChile(new Date(fs.statSync(path.join(RAIZ, ruta)).mtimeMs)).slice(0, 10); } catch { return FECHA; }
};

const items = [];

// ---------- 1. Los flujos de la Clave que esperan su aprobación -------------
// pauta_lista es la etapa en que la pelota es de Santiago: nadie más puede
// moverla. (Hasta el 04-11-2026 había otra, la del camino de la idea, retirado.)
const DIR_FLUJO = "contenido/claves/flujo";
const slugs = existe(DIR_FLUJO) ? fs.readdirSync(path.join(RAIZ, DIR_FLUJO), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort() : [];
const semanasElegidas = new Set();
for (const slug of slugs) {
  const base = `${DIR_FLUJO}/${slug}`;
  const sem = (leer(`${base}/tema.md`).match(/^SEMANA:\s*(\S+)/m) || [])[1];
  if (sem) semanasElegidas.add(sem);
  const e = json(`contenido/estado/clave-${slug}.json`, null);
  if (!e || e.etapa !== "pauta_lista") continue;
  const camino = "pauta";
  const pieza = "pauta";
  const rutaPieza = `${base}/${pieza}.md`;
  const rutaAprob = `${base}/aprobacion.md`;
  const miercoles = clave.proximoMiercoles(FECHA);
  const aprobar = hrefArchivo(rutaAprob, clave.contenidoAprobacion(miercoles, AHORA), RAIZ);
  const cambios = hrefArchivo(rutaAprob, clave.contenidoCambio("ESCRIBE AQUÍ LA NOTA (qué hay que cambiar)", AHORA), RAIZ);
  items.push({
    id: `clave-${slug}-${e.etapa}`,
    tipo: "clave",
    titulo: `Clave "${corta(unaLinea(e.concepto || slug), 90)}": la ${pieza} espera tu aprobación`,
    detalle: `Etapa ${e.etapa}, camino ${camino}. Al aprobar, la producción queda para el ${miercoles} y GPT recién entonces trabaja.`,
    desde: desdeDe(rutaPieza),
    archivo: rutaPieza,
    acciones: [
      { texto: `Leer la ${pieza}`, href: urlVer(rutaPieza) },
      { texto: `Aprobar la ${pieza}`, href: aprobar.href, crea: !aprobar.existe },
      { texto: "Pedir cambios", href: cambios.href, crea: !cambios.existe },
    ],
  });
}

// ---------- 1b. Los largos propuestos por el seguimiento de temas -----------
// "Entender el caso" (02-11-2026): el turno SEGUIMIENTO de la rutina validadora
// (prompts/seguimiento-temas.md) deja una propuesta.md cuando un tema tiene
// suficiente para explicarse o avanzó desde su último largo. No mueve ninguna
// etapa: espera que Santiago diga sí en la conversación con la sesión de día
// (clave.js elegir ... --tema-de, que además la cierra). Sin este ítem la
// propuesta solo existiría en el repo y en una notificación que se pierde.
const DIR_TEMAS = "contenido/temas";
const temas = existe(DIR_TEMAS) ? fs.readdirSync(path.join(RAIZ, DIR_TEMAS), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort() : [];
for (const slugTema of temas) {
  const rutaProp = `${DIR_TEMAS}/${slugTema}/propuesta.md`;
  if (!existe(rutaProp)) continue;
  const prop = leer(rutaProp);
  const rutaFicha = `${DIR_TEMAS}/${slugTema}/ficha.md`;
  const titulo = (leer(rutaFicha).match(/^#\s+(.+)$/m) || [])[1] || slugTema;
  const tipo = /^PROPUESTA:\s*actualizar/im.test(prop) ? "actualizar" : "explicar";
  // POR QUÉ puede ocupar hasta tres líneas: se junta hasta HITOS NUEVOS
  const porque = (prop.match(/^POR QUÉ:\s*([\s\S]*?)(?=^HITOS NUEVOS:|^[A-ZÁÉÍÓÚ ]+:\s|(?![\s\S]))/m) || [])[1] || "";
  const fechaProp = (prop.match(/^FECHA:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1] || desdeDe(rutaProp);
  items.push({
    id: `tema-${slugTema}-${tipo}`,
    tipo: "tema",
    titulo: `Entender el caso: "${corta(unaLinea(titulo), 90)}": propone ${tipo}`,
    detalle: unaLinea(porque) || "La propuesta no trae POR QUÉ.",
    desde: fechaProp,
    archivo: rutaProp,
    acciones: [
      { texto: "Leer la propuesta", href: urlVer(rutaProp) },
      { texto: "Leer la ficha", href: urlVer(rutaFicha) },
    ],
  });
}

// ---------- 2. El día que quedó bloqueado esperando a una persona -----------
// bloqueado_humano lo pone el validador al agotar el tope de vueltas: la cadena
// no avanza sola y nadie más que Santiago puede destrabarla.
const fechaEstado = fechas(7).find((f) => existe(`contenido/estado/${f}.json`));
if (fechaEstado) {
  const est = json(`contenido/estado/${fechaEstado}.json`, {});
  if (est.etapa === "bloqueado_humano") {
    const pieza = (est.piezas || []).find((p) => p.situacion === "bloqueada");
    const veredicto = pieza ? `contenido/veredictos/${fechaEstado}-${pieza.id}.md` : "";
    items.push({
      id: `bloqueo-${fechaEstado}`,
      tipo: "bloqueo",
      titulo: `La edición del ${fechaEstado} está BLOQUEADA${pieza ? ` en la pieza ${pieza.id}` : ""} y espera a que la destrabes`,
      detalle: "El validador agotó el tope de vueltas: la cadena no avanza sola. En el veredicto está la línea \"Para destrabar\".",
      desde: desdeDe(`contenido/estado/${fechaEstado}.json`),
      archivo: `contenido/estado/${fechaEstado}.md`,
      acciones: [
        { texto: "Ver el estado del día", href: urlVer(`contenido/estado/${fechaEstado}.md`) },
        ...(veredicto && existe(veredicto) ? [{ texto: "Leer el veredicto", href: urlVer(veredicto) }] : []),
        { texto: "Recalcular el estado", href: urlFlujo("estado.yml") },
      ],
    });
  }
}

// ---------- 3. La semana con candidatos y sin tema elegido ------------------
const DIR_SEMANA = "contenido/claves/semana";
const semanasConCandidatos = existe(DIR_SEMANA)
  ? fs.readdirSync(path.join(RAIZ, DIR_SEMANA)).filter((f) => /-candidatos\.md$/.test(f)).map((f) => f.replace("-candidatos.md", "")).sort()
  : [];
for (const semana of semanasConCandidatos) {
  if (semanasElegidas.has(semana)) continue;
  const ruta = `${DIR_SEMANA}/${semana}-candidatos.md`;
  const cands = clave.leerCandidatos(semana) || [];
  const acciones = [{ texto: "Leer los tres candidatos", href: urlVer(ruta) }];
  for (const c of cands) {
    const armado = clave.temaDeCandidato(semana, c.numero, { ahora: AHORA });
    if (!armado) continue;
    const h = hrefArchivo(armado.ruta, armado.contenido, RAIZ);
    acciones.push({ texto: `Elegir ${c.numero}: ${corta(unaLinea(c.concepto), 60)}`, href: h.href, crea: !h.existe });
  }
  items.push({
    id: `semana-${semana}`,
    tipo: "semana",
    titulo: `Semana ${semana}: hay ${cands.length} candidatos y ningún tema elegido para la Clave`,
    detalle: "Sin tema elegido no se abre el flujo, y sin flujo no hay Clave esa semana.",
    desde: desdeDe(ruta),
    archivo: ruta,
    acciones,
  });
}

// ---------- 4. Las entradas de "Dependen de Santiago" en PENDIENTES ---------
// Solo las abiertas (`- [ ]`) y solo su primera línea: la sección tiene
// entradas de treinta líneas, y la Bandeja es para decidir, no para leer.
const RUTA_PEND = "bitacora/PENDIENTES.md";
const lineasPend = leer(RUTA_PEND).split("\n");
let enSeccion = false;
lineasPend.forEach((linea, i) => {
  if (/^##\s+/.test(linea)) enSeccion = /^##\s+Dependen de Santiago\s*$/.test(linea);
  if (!enSeccion || !/^-\s\[ \]\s\*\*/.test(linea)) return;
  const texto = unaLinea(linea.replace(/^-\s\[ \]\s/, "").replace(/\*\*/g, ""));
  // la fecha con la que arranca casi toda entrada ("27-09 (domingo): ...")
  const dm = texto.match(/^(\d{2})-(\d{2})\b/);
  items.push({
    id: `pendiente-L${i + 1}`,
    tipo: "pendiente",
    titulo: corta(texto, 120),
    detalle: `Entrada de "Dependen de Santiago" en ${RUTA_PEND}, línea ${i + 1}.`,
    desde: dm ? `${FECHA.slice(0, 4)}-${dm[2]}-${dm[1]}` : desdeDe(RUTA_PEND),
    archivo: RUTA_PEND,
    acciones: [
      { texto: "Leer la entrada completa", href: `${urlVer(RUTA_PEND)}#L${i + 1}` },
      { texto: "Editar la lista", href: urlEditar(RUTA_PEND) },
    ],
  });
});

// ---------- 5. Las imágenes pedidas que todavía no tienen archivo ----------
// Las imágenes de sección se piden A MANO en el chat de ChatGPT (26-09): cada
// bloque del archivo dice "Guardar en: `ruta`". Si esa ruta no existe, ese
// pedido sigue esperando a Santiago. Se ignoran las rutas con `<placeholder>` y
// las que son un directorio: no nombran un archivo que se pueda comprobar.
const RUTA_IMG = "contenido/secciones/PROMPTS-PARA-PEGAR.md";
const lineasImg = leer(RUTA_IMG).split("\n");
lineasImg.forEach((linea, i) => {
  // la ruta puede estar en la misma línea o en la siguiente: el archivo se
  // escribe a mano y el margen de 80 columnas parte la frase donde toque
  const m = linea.match(/Guardar en:?\s*`([^`]+)`/) || (/Guardar en:?\s*$/.test(linea) ? (lineasImg[i + 1] || "").match(/^\s*`([^`]+)`/) : null);
  if (!m) return;
  const ruta = m[1];
  if (ruta.includes("<") || ruta.endsWith("/") || existe(ruta)) return;
  items.push({
    id: `imagen-${ruta}`,
    tipo: "imagen",
    titulo: `Falta la imagen ${ruta.split("/").pop()}: el prompt está listo para pegar en ChatGPT`,
    detalle: `Pedido de imagen en ${RUTA_IMG}, línea ${i + 1}. Se genera a mano en el chat y se guarda en ${ruta}.`,
    desde: desdeDe(RUTA_IMG),
    archivo: ruta,
    acciones: [{ texto: "Abrir el prompt para pegar", href: `${urlVer(RUTA_IMG)}#L${i + 1}` }],
  });
});

// LA CARÁTULA DEL DÍA (27-09-2026). Es la única imagen que no se pide a mano,
// así que no estaba en la lista de arriba, y por eso las tres que faltaron
// entre el 25 y el 27 no avisaron a nadie: Santiago se enteró viendo el video
// ya publicado. Solo cuenta si el guion del día existe: antes de eso no falta,
// todavía no toca.
const guionHoy = `contenido/guiones/informe/${FECHA}.md`;
const rutaCaratula = `contenido/caratulas/${FECHA}.png`;
const hayCaratula = ["png", "jpg", "jpeg", "webp"].some((e) => existe(`contenido/caratulas/${FECHA}.${e}`));
if (existe(guionHoy) && !hayCaratula) {
  const noPude = existe(`contenido/caratulas/${FECHA}-NO-PUDE.md`);
  const pedido = existe(`contenido/urgente/PEDIDO-caratula-${FECHA}.md`);
  const reintento = pedido ? "El reintento automático ya está pedido." : "Aún no hay pedido de reintento abierto.";
  items.push({
    id: `caratula-${FECHA}`,
    tipo: "imagen",
    titulo: "Falta la carátula del informe de hoy: el video va a salir sin portada",
    detalle: noPude
      ? `GPT dejó contenido/caratulas/${FECHA}-NO-PUDE.md con su motivo. ${reintento} Un NO-PUDE no es prueba de que no se pueda: el 27-09-2026 la causa escrita ahí era falsa y la imagen subió al segundo intento.`
      : `El turno del guion terminó sin dejarla y sin explicar por qué. ${reintento}`,
    desde: desdeDe(guionHoy),
    archivo: rutaCaratula,
    acciones: [{ texto: "Abrir el prompt de la carátula", href: urlVer("prompts/caratula-pedido.txt") }],
  });
}

// ---------- el orden: primero lo que detiene la máquina --------------------
// tema va junto a semana: los dos esperan que Santiago abra un flujo, y ninguno
// detiene una cadena que ya está corriendo
const URGENCIA = { clave: 0, bloqueo: 1, semana: 2, tema: 2, pendiente: 3, imagen: 4 };
items.sort((a, b) => (URGENCIA[a.tipo] - URGENCIA[b.tipo]) || a.desde.localeCompare(b.desde) || a.id.localeCompare(b.id));

const salida = {
  generado: AHORA,
  fecha: FECHA,
  total: items.length,
  por_tipo: items.reduce((s, it) => ({ ...s, [it.tipo]: (s[it.tipo] || 0) + 1 }), {}),
  items,
};
const texto = JSON.stringify(salida, null, 2) + "\n";
if (args.includes("--solo-leer")) { process.stdout.write(texto); process.exit(0); }
fs.mkdirSync(path.join(RAIZ, "bitacora"), { recursive: true });
fs.writeFileSync(path.join(RAIZ, SALIDA), texto);
console.log(`${SALIDA}: ${items.length} esperando decisión (${Object.entries(salida.por_tipo).map(([t, n]) => `${t} ${n}`).join(", ") || "nada"})`);
