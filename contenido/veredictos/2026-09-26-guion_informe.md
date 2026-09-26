VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-26T13:05:01Z

Correcciones:
1. Dónde: línea 81, "La causa que ayer era una detención hoy es una
   incautación." · Regla: "Usa exclusivamente el contenido del informe de hoy
   (contenido/informes/AAAA-MM-DD.md) como fuente informativa base" y "No
   reconstruyas el informe por memoria, no uses ediciones de otras fechas y no
   vuelvas a investigar noticias" · Debe quedar: el párrafo abre sin afirmar en
   qué etapa estaba la causa ayer. La detención no está en el informe de hoy:
   busqué "deten" sobre el archivo completo y da cero coincidencias, y la única
   línea de esa noticia, la 113, dice "avanzó a la incautación" sin nombrar la
   etapa anterior. Sirve abrir con lo que el informe sí trae, por ejemplo "La
   investigación por corrupción en Gendarmería avanzó a la incautación."
2. Dónde: línea 48, "Hasta ayer la discusión era de tono. Hoy entró un dato de
   contenido." · Regla: "La FECHA EXACTA manda: si el informe da la fecha de un
   hecho, nunca la reemplaces por 'esta semana', 'hace unos días' o
   'recientemente', y menos en la frase que abre el bloque" · Debe quedar: la
   fecha que fija el informe en su línea 53, el 25-09-2026, narrada en
   palabras, en la frase que abre el bloque. Hoy el guion dice "hoy" en un
   video que en su propia apertura se fecha "sábado veintiséis de septiembre",
   así que el dato del chequeo queda corrido un día. Cumple, por ejemplo, "El
   veinticinco de septiembre entró a la discusión un dato de contenido, no de
   tono."
3. Dónde: línea 21, "[DATO comparacion | La Tercera, 25 sep] aislados en
   Curarrehue: 7.850 ; damnificados en el sur: 400" · Regla: control interno
   17, "ninguna marca lleva un dato que no esté en el informe", y "No cambies
   el sentido de ninguna cifra" · Debe quedar: el valor con el "más de" que
   trae el informe en su línea 17 ("más de 400 personas damnificadas"), es
   decir "damnificados en el sur: más de 400". La tarjeta es lo que se pinta:
   hoy afirma en pantalla una cifra exacta que el informe no da, y el propio
   guion narra "más de cuatrocientos" en la línea 24 y ya usa esa forma en el
   valor de la línea 80 ("más de $200 millones").
4. Dónde: línea 15, la Apertura completa, desde "Es sábado veintiséis de
   septiembre." hasta "Y la Fiscalía va a investigar al embajador
   estadounidense." · Regla: "APERTURA: DESPUÉS de la noticia del día, máximo
   15 segundos (unas 40 palabras)" · Debe quedar: 40 palabras o menos. Las
   conté: hoy son 47. Si se elimina la última frase, "Y la Fiscalía va a
   investigar al embajador estadounidense." (9 palabras), quedan 38 contadas y
   la apertura sigue adelantando dos asuntos, el diésel y el Escudo, que es lo
   que la regla permite ("2 o 3 de los OTROS asuntos de la jornada"). Esa
   noticia se narra igual en su propio bloque, la línea 60.
5. Dónde: línea 99, el titular "Standard and Poor's mantiene la nota de Chile
   y prevé un repunte." · Regla: "El hecho y, si es imprescindible, UNA cifra;
   sin quién lo dijo, sin contexto, sin segunda cláusula, sin fuente hablada
   (las fuentes van en la lista 'Fuentes:'), sin opinión" · Debe quedar: un
   solo hecho, sin la segunda cláusula coordinada. Cumple, por ejemplo,
   "Standard and Poor's mantiene en A la nota soberana de Chile." (once
   palabras contadas, bajo el tope de doce, con la sigla expandida). El resto
   de los 34 titulares está bien: ninguno pasa de doce palabras y ninguno
   convierte un anuncio en hecho consumado.

