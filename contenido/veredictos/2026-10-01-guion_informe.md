VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-01T05:55:22Z

Correcciones:
1. Dónde: "[DATO barras | ENAP, 30 sep] gasolina por litro: $39,4 ; diésel por
   litro: $95 ; parafina por litro: $281,8" · Regla: "ETIQUETA CON CONTEXTO
   (obligatorio): la etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8
   palabras, de modo que la tarjeta se entienda con el video en silencio" ·
   Debe quedar: las tres etiquetas dicen que el valor es el alza, no el precio
   ("alza de gasolina por litro: $39,4 ; alza del diésel por litro: $95 ; alza
   de la parafina por litro: $281,8"). Con el video en silencio, "gasolina por
   litro: $39,4" se lee como que la gasolina cuesta 39,4 pesos el litro.
2. Dónde: "[DATO barras | Dirección Meteorológica, 30 sep] viento sostenido: 25
   a 40 km/h ; rachas máximas: 70 km/h" · Regla: el árbol de tipos, fila 6,
   "Dos o tres valores de cosas distintas pero comparables, MISMA unidad ->
   comparacion", y fila 4 pide "De 3 a 6 valores" para barras; además "Si dos
   filas calzan, gana la de MÁS ABAJO (la más simple)" · Debe quedar: la misma
   marca con tipo comparacion, "[DATO comparacion | Dirección Meteorológica, 30
   sep] viento sostenido: 25 a 40 km/h ; rachas máximas: 70 km/h". Son dos
   etiquetas en la misma unidad, no tres.
3. Dónde: las tres marcas seguidas "[DATO cifra | Sernac, 29 sep] camionetas
   incluidas en la campaña: más de 1700", "[DATO cifra | Ministerio de
   Hacienda, 30 sep] aumento del gasto propuesto: 1,5%" y "[DATO cifra |
   Sindicato N°2, 30 sep] respaldo a la huelga: 95%" · Regla: "VARIEDAD (...):
   nunca más de dos [DATO cifra] seguidas en el guion", y el control interno 17,
   "no hay más de dos [DATO cifra] seguidas" · Debe quedar: se borra la marca
   [DATO cifra] de las camionetas Ford y su cifra queda solo en la narración,
   como ordena la propia regla ("si el árbol está bien aplicado, deja la cifra
   sobrante en la narración"). Es la que menos pierde: su número ya está en
   pantalla en la [TESIS] del bloque, "Más de mil setecientas camionetas deben
   pasar por una reparación gratuita". El árbol está bien aplicado en las tres,
   así que no hay que cambiarles el tipo.
4. Dónde: "una fuerza laboral de más de diez millones doscientas sesenta mil
   personas. De ellas, novecientas ochenta y nueve mil cuatrocientas estaban
   desocupadas" y, en el bloque de combustibles, "el aumento llega a mil
   quinientos setenta y seis pesos en gasolina" · Regla: "REGLA DE REDONDEO EN
   VOZ (...): las cifras grandes se narran REDONDEADAS, con 'más de', 'casi',
   'cerca de' o 'unos' (...). Tope: TRES cifras significativas habladas por
   número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no). La
   cifra exacta va en la marca [DATO], que es para pantalla" · Debe quedar: los
   tres números bajo tres cifras significativas: "más de diez millones de
   personas" (4 significativas hoy: 1, 0, 2, 6), "De ellas, cerca de un millón
   estaban desocupadas" (hoy 9, 8, 9, 4) y "el aumento llega a cerca de mil
   seiscientos pesos en gasolina" (hoy 1, 5, 7, 6). Las cifras exactas ya van a
   pantalla en sus marcas, 989400 y +$1576, que no se tocan.
