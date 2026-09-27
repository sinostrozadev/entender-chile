# contenido/secciones/pruebas/ : lo que todavía se está mirando

Acá viven las candidatas: imágenes de sección y carátulas que se están
evaluando y que NO tienen que salir al aire. Producción lee
`contenido/secciones/<slug>.png` y nunca mira esta carpeta; el único que la
lee es el video de prueba, `scripts/prueba-video.js`.

La regla es esa: una imagen se mueve a `contenido/secciones/` recién cuando
Santiago la aprobó viéndola pasar en el video. Antes de eso vive acá.

## Cómo se nombran los archivos

- **La candidata que se va a probar: `<slug>.png`.** Los doce slugs son los de
  `scripts/imagenes-secciones.js`: `clima`, `emergencia`, `economia`,
  `seguridad`, `congreso`, `salud`, `educacion`, `internacional`,
  `plata-publica`, `regiones`, `dato-curioso`, `deporte`. Solo estos nombres
  entran al video de prueba, y solo en `.png` o `.jpg`.
- **Las variantes en competencia: `<slug>-<variante>.png`**, por ejemplo
  `economia-plano-a.png` o `clima-plano-b.png`. El video las ignora a
  propósito: para probar una hay que copiarla al nombre pelado del slug
  (`cp economia-plano-a.png economia.png`), así queda dicho cuál se está
  mirando y no se prueban dos a la vez.
- **La carátula de una edición: `caratula-AAAA-MM-DD.png`.** Es la ilustración
  que abre el video de muestra y la que sale en `miniatura.png`.

Cualquier otro nombre queda como archivo suelto y no entra a ninguna parte.

## El comando

    node scripts/prueba-video.js 2026-09-26 --corto              # muestra de dos a tres minutos
    node scripts/prueba-video.js 2026-09-26                      # el informe completo
    node scripts/prueba-video.js 2026-09-26 --corto --fondo papel # el montaje anterior, como sale hoy al aire
    node scripts/prueba-video.js 2026-09-26 --corto --comparar   # el montaje anterior, cada sección dos veces

Con `--corto` sale la apertura con la carátula y unos cuatro segundos por
sección, en el orden real del guion de ese día: es la manera de ver la fila de
imágenes sin esperar el render largo. Todo queda en `out/pruebas/2026-09-26/`
(el video más las tres miniaturas) y no se sube nada a ninguna parte.

Al terminar, el script dice qué secciones se vieron con imagen de prueba, cuáles
cayeron al dibujo por código y qué imágenes de la carpeta esa edición no usa
(si el guion del día no trae una sección, su imagen no aparece: hay que elegir
una fecha que sí la tenga).

Tres cosas que conviene saber antes de mirar el resultado:

- **El video sale con la secuencia del 24-09**, que es lo que hay que juzgar:
  la imagen de la sección dura TODA la sección, se oscurece y el texto va
  encima. Los detalles están más abajo. En producción esto está **apagado**
  hasta que Santiago apruebe el video.
- **El video de prueba va mudo** salvo que la edición de esa fecha haya dejado
  su alineación en `out/AAAA-MM-DD/`: la voz no se vuelve a generar nunca, no
  se gastan créditos.
- **Nada de esto pisa producción**: las imágenes se copian a
  `public/secciones-prueba/` y la carátula a `public/caratulas-prueba/`, las
  dos carpetas ignoradas por git, y `public/secciones/` queda como estaba.

## La secuencia del 24-09, que es lo que sale por defecto

Es la que dictó Santiago en el taller (`src/taller-secuencia.tsx`) y está
descrita en `bitacora/taller/VISUAL.md`, sección 3b. El orden:

1. **Portada**: la ilustración del día a sangre, con el gancho encima.
2. **La noticia principal, completa**, sobre esa misma imagen y sin cabecera:
   es el bloque que justifica el clic y va entero antes de cualquier índice.
3. **El mosaico, como presentación**: recién acá aparece la fila con las
   secciones del día. Un índice al principio le pide paciencia a alguien que
   todavía no tiene motivos para dártela.
4. **El recorrido**, sección por sección, con el viaje de la cámara entre una
   y la siguiente.

Y dentro de cada sección:

- su imagen a pantalla completa **durante toda la sección**, con un zoom
  lentísimo;
- **con cabecera**: aparece al 50% de oscurecido, se muestra el título, el
  barrido sigue hasta el 100% y recién ahí entran los textos. **Sin cabecera**
  (la principal): aparece directamente oscura y entra el texto;
- al terminar la sección no se retira nada;
- el oscurecido es **de la sección**, no de cada tarjeta: las tarjetas van
  transparentes encima, así la sección barre una vez y no cuatro;
- **tinte y grabado** sobre toda imagen de sección y sobre su baldosa del
  mosaico: el color de la sección en modo `color` al 30% y el pictograma
  enorme al 8,5%, abajo a la derecha. Es lo que convierte doce fotos distintas
  en una familia;
- la sección **sin imagen propia** va con el color de su sección, el grabado, y
  un velo más suave (tope 0,62), para que el color no se apague del todo.

Quién decide los tiempos: `scripts/secuencia-plan.js`, y viajan en
`meta.secuencia`. El plan **no mueve ni un evento**: la cabecera se recorta a
lo que haya entre el inicio del bloque y su primera tarjeta, y el viaje de la
cámara a lo que dure el silencio real de ese corte. Cabeceras completas se
consiguen pidiéndole pausas a la voz, no robándole tiempo al texto.

## El montaje anterior, para comparar

| Opción | Qué hace |
|---|---|
| `--fondo papel` | el montaje de tarjetas como sale hoy al aire |
| `--fondo imagen` | el montaje de tarjetas, cada tarjeta sobre la imagen de su sección |
| `--comparar` | solo con `--corto`: cada sección **que tiene imagen** se ve dos veces seguidas, primero sobre papel y después sobre la imagen, con un rótulo chico arriba a la derecha. El rótulo existe solo en la muestra |
| `--sin-secuencia` | el montaje de tarjetas sin comparar nada |

## En producción: `SECUENCIA` y `FONDO_TARJETA`

`scripts/dia.js` y `scripts/build-timeline.js` leen dos variables, las dos
apagadas por defecto:

| Variable | Valores | Qué enciende |
|---|---|---|
| `SECUENCIA` | (vacío) o `2409` | la secuencia completa del 24-09 |
| `FONDO_TARJETA` | `papel` o `imagen` | solo el fondo de cada tarjeta, en el montaje anterior |

Mientras no estén, el timeline del día sale byte por byte igual que antes de
que los interruptores existieran: `meta.secuencia` y `meta.fondoTarjeta` solo
se escriben cuando cambian. Cuando Santiago apruebe el video, encenderlo es
una línea en el workflow (`SECUENCIA: 2409`), sin tocar código.

## Variables, para casos raros

| Variable | Para qué |
|---|---|
| `SECCIONES_DIR` | leer las imágenes de otra carpeta (por defecto, esta) |
| `CARATULA` | usar otra carátula, con cualquier nombre |
| `SEGUNDOS_POR_SECCION` | cuánto dura el TEXTO de cada sección en el `--corto` (por defecto 4; la cabecera y el viaje van aparte) |
| `FONDO_TARJETA` | lo mismo que `--fondo`, y es la que manda en producción |
| `SECUENCIA` | `2409` enciende la secuencia en producción |