Observaciones:
- Para la pieza siguiente: el informe de hoy deja cuatro conceptos para el
  banco de temas de la Clave que no dependen de una noticia nueva: la escala de
  alertas de Senapred y qué obliga una alerta roja, que hoy rige en Biobío,
  Cautín y Valdivia (informe, línea 17); qué le falta a un mecanismo como el
  Escudo de las Américas para ser tratado y por qué tendría que pasar por el
  Congreso (línea 55); qué es una clasificación soberana y cómo determina la
  tasa a la que se endeuda el Estado, que el propio informe explica en una
  frase (línea 41); y qué es el cohecho y por qué arrastra inhabilidad
  perpetua para cargos públicos (línea 87).
- La sigla Senapred se pinta en la marca de la línea 18 antes de que la
  narración la expanda en la línea 22 ("El Servicio Nacional de Prevención y
  Respuesta ante Desastres, Senapred"). No lo mando a corregir, igual que el
  25-09: expandirla dentro del [FUENTE] rompería el máximo de seis palabras del
  formato legible, y Senapred se lee sin traducir como las que el prompt salva.
  Queda anotado porque es el cuarto día que aparece.
- Línea 135, "en el mismo país que esta semana tiene tres alertas rojas":
  "esta semana" es una de las tres expresiones que la regla de fecha exacta
  nombra, y el informe fecha esas alertas en el 26-09-2026. No bloquea, porque
  es una alerta vigente y no un hecho fechado que se difumine, y el guion sí da
  la fecha en su Agenda ("Durante este sábado"). Si se toca ese párrafo, "este
  sábado" resuelve.
- Línea 67, "o sea, en cuatro días": es una cuenta derivada, no un dato del
  informe. La verifiqué y está bien (del 26 al 30 de septiembre), y el informe
  fija ese plazo, así que no entra como corrección.
- El bloque del Escudo va con categoría `congreso` (línea 43). `internacional`
  es el cajón en que un lector archivaría una adhesión a un mecanismo
  extranjero, pero el prompt solo fija por regla la distinción clima/emergencia
  y `congreso` es una de las doce, así que no bloquea. La categoría del
  temporal, `emergencia`, está bien elegida: hay aislados, damnificados y
  alertas declaradas, no pronóstico.
- "La noticia del día" y el bloque del temporal cuentan los dos mismos hechos,
  el número de Curarrehue y el puente de Lautaro. Está reformulado, no
  repetido literal, así que cumple, pero la frase del puente de la línea 28
  queda casi uno a uno con la de la línea 12.
- Cuentas verificadas contra el informe: 3 [A], 23 [B] y 17 [C]. El guion narra
  las tres [A] y seis [B], nueve noticias narradas, bajo el tope de diez, y deja
  34 titulares, uno por cada una de las 17 [B] fuera del corte y de las 17 [C],
  cada uno en su propia línea. Nada del informe queda sin sonar. Las diez
  [TESIS] están dentro de las 18 palabras y todas llevan su línea en blanco
  antes del párrafo. Cada bloque de noticia trae su [FUENTE] y ninguna pasa de
  seis palabras. Las marcas [DATO] respetan el árbol de tipos y la variedad:
  tres tipos, nunca más de dos cifra seguidas, un [ESQUEMA] para el día de
  proceso. Sin rayas, sin paréntesis fuera del indicador, sin conectores de
  ensayo escrito, sin numerales en el texto narrado. 1.682 palabras narradas,
  unos 12,7 minutos a 132 palabras por minuto, dentro del "puede llegar a 12 o
  13 en días cargados". El tagline "El resumen sin gritos." cierra el video y la
  línea "Para salir hoy" quedó en la despedida.
- La carátula no bloquea: contenido/caratulas/2026-09-26-NO-PUDE.md está
  escrita con su motivo, que es la salida que el prompt ordena cuando no hay
  generador.
