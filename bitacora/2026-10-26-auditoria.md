ESTADO: CON OBSERVACIONES. Nada bloquea la edición de mañana ni perdió datos
hoy; lo que sigue son tendencias a vigilar y un pendiente ya cerrado en el
código que quedó mal registrado en la bitácora.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Esperada | Vuelta | Fuente |
|---|---|---|---|---|
| Barrido | 01:45 | 01:40 (01:30 en el panel) | (no aplica) | `contenido/estado/2026-10-26.md`; Actions run 40270676754 |
| Preselección | 02:00, veredicto 02:08 | 02:10 | APROBADA vuelta 0 | `contenido/veredictos/2026-10-26-preseleccion.md` |
| Informe | 02:16 | 02:40 | APROBADA vuelta 1 (02:34) | `contenido/veredictos/2026-10-26-informe.md` |
| Guion del informe | 02:38, aprobado 03:00 tras 2 vueltas | 03:10 | APROBADA vuelta 2 | `contenido/veredictos/2026-10-26-guion_informe.md` |
| Revisión (compuerta) | 03:02 | 03:30 | APROBADA vuelta 2 | `contenido/revisiones/2026-10-26.md`; Actions run 40277503808 |
| Videos, descripciones, podcast | 03:16, `videos_listos` 03:21 | 05:15 | (no aplica) | `contenido/estado/2026-10-26.md`; Web run 40279303544 |
| Métricas | 05:05 | 05:00 | (no aplica) | `bitacora/metricas/2026-10-26.md`; Actions run 40289863064 |
| Auditoría matinal | esta corrida, ~05:3x | 05:30 | (no aplica) | — |

Ninguna pieza llegó con más de 20 minutos de atraso contra su hora esperada;
al contrario, la cadena de texto y de video terminó muy por delante del
cuadro (videos listos a las 03:21 contra las 05:15 esperadas). Las corridas
de "Reintento del despertar" entre las 02:36 y las 05:37 (diez corridas,
cada ~15 a 20 minutos) son el reloj de respaldo y no encontraron nada que
reintentar porque la cadena nunca se atrasó. `node scripts/validar-tarjetas.js --fecha 2026-10-26`
imprime "variedad OK: ninguna cuota rota, ninguna marca malformada" sobre 4
bloques (cifra 3, esquema 2, comparación 1), sin avisos.

## Qué falló

### 1. Las seis fuentes institucionales sin feed propio, cuarto día seguido sin cambio

`contenido/revisiones/2026-10-26.md` (hallazgo 1) repite, idéntica, la lista
de Contraloría General de la República, Banco Central de Chile, Cámara de
Diputados, Senado, Dirección Meteorológica de Chile y Ministerio Público,
que no se abren porque la preselección la escribe el suplente (no navega).
Ya apareció igual en `contenido/revisiones/2026-10-23.md:25`,
`2026-10-24.md:31` y `2026-10-25.md:31`: van cuatro mañanas con el mismo
texto. Ya está en `bitacora/PENDIENTES.md` (entrada del 16-10, AGUANTA, sin
dueño); no se duplica.

### 2. Titulares de la preselección casi copiados del barrido: se duplicó la proporción de un día a otro

