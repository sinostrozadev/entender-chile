# Biblioteca de conceptos: los prompts para pegar

**28-09-2026.** Veinte conceptos, dos imágenes cada uno. Con estos veinte se
toca el **89% de los 879 párrafos narrados** de los 36 guiones del informe: el
número entre paréntesis es en cuántos aparece cada uno.

Son **dos motivos distintos del mismo concepto**, no dos estilos: así dos
párrafos que hablan de lo mismo en la misma edición no repiten imagen.

## Para qué son

Para ponerlas **donde hoy va un párrafo de texto mientras habla el locutor**,
que es el 34% del video.

## NO se componen como las de sección, y esto se probó

Se rindió la prueba antes de escribir estos prompts (`src/prueba-parrafo.tsx`).
Poniendo una imagen de sección donde iba el párrafo, **el cuadro queda vacío**:
esas imágenes tienen la mitad izquierda despejada a propósito, para que ahí
quepa el texto, y si el texto se va esa mitad queda muerta. Se probó además
corriendo el motivo al centro y quedó peor.

Por eso acá el motivo va **centrado y ocupando el cuadro**. Son dos familias
distintas y no se pueden intercambiar: la de sección convive con el texto, la
de la biblioteca lo reemplaza.

## Aviso: el archivo de prompts de sección está desactualizado

`contenido/secciones/PROMPTS-PARA-PEGAR.md` describe en su "bloque fijo,
versión 3" un fondo de un solo color apagado con el motivo en blanco hueso. Las
imágenes que están AL AIRE no son eso: medido sobre las tres que hay en
producción, su color promedio es **#F1F0F1, #EAEBE8 y #ECEDE9**, o sea papel
casi blanco con el dibujo oscuro encima. El bloque de acá abajo describe lo que
de verdad se está viendo, no lo que dice ese archivo.

## PRIMERO ESTO: la prueba de estilo (29-09-2026)

**No generes los cuarenta todavía.** Estos dos son el mismo concepto y el mismo
motivo, y lo único que cambia es el estilo. Con los dos al lado se decide, y
con esa decisión se reescriben los cuarenta de abajo.

El concepto es **gobierno**, que es el que más aparece: 152 de los 879 párrafos
narrados. Si el estilo funciona ahí, funciona.

### Prueba 1: trazo grueso sobre oscuro (mi recomendación)

