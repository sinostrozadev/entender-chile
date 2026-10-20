# Auditoría matinal · 20-10-2026

ESTADO: CON OBSERVACIONES. HOY: el informe cita cuatro veces la ruta interna
`contenido/casos/hitos.md` como si fuera la fuente para el lector, y eso
quedó publicado en la web de hoy. El resto de la cadena corrió completa,
cada pieza con una sola vuelta de corrección, sin HOY adicional.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido (270 noticias, 887 únicas, 22 fuentes, ninguna caída) | 01:45 | 01:40 | +5 min |
| Observatorio plata pública | 02:00 | ~01:45 | +15 min |
| Preselección (APROBADA vuelta 1, tras CORREGIR por una fecha en prosa y tres candidatas sin marca "(sin confirmar)") | 02:15 | 02:10 | +5 min |
| Informe (APROBADA vuelta 1) | 02:42 | 02:40 | +2 min |
| Guion del informe (APROBADA vuelta 1, tras CORREGIR por una referencia relativa de fecha y por nombrar un documento interno) | 02:56 | 03:10 | adelantado 14 min |
| Revisión (veredicto final, compuerta) | 02:57 | 03:30 | adelantado 33 min |
| Videos y descripciones (`edicion-diaria.yml` run 243, éxito) | listo 03:12, run cerrado 03:16 | 05:15 | adelantado ~2 h |
| Podcast (`episodios.json`, informe, 258 s = 4:18) | se generó junto con la edición, hacia las 03:16 | 3 a 4 min narrados | dentro del rango real (420 a 600 palabras a 135 ppm) |
| Métricas | 05:05 | 05:00 | +5 min |

Fuente: `contenido/estado/2026-10-20.md` (`ETAPA: videos_listos`, `VEREDICTO:
APROBADA`, `FALTA: nada, el día está completo`), los tres veredictos de hoy
(`contenido/veredictos/2026-10-20-*.md`, los tres `VUELTA: 1` finales) y la
lista de ejecuciones de GitHub Actions del día vía `actions_list`
(barrido run 152, `edicion-diaria.yml` runs 240 a 243, `estado.yml` runs
821 a 830, `web.yml` runs 361 y 362, `metricas.yml` run 146, todas
`completed`/`success`; no hay ninguna run fallida hoy). `node
scripts/validar-tarjetas.js --fecha 2026-10-20`: "4 bloques con fuente, 518
palabras narradas, ~3,8 min" y "variedad OK: ninguna cuota rota, ninguna
marca malformada". Hoy es martes: no corresponde Clave (CLAVE 4) ni el
chequeo de domingo del ranking semanal; la Clave en flujo propio
(`acuerdo-internacional-sin-tratado`) sigue esperando su fecha de producción
del 21-10-2026 y no necesitó nada hoy. Única marca `PENDIENTE DE CIERRE`
viva: `contenido/informes/2026-10-20.md:19` y `:81`, vence el 21-10-2026 (ver
hallazgo 3 más abajo); la del 19-10 que vencía hoy no se cerró con número,
se extendió (mismo hallazgo).

## Qué falló

Nada rompió la edición de mañana ni perdió datos. Un hallazgo ya quedó
publicado con un defecto visible (HOY); el resto son calidad, `AGUANTA` o
`MIRAR`.

### 1. HOY: el informe cita una ruta interna del repo como fuente para el lector, cuatro veces, y ya está en la web

