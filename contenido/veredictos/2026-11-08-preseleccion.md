VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-08T05:06:14Z

Observaciones:
- Para la pieza siguiente: ninguna cifra de las 37 candidatas viene
  verificada, porque esta etapa lo prohíbe, y el informe tiene que
  confirmarlas contra la fuente antes de usarlas. Las que más pesan: las
  víctimas del accidente de Santo Domingo, la inflación anual de 4,5% y la
  proyección del 5%, los 413.597 millones de dólares de PIB peruano para 2027,
  los 2,9 millones de personas en mora permanente, el alza de casi 80% de las
  tierras de O'Higgins, los 37 grados de la alerta meteorológica, la meta de
  desocupación de 6,5%, las seis hectáreas del incendio de Machalí y los 14
  años del proyecto de redes sociales.
- Para la pieza siguiente: la cifra de fallecidos del accidente de la Ruta de
  la Fruta NO está cerrada en el barrido y la candidata va como rango a
  propósito. Hay titulares con 10 fallecidos (La Tercera citando al Gobierno,
  línea 483), con 11 (Chilevisión y EL PAÍS, líneas 225 y 276) y con 12 (varios
  medios extranjeros, líneas 210, 261, 267, 270, 273, 348 y 525), y los heridos
  aparecen como 15 en la mayoría y como 13 en dos. El informe la fija con la
  fuente oficial y no promedia.
- Para la pieza siguiente: el acuerdo que desbloqueó el puerto de San Antonio
  aparece en el barrido con dos contrapartes distintas, "acuerdo con el
  Gobierno" (línea 108, Epicentro Chile) y "acuerdo con empresas" (línea 405,
  Radio U. de Chile). La candidata y su razón se quedaron con las empresas, así
  que el informe tiene que fijar con quién se firmó antes de narrarlo.
- Para la pieza siguiente: la mayoría de los enlaces son redirecciones de
  Google News y no la URL de la nota. Al citar fuentes no se puede reemplazar
  ese enlace por la portada del medio. Traen URL directa las candidatas de La
  Tercera, Radio Universidad de Chile, Ex-Ante, CIPER e Interferencia.
- Para la pieza siguiente: dos razones usan "el próximo año" sin fecha (líneas
  78 y 86). No es incumplimiento de este prompt, porque no es una fecha en
  prosa sino un período, y la línea 78 lo resuelve con el "Presupuesto 2027"
  de su propio titular. Si el informe lo arrastra tal cual sí será
  incumplimiento: ahí va 2027.
- La corrección de la vuelta 1 quedó resuelta y es la única que había. La
  candidata de la alerta por calor extremo dice ahora "para el 08-11-2026" en
  lugar del día de la semana, como pedían las REGLAS DE ESTILO de
  prompts/seleccion.md y la regla dura 35. La fecha se verificó de nuevo en
  esta corrida contra el barrido, no de memoria: la línea 501 de
  contenido/barrido/2026-11-08.md fecha esa prensa como "sábado 7 de
  noviembre" y las líneas 507 y 516 dicen "este domingo", que es el
  08-11-2026.
- La corrección no introdujo nada. El diff entre la versión validada
  (1f77f47) y esta (56f39f7) es una sola línea, la 115, y solo cambia el
  tramo de la fecha dentro del titular: el medio (ADN Radio, Revista Digital
  Minera REDIMIN), la URL y la línea "Por qué podría importar" quedaron
  idénticos, la línea conserva sus dos barras y el resto del archivo es
  idéntico byte a byte al que ya había verificado. Comprobado en esta corrida:
  37 bloques con sus 37 líneas "Por qué podría importar", las tres secciones
  finales presentes y en orden (líneas 134, 139 y 166), cero rayas largas y
  cero rayas medias por búsqueda literal, y sin hallazgos de
  scripts/revisar-mecanico.js.
- Por convergencia (regla del 15-09) no se suman hallazgos nuevos sobre
  partes que la vuelta 1 no marcó. El commit tocó solo su propio archivo, con
  el mensaje "edición 2026-11-08: preselección" y la línea "Tarea:" que pide
  prompts/contrato-archivos.md.
