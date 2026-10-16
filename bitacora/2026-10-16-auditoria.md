# Auditoría matinal · 16-10-2026

ESTADO: CON FALLAS — HOY: la cadena entera (producción Y auditoría) estuvo
muerta DOS días completos, 14 y 15-10-2026, porque los tres relojes del
reintento (A, B y C) no empujaron ni un solo commit "reintento: despertador"
en esa ventana, y nadie lo notó hasta que el barrido del 16-10 absorbió el
material de los tres días. Van ya seis mañanas sin auditoría (07, 08, 11, 13,
14 y 15-10) y dos de ellas (14 y 15) con la producción completa muerta
además, no solo la auditoría.

## Qué salió hoy y a qué hora

La cadena de hoy llegó completa y adelantada en casi todos los tramos:

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido | 01:50 | 01:40 | +10 min |
| Preselección (APROBADA, vuelta 0, la escribió el suplente) | 02:10 | 02:10 | a tiempo |
| Informe (APROBADA, vuelta 1, 1 corrección) | 02:25 | 02:40 | adelantado 15 min |
| Guion del informe (APROBADA, vuelta 1, 1 corrección) | 02:44 | 03:10 | adelantado 26 min |
| Revisión (veredicto final) | 03:00 | 03:30 | adelantado 30 min |
| Videos y descripciones (`edicion-diaria.yml` run 38858794759) | 03:13-03:17 | 05:15 | adelantado ~2 h |
| Podcast (`episodios.json`, informe, 218 s = 3,6 min) | — | ~3-4 min (decisión 12-10) | dentro de rango |
| Métricas | 05:20 | ~05:00 | +20 min |

Fuente: `contenido/estado/2026-10-16.md` (`ETAPA: videos_listos`, `VEREDICTO:
APROBADA`, `FALTA: nada, el día está completo`). `node
scripts/validar-tarjetas.js --fecha 2026-10-16`: "variedad OK: ninguna cuota
rota, ninguna marca malformada" (4 bloques con fuente, 434 palabras narradas,
~3,2 min). No hubo Clave hoy (no es diaria desde el 16-09); no corresponde
revisar banco semanal porque hoy es viernes, no domingo.

Las tres piezas de hoy las escribió el **suplente** (Claude), no GPT: la
preselección por reparto permanente (`contenido/estado/reparto.txt`), y el
informe y el guion con "Tarea: suplente (plan B)" porque no existía
`plan-b.txt` y el motivo real que declara el propio commit es que la cadena
llevaba detenida desde el 13-10 y alguien tenía que destrabarla.

## Qué falló

### 1. Dos días completos sin ninguna pieza, 14 y 15-10-2026 (HOY)

Verificado listando las carpetas, no de memoria:
`contenido/preseleccion/`, `contenido/informes/`, `contenido/guiones/informe/`,
`contenido/revisiones/` y `contenido/veredictos/` saltan del 13-10-2026
directo al 16-10-2026: no existe un solo archivo con fecha 2026-10-14 ni
2026-10-15 en ninguna de esas cinco carpetas (confirmado con `ls` de cada
carpeta). `bitacora/metricas/` sí tiene los dos días (el bot de métricas
corre solo y no depende de la cadena editorial).

El estado quedó congelado en el primer peldaño los dos días:
- `contenido/estado/2026-10-14.md`: `ETAPA: barrido_listo`, `ACTUALIZADO:
  2026-10-14 07:20`, `FALTA: Preselección, Informe, Guion del informe,
  Revisión (veredicto final), Videos y descripciones`. El propio archivo
  calcula los atrasos: Preselección +310 min, Informe +280 min, Guion +250
  min, Revisión +230 min, Videos +125 min, todos medidos a las 07:20 y
  ninguno se movió después.
- `contenido/estado/2026-10-15.md`: mismo cuadro, `ACTUALIZADO: 2026-10-15
  07:04`, mismas cinco piezas en "falta".

El propio commit de hoy que escribió la preselección (`f7a10fb`) lo confirma
sin que yo tenga que inferirlo: "La cadena quedó detenida tras el
13-10-2026 y el barrido del 16-10-2026 trae dos días de material que el
canal nunca contó". Y la revisión de hoy (`contenido/revisiones/2026-10-16.md`,
hallazgo 3) ya lo deja escrito: "No existen los informes del 14-10-2026 ni
del 15-10-2026 (...) esta edición hereda dos días de material sin contar y no
tuvo informe previo contra el que medirse". El formato corto llegó a su
tercera edición real contando solo tres fechas (12, 13 y 16-10) "porque no
hay informes del 14 ni del 15".

**Se perdieron dos días de video que no se recuperan**: lo que no se contó
el 14 y el 15 quedó resumido dentro de la edición del 16, pero no hubo video
largo, Short ni exprés propios de esos dos días. Eso es media hora de las
4.000 que no se junta nunca.

