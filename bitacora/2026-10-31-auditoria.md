# Auditoría matinal, 31-10-2026

ESTADO: CON OBSERVACIONES. La cadena de hoy corrió limpia y sin piezas
faltantes; el hallazgo que importa es que la "destrucción del historial de
git" marcada HOY por la auditoría del 30-10 nunca ocurrió, era un clon
shallow del contenedor de esa sesión, y ya la corregí: retiré la entrada
falsa de `bitacora/PENDIENTES.md` antes de que la noche ejecutara el rebase
destructivo que proponía.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Veredicto | Evidencia |
|---|---|---|---|---|
| Barrido | 01:45 | 01:30 | éxito | commit `373c026`..., Actions "Barrido" (04:45 UTC) |
| Preselección (suplente, reparto permanente del 06-10, no es falla) | redactada 01:55, veredicto 01:59 | tras cada pieza | APROBADA vuelta 0 | `contenido/veredictos/2026-10-31-preseleccion.md` |
| Informe | redactado 02:02, veredicto 02:16 | tras cada pieza | APROBADA vuelta 1 (CORREGIR 02:10) | `contenido/veredictos/2026-10-31-informe.md` |
| Guion del informe | redactado 02:18, veredicto 02:31 | tras cada pieza | APROBADA vuelta 1 (CORREGIR 02:25) | `contenido/veredictos/2026-10-31-guion_informe.md` |
| Revisión (compuerta) | 02:33 | tras cada pieza | APROBADA vuelta 1 | `contenido/revisiones/2026-10-31.md` |
| Edición diaria (render, descripciones, podcast) | videos_listos 02:50 | ~04:00 | éxito | Actions "Edición diaria"; `contenido/descripciones/2026-10-31-informe.txt` (02:46), `contenido/podcast/episodios.json` (02:50) |
| Métricas | reloj 05:04, bajada 05:05 | 05:00 | éxito | `bitacora/metricas/2026-10-31.md` |
| Clave (flujo propio semanal, no es la cadena diaria) | guion de `afp-multifondos-perdidas-fondo-e` APROBADA vuelta 2, 02:32 | cuando corresponda | éxito | `contenido/estado/clave-afp-multifondos-perdidas-fondo-e.md` |

Como el 27 y el 30-10, la cadena completa (barrido a videos_listos) terminó
a las 02:50, mucho antes de las ~04:00 que marca `bitacora/cronograma.json`
(actualizado 21-09-2026) para "Edición diaria". Sigue siendo MIRAR, no HOY:
no bloquea nada y ya está anotado, solo que el cuadro de horas esperadas del
panel sigue sin reflejar el ritmo real.

## Qué falló

