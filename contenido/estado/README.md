# Estado del día (vista calculada, NO fuente de verdad)

Lo escribe `scripts/estado.js` leyendo qué archivos existen. La verdad siguen
siendo los archivos del repo (regla dura 20): si esta vista y los archivos no
coinciden, mandan los archivos y la vista está mal.

- `AAAA-MM-DD.md` — primeras líneas en texto plano (`ETAPA:`, `VEREDICTO:`,
  `REPARAR:`, `FALTA:`) para que cualquiera las lea de un vistazo, incluido GPT,
  que no ejecuta scripts. Después, la tabla pieza por pieza.
- `AAAA-MM-DD.json` — lo mismo para el panel y los scripts.

Quien quiera saber en qué va el día: `node scripts/estado.js --solo-leer`.
El vigía (`prompts/vigia.md`) usa `--vigilar`, que sale 1 si algo va atrasado.
