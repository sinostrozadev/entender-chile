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
**Decidió**: Santiago. **Detalle**: bitacora/2026-08-29-propuesta-informe-largo.md.

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
corrió. **Detalle**: bitacora/2026-08-28-investigacion-cron.md (la medición
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
