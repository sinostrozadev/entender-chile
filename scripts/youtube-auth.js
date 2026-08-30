#!/usr/bin/env node
/**
 * youtube-auth.js - Se corre UNA vez, en el computador, para obtener el
 * refresh token con el que el workflow sube videos al canal.
 *
 * Uso:
 *   node scripts/youtube-auth.js <ruta al client_secret_XXX.json descargado de Google Cloud>
 *
 * Abre una URL en el navegador (autoriza con la cuenta DUEÑA del canal),
 * recibe el código en http://127.0.0.1:8765 y muestra los tres valores que
 * van como secrets en GitHub: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
 *
 * El JSON del cliente NO va al repo: déjalo en ~/.claude/projects/.../secrets/.
 */
const fs = require("fs");
const http = require("http");
const { google } = require("googleapis");

const ruta = process.argv[2];
if (!ruta || !fs.existsSync(ruta)) {
  console.error("Uso: node scripts/youtube-auth.js <client_secret.json>");
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(ruta, "utf8"));
const cli = cfg.installed || cfg.web;
if (!cli) { console.error("El JSON no parece un cliente OAuth de Google (falta 'installed' o 'web')."); process.exit(1); }

const PUERTO = 8765;
const REDIRECT = `http://127.0.0.1:${PUERTO}`;
const oauth2 = new google.auth.OAuth2(cli.client_id, cli.client_secret, REDIRECT);
const url = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // fuerza a que devuelva refresh_token aunque ya se haya autorizado antes
  scope: ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube"],
});

console.log("\n1) Abre esta URL en el navegador y autoriza con la cuenta dueña del canal:\n");
console.log(url + "\n");
console.log(`2) Esperando el código en ${REDIRECT} ...`);

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, REDIRECT);
  const code = u.searchParams.get("code");
  if (!code) { res.end("Sin código. Vuelve a intentar."); return; }
  try {
    const { tokens } = await oauth2.getToken(code);
    res.end("Listo. Puedes cerrar esta pestaña y volver a la terminal.");
    console.log("\n3) Secrets para GitHub (Settings → Secrets and variables → Actions):\n");
    console.log(`YT_CLIENT_ID=${cli.client_id}`);
    console.log(`YT_CLIENT_SECRET=${cli.client_secret}`);
    console.log(`YT_REFRESH_TOKEN=${tokens.refresh_token || "(no vino refresh_token: revoca el acceso en myaccount.google.com/permissions y repite)"}`);
    console.log("\nNo pegues estos valores en ningún archivo del repo.");
  } catch (e) {
    res.end("Error al canjear el código: " + e.message);
    console.error(e.message);
  } finally {
    server.close();
  }
});
server.listen(PUERTO);
