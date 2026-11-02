# Encargo: conectar el mural de la Clave al pipeline de edición

Para la sesión de la noche, que tiene los secrets. Escrito el 12-10-2026 por la
sesión de día, con el sí de Santiago.

Las reglas fijas del repo (sin rayas largas, fechas absolutas, español, commits,
escritura verificada) están en `CLAUDE.md` de la raíz; se cumplen todas.

Modelo sugerido: **Opus**. Hay que decidir mientras se escribe y toca código que
corre en producción.

## Por qué existe este encargo

El mural de catorce paneles está aprobado por Santiago el 12-10-2026 y rendido:
`ejemplos/clave-mural14.json` más la composición `ClaveMural14`. Pero el
pipeline no lo conoce. Hoy `scripts/dia.js:174` renderiza la composición
`Informe` tanto para el informe como para la Clave, así que una corrida del
workflow produciría la Clave vieja de tarjetas, no el mural.

Falta además la voz, que esta sesión no puede generar porque corre en la nube
sin credenciales de Azure.

## Contexto mínimo

Leer, y nada más que esto:

- `CLAUDE.md` de la raíz.
- `scripts/dia.js` completo (182 líneas). Es la cadena actual: parse, voz,
  timeline, capítulos, carátulas, render.
- `scripts/mural-guion.js` completo (146 líneas). Es el armador del mural.
- `src/clave-mural.tsx`, solo las líneas 48 a 72 (los tipos `Bloque` y
  `GuionMural`). El resto del archivo no hace falta para este trabajo.
- `.github/workflows/edicion-diaria.yml`, solo las líneas 215 a 300 (render,
  subida y las variables de hora).
- `ejemplos/clave-mural14.json`, **solo las claves de primer nivel**: usar
  `node -e 'const g=require("./ejemplos/clave-mural14.json");console.log(Object.keys(g), g.bloques.length)'`.
  Son 110 bloques, no hay que leerlos.
- `scripts/mezclar-voz.js` completo (es corto).

**No leer**: la bitácora de otros días, `contenido/` entero, los veredictos,
`REGLAS-DURAS.md` completo, el resto de `src/`, `scripts/parse.js`. Nada de eso
cambia acá y abrirlo cuesta la ventana entera.

Dos hechos que ahorran una búsqueda:

1. `alignment.json` tiene el formato
   `{ characters, character_start_times_seconds, character_end_times_seconds }`,
   tiempos por carácter sobre el texto exacto del archivo de narración. Lo
   produce `scripts/tts-azure.js` y lo imita `scripts/mock-tts.js`.
2. Los velos del mural (`guion.velos`) **no** hay que recalcularlos. Se
   resuelven una vez contra el mural con `scripts/mural-velos.js`, que necesita
   `sharp` y el buffer crudo de la costura. Ya están resueltos y guardados en el
   guion, y `mural-guion.js` los conserva. **No instalar sharp.**

## Archivos que toca

Lista cerrada. Fuera de esta lista no se toca nada.

| archivo | estado |
|---|---|
| `scripts/mural-tiempos.js` | **nuevo** |
| `scripts/mural-guion.js` | existente |
| `scripts/dia.js` | existente |
| `.github/workflows/edicion-diaria.yml` | existente |
| `bitacora/REALIZADOS.md` | existente, solo agregar al final |

## Qué cambia exactamente

### 1. `scripts/mural-guion.js` (existente)

Hoy escribe el guion y nada más. Agregar una opción `--narracion <ruta>` que,
además, escriba el texto que va a leer la voz: los `texto` de los bloques de
prosa en orden, separados por un espacio simple, y nada más (los bloques
`tipo: "dato"` no se narran, van en silencio por regla 30).

Y en cada bloque de prosa, dos campos nuevos: `desde` y `hasta`, los índices de
carácter de ese bloque dentro de ese mismo texto. Se conocen por construcción,
porque el script arma la cadena; **no** hay que buscarlos después.

Motivo de que la narración la escriba este script y no se reuse la de
`parse.js`: `parse.js` tiene su propio parser, con otras reglas de corte, y dos
parsers sobre el mismo guion se desincronizan. Si el texto que se manda a Azure
no es exactamente el que el mural reparte en bloques, los tiempos caen corridos
y el video entero queda fuera de sincronía.

### 2. `scripts/mural-tiempos.js` (nuevo)

Entrada: el guion del mural y un `alignment.json`. Salida: el mismo guion con el
`seg` de cada bloque recalculado contra la voz de verdad.

```
node scripts/mural-tiempos.js --guion <guion.json> --alineacion <alignment.json>
```

