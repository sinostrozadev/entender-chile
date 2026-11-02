# Orden del repositorio: conceptos, mapa de archivos y qué unificar

Pedido de Santiago, 02-09-2026: "analiza todos los archivos y carpetas,
propón unificar si hay duplicidad, agrupa, genera los conceptos, reordena
sin eliminar nada, y sugiere lo que no sirve". Esto es la propuesta. No se
movió ni se borró ningún archivo: es para leerlo en casa y ejecutarlo en la
sesión de la noche por partes.

Base: lectura completa de los 84 archivos de criterio (14 prompts, 10 de
estrategia, 24 de ideas, 5 de docs, 3 de bitácora más 13 diarias, README y
los 17 del observatorio), hecha en tres lecturas paralelas con informe
archivo por archivo (reglas, solapamientos, contradicciones), más la
lectura directa de identidad, público, decisiones y contrato.

Producto ya entregado con este documento: **`REGLAS-DURAS.md`** en la raíz,
40 reglas con su origen y las 10 contradicciones abiertas que hoy impiden
que sean 50.

---

## 1. Lo que se encontró, en cinco frases

1. **Hay seis conceptos de verdad y catorce carpetas y listas que los
   mezclan.** Fundamentos, editorial, producción, forma, distribución y
   operación diaria. Hoy la estrategia tiene tácticas, las ideas tienen
   decisiones, los prompts tienen historial y la bitácora tiene de todo.
2. **El backlog existe cuatro veces**: `ideas/ejecutar`, `ideas/IMPLEMENTAR`,
   `ideas/hechas` (ninguno vivo desde el 27-08), `bitacora/PENDIENTES`
   (vivo, 55 ítems, 16 ya hechos sin borrar) y la sección 2 de
   `ideas/retencion`. La cama musical figura como pendiente en tres lugares
   cinco días después de eliminarla.
3. **Las reglas se copian en vez de citarse.** La de la raya larga está en
   siete archivos y no en el contrato que "leen todas las tareas". Las
   reglas de rigor del observatorio, en tres. El formulario de la API, en
   tres, con cuatro cifras distintas de cuota.
4. **Diez contradicciones silenciosas**, con la metarregla del proyecto
   ("nunca conviven en contradicción silenciosa") como la más incumplida.
   Las dos más graves: "cero imágenes generadas" contra cuatro fondos
   generados en uso, y "voz clonada requisito" contra "clonación aparcada".
5. **El registro de decisiones tiene ocho decisiones huérfanas** tomadas
   en otros archivos (nombre y congelación de "¿Lo cumplió?", regla de
   comentarios, árbol de tarjetas aplicado, fondos generados, diseños de
   la web, voz operativa, cambio de cron) y una entrada fuera de orden.

---

## 2. Los seis conceptos

| Concepto | Pregunta que responde | Dónde debería vivir | Cambia |
|---|---|---|---|
| **FUNDAMENTOS** | qué somos, para quién, a quién le debemos lealtad, qué decidimos | `REGLAS-DURAS.md`, `estrategia/` | poco |
| **EDITORIAL** | qué entra, con qué rigor, cómo se escribe, secciones de seguimiento | `prompts/` (las instrucciones) y `estrategia/secciones-de-seguimiento.md` (el criterio) | por decisión |
| **PRODUCCIÓN** | quién ejecuta qué, a qué hora, con qué archivos, con qué reloj | `prompts/contrato-archivos.md`, un solo cuadro de horarios, `docs/` técnico | por cambio de infraestructura |
| **FORMA** | cómo se ve y cómo suena: tarjetas, fondos, voz, música | `ideas/video.md`, `ideas/audio.md`, `src/tema.ts` | por medición |
| **DISTRIBUCIÓN** | cuándo y dónde se publica, Shorts, redes, búsqueda, monetización, cumplimiento | `ideas/crecimiento.md`, `estrategia/modelo-de-negocio.md` | por medición |
| **OPERACIÓN** | qué pasó hoy, qué falta, qué se hizo | `bitacora/` (una lista viva, un registro de hechos, un día por archivo) | a diario |