`contenido/informes/2026-10-20.md` líneas 57, 141, 143 y 145 citan
literalmente `(contenido/casos/hitos.md, 20-10-2026)` como fuente, al lado de
fuentes públicas reales. Verificado abriendo el archivo: la línea 57 dice
"...con ochenta días de investigación, según el registro del caso
(contenido/casos/hitos.md, 20-10-2026)"; las líneas 141, 143 y 145 (sección
"¿En qué quedó?") repiten el mismo patrón para Democracia Viva,
JUNAEB-SOSER y los subsidios de arriendo. `hitos.md` es un archivo del
repositorio, no un medio ni una institución: para el lector de la web (que
`web.yml` run 362 ya republicó hoy a las 05:57 UTC) es una ruta de archivo
sin sentido, exactamente el mismo problema que `prompts/guion-informe.md:316`
ya resolvió para el guion ("NUNCA listes archivos internos del sistema... si
un dato viene de ahí, cita la fuente PÚBLICA original del hecho") después de
que el 30-08 se coló "contenido/casos/hitos.md" y hubo que borrarlo a mano.
`prompts/informe.md:159-160` (la sección "¿En qué quedó?") no tiene esa
misma regla: solo dice "con el estado procesal exacto y la fuente" y "usa
solo lo que aparezca en hitos.md", sin decir que la fuente citada debe ser la
pública que el propio hito ya registra, no el archivo. Es nuevo: grep de
"hitos.md" sobre `contenido/revisiones/2026-10-17.md`,
`2026-10-18.md` y `2026-10-19.md` no encuentra ninguna mención anterior.
La revisión de hoy (`contenido/revisiones/2026-10-20.md`, hallazgo 7) ya lo
dejó anotado y no bloqueó porque la autoverificación de fuentes técnicamente
cierra (hitos.md tiene su línea en "Fuentes consultadas").

### 2. AGUANTA: la tercera carátula repite "dos cifras sin referencia", cuarto día seguido (17, 18, 19 y 20-10)

`contenido/veredictos/2026-10-20-guion_informe.md`: "la tercera carátula
vuelve a ser dos cifras sin referencia ('Diez comunas, / tres perímetros'),
igual que el 19-10-2026". Verificado contra los días anteriores:
`contenido/revisiones/2026-10-18.md:74` ("La 'Carátula 3' quedó otra vez como
segundo giro") y `contenido/revisiones/2026-10-17.md:80-83` ("La 'Carátula 3'
es otra vez un segundo giro... la única [cifra] es el cuatro, que ya está en
la 'Carátula 2'... no se entiende sola"). Las cuatro revisiones describen el
mismo defecto con palabras distintas: la tercera carátula no cumple "CIFRA
CON REFERENCIA (solo si la cifra se entiende en un segundo sin contexto)" de
`prompts/guion-informe.md:135`, y ninguna bloquea porque la regla deja el
escape "o un segundo giro si no hay cifra". No está en `bitacora/PENDIENTES.md`
(comprobado: sin coincidencias de "Carátula 3", "tercera carátula", "segundo
giro" ni "cifra con referencia" en el archivo) ni decidido en
`estrategia/decisiones.md:388` como algo que se deja así a propósito; esa
línea solo describe la regla, no resuelve el patrón. No bloquea nada hoy,
pero cuatro días con el mismo defecto en la carátula que va a la prueba A/B
de YouTube es la clase de hallazgo que, según esta misma rutina, deja de ser
el hallazgo original y pasa a ser "el ciclo revisa y no aprende".

### 3. MIRAR: el `PENDIENTE DE CIERRE` de la lluvia va en su segunda extensión sin número

`contenido/informes/2026-10-19.md:22` prometía cerrar "balance de
precipitaciones y eventuales evacuaciones" el 20-10-2026. Verificado en
`contenido/informes/2026-10-20.md:9-19`: a la hora del cierre la estación de
Pudahuel registraba 0,1 mm (ventana de 24 h hasta las 00:30), que el propio
informe reconoce como "ese registro temprano no es el total de la jornada",
y no hay número de viviendas evacuadas. El pendiente se volvió a fechar para
el 21-10-2026 (línea 19) y además se agregó una segunda marca sobre el
número definitivo de comunas sin clases (línea 81). Es defendible hoy porque
el sistema frontal todavía no termina de pasar, pero la propia revisión de
hoy ya lo advierte: "si tampoco se cierra con número, la promesa se rompe".
Si el 21-10 vuelve a extenderse sin una cifra, pasa a `HOY`.

### 4. MIRAR: la cadencia de cautela "X no es lo mismo que Y" cruzó del informe al guion, segunda vez este mes

`contenido/revisiones/2026-10-20.md`, hallazgo 2: el informe de hoy deja un
solo cierre de ese tipo (línea 79) y el guion trae cinco variantes (líneas
25, 27, 33, 45 y 48). `prompts/guion-informe.md:119` ya topa a una vez por
guion la construcción parecida "no solo X, sino Y", pero no tiene un tope
análogo para "X no es lo mismo que Y". Ninguna de las cinco incumple el
prompt hoy (todas sostenidas por el informe), así que no bloquea; si vuelve
a pasar una tercera vez este mes, conviene agregar el mismo tipo de tope
junto a la línea 119.

### Hallazgos ya conocidos, sin cambio

- El clasificador de áreas del barrido (`scripts/barrido.js:291-295`) volvió
  a rotular mal: "Ciencia y tecnología" para una sección de fútbol y "Sin
  área" para exclusivas de CIPER y Ex-Ante (`contenido/preseleccion/2026-10-20.md:229`,
  "Es la misma observación del 18-10-2026 y del 19-10-2026"). `AGUANTA`
  desde el 17-10, ya documentado, no se duplica en `PENDIENTES.md`.
- Las seis fuentes institucionales sin feed propio (Contraloría, Banco
  Central, Cámara, Senado, Dirección Meteorológica, Ministerio Público)
  siguen sin abrirse (`contenido/preseleccion/2026-10-20.md:224`,
  `contenido/revisiones/2026-10-20.md`, hallazgo 4). Ya tiene su línea en
  `bitacora/PENDIENTES.md` desde el 16-10 ("Para la sesión de la noche"); no
  se duplica.
- El subconteo de "días seguidos" que la auditoría del 19-10 había marcado
  `MIRAR` (el validador contaba mal la racha del hallazgo de fuentes
  institucionales) **no se repitió hoy**: la revisión de 2026-10-20 no
  incluye ningún conteo de días para ese hallazgo, correcto o incorrecto.
  Queda cerrado como tendencia; si reaparece con un número mal contado, es
  hallazgo nuevo, no continuación.

## Propuestas

1. **`prompts/informe.md:159-160`**: agregar, junto a la regla de "¿En qué
   quedó?", una línea explícita: "Nunca cites `contenido/casos/hitos.md` ni
   ninguna ruta del repositorio como fuente para el lector: hitos.md es tu
   insumo, no una fuente citable. Cita siempre el origen público real que el
   propio hito ya registra (el tribunal, la fiscalía, el medio)." Mismo
   texto que ya funciona en `prompts/guion-informe.md:316`.
2. **`prompts/guion-informe.md:135`**: después de "una CIFRA CON REFERENCIA
   (solo si la cifra se entiende en un segundo sin contexto)", agregar un
   ejemplo concreto del fallback, tomado de la propia observación del
   validador de hoy: "si la cifra no se entiende sola, agrega un referente
   corto en vez de una segunda cifra (ejemplo: 'Diez comunas, / ¿la tuya
   entre ellas?')".
3. **`scripts/barrido.js:291-295`**: revisar por qué `n.areas[0]` deja vacías
   Salud, Educación, Trabajo y pensiones y Vivienda, y por qué rotula fútbol
   como "Ciencia y tecnología". Repetida de las auditorías del 17, 18 y
   19-10; sigue sin ejecutarse.
4. **`prompts/guion-informe.md:119`** (si la cadencia de cautela vuelve a
   cruzar una tercera vez este mes): agregar un tope de una vez por guion
   para "X no es lo mismo que Y", igual al que ya existe para "no solo X,
   sino Y".

## Triage

- **HOY**: el informe cita `contenido/casos/hitos.md` como fuente visible al
  lector, ya publicado en la web de hoy (hallazgo 1, propuesta 1).
- **AGUANTA** (no se agregan a `bitacora/PENDIENTES.md`: ninguno es `HOY`):
  - La tercera carátula con dos cifras sin referencia, cuarto día seguido
    (hallazgo 2, propuesta 2).
  - El clasificador de áreas del barrido, ya documentado desde el 17-10
    (propuesta 3).
  - Las seis fuentes institucionales sin feed, ya en `PENDIENTES.md` desde
    el 16-10.
- **MIRAR**:
  - El `PENDIENTE DE CIERRE` de la lluvia, segunda extensión sin número
    (hallazgo 3): si el 21-10 vuelve a extenderse, pasa a `HOY`.
  - La cadencia de cautela "X no es lo mismo que Y" cruzando al guion,
    segunda vez este mes (hallazgo 4): si se repite una tercera vez, agregar
    el tope de la propuesta 4.

## Comparación con ayer (19-10)

Mejoró: el subconteo de "días seguidos" que el 19-10 había dejado `MIRAR` no
volvió a aparecer mal hoy (de hecho no apareció ningún conteo, correcto o
no, para el hallazgo de fuentes institucionales); la retención media
ponderada de los largos, que venía de cuatro mediciones seguidas a la baja
(22,2% el 16-10 hasta 20,4% el 19-10), subió a 20,5% hoy, aunque las horas
vistas en largos (la métrica real para el YPP) siguieron bajando levemente
(22,3 h el 19-10 a 21,9 h hoy, leído directo de `bitacora/metricas/2026-10-20.md:197`
y `2026-10-19.md:195`): no alcanza para llamarlo recuperación todavía, solo
para decir que la caída de retención se detuvo un día.

Sigue igual: cada una de las tres piezas volvió a costar exactamente una
vuelta de corrección (igual que el 19-10 y el 18-10), el clasificador de
áreas del barrido y las seis fuentes institucionales siguen sin tocarse, y
la cadena volvió a cerrar adelantada en el tramo de edición diaria (~2 h
antes de lo esperado).

Es nuevo: el hallazgo de `hitos.md` citado en el cuerpo del informe
(hallazgo 1, primera vez que aparece en una revisión), la cuarta repetición
seguida de la carátula sin referencia (antes se contaban por separado
"segundo giro" el 17 y 18-10 y "dos cifras" el 19 y 20-10, pero es el mismo
defecto de fondo), y la segunda extensión sin número del `PENDIENTE DE
CIERRE` de la lluvia.
