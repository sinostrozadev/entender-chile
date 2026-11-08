VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-08T05:52:00Z

Correcciones:
1. Dónde: línea 62, el cierre completo ("Hoy quedan tres tareas concretas... El
   resumen sin gritos."), 62 palabras narradas · Regla: "CIERRE: corto, 40 a 60
   palabras" (punto 8 de ESTRUCTURA DEL GUION; control interno 2) · Debe
   quedar: el cierre entre 40 y 60 palabras, conservando sus cuatro piezas (la
   frase de síntesis, la frase del enlace al informe completo, la línea "Para
   salir hoy" y el tagline). Basta quitar "y protégete del sol", que además no
   está en la línea "Para salir hoy" del informe: el cierre queda en 58
   palabras, contadas.
2. Dónde: línea 14, cuerpo de "La noticia del día" ("La actualización mantiene
   quince personas lesionadas, cuatro de ellas graves. La Fiscalía y Carabineros
   siguen periciando el lugar para establecer cómo ocurrió la colisión."), 24
   palabras · Regla: "Dos frases, 25 a 35 palabras en total" (punto 1 de
   ESTRUCTURA DEL GUION) · Debe quedar: el cuerpo en dos frases y entre 25 y 35
   palabras, sin contar la línea [TESIS], que es la tarjeta (así se midió el
   02-11-2026, veredicto aprobado con 28 palabras). Con "La actualización
   oficial mantiene quince personas lesionadas..." queda en 25 palabras,
   contadas, y el informe sostiene ese "oficial" en su línea 15 ("una corrección
   del conteo oficial").
3. Dónde: bloque "## Ruta de la Fruta [seguridad]", líneas 26 y 28: narra siete
   cifras habladas (doce, once, quince, dos, cuatro, ciento diecinueve coma ocho
   y sesenta y seis), sin contar la fecha · Regla: "Cifras: narra las que
   sostienen la idea de cada noticia, máximo tres cifras habladas por bloque.
   Las demás pueden ir en una marca [DATO] para que aparezcan en pantalla"
   (EXTENSIÓN Y SELECCIÓN) · Debe quedar: tres cifras habladas como máximo en el
   bloque. Las que sostienen la idea son doce, once y quince (la corrección del
   conteo y los lesionados, que es la portada). La discrepancia de menores (dos
   y cuatro) y la ubicación numérica (kilómetro ciento diecinueve coma ocho,
   Ruta sesenta y seis) salen de la narración: el lugar se dice "la Ruta de la
   Fruta, en Santo Domingo", que el informe trae en su línea 15.
4. Dónde: bloque "## Medidas laborales [economia]", líneas 40, 42 y 44: narra
   nueve cifras habladas (cuarenta horas, dieciséis semanas, treinta horas,
   ciento veinte mensuales, setenta y uno coma cuatro por ciento, cuarenta y dos
   horas, doce horas, dieciséis regiones y noventa días), sin contar la fecha ·
   Regla: la misma de la corrección 3, "máximo tres cifras habladas por bloque"
   · Debe quedar: tres cifras habladas como máximo. Las que sostienen la idea
   son treinta horas (el tope propuesto), cuarenta y dos horas (la jornada
   vigente) y setenta y uno coma cuatro por ciento (el ejemplo a escala humana
   que el prompt obliga a narrar). Para que sean tres y no cuatro, sale de la
   narración "La diferencia son doce horas por semana". Las demás quedan fuera
   de la voz o en una marca [DATO], sin romper la regla de variedad.
5. Dónde: bloque "## Calor e incendio en Machalí [emergencia]", líneas 52 y 56:
   narra seis cifras habladas (cinco regiones, treinta y siete grados, seis coma
   veinticinco hectáreas, cinco brigadas, dos helicópteros y tres técnicos), sin
   contar la fecha ni las horas · Regla: la misma de la corrección 3, "máximo
   tres cifras habladas por bloque" · Debe quedar: tres cifras habladas como
   máximo. Las que sostienen la idea son cinco regiones, treinta y siete grados
   y seis coma veinticinco hectáreas. El despliegue se narra sin números
   ("Conaf desplegó brigadas, helicópteros, un avión cisterna y personal
   técnico"), que es lo que el informe sostiene en su línea 61.
6. Dónde: líneas 50 y 54, las dos marcas "[DATO cifra | Dirección Meteorológica,
   6 nov] máxima prevista en sectores de Valparaíso: 37 °C" y "[DATO cifra |
   Conaf, 7 nov] superficie preliminar afectada en Machalí: 6,25 hectáreas",
   seguidas dentro del mismo bloque · Regla: "nunca dos tarjetas del mismo tipo
   seguidas dentro del mismo bloque" (VARIEDAD, en la definición de [DATO]), y
   "si el árbol está bien aplicado, deja la cifra sobrante en la narración" ·
   Debe quedar: una sola de las dos marcas en el bloque. El árbol está bien
   aplicado en las dos (un valor cada una), así que se quita la de la línea 54 y
   las seis coma veinticinco hectáreas se quedan solo en la narración de la
   línea 56, donde ya están. Se conserva la de 37 °C, que es la cifra que cambia
   algo para quien escucha. Lo confirma scripts/validar-tarjetas.js, que avisa
   'línea 54: dos "cifra" seguidas en el bloque "Calor e incendio en Machalí"'.
7. Dónde: línea 38, "[DATO comparacion | Ministerio del Trabajo, 8 nov] jornada
   ordinaria vigente: 42 horas semanales ; tope de contrato por hora propuesto:
   30 horas semanales", colocada antes del párrafo de la línea 40, que narra
   cuarenta horas y dieciséis semanas y no menciona ni 42 ni 30 · Regla: "Va
   justo antes del párrafo que menciona esos números" (definición de [DATO]) ·
   Debe quedar: la marca movida a justo antes del párrafo de la línea 42, que es
   el que narra "treinta horas semanales" y "la jornada ordinaria de cuarenta y
   dos horas". La tarjeta entra cuando la voz dice esas palabras, así que donde
   está ahora pierde la sincronía.
8. Dónde: línea 44, "Empleo trescientos sesenta operará en las dieciséis
   regiones" · Regla: "Nombres propios que suenan a persona o a cargo pero no lo
   son van con su categoría, siempre: ... 'el programa Chile Crece Contigo'. Un
   oyente que no conoce el nombre debe entender qué es al oírlo" (REGISTRO ORAL
   Y ANTI-PLANTILLA) · Debe quedar: el nombre con su categoría, "el programa
   Empleo trescientos sesenta". Dicho en voz y sin la palabra "programa", el
   oyente no tiene cómo saber que es un plan de empleo y no una cifra más de la
   frase.

Observaciones:
- Al recortar las cifras habladas de las correcciones 3, 4 y 5, vuelve a correr
  `node scripts/validar-tarjetas.js contenido/guiones/informe/2026-11-08.md`:
  la pieza está hoy en 565 palabras narradas y el piso son 420. Los recortes
  pedidos suman menos de cincuenta palabras, así que no debería bajar del piso,
  pero el número se comprueba, no se supone.
- La marca [DATO cambio] de la línea 24 usa el balance inicial de 12 como base
  del cambio. Eso es correcto acá y no hay que "arreglarlo" por la regla 17c de
  la base vigente: la corrección del conteo oficial ES la noticia de portada, y
  el informe la formula así en su línea 5 ("rebajó de 12 a 11").
- "Conaf" se pinta en pantalla sin expandir, en el [FUENTE] de la línea 47. No
  lo cuento como INCUMPLE porque es sigla de uso corriente en Chile, de las que
  se leen sin traducir. Lo anoto porque la regla nació con "DMC" el 21, 22 y
  23-09-2026: si hay duda, va "Corporación Nacional Forestal (Conaf)" la primera
  vez.
- El kilómetro "ciento diecinueve coma ocho" (línea 28) son cuatro cifras
  significativas habladas. No lo cuento contra el tope de tres de la regla de
  redondeo porque es la ubicación exacta que da el informe y redondearla
  cambiaría el lugar, no una magnitud. La corrección 3 lo saca igual, por el
  tope de cifras del bloque.
- Verificado y sin hallazgos: la selección (las tres [A] del informe, la
  NOTICIA DE PORTADA primera), las cuatro [TESIS] con 16, 16, 16 y 14 palabras,
  la línea en blanco después de cada [TESIS], las categorías (`emergencia` para
  Machalí es la correcta: hay incendio activo y alerta declarada), las tres
  carátulas con cuatro palabras o menos por línea y con el objeto de la noticia,
  `urgente` como clima, la apertura con 34 palabras, las etiquetas con contexto
  de las cuatro marcas [DATO], el [ESQUEMA] del bloque de proceso, la lista de
  Fuentes (todas las del informe cuyas noticias se narraron, ninguna ruta
  interna), que el 08-11-2026 es domingo, y revisar-mecanico.js sin hallazgos.
