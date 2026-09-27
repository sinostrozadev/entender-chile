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

    node scripts/prueba-video.js 2026-09-26 --corto   # muestra de uno a dos minutos
    node scripts/prueba-video.js 2026-09-26           # el informe completo

Con `--corto` sale la apertura con la carátula y unos cuatro segundos por
sección, en el orden real del guion de ese día: es la manera de ver la fila de
imágenes sin esperar el render largo. Todo queda en `out/pruebas/2026-09-26/`
(el video más las tres miniaturas) y no se sube nada a ninguna parte.

Al terminar, el script dice qué secciones se vieron con imagen de prueba, cuáles
cayeron al dibujo por código y qué imágenes de la carpeta esa edición no usa
(si el guion del día no trae una sección, su imagen no aparece: hay que elegir
una fecha que sí la tenga).

Tres cosas que conviene saber antes de mirar el resultado:

- **La imagen de sección se ve a pantalla completa en la transición de
  mosaico**, que es la cabecera con que entra cada bloque. Las tarjetas de
  contenido siguen yendo sobre papel, como en el informe real.
- **El video de prueba va mudo** salvo que la edición de esa fecha haya dejado
  su alineación en `out/AAAA-MM-DD/`: la voz no se vuelve a generar nunca, no
  se gastan créditos.
- **Nada de esto pisa producción**: las imágenes se copian a
  `public/secciones-prueba/` y la carátula a `public/caratulas-prueba/`, las
  dos carpetas ignoradas por git, y `public/secciones/` queda como estaba.

## Variables, para casos raros

| Variable | Para qué |
|---|---|
| `SECCIONES_DIR` | leer las imágenes de otra carpeta (por defecto, esta) |
| `CARATULA` | usar otra carátula, con cualquier nombre |
| `SEGUNDOS_POR_SECCION` | cuánto dura cada sección en el `--corto` (por defecto 4) |
