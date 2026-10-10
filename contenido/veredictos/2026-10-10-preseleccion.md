VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-10T05:10:21Z

Observaciones:
- Para la pieza siguiente: las cifras del aluvión de San Carlos de Apoquindo y
  Las Condes no coinciden entre medios y ninguna tiene segunda fuente. La
  preselección lo deja dicho en sus notas y acá va verificado contra el barrido
  del 10-10-2026: seis muertos en unos medios y seis heridos o lesionados en
  otros, más las 2.000 viviendas dañadas (línea 706 del barrido, un solo
  medio), los 170 millones de dólares de daños (línea 31 de la preselección,
  La Tercera sola) y las 200 hectáreas. El informe tiene que confirmar cada una
  antes de ponerla en cámara, y la de los muertos o heridos primero, porque es
  la que define el tono de la edición. El informe del 09-10-2026 ya descartó
  por "sin segunda fuente" la de los seis lesionados (su línea 290).
- Para la pieza siguiente: las tres candidatas marcadas "(sin confirmar)" no
  pueden pasar a cámara con el titular solo. El 21% del empleo formal por
  automatización se atribuye al Banco Central sin documento y lo da El
  Ecosistema Startup (línea 24 del barrido); las 2.000 viviendas dañadas vienen
  de apnoticias.pe; el aviso de nuevas lluvias y tormentas lo da TNT Sports,
  que no es un medio de clima (línea 700 del barrido). O se verifican contra la
  fuente primaria (Banco Central, Senapred o la Dirección Meteorológica), o
  quedan fuera.
- Para la pieza siguiente: el informe de la OEA sobre la elección presidencial
  de Brasil sigue sin cerrarse. El informe del 09-10-2026 ya lo dijo en cámara
  como sin publicación verificable (su línea 190) y el barrido del 10-10-2026
  no trae ninguna entrada: cero coincidencias de "OEA", buscadas en esta
  corrida. Si el informe lo vuelve a tomar, solo puede decir que al 10-10-2026
  sigue sin publicarse, no cerrarlo con un dato nuevo.
- Para la pieza siguiente: el informe del 09-10-2026 no dejó ninguna línea
  "PENDIENTE DE CIERRE:", así que esta preselección no tenía candidatas
  obligatorias por cierre pendiente y no las trae, que es lo correcto. Se
  verificó en esta corrida: cuatro coincidencias de "pendiente" (líneas 20,
  140, 216 y 275) y ninguna es la marca. Sí hay dos compromisos con fecha que
  llegan el 19-10-2026, la audiencia del caso Municipalidad de Maipú (línea 212
  del informe) y los cinco cuadernos de remoción de la Corte Suprema (línea
  216): no son de hoy, pero conviene que el informe no los prometa otra vez sin
  fecha.
- Para la pieza siguiente: Trabajo y pensiones entra con material de empleo y
  nada de pensiones. La preselección lo declara y acá queda verificado: en las
  300 noticias con señal del barrido no hay un solo titular sobre AFP,
  cotizaciones ni monto de pensiones. Es información para mejorar el barrido,
  no un hueco del editor.
- Las seis fuentes institucionales sin feed de contenido/barrido/fuentes.json
  (Contraloría General de la República, Banco Central de Chile, Cámara de
  Diputados, Senado, Dirección Meteorológica de Chile y Ministerio Público) no
  se abrieron en esta edición, y la pieza lo declara en sus notas, como
  corresponde. La escribió Claude por el reparto permanente de
  contenido/estado/reparto.txt, cuyo motivo es justamente ese, así que lo de
  esas instituciones llega por prensa: Contraloría (Nancagua y el club de
  fútbol con financiamiento ilegal), Senado (patentes mineras) y Ministerio
  Público (Calisto, el aluvión y el megaincendio de Penco y Tomé).
- Fidelidad verificada candidata por candidata en esta corrida, no por muestra:
  las 59 URLs de la pieza están en contenido/barrido/2026-10-10.md, las 59
  traen medio identificable y las atribuciones de corroboración que se
  revisaron (21% de automatización, 2.000 viviendas, lluvias de TNT Sports,
  choque de Taltal, retiro de la reforma de seguridad) repiten lo que dice el
  barrido en su línea. Ninguna candidata quedó sin respaldo léxico en el
  barrido.
- Las catorce historias en curso sin novedad están verificadas una por una
  contra el barrido del 10-10-2026, y las búsquedas que la pieza cita dan
  exactamente lo que dice: cero coincidencias de Maipú, Barriga, licencia,
  jueces, OEA, Junaeb, alimentación escolar, Talagante, carpintero, Bolsonaro,
  Fintual, gimnasio, Ricarte Soto, húngara y Porcel; las dos de "Corte Suprema"
  son la causa del senador Calisto (líneas 474 y 477) y la única de "robótica"
  es el Festival de Ciencia y Tecnología (línea 936). Las catorce vienen del
  informe del 09-10-2026.
- El reingreso del retiro de la reforma de seguridad está bien justificado: el
  informe del 09-10-2026 la descartó como "duplicada" en su línea 288 y no la
  narró en ninguna parte, así que quedó sin contar y vuelve a la olla con
  razón.
- La pieza abre con un título y tres líneas de presentación antes de
  "## Política", donde las preselecciones del 07-10-2026 y del 09-10-2026
  parten directo en la primera área. No bloquea, el formato de salida no
  prohíbe un título y el informe también lo lleva, pero la nota de autoría ya
  está en "Notas del barrido", que es donde el prompt la pide. Para la
  siguiente basta ahí.
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Búsqueda explícita de raya larga, raya media y emojis
  en todo el archivo: cero coincidencias. Las 27 fechas de la prosa van en
  DD-MM-AAAA y ninguna referencia temporal es relativa. Tamaño 59 candidatas,
  dentro del rango de 35 a 60; las doce áreas de cobertura obligatoria traen al
  menos una; la cuota blanda de regiones queda cubierta con holgura (Atacama,
  Antofagasta, Biobío, Los Ríos, O'Higgins, Magallanes, Coquimbo, Valparaíso y
  Rapa Nui); los 59 bloques son de dos líneas, con medio y URL, y cada "Por qué
  podría importar" es una sola frase. El commit 8a72d4b toca solo su propio
  archivo y lleva el encabezado y la línea "Tarea:" que manda el contrato.
