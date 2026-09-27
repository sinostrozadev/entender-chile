# Prompts de imágenes de sección, para pegar en el chat de ChatGPT

Las imágenes de prueba y las de sección se piden A MANO en el chat de ChatGPT
(decisión de Santiago del 26-09-2026: la cuota del work, la que usa el PR #6,
se reserva para las piezas y la portada diaria). Santiago pega el prompt,
genera, y guarda el archivo en la ruta que dice cada bloque.

Estilo decidido el 26-09-2026 (reemplaza al fotográfico del 24-09): NO son
fotos ni realismo. Son imágenes DE SECCIÓN: una ilustración plana, tipo
pictograma editorial, con un solo motivo que se lee en un segundo y que no
representa ninguna noticia. Una imagen fija por sección, reutilizada todos
los días.

## Las reglas fijas: van al final de TODOS los pedidos

    Fijo para todas:
    - 16:9, 1920 x 1080. Ilustración plana, de formas grandes y simples,
      como un pictograma editorial. NADA de fotografía, realismo, textura de
      foto, 3D, render, acuarela ni collage. Si parece una foto, está mal.
    - Paleta: fondo azul marino profundo y parejo; el motivo en blanco hueso
      y un gris azulado; como mucho un tercer tono, un azul más claro. Nada
      de cobre ni naranjo: ese color es del banner de texto que va encima.
    - La MITAD IZQUIERDA queda vacía, solo fondo parejo: ahí se pinta el
      texto del video. El motivo va en la mitad derecha, grande, centrado
      en vertical.
    - Sin texto, sin letras, sin números, sin símbolos, sin logos, sin
      banderas, sin marcas.
    - Sin personas, sin caras, sin siluetas humanas, sin lugares
      reconocibles.
    - Contraste medio: sin blancos puros ni negros cerrados; encima va un
      velo y texto blanco.
    - No representa ningún hecho: es la sección, no la noticia del día.

## Cómo saber si sirve, antes de guardarla

Achica la imagen al tamaño de un pulgar: el motivo tiene que seguir
entendiéndose. Tápale la mitad izquierda: nada importante debe perderse.
Imagínale un banner cobre con texto blanco encima de la mitad izquierda: si
compite con el motivo, sobra detalle.

## PRUEBA (primero esto): dos secciones, dos estilos

Se generan estas cuatro, se eligen el estilo A o B, y con esa elección se
escriben los prompts de las otras diez. Guardar en
`contenido/secciones/pruebas/`.

### Economía, estilo A (geométrico, duro)

Guardar en: `contenido/secciones/pruebas/economia-plano-a.png`

    Ilustración plana de sección "Economía" para un canal de noticias. Un
    solo motivo en la mitad derecha: una balanza de dos platos dibujada con
    formas geométricas simples (líneas rectas, círculos, trapecios), con
    tres monedas planas apiladas en un plato y una sola en el otro, apenas
    inclinada. Trazo limpio, sin degradados, sin sombras suaves, esquinas
    netas. Estilo de pictograma de señalética moderna.

    (pegar acá el bloque "Fijo para todas")

### Economía, estilo B (suave, con volumen plano)

Guardar en: `contenido/secciones/pruebas/economia-plano-b.png`

    Ilustración plana de sección "Economía" para un canal de noticias. Un
    solo motivo en la mitad derecha: una balanza de dos platos con monedas
    planas, dibujada con formas redondeadas y dos tonos por forma (una cara
    clara y una cara en gris azulado, como papel recortado en capas), sin
    líneas de contorno. Sombras planas, sin degradados. Estilo de
    ilustración editorial de papel recortado.

    (pegar acá el bloque "Fijo para todas")

### Clima, estilo A (geométrico, duro)

Guardar en: `contenido/secciones/pruebas/clima-plano-a.png`

    Ilustración plana de sección "Clima" para un canal de noticias. Un solo
    motivo en la mitad derecha: un sol de círculo perfecto con rayos cortos
    y rectos, asomando detrás de una nube hecha de tres o cuatro círculos
    superpuestos con base recta. Formas geométricas puras, trazo limpio,
    sin degradados ni sombras suaves. Neutro: ni tormenta ni día radiante,
    solo el signo del tiempo.

    (pegar acá el bloque "Fijo para todas")

### Clima, estilo B (suave, con volumen plano)

Guardar en: `contenido/secciones/pruebas/clima-plano-b.png`

    Ilustración plana de sección "Clima" para un canal de noticias. Un solo
    motivo en la mitad derecha: una nube grande de bordes redondeados en dos
    tonos (cara clara arriba, gris azulado abajo, como papel recortado en
    capas) y detrás medio sol de rayos anchos y redondeados. Sombras planas,
    sin líneas de contorno, sin degradados. Neutro: ni tormenta ni día
    radiante.

    (pegar acá el bloque "Fijo para todas")

## Las doce secciones y su motivo (para después de la prueba)

Con el estilo elegido, un prompt por sección con el mismo bloque fijo.
Guardar en `contenido/secciones/<slug>.png`.

| Sección | Archivo | Motivo único |
|---|---|---|
| clima | `clima.png` | sol detrás de una nube |
| emergencia | `emergencia.png` | un triángulo de aviso vacío sobre una línea de horizonte, sin signo dentro |
| economia | `economia.png` | balanza con monedas |
| seguridad | `seguridad.png` | un candado cerrado, grande y simple |
| congreso | `congreso.png` | un frontón con cuatro columnas, reducido a formas |
| salud | `salud.png` | una cruz gruesa dentro de un círculo |
| educacion | `educacion.png` | un libro abierto visto de frente, dos páginas |
| internacional | `internacional.png` | un globo terráqueo de meridianos y paralelos, sin continentes |
| plata-publica | `plata-publica.png` | una carpeta de archivo con una moneda encima |
| regiones | `regiones.png` | una cordillera de tres picos con un camino que la cruza |
| dato-curioso | `dato-curioso.png` | una lupa grande sobre un punto |
| deporte | `deporte.png` | una pelota simple (círculo con gajos) sobre una línea |

Nota: el motivo de cada sección se puede discutir; lo que no cambia es la
regla de un solo motivo, mitad izquierda vacía y paleta marino, blanco y
gris.
