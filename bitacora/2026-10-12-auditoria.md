# Auditoría matinal · 12-10-2026

ESTADO: CON FALLAS — HOY: la propia auditoría matinal se saltó el 11-10-2026
sin dejar rastro ni aviso, por tercera vez en cinco mañanas (06, 07 y 08-10
ya constaban; ahora se suma el 11-10), y esta vez no se puede culpar a la
suscripción de Claude porque el validador SÍ trabajó ese día. También HOY:
`scripts/gate.js:52` sigue exactamente con el bug marcado desde el 06-10 (van
seis mañanas), y el guion de hoy volvió a pintar una sigla sin expandir en
pantalla ("SHOA"), publicada tal cual.

## Qué salió y a qué hora (hoy, 12-10-2026)

Toda la cadena diaria llegó, se aprobó y corrió adelantada: ningún tramo
superó los 20 minutos de atraso salvo Métricas.

| Pieza | Hora (Chile) | Esperada | Atraso |
|---|---|---|---|
| Barrido | 01:50 | 01:40 | +10 min |
| Preselección (APROBADA, vuelta 0) | 02:05 | 02:10 | adelantado |
| Informe (APROBADA, vuelta 1, 1 corrección) | 02:18 | 02:40 | adelantado 22 min |
| Guion del informe (APROBADA, vuelta 1, 1 corrección) | 02:46 | 03:10 | adelantado 24 min |
| Revisión (veredicto final, APROBADA) | 03:09 | 03:30 | adelantado 21 min |
| Carátula (`contenido/caratulas/2026-10-12.png` + prompt) | — | — | ok (llegó después de la revisión, no bloqueó) |
| Descripciones del informe | 03:46 | — | ok |
| Podcast (`episodios.json`, informe, 739 s = 12,3 min) | 03:56 | ~10 min, 12-13 cargado | dentro de rango |
| Videos y render (`edicion-diaria.yml` run 38211203583) | 03:09 → 03:56 (47 min) | — | ok |
| Métricas | 05:20 | ~05:00 | +20 min |

Verificado en GitHub Actions: `barrido.yml` run 38205359250 (04:49 UTC = 01:49
Chile, éxito), `edicion-diaria.yml` runs 206-208 (todos `success`), `web.yml`
runs 321-324 (todos `success`), `metricas.yml` run 38222950909 (08:20-08:21
UTC = 05:20-05:21 Chile, éxito). `node scripts/validar-tarjetas.js --fecha
2026-10-12`: "variedad OK: ninguna cuota rota, ninguna marca malformada". El
informe de hoy no deja ninguna marca `PENDIENTE DE CIERRE` abierta (buscado
explícitamente con grep, cero resultados). No hubo Clave hoy (la última
entrega sigue siendo la de licencias médicas del 07-10); sí corresponde
revisar el domingo que cerró: `contenido/claves/semana/2026-W41-candidatos.md`
existe, tiene 106 líneas y contenido real (creado hoy 01:50, por el barrido de
la madrugada que alimenta el ranking semanal).

## Qué falló

1. **La auditoría matinal del 11-10-2026 no existe: no corrió, o corrió y no
   dejó archivo, y nadie se enteró hasta ahora.** Buscado explícitamente con
   `git log --all --diff-filter=A -- bitacora/2026-10-11-auditoria.md`: cero
   resultados, nunca existió. Esto es distinto del caso del 07 y 08-10 (que
   esta misma lista ya tiene anotado en "Dependen de Santiago" con la teoría
   de la suscripción vencida de Claude): ese día la cadena entera quedó muda.
   El 11-10 NO: `contenido/estado/2026-10-11.md` dice `ETAPA: videos_listos` /
   `VEREDICTO: APROBADA` / `FALTA: nada, el día está completo`, y Claude sí
   escribió sus tres veredictos (`contenido/veredictos/2026-10-11-preseleccion.md`,
   `-informe.md`, `-guion_informe.md`) y la revisión
   (`contenido/revisiones/2026-10-11.md`). Es decir: el turno de Claude como
   validador funcionó perfecto ese día, pero el turno de Claude como auditor
   de las 05:30 (`trig_01GDbvJ1Wjzy25bnVRCXgygZ`, cron `30 8 * * *`, sin
   restricción de día de semana) no dejó ningún rastro: ni
   `bitacora/2026-10-11-auditoria.md`, ni `bitacora/2026-10-11.md` (el archivo
   del día, tampoco existe). Consultado `get_trigger` sobre esa rutina: solo
   trae el último disparo (hoy, 12-10), sin historial del 11-10, así que no se
   puede saber desde acá si el disparo ocurrió y la sesión falló en silencio,
   o si el disparo mismo no llegó. Es la tercera vez en cinco mañanas (06, 07,
   08 y ahora 11-10) que un eslabón de Claude queda mudo sin aviso, y la
   segunda explicación distinta para el mismo síntoma.

