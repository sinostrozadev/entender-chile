VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-20T05:08:47Z

Correcciones:
1. Dónde: línea 131, "El Mineduc confirma el inicio de las vacaciones de verano
   el 4 de diciembre para parte de los estudiantes" · Regla: "Fechas en la prosa
   como DD-MM-AAAA" (REGLAS DE ESTILO de prompts/seleccion.md, y regla dura 35)
   · Debe quedar: "el 04-12-2026" en lugar de "el 4 de diciembre". Es la única
   fecha de la pieza fuera de formato: las otras ya van así ("antes de las 10:00
   del 20-10-2026" en la línea 83, "el jueves 22-10-2026" en la 170). Con la
   marca que pide la corrección 2, la línea queda "- El Mineduc confirma el
   inicio de las vacaciones de verano el 04-12-2026 para parte de los
   estudiantes (sin confirmar) | El Observatodo | (la misma URL)".
2. Dónde: líneas 131 ("El Mineduc confirma el inicio de las vacaciones de
   verano...", El Observatodo), 139 ("Un estudio con participación chilena
   conecta por ADN a Rapa Nui con Hawái y llega a la portada de Science", El
   Periodista) y 162 ("El Ministerio de Minería pide extremar medidas y
   suspender trabajos en la minería por el riesgo de aluviones", Editorial RN)
   · Regla: "Sí marca con "(sin confirmar)" cualquier candidata que venga de una
   sola fuente dudosa o de un medio que no reconozcas" (VERIFICACIÓN EN ESTA
   ETAPA) · Debe quedar: "(sin confirmar)" al final del titular, antes de la
   primera barra, igual que en las ocho candidatas que ya la llevan. Las tres
   vienen de un solo medio y de uno que no está entre los de referencia: en
   contenido/barrido/2026-10-20.json solo El Observatodo trae las vacaciones
   (una sola coincidencia buscando "vacaciones de verano", "4 de diciembre" y
   "calendario escolar"), solo El Periodista el estudio de Rapa Nui (una sola
   buscando "Hawái", "Science" y "poblamiento") y solo Editorial RN la
   instrucción del Ministerio de Minería (una sola buscando "Minería",
   "Sernageomin", "suspender trabajos" y "seguridad minera"), las tres con
   repeticiones 1 y sin motivo_destaque. Es el mismo criterio con que la pieza
   marcó a Sabes.cl, PressLatam y TemucoDiario.cl. Además, la nota de la línea
   233, que dice "Ocho candidatas van marcadas "(sin confirmar)"", pasa a decir
   once y suma a su enumeración El Observatodo (las vacaciones), El Periodista
   (el estudio de Rapa Nui) y Editorial RN (el Ministerio de Minería).

Observaciones:
- Para la pieza siguiente: quedaron fuera de la olla los tres polígonos de
  seguridad que el Gobierno definió en la Región Metropolitana por el sistema
  frontal (La Tercera, cuatro medios, repeticiones 4 en el JSON del barrido,
  https://www.latercera.com/nacional/noticia/gobierno-establece-tres-poligonos-de-seguridad-en-la-rm-ante-sistema-frontal-y-llama-a-la-precaucion-en-zonas-de-riesgo/).
  Es la medida operativa del día y sirve justo para el cierre pendiente del
  20-10: el listado de los polígonos lo tiene la Delegación Presidencial
  Metropolitana.
- Para la pieza siguiente: tampoco entró la inversión de más de $34 mil
  millones que el Gobierno proyecta en obras para generar empleo en la Región
  de Valparaíso (G5noticias y UCV radio, repeticiones 3). Es plata pública,
  empleo y región, las tres cosas que el canal sigue, y el monto habría que
  sacarlo del Gobierno Regional o de la Dirección de Presupuestos.
- Para la pieza siguiente: la crítica de Mario Marcel al plan de empleo "Chile
  despega" viene en cuatro medios (ADN Radio, repeticiones 4) y la pieza la
  menciona solo de pasada, dentro del "por qué podría importar" de la línea 30.
  Si el informe usa a Marcel para el Fondo E, conviene no confundir las dos
  declaraciones del mismo día.
- Para la pieza siguiente: las tres discrepancias que la propia pieza deja
  anotadas en la línea 227 hay que cerrarlas con fuente primaria y no entre
  medios: los detenidos y lesionados del fin de semana del 18-O (Carabineros y
  la Subsecretaría del Interior), los milímetros caídos (Dirección
  Meteorológica de Chile) y el número de comunas sin clases (Mineduc, con la
  hora de la última versión del listado). El PENDIENTE DE CIERRE del informe
  del 19-10-2026 pide el balance de precipitaciones, o sea lo medido, no el
  pronóstico.
- La nota de la línea 233 dice que la prórroga del estado de excepción (La
  Tercera) y el incendio del galpón en la Zofri (24horas) son "las dos anotadas
  como alarma de un solo medio en el barrido". El barrido anota así la prórroga
  (línea 679 de contenido/barrido/2026-10-20.md) y la alerta roja, que la traen
  siete medios con titulares distintos, entre ellos SoyChile.cl, que es la
  candidata de la línea 153. El incendio de la Zofri no aparece en
  contenido/barrido/2026-10-20.md (cero coincidencias de "Zofri") y en el JSON
  viene con motivo_destaque nulo: entró por el JSON, no como alarma. No
  bloquea, pero conviene decirlo bien porque esa nota es la que el informe lee
  para saber qué está corroborado.
- Los 40 milímetros de la línea 156 se citan desde Diario El Pulso cuando el
  mismo dato lo traen El Mostrador y Radio Agricultura, que son más
  reconocibles. El formato acepta "medio o medios": citar el más fuerte le
  ahorra trabajo al informe.
- Las seis fuentes institucionales sin feed de contenido/barrido/fuentes.json
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público) no se abrieron y la pieza lo declara en la línea 234, como
  corresponde a quien no navega. Quedan para el informe el dictamen de
  Contraloría por el vacío legal de las licencias médicas, citado por su
  número, y el informe del Banco Central o de Aduanas por el récord de
  exportaciones.
- Lo que sí quedó verificado, para que la corrección no lo toque: el formato de
  dos líneas en las 58 candidatas, sin una sola excepción; las 58 URLs existen
  en contenido/barrido/2026-10-20.json con el mismo medio declarado; las doce
  áreas de cobertura obligatoria con candidata y "Áreas sin material hoy" en
  "ninguna"; el tamaño, 58, dentro del rango 35 a 60 y declarado en la última
  línea; la cuota de regiones con ocho regiones fuera de la Metropolitana; las
  tres secciones finales en su orden; la candidata obligatoria del PENDIENTE DE
  CIERRE presente y marcada "(cierre pendiente del 20-10)" en la línea 83; las
  dos líneas EN SEGUIMIENTO del informe del 19-10-2026 resueltas, una como
  candidata y otra en las historias sin novedad; cada "(corroborada en N
  fuentes)" calza una por una con el campo repeticiones del barrido; y
  scripts/revisar-mecanico.js sin hallazgos (sin rayas, sin referencias
  relativas, sin emojis).
