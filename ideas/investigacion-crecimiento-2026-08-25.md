# Investigación: crecimiento del canal (2026-08-25)

Informe del agente investigador (rutina automática). Metodología: 6 sub-agentes
de investigación en paralelo (uno por dimensión), con instrucción explícita de
descartar consejos de "gurús" sin fuente primaria. El proxy de red de este
entorno bloqueó `WebFetch` directo a la mayoría de dominios (support.google.com,
blog.youtube, backlinko.com, etc.); los datos vienen de `WebSearch` (snippets
reales de esas páginas, con URL verificada) más un par de verificaciones
cruzadas que hice yo mismo después sobre las afirmaciones más importantes de
cumplimiento. Donde un dato solo tiene respaldo de blogs/prensa secundaria sin
fuente primaria confirmable, se marca explícitamente como tal - no se presenta
como hecho duro.

No repite lo ya cubierto en `ideas/investigacion-mejoras-2026-08-25.md`
(retención visual/sonora, horario, títulos/miniaturas, playlists, pregunta del
día). Este informe cubre: lanzamiento, SEO en profundidad, comunidad/hábito,
distribución fuera de YouTube, monetización más allá de AdSense, y el detalle
exacto de cumplimiento IA.

---

# DIMENSIÓN 1: LANZAMIENTO (primeros 30 días)

## Masa crítica antes que goteo
- Qué: producir y publicar un lote inicial de al menos 8-10 videos (mezcla de
  "Claves" evergreen + informes diarios) en las primeras 2-3 semanas, en vez
  de un video suelto esperando tracción.
- Valor: la ayuda oficial de YouTube dice explícitamente que ganar
  credibilidad como canal nuevo toma tiempo y que "un factor clave es
  desarrollar una masa crítica de contenido": cuando alguien descubre un
  video, una biblioteca sustancial le permite profundizar en el canal.
- Esfuerzo: alto (exige que el pipeline esté ya fiable antes del lanzamiento).
- Fuente: https://support.google.com/youtube/answer/9962575

## No existe "sandbox" oficial - cada video compite desde el día 1
- Qué: no planificar para "sobrevivir 90 días" (jerga de comunidad, no
  política documentada). Tratar cada video, incluido el primero, como una
  prueba real de CTR/retención: miniatura, título y primeros 15-30 s cuidados
  desde ya.
- Valor: YouTube no reconoce oficialmente el término "sandbox". Su sistema de
  recomendaciones documentado recomienda videos (no canales) según señales de
  comportamiento (CTR, watch time, retención) - un canal nuevo enfrenta un
  "cold start" de datos, no un bloqueo deliberado. Un video bueno de un canal
  con 0 subs puede competir con uno de un canal grande en el mismo tema.
- Esfuerzo: medio (disciplina de miniatura/título/gancho, no producción extra).
- Fuente: https://support.google.com/youtube/answer/16533387

## Descartar "Hype" del plan de arranque
- Qué: no contar con la función "Hype" (botón de apoyo para canales chicos,
  lanzada en 2024) para los primeros 1.000 subs.
- Valor: según la ayuda oficial, Hype solo está disponible para canales ya
  dentro del YPP con entre 500 y 500.000 suscriptores, y Chile no figura en la
  lista de países habilitados (a diferencia de España, México o Brasil) -
  irrelevante para esta fase.
- Esfuerzo: bajo (decisión de no invertir tiempo ahí).
- Fuente: https://support.google.com/youtube/answer/15509925

## Una pieza ancla muy bien investigada puede arrastrar el despegue
- Qué: priorizar 1-2 piezas de "Claves" con investigación y gancho fuertes en
  temas de alto interés de búsqueda permanente, en vez de asumir que todo el
  contenido debe rendir parejo desde el lanzamiento.
