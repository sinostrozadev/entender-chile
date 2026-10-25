ESTADO: CON FALLAS. HOY: la auditoría matinal del 24-10-2026 nunca escribió
su archivo (ni la del informe de la mañana de esa fecha dejó rastro en el
repo), y nadie lo notó hasta esta corrida, un día después de que el apagón
del 22-10 propusiera justo la alerta que habría avisado esto. La cadena de
hoy, en cambio, corrió completa y sin fallas técnicas.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Esperada | Vuelta | Fuente |
|---|---|---|---|---|
| Barrido | 01:46 | 01:40 | (no aplica) | `contenido/estado/2026-10-25.md` |
| Preselección | 02:03 | 02:10 | APROBADA vuelta 0 | `contenido/veredictos/2026-10-25-preseleccion.md` |
| Informe | 02:16, corregido dos veces | 02:40 | APROBADA vuelta 2 (02:35) | `contenido/veredictos/2026-10-25-informe.md` |
| Guion del informe | 02:38, corregido una vez | 03:10 | APROBADA vuelta 1 (02:49) | `contenido/veredictos/2026-10-25-guion_informe.md` |
| Revisión (compuerta) | 02:50 | 03:30 | APROBADA vuelta 2 | `contenido/revisiones/2026-10-25.md` |
| Videos, descripciones, podcast | 03:00 a 03:04 (`estado: videos_listos` 03:04) | 05:15 | (no aplica) | `edicion-diaria.yml` run 40166981449, exitoso |
| Métricas | 05:05 | 05:00 | (no aplica) | `bitacora/metricas/2026-10-25.md` |
| Auditoría matinal | disparo real 05:43 (esta corrida) | 05:30 | (no aplica) | `last_run` del trigger, +13 min, dentro de tolerancia |

Horas vía `git log --diff-filter=A --date=format-local` en huso Chile sobre
cada archivo de hoy, cruzadas con `contenido/estado/2026-10-25.md` y con
`actions_list` de GitHub. Ninguna pieza llegó con más de 20 minutos de
atraso contra su hora esperada: al contrario, toda la cadena de texto y de
video terminó muy por delante del cuadro (videos listos a las 03:04 contra
las 05:15 esperadas). Las nueve corridas de "Reintento del despertar" entre
las 02:10 y las 05:36 son el reloj de respaldo cada 20 minutos
(`*/20 4-9 * * *`), y no encontraron nada que reintentar porque la cadena
nunca se atrasó. Las corridas de GitHub Actions del día (barrido, edición
diaria, estado del día, estado de la Clave, web x2, métricas, reintento x9)
terminaron todas con `conclusion: success` (`actions_list`, repo
sinostrozadev/entender-chile, rama main).

## Qué falló

### 1. HOY, nuevo: la auditoría del 24-10-2026 nunca se escribió, y la del informe de la mañana tampoco dejó rastro

`bitacora/` no tiene `2026-10-24-auditoria.md` (verificado listando la
carpeta completa: la lista de archivos `*-auditoria.md` salta del 23-10 al
25-10, el de hoy, que es esta misma corrida). Una búsqueda de commits sobre
toda la rama principal (`search_commits`, query
`repo:sinostrozadev/entender-chile "auditoría matinal 2026-10-24"`) devuelve
cero resultados. Y revisando los commits reales del 24-10-2026 de 03:00 a
09:00 UTC (`list_commits`, que no depende del clon superficial de esta
sesión), la cadena de contenido de ese día corrió completa y bien, con la
revisión aprobada y el video listo a las 03:38 Chile (06:38 UTC) y el reloj
de métricas a las 05:05 Chile (08:05 UTC); después de eso, el siguiente
commit de cualquier tipo es "guardia: despertador 08:10 [reloj]" a las 08:10
Chile (11:10 UTC). Entre las 05:05 y las 08:10 de Chile, exactamente la
ventana donde debían correr la auditoría de las 05:30 y el informe de la
mañana de las 06:00, no hay un solo commit: ni el archivo de la auditoría,
ni ningún indicio de que el guardián de las 06:00 escribiera algo (su
salida es la respuesta del chat, no un archivo, así que esta corrida no
puede afirmar si ese sí corrió, solo que no dejó huella en el repo).

