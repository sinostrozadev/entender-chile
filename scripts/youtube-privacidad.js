#!/usr/bin/env node
/**
 * youtube-privacidad.js - Cambia la privacidad de un video YA SUBIDO.
 *
 * Uso:
 *   node scripts/youtube-privacidad.js --id VIDEO_ID --privacidad private
 *
 * Por qué existe (28-09-2026). Ese día la edición salió con dos defectos: la
 * carátula truncada y un titular escrito encima del texto de la primera
 * tarjeta. Los dos se arreglaron, pero YouTube NO deja reemplazar el archivo
 * de un video publicado: la única salida es subir uno nuevo y retirar el
 * viejo. Retirarlo a mano en Studio era el único camino, y con un video al
 * día eso se convierte en un trámite que alguien va a olvidar justo el día
 * que importe.
 *
 * Lo que NO hace: borrar. Un video privado se puede volver a publicar, y sus
 * comentarios y estadísticas siguen existiendo. Borrar es irreversible y esa
 * decisión no la toma un script.
 *
 * Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 */
const { google } = require("googleapis");

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const id = opt("--id");
const privacidad = (opt("--privacidad", "private") || "private").toLowerCase();

if (!id) { console.error("Falta --id VIDEO_ID."); process.exit(1); }
if (!["private", "unlisted", "public"].includes(privacidad)) {
  console.error(`--privacidad no reconocida: "${privacidad}". Valores: private | unlisted | public.`);
  process.exit(1);
}

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) {
  console.log("Sin secrets de YouTube: no se cambia nada.");
  process.exit(0);
}

(async () => {
  const auth = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: YT_REFRESH_TOKEN });
  const yt = google.youtube({ version: "v3", auth });

  // videos.update PISA las partes que se le mandan, así que hay que leer el
  // status completo y devolverlo con el cambio: mandar solo privacyStatus
  // borraría la programación y la declaración de contenido para niños.
  const { data } = await yt.videos.list({ part: ["status", "snippet"], id: [id] });
  const v = (data.items || [])[0];
  if (!v) { console.error(`No existe el video ${id}, o no es de este canal.`); process.exit(1); }
  const antes = v.status.privacyStatus;
  if (antes === privacidad) { console.log(`${id} ya está en ${privacidad}: no se toca.`); return; }

  await yt.videos.update({
    part: ["status"],
    requestBody: { id, status: { ...v.status, privacyStatus: privacidad, publishAt: null } },
  });
  console.log(`${id} "${(v.snippet.title || "").slice(0, 60)}": ${antes} -> ${privacidad}`);
})().catch((e) => { console.error("Error:", e.message); process.exit(1); });
