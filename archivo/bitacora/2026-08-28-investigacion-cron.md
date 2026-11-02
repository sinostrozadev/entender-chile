# Investigación: por qué el barrido nunca llegó a tiempo

Hecha el 28-08-2026 a pedido de Santiago, que pidió investigar bien antes
de decidir en vez de quedarse con "el cron llegó tarde". La conclusión
cambió y resultó peor de lo que parecía.

Santiago pidió investigar bien antes de decidir, en vez de quedarse con
"el cron llegó tarde". Bien pedido: la conclusión cambia.

### Lo verificado

Los dos crones están bien escritos y nunca se editaron: barrido `30 6 * * *`
(06:30 UTC = 02:30 Chile) y edición `0 9 * * *`. Las ejecuciones atrasadas
son eventos `schedule` reales, no despachos manuales.

Los atrasos fueron normales tres días y después se rompieron:

| Workflow | Cron UTC | Día | Corrió | Atraso |
|---|---|---|---|---|
| Edición | 09:00 | 24-08 | 09:36 | 36 min |
| Edición | 09:00 | 25-08 | 09:24 | 24 min |
| Edición | 09:00 | 26-08 | 09:30 | 30 min |
| Edición | 09:00 | 27-08 | 19:19 | 10h 19m |
| Edición | 09:00 | 28-08 | no corrió | mas de 10h |
| Barrido | 06:30 | 27-08 | 17:50 | 11h 20m |
| Barrido | 06:30 | 28-08 | 18:54 | 12h 24m |

Lo disparado por `push` no se ve afectado: la web lleva 30 de 30, tres de
ellas hoy. El trabajo del barrido dura 17 segundos, así que no es cola
propia. El repo es privado; los minutos consumidos van en unos 200 de 2.000,
así que tampoco es la cuota.

### Lo que eso significa, que es lo grave

Cruzando cuándo se creó cada archivo de barrido contra cuándo se escribió el
informe de ese mismo día:

| Fecha | Barrido creado | Informe escrito | |
|---|---|---|---|
| 26-08 | 27-08 03:54 UTC | 26-08 07:47 UTC | 20 h tarde |
| 27-08 | 27-08 17:50 UTC | 27-08 07:33 UTC | 10 h tarde |
| 28-08 | 28-08 18:54 UTC | 28-08 07:36 UTC | 11 h tarde |

**Ni una sola vez el barrido estuvo disponible cuando se escribió la edición
de su día.** No es que llegue tarde: es que no ha llegado nunca.

Y está confesado por escrito en la preselección de hoy, al final: *"El
archivo contenido/barrido/2026-08-28.md no existía en main, por lo que se
realizó un barrido manual amplio."*

Consecuencia: las 22 fuentes, la deduplicación, la continuidad de siete días
y el criterio de exclusivas de investigación **no han sido leídos nunca por
ninguna preselección**. Todas las ediciones han corrido por el camino de
respaldo, que se escribió para emergencias.

Dos cosas se explican solas con esto:

- El arreglo del bug de `origen` encontró 21 exclusivas de CIPER, Ex-Ante e
  Interferencia, y no se notó ninguna mejora. Claro: nadie leyó esa salida.
- Parte de que "las noticias no convencen" viene de aquí. La selección lleva
  cinco días corriendo sobre un plan B.

### El mecanismo confiable ya existe en el proyecto

Las rutinas de Claude en la nube son puntuales al minuto:

    revisión 2026-08-25  08:41 UTC
    revisión 2026-08-26  08:42 UTC
    revisión 2026-08-27  08:42 UTC
    revisión 2026-08-28  08:43 UTC

Cuatro días seguidos, dos minutos de desviación total. El observatorio corre
por el mismo camino (07:12 y 07:28 UTC) y también llega antes de la edición.

O sea: el problema no es el diseño ni la hora elegida. **06:30 UTC es la hora
correcta**, una hora antes de que se escriba la edición. El problema es quién
aprieta el botón.

### Lo que corrijo de lo que dije antes

Dije "el cron se atrasó trece horas" y propuse disparar por `push`. Las dos
cosas siguen en pie, pero el `push` **solo arregla el render**, que ocurre
después de que existe el guion. El barrido necesita un reloj, porque tiene
que pasar antes de que alguien escriba. Son dos problemas distintos y
antes los junté en uno.

### Los tres relojes del proyecto, medidos

Vale la pena dejarlo escrito porque cambia a quién hay que copiarle.

**ChatGPT, las tareas programadas. Trece de trece, sin una sola falla.**

