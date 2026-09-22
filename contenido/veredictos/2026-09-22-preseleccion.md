VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-22T04:51:55Z

Correcciones:
1. Dónde: la pieza no tiene sección "## Trabajo y pensiones", "## Salud" ni
   "## Educación", y "## Áreas sin material" dice "Ninguna. Todas las áreas
   activas del barrido aportaron al menos una historia." · Regla: "Barre estas
   áreas y anota al menos una candidata por cada una donde realmente haya algo.
   Si un área viene vacía, escríbelo explícitamente al final", sobre la lista
   "Política · Economía y bolsillo · Seguridad y Justicia · Plata pública ·
   Vivienda y ciudad · Trabajo y pensiones · Salud · Educación · Ciencia y
   tecnología · Medioambiente y clima · Chile en regiones · Internacional" ·
   Debe quedar: las tres áreas con su propia sección, porque el barrido de hoy
   sí trae material y parte ya está en la pieza bajo otro rótulo. Trabajo y
   pensiones: "Finning demanda por $774 millones a un sindicato tras huelga en
   servicios para Escondida" y "Estudio de la UFRO estima un déficit de más de
   37 mil empleos en La Araucanía" y "RN propone US$1.000 millones en subsidios
   para enfrentar el desempleo", hoy en "## Economía" (barrido líneas 348, 378,
   393). Educación: "Comisión del Senado aprueba seis nominaciones al Consejo
   de Educación Pública", hoy en "## Política", "Gratuidad alcanza al 44,9% del
   pregrado de la Universidad de Chile", hoy en "## Ciencia y tecnología", y
   "PISA 2025 y la desilusión meritocrática en la educación chilena", hoy en
   "## Sociedad" (barrido líneas 45, 423, 579). Salud: "Puerto Varas implementa
   la primera red comunal de telesalud rural" y "Cinco clínicas chilenas
   aparecen entre las mejores del mundo por especialidad", hoy en "## Sociedad"
   (barrido líneas 582, 585). Si tras reubicarlas alguna área queda igual sin
   candidata, nómbrala en "## Áreas sin material hoy" en vez de "Ninguna".