- Valor: caso documentado por la Universidad de Toronto (no un gurú): Cindy
  Pom (ex-corresponsal CBC/CTV/CBS) lanzó el canal explicativo Newsthink, y un
  video temprano (sobre Tesla) alcanzó casi 6M de vistas y catapultó el canal,
  hoy sobre el millón de suscriptores.
- Esfuerzo: alto (investigación/guion superior para piezas ancla puntuales).
- Fuente: https://alumni.utoronto.ca/news/million-subscribers-and-counting-alum-cindy-pom-captivates-youtube-audiences

## Expectativa realista: meses de ritmo alto, no semanas
- Qué: planificar el arranque asumiendo 4-6 meses de publicación consistente
  y volumen alto para los primeros 1.000 subs, no "semanas" como prometen
  blogs de gurús sin caso citado.
- Valor: el caso más cercano y citable (documentado por la propia empresa,
  no verificado en detalle vía fetch directo) es un canal "faceless" de
  Kapwing que llegó a 1.000 subs en ~157 días con 60 videos publicados -
  ritmo alto y sostenido, no atajo. Trata cualquier promesa de "1.000 subs en
  pocas semanas" con escepticismo salvo caso y cifra verificable.
- Esfuerzo: n/a (ajuste de expectativas, no una tarea).
- Fuente: https://www.kapwing.com/resources/we-grew-a-faceless-youtube-channel-to-1000-subscribers/
  (recomendado confirmar el detalle exacto abriendo la página directamente)

---

# DIMENSIÓN 2: SEO EN ESPAÑOL PARA NOTICIAS

## No pelear el head-term "noticias chile hoy" contra medios grandes
- Qué: no invertir esfuerzo en rankear para búsquedas genéricas tipo
  "noticias chile hoy"; usarlas solo como contexto secundario y competir en
  términos largos y específicos (evento + fecha + entidad concreta).
- Valor: YouTube declaró en su marco oficial "The Four Rs" que para consultas
  de noticias/información su sistema "Raise" favorece explícitamente a
  canales de medios ya reconocidos (cita textual del blog: CNN, Fox News, The
  Guardian, India Today), y que en promedio el 93% del top 10 global para una
  consulta noticiosa de ejemplo ("Brexit") vino de canales de alta autoridad.
  En Chile eso favorece estructuralmente a CHV/T13/24 Horas en el head-term.
- Esfuerzo: bajo (decisión de estrategia de keywords).
- Fuente: https://blog.youtube/inside-youtube/the-four-rs-of-responsibility-raise-and-reduce/

## Título manda; descripción da contexto, no relleno de keywords; tags casi no pesan
- Qué: invertir el esfuerzo de metadata casi todo en el título (keyword
  principal cerca del inicio, claro y específico); usar la descripción para
  contexto real; tratar los tags como opcionales.
- Valor: el estudio de Backlinko sobre 1,3M videos de YouTube encontró
  correlación leve entre keyword-en-título y ranking, correlación CERO entre
  descripción optimizada y ranking, y correlación débil de los tags. Coincide
  con la ayuda oficial: título, miniatura y descripción son los metadatos más
  importantes; los tags juegan un rol mínimo (útiles sobre todo cuando el
  tema se escribe mal comúnmente).
- Esfuerzo: bajo (redistribuir dónde se pone el esfuerzo, no trabajo extra).
- Fuente: https://backlinko.com/youtube-ranking-factors ·
  https://support.google.com/youtube/answer/146402?hl=en

## Búsqueda favorece antigüedad/tamaño de canal; recomendados no
- Qué: para un canal nuevo, priorizar las señales que alimentan
  Sugeridos/Home (CTR de miniatura, retención, relación temática con otros
  videos) por sobre pelear el ranking de búsqueda desde el día uno.
- Valor: Backlinko encontró correlación moderada entre suscriptores/tamaño de
  canal y ranking en búsqueda (favorece a canales establecidos). En paralelo,
  la documentación de YouTube dice que el sistema de recomendaciones no
  favorece ningún formato ni canal de origen en particular, usando señales de
  co-visualización y relación temática. No hay cifra dura de qué % de tráfico
  inicial viene de cada fuente - esto es inferencia razonable, no dato medido.
