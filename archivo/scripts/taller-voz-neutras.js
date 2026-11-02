#!/usr/bin/env node
/**
 * taller-voz-neutras.js - Las voces en español que NO son chilenas, y qué se
 * puede hacer con ellas.
 *
 * Por qué existe (24-09-2026): Azure tiene exactamente DOS voces chilenas,
 * Lorenzo y Catalina, y ninguna soporta estilos. Eso lo confirmó la API en la
 * ronda 2, y explica por qué el "estilo noticiero" no se notaba: Azure
 * aceptaba la etiqueta y la voz la ignoraba. Con el acento chileno el techo
 * está donde está.
 *
 * Fuera de Chile hay decenas de voces y varias SÍ traen estilos. Este script
 * pregunta a Azure la lista completa de voces en español, elige candidatas
 * neutras y sintetiza el mismo párrafo con cada una; además, cuando una voz
 * declara estilos, sintetiza una versión con estilo para oír la diferencia.
 *
 * OJO: la regla 31 exige acento chileno declarado. Esto es una PRUEBA para
 * decidir con el oído si vale la pena cambiar esa regla. Nada de esto entra
 * en producción sin que Santiago cambie la regla primero.
 *
 * Uso: AZURE_SPEECH_KEY=... AZURE_SPEECH_REGION=... node scripts/taller-voz-neutras.js [dir]
 */
const fs = require("fs");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
const SALIDA = process.argv[2] || path.join("contenido", "taller", "voz", "neutras");
if (!KEY || !REGION) { console.error("Faltan AZURE_SPEECH_KEY y AZURE_SPEECH_REGION."); process.exit(1); }

const TEXTO = "La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas. " +
  "La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve. " +
  "¿Qué pasa ahora con el proyecto? El Gobierno todavía puede pedir que el Senado revise la reforma.";

// Candidatas: español de América, masculinas, que es lo más cercano a la voz
// actual del canal. Se prueba solo lo que Azure declare como existente.
const PREFERIDAS = [
  "es-MX-JorgeNeural", "es-CO-GonzaloNeural", "es-AR-TomasNeural",
  "es-PE-AlexNeural", "es-US-AlonsoNeural", "es-ES-AlvaroNeural",
];

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const speak = (c) => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="es-MX">${c}</speak>`;

function listar(locale) {
  return new Promise((resolve) => {
    const cfg = sdk.SpeechConfig.fromSubscription(KEY, REGION);
    const s = new sdk.SpeechSynthesizer(cfg, null);
    s.getVoicesAsync(locale).then((r) => {
      s.close();
      resolve(((r && r.voices) || []).map((x) => ({
        nombre: x.shortName || x.name,
        locale: x.locale,
        genero: x.gender === 1 ? "femenina" : x.gender === 2 ? "masculina" : "?",
        estilos: (x.styleList || []).filter(Boolean),
      })));
    }).catch(() => { s.close(); resolve([]); });
  });
}

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
  // se consultan los locales uno por uno: getVoicesAsync filtra por locale
  const locales = ["es-MX", "es-CO", "es-AR", "es-PE", "es-US", "es-ES"];
  let todas = [];
  for (const l of locales) todas = todas.concat(await listar(l));
  const porNombre = new Map(todas.map((v) => [v.nombre, v]));
  console.log(`Voces en español declaradas: ${todas.length}`);

  const elegidas = PREFERIDAS.filter((n) => porNombre.has(n));
  const filas = [];
  for (const nombre of elegidas) {
    const v = porNombre.get(nombre);
    const id = nombre.replace("Neural", "").toLowerCase();
    try {
      const audio = await sintetizar(speak(`<voice name="${nombre}"><prosody rate="-10%">${esc(TEXTO)}</prosody></voice>`));
      fs.writeFileSync(path.join(SALIDA, `${id}.mp3`), audio);
      console.log(`✓ ${nombre} (${v.estilos.length} estilos)`);
      filas.push({ id, nombre, estilos: v.estilos, ok: true });
    } catch (e) {
      console.log(`✗ ${nombre}: ${e.message.split("\n")[0].slice(0, 120)}`);
      filas.push({ id, nombre, estilos: v.estilos, ok: false, error: e.message.split("\n")[0].slice(0, 200) });
    }
  }

  // Qué se puede HACER con ellas: si alguna trae estilos, se sintetiza con el
  // más útil para un informe, para oír si de verdad cambia algo.
  const conEstilo = filas.find((f) => f.ok && f.estilos.length);
  if (conEstilo) {
    const estilo = ["newscast-formal", "newscast-casual", "newscast", "narration-professional", "serious", "calm"]
      .find((e) => conEstilo.estilos.includes(e)) || conEstilo.estilos[0];
    try {
      const audio = await sintetizar(speak(
        `<voice name="${conEstilo.nombre}"><mstts:express-as style="${estilo}"><prosody rate="-10%">${esc(TEXTO)}</prosody></mstts:express-as></voice>`));
      fs.writeFileSync(path.join(SALIDA, `${conEstilo.id}-estilo-${estilo}.mp3`), audio);
      console.log(`✓ ${conEstilo.nombre} con estilo "${estilo}"`);
      filas.push({ id: `${conEstilo.id}-estilo-${estilo}`, nombre: `${conEstilo.nombre} · estilo ${estilo}`, estilos: [], ok: true, esEstilo: true });
    } catch (e) { console.log(`✗ estilo: ${e.message.split("\n")[0]}`); }
  }

  const md = ["# Taller de voz · voces neutras", "",
    `Prueba del ${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date())}.`, "",
    "Azure tiene DOS voces chilenas y ninguna soporta estilos (confirmado con",
    "la API en la ronda 2). Con acento chileno, el techo está donde está. Acá",
    "se escucha qué hay fuera de Chile y qué trae cada una.", "",
    "**Esto es una prueba.** La regla 31 exige acento chileno declarado; nada",
    "de esto entra en producción sin cambiar esa regla primero.", "",
    "## Lo que sintetizamos", "", "| Archivo | Voz | ¿Funcionó? |", "|---|---|---|",
    ...filas.map((f) => `| \`${f.id}.mp3\` | ${f.nombre} | ${f.ok ? "✅" : "❌ " + f.error} |`),
    "", "## Todas las voces en español que Azure declara, y sus estilos", "",
    "Los estilos son lo que NO tienen las chilenas: la misma voz diciendo lo",
    "mismo con otra intención.", "",
    "| Voz | País | Género | Estilos |", "|---|---|---|---|",
    ...todas.sort((a, b) => b.estilos.length - a.estilos.length)
      .map((v) => `| \`${v.nombre}\` | ${v.locale} | ${v.genero} | ${v.estilos.length ? v.estilos.join(", ") : "ninguno"} |`),
    "", "## Texto usado", "", "> " + TEXTO, ""].join("\n");
  fs.writeFileSync(path.join(SALIDA, "INFORME.md"), md);
  console.log(`\nInforme: ${path.join(SALIDA, "INFORME.md")}`);
})().catch((e) => { console.error("neutras:", e.message); process.exit(1); });
