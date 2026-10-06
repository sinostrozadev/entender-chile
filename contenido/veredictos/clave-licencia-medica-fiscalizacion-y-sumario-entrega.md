VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: entrega
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/claves.md
VALIDADO: 2026-10-06T02:54:35Z

Correcciones:
1. Dónde: la sección "Condena y recuperación no son el mismo dato", línea 78:
   "En el caso de fraude a FONASA, el tribunal dictó sentencia el 31-08-2026.
   La Fiscalía informó un perjuicio de $31.571.798.643 y se acogió una demanda
   civil por cerca de $26.000 millones." · Regla: prompts/claves.md, camino
   `pauta`: "La PAUTA manda sobre el qué: fue escrita por Claude y APROBADA por
   Santiago, así que su temario no se discute. NO cambies el tema, NO agregues
   secciones que ella no pide y NO dejes fuera nada de lo que ella pide",
   con "la 2 y la 3 son el origen y la cronología", y PROFUNDIDAD: "(b) los
   hitos por los que ha pasado, en orden y fechados". La sección 3 de la pauta
   trae dos hitos confirmados que la entrega no narra en ninguna parte: "2020 a
   2022: una red con 16 sociedades de fachada emite más de 60.000 licencias
   falsas; FONASA paga más de 50.000 (confirmado)" y "23-06-2026: el 7° Tribunal
   de Juicio Oral de Santiago declara culpables a los 17 acusados del megafraude
   a FONASA (confirmado)". Buscados en la pieza completa: no aparecen "2020",
   "60.000", "50.000", "sociedades", "falsas" ni el 23-06-2026, y la línea 78 da
   por sabidas unas condenas que el texto nunca narra. · Debe quedar: antes de
   la sentencia del 31-08-2026, la entrega cuenta qué probó el caso, que es lo
   único por lo que la pauta lo deja entrar: que entre 2020 y 2022 una red con
   16 sociedades médicas de fachada emitió más de 60.000 licencias falsas, de
   las cuales FONASA pagó más de 50.000 (cifras de la estructura principal según
   el comunicado del Poder Judicial del 23-06-2026, en el dossier
   contenido/casos/fonasa-licencias-falsas.md que nombra la línea DOSSIER de
   tema.md), y que el 23-06-2026 el tribunal declaró culpables a los 17
   acusados. Sin nombres y sin penas, que la sección 6 de la pauta excluye.

2. Dónde: la sección "Por qué una baja de 63% no cerró el caso", líneas 68 a 70,
   que cierra la cronología en el CIC N.º 26 del 02-10-2026 y en lo que no se
   pudo verificar de ese documento. · Regla: prompts/claves.md, camino `pauta`:
   "NO dejes fuera nada de lo que ella pide", y QUÉ TIENE QUE CONTENER LA
   ENTREGA: "(3) los datos importantes en orden hasta lo que se sabe hoy,
   fechados". El último hito de la sección 3 de la pauta es "03-10-2026: el
   Gobierno anuncia sanciones tras el desglose regional (confirmado)", y en la
   entrega no aparece nada del Gobierno ni de esas sanciones (buscados
   "Gobierno", "anunci" y "03-10-2026" en el archivo completo: cero
   coincidencias). · Debe quedar: una línea fechada con la reacción oficial,
   sostenida por el informe que GPT ya tiene que leer, contenido/informes/
   2026-10-03.md línea 95: el subsecretario del Interior, Máximo Pavez, afirmó
   que los funcionarios recibirán la sanción que corresponda, y el Gobierno
   comprometió apurar los sumarios y examinar también lo ocurrido antes de 2022
   (BioBioChile y La Tercera, 02-10-2026). Si GPT decide no narrarla, el mismo
   prompt le exige la salida alternativa: "escribe lo que sí se sostiene y dilo
   en una línea", es decir dejar dicho en una línea por qué queda fuera.

