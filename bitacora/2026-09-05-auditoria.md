ESTADO: CON OBSERVACIONES

Medido el 05-09-2026 a las 09:34 de Chile, por la rutina de las 09:30
(`trig_01GDbvJ1Wjzy25bnVRCXgygZ`).

**Nota de contrato**: el prompt guardado en este disparador sigue una versión
atrás del `prompts/auditoria-matinal.md` actual (mismo problema que ayer,
propuesta 1, solo parcialmente corregido: "guardia" ya se agregó a la lista
de workflows del punto 3, pero el punto 4 sigue pidiendo estimar la duración
del guion "contra los diez minutos que promete estrategia/" en vez de leer
`durSeg` de `contenido/podcast/episodios.json`, que es el método que el
archivo vigente usa desde el 04-09). Esta auditoría usó el método del
archivo vigente (más correcto). Ver propuesta 1.

## Qué salió y a qué hora

| Pieza | Hora (Chile) | Estado |
|---|---|---|
| Barrido (evento) | 01:33 | ok |
| Preselección | 01:37 | ok, 4 min tras el barrido |
| Observatorio plata pública | 05:51 | ok |
| Informe | 03:32 | ok |
| Clave (entrega) | 03:45 | ok |
| Guion del informe | 04:02 | ok |
| Guion de la Clave | 04:16 | ok |
| Revisión editorial | 04:44 | VEREDICTO: APROBADA, "Sin hallazgos" |
| Edición diaria (render, 4 videos) | 04:44-06:15 | ok, ~91 min (ayer ~58 min) |
| Descripciones (informe y Clave) | 06:00 | ok |
| Reconstrucción web | 06:15 | ok |
| Reloj de métricas (cron 08:45) | 08:45 | ok, no hizo nada: el archivo del día ya existía (correcto por diseño) |
| Métricas del día | 00:37 | ok, pero muy adelantada (ver Qué falló) |
| Guardia (urgentes) | 08:08 | ok |

Los tres eslabones de la Clave están completos: entrega
(`contenido/claves/2026-09-05-balance-estructural-regla-fiscal.md`), guion
(`contenido/guiones/claves/2026-09-05-balance-estructural-regla-fiscal.md`)
y video (episodio en `contenido/podcast/episodios.json`, 595 s). `indice.md`
y `banco-temas.md` quedaron actualizados (última línea de cada uno
corresponde a hoy, verificado).

## Qué falló

Nada bloquea la edición de mañana ni hay defecto publicado grave. Cuatro
observaciones:

1. **El prompt guardado en este mismo trigger sigue desactualizado**, ahora
   por segundo día (ver nota de contrato arriba). Es el mismo hallazgo de
   ayer, corregido a medias.

2. **`node scripts/validar-tarjetas.js --fecha 2026-09-05`** dio 4 avisos:
   - línea 49: dos "cifra" seguidas en el bloque "Fondo de Cesantía Solidario"
   - línea 77: dos "cambio" seguidas en el bloque "Secuestros y extorsión"
   - línea 111: cifra exacta en voz ("3.905"): redondear a tres cifras
     significativas
   - línea 111: cifra exacta en voz ("2.442"): redondear a tres cifras
     significativas
   Verificado en `contenido/guiones/informe/2026-09-05.md` línea 111: el
   guion narra "tres mil novecientas cinco" y "dos mil cuatrocientas
   cuarenta y dos", ambas con 4 cifras significativas habladas, sobre el
   tope de 3 que fija la regla de redondeo en voz (04-09, REGLAS-DURAS 38b).

