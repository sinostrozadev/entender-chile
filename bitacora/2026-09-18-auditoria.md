ESTADO: CON OBSERVACIONES — la cadena corrió completa y sin fallas técnicas (28 corridas de Actions sobre `main`, todas `success`), con una sola vuelta de corrección (guion del informe) contra las dos de ayer. No hay `HOY`. Hay cuatro hallazgos, ninguno nuevo: dos llevan cuatro días seguidos sin cambios (los enlaces de redirección de Google News en la preselección y el orden de secciones del informe, este último con la propuesta de arreglo de la auditoría de ayer todavía sin aplicar en `prompts/informe.md`), uno lleva dos días (el error de la hora del banco de temas en `contenido/estado/FECHA.md`, con su propuesta de ayer tampoco aplicada en `scripts/estado.js`), y la carrera entre el observatorio y el informe se repitió por segunda vez, ahora en el sentido contrario y con un margen mayor (6 min en vez de 29 s), dejando otra vez el "¿En qué quedó?" un día atrasado.

Auditada el 18-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`471ae9e`, "métricas 2026-09-18 [bot]"). Horas esperadas tomadas de `contenido/estado/2026-09-18.md` (columna "Se espera a las") y de `bitacora/cronograma.json` (actualizado 2026-09-16); horas reales, de `mcp__github__actions_list` sobre el repo (barrido.yml, edicion-diaria.yml, metricas.yml, web.yml, estado.yml) más `git log` de cada pieza.

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:40 (01:31 según cronograma) | despertador 01:33 → archivo 01:33 | ok |
| Preselección → APROBADA v0 | 02:10 | 01:37 | ok, sin vuelta |
| Observatorio plata pública (hito de hoy) | 01:45 | 01:55 | +10 min, ver hallazgo 4 |
| Informe → APROBADA v0 | 02:40 | 01:49 | ok, sin correcciones |
| Guion del informe → CORREGIR v1 → APROBADA v1 | 03:10 | 02:33 (v0), corregido 02:44, aprobado 02:46 | ok, 1 vuelta |
| Revisión final (`contenido/revisiones/2026-09-18.md`), APROBADA | 03:30 | 02:47 | ok |
| Banco de temas de la Clave | 04:00 | 02:49 (real; el panel muestra 04:18, ver hallazgo 3) | ok |
| Edición diaria (compuerta → render → videos listos) | ~04:00 | arrancó 02:48, videos listos 03:16 | ok, adelantada |
| Web (publica podcast) | continuo | 03:16 | ok |
| Reloj de métricas → Métricas | 05:00 | despertador 05:06 → archivo 05:06 | +6 min, ok |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

`contenido/estado/2026-09-18.md`: `ETAPA: videos_listos`, `VEREDICTO: APROBADA`, `FALTA: nada, el día está completo`. Las tres piezas validadas tienen veredicto `APROBADA` en `contenido/veredictos/2026-09-18-*.md` (preseleccion vuelta 0, informe vuelta 0, guion_informe vuelta 1). Verificado con `mcp__github__actions_list`: todas las corridas de hoy sobre `main` en barrido, estado, edición diaria, web y métricas terminaron `conclusion: success`; ninguna `failure` ni `cancelled`. No hubo Clave hoy (listados `contenido/claves/` y `contenido/guiones/claves/`: ninguna entrada con fecha 2026-09-18), lo que corresponde desde CLAVE 4 (16-09).

## Qué falló

Sin fallas técnicas. `node scripts/validar-tarjetas.js --fecha 2026-09-18`: "variedad OK: ninguna cuota rota, ninguna marca malformada" (3 cifra, 2 comparación, 1 esquema, 1 barras, 12 bloques con fuente). Duración real del episodio de hoy (`contenido/podcast/episodios.json`, entrada `2026-09-18`/`informe`): 706 s = 11,8 min, dentro de "~10 min, 12-13 en día cargado". El informe de hoy no deja ningún `PENDIENTE DE CIERRE` (comprobado con grep sobre el archivo completo); el del 17-09 sí dejó uno (salvoconducto venezolano) y quedó cerrado hoy: la preselección de hoy trae la entrega como [A] y el informe de hoy lo cubre en el bloque correspondiente (verificado en `contenido/revisiones/2026-09-18.md`, resumen: "la deuda del salvoconducto venezolano que el 17-09 quedó pendiente de cierre entregada hoy como [A]").

