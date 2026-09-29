VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-29T04:50:04Z

Correcciones:
1. Dónde: 34 de las 38 candidatas repiten palabra por palabra el titular del
   barrido. Ejemplos verificados con búsqueda exacta contra
   contenido/barrido/2026-09-29.md: línea 8 de la pieza "Incluyó petición de
   renuncia: Cámara de Diputados realizó inédita interpelación al canciller
   Pérez Mackenna" (línea 42 del barrido), línea 23 "Crimen de carabinero en Lo
   Espejo: las prioridades legislativas en seguridad que Orrego y diputados
   piden al Gobierno" (línea 33 del barrido), línea 116 "840 kilos de residuos
   fueron retirados de playa Loncura en masivo operativo de limpieza".
   · Regla: "- <titular en tus palabras, claro y específico> | <medio o medios> |
   <URL>" · Debe quedar: cada titular reescrito por el editor, sin copiar la
   frase del medio, diciendo el hecho de forma clara y específica. Referencia de
   la casa: en las preselecciones del 27-09-2026 y del 28-09-2026 ninguno de los
   60 y 53 titulares coincidía con una línea del barrido (se buscó el texto
   exacto de cada uno, cero coincidencias).
2. Dónde: las 38 candidatas usan solo 10 frases de plantilla, repetidas literales
   entre noticias sin relación. "Es un hecho nuevo con alcance público y merece
   evaluación en la etapa del informe" aparece 6 veces (líneas 9, 18, 30, 35, 57
   y 117); "Puede afectar la creación de puestos de trabajo, los subsidios de
   contratación y el uso de recursos públicos" 6 veces (líneas 6, 15, 38, 51, 54
   y 62); "Afecta seguridad pública, investigación penal o funcionamiento de
   instituciones de justicia" 5 veces (líneas 21, 24, 43, 84 y 130). Ninguna dice
   a quién afecta, cuánta plata hay en juego ni qué cambia. · Regla: "Por qué
   podría importar: <una frase, concreta: a quién afecta, cuánta plata, qué
   cambia, o qué historia continúa>" · Debe quedar: una frase distinta y propia
   de esa noticia en cada bloque, con el dato concreto que la hace importar
   (quiénes son los afectados, la cifra o el monto si la entrada lo trae, la
   regla que cambia, o la historia que continúa). En la preselección del
   28-09-2026 las 53 razones eran distintas entre sí, ninguna repetida.
3. Dónde: línea 14, "Con énfasis en obras públicas gobierno anuncia plan para
   crear 100 mil empleos; Kast deberá enviar antecedentes del "Escudo de las
   Américas" a la Cámara, y cancillería envió nota de protesta a embajador de
   Israel | - CIPER Chile | ...". Es un resumen de prensa con tres hechos
   distintos en un solo bloque (el plan de empleos, los antecedentes del Escudo
   de las Américas y la nota de protesta a Israel), y el campo del medio trae un
   guion suelto antes del nombre. · Regla: "FORMATO DE SALIDA (estricto, una
   noticia por bloque de dos líneas)" · Debe quedar: la nota de protesta al
   embajador de Israel como su propia candidata en Política con su medio y su
   URL, el bloque del Escudo de las Américas ya está en la línea 26, y el plan de
   empleos ya está en la línea 5, así que ese bloque de resumen se elimina. El
   campo del medio queda "CIPER Chile", sin el guion.
4. Dónde: la sección "## Actualidad" (línea 127) no es un área de la lista del
   prompt, y guarda cuatro candidatas que sí pertenecen a áreas de la lista:
   Hermosilla ante la Fiscalía (línea 129) es Seguridad y Justicia, el caso
   importado de sarampión (línea 132) es Salud, y la cuenta de Lula (línea 135) y
   los vuelos a Malvinas (línea 138) son Internacional. Es la sección "Sin área"
   del barrido (línea 643) copiada tal cual. Por lo mismo quedan mal clasificadas
   la línea 61, "Contrato de aprendizaje: enfrentar el desempleo juvenil", puesta
   en Vivienda y ciudad, la línea 80, "Rabia en Chile", y la línea 83, la
   agresión en el Destacamento Yungay, puestas en "Educación y sociedad", que
   tampoco es el nombre del área. · Regla: "COBERTURA OBLIGATORIA. Barre estas
   áreas (...) Política · Economía y bolsillo · Seguridad y Justicia · Plata
   pública · Vivienda y ciudad · Trabajo y pensiones · Salud · Educación ·
   Ciencia y tecnología · Medioambiente y clima · Chile en regiones ·
   Internacional", con el formato "## <Área>" · Debe quedar: solo encabezados de
   esa lista, con su nombre exacto ("Educación", no "Educación y sociedad"), sin
   "Actualidad", y cada candidata bajo el área que le corresponde por su
   contenido y no por la sección del barrido de donde salió.

