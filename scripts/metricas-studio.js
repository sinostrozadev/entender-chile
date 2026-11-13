#!/usr/bin/env node
/**
 * metricas-studio.js - captura diaria de métricas (skill global `metricas-diarias`).
 * Escribe salida/metricas/AAAA-MM-DD/:
 *   - metricas.json: números públicos (curl) + lo medido por la nube (bitacora/metricas/*.json)
 *   - 4 capturas PNG de YouTube Studio (+ .txt con el texto) vía el piloto (:8777)
 *   node scripts/metricas-studio.js [--sin-capturas] [--fecha AAAA-MM-DD]
 * Idempotente: re-ejecutar actualiza la carpeta del día; una captura fallida nunca pisa una buena.
 * Convivencia: pestaña propia (/nueva) -> /cerrar -> /usar la que estaba activa; nunca lanza un piloto.
 * Sin dependencias nuevas, sin API de pago. Portado de linea-punteada/scripts/metricas.mts.
 * Se llama desde la rutina local /madrugada (paso 6), no desde Actions: el piloto solo existe en esta máquina.
 */
const fs = require("fs");
const path = require("path");

const CANAL = process.env.EC_CANAL_ID || "UCpdqApwfcKxTB5Bb24K4uAw"; // @entenderchile
const NOMBRE = process.env.EC_CANAL_NOMBRE || "Entender Chile"; // nombre visible en el selector de canales
const PILOTO = process.env.PILOTO_URL || "http://127.0.0.1:8777";
const ZONA = "America/Santiago";
const arg = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : undefined; };
const fecha = arg("--fecha") || new Intl.DateTimeFormat("en-CA", { timeZone: ZONA }).format(new Date());
const dir = path.join("salida", "metricas", fecha);
fs.mkdirSync(dir, { recursive: true });
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

// ------------------------------------------------------------ piloto
const piloto = async (ruta, params = {}, bin = false) => {
  const u = new URL(PILOTO + ruta);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const r = await fetch(u, { signal: AbortSignal.timeout(45000) });
  if (bin) return Buffer.from(await r.arrayBuffer());
  const t = await r.text();
  try { return JSON.parse(t); } catch { return t; }
};

const PANTALLAS = [
  { nombre: "1-overview", ruta: "analytics/tab-overview/period-default", espera: /Views|Visualizaciones|Watch time|Tiempo de reproducci/i },
  { nombre: "2-monetizacion", ruta: "monetization", espera: /Partner Program|Programa de Partners|subscribers|suscriptores/i },
  { nombre: "3-audiencia", ruta: "analytics/tab-build_audience/period-default", espera: /Returning viewers|Espectadores recurrentes|Unique viewers|Espectadores únicos|Subscribers|Suscriptores/i },
  { nombre: "4-contenido", ruta: "analytics/tab-content/period-default", espera: /Content|Contenido|Views|Visualizaciones/i },
];
const MALA = /Oops|don't have permission|Select a channel|Elige un canal/i;

/** Si Studio cae en otro canal de marca: "Switch account" y elegir el canal por nombre (misma cuenta de Google). */
const asegurarCanal = async (url) => {
  let texto = String(await piloto("/texto", { max: "6000" }));
  for (let i = 0; i < 3 && MALA.test(texto); i++) {
    if (/don't have permission|Oops/i.test(texto) && !/Select a channel|Elige un canal/i.test(texto)) {
      await piloto("/clicktexto", { texto: "Switch account", exacto: "1" });
      await dormir(4000);
    }
    texto = String(await piloto("/texto", { max: "6000" }));
    if (/Select a channel|Elige un canal/i.test(texto) || !texto.includes("Oops")) {
      await piloto("/clicktexto", { texto: NOMBRE, exacto: "1" });
      await dormir(6000);
    }
    await piloto("/ir", { url });
    await dormir(5000);
    texto = String(await piloto("/texto", { max: "6000" }));
  }
  return texto;
};

