# Auditoría matinal, 06-11-2026

Auditada el 06-11-2026 entre las 05:33 y las 05:55 de Chile, con el checkout
sincronizado contra `origin/main` (`afb78c0`, "reintento: despertador 05:13
[reloj]").

ESTADO: CON FALLAS. HOY: dos videos públicos con vistas y comentarios reales
(`FVu5s1yBu7Q`, "¿Qué cambió en Chile a siete años del estallido social?
#Sho", 169 vistas; `nvG_C4evsL8`, "¿Quién fue Patricio Guzmán..." 314 vistas)
desaparecieron por completo de la lista de subidas que trajo YouTube entre
las métricas del 05-11 y las de hoy, sin que exista en el repo ningún
comando ni commit que los haya tocado. La cadena editorial en sí corrió
limpia y dentro de lo esperado, salvo el atraso ya conocido de la cuota de
Claude en el reloj del barrido (cuarta vez documentada, sin HOY nuevo porque
ya está escalado a Santiago desde el 16-10).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | 02:37 | 01:30 (cron), ~01:40 histórico | éxito, **67 min tarde** | commits `c1292c6` "reintento: despertador 02:37 [reloj]" y `a2f98e8` "barrido 2026-11-06 [bot]"; `get_trigger(trig_01W5KEjHbr5wWPsmmJ4ygNEh)`: `last_run.status: ROUTINE_RUN_STATUS_FAILED`, `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`, disparada 04:39:54 UTC (01:39:54 Chile); Actions "Barrido" run `42169521407`, `conclusion: success` (el que sí corrió, por `workflow_dispatch` de `reintento.yml`) |
| Preselección | redactada 02:46, veredicto 02:52 | tras `barrido_listo` | APROBADA vuelta 0, sin corrección | `contenido/veredictos/2026-11-06-preseleccion.md`; commit `f8f52bc` |
| Informe | redactado 02:57 (vuelta 0), CORREGIR 03:09 (vuelta 1), redactado de nuevo 03:11, APROBADA 03:15 | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-06-informe.md` |
| Guion del informe | redactado 03:19 (vuelta 0), CORREGIR 03:29 (vuelta 1), redactado de nuevo 03:31, APROBADA 03:34 (vuelta 1 real) | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-06-guion_informe.md` |
| Revisión (compuerta) | 03:35, APROBADA vuelta 1 | tras cada pieza | éxito | `contenido/revisiones/2026-11-06.md`; commit `cbdac51` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | arrancó 03:35:07 (push de la revisión), `videos_listos` 03:37:52 | ~02:50 (cuadro del panel) | éxito, **45 min tarde**, arrastrado por el barrido | Actions "Edición diaria" run `42175362566`, `conclusion: success`; commits `06a1af3`, `743327f`, `7dc95b0`, `0037e0d` |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs `42175625677`, `42175362784`, `42172892595`, `42171432484`, todos `conclusion: success` |
| Reloj de métricas + Métricas | 05:06 a 05:07 | 05:00 | éxito, 6-7 min tarde | commits `dcd7878` "despertador métricas 2026-11-06 [reloj]" y `5a7fab3` "métricas 2026-11-06 [bot]"; Actions "Métricas" run `42185314513`, `conclusion: success` |
| Vigía de la cadena | 02:15 y 05:15 Chile | 02:15 y 05:15 | la corrida de las 05:15 `SUCCEEDED`; `get_trigger` solo entrega la última corrida del día, así que no hay evidencia accesible desde este checkout de qué avisó la corrida de las 02:15, que cayó con el barrido todavía 45 min atrasado | `get_trigger(trig_01LUtn4fSJjBsCzqdoWeVviH)`: `last_run` fired 05:15:59 Chile, `ROUTINE_RUN_STATUS_SUCCEEDED` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14) | cuando corresponda | sin novedad, no es hallazgo | listado de `contenido/claves/` y `contenido/guiones/claves/`: sin archivo con fecha 2026-11-06 |
| Short del día | subido, en `private` a la hora de esta auditoría (sube a las 12:00) | 12:00 | pendiente de evaluar hasta su publicación | `bitacora/metricas/2026-11-06.json`: `BuS_1zid38M`, "Codelco registró cobre no producido y activó bonos mientras…", `estado: private`, publicado `2026-11-06` |

Duración real del informe: 217 segundos (3:37), dentro de la promesa de 3 a
4 minutos (`contenido/podcast/episodios.json`, episodio del 06-11-2026).
Validador de tarjetas: `node scripts/validar-tarjetas.js --fecha 2026-11-06`
→ "4 bloques con fuente, 460 palabras narradas (~3,4 min): cifra 4 · cambio 1
· comparación 1 · esquema 1" y "variedad OK: ninguna cuota rota, ninguna
marca malformada." Sin avisos.

## Qué falló

1. **El Reloj del barrido (`trig_01W5KEjHbr5wWPsmmJ4ygNEh`, 01:30 Chile)
   falló por cuota agotada** (`ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`,
   verificado directo con `get_trigger`, no inferido) y el barrido real no
   corrió hasta las 02:37, disparado por el reintento de uno de los relojes
   de 20 minutos (`reintento.yml`). Son 67 minutos sobre el cron y entre 56 y
   57 minutos más tarde que el patrón de los últimos días (01:40 a 01:41).
   Arrastró a toda la cadena, pero ninguna pieza perdió calidad por eso: la
   Edición diaria arrancó 45 minutos tarde y aun así cerró con
   `videos_listos` a las 03:37:52. Es la cuarta vez documentada que la
   cuota de Claude frena un reloj de la madrugada (14 y 15-10, 05-11 y hoy);
   ya está escalado a Santiago desde el 16-10 en `bitacora/PENDIENTES.md`,
   sección DEPENDEN DE SANTIAGO, con una propuesta concreta (workflow de
   GitHub Actions con cron propio que abra un issue si no hay video) todavía
   sin el sí de Santiago.

2. **Dos videos públicos con historial real desaparecieron de la lista de
   subidas que trae la API de YouTube entre la corrida de métricas del
   05-11 (18:24 UTC de ese día) y la de hoy (08:06 UTC).** Comparando
   `bitacora/metricas/2026-11-05.json` contra `bitacora/metricas/2026-11-06.json`
   campo por campo (no por título, que trunca a 60 caracteres y puede
   colisionar): el id `FVu5s1yBu7Q` ("¿Qué cambió en Chile a siete años del
   estallido social? #Sho", Short, publicado 2026-10-18, 169 vistas, 6 me
   gusta, 3 comentarios) y el id `nvG_C4evsL8` ("¿Quién fue Patricio Guzmán,
   el documentalista que despide Ch", publicado 2026-09-15, 314 vistas, 10
   me gusta) estaban en la lista de ayer con estado `public` y hoy no
   aparecen en absoluto, ni como `private` ni como `public`. La aritmética
   cuadra sola: ayer 227 videos listados y 219 públicos; hoy 226 y 218; la
   diferencia es exactamente estos dos que se van, el video nuevo de hoy
   (`BuS_1zid38M`, `private`) que entra, y un tercero (`HIEPv3KzCE4`) que
   pasó de `private` a `public` al cumplirse su hora programada, sin
   sorpresa. Nada en el repo (ningún commit, ningún archivo en
   `contenido/estado/` o `bitacora/`) registra que alguien haya bajado,
   borrado o tocado esos dos videos. No hay secrets de YouTube en este
   checkout para volver a consultarlos directo; la evidencia es la que
   trajo el propio paso de Métricas de esta madrugada.

3. **"Ninguna cifra llegó verificada desde la preselección" se repite por
   segundo día seguido.** `contenido/revisiones/2026-11-05.md` ("Datos sin
   verificar contra la fuente primaria... ninguna de las 57 candidatas vino
   verificada") y `contenido/revisiones/2026-11-06.md` ("Ninguna cifra llegó
   verificada desde la preselección") dicen lo mismo con las cifras del día.
   No llega a los tres días que marca la regla de "revisa y no aprende",
   pero es la segunda vez y conviene mirarlo.

Sin otras fallas: el resto de los hallazgos de `contenido/revisiones/2026-11-06.md`
(la candidata de los pórticos sin región, dos historias que no se
retomaron, el nombre del superintendente de Pensiones sin confirmar, la
carátula 3 sin nombrar Codelco, la fuente de Paraguay con un solo medio) son
precisiones editoriales de un solo día, ninguna repetida, y ya están
escritas donde corresponde.

## Propuestas

1. Para la falla 1: ninguna propuesta nueva. La propuesta ya existe y sigue
   esperando el sí de Santiago (`bitacora/PENDIENTES.md`, sección DEPENDEN
   DE SANTIAGO, entrada del 16-10: workflow de GitHub Actions con cron
   propio, ajeno a la cuota de Claude, que abra un issue si a una hora fija
   no existe el video del día).
2. Para la falla 2: que Santiago revise en YouTube Studio, Contenido, los
   dos IDs `FVu5s1yBu7Q` y `nvG_C4evsL8` (buscarlos por URL
   `youtube.com/watch?v=<id>`): si Studio los muestra borrados, eliminados
   por copyright o por una infracción de las normas de la comunidad, es una
   alerta de cuenta y no un error de script; si Studio SÍ los muestra
   activos, el problema está en la lectura de la API del propio
   `scripts/metricas.js` (línea 48, paginación de `playlistItems.list`) y
   hay que revisar ahí antes de que la próxima corrida pise el dato bueno
   con uno incompleto.
3. Para la falla 3: si aparece una tercera vez, subirlo a HOY y proponer que
   `prompts/preseleccion.md` declare explícitamente qué candidatas no pudo
   verificar contra su fuente primaria, en vez de dejar que el informe las
   confirme solo.

## Triage

- **HOY**: la falla 2 (los dos videos desaparecidos de YouTube). Baja a
  `bitacora/PENDIENTES.md` en este mismo commit.
- **AGUANTA**: ninguna nueva hoy.
- **MIRAR**: la falla 3 (cifras sin verificar, segundo día seguido).

## Comparación con ayer

- **Mejoró**: nada que destacar; la cadena de validación corrió con el
  mismo patrón de una vuelta por pieza que el 04 y el 05-11, sin nuevas
  correcciones mecánicas.
- **Sigue igual**: la cuota de Claude sigue atrasando el reloj del barrido
  (cuarta vez en tres semanas, sin resolución porque la propuesta sigue sin
  el sí de Santiago); los 48 suscriptores no se mueven desde el 03-11
  (cuarto día plano), aunque es pronto para juzgar si el cambio de fórmula
  del Short del 05-11 (`bitacora/REALIZADOS.md`, entrada del 05-11) movió
  algo; las cifras institucionales sin verificar desde la preselección se
  repiten por segundo día.
- **Nuevo**: la desaparición de dos videos públicos de la lista de subidas
  del canal. No hay antecedente de esto en ninguna auditoría anterior.
