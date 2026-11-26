/**
 * Valida guiones de contenido/semana/ sin renderizar ni gastar voz (lo que pide prompts/plan-semanal.md §4):
 *   npx tsx scripts/validar.mts <guion.json> [<guion.json> ...]
 * Comprueba el envoltorio y los props con el mismo schema que usan preparar-*, y los campos que necesita producir.mts
 * para subir (id igual al del archivo, publicar AAAA-MM-DDTHH:MM, título, descripción, hashtags) y, en las piezas `tesis`,
 * el ritmo (`problemasDeRitmo`, con tiempos estimados). Las piezas `grafico` no tienen validador de ritmo. Sale 1 si algo falla.
 */
import fs from 'node:fs';
import path from 'node:path';
import { EnvoltorioGrafico, EnvoltorioTesis } from '../src/plantillas/comun/guion';
import { estimarTiemposTesis, graficosTesis, planTesis, problemasDeRitmo } from '../src/plantillas/tesis/plan';
import { completarConFixture } from '../src/plantillas/comun/graficos/fixture';
import { RITMO } from '../src/marca/tokens';

const rutas = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!rutas.length) { console.error('uso: npx tsx scripts/validar.mts <guion.json> [...]'); process.exit(2); }

let malos = 0;
for (const ruta of rutas) {
  const errores: string[] = [];
  let crudo: Record<string, unknown> = {};
  try { crudo = JSON.parse(fs.readFileSync(path.resolve(ruta), 'utf8')); } catch (e) { errores.push(`JSON ilegible: ${(e as Error).message}`); }
  if (!errores.length) {
    const esquema = crudo.plantilla === 'tesis' ? EnvoltorioTesis : crudo.plantilla === 'grafico' ? EnvoltorioGrafico : null;
    if (!esquema) errores.push('"plantilla" debe ser tesis o grafico');
    else {
      const v = esquema.safeParse(crudo);
      if (!v.success) errores.push(...v.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`));
      else if (crudo.plantilla === 'tesis') {
        // Ritmo (mismo validador que preparar-tesis, con tiempos de voz ESTIMADOS y datos de relleno: no llama a ningún servicio).
        // Antes solo corría en producción y un guion con esperas o citas eternas recién fallaba al producir.
        const g = (v.data as { props: Parameters<typeof estimarTiemposTesis>[0] }).props;
        const plan = planTesis(g, estimarTiemposTesis(g), completarConFixture(graficosTesis(g).map((x) => x.datos)));
        errores.push(...problemasDeRitmo(plan, g).errores.map((e) => `ritmo: ${e}`));
        // Duración (25-11-2026): preparar-tesis corta el largo fuera de RITMO.largoMin-largoMax con la voz REAL, y la
        // estimación sale larga: medido 9:14 real contra 10:48 estimado (Valparaíso), 10:24 contra 12:12 y 11:49 contra
        // 12:55 (cobre) → la voz real dura 0,85 a 0,92 de lo estimado. Sin este control el largo del 02-12 pasó la
        // validación del jueves y recién falló al producir. Se exige con el factor más desfavorable de cada lado.
        const realBajo = plan.duracionSeg * 0.85, realAlto = plan.duracionSeg * 0.92;
        const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
        if (realBajo < RITMO.largoMin) errores.push(`duración: estimada ${mmss(plan.duracionSeg)} → con la voz real puede quedar en ${mmss(realBajo)}, bajo el mínimo ${mmss(RITMO.largoMin)} de preparar-tesis. Alarga el guion (la voz real dura ~0,85 de lo estimado)`);
        if (realAlto > RITMO.largoMax) errores.push(`duración: estimada ${mmss(plan.duracionSeg)} → con la voz real puede quedar en ${mmss(realAlto)}, sobre el máximo ${mmss(RITMO.largoMax)} de preparar-tesis. Recorta el guion`);
      }
    }
    // Decisión 2026-11-18 (diagnóstico de virales): el primer fotograma del Short es el MAPA del lugar, no un gráfico
    // (la plantilla `grafico` heredada de NR daba 31-39 % "se queda"). Rige para las piezas que salen desde el 26-11.
    if (crudo.plantilla === 'grafico' && String(crudo.publicar ?? '') >= '2026-11-26') {
      const vg = (crudo.props as { visualGancho?: { tipo?: string } } | undefined)?.visualGancho;
      if (!vg || !['chile', 'mapa'].includes(String(vg.tipo))) errores.push('props.visualGancho: el Short abre con el mapa del lugar (tipo "chile" con la región o los puntos; "mapa" si el lugar está fuera de Chile). Regla del 18-11-2026, prompts/plan-semanal.md §4');
    }
    if (crudo.id !== path.basename(ruta, '.json')) errores.push(`id "${String(crudo.id)}" no coincide con el nombre del archivo`);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(String(crudo.publicar))) errores.push('"publicar" debe ser AAAA-MM-DDTHH:MM (hora de Chile)');
    if (!crudo.titulo || String(crudo.titulo).length > 100) errores.push('"titulo" vacío o de más de 100 caracteres');
    if (!crudo.descripcion) errores.push('falta "descripcion"');
    if (!Array.isArray(crudo.hashtags) || !crudo.hashtags.length) errores.push('faltan "hashtags"');
  }
  if (errores.length) { malos++; console.error(`✗ ${ruta}\n  - ${errores.join('\n  - ')}`); } else console.log(`✓ ${ruta}`);
}
process.exit(malos ? 1 : 0);
