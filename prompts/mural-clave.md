# El mural de la Clave: un solo paisaje en paneles

Prompt vivo del pedido de imágenes de una Clave, desde el 07-10-2026. Reemplaza
al pedido de imágenes sueltas por sección.

## Por qué existe

Las imágenes de sección se pedían de a una y se cortaban entre sí. Ese corte
nunca se pudo tapar: ningún sonido lo disimulaba y la transición caía siempre a
destiempo. La respuesta no fue afinar la transición sino que no hubiera
transiciones: un solo paisaje horizontal por el que la cámara viaja y se
detiene sobre cada sección.

**Probado entero el 07-10-2026 con los catorce paneles.** De las trece
junturas, diez llegaron bajo el umbral de 45 y tres por encima (7->8 con 56,
12->13 con 49 y 13->14 con 56). Cosidas, doce de trece quedaron invisibles y la
decimotercera empató con la variación propia de su ventana. GPT los hizo por
separado, en dos conversaciones distintas, y aun así encajaron: lo que hace
encajar no es pedirlos juntos, es describir LA CADENA DE SUPERFICIES, con qué
termina cada panel y con qué empieza el siguiente.

**La prueba de que el método funciona es la juntura 10->11**, la única que cruza
dos conversaciones: midió 39 y quedó invisible, porque el prompt de la segunda
tanda llevaba adentro el color medido de la entrega del panel 10.

## Las tres reglas que no se negocian

1. **La numeración.** Panel N es sección N, siempre. La parada de la cámara se
   calcula desde la posición del panel, así que si vienen en otro orden o dos
   secciones comparten panel, el calce se rompe entero y hay que rehacerlo.
2. **El motivo en la mitad derecha.** La cámara se estaciona con el texto a la
   izquierda. La mitad izquierda de cada panel es solo superficie.
3. **Las franjas de entrega.** Los primeros 300 píxeles y los últimos 300 de
   cada panel son superficie limpia, sin un objeto ni un borde. Ahí se funden
   los paneles, con solape de 500 px (900 cuando la diferencia de luz entre dos
   paneles es grande, como el paso de un mesón claro a azul petróleo). El solape
   ancho se decide con la medición en la mano, juntura por juntura, no parejo.

## Qué se mide cuando llegan, antes de coser

- El color de cada franja de entrega contra el de la que recibe. Bajo 45 de
  distancia euclidiana en RGB, la juntura va a ser invisible.
- El salto de luz en los 1000 px alrededor de cada juntura ya cosida, **contra
  el percentil 90 de esa misma ventana** y no contra un número suelto. Un mural
  tiene luz que cambia por sí sola, así que un umbral fijo acusa costuras que no
  existen: el 07-10 dio 0,038 en una juntura que resultó ser el borde natural de
  un mesón. Si el paso supera a su propia ventana, se recorta y se mira.
- El contraste del texto en cada parada, con el velo real encima. Mínimo 4,5:1.
- La parada de cada sección se calcula para que su motivo quede centrado en el
  lado derecho del cuadro.

## El límite de GPT

**GPT entrega como máximo 10 imágenes por solicitud** (lo dijo él mismo el
07-10-2026, al pedirle los 14 paneles). Así que una Clave de 14 secciones se
pide en dos tandas. El corte NO es arbitrario: la tanda 2 se pide recién
después de medir la franja de entrega del último panel de la tanda 1, y esos
colores van dentro de su prompt. Es exactamente lo que hizo que el panel 2
calzara con el 1 a un 3,1% de desviación. Pedir las dos tandas a ciegas, una
detrás de otra, es lo único que puede romper la cadena.

Conviene además que el corte caiga en una juntura de poco contraste (dos
superficies oscuras parecidas) y no en un salto de luz grande, porque esa es la
juntura más difícil de reproducir de memoria entre dos conversaciones.

## El tope de textura, resuelto

Con 14 paneles y solape por juntura el mural quedó en 27.580 px, muy por encima
del tope de textura del navegador (16.384 en la mayoría). Chromium no avisa:
deja el fondo negro. La salida no fue cambiar imágenes con la cámara detenida
sino **partir el mural en tres y poner los tres trozos contiguos en el DOM**.
Como van a escala 1:1, no hay subpíxel que deje una línea entre uno y otro, y el
componente acepta `mural` como lista. Lo hace `scripts/mural-coser.js`, que cose,
mide las junturas y parte, todo en una pasada.

Una trampa que costó una tanda entera de mediciones: componer con sharp sobre un
lienzo de 3 canales, usando capas con alfa, devuelve RGBA. Leer ese búfer como
RGB da una imagen rayada que parece corrupta y manda cualquier medición al tacho.

## El pedido

Se arma con los motivos que el propio GPT escribió para las imágenes de sección
(`contenido/guiones/claves/FECHA-<slug>-imagenes.md`), más la cadena de
superficies, que la escribe Claude mirando el guion: tiene que ir de lo frío e
institucional a lo cálido e histórico y terminar sereno, acompañando el arco de
la Clave.

## El velo, ajustado el 07-10-2026

El velo que oscurece la izquierda terminaba de golpe: bajaba de 0,5 a cero entre
el 50% y el 64% del ancho y ahí paraba. Sobre un panel oscuro no se notaba, pero
sobre el panel 5, que es claro, aparecía una línea vertical de arriba abajo. La
medición decía que esa línea no existe (el mayor salto entre columnas vecinas
era 0,017, puro borde de letra): es banda de Mach, el ojo inventa el filo donde
se quiebra la pendiente. Ahora la bajada tiene dos paradas más y no se quiebra.

En la misma revisión apareció una segunda línea, esta sí real, en el panel 5 a la
altura del mesón. Medida en el mural crudo, sin velo, da el mismo salto: es el
canto del mesón que dibujó GPT, no una costura. **Cuando la medición y el ojo
discrepan, se mira más de cerca antes de decidir, y a veces el que se equivoca
es el ojo.**
