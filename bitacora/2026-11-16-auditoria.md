# Auditoría matinal, 16-11-2026

ESTADO: CON FALLAS. HOY: el informe del 15-11-2026 sigue publicado en
entender.sinodev.cl con los defectos de su vuelta 1, que nunca se corrigieron
porque la cadena de esa madrugada quedó varada antes de la revisión.

## Qué salió y a qué hora (16-11-2026, hora de Chile)

El clon de este checkout es superficial (`.git/shallow`), así que el límite
de 50 commits cae justo dentro de la madrugada de hoy: el primer commit
visible ya aparece como si no tuviera padre. Por eso la hora del barrido y de
la preselección vuelta 0 no se puede leer con `git log --diff-filter=A` (daría
un horario falso) y se reconstruye con los commits reales que sí quedaron
dentro de la ventana, más la API de Actions, que no depende del clon.

| Pieza | Hora real | Esperada (`bitacora/cronograma.json`) | Estado |
|---|---|---|---|
| Barrido | fuera del horizonte del clon superficial; la preselección vuelta 0 ya estaba escrita y validada a las 02:01:20 | 01:30 a 01:31 | sin indicio de atraso |
| Preselección | CORREGIR vuelta 1 a las 02:01:20 (una fecha en palabras), reparada y APROBADA a las 02:07:30 | desde ~01:35 | una vuelta, sin atraso relevante |
| Informe | CORREGIR vuelta 1 a las 02:25:54 (cinco cierres de cautela, una escala humana inventada), reparado y APROBADA a las 02:35:33 | sigue a la preselección | una vuelta |
| Guion del informe | CORREGIR vuelta 1 a las 02:47:06 (orden de noticias, tarjeta repetida), reparado y APROBADA a las 02:52:12 | sigue al informe | una vuelta |
| Revisión (compuerta) | APROBADA a las 02:52:54 | ~02:50 | a tiempo |
| Edición diaria (Short, podcast, web) | `videos_listos` a las 02:55:45; podcast de 204 segundos (3,4 min) según `contenido/podcast/episodios.json`, dentro de la promesa de 3 a 4 min y no estimado por palabras | ~02:50 | cinco minutos sobre el cuadro, sin hallazgo |
| Reloj de métricas y Métricas | despertador 05:06:26, métricas escritas 05:07:08 | 05:00 | seis a siete minutos, sin hallazgo |
| Auditoría matinal (esta) | ~05:44 | 05:30 | catorce minutos, sin hallazgo |
| Clave | sin entrega ni guion hoy (la Clave no tiene calendario desde el 01-11-2026); Codelco sigue en producción con fecha 18-11-2026 | cuando corresponda | sin novedad |

`node scripts/validar-tarjetas.js --fecha 2026-11-16`: sin avisos (4 bloques
con fuente, 442 palabras, variedad de tarjetas intacta). Ninguna marca
`PENDIENTE DE CIERRE` vencida: la única abierta hoy es "votación y texto
final de la rebaja al diésel", con vencimiento 17-11-2026, todavía no
llegado.

## Qué falló

**HOY: el informe del 15-11-2026 sigue publicado con los defectos que su
propio veredicto mandó corregir y que nadie corrigió.** La cadena de esa
madrugada quedó varada en `reparar_informe`
(`contenido/estado/2026-11-15.md`, última actualización 09:50 del 15-11) y
nunca llegó a escribir el guion, la revisión ni el video: no existe
`contenido/guiones/informe/2026-11-15.md`, no existe
`contenido/revisiones/2026-11-15.md` (verificado listando ambas carpetas) y
`contenido/podcast/episodios.json` salta del 14-11 al 16-11 sin ningún
episodio con fecha 2026-11-15. Pese a eso, el workflow Web sí se disparó con
el push "edición 2026-11-15: informe" (run `43695243554`, 2026-11-15T08:35:42Z,
éxito) y publicó esa versión sin corregir en la web, y ningún push posterior
volvió a tocar `contenido/informes/2026-11-15.md`, así que sigue así ahora
mismo. Defectos concretos, citados contra `contenido/veredictos/2026-11-15-informe.md`:
- Línea 104: "La cifra oficial contradice la versión que lo daba por encima de
  $1.000 durante el cierre de esta edición" deja una nota de proceso editorial
  en el cuerpo público, que el prompt prohíbe expresamente.
- Línea 169: el `[C]` del Sernac sobre frenos de motos Gas Gas entró sin estar
  en la olla del 15-11-2026 y sin la línea obligatoria "FUERA DE LA OLLA:"
  que el prompt exige en ese caso.
