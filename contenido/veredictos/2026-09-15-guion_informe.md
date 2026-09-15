VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-15T11:48:01Z

Correcciones:
1. Dónde: bloque "## La presión del desempleo", líneas 108 a 114: la [TESIS] narra
   "nueve coma cinco por ciento" y los párrafos narran además "diez coma tres por
   ciento", "ocho coma nueve por ciento", "cero coma dos por ciento", "diez coma
   cuatro por ciento" y "cerca de un millón": seis cifras habladas en una noticia
   que el informe pesa [B] (línea 136 del informe: "### [B] Desempleo de 9,5%
   instala presión por nuevas medidas"). · Regla: "En noticias [B], máximo dos
   cifras habladas; en cada titular, una como mucho" (EXTENSIÓN SEGÚN PESO), con
   "Las cifras del informe que no se narren pueden conservarse en una marca [DATO]
   para que aparezcan en pantalla". · Debe quedar: como mucho DOS cifras habladas
   en todo el bloque, contando la de la [TESIS]. Las demás salen de la narración y
   se quedan solo en la tarjeta, que ya las lleva ([DATO barras | INE, 28 ago]
   desempleo total: 9,5% ; mujeres: 10,3% ; hombres: 8,9%). Si hace falta una
   segunda tarjeta para el resto, va con las cifras del informe, sin inventar
   ninguna.

2. Dónde: bloque "## El dólar y el costo de importar", líneas 98 a 104: "El dólar
   observado pasó de novecientos treinta y siete pesos con diecisiete centavos el
   once de septiembre a novecientos cuarenta pesos con noventa y un centavos el día
   catorce. El aumento fue de tres pesos con setenta y cuatro centavos", más "su
   nivel más alto en casi once meses". Es una noticia [B] (línea 130 del informe:
   "### [B] Dólar alcanza su mayor nivel en casi once meses") con tres importes
   hablados, y dos de ellos con cinco cifras significativas cada uno. · Regla: "En
   noticias [B], máximo dos cifras habladas" (EXTENSIÓN SEGÚN PESO) y "REGLA DE
   REDONDEO EN VOZ: las cifras grandes se narran REDONDEADAS, con 'más de', 'casi',
   'cerca de' o 'unos' ... Tope: TRES cifras significativas habladas por número ...
   La cifra exacta va en la marca [DATO], que es para pantalla". · Debe quedar: a lo
   más dos cifras habladas en el bloque y redondeadas, por ejemplo el valor del 14
   de septiembre y el alza ("cerca de novecientos cuarenta y un pesos", "casi cuatro
   pesos más que el once de septiembre"). Los valores exactos quedan donde ya
   están, en [DATO cambio | Banco Central, 14 sep] dólar observado: $937,17 ->
   $940,91 (sube).

3. Dónde: "Carátula sugerida: Cincuenta y cuatro años" (línea 3). · Regla: "el
   GANCHO de la miniatura: 3 a 5 palabras sobre la noticia de portada que digan lo
   que el título NO dice ... PRUEBA DEL GANCHO: si un desconocido necesita
   preguntarte '¿qué?' o '¿de quién?', no es gancho ... Puede llevar una cifra solo
   si se entiende en un segundo sin contexto (762.326 dosis sí; 2,6% del PIB
   tendencial no)" (FORMATO DE SALIDA). · Debe quedar: un gancho de 3 a 5 palabras
   donde la cifra diga de qué es, sin necesidad de preguntar, y en numerales, ya que
   no se narra: por ejemplo "54 años sin contagios" o "Cero casos en 54 años".

4. Dónde: titular "La Corte anuló dos traspasos de inmuebles al servicio educativo
   Santiago Centro." (línea 160). · Regla: "Fidelidad" del punto 2 del validador
   sobre lo que exige el prompt en FIDELIDAD TOTAL AL INFORME: "NO agregues
   noticias, datos, opiniones ni predicciones"; el informe (línea 166 y 168) dice
   "Corte anula traspaso de inmuebles de Cordesan al SLEP Santiago Centro" y
   "anuló el traspaso de dos propiedades", es decir UN traspaso de dos inmuebles,
   no dos traspasos. · Debe quedar: "La Corte anuló el traspaso de dos inmuebles al
   servicio educativo Santiago Centro." (12 palabras, dentro del tope del bloque).

Observaciones:
- Titular de la línea 184: el informe (línea 229) dice que el software de camas
  "quedó bajo revisión periodística"; el titular dice solo "bajo revisión", que se
  puede oír como una revisión institucional. Cabe "Software de camas hospitalarias
  quedó bajo revisión periodística por conflicto de interés" (12 palabras).
- Titular de la línea 162: "Flávio Bolsonaro aventajó a Lula en un escenario de
  segunda vuelta" viene de una encuesta (informe, línea 198 a 200). "En un escenario
  de segunda vuelta" conserva el condicional, pero la palabra "encuesta" lo dejaría
  cerrado.
- En la línea 24 el [DATO cifra | Minsal, 14 sep] de los 54 años queda pegado a un
  párrafo que narra el año 1972; la cifra de la tarjeta se narra en "La noticia del
  día", dos bloques antes.
- La edición queda en unas 1.900 palabras narradas, arriba en la banda de 12 a 13
  minutos que el prompt permite en días cargados. Dentro de la regla, pero sin
  margen: las cifras que salgan por las correcciones 1 y 2 ayudan.
- Cobertura verificada y correcta: las cuatro [A] van narradas, las diez noticias
  narradas están justo en el tope, y las trece [B] fuera del corte más las
  veintiuna [C] suenan una por línea en "En titulares" (34 líneas, ninguna sobre
  doce palabras, cada una en su propia línea y con "Y en titulares:" sola en la
  suya). Once [TESIS], todas de 18 palabras o menos y con su línea en blanco
  detrás; [FUENTE] en la línea siguiente a cada bloque de noticia y en ninguna de
  Apertura, Dato curioso, Agenda, En titulares ni Cierre; tipos de [DATO] bien
  resueltos según el árbol, con dos [ESQUEMA], sin tres [DATO cifra] seguidas y con
  cuatro tipos distintos; sin rayas, sin conectores de ensayo, sin superlativos
  ajenos al informe, sin rutas internas en "Fuentes:", y "Para salir hoy" integrada
  en la despedida con el tagline cerrando.
