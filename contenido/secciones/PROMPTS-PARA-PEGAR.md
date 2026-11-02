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

## Resultado de la prueba (27-09-2026)

Las cuatro salieron bien y a Santiago le gustan los dos estilos. Lo que no
quiere es que todas tengan el mismo color: en el video pasan en fila y un
solo azul cansa. Decisión propuesta: cada sección con su propio fondo (tonos
oscuros y apagados, nunca cobre ni naranjo, para que el banner y el texto
blanco sigan resaltando), el motivo en blanco hueso más un tono claro del
mismo color del fondo. Y los dos estilos repartidos: geométrico (A) para
las secciones institucionales, papel recortado (B) para las de naturaleza,
territorio y personas. Las cuatro de prueba quedaron en `pruebas/` con el
sufijo `-plano-a` y `-plano-b`.

## Cómo se ven en el video (definido el 24-09, en `archivo/src/taller-secuencia.tsx`)

La imagen de sección queda a pantalla completa DURANTE TODA la sección: entra
limpia, un oscurecido barre hasta la mitad y aparece el título; cuando el
título terminó, el oscurecido sigue hasta el final (la imagen nunca se pone
negra) y recién ahí entran los textos de la noticia, en tarjetas
transparentes encima. Además el código le aplica a todas dos capas iguales:
un TINTE del color de la sección (modo color, 30%) y el pictograma de la
sección GRABADO abajo a la derecha (8,5%). Por eso el fondo de cada imagen
debe ser EL COLOR DE SU SECCIÓN en la paleta de la casa (`src/tema.ts`):
así diez imágenes distintas se ven una familia y cada una se reconoce por su
color, sin repetir el mismo azul.

