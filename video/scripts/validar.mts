/**
 * Valida guiones de contenido/semana/ sin renderizar ni gastar voz (lo que pide prompts/plan-semanal.md §4):
 *   npx tsx scripts/validar.mts <guion.json> [<guion.json> ...]
 * Comprueba el envoltorio y los props con el mismo schema que usan preparar-*, y los campos que necesita producir.mts
 * para subir (id igual al del archivo, publicar AAAA-MM-DDTHH:MM, título, descripción, hashtags). Sale 1 si algo falla.
 */
import fs from 'node:fs';
import path from 'node:path';
import { EnvoltorioGrafico, EnvoltorioTesis } from '../src/plantillas/comun/guion';

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
