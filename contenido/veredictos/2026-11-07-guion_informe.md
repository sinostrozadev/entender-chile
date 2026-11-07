VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-07T07:58:00Z

Correcciones:
1. Dónde: líneas 10, 18, 28 y 38, cada línea "[TESIS] ..." seguida sin línea
   en blanco por el texto que viene abajo (la 10 por el párrafo narrado, las
   18, 28 y 38 por su marca [DATO] o su párrafo) · Regla: "FORMATO, REGLA
   DURA: después de CADA línea "[TESIS] ..." va una LÍNEA EN BLANCO antes del
   párrafo narrado. La tesis es una línea y nada más. Sin esa línea en blanco
   el sistema mete el párrafo dentro de la tarjeta de la tesis y el texto se
   sale del video (pasó el 01-09 y el 02-09, con piezas ya publicadas)" ·
   Debe quedar: una línea en blanco inmediatamente después de cada una de las
   cuatro líneas [TESIS], como en la edición del 06-11-2026, donde la tesis
   queda sola y la línea en blanco va antes del [DATO] y del párrafo.
   `node scripts/revisar-mecanico.js` marca las cuatro y
   `node scripts/validar-tarjetas.js` marca la línea 10: las dos tienen que
   quedar sin hallazgos antes de entregar.
2. Dónde: sección "## La noticia del día", líneas 10 y 11, que narran tres
   frases y 37 palabras ([TESIS] de 12 más las dos frases de 25) · Regla:
   punto 1 de ESTRUCTURA DEL GUION, "Dos frases, 25 a 35 palabras en total,
   con su [TESIS] o su [DATO] principal como tarjeta (una sola marca) y su
   [FUENTE]", y la [TESIS] "Sí se narra" · Debe quedar: la sección narrando
   dos frases y entre 25 y 35 palabras contadas, o dejando la [TESIS] como una
   de las dos frases y el párrafo en una sola, o cambiando la tarjeta por el
   [DATO] principal (que no se narra) y conservando las dos frases del párrafo
   de la línea 11, que por sí solo tiene 25 palabras y cumple.
