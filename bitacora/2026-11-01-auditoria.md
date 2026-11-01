# Auditoría matinal, 01-11-2026

ESTADO: CON FALLAS. La cadena murió en silencio a las 02:12 de Chile, justo
después del barrido, y a las 05:43, hora en que escribo esto, sigue sin
preselección, informe, guion ni revisión de hoy. El HOY: `estado.yml` nunca
recalculó el estado del día después de que el Barrido se relanzara por
`workflow_dispatch`, así que nadie despertó al suplente para escribir la
preselección y la noche entera se perdió en la primera pieza, sin que
`reintento.yml` lo escalara.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido (rutina de Claude) | 01:44, se reporta SUCCEEDED | 01:30 | la rutina dice que escribió y pusheó, pero no hay rastro en main | `contenido/barrido/despertador.txt` sigue con la marca de ayer, "2026-10-31 04:45:34 UTC", sin ningún commit nuevo hoy que la toque |
| Barrido | 02:11 a 02:12, relanzado por `reintento.yml` vía `workflow_dispatch` | 01:31 | éxito, 41 minutos tarde | Actions run 41275961290 ("Barrido" #187, conclusion success), commit `87c439ec` "barrido 2026-11-01 [bot]", `contenido/barrido/2026-11-01.md` y `.json` |
| Estado del día | nunca corrió | continua, tras cada push relevante | no corrió ni una vez desde el Barrido | el último run de "Estado del día" en todo el repo es el 41209865931 del 31-10 a las 14:22:54 UTC (más de 18 horas antes de este barrido); no existe ninguno posterior |
| Preselección | no existe | poco después de "barrido_listo" | nunca se escribió | `contenido/preseleccion/` no tiene archivo de hoy (listado completo, último es `2026-10-31.md`); `contenido/estado/ultimo-disparo-suplente.txt` sigue en "2026-10-31 barrido_listo 0", nunca se actualizó para hoy |
| Informe, guion del informe, revisión | no existen | tras cada pieza | no llegaron a escribirse, no hay pieza anterior que las dispare | carpetas `contenido/informes/`, `contenido/guiones/informe/`, `contenido/revisiones/` sin archivo de hoy |
| Edición diaria | no corrió | ~04:00 | nada que renderizar | sin commits de descripciones, podcast ni carátulas de hoy; `contenido/podcast/episodios.json` termina en 31-10-2026 |
| Clave | no corresponde hoy | cuando corresponda (semanal) | sin novedad | no es su turno (CLAVE 4) |
| Observatorio plata pública | 01:50 | 01:45 | éxito | commit `db2b4bc8` "observatorio 2026-11-01 [claude]" |
| Métricas | 05:05 | 05:00 | éxito | `bitacora/metricas/2026-11-01.md`, commit `d023d239` |
| Vigía de la cadena | 02:15 y 05:15 | 02:15 y 05:15 | la rutina se reporta SUCCEEDED en ambas corridas | su trabajo es avisar por teléfono si algo está atrasado; con la cadena parada desde las 02:12 debería haber avisado en la corrida de las 05:15, pero esta auditoría no puede confirmar si el aviso llegó al teléfono de Santiago, solo que la rutina corrió |

## Qué falló

**1. `estado.yml` no reaccionó cuando el Barrido terminó.** El workflow tiene
un disparador `workflow_run` para los workflows `Barrido` y `Edición diaria`
(`.github/workflows/estado.yml`, líneas 32 a 36) precisamente porque los
commits del bot no disparan el `push` normal. El Barrido de hoy terminó bien
(run 41275961290, conclusion `success`) a las 05:12 UTC, pero ningún run de
"Estado del día" aparece después de esa hora en todo el historial de Actions
del repo: el encadenamiento que debía seguir simplemente no ocurrió. Sin ese
recálculo, `contenido/estado/2026-11-01.md` nunca se escribió, y sin ese
archivo nadie sabe que la etapa es `barrido_listo` ni que le toca al suplente
(Claude) escribirla, por el reparto permanente de `contenido/estado/reparto.txt`.

Comparado con el Barrido relanzado de la misma forma otros días (runs 134,
137 y 158, todos `workflow_dispatch` por `github-actions[bot]`), falta
revisar si esos SÍ encadenaron un "Estado del día" después: esta auditoría no
llegó a confirmarlo con certeza y lo deja como pregunta abierta, no como
hecho verificado.

**2. `reintento.yml` no tiene ningún resguardo para este caso exacto.** En la
línea 165 el workflow lee `VISTA="contenido/estado/$FECHA.md"` y, si no
existe, hace `echo "todavía no hay estado de hoy"; exit 0`. Esa rama se
ejecutó sin cambios cada 20 minutos desde las 02:11 hasta ahora (reintentos
de las 02:11, 02:36, 02:51, 03:11, 03:36, 03:51, 04:10, 04:37, 04:51, 05:10 y
05:37, todos con éxito en el sentido de "corrieron sin error", pero ninguno
hizo nada útil porque todos chocaron con la misma línea 165). El propio
encabezado del archivo (líneas 24 a 29) cuenta que el 24-09 pasó algo
parecido, "el Barrido nunca corrió... este workflow se retiró en silencio
cuatro veces porque solo sabía reintentar cadenas atascadas, no cadenas que
nunca empezaron", y por eso aprendió a relanzar el Barrido. Hoy aprendió esa
lección a medias: relanza el Barrido, pero si el Barrido corre y el estado
nunca se recalcula después, no tiene ningún segundo intento.

**3. La rutina "Reloj del barrido" se reporta exitosa sin que su escritura
llegara al repo.** `get_trigger` sobre `trig_01W5KEjHbr5wWPsmmJ4ygNEh` muestra
`last_run.status: ROUTINE_RUN_STATUS_SUCCEEDED`, disparada a las 04:44:42 UTC
(01:44 Chile) y terminada a las 04:45:10 UTC. Pero `contenido/barrido/despertador.txt`
en main sigue con la marca de ayer, y no existe ningún commit "despertador
2026-11-01 [reloj]" en todo el historial de hoy (sí existen los de los días
anteriores, todos a las 01:45). El contrato de escritura verificada
(`prompts/contrato-archivos.md`, sección ESCRITURA VERIFICADA) exige leer de
vuelta antes de dar una escritura por hecha: si la rutina lo hizo, lo que leyó
de vuelta no puede haber sido lo que hay en main ahora. Esta falla fue la que
obligó a `reintento.yml` a relanzar el Barrido a mano 41 minutos tarde, y es
la raíz de todo lo que vino después.

