ESTADO: CON FALLAS — el informe de hoy lleva más de 3 horas atascado esperando su corrección (GPT no responde, segunda noche seguida sin él) y `reintento.yml` volvió a no disparar ni una vez en su ventana, tercer día seguido

Auditada el 26-09-2026 desde las 05:37 de Chile, checkout sincronizado contra
`origin/main` (`0c6eda8`, "métricas 2026-09-26 [bot]"). Horas reales de
`git log` con `TZ=America/Santiago` fijado explícitamente, de
`mcp__github__actions_list` sobre `estado.yml`, `edicion-diaria.yml` y
`reintento.yml`, y de `contenido/estado/2026-09-26.md`/`.json` (vista que
calcula el propio repo).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada | Quién la escribió | Estado |
|---|---|---|---|---|
| Barrido | 01:41 (`0905a74`) | 01:40 | Actions · barrido.yml | ok, a horario |
| Preselección | 02:03 (`6122d35`) | 02:10 | **Claude, a mano** ("segunda noche sin GPT") | producida, antes de lo esperado |
| Veredicto preselección | 02:10 (`3eefa01`) | — | Claude · validador | APROBADA vuelta 0 |
| Informe | 02:08 (`2faa0ee`) | 02:40 | **Claude, a mano** ("segunda noche sin GPT") | producido, antes de lo esperado |
| Guion del informe | 02:13 (`b2301f6`) | 03:10 | **Claude, a mano** | producido, antes de lo esperado |
| Carátula | 02:13 (`bfa6c569`, `contenido/caratulas/2026-09-26-NO-PUDE.md`) | — | — | **no se pudo generar** (sin generador de imágenes en el entorno de recuperación), sigue con la de respaldo |
| Veredicto informe | 02:25 (`f2c9319`) | — | Claude · validador | **CORREGIR, vuelta 1** (5 correcciones, todas menores) |
| Reparación del informe (vuelta 1) | **no llegó** | poco después de 02:25 | GPT (despachador) | **atascada +3h12 a esta hora** |
| Revisión (veredicto final) | no llegó | 03:30 | Claude · validador | falta (bloqueada) |
| Banco de temas de la Clave | no llegó | 04:00 | GPT · prompts/banco-temas.md | sin alimentar (bloqueado) |
| Videos y descripciones | no llegó | 05:15 | Actions · edicion-diaria.yml | falta (bloqueado; el propio workflow se salta el render porque `contenido/revisiones/2026-09-26.md` no existe, línea 120 de `edicion-diaria.yml`) |
| Métricas | 05:15 (`0c6eda8`) | 05:00 | Actions · metricas.yml | ok, +15 min, bajo el umbral de 20 |

Tabla cruzada con `contenido/estado/2026-09-26.md` (ETAPA: `reparar_informe`,
VUELTA: 1, ACTUALIZADO: 02:26 Chile) y con `mcp__github__actions_list`.

## Qué falló

