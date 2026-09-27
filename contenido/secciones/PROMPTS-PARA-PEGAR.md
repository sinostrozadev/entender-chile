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

## Bloque fijo, versión 2 (reemplaza al de arriba desde el 27-09)

    Fijo para todas:
    - 16:9, 1920 x 1080. Ilustración plana, de formas grandes y simples,
      como un pictograma editorial. NADA de fotografía, realismo, textura de
      foto, 3D, render, acuarela ni collage.
    - Fondo de UN solo color, profundo, oscuro y parejo, el que dice el
      prompt de la sección. El motivo en blanco hueso y en un tono más claro
      del mismo color del fondo. Nada de cobre, naranjo ni amarillo.
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

## Las doce secciones: color, estilo y motivo

Guardar cada una en `contenido/secciones/pruebas/<slug>.png` (para el video
de prueba). Pasan a `contenido/secciones/<slug>.png` solo cuando Santiago
apruebe el video de prueba: esa carpeta es producción.

| Sección | Archivo | Fondo | Estilo | Motivo único |
|---|---|---|---|---|
| clima | `clima.png` | azul marino profundo | B | sol detrás de una nube (ya probado) |
| emergencia | `emergencia.png` | burdeos oscuro, rojo vino apagado | B | un triángulo de aviso vacío, grande, sobre una línea de horizonte |
| economia | `economia.png` | verde botella oscuro | A | balanza con monedas (ya probado, cambia el fondo) |
| seguridad | `seguridad.png` | gris pizarra azulado oscuro | A | un candado cerrado, grande y simple |
| congreso | `congreso.png` | azul acero oscuro | A | un frontón con cuatro columnas reducido a formas |
| salud | `salud.png` | verde azulado profundo, petróleo | A | una cruz gruesa dentro de un círculo |
| educacion | `educacion.png` | violeta ciruela oscuro | A | un libro abierto visto de frente, dos páginas |
| internacional | `internacional.png` | azul índigo profundo | A | un globo de meridianos y paralelos, sin continentes |
| plata-publica | `plata-publica.png` | verde oliva oscuro | A | una carpeta de archivo con una moneda encima |
| regiones | `regiones.png` | gris topo oscuro, marrón grisáceo | B | una cordillera de tres picos con un camino que la cruza |
| dato-curioso | `dato-curioso.png` | azul turquesa oscuro | A | una lupa grande sobre un punto |
| deporte | `deporte.png` | azul cobalto profundo | B | una pelota simple, un círculo con gajos, sobre una línea |

### Los doce prompts, listos para pegar (más el bloque fijo v2 al final)

