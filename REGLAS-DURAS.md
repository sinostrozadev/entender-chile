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
24. **La sesión de día no toca el comportamiento del proyecto.** Analiza,
    mide y escribe en `bitacora/`; los cambios a prompts, scripts,
    workflows y `src/` los hace la sesión de la noche, salvo pedido
    explícito y puntual de Santiago. (decisión 28-08)
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
29. **Imágenes: nada ajeno, nada realista, y lo generado solo como
    identificador.** Fotos ajenas jamás (Chile no tiene fair use; un
    reclamo de Content ID bloquea la monetización del video entero). Las
    imágenes GENERADAS propias (estilo grabado lineal, paleta de la casa)
    se permiten SOLO como identificadores de serie y de sección: cortinas
    de 1,1 s, pieles de los Shorts, carátulas, cabeceras de la web. Nunca
    son el contenido: las tarjetas de datos siguen siendo tipográficas y
    ninguna cifra grande lleva textura detrás. Y llevan VARIACIÓN DIARIA
    POR CÓDIGO (encuadre, desplazamiento y tinte sembrados con la fecha),
    porque el ejemplo textual de la política de contenido inauténtico es
    "mismas imágenes de IA repetidas" y eso se evita por construcción, no
    por promesa. (decisión 03-09, cierra la disputa 1; corrige parcialmente
    la del 27-08)
30. **La música se genera por código y es puntuación, no cama.** Silencio
    bajo la narración; sello, cortinas de 1,1 segundos y cierre, nada más.
    Nada descargado de ningún banco. (decisión 27-08)
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

---

## Lo que hoy se contradice y hay que cerrar

Estas no son reglas todavía: son dos afirmaciones vivas en archivos
distintos. Cada una necesita una decisión de Santiago, anotada en
`estrategia/decisiones.md`, y después se borra la versión perdedora. Están
ordenadas por lo que más pesa.

1. ~~**Imágenes generadas.**~~ **CERRADA el 03-09 por Santiago**, tras ver
   las 11 imágenes y el marco de monetización: se formaliza la excepción
   como regla 29 nueva (identificadores de serie y sección, con variación
   diaria por código; la tipografía sigue mandando en los datos). Entrada
   en decisiones.md.
2. **Voz clonada.** `modelo-de-negocio.md` e `ideas/IMPLEMENTAR.md` la
   mantienen como "requisito no negociable"; la decisión del 27-08 la
   aparca indefinidamente y sigue "pendiente de confirmación" ocho días
   después. Cerrar la decisión 13 y corregir los dos archivos.
3. **"Nada del informe queda sin sonar" contra el tope de titulares.** La
   decisión del 29-08 lo hace obligatorio; medido el 02-09, el bloque es el
   23% del video. La opción B (12 palabras por titular) mantiene la regla;
   la A (tope de 8) la rompe. Decidir cuál, y si la B no alcanza, volver.
4. **El clima.** La identidad dice que el pronóstico queda fuera; el
   informe pide una recomendación de vestimenta diaria y la propuesta del
   02-09 la amplía a dos localidades. O es una excepción declarada
   ("una frase, nunca una sección") o se quita.
5. **"¿En qué quedó?": diaria o por hito.** La estrategia dice "video por
   hito, no por calendario"; dos documentos de ideas la quieren como
   sección diaria de 60 segundos.
6. **La Clave: diaria o excepcional.** `prompts/claves.md` dice diaria;
   `contrato-archivos.md` dice "si un día no hay Clave, no crear sus
   archivos"; `guion-claves.md` obliga a crear un archivo SIN-ENTREGA.
   Tres reglas para el mismo caso.
7. **Dos auditorías matinales para el mismo archivo.** La skill de la
   sesión de día y la tarea de las 09:30 escriben las dos
   `bitacora/FECHA-auditoria.md` con contenidos distintos.
8. **La hora de publicación** está definida en cuatro archivos con cuatro
   valores (05:30, 06:30, 07:00, 07:30). Una sola tabla, un solo dueño.
9. **La base de series: quién la alimenta.** `indicadores-pais.md` dice "la
   tarea de GPT"; la propuesta del 02-09 dice "el vigía".
10. **La cortina de sección.** Un documento la define como lo primero que
    se recorta; otro, como el lugar de mayor palanca visual (es el
    fotograma de la tira de capítulos). Las dos cosas pueden ser ciertas
    si se dice que dura 1,1 s y que ese segundo importa.
