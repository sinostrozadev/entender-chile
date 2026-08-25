# Investigación: mejoras en visual, sonido y audiencia (2026-08-25)

Informe del agente investigador (sesión local). Metodología: se descartaron
benchmarks de gurús sin fuente primaria; lo que sigue se apoya en
documentación oficial de YouTube y ElevenLabs, estudios académicos, prensa
verificable y canales reales observables.

---

# DIMENSIÓN 1: VISUAL

## Cold open: el dato antes del sello
- Qué: invertir el orden de apertura en Remotion: primero 3-5 s con la
  tarjeta del dato más fuerte del día (cifra grande en Fraunces + una línea
  de contexto), DESPUÉS el sello de 2,8 s. El sello primero es un peaje de
  retención en el momento más frágil del video.
- Valor: la retención de los primeros 30 s es la señal temprana más fuerte
  para el algoritmo (benchmark industria: >70-75% a los 30 s). Que el primer
  plano cumpla la promesa del título es recomendación explícita de YouTube.
  Logo primero es TV, no TLDR ni Un Mundo Inmenso.
- Esfuerzo: bajo (reordenar composiciones).
- Fuente: https://support.google.com/youtube/answer/12340300?hl=es-419 ·
  https://www.lenostube.com/en/youtube-audience-retention-average-good-and-best-benchmarks/

## Regla programada de los 5-7 segundos
- Qué: ninguna tarjeta ópticamente muerta más de ~6 s. Regla de código:
  subrayado que se dibuja, cifra con count-up, palabra que cambia a pátina,
  segunda línea con delay. Un lint del pipeline puede verificar ≥1 keyframe
  cada 6 s por composición.
- Valor: consenso de industria (cambio visual cada 5-7 s en informativo).
  Matiz: audiencias 35+ retienen PEOR con zooms/whooshes en cada frase - la
  sobriedad es ventaja: micro-movimiento, no pirotecnia. Pattern interrupts
  grandes cada 30-60 s.
- Esfuerzo: bajo (interpolaciones; el lint es medio).
- Fuente: https://www.overseeros.com/blog/youtube-retention-architecture-2026 ·
  https://air.io/en/youtube-hacks/advanced-retention-editing-cutting-patterns-that-keep-viewers-past-minute-8

## Gráficos que se construyen, no que aparecen
- Qué: componentes Remotion reutilizables: barras que crecen, líneas que se
  dibujan, cifras count-up (con easing), en la paleta del canal, para 1-2
  momentos ancla de datos por video. La animación ES el contenido.
- Valor: respaldo académico real: Greussing et al. 2020 (Science
  Communication, eye-tracking): dataviz animada en noticias genera mayor
  engagement y aprendizaje; "Hooked on Data Videos" (ACM AVI) midió mejora
  de enganche con animación de datos.
- Esfuerzo: medio (3-4 componentes una vez, luego gratis para siempre).
- Fuente: https://dx.doi.org/10.1177/1075547020962100 ·
  https://dl.acm.org/doi/pdf/10.1145/3206505.3206552

## Estructura TLDR: 1 historia grande + 3 breves, siempre igual
- Qué: fijar el esqueleto del diario: gancho → historia principal (~4 min)
  → 3 breves (~1 min c/u) → dato curioso → cierre. Mismos banners, mismo
  orden, todos los días: el espectador predice la forma del video.
- Valor: TLDR News (~3,8M subs en red, ~£1M/año) prueba que en noticias sin
  cara retiene el tono neutro + formato consistente + disciplina diaria.
  TLDR Daily usa literalmente este esqueleto.
- Esfuerzo: bajo (plantilla de guion; los banners existen).
- Fuente: https://pressgazette.co.uk/social_media/tldr-news-jack-kelly-youtube/ ·
  https://www.youtube.com/@TLDRdaily

