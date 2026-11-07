# Auditoría matinal, 07-11-2026

Auditada el 07-11-2026 entre las 05:33 y las 05:39 de Chile, con el checkout
sincronizado contra `origin/main` (`3613d43`, "reintento: despertador 05:12
[reloj]").

ESTADO: CON FALLAS. HOY: "ninguna cifra llegó verificada desde la
preselección" se repite por tercer día seguido (05, 06 y 07-11-2026) y hoy
costó un defecto publicado: el 8% de reajuste en las tarifas de transporte
quedó en el informe sin respaldo verificable en el repo.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | despertador 01:39:41, barrido 01:40 | 01:30 (cron), ~01:31 histórico | éxito, 9 a 10 min tarde, sin falla de cuota (primera vez en cinco días) | `get_trigger(trig_01W5KEjHbr5wWPsmmJ4ygNEh)`: `last_run.status: ROUTINE_RUN_STATUS_SUCCEEDED`; Actions "Barrido" run `42339443301`, `conclusion: success`; commit "despertador 2026-11-07 [reloj]" |
| Preselección | redactada 01:50, veredicto 01:55 | tras `barrido_listo` | éxito, APROBADA vuelta 0, sin corrección | `contenido/veredictos/2026-11-07-preseleccion.md` |
| Informe | redactado 02:01 (vuelta 0), CORREGIR 02:09 (vuelta 1), de nuevo 02:12, CORREGIR 02:17 (vuelta 2), de nuevo 02:18, APROBADA 02:21 | tras cada pieza | éxito, dos vueltas | `contenido/veredictos/2026-11-07-informe.md` |
| Guion del informe | redactado 02:24 (vuelta 0), CORREGIR 02:31 (vuelta 1), de nuevo 02:35, APROBADA 02:40 | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-07-guion_informe.md` |
| Revisión (compuerta) | 02:41, APROBADA vuelta 2 | tras cada pieza | éxito | `contenido/revisiones/2026-11-07.md` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | arrancó 02:41:09 (push de la revisión), `videos_listos` 02:44 | ~02:50 (cuadro del panel) | éxito, adelantada, sin arrastre | Actions "Edición diaria" run `42343773687`, `conclusion: success`; `contenido/estado/2026-11-07.md`: "FALTA: nada, el día está completo" |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs `42343952153`, `42343773678`, `42342143816`, `42341710814`, `42340943725`, todos `conclusion: success` |
| Reloj de métricas + Métricas | despertador 05:04:51, métricas 05:05 | 05:00 | éxito, 4 a 5 min tarde | Actions "Métricas" run `42353926626`, `conclusion: success`; commit "despertador métricas 2026-11-07 [reloj]" |
| Vigía de la cadena | 02:15 y 05:15 Chile | 02:15 y 05:15 | la corrida de las 05:15 `SUCCEEDED` y no notificó (solo avisa si algo está atrasado) | `get_trigger(trig_01LUtn4fSJjBsCzqdoWeVviH)`: `last_run` fired 05:15:31 Chile, `ROUTINE_RUN_STATUS_SUCCEEDED` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14); la última es la del 05-11-2026 | cuando corresponda | sin novedad, no es hallazgo | listado de `contenido/claves/` y `contenido/guiones/claves/`: sin archivo con fecha 2026-11-07 |
| Short del día | subido en `private` a la hora de esta auditoría (sube a las 12:00) | 12:00 | pendiente de evaluar hasta su publicación | `bitacora/metricas/2026-11-07.json`: `zbMQDyBa3iI`, "Paraguay destituyó a Santiago Peña después de la caída de Ue", `estado: private`, publicado `2026-11-07` |

Duración real del informe: 218 segundos (3:38), dentro de la promesa de 3 a 4
minutos (`contenido/podcast/episodios.json`, episodio del 07-11-2026). No hay
episodio de Clave hoy, consistente con que no hubo Clave.

Validador de tarjetas: `node scripts/validar-tarjetas.js --fecha 2026-11-07`
→ "4 bloques con fuente, 467 palabras narradas (~3,5 min): cifra 2 ·
comparacion 1 · barras 1 · esquema 1" y "variedad OK: ninguna cuota rota,
ninguna marca malformada." Sin avisos.

Marcas `PENDIENTE DE CIERRE`: ninguna en `contenido/informes/2026-11-07.md`
(buscado explícitamente, cero coincidencias).

## Qué falló

1. **"Ninguna cifra llegó verificada desde la preselección" se repite por
   tercer día seguido** (`contenido/revisiones/2026-11-05.md`: "ninguna de
   las 57 candidatas vino verificada"; `contenido/revisiones/2026-11-06.md`:
   "Ninguna cifra llegó verificada desde la preselección";
   `contenido/revisiones/2026-11-07.md`: la misma frase, aplicada hoy al IPC
   de octubre, los 37 grados de la alerta de calor, las 2.136 expulsiones de
   2026 y las 115 rebajas que cifra Interferencia). Hoy el patrón costó algo
   concreto: la revisión de hoy marca que "el reajuste de 8% en las tarifas
   de transporte que el informe agregó en su línea 68 no viene de la
   entrada: la preselección trae esa candidata solo como el acuerdo tras
   siete días de movilización (...) la cifra sigue en el informe publicado
   sin respaldo verificable dentro del repo", además de un nombre de pila y
   un sector preciso que la línea 72 del informe agrega sin que la entrada
   los traiga. Es exactamente el hallazgo "revisa y no aprende" que señaló
   la auditoría del 06-11: tres mañanas con la misma frase y nada en el
   prompt cambió entre medio.

2. **La variante "sigla contra el tope de seis palabras" de `[FUENTE]`
   volvió a aparecer, y la propia revisión de hoy ya la cuenta como
   tercera vez.** `contenido/revisiones/2026-11-07.md`: "'ABC Color/EFE' se
   pinta en el [FUENTE] del guion sin que EFE quede expandida antes (...)
   Es el tercer día con el mismo choque (CIPER el 04-11-2026, la misma
   cadena el 06-11-2026): el tope de seis palabras de esas marcas no deja
   expandirla. Es material para la definición del prompt, no de la pieza."
   Verificado contra `contenido/guiones/informe/2026-11-04.md:9,17` ("vía
   CIPER") y `contenido/guiones/informe/2026-11-06.md:10,19,31` ("vía
   CIPER"). No bloqueó ninguna vuelta (el propio veredicto no lo cobró como
   corrección) y es la misma familia de problema que ya vive en
   `bitacora/PENDIENTES.md` desde el 23-09-2026 bajo "expandir siglas que se
   pintan en pantalla", con su variante de tope de seis palabras documentada
   el 21-10 y el 23-10.

3. **`scripts/metricas.js` volvió a perder un video de la medición, novena
   vez documentada.** Comparando `bitacora/metricas/2026-11-06.json` contra
   `bitacora/metricas/2026-11-07.json` campo por campo por id (no por
   título): hoy falta `GJMefzqOaqk` ("¿Cómo funciona la regla fiscal y el
   balance estructural?", público, 32 vistas, presente ayer). La aritmética
   confirma que no está borrado: `canal.videos` (de `channels.list`, que no
   cuenta videos borrados ni privados) se mantuvo en 221 los dos días,
   mientras que los públicos medidos subieron de 219 a 220, uno por debajo
   de lo que el canal declara, el mismo patrón que la entrada del 27-10
   documenta siete veces en octubre y una octava el 06-11. Buena noticia
   aparte: los dos videos que la auditoría del 06-11 marcó como
   desaparecidos (`FVu5s1yBu7Q`, `nvG_C4evsL8`) volvieron solos hoy, con sus
   vistas y comentarios intactos, confirmando que tampoco eran un borrado
   sino el mismo problema de paginación. El arreglo (PR #8,
   "Mejora 2026-11-06: métricas que avisan cuando la API no devuelve un
   video") sigue abierto y sin fusionar: `mcp__github__pull_request_read`
   sobre el PR 8 lo muestra `state: open`, `merged: false`.

Sin otras fallas: el resto de los hallazgos de
`contenido/revisiones/2026-11-07.md` (la reclasificación de Ciencia y
tecnología, el seguimiento de Venezuela sin novedad hoy, los enlaces de
Google News en vez de la URL directa, los nombres propios de sección fuera
de la lista del prompt, la segunda fuente derivada del IPC, la fecha del
hecho de Paraguay que se perdió del guion, el bloque corto del IPC, la
redacción vaga de los depósitos de Ueno Bank y la Carátula 2 sin nombrar
Paraguay) son precisiones editoriales de un solo día, ninguna repetida hoy
por primera vez, y ya están escritas donde corresponde.

## Propuestas

1. Para la falla 1: que `prompts/preseleccion.md` declare explícitamente,
   candidata por candidata, cuáles cifras no pudo verificar contra su fuente
   primaria (un campo o una marca por candidata), en vez de dejar que el
   informe las confirme solo. Es la propuesta que la auditoría del 06-11 ya
   anunció para esta tercera vez.
2. Para la falla 2: en `prompts/guion-informe.md`, decidir una de dos
   salidas para cuando una sigla y el tope de seis palabras de `[FUENTE]`
   chocan: (a) permitir una segunda línea solo para el pie de fuente, o
   (b) definir una lista de siglas de agencia exentas de expandirse (EFE,
   AP, Reuters) además de las que ya salva el prompt. La propia revisión de
   hoy ya dice que no se arregla en la pieza.
3. Para la falla 3: ninguna propuesta nueva, el arreglo ya existe. Fusionar
   el PR #8 y verificar la corrida real de Métricas de mañana a las 05:00,
   que es la prueba que al PR le falta.

## Triage

- **HOY**: la falla 1 (cifras sin verificar, tercer día, con un defecto ya
  publicado). Baja a `bitacora/PENDIENTES.md` en este mismo commit.
- **AGUANTA**: la falla 2 (siglas contra el tope de seis palabras) y la
  falla 3 (metricas.js pierde un video); las dos ya están en
  `bitacora/PENDIENTES.md` desde antes y se les agrega la continuación de
  hoy, sin duplicar la entrada.
- **MIRAR**: ninguna nueva hoy.

## Comparación con ayer

- **Mejoró**: el reloj del barrido corrió sin la falla de cuota que lo venía
  frenando hace cinco días seguidos (14 y 15-10, 05 y 06-11): hoy
  `get_trigger` devuelve `ROUTINE_RUN_STATUS_SUCCEEDED` limpio. La edición
  diaria también se adelantó al cuadro (`videos_listos` a las 02:44 contra
  ~02:50 esperado) en vez de arrastrar atraso como ayer.
- **Sigue igual**: las cifras sin verificar desde la preselección (ahora
  tercer día, escalado a HOY); los 48 suscriptores no se mueven desde el
  03-11 (quinto día plano); la variante de siglas contra el tope de seis
  palabras (tercera vez con la misma forma); `scripts/metricas.js` sigue
  perdiendo un video por corrida con el PR #8 todavía sin fusionar.
- **Nuevo**: ninguna falla nueva hoy, las tres son continuaciones de
  patrones ya escritos en auditorías anteriores.
