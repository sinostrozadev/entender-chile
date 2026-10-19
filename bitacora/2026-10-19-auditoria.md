# Auditoría matinal · 19-10-2026

ESTADO: CON OBSERVACIONES. La cadena de hoy corrió completa y adelantada en
todos los tramos, sin ningún HOY. Siguen dos hallazgos de calidad ya
conocidos (URL en las "Fuentes:" del guion, cuarta edición seguida; áreas
vacías del clasificador del barrido, quinta edición seguida), y aparece un
hallazgo nuevo sobre la propia revisión: el conteo de "días seguidos" que
escribe el validador para el hallazgo de las seis fuentes institucionales
viene mal desde el 18-10 y hoy lo repite. Los números de retención de los
largos, leídos de la fuente primaria, corrigen además una afirmación
equivocada de la auditoría de ayer.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido | 01:45 | 01:40 | +5 min |
| Observatorio plata pública | 01:56 | 01:45 | +11 min |
| Preselección (APROBADA, vuelta 1, 57 candidatas, 25 marcadas) | 01:58 | 02:10 | adelantado 12 min |
| Informe (APROBADA, vuelta 1, 8 INCUMPLE en la corrección) | 02:18 | 02:40 | adelantado 22 min |
| Guion del informe (APROBADA, vuelta 1, 3 INCUMPLE en la corrección) | 02:39 | 03:10 | adelantado 31 min |
| Revisión (veredicto final, compuerta) | 02:52 | 03:30 | adelantado 38 min |
| Videos y descripciones (`edicion-diaria.yml`, listo) | 03:07 | 05:15 | adelantado 2 h 8 min |
| Podcast (`episodios.json`, informe, 257 s = 4:17) | se generó junto con la edición, hacia las 03:07 | 3 a 4 min narrados (decisión 12-10) | dentro del rango real (420 a 600 palabras a 135 ppm son 3,1 a 4,4 min; 472 palabras, dentro de ambos pisos) |
| Métricas | 05:05 | 05:00 | +5 min |

Fuente: `contenido/estado/2026-10-19.md` (`ETAPA: videos_listos`, `VEREDICTO:
APROBADA`, `FALTA: nada, el día está completo`), los tres veredictos de hoy
(`contenido/veredictos/2026-10-19-*.md`, los tres VUELTA 1) y la lista de
ejecuciones de GitHub Actions del día (todas `completed`/`success`: barrido,
observatorio, los tres ciclos corregir/aprobar, `edicion-diaria.yml` runs
236 a 238, `metricas.yml` run 143, y los relojes de reintento, que no
tuvieron nada que reintentar porque la cadena ya había avanzado sola).
`node scripts/validar-tarjetas.js --fecha 2026-10-19`: "4 bloques con fuente,
472 palabras narradas, ~3,5 min" y "variedad OK: ninguna cuota rota, ninguna
marca malformada". Hoy es lunes: no corresponde Clave (CLAVE 4, una o dos
por semana) ni el chequeo de domingo del ranking semanal. La Clave en flujo
propio (`acuerdo-internacional-sin-tratado`) sigue `ETAPA: aprobada`,
esperando su fecha de producción del 21-10-2026; no necesitó nada hoy. No
hay marcas `PENDIENTE DE CIERRE` vencidas: la única viva
(`contenido/informes/2026-10-19.md:22`) vence el 20-10-2026, y las dos
últimas que vencían en el pasado (Escondida, 13-10; memorandos Kast-Bolivia,
16-10) se verificaron cerradas en los informes del 16 y el 17-10
respectivamente.

## Qué falló

Nada rompe la edición de mañana, pierde datos ni quedó publicado con un
defecto visible. Tres hallazgos, ninguno HOY:

### 1. El guion vuelve a copiar la URL de las fuentes: cuarta edición seguida (16, 17, 18 y 19-10)