const capturar = async () => {
  const textos = {};
  let antes, paginas;
  try { antes = await piloto("/url"); paginas = await piloto("/paginas"); } catch { return { estado: "piloto caído", textos }; }
  let idx = Array.isArray(paginas) ? paginas.findIndex((u) => u === antes.url) : 0;
  if (idx < 0) idx = 0;
  const estado = {};
  try {
    await piloto("/nueva", { url: "about:blank" });
    for (const p of PANTALLAS) {
      const url0 = `https://studio.youtube.com/channel/${CANAL}/${p.ruta}`;
      await piloto("/ir", { url: url0 });
      let texto = "", url = "";
      for (let t = 0; t < 12; t++) { // hasta ~36 s: Studio hidrata lento
        await dormir(3000);
        url = (await piloto("/url")).url || "";
        texto = String(await piloto("/texto", { max: "6000" }));
        if (MALA.test(texto)) { texto = await asegurarCanal(url0); url = (await piloto("/url")).url || ""; if (MALA.test(texto)) break; }
        if (p.espera.test(texto) && texto.length > 300) { await dormir(2500); texto = String(await piloto("/texto", { max: "6000" })); break; }
      }
      const png = await piloto("/captura", {}, true);
      const archivo = path.join(dir, `${p.nombre}.png`);
      let veredicto = "ok";
      if (MALA.test(texto)) veredicto = "canal equivocado (el cambio de canal no funcionó)";
      else if (!url.includes(CANAL)) veredicto = `URL inesperada: ${url.slice(0, 80)}`;
      else if (!p.espera.test(texto)) veredicto = "no cargó a tiempo";
      if (veredicto === "ok") {
        fs.writeFileSync(archivo, png);
        fs.writeFileSync(path.join(dir, `${p.nombre}.txt`), texto);
        fs.rmSync(path.join(dir, `fallo-${p.nombre}.png`), { force: true });
      } else {
        fs.writeFileSync(path.join(dir, `fallo-${p.nombre}.png`), png); // evidencia; no se confunde con la buena
        if (fs.existsSync(archivo)) veredicto += " (se conserva la captura buena anterior de hoy)";
      }
      estado[p.nombre] = veredicto;
      textos[p.nombre] = texto;
    }
  } catch (e) {
    estado.error = String(e && e.message || e);
  } finally {
    try { await piloto("/cerrar"); await piloto("/usar", { i: String(idx) }); } catch { /* piloto caído */ }
  }
  return { estado, textos };
};

// ------------------------------------------------------------ números
const UA = { "user-agent": "Mozilla/5.0", "accept-language": "es-CL,es;q=0.9", cookie: "CONSENT=YES+1; SOCS=CAI" };
const html = async (url) => (await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) })).text();
const numero = (s) => {
  if (!s) return null;
  const m = String(s).match(/([\d.,]+)\s*(K|M|mil|mill)?/i);
  if (!m) return null;
  const suf = m[2] || "", t = m[1];
  // Con sufijo (1.5K, 1,5 mil) el separador es decimal; sin sufijo, "1.234"/"1,234" son miles y "7.0"/"343,9" decimales.
  let n = suf ? parseFloat(t.replace(",", ".")) : /^\d{1,3}([.,]\d{3})+$/.test(t) ? parseFloat(t.replace(/[.,]/g, "")) : parseFloat(t.replace(",", "."));
  if (/^(k|mil)$/i.test(suf)) n *= 1e3; else if (/^m/i.test(suf)) n *= 1e6;
  return Math.round(n * 10) / 10;
};

const canalPublico = async () => {
  try {
    const h = await html(`https://www.youtube.com/channel/${CANAL}`);
    const subs = h.match(/"content":"([^"]*?)\s(?:suscriptores?|subscribers?)"/i)?.[1];
    const vids = h.match(/"content":"(\d[\d.,]*)\s(?:videos?)"/i)?.[1];
    let vistas = null;
    try {
      const a = await html(`https://www.youtube.com/channel/${CANAL}/about`);
      vistas = numero(a.match(/"viewCountText":"([^"]*)"/)?.[1]);
    } catch { /* about no disponible */ }
    return { subs: numero(subs), videosPublicados: numero(vids), vistasTotales: vistas };
  } catch (e) { return { subs: null, videosPublicados: null, vistasTotales: null, error: String(e.message) }; }
};

/** Lo que midió la nube (Data API) el día más reciente: por video, para el video final. */
const medicionNube = () => {
  try {
    const d = "bitacora/metricas";
    const f = fs.readdirSync(d).filter((x) => /^\d{4}-\d{2}-\d{2}\.json$/.test(x)).sort().pop();
    if (!f) return null;
    const j = JSON.parse(fs.readFileSync(path.join(d, f), "utf8"));
    const videos = Object.entries(j.videos || {}).map(([id, v]) => ({ id, titulo: v.titulo, vistas: v.vistas, publicadoEn: v.publicado, segundos: v.durSeg ?? null, estado: v.estado }));
    return { fechaMedicion: f.replace(".json", ""), canal: j.canal ?? null, videos };
  } catch { return null; }
};