### 2. La causa que el repo sí deja ver: los tres relojes del reintento no empujaron nada esos dos días

`reintento.yml` depende de que alguno de los tres relojes de Claude (A, B y
C: `trig_016JsVfFwrJFut5vy2f4c8TS`, `trig_01E8tyJPqyfNdVTog477sf6Z`,
`trig_01RevKvPn6mufpcUCK9fii2X`) toque `contenido/estado/reintento-despertador.txt`
y pushee cada 20 minutos, porque "el cron de GitHub nunca es reloj
principal" (así lo dice el propio workflow). Comprobado con `git log`
sobre el historial completo (el checkout shallow por defecto solo trae 50
commits y no alcanza a ver esto, hubo que `git fetch --unshallow`): entre el
último commit "reintento: despertador" del 13-10 (04:51) y el primero del
16-10 (04:10) no existe NINGÚN commit con ese mensaje. Cero, en casi tres
días.

Sin esos relojes, el único disparador que quedó fue el cron nativo de
GitHub (`*/20 4-9 * * *`), que el propio workflow ya documenta como poco
confiable. Y en la práctica así fue: el log de Actions muestra que
`reintento.yml` por evento `schedule` corrió solo una o dos veces por día
el 14 y el 15 (no las ~17 veces que le tocarían en la ventana de 01:00 a
07:00), y las dos veces que corrió dentro de ventana las gastó en relanzar
el Barrido, que también llegaba tarde (el run `38540333574` del 14-10 a las
06:09 de Chile dice textualmente "no hay barrido de 2026-10-14 y son las 06
de Chile: relanzando el Barrido"). El barrido relanzado SÍ llegó (06:10 el
14, 05:43 el 15), pero ahí se acabó la ventana (cierra a las 07:00) sin que
ninguna corrida alcanzara a notar que la preselección —turno permanente de
Claude desde el 06-10, sin plan B que lo cubra— se había quedado colgada.
El "vigía" de las 02:15 y 05:15 (`trig_01LUtn4fSJjBsCzqdoWeVviH`) debería
haber avisado al teléfono esos dos atrasos; no escribe nada en el repo, así
que no hay forma de verificar desde acá si avisó y nadie actuó, o si no
avisó.

`get_trigger` sobre los tres relojes solo trae el último disparo de cada
uno (hoy 16-10, los tres `SUCCEEDED`), no el historial del 14 ni del 15:
desde el repo no se puede saber si esos días no se dispararon, se
dispararon y la sesión falló en silencio, o pusharon y el push fue
rechazado sin reintento. Necesita que Santiago revise el historial de
corridas de esas tres rutinas para el 14 y el 15-10 desde la interfaz.

### 3. La propia auditoría matinal lleva seis mañanas fallando (no es nueva, ya estaba en PENDIENTES)

`bitacora/2026-10-13-auditoria.md`, `2026-10-14-auditoria.md` y
`2026-10-15-auditoria.md` no existen (comprobado listando `bitacora/` con
`ls`, cero coincidencias para esas tres fechas). Esto ya estaba anotado en
`bitacora/PENDIENTES.md` ("Dependen de Santiago") como tercera vez al
12-10 (07, 08 y 11-10); con 13, 14 y 15-10 son ya SEIS mañanas. La
diferencia de esta vez: el 13-10 la cadena de producción SÍ había
terminado bien ese mismo día (como el 11-10), pero el 14 y el 15 la cadena
TAMBIÉN murió (como el 07 y el 08-10), así que esta vez el silencio de la
auditoría coincide con el silencio de todo lo demás, no es un caso aislado
del turno de auditor.

## Qué siguió igual: la preselección del suplente sigue sin ver seis fuentes institucionales

Hallazgo que se repite sin cambiar nada desde que la preselección pasó de
forma permanente al suplente (06-10-2026): las seis fuentes institucionales
de `contenido/barrido/fuentes.json` sin feed propio (Contraloría, Senado,
Dirección Meteorológica, Banco Central, Ministerio Público y, según la
revisión de hoy, también la Cámara de Diputados) no se abren nunca, porque
el suplente no navega. Aparece igual en `contenido/revisiones/2026-10-12.md`
(línea 61), `2026-10-13.md` (línea 73) y hoy `2026-10-16.md` (hallazgo 9):
tres veces, mismo texto, mismo motivo, nada cambió. La decisión del
06-10-2026 (`estrategia/decisiones.md`, línea 792) que movió la preselección
al suplente se justificó diciendo que "la preselección es el único turno
que no necesita (...) entrar a las páginas, selecciona del barrido, y el
barrido ya está en el repo"; la realidad de tres revisiones seguidas es que
sí hay un residuo que antes entraba por la navegación de GPT y hoy no entra
por nadie. No es una decisión de no hacer nada (esa decisión no habla de
este residuo en particular), así que no deja de proponerse: es un hueco sin
dueño.

