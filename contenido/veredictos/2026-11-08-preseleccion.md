VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-08T05:00:58Z

Correcciones:
1. Dónde: línea 115, el titular "La Dirección Meteorológica emite alerta por
   calor extremo para el domingo en cinco regiones, con temperaturas que
   podrían llegar a 37 grados" · Regla: REGLAS DE ESTILO de
   prompts/seleccion.md, "Fechas en la prosa como DD-MM-AAAA" (y regla dura
   35: nunca una referencia temporal relativa en un texto que se lee
   después) · Debe quedar: el mismo bloque con la fecha absoluta en lugar del
   día de la semana, "La Dirección Meteorológica emite alerta por calor
   extremo para el 08-11-2026 en cinco regiones, con temperaturas que podrían
   llegar a 37 grados", sin tocar el medio, la URL ni la línea "Por qué podría
   importar". La fecha está verificada acá, no supuesta: las líneas 507 y 516
   de contenido/barrido/2026-11-08.md dicen "este domingo" sobre prensa del
   07-11-2026 (la línea 501 del mismo barrido fecha esa prensa como sábado 7
   de noviembre), y el domingo de esa misma prensa es el 08-11-2026.

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
- Las seis fuentes institucionales sin feed (Contraloría, Banco Central,
  Cámara, Senado, Dirección Meteorológica y Ministerio Público) no se abrieron
  y la pieza lo declara en "Notas del barrido", que es donde este prompt manda
  anotarlo, así que no es hallazgo. Queda escrito porque es permanente:
  contenido/estado/reparto.txt da esta etapa a Claude desde el 06-10-2026
  justamente porque sale del barrido que ya está en el repo.
- Verificado contra los archivos de esta corrida, no de memoria. Formato: 37
  bloques de dos líneas, los 37 con medio y URL y ninguno con más o menos de
  dos barras, los 37 con su línea "Por qué podría importar", y las tres
  secciones finales presentes y en orden. Tamaño: 37, dentro del rango de 35 a
  60, con la razón del faltante medida en las notas. La cabecera del barrido
  calza con lo que la nota le atribuye (167 con señal de 522 únicas en 22
  fuentes, 655 titulares brutos, 16 de días previos, 3 descartadas y ninguna
  fuente caída). El informe del 07-11-2026 no trae ninguna marca "PENDIENTE DE
  CIERRE:": se buscó el literal y la palabra sola, sin distinguir mayúsculas,
  y las dos búsquedas dan cero coincidencias, así que hoy no había candidatas
  obligatorias por cierre pendiente. Salud y Educación sin material propio,
  comprobado sobre el barrido: cero coincidencias de hospital, clínica,
  Fonasa, Isapre, enfermedad, brote, vacuna, colegio, escuela, profesor,
  Mineduc, matrícula y PAES. Las nueve líneas del barrido que contienen la
  cadena "salud" son seis veces "saluda" a Alliana y tres el Presupuesto 2027;
  el refuerzo policial en dos Cesfam de Puente Alto aparece aparte (líneas 198
  y 200) y la pieza lo clasificó en Seguridad, que es donde corresponde. Las
  afirmaciones de cero coincidencias de "Historias en curso sin novedad hoy" se
  comprobaron una por una contra el barrido: las 38 palabras buscadas dan
  cero. La única candidata marcada "(sin confirmar)" es la única alarma de un solo medio que
  viene de un medio no reconocible (línea 247 del barrido), y las demás
  candidatas de medio único vienen corroboradas en dos o más fuentes según el
  propio barrido. Sin rayas largas ni medias, sin emojis, sin preámbulo ni
  comentario final. El commit tocó solo su propio archivo, con el mensaje y la
  línea "Tarea:" que pide el contrato. Sin hallazgos de
  scripts/revisar-mecanico.js, que por diseño no persigue los días de la
  semana distintos del lunes: ese es el hallazgo 1.
