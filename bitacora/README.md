# bitácora: el puente entre la sesión de día y la de noche

Santiago usa la sesión en la nube durante el día para analizar, decidir y
anotar ideas. Al llegar a casa abre la sesión local para ejecutar. Esta
carpeta es lo único que tiene que leer para pasar de una a otra.

## Dónde vive esto y por qué aquí

No en el `CLAUDE.md` global ni en `~/.claude/skills/`: el contenedor de la
sesión en la nube se recicla, así que todo lo que viva ahí se pierde, y
además la sesión local nunca lo vería. **El repo es la única superficie
compartida entre las dos sesiones.** Por eso la bitácora es una carpeta
versionada y la rutina es una skill del proyecto, no del usuario.

## Qué hay

    bitacora/PENDIENTES.md        la lista viva. Lo único que no caduca.
    bitacora/AAAA-MM-DD.md        lo que se habló y decidió ese día.
    bitacora/AAAA-MM-DD-auditoria.md   el análisis de la mañana.

`PENDIENTES.md` existe porque un archivo por día pierde continuidad: lo que
no se hizo el lunes desaparece de la vista el martes. Ahí no.

## La rutina

**En la mañana**, la sesión de día corre `/bitacora auditoria`: mide el
estado real del proyecto contra lo que la estrategia promete y escribe
`AAAA-MM-DD-auditoria.md`. Compara con la auditoría anterior: qué mejoró,
qué sigue igual, qué apareció nuevo.

**Durante el día** se conversa. Cada decisión, hallazgo o idea se anota en
`AAAA-MM-DD.md` a medida que ocurre, no al final.

**Al cerrar**, la sesión de día corre `/bitacora cierre`: deja el archivo
del día ordenado y actualiza `PENDIENTES.md`.

**En la noche**, Santiago lee `PENDIENTES.md` y el archivo del día, y
ejecuta desde ahí.

## La regla que separa las dos sesiones

Desde el 28-08-2026: **la sesión de día no toca el comportamiento del
proyecto.** No modifica prompts, scripts, workflows ni `src/`. Solo lee,
analiza, recomienda y escribe aquí. Todo cambio de código o de prompt lo
ejecuta la sesión de la noche, decidido por Santiago.

Cuando el análisis encuentre algo que hay que arreglar, se escribe en
`PENDIENTES.md` con el archivo y la línea. No se arregla.
