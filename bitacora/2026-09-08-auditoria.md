ESTADO: CON FALLAS — la revisión editorial rechazó la edición de hoy por dos cifras que no cuadran con su propia base de cálculo; la compuerta de la Edición diaria hizo su trabajo y no produjo ni publicó ningún video, pero el texto del informe con el error ya está público en la web desde las 01:43.

Auditada el 08-09-2026 a las 05:35 de Chile, con el checkout sincronizado contra `origin/main` (`35866aa`). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 2026-09-07), no del texto de este mismo prompt (arrastra el mismo horario viejo, ver Qué falló 2).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:37 | ok |
| Informe | ~02:00 | 01:43 | ok (17 min antes) |
| Guion del informe | ~02:10 | 01:52 | ok |
| Clave (entrega) | ~02:30 | 01:50 | ok, reaccionó al evento en 7 min |
| indice.md / banco-temas.md | — | 01:50 | ok, agregado junto con la entrega (verificado con `tail`) |
| Guion de la Clave | ~02:35 | 01:55 | ok |
| Revisión editorial | 04:40 | 04:44 | **VEREDICTO: RECHAZADA** (+4 min) — ver Qué falló 1 |
| Edición diaria (arranque) | ~04:45 | 04:44 | arrancó puntual, pero el paso "2b · Gate previo al render" cortó la corrida por el rechazo (conclusion: failure en GitHub Actions, run 34200872279) |
| Reloj de métricas → Métricas | 05:00 | 05:06 | ok (+6 min) |
| Auditoría matinal (esta) | 05:30 | 05:35 | ok |

Ningún atraso mayor a 20 minutos en ninguna pieza. El problema del día no es de horarios: es de contenido.

## Qué falló

1. **[HOY] La revisión editorial rechazó la edición de hoy por dos cifras que no cuadran con su propia base de cálculo, y la compuerta de producción actuó en consecuencia: no se renderizó, no se subió y no se publicó ningún video ni episodio de podcast hoy.**
   Evidencia leída completa en `contenido/revisiones/2026-09-08.md` (VEREDICTO: RECHAZADA, línea 1):
   - `contenido/informes/2026-09-08.md`, línea 22: "Escala humana: cuatro de cada diez fiscales protegidos tienen una escolta especializada asignada. Cálculo propio sobre los 10 casos con ese resguardo entre los 18 informados por el fiscal nacional." 10/18 = 55,6% ("cerca de seis de cada diez"), no "cuatro de cada diez" (36,4%, que es en realidad la proporción de los alcaldes: 8 de 22). El mismo error se repite literal en `contenido/guiones/informe/2026-09-08.md`, línea 21 ("entre los fiscales protegidos, cuatro de cada diez tienen escolta especializada asignada").
   - `contenido/guiones/informe/2026-09-08.md`, líneas 82 y 87: el guion inventa una cifra exacta que no está en el informe ("[DATO cifra | Pontificia Universidad Católica, 7 sep] años sin una mujer premiada: 61" y "en los sesenta y un años transcurridos entre mil novecientos sesenta y cuatro y este año dos mil veintiséis"). El informe fuente (`contenido/informes/2026-09-08.md`, línea 166) solo dice "las seis décadas transcurridas desde 1964 hasta 2026", sin cifra exacta. 2026 − 1964 = 62, no 61: el propio guion se contradice con los años que él mismo cita.
   Verificado en GitHub Actions (run 34200872279, job "edicion"): el paso "2 · Commit de los textos" corrió con éxito (por eso el informe ya quedó público en la web, ver debajo), pero "2b · Gate previo al render (edición renderizable y no rechazada)" terminó en failure, y los 13 pasos siguientes (voz, render del informe, Short, video de la Clave, Short de la Clave, descripciones, publicación del release, subida a YouTube, episodio del podcast, reconstrucción de la web) quedaron todos en skipped. Por eso `contenido/podcast/episodios.json` no tiene entrada para 2026-09-08 (confirmado: los últimos registros son del 06-09 informe/clave y 07-09 informe/clave) — no es un olvido del podcast, es la consecuencia directa del rechazo, y no se puede dar una duración real de hoy: no existe.
   **El defecto ya es público**: el workflow "Web" (run 34187998075, "edición 2026-09-08: informe") republicó el sitio de `entender-chile-web` a las 01:43, con el texto de `contenido/informes/2026-09-08.md` tal cual —incluida la línea 22 con el error de los fiscales—, casi tres horas antes de que la revisión (04:44) lo detectara. El error de Montenegro no llegó a la web porque vive solo en el guion, que no se publica ahí.

