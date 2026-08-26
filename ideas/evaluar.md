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
