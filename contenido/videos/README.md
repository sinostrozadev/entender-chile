# contenido/videos/ : ids de YouTube viejos (carpeta histórica)

Hasta el 04-09-2026 acá quedaba un archivo por pieza (`AAAA-MM-DD-informe.txt`,
`AAAA-MM-DD-clave.txt`) con el id del video subido, para que la web embebiera
el reproductor. Desde esa fecha nada escribe en esta carpeta:
`scripts/youtube-subir.js` deja el id en `out/FECHA/youtube-id.txt` y no lo
copia acá.

La carpeta se conserva porque la web todavía lee estos ids viejos para las
ediciones de esos días. Para el resto el video llega como `null` y la web lo
tolera: simplemente no muestra reproductor (`youtubeId` en
`web/src/lib/contenido.ts`).

No se agregan archivos a mano. Si algún día vuelve a hacer falta embeber los
videos nuevos, el escritor se arma de nuevo; no se rellena esto a mano.
