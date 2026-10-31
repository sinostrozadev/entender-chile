VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-31T05:25:40Z

Correcciones:
1. Dónde: línea 3, "Carátula sugerida: ¿Quién autorizó rebajas? / Fiscalía
   investiga" · Regla: "EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026,
   Santiago): '¿Quién las autorizó? / La firma decisiva' salió al aire sin
   decir qué se autorizó, y el espectador no tenía de qué agarrarse. Al menos
   una de las dos líneas tiene que traer el objeto de la noticia (qué cosa, a
   quién) con las palabras del informe", más la "PRUEBA DEL GANCHO: si un
   desconocido necesita preguntarte '¿qué?' o '¿de quién?', no es gancho" ·
   Debe quedar: la pregunta nombra el objeto que el informe nombra, "decretos
   que rebajaron condenas" (línea 13 de contenido/informes/2026-10-31.md), y
   no "rebajas" a secas, que en mayúsculas sobre la carátula se lee como
   rebajas de precio. Sirve "¿Quién rebajó las condenas? / Fiscalía
   investiga": cuatro palabras la primera línea y dos la segunda, contadas,
   dentro del máximo de cuatro por línea, y sigue siendo la PREGUNTA que pide
   la primera carátula.
2. Dónde: línea 5, "Carátula 3: Dos autoridades investigadas / Una renuncia" ·
   Regla: la misma del punto 1, "al menos una de las dos líneas tiene que
   traer el objeto de la noticia (qué cosa, a quién) con las palabras del
   informe" · Debe quedar: ninguna de las dos líneas dice qué se investiga ni
   a quién, así que una de ellas tiene que traer el objeto con las palabras
   del informe. Sirve "Condenas rebajadas / Dos autoridades investigadas":
   dos palabras la primera línea y tres la segunda, contadas, y mantiene el
   segundo giro que pide la tercera carátula (no hay en el bloque de portada
   una cifra que se entienda en un segundo, así que la variante de cifra con
   referencia no corresponde hoy).
3. Dónde: línea 33, "Casi sesenta y dos mil de los niños rezagados viven en la
   Región Metropolitana" · Regla: "Si el informe trae un ejemplo a escala
   humana ('para un sueldo de...'), nárralo: es el momento en que el oyente
   entiende. Nárralo como propio, sin mencionar el informe como documento" ·
   Debe quedar: el informe trae la escala humana rotulada en su línea 71 ("los
   casi 62 mil niños rezagados de la Región Metropolitana equivalen
   aproximadamente al 44% del total nacional pendiente") y el guion narra solo
   la cifra suelta, sin la equivalencia que la hace entender. El párrafo tiene
   que narrar también esa proporción, con el número en palabras ("cerca del
   cuarenta y cuatro por ciento de todos los niños pendientes del país") y sin
   nombrar el informe como documento.
4. Dónde: línea 33, el mismo párrafo, que se sostiene en "Casi sesenta y dos
   mil" y no lleva marca propia: la única marca del bloque es la de la línea
   32, con la cifra nacional de la tesis · Regla: control interno 7, "cada
   párrafo que se sostiene en una cifra trae su [DATO] con la cifra
   principal", y "CRITERIO DE LA CIFRA (obligatorio): la cifra que va a
   pantalla es la que CAMBIA ALGO PARA ALGUIEN" · Debe quedar: una marca
   [DATO] justo antes de ese párrafo, con su cifra principal (los casi 62 mil
   rezagados de la Región Metropolitana) y etiqueta con contexto de 3 a 8
   palabras. Por la regla de variedad ("nunca dos tarjetas del mismo tipo
   seguidas dentro del mismo bloque") no puede ser una segunda [DATO cifra]
   después de la línea 32: con los dos valores comparables del informe (62 mil
   en la Región Metropolitana y más de 140 mil en el país, misma unidad)
   corresponde la fila 6 del árbol, [DATO comparacion], cada valor con su
   propio rótulo. Si eso deja la cifra nacional repetida en dos tarjetas del
   bloque, la comparación reemplaza a la marca de la línea 32.
5. Dónde: línea 29, "[FUENTE Ministerio de Salud, 28 oct; OPS, 28 oct]", y
   líneas 40 y 43, "[FUENTE SENAPRED, 30 oct; Dirección Meteorológica, 30
   oct]" y "[DATO cifra | SENAPRED, 30 oct]" · Regla: "SIGLAS: toda sigla que
   se PINTE EN PANTALLA (en esta marca o en el pie de un [DATO]) va expandida
   la primera vez que aparece en el guion: 'Dirección Meteorológica (DMC)', no
   'DMC' a secas", con salvedad solo para las de uso corriente (IPC, PIB, ONU,
   INE, Carabineros, PDI) · Debe quedar: ni OPS ni SENAPRED están en esa
   salvedad y ninguna se expande en el guion. Para OPS: el prompt permite una
   sola fuente principal por bloque, así que la marca de la línea 29 queda con
   "Ministerio de Salud, 28 oct" (la Organización Panamericana de la Salud
   sigue acreditada en la lista de Fuentes). Para SENAPRED: la narración lo
   dice expandido la primera vez que suena en el bloque, como en las ediciones
   anteriores ("El Servicio Nacional de Prevención y Respuesta ante Desastres,
   Senapred, ..."), y las marcas pueden mantener la forma corta, que cabe en
   el máximo de seis palabras del pie.

Observaciones:
- Para el día: el largo NO está marcado como incumplimiento y conviene saber
  por qué. "node scripts/validar-tarjetas.js" avisa 393 palabras narradas,
  bajo el piso de 420, pero su conteo (línea 90 del script) descarta toda
  línea que empieza con corchete, y ahí van las cuatro [TESIS], que el prompt
  declara narradas ("Sí se narra"). Las cuatro suman 53 palabras (14, 12, 14 y
  13, contadas), así que lo que de verdad se oye son 446 palabras, dentro de
  420 a 600. Reparto verificado: noticia del día 29, apertura 34, portada 124,
  sarampión 104, alertas 98, cierre 57. Mandar a rellenar un guion que cumple
  habría costado una vuelta entera, así que el aviso del script quedó
  descartado con el conteo a la vista. El script merece el arreglo: hoy mide
  bajo en todos los guiones del formato corto.
- Los bloques de sarampión (104 palabras) y de alertas (98) quedan bajo el
  reparto orientativo de 110 a 160 por noticia. No bloquea, el reparto es
  orientativo, y la corrección 3 ya levanta el de sarampión.
- La descripción sugerida cita la caída de 2,7% de la producción industrial,
  cuyo origen en el informe es el Instituto Nacional de Estadísticas, y esa
  fuente no está en la lista de Fuentes. El prompt solo obliga a listar las
  fuentes de lo narrado, así que no es incumplimiento, pero la descripción se
  publica con esa lista al lado.
- Senapred se escribe "Senapred" en las ediciones anteriores, no "SENAPRED" en
  mayúsculas sostenidas. No es regla del prompt, es consistencia de pantalla.
