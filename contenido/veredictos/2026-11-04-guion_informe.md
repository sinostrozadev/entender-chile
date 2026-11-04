VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-04T06:45:00Z

Observaciones:
- Para la pieza siguiente: la cadena diaria no tiene pieza después de esta.
  Con esta aprobación corresponde el veredicto final del día.
- Las seis correcciones de la vuelta 1 quedaron cumplidas y verificadas contra
  el diff del commit b77b588, que toca seis líneas y nada más. Una por una:
  la 1 y la 2, las cifras habladas quedaron en tres cifras significativas con
  atenuante ("más de trescientas cincuenta y nueve mil personas" en la línea
  23, "más de nueve mil seiscientos inmuebles" en la línea 43), y las exactas
  siguen en las marcas [DATO] de las líneas 22 y 42; la 3, el bloque de los
  fondos bajó a tres cifras habladas (siete coma seis por ciento y cuatro coma
  siete por ciento en la línea 20, más la de la línea 23), con el repunte de
  octubre narrado sin números y sin agregar una segunda tarjeta del mismo tipo;
  la 4, el bloque de inmuebles fiscales también quedó en tres (nueve mil
  seiscientos, cuatrocientos cincuenta y un mil millones de pesos y ochenta y
  nueve propiedades), y la línea 48 pasó a narrar el seguimiento, las
  fiscalizaciones y los eventuales procedimientos disciplinarios del informe
  (línea 86), con el plazo viajando en la [TESIS] de la línea 40; la 5 y la 6
  tomaron las dos redacciones propuestas, "Fondos D y E / Subieron, siguen en
  rojo" y "445.703 personas / Ya jubilados o cerca", las dos con cuatro
  palabras por línea como tope y con el objeto de la noticia en una de ellas.
- Verificado que la corrección no rompió nada de lo que ya estaba bien: la
  selección sigue siendo portada primero y las dos [A] siguientes en el orden
  del informe (el Senado de Estados Unidos queda en la web), el largo narrado
  bajó a 469 palabras y sigue dentro de 420 a 600, las tres [TESIS] están bajo
  las 18 palabras con su línea en blanco detrás, el cierre tiene 47 palabras
  con la línea "Para salir hoy" integrada y el tagline exacto al final, el
  [ESQUEMA] del caso judicial sigue en su lugar y la lista de "Fuentes:" no
  cuela ningún archivo interno. `node scripts/revisar-mecanico.js` imprime
  "sin hallazgos mecánicos": ninguna referencia temporal relativa.
- Fidelidad de las líneas tocadas, verificada contra el informe: el repunte sin
  cifras calza con su línea 16; "los organismos centralizados" calza con su
  línea 82; el párrafo nuevo de la línea 48 es el hecho de su línea 86; y
  "las AFP" sin el "siete" no cambia ninguna afirmación (el número sigue en la
  descripción sugerida y en el informe de la web).
- `node scripts/validar-tarjetas.js` marca un aviso en la línea 5 por la cifra
  exacta "445.703" de la carátula 3. No es incumplimiento y no se cobró: la
  REGLA DE REDONDEO EN VOZ rige el texto narrado, y el prompt dice de las tres
  carátulas que "ninguna se narra", además de pedir que la tercera sea "una
  CIFRA CON REFERENCIA" y de traer "Rachas de 90 km/h" como ejemplo propio. El
  script lee las líneas de carátula como voz: queda anotado para que el aviso
  no se confunda con un hallazgo.
- La tarjeta [DATO comparacion] de la línea 22 lleva dos valores y, después de
  la corrección 3, el párrafo que la sigue narra solo el primero: los 85.996
  pensionados por retiro programado aparecen como grupo, sin su número. Es el
  efecto buscado (bajar las cifras habladas) y no incumple, porque el párrafo
  sí menciona a los dos grupos de la tarjeta. Material para el prompt, no para
  una vuelta: el tope de tres cifras por bloque y el "va justo antes del
  párrafo que menciona esos números" se tensionan cuando la tarjeta trae dos.
- Siguen en pie, sin corrección, los tres choques ya anotados en la vuelta 1:
  "La noticia del día" lleva una sola marca y sus dos frases no narran las
  cifras de esa tarjeta; "CIPER" se pinta en las [FUENTE] y en el [DATO] sin
  quedar expandida antes (el tope de seis palabras de esas marcas no deja); y
  el cierre repite literal "El informe completo está en el enlace de la
  descripción", igual que el 02-11-2026, mientras la apertura vuelve a abrir
  con "Este <día> <fecha>" como el 03-11-2026, contra el "con tus palabras y
  con variaciones entre días" del punto 8 y el "la formulación debe variar de
  un día a otro" del punto 2. Las dos repeticiones son leves y el resto del
  cierre y de la apertura sí cambia.
- El informe trae en su línea 16 la base vigente que la pieza no usó: al cierre
  de septiembre las bajas acumuladas eran 10,39% en el Fondo E y 6,38% en el D.
  Es contra eso que se mide el repunte y daría un [DATO cambio], el único tipo
  que la edición no usa. No lo exige el prompt, y ahora que el bloque está
  justo en el tope de tres cifras habladas, entrar ese dato pide sacar otro.
