VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-05T05:37:50Z

Correcciones:
1. Dónde: línea 98, "[DATO cambio | Instituto Nacional de Estadísticas, 30 sep] desocupación
   anual: +1 punto ; personas ocupadas: -0,9%" · Regla: "2. El mismo indicador en DOS momentos
   (antes y después, subió, cayó, pasó de X a Y) -> cambio" y "Cada párrafo narrado que se
   sostiene en una cifra así lleva su [DATO] con ESA cifra (una, la principal)" · Debe quedar:
   la marca es tipo `cambio` pero trae DOS indicadores distintos con un solo valor cada uno y
   sin par antes/después, y el párrafo que encabeza se sostiene en el 9,6%, que no aparece en
   la tarjeta. Reemplazar por una marca de un solo valor con la cifra principal del bloque, la
   misma que nombra la [TESIS]: "[DATO cifra | Instituto Nacional de Estadísticas, 30 sep]
   desocupación nacional, trimestre junio-agosto: 9,6% (sube mal)". El punto de alza y el
   0,9% de caída quedan solo en la narración, donde ya están.

2. Dónde: línea 103, "[DATO comparacion | EL PAÍS, 28 sep] inversión movilizada: $1,3 billones ;
   empleos proyectados: más de 100.000" · Regla: "6. Dos o tres valores de cosas distintas pero
   comparables, MISMA unidad -> comparacion" · Debe quedar: pesos y puestos de trabajo no son la
   misma unidad, así que `comparacion` no corresponde. Convertirla a `cifra` dejaría dos tarjetas
   `cifra` dentro del mismo bloque (con la corrección 1), y eso choca con "nunca dos tarjetas del
   mismo tipo seguidas dentro del mismo bloque". Aplica entonces "si el árbol está bien aplicado,
   deja la cifra sobrante en la narración": eliminar esta marca y dejar los dos valores solo en el
   párrafo, donde ya se narran ("uno coma tres billones de pesos y crear más de cien mil puestos").

3. Dónde: línea 22, "La diferencia fue de dos millones doscientos veintisiete mil seiscientos
   cincuenta y un votos" · Regla: "REGLA DE REDONDEO EN VOZ ... Tope: TRES cifras significativas
   habladas por número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no). La cifra
   exacta va en la marca [DATO], que es para pantalla" · Debe quedar: el número hablado tiene
   siete cifras significativas. Redondear a tres, por ejemplo "La diferencia fue de más de dos
   millones doscientos mil votos, equivalente a uno coma ochenta y siete puntos porcentuales".
   El mismo párrafo ya redondea los totales de cada candidato, así que el criterio queda parejo.

4. Dónde: líneas 78 y 81, "siete mil doscientos siete funcionarios", "los diecinueve mil
   novecientos sesenta y tres casos de dos mil veintitrés" y "Cuatro mil quinientas veintidós
   personas" · Regla: "Tope: TRES cifras significativas habladas por número" · Debe quedar: los
   tres números superan el tope (cuatro, cinco y cuatro cifras significativas). Redondearlos en
   la voz: "más de siete mil doscientos funcionarios", "casi veinte mil casos de dos mil
   veintitrés" y "más de cuatro mil quinientas personas". Las cifras exactas ya están en las
   marcas [DATO] de las líneas 84 y 87, que son las que van a pantalla.

5. Dónde: línea 96, "[TESIS] El Presupuesto 2027 se discute con desempleo de nueve coma seis por
   ciento."; línea 128, "Carabineros promedió cuarenta y un días de licencia médica en 2021.";
   línea 131, "Gobernadores objetan recortes regionales del Presupuesto 2027." · Regla:
   "Convierte cifras, monedas, porcentajes, fechas y abreviaturas a una forma cómoda de
   pronunciar, escribiendo los números en palabras", y el control interno 9, "que los números
   estén en palabras" · Debe quedar: los tres son texto narrado (la [TESIS] sí se narra y los
   titulares también) y llevan el año en cifras. Escribirlos en palabras respetando los topes:
   "[TESIS] El Presupuesto dos mil veintisiete se discute con desempleo de nueve coma seis por
   ciento." (quince palabras, bajo el tope de dieciocho) y "Gobernadores objetan recortes
   regionales del Presupuesto dos mil veintisiete." (nueve palabras, bajo el tope de doce). En el
   titular de Carabineros, "en dos mil veintiuno" lo deja en trece palabras y pasa el tope de
   doce, así que debe quedar sin el año: "Carabineros promedió cuarenta y un días de licencia
   médica por funcionario." (once palabras). El resto del guion ya escribe los años en palabras
   ("hacia dos mil treinta", "para dos mil veintisiete"), así que el criterio queda parejo.

