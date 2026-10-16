# Reglas duras de Entender Chile

Las que no se transan. Todo lo demás (prompts, código, ideas, tareas) se
decide mirando esta lista: si una propuesta choca con una regla de aquí, la
propuesta pierde o la regla se cambia a la vista, con fecha y en
`estrategia/decisiones.md`. Nunca las dos conviven en contradicción
silenciosa.

Cada regla lleva su origen entre paréntesis. Lo que hoy está en disputa va
al final, separado, porque una regla en disputa no es una regla.

Versión 1: 02-09-2026, armada a partir de la lectura completa de los 84
archivos de criterio del repositorio.

---

## A. A quién le debemos lealtad

1. **Primero el ciudadano, después el país, y nadie más.** Ni partido, ni
   gobierno de turno, ni auspiciador, ni el propio canal. Si una nota le
   conviene al canal y perjudica a quien la mira, no va.
   (identidad, decisión 27-08)
2. **Mostramos lo que pasa para que cada uno piense por sí mismo.** Nunca
   decimos qué concluir. Las posiciones se atribuyen a quien las sostiene.
   Sin adjetivos que juzguen y sin ironía: la ironía es opinión disfrazada.
   (identidad, decisión 27-08)
3. **Los hechos y las cifras son iguales gobierne quien gobierne.** Se
   cubre con el mismo rigor a quien uno preferiría no incomodar. Toda
   sección de seguimiento se le hará igual al gobierno siguiente, y eso se
   declara por escrito desde el primer día. (identidad; seccion-lo-cumplio)
4. **El auspicio nunca toca la selección de noticias.** (modelo-de-negocio)
5. **Las decisiones editoriales son de personas, y quedan registradas.**
   Qué entra, cuánto pesa y cómo se cuenta lo decide alguien con nombre, y
   se anota en `estrategia/decisiones.md`. Es memoria del proyecto y es la
   prueba de aporte humano que exige YouTube. (estrategia/README, decisión
   25-08)

## B. Qué es verdad en este canal

6. **Una cifra sin fuente no entra.** Toda cifra lleva fuente y fecha, en
   pantalla y en la web. Para las noticias principales, dos fuentes
   coincidentes. Si las fuentes discrepan, se consignan las dos.
   (identidad; prompts/informe; casos/README)
7. **Hecho e interpretación van separados y etiquetados.** Nunca una
   interpretación presentada como hecho. Es la firma epistémica del canal.
   (identidad; prompts)
8. **Presunción de inocencia estricta.** Nada se afirma como delito
   consumado sin sentencia; la situación procesal va exacta y fechada;
   nunca "ladrón", "corrupto", "se robaron". El dossier no descubre
   nombres: solo personas ya individualizadas por fuentes oficiales o dos
   medios establecidos. (casos/README; seccion-plata-publica)
9. **No se inventa.** Ni datos, ni denominadores, ni ausencias. Un dato que
   todavía no se publicó no se anuncia como si existiera, y un dato
   anunciado se cierra al día siguiente, obligatorio. Nunca se narra ni se
   informa la ausencia de noticias. (prompts/informe, reglas del 01-09)
10. **Verificar antes de afirmar.** Una búsqueda que no encuentra no es una
    ausencia. Antes de declarar que un archivo o un dato no existe, se abre
    y se cita lo que se vio. Omitir por una premisa falsa es peor que
    preguntar. (contrato-archivos)
11. **Los errores se corrigen a la vista.** En la web se podría editar en
    silencio, y justamente por eso no se hace: la corrección queda anotada
    con su fecha. (prompts/web; casos/README)
12. **Lo interno nunca sale al público.** Las notas del sistema, los
    descartes, las marcas EN SEGUIMIENTO y PENDIENTE DE CIERRE van en el
    bloque interno al final del archivo y no se narran ni se publican. El
    barrido y la preselección no se citan. (prompts/informe; prompts/web)

## C. Qué hacemos y qué no

13. **Elegimos y explicamos; no cubrimos.** Pocas noticias centrales bien
    desarrolladas, lo relevante en segundo plano, el resto en registro
    breve. Cero secciones de trámite: ni pronóstico del tiempo como
    sección, ni resumen deportivo de la fecha, ni farándula, ni webinars y
    actos protocolares en la agenda. El clima entra solo cuando es noticia.
    (identidad; prompts/informe)
