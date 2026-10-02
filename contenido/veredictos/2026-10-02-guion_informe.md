VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-02T05:51:27Z

Correcciones:
1. Dónde: línea 10, "[DATO barras | Banco Central, 01 oct] Imacec anual: -1,0%
   (baja mal) ; minería anual: -17,4% (baja mal) ; Imacec sin minería: 1,4%
   (sube)" · Regla: "LA CIFRA GRANDE ES LA DEL TÍTULO (01-10-2026): si el
   título del video dice un número, la tarjeta de 'La noticia del día' muestra
   ESE número grande y el otro va en la etiqueta. (...) Las dos cifras del
   mismo hecho caben, una grande y otra en la etiqueta" · Debe quedar: el
   título dice "Imacec cae 1%", así que la tarjeta tiene que mostrar ese
   número grande, y en una tarjeta de barras no hay número grande (la barra
   que domina es la de -17,4%). Reemplaza la marca por una sola de tipo cifra:
   "[DATO cifra | Banco Central, 01 oct] actividad económica de agosto,
   minería -17,4%: -1,0% (baja mal)". El 1,4% sin minería ya suena en el
   párrafo de la línea 12 y no necesita tarjeta.

2. Dónde: línea 36, "[DATO cifra | La Tercera, 01 oct] personas formalizadas:
   21" · Regla: "ETIQUETA CON CONTEXTO (obligatorio): la etiqueta dice QUÉ es
   la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de modo que la tarjeta se
   entienda con el video en silencio" · Debe quedar: "[DATO cifra | La
   Tercera, 01 oct] personas formalizadas por asociación criminal: 21" (cinco
   palabras, y es lo que dice la línea 59 del informe).

3. Dónde: línea 56, "[DATO cifra | INE, 30 sep] personas desocupadas: 989.400
   | ref: dentro de la fuerza de trabajo" · Regla: "CUÁNDO PONERLA, y es lo
   único que la justifica: cuando lo que hace NOTICIA al dato no es su tamaño
   sino contra qué se mide. Un récord (...), un mínimo, un umbral que se cruza
   (...). Si el dato es noticia por su tamaño y nada más, NO la pongas" · Debe
   quedar: "dentro de la fuerza de trabajo" no es un récord, un mínimo ni un
   umbral, y las 989.400 personas son noticia por su tamaño. Borra la parte "
   | ref: dentro de la fuerza de trabajo" y sube la etiqueta al piso de 3 a 8
   palabras de ETIQUETA CON CONTEXTO, que hoy tiene dos: "[DATO cifra | INE,
   30 sep] personas desocupadas en el trimestre junio-agosto: 989.400 (sube
   mal)".

4. Dónde: línea 58, "había novecientas ochenta y nueve mil cuatrocientas
   desocupadas dentro de una fuerza de trabajo de más de diez millones
   doscientas sesenta y tres mil personas" · Regla: "REGLA DE REDONDEO EN VOZ
   (Santiago, 04-09): las cifras grandes se narran REDONDEADAS, con 'más de',
   'casi', 'cerca de' o 'unos' (...). Tope: TRES cifras significativas
   habladas por número (3.640 millones sí; 3.640.544.800 no; 762 mil sí;
   762.326 no)" · Debe quedar: el primer número habla cuatro cifras
   significativas (9, 8, 9 y 4) y el segundo cinco (1, 0, 2, 6 y 3). Deja
   "había casi novecientas noventa mil personas desocupadas dentro de una
   fuerza de trabajo de más de diez millones". El valor exacto 989.400 se
   conserva en la marca de la línea 56, que es para pantalla.

5. Dónde: línea 86, "[DATO comparacion | Canal 9, 01 oct] montos reparados:
   1.571 millones de pesos ; ocupación del edificio: 34%" · Regla: "6. Dos o
   tres valores de cosas distintas pero comparables, MISMA unidad ->
   comparacion" y "7. UN valor -> cifra" · Debe quedar: pesos y porcentaje no
   son la misma unidad, así que ninguna fila del árbol permite esa
   comparacion; queda la fila 7 con el valor principal, el que cambia algo
   para alguien. Escribe "[DATO cifra | Canal 9, 01 oct] reparos al nuevo
   edificio del Servicio Médico Legal: 1.571 millones de pesos" y deja el 34%
   solo en la narración. Y, en el mismo movimiento, borra la marca de la línea
   94, "[DATO cifra | ADN Radio, 01 oct] horas docentes que se reducirían: más
   de 4.000 (baja mal)": con la 86 convertida en cifra quedarían tres [DATO
   cifra] seguidas (líneas 56, 86 y 94) y la regla de VARIEDAD dice "nunca más
   de dos [DATO cifra] seguidas en el guion". Esa cifra ya suena en la [TESIS]
   del mismo bloque, y la misma regla permite dejar "la cifra sobrante en la
   narración".

6. Dónde: línea 88, "Contraloría ordenó reparar mil quinientos setenta y un
   millones de pesos por el nuevo inmueble del Servicio Médico Legal" · Regla:
   "REGLA DE REDONDEO EN VOZ (...). Tope: TRES cifras significativas habladas
   por número" · Debe quedar: 1.571 habla cuatro cifras significativas (1, 5,
   7 y 1), una más que el tope, y además va sin la aproximación que la regla
   pide. Deja "Contraloría ordenó reparar más de mil quinientos millones de
   pesos por el nuevo inmueble del Servicio Médico Legal". El exacto queda en
   la marca de la línea 86.

