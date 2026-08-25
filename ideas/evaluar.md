# Ideas para evaluar

(Shorts y Miniaturas → ejecutar.md 2026-08-24. Sello de inicio y mini-gancho
→ hechas.md 2026-08-25. Música → ejecutar.md 2026-08-25: infra lista, falta pista.)

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


## Fondos por sección (tinte + kicker)
- **Fecha:** 2026-08-24 · **Origen:** Santiago + Claude
- **Qué:** tinte sutil del papel por sección (2–4% saturación) + etiqueta
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
