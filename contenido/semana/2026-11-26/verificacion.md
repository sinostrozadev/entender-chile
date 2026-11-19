# Verificación de la semana del 26-11-2026 al 02-12-2026

Consultas hechas el **19-11-2026** entre las 17:40 y las 19:10 de Chile.

## Método, y sus dos límites, dichos con honestidad

**1. No se abrió ninguna página a mano.** Esta sesión corre en un contenedor con
la red restringida: la apertura directa de páginas quedó bloqueada para todos
los dominios que se intentaron (`www.puertosanantonio.com`,
`www.observatoriologistico.cl`, `mindicador.cl`). Todo lo de abajo viene de
búsqueda web con lectura de la página por el buscador, que devuelve la cita
textual y la URL. Por eso cada fila dice "buscador" en la columna "consultado".
Para que la próxima semana se pueda abrir la fuente primaria hay que permitir
esos dominios en la configuración de red del entorno.

**2. Las cifras habladas van ancladas a la lista de fuentes del revisor
numérico.** `video/scripts/verificar-cifras.mts` solo acepta datasets `manual`
cuya URL sea de un organismo oficial o de uno de los medios que el repo ya
revisó (Emol, La Tercera, Cooperativa, Diario Financiero, BioBioChile, The
Clinic, Pauta, CIPER). En la primera pasada varias cifras quedaban colgadas de
medios fuera de esa lista, y **se volvió a buscar cada una hasta encontrarla en
una fuente que el revisor acepta**, en vez de ampliar la lista. Donde la cifra
existe pero solo en una fuente de fuera (el detalle de contenedores de cada
empresa portuaria), **no se dice en la voz**: queda acá y en la descripción del
video. Los ocho guiones pasan `validar.mts` y `verificar-cifras.mts` en verde.

## Segunda vuelta: lo que cambió la revisión independiente

Un subagente revisó las ocho piezas con la rúbrica de `prompts/plan-semanal.md`
§5 y encontró que **tres piezas decían en la voz cosas que esta tabla había
dejado fuera a propósito**. Eso se corrigió, no se discutió. Lo que se cambió:

- **Plazos sin fila.** Salieron "una central se construye en dos o tres años"
  (Short del 29-11) y "un muelle nuevo tarda una década" con su remate (Short
  del 01-12 y largo). En su lugar va la aritmética de lo que sí está
  verificado: aprobación ambiental en mayo de 2026 y primera etapa prevista
  para 2036, o sea diez años entre el permiso y el primer barco.
- **Detalle humano inventado.** El arranque del largo decía "nadie lo celebra:
  el telégrafo tarda... Nadie entiende todavía". Nadie documentó lo que se
  pensó en ese muelle. Se borró. La fecha bajó de "15 de agosto de 1914" a
  "agosto de 1914", porque el día exacto no está verificado acá.
- **Una afirmación que esta misma tabla prometía no hacer.** El giro del
  capítulo 1 del largo afirmaba que el canal causó la caída. Ahora dice que es
  la explicación clásica y anuncia que el capítulo siguiente la discute.
- **La inversión "hace un siglo".** El tráiler decía "hace un siglo era
  exactamente al revés", que es justo la serie que esta tabla declara no
  verificable. Ahora dice que hace un siglo el puerto que mandaba era
  Valparaíso, que es lo que sostiene Memoria Chilena.
- **TEU no es contenedor.** Un contenedor de 40 pies son dos TEU. La voz decía
  "2,06 millones de contenedores" donde la fuente dice TEU. Ahora dice TEU y lo
  explica una vez.
- **La unidad de los centros de datos.** La primera versión de esta tabla
  prometía no nombrar la unidad, y el guion decía "megavatios" en el título, el
  gancho y el rótulo. Se resolvió al revés y mejor: la pieza dice megavatios
  **atribuyéndolo a Emol**, que es la fuente anclada y la publica en MW, y la
  descripción avisa que La Tercera llama a las mismas cifras capacidad
  instalada. El título dejó de decir "pasarán" y ahora dice que el Coordinador
  lo proyecta.
