#!/usr/bin/env node
/**
 * youtube-caratula.js - Cambia la carátula de un video YA PUBLICADO.
 *
 * Nació el 24-09-2026: el taller de carátulas dejó imágenes muy superiores a
 * las que llevaban los videos ya subidos, y no había forma de cambiarlas sin
 * entrar a Studio a mano, video por video.
 *
 * Uso:
 *   node scripts/youtube-caratula.js --imagen contenido/caratulas/listas/2026-09-23-informe.png \
 *        [--id VIDEO_ID | --fecha 2026-09-23 [--pieza informe|short|clave]]
 *
 * Sin --id busca el video en las subidas del canal: el que se publicó en esa
 * fecha de Chile y cuya duración calza con la pieza (el informe dura minutos,
 * el Short menos de 75 segundos). Si hay más de uno, los lista y no toca
 * nada: prefiere no equivocarse antes que adivinar.
 *
 * Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 */
const fs = require("fs");
const { google } = require("googleapis");

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const imagen = opt("--imagen");
const id = opt("--id");
const fecha = opt("--fecha");
const pieza = (opt("--pieza", "informe") || "informe").toLowerCase();

if (!imagen || !fs.existsSync(imagen)) { console.error(`Falta --imagen o no existe: ${imagen}`); process.exit(1); }
if (!id && !fecha) { console.error("Falta --id o --fecha."); process.exit(1); }

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) {
  console.log("Sin secrets de YouTube: no se cambia nada.");
  process.exit(0);
}

// la fecha de publicación en hora de Chile, no en UTC: un video de las 21:00
// de Chile figura al día siguiente en UTC y se buscaría en el día equivocado
const diaChile = (iso) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date(iso));

(async () => {
  const o = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  o.setCredentials({ refresh_token: YT_REFRESH_TOKEN });
  const yt = google.youtube({ version: "v3", auth: o });

  let videoId = id;
  if (!videoId) {
    const ch = (await yt.channels.list({ mine: true, part: ["contentDetails"] })).data.items[0];
    const subidos = [];
    let pagina;
    do {
      const r = await yt.playlistItems.list({
        playlistId: ch.contentDetails.relatedPlaylists.uploads,
        part: ["contentDetails"], maxResults: 50, pageToken: pagina,
      });
      subidos.push(...r.data.items.map((i) => i.contentDetails.videoId));
      pagina = r.data.nextPageToken;
      // basta con las dos primeras páginas: se cambian carátulas recientes
    } while (pagina && subidos.length < 100);

    const candidatos = [];
    for (let i = 0; i < subidos.length; i += 50) {
      const r = await yt.videos.list({ id: subidos.slice(i, i + 50), part: ["snippet", "contentDetails"] });
      for (const v of r.data.items) {
        if (diaChile(v.snippet.publishedAt) !== fecha) continue;
        const m = (v.contentDetails?.duration || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const seg = m ? (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0)) : 0;
        const esCorto = seg > 0 && seg <= 75;
        if (pieza === "informe" && esCorto) continue;
        if ((pieza === "short" || pieza === "clave") && !esCorto && pieza === "short") continue;
        candidatos.push({ id: v.id, titulo: v.snippet.title, seg });
      }
    }
    if (!candidatos.length) { console.error(`No hay video de ${fecha} que calce con "${pieza}".`); process.exit(1); }
    if (candidatos.length > 1) {
      console.error(`Hay ${candidatos.length} videos de ${fecha} que calzan; pasa --id con el correcto:`);
      for (const c of candidatos) console.error(`  ${c.id}  ${c.seg}s  ${c.titulo}`);
      process.exit(1);
    }
    videoId = candidatos[0].id;
    console.log(`Video encontrado: ${videoId} (${candidatos[0].titulo})`);
  }

  await yt.thumbnails.set({ videoId, media: { mimeType: "image/png", body: fs.createReadStream(imagen) } });
  console.log(`Carátula cambiada: https://youtu.be/${videoId} ← ${imagen}`);
})().catch((e) => {
  console.error("Error al cambiar la carátula:", e.response?.data?.error?.message || e.message);
  process.exit(1);
});
