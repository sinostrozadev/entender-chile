VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-06T08:06:48Z

Correcciones:
1. Dónde: línea 27, "La deuda acumulada al cierre de dos mil veintiséis fue cifrada
   en ciento cincuenta y nueve mil doscientos cinco millones de dólares. Si se
   utilizara toda la nueva autorización, sin considerar amortizaciones, el total
   llegaría a ciento ochenta y cuatro mil doscientos cinco millones." · Regla:
   "REGLA DE REDONDEO EN VOZ ... Tope: TRES cifras significativas habladas por
   número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no). La cifra
   exacta va en la marca [DATO], que es para pantalla." Las dos cifras habladas
   traen seis cifras significativas cada una (159.205 y 184.205) · Debe quedar:
   "La deuda acumulada al cierre de dos mil veintiséis fue cifrada en casi ciento
   sesenta mil millones de dólares. Si se utilizara toda la nueva autorización,
   sin considerar amortizaciones, el total llegaría a unos ciento ochenta y cuatro
   mil millones." Las cifras exactas se quedan en las marcas [DATO] de las líneas
   26 y 23, que son para pantalla.

2. Dónde: línea 30, "el techo equivale a unos mil doscientos cuarenta y un dólares
   por persona" · Regla: la misma de arriba, "Tope: TRES cifras significativas
   habladas por número"; 1.241 trae cuatro · Debe quedar: "el techo equivale a
   unos mil doscientos cuarenta dólares por persona". La cifra exacta US$1.241 ya
   está en la marca [DATO] de la línea 29 y en la carátula 3.

3. Dónde: línea 75, "contabiliza siete mil doscientos siete servidores públicos" ·
   Regla: la misma, "Tope: TRES cifras significativas habladas por número"; 7.207
   trae cuatro · Debe quedar: "contabiliza más de siete mil doscientos servidores
   públicos". La cifra exacta 7.207 se queda en la marca [DATO] de la línea 74.

4. Dónde: línea 115, titular "Una empresa solar quebró con pérdidas de mil
   seiscientos dieciocho millones." · Regla: la misma, "Tope: TRES cifras
   significativas habladas por número"; 1.618 trae cuatro, y el titular se narra ·
   Debe quedar: "Una empresa solar quebró con pérdidas de más de mil seiscientos
   millones." (doce palabras, dentro del tope del bloque, contadas).

5. Dónde: línea 139, titular "Chao Cables intervendrá dos mil cuatrocientos ochenta
   y nueve puntos." · Regla: la misma, "Tope: TRES cifras significativas habladas
   por número"; 2.489 trae cuatro · Debe quedar: "Chao Cables intervendrá cerca de
   dos mil quinientos puntos." (nueve palabras, contadas).

6. Dónde: línea 132, titular "Tu Casa a Tu Pinta amplía su apoyo a departamentos." ·
   Regla: "si el informe dice que alguien 'proyecta', 'anticipa', 'prevé', 'anunció'
   o 'propone' algo, el titular lo dice así ..., nunca como hecho consumado ...
   Recortar palabras no puede convertir un anuncio en un hecho". El informe
   (línea 143) dice "El Minvu anunció una nueva versión del beneficio ... y
   cobertura ampliada a departamentos", y el titular lo narra como ampliación ya
   hecha · Debe quedar: "El Minvu anuncia Tu Casa a Tu Pinta ampliado a
   departamentos." (once palabras, contadas).

7. Dónde: las marcas de las líneas 39, 48, 55 y 64, cuatro [DATO cifra]
   consecutivas sin ninguna otra tarjeta entre ellas (imputados: 19 ; perjuicio
   fiscal: más de $3.000 millones ; caída del dólar: más de $17 ; supervisores:
   más de 900) · Regla: "nunca más de dos [DATO cifra] seguidas en el guion"
   (bloque VARIEDAD), repetida en el control interno 17, "Variedad visual: no hay
   más de dos [DATO cifra] seguidas" · Debe quedar: a lo más DOS [DATO cifra]
   consecutivas, contando como corte cualquier otra tarjeta ([DATO] de otro tipo o
   [ESQUEMA]). Aplica el remedio que da el propio prompt, "si el árbol está bien
   aplicado, deja la cifra sobrante en la narración ... se deja el párrafo sin
   marca": quita la marca de dos de esas cuatro líneas, por ejemplo la de la línea
   48 y la de la línea 64, cuyas cifras siguen narradas en los párrafos de las
   líneas 49 y 65. No agregues ninguna cifra que no esté en el informe: "la
   variedad NUNCA justifica un dato que no está en el informe ni una tarjeta
   forzada".