14. **Dos series, dos trabajos.** El informe diario es el hábito y publica
    a hora fija cada mañana; las Claves son la biblioteca permanente y el
    crecimiento. La Clave es diaria. (identidad; prompts/claves)
15. **Nada de clickbait.** Ni preguntas cebo, ni mayúsculas sostenidas, ni
    "no vas a creer", ni prometer más de lo que el texto entrega. El
    título y la apertura no dependen de impacto artificial. Subir un
    puntaje de portada con indignación, morbo o sospecha sin fallo está
    prohibido. (prompts/guion-informe; prompts/web)
16. **No pedimos nada.** Ni suscripción, ni likes, ni compartir. En los
    comentarios se responde siempre, corto y cálido, y las respuestas las
    escribe Santiago. (identidad, regla del 01-09; prompts)
17. **El tagline cierra cada video, exacto: "El resumen sin gritos."**
    (decisión 25-08)
18. **Sin groserías, sin locutor engolado, sin fingir calidez.** Español de
    Chile neutro, cercano y sobrio. (identidad; prompts)

## D. Cómo se produce

19. **La máquina produce, una persona aprueba.** Toda pieza sube en
    privado y el clic de publicación es de Santiago. Escuchar el audio
    completo antes de publicar no se automatiza nunca. (decisión 30-08;
    README)
20. **El repositorio es la única memoria y `prompts/` la única fuente de
    verdad de los prompts.** Nada vive en la Biblioteca de ChatGPT ni en
    copias sueltas; si se cambia un prompt, se cambia en el repo y se
    commitea. (prompts/README; guion-informe)
21. **Cada tarea escribe solo sus archivos, del día de hoy.** Jamás se
    modifica un archivo de otra fecha. Una escritura no está hecha hasta
    que se leyó de vuelta. Si algo falta, se dice en la primera línea.
    (contrato-archivos)
22. **El cron de GitHub no es reloj principal.** Todo lo que necesita hora
    fija usa una rutina en la nube que despierta al workflow con un push;
    el cron queda solo de red de respaldo. Medido, no teórico. (decisión
    31-08)
23. **Nada de credenciales en el repo ni en páginas publicadas.** Las
    claves viven en los secrets de GitHub y en archivos fuera del repo. Un
    token dentro de una página publicada es un token regalado. (docs/youtube;
    decisión del Taller, 02-09)
24. **El día propone, Santiago aprueba, el día ejecuta.** La sesión de día
    analiza, mide y anota como siempre; cuando algo está listo y pensado,
    lo propone con alcance medido (qué archivos, qué líneas, qué cambia y
    cómo se prueba), y con el sí explícito de Santiago lo ejecuta ella
    misma, lo prueba con una corrida real y lo deja anotado. Sin el sí, no
    se toca nada. Lo que la sesión de día NO puede hacer y sigue siendo de
    la noche: nada que necesite los secrets (Azure, YouTube, podcast),
    renderizar video o carátulas (el Chromium de su entorno no confía en
    el certificado del proxy al pedir las fuentes), y editar las rutinas
    de Claude creadas desde la interfaz. (decisión 16-09, MODO 1; reemplaza
    a la del 28-08, que se había levantado seis veces en dos días)
25. **Máximo tres agentes en paralelo.** Seis agotaron la ventana de cinco
    horas el 25-08. (casos/README)
26. **Lo que se prueba, se mide dos semanas antes de opinar.** Una táctica
    se decide por retención y swipe-away, no por gusto. Las hipótesis se
    marcan como hipótesis. (viralizacion; estrategia/README)
27. **Una rutina nueva no reemplaza a la vieja hasta que corrió de verdad
    una vez.** Antes de apagar la que funciona, la nueva tiene que probar
    en una corrida real que trae el repo montado (`sources` en el cuerpo
    de la API: sin eso despierta en un directorio vacío, no puede clonar y
    pierde la corrida entera). Se apaga la vieja DESPUÉS de leer ese log,
    nunca por lo que diga una nota. Pagado dos veces: el guardián el 01-09
    (29-08 a 01-09 sin comprobar nada) y la revisión editorial el 08-09
    (creada sin fuente; se apagó la que servía y la noche quedó sin
    control de calidad hasta que se detectó). (decisión 08-09)