Hoy 25 de las 60 candidatas de `contenido/preseleccion/2026-10-26.md`
quedan "muy cerca del titular del barrido, reescritos apenas con artículos
agregados y la puntuación cambiada" (veredicto de preselección, líneas
citadas 9, 12, 27, 48, 57, 60, 66, 75, 78, 87, 102, 105, 114, 117, 138, 141,
144, 150, 153, 165, 174, 177, 189, 201 y 213). El 25-10-2026 el mismo
hallazgo contó 9 sobre 60 (primera vez que se documentó, marcado MIRAR en
`bitacora/2026-10-25-auditoria.md` con la regla "si se repite dos mañanas
más, pasa a HOY"). Hoy es la segunda mañana y la proporción se duplicó, no
se mantuvo: no mide literal (cero coincidencias exactas tras normalizar),
así que ninguna vuelta lo bloqueó, pero la causa de fondo es la misma del
hallazgo 1, el suplente permanente de la preselección.

### 3. Horas vistas de los largos: seis días bajando, y hoy el salto fue tres veces el ruido habitual

`bitacora/metricas/FECHA.md`, campo "horas vistas en videos LARGOS"
(ventana móvil de 30 días, Analytics real, no estimado):

| Fecha | Horas | Retención media |
|---|---|---|
| 20-10 | 21.9 | 20.5% |
| 21-10 | 21.8 | 19.8% |
| 22-10 | 21.2 | 19.8% |
| 23-10 | 21.0 | 20.3% |
| 24-10 | 21.0 | 20.3% |
| 25-10 | 20.8 | 20.3% |
| 26-10 | **19.6** | 19.7% |

Las auditorías del 23 y 25-10 ya midieron esta serie y la llamaron "ruido de
ventana móvil, no una tendencia" porque el cambio diario rondaba los 0,2 h.
Hoy el cambio fue de 1,2 h en un solo día, seis veces ese ruido, y es la
sexta baja consecutiva sin un solo repunte desde el 20-10 (-2,3 h en total).
La retención se mantiene estable (19,7% a 20,5%, sin tendencia), así que no
es un problema de qué tan bien retienen los videos que ya se publican: es
la misma causa que ya describe `bitacora/PENDIENTES.md` bajo "NÚMEROS 1
(PRIORIDAD ALTA, 22-09)", los largos no reciben tráfico de entrada. Esa
entrada medía 23,5 horas el 22-09; con 19,6 horas hoy, la distancia a las
4.000 horas del YPP no se acortó en un mes, se alargó.

### 4. `scripts/gate.js:52` está arreglado desde el 23-10 a las 15:14 UTC y nadie lo bajó de la lista viva

`bitacora/PENDIENTES.md` tenía, hasta esta corrida, una entrada "HOY" desde
el 06-10 que decía, en su última actualización (23-10, "van OCHO mañanas
marcada"), que la línea 52 de `scripts/gate.js` "sigue idéntica" y el
arreglo "sigue sin aplicarse". Verificado contra el commit real
(`git fetch --deepen=200`, porque el checkout superficial de esta sesión
solo trae 50 commits y no alcanza a este): el commit `3d9184c`, del propio
Claude, con fecha 23-10-2026 15:14:36 UTC (12:14 Chile, horas después de la
auditoría de esa mañana), reescribió exactamente el bug descrito: creó
`scripts/guion-de-clave.js` con la función `guionesDeClave()` que excluye
los archivos `-imagenes.md` y falla si hay más de un guion para la misma
fecha, y tanto `scripts/gate.js:53` como `scripts/dia.js:46` ya la usan en
el archivo actual de `main`. El bug que bloqueaba la edición completa
cuando la Clave y el informe coincidían está cerrado desde entonces.
Dos cosas no ocurrieron cuando debieron: `bitacora/REALIZADOS.md` no tiene
ninguna línea con "gate.js" ni "guion-de-clave" (verificado con `grep` sobre
el archivo completo), así que el aporte humano/de Claude de esa tarde no
quedó registrado donde el estándar pide registrarlo; y la auditoría del
25-10 no volvió a verificar la línea 52 (no aparece mencionada en
`bitacora/2026-10-25-auditoria.md`), así que la entrada quedó "HOY" tres
mañanas de más (24, 25 y hoy) sin que nadie la corrigiera.

## Propuestas

1. Para el hallazgo 1: agregar feed propio (RSS o scraping) para las seis
   fuentes institucionales en `contenido/barrido/fuentes.json`, como ya
   propone la entrada del 16-10 en `bitacora/PENDIENTES.md`. No se repite
   acá por completo; ver esa entrada.
2. Para el hallazgo 2: si `contenido/revisiones/2026-10-27.md` vuelve a
   medir una proporción igual o mayor de titulares casi copiados, baja a
   HOY y resuélvela igual que el hallazgo 1 (misma causa, el suplente no
   reescribe, copia). Si baja, queda en MIRAR una mañana más.
3. Para el hallazgo 3: no hay acción nueva que proponer hoy distinta de la
   ya escrita en "NÚMEROS 1" de `bitacora/PENDIENTES.md`; lo que cambia es
   la urgencia, porque la serie llevaba un mes sin repuntar y hoy aceleró.
   Si la sesión de día mide el IPoM. mañana y la baja continúa dos días más
   seguidos, esa entrada debería subir de AGUANTA a su propio HOY con una
   propuesta concreta de qué cambiar en el empuje de entrada (miniaturas,
   títulos, programación de subida).
4. Para el hallazgo 4: ya ejecutado en este mismo commit, ver más abajo
   (se borró la entrada de `bitacora/PENDIENTES.md`, que es de las tres
   excepciones que esta auditoría puede tocar). Falta, y esto no lo puede
   hacer esta auditoría porque no es ninguno de sus tres archivos: agregar
   en `bitacora/REALIZADOS.md` una línea con fecha 23-10 por el commit
   `3d9184c` (el gate ya no confunde el guion de la Clave con su archivo de
   carátulas).

## Triage

- **HOY**: ninguna. Nada de lo de hoy rompe la edición de mañana, pierde
  datos ni salió publicado con un defecto visible.
- **AGUANTA**:
  1. Las seis fuentes institucionales sin feed (hallazgo 1). Sin cambios:
     ya está en `bitacora/PENDIENTES.md` desde el 16-10, sin dueño, no se
     duplica.
  2. La sección "Plata pública" sin nombre propio en `prompts/informe.md`
     (observación de `contenido/revisiones/2026-10-26.md`, ya cubierta por
     la entrada "Secciones Plata pública y Educación" de
     `bitacora/PENDIENTES.md`, sin novedad que agregar).
- **MIRAR**:
  3. Titulares casi copiados del barrido, ahora el doble que ayer
     (hallazgo 2). Segunda mañana seguida; una tercera mañana con la misma
     proporción o mayor pasa a HOY, como ya quedó escrito el 25-10.
  4. Horas vistas de los largos, seis bajas seguidas y hoy un salto seis
     veces el ruido habitual (hallazgo 3). Todavía no es la causa, que ya
     se conoce (NÚMEROS 1); es la aceleración de una tendencia que lleva un
     mes sin revertirse.

## Comparación con ayer

**Mejoró**: las tres carátulas del informe de hoy trajeron los tres
enfoques correctos (pregunta, contradicción y cifra con referencia, según
el veredicto del guion), algo que no se verificó así desde antes del
23-10; no hay un cambio de código identificado que lo explique, así que se
anota sin cerrar la entrada "Carátula 3" de `bitacora/PENDIENTES.md`. El
guion del informe narró las tres noticias desde el primer borrador del
contenido (sus dos vueltas fueron por la capa de variedad de tarjetas, no
por selección ni por fidelidad), igual de limpio que ayer.

**Sigue igual**: las seis fuentes institucionales sin feed (cuarto día); el
patrón de que el bloque de la noticia de portada narra menos palabras que
los otros dos, ya visto el 22-09 y el 03-10; la etiqueta "Fondo E en 2026"
en vez de "a septiembre de 2026" en las tarjetas del guion, tercera vuelta
seguida que el validador la anota sin que bloquee.

**Es nuevo**: la proporción de titulares casi copiados se duplicó en vez de
mantenerse (hallazgo 2); la baja de horas vistas de los largos aceleró de
golpe tras un mes de bajas pequeñas (hallazgo 3); y esta auditoría encontró
que un "HOY" de `bitacora/PENDIENTES.md` lleva arreglado en el código desde
el 23-10 por la tarde sin que la lista viva ni `bitacora/REALIZADOS.md` lo
reflejaran (hallazgo 4), que es la primera vez que se documenta este tipo
de desfase entre el código y la bitácora.
