#!/usr/bin/env node
/**
 * podcast-subir.js - El informe diario, como episodio de podcast.
 *
 * Sube public/FECHA-informe.mp3 al release "audio" del repo PÚBLICO de la web
 * (los assets de un repo privado no se pueden servir a Spotify) y anota el
 * episodio en contenido/podcast/episodios.json. El feed lo arma la web en
 * /podcast.xml y Spotify/Apple lo leen solos.
 *
 * Uso: node scripts/podcast-subir.js [--fecha AAAA-MM-DD] [--clave]
 * Token: en el workflow, GH_TOKEN = secret AUDIO_TOKEN (PAT fino con
 * contents:write sobre entender-chile-web). En local basta el gh de siempre.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO = "sinostrozadev/entender-chile-web";
const TAG = "audio";
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const fecha = opt("--fecha") || process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());
const esClave = args.includes("--clave");
const etiqueta = esClave ? "clave" : "informe";

const mp3 = path.join("public", `${fecha}-${etiqueta}.mp3`);
if (!fs.existsSync(mp3)) { console.log(`No existe ${mp3} (¿edición sin voz?): sin episodio hoy.`); process.exit(0); }
const bytes = fs.statSync(mp3).size;
const durSeg = Math.round((bytes * 8) / 192000); // mp3 de 192 kbps

const rutaParsed = [`parsed-${etiqueta}.json`, "parsed.json"].map((f) => path.join("out", fecha, f)).find(fs.existsSync);
const parsed = rutaParsed ? JSON.parse(fs.readFileSync(rutaParsed, "utf8")) : {};
const titulo = esClave ? `Clave · ${parsed.titulo || "para entender las noticias"}` : `${fecha.split("-").reverse().join("-")} · ${parsed.titulo || "El informe diario"}`;
const rutaDesc = path.join("contenido", "descripciones", `${fecha}-${etiqueta}.txt`);
const descripcion = fs.existsSync(rutaDesc)
  ? fs.readFileSync(rutaDesc, "utf8").split("Capítulos:")[0].trim()
  : "";

const gh = (extra) => execFileSync("gh", extra, { stdio: ["ignore", "pipe", "pipe"] }).toString();
try { gh(["release", "view", TAG, "-R", REPO, "--json", "name"]); }
catch { gh(["release", "create", TAG, "-R", REPO, "--title", "Audio del informe diario", "--notes", "Los episodios del podcast Entender Chile. El feed: https://sinostrozadev.github.io/entender-chile-web/podcast.xml"]); }
gh(["release", "upload", TAG, mp3, "-R", REPO, "--clobber"]);
const url = `https://github.com/${REPO}/releases/download/${TAG}/${fecha}-${etiqueta}.mp3`;
console.log(`mp3 subido: ${url} (${(bytes / 1e6).toFixed(1)} MB, ~${Math.round(durSeg / 60)} min)`);

const rutaEps = path.join("contenido", "podcast", "episodios.json");
const eps = fs.existsSync(rutaEps) ? JSON.parse(fs.readFileSync(rutaEps, "utf8")) : [];
const sinHoy = eps.filter((e) => !(e.fecha === fecha && (e.tipo || "informe") === etiqueta));
sinHoy.push({ fecha, tipo: etiqueta, titulo, descripcion, url, bytes, durSeg });
fs.mkdirSync(path.dirname(rutaEps), { recursive: true });
fs.writeFileSync(rutaEps, JSON.stringify(sinHoy, null, 2) + "\n");
console.log(`episodio anotado en ${rutaEps} (${sinHoy.length} en total)`);
