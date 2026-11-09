VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-09T05:45:37Z

Correcciones:
1. Dónde: la línea "[TESIS] Curicó cerró 126 salidas por viajes con licencia
   médica." de la sección "## La noticia del día". El "126" es el único
   numeral que queda en todo el texto narrado del guion: las demás cifras
   (cincuenta y ocho, sesenta y ocho, noventa por ciento, ocho coma tres)
   sí van en palabras. · Regla: prompts/guion-informe.md, ESTRUCTURA punto 4,
   "Convierte cifras, monedas, porcentajes, fechas y abreviaturas a una forma
   cómoda de pronunciar, escribiendo los números en palabras", y control
   interno punto 9, "que los números estén en palabras". La marca [TESIS] "Sí
   se narra", y la excepción de numerales está acotada a los valores de
   [DATO]: "Los VALORES van SIEMPRE en numerales... la marca no se narra, es
   para pantalla. La regla de números en palabras aplica solo al texto
   narrado." · Debe quedar: la misma tesis con el número en palabras y además
   dentro del tope de 66 caracteres del punto 14b, porque esa tesis se
   convierte literal en el título del Short (scripts/short.js la toma del
   primer bloque). Por ejemplo "Curicó cerró ciento veintiséis salidas por
   viajes con licencia." (63 caracteres y 9 palabras, contados). Cualquier
   otra redacción vale si cumple las dos reglas a la vez; "Curicó cerró
   ciento veintiséis salidas por viajes con licencia médica." NO sirve,
   porque mide 70 caracteres y el título del Short saldría cortado. No
   cambies nada más del guion: el resto está conforme.

Observaciones:
- La ausencia de "Carátula sugerida:", "Carátula 2:", "Carátula 3:" y "Clima
  de carátula:" NO es incumplimiento, y lo verifiqué en esta corrida: el
  propio prompt las retira ("Desde el 04-11-2026 no se pide carátula del día:
  el informe en video está apagado"), prompts/contrato-archivos.md no las
  incluye en el FORMATO OBLIGATORIO de los guiones, y scripts/dia.js solo
  llama a miniaturas() cuando NO existe contenido/estado/sin-video-informe.txt,
  marcador que sí existe. Aun así el prompt las sigue listando como líneas
  tercera a sexta de FORMATO DE SALIDA, y scripts/validar-tarjetas.js sigue
  levantando el aviso citando una regla del 05-09 que la decisión del
  04-11-2026 dejó sin efecto. Conviene limpiar las dos cosas: la pregunta se
  repite cada día y el aviso mecánico enseña a ignorar los avisos.
- En el bloque del cobre, "la estimación para el año siguiente sigue en un
  nivel parecido al de este año" usa referencias relativas donde el informe da
  los años exactos (1,2 millones de toneladas en 2026 y una cifra parecida en
  2027). No es incumplimiento (no están en la lista de
  scripts/revisar-mecanico.js, la apertura fija la fecha y la tarjeta dice
  2026), pero el año dicho con su número cumple mejor la regla 35.
- El bloque de portada quedó en 116 palabras narradas y el de encuestas en
  123. El reparto del prompt es "orientativo", así que no bloquea, y sumando
  "La noticia del día" (34 palabras) la portada igual recibe el mayor
  desarrollo.
