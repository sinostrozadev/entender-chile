# revisar/ - fuera del circuito, pendiente de decisión

Nada de lo que está aquí participa del funcionamiento diario. Se movió porque
dejó de calzar con cómo trabaja el proyecto: el barrido lo hace un script, la
edición la escribe ChatGPT (que abre las páginas y lee el contenido completo),
y Claude en la nube hace observatorio y revisión.

Para cada archivo: por qué salió y qué decidir. Al decidir, se borra o se
devuelve a su lugar, y la línea se saca de aquí.

## generar.js
Era el plan B por API de Claude: si faltaba una pieza de la edición, la
generaba. Sale porque **no se va a usar la API** (el plan Max ya cubre el
trabajo) y porque nunca corrió de verdad: sin `ANTHROPIC_API_KEY` cargada,
fallaba o no hacía nada.

Con esto **el proyecto queda sin plan B**: si ChatGPT no pushea la edición de
madrugada, el gate falla y ese día no hay video. Es una decisión consciente,
no un olvido.
**Decidir**: qué plan B se quiere, si alguno. Opciones: reintentar la tarea de
GPT, avisar por push a Santiago para que la corra a mano, o renderizar el
informe de ayer marcado como repetición. Hoy: ninguno.

## propuesta-pipeline-editorial.md
La propuesta del 26-08 para separar el pipeline en etapas. Su contenido se
implementó (barrido, `prompts/seleccion.md`, olla de 50, preselección
commiteada), pero recomendaba lo contrario de lo que se decidió: que
`generar.js` y la API fueran el camino principal. Queda como registro de cómo
se llegó acá, no como plan.
**Decidir**: borrarla (lo vigente vive en los prompts y en el README), o
conservar solo la sección de evaluación de la selección, que no se implementó.

## temario maestro historia de Chile.md
71 KB de temario histórico. Ningún prompt ni script lo referencia: no entra a
ninguna ejecución.
**Decidir**: si es material para las Claves de historia, tiene que estar
enganchado a `prompts/claves.md` para servir de algo. Si no, se borra.

## informe-claude.mp3, logo-claude.mp3
Camas musicales alternativas. El pipeline solo usa `public/musica/informe.mp3`,
`clave.mp3` y `logo.mp3`; estas dos no las lee nadie.
**Decidir**: escucharlas contra las que están en uso y quedarse con una sola
versión de cada una.

## guion-real-2026-08-23.md
Guion de prueba de agosto, en una carpeta `pruebas/` que ya no existía en el
flujo. `ejemplos/guion-2026-08-23.md` cumple la misma función y sí está
referenciado en la documentación de `parse.js`.
**Decidir**: borrar, salvo que sirva como caso de prueba distinto del ejemplo.
