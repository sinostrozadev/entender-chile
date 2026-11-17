VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-17T05:55:12Z

Observaciones:
- Para la pieza siguiente: en la cadena diaria no queda pieza de GPT después de
  esta, así que lo que sigue es la revisión del día. Estas observaciones son
  para la próxima edición.
- Para la pieza siguiente: el tope de tres cifras habladas por bloque volvió a
  costar una vuelta, y esta vez en los tres bloques a la vez. Ya había costado
  una el 06-11-2026 y quedó anotado sin corrección el 01-11-2026 y el
  30-10-2026. La forma de no pagarla es contar las cifras del bloque antes de
  narrarlo: la que no entra no se borra, se pasa a la etiqueta de un [DATO],
  que es pantalla y no gasta voz.
- Verificación de las siete correcciones de la vuelta 1, una por una contra el
  diff de la pieza (`git diff f6d8069 6eea271`), que no toca ninguna [TESIS] ni
  ninguna otra línea:
  1. La Apertura (línea 12) ya no vuelve a anunciar la rebaja de combustibles y
     adelanta solo las otras dos noticias, en 26 palabras contadas, dentro de 25
     a 40.
  2. "La noticia del día" quedó en 35 palabras narradas contando la [TESIS] que
     sí se narra, el techo justo de 25 a 35.
  3. El bloque de la rebaja narra tres cifras: los ciento cuarenta y dos pesos,
     los cerca de treinta y nueve pesos y el ejemplo de la carga de cien litros
     con sus catorce mil doscientos pesos. Salieron de la voz los cien pesos de
     rebaja al diésel, los doscientos litros con veintiocho mil cuatrocientos
     pesos y los ochocientos veinte millones de dólares de costo fiscal, y no
     entraron en una segunda tarjeta pegada a la de la línea 24.
  4. El bloque del ingreso real narra tres cifras: tres coma cinco, cuatro coma
     cuatro y nueve coma ocho por ciento. La línea 35 dice los dos hechos sin
     sus números y los dos están en el informe (su línea 30).
  5. El bloque del subsidio narra tres cifras: la banda de dos mil doscientas a
     cuatro mil unidades de fomento y las dos equivalencias en pesos. Los
     valores en unidades de fomento quedan solo en la tarjeta de la línea 47 y
     el plazo de la cuenta de ahorro salió de la cuenta.
  6. Las tres etiquetas del [DATO barras] (línea 34) nombran el indicador y
     miden ocho palabras cada una, dentro de 3 a 8.
  7. El [DATO comparacion] de la línea 18 quedó con una sola fuente, "Cámara de
     Diputadas, 16 nov", cuatro palabras, y TVN sigue acreditado en el [FUENTE]
     de la línea 15 y en la lista de "Fuentes:".
- Línea 50, "La cuenta de ahorro no necesita antigüedad mínima en este llamado":
  la redacción la propuso la corrección 5 de la vuelta 1 y el informe dice algo
  un poco más estrecho en su línea 66, "no necesita tener 12 meses de
  antigüedad en este llamado". Se aprueba porque esa es la lectura natural de la
  frase del informe y porque la cifra tenía que salir de la voz por el tope del
  bloque, pero la próxima vez conviene dejar la condición en la etiqueta de una
  tarjeta y no generalizarla en la narración.
- El bloque de la portada quedó en 122 palabras narradas y dejó de ser el más
  largo (154 el del ingreso real y 150 el del subsidio). El reparto del prompt
  es orientativo y los tres caen dentro de 110 a 160, así que no bloquea. La
  corrección 3 ofrecía material no numérico del informe para rellenarlo (la
  explicación del ministro de Hacienda, Jorge Quiroz, la indicación para la
  pesca artesanal declarada inadmisible y el esquema diferenciado del impuesto
  específico para el transporte de carga, líneas 20 y 22 del informe) y no se
  usó.
- Las líneas 8 y 25 siguen narrando dos veces el mismo ejemplo, los catorce mil
  doscientos pesos de una carga de cien litros, con frases distintas. El prompt
  solo prohíbe repetir literalmente las frases de "La noticia del día", así que
  no bloquea, y el mismo caso quedó anotado el 12-11-2026 y en la vuelta 1 de
  hoy. Con el bloque de la portada corto, mover ese ejemplo a una sola de las
  dos y usar el espacio para los actores de la tramitación resolvería las dos
  observaciones juntas.
