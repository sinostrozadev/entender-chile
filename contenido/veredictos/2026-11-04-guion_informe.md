VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-04T05:39:11Z

Correcciones:
1. Dónde: línea 23, "CIPER calculó que trescientas cincuenta y nueve mil
   setecientas siete personas en edad de jubilarse" · Regla: "REGLA DE
   REDONDEO EN VOZ (Santiago, 04-09): las cifras grandes se narran
   REDONDEADAS, con 'más de', 'casi', 'cerca de' o 'unos' (...) Tope: TRES
   cifras significativas habladas por número (3.640 millones sí;
   3.640.544.800 no; 762 mil sí; 762.326 no)", y las excepciones de esa regla
   son porcentajes con un decimal, años, fechas, horas, números de ley y
   resultados de votación, no un número de personas · Debe quedar: la cifra
   narrada con tres cifras significativas y su atenuante, "más de trescientas
   cincuenta y nueve mil personas en edad de jubilarse". El exacto 359707 ya
   está en la marca [DATO comparacion] de la línea 22, que es la que va a
   pantalla, y ahí se queda sin cambios.
2. Dónde: línea 43, "encontró nueve mil seiscientos cincuenta y tres inmuebles
   con diferencias" · Regla: la misma REGLA DE REDONDEO EN VOZ, "Tope: TRES
   cifras significativas habladas por número" (9.653 narrado son cuatro) ·
   Debe quedar: "más de nueve mil seiscientos inmuebles con diferencias", que
   son tres cifras significativas y conserva el sentido del informe (9.653).
   El desglose exacto 6415 y 3238 ya está en la marca [DATO comparacion] de la
   línea 42 y no se toca.
3. Dónde: bloque "## Fondos D y E siguen con pérdidas [economia]", líneas 20,
   23 y 25, que narran siete cifras: tres coma dos por ciento, uno coma ocho
   por ciento, siete coma seis por ciento, cuatro coma siete por ciento,
   trescientas cincuenta y nueve mil setecientas siete, casi ochenta y seis
   mil y "las siete AFP" · Regla: "Cifras: narra las que sostienen la idea de
   cada noticia, máximo tres cifras habladas por bloque. Las demás pueden ir
   en una marca [DATO] para que aparezcan en pantalla" · Debe quedar: tres
   cifras habladas como máximo en el bloque. Opción verificada, que conserva
   todos los hechos del informe: en la línea 20 el repunte de octubre se narra
   sin números ("El Fondo E y el Fondo D subieron en octubre", informe línea
   16) y se mantienen los dos acumulados anuales, siete coma seis por ciento y
   cuatro coma siete por ciento, que son los que sostiene la [TESIS]; en la
   línea 23 queda la cifra de la corrección 1 y los pensionados por retiro
   programado se narran sin número (su 85996 sigue en la tarjeta de la línea
   22); en la línea 25, "las AFP" en lugar de "las siete AFP". Así quedan tres
   cifras habladas. Si el repunte de octubre se pasa a una marca [DATO], no
   puede ser un segundo `comparacion` pegado al de la línea 22, porque la
   regla de VARIEDAD prohíbe "dos tarjetas del mismo tipo seguidas dentro del
   mismo bloque".
4. Dónde: bloque "## Inconsistencias en inmuebles fiscales [plata-publica]",
   líneas 43, 46 y 48, que narran cinco cifras: ciento nueve organismos, nueve
   mil seiscientos cincuenta y tres inmuebles, más de cuatrocientos cincuenta
   y un mil millones de pesos, noventa días y ochenta y nueve propiedades ·
   Regla: "Cifras: narra las que sostienen la idea de cada noticia, máximo
   tres cifras habladas por bloque" · Debe quedar: tres cifras habladas como
   máximo. Opción verificada: se mantienen la cifra de la corrección 2, el
   monto de más de cuatrocientos cincuenta y un mil millones de pesos (tiene
   su propia tarjeta en la línea 45) y el promedio de ochenta y nueve
   propiedades por organismo, que es el ejemplo a escala humana del informe
   (línea 88) y el prompt obliga a narrarlo. Salen de la voz "ciento nueve
   organismos" (basta "los organismos centralizados", informe línea 82, y el
   promedio de la línea 48 se entiende igual porque dice "por cada organismo
   revisado") y "noventa días", cuyo hecho ya viaja en la [TESIS] de la línea
   40 ("fijó un plazo para regularizarlos"); en su lugar la línea 48 puede
   narrar el seguimiento, las fiscalizaciones y los eventuales procedimientos
   disciplinarios del informe (línea 86), que no traen cifras.
