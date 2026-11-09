# Auditoría matinal, 09-11-2026

Auditada el 09-11-2026 entre las 08:36 y las 09:10 UTC (05:36 a 06:10 de
Chile), con el checkout sincronizado contra `origin/main` (`548e703f`,
"reintento: despertador 05:38 [reloj]").

ESTADO: CON OBSERVACIONES. Sin falla nueva ni dato perdido: la cadena
terminó más rápido que ayer y sin defecto publicado. HOY: "ninguna cifra
llegó verificada desde la preselección" entra a su quinta mañana seguida
(sigue sin costar un defecto publicado, porque el informe la atrapó de
nuevo, pero el diseño de fondo no cambió).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | despertador 01:40:10, barrido 01:40:35 | 01:30 (cron) | éxito, 10 min tarde | Actions "Barrido" run `42563089591`, `conclusion: success` |
| Preselección | redactada 01:52, APROBADA vuelta 0 01:57:45 | tras `barrido_listo` (01:41) | éxito, sin vueltas | `contenido/veredictos/2026-11-09-preseleccion.md` |
| Informe | redactado 02:04, CORREGIR vuelta 1 (02:15, encabezados vacíos y fuentes sin fecha) y vuelta 2 (02:24), APROBADA 02:31 | tras cada pieza | éxito, dos vueltas | `contenido/veredictos/2026-11-09-informe.md` |
| Guion del informe | redactado 02:37, CORREGIR vuelta 1 (02:46, "126" en cifras y tope de 66 caracteres), APROBADA 02:51 | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-09-guion_informe.md` |
| Revisión (compuerta) | 02:52:03, APROBADA | tras cada pieza | éxito | `contenido/revisiones/2026-11-09.md` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | `videos_listos` 02:54:41 | ~02:50 (cuadro del panel) | éxito, prácticamente en hora | Actions "Edición diaria" run `42569723288`, `conclusion: success`; `contenido/estado/2026-11-09.md` ("FALTA: nada") |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs, todos `conclusion: success` (último `42569953705`) |
| Reloj de métricas + Métricas | despertador 05:06:20, métricas 05:06:35 | 05:00 | éxito, 6 min tarde | Actions "Métricas" run `42583556908`, `conclusion: success`; `bitacora/metricas/2026-11-09.md` (creado 05:07) |
| Vigía de la cadena | sin aviso al teléfono (cadena ya completa a las 02:15 y a las 05:15) | 02:15 y 05:15 | sin novedad | `trig_01LUtn4fSJjBsCzqdoWeVviH` corrió en su horario |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14); la última es la del 05-11-2026 | cuando corresponda | sin novedad, no es hallazgo | `contenido/claves/` y `contenido/guiones/claves/`: sin archivo con fecha 2026-11-09 |
| Short del día | subido `private`, publicado `2026-11-09` (`Aiu7KWgR900`, "Curicó cerró ciento veintiséis salidas por viajes con licenc") | 12:00 | pendiente de evaluar hasta su publicación (hora de la auditoría es 05:36, antes del mediodía) | `bitacora/metricas/2026-11-09.json` |

Duración real del informe: 223 segundos (3:43), dentro de la promesa de 3 a
4 minutos (`contenido/podcast/episodios.json`, episodio del 09-11-2026, campo
`durSeg`). No hay episodio de Clave hoy, consistente con que no hubo Clave.

Validador de tarjetas: `node scripts/validar-tarjetas.js --fecha 2026-11-09`
→ "4 bloques con fuente, 468 palabras narradas (~3,5 min): cifra 2 · cambio 1
· barras 1 · esquema 1" y un AVISO: `sin línea "Carátula sugerida:"` (ver
hallazgo 2 abajo).

Marcas `PENDIENTE DE CIERRE`: ninguna vencida. `contenido/informes/2026-11-09.md`
no trae una propia, y la preselección ya verificó que el informe del
08-11-2026 tampoco la dejó (`contenido/veredictos/2026-11-09-preseleccion.md`).

## Qué falló

1. **"Ninguna cifra llegó verificada desde la preselección" entra a su
   quinta mañana seguida, aunque hoy no costó un defecto publicado.**
   `contenido/veredictos/2026-11-09-preseleccion.md`: "ninguna de las 45
   candidatas trae cifra verificada, porque esta etapa lo prohíbe." Hoy el
   informe la atrapó bien dos veces: fijó el balance del choque de Santo
   Domingo en 11 fallecidos y 15 lesionados contra las dos cifras distintas
   del barrido (`contenido/veredictos/2026-11-09-informe.md`), y nombró a la
   Superintendencia de Pensiones donde el barrido solo decía "la
   Superintendencia". No se publicó ninguna cifra sin respaldo. El patrón de
   fondo (`prompts/preseleccion.md` sigue sin declarar, candidata por
   candidata, qué no pudo verificar) no cambió desde el 07-11-2026.

2. **El aviso de "Carátula sugerida" de `scripts/validar-tarjetas.js` sigue
   sonando cada día sobre una regla que la decisión del 04-11-2026 dejó sin
   efecto para el informe, y el prompt no se actualizó.**
   `scripts/validar-tarjetas.js:70-72` exige la línea "Carátula sugerida:"
   citando "la exigen desde el 05-09" sin mirar si el video del informe está
   apagado; `contenido/estado/sin-video-informe.txt` existe desde el
   04-11-2026 y `prompts/guion-informe.md:165` dice textualmente "Desde el
   04-11-2026 no se pide carátula del día: el informe en video está
   apagado." Pero el mismo prompt, en su FORMATO DE SALIDA
   (`prompts/guion-informe.md:130-149`), todavía lista las tres líneas de
   carátula y la de "Clima de carátula" como si se pidieran. Resultado: el
   guion de hoy no las escribió (correcto, según la línea 165) y el
   validador avisó igual
   (`contenido/veredictos/2026-11-09-guion_informe.md`: "la pregunta se
   repite cada día y un aviso mecánico que nadie debe atender enseña a
   ignorar los avisos"). Es la misma observación del 08-11-2026
   (`contenido/revisiones/2026-11-08.md`) y de la revisión de hoy
   (`contenido/revisiones/2026-11-09.md`): dos revisiones seguidas gastando
   un párrafo en explicar que no es incumplimiento. Esto NO aplica a las
   Claves, que siguen rindiendo video y siguen necesitando la carátula
   (`contenido/guiones/claves/2026-11-05-rabat-rebajas-de-condena.md:3`
   la trae).

3. **El informe de hoy dejó rachas de líneas en blanco donde se borraron
   los cinco encabezados vacíos de la vuelta 1 (primera vez que se ve este
   residuo).** `contenido/informes/2026-11-09.md`, líneas 93 a 103 (once
   seguidas) y 111 a 114 (cuatro), más rachas de dos o tres en las líneas
   28, 43, 56 y 78. No llega a la web (`web/src/lib/contenido.ts:147` pasa
   el markdown por `marked.parse`, que las colapsa) ni al guion, así que no
   es un defecto publicado hoy. Se anota porque es la primera vez que una
   corrección de "borrar encabezado" deja este rastro; si vuelve a pasar
   dos o tres días más, pasa a ser un hallazgo que se repite.

Sin otras fallas nuevas: el resto de lo que anota
`contenido/revisiones/2026-11-09.md` (el conteo de la línea "Método" que no
distingue candidatas fundidas, "FUENTES CONSULTADAS" sin enlaces, el bloque
del cobre con años relativos) son precisiones de un solo día, ya señaladas
como "no bloquea" por el propio validador, y no agregan un hallazgo nuevo
con evidencia de daño hoy.

## Propuestas

1. Para el hallazgo 1: que `prompts/preseleccion.md` declare explícitamente,
   candidata por candidata, cuáles cifras no pudo verificar contra su fuente
   primaria (la misma propuesta que vive en `bitacora/PENDIENTES.md` desde
   el 07-11-2026; no se repite aquí para no duplicarla).
2. Para el hallazgo 2: en `scripts/validar-tarjetas.js`, antes de la
   comprobación de la línea 70, agregar `if (esClave || !fs.existsSync("contenido/estado/sin-video-informe.txt"))`
   alrededor del bloque 70-72 (y dejar el de 76-83 como está, que ya se salta
   para Claves), para que el aviso de "Carátula sugerida" solo corra cuando
   el video que la necesita de verdad se va a renderizar. En
   `prompts/guion-informe.md:130-149`, borrar las tres líneas de carátula y
   la de "Clima de carátula" de FORMATO DE SALIDA (o moverlas a una nota que
   diga "solo si `contenido/estado/sin-video-informe.txt` no existe"), para
   que no contradigan la línea 165 del mismo archivo.
3. Para el hallazgo 3: ninguna propuesta todavía, es una sola observación.
   Si se repite, la propuesta es que `prompts/validador.md` pida borrar
   también la línea en blanco sobrante cuando una corrección retira un
   encabezado completo.

## Triage

- **HOY**: el hallazgo 1 (cifras sin verificar desde la preselección, quinta
  mañana seguida). Baja a `bitacora/PENDIENTES.md` como continuación de la
  entrada del 07-11-2026, en este mismo commit.
- **AGUANTA**: el hallazgo 2 (aviso de "Carátula sugerida" fuera de lugar
  para el informe apagado; molesta y gasta párrafos de explicación todos los
  días, pero no bloquea ni pierde datos).
- **MIRAR**: el hallazgo 3 (líneas en blanco residuales tras borrar un
  encabezado; primera vez que se ve, no bloquea hoy, pero si se repite dos o
  tres días más pasa a ser un hallazgo que se repite sin que el prompt
  cambie).

## Comparación con ayer

- **Mejoró**: las nueve `[C]` de hoy quedaron bien, como viñetas dentro de
  "## Además, hoy" (`contenido/informes/2026-11-09.md:121-137`), a diferencia
  de los nueve encabezados `### [C]` sin ancla que se publicaron el
  08-11-2026 (`bitacora/2026-11-08-auditoria.md`, falla 1). No hay un cambio
  de código que lo explique (`prompts/validador.md` no se tocó desde ayer),
  así que el defecto de ayer no se repitió pero su causa (una corrección que
  pide corchetes sin decir dónde va la línea) sigue sin cerrarse en el
  prompt. El tope de tres cifras habladas por bloque, que había costado la
  mayoría de las correcciones tres días seguidos (06, 07 y 08-11), tampoco
  volvió a ser el problema hoy: la única corrección del guion fue por otra
  regla (números en palabras y el tope de 66 caracteres del punto 14b).
  `scripts/metricas.js` tampoco perdió ningún video hoy (comparando
  `bitacora/metricas/2026-11-08.json` contra `2026-11-09.json` por id: cero
  faltantes, y el video que faltaba el 08-11 volvió solo), aunque el arreglo
  del PR #8 sigue sin fusionar.
- **Sigue igual**: las cifras sin verificar desde la preselección (ahora
  quinta mañana, ver hallazgo 1); el aviso de "Carátula sugerida" sin
  sentido para el informe apagado (cuarta vez documentada en una revisión:
  04, 08 y 09-11, más la de hoy); el PR #8 de métricas sigue abierto y sin
  fusionar (`state: open`, `merged: false`, sin cambios desde el 06-11-2026).
  La cadena volvió a terminar bien antes de lo que esperaba el estado (02:54
  contra el cuadro de 02:50, prácticamente en hora, como ayer).
- **Nuevo**: el residuo de líneas en blanco tras borrar un encabezado
  (hallazgo 3); los suscriptores subieron a 53 (+3), tercer día seguido de
  alza después de seis días planos (48 el 03 al 07-11, 50 el 08-11, 53 hoy),
  y las vistas totales subieron +433, el mejor día de la semana.
