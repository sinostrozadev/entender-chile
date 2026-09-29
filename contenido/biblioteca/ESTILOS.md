# Los estilos de la biblioteca

Para qué existe esta ficha: para no volver a discutir el estilo cada vez que se
pide una imagen. Acá está lo que define cada uno (colores medidos, no
recordados), qué promete, dónde sirve, y el bloque de texto que se pega al
final de cualquier prompt para que la imagen salga de esa familia.

Los colores están **medidos sobre el material real**, no elegidos de memoria:
el video promedia una luminancia de 77 sobre 255, las imágenes del estilo papel
promedian entre 228 y 236, y las del estilo oscuro entre 43 y 51. Ese es el
número que decidió cuál rige.

## Estilo OSCURO (el que rige desde el 29-09-2026)

| | |
|---|---|
| fondo | `#23262A`, gris azulado muy oscuro, parejo |
| trazo | `#E8E7E1`, hueso, GRUESO y parejo |
| luminancia media | 43 a 51 sobre 255 |
| formato | 16:9, sin borde, sin marco, sin texto |
| dónde vive | `contenido/biblioteca/oscuro/<concepto>-a.png` y `-b.png` |

**Premisa**: el video es oscuro. Una imagen clara a mitad de un párrafo prende
la pantalla y obliga al ojo a readaptarse cada quince segundos. El estilo no se
eligió por gusto sino por esa medición: 77 contra 228 es un salto que se siente
en el cuerpo; 77 contra 47 no se siente.

**Qué significa**: sobriedad sin solemnidad. Es la línea de un manual técnico,
no la de una ilustración editorial. No opina sobre la noticia: nombra de qué
habla.

**Dónde sirve**: en todo lo que va sobre el video (tarjetas de párrafo, fondos
de sección, mezclas de dos conceptos). Es el estilo por defecto.

**Dónde NO sirve**: en la web y en las carátulas, que viven sobre fondo claro y
donde este trazo se pierde.

    Fondo de un gris azulado muy oscuro y parejo (#23262A), sin textura,
    sin viñeta y sin degradado. Trazo hueso (#E8E7E1), grueso y de grosor
    constante, sin relleno, sin sombras y sin brillos. Un solo motivo,
    centrado, ocupando el cuadro con aire alrededor. 16:9, 1920 x 1080.
    Sin texto, sin letras, sin números, sin marcos, sin logos, sin marca de
    agua. Nada reconocible: ningún lugar identificable ni persona real.

## Estilo PAPEL (existe, no rige)

| | |
|---|---|
| fondo | `#EFEFEC`, hueso claro, con textura de papel muy leve |
| trazo | tinta oscura, FINO y parejo, de grabado antiguo |
| luminancia media | 228 a 236 sobre 255 |
| dónde vive | `contenido/biblioteca/papel/<concepto>-a.png` y `-b.png` |

**Premisa**: el grabado de manual, que da autoridad sin gritar. Es el estilo que
yo recomendé primero y que la medición descartó para el video.

**Qué significa**: archivo, documento, cosa impresa. Envejece bien.

**Dónde sirve**: fuera del video. La web, una carátula de fondo claro, un PDF,
una miniatura sobre blanco. También en un tramo del video que sea
deliberadamente distinto (una cita, un "en qué quedó"), justamente porque el
salto de luz se nota: ahí el salto es la intención.

    Fondo de papel claro y parejo, color hueso (#EFEFEC), con una textura de
    papel apenas perceptible. Trazo de tinta oscura, fino y de grosor
    constante, como un grabado de manual antiguo, sin relleno y sin sombras.
    Un solo motivo, centrado, con aire alrededor. 16:9, 1920 x 1080.
    Sin texto, sin letras, sin números, sin marcos, sin logos, sin marca de
    agua. Nada reconocible: ningún lugar identificable ni persona real.

## Lo que el recorte agrega a los dos

Desde que existe `scripts/recortar-imagen.js` cualquier imagen de la biblioteca
se puede guardar **sin fondo**. Eso no es un tercer estilo: es lo que vuelve
combinables a los dos anteriores.

- el dibujo se puede poner sobre la imagen de la sección, sobre una trama o
  sobre un color, sin que aparezca su rectángulo;
- se puede TEÑIR, porque el recorte guarda la forma y no el color: el mismo
  atril puede salir hueso en una sección y del color de la sección en otra;
- **dos dibujos se pueden superponer**, que es el juego de mezclar (la PDI mas
  la muerte). Sin transparencia esa mezcla no existe, porque un rectángulo
  tapa al otro.

## Reglas que valen para cualquier estilo que se agregue

Esto no se negocia por estilo, viene de las reglas duras del canal:

1. **Nada reconocible** (regla 29): ni un lugar identificable, ni una persona
   real, ni un logo, ni una marca. Un atril, no La Moneda.
2. **Sin texto dentro de la imagen.** El texto lo pone el video, que sabe de
   qué tamaño y en qué idioma.
3. **Un solo motivo.** Dos motivos en una imagen es una escena, y una escena
   cuenta una historia que la noticia quizás no dice.
4. **16:9 y 1920 x 1080.** Los generadores entregan 1672 x 941 sin pedirlo;
   sirve, pero conviene pedir el tamaño.
5. **La prueba de los catorce segundos**: mírala catorce segundos seguidos, que
   es lo que dura un párrafo. Si a los cinco ya cansa, sobra detalle.