**1. GPT no escribió una sola pieza esta madrugada — segunda noche seguida.**
Los tres commits de preselección, informe y guion del informe llevan
literalmente en el cuerpo "Tarea: recuperación a mano de la edición del
26-09-2026, segunda noche sin GPT" (autor Claude Opus 5, sesión
`session_01DLpwxAZS4q3pexq9GBPVY4`). El mismo patrón exacto que ayer
(`bitacora/2026-09-25-auditoria.md`: "la cadena de hoy se congeló en la
preselección, GPT no respondió"), pero hoy la sesión de reparación no esperó
a que la cadena se congelara: escribió las tres piezas ella misma, sin
navegación, verificando cifras contra el barrido. La carátula no pudo
seguir el mismo camino porque el entorno de esa sesión no tiene generador
de imágenes (`contenido/caratulas/2026-09-26-NO-PUDE.md`, también segunda
vez seguida) — no bloquea, sigue con la carátula de respaldo, pero es la
misma ausencia por segundo día.

**2. La corrección del informe (vuelta 1) lleva 3h12 sin que nadie la haga.**
`contenido/veredictos/2026-09-26-informe.md` pide 5 correcciones menores
(dos citas sin nombre propio, tres referencias temporales relativas sin
fecha absoluta) a las 02:25:58 Chile. `contenido/estado/2026-09-26.md`
sigue en `ETAPA: reparar_informe`, `REPARA: GPT (despachador)`, sin cambios
desde esa hora — verificado con `git log --since` sobre todo el repo: entre
las 02:26 y las 05:37 solo hubo dos commits, el propio aviso de estado
(`a352158`) y las métricas de rutina (`0c6eda8`, `b160d91`). A diferencia de
la preselección y el informe originales, esta vez la sesión que reparó a
mano NO volvió a intervenir para aplicar la corrección: el "segunda noche
sin GPT" cubrió la escritura inicial, pero no el ciclo de corrección
posterior, que sigue dependiendo 100% de GPT.

**3. `reintento.yml` volvió a no disparar ni una vez en su ventana —
tercer día seguido, y hoy sí importa.** `mcp__github__actions_list` sobre
`reintento.yml`: su última corrida fue ayer `2026-09-25T14:37:20Z`, muy
fuera de la ventana `04:00-09:59 UTC`. Son las 08:37 UTC de hoy (05:37
Chile), más de 4 horas y media dentro de la ventana, con la etapa activa
(`reparar_informe`) siendo exactamente el caso de GPT atascado para el que
existe el workflow (el aviso de las 02:26 Chile / 05:26 UTC ya lleva más de
25 minutos, así que debió reintentar). Cero corridas. Es la misma falla que
`bitacora/2026-09-24-auditoria.md` marcó `AGUANTA` y
`bitacora/2026-09-25-auditoria.md` subió a `HOY` sin que se implementara
todavía (`bitacora/PENDIENTES.md`, sección "Para la sesión de la noche",
entrada del 25-09 sigue sin marca de hecho). Hoy es la tercera confirmación
del mismo patrón y, a diferencia de ayer, el bloqueo actual (corrección del
informe) es precisamente el tipo de caso que este workflow debía resolver
solo.

**4. El banco de temas de la Clave lleva 3 días sin alimentarse (24, 25 y
26-09), y en TODO su historial de git no existe un solo commit con el
patrón `"banco de temas FECHA"` que pide `prompts/banco-temas.md` (ni
siquiera uno vacío, que el propio prompt exige cuando no hay temas nuevos).**
`git log --all --oneline --grep="banco de temas"` no devuelve nada. El
único commit que ha tocado `contenido/claves/banco-temas.md` en toda la
historia del repo es `401c221` (25-09-2026, "reparación 2026-09-25"), que lo
**recreó entero desde cero** (99 líneas con fechas de 2026-08-25 al
2026-09-24) como parte de la reparación de esa madrugada — no fue el
proceso `alimentar_banco` corriendo, fue un respaldo manual con contenido
histórico. No hay entradas con fecha 2026-09-25 ni 2026-09-26 en el archivo
(verificado con `grep`). Los tres días donde faltó coinciden con los tres
días en que la cadena estuvo rota antes de llegar a esa etapa, así que hoy
no puedo afirmar que sea un bug propio de `alimentar_banco` y no solo una
consecuencia — pero tampoco hay evidencia de que el paso haya funcionado
alguna vez de punta a punta.

**Sin fallas nuevas en la calidad del contenido ya escrito.**
`node scripts/validar-tarjetas.js --fecha 2026-09-26` no tiene avisos
("variedad OK: ninguna cuota rota, ninguna marca malformada"). Las 5
correcciones del veredicto del informe son de forma (citas sin nombre,
fechas relativas), no de contenido inventado, y el propio veredicto declara
autoverificación completa de las 63 fuentes citadas y cobertura 1:1 de las
57 candidatas de la olla. No hay `contenido/revisiones/2026-09-26.md` que
comparar contra los tres días anteriores (bloqueado); queda pendiente para
cuando exista.

## Propuestas

1. **Ahora mismo**: revisar el estado de la tarea "Despachador Entender
   Chile" en ChatGPT (¿respondió y quedó sin push? ¿se cayó el conector?
   ¿se agotó cuota?) y, si sigue sin responder, aplicar a mano las 5
   correcciones de `contenido/veredictos/2026-09-26-informe.md` sobre
   `contenido/informes/2026-09-26.md` y arrastrarlas al guion — el mismo
   camino que ya se usó dos veces esta madrugada para preselección, informe
   y guion. Cada hora que pasa achica el margen antes de la hora de
   publicación (~06:30 Chile, según `scripts/youtube-subir.js
   --programar 07:30` menos el margen que ya se comió la corrección).
