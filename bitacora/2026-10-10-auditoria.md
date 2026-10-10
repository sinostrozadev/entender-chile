# Auditoría matinal · 10-10-2026

ESTADO: CON FALLAS — HOY: `scripts/gate.js:52` sigue exactamente con el bug
que esta auditoría viene marcando desde el 06-10, y hoy es la quinta mañana
sin el arreglo de una línea. También HOY: el guion de hoy volvió a pintar una
sigla sin expandir en pantalla ("Senapred"), el mismo defecto que arrastra la
cadena desde el 23-09 y que hoy quedó publicado tal cual.

## Qué salió y a qué hora (hoy, 10-10-2026)

Toda la cadena diaria llegó, se aprobó y corrió adelantada: ningún tramo
superó los 20 minutos de atraso y la mayoría se adelantó a la hora esperada
del panel.

| Pieza | Hora (Chile) | Esperada | Atraso |
|---|---|---|---|
| Barrido | 01:49 | 01:40 | +9 min |
| Preselección (APROBADA, vuelta 0) | 02:10 | 02:10 | a tiempo |
| Informe (APROBADA, vuelta 1, tras 1 corrección) | 02:28 | 02:40 | adelantado |
| Guion del informe (APROBADA, vuelta 2, tras 2 correcciones) | 02:57 | 03:10 | adelantado |
| Revisión (veredicto final, APROBADA) | 02:57 | 03:30 | adelantada |
| Carátula (`contenido/caratulas/2026-10-10.png` + prompt) | — | — | ok |
| Descripciones del informe | 03:35 | — | ok |
| Podcast (`episodios.json`, informe) | 03:49 | — | ok |
| Videos y render (`edicion-diaria.yml` run 38029283588) | 02:57 → 03:49 (52 min) | — | ok |
| Métricas | 05:21 | ~05:00 | +21 min |

Verificado en GitHub Actions: `barrido.yml` run 38025389254 (04:49 UTC = 01:49
Chile, éxito), `edicion-diaria.yml` runs 197-200 (todos `success`,
`display_title` confirma cada vuelta de corrección), `metricas.yml` run
38037518654 (08:20-08:21 UTC = 05:20-05:21 Chile, éxito), y la cadena de
`reintento.yml` de hoy (runs 201-210, cada 20 minutos desde las 02:33 Chile,
todos `success`, es decir ninguno tuvo que reintentar nada real).

Duración del episodio de hoy (`contenido/podcast/episodios.json`, `durSeg`):
**805 s = 13,4 min**, dentro del rango ya visto en días cargados (el 03-10
dio 13,9 min y el 04-10 dio 13,5 min), así que no es un dato nuevo.
`node scripts/validar-tarjetas.js --fecha 2026-10-10`: "variedad OK: ninguna
cuota rota, ninguna marca malformada". El informe de hoy no deja ninguna
marca `PENDIENTE DE CIERRE` abierta (la única línea que la menciona es sobre
la del 09-10, que la preselección de hoy verificó y confirmó cerrada).

No hubo Clave hoy (no es miércoles ni domingo de elección de tema; la última
entrega sigue siendo la de licencias médicas del 07-10, con sus tres
eslabones completos: entrega, guion y mural).

## Qué falló

1. **`scripts/gate.js:52` sigue idéntico, quinta mañana (06, 07, 08, 09 y
   10-10) sin el arreglo de una línea que ya se propuso el 06-10.**
   Verificado leyendo el archivo en esta corrida: la línea sigue siendo
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) &&
   f.endsWith(".md"))`, sin el `&& !f.endsWith("-imagenes.md")` que las
   auditorías del 06 y 09-10 pidieron. Hoy no le costó nada a la edición
   porque no hay ningún archivo en `contenido/guiones/claves/` que empiece
   con `2026-10-10` (no hay Clave hoy), pero el bug ya se reprodujo de verdad
   una vez (07-10, corrida
   `https://github.com/sinostrozadev/entender-chile/actions/runs/37642750015`)
   y sigue listo para repetirse la próxima vez que un guion de Clave real
   coincida con una validación de informe el mismo día.

2. **El guion de hoy pintó "Senapred" sin expandir en pantalla, el mismo
   defecto de siglas que la cadena viene arrastrando desde el 23-09 sin que
   el prompt se haya corregido de fondo.** `contenido/revisiones/2026-10-10.md`
   lo marca explícito: "el choque entre expandir las siglas... hoy dejó
   'Senapred' sin expandir y una fuente de siete palabras". No bloqueó el
   veredicto (igual que el 25, 26-09 y el 09-10, que tuvo el mismo problema
   con Mineduc/REDIMIN/CIPER), pero es un defecto ya publicado en el video de
   hoy. La causa fue identificada hace semanas
   (`prompts/guion-informe.md:211-212` restringe el alcance de la regla de
   siglas y nunca se generalizó como pidió la auditoría del 29-09) y sigue
   sin tocarse.

