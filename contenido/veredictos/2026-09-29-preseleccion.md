VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-29T04:56:46Z

Correcciones:
1. Dónde: el encabezado "## Vivienda y ciudad" (línea 59) queda sin ninguna
   candidata debajo, y la sección "## Áreas sin material hoy" (líneas 141 a 143)
   no lo nombra: su única línea dice "Trabajo y pensiones no tuvo una novedad
   independiente del plan laboral y los subsidios ya incluidos", cuando
   "## Trabajo y pensiones" (línea 61) sí trae tres candidatas (líneas 63, 66 y
   69). Las dos cosas nacieron al mover las candidatas que pedía la corrección 4
   de la vuelta 1: en la versión anterior (commit 220c971) "Vivienda y ciudad"
   tenía tres candidatas y "Trabajo y pensiones" no existía como encabezado.
   · Regla: "COBERTURA OBLIGATORIA. Barre estas áreas y anota al menos una
   candidata por cada una donde realmente haya algo. Si un área viene vacía,
   escríbelo explícitamente al final: es información para mejorar el barrido, no
   un fracaso", y el formato de salida "## Áreas sin material hoy / (lista, o
   "ninguna")" · Debe quedar: dos arreglos de una línea cada uno, sin tocar el
   resto de la pieza. Primero, "Vivienda y ciudad" o recibe una candidata o queda
   declarada en "Áreas sin material hoy"; el barrido trae bajo ese rótulo (línea
   412, "## Vivienda y ciudad (8)") el convenio del Minvu para el Parque
   Metropolitano de Puerto Montt, que la pieza ya tiene en la línea 124 bajo
   "Chile en regiones", así que basta moverlo acá o dejar dicho que el área no
   tuvo material propio. Segundo, la línea 143 se borra o se reescribe, porque
   afirma que un área sin material tiene tres candidatas en esta misma pieza.

Observaciones:
- Para la pieza siguiente: siguen fuera de la olla los cinco hechos del barrido
  que ya se anotaron en la vuelta 1, buscados uno por uno en la pieza de esta
  vuelta sin resultado: "Gobierno retira reforma que creaba un nuevo estado de
  excepción" (cero coincidencias de "estado de excepción" en la pieza, una en el
  barrido); "Dominga: Andes Iron desiste de recursos ante la Suprema" (cero y
  tres); "Tribunal de Contratación Pública suspende licitación de comunicaciones
  de la PDI adjudicada a Claro Chile" (cero y una); el paro nacional convocado
  para el 01-10-2026 contra los recortes del Presupuesto 2027, que le pone fecha
  a la movilización de la Confech de la línea 85 de la pieza; y la primera
  emisión de bonos soberanos en francos suizos (cero y dos). Los tres primeros
  cambian reglas o comprometen plata pública.
- Para la pieza siguiente: tres historias siguen entrando dos veces, así que el
  informe puede contarlas como hechos distintos. La auditoría de Contraloría a
  ProEmpleo está en las líneas 53 y 56; los daños por viento en Mulchén, en las
  líneas 104 y 121; y los vuelos entre Punta Arenas y las Malvinas, en las líneas
  129 y 138. El duplicado del plan de empleos, que la vuelta 1 también anotó,
  quedó resuelto. El formato tiene el campo "<medio o medios>" justamente para
  juntar los medios de una misma noticia en un bloque.
- Para la pieza siguiente: la URL de la candidata de Interferencia (línea 135)
  sigue rota, con el ancla HTML codificada tal como viene del barrido. El enlace
  real es
  https://interferencia.cl/articulos/dias-de-las-presidenciales-meta-desactiva-la-cuenta-de-lula-en-medio-de-acusaciones-de
  Es la cuarta vez: quedó anotada en contenido/veredictos/2026-09-28-preseleccion.md
  y en la vuelta 1 de hoy. Conviene arreglarla en el barrido y no una vez por día
  en la pieza.
- Las cuatro correcciones de la vuelta 1 quedaron cumplidas y se verificaron una
  por una. Ninguno de los 38 titulares aparece literal en el barrido (se buscó el
  texto exacto de cada uno, cero coincidencias). Las 38 razones "Por qué podría
  importar" son distintas entre sí, sin ninguna repetida. El bloque de resumen de
  CIPER con tres hechos ya no está: la nota de protesta al embajador de Israel es
  su propia candidata (línea 11), el Escudo de las Américas tiene la suya (línea
  14) y el campo del medio quedó sin el guion suelto. Los encabezados son los
  doce de la lista del prompt, con su nombre exacto, sin "Actualidad" ni
  "Educación y sociedad", y las candidatas que estaban mal clasificadas quedaron
  en su área.
- El cierre pendiente que vencía el 28-09-2026 sigue bien resuelto: la línea 63
  lo trae marcado "(cierre pendiente del 28-09)". El otro, la variación de
  precios de combustibles, vence el 01-10-2026 y la pieza lo deja en "Historias
  en curso sin novedad hoy".
- La olla mantiene 38 candidatas, dentro del rango aceptable de 35 a 60, así que
  no es incumplimiento, pero sigue lejos del objetivo de 50 y baja respecto de
  los días anteriores (57 el 26-09-2026, 60 el 27-09-2026, 53 el 28-09-2026) con
  un barrido de 280 noticias con señal.
- La pieza no trae raya larga ni media (cero coincidencias de U+2014 y U+2013 en
  el archivo completo), las fechas de la prosa están en DD-MM-AAAA, no hay
  preámbulo ni comentario final y las tres secciones finales obligatorias están
  presentes.
