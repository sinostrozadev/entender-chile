VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-11T05:01:04Z

Observaciones:
- Para la pieza siguiente: el plazo de Contraloría a la Subsecretaría de
  Justicia por las rebajas de condena vence el 11-11-2026 (línea 95 de la
  pieza) y la respuesta es el próximo hecho verificable del caso; no está en
  el barrido porque las seis fuentes institucionales sin feed no se pudieron
  abrir (línea 250), así que ese dato y la encuesta de expectativas del Banco
  Central con el PIB 2026 en 0% hay que buscarlos en la fuente primaria.
- Para la pieza siguiente: las dos cifras de comercio exterior son distintas
  y la pieza lo advierte bien (línea 48): los US$ 185.665 millones son el
  intercambio total de enero a octubre y los US$ 100.000 millones son solo
  exportaciones de bienes, que la edición del 10-11-2026 ya contó. No
  sumarlas ni intercambiarlas.
- Para la pieza siguiente: la lista de duplicados del barrido (línea 256)
  evita contar dos veces las apuestas online, los seis carabineros de San
  Bernardo, el PIB en 0%, el récord de exportaciones y el nombramiento de
  Steinert.
- Para la pieza siguiente: la acusación constitucional contra Rabat NO está
  presentada; el barrido trae el repudio, el libelo en redacción y los
  juristas del PS que se distancian, nada de su ingreso a la Cámara (línea
  227 de la pieza, verificado contra el barrido del 11-11-2026).
- Para la pieza siguiente: la fecha de la movilización de la CUT y la Confech
  salió del titular en la vuelta 1 porque el barrido del 11-11-2026 (línea
  342) no la trae, y la línea 21 de la pieza dice que la fecha está anunciada
  y es verificable. Si el informe la va a narrar, tiene que confirmarla en la
  nota; si no la confirma, no la nombra.
- Para la pieza siguiente: el desmentido del supuesto apagón mundial (línea
  175) escribe la fecha como "17 de noviembre", y la regla de estilo del
  prompt pide DD-MM-AAAA. No es corrección porque no lo marqué en la vuelta 1
  y la regla de convergencia prohíbe sumar un hallazgo nuevo sobre una parte
  no marcada, pero el informe debe escribirla 17-11-2026 si retoma la
  candidata.
- Las seis correcciones de la vuelta 1 quedaron resueltas, verificadas una
  por una contra el diff de 6b43159 a fdb57bc: la frase del paro quedó "si
  el paro termina o escala" (línea 12), el titular de la CUT y la Confech
  termina en "contra el Gobierno" (línea 20), el Presupuesto 2027 quedó "que
  se está votando en el Congreso" (línea 42), el plazo de la Subsecretaría de
  Justicia quedó "hasta el 11-11-2026" (línea 95), el sismo quedó "la mañana
  del 11-11-2026" (línea 182, que calza con "esta mañana" de la línea 129 del
  barrido del 11-11-2026) y el bloque de Lelio quedó en una sola frase (línea
  219). Ninguna corrección introdujo un incumplimiento nuevo: el diff toca
  solo esas seis líneas y no cambia la estructura.
- La pieza corregida mantiene 60 candidatas con enlace, el tope exacto del
  rango aceptable (35 a 60), las doce áreas de cobertura obligatoria con al
  menos una candidata cada una, las tres secciones finales obligatorias y
  once candidatas fuera de la Región Metropolitana, más del doble de la cuota
  blanda de 5. `node scripts/revisar-mecanico.js` imprimió "sin hallazgos
  mecánicos".
- No bloquea, pero conviene mirarlo en la próxima edición: el titular de la
  línea 218 dice "a una semana de terminar el rodaje", que se resuelve solo
  sabiendo qué día es hoy. Queda como observación y no como corrección porque
  la referencia está anclada al calendario del rodaje y no a la fecha de la
  edición, y porque viene así del titular de La Tercera en el barrido (línea
  297). Lo mismo con "este año" en la línea 159.
- No bloquea: la nueva alza de combustibles (línea 17) está en Política y es
  materia de Economía y bolsillo, donde ya viven el dólar y el PIB. La
  preselección no jerarquiza, así que no cambia nada para el informe, pero el
  área ayuda a quien elige.
