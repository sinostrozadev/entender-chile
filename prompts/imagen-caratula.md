# Imagen de carátula (opción 3)

Quién la hace: **GPT**, que desde el 23-09-2026 se encarga de todo lo que sea
navegar páginas y generar imágenes. Una por edición del informe.

Dónde queda: `contenido/caratulas/FECHA.png` (o .jpg). `scripts/dia.js` la
copia sola a `public/caratulas/` y la usa para `miniatura-3.png`. Si el día no
llegó ninguna imagen, la tercera carátula sale igual con el pictograma: la
edición NUNCA se frena por esto.

## Cuando te llega un pedido (así trabaja GPT)

El evento `contenido/estado/ultimo-evento-pedido.txt` trae `tarea=imagen`,
`pedido=` con el archivo del encargo y `salida=` con la ruta exacta donde
tiene que quedar la imagen. Entonces:

1. Lee el archivo de `pedido=`. Bajo el encabezado va la DESCRIPCIÓN concreta
   de la imagen de ese día: úsala tal cual, no la reinterpretes.
2. Genera la imagen respetando todo lo de abajo (16:9, sin texto, sin
   personas reconocibles, nada fotorrealista).
3. Súbela al repo, rama `main`, en la ruta EXACTA de `salida=`. El nombre y
   la extensión importan: `scripts/dia.js` busca `contenido/caratulas/FECHA`
   con extensión png, jpg, jpeg o webp, y no busca en ninguna otra parte.
4. Si por lo que sea no puedes subir un archivo binario al repo, NO lo dejes
   en silencio: escribe `<salida sin extensión>-NO-PUDE.md` explicando qué
   falló y dónde quedó la imagen. Un pedido sin respuesta deja una rutina
   esperando con el reloj corriendo.

Mientras la imagen no exista en `salida=`, el pedido sigue abierto y te va a
volver a llegar.

## Qué imagen pedir

UNA metáfora visual de la noticia de portada. No la escena literal de la
noticia: el objeto o la situación que resume la idea, con una vuelta. Si el
tema es cuánta lluvia cae, no un paisaje lluvioso: un vaso de medir
desbordado, una regadera del tamaño de un cerro, un paraguas hecho pedazos
por el peso del agua. Si el tema es plata que no se cobró, no un edificio
público: una alcancía con la ranura tapada, una boleta que se enrolla sin
final. La prueba: si al verla alguien piensa "ah, buena", sirve; si piensa
"una foto de archivo", no.

## Reglas duras

- **Sin texto.** Ni letras ni números ni cifras dentro de la imagen: eso lo
  pinta el código encima. Una imagen con texto generado se descarta.
- **Sin personas reconocibles**, sin caras de figuras públicas, sin logos,
  marcas ni banderas.
- **Nada que parezca una fotografía del hecho.** Regla 29: la imagen es un
  identificador ilustrado, nunca el registro de lo que pasó. Estilo
  ilustración editorial, grabado o serigrafía; jamás fotorrealista.
- **Nada morboso**: sin sangre, sin cuerpos, sin armas apuntando, sin
  sufrimiento explícito. La monetización se revisa y esto la rompe.

## Cómo tiene que verse

- **Formato 16:9**, mínimo 1280 x 720.
- **Paleta de la casa**, dos o tres tintas: fondo oscuro (tinta #17191C o el
  color de la sección oscurecido), acento cobre #D08A5B, papel #F2F2EF.
- **Composición con el texto en mente**: el sujeto va al centro o a la
  derecha, y el TERCIO INFERIOR IZQUIERDO queda despejado y oscuro, porque
  ahí se pintan los dos banners del gancho. Una imagen bonita con el motivo
  abajo a la izquierda no sirve: queda tapada.
- **Un solo sujeto, grande.** La carátula se ve a 168 píxeles de ancho en un
  teléfono: lo que no se lee en un cuadrado de dos centímetros no existe.

## El pedido, para pegar tal cual

> Ilustración editorial en 16:9 (1280x720) para la carátula de un video de
> noticias de Chile. Tema: <la noticia de portada en una frase>. Quiero una
> METÁFORA VISUAL ingeniosa, no la escena literal. Estilo grabado o
> serigrafía de tres tintas: fondo oscuro, acento cobre cálido, blanco
> papel. Un solo sujeto grande, centrado a la derecha del cuadro. El tercio
> inferior izquierdo tiene que quedar despejado y oscuro (ahí va el texto).
> SIN texto, sin letras ni números en la imagen. Sin personas reconocibles,
> sin logos, sin banderas. Nada fotorrealista.
