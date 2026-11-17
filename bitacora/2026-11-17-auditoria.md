# Auditoría matinal, 17-11-2026

ESTADO: CON FALLAS. HOY (heredado del 16-11-2026, segunda mañana sin
corregir): el informe del 15-11-2026 sigue publicado en entender.sinodev.cl
con los defectos de su única vuelta de corrección.

## Qué salió y a qué hora (17-11-2026, hora de Chile)

Este checkout es un clon superficial (`.git/shallow` lista `ae4c037` como
límite): `git show`/`git log --diff-filter=A` sobre ese commit lo muestran
como si no tuviera padre y como si hubiera "creado" cientos de archivos de
golpe. Verificado contra la API de GitHub (`get_commit` sobre ese mismo SHA):
sí tiene padre (`276956c...`, no descargado por el clon superficial) y su
diff real es de 2 archivos. No es un reescritura de historia, es el límite
del clon. Las horas de esta tabla salen de los commits reales de hoy (todos
dentro de la ventana del clon) y de la API de Actions.

| Pieza | Hora real (Chile) | Esperada (`bitacora/cronograma.json`) | Estado |
|---|---|---|---|
| Barrido | 01:40:39 | 01:30 a 01:31 | ~10 min, sin hallazgo |
| Observatorio plata pública | 01:57:27 | 01:45 | ~12 min, sin hallazgo |
| Preselección | escrita 02:03:42, APROBADA vuelta 0 a las 02:09:11 | desde ~01:35 | sin corrección, sin atraso relevante |
| Informe | escrito 02:14:27, CORREGIR vuelta 1 a las 02:24:23 (ocho cierres de cautela, una nota de método, una fuente sin línea), reparado 02:26:18, APROBADA vuelta 1 a las 02:29:59 | sigue a la preselección | una vuelta |
| Guion del informe | escrito 02:34:29, CORREGIR vuelta 1 a las 02:48:13 (Apertura repetía portada, tope de palabras, tres cifras en los tres bloques, tarjeta de barras sin indicador, dos fuentes en una tarjeta), reparado 02:50:41, APROBADA vuelta 1 a las 02:56:03 | sigue al informe | una vuelta |
| Revisión (compuerta) | APROBADA 02:56:55 | ~02:50 | ~7 min, sin hallazgo |
| Edición diaria (Short, podcast, web) | `videos_listos` 02:59:53; podcast de 235 s (3,92 min, `contenido/podcast/episodios.json`), dentro de la promesa de 3 a 4 min y no estimado por palabras | ~02:50 | ~10 min, sin hallazgo |
| Reloj de métricas → Métricas | el reloj corrió a tiempo (05:05:03 UTC = 02:05:03 Chile... la hora real de la rutina es 05:05, ver hallazgo) pero su commit (`8da1640`) quedó con CERO archivos cambiados; `bitacora/metricas/2026-11-17.md` no existe todavía (verificado listando la carpeta por la API de GitHub) | 05:00 | **FALLA, ver abajo** |
| Auditoría matinal (esta) | ~05:44 | 05:30 | 14 min, sin hallazgo |
| Clave | sin entrega ni guion hoy; la Clave no tiene calendario desde el 01-11-2026; Codelco sigue en producción con fecha 18-11-2026 (`contenido/claves/2026-11-18-codelco-produccion-inflada.md`) | cuando corresponda | sin novedad |

`node scripts/validar-tarjetas.js --fecha 2026-11-17`: un aviso, "sin línea
Carátula sugerida" (ver hallazgo, sexto día). 4 bloques con fuente, 544
palabras narradas, ~4,0 min. Ninguna marca `PENDIENTE DE CIERRE` en el
informe de hoy (verificado, sin resultados).

## Qué falló

