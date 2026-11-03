# Auditoría matinal, 03-11-2026

ESTADO: CON OBSERVACIONES. La cadena corrió completa, limpia y dentro de
horario (informe de 210 s, dentro de la promesa de 3 a 4 minutos), pero esta
auditoría baja por primera vez a `bitacora/PENDIENTES.md` tres hallazgos que
llevaban días repitiéndose en las revisiones sin que nadie los anotara: el
clasificador de áreas confundiendo fútbol con ciencia (quinta mañana), la URL
de Interferencia rota (tercera) y el cuadro de horas del panel desactualizado
(quinta). Ninguno es HOY: la máquina siguió produciendo y nada salió
publicado con un defecto visible.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | 01:40 | 01:30-01:31 | éxito, 9-10 min tarde | commit "despertador 2026-11-03 [reloj]" (04:40 UTC); Actions "Barrido" run 193, éxito |
| Observatorio plata pública | 01:54 | 01:45 | éxito | commit "observatorio 2026-11-03 [claude]" (04:54 UTC) |
| Preselección | redactada 01:59, veredicto 02:05 | tras `barrido_listo` | APROBADA vuelta 0 | `contenido/veredictos/2026-11-03-preseleccion.md` |
| Informe | redactado 02:09, veredicto 02:19 (CORREGIR) | tras cada pieza | APROBADA vuelta 1, redactado de nuevo 02:20, veredicto 02:25 | `contenido/veredictos/2026-11-03-informe.md` |
| Guion del informe | redactado 02:28, veredicto 02:36 (CORREGIR) | tras cada pieza | APROBADA vuelta 1, redactado de nuevo 02:37, veredicto 02:40 | `contenido/veredictos/2026-11-03-guion_informe.md` |
| Revisión (compuerta) | 02:40 | tras cada pieza | APROBADA vuelta 1 | `contenido/revisiones/2026-11-03.md` |
| Carátula | tres intentos entre 02:30 y 02:59, las tres rechazadas | con la edición | sin carátula propia; sigue con la de respaldo | `contenido/caratulas/2026-11-03-NO-PUDE.md` |
| Edición diaria (render, voz, 4 videos, podcast, subida programada) | 02:41 a 02:58 | ~04:00 (cuadro desactualizado, ver hallazgo) | éxito | Actions "Edición diaria" run 303, éxito |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs 441 a 443, todos éxito |
| Clave | no corresponde hoy (sin calendario desde el 01-11, a juicio editorial) | cuando corresponda | sin novedad, no es hallazgo | `contenido/claves/`, `contenido/guiones/claves/` sin archivo de hoy |
| Reloj de métricas → Métricas | 05:05 | 05:00 | éxito, 5 min tarde | `bitacora/metricas/2026-11-03.md`, commit "métricas 2026-11-03 [bot]" (08:05 UTC) |
| Vigía de la cadena | corrió (se reporta SUCCEEDED) | 02:15 y 05:15 | sin nada atrasado que avisar | no hay evidencia de aviso al teléfono, consistente con que no hubo atraso que reportar |

Duración real: 210 segundos (3:30), dentro de la promesa de 3 a 4 minutos
(`contenido/podcast/episodios.json`, episodio del 03-11). Validador de
tarjetas sin avisos: `node scripts/validar-tarjetas.js --fecha 2026-11-03` →
"variedad OK: ninguna cuota rota, ninguna marca malformada" (429 palabras
narradas, ~3,2 min calculados).

## Qué falló

- **La carátula del 03-11 no se pudo generar: las tres variantes inventaron
  un rostro y lo presentaron como Fernando Rabat, sin imagen de referencia
  que permitiera verificarlo** (`contenido/caratulas/2026-11-03-NO-PUDE.md`).
  Se descartaron por incumplir la regla de veracidad del propio prompt y la
  edición siguió con la carátula de respaldo, como manda el prompt: no hubo
  defecto publicado. Es la primera vez que falla por esta causa (las dos
  veces anteriores, 25 y 26-09, fueron porque la sesión no tenía generador de
  imágenes; esto es distinto). La propia revisión del día anota que "se va a
  repetir cada vez que la portada gire sobre una persona nombrada": todavía
  es una sola ocurrencia, no una tendencia confirmada.
- **El clasificador de áreas del barrido sigue mandando fútbol a "Ciencia y
  tecnología", quinta mañana seguida sin que nadie lo bajara a la lista
  viva.** Causa encontrada hoy: `contenido/barrido/fuentes.json:90` consulta
  "Chile (ciencia OR tecnología OR investigación OR astronomía OR
  universidad)", y "universidad" trae partidos y conflictos de los clubes
  Universidad de Chile y Universidad Católica
  (`contenido/barrido/2026-11-03.md:364-367`: "clásico universitario" de
  Teletrece, "jugador de U. Católica" de RedGol). Marcado ya en
  `contenido/revisiones/` del 30-10, 31-10, 01-11 y 02-11, siempre como
  "arreglo de script, no de la pieza", y nunca anotado aquí hasta hoy.
