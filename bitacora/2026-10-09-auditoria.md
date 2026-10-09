# Auditoría matinal · 09-10-2026

ESTADO: CON FALLAS — HOY: el 07-10 y el 08-10 la cadena diaria y la propia
auditoría de las 05:30 quedaron mudas más de 36 horas porque Claude nunca
devolvió veredicto a los turnos que se le dispararon, y nadie se enteró hasta
hoy: dos días sin informe, sin video, sin podcast y sin que la auditoría
dejara un solo archivo que lo dijera. También HOY: `scripts/gate.js:52` sigue
exactamente con el bug que esta misma auditoría marcó HOY el 06-10, y ya se
reprodujo en una corrida real de producción el 07-10 sin que nadie lo
corrigiera.

## Qué salió y a qué hora (hoy, 09-10-2026)

Todas las piezas de la cadena diaria llegaron, se aprobaron y corrieron más
rápido que lo esperado; ningún tramo superó los 20 minutos de atraso.

| Pieza | Hora (Chile) | Esperada | Atraso |
|---|---|---|---|
| Barrido | 01:49 | 01:40 | +9 min |
| Preselección (APROBADA, vuelta 0) | 02:08 | 02:10 | a tiempo |
| Informe (APROBADA, vuelta 2) | 02:48 | 02:40 | +8 min |
| Guion del informe (APROBADA, vuelta 1) | 03:10 | 03:10 | a tiempo |
| Revisión (veredicto final, APROBADA) | 03:12 | 03:30 | adelantada |
| Carátula | 02:55 | — | ok |
| Descripciones del informe | 03:38 | — | ok |
| Podcast (episodios.json) | 03:46 | 05:15 | adelantado |
| Métricas | 05:20 | ~05:00 | +20 min |

Duración real del episodio de hoy (`contenido/podcast/episodios.json`,
`durSeg`): **680 s = 11,3 min**, dentro de la promesa "~10 min, 12-13 en día
cargado". `node scripts/validar-tarjetas.js --fecha 2026-10-09`: "variedad OK:
ninguna cuota rota, ninguna marca malformada". El informe de hoy no deja
ninguna marca `PENDIENTE DE CIERRE` sin cerrar; la preselección verificó y
cerró la de la OEA que venía abierta desde el 06-10 (sin material nuevo que
publicar, lo dice en cámara).

## Qué falló

1. **El 07-10 y el 08-10 la cadena entera quedó muda porque Claude nunca
   devolvió veredicto, y nadie se enteró: dos días sin publicar nada.**
   Verificado con la historia completa de git (el checkout estaba shallow;
   se corrigió con `git fetch --deepen` antes de afirmar nada) y con los
   logs reales de Actions:
   - **07-10:** `contenido/estado/2026-10-07.md` quedó en `ETAPA:
     validar_guion_informe`, `VEREDICTO: pendiente`, `VUELTA: 1`, última
     actualización `2026-10-07 19:38` (atraso de 968 min en Revisión y 863
     en Videos a esa hora). El commit `e4404fac` disparó la validación de la
     vuelta 1 a Claude a las 06:00:20 UTC; nunca llegó el veredicto.
     `reintento.yml` reintentó el estado a las 11:23 y 11:51 UTC, sin
     resultado, y después no hay un solo commit de la cadena diaria el resto
     del día (el único movimiento posterior es una sesión manual de Santiago
     a las 22:29 UTC trabajando en la Clave, no en el informe). No existe
     `contenido/revisiones/2026-10-07.md`, ni video, ni episodio de podcast,
     ni descripción para el 07-10 (las cuatro carpetas listadas en esta
     corrida, cero archivos de esa fecha).
   - **08-10:** el barrido llegó 7 horas tarde (08:38 Chile contra 01:40
     esperado) y la preselección, que desde el 06-10 es turno permanente de
     Claude (`contenido/estado/reparto.txt`, línea `claude: barrido_listo
     reparar_preseleccion`), se disparó al "suplente" a las 08:38 y 09:06
     Chile y tampoco respondió nunca.
     `contenido/estado/2026-10-08.md` quedó en `ETAPA: barrido_listo`,
     `VEREDICTO: pendiente`, última actualización `2026-10-08 09:06`. No
     existe `contenido/preseleccion/2026-10-08.md` ni nada después en la
     cadena. La corrida de `edicion-diaria.yml` de las 12:17 Chile lo
     confirma en su log: `ERROR: no existe
     contenido/guiones/informe/2026-10-08.md - no hay nada que renderizar`.
   - **La propia auditoría de las 05:30 no corrió, o corrió y no pudo
     escribir, ninguna de las dos mañanas.** Comprobado con `git log --all
     --diff-filter=A` sobre `bitacora/2026-10-07-auditoria.md` y
     `bitacora/2026-10-08-auditoria.md`: cero resultados, y `git show
     main:` sobre las dos rutas devuelve "does not exist in 'main'". El
     guardián de las 05:30 es Claude, igual que `validar_guion_informe` y el
     suplente de preselección: los tres turnos de Claude de esos dos días
     quedaron mudos, mientras que turnos que no dependen de Claude (el
     barrido en sí, `métricas.yml`, y la guardia de la tarde del 08-10 desde
     las 18:18 Chile) sí corrieron. El patrón apunta a una caída de Claude
     (mismo síntoma que el 04-09, "Suscripción de Claude vencida"), pero
     esta vez nadie lo diagnosticó porque el guardián que debía avisarlo es
     el mismo que se quedó mudo.
   - Consecuencia medible: dos días completos sin informe, sin podcast, sin
     descripción y sin auditoría, y nadie en `bitacora/PENDIENTES.md` lo
     tenía anotado hasta esta corrida.

