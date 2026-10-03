VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-03T06:54:57Z

Observaciones:
- Para la pieza siguiente: el informe del 03-10-2026 sigue sin sección
  "Agenda de hoy", y lo deja dicho en su bloque interno (línea 258, "Sin
  'Agenda de hoy': el material del día no deja ningún hito con fecha para
  hoy"). Verificado en esta corrida: "agenda" aparece una sola vez en el
  informe y es esa línea. Son tres días seguidos sin el bloque que pide el
  punto 8 de la ESTRUCTURA, y las tres veces con razón, así que no es
  hallazgo del guion. Conviene que el informe recupere la sección cuando el
  material la permita.
- Para la pieza siguiente: la tarjeta de las horas docentes de los Servicios
  Locales de Educación Pública ya había caído por la regla de variedad en el
  veredicto del 02-10-2026 (corrección 5) y volvió a aparecer el 03-10-2026,
  en la misma posición. Quien escriba el guion de mañana debería dejar esa
  cifra en la narración desde la primera vuelta: es la que sobra en el bloque
  de educación, que ya tiene su [TESIS] y su [ESQUEMA].
- La etiqueta "minería" de la línea 92 tiene una palabra, bajo el piso de 3 a
  8 de ETIQUETA CON CONTEXTO. No bloquea: es una marca de varios valores y el
  propio ejemplo del prompt para comparacion usa etiquetas de una palabra
  ("fallecidos: 797 ; desaparecidos: 3048"). Misma observación del 22-09-2026
  y del 02-10-2026.
- La tarjeta de la línea 66 ("19.963 -> 7.207") resuelve con cambio un
  indicador que el informe da en tres momentos (19.963 en 2023, 19.597 en
  2024 y 7.207 en 2025). El árbol tipifica dos momentos y cuatro o más, y no
  dice qué hacer con tres, así que no es incumplimiento: tomar el primero y
  el último es lo que el propio árbol manda mientras lineas no esté
  construida. Conviene que el prompt cierre ese hueco.
- "trescientos veinticuatro unidades" (línea 100) debería concordar en
  femenino, "trescientas veinticuatro unidades". El prompt no lo exige, pero
  la voz lo pronuncia así. Queda igual que en la vuelta 1.
- El bloque de la noticia de portada sigue con menos desarrollo narrado que
  el de la Contraloría, y el prompt pide que la noticia de apertura reciba
  "el mayor desarrollo". No lo marco, por lo mismo que en la vuelta 1: el
  bloque de educación ya narra todo lo que el informe trae de esa noticia, y
  el desnivel viene del informe, que le da cinco párrafos a la Contraloría y
  cuatro a educación. La corrección de esta vuelta no cambió ninguna palabra
  narrada, así que la cuenta es la misma.

Verificado sobre esta versión (commit 722b8da, 06:51 UTC), que es posterior
al veredicto de la vuelta 1 (06:46 UTC). El diff contra la versión validada
trae exactamente dos cambios y son los dos que el veredicto mandó:

1. Corrección 1 resuelta: la tarjeta "[DATO cifra | Radio Universidad de
   Chile, 01 oct] horas docentes que deben reducir los Servicios Locales de
   Educación Pública" quedó borrada y no se reemplazó por otra. La secuencia
   de tipos de tarjeta en el guion es ahora cifra, cifra, cambio, cambio,
   comparacion, cifra, cambio, comparacion, cifra, cifra (líneas 38, 46, 50,
   66, 70, 76, 84, 92, 112 y 120): la racha más larga de [DATO cifra]
   seguidas es de dos, que es lo que permite la regla de VARIEDAD y el
   control interno 17. La cifra quedó en la narración, como manda la propia
   regla, en la línea 28 ("deberán reducir más de cuatro mil horas
   docentes"), y coincide con el informe (línea 21, "más de 4 mil horas
   docentes", 01-10-2026). Tampoco hay dos tarjetas del mismo tipo seguidas
   dentro de un mismo bloque.
2. Corrección 2 resuelta con la anterior: la etiqueta de once palabras
   desapareció junto con su tarjeta, y la sigla SLEP no se pinta en ninguna
   marca del guion.
3. Corrección 3 resuelta: la línea 68 dice ahora "a los más de siete mil
   doscientos de 2025", con el año dicho y no la referencia relativa. El
   informe fecha el dato en 2025 (líneas 7, 91 y 93: "7.207 funcionarios que
   salieron del país con licencia médica durante 2025"), y la cifra no se
   tocó, así que conserva la aproximación y las tres cifras significativas.

Las cuotas de variedad siguen cubiertas después del borrado: un [ESQUEMA]
(línea 30), dos [DATO comparacion] (líneas 70 y 92) y tres tipos distintos
en la edición. Las once [TESIS] están bajo dieciocho palabras (la mayor, la
de la línea 64, tiene dieciocho) y cada una lleva su línea en blanco antes
del párrafo. Los treinta titulares siguen uno por línea y ninguno pasa de
doce palabras. El archivo completo no tiene raya larga ni raya media (cero
coincidencias). Nada más cambió, así que el resto de lo que la vuelta 1
verificó pieza por pieza contra el informe del 03-10-2026 sigue en pie: las
tres noticias [A] narradas, diez narradas en total, las nueve [B] fuera del
corte y las veintiuna [C] con su titular, cada bloque de noticia con su
[FUENTE], las categorías entre corchetes válidas, "Para salir hoy"
integrado en la despedida y "El resumen sin gritos." como última frase
hablada.
