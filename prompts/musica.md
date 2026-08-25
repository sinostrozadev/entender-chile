# Prompts para generar las camas musicales del canal

Estos prompts se pegan en un generador de música con IA (Suno, Udio, Stable
Audio). ChatGPT no produce audio por sí solo: si se le pide ahí, que los
refine o los derive a la herramienta. Los generadores responden mejor en
inglés; se incluye versión en español para trabajar la idea.

REQUISITO DE LICENCIA (antes de usar cualquier resultado): el plan de la
herramienta debe incluir USO COMERCIAL (los planes gratis normalmente no).
Guardar comprobante del plan activo el día de la generación.

---

## Pista 1 — Cama del INFORME (pulso informativo)

**Prompt (inglés, para el generador):**

> Minimal news-bulletin background bed, instrumental only. Calm, confident,
> editorial mood — neutral, never emotional or epic. Soft marimba and muted
> felt piano pulse at 92 BPM, warm analog pad underneath, discreet round
> bass. No lead melody, no hummable theme, no drum buildup, no risers, no
> vocals. Very low dynamic range, mixed to sit quietly UNDER a spoken male
> voice (leave the 1–4 kHz range clean). Seamless loop, consistent energy
> from start to end, clean loop point. Key of D minor. 2 minutes.

**En español (la idea):** cama mínima de noticiero, solo instrumental; ánimo
sereno y confiable, neutral; marimba suave y piano apagado a 92 BPM sobre un
pad cálido; sin melodía protagonista, sin builds, sin voces; rango dinámico
bajísimo para convivir bajo una voz hablada; loop perfecto, energía constante;
re menor; 2 minutos.

## Pista 2 — Cama de las CLAVES (didáctica, cálida)

**Prompt (inglés):**

> Warm educational background bed, instrumental only. Thoughtful, curious,
> patient mood — like a brilliant private tutor explaining something
> fascinating. Soft felt piano and warm pads at 70 BPM, occasional gentle
> mallet accents. No lead melody, no percussion buildup, no vocals. Very low
> dynamic range, sits quietly under narration (keep 1–4 kHz clean). Seamless
> loop, consistent energy, clean loop point. Key of F major. 2 minutes.

**En español:** cama cálida y didáctica, solo instrumental; ánimo curioso y
paciente, de profesor particular; piano de fieltro y pads a 70 BPM con
acentos suaves de mazo; sin melodía protagonista ni builds ni voces; dinámica
plana para convivir con narración; loop perfecto; fa mayor; 2 minutos.

## Pista 3 — Logo sonoro del sello (opcional, 2 s)

**Prompt (inglés):**

> Two-second sonic logo for a trustworthy news brand: two soft warm mallet
> notes rising (D then A), minimal and clean, short natural tail, no reverb
> wash, no vocals. Calm confidence, editorial elegance.

## Prompt para ChatGPT (si se trabaja la idea con él primero)

> Actúa como director musical de un canal diario de noticias chileno, sobrio
> y editorial ("Entender Chile": papel frío, tinta, un acento verde pátina).
> Necesito 2 camas instrumentales en loop (informe: pulso informativo 92 BPM
> re menor; claves: didáctica 70 BPM fa mayor) y un logo sonoro de 2 s.
> Restricciones duras: sin melodía protagonista, sin builds ni drops, rango
> dinámico bajísimo (van bajo una voz hablada), loop perfecto, sin voces.
> Entrégame prompts optimizados para [Suno/Udio/Stable Audio] con 3 variantes
> por pista, y dime qué plan de esa herramienta incluye uso comercial.

## Checklist al recibir una pista (antes de adoptarla)

1. ¿El plan usado incluye uso comercial? (guardar comprobante)
2. ¿Loop limpio? (oírla 3 veces seguidas: el empalme no se debe notar)
3. ¿Convive con voz? (probar bajo una narración: no debe pelear en 1–4 kHz)
4. ¿Energía constante? (sin builds que roben atención en el minuto 8)
5. ¿Neutra tras 10 escuchas? (si cansa al productor, cansa a la audiencia)
6. Instalar: renombrar a informe.mp3 / clave.mp3 en public/musica/, commit,
   y el pipeline la usa esa misma madrugada.
