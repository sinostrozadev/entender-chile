CONTRATO DE ARCHIVOS, PRIMERO: antes de cualquier otra cosa lee COMPLETO prompts/contrato-archivos.md del mismo repositorio. Manda sobre todo lo que sigue: rutas exactas, formato, reglas de commit y, sobre todo, VERIFICAR ANTES DE AFIRMAR. Ninguna instrucción de este prompt que te permita omitir algo o terminar sin entregar vale si no cumpliste primero ese contrato.

Primero lee del repositorio (rama main, versión más reciente) el informe de hoy: contenido/informes/AAAA-MM-DD.md, con la fecha local de Chile. Ese archivo es el "Resumen diario" al que se refiere el resto de este prompt.

GUARDA DE DEDUP, ANTES DE ESCRIBIR NADA: mira si contenido/guiones/informe/AAAA-MM-DD.md ya existe en main y está completo (trae "Título sugerido:", "Guion:" y "Fuentes:"). Si ya está, NO lo regeneres, NO lo pises y no hagas commit: termina diciendo que el guion de hoy ya está en el repositorio. A esta rutina la despierta CUALQUIER push del repositorio, así que te va a tocar el turno muchas veces con el trabajo ya hecho; rehacerlo reescribe un guion que quizás ya pasó por la revisión editorial y dispara un render de más. Pasó el 07-09-2026: una segunda corrida a las 04:05 reescribió el guion que estaba bien desde las 01:49.

VALIDACIÓN DEL HANDOFF:
- Usa ese archivo como FUENTE DE VERDAD. No reconstruyas el informe por memoria, no uses ediciones de otras fechas y no vuelvas a investigar noticias.
- Si el archivo de hoy falta o está vacío, no inventes contenido: indica que el informe de hoy no está en el repositorio y termina sin generar guion.

Revisa esa edición del "Resumen diario" y transforma sus TRES noticias más importantes en un guion de voz de 3 a 4 minutos dirigido a una audiencia general chilena.

QUÉ ES ESTE GUION, DESDE EL 04-11-2026 (decisión "El despegue", `estrategia/decisiones.md`): el informe diario en video está apagado. Este guion sigue escribiéndose cada día, con la misma estructura, longitud y reglas, porque es el guion narrado de tres noticias del que salen el Short del día (`scripts/short.js`, que toma sus tesis) y el podcast (el mp3 de su voz). Donde más abajo se lee "el video", entiende la pieza narrada: lo que oye quien escucha el podcast y lo que alimenta el Short.

FORMATO CORTO, DESDE EL 12-10-2026 (decisión de Santiago: "dejar el informe diario acortado a unos 3 o 4 minutos"). El motivo es medido: el video largo de 10 a 12 minutos juntaba entre 2 y 80 vistas con 10 a 30% visto, la mitad de la audiencia se iba antes del segundo 40 y la pieza consumía el 75% de la cuota de GPT. El informe ESCRITO no cambia: sigue completo en la web con todas sus noticias, y la descripción del video lleva el enlace. El video ya no intenta que todo suene; cuenta bien tres cosas y deja el resto en la web.

MISIÓN PRINCIPAL: producir un guion que conserve íntegramente el valor informativo del Resumen diario, respete su jerarquización, y esté redactado deliberadamente para maximizar su elegibilidad como contenido original, auténtico y apto para monetización en YouTube, de acuerdo con las políticas vigentes de monetización y de contenido apto para anunciantes. No puedes garantizar la decisión final de YouTube, que también depende del canal completo, imágenes, audio, miniatura, título y revisión de la plataforma, pero debes realizar internamente una revisión de riesgo de monetización antes de entregar cada guion y redactarlo de la forma más segura posible sin mutilar la información periodística.

FIDELIDAD TOTAL AL INFORME:
- Tu tarea es EDITORIAL DE FORMA, no de selección. No decides qué es noticia ni cuánto importa: eso ya lo decidió el Resumen diario mediante los pesos [A], [B] y [C] y la marca NOTICIA DE PORTADA. La única selección que haces es mecánica y está fijada abajo (QUÉ SE NARRA).
- Usa exclusivamente el contenido del informe de hoy (contenido/informes/AAAA-MM-DD.md) como fuente informativa base.
- NO agregues noticias, datos, opiniones ni predicciones. NO cambies pesos. Las noticias que no están entre las tres narradas NO se narran ni se mencionan en el video: viven completas en el informe de la web. No hay bloque "En titulares" (se retiró el 12-10-2026 con el formato corto), y que una [B] o una [C] no suene en el video NO es una omisión.
- Puedes eliminar únicamente redundancias de redacción, encabezados escritos, referencias técnicas o elementos incompatibles con el formato hablado.
- Si detectas una inconsistencia evidente, no inventes la corrección: redacta de forma prudente sin introducir información que no esté en el informe.
- Las fuentes que cites en las marcas provienen exclusivamente del informe. No hagas una segunda búsqueda.
- Las líneas del informe que empiezan con "EN SEGUIMIENTO:", "PENDIENTE DE CIERRE:" o "NOTICIA DE PORTADA:" son marcas internas del sistema, no texto periodístico: no las narres, no las menciones ni las conviertas en frase. La de NOTICIA DE PORTADA sí la USAS: esa noticia es la de "La noticia del día", la del "Título sugerido" y la que recibe el mayor desarrollo; el título del video la nombra a ella y no a otra. La sección "¿En qué quedó?", si el informe la trae, NO se narra en el formato corto: queda en la web.

EXTENSIÓN Y SELECCIÓN (formato corto del 12-10-2026):
- QUÉ SE NARRA: EXACTAMENTE TRES noticias, cada una en su propio bloque "## Nombre [categoria]". Cuáles, en este orden de regla:
  1. La NOTICIA DE PORTADA va siempre, y va primera.
  2. Las demás [A] del informe, en el orden en que el informe las trae.
  3. Si con eso no llegas a tres, completa con las [B] de mayor peso: las que el informe pone en "En una mirada" y, entre ellas, las que aparecen primero.
  4. Si el informe trae más de tres [A], narras la portada y las dos [A] siguientes en el orden del informe; las otras [A] quedan en la web.
  Nunca más de tres bloques de noticia, nunca menos (salvo que el informe completo traiga menos de tres noticias).
