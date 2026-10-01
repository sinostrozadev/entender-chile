VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-01T06:03:20Z

Observaciones:
- Para la pieza siguiente: el informe del 01-10-2026 entrega el alza del gas
  licuado vehicular ($61,4 por litro, línea 86) dentro de la noticia [A] de
  combustibles y el guion sigue sin narrarla. Cabe en el mismo párrafo sin
  forzar nada y sin sumar una cifra hablada de más, porque las otras tres ya
  están. Es la única cifra de esa noticia [A] que no suena.
- Para la pieza siguiente: el informe fecha dos hechos que el guion deja sin
  fecha, y la regla pide que la fecha exacta del informe no se reemplace. La
  interpelación al canciller es del 28-09-2026 (informe, línea 47) y el fallo
  de la Corte en Junaeb-Soser es del 29-09-2026 (informe, línea 202). El guion
  del 30-09-2026 sí las narraba con su fecha.
- Para la pieza siguiente: queda abierto el "PENDIENTE DE CIERRE: Imacec de
  agosto | 2026-10-01" del informe (línea 198). El dato real se publica hoy a
  las 08:30, después del cierre de esta edición, así que entregarlo es
  obligatorio en la edición del 02-10-2026.
- El [FUENTE Corte de Apelaciones, 29 sep] que pidió la corrección 6 quedó
  escrito tal cual, y la fuente no es inventada: el informe nombra a la Corte
  de Apelaciones de Santiago en esa misma noticia (línea 202). Pero el informe
  la acredita entre paréntesis como "Poder Judicial, 29 sep", y es "Poder
  Judicial" lo que figura en la lista "Fuentes:" del guion. Para que el pie de
  la tarjeta y la lista digan lo mismo, conviene fijar que el [FUENTE] copie el
  paréntesis del informe, como ya hacen los otros diez bloques.
- La corrección 9 dejó dos líneas en blanco seguidas donde estaba la frase
  borrada (línea 93, antes de "## Alerta preventiva en Biobío"). No bloquea,
  porque el prompt solo exige línea en blanco después de cada [TESIS] y esa
  está, y es la misma marca que el veredicto del informe anotó en su archivo:
  se deja dicho para que no sobreviva a la próxima reescritura.
- Sigue en pie lo de la vuelta 1 sobre el titular "Tres funcionarios quedaron
  presos por compras públicas irregulares en Atacama", que afirma más que el
  cuerpo del informe (dice "prisión preventiva" y "presuntas
  irregularidades"). No es incumplimiento porque el encabezado del informe sí
  habla de corrupción, pero "Tres funcionarios quedaron en prisión preventiva
  por compras públicas en Atacama" son 11 palabras, cabe en el tope de 12 y no
  adelanta un fallo.
- "Agua Negra no abrirá durante diciembre" tampoco cambió y no dice qué es Agua
  Negra. "El paso Agua Negra no abrirá durante diciembre" son 8 palabras y el
  oyente entiende de qué se habla.
- Queda sin fijar la convención del corchete en "## Dato curioso", que hoy va
  sin categoría: la lista de bloques de estructura no lo nombra, pero
  `dato-curioso` es una de las doce categorías. No rompe nada, porque
  scripts/imagenes-secciones.js resuelve por el título del bloque, pero en los
  últimos guiones salió de las dos formas (25 y 26-09-2026 con corchete, 24 y
  30-09-2026 sin él).
- Igual que en la vuelta 1, dos hechos suenan en un titular y además en la
  agenda (el Imacec de las 08:30 y las movilizaciones docentes). No lo marco
  como incumplimiento porque la agenda cumple la función aparte que el prompt
  exige, pero conviene decidir la convención.
- Verificado sobre el diff completo de la pieza (0cba881 a 43d2d90): las nueve
  correcciones de la vuelta 1 están todas resueltas y no hay ningún otro cambio
  en el archivo, así que lo verificado en la vuelta anterior sigue en pie. Las
  tres etiquetas de ENAP dicen ahora que el valor es el alza; la marca del
  viento quedó en tipo comparacion; se borró la marca [DATO cifra] de las
  camionetas Ford y no quedan más de dos [DATO cifra] seguidas en el guion
  (la secuencia es cifra, comparacion, cifra, cifra, barras, comparacion,
  cifra, comparacion); los tres números largos quedaron bajo tres cifras
  significativas ("más de diez millones", "cerca de un millón", "cerca de mil
  seiscientos pesos") y las exactas siguen en pantalla; el titular del peso
  quedó en palabras y en 10 palabras; "¿En qué quedó?" trae su [FUENTE]; el
  Colegio de Profesoras y Profesores de Chile está en "Fuentes:"; se borraron
  los dos titulares duplicados; y el bloque de Maipú termina en el hecho de los
  más de ciento diez millones de pesos.
- Nada quedó sin sonar después de borrar esos dos titulares, y se contó contra
  el informe: 3 noticias [A] más 24 [B] más 17 [C] son 44, el guion narra 10
  (las 3 [A] y 7 [B], justo en el tope del prompt) y el bloque "En titulares"
  trae 32 frases, una por cada una de las 34 restantes menos las dos que ya
  suenan narradas (los láseres de Atacama en "## Dato curioso" y la cordillera
  de Valparaíso en el bloque de Biobío, que el propio informe marca como
  remisión en su línea 194).
- El archivo no trae raya larga ni raya media (cero coincidencias de U+2014 y
  U+2013 en el archivo completo) y las tres carátulas están dentro del tope de
  cuatro palabras por línea.
- La carátula que faltaba al validar la vuelta 1 ya está:
  contenido/caratulas/2026-10-01.png existe en main.
