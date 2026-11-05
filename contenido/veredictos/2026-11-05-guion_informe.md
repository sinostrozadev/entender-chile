VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-05T07:57:52Z

Correcciones:
1. Dónde: el orden de los bloques de noticia. El segundo es "## Banco Central
   mantiene la tasa [economia]" (línea 27) y el tercero "## Fallos presionan la
   defensa de Rabat [congreso]" (línea 36). · Regla: QUÉ SE NARRA, "1. La
   NOTICIA DE PORTADA va siempre, y va primera. 2. Las demás [A] del informe,
   en el orden en que el informe las trae. (...) 4. Si el informe trae más de
   tres [A], narras la portada y las dos [A] siguientes en el orden del
   informe." El informe trae cuatro [A] en este orden: Junaeb (línea 14,
   portada), Rabat (línea 38), Banco Central (línea 80), demócratas (línea
   160). La vuelta anterior pedía exactamente "Junaeb (portada), Rabat y Banco
   Central"; entró el bloque de Rabat, pero quedó tercero. · Debe quedar: los
   dos bloques intercambiados, Rabat segundo y Banco Central tercero. Se mueven
   completos y sin cambiarles una palabra: el bloque de Rabat con su línea
   "##", su [FUENTE], su [TESIS], la línea en blanco que va después de la
   tesis, sus dos párrafos, su [ESQUEMA] y el párrafo que lo sigue; el del
   Banco Central igual, con su [DATO cifra] donde está. No hay que tocar nada
   más: la Apertura (línea 14) ya adelanta a Rabat primero y al Banco Central
   después, el Cierre (línea 48) ya los nombra en ese mismo orden, y la
   variedad visual se mantiene (las tarjetas quedan cifra, comparacion,
   esquema, cifra, sin dos [DATO cifra] seguidas).
2. Dónde: la lista "Fuentes:" (líneas 50 a 64), donde no aparece Radio
   Universidad de Chile, mientras la línea 45 narra "La acusación
   constitucional todavía debe ser presentada y después revisada por la
   Cámara", que en el informe es la línea 46 y viene acreditada ahí a "(Radio
   Universidad de Chile, 04 nov)". · Regla: FORMATO DE SALIDA, "Al final, bajo
   'Fuentes:', lista una línea por cada fuente de las marcas [DATO] y [CITA] Y
   por cada fuente del informe cuyas noticias narraste, tal como aparecen en el
   informe (...) una fuente cuyo contenido se narró no puede quedar sin
   crédito." · Debe quedar: una línea más en la lista, tal como la trae el
   informe en su "Fuentes consultadas" (línea 234): "- Radio Universidad de
   Chile, 04-11-2026." El resto de la lista queda igual: las altas de CIPER,
   Interferencia, El Desconcierto, Epicentro Chile y Ex-Ante corresponden a los
   párrafos de Rabat que sí se narran, y las bajas de Associated Press y Reuters
   corresponden a la noticia que salió del guion.

Observaciones:
- La corrección 2 de la vuelta anterior quedó cumplida: "La noticia del día"
  son ahora dos frases y 33 palabras narradas, dentro del rango de 25 a 35.
- "El contrato de la empresa SOSER, en la Región de O'Higgins, muestra la
  distancia más concreta" (línea 23) sigue usando un comparativo que el informe
  no trae. No bloquea, porque no afirma nada sobre una serie histórica, pero la
  regla del 10-09-2026 pide que los comparativos salgan del informe: la
  comparación se sostiene sola con sus dos cifras.
- `node scripts/revisar-mecanico.js` no encontró hallazgos.
  `node scripts/validar-tarjetas.js` avisa por la cifra exacta "9.134" de la
  línea 5, que es la Carátula 3: las carátulas no se narran, así que la regla de
  redondeo en voz no la alcanza y el aviso no pide cambio.
- El archivo quedó sin salto de línea final. El contrato de archivos no lo
  exige, así que no es hallazgo, pero conviene cerrarlo al reescribir.
- Lo demás verificado sin hallazgos en esta vuelta: 477 palabras narradas
  (rango 420 a 600), cuatro bloques con [FUENTE], tesis de 12, 13 y 14 palabras
  con su línea en blanco, el [ESQUEMA] que exige la noticia de proceso, las
  etiquetas de las tres marcas [DATO] con contexto y unidad, el árbol de tipos
  bien aplicado (pago fijo contra entregas acreditadas es comparacion y no
  cambio), la fidelidad del bloque nuevo contra el informe (líneas 40 a 46),
  cifras habladas redondeadas y en palabras, apertura de 28 palabras y cierre
  de 54 con el enlace, la línea "Para salir hoy" y el tagline, y la lista de
  fuentes sin rutas internas del sistema.
