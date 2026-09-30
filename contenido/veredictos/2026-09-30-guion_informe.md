VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-30T05:39:12Z

Correcciones:
1. Dónde: línea 4, "Carátula 2: Frontera cerrada / El temporal avanza" · Regla:
   "Las tres son enfoques distintos: la primera, una PREGUNTA; la segunda, una
   CONTRADICCIÓN o un giro" · Debe quedar: una carátula 2 cuyo par de lados
   traiga una contradicción o un giro, no dos hechos alineados (el paso está
   cerrado y el temporal sigue avanzando apuntan en la misma dirección).
   Verificada contra el informe y contra el tope de cuatro palabras por lado:
   "Carátula 2: Los Libertadores cerrado / Reapertura sin fecha" (tres y tres
   palabras) sirve, porque el cierre preventivo está en la línea 16 del informe
   y la reapertura queda sin fecha en la línea 18, condicionada a la evaluación
   de la ruta y a la comunicación oficial.
2. Dónde: línea 5, "Carátula 3: Río atmosférico / ¿Dónde pega más?" · Regla:
   "la tercera, una CIFRA CON REFERENCIA (solo si la cifra se entiende en un
   segundo sin contexto) o un segundo giro si no hay cifra" · Debe quedar: una
   carátula 3 que no repita el enfoque de pregunta que ya tiene la carátula 1
   ("¿Cuánto falta por llover?"). El informe no trae ninguna cifra de este
   sistema frontal (ni milímetros, ni viento, ni número de regiones, revisadas
   las líneas 5, 16 y 18), así que corresponde el segundo giro y NO se puede
   inventar una cifra para la carátula. Verificada igual: "Carátula 3:
   Pasajeros y carga / sin paso a Argentina" (tres y cuatro palabras) se
   sostiene en la línea 16 del informe, "efecto inmediato sobre viajes y
   transporte de carga entre Chile y Argentina".
3. Dónde: línea 39, "[DATO comparacion | La Tercera, 29 sep] pagos informados:
   $110.000.000 ; promedio mensual: $2.290.000" · Regla: "ETIQUETA CON CONTEXTO
   (obligatorio): la etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8
   palabras, de modo que la tarjeta se entienda con el video en silencio" ·
   Debe quedar: las dos etiquetas de esa marca tienen dos palabras cada una,
   bajo el piso de tres, y con el video en silencio no dicen pagos a quién ni
   promedio de qué. Con el informe a la vista sirven "pagos a la exfuncionaria
   de Maipú" (seis palabras, línea 76 del informe) y "promedio mensual estimado
   en 48 meses" (seis palabras, línea 78 del informe, que habla de $2,29
   millones mensuales aproximados distribuidos en 48 meses). Si conservas la
   marca de la línea 83 después de la corrección 4, su etiqueta "droga
   incautada" también está bajo el piso: "droga incautada en Antofagasta"
   (cuatro palabras) lo cumple.
4. Dónde: líneas 48, 61, 70 y 83, las cuatro marcas "[DATO cifra ...]"
   consecutivas, sin ninguna otra marca de tarjeta entre ellas · Regla:
   "nunca más de dos [DATO cifra] seguidas en el guion" (VARIEDAD), y el
   control interno 17, "no hay más de dos [DATO cifra] seguidas" · Debe quedar:
   como máximo dos [DATO cifra] seguidas. El árbol de tipos está bien aplicado
   en las cuatro (cada una lleva un solo valor y no hay dos valores de la misma
   unidad que permitan comparacion ni cambio), así que corresponde el remedio
   que da el propio prompt: "deja la cifra sobrante en la narración". Quitar
   dos de las cuatro marcas basta, y las dos que menos pierden son la de la
   línea 70 ("duración del paro: 48 horas", que ya se narra completa en la
   línea 71) y la de la línea 83 ("droga incautada: 700 kg", cuya magnitud ya
   va hablada en la [TESIS] de la línea 81 como "casi setecientos kilos" y cuyo
   avalúo se narra en la línea 84). No agregues ninguna tarjeta nueva para
   separarlas: el informe no tiene material para barras, tabla, lineas ni
   marcador sin inventar valores.
5. Dónde: línea 92, "## ¿En qué quedó?", que pasa directo al párrafo narrado sin
   marca de fuente · Regla: "[FUENTE medio, fecha] En la línea siguiente a cada
   '## sección': la fuente principal del bloque ... Cada bloque de noticia la
   lleva, incluida 'La noticia del día'; Apertura, Dato curioso, Agenda, En
   titulares y Cierre no" · Debe quedar: la lista de bloques exentos no incluye
   "¿En qué quedó?", y ese bloque sí se narra, como noticias breves, así que
   necesita su [FUENTE] en la línea siguiente al encabezado. Con el informe a la
   vista (línea 273): "[FUENTE Corte de Apelaciones, 29 sep]", cinco palabras,
   dentro del máximo de seis.
6. Dónde: la lista "Fuentes:", líneas 154 a 171, donde no aparece "Portal Red
   Salud" · Regla: "lista una línea por cada fuente de las marcas [DATO] y
   [CITA] Y por cada fuente del informe cuyas noticias narraste, tal como
   aparecen en el informe ... una fuente cuyo contenido se narró no puede quedar
   sin crédito" · Debe quedar: el bloque "## Dato curioso" de la línea 143 narra
   el robot MARS y su asistencia magnética, y en el informe ese contenido viene
   de "(Portal Red Salud, 29 sep)" (línea 277). Agrega una línea "Portal Red
   Salud, 29 sep 2026." a la lista. Comprobadas una por una las demás fuentes de
   los once bloques narrados, del "¿En qué quedó?", de la Agenda y del "Para
   salir hoy": todas están, y esta es la única que falta.

