ESTADO: CON FALLAS. HOY: ayer 22-10-2026 se perdió el día completo (ni
informe, ni video, ni podcast, y sin auditoría que lo registrara); hoy la
cifra de comunas con clases suspendidas sigue sin cerrarse, tal como el
21-10 anticipó que pasaría a HOY; y `contenido/informes/2026-10-23.md` volvió
a citar `contenido/casos/hitos.md` como fuente pública, esta vez sin que el
validador lo pescara.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Vuelta | Fuente |
|---|---|---|---|
| Barrido | ~01:31 (estado `barrido_listo` a las 01:46) | — | `git log` sobre `contenido/estado/2026-10-23.md` |
| Preselección | 02:04 | APROBADA vuelta 0 | `contenido/veredictos/2026-10-23-preseleccion.md` |
| Informe | 02:15 → corrección → 02:28 | APROBADA vuelta 1 | `contenido/veredictos/2026-10-23-informe.md` |
| Guion del informe | 02:37 → corrección → 02:47 | APROBADA vuelta 1 | `contenido/veredictos/2026-10-23-guion_informe.md` |
| Revisión (compuerta) | 02:51 | APROBADA vuelta 1 | `contenido/revisiones/2026-10-23.md` |
| Videos, descripciones, podcast | 03:00-03:03 (`estado: videos_listos` 03:03) | — | `edicion-diaria.yml` run exitoso, `contenido/podcast/episodios.json` |
| Métricas | 05:06 (reloj a las 05:05) | — | `bitacora/metricas/2026-10-23.md` |
| Clave | no corresponde hoy (la última, "acuerdo-internacional-sin-tratado", es del 21-10 y tiene sus dos eslabones completos: entrega y guion, ambos aprobados) | — | `contenido/claves/indice.md`, `contenido/guiones/claves/` |

Horas vía `git log --diff-filter=A --date=format-local` en huso Chile sobre
cada archivo de hoy. Ninguna pieza llegó con más de 20 minutos de atraso
contra su hora esperada (`bitacora/cronograma.json`); al contrario, toda la
cadena de texto corrió rápido: preselección, informe y guion terminados a
las 02:50, casi dos horas antes de la ventana de la fábrica (~04:00). Las
nueve corridas de "Reintento del despertar" entre las 01:51 y las 05:36 son
el reloj de respaldo cada 20 minutos (`*/20 4-9 * * *`); no encontraron nada
que reintentar porque la cadena nunca se atrasó, y las trece corridas de
GitHub Actions del día (`barrido`, `edición diaria`, `estado del día` x7,
`estado de la Clave` x2, `web` x3, `métricas`) terminaron todas con
`conclusion: success` (`actions_list`).

## Qué falló

### 1. HOY, nuevo: el 22-10-2026 se perdió el día completo y ninguna auditoría lo registró

`git log` (con la historia completa, no el shallow de 50 commits con que
empezó esta corrida) muestra que entre las 00:00 y las 24:00 del 22-10 solo
hubo: `barrido 2026-10-22 [bot]` a las **06:03** (contra ~01:31 esperado,
**+272 min**), el estado `barrido_listo` a las 06:41, un disparo al suplente
(Claude, que escribe la preselección desde el 06-10 por decisión de
Santiago, `contenido/estado/reparto.txt`) a las **06:41**, y nada más de la
cadena: nunca se escribió `contenido/preseleccion/2026-10-22.md`, ni el
informe, ni el guion, ni la revisión, ni video, ni podcast (verificado
listando las cuatro carpetas: ninguna tiene archivo con esa fecha, y
`contenido/estado/2026-10-22.md` quedó congelado en
`FALTA: Preselección, Informe, Guion del informe, Revisión, Videos y
descripciones` con "ATRASADAS a las 07:19" de hasta +309 minutos). El único
commit de las horas siguientes, `edición 2026-10-22 [bot]` (10:33), resultó
ser un cambio de una línea en `contenido/casos/indice.md`, ajeno a la cadena
diaria.

Lo más grave no es el atraso del barrido (`reintento.yml` existe justo para
relanzarlo, y lo hizo): es que **ningún reloj de Claude disparó esa
madrugada**. Comparado con hoy (23-10) y con el 21-10, que registran entre
nueve y quince commits `reintento: despertador HH:MM [reloj]` repartidos
cada 15-22 minutos entre la 01:00 y las 06:00 de Chile, el 22-10 no tiene
**ninguno**: ni el reloj del barrido (01:30), ni los tres relojes del
reintento (01:10-05:10, 01:30-05:30, 01:50-05:50), ni el reloj de métricas
(05:00, que de hecho corrió tarde, a las 11:37 y otra vez a las 12:45), ni
la propia Auditoría matinal (05:30): no existe
`bitacora/2026-10-22-auditoria.md` (verificado listando `bitacora/` completo
con `git ls-tree`: la lista salta del 21-10 al 23-10). El barrido de las
06:03 se disparó por `workflow_dispatch` de `github-actions[bot]`
(`actions_list`, run 158 de `barrido.yml`), no por el reloj de Claude, lo
que cuadra con una ventana donde las rutinas de Claude no estaban
respondiendo. Esta corrida no puede confirmar la causa exacta (no tiene
acceso a los logs de las rutinas de Claude de ese día, solo a `last_run` de
hoy), pero sí puede afirmar el hecho, verificado desde tres ángulos
independientes (archivos de contenido ausentes, `contenido/estado/2026-10-22.md`
congelado, y cero commits de reloj).

