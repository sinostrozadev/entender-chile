VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-29T05:31:08Z

Correcciones:
1. Dónde: bloque "## La noticia del día", párrafo "El Gobierno presentó un plan por
   uno coma tres billones de pesos que combina obras, subsidios y garantías para
   empresas, con la promesa de superar los cien mil empleos." (una sola frase) ·
   Regla: "1. LA NOTICIA DEL DÍA ... Dos frases, 25 a 35 palabras en total, con su
   [TESIS] o su [DATO] principal como tarjeta (una sola marca) y su [FUENTE]." ·
   Debe quedar: el mismo contenido en DOS frases. El párrafo ya tiene 29 palabras,
   dentro del rango, así que el arreglo es partir la frase o reemplazar parte de
   ella por una segunda, no sumar texto (las ediciones del 26, 27 y 28-09-2026
   quedaron con dos frases y 28 a 32 palabras). Ejemplo de la forma, con datos que
   ya están en el informe: "El Gobierno presentó un plan por uno coma tres billones
   de pesos contra el desempleo. Combina obras, subsidios y garantías para empresas,
   con la promesa de superar los cien mil empleos." (30 palabras, dos frases).

2. Dónde: el guion trae TRES marcas [ESQUEMA]: "[ESQUEMA | Las cuatro líneas del
   plan]" en el bloque "## Chile Despega", "[ESQUEMA | Lo que sigue en la causa]" en
   "## Célula del PCC en Chile" y "[ESQUEMA | Controles sobre el acuerdo]" en
   "## Escudo de las Américas" · Regla: "[ESQUEMA | título] elemento -> elemento ->
   elemento ... Máximo seis elementos, texto breve por elemento. No se narra. Cero a
   dos por edición" · Debe quedar: como máximo DOS [ESQUEMA] en la edición. Conserva
   el de la noticia de portada ("Las cuatro líneas del plan") y uno de los dos de
   proceso, y elimina el tercero dejando su secuencia en la narración del bloque,
   que ya la cuenta en prosa, sin agregar ningún dato que no esté en el informe.

3. Dónde: "[DATO comparacion | La Tercera, 28 sep] desempleo actual: 9,5% ;
   desocupados: 981000" · Regla: del árbol de tipos, "6. Dos o tres valores de cosas
   distintas pero comparables, MISMA unidad -> comparacion. Ej: fallecidos: 797 ;
   desaparecidos: 3048", y "EL TIPO LO DECIDE LA FORMA DEL DATO, no el gusto" ·
   Debe quedar: los dos valores no comparten unidad (uno es un porcentaje y el otro
   un número de personas), así que la marca no puede ser comparacion. Deja una sola
   marca "[DATO cifra | La Tercera, 28 sep]" con el valor principal, el que cambia
   algo para alguien (el desempleo de 9,5%), y el otro valor solo en la narración,
   que ya lo dice ("novecientas ochenta y un mil personas desocupadas"). Aviso para
   que esto no cueste otra vuelta: al hacer el cambio se cae la cuota "con 8 o más
   noticias en la edición ... al menos una de barras, tabla o comparacion", y el
   propio prompt resuelve el orden ("VARIEDAD (capa aparte, DESPUÉS del árbol y
   nunca encima de él)" y "la cuota es una alarma, no una obligación"), así que el
   árbol manda. Si quieres cumplirla igual con material del informe, los dos montos
   de las líneas del plan comparten unidad y sí califican como comparacion: "$91 mil
   millones entre 2026 y 2027 a subsidios de contratación" y "capitalizar el Fogape
   con hasta $300 mil millones" (La Tercera, 28 sep).

4. Dónde: la lista "Fuentes:" del guion, que no incluye "Diario Concepción" aunque
   el bloque "## Lluvias y tormentas en Biobío [clima]" sí se narró · Regla: "Al
   final, bajo 'Fuentes:', lista una línea por cada fuente de las marcas [DATO] y
   [CITA] Y por cada fuente del informe cuyas noticias narraste, tal como aparecen
   en el informe ... una fuente cuyo contenido se narró no puede quedar sin crédito"
   · Debe quedar: agrega la línea "- Diario Concepción, 28-09-2026." La noticia que
   el guion narra en ese bloque está en el informe atribuida a "Dirección
   Meteorológica de Chile y Diario Concepción, 28 sep" (informe, línea 126) y
   "Diario Concepción, 28-09-2026." figura en sus fuentes consultadas (línea 182).

5. Dónde: la lista "Fuentes:" trae dos veces la misma línea, "- ADN Radio,
   28-09-2026." (líneas 165 y 176 del guion) · Regla: "lista una línea por cada
   fuente ... tal como aparecen en el informe" · Debe quedar: una sola línea de ADN
   Radio. La lista se publica tal cual en la descripción de YouTube.

Observaciones:
- Para la pieza siguiente: el informe del 29-09-2026 no trae dato curioso, y la
  estructura del guion lo pide como bloque propio después de "En titulares" (punto
  9, y el punto 8 pone la agenda después de él). El guion hizo lo correcto al no
  inventarlo, porque la fidelidad al informe manda, pero la edición quedó sin ese
  cambio de tono hacia el final. Conviene que el informe incluya un dato curioso, o
  que quede dicho que ese día no hay.
- "Fogape" se pinta en pantalla dentro del [ESQUEMA] del plan una línea antes de
  que la narración lo expanda ("el Fondo de Garantía para Pequeños Empresarios").
  La regla de siglas nombra la marca [FUENTE] y el pie de un [DATO], así que no es
  incumplimiento, pero el espectador lee la sigla antes de oír qué es.
- El bloque "## Proyectos de seguridad [congreso]" cierra con "La discusión se
  trasladó así desde la reacción institucional hacia los proyectos que siguen
  pendientes en el Congreso", que es una formulación de transición y no un hecho ni
  una consecuencia concreta. Está al límite de lo que el prompt pide en
  ANTI-PLANTILLA para el cierre de cada bloque.
- Verificado y sin hallazgos: las cuatro noticias [A] están narradas; las 37
  noticias del informe suenan (11 narradas en 10 bloques y 26 en titulares, sin
  ninguna repetida ni agregada); los 26 titulares están cada uno en su línea, con
  12 palabras o menos, una cifra como máximo y el matiz de anuncio o trámite
  conservado; las 11 marcas [TESIS] tienen 18 palabras o menos y todas llevan su
  línea en blanco después; los 11 bloques de noticia traen [FUENTE] y ni la
  Apertura, ni "En titulares", ni la Agenda, ni el Cierre la llevan; las categorías
  de los bloques son de las doce permitidas y distinguen bien clima (pronóstico de
  Biobío) de emergencia (daños en Mulchén); las cifras habladas respetan el tope de
  tres cifras significativas y van en palabras; no hay rayas largas ni medias, ni
  conectores de ensayo escrito, ni superlativos ajenos al informe (el del dólar sí
  está en el informe); ninguna marca interna del sistema ni ruta del repositorio se
  filtró al guion; el tagline "El resumen sin gritos." cierra y la línea "Para
  salir hoy" quedó integrada en la despedida.
