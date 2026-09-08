# Entender Chile - pipeline del canal

Canal diario de noticias chilenas en YouTube (@entenderchile), producido por
código y publicado con gate humano. Cada madrugada salen **cuatro piezas**:
el informe en video (1440p, ~15 min), su Short vertical, la Clave del día y
su Short; más el episodio de podcast de cada serie (Spotify, por RSS) y la
web pública. Voz Azure es-CL, sonido sintetizado propio, sin edición manual.

Las reglas que mandan sobre todo lo demás están en **`REGLAS-DURAS.md`**
(40 reglas con su origen y las disputas abiertas). Si algo de este README
contradice ese archivo, gana ese archivo.

## La madrugada, de verdad

El cuadro de horarios completo y verificado vive en
`bitacora/2026-08-28-quien-ejecuta-que.md` y, siempre al día, en
`bitacora/cronograma.json` (lo dibuja el panel interno). En corto (hora de
Chile, UTC-3 desde el 06-09):

```
01:30  reloj de Claude toca el despertador → workflow del BARRIDO (22 fuentes)
       → al terminar emite el evento del PR #2
~01:38 preselección → PR #3 → ~01:45 informe → PR #4 → ~01:50 Clave
       (tareas de ChatGPT, cada una despierta con el evento anterior;
       leen prompts/ del repo y pushean)
01:45  observatorio de plata pública (rutina de Claude, en paralelo)
~01:52 guionista de Claude (informe y Clave): cada push lo despierta y escribe
       el guion que falte; relojes de respaldo 03:35 y 03:50
04:45  revisión editorial (rutina de Claude en Fable): veredicto, y si una cifra
       está mal y se comprueba la correcta, corrige y republica → su push
       TIMBRA la edición
~04:50 workflow EDICIÓN DIARIA: render 1440p con voz, 4 piezas, miniaturas,
       release, subida PRIVADA a YouTube, podcast, web (~70 min en frío)
05:00  reloj de métricas → workflow de MÉTRICAS (Data + Analytics → bitacora/ y panel)
05:30  auditoría matinal (rutina de Claude): cómo salió la máquina, triage
06:00  informe de la mañana (rutina de Claude, Opus): el resumen al teléfono
08-22  guardia cada 2 h (rutina de Claude) → Short exprés si caza algo
```

Reglas de infraestructura ya pagadas con errores: el cron de GitHub NUNCA es
reloj principal (solo red de respaldo; decisión del 31-08); la edición es
**reentrante por pieza** (una Clave atrasada se produce sola con
`workflow_dispatch`, sin rehacer el informe); y los pushes de bots no
disparan workflows, por eso el paso 8 despacha la web explícitamente.

## Carpetas

- **`prompts/`** - la única fuente de verdad de los prompts; ChatGPT y las
  rutinas los leen del repo. `contrato-archivos.md` manda sobre todos.
- **`contenido/`** - el producto y su archivo histórico (informes, guiones,
  claves, casos, descripciones, podcast). Se commitea siempre.
- **`estrategia/`** - fundamentos: identidad, público, modelo de negocio,
  decisiones (ver su README).
- **`ideas/`** - backlog táctico y análisis de forma/distribución.
- **`bitacora/`** - operación diaria: `PENDIENTES.md` (la lista viva),
  `REALIZADOS.md`, un archivo por día, métricas y el panel interno.
- **`docs/`** - operativa técnica (YouTube, auditoría de la API).
- **`archivo/`** - lo que ya cumplió su función; nada se borra.
- **`taller/`** - el sistema interno (navegador de archivos, editor con
  diff, borradores) publicado como artifact.
- **`src/` + `scripts/`** - Remotion y el pipeline (abajo).

## Uso local (la mañana)

```bash
bash scripts/manana.sh     # pull + produce informe y clave (voz simulada)
npx remotion studio        # previsualizar en http://localhost:3000
```

`manana.sh` reapunta `src/Root.tsx` a `out/AAAA-MM-DD/timeline.json` como
cambio LOCAL que no se commitea. Producción a mano:
`node scripts/dia.js [--clave] [--voz] [--render]`.

## Scripts principales

- `parse.js` - marcas del guion (`##`, `[TESIS]`, `[DATO tipo | fuente]`,
  `[ESQUEMA]`, `[FUENTE]`, `[CITA]`, `[HECHO]`/`[INTERPRETACIÓN]`,
  titulares agrupados) → eventos + texto de voz con offsets.
- `tts-azure.js` - voz es-CL (Lorenzo, -10%), pausas de sección, respaldo
  S0 automático; `mock-tts.js` para probar gratis.
- `build-timeline.js` / `chapters.js` - tiempos, capítulos y descripción.
- `dia.js` - orquesta una pieza completa; `short.js` - los Shorts.
- `validar-tarjetas.js` - cuenta tarjetas por tipo y avisa cuotas rotas y
  marcas malformadas (paso 2c de la edición; avisa, no bloquea).
- `youtube-subir.js` - reescala a 1440p/2560, sube privado con miniatura y
  playlist; `podcast-subir.js` - episodios al feed.
- `barrido.js`, `casos.js`, `sonido.js`, `gate.js`, `metricas.js`.

## Sistema visual y sonoro

Papel frío `#F2F2EF`, tinta `#17191C`, acento verde pátina `#2F7263`
(`src/tema.ts`). Fraunces para tesis, IBM Plex Sans para texto, IBM Plex
Mono para datos. Firma: toda cifra lleva `FUENTE · …`; chips HECHO /
INTERPRETACIÓN. Música: cero bancos, todo sintetizado por `sonido.js`
(sello, cortinas, cierre); sin cama bajo la voz.

## Antes de publicar (el gate humano)

1. Escuchar el audio completo SIEMPRE. Ese paso no se automatiza.
2. Revisar el guion contra el informe (cifras, fechas, coherencia).
3. La divulgación de contenido sintético va marcada en cada pieza.

Las subidas llegan privadas (auditoría de la API de Google en curso); el
clic de publicar es de Santiago, a las horas de `ideas/viralizacion.md`.

## Qué sigue

La lista viva es `bitacora/PENDIENTES.md`. El objetivo que manda el
calendario: los umbrales del Programa de Partners antes del 1-feb-2027.