## Pictogramas mínimos: una idea por tarjeta
- Qué: set de esquemas monocromos (tinta + acento): mapa de Chile con región
  destacada, flechas de flujo (plata → AFP → pensión), siluetas simples.
  SVG parametrizados en Remotion. No es footage: es diagramación.
- Valor: The Paint Explainer pasó 1M subs en ~1 año con dibujos estáticos
  mínimos + narración clara; Un Mundo Inmenso (+1M subs, ~7,2M vistas/mes)
  hace geografía sin presentador con mapas didácticos. Texto + esquema +
  voz alcanza; texto solo es más frágil.
- Esfuerzo: medio.
- Fuente: https://vidiq.com/youtube-stats/channel/@thepaintexplainer/ ·
  https://youtube.fandom.com/es/wiki/Un_Mundo_Inmenso

---

# DIMENSIÓN 2: SONIDO

## Pipeline de mezcla: ducking automático y -14 LUFS
- Qué: cuando llegue la voz, codificar la mezcla en el pipeline (ffmpeg
  sidechaincompress + loudnorm): música 20-30 dB bajo la voz (ducking
  automático), master a ~-14 LUFS. Check de QA que imprima el LUFS de cada
  render y falle si se desvía.
- Valor: YouTube normaliza a ~-14 LUFS (mezclar más fuerte no gana nada).
  La queja #1 en informativo es "la música tapa la voz"; el ducking
  programático la elimina de raíz.
- Esfuerzo: bajo (una vez, en código).
- Fuente: https://mytasker.com/blog/the-complete-guide-to-sound-design-for-video-creators ·
  https://www.dl-sounds.com/how-to-mix-voice-and-music-in-videos/

## Paleta sonora por tipo de tarjeta
- Qué: kit de 5-6 SFX sutiles mapeados a componentes: tick por paso de
  count-up, whoosh corto (<300 ms) al cambiar sección, pop leve del dato
  curioso, acorde del logo al cierre. El SFX se dispara desde el código:
  sincronía sonido-visual a frame exacto, gratis en nuestro stack.
- Valor: Audacy/Veritonic 2023: el branding sonoro sube recall 14%. Las
  transiciones sonoras son señalética entre segmentos. Regla: mismo sonido
  = mismo significado, siempre.
- Esfuerzo: medio (curar el kit; integrar es trivial).
- Fuente: https://www.soundstripe.com/blogs/sonic-branding-for-podcasts ·
  https://www.podcastvideos.com/sound-design-for-creators-building-your-own-audio-branding-kit/

## Sello sonoro también al cierre
- Qué: cerrar cada video con versión corta (1-1,5 s) del logo sonoro sobre
  la tarjeta final. Mismo motivo musical, no uno nuevo.
- Valor: sonic branding consistente: al inicio prepara, al cierre ancla la
  marca ("suena a Entender Chile"). Costo casi nulo: el activo ya existe.
- Esfuerzo: bajo.
- Fuente: https://www.audiobrain.com/sonic-logos

## ElevenLabs bien hecho: v2 + stitching + guion pre-normalizado
- Qué: (1) Multilingual v2, NO v3 (más estable en long-form; el request
  stitching no existe en v3); (2) trocear en chunks de 500-800 chars con
  previous_text/next_text para prosodia continua; (3) pre-normalizar en el
  pipeline: números en palabras y diccionario de pronunciación chilena
  (Ñuñoa, Biobío, UF, AFP, Fonasa); (4) seed fijo + clip de referencia
  "dorado" aprobado para comparar cada tanda.
- Valor: todo es documentación oficial de ElevenLabs. Los errores típicos
  en español (números anglicados, nombres propios) se resuelven en el guion
  ANTES del TTS - o sea, en nuestro pipeline.
- Esfuerzo: medio (plomería de pipeline, una vez).
- Fuente: https://elevenlabs.io/docs/eleven-api/guides/how-to/text-to-speech/request-stitching ·
  https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

