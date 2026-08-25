# Entender Chile — pipeline del canal

Canal diario de noticias chilenas en YouTube, producido por código. El guion
marcado se convierte en un video 1920×1080 renderizado con Remotion. Sin
edición manual.

## Cómo funciona de verdad (la madrugada)

```
04:00  ChatGPT genera la edición con los prompts de prompts/ y la PUSHEA:
       contenido/informes/AAAA-MM-DD.md          (informe fuente)
       contenido/guiones/informe/AAAA-MM-DD.md   (guion del video diario)
       contenido/claves/AAAA-MM-DD-<slug>.md     (Clave, si corresponde)
       contenido/guiones/claves/AAAA-MM-DD-….md  (guion de la Clave)
05:00  GitHub Actions ("Edición diaria", 09:00 UTC) hace checkout, verifica
       que la edición esté completa, renderiza los MP4 (mudos mientras no haya
       secrets de voz) y publica el release "edicion-AAAA-MM-DD" con los videos
       y la descripción lista para YouTube.
06:00  Santiago revisa el video en el release y la revisión de calidad.
```

- **prompts/** es la única fuente de verdad de los prompts: se editan aquí, se
  commitean, y ChatGPT los lee desde aquí antes de ejecutar su tarea.
- **scripts/generar.js** es el PLAN B: si la edición del día está completa no
  hace nada; si falta algo y hay `ANTHROPIC_API_KEY`, la completa con la API
  de Claude; si falta algo y no hay key, falla ruidosamente (workflow en rojo).
- **contenido/** es el archivo histórico del canal y se commitea siempre
  (ver `contenido/README.md`). Los videos van a `out/`, ignorado por git.
- **ideas/** es el backlog del canal (evaluar → ejecutar → hechas/descartadas).

## La mañana (local, para iterar con Claude)

```bash
bash scripts/manana.sh     # pull + produce informe y clave (mudos)
                           # + apunta el Studio al timeline de HOY
npx remotion studio        # previsualizar en http://localhost:3000
```

`manana.sh` reapunta `src/Root.tsx` a `out/AAAA-MM-DD/timeline.json` como
cambio LOCAL — ese archivo modificado no se commitea (la versión del repo
importa el ejemplo, que es lo que la nube necesita para el build).

## Flujo diario a mano (lo que hace por dentro)

```bash
node scripts/dia.js                       # informe de hoy, voz simulada (gratis)
node scripts/dia.js --clave --si-existe   # video de Claves si hoy hubo
node scripts/dia.js --voz --render        # voz real ElevenLabs + MP4
```

`dia.js` hace git pull solo, y encadena: parse → voz (real o simulada) →
timeline → capítulos + descripción → (render). Salidas del día en
`out/AAAA-MM-DD/`; la descripción lista para pegar en YouTube queda en
`contenido/descripciones/`.

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
- `scripts/chapters.js` — capítulos de YouTube desde el timeline (primero en
  00:00, fusiona secciones de <10 s).
- `scripts/dia.js` — orquesta todo lo anterior en un comando.
- `scripts/generar.js` — plan B de generación por API (ver arriba).
- `scripts/manana.sh` — rutina matinal local (pull + producir + Studio a hoy).

## Primer uso

```bash
npm install
npx remotion studio        # previsualiza con ejemplos/timeline.ejemplo.json
```

En el primer `studio`/`render`, Remotion descarga un Chrome headless y las
tipografías de Google (Fraunces, IBM Plex Sans, IBM Plex Mono): necesita red.
Sin red, comenta los `loadFont()` en `src/tema.ts` (hay stacks de respaldo).

## Sistema visual (src/tema.ts)

Papel frío `#F2F2EF`, tinta `#17191C`, un solo acento: verde pátina de cobre
`#2F7263`. Fraunces (tesis), IBM Plex Sans (texto), IBM Plex Mono (datos).
Firma del canal: toda cifra muestra `FUENTE · …` en mono; chip HECHO sólido en
tinta, chip INTERPRETACIÓN de contorno en pátina. Una animación de entrada por
tarjeta y nada más.

## Voz (pendiente de activar)

El pipeline ya soporta ElevenLabs (`tts-elevenlabs.js`). Cuando exista el clon
profesional de la voz de Santiago: cargar `ELEVENLABS_API_KEY` y `VOICE_ID`
como secrets del repo y el workflow pasa solo de mudo a con voz.

## Antes de subir un video real

1. Escuchar el audio completo SIEMPRE. Ese paso no se automatiza.
2. Revisar el guion contra el informe (cifras, fechas, coherencia).
3. Marcar el disclosure de contenido alterado/sintético en YouTube Studio.

## Qué sigue

El backlog vivo está en `ideas/` — próximos en cola: shorts automáticos 9:16,
miniaturas automáticas, subtítulos .srt desde `alignment.json`.
