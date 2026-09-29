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
donde este trazo se pierde. Y no sirve para mezclar dos conceptos en una
imagen: para eso está el estilo sin fondo.

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

## Estilo GRABADO, sin fondo (desde el 29-09-2026)

| | |
|---|---|
| fondo | ninguno: PNG con canal alfa de verdad |
| trazo | de pluma, firme y de grosor variable; el volumen se hace con ACHURADO |
| tinta | una sola, hueso `#E8E7E1`, sin viraje sepia ni cálido |
| formato | 1920 x 1080, el motivo con aire alrededor |
| dónde vive | `contenido/biblioteca/sin-fondo/<concepto>-a.png` |

**Premisa**: la ilustración de diario del siglo XIX, antes de que existiera la
fotografía impresa. Se soltó todo lo que era una restricción de gusto (un solo
objeto, sin escena, sin profundidad) y se apretó lo que es sistema: una sola
tinta y nada que parezca una cámara.

Por qué esta dirección y no el fotorrealismo, que es la alternativa real: una
foto convincente de algo que nadie fotografió es justo lo que el canal promete
no hacer, y un render envejece mal mientras que un grabado no tiene fecha. La
identidad, decidida el 25-08-2026, ya lo dice: sobriedad radical, papel, tinta
y un acento verde cobre.

**Y es el estilo que hace posible mezclar dos imágenes**, que es lo que
buscaba: sin transparencia un rectángulo tapa al otro, y la PDI mas la muerte
no se pueden superponer.

## El prompt va CORTO, y los porqués viven acá

Medido el 29-09-2026, y es contraintuitivo. El bloque de estilo llegó a tener 45
líneas, con la explicación de cada regla adentro para que no se perdieran. La
misma imagen pedida con el prompt largo en una conversación nueva salió PEOR que
la pedida con tres líneas en una conversación donde ya se había iterado.

Dos razones distintas, y conviene no confundirlas:

1. **Describir una cosa real le tapa al generador lo que ya sabe.** El motivo de
   gobierno llegó a tener seis líneas sobre la fachada de La Moneda: plana, con
   almohadillado, con los frontones alternados, con balaustrada. El generador
   conoce La Moneda; al describírsela por partes, armó un palacio genérico con
   esas piezas. **Si la cosa se puede nombrar, se nombra y se calla.** La
   descripción larga sirve para lo inventado, no para lo que existe.
2. **Un prompt largo diluye.** Pasado cierto punto el generador empieza a soltar
   instrucciones del medio, y las que suelta no son las que uno elegiría.

Entonces el reparto quedó así: **el prompt lleva la instrucción, este archivo
lleva el porqué.** Lo de abajo es para leerlo nosotros, no para pegarlo.

## Las reglas que van en TODOS los prompts, con su porqué

Desde el 29-09-2026 estas seis líneas van al final de cada bloque de estilo, con
la explicación incluida. Van explicadas y no a secas porque cada una se perdió
al menos una vez: la bandera a color apareció en la segunda prueba de gobierno
aunque el prompt pedía una sola tinta.

1. **Sin personas.** Ni reales, ni reconocibles, ni parecidas a alguien. En
   Chile la propia imagen está protegida, y una cara generada al lado de una
   noticia afirma algo que ninguna fuente dijo. Una figura de espaldas y sin
   rasgos sí se puede.
2. **Sin bandera a color**, ni la chilena ni ninguna. La identidad del canal
   dice "sin bandera" porque es apolítico y no patriotero. Si la escena la
   pide, va en la misma tinta que todo lo demás.
3. **Una sola tinta.** El canal tiene un acento único y es un verde frío:
   cualquier segunda familia de color rompe el sistema entero.
4. **Un lugar real se dibuja bien o no se dibuja.** Si es un edificio
   identificable tiene que ser ESE edificio. Quien nos sigue lo hace porque
   somos precisos, y una versión casi correcta cuesta más credibilidad que una
   genérica. (Regla 29, partida en personas y lugares el 29-09-2026.)

   **Y la instrucción es un VERBO, no una preferencia** (29-09-2026, noche,
   aporte de Santiago). El bloque decía "usa una fotografía real de referencia",
   que describe un estado deseado y no manda hacer nada. Santiago sacó la única
   sala de la Cámara correcta de todo el día con una línea suya: "busca la
   imagen del congreso y básate en esa". Ahora el bloque dice BUSCA, que es una
   acción que la herramienta sí puede ejecutar.

   Esto explica de paso todo el historial de La Moneda: lo único que acertó fue
   cuando el generador tuvo una referencia real delante. Siete intentos
   describiendo, ninguno; uno con la imagen al lado, ese sí. Lo que faltaba no
   era una palabra mejor sino mandarlo a buscarla.
5. **Sin texto dentro de la imagen.** Lo pone el video, que sabe el tamaño, el
   color y la palabra exacta, y los generadores además lo escriben mal.
6. **Los emblemas del lugar SÍ se dibujan** (29-09-2026, decisión de Santiago:
   "levantemos la prohibición, para todo"). La regla decía "ninguna marca ni
   logotipo ajeno", con el acento en *ajeno*, pero en el prompt quedó escrita a
   secas y el generador la leyó como una prohibición total. El costo se vio
   entero en congreso: la sala volvió con la testera despejada, sin el escudo
   nacional ni los motivos de cobre, que son justamente lo que distingue esa
   sala de cualquier parlamento moderno. Le habíamos prohibido lo único que la
   identificaba. Ahora la línea es afirmativa y no negativa, porque quitar la
   prohibición solo deja al generador neutral: hay que pedirlo.

   **Lo que queda es un criterio de revisión, no una prohibición del prompt.**
   Si vuelve una imagen con la marca comercial de un tercero, se muestra y
   decide Santiago. El riesgo es real y conviene tenerlo escrito: una imagen de
   la biblioteca se reusa en muchas noticias distintas, así que un logo de
   empresa la convierte en un aval o en una acusación sobre alguien que esa
   noticia puede ni siquiera mencionar. Un escudo de una institución pública no
   tiene ese problema, porque el concepto ES esa institución.

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