2. **`scripts/gate.js:52` sigue exactamente con el bug marcado desde el
   06-10, van seis mañanas (06, 07, 08, 09, 10 y hoy 12-10; el 11-10 no tuvo
   auditoría propia, pero el archivo no cambió en ningún commit entre el
   10-10 y hoy, verificado con `git log -- scripts/gate.js`).** Línea leída
   en esta corrida: `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) &&
   f.endsWith(".md"))`, todavía sin el `&& !f.endsWith("-imagenes.md")` que se
   propuso el 06-10. Hoy no mordió porque no hay ningún archivo en
   `contenido/guiones/claves/` que empiece con `2026-10-12` (no hay Clave
   hoy), pero la Clave "acuerdo-internacional-sin-tratado" sigue en
   `idea_lista` esperando el sí de Santiago (ver "Dependen de Santiago" en
   `PENDIENTES.md`): el día que se apruebe y su producción coincida con la
   validación de un informe, el bug se repite.

3. **El guion de hoy pintó "SHOA" sin expandir en un titular, publicado tal
   cual.** `contenido/revisiones/2026-10-12.md` lo dice explícito: "'SHOA' se
   pinta en un titular sin expansión previa, fuera del alcance de la regla de
   siglas, que está escrita para las marcas [FUENTE] y el pie de un [DATO]".
   Es la misma causa de fondo que esta auditoría viene marcando desde el
   23-09 (DMC, luego SEC/Senapred/DW, SAG/CONAF, Fogape, Confusam/CIPER,
   Mineduc/REDIMIN/CIPER el 09-10, Senapred el 10-10, y ahora SHOA): la regla
   de `prompts/guion-informe.md:230` sigue restringida a "(en esta marca o en
   el pie de un [DATO])" y nunca se generalizó a titulares y [TESIS] como
   pidió la propuesta del 29-09. No bloqueó el veredicto, pero es un defecto
   ya en el video que salió al aire hoy.

4. **Nuevo hallazgo de hoy: `contenido/casos/hitos.md` registra el mismo
   hecho dos veces bajo dos dossiers distintos, y el guion lo narró dos veces
   hasta que el validador lo fusionó a mano.** Líneas 42 y 44 de
   `contenido/casos/hitos.md`, ambas fechadas 2026-10-11: la línea 42 (dossier
   `fonasa-licencias-falsas.md`) y la línea 44 (dossier
   `licencias-medicas-funcionarios.md`) cuentan el mismo par de recursos de
   nulidad contra el juicio de Fonasa con las mismas fechas y el mismo
   nombre de jueza. El informe de hoy los copió como dos entradas de "¿En qué
   quedó?" (según el commit de la revisión, sus líneas 253 y 255) y el guion
   los narró dos veces; el veredicto de la vuelta 1 los fusionó, así que no
   llegó al aire duplicado, pero si los dos hitos siguen separados en
   `hitos.md`, el mismo trabajo de fusión se paga de nuevo mañana.

5. **La cifra del aluvión de San Carlos de Apoquindo lleva tres ediciones
   seguidas (10, 11 y 12-10) sin una fuente de organismo que cuadre entre
   medios, y nunca bajó a la lista viva.** `contenido/revisiones/2026-10-12.md`:
   "Es la tercera advertencia igual, del 10-10-2026 en adelante"; hoy el
   barrido no trae ninguna cifra de organismo (cero coincidencias de "FIBE" o
   "damnificad"; lo único de Senapred en el barrido de hoy es la Alerta
   Temprana Preventiva de Valparaíso, de otro evento), y la única cifra nueva
   es municipal y de un solo medio. No bloqueó nada (el validador la sigue
   dejando fuera de cámara), pero es exactamente el patrón que esta auditoría
   debe detectar: tres mañanas repitiéndose sin que nadie lo anote.

