# Por implementar

## MAÑANA PRIMERO (2026-08-26, pedido de Santiago: "esto hay que arreglarlo, no debe salir así")
- [x] Observatorio, ficha Democracia Viva: las "Notas metodológicas" salen
      públicas en la web tal cual. Dejar las correcciones (1-5) en versión
      pública limpia y reescribir el punto 6 sin jerga de operaciones
      ("proxy de red"): "No se accedió al texto íntegro de las resoluciones;
      todo proviene de extractos con URL verificada y al menos dos medios
      por cifra".
- [x] Definir la regla para TODOS los dossiers: qué va en la ficha pública y
      qué queda en un bloque interno que la web no renderice (por ejemplo
      un comentario <!-- interno ... --> que contenido.ts filtre), y
      pasársela al prompt caso-seguimiento.md y a la rutina nocturna.
- [x] contenido/casos/candidatos.md línea 18: sigue el error "la Corte
      Suprema ratificó (junio 2026)"; corregir con lo verificado en el
      dossier (8º Juzgado de Garantía se declaró incompetente el 25-06-2026;
      la Suprema resolvió en agosto).
- [x] Leer el log de la primera corrida de la rutina "Observatorio plata
      pública" (03:05): ¿pudo abrir fuentes oficiales o el proxy de la nube
      la limitó a extractos de buscador? Si el bloqueo es sistemático,
      mover ese paso a un entorno con acceso (local) o cambiar la fuente.
- [ ] Decidir el gate humano antes de publicar cambios de dossier.
- [ ] Diseñar agentes/rutinas que faciliten el trabajo diario.

Lista priorizada tras la investigación del 25-08 (detalle y fuentes en
investigacion-mejoras-2026-08-25.md). Revisar junto con: el release de la
primera madrugada automática, contenido/revisiones/ y el informe de
crecimiento que la nube deja a las 07:00.

## Esta semana (Top 3 del investigador)
- [ ] 1. Cold open: el DATO más fuerte del día 3-5 s ANTES del sello
      (reordenar timeline en Remotion; el sello pasa a 2º). Esfuerzo bajo.
- [ ] 2. Regla de los 5-7 s: count-up en cifras, subrayados que se dibujan,
      entradas con delay - ninguna tarjeta muerta >6 s. Esfuerzo bajo.
- [ ] 3. Checklist de cumplimiento IA (30 min, costo de omisión existencial):
      divulgación de contenido sintético en cada subida + protocolo de
      valor humano documentado + variación estructural entre videos.

## Estratégico (decisión de Santiago)
- [ ] ACELERAR LA VOZ CLONADA - los videos mudos rozan la definición de
      contenido NO monetizable de YouTube (política 15-jul-2025:
      "diapositivas con poca narración"). La voz es requisito, no estética.
- [ ] Posicionamiento "el resumen sin gritos" (tagline, descripción, cierre).
- [ ] Claves = motor de los primeros 1.000 subs: elegir temas por búsqueda
      permanente (UF, AFP, Banco Central, IPC, cómo se elige al Presidente).
- [ ] Publicar 06:30-07:00 fijo; validar horario con analítica propia a las
      4 semanas.

## Antes de que llegue la voz (dejar listo)
- [ ] Mezcla en pipeline: ducking automático (sidechain) + master -14 LUFS
      + check de QA por render.
- [ ] ElevenLabs: Multilingual v2 + request stitching (500-800 chars con
      previous/next_text) + pre-normalización de nombres chilenos + seed
      fijo y clip de referencia dorado.

## Cola visual/sonido (iterar en Studio)
- [ ] Centrado vertical de las tarjetas (el desbalance que notó Santiago).
- [ ] Fondos por sección: tinte sutil + kicker permanente.
- [ ] Estructura fija tipo TLDR: 1 historia grande + 3 breves (vía prompts).
- [ ] Pictogramas mínimos SVG (mapa de Chile, flechas de flujo).
- [ ] Sello sonoro también al cierre (versión 1-1,5 s del logo).
- [ ] SFX por tipo de tarjeta (tick de count-up, whoosh de sección <300 ms).
- [ ] Cambio de cama musical a mitad del video (~min 4-5).
- [ ] Pregunta del día al cierre + comentario fijado + responder primeros
      10-15 comentarios.
- [ ] Miniaturas: cifra enorme o 3-4 palabras, A/B nativo desde el día uno.

## Pendientes operativos
- [ ] Cama de la Clave generada por GPT (prompt 2 de prompts/musica.md).
- [ ] Probar la cama del informe (GPT) en PARLANTE DE TELÉFONO - 95% de su
      energía está bajo 250 Hz y puede desaparecer en móviles.
- [ ] Primera prueba real de las tareas programadas de GPT leyendo prompts
      del repo (madrugada del 25-08).
