VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-13T06:28:06Z

Observaciones:
- Para la pieza siguiente: no hay pieza posterior, el guion del informe cierra
  la cadena diaria desde el 16-09-2026. Con esta aprobación los tres veredictos
  del 13-10-2026 quedan en APROBADA (preselección vuelta 0, informe vuelta 2 y
  este), así que en esta misma corrida se escribe
  contenido/revisiones/2026-10-13.md, que es la compuerta del render y de la
  publicación en la web.
- La única corrección de la vuelta 2 quedó cumplida, verificada contra el
  archivo de esta corrida y no de memoria: el diff de la vuelta toca una sola
  línea, la 30, y borra exactamente "El convenio extiende la concesión, y ",
  dejando el párrafo igual al "Debe quedar" que pedía el veredicto. La
  extensión de la concesión se narra ahora una sola vez, en la línea 26 con sus
  veinte meses. Búsqueda explícita de "concesi" en el archivo completo: cuatro
  coincidencias y ninguna repite el hecho (la línea 4 es carátula y no se
  narra, la línea 22 dice que no cambian las concesiones regionales, la línea
  64 es una fuente).
- La corrección no introdujo hallazgos nuevos: no borró ninguna cifra, ninguna
  marca ni ninguna fuente, y la frase que quedó es fiel a la entrada. El
  informe, línea 21, trae "El texto definitivo del convenio y la nueva tabla
  tarifaria deberán mostrar cómo se aplicará el beneficio a cada pórtico y
  franja horaria", y el guion dice "El texto definitivo deberá precisar la
  aplicación en cada pórtico y franja": el mismo sentido, sin dato agregado.
- El largo quedó donde la vuelta 2 lo había calculado: node
  scripts/validar-tarjetas.js da 445 palabras narradas, dentro de 420 a 600
  (unos 3,3 minutos), con tres comparacion, un cambio y un esquema, y la línea
  "variedad OK: ninguna cuota rota, ninguna marca malformada". node
  scripts/revisar-mecanico.js imprimió "sin hallazgos mecánicos".
- Verificado otra vez sobre el archivo cambiado, porque la pieza es una versión
  nueva: cero rayas largas y cero rayas medias en el archivo completo; cero
  URLs; cero conectores de ensayo escrito de la lista prohibida; cero usos de
  "no solo"; el tagline "El resumen sin gritos." es la última frase hablada;
  las cuatro [TESIS] tienen 16, 16, 18 y 17 palabras, todas dentro del tope de
  18, y las cuatro llevan su línea en blanco antes del párrafo narrado (líneas
  11, 21, 35 y 45); tres bloques de noticia y ni uno más, con la portada
  primero y categoría válida en los tres (economia, economia, emergencia),
  mientras los tres bloques de estructura van sin corchete; no hay "En
  titulares", ni Dato curioso, ni Agenda, ni "¿En qué quedó?".
- La selección se mantiene y no se toca: el informe trae cuatro noticias [A] y
  el guion narra la portada (rebaja del TAG) primera y las dos [A] siguientes
  en el orden del informe (el desempleo con educación superior y Las Condes),
  así que la muerte de los dos contratistas en El Teniente queda en la web, que
  es lo que manda la regla 4 de QUÉ SE NARRA.
- Sigue en pie, y sigue sin ser incumplimiento: la etiqueta de la línea 28,
  "tarifa punta PA13 para autos". PA13 es el código del pórtico y en pantalla
  no dice nada a quien ve el video en silencio, que es la prueba de la regla,
  aunque la etiqueta sí dice qué es la cifra y para quién. La narración de la
  línea 30 ya lo traduce, "el pórtico de Alameda a Río Mapocho". Sirve "tarifa
  punta pórtico Alameda, autos", cinco palabras.
- Dos cosas que conviene zanjar en el prompt y no por criterio de cada corrida,
  porque vienen arrastrándose de las vueltas 1 y 2. Una: el tope de "máximo
  tres cifras habladas por bloque" no define si cuentan las fechas ni las
  menciones repetidas del mismo valor, y el bloque del TAG narra cinco (veinte
  meses, sesenta días, dos mil veintiséis, trescientos sesenta y cuatro pesos y
  doscientos setenta y tres); en treinta días de veredictos nunca se aplicó, y
  por eso no bloquea acá tampoco. Dos: no está dicho si "La noticia del día"
  cuenta sus palabras con la tesis narrada o solo con el párrafo; con la tesis
  la sección tiene 34 y cumple, solo con el párrafo tiene 18 y quedaría bajo el
  piso de 25.
- La carátula del 13-10-2026 está en el repositorio: listado de
  contenido/caratulas/ en esta corrida, aparecen 2026-10-13.png y
  2026-10-13-prompt.txt, sin 2026-10-13-NO-PUDE.md. Mirarla antes del render es
  trabajo de la revisión y no de este veredicto.