6. **El barrido lleva tres ediciones seguidas (10, 11 y 12-10) sin ninguna
   noticia de pensiones chilenas, pese a que la consulta ya las incluye.**
   `contenido/revisiones/2026-10-12.md`: "el barrido de hoy no tiene nada de
   pensiones chilenas (cero coincidencias de 'pensión', 'pensiones',
   'cotizacion' y 'jubila'; la única entrada de AFP es un proyecto peruano)".
   `contenido/barrido/fuentes.json:65` ya consulta `"Chile (empleo OR salario
   OR pensiones OR AFP OR sindicato)"`, así que la cobertura cero tres días
   seguidos no es falta de intención en la consulta. Las revisiones del 10 y
   11-10 ya lo marcaron como "información para mejorar el barrido, no un
   hueco del editor", pero nunca bajó a `PENDIENTES.md` (buscado
   explícitamente, no hay ninguna entrada con "pension").

Sin otras fallas: preselección, carátula, podcast y render corrieron limpios
y aprobados.

## Propuestas

1. Pedir a Santiago que revise si la rutina `trig_01GDbvJ1Wjzy25bnVRCXgygZ`
   (Auditoría matinal) se disparó de verdad el 11-10-2026 y, si lo hizo, qué
   pasó con esa sesión (la API de rutinas solo guarda el último disparo). Si
   se confirma que se disparó y la sesión falló en silencio, la noche debería
   agregar una marca explícita de fallo (un archivo o aviso al agotar el
   intento) en vez de que la ausencia del archivo sea la única señal, igual
   que ya se propuso para el caso del 07 y 08-10.
2. En `scripts/gate.js`, línea 52, cambiar
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))`
   por
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md") && !f.endsWith("-imagenes.md"))`.
3. En `prompts/guion-informe.md`, línea 230, quitar la restricción entre
   paréntesis "(en esta marca o en el pie de un [DATO])" de la regla de
   siglas, para que cubra cualquier marca del guion (titulares, [TESIS],
   [ESQUEMA], [FUENTE], pie de [DATO]).
4. En `contenido/casos/hitos.md`, fusionar las líneas 42 y 44 en una sola
   entrada (el dossier correcto es `fonasa-licencias-falsas.md`, que es el
   caso de fondo; si se quiere mantener el cruce en
   `licencias-medicas-funcionarios.md`, dejar ahí una referencia corta en vez
   de repetir el hecho completo).
5. Revisar `contenido/barrido/fuentes.json` y las fuentes institucionales sin
   feed para ver si falta un feed directo de la Superintendencia de
   Pensiones o si la consulta OR de la línea 65 está perdiendo resultados por
   otra razón (orden de términos, límite de resultados de Google News), ya
   que la cobertura cero de pensiones lleva tres días con la consulta ya
   incluyéndolas.
6. Sin propuesta de código para el hallazgo 5 (San Carlos de Apoquindo): es
   un hueco de fuentes de prensa, no del editor; queda anotado para que no se
   siga perdiendo la cuenta de cuántos días lleva.

## Triage

- **HOY**: hallazgo 1 (auditoría muda del 11-10) → propuesta 1. Tercera vez
  en cinco mañanas que un turno de Claude queda mudo sin aviso, y esta vez
  sin la explicación de la suscripción.
- **HOY**: hallazgo 2 (`scripts/gate.js:52`) → propuesta 2. Sexta mañana
  marcada.
- **HOY**: hallazgo 3 (sigla "SHOA" sin expandir, publicada) → propuesta 3.
  Entrada ya existente desde el 23-09; se le agrega la recurrencia de hoy.
- **AGUANTA**: hallazgo 4 (hitos.md duplicado) → propuesta 4. No rompió nada
  hoy porque el validador lo fusionó a mano, pero se vuelve a pagar mañana si
  no se arregla en la fuente.
- **AGUANTA**: hallazgo 6 (pensiones ausentes del barrido, tercer día) →
  propuesta 5.
- **MIRAR**: hallazgo 5 (cifras del aluvión de San Carlos de Apoquindo sin
  fuente de organismo, tercera edición) → propuesta 6. No rompe nada porque
  el validador lo sigue dejando fuera de cámara, pero ya es un patrón de tres
  días y conviene vigilar que no se convierta en una cifra municipal sola
  llegando a pantalla por cansancio.
