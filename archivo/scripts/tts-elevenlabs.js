#!/usr/bin/env node
/**
 * tts-elevenlabs.js - Genera la voz con ElevenLabs y guarda audio + alineación.
 *
 * Uso:
 *   ELEVENLABS_API_KEY=xxx VOICE_ID=yyy node scripts/tts-elevenlabs.js out/narracion.txt out/
 *
 * Variables opcionales: ELEVEN_MODEL (default eleven_multilingual_v2)
 *
 * VERIFICAR ANTES DEL PRIMER USO (esto cambia con el tiempo):
 *   1. Endpoint vigente de "with-timestamps" y su límite de caracteres por request.
 *   2. Modelo recomendado actual para español.
 *   3. Que tu plan tiene licencia comercial.
 * Docs: https://elevenlabs.io/docs
 *
 * El texto se trocea por párrafos (~4000 caracteres) y los timestamps se
 * desplazan para que la alineación final corresponda EXACTAMENTE a narracion.txt.
 * Nota: la concatenación de MP3 por buffer funciona en la práctica, pero si
 * notas un clic entre trozos, re-múltiplexa con: ffmpeg -i narracion.mp3 -c copy narracion.fixed.mp3
 */
const fs = require("fs");
const path = require("path");

const API = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.VOICE_ID;
const MODEL = process.env.ELEVEN_MODEL || "eleven_multilingual_v2";
const LIMITE = 4000;

async function ttsChunk(texto) {
  const res = await fetch(`${API}/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ text: texto, model_id: MODEL }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return res.json(); // { audio_base64, alignment: { characters, character_start_times_seconds, character_end_times_seconds } }
}

function trocear(texto) {
  const parrafos = texto.split("\n\n");
  const chunks = [];
  let actual = "";
  for (const p of parrafos) {
    const candidato = actual ? actual + "\n\n" + p : p;
    if (candidato.length > LIMITE && actual) { chunks.push(actual); actual = p; }
    else actual = candidato;
  }
  if (actual) chunks.push(actual);
  return chunks;
}

async function main() {
  const [, , entrada, salidaDir = "out/"] = process.argv;
  if (!KEY || !VOICE || !entrada) {
    console.error("Uso: ELEVENLABS_API_KEY=... VOICE_ID=... node scripts/tts-elevenlabs.js out/narracion.txt out/");
    process.exit(1);
  }
  const texto = fs.readFileSync(entrada, "utf8");
  const chunks = trocear(texto);
  console.log(`Enviando ${chunks.length} trozo(s), ${texto.length} caracteres en total...`);

  const audios = [];
  const characters = [], starts = [], ends = [];
  let offset = 0;

  for (let i = 0; i < chunks.length; i++) {
    // Cada trozo intermedio incluye el separador para que la suma == narracion.txt
    const conSep = i < chunks.length - 1 ? chunks[i] + "\n\n" : chunks[i];
    const r = await ttsChunk(conSep);
    audios.push(Buffer.from(r.audio_base64, "base64"));
    const a = r.alignment;
    for (let k = 0; k < a.characters.length; k++) {
      characters.push(a.characters[k]);
      starts.push(a.character_start_times_seconds[k] + offset);
      ends.push(a.character_end_times_seconds[k] + offset);
    }
    offset = ends[ends.length - 1] || offset;
    console.log(`  trozo ${i + 1}/${chunks.length} listo (${(offset / 60).toFixed(1)} min acumulados)`);
  }

  fs.mkdirSync(salidaDir, { recursive: true });
  fs.writeFileSync(path.join(salidaDir, "narracion.mp3"), Buffer.concat(audios));
  fs.writeFileSync(path.join(salidaDir, "alignment.json"), JSON.stringify({
    characters, character_start_times_seconds: starts, character_end_times_seconds: ends,
  }));
  if (characters.join("") !== texto) {
    console.warn("AVISO: los caracteres devueltos no coinciden 1:1 con narracion.txt (normalización del proveedor). " +
      "build-timeline.js seguirá funcionando si la diferencia es menor; revisa el aviso que imprima.");
  }
  console.log(`OK: audio y alineación en ${salidaDir}`);
}
main().catch(e => { console.error(e); process.exit(1); });
