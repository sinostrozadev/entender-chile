#!/usr/bin/env node
/**
 * tts-azure.js - Genera la voz con Azure AI Speech y guarda audio + alineación.
 *
 * Uso:
 *   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=eastus node scripts/tts-azure.js out/narracion.txt out/
 *
 * Variables opcionales:
 *   AZURE_VOICE   (default es-CL-LorenzoNeural; alternativa es-CL-CatalinaNeural)
 *
 * Produce lo MISMO que tts-elevenlabs.js (narracion.mp3 + alignment.json con
 * tiempos por caracter), así que build-timeline.js no cambia. Azure entrega
 * tiempos por PALABRA (WordBoundary); cada palabra se reparte proporcionalmente
 * entre sus caracteres.
 *
 * Además, del plan de producción (Fase 1, punto 5): en cada cambio de sección
 * se inserta una pausa de 1200 ms (SSML <break>) y se anota en out/pausas.json.
 * build-timeline.js usa esas pausas para poner el banner o la cortina de
 * sección DONDE EMPIEZA el silencio, no donde termina: así la cortina suena
 * sobre pausa y no tapa voz.
 */
const fs = require("fs");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
const VOICE = process.env.AZURE_VOICE || "es-CL-LorenzoNeural";
// Velocidad de habla. Santiago (30-08): la lectura normal "es como si leyera
// corriendo"; al 90% se aprecia mucho más. Se ajusta con AZURE_RATE (-8%, -12%...).
const RATE = process.env.AZURE_RATE || "-10%";
const PAUSA_SECCION_MS = 1200;
const LIMITE = 5000; // caracteres por request; Azure corta el audio en 10 min por solicitud

const TICK = 1 / 10_000_000; // los offsets del SDK vienen en unidades de 100 ns

// Escapa para XML y devuelve, junto al texto escapado, el mapa de posición
// escapada → posición original. Sin el mapa, los WordBoundary (que refieren
// al SSML) no se pueden devolver al texto plano.
function escaparConMapa(texto) {
  let esc = "";
  const mapa = [];
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    const e = c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c;
    for (let k = 0; k < e.length; k++) mapa[esc.length + k] = i;
    esc += e;
  }
  return { esc, mapa };
}

// Trozos: se corta SIEMPRE en los límites de sección (ahí va la pausa) y,
// dentro de una sección larga, por párrafos hasta LIMITE.
function trocear(texto, cortesSeccion) {
  const cortes = [...new Set(cortesSeccion.filter((c) => c > 0 && c < texto.length))].sort((a, b) => a - b);
  const secciones = [];
  let ini = 0;
  for (const c of cortes) { secciones.push({ texto: texto.slice(ini, c), pausa: ini !== 0 }); ini = c; }
  secciones.push({ texto: texto.slice(ini), pausa: ini !== 0 });

  const chunks = [];
  for (const s of secciones) {
    if (s.texto.length <= LIMITE) { chunks.push({ ...s }); continue; }
    const parrafos = s.texto.split(/(?<=\n\n)/); // conserva los separadores
    let actual = "", primera = true;
    for (const p of parrafos) {
      if ((actual + p).length > LIMITE && actual) {
        chunks.push({ texto: actual, pausa: s.pausa && primera });
        primera = false; actual = p;
      } else actual += p;
    }
    if (actual) chunks.push({ texto: actual, pausa: s.pausa && primera });
  }
  return chunks;
}

