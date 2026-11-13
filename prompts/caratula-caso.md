# Carátula de "Entender el caso" (el largo por tema)

Este prompt es para los largos de la serie "Entender el caso", NO para el
informe diario: el informe sigue con `prompts/caratula-pedido.txt` y su
estilo de alto CTR. El largo explica un caso con calma y su carátula tiene
que verse como eso: una pieza editorial sobria, reconocible como serie.

**Cuándo se pide:** cuando una Clave con `FORMATO: diario` llega a
`pauta_lista`, o cuando Santiago lo pida. La fecha de producción la fija
quien aprueba la pauta (Claude desde el 12-11-2026; Santiago tiene el veto).

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
El TITULAR es el SUJETO del caso, nombrado tal cual lo entrego (1 a 3 palabras, por ejemplo CODELCO). Va en tipografía serif, cuerpo muy grande, en blanco roto: tiene que leerse en un teléfono sin leer el título del video.
La LÍNEA SECUNDARIA es la TENSIÓN: de 2 a 4 palabras, exactamente como la entrego, en MAYÚSCULAS dentro de una caja cobre sólida de bordes limpios, justo bajo el titular. No explica el caso, dice cómo se siente.
El acento cobre es la caja y, como mucho, una línea fina; nunca todo el titular.

COMPOSICIÓN
La imagen del ELEMENTO VISUAL va a sangre completa de fondo: una fotografía documental, nítida, con luz cinematográfica, oscurecida con un degradado hacia la izquierda para que el texto se lea. Debe responder en medio segundo "de qué va esto" sin ayuda del texto.
El titular y la caja de tensión ocupan el lado izquierdo, grandes. La marca de la serie, pequeña, arriba a la izquierda.
La esquina inferior derecha (11% del ancho y 10% del alto) queda LIBRE: YouTube la tapa con la duración.
Nada más compite con el sujeto y la tensión.

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
¿Hay una sola imagen héroe a sangre, sin caras, y la esquina inferior derecha está libre?
¿Se entiende QUIÉN o QUÉ es el sujeto sin leer el título del video?
¿La caja de tensión tiene entre 2 y 4 palabras y NO repite el titular?
¿La imagen se ve seria, sobria y de la misma serie que las anteriores?
Si alguna respuesta es no, corrígelo antes de generar.
