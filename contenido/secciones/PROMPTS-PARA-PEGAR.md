# Prompts de imágenes, para pegar en el chat de ChatGPT

Escrito el 24-09-2026, con GPT sin cuota para el canal del PR pero todavía
disponible desde el chat. Santiago pega estos prompts, GPT devuelve la imagen,
y Santiago la guarda en la ruta que dice cada bloque.

**Lo que cambió y baja mucho la exigencia:** desde el 24-09 las imágenes de
sección llevan encima, por código, dos capas que antes se le pedían a la
imagen: el **tinte** del color de la sección y el **pictograma grabado** en la
esquina. Eso significa que la foto ya no tiene que "explicar" la sección. Solo
tiene que ser un ambiente bueno, tranquilo y con la izquierda despejada.

## Las reglas fijas: van en TODOS los pedidos

Pega esto al final de cualquiera de los prompts de abajo.

    Fijo para todas:
    - 16:9, 1920 x 1080, fotográfica. Nada de pintura, acuarela, ilustración,
      render ni collage. Si se ve dibujada, está mal.
    - La MITAD IZQUIERDA va despejada y pareja: ahí se pinta el texto del
      video. El peso visual va a la derecha.
    - Contraste medio. Sin blancos quemados ni negros cerrados: encima va un
      velo oscuro y texto blanco, y si la foto ya es extrema el texto pelea.
    - Sin texto, sin letras, sin números, sin símbolos, sin logos, sin marcas.
    - Sin personas, sin caras, sin lugares identificables, sin geografía
      reconocible.
    - Nada de cobre ni naranjo: ese color es del banner de texto que va
      encima. Por lo mismo, ningún atardecer.
    - No representa ningún hecho noticioso: nada de víctimas, destrozos,
      rescates ni emergencias. Es ambiente, no noticia.

## 1. Clima, versión 2 — la que quedó pendiente

Guardar en: `contenido/secciones/clima.png`

    Corrección de una imagen que ya hiciste: un cielo azul profundo con una
    masa de nubes a la derecha. La composición está bien y hay que
    conservarla: mitad izquierda de cielo abierto y parejo, mitad derecha con
    el peso de las nubes. No la rehagas de cero.

    El único cambio: SACA EL RAYO DE SOL. En la versión actual el sol se abre
    entre las nubes con rayos visibles, y eso cuenta una historia ("después
    de la tormenta sale el sol") que la sección va a repetir todos los días,
    incluidos los de mal pronóstico. En su lugar, la misma masa de nubes
    iluminada desde atrás de forma pareja y difusa, sin haz de luz y sin un
    punto brillante que sea el centro de atención.

    Además: baja el blanco más brillante, que tenga cuerpo y no sea blanco
    puro. Y la mitad izquierda, todavía más pareja.

## 2. Las nueve que faltan

Mismo molde para todas. Reemplaza lo que va entre < >.

    Imagen permanente de la sección <NOMBRE> del informe diario de un canal
    de noticias. No ilustra una noticia: es el ambiente de la sección, se
    repite durante meses y va de fondo con texto encima.

    El ambiente: <AMBIENTE>

Los ambientes, uno por sección:

| Sección | Guardar en | Ambiente sugerido |
|---|---|---|
| economía | `economia.png` | un escritorio de oficina antigua a media luz, papeles y una lámpara encendida al fondo, sin pantallas |
| seguridad | `seguridad.png` | una calle urbana de noche después de la lluvia, asfalto mojado reflejando luces, vacía |
| congreso | `congreso.png` | un pasillo institucional con columnas de piedra y luz de ventanal alta, vacío |
| salud | `salud.png` | un pasillo de hospital en penumbra, luz fría al fondo, sin camillas ni personas |
| educación | `educacion.png` | una sala de clases vacía con luz de tarde entrando por las ventanas |
| internacional | `internacional.png` | una sala de reuniones vacía con sillas alrededor de una mesa larga, luz de día |
| plata pública | `plata-publica.png` | archivadores y carpetas apiladas en un archivo oficial, luz de tubo |
| regiones | `regiones.png` | un camino rural de tierra entre campo abierto, cielo amplio, sin señalética |
| dato curioso | `dato-curioso.png` | objetos comunes ordenados sobre una mesa, luz lateral suave, escala de gabinete |
| emergencia | `emergencia.png` | cielo cargado sobre un terreno abierto, polvo o bruma en el aire, nada roto |

**Ojo con emergencia**: es la sección nueva del 24-09 (terremoto, aluvión,
avalancha, incendio). Es la que más aparece y la única sin identidad. Pero es
también en la que más fácil se cruza la regla 29: nada de destrozos, nada de
rescates, nada de víctimas. Ambiente de que algo va a pasar o acaba de pasar,
nunca el hecho.

## Cómo saber si una imagen sirve, antes de guardarla

Tres preguntas. Si alguna falla, pídela de nuevo.

1. ¿La mitad izquierda está despejada? Ahí va el texto.
2. ¿Sirve igual para una noticia buena y una mala de esa sección? Si solo
   sirve para una, opina, y no puede.
3. ¿Se ve fotográfica? Si duda entre foto y dibujo, está mal.
