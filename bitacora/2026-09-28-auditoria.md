ESTADO: CON OBSERVACIONES — la cadena de la madrugada corrió completa, sin
fallas técnicas (todas las corridas de GitHub Actions sobre `main` de hoy,
`conclusion: success`, verificado con `mcp__github__actions_list`) y por
delante del horario en cada eslabón (compuerta cerrada a las 02:36 de Chile,
casi una hora antes de la prevista de las 03:30). No hay `HOY`: lo único que
se repite es un hallazgo de forma ya anotado desde el 23-09 y que hoy
cambió de superficie (ahora también en titulares), y tres hallazgos nuevos
de un solo día que van a MIRAR.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (`contenido/estado/2026-09-28.md`) | Nota |
|---|---|---|---|
| Barrido | 01:40 (reloj) → 01:40 (workflow, API confirma `conclusion: success`) | 01:40 | en punto |
| Preselección (GPT + validación) | aprobada, vuelta 1 | 02:10 | `contenido/veredictos/2026-09-28-preseleccion.md` |
| Informe (GPT + validación) | aprobado 02:02, vuelta 1 | 02:40 | sin corrección |
| Guion del informe (GPT + validación) | aprobado 02:35, vuelta 2 | 03:10 | 1 vuelta de corrección, ver abajo |
| Revisión (compuerta, `contenido/revisiones/2026-09-28.md`) | 02:36 | 03:30 | VEREDICTO: APROBADA |
| Edición diaria (voz, render, subida) | `videos_listos` 03:15 (API: push 02:36 → completado 03:29) | 05:15 | adelantada, sin incidentes |
| Carátula | subió, `contenido/caratulas/2026-09-28.png` | tras el guion | tercer día con carátula nueva tras dos `NO-PUDE` (25 y 26-09) |
| Podcast (`contenido/podcast/episodios.json`) | 601 s = 10:01 min, episodio del informe | "~10 min, 12-13 en día cargado" | dentro de la promesa, dato medido del json, no estimado |
| Métricas | reloj 05:16 → workflow 05:17 | 05:00 | 16-17 min de margen, dentro de tolerancia |
| Clave | no corrió | — | correcto: CLAVE 4 no es diaria, hoy no es domingo |

La única vuelta de corrección del día fue del guion del informe
(`contenido/veredictos/2026-09-28-guion_informe.md`, VUELTA: 2): la tercera
carátula repetía el giro de la segunda en vez de aportar un tercer enfoque
distinto, y se corrigió en la vuelta siguiente. Preselección e informe
cerraron a la primera.

## Qué falló

Sin fallas técnicas. `node scripts/validar-tarjetas.js --fecha 2026-09-28`
no dejó avisos (variedad OK, cuota de tipos de tarjeta cumplida). Los puntos
siguientes son de calidad editorial, ninguno bloqueó la publicación:

1. **Siglas sin expandir, ahora en los titulares — sexto día con la misma
   observación.** `contenido/revisiones/2026-09-28.md` marca "PARA
   SANTIAGO": SAG y CONAF se pintan sin expandir en el titular de la línea
   118 del guion (`contenido/guiones/informe/2026-09-28.md`). No bloqueó
   porque, según la propia revisión, la regla de siglas de
   `prompts/guion-informe.md` (agregada el 23-09) rige para las marcas
   `[FUENTE]` y el pie de los `[DATO]`, no para los titulares, así que un
   titular no incumple la letra del prompt aunque sí se pinta en pantalla.
   Es el mismo hallazgo que lleva desde el 23-09 en
   `bitacora/PENDIENTES.md` (línea 705), pero hoy aparece en una superficie
   nueva que la corrección del 23-09 no cubría.

2. **La URL de la candidata de Interferencia sigue mal formada, y hoy esa
   noticia salió al aire.** `contenido/barrido/2026-09-28.md:743` trae
   `https://interferencia.cl/%3Ca%20href%3D%22/articulos/ministra-lincolao...`,
   un ancla HTML codificada en vez de un enlace, y la noticia de la
   ministra Lincolao entró como titular del informe de hoy
   (`contenido/revisiones/2026-09-28.md`, hallazgos). Primer día que se
   anota en las revisiones (no aparece en 25, 26 ni 27-09), así que no es
   todavía el patrón de tres días que obliga a proponer un arreglo de
   código: queda a MIRAR si se repite.

3. **El rastro del descarte de la preselección trae catorce líneas que
   describen segundas entradas de noticias que sí entraron a la cadena.**
   No bloquea (lo dice la propia revisión), pero ensucia la evidencia que
   distingue un descarte deliberado de un punto ciego. Primer día que se
   anota.