Hay cuatro hallazgos, evidencia abajo. Ninguno es nuevo; los cuatro ya estaban anotados en auditorías anteriores.

**1. La preselección sigue enlazando redirecciones de Google News en vez del artículo directo, cuarto día seguido.** `contenido/revisiones/2026-09-18.md`, hallazgo de "Preselección": "la mayoría de las URL siguen siendo enlaces de redirección de Google News en vez de la dirección del medio, cuarto día seguido, lo que obliga a la etapa del informe a resolver cada uno antes de verificar cifras". La causa está en `scripts/barrido.js`: la línea 121 arma la URL del feed de búsqueda de Google News, y la línea 94 toma el `<link>` del RSS tal cual, que para Google News es siempre una redirección de ~500 caracteres, no la URL del medio; la línea 300-305 ya lo sabe ("Las URL de Google News son redirecciones... no aportan") y por eso las oculta del `.md` de salida, pero eso no resuelve el problema de fondo: la preselección y el informe igual tienen que abrir esa redirección para verificar cada cifra.

**2. El informe no sigue el orden de secciones del prompt, cuarto día seguido, y la corrección que propuso la auditoría de ayer no se aplicó.** `contenido/revisiones/2026-09-18.md`, hallazgo de "Informe": "'Plata pública' y 'Salud' no figuran en la lista de secciones y 19 de las 21 [C] llevan sección propia en vez de 'Además, hoy'". Mismo defecto en `contenido/revisiones/2026-09-17.md`, `2026-09-16.md` y ya asomaba el `2026-09-15.md`: cuatro días, mismo problema. La auditoría del 17-09 (propuesta 1) pidió agregar en `prompts/informe.md`, cerca de la línea 101, una autoverificación de estructura igual a la que ya existe para "Fuentes consultadas" (línea 89); comprobado hoy leyendo `prompts/informe.md` líneas 80-125: la autoverificación de fuentes sigue ahí sin cambios, pero no hay ninguna autoverificación de secciones cerca de la lista de la línea 101. La propuesta de ayer quedó escrita pero no se llevó al prompt.

**3. `contenido/estado/2026-09-18.md` sigue mostrando mal la hora de llegada del banco de temas, segundo día seguido, y la corrección que propuso la auditoría de ayer tampoco se aplicó.** La fila "Banco de temas de la Clave" de hoy dice `Llegó: 04:18`, pero el commit real que escribió el banco de temas de hoy es de las 02:49 (`git log --format='%cd' -1 -- contenido/claves/banco-temas.md`, commit "banco de temas 2026-09-18 [gpt]"). La auditoría del 17-09 (propuesta 2) diagnosticó la causa en `scripts/estado.js` línea 157 (`horaDe`, que usa `--diff-filter=A` y por eso siempre devuelve la hora de la primera vez que el archivo se creó, no la de hoy) y propuso una función `horaUltimaDe` para las piezas `hoy: true`. Comprobado hoy leyendo `scripts/estado.js` líneas 102-157: `horaDe` sigue igual, sin la rama especial para piezas `hoy`. Es un error solo del panel interno: no afecta lo publicado.

**4. La carrera entre el observatorio y el informe se repitió, ahora en sentido contrario y con más margen.** El informe de hoy quedó committeado a las 01:49:23 Chile; el observatorio pusheó el hito del día ("siete cuadernos de remoción pendientes ante el Tribunal Constitucional", `contenido/casos/hitos.md` línea 29) a las 01:55:06, casi 6 minutos después. `contenido/revisiones/2026-09-18.md` ya lo señala: "el hito del 18-09 del observatorio... entró al repo cinco minutos después del commit del informe... es el mismo desfase anotado el 17-09, ahora al revés". Confirmado leyendo la sección "¿En qué quedó?" del informe de hoy (línea 245): trae la versión del hito del 15-09 (las cuatro inadmisibilidades y el caso Urrutia), no la actualización de hoy. Ayer el informe ganó la carrera por 29 segundos; hoy el observatorio llegó 6 minutos tarde. El margen no se está achicando, se está moviendo de un lado a otro, y las dos veces el resultado fue el mismo: el hito del propio día no entra al informe del propio día.

