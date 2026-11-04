# PEDIDO · carátulas del largo "Entender el caso": rebajas de condena (Rabat y Silva)
Tarea: imagen
Salida: contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-1.png
Prompt: va completo más abajo, en este mismo archivo (es prompts/caratula-caso.md con los datos pegados)
Pedido por: Santiago, 03-11-2026 (el largo necesita una carátula "a la altura", distinta al estilo del informe diario).

SON TRES IMÁGENES, NO UNA. La línea Salida nombra solo la primera porque el
pedido admite una sola ruta, pero se entregan las tres:
  contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-1.png
  contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-2.png
  contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-3.png
Las tres se entregan aunque una te guste menos. Santiago elige; tú no.

QUÉ TIENES QUE HACER, y nada más que esto:
1. Para cada variante de abajo, copia el bloque del prompt TAL CUAL al
   generador, reemplazando TITULAR, LÍNEA SECUNDARIA y ELEMENTO VISUAL por los
   de esa variante. No reescribas el resto, no lo resumas y no le agregues
   nada tuyo. El titular y la línea secundaria van EXACTOS, letra por letra.
2. NO abras ningún otro archivo de prompts. NO uses prompts/caratula-pedido.txt:
   ese es el estilo del informe diario y este es otro.
3. Deja cada imagen en su ruta de arriba, rama main, como PNG VÁLIDO, 16:9
   horizontal, mínimo 1280x720. Súbela como binario (blob), nunca como texto.
4. COMPRUEBA QUE CADA UNA LLEGÓ ENTERA (paso 3 bis de prompts/imagen-caratula.md):
   lee el archivo de vuelta desde main y confirma que el TAMAÑO EN BYTES es
   el mismo que el de la imagen que generaste, que EMPIEZA con la firma PNG
   (89 50 4E 47) y que TERMINA con el bloque IEND. Si no calza, súbela de
   nuevo, hasta tres veces.
5. Deja los tres prompts que usaste, tal como los mandaste, en
   contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-prompt.txt.
6. Si no pudiste, no te quedes en silencio: escribe
   contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-NO-PUDE.md
   diciendo QUÉ intentaste y QUÉ falló, con el mensaje de error textual.
7. NINGUNA CARA. Este caso gira sobre dos personas reales nombradas (Rabat y
   Silva) y no hay foto de referencia: por eso el prompt prohíbe rostros, reales
   o inventados. Si el generador te devuelve una imagen con una cara, NO la
   entregues como -1, -2 ni -3: guárdala en contenido/caratulas/descartadas/
   2026-11-05-rabat-rebajas-de-condena-N.png (N desde 1), anota en el
   prompt.txt en una línea por qué se descartó, y genera de nuevo esa variante.
   Guardar no es publicar.

LAS TRES VARIANTES (las tres carátulas de la sección 8 de la pauta, tal cual)

Variante 1, pregunta: ¿Quién firmó esos permisos? / 56 rebajas de condena
  TITULAR: ¿Quién firmó esos permisos?
  LÍNEA SECUNDARIA: 56 rebajas de condena
  ELEMENTO VISUAL: una pila de decretos en papel sobre un escritorio oscuro, el de arriba con un timbre de tinta genérico, sin escudo ni texto legible
  Salida: contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-1.png

Variante 2, contradicción: La ley lo obligaba / sus oficinas advirtieron antes
  TITULAR: La ley lo obligaba
  LÍNEA SECUNDARIA: sus oficinas advirtieron antes
  ELEMENTO VISUAL: una columna de piedra de tribunal, de abajo hacia arriba, con luz lateral fría y una franja de luz cobre
  Salida: contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-2.png

Variante 3, cifra con referencia: 56 en seis meses / uno cada tres días
  TITULAR: 56 en seis meses
  LÍNEA SECUNDARIA: uno cada tres días
  ELEMENTO VISUAL: una hoja de calendario de pared con muchos días marcados en cobre, en ángulo, sin nombres de meses legibles
  Salida: contenido/caratulas/claves/2026-11-05-rabat-rebajas-de-condena-3.png

----- EL PROMPT, DESDE ACÁ HASTA EL FINAL DEL ARCHIVO -----

Crea una carátula de YouTube para un video largo explicativo de la serie "Entender el caso", de un canal chileno de noticias.

DATOS QUE YO ENTREGO
TITULAR:
{{TITULAR}}
LÍNEA SECUNDARIA:
{{SECUNDARIA}}
ELEMENTO VISUAL:
{{ELEMENTO}}

TU TAREA
Diseña la carátula con estas reglas fijas. No son sugerencias: son la identidad de la serie y se repiten en cada video.

FORMATO
16:9 horizontal, mínimo 1280x720, en PNG.
El texto VA DENTRO de la imagen: la carátula se publica tal como sale, nadie le pinta nada encima.

IDENTIDAD DE LA SERIE
Arriba a la izquierda, una marca pequeña que dice ENTENDER EL CASO, en mayúsculas espaciadas y tipografía monoespaciada.
Paleta sobria: fondo oscuro casi negro azulado; un solo acento cobre; texto en blanco roto.
El TITULAR va en tipografía serif, con cuerpo grande, en dos líneas, exactamente como yo lo entrego (máximo 7 palabras).
La LÍNEA SECUNDARIA va debajo, pequeña, exactamente como yo la entrego (máximo 8 palabras).
El acento cobre puede marcar una palabra o una línea fina, nunca todo el titular.

COMPOSICIÓN
El texto ocupa el 60% izquierdo de la imagen.
En el 40% derecho va UN solo elemento visual: el ELEMENTO VISUAL que entrego, documental, fotográfico o 3D limpio, con luz cinematográfica y sombras suaves, que se funda con el fondo oscuro.
Nada más compite con el titular.

PROHIBIDO
Rostros de personas reales.
Rostros inventados, de cualquier tipo.
Logos, escudos o timbres institucionales reconocibles.
Nombres de medios de comunicación.
Banderas como protagonista.
Cualquier texto que no sea la marca de la serie, el titular y la línea secundaria.
Mayúsculas gritadas en el titular, amarillo o rojo de tabloide, flechas, círculos, signos de exclamación.

TEXTO
Español con tildes correctas. Sin raya larga ni raya media: si hace falta una pausa, usa punto o coma.
Revisa letra por letra que el titular y la línea secundaria digan exactamente lo que entregué.

PRUEBA FINAL ANTES DE ENTREGAR
¿Se lee el titular en un teléfono?
¿Se ve la marca ENTENDER EL CASO arriba a la izquierda?
¿Hay un solo elemento visual, a la derecha, y ninguna cara?
¿La imagen se ve seria, sobria y de la misma serie que las anteriores?
Si alguna respuesta es no, corrígelo antes de generar.
