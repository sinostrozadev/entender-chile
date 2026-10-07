# El mural de la Clave: un solo paisaje en paneles

Prompt vivo del pedido de imágenes de una Clave, desde el 07-10-2026. Reemplaza
al pedido de imágenes sueltas por sección.

## Por qué existe

Las imágenes de sección se pedían de a una y se cortaban entre sí. Ese corte
nunca se pudo tapar: ningún sonido lo disimulaba y la transición caía siempre a
destiempo. La respuesta no fue afinar la transición sino que no hubiera
transiciones: un solo paisaje horizontal por el que la cámara viaja y se
detiene sobre cada sección.

**Probado el 06 y el 07-10-2026 con seis paneles reales.** Las cinco junturas
calzaron (distancias de 8, 7, 35, 13 y 15 sobre un umbral de 45) y cuatro de
cinco quedaron con salto de luz bajo 0,020, o sea invisibles. GPT los hizo por
separado y aun así encajaron, porque lo que hace encajar no es pedirlos juntos:
es describir LA CADENA DE SUPERFICIES, con qué termina cada panel y con qué
empieza el siguiente.

## Las tres reglas que no se negocian

1. **La numeración.** Panel N es sección N, siempre. La parada de la cámara se
   calcula desde la posición del panel, así que si vienen en otro orden o dos
   secciones comparten panel, el calce se rompe entero y hay que rehacerlo.
2. **El motivo en la mitad derecha.** La cámara se estaciona con el texto a la
   izquierda. La mitad izquierda de cada panel es solo superficie.
3. **Las franjas de entrega.** Los primeros 300 píxeles y los últimos 300 de
   cada panel son superficie limpia, sin un objeto ni un borde. Ahí se funden
   los paneles, con solape de 420 px (900 cuando la diferencia de luz entre dos
   paneles es grande, como el paso de un mesón claro a azul petróleo).

## Qué se mide cuando llegan, antes de coser

- El color de cada franja de entrega contra el de la que recibe. Bajo 45 de
  distancia euclidiana en RGB, la juntura va a ser invisible.
- El salto de luz en los 1000 px alrededor de cada juntura ya cosida. Bajo
  0,020 no se ve. Si da más, se mira el recorte antes de decidir: el 07-10 una
  juntura dio 0,038 y resultó ser el borde natural de un mesón, no una costura.
- El contraste del texto en cada parada, con el velo real encima. Mínimo 4,5:1.
- La parada de cada sección se calcula para que su motivo quede centrado en el
  lado derecho del cuadro.

## Un riesgo conocido

Con 14 paneles el mural pasa de 29.000 píxeles de ancho y puede superar el tope
de textura del navegador (suele ser 16.384). Si el render sale negro, se parte
el mural en dos imágenes y se cambian con la cámara detenida, que no se nota.

## El pedido

Se arma con los motivos que el propio GPT escribió para las imágenes de sección
(`contenido/guiones/claves/FECHA-<slug>-imagenes.md`), más la cadena de
superficies, que la escribe Claude mirando el guion: tiene que ir de lo frío e
institucional a lo cálido e histórico y terminar sereno, acompañando el arco de
la Clave.
