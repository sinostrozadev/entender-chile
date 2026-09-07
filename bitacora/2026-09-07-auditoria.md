ESTADO: CON OBSERVACIONES — nada roto ni perdido, pero una guarda de dedup falló (se autocorrigió sola) y dos archivos siguen mostrando el horario viejo de esta misma rutina.

Auditada el 07-09-2026 a las 05:39 de Chile, con el checkout sincronizado contra `origin/main` (`f733b99`). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 2026-09-06), no del texto de este mismo prompt (ver Qué falló 2).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:36 | ok |
| Informe | ~02:00 | 01:39 | ok (21 min antes) |
| Guion del informe | ~02:10 | 01:49 | ok — **ver incidente en Qué falló 1** |
| Clave (entrega) | ~02:30 | 01:43 | ok — reaccionó al evento en 4 min (ayer tardó 2h05 y cayó al respaldo) |
| indice.md / banco-temas.md | — | 01:43 | ok, junto con la entrega |
| Guionista de la Clave | 03:50 | 03:58 | ok (+8 min, rutina de reloj fijo, normal) |
| Revisión editorial | 04:40 | 04:43 | ok, VEREDICTO: APROBADA (+3 min) |
| Edición diaria (arranque) | ~04:45 | 04:43 | ok, arrancó puntual |
| Edición diaria (estado al cierre de esta auditoría) | — | 05:39, en curso | produciendo el video de la Clave (paso 4 de 9 restantes); informe (video+short) ya renderizado a las 05:24. Ayer el mismo tramo completo tardó ~70 min (04:44→06:15); a este ritmo terminaría antes de las 06:00. No es falla. |
| Reloj de métricas → Métricas | 05:00 | 05:11 | ok (+11 min) |
| Auditoría matinal (esta) | 05:30 | 05:39 | ok |

Los tres eslabones de la Clave: entrega y guion están, ambos a tiempo. El video
todavía no existe porque la Edición diaria sigue corriendo — a esta hora es
normal, no un caso de "entrega sin guion" (que sí sería grave).

Descripciones del informe y de la Clave: `contenido/descripciones/2026-09-07-informe.txt`
y `-clave.txt` **no existen todavía** (confirmado con `ls contenido/descripciones/`,
el último archivo es del 06-09). Es el paso 5 de la Edición diaria, que va
después del video de la Clave (paso 4, en curso): normal a esta hora, no falla.

## Qué falló

1. **Guarda de dedup omitida: el guion del informe se reescribió por segunda vez y tuvo que revertirse solo.**
   `contenido/guiones/informe/2026-09-07.md` quedó completo y correcto a las
   01:49:49 (commit `a55784d`). A las 04:05:58 —inmediatamente después de que
   el guion de la Clave pusheara a las 03:58:12— una segunda ejecución de la
   misma rutina lo **reescribió con contenido distinto** (commit `1e1b98e`,
   mismo mensaje "edición 2026-09-07: guion informe", 159 líneas insertadas y
   135 eliminadas: no fue un no-op, generó un guion diferente). 26 segundos
   después, a las 04:06:24, el propio sistema lo revirtió (commit `0449173`,
   "revertir sobreescritura accidental del guion informe (guarda de dedup
   omitida)"). Verificado: `git diff a55784d..HEAD -- contenido/guiones/informe/2026-09-07.md`
   no muestra diferencias, el archivo quedó exactamente como a las 01:49; no
   se perdió contenido. Pero la causa de fondo sigue sin cerrarse: revisé
   completo `prompts/guion-informe.md` (184 líneas) y en ninguna hay una
   instrucción que le diga a la rutina que compruebe si
   `contenido/guiones/informe/AAAA-MM-DD.md` ya existe en main antes de
   generar. Es la primera vez que aparece este tipo de incidente (`git log
   --oneline --all | grep -i "revertir\|sobreescritura"` solo devuelve el
   commit de hoy).

2. **El propio prompt de esta auditoría sigue describiendo el horario viejo, segundo día seguido.**
   Líneas 3-4 de `prompts/auditoria-matinal.md`: "Tarea diaria de las **09:30
   de Chile**... (las métricas llegan ~08:47)". El horario real, vigente
   desde el 06-09 según `bitacora/cronograma.json`, es 05:00 métricas → 05:30
   esta auditoría. La auditoría de ayer (`bitacora/2026-09-06-auditoria.md`,
   propuesta 3) ya pidió este cambio; sigue sin aplicarse. No afectó el
   trabajo de hoy (usé `cronograma.json` como manda el punto 3 del prompt),
   pero es una inconsistencia visible en un archivo que se lee fresco cada
   mañana.

3. **El mismo texto fijo "09:30" también está en el script que llena el panel — hallazgo nuevo, misma causa que el punto 2.**
   `scripts/panel-auditoria.js` línea 28 escribe al HTML del panel interno:
   "la escribe sola la rutina de las 09:30" (también en el comentario de la
   línea 5). Ese texto se inyecta cada mañana en `bitacora/panel-interno.html`,
   que es justamente lo que ve Santiago: hoy seguirá mostrando "09:30" aunque
   la rutina corrió a las 05:39. No se había detectado ayer porque la
   auditoría de ayer revisó solo el prompt, no el script.

4. **Pendiente sin marcar: la categoría (e) "redondeo en voz" del trigger de revisión editorial.**
   `bitacora/PENDIENTES.md` línea 297 ("REVISIÓN 1: cargar el prompt nuevo en
   la rutina 'Revisión editorial'") sigue con el checkbox sin marcar. No lo
   verifiqué dígito por dígito hoy (no alcanza el tiempo de esta auditoría
   para releer cada cifra narrada), pero sí corrí `node
   scripts/validar-tarjetas.js --fecha 2026-09-07`, que chequea lo mismo por
   regla determinística: **hoy no encontró ningún aviso de "cifra exacta en
   voz"**, cortando una racha de al menos tres días (04-09: 6 avisos así,
   05-09: 2, 06-09: 1 — ver Comparación con ayer). Eso no confirma que el
   trigger ya tenga la categoría cargada; puede que el guion de hoy
   simplemente no haya necesitado redondear ninguna cifra grande. El pendiente
   sigue abierto y sin marcar.

