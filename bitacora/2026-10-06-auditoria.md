# Auditoría matinal · 06-10-2026

ESTADO: CON FALLAS — HOY: `scripts/gate.js:52` elige el archivo equivocado
cuando existe un `-imagenes.md` junto al guion de la Clave, y mañana
(07-10-2026) esa corrida va a tirar "0 secciones" sobre un guion que sí
existe y ya está aprobado, con `exit 1` en la línea 97 que bloquea también
el informe. Reproducido hoy en una corrida real
(`https://github.com/sinostrozadev/entender-chile/actions/runs/37409042997`).
También HOY, de nuevo: la idea de la Clave de la semana 39 cumple diez
mañanas sin que Santiago la apruebe o pida cambios.

## Qué salió y a qué hora

Todas las piezas de la cadena diaria llegaron y la edición quedó en
`videos_listos`, pero con un atraso grande en el tramo intermedio: GPT dejó
de responder el turno de reparación de la preselección y el plan B tuvo que
intervenir antes de que la cadena pudiera seguir.

| Pieza | Hora real (Chile) | Hora esperada | Diferencia |
|---|---|---|---|
| Barrido | 01:49 | 01:40 | +9 min |
| Preselección (GPT, vuelta 0) | 01:56 | 02:10 | 14 min antes |
| Veredicto preselección vuelta 1 | 02:05 (CORREGIR, una línea de fecha) | — | — |
| Reparación de la preselección | GPT no respondió en 47 min; plan B activado 03:22; suplente corrigió 03:25; veredicto APROBADA 03:28 | — | GPT ausente ~80 min |
| Informe (aprobado, vuelta 2) | 04:50 | 02:40 | ~130 min después |
| Guion del informe (aprobado, vuelta 2) | 05:20 | 03:10 | ~130 min después |
| Revisión (compuerta final) | 05:20 | 03:30 | ~110 min después |
| Edición diaria (voz, render, subida, podcast) | push 05:20, `videos_listos` 06:07 (47 min de corrida) | 05:15 | 52 min después (arrastre de arriba, no del render en sí) |
| Carátula propia | `contenido/caratulas/2026-10-06.png`, generada hoy por GPT | — | a tiempo |
| Podcast (`episodios.json`) | 703 s = 11,7 min | "~10 min, 12-13 en día cargado" | dentro del rango |
| Reloj de métricas | push 05:19 | ~05:00 | 19 min, dentro de la tolerancia de 20 |
| Métricas (`bitacora/metricas/2026-10-06.md`) | 05:20 | — | OK |
| Clave licencia-medica-fiscalizacion-y-sumario | tema→guion completos entre 22:35 (05-10) y 00:22 (hoy); `FECHA_PRODUCCION: 2026-10-07`; video `falta` | — | en curso, no es diaria |
| GitHub Actions (todas las corridas de hoy) | una sola `failure`: el disparo prematuro del render de la Clave para 2026-10-07 (00:27, ver hallazgo 1); el resto, incluida la Edición diaria 183, `success` | — | ver hallazgo 1 |

`node scripts/validar-tarjetas.js --fecha 2026-10-06`: un aviso, línea 5,
"cifra exacta en voz (1.241)" (ver hallazgo 3; es un falso positivo del
validador, no de la pieza).

## Qué falló