2. Dónde: el rótulo "## Sin área", con siete candidatas debajo (desde "El caso
   Letelier-Moffitt cumple 50 años..." hasta "Subtel da 48 horas para bloquear
   37 dominios de apuestas en línea"), y el rótulo "## Economía" · Regla: el
   formato de salida estricto es "## <Área>", y las áreas son las doce que
   nombra COBERTURA OBLIGATORIA · Debe quedar: ninguna sección "Sin área"; esas
   siete candidatas repartidas entre las áreas del prompt (por ejemplo
   Grollmus, Instituto Nacional y Subtel en "## Seguridad y Justicia";
   Steinert y responsabilidad parental en "## Política"; Baquedano en
   "## Vivienda y ciudad"; Letelier-Moffitt en "## Política"), y la sección de
   economía rotulada "## Economía y bolsillo", tal como el prompt escribe el
   área.
3. Dónde: los rótulos "## Áreas sin material" y "## Historias en curso sin
   novedad" · Regla: el prompt fija al final "siempre, tres secciones cortas"
   y las escribe así: "## Áreas sin material hoy", "## Historias en curso sin
   novedad hoy", "## Notas del barrido" · Debe quedar: los dos primeros
   rótulos con la palabra "hoy" al final, exactamente como los escribe el
   prompt. El tercero ya está bien.
4. Dónde: "No se identificaron historias del informe del 21-09 que siguieran
   pendientes sin novedad." · Regla: "## Historias en curso sin novedad hoy
   (temas del informe de ayer que siguen abiertos pero no tuvieron avance;
   sirve para no repetirlos como si fueran nuevos)" · Debe quedar: la lista de
   esas historias. El informe del 21-09-2026 deja abiertas al menos cuatro y
   el barrido de hoy no trae avance de ninguna (búsqueda en
   contenido/barrido/2026-09-22.md de "uso de la fuerza", "Comisión Mixta",
   "Olivar", "convenio marco", "Dipres" y "Pampilla": sin resultados): "La
   Comisión Mixta retomará las Reglas del Uso de la Fuerza el 29 de
   septiembre" (línea 38), "Un proyecto busca abrir al Congreso contratos
   confidenciales de empresas estatales" (línea 42), "Seis detenidos y 88
   teléfonos recuperados tras robos en La Pampilla" (línea 52), "Dipres cifra
   en $10.615 millones el sobregasto de compras por convenio marco" (línea 58)
   y "La Corte mantiene paralizadas las obras de El Olivar" (línea 72).
5. Dónde: "historias del informe del 21-09 que siguieran pendientes" · Regla:
   "Fechas en la prosa como DD-MM-AAAA" · Debe quedar: "21-09-2026" ahí y en
   cualquier otra fecha en prosa. La marca "(cierre pendiente del 21-09)" de la
   candidata de Fiestas Patrias no cambia: esa forma la fija el propio prompt.

Observaciones:
- Para la pieza siguiente: el cierre pendiente que el informe del 21-09-2026
  prometió ("PENDIENTE DE CIERRE: balance final de siniestros y fallecidos de
  Fiestas Patrias | 2026-09-21") entró bien como candidata, pero sus dos cifras
  no tienen el mismo respaldo en el barrido. Los 20 fallecidos aparecen en La
  Tercera (línea 606) y en Radio U. de Chile (línea 609, marcada "alarma: un
  solo medio por ahora"). Los 16 homicidios solo están en Mi Radio (línea 324,
  también alarma de un solo medio), y el barrido trae además "Las Fiestas
  Patrias en Chile dejan 36 muertos entre homicidios y accidentes viales"
  (Tiempo de San Juan, línea 321), que no cuadra con la suma. Conviene
  confirmar el balance con la fuente oficial antes de darlo en cámara.
- Para la pieza siguiente: la candidata "Contraloría detecta 390 funcionarios
  suspendidos por más de un año que siguen recibiendo sueldo" usa la URL
  .../contraloria-detecta-13-funcionarios-publicos-suspendidos-por-mas-de-
  cuatro-anos-por-sumarios-aun-pendientes/. La pieza copió titular y enlace tal
  como venían apareados en el barrido (línea 183), así que no es un error suyo,
  pero hay al menos tres cortes distintos del mismo informe: 390 suspendidos
  por más de un año, los suspendidos por más de cuatro años (La Cuarta, línea
  195) y "89 funcionarios de SLEP siguen suspendidos con sueldo"
  (elobservatodo, línea 186). Hay que abrir la nota y fijar qué cifra
  corresponde a qué universo.
- Para la pieza siguiente: el barrido trae "exdiplomáticos acusan que retiro de
  apoyo del Gobierno dañó la candidatura de Bachelet a la ONU" (líneas 123 y
  597) y "Paulina Vodanovic y fallida candidatura de Bachelet a la ONU" (línea
  93, La Tercera, corroborada en 2 fuentes), y la preselección no las recoge en
  ninguna área ni en las historias en curso (búsqueda de "Bachelet" en la
  pieza: sin resultados). Es la continuación de una historia que el canal ya
  contó y que el 21-09-2026 quedó anotada como sin novedad.
- Para la pieza siguiente: tampoco entró "Álvaro Ortúzar, abogado con vínculos
  a Luis Enrique Yarur, arbitró un caso donde este tiene participación"
  (Interferencia, exclusiva de medio de investigación, línea 603), que es
  conflicto de interés y calza solo en parte con "Compromete fondos públicos o
  el bolsillo de la gente", pero es material de Plata pública que conviene
  mirar.
- El tamaño (51 candidatas), la cuota de regiones y el contrato de archivos
  están bien: ruta contenido/preseleccion/2026-09-22.md, commit "edición
  2026-09-22: preselección" con cuerpo "Tarea: despachador" y un solo archivo
  tocado. No hay rayas largas ni emojis. Nada de esto vuelve en las
  correcciones.
