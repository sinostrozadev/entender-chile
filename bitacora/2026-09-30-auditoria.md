ESTADO: CON OBSERVACIONES — la cadena corrió sin fallas técnicas, con
`conclusion: success` en Barrido, Edición diaria, Métricas, Web y Estado del
día (verificado con `mcp__github__actions_list`), y adelantada al horario en
cada eslabón (compuerta cerrada a las 02:51, casi 40 minutos antes de la
prevista de las 03:30). Hay un `HOY`: "Confusam" y "CIPER" salieron sin
expandir en el pie de dos tarjetas [FUENTE] del video publicado
(`contenido/guiones/informe/2026-09-30.md`, líneas 67 y 73), y esta vez no es
un hueco de la regla como en días anteriores (la regla de siglas SÍ cubre esa
marca): el validador no lo marcó en la vuelta 1 y la regla de convergencia le
impidió sumarlo en la vuelta 2, así que llegó al aire. Séptimo día seguido con
la familia de las siglas en los hallazgos.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (`contenido/estado/2026-09-30.md`) | Nota |
|---|---|---|---|
| Barrido | 01:40 (API: `conclusion: success`, `run_started_at` 04:40:12 UTC) | 01:40 | en punto |
| Preselección (GPT + validación) | aprobada 02:05, vuelta 2 | 02:10 | 1 corrección (URL de Google News cortada en tres bloques) |
| Informe (GPT + validación) | aprobado 02:23 (veredicto 02:23:25), vuelta 1 | 02:40 | 1 corrección (seis incumplimientos de verificación y fuentes) |
| Guion del informe (GPT + validación) | aprobado 02:49 (veredicto 02:48:59), vuelta 1 | 03:10 | 1 corrección (seis incumplimientos de forma) |
| Revisión (compuerta, `contenido/revisiones/2026-09-30.md`) | 02:51 | 03:30 | VEREDICTO: APROBADA |
| Edición diaria (voz, render, subida) | `videos_listos` (API: push 05:51:09 UTC → completado 06:28:41 UTC = 02:51→03:28 Chile) | 05:15 | muy adelantada, sin incidentes |
| Carátula | subió, `contenido/caratulas/2026-09-30.png`, verificada completa con `scripts/imagen-entera.js` (dice "completa") | tras el guion | tercer día seguido con carátula sana (28, 29 y 30-09) |
| Podcast (`contenido/podcast/episodios.json`) | 617 s = 10:17 min, episodio del informe | "~10 min, 12-13 en día cargado" | dentro de la promesa, dato medido del json |
| Métricas | reloj y workflow 08:15:34-08:16:20 UTC = 05:15 Chile | 05:00 | 15 min de margen, dentro de tolerancia (mismo margen que ayer) |
| Clave | no corrió | — | correcto: CLAVE 4 no es diaria; no es domingo, no toca `semana/` |

Costo de vueltas: las tres piezas necesitaron una corrección cada una (la
preselección la segunda vuelta de su propio proceso, informe y guion su
primera). Ningún atraso pasa los 20 minutos contra lo esperado; todo llegó
antes, la mayoría por más de media hora.

## Qué falló

Sin fallas técnicas: las corridas de Actions de hoy sobre `main` (Barrido run
93, Edición diaria runs 153-155, Métricas run 93, Web runs 245-249, Estado del
día runs 387-401) tienen `conclusion: success` (las tres cancelaciones del Web,
runs 243-245, son de pushes de informe superados en menos de un minuto por el
siguiente, concurrencia normal, no error). `node scripts/validar-tarjetas.js
--fecha 2026-09-30` no dejó avisos de formato: "variedad OK: ninguna cuota
rota, ninguna marca malformada" (aunque sí hay un aviso de tipos, ver punto 3
abajo). Los puntos siguientes son de calidad editorial y ninguno detuvo la
publicación:

1. **Siglas sin expandir en pantalla, esta vez SIN hueco de regla: el
   validador no lo marcó en su propia vuelta 1.** `contenido/revisiones/2026-09-30.md`
   (hallazgos, primer punto "PARA SANTIAGO"): "Confusam" (línea 67 del guion) y
   "CIPER" (línea 73) se pintan en el pie de dos tarjetas `[FUENTE]` sin
   expandirse en ninguna parte de la pieza. Verificado en
   `prompts/guion-informe.md:211-217`: la regla de siglas cubre exactamente esa
   marca ("en esta marca o en el pie de un [DATO]"), a diferencia del 29-09
   (`Fogape` en un `[ESQUEMA]`, fuera del alcance literal de la regla) y del
   28-09 (`SAG`/`CONAF` en un titular). O sea: no es que la regla no llegue,
   es que la vuelta 1 del validador no la aplicó esta vez, y
   `prompts/validador.md:158` ("Convergencia") prohíbe sumar en la vuelta 2 un
   hallazgo sobre una parte que la vuelta anterior no marcó, así que quedó sin
   corregir y salió al aire. Más blando, mismo problema: "RCEP" (líneas 84 y
   86) se narra sin explicarse. Es la séptima mañana seguida con la familia de
   las siglas en los hallazgos (23, 27, 28, 29 y hoy 30-09, contando las
   fechas que dejaron rastro en `bitacora/PENDIENTES.md` línea 780).