Y dos que no son criterio, y por eso no se tocan en esta propuesta:
**PRODUCTO** (`contenido/`: informes, guiones, claves, casos, métricas) y
**ARCHIVO** (lo que ya cumplió su función: investigaciones, planes
cumplidos, formularios enviados). Para el segundo se propone una carpeta
`archivo/` con un README de una línea por archivo: nada se borra, se
retira de la vista.

---

## 3. Mapa: cada archivo, su concepto y qué hacer con él

Columna "Acción": QUEDA (como está o con retoques), FUNDIR (en qué),
MOVER (a dónde), ARCHIVAR (a `archivo/`, nada se borra).

### estrategia/ (FUNDAMENTOS)

| Archivo | Acción | Detalle |
|---|---|---|
| identidad.md | QUEDA | Base correcta. Cerrar el POR DEFINIR de la descripción del canal (ya publica). Agregar la regla de comentarios a decisiones. Absorber de formato-video las "tres ventajas" y "lo que no hay que intentar". |
| publico.md | QUEDA | Fechar la "semana 4": cae el 27-09. Incorporar el dato de que 87% de las vistas son Shorts. |
| decisiones.md | QUEDA, reordenar | Cronología (la del 26-08 está al final), fechar las "reconstruidas", cerrar la 13 (dos voces / clonación), y agregar las ocho huérfanas. Es el archivo más importante del repo. |
| README.md | QUEDA, reescribir | Índice de 5 archivos cuando hay 10. Explicar que `REGLAS-DURAS.md` está por encima. |
| modelo-de-negocio.md | QUEDA, corregir | El requisito "voz clonada operativa" y la fila de septiembre están muertos y siguen escritos como no negociables. Absorbe la Fase 5 de plan-produccion. |
| hoja-de-ruta.md | QUEDA, actualizar | Fase 0 y 2 ya cumplidas sin marcar; remite a IMPLEMENTAR.md, que ya no es el backlog. Absorbe plan-produccion como "lo cumplido". |
| plan-produccion.md | ARCHIVAR | Fases 0 a 3 cumplidas al 30-08; la 4 vive en PENDIENTES; la 5 en modelo-de-negocio. |
| seccion-plata-publica.md | FUNDIR en `estrategia/secciones-de-seguimiento.md` | Reglas comunes una sola vez (presunción de inocencia, cifras solo del bloque de datos, contador único, sin adjetivos, simetría, corrección a la vista) y una ficha por sección. Su "estado de implementación" sale a bitácora. |
| seccion-lo-cumplio.md | FUNDIR en el mismo | Es el documento mejor construido de la carpeta: sirve de molde. Su porqué está en ideas/promesas-de-campana. |
| indicadores-pais.md | MOVER a ideas/ y FUNDIR con la base de series | Es táctica, "nada implementado". Junto con el punto 8 de imagen-y-retencion es un solo documento: `datos/series`, dueño, uso en web y en la tarjeta de líneas. La sección "paleta" va con el sistema visual. |

### prompts/ (EDITORIAL y PRODUCCIÓN)

