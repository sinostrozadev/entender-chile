VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion
SLUG: afp-multifondos-perdidas-fondo-e
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-23T19:54:25Z

Correcciones:
1. Dónde: línea 74, "[DATO cifra | Superintendencia de Pensiones, 02-10-2026]
   tasa técnica retiro programado desde octubre 2026: 3,67%", puesta
   inmediatamente antes del párrafo de la línea 75, que trata de la renta
   vitalicia y no narra esa tasa. · Regla: "Posición: la línea [DATO] va
   INMEDIATAMENTE ANTES del párrafo que la narra, nunca después (el sistema la
   ancla al párrafo siguiente)". · Debe quedar: la línea [DATO] movida para
   quedar inmediatamente antes del párrafo de la línea 77, que es el que narra
   la tasa ("Desde octubre de dos mil veintiséis, esa tasa equivalente era de
   tres coma sesenta y siete por ciento"). El párrafo de la renta vitalicia
   queda sin tarjeta, porque no narra cifras.

2. Dónde: línea 9, "[DATO comparacion | Superintendencia de Pensiones,
   30-09-2026] rentabilidad real Fondo E enero-septiembre 2026: -10,39% ;
   rentabilidad real Fondo D enero-septiembre 2026: -6,38%", puesta
   inmediatamente antes del párrafo de la línea 10, que narra los
   procedimientos y los recursos de protección y ninguna de las dos
   rentabilidades. El 6,38% del Fondo D no se narra en ninguna parte del
   guion. · Regla: la misma regla de posición de la marca [DATO] citada en la
   corrección 1. · Debe quedar: el párrafo de la línea 10 narra las dos
   rentabilidades que muestra la tarjeta, en palabras y antes de la pregunta
   de fondo, con lo que trae la entrega en su tercer párrafo ("acumuló 10,39%
   real negativo entre enero y septiembre de 2026. El Fondo D cayó 4,19% en
   septiembre y 6,38% en el mismo período"). Si no se narran en ese bloque, la
   tarjeta se mueve al bloque que sí las narra.

3. Dónde: los bloques que empiezan en las líneas 17, 50, 62, 84 y 91. Narran
   cifras y ninguno trae marca [DATO] ni marca [FUENTE]: "el promedio real
   anualizado de treinta y seis meses" y "un encaje equivalente al uno por
   ciento de cada fondo" (líneas 54 y 56), "un plazo general de treinta días
   corridos" (línea 67), "siete procedimientos abiertos" (línea 94) y "diez
   fondos generacionales" (líneas 23 y 87). El guion no tiene ninguna marca
   [FUENTE], y "node scripts/validar-tarjetas.js" reporta "0 bloques con
   fuente". · Regla: "[FUENTE] institución o medio, fecha: Una por bloque que
   narre cifras, al principio del bloque. (...) Si el bloque ya trae un
   [DATO], su fuente sirve para todo el bloque y no hace falta esta marca",
   más la regla dura 6 ("toda cifra lleva fuente y fecha, en pantalla y en la
   web"). · Debe quedar: una línea [FUENTE] al principio de cada uno de esos
   cinco bloques, con la fuente primaria que les da la entrega y dentro del
   tope de seis palabras. Estas cinco están verificadas contra la entrega y
   dentro del tope: línea 17, "[FUENTE] BCN, Ley 19.795, 28-02-2002"; línea
   50, "[FUENTE] Superintendencia de Pensiones, 30-09-2026" (es el Decreto Ley
   3.500, artículos 37, 40 y 42); línea 62, "[FUENTE] Poder Judicial, Acta
   19-2023"; línea 84, "[FUENTE] BCN, Ley 21.735, 26-03-2025"; línea 91,
   "[FUENTE] Superintendencia de Pensiones, 20-10-2026". Los bloques cuyos
   únicos números son fechas o identificadores de norma no necesitan la marca,
   y son los de las líneas 25 y 33 ("Norma de Carácter General trescientos
   cuarenta", "el artículo cuarenta y cinco del Decreto Ley tres mil
   quinientos").

4. Dónde: línea 124 del bloque Fuentes, "Superintendencia de Pensiones,
   Compendio Libro III, pago de pensión, consultado 23-10-2026:
   https://www.spensiones.cl/portal/compendio/596/w3-propertyvalue-3205.html".
   Esa fuente no está en el bloque Fuentes de la entrega: la busqué en
   contenido/claves/2026-10-28-afp-multifondos-perdidas-fondo-e.md y no
   aparece, y sí aparece dos veces en la investigación. · Regla: "No
   reinvestigues el tema, no agregues datos, ejemplos con cifras nuevas ni
   fuentes que no estén en la entrega", el control interno 1 ("Ningún dato,
   ejemplo con cifras o fuente fue agregado fuera de la entrega") y el bloque
   Fuentes, que va "tal como aparecen en la entrega". · Debe quedar: esa línea
   fuera del bloque Fuentes. El contenido que acreditaba (Certificado de
   Saldo, Sistema de Consultas y Ofertas de Montos de Pensión y cuenta
   corriente del trámite) ya queda cubierto por dos líneas que la entrega sí
   trae y que el guion ya lista: "solicitud de pensión de vejez y SCOMP" y
   "Compendio Libro III, trámite y cuenta corriente".

5. Dónde: la pregunta 10 de la sección 4 de la pauta, "¿Estaba permitido por
   ley? ¿Qué decía el Régimen de Inversión sobre derivados, quién lo fijó y
   cuándo se cambió?". El guion responde las dos primeras partes en la línea
   40 ("permite derivados para cobertura y para fines distintos de cobertura,
   sometidos a límites, contrapartes, garantías y controles del Régimen de
   Inversión") y no dice en ninguna parte quién fijó ese Régimen ni cuándo
   cambió. · Regla: "las preguntas de la sección 4 de la pauta tienen que
   quedar respondidas en el guion narrado, todas, y la que la entrega dejó sin
   respuesta se dice narrada en una frase, no se omite", y el control interno
   5c. · Debe quedar: una o dos frases, en el bloque de la línea 33 o en el de
   la línea 84, con lo que la entrega establece en su sección sobre el
   01-04-2027: que las resoluciones trescientos sesenta y ocho, del cuatro de
   marzo de dos mil veintiséis, y quinientos cuarenta y nueve, del nueve de
   abril de dos mil veintiséis, modificaron el Régimen vigente durante dos mil
   veintiséis, y que la Resolución Exenta mil ciento noventa y cinco, del
   primero de septiembre de dos mil veintiséis, fija el que regirá desde dos
   mil veintisiete. Si la entrega no permite afirmar quién dicta ese Régimen,
   eso se dice en una frase en vez de omitirlo. Si esas resoluciones se
   narran, el bloque Fuentes suma la línea con que la entrega las acredita,
   "Superintendencia de Pensiones, resoluciones del sistema de pensiones,
   consultado 23-10-2026", por la regla de crédito total.

6. Dónde: la pregunta 13 de la sección 4 de la pauta, en su parte "Y para los
   tres: cuánto de la pensión es saldo y cuánto es Pensión Garantizada
   Universal u otro aporte del Estado que no depende del fondo". El guion solo
   dice, en la línea 75 y dentro del párrafo de la renta vitalicia, "La
   Pensión Garantizada Universal, si corresponde, es un componente separado
   del valor cuota", y no responde la proporción ni dice que no se pueda
   responder. · Regla: la misma regla de la sección 4 citada en la corrección
   5, y el control interno 5c. La pauta marca la pregunta 13 como central y
   dice que no se recorta si el tiempo aprieta. · Debe quedar: en el bloque de
   la línea 71, y valiendo para los tres grupos y no solo para la renta
   vitalicia, una frase con lo que la entrega establece: que la Pensión
   Garantizada Universal no se calcula multiplicando el saldo por el valor
   cuota y que no existe una proporción universal entre ahorro y aporte
   estatal, porque depende de la situación y de los requisitos de cada
   persona.

Observaciones:
- Para la pieza siguiente (el guion cierra este flujo, así que esto va para la
  próxima Clave): cuidado con el tope de extensión al aplicar estas
  correcciones. El guion mide hoy 1.611 palabras narradas (unos 11,9 minutos
  según scripts/validar-tarjetas.js) y el tope del control interno 3 es 1.650.
  Las correcciones 2, 5 y 6 agregan texto narrado, así que hay que recortar en
  otra parte para no pasarse. Las correcciones 1, 3 y 4 no suman palabras
  narradas, porque las marcas y el bloque Fuentes no se cuentan.
- Para la pieza siguiente: las dos tarjetas mal ubicadas quedaron así por
  ponerlas al comienzo del bloque y no pegadas a su párrafo. La marca [DATO]
  se ancla al párrafo que la sigue, no al bloque, así que la tarjeta viaja con
  su párrafo.
- scripts/validar-tarjetas.js avisa "línea 79: dos cifra seguidas en el bloque
  Qué pasa si la jubilación está cerca". No es requisito del prompt y no
  bloquea, y al mover la tarjeta de la línea 74 como pide la corrección 1 las
  dos quedan separadas por el párrafo de la renta vitalicia.
- La carátula sugerida, "¿Quién paga la pérdida?", cumple lo que exige el
  prompt (tres a cinco palabras, sin el término que el video viene a explicar)
  y por eso no es INCUMPLE. Aun así, un desconocido puede preguntar "¿qué
  pérdida?", que es justo la prueba del gancho que el prompt describe. Las
  tres propuestas de la sección 8 de la pauta resuelven eso sin jerga.
- Verificado y sin hallazgos: "node scripts/revisar-mecanico.js" no encontró
  nada; no hay raya larga ni raya media en el guion ni en el archivo de
  imágenes; todas las líneas [TESIS] llevan su línea en blanco; no hay cifras
  en numerales en el texto narrado; los tres [ESQUEMA] tienen tres elementos
  de hasta cuatro palabras; el archivo
  contenido/guiones/claves/2026-10-28-afp-multifondos-perdidas-fondo-e-imagenes.md
  existe con sus tres carátulas y un prompt por cada una de las trece
  secciones del guion, en el mismo orden; y la sección 6 de la pauta ("Qué NO
  va") no entró al guion, revisada punto por punto.
