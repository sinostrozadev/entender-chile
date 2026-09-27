# contenido/secciones/ : las imágenes de sección del video

Una imagen fija por sección (economía, seguridad, salud, internacional, clima,
y las demás de `scripts/imagenes-secciones.js`), reutilizada todos los días. No
representan ninguna noticia: son el fondo sobre el que se pinta el rótulo.

Las genera **GPT a mano, desde el chat**, con los prompts de
`PROMPTS-PARA-PEGAR.md`, y Santiago guarda el archivo en la ruta que dice cada
bloque; la cuota del despachador se reserva para las piezas y la carátula
diaria. Las variantes se comparan rindiendo `src/taller-secciones.tsx`, y
`dia.js` las copia a `public/secciones/` (ignorado por git) para que Remotion
las sirva.