- **MIRAR**: Métricas sigue llegando ~20 minutos después de lo esperado
  (~05:00), estable y sin empeorar (20 min el 09 y el 12-10, 21 min el
  10-10): sigue sin ser una falla, solo conviene no dejar de vigilarlo.
- **La ambigüedad de "La noticia del día"** (¿el tope de 25-35 palabras de
  `prompts/guion-informe.md:94` cuenta la [TESIS] narrada o solo el párrafo?)
  volvió a aparecer en `contenido/revisiones/2026-10-11.md` y
  `contenido/revisiones/2026-10-12.md`. Ya está en `PENDIENTES.md` desde el
  10-10 como AGUANTA; se le agrega la recurrencia de hoy, sin volver a
  proponerla de cero.

## Bajada a la lista viva

- Auditoría muda del 11-10: se agregó como nueva línea a la entrada existente
  del 07 y 08-10 en "Dependen de Santiago" (no se duplicó la entrada, porque
  es el mismo síntoma con una explicación distinta que hay que resolver
  junto).
- `scripts/gate.js:52`: ya existía la entrada en "Para la sesión de la
  noche" (agregada el 06-10, última actualización el 10-10). Se le agregó la
  línea de "sexta mañana" con la evidencia de hoy, sin duplicar.
- Sigla sin expandir en pantalla: ya existía la entrada (misma sección,
  agregada el 23-09, última actualización el 10-10). Se le agregó la
  recurrencia de hoy ("SHOA"), sin duplicar.
- "La noticia del día": ya existía la entrada (agregada el 10-10). Se le
  agregó la recurrencia del 11 y 12-10, sin duplicar.
- `contenido/casos/hitos.md` duplicado: buscado explícitamente en
  `estrategia/decisiones.md` y `bitacora/REALIZADOS.md`, no hay ninguna
  decisión de NO tocarlo ni evidencia de que ya se haya corregido. No existía
  ninguna entrada con "hitos.md"; se agregó entrada nueva en "Para la sesión
  de la noche".
- Pensiones ausentes del barrido: buscado explícitamente, no existía ninguna
  entrada con "pension". Se agregó entrada nueva en "Para la sesión de la
  noche".
- San Carlos de Apoquindo (MIRAR, no HOY): no se baja todavía, siguiendo la
  regla de que MIRAR es tendencia a vigilar, no tarea ejecutable; si aparece
  una cuarta vez, pasa a AGUANTA con entrada propia.

## Comparación con ayer

No hay auditoría del 11-10 para comparar directamente (es, de hecho, el
hallazgo 1 de hoy); la comparación se hace contra la del 10-10
(`bitacora/2026-10-10-auditoria.md`), con los datos intermedios del 11-10
leídos directo de los archivos del repo:

- **Mejoró**: la cadena de hoy costó menos que la de ayer: 2 correcciones
  en total (informe vuelta 1, guion vuelta 1) contra las 4 del 11-10
  (preselección vuelta 1, informe vuelta 2, guion vuelta 1). Las vistas
  totales subieron +1.109 hoy contra +110 el 11-10 y +283 el 10-10, tirado
  por el aluvión y la muerte de los dos contratistas en El Teniente. Horas
  vistas en largos subieron de 18,8 (10-10) a 18,9 (11-10) a 19,4 hoy, y la
  retención media ponderada de los largos saltó de 22,8% (10-10) a 28,3%
  hoy, la mejor cifra reciente.
- **Sigue igual**: `scripts/gate.js:52` sin tocar (sexta mañana); la regla de
  siglas sigue restringida a [FUENTE]/[DATO] y volvió a dejar una sigla sin
  expandir en pantalla (Senapred el 10-10, ahora SHOA); Métricas sigue
  llegando ~20 minutos tarde; suscriptores siguen subiendo de a uno por día
  (32 → 33 → 34).
- **Nuevo**: la auditoría muda del 11-10 (hallazgo 1); el duplicado de
  `contenido/casos/hitos.md` (hallazgo 4); la ausencia de pensiones en el
  barrido pasó de dos días (marcada apenas de pasada el 10 y 11-10) a tres,
  y hoy se baja por primera vez a la lista viva; las cifras del aluvión de
  San Carlos de Apoquindo pasan de dos a tres ediciones seguidas sin fuente
  de organismo.
