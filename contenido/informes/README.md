# contenido/informes/ : la edición completa del día

La escribe GPT con `prompts/informe.md`, en la etapa `preseleccion_lista`,
trabajando sobre la olla del día. Un archivo por día, `AAAA-MM-DD.md`, ya
verificado y jerarquizado: es la fuente única del guion del video y lo que
publica la web entera.

Se corrige solo por la vía del estado: el validador deja las correcciones en
`contenido/veredictos/` y GPT reescribe. Lo que va dentro de
`<!-- interno ... -->`, al final del archivo, no se publica.
