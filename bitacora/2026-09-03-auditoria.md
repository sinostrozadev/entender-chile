ESTADO: CON FALLAS (dos puntos HOY: duración del guion muy sobre la promesa, y métricas del día sin generar por la misma cuota que ya tumbó el barrido)

Medido el 03-09-2026 a las 09:34 de Chile, por la rutina de las 09:30
(`trig_01GDbvJ1Wjzy25bnVRCXgygZ`), primera corrida de esta rutina.

## Qué salió y a qué hora

| Pieza | Archivo | Hora Chile |
|---|---|---|
| Preselección | `contenido/preseleccion/2026-09-03.md` | 03:10 |
| Informe | `contenido/informes/2026-09-03.md` | 03:30 |
| Clave, entrega | `contenido/claves/2026-09-03-estrecho-magallanes-soberania-navegacion.md` | 03:44 |
| Guion del informe | `contenido/guiones/informe/2026-09-03.md` | 04:01 |
| Guion de la Clave | `contenido/guiones/claves/2026-09-03-estrecho-magallanes-soberania-navegacion.md` | 04:18 |
| Revisión (VEREDICTO: APROBADA) | `contenido/revisiones/2026-09-03.md` | 04:43 |
| Descripciones (= hubo video, informe y Clave) | `contenido/descripciones/2026-09-03-informe.txt` y `-clave.txt` | 05:32 |
| Barrido real del día | `contenido/barrido/2026-09-03.md` | 06:06 (4 h tarde; ver abajo) |
| `indice.md` / `banco-temas.md` de Claves | actualizados | 03:44 (índice) |
| Métricas del día | `bitacora/metricas/2026-09-03.md` | **no existe a esta hora** |

Los tres eslabones de la Clave (entrega, guion, video) están completos: no
hay caso de "trabajo hecho y perdido" como el del 02-09.

## Cómo corrió la máquina

Cruzando `list_triggers` (rutinas de Claude, hora UTC) con Actions:

| Reloj | Disparo | Resultado |
|---|---|---|
| Reloj del barrido | 05:32:59 UTC (01:32 Chile) | **FALLÓ**: `session limit` de cuenta (five_hour), murió en 9 s sin pushear |
| Cron de respaldo del barrido | 05:50 UTC esperado | Llegó a las 10:06 UTC, **4 h 16 min tarde** |
| Observatorio plata pública | 05:45:48 UTC (01:45 Chile) | **FALLÓ**: mismo `session limit` |
| Revisión editorial | 08:40:55 UTC (04:40 Chile) | Correcta, terminó 08:43:36 UTC |
| Guardián de la edición diaria | 10:09:05 UTC (06:09 Chile) | Correcta |
| Guardia (cada 2 h, primera pasada del día) | 12:14:05 UTC (08:14 Chile) | **FALLÓ**: mismo `session limit` |
| Reloj de métricas | 12:45:55 UTC (08:45 Chile) | **FALLÓ**: mismo `session limit` |
| Cron de respaldo de métricas | 15:00 UTC (11:00 Chile) | Pendiente, aún no llega |
| Auditoría matinal (esta rutina) | 13:32:52 UTC (09:32 Chile) | A tiempo |

La preselección de las 03:10 no se atrasó porque, según el propio commit
`fb0741b` de esta madrugada, usó "su propio barrido de emergencia" al no
tener todavía el barrido real: cubrió las tres [A] pero dejó fuera dos [B]
(caso maderas Bolivia y un inicio de obras).

## Calidad de lo que salió

**`node scripts/validar-tarjetas.js --fecha 2026-09-03`**: `esquema: 3 ·
cifra: 3 · barras: 3 · comparacion: 1` — `variedad OK: ninguna cuota rota,
ninguna marca malformada.` Sin avisos.