Sin más fallas: barrido, preselección, informe, observatorio, revisión (en su
veredicto), edición diaria (arranque) y métricas corrieron sin atrasos
mayores a 20 minutos.

## Propuestas

1. En `prompts/guion-informe.md`, entre la línea 1 (el contrato de archivos)
   y la línea 3 ("Primero lee del repositorio..."), agregar: "GUARDA DE
   DEDUP: antes de generar nada, verifica si
   `contenido/guiones/informe/AAAA-MM-DD.md` (fecha de hoy, Chile) ya existe
   en main con contenido completo. Si existe, no lo regeneres ni lo
   sobreescribas: termina sin escribir." Cierra el hueco que causó la
   sobreescritura de hoy.

2. En `prompts/auditoria-matinal.md`, líneas 3-4, cambiar "Tarea diaria de
   las **09:30 de Chile**, después de la última ejecución del día (las
   métricas llegan ~08:47)" por "Tarea diaria de las **05:30 de Chile**,
   después de la última ejecución del día (las métricas llegan ~05:00)". La
   línea 10-11 ("No confundir con el guardián (06:07)... corre tres horas
   después") también necesita revisión de horario, pero requiere confirmar
   primero contra qué rutina se compara ("guardián" del Informe de la mañana,
   06:00, vs. "Guardia" de urgentes cada 2 horas) antes de reescribirla.

3. En `scripts/panel-auditoria.js`, línea 28 (y el comentario de la línea 5),
   cambiar el texto fijo "la rutina de las 09:30" por "05:30".

4. Sin propuesta nueva para el punto 4: ya está registrada en
   `bitacora/PENDIENTES.md` ("REVISIÓN 1"); falta que alguien con sesión
   local la ejecute.

## Triage

- **HOY**: ninguna.
- **AGUANTA**:
  - Propuesta 1 (guarda de dedup del guion informe): se autocorrigió sola
    hoy y no perdió datos, pero el hueco que lo permitió sigue abierto y
    puede repetirse cualquier día que el guion de la Clave empuje justo
    después.
  - Propuestas 2 y 3 (horario viejo en el prompt y en el script del panel):
    cosmético, no afecta la producción, pero es el segundo día que
    `auditoria-matinal.md` queda sin corregirse y ahora se sumó un segundo
    archivo con el mismo error.
  - Punto 4 (categoría e del trigger de revisión editorial): sigue sin
    marcarse en PENDIENTES.md, aunque hoy no se manifestó.
- **MIRAR**:
  - El guion de hoy narra 1.931 palabras (~14,3 min estimados a 135 ppm,
    aviso de `validar-tarjetas.js`), sobre el techo prometido de 13 min. Es
    una estimación por palabras, no la duración real: el episodio de hoy
    todavía no está en `contenido/podcast/episodios.json` (los últimos
    registros son del 06-09). Revisar el dato real (`durSeg`) cuando se
    publique el podcast, recordando que el 03-09 esta misma estimación dio
    15,7 min para un audio real de 11,9.
  - La Edición diaria seguía corriendo al cierre de esta auditoría
    (05:39); si el tramo que falta (Clave, shorts, subida a YouTube, podcast,
    web) se alarga más que los ~70 minutos de ayer, podría terminar después
    de las 06:00, cuando corre el Informe de la mañana.

## Comparación con ayer

**Mejoró**:
- `bitacora/metricas/2026-09-07.md` sí se generó (05:11), resolviendo la
  falla HOY de ayer (el Reloj de métricas de ayer reportó éxito sin escribir
  el archivo).
- "Clave (entrega)" reaccionó al evento del informe en 4 minutos (01:39→01:43)
  en vez de caer al respaldo fijo de las 2+ horas después, como ayer
  (01:40→03:45). El punto MIRAR de ayer sobre esto no se repitió.
- `validar-tarjetas.js` no encontró ningún aviso de "cifra exacta en voz"
  hoy, cortando una racha de al menos tres días (04-09: 6 avisos, 05-09: 2,
  06-09: 1).
- El aviso "sin línea Carátula sugerida:" (presente el 04-09 y el 05-09)
  tampoco reapareció hoy ni ayer.

**Sigue igual**:
- `prompts/auditoria-matinal.md` sigue sin actualizar su horario (propuesta 3
  de ayer, hoy segundo día sin corregir).
- La categoría (e) del trigger de revisión editorial sigue sin recargarse
  según PENDIENTES.md, aunque hoy no produjo un hallazgo real.
- La revisión editorial volvió a cerrar con un solo hallazgo [MENOR] (como
  ayer), pero de categoría distinta (c hoy: precisión de una cifra narrada;
  b ayer: etiqueta de ráfaga) — no es un hallazgo repetido, son dos casos
  aislados en días distintos.

**Nuevo**:
- La sobreescritura accidental del guion informe por guarda de dedup omitida:
  primera vez que aparece este tipo de incidente en el historial del repo, y
  se autocorrigió en 26 segundos.
- El mismo texto de horario desactualizado ("09:30") apareció también en
  `scripts/panel-auditoria.js`, ampliando a un segundo archivo un problema
  que ayer parecía limitado al prompt.
- Aviso nuevo de `validar-tarjetas.js` sobre el techo de duración del guion
  de hoy (sin precedente en los tres días anteriores revisados).
