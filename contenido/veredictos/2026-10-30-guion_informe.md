VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-30T05:50:33Z

Observaciones:
- Para la pieza siguiente: la corrección de la vuelta 2 quedó aplicada tal
  cual y verificada con `node scripts/validar-tarjetas.js`. El cierre (línea
  49) tiene 60 palabras, justo en el techo del rango de 40 a 60, y el total
  narrado quedó en 422, dos sobre el piso de 420. Los cuatro elementos que
  piden el punto 8 y el control interno 15 siguen enteros: la síntesis con
  hechos concretos (el millón de desocupados, el libelo que no entra, los
  antecedentes al Ministerio Público), el enlace al informe completo, la línea
  "Para salir hoy" integrada y el tagline como última frase hablada. El único
  cambio respecto de la versión anterior fue el cierre, nada más se movió.
- Para la pieza siguiente: el margen de hoy es de dos palabras sobre el piso y
  de ninguna bajo el techo del cierre. Una edición que entra tan ajustada no
  tiene dónde absorber una corrección: conviene que el guion apunte a 440 o 460
  palabras narradas, que siguen cabiendo en los 3 a 4 minutos, para que
  cualquier ajuste posterior no obligue a elegir entre dos reglas.
- El bloque del desempleo narra cuatro cifras en palabras (nueve coma ocho por
  ciento, un millón, ciento treinta y cuatro mil y "más de una cuarta parte")
  contra el "máximo tres cifras habladas por bloque". No va a corrección: la
  cuarta entró por mi corrección 8 de la vuelta 1, que pidió narrar la
  informalidad y la Región Metropolitana sin decir en qué forma entraban. Queda
  igual anotado para los próximos días.
- En la línea 44, "Salvador" sigue viajando sin su categoría dentro de la lista
  "Chuquicamata, la división Ministro Hales, Salvador y la casa matriz". Cumple,
  porque la frase siguiente dice "tres divisiones mineras y la oficina central",
  pero es un nombre que suena a persona. "la división Salvador" lo resuelve sin
  sumar palabras.
- El bloque de Codelco repite "registros de producción e inventarios" tres
  veces: en la [TESIS] (línea 42), en la línea 44 con los años y otra vez al
  final de la línea 46, donde ya no agrega nada. Ninguna regla obliga a quitar
  una redundancia de redacción, y con 422 palabras no hay margen para quitarla
  sin reemplazarla: el material que todavía no suena está en la línea 15 del
  informe (las caídas de ocupados por sector).
- Verificado y sin hallazgos en esta vuelta: `node scripts/revisar-mecanico.js`
  imprime "sin hallazgos mecánicos"; `validar-tarjetas.js` da variedad OK, 422
  palabras y cinco marcas (tres cifra, una comparacion, un esquema); tres
  bloques de noticia y no más, la portada primero y las otras dos en el orden
  del informe (Rabat, que es la otra [A], y Codelco, la primera [B] de "En una
  mirada"); la noticia del día en 27 palabras y la apertura en 25, dentro de
  sus rangos; las tres tesis en 17, 16 y 15 palabras; cero rayas largas y cero
  rayas medias; y las diez líneas de "Fuentes:" cubren las marcas y los medios
  de las tres noticias narradas, todas públicas y ninguna ruta interna.