5. Dónde: línea 4, "Carátula 2: Subieron en octubre / Siguen en rojo" · Regla:
   "EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026, Santiago) (...) Al menos una
   de las dos líneas tiene que traer el objeto de la noticia (qué cosa, a
   quién) con las palabras del informe (...) PRUEBA DEL GANCHO: si un
   desconocido necesita preguntarte '¿qué?' o '¿de quién?', no es gancho" ·
   Debe quedar: una de las dos líneas con el objeto de la noticia, sin pasar
   de cuatro palabras por línea y manteniendo el giro que le toca a la
   segunda carátula. Opción verificada, cuatro palabras y cuatro palabras:
   "Carátula 2: Fondos D y E / Subieron, siguen en rojo".
6. Dónde: línea 5, "Carátula 3: 445.703 personas / Cerca de pensionarse" ·
   Regla: "Antes de escribirlo, comprueba contra el informe que lo que el
   gancho afirma es exactamente lo que el informe afirma" · Debe quedar: un
   gancho que no presente a las 445.703 personas como gente por pensionarse,
   porque el informe (línea 24) compone esa cifra con 359.707 en edad de
   jubilarse MÁS 85.996 que ya están pensionadas por retiro programado, es
   decir una parte ya jubiló. Opción verificada, dos palabras y cuatro
   palabras: "Carátula 3: 445.703 personas / Ya jubilados o cerca". También
   cumple dejar la cifra que sí calza con la afirmación: "Más de 359 mil /
   Cerca de jubilar".

Observaciones:
- Para la pieza siguiente: la cadena diaria no tiene pieza después de esta, y
  nada de lo de abajo bloquea.
- Lo que la pieza hace bien y conviene no romper al corregir: la selección es
  exacta (portada primero y luego las dos [A] siguientes en el orden del
  informe, con la [A] internacional del Senado de Estados Unidos quedando en
  la web), el largo narrado es de 481 palabras dentro del rango de 420 a 600,
  las tres [TESIS] están bajo las 18 palabras con su línea en blanco detrás,
  el cierre tiene 47 palabras con el tagline exacto al final y la línea "Para
  salir hoy" integrada, las cuatro marcas [DATO] aplican bien el árbol de
  tipos y sus etiquetas tienen contexto (de 4 a 6 palabras cada una), y la
  lista de "Fuentes:" no cuela ningún archivo interno del sistema.
- "La noticia del día" (líneas 9 a 11) lleva como única tarjeta un [DATO
  comparacion] con los acumulados anuales, pero sus dos frases no narran esas
  cifras: narran las 445.703 personas. La regla de las marcas dice que el
  [DATO] "va justo antes del párrafo que menciona esos números", y el punto 1
  de la estructura solo permite "una sola marca" en esa sección: las dos
  reglas se cruzan y no se puede cumplir las dos. No va a corrección por eso.
  Es material para el prompt, no para una vuelta.
- "CIPER" se pinta en pantalla en las [FUENTE] de las líneas 9 y 17 y en el
  [DATO] de la línea 22 sin quedar expandida antes en el guion. Mismo choque
  ya anotado el 09-10-2026: el tope de seis palabras de esas marcas y la regla
  de siglas no caben juntos. Queda sin corrección.
- El cierre repite literal la frase "El informe completo está en el enlace de
  la descripción", igual que la edición del 02-11-2026, contra el "con tus
  palabras y con variaciones entre días" del punto 8. Y la apertura de la
  línea 14 abre con la misma fórmula "Este <día> <fecha>" del 03-11-2026,
  contra "La formulación debe variar de un día a otro". Las dos son leves y el
  resto del cierre y de la apertura sí cambia, por eso no bloquean.
- El informe trae en su línea 16 un antes y después que la pieza no usó: las
  bajas acumuladas al cierre de septiembre eran 10,39% en el Fondo E y 6,38%
  en el D. Es la base vigente contra la que el repunte se mide y daría un
  [DATO cambio], el único tipo que la edición no usa. No es exigencia del
  prompt, y al corregir hay que cuidar que no se convierta en cifras habladas
  de más.
