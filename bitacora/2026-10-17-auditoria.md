# Auditoría matinal · 17-10-2026

ESTADO: CON OBSERVACIONES. La cadena de hoy salió completa y adelantada en
casi todos los tramos, sin ningún HOY nuevo. Quedan dos hallazgos AGUANTA con
causa raíz ya identificada (el guion copia la URL de las fuentes del informe
y el validador tiene que corregirla cada edición; el clasificador de áreas
del barrido deja secciones vacías y fuerza al suplente a tomar candidatas
directo del JSON) y la retención de los largos sigue bajando, aunque las
horas se recuperan un poco. La auditoría corrió hoy por segunda mañana
seguida, después de seis mañanas sin rastro (07, 08, 11, 13, 14 y 15-10).

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido | 01:49 | 01:40 | +9 min |
| Preselección (APROBADA, vuelta 0, 59 candidatas, la escribió el suplente) | 02:07 | 02:10 | adelantado 3 min |
| Informe (APROBADA, vuelta 2, 2 correcciones) | 02:19 (primer borrador) / veredicto final 02:40 | 02:40 | a tiempo |
| Guion del informe (APROBADA, vuelta 1, 1 corrección) | 02:41 | 03:10 | adelantado 29 min |
| Revisión (veredicto final) | 02:57 | 03:30 | adelantado 33 min |
| Videos y descripciones (`edicion-diaria.yml` run 39008158831) | 03:10 a 03:14 | 05:15 | adelantado 2 h 1 min |
| Podcast (`episodios.json`, informe, 256 s = 4:16) | sin dato | 3 a 4 min (decisión 12-10) | en el borde superior |
| Métricas | 05:20 | 05:00 | +20 min |

Fuente: `contenido/estado/2026-10-17.md` (`ETAPA: videos_listos`, `VEREDICTO:
APROBADA`, `FALTA: nada, el día está completo`). `node
scripts/validar-tarjetas.js --fecha 2026-10-17`: "variedad OK: ninguna cuota
rota, ninguna marca malformada" (4 bloques con fuente, 497 palabras
narradas, ~3,7 min). No hubo Clave hoy (no es diaria desde el 16-09); hoy es
sábado, no domingo, así que no corresponde revisar el banco semanal.

Esta vez la preselección la escribió Claude por el reparto permanente
(`contenido/estado/reparto.txt`, línea `claude:`), no por plan B, y el
informe y el guion los escribió GPT (commits "Tarea: despachador"): es el
reparto normal de la cadena, distinto del 16-10, cuando las tres piezas las
tuvo que escribir el suplente porque la cadena venía de dos días muertos.

Nota sobre el checkout: el `git log --diff-filter=A` inicial sobre el
checkout shallow (50 commits) atribuía el barrido y la preselección de hoy a
un commit de `estado.yml` de las 05:07 UTC, que no es quien los escribió.
Hubo que `git fetch --unshallow` para ver el commit real del barrido
(`barrido 2026-10-17 [bot]`, 04:49 UTC) y de la preselección (`edición
2026-10-17: preselección`, 05:07 UTC). Mismo defecto que ya dejó anotado la
auditoría del 16-10: el checkout con el que arranca esta rutina no alcanza
para ver el historial completo, y conviene que el paso 1 de este prompt
incluya el `--unshallow` en vez de depender de que cada auditoría lo
descubra de nuevo.

## Qué falló

Sin fallas que rompan la edición de mañana, pierdan datos o ya estén
publicadas con un defecto visible. Dos hallazgos de calidad, ninguno nuevo
del todo, los dos con causa raíz a la vista por primera vez:

### 1. El guion copia la URL de las fuentes del informe y cuesta una vuelta de corrección, segunda edición seguida

`contenido/revisiones/2026-10-17.md`: "El guion costó una sola vuelta y por
lo mismo que el 16-10-2026: las nueve líneas de 'Fuentes:' con dirección
web (...) Es la segunda edición seguida con ese mismo hallazgo". Comprobado
en el origen: `contenido/informes/2026-10-17.md` líneas 92 en adelante trae
cada fuente como "institución, descripción, fecha: URL" bajo "## Fuentes
consultadas", y `prompts/guion-informe.md:316` instruye copiar cada fuente
"tal como aparecen en el informe", sin decir que se omita la URL. El guion
corregido (`contenido/guiones/informe/2026-10-17.md`, vuelta 1) ya no trae
URLs, pero la vuelta existió porque la primera versión las copió, igual que
el 16-10. El patrón se repite: GPT copia con URL, Claude corrige, cuesta una
vuelta, cada día.

### 2. El clasificador de áreas del barrido deja secciones vacías y obliga a la preselección a tomar candidatas del JSON, no es nuevo

Commit de hoy (`contenido/preseleccion/2026-10-17.md`): "Dieciséis
candidatas salieron del JSON del día y no del barrido en Markdown (...) el
Markdown deja Salud, Educación, Trabajo y pensiones y Plata pública casi
vacías, y rotula como 'Ciencia y tecnología' una sección que es sobre todo
fútbol". El mismo defecto, con las mismas áreas, ya lo dejó anotado el
commit de preselección del 13-10-2026 (trece candidatas por la misma razón).
Nadie lo bajó a `bitacora/PENDIENTES.md` en su momento: comprobado
buscando "clasificador" y "JSON del día" en el archivo completo, cero
resultados. La agrupación por área vive en `scripts/barrido.js:291-295`
(`const a = n.areas[0] || "Sin área"`). No bloquea porque el suplente ya
sabe ir al JSON, pero cada preselección que lo necesite paga ese rodeo a
mano.

