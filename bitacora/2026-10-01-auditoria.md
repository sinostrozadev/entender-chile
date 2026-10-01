ESTADO: CON OBSERVACIONES — la cadena corrió sin fallas técnicas (todas las
corridas de Actions de hoy en `main` tienen `conclusion: success`: Barrido run
96, Edición diaria runs 251-159, Métricas run 96, Web runs 250-256, Estado del
día runs 417-426, verificado con `mcp__github__actions_list`) y cerró antes de
lo previsto en cada eslabón. Sin `HOY`: lo que costó (tres vueltas en el
informe, el mismo patrón de rescate de la preselección por tercer día) no rompió
nada ni dejó un defecto visible, y por eso queda en `AGUANTA`/`MIRAR`.

Nota de método: el checkout de este contenedor llegó con la historia de git
truncada (shallow clone con un solo commit "raíz" fechado hoy a las 02:04:42).
Esto hacía parecer, con `git log --diff-filter=A`, que barrido, preselección e
informe se habían creado todos en el mismo minuto: no es cierto, es un
artefacto local. Se corrigió con `git fetch --unshallow` antes de medir
cualquier hora; todas las horas de este archivo salen ya de la historia
completa (2257 commits). Se anota para que mañana no se repita la confusión si
otro contenedor arranca igual de acotado.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (`bitacora/cronograma.json`) | Nota |
|---|---|---|---|
| Barrido | 01:41 (`barrido 2026-10-01 [bot]`, run 36816220647) | ~01:31 | 10 min, dentro de tolerancia (no pasa los 20 min) |
| Preselección (GPT + validación) | aprobada 01:59:47, vuelta 1 | ~01:35 en adelante | 1 corrección: "por qué podría importar" repetía 12 frases de plantilla en 50 candidatas y 49 titulares venían copiados textuales del barrido |
| Informe (GPT + validación) | aprobado 02:42:05, vuelta 3 | tras preselección | 3 correcciones: apertura fuera de portada y sin sección "Además, hoy" (vuelta 1); una reacción parlamentaria (Yeomans, Soto) sin respaldo en preselección ni barrido (vuelta 2); un párrafo sin fuente que la propia corrección de la vuelta 2 dejó así al borrar la frase vecina que lo cubría (vuelta 3) |
| Guion del informe (GPT + validación) | aprobado 03:04:06, vuelta 1 | tras informe | 1 corrección con 9 incumplimientos de forma, resueltos tocando solo esos 9 lugares (verificado contra el diff completo) |
| Revisión (compuerta, `contenido/revisiones/2026-10-01.md`) | 03:05:22, APROBADA | — | cierra 2 vueltas antes del tope de 4 (`prompts/validador.md:197`) |
| Edición diaria (voz, render, subida, carátula, podcast) | `videos_listos` 03:37:37 (run 36822957307, 06:05→06:37 UTC) | ~04:00 | adelantada, sin incidentes; carátula completa (`scripts/imagen-entera.js`) |
| Podcast (`contenido/podcast/episodios.json`) | 656 s = 10,9 min | "~10 min, 12-13 en día cargado" | dentro de la promesa, dato medido del json, no estimado |
| Métricas | 05:15:07-05:15:58 (reloj + workflow) | 05:00 | 15 min de margen, dentro de tolerancia |
| Clave | no corrió | — | correcto: CLAVE 4 no es diaria y hoy no es domingo |

## Qué falló

Sin fallas técnicas. Tres observaciones de calidad, ninguna con defecto visible
en lo publicado:

1. **El informe necesitó 3 vueltas de corrección** (02:04 a 02:42, 4
   escrituras), más que preselección y guion (1 cada una). La vuelta 2 atrapó
   algo serio: GPT había atribuido una crítica parlamentaria con nombres
   (Yeomans, Raúl Soto) que no está ni en la preselección ni en el barrido de
   hoy (`contenido/veredictos/2026-10-01-informe.md`, vuelta 2). La vuelta 3
   fue un efecto colateral de esa misma corrección: al borrar la frase que no
   tenía respaldo, se llevó también el único paréntesis de fuente de la frase
   vecina ("Quiroz calificó la expansión como moderada..."), que quedó sin
   atribución un ciclo más. El validador lo encontró y GPT lo resolvió con un
   solo cambio de una línea. El control hizo su trabajo; lo que cuesta es el
   tiempo (38 minutos en este eslabón) y la cuota de GPT.
2. **Tercer día seguido en que el informe rescata temas que la preselección
   dejó fuera** (`contenido/revisiones/2026-10-01.md`): hoy 3 (alerta Sernac
   por 1.700 camionetas Ford, dos investigaciones sobre minerales críticos del
   Escudo de las Américas, el contenido del Presupuesto 2027), contra 5 el
   29-09 y 6 el 30-09. La cifra baja, pero el patrón es el mismo y la propia
   revisión lo repite cada día sin que nadie haya escrito una corrección
   concreta al prompt: "es el mismo patrón tres días seguidos: el arreglo es
   del filtro de la preselección, no del informe" (línea 61). Ninguna entrada
   en `bitacora/PENDIENTES.md` ni decisión en `estrategia/decisiones.md` cubre
   esto (se buscó "rescate" y "FUERA DE LA OLLA" en ambos archivos: cero
   coincidencias).