/** Mejor esfuerzo sobre el texto de Studio (el .txt queda guardado para afinar la regex). */
const deStudio = (textos) => {
  const t = textos["1-overview"] || "", m = textos["2-monetizacion"] || "";
  const tras = (s, re) => numero(s.match(re)?.[1]);
  return {
    vistas28d: tras(t, /(?:Views|Visualizaciones)\s*\n?\s*([\d.,]+\s*[KM]?)/i),
    horas28d: tras(t, /(?:Watch time \(hours\)|Tiempo de reproducción \(horas\))\s*\n?\s*([\d.,]+)/i),
    vistas48h: tras(t, /(?:48 hour views|Visualizaciones en 48 horas|Visualizaciones de las últimas 48 horas)\s*\n?\s*([\d.,]+\s*[KM]?)/i),
    ypp: m ? { subs: tras(m, /([\d.,]+)\s*\/\s*1[.,]?000/), vistasShorts90d: tras(m, /([\d.,]+\s*[KM]?)\s*\/\s*10\s*M/i), horas12m: tras(m, /([\d.,]+)\s*\/\s*4[.,]?000/) } : null,
  };
};

/** Vistas ganadas en los últimos `dias` días = vistas del canal hoy menos las de la medición de la nube de esa fecha (null si no existe). */
const deltaVistas = (dias, hoy) => {
  try {
    const d = new Date(fecha + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() - dias);
    const f = path.join("bitacora", "metricas", d.toISOString().slice(0, 10) + ".json");
    if (!fs.existsSync(f)) return null;
    return hoy - JSON.parse(fs.readFileSync(f, "utf8")).canal.vistas;
  } catch { return null; }
};

(async () => {
  // @entenderchile vive en OTRA cuenta de Google: el piloto (cuenta de Santiago) no tiene permiso en su Studio ("Oops, you don't have permission",
  // 2026-11-12: 0/4 capturas). Por defecto no se captura; EC_CAPTURAS=1 lo fuerza si algún día el piloto entra con esa cuenta.
  const sinCapturas = process.argv.includes("--sin-capturas") || process.env.EC_CAPTURAS !== "1";
  const cap = sinCapturas ? { estado: "omitidas (canal en otra cuenta de Google; piloto sin acceso)", textos: {} } : await capturar();
  const canal = await canalPublico();
  const nube = medicionNube();
  const previo = path.join(dir, "metricas.json");
  const anterior = fs.existsSync(previo) ? JSON.parse(fs.readFileSync(previo, "utf8")) : null;
  const studio = deStudio(cap.textos);
  const datosVistas = nube?.fechaMedicion === fecha ? nube.canal.vistas : (canal.vistasTotales ?? nube?.canal?.vistas ?? null);
  const datos = {
    fecha, canalId: CANAL, generadoEn: new Date().toISOString(), zona: ZONA,
    // La nube mide con la Data API (token en Actions): es la fuente buena; el curl público queda de respaldo.
    subs: nube?.fechaMedicion === fecha ? nube.canal.suscriptores : (canal.subs ?? nube?.canal?.suscriptores ?? null),
    videosPublicados: nube?.fechaMedicion === fecha ? nube.canal.videos : (canal.videosPublicados ?? nube?.canal?.videos ?? null),
    vistasTotales: nube?.fechaMedicion === fecha ? nube.canal.vistas : (canal.vistasTotales ?? nube?.canal?.vistas ?? null),
    vistas28d: studio.vistas28d ?? deltaVistas(28, datosVistas), vistas48h: studio.vistas48h ?? deltaVistas(2, datosVistas), horasTotales: studio.horas28d,
    progresoYPP: studio.ypp,
    fuentes: { numeros: "públicos (curl a youtube.com, /about para vistas)", studio: "texto de Studio, mejor esfuerzo", videos: nube ? `nube: bitacora/metricas/${nube.fechaMedicion}.json` : "sin medición de la nube" },
    capturas: cap.estado,
    medicionNube: nube ? { fecha: nube.fechaMedicion, canal: nube.canal } : null,
    videos: nube ? nube.videos : [],
    ...(anterior && typeof anterior.capturas === "object" && typeof cap.estado === "object" ? { actualizaciones: (anterior.actualizaciones || 0) + 1 } : {}),
  };
  fs.writeFileSync(previo, JSON.stringify(datos, null, 2) + "\n");
  const caps = typeof cap.estado === "string" ? cap.estado : `${Object.values(cap.estado).filter((v) => v === "ok").length}/${PANTALLAS.length} capturas ok`;
  console.log(`MÉTRICAS ${fecha} · ${datos.subs ?? "?"} subs · ${datos.videosPublicados ?? "?"} videos · ${datos.vistasTotales ?? "?"} vistas · ${caps} · ${dir}/`);
})().catch((e) => { console.error(`metricas-studio: ${e.message}`); process.exit(1); });
