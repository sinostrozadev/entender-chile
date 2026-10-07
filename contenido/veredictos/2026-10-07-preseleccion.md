VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-07T05:17:40Z

Observaciones:
- Para la pieza siguiente: el cierre pendiente de la OEA llega sin enlace y hay
  que resolverlo igual. En esta corrida: contenido/informes/2026-10-06.md línea
  242 dice "PENDIENTE DE CIERRE: informe de la OEA sobre la elección
  presidencial de Brasil | 2026-10-06" y su línea 303 agrega que al cierre no
  estaba publicado; "OEA" y "observación electoral" dan cero coincidencias en
  contenido/barrido/2026-10-07.md. Es la segunda edición que arrastra la
  promesa: el informe de hoy tiene que traerlo con su fuente primaria o decir
  en cámara que no apareció.
- Para la pieza siguiente: las seis candidatas con "(sin confirmar)" tienen
  respaldo desigual y conviene tratarlas distinto. Son las de las líneas 20
  (desempleo de 9,6%, Finanzas Digital, que se contrasta contra el INE), 48
  (oficio que recomienda descontinuar el Programa de Alimentación Escolar de
  Junaeb, ContrapoderChile.cl, arrastrada desde el 04-10-2026), 50 (más de
  $100 millones por medir rating, dos medios con titulares distintos), 74
  (contrato colectivo de TelePerformance, la federación sindical y Resumen.cl),
  81 (brote de sífilis y gonorrea) y 94 (eventual despido de 2.000 docentes,
  elciudadano.com). La de la línea 81 viene de Tiempo de San Juan, un medio
  argentino, aunque el hecho sea chileno: necesita el Minsal antes de
  afirmarse.
- Para la pieza siguiente: el Plan Chile Despega entra con dos desgloses
  regionales nuevos, cerca de $6 mil millones en Aysén y $16.757 millones en
  Tarapacá, y el informe del 06-10-2026 ya narró el programa (siete menciones
  de "Chile Despega" en ese archivo, contadas en esta corrida). Es un programa
  nacional con desglose por región, no dos anuncios: conviene sumar los montos
  al hecho ya contado.
- Para la pieza siguiente: la alianza de Conaf Coquimbo con la Universidad de
  Chile para restaurar ecosistemas por cinco años (barrido líneas 399 y 400,
  corroborada en dos fuentes) quedó fuera de la olla. "Conaf" tiene una sola
  coincidencia en la pieza, la línea 170 de las notas del barrido, que nombra a
  Conaf entre lo que "entró por el barrido" cuando no hay ninguna candidata
  suya. No bloquea, porque Medioambiente y clima y Chile en regiones traen
  material, pero la nota promete más de lo que la olla tiene.
- Falta la línea en blanco entre la última candidata de Internacional (línea
  149) y el encabezado "## Áreas sin material hoy" (línea 150), comprobado con
  cat -A en esta corrida. Es el único encabezado del archivo sin línea en
  blanco antes. El prompt no lo exige con palabras, así que no bloquea, pero su
  bloque de formato las muestra y un renderizador de Markdown puede leer ese
  encabezado como parte de la lista.
- Las seis fuentes institucionales sin feed del MATERIAL DE ENTRADA 2
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público) no se abrieron, y la pieza lo declara en su línea 170 sin
  reemplazar ninguna ausencia con supuestos. Es la salida que el propio prompt
  contempla en "## Notas del barrido" y no se puede comprobar desde el repo,
  porque el validador no navega. El tapón está en quién toma el turno, no en la
  pieza.

Verificado en esta corrida: el único INCUMPLE de la vuelta 1 quedó resuelto. El
diff cfc31e7..09e89ec toca una sola línea, la 171, y cambia "con fecha
2026-10-06" por "con fecha 06-10-2026", que es el formato de prosa que pide
REGLAS DE ESTILO; nada más del archivo cambió, así que la corrección no
introdujo nada nuevo. La búsqueda del patrón de fecha de sistema en todo el
archivo deja dos coincidencias, las líneas 136 y 171, y las dos están dentro de
la ruta contenido/informes/2026-10-06.md, donde ese formato corresponde.
scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos"; 57 candidatas
(rango aceptable 35 a 60); las doce áreas de cobertura obligatoria presentes y
en el orden del prompt, más las tres secciones finales en su orden; sin rayas
largas ni medias (cero coincidencias); ruta del contrato
(contenido/preseleccion/2026-10-07.md) y commit 09e89ec con encabezado "edición
2026-10-07: preselección" y un solo archivo tocado.