3. **La revisión editorial no cazó la violación de la regla de redondeo en
   voz, y esto ya es el segundo día seguido.** `contenido/revisiones/
   2026-09-05.md` dice "Hallazgos: Sin hallazgos", pero el punto (e) de su
   propio checklist (`prompts/revision-editorial.md` línea 29) exige marcar
   justo esa violación como [MENOR]. Se verificó que el mismo patrón ocurrió
   ayer: `contenido/revisiones/2026-09-04.md` también dijo "Sin hallazgos" y
   `contenido/guiones/informe/2026-09-04.md` líneas 90 ("setecientas sesenta
   y dos mil trescientas veintiséis"), 93 ("tres mil seiscientos cuarenta
   millones quinientos cuarenta y cuatro mil ochocientos"), 97 y 119 tenían
   la misma violación, también sin marcar. El validador automático la caza
   los dos días; la revisión editorial, que tiene la regla escrita en su
   propio prompt, no la aplica ninguno de los dos.

4. **`bitacora/metricas/2026-09-05.md` se generó a las 00:37, no a las
   ~08:47 que documenta el cuadro del panel.** El reloj de métricas
   (`trig_01MxzGdh2P489TmgkUi9spWd`, cron 12:45 UTC = 08:45 Chile) sí corrió
   a su hora (`last_fired_at` 2026-09-05T12:45:39Z) pero no hizo nada porque
   el archivo del día ya existía, que es su comportamiento correcto por
   diseño. Lo anómalo es el commit que sí escribió el archivo:
   `a38f547` ("métricas 2026-09-05 [bot]"), disparado por un push manual de
   la sesión `session_01L9oxLCKfBZJRqTuWWmnZcD` (Claude Fable 5.1) a las
   00:37, la misma sesión que un minuto antes había empujado "ids de los
   videos del 04-09 para los embeds de la web". No hay registro en
   `bitacora/PENDIENTES.md` ni en `estrategia/decisiones.md` de que mover el
   horario de métricas sea una decisión tomada (a diferencia del cambio de
   arquitectura de barrido, que sí quedó documentado y probado el 04-09).
   Efecto práctico: la comparación "vs 2026-09-04" de hoy mide una ventana de
   ~9,5 horas (desde el métricas de ayer, corrido ~19:02 UTC / 15:02 Chile)
   en vez de las ~24 horas habituales, lo que puede achicar los movimientos
   reportados frente a un día normal.

## Propuestas

1. En el trigger `trig_01GDbvJ1Wjzy25bnVRCXgygZ`, actualizar el prompt
   guardado para que el punto 4 lea `durSeg` de
   `contenido/podcast/episodios.json` en vez de estimar contra la promesa de
   estrategia/, igual que ya hace `prompts/auditoria-matinal.md` vigente.

2. En `contenido/guiones/informe/2026-09-05.md` línea 111, cambiar "tres mil
   novecientas cinco" y "dos mil cuatrocientas cuarenta y dos" por sus
   formas redondeadas ("casi cuatro mil" / "más de dos mil cuatrocientos"),
   dejando las cifras exactas en la marca `[DATO comparacion]` que ya las
   tiene.

3. En `prompts/revision-editorial.md`, la categoría (e) existe desde el
   04-09 pero no se está aplicando en la práctica dos días seguidos. Antes
   de reescribir el prompt, vale la pena confirmar con Santiago si la
   rutina de revisión (`trig_019cchTdDCVeVzVh8HjrZrYG`) efectivamente tiene
   cargada la versión del prompt con la categoría (e): `bitacora/
   PENDIENTES.md` registra, bajo "REVISIÓN 1", que esa carga requería una
   sesión local y que un intento desde la nube fue rechazado. Si el prompt
   vivo de la rutina sigue sin la categoría (e), el fallo no es de criterio
   sino de que la regla nunca llegó a cargarse.

4. Sobre el horario de métricas: preguntar a Santiago si el push manual de
   anoche (00:37) fue una decisión consciente de adelantar el reloj de
   métricas o un efecto colateral de trabajar en la web a esa hora. Si se
   repite, conviene documentarlo en decisiones.md como se hizo con el
   evento del barrido, para que esta auditoría deje de marcarlo como
   anomalía.

## Triage

- **HOY**: ninguna. Nada rompe la edición de mañana, no hay pérdida de
  datos ni defecto ya publicado que sea grave (el redondeo en voz es
  siempre [MENOR] por definición de la propia regla).
- **AGUANTA**: propuesta 1 (prompt del trigger desactualizado, segundo día;
  no afecta la producción, solo el criterio de esta misma auditoría).
- **MIRAR**:
  - propuesta 2 (cifras exactas en voz en el guion de hoy: aviso nuevo cada
    día distinto, no exactamente el mismo hallazgo, pero el patrón de fondo
    —el guionista no aplica el redondeo— ya lleva más de dos días).
  - propuesta 3 (la revisión editorial no aplicó su propia categoría (e) dos
    días seguidos: 04-09 y 05-09. Si se repite un tercer día, pasa a
    AGUANTA o HOY, porque significaría que el checklist está roto, no que
    fue una pasada de más).
  - propuesta 4 (métricas corrió 8 horas antes de lo documentado; una sola
    vez no es tendencia, pero si se repite achica la ventana de medición de
    forma sistemática).

## Los números

Canal: 7 suscriptores (+0) · 1627 vistas totales (+298) (vs 1263, +252 de
ayer). Ventana de medición más corta que lo habitual (~9,5 h en vez de
~24 h, ver Qué falló punto 4), así que la comparación de magnitud con ayer
no es directa.

**Videos largos** (informe y Clave, la única serie que suma a las 4.000
horas): el mayor movimiento fue "Clave: ¿Qué ocurre cuando Contraloría
detecta un perjuicio fiscal?" (Clave del 04-09), +27 vistas. Le siguen "La
economía cae 1,5%..." +7, "¿Cómo funcionan los fondos generacionales...?"
+6, "Chile y Argentina ratifican..." (informe del 04-09) +5, "Kast recibe a
Milei..." +2. Los dos videos largos de HOY (informe "Muere Camilo
Escalona..." y Clave "¿Cómo funciona la regla fiscal...?") aún no aparecen
en la tabla de métricas por la hora temprana de la corrida (00:37, antes de
que el informe de hoy siquiera existiera); se medirán recién mañana.

**Shorts** (se anotan, no se celebran): "Cinco cosas... viernes 4 de
septiembre" +115, "Cinco cosas... jueves 3 de septiembre" +95, y el Short de
guardia "¿Esperabas que bajaran las tasas?..." +38 (el mayor movimiento de
toda la tabla, pero es un Short, no video largo).

## Comparación con ayer

**Mejoró**: nada nuevo que ayer no tuviera ya resuelto (revisión sin
hallazgos declarados, Clave completa en sus tres eslabones, ninguna rutina
con atraso mayor a 20 minutos sobre su hora esperada).

**Sigue igual**:
- El prompt guardado en el trigger de esta auditoría sigue sin actualizarse
  del todo (segundo día; ayer se marcó AGUANTA, hoy sigue AGUANTA).
- Preselección por evento sigue funcionando rápido (4 min hoy, 2 min ayer).
- VEREDICTO: APROBADA se mantiene, aunque hoy se verificó que ese veredicto
  no está revisando todo lo que su propio prompt le pide (ver punto 3).

**Nuevo**:
- El hallazgo de que la revisión editorial no aplica la categoría (e)
  (redondeo en voz) es nuevo EN ESTA AUDITORÍA, pero al comparar contra el
  guion de ayer se confirmó que el mismo vacío ya existía el 04-09: es un
  hallazgo que estaba oculto y esta es la primera vez que se documenta.
- La corrida de métricas a las 00:37 en vez de ~08:47 es un patrón que no
  se había visto en las auditorías anteriores (28-08 a 04-09).
- La edición diaria (render) tardó ~91 minutos hoy contra ~58 ayer; no llegó
  a afectar la hora de publicación (arrancó puntual a las 04:44) pero es un
  dato a vigilar si la duración sigue creciendo.
