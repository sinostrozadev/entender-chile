# Realizados

Registro append-only de lo completado, con fecha. La sesión de la mañana
agrega aquí lo que sale de PENDIENTES; también es evidencia del aporte
editorial y técnico humano del proyecto.

- 13-09 · Máquina de estados, paso 3: la revisión editorial se adelantó de las 04:45 a las 02:20 (rutina nueva trig_01B8tLFaXe7h1YBCciFE2iKf, Opus; la vieja queda de red) y la WEB ESPERA EL VEREDICTO. Un informe ya no se publica hasta que la revisión dice APROBADA: antes salía al aire apenas GPT lo pusheaba, y el 08-09 uno con dos cifras malas estuvo público de 01:43 a 06:46
- 13-09 · Máquina de estados, paso 2: re-chequeo antes de publicar en prompts/guionista.md. La guarda de dedup mira antes de escribir; esta mira otra vez antes de commitear, que es donde se colaba la carrera del 07-09. Quien llega segundo se retira
- 13-09 · Máquina de estados, paso 1 completo: estado.yml escribe contenido/estado/FECHA.md con cada pieza que llega (y no commitea cuando lo único que cambió es la hora). Ya se puede saber en qué va el día sin correr nada, y GPT puede leerlo
- 13-09 · Estandarizado dónde se anota cada cosa: había pendientes en NUEVE lugares. Una sola lista de trabajo (PENDIENTES.md), cuatro listas de material que escribe la máquina, y lo hecho a REALIZADOS + decisiones.md. Escrito en bitacora/README.md, regla dura 41 y la skill de la bitácora
- 13-09 · La auditoría de la mañana ahora BAJA sus HOY a PENDIENTES en su mismo commit (paso 7 de prompts/auditoria-matinal.md): era el eslabón que faltaba, y por eso la cifra del 11-09 se marcó tres mañanas sin que nadie la anotara
- 13-09 · Las diez disputas de REGLAS-DURAS.md quedaron como registro cerrado: nueve estaban escritas como abiertas once días después de que Santiago las cerrara (02-09). Deriva documental que la regla 41 viene a cortar
- 13-09 · metricas.js medía solo 50 videos: la lista de subidas viene por páginas y no se recorrían. Paginado con pageToken. El canal se medía truncado desde el 10-09; hoy volvieron 18 videos a la medición y las horas del día pasaron de 18,8 a 56,1
- 13-09 · Destapado por lo anterior: la "mejora" de retención de los últimos cuatro días era el truncamiento (se caían del cálculo los informes viejos, que son los de retención baja). La retención real de los largos lleva una semana plana en un tercio, 32,5% hoy, y lo que la predice no es la duración sino de dónde viene el tráfico
- 13-09 · Guarda de dedup en prompts/guion-informe.md: el guionista ya no rehace ni pisa un guion que ya está completo en main (el 07-09 una segunda corrida reescribió el guion bueno)
- 13-09 · Claves de vuelta a 8 minutos de piso (pedido de Santiago del 09-09, cuatro días parado): 1.080 a 1.350 palabras NARRADAS, criterio explícito de qué justifica extenderse, y validar-tarjetas.js avisa cuando una Clave queda bajo el piso. El aviso se probó con la Clave de hoy: 753 palabras, 5,6 min
- 13-09 · casos.js: el detector de casos nuevos comparaba por subcadena con umbral de la mitad y se tragaba cualquier arista nueva de una institución ya fichada. Ahora compara por palabra completa, exige dos tercios y lo dudoso lo anota igual marcado. Recuperada la marca de Fonasa del 09-09, que llevaba cuatro días perdida
- 13-09 · PENDIENTES podado: fuera 16 bloques (4 entradas muertas y 12 ya hechas), de 908 a 677 líneas
- 13-09 · Cifra preliminar del 11-09 (tres removidos y 25 absueltos): decidido NO corregir (Santiago). El recuento final ya estaba publicado en la edición del 12-09, que dice que reemplaza al preliminar. Registro en estrategia/decisiones.md
- 05-09 · Cambio de hora ejecutado completo (7 rutinas + 5 crons GitHub, −1 h UTC) la víspera del salto a UTC-3
- 05-09 · Guiones migrados de GPT a Claude: 2 rutinas esperadoras (03:35/03:50) que leen los MISMOS prompts del repo; GPT queda solo donde navega (preselección por evento, informe, claves)
- 05-09 · Primeros datos reales de retención (scope Analytics habilitado): Claves retienen 54-72%, informes largos 23-30%, Shorts 76-103% — el problema de las Claves es descubrimiento, no calidad
- 05-09 · Carátulas v2 en producción: gancho del guionista (línea "Carátula sugerida"), imagen por sección + fecha en el informe, verde de serie "La Clave"; iteradas 2 vueltas con bocetos
- 05-09 · Shorts parten directo (fuera 3 s de pantalla muerta que quedaban de portada) y el 5-cosas estrena título fórmula A: gancho del día + "y otras 4 cosas de hoy"
- 05-09 · Claves recortadas a ~5 min (650-800 palabras) con checklist alineado
- 03-09 · SHORT EXPRÉS (fase 2 del guardia) construido y probado end-to-end con el caso real de la tasa: guion urgente → voz → render vertical piel VINO → subida privada, todo en ~5 min de Actions
- 03-09 · Rutina de guardia v3: ya no solo avisa, REDACTA el guion (Sonnet, reglas duras: ~55 palabras, cifras solo de fuente primaria, atribución a prensa), espera el id y manda el link del video listo al teléfono
- 03-09 · Bug cazado EN la prueba real: el Short urgente se reescalaba a horizontal antes de subir (quedaba deformado y no contaba como Short); corregido y re-subido
- 03-09 · Cláusula de espera corta en el contrato (TIEMPOS 1): un atraso de minutos ya no dispara respaldos en falso
- 04-09 · Web, segunda vuelta con Santiago: cabecera en una línea, "Lo que importa hoy" como tira, cifras sin caja, noticias [B] seguidas lado a lado en columnas y menos filetes negros en los dos diseños
- 03-09 · Web: índice lateral que sigue el scroll (barra pegada arriba en móvil), "En una mirada" como una frase a la vez que rota a todo el ancho, móvil adaptado (categorías deslizables, cabecera compacta) y solo dos diseños: 1 revista, 2 diario nuevo al estilo de portada clásica (mancheta con filetes, barra de secciones, columnas con filete, serif de lectura, sin cajas ni fotos); ?diseno=2 en la URL lo fija
- 03-09 · Fondos por sección EN el video (imágenes aprobadas + variación diaria por código) y apertura en frío al aire: capítulo 1 "La noticia del día" en 00:00
- 03-09 · Web con categorías en producción: 8 categorías navegables, informe rediseñado con franjas ilustradas, marca de portada filtrada de la entradilla
- 03-09 · Primer día dentro de la promesa: informe 10,5 min y Clave 6,4 min; 3 esquemas y variedad perfecta según el validador
- 03-09 · Agente de guardia fase 1 probado (detector + workflow + reloj cada 2 h) y doble cron de respaldo del barrido tras la falla de cuota