## E. Cómo se ve y cómo suena

27. **Papel, tinta y un solo acento: verde pátina de cobre.** Chileno sin
    bandera, apolítico. Fraunces para la tesis, IBM Plex para el texto y
    los datos. (src/tema; decisiones)
28. **Sobriedad radical.** Sin alarma, sin relleno, sin pirotecnia; nada de
    zooms ni efectos. En notas de duelo o violencia, frases más cortas y
    cero música. (identidad; formato-video)
29. **Imágenes: nada ajeno, y nada que se pueda leer como registro del
    hecho.** Fotos ajenas jamás (Chile no tiene fair use; un reclamo de
    Content ID bloquea la monetización del video entero). Las imágenes
    GENERADAS propias se permiten SOLO como identificadores de serie y de
    sección: cortinas de 1,1 s, pieles de los Shorts, carátulas, cabeceras
    de la web y los dibujos de la biblioteca de conceptos. **Pueden ser fotorrealistas cuando son AMBIENTE U OBJETO**
    (un paraguas bajo la lluvia, una calle desenfocada de noche, una
    alcancía, un vaso que se desborda): esas no afirman nada sobre la
    noticia, y la versión ilustrada se probó y no compite como carátula.
    **Queda PROHIBIDO el fotorrealismo cuando la imagen representa EL HECHO
    NOTICIOSO**: el río desbordado de hoy, el choque, la marcha, el
    edificio del que habla la nota, la persona de la que se habla. Una
    imagen así es un registro falso de algo que nadie fotografió: obliga a
    la etiqueta de contenido sintético, la política de contenido inauténtico
    la persigue, y si alguien la pilla se lleva puesta la credibilidad de
    todas las cifras del canal, que es lo único que tenemos.

    **PERSONAS: nunca, y esta no se relaja.** Ni reales, ni reconocibles, ni
    parecidas a alguien. No es el mismo caso que un edificio: en Chile la
    propia imagen está protegida, una cara generada al lado de la palabra
    "investigación" afirma algo que ninguna fuente dijo, y el castigo de la
    política de contenido sintético cae sobre el canal entero y no sobre el
    video. Una figura anónima de espaldas y sin rasgos no es una persona
    reconocible y sí se puede.

    **Y esa excepción tiene su propio límite, puesto el 29-09-2026 antes de
    usarla por primera vez: la figura entra SOLO donde la persona es el
    hecho.** Un anuncio es alguien hablando, una marcha es gente caminando,
    una votación es gente votando: ahí sacar a la persona es dibujar otra
    cosa. En todo lo demás no entra, ni para llenar un lugar que se ve vacío
    ni para dar escala. El motivo es de acumulación y no de imagen: una
    figura de espaldas es defendible una vez, y si empieza a aparecer en
    treinta conceptos el canal termina lleno de personas generadas, que es
    exactamente lo que esta regla evita. La excepción no se hereda por
    parecido: cada concepto que la quiera se decide aparte.

    **LUGARES E INSTITUCIONES: sí, con dos condiciones** (29-09-2026). Esto
    corrige la frase "en ningún caso lugares identificables", que venía del
    03-09 y contradecía el criterio que esta misma regla adoptó el 23-09: la
    línea no es el estilo sino si la imagen pretende ser el registro del
    hecho. Un grabado de un edificio permanente no pretende registrar nada y
    va a seguir siendo cierto mañana. Prohibirlo obligaba a pedir el objeto
    vecino (un atril) en vez de la cosa que uno piensa (el palacio), y eso
    salió a la luz cuando Santiago preguntó por qué se pedía ese púlpito
    para "gobierno".
    1. **Tiene que estar bien dibujado.** Si es La Moneda, es La Moneda: la
       fachada plana, el almohadillado, los frontones que alternan. Una
       versión casi correcta la nota justamente quien nos sigue por ser
       precisos con las cifras, y ahí el costo es la credibilidad, no el
       detalle.
    2. **Tiene que ser de esa noticia.** La Moneda en una nota que no es del
       gobierno insinúa que el gobierno está metido. El edificio afirma
       cosas.

    **Y la mitigación no es un detalle decorativo: lo que hace defendible
    mostrar un lugar real es que se vea que es un dibujo.** El día que la
    biblioteca vuelva al fotorrealismo, esta autorización se cae con ella y
    hay que volver a lo genérico.

    Nunca son el
    contenido: las tarjetas de datos siguen siendo tipográficas y ninguna
    cifra grande lleva textura detrás. Y llevan VARIACIÓN DIARIA POR CÓDIGO
    (encuadre, desplazamiento y tinte sembrados con la fecha), porque el
    ejemplo textual de la política de contenido inauténtico es "mismas
    imágenes de IA repetidas" y eso se evita por construcción, no por
    promesa. (decisión 03-09, cierra la disputa 1; corrige parcialmente la
    del 27-08; ampliada el 23-09 por Santiago en el taller de carátulas:
    el "nada realista" original dejaba fuera la única dirección que
    funcionaba, y la línea correcta no es el estilo sino si la imagen
    pretende ser el registro del hecho; partida en personas y lugares el
    29-09-2026, ver arriba)