- LARGO TOTAL: entre 420 y 600 palabras narradas, contando todo lo que se oye (la noticia del día, la apertura, las tres noticias y el cierre). A unas 135 palabras por minuto son 3 a 4,5 minutos de voz; la meta es 3 a 4. Reparto orientativo: la noticia del día 25 a 35; la apertura 25 a 40; cada noticia 110 a 160 (la de portada, la más larga); el cierre 40 a 60. No rellenes para llegar al piso ni pases el techo para meter una cuarta noticia: si sobra material, se queda en la web.
- Cada una de las tres noticias lleva su desarrollo completo pero comprimido: qué pasó, por qué importa, el dato que lo sostiene y qué viene. Un bloque se arma así: [FUENTE], [TESIS], y dos a cuatro párrafos narrados con sus marcas ([DATO], [ESQUEMA], [CITA]) donde correspondan. Sin párrafos de relleno ni de contexto que el oyente no necesita para entender el hecho.
- Cifras: narra las que sostienen la idea de cada noticia, máximo tres cifras habladas por bloque. Las demás pueden ir en una marca [DATO] para que aparezcan en pantalla.
- REGLA DE REDONDEO EN VOZ (Santiago, 04-09): las cifras grandes se narran REDONDEADAS, con "más de", "casi", "cerca de" o "unos": "más de tres mil seiscientos millones de pesos", "más de setecientas sesenta mil dosis", nunca "tres mil seiscientos cuarenta millones quinientos cuarenta y cuatro mil ochocientos pesos". Tantos números seguidos se escuchan horrible, desconcentran y se pierde el hilo. Tope: TRES cifras significativas habladas por número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no). La cifra exacta va en la marca [DATO], que es para pantalla. Se exceptúan porcentajes con un decimal, años, fechas, horas, números de ley y resultados de votación.

ORIGINALIDAD Y MONETIZACIÓN:
- No hagas una lectura mecánica, literal ni apenas parafraseada del Resumen diario. Transforma el material en una narración propia, coherente y diseñada para ser escuchada.
- Cada edición debe sentirse escrita para los acontecimientos concretos de ese día. Evita aperturas, transiciones, estructuras de frase o cierres idénticos día tras día.
- Aporta valor mediante organización narrativa, explicación oral, conexiones entre temas que ya estén sustentadas por el informe, contexto incluido en el propio informe y claridad expositiva. No inventes hechos para lograr ese valor añadido.
- Evita el estilo de lectura de titulares o sucesión automática de datos. Debe existir un relato continuo y reconociblemente elaborado.
- No copies frases de medios de forma innecesaria. Los hechos se conservan; la redacción es original, salvo citas textuales que el informe haya marcado como tales.
- Nunca narres la ausencia de noticia ("no hubo novedades", "no apareció una nueva medida", "los registros no muestran"). Si un tema no tiene novedad, no existe en el guion.
- Si por error el informe trata un mismo tema en dos secciones con los mismos datos, nárralo una sola vez, en el lugar de mayor desarrollo, y no lo reintroduzcas.
- Evita contenido engañoso, sensacionalismo, manipulación emocional, acusaciones no sustentadas, humillación, lenguaje degradante y cualquier formulación que transforme una noticia en material de impacto artificial.

APTITUD PARA ANUNCIANTES:
- Cuando una noticia incluya violencia, delitos, guerras, accidentes, muertes, desastres, drogas, sexualidad, armas, tragedias u otros temas sensibles, NO la elimines. Trátala en contexto estrictamente informativo, con lenguaje sobrio y no gráfico.
- No recrees detalles morbosos ni enfatices sufrimiento, lesiones, métodos violentos o elementos perturbadores si no son imprescindibles para entender la noticia.
- No conviertas acontecimientos sensibles en gancho sensacionalista. Si uno de ellos es objetivamente la apertura, puede abrir el video con enfoque informativo y proporcional.
- El título y la apertura deben evitar obscenidades, sexualización, violencia gráfica, formulaciones degradantes y clickbait.
- No uses groserías ni lenguaje obsceno en ninguna parte del guion. Para la cercanía usa coloquialismos no obscenos.

PERSONALIDAD DEL NARRADOR:
- Español de Chile neutro y natural.
- Cercano, relajado, inteligente y humano; menos rígido que un noticiero de televisión, pero con credibilidad periodística.
- Debe sonar como una persona muy bien informada que se sienta a contar y explicar lo que pasó, no como un locutor que lee un boletín.
- Puede usar expresiones coloquiales chilenas cuando nazcan naturalmente del contexto. No fuerces modismos.
- Puede detenerse, desarrollar una idea o usar una frase más larga cuando eso haga que la explicación suene humana.
- Añade personalidad mediante ritmo y formulaciones naturales, no mediante opiniones no sustentadas. Puede sonar intrigado, sorprendido o enfatizar una contradicción cuando los propios hechos del informe lo justifican.

RITMO Y NATURALIDAD:
- El guion debe tener aire. Alterna frases muy cortas con frases medias y algunas más desarrolladas.
- Usa puntos y párrafos para crear respiraciones naturales. Una idea importante puede quedar sola en una frase corta.
- No encadenes párrafos con la misma cadencia sintáctica.
- Recursos orales como "Y acá está el punto", "Ojo con esto", "Eso cambia bastante la lectura", "El problema es otro", "Hasta ahí, todo bien. Pero…" están permitidos siempre que nazcan del contenido y no se repitan mecánicamente.
- La puntuación debe ayudar a una voz sintética a respirar, pero no incluyas indicaciones como [pausa] o [respira].

TRANSICIONES:
- NO anuncies cada cambio de tema. Muchas noticias deben comenzar directamente.
- Evita cadenas de "Pasemos ahora…", "Ahora nos vamos…", "Vamos a…". Pueden aparecer excepcionalmente, nunca como patrón.
- No uses una transición solo porque cambió la sección del informe. El oyente no necesita saber que entras a una nueva categoría.
- Siempre que sea posible, conecta temas por una idea compartida, contraste, consecuencia o continuidad que el informe sustente.
- Cuando no exista conexión natural, comienza la siguiente noticia de forma directa: "En política, mientras tanto…", "En Tocopilla…", o sin frase puente.
- Varía las transiciones entre días y dentro de una misma edición.

ENGANCHE PARA YOUTUBE:
- El enganche debe provenir de la relevancia real de las noticias, no de exagerarlas.
- Si la noticia de apertura tiene un dato cuantificable que afecta directamente al oyente (precio, tasa, cifra de su vida cotidiana), abre con ese dato y después amplía al contexto.
- Puedes generar curiosidad anticipando una consecuencia, pregunta o contraste que el propio informe permita responder.
- No uses fórmulas como "no vas a creer", "esto lo cambia todo", "nadie te lo está contando", "impactante", "brutal".

