VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-06T06:34:20Z

Observaciones:
- Las seis correcciones de la vuelta 1 están resueltas y ninguna introdujo un
  incumplimiento nuevo. Verificado línea por línea sobre el diff de la versión
  corregida, que toca solo las seis líneas corregidas y ninguna otra:
  1. Bloque de Codelco, tres cifras habladas contadas: "veinticuatro mil
     toneladas", "dieciocho mil cien" y "unos dos mil doscientos veinte
     dólares" (los años quedan fuera de la cuenta por la excepción de la regla
     de redondeo). Los catorce millones de dólares y las seis mil trescientas
     personas salieron de la voz.
  2. Bloque de Rabat, tres cifras habladas contando la de la [TESIS]: "Seis
     fallos", "nueve solicitudes" y "ciento quince casos". La frase de los seis
     rechazos y los tres beneficios se borró de la línea 35 y los ciento
     cincuenta decretos pasaron a la etiqueta de la línea 37.
  3. La atribución de la línea 23 quedó "El desglose que informó el presidente
     del directorio", que es lo que dice la línea 16 del informe.
  4. La etiqueta de la línea 25 quedó "bono promedio por receptor de los US$14
     millones" (ocho palabras, contadas), con los US$14 millones y los US$2.220
     que el informe trae en sus líneas 20 y 22.
  5. La etiqueta de la línea 34 nombra las rebajas de condena en sus dos
     rótulos (ocho y siete palabras, contadas), y cada valor conserva su propio
     rótulo, así que la tarjeta se pinta como lista y no como flecha.
  6. La etiqueta de la línea 37 quedó "rebajas de pena a extranjeros, de 150
     decretos" (ocho palabras, contadas), que es la materia que el informe
     describe en su línea 42.
- Verificado también en esta corrida, sobre la versión corregida:
  `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos";
  `node scripts/validar-tarjetas.js` cuenta 460 palabras narradas (rango 420 a
  600, unos 3,4 minutos), cuatro bloques con fuente y variedad sin cuota rota;
  siguen siendo tres bloques de noticia, con la portada de Codelco primera y
  Rabat y Paraguay en el orden del informe; cada marca [DATO] va justo antes
  del párrafo que narra su cifra, salvo la comparación de la línea 34, cuyo
  valor hablado es el de la [TESIS] inmediatamente anterior, que sí se narra;
  ninguna cadena de más de dos [DATO cifra] seguidas y ningún par del mismo
  tipo seguido dentro de un bloque; la cifra grande de "La noticia del día"
  (42.100 toneladas) es la del título; cero rayas largas o medias.
- La Carátula 3, "42.100 toneladas / Registro artificial", sigue sin nombrar el
  cobre ni a Codelco en ninguna de sus dos líneas. No bloquea, por lo mismo que
  en la vuelta 1 (el título sí nombra a Codelco y "Registro artificial" es el
  hecho con las palabras del informe), pero es la que conviene mirar si alguna
  vez sale al aire en la prueba A/B.
- La etiqueta de la línea 11, "producción registrada artificialmente", cumple
  con tres palabras y ganaría con el período que el informe fija en su línea
  16: "producción registrada artificialmente en 2024 y 2025" (siete palabras).
- Quedan en pie las observaciones del veredicto del informe que el guion
  respetó: no narra monto de fondos previsionales chilenos expuestos, no nombra
  al superintendente de Pensiones, usa el 28-10-2026 para la comparecencia de
  Rabat, no narra el simulacro de Senapred como ocurrido y no repite el cambio
  de gabinete.
