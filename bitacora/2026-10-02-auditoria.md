ESTADO: CON OBSERVACIONES — la cadena editorial corrió entera y sin fallas
técnicas (todas las corridas de Actions de hoy en `main` tienen
`conclusion: success`: Barrido run 99, Edición diaria/Estado del día runs
435-449, Web runs 258-262, reintento 97-106, verificado con
`mcp__github__actions_list`), y cerró antes de lo previsto. Lo que sí falló es
el Reloj de métricas: disparó y la nube lo marcó `ROUTINE_RUN_STATUS_SUCCEEDED`
a las 05:15 de Chile, pero no generó ningún commit ni disparó el workflow
Métricas, así que `bitacora/metricas/2026-10-02.md` no existe (verificado
listando `bitacora/metricas/` y con `actions_list` sobre `metricas.yml`: el
último run es de ayer). No es `HOY`: hay dos redes de respaldo (crons 06:30 y
08:00 de Chile en `metricas.yml`) que todavía no dispararon al cerrar esta
auditoría.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Nota |
|---|---|---|---|
| Barrido | 01:40 (`barrido 2026-10-02 [bot]`, run 36965587197) | ~01:31 | 9 min, dentro de tolerancia |
| Preselección (GPT + validación) | CORREGIR vuelta 1 02:10, APROBADA 02:16 | ~01:35 en adelante | 1 corrección: 46 titulares copiados textuales del barrido |
| Informe (GPT + validación) | CORREGIR v1 02:28, CORREGIR v2 02:35, APROBADA v2 02:39 | tras preselección | 2 vueltas de corrección: apertura/estructura (v1) y una sección que quedó vacía tras mover [C] a "Además, hoy" (v2) |
| Guion del informe (GPT + validación) | CORREGIR v1 02:52, APROBADA v1 02:58 | tras informe | 1 corrección, 8 incumplimientos de forma (tarjetas y cifras habladas), sin tocar contenido |
| Revisión (compuerta, `contenido/revisiones/2026-10-02.md`) | 03:00:11, APROBADA | ~03:10 | 10 min antes de lo previsto (dato de la propia revisión) |
| Edición diaria (voz, render, subida, carátula, podcast) | `videos_listos` 03:39:21 (run 36971475429, 06:00→06:39 UTC) | ~04:00 | adelantada; carátula completa al primer intento a las 02:44 |
| Podcast (`contenido/podcast/episodios.json`) | 585 s = 9,75 min | "~10 min" | dentro de la promesa, dato medido del json |
| Métricas | reloj disparó 05:15:27, sin commit ni workflow | 05:00 | **no corrió**: ver hallazgo 1 |
| Clave | no corrió | — | correcto: CLAVE 4 no es diaria, hoy es viernes y no hay entrega |

## Qué falló

1. **El Reloj de métricas reportó éxito sin efecto.** La rutina
   `trig_01MxzGdh2P489TmgkUi9spWd` registra `last_run.status:
   ROUTINE_RUN_STATUS_SUCCEEDED`, disparada a las 2026-10-02T08:15:27Z
   (05:15 Chile). Su propio contrato es: si `bitacora/metricas/$FECHA.md` no
   existe, escribir `bitacora/metricas/despertador.txt` con la hora UTC
   actual y pushear `despertador métricas $FECHA [reloj]`. Verificado contra
   `main` tres veces (incluida una resincronización a las 05:35 Chile):
   `bitacora/metricas/despertador.txt` sigue con el contenido de ayer
   ("2026-10-01 08:15:07 UTC"), no hay ningún commit de hoy que lo toque
   (`git log` sobre el archivo, historia completa tras `git fetch
   --unshallow`), y `mcp__github__actions_list` sobre `metricas.yml` no
   registra ninguna corrida hoy, ni completada ni en cola. Es la primera vez
   en los tres días anteriores (29-09 a 01-10, todos con margen de ~15 min)
   que esto pasa: no es tendencia todavía, es un hecho aislado.
2. **El informe no trae sección "## Agenda"**, la primera vez desde el
   20-09-2026 (dato y verificación de `contenido/revisiones/2026-10-02.md`,
   que ya lo marcó como lo primero a recuperar en la edición del
   03-10-2026). No bloqueó porque el informe de hoy no traía hitos con fecha
   fuera de los que ya quedaron dentro de otros bloques. Verificado: el
   único "agenda" del archivo es "agenda estadística" en la línea 89.
