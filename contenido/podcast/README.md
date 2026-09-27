# contenido/podcast/ : los episodios del feed

`episodios.json` lo escribe `scripts/podcast-subir.js` al publicar cada
episodio: un registro por pieza con su audio, duración y fecha. El feed RSS que
lee Spotify lo arma la web a partir de este archivo (`web/`, republicado por
`web.yml`).

**Es dato del sistema, no se edita a mano.**
