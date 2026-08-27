# Ideas para evaluar

(Shorts y Miniaturas → ejecutar.md 2026-08-24. Sello de inicio y mini-gancho
→ hechas.md 2026-08-25. Música → ejecutar.md 2026-08-25: infra lista, falta pista.)

## Acortar el informe a 8-10 min
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** ajustar el prompt del guion para apuntar a 8-10 min (hoy salió 14.7).
- **Valor:** mejor retención (mudo y con tarjetas, 15 min es mucho), habilita
  mid-rolls (>8 min) y baja el costo futuro de TTS a casi la mitad.
- **Esfuerzo:** bajo (editar prompts/guion-informe.md).

## Elección del proveedor de voz clonada
- **Fecha:** 2026-08-24 · **Origen:** Santiago (en evaluación)
- **Qué:** entrenar voz sintética con la voz de Santiago. El pipeline ya
  soporta ElevenLabs (tts-elevenlabs.js + VOICE_ID de clon profesional).
- **Valor:** identidad del canal + cumplir política de YouTube con voz propia.
- **Ojo:** a ~26 min/día de audio (informe+clave) el TTS será el costo
  dominante del experimento → comparar planes con números reales antes de
  decidir; considerar partir con voz solo en el informe.
- **Esfuerzo:** medio (grabar dataset limpio + configurar secrets).

## Franquicia por país 💰💰
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** replicar el pipeline validado con prompts por país: Entender Perú,
  Entender México, Entender Colombia…
- **Valor:** N canales de costo marginal casi cero sobre el mismo código.
- **Esfuerzo:** bajo por réplica, PERO solo tiene sentido después de validar
  Chile. Largo plazo.

