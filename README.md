# Pipeline del canal — guion marcado → voz → video

Convierte el guion diario (con las marcas definidas en los prompts) en un video
1920×1080 renderizado por código con Remotion. Sin edición manual.

## Flujo diario (comando único)

```bash
# 1. Copia el guion de la Biblioteca a: contenido/guiones/informe/AAAA-MM-DD.md
# 2. Un solo comando hace todo:
node scripts/dia.js --voz --render        # informe de hoy, voz real, MP4
node scripts/dia.js                       # modo prueba: voz simulada, sin créditos
node scripts/dia.js --clave --voz --render  # video de Claves de hoy
```

Salidas del día en `out/AAAA-MM-DD/` (video incluido) y la descripción lista
para pegar en YouTube (resumen + capítulos + fuentes) en
`contenido/descripciones/`. La estructura de `contenido/` es la fuente de
verdad del canal y se commitea; ver `contenido/README.md`.

## Flujo paso a paso (lo que dia.js hace por dentro)

```
guion.md (del agente de guion, copiado de la Biblioteca)
   │  node scripts/parse.js guion.md out/
   ▼
out/parsed.json + out/narracion.txt
   │  ELEVENLABS_API_KEY=... VOICE_ID=... node scripts/tts-elevenlabs.js out/narracion.txt out/
   │  (o SIN gastar créditos:  node scripts/mock-tts.js out/narracion.txt out/alignment.json)
   ▼
out/narracion.mp3 + out/alignment.json
   │  node scripts/build-timeline.js out/parsed.json out/alignment.json out/timeline.json narracion.mp3
   ▼
out/timeline.json
   │  cp out/narracion.mp3 public/
   │  npx remotion render Informe out/video.mp4 --props=./out/timeline.json
   ▼
out/video.mp4  →  escucha completa → disclosure de contenido sintético → subir
```

## Primer uso

```bash
npm install
npx remotion studio        # previsualiza con ejemplos/timeline.ejemplo.json
```

En el primer `studio`/`render`, Remotion descarga un Chrome headless y las
tipografías de Google (Fraunces, IBM Plex Sans, IBM Plex Mono): necesita red.
Sin red, comenta los `loadFont()` en `src/tema.ts` (hay stacks de respaldo).

## Qué hace cada script

- `scripts/parse.js` — parsea las marcas (`##`, `[TESIS]`, `[DATO tipo | fuente]`,
  `[ESQUEMA | título]`, `[HECHO]`, `[INTERPRETACIÓN]`, `[CITA | quién | fuente]`),
  separa lo narrado de lo visual, y produce el texto limpio para la voz con los
  offsets de caracteres de cada evento.
- `scripts/tts-elevenlabs.js` — voz con timestamps por caracter. Trocea por
  párrafos (~4.000 caracteres) y desplaza los tiempos para que la alineación
  final corresponda exactamente a `narracion.txt`.
- `scripts/mock-tts.js` — misma salida, simulada (~16 caracteres/seg), para
  probar render y diseño sin gastar créditos.
- `scripts/build-timeline.js` — cruza eventos con tiempos. Los `[DATO]` y
  `[ESQUEMA]` toman el intervalo del párrafo que los sigue (ese párrafo pasa a
  ser el pie del gráfico). Las secciones son banners superpuestos de 2,6 s.

## Sistema visual (src/tema.ts)

Papel frío `#F2F2EF`, tinta `#17191C`, un solo acento: verde pátina de cobre
`#2F7263`. Fraunces (tesis), IBM Plex Sans (texto), IBM Plex Mono (datos).
Firma del canal: toda cifra muestra `FUENTE · …` en mono; chip HECHO sólido en
tinta, chip INTERPRETACIÓN de contorno en pátina. Una animación de entrada por
tarjeta y nada más.

## Verificar antes del primer video real

1. Endpoint y límites vigentes de ElevenLabs `with-timestamps`, y el modelo
   recomendado actual para español (el script usa `eleven_multilingual_v2`).
2. Licencia de Remotion para tu caso (gratuita para personas naturales y
   empresas pequeñas; confirmar términos vigentes).
3. Escuchar el audio completo SIEMPRE antes de subir. Ese paso no se automatiza.
4. Marcar el disclosure de contenido alterado/sintético en YouTube Studio.

## Pendiente (v2, en orden)

1. Subtítulos .srt desde `alignment.json` (los timestamps ya existen).
2. Composición `Clave` (misma base; el componente `TarjetaEsquema` ya está).
3. Composición vertical 9:16 para Shorts/TikTok reutilizando el mejor bloque.
4. Thumbnail como still de Remotion (`renderStill`).
5. Migrar la generación de textos de tareas ChatGPT a llamadas API en un
   orquestador propio (elimina el copy-paste de la Biblioteca).