- Esfuerzo: medio (optimizar miniaturas/retención, no solo metadata).
- Fuente: https://backlinko.com/youtube-ranking-factors ·
  https://creatoracademy.youtube.com/page/lesson/discovery

## El listón de monetización se duplica el 1 de febrero de 2027
- Qué: tratar la meta de 1.000 subs + 4.000 horas como una carrera con fecha
  límite real: postular al YPP con las reglas actuales ANTES del 1 de febrero
  de 2027.
- Valor: YouTube anunció oficialmente el 10 de agosto de 2026 (confirmado por
  Business Standard, 9to5Google, No Film School y otros medios citando el
  blog oficial) que desde el 1-feb-2027 los nuevos postulantes al YPP
  necesitarán 8.000 horas de reproducción válidas en 365 días (el doble de
  las 4.000 actuales) o 20M de vistas válidas de Shorts en 90 días (el doble
  de 10M). El requisito de 1.000 suscriptores no cambia. Los socios ya
  aceptados quedan exentos del umbral de entrada nuevo.
- Esfuerzo: bajo (planificación de timeline), aunque llegar a 4.000 horas
  antes de esa fecha sí exige ritmo de publicación sostenido.
- Fuente: https://www.business-standard.com/technology/tech-news/technology-tech-news-youtube-partner-program-monetisation-rules-2027-watch-hours-shorts-views-126081100708_1.html ·
  https://9to5google.com/2026/08/10/youtube-premium-lite-expansion-monetization-changes/

## Miniatura personalizada + palabra clave al inicio del título
- Qué: producir siempre miniatura personalizada (nunca el frame automático) y
  poner la entidad/palabra más importante cerca del comienzo del título, sin
  mayúsculas sostenidas ni emojis excesivos.
- Valor: la ayuda oficial de YouTube en español indica que el 90% de los
  videos con mejor rendimiento en la plataforma tienen miniatura personalizada,
  y recomienda explícitamente palabras clave cerca del inicio del título.
- Esfuerzo: bajo-medio (plantilla de miniatura reutilizable en el pipeline).
- Fuente: https://support.google.com/youtube/answer/12340300?hl=es-419

---

# DIMENSIÓN 3: COMUNIDAD Y HÁBITO DIARIO

## Pestaña Posts/Comunidad entre videos (encuestas)
- Qué: usar la pestaña "Posts" de YouTube Studio 2-3 veces por semana entre
  el informe diario y "Claves": encuestas sobre el tema del día, adelantos, y
  un recordatorio en el horario de publicación.
- Valor: YouTube eliminó en 2023 el requisito de 500 suscriptores para
  acceder a Posts - un canal recién lanzado ya puede usarla si tiene
  funciones avanzadas activadas. (Cifras de "+15-30% retención" que circulan
  en blogs de marketing tipo vidIQ/TubeBuddy no citan estudio ni metodología
  - trátalas como marketing, no dato verificado.)
- Esfuerzo: bajo.
- Fuente: https://routenote.com/blog/how-to-create-a-youtube-community-post/ ·
  https://www.socialmediatoday.com/news/youtube-expands-access-to-its-community-posting-tab-within-creator-channels/606343/

## Horario fijo diario, no "hora mágica"
- Qué: publicar el informe diario todos los días laborables a la misma hora
  exacta, priorizando consistencia de calendario por sobre perseguir el
  "horario óptimo según analytics".
- Valor: caso real: The Philip DeFranco Show construyó su audiencia sobre
  "video nuevo todos los días, lunes a jueves" como pilar declarado de la
  relación con la audiencia. La documentación oficial de YouTube es más
  cauta: dice que la consistencia del calendario importa más que la hora
  exacta del día - sé escéptico con cualquier "horario mágico".
