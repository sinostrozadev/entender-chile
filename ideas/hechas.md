# Ideas ejecutadas

## Actualización del pipeline al flujo real (batch)
- **Fecha:** 2026-08-24 · **Ejecutada:** 2026-08-24
- **Qué:** (1) generar.js reordenado: si la edición de hoy está completa →
  "nada que generar" exit 0; queda de plan B (si falla, vamos viendo);
  (2) cron se mantiene en 0 9 * * * - decisión de Santiago: los informes de
  ChatGPT se adelantan a las 4:00; (3) README.md reescrito con el flujo real;
  (4) scripts/manana.sh: rutina matinal que reapunta el Studio a la fecha del
  día (cambio local, no se commitea).

## Archivo de ideas (esta carpeta)
- **Fecha:** 2026-08-24 · **Origen:** Santiago
- **Qué:** backlog persistente en ideas/ con etapas evaluar → ejecutar →
  hechas / descartadas, commiteado en el repo.

## Sello de identidad al inicio (2026-08-25)
- 2,8 s bajo la narración: eyebrow de la serie, "Entender Chile" en Fraunces,
  línea pátina y fecha del día; fade a la primera tarjeta. Verificado en still.

## Mini-gancho del dato curioso (2026-08-25)
- Línea agregada a la APERTURA de prompts/guion-informe.md: anticipar el dato
  sin resolverlo, solo cuando lo merezca.

## Web estática desde contenido/ (2026-08-26)
- Sitio Astro en web/ que lee contenido/informes y contenido/claves tal cual
  (sin formato nuevo): portada con la edición del día, archivo por mes,
  biblioteca de Claves, chips A/B/C, etiquetas Contexto/Clave, índice por
  sección, navegación día anterior/siguiente, "Para salir hoy". Workflow
  Web publica en el repo público entender-chile-web (GitHub Pages) cada
  vez que ChatGPT pushea contenido. Dominio propio pendiente.

## Rúbrica de calidad + iteración diaria de prompts (2026-08-26)
- prompts/CALIDAD.md: rúbrica de 7 puntos y bitácora; primera evaluación
  (edición 25-08) y bloque ESTILO ANTI-PLANTILLA aplicado a los 4 prompts.
