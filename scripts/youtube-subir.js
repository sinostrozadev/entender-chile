#!/usr/bin/env node
/**
 * youtube-subir.js - Sube el video de una edición a YouTube.
 *
 * Cómo sube cada pieza hoy (23-09-2026): informe, Short del día y Clave van
 * PROGRAMADOS (--programar), y esa ventana entre la subida y la publicación
 * es la revisión de Santiago. El Short exprés va programado a 5 minutos
 * (--en-minutos 5, desde scripts/short-urgente.js): es última hora, y esos
 * 5 minutos son para que Santiago lo vea antes. El default del parámetro
 * sigue siendo private, para que nada se publique por descuido.
 *
 * Uso:
 *   node scripts/youtube-subir.js --fecha 2026-08-30 [--clave | --short] [--privacidad private|unlisted|public] [--programar HH:MM]
 *
 *   --programar HH:MM  sube privado y YouTube lo publica solo a esa hora de
 *                      Chile del mismo día (publishAt). Probado en uso real:
 *                      los informes ya se suben programados (Santiago, 23-09).
 *   --en-minutos N     igual, pero a N minutos de la subida (el exprés, 5).
 *
 * Toma: el mp4 de out/FECHA/, el título de out/FECHA/parsed.json ("Título
 * sugerido"), la descripción de contenido/descripciones/FECHA-*.txt y, si
 * existe, la miniatura out/FECHA/miniatura.png.
 *
 * Secrets (env): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 *
 * Por qué privado: los proyectos nuevos de la API de YouTube suben en modo
 * privado obligatorio hasta pasar la auditoría de Google. OJO con la premisa
 * (corregida el 07-09, verificada en la doc oficial): esa restricción NO
 * impide publicar. Aplica al MOMENTO DE LA SUBIDA; el dueño del canal puede
 * hacer público, o programar, cualquiera de esos videos desde Studio, y así
 * se publican los del canal desde el día uno. Lo único que la auditoría
 * destrabaría es que ESTE script publique o programe por su cuenta
 * (publishAt), que es un clic de diferencia. Y aunque no fuera
 * así, la regla del canal es que Santiago revisa antes de publicar. El id del
 * video queda en out/FECHA/youtube-id.txt; al publicarlo, ese id va a
 * contenido/videos/FECHA-informe.txt para que la web lo embeba.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { google } = require("googleapis");

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const fecha = opt("--fecha") || new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const clave = args.includes("--clave");
const short = args.includes("--short");
// --urgente <slug>: el Short exprés del agente de guardia (03-09). Vive en
// out/urgente/<slug>/, no lleva playlist ni miniatura, y deja la marca
// contenido/urgente/SUBIDO-<slug>.txt para que un hallazgo = un solo Short.
const urgente = opt("--urgente");
const privacidad = opt("--privacidad", "private");
const programar = opt("--programar") || process.env.YT_PUBLICAR_HORA || null; // ej. 07:30 (hora de Chile)
const etiqueta = urgente ? `urgente-${urgente}` : short ? (clave ? "short-clave" : "short") : clave ? "clave" : "informe";
const OUT = urgente ? path.join("out", "urgente") : path.join("out", fecha);
// el Short tiene su propia carpeta de trabajo (parsed.json con título y descripción)
const RUTA_PARSED = urgente ? path.join(OUT, urgente, "parsed.json")
  : short ? path.join(OUT, etiqueta, "parsed.json")
  : fs.existsSync(path.join(OUT, `parsed-${etiqueta}.json`)) ? path.join(OUT, `parsed-${etiqueta}.json`)
  : path.join(OUT, "parsed.json"); // el compartido queda de respaldo

const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) {
  console.log("Sin secrets de YouTube (YT_CLIENT_ID / YT_CLIENT_SECRET / YT_REFRESH_TOKEN): no se sube nada.");
  process.exit(0);
}

let video = urgente ? path.join(OUT, `${urgente}.mp4`) : path.join(OUT, `${fecha}-${etiqueta}.mp4`);
if (!fs.existsSync(video)) { console.error(`No existe ${video}`); process.exit(1); }

// YouTube recomprime fuerte el 1080p y el texto queda borroso; a 1440p asigna
// un códec mejor (VP9) y el texto se mantiene nítido. Se reescala ANTES de
// subir (lanczos, CRF 17). --sin-hd lo salta. (Diagnóstico del 30-08.)
if (!args.includes("--sin-hd")) {
  const ff = path.join("node_modules", "@remotion", "compositor-linux-x64-gnu", "ffmpeg");
  if (fs.existsSync(ff)) {
    const hd = path.join(OUT, `subida-${etiqueta}.mp4`);
    const escala = (short || urgente) ? "1440:2560" : "2560:1440"; // el urgente también es vertical
    try {
      console.log(`Reescalando a ${escala} para que YouTube no muela el texto...`);
      execFileSync(ff, ["-v", "error", "-y", "-i", video, "-vf", `scale=${escala}:flags=lanczos`,
        "-c:v", "libx264", "-crf", "17", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-c:a", "copy", hd], { stdio: "inherit" });
      video = hd;
    } catch (e) {
      console.log(`(no se pudo reescalar, se sube el original: ${e.message.split("\n")[0]})`);
    }
  }
}
const parsed = fs.existsSync(RUTA_PARSED) ? JSON.parse(fs.readFileSync(RUTA_PARSED, "utf8")) : {};
const titulo = (parsed.titulo || `Entender Chile · ${fecha}`).slice(0, 100);
const rutaDesc = path.join("contenido", "descripciones", `${fecha}-${etiqueta}.txt`);
const descripcion = (short ? (parsed.descripcion || "") : (fs.existsSync(rutaDesc) ? fs.readFileSync(rutaDesc, "utf8") : "")).slice(0, 4900);
// Los Shorts NO llevan carátula-archivo: su portada es el primer cuadro del
// video (desde el 05-09 es contenido real, sin pantalla muerta). Antes este
// path les colgaba por accidente la miniatura HORIZONTAL del largo del día.
const miniatura = (short || urgente) ? path.join(OUT, "no-existe.png")
  : path.join(OUT, clave ? "miniatura-clave.png" : "miniatura.png");

// "2026-08-30" + "07:30" → instante ISO (UTC) de esa hora en Chile, con o sin horario de verano.
function horaChileISO(dia, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const comoUTC = new Date(`${dia}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00Z`);
  const f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Santiago", hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const [{ value: M }, , { value: D }, , { value: Y }, , { value: H }, , { value: Mi }] = f.formatToParts(comoUTC);
  const enChile = new Date(`${Y}-${M}-${D}T${H === "24" ? "00" : H}:${Mi}:00Z`);
  return new Date(comoUTC.getTime() - (enChile.getTime() - comoUTC.getTime())).toISOString();
}

// publishAt tiene que quedar en el futuro. Si la hora pedida ya pasó (un render
// tardío, como el 15-09 que terminó pasadas las 09:00 con el informe pedido
// para las 07:30), se programa para 30 minutos después de ahora y se avisa.
// La ventana entre la subida y la publicación es la REVISIÓN de Santiago (por
// eso programado y no público). YT_MARGEN_MIN (variable del repo, default 90)
// es el mínimo de minutos que esa ventana tiene que durar: si la hora pedida
// queda más cerca que eso, se programa a ahora + margen.
const MARGEN_MIN = Number(process.env.YT_MARGEN_MIN) > 0 ? Number(process.env.YT_MARGEN_MIN) : 90;
function horaProgramada(dia, hhmm) {
  const pedida = new Date(horaChileISO(dia, hhmm));
  const minimo = new Date(Date.now() + MARGEN_MIN * 60 * 1000);
  if (pedida >= minimo) return pedida.toISOString();
  console.log(`La hora pedida (${hhmm} de Chile) deja menos de ${MARGEN_MIN} min para revisar: se programa para ${minimo.toISOString()} (${MARGEN_MIN} min desde ahora).`);
  return minimo.toISOString();
}
// --en-minutos N: programado a N minutos de la subida, sin el margen de arriba.
// Es el del exprés (Santiago, 23-09): 5 minutos para verlo antes de que salga.
const enMinutos = Number(opt("--en-minutos")) || 0;
const publishAt = enMinutos ? new Date(Date.now() + enMinutos * 60 * 1000).toISOString()
  : programar ? horaProgramada(fecha, programar) : null;
const publishAtChile = publishAt && new Intl.DateTimeFormat("es-CL", { timeZone: "America/Santiago", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(publishAt));

(async () => {
  const oauth2 = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  oauth2.setCredentials({ refresh_token: YT_REFRESH_TOKEN });
  const yt = google.youtube({ version: "v3", auth: oauth2 });

  console.log(`Subiendo ${video} como ${privacidad}: "${titulo}"`);
  const res = await yt.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: titulo,
        description: descripcion,
        tags: ["Chile", "noticias", "Entender Chile", "resumen de noticias"],
        categoryId: "25", // Noticias y política
        defaultLanguage: "es",
        defaultAudioLanguage: "es-CL",
      },
      status: {
        privacyStatus: publishAt ? "private" : privacidad,
        selfDeclaredMadeForKids: false,
        ...(publishAt ? { publishAt } : {}),
      },
    },
    media: { body: fs.createReadStream(video) },
  });
  const id = res.data.id;
  fs.writeFileSync(path.join(OUT, `youtube-id-${etiqueta}.txt`), id + "\n");
  // Short exprés: la marca SUBIDO vive en contenido/ (el workflow la commitea);
  // es la deduplicación (un hallazgo = un Short) y lo que la rutina de guardia
  // espera para avisar al teléfono con el link.
  // la segunda línea (hora de Chile en que se publica) la usa el aviso al teléfono
  if (urgente) fs.writeFileSync(path.join("contenido", "urgente", `SUBIDO-${urgente}.txt`), id + "\n" + (publishAtChile ? `publica ${publishAtChile}\n` : ""));
  // a su playlist (informe y clave; los Shorts no): ids en contenido/youtube.json
  if (!short) {
    try {
      const cfg = JSON.parse(fs.readFileSync(path.join("contenido", "youtube.json"), "utf8"));
      const pl = cfg.playlists?.[clave ? "clave" : "informe"];
      if (pl) { await yt.playlistItems.insert({ part: ["snippet"], requestBody: { snippet: { playlistId: pl, resourceId: { kind: "youtube#video", videoId: id } } } }); console.log("agregado a su playlist ✓"); }
    } catch (e) { console.log(`(playlist no: ${e.message.split("\n")[0]})`); }
  }
  console.log(`Subido: https://youtu.be/${id} (${publishAt ? `programado, publishAt ${publishAt} (${publishAtChile} de Chile)` : privacidad})`);

  if (fs.existsSync(miniatura)) {
    try {
      await yt.thumbnails.set({ videoId: id, media: { mimeType: "image/png", body: fs.createReadStream(miniatura) } });
      console.log("Miniatura puesta.");
    } catch (e) {
      console.log(`Miniatura no se pudo poner (${e.message}). Suele ser que el canal no tiene el teléfono verificado.`);
    }
  }
})().catch((e) => {
  console.error("Error al subir:", e.response?.data?.error?.message || e.message);
  process.exit(1);
});
