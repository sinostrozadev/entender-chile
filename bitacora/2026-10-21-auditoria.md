# Auditoría matinal · 21-10-2026

ESTADO: CON FALLAS. HOY: `scripts/gate.js:52` eligió el archivo equivocado
para la Clave (un guion de prompts de imagen en vez del guion real) y tiró
abajo toda la edición del día: a la hora de esta auditoría no se publicó ni
el video del informe, ni el Short, ni el video de la Clave de hoy, aunque
las cuatro piezas de texto llegaron completas y aprobadas con adelanto. Este
bug se viene prediciendo desde el 06-10 (seis mañanas documentadas en
`bitacora/PENDIENTES.md`) y hoy pasó de predicción a pérdida real.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Se esperaba | Atraso/adelanto |
|---|---|---|---|
| Barrido | 01:45 | ~01:40 | +5 min |
| Observatorio plata pública | 01:55 | ~01:45 | +10 min |
| Preselección (APROBADA vuelta 0, 57 candidatas, sin corrección) | 02:02 | 02:10 | adelantada 8 min |
| Informe (APROBADA vuelta 1) | 02:14 | 02:40 | adelantada 26 min |
| Guion del informe (APROBADA vuelta 1) | 02:31 | 03:10 | adelantada 39 min |
| Revisión (veredicto final, compuerta) | 02:43 | 03:30 | adelantada 47 min |
| Entrega y guion de la Clave ("acuerdo-internacional-sin-tratado") | ya existían, aprobados por su flujo propio, fecha de producción 2026-10-21 | — | — |
| Videos y descripciones (`edicion-diaria.yml` run 248) | **FALLÓ a las 02:43**, nada se renderizó | 05:15 | sin publicar a la hora de esta auditoría |
| Métricas | 05:06 | 05:00 | +6 min |

Fuente: horas de creación vía `git log --diff-filter=A --date=format-local`
en huso `America/Santiago` sobre cada archivo de hoy; `contenido/estado/2026-10-21.md`
(`ETAPA: aprobada`, `VEREDICTO: APROBADA`, `FALTA: Videos y descripciones`);
`contenido/estado/clave-acuerdo-internacional-sin-tratado.json` (`etapa:
aprobada`, `fecha_produccion: 2026-10-21`); y la lista de ejecuciones de
GitHub Actions del día vía `actions_list` (`edicion-diaria.yml` run 248,
`conclusion: failure`; runs 244 a 247 success, de retries anteriores sin
pieza nueva; `metricas.yml` run 149, `web.yml` run 366, `estado.yml` runs
847 a 851, todos success; `barrido.yml` run 155, success). Hoy es miércoles:
no corresponde el chequeo de domingo del ranking semanal.

## Qué falló

### 1. HOY: `scripts/gate.js:52` eligió el guion equivocado de la Clave y bloqueó toda la edición del día (informe, Short y Clave)

La cadena de texto llegó completa y rápida (ver tabla: cada pieza adelantada
contra su hora esperada, preselección aprobada sin corrección). El fallo
está en el último eslabón, el que renderiza y publica. La corrida
`https://github.com/sinostrozadev/entender-chile/actions/runs/39551135358`
(disparada a las 05:43 UTC por el push de la revisión, la compuerta real del
día) falló en el paso "2b · Gate previo al render" con exit code 1, y eso
saltó en cascada los pasos 3 a 8 (producir informe, Short, Clave, commit de
descripciones, release, YouTube, podcast y web): todos quedaron en
`skipped`. El log es explícito:

```
✓ informe: parsea · 6 secciones · ~3.6 min estimados
✓ clave: parsea · 0 secciones · ~0.0 min estimados
✓ revisión editorial: APROBADA
ERROR: clave: solo 0 secciones - YouTube exige ≥3 capítulos
ERROR: clave: narración de 0 caracteres - demasiado corta, algo vino mal
```

