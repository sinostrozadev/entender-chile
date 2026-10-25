VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-25T05:44:44Z

Correcciones:
1. Dónde: línea 11, "Más de ciento cincuenta y ocho millones de personas
   eligen este domingo al próximo presidente de Brasil". El informe da la
   fecha del hecho en su línea 14: "están habilitadas para votar este
   25-10-2026". El guion la reemplaza por "este domingo", y lo hace en la
   primera frase hablada del video. · Regla: "La FECHA EXACTA manda: si el
   informe da la fecha de un hecho, nunca la reemplaces por 'esta semana',
   'hace unos días' o 'recientemente', y menos en la frase que abre el
   bloque (hallazgo de la revisión del 30-08)". · Debe quedar: la frase trae
   la fecha absoluta en palabras, resuelta en la misma línea, por ejemplo
   "Más de ciento cincuenta y ocho millones de personas eligen este
   veinticinco de octubre al próximo presidente de Brasil" (diecinueve
   palabras, deja la sección en treinta y una, dentro del rango de 25 a 35).
   Si no se quiere repetir la fecha con la Apertura, la que cambia es la
   Apertura, que puede situar el día con otra formulación: la fecha del
   hecho va donde el hecho se cuenta.

2. Dónde: línea 32, "El Congreso despachó una modernización que eleva el pago
   mensual de los alumnos desde setenta mil a doscientos cuarenta y ocho mil
   pesos. La diferencia es de ciento setenta y ocho mil pesos al mes, o poco
   más de dos millones de pesos al año por alumno". El bloque narra cuatro
   cifras habladas: setenta mil, doscientos cuarenta y ocho mil, ciento
   setenta y ocho mil y dos millones. · Regla: "Cifras: narra las que
   sostienen la idea de cada noticia, máximo tres cifras habladas por bloque.
   Las demás pueden ir en una marca [DATO] para que aparezcan en pantalla". ·
   Debe quedar: tres cifras habladas en el bloque, sale el total anual, por
   ejemplo "La diferencia es de ciento setenta y ocho mil pesos al mes por
   alumno, un salto que cambia las condiciones de quienes están en
   formación" (veinticinco palabras contra las veinticuatro de la frase
   actual, lo que sostiene el escrito del informe en su línea 24, "modifica
   la trayectoria funcionaria y las condiciones de formación"). ATENCIÓN AL
   LARGO: node scripts/validar-tarjetas.js mide 420 palabras narradas, el
   piso exacto del rango de 420 a 600, así que el recorte no puede dejar el
   guion por debajo. Con la redacción propuesta acá y la de la corrección 1
   el guion queda en 423.

