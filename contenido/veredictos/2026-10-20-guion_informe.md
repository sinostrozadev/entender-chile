VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-20T05:56:35Z

Observaciones:
- Para la pieza siguiente: la tercera carátula vuelve a ser dos cifras sin
  referencia ("Diez comunas, / tres perímetros"), igual que el 19-10-2026
  ("Siete regiones, / diez comunas sin clases"). Cumple el formato y no
  bloquea, pero el prompt pide para la tercera "una CIFRA CON REFERENCIA (solo
  si la cifra se entiende en un segundo sin contexto)", y "tres perímetros" no
  se entiende solo. Es un patrón de dos días: conviene cortarlo con una
  referencia del tipo "Diez comunas, / ¿la tuya entre ellas?".
- Para la pieza siguiente: la marca de la línea 30 lleva "[FUENTE Cámara de
  Diputadas y Diputados, 19 oct]", siete palabras contra el tope de seis del
  formato legible. Se toma tal cual del informe y es el nombre oficial de la
  institución, y hay precedentes aprobados más largos, así que no bloquea.
  "Cámara de Diputados, 19 oct" lo deja en cuatro.
- Para la pieza siguiente: la fórmula de cautela "X no es lo mismo que Y"
  aparece cinco veces (líneas 25, 27, 33, 45 y 48). Las cinco son consecuencias
  concretas sostenidas por el informe y ninguna incumple el prompt del guion,
  pero con tres noticias la repetición se escucha mucho más que con diez.
- Las dos correcciones de la vuelta 1 quedaron resueltas y el diff contra la
  versión anterior toca solo esas dos líneas, ninguna otra. La línea 13 dice
  ahora "Las clases del veinte de octubre se suspendieron allí", que es la
  fecha exacta del informe ("suspendió las clases del 20-10-2026 en las diez
  comunas bajo alerta") y queda consistente con la apertura de la línea 16;
  contadas una por una, "La noticia del día" tiene 29 palabras narradas en dos
  frases, dentro del rango de 25 a 35. La línea 39 dice ahora "Quedó en la
  Comisión de Derechos Humanos de la Cámara, donde seguirá la discusión
  legislativa", que ya no nombra el documento interno, es fiel al informe
  (líneas 27 y 29: "La iniciativa quedó radicada en la Comisión de Derechos
  Humanos de la Cámara" y "El próximo paso es la discusión legislativa en la
  Cámara"), cierra el bloque con un hecho concreto y de paso saca la ausencia
  narrada que traía la versión anterior.
- Lo verificado en la vuelta 1 sigue en pie, porque el resto del archivo no
  cambió: la selección es exacta (portada primera y las otras dos [A] en el
  orden del informe, sin "En titulares", Dato curioso, Agenda ni "¿En qué
  quedó?"); las cuatro etiquetas de las marcas [DATO] dicen qué es la cifra y
  en qué situación; los dos [DATO cambio] se miden contra la base vigente
  (once integrantes y tres años); las cuatro [TESIS] están bajo las 18
  palabras y con su línea en blanco; los dos [ESQUEMA] corresponden a los dos
  trámites legislativos; las ocho líneas de "Fuentes:" cubren las marcas y las
  fuentes narradas y ninguna nombra un archivo interno del repo; y la
  fidelidad al informe cierra en las diez comunas, los tres polígonos, el
  llamado de Máximo Pavez antes de las 10:00 del 20-10-2026, los 128 votos a
  favor y once en contra, el Consejo de once a cinco y la prohibición de
  reingreso de tres a cinco años. Sobre esta versión
  `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos" y
  `node scripts/validar-tarjetas.js` da 518 palabras narradas, dentro del
  rango de 420 a 600, con variedad OK.
