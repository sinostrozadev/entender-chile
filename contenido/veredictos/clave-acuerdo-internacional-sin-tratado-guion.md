VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion
SLUG: acuerdo-internacional-sin-tratado
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-16T20:14:45Z

Correcciones:
1. Dónde: el bloque "Fuentes:" (líneas 92 a 100) no trae ninguna línea de los
   informes de Entender Chile, aunque la narración los cita dos veces como
   fuente: "Los informes no identifican el acto fundador ni reproducen el
   instrumento completo" (línea 19) y "Los informes no reproducen el documento
   ni acreditan operaciones militares, que el Gobierno descartó" (línea 78) ·
   Regla: "REGLA DE CRÉDITO TOTAL (03-09, hallazgo repetido en 3 de 4
   revisiones): toda fuente mencionada en la prosa del guion ("el Informe
   diario señalaba", "según X") va TAMBIÉN en el bloque Fuentes: final,
   incluida la propia entrega y el Informe diario cuando se citan." ·
   Debe quedar: agregar al bloque Fuentes la línea que la entrega trae en su
   línea 65, "Entender Chile, informes del 23, 24, 25 y 26 de septiembre de
   2026", sin la URL del repositorio (el mismo prompt prohíbe listar archivos
   internos del sistema). Las demás líneas del bloque no se tocan.
2. Dónde: línea 9, "[DATO cifra | Ministerio de Relaciones Exteriores,
   22-09-2026] países participantes al anuncio de adhesión de Chile: 15
   países" · Regla: del bloque [DATO], "Es la fuente PRIMARIA del dato tal
   como aparece en la entrega (Contraloría, INE, Banco Central, el medio)" ·
   Debe quedar: la entrega da los 15 países en su línea 8 respaldada en sus
   propios informes, y al Ministerio de Relaciones Exteriores lo usa para la
   descripción de la Cancillería (líneas 26, 46 y 66), no para esa cifra. La
   atribución pública de los 15 países es "The Clinic, T13 y El País,
   22-09-2026" (informe del 23-09-2026, línea 32), línea que el guion ya
   tiene en su bloque Fuentes: la marca tiene que llevar esa fuente, o la
   cifra sale de la marca y queda solo narrada en palabras.
3. Dónde: línea 24, "El veinticuatro, Bachelet y Boric pidieron reconsiderar
   la permanencia; el Senado y la Contraloría entraron en la discusión." ·
   Regla: "FIDELIDAD A LA ENTREGA: Todo el contenido proviene de la entrega
   escrita adjunta. Tu tarea es de FORMA" · Debe quedar: la entrega dice en su
   línea 48 "el Senado agendó una sesión especial y una bancada acudió a
   Contraloría", y en su línea 62 que un pronunciamiento de la Contraloría
   todavía está por conocerse. Narrarlo así, por ejemplo "el Senado agendó una
   sesión especial y una bancada recurrió a la Contraloría", sin presentar a la
   Contraloría como participante de la discusión.
4. Dónde: línea 76, "la subsecretaria de Seguridad, entrenamiento" · Regla:
   "No reinvestigues el tema, no agregues datos, ejemplos con cifras nuevas ni
   fuentes que no estén en la entrega." · Debe quedar: la entrega (línea 46)
   dice "la subsecretaria Pilar Giannini", sin cartera. Narrar "la subsecretaria
   Giannini" o, si se quiere el cargo, el que trae el informe del 25-09-2026 en
   su línea 31, "la subsecretaria de Seguridad Pública", nunca "de Seguridad"
   a secas, que nombra una cartera distinta de la que existe.

Observaciones:
- Las cinco líneas de medios del bloque Fuentes (EFE 14-09-2026; The Clinic,
  T13 y El País 22-09-2026; La Tercera y CNN Chile 23-09-2026; La Tercera,
  EL PAÍS y Meganoticias 24-09-2026; Meganoticias y Cooperativa 25-09-2026) no
  aparecen en la entrega, así que las verifiqué una por una contra los informes
  de origen: todas existen y cada una respalda un hecho que el guion narra
  (informe del 23-09-2026, líneas 32 y 36; del 24-09-2026, línea 18; del
  25-09-2026, línea 29; del 26-09-2026, línea 55). El prompt pide las fuentes
  "tal como aparecen en la entrega" y a la vez "cita la fuente pública
  original" y nunca archivos internos: con una entrega apoyada en los informes,
  acreditar al medio cumple la segunda regla, y por eso no lo cuento como
  incumplimiento. Lo que falta es solo el crédito de los informes (corrección 1).
- El gancho (líneas 9 y 10) nombra solo el 22-09-2026, y el asunto volvió el
  23-09-2026, el 24-09-2026 y el 25-09-2026. El prompt pide decirlo en una
  frase cuando pasa, pero su ejemplo ("esta semana apareció el lunes, el
  miércoles y el viernes") es una referencia relativa que la regla 35 no
  permite, y el bloque "Los hitos" cubre la insistencia con fechas absolutas:
  no es incumplimiento. Una frase en el gancho diciendo que el asunto volvió
  tres días seguidos explicaría por qué se eligió el tema.
- La línea 10 dice "El Gobierno descartó que fuera un tratado". La entrega lo
  atribuye al presidente José Antonio Kast (línea 8) y al ministro Martín Arrau
  (línea 48). Nombrar a quien lo dijo es más preciso y está en la entrega.
- Medí la extensión con scripts/validar-tarjetas.js: 1.201 palabras narradas,
  unos 8,9 minutos, dentro del objetivo de 1.080 a 1.350. La explicación
  conceptual suma 1.107 de 1.378 palabras de bloque, un 80%, justo en el piso
  que pide el control interno 3: si una corrección recorta prosa conceptual,
  conviene volver a medirlo.
- scripts/revisar-mecanico.js no encontró hallazgos, y el archivo de imágenes
  que pide el prompt está completo: tres carátulas con el gancho exacto
  "¿QUÉ PROMETIÓ CHILE?" y once prompts de sección numerados en el mismo orden
  que los once bloques del guion.
