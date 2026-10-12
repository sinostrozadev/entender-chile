VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-12T06:07:33Z

Observaciones:
- Para la pieza siguiente: el guion del informe cierra la cadena diaria, así
  que no hay pieza posterior que preparar. Con esta aprobación los tres
  veredictos del día quedan en APROBADA y la revisión final,
  contenido/revisiones/2026-10-12.md, se escribe en esta misma corrida: ese
  push es la compuerta del render y de la publicación en la web.
- Las seis correcciones de la vuelta 1 quedaron resueltas y se verificaron una
  por una contra el diff de las dos versiones (0253165 a a7be662), que no toca
  nada más que lo pedido. Corrección 1: el tema de los dos recursos de nulidad
  queda narrado una sola vez, en el párrafo de la línea 157, que absorbió los
  diecisiete condenados, la falta de imparcialidad de dos juezas y la que se
  inhabilitó el 18-06-2026 tras casi todo el juicio de ciento veintidós
  jornadas; la marca [ESQUEMA] y el párrafo que repetían el tema se borraron
  completos. Corrección 2: quedan dos marcas [ESQUEMA] en la edición, las de
  las líneas 27 y 52, que son las dos conservadas que pedía el veredicto.
  Corrección 3: el bloque de aprobación presidencial tiene una sola tarjeta, la
  de la línea 36, y el cuarenta y cuatro y el veintinueve por ciento quedaron
  solo en la narración de la línea 41. Corrección 4: "más de tres mil
  doscientas respuestas" (línea 41), tres cifras significativas con marcador de
  aproximación. Corrección 5: "y otros más de tres mil trescientos elementos"
  (línea 162). Corrección 6: "Carátula 3: Cinco metros de nieve / ¿Por qué
  estaban ahí?" (línea 5), cuatro palabras por línea y la cifra con su
  referente.
- Comprobado que las correcciones no rompieron las cuotas que tocaban. La
  secuencia de marcas [DATO] quedó cifra, cambio, cifra, cifra, comparacion,
  cifra, cifra, barras: nunca más de dos [DATO cifra] seguidas, que es lo que
  podía romperse al borrar la tarjeta de la línea 41 anterior. Ningún bloque
  tiene dos tarjetas del mismo tipo seguidas. Quedan cuatro tipos distintos
  (cifra, cambio, comparacion, barras), una de comparacion y una de barras, y
  las dos marcas [ESQUEMA] cubren las dos noticias de proceso del día, así que
  sigue habiendo al menos un esquema con ocho o más noticias en la edición.
- Las ocho marcas [DATO] que quedan se revisaron etiqueta por etiqueta y todas
  dicen qué es la cifra y en qué situación, entre cuatro y seis palabras: nieve
  en el sector crítico; aprobación presidencial desde 4 oct; hospital modular
  sin instalar; viviendas amenazadas por la grieta; evaluación negativa del
  empleo y economía estancada o en retroceso; meta de nuevos empleos en 2027;
  regiones con lluvia o tormenta; y las tres de testigos, peritos y pruebas
  materiales ofrecidos por Fiscalía.
- Fidelidad de lo reescrito, verificada contra contenido/informes/2026-10-12.md
  en esta corrida. El párrafo de la línea 157 no agrega nada: el informe trae
  los diecisiete condenados, las dos juezas, la inhabilitación del 18-06-2026 y
  las ciento veintidós jornadas en la entrada de su línea 255, y la defensa de
  Samir Enrique Rivaldo Hernández y los nueve condenados de la Defensoría Penal
  Pública en la de su línea 253. El "más de tres mil doscientas respuestas"
  corresponde a las 3.208 respuestas acumuladas de la línea 43 del informe, y
  el "más de tres mil trescientos elementos" a los 3.307 de su línea 256.
- Estructura verificada de nuevo sobre esta versión, porque las correcciones
  borraron líneas: las once marcas [TESIS] llevan su línea en blanco antes del
  párrafo narrado (comprobado línea por línea, cero fallas) y ninguna pasa de
  trece palabras, bajo el tope de dieciocho. El bloque de clases suspendidas,
  del que se borró el esquema, quedó con la tesis, su línea en blanco y el
  párrafo.
- Cobertura intacta: el diff no toca ninguna noticia, así que siguen valiendo
  las diez narradas (las tres [A] y siete [B], dentro del tope de diez
  combinadas) y los treinta y cinco titulares, uno por línea, ninguno sobre
  doce palabras, que son las catorce [B] fuera del corte más las veintiuna [C].
  Ninguna noticia del informe quedó sin sonar y ninguna se agregó.
- La carátula 3 dice "Cinco metros de nieve" donde el informe y la narración de
  la línea 25 dicen "casi cinco metros". No es hallazgo: es la redacción que el
  veredicto de la vuelta 1 propuso en su "Debe quedar", las carátulas no se
  narran y la regla de redondeo rige sobre la voz. Queda anotado igual, porque
  si mañana aparece la misma forma conviene que la carátula conserve el "casi".
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Búsqueda explícita aparte en el archivo completo: cero
  rayas largas y cero rayas medias, cero URLs y el tagline "El resumen sin
  gritos." como última frase hablada.
- La carátula de hoy todavía no está. Listado de contenido/caratulas/ en esta
  corrida: los últimos archivos con fecha son 2026-10-11.png y
  2026-10-11-prompt.txt, y no hay ninguno de 2026-10-12 ni un
  2026-10-12-NO-PUDE.md. No bloquea, porque el prompt manda commitear el guion
  primero y la imagen después, en su propio commit, pero es lo que conviene
  mirar antes del render.
- Siguen en pie, sin bloquear y sin cambios en esta versión, las observaciones
  de la vuelta 1 que son del prompt y no de la pieza: el titular del apoyo al
  combustible pesquero comprime un "aprobó prolongar"; "SHOA" se pinta en un
  titular sin expansión previa, fuera del alcance de la regla de siglas; los
  cuatro cierres de cautela heredados del informe; la ambigüedad de si "La
  noticia del día" cuenta sus palabras con la tesis narrada o solo con el
  párrafo; "## Dato curioso" sin corchete de categoría; y el lugar del bloque
  "¿En qué quedó?", que el prompt no fija.
