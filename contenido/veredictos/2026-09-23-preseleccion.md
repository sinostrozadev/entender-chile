VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-23T04:52:00Z

Correcciones:
1. Dónde: la pieza no tiene ninguna sección "## Economía y bolsillo" (sus
   secciones de área son Política, Seguridad y Justicia, Plata pública,
   Vivienda y ciudad, Trabajo y pensiones, Salud, Educación, Ciencia y
   tecnología, Medioambiente y clima, Chile en regiones, Internacional), y
   sin embargo "## Áreas sin material hoy" dice "ninguna" ·
   Regla: "COBERTURA OBLIGATORIA. Barre estas áreas y anota al menos una
   candidata por cada una donde realmente haya algo: Política · Economía y
   bolsillo · Seguridad y Justicia · ... Si un área viene vacía, escríbelo
   explícitamente al final" ·
   Debe quedar: una sección "## Economía y bolsillo" con al menos una
   candidata, en el formato de dos líneas del prompt. Hay material en la
   entrada: contenido/barrido/2026-09-23.md trae "## Economía (18)", con
   "Dólar cierra en $947,7 tras sesión volátil marcada por cobre, petróleo y
   discurso de Trump en la ONU" (Revista Digital Minera REDIMIN, corroborada
   en 2 fuentes), "El precio del petróleo y el dólar en Chile vuelve a caer a
   la espera de acercamientos entre Irán y Estados Unidos" (latercera.com) y
   "Bajar la inflación no alcanza para crecer" (Infobae). Ninguna de las tres
   aparece hoy en la pieza (búsquedas de "Econom", "ólar", "etróleo" y
   "nflaci" en contenido/preseleccion/2026-09-23.md: cero coincidencias).
   Con la sección agregada, "Áreas sin material hoy: ninguna" queda correcta y
   no hay que tocarla. La pieza tiene hoy 50 candidatas y el rango aceptable
   llega a 60, así que sumar una a tres no rompe el tamaño.

Observaciones:
- Para la pieza siguiente: el barrido del día deja cifras de mercado que el
  informe necesitará si toca economía: dólar en $947,7 al cierre del
  22-09-2026, con petróleo y cobre en la misma sesión.
- Para la pieza siguiente: la crisis de empleo fue el eje político del día en
  el barrido (Martorell de RN pidiendo "piñerizar" el gobierno, la respuesta
  del Frente Amplio, y Kast diciendo en la ONU que "la economía aún no despega
  y el desempleo se mantiene alto"). La pieza recoge solo la propuesta de
  subsidio de RN, en Trabajo y pensiones.
- Para la pieza siguiente: las dos candidatas de clima ("Un río atmosférico
  extremo podría dejar más de 200 milímetros de lluvia en el sur" y "El primer
  temporal de primavera activa alertas por lluvias de hasta 105 milímetros en
  seis regiones") podrían ser el mismo sistema frontal. Conviene verificarlo
  antes de narrarlas como dos eventos distintos.
- El resto de la pieza cumple: 50 candidatas (objetivo del prompt), formato de
  dos líneas con medio y URL en las 50, las tres secciones de cierre presentes,
  cuota de regiones holgadamente superada, sin rayas largas, sin emojis y
  fechas en prosa en DD-MM-AAAA.
- Verificado lo que la pieza afirma en "Notas del barrido": el barrido de hoy
  existe y su commit es 4d9e26e, hay tres candidatas con URL de senado.cl, y
  contenido/informes/2026-09-22.md no contiene ninguna línea "PENDIENTE DE
  CIERRE" (búsqueda explícita, cero coincidencias), así que no había candidatas
  obligatorias por cierre pendiente. Las cinco historias en curso listadas
  están todas en el informe de ayer.