30. **La música se genera por código, suena a mecanismo y nunca dice qué
    sentir.** Nada descargado de ningún banco. El sello del canal es siempre el
    mismo, re - la - re, porque un sello es identidad. La cama sí puede correr
    bajo la narración, pero con cuatro condiciones duras: sale de los números de
    la propia pieza y por eso suena distinta en cada una; va en dórico y sin
    terceras, que es lo que la deja sin veredicto; es golpeada y no frotada,
    porque una nota golpeada dice y se retira mientras una frotada insiste; y
    calla entera en los datos y en cualquier sección de duelo o violencia, por
    la regla 28. Prohibido el lenguaje del suspenso: trémolo, dron grave de
    amenaza, riser, pulso que acelera. (decisión 27-08, reemplazada el 07-10-26)
31. **Voz sintética con acento chileno, declarada.** Azure es-CL; toda
    pieza se sube marcando la divulgación de contenido sintético. Dos voces
    solo si el cambio significa algo (narración y citas), nunca alternando
    por noticia. (decisiones 27-08 y 30-08)
32. **Ninguna cifra en pantalla sin su etiqueta de contexto ni su fuente al
    pie.** La tarjeta tiene que entenderse con el video en silencio.
    (guion-informe)
33. **La variedad visual nunca justifica un dato que no está en el informe
    ni una tarjeta forzada.** La cuota es una alarma, no una obligación.
    (tarjetas-cuando-usar-cada-una; guion-informe)

## F. Cómo se escribe

34. **Sin raya larga ni raya media, en ningún archivo del proyecto.** Donde
    caería una raya va coma, dos puntos, punto o paréntesis. (decisión
    25-08). Al 02-09 hay 38 en archivos del repo, previas a la regla.
35. **Fechas absolutas.** DD-MM-AAAA en la prosa; AAAA-MM-DD solo en rutas
    y líneas del sistema. Nunca "ayer" ni "la semana pasada" en un texto
    que se lee después. (prompts; casos/README)
36. **Los valores de las marcas en numerales; el texto narrado, en
    palabras.** La marca es para pantalla, la narración es para la voz.
    (guion-informe)
37. **Cada edición se escribe para su día.** Sin aperturas, transiciones ni
    cierres idénticos día tras día: la variación estructural real es
    además la defensa contra la política de contenido inauténtico.
    (guion-informe; modelo-de-negocio)
38. **Sin jerga del pipeline en los documentos fundacionales ni en lo que
    oye la audiencia.** Los pesos [A]/[B]/[C] se quedan en prompts/; nunca
    "según el informe de hoy" al aire. (decisión 25-08; guion-informe)
38b. **Las cifras grandes se dicen redondeadas.** En voz, tres cifras
    significativas como máximo, con "más de", "casi" o "unos": "más de
    tres mil seiscientos millones de pesos", nunca los diez dígitos. El
    número exacto va a la tarjeta, que es para pantalla. Tantos números
    seguidos se escuchan horrible y se pierde el hilo. (decisión de
    Santiago, 04-09; guion-informe; guion-claves; validar-tarjetas avisa)