7. Dónde: línea 88, "El edificio registra una ocupación de treinta y cuatro
   por ciento y seis mil observaciones" · Regla: "En noticias [B], máximo dos
   cifras habladas" · Debe quedar: la noticia del Servicio Médico Legal es [B]
   (informe, línea 73) y el bloque habla tres cifras: el monto reparado, el
   treinta y cuatro por ciento y las seis mil observaciones. Borra "y seis mil
   observaciones", de modo que la frase quede "El edificio registra una
   ocupación de treinta y cuatro por ciento".

8. Dónde: línea 116, "Tres seremis renunciaron y el Gobierno acumula cincuenta
   y dos salidas." · Regla: "en cada titular, una [cifra] como mucho" y "El
   hecho y, si es imprescindible, UNA cifra; sin quién lo dijo, sin contexto,
   sin segunda cláusula" · Debe quedar: el titular habla dos cifras ("tres" y
   "cincuenta y dos") en dos cláusulas. Deja "El Gobierno suma cincuenta y dos
   salidas desde su instalación." (diez palabras, una cifra, fiel a la línea
   49 del informe).

Observaciones:
- Para la pieza siguiente: el informe del 02-10-2026 no trae sección "##
  Agenda". Lo verifiqué buscando "agenda" en el archivo completo: aparece una
  sola vez, en la línea 89, dentro de "agenda estadística". Es el primer
  informe sin esa sección desde el 20-09-2026, y por eso el guion no lleva el
  bloque "## Agenda" que pide el punto 8 de la ESTRUCTURA. No lo marco como
  incumplimiento, porque sin hitos en la entrada no hay qué narrar, y los tres
  hitos con fecha que el informe sí trae quedaron dentro de sus bloques (el
  próximo Imacec el 02-11-2026, el Informe de Finanzas Públicas el 06-10-2026
  y la próxima Encuesta Nacional de Empleo el 29-10-2026). Conviene que el
  informe de mañana recupere la sección.
- Dos titulares hablan dos números si se cuenta "una" como cifra: "Un choque
  en La Pirámide dejó una persona muerta y seis heridas." (línea 118) y "Un
  incendio destruyó una vivienda y dejó ocho damnificados en Limache." (línea
  130). No los marco porque en los dos casos "una" se lee como artículo y el
  recuento es un solo balance de daños, pero conviene fijar la convención: la
  segunda, además, tiene dos verbos ("destruyó" y "dejó").
- "Dipres" (línea 67) y "TN" (línea 106) se pintan en el pie de las tarjetas
  de sus bloques sin estar expandidas, y no figuran entre las siglas de uso
  corriente que la regla salva (IPC, PIB, ONU, INE, Carabineros, PDI). No lo
  marco porque las dos están escritas tal como las acredita el informe, pero
  "Dipres" es el mismo caso que "DMC", la sigla que la regla nombra.
- La última frase del bloque del Servicio Médico Legal ("El antecedente
  compromete recursos fiscales y deja abierta la recuperación administrativa
  de los montos objetados", línea 88) está copiada palabra por palabra de la
  línea 75 del informe, y es la única frase del guion que lo está. La regla de
  ORIGINALIDAD pide que no haya lectura "apenas parafraseada"; cierra además
  el bloque con una formulación administrativa en vez de una consecuencia
  concreta.
- Las etiquetas de las tarjetas de varios valores quedan en una o dos palabras
  ("servicios", "comercio", "mujeres", "hombres", "variación anual"), bajo el
  piso de 3 a 8 palabras de ETIQUETA CON CONTEXTO. No las marco porque el
  propio ejemplo del prompt para barras usa etiquetas de una palabra
  ("industria -5,1% ; minería -7,2% ; manufactura -4,9%"), pero es la misma
  observación que dejaron los veredictos del 22 y del 26-09-2026.
- Verificado y en regla, para que la vuelta 2 no lo vuelva a abrir: las tres
  noticias [A] están narradas; las catorce [B] se reparten en siete narradas y
  siete en titulares; las veintidós [C] tienen su titular. Son veintinueve
  líneas de titular, cada una en su propia línea, ninguna sobre el tope de
  doce palabras, con "Y en titulares:" sola en su línea y el matiz conservado
  donde el informe habla de proyección o de trámite. Las diez [TESIS] están
  bajo las dieciocho palabras y todas llevan su línea en blanco. Las
  categorías entre corchetes son válidas y los bloques de estructura van sin
  corchete. Cada bloque de noticia trae su [FUENTE] y la Apertura, el dato
  curioso, los titulares y el cierre van sin ella. Hay dos [ESQUEMA], un [SIN
  DIBUJO] bien usado (la muerte del trabajador en Radomiro Tomic) y cuatro
  tipos distintos de tarjeta. La apertura tiene treinta y siete palabras y la
  fecha es correcta (el 02-10-2026 es viernes). "La noticia del día" tiene dos
  frases y veintisiete palabras. "Para salir hoy" quedó integrada en la
  despedida y "El resumen sin gritos." es la última frase. La lista "Fuentes:"
  reproduce la del informe sin rutas internas y sin las dos fuentes de
  noticias descartadas. No hay rayas largas ni medias, ni conectores de ensayo
  escrito, ni frases que narren la ausencia de noticia.
