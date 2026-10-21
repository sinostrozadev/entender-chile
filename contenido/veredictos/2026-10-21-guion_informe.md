VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-21T05:37:20Z

Correcciones:
1. Dónde: línea 24, "la pérdida de poder de compra equivaldría a ciento tres mil
   novecientos pesos" · Regla: "REGLA DE REDONDEO EN VOZ (Santiago, 04-09): las
   cifras grandes se narran REDONDEADAS, con 'más de', 'casi', 'cerca de' o
   'unos' (...) Tope: TRES cifras significativas habladas por número (...) La
   cifra exacta va en la marca [DATO], que es para pantalla" · Debe quedar: la
   cifra hablada con aproximador y tres cifras significativas, por ejemplo "la
   pérdida de poder de compra sería cercana a ciento cuatro mil pesos". El
   exacto ya está donde corresponde, en el [DATO cifra] de la línea 23
   ($103900), así que no se pierde nada en pantalla. Contado en esta corrida:
   "ciento tres mil novecientos" son cuatro cifras significativas (103.900) y
   "ciento cuatro mil" son tres; lo confirma también
   `node scripts/validar-tarjetas.js`, que marca la línea 24.

2. Dónde: "## La noticia del día", líneas 10 y 12 (la [TESIS] "Las siete AFP
   están bajo investigación por las pérdidas de los fondos D y E." más el
   párrafo "La apertura de los procesos no prueba una infracción ni fija
   indemnizaciones, pero obliga a revisar si las decisiones de inversión
   cumplieron la ley.") · Regla: punto 1 de ESTRUCTURA DEL GUION, "Dos frases,
   25 a 35 palabras en total, con su [TESIS] o su [DATO] principal como tarjeta
   (una sola marca) y su [FUENTE]" · Debe quedar: la sección dentro de 25 a 35
   palabras y en dos frases. Contado en esta corrida: con la [TESIS] narrada son
   39 palabras (15 más 24), cuatro sobre el tope; sin ella el párrafo es una
   sola frase de 24, una bajo el piso, así que esta vez la sección queda fuera
   con las dos formas de contar y no la salva la ambigüedad que los veredictos
   del 05-10 y del 07-10-2026 dejaron anotada. Sirve dejar la [TESIS] como está
   y acortar el párrafo a 20 palabras o menos, por ejemplo "La apertura del
   proceso no prueba una infracción ni fija indemnizaciones, pero obliga a
   revisar las decisiones de inversión." (19 palabras, contadas acá: total 34,
   dos frases).

3. Dónde: línea 45, "[DATO cambio | La Tercera, 20 oct] prohibición mínima de
   reingreso: 3 años -> 5 años", puesta delante del párrafo de la línea 46, que
   habla de la autorización judicial a la Policía de Investigaciones y de las
   veinticuatro horas del juez · Regla: marca [DATO], "Va justo antes del
   párrafo que menciona esos números" · Debe quedar: la marca movida a la línea
   anterior al párrafo que sí narra ese cambio, el de la línea 43 ("El texto
   aumenta de tres a cinco años la prohibición mínima de reingreso en
   determinados casos"), es decir entre la línea en blanco posterior a la
   [TESIS] y ese párrafo, como ya está hecho en los bloques de las líneas 23 y
   32. Tal como está, la tarjeta de los años se pinta mientras la voz dice
   veinticuatro horas.

Observaciones:
- Para la pieza siguiente: no hay carátula del día. Listada la carpeta en esta
  corrida, contenido/caratulas/ tiene 2026-10-20.png y 2026-10-20-prompt.txt y
  ningún archivo 2026-10-21, ni el .png, ni el -prompt.txt, ni el -NO-PUDE.md
  que el prompt pide cuando el generador falla. No bloquea, porque la carátula
  va después de commitear el guion, pero conviene no dejar que la edición salga
  con la de respaldo sin que nadie lo sepa.
- `node scripts/revisar-mecanico.js` no encontró nada ("sin hallazgos
  mecánicos"). Búsqueda explícita de raya larga y de raya media en todo el
  archivo: cero coincidencias. Los conectores de ensayo escrito prohibidos
  tampoco aparecen, buscados uno por uno.
- El segundo aviso de validar-tarjetas, el de la línea 5, es sobre la
  "Carátula 3: Por cada millón / 103.900 pesos menos". Esa línea no se narra
  (el prompt dice "Ninguna se narra") y la carátula puede llevar la cifra con
  referencia, así que no hay nada que corregir ahí: el script cuenta esa línea
  como si fuera voz.
- "Senapred" se pinta sin expandir en la [FUENTE] de la línea 29. Queda como
  observación por lo mismo que el veredicto del 10-10-2026: la regla de siglas
  y el tope de seis palabras de esas marcas se contradicen, y el informe no
  trae el nombre desarrollado. Conviene resolverlo en el prompt.
- El párrafo de la línea 35 se apoya en las ciento once personas albergadas sin
  marca [DATO]. No lo marco: sería una tercera [DATO cifra] seguida, que es lo
  que la regla de VARIEDAD evita, y el prompt dice que la cuota es una alarma y
  no una obligación.
- "diez coma treinta y nueve por ciento" (línea 24) lleva dos decimales, y la
  excepción de la regla de redondeo habla de "porcentajes con un decimal". No
  lo marco: el porcentaje viene así del informe (10,39%) y el control mecánico
  de la casa exceptúa los porcentajes. Si Santiago quiere que el tope también
  los alcance, el lugar de arreglarlo es el prompt.
- Lo demás verificado contra el informe de hoy, pieza por pieza: las tres
  noticias narradas son las tres [A] del informe con la portada primera; 484
  palabras narradas; las tres [TESIS] bajo 18 palabras con su línea en blanco
  detrás; las cifras 29,3 mm, 111 albergadas, 3 a 5 años, 24 horas, 10,39% y
  $103.900 calzan con el informe; la lista de fuentes no trae rutas internas; y
  el cierre lleva el enlace al informe completo, la línea "Para salir hoy" y el
  tagline exacto al final.
