# taller/ : la interfaz de configuración del canal

## Para qué existe

Hasta el 28-09-2026 cada cosa configurable del canal vivía repartida en el
código y había que tocar tres archivos para cambiar una sola: una sección
nueva se agrega en `scripts/imagenes-secciones.js` (el slug y las palabras
clave), en `src/tema.ts` (el color) y en `src/pictogramas.tsx` (el dibujo), y
si uno de los tres se olvida la sección sale a medias sin que nadie lo note.
El taller es la pantalla donde eso se configura en un solo lugar.

Se arma de a poco y a pedido de Santiago: primero las dos pantallas que él
pidió el 28-09-2026, trabajos y secciones, con agregar, editar y eliminar.

## Dónde vive

`taller.html` es el archivo fuente y se publica como artefacto de claude.ai.
La página no guarda nada adentro: los datos viven en la base del artefacto
(colecciones `trabajos` y `secciones`), así que editar la página no borra lo
configurado y sembrar datos no obliga a republicar.

## Lo que todavía no hace

Lo que se configura acá **no manda todavía sobre el render**: el código sigue
leyendo sus listas. El paso siguiente es que `scripts/` lea de acá, y por eso
los campos de cada sección son exactamente los tres que hoy están repartidos
(slug, color, claves) más los dos que se verifican a ojo (imagen y
pictograma).