function sintetizar(chunk) {
  return new Promise((resolve, reject) => {
    const cfg = sdk.SpeechConfig.fromSubscription(KEY, REGION);
    cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;
    cfg.requestWordLevelTimestamps();
    const synth = new sdk.SpeechSynthesizer(cfg, null);

    const { esc, mapa } = escaparConMapa(chunk.texto);
    const brk = chunk.pausa ? `<break time="${PAUSA_SECCION_MS}ms"/>` : "";
    const prefijo = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-CL"><voice name="${VOICE}"><prosody rate="${RATE}">${brk}`;
    const ssml = `${prefijo}${esc}</prosody></voice></speak>`;

    const palabras = [];
    synth.wordBoundary = (_s, e) => {
      // e.textOffset apunta al SSML completo; se devuelve al texto plano
      const enEsc = e.textOffset - prefijo.length;
      if (enEsc < 0 || enEsc >= esc.length) return; // el break u otro tag
      palabras.push({
        desde: mapa[enEsc],
        largo: e.wordLength,
        t0: e.audioOffset * TICK,
        dur: e.duration * TICK,
      });
    };
    synth.speakSsmlAsync(ssml, (r) => {
      synth.close();
      if (r.reason !== sdk.ResultReason.SynthesizingAudioCompleted) {
        return reject(new Error(`Azure: ${r.errorDetails || r.reason}`));
      }
      resolve({ audio: Buffer.from(r.audioData), durSeg: r.audioDuration * TICK, palabras });
    }, (err) => { synth.close(); reject(new Error(`Azure: ${err}`)); });
  });
}

async function main() {
  const [, , entrada, salidaDir = "out/"] = process.argv;
  if (!KEY || !REGION || !entrada) {
    console.error("Uso: AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=... node scripts/tts-azure.js out/narracion.txt out/");
    process.exit(1);
  }
  const texto = fs.readFileSync(entrada, "utf8");

  // cortes de sección: del parsed.json vecino (los eventos "seccion" anclan al
  // charStart del párrafo que los sigue)
  let cortes = [];
  const rutaParsed = path.join(path.dirname(entrada), "parsed.json");
  if (fs.existsSync(rutaParsed)) {
    const parsed = JSON.parse(fs.readFileSync(rutaParsed, "utf8"));
    cortes = parsed.eventos
      .filter((ev) => ev.tipo === "seccion" && ev.anchor != null && parsed.eventos[ev.anchor]?.charStart != null)
      .map((ev) => parsed.eventos[ev.anchor].charStart);
  } else {
    console.warn("AVISO: no hay parsed.json junto a la narración; sin pausas de sección.");
  }

  const chunks = trocear(texto, cortes);
  console.log(`Azure ${VOICE}: ${chunks.length} trozo(s), ${texto.length} caracteres, ${cortes.length} secciones con pausa...`);

  const audios = [];
  const starts = new Array(texto.length).fill(0);
  const ends = new Array(texto.length).fill(0);
  const pausas = [];
  let offset = 0, base = 0;

  for (let i = 0; i < chunks.length; i++) {
    const ch = chunks[i];
    const r = await sintetizar(ch);
    if (ch.pausa) pausas.push({ from: Number(offset.toFixed(3)), dur: PAUSA_SECCION_MS / 1000, charIndex: base });
    for (const w of r.palabras) {
      const ini = base + w.desde;
      const paso = w.dur / Math.max(1, w.largo);
      for (let k = 0; k < w.largo && ini + k < texto.length; k++) {
        starts[ini + k] = offset + w.t0 + paso * k;
        ends[ini + k] = offset + w.t0 + paso * (k + 1);
      }
    }
    audios.push(r.audio);
    offset += r.durSeg;
    base += ch.texto.length;
    console.log(`  trozo ${i + 1}/${chunks.length} listo (${(offset / 60).toFixed(1)} min acumulados, ${r.palabras.length} palabras)`);
  }

  // los caracteres sin palabra (espacios, saltos) heredan el tiempo del vecino
  let ultimo = 0;
  for (let i = 0; i < texto.length; i++) {
    if (ends[i] === 0) { starts[i] = ultimo; ends[i] = ultimo; }
    else ultimo = ends[i];
  }

  fs.mkdirSync(salidaDir, { recursive: true });
  fs.writeFileSync(path.join(salidaDir, "narracion.mp3"), Buffer.concat(audios));
  fs.writeFileSync(path.join(salidaDir, "alignment.json"), JSON.stringify({
    characters: texto.split(""),
    character_start_times_seconds: starts.map((v) => Number(v.toFixed(3))),
    character_end_times_seconds: ends.map((v) => Number(v.toFixed(3))),
  }));
  fs.writeFileSync(path.join(salidaDir, "pausas.json"), JSON.stringify(pausas));
  console.log(`OK: audio (${(offset / 60).toFixed(1)} min), alineación y ${pausas.length} pausas en ${salidaDir}`);
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
