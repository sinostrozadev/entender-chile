# contenido/descripciones/ : lo que se pega en YouTube

Las escribe `scripts/dia.js` (con `scripts/chapters.js`) durante el render, un
archivo por pieza: `AAAA-MM-DD-informe.txt` y `AAAA-MM-DD-clave.txt`. Traen el
texto de la descripción con sus capítulos y la divulgación de contenido
sintético. `scripts/youtube-subir.js` las lee al subir el video.

**Es salida de un script, no se edita a mano**: al volver a rendir se
reescribe.