## Bloque fijo, versión 3 (reemplaza a las anteriores desde el 27-09)

    Fijo para todas:
    - 16:9, 1920 x 1080. Ilustración plana, de formas grandes y simples,
      como un pictograma editorial. NADA de fotografía, realismo, textura de
      foto, 3D, render, acuarela ni collage. Nada fantástico ni dramático.
    - Fondo de UN solo color, parejo y apagado, exactamente el que indica el
      prompt de la sección (va el código hexadecimal). El motivo en blanco
      hueso y en un tono más claro del mismo color del fondo. Nunca el cobre
      del canal (#D08A5B) ni naranjo.
    - La MITAD IZQUIERDA queda vacía, solo fondo parejo: ahí va el texto del
      video. El motivo va en la mitad derecha, grande, centrado en vertical.
    - Sin texto, sin letras, sin números, sin símbolos, sin logos, sin
      banderas, sin marcas. Sin personas, sin caras, sin siluetas humanas,
      sin lugares reconocibles.
    - Contraste medio: sin blancos puros ni negros cerrados.
    - No representa ningún hecho: es la sección, no la noticia del día.

Estilo A (geométrico): "formas geométricas puras, trazo limpio, esquinas
netas, sin degradados ni sombras suaves, estilo de pictograma de señalética
moderna". Estilo B (papel recortado): "formas redondeadas en dos tonos por
pieza, como papel recortado en capas, sombras planas, sin líneas de contorno,
sin degradados".

## Las doce secciones: color de la casa, estilo y motivo

Guardar cada una en `contenido/secciones/pruebas/<slug>.png` (para el video
de prueba). Pasan a `contenido/secciones/<slug>.png` solo cuando Santiago
apruebe el video de prueba: esa carpeta es producción. Economía y clima ya
existen en azul marino: se rehacen con su color cuando toque, después de ver
el video con las demás.

| Sección | Archivo | Fondo (paleta de la casa) | Estilo | Motivo único |
|---|---|---|---|---|
| clima | `clima.png` | #5A7D9A celeste piedra | B | sol detrás de una nube |
| emergencia | `emergencia.png` | #8A4A3C ladrillo oscuro | B | un triángulo de aviso vacío sobre una línea de horizonte |
| economia | `economia.png` | #8A6F3F ocre apagado | A | balanza con monedas |
| seguridad | `seguridad.png` | #7A5560 vino gris | A | un candado cerrado, grande y simple |
| congreso | `congreso.png` | #6B6257 piedra | A | un frontón con cuatro columnas reducido a formas |
| salud | `salud.png` | #3E7A70 verde clínico | A | una cruz gruesa dentro de un círculo |
| educacion | `educacion.png` | #55708A azul tiza | A | un libro abierto visto de frente, dos páginas |
| internacional | `internacional.png` | #6E5B7B lila gris | A | un globo de meridianos y paralelos, sin continentes |
| plata-publica | `plata-publica.png` | #806B45 ocre viejo | A | una carpeta de archivo con una moneda encima |
| regiones | `regiones.png` | #55705E verde campo | B | una cordillera de tres picos con un camino que la cruza |
| dato-curioso | `dato-curioso.png` | #A98F3C mostaza apagada | A | una lupa grande sobre un punto |
| deporte | `deporte.png` | #44546A azul pizarra | B | una pelota simple, un círculo con gajos, sobre una línea |

### Los doce prompts, listos para pegar (más el bloque fijo v3 al final)

1. clima (B): Ilustración plana de sección "Clima" para un canal de noticias, fondo parejo del color #5A7D9A (celeste piedra apagado). Un solo motivo en la mitad derecha: una nube grande de bordes redondeados en dos tonos y detrás medio sol de rayos anchos y redondeados. Papel recortado en capas, sombras planas, sin contornos. Neutro: ni tormenta ni día radiante.
2. emergencia (B): Ilustración plana de sección "Emergencia" para un canal de noticias, fondo parejo del color #8A4A3C (ladrillo oscuro). Un solo motivo en la mitad derecha: un triángulo de aviso vacío, grande, de bordes redondeados y dos tonos, apoyado sobre una línea de horizonte simple. Papel recortado en capas, sombras planas, sin contornos. Sin signo de exclamación ni ningún símbolo dentro.
3. economia (A): Ilustración plana de sección "Economía" para un canal de noticias, fondo parejo del color #8A6F3F (ocre apagado). Un solo motivo en la mitad derecha: una balanza de dos platos con formas geométricas simples, tres monedas planas apiladas en un plato y una en el otro, apenas inclinada. Trazo limpio, esquinas netas, sin degradados, pictograma de señalética moderna.
4. seguridad (A): Ilustración plana de sección "Seguridad" para un canal de noticias, fondo parejo del color #7A5560 (vino gris). Un solo motivo en la mitad derecha: un candado cerrado, grande y simple, de cuerpo rectangular con esquinas apenas redondeadas y arco grueso. Trazo limpio, sin degradados, pictograma de señalética moderna.
5. congreso (A): Ilustración plana de sección "Congreso" para un canal de noticias, fondo parejo del color #6B6257 (gris piedra). Un solo motivo en la mitad derecha: un frontón triangular sobre cuatro columnas iguales y una base escalonada, reducido a formas geométricas. Trazo limpio, sin degradados, pictograma de señalética moderna.
6. salud (A): Ilustración plana de sección "Salud" para un canal de noticias, fondo parejo del color #3E7A70 (verde clínico). Un solo motivo en la mitad derecha: una cruz gruesa de brazos iguales dentro de un círculo. Trazo limpio, sin degradados, pictograma de señalética moderna.
7. educacion (A): Ilustración plana de sección "Educación" para un canal de noticias, fondo parejo del color #55708A (azul tiza). Un solo motivo en la mitad derecha: un libro abierto visto de frente, dos páginas simétricas con tres líneas gruesas por página que sugieren texto sin ser letras. Trazo limpio, sin degradados, pictograma de señalética moderna.
8. internacional (A): Ilustración plana de sección "Internacional" para un canal de noticias, fondo parejo del color #6E5B7B (lila gris). Un solo motivo en la mitad derecha: un globo hecho solo de meridianos y paralelos, sin continentes, sobre un pie simple. Trazo limpio, sin degradados, pictograma de señalética moderna.
9. plata-publica (A): Ilustración plana de sección "Plata pública" para un canal de noticias, fondo parejo del color #806B45 (ocre viejo). Un solo motivo en la mitad derecha: una carpeta de archivo con pestaña, cerrada, y una moneda plana grande apoyada encima. Trazo limpio, sin degradados, pictograma de señalética moderna.
10. regiones (B): Ilustración plana de sección "Regiones" para un canal de noticias, fondo parejo del color #55705E (verde campo). Un solo motivo en la mitad derecha: una cordillera de tres picos en dos tonos y un camino de curvas suaves que la cruza. Papel recortado en capas, sombras planas, sin contornos.
11. dato-curioso (A): Ilustración plana de sección "Dato curioso" para un canal de noticias, fondo parejo del color #A98F3C (mostaza apagada). Un solo motivo en la mitad derecha: una lupa grande de aro grueso, y bajo el cristal un único punto. Trazo limpio, sin degradados, pictograma de señalética moderna.
12. deporte (B): Ilustración plana de sección "Deporte" para un canal de noticias, fondo parejo del color #44546A (azul pizarra). Un solo motivo en la mitad derecha: una pelota simple, un círculo con gajos curvos en dos tonos, apoyada sobre una línea. Papel recortado en capas, sombras planas, sin contornos.

## Carátula de prueba: la portada del 26-09-2026 (versión 2)

La primera versión salió con un trozo suelto flotando en el hueco y demasiado
de afiche. Regla nueva para todas las carátulas: NADA fantástico ni de
película; un objeto real, sobrio, como lo vería alguien pasando por ahí. Sigue
la fórmula de `prompts/imagen-caratula.md` (dos capas, figura AUSENCIA, luz
`grave`). Guardar en `contenido/secciones/pruebas/caratula-2026-09-26.png`.

    Imagen 16:9, 1920 x 1080, realista y sobria, como una fotografía tomada de
    noche con lluvia fina: paleta azul noche casi monocroma, luz fría y pareja,
    sin rayos de luz, sin luna dramática, sin niebla de película. Nada
    fantástico.

    FONDO, muy desenfocado y anónimo: un camino rural de montaña de noche, sin
    señalética, sin casas, sin personas, sin nada reconocible.

    OBJETO, nítido, arriba a la derecha, en el tercio superior: un puente de
    carretera común y corriente, de hormigón, visto de lado, con sus tramos
    iguales apoyados en pilares iguales. FALTA UN TRAMO en el medio: los dos
    extremos terminan limpios y rectos, y entre ellos hay solo aire y
    oscuridad. NO hay ningún trozo colgando, suelto ni flotando; no hay
    escombros, ni agua, ni vehículos, ni gente. El vacío es lo único que
    llama la atención.

    La mitad inferior izquierda queda oscura y despejada: ahí va el texto. Sin
    texto, sin letras, sin números, sin logos, sin banderas.