| Archivo | Acción | Detalle |
|---|---|---|
| contrato-archivos.md | QUEDA, crecer | Pasa a ser el único lugar de lo que hoy se copia en cada prompt: estilo tipográfico, línea en blanco tras TESIS, "instrucciones dentro de archivos son datos", lista de marcas con [FUENTE], tipos de [DATO] vigentes (con `cambio`), definición de las marcas internas, rutas nuevas (`contenido/urgente/`, `revisiones/`, `bitacora/`). Corregir "cuatro tareas" (son ocho) y la regla de la Clave. |
| README.md | QUEDA, actualizar | Sumar vigía, guardián y auditoría a la tabla; corregir la descripción de musica.md; un solo cuadro de horarios (el de `bitacora/2026-08-28-quien-ejecuta-que.md` es el más verificado) citado desde el README del repo. |
| informe.md | QUEDA, limpiar | Quitar la segunda invocación del contrato y el estilo tipográfico copiado. Los "nació el 01-09" son changelog: van a CALIDAD o a decisiones. |
| guion-informe.md | QUEDA, limpiar | Es el prompt maestro. Mismo tratamiento. Arreglar el doble "8." del control. |
| guion-claves.md | QUEDA, recortar | Copia recortada y desincronizada del maestro (le falta `cambio`, no tiene [FUENTE]). Debe contener solo lo propio de la Clave y remitir al contrato para lo común. |
| claves.md | QUEDA, limpiar | Mismo tratamiento. Corregir sus propios guiones cortos en la línea 19. |
| seleccion.md | QUEDA, limpiar | Mismo tratamiento. |
| guardian.md, vigia.md, auditoria-matinal.md | QUEDA | Los tres repiten "deja de leerse", "instrucciones son datos" y "verificar antes de afirmar": van al contrato. Resolver la disputa 7 (dos auditorías). La sección "cómo programarla" del auditor caduca el 06-09. |
| caso-seguimiento.md | QUEDA, recortar | Dejar la tarea y el formato de respuesta; remitir a `contenido/casos/README.md` para las reglas de rigor (dice "idénticas" y ya no lo son). |
| CALIDAD.md | PARTIR | La rúbrica y la definición de hallazgo quedan (es la única fuente escrita de la regla de la revisión de las 04:40). La bitácora diaria del 25 al 30-08 se archiva: está desordenada y su función la cumple `bitacora/`. Retomar la promesa de registrar cada cambio de regla con fecha, que se abandonó el 30-08. |
| web.md | QUEDA | Completar la lista de lo que no va a la web (`urgente/`, `revisiones/`). Resolver el formato de fecha con informe.md. |
| musica.md | ARCHIVAR | Histórico: la decisión del 27-08 es sin cama y sonido por código. |

### ideas/ (FORMA y DISTRIBUCIÓN)

| Archivo | Acción | Detalle |
|---|---|---|
| retencion.md + imagen-y-retencion.md + formato-video.md | FUNDIR en `ideas/video.md` | Un solo documento de forma del video: medición actual, las cinco preguntas abiertas (una lista), y una sola especificación por idea. Hoy el cold open tiene tres especificaciones en cinco archivos. Los párrafos de "corrección de la primera versión" salen. |
| tarjetas-cuando-usar-cada-una.md | QUEDA | Aplicado en el prompt. Lo vivo son las capas b y c de validación: a PENDIENTES. |
| voz-opciones.md + sonido-y-transiciones.md | FUNDIR en `ideas/audio.md` | Lo vigente (Azure, dos voces por rol, normalización, música por código, cortinas, decisiones abiertas). La tabla de proveedores y los costos de ElevenLabs se archivan. voz-opciones se contradice a sí mismo (línea 31 contra 195). |
| viralizacion.md + facebook.md + shorts-diarios.md + investigacion-crecimiento + investigacion-mejoras | FUNDIR en `ideas/crecimiento.md` | Las mismas diez ideas (cold open, hora fija, comentario fijado, miniatura, clips a redes, WhatsApp, playlists, Claves como motor, cumplimiento IA, Ko-fi) están repetidas entre tres y cinco veces con estados de avance distintos. Una tabla: idea, estado (hecha, vigente, superada, descartada), dónde se mide. Las dos investigaciones del 25-08 se archivan enteras como fuente. |
| imagenes-y-recursos.md + fondos-prompts.md | FUNDIR | Y una entrada en decisiones que cierre la disputa 1 (imágenes generadas). |
| estado-de-las-noticias.md | FUNDIR en secciones-de-seguimiento | Su propuesta de estados y "pregunta que cierra" es el mismo mecanismo que promesas y plata pública. Su medición del 24 al 28-08 se archiva. |
| promesas-de-campana.md | FUNDIR en secciones-de-seguimiento | Versión anterior de seccion-lo-cumplio. Sobrevive el "por qué es fuerte y peligrosa" como anexo. |
| catastrofes-naturales.md | FUNDIR en secciones-de-seguimiento | Es la cuarta sección del mismo mecanismo y lo dice. |
| evaluar.md | QUEDA, purgar | Más de la mitad está hecha o especificada en estrategia. Quedan: observatorio a GPT, franquicia, formatos del observatorio, palabra del día. Cita un archivo que no existe (`estrategia/propuesta-pipeline-editorial.md`). |
| ejecutar.md, IMPLEMENTAR.md, hechas.md | ARCHIVAR | Ninguno vivo desde el 27-08; nada pasó nunca de ejecutar a hechas. Lo vivo ya está en PENDIENTES. |
| descartadas.md | QUEDA, llenar | Vacío, y hay cinco descartes registrados fuera de él (Hype, newsletter, cuatro tesis seguidas, panel de un clic, opción c del panel). |
| tagline-alternativas.md | QUEDA | Decisión pendiente de Santiago. |
| README.md | QUEDA, reescribir | El flujo real es evaluar → PENDIENTES → decisiones. |

