# Carátula de "Entender el caso" (el largo por tema)

Este prompt es para los largos de la serie "Entender el caso", NO para el
informe diario: el informe sigue con `prompts/caratula-pedido.txt` y su
estilo de alto CTR. El largo explica un caso con calma y su carátula tiene
que verse como eso: una pieza editorial sobria, reconocible como serie.

**Cuándo se pide:** cuando una Clave con `FORMATO: diario` llega a
`pauta_lista`, o cuando Santiago lo pida. La fecha de producción la fija
Santiago al aprobar la pauta.

**Cómo se usa:** se copia el bloque de abajo al generador, una vez por
variante, con los marcadores rellenados desde la sección "Carátulas" de la
pauta. En cada línea de carátula de la pauta, lo que va antes de la barra `/`
es el `{{TITULAR}}` y lo que va después es la `{{SECUNDARIA}}`. La barra no se
dibuja: es la marca que separa los dos textos.

**Salida:**
- `contenido/caratulas/claves/<fecha de producción>-<slug>-1.png`, `-2.png` y
  `-3.png`, una por carátula de la pauta, en ese orden. Las tres se entregan
  aunque alguna guste menos: elige Santiago, y la elegida se copia a mano como
  `<fecha de producción>-<slug>.png`, que es la que busca `scripts/miniaturas.js`.
- El prompt usado, tal como se mandó, en
  `contenido/caratulas/claves/<fecha de producción>-<slug>-prompt.txt`.
- Si no se puede: `contenido/caratulas/claves/<fecha de producción>-<slug>-NO-PUDE.md`
  con lo que se intentó y el mensaje de error textual.
- Rige la regla del 03-11-2026 de `prompts/imagen-caratula.md`: cualquier
  variante extra se guarda en `contenido/caratulas/descartadas/` y una cara
  inventada nunca es salida. Guardar no es publicar.

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
