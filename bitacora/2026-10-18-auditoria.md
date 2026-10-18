# Auditoría matinal · 18-10-2026

ESTADO: CON OBSERVACIONES. La cadena de hoy salió completa y muy adelantada
en cada tramo, sin ningún HOY. Siguen dos hallazgos de calidad ya conocidos
y documentados (el guion copia la URL de las fuentes del informe, tercera
edición seguida; el clasificador de áreas del barrido deja secciones vacías,
cuarta edición seguida), ninguno nuevo y ninguno con dueño todavía. La
retención de los largos se recuperó con fuerza tras dos días de caída.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido | 01:45 | 01:40 | +5 min |
| Observatorio plata pública | 01:55 | 01:45 | +10 min |
| Preselección (APROBADA, vuelta 0, 55 candidatas, 15 secciones) | 01:59 | 02:10 | adelantado 11 min |
| Informe (APROBADA, vuelta 1, 8 INCUMPLE) | 02:11 (primer borrador) / veredicto final 02:25 | 02:40 | adelantado 15 min |
| Guion del informe (APROBADA, vuelta 1, 3 INCUMPLE) | 02:29 (primer borrador) / veredicto final 02:40 | 03:10 | adelantado 30 min |
| Revisión (veredicto final, compuerta) | 02:41 | 03:30 | adelantado 49 min |
| Videos y descripciones (`edicion-diaria.yml`, listo) | 02:56 | 05:15 | adelantado 2 h 19 min |
| Podcast (`episodios.json`, informe, 263 s = 4:23) | sin dato de hora | 3 a 4 min narrados (decisión 12-10) | dentro del rango: 500 palabras narradas, ~3,7 min |
| Métricas | 05:05 | 05:00 | +5 min |

Fuente: `contenido/estado/2026-10-18.md` (`ETAPA: videos_listos`, `VEREDICTO:
APROBADA`, `FALTA: nada, el día está completo`) y los `VALIDADO:` de cada
veredicto. `node scripts/validar-tarjetas.js --fecha 2026-10-18`: "variedad
OK: ninguna cuota rota, ninguna marca malformada" (4 bloques con fuente, 500
palabras narradas, ~3,7 min). Hoy es domingo: la Clave no es diaria (CLAVE 4)
y no tuvo entrega ni guion hoy porque no le tocaba, pero avanzó la que ya
tenía tema aprobado (`acuerdo-internacional-sin-tratado`, producción
21-10-2026): entrega y guion quedaron APROBADA hoy
(`contenido/estado/clave-acuerdo-internacional-sin-tratado.md`), falta solo
el video, que espera su fecha de producción, como corresponde. El chequeo de
domingo (`contenido/claves/semana/AAAA-Www-candidatos.md` de la semana que
cerró) está cumplido: existe `2026-W41-candidatos.md`, la semana
lunes-sábado 05 al 11-10; la de esta semana (lunes 12 a sábado 17-10, ISO
W42) todavía no corresponde, porque `scripts/semana.js` corre a las 09:00 de
hoy, después de esta auditoría.

## Qué falló

Sin fallas que rompan la edición de mañana, pierdan datos o ya estén
publicadas con un defecto visible. Dos hallazgos de calidad, ninguno nuevo,
los dos sin dueño:

### 1. El guion vuelve a copiar la URL de las fuentes del informe: tercera edición seguida (16, 17 y 18-10)

`contenido/revisiones/2026-10-18.md`: "Las 'Fuentes:' del guion volvieron a
salir con dirección web, el mismo hallazgo que
`contenido/revisiones/2026-10-17.md` ya daba por segunda edición seguida.
Con esta son tres seguidas". Verificado en el veredicto
(`contenido/veredictos/2026-10-18-guion_informe.md`): "Las diez líneas de
'Fuentes:' perdieron la dirección web" en la corrección de la vuelta 1, lo
que confirma que la versión de GPT (vuelta 0) sí las traía. El guion final
(`contenido/guiones/informe/2026-10-18.md:54-60`) ya no tiene URLs porque la
corrección las sacó, igual que el 16 y el 17-10. El patrón es el mismo que
documentó la auditoría del 17-10: GPT copia la fuente con URL desde
`contenido/informes/2026-10-18.md` (sección "## Fuentes consultadas", que sí
lleva enlace y debe llevarlo) y `prompts/guion-informe.md:316` no dice
explícitamente que se omita. Cuesta una vuelta de corrección cada día.

### 2. El clasificador de áreas del barrido deja secciones vacías: cuarta edición seguida (13, 16, 17 y 18-10)

`contenido/preseleccion/2026-10-18.md:221-222`: "Las candidatas se tomaron
del JSON del día (...) porque en el Markdown las áreas de Salud, Educación,
Trabajo y pensiones y Plata pública quedan casi vacías (...) El barrido en
Markdown rotula como 'Ciencia y tecnología' una sección de 18 noticias donde
la mayoría es fútbol". Mismo defecto, mismas áreas, que ya documentaron las
preselecciones del 13, 16 y 17-10 (confirmado leyendo esos tres archivos).
La causa, según la auditoría del 17-10, está en `scripts/barrido.js:291-295`
(`const a = n.areas[0] || "Sin área"`). No bloquea porque quien escribe la
preselección ya sabe ir al JSON, pero paga ese rodeo a mano cada vez.

## Propuestas

1. **`prompts/guion-informe.md:316`**: cambiar "lista una línea por cada
   fuente (...) tal como aparecen en el informe" por una versión que diga
   explícitamente que la lista "Fuentes:" se copia del informe SIN el
   enlace: solo institución o medio, descripción breve y fecha. Repetida de
   la auditoría del 17-10; sigue sin ejecutarse.
