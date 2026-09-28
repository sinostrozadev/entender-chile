# contenido/config/ : lo que el taller manda sobre el código

## El problema que resuelve

El taller vive en claude.ai y sus datos viven en la base del artefacto. La
edición corre en GitHub Actions, que **no puede leer esa base**: son dos
mundos que no se hablan. Así que un taller que solo escribe en su base sería
una pantalla bonita que no cambia ningún video, que es exactamente el taller
que Santiago devolvió el 28-09-2026 por no entenderlo.

El puente es esta carpeta. Lo que se configura en el taller baja a un JSON
acá, se commitea, y el código lo lee. Un archivo en el repo es además la
única forma de que un cambio quede con fecha, autor y posibilidad de volver
atrás, que es como se trabaja todo lo demás del proyecto.

## Cómo baja

Hoy, a mano: la sesión de día lee la base del taller y escribe el archivo en
el mismo commit. Cuando haya más de una pantalla conectada conviene que lo
haga una rutina, pero un paso manual con commit es mejor que un automatismo
que nadie mira.

## La regla de lectura

**El código nunca depende de que el archivo exista.** Cada valor que se lee
de acá tiene su respaldo escrito en el código, y si el archivo falta, está
roto o le falta una clave, se usa el respaldo y se sigue. Esto corre a las
tres de la mañana sin nadie mirando: un JSON mal formado no puede costar la
edición del día.

## Qué hay

| Archivo | Qué manda | Quién lo lee |
|---|---|---|
| `trabajos.json` | las pausas de voz de cada pieza | `scripts/pausas.js` |
