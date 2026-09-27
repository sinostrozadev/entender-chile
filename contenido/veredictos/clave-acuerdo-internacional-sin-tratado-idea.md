VEREDICTO: APROBADA
VUELTA: 1
PIEZA: idea
SLUG: acuerdo-internacional-sin-tratado
PROMPT: prompts/clave-idea.md
VALIDADO: 2026-09-27T02:37:28Z

Observaciones:
Las dos correcciones de la vuelta 1 quedaron aplicadas tal como pedía cada
"Debe quedar", y el diff entre a9048f7 y 33b59d6 toca solo esos dos bloques ("El
caso de entrada", "De dónde viene" y "Duración y fuentes"), de modo que la
corrección no introdujo nada nuevo. Por la regla de convergencia
(prompts/validador.md, punto 2) no se suman hallazgos sobre partes que la vuelta
anterior no marcó: lo demás ya quedó verificado ahí. Las observaciones que
siguen se arrastran del veredicto anterior porque ninguna pedía cambios en esta
pieza: son para la entrega, si Santiago aprueba la idea.

- Para la pieza siguiente: cuatro de los seis bloques de "Estructura tentativa"
  son coyunturales (gancho de la semana, hitos, qué está en juego ahora, qué
  mirar después) y solo el 2 y el 4 son conocimiento permanente. El punto 5 del
  control de prompts/claves.md exige que la explicación central sea atemporal en
  al menos 80% del texto. La idea cabe en la estructura que le manda su propio
  prompt, así que no hay incumplimiento acá, pero la entrega tendrá que cargar
  el peso en el bloque 4 (tratado frente a coordinación, de dónde viene la
  distinción en la Constitución, qué controles quedan) para no quedar bajo el
  piso.
- Para la pieza siguiente: contenido/claves/indice.md ya trae dos entregas que
  esta Clave roza, interpelacion-ministerial-chile del 09-09-2026 y
  estrecho-magallanes-soberania-navegacion del 03-09-2026. El concepto de esta
  Clave es otro y no se repite, por eso no es hallazgo, pero prompts/claves.md
  pide dar por conocido lo anterior y enlazarlo brevemente ("como vimos en la
  entrega sobre X") en vez de volver a explicar la interpelación desde cero en
  el bloque 3.
- Para la pieza siguiente: el archivo hace bien en decir en "De dónde viene"
  que los informes no identifican el acto fundador del Escudo ni reproducen el
  instrumento de adhesión, y en dejarlo como pendiente de verificar. Eso queda
  como la deuda concreta de la entrega: sin esos dos documentos no se pueden
  atribuir obligaciones específicas, y el bloque 2 de la estructura ("verificar
  qué acto creó el mecanismo") sigue abierto.
- Para la pieza siguiente: las cinco fuentes de "Duración y fuentes" quedaron
  contables sin ambigüedad, y la primera ahora nombra la Constitución con la
  edición de la Biblioteca del Congreso Nacional como una sola fuente. La
  entrega tendrá que citar el artículo constitucional concreto sobre tratados,
  no la Constitución entera, porque es ahí donde se apoya el bloque 4.
- Las comillas angulares de "«no es un tratado»" y "«Chile se sumó»" no las
  prohíbe ningún prompt, pero el resto del repo escribe las citas con comillas
  dobles rectas. Unificarlas evitaría que el guion las arrastre a pantalla.
- "Lo que NO va" cumple con dos de sus tres ítems (operaciones militares y las
  25 bandas, ambos con su porqué). El del medio, "Tampoco confundirá ausencia
  de tratado con ausencia de compromisos", no es algo que quede fuera: es la
  promesa del video dicha al revés, y no trae porqué. El bloque igual cumple,
  porque el prompt pide dos o tres y hay dos válidos.
- En el bloque 4 de la estructura, el ejemplo ("alguien lee «Chile se sumó» y
  pregunta qué se firmó, qué hará la policía y qué autorización exige cada
  acción") es una pregunta de lector común, pero no muestra al ciudadano
  ocupado que define el prompt, alguien que trabaja y quiere entender en diez
  minutos. Cumple, y ganaría con esa caracterización.

Verificado y conforme en esta vuelta:
- Corrección 1 (fechas DD-MM-AAAA, regla dura 35): las seis fechas sueltas que
  faltaban quedaron con año, "el 23-09-2026 la Cámara", "el 24-09-2026 Bachelet
  y Boric" y "El 25-09-2026 el ministro" en "El caso de entrada", y "el control
  de la Cámara el 23-09-2026", "Senado y Contraloría el 24-09-2026" y "la
  precisión gubernamental del 25-09-2026" en "De dónde viene". Las dos
  referencias a informes quedaron "(informes del 24-09-2026 y del 25-09-2026)" y
  "(informes del 24-09-2026 al 26-09-2026)", literalmente lo que pedía el "Debe
  quedar". Contadas todas las fechas del archivo: diecinueve, y las diecinueve
  en DD-MM-AAAA. Buscado el formato AAAA-MM-DD en prosa: no aparece (la única
  marca con año adelante es "2026-W39", que es el ORIGEN literal de tema.md).
- Corrección 2 (cuenta de fuentes): "La entrega necesitará la Constitución, en
  la edición de la Biblioteca del Congreso Nacional, para tratados; Cancillería
  para el instrumento de adhesión; Cámara para la interpelación; Senado para la
  sesión especial; y Contraloría para la presentación". Son cinco fuentes y solo
  cinco, dentro del rango de tres a cinco del bloque "Duración y fuentes", sin
  la doble lectura que costó la vuelta anterior.
- Alcance del cambio: el diff entre las dos versiones toca tres párrafos y nada
  más. Encabezados, título, SLUG, CONCEPTO, NOTICIA DE ORIGEN, "La promesa",
  "Las preguntas que responde", "Estructura tentativa", "Lo que NO va" y
  "Carátulas" llegan idénticos a la versión ya validada, así que su verificación
  del veredicto anterior sigue en pie.
- Rayas: buscadas la raya larga y la raya media en el archivo completo, no hay
  ninguna.
- Extensión: 549 palabras de cuerpo y 628 con título y encabezados, dentro del
  rango de 400 a 700 que fija el prompt. La corrección sumó palabras (los años
  de las fechas y el giro de la primera fuente) y aun así no roza el tope.
- Contrato de archivos: la pieza sigue en la ruta que nombra el estado,
  contenido/claves/flujo/acuerdo-internacional-sin-tratado/idea.md, y el commit
  33b59d6 usa el encabezado que manda su prompt ("clave
  acuerdo-internacional-sin-tratado: idea propuesta") con el cuerpo "Tarea:
  despachador", y toca un solo archivo, el suyo.