(Paso revisor de calidad → evolucionó a "Revisión de calidad automática de
madrugada" en ejecutar.md, 2026-08-24.)


## Fondos por sección (tinte + kicker)
- **Fecha:** 2026-08-24 · **Origen:** Santiago + Claude
- **Qué:** tinte sutil del papel por sección (2-4% saturación) + etiqueta
  permanente en esquina (POLÍTICA, REGIONES…). Un solo acento verde se
  mantiene. La Clave con mundo visual propio.
- **Valor:** sentido de estructura y progreso → retención; identidad
  reutilizable en Shorts.
- **Esfuerzo:** medio-bajo (tema.ts + tarjetas).



## Playlists como series
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** playlists "El informe diario" y "Claves para entender las
  noticias"; las Claves atemporales se prestan al binge.
- **Valor:** el algoritmo premia sesiones largas encadenadas.
- **Esfuerzo:** trivial (configuración en YouTube Studio).

## Formatos de presentación del observatorio de la plata pública
- **Fecha:** 2026-08-25 · **Origen:** Santiago (idea original) + Claude (estructura)
- **Qué:** decidir cómo se publica lo que acumula contenido/casos/. Opciones
  a evaluar, combinables:
  1. Sección mensual tipo REPORTAJE (un día fijo al mes, video especial que
     repasa el estado de todos los casos: qué avanzó, qué se durmió, cuánto
     se ha recuperado).
  2. Mega-informe anual "la cuenta de la plata perdida": suma de montos
     confirmados de todos los casos, comparada con cosas concretas (cuántas
     viviendas, cuántos años de JUNAEB equivalen), con la metodología a la
     vista.
  3. Contador acumulado como tarjeta recurrente en el informe diario cuando
     un caso tenga novedades.
  4. Estadísticas transversales cuando haya masa crítica de casos: por
     institución, por región, por cargo, por partido, tiempo promedio hasta
     sanción, % de dinero recuperado. Con umbral mínimo de casos para no
     inferir de 2 datos.
- **Valor:** convierte el archivo en piezas de alto interés público y
  búsqueda permanente; potencial de viralidad alto con datos duros.
- **Cuidados editoriales (van con la idea):** montos confirmados vs
  reportados siempre separados; presunción de inocencia estricta (el "roban"
  coloquial no puede aparecer: se publica lo que consta en fuentes oficiales
  y su estado procesal); las estadísticas por partido solo con metodología
  explícita y muestra suficiente, o se vuelven munición partidista y rompen
  la identidad apolítica del canal.
- **Esfuerzo:** medio por pieza (el dato ya estará acumulado; el trabajo es
  guion y diseño).

## Pipeline editorial por etapas (la olla explícita)
- **Fecha:** 2026-08-26 · **Origen:** Santiago (idea) + Claude (estructura)
- **Qué:** separar la generación del informe en etapas con artefactos
  commiteados: catálogo de fuentes mantenido por un agente curador, barrido
  que produce una preselección de 30-50 titulares (la traza de lo
  descartado), y priorización con criterio de importancia operativo, público
  objetivo y topes. Propuesta completa en
  estrategia/propuesta-pipeline-editorial.md, con 5 decisiones abiertas.
- **Valor:** por primera vez se puede evaluar la SELECCIÓN de noticias, no
  solo la redacción; el catálogo de fuentes se vuelve auditable y mejorable.
- **Esfuerzo:** medio (2-3 sesiones en fases); costo API diario estimado
  $3-6 USD si generar.js pasa a ser el camino principal.

## Informe completo para la web, informe ajustado para el video
- **Fecha:** 2026-08-27 · **Origen:** Santiago
- **Qué:** que la web publique el informe completo (archivo, bueno para SEO
  y para el lector que quiere todo) y el video trabaje sobre una versión
  más acotada, para que dure 10-12 min en vez de 14.
- **A evaluar antes de construir:** medir primero la edición del 27-08, que
  ya trae el tope de 6 [B]. Puede que el problema esté resuelto. Si no, hay
  tres caminos, de más barato a más caro:
  1. Presupuesto de duración explícito en prompts/guion-informe.md. Hoy dice
     "la duración es la que resulte de aplicar los pesos; no recortes para
     acortar", que es justo lo que produce los 14 min. Cambiarlo por un
     objetivo de 10-12 min y dejar que el guion decida qué comprime.
  2. Marcar en el informe qué bloques son solo para la web (por ejemplo el
     detalle fino de cifras y el contexto largo), que el guion salta.
  3. Dos informes generados por separado. El más caro y el único que puede
     divergir: dos documentos con las mismas noticias y distintas cifras es
     un error esperando ocurrir. Último recurso.
- **Valor:** retención (10-12 min es mejor que 14 para el formato) y la web
  gana profundidad sin costo extra.
- **Esfuerzo:** bajo si es el camino 1; medio si es el 2.

## Pasar el observatorio a GPT (o repartirlo)
- **Fecha:** 2026-08-27 · **Origen:** Santiago
- **Qué:** que la actualización diaria de los dossiers de plata pública la
  haga una tarea de ChatGPT en vez de (o además de) la rutina de Claude en
  la nube de las 03:00.
- **A favor, y es un argumento fuerte:** ChatGPT ABRE las notas completas;
  la nube de Anthropic solo ve extractos de buscador (bloquea La Tercera,
  CNN y otros). El observatorio es justo donde leer el texto íntegro
  importa: un estado procesal mal citado es una querella.
- **En contra:** el observatorio es lo más delicado del canal (nombres,
  situación procesal, presunción de inocencia) y hoy se publica automático
  en la web. Meter una segunda inteligencia con criterios propios en los
  mismos archivos multiplica el riesgo de que algo salga sin revisar.
- **Camino intermedio (recomendado):** repartir por capacidad, no reemplazar.
  Claude detecta (busca novedades y las anota en por-verificar.md, que ya
  existe); GPT confirma abriendo las fuentes y solo entonces el dato entra
  al dossier. Cada uno hace lo que el otro no puede.
- **Requisito previo, cualquiera sea el camino:** decidir el gate humano
  antes de publicar cambios de dossier (hoy pendiente).
- **Esfuerzo:** bajo (es un prompt nuevo y una tarea programada).

## Palabra del día (web)
- **Fecha:** 2026-08-27 · **Origen:** Santiago
- **Qué:** una palabra por día en la web, explicada en dos líneas: qué
  significa, cómo se usa y dónde la viste. Sale de una cola acumulada
  (contenido/palabras/banco.md, 51 palabras ya cargadas) con prioridad a las
  que aparecen en el informe del día. Formato y reglas en
  contenido/palabras/README.md; el lugar que ocupa en el sitio, en
  prompts/web.md.
- **Valor:** media parte de no entender una noticia no es ignorar el tema,
  es no saber qué significa la palabra que la resume. "Dictamen",
  "vinculante" y "gravamen" salen en el informe de cualquier martes. Cuesta
  casi cero producirla y refuerza justo lo que el canal promete.
- **Pendiente de decidir:** quién la escribe (la misma tarea de GPT que hace
  la edición, o una aparte), dónde se muestra en la web (portada, columna del
  informe, página propia con archivo navegable), y si se convierte en Short
  cuando haya voz.
- **Esfuerzo:** bajo. El banco ya existe; falta el generador diario y el
  renderizado en Astro.

## Indicaciones propias para la web
- **Fecha:** 2026-08-27 · **Origen:** Santiago
- **Qué:** prompts/web.md, el equivalente de guion-informe.md pero para el
  sitio: qué publica la web, qué se genera solo para ella, las diferencias de
  forma respecto del guion hablado (cifras en números, sin muletillas de
  locución, subtítulos escaneables, enlaces a la fuente), el criterio de
  título y descripción, y lo que nunca debe llegar al lector.
- **Pendiente:** decidir si el informe de la web debe ser más completo que el
  del video (idea relacionada, ya en este archivo) y quién aplica estas
  indicaciones: hoy el sitio transforma el mismo markdown y nadie las lee.
- **Esfuerzo:** el documento ya está escrito; falta engancharlo al flujo.