`contenido/revisiones/2026-10-19.md`: "Las 'Fuentes:' del guion volvieron a
salir con dirección web... está en los veredictos del guion del 16, 17, 18 y
19-10-2026, cuatro ediciones seguidas". Verificado en
`contenido/veredictos/2026-10-19-guion_informe.md` (la corrección de la
vuelta 1 saca las URLs) y en el guion final
(`contenido/guiones/informe/2026-10-19.md`), que ya no las tiene porque la
corrección las sacó. `prompts/guion-informe.md:316` sí pide ya, desde una
corrección anterior, que la lista incluya "cada fuente del informe cuyas
noticias narraste" (eso resolvió el mecanismo inverso, ver punto 2 más
abajo), pero sigue sin decir que esa lista va SIN el enlace: grep de "sin el
enlace", "sin la dirección" y "sin enlace" sobre el archivo no devuelve nada.
Mientras el guion herede el formato del informe, que sí lleva enlaces y debe
llevarlos, el hallazgo va a seguir costando una vuelta de GPT cada madrugada.

### 2. El clasificador de áreas del barrido deja secciones vacías: quinta edición seguida (13, 16, 17, 18 y 19-10)

`contenido/preseleccion/2026-10-19.md:235-236`: "Las candidatas se tomaron
del JSON del día... porque en el Markdown las áreas de Salud, Educación,
Trabajo y pensiones y Plata pública quedan casi vacías... es la misma
observación del 18-10-2026". El propio commit de la preselección de hoy
(`edición 2026-10-19: preselección`) lo cita como motivo para armar la pieza
desde el JSON. Causa ya identificada por la auditoría del 17-10 en
`scripts/barrido.js:291-295` (`const a = n.areas[0] || "Sin área"`). No
bloquea porque quien escribe ya sabe ir al JSON, pero paga ese rodeo cada
vez.

### 3. El conteo de "días seguidos" que escribe la revisión viene mal desde el 18-10 y hoy lo repite

El hallazgo de las seis fuentes institucionales sin feed
(`contenido/barrido/fuentes.json`) aparece sin conteo de días en las
revisiones del 12, 13, 16 y 17-10 (verificado línea por línea en esos cuatro
archivos). La revisión del 18-10 fue la primera en ponerle un número:
"Es el segundo día seguido con este hallazgo", contando solo desde el 17-10
y dejando fuera las tres apariciones anteriores (12, 13 y 16-10). La propia
auditoría del 18-10 ya señaló ese subconteo. Hoy, `contenido/revisiones/2026-10-19.md`
dice "Es el tercer día con el mismo hallazgo": sigue sumando uno sobre la
misma base equivocada del 17-10, en vez de corregirse contra el historial
real (serían seis apariciones en total, o cuatro seguidas contando solo
desde el 16-10). `prompts/validador.md` no tiene ninguna instrucción sobre
cómo contar o verificar rachas (línea 243-244, la única que menciona
"Hallazgos:", no dice nada de esto); el número sale de memoria de la propia
corrida y por eso arrastra el mismo error dos mañanas seguidas. No cambia el
fondo del hallazgo (la falta de feed institucional sigue abierta, ya
`AGUANTA` en `bitacora/PENDIENTES.md` desde el 16-10), pero si el conteo
sigue mal es la clase de hallazgo que la propia rutina pide marcar: "un
hallazgo que se repite sin que cambie nada es que el ciclo revisa y no
aprende".

### Corrección a la auditoría del 18-10: la retención no se recuperó, cayó un cuarto día seguido

La auditoría del 18-10 escribió: "la retención media ponderada de los
largos subió con fuerza: de 21,2% (17-10) a 23,3% (18-10)... 23,1 h (18-10)".
Leyendo ahora mismo `bitacora/metricas/2026-10-18.md` tal como está en el
repo: "22.9 horas vistas en videos LARGOS... retención media ponderada de
los largos: 20.5%", no 23,1 h ni 23,3%. La serie real, leída directo de cada
archivo de métricas (no de memoria ni de la auditoría anterior):

| Fecha | Horas vistas en largos | Retención media ponderada |
|---|---|---|
| 16-10 | 23,3 h | 22,2% |
| 17-10 | 23,6 h | 21,2% |
| 18-10 | 22,9 h | 20,5% |
| 19-10 (hoy) | 22,3 h | 20,4% |

