VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion
SLUG: afp-multifondos-perdidas-fondo-e
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-31T05:31:56Z

Observaciones:
- ANTES DE PUBLICAR, y es lo único grave que queda: aprobar este guion manda a
  renderizar un video en el que seis líneas de marca se leen en voz alta. No es
  un incumplimiento de la pieza y por eso no bloquea, pero el video que salga
  de esta aprobación no se puede publicar sin mirarlo. Lo verifiqué yo, no lo
  heredé del veredicto anterior: corrí "node scripts/parse.js" sobre el guion y
  devuelve CERO eventos de tipo fuente (66 eventos en total: 13 sección, 13
  tesis, 4 dato, 3 esquema, 33 narración), y las seis líneas aparecen tal cual
  en la narración que el parser entrega, en las líneas 11, 39, 51, 71, 73 y 77,
  tres de ellas pegadas al párrafo que las sigue. La causa es un desajuste
  entre dos archivos del sistema, no de GPT: prompts/guion-claves.md, línea 93,
  documenta la marca con el texto FUERA de los corchetes ("[FUENTE] institución
  o medio, fecha") y así la escribió GPT, mientras scripts/parse.js, línea 293,
  exige el texto DENTRO de los corchetes
  (/^\[FUENTE\s*\|?\s*([^\]]+)\]\s*$/i), que es el formato que documenta el
  prompt diario. Esta Clave se renderiza por ese camino: comprobado que
  contenido/claves/flujo/afp-multifondos-perdidas-fondo-e/ no tiene mural.json,
  así que se produce con el formato clásico y parse.js corre igual. El arreglo
  es del sistema y es de la noche, porque toca un prompt y un script: alinear
  prompts/guion-claves.md con parse.js, o parse.js con el prompt. Es la misma
  observación de la vuelta 2, todavía en pie ocho días después.
- La corrección única de la vuelta 2 está resuelta, verificada contra la
  entrega: la línea "Superintendencia de Pensiones, preguntas generales sobre
  PGU, consultado 23-10-2026" con su enlace al artículo 15170 está en el bloque
  "Fuentes:" del guion (línea 130), es idéntica a la línea 115 de la entrega,
  aparece una sola vez y no tocó el texto narrado, así que el párrafo de la
  línea 77 sobre la Pensión Garantizada Universal ya tiene su crédito.
- Extensión verificada después de la corrección: 1.639 palabras narradas, entre
  las 1.050 y las 1.650 que pide el control interno 3 del prompt. La línea que
  se sumó va en el bloque "Fuentes:", que por definición del prompt (línea 24)
  no cuenta como palabra narrada, así que la corrección no movió el conteo.
- Los dos avisos de scripts/validar-tarjetas.js siguen sin ser requisito del
  prompt, por las mismas razones de la vuelta 2, comprobadas de nuevo: las dos
  tarjetas "cifra" del bloque de la línea 84 quedan separadas por sus párrafos,
  y la cifra exacta "1.195" de la línea 96 es el número de una Resolución
  Exenta, que la regla de redondeo excluye expresamente junto con los números
  de ley. El "0 bloques con fuente" que imprime el mismo script es la otra cara
  del desajuste de arriba: su línea 35 busca "[FUENTE " con espacio y tampoco
  reconoce la marca como la documenta el prompt de la Clave.
- node scripts/revisar-mecanico.js no encontró nada en esta versión.
- Convergencia: la vuelta 2 dejó una sola corrección y esta vuelta verifica esa
  corrección y lo que pudo introducir, sin sumar hallazgos nuevos sobre partes
  que la vuelta anterior no marcó. Lo que esa vuelta ya dio por verificado
  (las trece [TESIS] con su línea en blanco, los tres [ESQUEMA], el título, el
  cierre con el tagline, las diecisiete líneas de Fuentes todas presentes en la
  entrega, las tres carátulas del archivo de imágenes y la sección 6 de la
  pauta, "Qué NO va", que no entró) sigue en pie: la corrección sumó una línea
  en Fuentes y no tocó nada de eso.