5. Dónde: el titular "El peso cerró su peor trimestre frente al dólar desde
   2024." · Regla: "Convierte cifras, monedas, porcentajes, fechas y
   abreviaturas a una forma cómoda de pronunciar, escribiendo los números en
   palabras", y el control interno 9, "que los números estén en palabras" · Debe
   quedar: "El peso cerró su peor trimestre desde dos mil veinticuatro." Son 10
   palabras, bajo el tope de 12 del bloque (contado: la versión con "frente al
   dólar" llega a 13 y no cabe). Es el único número en cifras que quedó en texto
   narrado.
6. Dónde: el bloque "## ¿En qué quedó?", cuya primera línea es "La Corte de
   Apelaciones de Santiago limitó la revisión de los dispositivos incautados" ·
   Regla: "[FUENTE medio, fecha] (...) En la línea siguiente a cada '##
   sección': la fuente principal del bloque (...). Cada bloque de noticia la
   lleva, incluida 'La noticia del día'; Apertura, Dato curioso, Agenda, En
   titulares y Cierre no" · Debe quedar: la línea "[FUENTE Corte de
   Apelaciones, 29 sep]" inmediatamente después del encabezado. La lista de
   bloques sin fuente es cerrada y "¿En qué quedó?" no está en ella, y el
   prompt pide narrar esa sección como noticias breves. Sin la marca, la
   tarjeta de Junaeb-Soser queda sin fuente al pie.
7. Dónde: la lista "Fuentes:", que no incluye al Colegio de Profesoras y
   Profesores de Chile · Regla: "lista una línea por cada fuente de las marcas
   [DATO] y [CITA] Y por cada fuente del informe cuyas noticias narraste (...)
   una fuente cuyo contenido se narró no puede quedar sin crédito" · Debe
   quedar: agregar "- Colegio de Profesoras y Profesores de Chile, 30 sep y 1
   oct 2026." tal como está en el informe. Su contenido suena dos veces, en el
   titular "Profesores se movilizan contra un instructivo de educación pública"
   y en la agenda, "Durante la jornada habrá movilizaciones nacionales de
   organizaciones docentes", y el informe lo acredita en las dos.
8. Dónde: los titulares "Láseres de Atacama crean estrellas artificiales para
   mejorar observaciones." y "El aviso de viento también incluye la cordillera
   de Valparaíso." · Regla: "Si por error el informe trata un mismo tema en dos
   secciones con los mismos datos, nárralo una sola vez, en el lugar de mayor
   desarrollo, y no lo reintroduzcas", el control interno 3, "no hay ningún tema
   narrado dos veces", y la definición del bloque, "UNA frase por cada noticia
   del informe que no se narró" · Debe quedar: los dos titulares se borran. Los
   láseres ya van narrados completos en "## Dato curioso", que es su lugar de
   mayor desarrollo, y la cordillera de Valparaíso ya está narrada en el bloque
   de Biobío ("un aviso por viento entre Coquimbo y Biobío, incluida la
   cordillera de Valparaíso"); el propio informe marca ese [C] como remisión,
   "como se detalla en Medioambiente y clima". Nada queda sin sonar: el bloque
   baja de 34 a 32 titulares y las dos noticias siguen en el video.
9. Dónde: la frase que cierra el bloque "## Fraude al fisco en Maipú", "La
   sentencia continúa una causa que ya venía siendo informada y mantiene
   abierto el seguimiento sobre el uso de recursos públicos en el municipio." ·
   Regla: "Ningún bloque termina con una síntesis abstracta (...). Cada bloque
   termina con un hecho, una consecuencia concreta para alguien, o una pregunta
   que el bloque siguiente responde", y "Las líneas del informe que empiezan con
   'EN SEGUIMIENTO:' (...) son marcas internas del sistema, no texto
   periodístico: no las narres, no las menciones ni las conviertas en frase" ·
   Debe quedar: la frase se borra y el bloque termina en el hecho que ya trae,
   "Recibió más de ciento diez millones de pesos desde la Municipalidad de
   Maipú durante la administración de Cathy Barriga." El informe trae "EN
   SEGUIMIENTO: Municipalidad de Maipú, causa Cathy Barriga", y "mantiene
   abierto el seguimiento" es esa marca interna convertida en frase.

Observaciones:
- Para la pieza siguiente: el informe entrega el alza del gas licuado vehicular
  ($61,4 por litro) dentro de la noticia [A] de combustibles y el guion no la
  narra; cabe en el mismo párrafo sin forzar nada. Y el informe fecha dos hechos
  que el guion deja sin fecha: la interpelación del Escudo de las Américas
  (28-09-2026) y el fallo de la Corte en Junaeb-Soser (29-09-2026), que el guion
  del 30-09 sí narraba con su fecha.
- El titular "Tres funcionarios quedaron presos por compras públicas irregulares
  en Atacama" afirma más que el cuerpo del informe, que dice "prisión
  preventiva" y "presuntas irregularidades". El encabezado del informe sí habla
  de corrupción, así que no lo marco como incumplimiento, pero "Tres
  funcionarios quedaron en prisión preventiva por compras públicas en Atacama"
  son 11 palabras, cabe en el tope de 12 y no adelanta un fallo.
- "## Dato curioso" va sin categoría entre corchetes. Queda ambiguo en el
  prompt: la lista de bloques de estructura que no llevan corchete no lo nombra,
  pero `dato-curioso` sí es una de las doce categorías, y la regla de [FUENTE] lo
  agrupa con los bloques que no llevan fuente. En la práctica no rompe nada,
  porque scripts/imagenes-secciones.js resuelve la categoría por el título del
  bloque. Conviene fijar la convención: en los últimos guiones salió de las dos
  formas (25 y 26-09 con corchete, 24 y 30-09 sin él).
- Dos hechos suenan en un titular y además en la agenda: el Imacec de las 08:30
  y las movilizaciones docentes. No lo marco como incumplimiento porque la
  agenda cumple otra función que el prompt exige aparte (qué conviene observar
  hoy), pero es la misma tensión de la corrección 8 y conviene decidir la
  convención.
- "Agua Negra no abrirá durante diciembre" no dice qué es Agua Negra. "El paso
  Agua Negra no abrirá durante diciembre" son 8 palabras y el oyente entiende.
- Al validar no existe contenido/caratulas/2026-10-01.png ni el archivo
  2026-10-01-NO-PUDE.md. No es incumplimiento de la pieza, porque el prompt pone
  la imagen después del commit del guion, pero falta por hacer.