3. Dónde: la sección "Quién paga y desde qué día", líneas 24 a 26, que nombra a
   los pagadores (CCAF, COMPIN a través de la Subsecretaría de Salud Pública,
   Isapre, mutualidad, Instituto de Seguridad Laboral o empresa con
   administración delegada) y los días desde los que se paga, sin decir en
   ningún momento con qué plata se financia el subsidio. · Regla:
   prompts/claves.md, camino `pauta`: "las preguntas de su sección 4 tienen que
   quedar RESPONDIDAS en la entrega, todas, y la que no se pueda responder queda
   dicha en una línea con el motivo". La pregunta 2 de la pauta es "¿Quién me
   paga los días que no trabajo, y de dónde sale esa plata?": la entrega
   responde la primera mitad y deja la segunda sin respuesta y sin motivo. ·
   Debe quedar: una frase en esa misma sección con el origen de los fondos, que
   la investigación ya trae en su línea 18: los subsidios por incapacidad
   laboral y sus cotizaciones se financian con cargo al régimen de salud
   (SUSESO, régimen SIL y Compendio, consulta 05-10-2026). No hace falta nada
   más: con eso la pregunta 2 queda respondida completa.

4. Dónde: la lista "Fuentes:", líneas 116 a 134, con dieciocho líneas. · Regla:
   prompts/claves.md, HECHOS, INTERPRETACIÓN Y FUENTES: "Al final de la entrega,
   bajo 'Fuentes:', lista una línea por fuente utilizada." Cuatro fuentes citadas
   en el cuerpo no están en la lista: "SUSESO, Circular 3906" (línea 18),
   "SUSESO, pago del subsidio y cotizaciones, consulta 05-10-2026" (línea 26),
   "dictamen O-01-DFS-02925-2026" (línea 32) y "Cámara de Diputadas y Diputados,
   oficio sobre CIC N.º 9, 2025" (línea 40). · Debe quedar: una línea por cada
   una en "Fuentes:", con los enlaces que ya trae la investigación (líneas 14,
   22, 28 y 85 de investigacion.md): Circular 3906 en
   https://www.suseso.gob.cl/612/w3-article-785452.html, pago del subsidio en
   https://www.suseso.gob.cl/622/w3-propertyvalue-768471.html y pago de
   cotizaciones en https://www.suseso.gob.cl/612/w3-article-766938.html,
   dictamen O-01-DFS-02925-2026 en
   https://www.suseso.gob.cl/612/w3-article-785448.html, y el oficio sobre el
   CIC N.º 9 en
   https://www.camara.cl/verdoc.aspx?DESTINOID=247531&prmID=290663&prmTIPO=OFICIO
   . La otra salida válida es quitar del cuerpo la cita que no se vaya a listar.

Observaciones:
- Para la pieza siguiente: la carátula 3 de la pauta pide "25.352 abiertos /
  1.543 cerrados" y la entrega trae las dos cifras (línea 72) con la fuente
  "(Dipres, 2026, consultado 05-10-2026)", pero sin la fecha del balance. El
  informe del 03-10-2026 la tiene en su línea 97: el séptimo balance consolidado
  de Dipres es del 05-02-2026. Conviene que el guion fije ese dato con su fecha,
  porque es un número que cambia con cada balance.
- Para la pieza siguiente: la apertura de la entrega entra solo por el CIC N.º 26
  del 02-10-2026. La sección 1 de la pauta describe tres entradas de la semana
  (29-09-2026 VigIA, 01-10-2026 el sondeo y 02-10-2026 la Contraloría) y el
  sondeo quedó declarado no ubicado en la investigación, así que el guion tiene
  dos puertas de entrada y no tres: VigIA y el consolidado.
- La entrega cumplió lo que pedían las tres observaciones del veredicto de la
  investigación: atribuye las cifras del CIC N.º 26 a prensa y no al documento
  (líneas 68 y 70), no usa el pasaje de la línea 72 del dossier para explicar la
  pregunta 7 (línea 80) y declara el sondeo del 01-10-2026 como no ubicado
  (línea 90).
- Verificado y sin hallazgos: las siete preguntas de la sección 4 de la pauta
  están respondidas (salvo la mitad de la 2, en la corrección 3); nada de la
  sección 6 ("Qué NO va") aparece en la pieza, ni los nombres o penas del
  megafraude, ni especulación sobre si VigIA servirá, ni el dinero dado por
  recuperado, ni las dos noticias de inteligencia artificial del 28-09-2026 y
  del 30-09-2026; los seis vacíos de "Lo que NO se pudo averiguar" quedan
  declarados en la sección "Lo que no se pudo confirmar al corte"; la evaluación
  va marcada como análisis y sin tomar partido, como pide la sección 5 de la
  pauta; el título es único, aparece una vez y lleva slug; la línea del índice
  quedó agregada (contenido/claves/indice.md, línea 25); y no hay rayas, ni
  emojis, ni URLs en el cuerpo.
