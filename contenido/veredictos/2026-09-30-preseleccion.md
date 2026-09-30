VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-30T04:59:55Z

Correcciones:
1. Dónde: tres de los diecinueve bloques que la vuelta 1 marcó siguen sin la
   URL de la nota, ahora por una razón distinta: el enlace es el token de
   Google News del barrido cortado por la mitad. Línea 135 (la minería prueba
   herramientas de inteligencia artificial para mejorar la producción de
   cobre): el token de la pieza tiene 321 caracteres y es el prefijo exacto
   del token que trae el barrido en su línea 239, al que le faltan 313
   caracteres. Línea 154 (conejos silvestres podrían participar en la
   transmisión del Chagas): 268 caracteres, prefijo exacto del token del
   barrido en su línea 203, al que le faltan 275. Línea 171 (la Corte Suprema
   argentina elimina trabas para vender tierras a extranjeros): 267
   caracteres, igual al token del barrido de su línea 335 hasta el carácter
   266 y con el último cambiado (la pieza pone "A" donde el barrido pone "D"),
   seguido del cierre "?oc=5". Las tres URL completas se buscaron una por una
   en el barrido entero y dan cero coincidencias exactas.
   · Regla: "FORMATO DE SALIDA (estricto, una noticia por bloque de dos
   líneas): - <titular en tus palabras, claro y específico> | <medio o medios>
   | <URL>", junto con "VERIFICACIÓN EN ESTA ETAPA. Mínima: basta que el
   titular provenga de una fuente identificable." Un token de Google News
   truncado no es la URL de la nota: el identificador va codificado completo,
   así que cortarlo no deja un enlace más corto al mismo artículo, deja un
   enlace que no resuelve, y no identifica la fuente.
   · Debe quedar: cada uno de los tres bloques con la URL completa que el
   barrido de hoy trae para esa misma noticia, copiada entera y sin cortar.
   Línea 135, del barrido línea 239:
   https://news.google.com/rss/articles/CBMi7AFBVV95cUxNZWRRaXd5WnBGZmYtRmlIWC14aHZYVVNSbU9JbTg2RVUxN0UyZ1g5UnpoTENfUkNjekV0Szd6VDVkZXBGY3U3UHg5QkQxTmFIaDh0b3pONm8yaHBnUjJ5cGhuUTNnMUgtdW9XMWlHV3FBcmgtOURZS2lta0pSQlN5Qm5vZmJBQ2MyZzdjem1Famk4b3lRM2lheHNuYnM0LTdPUDRzeFZ5ZEF3Mkt2RzNFUll5UVREbms4b2s2ZTdjMXlBTHBELWktX1VNRGxwMm5VUWxxS3MxbzYwRElBMVlUR3E3NVpVdEZ2dThWcdIB5gFBVV95cUxQNkptemRScjg4QzJqWWJOVVlybzRXVXI5UUljUGZpb2I5b0RiWHBwWG5LZ1pRRFR1N2hyT0ZPa0wyeUs2YzBhZEQ5c3dOVG52QVk0c2otLVMzM19MN2dpbHp1VmJieGdTQ3l4WnVGQUFoNzlDeTM3N2Vyc2l2bXlkT0tMUUs3cjhpSVRwbmpjcTBfeE9HbzJHLTd1VjZoajA1T2JVSEkyTVJCeFpLemZzSENjejRYRk5RM1h0YUR2d0tvc3gtbG03SVZPdTg5MjZfMnJ1Z2tLcDVYME5TV1R3dUV2WndDQQ?oc=5
   Línea 154, del barrido línea 203:
   https://news.google.com/rss/articles/CBMixAFBVV95cUxOc0NCaFFycXFzVGxiazN5RDZZMG5SWjhFZzBwZDZvSE5RbGMtalYzaDdUM3RPRjVDeU1lSlIyVlVNaVp3aTRScmRXdmIyS0lkRHY3OTB0RTFIcmFreHdtblZvazdoZ1RDcDFTYXlyRTlNTGh1QmdCZG95NXp2VVJ5Sk9ybENyeTM3VEJPbXlmZnVWbHZOZ3JpVUVLSDlIeHA4U1RzeGh1ckx3N25UdWprT092N1AxWWVDZjJabVhjbWhMQ2tS0gHKAUFVX3lxTE0yRTQ3OFNEdFVGTDNvcXExM29IYm9yT29mLUg5RFBXcGxwWjMxaEI3a19RVXo2REsxaUZTb0hfWUlEOGN6SUVsNVlYcTNqVHJsZzJuQlRCeHVoU0pLNUlmckltU2FZcGF0VHh6dU83WGhSY1RibDdWSVBTRE1FdHltdzZiS1N6Z2lEaHdzZFZFbUU5WVh2TldjNjZOaVp5aERpQXFDY2pqSkVlRU1rQXBMajluUlh6MXRGNmFxa3c4RUp5S0dvUzNZNXc?oc=5
   Línea 171, del barrido línea 335:
   https://news.google.com/rss/articles/CBMiwwFBVV95cUxOeTl1clJYcjh1SlkyWTJCMzFWMFVtczBHMUhybXctbVoyNnhDUTBGZEZBU2ZOU1lib2xIbFo5MHZSdS1YZ21zQ3pNODViUjlIbUdQSkF0Nnp3cDUtLU4wWFBrLVJYS0k0NEFtRmEzX0E1OGFydXNPaXV6S29tamZwTVVBZFVqNl9XT0NQYUs5NjFXelg1LV85TkFKVExfWkFaM1ZxNEpLVk9iMWFST0w0TkRHbmVJeHczY2VxaDBEbTVVejDSAdcBQVVfeXFMT0JJQzRZVEdjdUNIUW1BTHY0Wk0yc1ZzMVhiQ201WUxjYlZYUF81TVFKUV82UUV3MkFqdlFVSHNXVmhqSndnQlRyZFZMYXhEZ01neW5ucjBHRXZVQTdnREZKVkFSYl9YY1RXTnpvdkVGRERyVGx2aU5SNkpPeVUyTmVHTFRuNDU5VlgwUEk4R0JoQXJvX1RoQkdpWlJEYmU5OWZuTV91cXZvcERhSVpsN3NrTUVGWmI5M1RIWlpuaEZNSy1wM3RUSVlxaEtzSlFEeXFMdFVCYzQ?oc=5
   Los otros dieciséis bloques de la vuelta 1 ya quedaron con la URL exacta
   del barrido y no hay que tocarlos.

