#!/usr/bin/env node
/**
 * mural-flujo.js - El mural de la Clave sin pasos manuales.
 *
 * Por qué existe (23-10-2026). La Clave de la semana tenía sus tres veredictos
 * en APROBADA y no había forma de que saliera: el flujo no tenía ninguna etapa
 * para los paneles, así que nadie los pidió. Los catorce de la Clave de
 * licencias los pidió Santiago a mano, pegando un texto en una conversación de
 * GPT, y los cosió el día con una receta que vivía en la cabeza de la sesión.
 * Santiago lo dijo así: no dejes ese paso manual, ya te expliqué cómo era, y
 * debían ser de a diez por el límite de GPT.
 *
 * Lo que hace, en orden, cada vez que corre `paso`:
 *
 *   1. PIDE los paneles que faltan, en tandas de DIEZ (el tope de GPT por
 *      solicitud). La segunda tanda lleva MEDIDO el color con que terminó el
 *      último panel de la primera: sin eso el empalme entre dos conversaciones
 *      no calza, y con eso calzó en 39 sobre un umbral de 45 (mural de licencias,
 *      juntura 10 a 11). Las tres carátulas viajan en la última tanda si caben.
 *   2. Si GPT entrega a medias, REABRE el pedido solo por lo que falta, con una
 *      espera de GRACIA_MURAL_MIN minutos, porque generar diez imágenes no es
 *      instantáneo y preguntar demasiado pronto ya costó nueve días de pedidos
 *      de más con las carátulas (pedir-caratula.js, 06-10-2026). Tras dos
 *      reintentos deja NO-PUDE.md y la Clave pasa a Santiago: es mejor frenar y
 *      decirlo que insistir en silencio.
 *   3. Con todos los paneles, los COSE y los mide (mural-coser.js), ensancha
 *      solo las junturas que salieron "MIRAR DE CERCA", calcula la parada de
 *      cámara de cada sección y el velo de cada parada (mural-velos.js) y deja
 *      contenido/claves/flujo/<slug>/mural.json, que es lo que activa el formato
 *      mural en dia.js.
 *
 * Nada de esto gasta un turno de Claude: la validación es mecánica (archivo
 * entero, proporción del panel, juntura medida), que es lo que corresponde
 * cuando lo que más importa es no gastar cuota. Y TODO se puede apagar: un
 * archivo formato-clasico.txt en el flujo lo saca de este camino.
 *
 * uso:
 *   node scripts/mural-flujo.js paso [--slug S] [--seco]
 *   node scripts/mural-flujo.js armar --slug S [--paneles <dir>] [--publico <dir>] [--json <ruta>]
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { entera } = require("./imagen-entera.js");

const RAIZ = path.resolve(__dirname, "..");
const TOPE = Number(process.env.TOPE_IMAGENES || 10);      // máximo de imágenes por solicitud a GPT
const GRACIA_MIN = Number(process.env.GRACIA_MURAL_MIN || 45);
const REINTENTOS = 2;
const NCARATULAS = 3;
const ANCHO = 2520, ALTO = 1080;
const OFFSET_PARADA = 440;      // la cámara de 1920 de ancho deja el motivo (mitad derecha) a la vista
const EXT = ["jpg", "jpeg", "png", "webp"];

// OJO: path.join(raiz, "/ruta/absoluta") CONCATENA en vez de respetarla, y una
// prueba con --publico fuera del repo terminó escribiendo adentro (23-10-2026).
const R = (p, raiz = RAIZ) => (path.isAbsolute(p) ? p : path.join(raiz, p));
const hay = (p, raiz = RAIZ) => fs.existsSync(R(p, raiz));
const leer = (p, raiz = RAIZ) => (hay(p, raiz) ? fs.readFileSync(R(p, raiz), "utf8") : "");
const dos = (n) => String(n).padStart(2, "0");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d; };

// Un guion y lo que lo rodea. Devuelve null si todavía no hay con qué trabajar.
function contexto(slug, raiz = RAIZ) {
  const aprob = leer(`contenido/claves/flujo/${slug}/aprobacion.md`, raiz);
  const fecha = (aprob.match(/^APROBADA:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1];
  if (!fecha) return null;
  const base = `${fecha}-${slug}`;
  const guion = `contenido/guiones/claves/${base}.md`;
  if (!hay(guion, raiz)) return null;
  const cuerpo = leer(guion, raiz).split(/^Fuentes:\s*$/m)[0];
  const n = (cuerpo.match(/^##\s+/gm) || []).length;
  const imagenes = `contenido/guiones/claves/${base}-imagenes.md`;
  const textoImg = leer(imagenes, raiz);
  // las carátulas que GPT escribió en su archivo de prompts visuales
  const caratulas = [];
  for (let k = 1; k <= NCARATULAS; k++) {
    const m = textoImg.match(new RegExp(`^##\\s+Carátula ${k}\\s*\\n+([\\s\\S]*?)(?=\\n##\\s|$)`, "m"));
    if (m && m[1].trim()) caratulas.push({ k, texto: m[1].trim() });
  }
  return { slug, fecha, base, guion, imagenes, n, caratulas,
    dirPaneles: `contenido/claves/flujo/${slug}/paneles`, dirCaratulas: "contenido/caratulas/claves" };
}

// la ruta de una imagen si existe en cualquier extensión Y viene entera
function buscar(sinExt, raiz = RAIZ) {
  for (const e of EXT) {
    const p = `${sinExt}.${e}`;
    if (hay(p, raiz) && entera(R(p, raiz))) return p;
  }
  return null;
}
const rutaPanel = (ctx, k) => `${ctx.dirPaneles}/panel-${dos(k)}`;
const rutaCaratula = (ctx, k) => `${ctx.dirCaratulas}/${ctx.base}-${k}`;

// Las tandas: diez por solicitud. Los paneles primero y en orden, porque la
// segunda depende del color con que terminó la primera. Las carátulas entran en
// la última si caben; si no, en una tanda propia.
function tandas(ctx) {
  const ts = [];
  for (let i = 1; i <= ctx.n; i += TOPE) {
    ts.push({ numero: ts.length + 1, items: Array.from({ length: Math.min(TOPE, ctx.n - i + 1) }, (_, j) => ({ tipo: "panel", k: i + j })) });
  }
  const car = ctx.caratulas.map((c) => ({ tipo: "caratula", k: c.k }));
  if (car.length) {
    const ult = ts[ts.length - 1];
    if (ult && ult.items.length + car.length <= TOPE) ult.items.push(...car);
    else ts.push({ numero: ts.length + 1, items: car });
  }
  return ts;
}
const rutaDe = (ctx, it) => (it.tipo === "panel" ? rutaPanel(ctx, it.k) : rutaCaratula(ctx, it.k));
const falta = (ctx, it, raiz = RAIZ) => !buscar(rutaDe(ctx, it), raiz);

// Lo que sabe el estado de la Clave: pura lectura de archivos, sin sharp.
function situacion(slug, raiz = RAIZ) {
  const ctx = contexto(slug, raiz);
  if (!ctx) return { ctx: null };
  const ts = tandas(ctx);
  const faltan = ts.flatMap((t) => t.items.filter((it) => falta(ctx, it, raiz)));
  const panelesFaltan = faltan.filter((it) => it.tipo === "panel").length;
  return {
    ctx, tandas: ts, faltan: faltan.length, panelesFaltan,
    // las carátulas no frenan el mural: el formato sale con la de respaldo si no llegan
    panelesCompletos: panelesFaltan === 0,
    mural: hay(`contenido/claves/flujo/${slug}/mural.json`, raiz),
    clasico: hay(`contenido/claves/flujo/${slug}/formato-clasico.txt`, raiz),
    // un guion con marcas [DIARIO AAAA-MM-DD | slug] sale sobre la página del
    // diario y no lleva mural (04-11-2026): sin esto el piloto del diario caía
    // a "paneles" y se le pedían a GPT imágenes que el video no iba a usar
    diario: /^\[DIARIO \d{4}-\d{2}-\d{2} \|/m.test(leer(ctx.guion, raiz)),
    noPude: hay(`${ctx.dirPaneles}/NO-PUDE.md`, raiz),
    // pausa.txt: Santiago (o el día) frena un flujo sin tocar su estado. Existe porque
    // este script pide imágenes SOLO, y pedirlas es gastar cuota de GPT: si el tema se
    // está reevaluando, esperar cuesta cero y pedir cuesta catorce imágenes.
    pausa: hay(`contenido/claves/flujo/${slug}/pausa.txt`, raiz) || hay(`contenido/claves/flujo/${slug}/veto.txt`, raiz) || hay("contenido/estado/veto-clave.txt", raiz),  // veto de Santiago (12-11-2026) también frena los pedidos
  };
}

const edadMin = (ruta) => {
  try {
    const t = execFileSync("git", ["log", "-1", "--format=%ct", "--", ruta], { cwd: RAIZ, encoding: "utf8" }).trim();
    return t ? (Date.now() / 1000 - Number(t)) / 60 : null;
  } catch { return null; }
};

const pedidosDe = (slug, t) => {
  const dir = R("contenido/urgente");
  if (!fs.existsSync(dir)) return [];
  const re = new RegExp(`^PEDIDO-mural-${slug}-t${t}(?:r(\\d+))?\\.md$`);
  return fs.readdirSync(dir).map((f) => ({ f, m: f.match(re) })).filter((x) => x.m)
    .map((x) => ({ f: x.f, ruta: `contenido/urgente/${x.f}`, r: Number(x.m[1] || 0) })).sort((a, b) => a.r - b.r);
};

// el color con que terminó un panel, en tres franjas: es lo que se le pasa a la
// tanda siguiente para que empiece exactamente donde terminó la anterior
async function colorDeEntrega(ruta) {
  const sharp = cargarSharp();
  const meta = await sharp(R(ruta)).metadata();
  const franja = 300, alto = Math.floor(meta.height / 3);
  const hex = [];
  for (let i = 0; i < 3; i++) {
    const st = await sharp(R(ruta)).extract({ left: meta.width - franja, top: i * alto, width: franja, height: alto }).stats();
    hex.push("#" + st.channels.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, "0")).join("").toUpperCase());
  }
  return `${hex[0]} arriba, ${hex[1]} medio, ${hex[2]} abajo`;
}
function cargarSharp() {
  return require(process.env.SHARP_DIR ? path.resolve(process.env.SHARP_DIR) : "sharp");
}

// El texto del pedido de paneles lo arma mural-pedido.js, que ya existe y ya
// trae las reglas y la cadena de superficies. Acá solo se le quita lo que no
// hace falta en un reintento.
function promptPaneles(ctx, tanda, entrega, soloEstos) {
  const args = ["scripts/mural-pedido.js", "--guion", ctx.guion, "--imagenes", ctx.imagenes, "--tanda", String(tanda)];
  if (entrega) args.push("--entrega", entrega);
  let out = execFileSync("node", args, { cwd: RAIZ, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  if (soloEstos) {
    const [antes, despues] = out.split("LOS MOTIVOS, uno por panel:");
    const bloques = (despues || "").split(/\n(?=Panel \d+ ·)/).filter(Boolean);
    const quedan = bloques.filter((b) => soloEstos.has(Number((b.match(/^Panel (\d+)/) || [])[1])) || !/^Panel \d+/.test(b));
    out = antes + "LOS MOTIVOS, uno por panel (solo los que faltan):\n" + quedan.join("\n");
  }
  return out;
}

function armarPedido(ctx, tanda, items, retry, entrega) {
  const paneles = items.filter((it) => it.tipo === "panel");
  const caratulas = items.filter((it) => it.tipo === "caratula");
  const rutaFinal = (it) => `${rutaDe(ctx, it)}.jpg`;
  const ultimo = items[items.length - 1];
  const L = [];
  L.push(`# PEDIDO · mural de la Clave ${ctx.slug} · tanda ${tanda.numero}${retry ? ` (reintento ${retry})` : ""}`);
  L.push("Tarea: imagen");
  L.push(`Salida: ${rutaFinal(ultimo)}`);
  L.push("Prompt: va completo más abajo, en este mismo archivo");
  L.push(`Pedido por: scripts/mural-flujo.js (estado-clave.yml), porque la Clave ${ctx.base} tiene el guion aprobado y le faltan estas imágenes.`);
  L.push("");
  L.push(`ENTREGAS: ${items.length} imágenes en ESTE mismo turno (el máximo por solicitud es ${TOPE}), una por archivo, con EXACTAMENTE estos nombres y rutas, en JPEG:`);
  L.push("");
  for (const it of items) {
    L.push(`- ${rutaFinal(it)}   <- ${it.tipo === "panel" ? `Panel ${it.k}` : `Carátula ${it.k}`}`);
  }
  L.push("");
  L.push("Los paneles miden 2520 x 1080 píxeles y las carátulas 1920 x 1080. Si alguna no puedes generarla, déjala fuera y entrega el resto:");
  L.push("el sistema reabre el pedido SOLO por las que falten. No discutas con una nota, reintenta (regla del canal desde el 27-09-2026).");
  L.push("");
  if (paneles.length) {
    L.push("=== PANELES ===");
    L.push("");
    L.push(promptPaneles(ctx, tanda.numero, entrega, retry ? new Set(paneles.map((p) => p.k)) : null).trim());
    L.push("");
  }
  if (caratulas.length) {
    L.push("=== CARÁTULAS (no son paneles: son imágenes sueltas, una por prompt) ===");
    L.push("");
    for (const it of caratulas) {
      const c = ctx.caratulas.find((x) => x.k === it.k);
      L.push(`Carátula ${it.k} -> ${rutaFinal(it)}`);
      L.push(c.texto);
      L.push("");
    }
  }
  return L.join("\n") + "\n";
}

// Abre, si corresponde, el pedido de la primera tanda incompleta.
async function pedir(slug, { seco = false } = {}) {
  const s = situacion(slug);
  if (!s.ctx) return { accion: "nada", motivo: "sin guion aprobado" };
  if (s.noPude) return { accion: "bloqueado", motivo: "hay un NO-PUDE.md: espera a Santiago" };
  const ctx = s.ctx;
  const tanda = s.tandas.find((t) => t.items.some((it) => falta(ctx, it)));
  if (!tanda) return { accion: "nada", motivo: "no falta nada" };
  const faltan = tanda.items.filter((it) => falta(ctx, it));

  const previos = pedidosDe(slug, tanda.numero);
  const ultimo = previos[previos.length - 1];
  if (ultimo) {
    const edad = edadMin(ultimo.ruta);
    if (edad !== null && edad < GRACIA_MIN) {
      return { accion: "espera", motivo: `el pedido ${path.basename(ultimo.ruta)} tiene ${edad.toFixed(0)} min y la gracia es de ${GRACIA_MIN}` };
    }
    if (ultimo.r >= REINTENTOS) {
      const nota = `# GPT no entregó el mural de ${ctx.slug}\n\nDespués de ${previos.length} pedidos de la tanda ${tanda.numero} siguen faltando:\n\n` +
        faltan.map((it) => `- ${rutaDe(ctx, it)}`).join("\n") +
        `\n\nEl flujo queda frenado en la etapa bloqueado_humano. Para seguir: dejar esas imágenes a mano en la ruta indicada, o borrar este archivo para que se vuelva a pedir.\n`;
      if (!seco) fs.writeFileSync(R(`${ctx.dirPaneles}/NO-PUDE.md`), nota);
      return { accion: "no-pude", motivo: `tras ${previos.length} pedidos faltan ${faltan.length} imágenes` };
    }
  }
  const retry = ultimo ? ultimo.r + 1 : 0;

  // la entrega medida del panel anterior, si esta tanda no arranca en el panel 1
  let entrega = "";
  const primerPanel = tanda.items.find((it) => it.tipo === "panel");
  if (primerPanel && primerPanel.k > 1) {
    const prev = buscar(rutaPanel(ctx, primerPanel.k - 1));
    if (!prev) return { accion: "espera", motivo: `falta el panel ${primerPanel.k - 1}, que es de donde sale el color de entrega` };
    entrega = await colorDeEntrega(prev);
  }
  const nombre = `PEDIDO-mural-${slug}-t${tanda.numero}${retry ? `r${retry}` : ""}.md`;
  const cuerpo = armarPedido(ctx, tanda, faltan, retry, entrega);
  if (!seco) {
    fs.mkdirSync(R("contenido/urgente"), { recursive: true });
    fs.mkdirSync(R(ctx.dirPaneles), { recursive: true });
    fs.writeFileSync(R(`contenido/urgente/${nombre}`), cuerpo);
  }
  return { accion: "pidio", pedido: `contenido/urgente/${nombre}`, imagenes: faltan.length, tanda: tanda.numero, retry, entrega, cuerpo };
}

// Coser, medir y dejar el mural.json. opciones permite probarlo contra otros
// paneles sin tocar el repo.
async function armar(slug, opciones = {}) {
  const sharp = cargarSharp();
  const ctx = contexto(slug) || { slug, base: slug, n: 0, dirPaneles: "", caratulas: [] };
  const dirPaneles = opciones.paneles || ctx.dirPaneles;
  const publico = opciones.publico || `public/claves/${slug}`;
  const rutaJson = opciones.json || `contenido/claves/flujo/${slug}/mural.json`;
  const tmp = R(`out/mural-${slug}`);
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });

  // 1. los paneles, normalizados. Uno con otra proporción se borra y se vuelve a pedir.
  const invalidos = [];
  const n = opciones.n || ctx.n;
  for (let k = 1; k <= n; k++) {
    const origen = opciones.paneles
      ? EXT.map((e) => `${dirPaneles}/panel-${dos(k)}.${e}`).find((p) => hay(p))
      : buscar(`${dirPaneles}/panel-${dos(k)}`);
    if (!origen) { invalidos.push({ k, por: "no está" }); continue; }
    const m = await sharp(R(origen)).metadata();
    const razon = m.width / m.height;
    if (Math.abs(razon - ANCHO / ALTO) / (ANCHO / ALTO) > 0.12) {
      invalidos.push({ k, por: `proporción ${razon.toFixed(2)} y se esperaba ${(ANCHO / ALTO).toFixed(2)}`, origen });
      continue;
    }
    await sharp(R(origen)).resize(ANCHO, ALTO, { fit: "fill" }).jpeg({ quality: 92 }).toFile(path.join(tmp, `panel-${dos(k)}.jpg`));
  }
  if (invalidos.length) {
    if (!opciones.paneles) for (const x of invalidos) if (x.origen) fs.unlinkSync(R(x.origen));
    return { ok: false, invalidos };
  }

  // 2. coser. Una pasada limpia; si alguna juntura queda "MIRAR DE CERCA" se
  // ensancha solo esa y se vuelve a coser una vez (el mural de licencias
  // ensanchó tres de trece junturas).
  const coser = (anchas) => execFileSync("node", ["scripts/mural-coser.js", "--paneles", tmp, "--salida", path.join(R(publico), "mural"),
    "--anchas", anchas.join(","), "--crudo", path.join(tmp, "mural.raw")], { cwd: RAIZ, encoding: "utf8", maxBuffer: 1 << 26 });
  const marcadas = (txt) => [...txt.matchAll(/^\s*(\d+)->\s*\d+\s+\d+\s+[\d.]+\s+[\d.]+\s+MIRAR DE CERCA/gm)].map((m) => Number(m[1]));
  let salida = coser([]);
  const ensanchadas = marcadas(salida);
  if (ensanchadas.length) salida = coser(ensanchadas);
  const sigue = marcadas(salida);
  const offsets = (salida.match(/offsets de panel:\s*(.+)/) || [])[1].trim().split(/\s+/).map(Number);
  const anchoMural = Number((salida.match(/anchoMural para el guion:\s*(\d+)/) || [])[1]);

  // 3. paradas y velos
  const paradas = offsets.map((o) => o + OFFSET_PARADA);
  const trozos = [1, 2, 3].map((i) => `${path.relative(R("public"), R(publico)).replace(/\\/g, "/")}/mural-${i}.jpg`);
  const guionTmp = path.join(tmp, "guion.json");
  fs.writeFileSync(guionTmp, JSON.stringify({ mural: trozos, anchoMural, viajeSeg: 1.5, paradas }));
  execFileSync("node", ["scripts/mural-velos.js", "--crudo", path.join(tmp, "mural.raw"), "--meta", path.join(tmp, "mural.raw.json"),
    "--guion", guionTmp, "--objetivo", "7"], { cwd: RAIZ, encoding: "utf8", maxBuffer: 1 << 26 });
  const velos = JSON.parse(fs.readFileSync(guionTmp, "utf8")).velos;

  const nota = `Material del mural de esta Clave (lo lee scripts/clave-mural.js). Cosido por scripts/mural-flujo.js. ` +
    `Paradas: el inicio de cada panel más ${OFFSET_PARADA}, que deja el motivo (mitad derecha) a la vista. ` +
    (ensanchadas.length ? `Junturas ensanchadas por salir MIRAR DE CERCA: ${ensanchadas.join(", ")}. ` : "Ninguna juntura necesitó ensancharse. ") +
    (sigue.length ? `Siguen marcadas tras ensanchar, para mirarlas a ojo: ${sigue.join(", ")}.` : "Todas las junturas salieron invisibles.");
  fs.mkdirSync(path.dirname(R(rutaJson)), { recursive: true });
  fs.writeFileSync(R(rutaJson), JSON.stringify({ nota, trozos, anchoMural, viajeSeg: 1.5, paradas, velos }, null, 2) + "\n");

  // la carátula por defecto es la primera, y solo si no hay una elegida
  if (!opciones.paneles && ctx.caratulas.length) {
    const elegida = buscar(`${ctx.dirCaratulas}/${ctx.base}`);
    const primera = buscar(rutaCaratula(ctx, 1));
    if (!elegida && primera) fs.copyFileSync(R(primera), R(`${ctx.dirCaratulas}/${ctx.base}${path.extname(primera)}`));
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return { ok: true, rutaJson, paradas, velos, ensanchadas, sigue, anchoMural };
}

// Un paso del flujo, para todos los flujos que lo necesiten.
async function paso({ slug, seco } = {}) {
  const dir = R("contenido/claves/flujo");
  const slugs = slug ? [slug] : (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name) : []);
  const resumen = [];
  for (const sl of slugs) {
    const s = situacion(sl);
    if (!s.ctx) continue;
    if (s.mural || s.clasico) continue;               // ya tiene su mural, o salió por el camino clásico
    if (s.pausa) { resumen.push(`${sl}: en pausa (pausa.txt), no se pide nada`); continue; }
    // la Clave tiene que estar aprobada de verdad: el guion con su veredicto vigente
    const v = leer(`contenido/veredictos/clave-${sl}-guion.md`);
    if (!/^VEREDICTO:\s*APROBADA/im.test(v)) continue;
    for (let vuelta = 0; vuelta < 2; vuelta++) {
      const s2 = situacion(sl);
      if (s2.noPude) { resumen.push(`${sl}: bloqueado (NO-PUDE.md)`); break; }
      if (s2.panelesCompletos) {
        if (seco) { resumen.push(`${sl}: todos los paneles están, se coserían`); break; }
        const r = await armar(sl);
        if (r.ok) { resumen.push(`${sl}: mural armado (${r.paradas.length} paradas${r.ensanchadas.length ? `, ensanchadas ${r.ensanchadas.join(",")}` : ""})`); break; }
        resumen.push(`${sl}: ${r.invalidos.length} panel(es) inservibles, se vuelven a pedir: ${r.invalidos.map((x) => `${x.k} (${x.por})`).join("; ")}`);
        continue;
      }
      const r = await pedir(sl, { seco });
      resumen.push(`${sl}: ${r.accion}${r.pedido ? ` -> ${r.pedido} (${r.imagenes} imágenes, tanda ${r.tanda}${r.retry ? `, reintento ${r.retry}` : ""})` : ""}${r.motivo ? ` · ${r.motivo}` : ""}`);
      break;
    }
  }
  return resumen;
}

module.exports = { contexto, situacion, tandas, pedir, armar, paso };

if (require.main === module) {
  const orden = process.argv[2];
  process.chdir(RAIZ);
  (async () => {
    if (orden === "paso") {
      const r = await paso({ slug: arg("slug", ""), seco: process.argv.includes("--seco") });
      console.log(r.length ? r.join("\n") : "mural-flujo: nada que hacer");
    } else if (orden === "armar") {
      const r = await armar(arg("slug"), { paneles: arg("paneles", ""), publico: arg("publico", ""), json: arg("json", ""), n: Number(arg("n", 0)) || undefined });
      console.log(JSON.stringify(r, null, 2).slice(0, 1500));
      if (!r.ok) process.exit(1);
    } else {
      console.error("uso: mural-flujo.js paso [--slug S] [--seco] | armar --slug S [--paneles dir] [--publico dir] [--json ruta] [--n N]");
      process.exit(2);
    }
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