- 02-09 · Guardián con el prompt nuevo cargado por API y verificado en vivo: regla de evidencia + los tres eslabones de la Clave (una entrega a medio hacer ya no pasa en silencio)
- 02-09 · ORDEN noche 1: archivo/ con seis retirados, PENDIENTES limpio, decisiones.md en cronología con seis huérfanas registradas, README raíz y de estrategia al día
- 02-09 · Taller: el sistema interno como página propia, con navegador de archivos, editor con diff antes de aplicar, borradores y Claude con el contexto de los 84 archivos de criterio
- 02-09 · Texto desbordado de las tarjetas cerrado en cuatro capas: parser, render, validador y prompts (578 caracteres en una tarjeta de 107)
- 02-09 · Edición diaria reentrante por pieza: una Clave que llega tarde se produce sola, sin rehacer el informe
- 02-09 · Contrato de archivos al inicio de los cinco prompts y regla de evidencia antes de declarar que un archivo no existe
- 02-09 · Panel interno dibujado desde los datos: metricas.js ahora refresca la página entera, no solo el marcador
- 01-09 · Guardián recreado con el repo montado: primera verificación real de la historia ("Edición completa" en 19 s) y ahora también vigila las métricas
- 01-09 · vistasTotales corregido a suma por video (el contador del canal va con rezago) y el histórico del panel se actualiza solo
- 01-09 · Patrón de commit unificado en los tres workflows (autoStash + origin main + reintento)
- 01-09 · Árbol de decisión de tarjetas validado contra 4 ediciones reales y aplicado al prompt + contador mecánico de variedad en la edición
- 01-09 · Cuatro reglas editoriales del caso Imacec: dato que aún no existe, deuda PENDIENTE DE CIERRE, pantalla con dos indicadores, Claves de indicador al día siguiente
- 01-09 · Página de Facebook creada (Entender Chile, avatar + portada + bio)
- 01-09 · Gráficos de la curva a la meta (subs, horas, Shorts) con histórico diario en proyeccion.json
- 01-09 · Voz con respaldo S0 automático: el canal no se queda mudo al agotarse el cupo gratis
- 01-09 · Feed del podcast: paso 8 despacha la web (pushes del bot no disparan workflows)
- 01-09 · Métricas con reloj propio en la nube (regla: el cron de GitHub no es reloj principal)
- 01-09 · Fuentes del guion de Claves: regla corregida + 5 fuentes agregadas al video del 31
- 30-08 · Auditoría de la API de YouTube enviada (confirmada por correo)
- 30-08 · Podcast en Spotify con episodios automáticos (informe y Clave) y portadas por serie
- 30-08 · Canal público: primer video, Shorts, playlists, carátulas automáticas, subida 1440p
- 30-08 · Panel interno con métricas, checklist, consumo y proyección
- 29-08 · Voz Azure operativa (es-CL, pausada) + primer video con voz
- 29-08 · Informe sin tope + "En titulares" + cifras con criterio + fuente en cada tarjeta
- 29-08 · Barrido con corroboración por tema y palabras de alarma (el tornado que se escapó)