Es la misma familia de falla que el apagón del 22-10 (`bitacora/PENDIENTES.md`,
sección "Para la sesión de la noche", entrada del 23-10), pero más angosta:
ese día se apagaron también los relojes de la cadena de producción
(barrido, reintentos, métricas); el 24-10 la cadena de producción funcionó
entera y a tiempo, y lo que faltó fue específicamente la capa de
autovigilancia (auditoría y guardián). Eso importa para la propuesta: la
que se dejó anotada el 23-10 (alertar si `contenido/estado/FECHA.md` no
llega a `preseleccion_lista`) no habría atrapado esto, porque el 24-10 el
estado llegó hasta `videos_listos` sin problema. Hace falta una
comprobación distinta, enfocada en la auditoría misma.

## Propuestas

1. **Vigilar que la auditoría matinal exista, no solo que la cadena de
   contenido avance.** En `.github/workflows/reintento.yml`, agregar un
   paso nuevo (junto al de la línea 70, que ya corre en el mismo cron
   `*/20 4-9 * * *`) que, cuando la hora UTC sea 08:50 o más (05:50 Chile,
   20 minutos después de la hora esperada de la auditoría), compruebe si
   `bitacora/<FECHA>-auditoria.md` existe para la fecha de hoy en Chile; si
   no, que escriba `contenido/estado/alerta-auditoria-faltante.txt` con la
   fecha y la hora, lo pushee, y notifique por un canal que no dependa de
   las rutinas de Claude, igual que se propuso el 23-10 para la cadena de
   contenido. Esta comprobación es independiente de la de `preseleccion_lista`
   porque hoy se demostró que una puede fallar sin la otra.

## Triage

- **HOY**:
  1. La auditoría faltante del 24-10 y la alerta independiente que falta
     para que no vuelva a pasar inadvertida (propuesta 1).
- **AGUANTA** (sin cambios desde la última vez que se marcaron, no se
  duplican en `PENDIENTES.md`):
  2. Las seis fuentes institucionales sin feed propio (Contraloría, Banco
     Central, Cámara de Diputados, Senado, Dirección Meteorológica y
     Ministerio Público): la preselección de hoy las declara sin abrir,
     igual que las últimas mañanas (`contenido/revisiones/2026-10-25.md`).
  3. "Carátula 3" como segunda pregunta en vez de "cifra con referencia":
     no se verificó hoy contra las carátulas reales del día, pero
     `contenido/revisiones/2026-10-25.md` no trae ese hallazgo, así que no
     hay novedad que anotar.
  4. La contradicción entre la regla de siglas y el tope de seis palabras
     de las marcas de fuente: hoy volvió a aparecer con "Senapred"
     (`contenido/revisiones/2026-10-25.md`), pero el propio veredicto dice
     que "hoy no pesa, porque Senapred es de uso corriente en Chile", así
     que no escala hoy.
- **MIRAR**:
  5. Nueve titulares de la preselección de hoy quedan "casi palabra por
     palabra" como los del barrido, con solo artículos agregados y
     puntuación cambiada (`contenido/revisiones/2026-10-25.md`, hallazgo de
     preselección). Es la primera vez que se documenta así, y coincide con
     la causa ya anotada en `PENDIENTES.md` (16-10, AGUANTA): la
     preselección la escribe el suplente, que no navega ni verifica, solo
     reescribe el barrido. Si se repite dos mañanas más, pasa a HOY.

## Comparación con ayer

Ayer, 24-10-2026, no tiene auditoría propia que comparar, que es
exactamente el hallazgo de hoy. Comparando contra `contenido/revisiones/2026-10-24.md`
y `bitacora/metricas/2026-10-24.md`, que sí existen:

**Mejoró**: el guion del informe de hoy costó una sola vuelta de corrección
(ayer costó dos, y las dos de ayer las introdujo la propia corrección
anterior); el informe de hoy, en cambio, pasó de una vuelta ayer a dos hoy,
las dos por forma (subsecciones "### [C]" y encabezados sin contenido
propio), no por contenido.

**Sigue igual**: las seis fuentes institucionales sin feed, declaradas sin
abrir tanto ayer como hoy; la duración del video (219 s hoy, 257 s ayer,
ambas dentro del formato corto de 3 a 4 minutos que decidió Santiago el
12-10-2026, no de la promesa vieja de 10 minutos); las horas vistas de los
largos en la ventana de 30 días (20,8 h hoy contra 21,0 h ayer, variación de
ruido, no una tendencia).

**Es nuevo**: el descubrimiento de que la auditoría del 24-10 nunca se
escribió, invisible hasta esta corrida; y la observación sobre titulares de
la preselección casi copiados del barrido, que no aparece en las
revisiones de los tres días anteriores.
