# Auditoría matinal, 08-11-2026

Auditada el 08-11-2026 entre las 05:30 y las 05:50 de Chile, con el checkout
sincronizado contra `origin/main` (`1c9b202`, "reintento: despertador 05:36
[reloj]").

ESTADO: CON FALLAS. HOY: las nueve noticias [C] del informe quedaron como
encabezados "### [C]" en vez de líneas de "Además, hoy", y la web ya
publicada no les da chip ni ancla ni las lista; además, "ninguna cifra llegó
verificada desde la preselección" entra a su cuarta mañana seguida.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | despertador 01:40:01, barrido 01:40:24 | 01:30 (cron), ~01:31 histórico | éxito, 10 min tarde, sin falla de cuota | `get_trigger(trig_01W5KEjHbr5wWPsmmJ4ygNEh)`: `last_run.status: ROUTINE_RUN_STATUS_SUCCEEDED`; Actions "Barrido" run `42447751247`, `conclusion: success` |
| Preselección | redactada 01:55, CORREGIR vuelta 1 (fecha de prosa sin DD-MM-AAAA), APROBADA 02:02 | tras `barrido_listo` | éxito, una vuelta | `contenido/veredictos/2026-11-08-preseleccion.md` |
| Informe | redactado, CORREGIR vuelta 1 (quince correcciones, todas de forma: topes de cifras, largos, colocación de tarjetas), APROBADA 02:26 | tras cada pieza | éxito, una vuelta, pero cara: quince correcciones en una sola pasada | `contenido/veredictos/2026-11-08-informe.md`; `contenido/informes/2026-11-08.md` (creado 02:17) |
| Guion del informe | redactado, CORREGIR vuelta 1 (ocho correcciones, el mismo par de topes), APROBADA 02:52 | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-08-guion_informe.md`; `contenido/guiones/informe/2026-11-08.md` (creado 02:42) |
| Revisión (compuerta) | 03:01, APROBADA vuelta 1 | tras cada pieza | éxito | `contenido/revisiones/2026-11-08.md` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | arrancó con el push de la revisión, `videos_listos` 03:03 | ~02:50 (cuadro del panel) | éxito, 13 min después del cuadro, sin arrastre (`FALTA: nada, el día está completo` a las 03:04) | Actions "Edición diaria" run `42453025127`, `conclusion: success`; `contenido/estado/2026-11-08.md` |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs, todos `conclusion: success` (último `42453209522`) |
| Reloj de métricas + Métricas | despertador 05:04, métricas 05:04:45 | 05:00 | éxito, 4 a 5 min tarde | Actions "Métricas" run `42461375555`, `conclusion: success`; `bitacora/metricas/2026-11-08.md` (creado 05:05) |
| Vigía de la cadena | 05:15:13 Chile | 02:15 y 05:15 | `SUCCEEDED`, sin aviso (la cadena ya estaba completa) | `get_trigger(trig_01LUtn4fSJjBsCzqdoWeVviH)`: `last_run.status: ROUTINE_RUN_STATUS_SUCCEEDED` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14); la última es la del 05-11-2026 | cuando corresponda | sin novedad, no es hallazgo | `contenido/claves/` y `contenido/guiones/claves/`: sin archivo con fecha 2026-11-08 |
| Short del día | subido en `private`, publicado `2026-11-08`, 42 segundos | 12:00 | pendiente de evaluar hasta su publicación | `bitacora/metricas/2026-11-08.json`: `ObuOrzlbqiY`, "El balance oficial del choque en la Ruta de la Fruta fue…, y", `estado: private` |

Duración real del informe: 237 segundos (3:57), dentro de la promesa de 3 a 4
minutos (`contenido/podcast/episodios.json`, episodio del 08-11-2026). No hay
episodio de Clave hoy, consistente con que no hubo Clave.

Validador de tarjetas: `node scripts/validar-tarjetas.js --fecha 2026-11-08`
→ "4 bloques con fuente, 510 palabras narradas (~3,8 min): cambio 1 · esquema
1 · comparacion 1 · cifra 1" y "variedad OK: ninguna cuota rota, ninguna marca
malformada." Sin avisos.

Marcas `PENDIENTE DE CIERRE`: ninguna en `contenido/informes/2026-11-08.md`
(buscado explícitamente, cero coincidencias).

## Qué falló

1. **Las nueve noticias [C] del informe de hoy quedaron como encabezados
   "### [C]" en vez de líneas de "Además, hoy", y la sección "Además, hoy" no
   existe en esta edición.** `contenido/informes/2026-11-08.md`, líneas 23,
   27, 31, 77, 81, 85, 99, 117 y 127: cada una empieza con `### [C]`.
   `web/src/lib/contenido.ts`: la línea 165 solo da `data-nivel="C"` (chip y
   ancla) a un `[C]` dentro de `<li>` (viñeta), y la línea 171 borra
   cualquier marca `[ABC]` que quede, encabezados incluidos. Como resultado,
   las nueve quedan en la web como subtítulos sueltos, sin chip de peso, sin
   ancla propia y sin entrar al listado `noticias` que alimenta el índice:
   ya está publicado (el workflow "Web" corrió después de cada push de hoy)
   y es un defecto visible para cualquier lector. El propio validador lo
   dejó por escrito en `contenido/veredictos/2026-11-08-informe.md`: "Viene
   de mi corrección 1 de la vuelta 1, que pidió corchetes 'y lo mismo para
   cada [B] y cada [C]' sin mirar la estructura." La edición aprobada del
   07-11-2026 hace lo contrario (cero `### [C]`, con la sección "Además, hoy"
   en su línea 78) y por eso no le pasa esto.

2. **"Ninguna cifra llegó verificada desde la preselección" entra a su
   cuarta mañana seguida.** `contenido/revisiones/2026-11-08.md`: "las
   cifras de la preselección entran sin verificar por diseño, así que el
   informe tiene que confirmarlas contra la fuente antes de usarlas", la
   misma observación de `contenido/revisiones/2026-11-05.md`,
   `2026-11-06.md` y `2026-11-07.md`. Ya está en `bitacora/PENDIENTES.md`
   desde el 07-11-2026 (marcada HOY esa vez, con un defecto publicado en el
   8% de reajuste de tarifas); hoy no se le encontró un defecto publicado
   nuevo, pero el patrón sigue sin que `prompts/preseleccion.md` cambie.

3. **El tope de tres cifras habladas por bloque volvió a ser el grueso de
   las correcciones por tercer día seguido, y hoy además mostró un hueco de
   criterio.** `contenido/revisiones/2026-11-06.md`: "las seis correcciones
   del guion fueron todas del mismo par de reglas, el tope de tres cifras
   habladas por bloque..."; `contenido/revisiones/2026-11-07.md`: "dos
   fueron el tope de tres cifras habladas por bloque"; hoy, de las ocho
   correcciones del guion, cuatro de los cinco bloques narrados tuvieron que
   recortarse al tope (`contenido/veredictos/2026-11-08-guion_informe.md`,
   puntos 3, 4 y 5). El mismo veredicto de hoy señala el hueco: "Conviene
   que `prompts/guion-informe.md` diga explícitamente si la [TESIS], que sí
   se narra, cuenta para ese tope: hoy el criterio lo fija el validador y eso
   puede cambiar entre días." No bloqueó nada ni se publicó con un defecto
   (la máquina sigue produciendo sin pérdida), pero es exactamente el
   "revisa y no aprende" que señala este prompt cuando un hallazgo se repite
   tres días sin que el prompt cambie.

4. **`scripts/metricas.js` volvió a perder un video de la medición, décima
   vez documentada.** Comparando `bitacora/metricas/2026-11-07.json` contra
   `bitacora/metricas/2026-11-08.json` por id (no por título): hoy falta
   `W1wDcuuG7tI` ("La economía chilena no logra repuntar: el Imacec cayó
   otra v...", público, 8 vistas, presente ayer). `canal.videos` (de
   `channels.list`, que no cuenta borrados ni privados) se mantuvo en 222 los
   dos días, mientras los públicos medidos siguen en 221, uno por debajo de
   lo que el canal declara: el mismo patrón de siempre, no un borrado. El PR
   #8 (el arreglo, probado contra un doble de la API) sigue abierto y sin
   fusionar: `mcp__github__pull_request_read` lo muestra `state: open`,
   `merged: false`, `updated_at: 2026-11-06T10:36:47Z` (sin cambios desde
   entonces).

Sin otras fallas nuevas: el resto de los hallazgos de
`contenido/revisiones/2026-11-08.md` (los nombres de sección fuera de la
lista del prompt, las fuentes por ordenar, las dos afirmaciones más anchas
que su fuente, las tres fechas de prosa fuera de DD-MM-AAAA, "Conaf" sin
expandir y las líneas de "Agenda de hoy" escritas como encargos) son
precisiones de un solo día o variantes menores de patrones ya escritos en
`bitacora/PENDIENTES.md`, y no agregan un hallazgo nuevo hoy.

## Propuestas

1. Para la falla 1: en `contenido/informes/2026-11-08.md`, convertir las
   nueve líneas `### [C]` (23, 27, 31, 77, 81, 85, 99, 117, 127) en viñetas
   `- [C] <titular>` dentro de una sección `## Además, hoy` nueva, como pide
   `prompts/informe.md:100`; es una edición del mismo día, permitida por el
   contrato. Para que no vuelva a pasar: en
   `prompts/validador.md:213` (el formato "Dónde / Regla / Debe quedar" de
   cada corrección), agregar que una corrección que pide envolver una
   noticia en `[A]`, `[B]` o `[C]` tiene que decir también DÓNDE debe quedar
   la línea resultante (encabezado, viñeta o línea de "Además, hoy"), no
   solo pedir el corchete.
2. Para la falla 2: que `prompts/preseleccion.md` declare explícitamente,
   candidata por candidata, cuáles cifras no pudo verificar contra su fuente
   primaria, en vez de dejar que el informe las confirme solo (la misma
   propuesta que ya vive en `bitacora/PENDIENTES.md` desde el 07-11-2026).
3. Para la falla 3: en `prompts/guion-informe.md`, en la regla del tope de
   tres cifras habladas por bloque, agregar una frase que diga si la cifra
   narrada dentro de una `[TESIS]` cuenta para ese tope o no, para que el
   criterio no dependa de que lo fije el validador cada día.
4. Para la falla 4: ninguna propuesta nueva, el arreglo ya existe. Fusionar
   el PR #8 y verificar la corrida real de Métricas del 09-11 a las 05:00,
   que es la prueba que al PR le sigue faltando.

## Triage

- **HOY**: la falla 1 (los nueve `[C]` sin chip ni ancla en la web, ya
  publicado) y la falla 2 (cifras sin verificar, cuarta mañana seguida).
  Ambas bajan a `bitacora/PENDIENTES.md` en este mismo commit: la falla 1
  como entrada nueva, la falla 2 como continuación de la entrada del
  07-11-2026.
- **AGUANTA**: la falla 3 (tope de tres cifras habladas por bloque, tercer
  día con el mismo costo, con el hueco de la `[TESIS]` recién señalado) y la
  falla 4 (`metricas.js` pierde un video; ya está en `bitacora/PENDIENTES.md`
  desde el 27-10-2026 y se le agrega la continuación de hoy, sin duplicar la
  entrada).
- **MIRAR**: ninguna nueva hoy.

## Comparación con ayer

- **Mejoró**: el barrido volvió a correr sin falla de cuota, como ayer y
  antes de ayer. Los suscriptores subieron por primera vez en seis días
  (48 desde el 03-11, hoy 49, `bitacora/metricas/2026-11-08.md`).
- **Sigue igual**: las cifras sin verificar desde la preselección (ahora
  cuarta mañana); `scripts/metricas.js` sigue perdiendo un video por corrida,
  con el PR #8 todavía sin fusionar; el tope de tres cifras habladas sigue
  costando la mayoría de las correcciones del guion, tercer día seguido.
- **Nuevo**: el informe pagó una corrección en la preselección además de en
  el informe y el guion (los tres días anteriores la preselección pasaba
  limpia en vuelta 0), y por primera vez el propio proceso de corrección del
  validador introdujo un defecto que llegó publicado (los nueve `[C]` como
  encabezados), en vez de que el defecto viniera de GPT.
