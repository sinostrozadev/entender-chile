ESTADO: CON OBSERVACIONES — HOY: la carátula de hoy se generó bien y se
perdió igual, porque el conector de esa ejecución no admite binarios y la
ruta queda en un scratch que se borra.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Nota |
|---|---|---|---|
| Barrido | 01:40 (reloj) → 01:40 (workflow) | 01:30 | 10 min de margen, dentro de tolerancia |
| Preselección (GPT) | aprobada antes de las 02:01 | ~01:35 en adelante | veredicto vuelta 1; su propia corrección no queda en el historial de hoy (ver nota abajo) |
| Observatorio plata pública | 02:01 | 01:45 | dos casos movidos (ProCultura, Maipú), ocho sin novedad |
| Informe (GPT + validación) | aprobado 02:24 (vuelta 2) | poco después de la preselección | 2 vueltas: CORREGIR a las 02:09 y a las 02:19 |
| Guion del informe (GPT + validación) | aprobado 02:51 (vuelta 1) | — | 1 vuelta: CORREGIR a las 02:38 |
| Carátula | NO llegó (ver Qué falló) | tras el guion (02:27) | generada, no subida |
| Revisión (compuerta) | 02:51, cierre efectivo 02:48 según su propio texto | antes de las 03:30 | VEREDICTO: APROBADA |
| Edición diaria (voz, render, subida) | dispara 02:52 → `videos_listos` 03:27 | ~04:00 | adelantada, sin incidentes |
| Podcast y descripciones | 03:20–03:26 | tras el render | ok |
| Web | republicada 03:27 | tras la revisión | ok |
| Métricas | reloj 05:15, workflow 05:15 | 05:00 | mismo margen que ayer (05-09-26 también fue 05:15); no es un atraso nuevo |
| Semana 39, candidatos de la Clave | ya en el repo (domingo) | — | `contenido/claves/semana/2026-W39-candidatos.md` existe, semana 21 al 26-09 |

Nota sobre horas: la historia de git de esta mañana antes de las 02:01
Chile quedó comprimida en un solo commit muy grande (`abe130f`, con cientos
de archivos), así que no pude sacar de ahí la hora exacta de la
preselección ni de su propia vuelta de corrección; la referencia confiable
de esta madrugada es la secuencia de commits del validador y de
`estado.yml` desde las 02:01, que sí es consistente minuto a minuto, y la
API de GitHub Actions para el Barrido. No es un hallazgo de la cadena, es
una limitante de esta auditoría puntual.

La Clave no corrió hoy (domingo), y con razón: CLAVE 4 no es diaria. No hay
entrega sin guion que reportar.

## Qué falló

1. **La carátula del 27-09 se generó y se perdió.** El conector de la
   ejecución que la generó solo escribe texto UTF-8, no admite subir el PNG,
   y la imagen quedó en `/workspace/scratch/3b1551457c46/generated_images/
   exec-0721fc9f-3416-44d6-a26c-21c8e115aa7e.png`, una ruta que no
   sobrevive. Evidencia: `contenido/caratulas/2026-09-27-NO-PUDE.md`. Es
   distinto del 25 y 26-09 (`contenido/caratulas/2026-09-25-NO-PUDE.md` y
   `2026-09-26-NO-PUDE.md`: ahí no había generador en el entorno); hoy sí
   generó y aun así se perdió. La propia revisión del día
   (`contenido/revisiones/2026-09-27.md`) lo marca "PARA SANTIAGO" y dice
   que es la segunda cosa del día que se detiene por el mismo motivo. La
   edición siguió con la carátula de respaldo, como manda el prompt, así
   que no bloqueó el video de hoy.

2. **Siglas en pantalla sin expandir, quinto día con la misma observación.**
   SEC, Senapred y DW se pintan en el pie de las tarjetas antes de que la
   narración las traduzca (`contenido/revisiones/2026-09-27.md`). El 26-09
   ya era "cuarto día seguido" (`contenido/revisiones/2026-09-26.md`), y
   viene desde el 21-09 según `contenido/revisiones/2026-09-23.md`. La
   regla que se agregó a `prompts/guion-informe.md` el 23-09 cubrió el caso
   de "DMC" pero no un mecanismo general: nuevas siglas siguen entrando sin
   expandir.

3. **El volumen de titulares llegó a un máximo nuevo.** 45 titulares sobre
   48 noticias `[C]` son el 27% de las palabras narradas, sobre el 23% que
   el 02-09-2026 motivó el tope de doce palabras por titular
   (`contenido/revisiones/2026-09-27.md`). El guion ya comprime al máximo
   permitido; el problema está aguas arriba, en el volumen de la olla.

4. **Dos reglas de uso estable sin escribir, tres días repitiéndose.** El
   prompt no dice dónde cae la marca "EN SEGUIMIENTO" cuando una historia
   con dossier no se desarrolla ese día, ni cuál es el orden real de las
   secciones del informe con "Plata pública" incluida
   (`contenido/revisiones/2026-09-27.md`, "PARA SANTIAGO"). Ninguna de las
   dos se cuenta como incumplimiento porque el uso ya es estable, y por eso
   mismo corresponde escribirlas.

