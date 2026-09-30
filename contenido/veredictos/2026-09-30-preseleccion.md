VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-30T04:51:26Z

Correcciones:
1. Dónde: diecinueve candidatas llevan en el tercer campo del bloque una
   búsqueda de Google News en vez de la URL de la nota, o la portada de la
   institución: líneas 88, 107, 118, 121, 126, 129, 132, 135, 146, 149, 154,
   157, 160, 165, 168, 171, 177 y 180 con "https://news.google.com/rss/search?q=..."
   (por ejemplo, línea 146: "Pronósticos advierten una ola de calor
   extraordinaria en sectores del país | medios meteorológicos |
   https://news.google.com/rss/search?q=Chile+ola+de+calor+extraordinaria+septiembre+2026"),
   y línea 63 con "https://www.fiscaliadechile.cl/", que es la portada.
   · Regla: "FORMATO DE SALIDA (estricto, una noticia por bloque de dos
   líneas): - <titular en tus palabras, claro y específico> | <medio o medios>
   | <URL>", junto con "VERIFICACIÓN EN ESTA ETAPA. Mínima: basta que el
   titular provenga de una fuente identificable." Una consulta de búsqueda no
   es la URL de la noticia del bloque y no identifica la fuente: devuelve lo
   que el buscador tenga en ese momento.
   · Debe quedar: cada uno de esos diecinueve bloques con la URL que el
   barrido de hoy trae para esa misma noticia, que existe en los diecinueve
   casos (línea de la pieza a línea de contenido/barrido/2026-09-30.md: 63 a
   471 o 474, 88 a 222, 107 a 510, 118 a 588, 121 a 570, 126 a 504, 129 a 528,
   132 a 534, 135 a 237, 146 a 204, 149 a 216, 154 a 201, 157 a 231, 160 a 378,
   165 a 285, 168 a 354, 171 a 333, 177 a 348, 180 a 309). Si resuelves el
   redirector y dejas el enlace directo del medio, mejor, como ya hiciste en
   las líneas 8, 11, 34, 48, 60, 68, 77, 82, 85 y 115.
2. Dónde: cuatro candidatas no nombran ningún medio en el campo "<medio o
   medios>": línea 135 ("prensa económica regional"), línea 146 ("medios
   meteorológicos"), línea 157 ("medios regionales") y línea 168 ("prensa
   nacional e internacional").
   · Regla: el formato estricto exige "| <medio o medios> |", y la
   verificación de esta etapa pide que "el titular provenga de una fuente
   identificable". Una categoría de prensa no es un medio identificable.
   · Debe quedar: el nombre del medio que el barrido trae para cada una:
   línea 135, Nueva Rioja y Clarin.com (barrido, línea 238); línea 146, Tiempo
   de San Juan (barrido, línea 205); línea 157, OvejeroNoticias (barrido,
   línea 232); línea 168, UCV radio (barrido, línea 355), o Chicureo Hoy
   (barrido, línea 307). Puedes conservar "otros medios" como segundo término,
   como en las líneas 126, 149, 165 y 171, pero al menos un medio con nombre.

Observaciones:
- Para la pieza siguiente: seis hechos del barrido quedaron fuera de la olla y
  entran por criterio propio del prompt (cambian reglas, comprometen fondos
  públicos o son riesgo en curso). Se buscaron uno por uno en la pieza y no
  aparecen: la Cancillería en entredicho por ocultar el contenido de la
  declaración del Escudo de las Américas (barrido, línea 366; cero
  coincidencias de "Cancillería" en la pieza); quién es el candidato fuerte
  para liderar la Suseso, clave para fiscalizar fraudes en licencias médicas
  (línea 741; cero coincidencias de "Suseso"); el pueblo tribal
  afrodescendiente chileno que enfrenta al Estado en la Corte IDH (línea 621;
  cero de "afrodescendiente" y cero de "Corte IDH"); la alerta de Greenpeace
  por la nueva temporada de incendios y las medidas de prevención pendientes
  (línea 375; cero de "Greenpeace"); el alcalde de Punta Arenas contra la
  presión argentina por la ruta a las Malvinas (línea 630; cero de "Punta
  Arenas" y cero de "Malvinas"); y el sondeo sobre la facilidad percibida para
  obtener licencia médica pese al efecto Contraloría (línea 381), que es
  distinto del informe de licencias municipales de CIPER que sí está en la
  línea 74.
- Para la pieza siguiente: la candidata del Sernac (línea 68) dice solo que el
  director entra en la fase final de su salida, y el barrido agrega el motivo,
  que la salida sigue a su suspensión por acoso laboral (línea 393). El
  informe debería tomar ese dato.
- Para la pieza siguiente: la condena a la exfuncionaria del caso Barriga
  (línea 51) no trae la plata, y el barrido la tiene: cobró 110 millones de
  pesos en cuatro años de licencia (línea 399).
- Para la pieza siguiente: la magnitud 4,7 del sismo (línea 149) viene de un
  solo medio y extranjero, Panamericana TV, que el barrido marca "alarma:
  sismo (un solo medio por ahora)" (línea 597); la entrada de Chilevisión
  (línea 216) no da magnitud. El informe tiene que confirmarla con el Centro
  Sismológico Nacional antes de usarla. Igual conviene mirar la candidata del
  sobreviviente de la explosión en la frontera de Arica (línea 180), que
  descansa en un solo medio, SoyChile.cl, también marcado así en el barrido
  (línea 309).
- La cuarta línea de "Historias en curso sin novedad hoy" (línea 192) explica
  que el caso de sarampión sí tuvo novedad y está incluido, lo que contradice
  el propósito de esa sección, reservada a "temas del informe de ayer que
  siguen abiertos pero no tuvieron avance". La explicación calza mejor en
  "Notas del barrido".
- La olla trae 52 candidatas, dentro del rango aceptable de 35 a 60 y cerca
  del objetivo de 50, con un barrido de 248 noticias con señal.
- Los doce encabezados obligatorios están con su nombre exacto y todos con al
  menos una candidata, así que "ninguna" en "Áreas sin material hoy" es
  correcto.
- La cuota blanda de regiones queda cumplida con holgura: Tarapacá, Traiguén,
  Chile Chico, Antofagasta (la incautación de drogas, la clínica veterinaria y
  Minera Centinela), Arica, Puerto Williams, el paso Los Libertadores y el
  norte del país están fuera de la Región Metropolitana.
- El único cierre pendiente del informe del 29-09-2026 (variación oficial de
  precios de combustibles, línea 152 de ese informe) vence el 01-10-2026, así
  que no había candidata obligatoria hoy y la nota de la pieza (línea 197) es
  correcta.
- La pieza no trae raya larga ni media (cero coincidencias de U+2014 y U+2013
  en el archivo completo), las fechas de la prosa están en DD-MM-AAAA, no hay
  preámbulo ni comentario final, las tres secciones finales obligatorias están
  presentes (líneas 183, 187 y 194) y los 52 bloques de noticia cumplen el
  formato de dos líneas con los tres campos y la sangría de dos espacios.