Por cada bloque de prosa, con `desde` y `hasta`:
`seg = character_end_times_seconds[hasta - 1] - character_start_times_seconds[desde]`,
más **0,45 s de cola** para que la frase no se corte encima de la siguiente (es
el valor que usa hoy la salida de cada bloque en `src/clave-mural.tsx`, donde el
texto se desvanece en los últimos 0,45 s).

Los bloques `tipo: "dato"` conservan su `seg`, que lo calcula el armador con
`3,6 + 1,2 por valor` y no depende de la voz, porque van en silencio.

Avisar por consola la diferencia entre el total viejo y el nuevo. Si la fórmula
de `mural-guion.js` estaba bien calibrada la diferencia será chica; si es mayor
al 15% hay que mirarla antes de rendir, porque significa que algo no calzó.

### 3. `scripts/dia.js` (existente)

Hoy, en la línea 174, renderiza `Informe` siempre. Cambiar solo el camino de la
Clave, y solo cuando el mural existe.

La condición: hay mural para esta Clave si existen los tres trozos
`public/claves/<slug>/mural14-1.jpg`, `-2.jpg` y `-3.jpg`, donde `<slug>` sale
del nombre del guion (`contenido/guiones/claves/AAAA-MM-DD-<slug>.md`).

- **Si NO existe el mural**: todo sigue exactamente igual que hoy. Esto no es
  un detalle, es la red: el mural lo arma GPT panel por panel y es un paso
  humano, así que una Clave sin paneles todavía tiene que poder salir en el
  formato de tarjetas en vez de romper la edición.
- **Si existe**: en lugar de `parse` y `build-timeline`, correr la cadena del
  mural, en este orden:
  1. `mural-guion.js` con `--narracion out/<fecha>/narracion-clave.txt`, el
     ancho y las paradas. **El ancho, las paradas y los velos salen del guion
     que ya existe para esa Clave**; si no existe, el mural no se puede armar y
     hay que caer al formato de tarjetas con un aviso claro.
  2. la voz sobre ese texto (el mismo proveedor que usa hoy `dia.js`, con el
     respaldo de Azure que ya resuelve `tts-azure.js` por dentro).
  3. `mural-tiempos.js` con el `alignment.json` que dejó la voz.
  4. `clave-musica.js --guion <guion> --salida public/sonidos/cama-clave.wav --tension 12-13`.
  5. `npx remotion render ClaveMural14 <video> --props=<guion> --concurrency=100%`.
  6. `mezclar-voz.js <video> <narración> <video final> --musica <dB>` para
     montar la voz sobre la cama.

El `--tension 12-13` de arriba es el arco que eligió Santiago: la tensión entra
en la sección 12, llega al clímax al empezar el cierre y se queda arriba. Si una
Clave tiene otro número de secciones, el rango es "las dos últimas secciones
antes del cierre"; calcularlo, no dejarlo fijo.

Las carátulas (`miniaturas.js`) y la descripción no cambian: ya funcionan con el
`parsed` del guion y se usan igual en los dos caminos.

### 4. `.github/workflows/edicion-diaria.yml` (existente)

Línea 275: `YT_HORA_CLAVE` pasa de `'14:00'` a `'19:30'`.

El porqué va en el comentario que ya existe arriba de las tres variables:
medido sobre `bitacora/metricas/2026-10-06.json`, el 0,7% de las vistas del
canal llega por notificación y el 13,1% por búsqueda, así que la hora es una
palanca de segundo orden; las 14:00 igual son la peor opción posible para una
pieza de trece minutos, que compite contra la jornada laboral.

### 5. `bitacora/REALIZADOS.md`

Una línea al final, con fecha, como manda el estándar.

## Qué no tocar

- **El camino del informe.** Ni una línea de su cadena. Si el informe cambia de
  comportamiento, el encargo está mal hecho.
- `scripts/parse.js`, `scripts/build-timeline.js`, `src/tarjetas.tsx`: son del
  formato de tarjetas y siguen sirviendo al informe y a la Clave sin mural.
- `src/clave-mural.tsx`: el componente está aprobado y rendido. Solo se lee.
- `ejemplos/clave-mural14.json`: es el guion de la Clave de licencias, ya
  aprobado. El pipeline tiene que escribir guiones nuevos en `out/`, no pisar
  este.
- `prompts/`: los contratos de guion se tocaron el 12-10-2026 y quedan como
  están.
- El panel 6 del mural de licencias, que está mal hecho y esquivado moviendo la
  cámara. Es otro pendiente, no este.
