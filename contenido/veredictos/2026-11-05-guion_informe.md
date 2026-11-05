VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-05T08:02:30Z

Observaciones:
- Las dos correcciones de la vuelta 2 quedaron cumplidas y el cambio no
  introdujo nada más. La corrección 1: el orden de los bloques de noticia es
  ahora Junaeb (portada, línea 16), Rabat (línea 27) y Banco Central (línea
  38), que es el orden en que el informe trae sus cuatro [A] (líneas 14, 38,
  80 y 160), como pide el punto 4 de QUÉ SE NARRA. La corrección 2: la línea
  64 agrega "- Radio Universidad de Chile, 04-11-2026.", literal como la trae
  el informe en su línea 234. El diff contra la versión anterior muestra solo
  el bloque del Banco Central movido entero y sin cambiarle una palabra, esa
  línea de fuente y el salto de línea final que faltaba: ninguna otra parte
  de la pieza se tocó.
- Verificado que el intercambio de bloques no rompió nada de lo que dependía
  del orden: la Apertura (línea 14) adelanta a Rabat y después al Banco
  Central, el Cierre (línea 48) los nombra en esa misma secuencia, las
  tarjetas quedan cifra, comparacion, esquema y cifra (sin dos [DATO cifra]
  seguidas y con tres tipos distintos en la edición), y cada [TESIS] conserva
  su línea en blanco antes del párrafo narrado.
- "El contrato de la empresa SOSER, en la Región de O'Higgins, muestra la
  distancia más concreta" (línea 23) sigue usando un comparativo que el
  informe no trae. No bloquea, porque no afirma nada sobre una serie
  histórica, pero la regla del 10-09-2026 pide que los comparativos salgan
  del informe: la comparación se sostiene sola con sus dos cifras.
- `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos".
  `node scripts/validar-tarjetas.js` cuenta 477 palabras narradas (rango 420
  a 600) y cuatro bloques con fuente, y avisa por la cifra exacta "9.134" de
  la línea 5, que es la Carátula 3: las carátulas no se narran, así que la
  regla de redondeo en voz no la alcanza y el aviso no pide cambio.
- Queda anotado para la definición del prompt, no para esta pieza: la
  observación del veredicto del informe sobre "nombre buscable 2" en el
  puntaje de la portada sigue abierta por segundo día.