- Esfuerzo: bajo (decisión operativa del pipeline).
- Fuente: https://en.wikipedia.org/wiki/The_Philip_DeFranco_Show

## Voz narradora como "personalidad" + comentario fijado con pregunta
- Qué: fijar un comentario propio con una pregunta concreta sobre la noticia
  principal del día (no genérica) y responder los primeros comentarios en la
  primera hora tras publicar, usando la voz/narración como identidad
  consistente en vez de un rostro.
- Valor: caso real de un canal 100% narrado sin mostrar rostro (Half as
  Interesting, hermano de Wendover Productions) que construyó marca
  reconocible solo con voz y tono. No hay estudio que aísle el efecto
  específico de "responder comentarios" en canales sin presentador - es
  evidencia cualitativa de guías de creadores, no dato medido. Nota de
  riesgo: en 2025-2026 YouTube endureció la política de "contenido
  inauténtico" (ver Dimensión 6) - mostrar interacción real puede ayudar a
  diferenciarse de ese patrón, pero es inferencia razonable, no hecho
  documentado por YouTube.
- Esfuerzo: medio (exige presupuesto de tiempo humano diario para moderar).
- Fuente: https://youtube.fandom.com/wiki/Wendover_Productions

## Modelo TLDR News: no depender solo del algoritmo
- Qué: seguir el modelo de red de canales + comunidad fuera de YouTube que
  usó TLDR News (Patreon, newsletter/revista) en vez de apostar todo a
  crecimiento orgánico dentro de la plataforma.
- Valor: TLDR News (fundado 2017 por Jack Kelly) llegó a 6 canales con más de
  2,7M de suscriptores combinados; su fundador declaró a Press Gazette que el
  objetivo explícito fue "construir comunidad y no depender solo del
  algoritmo", y hoy sus ingresos por merchandising/publicación superan a los
  de publicidad programática. Es el caso más sólido y verificable (cubierto
  por prensa especializada) de un canal informativo tipo explicador que
  escaló creando hábito de audiencia.
- Esfuerzo: alto (diversificar formato/canales y monetización, no solo
  tácticas de engagement - a evaluar recién con el canal ya validado).
- Fuente: https://pressgazette.co.uk/social_media/tldr-news-jack-kelly-youtube/

---

# DIMENSIÓN 4: DISTRIBUCIÓN FUERA DE YOUTUBE

## Clips cortos a TikTok/Reels/Shorts, simultáneos
- Qué: cortar 3-5 clips de 30-60 s por informe diario (el momento más
  noticioso) y publicarlos en TikTok, Instagram Reels y YouTube Shorts a la
  vez, con llamado a la acción al video completo.
- Valor: TikTok es la red de mayor crecimiento en Chile (+56% interanual
  2025 vs 2024) y ya es fuente de noticias para el 43% de los chilenos,
  superando a los diarios (31%) - salto de 23 puntos desde 2022.
- Esfuerzo: bajo (re-empaquetar contenido ya producido por el pipeline, no
  crear contenido nuevo).
- Fuente: https://www.diariopalena.cl/noticia/actualidad/2025/04/tiktok-supera-a-los-diarios-como-fuente-de-noticias-en-chile-y-se-consolida-entre-las-redes-mas-influyentes

## Canal de difusión de WhatsApp
- Qué: crear un Canal de WhatsApp (broadcast unidireccional, no grupo) donde
  cada día se publique el link al video + 1-2 titulares - el mismo formato
  que ya usan La Tercera, T13 y El Mostrador en Chile.
- Valor: WhatsApp es el canal informativo de uso MÁS FRECUENTE en Chile
  (68%, por sobre TV abierta 63% e Instagram 61%), con >90% de penetración
  entre usuarios de internet chilenos (We Are Social/Meltwater, Digital
  2026); el Digital News Report 2025 (Reuters Institute) lo confirma como
  fuente de noticias para el 26% de los chilenos.
