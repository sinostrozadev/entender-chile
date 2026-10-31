VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-31T05:31:38Z

Observaciones:
- Para el día: el aviso del script vuelve a quedar descartado con el conteo a
  la vista, igual que en la vuelta anterior. "node scripts/validar-tarjetas.js"
  marca 419 palabras narradas, un punto bajo el piso de 420, pero su filtro
  (línea 90 del script) descarta toda línea que empieza con corchete, y ahí van
  las cuatro [TESIS], que el prompt declara narradas ("Sí se narra"). Las
  cuatro suman 53 palabras (14, 12, 14 y 13, contadas), así que lo que de
  verdad se oye son 472 palabras, dentro de 420 a 600. Reparto verificado:
  noticia del día 29, apertura 34, portada 124, sarampión 121, alertas 107,
  cierre 57. Dos vueltas seguidas con el mismo falso aviso, y hoy a un solo
  punto del piso: el arreglo del script (contar el texto de [TESIS]) evita que
  una corrida futura mande a rellenar un guion que cumple.
- El bloque de alertas queda en 107 palabras, tres bajo el reparto orientativo
  de 110 a 160. No bloquea, el reparto es orientativo, y el bloque de sarampión
  subió de 104 a 121 con la corrección 3.
- La marca [DATO comparacion] de la línea 32 escribe 140000 y 62000, mientras
  el informe da "más de 140 mil" (línea 63) y "casi 62 mil" (línea 65). Son los
  únicos valores que la entrada trae, así que no hay cifra exacta que poner, y
  la regla de numerales obliga a esa forma. Queda anotado porque en pantalla el
  62.000 se lee como exacto cuando la entrada dice "casi".
- La descripción sugerida cita la caída de 2,7% de la producción industrial,
  cuyo origen en el informe es el Instituto Nacional de Estadísticas, y esa
  fuente no está en la lista de Fuentes. El prompt solo obliga a listar las
  fuentes de lo narrado, así que no es incumplimiento, pero la descripción se
  publica con esa lista al lado. Observación repetida de la vuelta anterior.
- Senapred se escribe "Senapred" en la narración de la línea 48 y "SENAPRED" en
  las marcas de las líneas 40 y 43 y en la lista de Fuentes. No es regla del
  prompt, es consistencia de pantalla.

Verificado contra el diff de la pieza (6390369 a 9d5a711), una por una, las
cinco correcciones de la vuelta 1 están resueltas:
Corrección 1: la línea 3 dice ahora "¿Quién rebajó las condenas? / Fiscalía
investiga", cuatro palabras la primera línea y dos la segunda, contadas, dentro
del máximo de cuatro por línea; trae el objeto de la noticia con las palabras
del informe ("los decretos que rebajaron condenas", línea 13) y sigue siendo la
pregunta que pide la primera carátula.
Corrección 2: la línea 5 dice ahora "Condenas rebajadas / Dos autoridades
investigadas", dos palabras y tres, contadas; la primera línea trae el objeto y
las dos autoridades son las dos que el informe nombra como denunciadas en su
línea 13, el ministro Fernando Rabat y el entonces subsecretario Luis Silva.
Corrección 3: la línea 33 narra ahora la proporción ("Eso equivale a cerca del
cuarenta y cuatro por ciento de todos los niños pendientes del país"), con el
número en palabras, igual al 44% de la línea 71 del informe, y sin nombrar el
informe como documento.
Corrección 4: la línea 32 es ahora una [DATO comparacion] con los dos valores,
cada uno con su propio rótulo y su unidad ("niños con esquema incompleto en
Chile: 140000 niños ; niños con esquema incompleto en Región Metropolitana:
62000 niños"), que es la fila 6 del árbol para dos valores comparables de la
misma unidad, y reemplaza a la [DATO cifra] anterior, como ofrecía el
veredicto, así que la cifra nacional no queda repetida en dos tarjetas. Las dos
etiquetas tienen contexto, de seis y siete palabras, dentro de 3 a 8, y la
fuente del pie son cinco palabras, bajo el máximo de seis.
Corrección 5: la línea 29 quedó con una sola fuente principal, "Ministerio de
Salud, 28 oct", y la Organización Panamericana de la Salud sigue acreditada en
la línea 63 de Fuentes; la línea 48 expande Senapred en la narración la primera
vez que suena en el bloque ("El Servicio Nacional de Prevención y Respuesta
ante Desastres, Senapred"), comprobado que no aparece antes en las líneas 44 y
46, y las marcas mantienen la forma corta, que es lo que el veredicto permitía.
Y lo que la corrección pudo romper, verificado: revisar-mecanico.js imprimió
"sin hallazgos mecánicos"; cero rayas largas y cero rayas medias en el archivo
completo; el largo subió a 472 palabras y sigue bajo el techo de 600; los tres
bloques de noticia son los mismos tres, con la portada primero, y no se agregó
una cuarta sección; las cuatro [TESIS] tienen 14, 12, 14 y 13 palabras, bajo el
máximo de 18, y cada una lleva su línea en blanco antes del párrafo; las tres
marcas de la edición son de tres tipos distintos (esquema, comparacion y
cifra), sin dos [DATO cifra] seguidas ni dos tarjetas del mismo tipo seguidas
en un bloque; la tesis del bloque de salud nombra el mismo indicador que la
cifra grande de su tarjeta; el título no trae número, así que la regla de la
cifra del título no aplica; y el cierre mantiene el enlace de la descripción,
la línea "Para salir hoy" del informe (línea 187) y el tagline "El resumen sin
gritos." como última frase hablada.
