VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-07T05:11:41Z

Correcciones:
1. Dónde: línea 171, "el informe del 06-10-2026 lo dejó como PENDIENTE DE CIERRE
   con fecha 2026-10-06, ya cumplida" · Regla: la sección REGLAS DE ESTILO del
   prompt, "Fechas en la prosa como DD-MM-AAAA" (regla dura 35: AAAA-MM-DD solo
   en rutas y líneas del sistema, y esta frase es prosa, no una ruta) · Debe
   quedar: la misma frase con la fecha en formato de prosa, "con fecha
   06-10-2026, ya cumplida". Las rutas contenido/informes/2026-10-06.md de esa
   misma línea y de la línea 136 se quedan como están, porque ahí AAAA-MM-DD es
   la ruta. Nada más de la pieza cambia: es el único lugar del archivo con una
   fecha de prosa en formato de sistema (búsqueda del patrón AAAA-MM-DD en todo
   el archivo en esta corrida, dos coincidencias, la de la línea 136 dentro de
   una ruta).

Observaciones:
- Para la pieza siguiente: el cierre pendiente de la OEA llega sin enlace y hay
  que resolverlo igual. Se buscaron "OEA" y "observación electoral" en el
  barrido del 07-10-2026 en esta corrida, las dos con cero coincidencias, y en
  contenido/informes/2026-10-06.md no hay ninguna URL para ese informe (su
  fuente, línea 280, es "OEA, acuerdo de misión de observación electoral en
  Brasil, 13 ago", sin enlace). Es la segunda edición que arrastra la promesa,
  porque el veredicto del 06-10-2026 ya la dejó anotada: el informe de hoy tiene
  que traerlo con su fuente primaria o decir en cámara que no apareció.
- Para la pieza siguiente: las seis candidatas con "(sin confirmar)" tienen
  respaldo desigual en el barrido y conviene tratarlas distinto. Corroboradas en
  dos fuentes: el desempleo de 9,6% (barrido línea 342, Finanzas Digital, que se
  contrasta contra el INE) y el oficio que recomienda descontinuar el Programa
  de Alimentación Escolar de Junaeb (línea 30, ContrapoderChile.cl, arrastrada
  desde el 04-10-2026). Solo "mismo tema en dos medios con titulares distintos":
  los más de $100 millones por medir rating (líneas 138 y 162) y el eventual
  despido de 2.000 docentes (línea 225, elciudadano.com). Alarma de un solo
  medio por ahora, dos veces: el contrato colectivo de TelePerformance (líneas
  372 y 376, la federación sindical y Resumen.cl). Y el brote de sífilis y
  gonorrea viene de Tiempo de San Juan, un medio argentino, aunque su titular
  en el barrido dice "Alerta sanitaria en Chile" (línea 603): el hecho es
  chileno, la fuente no, así que necesita el Minsal antes de afirmarse.
- Para la pieza siguiente: el Plan Chile Despega entra con dos desgloses
  regionales nuevos, cerca de $6 mil millones en Aysén y $16.757 millones en
  Tarapacá, y el informe del 06-10-2026 ya narró el programa (siete menciones de
  "Chile Despega" en ese archivo, buscadas en esta corrida). Es un programa
  nacional con desglose por región, no dos anuncios: conviene sumar los montos
  al hecho ya contado, lo mismo que observó el veredicto del 06-10-2026.
- Para la pieza siguiente: la alianza de Conaf Coquimbo con la Universidad de
  Chile para restaurar ecosistemas por cinco años (barrido línea 399,
  corroborada en dos fuentes) quedó fuera de la olla. Se buscó "Conaf" en la
  pieza en esta corrida: una sola coincidencia, y está en las notas del barrido
  (línea 170), que nombra a Conaf entre lo que "entró por el barrido" cuando no
  hay ninguna candidata suya. No bloquea, porque Medioambiente y clima y Chile
  en regiones traen material, pero la nota promete más de lo que la olla tiene.
- La candidata obligatoria del cierre pendiente entra sin URL en el tercer campo
  del formato, con "sin enlace nuevo" y la evidencia citada. Se abrió
  contenido/informes/2026-10-06.md en esta corrida y su línea 242 dice
  "PENDIENTE DE CIERRE: informe de la OEA sobre la elección presidencial de
  Brasil | 2026-10-06", con fecha ya cumplida. No es INCUMPLE: el prompt obliga
  a incluir esa candidata y no hay enlace que citar sin inventarlo, ni en el
  barrido del día ni en el informe de ayer.
- Falta la línea en blanco entre la última candidata de Internacional (línea
  149) y el encabezado "## Áreas sin material hoy" (línea 150). Es el único
  encabezado del archivo sin línea en blanco antes. El prompt no lo exige con
  palabras, así que no bloquea, pero su bloque de formato las muestra y un
  renderizador de Markdown puede leer ese encabezado como parte de la lista.
- Las seis fuentes institucionales sin feed del MATERIAL DE ENTRADA 2
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público) no se abrieron, y la pieza lo declara en sus notas (línea
  170) sin reemplazar ninguna ausencia con supuestos. Es la salida que el propio
  prompt contempla en "## Notas del barrido" y no se puede comprobar desde el
  repo, porque el validador no navega: queda anotada tal como la pieza la
  declara, igual que en el veredicto del 05-10-2026. La misma nota aparece en
  las preselecciones del 03 y del 04-10-2026 (búsqueda en las siete
  preselecciones de octubre en esta corrida), así que el tapón está en quién
  toma el turno y no en la pieza.

Verificado en esta corrida: "sin hallazgos mecánicos" de
scripts/revisar-mecanico.js; 57 candidatas (rango aceptable 35 a 60); las doce
áreas de cobertura obligatoria presentes, con material y en el orden del prompt;
los 57 bloques con su línea "Por qué podría importar" (comprobado bloque por
bloque); los 56 enlaces de la pieza presentes en el barrido del día o en su JSON
(ninguno ausente, ninguno repetido) y los medios citados iguales a los que el
barrido atribuye; el dato del encabezado del barrido que la pieza cita (257
noticias con señal de 846 únicas en 22 fuentes, sin fuentes caídas) igual al del
archivo; la candidata obligatoria del cierre pendiente del 06-10 presente y
marcada, y es la única línea PENDIENTE DE CIERRE del informe de ayer; las tres
secciones finales presentes y en el orden del prompt; las diez afirmaciones de
"Historias en curso sin novedad hoy" comprobadas una por una contra el barrido
(Escondida, Monsalve, Bernarda, Macul, cáncer, célula, AFP Uno, Balmaceda, Chao
Cables, Kimal y Telescopio con cero coincidencias; PCC solo dentro de una URL;
Yo Elijo, RE-genera, Subsidio Unificado al Empleo y Costa Rica con las
coincidencias que la pieza declara) y todas salen del informe del 06-10-2026;
cuota de regiones cumplida con holgura, con candidatas en Atacama, Aysén,
Tarapacá, Ñuble, O'Higgins, Valparaíso, Magallanes, Arica y el borde costero
entre el Maule y La Araucanía; sin rayas largas ni medias; sin emojis; sin
preámbulo ni comentario final; búsqueda del patrón "<día> de <mes>" en todo el
archivo con cero coincidencias; ruta del contrato
(contenido/preseleccion/2026-10-07.md) y commit cfc31e7 con encabezado "edición
2026-10-07: preselección", cuerpo con "Tarea: suplente (plan B)" y un solo
archivo tocado.
