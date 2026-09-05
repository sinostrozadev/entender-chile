# Realizados

Registro append-only de lo completado, con fecha. La sesión de la mañana
agrega aquí lo que sale de PENDIENTES; también es evidencia del aporte
editorial y técnico humano del proyecto.

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
