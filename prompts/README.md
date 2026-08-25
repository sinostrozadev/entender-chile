# prompts/ - los cuatro prompts que corre la automatización

Estos son los prompts canónicos que `scripts/generar.js` envía a la API cada
madrugada. Son las mismas versiones que corrían en las tareas de ChatGPT, con
una diferencia: las secciones de "Biblioteca" (handoff y persistencia) NO se
usan aquí - el sistema inyecta el contenido fuente al final del mensaje entre
etiquetas XML (<informe>, <clave>, <indice>) y guarda las salidas en
contenido/ automáticamente. generar.js antepone además una cabecera que le
ordena al modelo ignorar cualquier mención a la Biblioteca que quede en el
texto, así que no necesitas limpiar nada a mano.

REGLA DE ORO: si cambias un prompt, cámbialo AQUÍ y commitea. Este directorio
es la única fuente de verdad desde que existe la automatización; las tareas de
ChatGPT quedan como respaldo apagado o borradas.
