# Registro de decisiones

Formato de cada entrada: fecha - decisión - por qué - evidencia/fuente.

Este archivo cumple doble función: (1) memoria del proyecto, para no
re-litigar lo ya decidido; (2) registro del APORTE EDITORIAL HUMANO que la
política de contenido inauténtico del YPP exige poder demostrar
(support.google.com/youtube/answer/1311392). Se escribe corto y seguido; una
línea honesta vale más que un párrafo retórico.

---

## 2026-08-25 - Crear estrategia/ como base fundacional
**Qué**: carpeta con identidad, público, modelo de negocio, hoja de ruta y
este registro. **Por qué**: las definiciones estaban implícitas y dispersas
en prompts/ y README; las decisiones aguas abajo (títulos, tagline,
auspicios) necesitan una fuente de verdad, y el registro de decisiones es
además evidencia de cumplimiento YPP. **Evidencia**:
ideas/investigacion-crecimiento-2026-08-25.md, dimensión 6.

## 2026-08-25 - Tagline: "El resumen sin gritos"
**Qué**: tagline oficial del canal, para descripción, cierre de videos,
banner y bios. **Por qué**: nombra el diferenciador real (sobriedad frente
a matinales y redes) y es memorable; venía propuesta del backlog y Santiago
la eligió entre alternativas. **Decidió**: Santiago.

## 2026-08-25 - Público primario: "el ciudadano ocupado"
**Qué**: 25-55 años, trabaja, quiere informarse y entender en ~10 min por
la mañana. Manda en títulos, selección de temas y horario; el perfil
secundario (busca conceptos, llega a Claves) suma pero no desempata.
**Por qué**: calza con el producto principal (informe diario a hora fija)
y con el mejor CPM. **Decidió**: Santiago.

## 2026-08-25 - Identidad DECIDIDA
**Qué**: estrategia/identidad.md es la base oficial. Los ajustes de
Santiago fueron dos, ya aplicados: (1) cero jerga interna del pipeline en
documentos fundacionales (los pesos [A]/[B]/[C] se quedan en prompts/);
(2) cero rayas largas en todo el proyecto, con regla en los prompts para
que el contenido generado tampoco las use. **Decidió**: Santiago.

## 2026-08-25 - El trabajo de Claude se pushea directo a main
**Qué**: permiso explícito de Santiago para commitear directo a main, sin
rama intermedia ni PR. **Por qué**: main es lo que leen la automatización
de madrugada y el workflow; una rama paralela solo agrega fricción a un
repo de un solo dueño. **Decidió**: Santiago.

## 2026-08-25 - Observatorio de la plata pública: recopilar desde ya
**Qué**: se crea contenido/casos/ (dossiers vivos por caso de fondos
públicos mal usados, con reglas de rigor estrictas) y su actualización
diaria automática (scripts/casos.js en la madrugada). La recopilación de
datos queda decidida; el formato de publicación (reportaje mensual,
mega-informe, contador) queda en evaluación en ideas/evaluar.md.
**Por qué**: el seguimiento sostenido de casos es un vacío de los medios
grandes y calza con la identidad del canal; acumular primero permite
decidir el formato con material real. **Decidió**: Santiago.

## 2026-08-26 - "¿En qué quedó?" se publica en la web, automático por ahora
**Qué**: la sección tiene página propia (índice con el contador global y un
dossier por caso) y los dossiers se publican sin gate humano previo mientras
se valida el flujo; antes del lanzamiento se revisa si se activa el gate.
La actualización nocturna pasa de la API (sin key cargada, no corría) a una
rutina de Claude en la nube a las 03:00, antes del informe de las 04:00,
para que los hitos alimenten la alerta del día. **Por qué**: ver funcionar
el circuito completo con material real antes de sumarle fricción; la
presunción de inocencia y el estado procesal fechado ya están en las
reglas y en el aviso legal de cada página. **Decidió**: Santiago.

## 2026-08-27 - Jerarquía de lealtades: el ciudadano, después el país, nadie más
**Qué**: se explicita el orden cuando hay conflicto de intereses, y la regla
que se desprende: mostrar lo que pasa para que cada uno piense por sí mismo,
sin decir qué concluir. Sin adjetivos que juzguen y sin ironía (la ironía es
opinión disfrazada). **Por qué**: la imparcialidad estaba implícita en el tono
pero no como criterio de decisión; sin jerarquía escrita, el primer conflicto
real se resuelve por instinto. Es además la mitad de la propuesta de valor
del video frente a los canales de opinión. **Decidió**: Santiago.

## 2026-10-07 - La música de la Clave: mecanismo, no suspenso

**Qué**: se reemplaza la regla dura 30. La cama vuelve a correr bajo la
narración, de la que se había sacado el 27-08, pero con cuatro condiciones:
sale de los números de la propia pieza, va en dórico y sin terceras, es
golpeada y no frotada, y calla entera en los datos y en las secciones de duelo
o violencia. El sello re - la - re queda igual y es lo único idéntico entre una
Clave y otra. Queda prohibido el lenguaje del suspenso: trémolo, dron de
amenaza, riser, pulso que acelera.

**Por qué**: Santiago preguntó qué debería sonar un canal de información
ciudadana. La respuesta no salió del gusto sino de lo que el canal hace: cada
Clave le abre la tapa a un mecanismo, el sujeto es siempre un sistema y el
placer que ofrece es ver los engranajes. El suspenso dice "algo anda mal"; esto
tiene que decir "así funciona". De ahí sale la forma, que es proceso aditivo
con células que se desfasan, el sonido de un sistema con partes, y que además
calza con que la Clave ya es una explicación aditiva.

La escala es dórico y no menor por un motivo editorial, no estético: el menor
natural tiene la sexta bemol, que es la nota que lo vuelve triste y fatal, y el
mayor afirma. El dórico es ambiguo respecto del desenlace, o sea el modo mismo
se niega a editorializar, que es lo que pide la regla 2. Y la armonía va sin
terceras porque sin tercera no hay mayor ni menor, no hay veredicto: es el mismo
intervalo que Santiago eligió para el sello el 27-08.

Sobre el riesgo que motivó la regla original, el patrón de contenido
inauténtico de YouTube, la política apunta a la igualdad ENTRE videos (mismo
esqueleto, misma biblioteca, misma voz, cambiando el tema) y no a que haya
música. Un sello de tres segundos repetido es marca; una cama idéntica bajo
cada video sí es el patrón. Por eso la cama se genera por pieza y el sello no.
Verificado el 07-10-2026 contra fuentes externas, no contra la memoria del
repo.

**Decidió**: Santiago. **Detalle**: scripts/clave-musica.js y
scripts/motor-sonido.js, que llevan el razonamiento completo en sus cabeceras.

## 2026-08-27 - Voz, imágenes, datos y música
**Qué**: (1) La voz de prueba es **Azure AI Speech capa F0**: gratis
permanente, uso comercial permitido y el único proveedor con voces de español
de Chile (es-CL Lorenzo y Catalina). ElevenLabs queda solo para clonar la voz
de Santiago más adelante. (2) **Cero imágenes** en el video: ni fotos ni
generadas; la miniatura es tipográfica, hecha con remotion still. (3) **Sí a
los datos abiertos del Estado (CC0) y a los mapas vectoriales de la BCN**
como material visual propio. (4) La **música pasa de cama a puntuación**
cuando llegue la voz: silencio bajo la narración, música solo en el sello,
las transiciones y el cierre.
**Por qué**: Azure resuelve el bloqueo de la voz a costo cero y con acento
chileno real. Sobre las imágenes, el hallazgo decisivo no fue la divulgación
(las miniaturas con IA no la requieren) sino que el ejemplo textual de la
política de contenido inauténtico describe casi este proyecto: "misma música
de fondo e imágenes de IA repetidas, con cada video leyendo un guion de IA".
Tenemos dos de los tres elementos; sumar imágenes generadas nos acercaría al
patrón. La música fija era el tercero, y por eso también cambia.
**Decidió**: Santiago. **Detalle**: ideas/voz-opciones.md,
ideas/imagenes-y-recursos.md, plan en estrategia/plan-produccion.md.

## 2026-08-27 - La música del canal se genera por código