1. clima (B): Ilustración plana de sección "Clima" para un canal de noticias, fondo azul marino profundo. Un solo motivo en la mitad derecha: una nube grande de bordes redondeados en dos tonos y detrás medio sol de rayos anchos y redondeados. Formas redondeadas como papel recortado en capas, sombras planas, sin contornos. Neutro: ni tormenta ni día radiante.
2. emergencia (B): Ilustración plana de sección "Emergencia" para un canal de noticias, fondo burdeos oscuro, rojo vino apagado. Un solo motivo en la mitad derecha: un triángulo de aviso vacío, grande, de bordes redondeados y dos tonos, apoyado sobre una línea de horizonte simple. Papel recortado en capas, sombras planas, sin contornos. Sin signo de exclamación ni ningún símbolo dentro.
3. economia (A): Ilustración plana de sección "Economía" para un canal de noticias, fondo verde botella oscuro. Un solo motivo en la mitad derecha: una balanza de dos platos con formas geométricas simples, tres monedas planas apiladas en un plato y una en el otro, apenas inclinada. Trazo limpio, esquinas netas, sin degradados, pictograma de señalética moderna.
4. seguridad (A): Ilustración plana de sección "Seguridad" para un canal de noticias, fondo gris pizarra azulado oscuro. Un solo motivo en la mitad derecha: un candado cerrado, grande y simple, de cuerpo rectangular con esquinas apenas redondeadas y arco grueso. Trazo limpio, sin degradados, pictograma de señalética moderna.
5. congreso (A): Ilustración plana de sección "Congreso" para un canal de noticias, fondo azul acero oscuro. Un solo motivo en la mitad derecha: un frontón triangular sobre cuatro columnas iguales y una base escalonada, reducido a formas geométricas. Trazo limpio, sin degradados, pictograma de señalética moderna.
6. salud (A): Ilustración plana de sección "Salud" para un canal de noticias, fondo verde azulado profundo, tono petróleo. Un solo motivo en la mitad derecha: una cruz gruesa de brazos iguales dentro de un círculo. Trazo limpio, sin degradados, pictograma de señalética moderna.
7. educacion (A): Ilustración plana de sección "Educación" para un canal de noticias, fondo violeta ciruela oscuro. Un solo motivo en la mitad derecha: un libro abierto visto de frente, dos páginas simétricas con tres líneas gruesas por página que sugieren texto sin ser letras. Trazo limpio, sin degradados, pictograma de señalética moderna.
8. internacional (A): Ilustración plana de sección "Internacional" para un canal de noticias, fondo azul índigo profundo. Un solo motivo en la mitad derecha: un globo hecho solo de meridianos y paralelos, sin continentes, sobre un pie simple. Trazo limpio, sin degradados, pictograma de señalética moderna.
9. plata-publica (A): Ilustración plana de sección "Plata pública" para un canal de noticias, fondo verde oliva oscuro. Un solo motivo en la mitad derecha: una carpeta de archivo con pestaña, cerrada, y una moneda plana grande apoyada encima. Trazo limpio, sin degradados, pictograma de señalética moderna.
10. regiones (B): Ilustración plana de sección "Regiones" para un canal de noticias, fondo gris topo oscuro, marrón grisáceo. Un solo motivo en la mitad derecha: una cordillera de tres picos en dos tonos y un camino de curvas suaves que la cruza. Papel recortado en capas, sombras planas, sin contornos.
11. dato-curioso (A): Ilustración plana de sección "Dato curioso" para un canal de noticias, fondo azul turquesa oscuro. Un solo motivo en la mitad derecha: una lupa grande de aro grueso, y bajo el cristal un único punto. Trazo limpio, sin degradados, pictograma de señalética moderna.
12. deporte (B): Ilustración plana de sección "Deporte" para un canal de noticias, fondo azul cobalto profundo. Un solo motivo en la mitad derecha: una pelota simple, un círculo con gajos curvos en dos tonos, apoyada sobre una línea. Papel recortado en capas, sombras planas, sin contornos.

## Carátula de prueba: la portada del 26-09-2026

Para el video de prueba del 26-09 (Curarrehue aislada, 7.850 personas sin
salida y un puente caído en Lautaro; `Clima de carátula: grave`). Sigue la
fórmula de `prompts/imagen-caratula.md`: dos capas (el fondo dice dónde, el
objeto dice qué), figura AUSENCIA (lo que falta se muestra como hueco), el
detalle exagerado en el tercio superior, objeto arriba a la derecha, mitad
inferior izquierda oscura y libre, sin cobre, sin texto. Guardar en
`contenido/secciones/pruebas/caratula-2026-09-26.png`.

    Imagen 16:9, 1920 x 1080, de aspecto fotográfico pero de un objeto
    genérico, no de un hecho real. Es de NOCHE, con lluvia fina: paleta azul
    noche casi monocroma, contraluz duro, sin cobre, naranjo ni amarillo.

    FONDO, muy desenfocado y anónimo: un camino rural de montaña bajo la
    lluvia, de noche, sin señalética, sin casas, sin personas, sin nada
    reconocible; solo se intuye el camino, la bruma y el relieve.

    OBJETO, nítido, arriba a la derecha, ocupando el tercio superior: un
    puente sencillo visto de lado, hecho de tramos idénticos (como tablones
    o vigas iguales, todos del mismo tamaño y del mismo material) iluminados
    parejos por un contraluz frío. En el medio FALTA UN TRAMO: un hueco negro
    limpio, más ancho de lo que sería en la realidad, y el ojo va ahí. No se
    ve agua desbordada, ni escombros, ni vehículos, ni gente: solo el hueco.

    La mitad inferior izquierda queda oscura, casi negra y despejada: ahí va
    el texto. Sin texto, sin letras, sin números, sin logos, sin banderas.
    Nada morboso, nada roto salvo la ausencia del tramo.