3. Dónde: bloque "## La caída de Santiago Peña [internacional]", que narra
   cuatro cifras: "cuarenta y cuatro senadores" (línea 20), "dos millones
   novecientos mil clientes", "ochocientos millones de dólares" y "noventa y
   siete por ciento" (línea 22) · Regla: "Cifras: narra las que sostienen la
   idea de cada noticia, máximo tres cifras habladas por bloque. Las demás
   pueden ir en una marca [DATO] para que aparezcan en pantalla" · Debe
   quedar: tres cifras habladas como máximo en el bloque. La cuarta sale de la
   voz y, si aporta, su valor exacto queda en la etiqueta de una marca [DATO]
   con su unidad pegada al número, o el hecho se narra sin número ("buena
   parte de los depósitos de organismos públicos", "casi todos los clientes").
4. Dónde: bloque "## El IPC de octubre [economia]", que narra siete cifras
   distintas en nueve menciones: "medio punto" y "cuatro coma cinco por
   ciento" (línea 28), "cero coma cinco por ciento" y "cuatro coma cinco por
   ciento" (línea 30), "dos por ciento", "uno por ciento" y "cuatro coma uno
   por ciento" (línea 32), "cien mil pesos" y "quinientos pesos" (línea 34) ·
   Regla: la misma, "máximo tres cifras habladas por bloque" · Debe quedar:
   tres cifras habladas como máximo. El ejemplo a escala humana de la línea 34
   se queda, porque el prompt pide narrarlo ("Si el informe trae un ejemplo a
   escala humana, nárralo") y ocupa dos de las tres; de las otras cinco, solo
   una sigue en la voz y el resto sale de ella. Los tres valores del IPC ya
   están en el [DATO comparacion] de la línea 29, y los tres aportes por
   división (transporte 2,0%, alimentos 1,0%, vestuario y calzado -4,1%, del
   informe en su línea 30) caben en una marca [DATO barras], que es la fila que
   les corresponde en el árbol (de 3 a 6 valores de la misma familia y misma
   unidad donde importa el tamaño relativo) y que no repite el tipo de la
   tarjeta anterior del bloque. Cuenta las cifras habladas que queden antes de
   entregar, incluidas las de la [TESIS].
5. Dónde: línea 39, "[DATO cifra | Ministerio de Justicia y Derechos Humanos,
   23-10-2026] rebajas vinculadas a condenas por delitos sexuales: 56",
   puesta antes del párrafo de la línea 40, que no menciona ninguna cifra; las
   cincuenta y seis rebajas se narran dos párrafos más abajo, en la línea 42 ·
   Regla: de la marca [DATO], "Va justo antes del párrafo que menciona esos
   números" · Debe quedar: la marca movida para que quede inmediatamente
   antes del párrafo que narra "cincuenta y seis rebajas", sin cambiarle el
   tipo, la fuente ni la etiqueta.

Observaciones:
- Para la pieza siguiente: la cadena diaria no tiene pieza después de esta.
  El veredicto final del día (contenido/revisiones/2026-11-07.md) corresponde
  recién cuando esta pieza quede APROBADA.
- Línea 32, "El transporte subió dos por ciento y fue el principal aporte al
  resultado mensual": el informe no dice que transporte sea el principal
  aporte. Nombra tres divisiones de trece (transporte 0,265 puntos, alimentos
  0,231, vestuario y calzado -0,098) y dice que ocho de las trece aportaron al
  alza, sin rankearlas. No se cobra como incumplimiento, por lo mismo que el
  veredicto del 05-11-2026 no cobró "la distancia más concreta": no afirma
  nada sobre una serie histórica, y 0,265 de un índice de 0,5 sostiene la
  idea. Pero al reescribir el párrafo por la corrección 4 conviene dejarlo en
  lo que el informe sí afirma, que transporte y alimentos aportaron al alza y
  vestuario y calzado bajó.
- Línea 40, "El ministro Fernando Rabat ordenó investigar": el informe atribuye
  la orden al Ministerio de Justicia y dice que Rabat comunicó la decisión el
  06-11-2026 (su línea 40). No cambia el sentido del hecho y no bloquea, pero
  la atribución literal del informe es más exacta y trae la fecha, que el
  bloque hoy no narra.
- Carátula 2, "Cayó el banco / cayó el presidente", no nombra Paraguay, a Peña
  ni a Ueno Bank en ninguna de sus dos líneas. No bloquea, por lo mismo que se
  anotó el 04-11-2026 y el 06-11-2026: el título y la Carátula sugerida, que
  es la que sale al aire, sí nombran a Peña. Queda anotada por si entra en la
  prueba A/B de YouTube.
- "ABC Color/EFE" se pinta en el [FUENTE] de la línea 17 sin que EFE quede
  expandida antes, y no está entre las siglas de uso corriente que el prompt
  salva. Es el mismo choque que CIPER el 04-11-2026: el tope de seis palabras
  de esas marcas no deja expandirla y el informe la trae así en su línea 16.
  No se cobra; es material para la definición del prompt.
- Verificado y sin hallazgos, para que la corrección no rompa lo que ya está
  bien: la selección es la correcta (la portada de Paraguay primera y las
  otras dos [A] del informe, IPC y Justicia, en el orden en que el informe las
  trae, con las [B] y las [C] solo en la web); hay tres bloques de noticia y
  ninguno más, sin "En titulares", sin Dato curioso, sin Agenda y sin "¿En qué
  quedó?"; 514 palabras narradas, dentro de 420 a 600; la Apertura tiene 32
  palabras, sitúa la fecha (el 07-11-2026 es sábado) y adelanta las otras dos
  noticias sin repetir la portada; el Cierre tiene 58 palabras, dice que el
  informe completo está en el enlace de la descripción, integra la línea "Para
  salir hoy" del informe y termina con el tagline exacto; las cuatro [TESIS]
  están bajo las 18 palabras (12, 11, 16 y 9); las tres categorías son de las
  doce permitidas y el clima de carátula es una de las seis; las tres carátulas
  tienen dos líneas de cuatro palabras como tope; las etiquetas de las tres
  marcas [DATO] dicen qué es la cifra y en qué situación, con su rótulo propio
  por valor; el [ESQUEMA] de la línea 44 corresponde, porque una de las tres
  noticias es de proceso, y sale del informe (su línea 46); la variedad no se
  rompe (cifra, comparacion, cifra y esquema, sin dos cifra seguidas ni dos
  del mismo tipo dentro de un bloque); la lista de "Fuentes:" trae las doce
  fuentes de las tres noticias narradas, tal como el informe las escribe, y no
  cuela ningún archivo interno; cero rayas largas o medias, cero paréntesis,
  cero URLs en el texto narrado y ninguna referencia temporal relativa; y la
  fidelidad de los datos de los tres bloques calza con el informe, incluido el
  redondeo en voz de los 2,9 millones de clientes y los US$800 millones.
