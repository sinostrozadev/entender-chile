VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-29T22:20:12Z

Correcciones:
1. Dónde: línea 57, "Comunas de la Región Metropolitana seguían bajo alerta
   roja por riesgo de remoción en masa, con vigilancia activa y coordinación
   preventiva ante posibles nuevos eventos" · Regla: "NO agregues noticias,
   datos, opiniones ni predicciones", junto con "Usa exclusivamente el
   contenido del informe de hoy (contenido/informes/AAAA-MM-DD.md) como fuente
   informativa base" y "No rellenes para llegar al piso" · Debe quedar: la
   frase termina en "remoción en masa". El informe dice solo "Diez comunas de
   la Región Metropolitana se mantenían bajo alerta roja por riesgo de
   remoción en masa" (línea 135) y describe la respuesta como "evaluación de
   daños, apoyo municipal y actualización de alertas" (línea 139), que el
   guion ya narra en la frase siguiente. "Vigilancia activa", "coordinación
   preventiva" y "posibles nuevos eventos" no están en el informe: lo busqué
   palabra por palabra y "vigilancia", "coordinación" y "nuevos eventos" no
   aparecen en ninguna línea, y los dos "preventiva" del informe son la marea
   roja de Los Lagos y la prisión de Hermosilla. Son diez palabras agregadas
   en la vuelta que buscaba llegar al piso, que es justo lo que la regla
   prohíbe.
   Las diez palabras se recuperan donde SÍ hay material del informe sin
   narrar, y no en este bloque, que ya usa sus tres cifras habladas
   ("catorce damnificados", "doscientas trece viviendas", "una de cada
   diez"): en el bloque de portada, agrega al final del párrafo de la línea
   23 la frase del informe "La oposición cuestiona tanto la legalidad de las
   decisiones como la entrega de antecedentes a la Cámara" (línea 19 del
   informe, diecisiete palabras, sin cifras nuevas). Verificado: con esos dos
   cambios `node scripts/validar-tarjetas.js` da 433 palabras narradas, dentro
   de 420 a 600, sin avisos y sin romper ninguna cuota de variedad, y el
   bloque de portada queda en 129 palabras, el más largo de los tres, dentro
   del reparto de 110 a 160.

Observaciones:
- Para la pieza siguiente: las seis correcciones de la vuelta 1 quedaron
  resueltas y verificadas (largo, las dos etiquetas de [DATO], la ubicación de
  las 213 viviendas, la carátula 2 y el motivo en el título). Lo único que
  falta es la frase inventada de la línea 57. El bloque del sistema frontal
  tiene sus tres cifras habladas ocupadas, así que cualquier palabra que
  falte sale del bloque de portada, donde el informe todavía tiene material
  sin narrar.
- La línea 23 sigue diciendo "después de que Rabat expusiera ante la Cámara"
  sin fecha, y el informe la trae: la exposición fue el 28-10-2026 (línea 17
  del informe). No es incumplimiento, porque no se reemplazó por una
  referencia relativa, pero la apertura sitúa el jueves 29-10-2026 y el
  oyente puede entender que la exposición fue hoy.
- En el bloque de la acusación, la tarjeta de los 68, 42 y 7 votos convive con
  una [TESIS] que habla del trámite de la acusación, que es un acto distinto
  de la resolución votada. Las etiquetas dicen "pedir la renuncia", así que no
  es el caso de la regla de pantalla con dos indicadores, pero en pantalla los
  68 votos pueden leerse como votos de la acusación, que todavía no se ha
  votado.
- La "Descripción sugerida" usa "TPM" sin expandir. No la pide la regla de
  siglas, que es para lo que se pinta en pantalla, pero la descripción se lee
  sin el informe al lado.
- "Catorce damnificados" sigue sonando dos veces, en la [TESIS] de la línea 49
  y en la línea 51. Sigue siendo mejorable, pero hoy no conviene tocarlo: con
  el largo en 426 palabras, quitar la repetición baja el conteo y el piso es
  420.
