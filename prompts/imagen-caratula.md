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
   personas reconocibles, y nunca la escena de la noticia).
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
- **Nada que parezca una fotografía DEL HECHO.** Regla 29: la imagen es un
  identificador de ambiente, nunca el registro de lo que pasó. Puede verse
  fotográfica si muestra un objeto o un ambiente genérico; no puede mostrar
  la escena de la noticia.
- **Nada morboso**: sin sangre, sin cuerpos, sin armas apuntando, sin
  sufrimiento explícito. La monetización se revisa y esto la rompe.

## Cómo tiene que verse

- **Estilo: imagen fotorrealista de ambiente** (regla 29 ampliada por
  Santiago el 23-09). Fondo DESENFOCADO a la izquierda, sujeto NÍTIDO a la
  derecha, contraluz, profundidad de campo real. Se permite que parezca una
  fotografía, con su luz, su textura y su grano, porque lo que se muestra es
  AMBIENTE U OBJETO y no afirma nada sobre la noticia.
- **El límite que no se cruza**: la imagen NUNCA representa el hecho
  noticioso. Un paraguas bajo la lluvia, sí; el río desbordado de hoy, el
  choque, la marcha o el edificio del que habla la nota, JAMÁS. Eso sería un
  registro falso de algo que nadie fotografió. Y en ningún caso lugares
  identificables ni personas reconocibles.
- **El cobre NO va en la imagen.** El acento cobre queda reservado para el
  banner del texto, que es donde tiene que pegar. La ilustración va en azul
  noche, grafito y blanco frío, con las luces cálidas al mínimo. Si la
  imagen también es cobre, el banner deja de resaltar y la carátula se
  aplana (probado el 23-09 con el paraguas).
- **Formato 16:9**, mínimo 1280 x 720.
- **Paleta de la imagen**: azul noche, grafito y blanco frío. El cobre
  #D08A5B no se usa acá: vive en el banner del texto.
- **Composición con el texto en mente** (corregido el 23-09 al montar la
  primera imagen real): el sujeto va arriba y a la DERECHA, y queda libre y
  oscura **la mitad inferior izquierda**, no el tercio. Los dos banners del
  gancho son anchos y altos: con un tercio no alcanza y le comen la base al
  motivo.
- **El detalle que lleva la idea va en la parte ALTA del sujeto.** En la
  primera prueba, la banda de cobre que marcaba "el nivel esperado" era la
  idea entera de la imagen y quedó justo detrás del texto. Lo que explica la
  metáfora tiene que vivir en el tercio superior del cuadro.
- **Un solo sujeto, grande.** La carátula se ve a 168 píxeles de ancho en un
  teléfono: lo que no se lee en un cuadrado de dos centímetros no existe.

## El pedido, para pegar tal cual

> Imagen fotorrealista en 16:9 (1280x720) para la carátula de un
> video de noticias de Chile. Tema: <la noticia de portada en una frase>.
> Quiero una METÁFORA VISUAL ingeniosa, no la escena literal. Fondo
> atmosférico DESENFOCADO a la izquierda y el sujeto NÍTIDO arriba a la
> derecha, con contraluz y profundidad de campo. Puede parecer una
> fotografía. Paleta azul noche, grafito y blanco frío; nada de cobre ni naranjo
> en la imagen. La MITAD INFERIOR IZQUIERDA queda oscura y despejada, ahí va
> el texto. SIN texto, sin letras ni números. Sin personas reconocibles, sin
> lugares identificables, sin logos, sin banderas.
