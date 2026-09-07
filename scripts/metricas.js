#!/usr/bin/env node
/**
 * metricas.js - Las métricas del canal, cada mañana, al repo.
 *
 * Escribe bitacora/metricas/FECHA.md (legible) y FECHA.json (para calcular
 * deltas al día siguiente). Fase 1: Data API (vistas, me gusta, comentarios,
 * suscriptores). La retención y el swipe-away vendrán cuando se reautorice
 * con el scope de Analytics (fase 2, ver PENDIENTES).
 *
 * Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 * El análisis lo hace la sesión de la mañana leyendo estos archivos.
 */
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());
const DIR = path.join("bitacora", "metricas");
// --solo-panel: no toca YouTube ni la medición del día; solo reconstruye
// proyeccion.json y los bloques SERIE/HIST del panel desde los json ya medidos.
const soloPanel = process.argv.includes("--solo-panel");

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
if (!soloPanel && (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN)) { console.log("Sin secrets de YouTube: sin métricas."); process.exit(0); }

// suma de vistas video por video de una medición (todos los subidos)
const sumaVistas = (medicion) => Object.values(medicion?.videos || {}).reduce((s, v) => s + v.vistas, 0);

(async () => {
  if (soloPanel) { reconstruirHistorico(); return; }
  const o = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  o.setCredentials({ refresh_token: YT_REFRESH_TOKEN });
  const yt = google.youtube({ version: "v3", auth: o });

  const ch = (await yt.channels.list({ mine: true, part: ["statistics", "contentDetails"] })).data.items[0];
  const canal = { suscriptores: +ch.statistics.subscriberCount, vistas: +ch.statistics.viewCount, videos: +ch.statistics.videoCount };
  const subidos = (await yt.playlistItems.list({ playlistId: ch.contentDetails.relatedPlaylists.uploads, part: ["contentDetails"], maxResults: 50 })).data.items.map((i) => i.contentDetails.videoId);
  const videos = {};
  for (let i = 0; i < subidos.length; i += 50) {
    const r = await yt.videos.list({ id: subidos.slice(i, i + 50), part: ["snippet", "statistics", "status", "contentDetails"] });
    for (const v of r.data.items) {
      const m = (v.contentDetails?.duration || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const durSeg = m ? (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0)) : 0;
      videos[v.id] = {
        titulo: v.snippet.title.slice(0, 60), publicado: v.snippet.publishedAt.slice(0, 10), estado: v.status.privacyStatus,
        vistas: +(v.statistics.viewCount || 0), meGusta: +(v.statistics.likeCount || 0), comentarios: +(v.statistics.commentCount || 0),
        durSeg,
      };
    }
  }

  // deltas contra el json anterior más reciente
  fs.mkdirSync(DIR, { recursive: true });
  const previos = fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && f < `${fecha}.json`).sort();
  const prev = previos.length ? JSON.parse(fs.readFileSync(path.join(DIR, previos[previos.length - 1]), "utf8")) : null;
  const d = (ahora, antes) => (antes == null ? "" : (ahora - antes >= 0 ? ` (+${ahora - antes})` : ` (${ahora - antes})`));

  // ARREGLO 3 (01-09): las "vistas totales" son la SUMA por video, no el
  // contador del canal (channels.list.viewCount), que en canales con Shorts
  // va con rezago y descuadra (marcaba 135 cuando la tabla sumaba 372).
  // El contador del canal se conserva aparte, como referencia.
  const vistasTotales = Object.values(videos).reduce((s, v) => s + v.vistas, 0);

  // RETENCIÓN (06-09): YouTube Analytics, scope yt-analytics.readonly, token
  // aparte (YT_ANALYTICS_REFRESH_TOKEN). Es la serie que de verdad decide si
  // las 4.000 horas son alcanzables: vistas × duración × retención. Si el token
  // no está, el reporte sale igual y lo dice; nunca bloquea las métricas.
  let retencion = null;
  if (process.env.YT_ANALYTICS_REFRESH_TOKEN) {
    try {
      const oa = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
      oa.setCredentials({ refresh_token: process.env.YT_ANALYTICS_REFRESH_TOKEN });
      const an = google.youtubeAnalytics({ version: "v2", auth: oa });
      const desde = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
      const r = await an.reports.query({
        ids: "channel==MINE", startDate: desde, endDate: fecha,
        metrics: "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage",
        dimensions: "video", sort: "-estimatedMinutesWatched", maxResults: 200,
      });
      retencion = {};
      for (const [id, v, min, seg, pct] of r.data.rows || []) {
        retencion[id] = { vistas: v, minutos: min, segProm: seg, pct: Number(pct.toFixed(1)) };
      }
    } catch (e) {
      console.log(`(retención no disponible: ${e.message.split("\n")[0]})`);
    }
  }
  const publicos = Object.values(videos).filter((v) => v.estado === "public").length;
  const lineas = [
    `# Métricas · ${fecha.split("-").reverse().join("-")}`,
    "",
    `Canal: **${canal.suscriptores} suscriptores**${d(canal.suscriptores, prev?.canal?.suscriptores)} · ` +
    `**${vistasTotales} vistas totales**${d(vistasTotales, prev ? sumaVistas(prev) : null)} (suma por video; el contador del canal marca ${canal.vistas}, va con rezago) · ` +
    `${Object.keys(videos).length} subidos, ${publicos} públicos.` +
    (prev ? ` (vs ${previos[previos.length - 1].replace(".json", "")})` : " (línea base, sin comparación)"),
    "",
    retencion ? "| Video | Estado | Vistas | Min. vistos | % visto | Me gusta |"
              : "| Video | Estado | Vistas | Me gusta | Coment. |",
    retencion ? "|---|---|---|---|---|---|" : "|---|---|---|---|---|",
  ];
  const orden = Object.entries(videos).sort((a, b) => (a[1].publicado < b[1].publicado ? 1 : -1));
  for (const [id, v] of orden) {
    const pv = prev?.videos?.[id];
    const re = retencion?.[id];
    lineas.push(retencion
      ? `| ${v.titulo} | ${v.estado} | ${v.vistas}${d(v.vistas, pv?.vistas)} | ${re ? re.minutos : "-"} | ${re ? re.pct + "%" : "-"} | ${v.meGusta}${d(v.meGusta, pv?.meGusta)} |`
      : `| ${v.titulo} | ${v.estado} | ${v.vistas}${d(v.vistas, pv?.vistas)} | ${v.meGusta}${d(v.meGusta, pv?.meGusta)} | ${v.comentarios}${d(v.comentarios, pv?.comentarios)} |`);
  }
  if (retencion) {
    const esShort = (id) => (videos[id]?.durSeg ?? 0) > 0 && (videos[id]?.durSeg ?? 0) <= 75;
    let minLargos = 0, pesoPct = 0, pesoVistas = 0;
    for (const [id, r] of Object.entries(retencion)) {
      if (esShort(id)) continue;
      minLargos += r.minutos; pesoPct += r.pct * r.vistas; pesoVistas += r.vistas;
    }
    lineas.push("",
      `**Retención real (Analytics, últimos 30 días):** ${(minLargos / 60).toFixed(1)} horas vistas en videos LARGOS ` +
      `(las que cuentan para el YPP) · retención media ponderada de los largos: ${pesoVistas ? (pesoPct / pesoVistas).toFixed(1) : "-"}%.`,
      "Las horas de esta línea son medidas, no estimadas: sustituyen al cálculo de vistas × duración × 40%.", "");
  } else {
    lineas.push("", "Retención: sin YT_ANALYTICS_REFRESH_TOKEN en el entorno (la métrica queda fuera, el resto no se afecta).", "");
  }
  fs.writeFileSync(path.join(DIR, `${fecha}.md`), lineas.join("\n"));
  fs.writeFileSync(path.join(DIR, `${fecha}.json`), JSON.stringify({ fecha, canal, videos, ...(retencion ? { retencion } : {}) }, null, 2) + "\n");

  reconstruirHistorico();
  console.log(`métricas del ${fecha}: ${canal.suscriptores} subs, ${Object.keys(videos).length} videos → ${DIR}/${fecha}.md`);
})().catch((e) => { console.error("error:", e.response?.data?.error?.message || e.message); process.exit(1); });

