# Auditoría matinal, 05-11-2026

Auditada el 05-11-2026 entre las 05:33 y las 05:50 de Chile, con el checkout
sincronizado contra `origin/main` (`33aa925`, "seguimiento 2026-11-05: temas").
A esta hora el paso 4 de la Edición diaria ("Producir video de la Clave") de
la corrida `41991617295` seguía en curso (arrancó 08:06:43 UTC = 05:06:43
Chile); el gate previo ya pasó, así que lo que falta es solo el render.

ESTADO: CON OBSERVACIONES. La cadena llegó completa, con sus tres piezas
diarias aprobadas y la Clave con sus tres eslabones (entrega, guion, y el
video en render), pero una caída real de cuota de Claude paró en silencio el
reintento entre las 01:41 y las 04:11 (2 horas 30 minutos) y dejó el día sin
el Observatorio de plata pública. No hay ningún `HOY` nuevo: la caída de
cuota ya está pedida a Santiago desde el 16-10 y hoy es evidencia nueva de lo
mismo, no un hallazgo distinto.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | 01:40 a 01:41 | 01:30 a 01:31 | éxito, 10 min tarde | commits "despertador 2026-11-05 [reloj]" y "barrido 2026-11-05 [bot]" |
| Observatorio plata pública | **no corrió** | 01:45 | **FALLÓ**, sin reintento | `get_trigger(trig_01MzKjYwnyH8PfJfCBrtJvv4)`: `last_run.status: ROUTINE_RUN_STATUS_FAILED`, `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`, disparada 04:45:44 UTC (01:45:44 Chile); sin commit `observatorio 2026-11-05 [claude]` en el log |
| Preselección | dispatch al suplente 01:41, redactada 04:22, veredicto 04:27 | tras `barrido_listo`, sin atraso esperable | APROBADA vuelta 0, pero **2 h 41 min de atraso real** | `contenido/veredictos/2026-11-05-preseleccion.md`; commits "disparo al suplente... barrido_listo" (01:41) y "edición 2026-11-05: preselección" (04:22); entre medio, "reintento del reparto 2026-11-05: barrido_listo (vuelta 0, intento 1)" a las 04:11 |
| Informe | redactado 04:33, APROBADA vuelta 0 a las 04:43 | tras cada pieza | éxito, sin corrección | `contenido/veredictos/2026-11-05-informe.md` |
| Guion del informe | redactado 04:46 (vuelta 0), CORREGIR 04:51 (v1), CORREGIR 04:57 (v2), APROBADA 05:02 (v3 real, "vuelta 2" en el veredicto) | tras cada pieza | éxito, dos vueltas | `contenido/veredictos/2026-11-05-guion_informe.md` |
| Revisión (compuerta) | 05:03, APROBADA vuelta 2 | tras cada pieza | éxito | `contenido/revisiones/2026-11-05.md` |
| Clave "Rabat: rebajas de condena" (entrega + guion) | entrega APROBADA 02:48, guion APROBADA 03:13 | a juicio editorial, sin calendario | éxito, sin corrección real (las dos piezas llegaron limpias en su vuelta de verificación) | `contenido/veredictos/clave-rabat-rebajas-de-condena-entrega.md` y `-guion.md` |
| Render de la Clave (video) | intento 1 a las 00:15 **falló** (gate), intento 2 a las 04:47 **falló** (gate), intento 3 dentro de la Edición diaria de las 05:03 en curso al cerrar esta auditoría | con la Edición diaria | el gate hizo lo que tenía que hacer: los dos intentos tempranos de `estado-clave.yml` cayeron antes de que la revisión del día (05:03) abriera la compuerta, y el paso "2b · Gate previo al render" los rechazó a propósito, no por un error de render | runs `41960420109` y `41989736307` (`conclusion: failure`, step 10 "2b · Gate previo al render" en rojo, los pasos de render siguientes en `skipped`); run `41991617295` con el mismo gate en verde y el paso 15 "Producir video de la Clave" `in_progress` |
| Edición diaria (render, voz, Short, carátulas, release, subida programada, podcast) | arrancó 05:03:42, aún en curso al cerrar esta auditoría | ~02:50 | **2 h 13 min tarde** en arrancar, arrastrado por la preselección | run `41991617295`, pasos 1 a 14 en verde, paso 15 en curso |
| Web | con cada push relevante | continuo | éxito | runs `41991617457`, `41988089048`, `41957187790`, todos `conclusion: success` |
| Reloj de métricas, Métricas | 05:05 | 05:00 | éxito, 5 min tarde | `bitacora/metricas/2026-11-05.md` |
| Vigía de la cadena | 02:15 y 05:15 Chile | 02:15 y 05:15 | `ROUTINE_RUN_STATUS_SUCCEEDED` en ambas, sin aviso | `get_trigger(trig_01LUtn4fSJjBsCzqdoWeVviH)`: igual que ayer, la ventana de la caída de cuota (01:41 a 04:11) cayó completa entre las dos corridas de la vigía |

