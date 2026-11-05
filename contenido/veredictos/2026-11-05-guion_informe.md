VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-05T07:51:10Z

Correcciones:
1. Dónde: el tercer bloque del guion, "## Demócratas controlan el Congreso
   [internacional]" (línea 36), narrado mientras la [A] "Rabat queda bajo
   presión por los fallos que contradicen su defensa" (informe, línea 38) no
   suena en ninguna parte. · Regla: QUÉ SE NARRA, "1. La NOTICIA DE PORTADA va
   siempre, y va primera. 2. Las demás [A] del informe, en el orden en que el
   informe las trae. (...) 4. Si el informe trae más de tres [A], narras la
   portada y las dos [A] siguientes en el orden del informe; las otras [A]
   quedan en la web." El informe trae cuatro [A], en este orden: Junaeb
   (línea 14, portada), Rabat (línea 38), Banco Central (línea 80), demócratas
   (línea 160). · Debe quedar: tres bloques de noticia en este orden, Junaeb
   (portada), Rabat y Banco Central, y la elección de Estados Unidos fuera del
   guion narrado, viva solo en el informe de la web. El bloque de Rabat lleva
   su categoría entre corchetes (una de las doce de la lista), su [FUENTE] del
   informe y su [TESIS] de 18 palabras o menos, y por ser una noticia de
   proceso (la acusación constitucional se presenta y después la revisa la
   Cámara, informe línea 46) sostiene el [ESQUEMA] obligatorio que hoy está en
   el bloque que sale. Que el caso incluya rebajas de condena por delitos
   sexuales contra menores no lo saca del guion: va en contexto estrictamente
   informativo y con lenguaje sobrio, como manda APTITUD PARA ANUNCIANTES, sin
   detalles morbosos y sin atribuir responsabilidad penal que el informe no
   afirma. Con el cambio de bloques se rehacen las tres piezas que dependen de
   ellos: la Apertura (línea 14), que adelanta las OTRAS DOS noticias y hoy
   anuncia la de Estados Unidos; el Cierre (línea 49), cuya frase de síntesis
   nombra las tres; y la "Descripción sugerida" (línea 2), donde Rabat deja de
   ser una noticia de la edición completa y la frase final nombra otras dos o
   tres del día que no se narran (por ejemplo el Presupuesto 2027, los
   militares bolivianos detenidos y el sistema frontal del centro sur).
2. Dónde: "## La noticia del día", línea 11: "Contraloría volvió sobre los
   contratos de alimentación de la Junta Nacional de Auxilio Escolar y Becas,
   Junaeb: detectó pagos sin ajuste, sobrepagos y más de nueve mil millones de
   pesos en multas pendientes." Es una sola frase narrada. · Regla: ESTRUCTURA
   DEL GUION, punto 1: "Dos frases, 25 a 35 palabras en total, con su [TESIS] o
   su [DATO] principal como tarjeta (una sola marca) y su [FUENTE]." · Debe
   quedar: dos frases, sin salir del rango de palabras. Basta cortar en el
   punto: "Contraloría volvió sobre los contratos de alimentación de la Junta
   Nacional de Auxilio Escolar y Becas, Junaeb. Detectó pagos sin ajuste,
   sobrepagos y más de nueve mil millones de pesos en multas pendientes." (33
   palabras, contadas una por una, dentro del rango de 25 a 35).

Observaciones:
- Para la pieza siguiente: la observación "Para la pieza siguiente" del
  veredicto del informe de hoy (contenido/veredictos/2026-11-05-informe.md,
  líneas 8 a 13) propuso narrar el Banco Central y la elección de Estados
  Unidos por traer "cifra propia y próximo paso con fecha". Ese criterio no
  existe en el prompt y una observación nunca manda sobre un requisito: la
  selección de QUÉ SE NARRA es mecánica y la da el orden de las [A] en el
  informe. La observación quedó mal formulada y el guion la siguió; el prompt
  es lo que se cumple.
- "El contrato de la empresa SOSER, en la Región de O'Higgins, muestra la
  distancia más concreta" (línea 23) usa un comparativo que el informe no
  trae. No bloquea, porque no afirma nada sobre una serie histórica, pero la
  regla del 10-09-2026 pide que los comparativos salgan del informe: la
  comparación se sostiene sola con sus dos cifras.
- `node scripts/validar-tarjetas.js` avisa por la cifra exacta "9.134" de la
  línea 5. Esa línea es la Carátula 3 y las carátulas no se narran, así que la
  regla de redondeo en voz no la alcanza: el aviso no pide cambio.
- Lo demás verificado sin hallazgos: 454 palabras narradas (rango 420 a 600),
  cuatro bloques con [FUENTE], tesis de 12, 13 y 16 palabras con su línea en
  blanco, etiquetas de las cuatro marcas [DATO] con contexto y unidad, árbol de
  tipos bien aplicado (la comparación de porciones no es un cambio en el
  tiempo), cifras habladas redondeadas y en palabras, cierre con el enlace, la
  línea "Para salir hoy" y el tagline, y la lista de fuentes sin rutas internas
  del sistema, con el reemplazo correcto de `contenido/casos/hitos.md` por los
  organismos públicos.