8. Dónde: líneas 26 y 29, dos [DATO cifra] seguidas dentro del mismo bloque
   "## El techo de deuda [economia]" · Regla: "nunca dos tarjetas del mismo tipo
   seguidas dentro del mismo bloque" (bloque VARIEDAD) · Debe quedar: una de las
   dos deja de ser cifra o deja de llevar marca. Opción verificada contra el árbol
   y contra el informe (línea 17, que trae los dos valores): convertir la línea 26
   en "[DATO comparacion | La Tercera, 06 oct] deuda al cierre de 2026: US$159.205
   millones ; con toda la autorización usada: US$184.205 millones", que calza con
   la fila 6 del árbol (dos valores comparables de la misma unidad) y además cubre
   la cuota de "al menos una de barras, tabla o comparacion".

9. Dónde: la lista "Fuentes:" (líneas 161 a 210), que no trae ninguna línea de INE,
   verificado con búsqueda explícita de "INE" y de "Instituto Nacional de
   Estadísticas" sobre esas 49 líneas · Regla: "Al final, bajo 'Fuentes:', lista
   una línea por cada fuente de las marcas [DATO] y [CITA] Y por cada fuente del
   informe cuyas noticias narraste". La marca de la línea 29 es
   "[DATO cifra | INE, 28 ene]" · Debe quedar: una línea más en la lista, en el
   orden alfabético que ya usa, con la fuente tal como la trae el informe (línea
   19): "- INE, proyección de población para 2026, 28 ene."

10. Dónde: línea 19, "[TESIS] El Congreso comienza a revisar cuánto endeudamiento
    podrá usar el Estado durante 2027", y línea 114, titular "La producción minera
    caería un seis coma seis por ciento en 2026" · Regla: "Convierte cifras,
    monedas, porcentajes, fechas y abreviaturas a una forma cómoda de pronunciar,
    escribiendo los números en palabras", y control interno 9, "que los números
    estén en palabras". La [TESIS] y los titulares se narran, y el resto del guion
    ya escribe los años en palabras ("dos mil veintiséis" en la línea 27, "dos mil
    veintisiete" en la línea 33) · Debe quedar: "durante dos mil veintisiete" en la
    línea 19 y "en dos mil veintiséis" en la línea 114. El nombre propio
    "Presupuesto 2027" se queda como está: ahí el número es parte del nombre, no
    una cifra narrada.

Observaciones:
- La categoría del bloque de la línea 86 quedó como [clima] y es defendible, porque
  el prompt pone "el sistema frontal que viene" como ejemplo de clima y nadie
  resultó herido, pero la regla de decisión del mismo prompt dice "si hay víctimas,
  evacuados, daños o una alerta declarada, es emergencia", y el bloque narra una
  alerta de la Dirección Meteorológica y una alerta temprana preventiva de Senapred.
  Las dos lecturas del prompt se contradicen. Conviene que la sesión de día fije
  si una alerta meteorológica preventiva cuenta como "alerta declarada": mientras no
  se aclare, no es hallazgo que bloquee.
- Línea 37, "la cautelar más intensa": el informe no usa ese superlativo, solo dice
  "prisión preventiva". No queda como incumple porque la regla del 10-09 apunta a
  afirmaciones sobre una serie histórica ("el mayor, el menor, el primero o el peor
  desde una fecha"), y esta no lo es, pero la formulación del informe alcanzaba.
- Línea 148, "El Festival de Ciencias": el informe lo nombra "Festival de Ciencia y
  Tecnología 2026". El nombre completo cabe en el tope de doce palabras
  ("El Festival de Ciencia y Tecnología ofrecerá actividades gratuitas en
  regiones", once palabras), así que no hacía falta acortarlo.
- Línea 75, "la Compin": sigla narrada sin explicar. No es incumple porque el prompt
  lo condiciona a que "un oyente general pueda no conocerlas" y en el contexto de
  licencias médicas es conocida, pero una aposición corta la dejaría cerrada.
- La edición usó solo dos tipos de [DATO] (cifra y cambio), bajo la cuota de "al
  menos tres tipos distintos por edición". No es incumple, porque el propio prompt
  dice que "la cuota es una alarma, no una obligación" y el informe de hoy no trae
  un conjunto de datos con forma de barras ni de tabla. La corrección 8 la cubre si
  se toma la opción de comparacion.
- Bien resuelto, para que no se pierda: las diez noticias narradas y los treinta y
  seis titulares cubren las cuarenta y seis noticias del informe sin dejar ninguna
  fuera y sin agregar ninguna; las tres [A] están narradas; todas las [TESIS] están
  bajo las dieciocho palabras y con su línea en blanco; cada bloque de noticia trae
  su [FUENTE]; el ejemplo a escala humana del dólar (línea 58) se narró como propio;
  y la línea "Para salir hoy" quedó integrada en la despedida con el tagline al
  cierre.