2. **La edición quedó con solo dos tipos de tarjeta (comparacion y cifra),
   bajo la cuota de variedad, tercer día seguido (28, 29 y 30-09).** No es
   incumplimiento (el prompt pone el árbol de tipos sobre la cuota, que es
   alarma y no obligación), y hoy tiene causa confirmada con tres días de
   datos: de las diez noticias narradas, solo una trae dos valores de la
   misma unidad. El informe no está entregando material graficable en
   familias comparables (un antes y un después del mismo indicador, o dos
   cifras de la misma unidad); mientras no lo haga, el guion no tiene con qué
   variar sin inventar.
3. **Seis hechos del barrido no entraron nunca a la olla y el informe los
   rescató a mano con líneas "FUERA DE LA OLLA", segundo día seguido (cinco
   el 29-09, seis hoy).** `contenido/veredictos/2026-09-30-preseleccion.md`
   los lista uno por uno (Cancillería y el Escudo de las Américas, Suseso,
   pueblo tribal afrodescendiente en la Corte IDH, Greenpeace e incendios,
   alcalde de Punta Arenas, sondeo de licencias médicas). El rescate del
   informe funcionó (los seis sonaron en el video), pero depender de que el
   informe rescate lo que la preselección descarta es depender de suerte: el
   arreglo, si el patrón sigue, es del filtro de la preselección, no del
   informe.
4. **La URL de Interferencia sigue mal formada, tercer día consecutivo
   confirmado.** Verificado directamente en `contenido/barrido/2026-09-30.md`
   líneas 80, 623 y 674: el campo URL trae un `<a href="...">Título</a>`
   completo porcentaje-codificado (`%3Ca%20href%3D%22...%3E...%3C/a%3E`) en
   vez de una URL plana, el mismo defecto que el 28 y el 29-09 con causa ya
   diagnosticada en `bitacora/2026-09-29-auditoria.md` (función `desescapar`
   de `scripts/barrido.js`, líneas 40-44, no reconoce el símbolo `<`
   porcentaje-codificado). No bloquea ni sale al aire (es un campo interno de
   trazabilidad, no llega al guion ni a "Fuentes:"), pero ya tiene propuesta
   concreta desde el 29-09 y sigue sin estar en `bitacora/PENDIENTES.md`.
5. **"Clima de carátula: grave" (línea 6 del guion) convive con un bloque de
   portada declarado `[clima]` (línea 17), tonos que el prompt define como
   opuestos.** No bloquea (la palabra queda al criterio de quien escribe) y no
   es una racha: es la segunda vez que aparece esta tensión clima/emergencia
   en las revisiones (28-09 con "Tormentas sobre zonas afectadas", hoy con el
   cierre de Los Libertadores), no tres días seguidos.
6. Marcas `PENDIENTE DE CIERRE`: no hay ninguna nueva hoy (verificado con
   búsqueda en el informe completo). La única pendiente, la variación oficial
   de precios de combustibles que dejó el informe del 29-09, vence el
   01-10-2026 y todavía no está vencida.

## Propuestas

1. **Siglas en pantalla, falla del proceso de validación (archivo
   `prompts/validador.md`, línea 157, entre "Antes de afirmar que algo falta…"
   y "Convergencia").** Agregar un punto propio: "Siglas en pantalla: revisa
   en la vuelta 1, sin excepción, cada marca `[FUENTE]` y el pie de cada
   `[DATO]` contra la regla de siglas del prompt de la pieza que estés
   validando; no dependas de notarlo por casualidad." Así deja de depender de
   que el validador se acuerde, que es lo que la propia revisión de hoy pide
   textualmente. Esto es aparte de la propuesta ya anotada del 29-09 (ampliar
   el alcance de la regla en `prompts/guion-informe.md:211-212`), que sigue
   sin aplicarse: hoy el fallo no fue de alcance, fue de que la vuelta 1 no
   revisó lo que la regla ya cubre.
2. **Tipos de tarjeta bajo cuota (archivo `prompts/informe.md`, cerca de la
   definición de pesos [A]/[B]/[C]).** Pedir explícitamente que, cuando el
   barrido traiga un indicador con dos momentos comparables (un antes y un
   después, o dos cifras de la misma unidad), el informe lo señale como tal
   en vez de dejarlo como una cifra suelta: eso es lo que le falta al guion
   para variar sin inventar. Sin propuesta de línea exacta todavía: conviene
   que la sesión de día mida sobre una semana de informes cuántas veces hay
   material comparable disponible y no se marcó como tal, antes de escribir
   la regla.
3. **URL de Interferencia (archivo `scripts/barrido.js`, función `desescapar`,
   líneas 40-44, o `parsear`, línea 94).** Repite la propuesta del 29-09: antes
   de asignar `url = campo(b, "link")`, si el valor contiene un ancla
   porcentaje-codificada (`url.includes("%3C")`), aplicar
   `decodeURIComponent(url)` y extraer el `href` real con una regex en vez de
   usar el valor completo como URL.

