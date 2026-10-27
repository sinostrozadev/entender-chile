VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-27T05:44:56Z

Correcciones:
1. Dónde: línea 11, "Un tornado clasificado preliminarmente como EF dos golpeó
   Requínoa el veintiséis de octubre." · Regla: "Explica siglas la primera vez
   cuando un oyente general pueda no conocerlas" (EXPLICACIÓN ORAL, punto 4) ·
   Debe quedar: la primera vez que se dice "EF dos" va con lo que esa categoría
   significa, tomado del informe, que trae la glosa en la línea 16
   ("Esa categoría corresponde a vientos capaces de causar daños
   considerables"). El código se pinta además en el título y en la carátula 3,
   así que el oyente tiene que poder decodificarlo al oírlo. Redacción
   verificada contra el tope de 25 a 35 palabras de "La noticia del día"
   (queda en 33) y contra el informe: "Un tornado clasificado preliminarmente
   como EF dos, vientos capaces de causar daños considerables, golpeó Requínoa
   el veintiséis de octubre. En Santiago, diez comunas quedaron bajo alerta
   roja por riesgo de remociones en masa." Si lo resuelves en el bloque de
   noticia en vez de acá, vale igual, siempre que sea la PRIMERA vez que suena.

2. Dónde: línea 31, "[DATO barras | Interferencia, 26-10-2026] condenados por
   abuso sexual: 27 ; condenados por violación: 29" · Regla: el árbol del tipo,
   "De 3 a 6 valores de la misma familia y misma unidad donde importa el tamaño
   relativo -> barras" y "Dos o tres valores de cosas distintas pero
   comparables, MISMA unidad -> comparacion. Ej: fallecidos: 797 ;
   desaparecidos: 3048" · Debe quedar: la marca con tipo `comparacion` en lugar
   de `barras`, porque trae DOS valores y barras parte en tres. No cambies los
   valores ni la fuente. Esto no rompe la variedad: queda cifra, comparacion,
   comparacion y dos esquemas, y la regla de dos tipos iguales seguidos corre
   dentro de un mismo bloque, no entre bloques distintos.

3. Dónde: línea 31, el rótulo "condenados por abuso sexual: 27 ; condenados por
   violación: 29" · Regla: "ETIQUETA CON CONTEXTO (obligatorio): la etiqueta
   dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de modo que la
   tarjeta se entienda con el video en silencio" · Debe quedar: cada rótulo
   tiene que decir que son los beneficiados con la rebaja, no la población de
   condenados. Tal como está, la tarjeta en silencio afirma que hay 27
   condenados por abuso sexual y 29 por violación, que es otra cosa.
   Verificado en 3 a 8 palabras: "rebajas a condenados por abuso sexual: 27 ;
   rebajas a condenados por violación: 29" (6 y 5 palabras).

4. Dónde: línea 20, el segundo rótulo de "[DATO comparacion | BioBioChile y La
   Tercera, 26-10-2026] viviendas dañadas en Requínoa: al menos 20 ; reporte
   más alto: más de 70" · Regla: "LA ETIQUETA TIENE QUE EXPLICAR LA CIFRA SOLA,
   sin la narración" y "CADA VALOR CON SU PROPIO RÓTULO, también cuando
   comparas" · Debe quedar: "reporte más alto" no dice qué cuenta, así que en
   pantalla "más de 70" queda sin unidad ni contexto. Cada valor con su rótulo
   completo, verificado en 3 a 8 palabras: "viviendas dañadas en Requínoa,
   reporte más bajo: al menos 20 ; viviendas dañadas en Requínoa, reporte más
   alto: más de 70" (7 y 7 palabras). El tipo `comparacion` está bien elegido y
   no se toca: son dos reportes distintos de la misma unidad, y un `cambio`
   pintaría una flecha de un cambio que nunca ocurrió.

Observaciones:
- La carátula del día no está en el repo: no hay `contenido/caratulas/2026-10-27.png`,
  ni `-prompt.txt`, ni `-NO-PUDE.md` (carpeta listada en esta misma corrida). No
  bloquea, porque el propio prompt manda que la imagen vaya después del commit
  del guion y sin detener nada, y la edición sigue con la carátula de respaldo.
  Si el generador falló, queda pendiente el archivo NO-PUDE con el motivo.
- En la línea 11, "la precordillera quedó bajo alerta roja" comprime de más: la
  alerta roja es para diez comunas, y varias de ellas (Colina, Puente Alto) no
  son precordillera; lo precordillerano es la evaluación de Sernageomin. La
  redacción propuesta en la corrección 1 ya lo resuelve nombrando las diez
  comunas, como hace bien la línea 23.
- La categoría `congreso` del bloque de Rabat es defendible (proyecto, sesión
  especial, acusación constitucional) y ninguna de las doce calza mejor. Queda
  anotado para el día en que el mismo tema vuelva con el foco en los decretos,
  donde `seguridad` archivaría mejor.
- El resto de lo verificado cumple: selección de tres noticias con la portada
  primera y las dos [A] siguientes en el orden del informe (la cuarta [A], la de
  los fondos D y E, queda en la web, que es lo que manda el formato corto); 453
  palabras narradas; aperturas, cierre y tagline en regla; sin rayas, sin
  conectores de ensayo, sin paréntesis ni URLs en lo narrado; números narrados en
  palabras; todas las fuentes de marcas y de bloques acreditadas y ninguna ruta
  interna en la lista; línea en blanco después de cada tesis.