1. **`scripts/gate.js:52` va a bloquear la edición completa del
   07-10-2026 (informe y Clave), no solo la Clave.** Desde que
   `prompts/guion-claves.md:116` agregó el archivo compañero
   `contenido/guiones/claves/FECHA-<slug>-imagenes.md`, la línea
   `fs.readdirSync(dirGC).find((f) => f.startsWith(fecha) &&
   f.endsWith(".md"))` puede elegir ese archivo de prompts de imagen en vez
   del guion real, porque los dos nombres empiezan igual y `.find()` se
   queda con el primero que calza en el orden de `readdirSync`. Lo
   reproduje en esta misma corrida con Node: para `FECHA=2026-10-07`,
   `readdirSync` devuelve primero
   `2026-10-07-licencia-medica-fiscalizacion-y-sumario-imagenes.md` (son
   descripciones de imágenes, sin ninguna marca de guion) y
   `scripts/gate.js` lo cuenta con "0 secciones" y "0 caracteres de
   narración", lo que dispara los errores
   `clave: solo 0 secciones - YouTube exige ≥3 capítulos` y
   `clave: narración de 0 caracteres`, y la línea 97
   (`if (errores.length) { ...; process.exit(1); }`) no distingue error de
   informe de error de Clave: sale con `exit 1` y no renderiza nada.
   Evidencia real, no solo reproducción local: la corrida
   `https://github.com/sinostrozadev/entender-chile/actions/runs/37409042997`,
   disparada a las 00:27 de hoy por `estado-clave.yml` para
   `FECHA_EDICION=2026-10-07`, falló con exactamente ese mensaje en los
   logs. El guion real existe y está aprobado: 138 líneas con sus catorce
   secciones en
   `contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario.md`,
   `VEREDICTO: APROBADA` en
   `contenido/veredictos/clave-licencia-medica-fiscalizacion-y-sumario-guion.md`.
   Hoy esa corrida concreta no le costó nada a la edición del 06-10 porque
   el disparo fue prematuro (el informe del 07-10 todavía no existe, así
   que de todas formas no había nada que renderizar), pero **la corrida de
   mañana sí va a tener el informe y el guion de la Clave del 07-10 listos
   y aprobados, y con `FECHA` por defecto igual a la fecha de hoy
   (`.github/workflows/edicion-diaria.yml:66-67`), va a pisar el mismo
   bug**: la Clave sale con "0 secciones" y tira abajo también el informe,
   que sí está bien.

2. **La idea de la Clave de la semana 39
   (acuerdo-internacional-sin-tratado) cumple diez mañanas sin que Santiago
   la apruebe o pida cambios.** Verificado de nuevo en
   `contenido/estado/clave-acuerdo-internacional-sin-tratado.md`: sigue
   `ETAPA: idea_lista`, `TURNO: Santiago: aprobar o pedir cambios`,
   `ACTUALIZADO: 2026-10-06 00:27`, sin cambios desde que la auditoría del
   05-10 contó nueve mañanas. Ya está en `bitacora/PENDIENTES.md`, sección
   "Dependen de Santiago" (se agregó ahí el 05-10); hoy le agregué una
   línea con el conteo, como pide el contrato, sin duplicar la entrada.

3. **`scripts/validar-tarjetas.js` cuenta como "voz" texto que nunca se
   narra: las líneas de carátula sugerida, de la cabecera del archivo.** El
   aviso de hoy, "línea 5: cifra exacta en voz (1.241)", apunta a
   `Carátula 3: US$1.241 por persona / ¿Qué significa realmente?`, que es
   una sugerencia de texto para la miniatura, no parte de `Guion:`. Lo
   mismo que escribe esa cifra en el guion real
   (`[DATO cifra | INE, 28 ene] techo por habitante proyectado: US$1.241`,
   línea 29) queda correctamente afuera del chequeo porque empieza con
   `[`. La causa es que `narrables` (línea 84) corta el archivo en
   `Fuentes:` pero nunca en `Guion:`, así que arrastra también el título,
   la descripción y las cuatro líneas de carátula del encabezado. No
   bloquea nada (el script nunca sale con código distinto de 0 salvo con
   `--estricto`, que nadie pasa hoy) y es la primera vez que una carátula
   trae un número de cuatro o más cifras, así que no es un hallazgo que se
   repita todavía.

## Propuestas

1. En `scripts/gate.js:52`, cambiar
   `.find((f) => f.startsWith(fecha) && f.endsWith(".md"))` por
   `.find((f) => f.startsWith(fecha) && f.endsWith(".md") &&
   !f.endsWith("-imagenes.md"))`, para que nunca pueda elegir el archivo de
   prompts de imagen en lugar del guion.

2. Nada que tocar en código: se aprueba o se pide cambio con
   `node scripts/clave.js aprobar acuerdo-internacional-sin-tratado` o
   `clave.js cambiar acuerdo-internacional-sin-tratado`.

