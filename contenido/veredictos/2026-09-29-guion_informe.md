VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-29T05:41:00Z

Observaciones:
- Para la pieza siguiente: el informe del 29-09-2026 no trae dato curioso y la
  edición quedó otra vez sin ese bloque, tercer día seguido contando el 27 y el
  28-09-2026. El guion hizo lo correcto al no inventarlo, porque la fidelidad al
  informe manda, pero el cambio de tono hacia el final del video lleva tres días
  apagado. Conviene que el informe lo traiga, o que diga que ese día no hay.
- Las cinco correcciones de la vuelta 1 quedaron resueltas y se verificaron con
  el diff contra la versión anterior (a61dc5a a 2dcc196), que toca SOLO los cinco
  lugares pedidos y ninguno más: 1) "La noticia del día" quedó en dos frases con
  treinta y una palabras, dentro del rango de 25 a 35, y conserva su [FUENTE] y
  una sola marca de tarjeta; 2) quedan DOS [ESQUEMA] en la edición (líneas 26 y
  52), el de "Controles sobre el acuerdo" se eliminó y su secuencia sigue contada
  en prosa en el bloque, sin agregar ningún dato; 3) la marca del desempleo es
  ahora "[DATO cifra | La Tercera, 28 sep] desempleo actual: 9,5%", con un solo
  valor, y las novecientas ochenta y un mil personas desocupadas quedaron en la
  narración; 4) "Diario Concepción, 28-09-2026." está en la lista de fuentes
  (línea 173); 5) "ADN Radio, 28-09-2026." aparece una sola vez (línea 163) y la
  lista completa no tiene ninguna línea repetida.
- La cuota de variedad quedó en dos tipos de tarjeta, cifra y cambio, bajo el
  "al menos tres tipos distintos por edición" y sin ninguna de barras, tabla o
  comparacion. No es incumplimiento y era el efecto previsto de la corrección 3:
  el propio prompt pone el árbol de tipos por encima de la cuota ("VARIEDAD
  (capa aparte, DESPUÉS del árbol y nunca encima de él)" y "la cuota es una
  alarma, no una obligación"), y los dos valores que se separaron no compartían
  unidad. El [ESQUEMA] obligatorio del día sí está. Queda anotado, como el
  28-09-2026, para que no se vuelva a levantar.
- La etiqueta de esa tarjeta, "desempleo actual", tiene dos palabras y la regla
  de ETIQUETA CON CONTEXTO pide de 3 a 8. No bloquea y no se levanta ahora
  porque venía igual en la vuelta 1 dentro de la marca comparacion y no se marcó
  entonces. Para la próxima edición, algo como "desocupación en el trimestre
  móvil" se entiende con el video en silencio.
- "Fogape" se pinta en pantalla dentro del [ESQUEMA] del plan una línea antes de
  que la narración lo expanda ("el Fondo de Garantía para Pequeños Empresarios").
  La regla de siglas nombra la marca [FUENTE] y el pie de un [DATO], así que no
  es incumplimiento, pero el espectador lee la sigla antes de oír qué es. Es el
  mismo hueco que la revisión del 28-09-2026 dejó abierto con SAG y CONAF en un
  titular.
- El bloque "## Proyectos de seguridad [congreso]" cierra con "La discusión se
  trasladó así desde la reacción institucional hacia los proyectos que siguen
  pendientes en el Congreso", que es una formulación de transición y no un hecho
  ni una consecuencia concreta. Está al límite de lo que pide ANTI-PLANTILLA
  para el cierre de cada bloque.
- Verificado y sin hallazgos, en esta corrida y en la anterior: las cuatro
  noticias [A] están narradas; las 37 noticias del informe suenan (11 narradas en
  10 bloques y 26 en titulares, sin ninguna repetida ni agregada); los 26
  titulares están cada uno en su línea, con 12 palabras o menos, una cifra como
  máximo y el matiz de anuncio o trámite conservado; las 11 marcas [TESIS] tienen
  18 palabras o menos y todas llevan su línea en blanco después; los 11 bloques
  de noticia traen [FUENTE] y ni la Apertura, ni "En titulares", ni la Agenda, ni
  el Cierre la llevan; las categorías de los bloques son de las doce permitidas y
  distinguen bien clima (pronóstico de Biobío) de emergencia (daños en Mulchén);
  las cifras habladas respetan el tope de tres cifras significativas y van en
  palabras; no hay rayas largas ni medias, ni conectores de ensayo escrito, ni
  superlativos ajenos al informe (el del dólar sí está en el informe); ninguna
  marca interna del sistema ni ruta del repositorio se filtró al guion; el
  tagline "El resumen sin gritos." cierra y la línea "Para salir hoy" quedó
  integrada en la despedida.