- **Esqueleto repetido.** Los siete Shorts tenían las mismas tres escenas en el
  mismo orden (dato, planteamiento, giro), que es lo que mira la política de
  contenido inauténtico de YouTube (regla 37). Quedaron tres formas distintas:
  tres piezas abren con planteamiento, tres con dato y una tiene cuatro
  escenas. **Queda pendiente para la semana del 03-12**: tres piezas siguen
  compartiendo la forma planteamiento, dato, giro.
- **Ironía, primera persona y juicios sin fuente.** Salieron "la discusión ya
  navegó", "Te doy los datos y decides tú" (regla 18), "el Congreso no frena
  nada; se queda sin opinar" y "nadie dijo que no: dijeron después" (regla 7,
  interpretación presentada como hecho), "el nombre dura más que el motivo" y
  "no la eligieron por tener la mejor bahía, porque no la tiene". "O sea" bajó
  de seis apariciones a dos en toda la semana.
- **La miniatura contradecía al video.** Decía "VALPARAÍSO PERDIÓ EL MAR"
  mientras el propio largo dice que Valparaíso creció 11,5 % en carga en 2025
  (regla 15). Ahora dice "VALPARAÍSO PERDIÓ EL PRIMER LUGAR".
- **Fuente única sin revisar.** La ruta del Danstar y el proyecto de ley
  argentino colgaban solo de un medio de defensa fuera de la lista del repo. El
  proyecto se atribuye ahora a Infobae, que es la fuente que ya tiene la ficha
  del tema, y la ruta se dice sin afirmar por cuál paso va el buque.
- **Cifras declaradas que la voz no decía**, y al revés. Corregido en los
  Shorts del 26-11 y del 30-11.
- **Lo que la revisión acertó a medias**: dijo que faltaba el pedido de
  carátula del largo. Sí existe:
  `contenido/urgente/PEDIDO-ec-valparaiso-puerto-principal.md`, en el commit
  `4b66646`. Lo revisó antes de que estuviera escrito.

## 1. Presupuesto 2027 (Short del 26-11-2026)

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| El proyecto ingresó el 30-09-2026 y el plazo es de 60 días | Plazo constitucional: **29-11-2026**. Si se vence sin despacho, rige la propuesta del Presidente | https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-oposicion-cuestiono-solicitud-de-endeudamiento-por-25-mil/2026-10-06/080808.html | 06-10-2026 | 19-11-2026, buscador |
| La Cámara rechazó siete partidas | Interior, Educación, Secretaría General de Gobierno, Minería, Mujer y Equidad de Género, Culturas y Ciencia | https://www.df.cl/senal-df/la-minuta/despachan-al-senado-proyecto-de-presupuestos-con-siete-partidas-rechazadas | 11-2026 | 19-11-2026, buscador |
| Endeudamiento del artículo 3 | Hasta **US$ 25.000 millones** para 2027 (con un tramo adicional de US$ 600 millones según Cooperativa, que no se usa) | https://www.cooperativa.cl/noticias/economia/presupuesto/presupuesto-oposicion-cuestiono-solicitud-de-endeudamiento-por-25-mil/2026-10-06/080808.html | 06-10-2026 | 19-11-2026, buscador |
| **El Senado lo repuso** | El 18-11-2026 la Sala aprobó la indicación del Ejecutivo que restablece el artículo 3, por **31 votos a favor y 10 en contra**, con apoyo del PC, el PPD y la DC | https://www.latercera.com/nacional/noticia/con-votos-del-pc-ppd-y-dc-quiroz-logra-reponer-articulo-clave-del-presupuesto-2027-que-autoriza-endeudamiento-publico/ | 19-11-2026 | 19-11-2026, buscador |

**Corrección sobre el material de partida**: el barrido del 17 y 18-11-2026
dejaba la historia en "la Cámara rechazó el endeudamiento". Eso **ya no es el
estado del asunto**: el 18-11-2026 el Senado lo repuso. El guion se reescribió
por eso, y se escribe sobre el plazo y el mecanismo (la Cámara rechaza, el
Senado repone, lo que no se acuerde va a comisión mixta), que no caduca si el
Congreso despacha antes del 26-11.

