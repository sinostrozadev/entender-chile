# Variantes del estilo grabado

Cada concepto puede tener varias imágenes. **La `-a` es la que usa el video por
defecto**; las demás están para elegir según el contexto de la noticia, que es
lo que pidió Santiago el 29-09-2026: "no perdamos las imágenes que ya tenemos,
almacénalas y en la biblioteca muestra las que hayan por concepto, así hay más
de dónde agarrar de acuerdo al contexto".

Una variante se guarda solo si **pasa la vara** (`scripts/revisar-imagen.js`).
Lo que no la pasa no es una variante, es un descarte, y se borra.

Acá va por qué existe cada una, que es lo que no se puede leer mirando el
archivo.

## anuncio

- **`anuncio-a.png`** El racimo de micrófonos sobre un atril, sin nadie. Es la
  de por defecto porque el concepto casi nunca es una conferencia de prensa: se
  activa con "Canadá anunció aranceles" y "una feria laboral anunció seiscientas
  vacantes". Un objeto no afirma que alguien dio una conferencia.
- **`anuncio-b.png`** La sala de prensa con la figura de espaldas en el atril.
  **Úsala cuando la noticia SÍ es una conferencia de prensa.** Es la primera
  imagen de la biblioteca con una persona, y entra bajo el criterio de la regla
  29: la figura va solo donde la persona es el hecho.

## congreso

- **`congreso-a.png`** El hemiciclo con las filas concéntricas curvas. Salió de
  una instrucción de Santiago, "busca la imagen del congreso y básate en esa",
  que es la que después se incorporó al bloque del estilo.
- **`congreso-b.png`** Sala de filas rectas, con las dos banderas. Trajo los
  emblemas y perdió la geometría. Sirve si alguna vez se necesita una segunda
  imagen del concepto, no como reemplazo.

## fiscalia

- **`fiscalia-d.png`** El tercer intento y **el mejor de los tres**: el pórtico de
  pilares altos, el atrio vidriado al fondo y el emblema en el pilar derecho. Es
  el que se muestra mientras no llegue la carpeta. Llegó con la zona
  transparente pintada de oscuro, que se ve en la vista previa y desaparece al
  usarla, porque el alfa de esos píxeles es cero: el recortador no tuvo que
  hacer nada.
- **`fiscalia-b.png`** y **`fiscalia-c.png`** El edificio, dos encuadres. **No se
  puede afirmar ni descartar que sea el edificio real** de Catedral 1437:
  la fachada sur con el jardín colgante y el entorno de la Iglesia Santa Ana no
  pueden verse en una vista de esquina de otra cara, y el ala de lamas
  horizontales juega a favor (una de las fuentes del edificio es de un
  fabricante de quiebrasoles). El emblema del pilar sigue sin verificar.
  No son la de por defecto por otra razón: **ese edificio no lo reconoce nadie**,
  a diferencia de La Moneda, así que una imagen exacta igual no rinde. La `-a`
  del concepto es la carpeta cerrada.

## gobierno

- **`gobierno-a.png`** La Moneda desde la Plaza de la Constitución. Costó once
  intentos y es la única del día que necesitó imagen a imagen.
- **`gobierno-b.png`** La misma en 2000x750. **No pasa la vara** por las
  medidas: a 2,67 a 1 se ve como una franja. Se conserva por si alguna vez hace
  falta un encuadre apaisado, y por eso es la única excepción a la regla de que
  lo que no pasa se borra.

## tribunales

- **`tribunales-a.png`** La sala de madera con el escudo de Chile sobre la
  puerta. Es la primera imagen del día en la que un emblema llegó donde se pidió.
- **`tribunales-b.png`** Sala frontal, casi un alzado, sin escudo y sin
  profundidad. Pasa la vara y mide dentro de la familia.

## precio

- **`precio-a.png`** Las pesas de bronce de balanza. Es una **metáfora** y no la
  cosa literal, que es la excepción del conjunto: los micrófonos de anuncio y el
  reloj control de empleo existen en la escena de la noticia, las pesas no. Se
  aceptan porque precio es una magnitud y no tiene escena propia, no porque la
  regla haya cambiado.

## vivienda

- **`vivienda-a.png`** La hilera de casas pareadas. Dice conjunto y programa, que
  es de lo que hablan los párrafos: cinco mil viviendas comprometidas, dos mil
  millones para dinamizar la vivienda, cientos de viviendas con daños.
