VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-11T05:20:59Z

Correcciones:
1. Dónde: línea 191 de la pieza, el "Por qué podría importar" del ataque hutí
   al aeropuerto de Riad: "Una escalada en el Golfo Pérsico mueve el precio del
   petróleo, que llega a la bencina chilena, y la Cancillería ya tomó posición.
   Las cifras de víctimas no coinciden entre medios." · Regla: el FORMATO DE
   SALIDA de prompts/seleccion.md es "estricto" y pide "Por qué podría
   importar: <una frase, concreta: a quién afecta, cuánta plata, qué cambia, o
   qué historia continúa>"; esta trae dos oraciones y es la única de las 59 que
   lo hace (escaneadas una por una en esta corrida) · Debe quedar: una sola
   frase, por ejemplo "Una escalada en el Golfo Pérsico mueve el precio del
   petróleo, que llega a la bencina chilena, la Cancillería ya tomó posición y
   las cifras de víctimas no coinciden entre medios." Si la advertencia de las
   cifras se prefiere aparte, va en "Notas del barrido" y no en el bloque de la
   candidata. No se toca nada más de la pieza.

Observaciones:
- Para la pieza siguiente: las cifras del aluvión de San Carlos de Apoquindo
  siguen sin coincidir entre medios y la única con dos fuentes y organismo
  responsable es la de Senapred (384 damnificados y más de 1.200 rescatados,
  líneas 725 y siguientes del barrido). Las viviendas afectadas (2.015 en un
  medio y más de 2.000 en otro) vienen de La Prensa de Monagas, línea 788 del
  barrido, marcada como alarma de un solo medio, y los heridos y los daños en
  dólares siguen con una fuente cada uno. El informe las pide a Senapred o a la
  municipalidad antes de ponerlas en cámara, igual que lo advirtió el veredicto
  de la preselección del 10-10-2026.
- Para la pieza siguiente: las seis candidatas marcadas "(sin confirmar)" no
  pueden pasar a cámara con el titular solo, y acá va contra qué verificar cada
  una. La huelga de Minera Escondida del 14-10-2026 y el retiro de la propuesta
  de turnos 14x14 los da Revista Digital Minera REDIMIN (línea 275 del barrido,
  alarma de un solo medio): van contra el sindicato de supervisores o la
  empresa. La huelga en Centinela la da teleSUR sola (línea 287). La explosión
  en la Línea 5 la da La Tercera sola (línea 626) y el barrido no dice qué
  explotó: va contra Metro o Senapred, y si no se establece, queda fuera. El
  llamado de la Sociedad Geológica lo da El Diario de Antofagasta solo (línea
  191). La nulidad buscada en el juicio del megafraude a Fonasa está solo en el
  JSON del día (El Mostrador, publicada el 10-10-2026): va contra el tribunal.
  Y las viviendas afectadas, como dice la observación anterior.
- Para la pieza siguiente: el informe del 10-10-2026 no dejó ninguna línea
  "PENDIENTE DE CIERRE:", así que esta preselección no tenía candidatas
  obligatorias por cierre pendiente y no las trae, que es lo correcto.
  Verificado en esta corrida con la marca literal: una sola coincidencia, su
  línea 345, y es la mención de que el informe del 09-10-2026 tampoco la tenía.
  Sí quedan dos compromisos con fecha para el 19-10-2026, la audiencia del caso
  Municipalidad de Maipú (línea 252 del informe) y los cinco cuadernos de la
  Corte Suprema por licencias médicas (línea 253): no son del 11-10-2026, y
  conviene que el informe no los vuelva a prometer sin fecha.
- Para la pieza siguiente: Trabajo y pensiones entra con empleo y sueldo mínimo
  y con nada de pensiones. La pieza lo declara y acá queda verificado en el
  barrido en Markdown, dejando fuera las URL: cero coincidencias de AFP,
  jubilación y pensión, y la única de cotización es la línea 5 de la cabecera,
  que habla de cotización rutinaria descartada como ruido. Es información para
  mejorar el barrido, no un hueco del editor.