El informe parseaba bien y la revisión estaba APROBADA: el único bloqueo
fue la Clave. La causa, verificada en `scripts/gate.js:49-53`, es esta
línea:

```js
const gc = fs.existsSync(dirGC)
  ? fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))
  : null;
```

`contenido/guiones/claves/` tiene HOY dos archivos que empiezan con
"2026-10-21" y terminan en ".md": `2026-10-21-acuerdo-internacional-sin-tratado-imagenes.md`
(los seis prompts de imagen de las carátulas y las tarjetas, sin ninguna
marca de guion) y `2026-10-21-acuerdo-internacional-sin-tratado.md` (el
guion real, con sus secciones y veredicto `APROBADA` en
`contenido/veredictos/clave-acuerdo-internacional-sin-tratado-guion.md`).
`readdirSync` los devuelve en orden alfabético y `-imagenes.md` queda primero
("-" antes que "." en el nombre), así que `.find()` se queda con el archivo
de prompts de imagen, lo cuenta con 0 secciones y 0 caracteres, y hace
fallar la corrida entera (línea 97, `process.exit(1)`, que no distingue
error de informe de error de Clave).

Verificado que no es nuevo: este bug está documentado en
`bitacora/PENDIENTES.md` desde el 06-10-2026 (siete mañanas marcadas,
detalle en la sección "Para la sesión de la noche" de ese archivo), con el
arreglo de una línea ya escrito: `&& !f.endsWith("-imagenes.md")` en la
línea 52. Las reproducciones anteriores (06-10 y 09-10) "no costaron nada"
porque otro motivo (informe sin aprobar, o guion del informe inexistente a
esa hora) habría hecho fallar la corrida de todos modos. Hoy es la primera
vez que el único bloqueo fue este bug: sin él, la edición de hoy renderizaba
limpia a la primera.

Verificado el resultado real: `contenido/estado/2026-10-21.md` sigue
diciendo `FALTA: Videos y descripciones`; `bitacora/metricas/2026-10-21.md`
marca 190 subidos contra 189 de ayer, pero el único video nuevo es
"Alerta roja en toda la RM por lluvias y granizo: qué cambia..." (un Short de
Guardia, ajeno a la cadena diaria, no el informe de hoy); y
`contenido/podcast/episodios.json` no trae ninguna entrada del 21-10-2026 (lo
digo sin inventar el número, tal como pide el contrato: el episodio de hoy
simplemente no existe todavía). A la hora de esta auditoría, nadie puede ver
el informe de hoy, el Short de hoy ni la Clave de hoy en YouTube ni en el
podcast.

### 2. HOY (continúa desde el 20-10): el informe vuelve a citar `contenido/casos/hitos.md` como fuente para el lector, ahora en cinco lugares, segundo día seguido

`contenido/informes/2026-10-21.md` líneas 57, 89, 91, 187 y 189 (más su
línea en "Fuentes consultadas", línea 236) cierran con
"(contenido/casos/hitos.md, ...)" como si un archivo del repositorio fuera
una fuente pública. Ya está en la web: `web.yml` run 366 republicó el sitio
tras el push de la revisión (05:43 UTC). Es el mismo defecto que la
auditoría del 20-10 marcó HOY (entonces cuatro citas), y
`contenido/revisiones/2026-10-21.md` lo confirma en su hallazgo 2: "Es el
segundo día seguido con este hallazgo". La causa sigue siendo la misma,
verificada de nuevo: `prompts/guion-informe.md:316` ya tiene la regla
correcta ("NUNCA listes archivos internos del sistema... cita la fuente
PÚBLICA original del hecho") pero `prompts/informe.md:159-160` (la sección
"¿En qué quedó?") no la tiene, y nadie la agregó desde ayer.

## Propuestas

1. **`scripts/gate.js:52`**: cambiar
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md"))`
   por `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) && f.endsWith(".md") && !f.endsWith("-imagenes.md"))`.