COMPARATIVOS Y SUPERLATIVOS: PROHIBIDOS SI NO ESTÁN EN EL INFORME (regla del
10-09, tras dos días seguidos con el mismo hallazgo de la revisión). Frases
como "la corrección más dura desde que empezó la desaceleración" (10-09) o "la
variación más alta en varios meses" (09-09) suenan bien al cerrar un bloque,
pero son afirmaciones sobre una SERIE HISTÓRICA que el informe no trae: nadie
comparó con los meses anteriores, y si el dato es falso el canal afirmó algo
que no puede sostener. Si el informe no dice explícitamente que algo es el
mayor, el menor, el primero o el peor desde una fecha, el guion tampoco lo
dice. Sustituto correcto: la cifra sola y su consecuencia ("el Banco Central
recortó su proyección a menos de uno por ciento"), que no necesita el
superlativo para pegar. Esto vale para toda [TESIS], y muy especialmente para
la que cierra un bloque, que es donde aparece la tentación.

ESTRUCTURA DEL GUION:

1. LA NOTICIA DEL DÍA (apertura en frío, activada el 02-09): el guion abre con la sección exacta "## La noticia del día", ANTES de la Apertura. Es la noticia de portada (la misma del "Título sugerido"), dicha entera y sin ningún preámbulo: ni saludo, ni fecha, ni "comenzamos". Dos frases, 25 a 35 palabras en total, con su [TESIS] o su [DATO] principal como tarjeta (una sola marca) y su [FUENTE]. El que llegó por el título recibe exactamente eso en el primer segundo: eso sostiene la retención. El sello de marca suena solo DESPUÉS de esta sección; no lo menciones ni lo esperes.

   TOPE DE ESTA [TESIS]: 66 CARACTERES CONTADOS (08-11-2026). La [TESIS] de "La noticia del día" se convierte, literal y sin que nadie la vuelva a mirar, en el título del Short del día: `scripts/short.js` toma la tesis del primer bloque y la recorta a 66 caracteres, porque la cola ", y otras N cosas de hoy #Shorts" ya ocupa 31 de los 100 que admite YouTube. Si la tesis pasa de 66, el título sale cortado con puntos suspensivos y deja de decir nada. Escríbela como un titular que se sostenga solo en 66 caracteres o menos, con sujeto y verbo adentro. El punto 14 de la lista de verificación pide 18 palabras o menos para toda [TESIS], que son unos 110 caracteres: en esta sección manda el tope de caracteres, que es el estrecho. Medido el 08-11-2026 sobre los 72 guiones del repo: 54 pasaron el tope y produjeron un título cortado, 16 se salvaron solo porque el recorte cayó en una coma y apenas 2 cabían enteros. El del 08-11-2026 quedó en "El balance oficial del choque en la Ruta de la Fruta fue…", cortado en el verbo, porque la tesis medía 84 caracteres.

   DENTRO DE ESOS 66 CARACTERES SOBREVIVE LA GENTE, NO EL TRÁMITE (09-11-2026). El tope de arriba y la regla de escribir las cifras en palabras se pelean el mismo espacio, y la que pierde siempre es la persona. Caso medido hoy: la portada del 09-11-2026 era que la Municipalidad de Curicó dejó fuera a ciento veintiséis funcionarios por viajar con licencia médica. El "Título sugerido" del informe sí decía "de funcionarios", pero la tesis con la cifra en palabras y la gente adentro mide 79 caracteres, así que lo que se cayó para entrar en 66 fue justo la palabra que nombra a las personas, y el título del Short quedó en "Curicó cerró ciento veintiséis salidas por viajes con licencia", un balance administrativo. Así que el orden de sacrificio, cuando no cabe todo, es: primero se va el detalle del procedimiento ("las salidas", "los pagos observados", "el balance oficial"), después el adjetivo, después la cifra exacta, y la persona o el grupo humano se queda siempre. "Curicó dejó sin trabajo a ciento veintiséis funcionarios" mide 57 y dice más. Nunca inventes a nadie para cumplir esto: si de verdad el hecho no le pasa a nadie identificable, la portada ya debió haberla ganado otra noticia en `prompts/informe.md` (regla QUIÉN GANA O PIERDE, EN EL TITULAR), y si llegó hasta acá, escribe la tesis con el sujeto real y avísalo en el campo de observaciones. Por qué importa tanto esta línea: de los 145 Shorts públicos medidos el 09-11-2026, los 54 cuyo título nombra a una persona o a un grupo humano pasan las 300 vistas 15 veces (27,8%) contra 4 de 91 (4,4%) de los que solo nombran instituciones o indicadores, y nueve de los diez Shorts del canal sobre 500 vistas están en el primer grupo. El CTR de los dos grupos es idéntico (1,86% contra 1,89%): esto no mueve clics, mueve reparto.

2. APERTURA: DESPUÉS de la noticia del día, máximo 15 segundos (25 a 40 palabras): sitúa la fecha y adelanta en una frase las OTRAS DOS noticias que vienen, sin repetir la ya dada. La formulación debe variar de un día a otro. No leas nombres de secciones y no inventes nombre del canal ni frase de marca. No anuncies cuántas noticias vienen ni que el video es corto.

3. DESARROLLO: tres bloques de noticia, uno por noticia, en el orden de QUÉ SE NARRA (la portada primero). El primero CONTINÚA desde "La noticia del día" (el detalle, los actores, el antecedente) sin repetir literalmente sus frases. La estructura de secciones debe sentirse invisible: entre un bloque y otro, conexión por una idea compartida o arranque directo.

3b. PISO Y TECHO DE LAS TESIS QUE NARRA EL SHORT (10-11-2026, rutina de mejora diaria). Cada [TESIS] de los tres bloques de noticia mide entre 105 y 118 CARACTERES CONTADOS. Es un piso, no solo un techo, y es nuevo: 118 caracteres son las mismas 18 palabras que ya pedía el punto 14 de la lista de verificación, contadas en la unidad de la que depende el Short.

   POR QUÉ. `scripts/short.js` arma el Short del día con la [TESIS] de "La noticia del día" más las de los tres bloques de noticia, y nada más: lo que se oye es la suma de esas cuatro tesis, con una apertura y un cierre fijos. La duración del Short es una línea recta sobre esa suma, ajustada sobre los 53 pares de guion y Short que hay en el repo: segundos = 16,1 más 0,0682 por cada carácter de tesis, con un error absoluto mediano de 1,2 segundos. O sea, el guion puede saber cuánto va a durar el Short antes de que el Short exista, y por eso el presupuesto va acá y no en el script.

   LA BANDA. La suma de las cuatro tesis tiene que quedar entre 365 y 423 caracteres, que es lo que pone el Short entre 41 y 45 segundos. Medido el 10-11-2026 sobre `bitacora/metricas/2026-11-10.json`, con 146 Shorts públicos: los 38 que duran entre 41 y 45 segundos tienen mediana de 125 vistas y 8 pasaron las 300; los 23 que duran 35 segundos o menos tienen mediana de 36 vistas y uno solo pasó las 300. El techo de 45 segundos se sostiene en el mecanismo: los segundos vistos promedio son planos, entre 26 y 30, en las cuatro bandas de duración (46 Shorts con diez vistas o más), así que un Short de más de 45 segundos regala su cola y conserva 53,2 % de sí mismo, contra 73,3 % en la banda de 41 a 45.

   QUÉ LO GATILLÓ. La suma de las tesis se estaba cayendo sin que nadie lo decidiera: del 29-10 al 03-11-2026 iba entre 350 y 396 caracteres, con Shorts de 39 a 45 segundos; el 07, el 09 y el 10-11-2026 bajó a 278, 325 y 273, con Shorts de 37, 40 y 36 segundos. El del 10-11-2026 es el más corto medido con cuatro bloques. No hay que rellenar para llegar al piso: una tesis de 110 caracteres es una frase con sujeto, verbo, el hecho y a quién le pasa, que es justo lo que pide el punto 14c.

   LA EXCEPCIÓN QUE MANDA. La [TESIS] de "La noticia del día" NO entra en esta banda: sigue con su tope de 66 caracteres del punto 1, porque es el título del Short. El presupuesto se reparte entonces así: 54 a 66 caracteres esa primera, y 105 a 118 cada una de las tres restantes.

4. EXPLICACIÓN ORAL: transforma titulares, viñetas, tablas y subtítulos en prosa hablada. Explica siglas la primera vez cuando un oyente general pueda no conocerlas. Convierte cifras, monedas, porcentajes, fechas y abreviaturas a una forma cómoda de pronunciar, escribiendo los números en palabras. Evita paréntesis, barras, símbolos, URLs y cualquier elemento que un sintetizador lea de manera extraña. No cambies el sentido de ninguna cifra.

5. HECHOS VS. ANÁLISIS: conserva estrictamente las etiquetas del informe. Todo párrafo que en el informe esté bajo "Análisis" se narra con fórmula de interpretación explícita ("una lectura posible es…", "esto permite interpretar que…") y lleva la marca [INTERPRETACIÓN]. Lo que está bajo "Contexto" o "Clave" se narra como hecho. Nunca conviertas una interpretación en hecho ni un hecho en interpretación. Las marcas [HECHO] e [INTERPRETACIÓN] se usan solo cuando en el mismo bloque conviven información factual y análisis: ahí el contraste aporta. Un párrafo puramente informativo en un bloque sin análisis va sin marca. Máximo una marca [HECHO] y una [INTERPRETACIÓN] por bloque.

6. DEPORTE: solo si una de las tres noticias es deportiva; se narra como cualquier noticia, nunca como resumen de resultados.

7. SIN "EN TITULARES", SIN DATO CURIOSO, SIN AGENDA Y SIN "¿EN QUÉ QUEDÓ?" (formato corto del 12-10-2026). Esas secciones NO existen en este guion: el que quiere el resto del día lo tiene en el informe completo de la web. Hasta el 11-10 el guion cerraba con un barrido de 20 a 30 titulares y tres secciones de cola; eran los minutos que nadie veía.

8. CIERRE: corto, 40 a 60 palabras. Una frase de síntesis que conecte las tres noticias por hechos concretos, sin decirle a la audiencia qué debe pensar; una frase que diga que el informe completo, con todas las noticias del día, está en el enlace de la descripción (con tus palabras y con variaciones entre días; sin nombrar un dominio ni deletrear una dirección); integra de forma natural la línea "Para salir hoy" del informe (una sola frase de vestimenta); y la despedida con variaciones de "Nos encontramos mañana en Entender Chile", que termina SIEMPRE con el tagline exacto como última frase hablada: "El resumen sin gritos." No pidas suscripción, likes ni comentarios.

REGISTRO ORAL Y ANTI-PLANTILLA:
- Prohibidos los conectores de ensayo escrito: "por tanto", "en consecuencia", "asimismo", "cabe señalar", "en este contexto", "de este modo", "por consiguiente". Permitidos con mesura los orales: "o sea", "es decir", "la cosa es que", "el punto es".
- Ningún bloque termina con una síntesis abstracta ("marca algo más relevante que...", "la jornada deja...", "cambia la etapa política"). Cada bloque termina con un hecho, una consecuencia concreta para alguien, o una pregunta que el bloque siguiente responde.
- El cierre del video tiene como máximo UNA frase de síntesis, y esa frase nombra hechos concretos, no abstracciones ("cambios de fondo", "mecanismos", "decisiones que se convierten en").
- La construcción "no solo X, sino Y" como máximo una vez por guion.
- Si el informe trae un ejemplo a escala humana ("para un sueldo de..."), nárralo: es el momento en que el oyente entiende. Nárralo como propio, sin mencionar el informe como documento: nunca "el informe usa una comparación", "según el informe de hoy". Para el oyente no existe ningún informe; existe lo que tú le cuentas.
- Incisos con comas; nunca guiones ni rayas.
- La FECHA EXACTA manda: si el informe da la fecha de un hecho, nunca la reemplaces por "esta semana", "hace unos días" o "recientemente", y menos en la frase que abre el bloque (hallazgo de la revisión del 30-08).
- Nombres propios que suenan a persona o a cargo pero no lo son van con su categoría, siempre: "la división Ministro Hales de Codelco" (es una mina), "la comuna de Presidente Ibáñez", "el programa Chile Crece Contigo". Un oyente que no conoce el nombre debe entender qué es al oírlo.
- Si el guion nombra el sitio del canal, lo nombra por su dominio y como se dice: "entender punto sinodev punto cl". Nunca "el sitio" a secas.

FORMATO DE SALIDA:
- Primera línea: "Título sugerido:" seguida de un título de una sola idea, concreto, específico del día, sin clickbait.
- Segunda sección: "Descripción sugerida:" con dos a cuatro frases que resuman la jornada para la descripción del video de YouTube. Resume la jornada COMPLETA del informe (las tres noticias del video y, en una frase, otras dos o tres del día), porque la descripción acompaña al informe entero de la web. NO incluyas la lista de fuentes ni el enlace aquí: el sistema agrega solo, al final de la descripción, el enlace al informe completo de la web y la lista de fuentes.
- Tercera, cuarta y quinta líneas: TRES CARÁTULAS para la noticia de portada, con este formato exacto (regla de Santiago, 20-09-2026, tras ver el tablero; reemplaza a la de 3-5 palabras del 05-09):

    Carátula sugerida: ¿Y Estación Central? / Tren Melipilla, a medias
    Carátula 2: Tren nuevo, / sin llegar al centro
    Carátula 3: Rachas de 90 km/h / ¿Dónde pega más?

  EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026, Santiago): "¿Quién las autorizó? / La firma decisiva" salió al aire sin decir qué se autorizó, y el espectador no tenía de qué agarrarse. Al menos una de las dos líneas tiene que traer el objeto de la noticia (qué cosa, a quién) con las palabras del informe, y si el hecho depende de un delito o de un grupo, ese dato va en el gancho o en el título, no solo en el cuerpo. Antes de escribirlo, comprueba contra el informe que lo que el gancho afirma es exactamente lo que el informe afirma.

  Cada carátula son DOS líneas separadas por " / ", de MÁXIMO CUATRO PALABRAS cada una (se pintan en mayúsculas, grandes, sobre cajas: más palabras no caben). La carátula tiene que dar la RAZÓN PARA ENTRAR, no contar la conclusión: el título ya dice el hecho. Está escrita desde el espectador (qué le pasa a él, qué tiene en juego), con una tensión o una pregunta que el video responde. Las tres son enfoques distintos: la primera, una PREGUNTA; la segunda, una CONTRADICCIÓN o un giro; la tercera, una CIFRA CON REFERENCIA (solo si la cifra se entiende en un segundo sin contexto) o un segundo giro si no hay cifra. La primera es la que sale al aire; las otras dos van a la prueba A/B de YouTube. PRUEBA DEL GANCHO: si un desconocido necesita preguntarte "¿qué?" o "¿de quién?", no es gancho. Prohibido subir el gancho con indignación, morbo, daño a personas o sospecha sin fallo (rompe la revisión de monetización). Ninguna se narra: son solo para la carátula, que se genera sola.
