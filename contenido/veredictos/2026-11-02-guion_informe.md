VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-02T08:52:00Z

Correcciones:
1. Dónde: "La noticia del día", primera frase narrada: "El grupo entró por un
   sector no habilitado." · Regla: "FIDELIDAD TOTAL AL INFORME: Usa
   exclusivamente el contenido del informe de hoy como fuente informativa
   base. NO agregues noticias, datos, opiniones ni predicciones" y "Si
   detectas una inconsistencia evidente, no inventes la corrección: redacta
   de forma prudente sin introducir información que no esté en el informe".
   El informe no afirma ese hecho: dice "Sernatur informó que el grupo habría
   ingresado por un sector no habilitado" (condicional y atribuido), en un
   caso con investigación penal abierta donde ese punto es justamente lo que
   se investiga. El propio guion sí conserva el resguardo tres párrafos más
   abajo ("Los antecedentes preliminares de Sernatur indican que era una
   salida familiar"), así que el problema es solo esta frase. ·
   Debe quedar: la atribución y el modo del informe, por ejemplo "Según
   Sernatur, el grupo habría ingresado por un sector no habilitado." El
   cuerpo narrado de la sección queda en 28 palabras y dos frases, dentro de
   las 25 a 35 que pide la estructura, y Sernatur ya está en "Fuentes:".

2. Dónde: "Carátula 2: Ruta no habilitada / Trece en una balsa" · Regla:
   "Antes de escribirlo, comprueba contra el informe que lo que el gancho
   afirma es exactamente lo que el informe afirma." "Ruta no habilitada"
   afirma como hecho establecido lo mismo que el informe deja en condicional
   y atribuido a Sernatur, y una carátula es lo primero que se ve. ·
   Debe quedar: la atribución dentro del límite de cuatro palabras por línea,
   por ejemplo "Carátula 2: Sernatur: sector no habilitado / Trece en una
   balsa" (cuatro y cuatro palabras, sigue siendo el giro que pide la segunda
   carátula y nombra el objeto, la balsa).

3. Dónde: "Carátula 3: El máximo era seis / Subieron trece personas" · Regla:
   "EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026, Santiago) ... Al menos una
   de las dos líneas tiene que traer el objeto de la noticia (qué cosa, a
   quién) con las palabras del informe" y "PRUEBA DEL GANCHO: si un
   desconocido necesita preguntarte '¿qué?' o '¿de quién?', no es gancho."
   Ninguna de las dos líneas dice de qué se trata: no aparece la balsa, ni el
   río Maipo, ni las fallecidas, y "subieron trece personas" deja al
   espectador preguntando a qué subieron. Las carátulas 1 y 2 sí cumplen. ·
   Debe quedar: el objeto en una de las dos líneas con las palabras del
   informe ("la ordenanza municipal permite hasta seis personas por balsa"),
   por ejemplo "Carátula 3: La balsa permitía seis / Subieron trece personas"
   (cuatro y tres palabras, y la cifra con referencia se sigue entendiendo en
   un segundo).

4. Dónde: "[ESQUEMA | Caminos abiertos por el caso] investigación de Fiscalía
   -> acusación constitucional anunciada -> reforma legal en el Congreso" ·
   Regla: "[ESQUEMA | título] ... Para procesos, jerarquías, niveles o líneas
   de tiempo simples que el informe describa" y control interno 17, "ninguna
   marca lleva un dato que no esté en el informe". Las flechas dibujan en
   pantalla una secuencia donde un paso lleva al siguiente, y el informe
   afirma lo contrario de los tres elementos: "Ambos caminos, la
   responsabilidad política del ministro y el cambio legal, continúan por
   separado." ·
   Debe quedar: o el proceso que el informe sí describe, por ejemplo
   "[ESQUEMA | Cómo se tramitó la rebaja] comisión evaluadora regional ->
   advertencia de la oficina regional -> revisión del nivel central ->
   decreto firmado" (cuatro elementos, todos del informe), o la marca
   eliminada: con el esquema del accidente ya queda uno en la edición, que es
   lo que pide "al menos uno cuando una de las TRES noticias narradas sea de
   proceso", y la variedad visual sigue cumpliendo.

Observaciones:
- La marca "[DATO comparacion | Interferencia, 1 nov] rebajas aprobadas pese a
  advertencias regionales: 11 decretos ; solicitudes rechazadas pese a
  aprobación regional: 22 solicitudes" mezcla dos rótulos de unidad distinta
  (decretos y solicitudes) en una comparación que el árbol pide con la misma
  unidad. No lo cuento como INCUMPLE porque los dos valores cuentan
  resoluciones del mismo trámite y el informe usa las dos palabras, pero la
  tarjeta se lee mejor con la unidad unificada ("solicitudes aprobadas pese a
  advertencias regionales: 11 solicitudes").
- El guion nunca dice cuándo ocurrió el accidente. El informe lo fecha el
  01-11-2026 y el video sale el 02-11-2026, así que quien escuche puede
  entender que fue hoy. No hay referencia temporal relativa, que es lo que la
  regla prohíbe, pero la fecha dicha una vez en el primer bloque lo cierra.
- "con la meta de completar más de setenta y cinco mil entrevistas antes del
  treinta y uno de enero": el informe dice "hasta el 31-01-2027" y que el
  trabajo de campo termina ese día. "Hasta el treinta y uno de enero de dos
  mil veintisiete" calza con el informe y agrega el año.
- "El Gobierno ya suspendió la tramitación de nuevos decretos": el informe lo
  atribuye al Ministerio de Justicia, no al Gobierno en general.
- Para el próximo validador, porque estuvo a punto de costar un hallazgo
  falso: "scripts/validar-tarjetas.js" no cuenta las líneas "[TESIS]" como
  palabras narradas (filtra todo lo que empieza con corchete, línea 90). Con
  ese criterio, que es el que manda el prompt del validador, el cuerpo de "La
  noticia del día" son 25 palabras en dos frases, dentro de las 25 a 35, y el
  total son 474, dentro de 420 a 600. Contando las tesis serían 40 y 532, y
  el reparto orientativo del prompt cuadra con el criterio del script.