### 2. HOY (escala el MIRAR del 21-10): la cifra de comunas con clases suspendidas sigue sin cerrar y sin marca nueva

El 21-10 esta misma auditoría dejó en MIRAR: "si Mineduc sigue sin publicar
y mañana tampoco hay marca nueva, pasa a HOY" (`bitacora/2026-10-21-auditoria.md`).
Como el 22-10 no tuvo edición, la primera oportunidad real de cerrarla es
hoy, y no se cerró: `contenido/informes/2026-10-23.md:9` y `:162` repiten
"clases suspendidas en el Gran Concepción" sin número y sin una marca
`PENDIENTE DE CIERRE` nueva (verificado con `grep` sobre el archivo
completo). `contenido/revisiones/2026-10-23.md` (hallazgo 2) confirma que el
material de hoy trae la misma contradicción sin resolver: BioBioChile cuenta
seis comunas, La Tercera cuenta cuatro, y ninguna fuente consolidada (Mineduc
o la intendencia) zanjó el número.

### 3. HOY (continúa, octava mañana): `scripts/gate.js:52` sigue sin el arreglo de una línea

Verificado de nuevo hoy: la línea 52 de `scripts/gate.js` es idéntica a la
que `bitacora/PENDIENTES.md` describe desde el 06-10 (siete mañanas
marcadas: 06, 07, 08, 09, 10, 12 y 21-10). El 21-10 el bug pasó de
predicción a pérdida real (bloqueó informe, Short y Clave de ese día). Hoy
no hay guion de Clave con fecha de hoy, así que no se reprodujo, pero sigue
listo para repetirse el día que una producción de Clave coincida con la
validación de un informe.

### 4. HOY (continúa, tercera vez, y hoy el validador no lo pescó): el informe vuelve a citar `contenido/casos/hitos.md` como fuente pública

`contenido/informes/2026-10-23.md` líneas 37, 168 y 179 cierran con
"(contenido/casos/hitos.md, 23-10-2026)" y linkean directamente al archivo
del repositorio como si fuera la fuente para el lector, exactamente el
defecto que el 20-10 y el 21-10 ya marcaron HOY (`bitacora/PENDIENTES.md`,
sección "Para la sesión de la noche"). `prompts/informe.md:159-160` sigue sin
la regla que ya tiene `prompts/guion-informe.md:316` ("nunca cites rutas del
repositorio, cita la fuente pública que el hito ya registra"), verificado
leyendo el prompt completo hoy. A diferencia del 20 y el 21-10,
`contenido/revisiones/2026-10-23.md` **no menciona el defecto en absoluto**:
hoy es la primera vez que también se le escapa a la validación, y salió a la
web igual (`web.yml` run exitoso tras el push de la revisión).

### Hallazgos AGUANTA que siguen repitiéndose (no bloquean, no se tocan hoy)

- **Siglas contra el tope de seis palabras de las marcas de fuente**: cuarta
  aparición (10-10, 21-10 y hoy, con "GLP vehicular" y "ENAP" sin expandir
  antes de la marca), ya en `bitacora/PENDIENTES.md`. Sigue sin decidirse
  cuál regla gana cuando chocan.
- **"Carátula 3" sale como una segunda pregunta en vez de "cifra con
  referencia"** (la decisión de Santiago sobre las tres variantes de A/B,
  `estrategia/decisiones.md:388`): hoy es la quinta vez documentada en
  auditorías (17, 18, 19, 20 y hoy 23-10, según `contenido/revisiones/*.md`
  y las propias auditorías de esos días), y **nunca llegó a
  `bitacora/PENDIENTES.md`** a pesar de que la auditoría del 20-10 ya la
  contaba como "cuarta repetición seguida". Es justo el caso que esta
  auditoría tiene instrucción de escalar: un hallazgo que se repite sin
  cambiar nada es el hallazgo. Queda agregado hoy (ver más abajo).

## Propuestas

1. **Investigar el apagón de relojes del 22-10.** No hay archivo de código
   que arreglar (los relojes son rutinas de Claude, no líneas de este
   repo), pero sí hay una brecha real: nada fuera del propio sistema de
   rutinas de Claude vigila si esas rutinas están disparando. Propuesta
   concreta para `reintento.yml` (que ya corre por cron nativo de GitHub,
   independiente de las rutinas de Claude): si a las 07:00 UTC
   `contenido/estado/FECHA.md` todavía no llegó a `preseleccion_lista`,
   que el workflow además escriba un archivo de alerta
   (`contenido/estado/alerta-cadena-muda.txt`) y notifique por un canal que
   no dependa de las rutinas de Claude (por ejemplo un paso de GitHub
   Actions que llame directo a la API de notificaciones), para que un
   apagón total de rutinas no deje a Santiago sin aviso otra vez.