Observaciones:
- Para la pieza siguiente: quedaron fuera de la olla cinco hechos del barrido que
  el informe debería evaluar, todos en la sección "Sin área" (líneas 643 a 762
  de contenido/barrido/2026-09-29.md), donde se buscó cada uno en la pieza sin
  resultado: "Gobierno retira reforma que creaba un nuevo estado de excepción";
  "Dominga: Andes Iron desiste de recursos ante la Suprema" (otra línea del
  barrido dice que el proyecto queda rechazado); "Tribunal de Contratación
  Pública suspende licitación de comunicaciones de la PDI adjudicada a Claro
  Chile"; el paro nacional convocado para el 01-10-2026 contra los recortes del
  Presupuesto 2027, que le pone fecha a la movilización de la Confech de la línea
  77 de la pieza; y "Gobierno concreta su primera emisión de bonos soberanos en
  francos suizos". Los tres primeros cambian reglas o comprometen plata pública.
- Para la pieza siguiente: cuatro historias entran dos veces, con lo que el
  informe puede contarlas como hechos distintos. La auditoría de Contraloría a
  ProEmpleo está en las líneas 50 y 53; los daños por viento en Mulchén, en las
  líneas 64 y 67; los vuelos entre Punta Arenas y Malvinas, en las líneas 121 y
  138; y el plan de empleos, en las líneas 5 y 14. El formato tiene el campo
  "<medio o medios>" justamente para juntar los medios de una misma noticia en un
  bloque. La nota del barrido de la línea 153 dice que se eliminaron los
  duplicados evidentes, y estos quedaron.
- Para la pieza siguiente: la URL de la candidata de Interferencia (línea 135)
  está rota otra vez, copiada tal cual del barrido: trae un ancla HTML
  codificada. Decodificada da
  https://interferencia.cl/<a href="/articulos/dias-de-las-presidenciales-meta-desactiva-la-cuenta-de-lula-en-medio-de-acusaciones-de">...
  así que el enlace real es
  https://interferencia.cl/articulos/dias-de-las-presidenciales-meta-desactiva-la-cuenta-de-lula-en-medio-de-acusaciones-de
  Es la tercera vez: la misma falla quedó anotada en
  contenido/veredictos/2026-09-28-preseleccion.md. Conviene arreglarla en el
  barrido y no una vez por día en la pieza.
- La olla trae 38 candidatas, dentro del rango aceptable de 35 a 60, así que no
  es incumplimiento, pero está lejos del objetivo de 50 y baja fuerte respecto de
  los días anteriores (57 el 26-09-2026, 60 el 27-09-2026, 53 el 28-09-2026) con
  un barrido igual de grande, 280 noticias con señal.
- El cierre pendiente que vencía hoy está bien resuelto: la línea 73 del informe
  del 28-09-2026 pide el contenido definitivo y el costo fiscal del plan laboral
  de emergencia con fecha 2026-09-28, y la línea 5 de la pieza lo trae marcado
  "(cierre pendiente del 28-09)". El otro, la variación de precios de
  combustibles (línea 85 del mismo informe), vence el 01-10-2026 y la pieza lo
  deja bien en "Historias en curso sin novedad hoy".
- Tres candidatas de Radio U. de Chile parecen columnas de opinión y no hechos
  nuevos: "Contrato de aprendizaje: enfrentar el desempleo juvenil" (línea 61),
  "La trampa de la distracción digital" (línea 91) y "Chile necesita tomarse en
  serio el bilingüismo" (línea 97). El prompt deja fuera la opinión sin hecho
  nuevo detrás. No se marcan como incumplimiento porque no se pudo comprobar sin
  abrir las notas, y el validador no navega, pero al reescribir la razón de cada
  bloque conviene que quede dicho cuál es el hecho nuevo, y si no lo hay, sacarlas.
- La pieza no trae raya larga ni media (cero coincidencias de U+2014 y U+2013 en
  el archivo completo), las fechas de la prosa están en DD-MM-AAAA y las tres
  secciones finales obligatorias están presentes.