- Para la pieza siguiente: la candidata del sueldo mínimo viene redactada como
  "Meganoticias publica la fecha de la próxima alza". El informe tiene que dar
  el monto y la fecha contra la ley vigente, no contra el medio que los
  anuncia.
- Fidelidad verificada candidata por candidata en esta corrida, no por muestra:
  las 59 URL de la pieza quedan trazadas, 56 literales en
  contenido/barrido/2026-10-11.md, las dos de Interferencia reconstruidas
  exactamente desde el href que viene dentro de la URL malformada (líneas 686 y
  692 del barrido) y la del megafraude a Fonasa desde
  contenido/barrido/2026-10-11.json, las tres declaradas en las notas. Las
  atribuciones agregadas que se revisaron repiten lo que dice el barrido en su
  línea: expulsiones (Teletrece en la línea 47, BioBioChile en la 457 y La
  Tercera en la 461), radares (Crónica Digital en la 370 y La Tercera en la
  707), Panamá (Sitio Andino en la 799, BioBioChile en la 715 y Radio U. de
  Chile en la 698), Cerro Navia, Aedes aegypti, el accidente de la orquesta, la
  Clínica UC Christus y el balance del feriado. Ninguna candidata quedó sin
  respaldo en el barrido y ningún medio citado está inventado.
- Las búsquedas que la pieza cita en "Historias en curso sin novedad hoy" dan
  exactamente lo que dice: "Diario Oficial" cero coincidencias en el barrido,
  "reconstrucción" solo la línea 798 (Panamá) y "licencia" cero coincidencias
  fuera de las URL. También queda verificado el descarte del hallazgo del JSON:
  los 86 subsidios de Negrete traen "visto_antes": "2026-10-10" en el propio
  JSON.
- Las seis fuentes institucionales sin feed de contenido/barrido/fuentes.json
  (Contraloría General de la República, Banco Central de Chile, Cámara de
  Diputados, Senado, Dirección Meteorológica de Chile y Ministerio Público) no
  se abrieron en esta edición, y la pieza lo declara en sus notas, como
  corresponde. La escribió Claude por el reparto permanente de
  contenido/estado/reparto.txt (línea "claude: barrido_listo
  reparar_preseleccion") y prompts/suplente.md lo dice en su línea 119: el
  suplente no navega. Tampoco había material fresco del lector automático: se
  listó contenido/urgente/ en esta corrida y no hay ningún archivo del
  10-10-2026 ni del 11-10-2026.
- La pieza vuelve a abrir con un título y tres líneas de presentación antes de
  "## Política", y repite ahí la nota de autoría que ya va en "Notas del
  barrido". No bloquea, el formato de salida no prohíbe un título, pero el
  veredicto del 10-10-2026 ya dijo que para la siguiente basta en las notas.
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Búsqueda explícita en todo el archivo: cero rayas
  largas y cero rayas medias, cero caracteres sobre U+2100 (sin emojis), 41
  fechas de la prosa en DD-MM-AAAA y la única AAAA-MM-DD va dentro de una ruta
  (contenido/barrido/2026-10-11.json), que es lo que permite la regla 35.
  Ninguna referencia temporal relativa: las tres coincidencias de "hoy" son los
  dos títulos de sección que el prompt manda y el medio Chicureo Hoy. Tamaño 59
  candidatas, dentro del rango de 35 a 60; las doce áreas de cobertura
  obligatoria traen al menos una, así que "Ninguna" en "Áreas sin material hoy"
  es correcto; la cuota blanda de regiones queda cubierta (Antofagasta,
  Tarapacá, Valparaíso, Coquimbo, Maule, Magallanes y Rapa Nui); los 59 bloques
  son de dos líneas con tres campos y URL, sin titulares ni URL repetidas. Las
  cifras del barrido que citan las notas calzan con sus líneas 1 a 6 (266
  noticias con señal de 664 únicas en 22 fuentes, 844 titulares brutos, 26 de
  días previos, 14 descartadas y ninguna fuente caída). El commit 8056349 toca
  solo su propio archivo y lleva el encabezado y la línea "Tarea:" que manda el
  contrato.