2. En `.github/workflows/reintento.yml`, agregar el despertador propio que
   ya proponía `bitacora/PENDIENTES.md` (sección "Para la sesión de la
   noche", entrada del 25-09): una rutina de Claude que toque un archivo
   (p. ej. `contenido/estado/despertador-reintento.txt`) y pushee cada 20
   minutos en la ventana 01:00-07:00 Chile, con un `on: push` sobre esa ruta
   que dispare el mismo cuerpo del job, igual que ya hacen `barrido.yml`,
   `metricas.yml` y `guardia.yml`. Con tres días seguidos de cero corridas
   por cron nativo, depender de GitHub para esto ya no es sostenible.
3. Cuando la corrección de hoy quede resuelta (por GPT o a mano), agregar a
   `prompts/informe.md` o a `prompts/README.md` una nota explícita de que el
   ciclo `reparar_*` necesita el mismo respaldo manual que la escritura
   inicial cuando GPT lleva más de N minutos sin responder — hoy la sesión
   que reparó a mano no supo (o no le tocaba) seguir cubriendo la vuelta de
   corrección, y por eso el atasco de 3+ horas ocurrió con una solución de
   5 líneas ya escrita y esperando.
4. Verificar con Santiago si `alimentar_banco` ha corrido alguna vez de
   punta a punta: si el próximo día que la cadena llegue completa y a
   horario tampoco deja un commit `"banco de temas FECHA"`, ahí sí es un bug
   propio de `prompts/banco-temas.md` o de su disparo en `estado.yml`, no
   una consecuencia de la cadena rota.

## Triage

- **HOY**: la reparación del informe atascada +3h (propuesta 1). Bloquea la
  publicación de hoy si nadie interviene ahora.
- **HOY**: `reintento.yml` sin disparar por tercer día seguido (propuesta
  2), porque hoy el caso que debía cubrir es real y está activo mientras
  escribo esto.
- **AGUANTA**: nota en `prompts/informe.md`/`README.md` sobre cubrir también
  el ciclo `reparar_*` a mano (propuesta 3). No urge hasta que se resuelva
  el atasco de hoy.
- **MIRAR**: banco de temas sin alimentar 3 días seguidos (propuesta 4). Es
  tendencia, no bug confirmado — falta un día con cadena limpia para saberlo.
- **MIRAR**: carátula sin generador por segundo día seguido. No bloquea (hay
  respaldo), pero si sigue así se acumula material de carátula sin usar
  (`contenido/guiones/informe/2026-09-26.md` ya trae tres opciones listas).

## Comparación con ayer

**Mejoró:** ayer (25-09) la cadena se congeló por completo en la
preselección y nada se produjo hasta la intervención manual del mediodía;
hoy la misma ausencia de GPT ("segunda noche sin GPT", dicho literalmente en
los commits) no dejó la madrugada en blanco — preselección, informe y guion
quedaron escritos y hasta antes de sus horas esperadas, sin esperar a que
`reintento.yml` (que otra vez no corrió) hiciera algo.

**Sigue igual:** `reintento.yml` lleva tres mañanas seguidas (24, 25, 26-09)
con cero corridas dentro de su ventana de cron nativo — la propuesta para
arreglarlo de fondo sigue en `bitacora/PENDIENTES.md` sin marca de hecha. El
banco de temas sigue sin alimentarse, van tres días.

**Es nuevo:** por primera vez el punto donde falta cobertura no es la
escritura inicial (ya la cubre la recuperación a mano) sino el ciclo de
corrección `reparar_*`: hoy hay una pieza con defectos ya identificados y
una solución de 5 líneas escrita, y aun así lleva 3 horas sin aplicarse
porque nadie —ni GPT, ni una sesión de repuesto— la tomó. Es un hueco
distinto al de ayer, no el mismo repetido.