## Cambio de cama musical a mitad del video
- Qué: dos camas por video (o una con variación de intensidad): cambio de
  energía al pasar de la historia principal a las breves (~min 4-5).
  Programable: el pipeline sabe dónde está ese corte.
- Valor: el "music shift" es un pattern interrupt documentado que resetea
  atención sin tocar el minimalismo visual. Barato e invisible.
- Esfuerzo: bajo.
- Fuente: https://air.io/en/youtube-hacks/advanced-retention-editing-cutting-patterns-that-keep-viewers-past-minute-8

---

# DIMENSIÓN 3: AUDIENCIA (Chile/LatAm)

## Posicionamiento: el TLDR chileno no existe
- Qué: en YouTube Chile las noticias dominan pero en vivo y opinión
  (Mega/T13/CHV/24H; Sin Filtros peak 40K concurrentes; El Líbero 194K y
  FPP 279K son opinión con cara). NO existe un resumen diario neutro,
  tipográfico, de 8 min. Posicionarse como "el resumen sin gritos" - en
  tagline, descripción y tarjetas de cierre.
- Valor: hueco verificable en rankings; Digital News Report 2025: 26% de
  los chilenos ya se informa por YouTube y crece el video de creadores; la
  confianza en noticias en Chile subió 4 puntos.
- Esfuerzo: bajo (posicionamiento y copy).
- Fuente: https://reutersinstitute.politics.ox.ac.uk/es/digital-news-report/2025/dnr-resumen-ejecutivo ·
  https://www.totalmedios.com/nota/62624/ranking-streaming-chile-cuales-fueron-los-canales-en-vivo-mas-vistos-en-youtube-durante-2025 ·
  https://hypeauditor.com/top-youtube-news-politics-chile/

## Horario: 06:30-07:00 Chile, y validar con datos propios en 4 semanas
- Qué: publicar el diario 06:30-07:00, antes del traslado matinal, siempre
  a la misma hora exacta. A las 4 semanas, YouTube Studio → Audiencia →
  "Cuándo están tus espectadores" y ajustar con NUESTRO dato.
- Valor: escepticismo con "horas mágicas universales". Para un producto de
  hábito matinal importa (a) estar publicado ANTES de la ventana y (b) la
  regularidad de reloj (el ingrediente clave según TLDR). La fuente válida
  del horario fino es la analítica propia.
- Esfuerzo: bajo.
- Fuente: https://pressgazette.co.uk/social_media/tldr-news-jack-kelly-youtube/ ·
  https://metricool.com/best-time-to-post-on-youtube/