4. **"Dato curioso" ausente, segundo día seguido.** Ni el informe ni el
   guion de hoy la traen; tampoco la de ayer. No es incumplimiento (el
   guion no debe inventar la sección si el informe no la trae), pero es una
   de las pocas secciones de color del canal.

## Propuestas

1. **Siglas en titulares (archivo: `prompts/guion-informe.md`, la regla de
   siglas agregada el 23-09, la misma que ya cubre `[FUENTE]` y `[DATO]`).**
   Extender la regla para que alcance también a las marcas de titular en
   pantalla, no solo a `[FUENTE]` y el pie de `[DATO]`; o, como la propia
   revisión de hoy lo plantea, cerrar de una vez la lista de exentas para
   que la validación deje de tener que decidir caso a caso. Esta es la
   propuesta que ya está en `bitacora/PENDIENTES.md` desde el 23-09: hoy
   solo se le agrega el conteo y la superficie nueva, sin duplicarla.

2. **URL de Interferencia (archivo: por confirmar; el candidato es el
   parser RSS de `scripts/barrido.js`, la fuente `interferencia` en
   `contenido/barrido/fuentes.json:31-34`).** Si se repite un segundo día,
   revisar si el `<link>` del feed `https://interferencia.cl/rss.xml` trae
   la entidad HTML sin decodificar y si el parser de `scripts/barrido.js`
   necesita un paso de `decodeURIComponent`/limpieza de anclas para esa
   fuente. Hoy no alcanza el umbral de tres días para bajarlo como tarea.

No hay propuesta para el punto 3 ni el 4: son de un solo día, no ameritan
tocar código todavía.

## Triage

- **HOY**: ninguno.
- **AGUANTA**: hallazgo 1 (siglas en titulares). Ya estaba en
  `bitacora/PENDIENTES.md` desde el 23-09; se le agregó la línea de hoy
  (sexto día, ver abajo) sin duplicar la entrada. Sigue sin bloquear la
  edición, pero la propia revisión ya lo plantea como una decisión que no
  puede seguir postergándose: si mañana se repite una séptima vez, sube a
  `HOY`.
- **MIRAR**: hallazgos 2, 3 y 4. Ninguno tiene todavía un segundo día
  registrado; se vuelven a mirar mañana antes de proponer nada.

## Baja a PENDIENTES

Se agregó una línea a la entrada existente de siglas
(`bitacora/PENDIENTES.md`, sección "Para la sesión de la noche", la que
empieza "23-09, HOY: expandir siglas que se pintan en pantalla"), dejando
constancia de que hoy es el sexto día seguido y que el defecto ya alcanzó
los titulares, no solo `[FUENTE]`/`[DATO]`. No se creó ninguna entrada
nueva: los otros tres hallazgos son de un solo día.

## Los números

`bitacora/metricas/2026-09-28.md` contra `2026-09-27.md`:

- Suscriptores: 21 (+0) hoy, contra +1 los dos días previos. Plano, no es
  una caída, solo no sumó.
- Vistas totales del canal: +574 hoy, +523 ayer, +476 antes de ayer. Sigue
  creciendo el ritmo de vistas tres días seguidos.
- **Retención de los videos largos (lo único que suma para las 4.000
  horas):** 27.0 horas vistas acumuladas (30 días) contra 26.1 ayer y 25.1
  antier: +0.9 h cada uno de los últimos dos días, crecimiento sostenido.
  La retención media ponderada bajó de 35.8% (ayer) a 32.4% (hoy), pero
  venía de 31.6% antier: sube y baja dentro de un rango normal, no hay
  tendencia que marcar todavía.
- Los Shorts se anotan y no se celebran: sin novedad que valga la pena
  registrar aparte hoy.

## Comparación con ayer

**Mejoró:**
- Cero vueltas de corrección en preselección e informe (ayer también
  cerraron limpios, pero el guion de ayer se corrigió en una vuelta y hoy
  en dos, así que en ese punto empató, no mejoró).
- La cadena cerró a las 02:36, más temprano que las 02:48-02:51 de ayer.
- La carátula subió por segundo día seguido tras los dos `NO-PUDE`
  consecutivos del 25 y 26-09.

**Sigue igual:**
- Las siglas sin expandir en pantalla, ahora en su sexto día (ayer,
  quinto).
- La retención de los largos sigue subiendo al mismo ritmo que los últimos
  dos días (+0.9 h).

**Nuevo hoy:**
- La superficie del hallazgo de siglas se movió de las tarjetas
  (`[FUENTE]`/`[DATO]`) a los titulares, que la regla del 23-09 no cubre.
- Los tres hallazgos de un solo día: la URL rota de Interferencia que salió
  al aire, el rastro del descarte con líneas de ruido, y la ausencia de
  "Dato curioso" el segundo día seguido.
