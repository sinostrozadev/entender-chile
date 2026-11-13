/**
 * Voz de las dos plantillas de Entender Chile.
 *   npx tsx scripts/voz.mts <ruta-guion.json>
 * Recibe las líneas de voz de la plantilla (tesis/plan.ts `lineasTesis`, grafico/plan.ts `lineasGrafico`) con sus
 * silencios antes/después y genera public/voz/<id>/<n>.mp3 y public/voz/<id>/tiempos.json con la duración y los límites
 * de palabra de cada línea (subtítulos palabra a palabra y gráficos que se construyen con la voz).
 *
 * Proveedores (variable de entorno VOZ_PROVEEDOR):
 *  - `edge` (por defecto): msedge-tts, gratis y sin clave. Voz es-CL-LorenzoNeural.
 *  - `azure`: SDK oficial de Azure Speech con la MISMA voz neural, para cuando Edge falle o se bloquee. Lee
 *    AZURE_SPEECH_KEY y AZURE_SPEECH_REGION; si falta alguna, falla con un mensaje claro (nunca cae en silencio a otra voz,
 *    porque mezclar proveedores dentro de una semana cambia el timbre del canal).
 * Ambos entregan límites de palabra (WordBoundary) en ticks de 100 ns, así que el alineador es el mismo.
 * Cachea por hash(texto + voz + prosodia + proveedor): si la línea no cambió, no vuelve a llamar al servicio.
 */
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import * as sdkAzure from 'microsoft-cognitiveservices-speech-sdk';
import { parseFile } from 'music-metadata';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VOZ_POR_DEFECTO, type GuionGrafico, type GuionTesis } from '../src/plantillas/comun/guion';
import { habladasDe, alinearHabladas, VERSION_ALINEACION, type Limite } from './lib/alinear.mjs';
import { armarTiempos, type LineaVoz, type MedidaLinea, type Palabra, type Tiempos } from '../src/plantillas/comun/plan';
import { lineasTesis } from '../src/plantillas/tesis/plan';
import { lineasGrafico } from '../src/plantillas/grafico/plan';
import { numeroAPalabras } from '../src/plantillas/comun/numeros';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FORMATO_AUDIO = OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3;
/** Narración: un poco más lenta que la lectura neutra. Lorenzo a velocidad normal suena apurado para un canal que se
 *  presenta como "el resumen sin gritos"; -4 % le da aire sin que se note estirado. Tono ÚNICO en todo el video. */
const PROSODIA = { rate: '-4%' };
export type ProveedorVoz = 'edge' | 'azure';
export const proveedorVoz = (): ProveedorVoz => {
  const p = (process.env.VOZ_PROVEEDOR ?? 'edge').toLowerCase();
  if (p !== 'edge' && p !== 'azure') throw new Error(`VOZ_PROVEEDOR="${p}" no existe: usa edge o azure`);
  return p;
};
/** Preguntas (v3.1, Santiago 2026-11-07: "las preguntas suenan planas"): la frase que termina en "?" se sintetiza aparte,
 *  un poco más aguda y más lenta. Medido con Jorge: en las preguntas con "qué/cómo/por qué" el tono BAJA al final igual que en
 *  una afirmación (f0 final/cuerpo ≈ 0,8) y solo sube en las de sí/no; el servicio rechaza cualquier etiqueta SSML (prosody,
 *  contour, break), así que el único mando por frase es la prosodia de la llamada. */
const PROSODIA_PREGUNTA = { rate: '-3%', pitch: '+10%' };
/** Santiago (2026-11-08) probó el tono +10 % en las preguntas y NO le gustó: "mejor que dejes siempre el mismo tono". La
 *  segmentación queda disponible pero apagada: toda la línea va en un solo pedido con PROSODIA. */
const SEGMENTAR_PREGUNTAS = false;
/** Sube cuando cambia cómo se prepara el texto para el servicio (números, segmentación): invalida la caché. */
const VERSION_VOZ = 4;
const REINTENTOS = 3;

/**
 * Texto que se manda al servicio. es-MX lee "1.000" como decimal ("uno punto cero cero cero") porque en México el punto es
 * decimal: toda cifra con separador de miles (y las decimales con coma) va en palabras ("mil", "tres mil doscientos",
 * "dos coma cinco"). El alineador ya reparte el límite de una cifra por su lectura en palabras (lib/alinear.mts), así que
 * los subtítulos siguen mostrando "1.000".
 */
export const textoParaVoz = (texto: string) =>
  texto
    // "2,5 %" y "0,7%" se dicen "dos coma cinco por ciento": el servicio a veces lee el signo suelto como "porcentaje".
    .replace(/(\d)\s*%/g, '$1 por ciento')
    .replace(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+,\d+/g, (m) => numeroAPalabras(m));