2. **`prompts/informe.md`, entre las líneas 159 y 160**: agregar la misma
   línea que ya funciona en `prompts/guion-informe.md:316`: "Nunca cites
   `contenido/casos/hitos.md` ni ninguna ruta del repositorio como fuente
   para el lector: hitos.md es tu insumo, no una fuente citable. Cita
   siempre el origen público real que el propio hito ya registra." Esta
   propuesta ya estaba hecha desde el 20-10 y sigue sin aplicarse.
3. **`prompts/validador.md`**: agregar un punto explícito que revise, en la
   vuelta 1 del informe, que ninguna cita del cuerpo ni de "Fuentes
   consultadas" apunte a una ruta de `contenido/`, porque hoy el validador
   dejó pasar el mismo defecto que las dos auditorías anteriores ya habían
   nombrado.
4. **La cifra de comunas con clases suspendidas**: la sesión de día puede
   verificar si Mineduc, la intendencia del Biobío o la Seremi de Educación
   publicaron un número consolidado; si no, `contenido/informes/2026-10-24.md`
   debería abrir una marca `PENDIENTE DE CIERRE` nueva en vez de repetir la
   frase sin fecha de cierre, para que la escritura verificada pueda seguir
   rastreándola.
5. **`scripts/gate.js:52`**: sin cambios en la propuesta ya escrita siete
   veces: agregar `&& !f.endsWith("-imagenes.md")` al `.find()`.
6. **Carátula 3**: decidir en el prompt que la genera (`prompts/clave-idea.md`
   o el prompt de carátulas del informe, a confirmar por quien lo toque)
   por qué la tercera variante sigue saliendo como pregunta y no como cifra
   con referencia, y corregirlo antes de que la prueba A/B de Studio (ya
   marcada como "no está andando" en `bitacora/PENDIENTES.md`, sección
   CARÁTULA 4) tenga que compararse con solo dos enfoques reales.

## Triage

- **HOY**:
  1. El apagón de relojes del 22-10 y la falta de una alerta independiente
     (propuesta 1).
  2. `prompts/informe.md:159-160`, cita de `hitos.md` (propuesta 2), más el
     punto nuevo en `prompts/validador.md` (propuesta 3): ya se le escapó
     al validador por primera vez.
  3. `scripts/gate.js:52` (propuesta 5): octava mañana sin el arreglo de una
     línea.
- **AGUANTA**:
  4. "Carátula 3" como segunda pregunta en vez de cifra con referencia
     (propuesta 6): quinta repetición, nunca estuvo en `PENDIENTES.md`,
     queda agregada hoy.
  5. Siglas contra el tope de seis palabras (cuarta aparición, ya en
     `PENDIENTES.md`, no se duplica).
  6. Las seis fuentes institucionales sin feed propio (sin cambios, ya en
     `PENDIENTES.md`).
- **MIRAR**:
  7. La cifra de comunas con clases suspendidas (propuesta 4): pasó de MIRAR
     a HOY por lo ya dicho arriba, pero su arreglo de fondo (si Mineduc
     publica o no) no depende de código ni de esta noche.

## Comparación con ayer

No hay "ayer" que comparar en el sentido estricto: el 22-10 no tiene
auditoría propia (confirmado listando `bitacora/`: no existe
`2026-10-22-auditoria.md`) porque no hubo nada que auditar más allá del
apagón mismo, que esta auditoría recién documenta hoy. Comparado con la
última auditoría real, la del 21-10 (`CON FALLAS` por `gate.js`):

**Mejoró**: la cadena de texto de hoy corrió sin ningún atraso y con una
sola vuelta de corrección por pieza (igual de rápida que el 21-10, mejor
resultado porque hoy sí hubo video, Short y podcast). Las horas vistas de
los largos (21,0 h, ventana de 30 días) y su retención (20,3%) se mueven
apenas (-0,2 h, +0,5 pp) y no son una tendencia, son ruido de ventana móvil.

**Sigue igual**: `scripts/gate.js:52` sin tocar (ahora van ocho mañanas); las
seis fuentes institucionales sin feed; la contradicción de siglas contra el
tope de seis palabras (cuarta vez).

**Es nuevo**: por primera vez se documenta que el apagón completo de un día
(22-10) ocurrió sin que ninguna rutina de Claude, incluida esta misma
auditoría, lo registrara ese día; por primera vez el validador deja pasar
sin comentario la cita de `hitos.md` que las dos auditorías anteriores ya
habían marcado; y por primera vez "Carátula 3" queda escalada a
`PENDIENTES.md` después de cinco apariciones sin tracking.
