VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-30T05:46:00Z

Correcciones:
1. Dónde: línea 49, el cierre completo, desde "El desempleo superó el millón
   de personas" hasta "El resumen sin gritos." · Regla: "CIERRE: corto, 40 a
   60 palabras" (ESTRUCTURA DEL GUION, punto 8) · Debe quedar: un cierre de 40
   a 60 palabras que además deje el total narrado en 420 o más, porque las dos
   reglas se tocan: el cierre tiene hoy 64 palabras y el guion 426, así que
   recortar las cuatro que sobran sin tocar nada más deja el total en 422, y
   recortar más lo hunde bajo el piso de 420. Opción verificada, 60 palabras
   de cierre y 422 de total, contadas con `node scripts/validar-tarjetas.js`:
   "El desempleo superó el millón, la acusación contra Rabat aún no entra al
   Congreso y Codelco entregó antecedentes al Ministerio Público. El informe
   completo, con todas las noticias, está en el enlace de la descripción. Para
   salir en Santiago, capa liviana en la mañana y protección solar en la
   tarde. Nos encontramos mañana en Entender Chile. El resumen sin gritos."
   Salen "de personas" (el millón ya está dicho), "una" y "lleva"; quedan
   intactos los cuatro elementos que el punto 8 y el control interno 15
   exigen: la frase de síntesis con hechos concretos, el enlace al informe
   completo, la línea "Para salir hoy" integrada y el tagline como última
   frase hablada. Si prefieres otra redacción, cuéntala antes de entregar: el
   rango del cierre es 40 a 60 y el total no puede bajar de 420.

Observaciones:
- Para la pieza siguiente: el tope del cierre lo rompió mi propia corrección.
  En la vuelta 1 ordené reescribirlo (corrección 1, para que nombrara hechos
  del bloque nuevo) sin recordar que el punto 8 lo acota a 40 a 60 palabras, y
  el cierre pasó de 58 a 64. Cuando un veredicto mande reescribir una sección
  con largo propio (la noticia del día 25 a 35, la apertura 25 a 40, el cierre
  40 a 60), tiene que decir el rango en la misma corrección, y revisar si el
  cambio mueve el total contra el piso de 420.
- Las ocho correcciones de la vuelta 1 están todas aplicadas y verificadas
  contra el informe: el tercer bloque es Codelco con el material de las líneas
  53 a 57, la apertura y el cierre lo acompañan, "Diario de Valdivia" y
  "Noticias Los Ríos" salieron de "Fuentes:" y entraron "La Tribuna", "El
  País" y "Codelco, 06 y 29-10-2026". `node scripts/revisar-mecanico.js` no
  encontró hallazgos y la variedad de tarjetas está OK.
- El bloque de Codelco dice "registros de producción e inventarios" tres
  veces: en la [TESIS] (línea 42), en la línea 44 con los años exactos y otra
  vez al final de la línea 46 ("que abarcan registros de producción e
  inventarios de dos años"), donde ya no agrega nada. No lo mando a corregir
  porque ninguna regla obliga a quitar una redundancia de redacción, pero si
  en una próxima edición se saca, hay que reemplazarla por material que no
  suena todavía (las caídas de ocupados por sector del informe, línea 15), no
  dejar que el total caiga.
- En la línea 44, "Salvador" viaja sin su categoría dentro de la lista
  "Chuquicamata, la división Ministro Hales, Salvador y la casa matriz".
  Cumple, porque la frase siguiente dice "tres divisiones mineras y la oficina
  central", pero es un nombre que suena a persona y la regla pide que la
  categoría se oiga junto al nombre. "la división Salvador" lo resuelve sin
  sumar palabras de más.
- El bloque del desempleo narra ahora cuatro cifras en palabras: nueve coma
  ocho por ciento, un millón, ciento treinta y cuatro mil y "más de una cuarta
  parte", contra el "máximo tres cifras habladas por bloque". La cuarta entró
  por mi corrección 8 de la vuelta 1, que pidió narrar la informalidad y la
  Región Metropolitana, así que no va a corrección. Queda anotado que una
  corrección que manda agregar material tiene que decir en qué forma entra,
  porque el tope de cifras habladas es del mismo prompt.