**No entra al guion**: el monto total del Presupuesto 2027, el monto de cada
partida rechazada, y los US$ 25.600 millones (una fuente suma un tramo
adicional de US$ 600 millones y las otras no).

## 2. Buque Danstar, ruta Punta Arenas a Malvinas (Short del 27-11-2026)

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| Fecha de zarpe | **17-12-2026** desde Punta Arenas hacia Puerto Argentino, sujeta a los trabajos técnicos | https://www.df.cl/regiones/magallanes/empresas/naviera-easter-island-confirma-el-primer-zarpe-del-buque-danstar-hacia-las | 14-11-2026 | 19-11-2026, buscador |
| Primer viaje en 15 años | Primer viaje comercial de la ruta desde 2011 | https://www.lanacion.com.ar/politica/tension-por-malvinas-despues-de-quince-anos-un-buque-chileno-partira-de-punta-arenas-hacia-las-islas-nid14112026/ | 14-11-2026 | 19-11-2026, buscador |
| Capacidad de carga | **1.400 toneladas**, con la mitad ya vendida, según el gerente de la naviera | https://www.df.cl/regiones/magallanes/empresas/naviera-easter-island-confirma-el-primer-zarpe-del-buque-danstar-hacia-las | 14-11-2026 | 19-11-2026, buscador |
| Ruta elegida | Por el Estrecho de Magallanes y no por el Paso Drake, lo que implica navegar aguas argentinas | https://zonadefensa.com/mar/armada-y-fuerzas-navales/danstar-rumbo-a-malvinas-la-travesia-que-tensiona-el-atlantico-sur/ | 11-2026 | 19-11-2026, buscador |
| Posición de Chile | No pedirá autorización; invoca el derecho de paso inocente | https://www.lanacion.com.ar/politica/tension-por-malvinas-despues-de-quince-anos-un-buque-chileno-partira-de-punta-arenas-hacia-las-islas-nid14112026/ | 14-11-2026 | 19-11-2026, buscador |
| Reacción en Argentina | Se presentó un proyecto para interrumpir el recorrido, revisar la embarcación y llevarla a un puerto argentino | https://zonadefensa.com/mar/armada-y-fuerzas-navales/danstar-rumbo-a-malvinas-la-travesia-que-tensiona-el-atlantico-sur/ | 11-2026 | 19-11-2026, buscador |
| Proyecto en el Congreso argentino | Una diputada propuso **decomisar embarcaciones** que abastezcan las islas Malvinas | https://www.infobae.com/america/agencias/2026/11/16/buque-chileno-que-retomara-ruta-a-malvinas-llega-a-punta-arenas-en-medio-de-tension/ y `contenido/temas/ruta-punta-arenas-malvinas/ficha.md` (Infobae, 05-11-2026) | 05 y 16-11-2026 | 19-11-2026, buscador y ficha del repo |
| Estado del buque | Llegó a Punta Arenas el 16-11-2026 y queda en los astilleros de Asmar | https://www.biobiochile.cl/noticias/nacional/region-de-magallanes/2026/11/16/danstar-arriba-a-punta-arenas-en-medio-de-disputa-entre-chile-y-argentina-por-su-viaje-a-las-malvinas.shtml | 16-11-2026 | 19-11-2026, buscador |

La única cifra que dice la voz, las 1.400 toneladas, va anclada a Diario
Financiero, que el revisor acepta. El resto es relato con fuente nombrada.

**No entra al guion**: que el buque abastezca el proyecto petrolero Sea Lion
(es una sospecha que el gerente de la naviera niega); el nombre del proyecto de
ley argentino; la distancia exacta entre Punta Arenas y Puerto Argentino (no se
confirmó). Tampoco se toma bando sobre la soberanía: la pieza dice las dos
posiciones y nada más. La ficha del repo está en
`contenido/temas/ruta-punta-arenas-malvinas/ficha.md`, con doce hitos fechados.