**El reloj de métricas pushea un commit vacío y las métricas de hoy no
existen al momento de esta auditoría.** El commit `8da16402` ("despertador
métricas 2026-11-17 [reloj]", 2026-11-17T08:05:03Z) corrió a la hora
esperada pero no tocó ningún archivo (`git diff-tree --no-commit-id
--name-only -r 8da16402` y el `get_commit` de la API coinciden: 0 archivos).
`bitacora/metricas/despertador.txt` sigue leyendo "2026-11-16 08:06:26 UTC"
(confirmado con `get_file_contents` sobre `main` después del commit de las
05:36), así que el push no trajo el cambio de ruta que dispara
`metricas.yml` (`.github/workflows/metricas.yml:14`, `paths:
bitacora/metricas/despertador.txt`), y no hay ningún run de ese workflow
hoy (confirmado con `list_workflow_runs`: el último es el de ayer, 16-11
20:45 UTC). Ayer el mismo tipo de commit (`b5161999`, 2026-11-16T08:06:26Z)
sí modificó el archivo (1 línea, diff real) y disparó el workflow con
éxito: es una falla nueva de hoy, no un patrón. Se autocura con el cron de
respaldo (`metricas.yml`, cron `30 9 * * *` = 06:30 Chile, todavía no
corrió al momento de esta auditoría), así que no se pierden datos, pero las
métricas de hoy llegan con más de una hora de atraso sobre el horario
habitual (~05:05 a 05:07 Chile).

**Heredado del 16-11, sin corregir (segunda mañana): el informe del
15-11-2026 sigue publicado con los defectos de su vuelta 1.** Verificado de
nuevo hoy: `contenido/informes/2026-11-15.md:104` todavía dice "durante el
cierre de esta edición" y la línea del Sernac sobre frenos de motos Gas Gas
(hoy en la línea 169) sigue sin el prefijo "FUERA DE LA OLLA:". El bullet de
`bitacora/PENDIENTES.md` (sección DEPENDE DE SANTIAGO, marcado "16-11, HOY")
ya tiene la evidencia completa; no se duplica, se le agrega la marca de
segunda mañana en el mismo commit de esta auditoría.

**AGUANTA, cuarta vez: el tope de tres cifras habladas por bloque se rompió
otra vez, y hoy en los tres bloques a la vez** (`contenido/revisiones/2026-11-17.md:20-24`,
contra `prompts/guion-informe.md:37-38`). Ya costó una vuelta el 06-11-2026
y quedó anotado sin corrección el 01-11-2026 y el 30-10-2026: nunca se
convirtió en una tarea de `PENDIENTES.md` (verificado, sin resultados al
buscar "tres cifras" en `PENDIENTES.md`, `REALIZADOS.md` ni
`estrategia/decisiones.md`). No bloquea nada porque el validador lo corrige
en la vuelta 1, pero gasta una vuelta completa cada vez que pasa.

**AGUANTA, sexto día: la contradicción del prompt del guion sobre las
carátulas sigue sin resolverse, y confirmé hoy que no tiene ningún efecto
real en lo que se publica.** `prompts/guion-informe.md:154-173` (FORMATO DE
SALIDA) todavía exige "Carátula sugerida:", "Carátula 2:", "Carátula 3:" y
"Clima de carátula:" como tercera a sexta línea del guion; la línea 189 del
mismo archivo dice "Desde el 04-11-2026 no se pide carátula del día: el
informe en video está apagado". GPT sigue la instrucción más nueva (no
escribe las carátulas) y `scripts/validar-tarjetas.js:71` sigue avisando
"sin línea Carátula sugerida" porque nadie actualizó esa sección ni el
script. Comprobé que es inocuo: `.github/workflows/edicion-diaria.yml` no
invoca `scripts/pedir-caratula.js` (sin resultados al buscar "caratula" en
ese workflow), así que no se genera ninguna carátula para el informe en
video apagado y el aviso es puro ruido. Seis días de aviso falso sin que
nadie lo convierta en tarea (hoy, `contenido/revisiones/2026-11-17.md:48-51`
dice "sexto día con el aviso").

