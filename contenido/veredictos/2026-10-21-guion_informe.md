VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-21T05:41:30Z

Observaciones:
- Para la pieza siguiente: la carátula del día ya está. Listada la carpeta en
  esta corrida, contenido/caratulas/ trae 2026-10-21.png y 2026-10-21-prompt.txt
  (ambos del 21-10-2026), así que la observación que la vuelta 1 dejó abierta
  queda cerrada y la edición no sale con la de respaldo.
- Las tres correcciones de la vuelta 1 quedaron resueltas y el diff no tocó nada
  más (comprobado con git diff entre las dos versiones del archivo):
  1. La cifra hablada de la línea 24 ahora dice "sería cercana a ciento cuatro
     mil pesos", con aproximador y tres cifras significativas, y el exacto sigue
     en el [DATO cifra] de la línea 23 ($103900).
  2. "La noticia del día" quedó en dos frases y 34 palabras, contadas acá: la
     [TESIS] de la línea 10 son 15 y el párrafo de la línea 12 son 19. Entra en
     el rango de 25 a 35 del punto 1 de ESTRUCTURA DEL GUION.
  3. El [DATO cambio] de los años de prohibición de reingreso quedó en la línea
     43, justo antes del párrafo de la línea 44 que narra el alza de tres a
     cinco años. La tarjeta ya no se pinta sobre las veinticuatro horas del
     juez.
- `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos" sobre
  esta versión. Búsqueda explícita de raya larga y de raya media en todo el
  archivo: cero coincidencias. Los conectores de ensayo escrito prohibidos,
  buscados uno por uno: ninguno.
- `node scripts/validar-tarjetas.js` da 479 palabras narradas (rango 420 a 600),
  cuatro bloques con fuente y tipos cifra 2, cambio 1, esquema 1. Su único aviso
  es sobre la línea 5, la "Carátula 3: Por cada millón / 103.900 pesos menos",
  que no se narra: el prompt dice "Ninguna se narra" y la tercera carátula puede
  llevar justamente una cifra con referencia. El script la cuenta como si fuera
  voz. Es el mismo falso positivo que anotó la vuelta 1 y conviene arreglarlo en
  el script, no en la pieza.
- "Senapred" se sigue pintando sin expandir en la [FUENTE] de la línea 29. Igual
  que en la vuelta 1 y que en el veredicto del 10-10-2026, queda como
  observación: la regla de siglas y el tope de seis palabras de esas marcas se
  contradicen, y el informe no trae el nombre desarrollado. El lugar de
  resolverlo es el prompt.
- Lo demás verificado contra el informe de hoy: las tres noticias narradas son
  las tres [A] con la portada primera (líneas 11, 21 y 31 del informe); seis
  secciones en el guion y ninguna cuarta noticia; no hay "En titulares", ni Dato
  curioso, ni Agenda, ni "¿En qué quedó?"; las tres [TESIS] bajo 18 palabras con
  su línea en blanco detrás; las cifras 29,3 mm, 111 albergadas, 3 a 5 años, 24
  horas, 10,39% y $103.900 calzan una por una con el informe; el matiz de las
  veinticuatro horas y de que la policía no recibe autorización general
  sobrevivió al recorte; la lista de fuentes no trae rutas internas; y el cierre
  lleva el enlace al informe completo, la línea "Para salir hoy" y el tagline
  exacto como última frase.
