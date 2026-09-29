ESTADO: CON OBSERVACIONES — la cadena corrió sin fallas técnicas, con `conclusion:
success` en Barrido, Edición diaria, Métricas y Web (verificado con
`mcp__github__actions_list`), y adelantada al horario en cada eslabón (compuerta
cerrada a las 02:39, casi una hora antes de la prevista de las 03:30). Hay un
`HOY`: las siglas sin expandir en pantalla llegan hoy a una tercera superficie
distinta ([ESQUEMA], con "Fogape") después de las marcas [FUENTE]/[DATO] y los
titulares, y la auditoría de ayer (`bitacora/2026-09-28-auditoria.md`) ya dejó
dicho que una repetición más subía el hallazgo a HOY.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (`contenido/estado/2026-09-29.md`) | Nota |
|---|---|---|---|
| Barrido | 01:41 (API: `conclusion: success`, `run_started_at` 04:40 UTC) | 01:40 | en punto |
| Preselección (GPT + validación) | aprobada 01:53, vuelta 2 | 02:10 | 1 vuelta de corrección |
| Informe (GPT + validación) | aprobado 02:04 (veredicto 02:13), vuelta 1 | 02:40 | sin corrección |
| Guion del informe (GPT + validación) | aprobado 02:23 (veredicto 02:32), vuelta 1 | 03:10 | sin corrección |
| Revisión (compuerta, `contenido/revisiones/2026-09-29.md`) | 02:39 | 03:30 | VEREDICTO: APROBADA |
| Edición diaria (voz, render, subida) | `videos_listos` (API: push 05:39 UTC → completado 06:20 UTC = 02:39→03:20 Chile) | 05:15 | adelantada, sin incidentes |
| Carátula | subió, `contenido/caratulas/2026-09-29.jpg`, verificada entera con `scripts/imagen-entera.js` (lo dice la revisión) | tras el guion | segundo día seguido con carátula sana |
| Podcast (`contenido/podcast/episodios.json`) | 669 s = 11:09 min, episodio del informe | "~10 min, 12-13 en día cargado" | dentro de la promesa, dato medido del json |
| Métricas | reloj y workflow 08:15-08:16 UTC = 05:15 Chile | 05:00 | 15 min de margen, dentro de tolerancia |
| Clave | no corrió | — | correcto: CLAVE 4 no es diaria; no es domingo, no toca `semana/` |

Único costo de vueltas: la preselección necesitó una corrección (vuelta 2). El
informe y el guion cerraron a la primera. Ningún atraso pasa los 20 minutos
contra lo esperado; todo llegó antes.

## Qué falló

Sin fallas técnicas: las cuatro corridas de Actions de hoy sobre `main`
(Barrido run 90, Edición diaria runs 149-151, Métricas run 90, Web runs
239-241) tienen `conclusion: success`. `node scripts/validar-tarjetas.js
--fecha 2026-09-29` dejó un solo aviso, no bloqueante: "edición con 11 bloques
de noticia y ninguna barras/tabla/comparacion" (cuota de variedad, cifra:3 ·
esquema:2 · cambio:1). Los puntos siguientes son de calidad editorial y
ninguno detuvo la publicación:

1. **Siglas sin expandir en pantalla, tercera superficie distinta y sin
   corregir desde el 21-09.** `contenido/revisiones/2026-09-29.md` (hallazgos,
   primer punto "PARA SANTIAGO"): "Fogape" queda sin expandir dentro de un
   `[ESQUEMA]` de `contenido/guiones/informe/2026-09-29.md`, una línea antes
   de que la narración sí diga "Fondo de Garantía para Pequeños
   Empresarios". Verificado en `prompts/guion-informe.md:211-217`: la regla
   de siglas que se agregó el 23-09 dice textualmente "toda sigla que se
   PINTE EN PANTALLA **(en esta marca o en el pie de un [DATO])**", una
   restricción explícita a las marcas `[FUENTE]` y `[DATO]`. El checklist
   del mismo prompt, ítem 17b (línea 273), en cambio dice "Ninguna sigla se
   pinta en pantalla sin haber sido expandida antes", sin esa restricción:
   las dos líneas del mismo archivo no dicen lo mismo, y la validación se
   queda con la más estrecha. Esto ya pasó con titulares el 28-09
   (`contenido/revisiones/2026-09-28.md`, SAG y CONAF en la línea 118 del
   guion) y con SEC/Senapred/DW el 27-09. El hallazgo entero está anotado en
   `bitacora/PENDIENTES.md` desde el 23-09 (línea 780) y la propia auditoría
   de ayer fijó el umbral: "si mañana se repite una séptima vez, sube a
   HOY".