**Qué**: el sello, las cortinas de sección y el cierre se sintetizan con
`scripts/sonido.js`, no se descargan de ningún banco. Un solo motivo de tres
notas (re - la - re) con variaciones. Las cortinas visuales de sección son
tipográficas, duran 1,1 s con presupuesto duro, y quedan apagadas hasta que la
narración traiga la pausa que las hace posibles.
**Por qué**: música que salió de nuestro código no la puede reclamar Content
ID, y una reclamación bloquea la monetización del video entero aunque sean dos
segundos. Además es coherente: el canal se produce por código, la música
también. Las tres variantes de cortina existen para que la repetición no sea
mecánica, que es la señal que estamos evitando.
**Decidió**: Santiago pidió las melodías cortas entre secciones, apertura y
cierre. **Detalle**: ideas/sonido-y-transiciones.md.

## 2026-08-27 - Dos voces por rol, y la clonación queda aparcada

**Qué**: se usan Catalina y Lorenzo en el mismo video, pero **no alternando
noticia por noticia**: la narración va en una voz y las citas textuales en la
otra, para que la frontera de la palabra ajena se oiga sola. Clonar la voz de
Santiago sale del camino crítico.
**Por qué**: dos voces cuestan lo mismo que una en el plan F0 (el presupuesto
se mide en caracteres), y el cambio de voz solo vale si significa algo; una
rotación mecánica suena a anuncio de aeropuerto y es justo el patrón
plantillado que queremos evitar. Sobre la clonación: **corrige la decisión del
2026-08-25** que la trataba como requisito de monetización. Es falso: YouTube
evalúa aporte humano, no timbre; una voz clonada sigue siendo sintética. Costaría
plata todos los meses para resolver un problema que no tenemos, y una voz neutra
es más coherente con "no te decimos qué pensar" que la voz de un dueño.
**Se reabre si**: hay evidencia concreta (comentarios preguntando quién habla,
caída de retención al entrar la voz, o Santiago quiere aparecer en cámara).
**Estado**: propuesto por Claude a partir de la pregunta de Santiago, pendiente
de su confirmación. Es la disputa 2 de `REGLAS-DURAS.md`: la cierra Santiago
y esta entrada se actualiza. **Detalle**: ideas/voz-opciones.md.

## 2026-08-28 - No se publica hasta cerrar cinco condiciones, y la sesión de día pasa a solo lectura

**Qué**: (1) No se sube ningún video hasta resolver cinco cosas: el video no
convence visualmente, no hay voz, el criterio de selección deja fuera
noticias importantes, todavía se nota la IA en los informes y todavía hay
errores en ellos. La lista vive en `bitacora/PENDIENTES.md`. (2) La sesión
en la nube pasa a **solo lectura**: analiza, recomienda y escribe en
`bitacora/`, pero no toca prompts, scripts, workflows ni `src/`. Todo cambio
lo ejecuta la sesión local. (3) Se crea `bitacora/` y la skill del mismo
nombre como puente entre ambas sesiones.
**Por qué**: la auditoría de esa mañana recomendaba crear el canal y empezar
a publicar ya, con el argumento de los 157 días que quedan hasta el
1-feb-2027. Santiago decide que publicar un producto que todavía no le
convence gasta el lanzamiento una sola vez y lo gasta mal. Se conserva una
parte de la recomendación: reservar el handle no es publicar y no cuesta
nada. Lo de solo lectura viene de que dos sesiones editando el mismo repo ya
provocó trabajo duplicado el 26-08.
**Decidió**: Santiago. **Detalle**: bitacora/README.md, bitacora/PENDIENTES.md.

## 2026-08-28 - "¿Lo cumplió?": el criterio se congela ANTES de ver las promesas

**Qué**: el criterio de la sección de seguimiento de promesas de campaña
(umbral de tres condiciones, tamaño 30 a 50, estados, protocolo de
extracción) queda congelado y fechado antes de leer la lista real del
Servel; la línea base se extrae después, con ese criterio y no otro.
**Por qué**: si el criterio se define mirando las promesas, la selección es
acusable de sesgo desde el primer día; congelarlo primero es lo que hace la
sección defendible. **Decidió**: Santiago. **Evidencia**:
estrategia/seccion-lo-cumplio.md ("criterio congelado el 28-08-2026").

## 2026-08-29 - El informe crece, el guion resume y nombra todo

**Qué**: (1) El informe web pierde el tope de cantidad y de largo: el
recorte por duración se muda al guion, que es quien paga minutos. (2) Toda
[A] responde una pauta de cinco preguntas (qué pasó, quién dice qué,
antecedente, qué viene, escala humana), omitiendo en silencio las que no
tienen respuesta verificable; en prueba. (3) Todo lo preseleccionado
verificable entra al menos como línea de "Además, hoy", que queda sin tope:
"espacio" y "menor" dejan de excluir del informe. (4) El guion suma el
bloque "En titulares" antes del cierre: una frase por noticia no narrada,
nada del informe queda sin sonar en el video. (5) La duración deja de ser
promesa fija: objetivo ~10 minutos, tolerancia 12-13 en días cargados.
**Por qué**: la [A] principal del 29-08 tenía 220 palabras y dejaba al
lector a medias; 13 noticias verificables se botaron por espacio sin dejar
línea; y el tope del informe existía por el video, que la web no paga.
**Decidió**: Santiago. **Detalle**: archivo/bitacora/2026-08-29-propuesta-informe-largo.md.

## 2026-08-30 - LANZAMIENTO: se abre la puerta de salida

**Qué**: el canal empieza a publicar. Ritmo inicial: 2 videos (informe y
Clave) y 2 Shorts al día, espaciados a lo largo del día, no juntos: informe
en la mañana (06:30-07:00, el horario declarado), Clave a mediodía, Shorts
en la tarde. Toda pieza se sube marcando la divulgación de contenido
sintético, y el título del Short nombra la noticia que recorta, no la
edición. Publicar sigue pasando por el gate humano: las piezas suben en
privado y el clic final es de Santiago.

