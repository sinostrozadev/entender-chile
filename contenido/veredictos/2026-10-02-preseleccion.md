VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-02T05:10:02Z

Correcciones:
1. Dónde: los 46 titulares que vienen del barrido están copiados palabra por
   palabra desde contenido/barrido/2026-10-02.md, en las líneas 3, 6, 9, 12,
   20, 23, 26, 29, 32, 35, 40, 43, 46, 49, 52, 55, 60, 63, 66, 69, 74, 77,
   80, 85, 88, 91, 99, 102, 108, 113, 116, 119, 122, 127, 130, 133, 138, 141,
   149, 152, 155, 158, 163, 166, 169 y 172 de la pieza (se comparó cada
   titular con el del barrido que corresponde a su misma URL, normalizando
   comillas, tildes y espacios: 44 coinciden exacto, y los dos restantes solo
   difieren por la marca "(cierre pendiente del 01-10)" que se les agregó al
   final, línea 23, o por una comilla que el barrido traía como entidad HTML,
   línea 29). Las únicas cuatro que no son copia son las institucionales, de
   fuente propia: líneas 15, 94, 105 y 144. · Regla: el formato de salida del
   prompt pide "- <titular en tus palabras, claro y específico> | <medio o
   medios> | <URL>", y el propio barrido se declara "material bruto para la
   preselección: no es contenido publicable ni está verificado". · Debe
   quedar: cada uno de esos 46 titulares reescrito en palabras del editor, sin
   cambiar el hecho ni las cifras, sin coincidir literal con el titular del
   barrido. Tres ejemplos verificados contra esta misma regla: la línea 3,
   "La Confech saca a miles de estudiantes a la Alameda contra los recortes de
   educación del Presupuesto 2027"; la línea 60, "Contraloría ordena reparar
   1.571 millones de pesos en el edificio nuevo del Servicio Médico Legal,
   ocupado al 34% y con 6.000 observaciones"; la línea 149, "Muere un
   trabajador en la faena Radomiro Tomic de Codelco, en Antofagasta".
2. Dónde: línea 145, "Por qué podría importar: El monitor oficial proyecta
   heladas hasta el 06-10, relevante para agricultura y prevención." · Regla:
   las reglas de estilo del prompt piden "Fechas en la prosa como
   DD-MM-AAAA", y 06-10 no lleva año. · Debe quedar: la misma frase con la
   fecha completa, "El monitor oficial proyecta heladas hasta el 06-10-2026,
   relevante para agricultura y prevención." Las otras tres fechas en prosa
   del archivo (líneas 23, 24 y 188) escriben 01-10 porque nombran la marca
   que el prompt define como "(cierre pendiente del DD-MM)": esas se quedan
   como están y no hay que tocarlas.

Observaciones:
- Para la pieza siguiente: el PENDIENTE DE CIERRE del informe del 01-10-2026
  (línea 198, "Imacec de agosto | 2026-10-01") entró como candidata
  obligatoria y está marcado, línea 23. La olla lo trae con la caída anual de
  1% atribuida a La Tercera, así que al informe le toca resolverlo con el
  número del Banco Central como fuente primaria, no con el medio.
- Para la pieza siguiente: dos candidatas descansan en un solo medio y el
  barrido las clasifica como alarma de un solo medio por ahora, la huelga del
  Sindicato N°1 de Farmacias Ahumada (línea 88, Radio U. de Chile) y la
  denuncia por negligencia en Futaleufú (línea 102, soychile.cl). No
  correspondía la marca "(sin confirmar)", porque ninguno de los dos es fuente
  dudosa ni medio desconocido, pero si sobreviven al informe hay que
  confirmarlas con el sindicato, la empresa o el servicio de salud antes de
  darlas por hecho.
- Para la pieza siguiente: la candidata de la línea 166, el intento de
  ejecución de Christa Pike en Tennessee, no calza con ninguno de los siete
  criterios de entrada del prompt (lo internacional entra con efecto directo
  sobre Chile, y acá no hay). El prompt manda que en la duda entre, así que no
  bloquea, pero es la primera que el informe puede descartar.
- Para la pieza siguiente: la línea 85 escribe el desempleo como "9.6%", con
  punto decimal, igual que el titular del medio. Este prompt no pide la coma,
  así que no bloquea, pero el informe debería escribir 9,6%.
- Se verificaron los 50 medios citados contra el medio que el barrido asigna a
  esa misma URL: cero desajustes, no hay fuente inventada. Las cuatro
  candidatas que no están en el barrido (líneas 15, 94, 105 y 144) son las
  institucionales sin feed que el prompt pide abrir a mano, tres del Senado y
  el monitor de heladas de la Dirección Meteorológica.
- El tamaño queda en el objetivo del prompt, 50 candidatas. Los doce
  encabezados obligatorios están con su nombre exacto y todos con al menos una
  candidata, así que el "ninguna" de "Áreas sin material hoy" (línea 177) es
  correcto. Las tres secciones finales están presentes (líneas 175, 179 y
  186), las 50 líneas "Por qué podría importar" son 50 frases distintas y
  todas de una sola oración, y el archivo no trae raya larga ni media (cero
  coincidencias de U+2014 y U+2013 en el archivo completo), ni emojis, ni
  preámbulo, ni comentario final.
- La cuota blanda de regiones se cumple con holgura: Limache, Arica y
  Parinacota, Futaleufú, Antofagasta, La Serena, Quilpué, Valparaíso, Punta
  Arenas y Atacama están fuera de la Región Metropolitana.
- Las cuatro historias de "Historias en curso sin novedad hoy" (línea 179) se
  verificaron una por una: Escondida, la campaña de la Ford F-150, el caso de
  sarampión y el fraude en Maipú aparecen en el informe del 01-10-2026 y
  ninguna tiene entrada en el barrido de hoy, así que la sección es correcta.
- Las "Notas del barrido" (línea 186) también calzan: el barrido de hoy dice
  en su línea 3 que reunió 233 noticias con señal, y en su línea 6 que ninguna
  fuente cayó. Las seis fuentes institucionales sin feed de
  contenido/barrido/fuentes.json quedan todas nombradas, dos con novedad y
  cuatro sin ella.