## Propuestas

1. **`prompts/guion-informe.md:316`**: cambiar "lista una línea por cada
   fuente (...) tal como aparecen en el informe" por una versión que diga
   explícitamente "sin la URL: solo institución o medio, descripción breve
   y fecha, igual que en el informe pero sin el enlace". Evita la vuelta de
   corrección que se repite desde el 16-10.
2. **`scripts/barrido.js:291-295`**: revisar por qué la clasificación por
   área (`n.areas[0]`) deja vacías Salud, Educación, Trabajo y pensiones y
   Plata pública, y por qué rotula una noticia de fútbol como "Ciencia y
   tecnología". Mientras no se arregle, la preselección sigue necesitando
   leer el JSON a mano para esas áreas, como hoy y como el 13-10.
3. **El `--unshallow` del paso 1**: agregar `git fetch --unshallow` (o
   aumentar la profundidad del checkout) al arranque de esta rutina, para
   que la atribución de "quién escribió qué" no dependa de que cada
   auditoría lo descubra por su cuenta, como pasó hoy y el 16-10.

## Triage

- **HOY**: ninguno.
- **AGUANTA**: los dos hallazgos de arriba (fuentes con URL en el guion,
  clasificador de áreas del barrido). Nueva entrada en "Para la sesión de
  la noche" cuando corresponda ejecutarlos: no se agregan a
  `bitacora/PENDIENTES.md` en esta auditoría porque ninguno es HOY, siguiendo
  al pie de la letra el contrato de esta rutina (paso 7: solo los HOY bajan
  a la lista viva). Quedan documentados acá para que la sesión de la noche
  los recoja si Santiago lo pide.
  Las seis fuentes institucionales sin feed propio ya están en
  `bitacora/PENDIENTES.md` desde el 16-10 (sección "Dependen de Santiago");
  hoy es la cuarta revisión seguida que las menciona (12, 13, 16 y 17-10),
  no se duplica la entrada.
- **MIRAR**: la retención media ponderada de los largos sigue bajando (ver
  Comparación con ayer) y la "Carátula 3" como segundo giro en vez de una
  cifra, que la revisión de hoy marca como tercera edición con la misma
  observación (confirmado en este repo el 16 y el 17-10).

## Qué mejoró

- Los tres relojes del reintento (A, B y C), mudos dos días completos el 14
  y el 15-10, volvieron a pushear con cadencia normal toda la madrugada de
  hoy: nueve corridas de `reintento.yml` entre las 02:51 y las 05:36 UTC,
  cada 15 a 25 minutos, todas `success`. El apagón de esos relojes, que la
  auditoría del 16-10 dejó como HOY, no se repitió.
- La cadena volvió a su reparto normal: GPT escribió el informe y el guion
  (commits "Tarea: despachador"), y Claude escribió solo la preselección por
  su turno permanente. El 16-10 las tres piezas las tuvo que escribir el
  suplente porque la cadena venía de dos días muertos, que es el escenario
  caro que `bitacora/PENDIENTES.md` pide mirar primero si hay que recortar
  cuota.
- La auditoría dejó rastro dos mañanas seguidas (16 y 17-10), después de
  seis mañanas sin ninguno.
- El video del 16-10 que esperaba el clic de Santiago ("¿Kast quiere que
  Chile y Bolivia vuelvan a tener embajadores") ya está público, con 14
  vistas (`bitacora/metricas/2026-10-17.md`).
- Las horas vistas en largos subieron de 23,3 h (16-10) a 23,6 h (17-10),
  +0,3 h, después de la caída de 2,8 h que dejó mirando la auditoría
  anterior.

## Qué siguió igual

- Las seis fuentes institucionales sin feed propio
  (`contenido/barrido/fuentes.json`): cuarta revisión seguida que las marca
  (12, 13, 16 y 17-10), sin que nada haya cambiado.
- La retención media ponderada de los largos sigue bajando: 22,2% (16-10) a
  21,1% (17-10), -1,1 puntos. Las dos piezas de hoy (informe y Short) siguen
  en privado con 0 vistas, así que todavía no pueden estar moviendo el
  número.

## Comparación con ayer (16-10)

Ayer la cadena entera había estado muerta dos días (14 y 15-10) y se destrabó
sola gracias al suplente, con las tres piezas escritas por Claude. Hoy la
cadena corrió con su reparto normal, GPT escribiendo informe y guion, y
terminó adelantada en cada tramo, sin ningún HOY. Lo nuevo de hoy es que, por
primera vez, se puede nombrar con archivo y línea la causa de dos hallazgos
que las revisiones venían repitiendo sin que nadie los bajara a una
propuesta concreta: la URL en las fuentes del guion y el clasificador de
áreas del barrido. Los números del canal se mueven en la misma dirección que
ayer predijo como posible: las horas de largos se recuperan un poco (+0,3 h)
mientras la retención sigue cayendo (-1,1 puntos), así que la hipótesis de
que era solo el efecto de la ventana móvil de 30 días queda a medias: una
serie sube, la otra sigue bajando.