**AGUANTA, ya conocido: siguen igual los dos hallazgos de siempre.** Las
seis fuentes institucionales sin feed propio (`bitacora/PENDIENTES.md:557`,
AGUANTA desde el 16-10, sin dueño) y la clasificación por área del barrido
dejando noticias "Sin área" (`contenido/revisiones/2026-11-17.md:61-65`, hoy
50 de 179; ya en `PENDIENTES.md` como AGUANTA de la auditoría del 16-11).
Ninguno es nuevo hoy, ninguno pierde datos.

## Los números

`bitacora/metricas/2026-11-17.md` no existe (ver falla de arriba), así que
no hay cifras de HOY que reportar; no las invento. De `bitacora/metricas/2026-11-16.md`
(AYER) contra `2026-11-15.md`: **59 suscriptores (+0)**, 26.582 vistas
totales (+470). El día anterior (15-11 vs 14-11) había sido +3 suscriptores.
Un día plano en la métrica que manda desde el 01-11-2026 (regla 39), sobre
una sola observación: no alcanza para ser tendencia todavía (queda para
MIRAR si se repite). El Short de ayer (16-11) sí salió: existe
`contenido/guiones/informe/2026-11-16.md` y el estado del día marca "videos:
listo".

## Propuestas

1. **[HOY, heredado, día 2]** Aplicar en `contenido/informes/2026-11-15.md`
   las seis correcciones de `contenido/veredictos/2026-11-15-informe.md`
   (línea 104 y la del Sernac entre otras) y volver a pushear para que
   `web.yml` redespliegue. Ya está completo en `bitacora/PENDIENTES.md`,
   sección DEPENDE DE SANTIAGO; sigue esperando el sí de Santiago para la
   excepción de "no tocar fechas anteriores".
2. **[AGUANTA]** El prompt de la rutina "Reloj de métricas"
   (`trig_01MxzGdh2P489TmgkUi9spWd`, sin archivo en `prompts/`) necesita
   comprobar con `git status --porcelain bitacora/metricas/despertador.txt`
   que el commit trajo un cambio real antes de darse por terminada; hoy
   commiteó vacío y no disparó `metricas.yml`.
3. **[AGUANTA]** En `prompts/guion-informe.md`, antes de la marca `[DATO]`
   de cada bloque (cerca de la línea 38), agregar una instrucción explícita
   de contar las cifras habladas del bloque ANTES de escribirlo y mover la
   que sobra a `[DATO]`, en vez de dejarlo solo como observación repetida
   del validador. Cuarta vez que cuesta una vuelta sin que el prompt cambie.
4. **[AGUANTA]** En `prompts/guion-informe.md:154-173`, borrar o condicionar
   las instrucciones de "Carátula sugerida/2/3" y "Clima de carátula" (ya
   contradichas por la línea 189), y en `scripts/validar-tarjetas.js:67-78`
   quitar el aviso correspondiente. Sexto día de ruido sin efecto real.

## Triage

- **HOY**: propuesta 1 (heredada; ya en `PENDIENTES.md`, se le agrega la
  marca de segunda mañana en este commit).
- **AGUANTA**: propuestas 2, 3 y 4.
- **MIRAR**: el día plano de suscriptores (16-11, +0) contra el +3 del día
  anterior; una sola observación, se vuelve a mirar si se repite mañana.

## Comparación con ayer

- **Mejoró**: nada que dependa de esta auditoría; el día plano de
  suscriptores podría leerse como un freno, pero es una sola observación.
- **Sigue igual**: el HOY del informe del 15-11 sigue sin corregir (segunda
  mañana); las fuentes institucionales sin feed y la clasificación "Sin
  área" del barrido siguen iguales, ya conocidas y en AGUANTA; el tope de
  tres cifras volvió a costar una vuelta (cuarta vez) y la contradicción de
  las carátulas en el prompt sigue sin tocarse (sexto día), ninguna de las
  dos nunca llegó a `PENDIENTES.md` a pesar de repetirse.
- **Nuevo**: el commit vacío del reloj de métricas. Ayer el mismo tipo de
  commit sí escribió el cambio real; hoy no, y por eso las métricas de hoy
  todavía no están en el repo al cerrar esta auditoría.