## Propuestas

1. **En `.github/workflows/reintento.yml`, línea 165:** cuando `VISTA` no
   existe pero `contenido/barrido/$FECHA.md` SÍ existe y ya pasaron más de
   10 a 15 minutos desde que se escribió, no solo decir "todavía no hay
   estado de hoy": disparar directamente `gh workflow run estado.yml --ref
   main` como segundo camino, independiente del `workflow_run` que hoy no
   encadenó. Así una falla de encadenamiento no deja a la cadena entera sin
   ningún reintento posible.

2. **Confirmar si el `workflow_run` de `estado.yml` encadena cuando el
   Barrido se dispara por `workflow_dispatch` desde otro workflow con
   `GITHUB_TOKEN`.** Revisar los runs 134, 137 y 158 de `barrido.yml` (todos
   relanzados así en días anteriores) y ver si cada uno tuvo su "Estado del
   día" correspondiente. Si la respuesta es que nunca encadena, el hueco no
   es de hoy: es estructural desde que `reintento.yml` aprendió a relanzar el
   Barrido (06-10 según el commit `acefef59`), y lleva más de tres semanas sin
   que nadie lo note porque el reloj directo casi siempre llega a tiempo.

3. **Revisar por qué "Reloj del barrido" no deja rastro de su escritura de
   hoy en main**, y agregarle una lectura de vuelta antes de reportar éxito,
   como pide el contrato de archivos. Sin esto, el primer eslabón de la
   cadena puede seguir fallando en silencio cualquier madrugada, y solo se
   nota porque el Barrido relanzado por red llega 40 minutos tarde en vez de
   fallar del todo.

## Triage

- **HOY (las tres, porque hoy mismo la edición no existe):**
  - `estado.yml` no encadenó tras el Barrido relanzado y la cadena de hoy
    sigue muerta en `barrido_listo` (propuesta 1 y 2).
  - "Reloj del barrido" se reporta exitoso sin escribir en main (propuesta 3).
- **AGUANTA:** ninguna nueva.
- **MIRAR:**
  - Las horas vistas en videos largos de los últimos 30 días siguen bajando
    (15,0 el 30-10, 14,6 el 31-10, 14,3 hoy) y hoy no se sumó ningún video
    nuevo. Si el 02-11 tampoco sale nada, esto deja de ser tendencia y pasa a
    HOY por cuenta propia.
  - El patrón de carátulas que no nombran el objeto de la noticia (23-10 y
    31-10, ambas marcadas en sus veredictos de guion) no se puede medir hoy
    porque no hubo guion ni revisión, pero hay que volver a mirarlo la
    próxima vez que el guion llegue a la compuerta.

## Comparación con ayer

Ayer (31-10) la cadena corrió limpia: preselección, informe y guion
aprobados, la revisión cerró a las 02:33 y la edición diaria a las 02:50,
mucho antes de las ~04:00 que espera el cuadro, el mismo patrón ya anotado
MIRAR en las auditorías del 27 y el 30-10. Hoy no es una variación de ese
patrón: es la primera vez en varios días que la cadena no llega ni a la
primera pieza. Lo que mejoró fue ajeno a la máquina: las vistas totales
subieron fuerte, de 21.689 a 22.791 (+1.102), y los suscriptores de 40 a 47
(+7), tirados por un video antiguo sobre la investigación a Rabat y Silva que
despegó solo (+1.071 vistas), sin relación con la falla de hoy. Lo nuevo es
la caída completa de la cadena en el primer eslabón, algo que no se había
visto en las auditorías de los últimos días.