Short del día: no evaluable todavía a esta hora (el paso "3b · Producir el
Short" de la Edición diaria terminó en verde a las 05:06:32, pero la subida
es programada para las 12:00 y el Short de hoy no aparece aún en
`bitacora/metricas/2026-11-05.json`). Se incorpora como fila propia desde
hoy, según lo que pidió la auditoría de ayer.

Duración real del informe: pendiente. `contenido/podcast/episodios.json`
termina en el episodio del 04-11-2026 (219 segundos); el de hoy todavía no
entra porque el paso del podcast de la Edición diaria no había corrido al
cerrar esta auditoría. No se estima por palabras (la auditoría del 03-09
ya mostró que la estimación a 150 ppm se equivoca). Validador de tarjetas:
`node scripts/validar-tarjetas.js --fecha 2026-11-05` → 477 palabras
narradas (~3,5 min), un aviso.

## Qué falló

1. **Una caída real de cuota de Claude (`ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`)
   paró el Observatorio de plata pública a las 01:45:44 Chile y dejó sin
   actualizar los dossiers de "¿En qué quedó?" de hoy, sin que nada lo
   reintentara.** Verificado en la fuente: `get_trigger` sobre
   `trig_01MzKjYwnyH8PfJfCBrtJvv4` devuelve `last_run.status:
   ROUTINE_RUN_STATUS_FAILED` con ese motivo exacto, y no existe ningún
   commit `observatorio 2026-11-05 [claude]` en el historial de hoy (listado
   el log completo del día). El Observatorio no tiene red de reintento propia
   (a diferencia de las piezas de la cadena, que `reintento.yml` cubre): si
   falla, el día simplemente no se actualiza y nadie lo nota, salvo esta
   auditoría. No pierde datos (las fuentes siguen disponibles para que el
   Observatorio de mañana las retome), pero sí es la demostración más directa
   hasta ahora de que la cuenta de Claude puede quedarse sin cuota un rato,
   exactamente la causa que `bitacora/PENDIENTES.md` ("Dependen de Santiago",
   16-10) ya identificó para el apagón del 14 y 15-10, pero esta vez con el
   `failure_reason` exacto en la API en vez de tener que inferirlo de un
   silencio de commits.

