VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-22T14:37:20Z

Correcciones:
1. Dónde: las marcas de las líneas 83, 92, 101, 110 y 119, "[DATO cifra |
   Contraloría, 21 sep] promedio entre diez suspensiones más largas:
   $67.142.619", "[DATO cifra | Subtel, 21 sep] dominios de apuestas a
   bloquear: 37", "[DATO cifra | Gobierno Regional, 21 sep] reducción
   presupuestaria advertida: más de $15.000 millones", "[DATO cifra | UFRO,
   21 sep] puestos adicionales estimados: más de 37.000" y "[DATO cifra | El
   País, 21 sep] meta de viviendas a 2030: 400.000": cinco [DATO cifra]
   seguidas, sin ninguna otra tarjeta entre ellas. · Regla: VARIEDAD, "nunca
   más de dos [DATO cifra] seguidas en el guion", y control interno 17,
   "Variedad visual: no hay más de dos [DATO cifra] seguidas". · Debe quedar:
   como máximo dos [DATO cifra] consecutivas en toda la secuencia de marcas.
   El árbol está bien aplicado (los cinco son de un solo valor, fila 7), así
   que corresponde lo que manda la propia regla: "si el árbol está bien
   aplicado, deja la cifra sobrante en la narración". Por ejemplo, conservar
   las marcas de Contraloría y del Gobierno Regional de Valparaíso y eliminar
   las de Subtel, UFRO y la meta de viviendas, dejando esas tres cifras solo
   en el texto narrado, que ya las trae. Las fuentes de esos bloques siguen en
   la lista "Fuentes:", porque su contenido se sigue narrando.
2. Dónde: el titular de la línea 133, "Antofagasta incautó mil cuatrocientos
   veintinueve kilos de cannabis." · Regla: REGLA DE REDONDEO EN VOZ, "las
   cifras grandes se narran REDONDEADAS, con 'más de', 'casi', 'cerca de' o
   'unos'... Tope: TRES cifras significativas habladas por número"; mil
   cuatrocientos veintinueve son cuatro. · Debe quedar: la cifra redondeada a
   tres cifras significativas, por ejemplo "Antofagasta incautó más de mil
   cuatrocientos kilos de cannabis." (nueve palabras, una sola cifra, fiel al
   1.429 del informe).
3. Dónde: el titular de la línea 132, "Dieciocho condenas por el ataque al
   molino superan mil años sumados.", con dos cifras habladas, "dieciocho" y
   "mil años". · Regla: EXTENSIÓN SEGÚN PESO, "en cada titular, una [cifra]
   como mucho", y EN TITULARES, "El hecho y, si es imprescindible, UNA
   cifra". · Debe quedar: el titular con una sola cifra, por ejemplo "Las
   condenas por el ataque al molino suman más de mil años." (doce palabras,
   dentro del tope, y fiel al informe, que dice que las penas sumadas superan
   mil años).
4. Dónde: las [TESIS] narradas de las líneas 73, "Contraloría contó 485
   suspensiones pagadas y 221 que ya superaban un año.", 29, "El balance bajó
   frente a 2025, aunque esta celebración tuvo un día menos." y 117, "Cumplir
   la meta de 2030 exige acelerar fuertemente la entrega mensual de
   viviendas.": los números van en numerales dentro de texto que sí se
   narra. · Regla: EXPLICACIÓN ORAL, "Convierte cifras, monedas, porcentajes,
   fechas y abreviaturas a una forma cómoda de pronunciar, escribiendo los
   números en palabras"; la marca [TESIS] "Sí se narra", y los numerales están
   reservados a los VALORES de [DATO] ("La regla de números en palabras aplica
   solo al texto narrado"); control interno 9. · Debe quedar: las tres tesis
   con los números en palabras y dentro de las 18 palabras, por ejemplo
   "Contraloría contó cuatrocientos ochenta y cinco suspensiones pagadas y
   doscientas veintiuna que ya superaban un año." (16 palabras), "El balance
   bajó frente a dos mil veinticinco, aunque esta celebración tuvo un día
   menos." (15) y "Cumplir la meta de dos mil treinta exige acelerar
   fuertemente la entrega mensual de viviendas." (15). El propio guion ya
   narra "dos mil veinticinco" y "dos mil treinta" en los párrafos de las
   líneas 32 y 120.

Observaciones:
- Para la pieza siguiente: la cobertura está completa y no hay que rehacerla.
  Se narran las tres [A] y siete [B], diez noticias, justo en el tope, y las
  38 restantes tienen su frase en "En titulares", una por línea, ninguna sobre
  doce palabras. Ninguna noticia del informe quedó sin sonar y no hay noticias
  agregadas. Al corregir, tocar solo los cuatro lugares pedidos.
- Extensión: el texto narrado suma 2.114 palabras, contra 1.532 el 21-09,
  1.507 el 20-09 y un máximo de 1.852 en lo que va de mes. Con el ritmo que el
  propio prompt usa para calcular el bloque de titulares (18 titulares de doce
  palabras en 90 segundos, unas 132 palabras por minuto), la edición se va a
  unos 16 minutos, por encima del "en torno a 10 minutos... 12 o 13 en días
  cargados". No bloquea, porque el prompt no fija un presupuesto de palabras,
  pero si al corregir se quiere acortar, el prompt dice por dónde: "recorta
  desarrollo de las [B] antes que eliminar el bloque En titulares".
- "[FUENTE DMC, 21 y 22 sep]" y "[DATO barras | DMC, 21 sep]" abrevian la
  Dirección Meteorológica en dos marcas que se pintan en pantalla, donde la
  sigla no se explica sola; el bloque siguiente sí escribe "Dirección
  Meteorológica". Misma observación que quedó el 21-09.
- Etiquetas de dos palabras en "[DATO comparacion] fallecidos viales: 20" y
  "[DATO comparacion] funcionarios suspendidos: 485", frente al piso de "3 a 8
  palabras" que pide ETIQUETA CON CONTEXTO. Con el video en silencio no se ve
  que la primera es del balance de Fiestas Patrias ni que la segunda es de
  suspensiones con sueldo.
- "[DATO barras | DMC, 21 sep]" lleva rangos (30-50 mm, 50-75 mm, 70-100 mm)
  en vez de valores únicos; una barra dibuja un valor, no un intervalo.
- El bloque de Bachelet suma seis frases contando la [TESIS] narrada, el borde
  del rango de tres a cinco que el prompt da para las [B]. Es la misma
  observación que quedó el 21-09 con el bloque de Criteria.
- El bloque de la noticia de portada suma 286 palabras narradas contando "La
  noticia del día", y el de Contraloría, 289. Quedan empatados, cuando el
  prompt pide que la noticia de apertura reciba "el mayor desarrollo".
- "[ESQUEMA | Trámite de Sala Cuna Universal] discusión inmediata -> debate en
  cámara -> despacho -> siguiente etapa" cierra con "siguiente etapa", que no
  es un paso que el informe nombre.
- El titular "En la Universidad de Chile, gratuidad cubre casi medio
  pregrado." redondea hacia arriba el 44,9% del informe, que es un porcentaje
  con un decimal y que la regla de redondeo exceptúa.
- El titular "El alcalde Luis Álvarez tiene noventa y cuatro años." entrega la
  edad, pero no el hecho del informe: que es el alcalde más longevo del país.