3. En `scripts/validar-tarjetas.js`, junto a la línea 83
   (`corteFuentes = ...`), agregar `corteGuion =
   lineas.findIndex((l) => /^Guion:/.test(l.trim()))` y, en la línea 84,
   cortar `narrables` desde `corteGuion + 1` (si existe) en vez de desde el
   principio del archivo, para que el encabezado (título, descripción,
   carátulas) deje de contarse como texto narrado.

## Triage

- **HOY**: hallazgo 1 (`scripts/gate.js:52`, bloquea la edición del
  07-10-2026) → propuesta 1. Nueva entrada en `bitacora/PENDIENTES.md`,
  sección "Para la sesión de la noche (código y prompts)". Se marca HOY
  porque rompe la edición de mañana si no se corrige antes de que la
  cadena del 07-10 llegue a la compuerta.
- **HOY**: hallazgo 2 (idea de la Clave, décima mañana) → propuesta 2. Ya
  estaba en PENDIENTES desde el 05-10; se le agregó el conteo, sin
  duplicar.
- **AGUANTA**: hallazgo 3 (validar-tarjetas.js cuenta la carátula como
  voz) → propuesta 3. Es la primera vez que ocurre y el script nunca
  bloquea nada; no se escribe en PENDIENTES todavía, sube si se repite.
- **MIRAR**: GPT dejó de responder un turno por tercera vez en cuatro
  días de producción (03-10 y 04-10 en `barrido_listo`, hoy en
  `reparar_preseleccion`, un turno distinto), y el plan B lo cubrió las
  tres veces sin pérdida de datos ni de calidad. El diseño ya contempla
  `reparar_*` en `contenido/estado/plan-b.txt`, así que no hay nada que
  tocar en código hoy, pero si la frecuencia sube conviene que alguien
  mire el lado de la interfaz de GPT, como ya propuso la auditoría del
  04-10.
- **MIRAR**: en el guion de hoy, la categoría `[clima]` del bloque del
  sistema frontal (línea 84) convive con una alerta declarada de Senapred
  en el mismo bloque (línea 88), y la regla del prompt manda `[emergencia]`
  cuando hay alerta declarada. No bloqueó (la revisión lo dejó pasar y lo
  anotó para que la sesión de día resuelva el criterio) y es la primera vez
  que aparece esta combinación exacta (verificado: ningún
  `contenido/revisiones/*.md` anterior menciona "alerta declarada" ni
  "[emergencia]").

## Comparación con ayer

- **Mejoró**: las carátulas de octubre ya no tienen huecos (01 al 06-10
  completas); la del 04-10, que llevaba tres mañanas marcada HOY, se cerró
  el 05-10 por la tarde (`contenido/caratulas/2026-10-04.png`, commit de
  las 16:22-16:23). La retención media de los largos subió un poco después
  de varios días de baja: 25,4% ayer (`bitacora/metricas/2026-10-05.md`) →
  25,6% hoy. Suscriptores +4, vistas totales del canal +1.150.
- **Peor que ayer**: las horas vistas en los largos volvieron a bajar,
  21,4 ayer → 20,4 hoy (-1,0 h, -4,7%; la ventana de Analytics es móvil de
  30 días, así que un día que sale de la ventana pesa tanto como uno que
  entra). El atraso de la cadena fue mucho mayor que ayer: hoy GPT estuvo
  ausente unos 80 minutos en un turno de reparación y el informe, el guion
  y la revisión llegaron entre 110 y 130 minutos después de lo esperado,
  contra ningún plan B el 05-10.
- **Sigue igual**: la idea de la Clave de la semana 39 sigue sin
  aprobación (décima mañana). `prompts/suplente.md` sigue sin la palabra
  "carátula" (verificado de nuevo, cero resultados), aunque hoy no hizo
  falta porque GPT no llegó a tomar el turno completo del suplente.
- **Nuevo hoy**: el bug de `scripts/gate.js` con los archivos
  `-imagenes.md` (hallazgo 1, nunca antes posible porque es la primera vez
  que existe ese archivo compañero) y el falso positivo de
  `validar-tarjetas.js` sobre las líneas de carátula (hallazgo 3).