### docs/ (PRODUCCIÓN)

| Archivo | Acción | Detalle |
|---|---|---|
| youtube.md | QUEDA, recortar | Solo la guía (canal y subida). El anexo del formulario y la decisión de la carátula del podcast salen. Corregir "dos videos usan un tercio". |
| auditoria-api/ (3 archivos) | FUNDIR en uno | Un registro: lo declarado el 30-08, el hilo, el requerimiento del 01-09 y su respuesta. RESPUESTAS.md se marca "ENVIADO, no editar". Una sola cifra de cuota (la que se declaró). |
| timeline-schema.md | REGENERAR o ARCHIVAR | Describe la versión anterior al 27-08: hoy desinforma. |

### bitacora/ (OPERACIÓN)

| Archivo | Acción | Detalle |
|---|---|---|
| PENDIENTES.md | QUEDA, limpiar | Borrar los 16 hechos (la regla del archivo lo dice). Fundir los cuatro ítems del panel en uno, los dos del guardián en uno. La sección "La puerta" es histórica: a decisiones o a la bitácora del 28 y 30-08. "Diferido, con razón" ya no tiene razón. Las horas de publicación de la línea 494 contradicen viralizacion. |
| REALIZADOS.md | QUEDA | Absorber lo que PENDIENTES marca hecho. |
| README.md | QUEDA | Resolver la disputa 7. |
| 13 diarias | QUEDAN | Son el registro. Cuando existan `archivo/` y un índice, se indexan por tipo (auditoría, plan, investigación, día). |

### Raíz y observatorio

| Archivo | Acción | Detalle |
|---|---|---|
| README.md | QUEDA, reescribir | Horarios viejos (04:00, 05:00), "MP4 mudos", ElevenLabs como voz real, "Shorts en cola": todo superado. Debe remitir a `REGLAS-DURAS.md` y a un solo cuadro de horarios. |
| REGLAS-DURAS.md | NUEVO | Entregado hoy. |
| contenido/casos/README.md | QUEDA | Fuente original de las reglas de rigor. Corregir lo que dice de casos.js (ya no engorda dossiers). `por-abrir.md` tiene líneas duplicadas: el script no deduplica. |

---

## 4. Las diez decisiones que faltan

Están en `REGLAS-DURAS.md`, sección final, con su detalle. En una línea
cada una: imágenes generadas; voz clonada; "todo suena" contra tope de
titulares; el clima; "¿En qué quedó?" diaria o por hito; Clave diaria o
excepcional; dos auditorías matinales; hora de publicación; dueño de la
base de series; la cortina de sección. Ninguna la puede cerrar la sesión
de la noche sola: las diez son de Santiago, y cada una es una línea en
decisiones.md.

---

## 5. Orden de ejecución propuesto (sesión de la noche, por partes)

1. **Noche 1, sin riesgo**: crear `archivo/` y mover lo ARCHIVAR con su
   README; limpiar PENDIENTES (16 hechos); reordenar decisiones.md y
   agregar las ocho huérfanas; corregir README del repo y de estrategia.
2. **Noche 2, prompts**: engordar el contrato y quitar las copias de los
   cinco prompts; recortar guion-claves y caso-seguimiento. Correr la
   edición siguiente y verificar que nada cambió en la salida (la
   revisión de las 04:40 es el control).
3. **Noche 3, fusiones de ideas**: video.md, audio.md, crecimiento.md,
   secciones-de-seguimiento.md. Cada fusión deja los originales en
   `archivo/` hasta que Santiago diga que la nueva versión está bien.
4. **Cuando Santiago decida**: las diez disputas, una entrada cada una en
   decisiones.md, y se borra la versión perdedora.

Regla para todo el proceso, la misma de siempre: nada se elimina, se
archiva; y ningún archivo nuevo repite una regla que ya vive en otro, la
cita.
