VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-03T05:40:15Z

Observaciones:
- Para la pieza siguiente: la carátula del día no va a salir de la máquina.
  contenido/caratulas/2026-11-03-NO-PUDE.md declara que las tres variantes
  inventaron un rostro y lo presentaron como Fernando Rabat, sin imagen de
  referencia, y por eso se descartaron. Está bien resuelto: el prompt dice
  que una imagen que no salió jamás puede frenar un informe, así que la
  edición sigue con la carátula de respaldo. Queda dicho acá porque es lo
  único visible del día que no se produjo, y porque el caso (una portada cuyo
  hecho gira sobre una persona nombrada) se va a repetir.
- "Imacec" se pinta en pantalla en la etiqueta del [DATO comparacion] de la
  línea 41 y su expansión, "Indicador Mensual de Actividad Económica",
  aparece después, en el párrafo narrado de la línea 43. No se cobra porque
  la regla 17b salva las siglas de uso corriente, y en Chile Imacec se lee
  sin traducir como IPC o PIB. Expandirla en la propia etiqueta quitaría la
  duda.
- Las etiquetas del [DATO barras] de la línea 31 ("TomArte por restituir",
  "Fibra por restituir", "Campamento de Ideas por restituir") cumplen el
  rango de tres a ocho palabras y sitúan la cifra; agregar "al fisco" las
  haría entender solas con el video en silencio.

Lo verificado en esta vuelta: el diff contra la versión anterior toca UNA
sola línea, la quinta, y es exactamente el único INCUMPLE de la vuelta 1. La
corrección no introdujo nada nuevo, así que por la regla de convergencia no
vuelve ningún hallazgo sobre partes que la vuelta anterior no marcó.

La carátula 3 quedó "Rebajas de condena / Lo que se denunció": dos líneas
separadas por " / ", de tres y cuatro palabras (tope de cuatro); es un
segundo giro y no una cifra, como corresponde cuando la noticia no trae una
cifra que se entienda en un segundo; su enfoque es distinto al de la carátula
1 (la pregunta por la calidad de imputado) y al de la 2 (ministro de Justicia
bajo investigación penal); trae el objeto de la noticia en la primera línea y
da la razón para entrar en vez de contar la conclusión, que era el defecto
cobrado. El gancho se comprobó contra el informe y no contra el guion: la
línea 20 de contenido/informes/2026-11-03.md dice "La denuncia se relaciona
con decretos de rebaja de condena cuestionados por parlamentarios", así que
lo que afirma el gancho es exactamente lo que afirma el informe. El dato del
delito va en el título ("denuncia de prevaricación"). Sin rayas en la línea
nueva.

Vuelven a correr limpios los dos controles mecánicos sobre la pieza
corregida: scripts/revisar-mecanico.js sin hallazgos, y
scripts/validar-tarjetas.js con 429 palabras narradas (rango de 420 a 600),
cuatro bloques con fuente y variedad OK, ninguna cuota rota ni marca
malformada.
