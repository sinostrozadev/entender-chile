# Ideas para evaluar

## Shorts automáticos 💰
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** composición Remotion vertical (1080×1920) que tome 1–2 secciones del
  timeline y genere 2–3 Shorts diarios del mismo contenido. La Clave es la
  fuente ideal: conceptual y atemporal.
- **Valor:** vía rápida a los 1.000 suscriptores; 10M vistas Shorts en 90 días
  es ruta alternativa de monetización. Costo marginal ~cero.
- **Esfuerzo:** medio (nueva composición + recorte del timeline).

## Miniaturas automáticas
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** generar la miniatura del día con Remotion (still 1280×720 con el
  titular principal + identidad visual del canal).
- **Valor:** el CTR es la variable #1 de ingresos; hoy no hay miniatura.
- **Esfuerzo:** bajo (composición de 1 frame + `remotion still`).

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

## Paso revisor de calidad matinal
- **Fecha:** 2026-08-24 · **Origen:** Claude
- **Qué:** cada mañana, antes de dar por buena la edición, revisar el guion
  contra el informe (cifras, fechas, coherencia, secciones obligatorias).
  Puede ser checklist automático (script) + revisión de Claude.
- **Valor:** evita subir un error factual a YouTube. Gratis.
- **Esfuerzo:** bajo.
