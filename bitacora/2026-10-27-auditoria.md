ESTADO: CON FALLAS. HOY: `scripts/metricas.js` pierde de forma intermitente
videos completos de la lista que arma cada mañana (hoy dos a la vez, "Clave:
Cómo leer el IPoM del Banco Central #Shorts" y "Concepción en Alerta Roja por
el aumento del río Andalién"), ya son al menos siete veces en el último mes
sin que nadie lo detectara, y explica la baja de 45 vistas totales de hoy que
a simple vista parecía un dato raro de YouTube.

## Qué salió hoy y a qué hora

| Pieza | Llegó (Chile) | Esperada | Vuelta | Fuente |
|---|---|---|---|---|
| Barrido | 01:46 | 01:40 (01:30 en el panel) | (no aplica) | `contenido/estado/2026-10-27.md`; Actions `barrido.yml` |
| Preselección | 01:59, veredicto 02:09 | 02:10 | APROBADA vuelta 0 | `contenido/veredictos/2026-10-27-preseleccion.md` |
| Informe | 02:14, veredicto 02:35 | 02:40 | APROBADA vuelta 2 (CORREGIR en 02:23 y 02:31) | `contenido/veredictos/2026-10-27-informe.md` |
| Guion del informe | 02:37, veredicto 02:50 | 03:10 | APROBADA vuelta 1 (CORREGIR en 02:45) | `contenido/veredictos/2026-10-27-guion_informe.md` |
| Revisión (compuerta) | 02:50 | 03:30 | APROBADA vuelta 2 | `contenido/revisiones/2026-10-27.md` |
| Videos, descripciones, podcast | `videos_listos` 03:05 | 05:15 | (no aplica) | `contenido/estado/2026-10-27.md`; Actions "Edición diaria" run 40457635089 (éxito) |
| Métricas | push 05:06 | 05:00 | (no aplica) | `bitacora/metricas/2026-10-27.md`; Actions "Métricas" run 40471151048 (éxito) |
| Auditoría matinal | esta corrida | 05:30 | (no aplica) | — |

Ninguna pieza llegó con más de 20 minutos de atraso contra su hora esperada;
al contrario, la cadena terminó muy por delante del cuadro (videos listos a
las 03:05 contra las 05:15 esperadas). `node scripts/validar-tarjetas.js --fecha 2026-10-27`
imprime "variedad OK: ninguna cuota rota, ninguna marca malformada" sobre 4
bloques (comparación 2, esquema 2, cifra 1), sin avisos. No hubo Clave hoy
(no es diaria desde el 16-09) y no corresponde revisar el ranking semanal
porque hoy es martes, no domingo. Las corridas de "Reintento del despertar"
entre las 02:36 y las 05:36 (nueve corridas cada 15 a 20 minutos) son el
reloj de respaldo y no encontraron nada que reintentar porque la cadena
nunca se atrasó.

## Qué falló

### 1. `scripts/metricas.js` pierde videos completos de la lista, sin avisar, al menos siete veces en el último mes

Comparando cada `bitacora/metricas/AAAA-MM-DD.json` contra el del día
anterior (título por título), estos videos desaparecieron de un día para
otro y en la mayoría de los casos reaparecieron solos después:

| Desaparece entre | Video perdido | Vuelve el |
|---|---|---|
| 01 y 02-10 | El Estrecho es chileno, y otras 4 cosas de hoy #Shorts | 03-10 |
| 02 y 03-10 | Clave: ¿Por qué una norma sísmica no basta para evitar el ri... | 04-10 |
| 11 y 12-10 | Clave: ¿Qué es la prisión preventiva y por qué no es una con... | 13-10 |
| 12 y 13-10 | El crimen del carabinero en Renca suma un segundo detenido | 16-10 (tres días afuera) |
| 16 y 17-10 | ¿Qué ocurre cuando Contraloría detecta un perjuicio fiscal? | 18-10 |
| 17 y 18-10 | ¿Cómo funciona la regla fiscal y el balance estructural? | 19-10 |
| 26 y 27-10 | Clave: Cómo leer el IPoM del Banco Central #Shorts, y Concepción en Alerta Roja por el aumento del río Andalién (dos a la vez, la primera vez que caen dos juntos) | sin verificar, se sabrá mañana |

Verificado con `canal.videos` (de `channels.list`, cuenta solo videos
públicos): subió de 194 a 195 entre el 26 y el 27-10, un solo video más, el
número que corresponde al Short nuevo de la guardia ("Diez comunas de la RM
en alerta roja: ¿está la tuya? #Shorts", público, 9 vistas, no estaba ayer).
Si los dos videos perdidos hubieran sido borrados o pasados a no públicos en
YouTube, ese contador también habría bajado, y no bajó: la lista de subidos
completa (`subidos`, por `playlistItems.list` paginado) también creció en
uno, de 201 a 202, sin AVISO de truncamiento (`scripts/metricas.js:53`). Los
dos videos siguen existiendo y siguen públicos; lo que falta es que
`yt.videos.list` (línea 56) haya devuelto sus datos en la tanda de 50 que les
tocaba. Como las vistas totales se calculan sumando por video
(`scripts/metricas.js:78`, ARREGLO 3 del 01-09), perder dos videos con 55 y
22 vistas de un día a otro explica la baja de 45 vistas totales que el
encabezado de hoy marca como primera baja de la semana: sin esas dos filas,
la suma cae aunque todo el resto del canal haya crecido.

Esto nunca se había verificado cruzando los JSON día a día; esta auditoría lo
hizo porque la baja de vistas totales de hoy no cuadraba con ningún video que
hubiera pasado a privado. El AVISO de la línea 53 solo compara cantidades
totales (`subidos.length` contra `canal.videos`), así que un video que SÍ
está en `subidos` pero que `videos.list` no devuelve en su tanda no dispara
ningún aviso: la cuenta de cuántos id se pidieron contra cuántos `r.data.items`
llegaron nunca se compara.

### 2. Las seis fuentes institucionales sin feed, sin cambios

`contenido/revisiones/2026-10-27.md` (hallazgo 1) repite la misma lista de
Contraloría, Banco Central, Cámara de Diputados, Senado, Dirección
Meteorológica y Ministerio Público. Ya está en `bitacora/PENDIENTES.md`
(entrada del 16-10, AGUANTA, sin dueño); no se duplica.

### 3. Horas vistas de los largos: octava baja consecutiva, hoy otra vez varias veces el ruido habitual

`bitacora/metricas/FECHA.md`, campo "horas vistas en videos LARGOS" (ventana
móvil de 30 días):

| Fecha | Horas | Retención media |
|---|---|---|
| 24-10 | 21.0 | 20.3% |
| 25-10 | 20.8 | 20.3% |
| 26-10 | 19.6 | 19.7% |
| 27-10 | **18.6** | 19.5% |

La auditoría del 26-10 ya marcó esto en MIRAR y propuso: "si la baja continúa
dos días más seguidos, esa entrada debería subir de AGUANTA a su propio HOY".
Hoy es el primero de esos dos días y la baja continuó (-1.0 h, de nuevo varias
veces el ruido habitual de ~0.2 h/día). Falta un día más para que se cumpla la
condición completa; si el 28-10 vuelve a bajar, corresponde escribir esa
entrada HOY en `bitacora/PENDIENTES.md` bajo "NÚMEROS 1".

### 4. Titulares de la preselección casi copiados del barrido: bajó, no subió

Hoy 23 de las 60 candidatas de `contenido/preseleccion/2026-10-27.md`
quedaron "cerca del titular del barrido, reescritos con artículos agregados y
la puntuación cambiada" (veredicto de preselección). El 26-10 fueron 25. La
auditoría del 26-10 dejó la regla: "si vuelve a medir una proporción igual o
mayor, baja a HOY; si baja, queda en MIRAR una mañana más". Bajó, así que
sigue en MIRAR.

### 5. Una promesa abierta se perdió por el tope de 60 candidatas, no por error de contenido

`contenido/revisiones/2026-10-27.md` (hallazgo 6): la alerta por tormentas
del Biobío, que el informe del 26-10-2026 dejó abierta, tuvo novedad hoy y no
entró ni a las candidatas ni a las historias sin novedad porque la
preselección llegó justo al tope de 60. No bloqueó ningún veredicto. Primera
vez que se documenta este mecanismo puntual (una continuidad abierta pierde
el cupo frente a noticias nuevas); si se repite, hay que decidir si las
promesas abiertas del día anterior reservan un lugar en la olla antes de
llenarla con lo nuevo.

### 6. El cuerpo del commit de la preselección dice "plan B" sin que hubiera plan B

`contenido/revisiones/2026-10-27.md` (hallazgo 8), verificado: el commit
`3873a21` ("edición 2026-10-27: preselección") trae `Tarea: suplente (plan
B)` en el cuerpo, pero `contenido/estado/plan-b.txt` no existe y
`contenido/estado/reparto.txt` confirma que la preselección es reparto
permanente del suplente desde el 06-10, no un plan B temporal. El propio
cuerpo del commit lo dice bien ("El reparto permanente deja esta etapa en
Claude"); solo la línea `Tarea:` quedó mal. No bloquea, el contrato deja esa
línea libre, pero es justo el historial que se usa para contar cuántas veces
GPT se quedó mudo, y hoy contaría una vez de más.

### 7. Tres candidatas con "corroborada en 2 fuentes" que en realidad es una sola nota repetida en dos feeds

`contenido/revisiones/2026-10-27.md` (hallazgo 7): el campo `repeticiones` del
barrido marca 2 cuando el segundo "medio" es la misma nota entrando por otro
feed. Primera vez que se documenta con esta claridad. No bloquea y la propia
revisión recomienda no salir a buscar el segundo medio porque no existe; se
deja anotado por si vuelve a aparecer.

## Propuestas

1. Para el hallazgo 1 (HOY): en `scripts/metricas.js`, dentro del bucle de
   la línea 55, después de `const r = await yt.videos.list(...)` (línea 56),
   comparar el largo de `r.data.items` contra el de la tanda pedida
   (`subidos.slice(i, i + 50)`) y, si faltan id, reintentar esa tanda una vez
   antes de seguir; si siguen faltando, imprimir un AVISO con los id exactos
   que faltaron (mismo patrón que la línea 53), para que la próxima vez que
   esto pase quede escrito en el log de Actions en vez de descubrirse
   cruzando JSON a mano.
2. Para el hallazgo 3: ninguna propuesta nueva hoy; la de `bitacora/PENDIENTES.md`
   ("NÚMEROS 1") sigue siendo la pendiente. Si el 28-10 confirma la segunda
   baja seguida, esa entrada sube a HOY con la propuesta concreta de qué
   tocar en el empuje de entrada.
3. Para el hallazgo 5: si se repite, que `prompts/seleccion.md` reserve un
   cupo dentro de los 60 para las continuidades abiertas del informe
   anterior, antes de llenar el resto con candidatas nuevas.

## Triage

- **HOY**:
  1. `scripts/metricas.js` pierde videos de la lista sin avisar (hallazgo
     1). Es dato perdido real (vistas, me gusta e impresiones de esos
     video-día no quedan en ningún archivo), lleva un mes repitiéndose sin
     que nadie lo viera y hoy afectó el encabezado de métricas. Baja a
     `bitacora/PENDIENTES.md` en este mismo commit.
- **AGUANTA**:
  1. Las seis fuentes institucionales sin feed (hallazgo 2). Sin cambios,
     ya está en `bitacora/PENDIENTES.md` desde el 16-10.
- **MIRAR**:
  2. Horas vistas de los largos, octava baja seguida (hallazgo 3). Un día
     más de baja y sube a HOY, como quedó escrito el 26-10.
  3. Titulares casi copiados del barrido (hallazgo 4). Bajó de 25 a 23;
     sigue en MIRAR una mañana más.
  4. Promesas abiertas perdidas por el tope de 60 candidatas (hallazgo 5).
     Primera vez que se documenta; mirar si se repite.
  5. "Corroborada en 2 fuentes" con un solo medio real (hallazgo 7). Primera
     vez que se documenta con claridad.

## Comparación con ayer

**Mejoró**: la proporción de titulares casi copiados del barrido bajó de 25
a 23 sobre 60, revirtiendo (aunque sea un poco) la duplicación que se vio
ayer. El informe y el guion de hoy no tuvieron problemas de selección ni de
fidelidad, igual que ayer; lo único que costó vueltas fue forma (un
encabezado vacío en el informe, cuatro correcciones de tarjeta en el guion).

**Sigue igual**: las seis fuentes institucionales sin feed, quinto día o
más con el mismo texto exacto; las horas vistas de los largos siguen
bajando, ya son ocho días seguidos sin un solo repunte desde el 20-10.

**Es nuevo**: esta auditoría encontró, cruzando los JSON de métricas de todo
el mes, un bug de `scripts/metricas.js` que pierde videos completos de la
lista de forma intermitente, confirmado siete veces desde el 01-10 y nunca
antes documentado ni en `bitacora/PENDIENTES.md` ni en ninguna auditoría
anterior; hoy perdió dos videos a la vez por primera vez, y eso explica la
primera baja de vistas totales de la semana. También son nuevos: una
promesa abierta (la alerta del Biobío) que se quedó fuera de la olla por el
tope de 60 candidatas en vez de por un error de contenido, y el hallazgo de
"corroborada en 2 fuentes" con una sola nota repetida en dos feeds.
