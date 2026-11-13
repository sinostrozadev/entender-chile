VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-13T11:51:13Z

Correcciones:
1. Dónde: línea 41, "[DATO cifra | Diario Financiero, 12 nov] votos necesarios
   para aprobar la acusación: 78 votos", puesta delante del párrafo de la línea
   42, que habla de los tres capítulos, de los criterios contradictorios y del
   Consejo de Defensa del Estado, y no menciona los setenta y ocho votos. Esa
   cifra se narra recién en la línea 48 ("la acusación necesita setenta y ocho
   votos para ser aprobada"). · Regla: prompts/guion-informe.md, marca [DATO],
   "Fuente: una sola, la principal, con fecha, tomada del informe. No se narra.
   Va justo antes del párrafo que menciona esos números." · Debe quedar: la
   marca de los 78 votos movida al bloque de la línea 47 a 48, entre el
   [ESQUEMA | Trámite de la acusación] y el párrafo que empieza "Después se
   sorteará una comisión", sin cambiar su texto. Queda así: [ESQUEMA], luego la
   línea [DATO cifra | Diario Financiero, 12 nov] votos necesarios para aprobar
   la acusación: 78 votos, luego el párrafo que la narra.
2. Dónde: bloque "## Acusación contra Fernando Rabat [congreso]", sus dos
   únicas tarjetas son [DATO cifra] (línea 41, los 78 votos) y [DATO cifra]
   (línea 44, las 22 reducciones), una detrás de la otra sin nada en medio. Lo
   confirma "node scripts/validar-tarjetas.js contenido/guiones/informe/2026-11-13.md":
   'línea 44: dos "cifra" seguidas en el bloque "Acusación contra Fernando Rabat
   [congreso]"'. · Regla: prompts/guion-informe.md, VARIEDAD: "nunca más de dos
   [DATO cifra] seguidas en el guion; nunca dos tarjetas del mismo tipo seguidas
   dentro del mismo bloque". · Debe quedar: el bloque sin dos cifra consecutivas.
   El árbol de tipos está bien aplicado en las dos (un solo valor cada una), así
   que no se cambia el tipo: basta con el movimiento de la corrección 1, que deja
   el orden cifra, esquema, cifra dentro del bloque. Si por cualquier motivo no
   haces ese movimiento, entonces borra una de las dos marcas y deja su número
   solo en la narración, que ya lo dice.
3. Dónde: mismo bloque "## Acusación contra Fernando Rabat [congreso]", que
   narra cuatro cifras habladas: "tres capítulos" (línea 42), "veintidós
   reducciones" (línea 45), "cinco diputadas y diputados" y "setenta y ocho
   votos" (las dos en la línea 48). Las fechas no cuentan, con el mismo método
   de conteo de las vueltas anteriores. · Regla: prompts/guion-informe.md,
   EXTENSIÓN Y SELECCIÓN: "Cifras: narra las que sostienen la idea de cada
   noticia, máximo tres cifras habladas por bloque. Las demás pueden ir en una
   marca [DATO] para que aparezcan en pantalla." · Debe quedar: tres cifras
   habladas o menos en ese bloque. El camino más barato es sacar el cinco de la
   narración, porque ya está en pantalla dentro del [ESQUEMA | Trámite de la
   acusación] ("comisión de cinco diputados"): la línea 48 queda "Después se
   sorteará una comisión de diputadas y diputados para estudiar los cargos. Si
   el caso llega a la Sala, la acusación necesita setenta y ocho votos para ser
   aprobada." Con eso el bloque narra tres, capítulos, reducciones y votos, y el
   largo total baja a 462 palabras narradas, dentro de las 420 a 600.

Observaciones:
- Para la pieza siguiente: el título de hoy lleva una cifra ("$142 por litro")
  y la sección "## La noticia del día" no tiene ninguna tarjeta [DATO], solo su
  [TESIS], así que la regla del 01-10-2026 ("si el título del video dice un
  número, la tarjeta de La noticia del día muestra ESE número grande") no se
  puede cumplir sin romper la otra regla de esa sección, que admite una sola
  marca. No es incumplimiento hoy, porque el prompt permite "su [TESIS] o su
  [DATO] principal", pero el que escriba mañana con un número en el título
  conviene que elija: o la tesis nombra ese número, o la única marca de la
  sección es el [DATO] con la cifra del título.
- El cierre (línea 51) quedó en 62 palabras narradas, dos sobre las "40 a 60"
  del punto 8 de ESTRUCTURA. No bloquea, por el mismo criterio del veredicto
  del 10-11-2026: el propio prompt pone ese número en el "Reparto orientativo"
  de EXTENSIÓN, y el largo que prompts/validador.md nombra como incumplimiento
  es el total de 420 a 600, que acá da 463 contados por "node
  scripts/validar-tarjetas.js". Es el segundo cierre sobre 60 en cuatro días.
- El bloque de Ovalle narra 101 palabras, bajo el piso orientativo de 110 por
  noticia, mientras camioneros lleva 123 y Rabat 119. Tampoco bloquea, y el
  informe daba material para el párrafo que falta (la instrucción a los
  habitantes de las zonas ribereñas y el monitoreo de la cuenca ya están, pero
  la línea 111 del informe trae además los nuevos avisos SAE que pueda emitir
  la autoridad).
- La marca de la línea 23 lleva indicador "(baja bien)" sobre una etiqueta que
  es un ahorro ("ahorro en carga de 50 litros: $7100"). En pantalla eso dibuja
  una flecha hacia abajo junto a una cifra que para el bolsillo es una mejora.
  Lo que baja es el precio, no el ahorro. Queda anotado para la próxima: o la
  etiqueta habla del precio por carga, o el indicador sobra.
- Fidelidad, matiz menor: el informe (su línea 109) dice que Senapred "proyectó
  que los mayores caudales podrían persistir" desde el 15-11-2026, y el guion
  (línea 35) lo narra como "proyectó caudales mayores desde el quince de
  noviembre". El verbo sigue siendo una proyección, así que no es
  incumplimiento, pero el condicional del informe se perdió.

Verificado además, sin hallazgos: selección de tres bloques con la portada
primero y las otras dos [A] del informe, con la alerta vigente de Ovalle en el
segundo tramo y la acusación, que es la más especializada, en el tercero
(punto 1b y punto 3a); 463 palabras narradas; "La noticia del día" en 31
palabras y la apertura en 27; tesis de 60, 107, 105 y 114 caracteres, suma 386,
todas dentro de los topes de los puntos 14b, 14c y 14d; línea en blanco después
de cada [TESIS]; categorías economia, emergencia y congreso bien elegidas, con
Ovalle en emergencia por tener alerta y evacuados; los dos [ESQUEMA] dentro del
tope de la edición; las tres cifras de las marcas y todas las afirmaciones
narradas están en el informe; "node scripts/revisar-mecanico.js" sin hallazgos;
sin rayas; fechas absolutas en la narración y el trece de noviembre de 2026 es
viernes; cierre con el enlace de la descripción, la línea "Para salir hoy" del
informe integrada y el tagline exacto; la lista de "Fuentes:" cubre las marcas
y las fuentes de las tres noticias narradas, sin rutas internas.
