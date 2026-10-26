VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-26T06:00:25Z

Observaciones:
- Para la pieza siguiente: el cálculo propio del informe (los 56 decretos en
  187 días, uno cada 3,3 días, informe línea 32) quedó narrado pero sin marca
  en pantalla, porque la cuota de variedad obligó a dejarlo solo en la voz. Es
  el dato a escala humana del día y en el video no se ve. Si un informe futuro
  vuelve a traer un solo dato así en el bloque más cargado de cifras, conviene
  darle una forma que no compita con la tarjeta principal del bloque.
- La etiqueta "rentabilidad real del Fondo E en 2026" de la línea 47 acompaña a
  un valor que el informe mide entre el 01-01-2026 y el 30-09-2026, no a doce
  meses. Está dentro de las 3 a 8 palabras y la narración da el periodo exacto,
  así que no bloquea, pero en pantalla y en silencio "en 2026" se lee como año
  completo. "a septiembre de 2026" cabe igual, y es la tercera vuelta que lo
  anoto: vale dejarlo escrito para la edición de mañana y no repetirlo.
- El bloque de la noticia de portada sigue siendo el que menos se desarrolla de
  los tres, 110 palabras narradas contra 177 del bloque de las rebajas y 128
  del de las AFP. Igual que el 22-09-2026 y el 03-10-2026 no lo marco: el
  desnivel viene del informe, que le da tres párrafos a Brasil y cuatro a las
  rebajas, y el bloque narra todo lo que el informe trae de esa noticia. Si el
  informe de mañana reparte así, el arreglo es comprimir el segundo bloque, no
  estirar el primero.
- Las 177 palabras narradas del bloque de las rebajas quedan sobre el tramo de
  110 a 160 del reparto, que el prompt da como orientativo y por eso no
  bloquea.
- Para mí, no para GPT: esta pieza costó dos vueltas y la segunda la causé yo.
  En la vuelta 1 mandé borrar el [ESQUEMA] de la línea 38, que era justamente
  el que cortaba la racha de tarjetas cifra, y al sacarlo dejé tres [DATO
  cifra] seguidas que antes no existían. Borrar el [ESQUEMA | Etapas del
  proceso] en su lugar habría cerrado la pieza en una sola vuelta. La regla de
  convergencia pide verificar la redacción propuesta contra la misma regla;
  falta verificarla también contra las otras cuotas que el borrado toca, y eso
  es lo que no hice. Mientras scripts/validar-tarjetas.js corte la racha con
  "cualquier otra tarjeta", borrar un [ESQUEMA] que vive entre dos tarjetas
  cifra nunca es la opción barata.

Verificado sobre el commit 10028d2 de la pieza ("edición 2026-10-26: guion
informe", cuerpo "Tarea: despachador" y "Vuelta: 2", un solo archivo, el suyo),
con el informe del 26-10-2026 como entrada, leído completo.

El único INCUMPLE de la vuelta 2 está resuelto y lo hizo exacto: el diff entre
8b8c7b3 y 10028d2 es una sola línea borrada, la marca "[DATO cifra | Cadem,
25-10-2026] desaprobación presidencial durante la crisis: 66%", sin tocar el
párrafo que la seguía. GPT eligió la primera de las dos salidas que el veredicto
autorizaba. El 66% se queda en la narración de la línea 39, donde el informe lo
respalda (informe línea 30), y Cadem sigue en la lista de "Fuentes:" porque la
prosa la nombra, que es lo que el prompt exige. Que ese párrafo quede sin marca
es lo que manda la propia regla de variedad, así que no es hallazgo.

El borrado no introdujo nada: scripts/validar-tarjetas.js imprime "variedad OK:
ninguna cuota rota, ninguna marca malformada" sobre 4 bloques con fuente, con
cifra 3, esquema 2 y comparacion 1, de modo que se cumplen los tres límites de
la capa de variedad (ninguna racha de más de dos cifra, ninguna repetición de
tipo dentro de un bloque y dos tipos distintos con cuatro o más tarjetas).
scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos", sin referencias
temporales relativas.

Lo demás, recomprobado sobre esta versión: 488 palabras narradas, unos 3,6
minutos, dentro de 420 a 600; "La noticia del día" 33 palabras (tope 25 a 35)
con una sola marca y su [FUENTE]; la apertura 31 (25 a 40), que sitúa la fecha
y adelanta las otras dos noticias sin repetir la ya dada; el cierre 56 (40 a
60). Selección correcta: el informe trae tres noticias [A] y el guion narra esas
tres, con la portada de Brasil primera, sin cuarta sección de noticia y sin "En
titulares", Dato curioso, Agenda ni "¿En qué quedó?". Las tres [TESIS] tienen 16
palabras cada una, bajo el tope de 18, y las tres llevan su línea en blanco
antes del párrafo narrado (líneas 19, 31 y 44); cada bloque de noticia trae su
[FUENTE], incluida "La noticia del día", y las tres categorías entre corchetes
son de las doce de la lista. Cero rayas largas y cero rayas medias en el archivo
completo; ninguna URL en el texto narrado ni en las marcas; ningún conector de
ensayo escrito.

Fidelidad verificada dato por dato contra el informe: 51,79% y 48,21% (informe
líneas 5 y 16), la diferencia de 4.430.191 votos narrada redondeada con "unos" a
tres cifras significativas y exacta en la marca, la extensión de las 17:00 a las
19:00 pedida por las dos campañas (líneas 18 y 20), los 56 decretos bajo la Ley
19.856 (línea 26), el promedio de 3,3 días con su salvedad de que no fue
uniforme (línea 32), el 66% de desaprobación de Kast en Cadem (línea 30), el
procedimiento contra las siete AFP por los fondos D y E (línea 50) y el -10,39%
del Fondo E entre el 01-01-2026 y el 30-09-2026 (línea 52). El informe no trae
sección "Análisis", así que no corresponde ninguna marca [INTERPRETACIÓN].
Ninguna marca lleva un dato que el informe no traiga, y ningún comparativo ni
superlativo que el informe no afirme.

Cierre y encabezado: el cierre dice con sus palabras que el informe completo
está en el enlace de la descripción, integra la línea "Para salir hoy" del
informe (capa liviana y algo impermeable en Santiago) y termina con el tagline
exacto "El resumen sin gritos." como última frase hablada. El título nombra la
portada y repite su cifra, 51,79%, que es la que la tarjeta de "La noticia del
día" muestra grande. Las tres carátulas son de la portada, con dos líneas de
cuatro palabras o menos cada una, los tres enfoques pedidos (pregunta,
contradicción y cifra con referencia) y el objeto de la noticia en una de las
dos líneas de cada una. "Clima de carátula: internacional" es una de las seis
palabras vigentes y calza con la portada. La lista de "Fuentes:" cubre las
fuentes de todas las marcas, las de las tres noticias narradas y Agência Brasil,
que se nombra en la prosa, y no cuela ninguna ruta interna del sistema: buscar
"contenido/" y ".md" en el archivo no devuelve nada.
