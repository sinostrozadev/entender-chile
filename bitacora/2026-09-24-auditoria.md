ESTADO: CON FALLAS — la cadena de hoy nunca arrancó (barrido en 0, todo lo demás detrás)

Auditada el 24-09-2026 desde las 05:30 de Chile, checkout sincronizado contra
`origin/main` (`fb2feed`, "métricas 2026-09-24 [bot]"). Horas reales de
`git log` con `TZ=America/Santiago` fijado explícitamente y de
`mcp__github__actions_list` sobre los workflows del día. El checkout es un
clon superficial (`git rev-parse --is-shallow-repository` → `true`, 50
commits, desde 2026-09-23 17:15 UTC en adelante): alcanza de sobra para
cubrir toda la ventana de hoy (01:30-05:33 Chile), así que las horas de
commit de esta auditoría son confiables.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada | Estado |
|---|---|---|---|
| Barrido | no llegó | 01:40 | **falta, +233 min** a las 05:33 |
| Preselección | no llegó | 02:10 | **falta, +203 min** |
| Informe | no llegó | 02:40 | **falta, +173 min** |
| Guion del informe | no llegó | 03:10 | **falta, +143 min** |
| Revisión (veredicto final) | no llegó | 03:30 | **falta, +123 min** |
| Banco de temas de la Clave | no llegó | 04:00 | **sin alimentar, +93 min** |
| Edición diaria (videos) | no llegó | 05:15 | **falta, +18 min** |
| Métricas | 05:15 (commit `fb2feed`, 08:15 UTC) | 05:00 | ok, +15 min, bajo el umbral de 20 |
| Observatorio plata pública | 01:50 (commit `ab1a0a5`, 04:50 UTC) | 01:45 | ok, +5 min |

Tabla y minutos de atraso tomados de `node scripts/estado.js --solo-leer`
corrido en esta misma sesión (ETAPA: `nuevo_dia`, VUELTA: 0, FECHA:
2026-09-24), que es la vista calculada por el propio repo a partir de qué
archivos existen — no una estimación mía.

## Qué falló

**El despertador del barrido corrió a horario pero no escribió nada.** La
rutina Claude (Haiku, `trig_01W5KE`, toca `contenido/barrido/despertador.txt`
y pushea) generó el commit `98abc93` a las 2026-09-24 04:40:16 UTC (≈01:40
Chile, dentro del margen normal) con el mensaje "despertador 2026-09-24
[reloj]" — pero el commit **no tiene ningún archivo cambiado**
(`git show --stat 98abc93` no lista diffs). El archivo
`contenido/barrido/despertador.txt` sigue con el contenido
`2026-09-23 04:40:45 UTC`: la marca de AYER, exactamente 24 horas menos 29
segundos más vieja que el commit de hoy. Como `barrido.yml` dispara por
push sobre ese path exacto (`.github/workflows/barrido.yml:16`) y el commit
no tocó el archivo, el push no cumplió el filtro y el workflow nunca se
disparó. Comparar con los otros dos despertadores de hoy, que sí
escribieron su marca correctamente: `bitacora/metricas/despertador.txt` →
`2026-09-24 08:14:49 UTC` y `contenido/urgente/despertador.txt` →
`2026-09-24T01:15:23Z`. Solo el del barrido quedó vacío.

**Las dos redes de respaldo tampoco dispararon ni una sola vez hoy.**
Confirmado con `mcp__github__actions_list` (`list_workflow_runs`), no
listando ausencia por no encontrarla en el repo sino consultando la fuente
de verdad de GitHub directamente:
- `barrido.yml` tiene sus crons de respaldo en `50 4 * * *` y `20 5 * * *`
  UTC (`.github/workflows/barrido.yml:23-24`, 01:50 y 02:20 Chile). La
  última ejecución del workflow es la #74, `2026-09-23T10:05:24Z` — de
  AYER. Cero corridas hoy, ni por cron ni por push.
- `reintento.yml` corre cada 20 min entre las 04:00 y las 09:59 UTC. Su
  última ejecución es la #3, `2026-09-23T14:04:26Z` — también de ayer. A
  las 08:31 UTC de hoy (más de 4 horas dentro de su propia ventana) no ha
  corrido ni una vez.

