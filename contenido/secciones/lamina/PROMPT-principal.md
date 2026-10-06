# El fondo del bloque principal

Para `contenido/secciones/lamina/principal.jpg`, que es el fondo de "La noticia
del día", el bloque más largo del informe.

**Por qué es OSCURO y no claro como el resto de la Lámina.** Los bloques del
video llevan encima un velo calculado para imágenes oscuras (`velo()` en
`src/tarjetas.tsx`, alfa 0,76). Probado el 05-10-2026 con la lámina clara
debajo: la deja de un gris sucio que no se parece a nada del canal. Mientras
ese velo no sea consciente del tono, el fondo del principal tiene que nacer
oscuro. Si algún día se arregla el velo, este prompt se rehace en claro y pasa
a ser una lámina más del set.

**Por qué el motivo no es un tema.** Todas las demás láminas dibujan el
instrumento con que se mide su tema: economía una curva, clima un mapa de
isobaras. "La noticia del día" no tiene tema, cambia todos los días. Así que su
motivo es el OFICIO, no la noticia: la mesa donde se arma el informe.

**Este prompt se corrige después de cada entrega**, mirando la imagen que
volvió. El registro de vueltas va al final del archivo, con la línea que se
agregó y el defecto que la pagó.

---

## El prompt, para pegar tal cual

```
LÁMINA DE SECCIÓN, VARIANTE OSCURA: una pantalla partida, no una ilustración
centrada. Relación 16:9, al menos 1600 píxeles de ancho, sin transparencia. El
texto del video va ENCIMA, a la izquierda, y encima de todo lleva un velo
oscuro, así que la imagen tiene que nacer oscura y aguantarlo.

LA COMPOSICIÓN, que es lo que define este estilo:

- MITAD IZQUIERDA COMPLETAMENTE LIMPIA. Solo la superficie. Sin trazos, sin el
  borde del motivo asomando, sin que la trama se marque más. Ahí va el texto y
  no puede competir con nada.
- MITAD DERECHA: el motivo dibujado A LÍNEA, GRANDE, ocupando esa mitad casi
  entera, ligeramente girado, como una lámina apoyada sobre la mesa.
- EL MOTIVO ENTRA COMPLETO EN EL CUADRO. Ninguna pieza se corta contra el
  borde de arriba, el de la derecha ni el de abajo: queda un margen limpio de
  superficie, de al menos un 4% del ancho, entre la pieza más externa y cada
  borde. "Grande" quiere decir que llena su mitad, no que se sale del cuadro.
  Una lámina apoyada sobre la mesa se ve entera; una que se corta contra el
  marco se lee como una foto mal encuadrada.

EL MOTIVO: una mesa de redacción vista desde arriba, en escorzo. Sobre ella,
ordenadas y apenas superpuestas, las piezas con que se arma un informe: hojas
impresas con columnas de texto, un cuaderno abierto, un par de recortes, una
regla, un lápiz. NO una escena de oficina: un bodegón de instrumentos, quieto y
limpio, como la lámina de un manual. Nada identificable, ninguna marca, ningún
titular legible: las líneas de texto son líneas, no palabras.

LOS HUECOS DE IMAGEN dentro de las hojas y los recortes (los rectángulos que en
un diario llevarían una foto) van VACÍOS o con un aspa, o a lo sumo con una
curva abstracta sin ejes ni rótulos. Nunca una silueta de ciudad, un edificio,
un mapa ni un paisaje: lo que ahí se dibuje empieza a ser un lugar, y un lugar
reconocible mal dibujado cuesta más credibilidad que un hueco vacío.

LA SUPERFICIE: gris azulado muy oscuro y parejo (#1A1D21), con una trama fina de
papel milimetrado apenas perceptible, de borde a borde. Es la materia, no un
marco.

EL TRAZO: hueso (#E8E7E1), fino y de grosor constante, sin relleno, sin sombras
y sin degradados. Como un plano o un diagrama técnico, no como un dibujo a mano
ni como una fotografía.

EL ACENTO, UNO SOLO: un elemento en verde pátina de cobre (#2F7263), sólido y
pequeño, dentro del motivo. Es lo único con color en todo el cuadro.

Contraste bajo y parejo en toda la mitad izquierda: sin zonas que salten, sin
destellos, sin viñeta y sin sombra proyectada que invada ese lado. Y nada de
luz dramática: esta imagen va a quedar DEBAJO de un velo oscuro y de texto, así
que tiene que ser legible a media luz, no lucirse sola.

REGLAS DEL CANAL, con su porqué, para que no se pierdan por el camino:

- SIN PERSONAS. Ni reales, ni reconocibles, ni parecidas a alguien. En Chile la
  propia imagen está protegida, y una cara generada al lado de una noticia
  afirma algo que ninguna fuente dijo. Una figura de espaldas y sin rasgos sí
  se puede, pero acá no hace falta ninguna: es un bodegón.
- SIN BANDERA A COLOR, ni la chilena ni ninguna. La identidad del canal dice
  "sin bandera" porque es apolítico y no patriotero.
- UNA SOLA TINTA, siempre. El canal tiene un acento único y es un verde frío:
  cualquier segunda familia de color rompe el sistema entero.
- SIN TEXTO dentro de la imagen. El texto lo pone el video, que sabe el tamaño,
  el color y la palabra exacta. Las hojas dibujadas llevan LÍNEAS, no letras.
- NINGUNA MARCA ni logotipo ajeno.
```