- Las otras cuatro correcciones de esa vuelta (cuatro cierres de cautela en
  vez de uno, cuatro líneas del rastro del descarte que repiten noticias ya
  desarrolladas, "el senador Paulina Núñez" mal concordado y un `[B]` del
  Presupuesto 2027 que repite el informe del 14-11) tampoco se aplicaron.

**AGUANTA, corrección de un registro ya escalado:** `bitacora/PENDIENTES.md`,
sección DEPENDE DE SANTIAGO, dice del 15-11-2026 que la cadena "se recuperó
sola... sin perder el día, a diferencia del 12 y el 13-11". Es inexacto: el
15-11 sí se perdió el día completo (sin Short ni podcast), y además Edición
diaria corrió por su cron de mediodía (12:25:50 Chile, run `43729832590`) y
falló, con el estado todavía en `reparar_informe`. La cuota faltante no se
recuperó a tiempo esa madrugada; se corrige el registro en el mismo commit de
esta auditoría.

**AGUANTA, sin escalar, cuarta vez en seis mañanas:** la clasificación por
área del barrido deja noticias con señal fuera de toda área. Hoy, 40 de 138
(`contenido/revisiones/2026-11-16.md`); el 12-11-2026 ya decía "van tres
días" con 47 de 204 y 43 de 158 el 11-11. No se pierden datos (hoy entraron
igual al informe la alerta roja del Aconcagua, las dos encuestas de Kast, el
informe de la UDP y el choque de ciclistas de O'Higgins, todas verificadas en
`contenido/informes/2026-11-16.md`), pero el costo manual de rastrearlas se
repite cada madrugada y nunca quedó escrito como tarea.

## Propuestas

1. **[HOY]** En `contenido/informes/2026-11-15.md`, aplicar las seis
   correcciones de `contenido/veredictos/2026-11-15-informe.md` (línea 104,
   retirar "durante el cierre de esta edición"; línea 169, agregar "FUERA DE
   LA OLLA: Sernac inicia campaña por falla de frenos en motocicletas Gas
   Gas" o retirar el `[C]`; y las otras cuatro) y volver a pushear para que
   `web.yml` vuelva a desplegar. Esto choca con "jamás modificar archivos de
   fechas anteriores", pero esa regla protege ediciones aprobadas y ya
   publicadas correctamente, no un error de validación que nunca se corrigió
   y sigue en línea: se deja anotado como excepción explícita en
   `REALIZADOS.md` al aplicarla.
2. **[AGUANTA]** En `bitacora/PENDIENTES.md`, sección DEPENDE DE SANTIAGO,
   corregir el bullet del 15-11-2026: cambiar "sin perder el día, a
   diferencia del 12 y el 13-11" por la constatación de que sí se perdió, y
   sumar esta vez a la cuenta de días completos perdidos por la misma causa.
3. **[AGUANTA]** En `scripts/barrido.js`, alrededor de la línea 188
   (`areas: n.area ? [n.area] : []`), revisar qué deja `n.area` vacío: el
   problema lleva al menos cuatro mañanas de las últimas seis (11, 12, 15 y
   16-11) y hoy es la cuarta vez que una revisión lo anota sin que nadie lo
   convierta en tarea.

## Triage

- **HOY**: propuesta 1 (informe del 15-11-2026 publicado con defectos).
- **AGUANTA**: propuestas 2 y 3.
- **MIRAR**: nada nuevo hoy; la cadena propia del 16-11 corrió limpia.

## Comparación con ayer

- **Mejoró**: la cadena del 16-11-2026 corrió completa y a tiempo, una sola
  vuelta de corrección por pieza, compuerta abierta a las 02:52:54 y Short y
  podcast listos a las 02:55:45, cinco minutos sobre el cuadro de las 02:50 y
  sin ningún atraso de más de veinte minutos en ningún eslabón.
- **Sigue igual**: la sexta vez de
  `ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED` del 15-11 sigue sin el sí
  de Santiago para el workflow de alarma propuesto; las seis fuentes
  institucionales sin feed volvieron a quedar sin abrir hoy, igual que los
  días anteriores (ya AGUANTA desde el 16-10, no se repite como hallazgo
  nuevo).
- **Nuevo** (que la auditoría del propio 15-11 no pudo saber a las 05:33,
  porque corrió a mitad de la crisis de cuota): se confirma que esa madrugada
  no se recuperó. No hubo guion, ni revisión, ni Short, ni podcast, y el
  informe que sí se escribió quedó publicado en la web con los defectos de su
  única vuelta de corrección, sin que nadie lo note hasta hoy.
