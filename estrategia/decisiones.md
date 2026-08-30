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
de su confirmación. **Detalle**: ideas/voz-opciones.md.

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

## Decisiones previas, reconstruidas del repo (para que no se pierdan)

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
  no como mejora estética. (ideas/IMPLEMENTAR.md, política YouTube
  15-jul-2025)

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