5. **Detalles menores del informe, no bloqueantes**, que el validador ya
   señaló para cuando se retoque la pieza: la autoverificación interna
   declara una escala de empleo que ya no está en el cuerpo y un cierre de
   cautela "no consumido" que sí se consumió, la línea 137 cita el mismo
   medio dos veces ("Ex-Ante, Ex-ante"), y hay medios grafiados de dos
   formas entre el cuerpo y la lista de fuentes ("El Mostrador" / "elmostrador.cl",
   "SoyChile" / "SoyChile.cl", "Radio Universidad de Chile" / "Radio U. de Chile").

## Propuestas

1. **Carátula (archivo: `prompts/guion-informe.md`, sección "LA IMAGEN DE
   LA CARÁTULA", paso 4, línea ~168).** Agregar un tercer camino además de
   "generador topado o falla": si el conector de la sesión no admite
   escribir binarios, codificar el PNG en base64 y dejarlo en
   `contenido/caratulas/FECHA.png.b64` (texto plano, lo acepta cualquier
   conector), con un paso nuevo en `scripts/dia.js` o en
   `edicion-diaria.yml` que lo decodifique antes de armar
   `miniatura-3.png`. Decisión de fondo pendiente: qué conector o tipo de
   sesión conviene usar para esta tarea.

2. **Siglas (archivo: `prompts/guion-informe.md`, la regla del 23-09 sobre
   siglas en pantalla).** Cambiar de "expandir DMC" a una regla general:
   toda sigla en una marca que se pinta en pantalla va expandida la primera
   vez, salvo una lista explícita de exentas (agregar ahí SEC, Senapred y
   DW si el uso ya las hace corrientes, o dejar que la regla general las
   cubra).

3. **Titulares (archivo: `prompts/seleccion.md` o `prompts/informe.md`,
   donde se cuenta o agrupa la olla).** Agregar una regla que agrupe los
   `[C]` equivalentes (por ejemplo varios recortes regionales del mismo
   temporal) en una sola entrada antes de que lleguen al guion, en vez de
   dejar decenas de líneas sueltas que después hay que comprimir a la
   fuerza en el guion.

4. **EN SEGUIMIENTO y orden de secciones (archivo: `prompts/informe.md`,
   junto a la definición de "EN SEGUIMIENTO" y junto a la lista de
   secciones).** Escribir las dos reglas que el uso ya fijó: dónde cae la
   marca cuando la historia no se desarrolla ese día, y el orden real de
   las secciones incluyendo "Plata pública".

## Triage

- **HOY**: propuesta 1 (carátula). Se pierde un archivo ya generado cada
  vez que pasa, y ya lleva tres mañanas sin carátula nueva por motivos
  distintos cada vez. Bajada a `bitacora/PENDIENTES.md`, sección "Dependen
  de Santiago", con la decisión de arquitectura que hace falta.
- **AGUANTA**: propuestas 2, 3 y 5. Molestan y cuestan vueltas de revisión,
  pero no rompen la edición de mañana ni se publican como defecto visible.
  La de siglas (propuesta 2) ya estaba en `bitacora/PENDIENTES.md` desde el
  23-09; se le agregó una línea con el conteo de hoy (quinto día), sin
  duplicar la entrada.
- **MIRAR**: propuesta 4. Es una tendencia (documentación que no alcanza a
  escribirse) más que un problema hoy; si sigue sin decidirse varios días
  más, sube a AGUANTA.

## Comparación con ayer

**Mejoró:**
- Se restableció la separación de manos: GPT escribió las tres piezas y
  Claude solo validó. Ayer, con GPT caído por tercer día, la misma sesión
  escribía las reparaciones y firmaba los veredictos.
- La cadena cerró a tiempo (02:48–02:51, antes de las 03:30 previstas).
  Ayer cerró pasadas las 14:00 por la caída de GPT.
- Retención real de los videos largos subió: 25.1 → 26.1 horas vistas (30
  días), retención media ponderada 31.6% → 35.4%.

**Sigue igual:**
- La carátula sigue sin subir, tercer día consecutivo (aunque hoy cambió la
  causa: antes no había generador, hoy el conector no admite el binario).
- Las siglas sin expandir en pantalla, ahora en su quinto día.

**Nuevo hoy:**
- El volumen de titulares llegó a su porcentaje más alto registrado (27%
  de las palabras narradas), por encima del umbral que en 02-09 motivó el
  tope de doce palabras.
- La sesión de noche/día construyó y probó un rediseño grande del flujo de
  la Clave (pauta antes de GPT, con aprobación de Santiago primero, y una
  Bandeja de avisos nueva). No toca la cadena diaria y no lo audito en
  detalle porque no es su alcance, pero queda registrado en
  `bitacora/2026-09-27.md` para quien retome el hilo.
