# Propuesta de estrategia para Entender Chile (12-11-2026)

Encargo: repensar el canal con datos, sin tocar el pipeline. Norte de Santiago:
monetizar y ganar dinero, sin gasto nuevo, cumpliendo las políticas de YouTube.
Esto es análisis: no cambia nada hasta que se decida. Las fuentes de cada cifra
están entre paréntesis. La skill `despegue` y `estrategia/decisiones.md` siguen
mandando mientras no se adopte esta propuesta.

## 0. La respuesta corta

1. **El canal no crece porque su producto principal sigue siendo un resumen de
   noticias estático**, no un explicativo. El Short "del día" que sale hoy se
   arma con `scripts/short.js` a partir de las tesis del guion del informe:
   título "X, y otras 4 cosas de hoy", fondo fijo del mapa de Chile, texto
   sobre fondo azul, voz Azure, 12,6 s de texto fijo (apertura y cierre, el 30 %
   de la pieza). Lo comprobé con los fotogramas del Short del 10-11-2026
   (release `edicion-2026-11-10`): en 35 s no se mueve nada salvo el texto. La
   decisión "solo explicar" del 04-11-2026 no llegó al producto.
2. **El techo medido es bajo y no se movió en 75 días.** Mediana de un Short en
   los últimos 30 días: 48 vistas. Solo 3 de 148 Shorts pasaron las 1.000
   vistas. Ritmo: 0,63 suscriptores/día (de 35 a 54 entre el 13-10 y el
   12-11-2026) y 283 vistas/día. Para el YPP por Shorts hacen falta 111.000
   vistas/día (393 veces lo actual); por horas de largos, el canal suma unas
   7 h de largos en los últimos 30 días.
3. **La fábrica es desproporcionada.** Para 1 Short de 40 s y un largo
   semanal corren 15 workflows, unas 14 rutinas de Claude encendidas (al menos
   6 de ellas Opus), un despachador de GPT y un PR de eventos. Es la cadena del
   informe diario, que se apagó en video pero sigue corriendo entera porque de
   ella cuelga el Short.
4. **Recomendación: Estrategia A, "Chile en mapas y datos"** (un largo
   semanal de 10 a 12 min y un Short diario de 45 a 60 s con mapa o gráfico en
   movimiento, ambos hechos con las plantillas de Línea Punteada y En Números
   Rojos), con un flujo de 3 pasos que reemplaza la cadena diaria, y una
   **compuerta dura a los 14 días del piloto**: si no cumple, se ejecuta la
   Estrategia C (cerrar la producción de video de Entender Chile y mover el
   cupo a Línea Punteada y En Números Rojos, que hoy rinden 10 a 15 veces más
   suscriptores por día).

## 1. Diagnóstico con datos del repo

Fuente: `bitacora/metricas/2026-11-12.json` (vistas, me gusta, duración,
retención de Analytics, impresiones y CTR de la Reporting API del 13-10 al
12-11-2026) y `bitacora/metricas/proyeccion.json`. 226 videos públicos, 25.393
vistas por suma de videos. "% visto" sobre 100 indica repeticiones del Short.

### 1.1 Por formato

| Formato (clasificado por título y duración) | Videos | Vistas | Mediana | Media | p90 | Pasan 300 | % visto (mediana) |
|---|---|---|---|---|---|---|---|
| Short con titular de noticia | 89 | 13.682 | 75 | 154 | 441 | 11 | 60 % |
| Short con pregunta "¿Por qué/Qué...?" | 49 | 7.972 | 67 | 163 | 481 | 7 | 57 % |
| Short "y otras 4 cosas" (identificable) | 10 | 1.425 | 97 | 142 | 384 | 2 | 69 % |
| Largo (informe diario 3 a 11 min + "Entender el caso") | 78 | 2.314 | **12** | 30 | 71 | **0** | 16 % |