Observaciones:
- Para la pieza siguiente: seis hechos del barrido siguen fuera de la olla y
  entran por criterio propio del prompt (cambian reglas, comprometen fondos
  públicos o son riesgo en curso). Se buscaron uno por uno en la pieza de esta
  vuelta y siguen en cero coincidencias: la Cancillería en entredicho por
  ocultar el contenido de la declaración del Escudo de las Américas (barrido,
  línea 366); el candidato fuerte para liderar la Suseso, clave para
  fiscalizar fraudes en licencias médicas (línea 741); el pueblo tribal
  afrodescendiente chileno que enfrenta al Estado en la Corte IDH (línea 621);
  la alerta de Greenpeace por la nueva temporada de incendios y las medidas de
  prevención pendientes (línea 375); el alcalde de Punta Arenas contra la
  presión argentina por la ruta a las Malvinas (línea 630); y el sondeo sobre
  la facilidad percibida para obtener licencia médica pese al efecto
  Contraloría (línea 381), distinto del informe de licencias municipales de
  CIPER que sí está en la línea 74.
- Para la pieza siguiente: la candidata del Sernac (línea 68) dice solo que el
  director entra en la fase final de su salida, y el barrido agrega el motivo,
  que la salida sigue a su suspensión por acoso laboral (línea 393).
- Para la pieza siguiente: la condena a la exfuncionaria del caso Barriga
  (línea 51) no trae la plata, y el barrido la tiene: cobró 110 millones de
  pesos en cuatro años de licencia (línea 399).
- Para la pieza siguiente: la magnitud 4,7 del sismo (línea 149) viene de un
  solo medio y extranjero, Panamericana TV, que el barrido marca "alarma:
  sismo (un solo medio por ahora)" (línea 597); la entrada de Chilevisión
  (línea 216) no da magnitud. Hay que confirmarla con el Centro Sismológico
  Nacional antes de usarla. Igual conviene mirar la candidata del
  sobreviviente de la explosión en la frontera de Arica (línea 180), que
  descansa en un solo medio, SoyChile.cl, también marcado así en el barrido
  (línea 309).
- La segunda corrección de la vuelta 1 quedó resuelta: los cuatro bloques que
  no nombraban medio ahora traen el nombre que el barrido registra, verificado
  contra el barrido uno por uno (línea 135, Nueva Rioja y Clarin.com, barrido
  238; línea 146, Tiempo de San Juan, barrido 205; línea 157,
  OvejeroNoticias, barrido 232; línea 168, UCV radio, barrido 355).
- La cuarta línea de "Historias en curso sin novedad hoy" (línea 192) sigue
  explicando que el caso de sarampión sí tuvo novedad y está incluido, lo que
  contradice el propósito de esa sección, reservada a "temas del informe de
  ayer que siguen abiertos pero no tuvieron avance". La explicación calza
  mejor en "Notas del barrido".
- La reescritura no rompió nada de lo que ya estaba bien: la olla mantiene 52
  candidatas (rango aceptable 35 a 60), los doce encabezados obligatorios
  están con su nombre exacto y con al menos una candidata, las tres secciones
  finales siguen presentes (líneas 183, 187 y 194), los 52 bloques cumplen el
  formato de dos líneas con sus tres campos, no hay raya larga ni media (cero
  coincidencias de U+2014 y U+2013 en el archivo completo), las fechas de la
  prosa están en DD-MM-AAAA y no hay preámbulo ni comentario final.
