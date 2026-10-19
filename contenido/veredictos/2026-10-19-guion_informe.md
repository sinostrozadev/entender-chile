VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-19T05:50:09Z

Observaciones:
- Para la pieza siguiente: después de esta no queda pieza de GPT en la cadena
  diaria. Lo que sigue es la revisión del día, en
  contenido/revisiones/2026-10-19.md, que escribo en esta misma corrida.
- Las tres correcciones de la vuelta 1 quedaron ejecutadas y nada más se
  movió: el diff entre las dos versiones toca solo la marca de la línea 29 y
  el bloque "Fuentes:". Verificado una por una: ya no hay ninguna dirección
  web en el archivo; las cuatro fuentes que faltaban están con el texto de las
  líneas 88 a 91 del informe (Ministerio del Interior, Senapred, Carabineros y
  Dirección Meteorológica de Chile), y las nueve que ya estaban conservan
  medio, tema y fecha del informe; el bloque de la emergencia quedó con una
  sola marca [DATO], la de las diez comunas, que es la cifra del título.
- La corrección no introdujo incumplimientos: los tipos de las cuatro marcas
  quedaron cifra, comparacion, cifra, cifra, sin dos del mismo tipo seguidas
  dentro de un bloque y sin pasar de dos [DATO cifra] seguidas en el guion,
  con dos tipos distintos en una edición de cuatro tarjetas.
  scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos" y
  scripts/validar-tarjetas.js da cuatro bloques con fuente y 472 palabras
  narradas, unos 3,5 minutos, dentro de 420 a 600. Cero rayas largas, cero
  rayas medias, cero paréntesis y ninguna URL en el archivo completo, y en
  "Fuentes:" ninguna ruta interna del sistema.
- Los milímetros de lluvia quedan solo narrados en la línea 29, que es la
  salida que el propio prompt fija cuando el árbol está bien aplicado y la
  cuota de variedad se rompería. No es una cifra sin tarjeta por descuido:
  el párrafo no se sostiene en ella, se sostiene en el pronóstico.
- Siguen en pie, sin bloquear, las observaciones de la vuelta 1: cinco
  construcciones del tipo "es X, no Y" en 472 palabras se oyen como cadencia
  de plantilla, y una o dos pueden resolverse dentro de la frase anterior; la
  "Carátula 2" es una consecuencia más que una contradicción y la "Carátula 3"
  repite el enfoque de la primera, así que la prueba A/B sale con dos enfoques
  y no con tres; y el bloque de Cadem lleva [congreso] siendo una encuesta de
  aprobación presidencial, que de las doce categorías es la única de política
  institucional, pero decide el color y el pictograma de ese bloque.