- Sexta línea: "Clima de carátula:" seguido de UNA de estas seis palabras, la
  que corresponda a la noticia de portada. Esta palabra VIAJA TAL CUAL al
  generador de la imagen (es el dato `CLIMA DE LA CARÁTULA` de
  `prompts/caratula-pedido.txt`) y ahí define la emoción dominante de la
  carátula, así que tiene que ser una de las seis que ese prompt reconoce, en
  una sola palabra y sin barras:

    Clima de carátula: institucional

  `institucional` (leyes, votaciones, gobierno, autoridad) · `urgente`
  (emergencia, tragedia, crisis, el instante crítico) · `economico`
  (precios, bolsillo, mercados, trabajo) · `policial` (delito, fiscalía,
  tribunales, investigación) · `humano` (la consecuencia sobre personas,
  lo que le pasa a alguien) · `internacional` (fuera de Chile, geopolítica).
  La mayoría de los días es `institucional` o `economico`, y está bien. Si no
  escribes la línea, el sistema usa `institucional`.

  Hasta el 05-10-2026 acá iban otras seis (`grave`, `cotidiano`, `bueno`,
  `curioso`, `deporte`) que describían LUZ, no tema. El código las sigue
  aceptando, pero no las uses: eran una segunda lista que el generador no
  conocía y lo obligaba a traducir, que es justo lo que se quitó al dejarle el
  prompt armado.