No hay propuesta para los puntos 3 (rescate de la preselección, un patrón de
dos días que conviene mirar una vez más antes de tocar el filtro) ni 5 (clima
de carátula, segunda vez y no tres): no alcanzan el umbral de tres días sin
cambio.

## Triage

- **HOY**: propuesta 1 (siglas, falla de proceso en `prompts/validador.md`).
  Va también en la primera línea de este archivo. Motivo: ya está publicado
  con un defecto visible en pantalla ("Confusam" y "CIPER" sin expandir) y,
  a diferencia de los días anteriores, esta vez la regla ya cubría el caso:
  lo que falló fue que la vuelta 1 no la aplicó.
- **AGUANTA**: propuesta 3 (URL de Interferencia). Molesta la trazabilidad de
  fuentes pero no bloquea ni sale al aire de forma visible; tercer día
  consecutivo con causa y arreglo concretos ya diagnosticados, y sigue sin
  bajar a `bitacora/PENDIENTES.md` pese a dos auditorías seguidas
  marcándolo AGUANTA.
- **MIRAR**: hallazgo 2 (dos tipos de tarjeta, tercer día seguido, con
  propuesta 2 arriba pero sin línea exacta todavía), hallazgo 3 (rescate de
  seis hechos "FUERA DE LA OLLA", segundo día seguido) y hallazgo 5 (tensión
  clima/emergencia en la carátula, segunda vez, no consecutiva).

## Baja a PENDIENTES

Se agregó una línea a la entrada existente de siglas en
`bitacora/PENDIENTES.md`, sección "Para la sesión de la noche (código y
prompts)" (la que empieza "23-09, HOY: expandir siglas que se pintan en
pantalla"), con la fecha de hoy y la propuesta nueva sobre
`prompts/validador.md:157`. No se creó ninguna entrada nueva:
`estrategia/decisiones.md` no registra ninguna decisión de NO tocar esto, y
`bitacora/REALIZADOS.md` no la da por cerrada. La URL de Interferencia, los
tipos de tarjeta, el rescate de la preselección y el clima de carátula quedan
en AGUANTA/MIRAR y no bajan a PENDIENTES todavía, tal como manda el contrato
para lo que no es HOY.

## Los números

`bitacora/metricas/2026-09-30.md` contra `2026-09-29.md`:

- Suscriptores: 23 (+0) hoy, contra +2 ayer. Vuelve a quedar plano.
- Vistas totales del canal: +412 hoy, contra +750 ayer y +600 antier. El
  ritmo de vistas se cortó a poco más de la mitad, primer freno después de
  tres días subiendo.
- **Retención de los videos largos (lo único que suma para las 4.000
  horas):** 29.3 horas vistas acumuladas (30 días) contra 28.0 ayer y 27.0
  antier: +1.3 h hoy, +1.0 h ayer. Sigue creciendo y hoy incluso acelera.
  La retención media ponderada bajó de 31.4% (ayer) a 30.3% (hoy), dentro
  del rango 30-36% de los últimos días: no hay tendencia que marcar todavía.
- Carátulas (30 días): 30822 impresiones (+2237) con CTR medio 1.65% (bajó de
  1.75% ayer). Sigue dentro de ruido normal.
- Los Shorts se anotan y no se celebran: sin novedad que valga la pena
  registrar aparte hoy.

## Comparación con ayer

**Mejoró:**
- El informe cerró en 1 sola vuelta de corrección (ayer también 1), y el
  guion también en 1 (ayer también 1): sin cambio en el costo de vueltas
  aguas abajo, pero la preselección de hoy necesitó su propia segunda vuelta
  por un motivo más simple (URLs cortadas) que el de ayer.
- La retención de los largos aceleró (+1.3 h contra +1.0 h ayer y +0.9 h
  antier), tercer día de crecimiento sostenido y hoy el mejor incremento de
  los tres.
- La carátula sube por tercer día seguido sin incidentes (era "segundo día"
  ayer).

**Sigue igual:**
- Las siglas sin expandir en pantalla siguen en los hallazgos por séptima
  mañana seguida, aunque hoy cambió la causa (falla de la vuelta 1 del
  validador, no hueco de la regla).
- La cadena sigue cerrando adelantada (02:51 hoy contra 02:39 ayer, ambas
  bien antes de la hora prevista).
- Dos tipos de tarjeta bajo cuota, ahora tercer día seguido (era "segundo"
  ayer).
- La URL de Interferencia sigue rota, ahora tercer día seguido (era
  "segundo" ayer) y sigue sin bajar a PENDIENTES pese a tener causa y
  arreglo concretos desde ayer.

**Nuevo hoy:**
- El rescate "FUERA DE LA OLLA" del informe repite por segunda vez seguida
  (cinco hechos ayer, seis hoy): empieza a ser un patrón de la preselección,
  no un evento aislado.
- Suscriptores y vistas totales frenaron su ritmo después de varios días
  subiendo (+0 y +412 contra +2 y +750 ayer).
- La tensión clima/emergencia en la marca de portada reaparece (era del
  28-09, sobre un bloque distinto).