## Propuestas

1. En `scripts/barrido.js`, evaluar si conviene resolver la redirección de Google News antes de escribir `noticias[].url` (por ejemplo, un `HEAD` con `redirect: "follow"` sobre cada URL candidata a destacada, no sobre las ~800 únicas del bruto, para no disparar el tiempo del barrido) o, alternativamente, dejar la redirección pero declarar explícitamente en el prompt de preselección/informe que deben resolverla ellos mismos antes de citar la cifra — hoy no está dicho en ningún prompt, solo se infiere del hallazgo repetido.
2. En `prompts/informe.md`, línea ~101 ("Secciones troncales y opcionales, en este orden..."), agregar la autoverificación que la auditoría del 17-09 ya redactó: antes de cerrar el informe, listar las secciones usadas y compararlas una por una contra el orden de las líneas 101-118, confirmando que cada [C] quedó en "Además, hoy" y no en sección propia.
3. En `scripts/estado.js`, línea 157, para las piezas con `pieza.hoy` (hoy solo "banco", líneas 62-63), usar la hora del último commit del archivo (`git log -1 --format=%cI`, sin `--diff-filter=A`) en vez de `horaDe`, tal como quedó redactado en la auditoría del 17-09.
4. Pedirle a Santiago que decida el orden entre el observatorio (01:45 nominal) y el informe: si el informe puede esperar 10-15 minutos de cortesía antes de leer `contenido/casos/hitos.md`, o si el observatorio debe correr con más margen antes de esa hora, para que el hito del propio día no dependa de quién llegue primero por minutos.

## Triage

- **AGUANTA**: propuesta 1. No bloquea ni pierde datos, pero ya son cuatro días con el mismo defecto y sin que nadie lo haya convertido todavía en un cambio de código o de prompt.
- **AGUANTA**: propuesta 2. Cuarto día del mismo defecto de forma; la propuesta ya existe redactada desde ayer y no se aplicó.
- **AGUANTA**: propuesta 3. Es un error de panel interno, no de lo publicado; segundo día seguido sin la corrección que ya estaba redactada desde ayer.
- **MIRAR**: propuesta 4. Segunda vez que la carrera deja al informe sin el hito del propio día, con el margen moviéndose de +29 s a -6 min en vez de estabilizarse; si se repite una tercera vez conviene que deje de ser "mirar".

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista. No se agrega nada a `bitacora/PENDIENTES.md`.

## Comparación con ayer

**Mejoró:**
- Una sola vuelta de corrección hoy (guion del informe) contra dos ayer (preselección y guion del informe).
- El `PENDIENTE DE CIERRE` del 17-09 (salvoconducto venezolano) se cerró hoy, entregado como [A].
- Suscriptores recuperó el que había bajado ayer: 14 → **15** (+1).
- Horas vistas en videos largos siguen subiendo: 18,8 h (15-09) → 19,3 h (16-09) → 19,9 h (17-09) → **20,8 h** (18-09).

**Sigue igual:**
- Los enlaces de redirección de Google News en la preselección (hallazgo 1), cuarto día.
- El orden de secciones del informe (hallazgo 2), cuarto día, con la propuesta de ayer todavía sin aplicar.
- El error de la hora del banco de temas en el panel interno (hallazgo 3), segundo día, con la propuesta de ayer todavía sin aplicar.
- La retención media ponderada de los largos se mantiene prácticamente estable: 33,2% (17-09) → 33,0% (18-09).

**Nuevo:**
- La carrera observatorio-informe (hallazgo 4) cambió de bando: ayer el informe ganó por 29 segundos, hoy el observatorio llegó 6 minutos tarde. Es la segunda vez que ocurre, nunca a favor del informe.

Objetivo YPP: 136 días hasta el 1 de febrero de 2027, con 20,8 horas vistas medidas de las 4.000 que exige el programa. Sigue subiendo (19,9 → 20,8 h) pero muy por debajo del ritmo necesario para cerrar la brecha; no es un hallazgo nuevo de hoy, es el contexto de todo lo de arriba.
