VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion
PROMPT: prompts/guion-claves.md
SLUG: codelco-produccion-inflada
VALIDADO: 2026-11-13T16:45:09Z

Correcciones:
1. Dónde: línea 16, "veintiséis mil ochocientas setenta y cinco toneladas de
   material de dos divisiones"; línea 34, "Las dos cifras públicas, veintiséis
   mil ochocientas setenta y cinco y cuarenta y dos mil cien"; línea 52, "para
   el primer caso de veintiséis mil ochocientas setenta y cinco toneladas" ·
   Regla: "REGLA DE REDONDEO EN VOZ (Santiago, 04-09): las cifras grandes se
   narran REDONDEADAS, con 'más de', 'casi', 'cerca de' o 'unos' (...) Tope:
   TRES cifras significativas habladas por número" · Debe quedar: en las tres
   líneas la cifra hablada se redondea, por ejemplo "casi veintisiete mil
   toneladas", y el número exacto queda en la marca [DATO] (la de la línea 15
   ya lo trae como 20000 y 6875; si hace falta el total, va una marca con
   "material de 2025 reconocido como terminado: 26875 toneladas", fuente
   Codelco, 20-05-2026).

2. Dónde: línea 52, "CNN Chile había informado catorce coma tres millones de
   dólares y seis mil trescientas veintidós personas" · Regla: la misma REGLA
   DE REDONDEO EN VOZ, "Tope: TRES cifras significativas habladas por número
   (...) 762 mil sí; 762.326 no" · Debe quedar: "unas seis mil trescientas
   veinte personas" o "cerca de seis mil trescientas personas" en la
   narración, con el exacto 6322 personas en la marca [DATO] de la línea 51,
   que ya lo trae. "catorce coma tres millones" se mantiene: son tres cifras
   significativas.

3. Dónde: bloque "## Qué está en juego y qué mirar" (línea 77), cuyo párrafo
   de la línea 86 narra "cuarenta y dos mil cien", "el rango de ciento veinte
   a ciento cuarenta millones de dólares" y "ocho salidas laborales" sin
   ninguna marca de fuente en el bloque · Regla: "[FUENTE] institución o
   medio, fecha. Una por bloque que narre cifras, al principio del bloque
   (...) Si el bloque ya trae un [DATO], su fuente sirve para todo el bloque y
   no hace falta esta marca" · Debe quedar: una línea "[FUENTE] Codelco,
   05-11-2026" inmediatamente después del título del bloque y antes de la
   [TESIS] de la línea 78, porque ese bloque no tiene ninguna marca [DATO].

4. Dónde: el arranque, la [TESIS] de la línea 7 más el párrafo de la línea 10:
   la promesa ("Al terminar este video vas a entender qué significa realmente
   esa cifra...") recién empieza en la palabra 42 narrada, a los 18,7 segundos
   a 135 palabras por minuto, y el gancho con la promesa suman 74 palabras,
   unos 33 segundos · Regla: "GANCHO (15 a 25 segundos; en 'Entender el caso',
   el gancho Y la promesa caben en los primeros 15 segundos, regla del
   12-11-2026 tras el piloto del 05-11: 31 % visto)" y "PROMESA (1 a 2 frases,
   antes de los 15 segundos en 'Entender el caso')" · Debe quedar: desde la
   [TESIS] hasta el final de la frase de promesa no puede haber más de 34
   palabras narradas (15 segundos a 135 palabras por minuto). Verificada,
   esta versión cabe en 33: "[TESIS] Codelco reconoció en noviembre de dos mil
   veintiséis cuarenta y dos mil cien toneladas de cobre registradas sin
   producción efectiva." (20 palabras), línea en blanco, y el párrafo "¿Cómo
   se anota producción que no ocurrió? Acá vas a entender cómo ocurrió." (13
   palabras). Lo que hoy va en medio ("Cuarenta y dos mil cien toneladas es la
   estimación preliminar" y el detalle de qué significa la cifra) se mueve al
   bloque siguiente, no se borra.

5. Dónde: línea 3, "Carátula sugerida: ¿EXISTIÓ ESE COBRE?" · Regla: "PRUEBA
   DEL GANCHO: si un desconocido necesita preguntar '¿qué?' o '¿de quién?', no
   es gancho" · Debe quedar: el sujeto tiene que estar en la carátula, como lo
   deja la carátula 1 de la pauta aprobada ("CODELCO / ¿EXISTIÓ ESE COBRE?",
   línea 126 de contenido/claves/flujo/codelco-produccion-inflada/pauta.md).
   Por ejemplo "CODELCO: ¿EXISTIÓ ESE COBRE?", cuatro palabras, dentro del
   tope de 3 a 5. El mismo gancho corregido tiene que quedar en los tres
   prompts de carátula de
   contenido/guiones/claves/2026-11-18-codelco-produccion-inflada-imagenes.md
   (líneas 2, 5 y 8), porque el prompt pide que digan el de la línea "Carátula
   sugerida:" del guion.

Observaciones:
- Línea 36: la [DATO comparacion] mezcla unidades en una misma tarjeta (15200
  toneladas junto a US$120000000 y US$140000000). El prompt no lo prohíbe,
  pero el render las pinta como una sola serie y comparar toneladas con
  dólares no dice nada en pantalla. Conviene partirla en dos marcas.
- Líneas 48 y 51: cada [DATO cifra] lleva dos valores, y lo marca
  scripts/validar-tarjetas.js. El árbol que pide un solo valor por "cifra" está en
  prompts/guion-informe.md, no en el prompt de la Clave, así que no bloquea.
- Líneas 58 y 61: dos [ESQUEMA] seguidos dentro del mismo bloque. La regla de
  variedad también es del prompt del informe y acá no bloquea, pero dos
  esquemas pegados se leen en pantalla como uno solo.
- Línea 7: la [TESIS] del gancho tiene 209 caracteres. El tope de 180 es del
  guion del informe y no rige acá; la corrección 4 la deja más corta igual.
- Línea 86: "Primero (...) Segundo (...) Tercero (...) Cuarto (...) y quinto"
  queda cerca de la "lista leída" que el punto 8 de la estructura pide evitar.
  No bloquea porque va narrado en prosa dentro de un párrafo.
- Lo que sí quedó verificado contra la pauta, pregunta por pregunta: las siete
  preguntas de su sección 4 están respondidas en lo narrado, y nada de su
  sección 6 ("Qué NO va") entró al guion. Las cinco marcas [DIARIO] son
  idénticas a las de la sección 9 y están en la primera línea de su sección.
  La extensión narrada es de 1.322 palabras, dentro del rango.
