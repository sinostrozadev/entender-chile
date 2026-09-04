ESTADO: CON OBSERVACIONES

Medido el 04-09-2026 a las 09:31 de Chile, por la rutina de las 09:30
(`trig_01GDbvJ1Wjzy25bnVRCXgygZ`).

**Nota de contrato**: el prompt guardado en este disparador difiere del
`prompts/auditoria-matinal.md` actual. La versión vigente del archivo (commit
`b1185d9`, hoy 02:42) reemplazó la estimación de duración por palabras (150
ppm) por la lectura real de `contenido/podcast/episodios.json` (campo
`durSeg`), y agregó "guardia" a la lista de workflows del punto 3. El prompt
guardado en el trigger sigue con la instrucción vieja. Esta auditoría siguió
el archivo actual (más correcto), no la copia guardada. Ver propuesta 1.

## Qué salió y a qué hora

| Pieza | Hora (Chile) | Estado |
|---|---|---|
| Barrido | 01:01 | ok, vía evento nuevo (ver abajo) |
| Preselección | 01:03 | ok, 2 min tras el barrido |
| Observatorio plata pública | 01:46 | ok |
| Informe | 03:30 | ok |
| Clave (entrega) | 03:47 | ok (3 commits en 1 min, el último quedó firme) |
| Guion del informe | 04:00 | ok |
| Guion de la Clave | 04:17 | ok |
| Revisión editorial | 04:43 | VEREDICTO: APROBADA, sin hallazgos |
| Edición diaria (render, 4 videos) | ~04:50-05:48 | ok, descripciones y podcast generados |
| Guardián de la edición | 06:09 | ok (cron 06:00, +2 min) |
| Reloj de métricas | 08:45 | ok |
| Métricas del día | 08:46 | ok |

Los tres eslabones de la Clave están completos: entrega
(`contenido/claves/2026-09-04-contraloria-reparo-juicio-cuentas.md`), guion
(`contenido/guiones/claves/2026-09-04-contraloria-reparo-juicio-cuentas.md`)
y video (episodio en `contenido/podcast/episodios.json`, 562 s, público en
métricas). `indice.md` y `banco-temas.md` quedaron actualizados (última línea
de cada uno corresponde a hoy).

**Cambio de arquitectura probado esta madrugada**: el barrido ahora emite un
evento (push a un PR permanente, `contenido/barrido/ultimo-evento.txt`) que
despierta a ChatGPT en vez de esperar el horario fijo de las 03:10. Prueba
superada: evento a las 01:01:16, preselección entregada a las 01:03:23 (2 min
7 s). Decisión y prueba documentadas en `bitacora/PENDIENTES.md` líneas 23-32
y acordadas con Santiago. No es un hallazgo, es la explicación de por qué
barrido y preselección salieron 2 horas antes de lo que marca el cuadro
vigente del panel.

## Qué falló

Sin fallas que bloqueen nada. Dos observaciones menores:

1. El prompt guardado en el trigger de esta rutina está una versión atrás
   del archivo del repo (ver nota de contrato arriba).
2. `node scripts/validar-tarjetas.js --fecha 2026-09-04` dio un aviso:
   `línea 80: tercera [DATO cifra] seguida (cuota: máximo dos)` en
   `contenido/guiones/informe/2026-09-04.md` (TPM línea 64, Orionx línea 71,
   Viento Puelche línea 80: tres tarjetas de cifra seguidas sin otro tipo de
   tarjeta entre medio).

## Propuestas

1. En el trigger `trig_01GDbvJ1Wjzy25bnVRCXgygZ`, actualizar el prompt
   guardado para que coincida con `prompts/auditoria-matinal.md` (punto 4:
   leer `durSeg` de `contenido/podcast/episodios.json` en vez de estimar por
   palabras; punto 3: agregar "guardia" a la lista de workflows a revisar).
2. En `contenido/guiones/informe/2026-09-04.md`, entre las líneas 71 y 80,
   cambiar el tipo de una de las dos tarjetas [DATO cifra] (Orionx o Viento
   Puelche) a un tipo distinto (comparación, cambio o esquema) para respetar
   la cuota de máximo dos [DATO cifra] seguidas. Si el patrón se repite
   mañana, revisar el prompt que arma las tarjetas (`prompts/guion-informe.md`
   o el que corresponda) en vez de corregir a mano cada día.

## Triage

- **HOY**: ninguna. Nada rompe la edición de mañana, no hay pérdida de datos
  ni defecto visible ya publicado.
- **AGUANTA**: propuesta 1 (el prompt guardado desactualizado no afecta la
  producción, solo el criterio de esta misma auditoría; conviene corregirlo
  antes de que la próxima corrida repita el criterio viejo).
- **MIRAR**: propuesta 2 (aviso nuevo del validador de tarjetas; no se había
  visto en los tres días anteriores, vigilar si vuelve a aparecer mañana).

## Los números

Canal: 7 suscriptores (+0) · 1263 vistas totales (+252) vs 1011 (+356) ayer.

**Videos largos** (los que suman a las 4.000 horas; excluye "Cinco cosas..."):
el mayor movimiento fue "Clave: ¿Cómo conviven soberanía y libre navegación
en un estrecho?" (Clave del 03-09), +86 vistas. Le siguen "Clave: fondos
generacionales" +12, "La economía cae 1,5%..." +11, "Milei llega a Chile"
+7, y los dos videos largos del 03-09 recién publicados ese día ("Kast recibe
a Milei", "¿Cómo conviven soberanía...") +5 cada uno. Los dos videos largos
de HOY (informe "Chile y Argentina ratifican..." y Clave "¿Qué ocurre cuando
Contraloría...") están recién publicados, 0 vistas todavía, normal a esta
hora.

**Shorts** (se anotan, no se celebran): "Cinco cosas... jueves 3 de
septiembre" +35 vistas, el mayor movimiento del día en esa serie.

## Comparación con ayer

**Mejoró**:
- El hallazgo recurrente de `contenido/revisiones/` (falta "Informe diario"
  en el bloque "Fuentes:" del guion de Claves; apareció 08-31, 09-01 y 09-03)
  desapareció hoy. Se verificó en el guion de hoy: "Informe diario de
  Entender Chile, 4 de septiembre de 2026" figura en Fuentes y está citado
  en el cuerpo (líneas 11, 13, 88, 106). El fix llegó con el commit `b1185d9`
  de esta madrugada ("crédito total de fuentes en prosa").
- La duración de los guiones quedó dentro de la promesa: informe 655 s
  (10,9 min), Clave 562 s (9,4 min), leídos de `episodios.json`. Ayer
  (09-03) la auditoría había marcado HOY "duración del guion muy sobre la
  promesa"; el mismo commit de hoy recalibró el techo de palabras a 138 ppm
  (audio real) y el problema no volvió a aparecer.
- Las métricas del día se generaron sin problema. Ayer el HOY era
  justamente que no se habían generado por una cuota agotada.
- Preselección pasó de horario fijo (03:10) a evento (01:03): casi 2 horas
  y media de colchón adicional antes del informe, probado y documentado.

**Sigue igual**: ninguna rutina se atrasó más de 20 minutos; todos los
workflows de GitHub Actions terminaron en éxito; VEREDICTO: APROBADA se
mantiene.

**Nuevo**: el aviso del validador de tarjetas sobre tres [DATO cifra]
seguidas (no estaba en los tres días anteriores); la desactualización del
prompt guardado en este mismo trigger.
