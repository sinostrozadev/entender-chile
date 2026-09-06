ESTADO: CON FALLAS — HOY: bitacora/metricas/2026-09-06.md no existe (el Reloj de métricas reportó éxito pero no empujó el despertador); en menos de una hora corre el Informe de la mañana (06:00) y puede salir sin números ni estado de videos.

Auditada el 06-09-2026 a las 05:31 de Chile (ya en horario de verano, UTC-3 desde esta madrugada), por `trig_01GDbvJ1Wjzy25bnVRCXgygZ`, que corre a las 05:30 desde el rediseño de anoche (commit `40784fc`, "mañana rediseñada... métricas 05:00, auditoría 05:30"). **Nota de contrato**: la propia rutina llegó a tiempo y correcta; el desfase lo tiene el contenido de `prompts/auditoria-matinal.md` (ver propuesta 3): sigue describiendo el horario viejo (09:30, guardián a las 06:07, métricas ~08:47), que ya no existe. Esta auditoría siguió al pie de la letra lo que el archivo pide, pero usó el horario real (bitacora/cronograma.json) para juzgar los atrasos, no el que describe el propio archivo.

## Qué salió y a qué hora

| Pieza | Hora esperada (cronograma) | Hora real (Chile) | Estado |
|---|---|---|---|
| Reloj del barrido | 01:30 | 01:32 | ok |
| Barrido | 01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:36 | ok |
| Informe | ~02:00 | 01:40 | ok (20 min antes) |
| Guion del informe | ~02:10 | 01:47 | ok |
| Observatorio plata pública | ~01:45 | 01:52 | ok, 7 min |
| Clave (entrega) | ~02:30 | **03:45** | ver Qué falló 2 |
| Guionista de la Clave | 03:50 | 03:54 | ok |
| Revisión editorial | 04:40 | 04:43 | ok, VEREDICTO: APROBADA |
| Edición diaria (arranque) | ~04:45 | 04:44 | ok, **aún corriendo** (ver Qué falló 3) |
| Reloj de métricas | 05:00 | 05:04 | reportó éxito, **no empujó el despertador** |
| bitacora/metricas/2026-09-06.md | — | — | **no existe** |
| Auditoría matinal (esta) | 05:30 | 05:30 | ok |

Los tres eslabones de la Clave: entrega
(`contenido/claves/2026-09-06-desafuero-parlamentario-chile.md`) y guion
(`contenido/guiones/claves/2026-09-06-desafuero-parlamentario-chile.md`)
están. El tercero, el video, todavía no existe porque la Edición diaria
sigue corriendo (ver punto 3); a esta hora eso es normal, no una falla.
`indice.md` y `banco-temas.md` quedaron con línea de hoy.

## Qué falló

1. **`bitacora/metricas/2026-09-06.md` no existe** (confirmado con `ls
   bitacora/metricas/`: el último archivo es `2026-09-05.md`/`.json`).
   El Reloj de métricas (`trig_01MxzGdh2P489TmgkUi9spWd`) se disparó a las
   08:04:43 UTC (05:04 Chile) y su sesión (`cse_01FcCgqW8HjDuG4EmuRgeGPN`)
   devolvió `SUCCEEDED` en 36 segundos, pero `bitacora/metricas/despertador.txt`
   sigue con la marca `2026-09-05T04:37:27Z` (última escritura de ayer,
   `git log` no tiene ningún commit de hoy sobre ese archivo) y el workflow
   "Métricas" no tiene ninguna corrida hoy (`list_workflow_runs`: la última
   es la de ayer, `2026-09-05T18:30:12Z`). El propio prompt de la rutina
   (guardado en el trigger) dice: "Si `bitacora/metricas/$FECHA.md` YA
   existe, termina" — y ese archivo NO existe, así que debió escribir el
   despertador y no lo hizo. Es un fallo silencioso: la rutina se reporta
   sana y no lo está. Los respaldos de `metricas.yml` (crons `30 9` y `0 11`
   UTC = 06:30 y 08:00 Chile) van a cubrirlo, pero ambos caen DESPUÉS de las
   06:00, hora en que corre "Informe de la mañana" y necesita
   `bitacora/metricas/FECHA.md` para su sección "Los números".