2. **`prompts/informe.md:159-160`**: agregar, junto a la regla de "¿En qué
   quedó?", la misma línea que ya funciona en `prompts/guion-informe.md:316`:
   "Nunca cites `contenido/casos/hitos.md` ni ninguna ruta del repositorio
   como fuente para el lector: hitos.md es tu insumo, no una fuente citable.
   Cita siempre el origen público real que el propio hito ya registra."
3. **`scripts/validar-tarjetas.js:153`**: el filtro de `narrables` para la
   revisión de "cifra exacta en voz" (`!/^(\[|## |#)/`) no excluye las
   cabeceras "Carátula sugerida:", "Carátula N:", "Título sugerido:" ni
   "Descripción sugerida:", a diferencia del filtro de `narradas` en la
   línea 90. Copiar la misma exclusión para que no cuente "Carátula 3: Por
   cada millón / 103.900 pesos menos" (línea 5 del guion de hoy) como cifra
   hablada.
4. **`prompts/guion-informe.md:238` y `:258`** (tope de seis palabras de las
   marcas [FUENTE]) y la regla de siglas que exige expandirlas: decidir en
   el prompt qué gana cuando chocan en la misma marca (hoy "Senapred" quedó
   sin expandir por el tope). Sin esta decisión, el defecto va a seguir
   aparemiendo cada vez que una sigla larga entre a una marca de fuente.

## Triage

- **HOY**:
  1. `scripts/gate.js:52` (propuesta 1): bloquea la edición completa de hoy;
     ya publicado el defecto de no-publicación. Arreglar antes de la próxima
     Clave, que puede caer cualquier día.
  2. `prompts/informe.md:159-160` (propuesta 2): ya publicado con un defecto
     visible, segundo día seguido.
- **AGUANTA**:
  3. `scripts/validar-tarjetas.js:153` (propuesta 3): molesta a los
     validadores (dos veces hoy) pero no bloquea nada.
  4. La contradicción siglas/tope de seis palabras (propuesta 4, tercera
     aparición): no bloquea ninguna pieza.
  5. Las seis fuentes institucionales sin feed propio, sin cambios desde el
     16-10 (ya en `PENDIENTES.md`, no se duplica).
- **MIRAR**: el `PENDIENTE DE CIERRE` de "número definitivo de comunas con
  clases suspendidas" (`contenido/informes/2026-10-20.md:81`, vencía hoy) no
  se cerró con número porque Mineduc no publicó la resolución consolidada;
  el informe de hoy lo explica bien (línea 125) en vez de inventar un
  número, pero no abrió un nuevo `PENDIENTE DE CIERRE:` para mañana, así que
  la promesa queda sin marca explícita que la seguridad de archivos pueda
  rastrear. Si Mineduc sigue sin publicar y mañana tampoco hay marca nueva,
  pasa a HOY.

## Comparación con ayer

**Mejoró**: la cadena de texto corrió más rápida que nunca esta semana, cada
pieza bien adelantada contra su hora esperada, preselección aprobada sin
ninguna corrección. El `PENDIENTE DE CIERRE` de la lluvia (vencía hoy) sí se
cerró con número real (29,3 mm, estación Pudahuel), a diferencia de su
primera extensión.

**Sigue igual**: la cita de `contenido/casos/hitos.md` como fuente (segundo
día seguido); las seis fuentes institucionales sin feed; la contradicción de
siglas contra el tope de seis palabras (tercera vez, ahora con "Senapred").

**Es nuevo**: por primera vez el bug de `scripts/gate.js:52` dejó de ser una
predicción y bloqueó de verdad toda la edición del día completo, sin que
ningún otro motivo lo acompañara ni lo explicara; hasta hoy, cada vez que se
había reproducido "no costó nada" porque algo más también fallaba. También
es nuevo el falso positivo de "Carátula 3" en `validar-tarjetas.js`
(aunque la causa, el filtro angosto de `narrables`, ya existía).
