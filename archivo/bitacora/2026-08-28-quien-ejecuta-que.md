# Quién ejecuta qué: hoy y la propuesta

Escrito el 28-08-2026 con las horas reales que dio Santiago. Chile está hoy
en UTC-4.

## Cómo está programado hasta hoy

| Hora Chile | UTC | Pieza | Quién ejecuta | ¿Cumple? |
|---|---|---|---|---|
| 02:30 | 06:30 | Barrido | GitHub Actions, cron | **No. Nunca a tiempo** |
| 03:00 | 07:00 | Observatorio | Rutina Claude nube | Sí (medido 03:12, 03:28) |
| 03:10 | 07:10 | Preselección | ChatGPT, tarea | Sí (medido 03:14) |
| 03:30 | 07:30 | Informe | ChatGPT, tarea | Sí (medido 03:36) |
| 03:45 | 07:45 | Claves | ChatGPT, tarea | Sí (medido 03:49) |
| 04:00 | 08:00 | Guion informe | ChatGPT, tarea | Sí (era 04:15) |
| 04:15 | 08:15 | Guion claves | ChatGPT, tarea | Sí (era 04:30) |
| 04:40 | 08:40 | Revisión | Rutina Claude nube | Sí (medido 04:41 a 04:43) |
| 05:00 | 09:00 | Render y release | GitHub Actions, cron | **Parcial: 3 de 5 días** |

Las horas del observatorio y de la revisión ya no son inferencia: salen de la
configuración real de las rutinas. Observatorio `0 7 * * *` UTC con Opus 5,
revisión `40 8 * * *` UTC con Sonnet 5.

ChatGPT dispara entre cuatro y seis minutos después de su hora programada,
todos los días. Es el componente más preciso del sistema.

**Los dos únicos que fallan son los dos que dependen del cron de GitHub.**

## La trampa del cambio de hora, con fuente

No es una suposición. **Decreto N°98, publicado el 2 de julio de 2026**: el
horario de verano empieza a la medianoche del **sábado 5 de septiembre de
2026**. Al pasar de las 23:59 del sábado, los relojes saltan a la 01:00 del
domingo 6. Rige hasta el primer sábado de abril de 2027. Chile continental
queda en UTC-3.

**La primera edición afectada es la del domingo 6 de septiembre**, que se
escribe en la madrugada de ese domingo. Faltan nueve días.

Aplica porque las tareas de ChatGPT están fijadas en hora de Chile: la
preselección programada a las 03:10 salió a las 07:14 UTC, que son las 03:14
de Chile. Si estuvieran en UTC, no habría problema. Las tareas de ChatGPT están
fijadas en hora de Chile, así que se mueven **una hora antes en UTC**. Todo
lo que esté fijado en UTC se queda donde está.

Consecuencia, con las horas de hoy:

| Pieza | Hora Chile hoy | Hora Chile desde el 6-09 | |
|---|---|---|---|
| Barrido (UTC 06:30) | 02:30 | **03:30** | 20 min **después** de la preselección |
| Observatorio (UTC 07:00) | 03:00 | **04:00** | después del informe, y encima del guion |
| Preselección | 03:10 | 03:10 | |
| Informe | 03:30 | 03:30 | |
| Revisión (UTC 08:40) | 04:40 | 05:40 | sigue bien, solo más tarde |
| Render (UTC 09:00) | 05:00 | 06:00 | sigue bien |

Se rompen dos cosas, no una:

- **El barrido** llegaría después de la preselección todos los días. Da lo
  mismo que se arregle el disparo si la hora queda mal.
- **El observatorio** llegaría después del informe. Sus hitos alimentan la
  alerta de "¿En qué quedó?", así que esa alerta dejaría de aparecer, en
  silencio.

Y las dos fallas serían invisibles, porque los respaldos las taparían.

### Corrección a lo que escribí antes

En `bitacora/2026-08-28-plan-barrido.md` dije que el reloj nuevo había que
expresarlo en hora de Chile. **No se puede**: las rutinas de Claude aceptan
cron solo en UTC. Así que la solución no es cambiar de marco, es **elegir una
hora UTC que funcione en los dos regímenes**, y así no hay que tocar nada en
septiembre.

## Un riesgo que ya existe hoy, sin esperar a septiembre

Mirando la ejecución real de hoy del observatorio: se disparó a las 07:21:44
UTC (su ancla es 07:01, o sea veinte minutos de deriva) y terminó a las
07:28:59. **La tarea del informe arranca a las 07:30.**

Sesenta y un segundos de margen. Si el observatorio hubiera tardado dos
minutos más, sus hitos no habrían estado en el repo cuando ChatGPT leyó, y la
alerta de "¿En qué quedó?" no habría salido, sin que nadie se enterara.

Las rutinas de Claude son mucho más puntuales que el cron de GitHub, pero no
son exactas: la deriva observada va de un minuto (revisión) a veintiuno
(observatorio). Hay que dejar margen para eso.

## La propuesta

