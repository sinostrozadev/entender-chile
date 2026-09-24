#!/usr/bin/env node
/**
 * taller-voz.js - Sintetiza el MISMO párrafo en varias variantes de SSML para
 * poder ESCUCHARLAS seguidas y decidir con el oído, no discutiendo.
 *
 * Nace el 24-09-2026. Motivo: la voz del canal lleva un mes con una sola
 * etiqueta de velocidad al 90%, una voz y una pausa de 1,2 s entre secciones.
 * Diez minutos con el mismo tono, la misma velocidad y la misma intención de
 * principio a fin. No suena plana por casualidad: está construida plana.
 *
 * Hay dos variantes que NO sé si Azure soporta en las voces chilenas
 * (`mstts:express-as` y `emphasis`). Por eso cada variante va en su propio
 * try: si Azure la rechaza, se anota el error en el informe y las demás
 * siguen. Probar es más barato que averiguar leyendo.
 *
 * Uso:
 *   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=eastus node scripts/taller-voz.js [dir]
 *
 * Deja los mp3 y INFORME.md en contenido/taller/voz/.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
const SALIDA = process.argv[2] || path.join("contenido", "taller", "voz");
const VOZ = "es-CL-LorenzoNeural";
const VOZ2 = "es-CL-CatalinaNeural";

if (!KEY || !REGION) { console.error("Faltan AZURE_SPEECH_KEY y AZURE_SPEECH_REGION."); process.exit(1); }

// El texto de prueba lleva a propósito las cuatro cosas que nos importan: una
// tesis, una cifra grande, una pregunta y una cita. Si una variante mejora la
// cifra pero arruina la cita, con un texto pobre no nos daríamos cuenta.
const TESIS = "La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas.";
const CIFRA = "La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve.";
const PREGUNTA = "¿Qué pasa ahora con el proyecto?";
const CITA = "El Gobierno todavía puede pedir que el Senado revise la reforma.";

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const speak = (cuerpo) =>
  `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="es-CL">${cuerpo}</speak>`;
const voz = (contenido, nombre = VOZ) => `<voice name="${nombre}">${contenido}</voice>`;

const VARIANTES = [
  {
    id: "1-actual",
    titulo: "Como suena hoy",
    nota: "Una sola velocidad al 90% y nada más. Es la referencia contra la que se comparan las otras.",
    ssml: speak(voz(`<prosody rate="-10%">${esc(TESIS)} ${esc(CIFRA)} ${esc(PREGUNTA)} ${esc(CITA)}</prosody>`)),
  },
  {
    id: "2-ritmo",
    titulo: "Velocidad y pausas por tipo de frase",
    nota: "La tesis más lenta, la cifra con una pausa antes para que pese, la pregunta con aire después. Solo prosody y break: esto funciona seguro.",
    ssml: speak(voz(
      `<prosody rate="-16%">${esc(TESIS)}</prosody><break time="520ms"/>` +
      `<prosody rate="-6%">La reforma obtuvo <break time="260ms"/>ochenta y ocho votos a favor.</prosody><break time="420ms"/>` +
      `<prosody rate="-14%">Necesitaba ochenta y nueve.</prosody><break time="700ms"/>` +
      `<prosody rate="-8%">${esc(PREGUNTA)}</prosody><break time="620ms"/>` +
      `<prosody rate="-10%">${esc(CITA)}</prosody>`)),
  },
  {
    id: "3-tono",
    titulo: "Ritmo más movimiento de tono",
    nota: "Lo anterior, y además el tono sube en la pregunta y baja en el cierre. Es lo que hace que una voz suene viva y no leída.",
    ssml: speak(voz(
      `<prosody rate="-16%" pitch="-2%">${esc(TESIS)}</prosody><break time="520ms"/>` +
      `<prosody rate="-6%">La reforma obtuvo <break time="260ms"/><prosody pitch="+4%">ochenta y ocho votos a favor.</prosody></prosody><break time="420ms"/>` +
      `<prosody rate="-14%" pitch="-4%">Necesitaba ochenta y nueve.</prosody><break time="700ms"/>` +
      `<prosody rate="-8%" pitch="+8%">${esc(PREGUNTA)}</prosody><break time="620ms"/>` +
      `<prosody rate="-10%" pitch="-3%">${esc(CITA)}</prosody>`)),
  },
  {
    id: "4-dos-voces",
    titulo: "Segunda voz para la cita",
    nota: "La regla 31 permite dos voces cuando el cambio significa algo. Una cita leída por otra voz se entiende como cita sin decir comillas.",
    ssml: speak(
      voz(`<prosody rate="-16%">${esc(TESIS)}</prosody><break time="520ms"/><prosody rate="-6%">${esc(CIFRA)}</prosody><break time="600ms"/>`) +
      voz(`<prosody rate="-8%">${esc(CITA)}</prosody>`, VOZ2) +
      voz(`<break time="400ms"/><prosody rate="-10%">${esc(PREGUNTA)}</prosody>`)),
  },
  {
    id: "5-estilo-noticiero",
    titulo: "Estilo noticiero (PUEDE FALLAR)",
    nota: "mstts:express-as con estilo newscast. No sé si las voces chilenas lo soportan; si Azure lo rechaza, queda escrito acá y dejamos de preguntárnoslo.",
    ssml: speak(voz(
      `<mstts:express-as style="newscast"><prosody rate="-12%">${esc(TESIS)} ${esc(CIFRA)} ${esc(PREGUNTA)} ${esc(CITA)}</prosody></mstts:express-as>`)),
  },
  {
    id: "6-enfasis-y-siglas",
    titulo: "Énfasis y siglas (PUEDE FALLAR EL ÉNFASIS)",
    nota: "emphasis sobre la palabra que importa, y sub para que una sigla se lea expandida sin tocar el texto del guion.",
    ssml: speak(voz(
      `<prosody rate="-12%">La <emphasis level="strong">Cámara</emphasis> rechazó por <emphasis level="strong">un voto</emphasis> la reforma.` +
      `<break time="500ms"/>La <sub alias="Dirección Meteorológica de Chile">DMC</sub> ya había advertido el sistema frontal.</prosody>`)),
  },
];

function sintetizar(ssml) {
  return new Promise((resolve, reject) => {
    const cfg = sdk.SpeechConfig.fromSubscription(KEY, REGION);
    cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;
    const synth = new sdk.SpeechSynthesizer(cfg, null);
    synth.speakSsmlAsync(ssml, (r) => {
      synth.close();
      if (r.reason !== sdk.ResultReason.SynthesizingAudioCompleted) return reject(new Error(r.errorDetails || String(r.reason)));
      resolve(Buffer.from(r.audioData));
    }, (e) => { synth.close(); reject(new Error(String(e))); });
  });
}

// Variante 7: no es SSML. Es la misma voz de la variante 3 pasada por una
// compresión suave y un realce de presencia. Es la diferencia entre "voz de
// computador" y "voz de radio", y no depende de Azure.
function procesar(entrada, salida) {
  const ff = path.join("node_modules", "@remotion", "compositor-linux-x64-gnu", "ffmpeg");
  if (!fs.existsSync(ff)) return "sin ffmpeg de Remotion en este runner";
  execFileSync(ff, ["-v", "error", "-y", "-i", entrada,
    "-af", "acompressor=threshold=-18dB:ratio=3:attack=12:release=180,equalizer=f=180:t=q:w=1:g=-2,equalizer=f=3200:t=q:w=1.4:g=3,loudnorm=I=-16:TP=-1.5:LRA=11",
    salida], { stdio: "inherit" });
  return null;
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const filas = [];
  for (const v of VARIANTES) {
    const destino = path.join(SALIDA, `${v.id}.mp3`);
    try {
      const audio = await sintetizar(v.ssml);
      fs.writeFileSync(destino, audio);
      console.log(`✓ ${v.id}: ${(audio.length / 1024).toFixed(0)} KB`);
      filas.push({ ...v, ok: true, detalle: `${(audio.length / 1024).toFixed(0)} KB` });
    } catch (e) {
      console.log(`✗ ${v.id}: ${e.message.split("\n")[0].slice(0, 160)}`);
      filas.push({ ...v, ok: false, detalle: e.message.split("\n")[0].slice(0, 300) });
    }
  }

  // la procesada sale de la 3 si existe, y si no de la 2, y si no de la 1
  const base = ["3-tono", "2-ritmo", "1-actual"].map((id) => path.join(SALIDA, `${id}.mp3`)).find((p) => fs.existsSync(p));
  if (base) {
    const destino = path.join(SALIDA, "7-procesada.mp3");
    const err = procesar(base, destino);
    filas.push({ id: "7-procesada", titulo: "La misma voz, procesada",
      nota: `Compresión suave, menos barro en 180 Hz, más presencia en 3,2 kHz y volumen parejo. Hecha sobre ${path.basename(base)}.`,
      ok: !err, detalle: err || "lista" });
    console.log(err ? `✗ 7-procesada: ${err}` : "✓ 7-procesada");
  }

  const md = ["# Taller de voz: qué se puede y qué no", "",
    `Prueba del ${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date())}. ` +
    "Mismo párrafo, varias formas de decirlo. Se decide escuchando.", "",
    "| Variante | Qué prueba | ¿Funcionó? |", "|---|---|---|",
    ...filas.map((f) => `| **${f.id}** · ${f.titulo} | ${f.nota} | ${f.ok ? "✅ " + f.detalle : "❌ " + f.detalle} |`),
    "", "## Texto usado", "",
    "> " + [TESIS, CIFRA, PREGUNTA, CITA].join(" "), "",
    "Lleva a propósito una tesis, una cifra, una pregunta y una cita: si una",
    "variante mejora la cifra pero arruina la cita, con un texto pobre no nos",
    "daríamos cuenta.", ""].join("\n");
  fs.writeFileSync(path.join(SALIDA, "INFORME.md"), md);
  console.log(`\nInforme: ${path.join(SALIDA, "INFORME.md")}`);
})().catch((e) => { console.error("taller-voz:", e.message); process.exit(1); });