2. **La misma ventana de caída de cuota (01:41 a 04:11 Chile, 2 h 30 min)
   dejó sin empujar a los tres relojes del reintento (A, B y C, que deberían
   pushear cada 20 minutos) y atrasó la preselección 2 h 41 min.** El
   suplente fue despachado a las 01:41:12 ("disparo al suplente 2026-11-05:
   barrido_listo"), pero no escribió `contenido/preseleccion/2026-11-05.md`
   hasta las 04:22:29, recién después de que `reintento.yml` reintentara el
   reparto a las 04:11:52 ("reintento del reparto 2026-11-05: barrido_listo,
   vuelta 0, intento 1"). Comparado con el historial de ejecuciones de
   `reintento.yml` (`actions_list`, workflow `reintento.yml`): hay commits de
   reloj a las 01:10 y 01:36, y el siguiente es a las 04:11; faltan los siete
   disparos que deberían haber caído a las 01:50, 02:10, 02:30, 02:50, 03:10,
   03:30 y 03:50 (los tres relojes A/B/C desfasados dan uno cada 20 minutos).
   Es la misma caída de cuota del hallazgo 1, vista desde otro ángulo: no
   fue un fallo de código ni de GPT, fue la cuenta de Claude sin uso durante
   dos horas y media. La cadena se recuperó sola (nadie tuvo que intervenir)
   y no llegó a publicarse nada con defecto, pero la Edición diaria arrancó
   2 h 13 min más tarde que su hora habitual (~02:50 contra las 05:03 de hoy).

3. **La Vigía de la cadena (02:15 y 05:15 Chile) volvió a no ver el problema,
   segundo día seguido que su ventana fija de dos chequeos deja pasar algo
   real entre medio.** `get_trigger` sobre `trig_01LUtn4fSJjBsCzqdoWeVviH`
   confirma las dos corridas de hoy `SUCCEEDED` sin aviso. A las 02:15 el
   atraso recién empezaba (barrido_listo se había emitido a las 01:41, dentro
   de la gracia) y a las 05:15 la cadena ya casi había terminado de
   recuperarse sola: la ventana de la vigía bracketa la caída igual que ayer
   bracketeó el bloqueo de GPT en `reparar_guion_informe` (02:40 a 03:36). Es
   la segunda vez en dos días que el mismo diseño de "dos fotos fijas por
   noche" no alcanza a fotografiar el problema.

4. **`scripts/validar-tarjetas.js:158` vuelve a marcar una cifra de carátula
   como si fuera voz narrada: tercer día en cuatro con el mismo falso
   positivo (21-10, 04-11, 05-11).** Hoy avisó "línea 5: cifra exacta en voz
   (\"9.134\")" sobre "Carátula 3: $9.134 millones / Multas de Junaeb"
   (`contenido/guiones/informe/2026-11-05.md:5`), que es un gancho de
   miniatura y no se narra. El filtro de `narradas` (línea 96) sí excluye
   "Carátula N:" y las demás cabeceras; el de cifra exacta (`narrables.forEach`,
   línea 158, filtro `!/^(\[|## |#)/`) no. Ya está en `bitacora/PENDIENTES.md`
   desde el 21-10 como AGUANTA con el arreglo de una línea escrito; solo
   cambió el número de línea (153 el 21-10, 159 el 04-11, 158 hoy, porque el
   archivo crece).

5. **La definición de "nombre buscable" en `prompts/informe.md` lleva dos
   días seguidos decidiendo la portada por una contradicción, no por una
   regla clara.** `contenido/revisiones/2026-11-05.md` lo marca "abierto por
   segundo día seguido"; el 04-11 ya se había anotado como puntaje mal
   aplicado ("nombre buscable 2" cuando los protagonistas eran multifondos e
   instituciones). Todavía no son tres días, así que queda en MIRAR y no en
   AGUANTA, pero conviene que la sesión de noche lo mire antes de que se
   vuelva un patrón de tres.

6. **Los dos intentos tempranos de renderizar el video de la Clave
   terminaron en rojo en GitHub Actions (runs `41960420109` y
   `41989736307`), aunque el sistema funcionó como corresponde.** El paso
   "2b · Gate previo al render" los rechazó porque la revisión del día
   (`contenido/revisiones/2026-11-05.md`) todavía no estaba APROBADA (el
   primer intento, a las 00:15, ni siquiera tenía guion del informe escrito
   todavía). No es un bug: es el gate haciendo justo lo que tiene que hacer,
   evitar un render a medias. El costo es cosmético, dos corridas en rojo en
   la pestaña de Actions que, si alguien las mira sin este contexto, parecen
   una falla real.

Sin fallas que hayan llegado al video o a la web con un defecto visible: lo
único que se perdió hoy fue la actualización del Observatorio (hallazgo 1),
que es ausencia de novedad, no un error publicado.

## Propuestas

- Para el hallazgo 1 y 2 (misma causa): no hay arreglo de código razonable
  contra una caída de cuota en sí. La propuesta que corresponde ya está
  escrita y esperando el sí de Santiago en `bitacora/PENDIENTES.md`,
  "Dependen de Santiago", entrada del 16-10: un workflow de GitHub Actions
  con cron propio, independiente de la cuota de Claude, que avise si el
  video del día no aparece a una hora fija. Hoy agrega la evidencia que
  faltaba: el `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`
  exacto de la API, no una inferencia por silencio de commits.
- Para el hallazgo 4: en `scripts/validar-tarjetas.js`, línea 158, copiar la
  exclusión de cabeceras de la línea 96 (agregando "Carátula") al filtro del
  bloque de cifra exacta. Mismo arreglo pedido el 21-10, con línea
  actualizada.
- Para el hallazgo 5: en `prompts/informe.md`, la sección del puntaje de
  portada, decidir si "nombre buscable" vale 2 para una institución o un
  indicador con nombre propio (Junaeb, AFP) o solo para personas naturales, y
  escribirlo sin la doble lectura actual. Sin propuesta de texto exacto
  todavía porque no es (aún) una pieza bloqueada, es una ambigüedad de
  prompt.
- Para el hallazgo 3: no hay arreglo de código chico. Si se quiere que la
  vigía cubra la ventana completa en vez de dos fotos fijas, es rediseñar su
  cadencia (por ejemplo cada 30 a 45 minutos entre 01:30 y 05:30), lo que
  significa más turnos de Claude por noche. Queda para que la sesión de
  noche lo evalúe contra el costo, no para decidirlo acá.
- Para el hallazgo 6: ninguna. El gate funcionó.

## Triage

- **HOY**: ninguno nuevo. La caída de cuota (hallazgos 1 y 2) es evidencia
  nueva de un asunto que YA es `HOY` desde el 16-10 en
  `bitacora/PENDIENTES.md` ("Dependen de Santiago") y sigue esperando
  decisión de Santiago, no de código: se agrega una línea de evidencia a esa
  entrada, sin duplicarla.
- **AGUANTA**:
  - El falso positivo de `validar-tarjetas.js:158` (hallazgo 4), ya en
    `bitacora/PENDIENTES.md` desde el 21-10, confirmado por tercera vez.
  - La caída de cuota en sí (hallazgos 1 y 2): la máquina sigue produciendo
    (se recuperó sola y nada se publicó con defecto), pero molesta y ya es
    la segunda vez medida con evidencia dura en tres semanas.
- **MIRAR**:
  - La ambigüedad de "nombre buscable" en `prompts/informe.md` (hallazgo 5):
    segundo día seguido, falta uno para ser patrón de tres.
  - El diseño de dos fotos fijas de la Vigía (hallazgo 3): segunda vez en dos
    días que su ventana deja pasar un problema real entre medio.

Buscado en `estrategia/decisiones.md` y `bitacora/REALIZADOS.md`: no hay
ninguna decisión de "no hacer" sobre la caída de cuota, el falso positivo de
`validar-tarjetas.js` ni la ambigüedad de "nombre buscable". Sí hay una
decisión del 16-10 (`bitacora/REALIZADOS.md`, línea 180) que descarta
específicamente "un cron de GitHub más denso en `reintento.yml`" como arreglo
a la caída de cuota, porque la cadena se detiene igual en `validar_*`: por
eso la propuesta de hoy no repite esa idea y remite a la que ya está pedida a
Santiago.

## Comparación con ayer

Mejoró: la carátula se generó sin reintentos (igual que ayer); el informe y
la preselección pasaron en vuelta 0 sin corrección; el Short de ayer
(04-11-2026, "El repunte de octubre no borró las pérdidas reales...") ya
aparece público en las métricas de hoy, cerrando el hueco de dos días sin
Short que marcó la auditoría de ayer. Sigue igual: las seis fuentes
institucionales sin feed (cuarto día seguido, ya en `bitacora/PENDIENTES.md`
desde el 16-10); el falso positivo de `validar-tarjetas.js`; sin ninguna
marca `PENDIENTE DE CIERRE` vencida, como desde el 03-11. Nuevo: por primera
vez esta semana la causa del atraso no fue GPT sin responder (como el 04-11)
sino una caída de cuota de Claude, medida con el motivo exacto de la API en
vez de inferida; es además la primera vez que el Observatorio de plata
pública falla por completo en vez de simplemente no encontrar novedades; y
la ambigüedad de "nombre buscable" pasó de aparecer una vez (04-11) a
repetirse (05-11), con lo que ya es tendencia y no anécdota.