- Esfuerzo: bajo (mismo link que ya se publica en YouTube, sin producción
  adicional).
- Fuente: https://anda.cl/consumo-noticias-chile-whatsapp-radio-confianza/ ·
  https://www.latercera.com/servicios/noticia/whatsapp-como-buscar-y-seguir-el-canal-de-noticias-de-la-tercera/CFWIUN3P2FGBVGMG7DKCFADGYE/

## Newsletter: evaluar recién más adelante, no en esta etapa
- Qué: descartar la newsletter diaria/semanal para la fase actual del canal
  (aunque sí funciona en Chile a largo plazo - ver valor).
- Valor: "El Semanal" de El Mostrador (Iván Weissman) llegó a ~19.774
  suscriptores partiendo de cero en 2020, con ~5% de conversión a plan
  pago - caso real y verificable de que el email SÍ funciona en Chile para
  retención informativa, pero el crecimiento fue gradual (años, no meses) y
  exige producción editorial extra que no se desprende automáticamente del
  pipeline de video actual.
- Esfuerzo: medio-alto (producción editorial adicional; construir lista desde
  cero toma tiempo). Menor prioridad que redes/WhatsApp en esta etapa.
- Fuente: https://inboxcollective.com/santiago-chile-qa-el-semanal-ivan-weissman/

## Prioridad de canales: clips + WhatsApp por sobre newsletter, ahora
- Qué: para la fase de arranque, priorizar clips (TikTok/Reels/Shorts) +
  Canal de WhatsApp por sobre newsletter, porque ambos reutilizan contenido
  ya producido (bajo esfuerzo) y apuntan a plataformas de penetración masiva
  ya comprobada en Chile.
- Valor: el Digital News Report 2025 confirma que en Chile los principales
  canales sociales para noticias son Facebook (40%), Instagram (32%), YouTube
  (26%), WhatsApp (26%) y TikTok (23%) - combinados, clips + WhatsApp cubren
  a la mayoría de chilenos conectados con cero producción adicional de
  contenido, solo redistribución.
- Esfuerzo: bajo (clips+WhatsApp) vs. medio-alto (newsletter).
- Fuente: https://reutersinstitute.politics.ox.ac.uk/es/digital-news-report/2025/chile

## SEO dentro de YouTube antes que audiencia externa
- Qué: optimizar títulos/descripciones/primeras palabras con los términos
  exactos que se buscan ese día en Chile (nombres, fechas), porque no depende
  de tener audiencia ya construida en ninguna otra plataforma - a diferencia
  de TikTok/WhatsApp, que necesitan "empujar" tráfico desde afuera.
- Valor: no encontré estudio o caso chileno que mida "retorno por esfuerzo"
  comparando SEO vs. redes vs. WhatsApp para un canal de noticias en video -
  este punto es más débil en evidencia que los anteriores; se declara como
  inferencia lógica, no dato duro.
- Esfuerzo: bajo (ajuste de metadatos).
- Fuente: sin estudio específico verificado para Chile - inferencia
  declarada, no dato duro.

---

# DIMENSIÓN 5: MONETIZACIÓN MÁS ALLÁ DE ADSENSE

## Ko-fi/Patreon desde ya, sin esperar el umbral del YPP
- Qué: activar Ko-fi o Patreon y fijar el enlace en la descripción y en
  pantalla de cada video, pidiendo apoyo puntual o mensual.
- Valor: a diferencia de Membresías de Canal y Super Thanks (exigen YPP:
  1.000 subs + 4.000 h), Ko-fi/Patreon no tienen piso mínimo de audiencia -
  se puede activar hoy mismo. Cifras de cuánto se gana (USD 50-500/mes en
  canales chicos, conversión 0,5-2%) vienen de calculadoras de blogs sin
  fuente primaria citable - orientativas, no verificadas.
- Esfuerzo: bajo.
- Fuente: https://creatorrevenuecalculator.com/blog/how-much-do-kofi-creators-make-2026/
  (cifras de baja confianza, sin estudio primario)