2. **`scripts/gate.js:52` sigue exactamente como lo dejó el 06-10, y el bug
   ya pasó de predicción a hecho: se reprodujo en una corrida real el
   07-10.** La auditoría del 06-10 (`bitacora/2026-10-06-auditoria.md`)
   predijo que la corrida de `edicion-diaria.yml` del 07-10 iba a fallar
   porque `.find((f) => f.startsWith(fecha) && f.endsWith(".md"))` puede
   devolver `contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario-imagenes.md`
   en vez del guion real. Pasó: el log de la corrida
   `https://github.com/sinostrozadev/entender-chile/actions/runs/37642750015`
   (07-10, 15:18 UTC) dice `✓ clave: parsea · 0 secciones · ~0.0 min
   estimados` y después `ERROR: clave: solo 0 secciones` y `ERROR: clave:
   narración de 0 caracteres`, exactamente lo anticipado. Verificado en el
   código de esta corrida que la línea 52 de `scripts/gate.js` es idéntica a
   la que el 06-10 marcó como el bug, sin el `&&
   !f.endsWith("-imagenes.md")` que la propuesta de esa auditoría pedía.
   Hoy no le costó nada a la edición (el bloqueo real de esa corrida fue el
   hallazgo 1: el guion del informe seguía `por_validar`), pero el bug sigue
   vivo y la próxima vez que coincidan un guion de Clave real y un informe
   con validación pendiente el mismo día, va a tirar abajo el informe sin
   motivo real.

Sin otras fallas: la producción de hoy (09-10) no tiene hallazgos nuevos más
allá de lo que el propio validador ya anota como no bloqueante (el conteo de
"La noticia del día" según se cuente o no la TESIS, la contradicción entre la
regla de siglas y el tope de seis palabras en las marcas), que son los mismos
que viene repitiendo desde el 03 y el 05-10 sin que nadie haya tocado el
prompt.

## Propuestas

1. **Diagnosticar por qué Claude no respondió entre el 07-10 ~03:00 y el
   08-10 (hasta algún momento entre las 05:06 y las 18:18 Chile) y confirmar
   si ya está resuelto para hoy.** Mismo síntoma que el 04-09 (plan o cuota
   vencida); solo Santiago puede ver el estado de la cuenta/suscripción
   desde este lado. Si vuelve a pasar sin que nadie lo note, el canal puede
   perder más días de edición sin aviso.
2. **Que el guardián de las 05:30 (y los demás turnos de Claude: validador,
   suplente de preselección) fallen de forma RUIDOSA cuando no pueden
   escribir, en vez de simplemente no dejar archivo.** Hoy no hay ninguna
   señal en el repo de que la auditoría del 07-10 o del 08-10 se haya
   intentado y fallado: no hay archivo, no hay commit, no hay aviso. Una
   opción barata: que `reintento.yml`, al agotar su tope de tres reintentos
   sobre una etapa de Claude, escriba un archivo explícito (por ejemplo
   `contenido/estado/FALLA-FECHA.md`) además de notificar, para que la
   próxima auditoría (o Santiago) lo encuentre sin tener que reconstruir la
   historia completa de git como hubo que hacer hoy.