Guardar en: `contenido/biblioteca/pruebas/gobierno-oscuro.png`

    Ilustración de línea para un canal de noticias, del concepto "gobierno".
    Un solo motivo, centrado: un atril vacío visto de frente, con un
    micrófono delgado inclinado sobre él. Dibujo de contorno, sin relleno,
    como un grabado antiguo pero de trazo GRUESO y parejo.

    - 16:9, 1920 x 1080.
    - Fondo de un gris azulado muy oscuro y parejo (#23262A), sin textura,
      sin degradado, sin viñeta.
    - El motivo en línea color hueso claro (#E8E7E1), de trazo grueso y
      uniforme, sin relleno macizo, sin sombras y sin degradados.
    - El motivo va CENTRADO y ocupa el cuadro: casi todo el alto y buena
      parte del ancho, con aire parejo a los cuatro lados. Nada de dejar una
      mitad vacía.
    - Sin letras, sin números, sin logos, sin banderas, sin marcas.
    - Sin personas, sin caras, sin siluetas humanas, sin lugares
      reconocibles, sin edificios existentes.
    - NADA de fotografía, realismo, 3D, render, acuarela ni collage. Nada
      dramático ni fantástico.
    - No representa ningún hecho: es el concepto, no la noticia del día.

### Prueba 2: trazo fino sobre papel

Guardar en: `contenido/biblioteca/pruebas/gobierno-papel.png`

    Ilustración de línea para un canal de noticias, del concepto "gobierno".
    Un solo motivo, centrado: un atril vacío visto de frente, con un
    micrófono delgado inclinado sobre él. Dibujo de contorno, sin relleno,
    como un grabado de manual antiguo, de trazo fino y parejo.

    - 16:9, 1920 x 1080.
    - Fondo de papel claro y parejo, color hueso (#EFEFEC), con una textura
      de fibra apenas perceptible.
    - El motivo en línea gris oscura (#3A3D42), de trazo fino y uniforme,
      sin relleno macizo, sin sombras y sin degradados.
    - El motivo va CENTRADO y ocupa el cuadro: casi todo el alto y buena
      parte del ancho, con aire parejo a los cuatro lados. Nada de dejar una
      mitad vacía.
    - Sin letras, sin números, sin logos, sin banderas, sin marcas.
    - Sin personas, sin caras, sin siluetas humanas, sin lugares
      reconocibles, sin edificios existentes.
    - NADA de fotografía, realismo, 3D, render, acuarela ni collage. Nada
      dramático ni fantástico.
    - No representa ningún hecho: es el concepto, no la noticia del día.

### Qué se está comparando, y qué mirar

Medido sobre el tablero (`src/tablero-estilos.tsx`): el video tiene un brillo
medio de **77**. El papel sin velo queda en **236**, tres veces más, y
encendería la pantalla veinticuatro veces por edición. Bajo el velo el brillo
calza en 74 pero el dibujo se despega solo **35** del fondo. El oscuro queda en
**43** de brillo y el dibujo se despega **193**.

Los números favorecen al oscuro, pero están medidos sobre un dibujo que hice yo
en código, no sobre arte de verdad. Por eso vale generar los dos.

Con las dos imágenes acá las monto en un cuadro real del informe, donde hoy va
un párrafo, y se ven en su contexto antes de decidir.

**Aviso**: los modelos de imagen suelen ensuciar los fondos oscuros, con
manchas o degradados que el prompt no pidió. Si la prueba 1 sale sucia o con el
fondo desparejo, no es que el estilo no sirva: hay que volver a pedirla.

## El bloque fijo: va al final de TODOS los pedidos

    Fijo para todas:
    - 16:9, 1920 x 1080. Ilustración plana de líneas, como un grabado de
      manual antiguo. NADA de fotografía, realismo, 3D, render ni collage.
      Nada dramático ni fantástico.
    - Fondo de papel claro y parejo, color hueso (#EFEFEC), con una textura
      de fibra apenas perceptible. El motivo dibujado ENCIMA en línea gris
      oscura (#3A3D42), de trazo fino y parejo, sin relleno macizo, sin
      degradados y sin sombras.
    - El motivo va CENTRADO y ocupa el cuadro: casi todo el alto y buena
      parte del ancho, con aire parejo a los cuatro lados. Nada de dejar una
      mitad vacía.
    - Sin letras, sin números, sin logos, sin banderas, sin marcas.
    - Sin personas, sin caras, sin siluetas humanas, sin lugares
      reconocibles, sin edificios existentes.
    - Contraste medio: el papel nunca blanco puro, la línea nunca negra.
    - NO representa ningún hecho: es el concepto, no la noticia del día. Si
      se puede decir "esa es la foto de tal cosa que pasó", está mal.

## Cómo saber si sirve, antes de guardarla

Achícala al tamaño de un pulgar: el motivo tiene que seguir entendiéndose.
Tápale la mitad izquierda: no se pierde nada importante. Y la prueba que de
verdad importa acá: **mírala catorce segundos seguidos**, que es lo que dura un
párrafo. Si a los cinco ya cansa, sobra detalle.

## Dónde se guardan

`contenido/biblioteca/<estilo>/<concepto>-a.png` y `-b.png`. Hoy el estilo
que rige es `papel`, así que van en `contenido/biblioteca/papel/`.

---

## 1. El gobierno (152 párrafos)

### El gobierno, motivo A

Guardar en: `contenido/biblioteca/papel/gobierno-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el gobierno". Un solo motivo en la mitad derecha: un atril vacío visto de frente, con un micrófono delgado inclinado sobre él.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El gobierno, motivo B

Guardar en: `contenido/biblioteca/papel/gobierno-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el gobierno". Un solo motivo en la mitad derecha: un sello circular de lacre apoyado en la esquina de un documento, el documento apenas insinuado con dos dobleces.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 2. Una investigación (137 párrafos)

### Una investigación, motivo A

Guardar en: `contenido/biblioteca/papel/investigacion-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una investigación". Un solo motivo en la mitad derecha: una lupa grande apoyada sobre una carpeta abierta, el mango en diagonal.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Una investigación, motivo B

Guardar en: `contenido/biblioteca/papel/investigacion-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una investigación". Un solo motivo en la mitad derecha: un cordel tendido con tres fichas rectangulares colgando, unidas entre sí por líneas finas.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 3. Un anuncio (132 párrafos)

### Un anuncio, motivo A

Guardar en: `contenido/biblioteca/papel/anuncio-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un anuncio". Un solo motivo en la mitad derecha: un megáfono de bocina ancha en diagonal, con tres arcos de sonido saliendo.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un anuncio, motivo B

Guardar en: `contenido/biblioteca/papel/anuncio-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un anuncio". Un solo motivo en la mitad derecha: una hoja saliendo a medias de un sobre abierto, el sobre plano y de frente.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 4. El dinero público (127 párrafos)

### El dinero público, motivo A

Guardar en: `contenido/biblioteca/papel/dinero-publico-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el dinero público". Un solo motivo en la mitad derecha: una pila de seis monedas planas vista de canto, la de arriba apenas corrida.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El dinero público, motivo B

Guardar en: `contenido/biblioteca/papel/dinero-publico-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el dinero público". Un solo motivo en la mitad derecha: un billete plegado en tres, visto en perspectiva plana, sin ninguna marca ni cifra encima.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 5. El transporte (126 párrafos)

### El transporte, motivo A

Guardar en: `contenido/biblioteca/papel/transporte-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el transporte". Un solo motivo en la mitad derecha: una ruta que se angosta hacia el horizonte, con la línea discontinua del medio y una barrera a un costado.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El transporte, motivo B

Guardar en: `contenido/biblioteca/papel/transporte-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el transporte". Un solo motivo en la mitad derecha: un vagón visto de frente, rectangular, con dos ventanas cuadradas y un faro circular.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 6. Un ministerio (125 párrafos)

### Un ministerio, motivo A

Guardar en: `contenido/biblioteca/papel/ministerio-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un ministerio". Un solo motivo en la mitad derecha: una fachada de cinco columnas con frontón triangular, muy simplificada, sin escalinata.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un ministerio, motivo B

Guardar en: `contenido/biblioteca/papel/ministerio-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un ministerio". Un solo motivo en la mitad derecha: una carpeta gruesa cerrada con un cordón cruzado y un nudo al centro.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 7. Una ley (113 párrafos)

### Una ley, motivo A

Guardar en: `contenido/biblioteca/papel/ley-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una ley". Un solo motivo en la mitad derecha: un pergamino desplegado en vertical con renglones sugeridos por líneas finas, enrollado arriba y abajo.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Una ley, motivo B

Guardar en: `contenido/biblioteca/papel/ley-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una ley". Un solo motivo en la mitad derecha: un mazo de madera apoyado en diagonal sobre su base circular.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 8. La seguridad (112 párrafos)

### La seguridad, motivo A

Guardar en: `contenido/biblioteca/papel/seguridad-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "la seguridad". Un solo motivo en la mitad derecha: un escudo de contorno grueso partido por una diagonal, las dos mitades en tonos distintos.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### La seguridad, motivo B

Guardar en: `contenido/biblioteca/papel/seguridad-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "la seguridad". Un solo motivo en la mitad derecha: una reja de siete barrotes verticales con dos travesaños, vista de frente.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 9. El presupuesto (109 párrafos)

### El presupuesto, motivo A

Guardar en: `contenido/biblioteca/papel/presupuesto-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el presupuesto". Un solo motivo en la mitad derecha: cinco barras verticales de alturas distintas apoyadas en una línea base, una de ellas cortada por una línea horizontal.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El presupuesto, motivo B

Guardar en: `contenido/biblioteca/papel/presupuesto-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el presupuesto". Un solo motivo en la mitad derecha: un círculo dividido en cuatro porciones desiguales, una de ellas separada del resto.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 10. Las regiones (99 párrafos)

### Las regiones, motivo A

Guardar en: `contenido/biblioteca/papel/regiones-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "las regiones". Un solo motivo en la mitad derecha: una franja larga y angosta en vertical, dividida en siete bandas horizontales de distinto tono, sin parecerse a ningún territorio real.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Las regiones, motivo B

Guardar en: `contenido/biblioteca/papel/regiones-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "las regiones". Un solo motivo en la mitad derecha: un juego de curvas de nivel concéntricas, como un mapa topográfico abstracto.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 11. El mercado (88 párrafos)

### El mercado, motivo A

Guardar en: `contenido/biblioteca/papel/mercado-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el mercado". Un solo motivo en la mitad derecha: una línea quebrada que sube y baja sobre una base horizontal, con tres puntos marcados en sus vértices.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El mercado, motivo B

Guardar en: `contenido/biblioteca/papel/mercado-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el mercado". Un solo motivo en la mitad derecha: una balanza de dos platos colgantes, apenas inclinada hacia un lado.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 12. Un tribunal (86 párrafos)

### Un tribunal, motivo A

Guardar en: `contenido/biblioteca/papel/tribunal-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un tribunal". Un solo motivo en la mitad derecha: una balanza de fiel vertical con los dos platos al mismo nivel, de trazo delgado.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un tribunal, motivo B

Guardar en: `contenido/biblioteca/papel/tribunal-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un tribunal". Un solo motivo en la mitad derecha: un estrado vacío visto de tres cuartos, un panel alto y un banco corrido detrás.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 13. Un informe (85 párrafos)

### Un informe, motivo A

Guardar en: `contenido/biblioteca/papel/informe-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un informe". Un solo motivo en la mitad derecha: una hoja de frente con una cuadrícula de líneas y una línea de tendencia cruzándola en diagonal.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un informe, motivo B

Guardar en: `contenido/biblioteca/papel/informe-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un informe". Un solo motivo en la mitad derecha: cuatro barras horizontales de largos distintos, alineadas a la izquierda, sobre un eje vertical.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 14. El congreso (71 párrafos)

### El congreso, motivo A

Guardar en: `contenido/biblioteca/papel/congreso-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el congreso". Un solo motivo en la mitad derecha: un hemiciclo visto desde arriba: cinco arcos concéntricos de asientos cuadrados alrededor de un podio central.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El congreso, motivo B

Guardar en: `contenido/biblioteca/papel/congreso-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el congreso". Un solo motivo en la mitad derecha: un tablero rectangular con una cuadrícula de luces circulares, unas encendidas y otras apagadas.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 15. Un acuerdo (68 párrafos)

### Un acuerdo, motivo A

Guardar en: `contenido/biblioteca/papel/acuerdo-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un acuerdo". Un solo motivo en la mitad derecha: dos hojas rectangulares superpuestas en ángulo, con un sello circular que cae sobre las dos a la vez.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un acuerdo, motivo B

Guardar en: `contenido/biblioteca/papel/acuerdo-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un acuerdo". Un solo motivo en la mitad derecha: un lazo de cinta ancha atado en un nudo simple, las dos puntas hacia abajo.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 16. Un banco (61 párrafos)

### Un banco, motivo A

Guardar en: `contenido/biblioteca/papel/banco-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un banco". Un solo motivo en la mitad derecha: una alcancía de forma redondeada vista de perfil, con la ranura marcada arriba.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Un banco, motivo B

Guardar en: `contenido/biblioteca/papel/banco-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "un banco". Un solo motivo en la mitad derecha: un cajero automático visto de frente: un cuerpo rectangular, una pantalla y una bandeja.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 17. El empleo (58 párrafos)

### El empleo, motivo A

Guardar en: `contenido/biblioteca/papel/empleo-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el empleo". Un solo motivo en la mitad derecha: un casco de obra visto de tres cuartos, con su visera y su cresta.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El empleo, motivo B

Guardar en: `contenido/biblioteca/papel/empleo-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el empleo". Un solo motivo en la mitad derecha: un reloj de marcaje rectangular con una tarjeta asomando por la ranura de abajo.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 18. Una alerta (57 párrafos)

### Una alerta, motivo A

Guardar en: `contenido/biblioteca/papel/alerta-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una alerta". Un solo motivo en la mitad derecha: un triángulo de contorno grueso con una barra vertical gruesa al centro y un punto debajo.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### Una alerta, motivo B

Guardar en: `contenido/biblioteca/papel/alerta-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "una alerta". Un solo motivo en la mitad derecha: una campana de sirena vista de frente, con tres arcos de sonido a cada lado.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 19. El mundo (55 párrafos)

### El mundo, motivo A

Guardar en: `contenido/biblioteca/papel/mundo-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el mundo". Un solo motivo en la mitad derecha: un globo terráqueo reducido a meridianos y paralelos, sin continentes reconocibles.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El mundo, motivo B

Guardar en: `contenido/biblioteca/papel/mundo-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el mundo". Un solo motivo en la mitad derecha: un sobre de correo aéreo visto de frente, con un cordel punteado que sale de una esquina y se curva.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

## 20. El cobre (51 párrafos)

### El cobre, motivo A

Guardar en: `contenido/biblioteca/papel/cobre-a.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el cobre". Un solo motivo en la mitad derecha: una roca partida en dos, con una veta en zigzag más clara recorriéndola por dentro.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

### El cobre, motivo B

Guardar en: `contenido/biblioteca/papel/cobre-b.png`

    Ilustración de línea para un canal de noticias, del concepto
    "el cobre". Un solo motivo en la mitad derecha: un rollo de cable grueso enrollado en espiral, visto de frente.
    Trazo de grabado antiguo, fino y parejo.

    (pegar acá el bloque "Fijo para todas")