3. Dónde: el bloque "Fuentes:" (líneas 51 a 58). Busqué "Datafolha" y
   "Quaest" en el guion completo: cero coincidencias, ninguna de las dos
   aparece. El guion sí narra su contenido, en la [TESIS] de la línea 18
   ("Las encuestas sitúan la elección brasileña dentro del margen de error")
   y en la línea 23 ("Los sondeos difundidos antes del balotaje mostraron una
   diferencia dentro del margen de error"), que es el dato que el informe
   atribuye a esos dos encuestadores en su línea 16: "Los últimos sondeos
   publicados por Datafolha y Quaest sitúan la competencia dentro del margen
   de error". · Regla: "Al final, bajo 'Fuentes:', lista una línea por cada
   fuente de las marcas [DATO] y [CITA] Y por cada fuente del informe cuyas
   noticias narraste, tal como aparecen en el informe. Esa lista alimenta la
   descripción del video en YouTube: la transparencia de fuentes es marca del
   canal, y una fuente cuyo contenido se narró no puede quedar sin crédito". ·
   Debe quedar: el bloque "Fuentes:" suma dos líneas, tal como el informe las
   trae en sus líneas 149 y 150: "- Datafolha, sondeo difundido el
   24-10-2026." y "- Quaest, sondeo difundido el 24-10-2026.". No cambia nada
   del texto narrado: las líneas de Fuentes no cuentan para el largo.

Observaciones:
- Las marcas [FUENTE] de las líneas 9 y 17 dicen "Tribunal Electoral", y el
  informe nombra la institución como "Tribunal Superior Electoral de Brasil"
  (líneas 14, 16 y 18). El nombre completo cabe en el tope de seis palabras
  de la marca ("Tribunal Superior Electoral de Brasil, 24 oct") y acredita
  mejor en pantalla, donde el espectador ve el pie de la tarjeta sin el
  informe al lado. No lo marco INCUMPLE porque el prompt pide "institución o
  medio + fecha" en formato legible y el nombre abreviado no cambia ningún
  hecho, pero la narración de la línea 20 ya usa el nombre completo y la
  pantalla queda atrás.
- La marca [FUENTE] de la línea 38 pinta "Senapred" sin expandir. El prompt
  exceptúa las siglas "de uso corriente que cualquiera lee sin traducir" y
  Senapred, en Chile y en una noticia de emergencia, es de ese grupo; además
  el nombre completo no cabe en las seis palabras de la marca. Queda anotado
  por el precedente de "DMC" (21, 22 y 23-09), que no es el mismo caso: la
  Dirección Meteorológica aquí va expandida en la narración de la línea 44.
- El título de la línea 1 dice "Bolsonaro" a secas, mientras el informe
  distingue "Flávio Bolsonaro" cada vez que lo nombra (líneas 5, 12 y 14), y
  el guion también lo hace en la descripción y en la línea 11. En el título
  de un video sobre Brasil el apellido solo apunta a otra persona. No es
  requisito del prompt y no bloquea; cabe corregirlo en la misma vuelta.
- La línea 10 lleva a pantalla el padrón electoral ("personas habilitadas
  para votar en Brasil: 158700000 personas"), que es la medida de la
  elección, no una cifra que cambie algo para alguien en el sentido del
  CRITERIO DE LA CIFRA. Es la única cifra que la portada tiene antes del
  cierre de las mesas, así que no hay alternativa disponible en el informe y
  no la marco. Nota menor: el informe dice "más de 158,7 millones" y la marca
  fija 158700000 como exacto; el "más de" sí quedó en la voz.
- Verificado y sin hallazgos: node scripts/revisar-mecanico.js imprime "sin
  hallazgos mecánicos"; node scripts/validar-tarjetas.js da "4 bloques con
  fuente, 420 palabras narradas, ~3.1 min" y "variedad OK: ninguna cuota
  rota, ninguna marca malformada"; cero rayas largas y cero rayas medias,
  buscadas carácter por carácter; las tres líneas [TESIS] llevan su línea en
  blanco detrás (líneas 19, 30 y 40) y ninguna pasa de dieciocho palabras
  (once, dieciséis y catorce); exactamente tres bloques de noticia, con la
  portada primera, que son las tres [A] del informe (Brasil línea 12,
  Carabineros línea 22, sistema frontal línea 94), sin "## En titulares", sin
  Dato curioso, sin Agenda y sin "¿En qué quedó?"; las categorías
  `internacional`, `congreso` y `emergencia` están en las doce permitidas y
  `emergencia` es la correcta para albergados, aislados y alerta declarada;
  apertura de veintinueve palabras y cierre de cincuenta y ocho, dentro de
  sus rangos, con el enlace de la descripción, la línea "Para salir hoy" del
  informe integrada y el tagline exacto como última frase; ningún numeral en
  el texto narrado; ningún conector de ensayo escrito, ningún "no solo X,
  sino Y", ningún comparativo o superlativo que el informe no traiga; ninguna
  URL ni paréntesis fuera del bloque Fuentes; ninguna ruta interna del
  sistema en Fuentes; el informe no trae sección "Análisis", así que no
  corresponde ninguna marca [INTERPRETACIÓN]; el [ESQUEMA] de la línea 34
  cumple la obligación de la noticia de proceso con cuatro elementos; las
  tres carátulas respetan las dos líneas de máximo cuatro palabras y los tres
  enfoques (pregunta, giro, cifra), y las tres nombran el objeto de la
  noticia; "Clima de carátula: internacional" es una de las seis palabras
  vigentes; y las cifras narradas coinciden una por una con el informe
  (47,03% y 45,16% en la línea 16; $70.000, $248.000 y $178.000 en la línea
  24; 93, 40, los 133 sumados y las más de 700 viviendas en la línea 94; el
  nuevo episodio del 26-10-2026 en la línea 98).
