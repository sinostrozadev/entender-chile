VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-08T06:00:12Z

Observaciones:
- Las ocho correcciones de la vuelta 1 están resueltas, verificadas una por una
  en esta corrida contra la pieza nueva y contra el informe, no contra la
  versión anterior:
  1. El cierre (línea 58) quedó en 58 palabras narradas, contadas, dentro del
     tope de 40 a 60. Salió "y protégete del sol" y la línea "Para salir hoy"
     del informe (su línea 161) sigue integrada en una sola frase.
  2. El cuerpo de "La noticia del día" (línea 14) quedó en dos frases y 25
     palabras, contadas, con el "oficial" que el informe sostiene en su línea 15.
  3. El bloque de la Ruta de la Fruta narra tres cifras habladas (doce, once y
     quince, línea 26). El kilómetro y la Ruta sesenta y seis salieron de la voz
     y el lugar se dice "la Ruta de la Fruta, en Santo Domingo", igual que el
     informe.
  4. El bloque laboral narra tres cifras habladas (treinta horas, setenta y uno
     coma cuatro por ciento y cuarenta y dos horas, línea 40). Salieron cuarenta
     horas, dieciséis semanas, ciento veinte mensuales, doce horas, dieciséis
     regiones y noventa días.
  5. El bloque de Machalí narra tres cifras habladas (cinco regiones, treinta y
     siete grados y seis coma veinticinco hectáreas, líneas 50 y 52). El
     despliegue se narra sin números, con lo que el informe sostiene en su
     línea 61.
  6. En el bloque de Machalí quedó una sola [DATO cifra] (línea 48).
     scripts/validar-tarjetas.js ya no avisa dos tarjetas del mismo tipo
     seguidas y cierra con "variedad OK".
  7. La [DATO comparacion] quedó en la línea 38, justo antes del párrafo de la
     línea 40, que es el que narra treinta horas y cuarenta y dos horas.
  8. La línea 42 dice "El programa Empleo trescientos sesenta".
- Lo que la corrección introdujo, verificado contra el informe y sin hallazgos:
  "en todo el país mediante ciclos regionales" se sostiene en las líneas 6 y 45
  del informe ("en las 16 regiones", "El primer ciclo regional"); "recursos
  existentes" viene de "programas y recursos ya existentes" de la misma línea
  45; "Eso equivale al setenta y uno coma cuatro por ciento" conserva el ejemplo
  a escala humana de la línea 43 del informe; y el bloque de la Ruta quedó con
  dos párrafos narrados, dentro de los dos a cuatro que pide el prompt.
- La frase de la discrepancia de menores desapareció entera al recortar sus dos
  cifras. No es incumplimiento: el prompt no obliga a narrarla y el formato
  corto del 12-10-2026 deja el resto en la web. De paso cierra la observación
  del veredicto del informe sobre esa cifra en disputa.
- El alcalde va sin nombre ("El alcalde de Santo Domingo", línea 28), que es lo
  que pedía la observación del veredicto del informe: "Fernando Rodríguez" no
  aparece en la preselección ni en el barrido de hoy.
- Cómo conté el tope de tres cifras habladas por bloque: sobre los párrafos
  narrados, igual que en la vuelta 1. El "Diez" de la [TESIS] de la línea 32 no
  entra en esa cuenta, y por convergencia no se suma ahora un hallazgo sobre una
  línea que la vuelta 1 no marcó. Conviene que prompts/guion-informe.md diga
  explícitamente si la [TESIS], que sí se narra, cuenta para ese tope: hoy el
  criterio lo fija el validador y eso puede cambiar entre días.
- "Conaf" se pinta en pantalla sin expandir, en el [FUENTE] de la línea 45.
  Sigue sin contar como incumplimiento, por ser sigla de uso corriente en Chile,
  y sigue anotado por el antecedente de "DMC" el 21, 22 y 23-09-2026.
- Verificado y sin hallazgos en esta corrida: 510 palabras narradas, dentro de
  420 a 600 (scripts/validar-tarjetas.js); scripts/revisar-mecanico.js sin
  hallazgos mecánicos; cero rayas largas y cero rayas medias por búsqueda
  literal; exactamente tres bloques de noticia, la portada primero y las tres
  [A] del informe, sin "## En titulares", sin Dato curioso, sin Agenda y sin
  "¿En qué quedó?"; las cuatro [TESIS] con 16, 16, 16 y 14 palabras, cada una
  seguida de línea en blanco; las cuatro marcas [DATO] con etiqueta de contexto
  y cada valor con su rótulo y su unidad; el [ESQUEMA] del bloque de proceso; la
  apertura en 34 palabras; las tres carátulas con cuatro palabras o menos por
  línea y con el objeto de la noticia; "urgente" como clima; y la lista de
  Fuentes sin ninguna ruta interna del sistema.
- El contrato se cumple: ruta exacta, orden de "Título sugerido", "Descripción
  sugerida", las tres carátulas, "Clima de carátula", "Guion:" y "Fuentes:", y
  el commit c081316 toca solo su propio archivo, con el mensaje "edición
  2026-11-08: guion informe" y la línea "Tarea: despachador".
