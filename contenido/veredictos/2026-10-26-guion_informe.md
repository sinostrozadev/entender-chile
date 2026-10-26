VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-26T05:46:31Z

Correcciones:
1. Dónde: las tres marcas [ESQUEMA] de la pieza, en la línea 25
   ("[ESQUEMA | Qué viene en Brasil]"), la línea 38 ("[ESQUEMA | Reforma
   propuesta] evaluación de Gendarmería -> revisión judicial -> decisión de
   garantía") y la línea 53 ("[ESQUEMA | Etapas del proceso]") · Regla:
   "[ESQUEMA | título] ... Cero a dos por edición, y OBLIGATORIO al menos uno
   cuando una de las TRES noticias narradas sea de proceso" · Debe quedar: dos
   marcas [ESQUEMA] como máximo en la edición. Borra la de la línea 38 y deja
   las otras dos exactamente como están. Es la que sobra por dos motivos
   verificables: sus dos últimos elementos nombran el mismo paso (la revisión
   judicial la hacen los jueces de garantía), y todo su contenido ya está
   narrado en el párrafo que la sigue, que dice que el proyecto saca al
   Ministerio de Justicia de la decisión, entrega la revisión a jueces de
   garantía y mantiene la evaluación técnica de Gendarmería. No agregues ni
   muevas nada más: con dos esquemas se sigue cumpliendo el mínimo obligatorio
   para las noticias de proceso.
2. Dónde: línea 35, "[DATO cifra | Interferencia, 25-10-2026] intervalo
   promedio entre rebajas tramitadas: 3,3 días", que viene inmediatamente
   después de "[DATO cifra | Interferencia, 25-10-2026] rebajas de condena
   tramitadas en 2026: 56 decretos" de la línea 32, dentro del mismo bloque
   "## Las 56 rebajas fuerzan una reforma [congreso]" · Regla: "VARIEDAD
   (capa aparte, DESPUÉS del árbol y nunca encima de él): nunca más de dos
   [DATO cifra] seguidas en el guion; nunca dos tarjetas del mismo tipo
   seguidas dentro del mismo bloque ... si el árbol está bien aplicado, deja
   la cifra sobrante en la narración" (scripts/validar-tarjetas.js lo marca:
   "línea 35: dos cifra seguidas en el bloque") · Debe quedar: borrada la
   marca completa de la línea 35, sin reemplazarla por una tarjeta de otro
   tipo y sin tocar el párrafo que la sigue. La cifra se queda solo en la
   narración, donde ya está dicha: "entre el once de marzo y el trece de
   septiembre se tramitó, en promedio, una rebaja cada tres coma tres días".
   El árbol está bien aplicado en las dos marcas (un valor cada una, así que
   cifra es el tipo correcto), de modo que lo que corresponde es dejar la
   sobrante en el texto, no cambiarle el tipo ni inventar un dato con que
   variar. Que ese párrafo quede sin marca es lo que la propia regla manda.

Observaciones:
- El bloque de la noticia de portada es el que menos se desarrolla de los
  tres: 110 palabras narradas contando su [TESIS], frente a 177 del bloque de
  las rebajas y 128 del de las AFP. Sumando "La noticia del día" la portada
  llega a 143 y sigue debajo. El prompt pide que la noticia de portada reciba
  "el mayor desarrollo", pero no lo marco, por lo mismo que el 22-09-2026 y el
  03-10-2026: el desnivel viene del informe, que le da tres párrafos a Brasil
  y cuatro a las rebajas, y el bloque narra todo lo que el informe trae de esa
  noticia. Si el informe de mañana vuelve a repartir así, conviene comprimir
  el bloque segundo antes que estirar el primero.
- Las 177 palabras narradas del bloque de las rebajas quedan sobre el tramo de
  110 a 160 del reparto, que el prompt da como "Reparto orientativo" y por eso
  no bloquea. La corrección 2 no cambia ninguna palabra narrada; si quieres
  acercarlo al tramo, el lugar es el párrafo del promedio de 3,3 días, que es
  el menos cargado de hechos nuevos.
- "El costo político ya aparece en Cadem" nombra la encuestadora sin su
  categoría. No es incumplimiento: la regla de nombres propios cubre los que
  suenan a persona o a cargo, y Cadem no es ninguno de los dos. Aun así "la
  encuesta Cadem" se entiende de inmediato en voz, y el guion ya lo hace bien
  con el resto.
- La etiqueta "rentabilidad real del Fondo E en 2026" acompaña a un valor que
  el informe mide entre el 01-01-2026 y el 30-09-2026, no a doce meses. Está
  dentro de las 3 a 8 palabras y la narración sí da el periodo exacto, así que
  no bloquea, pero en pantalla y en silencio "en 2026" se lee como año
  completo. "a septiembre de 2026" cabe igual.

Verificado sobre el commit e17a8eb de la pieza, que es su versión vigente en
main ("edición 2026-10-26: guion informe", un solo archivo), con el informe
del 26-10-2026 como entrada. La lectura empezó en el commit anterior, 76c1901,
y GPT repusheó la pieza a las 02:39 de Chile, mientras yo leía: el diff entre
las dos versiones es una sola palabra, la [TESIS] de la línea 18 pasó de
"Bolsonaro" a "Flávio Bolsonaro", que es como lo nombra el informe. Esa tesis
queda en 16 palabras, bajo el tope de 18, y el resto del archivo es idéntico
byte a byte. Las dos correcciones de arriba se volvieron a comprobar sobre
e17a8eb y siguen en las mismas líneas: tres [ESQUEMA] en 25, 38 y 53, y las
dos tarjetas cifra pegadas en 32 y 35. El largo tampoco se movió: 488 palabras
narradas. Selección correcta: el informe trae tres noticias [A]
y el guion narra esas tres, con la portada de Brasil primera, sin cuarta
sección de noticia y sin "En titulares", Dato curioso, Agenda ni "¿En qué
quedó?". Largo dentro de rango: 488 palabras narradas, unos 3,6 minutos según
scripts/validar-tarjetas.js. scripts/revisar-mecanico.js imprime "sin
hallazgos mecánicos", la búsqueda de raya larga y raya media sobre el archivo
completo no devuelve nada, y tampoco aparecen conectores de ensayo escrito ni
paréntesis o símbolos en el texto narrado. Fidelidad verificada dato por dato
contra el informe: 51,79% y 48,21%, la diferencia de 4.430.191 votos narrada
redondeada con "unos", la extensión horaria hasta las 19:00 pedida por las dos
campañas, los 56 decretos bajo la Ley 19.856, el promedio de 3,3 días con su
salvedad, el 66% de desaprobación de Cadem, el procedimiento contra las siete
AFP y el -10,39% del Fondo E. Las tres [TESIS] tienen 15, 16 y 16 palabras,
cada una con su línea en blanco antes del párrafo; cada bloque de noticia trae
su [FUENTE]; el cierre son 56 palabras con el enlace a la web, la línea "Para
salir hoy" integrada y el tagline exacto como última frase. El informe no trae
sección "Análisis", así que no corresponde ninguna marca [INTERPRETACIÓN]. Las
tres carátulas son de la portada, con dos líneas de cuatro palabras o menos
cada una y los tres enfoques pedidos, y "Clima de carátula: internacional"
calza con la portada. La lista de "Fuentes:" cubre las fuentes de todas las
marcas, las de las tres noticias narradas y Agência Brasil, que se nombra en
la prosa, y no cuela ninguna ruta interna del sistema.
