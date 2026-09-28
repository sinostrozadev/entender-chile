VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-28T05:23:49Z

Correcciones:
1. Dónde: línea 53, "[DATO cambio | Descifra, 26 sep] percepción de emergencia
   laboral: 77% -> 87% (sube mal)" · Regla: control interno 17 del prompt,
   "ninguna marca lleva un dato que no esté en el informe", y FIDELIDAD TOTAL
   AL INFORME, "NO agregues noticias, datos, opiniones ni predicciones" · Debe
   quedar: el 77% no aparece en contenido/informes/2026-09-28.md (busqué "77"
   en el archivo completo y no está; la línea 35 solo dice "87% percibe una
   emergencia laboral, 10 puntos más que en julio"). La marca tiene que llevar
   únicamente valores del informe, así que con un solo valor conocido
   corresponde el tipo del árbol fila 7 ([DATO cifra] con 87% y su indicador).
   Si al sacar el tipo "cambio" la edición queda con menos de tres tipos
   distintos, manda la regla que el propio prompt pone encima de la cuota: "la
   variedad NUNCA justifica un dato que no está en el informe ni una tarjeta
   forzada; la cuota es una alarma, no una obligación".
2. Dónde: bloque "## Empleo, economía y seguridad en las encuestas
   [economia]", líneas 54, 57 y 59, que narran ocho cifras (ochenta y siete
   por ciento, diez puntos, nueve coma cinco por ciento, cincuenta y siete,
   treinta y siete, sesenta y siete, veinticinco y treinta y uno por ciento) ·
   Regla: EXTENSIÓN SEGÚN PESO, "En noticias [B], máximo dos cifras habladas",
   y "Las cifras del informe que no se narren pueden conservarse en una marca
   [DATO] para que aparezcan en pantalla" · Debe quedar: el bloque narra a lo
   más DOS cifras habladas (la noticia es [B] en el informe, línea 33). Las
   demás salen de la voz y se quedan en las marcas [DATO] del bloque o
   simplemente no van; ninguna cifra nueva entra a las marcas para reubicarla.
3. Dónde: línea 91, "[DATO comparacion | Senapred, 26 sep] personas aisladas:
   12.303 ; personas damnificadas: 643", seguida en la línea 92 por el párrafo
   de los avisos de tormenta, que no menciona esos números · Regla: la
   definición de [DATO] en el prompt, "Va justo antes del párrafo que menciona
   esos números" · Debe quedar: la marca va inmediatamente antes del párrafo
   que sí narra ese balance (línea 94, "El balance del temporal del sábado
   veintiséis dejó a más de doce mil personas aisladas...").
4. Dónde: línea 129, titular "Dos tiroteos dejan veintisiete fallecidos y
   veintiséis heridos en Sudáfrica." · Regla: EXTENSIÓN SEGÚN PESO, "en cada
   titular, una como mucho [cifra hablada]", y la definición del bloque en el
   punto 9, "El hecho y, si es imprescindible, UNA cifra" · Debe quedar: el
   titular conserva una sola cifra (la de fallecidos, que es la que sostiene
   el hecho) y deja fuera las otras, sin superar las doce palabras.
5. Dónde: línea 102, "Entre ellas aparece la restricción al juego en línea
   anunciada por el presidente Luiz Inácio Lula da Silva", y línea 127, "Lula
   anuncia restricciones al juego en línea antes de las elecciones." · Regla:
   punto 9, "una sección '## En titulares' con UNA frase por cada noticia del
   informe que NO SE NARRÓ", y control interno 3, "Verifica que no hay ningún
   tema narrado dos veces" · Debe quedar: la noticia [B] de Lula (informe,
   línea 149) suena en un solo lugar. Como el guion ya llega al tope de diez
   noticias narradas, lo que corresponde es sacar la mención de la línea 102 y
   dejarla solo como titular.
6. Dónde: línea 5, "Carátula 3: Escudo de las Américas / ¿Qué obliga
   realmente?" · Regla: el formato de salida, "Las tres son enfoques
   distintos: la primera, una PREGUNTA; la segunda, una CONTRADICCIÓN o un
   giro; la tercera, una CIFRA CON REFERENCIA (solo si la cifra se entiende en
   un segundo sin contexto) o un segundo giro si no hay cifra" · Debe quedar:
   la tercera carátula es una cifra con referencia o un segundo giro, no una
   segunda pregunta. Hoy repite el enfoque de la primera ("¿Qué comprometió
   Chile?"), así que las tres no son enfoques distintos. Se mantienen las dos
   líneas separadas por " / " y el tope de cuatro palabras por línea.

Observaciones:
- El bloque "## Tormentas sobre zonas afectadas" está marcado [clima] y su
  tarjeta pinta 12.303 aislados y 643 damnificados. El prompt dice que la
  categoría la decide el tema del bloque, y el tema es el aviso (pronóstico),
  así que no lo cuento como incumplimiento; conviene igual mirarlo, porque el
  mismo prompt advierte que el tono visual de clima es tranquilo y acá la
  tarjeta grande muestra daño ya ocurrido.
- Titular de la línea 120: SAG y CONAF van sin expandir. La regla de siglas
  está escrita para las marcas [FUENTE] y el pie de los [DATO], por eso no es
  incumplimiento, pero el informe sí las expande (línea 91) y "Servicio
  Agrícola y Ganadero" cabe dentro de las doce palabras.
- Línea 102: "decisiones regulatorias y económicas que pueden repercutir en la
  región" es una proyección que el informe no trae; el informe solo dice que
  la medida "agrega regulación económica y social a la agenda de la campaña".
  Si la línea se va al aplicar la corrección 5, el punto queda resuelto.
- Bien resueltos y verificados uno por uno: las tres noticias [A] narradas,
  las veintiséis restantes en titulares con todas menos una dentro de las doce
  palabras, el matiz de lo que todavía no pasa en los titulares, la línea en
  blanco después de cada [TESIS], las once [TESIS] bajo dieciocho palabras, el
  redondeo en voz del balance del temporal, los días de la semana (28 lunes,
  27 domingo, 26 sábado), el tagline exacto y "Para salir hoy" integrada en la
  despedida. Sin rayas, sin conectores de ensayo escrito y sin paréntesis
  fuera de las marcas.
