# Plan del híbrido: quién calcula y quién aprieta el botón

Escrito el 28-08-2026 por la sesión de día. **No implementado**: esta sesión
no toca workflows ni scripts. Esto es para ejecutar de noche.

El diagnóstico que lo motiva está en `bitacora/2026-08-28.md`: el barrido
nunca ha estado disponible cuando se escribe la edición de su día, y las
cinco ediciones han corrido por el camino de respaldo.

## La idea en una línea

El cálculo se queda donde está, porque es aritmética y conviene que sea
determinista. Lo único que se muda es el reloj.

## Por qué se puede separar limpiamente

Dos cosas verificadas hoy que hacen esto fácil:

**`barrido.js` no tiene dependencias.** Sus únicos `require` son `fs` y
`path`. No necesita `npm install`, no usa secrets, no toca la red más que
para bajar los feeds. Corre en cualquier parte que tenga node.

**Los despachos manuales en Actions no se atrasan.** La única ejecución
`workflow_dispatch` del barrido arrancó en el mismo segundo en que se creó
(27-08, 03:55:09Z creado, 03:55:09Z iniciado, terminado a las 03:55:26Z:
diecisiete segundos). El atraso es exclusivo del evento `schedule`.

O sea: la infraestructura de Actions funciona bien. Lo que no funciona es su
despertador.

## El plan

### Pieza 1: el reloj pasa a una rutina de Claude en la nube

Es el mecanismo del proyecto con puntualidad medida: la revisión llegó a las
08:41, 08:42, 08:42 y 08:43 UTC cuatro días seguidos.

La rutina hace tres cosas y nada más:

1. Despacha el workflow `barrido.yml` (`actions_run_trigger`).
2. Espera y comprueba que la ejecución terminó en éxito y que
   `contenido/barrido/<hoy>.md` está en `main`.
3. **Si algo de eso falló, corre `node scripts/barrido.js` ella misma y
   pushea.** Puede hacerlo porque el script no tiene dependencias.

El paso 3 es lo que vuelve robusto al plan sin costo: la misma rutina es el
reloj y el ejecutor de respaldo. Si Actions está caído, el barrido igual
llega.

El prompt de la rutina tiene que ser corto y acotado a eso. Una rutina que
"revisa el proyecto" termina haciendo otras cosas y fallando en la suya.

### Pieza 2: el cron de GitHub se queda, pero solo como red

No se borra: si la rutina no dispara, el cron todavía puede salvar el día
alguna vez. Pero deja de ser el mecanismo principal.

### Pieza 3: la guarda contra sobrescritura, que hoy no existe

`barrido.js` escribe `${fecha}.json` y `${fecha}.md` sin comprobar nada
(líneas 233 y 260; el único `existsSync` del archivo, en la línea 166, es
para leer los días previos, no para protegerse).

Con el plan puesto, esto se vuelve un problema real: si el cron atrasado
dispara a las 18:54 cuando la rutina ya escribió el archivo a las 06:32, lo
regenera con material de la tarde y pisa el barrido de la mañana. Se
corrompe el archivo histórico y, peor, se ensucia la detección de
continuidad de los días siguientes, que lee esos archivos.

Arreglo: una bandera del tipo `--si-falta` que haga que el script no escriba
si ya existe el `.md` de esa fecha. La usa el camino automático; un despacho
manual deliberado puede seguir forzando la regeneración.

### Pieza 4: la detección, que es la lección de verdad

Esto pasó cinco días sin que nadie lo notara porque **el respaldo es
silencioso**. La preselección dice al final "el archivo no existía, hice un
barrido manual", y nadie lo lee.

Dos comprobaciones, en la auditoría de la mañana (skill `bitacora`):

- ¿Existe `contenido/barrido/<hoy>.md`?
- ¿Se creó **antes** que `contenido/preseleccion/<hoy>.md`?

Si alguna falla, va como hallazgo del día. Un respaldo que se activa sin
avisar es un respaldo que tapa la avería en vez de arreglarla.

## Los tiempos, y la trampa de septiembre

Los márgenes medidos hoy:

    06:30 UTC  barrido (dispara la rutina, corre en 17 s)
    07:14 UTC  arranca la preselección       margen: 44 minutos
    07:36 UTC  arranca el informe
    08:15 UTC  guion
    08:43 UTC  revisión de Claude

La hora del cron estaba bien elegida. Pero hay un problema con fecha:

**Chile cambia a horario de verano el primer domingo de septiembre**, o sea
en poco más de una semana. El cron del barrido está fijado en UTC
(`30 6 * * *`) y las tareas de ChatGPT están fijadas, casi con certeza, en
hora de Chile. Cuando Chile adelante una hora, las tareas de ChatGPT se
mueven una hora **antes** en UTC y el barrido no se mueve.

Con los números de hoy: la preselección pasaría de las 07:14 a las 06:14
UTC, y el barrido seguiría a las 06:30. **Llegaría veinte minutos tarde,
todos los días, en silencio**, y el respaldo lo taparía otra vez.

Por eso el reloj nuevo hay que expresarlo en el mismo marco que las tareas
de ChatGPT, no en UTC fijo. Y hay que verificar a qué hora de Chile están
programadas realmente esas tareas, dato que hoy no está escrito en ninguna
parte del repo y que solo Santiago puede mirar.

Nota: `barrido.js` ya calcula bien la fecha en hora de Chile y la ventana del
día se resuelve en vivo, así que el script no se rompe con el cambio. Lo que
se rompe es la coordinación entre relojes.

## Modos de falla, y qué pasa en cada uno

| Qué falla | Qué ocurre |
|---|---|
| El despacho a Actions | La rutina corre el script ella misma y pushea |
| Actions completo | Igual, la rutina lo cubre |
| La rutina de Claude no dispara | Queda el cron de GitHub, poco fiable, y el respaldo de la preselección. La auditoría lo detecta al día siguiente |
| Una fuente no responde | Por verificar: hay que confirmar que el script tolera un feed caído y escribe lo que sí obtuvo |
| El cron atrasado dispara de tarde | Con la guarda `--si-falta`, no escribe nada |

## Lo que este plan NO arregla

**El render.** Ese es el otro problema y tiene otra solución: disparar
`edicion-diaria.yml` por `push` a `contenido/guiones/informe/**`, porque ahí
el disparo natural es la llegada del guion y no una hora. Los junté en un
solo punto ayer y son dos.

## Cómo se sabe mañana si funcionó

En la auditoría de la mañana:

    ls -la contenido/barrido/$(date +%F).md
    git log --diff-filter=A --format='%cd %s' --date=format-local:'%H:%M' \
      -- contenido/barrido/$(date +%F).md contenido/preseleccion/$(date +%F).md

El barrido tiene que aparecer antes que la preselección. Y en la preselección
de mañana, la sección "Notas del barrido" debería dejar de decir que el
archivo no existía.

Esa frase desapareciendo es la única prueba de que esto quedó arreglado.

## Orden sugerido para la noche

1. La guarda `--si-falta` en `barrido.js`. Sin ella, el plan puede corromper
   el archivo histórico.
2. Averiguar a qué hora de Chile corren las tareas de ChatGPT y anotarlo en
   el repo. Sin ese dato no se puede fijar bien el reloj nuevo.
3. Crear la rutina, con el prompt acotado a las tres acciones.
4. Sumar las dos comprobaciones a la skill `bitacora`.
5. Recién después, el disparo por push del render.
