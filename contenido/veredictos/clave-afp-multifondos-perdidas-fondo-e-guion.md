VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion
SLUG: afp-multifondos-perdidas-fondo-e
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-23T20:07:36Z

Correcciones:
1. Dónde: línea 77, "En los tres casos, la Pensión Garantizada Universal no se
   calcula multiplicando el saldo por el valor cuota. No existe una proporción
   universal entre ahorro y aporte estatal: depende de la situación y de los
   requisitos de cada persona". Ese contenido es el del párrafo de la línea 63
   de la entrega, cuya fuente es "Superintendencia de Pensiones, Preguntas
   generales, consultado el 23-10-2026", y el bloque Fuentes del guion no la
   acredita: busqué "preguntas generales", "PGU" y "15170" en el guion completo
   y no aparece ninguna de las tres. · Regla: "Al final: Fuentes: con una línea
   por cada fuente de las marcas [DATO] y [CITA] Y por cada fuente de la
   entrega cuyo contenido narraste, tal como aparecen en la entrega. Una fuente
   cuyo contenido se narró no puede quedar sin crédito". · Debe quedar: el
   bloque Fuentes suma, tal como la entrega la trae en su línea 115, la línea
   "Superintendencia de Pensiones, preguntas generales sobre PGU, consultado
   23-10-2026: https://www.spensiones.cl/portal/institucional/594/w3-article-15170.html".
   No cambia nada del texto narrado: es una línea más en Fuentes, que no cuenta
   para el tope de extensión.

Observaciones:
- Para la pieza siguiente, y antes de que este guion se apruebe: la marca
  [FUENTE] que el prompt documenta NO la reconoce el renderizador, y en esta
  Clave esas seis líneas se irían a la voz. El prompt (línea 93) define
  "[FUENTE] institución o medio, fecha", con el texto fuera de los corchetes, y
  así las escribió GPT, que para esto cumplió lo que se le pidió: la corrección
  3 de la vuelta 1 le dictó esas líneas con ese formato. Pero
  scripts/parse.js, línea 293, exige el texto DENTRO de los corchetes
  (/^\[FUENTE\s*\|?\s*([^\]]+)\]\s*$/), que es lo que documenta su cabecera
  ("[FUENTE medio, fecha]"). Corrí el parser real sobre el guion
  (node scripts/parse.js sobre el archivo de la pieza) y devuelve CERO eventos
  de tipo fuente: las seis líneas caen a "línea de texto normal" y salen en
  out/narracion.txt como texto hablado, con el corchete incluido, tres de ellas
  pegadas al párrafo que las sigue (líneas 11, 39, 51, 71, 73 y 77 de
  narracion.txt). Esta Clave se renderiza por ese camino: no tiene
  contenido/claves/flujo/afp-multifondos-perdidas-fondo-e/mural.json, así que
  dia.js la produce con el formato clásico, y parse.js corre igual en los dos.
  Quien sí lo entiende como el prompt es scripts/mural-guion.js, línea 47. No
  lo marco INCUMPLE porque mi trabajo es verificar el prompt y el prompt se
  cumplió: el arreglo es del lado del sistema (alinear el prompt con parse.js, o
  parse.js con el prompt), y es de la noche, porque toca prompts y scripts.
  Mientras no esté alineado, aprobar este guion manda a pantalla seis líneas de
  marca leídas en voz alta.
- Para la pieza siguiente: el "0 bloques con fuente" que imprime
  scripts/validar-tarjetas.js no significa que falten las marcas. Su línea 35
  usa el mismo patrón que parse.js (/^\[FUENTE /, con espacio), así que tampoco
  reconoce "[FUENTE]" y además cuenta esas líneas como palabras narradas. El
  guion mide 1.639 palabras narradas, dentro del tope de 1.650 del control
  interno 3, y sin esas seis líneas quedaría cerca de 1.609.
- Las seis correcciones de la vuelta 1 están resueltas, verificadas una por
  una: la tarjeta de la tasa técnica quedó inmediatamente antes del párrafo que
  la narra (líneas 81 y 82) y el párrafo de la renta vitalicia quedó sin tarjeta
  (línea 79); el bloque del gancho narra ahora las dos rentabilidades de su
  tarjeta, el 10,39% del Fondo E y el 6,38% del Fondo D, antes de la pregunta de
  fondo (línea 10), fieles a la línea 9 de la entrega; los cinco bloques que
  narraban cifras sin respaldo traen su marca [FUENTE] (líneas 20, 54, 67, 92 y
  101); la línea del Compendio Libro III sobre pago de pensión salió del bloque
  Fuentes; la pregunta 10 de la sección 4 de la pauta quedó respondida con las
  resoluciones 368, 549 y 1.195 y con la frase que dice qué no permite afirmar
  la entrega (línea 96), acreditadas con la línea de resoluciones del sistema de
  pensiones; y la pregunta 13 responde la proporción entre saldo y Pensión
  Garantizada Universal para los tres grupos (línea 77).
- La línea 95 trae una segunda marca [FUENTE] dentro del bloque "Qué cambia en
  2027", que ya tiene la suya en la línea 92. No la marco INCUMPLE: lo único con
  números del párrafo que encabeza son identificadores de resolución, que por el
  criterio de la vuelta 1 no piden la marca, y parse.js se queda con la primera
  marca de cada bloque y descarta el resto, así que no rompe nada. Si se
  reescribe el bloque, sobra.
- scripts/validar-tarjetas.js avisa dos cosas que no son requisito del prompt y
  no bloquean. Una, "dos cifra seguidas" en el bloque de la línea 84: las dos
  tarjetas quedan separadas por sus párrafos. Dos, la cifra exacta "1.195" en
  voz: es el número de una Resolución Exenta, y la regla de redondeo excluye
  expresamente los números de ley, además de que un identificador no es un valor
  graficable. Narrarla fue lo que pidió la corrección 5 de la vuelta 1.
- Verificado y sin hallazgos: node scripts/revisar-mecanico.js no encontró nada;
  no hay raya larga ni raya media en el guion ni en el archivo de imágenes,
  comprobado carácter por carácter; las trece líneas [TESIS] llevan su línea en
  blanco y hay una por cada una de las trece secciones; no hay cifras en
  numerales en el texto narrado; los tres [ESQUEMA] tienen tres elementos de
  hasta cuatro palabras; el título mide 54 caracteres y es atemporal; el cierre
  termina en el tagline exacto; no hay conectores de ensayo escrito ni URLs ni
  paréntesis fuera de las marcas y del bloque Fuentes; las diecisiete líneas de
  Fuentes están todas en la entrega, sin ninguna agregada; el archivo
  contenido/guiones/claves/2026-10-28-afp-multifondos-perdidas-fondo-e-imagenes.md
  conserva sus tres carátulas y un prompt por sección, con los trece nombres y
  en el mismo orden que el guion; y la sección 6 de la pauta ("Qué NO va") no
  entró, revisada punto por punto, incluido lo que el guion agregó en esta
  vuelta.
