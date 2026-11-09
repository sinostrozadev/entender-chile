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
  // La lista de subidas viene por páginas de 50. Sin recorrerlas todas, el canal
  // se mide truncado: al pasar de 50 videos (12-09-2026) cada subida nueva
  // expulsaba una vieja de la medición y las horas vistas caían sin que el
  // canal perdiera nada. Se piden todas las páginas.
  const subidos = [];
  let pagina;
  do {
    const r = await yt.playlistItems.list({
      playlistId: ch.contentDetails.relatedPlaylists.uploads,
      part: ["contentDetails"], maxResults: 50, pageToken: pagina,
    });
    subidos.push(...r.data.items.map((i) => i.contentDetails.videoId));
    pagina = r.data.nextPageToken;
  } while (pagina);
  if (subidos.length < canal.videos) console.log(`AVISO: el canal declara ${canal.videos} videos y la lista de subidas trajo ${subidos.length}.`);
  // Una tanda de videos.list puede volver incompleta: la API acepta los 50 id,
  // responde 200 y devuelve menos, y este bucle solo recorría lo que llegó, así
  // que el video no devuelto desaparecía entero de la medición y de la suma de
  // vistas. Pasó siete veces en octubre (PENDIENTES, 27-10) y el 06-11-2026
  // costó una alarma falsa: dos Shorts públicos de 169 y 314 vistas salieron de
  // la lista, la suma del día cayó 443 vistas y la auditoría lo escaló a
  // Santiago como posible sanción de YouTube, cuando channels.list seguía
  // contando esos videos (220 públicos declarados contra 218 medidos). Ahora se
  // compara id pedido contra id recibido, la tanda incompleta se reintenta una
  // vez, y lo que siga faltando se dice con su id por consola, en el md y en el
  // json, para que nadie lea una baja de la API como una baja del canal.
  const videos = {};
  const anotar = (v) => {
    const m = (v.contentDetails?.duration || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const durSeg = m ? (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0)) : 0;
    videos[v.id] = {
      titulo: v.snippet.title.slice(0, 60), publicado: v.snippet.publishedAt.slice(0, 10), estado: v.status.privacyStatus,
      vistas: +(v.statistics.viewCount || 0), meGusta: +(v.statistics.likeCount || 0), comentarios: +(v.statistics.commentCount || 0),
      durSeg,
    };
  };
  // devuelve los id que se pidieron y no llegaron
  const pedirTanda = async (ids) => {
    const r = await yt.videos.list({ id: ids, part: ["snippet", "statistics", "status", "contentDetails"] });
    for (const v of r.data.items || []) anotar(v);
    return ids.filter((id) => !videos[id]);
  };
  const perdidos = [];
  for (let i = 0; i < subidos.length; i += 50) {
    const tanda = subidos.slice(i, i + 50);
    let faltan = await pedirTanda(tanda);
    if (faltan.length) {
      console.log(`AVISO: la tanda ${i / 50 + 1} pidió ${tanda.length} videos y volvió sin ${faltan.length}. Se reintenta: ${faltan.join(", ")}`);
      faltan = await pedirTanda(faltan);
    }
    perdidos.push(...faltan);
  }
  if (perdidos.length) {
    console.log(`AVISO: ${perdidos.length} video${perdidos.length === 1 ? "" : "s"} ${perdidos.length === 1 ? "quedó" : "quedaron"} fuera de la medición incluso tras el reintento. La suma de vistas de hoy está incompleta y una baja respecto de ayer NO es una baja real del canal. Id: ${perdidos.join(", ")}`);
  }
  const publicos = Object.values(videos).filter((v) => v.estado === "public").length;
  if (publicos < canal.videos) {
    console.log(`AVISO: channels.list declara ${canal.videos} videos públicos y la medición trae ${publicos}. Faltan ${canal.videos - publicos}, y como el canal los sigue contando, no están borrados: no llegaron.`);
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
  let fuentes = null; // de dónde viene el tráfico y dónde se va (20-09)
  let impresiones = null; // carátula mostrada y clics; lo baja scripts/impresiones.js (Reporting API)
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

      // DE DÓNDE VIENE Y DÓNDE SE VA (20-09): la retención media no dice nada
      // accionable; lo que sirve es la fuente del tráfico (¿sugeridos que
      // rebotan o búsqueda que se queda?) y la CURVA por video (¿en qué
      // segundo se van?). Probado el 20-09: la curva solo existe para videos
      // con ~20 vistas o más en la ventana; con menos, YouTube devuelve vacío.
      const fq = async (extra) => (await an.reports.query({ ids: "channel==MINE", startDate: desde, endDate: fecha, ...extra })).data.rows || [];
      fuentes = { canal: {}, videos: {} };
      for (const [src, v, min] of await fq({ metrics: "views,estimatedMinutesWatched", dimensions: "insightTrafficSourceType", sort: "-views" })) {
        fuentes.canal[src] = { vistas: v, minutos: min };
      }
      const largosConVistas = Object.entries(retencion)
        .filter(([id, r]) => (videos[id]?.durSeg ?? 0) > 75 && r.vistas >= 10)
        .sort((a, b) => b[1].minutos - a[1].minutos).slice(0, 25);
      for (const [id, r] of largosConVistas) {
        const f = {};
        for (const [src, v] of await fq({ metrics: "views", dimensions: "insightTrafficSourceType", filters: `video==${id}`, sort: "-views" })) f[src] = v;
        let curva = null;
        if (r.vistas >= 15) {
          const rows = await fq({ metrics: "audienceWatchRatio", dimensions: "elapsedVideoTimeRatio", filters: `video==${id}` });
          if (rows.length >= 90) {
            const serie = rows.map((x) => Number(x[1].toFixed(3)));
            const en = (i) => Number((serie[i] * 100).toFixed(0));
            // la mayor caída entre puntos consecutivos, dicha en segundos del video
            let caida = { desde: 0, puntos: 0 };
            for (let i = 1; i < serie.length; i++) { const d = serie[i - 1] - serie[i]; if (d > caida.puntos) caida = { desde: i - 1, puntos: d }; }
            const dur = videos[id]?.durSeg ?? 0;
            curva = { p01: en(1), p03: en(3), p05: en(5), p10: en(10), p25: en(25), p50: en(50), p75: en(75),
              caidaMayor: { segundo: Math.round((caida.desde / 100) * dur), puntos: Number((caida.puntos * 100).toFixed(0)) }, serie };
          }
        }
        fuentes.videos[id] = { fuentes: f, curva };
      }
    } catch (e) {
      console.log(`(retención no disponible: ${e.message.split("\n")[0]})`);
    }
  }

  // IMPRESIONES Y CLICS DE CARÁTULA (22-09, corregido el 23-09): el dato NO
  // está en la Analytics API. Se probaron cinco variantes el 22-09 y las
  // cinco devolvieron "The query is not supported". Vive solo en la
  // Reporting API, que entrega CSV por día: lo baja scripts/impresiones.js y
  // deja el resumen en bitacora/metricas/impresiones.json. Acá solo se lee.
  // Si el archivo no está (o quedó viejo), el reporte sale igual y lo dice.
  const RUTA_IMPR = path.join(DIR, "impresiones.json");
  if (fs.existsSync(RUTA_IMPR)) {
    try {
      const im = JSON.parse(fs.readFileSync(RUTA_IMPR, "utf8"));
      const nV = Object.keys(im.videos || {}).length;
      if (nV) {
        impresiones = { videos: im.videos, dias: im.dias || {}, desde: im.desde, hasta: im.hasta, actualizado: im.actualizado };
        console.log(`(impresiones: ${nV} videos, ventana ${im.desde} a ${im.hasta}, medido el ${im.actualizado})`);
      } else {
        console.log("(impresiones: el archivo existe pero aún sin datos; la Reporting API tarda hasta 48 horas desde que se creó el trabajo)");
      }
    } catch (e) {
      console.log(`(impresiones: no se pudo leer ${RUTA_IMPR}: ${e.message.split("\n")[0]})`);
    }
  } else {
    console.log("(impresiones: todavía no existe bitacora/metricas/impresiones.json; corre scripts/impresiones.js)");
  }
  const lineas = [
    `# Métricas · ${fecha.split("-").reverse().join("-")}`,
    "",
    `Canal: **${canal.suscriptores} suscriptores**${d(canal.suscriptores, prev?.canal?.suscriptores)} · ` +
    `**${vistasTotales} vistas totales**${d(vistasTotales, prev ? sumaVistas(prev) : null)} (suma por video; el contador del canal marca ${canal.vistas}, va con rezago) · ` +
    `${Object.keys(videos).length} subidos, ${publicos} públicos.` +
    (prev ? ` (vs ${previos[previos.length - 1].replace(".json", "")})` : " (línea base, sin comparación)"),
    "",
    ...(perdidos.length ? [
      `**AVISO: ${perdidos.length} video${perdidos.length === 1 ? "" : "s"} que el canal sigue contando ${perdidos.length === 1 ? "quedó" : "quedaron"} fuera de esta medición** ` +
      `(id ${perdidos.join(", ")}): \`videos.list\` no ${perdidos.length === 1 ? "lo" : "los"} devolvió, ni en el reintento. La suma de vistas de arriba está ` +
      `incompleta por eso, así que una baja respecto del día anterior no es una baja real del canal.`,
      "",
    ] : []),
    retencion ? `| Video | Estado | Vistas |${impresiones ? " Impres. | CTR |" : ""} Min. vistos | % visto | Me gusta |`
              : "| Video | Estado | Vistas | Me gusta | Coment. |",
    retencion ? `|---|---|---|${impresiones ? "---|---|" : ""}---|---|---|` : "|---|---|---|---|---|",
  ];
  const orden = Object.entries(videos).sort((a, b) => (a[1].publicado < b[1].publicado ? 1 : -1));
  for (const [id, v] of orden) {
    const pv = prev?.videos?.[id];
    const re = retencion?.[id];
    const im = impresiones?.videos?.[id];
    const colImpr = impresiones ? ` ${im ? im.impresiones : "-"} | ${im && typeof im.ctr === "number" ? im.ctr + "%" : "-"} |` : "";
    lineas.push(retencion
      ? `| ${v.titulo} | ${v.estado} | ${v.vistas}${d(v.vistas, pv?.vistas)} |${colImpr} ${re ? re.minutos : "-"} | ${re ? re.pct + "%" : "-"} | ${v.meGusta}${d(v.meGusta, pv?.meGusta)} |`
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
    if (impresiones) {
      const V = Object.entries(impresiones.videos);
      const D = Object.entries(impresiones.dias);
      const totImpr = V.length ? V.reduce((a, [, x]) => a + x.impresiones, 0) : D.reduce((a, [, x]) => a + x.impresiones, 0);
      const conCtr = V.filter(([, x]) => typeof x.ctr === "number");
      const baseCtr = conCtr.reduce((a, [, x]) => a + x.impresiones, 0);
      const ctrPond = baseCtr ? conCtr.reduce((a, [, x]) => a + x.ctr * x.impresiones, 0) / baseCtr
        : D.length ? D.reduce((a, [, x]) => a + (x.ctr || 0), 0) / D.length : 0;
      lineas.push(`**Carátulas (30 días):** ${totImpr} impresiones · CTR medio ponderado ${ctrPond.toFixed(2)}%. ` +
        "La impresión es la carátula mostrada; el CTR, cuántos entraron. Una carátula solo se puede juzgar con cientos de impresiones: con menos, la cifra es ruido.", "");
      const conDatos = V.filter(([id, x]) => x.impresiones >= 100 && (videos[id]?.durSeg ?? 0) > 75)
        .sort((a, b) => b[1].impresiones - a[1].impresiones).slice(0, 12);
      if (conDatos.length) {
        lineas.push("**Largos con impresiones suficientes para juzgar la carátula (100 o más):**", "",
          "| Video | Publicado | Impresiones | CTR | Vistas |", "|---|---|---|---|---|");
        for (const [id, x] of conDatos) {
          lineas.push(`| ${videos[id]?.titulo ?? id} | ${videos[id]?.publicado ?? "-"} | ${x.impresiones} | ${typeof x.ctr === "number" ? x.ctr + "%" : "-"} | ${videos[id]?.vistas ?? "-"} |`);
        }
        lineas.push("");
      } else {
        lineas.push("Ningún largo llega todavía a 100 impresiones en la ventana: por ahora la carátula no se puede evaluar con estos datos.", "");
      }
    }
    if (fuentes) {
      const NOMBRE = { SHORTS: "Shorts", YT_SEARCH: "búsqueda", SUBSCRIBER: "suscriptores", YT_CHANNEL: "página del canal", RELATED_VIDEO: "sugeridos",
        NOTIFICATION: "notificaciones", PLAYLIST: "listas", EXT_URL: "enlaces externos", NO_LINK_OTHER: "directo", YT_OTHER_PAGE: "otras páginas de YouTube",
        SHORTS_CONTENT_LINKS: "enlace desde un Short", END_SCREEN: "pantalla final", ANNOTATION: "tarjetas", PROMOTED: "promocionado", ADVERTISING: "anuncios", CAMPAIGN_CARD: "campaña" };
      const nom = (s) => NOMBRE[s] || s.toLowerCase();
      const canalOrd = Object.entries(fuentes.canal).sort((a, b) => b[1].minutos - a[1].minutos);
      lineas.push(`**De dónde vienen los MINUTOS (30 días, todo el canal):** ` +
        canalOrd.slice(0, 6).map(([s, x]) => `${nom(s)} ${x.minutos} min (${x.vistas} vistas)`).join(" · ") + ".", "");
      const conCurva = Object.entries(fuentes.videos).filter(([, x]) => x.curva);
      if (conCurva.length) {
        lineas.push("**Dónde se va la gente (largos con curva de Analytics):** \"queda al 5%\" es la audiencia que sigue viendo a los ~30-40 s de un video de 10-12 min.", "",
          "| Video | Vistas | Fuente principal | queda al 1% | al 5% | al 25% | al 50% | al 75% | mayor caída |", "|---|---|---|---|---|---|---|---|---|");
        for (const [id, x] of conCurva.sort((a, b) => (retencion[b[0]]?.vistas ?? 0) - (retencion[a[0]]?.vistas ?? 0))) {
          const top = Object.entries(x.fuentes).sort((a, b) => b[1] - a[1])[0];
          const c = x.curva;
          lineas.push(`| ${videos[id]?.titulo ?? id} | ${retencion[id].vistas} | ${top ? `${nom(top[0])} ${Math.round((100 * top[1]) / retencion[id].vistas)}%` : "-"} | ${c.p01}% | ${c.p05}% | ${c.p25}% | ${c.p50}% | ${c.p75}% | seg ${c.caidaMayor.segundo} (-${c.caidaMayor.puntos} pts) |`);
        }
        lineas.push("");
      }
    }
  } else {
    lineas.push("", "Retención: sin YT_ANALYTICS_REFRESH_TOKEN en el entorno (la métrica queda fuera, el resto no se afecta).", "");
  }
  fs.writeFileSync(path.join(DIR, `${fecha}.md`), lineas.join("\n"));
  fs.writeFileSync(path.join(DIR, `${fecha}.json`), JSON.stringify({ fecha, canal, videos, ...(perdidos.length ? { perdidos } : {}), ...(retencion ? { retencion } : {}), ...(fuentes ? { fuentes } : {}), ...(impresiones ? { impresiones } : {}) }, null, 2) + "\n");

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
