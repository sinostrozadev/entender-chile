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
const SALIDA = process.argv[2] || path.join("contenido", "taller", "voz", "ronda2");
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

// Pregunta a Azure qué voces hay, en vez de recordarlo. La regla 31 pide
// acento chileno, así que lo que importa es cuántas es-CL existen y cuáles
// aceptan estilos. Nunca lo habíamos comprobado.
function listarVoces() {
  return new Promise((resolve) => {
    const cfg = sdk.SpeechConfig.fromSubscription(KEY, REGION);
    const synth = new sdk.SpeechSynthesizer(cfg, null);
    synth.getVoicesAsync("es-CL").then((r) => {
      synth.close();
      const v = (r && r.voices) || [];
      resolve(v.map((x) => ({
        nombre: x.shortName || x.name,
        genero: x.gender === 1 ? "femenina" : x.gender === 2 ? "masculina" : "?",
        estilos: (x.styleList || []).filter(Boolean),
      })));
    }).catch(() => { synth.close(); resolve([]); });
  });
}

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const speak = (cuerpo) =>
  `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="es-CL">${cuerpo}</speak>`;
const voz = (contenido, nombre = VOZ) => `<voice name="${nombre}">${contenido}</voice>`;

// RONDA 2 (24-09). Santiago escuchó la ronda 1 y descartó las tres variantes
// que tocan la interpretación a mano: el movimiento de tono "suena
// artificial", el ritmo por frase "tampoco", y del estilo noticiero "no
// detecto el cambio". La conclusión no es insistir con más SSML: si
// manipular la voz se nota, hay que cambiar la voz.
//
// Esta ronda prueba VOCES y AIRE, no interpretación:
//   - cada voz chilena que Azure tenga, leyendo igual y sin trucos
//   - el aire puesto por puntuación (mstts:silence), que es global y no
//     frase por frase, así no se siente dirigido
//   - y el procesado de audio AISLADO, sobre la voz tal cual, que en la
//     ronda 1 iba montado sobre la variante con tono y quedó contaminado
const TEXTO = `${TESIS} ${CIFRA} ${PREGUNTA} ${CITA}`;

const variantesDeVoz = (voces) => {
  const v = [];
  for (const nombre of voces) {
    v.push({
      id: `v-${nombre.replace(/^es-CL-/, "").replace(/Neural$/, "").toLowerCase()}`,
      titulo: `Voz ${nombre}, tal cual`,
      nota: "Sin ningún truco: solo la velocidad de siempre. Lo que se compara es la voz, no la interpretación.",
      ssml: speak(voz(`<prosody rate="-10%">${esc(TEXTO)}</prosody>`, nombre)),
    });
  }
  return v;
};

const VARIANTES_FIJAS = [
  {
    id: "aire-puntuacion",
    titulo: "Aire por puntuación, sin dirigir frase por frase",
    nota: "mstts:silence agrega silencio en comas y puntos de forma pareja. Es lo contrario de la ronda 1: el aire lo pone la puntuación, no yo.",
    ssml: speak(`<voice name="${VOZ}"><mstts:silence type="Sentenceboundary" value="450ms"/><mstts:silence type="Comma-exact" value="180ms"/>` +
      `<prosody rate="-10%">${esc(TEXTO)}</prosody></voice>`),
  },
  {
    id: "lento",
    titulo: "Más lento, y nada más",
    nota: "La misma voz al 84% en vez del 90%. A veces lo único que falta es tiempo para respirar.",
    ssml: speak(voz(`<prosody rate="-16%">${esc(TEXTO)}</prosody>`)),
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
  // El ffmpeg que trae Remotion es una compilación mínima y NO tiene
  // acompressor (24-09: por eso se cayó la primera corrida). Los runners de
  // Ubuntu traen ffmpeg completo, así que se prueba ese primero.
  const candidatos = ["ffmpeg", path.join("node_modules", "@remotion", "compositor-linux-x64-gnu", "ffmpeg")];
  const filtros = "acompressor=threshold=-18dB:ratio=3:attack=12:release=180," +
    "equalizer=f=180:t=q:w=1:g=-2,equalizer=f=3200:t=q:w=1.4:g=3," +
    "loudnorm=I=-16:TP=-1.5:LRA=11";
  let ultimo = "sin ffmpeg disponible";
  for (const ff of candidatos) {
    try {
      execFileSync(ff, ["-v", "error", "-y", "-i", entrada, "-af", filtros, salida], { stdio: "pipe" });
      return null;
    } catch (e) {
      ultimo = `${ff}: ${String(e.stderr || e.message).split("\n").filter(Boolean).pop()}`.slice(0, 200);
    }
  }
  return ultimo;
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });
  const disponibles = await listarVoces();
  const nombresCL = disponibles.map((v) => v.nombre).filter((n) => n.startsWith("es-CL-"));
  console.log(`Voces es-CL que Azure declara: ${nombresCL.join(", ") || "(ninguna)"}`);

  const VARIANTES = [...variantesDeVoz(nombresCL.length ? nombresCL : [VOZ, VOZ2]), ...VARIANTES_FIJAS];
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

  // El procesado AISLADO: sobre la voz tal cual, no sobre una variante con
  // tono. En la ronda 1 iba montado sobre la de pitch y no se podía saber
  // cuánto aportaba el procesado y cuánto molestaba el tono.
  const base = path.join(SALIDA, `${(VARIANTES[0] || {}).id}.mp3`);
  if (fs.existsSync(base)) {
    const destino = path.join(SALIDA, "procesada-sola.mp3");
    const err = procesar(base, destino);
    filas.push({ id: "procesada-sola", titulo: "La voz tal cual, solo procesada",
      nota: `Compresión suave, menos barro en 180 Hz, más presencia en 3,2 kHz y volumen parejo. Sobre ${path.basename(base)}, sin ningún SSML de interpretación.`,
      ok: !err, detalle: err || "lista" });
    console.log(err ? `✗ procesada-sola: ${err}` : "✓ procesada-sola");
  }

  const md = ["# Taller de voz · ronda 2: voces, no trucos", "",
    `Prueba del ${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date())}.`, "",
    "Santiago escuchó la ronda 1 y descartó las tres variantes que tocan la",
    "interpretación a mano: el tono \"suena artificial\", el ritmo por frase",
    "\"tampoco\", y del estilo noticiero \"no detecto el cambio\". Así que esta",
    "ronda cambia de camino: se prueban VOCES y AIRE, no interpretación.", "",
    "## Voces que Azure declara para es-CL", "",
    disponibles.length
      ? ["| Voz | Género | Estilos |", "|---|---|---|",
         ...disponibles.map((v) => `| \`${v.nombre}\` | ${v.genero} | ${v.estilos.length ? v.estilos.join(", ") : "ninguno"} |`)].join("\n")
      : "Azure no devolvió la lista en esta corrida.",
    "", "## Variantes", "",
    "| Variante | Qué prueba | ¿Funcionó? |", "|---|---|---|",
    ...filas.map((f) => `| **${f.id}** · ${f.titulo} | ${f.nota} | ${f.ok ? "✅ " + f.detalle : "❌ " + f.detalle} |`),
    "", "## Texto usado", "", "> " + TEXTO, ""].join("\n");
  fs.writeFileSync(path.join(SALIDA, "INFORME.md"), md);
  console.log(`\nInforme: ${path.join(SALIDA, "INFORME.md")}`);
})().catch((e) => { console.error("taller-voz:", e.message); process.exit(1); });