2. **"Clave (entrega)" no reaccionó al evento del informe.** El informe se
   publicó a la 01:40 Chile (evento al PR #4); ayer, el mismo paso
   reaccionó en 13 minutos (informe 03:32 → Clave entrega 03:45, ver
   `bitacora/2026-09-05-auditoria.md`). Hoy la entrega recién aparece a las
   **03:45:32** Chile — 2 horas 5 minutos después del informe, y coincide
   al segundo con el "Respaldo fijo 03:45 con guarda" que documenta
   `bitacora/cronograma.json` línea 48. Todo indica que el evento principal
   se perdió o falló y fue el respaldo el que sacó el trabajo adelante. No
   se perdió nada (guion y revisión llegaron a tiempo), pero nadie lo habría
   notado sin comparar contra el patrón de ayer.

3. **La Edición diaria sigue corriendo a la hora de esta auditoría** (run
   `34019943054`, arrancó 04:44 Chile). A las 05:31 Chile va en el paso 4 de
   9 restantes (video de la Clave); descripciones, subida a YouTube,
   podcast y reconstrucción de la web todavía están pendientes. Ayer este
   mismo proceso tardó ~91 minutos completo (04:44→06:15 Chile); si hoy
   tarda lo mismo o más, terminaría cerca de las 06:15-06:30, es decir
   DESPUÉS de que corra "Informe de la mañana" (06:00), que en su punto 6
   promete a Santiago "los 4 videos privados por publicar en Studio con sus
   títulos". Esto no es una falla todavía (a esta hora es el comportamiento
   normal del pipeline), pero combinado con el punto 1 deja al informe de
   las 06:00 con dos secciones probablemente incompletas el mismo día en
   que se estrena.

4. **Tercer día seguido en que la revisión editorial no aplica su propia
   categoría (e) "redondeo en voz".** `node scripts/validar-tarjetas.js
   --fecha 2026-09-06` avisó: línea 118, cifra exacta en voz ("1.482").
   Verificado en `contenido/guiones/informe/2026-09-06.md` línea 118: "Prisión
   preventiva por mil cuatrocientas ochenta y dos licencias médicas falsas"
   narra 1.482 con 4 cifras significativas (regla: máximo 3, `REGLAS-DURAS
   38b`). `contenido/revisiones/2026-09-06.md` (VEREDICTO: APROBADA) no lo
   marcó — su único hallazgo es de categoría b (ver punto 5). Se comprobó la
   causa: el prompt CARGADO en `trig_019cchTdDCVeVzVh8HjrZrYG` solo tiene
   cuatro categorías (a-d); la categoría (e) existe en el repo
   (`prompts/revision-editorial.md` líneas 7 y 29, agregada el 04-09) pero
   nunca se recargó en la rutina. Es exactamente lo que predijo la auditoría
   de ayer (propuesta 3, "si se repite un tercer día... el checklist está
   roto, no que fue una pasada de más"): hoy es el tercer día (04-09, 05-09,
   06-09).

