VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-14T06:09:11Z

Observaciones:
- Para la pieza siguiente: el informe nombra la fuente como "Cámara de
  Diputadas y Diputados", que con la fecha suma siete palabras y no cabe en el
  tope de seis de la marca, así que el guion la pinta en pantalla como "Cámara
  de Diputadas" (líneas 35 y 38), que no es el nombre de la institución. Lo
  mismo con "Delegación Los Lagos" (líneas 13, 23 y 26) por "Delegación
  Presidencial Regional de Los Lagos". Sigue sin resolverse desde la vuelta 1:
  conviene fijar en el prompt la forma corta que se pinta, porque hoy la
  decide cada edición.
- Para la pieza siguiente: la [TESIS] de "La noticia del día" quedó en
  "Camioneros siguen movilizados y el Gobierno anuncia fuerza", 58 caracteres.
  El informe habla de "intervención policial" y el propio título del guion
  usa "intervención": "Camioneros siguen movilizados y el Gobierno anuncia
  intervención" mide 64 y cabe en el tope de 66. No va a corrección porque un
  despeje de Carabineros es uso de fuerza, pero esa tesis es, literal, el
  título del Short del día.
- La línea 32 vuelve sobre el anuncio de Arrau que ya dio "La noticia del día"
  en la línea 16, con otras palabras pero el mismo hecho ("Carabineros actuará
  donde se impida el tránsito" y "Carabineros intervendrá si los cortes
  impiden circular"). No es repetición literal, así que no bloquea, pero el
  primer bloque debería continuar con el detalle y el antecedente, no con la
  misma frase. Se observó igual en la vuelta 1 y la corrección no la tocó.
- Las seis correcciones de la vuelta 1 quedaron resueltas, una por una y
  contra el diff de 71d9fb5 a 1bf7005: la [TESIS] del primer bloque atribuye
  ahora el anuncio al Gobierno y conserva el "al menos" (línea 24, 108
  caracteres); la Carátula 3 cambió "El paro sigue" por "Y los cortes
  siguen", que es lo que el informe afirma; la Carátula 2 nombra el objeto,
  "Acuerdo por el diésel / Bloqueos de camioneros siguen", con cuatro
  palabras por línea; el párrafo de los peajes dice solo que la devolución
  para buses interurbanos se duplica, y el bloque bajó a tres cifras
  habladas; el bloque de Rabat dejó el número de integrantes solo en el
  [ESQUEMA] y también quedó en tres; y las tres marcas [DATO] pasaron a la
  línea inmediatamente anterior al párrafo que narra su cifra (líneas 26, 38
  y 52).
- Lo demás verificado en esta vuelta: tres bloques de noticia con la portada
  primero y las tres [A] del informe, sin cuarta sección ni "En titulares",
  Dato curioso, Agenda o "¿En qué quedó?"; 499 palabras narradas, dentro de
  420 a 600, según node scripts/validar-tarjetas.js; las cuatro tesis miden
  58, 108, 118 y 108 caracteres, cada una en su banda, y suman 392, dentro de
  365 a 423; todas con 18 palabras o menos; línea en blanco después de cada
  [TESIS]; las cifras de las marcas calzan con el informe ($142 por litro,
  siete ministerios, 56 personas) y ninguna trae un dato que el informe no
  tenga; dos [ESQUEMA] para las dos noticias de proceso; "variedad OK" y
  "sin hallazgos mecánicos" en los dos scripts; sin rayas; el cierre lleva el
  enlace al informe, la línea "Para salir hoy" del informe y el tagline "El
  resumen sin gritos."; y "Fuentes:" lista los nueve medios e instituciones
  cuyas noticias se narraron, sin ninguna ruta interna.
