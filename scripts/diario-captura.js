#!/usr/bin/env node
/**
 * diario-captura.js - la página del diario de un día, capturada, y dónde
 * quedó cada noticia en esa captura.
 *
 * Por qué existe (01-11-2026, formato "Entender el caso", aprobado por
 * Santiago ese día). El largo por tema usa como escenario el diario escrito
 * tal como se ve en la web: muestra la página del día en que salió cada
 * noticia, hace zoom a esa noticia con un velo, narra y pasa al día
 * siguiente. Para hacer el zoom hace falta saber en qué píxeles está cada
 * noticia, y eso solo lo sabe un navegador que dibujó la página.
 *
 * Decisiones que vienen de errores ya pagados:
 *  - La página se construye y se sirve LOCAL (web/dist), nunca se baja de
 *    entender.sinodev.cl: el video se renderiza en Actions y no puede quedar
 *    colgado de que la web publicada esté arriba, ni de que muestre otra
 *    versión de la que dice el repo.
 *  - Se usa el Chromium sin cabeza que ya tiene el repo (el de Remotion), por
 *    las mismas variables que usan las carátulas y el taller
 *    (REMOTION_BROWSER_EXECUTABLE, CHROMIUM_TALLER). No se agrega Playwright
 *    ni Puppeteer: se habla con el navegador por su protocolo de depuración
 *    con el WebSocket que trae Node 22.
 *  - Las señales que dependen del día en que se mira ("Edición de hoy", "Para
 *    salir hoy") se esconden: la captura de un día tiene que salir igual hoy
 *    que dentro de un mes, o el video cambia según cuándo se renderice.
 *  - Se mide DESPUÉS de que cargan imágenes y tipografías: una fuente que
 *    llega tarde mueve todo el texto y las cajas quedarían corridas.
 *
 * Uso:
 *   node scripts/diario-captura.js 2026-10-24 [--noticia <slug>] [--ancho 1920] [--salida out/diario/]
 *   (--dist <carpeta> captura otro build, por ejemplo uno anterior para comparar)
 *
 * Deja out/diario/<fecha>.png (página completa, escala 1), out/diario/<fecha>.json
 * (por noticia: slug, titular, nivel, categoría y caja {x, y, ancho, alto} en
 * píxeles de la captura, más el alto total) y, con --noticia, el recorte
 * out/diario/<fecha>-<slug>.png con 60 px de margen.
 * El slug es el de scripts/slug-noticia.js, el mismo que pone la web.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const { spawn, execFileSync } = require("child_process");

const RAIZ = path.resolve(__dirname, "..");
const WEB = path.join(RAIZ, "web");
const MARGEN = 60;

const args = process.argv.slice(2);
const opt = (n, def = null) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : def; };
const fecha = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
if (!fecha) { console.error("uso: node scripts/diario-captura.js AAAA-MM-DD [--noticia <slug>] [--ancho 1920] [--salida out/diario/]"); process.exit(1); }
const ANCHO = parseInt(opt("--ancho", "1920"), 10);
const SALIDA = path.resolve(opt("--salida", path.join("out", "diario")));
const NOTICIA = opt("--noticia");
const DIST = path.resolve(opt("--dist", path.join(WEB, "dist")));

// --- 1. La página construida. Si falta, o es de un build anterior a las
// anclas (sin data-noticia), se construye; si después sigue sin estar, el
// informe de ese día no está aprobado y la web no lo publica.
const pagina = path.join(DIST, "informes", fecha, "index.html");
const conAnclas = () => fs.existsSync(pagina) && fs.readFileSync(pagina, "utf8").includes("data-noticia=");
if (!conAnclas() && !opt("--dist")) {
  console.log("construyendo la web (web/dist no tiene la página o no tiene anclas)...");
  execFileSync("npx", ["astro", "build"], { cwd: WEB, stdio: ["ignore", "ignore", "inherit"] });
}
if (!fs.existsSync(pagina)) { console.error(`no existe ${path.relative(RAIZ, pagina)}: ¿el informe del ${fecha} está aprobado?`); process.exit(1); }
if (!conAnclas()) console.warn("aviso: la página no tiene anclas por noticia; el json saldrá sin noticias");

// --- 2. El navegador: el mismo orden que el resto del repo.
const navegador = () => {
  const candidatos = [
    process.env.REMOTION_BROWSER_EXECUTABLE,
    process.env.CHROMIUM_TALLER,
    path.join(RAIZ, "node_modules", ".remotion", "chrome-headless-shell", "linux64", "chrome-headless-shell-linux64", "chrome-headless-shell"),
  ].filter(Boolean);
  let hallado = candidatos.find((c) => fs.existsSync(c));
  if (!hallado) {
    // En Actions el de Remotion se baja la primera vez que se usa.
    try { execFileSync("npx", ["remotion", "browser", "ensure"], { cwd: RAIZ, stdio: "ignore" }); } catch {}
    hallado = candidatos.find((c) => fs.existsSync(c));
  }
  if (!hallado) { console.error("no encuentro Chromium: define REMOTION_BROWSER_EXECUTABLE o CHROMIUM_TALLER"); process.exit(1); }
  return hallado;
};

// --- 3. Un servidor estático mínimo sobre web/dist: las rutas del sitio son
// absolutas (/_astro/..., /img/...), así que file:// no sirve.
const TIPOS = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".txt": "text/plain" };
const servir = () => new Promise((ok) => {
  const srv = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = path.join(DIST, path.normalize(rel).replace(/^(\.\.[/\\])+/, ""));
    if (f.startsWith(DIST) && fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!f.startsWith(DIST) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": TIPOS[path.extname(f).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  });
  srv.listen(0, "127.0.0.1", () => ok(srv));
});

// --- 4. Un cliente mínimo del protocolo de depuración de Chromium.
const conectar = (url) => new Promise((ok, mal) => {
  const ws = new WebSocket(url);
  let id = 0;
  const pendientes = new Map();
  const oyentes = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pendientes.has(m.id)) {
      const p = pendientes.get(m.id); pendientes.delete(m.id);
      m.error ? p.mal(new Error(`${p.metodo}: ${m.error.message}`)) : p.ok(m.result);
    } else if (m.method) oyentes.slice().forEach((f) => f(m));
  };
  ws.onerror = () => mal(new Error("no pude conectarme al navegador"));
  ws.onopen = () => ok({
    enviar: (metodo, params = {}, sessionId) => new Promise((o, x) => {
      const n = ++id; pendientes.set(n, { ok: o, mal: x, metodo });
      ws.send(JSON.stringify({ id: n, method: metodo, params, ...(sessionId ? { sessionId } : {}) }));
    }),
    esperar: (metodo, sessionId, ms = 30000) => new Promise((o, x) => {
      const t = setTimeout(() => x(new Error(`se cansó esperando ${metodo}`)), ms);
      const f = (m) => { if (m.method === metodo && m.sessionId === sessionId) { clearTimeout(t); oyentes.splice(oyentes.indexOf(f), 1); o(m.params); } };
      oyentes.push(f);
    }),
    cerrar: () => ws.close(),
  });
});

const lanzar = (exe, perfil) => new Promise((ok, mal) => {
  const p = spawn(exe, ["--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
    "--force-device-scale-factor=1", "--remote-debugging-port=0", `--user-data-dir=${perfil}`, "about:blank"],
    { stdio: ["ignore", "ignore", "pipe"] });
  let err = "";
  const t = setTimeout(() => mal(new Error(`el navegador no abrió:\n${err}`)), 20000);
  p.stderr.on("data", (d) => {
    err += d;
    const m = err.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearTimeout(t); ok({ proceso: p, ws: m[1] }); }
  });
  p.on("exit", (c) => { clearTimeout(t); mal(new Error(`el navegador terminó (código ${c}):\n${err}`)); });
});

// Lo que corre dentro de la página: prepara, espera y mide.
const PREPARAR = `(async () => {
  document.querySelectorAll(".salir[data-fecha], .hoy[data-fecha]").forEach((e) => { e.hidden = true; });
  document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; });
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  await Promise.race([Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))), espera(15000)]);
  await Promise.race([document.fonts.ready, espera(15000)]);
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  window.scrollTo(0, 0);
  return true;
})()`;
const MEDIR = `(() => {
  const caja = (r) => { const x = Math.floor(r.left + scrollX), y = Math.floor(r.top + scrollY);
    return { x, y, ancho: Math.ceil(r.right + scrollX) - x, alto: Math.ceil(r.bottom + scrollY) - y }; };
  return {
    alto: Math.ceil(document.documentElement.scrollHeight),
    anchoPagina: Math.ceil(document.documentElement.scrollWidth),
    noticias: [...document.querySelectorAll("[data-noticia]")].map((el) => {
      const h = el.querySelector("h3.noticia");
      return { slug: el.dataset.noticia, titular: (h || el).textContent.replace(/\\s+/g, " ").trim(),
        nivel: el.dataset.nivel, categoria: el.dataset.categoria, caja: caja(el.getBoundingClientRect()) };
    }),
  };
})()`;

(async () => {
  const exe = navegador();
  const srv = await servir();
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), "diario-captura-"));
  let nav = null, cdp = null;
  try {
    nav = await lanzar(exe, perfil);
    cdp = await conectar(nav.ws);
    const { targetId } = await cdp.enviar("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.enviar("Target.attachToTarget", { targetId, flatten: true });
    const s = (m, p) => cdp.enviar(m, p, sessionId);
    await s("Page.enable");
    await s("Emulation.setDeviceMetricsOverride", { width: ANCHO, height: 1080, deviceScaleFactor: 1, mobile: false });
    // Quieto: "En una mirada" rota sola si no se pide reducir movimiento.
    await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    const url = `http://127.0.0.1:${srv.address().port}/informes/${fecha}/`;
    const carga = cdp.esperar("Page.loadEventFired", sessionId, 60000);
    await s("Page.navigate", { url });
    await carga;
    await s("Runtime.evaluate", { expression: PREPARAR, awaitPromise: true });
    const medir = async () => (await s("Runtime.evaluate", { expression: MEDIR, returnByValue: true })).result.value;
    const m = await medir();
    if (m.anchoPagina > ANCHO) console.warn(`aviso: la página mide ${m.anchoPagina} px de ancho, más que ${ANCHO}`);

    fs.mkdirSync(SALIDA, { recursive: true });
    const corta = (p) => { const r = path.relative(process.cwd(), p); return r.startsWith("..") ? p : r; };
    const foto = async (clip, destino) => {
      const { data } = await s("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
      fs.writeFileSync(destino, Buffer.from(data, "base64"));
    };
    const png = path.join(SALIDA, `${fecha}.png`);
    await foto({ x: 0, y: 0, width: ANCHO, height: m.alto }, png);
    // Si capturar más allá de la ventana cambió el alto, las cajas no calzan.
    const despues = await medir();
    if (despues.alto !== m.alto) console.warn(`aviso: el alto cambió al capturar (${m.alto} → ${despues.alto})`);

    const salida = { fecha, pagina: `informes/${fecha}/`, ancho: ANCHO, alto: m.alto, escala: 1,
      navegador: path.basename(exe), noticias: m.noticias };
    fs.writeFileSync(path.join(SALIDA, `${fecha}.json`), JSON.stringify(salida, null, 2) + "\n");
    console.log(`${corta(png)}: ${ANCHO} x ${m.alto}, ${m.noticias.length} noticias`);

    if (NOTICIA) {
      const n = m.noticias.find((x) => x.slug === NOTICIA);
      if (!n) { console.error(`la noticia "${NOTICIA}" no está en la página del ${fecha}`); process.exitCode = 2; }
      else {
        const x = Math.max(0, n.caja.x - MARGEN), y = Math.max(0, n.caja.y - MARGEN);
        const w = Math.min(ANCHO, n.caja.x + n.caja.ancho + MARGEN) - x, h = Math.min(m.alto, n.caja.y + n.caja.alto + MARGEN) - y;
        const recorte = path.join(SALIDA, `${fecha}-${n.slug}.png`);
        await foto({ x, y, width: w, height: h }, recorte);
        console.log(`${corta(recorte)}: ${n.nivel} ${JSON.stringify(n.caja)}`);
      }
    }
  } finally {
    if (cdp) cdp.cerrar();
    // Hay que esperar que el navegador muera antes de borrar su perfil: si no,
    // sigue escribiendo en él y el borrado falla con "directory not empty".
    if (nav && nav.proceso.exitCode === null) {
      const fin = new Promise((r) => nav.proceso.once("exit", r));
      nav.proceso.kill("SIGKILL");
      await fin;
    }
    srv.close();
    try { fs.rmSync(perfil, { recursive: true, force: true, maxRetries: 3 }); } catch {}
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