## Qué mejoró

- El informe corto (3-4 min, decisión del 12-10) corrió sin fricción en su
  tercera edición real: 218 s de podcast, dentro de la promesa, sin que la
  duración se haya estimado por palabras (se leyó directo de
  `episodios.json`).
- El cierre pendiente vencido del 13-10 (respuesta del sindicato de
  supervisores de Escondida) se cerró hoy correctamente, con cifra y fuente,
  en la primera edición real que tuvo después (`contenido/informes/2026-10-16.md`,
  línea 64), aunque le costó dos días de atraso por la cadena muerta. Queda
  una nueva marca `PENDIENTE DE CIERRE` (memorandos de la visita de Kast a
  Bolivia, línea 30) para la edición del 17-10-2026, correctamente anotada y
  sin vencer todavía.

## Qué dicen los números (`bitacora/metricas/`, hoy vs 15-10)

Suscriptores: 36 (+0), igual que los últimos cuatro días. Vistas totales por
suma de video: 18.362 (+812 vs 15-10), pero la cadena estuvo muerta esos dos
días así que ese delta es tráfico de videos viejos, no de nada nuevo.

**Lo único que cuenta para las 4.000 horas** (horas vistas en LARGOS, 30
días, Analytics real, no estimado): **23,3 h hoy contra 26,1 h el 15-10,
-2,8 h**; retención media ponderada de los largos **22,2% contra 29,5%,
-7,3 puntos**. Es una ventana móvil de 30 días, así que parte de la baja es
que videos viejos de alta retención salen del promedio, pero el corte
coincide con los dos días sin ningún video largo nuevo que entrar a esa
ventana. Las dos piezas largas de hoy (el informe y el Short del caso
Ronald Ojeda) están en `private` con 0 vistas, esperando el clic de
publicación de Santiago: no van a mover el número hasta que salgan.

## Propuestas

1. **Reloj del reintento (A, B y C) silencioso dos noches seguidas.**
   `.github/workflows/reintento.yml` (sin cambio de código posible desde
   acá: el problema no está en el workflow sino en que las tres rutinas no
   lo despertaron). Pedir a Santiago que revise en la interfaz el historial
   de disparos del 14 y 15-10 de `trig_016JsVfFwrJFut5vy2f4c8TS`,
   `trig_01E8tyJPqyfNdVTog477sf6Z` y `trig_01RevKvPn6mufpcUCK9fii2X`
   (`get_trigger` desde el repo solo trae el último disparo, hoy, exitoso).
2. **La auditoría no deja rastro de que corrió antes de fallar.** Ya
   propuesto en `bitacora/PENDIENTES.md` desde el 12-10: que la rutina de
   las 05:30 escriba una marca mínima (un commit con hora, aunque sea vacío
   de contenido) ANTES de armar el archivo completo, para que una auditoría
   que no llega a terminar se note sola y no dependa de la mañana siguiente.
3. **Las seis fuentes institucionales sin feed, tres revisiones seguidas sin
   dueño.** `contenido/barrido/fuentes.json`: agregarles feed propio (RSS o
   scraping) para que entren al barrido sin necesitar navegación en la
   preselección, que es exactamente la premisa con la que se decidió mover
   la preselección al suplente el 06-10.

## Triage

- **HOY**: el apagón de dos días (14 y 15-10) y su causa visible, los tres
  relojes del reintento mudos. Ya bajado a `bitacora/PENDIENTES.md`
  ("Dependen de Santiago", ampliando la entrada existente del 09/12-10).
- **HOY**: la auditoría lleva seis mañanas sin dejar rastro (07, 08, 11, 13,
  14, 15-10). Misma entrada ampliada.
- **AGUANTA**: las seis fuentes institucionales sin feed en la preselección
  del suplente. Nueva entrada en "Para la sesión de la noche".
- **MIRAR**: la caída de horas vistas en largos (-2,8 h) y de retención
  (-7,3 pp) en la ventana de 30 días. Puede ser solo el efecto de la
  ventana móvil perdiendo videos viejos de alta retención; se vuelve a
  mirar mañana cuando las dos piezas de hoy salgan de privado y empiecen a
  sumar.

## Comparación con ayer (15-10)

Ayer no hay con qué comparar la máquina ni el contenido: no corrió nada.
Lo nuevo de hoy es que la cadena volvió sola (el suplente la destrabó) y
que, por primera vez, el repo deja ver con evidencia completa (no shallow)
que la causa de un apagón de días fue el silencio simultáneo de los tres
relojes del reintento, no solo "la cadena se colgó" como en los casos
anteriores de 07/08 y 11-10.