## 3. Aprobación de Kast en dos encuestas (Short del 28-11-2026)

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| Criteria, aprobación | **18 %** de aprobación y 72 % de desaprobación, su registro más bajo | https://www.latercera.com/politica/noticia/criteria-aprobacion-del-presidente-kast-llega-al-18-y-desaprobacion-se-ubica-en-72/ y https://www.cooperativa.cl/noticias/pais/presidente-kast/criteria-aprobacion-a-kast-cayo-a-18-y-el-79-rechaza-mantener-a-rabat/2026-11-15/114122.html | 15-11-2026 | 19-11-2026, buscador |
| Criteria, metodología | Panel online, **802 casos**, en terreno el 12 y el 13-11-2026 | https://www.latercera.com/politica/noticia/criteria-aprobacion-del-presidente-kast-llega-al-18-y-desaprobacion-se-ubica-en-72/ | 15-11-2026 | 19-11-2026, buscador |
| Criteria, mediciones previas | **27 %** el 11-10-2026 y **27 %** el 25-10-2026 | https://www.cooperativa.cl/noticias/pais/politica/encuestas/criteria-aprobacion-de-kast-cae-al-27-y-desaprobacion-aumenta-al-64/2026-10-11/153234.html y https://www.emol.com/noticias/Nacional/2026/10/25/1215116/encuesta-criteria-25-octubre-2026.html | 11 y 25-10-2026 | 19-11-2026, buscador |
| Cadem, aprobación | **27 %**, dos puntos menos que en su medición anterior | https://www.emol.com/noticias/Nacional/2026/11/16/1217205/desplome-aprobacion-kast-debate-comitiva.html | 16-11-2026 | 19-11-2026, buscador |

**No entra al guion**: el 24 % y el 25 % que algún medio atribuye a Criteria en
la primera semana de noviembre (las fuentes se contradicen); la serie de
desaprobación de Criteria (59, 67 y 72 %), que solo se encontró en T13, fuera
de la lista del revisor; y la metodología de Cadem, que no se pudo leer. Por
eso la pieza dice la metodología de Criteria, que sí está publicada, y de Cadem
dice solo que usa su propia muestra y sus propios días.

## 4. Centros de datos y electricidad (Short del 29-11-2026)

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| Proyección del Coordinador Eléctrico Nacional | De **325 MW en 2025** a **1.207 MW en 2030**, un alza cercana al 270 % | https://www.emol.com/noticias/Economia/2026/02/12/1191254/data-centers-chile.html | 12-02-2026 | 19-11-2026, buscador |
| El cuello de botella es la transmisión | **Seis solicitudes** de conexión por **1.420 MW** recibieron respuesta desfavorable del Coordinador por falta de capacidad en subestaciones | https://www.latercera.com/pulso/noticia/transmision-electrica-en-aprietos-seis-data-center-no-pueden-construirse-en-chile-porque-no-pueden-conectarse-a-la-energia/ | 2026 | 19-11-2026, buscador |
| Un caso concreto | En 2025 el Coordinador rechazó una solicitud de **200 MW** en la zona de Alto Jahuel, entre Buin y el Maipo | https://www.latercera.com/pulso/noticia/transmision-electrica-en-aprietos-seis-data-center-no-pueden-construirse-en-chile-porque-no-pueden-conectarse-a-la-energia/ | 2026 | 19-11-2026, buscador |

**Advertencia que la pieza respeta**: Emol llama "demanda" a esos 325 y 1.207 y
los da en MW; La Tercera da las mismas cifras pero las llama "capacidad
instalada" y escribe MWh. Como las fuentes no coinciden en qué miden, el guion
dice **"lo que piden los centros de datos"** y se lo atribuye al Coordinador,
sin inventar la unidad.

**No entra al guion**: los 36 centros y los 255 MW instalados (solo en El
Dínamo, fuera de la lista del revisor); el porcentaje del consumo eléctrico de
Quilicura (una fuente dice 62 % y otra 79 %, y la segunda es una
extrapolación); el consumo de agua (no hay cifra medida); el aporte al PIB que
proyecta Amazon (es una proyección de la propia empresa); y los siete u ocho
años que tarda una obra de transmisión, que viene de una columna de opinión.