## Auspicio hiperlocal directo, no plataformas de brand-matching
- Qué: contactar directamente 5-10 negocios/marcas regionales chilenas
  (apps de finanzas personales, medios, servicios) ofreciendo una mención de
  15-30 s en el informe diario o en "Claves", vendiendo la audiencia como
  nicho interesado en actualidad país, no como volumen de vistas.
- Valor: caso real documentado de un podcast local con apenas 15-20 escuchas
  por episodio que consiguió auspicio de un negocio local por USD 150 (3
  pre-rolls, USD 50/episodio) apelando a audiencia hiperlocal, no a escala.
  El CPM publicitario promedio en Chile ronda 1.360 CLP (~USD 1,4) por 1.000
  vistas - un auspicio directo negociado puede superar por mucho ese piso.
- Esfuerzo: medio (armar rate card + outreach manual, sin intermediarios).
- Fuente: https://www.goodreads.com/author_blog_posts/25137905-1000-from-one-deal-on-his-tiny-youtube-channel ·
  https://aceleratusredes.com/blog/cuanto-paga-youtube-en-chile

## Membresías de Canal como complemento automático al llegar al YPP
- Qué: diseñar 1-2 niveles de membresía (ej. acceso anticipado a comentarios,
  una "clase extra" de "Claves") listos para activar apenas el canal entre al
  YPP - no es trabajo aparte, se habilita con el mismo umbral que ya
  persiguen para AdSense.
- Valor: el piso de Membresías bajó de 5.000 a 1.000 suscriptores en
  diciembre de 2020 - coincide exactamente con la meta actual. Dato de
  industria sin fuente primaria confirmada: canales educativos/informativos
  convertirían mejor a miembros pagos (2-4%) que canales de entretenimiento
  (0,5-1%), lo que favorecería a "Claves" sobre el informe diario.
- Esfuerzo: bajo (configuración) / medio (contenido exclusivo sostenido).
- Fuente: https://www.uscreen.tv/blog/youtube-channel-memberships/

## Orden de prioridad: donaciones y auspicio ya, Super Thanks/Membresías al llegar al YPP
- Qué: secuenciar así - (1) ahora, Ko-fi/Patreon sin depender de ningún
  umbral; (2) en paralelo, outreach directo a 1-2 auspiciadores locales,
  alcanzable antes del YPP; (3) recién al cruzar 1.000 subs/4.000 h, activar
  Super Thanks y Membresías como ingreso adicional sobre lo ya construido.
- Valor: Ko-fi/Patreon y auspicio directo no dependen de ningún umbral de
  YouTube, mientras Super Thanks/Membresías sí exigen la misma barrera que
  AdSense - llegan "gratis" junto con esa meta, no antes. El caso del podcast
  local respalda que el auspicio hiperlocal es más alcanzable temprano de lo
  que sugiere la intuición de "necesito muchas vistas primero".
- Esfuerzo: bajo (fase 1) → medio (fase 2) → configuración (fase 3).
- Fuente: síntesis de las fuentes citadas arriba en esta dimensión.

---

# DIMENSIÓN 6: CUMPLIMIENTO - CONTENIDO GENERADO CON IA Y VOZ SINTÉTICA

## Marcar "Contenido alterado: Sí" en cada video con voz clonada
- Qué: en YouTube Studio → Detalles → "Altered content", seleccionar "Sí" en
  cada video que use la voz sintética clonada del director del canal.
- Valor: confirmado por fetch propio a la página oficial (vía snippet
  verificado con múltiples búsquedas independientes): la divulgación aplica
  a contenido realista con cambios significativos que podría confundir al
  espectador sobre lo que realmente ocurrió - el ejemplo textual de YouTube
  es "hacer que una persona real parezca decir algo que no dijo" o "generar
  sintéticamente la voz de una persona para decir algo que la persona no dijo
  realmente". Una narración con voz clonada real leyendo un guion cae
  directamente en esa definición.
