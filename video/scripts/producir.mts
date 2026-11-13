/**
 * PASO 2 del flujo de Entender Chile (docs/FLUJO.md): de guion escrito a video PROGRAMADO en YouTube.
 *   npx tsx scripts/producir.mts [--semana AAAA-MM-DD] [--solo <id>] [--sin-subir] [--concurrencia N]
 * Recorre ../contenido/semana/<semana>/*.json (todas las semanas si falta --semana). Para cada pieza sin marca
 * `hechos/<id>.txt` y con `publicar` en el futuro: preparar (valida, voz, datos, sonido) → render → subida programada →
 * marca. Después, si la pieza ya está subida y existe ../contenido/caratulas/listas/<id>.png completa, pone la carátula.
 *
 * Por qué así: la cadena vieja dependía de relojes y reintentos; acá cada pieza se procesa una sola vez (la marca de
 * hecho es la deduplicación) y un push repetido no sube dos veces el mismo video. Sin secretos de YouTube, renderiza y
 * no sube (sirve para probar en local). La subida va `private` + `publishAt`: YouTube la publica sola a su hora.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { google } from 'googleapis';
import { RAIZ } from './voz.mjs';

const args = process.argv.slice(2);
const opt = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const SIN_SUBIR = args.includes('--sin-subir');
const SOLO = opt('--solo');
const CONC = opt('--concurrencia') ?? process.env.EC_CONCURRENCIA ?? '1';
const SEMANAS = path.resolve(RAIZ, '../contenido/semana');
const CARATULAS = path.resolve(RAIZ, '../contenido/caratulas/listas');

type Envoltorio = { plantilla: 'grafico' | 'tesis'; id: string; titulo: string; descripcion: string; hashtags: string[]; publicar: string; props: { id: string } };

/** "2026-11-20T12:00" en hora de Chile → ISO UTC. Calcula el desfase real de America/Santiago ese día (cambia en abril y septiembre). */
export const chileAUtc = (local: string): string => {
  const [f, h] = local.split('T');
  const [a, m, d] = f.split('-').map(Number); const [hh, mm] = h.split(':').map(Number);
  const guess = Date.UTC(a, m - 1, d, hh, mm);
  const enChile = new Date(new Date(guess).toLocaleString('en-US', { timeZone: 'America/Santiago' }));
  const enUtc = new Date(new Date(guess).toLocaleString('en-US', { timeZone: 'UTC' }));
  return new Date(guess + (enUtc.getTime() - enChile.getTime())).toISOString();
};

const youtube = () => {
  const { YT_CLIENT_ID: id, YT_CLIENT_SECRET: secreto, YT_REFRESH_TOKEN: token } = process.env;
  if (!id || !secreto || !token) return null;
  const auth = new google.auth.OAuth2(id, secreto);
  auth.setCredentials({ refresh_token: token });
  return google.youtube({ version: 'v3', auth });
};

const correr = (cmd: string, a: string[]) => execFileSync(cmd, a, { cwd: RAIZ, stdio: 'inherit' });

const pngEntero = (ruta: string) => {
  const b = fs.readFileSync(ruta);
  return b.length > 20_000 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) && b.subarray(-8, -4).toString('latin1') === 'IEND';
};

const yt = SIN_SUBIR ? null : youtube();
if (!SIN_SUBIR && !yt) console.warn('⚠ sin YT_CLIENT_ID / YT_CLIENT_SECRET / YT_REFRESH_TOKEN: se renderiza y NO se sube');

const semanas = (opt('--semana') ? [opt('--semana')!] : fs.existsSync(SEMANAS) ? fs.readdirSync(SEMANAS) : []).filter((s) => fs.existsSync(path.join(SEMANAS, s)) && fs.statSync(path.join(SEMANAS, s)).isDirectory());
let fallas = 0;
for (const semana of semanas.sort()) {
  const dir = path.join(SEMANAS, semana);
  const hechos = path.join(dir, 'hechos');
  for (const archivo of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    const ruta = path.join(dir, archivo);
    const g = JSON.parse(fs.readFileSync(ruta, 'utf8')) as Envoltorio;
    if (SOLO && g.id !== SOLO) continue;
    const marca = path.join(hechos, `${g.id}.txt`);
    if (fs.existsSync(marca)) {
      // Carátula pendiente de un video ya subido (llega de GPT después del render).
      const png = path.join(CARATULAS, `${g.id}.png`), marcaCar = path.join(hechos, `${g.id}.caratula.txt`);
      if (yt && fs.existsSync(png) && !fs.existsSync(marcaCar) && pngEntero(png)) {
        const videoId = fs.readFileSync(marca, 'utf8').trim().split(/\s+/)[0];
        await yt.thumbnails.set({ videoId, media: { mimeType: 'image/png', body: fs.createReadStream(png) } });
        fs.writeFileSync(marcaCar, `${videoId} ${new Date().toISOString()}\n`);
        console.log(`✓ carátula puesta: ${g.id} → ${videoId}`);
      }
      continue;
    }
    const cuando = chileAUtc(g.publicar);
    if (!SOLO && new Date(cuando).getTime() < Date.now() + 15 * 60_000) { console.warn(`⚠ ${g.id}: su hora (${g.publicar}) ya pasó o está a menos de 15 min; no se produce`); continue; }
    console.log(`\n=== ${g.id} (${g.plantilla}, sale ${g.publicar} de Chile)`);
    try {
      correr('npx', ['tsx', 'scripts/verificar-cifras.mts', ruta]);
      correr('npx', ['tsx', `scripts/preparar-${g.plantilla}.mts`, ruta]);
      const mp4 = path.join(RAIZ, 'salida/bandeja', `${g.id}.mp4`);
      fs.mkdirSync(path.dirname(mp4), { recursive: true });
      const comp = g.plantilla === 'grafico' ? 'Grafico' : 'Tesis';
      const t0 = Date.now();
      correr('npx', ['remotion', 'render', 'src/index.ts', comp, mp4, `--props=salida/trabajo/${g.id}.props.json`, `--concurrency=${CONC}`]);
      console.log(`⏱ render ${((Date.now() - t0) / 60000).toFixed(1)} min`);
      if (!yt) continue;
      const r = await yt.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: { title: g.titulo, description: `${g.descripcion}\n\n${g.hashtags.join(' ')}`, categoryId: '25', defaultLanguage: 'es', defaultAudioLanguage: 'es' },
          // containsSyntheticMedia: la divulgación de contenido alterado o sintético que pide YouTube (la voz es sintética).
          status: { privacyStatus: 'private', publishAt: cuando, selfDeclaredMadeForKids: false, containsSyntheticMedia: true } as Record<string, unknown>,
        },
        media: { body: fs.createReadStream(mp4) },
      });
      fs.mkdirSync(hechos, { recursive: true });
      fs.writeFileSync(marca, `${r.data.id} programado ${cuando}\n`);
      console.log(`✓ subido ${g.id} → https://youtu.be/${r.data.id} (sale ${cuando})`);
    } catch (e) {
      fallas++;
      console.error(`✗ ${g.id}: ${(e as Error).message}`);
    }
  }
}
process.exit(fallas ? 1 : 0);