- **No pushear.** Commit local, y Santiago decide.

## Criterio de terminado

1. `node scripts/dia.js --clave --si-existe` sobre una fecha **sin** mural
   produce exactamente lo mismo que antes del cambio.
2. `node scripts/dia.js --clave` sobre la Clave de licencias detecta el mural y
   corre la cadena del mural.
3. El guion que escribe el pipeline en `out/` tiene las siete claves
   (`mural anchoMural viajeSeg musica paradas velos bloques`) y 110 bloques,
   de los cuales 14 con `tesis: true` y 3 con `tipo: "dato"`.
4. El `seg` de los bloques de prosa viene de la voz, no de la fórmula: la suma
   total difiere de los 772,6 s actuales, y la diferencia está explicada en el
   reporte.
5. El mp4 final tiene voz Y cama: ninguna ventana de 20 s por debajo de
   -70 dBFS, y la voz se escucha por encima de la música.
6. `YT_HORA_CLAVE` dice `19:30`.
7. Un commit local, sin push.

## Cómo se verifica

```bash
# 1. el informe no cambió: comparar la salida contra la de antes del cambio
git stash && node scripts/dia.js --si-existe > /tmp/informe-antes.txt 2>&1
git stash pop && node scripts/dia.js --si-existe > /tmp/informe-despues.txt 2>&1
diff /tmp/informe-antes.txt /tmp/informe-despues.txt    # esperado: sin diferencias

# 2. las claves y el conteo del guion que escribe el pipeline
node -e 'const g=require("./out/<fecha>/clave-mural.json");
console.log(Object.keys(g).join(" "), "|", g.bloques.length,
"| tesis", g.bloques.filter(b=>b.tesis).length,
"| datos", g.bloques.filter(b=>b.tipo==="dato").length);'
# esperado: mural anchoMural viajeSeg musica paradas velos bloques | 110 | tesis 14 | datos 3

# 3. los tiempos vienen de la voz
node -e 'const g=require("./out/<fecha>/clave-mural.json");
console.log("total", g.bloques.reduce((a,b)=>a+b.seg,0).toFixed(1)+"s");'
# esperado: distinto de 772.6, y la diferencia explicada

# 4. el audio del mp4 final (el medidor no necesita ffprobe ni sharp)
./node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg -v error -y \
  -i <video-final.mp4> -vn -ac 1 -ar 32000 -c:a pcm_s16le /tmp/final.wav
# y medir ventanas de 20 s: ninguna bajo -70 dBFS

# 5. la hora
grep -n "YT_HORA_CLAVE" .github/workflows/edicion-diaria.yml
# esperado: '19:30'

# 6. reglas del repo sobre lo que se tocó
grep -c "—\|–" scripts/mural-tiempos.js scripts/mural-guion.js scripts/dia.js
# esperado: 0 en los tres
```

## Commit

Uno solo, **local, sin push**.

Encabezado: `el mural de la Clave entra al pipeline, con voz y hora nueva`

El cuerpo explica **el porqué**, no el qué: que `dia.js` rendía `Informe` para
las dos piezas y por eso el mural no podía salir por el flujo automático; que
la narración la escribe el armador del mural y no se reusa la de `parse.js`
porque dos parsers sobre el mismo guion se desincronizan y los tiempos quedan
corridos; que el camino viejo se conserva como red porque los paneles son un
paso humano; y que la hora se mueve con el dato de que casi nadie llega por
notificación.

Última línea: `Co-Authored-By:` con el modelo que escribe el commit.

## Reporte

Devolver:

- Archivos creados y tocados, con rutas.
- Rama y hash del commit.
- **Qué verificó y con qué comando**, con el resultado real, no el esperado.
- **Qué NO pudo verificar**, explícito. Sin esa lista todo reporte suena
  igual de terminado.
- La diferencia entre la duración calculada por fórmula (772,6 s) y la que dio
  la voz de verdad, en segundos y en porcentaje.
- Las dudas.

## Lo que queda fuera a propósito, y hay que decirle a Santiago

- **Los catorce paneles siguen siendo un paso humano.** Este encargo hace que el
  pipeline los use si están y no se rompa si no están. "Que la Clave salga sola
  dos veces por semana" necesita además decidir cómo se producen los paneles, y
  esa decisión no está tomada.
- **La melodía en los huecos donde Lorenzo no habla** ahora es posible, porque
  el `alignment.json` da los tiempos exactos de cada palabra. No entra acá.
- **Escuchar el audio completo antes de publicar no se automatiza nunca**
  (regla 19). El clic de publicación es de Santiago, y la pieza sube en privado.