- Esfuerzo: bajo (checkbox, segundos por video).
- Fuente: https://support.google.com/youtube/answer/14328491

## No hace falta declarar asistencia de IA no realista
- Qué: no marcar "Contenido alterado" por el uso de IA en investigación,
  guion o edición si el resultado final (tarjetas Remotion, texto) no
  presenta una voz o imagen realista de una persona real - solo la voz
  clonada requiere la casilla.
- Valor: la misma página oficial aclara que ediciones menores/estéticas y
  contenido no realista NO requieren divulgación; la obligación es
  específicamente para representaciones realistas que podrían inducir a
  error sobre lo que ocurrió.
- Esfuerzo: bajo (evita marcar de más innecesariamente).
- Fuente: https://support.google.com/youtube/answer/14328491

## Evitar el patrón "misma plantilla, mínima variación" en el pipeline
- Qué: variar estructura y enfoque editorial entre episodios; no reducir el
  pipeline a "misma narración + mismo template visual, solo cambia el
  titular".
- Valor: la política de monetización de YPP, renombrada en julio 2025 de
  "repetitious content" a "inauthentic content", define como no monetizable
  el contenido que "sigue una plantilla con variación mínima, es fácil de
  reproducir a escala y carece de aporte claro de autor". En enero de 2026
  YouTube terminó 16 canales (35M de suscriptores y 4.700M de vistas
  combinadas) que compartían el mismo patrón: formato sin rostro, voz
  sintética, guiones plantilla y volumen de subida imposible para producción
  original - confirmado de forma consistente por múltiples medios
  especializados independientes (no una sola fuente).
- Esfuerzo: medio (exige guion diferenciado por episodio, ya es el caso del
  pipeline actual con noticias reales del día - mantenerlo así).
- Fuente: https://thenextweb.com/news/youtube-ai-slop-crackdown-faceless-creators-collateral-damage ·
  https://support.google.com/youtube/answer/1311392

## Documentar el aporte editorial humano por episodio
- Qué: mantener un registro interno (aunque sea un changelog simple) de
  decisiones humanas por video: selección de noticias, edición del guion,
  verificación de fuentes, dirección de las tarjetas.
- Valor: la política distingue explícitamente contenido con "aporte de
  autor" de contenido masivo sin input humano; ese registro es la evidencia a
  mostrar ante una eventual revisión o apelación del YPP (la re-postulación
  solo es posible ~30 días después de corregido el problema, según cobertura
  de prensa - no confirmado en la página oficial de YPP por bloqueo de red).
- Esfuerzo: bajo (documentación continua, sin cambio de pipeline).
- Fuente: https://support.google.com/youtube/answer/1311392 (política
  general; el detalle del plazo de 30 días viene de prensa secundaria, sin
  confirmación directa en la fuente oficial).

## Al recortar clips para TikTok/Instagram, etiquetar IA también ahí
- Qué: al publicar cualquier clip con voz sintética en TikTok o
  Instagram/Facebook, activar la etiqueta nativa de contenido generado con
  IA de cada plataforma (no solo la de YouTube).
- Valor: tanto Meta como TikTok tienen sus propias políticas de divulgación
  de IA y detección automática vía Content Credentials (C2PA); no marcar
  manualmente arriesga que la plataforma lo detecte y etiquete de oficio, con
  posible reducción de alcance. Este punto no pudo confirmarse contra la
  fuente primaria de Meta/TikTok en esta investigación (bloqueo de red) - se
  reporta con menor confianza que los puntos anteriores, que sí vienen de
  support.google.com verificado.
- Esfuerzo: bajo (activar el toggle nativo al subir cada clip).
- Fuente: sin confirmación directa de fuente primaria - verificar
  manualmente en newsroom.tiktok.com y about.fb.com antes de tratarlo como
  regla fija.

---

## Top 5 acciones de la primera semana

