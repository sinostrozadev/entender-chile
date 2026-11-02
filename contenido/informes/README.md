# contenido/informes/ : la edición completa del día

La escribe GPT con `prompts/informe.md`, en la etapa `preseleccion_lista`,
trabajando sobre la olla del día. Un archivo por día, `AAAA-MM-DD.md`, ya
verificado y jerarquizado: es la fuente única del guion del video y lo que
publica la web entera.

Se corrige solo por la vía del estado: el validador deja las correcciones en
`contenido/veredictos/` y GPT reescribe. Lo que va dentro de
`<!-- interno ... -->`, al final del archivo, no se publica.

- Cada noticia ([A], [B] y cada viñeta [C]) sale en la web con un ancla propia, `id="noticia-<slug>"` y `data-noticia`, `data-nivel`, `data-categoria`; el slug sale del titular y se recalcula desde este markdown con `node scripts/slug-noticia.js <informe>` (test: `node --test scripts/slug-noticia.test.js`).
- `node scripts/diario-captura.js AAAA-MM-DD [--noticia <slug>]` captura la página del día construida en local (web/dist, 1920 px) y deja en `out/diario/` el PNG y un json con la caja de cada noticia en píxeles.
- Es la base del formato "Entender el caso" (01-11-2026): el video hace zoom a la noticia en la página real del día en que salió.
