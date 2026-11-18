VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-09T05:51:00Z

Observaciones:
- La única corrección de la vuelta 1 quedó resuelta y la verifiqué contando, no
  de memoria: la [TESIS] de "La noticia del día" dice ahora "Curicó cerró ciento
  veintiséis salidas por viajes con licencia.", que mide 63 caracteres y 9
  palabras, dentro del tope de 66 del punto 14b y de las 18 palabras del punto
  14. Busqué dígitos en todo el texto narrado (sin encabezados ni marcas) y no
  queda ninguno: las demás cifras habladas siguen en palabras. El diff contra la
  versión anterior toca esa sola línea, así que nada más del guion cambió.
- Fidelidad de la corrección, verificada contra el informe: "salidas" es la
  palabra del propio informe, cuyo titular [A] de la línea 13 dice "Curicó cerró
  126 salidas de funcionarios por viajes con licencia médica", y el cuerpo de la
  línea 17 confirma que los 58 destituidos y los 68 que renunciaron suman 126
  sobre 140 trabajadores revisados. La tesis perdió la palabra "médica" para
  entrar en el tope de caracteres, y el párrafo que sigue la restituye ("mientras
  esos funcionarios tenían licencia médica"), así que el oyente no queda sin el
  dato.
- Las otras medidas siguen conformes: 468 palabras narradas (entre 420 y 600),
  tres bloques de noticia con la portada primera, las cuatro [TESIS] con 18
  palabras o menos, y "node scripts/revisar-mecanico.js" imprime "sin hallazgos
  mecánicos". No hay raya larga ni raya media en el archivo.
- Sigue en pie, y es lo único que conviene arreglar fuera de la pieza: el aviso
  de "node scripts/validar-tarjetas.js" por la falta de "Carátula sugerida:".
  No es incumplimiento, por lo mismo que quedó anotado en la vuelta 1 (el propio
  prompt dice "Desde el 04-11-2026 no se pide carátula del día", el contrato de
  archivos no la incluye en el formato obligatorio de los guiones y existe el
  marcador contenido/estado/sin-video-informe.txt), pero el prompt todavía
  lista esas cuatro líneas en FORMATO DE SALIDA y el script todavía cita la
  regla del 05-09-2026. La pregunta se repite cada día y un aviso mecánico que
  nadie debe atender enseña a ignorar los avisos.
- Para la edición siguiente: en el bloque del cobre, "la estimación para el año
  siguiente sigue en un nivel parecido al de este año" dice los años de forma
  relativa donde el informe los da con número. No bloquea (la apertura fija la
  fecha y la tarjeta dice 2026), pero la regla dura 35 se cumple mejor con el
  año escrito.