// ---- Proyección + panel, reconstruidos ENTEROS desde los json diarios (una
// sola verdad; así el arreglo de un campo corrige también los días viejos).
// Horas de largos ESTIMADAS: vistas × duración × 40% de retención supuesta
// (cuando llegue el scope de Analytics, se reemplaza por el dato real).
function reconstruirHistorico() {
  const archivos = fs.readdirSync(DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
  const dias = archivos.map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")));

  // durSeg existe solo desde el 01-09; como una duración no cambia, se
  // arrastra hacia atrás por id desde el día más nuevo que la tenga.
  const durPorId = {};
  for (const dia of [...dias].reverse())
    for (const [id, v] of Object.entries(dia.videos)) if (v.durSeg > 0 && !durPorId[id]) durPorId[id] = v.durSeg;
  const dur = (id, v) => (v.durSeg > 0 ? v.durSeg : durPorId[id] || 0);
  const esShort = (seg) => seg > 0 && seg <= 75;

  // proyeccion.json: una fila por día. vistasTotales = suma por video
  // (ARREGLO 3); el contador del canal queda aparte como vistasCanal.
  const serie = dias.map((dia) => {
    let vistasLargos = 0, vistasShorts = 0, horasEst = 0;
    for (const [id, v] of Object.entries(dia.videos)) {
      if (v.estado !== "public") continue;
      const seg = dur(id, v);
      if (esShort(seg)) vistasShorts += v.vistas;
      else { vistasLargos += v.vistas; horasEst += (v.vistas * seg * 0.4) / 3600; }
    }
    return { fecha: dia.fecha, subs: dia.canal.suscriptores, vistasTotales: sumaVistas(dia), vistasCanal: dia.canal.vistas, vistasLargos, vistasShorts, horasEst: Number(horasEst.toFixed(2)) };
  });
  fs.writeFileSync(path.join(DIR, "proyeccion.json"), JSON.stringify(serie, null, 2) + "\n");

  // El panel: SERIE (gráficos) e HIST (selector día por día), entre marcadores.
  // HIST al tope de 30 días para que el HTML no crezca sin fin: los json
  // diarios guardan todo; si algún día se necesita más atrás, resumen mensual.
  const hist = dias.slice(-30).map((dia) => ({
    fecha: dia.fecha,
    canal: dia.canal,
    videos: Object.entries(dia.videos)
      .sort((a, b) => (a[1].publicado < b[1].publicado ? 1 : -1))
      .map(([id, v]) => ({ id, t: v.titulo, e: v.estado, v: v.vistas, l: v.meGusta, c: v.comentarios, d: dur(id, v), p: v.publicado })),
  }));
  const rutaPanel = path.join("bitacora", "panel-interno.html");
  if (fs.existsSync(rutaPanel)) {
    let html = fs.readFileSync(rutaPanel, "utf8");
    const reSerie = /\/\*SERIE-INICIO\*\/[\s\S]*?\/\*SERIE-FIN\*\//;
    const reHist = /\/\*HIST-INICIO\*\/[\s\S]*?\/\*HIST-FIN\*\//;
    if (reSerie.test(html)) html = html.replace(reSerie, `/*SERIE-INICIO*/ const SERIE = ${JSON.stringify(serie)}; /*SERIE-FIN*/`);
    if (reHist.test(html)) html = html.replace(reHist, `/*HIST-INICIO*/ const HIST = ${JSON.stringify(hist)}; /*HIST-FIN*/`);
    fs.writeFileSync(rutaPanel, html);
    console.log(`panel refrescado: serie ${serie.length} días, histórico ${hist.length} días`);
  }
}