Los dos workflows están `state: "active"` (no deshabilitados). Esto es
consistente con la decisión de infraestructura del 31-08
(`estrategia/decisiones.md`, sección "El cron de GitHub no se usa como
reloj principal"): el cron de GitHub ya estaba documentado como no
confiable (10 a 12 horas de atraso medidas entonces, algún día que no corrió
nunca) y por eso quedó solo como red, con el despertador de Claude como
reloj principal. Hoy falló exactamente el reloj principal — que se supone
puntual al minuto — y la red de respaldo, que ya sabíamos que podía no
llegar, efectivamente no llegó.

**Gap adicional encontrado en el reintento**: aunque `reintento.yml`
hubiera corrido hoy, no habría arreglado nada, porque su primer chequeo
(`.github/workflows/reintento.yml:53-54`) exige que ya exista
`contenido/estado/$FECHA.md` para actuar, y ese archivo solo lo escribe
`estado.yml` después de que algo (el barrido) haya puesto una pieza en
main. El reintento está diseñado para "GPT no responde" (la etapa ya
está en marcha) y no cubre el caso de hoy: "el barrido nunca arrancó, no
hay ni estado que mirar".

**Consecuencia**: sin barrido no hay preselección, informe, guion,
revisión ni edición diaria. No hay video del informe de hoy, no hay
avance de la Clave, no hay entrada nueva al banco de temas. Es la primera
vez que se marca esta falla puntual (despertador del barrido con commit
vacío); no hay antecedente en `PENDIENTES.md`, `REALIZADOS.md` ni
`estrategia/decisiones.md`.

## Propuestas

1. **HOY, urgente**: volver a tocar `contenido/barrido/despertador.txt` con
   la hora actual y pushear (a mano o re-disparando la rutina
   `trig_01W5KE`), o disparar `barrido.yml` por `workflow_dispatch`
   directamente, para que la cadena arranque hoy aunque sea tarde. Cada
   hora que pasa achica el margen antes de la hora de publicación del
   informe (06:30 Chile) y del resto de la cadena.
2. En `.github/workflows/reintento.yml`, antes de la línea 53 (donde exige
   `contenido/estado/$FECHA.md`), agregar un chequeo previo: si son más de
   las ~02:00 Chile y no existe `contenido/barrido/$FECHA.md` ni el estado
   del día, y `contenido/barrido/despertador.txt` no trae la fecha de hoy,
   reescribir ese archivo con la marca de tiempo actual y pushear (la
   misma receta de "rutina toca un despertador y el push dispara el
   workflow" que ya usan barrido, métricas y guardia). Así la red de
   respaldo cubre también la falla de hoy, no solo "GPT no responde".
3. Para el despertador de Claude del barrido específicamente: aplicar la
   escritura verificada que ya exige `prompts/contrato-archivos.md`
   ("ESCRITURA VERIFICADA") — después de escribir la marca, releerla desde
   main y confirmar que cambió respecto a la de ayer antes de dar la
   rutina por cumplida; si no cambió, reintentar. Hoy no hay forma de saber
   por qué el commit salió vacío (la rutina no tiene prompt vivo en el
   repo, a diferencia de `prompts/guardia-reloj.md`); esto ya estaba
   anotado como pendiente en `bitacora/PENDIENTES.md` ("aplicar el mismo
   patrón prompt-vivo a las demás rutinas... barrido... cuando toque
   editarlas") — la falla de hoy es motivo para adelantarlo.

## Triage

- **HOY**: propuesta 1 (retocar el despertador o disparar `barrido.yml` a
  mano) — rompe la edición de hoy completa si no se hace ya; ya está en la
  primera línea de este archivo.
- **AGUANTA**: propuesta 2 (ampliar `reintento.yml` para cubrir la falla
  del despertador del barrido) — la máquina puede seguir operando mañana
  con vigilancia manual mientras se construye.
- **MIRAR**: propuesta 3 (prompt vivo + escritura verificada para el
  despertador del barrido) — no es un problema todavía si la propuesta 2
  se construye primero; se vuelve más urgente si el commit vacío se repite
  un segundo día.

## Comparación con ayer

Ayer (23-09) la cadena completa corrió y publicó, con dos defectos menores
ya conocidos (sigla DMC sin expandir, cierre de cautela repetido — ambos
con corrección de prompt aplicada anoche, `f4de3d9`/commits de carátula
del 24-09 antes de las 00:30, a verificar recién en la próxima madrugada
que sí produzca guion). Hoy no hay nada que comparar en calidad de
contenido porque no se produjo contenido: es un tipo de falla nuevo, no
una repetición de los hallazgos de días previos. Los números del canal
(`bitacora/metricas/2026-09-24.md` vs `2026-09-23.md`) se movieron por
tráfico acumulado en el catálogo existente, no por una pieza nueva: 17→18
suscriptores (+1), 6501→6685 vistas (+184), horas vistas de largos
23.6h→24.3h (+0.7h), retención ponderada de largos 33.4%→32.5% (-0.9pp,
dentro del rango plano de las últimas semanas, sin video nuevo hoy que la
explique). Nada de esto es una serie interrumpida — vuelve a moverse en
cuanto la edición de hoy salga.
