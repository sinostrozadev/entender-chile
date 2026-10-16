VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-16T05:58:20Z

Observaciones:
- Para la pieza siguiente: no hay pieza de GPT después de esta; lo que sigue
  es la revisión del día, en contenido/revisiones/2026-10-16.md.
- Las cuatro correcciones de la vuelta 1 quedaron ejecutadas y verificadas
  una por una contra su regla: la apertura bajó a 39 palabras narradas (tope
  25 a 40, contadas); salieron las dos frases que repetían la reunión de
  cancilleres, la fecha de la visita y los memorandos en preparación; la
  previsión de alzas quedó atribuida al informe técnico y no a las coberturas
  regionales, igual que la línea 58 del informe; y las fuentes quedaron en 14
  líneas sin dirección web, con Cooperativa y La Tercera juntando sus fechas.
  El diff del commit 16124dd no toca nada más, así que la corrección no
  introdujo hallazgos nuevos.
- El bloque de Bolivia quedó en 91 palabras narradas (tesis incluida), bajo el
  reparto orientativo de 110 a 160 por noticia. No bloquea, porque ese reparto
  el prompt lo da como orientativo y el único tope duro es el total, que queda
  en 478 palabras narradas, dentro de 420 a 600. Para destrabarlo sin alargar
  de relleno estaba el hecho que la corrección 2 ofrecía y que la pieza no
  tomó: la agenda boliviana con once asuntos en discusión (Presidencia de
  Bolivia, 9 y 15 oct), o la primera visita de un presidente chileno a Bolivia
  en 70 años, que el veredicto del informe ya había anotado.
- `scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos" y
  `scripts/validar-tarjetas.js` da cuatro bloques con fuente, variedad sin
  cuotas rotas y ninguna marca malformada.
- Verificado además, por si la corrección hubiera movido algo: las tres
  [TESIS] con 15, 14 y 15 palabras y su línea en blanco detrás; las dos marcas
  [DATO cifra] con etiqueta de 5 y 6 palabras con contexto, fuente y fecha, y
  sin quedar seguidas; el [ESQUEMA] del caso Ojeda cubriendo la noticia de
  proceso; la noticia del día en 32 palabras y el cierre en 60, con la línea
  "Para salir hoy" integrada y el tagline como última frase hablada; ninguna
  sigla pintada sin expandir; y el único paréntesis del archivo es el
  indicador "(baja bien)" dentro de una marca, que el prompt permite.
- La selección sigue siendo la que manda el prompt: la portada (condena a
  Villegas, la única [A]) primera, y las dos [B] que "En una mirada" trae
  primero (Kast en La Paz y la rebaja de la CNE). Tres bloques, sin "En
  titulares", sin Dato curioso, sin Agenda y sin "¿En qué quedó?".
- La "Carátula 3" sigue siendo un segundo giro ("Primera sentencia oral /
  faltan otros juicios") y no una cifra con referencia. El prompt lo permite
  cuando no hay cifra que se entienda sola, y la única (veinte años) ya está
  en la "Carátula 2". Queda anotado por si conviene probar una tercera con
  cifra en otra edición.
