# Ideas aprobadas, en cola de ejecución

(Las ideas llegan aquí desde evaluar.md cuando Santiago las aprueba.
Al completarse se mueven a hechas.md.)

## Shorts automáticos 💰
- **Fecha:** 2026-08-24 · **Origen:** Claude · **Aprobada:** 2026-08-24
- **Qué:** composición Remotion vertical (1080×1920) que tome 1-2 secciones del
  timeline y genere 2-3 Shorts diarios del mismo contenido. La Clave es la
  fuente ideal: conceptual y atemporal.
- **Valor:** vía rápida a los 1.000 suscriptores; 10M vistas Shorts en 90 días
  es ruta alternativa de monetización. Costo marginal ~cero.
- **Esfuerzo:** medio (nueva composición + recorte del timeline).

## Miniaturas automáticas
- **Fecha:** 2026-08-24 · **Origen:** Claude · **Aprobada:** 2026-08-24
- **Qué:** generar la miniatura del día con Remotion (still 1280×720 con el
  titular principal + identidad visual del canal).
- **Valor:** el CTR es la variable #1 de ingresos; hoy no hay miniatura.
- **Esfuerzo:** bajo (composición de 1 frame + `remotion still`).

## Revisión de calidad automática de madrugada
- **Fecha:** 2026-08-24 · **Origen:** Claude (plan de las 6:00)
- **Qué:** rutina programada de Claude en la nube (~4:40 Chile) que lea el
  guion del día contra el informe (cifras, fechas, coherencia) y deje
  contenido/revisiones/FECHA.md en el repo, antes del render de las 5:00.
  Santiago despierta a las 6:00 con video + informe de revisión.
- **Valor:** evita subir un error factual a YouTube sin retrasar la mañana.
- **Esfuerzo:** bajo (crear la rutina con /schedule). Pendiente de OK.

## Observatorio de la plata pública 💰💰
- **Fecha:** 2026-08-25 · **Origen:** Santiago · **Aprobada:** 2026-08-25
  (la recopilación; los formatos de presentación siguen en evaluar.md)
- **Qué:** dossiers vivos por caso de uso irregular de fondos públicos en
  contenido/casos/ (formato y reglas de rigor en su README), actualizados a
  diario por scripts/casos.js con búsqueda web (corre en la madrugada, no
  bloquea la edición). Primeros dos casos: subsidios de arriendo (Contraloría
  314-2026) y el caso JUNAEB/JUNJI en investigación.
- **Valor:** nadie hace seguimiento sostenido de estos casos; el archivo
  acumulado alimenta Claves, reportajes y una futura pieza "cuánto dinero
  público se ha perdido". Diferenciador editorial fuerte y material evergreen.
- **Esfuerzo:** infra lista (2026-08-25); costo marginal diario bajo (1
  llamada API con búsqueda por caso abierto).

## Recordatorio permanente
- Toda idea nueva que surja en conversaciones se anota en evaluar.md.

## Música de fondo - SOLO FALTA LA PISTA
- **Estado 2026-08-25:** infraestructura LISTA (dia.js detecta public/musica/
  informe.mp3 y clave.mp3; volumen 0.3 mudo / 0.1 con voz, loop). Falta que
  Santiago baje las pistas de YouTube Audio Library y las deje en
  public/musica/ (ver su README). Al commitearlas, la nube las usa sola.