3. **Tercera vez que la revisión marca el mismo choque de reglas en
   `prompts/guion-informe.md`**: la línea 227 da como ejemplo de tarjeta
   "barras" etiquetas de una palabra ("industria", "minería", "manufactura"),
   y la línea 237 (ETIQUETA CON CONTEXTO) exige 3 a 8 palabras. La revisión
   de hoy lo volvió a marcar y cita las dos fechas anteriores en que ya
   había pasado: 22-09 y 26-09-2026. Se buscó en `bitacora/PENDIENTES.md` y
   `estrategia/decisiones.md` ("etiqueta", "barras"): ninguna entrada cubre
   esto. Es el hallazgo que pide la regla de los tres días: el ciclo revisa y
   no aprende porque nadie tocó el prompt.

## Propuestas

1. **Reloj de métricas sin verificación de escritura**: el prompt de
   `trig_01MxzGdh2P489TmgkUi9spWd` no sigue el contrato de "ESCRITURA
   VERIFICADA" de `prompts/contrato-archivos.md` (no relee el archivo ni el
   commit después del push). Agregar un paso final que vuelva a leer
   `bitacora/metricas/despertador.txt` desde `main` y, si no cambió,
   reintente antes de responder. Como vive en la rutina (no en un archivo del
   repo), el cambio es editar la rutina en la nube, tarea de la sesión de
   noche (regla MODO 1: editar rutinas de la interfaz no es trabajo de día).
2. **Ejemplo de barras que se contradice con su propia regla**: en
   `prompts/guion-informe.md`, línea 227, cambiar el ejemplo a etiquetas de 3
   a 8 palabras, por ejemplo "producción industrial mensual -5,1%;
   extracción minera -7,2%; manufactura exportadora -4,9%", para que no
   choque con la línea 237.
3. **`bitacora/cronograma.json`, línea 30, sigue diciendo "Tope: dos
   vueltas"** cuando el tope real es 4 (`prompts/validador.md:197`): es el
   mismo hallazgo de la auditoría de ayer (01-10-2026), sin tocar todavía.

## Triage

- `AGUANTA` — Reloj de métricas sin efecto (hallazgo 1 / propuesta 1): no
  rompe la edición de mañana ni pierde datos (las métricas se pueden bajar
  cualquier día, y hay dos crons de respaldo hoy a las 06:30 y 08:00 Chile
  que todavía no dispararon). Para la sesión de noche: agregar la
  verificación de escritura a la rutina si el respaldo tampoco corre hoy.
- `AGUANTA` — Contradicción de reglas en `prompts/guion-informe.md` (hallazgo
  3 / propuesta 2): tercera vez marcada sin cambiar nada, no bloquea. Para la
  sesión de noche: aplicar la propuesta 2 ahora que ya lleva tres apariciones.
- `MIRAR` — Informe sin "## Agenda" (hallazgo 2): una sola vez desde el
  20-09, ya anotada por el propio validador para la edición de mañana. Revisar
  si el informe del 03-10-2026 la recupera.
- `MIRAR` — `cronograma.json` con el tope de vueltas desactualizado
  (propuesta 3): segundo día que se anota sin que nadie lo toque; si sigue
  una tercera mañana, sube a `AGUANTA`.

Ningún `HOY`: nada rompe la edición de mañana, pierde datos de forma
irrecuperable o quedó publicado con un defecto visible, así que no baja nada
a `bitacora/PENDIENTES.md` en esta auditoría.

## Comparación con ayer (2026-10-01)

- **Mejoró**: el guion volvió a una sola vuelta de forma pura (igual que
  ayer en vueltas, pero hoy sin ningún hallazgo de contenido, solo de forma
  de tarjetas), y la compuerta cerró con el mismo margen de adelanto (~10 min
  antes de lo previsto, igual que ayer).
- **Sigue igual**: la cadena entera vuelve a cerrar antes de lo previsto, el
  informe otra vez necesitó más de una vuelta (hoy 2, ayer 3), la carátula
  subió completa al primer intento por segundo día seguido, y
  `cronograma.json` sigue sin corregir su tope de vueltas.
- **Nuevo hoy**: el Reloj de métricas falló en silencio por primera vez en
  la serie reciente (29-09 a 01-10 corrieron con ~15 min de margen); el
  informe se quedó sin sección "Agenda" por primera vez desde el 20-09; y la
  revisión acumuló ya tres apariciones del mismo choque de reglas en
  `guion-informe.md` sin que nadie lo haya corregido.