2. **`scripts/barrido.js:291-295`**: revisar por qué `n.areas[0]` deja
   vacías Salud, Educación, Trabajo y pensiones y Plata pública, y por qué
   rotula noticias de fútbol como "Ciencia y tecnología". Repetida de la
   auditoría del 17-10; sigue sin ejecutarse.
3. **`prompts/auditoria-matinal.md:53`**: la promesa de duración que cita
   este prompt para comparar ("~10 min, 12-13 en día cargado") quedó
   superada por la decisión del 12-10-2026
   (`estrategia/decisiones.md:825-861`, el informe pasó a 3 o 4 minutos
   narrados). Esta auditoría comparó contra la promesa viva (3 a 4 min) y no
   contra la que cita el propio prompt, para no dejar un hallazgo falso por
   seguir una premisa vieja; conviene actualizar esa línea para que la
   próxima auditoría no tenga que repetir esta verificación.

## Triage

- **HOY**: ninguno.
- **AGUANTA**: los dos hallazgos de arriba (fuentes con URL en el guion,
  clasificador de áreas del barrido). Ya quedaron documentados como AGUANTA
  en la auditoría del 17-10 y no se agregan a `bitacora/PENDIENTES.md` en
  esta auditoría porque ninguno es HOY, siguiendo al pie de la letra el
  contrato de esta rutina (paso 7: solo los HOY bajan a la lista viva).
  Las seis fuentes institucionales sin feed propio siguen en
  `bitacora/PENDIENTES.md` desde el 16-10 (sección "Para la sesión de la
  noche"); hoy es la quinta revisión seguida que las menciona (12, 13, 16,
  17 y 18-10; la revisión de hoy dice "segundo día seguido" contando solo
  desde el 17-10, pero el propio archivo la trae también en el 16-10), no
  se duplica la entrada.
- **MIRAR**: la "Carátula sugerida" del guion de hoy usa la pregunta
  genérica que la propia prueba del gancho busca evitar ("¿Qué pasó en
  Portillo?"), y el veredicto la deja anotada como no bloqueante; es la
  primera vez que aparece con esas palabras exactas, así que no cuenta
  todavía como repetición, pero conviene mirar si vuelve. La línea del
  prompt de esta auditoría sobre la duración prometida (propuesta 3, arriba)
  también queda en observación hasta que alguien la actualice.

## Qué mejoró

- Toda la cadena corrió más adelantada que ayer en cada tramo donde hay
  comparación: la revisión cerró a las 02:41 (ayer 02:57, hoy 16 min antes)
  y la fábrica dejó los videos listos a las 02:56 (ayer 03:10 a 03:14, hoy
  entre 14 y 18 min antes), ambas muy por delante de sus horas esperadas.
- El informe costó una sola vuelta hoy (8 INCUMPLE) contra las dos vueltas
  de ayer (también 8 INCUMPLE en total, pero repartidos en dos rondas); la
  corrección de hoy, igual que ayer, no introdujo hallazgos nuevos.
- La retención media ponderada de los largos subió con fuerza: de 21,2%
  (17-10) a 23,3% (18-10), +2,1 puntos, revirtiendo la caída de los dos días
  anteriores (22,2% el 16-10, 21,2% el 17-10) que la auditoría del 17-10
  dejó marcada MIRAR.

## Qué siguió igual

- Las dos fallas de calidad de la sección "Qué falló": la URL en las fuentes
  del guion (tercera edición seguida) y el clasificador de áreas del barrido
  (cuarta edición seguida), ninguna de las dos con dueño ni fecha de
  ejecución.
- Las seis fuentes institucionales sin feed propio: quinta revisión seguida
  que las marca (12, 13, 16, 17 y 18-10), sin que nada haya cambiado. Sigue
  en `bitacora/PENDIENTES.md` desde el 16-10.
- El formato corto sigue sin fricción en su quinta edición (12, 13, 16, 17 y
  18-10): tres [A] narradas, 420 a 600 palabras, sin tocar el piso ni el
  techo.

## Qué es nuevo

- Las horas vistas en largos bajaron levemente tras tres días de alza: de
  23,6 h (17-10) a 23,1 h (18-10), -0,5 h. Es una sola jornada de baja sobre
  una ventana móvil de 30 días, así que todavía no es tendencia; queda para
  mirar si se repite.
- La "pregunta genérica" en el gancho de la carátula sugerida (hallazgo
  MIRAR de arriba), que no había aparecido con esas palabras en las
  revisiones del 16 y el 17-10.
- La Clave `acuerdo-internacional-sin-tratado` avanzó su entrega y su guion
  el mismo día (ambos APROBADA), quedando solo el video pendiente de su
  fecha de producción del 21-10-2026: es el funcionamiento correcto de los
  tres eslabones, sin entrega huérfana.

## Comparación con ayer (17-10)

Ayer la cadena había corrido adelantada en casi todos los tramos, con dos
hallazgos AGUANTA recién identificados con causa raíz (URL en las fuentes
del guion, clasificador de áreas del barrido) y la retención todavía
cayendo. Hoy la cadena corrió más adelantada todavía, con un informe que
costó una sola vuelta en vez de dos, y la retención se recuperó con fuerza
en vez de seguir bajando. Lo que no cambió es que ninguna de las dos
propuestas de ayer (la línea de `prompts/guion-informe.md:316` y la revisión
de `scripts/barrido.js:291-295`) se ejecutó: los mismos dos hallazgos
volvieron a costar, palabra por palabra, lo mismo que costaron ayer.
