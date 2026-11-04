# Auditoría matinal, 04-11-2026

Auditada el 04-11-2026 a las 05:42 de Chile, con el checkout sincronizado
contra `origin/main` (`59572e2`, "reintento: despertador 05:11 [reloj]"), y
desacoplado del historial superficial original: el primer fetch llegó
achatado (un solo commit sintético con todo el árbol fechado 02:04) y se
rehizo con `git fetch --unshallow` antes de leer ninguna hora, porque sin
eso esta auditoría habría afirmado que el barrido y la preselección de hoy
no dejaron rastro.

ESTADO: CON OBSERVACIONES. La cadena llegó completa y sin defecto visible
publicado (informe de 219 segundos, dentro de la promesa de 3 a 4 minutos),
pero GPT dejó de responder el turno de reparación del guion durante 56
minutos y el plan B tuvo que reemplazarlo para que la Edición diaria no se
atrasara más de una hora. No hay ningún `HOY`.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | 01:40 a 01:41 | 01:30 a 01:31 | éxito, 10 a 11 min tarde | commits `6ba5e31d` "despertador 2026-11-04 [reloj]" y `5478f148` "barrido 2026-11-04 [bot]" |
| Observatorio plata pública | 01:54 | 01:45 | éxito | commit `83282dda` "observatorio 2026-11-04 [claude]" |
| Preselección | redactada 01:50, veredicto 01:57 | tras `barrido_listo` | APROBADA vuelta 0, sin corrección | `contenido/veredictos/2026-11-04-preseleccion.md`; 56 candidatas, doce áreas cubiertas (resumen de la revisión) |
| Informe | redactado 02:04 (vuelta 0), CORREGIR 02:17 (vuelta 1), CORREGIR 02:23 (vuelta 2) | tras cada pieza | APROBADA vuelta 2, 02:27 | `contenido/veredictos/2026-11-04-informe.md`: la corrección de la vuelta 1 borró sin querer el paréntesis de fuente de un párrafo, y la vuelta 2 lo repuso |
| Guion del informe | redactado 02:31 (vuelta 0), CORREGIR 02:40 (vuelta 1) | tras cada pieza | GPT no respondió `reparar_guion_informe`; APROBADA vuelta 1 a las 03:44, escrita por el suplente a las 03:40 | commits `9886cef` "plan B activado 2026-11-04: GPT sin responder reparar_guion_informe" (03:36) y `72517e3` "disparo al suplente" (03:37); `contenido/estado/plan-b.txt` |
| Revisión (compuerta) | 03:45 | tras cada pieza | APROBADA vuelta 1 | `contenido/revisiones/2026-11-04.md` |
| Carátula | 02:33 | con la edición | éxito, sin reintentos | `contenido/caratulas/2026-11-04.png`; sin archivo `NO-PUDE` |
| Edición diaria (render, voz, video, Short, podcast, subida programada) | arrancó 03:46, `videos_listos` 04:04 | ~02:50 | éxito, 56 min tarde por el bloqueo de GPT arriba | commits `a1b063a` "edición 2026-11-04 [bot]" y `85f69b4` "estado: videos_listos" |
| Web | con cada push relevante | continuo | éxito | Actions "Web" run 452, `conclusion: success` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial) | cuando corresponda | sin novedad, no es hallazgo | sin commits en `contenido/claves/`, `contenido/guiones/claves/` ni `contenido/estado/clave-*` después de las 00:08 (trabajo de la noche, anterior a la cadena de hoy) |
| Reloj de métricas, Métricas | 05:05 a 05:06 | 05:00 | éxito, 5 a 6 min tarde | `bitacora/metricas/2026-11-04.md`, commit `4126bdd` |
| Vigía de la cadena | 02:15 y 05:16 | 02:15 y 05:15 | `ROUTINE_RUN_STATUS_SUCCEEDED` en ambas, sin aviso | `get_trigger` sobre `trig_01LUtn4fSJjBsCzqdoWeVviH`: el bloqueo de GPT (02:40 a 03:36) cayó entre las dos corridas, así que ninguna llegó a verlo atascado |

Duración real: 219 segundos (3:39), dentro de la promesa de 3 a 4 minutos
(`contenido/podcast/episodios.json`, episodio del 04-11). Validador de
tarjetas: `node scripts/validar-tarjetas.js --fecha 2026-11-04` → 469
palabras narradas (~3,5 min), un aviso por cifra exacta en la Carátula 3
("445.703"), que es un falso positivo ya conocido (ver hallazgo 2).

## Qué falló