/** Frases de una línea con la prosodia de cada una; las vecinas con la misma prosodia se juntan en un solo pedido. */
export const segmentosDeVoz = (texto: string): { texto: string; prosodia: Record<string, string>; pregunta: boolean }[] => {
  const frases = texto.match(/[^.!?…]+[.!?…]+["»)]?\s*|[^.!?…]+$/g) ?? [texto];
  const seg: { texto: string; prosodia: Record<string, string>; pregunta: boolean }[] = [];
  for (const f of frases) {
    const pregunta = /\?["»)]?\s*$/.test(f);
    const ultimo = seg[seg.length - 1];
    if (ultimo && ultimo.pregunta === pregunta) ultimo.texto += f;
    else seg.push({ texto: f, prosodia: pregunta ? PROSODIA_PREGUNTA : PROSODIA, pregunta });
  }
  return seg.map((s) => ({ ...s, texto: s.texto.trim() })).filter((s) => s.texto);
};

/** `limites` = WordBoundary crudos del servicio (para diagnosticar y realinear sin volver a sintetizar). */
type Sidecar = { hash: string; voz: string; duracionAudio: number; palabras: Palabra[]; reales: boolean; texto: string; desfaseMax?: number; alineacion?: number; limites?: { texto: string; inicio: number; fin: number }[] };

const hashDe = (texto: string, voz: string) => crypto.createHash('sha256').update(`${proveedorVoz()}\n${voz}\n${JSON.stringify(PROSODIA)}\n${SEGMENTAR_PREGUNTAS ? JSON.stringify(PROSODIA_PREGUNTA) : 'sin-segmentar'}\nv${VERSION_VOZ}\n${textoParaVoz(texto)}`).digest('hex').slice(0, 16);

/** Lee un guion (envoltorio {plantilla, props}) SIN validar: cada preparar-* valida con su schema. */
export const leerGuion = (ruta: string): { plantilla: 'tesis' | 'grafico'; props: GuionTesis | GuionGrafico } => {
  const crudo = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  if (!crudo.plantilla) throw new Error(`${ruta}: falta "plantilla" (tesis|grafico)`);
  return { plantilla: crudo.plantilla, props: crudo.props };
};

/** Líneas de voz de un guion según su plantilla. */
export const lineasDe = (plantilla: 'tesis' | 'grafico', props: GuionTesis | GuionGrafico): LineaVoz[] =>
  plantilla === 'tesis' ? lineasTesis(props as GuionTesis) : lineasGrafico(props as GuionGrafico);

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

const sintetizarUno = async (tts: MsEdgeTTS, texto: string, prosodia: Record<string, string>): Promise<{ audio: Buffer; limites: Limite[] }> => {
  const { audioStream, metadataStream } = tts.toStream(texto, prosodia);
  const partes: Buffer[] = [];
  const limites: Limite[] = [];
  const metaListo = new Promise<void>((resolve) => {
    if (!metadataStream) return resolve();
    metadataStream.on('data', (c: Buffer) => { try { limites.push(...(JSON.parse(c.toString()).Metadata as Limite[])); } catch { /* trozo no JSON: se ignora */ } });
    metadataStream.once('close', () => resolve());
    metadataStream.once('end', () => resolve());
    metadataStream.once('error', () => resolve());
  });
  const limite = setTimeout(() => audioStream.destroy(new Error('tiempo agotado en la síntesis')), 60000);
  try { for await (const c of audioStream) partes.push(c as Buffer); } finally { clearTimeout(limite); }
  await Promise.race([metaListo, esperar(1500)]);
  const audio = Buffer.concat(partes);
  if (audio.length < 1000) throw new Error('audio vacío');
  return { audio, limites };
};

/** Escapa texto para SSML (Azure exige SSML para fijar la prosodia). */
const escaparXml = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Síntesis por Azure Speech. Devuelve los límites con la MISMA forma que msedge-tts (`Limite`, ticks de 100 ns) para que el
 * alineador no distinga el proveedor. Los WordBoundary de puntuación se descartan: Edge tampoco los manda.
 */
const sintetizarAzure = async (voz: string, texto: string, prosodia: Record<string, string>): Promise<{ audio: Buffer; limites: Limite[] }> => {
  const clave = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION;
  if (!clave || !region) throw new Error('VOZ_PROVEEDOR=azure pero faltan AZURE_SPEECH_KEY y/o AZURE_SPEECH_REGION en el entorno');
  const config = sdkAzure.SpeechConfig.fromSubscription(clave, region);
  config.speechSynthesisOutputFormat = sdkAzure.SpeechSynthesisOutputFormat.Audio24Khz96KBitRateMonoMp3;
  config.speechSynthesisVoiceName = voz;
  // Sin AudioConfig: el audio vuelve en memoria (no se reproduce en un parlante del runner).
  const sintetizador = new sdkAzure.SpeechSynthesizer(config, null as unknown as sdkAzure.AudioConfig);
  const limites: Limite[] = [];
  sintetizador.wordBoundary = (_s, e) => {
    if (e.boundaryType !== sdkAzure.SpeechSynthesisBoundaryType.Word) return;
    limites.push({ Type: 'WordBoundary', Data: { Offset: e.audioOffset, Duration: Number(e.duration) || 0, text: { Text: e.text } } });
  };
  const atributos = Object.entries(prosodia).map(([k, v]) => `${k}="${v}"`).join(' ');
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-CL"><voice name="${voz}"><prosody ${atributos}>${escaparXml(texto)}</prosody></voice></speak>`;
  try {
    const audio = await new Promise<Buffer>((ok, mal) => sintetizador.speakSsmlAsync(ssml, (r) => {
      if (r.reason === sdkAzure.ResultReason.SynthesizingAudioCompleted) ok(Buffer.from(r.audioData));
      else mal(new Error(`Azure: ${r.errorDetails || sdkAzure.ResultReason[r.reason]}`));
    }, (e) => mal(new Error(`Azure: ${e}`))));
    if (audio.length < 1000) throw new Error('audio vacío');
    return { audio, limites };
  } finally { sintetizador.close(); }
};

/** Duración (s) de un mp3 en memoria. */
const duracionMp3 = async (audio: Buffer, tmp: string) => {
  fs.writeFileSync(tmp, audio);
  const d = (await parseFile(tmp)).format.duration ?? 0;
  fs.unlinkSync(tmp);
  return d;
};

/**
 * Sintetiza una línea: el texto se prepara con `textoParaVoz` y se parte en segmentos (afirmaciones / preguntas); cada
 * segmento es un pedido con su prosodia y los mp3 (CBR, sin cabecera Xing) se concatenan; los límites de palabra de los
 * segmentos siguientes se desplazan lo que dura el audio anterior (en ticks de 100 ns, como los entrega el servicio).
 */
const sintetizar = async (tts: MsEdgeTTS | null, voz: string, texto: string, tmp: string): Promise<{ audio: Buffer; limites: Limite[]; segmentos: number }> => {
  if (!tts) return { ...(await sintetizarAzure(voz, textoParaVoz(texto), PROSODIA)), segmentos: 1 };
  const segmentos = SEGMENTAR_PREGUNTAS ? segmentosDeVoz(textoParaVoz(texto)) : [{ texto: textoParaVoz(texto), prosodia: PROSODIA, pregunta: false }];
  if (segmentos.length === 1) return { ...(await sintetizarUno(tts!, segmentos[0].texto, segmentos[0].prosodia)), segmentos: 1 };
  const audios: Buffer[] = [];
  const limites: Limite[] = [];
  let desplazamiento = 0; // ticks de 100 ns
  for (const s of segmentos) {
    const r = await sintetizarUno(tts!, s.texto, s.prosodia);
    for (const l of r.limites) limites.push({ ...l, Data: { ...l.Data, Offset: l.Data.Offset + desplazamiento } });
    desplazamiento += Math.round((await duracionMp3(r.audio, tmp)) * 1e7);
    audios.push(r.audio);
  }
  return { audio: Buffer.concat(audios), limites, segmentos: segmentos.length };
};

/** Genera (o reutiliza) la voz de las líneas y escribe tiempos.json. Devuelve los tiempos. */
export const generarVoz = async (id: string, vozElegida: string | undefined, lineas: LineaVoz[]): Promise<Tiempos> => {
  const voz = vozElegida ?? VOZ_POR_DEFECTO;
  const dir = path.join(RAIZ, 'public/voz', id);
  fs.mkdirSync(dir, { recursive: true });
  const proveedor = proveedorVoz();
  if (proveedor === 'azure' && (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION)) {
    throw new Error('VOZ_PROVEEDOR=azure pero faltan AZURE_SPEECH_KEY y/o AZURE_SPEECH_REGION en el entorno');
  }
  let tts: MsEdgeTTS | null = null;
  const medidas: MedidaLinea[] = [];
  try {
    for (let i = 0; i < lineas.length; i++) {
      const { tipo, texto } = lineas[i];
      if (!texto.trim()) {
        medidas.push({ ...lineas[i], archivo: '', duracionAudio: 0, palabras: [], reales: true });
        console.log(`· voz ${id}/${i} (${tipo}): silencio de ${lineas[i].despues ?? 0}s`);
        continue;
      }
      const mp3 = path.join(dir, `${i}.mp3`);
      const sidecarRuta = path.join(dir, `${i}.json`);
      const hash = hashDe(texto, voz);
      let sidecar: Sidecar | null = null;
      if (fs.existsSync(mp3) && fs.existsSync(sidecarRuta)) {
        const previo = JSON.parse(fs.readFileSync(sidecarRuta, 'utf8')) as Sidecar;
        if (previo.hash === hash && previo.limites) {
          sidecar = previo;
          if (previo.alineacion !== VERSION_ALINEACION) {
            // Otro algoritmo de alineación: se recalcula con los límites guardados, sin llamar al servicio.
            const r = alinearHabladas(texto, previo.limites, previo.duracionAudio);
            sidecar = { ...previo, palabras: r.palabras, reales: r.reales, desfaseMax: r.desfaseMax, alineacion: VERSION_ALINEACION };
            fs.writeFileSync(sidecarRuta, JSON.stringify(sidecar, null, 2) + '\n');
            console.log(`~ voz ${id}/${i} (${tipo}): realineada (desfase máx ${r.desfaseMax}s)`);
          }
        } // sin `limites` (sidecar antiguo): se vuelve a sintetizar para guardarlos
      }
      if (!sidecar) {
        let ultimoError: unknown = null;
        for (let intento = 1; intento <= REINTENTOS && !sidecar; intento++) {
          try {
            if (!tts && proveedor === 'edge') { tts = new MsEdgeTTS({ connectionTimeoutMs: 15000, synthesisTimeoutMs: 30000 }); await tts.setMetadata(voz, FORMATO_AUDIO, { wordBoundaryEnabled: true }); }
            const tmp = `${mp3}.tmp.mp3`;
            const { audio, limites, segmentos } = await sintetizar(tts, voz, texto, `${mp3}.seg.mp3`);
            fs.writeFileSync(tmp, audio);
            const meta = await parseFile(tmp);
            const duracionAudio = meta.format.duration ?? 0;
            if (!(duracionAudio > 0)) throw new Error('mp3 sin duración válida');
            fs.renameSync(tmp, mp3);
            const habladas = habladasDe(limites);
            const { palabras, reales, desfaseMax } = alinearHabladas(texto, habladas, duracionAudio);
            sidecar = { hash, voz, duracionAudio: +duracionAudio.toFixed(3), palabras, reales, texto, desfaseMax, alineacion: VERSION_ALINEACION, limites: habladas };
            fs.writeFileSync(sidecarRuta, JSON.stringify(sidecar, null, 2) + '\n');
            console.log(`+ voz ${id}/${i} (${tipo}) [${proveedor}]: ${sidecar.duracionAudio}s, ${palabras.length} palabras${reales ? '' : ' (estimadas)'}${segmentos > 1 ? ` · ${segmentos} segmentos (pregunta con tono propio)` : ''}`);
          } catch (e) {
            ultimoError = e;
            console.warn(`! voz ${id}/${i} intento ${intento}/${REINTENTOS} falló: ${(e as Error).message}`);
            try { tts?.close(); } catch { /* ya cerrado */ }
            tts = null;
            await esperar(1200 * intento);
          }
        }
        if (!sidecar) throw new Error(`No se pudo sintetizar la línea ${i} ("${texto.slice(0, 40)}…"): ${(ultimoError as Error)?.message}`);
      } else {
        console.log(`= voz ${id}/${i} (${tipo}): en caché`);
      }
      medidas.push({ ...lineas[i], archivo: `voz/${id}/${i}.mp3`, duracionAudio: sidecar.duracionAudio, palabras: sidecar.palabras, reales: sidecar.reales, desfaseMax: sidecar.desfaseMax });
    }
  } finally {
    try { tts?.close(); } catch { /* nada */ }
  }
  const tiempos = armarTiempos(id, voz, medidas);
  fs.writeFileSync(path.join(dir, 'tiempos.json'), JSON.stringify(tiempos, null, 2) + '\n');
  console.log(`tiempos.json: ${tiempos.lineas.length} líneas, ${tiempos.total.toFixed(2)}s de voz, límites ${tiempos.limitesReales ? 'reales' : 'estimados'}`);
  return tiempos;
};

const esPrincipal = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (esPrincipal) {
  const [rutaGuion] = process.argv.slice(2);
  if (!rutaGuion) { console.error('uso: npx tsx scripts/voz.mts <ruta-guion.json>'); process.exit(2); }
  const { plantilla, props } = leerGuion(path.resolve(rutaGuion));
  generarVoz(props.id, props.voz, lineasDe(plantilla, props)).then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
}