Lectura: **la pregunta en el título no rinde más que el titular** (mediana 67
contra 75). El supuesto de la estrategia vigente ("los únicos que pasan de 500
son los que explican algo") no se sostiene en los datos de los Shorts: de los
11 Shorts sobre 500 vistas, 7 son titulares de noticia dura y 4 llevan
pregunta. Los largos no se reparten: 78 videos, ninguno sobre 300.

### 1.2 Top 10 por vistas

| Vistas | Fecha | Formato | Seg | % visto | Me gusta | Título (truncado a 60 por la API) |
|---|---|---|---|---|---|---|
| 1.095 | 31-10 | Short titular | 39 | 88,6 | 29 | Fiscalía investiga a Rabat y Silva por posible prevaricación |
| 1.057 | 11-10 | Short pregunta | 44 | 80,8 | 37 | ¿Por qué cae la aprobación de Kast a su nivel más bajo? |
| 1.054 | 05-10 | Short pregunta | 40 | 21,6 | 44 | ¿Por qué Chile decretó duelo nacional por un carabinero ases... |
| 948 | 10-11 | Short 5 cosas | 36 | s/d | 13 | Camioneros mantienen el paro por el precio del diésel, y otr... |
| 875 | 11-10 | Short titular | 43 | 83,3 | 13 | Murió el exlautarista que pidió indulto a Kast seis días ant... |
| 826 | 02-10 | Short 5 cosas | 47 | s/d | 18 | La caída minera convirtió en retroceso un mes que, y otras 4 |
| 742 | 28-09 | Short titular | 56 | s/d | 26 | El crimen del carabinero en Renca suma un segundo detenido |
| 723 | 12-10 | Short pregunta | 46 | 57,0 | 18 | ¿Por qué había mineros sacando nieve en una zona de riesgo...? |
| 640 | 07-11 | Short titular | 37 | 90,4 | 23 | Paraguay destituyó a Santiago Peña después de la caída de Ueno |
| 532 | 02-10 | Short pregunta | 51 | s/d | 9 | ¿Viene la primera caída del PIB en Chile desde la pandemia? |

### 1.3 Bottom 10 (todos con 1 a 3 vistas)

| Vistas | Fecha | Formato | Seg | Título |
|---|---|---|---|---|
| 3 | 23-09 | Largo (informe) | 614 | Lluvias intensas: alerta en seis regiones hasta el jueves |
| 3 | 21-09 | Largo (informe) | 664 | Fiestas Patrias deja 18 fallecidos y un balance vial todavía... |
| 3 | 07-09 | Largo (Clave) | 334 | ¿Por qué una norma sísmica no basta para evitar el riesgo? |
| 2 | 31-10 | Largo (informe) | 226 | Fiscalía investiga a Rabat y Silva por decretos de rebaja de... |
| 2 | 30-10 | Short pregunta | 47 | ¿Alcanza con sacar a un subsecretario para salvar al ministr... |
| 2 | 18-10 | Short pregunta | 49 | ¿Por qué el 18-O vuelve a dividir a Chile siete años después? |
| 2 | 01-10 | Short titular | 44 | El desempleo creció porque aumentó la fuerza laboral y cayó... |
| 2 | 28-09 | Short pregunta | 56 | ¿Por qué el Gobierno cuadruplica los cupos del subsidio para... |
| 1 | 24-10 | Largo (informe) | 258 | Justicia suspende nuevas rebajas de condena a agresores de m... |
| 1 | 30-09 | Short pregunta | 47 | ¿Por qué el gobierno estudia retirar su propia reforma de se... |

Nota clave: **el mismo tema rinde 1.095 como Short y 2 como largo el mismo día**
(Rabat, 31-10-2026). El tema no es el problema; el paquete del largo sí.

### 1.4 Patrones

- **Tema**: 9 de los 10 mejores son crimen, muerte, escándalo o la figura del
  Presidente, con una persona o un grupo humano en el título (ya medido el
  09-11-2026: 27,8 % de los Shorts con persona pasan 300 vistas contra 4,4 %
  sin persona). Indicadores y trámites (IPC, Imacec, Contraloría, fondos de
  pensiones) se quedan entre 3 y 30 vistas. Lo "cola larga" que pide la
  estrategia vigente es justo lo que hoy no se reparte, porque se cuenta con
  el mismo paquete visual que un titular.
- **Gancho**: el primer fotograma del Short es "Cinco cosas que hay que saber
  hoy, Martes, 10 de noviembre" (fotograma a 0,5 s). Es la fórmula del
  noticiero, no una paradoja ni una promesa. Los referentes que crecen abren
  con la consecuencia o la paradoja (sección 2).
- **Duración**: los Shorts viven entre 33 y 56 s; dentro de ese rango no hay
  señal clara. La retención media (69,5 % visto) es buena: **quien lo ve, lo ve;
  el problema es que el feed lo muestra a muy poca gente** (Shorts de 20 a 80
  impresiones de carátula; la distribución del feed de Shorts no está en la
  Reporting API, solo su resultado).
- **Hora y día**: todos a las 12:00. Mediana por día de publicación: sábado
  116, viernes 74, miércoles 34,5 (n de 16 a 28 por día, ruido alto). No es
  palanca: solo el 0,7 % de las vistas viene de notificaciones.
- **Carátula del largo**: el piloto de "Entender el caso" (05-11-2026, Rabat)
  recibió **2.833 impresiones** y convirtió al 0,56 %: YouTube sí lo mostró y
  la gente no hizo clic. Retención: 91 % a 1 %, 62 % al 5 %, 48 % al 10 %, 29 %
  a la mitad; caída mayor en el segundo 7 (19 puntos). Las 45 vistas vinieron
  de suscriptores (18) y relacionados (16); búsqueda, 6.
- **Fuentes de tráfico (canal, 30 días)**: Shorts 5.438 vistas, búsqueda 653,
  suscriptores 213, relacionados 138. La búsqueda existe pero es el 9 %.
- **Suscriptores**: 19 en 30 días con 8.489 vistas, o sea 2,2 por cada 1.000
  vistas. La tasa por vista no es mala: lo que falta es volumen.

### 1.5 Por qué no crece (directo)

1. **El Short es un noticiero sin imagen.** Texto sobre fondo fijo, voz
   sintética, apertura de calendario. Para el feed es indistinguible de cientos
   de cuentas de noticias, y para la política de YouTube es el perfil exacto de
   contenido "repetitivo / producido en masa": misma plantilla, mismo fondo,
   cambia solo el texto. No hay nada que el espectador no tenga ya en la
   notificación del diario.
2. **El largo no tiene paquete.** CTR 0,56 % con 2.833 impresiones es un
   rechazo de la carátula y el título ("¿Quién decidía las rebajas de condena
   en Chile?" pregunta algo que el público ya cree saber).
3. **La actualidad chilena en YouTube se consume como opinión con rostro**
   (Política Chile, 157 mil subs; Política para Patriotas, 236 mil; CNN Chile
   con mediana de 870 en largos). El hueco que sí existe es otro: el explicador
   visual (mapa, gráfico) sin presentador. Hoy lo ocupan canales de España y de
   Paraguay cuando hablan de Chile.
4. **El esfuerzo va a la cadena y no al producto.** La bitácora de mejoras del
   04 al 11-11-2026 dedica sus mejoras a reglas del prompt del informe (portada
   extranjera, titular con persona, tope de 66 caracteres): ajustes finos de un
   formato que no tiene techo. Las dos mejoras que tocan el producto (PR 7 y 8,
   primeros segundos del Short) llevan 5 y 6 días sin fusionar, y la rutina de
   mejora lleva 7 días sin poder abrir `www.youtube.com` (bloqueado en la red
   de la nube), o sea sin mirar un referente.

## 2. Referentes (medidos el 12-11-2026)

Medición: páginas públicas de YouTube (`/videos` y `/shorts`, mediana de los
últimos 20 ítems de cada pestaña, vistas visibles ese día). Duración y lenguaje
visual son estimados (la página no entrega duración). Los títulos en inglés se
ven traducidos por el doblaje automático.

### 2.1 En español

| Canal | Subs | Largos (mediana) | Shorts (mediana) | Cadencia | Fórmula de gancho (títulos reales) | Visual | Replicable sin rostro |
|---|---|---|---|---|---|---|---|
| VisualPolitik (ES) | 3,81 M | ~580 mil | s/d (pestaña con publicidad) | ~6/sem | "X es PEOR de lo que pensábamos"; "Si BUKELE gana en HAITÍ, su MANO DURA se exportará a toda Latinoamérica" (2,6 M) | voz en off, motion graphics, mapas | Sí, casi todo |
| VisualEconomik (ES) | 903 mil | 303 mil | s/d | ~4/sem | "Las PENSIONES están PEOR de lo que nos contaron: la HUCHA es pura DEUDA" (284 mil) | gráficos animados, voz en off | Sí: el modelo más cercano a una fábrica |
| Los Ecomonos (ES) | 474 mil | ~330 mil | sin Shorts | ~2/sem | "Qué país rico quebrará primero" (758 mil) | animación 2D con mascota | Sí (es la meta de En Números Rojos) |
| Memorias de Pez (ES) | 2,97 M | ~300 mil | ~75 mil | ~7/sem | "BUKELE despliega tropas en HAITÍ ¿Qué está pasando?" (785 mil) | presentador + mapas | Parcial: título "¿Qué está pasando?" sí, carisma no |
| Un Mundo Inmenso (ES) | 1,79 M | 330 mil | 152 mil | ~1 largo/sem | "¿Por qué casi no hay islas en Sudamérica?" (992 mil) | mapas animados, voz en off | Sí, totalmente |
| El Mapa de Sebas (ES) | 1,27 M | ~9,6 mil (en baja) | 27 mil | ~1/día | "Bolivia perdiendo su mar en 3 mapas" | mapas animados | Sí en los mapas |
| Mundobeto (PY) | 175 mil | 40 mil | ~5 mil | ~1/día | "Paraguay: el banco que dejó a 3 millones sin su dinero y puso al presidente contra las cuerdas" (72 mil) | voz en off, stock, gráficos | Sí: **noticia de actualidad narrada, lo más cercano a Entender** |
| Economía y Desarrollo (LatAm) | 567 mil | 6 mil | 1,3 mil | ~1/día | "TRUMP perdió el SENADO: ¿quién pierde en LATINOAMÉRICA?" | presentador + gráficos | Parcial |
| Ñerd (ES) | 26,1 mil (dudoso) | solo Shorts | 47 mil (media 87 mil) | ~1/día | "España hizo sus vías 23 cm más anchas... y no fue por Napoleón" (302 mil) | mapas, archivo, voz | Sí, totalmente |
| CIPER Chile (CL) | 26,2 mil | 13 mil | 14 mil | ~2/sem | "Lo que calló Rabat"; Short del chat Hermosilla (26 mil) | documentos y chats en pantalla | Parcial: documentos sí, investigación propia no |
| Política Chile (CL) | 157 mil | 21 mil | 15 mil | ~1/día | entrevistas | rostro | No: solo señal de interés |
| CNN Chile / La Tercera (CL) | 1,1 M / 410 mil | 870 / 743 | 4,8 mil / 2 mil | muchas/día | declaraciones | TV | No: fuente, no formato |

### 2.2 En inglés (lenguaje visual)

| Canal | Subs | Largos (mediana) | Cadencia | Gancho | Qué se copia |
|---|---|---|---|---|---|
| Johnny Harris | 8,02 M | ~3,6 M | ~0,4/sem | "Cómo funciona REALMENTE el lavado de dinero" | mapas con trazo, zoom a documento, pizarra; el rostro no |
| Caspian Report | 1,85 M | ~315 mil | ~1/sem | "Por qué Alemania está en declive" | mapa + voz en off sin rostro: el molde exacto de una fábrica |
| TLDR News | 936 mil | ~345 mil | ~3/sem | "El primer presupuesto de Burnham explicado" | "X explicado" con gráfico; **actualidad política explicada en 10 min** |
| Wendover | 4,92 M | ~980 mil | ~1/sem | "Por qué Botsuana se volvió tan rica" | economía + mapa + gráfico, sin rostro |

### 2.3 Patrones de los que crecen

1. **El título promete consecuencia o paradoja**, no el hecho: "es PEOR de lo
   que nos contaron", "¿Por qué...?" sobre algo que el público no se había
   preguntado, "... y no fue por Napoleón". Mayúsculas en 2 o 3 palabras, no
   en todo.
2. **Imagen que cambia cada 2 a 4 s** (mapa que se acerca, barra que crece,
   documento subrayado). Nadie crece en este nicho con texto sobre fondo fijo.
3. **Dos cadencias que funcionan**: actualidad diaria con equipo humano
   (VisualPolitik, Memorias de Pez) o 1 largo semanal muy trabajado (Caspian,
   Un Mundo Inmenso, Wendover). La que falla es la intermedia: actualidad
   lenta y sin paquete.
4. **Shorts de 40 a 70 s con una sola paradoja y un mapa o dato** (Ñerd, Un
   Mundo Inmenso: medianas de 47 mil y 152 mil).
5. **Hueco en Chile**: no hay un explicador visual de la actualidad chilena
   sin presentador. Los que hablan de Chile con ese formato son extranjeros
   (Mundobeto, Economía y Desarrollo con Ueno/Peña).

## 3. Herramientas que ya existen en la casa

Todo esto está construido y probado en los repos hermanos; nada se inventa.

| Herramienta | Dónde vive | Estado | Aplicación en Entender Chile |
|---|---|---|---|
| Cámara cartográfica con gramática R1 a R5 (cortes, zooms sin diente de sierra), validador de cámara | `yt/linea-punteada/src/plantillas/comun/camara.ts`, `scripts/camara.mts` | en producción | mapa de Chile que se acerca a la comuna/región de la noticia (paro en rutas, Ruta de la Fruta, Lago Ranco) |
| Fondo satelital NASA GIBS (Landsat 30 m, Blue Marble, relieve) sin clave | `yt/linea-punteada/scripts/mapas.mts` | en producción | planos de lugar reales para cada noticia regional |
| Plantillas `frontera`, `lugar`, `ruta` (9:16) y `largo` (16:9) con capítulos | `yt/linea-punteada/src/plantillas/*`, `preparar-largo.mts`, `render-largo.mts` | en producción (largo de 8:44 publicado el 08-11-2026) | base del largo de A y de los Shorts de mapa |
| Gráficos animados de datos abiertos: barras, líneas, contador, comparación, mapa coroplético de países, anotación, pie de fuente | `yt/numeros-rojos/src/plantillas/comun/graficos/*` | en producción (aprobado por Santiago el 08-11-2026, "está demasiado bueno") | dólar, IPC, Imacec, PIB, precio del diésel, presupuesto por partida |
| Verificador de cifras (bloquea cifras fuera de 5 % de la fuente) | `yt/numeros-rojos/scripts/verificar-cifras.mts` | en producción | reemplaza buena parte del validador Opus actual por una regla mecánica |
| Plantilla `tesis` 16:9 con visuales (foto de Commons, ilustración, sello, versus, mascota, viaje de mapa) y validador de ritmo `problemasDeRitmo` | `yt/numeros-rojos/src/plantillas/tesis`, `comun/visuales/*` | en producción | molde directo del largo explicativo |
| Fotos de Wikimedia Commons con crédito | `yt/numeros-rojos/scripts/lib/imagenes.mts` | en producción | rostros públicos (ministros, Presidente) sin generar caras |
| Voz Edge TTS (msedge-tts, gratis) y voz Azure (la actual del canal) | `numeros-rojos/scripts/voz.mts`; `canal-pipeline` | ambas vivas | se mantiene Azure (identidad del canal) |
| Panel de votación compartido (pulgar, burbuja, "ACCIÓN → NOMBRE") | `yt/bolita-lab/src/marca/Votacion.tsx` | en producción | cierre de los Shorts de la Estrategia B |
| Simulaciones físicas, carreras y batallas con desenlace | `yt/bolita-lab/scripts/simular-*.mts`, plantillas `carrera`, `colores` | en producción | "carrera" de indicadores (qué subió más este año: dólar, diésel, UF) en B |
| Three.js 3D en Remotion (`--gl=swangle`) | `yt/bolita-lab/src/plantillas/maquina`, `ritmo` | prototipo | maqueta 3D de Chile o de una mina (Codelco); caro, no prioritario |
| Música y SFX sintetizados en Node | `bolita-lab/scripts/sonido*.mts`, `linea-punteada/scripts/sonido.mts` | en producción | cama sonora sin derechos |
| Carátulas por GPT (fórmula de 60 miniaturas: foto documental + 2 a 4 palabras en caja + línea roja) | skill `caratulas-con-gpt` §2b; este repo es el canal de pedidos | en producción | carátula del largo con sujeto en línea 1 y tensión en línea 2 |
| Carátula por API a video ya subido | `yt/linea-punteada/scripts/miniatura.mts` | en producción | A/B manual de carátula a las 48 h |
| Render en GitHub Actions (repo público, minutos gratis) | `linea-punteada/.github/workflows/producir.yml` (61 min/Short satelital), `numeros-rojos/.github/workflows/producir.yml` | en producción | el largo de 10 min se rinde en ~12 min (dato del encargo); Shorts de gráfico más rápidos que los satelitales |
| Navegador piloto (Studio, referentes, transcripciones) | `yt/bolita-lab/herramientas/navegador` (puerto 8777) | en producción | hoy no sirve aquí: el canal está en otra cuenta de Google (las capturas de métricas salen "omitidas") |
| Panel con tablero | https://sinostrozadev.github.io/panel/ | en producción | registrar Entender Chile con la misma tabla de YPP |
| Barrido de 22 medios, diario escrito, seguimiento de temas | este repo | en producción | **es el banco de temas verificado**: sirve tal cual para elegir de qué hablar |

**Herramientas nuevas que valen la pena (gratis):**

| Herramienta | Costo | Beneficio | Veredicto |
|---|---|---|---|
| mindicador.cl (API JSON sin clave: dólar, UF, UTM, IPC, Imacec, IPSA, cobre, desempleo, series diarias) | 0, una tarde de integración en `datos.mts` | cifra chilena del día con serie histórica para cada gráfico, sin entrar a páginas | **Sí, primera** |
| Límites de regiones y comunas de Chile en GeoJSON (BCN, mapoteca de la Biblioteca del Congreso / IDE Chile, uso libre con crédito) | 0, una tarde: simplificar con mapshaper (npm) | coropletas por comuna y región ("¿Tu comuna está en la lista?"), que hoy no existen | **Sí** |
| Datos de la Dirección de Presupuestos y datos.gob.cl (CSV) | 0 | gráfico por partida del Presupuesto 2027 | Sí, cuando el tema lo pida |
| Blender por línea de comandos | 0 en dinero; alto en tiempo | Cycles en CPU tarda minutos por fotograma; Eevee necesita GPU/EGL, que ni WSL en headless ni Actions dan de forma fiable. Three.js en Remotion ya cubre el 3D liviano | **No por ahora**. Solo si un largo necesita una toma 3D estrella, y entonces se rinde un clip corto una vez y se reutiliza |

## 4. Tres estrategias

Supuestos comunes para las proyecciones a 90 días (13-11-2026 al 10-02-2027):
punto de partida 54 subs; línea base sin cambios = +0,63 subs/día y 283
vistas/día (o sea **+57 subs, 25.000 vistas y unas 20 h de largos** en 90 días);
2,2 subs por 1.000 vistas de Short (medido); 5 subs por 1.000 vistas de largo
(supuesto, el largo convierte más que el Short en los canales de la casa); un
largo de 11 min retiene 35 % (3,9 min por vista, supuesto entre el 31 % del
piloto y el 40 % de la Clave del 12-10). Los costos en cupo de Claude son
sesiones Opus por semana; la cadena actual gasta del orden de 50 a 70 por
semana (validadora despertada varias veces por día, red del validador,
observatorio, auditoría, mejora diaria, vigía dos veces) más unas 120 rutinas
Haiku de reloj.

### Estrategia A: "Chile en mapas y datos" (la visual)

**Propuesta de valor**: la noticia chilena de la semana explicada con el mapa y
el gráfico que la hacen obvia, en el tiempo que dura un café.

**Largo** (1 por semana, miércoles 19:00, 10 a 12 min):
- Estructura de retención: frío de 0 a 15 s con la cifra o el mapa más fuerte y
  el sujeto humano ("6 semanas de alzas: así se arma lo que pagas por un litro
  de diésel"); promesa concreta antes de los 20 s; 4 a 5 capítulos de 2 a 3
  min, cada uno abre con una pregunta y cierra con un dato que lleva al
  siguiente; 2 mid-rolls naturales entre capítulos; cierre con "qué mirar la
  próxima semana" (fecha concreta) y la pantalla final al Short relacionado.
- Lenguaje visual: plantilla `tesis` de En Números Rojos más la cámara de
  Línea Punteada para el viaje de mapa; un cambio de plano cada 3 a 5 s
  (validador de ritmo); fotos de Commons de las personas públicas; documento
  oficial en pantalla con subrayado (estilo CIPER y Johnny Harris).
- Tema: la noticia chilena más grande de la semana que tenga cifra oficial y
  geografía (el barrido y `contenido/temas/` ya lo dan), siempre con el ángulo
  de mecanismo ("cómo funciona", "por qué pasa") que sirve en búsqueda meses
  después.

**Short** (1 por día, 12:00, 45 a 60 s):
- Gancho en el fotograma 0: la paradoja o la consecuencia con una persona
  adentro ("Chile pagó 17 veces lo que valía un terreno... y lo descubrió
  Contraloría"); nunca la fecha ni "cinco cosas".
- Un solo tema por Short. Visual: mapa que se acerca o gráfico que crece, cifra
  grande, sin fondo fijo. Fin en bucle hacia la primera frase.
- Relación con el largo: 2 de los 7 Shorts de la semana son recortes nativos
  del largo (rehechos en 9:16, no un recorte) y llevan "video completo" en el
  comentario fijado; los otros 5 son temas del barrido de la semana.

**5 títulos de ejemplo y miniaturas**
1. "Chile está en recesión técnica: qué significa para tu sueldo" | Miniatura:
   gráfico de PIB con dos barras rojas bajando; caja cobre "2 TRIMESTRES EN
   ROJO".
2. "Por qué el diésel subió 6 semanas seguidas (y quién decide el precio)" |
   Surtidor documental; caja "¿QUIÉN LO FIJA?"; línea roja ascendente.
3. "Codelco contó cobre que no existía: cómo se infló la producción" | Foto
   de una mina a sangre; caja "42.100 TONELADAS".
4. "El Presupuesto 2027 en 10 minutos: dónde está el recorte" | Mapa de Chile
   coloreado por región; caja "QUIÉN PIERDE".
5. "La comuna que pagó 17 veces el valor de un terreno" | Foto aérea de Lago
   Ranco (Commons o satelital); caja "17 VECES".

**Producción**: guion JSON con el contrato de `numeros-rojos/src/plantillas/
comun/guion.ts` (`tesis` para el largo, `grafico` para el Short) más
`frontera`/`lugar` de Línea Punteada cuando el tema es territorial. Se copian
las plantillas al repo del canal (o se crea un `comun/` compartido). Render en
Actions. Carátula por GPT con el pedido que ya existe en este repo.

**Costo semanal**: Claude, 4 a 6 sesiones Opus (1 de plan semanal con
búsqueda web, 1 de guion del largo, 1 de revisión independiente del largo, 1
de los 7 guiones de Short en lote, 1 de revisión); 0 rutinas de reloj. Render:
12 a 15 min el largo + 7 Shorts de gráfico a ~10 a 20 min c/u (los satelitales,
~60 min) = **2 a 4 h de Actions por semana**, gratis en repo público.
GPT: 1 carátula semanal.

**Riesgo de monetización**: bajo a medio. Cada pieza tiene guion propio,
investigación con fuentes y un visual distinto por tema, lo contrario de
"repetitivo". Divulgar voz sintética en Studio. Riesgo de anuncios limitados
en temas de crimen o muerte: evitarlos como portada de largo.

**Proyección a 90 días**

| Escenario | Supuestos | Subs | Vistas | Horas de largos |
|---|---|---|---|---|
| Conservador | Short mediana 150; largo 300 vistas | +50 (104) | 17 mil | 240 |
| Base | Short mediana 400 (Ñerd y Un Mundo Inmenso con 2 % de su mediana); largo 1.500 | +170 (224) | 54 mil | 1.200 |
| Optimista | Short mediana 1.500; largo 8.000 (un largo que pega en búsqueda o relacionados) | +780 (834) | 231 mil | 7.200 |

Ni en el optimista llega al YPP en 90 días por suscriptores; el base deja el
canal en ~30 % de las horas que pedía la regla vieja y ~15 % de las 8.000 de la
nueva (vigente desde el 01-02-2027). Es una apuesta a 9 a 12 meses.

### Estrategia B: "¿Qué harías tú?" (la de interacción)

**Propuesta de valor**: cada semana, una decisión real del país que el público
vota antes de saber qué pasó, y después ve cómo resultó.

**Short** (1 por día, 45 s): el dilema con dos opciones y sus costos con cifra
("El Gobierno congela la bencina hasta febrero: ¿la congelas o la dejas
subir?"), cierre con el panel de votación de Bolita Lab ("COMENTA A o B"),
comentario fijado con la pregunta y respuesta diaria a los comentarios. Los
viernes, Short de "carrera" de indicadores (qué subió más este año) con
predicción del público.

**Largo** (1 por semana, domingo 19:00, 8 a 10 min): "Lo que votaron y lo que
pasó": resultado de la votación de la semana (conteo de comentarios), qué
decidió el país, quién tenía razón con datos, y el dilema de la semana
siguiente. Estructura: 0 a 20 s resultado sorpresa; 3 capítulos (los 3
dilemas de la semana); cierre con la predicción abierta.

**5 títulos**: "¿Congelarías la bencina? 7 de cada 10 dijeron que sí"; "Votaste
contra el recorte a Senapred: esto es lo que cuesta"; "¿Codelco con socios
privados? Lo que votaron y lo que dice la ley"; "Predicción: ¿baja la tasa en
diciembre?"; "Carrera 2026: dólar contra diésel contra UF". Miniaturas: dos
mitades A/B con color propio y el resultado en grande ("72 %").

**Producción**: plantilla `grafico` de En Números Rojos + `Votacion.tsx` y
`carrera` de Bolita Lab; conteo de comentarios con la API (scope que ya se usa
en Bolita Lab, `comentar.mts`); el canal está en otra cuenta de Google, así que
hace falta el token de esa cuenta (clic de Santiago). Costo: 4 sesiones Opus
por semana; render 2 a 3 h de Actions.

**Riesgo**: **alto en lo editorial**. Votar decisiones políticas en Chile 2026
polariza los comentarios y puede convertir el canal en lo que hoy crece, que es
la trinchera partidista, contra la identidad del canal (`estrategia/
identidad.md`). Monetización: un Short que pide comentarios no es engaño, pero
"COMENTA A o B" repetido a diario con la misma plantilla roza "repetitivo".
Medición: las encuestas de la pestaña Comunidad no se pueden crear por API, así
que el voto es por comentario (sesgado hacia quien comenta).

| Escenario | Supuestos | Subs | Vistas | Horas |
|---|---|---|---|---|
| Conservador | Short 120, largo 200 | +40 | 13 mil | 100 |
| Base | Short 300, largo 800; comentarios x5 empujan el reparto | +140 | 34 mil | 470 |
| Optimista | un dilema se vuelve conversación nacional; Short 1.200, largo 4.000 | +520 | 140 mil | 2.400 |

### Estrategia C: pivotar o cerrar (la opción honesta)

**C1, pivotar a "Cómo funciona Chile"** (evergreen puro, sin actualidad): 2
largos por semana de 8 a 10 min sobre instituciones y mecanismos que se buscan
todo el año ("Cómo se calcula tu pensión", "Qué es una acusación
constitucional", "Por qué Chile tiene 16 regiones"), Shorts de 1 dato con
mapa. Se apaga toda la cadena diaria. Arranque lento (la búsqueda tarda 3 a 6
meses en indexar y premiar), pero acumula. 90 días: +30 / +100 / +300 subs;
10 mil / 30 mil / 80 mil vistas; 150 / 800 / 2.500 h. Se pisa con Línea
Punteada (geografía) y En Números Rojos (economía): hay que cuidar no
canibalizar.

**C2, cerrar la producción de video y mover el esfuerzo.** Los números de la
casa: Línea Punteada sumó 31 suscriptores y 9.858 vistas en sus primeros 4
días (05 al 08-11-2026); Entender Chile suma 0,63 subs por día tras 75 días.
Por sesión de Claude, cualquier canal hermano rinde hoy un orden de magnitud
más. Cerrar = dejar de subir video, mantener el canal publicado (sus 226
videos siguen sumando poco), conservar el diario escrito en la web si tiene
lectores, apagar las ~14 rutinas y los crons de la cadena, y pasar ese cupo a
los largos de Línea Punteada y En Números Rojos, que van detrás de las mismas
horas. 90 días en Entender Chile: +15 subs residuales. Riesgo cero de
monetización (no se publica nada). Costo: se pierde la marca y el banco de
temas de actualidad (que podría alimentar a En Números Rojos).

## 5. Recomendación y piloto

**Elijo A**, con la compuerta de C2 a los 14 días. Por qué:

- Es la única que ataca la causa medida (paquete visual nulo) con piezas que ya
  existen y que Santiago ya aprobó en otros canales, y la que ocupa el hueco que
  dejaron los referentes (explicador visual de Chile sin rostro).
- Baja el gasto de cupo de 50 a 70 sesiones Opus por semana a 4 a 6, así que
  aunque falle, falla barato. La cadena actual cuesta más que A y produce
  menos.
- B se queda como experimento dentro de A: 1 de los 7 Shorts de la semana puede
  ser un dilema con votación, sin convertir el canal en eso.
- C2 es la respuesta correcta si A no mueve los números en 14 días: no tiene
  sentido seguir hasta el 31-01-2027 con un formato que ya falló dos veces.

### 5.1 Piloto (semana del 19 al 25-11-2026)

El largo de Codelco del 18-11-2026 sale con el formato viejo y **no** cuenta
para esta evaluación (instrucción del encargo). Temas verificados en el
informe del repo con sus fuentes y contrastados con búsqueda web el
12-11-2026; los marcados "confirmar" deben revisarse el día del guion.

**Largo piloto, miércoles 25-11-2026 19:00, 11 min:**
"Chile entró en recesión técnica: qué significa para tu bolsillo (y qué no)".
- Hecho: el ministro de Hacienda, Jorge Quiroz, reconoció la recesión técnica
  el 12-11-2026 (La Tercera, EL PAÍS, Bloomberg Línea, Cooperativa, según
  `contenido/informes/2026-11-12.md`; **confirmar**: en agosto Quiroz la negaba
  con la serie desestacionalizada, Emol 18-08-2026, así que el giro es la
  noticia). Encuesta de Expectativas del Banco Central: crecimiento 2026 de
  2,5 % en enero a 0,7 % en septiembre, 0,2 % en octubre y 0,0 % el
  10-11-2026 (Banco Central, Diario Financiero).
- Capítulos: (1) qué es y qué no es una recesión técnica, con la serie
  trimestral del PIB animada; (2) por qué pasó: cobre y minería (Quiroz atribuyó
  cerca de un punto al cobre, Emol 16-09-2026), mapa de las regiones mineras;
  (3) cómo llega a tu casa: desempleo, dólar (mayor alza diaria en cinco meses
  el 10-11-2026, La Tercera), diésel; (4) qué mirar: cuentas nacionales del
  Banco Central y la tasa de diciembre (mercado espera 4,5 %).
- Carátula: gráfico de dos barras rojas + caja "RECESIÓN TÉCNICA" + "¿Y AHORA?".

**5 Shorts piloto (uno por día, 12:00, 45 a 60 s, mapa o gráfico en movimiento):**
1. Jue 19-11: "6 semanas de alzas: por qué los camioneros cortaron las rutas"
   (gráfico del precio del diésel semana a semana + mapa de los cortes del
   norte al centro-sur; El Dínamo 10-11-2026, The Clinic y Emol 09-11-2026).
2. Vie 20-11: "Chile pagó casi 17 veces el avalúo por un terreno en Lago
   Ranco" (satélite de la comuna + barra 1 contra 17; Contraloría vía
   BioBioChile 12-11-2026).
3. Sáb 21-11: "El mercado esperaba 2,5 % en enero. Hoy espera 0 %" (línea que
   cae mes a mes; Banco Central, Encuesta de Expectativas 10-11-2026). Recorte
   nativo que anuncia el largo.
4. Dom 22-11: "La Cámara rechazó Educación e Interior del Presupuesto: ¿se
   quedan sin plata?" (gráfico de partidas; explicar que la partida sigue en el
   Senado; Cámara, La Tercera, BioBioChile 10 y 12-11-2026).
5. Lun 23-11: dilema de la Estrategia B, "¿Congelarías la bencina hasta
   febrero?" con panel de votación (anuncio del Gobierno del 12-11-2026 según
   el informe del repo; **confirmar** el instrumento jurídico, que no estaba
   publicado ese día y que la búsqueda web no encontró).

**Criterios de éxito (medidos con `bitacora/metricas/`)**

| Métrica | Línea base | A los 7 días (26-11) | A los 14 días (03-12) |
|---|---|---|---|
| Mediana de vistas de los 5 Shorts piloto (a 72 h de cada uno) | 48 | ≥ 150 | ≥ 300 (7 Shorts) |
| Shorts piloto sobre 1.000 vistas | 3 de 148 | ≥ 1 | ≥ 2 |
| % visto mediano de los Shorts | 69,5 % | ≥ 70 % | ≥ 75 % |
| CTR de la carátula del largo | 0,56 % | ≥ 3 % (a 72 h) | ≥ 4 % |
| Retención del largo a 30 s | ~48 % (p10 del piloto) | ≥ 60 % | ≥ 60 % |
| Vistas del largo | 45 | ≥ 300 (a 7 días) | ≥ 800 |
| Suscriptores por día (7 días móviles) | 0,63 | ≥ 1,5 | ≥ 3 |

Regla de decisión el 03-12-2026: **4 o más de 7 criterios a 14 días cumplidos
= se sigue con A y se duplica lo que pegó; 2 o 3 = una semana más con el ajuste
que diga el dato; 0 o 1 = se ejecuta C2** y se le informa a Santiago con estos
números.

## 6. Simplificación del pipeline (solo diagnóstico)

### 6.1 La cadena actual (`bitacora/rutinas.md`, `.github/workflows/`, `prompts/README.md`)

Pasos del día para producir 1 Short:

1. Reloj del barrido (rutina Haiku 01:30) + crons de red 01:50 y 02:20 (`barrido.yml`).
2. Barrido de 22 medios.
3. `estado.yml` escribe el estado y despierta a la validadora; emite al PR #6.
4. Preselección (Claude, rutina validadora en modo suplente).
5. Validación de la preselección (Claude Opus).
6. Informe completo (GPT, despachador del PR #6).
7. Validación del informe (Claude Opus).
8. Guion del informe (GPT).
9. Validación del guion y revisión final (Claude Opus) que abre la compuerta.
10. `edicion-diaria.yml`: voz Azure, render del Short (el informe en video está apagado por marcador), subida programada, podcast.
11. `web.yml` publica el diario.
12. Seguimiento de temas (Claude Opus) y propuestas a la Bandeja.
13. Reintentos: rutinas Haiku A, B y C (15 disparos entre 01:10 y 05:50) + `reintento.yml` con cron `*/20` de 04 a 09 UTC y `*/30` el resto del día (unas 54 corridas diarias) + plan B a los 40 min.
14. Vigilancia: vigía (02:15 y 05:15), red del validador (04:45), auditoría matinal (05:30), mejora diaria (07:30), además de la revisión de la sesión principal.
15. Métricas: rutina Haiku 05:00 + crons 06:30 y 08:00 (`metricas.yml`).
16. Observatorio de plata pública (Opus 01:45), tema de la semana (Opus, domingos), doc de YouTube (mensual).
17. Largo "Entender el caso": elección, pauta, investigación (GPT), entrega (GPT), guion (GPT), paneles del mural (GPT, en tandas de 10), validaciones (Claude), `estado-clave.yml` con cron cada 4 h.

### 6.2 Qué sostiene calidad real y qué es peso muerto

| Pieza | Juicio | Por qué |
|---|---|---|
| Barrido | **Sostiene** | banco de temas fechado y con fuentes; es lo más valioso del repo |
| Informe escrito + web | **Depende de lectores** | no hay dato de visitas en el repo; si la web tiene menos de 50 visitas diarias, es costo sin retorno |
| Verificación de cifras y fuentes | **Sostiene**, pero puede ser mecánica | `verificar-cifras.mts` hace la mitad del trabajo del validador sin gastar Opus |
| Validación pieza por pieza con Opus (3 a 4 veces al día) | **Peso caro** | valida un informe de 15 noticias para usar 1 o 5 tesis en un Short de 40 s |
| Guion del informe (GPT) | **Muerto para el video** | existe solo para que `short.js` saque tesis; el podcast puede leer el escrito |
| Reintentos A, B, C + `reintento.yml` + plan B | **Peso muerto en A** | existen por la cadena de GPT en tiempo real; con guiones semanales escritos de antemano no hacen falta |
| Vigía + red del validador + auditoría matinal + mejora diaria + sesión principal | **Duplicado** | cinco revisores sobre la misma madrugada; basta una revisión diaria y una semanal |
| Mural de paneles de la Clave (GPT en tandas) | **Peso muerto** | el largo nuevo usa mapas, gráficos y fotos de Commons |
| Observatorio de plata pública (Opus diario) | **Mantener solo si alimenta temas** | sirve como banco de temas; puede bajar a semanal |
| Métricas | **Sostiene** | indispensable; sobran sus tres relojes |
| Guardia, exprés, lector, prueba de voz | ya apagados | archivarlos según `despegue` §4 |

### 6.3 Duplicidades de horario detectadas

- **Reintento**: tres rutinas Haiku (`10`, `30` y `50 4-8 * * *` UTC) pushean el
  despertador de `reintento.yml`, que además tiene su propio cron `*/20 4-9`
  en la misma ventana: hasta 2 disparos cada 20 min sobre el mismo workflow
  entre las 01:00 y las 06:00 de Chile.
- **Barrido**: rutina 01:30 + crons 01:50 y 02:20 + relanzado por `reintento.yml`
  desde las 01:48 si falta la marca: cuatro caminos al mismo paso.
- **Validadora**: despertada por `estado.yml`, por `estado-clave.yml`, reloj de
  red 02:20 y red de las 04:45.
- **Métricas**: rutina 05:00 + crons 06:30 y 08:00 de Chile.
- **Revisión de la madrugada**: vigía 02:15 y 05:15, auditoría 05:30, mejora
  07:30, sesión principal: cinco lecturas del mismo estado.
- `estado-clave.yml` corre cada 4 h los 7 días aunque haya 1 largo por semana.
- `edicion-diaria.yml` conserva la hora del informe (06:30) para una pieza
  apagada.

### 6.4 Flujo de 3 pasos para la Estrategia A

1. **Plan y guiones semanales** (miércoles en la noche, hito del miércoles; 1
   sesión Opus + 1 de revisión independiente): lee el barrido y
   `contenido/temas/` de la semana, elige 1 largo + 7 Shorts, escribe los
   guiones JSON con fuentes, corre los validadores mecánicos (cifras, ritmo,
   cámara) y commitea en `contenido/semana/AAAA-Www/`.
2. **Render y subida** (Actions, un workflow `producir.yml` como el de Línea
   Punteada y En Números Rojos): un push de guiones dispara el render y la
   subida programada; la carátula del largo se pide a GPT en el mismo paso.
3. **Métricas y revisión** (`metricas.yml` con un solo reloj + una revisión
   diaria corta que compara contra los criterios de la sección 5.1 y una
   semanal que decide qué se duplica).

Se queda corriendo, aparte y sin tocar el video: el barrido (un reloj, un cron
de red) y, si tiene lectores, el informe escrito para la web. Se apagan:
reintentos A, B y C, `reintento.yml`, el guion del informe, la validación
pieza por pieza, el mural y `estado-clave.yml` cada 4 h, el vigía y la red del
validador. Ahorro estimado: de 50 a 70 sesiones Opus y ~120 rutinas Haiku por
semana a 4 a 6 sesiones Opus.

## 7. Lo que se necesita de Santiago (sin gasto)

1. Decir sí o no a esta propuesta (o vetarla: por el mandato del 04-11-2026,
   Claude podría ejecutarla, pero apaga rutinas y cambia el producto entero).
2. Permitir `www.youtube.com` en la red de la rutina de mejora (lleva 7 días
   sin referentes).
3. Fusionar o cerrar los PR 7 y 8.
4. Si se elige B: token de la API con scope de comentarios para la cuenta de
   Google donde vive @entenderchile.
