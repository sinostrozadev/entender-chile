VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-06T06:27:34Z

Correcciones:
1. Dónde: líneas 23 y 26 del bloque "## Producción artificial en Codelco
   [economia]", que narran cinco cifras: "veinticuatro mil toneladas",
   "dieciocho mil cien", "más de catorce millones de dólares", "cerca de seis
   mil trescientas personas" y "unos dos mil doscientos veinte dólares" ·
   Regla: "Cifras: narra las que sostienen la idea de cada noticia, máximo
   tres cifras habladas por bloque. Las demás pueden ir en una marca [DATO]
   para que aparezcan en pantalla." · Debe quedar: tres cifras habladas como
   máximo en ese bloque. Ruta verificada: conservar "veinticuatro mil
   toneladas", "dieciocho mil cien" y "unos dos mil doscientos veinte dólares"
   (la escala humana de la línea 22 del informe, que el prompt pide narrar) y
   sacar de la voz los catorce millones de dólares y las seis mil trescientas
   personas, que pasan a la etiqueta de la marca [DATO cifra | Ex-Ante, 05
   nov]. Por ejemplo, la línea 26 queda: "Ese registro también activó bonos
   entre trabajadores y ejecutivos. Repartido entre todos los receptores, el
   promedio llega a unos dos mil doscientos veinte dólares, y el pago real
   pudo variar según el cargo y la división." (una cifra hablada, contada).
2. Dónde: líneas 32, 35 y 38 del bloque "## Fallos contradicen la explicación
   de Rabat [congreso]": la [TESIS], que sí se narra, dice "Seis fallos", y el
   cuerpo narra "nueve solicitudes", "Seis rechazos", "tres beneficios",
   "ciento cincuenta decretos" y "ciento quince casos" · Regla: la misma,
   "máximo tres cifras habladas por bloque" · Debe quedar: tres cifras
   habladas como máximo, contando la de la [TESIS]. Ruta verificada:
   conservar "Seis fallos" en la tesis, "nueve solicitudes" en la línea 35 y
   "ciento quince casos" en la línea 38; borrar de la línea 35 la frase "Seis
   rechazos fueron confirmados y tres beneficios fueron concedidos", porque
   esos dos valores ya van a pantalla en la marca [DATO comparacion | CIPER,
   05 nov]; y llevar los ciento cincuenta decretos a la etiqueta de la marca
   [DATO cifra | Interferencia, 05 nov], como pide la corrección 6.
3. Dónde: línea 23, "La estimación presentada al directorio separa
   veinticuatro mil toneladas en dos mil veinticuatro y dieciocho mil cien en
   dos mil veinticinco." · Regla: "FIDELIDAD TOTAL AL INFORME ... Usa
   exclusivamente el contenido del informe de hoy
   (contenido/informes/AAAA-MM-DD.md) como fuente informativa base" y "NO
   agregues noticias, datos, opiniones ni predicciones" · Debe quedar: la
   atribución que trae el informe en su línea 16, donde la estimación la
   conoció la junta extraordinaria de accionistas de Codelco y el desglose lo
   informó el presidente del directorio, Bernardo Fontaine. El informe no dice
   en ninguna línea que la estimación se presentara al directorio. Sirve "El
   desglose que informó el presidente del directorio separa veinticuatro mil
   toneladas en dos mil veinticuatro y dieciocho mil cien en dos mil
   veinticinco", o "La estimación que conoció la junta de accionistas separa"
   con el mismo resto de la frase.
4. Dónde: línea 25, "[DATO cifra | Ex-Ante, 05 nov] promedio estimado por
   receptor: US$2220" · Regla: "ETIQUETA CON CONTEXTO (obligatorio): la
   etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de
   modo que la tarjeta se entienda con el video en silencio: 'sin cobrar a
   becarios que incumplieron', no 'monto'" · Debe quedar: una etiqueta que
   diga que la cifra es el bono promedio, porque "promedio estimado por
   receptor" no dice receptor de qué y la tarjeta se ve sin la voz. Sirve
   "bono promedio por receptor del registro artificial" (siete palabras,
   contadas), y si entran los catorce millones que salen de la voz en la
   corrección 1, "bono promedio por receptor de los US$14 millones" (ocho
   palabras, contadas).