- La tesis de la línea 6 y el título afirman la rebaja desde el jueves, mientras
  el informe la deja prevista ("comenzaría a reflejarse en los precios desde el
  19-11-2026", "aplicación prevista", líneas 5, 22 y 225) y la línea 22 del
  guion conserva que faltan los trámites formales. No es incumplimiento, pero el
  título del Short afirma como hecho algo que el informe deja previsto: si el
  19-11-2026 la rebaja no se aplica, eso queda publicado.
- La tarjeta automática que el sistema arma sobre la línea 8 sigue saliendo con
  etiqueta "pesos" y valor 14.200, comprobado con scripts/parse.js en esta
  corrida (grafico cifra, automatico true). No es incumplimiento de la pieza,
  porque el prompt deja esos montos al sistema, pero la primera tarjeta del
  video dice "pesos" a secas, que es justo lo que persigue la regla 32. Es
  trabajo de repo, no de la pieza.
- "OCDE" se pinta en pantalla sin expandir (líneas 28, 31 y 34). Queda como
  observación y no como incumplimiento, por el mismo criterio con que pasaron
  "Senapred" el 16-11-2026 y "Conaf" el 08-11-2026: es sigla de uso corriente en
  Chile, como ONU o INE.
- Falta "Carátula sugerida:" y "Clima de carátula:", y scripts/validar-tarjetas.js
  lo avisa. No es incumplimiento, por sexto día: el propio prompt cierra ese
  bloque con "Desde el 04-11-2026 no se pide carátula del día", existe
  contenido/estado/sin-video-informe.txt y estado.yml salta el pedido. La
  contradicción del prompt, que mantiene las tres carátulas como líneas tercera
  a quinta de FORMATO DE SALIDA, sigue en pie y es trabajo de la sesión de día.
- Verificado y sin hallazgos en esta corrida, sobre la versión corregida:
  `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos"; cero
  rayas largas y cero rayas medias por búsqueda literal; 544 palabras narradas,
  dentro de 420 a 600, repartidas en 35 de "La noticia del día", 26 de Apertura,
  122, 154 y 150 de los tres bloques y 57 del cierre, todos dentro de su tramo;
  las cuatro tesis miden 54, 87, 99 y 94 caracteres contados, la primera bajo el
  tope de 66 y las tres de bloque dentro de 80 a 105, con suma de 334, dentro de
  292 a 380, lo que pone el Short en 38,9 segundos con la ley del punto 3b; las
  cuatro tesis con 18 palabras o menos (8, 15, 17 y 14); exactamente tres
  bloques de noticia, la portada primero, y la selección que manda el prompt,
  porque el informe trae cuatro noticias [A] (líneas 14, 26, 60 y 76) y se
  narran la portada y las dos [A] siguientes en el orden del informe, con la de
  seguridad quedando en la web; línea en blanco después de cada [TESIS]; cada
  bloque con su [FUENTE] y Apertura y Cierre sin ella; un [ESQUEMA] de cuatro
  elementos para el bloque de proceso; el árbol de tipos bien aplicado en las
  siete marcas escritas, con la comparacion de la línea 18 y la de la línea 47
  entre valores de la misma unidad, las barras de la línea 34 con tres valores
  de la misma familia y el cambio de la línea 31 contra la base vigente, el
  primer trimestre de 2026; cada valor con su unidad pegada y su propio rótulo;
  sin dos tarjetas del mismo tipo seguidas dentro de un bloque y con un máximo
  de dos [DATO cifra] seguidas en toda la edición (líneas 37 y 44); cada cifra,
  fuente y afirmación comprobada contra su línea del informe, incluidas las dos
  frases nuevas de la línea 35 y el "duplica esa cifra" de la línea 48 (líneas
  28, 30, 64, 66 y 68 del informe); ningún superlativo que el informe no traiga
  escrito; sin conectores de ensayo escrito ni la construcción "no solo, sino";
  sin paréntesis, URLs ni siglas sueltas en el texto narrado; el cierre con la
  línea "Para salir hoy" del informe integrada y el tagline "El resumen sin
  gritos." como última frase; y las diez líneas de "Fuentes:" corresponden a
  fuentes del informe, sin ninguna ruta interna.