6. Dónde: líneas 24, 52, 84 y 112: etiquetas "votos válidos", "imputados recluidos",
   "funcionarios detectados" y "Asentamientos Precarios" · Regla: "ETIQUETA CON CONTEXTO
   (obligatorio): la etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de modo
   que la tarjeta se entienda con el video en silencio" · Debe quedar: las cuatro etiquetas tienen
   dos palabras y quedan bajo el piso de tres. Ampliarlas sin pasar de ocho, por ejemplo: línea
   24, "votos válidos de la elección presidencial"; línea 52, "imputados que permanecen
   recluidos"; línea 84, "funcionarios detectados de viaje con licencia"; línea 112, "Programa de
   Asentamientos Precarios, 2026 a 2027". Las etiquetas de las líneas 69 ("viviendas del
   asentamiento") y 123 ("regiones bajo aviso") ya cumplen y no se tocan.

Observaciones:
- La Carátula 2 repite textual la segunda línea de la Carátula sugerida ("Brasil vota de nuevo").
  Las tres van a la prueba A/B de YouTube y el prompt pide tres enfoques distintos: media carátula
  repetida le resta valor a la prueba. El enfoque de contradicción ("Ganó, pero no alcanza") está
  bien elegido; lo que conviene cambiar es la segunda línea.
- La Carátula 3 ("Brasil: 1,87 puntos / Separan a los dos") apoya el gancho en una cifra que el
  prompt solo admite "si la cifra se entiende en un segundo sin contexto". Un decimal de puntos
  porcentuales exige saber de antemano que hubo una elección estrecha.
- La apertura tiene 43 palabras contra las "unas 40" del prompt. No bloquea, pero deja el tope de
  quince segundos sin holgura.
- El [DATO comparacion] de la línea 21 (47,03% ; 45,16%) encabeza un párrafo que narra los totales
  de votos, no esos porcentajes, que se dijeron antes en "La noticia del día". La regla pide que la
  marca vaya "justo antes del párrafo que menciona esos números", y la tarjeta entra algo
  desincronizada con la voz.
- El cierre termina en "con efectos todavía en desarrollo", una abstracción del tipo que la regla
  anti plantilla pide evitar en la única frase de síntesis. La frase sí nombra un hecho concreto
  (Brasil vuelve a votar el veinticinco de octubre), por eso no bloquea.
- "Etapa final del desalojo en Lo Barnechea [regiones]": en el informe la noticia va bajo Seguridad
  y Justicia y ocurre en la Región Metropolitana. Para archivarla, `seguridad` calza mejor que
  `regiones`. Las otras once categorías están bien elegidas, incluida `clima` para los avisos, que
  son pronóstico y no emergencia.
- Verificado y sin hallazgo: están las tres noticias [A], las 23 noticias que no se narran (diez
  [B] fuera del corte y trece [C]) tienen su titular, ninguno pasa de doce palabras, cada titular
  va en su propia línea, la entrada "Y en titulares:" está sola en su línea, las once [TESIS] están
  bajo dieciocho palabras y todas llevan línea en blanco después, cada bloque de noticia trae su
  [FUENTE], las siglas que se pintan en pantalla van expandidas (Dirección Meteorológica,
  Instituto Nacional de Estadísticas, Organización de los Estados Americanos), no hay conectores de
  ensayo escrito ni rayas, y el tagline cierra el guion. El informe no trae secciones de Agenda ni
  de dato curioso ni párrafos bajo "Análisis", así que su ausencia en el guion es correcta.
