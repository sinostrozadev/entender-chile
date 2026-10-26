VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-26T05:54:44Z

Correcciones:
1. Dónde: línea 39, "[DATO cifra | Cadem, 25-10-2026] desaprobación
   presidencial durante la crisis: 66%", que ahora queda pegada a
   "[DATO cifra | Interferencia, 25-10-2026] rebajas de condena tramitadas en
   2026: 56 decretos" de la línea 32, dentro del mismo bloque "## Las 56
   rebajas fuerzan una reforma [congreso]", y que además deja tres [DATO
   cifra] corridas en el guion con la de la línea 48 · Regla: "VARIEDAD (capa
   aparte, DESPUÉS del árbol y nunca encima de él): nunca más de dos [DATO
   cifra] seguidas en el guion; nunca dos tarjetas del mismo tipo seguidas
   dentro del mismo bloque ... si el árbol está bien aplicado, deja la cifra
   sobrante en la narración" (scripts/validar-tarjetas.js marca las dos cosas:
   "línea 39: dos cifra seguidas en el bloque" y "línea 48: tercera [DATO
   cifra] seguida") · Debe quedar: borrada la marca completa de la línea 39,
   sin tocar el párrafo que la sigue. El sesenta y seis por ciento se queda
   solo en la narración, donde ya está dicho: "la desaprobación del presidente
   José Antonio Kast llegó a sesenta y seis por ciento". Si prefieres conservar
   la cifra en pantalla, la ÚNICA alternativa que también cumple es dejar la
   línea 39 exactamente así, con los dos valores que el informe da en su línea
   30 y la fila 6 del árbol (dos valores de cosas distintas, misma unidad):
   "[DATO comparacion | Cadem, 25-10-2026] aprobación de Kast en la crisis: 29%
   ; desaprobación de Kast en la crisis: 66%". Cualquiera de las dos, no las
   dos ni una mezcla. Las dos las corrí yo contra el script antes de escribir
   esta línea y las dos dan "variedad OK: ninguna cuota rota". Borrar en cambio
   la marca de la línea 48 NO sirve: deja igual las dos cifra seguidas del
   bloque del congreso.

Observaciones:
- Esta corrección la causé yo en la vuelta 1 y conviene que quede escrito. Las
  dos correcciones de esa vuelta eran exigibles (tres [ESQUEMA] contra un tope
  de dos, y dos [DATO cifra] seguidas en el bloque del congreso), y GPT las
  ejecutó exactas: el diff entre e17a8eb y 8b8c7b3 son esas dos líneas
  borradas y nada más. El problema fue CUÁL [ESQUEMA] mandé a borrar. El de la
  línea 38 anterior era el que separaba las tarjetas cifra del bloque del
  congreso de la del Fondo E, y al sacarlo la racha quedó en tres, porque
  "cualquier otra tarjeta corta la racha" en scripts/validar-tarjetas.js. Si en
  la vuelta 1 hubiera mandado borrar el [ESQUEMA | Etapas del proceso] en vez
  de ese, con la misma segunda corrección la pieza quedaba limpia de una sola
  vez: lo verifiqué sobre el archivo. La regla de convergencia pide verificar la
  redacción que uno propone contra la misma regla; falta verificarla también
  contra las OTRAS cuotas que el borrado toca, y eso es lo que no hice.
- El bloque de la noticia de portada sigue siendo el que menos se desarrolla de
  los tres, 110 palabras narradas contra 177 del bloque de las rebajas y 128
  del de las AFP. Igual que el 22-09-2026 y el 03-10-2026 no lo marco: el
  desnivel viene del informe, que le da tres párrafos a Brasil y cuatro a las
  rebajas, y el bloque narra todo lo que el informe trae de esa noticia.
- Las 177 palabras narradas del bloque de las rebajas quedan sobre el tramo de
  110 a 160 del reparto, que el prompt da como orientativo y por eso no
  bloquea. Esta corrección no cambia ninguna palabra narrada.
- La etiqueta "rentabilidad real del Fondo E en 2026" de la línea 48 acompaña a
  un valor que el informe mide entre el 01-01-2026 y el 30-09-2026, no a doce
  meses. Está dentro de las 3 a 8 palabras y la narración da el periodo exacto,
  así que no bloquea, pero en pantalla y en silencio "en 2026" se lee como año
  completo. "a septiembre de 2026" cabe igual.

Verificado sobre el commit 8b8c7b3 de la pieza, que es su versión vigente en
main, con el informe del 26-10-2026 como entrada, leído completo. Las dos
correcciones de la vuelta 1 están resueltas y no vuelven: quedan dos marcas
[ESQUEMA] (líneas 25 y 51), que cumple el tope de cero a dos y el mínimo de al
menos una con noticias de proceso, y la marca del promedio de 3,3 días ya no
está, con su cifra solo en la narración. El único INCUMPLE es el de arriba y lo
introdujo mi propia corrección. Lo demás se volvió a comprobar sobre esta
versión: 488 palabras narradas, unos 3,6 minutos, dentro de 420 a 600;
scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos"; cero rayas
largas y cero rayas medias en el archivo completo; ninguna URL ni paréntesis en
el texto narrado y ningún conector de ensayo escrito. Selección correcta: el
informe trae tres noticias [A] y el guion narra esas tres, con la portada de
Brasil primera, sin cuarta sección de noticia y sin "En titulares", Dato
curioso, Agenda ni "¿En qué quedó?". Las tres [TESIS] tienen 16 palabras cada
una, bajo el tope de 18, y las tres llevan su línea en blanco antes del párrafo
narrado; cada bloque de noticia trae su [FUENTE], incluida "La noticia del día".
Fidelidad verificada dato por dato contra el informe: 51,79% y 48,21% (líneas 5
y 16), la diferencia de 4.430.191 votos narrada redondeada con "unos" a tres
cifras significativas, la extensión de las 17:00 a las 19:00 pedida por las dos
campañas (líneas 18 y 20), los 56 decretos bajo la Ley 19.856 (línea 26), el
promedio de 3,3 días con su salvedad de que no fue uniforme (línea 32), el 66%
de desaprobación de Kast en Cadem (línea 30), el procedimiento contra las siete
AFP por los fondos D y E (línea 50) y el -10,39% del Fondo E entre el
01-01-2026 y el 30-09-2026 (línea 52). El informe no trae sección "Análisis",
así que no corresponde ninguna marca [INTERPRETACIÓN]. El cierre son 56
palabras, con el enlace al informe de la web, la línea "Para salir hoy" del
informe integrada (capa liviana y algo impermeable en Santiago) y el tagline
exacto como última frase hablada. Las tres carátulas son de la portada, con dos
líneas de cuatro palabras o menos cada una y los tres enfoques pedidos, y
"Clima de carátula: internacional" calza con la portada. La lista de "Fuentes:"
cubre las fuentes de todas las marcas, las de las tres noticias narradas y
Agência Brasil, que se nombra en la prosa, y no cuela ninguna ruta interna del
sistema: la búsqueda de "contenido/" y de ".md" en el archivo no devuelve nada.
