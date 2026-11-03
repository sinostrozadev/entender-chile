VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-03T05:05:32Z

Observaciones:
- Para la pieza siguiente: las seis fuentes institucionales sin feed de
  contenido/barrido/fuentes.json (Contraloría General de la República, Banco
  Central de Chile, Cámara de Diputados, Senado, Dirección Meteorológica de
  Chile y Ministerio Público) quedaron sin abrir, declarado en la línea 172 de
  la pieza, que deja un pedido concreto por cada una. Se listó la sección
  completa del json para comprobar que son esas seis. El informe no puede
  darlas por vistas: si necesita algo de ellas, tiene que leerlas él. Es la
  misma observación del veredicto del 02-11-2026, y es estructural, no un
  descuido: reparto.txt le pasó la preselección a Claude justamente porque es
  el único turno que se hace solo con el barrido ya en el repo.
- Para la pieza siguiente: el cierre pendiente entró bien y es el único que
  correspondía, pero viene arrastrado dos días y hay que cerrarlo o declararlo.
  El informe del 02-11-2026 trae una sola línea PENDIENTE DE CIERRE, la de la
  primera votación del boletín 18817-07 con fecha 2026-11-02 (línea 70 de ese
  informe, buscada con la marca literal), y el informe del 01-11-2026 trae la
  misma promesa en su línea 61 con la misma fecha. Entró marcada "(cierre
  pendiente del 02-11)" en la línea 49 de la pieza. Dos avisos: el barrido de
  hoy no trae ninguna noticia de pensiones ni de AFP, verificado por búsqueda
  de las marcas pension, AFP y previsional, así que el dato sale de la Cámara
  o no sale; y la URL que la pieza usa no viene del barrido, se armó con el
  identificador que el informe del 02-11-2026 cita en su línea 66, así que el
  informe tiene que confirmar la URL y el número de boletín antes de citarlos.
  Si no consigue el resultado, tiene que decir expresamente que sigue sin
  votarse, no dejarlo caer en silencio.
- Para la pieza siguiente: cuatro datos llegan en desacuerdo en el barrido y
  el informe tiene que fijarlos antes de narrarlos. Los verifiqué uno por uno
  en el barrido, no los tomé de la pieza. Sismo del norte: ninguno de los
  cuatro titulares (líneas 42, 225, 279 y 348) trae la magnitud, y la fecha
  está en disputa, porque la línea 43 lo marca "(desde el 27-10-2026)" y la
  348 lo fecha el 02-11-2026. Deuda pública: las dos dan 44,7% del PIB, pero
  la línea 54 lo dice como límite prudencial de la regla fiscal y la 57 lo
  fija en 45%. Metanfetamina: la línea 327 trae los 35 años que pide la
  Fiscalía y las 297, 321 y 330 solo el inicio del juicio. Collipulli: la
  línea 306 dice un camión sin carga y la 318 un camión y un carro forestal
  destruidos.
- Para la pieza siguiente: la URL de Interferencia sobre la acusación
  constitucional contra Rabat está reconstruida a mano y sin abrir. Verifiqué
  la línea 494 del barrido: llega como un ancla HTML escapada
  (interferencia.cl/%3Ca%20href%3D%22/articulos/la-peor-semana...%22%3E) que no
  resuelve, y la ruta que la pieza usa en su línea 7 es exactamente la que
  viene dentro de ese ancla. El informe tiene que confirmarla antes de citarla,
  y conviene que sea lo primero, porque Rabat es el hecho más fuerte del día.
  El 02-11-2026 fallaron dos URL del mismo medio por el mismo defecto, así que
  no es un caso aislado sino un problema del barrido con ese sitio, y eso es
  arreglo del script. La otra nota de Interferencia del día (línea 131) llega
  por Google News y resuelve sin tocarla.
- Para la pieza siguiente: dos candidatas pueden ser la misma causa y el
  informe tiene que fijarlo antes de narrarla. La línea 462 del barrido (La
  Nación) decreta prisión preventiva para los tres detenidos por el secuestro
  de Martín Pérez, y la 519 (La Tercera) describe prisión preventiva por un
  secuestro con homicidio de un joven más una compra de 700 mil pesos en
  droga. Verifiqué que el barrido las trae separadas y marcadas cada una como
  alarma de un solo medio, así que no las corroboró entre ellas. A la pieza
  entró la de La Nación, que nombra a la víctima.