## Títulos con promesa concreta; miniatura = cifra grande + 3-4 palabras
- Qué: spec para el generador de miniaturas del backlog: cifra enorme en
  Fraunces o 3-4 palabras máximo, alto contraste papel/tinta, cero texto
  chico. Título = tema + promesa concreta ("Por qué subió la luz: 3
  claves"), sin mayúsculas gritadas. Usar "Prueba y compara" (A/B nativo)
  desde el día uno; CTR bajo ~2% → rehacer.
- Valor: guía oficial de YouTube: título y miniatura cuentan una historia
  conjunta y el video cumple lo prometido. La identidad tipográfica sobria
  ES distintiva en un feed chileno de caras gritando en rojo.
- Esfuerzo: bajo.
- Fuente: https://support.google.com/youtube/answer/12340300?hl=es-419

## Los primeros 1.000 subs los traen las "Claves", no el diario
- Qué: la serie evergreen como motor de adquisición SEO; el diario como
  retención/hábito. Elegir temas de Claves por demanda de búsqueda chilena
  permanente: qué es la UF, cómo funcionan las AFP, qué hace el Banco
  Central, cómo se elige al Presidente, qué es el IPC. Cada diario enlaza a
  la Clave pertinente (tarjeta final + pantalla final + comentario fijado).
- Valor: los casos reales de 0→1.000 coinciden: promesa clara + contenido
  útil que la gente busca. El diario caduca en 24 h; una Clave acumula por
  años (modelo Un Mundo Inmenso). Las 4.000 h se juntan más rápido con
  catálogo perenne.
- Esfuerzo: bajo (priorización editorial; la serie existe).
- Fuente: https://milx.app/en/cases/case-study-real-youtubers-who-earned-10000-subscribers ·
  https://youtube.fandom.com/es/wiki/Un_Mundo_Inmenso

## Pregunta del día: energía de opinión sin ser canal de opinión
- Qué: cerrar cada diario con tarjeta fija de pregunta concreta y opinable
  sobre la historia principal + comentario fijado con la misma pregunta.
  Responder los primeros 10-15 comentarios el primer día (30 min humanos -
  que además documentan implicación humana, ver riesgos).
- Valor: lo que hace comentar/volver a la audiencia chilena de noticias es
  la conversación; los canales chicos superan en engagement relativo a los
  medios grandes. Comentarios tempranos = señal de recomendación y única
  vía de comunidad sin cara.
- Esfuerzo: bajo.
- Fuente: https://hypeauditor.com/top-youtube-news-politics-chile/

## Cumplimiento IA: divulgación de voz sintética + valor humano documentado
- Qué: (1) marcar la casilla de "contenido alterado o sintético" en CADA
  subida (la voz clonada narrando es el ejemplo que YouTube cita); (2)
  mantener evidencia de implicación humana: edición del guion, selección
  editorial, fuentes en pantalla, respuestas a comentarios; (3) variar
  estructura entre videos para no "parecer creado con una plantilla"
  (texto literal de la política).
- Valor: la política de contenido inauténtico (15-jul-2025) desmonetiza lo
  repetitivo/genérico/masivo y cita noticias auto-generadas sin implicación
  humana como no monetizables. Precedente: canal de 83K subs expulsado. La
  divulgación es barata; la sanción no.
- Esfuerzo: bajo.
- Fuente: https://support.google.com/youtube/answer/1311392?hl=es-419 ·
  https://blog.youtube/news-and-events/disclosing-ai-generated-content/

---

## Top 3 para hacer esta semana

1. **Cold open: dato antes del sello** (visual). Impacto máximo ÷ esfuerzo
   mínimo: reordenar el timeline ataca donde se pierde a más gente. Sin
   espectadores en el minuto 1, lo demás es irrelevante.
2. **Regla de los 5-7 s + count-ups** (visual). La mitigación de retención
   más barata en nuestro stack - pura interpolación - y lo único con
   respaldo académico directo. Convierte la debilidad (tarjetas estáticas)
   en sistema.
3. **Checklist de cumplimiento IA** (audiencia). 30 minutos: divulgación de
   contenido sintético + protocolo de valor humano + variación estructural.
   El único ítem cuyo costo de omisión es existencial. Se hace una vez,
   protege para siempre.

Mención especial: dejar el pipeline de mezcla (-14 LUFS + ducking) listo
ANTES de que llegue la voz, para que el primer video con voz salga bien
mezclado.

## Riesgos a vigilar

1. **Los videos mudos actuales rozan la definición de contenido NO
   monetizable.** La política del 15-jul-2025 lista "presentaciones de
   diapositivas con poca narración" y "noticias auto-generadas sin
   implicación humana" como no monetizables. Tarjetas + cama sin voz se
   parecen peligrosamente a eso. La voz clonada NO es mejora estética: es
   requisito práctico de monetización. Acelerarla.
2. **Voz clonada sin divulgar = sanción evitable.** YouTube exige divulgar
   voz sintética realista desde 2024 y aplica sanciones (incluida remoción
   del YPP). Marcar la casilla desde el primer video con voz.
3. **La escala automatizada juega en contra si todo "sale de la misma
   plantilla".** Mitigación: variación estructural visible entre videos,
   curaduría humana documentada y fuentes citadas - la evidencia debe
   existir ANTES de solicitar la monetización (la revisión del YPP mira el
   catálogo completo).