## G. El objetivo que manda el calendario

39. **Postular al Programa de Socios antes del 01-02-2027.** Ese día el
    umbral se duplica (8.000 horas o 20 millones de vistas de Shorts). Hasta
    entonces: 1.000 suscriptores y 4.000 horas públicas de videos largos;
    las vistas de Shorts no suman horas. (modelo-de-negocio; decisión 30-08)
40. **La promesa del canal es diaria.** No se recorta el fin de semana por
    costo. (PENDIENTES, decisión de Santiago)

41. **Una sola lista de trabajo: `bitacora/PENDIENTES.md`.** Toda tarea vive
    ahí, con evidencia (archivo y línea) y con dueño (noche, día o Santiago);
    lo que no está ahí, no se hace. Las cuatro listas que escribe la máquina
    (`por-abrir.md`, `por-verificar.md`, las marcas PENDIENTE DE CIERRE del
    informe y `bitacora/taller.json`) se quedan donde están porque son
    material editorial, no tareas: bajan a PENDIENTES solo cuando se quedan
    pegadas. Lo terminado se BORRA de la lista y queda en
    `bitacora/REALIZADOS.md`; las decisiones de fondo, y también las de NO
    hacer algo, en `estrategia/decisiones.md`. El estándar completo está en
    `bitacora/README.md`. (estándar del 13-09, tras encontrar pendientes
    repartidos en nueve lugares y un HOY marcado tres mañanas seguidas que
    nunca llegó a la lista)
42. **Una cifra en pantalla se lee de un golpe, con su unidad.** Hasta
    999.999 va entera con punto de miles; de ahí para arriba se escribe en
    millones ("$31.572 millones"), y el valor exacto queda en el guion y en
    la descripción. En el texto narrado, los números bajo diez van en
    palabras; en dígitos solo el día de una fecha y el identificador de una
    norma ("el 2 de octubre", "Decreto Supremo número 3"). Once dígitos
    seguidos no entran en el ojo en los segundos que dura un plano, y la
    narración ya dice la magnitud, no el dígito. (12-10-2026, Santiago
    mirando la Clave de licencias: "es muy grande para ponerlo en pantalla";
    implementada en scripts/numerales.js con sus casos de regresión)

---

## Las disputas: todas cerradas (al 13-09-2026)

Acá se anota lo que dos archivos del proyecto afirman de forma distinta. Una
disputa no es una regla: se cierra con una decisión de Santiago en
`estrategia/decisiones.md` y después se borra la versión perdedora del archivo
que la sostenía. **Hoy no hay ninguna abierta.**

- **1 · Imágenes generadas**: CERRADA el 03-09: entran como identificadores de
  serie y sección, con variación diaria por código (regla 29).
- **2 · Voz clonada**: CERRADA el 02-09: NO es requisito de monetización; se
  reabre solo con evidencia.
- **3 · Titulares**: CERRADA el 02-09: tope de LARGO (12 palabras por titular),
  no de cantidad; todo lo del informe sigue sonando.
- **4 · El clima**: CERRADA el 02-09: excepción declarada, UNA frase casual en
  la despedida, nunca una sección.
- **5 · "¿En qué quedó?"**: CERRADA el 02-09: por hito, no por calendario.
- **6 · La Clave**: CERRADA el 02-09: es DIARIA. Su duración cambió dos veces
  después: a ~5 minutos el 05-09 y de vuelta a 8 como piso el 13-09, a pedido
  de Santiago (`prompts/guion-claves.md`).
- **7 · Auditoría matinal**: CERRADA el 02-09: la escribe la rutina; la sesión
  de día la lee y profundiza.
- **8 · Hora de publicación**: CERRADA el 02-09: manda la tabla de
  `ideas/viralizacion.md`; los demás archivos la citan.
- **9 · La base de series**: CERRADA el 02-09: la alimenta el agente de
  guardia.
- **10 · La cortina de sección**: CERRADA el 02-09: no era disputa sino
  redacción; dura 1,1 s y ese segundo define la tira de capítulos.

Estaban escritas como abiertas hasta el 13-09, once días después de cerrarse:
es exactamente la deriva documental que la regla 41 viene a cortar.
