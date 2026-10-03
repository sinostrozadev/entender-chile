VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-03T06:46:01Z

Correcciones:
1. Dónde: líneas 28, 40 y 48, las tres seguidas sin otra tarjeta entre ellas:
   "[DATO cifra | Radio Universidad de Chile, 01 oct] horas docentes que deben
   reducir los Servicios Locales de Educación Pública: más de 4.000 (baja
   mal)", "[DATO cifra | El Litoral, 02 oct] personas detenidas en la marcha de
   la Alameda: 17" y "[DATO cifra | CIPER, 02 oct] recursos del Programa Sitios
   de Memoria: -25,3% (baja mal)" · Regla: VARIEDAD, "nunca más de dos [DATO
   cifra] seguidas en el guion", y control interno 17, "Variedad visual: no hay
   más de dos [DATO cifra] seguidas" · Debe quedar: a lo más dos [DATO cifra]
   seguidas. El árbol está bien aplicado en las tres (un solo valor cada una),
   así que corresponde lo que manda la propia regla, "deja la cifra sobrante en
   la narración": borra la tarjeta de la línea 28 y no la reemplaces por otra,
   porque la línea 30 ya narra esa cifra ("deberán reducir más de cuatro mil
   horas docentes"). Con eso quedan las de las líneas 40 y 48 seguidas, que
   cumplen, y el bloque de educación se queda con su [TESIS] y su [ESQUEMA].
2. Dónde: línea 28, la etiqueta "horas docentes que deben reducir los Servicios
   Locales de Educación Pública", de once palabras · Regla: ETIQUETA CON
   CONTEXTO (obligatorio), "la etiqueta dice QUÉ es la cifra y EN QUÉ
   SITUACIÓN, en 3 a 8 palabras" · Debe quedar: si al resolver la corrección 1
   borras esta tarjeta, esta corrección queda resuelta con ella y no hay nada
   más que hacer. Si en cambio conservas esta tarjeta y borras otra de las
   tres, la etiqueta tiene que caber en ocho palabras sin usar la sigla SLEP,
   que no está expandida en ninguna parte del guion y se pintaría en pantalla
   sin acreditar: "horas docentes a reducir en la educación pública" (ocho
   palabras).
3. Dónde: línea 70, "a los más de siete mil doscientos del año pasado" · Regla:
   "La FECHA EXACTA manda: si el informe da la fecha de un hecho, nunca la
   reemplaces por 'esta semana', 'hace unos días' o 'recientemente'", y regla
   dura 35, "Nunca 'ayer' ni 'la semana pasada' en un texto que se lee después"
   · Debe quedar: el año dicho, no la referencia relativa. "a los más de siete
   mil doscientos de 2025". El informe fecha el dato en 2025 ("salieron del
   país con licencia médica durante 2025") y el video queda publicado, así que
   "el año pasado" se desfasa solo. La cifra no se toca: "más de siete mil
   doscientos" conserva la aproximación y las tres cifras significativas.

Observaciones:
- Para la pieza siguiente: el informe del 03-10-2026 sigue sin sección "##
  Agenda", como el del 02-10-2026, así que el guion cerró otra vez sin el
  bloque que pide el punto 8 de la ESTRUCTURA, y esta vez con razón. Lo
  verifiqué sobre esta versión del informe: "agenda" aparece una sola vez, en
  la línea 258, y es dentro del comentario interno que explica justamente que
  no hay hitos con fecha para hoy. Los dos hitos con fecha que trae el informe
  quedaron dentro de sus bloques (el Informe de Finanzas Públicas del
  06-10-2026, líneas 32 y 34 del guion, y el Imacec de septiembre del 02-11-2026,
  línea 96). No es hallazgo del guion, pero son tres días seguidos: conviene
  que el informe recupere la sección cuando el material la permita.
- Para la pieza siguiente: la tarjeta de las horas docentes de los Servicios
  Locales de Educación Pública es la misma que la corrección 5 del veredicto
  del 02-10-2026 mandó borrar, por esta misma regla de variedad, y volvió a
  aparecer hoy. Si la cifra no cabe en tarjeta, su lugar es la narración.
- El bloque de la noticia de portada suma 307 palabras narradas contando "La
  noticia del día" (32 más 275), y el de la Contraloría, 422. El prompt pide
  que la noticia de apertura reciba "el mayor desarrollo" y acá no lo tiene. No
  lo marco como incumplimiento, por dos razones que verifiqué: el bloque de
  educación ya narra todo lo que el informe trae de esa noticia (la beca "Yo
  elijo mi PC", el ingreso del 30-09-2026, el alza de 1,5%, Arzola, Quiroz y el
  derecho a educar, el Colegio de Profesores, el Frente Amplio, la cita de
  Sichel, el antecedente de CIPER, las horas docentes de los SLEP y el trámite
  del 06-10-2026), así que ampliarlo exigiría inventar, y el desnivel viene del
  informe, que le da cinco párrafos a la Contraloría y cuatro a educación.
  Queda anotado porque es la segunda vez: el 22-09-2026 los dos bloques
  quedaron empatados en 286 y 289 palabras.
- La etiqueta "minería" de la línea 94 tiene una palabra, bajo el piso de 3 a 8
  de ETIQUETA CON CONTEXTO. No bloquea: es una marca de varios valores y el
  propio ejemplo del prompt para comparacion usa etiquetas de una palabra
  ("fallecidos: 797 ; desaparecidos: 3048"). Es la misma observación que quedó
  el 22-09-2026 y el 02-10-2026.
- La tarjeta de la línea 68 ("19.963 -> 7.207") resuelve con cambio un
  indicador que el informe da en tres momentos (19.963 en 2023, 19.597 en 2024
  y 7.207 en 2025). El árbol tipifica dos momentos y cuatro o más, y no dice
  qué hacer con tres, así que no es incumplimiento: tomar el primero y el
  último es lo que el propio árbol manda cuando lineas no está construida.
  Conviene que el prompt cierre ese hueco.
- "trescientos veinticuatro unidades" (línea 102) debería concordar en femenino,
  "trescientas veinticuatro unidades". El prompt no lo exige, pero la voz lo
  pronuncia así.

Verificado sobre esta versión, pieza por pieza y contra el informe del
03-10-2026: las tres noticias [A] narradas y ninguna omitida; diez noticias
narradas en total, que es el tope combinado; las nueve [B] fuera del corte y
las veintiuna [C] del informe, treinta en total, con su titular, una por línea,
"Y en titulares:" sola en su línea y ninguna sobre doce palabras (la más larga,
doce); las once [TESIS] bajo dieciocho palabras, cada una con su línea en
blanco; cada bloque de noticia con su [FUENTE], incluida "La noticia del día",
y sin [FUENTE] en Apertura, En titulares, Dato curioso y Cierre; las doce
categorías entre corchetes válidas y sin corchete en los bloques de estructura;
"La noticia del día" en dos frases y 32 palabras, dentro del rango de 25 a 35,
con una sola marca de tarjeta; la Apertura en 38 palabras, con la fecha y tres
asuntos de "En una mirada" que no repiten la portada; las tres carátulas en dos
líneas de cuatro palabras o menos, con pregunta, contradicción y segundo giro;
"Clima de carátula: institucional", que calza con un proyecto de ley; un
[ESQUEMA] y dos [DATO comparacion], que cubren las cuotas de ocho o más
noticias, con tres tipos distintos en la edición; ningún tema narrado dos veces
(la segunda línea de "¿En qué quedó?" del informe es una remisión a la [A] de
"Plata pública" y el guion no la narra, que es lo correcto); los valores de las
marcas en numerales y los números del texto narrado en palabras, con las cifras
grandes redondeadas y bajo las tres cifras significativas; los superlativos
atribuidos tal como los trae el informe ("la mayor caída de la minería en
treinta años", de Ex-Ante); "Para salir hoy" integrado en la despedida; "El
resumen sin gritos." como última frase hablada; sin conectores de ensayo
escrito, sin "no solo X, sino Y", sin paréntesis en la prosa narrada y sin raya
larga ni raya media en el archivo completo (cero coincidencias). La lista
"Fuentes:" no trae ninguna ruta interna del sistema y acredita las fuentes de
las marcas y las que el guion nombra en prosa.
