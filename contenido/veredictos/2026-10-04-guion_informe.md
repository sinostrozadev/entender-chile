VEREDICTO: APROBADA
VUELTA: 0
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-04T06:48:49Z

Observaciones:
- Para la pieza siguiente: el párrafo del desglose regional (línea 64) narra
  los doscientos quince servidores públicos de Coquimbo sin marca [DATO]. No
  bloquea y está bien resuelto: el informe consigna esa cifra en disputa
  ("cifra que otro medio consigna como más de 200 funcionarios", línea 87), el
  guion lo dice en el mismo párrafo y el prompt deja las cifras de
  acompañamiento en el texto ("las de acompañamiento quedan solo en el
  texto"). La cifra principal del bloque, el paso de 19.963 a 7.207, sí lleva
  su tarjeta en la línea 66. Poner en pantalla un número que la propia fuente
  discute habría sido peor que dejarlo hablado.
- Para la pieza siguiente: la cifra del Sernac quedó fuera del titular (línea
  132, "El Sernac alerta por una falla en vehículos Jeep y RAM"). Es lo que
  pedía el veredicto del informe de hoy, que mandaba no elegir entre los tres
  recuentos (1.181, 324 y más de 1.000). El guion no eligió ninguno.
- Para la pieza siguiente: el informe de hoy no trae ninguna sección
  "Análisis". Verificado en esta corrida con búsqueda explícita de la palabra
  sobre el archivo completo: no aparece ninguna vez. Por eso el guion va sin
  marcas [HECHO] ni [INTERPRETACIÓN], y eso es correcto, no una omisión.
- Para la pieza siguiente: las tres marcas internas del informe quedaron sin
  narrar, como corresponde. Búsqueda explícita sobre el guion completo de
  "EN SEGUIMIENTO", "PENDIENTE DE CIERRE" y "NOTICIA DE PORTADA": cero
  apariciones. La de portada sí se usó como manda el prompt, porque la beca de
  computadores es la de "La noticia del día", la del título y la de las tres
  carátulas.
- Cobertura verificada una por una contra el informe: 33 noticias en total (3
  [A], 21 [B] y 9 [C]), 10 narradas (las tres [A] y siete [B], justo en el tope
  de diez) y 23 en "En titulares" (las catorce [B] fuera del corte y las nueve
  [C]). Nada del informe quedó sin sonar y no hay noticia agregada.
- La sección "¿En qué quedó?" del informe (líneas 185 y 186) no tiene bloque
  propio en el guion, y está bien: sus dos ítems remiten a noticias ya
  desarrolladas más arriba en "Plata pública" (la Junaeb y las licencias
  médicas), que el guion narra en las líneas 44 y 60. Narrarlas de nuevo habría
  roto la regla de no contar un tema dos veces. El detalle que esos ítems
  aportan, que nadie en la causa está formalizado ni condenado, sí quedó, en la
  línea 50.
- Esta edición del guion la escribió el suplente y no GPT, con el plan B
  activo desde las 05:34 UTC del 04-10-2026
  (contenido/estado/plan-b.txt, "hasta: 2026-10-04"). Igual que con el informe
  de hoy, no cambia nada de la validación: se validó contra
  prompts/guion-informe.md requisito por requisito como cualquier otra pieza.

Recorrido del prompt, lo que se midió en esta corrida y no solo se leyó:

1. Formato de salida completo y en orden: "Título sugerido:" (línea 1),
   "Descripción sugerida:" de dos frases y sin lista de fuentes (línea 2), las
   tres carátulas (líneas 3 a 5), "Clima de carátula: institucional" (línea 6),
   "Guion:" (línea 7) y "Fuentes:" (línea 167).
2. Carátulas: las tres son de la noticia de portada y cada mitad cabe en
   cuatro palabras o menos (3 y 3; 3 y 4; 4 y 4). Los tres enfoques que pide el
   prompt están: pregunta, contradicción y cifra con referencia.
3. "La noticia del día" abre el guion antes de la Apertura, con dos frases y
   33 palabras contadas (dentro del rango de 25 a 35), una sola marca de
   tarjeta ([TESIS]) y su [FUENTE]. Sin saludo ni preámbulo.
4. Apertura: 39 palabras contadas, dentro de las 40. Sitúa la fecha, adelanta
   tres asuntos de "En una mirada" (Frei, la querella por el femicidio y
   Brasil) y no repite la noticia ya dada. El 04-10-2026 es domingo,
   comprobado en esta corrida, así que "Es domingo cuatro de octubre" es
   correcto.
5. Las once [TESIS] medidas una por una: la más larga es la del femicidio de
   Renaico con 18 palabras, justo en el tope. Todas llevan su línea en blanco
   antes del párrafo narrado, comprobado en las once.
6. [FUENTE]: la llevan los once bloques de noticia, incluido "La noticia del
   día", y no la llevan Apertura, En titulares, Dato curioso, Agenda ni Cierre,
   que es exactamente lo que pide el prompt. Todas vienen del informe.
7. Categorías entre corchetes en los once bloques de noticia, las seis de
   estructura sin corchete. El sistema frontal va en `clima` y no en
   `emergencia`, que es lo correcto: es pronóstico, sin víctimas, sin
   evacuados y sin alerta declarada.
8. Árbol de tipos de [DATO]: siete marcas, cinco `cifra`, una `cambio` y una
   `comparacion`. El paso de 19.963 a 7.207 es el mismo indicador en dos
   momentos, así que `cambio` es la fila que gana; los 168 denunciados contra 1
   sancionado son dos valores de la misma familia, así que `comparacion`. Las
   cuotas de variedad se cumplen: nunca más de dos `cifra` seguidas (el máximo
   es dos), tres tipos distintos, un [ESQUEMA] y una `comparacion`, que es lo
   que exige una edición de ocho o más noticias.
9. Titulares: los 23 medidos palabra por palabra, ninguno pasa de 12 y cada uno
   va en su propia línea. La entrada fija "Y en titulares:" está sola en su
   línea (línea 127). El matiz se conserva donde el informe lo pedía: "La
   Fiscalía pide prisión preventiva", "El senador Carter insiste en que", "Los
   gobernadores advierten riesgo", "Neuquén negocia", "La Universidad Austral
   avanza". Y el verbo de trámite se respeta en "La Contraloría tomó razón",
   que es el trámite que efectivamente ocurrió.
10. Orden del cierre del video: "En titulares" después del último bloque
    narrado, luego el dato curioso, luego la agenda con tres hitos y luego el
    cierre. Es el orden que manda el prompt.
11. Extensión por peso: las siete [B] narradas quedaron entre tres y cinco
    frases, contadas una por una. Las tres [A] llevan desarrollo completo.
12. Redondeo en voz: ningún número hablado pasa de tres cifras significativas.
    Los 36.876 millones de pesos quedaron solo en la marca [DATO] de la línea
    70 y no se narran, que es justo para lo que existe esa marca. Los 7.207 se
    narran como "más de siete mil doscientos".
13. Comparativos y superlativos: el único que aparece, "el día más lluvioso
    del episodio" (línea 121), está textual en el informe (línea 125). No hay
    ninguna afirmación sobre serie histórica que el informe no sostenga.
14. Estilo: sin rayas largas ni medias en todo el archivo, sin conectores de
    ensayo escrito, sin "no solo, sino", sin URLs ni paréntesis en la prosa
    narrada, y sin ninguna frase que narre ausencia de noticia. Las cuatro
    búsquedas se corrieron explícitas sobre el archivo completo.
15. Cierre: una sola frase de síntesis con hechos concretos (la beca, Frei y la
    querella), la línea "Para salir hoy" integrada en la despedida tal como en
    las ediciones ya aprobadas, el canal nombrado con variación ("Nos vemos
    mañana en Entender Chile") y el tagline exacto "El resumen sin gritos."
    como última frase hablada.
16. Siglas en pantalla: ninguna sin expandir. El guion escribe "Dirección de
    Presupuestos" y no "Dipres", y "Contraloría" entera. En la narración,
    Confech, Junaeb, el PCC y "Yo elijo mi PC" quedan explicados la primera vez
    que se usan.
17. [SIN DIBUJO] se usó una sola vez (línea 84), sobre el párrafo que nombra a
    la PDI y al tribunal en un hecho que es un femicidio. Es el caso (a) del
    prompt y está dentro del tope de dos por edición.
18. Fuentes: la lista cubre las fuentes de las siete marcas [DATO], la de la
    [CITA] y las de los once [FUENTE], comprobadas una por una. Ningún archivo
    interno del sistema en la lista, y ninguna fuente nombrada en la prosa que
    quedara sin línea, porque la prosa no nombra medios.
19. Monetización y aptitud para anunciantes: el femicidio y el caso de
    Carabineros van en registro sobrio y sin detalle gráfico, y la presunción
    de inocencia queda dicha donde corresponde ("El imputado no está
    formalizado", línea 85; "Rubio no está formalizada, y nadie en la causa
    está formalizado ni condenado", línea 50). Título, apertura y las tres
    carátulas van sin clickbait, sin morbo y sin sospecha sin fallo.
