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

Las horas del observatorio y de la revisión están inferidas de sus commits y
de `estrategia/decisiones.md`; conviene confirmarlas.

ChatGPT dispara entre cuatro y seis minutos después de su hora programada,
todos los días. Es el componente más preciso del sistema.

**Los dos únicos que fallan son los dos que dependen del cron de GitHub.**

## La trampa del 6 de septiembre

Chile pasa a horario de verano el **domingo 6 de septiembre de 2026**
(primer domingo del mes), y se va a UTC-3. Las tareas de ChatGPT están
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

## La propuesta

| Hora Chile hoy | Hora Chile desde el 6-09 | UTC | Pieza | Quién ejecuta | Cambia |
|---|---|---|---|---|---|
| 01:30 | 02:30 | 05:30 | Barrido | **Rutina Claude nube** | **sí** |
| 01:45 | 02:45 | 05:45 | Observatorio | Rutina Claude nube | **sí, la hora** |
| 03:10 | 03:10 | 07:10 / 06:10 | Preselección | ChatGPT | no |
| 03:30 | 03:30 | 07:30 / 06:30 | Informe | ChatGPT | no |
| 03:45 | 03:45 | 07:45 / 06:45 | Claves | ChatGPT | no |
| 04:00 | 04:00 | 08:00 / 07:00 | Guion informe | ChatGPT | no |
| 04:15 | 04:15 | 08:15 / 07:15 | Guion claves | ChatGPT | no |
| 04:40 | 05:40 | 08:40 | Revisión | Rutina Claude nube | no |
| al llegar el guion | igual | por evento | Render y release | **GitHub Actions por push** | **sí** |

Márgenes que quedan, en los dos regímenes:

- Barrido a preselección: 1 h 40 hoy, 40 min desde el 6-09. Nunca se cruza.
- Observatorio a informe: 1 h 45 hoy, 45 min desde el 6-09. Nunca se cruza.

El costo de adelantar el barrido a la 01:30 es perder lo que se publique
entre la 01:30 y las 03:10, que en la prensa chilena es prácticamente nada.
A cambio, no hay que acordarse de mover nada en septiembre ni en abril.

### El barrido, en detalle

La rutina hace tres cosas: despacha `barrido.yml`, comprueba que terminó
bien y que el archivo quedó en `main`, y si algo falló corre
`node scripts/barrido.js` ella misma y pushea. Puede hacerlo porque el
script no tiene dependencias. El cron de GitHub se queda de red.

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
