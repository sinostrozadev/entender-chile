VEREDICTO: APROBADA
VUELTA: 4
PIEZA: guion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-12T23:22:55Z

El único INCUMPLE de la vuelta 4 quedó resuelto y la corrección no rompió
nada. El diff contra la versión anterior toca una sola línea, la 49 de
"Quién paga", y ahí ahora dice "Los subsidios y sus cotizaciones se
financian con cargo al régimen de salud", que es la frase que el veredicto
anterior pidió y que la entrega sostiene en su línea 26 ("Los subsidios por
incapacidad laboral y sus cotizaciones se financian con cargo al régimen de
salud"). Con eso la pregunta 2 de la sección 4 de la pauta ("¿Quién me paga
los días que no trabajo, y de dónde sale esa plata?") queda respondida en
sus dos mitades: las tres primeras frases dicen quién paga y la cuarta dice
de dónde sale la plata. Su fuente, "SUSESO, régimen SIL y Compendio", ya
estaba acreditada en el bloque Fuentes, línea 128, así que la regla de
crédito total sigue cumplida.

Verificado además sobre la parte que la corrección tocó: la frase agregada
no trae cifras, no usa rayas, no mete paréntesis ni URL en lo narrado, y
respeta la línea en blanco detrás de la [TESIS] de la sección. El guion
quedó en 1.513 palabras narradas (11,2 minutos a 135 por minuto, contando
las [TESIS] que el prompt declara narradas), dentro del rango de 1.050 a
1.650 del control interno 3: la corrección sumó trece palabras a las 1.500
de la vuelta anterior, como estaba previsto. `node
scripts/revisar-mecanico.js` imprimió "sin hallazgos mecánicos". Nada de la
sección 6 de la pauta ("Qué NO va") entró con la frase nueva, y las otras
seis preguntas de la sección 4 siguen respondidas en lo narrado, en un
archivo que por lo demás no cambió. El archivo de imágenes
2026-10-07-licencia-medica-fiscalizacion-y-sumario-imagenes.md tampoco
cambió y sigue alineado: tres carátulas y catorce prompts de sección en el
mismo orden que las catorce secciones del guion.

Observaciones:
- Para la pieza siguiente: las tres observaciones de abajo vienen arrastradas
  de vueltas anteriores y ninguna bloquea, pero esta aprobación cierra la
  Clave y manda el archivo a render, así que ya no se corrigen acá. Van para
  el guion de la próxima Clave, donde sí se pueden evitar desde la primera
  escritura.
- La marca de la línea 87 dice "[DATO tabla | Dipres, 05-02-2026]" y esa
  fecha no consta: la entrega (línea 76) y la investigación (línea 58) dicen
  las dos "2026, consulta 05-10-2026". No es INCUMPLE porque la vuelta 2
  cerró hechos, cifras y fuentes y la convergencia no los reabre, pero esa
  fecha sale en pantalla. En la próxima Clave, la fuente de una marca [DATO]
  se copia con la fecha que trae la entrega y nada más. Lo mismo con el
  tipo: lo que muestra son tres magnitudes del mismo universo de sumarios,
  que según la marca es "barras", porque "tabla" queda reservada a
  posiciones u ordenamientos.
- Las líneas 69 y 98 dicen "Al cinco de octubre" sin el año. El año se
  recupera del contexto de cada sección, así que no bloquea, pero el video
  es evergreen y el prompt pide las fechas dichas completas en voz.
- Siguen sobre treinta palabras las oraciones de las líneas 15, 105 y 110,
  las mismas tres que observaron las vueltas 2, 3 y 4. El prompt pide
  alternar largos y no prohíbe las frases desarrolladas, así que no bloquea.
