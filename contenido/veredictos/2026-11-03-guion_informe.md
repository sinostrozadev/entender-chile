VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-03T05:35:44Z

Correcciones:
1. Dónde: línea 5, "Carátula 3: Denuncia por prevaricación / Rabat figura
   imputado" · Regla: "Las tres son enfoques distintos: la primera, una
   PREGUNTA; la segunda, una CONTRADICCIÓN o un giro; la tercera, una CIFRA
   CON REFERENCIA (solo si la cifra se entiende en un segundo sin contexto) o
   un segundo giro si no hay cifra", y "La carátula tiene que dar la RAZÓN
   PARA ENTRAR, no contar la conclusión: el título ya dice el hecho" ·
   Debe quedar: una tercera carátula que sea un segundo giro (no hay en esta
   noticia una cifra que se entienda en un segundo), con un enfoque distinto
   al de la carátula 1 (la pregunta por la calidad de imputado) y al de la
   carátula 2 (ministro de Justicia bajo investigación), dos líneas separadas
   por " / " de máximo cuatro palabras cada una, con el objeto de la noticia
   en una de las dos líneas y con las palabras del informe. Hoy esa línea
   repite el título ("Rabat figura como imputado por denuncia de
   prevaricación") y cuenta la conclusión en vez de dar la razón para entrar.
   Sirve, por ejemplo, "Rebajas de condena / Lo que se denunció" (tres y
   cuatro palabras, apoyada en "decretos de rebaja de condena cuestionados
   por parlamentarios" del informe), u otra que cumpla la regla.

Observaciones:
- Para la pieza siguiente: falta la carátula del día. No están
  contenido/caratulas/2026-11-03.png ni
  contenido/caratulas/2026-11-03-prompt.txt, y tampoco
  contenido/caratulas/2026-11-03-NO-PUDE.md con el motivo. No bloquea (el
  prompt es explícito: una imagen que no salió jamás puede frenar un
  informe), pero al corregir el guion conviene dejar la imagen con su prompt,
  o el archivo NO-PUDE si el generador falló.
- "Imacec" se pinta en pantalla en la etiqueta del [DATO comparacion]
  (línea 41) y su expansión, "Indicador Mensual de Actividad Económica",
  aparece después, en el párrafo narrado de la línea 43. Se deja como
  observación y no como incumplimiento porque la regla 17b salva las siglas
  de uso corriente, y en Chile Imacec se lee sin traducir como IPC o PIB.
  Expandirla en la propia etiqueta quitaría la duda.
- Las etiquetas del [DATO barras] ("TomArte por restituir", "Fibra por
  restituir", "Campamento de Ideas por restituir") cumplen el rango de tres a
  ocho palabras y sitúan la cifra; agregar "al fisco" las haría entender solas
  con el video en silencio.

Lo verificado y conforme: selección de tres noticias según QUÉ SE NARRA (el
informe trae cuatro [A], se narran la portada y las dos [A] siguientes en el
orden del informe, y el Aedes aegypti de Iquique queda en la web); 429
palabras narradas (420 a 600, con scripts/validar-tarjetas.js); la noticia del
día con 31 palabras en dos frases, apertura con 26 y cierre con 60; "Este
martes tres de noviembre" calza con el 03-11-2026; fidelidad de cada cifra
contra el informe (0,2%, -12,1%, 1,9%, $456.000.000, $352.600.000,
$203.600.000, el 18-11-2026); tipos de tarjeta por el árbol (barras para tres
valores de la misma familia, comparacion para tres indicadores distintos de la
misma unidad, que gana por ser la fila de más abajo); un [ESQUEMA] para la
noticia de proceso; línea en blanco después de cada [TESIS] y cada [TESIS] con
18 palabras o menos; tagline exacto como última frase y "Para salir hoy"
integrada; la lista de "Fuentes:" trae las trece fuentes de las tres noticias
narradas, sin archivos internos del sistema; sin rayas, sin referencias
temporales relativas, sin superlativos ajenos al informe y sin conectores de
ensayo escrito; scripts/revisar-mecanico.js sin hallazgos.
