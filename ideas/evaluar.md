# Ideas para evaluar

(Shorts automáticos y Miniaturas automáticas → movidas a ejecutar.md el
2026-08-24 con aprobación de Santiago.)

## Acortar el informe a 8–10 min
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** ajustar el prompt del guion para apuntar a 8–10 min (hoy salió 14.7).
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

## Web estática desde contenido/
- **Fecha:** 2026-08-24 · **Origen:** README de contenido/ + Claude
- **Qué:** publicar el archivo histórico (informes/ y claves/) como sitio
  estático. El dominio entenderchile.cl está libre (verificado 2026-08-23).
- **Valor:** SEO + newsletter = segunda pata de ingresos independiente de
  YouTube. El contenido ya se acumula solo, commit a commit.
- **Esfuerzo:** medio (generador estático simple + deploy).

## Franquicia por país 💰💰
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** replicar el pipeline validado con prompts por país: Entender Perú,
  Entender México, Entender Colombia…
- **Valor:** N canales de costo marginal casi cero sobre el mismo código.
- **Esfuerzo:** bajo por réplica, PERO solo tiene sentido después de validar
  Chile. Largo plazo.

(Paso revisor de calidad → evolucionó a "Revisión de calidad automática de
madrugada" en ejecutar.md, 2026-08-24.)

## Sello de identidad al inicio (no intro larga)
- **Fecha:** 2026-08-24 · **Origen:** Santiago + Claude
- **Qué:** mantener el cold open del guion y agregar tarjeta de identidad de
  2–3 s (fecha + Entender Chile) bajo la voz, stinger opcional de 1.5 s tras
  el gancho, y logo sonoro de 2 s.
- **Valor:** marca sin costo de retención (las intros largas fugan audiencia
  en los primeros 30 s).
- **Esfuerzo:** bajo (componente Remotion + un asset de audio).

## Fondos por sección (tinte + kicker)
- **Fecha:** 2026-08-24 · **Origen:** Santiago + Claude
- **Qué:** tinte sutil del papel por sección (2–4% saturación) + etiqueta
  permanente en esquina (POLÍTICA, REGIONES…). Un solo acento verde se
  mantiene. La Clave con mundo visual propio.
- **Valor:** sentido de estructura y progreso → retención; identidad
  reutilizable en Shorts.
- **Esfuerzo:** medio-bajo (tema.ts + tarjetas).

## Música de fondo (cama con licencia segura)
- **Fecha:** 2026-08-24 · **Origen:** Santiago + Claude
- **Qué:** cama musical de YouTube Audio Library (sin Content ID): un track
  para el informe, otro para la Clave; ducking cuando llegue la voz.
- **Valor:** CRÍTICO en la etapa muda (es lo único que suena); consistencia
  = marca auditiva. Licencia segura protege la monetización.
- **Esfuerzo:** bajo (pista de audio en Remotion + volumen).

## Mini-gancho interno hacia el dato curioso
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** en la apertura, adelantar el dato curioso sin resolverlo → ancla
  de retención hasta el tramo final. Se logra vía prompt del guion.
- **Esfuerzo:** trivial (una línea en el prompt).

## Playlists como series
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** playlists "El informe diario" y "Claves para entender las
  noticias"; las Claves atemporales se prestan al binge.
- **Valor:** el algoritmo premia sesiones largas encadenadas.
- **Esfuerzo:** trivial (configuración en YouTube Studio).