**Qué cierra**: la decisión del 28-08 ("no se publica hasta resolver cinco
condiciones") queda cerrada por el propio Santiago, que las dio por
resueltas tras el trabajo del 29 y la madrugada del 30: voz chilena de Azure
operativa (el Short del 29 salió con es-CL y cortinas), canal de YouTube
creado y conectado por OAuth con prueba real de subida privada
(youtu.be/jsr27ZICuQ4 y youtu.be/y-EyhOlc_sU), miniatura automática,
fondos nuevos, criterio de selección con rastro de descarte auditable, y
las reglas del informe largo acordadas el 29.

**Sobre el volumen**: 2+2 diarios no es spam. La política de spam de YouTube
castiga engaño (metadatos y miniaturas que mienten), no cantidad; los
canales de noticias suben decenas de piezas al día. El riesgo real sigue
siendo la política de contenido no auténtico, y esa se mitiga con lo que ya
está construido: variación diaria real, música propia por puntuación,
registro editorial (este archivo), revisión diaria y el trabajo original del
observatorio. Subir cuatro piezas variadas deja mejor parado que subir una
plantillada.

**Contexto del objetivo**: quedan 155 días para el 1-feb-2027, cuando el
umbral del YPP se duplica. El contador de horas vistas parte hoy desde cero.

**Decidió**: Santiago. **Detalle**: bitacora/2026-08-29.md (partes quinta y
sexta), bitacora/PENDIENTES.md.

## 2026-08-30 - La voz del canal queda operativa y aprobada; fondos generados en las carátulas (decisión de hecho)

**Qué**: (1) La voz de producción es **Azure es-CL-LorenzoNeural**, en el
aire desde la edición del 30-08. Santiago la aprobó al escucharla ("la voz
quedó genial") con dos ajustes suyos: la narración entra DESPUÉS del sello,
y desde el 31-08 va 10% más pausada (`AZURE_RATE=-10%`). El 01-09 decidió
además que la promesa diaria no se recorta por costo: existe el respaldo S0
automático (~US$6/mes de exceso) en vez de grabar solo lunes a viernes.
(2) **Fondos generados con Gemini** (mapa marino, líneas verdes, banner)
entraron ese día a miniaturas, banner, portadas del podcast y fondos de los
Shorts, generados por Santiago. Es una decisión DE HECHO que exceptúa
parcialmente el "cero imágenes generadas" del 27-08 y quedó sin registrar:
formalizar la excepción (solo carátulas y fondos verticales, nunca dentro de
las tarjetas del video) o volver atrás es la **disputa 1 de
`REGLAS-DURAS.md`** y la cierra Santiago.
**Decidió**: Santiago (voz, en conversación del 29-08 al 01-09; fondos, al
generarlos y aprobar su uso el 30-08).

## 2026-08-31 - Regla de infraestructura: el cron de GitHub no se usa como reloj principal

**Qué**: ningún proceso del canal depende del cron de GitHub Actions como
mecanismo principal de disparo. Para todo lo que necesita hora fija se usan
las alternativas ya verificadas en este proyecto; el cron de GitHub queda
permitido solo como red de respaldo de algo que ya tiene otro disparador.

**La evidencia, medida aquí y no en teoría**:
- Cron de GitHub: atrasos de 24 a 36 minutos en días buenos; 10 a 12 horas
  el 27 y 28 de agosto; un día no corrió nunca (edición del 28); y el
  workflow de métricas, creado el 30-08 con cron de las 13:00 UTC, lleva
  **cero ejecuciones en su vida**.
- Alternativas verificadas: disparo por **push** (54 de 54 en el workflow de
  la web; es también como funciona el render, con la revisión de timbre);
  **rutinas de Claude en la nube** (revisión puntual al minuto durante
  cuatro días seguidos; el patrón "despertador" que salvó al barrido: la
  rutina pushea un archivo y el push dispara el workflow); y las **tareas
  programadas de ChatGPT** (quince entregas, una sola falla, y fue de
  escritura, no de reloj).

**La receta que ya funciona**, para cualquier proceso nuevo con hora: rutina
de Claude a la hora deseada (en UTC que sirva en los dos regímenes horarios
de Chile) que pushea un archivo despertador; el workflow escucha ese push y
además conserva su cron como red. Si el proceso no necesita hora sino orden,
disparo por push del artefacto anterior, que es como quedó encadenada la
edición entera.

**Pendiente de aplicar en**: metricas.yml, el único proceso que hoy sigue
colgando del cron de GitHub como reloj principal.

**Decidió**: Santiago, 31-08-2026, tras el hallazgo de que métricas nunca
corrió. **Detalle**: archivo/bitacora/2026-08-28-investigacion-cron.md (la medición
original de los tres relojes) y bitacora/PENDIENTES.md.

## 2026-09-01 - Comentarios: se responde siempre, cálido y sin pedir nada

**Qué**: todo comentario del canal se responde el mismo día, con calidez y
sin pedir nada a cambio (ni suscripción, ni like, ni "comparte"). El primer
comentario real ("hola" en el Short del 30-08) se respondió así.
**Por qué**: la interacción temprana es la señal más barata para el
algoritmo y la más honesta con la audiencia; pedir cosas en la respuesta es
exactamente el tono de "gritos" del que el canal se diferencia.
**Decidió**: Santiago, 01-09-2026.

## 2026-09-01 - El tipo de tarjeta lo decide la forma del dato (árbol aplicado)

**Qué**: el guion elige el tipo de cada tarjeta con un árbol mecánico
(cuántos valores hay y qué relación tienen), con cuotas de variedad como
alarma que nunca justifica inventar un dato, y un contador
(`scripts/validar-tarjetas.js`, paso 2c de la edición) que audita la salida
de cada guion. Antes de aplicarlo se probó a mano contra las 31 marcas de
las ediciones del 29-08 al 01-09: nunca empeoraba y mejoraba 4.
**Por qué**: pedido de Santiago del 01-09 ("hay que súper validar las
reglas... quizás un algoritmo"): con once tipos ofrecidos y libertad, el
modelo usaba `cifra` en 11 de 14 marcas. Una regla mecánica es auditable;
"más variedad" es gusto. Resultado del primer día (02-09): de 4 a 6 tipos
usados y la cifra bajó de 11 a 3.
**Decidió**: Santiago (el pedido); el árbol y la validación, la sesión de
la noche del 01-09. **Detalle**: ideas/tarjetas-cuando-usar-cada-una.md.

## 2026-09-02 (noche) - Nueve de las diez disputas de REGLAS-DURAS, cerradas

**Qué**: Santiago cerró las disputas 2 a 10 adoptando la recomendación
presentada; la 1 (imágenes generadas) queda abierta hasta ver los fondos por
sección en video. En una línea cada una:
- **2 · Voz clonada**: NO es requisito de monetización; se reabre solo con
  evidencia (comentarios preguntando quién habla, caída de retención, o
  Santiago quiere aparecer). Cierra la decisión 13 del 27-08.
- **3 · Titulares**: tope de LARGO (12 palabras por titular), no de
  cantidad; "todo lo del informe suena" se mantiene. La opción A (tope de 8)
  solo si la B no baja el bloque de dos minutos.
- **4 · El clima**: excepción declarada a la identidad: UNA frase casual en
  la despedida, nunca una sección; con dos localidades (IMAGEN 3).
- **5 · "¿En qué quedó?"**: por HITO, no por calendario.
- **6 · La Clave es DIARIA** (corregido el contrato: el guionista que no
  encuentra entrega deja SIN-ENTREGA.md con evidencia). El "ajuste de
  tiempo" que pidió Santiago era la DURACIÓN: la Clave un poco más corta
  (aclarado el 02-09 tarde en la noche; guion-claves pasa de 7-12 a 6-9
  minutos, 900 a 1.400 palabras).
- **7 · Una sola auditoría matinal**: la escribe la RUTINA de las 09:30
  (`prompts/auditoria-matinal.md`) en `bitacora/FECHA-auditoria.md`; la
  sesión de día la LEE y profundiza sobre ella, ya no la reescribe.
- **8 · Hora de publicación**: una sola tabla, la de `ideas/viralizacion.md`
  (07:30 informe y su Short, 13:00 la Clave y el suyo, 10:00 los fines de
  semana); los demás archivos la citan.
- **9 · La base de series la alimenta el agente de guardia** (el sucesor
  del vigía), que ya revisa los datos publicados.
- **10 · La cortina**: no era disputa sino redacción: dura 1,1 s Y ese
  segundo define la tira de capítulos; las dos cosas se escriben juntas.
**Decidió**: Santiago, 02-09-2026 en la noche. **Detalle**: REGLAS-DURAS.md
(sección final); la limpieza de las versiones perdedoras es parte de las
noches 2 y 3 del orden del repo.

## 2026-09-03 - Disputa 1 cerrada: las imágenes generadas entran, como identificadores y con variación diaria

**Qué**: se formaliza la excepción a la decisión del 27-08 ("cero
imágenes"). Las imágenes generadas propias (estilo grabado lineal, paleta de
la casa, hoy 11: diez de sección + la piel del Short urgente) se usan SOLO
como identificadores de serie y de sección: cortinas de 1,1 s, pieles de los
Shorts, carátulas y cabeceras de la web. Nunca son el contenido: las
tarjetas de datos siguen siendo tipográficas y ninguna cifra grande lleva
textura detrás. Al entrar a producción llevan VARIACIÓN DIARIA POR CÓDIGO
(encuadre, desplazamiento y tinte sembrados con la fecha).
**Por qué**: el ejemplo textual de la política de contenido inauténtico de
YouTube es "mismas imágenes de IA repetidas + guion de IA + voz sintética",
y el canal ya tiene dos de los tres elementos; el riesgo se maneja usando
las imágenes como el SET de un noticiero (identidad, no contenido) y
haciendo la variación verificable por construcción. Estéticamente, el
formato puramente tipográfico ya había mostrado su límite: quince capítulos
idénticos en la tira y monotonía visual medida (análisis del 02-09).
**Decidió**: Santiago, 03-09-2026, tras ver las once imágenes, el video de
prueba de fondos y el demo del Short urgente. **Regla resultante**: la 29 de
REGLAS-DURAS.md, reescrita.

## 2026-09-20 - La carátula da la razón para entrar: dos líneas en cajas, cobre y tinta

**Qué**: la carátula del informe deja de contar la conclusión en tono de
comunicado sobre el mismo mapa (la del 15-09, "54 años sin contagios", fue
el ejemplo) y pasa a la forma que Santiago señaló como referencia: una
pregunta o una tensión con algo en juego, dos líneas grandes en mayúsculas
sobre cajas de alto contraste, y la lámina del tema sin velo. El guionista
escribe TRES carátulas (pregunta, contradicción, cifra con referencia), cada
una de dos líneas de hasta cuatro palabras; la primera sale al aire y las
otras dos van al release para la prueba A/B de YouTube Studio. Medido antes
de decidir: de 100 personas que entran a un largo, ~50 se van antes del
segundo 40, y los largos de la cadena v3 tenían 12, 9, 2 y 0 vistas: el
problema era la puerta.

**Decidió**: Santiago, 20-09-2026, sobre un tablero con las tres últimas
ediciones reales, la carátula que salió y tres ganchos nuevos por edición
("me gusta, y cobre y tinta"). **Paleta: casa** (cobre y tinta), no el
amarillo de la referencia. **Rige desde la edición del 21-09.** Las carátulas
ya publicadas no se tocan. Regla en `prompts/guion-informe.md`; composición
`MiniaturaV3` en `src/marca.tsx`; aviso en `validar-tarjetas.js`.

## 2026-09-13 - La cifra preliminar del 11-09 se deja como está

**Qué**: el informe y la Clave del 11-09 cerraron la primera tanda de
remociones del Poder Judicial con "tres jueces removidos y 25 absueltos", un
recuento preliminar tomado mientras el pleno todavía deliberaba y que además
no cuadraba con los 25 cuadernos revisados (3 más 25 son 28). Las auditorías
del 11, 12 y 13-09 lo marcaron HOY y pidieron corrección a la vista con nota
fechada, según la regla dura 11.

**Decidió**: Santiago, 13-09-2026, frente a la propuesta de corrección: se
deja como está. Queda anotado que el recuento final ya está publicado en la
edición del día siguiente, `contenido/informes/2026-09-12.md` líneas 16 y 20
(once removidos, 26 remociones rechazadas, diez expedientes suspendidos),
con la frase explícita "el recuento de once reemplaza la cifra preliminar de
tres". **Consecuencia para la auditoría de la mañana**: el caso está cerrado
por decisión, no pendiente; no volver a marcarlo HOY.

**Dato que apareció después, la misma noche**: la corrección ya estaba escrita.
El **PR #5** ("Corrección 2026-09-11: cifra de jueces removidos/absueltos no
cuadraba") está abierto desde el 11-09 a las 06:29, con los cuatro archivos
corregidos, y lo abrió la propia revisión editorial que rechazó esa edición.
Ninguna de las tres auditorías lo mencionó: las tres miraron solo `main`, donde
efectivamente no había ningún commit. Queda como decisión aparte para Santiago:
fusionarlo o cerrarlo. Lección para la auditoría: un trabajo que existe en una
rama no aparece mirando main, y proponerlo de nuevo cada mañana es trabajo
duplicado.

## 2026-09-23 - Lo que requiere entrar a las páginas o hacer una imagen, lo hace GPT
**Qué**: Claude no navega. Cuando una rutina de Claude necesita leer una
página, deja `contenido/urgente/PEDIDO-<slug>.md`; el workflow
`pedido-gpt.yml` despierta a GPT por el PR #6; el despachador lo manda a
`prompts/lector-gpt.md`, y GPT deja `FUENTE-<slug>.md` con citas
textuales. Claude redacta solo con esas citas, y `verificar-expres.js` las
acepta como material permitido. Las imágenes siguen la misma regla; su
prompt se escribe cuando se defina en qué piezas van. **Por qué**: la
guardia de las 16:14 cazó la Ley Antibarricadas 2.0 con tres titulares y
nada más; sin saber qué contiene el proyecto, el Short quedó sin ángulo.
Que la lectura quede escrita mantiene la regla del 07-09 (ningún dato de
memoria). **Decidió**: Santiago.

## 2026-09-26 - El tema de la semana reemplaza al banco diario
**Qué**: se elimina la etapa diaria `alimentar_banco` y se congela
`contenido/claves/banco-temas.md`. En su lugar, un script barre los informes
de lunes a sábado y puntúa cada tema por repetición ponderada por nivel ([A]
pesa 3, [B] 2, [C] 1), con bonificación por marca de seguimiento, por cada día
extra en que el tema volvió y por tener dossier previo en `contenido/casos/`.
Con ese ranking, Claude escribe el domingo TRES candidatos, Santiago elige uno
y la Clave de esa semana sale el miércoles contando la historia completa del
asunto: de dónde viene, por qué hitos pasó, cómo funciona el mecanismo y qué
está en juego.

**Por qué**: Santiago, textual: "el banco de temas, cambiemos la forma, lo
estamos llenando de temas que quedan ahí. Debe ser una selección de un tema
por día si es que lo hay y al final decidir sobre el tema de la semana y hacer
un video de la Clave de ese tema, explicando en profundidad y enseñando,
trayendo contexto, comienzo de la historia, cosas por las que ha pasado.
Debería ser sobre el tema que más se repitió en la semana. Hay que buscar una
forma de puntuar. Quizás ni siquiera se guardan los temas a diario: una vez a
la semana se hace un barrido semanal y puntuamos, los más relevantes o los más
repetidos, y me presentas los 3 temas ganadores para seleccionar sobre cuál
hablaremos." El banco tenía 100 temas y nadie elegía de ahí: acumular no era
decidir. La repetición, en cambio, es una señal que el propio canal produce
todos los días sin costo.

**Qué cambia**: la cadena diaria pierde una etapa y cierra en `videos_listos`
apenas están los videos (`scripts/estado.js`, `estado.yml`, `reintento.yml`).
`prompts/banco-temas.md` se retiró a `archivo/prompts/`. Entran
`scripts/semana.js` (determinista, sin tokens) y `prompts/tema-semana.md` (lo
ejecuta Claude, no GPT, para no gastar la cuota del despachador).
`scripts/clave.js elegir` toma el candidato en vez de una línea del banco, y
`aprobar` sin fecha usa el próximo miércoles. Los prompts de la Clave
(`clave-idea.md`, `guion-claves.md`, el MODO FLUJO de `claves.md`) pasan de
explicar una noticia a contar una historia con origen, hitos y mecanismo.
**Decidió**: Santiago.

## 2026-09-27 - La pauta antes de GPT, y la Bandeja del Taller

**Qué**: el flujo de la Clave gana un camino nuevo y el Taller una bandeja de
decisiones. Lo que Santiago aprueba ya no es la idea que escribía GPT, sino una
PAUTA que escribe Claude con todo lo que el video debe tocar y contener; recién
con su sí GPT trabaja, y su primer turno ya no es escribir sino INVESTIGAR con
fuentes. Etapas nuevas: `pautar` y `reparar_pauta` (Claude), `pauta_lista`
(Santiago), `pauta_aprobada`, `validar_investigacion`, `reparar_investigacion` e
`investigacion_lista`. En paralelo, `bitacora/bandeja.json` reúne todo lo que
espera decisión suya y lo muestran tres cosas: el módulo Bandeja del Taller (el
primero, con contador), el informe de la mañana y una notificación al teléfono
que se dispara cuando la etapa entra en `pauta_lista`, `idea_lista` o
`bloqueado_humano`.

**Por qué**: cuatro frases de Santiago, textuales. Sobre el contenido: "quiero
que la Clave semanal, del tema que se hable, te dé el contexto suficiente para
entender aunque no sepas nada: cómo inició, datos importantes hasta llegar a lo
que se sabe hoy, responder las dudas que se presenten, evaluar (solo si
corresponde) beneficios, riesgos, etc.". Sobre el orden de trabajo: "siempre,
antes de que envíes a trabajar a GPT, me presentes del tema todo lo que debe
tocar y contener, y cuando te confirmo recién avanzamos, para que GPT solo
trabaje cuando estamos seguros". Sobre el Taller: "crea en el Taller un sistema
de notificaciones: cuando algo necesita mi aprobación, que lo pueda ver ahí". Y
la cuarta, de la noche anterior: enganchar `prompts/investigacion-clave.md` al
flujo, que estaba escrito y huérfano desde que se creó.

Lo que estaba mal del orden viejo: cuando la idea de GPT no era la que él
quería, lo gastado era cuota de GPT y una vuelta entera de validación. La pauta
cuesta una lectura del repo y se corrige en dos líneas. Y una Clave que se
escribía solo con los informes del canal quedaba sin documentos, sin cifras
primarias y sin poder decir "esto no se pudo averiguar".

**Qué cambia**: `prompts/pauta-clave.md` (nuevo, ocho secciones con encabezados
fijos: qué es, cómo empezó, los datos hasta hoy, las dudas que hay que
responder, evaluación solo si corresponde, qué NO va, qué debe conseguir la
investigación, carátulas y duración). `prompts/clave-idea.md` queda solo para
el flujo viejo y se retira cuando cierre. El validador gana
`validar_investigacion` y, en `validar_entrega` y `validar_guion`, dos
comprobaciones nuevas contra la pauta: que las preguntas de su sección 4 estén
respondidas y que nada de su "Qué NO va" haya entrado. Entran
`scripts/bandeja.js` y `scripts/botones.js` (los enlaces a GitHub compartidos
por el Taller y la Bandeja, para que el mismo botón no apunte a dos rutas
distintas). Los dos caminos conviven: el flujo abierto ese día termina por el
viejo, porque cambiarle las etapas a mitad de recorrido lo habría dejado en una
etapa que ningún archivo sostiene. **Decidió**: Santiago.

## Decisiones previas, reconstruidas del repo (para que no se pierdan)

Nota (02-09): estas entradas son previas al 26-08 y se reconstruyeron
después desde el repo; dos traen su fecha propia y el resto quedó sin fecha
exacta, y así se conserva (inventarles fecha sería falsear el registro).

- **Firma epistémica del canal**: toda cifra con fuente visible en pantalla;
  chips HECHO (sólido) / INTERPRETACIÓN (contorno). (prompts/, src/tema.ts)
- **Sin secciones de trámite**: nada de pronóstico del tiempo como sección
  ni resumen deportivo de fecha - el canal explica, no cubre.
  (prompts/informe.md)
- **Acento visual único, apolítico**: verde pátina de cobre - chileno sin
  bandera. (src/tema.ts)
- **Pipeline automatizado con gate humano**: la máquina produce, el humano
  aprueba antes de publicar; escuchar el audio completo no se automatiza.
  (README.md, scripts/gate.js)
- **Serie doble**: Informe diario (hábito) + Claves (biblioteca evergreen,
  diaria, con banco de temas acumulativo). (prompts/claves.md)
- **prompts/ como única fuente de verdad de los prompts**; ChatGPT los lee
  del repo. (prompts/README.md)
- **2026-08-24 - Shorts y miniaturas automáticas aprobados** por Santiago.
  (ideas/ejecutar.md)
- **2026-08-25 - La voz clonada se trata como requisito de monetización**,
  no como mejora estética. (archivo/IMPLEMENTAR.md, política YouTube
  15-jul-2025; corregida por la decisión del 27-08 de dos voces, y hoy es
  la disputa 2 de REGLAS-DURAS.md)

---

## 2026-09-28 - Los tiempos del video se deciden en el plan, no en el que dibuja

**Qué**: el cálculo de cuándo se ve cada tarjeta se saca de `src/secuencia.tsx`
y pasa a `scripts/secuencia-plan.js`, que lo publica dentro del timeline
(`bloques[].tarjetas`, con `desde` y `hasta` en segundos desde el inicio del
bloque). El video ya no calcula ningún tiempo: los lee. Y el titular de sección
queda acotado contra la primera tarjeta, que es la otra cuenta que se hacía en
el que dibuja.

**Por qué**: Santiago reportó tres veces que al empezar cada sección se leían
dos textos superpuestos, y las tres veces el defecto llegó a YouTube. No era un
error de cálculo: era que la cuenta vivía en el único lugar donde no se puede
revisar sin rendir doce minutos de video. Eran además DOS defectos con la misma
cara, las tarjetas pisándose entre sí y el titular pisando a la primera, y por
eso arreglar uno no cerraba el reporte. Había una segunda razón para que no se
viera: la voz simulada de las pruebas separa las tarjetas casi medio segundo y
la voz real de Azure las deja pegadas, así que el defecto solo existía en
producción. Con los tiempos en el JSON, `scripts/validar-solapes.js` los revisa
en cada edición antes del render y sin rendir nada.

**Decisión de NO hacer**: el guardián avisa y NO bloquea la edición. Parar la
corrida por un traspaso feo cuesta el video entero de esa noche, cuando no hay
nadie mirando; el aviso queda en el log y se corrige al día siguiente. Si algún
día un solape vuelve a llegar al aire habiendo sido avisado, se revisa.

**Evidencia**: medido sobre la edición del 27-09-2026 con las tarjetas pegadas
como las deja la voz real: 34 pares superpuestos, 257 cuadros, más el titular
pidiendo 1,03 s de más en las diez secciones. Después del cambio, ninguno.

---

## 2026-09-28 - Se llaman FORMATOS, y los prompts se leen en el taller pero mandan desde el repo

**Qué**: lo que el taller llamaba "trabajos" pasa a llamarse **formatos**: el
informe diario, la Clave, los dos verticales, la web, la carátula. Y cada
formato muestra los prompts con que se escribe, con su texto completo, más un
campo "Por mejorar" donde se anota qué cambiarles.

**Por qué ese nombre**: "trabajo" no dice nada (el trabajo del día es otra
cosa). Se descartaron los dos candidatos obvios porque ya están ocupados:
**pieza** aparece 1.029 veces en el repo y significa dos cosas distintas, el
paso de la cadena (`PIEZAS` en `scripts/estado.js`) y el tipo de salida
(`pausas.js`); **serie** es el campo que identifica la pieza en YouTube
(`SERIE = "short-clave"`). Formato es la palabra de la televisión para
exactamente esto y no chocaba con nada del sistema: el único uso previo era
"formato de salida" y "formato de fecha", que son genéricos. Se renombró el
único ajuste que colisionaba, "formato del video", a "tamaño del video".

**Decisión de NO hacer, y es la importante**: el texto de los prompts **no se
edita en el taller**. Se lee ahí, y lo que se edita es la nota de qué hay que
cambiarle; el cambio real lo hace un commit en `prompts/`. El motivo es el de
`prompts/README.md`, que dice que esa carpeta es la única fuente de verdad:
editar un prompt es cambiar el comportamiento del canal desde la corrida
siguiente, y un cambio así sin diff, sin fecha y sin porqué es exactamente la
clase de error que costó dos ediciones el 28-09. Si el paso de la nota al
commit se hace pesado, se revisa.

**Decisión de NO hacer, menor**: la colección en la base y
`contenido/config/trabajos.json` conservan el nombre "trabajos". Renombrarlas
obliga a mover 77 documentos y a tocar el puente que hoy manda sobre el video,
para cambiar un nombre que nadie ve.

**Evidencia**: conteo de usos en el repo (pieza 1.029, serie 334, formato 213,
producción 254); `scripts/estado.js:46`, `scripts/pausas.js`, `scripts/short.js:50`.

---

## 2026-09-29 - Las imágenes de la biblioteca van oscuras, no en papel

**Qué**: la biblioteca de conceptos (las imágenes que reemplazan el texto
mientras habla el locutor) se dibuja en **línea hueso de trazo grueso sobre un
gris azulado muy oscuro y parejo**, y no en el papel claro de las imágenes de
sección.

**Por qué**: se generaron las dos y se montaron en un cuadro real del informe.
El video tiene un brillo medio de 77. La de papel sin velo llega a **228**, tres
veces más, y encendería la pantalla unas veinticuatro veces por edición; con el
velo que el video le pone a toda imagen el brillo calza en 72, pero entonces el
dibujo se apaga junto con la imagen y queda como un fantasma, que es lo que hoy
le pasa a las de sección y está bien para un fondo detrás del texto pero no
para lo único que hay en pantalla. La oscura queda en **51**, sin salto, y el
dibujo se lee entero.

**Lo que esto implica**: son **dos familias de imagen y no se pueden
intercambiar**. La de sección convive con el texto, va en papel claro y deja la
mitad izquierda libre. La de biblioteca lo reemplaza, va oscura y su motivo va
centrado ocupando el cuadro.

**Evidencia**: `archivo/contenido-biblioteca/pruebas/gobierno-papel.png` y
`gobierno-oscuro.png`, montadas con `archivo/src/muestra-biblioteca.tsx`. Prompts en
`archivo/contenido-biblioteca/PROMPTS-CONCEPTOS.md`.

## 2026-09-29 - Los emblemas del lugar se dibujan, y la línea es afirmativa

**La decisión**: en los prompts de la biblioteca se levanta la prohibición de
marcas y logotipos, para todos los conceptos y no solo para los lugares reales
nombrados. Y no se levanta quitando la línea: se reemplaza por una afirmativa,
porque quitar una prohibición deja al generador neutral y lo que hace falta es
que dibuje el emblema.

    LOS EMBLEMAS, ESCUDOS E INSIGNIAS QUE SON PARTE DEL LUGAR SÍ SE DIBUJAN:
    son lo que lo hace ESE lugar y no uno parecido.

**Por qué**: la regla siempre dijo, en `ESTILOS.md`, "ninguna marca ni logotipo
ajeno", con el acento en ajeno. Al bajarla al prompt quedó a secas y el
generador la leyó como total. Se midió el costo en congreso: la Sala de la
Cámara volvió con la testera despejada, sin el escudo nacional de mármol ni los
motivos de cobre, que son lo único que la distingue de cualquier parlamento
moderno del mundo. Le habíamos prohibido al generador lo único que hacía
identificable el lugar que le estábamos pidiendo identificar.

**Lo que NO se decidió, y queda escrito para que no se vuelva a proponer**: no
se prohíbe la marca comercial de un tercero en el prompt. Pasa a ser criterio de
revisión, que es donde corresponde bajo la regla 19: si vuelve una, se muestra y
decide Santiago. El riesgo que justifica mirarlo con cuidado es concreto y no es
pudor: una imagen de la biblioteca se reusa en muchas noticias distintas, así
que un logo de empresa la convierte en un aval o en una acusación sobre alguien
que esa noticia puede ni siquiera mencionar. Un escudo de institución pública no
tiene ese problema, porque el concepto ES esa institución.

**Quién**: Santiago, 29-09-2026, "levantemos la prohibición, para todo, no solo
para este caso".

**Evidencia**: las dos imágenes de congreso pasan la vara entera y ninguna
sirve; la testera despejada en `congreso-1`. Detalle en `bitacora/2026-09-29.md`
y el porqué largo en `archivo/contenido-biblioteca/ESTILOS.md`, regla 6.

## 2026-09-29 - La figura de espaldas entra, y solo donde la persona es el hecho

**La decisión**: la biblioteca puede usar una figura humana anónima, de espaldas
y sin rasgos, y el primer concepto que la usa es anuncio. No es una relajación
de la regla 29: esa excepción ya estaba escrita desde siempre y nunca se había
usado. Lo que se decide hoy es su límite.

**El límite**: la figura entra SOLO donde la persona es el hecho. Un anuncio es
alguien hablando, una marcha es gente caminando, una votación es gente votando;
ahí sacar a la persona es dibujar otra cosa. En todo el resto no entra, ni para
llenar un lugar que se ve vacío ni para dar escala, y no se hereda por parecido:
cada concepto que la quiera se decide aparte.

**Por qué el límite va antes del primer uso y no después**: el riesgo es de
acumulación y no de imagen. Una figura de espaldas es defendible una vez; treinta
llenan el canal de personas generadas, que es exactamente lo que la regla 29
existe para evitar. Un límite puesto después del décimo caso ya no frena nada.

**Y no se pide como silueta**, que era la palabra con la que salió la idea. El
entintado lleva cada píxel a su luminancia multiplicada por la tinta, así que una
forma oscura queda oscura y sobre el video, que es #15171A, desaparece. Está
medido con temporal, que a 91 de luminancia ya se hundía. Lo que sirve es una
figura de espaldas dibujada con el mismo achurado y la misma tinta clara que el
resto: no tiene cara porque le vemos la espalda, no porque esté a contraluz.

**Lo que NO se decidió**: no se abre la figura a los otros 85 conceptos, ni
siquiera a los que también son salas con gente (congreso, tribunales). Esos
quedan como están, desocupados.

**Quién**: Santiago, 29-09-2026, "y una silueta dando el anuncio?", y después
"dale, déjalo escrito".

**Evidencia**: regla 29 en `REGLAS-DURAS.md`, criterio en
`archivo/contenido-biblioteca/ESTILOS.md` regla 1, motivo en `archivo/scripts/vocabulario.js`.

## 2026-09-30 - La época la pone el motivo, no el estilo

**La decisión**: el bloque del estilo Grabado lleva ahora, arriba del estilo, una
línea que fija la época en el presente, subordinada a la referencia.

    LA ÉPOCA ES HOY. Salvo que el motivo nombre una cosa real, en cuyo caso manda
    la referencia, todo lo que se dibuje es de ahora. Lo único del siglo XIX es
    la TÉCNICA del dibujo, nunca lo que está dibujado.

**Por qué**: el estilo dice "grabado del siglo XIX", y con motivos genéricos el
generador leía eso como la época de la escena. "Un hemiciclo" volvió neoclásico
con faroles de gas; "una puerta de celda" volvió mazmorra. Los dos fallos tienen
motivo genérico y los tres aciertos de arquitectura tienen motivo que nombra una
cosa real: cuando se nombra, la foto de referencia ancla la época.

**La evidencia es una prueba controlada**, no una impresión: la misma celda
pedida dos veces, mismo motivo y mismo estilo, cambiando solo esta línea. Sin
ella, mazmorra; con ella, puerta de plancha metálica y hormigón pintado. Las dos
quedaron guardadas (`juicio-b.png` y `juicio-a.png`).

**Importa más allá de una imagen**: de los 79 conceptos que faltan, la mayoría
tiene motivo genérico, así que esto evita el mismo error decenas de veces.

**Lo que NO se decidió**: no se toca la regla de nombrar y callar. Para una cosa
real sigue prohibido describirla, porque describir le tapa al generador lo que ya
sabe. Describir la época solo corre donde no hay cosa real que nombrar.

**Y queda anotado un error de método**: esta línea se probó el 29-09 en
tribunales, no pareció servir y se jubiló; después se supo que ahí la época no
estaba mal, porque las Cortes sesionan en un palacio de 1905. Se descartó
juzgándola en el único caso donde el problema que venía a resolver no existía.
Antes de descartar algo hay que mirar si el caso de prueba tenía el problema.

**Quién**: Santiago aprobó volver a probarla, 30-09-2026.

## 01-10-2026 · Las carátulas se liberan hasta donde se puede, y la regla 29 SIGUE

Santiago pidió carátulas sin restricciones y con más impacto, y dijo "la regla
29 ya no existe". Al leerla entera apareció que son TRES reglas distintas y que
cada una cita su propia consecuencia:

1. fotos ajenas jamás: "un reclamo de Content ID bloquea la monetización del
   video entero".
2. nada fotorrealista DEL HECHO: "obliga a la etiqueta de contenido sintético,
   la política de contenido inauténtico la persigue".
3. personas nunca: "en Chile la propia imagen está protegida" y "el castigo de
   la política de contenido sintético cae sobre el canal entero".

Con eso a la vista, Santiago decidió: **la regla 29 se queda**. Lo que se libera
es lo que se había prohibido por prudencia y no por una política.

**Se liberó**: lugares identificables (La Moneda, el Congreso, una plaza), logos,
marcas y banderas, el cobre dentro de la imagen, y la obligación de que fuera
una metáfora y no el objeto de la noticia. El prompt pide ahora máximo impacto y
mucho contraste.

**Se mantiene**: sin texto en la imagen, sin personas reconocibles, nada
morboso, fotos ajenas jamás, y la escena del hecho jamás. El límite se corrió
del LUGAR a la ESCENA: el edificio sí, el edificio con la marcha de hoy no.

**Por qué queda escrito acá**: para que la auditoría no vuelva a proponer ni
borrar la regla 29 ni reponer las prohibiciones liberadas. Las dos cosas se
discutieron con el texto de la regla delante.

## 01-10-2026 · La cifra gana una referencia, y no una tarjeta nueva

Mirando el primer párrafo del informe del 01-10 apareció que el árbol del [DATO]
elige por la FORMA del dato y nunca pregunta qué lo hace noticia: un número que
rompe una marca de cinco años y uno rutinario salían con la misma tarjeta.

Se decidió NO crear una tarjeta nueva. Una fila más en el árbol obligaría a GPT
a elegir entre cifra e hito, que es la decisión cara que se viene evitando desde
que se midió que la cuota de variedad falla sola. En su lugar, `dato-cifra` gana
un campo opcional: la referencia.

Se llama referencia y no marca a propósito: en este proyecto la marca es el
canal.

## 06-10-2026: la preselección pasa a Claude, y por qué solo ella

La cuota de cowork de GPT se agotaba al quinto día de los siete. Medido sobre
los disparos del repo: **8,3 turnos diarios** (preselección, informe, guion,
carátula, más 4,3 vueltas de corrección), o sea 58 a la semana del informe y
unos 64 con la Clave. La cuota muere alrededor del turno 45.

De todo lo que le pedimos a GPT, **la preselección es el único turno que no
necesita lo único que GPT hace y Claude no**, que es entrar a las páginas.
Selecciona del barrido, y el barrido ya está en el repo. Y estaba probado sin
que nadie lo probara a propósito: el 03, el 04 y el 06-10 la escribió el
suplente por plan B y pasó la validación igual.

Se decidió **NO** mover el informe ni el guion, aunque serían el ahorro grande.
Los dos necesitan abrir fuentes para verificar, y ese es exactamente el trabajo
que Claude no puede hacer desde la nube: el proxy de salida bloquea la web
abierta. Moverlos convertiría un problema de cuota en un problema de precisión,
y la precisión es el único activo del canal.

Se decidió **NO** usar el plan B para esto, aunque la máquina ya existía. El
plan B es temporal por diseño: vence al día siguiente y reintento.yml lo borra
para que GPT vuelva a ser el primero. Colgar una decisión permanente de un
archivo que se autodestruye cada mañana habría durado exactamente una noche. De
ahí `contenido/estado/reparto.txt`, que es permanente y se edita a mano.

Y una cosa que casi se nos pasa, anotada porque es el tipo de hueco que mata una
noche entera en silencio: la regla 20 y 20 de `reintento.yml` detecta que un
turno se colgó **mirando el evento del PR #6**, y las etapas del reparto ya no
emiten evento. Sin tocar eso, una preselección colgada no la habría reintentado
nadie y la cadena habría muerto en la primera pieza. Las etapas del reparto
tienen ahora su propio reintento, con tope de dos, porque en ellas no hay a
quién más llamar: no existe un plan B del plan B.

## 2026-10-12 - El informe pasa a 3 o 4 minutos

Santiago, 12-10-2026: "dejar el informe diario acortado a unos 3 o 4 minutos,
una Clave semanal, y mejorar los shorts y exprés". Este registro cubre la
primera parte, el informe; la Clave semanal y los Shorts van por separado.

Los números que lo decidieron: el video largo de 10 a 12 minutos junta entre
2 y 80 vistas, con 10 a 30% visto; la mitad de la audiencia se va antes del
segundo 40, y la pieza consume el 75% de la cuota de GPT. O sea, el formato
que más cuesta es el que nadie termina, y el barrido de titulares de la cola
(20 a 30 frases, casi tres minutos) eran los minutos que nadie veía.

Qué queda:

- **El video narra TRES noticias**: la de portada primero, después las otras
  [A] en el orden del informe, y si faltan, las [B] de mayor peso. Cada una con
  su sección completa en la secuencia del 24-09 (imagen de sección, cabecera,
  texto en bloques), más la noticia del día en frío, una apertura corta y un
  cierre de 40 a 60 palabras. 420 a 600 palabras narradas, 3 a 4 minutos de
  voz. Sin "En titulares", sin Dato curioso, sin Agenda, sin "¿En qué quedó?".
- **El informe escrito NO cambia**: sigue completo en la web, con todas las
  noticias. La descripción del video resume el día entero y lleva el enlace al
  informe completo (`scripts/dia.js`), y el cierre hablado manda a ese enlace.
- El Short y el exprés no cambian con esto.

Se decidió **NO** narrar las otras noticias "en una frase", que era la regla
del 30-08 (todo lo del informe suena en el video). Esa regla nació para que
nada quedara sin crédito, pero hoy la web hace ese trabajo mejor, con el texto
completo y las fuentes, y la frase suelta no la escuchaba nadie. La regla de
REGLAS-DURAS "3 · Titulares" (todo lo del informe sigue sonando) queda
superada por esta decisión para el video del informe.

Dónde vive: `prompts/guion-informe.md` (selección, largo, estructura y control
interno), `prompts/validador.md` (que el formato corto no es una omisión) y
`scripts/validar-tarjetas.js` (piso de 420, techo de 600, tres secciones, sin
la cola del formato largo). Probado con un guion corto del 12-10 escrito a mano:
446 palabras, 3,5 minutos con la voz simulada.

## 23-10-2026 · NO se construye un pre-validador que rechace piezas sin pasar por Claude

Santiago aprobó "el prevalidador" ese día, apoyado en mi estimación de que ahorraría
20 a 25% de los turnos de validación. Esa cifra era un techo. Antes de escribirlo se
midió contra los 76 veredictos CORREGIR del 24-09-2026 al 23-10-2026: desde el
08-10-2026 el chequeo mecánico solo habría atrapado algo en 1 de 33 rondas y no habría
evitado ninguna. Se decidió **NO** construirlo, y si la auditoría lo vuelve a proponer
la respuesta es esta medición.

Por qué tampoco conviene ampliarlo ya: lo que hoy hace volver una pieza son reglas de
criterio (cierre de cautela, autoverificación, cifra sin segunda fuente, etiqueta que
se entienda en silencio), no de forma. Y rechazar sin Claude tiene un costo que el
cálculo original no contaba: una ronda de corrección es una pieza reescrita entera por
GPT, cuya cuota también se agota; si el rechazo mecánico lista solo parte de los fallos,
la pieza vuelve una segunda vez por los de criterio y se suma una vuelta (el tope es 4).

Hallazgo lateral: la regla "no incluyas URLs" del prompt del guion del informe choca con
lo que el validador exigió el 23-10-2026 (agregar la línea de Contraloría "tal como la
trae el informe", con su dirección web). Una regla mecánica sobre URLs habría rechazado un
guion que el propio validador mandó dejar así. Se resolvió ese mismo día (entrada siguiente).

Lo que cambiaría la decisión: que una regla de forma vuelva a repetirse en 3 o más rondas
seguidas. Ahí se agrega esa regla a `revisar-mecanico.js`, que Opus ya corre al empezar
cada validación, sin tocar el flujo.

## 23-10-2026 · Las URLs van en "Fuentes:" del guion del informe

Santiago eligió que se queden (opción a). La descripción de YouTube las admite y
sirven a quien quiere verificar. `prompts/guion-informe.md` las prohíbe en el texto
narrado y en las marcas, y las permite solo en las líneas de "Fuentes:", tal como las
trae el informe. Se decidió **NO** recortarlas en `dia.js`.

## 2026-11-01 - Tomar el control: la meta, los Shorts, el largo por tema ("Entender el caso"), la hora, el gasto

Santiago decidió el 01-11-2026, sobre el análisis de ese día
(`bitacora/2026-11-01-analisis-y-plan.md`, con las métricas, la investigación
y el inventario del repo). Estas cinco decisiones mandan sobre cualquier texto
anterior, y REGLAS-DURAS (versión 2) ya las lleva.

**1. La meta de 2026 es construir audiencia, con los Shorts como producto
principal; ya no son las 4.000 horas.** Por qué: desde el 01-02-2027, quien no
esté dentro del Programa de Socios necesita 8.000 horas de largos o 20 millones
de vistas de Shorts en 90 días, y el canal hace 15,3 horas de largos en 30
días, así que ni la meta vieja ni la nueva estaban al alcance. Los Shorts ya
son el canal: del 01-10 al 01-11 hicieron 330 vistas diarias contra 22 de los
largos, los 15 videos más vistos del mes son Shorts o exprés, y el 78 % de los
minutos vistos del canal (2.444 de 3.130 en 30 días) son de Shorts. Lo que abre
cualquier camino después son los suscriptores, y a 0,8 por día faltan años.
Reemplaza la regla 39 del 30-08 (postular antes del 01-02-2027).

**2. La Clave deja de ser diaria y deja de ser semanal: pasa a ser el LARGO
POR TEMA, a juicio editorial.** Puede salir uno o dos el mismo día, de temas
distintos, o ninguno. Cada uno explica un caso desde su origen con la
información acumulada, y a un caso que avanza se le manda una actualización
cuando ya hay suficiente que explicar. El escenario visual es el diario
escrito: la página real del día en que salió cada noticia, con zoom a su
sección. Por qué: la Clave retiene casi el doble que el informe (39,7 % de
mediana contra 20,6 %, medido el 12-10) y su problema era la exposición, no la
pieza; un calendario fijo obligaba a elegir tema por la fecha y no por el caso.
Y el diario escrito ya es el archivo fechado de cada noticia, así que usarlo
como escenario muestra la fuente en vez de ilustrarla, sin pedir imágenes
nuevas. Reemplaza "la Clave es diaria" (02-09, disputa 6) y "una Clave semanal"
(12-10). Está en construcción: mientras no exista, el flujo de la Clave actual
(`estado-clave.yml`, mural) sigue con la que está en curso.

**3. Qué sigue saliendo mientras el largo por tema se construye.** El informe
diario en video (de 3 a 4 minutos desde el 12-10) sigue hasta que el primer
largo por tema esté aprobado; después se apaga. El diario ESCRITO sigue todos
los días en https://entender.sinodev.cl (diseño 2, desde el 01-11). El podcast
pasa a leer el diario escrito, no el audio del video. El Short del día se queda
y se mejora. Por qué: el informe en video junta entre 2 y 80 vistas con 10 a 30
% visto, y es la pieza que más cuota gasta; el escrito es lo que de verdad usa
quien quiere el día completo. El Short del día rinde una mediana de 104 vistas
y su problema no es el formato sino que no sale todos los días. (superado el
04-11-2026 por la decisión El despegue: el informe en video se apagó ese día;
la lectura del escrito por el podcast sigue sin construir)

**4. La hora de publicación que vale es la real del workflow**: informe 06:30,
Short 12:00 y largo o Clave 14:00 hoy (`YT_HORA_INFORME`, `YT_HORA_SHORT` y
`YT_HORA_CLAVE` en `.github/workflows/edicion-diaria.yml`), y el largo por tema
pasa a las 19:00. `ideas/viralizacion.md` deja de mandar sobre la hora
(disputa 8). Por qué: la tabla escrita (antes de las 06:00 y Short a las 07:30)
no la cumplía nadie desde el 23-09, y dos horas que se contradicen hacen que
cada auditoría marque un atraso que no existe. La hora es palanca de segundo
orden: solo el 0,7 % de las vistas llega por notificación (medido el 12-10).

**5. Sin gastos nuevos, y fuera lo que no se usa.** NO se contrata ElevenLabs
ni clips generativos por ahora: el análisis proponía 22 dólares al mes de voz y
10 de clips como experimento, y Santiago lo dejó en cero. La voz sigue siendo
Azure (regla 31). La biblioteca de dibujos por párrafo (apagada, unas 1.760
líneas) se archiva, y `prompts/guardian.md` y la interfaz `taller/` se retiran:
no tenían quién los leyera. Por qué: el problema del canal no es la falta de
herramientas sino que lo que ya existe no sale todos los días; gastar antes de
eso es agregar piezas a una máquina que se cae.

Lo que NO se hace, para que la auditoría no lo vuelva a proponer: perseguir
las 4.000 horas, devolverle un calendario a la Clave, mover la hora por la
tabla de `ideas/viralizacion.md`, contratar voz o clips sin un sí nuevo de
Santiago, y encender la biblioteca. **Decidió**: Santiago.

## 2026-11-01 - El diario en entender.sinodev.cl

**Qué**: el diario escrito se publica en https://entender.sinodev.cl
(Cloudflare Pages, proyecto `entender-chile`), con el diseño 2 como único;
`web.yml` sube el sitio y los builds automáticos de Git del proyecto quedaron
apagados. La copia vieja de GitHub Pages sigue saliendo porque Spotify lee de
ahí el feed del podcast; se apaga cuando el feed se mueva. **Por qué**: un
dominio propio es la dirección que se puede decir al aire y en la descripción,
y la integración de Git construía con cada push a `main` (1.121 despliegues en
un día contra 500 al mes del plan gratuito). **Evidencia**:
`bitacora/2026-11-01.md`, sección "El diario en entender.sinodev.cl".
**Decidió**: Santiago.

## 2026-11-01 - Entender el caso: nombre y piloto
**Qué**: el largo por tema se llama "Entender el caso". El piloto es la rebaja
de condenas de Rabat y Silva, que el diario lleva en sus noticias desde el
24-10-2026. **Por qué**: Rabat ya tiene recorrido y cobertura propia en el
diario, así que el caso se puede contar desde su origen con material que ya
existe. El diseño está en `bitacora/2026-11-01-analisis-y-plan.md`, sección 6.
El informe en video se apaga cuando el primer "Entender el caso" esté aprobado.
Misma noche, regla 19: la máquina sube programado y la publicación ocurre sola.
**Decidió**: Santiago.

## 2026-11-04 - El despegue: Claude al mando, solo explicar, cierre el 31-01-2027

Santiago decidió el 04-11-2026, sobre el diagnóstico de esa noche (48
suscriptores y 23.004 vistas en 66 días y 221 videos; 0,8 suscriptores por
día; unas 15 horas de largos en 30 días). Texto completo del mandato en
`.claude/skills/despegue/SKILL.md`. Estas decisiones mandan sobre la regla
dura 24 y sobre el MODO 1 de `CLAUDE.md`.

**1. Claude decide y ejecuta; Santiago se entera.** Estrategia, formatos,
prompts, herramientas gratuitas, rutinas, qué se archiva y qué se borra: todo
sin pedir permiso. Siguen siendo de Santiago el dinero (sin gasto nuevo), sus
cuentas y contraseñas, los secretos de GitHub y cerrar PRs. Por qué: ya no hay
sesión de día que proponga, y cada permiso pedido es un día perdido.

**2. Solo explicar.** Se apagan el informe diario en video y los exprés. Por
qué: son el 80 % de la producción y el 5 % de las vistas, mueren en 48 horas y
son exactamente el formato (resumen de noticias, voz sintética, plantilla
fija) que YouTube trata como contenido inauténtico. Los únicos videos que
pasan de 500 vistas son los que explican algo. Se quedan el Short explicativo
del día, Entender el caso, el diario escrito, el podcast del escrito, el
barrido, las métricas y el seguimiento de temas.

**3. Una revisión y al menos una mejora cada día**, registradas en
`bitacora/mejoras/AAAA-MM-DD.md`. Por qué: la máquina funciona; el producto no.
Lo que no se mide y no se cambia cada día, no despega.

**4. Criterio de cierre: 31-01-2027.** Se sigue solo si el ritmo de
suscriptores se multiplicó por cinco (4 por día en los últimos 30 días) y los
explicativos pasan de forma regular las 1.000 vistas. Si no, se cierra. Por
qué: Claude no puede asegurar la monetización y lo dijo; una apuesta sin fecha
de cierre no es una apuesta, es una costumbre.

## 2026-11-07 - La portada no puede ser extranjera (y por qué eso es una decisión de audiencia)

**Qué**: en `prompts/informe.md`, la NOTICIA DE PORTADA ya no puede ser una
noticia cuyo sujeto central esté fuera de Chile, salvo que la consecuencia
chilena ya decidida y con fecha sea ella misma la noticia, y en ese caso el
titular nombra la consecuencia y no al protagonista extranjero. La noticia
internacional sigue saliendo completa en su sección: lo único que pierde es la
portada. Además, "un presidente extranjero" deja de valer 2 en el criterio
NOMBRE PROPIO BUSCABLE: a ese nombre lo busca el público de su país.

**Por qué**: la línea NOTICIA DE PORTADA decide, en cascada, el título del
video, la carátula, la apertura en frío y el primer bloque del guion, y
`scripts/short.js` arma el Short con los primeros bloques de ese guion. O sea:
quien elige la portada elige el tema del Short, que desde el 04-11-2026 es el
producto principal del canal. Y el Short extranjero no se reparte. Medido el
07-11-2026 sobre `bitacora/metricas/2026-11-07.json`: los 9 Shorts públicos con
un nombre propio extranjero en el título juntan 2 clics en 432 impresiones (CTR
0,46%) contra 102 clics en 5.004 impresiones (2,04%) de los 134 Shorts
chilenos. Ninguno de los 9 pasó las 300 vistas; 18 de los 134 sí. Lo decisivo
es que no es un rechazo del espectador: esos 9 tienen 92,7% visto de mediana,
muy por encima del 62% del resto. Quien los ve, los ve enteros. Lo que no
ocurre es la distribución, porque la audiencia que YouTube le reconoce al canal
es chilena y el tema no le calza.

**Qué tan firme es el dato**: la diferencia de CTR es sólida (2 clics
observados contra 8,8 esperados en 432 impresiones, p = 0,007 binomial de una
cola). La de "ninguno sobre 300 vistas" no alcanza por sí sola a ser
concluyente con n = 9 (p = 0,27): se apoya en la primera, no la reemplaza.

**Qué lo gatilló**: el 07-11-2026 la portada fue "Paraguay destituye a Santiago
Peña tras la caída de Ueno Bank" (9/10, proximidad 1), por delante del IPC de
octubre, que es chileno, le pega al bolsillo de todos y es cola larga. El
criterio viejo premiaba con el máximo a "un presidente extranjero", así que el
prompt estaba eligiendo exactamente lo que los números dicen que no se
reparte. Ya había pasado el 25 y el 26-10-2026 con el balotaje de Brasil
(Shorts de 11 y 7 vistas).

**Lo que NO se hace**, para que la auditoría no lo vuelva a proponer: apagar el
resumen internacional, ni bajarle el desarrollo. El problema nunca fue cubrir
el mundo, fue ponerlo en la portada. **Decidió**: Claude, por el mandato del
04-11-2026.