## 5. Apuestas en línea, dilema con votación (Short del 30-11-2026)

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| Proyección del Servicio de Impuestos Internos | Más de **US$ 100 millones** de IVA por las plataformas inscritas | https://www.cooperativa.cl/noticias/pais/juegos-de-azar/sii-defendio-cobro-a-apuestas-online-y-proyecto-recaudacion-inicial-de/2026-09-08/155153.html | 08-09-2026 | 19-11-2026, buscador |
| Plataformas inscritas | **39** plataformas extranjeras en el régimen de IVA digital, con pago trimestral | https://www.cooperativa.cl/noticias/pais/juegos-de-azar/sii-defendio-cobro-a-apuestas-online-y-proyecto-recaudacion-inicial-de/2026-09-08/155153.html | 08-09-2026 | 19-11-2026, buscador |
| Votación en la Cámara | Aprobada la indicación de la bancada UDI con **133 votos a favor** | https://www.latercera.com/politica/noticia/presupuesto-2027-camara-aprueba-indicacion-para-impedir-que-el-sii-destine-recursos-al-cobro-de-impuestos-a-plataformas-de-apuestas-online/ | 11-11-2026 | 19-11-2026, buscador |
| **El Senado la mantuvo** | El 19-11-2026 la Sala rechazó por **15 votos contra 8** la indicación del Gobierno que buscaba suprimir la glosa | https://www.theclinic.cl/2026/11/19/presupuestos-2027-senadores-rechazan-indicacion-de-hacienda-y-apoyan-propuesta-de-diputados-udi-para-impedir-cobro-de-impuestos-a-las-casas-de-apuestas-en-linea/ | 19-11-2026 | 19-11-2026, buscador |
| Reserva de constitucionalidad | El ministro de Hacienda la hizo respecto de la disposición | https://www.latercera.com/politica/noticia/presupuesto-2027-camara-aprueba-indicacion-para-impedir-que-el-sii-destine-recursos-al-cobro-de-impuestos-a-plataformas-de-apuestas-online/ | 11-11-2026 | 19-11-2026, buscador |
| Las dos posiciones | El Servicio de Impuestos Internos sostiene que cobrar impuestos no legaliza la actividad; los diputados de la UDI, que el Estado no debe recaudar de operadores no autorizados | https://www.theclinic.cl/2026/11/11/diputados-udi-se-suman-a-cruzada-contra-las-apuestas-en-linea-con-indicacion-a-ley-de-presupuestos-2027/ | 11-11-2026 | 19-11-2026, buscador |

**No entra al guion**: el reparto exacto de los otros tres votos de la Cámara
(una fuente dice 2 en contra y 1 abstención, otra dice 1 en contra y 2
abstenciones), así que solo se dice el 133 a favor; los US$ 55 millones anuales
que estimó Hacienda por la vía del proyecto de ley (la fuente advierte que no
es comparable); y los US$ 650 millones al año que movería el mercado (un solo
medio).

## 6. Valparaíso y San Antonio (Shorts del 01 y 02-12 y largo del 02-12-2026)

### Lo que dice la voz

