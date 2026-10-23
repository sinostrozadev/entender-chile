VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-23T05:49:37Z

Observaciones:
- Las cuatro correcciones de la vuelta 1 están resueltas, verificadas una por
  una contra el informe de hoy y contra el código, no de memoria. La 1: el
  bloque de la línea 16 quedó "## Rabat y las rebajas de condena [seguridad]",
  y `seguridad` está en las doce del prompt y en la lista SECCIONES de
  scripts/imagenes-secciones.js, línea 33, de modo que la línea 41 respeta la
  categoría declarada y el bloque ya no cae al clasificador por palabras. La 2:
  las cuatro etiquetas de la línea 43 dicen el alza y no el precio ("alza por
  litro en gasolinas 93 y 97", 8 palabras; "alza por litro en diésel", 5;
  "alza por litro en kerosene", 5; "alza por litro en GLP vehicular", 6), las
  cuatro dentro del rango de 3 a 8, y los valores $41,3, $91,5, $24,8 y $13,9
  siguen calzando con la línea 75 del informe. La 3: la línea 46 quedó "alza en
  carga de 40 litros de gasolina: $1652 ; alza en carga de 60 litros de diésel:
  $5490", las dos etiquetas de 8 palabras, contra la línea 83 del informe. La
  4: la línea 59 de "Fuentes:" trae ahora "Contraloría General de la República,
  informes citados el 11 y 22-10-2026: https://www.contraloria.cl/", copiada
  tal cual de la línea 180 del informe.
- El diff entre las dos versiones (6159fe1 y 7539b89) toca esas cuatro líneas y
  nada más, así que no se movió una sola palabra narrada: siguen las 477 que
  mide node scripts/validar-tarjetas.js, dentro del rango de 420 a 600, con
  cuatro bloques con fuente y tipos comparacion 2, cifra 1, esquema 1, barras
  1, "variedad OK". node scripts/revisar-mecanico.js imprime "sin hallazgos
  mecánicos". Ninguna corrección introdujo un incumplimiento nuevo: las seis
  etiquetas reescritas caen en el rango de palabras, cada valor conserva su
  propio rótulo con su unidad pegada, los tipos barras y comparacion siguen
  calzando con el árbol, y la línea agregada en "Fuentes:" no es una ruta
  interna del sistema.
- Queda en pie, sin bloquear, lo ya anotado en la vuelta 1 y que la corrección
  no tocaba: la "Carátula 3" de la línea 5, "56 decretos / ¿Quién decidió?", no
  trae contra qué se mide la cifra y repite el enfoque de pregunta de la
  "Carátula sugerida", de modo que la prueba A/B sale con dos enfoques y no con
  tres (mismo hallazgo en los veredictos del 17-10 y del 19-10-2026: el lugar
  de arreglarlo es el prompt); el bloque de combustibles narra cinco o más
  cifras habladas sobre el tope de tres por bloque, en choque con la regla que
  obliga a narrar el ejemplo a escala humana de la línea 83 del informe; la
  etiqueta de la línea 10, "rebajas firmadas en seis meses", se leería mejor
  como "rebajas de condena firmadas en seis meses"; el guion nunca dice de qué
  cartera es el ministro Rabat; y la "Descripción sugerida" atribuye a La
  Moneda lo que el informe atribuye a Rabat en su línea 19.
- Para el prompt, no para esta pieza: dos siglas se pintan en pantalla sin
  expandir antes. "GLP vehicular" en la etiqueta de la línea 43 nunca se
  expande en el guion, y "ENAP" sale en el [FUENTE] de la línea 40 y en la
  [TESIS] de la línea 41, mientras la expansión ("La Empresa Nacional del
  Petróleo") recién llega en el párrafo de la línea 44. Las dos venían de la
  versión anterior, ninguna la introdujo la corrección y ninguna la marqué en
  la vuelta 1, así que por la regla de convergencia del 15-09 no vuelven como
  INCUMPLE: van anotadas para que la próxima edición las cuide desde la
  primera vuelta.