**1. El hallazgo HOY del 30-10 ("el historial de git de main se destruyó")
era falso, y la causa es verificable.** Esta misma auditoría, al arrancar,
clonó el repo con un fetch shallow (confirmado: `git rev-parse
--is-shallow-repository` daba `true`, con `.git/shallow` listando
exactamente los mismos tres SHA que aparecen como "sin padre" o "no
ancestro" en la auditoría de ayer). Tras `git fetch --unshallow origin`:

- `git rev-list --count main` da **4.501** commits (no 50), el primero
  `88a39c8` del 23-08-2026 23:44:21 ("Estructura inicial del pipeline del
  canal (v04)").
- El commit que ayer se señaló como "sin padre" y "commit raíz falso",
  `2549835e8e49dbe5b03490528020245546474362`, SÍ tiene padre:
  `git show --no-patch --format='%P' 2549835...` devuelve
  `23de43001ab722fa58f4ea0dad7d104ff8db0005`. Y `git merge-base
  --is-ancestor 2549835... main` responde que SÍ es ancestro.
- El tag `edicion-2026-10-29`, que ayer se verificó con 134 commits y "no
  ancestro de main", tiene en realidad 4.359 commits y SÍ es ancestro de
  main (`git merge-base --is-ancestor edicion-2026-10-29 main` → sí).
- Los tags diarios desde `edicion-2026-08-25` (25 commits) hasta
  `edicion-2026-10-31` (4.488 commits) forman una cadena continua, todos
  ancestros de `main`, con el conteo de commits creciendo día a día sin
  saltos. No hay ningún punto de la serie donde la historia se corte.
- `fdea01240c30eedf019b8d106a2ac17f005d755a`, el commit que ayer se proponía
  como base para reconstruir main con `git rebase --onto` y
  `push --force-with-lease`, es simplemente un commit intermedio normal de
  ayer (30-10), ya integrado en la línea recta de main, sin que haga falta
  tocar nada.

No se llegó a ejecutar ningún paso de la reparación propuesta ayer (el tag
`respaldo-historial-2026-10-30` no existe en el remoto, comprobado con
`git ls-remote origin | grep respaldo-historial`), así que no hay ningún
daño que reparar. Lo único que hice fue borrar la entrada de
`bitacora/PENDIENTES.md` (bajo "Para la sesión de la noche") que pedía ese
rebase, porque ejecutarla sobre un historial que ya está completo e intacto
habría sido la reescritura de main que la regla dura 24 prohíbe sin que
exista ningún problema real detrás.

Propuesta de fondo para que esto no se repita: todo contenedor de sesión
(incluido el de esta misma auditoría al arrancar) parte con un clon shallow
por defecto. Antes de afirmar algo sobre padres de commit, ancestría de
tags o "historial destruido", hay que comprobar primero
`git rev-parse --is-shallow-repository` y, si devuelve `true`, correr
`git fetch --unshallow origin` antes de sacar cualquier conclusión. Esto
debería agregarse como regla explícita en la sección "VERIFICAR ANTES DE
AFIRMAR" de `prompts/contrato-archivos.md`, junto a las demás reglas de
verificación de archivos, ya que hoy ese contrato cubre archivos pero no
menciona el estado del propio clon git.

**2. AGUANTA, sigue igual: las seis fuentes institucionales sin feed
siguen sin abrirse, ya son más de dos semanas.** `contenido/revisiones/2026-10-31.md`
(hallazgo 3): Contraloría, Banco Central, Cámara, Senado, Dirección
Meteorológica y Ministerio Público devolvieron código 000 otra vez hoy,
mismo hueco del 30-10, del 27-10 y de toda la serie desde el 16-10
(`bitacora/PENDIENTES.md`, sección "Para la sesión de la noche", entrada
del 16-10). No agrego línea nueva a esa entrada porque ya documenta la
recurrencia; solo confirmo que sigue abierta y sin dueño que la tome.

**3. AGUANTA, nuevo, con arreglo concreto: `scripts/validar-tarjetas.js:90`
subcuenta las palabras narradas y hoy causó reconteo manual por segunda vez
en el día.** `contenido/revisiones/2026-10-31.md` (hallazgo 1): el filtro de
la línea 90 excluye del conteo toda línea que empieza con corchete,
incluidas las cuatro `[TESIS]`, que `scripts/parse.js:414` sí manda a la
voz. Hoy el script avisó 419 palabras contra el piso de 420 (a un punto),
cuando lo narrado de verdad son 472. Ya se había visto exactamente el mismo
mecanismo el 29-10 (`contenido/revisiones/2026-10-29.md`, hallazgo 1, que
ya avisaba "una edición que quede apenas bajo 420 va a pedir relleno que el
video no necesita"), pero nunca bajó a `bitacora/PENDIENTES.md`. Arreglo de
una línea: sumar el texto de las líneas `[TESIS]` al conteo de `narradas`
en `scripts/validar-tarjetas.js:90`, igual que ya hace `parse.js:414`. No es
HOY porque hoy mismo el validador lo detectó a mano y no rellenó de más,
pero ya costó dos vueltas reales (29-10 y 31-10) y tiene dueño claro
(noche, es código).

**4. MIRAR: las horas vistas en videos largos bajan cuatro días seguidos.**
`bitacora/metricas/AAAA-MM-DD.md`, campo "horas vistas en videos LARGOS"
(ventana móvil de 30 días de Analytics): 28-10 → 16,5 h, 29-10 → 15,2 h,
30-10 → 15,0 h, 31-10 → **14,6 h**. Es la única serie que cuenta para las
4.000 horas y lleva cuatro mediciones seguidas a la baja, aunque sea una
ventana móvil donde videos viejos van saliendo más rápido de lo que entran
nuevos. Todavía no es un problema (la caída es moderada y los suscriptores
siguen subiendo, 38→39→40), pero si sigue cinco o seis días más deja de ser
ruido de la ventana móvil.

**5. MIRAR, sigue igual: el clasificador de áreas del barrido.**
`contenido/revisiones/2026-10-31.md` (hallazgo 4): 45 señales quedaron "Sin
área" hoy (57 el 30-10), y el clasificador sigue mezclando fútbol y
farándula en "Ciencia y tecnología". Dos días seguidos documentados
(30 y 31-10); si aparece una tercera vez paso a tratarlo como AGUANTA con
entrada propia en PENDIENTES.

Sin más fallas en el contenido: `node scripts/validar-tarjetas.js --fecha
2026-10-31` no dejó más avisos que el de palabras (ya cubierto en el punto
3), la duración real del episodio de hoy (`contenido/podcast/episodios.json`,
`durSeg: 225`, 3,75 min) está dentro del objetivo de 3 a 4 minutos (decisión
de Santiago del 12-10-2026), y no quedaron marcas `PENDIENTE DE CIERRE`
vencidas sin cerrar (comprobado en `contenido/informes/2026-10-31.md`,
`2026-10-30.md` y `2026-10-29.md`: ninguna trae la marca). Todas las
corridas de GitHub Actions de hoy (Barrido, Edición diaria, Métricas, Web,
Estado del día, Reintento del despertar) terminaron en `success`,
verificado contra la API de Actions.

## Propuestas

1. **Para la falla 1 (ya corregida en este mismo commit).** Agregar en
   `prompts/contrato-archivos.md`, sección "VERIFICAR ANTES DE AFIRMAR", una
   línea que obligue a comprobar `git rev-parse --is-shallow-repository` y
   hacer `git fetch --unshallow origin` antes de afirmar algo sobre padres
   de commit, ancestría de tags o historial "destruido". Dueño: día o
   Santiago, es un cambio de prompt sin secrets.
2. **Para la falla 3.** En `scripts/validar-tarjetas.js:90`, sumar las
   palabras de las líneas que empiezan con `[TESIS]` al conteo de
   `narradas`, igual que ya hace `scripts/parse.js:414`. Dueño: noche
   (código).
3. **Para la falla 2.** Sigue en pie la propuesta del 16-10: agregar feed
   propio (RSS o scraping) para Contraloría, Banco Central, Cámara, Senado,
   Dirección Meteorológica y Ministerio Público en
   `contenido/barrido/fuentes.json`.

## Triage

- **HOY**: ninguno. La única pieza que ayer estaba marcada HOY resultó
  falsa y ya se retiró de `bitacora/PENDIENTES.md` en este mismo commit.
- **AGUANTA**: las seis fuentes institucionales sin feed (sigue igual,
  entrada del 16-10 ya existente, no se duplica); el subconteo de palabras
  de `validar-tarjetas.js:90` por las líneas `[TESIS]` (nuevo, con arreglo
  de una línea, no bajó a PENDIENTES hoy porque no es HOY, queda anotado
  acá para que la noche lo tome).
- **MIRAR**: las horas vistas en videos largos, cuatro días seguidos a la
  baja; el clasificador de áreas del barrido, segunda vez seguida con "Sin
  área" alto; el cuadro de horas esperadas del panel, que sigue sin
  reflejar que la cadena termina hacia las 02:50 y no hacia las 04:00.

## Comparación con ayer (30-10-2026)

- **Mejoró**: el guion del informe costó una sola vuelta hoy (dos vueltas
  el 29 y el 30-10); la falla 2 de ayer ("el validador empuja a incumplir el
  prompt eligiendo [B] por volumen o pidiendo reescrituras sin rango") no
  volvió a aparecer en las correcciones de hoy, que fueron por otros motivos
  (carátulas que no nombraban el hecho, siglas sin expandir, duplicados en
  el rastro de descarte).
- **Nuevo**: la falla 1, que en realidad no es nueva de hoy sino la
  corrección de un hallazgo falso de ayer; el aviso de palabras por el
  subconteo de `[TESIS]` se repitió por segunda vez documentada (29 y
  31-10, con el 30-10 sin este problema porque el guion de ese día llevaba
  margen).
- **Igual**: las seis fuentes institucionales sin feed, cuarto día
  documentado en la serie (27, 29, 30 y 31-10, con el 28 sin cadena); el
  clasificador de áreas, segundo día con "Sin área" alto (57 y 45).
- **Números del canal** (`bitacora/metricas/2026-10-31.md` contra el de
  ayer): 40 suscriptores (+1, igual de ritmo que los últimos días), 21.686
  vistas totales (+24, menos que los +62 de ayer), 214 subidos y 205
  públicos (+4 y +4). Las horas vistas en videos largos siguen bajando
  (15,0 h → 14,6 h), cuarto día seguido a la baja, ver falla 4.