| Afirmación | Dato | URL | Fecha de la fuente | Consultado |
|---|---|---|---|---|
| San Antonio en 2025 | **2,06 millones de TEU**, primera vez que un puerto chileno pasa los dos millones | https://www.emol.com/noticias/Economia/2026/01/12/1188235/puerto-san-antonio-limite-capacidad.html | 12-01-2026 | 19-11-2026, buscador |
| Su techo | El sistema actual aguanta unos **2,65 millones de TEU al año**, y el puerto opera en torno al **80 %** de su capacidad | https://www.emol.com/noticias/Economia/2026/01/12/1188235/puerto-san-antonio-limite-capacidad.html | 12-01-2026 | 19-11-2026, buscador |
| Valparaíso en 2025 | Más de **9,4 millones de toneladas** de carga general, un **11,5 %** más que en 2024 | https://www.df.cl/opinion/columnistas/valparaiso-y-la-nueva-frontera-minera-del-pacifico | 2026 | 19-11-2026, buscador |
| Puerto Exterior, reparto | **US$ 4.450 millones** en total: **US$ 1.950 millones** los pone el Estado (obras de abrigo y accesos) y **US$ 2.500 millones** los privados por concesión | https://www.emol.com/noticias/Economia/2026/07/07/1204891/informe-gremio-portuario-san-antonio.html | 07-07-2026 | 19-11-2026, buscador |
| Plan oficial | Primera etapa en operación en **2036** | https://www.emol.com/noticias/Economia/2026/07/07/1204891/informe-gremio-portuario-san-antonio.html | 07-07-2026 | 19-11-2026, buscador |
| El estudio que lo discute | Port Consultants Rotterdam, encargado por el gremio portuario: no haría falta empezar a construir antes de **2045**, y ampliar Valparaíso sale más eficiente por contenedor movido; argumenta con la entrada de Callao, Chancay y Posorja | https://www.emol.com/noticias/Economia/2026/07/07/1204891/informe-gremio-portuario-san-antonio.html | 07-07-2026 | 19-11-2026, buscador |
| Respuesta del Gobierno | Transportes dijo que la planificación portuaria no se basa en un solo estudio, y abrió la puerta a revisar el momento de avanzar | https://www.emol.com/noticias/Economia/2026/07/08/1205007/puerto-exterior-gobierno-pronuncia.html | 08-07-2026 | 19-11-2026, buscador |
| Respuesta de San Antonio | El presidente de la empresa portuaria, Sergio Merino: "Valparaíso está muy estresado por la configuración que tiene, por el tamaño de puerto, por la tremenda cercanía a la ciudad" | https://www.emol.com/noticias/Economia/2026/07/11/1205335/presidente-puerto-san-antonio-debate.html | 11-07-2026 | 19-11-2026, buscador |
| Las dos ampliaciones en paralelo | El gobierno regional y el Ejecutivo respaldaron que las expansiones de los dos puertos avancen a la vez | https://www.biobiochile.cl/noticias/nacional/region-de-valparaiso/2026/07/31/gore-y-ejecutivo-respaldan-que-expansiones-de-puertos-de-valparaiso-y-san-antonio-avancen-en-paralelo.shtml | 31-07-2026 | 19-11-2026, buscador |
| Aprobación ambiental del Puerto Exterior | La Comisión de Evaluación Ambiental de Valparaíso lo aprobó **por unanimidad en mayo de 2026** | https://www.cooperativa.cl/noticias/pais/region-de-valparaiso/megaproyecto-de-expansion-del-puerto-de-san-antonio-logro-aprobacion/2026-05-26/215451.html | 26-05-2026 | 19-11-2026, buscador |
| La ampliación de Valparaíso también tiene permiso | El Comité de Ministros la destrabó **tras doce años de tramitación** | https://www.df.cl/empresas/construccion/comite-de-ministros-destraba-expansion-del-puerto-de-valparaiso-tras-12 | 2026 | 19-11-2026, buscador |
| Qué es un TEU | Unidad equivalente a un contenedor de 20 pies: un contenedor de 40 pies son dos TEU. Por eso la voz dice TEU y no "contenedores" | https://es.wikipedia.org/wiki/Puerto_de_San_Antonio (definición de uso común en la industria) | 2026 | 19-11-2026, buscador |
| Canal de Panamá | Abrió en **1914** y desvió gran parte del comercio que circulaba por el Estrecho de Magallanes | https://www.memoriachilena.gob.cl/602/w3-article-639270.html (Biblioteca Nacional de Chile) | sin fecha de nota | 19-11-2026, buscador |
| Apertura de San Antonio | **1922**, y atrajo capitales que antes estaban en Valparaíso | https://www.memoriachilena.gob.cl/602/w3-article-639270.html | sin fecha de nota | 19-11-2026, buscador |
| Crisis del salitre | Entre **1914 y 1929**, por efectos de la Primera Guerra Mundial | https://www.memoriachilena.gob.cl/602/w3-article-639270.html | sin fecha de nota | 19-11-2026, buscador |
| La explicación del canal está discutida | El historiador **Pablo Aravena** (Universidad de Valparaíso) cuestiona que el canal sea el origen del declive y sitúa el inicio de la crisis varias décadas después | https://www.biobiochile.cl/especial/bbcl-investiga/noticias/reportajes/2026/11/16/valparaiso-de-capa-caida-las-heridas-de-la-joya-del-pacifico.shtml | 16-11-2026 | 19-11-2026, buscador |