| Día | Preselección | Informe | Guion | Clave |
|---|---|---|---|---|
| 25-08 | | 07:45 | 08:03 | 08:18 |
| 26-08 | | 07:47 | 08:03 | 08:17 |
| 27-08 | | 07:33 | 08:16 | 07:47 |
| 28-08 | 07:14 | 07:36 | 08:15 | 07:49 |

(El 24-08 fue la puesta en marcha, a mano. La preselección solo existe desde
el 28 porque se programó para empezar ese día.)

Cuatro informes, cuatro guiones, cuatro claves y la primera preselección:
**trece entregas programadas, trece cumplidas, ninguna fuera de orden.** La
dispersión del informe es de catorce minutos en cuatro días, la del guion
trece. Y la preselección, en su primer día, llegó 22 minutos antes del
informe, que es exactamente el orden que necesita.

**Claude en la nube. Puntual al minuto.**

    revisión  08:41, 08:42, 08:42, 08:43 UTC (cuatro días)
    observatorio  07:12 y 07:28 UTC (dos días)

**GitHub Actions por cron. El único que falla.**

    barrido   2 ejecuciones programadas, las dos entre 11 y 12 horas tarde,
              cero útiles
    edición   5 programadas: 3 razonables, 1 diez horas tarde, 1 nunca corrió

### Lo que esto explica de paso

La fiabilidad de ChatGPT tapó el problema. Durante cinco días su tarea
programada cubrió la ausencia del barrido haciendo su propio barrido manual,
todos los días, sin fallar. Por eso nadie notó que la máquina de barrido no
estaba entregando: **el componente más confiable enmascaró la caída de otro.**

Y deja una hora de referencia dura: el barrido tiene que estar en el repo
antes de las 07:10 UTC, que es cuando arranca la preselección. El cron a las
06:30 da cuarenta minutos de margen. La hora estaba bien elegida.

### Opciones, para decidir de noche

1. **Mover el barrido a la rutina de Claude en la nube**, la misma que ya
   corre puntual. Es la que tiene evidencia a favor dentro de este proyecto.
   Costo: consume uso de la cuenta y cambia el modo de falla, que pasa a
   depender de Anthropic en vez de GitHub.
2. **Correrlo desde la máquina local** con un cron a las 02:30 Chile. Fiable
   si el equipo está encendido a esa hora.
3. **Dejar de tratarlo como un trabajo aparte** y hacerlo el primer paso del
   proceso que escribe, para que no exista la carrera. Es lo más limpio
   conceptualmente, pero exige que quien escribe pueda ejecutar el script.
4. **Un despachador externo** que llame a `workflow_dispatch`. Agrega una
   dependencia más.
5. **Repo público**: minutos ilimitados y mejor trato de la programación,
   pero expone prompts, estrategia y notas internas. Es decisión de fondo.
6. **Plegarlo a la tarea de ChatGPT**, que es el reloj más confiable que
   tenemos y que además ya hace el barrido de respaldo todos los días.
   Consistiría en darle explícitamente la lista de `fuentes.json` para que su
   propio barrido cubra las 22 fuentes. Ventaja: fiabilidad demostrada de
   trece sobre trece y cero piezas móviles nuevas. Costo: se pierde lo que
   el script calcula y un modelo no calcula igual de bien, que es la
   deduplicación, la continuidad de siete días y la detección de exclusivas.

El plan detallado del híbrido está en `bitacora/2026-08-28-plan-barrido.md`.

Entre la 1 y la 6 hay un híbrido que probablemente sea lo correcto: que el
cálculo lo siga haciendo `barrido.js`, porque eso es aritmética y conviene
que sea determinista, y que el botón lo apriete uno de los dos relojes que sí
cumplen. Lo que no puede seguir es que lo apriete el cron de GitHub.

## Las horas reales, y la trampa del 6 de septiembre

Santiago dio las horas de sus tareas de ChatGPT: preselección 03:10, informe
03:30, claves 03:45, guion informe 04:00 (lo movió hoy desde las 04:15) y
guion claves 04:15 (desde las 04:30). Contra lo medido, ChatGPT dispara
entre cuatro y seis minutos después de su hora, todos los días.

Con esas horas, el cambio de hora del **domingo 6 de septiembre** rompe dos
piezas, no una: el barrido pasaría a llegar veinte minutos después de la
preselección, y el observatorio después del informe, con lo que la alerta de
"¿En qué quedó?" dejaría de salir. Las dos fallas, silenciosas.

Tabla completa de quién ejecuta qué, hoy y en la propuesta, en
`bitacora/2026-08-28-quien-ejecuta-que.md`. Respuesta corta a la pregunta de
Santiago: **no hace falta programarle otra tarea a ChatGPT.**