5. **[MENOR] dato mal etiquetado en el guion del informe.**
   `contenido/revisiones/2026-09-06.md` sí cazó esto: en
   `contenido/guiones/informe/2026-09-06.md` (sección "Viento Puelche en el
   centro-sur"), la marca "[DATO comparacion | Dirección Meteorológica, 3
   sep] ráfagas en el valle: 60 km/h" llama "ráfaga" a lo que el informe
   describe como viento de base (40-60 km/h, con ráfagas de 70 km/h). La
   tarjeta en pantalla mostraría un valor de ráfaga distinto al real.

Sin más fallas: preselección, informe, guion del informe, observatorio y la
revisión (en su veredicto) corrieron a tiempo y sin atrasos mayores a 20
minutos frente al patrón de ayer.

## Propuestas

1. **HOY** — Investigar por qué la sesión `cse_01FcCgqW8HjDuG4EmuRgeGPN`
   (Reloj de métricas) devolvió éxito sin escribir
   `bitacora/metricas/despertador.txt`. Mientras se investiga la causa, si
   alguien puede disparar manualmente el workflow "Métricas" (workflow_dispatch)
   o empujar el despertador antes de las 06:00, el Informe de la mañana de
   hoy saldría con números. Esta auditoría no lo hace: no le corresponde
   tocar archivos fuera de `bitacora/`.

2. En `prompts/revision-editorial.md`, recargar el prompt del trigger
   `trig_019cchTdDCVeVzVh8HjrZrYG` con el texto vigente del archivo (incluye
   la categoría e, líneas 7 y 29). Requiere sesión local, según quedó
   registrado en `bitacora/PENDIENTES.md` ("REVISIÓN 1"). De paso, conviene
   convertir ese archivo en "prompt vivo" (arranque mínimo que lea el
   archivo del repo en cada corrida), igual que ya se hizo con
   `prompts/auditoria-matinal.md` y `prompts/guardian.md`, para que una
   categoría nueva no vuelva a quedar sin cargar.

3. En `prompts/auditoria-matinal.md`, líneas 3-14: actualizar "Tarea diaria
   de las 09:30 de Chile... las métricas llegan ~08:47" por "05:30... las
   métricas llegan ~05:00", y la frase "No confundir con el guardián
   (06:07)... esta auditoría corre tres horas después" por la secuencia real
   (métricas 05:00 → esta auditoría 05:30 → Informe de la mañana 06:00, que
   ahora corre DESPUÉS y no antes). `bitacora/cronograma.json` línea 78 ya
   asume que este archivo se lee siempre fresco ("nunca más una versión
   atrás"), pero su propio contenido quedó una versión atrás del rediseño
   que se hizo horas antes de esa misma frase.

4. En `contenido/guiones/informe/2026-09-06.md` línea 118, cambiar "mil
   cuatrocientas ochenta y dos licencias médicas falsas" por "más de mil
   cuatrocientas licencias médicas falsas" (el número exacto ya está en la
   marca [DATO] de esa sección).

5. En `contenido/guiones/informe/2026-09-06.md`, sección "Viento Puelche en
   el centro-sur", cambiar el valor de "ráfagas en el valle" de 60 a 70
   km/h en la marca [DATO comparacion], o su etiqueta de "ráfagas" a "viento
   sostenido", para que coincida con lo que reporta el informe.

## Triage

- **HOY**: propuesta 1 (métricas de hoy no se generaron; riesgo directo
  sobre el Informe de la mañana de las 06:00).
- **AGUANTA**:
  - propuesta 2 (revisión editorial sin categoría e cargada, tercer día
    confirmado; no bloquea producción pero ya está identificada la causa
    exacta).
  - propuesta 3 (prompt vivo de esta misma auditoría, desactualizado).
  - propuesta 4 y 5 (correcciones puntuales de guion, [MENOR] por
    definición).
- **MIRAR**:
  - punto 2 de Qué falló (Clave entrega no reaccionó al evento y cayó al
    respaldo de las 03:45; una vez no es tendencia, pero si se repite
    conviene revisar la entrega del evento del PR #4).
  - punto 3 (duración de la Edición diaria vs. la hora de arranque del
    Informe de la mañana; hoy es el primer día de esa carrera y puede
    resolverse sola si el render tarda menos de 75 minutos).

## Comparación con ayer

**Mejoró**: nada que ayer no tuviera ya resuelto.

**Sigue igual**: el patrón de "una versión atrás" que ayer se marcó AGUANTA
sobre el prompt cargado en el trigger de esta auditoría (propuesta 1 de
ayer) está resuelto de raíz —el trigger ahora solo apunta al archivo del
repo—, pero reaparece en una forma nueva: el archivo apuntado es el que
quedó desactualizado (propuesta 3 de hoy). El hallazgo de la revisión
editorial y su categoría (e) pasó de MIRAR (día 2) a confirmado con causa
raíz identificada (día 3), tal como anticipó la auditoría de ayer.

**Nuevo**: el rediseño de la madrugada (métricas 05:00 → auditoría 05:30 →
Informe de la mañana 06:00) se estrenó hoy y tuvo dos fallas en su primer
día: el Reloj de métricas no empujó el despertador pese a reportar éxito, y
"Clave (entrega)" no reaccionó al evento del informe y cayó al respaldo
fijo. Ninguna auditoría anterior (28-08 a 05-09) había registrado un fallo
silencioso de una rutina que se reporta exitosa sin haber hecho su tarea.