### Lo que está verificado pero NO lo dice la voz

Estas cifras existen y están confirmadas, pero su única fuente son las propias
empresas portuarias y la prensa especializada, que el revisor numérico no
acepta. Van en la descripción del video y acá, no en el audio.

| Dato | URL | Fecha |
|---|---|---|
| San Antonio 2025: 2.060.244 TEU y 23.855.311 toneladas | https://www.revistalogistec.com/index.php/2026/01/13/puerto-san-antonio-cerro-2025-con-crecimiento-en-la-transferencia-de-carga/ | 13-01-2026 |
| San Antonio 2024: 1.814.488 TEU y 23.209.963 toneladas (+10,52 %) | https://www.puertosanantonio.com/transferencia-de-carga-aumento-10-52-en-2024 | 01-2025 |
| San Antonio 2023: 1.540.538 TEU y 21.001.161 toneladas · récord 2021: 25.092.640 toneladas y 1.840.458 TEU | https://portalportuario.cl/transferencia-de-carga-en-puerto-de-san-antonio-aumenta-1052-en-2024/ | 01-2025 |
| Valparaíso 2025: 926.860 TEU (+21,3 %) y 9.403.319 toneladas | https://www.puertovalparaiso.cl/puerto-valparaiso-cierra-2025-con-un-solido-crecimiento-en-la | 01-2026 |
| Valparaíso 2024: 764.150 TEU (caída de 3,1 %) y 8.432.004 toneladas | https://portalportuario.cl/movimiento-de-teu-cae-31-durante-2024-en-puerto-de-valparaiso/ | 01-2025 |
| Valparaíso 2023: 788.970 TEU · 2022: 817.188 TEU | https://noticiaslogisticaytransporte.com/logistica/26/02/2024/puerto-de-valparaiso-cierra-2023-con-una-disminucion-en-la-transferencia-de-carga/188812.html | 26-02-2024 |

Con esas cifras, Valparaíso cayó tres años seguidos (817.188 en 2022, 788.970
en 2023, 764.150 en 2024) y recién en 2025 rompió la racha. Esa es la forma
exacta de la caída. La voz **no dice ninguno de esos números**: dice "el primer
lugar en carga de contenedores lo tiene su vecino", que es cierto y no depende
de una fuente que el revisor rechace. Los 926.860 TEU de Valparaíso van en la
descripción del largo y del Short del 01-12, con su fuente.

**No entra al guion**: el año exacto en que San Antonio superó a Valparaíso en
contenedores (ninguna fuente lo fecha); el monto de la ampliación de Valparaíso
(una fuente dice US$ 900 millones y otra US$ 380 millones para el terminal
Cerros de Valparaíso); la capacidad actual de Valparaíso en TEU (una fuente
dice 1 millón y otra 0,9); las cifras regionales de "los puertos de la Región
de Valparaíso" (miden otra cosa); y el tráfico de Valparaíso antes y después de
1914 (no hay serie verificable). Por eso el largo **no afirma** que el canal
causó el declive: dice que es la explicación clásica y que un historiador la
discute.

## Veredicto

Los ocho guiones pasan `validar.mts` y `verificar-cifras.mts` en verde después
de la segunda vuelta, con las quince cifras del largo y las de cada Short
recalculadas contra su dataset y **0 fuera de tolerancia**.

Las seis secciones quedan listas. Tres advertencias que los guiones cumplen:
(1) la pieza del Presupuesto se escribe sobre el plazo y el mecanismo, con los
hechos fechados al 19-11-2026, para que no caduque; (2) la pieza del Danstar da
las dos posiciones y no afirma nada sobre soberanía ni sobre el proyecto
petrolero; (3) la pieza de los centros de datos no asegura la unidad de las
cifras del Coordinador, porque las fuentes no coinciden en qué miden.