| Hora Chile hoy | Hora Chile desde el 6-09 | UTC | Pieza | Quién ejecuta | Cambia |
|---|---|---|---|---|---|
| 01:00 | 02:00 | 05:00 | **Barrido y observatorio, misma rutina** | Rutina Claude nube | **sí** |
| 03:10 | 03:10 | 07:10 / 06:10 | Preselección | ChatGPT | no |
| 03:30 | 03:30 | 07:30 / 06:30 | Informe | ChatGPT | no |
| 03:45 | 03:45 | 07:45 / 06:45 | Claves | ChatGPT | no |
| 04:00 | 04:00 | 08:00 / 07:00 | Guion informe | ChatGPT | no |
| 04:15 | 04:15 | 08:15 / 07:15 | Guion claves | ChatGPT | no |
| 04:40 | 05:40 | 08:40 | Revisión | Rutina Claude nube | no |
| al llegar el guion | igual | por evento | Render y release | **GitHub Actions por push** | **sí** |

Márgenes, contando la deriva de hasta veintiún minutos que ya se observó:

- Hoy: termina cerca de la 01:30 Chile en el peor caso. La preselección es a
  las 03:10. Casi dos horas.
- Desde el 6 de septiembre: termina cerca de las 02:30. Cuarenta minutos.

Nunca se cruzan, y no hay que acordarse de mover nada en septiembre ni en
abril. El costo es perder lo que se publique entre la 01:00 y las 03:10, que
en la prensa chilena de madrugada es prácticamente nada.

### El barrido, en detalle, y por qué no es una rutina nueva

**No conviene crear una tercera rutina.** El observatorio ya se dispara todos
los días, ya trabaja sobre un checkout del repo y ya pushea. El barrido entra
como su **primer paso**, antes de investigar los casos.

Ese orden importa: el barrido queda commiteado en los primeros segundos, así
que aunque la parte pesada del observatorio falle después, el barrido del día
ya está. Acoplarlos sin ese cuidado sería cambiar una avería por otra.

Lo que hace ese primer paso: despacha `barrido.yml`, comprueba que terminó
bien y que el archivo quedó en `main`, y si algo falló corre
`node scripts/barrido.js` ella misma y pushea. Puede, porque el script no
tiene dependencias. El cron de GitHub se queda de red.

### El render, en detalle

Pasa de la hora al evento: se dispara con el `push` de los guiones. Pero hay
un detalle que hay que resolver o queda peor que ahora: **el guion del
informe llega a las 04:00 y el de la Clave a las 04:15.** Si el disparo
escucha solo al del informe, arranca a las 04:00 y el video de la Clave se
omite porque su guion todavía no existe.

Solución: escuchar `contenido/guiones/**` con un grupo de concurrencia y
`cancel-in-progress: true`. El push de las 04:00 arranca una ejecución, el de
las 04:15 la cancela y la relanza con todo presente. Como el render tarda
unos 45 minutos, el video queda listo cerca de las 05:00, igual que hoy.

## ¿Hay que programarle otra tarea a ChatGPT?

**No.**

- El barrido necesita ejecutar node, y ChatGPT no puede. Por eso ese trabajo
  no le corresponde.
- Las cinco tareas de escritura ya existen, ya están en el orden correcto y
  cumplen todos los días.
- Lo que falta no es una tarea más: es un disparador confiable para el
  barrido y una comprobación que avise cuando el respaldo se activa.

Lo único que conviene tocar del lado de ChatGPT es una línea de
`prompts/seleccion.md`: hoy, cuando el archivo del barrido no está, anota el
aviso al final del documento, donde nadie lo lee. Que lo anote arriba, en la
primera línea, para que salte a la vista en la auditoría de la mañana.

Y si algún día se decide plegar el barrido a ChatGPT (la opción 6), tampoco
sería una tarea nueva: sería darle la lista de `fuentes.json` dentro del
prompt de preselección que ya corre.

## Un efecto secundario bueno del cambio que ya hiciste

Adelantar el guion del informe a las 04:00 y el de la Clave a las 04:15 le
dio aire a la revisión: antes la Clave cerraba a las 04:30 y la revisión
empezaba a las 04:41, con once minutos de margen. Ahora son veinticinco.

## ¿Cuánto cuesta mover el barrido a una rutina de Claude?

Plata, nada: el plan Max no cobra por uso. Lo que se consume es **cupo del
plan**, y en este proyecto eso ya fue un problema real: el 25-08 se lanzaron
seis agentes a la vez y agotaron la ventana de cinco horas.

Lo que cuestan hoy las dos rutinas que ya corren, medido en su última
ejecución:

| Rutina | Modelo | Duró |
|---|---|---|
| Observatorio (10 dossiers, búsquedas web) | Opus 5 | 7 min 15 s |
| Revisión (lee 4 documentos, escribe veredicto) | Sonnet 5 | 2 min 9 s |

Una rutina solo para el barrido sería mucho más liviana que cualquiera de las
dos: despachar un workflow y comprobar un resultado. Sin razonamiento, sin
búsquedas. Bastaría un modelo chico.

**Pero la respuesta correcta es que no cuesta casi nada, porque no hace falta
una rutina nueva.** Metido como primer paso del observatorio, que ya se
dispara todos los días, lo que se agrega son unos veinte segundos de ejecutar
un script sin dependencias y un commit. El cupo extra es despreciable.

Comparado con lo que se gana: hoy el barrido no llega nunca, y desde el 6 de
septiembre el observatorio también se rompería.