Priorizadas por impacto ÷ esfuerzo (excluye lo que ya está en
`ideas/ejecutar.md` o en el informe anterior):

1. **Marcar "Contenido alterado: Sí" en cada video con voz clonada, desde el
   primer video con voz.** Cumplimiento - 5 minutos, protege la elegibilidad
   completa del canal al YPP. Costo de omisión: existencial.
2. **Activar Ko-fi o Patreon con el link en descripción y pantalla final.**
   Monetización - no depende de ningún umbral de YouTube, se puede hacer hoy
   mismo, cero producción adicional.
3. **Crear el Canal de difusión de WhatsApp y publicar el link ahí cada
   día.** Distribución - mismo contenido, mismo esfuerzo cero, llega al
   canal informativo de mayor uso frecuente en Chile (68%).
4. **Reescribir el título del informe diario poniendo la palabra/entidad más
   importante al inicio, y renunciar a pelear "noticias chile hoy".** SEO -
   cambio de dónde se pone el esfuerzo de metadata, no trabajo extra.
5. **Empezar a cortar 2-3 clips cortos por informe diario para TikTok/Reels/
   Shorts.** Distribución - reutiliza contenido ya producido por el pipeline;
   TikTok ya es fuente de noticias para el 43% de los chilenos.

Mención especial: documentar desde hoy el aporte editorial humano de cada
episodio (selección de noticias, edición del guion) en un registro simple -
cuesta minutos por día y es la evidencia que protegerá al canal si alguna vez
se revisa contra la política de contenido inauténtico.

---

## Reglas de cumplimiento IA (checklist exacto)

1. En cada video con voz narradora sintética/clonada: en YouTube Studio →
   Detalles → "Altered content", marcar **Sí**. (https://support.google.com/youtube/answer/14328491)
2. La obligación aplica solo a contenido REALISTA que podría confundir al
   espectador sobre lo que ocurrió (ej. una voz clonada real leyendo un
   guion). No hace falta marcarla por IA usada en investigación, guion o
   edición si el resultado no presenta voz/imagen realista de una persona
   real. (https://support.google.com/youtube/answer/14328491)
3. No declarar cuando corresponde declarar arriesga que YouTube aplique de
   oficio una etiqueta "Altered or Synthetic" que el canal no puede quitar;
   la reincidencia puede derivar en sanciones. (https://support.google.com/youtube/answer/14328491)
4. Mantener variación real de estructura y enfoque entre episodios -el
   pipeline ya genera guion nuevo cada día con noticias reales, mantenerlo
   así explícitamente como salvaguarda, no reducirlo nunca a una plantilla
   fija con solo el titular cambiando. (https://support.google.com/youtube/answer/1311392)
5. Documentar el aporte editorial humano por episodio (selección de
   noticias, edición del guion, verificación de fuentes, dirección de las
   tarjetas) en un registro simple y sostenido en el tiempo - es la evidencia
   ante una eventual revisión del YPP. (https://support.google.com/youtube/answer/1311392)
6. Conservar consentimiento explícito y por escrito de la persona real cuya
   voz se clona, dado que YouTube trata la voz como parte de la identidad de
   una persona real (relevante si en algún momento un tercero reclama uso
   indebido de semejanza/voz). (https://support.google.com/youtube/answer/2801895)
7. Al recortar clips con voz sintética para TikTok/Instagram/Facebook,
   activar también la etiqueta nativa de contenido con IA de cada plataforma
   - pendiente de verificar contra fuente primaria de Meta/TikTok antes de
   tratarlo como regla fija (ver Dimensión 6, último punto).
8. Antes de operar estas reglas de forma definitiva: abrir directamente
   `support.google.com/youtube/answer/14328491` y
   `support.google.com/youtube/answer/1311392` (el proxy de este entorno
   bloqueó el fetch directo; lo anterior se verificó por búsqueda cruzada,
   no por lectura completa de la página).