3. **Hallazgo sobre el propio proceso de auditoría: la ambigüedad de
   "La noticia del día" (¿sus 25-35 palabras cuentan con la [TESIS] narrada o
   solo el párrafo?) lleva al menos cuatro ediciones seguidas marcada en
   `contenido/revisiones/` (09-10 la llama "tercera edición seguida" y hoy
   aparece otra vez) y **nunca bajó a `bitacora/PENDIENTES.md`** (buscado
   explícitamente: no hay ninguna entrada con "La noticia del día" en el
   archivo). Es exactamente el patrón que esta auditoría está instruida a
   detectar: un hallazgo que se repite sin bajar a la lista viva no se
   corrige nunca porque nadie lo ve como tarea. Se agrega hoy, más abajo.

Sin otras fallas: el resto de la cadena (preselección, informe, cola del
guion, carátula, descripciones, podcast, render) corrió limpio y aprobado.

## Propuestas

1. En `scripts/gate.js`, línea 52, cambiar
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))`
   por
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md") && !f.endsWith("-imagenes.md"))`.
2. En `prompts/guion-informe.md`, líneas 211-212, quitar la restricción entre
   paréntesis "(en esta marca o en el pie de un [DATO])" de la regla de
   siglas, para que cubra cualquier marca del guion (titulares, [TESIS],
   [ESQUEMA], [FUENTE], pie de [DATO]) tal como ya pide el ítem 17b del
   checklist (línea 273). Es la propuesta del 29-09, nunca aplicada.
3. En `prompts/guion-informe.md` o `prompts/informe.md`, fijar explícitamente
   si el tope de 25-35 palabras de "La noticia del día" cuenta o no la
   [TESIS] narrada, para que la revisión deje de marcarlo edición tras
   edición sin que nadie lo resuelva.

## Triage

- **HOY**: hallazgo 1 (`scripts/gate.js:52`) → propuesta 1. Quinta mañana
  marcada (06, 07, 08, 09 y 10-10).
- **HOY**: hallazgo 2 (siglas sin expandir, hoy "Senapred") → propuesta 2.
  Entrada ya existente en `PENDIENTES.md` desde el 23-09; se le agrega la
  recurrencia de hoy.
- **AGUANTA**: hallazgo 3 ("La noticia del día", ambigüedad de conteo) →
  propuesta 3. No rompe nada hoy, pero lleva repitiéndose sin bajar a la
  lista viva; se agrega entrada nueva para que no se siga perdiendo.
- **MIRAR**: Métricas sigue corriendo ~20-21 minutos después de la hora
  esperada (~05:00) de forma estable (20 min el 09-10, 21 min hoy): no está
  empeorando, pero conviene seguir vigilando que no se convierta en una
  tendencia creciente.

## Bajada a la lista viva

- `scripts/gate.js:52`: ya existía la entrada (`bitacora/PENDIENTES.md`,
  sección "Para la sesión de la noche", agregada el 06-10, con la
  actualización del 09-10). Se le agregó la línea de "quinta mañana" con la
  evidencia de hoy, sin duplicar la entrada.
- Siglas sin expandir en pantalla: ya existía la entrada (misma sección,
  agregada el 23-09, última actualización el 30-09). Se le agregó la
  recurrencia de hoy ("Senapred"), sin duplicar la entrada.
- "La noticia del día", ambigüedad de conteo de palabras: buscado
  explícitamente en `bitacora/PENDIENTES.md` y en `estrategia/decisiones.md`
  (no hay ninguna decisión de NO tocarlo); no existía ninguna entrada. Se
  agregó entrada nueva en "Para la sesión de la noche" con la evidencia de
  las cuatro ediciones donde aparece marcado.

## Comparación con ayer

Contra la auditoría del 09-10:

- **Mejoró**: la cadena corrió limpia y a tiempo dos mañanas seguidas (09 y
  10-10), después de los dos días mudos del 07 y 08-10. Es la primera señal
  concreta de que lo que sea que haya frenado a Claude esos dos días ya no
  está pasando, aunque sigue pendiente que Santiago confirme el estado de la
  cuenta/suscripción (entrada en "Dependen de Santiago", sin cambios hoy
  porque no hubo ningún corte que reportar).
- **Sigue igual**: `scripts/gate.js:52` sin tocar (va en su quinta mañana); el
  choque entre la regla de siglas y el tope de seis palabras de las marcas
  sigue sin resolverse de fondo y hoy volvió a dejar una sigla sin expandir
  en pantalla; Métricas sigue llegando ~20 minutos después de lo esperado;
  los 32 suscriptores no se mueven.
- **Nuevo**: la ambigüedad de "La noticia del día" se agrega hoy por primera
  vez a `PENDIENTES.md`, aunque el hallazgo en sí no es nuevo (viene de
  ediciones anteriores sin haber bajado nunca a la lista viva).
- **Los números** (`bitacora/metricas/2026-10-10.md` contra el de ayer):
  suscriptores estancados en 32 (+0); vistas totales +283 hoy contra +216
  ayer; horas vistas en videos LARGOS (las que cuentan para las 4.000 horas)
  se mantienen en 18,8 (igual que ayer); la retención media ponderada de los
  largos bajó apenas de 22,9% a 22,8%, dentro del ruido.