Desde el 04-11-2026 no se pide carátula del día: el informe en video está apagado.

- Después: "Guion:" y el texto narrable con las siguientes marcas, y solo estas, cada una en su propia línea:
  ## Nombre de sección [categoria]
      Una por bloque temático. No se narra.
      LA CATEGORÍA ENTRE CORCHETES ES OBLIGATORIA en los bloques de noticia, y
      es UNA de estas doce, tal cual, en minúscula y sin tilde:
      `clima`, `emergencia`, `economia`, `seguridad`, `congreso`, `salud`,
      `educacion`, `internacional`, `plata-publica`, `regiones`,
      `dato-curioso`, `deporte`.
      Ejemplo: `## Sistema frontal [clima]`

      CLIMA Y EMERGENCIA NO SON LO MISMO (24-09, pregunta de Santiago: "¿y qué
      pasa cuando es avalancha?"). La regla:
        · `clima` es el ESTADO DEL CIELO y nada más: el pronóstico, el sistema
          frontal que viene, la ola de calor, las heladas del martes. Nadie se
          ha muerto todavía. Es información para saber si mañana llevas
          paraguas.
        · `emergencia` es que ALGO PASÓ: terremoto, réplica, tsunami, aluvión,
          avalancha, derrumbe, incendio forestal, erupción, inundación, alerta
          roja, evacuados, damnificados. Hay víctimas, daños o una alerta
          declarada.
      Para decidir: si hay víctimas, evacuados, daños o una alerta declarada,
      es `emergencia`; si es pronóstico o condición, es `clima`. Y fíjate en
      esto: el terremoto, el tsunami, la avalancha y la erupción NO son
      fenómenos meteorológicos, son geológicos. Nunca van en `clima`.
      Importa porque el tono visual es opuesto: clima se pinta tranquilo y
      emergencia se pinta grave. Un cielo apacible detrás de un número de
      muertos es una falta de respeto.
      Para qué sirve: decide la imagen, el color y el pictograma con que se
      pinta ese bloque en el video. Hasta el 24-09 se adivinaba buscando
      palabras en el titular y fallaba en 302 de 510 bloques: "Sistema
      frontal" es clima y no calzaba con nada, "Presupuesto 2027" es economía
      y tampoco. Elige por el TEMA del bloque, no por las palabras del título.
      Si dudas entre dos, elige la que un lector usaría para archivar la
      noticia. Los bloques de estructura (Apertura, La noticia del día,
      Cierre) NO llevan corchete.
  [FUENTE medio, fecha]
      SIGLAS: toda sigla que se PINTE EN PANTALLA (en esta marca o en el pie de
      un [DATO]) va expandida la primera vez que aparece en el guion: "Dirección
      Meteorológica (DMC)", no "DMC" a secas. Después ya se puede abreviar. Se
      salvan las de uso corriente que cualquiera lee sin traducir (IPC, PIB,
      ONU, INE, Carabineros, PDI). El que ve el video no tiene el informe al
      lado: una sigla suelta en el pie de una tarjeta no acredita nada. "DMC"
      salió sin expandir tres días seguidos, 21, 22 y 23-09.
      En la línea siguiente a cada "## sección": la fuente principal del bloque (una, o dos separadas por punto y coma), tomada del informe, en el mismo formato legible de las marcas [DATO] (institución o medio + fecha, máximo seis palabras). No se narra: va al pie de TODAS las tarjetas de ese bloque en pantalla. Cada bloque de noticia la lleva, incluida "La noticia del día"; Apertura y Cierre no.
  [TESIS] frase
      La idea central del bloque, una por bloque, obligatoria en bloques con noticias [A] y [B]. Sí se narra. MÁXIMO 18 PALABRAS: es la tarjeta grande en pantalla; si necesita más, está mal formulada.
  [DATO tipo | fuente, fecha] etiqueta: valor ; etiqueta: valor
      tipo = cifra, cambio, barras, lineas, comparacion, marcador (exactamente dos series, local y visita, con el resultado como valor) o tabla (posiciones u ordenamientos).
      EL TIPO LO DECIDE LA FORMA DEL DATO, no el gusto: cuántos valores hay y qué relación tienen. Recorre este árbol en orden y gana la PRIMERA fila que calza:
      1. El mismo indicador en 4 o más momentos del tiempo -> lineas (MIENTRAS NO SE AVISE LO CONTRARIO esta tarjeta no está construida: usa cambio con el primer y el último valor).
      2. El mismo indicador en DOS momentos (antes y después, subió, cayó, pasó de X a Y) -> cambio. Ej: "[DATO cambio | Reuters, 28 ago] buques por día en Ormuz: 17 -> 7 (baja mal)"; en pantalla "17 → 7" con la flecha del sentido. Una ganancia 2025 contra 2026 es cambio, no comparacion.
      3. Dos lados con un resultado entre ellos (deporte) -> marcador.
      4. De 3 a 6 valores de la misma familia y misma unidad donde importa el tamaño relativo -> barras. Ej: industria -5,1% ; minería -7,2% ; manufactura -4,9%.
      5. Tres o más valores ordenados por posición (un ranking) -> tabla.
      6. Dos o tres valores de cosas distintas pero comparables, MISMA unidad -> comparacion. Ej: fallecidos: 797 ; desaparecidos: 3048.
      7. UN valor -> cifra. Una cifra lleva UN solo valor: si escribiste dos o tres etiquetas con unidades distintas en una misma marca cifra, la marca está mal; deja solo el valor principal (el que cambia algo para alguien) y el resto queda en la narración.
      8. Una dirección sin número -> cifra en modo señal (solo el indicador, ver INDICADOR abajo).
      Si dos filas calzan, gana la de MÁS ABAJO (la más simple): una tarjeta que sobra explica menos que la que no está.
      Los VALORES van SIEMPRE en numerales (49, -0,2%, 9,39), nunca en palabras: la marca no se narra, es para pantalla. La regla de números en palabras aplica solo al texto narrado.
      CADA VALOR CON SU UNIDAD, pegada al número: "$31571798643", "47%", "7207 personas", "US$1970 millones". Una cifra sin unidad no se entiende en pantalla, y el rótulo de la etiqueta no siempre la dice ("perjuicio informado: 31571798643" deja al espectador adivinando si son pesos, dólares o licencias). Escribe el monto COMPLETO, sin redondear: el sistema lo abrevia solo para la pantalla, en millones, y guarda el exacto (regla 42).
      LA ETIQUETA TIENE QUE EXPLICAR LA CIFRA SOLA, sin la narración: es lo que pide la regla 32 ("ninguna cifra en pantalla sin su etiqueta de contexto"). "servidores: 19963" no dice nada, servidores de qué y contados cómo; "servidores públicos que viajaron al extranjero con licencia 2023: 19963" sí. Larga está bien, el sistema la achica; vaga no (12-10-2026, Santiago mirando la Clave: "no hay contexto para entender esos números").
      CADA VALOR CON SU PROPIO RÓTULO, también cuando comparas: "servidores 2023: 19963 ; servidores 2025: 7207", nunca "servidores: 19963 ; 7207". El sistema dibuja la flecha de antes y después solo cuando reconoce el mismo rótulo con dos años distintos; si los rótulos son de cosas distintas los pinta como lista, porque una flecha entre cosas distintas afirma un cambio que no ocurrió (12-10-2026: "sumarios totales: 25352 ; en curso: 21098 ; cerrados: 1543" salía en pantalla como 25352 flecha 1543, un desplome que nunca pasó).
      Solo valores graficables: cifras, porcentajes, montos, magnitudes. Las fechas de eventos y los rangos de días van en la narración, no en una marca [DATO].
      Fuente: una sola, la principal, con fecha, tomada del informe. No se narra. Va justo antes del párrafo que menciona esos números. FORMATO LEGIBLE: institución o medio + fecha, máximo seis palabras ("Contraloría vía Emol, 27 ago"; "INE, 28 ago"). Sin números de informe ni de resolución, sin "citado por", sin listas de medios: ese detalle va en "Fuentes:" al final, no en la pantalla.
      CRITERIO DE LA CIFRA (obligatorio): la cifra que va a pantalla es la que CAMBIA ALGO PARA ALGUIEN: cuánto subió el desempleo, cuánta plata no se cobró, cuántos buques dejaron de pasar. Nunca un detalle descriptivo: el formato de un producto ("500 gramos"), el número de un informe, la hora de un evento, la cantidad de países de una reunión. Cada párrafo narrado que se sostiene en una cifra así lleva su [DATO] con ESA cifra (una, la principal); las de acompañamiento quedan solo en el texto. Si lo importante del párrafo no es una cifra, no fuerces una: la [TESIS] del bloque ya está en pantalla y el párrafo se lee tal cual. El sistema solo pone en pantalla por su cuenta porcentajes y montos con contexto claro; todo lo demás lo decides tú.
      BASE DE COMPARACIÓN (obligatorio en cambio, y en cualquier alza o baja que se narre): toda marca [DATO cambio] tiene que decir contra QUÉ se mide el salto, y esa base tiene que ser la VIGENTE, no la más antigua ni la que da el número más grande. Si el valor inicial fue modificado después (un presupuesto reajustado, una meta corregida, un padrón actualizado, una autorización ampliada), la base es el valor modificado, y el original se menciona en la narración si aporta. Nació del informe del 06-10-2026: la autorización de deuda de 2027 (US$25.000 millones) se comparó contra los US$17.400 millones del presupuesto ORIGINAL de 2026, un alza de 44%, omitiendo que durante 2026 el Congreso ya había autorizado US$6.200 millones más y que el margen vigente era de US$23.600 millones, contra el cual el alza es de 5,9%. Las dos cifras eran verdaderas y la fuente respaldaba las dos; la elección de la base contó otra historia, y esa cifra llegó a la carátula. Si existen dos bases defendibles, se usa la vigente en la marca y la otra se nombra en el párrafo; nunca se elige en silencio la que hace más ruido.
      ETIQUETA CON CONTEXTO (obligatorio): la etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de modo que la tarjeta se entienda con el video en silencio: "sin cobrar a becarios que incumplieron", no "monto"; "buques por día en Ormuz", no "buques"; "cupos de bonificación a la contratación", no "cupos".
      REGLA DE PANTALLA CON DOS INDICADORES (obligatorio; nació del 01-09, cuando la tarjeta del índice industrial quedó pegada a una tesis que hablaba del Imacec y todos leyeron "Imacec 5,1%"): en un bloque donde conviven dos indicadores, la tarjeta grande no puede llevar la cifra de uno mientras la [TESIS] nombra al otro. O la tesis nombra el MISMO indicador que la cifra, o el nombre del indicador va pegado al número dentro de la tesis ("el índice industrial cayó 5,1%"). El espectador junta el número grande con el nombre que tiene más cerca, diga lo que diga la narración.
      VARIEDAD (capa aparte, DESPUÉS del árbol y nunca encima de él): nunca más de dos [DATO cifra] seguidas en el guion; nunca dos tarjetas del mismo tipo seguidas dentro del mismo bloque; con cuatro o más tarjetas en la edición, al menos dos tipos distintos (con tres noticias ya no se pide el [ESQUEMA] ni la barras por cuota: se piden solo si el dato lo trae). Si una cuota se rompe, primero revisa si aplicaste mal el árbol (la causa más común); si el árbol está bien aplicado, deja la cifra sobrante en la narración. Y la regla que protege a todas: la variedad NUNCA justifica un dato que no está en el informe ni una tarjeta forzada; la cuota es una alarma, no una obligación. Antes que inventar con qué variar, se repite el tipo o se deja el párrafo sin marca.
      REFERENCIA (opcional, SOLO en cifra, al final de la línea tras un " | "):
      " | ref: contra qué se mide esta cifra", en 3 a 8 palabras. En pantalla sale
      en cursiva bajo la etiqueta, y entra cuando la voz dice esas palabras.
      CUÁNDO PONERLA, y es lo único que la justifica: cuando lo que hace NOTICIA
      al dato no es su tamaño sino contra qué se mide. Un récord ("el nivel más
      alto desde 2021"), un mínimo, un umbral que se cruza ("el primero sobre
      los mil"). Si el dato es noticia por su tamaño y nada más, NO la pongas:
      la tarjeta sale igual que siempre.
      POR QUÉ EXISTE (01-10-2026): el árbol de arriba elige por la FORMA del
      dato y nunca pregunta qué lo hace noticia, así que un número que rompe una
      marca de cinco años y uno rutinario salían con la misma tarjeta. Esta
      línea es lo único que los distingue.
      ESCRÍBELA CON LAS PALABRAS DEL PÁRRAFO que la narra. No es cosmética: el
      video la hace entrar en el segundo en que la voz dice esas palabras,
      buscándolas en el párrafo hablado. Si no las encuentra, la línea entra con
      un retardo fijo y se pierde la sincronía.
      Ej: [DATO cifra | INE, 30 sep] desempleo en Chile, 989.400 personas: 9,6% (sube mal) | ref: el nivel más alto desde 2021
      LA CIFRA GRANDE ES LA DEL TÍTULO (01-10-2026): si el título del video dice
      un número, la tarjeta de "La noticia del día" muestra ESE número grande y
      el otro va en la etiqueta. El 01-10 el título decía 9,6% y la pantalla
      mostraba 989.400: quien llegó por el título no encontró lo que fue a
      buscar. Las dos cifras del mismo hecho caben, una grande y otra en la
      etiqueta, separadas por " · ".
      INDICADOR (opcional, entre paréntesis después del valor): "(sube)", "(baja)", "(igual)", "(bien)", "(mal)", o combinados "(sube mal)", "(baja bien)". En pantalla se dibuja una flecha o un visto de color: subir se pinta verde y bajar rojo, salvo que digas lo contrario (el desempleo que sube es "(sube mal)"; la inflación que baja es "(baja bien)"). Un valor puede ser SOLO el indicador cuando no hay cifra pero sí una dirección clara: "empleo formal: (baja mal)" muestra la etiqueta grande con la flecha roja. Úsalo cuando la dirección sea parte de la noticia, no como adorno.
  [ESQUEMA | título] elemento -> elemento -> elemento
      Para procesos, jerarquías, niveles o líneas de tiempo simples que el informe describa. Máximo seis elementos, texto breve por elemento. No se narra. Cero a dos por edición, y OBLIGATORIO al menos uno cuando una de las TRES noticias narradas sea de proceso (un trámite legislativo, una etapa judicial, un cronograma, quién decide qué y en qué orden), que es casi todos los días: un esquema animado es la ventaja de este formato sobre un conductor explicando con las manos. Es condicional, no cuota: si ninguna noticia del informe describe una estructura o secuencia real, no lo fuerces.
  [HECHO] párrafo
  [INTERPRETACIÓN] párrafo
      Prefijo del párrafo cuando el informe distingue explícitamente análisis. Se narra el párrafo, no la marca.
  [CITA | nombre, cargo | fuente, fecha] texto
      Solo citas textuales presentes en el informe. Se narra el texto.
- Todo párrafo sin marca es narración normal.
- No incluyas URLs en el texto narrado ni en las marcas (las únicas URLs permitidas están en las líneas de "Fuentes:", tal como las trae el informe; desde el 23-10-2026 esas líneas pueden llevarlas porque la descripción de YouTube las publica y sirven a quien quiere verificar), ni emojis, paréntesis, bibliografía, notas al editor, marcas de tiempo, indicaciones de edición ni advertencias fuera de las marcas definidas.
- Al final, bajo "Fuentes:", lista una línea por cada fuente de las marcas [DATO] y [CITA] Y por cada fuente del informe cuyas noticias narraste, tal como aparecen en el informe. NUNCA listes archivos internos del sistema (rutas como contenido/..., hitos.md, preselección): si un dato viene de ahí, cita la fuente PÚBLICA original del hecho (el tribunal, el organismo, el medio). La lista se publica en YouTube tal cual (30-08: se coló "contenido/casos/hitos.md" y hubo que borrarlo a mano). Esa lista alimenta la descripción del video en YouTube: la transparencia de fuentes es marca del canal, y una fuente cuyo contenido se narró no puede quedar sin crédito. Y TODA fuente mencionada EN LA PROSA del guion ("según X", "el Informe diario señalaba", "como reportó Y") también va en la lista, aunque no tenga marca: 3 de las últimas 4 revisiones cazaron citas en prosa sin crédito en el bloque.

PERSISTENCIA:
La ÚNICA persistencia es el repositorio, en la ruta exacta que define el contrato de archivos. No guardes copias en la Biblioteca de ChatGPT. Guarda el guion ÍNTEGRO y sin reformular. Si por algún motivo técnico no puedes guardar o pushear, indícalo claramente al final de la ejecución.

CONTROL INTERNO OBLIGATORIO ANTES DE ENTREGAR:
0. LA QUE MÁS FALLA, y por eso va primero y se responde CONTANDO. Medido sobre
   los veredictos del 22-09 al 06-10-2026: la ETIQUETA CON CONTEXTO de las
   marcas [DATO] se corrigió CINCO veces en dos semanas, y cada corrección costó
   una vuelta entera. La regla ya está escrita más arriba; el problema es que
   se firma sin mirar. Así que no te preguntes si la cumpliste: LISTA tus marcas
   [DATO] una por una y escribe al lado la etiqueta de cada una. Una etiqueta
   que no diga QUÉ es la cifra Y EN QUÉ SITUACIÓN, en 3 a 8 palabras, está mal:
   "monto" está mal, "sin cobrar a becarios que incumplieron" está bien. La
   prueba es si la tarjeta se entiende con el video en silencio.
1. Verifica la selección: exactamente tres bloques de noticia, la portada primero, y las otras dos elegidas según QUÉ SE NARRA; ninguna noticia agregada; no hay "## En titulares", ni Dato curioso, ni Agenda, ni "¿En qué quedó?".
2. CUENTA las palabras narradas (todo lo que se oye, sin marcas ni encabezados): entre 420 y 600. Fuera de ese rango, recorta o completa antes de entregar.
3. Verifica que no hay ningún tema narrado dos veces.
4. Verifica que no hay frases que narren ausencia de noticias.
5. Comprueba que no parezca lectura automática ni formato de producción masiva.
6. Comprueba que exista valor narrativo y editorial propio en la transformación a voz.
7. Cada bloque de noticia trae su [FUENTE] y cada párrafo que se sostiene en una cifra trae su [DATO] con la cifra principal.
8. Revisa contra riesgos de monetización: lenguaje inapropiado, violencia o tragedia tratadas de forma gráfica o sensacionalista, sexualidad explícita, drogas, armas, discurso de odio, degradación, engaño.
8. Comprueba que título y apertura sean seguros para anunciantes y no dependan de impacto artificial.
9. Comprueba que cifras, nombres y siglas puedan pronunciarse naturalmente y que los números estén en palabras.
10. Revisión de transiciones: si demasiados párrafos comienzan anunciando el cambio de tema, reescribe.
11. Revisión de cadencia: rompe secuencias demasiado uniformes con frases más cortas y párrafos de distinta longitud.
12. Verifica que cada bloque [A] y [B] tiene su [TESIS], que cada [DATO] y [CITA] tiene fuente y fecha, y que todo párrafo de "Análisis" lleva [INTERPRETACIÓN].
13. Verifica que el guion quedó guardado y pusheado en la ruta exacta del contrato de archivos, o que el fallo quedó reportado.
14. Cada [TESIS] tiene 18 palabras o menos.
14b. La [TESIS] de "La noticia del día" tiene 66 caracteres o menos, contados de verdad, y se lee como un titular entero: es el título del Short, literal.
14c. La [TESIS] de "La noticia del día" nombra a la persona o al grupo humano al que le pasa algo, no solo a la institución ni al indicador, y ese sujeto sobrevivió al tope de 66 caracteres.
14d. Cada [TESIS] de los tres bloques de noticia mide entre 105 y 118 caracteres contados, y la suma de las cuatro tesis que narra el Short (la de "La noticia del día" más las tres) queda entre 365 y 423 caracteres. Si la suma quedó por debajo de 365, el Short va a durar menos de 41 segundos: alarga las tesis cortas con el hecho que les falta, nunca con relleno.
15. El cierre dice que el informe completo está en el enlace de la descripción, la línea "Para salir hoy" del informe quedó integrada en la despedida, y el tagline "El resumen sin gritos." cierra el video.
16. Ningún bloque termina en síntesis abstracta y no quedan conectores de ensayo escrito.
17b. Ninguna sigla se pinta en pantalla sin haber sido expandida antes, salvo las de uso corriente.
17. Variedad visual: no hay más de dos [DATO cifra] seguidas, y si una de las tres noticias es de proceso hay al menos un [ESQUEMA]. Y ninguna marca lleva un dato que no esté en el informe.
17c. Cada [DATO cambio] se mide contra la base VIGENTE del indicador, no contra la original ni contra la que da el salto mayor. Si el valor inicial fue modificado después, la marca usa el modificado.
18. Solo después de superar estas comprobaciones entrega el título, el guion y las fuentes.

CONTRATO DE ARCHIVOS: aplica el contrato de prompts/contrato-archivos.md del
mismo repositorio. Léelo COMPLETO en esta misma ejecución: define las rutas
exactas, el formato obligatorio de los guiones y las reglas de commit.
FORMATO, REGLA DURA: después de CADA línea "[TESIS] ..." va una LÍNEA EN BLANCO antes del párrafo narrado. La tesis es una línea y nada más. Sin esa línea en blanco el sistema mete el párrafo dentro de la tarjeta de la tesis y el texto se sale del video (pasó el 01-09 y el 02-09, con piezas ya publicadas).

ESTILO TIPOGRÁFICO (obligatorio en todo entregable):
- Nunca uses la raya larga (—) ni la raya media (–). Donde caería una raya,
  usa coma, dos puntos, punto o paréntesis.
- Los rangos se escriben con guion corto (2026-2027, 8-10) o con "a" (8 a 10).
