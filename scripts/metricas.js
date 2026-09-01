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

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) { console.log("Sin secrets de YouTube: sin métricas."); process.exit(0); }

(async () => {
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

  const lineas = [
    `# Métricas · ${fecha.split("-").reverse().join("-")}`,
    "",
    `Canal: **${canal.suscriptores} suscriptores**${d(canal.suscriptores, prev?.canal?.suscriptores)} · ` +
    `**${canal.vistas} vistas totales**${d(canal.vistas, prev?.canal?.vistas)} · ${canal.videos} videos.` +
    (prev ? ` (vs ${previos[previos.length - 1].replace(".json", "")})` : " (línea base, sin comparación)"),
    "",
    "| Video | Estado | Vistas | Me gusta | Coment. |",
    "|---|---|---|---|---|",
  ];
  const orden = Object.entries(videos).sort((a, b) => (a[1].publicado < b[1].publicado ? 1 : -1));
  for (const [id, v] of orden) {
    const pv = prev?.videos?.[id];
    lineas.push(`| ${v.titulo} | ${v.estado} | ${v.vistas}${d(v.vistas, pv?.vistas)} | ${v.meGusta}${d(v.meGusta, pv?.meGusta)} | ${v.comentarios}${d(v.comentarios, pv?.comentarios)} |`);
  }
  lineas.push("", "Retención e impresiones: pendiente el scope de Analytics (fase 2).", "");
  fs.writeFileSync(path.join(DIR, `${fecha}.md`), lineas.join("\n"));
  fs.writeFileSync(path.join(DIR, `${fecha}.json`), JSON.stringify({ fecha, canal, videos }, null, 2) + "\n");

  // ---- Histórico de proyección (pedido de Santiago, 1-09): una fila por día,
  // para el gráfico del panel y para comparar proyecciones en el tiempo.
  // Horas de largos ESTIMADAS: vistas × duración × 40% de retención supuesta
  // (cuando llegue el scope de Analytics, se reemplaza por el dato real).
  const esShort = (v) => v.durSeg > 0 && v.durSeg <= 75;
  let vistasLargos = 0, vistasShorts = 0, horasEst = 0;
  for (const v of Object.values(videos)) {
    if (v.estado !== "public") continue;
    if (esShort(v)) vistasShorts += v.vistas;
    else { vistasLargos += v.vistas; horasEst += (v.vistas * v.durSeg * 0.4) / 3600; }
  }
  const rutaProy = path.join(DIR, "proyeccion.json");
  const proy = fs.existsSync(rutaProy) ? JSON.parse(fs.readFileSync(rutaProy, "utf8")) : [];
  const sinHoy = proy.filter((e) => e.fecha !== fecha);
  sinHoy.push({ fecha, subs: canal.suscriptores, vistasTotales: canal.vistas, vistasLargos, vistasShorts, horasEst: Number(horasEst.toFixed(2)) });
  sinHoy.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  fs.writeFileSync(rutaProy, JSON.stringify(sinHoy, null, 2) + "\n");

  // ---- Refrescar los datos del gráfico dentro del panel (entre marcadores).
  const rutaPanel = path.join("bitacora", "panel-interno.html");
  if (fs.existsSync(rutaPanel)) {
    const html = fs.readFileSync(rutaPanel, "utf8");
    const re = /\/\*SERIE-INICIO\*\/[\s\S]*?\/\*SERIE-FIN\*\//;
    if (re.test(html)) {
      fs.writeFileSync(rutaPanel, html.replace(re, `/*SERIE-INICIO*/ const SERIE = ${JSON.stringify(sinHoy)}; /*SERIE-FIN*/`));
      console.log("datos del gráfico del panel refrescados");
    }
  }
  console.log(`métricas del ${fecha}: ${canal.suscriptores} subs, ${Object.keys(videos).length} videos → ${DIR}/${fecha}.md`);
})().catch((e) => { console.error("error:", e.response?.data?.error?.message || e.message); process.exit(1); });