- **La URL de Interferencia llega rota del barrido, tercer día seguido, con
  causa encontrada.** `scripts/barrido.js:90` extrae literal lo que trae el
  `<link>` del feed, y ese campo trae una etiqueta `<a href="...">Título</a>`
  completa en vez de una URL, percent-encoded:
  `https://interferencia.cl/%3Ca%20href%3D%22/articulos/<slug>%22%3E<título>%3C/a%3E`.
  Mismo patrón el 01-11 (línea 521), el 02-11 (líneas 521 y 560) y hoy (línea
  494). Cada día se reconstruye a mano.
- **El cuadro "Cronograma del sistema" del panel sigue prometiendo ~04:00
  para Edición diaria; la cadena real termina antes de las 03:00 Chile desde
  hace semanas.** `bitacora/cronograma.json:45` no se ha tocado desde que lo
  marcaron las auditorías del 27-10, 30-10, 31-10 y 02-11; hoy la Edición
  diaria corrió de 02:41 a 02:58 Chile, 1h02 antes de lo que el cuadro dice.

Sin fallas que hayan roto la cadena de hoy ni que llegaran al video o a la
web con un defecto visible.

## Propuestas

- En `contenido/barrido/fuentes.json:90`, quitar el término "universidad" de
  la consulta de "Ciencia y tecnología" (o acotarlo a "universidad
  (investigación OR estudio OR académic*)"), y excluir de esa área los
  medios que son solo de fútbol (RedGol, Bolavip).
- En `scripts/barrido.js:90`, si el `url` extraído para Interferencia
  matchea `/^https:\/\/interferencia\.cl\/%3Ca/i`, aplicar
  `decodeURIComponent` y extraer el `href` con el mismo patrón que la línea
  95 usa para Atom, resolviendo contra `https://interferencia.cl`.
- En `bitacora/cronograma.json:45`, cambiar `"hora": "~04:00"` por algo como
  `"~02:50"` para "Edición diaria", y correr `scripts/panel-cronograma.js`
  para que el panel quede al día.
- Sin propuesta de código para la carátula de hoy: es la primera vez que
  falla por rostro inventado de una persona nombrada; si se repite, ahí sí
  conviene revisar `prompts/caratula-pedido.txt` para pedir que, sin imagen
  de referencia de la persona, la carátula use un recurso que no dependa de
  un rostro (como ya hace con otros temas).

## Triage

- **AGUANTA** (bajan a `bitacora/PENDIENTES.md`, sección "Para la sesión de
  día", en este mismo commit): el clasificador de áreas del barrido, la URL
  de Interferencia rota, y el cuadro del panel con la hora de Edición diaria
  desactualizada. Los tres molestan la medición o la navegación interna, no
  rompen la producción, y los tres llevaban entre 3 y 5 mañanas marcándose
  sin bajar nunca a la lista viva.
- **MIRAR**: la carátula con rostro inventado de una persona nombrada
  (Fernando Rabat). Una sola ocurrencia hasta ahora; la propia revisión
  predice que se repetirá cada vez que la portada gire sobre alguien
  nombrado, pero todavía no hay una segunda vez para confirmarlo.
- **MIRAR**: el informe dejó de usar la marca formal `PENDIENTE DE CIERRE:`
  para el boletín 18817-07 (la usó el 01 y el 02-11) y pasó a prosa libre
  ("Sigue pendiente el cierre... sin fecha conocida",
  `contenido/informes/2026-11-03.md:239`). El contenido es correcto (no
  inventa una fecha que no existe), pero si el cambio de formato se repite,
  deja de poder rastrearse mecánicamente qué cierres quedaron pendientes.
- No hay ningún `HOY`.

Buscado en `estrategia/decisiones.md` y `bitacora/REALIZADOS.md`: no hay
ninguna decisión de "no hacer" registrada sobre el clasificador de áreas, la
URL de Interferencia ni el cuadro del panel. Siguen sin dueño porque nadie
los tomó, no porque estén resueltos.

## Comparación con ayer

Mejoró: el subconteo de palabras de `scripts/validar-tarjetas.js` que midió
bajo cuatro mañanas seguidas (30-10 al 02-11) por descartar las `[TESIS]` del
conteo está arreglado (el propio código lo dice en su comentario de la línea
90) y hoy el validador no avisó nada; el informe narró 210 segundos, bien
dentro del rango de 3 a 4 minutos, contra los 249 (ocho segundos sobre el
techo) de ayer. Sigue igual: las seis fuentes institucionales sin feed
(`bitacora/PENDIENTES.md`, entrada del 16-10) y el clasificador de áreas,
que hoy por fin bajó a la lista viva en vez de quedar solo anotado en la
revisión del día. Nuevo: la URL de Interferencia rota y el cuadro del panel
desactualizado también bajaron hoy por primera vez, y la carátula falló por
una causa distinta a las dos veces anteriores (rostro inventado de una
persona nombrada, no falta de generador).