**Revisión de hoy** (`contenido/revisiones/2026-09-03.md`): VEREDICTO
APROBADA, un solo hallazgo [MENOR] categoría (d): el bloque `Fuentes:` del
guion de la Clave (líneas 101-105) no incluye "Informe diario" pese a
citarlo dos veces en prosa ("el Informe diario señalaba...", "según el
Informe diario de esa fecha"); la entrega sí lo lista. Ese mismo defecto ya
está en la descripción pública `contenido/descripciones/2026-09-03-clave.txt`
("Fuentes de esta edición:" sin "Informe diario").

Comparado con los tres días previos, la categoría (d) —fuentes citadas en
prosa que no figuran en el bloque `Fuentes:`— aparece en 3 de las últimas 4
revisiones: 08-31 ([GRAVE], guion de Claves), 09-01 ([MENOR], guion del
informe) y hoy ([MENOR], guion de Claves). El 09-02 tuvo un hallazgo distinto
(categoría b). El ciclo la detecta cada vez y no corrige la plantilla.

**PENDIENTE DE CIERRE**: una sola marca, generada hoy mismo (Encuesta de
Operadores Financieros, línea 85 y 191), no vencida: nació en esta edición
porque el dato anunciado ayer para hoy aún no se publicaba al cierre (03:30).

**Duración del guion contra la promesa** (`estrategia/identidad.md:10` y
`estrategia/publico.md:13`: "unos diez minutos, doce o trece cuando el día
viene cargado"):

| Fecha | Palabras | Minutos estimados (150 ppm) |
|---|---|---|
| 30-08 | 2410 | 16,0 |
| 31-08 | 2579 | 17,1 |
| 01-09 | 2709 | 18,0 |
| 02-09 | 2599 | 17,3 |
| 03-09 | 2356 | **15,7** |

Guion de la Clave hoy: 1552 palabras, 10,3 min (la Clave no promete una
duración fija en estrategia/, pero PENDIENTES.md la anota como objetivo
"6-9 min").

## Los números

`bitacora/metricas/2026-09-03.md` no existe: el reloj de métricas falló (ver
arriba) y su respaldo (cron 15:00 UTC) aún no corre. La comparación queda
con los datos de ayer nada más, sin delta de hoy:

Al cierre del 02-09: 7 suscriptores (+2), 655 vistas totales sumadas por
video (+190), 22 subidos, 16 públicos. El movimiento en video largo que
importa: "La industria cae 5,1%..." pasó a 42 vistas (+31) y "Milei llega a
Chile..." a 158 (+96); los Shorts (182, 126, 55 vistas) siguen siendo el
grueso pero no cuentan para las 4.000 horas.

## Qué falló

1. **`bitacora/metricas/2026-09-03.md` no existe a las 09:34 Chile.**
   Evidencia: reloj de métricas con `session limit` a las 08:45 Chile
   (sesión `session_019VEDXLYCSTxdKJrYiWp4Z1`); `bitacora/metricas/despertador.txt`
   sigue con la marca de ayer (`2026-09-02T12:46:53Z`); único respaldo es el
   cron `0 15 * * *` de `.github/workflows/metricas.yml`, que según el
   propio historial del workflow (run #1, commit `ac17cdec`) ha tenido
   atrasos de 10-12 horas y un día sin correr en absoluto.

2. **El guion del informe lleva cinco días seguidos entre 50% y 80% sobre
   el techo prometido** (13 min en día cargado; hoy 15,7, el mejor de los
   cinco pero igual 21% sobre el techo). Es la cuarta auditoría consecutiva
   que lo señala (la del 02-09 ya decía "tercera auditoría seguida") y
   `contenido/revisiones/` nunca lo objeta porque no compara duración.

3. **Cuota de cuenta (`five_hour`) tumbó cuatro relojes distintos hoy**, no
   solo el barrido ya reconocido esta madrugada: observatorio (01:45),
   guardia (08:14) y métricas (08:45), además del barrido (01:32). Barrido
   ya recibió un segundo cron de respaldo (`.github/workflows/barrido.yml`,
   líneas del bloque `schedule:`); observatorio, guardia y métricas siguen
   con un solo camino de recuperación cada uno (o ninguno, en el caso de
   observatorio).

4. **Hallazgo recurrente sin corregir**: bloque `Fuentes:` de los guiones no
   acredita todo lo citado en prosa (categoría d), 3 de las últimas 4
   revisiones. Detalle arriba.

5. **Observatorio de la plata pública sin novedades desde el 09-02**:
   ningún archivo de `contenido/casos/` cambió su contenido hoy (verificado
   con `git log` por archivo); la rutina que trae novedades falló por la
   misma cuota. `casos.js` corrió igual dentro de `edicion-diaria.yml` y
   regeneró `indice.md`, pero sin material nuevo que indexar.

## Propuestas

1. Para el archivo 1: si a las 11:10 Chile `bitacora/metricas/2026-09-03.md`
   sigue sin existir, disparar a mano `workflow_dispatch` de
   `.github/workflows/metricas.yml`. De fondo, agregar una segunda entrada
   `cron:` en ese workflow (mismo patrón que ya se aplicó en
   `.github/workflows/barrido.yml`), por ejemplo `cron: "30 16 * * *"`
   junto a la existente `cron: "0 15 * * *"`.

2. Para el archivo 2: en `prompts/guion-informe.md`, aplicar el recorte que
   ya está anotado y sin ejecutar en `bitacora/PENDIENTES.md` bajo "IMAGEN
   2" (tope de 12 palabras por titular en el bloque "En titulares", hoy
   mide ~30 y es el 23% del video). Además, agregar a
   `scripts/validar-tarjetas.js` un aviso cuando el conteo de palabras del
   guion supere 1950 (13 min a 150 ppm), para que el techo deje de ser
   invisible al ciclo de revisión.

3. Para el archivo 3: agregar un segundo `cron:` también a
   `.github/workflows/metricas.yml` (ver propuesta 1). Para `guardia.yml` no
   hace falta: su diseño ya tolera una pasada perdida con la ventana de 3
   horas de la siguiente. Para observatorio (corre dentro de
   `.github/workflows/web.yml` vía push, sin cron propio) no hay pérdida de
   datos, solo de cadencia; no amerita cron de respaldo mientras sea
   investigación de fondo y no parte del render diario.

4. Para el archivo 4: en `prompts/guion-claves.md` y `prompts/guion-informe.md`,
   agregar la instrucción explícita de que toda mención en prosa a "el
   Informe diario" (o a cualquier fuente citada narrativamente) debe listarse
   también en el bloque `Fuentes:` final, no solo las marcas `[DATO]`.

5. Para el archivo 5: sin acción de código; queda cubierto por la propuesta 3
   (el reloj de observatorio no necesita respaldo si el diseño acepta que
   una pasada perdida se recupera al día siguiente).

## Triage

- **HOY**: propuesta 1 (métricas del día sin generar, con respaldo de
  historial poco confiable) y propuesta 2 (duración del guion, cuarta
  auditoría seguida sin corrección, ya publicado así).
- **AGUANTA**: propuesta 3 (segundo cron para métricas, más allá del check
  manual de hoy) y propuesta 4 (plantilla de `Fuentes:`).
- **MIRAR**: el patrón de fondo detrás de los cuatro relojes caídos hoy —no
  es un bug de un script, es la cuota de cinco horas de la cuenta
  repartiéndose entre cada vez más rutinas de Claude (barrido, observatorio,
  revisión, guardián, guardia, métricas, auditoría). Si se suma otro reloj
  (el "Short exprés" que sigue pendiente en `bitacora/PENDIENTES.md`) sin
  mirar la carga total, esto va a repetirse con más piezas expuestas cada
  vez.

## Comparación con ayer

**Mejoró**: la Clave de hoy tiene sus tres eslabones completos (entrega,
guion, video), a diferencia del 02-09 donde el guion se perdió y nadie lo
notó de inmediato. La apertura en frío ("## La noticia del día") se aplicó
correctamente, vigilancia que pedía justamente la auditoría de ayer para
hoy. El BUG 1 (tesis desbordada) sigue sin reaparecer: `validar-tarjetas.js`
no avisó nada, igual que ayer.

**Sigue igual**: la duración del guion sobre la promesa (cuarta vez
seguida, sin que nadie la haya tocado); el hallazgo de `Fuentes:`
incompletas sigue repitiéndose.

**Nuevo**: ayer la falla de reloj fue solo el barrido, ya visto y con un
parche aplicado esta madrugada (segundo cron). Hoy el mismo tipo de falla
(cuota de cuenta) se repitió en otros tres relojes que ayer no habían
fallado (observatorio, guardia, métricas), y por primera vez desde que
existe esta auditoría, el archivo de métricas del día no está disponible a
la hora de escribirla.

## Profundización de la sesión de día

(Sección para la sesión de día del proyecto, si decide profundizar algo que
esta rutina no alcanza: calidad editorial fina, estrategia, tendencias de
varios días. No completada por esta rutina.)