Observaciones:
- Para la pieza siguiente: el informe del 30-09-2026 deja la edición otra vez
  con dos tipos de tarjeta, y con la corrección 4 queda en comparacion y cifra.
  No es incumplimiento, por lo mismo que se anotó el 28 y el 29-09-2026: el
  prompt pone el árbol de tipos sobre la cuota y "la cuota es una alarma, no una
  obligación". La causa está en la entrada: de las diez noticias narradas, solo
  una trae dos valores de la misma unidad (los $110 millones y su promedio
  mensual). Si el informe trajera, para alguna noticia narrada, un antes y un
  después del mismo indicador o dos cifras comparables en la misma unidad, la
  edición tendría su tercer tipo sin forzar nada. Las listas de espera no GES y
  el dólar son los dos candidatos naturales y hoy llegaron sin ninguna cifra.
- "Clima de carátula: grave" (línea 6) conviven con el bloque de portada
  declarado "[clima]" (línea 17), y el prompt llama a esos dos tonos opuestos:
  "clima se pinta tranquilo y emergencia se pinta grave". No lo levanto como
  incumplimiento porque el prompt entrega la palabra al criterio de quien
  escribe ("la que corresponda al tono") y el informe menciona alertas por
  lluvia, que es lo que podría sostener "grave". Vale la pena mirarlo igual: los
  cuatro días anteriores con "grave" (25, 26 y 27-09-2026) tenían alerta roja,
  evacuados o aislados, y hoy la portada es un cierre preventivo sin víctimas ni
  daños. Si las alertas justifican "grave", el bloque probablemente es
  "emergencia"; si es pronóstico y condición, la carátula probablemente no es
  "grave".
- "Confusam" (línea 67) y "CIPER" (línea 74) se pintan en el pie de las tarjetas
  de sus bloques sin expandirse en ninguna parte del guion. La regla de siglas
  nombra justamente la marca [FUENTE], y ninguna de las dos está entre las de
  uso corriente que el prompt salva (IPC, PIB, ONU, INE, Carabineros, PDI). No
  lo levanto como incumplimiento porque "CIPER" pasó igual en el guion del
  29-09-2026 sin que se marcara, y cambiar el estándar dentro de un veredicto de
  corrección sería sumar una regla nueva. Para la próxima edición, "Confederación
  de Funcionarios de Salud Municipal (Confusam)" en la narración deja el pie
  acreditado.
- La marca de la línea 83 lleva "700 kg" mientras el informe dice "casi 700
  kilos" (líneas 86 y 88) y la [TESIS] narra bien el "casi". Si la marca sobrevive a la
  corrección 4, la etiqueta es el lugar para conservar ese matiz.
- El guion queda en 1.262 palabras habladas, unos 8,4 minutos a 150 palabras por
  minuto y 9,7 a 130, algo por debajo del objetivo "en torno a 10 minutos". No es
  hallazgo: el tope de diez noticias narradas está usado completo, los 44
  titulares hacen sonar todo lo demás y el prompt prohíbe rellenar para alargar.
- Verificado y sin hallazgos: las tres noticias [A] están narradas y ninguna se
  omitió; las 54 noticias del informe suenan (10 narradas en 10 bloques, tres [A]
  y siete [B], y 44 en titulares, las 43 [B] fuera del corte más la [C]), sin
  ninguna repetida ni agregada; los 44 titulares van uno por línea, con doce
  palabras o menos, una cifra como máximo, la entrada fija "Y en titulares:"
  sola en su línea, y el matiz de anuncio o trámite conservado (el reingreso
  "acordó impedir", Trump "evalúa restringir", la compensación "avanzó al
  Senado", los conejos "podrían participar"); las once [TESIS] tienen 18 palabras
  o menos y todas llevan su línea en blanco después; "La noticia del día" abre el
  guion antes de la Apertura, en dos frases y treinta palabras, con una sola
  marca de tarjeta y su [FUENTE]; la Apertura tiene 35 palabras, sitúa la fecha y
  adelanta otros tres asuntos de "En una mirada" sin repetir la portada; el orden
  del cierre es el que pide el prompt (titulares, dato curioso, agenda, cierre);
  las diez categorías de bloque son de las doce permitidas y "[clima]" está bien
  elegido frente a "emergencia" si se lee la portada como pronóstico; no hay
  rayas largas ni medias en las 171 líneas, ni paréntesis, ni URL, ni conectores
  de ensayo escrito, ni "no solo X sino Y", ni frases que narren ausencia de
  noticia, ni superlativos ajenos al informe (el del dólar sí está, línea 106 del
  informe); las cifras habladas van en palabras y respetan el tope de tres cifras
  significativas; ninguna marca interna del sistema ("EN SEGUIMIENTO", "NOTICIA
  DE PORTADA") ni ninguna ruta del repositorio se filtró; el informe no trae
  sección de Análisis, así que no corresponde ninguna [INTERPRETACIÓN]; hay un
  [ESQUEMA] para la noticia de proceso del día; la Agenda trae tres hitos y
  ninguno protocolar; y el cierre integra "Para salir hoy" en la despedida y
  termina con el tagline exacto "El resumen sin gritos.".
