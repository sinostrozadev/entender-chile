#!/usr/bin/env node
/**
 * impresiones.js - Impresiones de carátula y CTR, por la Reporting API.
 *
 * POR QUÉ UN SCRIPT APARTE (23-09-2026): la YouTube Analytics API NO entrega
 * impresiones de carátula. Se probaron cinco variantes el 22-09 y las cinco
 * devolvieron "The query is not supported". El dato existe solo en la
 * YouTube REPORTING API, que no responde consultas: genera un CSV por día y
 * hay que bajarlo. Reporte: channel_reach_basic_a1. Columnas que importan:
 * date, channel_id, video_id, video_thumbnail_impressions,
 * video_thumbnail_impressions_ctr. No admite filtros: se filtra el CSV acá.
 * Basta el scope yt-analytics.readonly (el mismo de la retención), no es de
 * content owners.
 *
 * DOS COSAS QUE HAY QUE SABER DE LA REPORTING API:
 *  1. El trabajo (job) se crea UNA vez. Desde ahí YouTube genera un CSV por
 *     día, solo, y los deja ~60 días. El primero tarda hasta 48 horas.
 *  2. Solo genera desde el día en que se creó el trabajo hacia adelante. No
 *     hay historia hacia atrás. Por eso este script crea el trabajo la
 *     primera vez que corre, aunque ese día no haya nada que bajar.
 *
 * Qué hace cada corrida:
 *   - busca (o crea) el trabajo channel_reach_basic_a1;
 *   - lista los reportes disponibles y baja SOLO los días que faltan
 *     (bitacora/metricas/impresiones-diario.json es la despensa cruda);
 *   - deja el resumen de 30 días en bitacora/metricas/impresiones.json, que
 *     es lo que lee metricas.js para el reporte de la mañana.
 *
 * Uso: node scripts/impresiones.js [--dias 30] [--sin-crear]
 * Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_ANALYTICS_REFRESH_TOKEN.
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const VENTANA = Number(opt("--dias", 30)) || 30;
const GUARDA = 45;            // días de crudo que se conservan en la despensa
const TIPO = "channel_reach_basic_a1";
const API = "https://youtubereporting.googleapis.com/v1";
const DIR = path.join("bitacora", "metricas");
const CRUDO = path.join(DIR, "impresiones-diario.json");
const RESUMEN = path.join(DIR, "impresiones.json");

const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const diaMenos = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_ANALYTICS_REFRESH_TOKEN } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_ANALYTICS_REFRESH_TOKEN) {
  console.log("Sin YT_CLIENT_ID / YT_CLIENT_SECRET / YT_ANALYTICS_REFRESH_TOKEN: no se miden impresiones.");
  process.exit(0);
}

const leer = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } };

// El CSV trae una fila por combinación de dimensiones (país, suscrito, etc.),
// así que hay varias filas por video y por día: se suman. El CTR se pondera
// por impresiones, nunca se promedia a secas.
function parsear(csv) {
  const lineas = csv.split("\n").filter((l) => l.trim());
  if (!lineas.length) return {};
  const cab = lineas[0].split(",").map((c) => c.trim());
  const iDia = cab.indexOf("date");
  const iVid = cab.indexOf("video_id");
  const iImp = cab.indexOf("video_thumbnail_impressions");
  const iCtr = cab.indexOf("video_thumbnail_impressions_ctr");
  if (iVid < 0 || iImp < 0) {
    console.log(`(el CSV no trae video_thumbnail_impressions; columnas: ${cab.join(" ")})`);
    return {};
  }
  const filas = [];
  let maxCtr = 0;
  for (const linea of lineas.slice(1)) {
    const c = linea.split(",");
    const impr = Number(c[iImp]);
    if (!Number.isFinite(impr) || impr <= 0) continue;
    const ctr = iCtr >= 0 ? Number(c[iCtr]) : 0;
    if (Number.isFinite(ctr) && ctr > maxCtr) maxCtr = ctr;
    filas.push({ dia: iDia >= 0 ? String(c[iDia]).trim() : null, id: String(c[iVid]).trim(), impr, ctr: Number.isFinite(ctr) ? ctr : 0 });
  }
  // La doc no deja claro si el CTR viene como fracción (0,042) o como
  // porcentaje (4,2). Se decide por el máximo del archivo y se deja dicho en
  // el log: con un CTR real de canal (2% a 10%) las dos escalas no se cruzan.
  const esPorcentaje = maxCtr > 1.5;
  const aFraccion = (x) => (esPorcentaje ? x / 100 : x);
  if (filas.length) console.log(`  CTR leído como ${esPorcentaje ? "porcentaje" : "fracción"} (máximo del archivo: ${maxCtr})`);
  const porVideo = {};
  for (const f of filas) {
    const v = (porVideo[f.id] ||= { impresiones: 0, clics: 0 });
    v.impresiones += f.impr;
    v.clics += f.impr * aFraccion(f.ctr);
  }
  for (const v of Object.values(porVideo)) v.clics = Number(v.clics.toFixed(2));
  return porVideo;
}

(async () => {
  const oauth = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  oauth.setCredentials({ refresh_token: YT_ANALYTICS_REFRESH_TOKEN });
  const pedir = async (url, extra = {}) => (await oauth.request({ url, ...extra })).data;

  // 1. el trabajo: se busca, y si no está se crea (una vez en la vida del canal)
  let job = null;
  const jobs = (await pedir(`${API}/jobs`)).jobs || [];
  job = jobs.find((j) => j.reportTypeId === TIPO) || null;
  if (!job) {
    if (args.includes("--sin-crear")) { console.log(`No existe el trabajo ${TIPO} y se pidió no crearlo.`); process.exit(0); }
    job = await pedir(`${API}/jobs`, { method: "POST", data: { reportTypeId: TIPO, name: "entender-chile-alcance" } });
    console.log(`Trabajo ${TIPO} CREADO (id ${job.id}). El primer CSV tarda hasta 48 horas y solo cubre desde hoy hacia adelante.`);
  } else {
    console.log(`Trabajo ${TIPO} ya existía (id ${job.id}, creado ${(job.createTime || "").slice(0, 10)}).`);
  }

  // 2. qué días hay y cuáles faltan
  const crudo = leer(CRUDO, { tipo: TIPO, dias: {} });
  crudo.dias ||= {};
  const desde = diaMenos(GUARDA);
  const reportes = [];
  let pagina;
  do {
    const r = await pedir(`${API}/jobs/${job.id}/reports?startTimeAtOrAfter=${desde}T00:00:00Z&pageSize=100${pagina ? `&pageToken=${pagina}` : ""}`);
    reportes.push(...(r.reports || []));
    pagina = r.nextPageToken;
  } while (pagina);

  // YouTube reprocesa días ya entregados: puede haber varios reportes para la
  // misma fecha. Vale el de createTime más nuevo.
  const porDia = {};
  for (const rep of reportes) {
    const dia = (rep.startTime || "").slice(0, 10);
    if (!dia || dia < desde) continue;
    if (!porDia[dia] || (rep.createTime || "") > (porDia[dia].createTime || "")) porDia[dia] = rep;
  }
  const faltan = Object.entries(porDia)
    .filter(([dia, rep]) => crudo.dias[dia]?.reporte !== rep.id)
    .sort((a, b) => a[0].localeCompare(b[0]));
  console.log(`Reportes disponibles: ${Object.keys(porDia).length}. Por bajar: ${faltan.length}.`);

  for (const [dia, rep] of faltan) {
    try {
      const csv = await pedir(rep.downloadUrl, { responseType: "text" });
      console.log(`  ${dia}: bajado (${String(csv).length} bytes)`);
      crudo.dias[dia] = { reporte: rep.id, videos: parsear(String(csv)) };
    } catch (e) {
      console.log(`  ${dia}: no se pudo bajar (${(e.response?.data?.error?.message || e.message).split("\n")[0].slice(0, 120)})`);
    }
  }
  // la despensa no crece para siempre
  for (const dia of Object.keys(crudo.dias)) if (dia < desde) delete crudo.dias[dia];
  crudo.actualizado = hoy;
  crudo.job = job.id;
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(CRUDO, JSON.stringify(crudo, null, 2) + "\n");

  // 3. el resumen que lee metricas.js: ventana de VENTANA días, CTR en %
  const corte = diaMenos(VENTANA);
  const videos = {};
  const dias = {};
  for (const [dia, d] of Object.entries(crudo.dias)) {
    if (dia < corte) continue;
    const totalDia = { impresiones: 0, clics: 0 };
    for (const [id, v] of Object.entries(d.videos || {})) {
      const a = (videos[id] ||= { impresiones: 0, clics: 0 });
      a.impresiones += v.impresiones;
      a.clics += v.clics;
      totalDia.impresiones += v.impresiones;
      totalDia.clics += v.clics;
    }
    if (totalDia.impresiones) dias[dia] = { impresiones: totalDia.impresiones, ctr: Number(((totalDia.clics / totalDia.impresiones) * 100).toFixed(2)) };
  }
  for (const v of Object.values(videos)) {
    v.clics = Math.round(v.clics);
    v.ctr = v.impresiones ? Number(((v.clics / v.impresiones) * 100).toFixed(2)) : 0;
  }
  const totImpr = Object.values(videos).reduce((s, v) => s + v.impresiones, 0);
  const resumen = {
    actualizado: hoy, job: job.id, tipo: TIPO, ventanaDias: VENTANA,
    desde: corte, hasta: hoy, videos, dias,
  };
  fs.writeFileSync(RESUMEN, JSON.stringify(resumen, null, 2) + "\n");
  console.log(totImpr
    ? `Resumen ${VENTANA} días: ${totImpr} impresiones en ${Object.keys(videos).length} videos, ${Object.keys(dias).length} días con datos.`
    : "Todavía no hay datos: el trabajo recién existe o YouTube aún no entrega el primer CSV (hasta 48 horas).");
})().catch((e) => {
  console.error("Impresiones:", e.response?.data?.error?.message || e.message);
  process.exit(1);
});