2. **Tercer día seguido: el propio prompt de esta auditoría y el script del panel siguen con el horario viejo (09:30), sin que nadie lo corrija.**
   `prompts/auditoria-matinal.md` líneas 3-4 siguen diciendo "Tarea diaria de las **09:30** de Chile... (las métricas llegan ~08:47)"; `scripts/panel-auditoria.js` línea 5 y línea 28 siguen inyectando "la rutina de las 09:30" en el panel que ve Santiago. Esto ya se reportó el 06-09 (propuesta 3 de esa auditoría) y otra vez el 07-09 (`bitacora/2026-09-07-auditoria.md`, hallazgo 2 y 3; también registrado como pendiente abierto "AUDITORIA 2" en `bitacora/PENDIENTES.md`, líneas 369-380). No cambió nada en estos tres días: el ciclo revisa y no aprende. No afectó el trabajo de esta auditoría (se usó `bitacora/cronograma.json`, como manda el contrato), pero es el hallazgo en sí, no un detalle cosmético.

Sin más fallas: barrido, preselección, informe, entrega de Clave, guiones y métricas corrieron a tiempo y sin incidentes de escritura.

## Propuestas

1. En `contenido/informes/2026-09-08.md`, línea 22, cambiar "cuatro de cada diez fiscales protegidos" por "cerca de seis de cada diez fiscales protegidos" (10 de 18 = 55,6%).
2. En `contenido/guiones/informe/2026-09-08.md`, línea 21, cambiar "entre los fiscales protegidos, cuatro de cada diez tienen escolta especializada asignada" por "entre los fiscales protegidos, cerca de seis de cada diez tienen escolta especializada asignada".
3. En `contenido/guiones/informe/2026-09-08.md`, línea 82, cambiar "años sin una mujer premiada: 61" por "años sin una mujer premiada: 62"; en la línea 87, cambiar "en los sesenta y un años transcurridos" por "en los sesenta y dos años transcurridos" (2026 − 1964 = 62).
4. Tras corregir 1-3, volver a correr la revisión editorial y, si aprueba, relanzar la Edición diaria (`workflow_dispatch` o un push a los archivos corregidos) para que se produzcan y publiquen los cuatro videos y el episodio de hoy; y volver a disparar el workflow "Web" para que la corrección del punto 1 reemplace el texto ya público.
5. En `prompts/auditoria-matinal.md`, líneas 3-4, cambiar "Tarea diaria de las **09:30** de Chile... (las métricas llegan ~08:47)" por "Tarea diaria de las **05:30** de Chile... (las métricas llegan ~05:00)". En `scripts/panel-auditoria.js`, línea 5 y línea 28, cambiar el texto fijo "la rutina de las 09:30" por "la rutina de las 05:30".

## Triage

- **HOY**:
  - Propuestas 1-4 (los dos errores de cifras y la reproducción de la edición): sin esto no hay video, no hay podcast y el informe sigue público en la web con un dato equivocado. Se corrige antes de dormir.
- **AGUANTA**: ninguna.
- **MIRAR**:
  - Propuesta 5 (horario viejo en dos archivos): ya lleva tres días sin corregirse siendo cosmética; si sigue así una semana más deja de ser un detalle y pasa a ser una señal de que las propuestas de esta auditoría no se procesan.
  - La retención media ponderada de los largos bajó de 35,5% a 33,9% (`bitacora/metricas/2026-09-07.md` vs `2026-09-08.md`, línea "Retención real"), aunque las horas totales subieron de 13,1 a 14,0. Un solo día no es tendencia; revisar si sigue bajando mañana.

## Comparación con ayer

**Mejoró**: nada que destacar — ayer (07-09) fue "CON OBSERVACIONES" pero con VEREDICTO: APROBADA y producción completa; hoy la producción completa no ocurrió.

**Sigue igual**:
- El horario viejo ("09:30") en `prompts/auditoria-matinal.md` y `scripts/panel-auditoria.js`: tercer día consecutivo sin corregirse (06-09 lo pidió, 07-09 lo repitió, hoy sigue igual).
- `node scripts/validar-tarjetas.js --fecha 2026-09-08` no encontró avisos (igual que el 07-09): "variedad OK: ninguna cuota rota, ninguna marca malformada".

**Nuevo**:
- Primer VEREDICTO: RECHAZADA desde que existe el trigger de revisión editorial (los tres días anteriores revisados, 05-09 a 07-09, fueron todos APROBADA). Es la primera vez que se observa la compuerta "2b" de `edicion-diaria.yml` actuando en la práctica: cortó el render, el Short, la subida a YouTube, el podcast y la reconstrucción de la web, dejando solo el commit de los textos ya hecho. La compuerta funcionó como está diseñada, pero expuso un hueco no cubierto: el commit de los textos (paso 2) ocurre antes de la revisión (04:44) y dispara el workflow "Web", así que un informe con un error puede quedar público en el sitio horas antes de que el propio sistema lo detecte y sin que nada lo corrija automáticamente después.
- Ambos hallazgos [GRAVE] de la revisión son categoría b (cifras que no cuadran con su propia base de cálculo), igual clasificación que el hallazgo del 06-09 (ráfaga de viento) y distinto del 07-09 (categoría c). No es una racha de tres días con el mismo hallazgo, pero sí segunda vez en tres días que aparece un error de categoría b en una cifra "Escala humana"/[DATO], lo que sugiere revisar ese tipo de cálculo antes de escribirlo, no solo después.