5. Dónde: línea 34, "[DATO comparacion | CIPER, 05 nov] rechazos confirmados
   por tribunales: 6 casos ; beneficios concedidos por Suprema: 3 casos" ·
   Regla: la misma ETIQUETA CON CONTEXTO, con su ejemplo "'cupos de
   bonificación a la contratación', no 'cupos'" · Debe quedar: los dos rótulos
   dicen de qué son el rechazo y el beneficio, porque la tarjeta no nombra en
   ninguna parte las rebajas de condena y queda un conteo de casos sin materia.
   Sirve "rechazos de rebajas de condena confirmados por tribunales: 6 casos ;
   rebajas de condena concedidas por la Suprema: 3 casos" (ocho y siete
   palabras, contadas).
6. Dónde: línea 37, "[DATO cifra | Interferencia, 05 nov] beneficios
   concedidos a extranjeros: 115 casos" · Regla: la misma ETIQUETA CON
   CONTEXTO · Debe quedar: la etiqueta dice que el beneficio es una rebaja de
   pena, que es lo que el informe describe en su línea 42. Sirve "rebajas de
   pena a extranjeros, de 150 decretos" (ocho palabras, contadas), que además
   recoge la base que sale de la narración en la corrección 2.

Observaciones:
- Para la pieza siguiente: las dos correcciones de cifras habladas nacieron de
  narrar el total, su desglose y su promedio en el mismo bloque. El guion del
  05-11-2026 pasó con tres cifras en el bloque de portada y dos en los otros
  dos; ese es el techo que conviene contar antes de entregar, bloque por
  bloque y contando la [TESIS], que se narra.
- La Carátula 3, "42.100 toneladas / Registro artificial", no nombra el cobre
  ni a Codelco en ninguna de sus dos líneas. No bloquea, porque "Registro
  artificial" es el hecho con las palabras del informe y el título sí nombra a
  Codelco, pero la regla del 23-10-2026 pide que el gancho traiga el objeto de
  la noticia, y "42.100 toneladas" sola no dice de qué son.
- La etiqueta de la línea 11, "producción registrada artificialmente", cumple
  con tres palabras y ganaría con el período que el informe fija en su línea
  16: "producción registrada artificialmente en 2024 y 2025" (siete palabras).
- Verificado en esta corrida y sin hallazgo: la selección es la que manda el
  punto 4 de QUÉ SE NARRA, con la portada de Codelco (línea 14 del informe) y
  las dos [A] siguientes en el orden del informe, Rabat (línea 36) y Paraguay
  (línea 86), mientras los relaves del río Blanco (línea 126) quedan en la
  web; tres bloques de noticia y ninguna de las secciones que el formato corto
  retiró; `node scripts/revisar-mecanico.js` imprime "sin hallazgos
  mecánicos"; `node scripts/validar-tarjetas.js` cuenta 480 palabras narradas
  (rango 420 a 600), cuatro bloques con fuente y variedad sin cuota rota;
  "Es viernes seis de noviembre" es correcto, el 06-11-2026 cae viernes; las
  tres [TESIS] tienen 13, 13 y 16 palabras y cada una conserva su línea en
  blanco antes del párrafo narrado; el tipo de cada marca calza con el árbol
  (cambio para el desglose 2024 contra 2025, comparacion para los seis
  rechazos contra los tres beneficios); el [ESQUEMA] de la acusación
  constitucional cubre la noticia de proceso; el cierre tiene 55 palabras,
  integra "Para salir hoy" y termina en el tagline exacto; cero rayas, cero
  paréntesis y cero conectores de ensayo escrito; y la lista de "Fuentes:" no
  arrastró contenido/casos/hitos.md, que el informe sí trae en su línea 194.
- Las observaciones del veredicto del informe quedaron respetadas: el guion no
  narra un monto de fondos previsionales chilenos expuestos, no nombra al
  superintendente de Pensiones, usa el 28-10-2026 para la comparecencia de
  Rabat y no narra el cambio de gabinete dos veces.