3. **Las horas vistas en videos largos bajaron por primera vez en la semana**:
   28,9 h hoy contra 30,2 h ayer (-1,3 h), con la retención media ponderada
   cayendo de 36,6% a 28,7% (-7,9 puntos) — la caída de retención más grande
   de los últimos 8 días (`bitacora/metricas/2026-10-01.md` vs series del
   24-09 al 30-09, que venían subiendo sin pausa: 24,3 → 24,9 → 25,1 → 26,1 →
   27,0 → 28,0 → 30,2). Es una sola lectura con ventana móvil de 30 días: no
   alcanza para decir que algo se rompió, pero corta una racha de seis días de
   subida.

## Propuestas

1. **Informe, vuelta 2 que se come su propio paréntesis**: en
   `prompts/informe.md`, en la regla de atribución de fuente por párrafo,
   agregar que al borrar una frase de un párrafo compartido, GPT revise si la
   frase que queda se quedó sin el paréntesis que la cubría (no solo verificar
   que el párrafo borrado no tuviera fuente propia). Evita repetir el mismo
   tipo de regresión en la próxima corrección que borre una frase a mitad de
   párrafo.
2. **Rescate de la preselección, tercer día**: en `prompts/seleccion.md`,
   línea 97-99 ("COBERTURA OBLIGATORIA"), agregar una categoría explícita para
   alertas y retiros de producto (Sernac) junto a las doce ya listadas: hoy el
   retiro de 1.700 camionetas cumplía el criterio de "afecta a muchas
   personas" de la línea 74 pero no cayó bajo ninguna de las doce áreas
   nombradas, así que es plausible que GPT no lo haya buscado activamente. No
   cubre los otros dos rescates de hoy (Escudo de las Américas y Presupuesto
   2027 sí caen en áreas ya listadas: Internacional y Plata pública), que
   parecen un problema de barrido incompleto más que de criterio faltante;
   para esos dos no hay propuesta de línea concreta todavía.
3. **Documentación atrasada**: `bitacora/cronograma.json` (actualizado
   21-09-2026) sigue describiendo el validador en la parte que el panel lee de
   cronograma, pero el tope real de vueltas es 4 desde el 15-09
   (`prompts/validador.md:200`), no 2 como dice la fuente de verdad del panel
   en `bitacora/rutinas.md`/documentación relacionada. No se tocó en esta
   auditoría (no es su archivo), pero quien edite el tope de vueltas de nuevo
   debería revisar también dónde más quedó escrito el número viejo.

## Triage

- `AGUANTA` — Rescate de la preselección, tercer día seguido (hallazgo 2 /
  propuesta 2 arriba): no rompe la edición, la cifra baja, pero ya lleva tres
  días sin una corrección al prompt. Para la sesión de día (solo análisis):
  medir si el patrón sigue bajando antes de tocar `prompts/seleccion.md`.
- `AGUANTA` — Regla de atribución cuando se borra una frase a mitad de párrafo
  (hallazgo 1 / propuesta 1): un solo caso hasta ahora, el validador lo cazó
  antes de publicar. Para la sesión de noche (código y prompts): agregar la
  verificación a `prompts/informe.md` si vuelve a pasar.
- `MIRAR` — Caída de horas vistas y retención en videos largos (hallazgo 3):
  una sola lectura, ventana de 30 días, puede ser ruido o el efecto de que un
  video fuerte salió de la ventana. Revisar mañana si sigue bajando.
- `MIRAR` — `cronograma.json` con el tope de vueltas desactualizado (hallazgo
  nuevo, propuesta 3): no afecta la operación de hoy, solo la documentación
  que lee el panel.

Ningún `HOY`: no hay nada que rompa la edición de mañana, pierda datos o ya
esté publicado con un defecto visible, así que no baja nada a
`bitacora/PENDIENTES.md` en esta auditoría.

## Comparación con ayer (2026-09-30)

- **Mejoró**: el guion del informe cerró en una sola vuelta con una corrección
  de forma, igual de limpio que ayer, pero hoy sin el defecto de siglas sin
  expandir que llevaba siete días seguidos apareciendo (`bitacora/PENDIENTES.md`
  línea 846): no hay mención de siglas en `contenido/revisiones/2026-10-01.md`.
  El rescate de temas de la preselección también bajó (6 → 3).
- **Sigue igual**: la cadena entera vuelve a cerrar antes de lo previsto
  (compuerta a las 03:05, igual de adelantada que ayer a las 02:51), todas las
  corridas de Actions en verde, carátula completa, podcast dentro de la
  promesa. El patrón de rescate de la preselección sigue, tercer día.
- **Nuevo hoy**: el informe tardó 3 vueltas (ayer 1) y una de ellas atrapó una
  atribución fabricada (nombres de diputados sin respaldo en el material), que
  no tiene antecedente en los días recientes revisados. También es nueva la
  caída de horas vistas en videos largos, que no se había visto en la racha de
  subida de la semana pasada.