- Para la pieza siguiente: el marcado "(sin confirmar)" está bien puesto en
  las dos candidatas cuyo dato está en duda (la crisis de matrícula escolar de
  Central Noticia, que el barrido trae en su línea 253 como alarma de un solo
  medio, y la posible intercepción del buque por la Armada argentina), pero la
  lista de la línea 178 de la pieza no enumera todas las candidatas de un solo
  medio. Quedaron fuera de esa lista, y conviene que el informe las verifique
  igual antes de usarlas: Diario Chañarcillo (el Centro-Museo Paleontológico
  de Atacama), Ciencia en Chile (Landata en la COP17), Ejército de Chile (el
  software de auditorías), El Mostrador (los nuevos controles de licencias
  médicas) y Canal 9 Bío Bío Televisión (las 17 medidas por la desocupación en
  el Bío Bío). Son medios identificables, así que cumplen el piso del prompt y
  no bloquean, pero ninguna está corroborada por un segundo medio distinto.
- Para la pieza siguiente: la encuesta de aprobación de Kast entró sin decir
  cuál es. El barrido la trae en su línea 75 y el titular no nombra la encuesta
  ni dice qué mide. La pieza ya lo advierte en su línea 14. El informe tiene
  que nombrarla y decir qué mide antes de usar la cifra, o dejarla fuera.
- Para la pieza siguiente: los nuevos controles de licencias médicas vienen
  marcados "(desde el 27-10-2026)" en la línea 544 del barrido, verificado, así
  que no son un hecho de hoy. El informe tiene que fijar desde cuándo rigen
  antes de contarlos como novedad.
- Para la pieza siguiente: "Enseña Chile abre el último llamado de postulación
  para su Programa 2027" entra rozando la exclusión del prompt, que deja fuera
  las notas de servicio sin novedad. La pieza lo declara así en su línea 107 y
  el prompt resuelve la duda a favor de que entre, así que no es hallazgo. Pero
  si el informe no encuentra novedad más allá del llamado a postular,
  corresponde dejarla caer.
- La clasificación por áreas del barrido sigue desordenada y lo verifiqué
  contra el barrido: once de las 27 noticias de "Ciencia y tecnología" son
  fútbol (nueve entre las líneas 363 y 390, y dos en 414 y 417), y "Sin área"
  se quedó con 38 de las 184, entre ellas las dos exclusivas de CIPER, varias
  de Ex-Ante y la de Interferencia sobre la acusación constitucional, que es
  de lo más fuerte del día. Es la misma observación del veredicto del
  02-11-2026 (entonces nueve de 12, y "Sin área" con 37 de 195) y del
  01-11-2026: el arreglo es del script y le toca a la sesión de día, no a la
  madrugada. La pieza reclasificó a mano y lo dejó anotado.
- Una cifra de la propia nota del barrido quedó mal, y la anoto porque esa nota
  es la evidencia con la que la sesión de día va a arreglar el script. La línea
  175 de la pieza dice que "Vivienda y ciudad" se llevó "las cinco notas del
  conflicto de la Federación de Tenis": en esa sección del barrido (líneas 538
  a 576) hay tres (555, 558 y 561), y las otras tres del conflicto (93, 117 y
  150) quedaron en "Política", que es donde corresponden. No toca ninguna
  candidata ni ningún dato que vaya al informe.
- El tamaño, el formato y la cuota de regiones los verifiqué contra la pieza y
  no contra lo que ella declara: 56 candidatas contadas en las doce áreas, que
  es lo mismo que dice su línea 181 y queda dentro del rango de 35 a 60; las
  56 cumplen el bloque de dos renglones, con titular, medio o medios y URL en
  el primero y "Por qué podría importar:" en el segundo; las doce áreas de
  cobertura obligatoria traen al menos una candidata, así que la sección
  "Áreas sin material hoy" dice "Ninguna" con razón; están las tres secciones
  finales; y hay candidatas de nueve regiones distintas fuera de la
  Metropolitana (Atacama, Antofagasta, Arica, Tarapacá, Coquimbo, Valparaíso,
  Bío Bío, Araucanía y Magallanes), muy por sobre el piso de cinco.
  revisar-mecanico.js no encontró hallazgos, y busqué aparte rayas largas y
  medias, emojis y referencias temporales relativas, sin coincidencias: las
  únicas apariciones de "hoy" son las de los dos títulos de sección que el
  propio prompt fija y usos que significan "en la edición de hoy".
- La cabecera del barrido está verificada y cuadra con lo que la pieza
  declara: 593 líneas, 184 noticias con señal de 773 únicas en 22 fuentes (875
  titulares brutos), 24 venidas de días previos, 9 descartadas como ruido,
  ninguna fuente caída, y los totales de las once secciones suman exactamente
  184. La última noticia del archivo es la de BioBioChile sobre el paro de
  camioneros en San Antonio, así que la lectura llegó al final.