3. En `scripts/gate.js:52`, aplicar el arreglo de una línea que ya propuso el
   06-10 y que sigue sin tocarse: cambiar `.find((f) => f.startsWith(fecha)
   && f.endsWith(".md"))` por `.find((f) => f.startsWith(fecha) &&
   f.endsWith(".md") && !f.endsWith("-imagenes.md"))`.
4. Backfill editorial: con el sí de Santiago, decidir si el 07-10 y el 08-10
   quedan como "sin edición" permanente (dos huecos en el canal) o si se
   intenta producir algo retroactivo; mientras no se decida, no inventar
   contenido de esos días.

## Triage

- **HOY**: hallazgo 1 (la cadena y la auditoría mudas el 07 y 08-10, sin
  registro ni aviso) → propuestas 1 y 2. Primera vez que se marca.
- **HOY**: hallazgo 2 (`scripts/gate.js:52`) → propuesta 3. Marcada por
  segunda vez en esta lista (primera: 06-10); lleva **tres mañanas** desde
  que se encontró (06, 07 y 08-10) sin que se aplicara el arreglo de una
  línea, y en el medio ya se reprodujo de verdad en producción el 07-10.
- **AGUANTA**: decidir qué hacer editorialmente con los dos días sin
  edición → propuesta 4. No rompe la edición de esta noche, pero no se debe
  dejar sin decisión indefinidamente.
- **MIRAR**: la corrida de `edicion-diaria.yml` por horario (12:17-12:18
  Chile) sale con `exit 1` por diseño cuando no hay nada que renderizar
  todavía; es el comportamiento esperado y no un hallazgo nuevo, pero
  conviene vigilar que esa falla "normal" no se confunda con una falla real
  en los paneles de Actions (ya pasó hoy: silenciosamente agrupadas en la
  misma lista que las fallas verdaderas).

## Bajada a la lista viva

- `scripts/gate.js:52`: ya existía la entrada (`bitacora/PENDIENTES.md`,
  sección "Para la sesión de la noche", agregada el 06-10); se le agregó la
  línea de "tres mañanas marcada" con la evidencia de la reproducción real
  del 07-10, sin duplicar la entrada.
- Cadena y auditoría mudas el 07 y 08-10: no existía ninguna entrada sobre
  esto en `PENDIENTES.md` ni decisión de NO hacer nada en
  `estrategia/decisiones.md` ni en `bitacora/REALIZADOS.md` (buscado
  explícitamente). Se agregó entrada nueva en "Dependen de Santiago" con la
  evidencia completa y la propuesta 1 y 2.

## Comparación con ayer

No hay auditoría del 07-10 ni del 08-10 contra la cual comparar (ese es, en
sí, el hallazgo 1: la serie tiene un hueco de dos días). Contra la última
auditoría real, la del 06-10:

- **Sigue igual, y empeoró**: el hallazgo HOY de `scripts/gate.js:52` del
  06-10 no se tocó, y en el medio pasó de predicción a hecho reproducido.
- **Nuevo**: el hallazgo de que la cadena completa (no solo la Clave) puede
  quedar muda por horas sin que ningún turno de Claude lo reporte; el 06-10
  no se sabía que esto podía pasar a esta escala.
- **Resuelto**: el hallazgo 2 del 06-10 (la idea de la Clave de la semana 39
  sin aprobar diez mañanas) ya no aplica: la Clave de licencias médicas
  avanzó y se aprobó (vuelta 2, 07-10), así que esa Clave ya tiene tema,
  pauta y guion.
- **Los números** (`bitacora/metricas/2026-10-09.md` contra el de ayer):
  suscriptores estancados en 32 (+0); vistas totales +134 hoy contra +63
  ayer; horas vistas en videos LARGOS (las que cuentan para las 4.000 horas)
  subieron de 18,5 a 19,0; la retención media ponderada de los largos bajó
  de 23,9% a 23,0%. Con dos días sin informe nuevo (07 y 08-10), el canal
  vivió el 08-10 casi enteramente de los largos viejos y de los shorts de la
  guardia de la tarde.