1. **GPT no respondió el turno `reparar_guion_informe` (vuelta 1) durante 56
   minutos, y el plan B tuvo que reemplazarlo.** La corrección se pidió a las
   02:40 (`contenido/estado/reparar_guion_informe`) y nadie la entregó hasta
   que `reintento.yml` activó el plan B a las 03:36:58 UTC
   (`contenido/estado/plan-b.txt`: "GPT no respondio el turno
   reparar_guion_informe (vuelta 1) en 24 min tras dos avisos"), con el
   suplente escribiendo la pieza a las 03:40. La Edición diaria, que suele
   arrancar cerca de las 02:50, no arrancó hasta las 03:46: 56 minutos de
   atraso, sobre el umbral de 20 minutos que esta auditoría usa para marcar
   algo aunque haya terminado bien. Es la primera vez que el plan B se activa
   justo sobre `reparar_guion_informe`: las tres veces anteriores fueron
   `barrido_listo` (03 y 04-10-2026) y `reparar_preseleccion` (06-10-2026,
   que acabó haciendo permanente el cambio de dueño de la preselección). El
   plan B de hoy vence hoy mismo (`plan-b.txt`, línea `hasta: 2026-11-04`) y
   `reintento.yml` lo borra solo.

2. **`scripts/validar-tarjetas.js` vuelve a marcar una cifra de carátula
   como si fuera voz narrada, el mismo falso positivo que ya se documentó el
   21-10-2026 y que nunca se corrigió.** Hoy avisó "línea 5: cifra exacta en
   voz (\"445.703\")" sobre la Carátula 3, que el propio prompt pide con cifra
   y que nunca se narra (`contenido/veredictos/2026-11-04-guion_informe.md`,
   observación 5). Comprobado en el código: el filtro de `narradas` (línea
   96 de `scripts/validar-tarjetas.js`) sí excluye "Título sugerido:",
   "Descripción sugerida:" y "Guion:", pero el bloque de cifra exacta usa un
   filtro más angosto en la línea 159 (`!/^(\[|## |#)/`) que no excluye las
   líneas de carátula. Es exactamente el hueco que se marcó el 21-10 (ese día
   en la línea 153, corrida a la 159 porque el archivo creció) y que sigue
   en `bitacora/PENDIENTES.md` sin tocarse.

3. **El video "¿Qué ocurre cuando Contraloría detecta un perjuicio fiscal?"
   (id `NaMLfrB4nzU`) desapareció del listado de métricas de hoy sin ningún
   AVISO, mismo patrón de pérdida de video que `bitacora/PENDIENTES.md`
   documenta desde el 27-10-2026.** Comparando
   `bitacora/metricas/2026-11-03.json` contra el de hoy con Python: el video
   estaba público ayer y hoy no aparece en absoluto (ni público ni privado),
   mientras que sí aparecen tres IDs nuevos, dos del día (el informe y su
   Short) y uno que es un video privado del 14-09-2026 que nunca había
   salido en una medición anterior ("Clave: ¿Quién decide cuánto gasta el
   Estado cada año? #Short", `NIXSupEy11Q`). El conteo del encabezado calza
   exacto con la pérdida (221 subidos, 215 públicos ayer; 223 subidos, 214
   públicos hoy: +3 nuevos, -1 perdido). Es la misma causa que ya se
   documentó siete veces en octubre: la paginación de `yt.videos.list` en
   `scripts/metricas.js` no compara los id pedidos contra los que
   realmente llegaron.

4. **El Short del día no se publicó dos de los últimos tres días (01 y
   03-11-2026), justo el producto que la decisión del 01-11-2026 puso como
   principal para construir audiencia.** Verificado contra
   `bitacora/metricas/2026-11-04.json`: el último Short publicado con fecha
   propia es el del 02-11-2026 ("¿Por qué un Imacec de 0,2% no es una buena
   noticia?"); no hay ninguno fechado 01 ni 03-11. El de hoy
   ("El repunte de octubre no borró las pérdidas reales de los fondos...")
   existe pero sigue privado, pendiente de la ventana de revisión de
   Santiago antes de las 12:00. Ninguna de las auditorías de estos tres días
   nombró el Short por separado en su tabla, así que el hallazgo también es
   que esta auditoría no lo venía mirando.

Sin fallas que hayan roto la cadena de hoy ni que llegaran al video o a la
web con un defecto visible.

## Propuestas

- En `scripts/validar-tarjetas.js`, línea 159, copiar la exclusión de
  cabeceras que ya usa la línea 96 (agregando "Carátula") al filtro del
  bloque de cifra exacta, para que las líneas "Carátula sugerida:",
  "Carátula N:" no se lean como voz narrada. Mismo arreglo pedido el 21-10 y
  nunca aplicado.
- Sin propuesta de código nueva para el bloqueo de GPT en
  `reparar_guion_informe`: el plan B ya existe y funcionó. Si el mismo turno
  vuelve a fallar una tercera vez (dos ya bastaron para que `reparar_preseleccion`
  pasara a dueño permanente el 06-10), ahí sí conviene decidir si
  `reparar_guion_informe` pasa también a Claude de forma permanente.
- Sin propuesta de código para la pérdida de video en métricas: la
  propuesta concreta ya está en `bitacora/PENDIENTES.md` (sección "Para la
  sesión de la noche", entrada del 27-10, `scripts/metricas.js` línea 55)
  y sigue sin aplicarse.
- Para el Short: no es un bug de código, es una decisión editorial de
  cadencia que la propia decisión del 01-11 ya acepta ("no sale todos los
  días"). Propuesta de proceso, no de archivo: que la auditoría de mañana
  en adelante incluya el Short como fila propia de la tabla, para que la
  meta de audiencia tenga un número que se mire todos los días y no solo
  cuando alguien lo note por casualidad.

## Triage

- **HOY**: ninguno.
- **AGUANTA**: ninguno nuevo (los dos hallazgos de código, el falso positivo
  de `validar-tarjetas.js` y la pérdida de video en métricas, ya están en
  `bitacora/PENDIENTES.md` desde el 21-10 y el 27-10 respectivamente; hoy
  solo se confirma que siguen sin corregirse, con evidencia nueva).
- **MIRAR**:
  - El bloqueo de GPT en `reparar_guion_informe` durante 56 minutos: primera
    vez en esta pieza puntual; mirar si se repite cuando el plan B de hoy
    venza.
  - El Short sin publicar dos de los últimos tres días (01 y 03-11),
    mientras la meta de audiencia depende de que salga seguido.
  - Las vueltas de corrección del día (informe y guion) se concentraron en
    cifras, redondeo en voz, tope de cifras por bloque, discrepancia entre
    la carátula y el informe, que la propia revisión de hoy describe como un
    patrón desde el 06-10-2026. No es un bug con archivo y línea: contar
    menciones de "cifra" en las revisiones de octubre y noviembre confirma
    que es una fricción recurrente (0 a 9 menciones según el día), no algo
    puntual de hoy, pero tampoco algo para lo que exista todavía una
    propuesta de prompt concreta.
  - El boletín 18817-07 sigue PENDIENTE DE CIERRE, cuarto día (01 al
    04-11-2026), aunque desde el 03-11 el informe ya no promete una fecha
    que no tiene (mejora de forma sobre la misma deuda).

Buscado en `estrategia/decisiones.md` y `bitacora/REALIZADOS.md`: no hay
ninguna decisión de "no hacer" sobre el falso positivo de
`validar-tarjetas.js`, la pérdida de video en métricas ni el boletín
18817-07. Sobre el Short, la decisión del 01-11 sí acepta explícitamente que
"no sale todos los días", así que la cadencia en sí no es un hallazgo nuevo,
pero tampoco hay decisión que exima de medirla todos los días.

## Comparación con ayer

Mejoró: los tres hallazgos que la auditoría de ayer bajó por primera vez a
`bitacora/PENDIENTES.md` (el clasificador de áreas mandando fútbol a
"Ciencia y tecnología", la URL de Interferencia rota y el cuadro del panel
con la hora vieja de Edición diaria) se corrigieron la misma noche del
03-11 y hoy se sostienen los tres: cero fútbol en "Ciencia y tecnología"
(`contenido/barrido/2026-11-04.md`), las dos URL de Interferencia de hoy
llegan limpias, y `bitacora/cronograma.json` ya dice "~02:50" para Edición
diaria. Sigue igual: las seis fuentes institucionales sin feed y la fricción
de las vueltas de corrección en torno a cifras. Nuevo: el plan B se activó
por primera vez sobre `reparar_guion_informe` en vez de sobre `barrido_listo`
o `reparar_preseleccion`, la carátula se generó sin problemas por primera
vez en dos días (ayer fallaron las tres variantes por inventar un rostro),
y la pérdida de video en métricas y el Short sin publicar, ninguno de los
dos nuevo como bug, pero sí la primera vez que esta auditoría los mide con
evidencia propia en vez de dejarlos solo en la lista viva de otros días.
