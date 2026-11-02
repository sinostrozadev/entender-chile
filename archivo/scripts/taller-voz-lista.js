#!/usr/bin/env node
/**
 * taller-voz-lista.js - Sintetiza el mismo párrafo con una LISTA de voces que
 * se pasa por variable de entorno. Es la herramienta genérica del taller de
 * voz: en vez de escribir un script por ronda, se le dan las voces a probar.
 *
 * Uso:
 *   VOCES="es-MX-JorgeNeural,es-MX-Jorge:DragonHDLatestNeural,es-MX-Alejo:MAI-Voice-2|determined" \
 *   AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=... node scripts/taller-voz-lista.js [dir]
 *
 * Cada entrada es "voz" o "voz|estilo". El estilo se aplica con
 * mstts:express-as y si la voz no lo soporta queda anotado en el informe.
 */
const fs = require("fs");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
const SALIDA = process.argv[2] || path.join("contenido", "taller", "voz", "lista");
const LISTA = (process.env.VOCES || "").split(",").map((x) => x.trim()).filter(Boolean);
if (!KEY || !REGION) { console.error("Faltan AZURE_SPEECH_KEY y AZURE_SPEECH_REGION."); process.exit(1); }
if (!LISTA.length) { console.error("Falta VOCES."); process.exit(1); }

// TEXTO_FILE deja probar con un texto LARGO y real. Con cuatro frases no se
// puede juzgar una voz que va a leer diez minutos: lo que no molesta en 15
// segundos puede ser insoportable en diez minutos, y al revés.
const TEXTO = process.env.TEXTO_FILE && fs.existsSync(process.env.TEXTO_FILE)
  ? fs.readFileSync(process.env.TEXTO_FILE, "utf8").trim()
  : "La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas. " +
  "La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve. " +
  "¿Qué pasa ahora con el proyecto? El Gobierno todavía puede pedir que el Senado revise la reforma.";

const { execFileSync } = require("child_process");

// PROCESAR=1 agrega, por cada voz, una versión con compresión y realce de
// presencia. Es la diferencia entre "voz de computador" y "voz de radio" y no
// depende de Azure.
function procesar(entrada, salida) {
  const filtros = "acompressor=threshold=-18dB:ratio=3:attack=12:release=180," +
    "equalizer=f=180:t=q:w=1:g=-2,equalizer=f=3200:t=q:w=1.4:g=3," +
    "loudnorm=I=-16:TP=-1.5:LRA=11";
  for (const ff of ["ffmpeg", path.join("node_modules", "@remotion", "compositor-linux-x64-gnu", "ffmpeg")]) {
    try { execFileSync(ff, ["-v", "error", "-y", "-i", entrada, "-af", filtros, salida], { stdio: "pipe" }); return null; }
    catch (e) { var ultimo = String(e.stderr || e.message).split("\n").filter(Boolean).pop(); }
  }
  return (ultimo || "sin ffmpeg").slice(0, 200);
}

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function sintetizar(ssml) {
  return new Promise((resolve, reject) => {
    const cfg = sdk.SpeechConfig.fromSubscription(KEY, REGION);
    cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;
    const s = new sdk.SpeechSynthesizer(cfg, null);
    s.speakSsmlAsync(ssml, (r) => {
      s.close();
      if (r.reason !== sdk.ResultReason.SynthesizingAudioCompleted) return reject(new Error(r.errorDetails || String(r.reason)));
      resolve(Buffer.from(r.audioData));
    }, (e) => { s.close(); reject(new Error(String(e))); });
  });
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const filas = [];
  for (const entrada of LISTA) {
    const [nombre, estilo] = entrada.split("|");
    const id = nombre.replace(/[:.]/g, "-").replace("Neural", "").toLowerCase() + (estilo ? `-${estilo}` : "");
    const cuerpo = `<prosody rate="-10%">${esc(TEXTO)}</prosody>`;
    const conEstilo = estilo ? `<mstts:express-as style="${estilo}">${cuerpo}</mstts:express-as>` : cuerpo;
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="es-MX">` +
      `<voice name="${nombre}">${conEstilo}</voice></speak>`;
    try {
      const audio = await sintetizar(ssml);
      fs.writeFileSync(path.join(SALIDA, `${id}.mp3`), audio);
      console.log(`✓ ${entrada}`);
      filas.push({ id, entrada, ok: true, detalle: `${(audio.length / 1024).toFixed(0)} KB` });
      if (process.env.PROCESAR === "1") {
        const err = procesar(path.join(SALIDA, `${id}.mp3`), path.join(SALIDA, `${id}-procesada.mp3`));
        filas.push({ id: `${id}-procesada`, entrada: `${entrada} + compresión y presencia`, ok: !err, detalle: err || "lista" });
        console.log(err ? `✗ ${id}-procesada: ${err}` : `✓ ${id}-procesada`);
      }
    } catch (e) {
      const msg = e.message.split("\n")[0].slice(0, 220);
      console.log(`✗ ${entrada}: ${msg}`);
      filas.push({ id, entrada, ok: false, detalle: msg });
    }
  }
  const md = ["# Taller de voz · lista", "",
    `Prueba del ${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date())}.`, "",
    "| Archivo | Voz pedida | ¿Funcionó? |", "|---|---|---|",
    ...filas.map((f) => `| \`${f.id}.mp3\` | \`${f.entrada}\` | ${f.ok ? "✅ " + f.detalle : "❌ " + f.detalle} |`),
    "", "## Texto usado", "", "> " + TEXTO, ""].join("\n");
  fs.writeFileSync(path.join(SALIDA, "INFORME.md"), md);
  console.log(`\nInforme: ${path.join(SALIDA, "INFORME.md")}`);
})().catch((e) => { console.error("lista:", e.message); process.exit(1); });