---

## Dónde va y cómo se enciende

1. La imagen queda en `contenido/secciones/lamina/principal.jpg`, 1920x1080. Lo
   que devuelve el generador casi nunca mide eso (la vuelta 1 llegó en 1672x941
   PNG de 1,55 MB), así que de este lado se escala a 1920x1080 y se guarda en
   JPEG: el fondo se decodifica en cada cuadro del render y un PNG de 1,5 MB se
   paga 2.600 veces en un informe de dos minutos.
2. Para que el bloque principal la use hay que darle categoría: hoy "La noticia
   del día" no tiene `[categoria]` en el guion, que es por lo que nunca tuvo
   lámina y dependía de la carátula. La vía limpia es que
   `scripts/imagenes-secciones.js` mapee el bloque principal a `principal`.
3. Se mira con una corrida real antes de encenderla, como todo lo que se ve.

---

## Vueltas

**Vuelta 1, 06-10-2026.** La entrega acertó el estilo entero a la primera: la
mitad izquierda quedó limpia de verdad, el trazo es parejo y sin relleno, la
trama se insinúa sin marcarse y el acento verde es uno solo (una pinza de
carpeta). Tres defectos, y los tres eran vacíos del prompt, no fallas del
generador:

1. **El motivo se cortaba contra el borde de arriba y el de la derecha.** El
   diario superior nacía fuera del cuadro y la regla y el lápiz salían por el
   costado. El prompt decía "GRANDE, ocupando esa mitad casi entera" y no decía
   que entrara completo, así que "grande" se leyó como "sangrando". Se agregó
   el punto EL MOTIVO ENTRA COMPLETO EN EL CUADRO, con el margen medido.
2. **Los huecos de imagen venían con siluetas de ciudad.** Tres recortes traían
   un perfil de edificios. Nadie lo pidió y nada lo prohibía. Un skyline es un
   lugar, y la regla del canal sobre lugares es que se dibujan bien o no se
   dibujan. Se agregó el punto LOS HUECOS DE IMAGEN.
3. **El formato.** Se pidió "1920 x 1080" y llegó 1672x941 PNG. Pedir píxeles
   exactos a un generador de imágenes no funciona y no vale la pena insistir:
   el prompt ahora pide 16:9 con un mínimo de ancho y el ajuste queda de este
   lado, escrito en el paso 1 de arriba.

Contra reglas de YouTube: nada que corregir. La imagen no lleva personas, ni
marcas, ni texto, ni material de terceros.
