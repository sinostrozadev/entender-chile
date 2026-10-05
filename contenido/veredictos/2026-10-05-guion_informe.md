VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-05T05:52:10Z

Observaciones:
- Las seis correcciones de la vuelta 1 están resueltas, verificadas una por una
  contra el diff 0401edc..51e76fb, que toca solo esos seis puntos y nada más:
  1. Tarjeta del bloque de Presupuesto (corrección 1): la línea 98 es ahora
     "[DATO cifra | Instituto Nacional de Estadísticas, 30 sep] desocupación
     nacional, trimestre junio-agosto: 9,6% (sube mal)". Un solo valor, como
     pide la fila 7 del árbol; la etiqueta tiene cuatro palabras, dentro del
     rango de 3 a 8; el indicador "(sube mal)" es de los admitidos; la fuente
     tiene cinco palabras, bajo el tope de seis; y la [TESIS] de la línea 96
     nombra el mismo indicador que la cifra, así que la regla de pantalla con
     dos indicadores queda cumplida. El punto de alza y el 0,9% de caída
     quedaron solo en la narración de la línea 99, que era lo pedido.
  2. Marca sobrante (corrección 2): el [DATO comparacion | EL PAÍS, 28 sep] ya
     no está y los dos valores quedaron solo en el párrafo de la línea 103. EL
     PAÍS conserva su línea en "Fuentes:" (línea 181), así que la fuente narrada
     no quedó sin crédito.
  3. Redondeo de la diferencia de votos (corrección 3): la línea 22 dice ahora
     "más de dos millones doscientos mil votos", dos cifras significativas
     contra el tope de tres, y el 1,87 sigue como porcentaje con un decimal, que
     está exceptuado. Verificado contra la línea 16 del informe: la diferencia
     real es de 2.227.651 votos, así que "más de dos millones doscientos mil" es
     cierto y no cambia el sentido.
  4. Redondeo en el bloque de licencias (corrección 4): "más de siete mil
     doscientos funcionarios" (7.207), "casi veinte mil casos" (19.963) y "Más
     de cuatro mil quinientas personas" (4.522), los tres dentro del tope y los
     tres fieles a las líneas 58 y 64 del informe. Las cifras exactas siguen en
     las marcas de las líneas 84 y 87, que son las que van a pantalla.
  5. Años en palabras (corrección 5): la [TESIS] de la línea 96 queda en quince
     palabras, el titular de la línea 130 en nueve y el de Carabineros, línea
     127, en once sin el año. Recontados los tres en esta corrida. No quedan
     dígitos en ninguna línea narrada: búsqueda explícita de [0-9] sobre las
     líneas 8 a 156 excluyendo las marcas, cero coincidencias.
  6. Etiquetas con contexto (corrección 6): las cuatro quedaron entre cuatro y
     siete palabras ("votos válidos de la elección presidencial",
     "imputados que permanecen recluidos", "funcionarios detectados de viaje con
     licencia" y "Programa de Asentamientos Precarios, 2026 a 2027"). El rango
     de esta última va con "a", como manda el estilo tipográfico, y no con raya.
- Las etiquetas de las dos tarjetas `comparacion` que no toqué en la vuelta 1
  (línea 21, "Flávio Bolsonaro" y "Lula"; línea 55, "prisión preventiva") tienen
  una o dos palabras. No las convierto en INCUMPLE ahora, y no solo por la regla
  de convergencia: el propio prompt ilustra `comparacion` con etiquetas de una
  palabra ("fallecidos: 797 ; desaparecidos: 3048"), así que el piso de tres
  palabras se lee escrito para la etiqueta única de una tarjeta `cifra` y no para
  los dos lados de una comparación. Si Santiago quiere que también rijan ahí, el
  lugar de arreglarlo es el prompt y no el veredicto.
- "La noticia del día" tiene 40 palabras contadas (once de la [TESIS] narrada y
  veintinueve del párrafo) contra las "25 a 35" del punto 1 de la estructura. No
  lo marco: la parte no cambió en esta vuelta y en la vuelta 1 no la marqué. Vale
  decir igual que el tope se mide mal cuando los números van en palabras, porque
  "47,03%" y "45,16%" se cuentan como dieciséis palabras entre los dos. Sin ellos
  el bloque son veinticuatro. Conviene resolverlo en el prompt, diciendo si el
  tope se mide sobre los números hablados o sobre el texto sin ellos.
- La apertura sigue en 43 palabras contra las "unas 40". Era observación en la
  vuelta 1 y queda igual.
- Siguen en pie las observaciones de la vuelta 1 que la corrección no tocaba,
  porque no bloqueaban: la Carátula 2 repite la segunda línea de la Carátula
  sugerida ("Brasil vota de nuevo") y le resta valor a la prueba A/B; la Carátula
  3 apoya el gancho en un decimal de puntos porcentuales que no se entiende en un
  segundo sin contexto; la tarjeta de la línea 21 encabeza un párrafo que narra
  totales de votos y no esos porcentajes; el cierre termina en "con efectos
  todavía en desarrollo"; y el desalojo de Lo Barnechea quedó en `regiones`
  cuando en el informe va bajo Seguridad y Justicia y ocurre en la Región
  Metropolitana.

Verificado en esta corrida, además de las seis correcciones: sin rayas largas ni
medias en el archivo completo (búsqueda explícita de los dos caracteres, cero
coincidencias); las once [TESIS] bajo dieciocho palabras, la mayor con quince, y
todas con línea en blanco después, comprobado línea por línea; los 23 titulares
bajo doce palabras, el mayor con once, cada uno en su propia línea y con la
entrada "Y en titulares:" sola en la suya; las diez tarjetas [DATO] con fuente y
fecha, con tres tipos distintos (cuatro cifra, tres cambio y tres comparacion),
nunca más de dos cifra seguidas, nunca dos del mismo tipo seguidas dentro de un
bloque, y dos [ESQUEMA] para las dos noticias de proceso del día, de modo que la
cuota de variedad de las nueve noticias narradas se cumple; cada bloque de
noticia con su [FUENTE]; la ruta es la del contrato
(contenido/guiones/informe/2026-10-05.md) y el commit 51e76fb lleva encabezado
"edición 2026-10-05: guion informe", cuerpo con "Tarea: despachador" y un solo
archivo, el de hoy.