La retención lleva cuatro mediciones seguidas a la baja (22,2 → 21,2 → 20,5
→ 20,4), no una recuperación: la auditoría del 17-10 había dejado esta caída
marcada `MIRAR` y la del 18-10 la dio por cerrada con una cifra que no
corresponde al archivo que cita como fuente. No se puede saber desde el repo
si el 18-10 leyó una versión del archivo que luego se sobreescribió (el
reloj de métricas también tiene cron de respaldo a las 06:30 y 08:00 de
Chile) o si fue un error de transcripción; cualquiera de las dos es un
hallazgo, porque el archivo de auditoría de un día no se vuelve a tocar
(regla de no modificar fechas anteriores) y por eso esta corrección queda
acá, no editando el 18-10.

## Propuestas

1. **`prompts/guion-informe.md:316`**: agregar a la frase existente ("...Y
   por cada fuente del informe cuyas noticias narraste, tal como aparecen en
   el informe") una cláusula explícita de que esa lista se copia SIN el
   enlace: solo institución o medio, descripción breve y fecha. Repetida de
   las auditorías del 17 y 18-10; sigue sin ejecutarse.
2. **`scripts/barrido.js:291-295`**: revisar por qué `n.areas[0]` deja
   vacías Salud, Educación, Trabajo y pensiones y Plata pública, y por qué
   rotula noticias de fútbol como "Ciencia y tecnología". Repetida de las
   auditorías del 17 y 18-10; sigue sin ejecutarse.
3. **`prompts/validador.md:243-244`**: agregar una línea que pida, antes de
   escribir un conteo de "N días/ediciones seguidas" en `Hallazgos:`, que se
   verifique contra el historial real (grep del texto en
   `contenido/revisiones/` de los días anteriores, o la entrada ya fechada
   en `bitacora/PENDIENTES.md`) en vez de estimarlo de memoria. Hallazgo
   nuevo de hoy: el contador lleva dos mañanas seguidas (18 y 19-10)
   arrastrando el mismo subconteo.

## Triage

- **HOY**: ninguno.
- **AGUANTA** (no se agregan a `bitacora/PENDIENTES.md`: ninguno es `HOY`,
  siguiendo el contrato de esta rutina, paso 7):
  - Las dos fallas de calidad de arriba (URL en las fuentes del guion,
    clasificador de áreas del barrido), ya documentadas como `AGUANTA` desde
    el 17-10.
  - Las seis fuentes institucionales sin feed propio: sigue en
    `bitacora/PENDIENTES.md` desde el 16-10 (sección "Para la sesión de la
    noche"); hoy es, por el conteo real del repo, la sexta revisión que la
    menciona (12, 13, 16, 17, 18 y 19-10), no la tercera que dice el propio
    archivo de hoy. No se duplica la entrada de PENDIENTES.
- **MIRAR**:
  - El subconteo de "días seguidos" del hallazgo de las seis fuentes
    institucionales (propuesta 3): si la próxima revisión (20-10) vuelve a
    arrastrar el mismo número sin corregirlo contra el historial, deja de
    ser un hallazgo aislado y hay que tocar el prompt.
  - La retención media ponderada de los largos, con cuatro mediciones
    seguidas a la baja (22,2% el 16-10 hasta 20,4% hoy) y una auditoría
    anterior que reportó lo contrario con cifras que no están en el archivo
    que cita. Si la caída sigue mañana, deja de ser tendencia y hay que
    tratarla como falla.

## Comparación con ayer (18-10)

Ayer la cadena había corrido adelantada en casi todos los tramos y la
auditoría cerró con "sin HOY" y dos hallazgos `AGUANTA` conocidos, igual que
hoy. Lo que cambió: hoy la cadena corrió todavía más adelantada en el tramo
de la revisión (38 min de adelanto contra 49 min de ayer, prácticamente
igual) y el informe volvió a costar una sola vuelta (8 INCUMPLE, el mismo
número que ayer). El clasificador de áreas del barrido pasó de cuarta a
quinta edición seguida sin ejecutarse, y la URL en las fuentes del guion de
tercera a cuarta. Lo nuevo de hoy es el hallazgo sobre el propio conteo de
días del validador (punto 3) y la corrección de la cifra de retención: la
auditoría de ayer reportó una recuperación que los archivos de métricas no
sostienen, y la serie real muestra que la caída que el 17-10 había marcado
`MIRAR` nunca se revirtió.
