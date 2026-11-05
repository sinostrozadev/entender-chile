# contenido/podcast/ : los episodios del feed

`episodios.json` lo escribe `scripts/podcast-subir.js` al publicar cada
episodio: un registro por pieza con su audio, duración y fecha. El feed RSS que
lee Spotify lo arma la web a partir de este archivo (`web/`, republicado por
`web.yml`).

**De dónde sale el audio hoy**: es la voz del guion narrado del informe
(`contenido/guiones/informe/FECHA.md`). `scripts/dia.js` arma la narración y
deja `public/FECHA-informe.mp3`, y `podcast-subir.js` sube ese archivo. Desde
el 04-11-2026 el informe en video está apagado, pero el guion y su mp3 siguen
porque de ellos salen el Short y el podcast. Que el podcast pase a leer el
diario escrito (`contenido/informes/FECHA.md`) está decidido desde el
01-11-2026 pero no construido.

**Es dato del sistema, no se edita a mano.**