2. **La URL de la candidata de Interferencia sigue mal formada, segundo día
   consecutivo confirmado en la revisión final.** Verificado directamente en
   `contenido/barrido/2026-09-29.md:659` y `:755`: el campo URL trae
   `https://interferencia.cl/%3Ca%20href%3D%22/articulos/...%3C/a%3E`, es
   decir, un `<a href="...">Título</a>` completo con sus símbolos
   porcentaje-codificados (`%3C`=`<`, `%3D`=`=`, `%3E`=`>`) en vez de una URL
   plana. `contenido/revisiones/2026-09-29.md` lo repite ("sigue rota... es
   la quinta vez") y ya estaba en `contenido/revisiones/2026-09-28.md`. Con
   dos días seguidos confirmados en la revisión final (28 y 29-09), se
   cumple la condición que la auditoría de ayer puso para investigar el
   origen: revisé `scripts/barrido.js` y la causa es concreta. La función
   `desescapar` (línea 40-44) decodifica entidades HTML (`&lt;`, `&gt;`...) y
   recién después quita etiquetas con `.replace(/<[^>]+>/g, "")`; pero el
   feed de Interferencia no manda entidades HTML sino el símbolo `<`
   porcentaje-codificado (`%3C`), que ninguna de las dos reglas reconoce
   porque no es ni una entidad ni una etiqueta literal. `campo(b, "link")`
   en la línea 94 le aplica `desescapar` igual que a cualquier campo de
   texto, así que el resultado queda con el ancla entera adentro de la URL.

3. **"Dato curioso" ausente, tercer día seguido (27, 28 y 29-09).**
   `contenido/revisiones/2026-09-29.md` lo confirma como tercer día. Ni el
   informe ni el guion inventaron la sección, que es lo correcto cuando no
   hay material, pero es una de las pocas secciones de color del canal y
   lleva tres días apagada sin que ningún prompt la pida de forma explícita.

4. **La edición volvió a quedar con solo dos tipos de tarjeta (cifra y
   cambio), bajo la cuota de variedad, segundo día seguido (28 y 29-09).**
   No es incumplimiento: el prompt pone el árbol de tipos por encima de la
   cuota y hoy los dos valores de la única `comparacion` candidata no
   compartían unidad. Coincide con el aviso del validador de tarjetas citado
   arriba.

5. **La olla de la preselección bajó a 38 candidatas**, dentro del rango
   35-60 pero la más baja de la semana (57 el 26-09, 60 el 27-09, 53 el
   28-09, 38 hoy), con un barrido de 280 noticias con señal. No bloquea.

6. **Marcas `PENDIENTE DE CIERRE`**: la de ayer ("contenido definitivo y
   costo fiscal del plan laboral de emergencia", vencía 28-09) quedó cerrada
   por el propio informe de hoy ("El anuncio cierra la deuda dejada por la
   edición anterior", `contenido/informes/2026-09-29.md:17`). La nueva marca
   de hoy ("variación oficial de precios de combustibles", vence 01-10) no
   está vencida todavía.

## Propuestas

1. **Siglas en pantalla (archivo `prompts/guion-informe.md`, líneas
   211-212).** Cambiar "toda sigla que se PINTE EN PANTALLA (en esta marca o
   en el pie de un [DATO])" por una formulación sin esa restricción, por
   ejemplo "toda sigla que se pinte en pantalla, en cualquier marca del
   guion (titulares, [TESIS], [ESQUEMA], [FUENTE], pie de [DATO], etc.)",
   para que la regla quede igual de ancha que el checklist 17b (línea 273),
   que ya no tiene la restricción y es la que de hecho describe lo que
   Santiago pide. Así deja de depender de en qué marca caiga la sigla del
   día.

2. **URL de Interferencia (archivo `scripts/barrido.js`, función `parsear`,
   línea 94, o la propia `desescapar`, líneas 40-44).** Antes de asignar
   `url = campo(b, "link")`, si el valor contiene un ancla porcentaje
   codificada (patrón `/%3Ca(%20|\s)/i` o, más simple, `url.includes("%3C")`),
   aplicar `decodeURIComponent(url)` y extraer el `href` real con una regex
   (`/href%3D%22([^%"]+)/i` sobre el valor crudo, o sobre el decodificado
   `/href="([^"]+)"/i`) en vez de usar el valor completo como URL.

3. **Dato curioso (archivo `prompts/informe.md`).** Pedir explícitamente que
   el informe declare si hay o no hay material para "Dato curioso" ese día,
   en vez de dejar la sección implícita; así se distingue "no hay dato hoy"
   de "nadie la miró".

No hay propuesta para los puntos 4, 5 y 6: son de forma, no bloquean y no
alcanzan el umbral de tres días sin cambio (4 lleva dos, 5 es una cifra
suelta, 6 ya se cerró sola).

## Triage

- **HOY**: propuesta 1 (siglas en pantalla). Va también en la primera línea
  de este archivo. Motivo: ya está publicado con un defecto visible en
  pantalla ("Fogape" sin expandir) y la propia auditoría de ayer fijó que una
  repetición más subía el hallazgo a HOY; hoy se repitió en una tercera
  superficie.
- **AGUANTA**: propuesta 2 (URL de Interferencia). Molesta la trazabilidad de
  fuentes pero no bloquea ni sale al aire de forma visible; ya tiene causa y
  arreglo concretos, va a la lista de la noche siguiente.
- **MIRAR**: hallazgo 3 (dato curioso, tercer día, sin propuesta de código
  todavía porque conviene ver si un solo prompt lo resuelve), hallazgo 4
  (dos tipos de tarjeta, segundo día) y hallazgo 5 (la olla en su punto más
  bajo de la semana, a ver si sigue bajando mañana).

## Baja a PENDIENTES

Se agregó una línea a la entrada existente de siglas en
`bitacora/PENDIENTES.md`, sección "Para la sesión de la noche (código y
prompts)" (la que empieza "23-09, HOY: expandir siglas que se pintan en
pantalla"), con la fecha de hoy, la tercera superficie ([ESQUEMA]) y la
propuesta concreta de la línea 211-212. No se creó ninguna entrada nueva:
`estrategia/decisiones.md` no registra ninguna decisión de NO tocar esto, y
`bitacora/REALIZADOS.md` no la da por cerrada. La URL de Interferencia y el
dato curioso quedan en AGUANTA/MIRAR y no bajan a PENDIENTES todavía, tal
como manda el contrato para lo que no es HOY.

## Los números

`bitacora/metricas/2026-09-29.md` contra `2026-09-28.md`:

- Suscriptores: 23 (+2) hoy, contra +0 ayer y +1 los dos días previos.
  Recupera el ritmo.
- Vistas totales del canal: +600 hoy, +574 ayer, +523 antier. Sigue creciendo
  el ritmo de vistas, tercer día seguido.
- **Retención de los videos largos (lo único que suma para las 4.000
  horas):** 28.0 horas vistas acumuladas (30 días) contra 27.0 ayer y 26.1
  antier: +1.0 h hoy, +0.9 h los dos días previos. Crecimiento sostenido, al
  mismo ritmo. La retención media ponderada bajó de 32.4% (ayer) a 31.4%
  (hoy), que sigue dentro del rango 31-36% de los últimos tres días: no hay
  tendencia que marcar.
- Los Shorts se anotan y no se celebran: sin novedad que valga la pena
  registrar aparte hoy.

## Comparación con ayer

**Mejoró:**
- Suscriptores volvieron a sumar (+2) después de un día plano.
- La carátula subió por tercer día seguido sin incidentes.
- El informe cerró su propia marca `PENDIENTE DE CIERRE` de ayer en vez de
  dejarla vencer.

**Sigue igual:**
- Las siglas sin expandir en pantalla, ahora con tres superficies distintas
  en tres días seguidos (titular el 28-09, [ESQUEMA] hoy): es la razón de que
  hoy suba a HOY, como ya avisaba la auditoría de ayer.
- La cadena sigue cerrando adelantada (02:39 hoy contra 02:36 ayer, ambas
  casi una hora antes de la hora prevista).
- La retención de los largos sube al mismo ritmo que los dos días previos
  (+1.0 h contra +0.9 h y +0.9 h).
- Dos tipos de tarjeta bajo cuota, segundo día seguido (ayer también).

**Nuevo hoy:**
- La URL de Interferencia confirmó su segundo día seguido en la revisión
  final, lo que activó la investigación de causa: es `scripts/barrido.js`,
  con propuesta concreta de arreglo.
- "Dato curioso" llega a su tercer día ausente.
- La olla de la preselección tocó su mínimo de la semana (38 candidatas).
