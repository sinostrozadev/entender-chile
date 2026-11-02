# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó están `REALIZADOS.md` y el archivo del día.

Última actualización: 12-10-2026, sesión de día (sale la corrección del guion
de la Clave, que GPT corrió y Santiago aprobó; entra el encargo del mural al
pipeline para la noche, el panel 6, las cinco cifras sin fuente al pie y la
medición de retención por duración).

---

## EL MURAL DE LA CLAVE: lo que queda abierto (07-10-2026)

- [ ] **PROPUESTA, necesita el sí de Santiago: borrar las pruebas del mural que
      ya quedaron atrás.** En `public/claves/licencia-medica/` conviven las
      cuatro etapas: `1.jpg` a `4.jpg` (748 KB, imágenes de sección sueltas, el
      formato anterior), `mural.jpg` (813 KB, mural sintético), `panel-1.jpg` y
      `mural-real.jpg` (1,4 MB, la prueba de dos paneles) y `mural6.jpg`
      (2,1 MB, la de seis). Las primeras cuatro cosas son 3 MB que no se usan
      más. Borrarlas obliga a sacar también las composiciones `ClaveMuestra`,
      `ClaveMural` y `ClavePanel` de `src/Root.tsx`, que son las que las
      apuntan. Propongo dejar `mural6.jpg` hasta que Santiago vea el de catorce
      y borrar el resto. Alcance: 7 archivos y unas 30 líneas de `src/Root.tsx`.
      Prueba: render de `ClaveMural14` después de sacarlas.

- [ ] **07-10: arreglar el guion de la Clave con GPT.** Medido sobre esta misma
      Clave: 3 referencias en segunda persona en 2.051 palabras (una cada 684),
      12 de 14 secciones nunca le hablan al que mira, 1 solo ejemplo concreto,
      la sección 12 tiene CERO palabras narradas y el cierre son 261 palabras,
      el doble de la mediana. El veredicto no es que esté vago: está plano e
      impersonal. El prompt ya está escrito y entregado a Santiago; falta que
      GPT lo corra. Evidencia:
      `contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario.md`.
      (12-10: GPT lo corrió y el guion quedó APROBADO en la vuelta 4,
      `contenido/veredictos/clave-licencia-medica-fiscalizacion-y-sumario-guion.md`.
      No lo cerró esta sesión: lo borra quien lo verifique.)

- [ ] **12-10, Santiago: la última revisión del video final de esta Clave
      antes de subirlo.** Rendido con el mural, voz de Azure y cama, en
      `out/clave-final/2026-10-07-licencia-medica/` y copiado a
      `C:\Users\santi\Downloads\entender-chile-clave\` (10:19, guion
      APROBADO vuelta 4). Nada se subió. El camino de la Clave genera una
      sola carátula (`miniatura-clave.png`), no tres: así está en
      `scripts/miniaturas.js`.

- [ ] **12-10, quedó parametrizado y espera decisión (día o Santiago).** Tres
      cosas del mural que no son código sino diseño:
      (1) qué secciones lleva la TENSIÓN: por defecto las cinco anteriores al
      Cierre (9 a 13 en esta Clave, el ejemplo de `scripts/clave-musica.js`),
      se cambia con `CLAVE_TENSION` y no hay regla por tipo de sección escrita;
      (2) las marcas `[ESQUEMA]` y `[TESIS]` no aparecen en el mural (el armador
      las salta desde el 07-10), aunque el validador cuenta la tesis como
      narrada; (3) el sello de tres notas no suena en el mural: la cama ya
      arranca con re, la, re. Evidencia: `scripts/clave-mural.js`
      (`rangoTension`) y `scripts/mural-guion.js` (`leerSecciones`).
- [ ] **12-10, PARA LA NOCHE: conectar el mural al pipeline, con voz, carátula y
      hora nueva.** El encargo completo, con contexto acotado, lista cerrada de
      archivos, criterio de terminado y comandos de verificación, está en
      `bitacora/2026-10-12-encargo-mural-al-pipeline.md`. El día no puede
      hacerlo: no tiene `AZURE_SPEECH_KEY` ni `YT_REFRESH_TOKEN`. Evidencia del
      bloqueo: `scripts/dia.js:174` renderiza la composición `Informe` también
      para la Clave, así que hoy el workflow produciría el formato viejo de
      tarjetas y no el mural que Santiago aprobó el 12-10-2026.

- [ ] **12-10: el panel 6 del mural de licencias está mal hecho.** Volvió de GPT
      como una foto de oficina a plena luz, mucho más clara que los otros trece,
      y sobre ese fondo el velo tiene que apretar a 1,5 (el más alto del mural)
      y termina en un filo vertical visible. Está ESQUIVADO, no arreglado: la
      cámara de la sección 5 se movió de 8670 a 7400 y ahora el panel claro solo
      se cruza durante el viaje. Arreglarlo de verdad es pedirle a GPT que lo
      rehaga con la cuarta regla nueva de `scripts/mural-pedido.js` (la luz es
      la misma en los catorce) y volver a coser el mural, que necesita `sharp`.

- [ ] **12-10: cinco planos muestran una cifra sin fuente al pie.** Las
      secciones 3, 6, 8 y 13 de la Clave de licencias no traen `[FUENTE]` y sus
      cifras salen sin respaldo a la vista, contra las reglas 6 y 32. El
      mecanismo ya existe (`scripts/mural-guion.js` baja la fuente de la sección
      a los planos con cifra) y la marca `[FUENTE]` ya entró al contrato en
      `prompts/guion-claves.md`. Taparlo en ESTA pieza necesita otra vuelta de
      GPT; de la próxima en adelante sale solo.

- [ ] **12-10: las Claves sobre 11:30 retienen mal.** Medido sobre
      `bitacora/metricas/2026-10-06.json`: las seis Claves que duran entre 9:11
      y 11:26 retienen entre 34% y 50%; las tres que pasan de 11:28 retienen
      15%, 0,7% y 15%. La de licencias dura 12:53. Son tres videos y está
      confundido con el tema, así que no es para decidir todavía: es para mirar
      cuando haya dos o tres Claves de mural publicadas. Lo que sí está medido y
      no necesita más muestra: la Clave retiene 39,7% mediana contra 20,6% del
      informe, y convierte mejor (CTR 2,06% contra 1,59%). El problema de la
      Clave no es la pieza, es la exposición: 1.720 impresiones contra 16.893.

---

## PARA LA SESIÓN DE DÍA

- [ ] **01-11: GPT entregó dos carátulas inservibles (31-10 corrupta, 01-11 truncada)**: el .png del 31-10 no tiene firma PNG (bytes al azar, igual que `contenido/caratulas/2026-10-24.png`, que sigue en el repo) y el del 01-11 se cortó en 786.445 bytes sin IEND, como el 28-09. Ninguna de las dos falló por diseño: el texto dentro de la imagen es lo que pide `prompts/caratula-pedido.txt` desde el 05-10 y la del 01-11 medía 1672x941, que es 16:9. Revisar en `prompts/imagen-caratula.md` (paso 3 bis) y en el pedido por qué GPT no comprueba bytes e IEND antes de dar por subida la imagen, y si conviene que el validador mire la carátula (`caratulaUsable` de `scripts/imagen-entera.js`) antes del render. Dueño: día.

## PARA LA SESIÓN DE LA NOCHE: lo que el día NO puede hacer (06-10-2026)

### 0000000. 24-10-2026, URGENTE: el Short exprés de las rebajas de condena salió publicado con errores

**Dueño: Santiago (decide si lo deja o lo baja) y noche (corrige, necesita secrets de YouTube).**
El hallazgo que dejó la sesión de día para pedir una lectura a GPT
(`contenido/urgente/2026-10-24-1105-rebajas-condena-gobiernos-anteriores.md`) lo tomó la guardia,
que procesa todo archivo `contenido/urgente/AAAA-MM-DD-*.md` sin guion; dio la lectura por perdida
a la hora y redactó y subió el Short (`KWY4GglxXOY`, programado a las 12:27 de Chile del 24-10-2026,
guion en `contenido/urgente/GUION-2026-10-24-1105-rebajas-condena-gobiernos-anteriores.md`).
Errores del guion: (1) "no se aplicó hacia atrás" mezcla la pausa de Rabat (que sí se aplica hacia
adelante) con la Ley 21.421, cuya aplicación a condenas anteriores es justo la disputa jurídica;
(2) "sin pasar por tribunales / ninguna vino obligada por un tribunal" se dice como hecho del
canal y viene de fuentes citadas por Interferencia, mientras Rabat dice que recogió la doctrina de
la Corte Suprema; (3) "salieron casi libres" no es lo que pasó (rebajas de condena, no libertad) y
Rabat dice que la mayoría ya habría salido; (4) omite lo más nuevo, que el 23-10-2026 Rabat
suspendió nuevas rebajas; (5) las Fuentes públicas dicen "recogido en el hallazgo de la sesión de
día", lenguaje interno. Cómo evitarlo: un pedido manual NO se deja como `contenido/urgente/FECHA-*.md`
si no se quiere que la guardia lo tome; ponerlo en otra carpeta o con un `pausa` explícito.
Acción: bajar el video a privado (`node scripts/youtube-privacidad.js --id KWY4GglxXOY --privacidad private`
o Studio) si Santiago lo decide, y rehacer el guion con la lectura de GPT si llega.

### 000000. 23-10-2026: cambiar título y carátula del informe del 23-10 ya publicado

**Dueño: noche (necesita los secrets de YouTube).** La carátula publicada ("¿Quién las autorizó?
/ La firma decisiva") no dice qué se autorizó. Santiago eligió el gancho nuevo: **"El ministro
firmó / 56 rebajas a condenados por abuso y violación de menores"**. Pasos:

0. **Cifra comprobada** el 23-10-2026 desde la sesión de día: los 56 decretos son 27 por abuso
   sexual y 29 por violación de menores (Interferencia: entre el 11-03-2026 y el 13-09-2026, una
   sola solicitud rechazada; también Chilevisión, T13 y Pauta). Ninguna fuente que abrí menciona
   a los internos de Punta Peuco (secuestro y tortura), así que no hay motivo para creer que
   estén dentro de los 56, pero EL PAÍS no abre desde la nube y no se confirmó contra él.
1. **Carátula elegida por Santiago el 23-10-2026: la b**, la que él generó a mano
   (`contenido/caratulas/2026-10-23-v2-b.jpg`), no la de GPT (`2026-10-23-v2.png`, que trae un
   rostro realista, la silueta de un niño y una fachada inventada rotulada MINISTERIO DE
   JUSTICIA; no se usa). Revisada con la skill `caratula`: sin problemas contra la política de
   Miniaturas de YouTube (23-10-2026); su única debilidad es que "por abuso y violación de
   menores" se lee chico a 168 px.
2. **Ya está lista con la etiqueta puesta**: `contenido/caratulas/listas/2026-10-23-informe-v2.png`
   (1280x720, 1,3 MB, entera; "El día en 3 minutos" abajo a la izquierda, sin tapar texto,
   comprobado a la vista). No hay que renderizar nada.
3. Ponerla con `node scripts/youtube-caratula.js --imagen contenido/caratulas/listas/2026-10-23-informe-v2.png --fecha 2026-10-23 --pieza informe`.
4. Cambiar el título del video a **"Rabat firmó 56 rebajas de condena a condenados por abuso y
   violación de menores"** (la frase sale del informe; no usar "violadores" ni "abusadores" a
   secas) y actualizar `Título sugerido:` del guion y la descripción.

La regla de fondo ya quedó en `prompts/guion-informe.md`: el gancho y el título nombran el
objeto de la noticia.

### 00000. Clave de la AFP: antes de la revisión final de Santiago, revisar carátulas y paneles

**Dueño: día.** Santiago aprobó la pauta el 23-10-2026 y su única intervención prevista es
la revisión del video al final (acordado ese día). El flujo de paneles valida por código
(archivo entero, proporción, juntura) y nada juzga si la imagen sirve a su sección: el
panel 6 de licencias estaba mal y lo vio él. Y la carátula que se pone es la primera de
las tres, sin revisión. Por eso, cuando existan los paneles (`contenido/claves/flujo/
afp-multifondos-perdidas-fondo-e/paneles/`) y las tres carátulas, y ANTES de que Santiago
mire el video, la sesión de día: (1) revisa las tres carátulas con la skill `caratula` y
deja su recomendación, y (2) mira cada panel contra su sección del guion y anota los que
no sirven. Evidencia de que hace falta: la carátula de licencias salió mal el 16-10-2026
("se supone que debemos validar eso antes"). Mirar `contenido/estado/clave-*.md` para
saber en qué etapa va. Se borra al cumplirse.

### 000. 23-10-2026: el mural de la Clave ya se pide y se cose solo; falta decidir el tema

**Hecho hoy, con prueba:** (1) el gate y `dia.js` leían el archivo de prompts de
carátulas (`...-imagenes.md`) como si fuera el guion, y por eso la Clave del 21-10
nunca salió; arreglado con `scripts/guion-de-clave.js`. (2) El mural ya no tiene pasos
manuales: `scripts/mural-flujo.js` pide los paneles a GPT en tandas de diez, reabre solo
por lo que falte, los cose y deja `mural.json`; el flujo tiene dos etapas nuevas
(`paneles`, `armar_mural`) y ninguna gasta un turno de Claude. (3) Un render que falla
ahora se reintenta, hasta tres veces, pasadas tres horas; antes la marca impedía
reintentar para siempre. Detalle en `contenido/claves/flujo/README.md`.

**Lo que NO se pudo probar acá y la primera corrida real tiene que mirar:** que GPT
entienda un pedido de diez imágenes con nombres de archivo exactos y las deje en esas
rutas. El pedido se explica solo, pero es la primera vez que se le pide así. Si en la
primera tanda faltan imágenes, el sistema reabre por las que falten; si tras dos
reintentos siguen faltando, deja `paneles/NO-PUDE.md` y la Clave queda en
`bloqueado_humano`.

**Pendiente de decisión de Santiago:** la Clave `acuerdo-internacional-sin-tratado` está
EN PAUSA (`pausa.txt` en su flujo) mientras se evalúa si conviene. Es la única decisión
abierta: borrar `pausa.txt` la reanuda y pide los paneles; elegir otro tema la deja de
reserva. Medido en los informes del 17 al 23-10, el Escudo tiene cero menciones; las AFP
6 de 6 días con 52 menciones, el clima 6 de 6 con 61, las rebajas de condena 3 de 6 con
12 (9 de ellas el 23-10). La mejor Clave que ha hecho el canal fue sobre fondos de
pensiones: 178 vistas y 50,1% de retención.

### 00. EL MODO DE OPERACIÓN DESDE EL 16-10-2026: no gastar en mejoras

Santiago, 16-10-2026: **"me queda poco límite, así que quiero dejar límite para
los informes y no seguir gastando en mejoras de momento."**

Lo que sigue corriendo: informe corto diario con su Short, los exprés cuando la
guardia caza algo, y la Clave de la semana que ya está definida. Nada más.

Lo que NO se hace hasta que Santiago lo pida, aunque esté anotado más abajo en
esta lista y aunque sea barato: el panel 6 del mural, la alarma que no dependa
de Claude, las mejoras de los shorts, las mejoras visuales del informe corto, la
etiqueta de serie en la carátula (el tablero está armado y espera su elección,
https://claude.ai/artifact/NJ2m4cnykMdR8sis3jFpQe), y la música con Gemini.
Todo eso queda en pausa, no cancelado.

**Dónde se va la cuota, medido el 16-10:** las tres piezas de ese día las
escribió el SUPLENTE (Claude), no GPT. La preselección es suya de forma
permanente desde el 06-10, pero el informe y el guion entraron por plan B. Esa
es la diferencia entre un día barato y uno caro: con GPT escribiendo, Claude
solo valida; sin GPT, Claude escribe tres piezas con Opus. Si hay que recortar
algo, eso es lo que hay que mirar primero, no los relojes, que son Haiku y
aprietan un botón.

### 0. HOY, 16-10-2026: rendir de nuevo la Clave de licencias, con voz, y reemplazar la que está en YouTube

**La pieza que está subida no es la que Santiago aprobó.** Se rindió con un
armador que descartaba las `[TESIS]`, así que salió con 91 bloques y CERO
tesis narradas: 180 palabras, el 10% de lo hablado, y la idea central de cada
sección. Está en privado (https://youtu.be/CvRf1NBm_cg), así que no salió al
aire, pero no se puede publicar así.

**Ya está todo en `main`, no hay que arreglar nada:** la tesis narrada, la
fuente al pie donde hay cifra de dato, la regla 42 con `cifraCorta` (los
montos salen "$31.572 millones" y no con once dígitos), la carátula de GPT en
vez de la generada por código, y `REMOTION_BROWSER_EXECUTABLE` en los dos
renders de `dia.js`. El día lo verificó corriendo el armador: **105 bloques,
14 tesis, 10 planos con fuente al pie**, typecheck limpio y `numerales.js` con
sus 65 casos verdes.

Lo único que falta es la voz, y el día no la tiene: no hay `AZURE_SPEECH_KEY`
en la sesión de la nube.

```
node scripts/dia.js contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario.md --clave --voz --render
```

Qué comprobar antes de subir:

1. Que el log diga `Miniatura de la Clave: la carátula de GPT`. Si dice "SIN
   carátula de GPT" algo se rompió, porque el archivo existe en
   `contenido/caratulas/claves/`.
2. Que el video dure claramente más que los 10:20 de la pieza vieja. Con las
   tesis puestas y la voz real, el día estimó alrededor de 11 minutos.
3. **Regenerar la descripción**: `contenido/descripciones/2026-10-07-clave.txt`
   tiene los capítulos de la versión sin tesis y todos se corrieron.
4. Regla 19: el audio completo lo escucha Santiago antes de publicar.

Y una advertencia que no es menor: **la carátula que está puesta Santiago la
dio por mala el 16-10 y ya le pidió a GPT que la rehaga.** Si la nueva llegó,
va esa; si no, la pieza puede esperar. No subir con la vieja dando por hecho
que estaba aprobada.


Santiago, 06-10-2026: "deja todas las indicaciones de lo que no puedes hacer
para la sesión de la noche, anota por ahí para que él las vea, y pide también
los secretos para que tú tengas acceso".

### 1. Apagar el "Informe de la mañana" de las 06:00. ✅ HECHO 12-10 (noche): `trig_01DHmsrrShT2Mnj8WDg4CQ42` con `enabled: false`

Decisión de Santiago del 06-10: **"el informe de la mañana no lo veo, dámelo tú
en la revisión de la mañana. Y quita el otro."** La revisión ya existe como
skill (`.claude/skills/revision/SKILL.md`, creado hoy).

La sesión de día lo intentó y **no puede**: `update_trigger` devuelve "this
routine was created via http_api, not by an agent. Agents can only update
routines they created". La rutina es
`trig_01DHmsrrShT2Mnj8WDg4CQ42` ("Informe de la mañana Entender Chile (06:00)",
cron `0 9 * * *`). `bitacora/rutinas.md` dice que las creadas desde `http_api`
sí se editan desde la sesión local: **la noche la apaga**, o Santiago en
https://claude.ai/code/routines/trig_01DHmsrrShT2Mnj8WDg4CQ42

Al apagarla, `prompts/guardian.md` queda sin rutina que lo lea. No borrarlo: su
sección 2 (la comprobación de si la Edición diaria sigue `in_progress` antes de
declarar que faltan videos) es un método que vale y que la revisión del día
debería heredar.

### 2. Las notificaciones de las rutinas de reloj. ✅ HECHO 12-10 (noche): desde la sesión local la API SÍ acepta `notifications`; quedaron en `{email: false, push: false}` las siete de la lista (relojes A, B, C, barrido, métricas, observatorio, validador). Vigía y guardia sin tocar. Duda: verificar mañana que el AVISADOR del validador (PushNotification) siga llegando, porque ahora la rutina tiene las notificaciones de corrida apagadas

Entre la 01:00 y las 06:00 disparan **~46 sesiones de rutina**, y 15 de ellas
son los relojes del reintento, que solo responden "OK 02:10" tras apretar un
botón. Santiago recibe ese ruido y no lo lee.

**El día no lo puede arreglar**: la herramienta `update_trigger` acepta nombre,
horario, modelo, prompt y encendido, pero **no acepta el campo `notifications`**.
Solo `create_trigger` lo acepta, al crear. Comprobado hoy contra el esquema de
la herramienta, no supuesto.

Las dos salidas, las dos de la noche o de Santiago:
- Apagar las notificaciones en la interfaz, una por una (no pierde historial).
- Borrarlas y recrearlas con `notifications: {}` (pierde el historial de
  corridas de cada una; no recomendado).

Qué apagar: relojes del reintento A (`trig_016JsVfFwrJFut5vy2f4c8TS`), B
(`trig_01E8tyJPqyfNdVTog477sf6Z`) y C (`trig_01RevKvPn6mufpcUCK9fii2X`), reloj
del barrido (`trig_01W5KEjHbr5wWPsmmJ4ygNEh`), reloj de métricas
(`trig_01MxzGdh2P489TmgkUi9spWd`), observatorio
(`trig_01MzKjYwnyH8PfJfCBrtJvv4`) y el validador/suplente
(`trig_01B8tLFaXe7h1YBCciFE2iKf`, 17 disparos el 06-10).
Qué DEJAR: el vigía (`trig_01LUtn4fSJjBsCzqdoWeVviH`, que solo avisa cuando hay
algo atrasado y nunca un "todo bien") y la guardia
(`trig_01HLSWkJ8VpVFPuxQ51YiG4d`, que ya tiene `push: false`).

### 3. Lo que el día PIDE, y lo que pide NO tener

Santiago autorizó pedir lo que falte. El día pide dos cosas, y las dos son de
acceso, no de secretos:

- **Abrir la red de salida** a `suseso.gob.cl`, `bcn.cl`, `dipres.gob.cl` y
  `support.google.com`. Son las fuentes de las que dependen la Clave y la
  revisión de carátulas, y hoy el proxy las bloquea enteras: por eso la
  política de miniaturas de YouTube tuvo que delegarse a GPT
  (`.github/workflows/doc-youtube.yml`, creado hoy) y por eso una revisión del
  06-10 quedó sin verificar. Es política de red del entorno, no un secreto.
- **Que la noche haga los dos arreglos de arriba**, o que recree esas rutinas
  con `create_trigger` para que queden editables desde el día.

Y lo que el día **NO quiere tener, a propósito**: los tokens de Azure, de
YouTube ni el `AUDIO_TOKEN`. El día no renderiza, no sube y no publica; la regla
19 dice que el clic de publicación es de Santiago y la 23 que los tokens viven
en los secrets de GitHub. Tenerlos a mano agregaría riesgo sin agregar
capacidad. Si algún día el día necesita uno, se pide ESE, con el motivo.

---

## CANAL DE AVISOS BARRIDO→CHATGPT: CONSTRUIDO (04-09, diseño de Santiago)

**PR permanente #2** (rama `automatizacion/barrido-listo` → main, etiqueta
`barrido-listo`, NO se fusiona). Al final del workflow Barrido, cuando el
barrido del día quedó en main, un paso resetea la rama a main + el archivo
`contenido/barrido/ultimo-evento.txt` (fecha_chile, barrido_commit,
estado=listo, completado_utc) y pushea: ese commit nuevo en el PR es el
evento que despierta la tarea de ChatGPT. UNA emisión por día (dedup por
fecha_chile); si el paso falla, la corrida siguiente lo repara solo. El
primer evento real sale con el barrido de esta madrugada (~01:35).
**Lado de Santiago: HECHO (04-09 ~00:50):** la tarea de ChatGPT ya escucha
el PR. **PRUEBA ESTA NOCHE**: evento ~01:35 → GPT debería dejar la
preselección temprano. Si sale bien, se migra toda la cadena a esta forma.
**✅ PRUEBA SUPERADA (01:03):** evento emitido 05:01:16Z → GPT pusheó
`edición 2026-09-04: preselección` a las 05:03:23Z (2 min 7 s), citando el
commit exacto del barrido, con el pendiente EOF bien tratado y commit según
contrato. **✅ EJECUTADO (noche del 05-09):** cambio de hora COMPLETO (7 rutinas por
API + 5 crons de GitHub, todos −1 h UTC; horas de Chile intactas tras pasar
a UTC-3) y MIGRACIÓN de los 2 guiones a Claude: rutinas
`trig_01HUjC4MjKGmmpDMApn8gtJm` (guionista informe, esperadora 03:35 Chile
+ webhook de GitHub con guardas) y `trig_017nkjJWR5Voud4dYgPhvwF7`
(guionista Clave, esperadora 03:50). Ambas leen AHORA los mismos
prompts/guion-*.md + contrato (los prompts son agnósticos del modelo),
dedup silencioso, escritura verificada, push solo en fallo.
**LIMITACIÓN DESCUBIERTA del webhook (create_webhook_trigger): dispara con
CUALQUIER push del repo: la API no acepta filtro por rutas ni ramas.** Se
neutralizó con guardas de salida-en-segundos (dedup + ventana horaria
03:20-04:25) y la Clave quedó sin webhook (esperadora pura). Además no hay
API para BORRAR un webhook ya creado: si mete ruido, el remedio es
desactivar la rutina o pedir el filtro. **LADO DE SANTIAGO: APAGAR las 2
tareas de GPT de guiones (04:00 y 04:15)**: si corren igual, solo
duplican (pisan el guion de Claude con uno equivalente), no rompen.
El plan original, para referencia: GPT queda solo donde su navegación vale (preselección ya
por evento ✓; migrar informe y claves a escucha de evento); Claude toma los
2 guiones (puras transformaciones del repo, sin web) como rutinas
disparadas por WEBHOOK de GitHub (push del informe → guion informe; push de
la entrega → guion clave; create_webhook_trigger de la API), con prompt
vivo en prompts/. Además, NUEVA CONVENCIÓN para las tareas de GPT: el texto
en ChatGPT es solo el arranque de 3 líneas y las indicaciones viven en
prompts/ (las validaciones del evento viven como PASO CERO dentro de
prompts/seleccion.md, un archivo por tarea, corrección de Santiago; su
tarea corta de ChatGPT apunta a seleccion.md como siempre). Límite real
de Claude: no es el número de rutinas, es la cuota compartida (five_hour):
los guiones van en Sonnet, por evento (sin relojes) y fuera de la ventana
crítica 01:30-01:45.
**CADENA POR EVENTOS COMPLETA (noche del 05-09):** tres PR permanentes:
#2 barrido-listo → preselección GPT (probado ✓), #3 preseleccion-lista →
informe GPT (primer evento ~01:40 del 06-09), #4 informe-listo → Clave GPT.
PASO CERO en seleccion.md, informe.md y claves.md; workflows emisores
senal-preseleccion.yml y senal-informe.yml (dedup diaria + auto-reparación;
emite Actions porque el reseteo limpio exige force-push). Los guionistas
Claude cierran la cadena (webhook + relojes 03:35/03:50). Santiago
configura los disparadores de informe y Clave en ChatGPT con textos cortos
que apuntan a los prompts; las tareas fijas quedan de respaldo con la
guarda "si ya existe la pieza de hoy, no la rehagas" hasta que la prueba
esté verde. CARÁTULAS: cambio masivo aplicado (14/14) con OK de Santiago
sobre el tablero; criterio amarrado en prompts + generador + validador.
**Red de seguridad creada y luego DESACTIVADA a pedido de Santiago** (la
prueba funcionó): rutina
`trig_01CVyy1m21cpCGHk9sKfVY9r` a las **02:30 Chile** (`30 6 * * *`; entra
en la lista del cambio de hora del 6-09): si no hay
`contenido/preseleccion/FECHA.md` en main, la hace Claude leyendo AHORA
`prompts/seleccion.md` + contrato (prompt vivo:
`prompts/respaldo-preseleccion.md`); si tampoco hay barrido, lo despierta y
espera; sin material NO inventa: avisa. Notifica SOLO si intervino o no
pudo; silencio cuando GPT cumplió.

## AGENDA PENDIENTE (Santiago, la noche del 14): revisión completa y el Taller

- [ ] **Revisión completa del proyecto**: recorrer todo el repo y dejar SOLO
      lo que hoy se usa; borrar (o mover a `archivo/`) lo que ya no sirve.
      Candidatos evidentes tras la v3: `prompts/guionista.md` y
      `prompts/revision-editorial.md` (sin rutina que los lea), los prompts y
      workflow de la prueba de flujo (`prueba-flujo.md`, `prueba-validador.md`,
      `prueba-flujo.yml`, `contenido/pruebas/`), las rutinas apagadas, los
      workflows `senal-*`, documentos que describan la cadena anterior
      (cronograma viejo, propuestas ya ejecutadas), y las secciones de esta
      lista que ya no aplican.
- [ ] **Preparar el Taller**: fase 1 publicada el 20-09 (https://claude.ai/artifact/2WH2fioUJK7tQHrKbXtBfw); ver TALLER 3.
- [ ] **TALLER NUEVO (28-09, pedido de Santiago: el anterior no se entendía).**
      Se arma pantalla por pantalla. Publicado en
      https://claude.ai/artifact/1R4oBLvc2YsVZPKbCYsbB8, fuente en
      `taller/taller.html`, datos en la base del artefacto. Listas las dos
      primeras: Trabajos (nueve piezas) y Secciones (doce), las dos con
      agregar, editar y eliminar. **Dueño: el día.** Falta:
      (a) que el código LEA de ahí en vez de sus listas propias, que es el
      punto de todo: hoy una sección se configura en tres archivos a la vez
      (`scripts/imagenes-secciones.js:5` las claves y el slug, `src/tema.ts:60`
      el color, `src/pictogramas.tsx:22` el dibujo) y ninguno obliga a los
      otros a estar al día;
      (b) las pantallas que Santiago pida después, de a una.
- [ ] **EL ARMAZÓN NO ES UNA LISTA, ES UN REGEX CON AGUJEROS (28-09).**
      `scripts/parse.js:31` decide con un regex escrito a mano cuáles bloques
      son estructura (Apertura, Cierre, Agenda, En titulares, La noticia del
      día, ¿En qué quedó?) y por lo tanto no se anuncian con voz ni llevan
      color de tema. Está anclado, que es correcto, pero deja fuera variantes
      que los guiones YA escribieron: `Agenda de hoy` (4 guiones de agosto) y
      toda la familia `En qué quedó...` con el caso pegado atrás (4 más). Un
      bloque del armazón leído como tema sale con color de sección y, desde el
      28-09 con `ENTRADA_VOZ`, **el locutor lo anuncia en voz alta**. No ha
      salido al aire porque esos guiones son anteriores a la voz de entrada,
      pero nada lo impide la próxima vez que GPT escriba una de esas variantes.
      Los seis y sus alias ya están en el taller.
      **Decide Santiago:** si `parse.js` pasa a leer la lista del taller (que
      es el paso pendiente de todo lo demás) o si por ahora se tapa el agujero
      ampliando el regex. **Dueño: el día.**
      **Y no son dos archivos, son cuatro** (28-09, inventario en
      `taller/PARAMETROS.md`): `parse.js:31` decide qué no se anuncia con voz,
      `short.js:66` qué no entra al Short, `guion-corto.js:39-41` qué va en la
      muestra corta, y ninguno habla con los otros. El de `short.js` **no está
      anclado y ya falla**: descarta el titular de noticia "Cierre de Orionx"
      porque contiene la palabra cierre.
- [ ] **LA BIBLIOTECA DE IMÁGENES POR PALABRA (28-09, idea de Santiago).**
      Medida antes de opinar sobre los 36 guiones, 408 bloques: solo el **2%**
      tiene dos palabras dibujables, así que componer pares estaría apagado casi
      siempre ("volcán" aparece 1 vez y "nieve" ninguna). La medición, la
      contrapropuesta (una imagen por bloque indexada por CONCEPTO, que con 40
      palabras toca el 75% de los bloques) y la objeción editorial están en
      `ideas/biblioteca-de-imagenes.md`. **Decide Santiago** entre tres
      caminos: (a) el barato primero, tres variantes por sección, 36 imágenes,
      sin máquina nueva y sin cruzar la regla 29; (b) la biblioteca de
      conceptos, 80 imágenes; (c) no hacerla. **Dueño: el día.**
      **CORREGIDO el mismo día**: Santiago apuntó que el uso no es el fondo de
      sección sino **poner imágenes donde hoy va texto mientras habla el
      locutor**, y ahí los números son otros y favorables. El 34% del video (4,3
      min de 12,8) es el espectador leyendo lo que está oyendo, y con 40
      conceptos se cubre el 77% de los 879 párrafos narrados. La objeción
      editorial se cae (ilustrar un concepto no es documentar un hecho) y
      aparece otra: **el 35% de los párrafos lleva una cifra** y la firma del
      canal exige toda cifra visible con su fuente, así que la imagen reemplaza
      la prosa y nunca el dato.
      **APROBADA y empezada el 28-09.** Los 20 conceptos con sus 40 prompts
      están en `contenido/biblioteca/PROMPTS-CONCEPTOS.md` (20 cubren el 89%,
      no 40). La prueba de composición (`src/prueba-parrafo.tsx`) dejó dos
      cosas: el párrafo CON cifra se puede hacer **hoy y sin imágenes nuevas**,
      y el párrafo sin texto queda vacío con las imágenes de sección, así que
      las de biblioteca van con el motivo centrado ocupando el cuadro. Falta:
      (a) que Santiago genere las 40; (b) la pantalla Biblioteca en el taller;
      (c) cómo elige el video qué imagen va en cada párrafo.
      **AL DÍA 30-09**: (a) van 14 conceptos con imagen, 58% de los párrafos
      cubiertos; (b) hecha, y además la pantalla de tarjetas
      (https://claude.ai/artifact/KWxSLBrQUfE5yjAb2uTGfR). (c) sigue abierta y
      ahora tiene nombre: es la RANURA. Se separaron los tres niveles (evento,
      tarjeta, fondo) y quedó a la vista que `src/tarjetas.tsx:942` es un switch
      de una sola salida. La única ranura con más de una tarjeta es narración:
      párrafo, dibujo y texto, dibujo solo. Tres candidatas y nada que elija.
      Santiago dijo el 30-09 que la elección debe ser **por párrafo**.

- [ ] **UN PÁRRAFO CON DOS TEMAS (01-10, anotado por Santiago).** La tarjeta de
      un párrafo dura todo el párrafo. Si el párrafo es largo y trae otra idea a
      la mitad, la pantalla se queda mostrando lo mismo mientras la voz ya pasó a
      otra cosa. Santiago lo dejó anotado para cuando lleguemos a un párrafo así:
      no resolverlo antes de verlo. Las salidas posibles: partir el párrafo en
      el guion, que la tarjeta cambie a mitad, o que el [DATO] se ancle a media
      frase. **Dueño: el día, cuando aparezca el caso.**

- [ ] **EL SKILL DEL MÉTODO PÁRRAFO A PÁRRAFO (01-10, pedido de Santiago).**
      Destilar en un skill todo lo que se usó para cerrar el primer párrafo:
      cómo se abre, cómo se itera con muestras rendidas, qué se propone, dónde
      se guardan las ideas mientras el párrafo está abierto (parche en el
      scratchpad, repositorio intacto), y qué se toca al cerrar (código, datos,
      prompts, artefactos, bitácora, decisiones). **Dueño: el día.**

- [ ] **ELEGIR LA TRANSICIÓN POR CORTE (01-10).** Hoy no se puede: el video las
      decide con dos banderas del timeline (`meta.mosaico` y `meta.cortinas`),
      una para TODA la edición, así que no hay manera de pedir una distinta
      entre dos secciones. Las tres que existen ya están como datos en
      `contenido/config/transiciones.json` y se ven con su clip en El video /
      Transiciones. Falta: (a) que el timeline lleve el id de la transición por
      corte y no dos banderas globales; (b) que `src/Informe.tsx` elija por ese
      id; (c) que el campo del formato en el taller mande de verdad, que hoy
      anota y no manda. **Dueño: el día.**

- [ ] **DOS GRÁFICOS QUE EL GUION NO PIDE NUNCA (01-10).** Medido sobre las
      últimas 20 ediciones: `tabla` y `marcador` salen **cero** veces. El video
      sabe pintarlos (están en `src/tarjetas.tsx` y se ven en El video /
      Tarjetas, rendidos con datos de muestra) y `prompts/guion-informe.md` los
      tiene en su árbol. O el árbol nunca llega a esas filas, o las noticias que
      los justificarían no aparecen. Hay que mirar el árbol antes de opinar.
      **Dueño: el día.**

- [ ] **ENCENDER LA REGLA DE DIBUJOS (30-09).** Está escrita, medida y probada
      (`scripts/dibujo-parrafo.js`), pero APAGADA: falta que Santiago mire el
      tablero de seis cuadros en la pantalla de tarjetas
      (https://claude.ai/artifact/KWxSLBrQUfE5yjAb2uTGfR) y diga si van. Para
      encenderla hay que: (a) su visto bueno; (b) agregar `DIBUJOS_PARRAFO=1` al
      workflow de la edición; (c) confirmar que `public/biblioteca/` se llena en
      la nube, porque está en el .gitignore y hasta hoy nadie la copiaba en CI
      (lo hace `dibujos.copiar()` desde `build-timeline`, pero eso todavía no
      corrió una noche de verdad). **Dueño: la noche para (b) y (c).**
      Lo que queda abierto aparte: si `dibujo solo` (sin texto en pantalla)
      entra o no. Se dejó fuera a propósito hasta ver una edición con dibujos:
      quitar el texto toca justo el 34% del video que es el espectador leyendo
      lo que oye.

- [ ] **EL ARCHIVO DE PROMPTS DE SECCIÓN MIENTE (28-09).**
      `contenido/secciones/PROMPTS-PARA-PEGAR.md` describe en su bloque fijo
      versión 3 un fondo de color apagado con el motivo en blanco hueso, y las
      imágenes que están al aire son papel casi blanco con el dibujo oscuro
      (medido: #F1F0F1, #EAEBE8, #ECEDE9). Quien pegue ese prompt genera algo
      que no calza. Arreglarlo es media hora. **Dueño: el día.**
- [ ] **QUÉ MÁS DEBE SER CONFIGURABLE (28-09).** Inventario completo con
      archivo y línea en `taller/PARAMETROS.md`, ordenado por las dos
      pantallas del taller. Las tres primeras, en orden: (1) que los cuatro
      archivos lean el tipo de sección del taller, que es lo único que ya
      falla en producción; (2) la pantalla de Trabajos con los tiempos,
      empezando por las pausas de voz, que es el caso probado; (3) las horas
      de publicación, que ya son configurables pero viven en las variables de
      GitHub, donde Santiago no entra. **Decide Santiago** cuál se hace y en
      qué orden. **Dueño: el día.**
## LO QUE APARECIÓ AL UNIFICAR LOS PENDIENTES (13-09)

- [ ] **Revisar qué MÁS depende de un push del bot.** El 14-09 se descubrió que
      `estado.yml` no se enteraba del barrido porque los pushes con
      GITHUB_TOKEN no disparan workflows. Se arregló con `workflow_run`, pero
      la misma trampa puede estar en otros lados: `web.yml` escucha rutas de
      contenido y hay piezas que commitea el bot (descripciones, podcast,
      métricas). Listar qué workflow escucha a qué, y cuál de esos disparos
      viene de un push de bot. Una noche.

- [ ] **`contenido/casos/por-verificar.md` lleva 64 líneas y nadie lo vacía.**
      Crece unas 5 por día desde el 27-08 y las más viejas, de hace diecisiete
      días, siguen ahí (JUNAEB-SOSER, Democracia Viva). Su README dice "la
      rutina de la mañana lo revisa": o la rutina no lo está revisando o lo
      revisa y no puede cerrar nada, y en los dos casos la lista dejó de ser
      una lista. Decidir cuál de las dos es, y si el que verifica debe ser la
      sesión local (la nube no abre varios medios chilenos por el proxy).
      Dueño: sesión de día para el diagnóstico, noche para el arreglo.
- [ ] **`estrategia/hoja-de-ruta.md` tiene 23 casillas sin marcar** y varias ya
      están hechas hace semanas (identidad de cuentas, escaparate del canal).
      Revisarla entera una vez, marcar lo hecho, y bajar a esta lista lo que
      siga vivo y sea accionable. Después la hoja de ruta se queda como mapa
      del proyecto, no como lista de tareas (regla 41). Dueño: sesión de día.

## MÁQUINA DE ESTADOS: CADENA LINEAL v3 EN PRODUCCIÓN (desde el 15-09; tres piezas desde el 17-09)

- [ ] **Separar los flujos** (Santiago, 14-09): un estado y una tabla por
      flujo. El primero es el de la Clave (CLAVE 4 c-d-e), que necesita el
      Taller para las dos aprobaciones; después el exprés.
- [ ] **Vigilar la madrugada del 17-09**, la primera con tres piezas y con el
      banco como etapa: que la cadena cierre en `guion_informe_listo` →
      `validar_final` → `aprobada` → `alimentar_banco` → `videos_listos`, que
      `contenido/claves/banco-temas.md` tenga commit del día, y cuánto tarda el
      render con 24 fps y concurrency 100%.

## EL DISEÑO COMPLETO (08-09): un solo disparador y máquina de estados

- [ ] **Conversar y decidir la propuesta de Santiago (08-09 07:45):** un solo
      PR disparador para GPT, un estado explícito del día, GPT y Claude que
      despiertan con cada disparador y hacen lo que el estado indica, en bucle
      hasta el estado final; corrección de errores dentro del bucle; cada
      prompt claro y en orden. Borrador con tabla de estados, dónde vive el
      estado (A/B), despachador único, corrección con tope de vueltas,
      migración en 5 pasos y 7 preguntas:
      `bitacora/2026-09-08-propuesta-maquina-de-estados.md`. No se toca nada
      hasta conversarlo.

## RETENCIÓN de los largos: la serie estaba mala, ahora está medida (13-09)

- [ ] **MEDIDO el 13-09, y la serie que teníamos estaba MALA.** La subida de
      los últimos cuatro días (43,4% el 10 y el 11, 49,4% el 12, 53,7% el 13)
      era el bug de `metricas.js`: la medición se truncó en 50 videos justo el
      **10-09** (el canal declaraba 52) y los informes viejos, que son los de
      retención baja, fueron cayéndose del cálculo. Con la lista completa (68
      videos, corrida de esta noche) la retención ponderada real de hoy es
      **32,5%**, o sea plana contra el 35,5% del 06-09 y el 33,2% del 09-09.
      Ni se derrumbó ni se dio vuelta: lleva una semana en un tercio.
      Lo que sí sube de verdad son las horas de largos: 13,1 (06-09) a **18,1**
      (13-09), medidas por Analytics, que no dependía del truncamiento.
      **La hipótesis (a), largos demasiado largos, queda descartada con datos**
      (snapshot completo del 13-09): el de 14,2 minutos retiene 43,8% y el de
      10,9 minutos retiene 16,2%. Lo que predice la retención NO es la duración
      sino **de dónde viene el tráfico**: los cuatro largos más vistos del canal
      (221, 152, 47 y 41 vistas) retienen 29,3%, 16,2%, 29,9% y 19,4%, mientras
      los que solo ven los suscriptores (9 a 15 vistas) retienen entre 43% y
      68%. La gente que YouTube manda de afuera se va temprano: eso es apertura
      y promesa del título, no minutos de más. Queda abierta la hipótesis (b),
      y desde mañana la serie ya es comparable día a día.
- [ ] **MEDIDO el 20-09: la hipótesis (b) es cierta, y ya se mide todos los
      días.** `scripts/metricas.js` pide ahora a Analytics las fuentes de
      tráfico (canal y por largo) y la CURVA de retención por video (solo
      existe con ~20 vistas o más en la ventana; con menos YouTube devuelve
      vacío). Lo que dicen las curvas: de 100 que entran a un largo, ~50 se
      van antes del segundo 40 y después la curva es casi plana. Los que
      llegan por SUGERIDOS rebotan (el largo del 04-09, 153 vistas, queda 34%
      al 5% y 7% al final); los que llegan por BÚSQUEDA se quedan (fondos
      generacionales, búsqueda 49%: 67% al 5% y 40% al final). Los minutos de
      largos vienen de la página del canal (538), sugeridos (309), búsqueda
      (196) y listas (196); los suscriptores aportan 141. Y los largos de la
      cadena v3 (17 al 20-09) tienen 12, 9, 2 y 0 vistas: no hay retención
      que medir porque nadie entra. **Conclusión: primero la puerta (carátula
      y título, CARÁTULA 2), después los primeros 40 segundos (IMAGEN 4, la
      apertura), y recién ahí la duración.** Sección nueva en
      `bitacora/metricas/FECHA.md`: "De dónde vienen los minutos" y "Dónde se
      va la gente"; la auditoría puede leerla desde mañana.

## URGENTE, con plazo

- [ ] **Suscripción de Claude vencida = todas las rutinas caen (04-09).**
      Desde las 16:06 del 04-09 la guardia falló en cada corrida (cuatro
      seguidas) y no hubo vigilancia de urgentes hasta las 08:00 del 05-09.
      El síntoma exacto, en la sesión de la rutina: "Your organization has
      disabled Claude subscription access for Claude Code · Use an Anthropic
      API key instead, or ask your admin to enable access". NO es cuota
      (five_hour) ni un cambio de la organización: es el plan vencido, y se
      arregla renovando (Santiago lo renovó la noche del 04-09). Para el
      guardián y la auditoría: si aparece ese texto, la causa es esa y la
      única acción útil es avisar a Santiago; no buscar otra falla. Queda
      por decidir si el guardián revisa el estado del plan antes de la
      madrugada (una corrida de prueba a las 23:00) para que el barrido de
      la 01:30 no sea el primero en enterarse.

- [x] ~~Responder a Google la revisión de la API~~ **DECIDIDO NO ENVIAR
      (07-09).** Santiago frenó el envío y tenía razón en las tres objeciones.
      Verificado contra la doc oficial: la restricción de "privado" aplica al
      MOMENTO DE LA SUBIDA, no impide publicar (prueba: 33 videos subidos por
      la API, 29 públicos). Lo único que destrabaría la auditoría es que el
      script programe solo, y programar ya se puede desde Studio. A cambio, el
      correo era un dossier que enfatiza la automatización justo cuando la
      política de contenido inauténtico desmonetiza canales de plantilla.
      Razonamiento completo: `docs/auditoria-api/DECISION-07-09.md`. El plazo
      se deja expirar; nada cambia en la operación.

## EL AGENTE DE GUARDIA: LUZ VERDE (02-09 noche, con la condición resuelta)

Santiago aprobó la corrida cada 2-3 horas con una condición: que el hecho de
que GPT navega y Claude no, no complique. **Resuelto por arquitectura**: quien
entra a las páginas es un SCRIPT en GitHub Actions (como el barrido de cada
madrugada), no el modelo; la rutina de Claude es el reloj y el redactor
trabaja SOLO con el material que el script ya trajo al repo.

**ESTADO (madrugada del 03-09): FASE 1 EN MARCHA Y PROBADA.** Existen
`scripts/guardia.js` (probado en vivo: ruta negativa a las 00:05 y positiva
con ventana de 24 h, que cazó la muerte en el Metro con ALARMA+3 portadas),
`guardia.yml` (corrida verde en Actions: el runner SÍ alcanza los medios) y
la rutina `trig_01HLSWkJ8VpVFPuxQ51YiG4d` cada 2 h (prueba completa del
circuito: despertador → workflow → "sin novedades" sin notificar; endurecida
con sync inicial y bucle de espera literal). Primera guardia real: 03-09
08:04 (cayó por cupo; la de las 10:09 cazó la EOF).
**FASE 2 CONSTRUIDA (noche del 03-09):** piel VINO en Short.tsx,
`scripts/short-urgente.js` (pipeline completo, probado en local con el caso
real de la tasa: render verificado cuadro a cuadro), modo `--urgente` del
subidor con marca de deduplicación `SUBIDO-<slug>.txt` (un hallazgo = un
Short), workflow `short-expres.yml` (voz + render + subida privada), y la
rutina de guardia en **v3**: ahora REDACTA el guion (Sonnet, reglas duras:
~55 palabras, cifras solo de fuente primaria, atribución a prensa cuando
corresponde), espera el id y avisa al teléfono con el link del video listo.
Primera corrida real end-to-end disparada esta noche con la tasa. El diseño
original, para referencia:
1. `scripts/guardia.js`: barrido liviano (portadas RSS de 6-8 medios +
   fuentes primarias BC/INE/Senapred/Fiscalía + lo anunciado en PENDIENTE DE
   CIERRE y Agenda). Criterio "muy importante" MECÁNICO, 2 de 4: palabra de
   ALARMA · dato macro publicado hoy · declaración oficial de emergencia ·
   está en 3+ portadas. Lo anunciado se reporta siempre.
2. `guardia.yml`: se dispara con el push del despertador; si el script caza
   algo, escribe `contenido/urgente/FECHA-HHMM-<slug>.md` con el material
   (titulares, cifras, fuentes) y notifica.
3. Rutina Claude despertador **cada 2 h, 08:00-22:00 Chile** (absorbe al
   vigía de las 09:20: ya no se programa en GPT).
4. **Workflow "Short exprés"**: convierte el urgente en guion corto → voz →
   render vertical → sube PRIVADO con miniatura (~10 min) → push al teléfono
   "URGENTE: X, el Short está en Studio". El clic de Santiago sigue siendo
   el gate; con la auditoría de Google aprobada podrá salir programado.
5. Control exprés: cifras solo de fuente primaria u oficial; si solo hay
   prensa, el Short lo atribuye y la notificación lo advierte. Silencio
   total si no hay nada.
6. El guardia también ALIMENTA `datos/series/` (disputa 9): cada dato macro
   que ve publicado lo anota en la serie.

**✅ PROYECTO DE LA NOCHE, HECHO (noche del 03→04-09): la fase 2 está
construida y probada end-to-end con el caso real de la tasa.** Piezas:
`scripts/short-urgente.js` + workflow `short-expres.yml` (guion → voz →
render vertical piel VINO → subida privada, ~5 min de Actions) + modo
`--urgente` del subidor (deja `SUBIDO-<slug>.txt` con el id: un hallazgo =
un Short) + rutina de guardia **v3** (redacta el guion con reglas duras,
espera el id, notifica el link listo; copia en `prompts/guardia-reloj.md`).
La primera corrida real cazó un bug (el vertical se reescalaba a horizontal
antes de subir); corregido y re-subido en la segunda. **Feedback de Santiago (04-09, tras ver el primer Short): "ni siquiera sé de
qué está hablando, no tiene contexto... que sea una noticia wow y que se
entienda, tienes 50 seg".** → **Formato v2 aplicado la misma noche**: plantilla
gancho + contexto + qué significa (90-120 palabras, ~45-50 s), la PRUEBA DEL
ÁNGULO ("¿por qué le importa a una persona común?"; sin ángulo no se fuerza
el Short, se notifica para decisión humana), y la regla de cifras afinada (una
publicación oficial citada por la prensa SÍ habilita la cifra nombrando a la
institución). Rutina v4 cargada; el Short de la tasa se reescribió con las
cifras reales de la EOF (TPM 4,5%, sin cambios a 24 meses, inflación esperada
3,3%) y se re-produjo como ejemplar del formato. **Le queda a Santiago: borrar
en Studio los DOS videos viejos de la prueba: `AZpTnPoPg2I` (deformado) y
`GMSTAx1-62o` (formato corto sin contexto).**
Patrón nuevo (04-09, pedido de Santiago): **el prompt vivo de la guardia ES
`prompts/guardia-reloj.md`**: la rutina solo sincroniza y lee el archivo en
cada corrida; editarlo es cambiar la guardia sin tocar la API. Pendiente:
aplicar el mismo patrón prompt-vivo a las demás rutinas (barrido,
observatorio, revisión, guardián, métricas, auditoría) cuando toque
editarlas.
Cola corta pendiente (quedó de la tarde del 05-09): retención de Analytics
cableada a metricas.js (token listo en secrets/youtube-analytics.token +
falta subirlo como secret de GitHub y el query en el script); capítulos de
YouTube automáticos en la descripción; link directo Short→video largo;
vuelta 3 de carátulas según feedback de los bocetos.
Pendiente fase 2.1 (no esta noche): que guardia.js (Actions, que SÍ alcanza
la web) capture también el cuerpo de la fuente primaria en el archivo del
hallazgo: la rutina redactora no navega, hoy escribe con el material + el
informe. Y alimentar `datos/series/` (disputa 9). Otro cabo: al PUBLICAR un
video nadie escribe `contenido/videos/` (por eso la web estuvo sin embeds
30-08→03-09; esta noche se rellenaron a mano los 10 ids): el reloj de
métricas podría detectar el paso a público y escribir el archivo solo. El caso que motivó todo, para
referencia:

- El guardia corrió a las 00:12, 10:09, 12:08, 14:08 y 16:07 (la de las 08:14
  falló por cupo agotado, junto con barrido 01:32, observatorio 01:45 y
  reloj de métricas 08:45). A las **10:09 cazó la Encuesta de Operadores
  Financieros**, señal ANUNCIADO, cruzada con la marca PENDIENTE DE CIERRE
  que el informe dejó a las 03:30: es el circuito del caso Imacec cerrando
  solo por primera vez. Archivo:
  `contenido/urgente/2026-09-03-1009-tasa-interes-permanecera-nivel.md`.
- Ahí se detuvo, porque no existe quien lo convierta en pieza. Santiago lo
  notó como "no tengo ningún Short en privado": el guardia produce un
  archivo, no un video.
- Lo que el caso enseña para el diseño de la fase 2: (a) la captura es un
  titular de un medio (La Tercera) sin cifra ni fuente primaria, así que el
  Short exprés tiene que ir PRIMERO a la fuente oficial (acá, la EOF en
  bcentral.cl) y solo después escribir; si la primaria no abre, atribuye a
  prensa y la notificación lo advierte (punto 5). (b) Debe leer el
  `PENDIENTE DE CIERRE` del informe para saber qué se esperaba y cerrarlo
  con el valor real. (c) Un solo Short por hallazgo, aunque el guardia lo
  vea en cinco corridas: `.visto.json` ya deduplica el archivo; el
  workflow debe deduplicar el video con la misma firma.
- Por verificar con Santiago: si la notificación de las 10:09 llegó al
  teléfono. La rutina terminó bien y el archivo apareció dentro de su
  ventana de espera, pero el push no se puede comprobar desde el repo.
- Aclaración que salió hoy: el vigía de las 09:20 ya no se programa en GPT
  (punto 3, absorbido por el guardia); por eso no hay archivo del vigía y
  no es una falla.

---

## Dependen de Santiago

- [ ] **16-10, HOY: la alarma vive en el mismo recurso que se puede caer.** El
      14 y el 15-10 el canal no publicó nada porque la cuenta de Claude se
      quedó sin uso (lo dijo Santiago el 16-10; se restauró la noche del
      15). El apagón en sí es ajeno, pero que nadie se enterara en dos días es
      nuestro: la vigía y la guardia también son rutinas de Claude. (Desde el
      01-11, `.github/workflows/guardia.yml` tiene cron de red de GitHub, que
      termina en rojo si el reloj de la guardia perdió una pasada entera; eso
      cubre la guardia, no la edición del día, que sigue sin aviso.) Es la
      tercera vez que una cuota ajena apaga el canal (GPT cinco días a
      principios de octubre, Claude estos dos), así que conviene tratarlo como
      la forma del sistema y no como un incidente.
      **Lo que NO sirve**: un cron de GitHub más denso en `reintento.yml`. La
      sesión de día lo propuso antes de saber la causa y está descartado: sin
      cuota la cadena se detiene igual en `validar_*`, porque el validador y el
      suplente también son Claude. Medido: el 14 y el 15 el cron propio de
      `reintento.yml` sí corrió 2 veces cada día y no sirvió de nada.
      **Propuesta, necesita el sí de Santiago**: un workflow de GitHub Actions
      con cron propio que a una hora fija mire si existe el video del día y, si
      no, abra un issue en el repo. Actions no depende de la cuota de Claude y
      un issue llega al teléfono por las notificaciones de GitHub, sin secrets
      nuevos. Alcance: un archivo de workflow y unas 30 líneas. Detalle y
      números en `bitacora/2026-10-16-auditoria.md`, sección de corrección de
      la sesión de día.


- [ ] **09-10, HOY: el 07-10 y el 08-10 la cadena diaria y la propia
      auditoría de las 05:30 quedaron mudas más de 36 horas porque Claude
      nunca devolvió veredicto, y nadie se enteró hasta hoy.** Auditoría del
      09-10 (`bitacora/2026-10-09-auditoria.md`). Evidencia (con la historia
      completa de git, no el checkout shallow con el que arranca la
      auditoría): `contenido/estado/2026-10-07.md` quedó en
      `validar_guion_informe` / `pendiente` desde las 19:38 del 07-10 (el
      disparo a Claude de la vuelta 1 fue a las 06:00:20 UTC y nunca volvió);
      `contenido/estado/2026-10-08.md` quedó en `barrido_listo` / `pendiente`
      desde las 09:06 del 08-10 (el barrido llegó 7 horas tarde y la
      preselección, turno permanente de Claude desde el 06-10, tampoco
      respondió). Ningún archivo de la cadena de esos dos días existe después
      de esos puntos (ni revisión, ni video, ni podcast, ni descripción), y
      `bitacora/2026-10-07-auditoria.md` y `bitacora/2026-10-08-auditoria.md`
      no existen (comprobado con `git log --all --diff-filter=A` y `git show
      main:`, cero resultados los dos). Mismo síntoma que el 04-09
      ("Suscripción de Claude vencida", más arriba en "URGENTE, con plazo"),
      pero esta vez el guardián que debía avisarlo es el mismo turno que se
      quedó mudo, así que no hubo ningún aviso. Necesita que Santiago revise
      el estado de la cuenta/suscripción de Claude para esas fechas y
      confirme si ya está resuelto; después, la noche debería hacer que estos
      turnos fallen de forma ruidosa (un archivo o aviso explícito al agotar
      los reintentos) en vez de no dejar rastro.
      **12-10: tercera vez, y esta vez la explicación de la suscripción no
      alcanza.** Auditoría del 12-10 (`bitacora/2026-10-12-auditoria.md`).
      `bitacora/2026-10-11-auditoria.md` tampoco existe (comprobado con `git
      log --all --diff-filter=A`, cero resultados), pero esa mañana la
      cadena SÍ terminó completa y Claude SÍ trabajó: `contenido/estado/2026-10-11.md`
      dice `ETAPA: videos_listos` / `VEREDICTO: APROBADA`, y los tres
      veredictos de Claude (`contenido/veredictos/2026-10-11-*.md`) y la
      revisión (`contenido/revisiones/2026-10-11.md`) existen y están
      completos. Es decir: el turno de Claude como validador funcionó
      perfecto ese día, pero el turno de Claude como auditor de las 05:30
      (`trig_01GDbvJ1Wjzy25bnVRCXgygZ`) no dejó ningún rastro, ni archivo de
      auditoría ni `bitacora/2026-10-11.md`. `get_trigger` sobre esa rutina
      solo trae el último disparo (el de hoy); no hay forma desde el repo de
      saber si el disparo del 11-10 ocurrió y la sesión falló en silencio, o
      si el disparo mismo no llegó. Necesita que Santiago revise el
      historial de disparos de esa rutina para el 11-10 (la cuenta de
      Claude, no solo la suscripción, porque ese día el resto de Claude
      funcionó bien); después, la noche debería agregar una señal explícita
      de que la auditoría corrió (aunque sea un commit vacío con hora, antes
      de escribir el archivo completo) para que su propia ausencia se note
      sin depender de que otra auditoría la note días después.
      **16-10: sexta vez, y esta vez con la causa visible y con la cadena de
      producción entera muerta dos días, no solo la auditoría.** Auditoría
      del 16-10 (`bitacora/2026-10-16-auditoria.md`). `bitacora/2026-10-13-auditoria.md`,
      `2026-10-14-auditoria.md` y `2026-10-15-auditoria.md` tampoco existen
      (comprobado listando `bitacora/` con `ls`, cero coincidencias). El
      13-10 la cadena de producción sí había terminado bien ese día (como el
      11-10), pero el 14 y el 15-10 la cadena ENTERA murió otra vez, como el
      07 y el 08-10: `contenido/estado/2026-10-14.md` quedó en
      `ETAPA: barrido_listo` desde las 07:20 del 14-10 con las cinco piezas
      siguientes en "falta" (Preselección +310 min, Informe +280 min, Guion
      +250 min, Revisión +230 min, Videos +125 min, medido a esa hora y sin
      moverse después); `contenido/estado/2026-10-15.md` quedó igual desde
      las 07:04 del 15-10. No existe un solo archivo con fecha 2026-10-14 ni
      2026-10-15 en `contenido/preseleccion/`, `contenido/informes/`,
      `contenido/guiones/informe/`, `contenido/revisiones/` ni
      `contenido/veredictos/` (comprobado listando cada carpeta). El propio
      commit que escribió la preselección de hoy (`f7a10fb`) lo confirma sin
      inferencia: "La cadena quedó detenida tras el 13-10-2026 y el barrido
      del 16-10-2026 trae dos días de material que el canal nunca contó". Se
      perdieron dos días de video que no se recuperan: lo que pasó el 14 y
      el 15 quedó resumido dentro de la edición del 16, pero nunca hubo
      video largo, Short ni exprés propios de esos dos días.
      Causa visible esta vez (con historial completo de git, no el shallow
      con el que arranca la auditoría: hubo que `git fetch --unshallow`):
      los tres relojes del reintento, A (`trig_016JsVfFwrJFut5vy2f4c8TS`), B
      (`trig_01E8tyJPqyfNdVTog477sf6Z`) y C (`trig_01RevKvPn6mufpcUCK9fii2X`),
      que deben tocar `contenido/estado/reintento-despertador.txt` y pushear
      cada 20 minutos entre la 01:00 y las 07:00 de Chile, no dejaron NINGÚN
      commit "reintento: despertador" entre el del 13-10 a las 04:51 y el
      del 16-10 a las 04:10: casi tres días en cero. Sin ellos, el único
      disparador que quedó fue el cron nativo de GitHub
      (`*/20 4-9 * * *` de `reintento.yml`), que el propio workflow ya
      documenta como poco confiable, y que en la práctica corrió solo una o
      dos veces por día el 14 y el 15 en vez de las ~17 que le tocarían; las
      pocas veces que corrió dentro de ventana las gastó en relanzar el
      Barrido (también tarde: "no hay barrido de 2026-10-14 y son las 06 de
      Chile: relanzando el Barrido", run `38540333574`) y la ventana se
      cerró antes de que ninguna corrida llegara a notar que la preselección
      (turno permanente de Claude desde el 06-10, sin plan B que lo cubra)
      estaba colgada. El vigía de las 02:15 y 05:15 (`trig_01LUtn4fSJjBsCzqdoWeVviH`)
      no escribe nada en el repo, así que no se puede verificar desde acá si
      avisó al teléfono esos dos días y nadie actuó, o si no avisó.
      `get_trigger` sobre los tres relojes del reintento solo trae el último
      disparo de cada uno (hoy 16-10, los tres `SUCCEEDED`); no hay forma
      desde el repo de ver el historial del 14 y el 15. Necesita que
      Santiago revise en la interfaz el historial de corridas de esas tres
      rutinas para esas dos fechas.

- [ ] **27-09, HOY: la idea de la Clave de la semana 39
      (acuerdo-internacional-sin-tratado) lleva nueve mañanas sin que
      Santiago la apruebe o pida cambios, y nunca había quedado anotada
      acá.** Auditoría del 05-10 (`bitacora/2026-10-05-auditoria.md`).
      Evidencia: `contenido/estado/clave-acuerdo-internacional-sin-tratado.md`
      dice `ETAPA: idea_lista`, `TURNO: Santiago: aprobar o pedir cambios`,
      `ACTUALIZADO: 2026-09-27 00:31`. El tema se eligió el 26-09 para salir
      el miércoles 30-09 (`bitacora/REALIZADOS.md:21`); hoy son nueve
      mañanas después de esa fecha. Las auditorías del 03-10 y el 04-10 ya
      la mencionaron (como "séptima" y "octava mañana", triage MIRAR) y la
      del 04-10 afirmó que ya estaba anotada acá, pero no lo estaba
      (verificado leyendo completa esta sección): es el mismo error que
      perdió la cifra del 11-09. Además bloquea la semana 40:
      `contenido/claves/semana/2026-W40-candidatos.md` (generado el 04-10)
      descarta su mejor candidato porque el flujo de la semana 39 sigue
      abierto. Se aprueba o se pide cambio con `node scripts/clave.js
      aprobar acuerdo-internacional-sin-tratado` o `clave.js cambiar
      acuerdo-internacional-sin-tratado`; no hay nada que tocar en código.
      **06-10: van diez mañanas marcada**, verificado de nuevo en
      `contenido/estado/clave-acuerdo-internacional-sin-tratado.md` (sigue
      `ETAPA: idea_lista`, `TURNO: Santiago: aprobar o pedir cambios`).

- [ ] **27-09, HOY: la carátula que SÍ se genera se pierde, porque el
      conector de esa ejecución no admite binarios y la ruta queda en un
      scratch que se borra.** Auditoría del 27-09
      (`bitacora/2026-09-27-auditoria.md`). Evidencia:
      `contenido/caratulas/2026-09-27-NO-PUDE.md` dice que la imagen se
      generó bien y quedó en
      `/workspace/scratch/3b1551457c46/generated_images/exec-....png`, una
      ruta que no sobrevive a la sesión. No es el mismo problema del 25 y
      26-09 (`contenido/caratulas/2026-09-25-NO-PUDE.md` y
      `2026-09-26-NO-PUDE.md`: esos días no había generador de imágenes en
      el entorno). Hoy sí generó, y aun así se perdió: es la tercera mañana
      seguida sin carátula nueva y la primera por pérdida de un archivo ya
      hecho, no por falta de herramienta. `contenido/revisiones/2026-09-27.md`
      ya lo marcó "PARA SANTIAGO" y dice que es la segunda cosa del día que
      se detiene por el mismo motivo. Falta decidir por dónde sube el PNG:
      qué conector o tipo de sesión soporta binarios para esta tarea, o si
      conviene un camino de respaldo (por ejemplo, que la sesión que genera
      la imagen la codifique en base64 y la deje como
      `contenido/caratulas/FECHA.png.b64`, texto plano que sí acepta
      cualquier conector, con un paso nuevo en `edicion-diaria.yml` o en
      `scripts/dia.js` que la decodifique antes de armar `miniatura-3.png`).
      Mientras no se decida, cada carátula que sí se genere se sigue
      perdiendo igual.

- [ ] **27-09: nombre de la Clave semanal.** Santiago quiere evaluar un
      renombre; opciones propuestas por la noche: mantener La Clave, En
      contexto, Para entender; decidir antes del primer video del camino nuevo
      (el del miércoles 30-09, si el tema se elige hoy).

- [ ] **27-09 (domingo): elegir el tema de la semana 39.** Los tres
      candidatos están en `contenido/claves/semana/2026-W39-candidatos.md`; se
      elige con `node scripts/clave.js elegir <slug> --candidato n`. Video el
      miércoles 30-09.

- [x] **26-09, HOY: la corrección del informe de hoy lleva 3+ horas
      atascada: GPT no respondió ni una pieza en toda la madrugada, segunda
      noche seguida.** Auditoría del 26-09 (`bitacora/2026-09-26-auditoria.md`).
      Los commits de preselección, informe y guion de hoy dicen literalmente
      en el cuerpo "recuperación a mano de la edición del 26-09-2026, segunda
      noche sin GPT" (una sesión de Claude los escribió sin GPT, igual que la
      madrugada del 25-09). `contenido/veredictos/2026-09-26-informe.md`
      pidió 5 correcciones menores a las 02:25:58 Chile;
      `contenido/estado/2026-09-26.md` sigue en `ETAPA: reparar_informe`,
      `REPARA: GPT (despachador)`, sin ningún cambio desde entonces (verificado
      con `git log --since`: solo hubo un commit de aviso de estado y las
      métricas de rutina). A diferencia de la escritura inicial, esta vez
      ninguna sesión de repuesto entró a aplicar la corrección: el atasco
      sigue en pie a la hora de esta auditoría (05:37 Chile) con la
      publicación (~06:30 Chile) cada vez más cerca. **Acción inmediata**:
      revisar/relanzar la tarea "Despachador Entender Chile" en ChatGPT, o
      aplicar a mano las 5 correcciones de ese veredicto sobre
      `contenido/informes/2026-09-26.md` y arrastrarlas al guion, como ya se
      hizo dos veces esta madrugada. Es la misma clase de falla que la
      entrada "22-09, HOY" más abajo en esta sección (GPT sin responder), que
      sigue sin marcarse como resuelta: van al menos tres ocurrencias
      (22-09, 25-09, 26-09), y las dos últimas fueron mañanas seguidas.
      ✅ 26-09: la sesión de día aplicó las correcciones a mano (09:05 a
      10:11) y el video salió a las 10:44; en la mañana reemplazó los tres
      respaldos por la rutina "Cadena nocturna sin GPT" (01:55), que escribe
      Y repara en bucle. En la noche se sumó el SUPLENTE (prompts/suplente.md,
      commit b278cc1): con contenido/estado/plan-b.txt vigente, estado.yml
      despierta por API a la rutina validadora en los turnos de GPT que nadie
      cubre (reparar_* si la Cadena ya se fue, alimentar_banco, la Clave).
      Ver bitacora/2026-09-26.md.

- [x] **26-09: tercer día seguido sin que `reintento.yml` dispare ni una vez
      dentro de su ventana de cron (04:00-09:59 UTC), y hoy sí importa.**
      Auditoría del 26-09 (`bitacora/2026-09-26-auditoria.md`).
      `mcp__github__actions_list` confirma cero corridas hoy (la última fue
      ayer 25-09 a las 14:37 UTC, fuera de ventana). La etapa activa
      (`reparar_informe`, GPT atascado desde las 02:25 Chile) es exactamente
      el caso para el que existe el workflow. Esta es la misma falla de fondo
      que la entrada "25-09, HOY" en la sección "Para la sesión de la noche"
      ya marcó `HOY` ayer con la misma propuesta (agregar un despertador
      propio como el de `barrido.yml`/`metricas.yml`/`guardia.yml`): sigue
      sin implementarse y hoy lleva ya **tres mañanas seguidas** (24, 25,
      26-09) con cero corridas en ventana.
      ✅ 26-09 noche: reloj propio creado (trig_016JsVfFwrJFut5vy2f4c8TS,
      Haiku, 01:10/02:10/03:10/04:10 Chile) que toca
      contenido/estado/reintento-despertador.txt; reintento.yml tiene `on:
      push` sobre esa ruta (commit b278cc1). Precisión: el cron de GitHub SÍ
      corre, dos veces al día a horas al azar (26-09: 08:56Z y 13:35Z), casi
      siempre fuera de ventana. Verificar el 27-09 que aparezcan commits
      "reintento: despertador HH:MM [reloj]" a esas horas.

- [x] **UN CLIC EN GOOGLE CLOUD: habilitar la YouTube Reporting API.** ✅ 23-09 Es lo
      único que falta para que las impresiones de carátula empiecen a medirse.
      El código quedó listo y probado el 23-09, pero la primera corrida real
      devolvió: "YouTube Reporting API has not been used in project
      456975949202 before or it is disabled". Se habilita acá, con la cuenta
      dueña del proyecto:
      https://console.developers.google.com/apis/api/youtubereporting.googleapis.com/overview?project=456975949202
      (Ese proyecto es el mismo de los secrets YT_ del canal; no hay que crear
      credenciales nuevas ni volver a autorizar nada: el scope
      yt-analytics.readonly que ya tenemos sirve.) Después de habilitarla,
      la corrida siguiente de Métricas crea el trabajo sola. **Ojo con el
      reloj**: la Reporting API solo genera informes desde el día en que se
      crea el trabajo, y el primero tarda hasta 48 horas. Si se habilita hoy,
      el primer dato de carátulas aparece el 25 o 26; si se deja para la
      semana que viene, ese plazo corre desde entonces.
      **PRIMER INTENTO, 23-09: la cuenta no ve el proyecto.** Santiago abrió
      el enlace con sinostrozadev@gmail.com y Google respondió "You need
      additional access to the project: 456975949202", permiso faltante
      `resourcemanager.projects.get`. Eso no es que falte un rol: es que esa
      cuenta no ve el proyecto. **No apretar "Request access"**: ese botón
      redacta un mensaje para un administrador que somos nosotros mismos en
      otra cuenta, y no lo manda solo.
      El proyecto sí es el nuestro: el error salió de usar YT_CLIENT_ID, y
      todo client id empieza con el número del proyecto
      (`456975949202-....apps.googleusercontent.com`). O sea, las credenciales
      del canal se crearon desde OTRA cuenta de Google, casi seguro la del
      canal y no la de desarrollo.
      **Cómo encontrarla**: en el avatar de arriba a la derecha de la consola,
      cambiar de cuenta y abrir https://console.cloud.google.com/apis/credentials
      buscando un cliente OAuth cuyo id parta con 456975949202. La cuenta
      donde aparezca es la dueña, y ahí la Reporting API se habilita con un
      clic. Vale la pena probar primero la cuenta con la que se autorizaron
      los tokens de YouTube (la dueña del canal).
      **Plan B si ninguna cuenta lo ve**: proyecto nuevo con la cuenta del
      canal, habilitar YouTube Data API v3, YouTube Analytics y YouTube
      Reporting, credenciales OAuth nuevas y volver a emitir los cuatro
      secrets (YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN y
      YT_ANALYTICS_REFRESH_TOKEN). Es bastante más trabajo, necesita el
      navegador de la sesión local para el consentimiento, y mientras tanto
      todo lo demás sigue funcionando: los secrets actuales son válidos.
      **HABILITADA Y TRABAJO CREADO (23-09, 16:33 UTC).** Santiago encontró
      la cuenta y habilitó la API; la corrida siguiente de Métricas creó el
      trabajo `channel_reach_basic_a1`, id
      `512e38a3-6714-4fdd-b6bc-0a4a375117b3`, y dejó
      `bitacora/metricas/impresiones.json` e `impresiones-diario.json` vacíos,
      que es exactamente lo que corresponde el primer día. **El reloj de 48
      horas partió hoy.** No hay que hacer nada más: Métricas corre cada
      mañana y baja sola los días que aparezcan. **Mirar el 25-09**: si para
      esa mañana `impresiones.json` sigue con `videos: {}`, el trabajo no está
      generando y hay que revisar el log del paso de impresiones. La primera
      lectura útil de carátulas (impresiones y CTR por video) será la del
      26-09, con dos días acumulados.

- [ ] **23-09, HOY: el video del informe de hoy publica a las 07:30 con dos
      datos mal atribuidos: decidir si se corrige antes de esa hora.**
      Auditoría del 23-09 (`bitacora/2026-09-23-auditoria.md`, puntos 1 y 2).
      El guion ya aprobado y renderizado (`contenido/guiones/informe/2026-09-23.md`)
      tiene: (1) línea 22, la tarjeta `[DATO comparacion | DMC vía BioBioChile,
      22 sep] ... 105 mm ; ... más de 200 mm` deja ambos valores bajo la fuente
      oficial, cuando el informe (`contenido/informes/2026-09-23.md`) atribuye
      los +200 mm a modelos privados (Meteored y ADN Radio); (2) línea 12, la
      Apertura llama "reforma migratoria" a la reforma constitucional de
      detención para expulsiones administrativas (nombrada bien en el resto
      del guion y en el informe). El validador ya lo señaló en
      `contenido/veredictos/2026-09-23-guion_informe.md` y lo dejó pasar como
      no bloqueante. `scripts/youtube-subir.js` sube el informe con
      `--programar 07:30` (`vars.YT_HORA_INFORME`): a las 05:31 de hoy quedan
      cerca de 2 horas antes de que salga de "private". Primera vez que se
      marca: 23-09-2026.

- [ ] **22-09, HOY: la cadena se congeló en el informe, revisar/relanzar la
      tarea "Despachador Entender Chile" de ChatGPT.** `estado.yml` avisó bien
      a las 01:58:50 (commit `35e98cb` en el PR #6, `pieza=informe`,
      `prompt=prompts/informe.md`) que le tocaba el informe a GPT, con la
      preselección ya aprobada. A las 05:38 (3h40 después) no había respuesta:
      ni informe, ni guion, ni revisión, ni banco de temas, ni videos de hoy.
      Es la misma falla de fondo que "GPT 1" (15-09, más abajo en esta
      sección) dejó sin cerrar: nada en el repo distingue "GPT no responde" de
      "GPT no tiene cuota" ni avisa antes de que una persona mire el reloj.
      Primera vez que se marca esta ocurrencia puntual: 22-09-2026 (ver
      `bitacora/2026-09-22-auditoria.md`).
      **Vuelve a pasar el 25 y el 26-09, dos mañanas seguidas**: GPT no
      escribió ninguna pieza ninguna de las dos noches (los commits de
      recuperación a mano de ambos días lo dicen literalmente), y el 26-09
      además dejó atascada la corrección del informe por más de 3 horas sin
      que nadie la tomara (entrada nueva al comienzo de esta sección,
      `bitacora/2026-09-26-auditoria.md`).

- [ ] **PR #5, abierto desde el 11-09: fusionarlo o cerrarlo.** Trae la
      corrección completa de la cifra del 11-09 en los cuatro archivos, escrita
      por la revisión editorial que rechazó esa edición. Decidiste dejar el
      texto como está, pero la corrección está lista y fusionarla es un clic; si
      no se fusiona, conviene cerrarlo para que no se pudra ahí. Ojo con lo
      segundo: mientras siga abierto, hay una rutina en la nube que despierta
      cada 4 horas a mirarlo y se vuelve a agendar sola (26-09: ya no es un
      ID fijo, es una cadena de recordatorios de un solo disparo, dieciocho
      entre el 23 y el 26, sesión persistente
      `session_01GZbDrbTYnw545j1wKZXtt1`; el vivo hoy es
      `trig_01Jw1QAE68ZZ1NQsnshyBgez` para las 19:30Z). Se corta cerrando o
      fusionando el PR.

- [x] **26-09: cuando GPT vuelva (domingo 27), apagar el plan B y decidir
      el flujo de respaldo.** Apagar = borrar `contenido/estado/plan-b.txt`
      y commitear (una línea; el suplente deja de dispararse solo) y apagar
      o dejar como red la rutina "Cadena nocturna sin GPT" de la 01:55
      (`trig_01NscKtv2hPKqkV6ft8X6GKG`, creada por la sesión de día desde
      la web, así que se apaga desde ahí). La decisión de flujo para la
      próxima caída de GPT: (a) Cadena nocturna (una sesión larga que
      escribe las tres piezas y repara en bucle) o (b) suplente en TODOS
      los turnos (agregar `barrido_listo *_lista *_listo` a la línea
      `turnos:` de plan-b.txt: la cadena lineal tal cual, con Claude en la
      silla de GPT y validación entre pieza y pieza). Hoy convive: la
      Cadena escribe y repara; el suplente cubre banco, Clave y las
      reparaciones que la Cadena ya no alcanza. bitacora/2026-09-26.md.
      ✅ 26-09 noche: GPT volvió; plan B automático (regla 20 y 20) en
      reintento.yml; Cadena nocturna apagada; plan-b.txt borrado.


- [x] **Auditoría matinal: RUTINA CREADA (noche 02-09)**, con la disputa 7
      cerrada por Santiago: la rutina de las 09:30
      (`trig_01GDbvJ1Wjzy25bnVRCXgygZ`) escribe `bitacora/FECHA-auditoria.md`
      y la sesión de día la LEE y profundiza, ya no la reescribe. Primera
      corrida: mañana 03-09.

- [x] **Disputa 1 CERRADA (03-09)**: las imágenes generadas entran como
      identificadores de serie y sección, con variación diaria por código y
      la tipografía mandando en los datos (regla 29 nueva de REGLAS-DURAS;
      entrada en decisiones.md). Las 10 de sección ya están commiteadas.

- [ ] **Fondos: elegir intensidad en las láminas de Descargas**
      (`entender-chile-demo-imagen/`): 4 familias x 3 fuerzas por modo
      (cortina y tarjeta). A la fuerza original eran invisibles; se itera
      con Santiago hasta conseguirlo. La apertura en frío ya quedó ACTIVADA
      aparte (debuta el 03-09).

- [ ] **Reservar el handle** @entenderchile en TikTok e Instagram (no
      implica publicar).
- [ ] **Funciones avanzadas de YouTube**: Settings → Channel → Feature
      eligibility → Advanced (cédula o video). Desbloquea enlaces externos,
      pruebas A/B de miniaturas y la postulación a monetización.
- [ ] **Voz de respaldo S0 (~día 17 del mes)**: segundo recurso Speech plan
      S0 en portal.azure.com → secrets `AZURE_SPEECH_KEY2` y
      `AZURE_SPEECH_REGION2`. El código ya cae solo al respaldo.
- [ ] **Facebook**: el Reel diario de la fase 1 (dos semanas midiendo antes
      de automatizar; plan en `ideas/facebook.md`).
- [ ] **Tagline**: sigue en duda "El resumen sin gritos"; alternativas en
      `ideas/tagline-alternativas.md`.
- [ ] **Música de los Shorts**: elegir una pista en la Biblioteca de audio
      de YouTube, si se quiere música (hoy salen sin ella y funcionan).
- [ ] **Noticias que faltaron el 29** según tu ojo: nombrarlas para rastrear
      en qué etapa se perdieron (barrido, olla o informe).
- [ ] **Notificaciones**: permitir que la app de Claude se salte el modo
      silencio en Android, si quieres que las alertas de madrugada
      despierten.

## Para la sesión de la noche (código y prompts)

- [ ] **01-11: el prompt del reloj del barrido debe fallar si el push no entró** (texto propuesto en bitacora/2026-11-01.md)

- [ ] **27-10, HOY: `scripts/metricas.js` pierde videos completos de la
      lista sin avisar, confirmado siete veces en el último mes.**
      Auditoría del 27-10 (`bitacora/2026-10-27-auditoria.md`). Cruzando
      `bitacora/metricas/AAAA-MM-DD.json` de todo octubre, título por
      título, un video que estaba presente un día desaparece entero al día
      siguiente y casi siempre vuelve solo uno a tres días después: pasó
      entre el 01 y 02-10, el 02 y 03-10, el 11 y 12-10, el 12 y 13-10
      (tres días afuera), el 16 y 17-10, el 17 y 18-10, y hoy entre el 26 y
      27-10, con dos videos a la vez por primera vez ("Clave: Cómo leer el
      IPoM del Banco Central #Shorts" y "Concepción en Alerta Roja por el
      aumento del río Andalién"). Verificado que no es un video borrado o
      pasado a privado: `canal.videos` (de `channels.list`, solo cuenta
      públicos) subió de 194 a 195, un solo video más, el que corresponde
      al Short nuevo de la guardia; y `subidos.length` (la lista paginada
      completa de `playlistItems.list`) también creció en uno, de 201 a
      202, sin disparar el AVISO de `scripts/metricas.js:53`. Los dos
      videos siguen existiendo y públicos; lo que falta es que
      `yt.videos.list` (línea 56) haya devuelto sus datos en la tanda de 50
      que les tocaba, y nada compara los id pedidos contra los id que
      realmente llegaron. Esto perdió datos reales (vistas, me gusta e
      impresiones de esos video día que no quedan escritos en ningún
      archivo) y hoy además explica la baja de 45 vistas totales que el
      encabezado de `bitacora/metricas/2026-10-27.md` marca como la
      primera baja de la semana: sin esas dos filas, la suma cae aunque el
      resto del canal haya crecido. Propuesta concreta: en
      `scripts/metricas.js`, dentro del bucle de la línea 55, después de
      `yt.videos.list(...)` (línea 56), comparar el largo de
      `r.data.items` contra el de la tanda pedida
      (`subidos.slice(i, i + 50)`) y, si faltan id, reintentar esa tanda
      una vez antes de seguir; si siguen faltando, imprimir un AVISO con
      los id exactos que faltaron, mismo patrón que la línea 53.

- [ ] **23-10, HOY: el 22-10-2026 se perdió el día completo (ni informe, ni
      video, ni podcast) porque ningún reloj de Claude disparó esa
      madrugada, y nada fuera del sistema de rutinas lo detectó.** Auditoría
      del 23-10 (`bitacora/2026-10-23-auditoria.md`). El barrido recién
      corrió a las 06:03 (contra ~01:31 esperado, +272 min), disparado por
      `workflow_dispatch` de `github-actions[bot]` y no por el reloj de
      Claude de las 01:30; el suplente (Claude, dueño permanente de la
      preselección desde el 06-10) fue despachado a las 06:41 y nunca
      escribió `contenido/preseleccion/2026-10-22.md`; y no existen
      informe, guion, revisión, video ni podcast de esa fecha
      (`contenido/estado/2026-10-22.md` quedó congelado en "FALTA:
      Preselección, Informe, Guion del informe, Revisión, Videos y
      descripciones"). No hay ningún commit `reintento: despertador HH:MM
      [reloj]` ese día, a diferencia de los nueve a quince que sí aparecen
      el 21 y el 23-10, lo que apunta a un apagón de las rutinas de Claude
      (reloj del barrido, los tres relojes del reintento, el reloj de
      métricas y la propia Auditoría matinal, que tampoco escribió
      `bitacora/2026-10-22-auditoria.md`) y no a un problema de código de
      este repo. Propuesta concreta, la única que sí es código: que
      `reintento.yml` (cron nativo de GitHub, no depende de las rutinas de
      Claude) escriba una alerta en el repo y notifique por un canal
      independiente si a las 07:00 UTC `contenido/estado/FECHA.md` todavía
      no llegó a `preseleccion_lista`, para que un apagón total de rutinas
      no vuelva a pasar sin aviso.
      **25-10: segunda mañana, y esta vez más angosta, lo que demuestra que
      la alerta propuesta no basta.** `bitacora/2026-10-24-auditoria.md`
      nunca se escribió (verificado listando `bitacora/`: la lista de
      archivos `*-auditoria.md` salta del 23-10 al 25-10) y no existe
      ningún commit `"auditoría matinal 2026-10-24"` en toda la rama
      principal (`search_commits`). A diferencia del 22-10, el 24-10 la
      cadena de producción corrió completa y a tiempo (video y podcast
      listos a las 03:38 Chile, métricas a las 05:05): lo que se apagó fue
      solo la capa de autovigilancia, auditoría de las 05:30 e informe de
      la mañana de las 06:00, sin dejar ningún commit entre las 05:05 y las
      08:10 Chile de ese día (`list_commits` sobre el repo real, no el clon
      superficial de esta sesión). La alerta propuesta el 23-10 (avisar si
      `contenido/estado/FECHA.md` no llega a `preseleccion_lista`) no habría
      servido aquí, porque ese estado sí llegó, hasta `videos_listos`.
      Propuesta nueva y distinta: en `.github/workflows/reintento.yml`,
      junto al paso de la línea 70, agregar una comprobación propia que a
      las 08:50 UTC (05:50 Chile) revise si `bitacora/<FECHA>-auditoria.md`
      existe para la fecha de hoy en Chile, y si no, escriba
      `contenido/estado/alerta-auditoria-faltante.txt` y lo pushee, para que
      la falta de auditoría quede visible sin depender de que otra
      auditoría la encuentre días después. Auditoría del 25-10
      (`bitacora/2026-10-25-auditoria.md`).

- [ ] **23-10, AGUANTA: "Carátula 3" sale como una segunda pregunta en vez
      de "cifra con referencia", la variante de A/B que decidió Santiago
      (`estrategia/decisiones.md:388`), y nunca se anotó en esta lista a
      pesar de llevar cinco mañanas documentadas.** Auditoría del 23-10
      (`bitacora/2026-10-23-auditoria.md`). Apariciones: 17-10
      (`contenido/revisiones/2026-10-17.md:80`, "segundo giro"), 18-10
      (`bitacora/2026-10-20-auditoria.md:75`, cita la revisión del 18-10),
      19-10 (`contenido/revisiones/2026-10-19.md:81-83`), 20-10 (la propia
      auditoría de ese día ya la cuenta como "cuarta repetición seguida") y
      hoy 23-10 (`contenido/revisiones/2026-10-23.md`, "igual que el 17-10
      y el 19-10-2026"). No bloquea ninguna pieza, pero deja la prueba A/B
      de carátulas de YouTube Studio comparando dos enfoques en vez de tres,
      justo la prueba que `bitacora/PENDIENTES.md` (sección CARÁTULA 4) ya
      marca como "no está andando". Propuesta: decidir en el prompt que
      genera las tres carátulas por qué la tercera variante sigue cayendo en
      pregunta y no en cifra con referencia, y corregirlo ahí.

- [ ] **20-10, HOY: el informe cita rutas internas del repo
      (`contenido/casos/hitos.md`) como fuente para el lector, y ya salió
      así a la web.** Auditoría del 20-10 (`bitacora/2026-10-20-auditoria.md`).
      `contenido/informes/2026-10-20.md` líneas 57, 141, 143 y 145: cada una
      cierra con "(contenido/casos/hitos.md, 20-10-2026)" en vez de la fuente
      pública real que el propio hito ya registra. Es nuevo: no hay mención
      de "hitos.md" en las revisiones del 17, 18 ni 19-10. `prompts/guion-informe.md:316`
      ya tiene la regla correcta ("NUNCA listes archivos internos del
      sistema... cita la fuente PÚBLICA original del hecho") desde que el
      30-08 se coló lo mismo en el guion; `prompts/informe.md:159-160` (la
      sección "¿En qué quedó?") no tiene esa misma regla. Propuesta:
      agregar en `prompts/informe.md:159-160` una línea equivalente a la del
      guion.
      **21-10: segundo día seguido, y subió de cuatro a cinco citas.**
      `contenido/informes/2026-10-21.md` líneas 57, 89, 91, 187 y 189 (más su
      línea en "Fuentes consultadas", línea 236) repiten "(contenido/casos/hitos.md, ...)"
      como fuente para el lector, ya republicado en la web (`web.yml` run
      366, revisión 2026-10-21 empujada a las 05:43 UTC). Verificado en
      `contenido/revisiones/2026-10-21.md`, hallazgo 2: "Es el segundo día
      seguido con este hallazgo". `prompts/informe.md:159-160` sigue sin la
      línea propuesta el 20-10. Auditoría del 21-10
      (`bitacora/2026-10-21-auditoria.md`).
      **23-10: tercera vez (el 22-10 no tuvo edición), y ahora ni el
      validador lo marcó.** `contenido/informes/2026-10-23.md` líneas 37,
      168 y 179 repiten "(contenido/casos/hitos.md, 23-10-2026)", pero a
      diferencia del 20 y el 21-10, `contenido/revisiones/2026-10-23.md` no
      lo menciona: se le escapó también a la validación y salió publicado
      sin que nadie lo señalara en el repo hasta esta auditoría.
      `prompts/informe.md:159-160` sigue idéntico, verificado de nuevo hoy.
      Propuesta nueva, además de la del 20-10: agregar en
      `prompts/validador.md` un punto que revise, en la vuelta 1 del
      informe, que ninguna cita del cuerpo ni de "Fuentes consultadas"
      apunte a una ruta de `contenido/`. Auditoría del 23-10
      (`bitacora/2026-10-23-auditoria.md`).

- [ ] **16-10, AGUANTA: las seis fuentes institucionales sin feed propio
      nunca entran a la preselección desde que pasó al suplente (06-10), y
      ya son tres revisiones seguidas que lo marcan sin que nada cambie.**
      Auditoría del 16-10 (`bitacora/2026-10-16-auditoria.md`). Mismo texto,
      mismo motivo, en `contenido/revisiones/2026-10-12.md:61`,
      `2026-10-13.md:73` y `2026-10-16.md` (hallazgo 9): "las seis fuentes
      institucionales sin feed de `contenido/barrido/fuentes.json` no se
      abrieron, porque el turno de la preselección fue del suplente y el
      suplente no navega". Contraloría, Senado, Dirección Meteorológica,
      Banco Central, Ministerio Público y, según la revisión de hoy, la
      Cámara de Diputados quedan sin cobertura institucional directa todos
      los días desde que `contenido/estado/reparto.txt` hizo permanente el
      cambio. La decisión del 06-10-2026 (`estrategia/decisiones.md:792`)
      que movió la preselección al suplente se apoyó en que "la preselección
      es el único turno que no necesita (...) entrar a las páginas (...) el
      barrido ya está en el repo"; la realidad de tres revisiones seguidas
      es que hay un residuo que antes sí entraba por la navegación de GPT y
      hoy no entra por nadie. No es una decisión de no hacer nada (esa
      decisión no habla de este residuo en particular), así que sigue sin
      dueño. Propuesta concreta: agregar feed propio (RSS o scraping) para
      esas fuentes en `contenido/barrido/fuentes.json`, para que entren al
      barrido sin necesitar navegación, que es exactamente la premisa con la
      que se decidió el cambio del 06-10.

- [ ] **12-10: la Clave debe subir con la carátula elegida de GPT**
      (`contenido/caratulas/claves/FECHA-slug.jpg`), no con la que dibuja
      `scripts/miniaturas.js`. El 12-10 se cambió a mano en YouTube. Además
      `scripts/youtube-caratula.js:88` declara `image/png` también para jpg.
- [ ] **12-10: shorts y exprés con imagen propia** (plan propuesto a Santiago,
      falta su sí): el Short del día usa la portada del informe recortada en
      vertical; cada exprés pide una imagen a GPT con el tema, que sirve de
      fondo y de carátula, con caída al fondo de sección si no llega; texto en
      bloques y sonido de la casa en los dos. Ojo con el tope del generador
      (23-09: seis imágenes en dos horas).
- [ ] **12-10: decisiones abiertas del informe corto** (reporte del agente):
      el podcast se acortó a 3 o 4 minutos porque usa el mismo audio;
      `REGLAS-DURAS.md` todavía dice que todo el informe suena y que la Clave
      es diaria; el prompt nombra "entenderchile punto cl" pero la web vive en
      github.io; el Short repite la portada. bitacora/2026-10-12.md.
- [ ] **12-10: decisiones abiertas del mural** (PENDIENTES del agente, sección
      del mural): qué secciones llevan tensión, TESIS y ESQUEMA fuera del
      mural, el sello de tres notas; confirmar la fuente "Dipres, 05-02-2026"
      que el validador observó.
- [ ] **12-10: el error de imagen de la Clave que Santiago vio** y que dijo
      haber corregido con la sesión de día: no se identificó cuál es. Santiago
      decidió dejarla así; preguntarle el minuto para corregirlo en la próxima.

- [ ] **12-10, AGUANTA: `contenido/casos/hitos.md` registra el mismo hecho
      dos veces bajo dos dossiers distintos, y el guion de hoy lo narró dos
      veces hasta que el validador lo fusionó a mano.** Auditoría del 12-10
      (`bitacora/2026-10-12-auditoria.md`). Líneas 42 y 44 de
      `contenido/casos/hitos.md`, ambas fechadas 2026-10-11: la 42 (dossier
      `fonasa-licencias-falsas.md`) y la 44 (dossier
      `licencias-medicas-funcionarios.md`) cuentan el mismo par de recursos
      de nulidad contra el juicio de Fonasa, con las mismas fechas y la
      misma jueza. El informe de hoy los copió como dos entradas de "¿En qué
      quedó?" y el guion los narró dos veces; el veredicto de la vuelta 1 los
      fusionó, así que no llegó al aire duplicado, pero si los dos hitos
      siguen separados en `hitos.md`, el mismo trabajo de fusión se paga de
      nuevo la próxima vez que alguno de los dos dossiers se actualice.
      Propuesta: fusionar las líneas 42 y 44 en una sola entrada (el dossier
      de fondo es `fonasa-licencias-falsas.md`; si se quiere mantener el
      cruce en `licencias-medicas-funcionarios.md`, dejar ahí una referencia
      corta en vez de repetir el hecho completo).

- [ ] **12-10, AGUANTA: el barrido lleva tres ediciones seguidas (10, 11 y
      12-10) sin ninguna noticia de pensiones chilenas, pese a que la
      consulta ya las incluye.** Auditoría del 12-10
      (`bitacora/2026-10-12-auditoria.md`). `contenido/revisiones/2026-10-12.md`:
      "el barrido de hoy no tiene nada de pensiones chilenas (cero
      coincidencias de 'pensión', 'pensiones', 'cotizacion' y 'jubila'; la
      única entrada de AFP es un proyecto peruano)"; las revisiones del 10 y
      11-10 ya lo habían marcado de pasada, sin bajar nunca a esta lista.
      `contenido/barrido/fuentes.json:65` ya consulta `"Chile (empleo OR
      salario OR pensiones OR AFP OR sindicato)"`, así que la cobertura cero
      tres días seguidos no es falta de intención en la consulta. Propuesta:
      revisar si falta un feed directo de la Superintendencia de Pensiones
      entre las fuentes institucionales sin feed, o si la consulta OR de la
      línea 65 está perdiendo resultados por otra razón (orden de términos,
      límite de resultados de Google News).

- [ ] **10-10, AGUANTA: la ambigüedad de "La noticia del día" (¿el tope de
      25-35 palabras cuenta la [TESIS] narrada o solo el párrafo?) lleva al
      menos cuatro ediciones seguidas marcada en las revisiones y nunca había
      bajado a esta lista.** Auditoría del 10-10
      (`bitacora/2026-10-10-auditoria.md`). `contenido/revisiones/2026-10-09.md`
      ya la llama "tercera edición seguida con la misma observación" y hoy
      `contenido/revisiones/2026-10-10.md` la marca otra vez. Nunca bloqueó un
      veredicto, pero es exactamente el patrón que esta auditoría debe
      detectar: un hallazgo que se repite sin bajar a la lista viva no se
      corrige porque nadie lo ve como tarea. Buscado explícitamente en
      `estrategia/decisiones.md` y `bitacora/REALIZADOS.md`: no hay ninguna
      decisión de NO resolverlo. Propuesta: en `prompts/guion-informe.md` o
      `prompts/informe.md`, fijar explícitamente si el tope de "La noticia
      del día" cuenta o no la [TESIS] narrada.
      **12-10: van al menos seis ediciones marcada (09, 10, 11 y 12-10
      confirmadas por auditoría o revisión, más las dos anteriores que el
      10-10 ya contaba).** `contenido/revisiones/2026-10-11.md` y
      `contenido/revisiones/2026-10-12.md` la vuelven a marcar, ambas como
      "pregunta que vuelve cada día y conviene cerrar". Auditoría del 12-10
      (`bitacora/2026-10-12-auditoria.md`). Sigue sin tocarse
      `prompts/guion-informe.md:94` ("Dos frases, 25 a 35 palabras en total,
      con su [TESIS] o su [DATO] principal como tarjeta").

- [ ] **22-09, HOY: contradicción de prompt en `prompts/guion-informe.md`
      entre el ejemplo de `comparacion` (línea 229, etiquetas de una
      palabra, "fallecidos: 797 ; desaparecidos: 3048") y el piso de 3 a 8
      palabras de la ETIQUETA CON CONTEXTO (línea 237), en su sexta
      aparición sin anotarse.** Auditoría del 05-10
      (`bitacora/2026-10-05-auditoria.md`). Vista en 22-09, 26-09, 02-10,
      03-10 y 04-10 (esta última la clasificó AGUANTA en
      `bitacora/2026-10-04-auditoria.md`, propuesta 3, y por eso nunca bajó
      acá) y hoy de nuevo: las tres tarjetas `comparacion` del guion de hoy
      quedaron con etiquetas de una palabra. Nunca bloqueó un veredicto.
      Arreglo de una línea: en `prompts/guion-informe.md:237` o
      inmediatamente después, decir si el piso de 3 a 8 palabras rige por
      cada lado de una `comparacion` o solo para la etiqueta única de una
      tarjeta `cifra` o `cambio`.

- [ ] **03-10, HOY: la carátula del 03-10-2026 no se generó y tampoco quedó
      declarada ausente.** Auditoría del 03-10
      (`bitacora/2026-10-03-auditoria.md`). El plan B quedó activo desde las
      02:35 (`contenido/estado/plan-b.txt`) y el suplente escribió el guion
      completo del informe, pero `prompts/guion-informe.md:150-174` manda
      generar la imagen de portada o, si falla, dejar
      `contenido/caratulas/FECHA-NO-PUDE.md`: no pasó ninguna de las dos.
      Verificado listando `contenido/caratulas/` (de octubre solo
      `2026-10-01.png` y `2026-10-02.png`) y buscando `*-NO-PUDE.md` (solo
      existen los del 25 y 26-09). El video ya está en `videos_listos` con la
      carátula de respaldo, a la espera de que Santiago lo publique.
      Propuesta de la auditoría: (1) generar ahora
      `contenido/caratulas/2026-10-03.png` con los datos de
      `contenido/guiones/informe/2026-10-03.md:3-6`, o dejar el
      `NO-PUDE.md` si no hay generador; (2) agregar a `prompts/suplente.md`,
      después de la línea 107, una diferencia nueva que lo obligue a
      declarar `NO-PUDE.md` en vez de omitir el paso en silencio.
      **04-10: van dos mañanas marcada.** Auditoría del 04-10
      (`bitacora/2026-10-04-auditoria.md`): ninguna de las dos propuestas se
      aplicó (`prompts/suplente.md` sigue sin la palabra "carátula",
      verificado con búsqueda explícita), el plan B volvió a cubrir el día
      entero y hoy falta TAMBIÉN la carátula del 04-10-2026, no solo la del
      03-10. Quedan dos imágenes por generar o declarar `NO-PUDE.md`.
      **05-10: van tres mañanas marcada.** Auditoría del 05-10
      (`bitacora/2026-10-05-auditoria.md`): la del 03-10-2026 por fin entró,
      en diferido (commit de esta madrugada, verificado listando
      `contenido/caratulas/`: ya existe `2026-10-03.png`), pero la del
      04-10-2026 sigue sin generarse y sin `NO-PUDE.md`, y
      `prompts/suplente.md` sigue sin la palabra "carátula" (verificado de
      nuevo, cero resultados). Queda una sola imagen por generar o declarar
      ausente: la del 04-10.

- [ ] **26-09: `contenido/README.md` describe el flujo viejo** (veredicto de la
      revisión editorial, Clave diaria). La limpieza del 26-09 reescribió los
      README de las subcarpetas pero no este mapa. Reescribirlo corto,
      apuntando a los README de cada subcarpeta.

- [x] **25-09, HOY: GPT se atascó en la preselección y `reintento.yml` no
      corrió ni una vez dentro de su ventana, segundo día seguido.**
      Auditoría del 25-09 (`bitacora/2026-09-25-auditoria.md`). El aviso a
      GPT se emitió bien (`automatizacion/estado`, `04:41:11Z`, etapa
      `preseleccion`), pero a las 08:36 UTC (235 min después,
      `contenido/preseleccion/2026-09-25.md` verificado ausente) no hubo
      respuesta ni un solo reintento: `mcp__github__actions_list` sobre
      `reintento.yml` marca **cero corridas** en su ventana de hoy
      (04:00-09:59 UTC), y en las 20 corridas de todo su historial solo dos
      cayeron dentro de la ventana (23-09 08:57 UTC, 24-09 08:52 UTC), casi
      al cierre de ella, nunca cada 20 minutos como indica
      `.github/workflows/reintento.yml:27` (`*/20 4-9 * * *`). Consecuencia:
      sin preselección no hubo informe, guion, revisión, banco de temas ni
      videos hoy. **Propuesta**: agregar a `reintento.yml` un despertador
      propio (rutina Claude que toque un archivo y pushee cada 20 min en
      01:00-07:00 Chile, con `on: push` sobre esa ruta), igual que ya usan
      `barrido.yml`, `metricas.yml` y `guardia.yml`, en vez de depender del
      cron nativo de GitHub. Relacionado con la propuesta 2 de la auditoría
      del 24-09 (más abajo), que ya señalaba esta misma falla de fondo como
      `AGUANTA`; hoy causó una cadena completa perdida, así que sube a
      `HOY`. Primera vez que se marca esta ocurrencia puntual (GPT atascado
      + reintento sin correr causando daño real): 25-09-2026.
      **26-09: van dos mañanas seguidas** con la misma verificación (cero
      corridas de `reintento.yml` en ventana); hoy el atasco real es
      `reparar_informe` (`bitacora/2026-09-26-auditoria.md`).
      ✅ 26-09 noche: hecho tal como se propuso, con reloj de Claude cada
      hora (no cada 20 min: el reintento espera 25 min de gracia de todos
      modos). Detalle en la entrada del 26-09 de "Dependen de Santiago" y en
      bitacora/2026-09-26.md.

- [ ] **24-09, HOY: el despertador del barrido corrió a horario y dejó un
      commit vacío: la cadena entera de hoy no arrancó.** Auditoría del
      24-09 (`bitacora/2026-09-24-auditoria.md`). El commit `98abc93`
      ("despertador 2026-09-24 [reloj]", 2026-09-24 04:40:16 UTC) no tiene
      ningún archivo cambiado; `contenido/barrido/despertador.txt` quedó con
      la marca de AYER (`2026-09-23 04:40:45 UTC`). Como `barrido.yml`
      dispara por push sobre ese path exacto
      (`.github/workflows/barrido.yml:16`), el push no cumplió el filtro y
      el workflow nunca corrió. Las dos redes de respaldo tampoco dispararon
      ni una vez hoy: los crons de `barrido.yml:23-24` (04:50 y 05:20 UTC) y
      el de `reintento.yml` (cada 20 min, 04:00-09:59 UTC) llevan cero
      corridas en todo el día según `mcp__github__actions_list`, y aunque
      `reintento.yml` hubiera corrido, su chequeo de la línea 53-54 exige
      que ya exista `contenido/estado/$FECHA.md`, que nunca se creó porque
      el barrido nunca puso nada en main: no cubre este caso. Consecuencia:
      a las 05:33 Chile, `node scripts/estado.js --solo-leer` marca
      ETAPA `nuevo_dia` y todo atrasado, de Barrido (+233 min) a Videos
      (+18 min); sin barrido no hay preselección, informe, guion, revisión
      ni edición diaria, y no hay video del informe hoy. **Acción
      inmediata**: retocar `contenido/barrido/despertador.txt` con la hora
      actual y pushear (a mano o re-disparando `trig_01W5KE`), o disparar
      `barrido.yml` por `workflow_dispatch`, para arrancar la cadena hoy
      aunque sea tarde: cada hora que pasa achica el margen antes de la
      hora de publicación del informe (06:30 Chile). Propuesta de fondo (no
      urgente): en `.github/workflows/reintento.yml`, antes de la línea 53,
      agregar un chequeo previo que, si pasan las ~02:00 Chile sin
      `contenido/barrido/$FECHA.md` ni estado del día y el despertador del
      barrido no trae la fecha de hoy, lo retoque y pushee él mismo, con la
      misma receta de despertador-que-dispara-workflow que ya usan barrido,
      métricas y guardia, aplicada a esta falla en vez de solo a "GPT no
      responde". Primera vez que se marca: 24-09-2026.

- [ ] **CARÁTULA 6: conectar el CLIMA, lo único que quedó a medias del
      taller del 23-09.** La fórmula ya está escrita en
      `prompts/imagen-caratula.md` (regla 7): el guion declara
      `Clima de carátula: grave|institucional|cotidiano|bueno|curioso|deporte`
      y esa palabra decide la luz de la imagen y el color del pictograma, para
      que no salgan todas sombrías (Santiago, 23-09: "si la noticia es alegre,
      estilo alegre"). Falta: (a) la línea en `prompts/guion-informe.md`, junto
      a las tres carátulas; (b) leerla en `parse.js`; (c) pasarla al pedido de
      imagen y a `MiniaturaV4`. NO se tocó esa noche a propósito: cambiar el
      prompt del guion sin poder probarlo con GPT arriesga la edición del día
      siguiente.

- [x] **CARÁTULA 5: el taller del 23-09, seis vueltas y una fórmula.** ✅
      23-09, tarde y noche, con Santiago mirando cada render.
      Punto de partida: se bajaron las carátulas reales del 21, 22 y 23 y el
      problema no era el texto, era que NO HABÍA IMAGEN. Las diez láminas de
      `public/fondos` son texturas al 8% de tinta: a 168 px (el ancho real en
      un teléfono) la carátula era dos cajas de texto sobre blanco. Y el 22 y
      el 23 salieron idénticas, así que la variación diaria que pide la regla
      29 tampoco se estaba aplicando.
      Lo construido: `src/pictogramas.tsx` (diez símbolos por código),
      `MiniaturaV4` (pictograma + cifra) y `MiniaturaV5` (ilustración de GPT)
      en `src/marca.tsx`, tres diseños por edición en `dia.js`, y la tarea
      `imagen` en el canal de pedidos (`pedido-gpt.yml` ahora lee Tarea:,
      Salida: y Prompt: del propio PEDIDO).
      La regla 29 se amplió con el sí de Santiago: fotorrealismo permitido en
      ambiente y objeto, prohibido en el hecho noticioso.
      **La fórmula quedó en `prompts/imagen-caratula.md`** y cada regla viene
      de una carátula que falló: dos capas (fondo dice dónde, objeto dice
      qué), cuatro figuras (ausencia, desborde, desequilibrio, umbral),
      destacar por ausencia le gana a destacar por luz (hallazgo de Santiago,
      cambió la mejor imagen del día), el objeto igual a sus pares, el detalle
      exagerado y arriba, el cobre solo en el banner, el clima según la
      noticia y la estructura fija como marca.
      **Límite medido**: seis pedidos de imagen en dos horas agotaron el
      generador de GPT. El conector quedó sano (GPT lo confirmó); lo topado
      era el dibujo. Ritmo normal: UNA imagen al día, y las pruebas después de
      cerrar la edición. Quedaron sin hacer la prueba del dólar y la del
      15-09 ("54 años sin contagios"), que era el antes y el después.

- [x] **SUBIDA 23-09: el exprés sale público y el informe se publica a las
      6:30.** ✅ 23-09, sesión de día, pedido de Santiago ("deja los videos
      exprés públicos por defecto y los informes prográmalos para las 6.30").
      El Short exprés se sube PÚBLICO (`scripts/short-urgente.js` le pasa
      `--privacidad public` al subidor): es última hora, y esperar una
      revisión lo deja sin noticia. El informe pasa de 07:30 a **06:30** de
      Chile (`YT_HORA_INFORME` en `edicion-diaria.yml`). La edición termina
      cerca de las 03:00, así que el margen de revisión sigue siendo de más
      de tres horas y `YT_MARGEN_MIN` (90) no lo corre. **OJO**: si en
      Settings → Variables existe la variable `YT_HORA_INFORME`, manda ella y
      hay que cambiarla ahí; el default del archivo solo vale si no existe.
      El Short del día (12:00) y la Clave (14:00) quedan igual.

- [x] **PROMPTS 23-09: las dos reglas que la auditoría pedía, aplicadas.** ✅
      23-09, sesión de día, con el sí de Santiago ("deja el video, corrige las
      dos reglas de prompt").
      (1) `prompts/guion-informe.md`, en la marca [FUENTE] y en el control
      final: toda sigla que se pinte en pantalla va expandida la primera vez
      ("Dirección Meteorológica (DMC)"), salvo las de uso corriente. "DMC"
      salió sin expandir el 21, 22 y 23-09.
      (2) `prompts/informe.md`, junto a la definición de pesos y en el control
      final: tope duro de UNA sola [B] o [C] por edición que cierre diciendo lo
      que falta por saber; las demás cierran con lo que sí se sabe. Marcado
      cuatro días seguidos del 20 al 23-09, y el 23 la revisión lo encontró ya
      cruzado al guion.
      **Decisión sobre el video del 23-09**: se dejó publicar a las 07:30 con
      los dos defectos que marcó la auditoría (la tarjeta de lluvias atribuye a
      la DMC los +200 mm que vienen de modelos privados, y la apertura llama
      "reforma migratoria" a una reforma constitucional). Motivo: la narración
      SÍ aclara que la proyección viene de modelos privados, el bloque
      desarrollado sí nombra bien la reforma, y rehacer el render costaba una
      hora de Actions y la hora de publicación por un pie de tarjeta y una
      palabra. Queda verificado en la madrugada del 24 si las dos reglas
      nuevas evitan la repetición.

- [ ] **23-09, HOY: expandir siglas que se pintan en pantalla: la "DMC" lleva
      3 días repitiéndose sin corregirse ni anotarse.** Auditoría del 23-09
      (`bitacora/2026-09-23-auditoria.md`, punto 3). Las marcas `[FUENTE DMC
      vía ...]` y `[DATO ... DMC ...]` de `prompts/guion-informe.md` pintan la
      sigla sin expandir donde no se explica sola (la narración sí dice
      "Dirección Meteorológica de Chile"). `contenido/revisiones/2026-09-23.md`
      dice "Viene repitiéndose desde el 21-09"; `contenido/revisiones/2026-09-22.md`
      dice "misma observación del 21-09"; `contenido/revisiones/2026-09-21.md`
      la describe de cero. Tres veredictos seguidos la aprobaron como no
      bloqueante y ninguno bajó tarea aquí. Propuesta: en
      `prompts/guion-informe.md`, agregar que toda sigla en una marca que se
      pinta en pantalla vaya expandida la primera vez que aparece. Primera vez
      que se marca en esta lista: 23-09-2026 (lleva 3 mañanas seguidas
      señalada en las revisiones).
      **27-09: sigue sin cerrarse, ya van cinco mañanas.** El 25 y el 26-09
      la sigla fue Senapred (`contenido/revisiones/2026-09-26.md`: "cuarto
      día seguido"); hoy `contenido/revisiones/2026-09-27.md` marca "quinto
      día con la misma observación" y ya no es solo DMC: se pintan sin
      expandir SEC, Senapred y DW. La regla que se agregó a
      `prompts/guion-informe.md` el 23-09 no cerró el problema de fondo,
      solo cubrió el caso puntual de esa sigla: sigue faltando una lista de
      exentas o una regla general para cualquier sigla nueva.
      **28-09: sexto día, y la superficie cambió.** Hoy `contenido/revisiones/2026-09-28.md`
      marca SAG y CONAF sin expandir, pero ya no en `[FUENTE]`/`[DATO]`
      (lo que cubre la regla del 23-09) sino en el titular de la línea 118
      del guion: un titular no incumple la letra del prompt aunque se pinta
      en pantalla igual, así que la revisión no bloqueó por una razón de
      forma. La propia revisión de hoy dice textual: "o entra a la lista de
      exentas o empieza a bloquear". Auditoría del 28-09
      (`bitacora/2026-09-28-auditoria.md`).
      **29-09: sube a HOY, tercera superficie.** Hoy `contenido/revisiones/2026-09-29.md`
      marca "Fogape" sin expandir dentro de un `[ESQUEMA]` de
      `contenido/guiones/informe/2026-09-29.md` (ni `[FUENTE]`/`[DATO]` ni
      titular). Causa encontrada en `prompts/guion-informe.md`: la regla de
      la línea 211-212 restringe el alcance a "(en esta marca o en el pie de
      un [DATO])", pero el checklist ítem 17b (línea 273) pide lo mismo sin
      esa restricción, así que la validación se queda con la lectura más
      estrecha. Propuesta: en `prompts/guion-informe.md`, líneas 211-212,
      quitar la restricción entre paréntesis y dejar la regla igual de
      ancha que el ítem 17b, para cualquier marca del guion (titulares,
      [TESIS], [ESQUEMA], [FUENTE], pie de [DATO]). Auditoría del 29-09
      (`bitacora/2026-09-29-auditoria.md`).
      **30-09: séptima mañana, y esta vez NO es un hueco de la regla.**
      `contenido/revisiones/2026-09-30.md` marca "Confusam" (línea 67 del
      guion) y "CIPER" (línea 73) sin expandir en el pie de dos tarjetas
      `[FUENTE]`, la marca exacta que la regla del 23-09 ya cubre. La causa
      hoy no es de alcance: el validador no lo revisó en su propia vuelta 1,
      y `prompts/validador.md:158` ("Convergencia") le impidió sumarlo en la
      vuelta 2, así que llegó al aire. Propuesta nueva, distinta de la del
      29-09: en `prompts/validador.md`, línea 157 (entre "Antes de afirmar
      que algo falta…" y "Convergencia"), agregar un punto propio: "Siglas en
      pantalla: revisa en la vuelta 1, sin excepción, cada marca [FUENTE] y
      el pie de cada [DATO] contra la regla de siglas del prompt de la pieza
      que estés validando; no dependas de notarlo por casualidad." Auditoría
      del 30-09 (`bitacora/2026-09-30-auditoria.md`). La propuesta del 29-09
      sobre `prompts/guion-informe.md:211-212` sigue sin aplicarse.
      **10-10: vuelve a aparecer, ahora con "Senapred".**
      `contenido/revisiones/2026-10-10.md` marca "Senapred" sin expandir en
      una marca [FUENTE]/[DATO] del guion de hoy (el 09-10 había sido
      Mineduc/REDIMIN/CIPER). Auditoría del 10-10
      (`bitacora/2026-10-10-auditoria.md`). La propuesta del 29-09 sobre
      `prompts/guion-informe.md:211-212` (quitar la restricción de alcance)
      sigue sin aplicarse y sigue siendo la que resuelve de fondo las dos
      recurrencias.
      **12-10: vuelve a aparecer, ahora con "SHOA" en un titular.**
      `contenido/revisiones/2026-10-12.md` marca "'SHOA' se pinta en un
      titular sin expansión previa, fuera del alcance de la regla de siglas,
      que está escrita para las marcas [FUENTE] y el pie de un [DATO]".
      Auditoría del 12-10 (`bitacora/2026-10-12-auditoria.md`). La regla
      sigue en `prompts/guion-informe.md:230` (la línea se corrió de 211-212
      a 230 porque el archivo creció), todavía con la restricción "(en esta
      marca o en el pie de un [DATO])" sin generalizar a titulares y
      [TESIS].
      **21-10: tercera aparición de la variante "siglas contra el tope de seis
      palabras", después del 10-10 y de la vuelta 1 de hoy mismo.**
      `contenido/revisiones/2026-10-21.md`, hallazgo 3: "Senapred" se pinta
      sin expandir en la [FUENTE] de la línea 29 del guion porque expandirla
      rompería el tope de seis palabras de `prompts/guion-informe.md:238` y
      `:258`. No bloquea ninguna pieza (ambas reglas se cumplen por separado,
      solo entran en conflicto cuando coinciden en la misma marca) y "no se
      arregla en la pieza: hay que decidirlo en el prompt" (palabras de la
      propia revisión). Sigue sin tocarse ninguna de las dos reglas citadas.
      Auditoría del 21-10 (`bitacora/2026-10-21-auditoria.md`).
      **23-10: cuarta aparición, ahora con "GLP vehicular" y "ENAP".**
      `contenido/revisiones/2026-10-23.md` marca las dos siglas sin expandir
      en una etiqueta y en una marca [FUENTE]/[TESIS] del guion de hoy.
      Ninguna de las dos reglas citadas se tocó. Auditoría del 23-10
      (`bitacora/2026-10-23-auditoria.md`).

- [ ] **21-10, AGUANTA: `scripts/validar-tarjetas.js:153` cuenta líneas de
      encabezado ("Carátula N:", "Título sugerido:", "Descripción sugerida:")
      como si fueran narración, y dispara falsos positivos de "cifra exacta
      en voz".** Auditoría del 21-10 (`bitacora/2026-10-21-auditoria.md`).
      El filtro de `narradas` (línea 90) sí excluye esas cabeceras
      (`!/^(\[|## |#|Título sugerido:|Descripción sugerida:|Guion:)/`), pero
      el bloque de cifra exacta usa `narrables.forEach` (línea 152) con un
      filtro más angosto (`!/^(\[|## |#)/`, línea 153) que no excluye
      "Carátula sugerida:", "Carátula N:" ni "Descripción sugerida:".
      Reproducido hoy: `contenido/guiones/informe/2026-10-21.md:5` dice
      "Carátula 3: Por cada millón / 103.900 pesos menos" (un gancho de
      miniatura, no narración) y el script lo marca con "línea 5: cifra
      exacta en voz (\"103.900\")" (`node scripts/validar-tarjetas.js --fecha
      2026-10-21`). `contenido/revisiones/2026-10-21.md`, hallazgo 4, confirma
      que no es la primera vez hoy: "es el segundo veredicto del día que
      tiene que explicar el mismo falso positivo". Arreglo de una línea: en
      `scripts/validar-tarjetas.js:153`, copiar la misma exclusión de cabeceras
      que ya usa la línea 90.

- [ ] **23-09, HOY: tope al cierre de cautela repetido ("queda para
      verificar/en seguimiento/pendiente"), más de una semana sin corregirse
      ni anotarse, y ya cruzó del informe al guion.** Auditoría del 23-09
      (`bitacora/2026-09-23-auditoria.md`, punto 4). `bitacora/2026-09-20-auditoria.md`
      y `bitacora/2026-09-21-auditoria.md` ya registran "cuarto día seguido"
      de casi todas las [B] y [C] del informe cerrando con la misma fórmula de
      cautela. `contenido/revisiones/2026-09-23.md` constata que el molde
      ("falta revisar", "el seguimiento queda puesto en") ya se escucha en
      "Tres bloques seguidos del guion". Propuesta: en `prompts/informe.md`,
      topar a una sola [B]/[C] por edición el cierre con esa fórmula y variar
      el resto; como el guion hereda el texto del informe, resuelve también el
      arrastre. Primera vez que se marca en esta lista: 23-09-2026 (el patrón
      lleva señalado desde al menos el 20-09 sin bajar aquí).

- [x] **IMPRESIONES 1: la vía es la YouTube Reporting API, no Analytics** ✅ 23-09
      (respuesta de GPT con documentación oficial, 22-09). Cierra la
      investigación abierta hoy:
      - En `reports.query` de Analytics v2 estas métricas NO existen: los
        informes de alcance son "supported for channels (bulk) and content
        owners (bulk)". Por eso las cinco variantes dieron "The query is not
        supported". El intento diario que quedó en `scripts/metricas.js` se
        puede retirar.
      - Los nombres reales son `video_thumbnail_impressions` y
        `video_thumbnail_impressions_ctr`, en la **YouTube Reporting API**.
      - El informe es **`channel_reach_basic_a1`**, con campos `date`,
        `channel_id`, `video_id` más esas dos métricas. NO admite filtros: se
        descarga el CSV completo y se filtra en casa. No usa `channel==MINE`.
      - El scope actual sirve: `yt-analytics.readonly`. No está limitado a
        content owners; sin `onBehalfOfContentOwner` Google asume el canal
        propio.
      **Lo que hay que construir** (más grande que una consulta, por eso queda
      como tarea aparte): crear UNA vez el trabajo con `jobs.create`, y después
      un paso diario que liste los informes del trabajo, baje el CSV del día,
      lo cruce con `contenido/videos` y escriba impresiones y CTR por video en
      `bitacora/metricas/FECHA.json`, donde el reporte ya tiene el hueco hecho
      (la tabla de largos con 100 impresiones o más). Ojo con dos cosas: el
      informe es diario y asíncrono, así que el dato del día llega con rezago,
      y el trabajo empieza a generar informes recién desde que se crea, no
      hacia atrás. Doc: developers.google.com/youtube/reporting y
      /youtube/reporting/v1/reports/channel_reports.
      **CONSTRUIDO el 23-09** (sesión de día, con el sí de Santiago):
      `scripts/impresiones.js`. Busca el trabajo `channel_reach_basic_a1` y lo
      crea si no está; lista los informes, baja SOLO los días que faltan y
      guarda el crudo por día y por video en
      `bitacora/metricas/impresiones-diario.json` (45 días, se poda solo).
      De ahí sale `bitacora/metricas/impresiones.json`, el resumen de 30 días
      que `metricas.js` ahora LEE en vez de preguntarle a Analytics: el
      intento diario que sobraba se retiró. El CSV trae varias filas por video
      y por día (país, suscrito): se suman las impresiones y el CTR se pondera
      por impresiones, nunca se promedia. La escala del CTR (fracción o
      porcentaje) se decide por el máximo de cada archivo y queda dicha en el
      log. Corre en `metricas.yml`, antes de las métricas, con
      `continue-on-error`. Probado en seco contra una API falsa con dos días
      de CSV: suma, ponderación, poda y segunda corrida sin volver a bajar.
      **Lo que falta es esperar**: el trabajo se crea en la primera corrida
      real y el primer CSV tarda hasta 48 horas, así que el dato no aparece
      hasta el 25-09 y no habrá historia anterior a hoy.

- [x] **REINTENTO 1: la máquina reintenta sola cuando GPT no responde.** ✅
      22-09, sesión de día con el sí de Santiago. `.github/workflows/reintento.yml`:
      cada 20 minutos entre las 04:00 y las 09:59 UTC (la ventana cubre la
      madrugada de Chile con y sin horario de verano; fuera de 01:00-07:00 de
      Chile el job se retira en segundos). Mira el estado, y solo si la etapa
      es turno de GPT y el evento del PR #6 lleva 25 minutos o más sin que
      llegue la pieza, lo reemite con `reintentos=N` y el motivo. Tope de tres:
      al cuarto no insiste y falla con un error explícito, salvo en
      `alimentar_banco`, que no frena la edición y solo deja un aviso. La
      regla de qué etapa es de GPT es la MISMA de `estado.yml` línea 124 y hay
      que cambiarlas juntas: el ensayo en seco cazó que `alimentar_banco`
      faltaba en la primera versión. Queda verlo actuar en una madrugada real.
      El caso que lo motivó: Lo que pasó hoy: el
      conector de GitHub de ChatGPT devolvió "HTTP 400: Invalid MCP request
      metadata" y la tarea no pudo leer ni escribir el repo. La cadena quedó
      parada 9 horas, de las 01:58 a las 11:04, con todo el lado del repo
      correcto (el evento salió al PR #6 a las 01:58 y quedó registrado).
      **El diagnóstico, dicho por la propia tarea de GPT:** "no hubo
      reconexión manual: el error de metadatos era transitorio y el conector
      se recuperó al reintentar una lectura autenticada". O sea, un reintento
      cualquiera habría destrabado el día. La edición salió completa a las
      12:15 tras la intervención a mano, con aprobación en una sola vuelta.
      **Propuesta**: un workflow chico por reloj (cada 20 o 30 minutos entre
      la 01:30 y las 06:00 de Chile) que mire el estado; si la etapa es de GPT
      (`barrido_listo`, `*_lista`, `*_listo`, `reparar_*`) y la pieza que toca
      no aparece después de 25 minutos del último evento, reemite el evento al
      PR #6 exactamente como lo hace `estado.yml`. Tope de tres reintentos por
      etapa para no insistir sobre algo roto de verdad, y al tercero que avise
      al teléfono en vez de seguir. Cuesta un minuto de Actions por corrida y
      cubre la clase entera de fallo: conector caído, despertar perdido o
      evento agrupado. Hoy habría ahorrado nueve horas sin que nadie mirara.

- [ ] **NÚMEROS 1 (PRIORIDAD ALTA, 22-09): el problema no es la carátula ni la
      retención de los largos, es que los largos no reciben tráfico.** Medido
      hoy sobre `bitacora/metricas/2026-09-22.json`:
      (a) **Los largos publicados del 17 al 21 tienen entre 1 y 9 vistas cada
      uno.** Con esa base, ningún porcentaje de retención (van de 15% a 99%)
      significa nada: son una o dos personas.
      (b) **El canal vive de los Shorts**: 5.051 de 5.881 vistas (86%), y la
      fuente SHORTS aporta 4.273. Los largos hacen 1.412 minutos vistos contra
      742 de los Shorts, o sea generan el doble de minutos con un sexto de las
      vistas: el problema de los largos es de ENTRADA, no de permanencia.
      (c) **Distancia a la monetización**: 23,5 horas vistas de largos de las
      4.000 que pide el YPP, y 16 suscriptores de 1.000. Por el camino de los
      largos, al ritmo actual, no se llega. Hay que decidir si el producto
      principal pasa a ser el Short.
      (d) **La pregunta de Santiago ("¿sirven las carátulas nuevas?") HOY NO SE
      PUEDE RESPONDER**, por dos razones: `scripts/metricas.js` no pide
      impresiones ni CTR (línea 94: solo views, estimatedMinutesWatched,
      averageViewDuration, averageViewPercentage), y aunque las pidiera, un
      largo con 3 vistas tiene decenas de impresiones y ninguna señal. La
      carátula v3 entró el 20-09; los largos del 20 y 21 hicieron 1 y 3
      vistas.
      **Lo que propongo, en orden:**
      1. **INTENTADO el 22-09 y NO FUNCIONA: la API rechaza las métricas de
      impresiones para este canal.** Se escribió la consulta con
      `videoThumbnailImpressions` y `videoThumbnailImpressionsClickRate`
      (nombres que una búsqueda web daba como agregados el 15-01-2026; NO se
      pudieron contrastar con la documentación oficial porque
      developers.google.com está bloqueado por el proxy de la sesión de día).
      Probado en dos corridas reales del workflow de métricas con los secrets:
      cinco variantes (por video con y sin sort, solo impresiones, junto a
      views, por día y sin dimensión) y las cinco devolvieron **"The query is
      not supported"**. El código quedó con UN intento diario y su explicación;
      si Google la habilita, el dato aparece solo. La retención y las fuentes
      no se vieron afectadas en ningún momento.
      **Lo que falta para cerrarlo, y no se puede desde la sesión de día:**
      abrir https://developers.google.com/youtube/analytics/v2/available_reports
      y la página de métricas desde la sesión local o desde el navegador de
      Santiago, y confirmar si la métrica existe con otro nombre, si es solo
      para content owners o si pide otro scope en el token de Analytics.
      **Delegado a GPT el 22-09** (Santiago: "él puede entrar a las páginas
      sin problemas"): investigar en la documentación oficial si la métrica
      existe, con qué nombre, en qué informe y con qué scope, y devolver la
      consulta exacta o la confirmación de que no está disponible para un
      canal propio. Cuando responda, la sesión de día aplica lo que diga.
      **Mientras tanto**, impresiones y CTR se leen a mano en YouTube Studio,
      y la prueba A/B de carátulas de Studio sigue siendo la vía para decidir
      entre la v3 y lo anterior (CARÁTULA 2, punto 4). El pedido original era:
      **Agregar impresiones y CTR a la recolección** (`metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage"`
      suma `impressions,impressionClickThroughRate` en la consulta por video, y
      la misma serie por día). Sin esto no se puede evaluar ninguna carátula,
      ni la v3 ni la que venga. Es código y lo puede hacer la sesión de día.
      2. **Mirar dónde abandonan los pocos largos que sí tienen vistas**: el
      script YA pide `audienceWatchRatio` por `elapsedVideoTimeRatio` (línea
      120) y ese dato no se está usando en ningún análisis. Con él se sabe si
      la caída es en el sello, en la apertura o en la tercera noticia.
      3. **Medir y forzar la conversión Short → largo**, que hoy es casi cero:
      enlace al largo en el comentario fijado y un cierre explícito en el
      Short. Es la única fuente de tráfico propia que el canal tiene.
      4. **Fórmula del Short**: los de pregunta con nombre propio funcionan
      mejor que el resumen genérico. Los ocho más vistos incluyen "¿Qué
      admitió el exfiscal Vinko Fodich...", "¿Quién fue Patricio Guzmán..." y
      "¿Por qué la aprobación de Kast tocó su peor nivel" (202 vistas el
      21-09, un exprés). Los "y otras 4 cosas de hoy" sostienen una mediana de
      134 y los de Clave apenas 59.

- [ ] **CLAVE 4: FLUJO PROPIO CONSTRUIDO la noche del 21-09; falta la primera
      Clave real.** Cómo se usa (fase 1, decisiones por el chat):
      1. `node scripts/clave.js listar` muestra el banco numerado; Santiago
         elige; la sesión corre `node scripts/clave.js elegir <slug> --tema <n>`
         → GPT propone la idea (`prompts/clave-idea.md`, nuevo) → Claude la
         valida → etapa `idea_lista`.
      2. Santiago lee `contenido/claves/flujo/<slug>/idea.md` y dice sí o pide
         cambios: `clave.js aprobar <slug> [--fecha]` o `clave.js cambiar
         <slug> --nota "..."` → GPT escribe la entrega (`prompts/claves.md`,
         MODO FLUJO) → Claude valida → GPT el guion → Claude valida →
         `aprobada` → `estado-clave.yml` dispara la Edición diaria para la
         fecha de producción → video programado a la hora de la Clave.
      Piezas: `scripts/estado-clave.js` (vista `contenido/estado/clave-<slug>.md`
      con PIEZA/PROMPT/ARCHIVO/ARCHIVO_ENTRADA), `estado-clave.yml` (evento
      propio `ultimo-evento-clave.txt` en el PR #6, disparo del validador por
      API, render), despachador y validador con su rama de Clave, `gate.js`
      acepta la Clave aprobada por flujo, `contenido/claves/flujo/README.md`.
      Probado en local de punta a punta con un flujo de prueba (tema → idea →
      veredicto → aprobar → cambiar); nunca corrió con GPT y Claude de verdad.
      **Primera Clave real: cuando Santiago elija el tema.** Riesgos: el
      despachador tiene que leer el segundo archivo de evento; la entrega en
      MODO FLUJO es un prompt viejo con un párrafo nuevo encima. Fase 2 del
      Taller: las dos decisiones con botón en la página.
      **(a) y (b) HECHOS la noche del 16-09:** la cadena diaria es de tres piezas y termina en el guion del
      informe; el banco se alimenta cada día con la etapa `alimentar_banco`
      (`prompts/banco-temas.md`, GPT, sin validación, no frena el render).
      Quedan (c), (d) y (e), que necesitan el Taller. Diseño original: "La Clave la vamos a lanzar una
      o dos veces por semana dependiendo de la lista que tengamos, y la
      haremos bien. Antes de hacerla video me presentas la lista de
      disponibles. Esa lista se actualiza con cada informe si encontramos algo
      interesante. Luego que decidimos el tema, me presentarás la idea
      completa, y recién cuando te dé el sí lo harás video y subirás."
      **Lo que ya existe y sirve:** `contenido/claves/banco-temas.md` tiene 67
      temas con su noticia de origen y su fecha, y `contenido/claves/indice.md`
      lleva lo ya explicado. El prompt de la Clave ya sabe leer los dos.
      **Lo que hay que cambiar:**
      (a) **Sacar la Clave de la cadena diaria**: en `scripts/estado.js`,
      `VALIDADAS` pasa de cinco piezas a tres (preselección, informe, guion del
      informe) y la pieza `videos` deja de exigir la descripción de la Clave.
      La cadena del día termina en `guion_informe_listo` → `validar_final` →
      `aprobada` → videos. Un día sin Clave deja de ser un día incompleto.
      (b) **Alguien tiene que seguir alimentando el banco todos los días.** Hoy
      lo hace el prompt de la Clave, que corre cada madrugada; si la Clave sale
      de la cadena, ese paso desaparece. Propuesta: un paso corto y barato
      después del informe aprobado (GPT o una rutina de Haiku) que lea el
      informe del día y agregue al banco los temas que ameriten, con concepto,
      noticia de origen y fecha. Sin esto la lista se congela.
      (c) **Flujo propio con estado propio**, `contenido/estado/clave-<slug>`,
      con estas etapas: `banco_al_dia` → **`elegir_tema` (Santiago)** →
      `proponer_idea` (GPT, con título, promesa, las preguntas que responde,
      el caso de entrada y la carátula) → `validar_idea` (Claude, contra el
      prompt) → **`aprobar_idea` (Santiago)** → `entrega` → `validar_entrega`
      → `guion` → `validar_guion` → `aprobada` → video y subida. Los dos pasos
      en negrita son de Santiago y el flujo se detiene ahí hasta su respuesta.
      (d) **Disparo manual**: el flujo no arranca por reloj, sino porque
      Santiago lo pide ("hagamos la Clave de X"). Es el caso de uso del
      "despertar un flujo con un aviso" de MÁQUINA 5.
      (e) **Cadencia**: una o dos por semana según lo que tenga el banco.
      Sustituye a CLAVE 2 y ajusta lo dicho en SERIE 1 (dos por semana dentro
      del hilo del Estrecho).
      **Esto obliga a tener el Taller**: la lista de temas y la idea propuesta
      hay que presentarlas de una forma que Santiago pueda mirar y decidir
      desde el teléfono. Es TALLER 3, ahora con un uso concreto y urgente: un
      tablero de la lista de temas disponibles con su fecha y su noticia de
      origen, y una ficha de la idea propuesta con botón de aprobar.

- [ ] **CARÁTULA 4: la prueba A/B de Studio NO está andando y necesita a
      Santiago** (aclarado el 22-09). Lo que la máquina SÍ hace sola desde el
      21-09: el guionista escribe tres carátulas por edición, `dia.js` las
      renderiza (`miniatura.png`, `miniatura-2.png`, `miniatura-3.png`), el
      workflow las sube al release del día y la PRIMERA queda como carátula
      del video en YouTube. Lo que NO hace nadie: cargar las otras dos en
      "Probar y comparar" de YouTube Studio. Eso es manual, por video, desde
      el teléfono, bajando las dos alternativas del release.
      **Advertencia medida**: con largos de 1 a 9 vistas la prueba A/B no va a
      concluir, porque necesita impresiones suficientes para decidir. Por eso
      el orden correcto es primero tráfico (NÚMEROS 1) y después carátulas; la
      prueba conviene activarla en el video que más impresiones reciba, no en
      todos.

- [ ] **CARÁTULA 2: EN PRODUCCIÓN desde la edición del 21-09** (decidido por
      Santiago el 20-09 sobre el tablero, paleta cobre y tinta). Hecho: regla
      de tres carátulas de dos líneas en `prompts/guion-informe.md`;
      `parse.js` las lee y ninguna se narra; `dia.js` renderiza la primera
      como `miniatura.png` (V3) y las otras dos como `miniatura-2.png` y
      `miniatura-3.png`; el release las sube; `validar-tarjetas.js` avisa si
      falta una, si no trae " / " o si una línea pasa de cuatro palabras. Probado
      con el guion de hoy (formato viejo, una sola carátula corta): render
      correcto en una línea. **Queda:**
      (a) mirar la del 21-09, la primera con GPT escribiendo tres ganchos;
      (b) **Santiago**: cargar las alternativas 2 y 3 en YouTube Studio
      (Prueba y compara) durante dos semanas, con la 1 como control, y
      decidir la fórmula con ese dato (regla 26);
      (c) la imagen del tema: hoy es la lámina de sección (10 láminas) y cae al
      mapa cuando nada calza; el pedido de "un símbolo del tema generado o
      dibujado" sigue abierto y es parte del Taller.
      Tablero: https://claude.ai/artifact/XsfWbLELW4LWLv4rF6roZR
- [ ] **ACTIONS 1: el ciclo de minutos se agotó al día 15 (1.843 de 2.000;
      se reinicia el 1 de octubre).** Medido con la API el 15-09: 457
      corridas y ~2.004 minutos desde el 1-09; la Edición diaria se lleva
      1.500 (75%), a 55-105 minutos por render y 130 minutos por día en
      promedio, con cinco días de doble render. Decisión de Santiago (15-09):
      poner presupuesto en Manage budgets en vez de $0 para que el canal no
      se detenga (a $0,008 el minuto Linux, entre $9 y $17 hasta el 1-10; $20
      cubre). Para la noche, dos optimizaciones que deberían bajar el render
      a la mitad sin tocar la calidad, medir con un render real:
      (a) `scripts/dia.js` y `scripts/short.js`: pasar `--concurrency=100%`
      a `remotion render`; hoy va con el default, que en el runner de 4
      núcleos usa 2.
      (b) `scripts/build-timeline.js` línea 149: fps 30 → 24 (20% menos
      cuadros; en tarjetas de texto no se nota). Revisar que SELLO_SEG y los
      offsets en segundos no dependan de 30.
      **(a) y (b) HECHOS la noche del 16-09** (`--concurrency=100%` en dia.js y
      short.js; 24 fps en build-timeline.js y en los defaults de Root.tsx y
      short-entry.tsx). Medir con el render del 17-09: hoy tardó 92 minutos.
      Y dos desperdicios chicos (12% del ciclo): `web.yml` corre con cada
      push de contenido (96 corridas, 139 min): bastaría al aprobarse el día
      y al subir los videos; y la Guardia despierta cada dos horas por un
      minuto (96 corridas). Para octubre decidir: GitHub Pro ($4/mes, 3.000
      min) o runner propio en el computador de Santiago (gratis, equipo
      encendido a las 05:00).

- [ ] **GPT 2: elegir el poder de GPT por etapa, para analizar** (Santiago,
      15-09: "tener 4 PR distintos, uno para cada modelo de GPT, y despertar
      GPT dependiendo del poder que necesitamos; o ver si le podemos decir a
      GPT en cada mensaje qué modelo ocupar; o alguna solución similar").
      Motivo: la cuota de ChatGPT se agotó el 15-09 con 8 piezas y 20
      despertares, y no toda pieza necesita el modelo más caro (la
      preselección y las correcciones de forma no; el informe y los guiones
      sí). Lo que hay que averiguar antes de diseñar: (a) si una tarea
      programada de ChatGPT tiene el modelo fijo por tarea o se puede pedir
      por mensaje (hasta donde sabemos, es por tarea, y el texto del disparo
      no lo cambia); (b) cómo se contabiliza la cuota (por mensaje, por
      modelo, por tokens); (c) cuántas tareas caben (hoy hay tope de 5 y se
      usan 2). Diseño A, si el modelo es por tarea: un PR por nivel de poder
      (`automatizacion/estado-alto` y `-bajo`, no hacen falta cuatro), una
      tarea de ChatGPT por PR con su modelo, y `estado.yml` emite al PR que
      corresponde según la etapa: preselección y `reparar_*` de forma al bajo;
      informe, guiones y Clave al alto. Costo: dos PR permanentes más y una
      tabla etapa → poder en el estado. Diseño B, si el modelo se puede pedir
      por mensaje: una sola tarea y el evento lleva `modelo=` en
      `ultimo-evento.txt`. Diseño C, sin cambiar ChatGPT: bajar el trabajo por
      pieza (GPT 1 ya hizo la mitad) y mover la preselección a una rutina de
      Claude con Haiku, que es la pieza más mecánica. Medir una semana antes
      de elegir.

- [ ] **GPT 1: se agotó la cuota de ChatGPT a media cadena (15-09, 09:14) y hay
      que limitar los despertares** (Santiago: "tendremos que limitar, se agotó
      el uso"). La cadena quedó en `reparar_clave` con la Clave sin corregir;
      el evento se emitió a las 09:14 y se reemitió a mano a las 09:32 sin
      respuesta. Lo medido hoy: 20 eventos al PR #6 (cada uno despierta al
      despachador) para 8 piezas escritas (preselección, informe x3, guion x3,
      Clave). De los 20, once fueron etapas `validar_*`, que NO son turno de
      GPT: lo despiertan solo para que ESPERE hasta 10 minutos sondeando main
      (regla ESPERA del despachador). Y la tarea "Prueba flujo" de ChatGPT, si
      sigue encendida, también despierta con cada uno de esos 20 eventos.
      Cuatro medidas, en orden de rendimiento. **(1), (2) y la regla de
      convergencia de (4) APLICADAS el 15-09 desde la sesión de día con
      autorización de Santiago; (3) la hace él en ChatGPT; queda por medir
      una madrugada.**
      (1) **Emitir al PR #6 solo en turnos de GPT** (`*_lista`, `*_listo`,
      `reparar_*`), en `estado.yml`; a Claude ya lo despierta la API. Hoy eso
      habría sido 9 eventos en vez de 20.
      (2) **Quitar la ESPERA de 10 minutos** del despachador (o dejarla en 2):
      existía porque el evento podía no llegar, y desde hoy `estado.yml`
      escucha los veredictos y el evento llega. Dejar solo "si la etapa ya
      cambió a una tuya, sigue en la misma corrida".
      (3) **Apagar o borrar la tarea "Prueba flujo"** en ChatGPT: la prueba
      terminó el 14-09 y cada evento la despierta por nada.
      (4) **La regla de convergencia de VALIDADOR 1**: cada vuelta extra es una
      pieza reescrita entera por GPT (hoy el informe y el guion se escribieron
      tres veces cada uno).
      Y para el día en que la cuota igual se agote: el vigía (o el estado)
      tiene que distinguir "GPT no responde" de "GPT no tiene cuota", y avisar
      con la hora del último evento sin respuesta; hoy nadie avisó, lo vio la
      sesión de día mirando el reloj. Falta el dato de Santiago: cuál es el
      límite de ChatGPT y cómo se mide, para poner un presupuesto de
      despertares por día.

- [ ] **VALIDADOR 1: tope de vueltas alto, por etapa, y un plan B cuando se
      agote** (Santiago, 15-09 de mañana: "debiese tener un límite alto y por
      etapa, y un plan B para cuando se agote ese límite"). Hoy el tope es 2 y
      vive en `prompts/validador.md` (punto 3, "TOPE"), no en código: con
      `VUELTA: 2` y algún INCUMPLE el validador escribe BLOQUEADA, el estado
      pasa a `bloqueado_humano` y el único plan B es que el vigía avise a las
      02:15 o 05:15 y una persona destrabe. Sí es por pieza (estado.js lee la
      vuelta del veredicto de cada pieza), pero un día con cinco piezas y dos
      vueltas cada una puede bloquearse en cualquiera. Propuesta, en tres
      partes:
      (1) **Tope por pieza, 4 vueltas**, en `validador.md` y reflejado en
      `estado.js` (que hoy no valida el número, solo lee BLOQUEADA).
      (2) **Regla de convergencia, que importa más que el número**: el
      validador tiene que listar TODOS los INCUMPLE en la vuelta 1; en las
      siguientes solo puede arrastrar los no resueltos o los que la propia
      corrección introdujo, nunca sumar hallazgos nuevos sobre partes que ya
      había aprobado. Hoy (15-09) la vuelta 2 del informe trajo una corrección
      nueva (lista de fuentes) que la vuelta 1 no había marcado: así el tope
      se gasta sin que GPT haya fallado.
      (3) **Plan B al agotar el tope, por tipo de hallazgo**: si lo que queda
      es un dato o cifra que el validador no puede verificar, BLOQUEADA y
      aviso inmediato (que `estado.yml` despierte al vigía por API en
      `bloqueado_humano`, no esperar a su reloj); si lo que queda es de forma
      (formato, secciones, listas, marcas, fechas absolutas), el validador
      aplica él mismo las correcciones pendientes sobre la pieza, la aprueba
      con `VEREDICTO: APROBADA` y una línea `CORREGIDA POR EL VALIDADOR:
      vuelta N`, y la cadena sigue; la noche revisa esos casos para arreglar el
      prompt que los produjo. Es la única excepción a "el validador no corrige
      piezas", y existe para que el canal publique todos los días.
      Complemento: **tope por hora**: si son más de las 05:00 de Chile y la
      pieza sigue en CORREGIR por hallazgos de forma, pasar al plan B aunque
      queden vueltas; un informe a las 08:00 no sirve.

- [ ] **RELEASE 1: un HTTP 500 al crear el release deja los videos
      renderizados pero sin publicar** (auditoría del 14-09; Santiago pidió
      anotarlo para la noche). El 13-09 la ejecución 34746265785 renderizó los
      4 videos y commiteó las descripciones, pero `gh release create` recibió
      un 500 de GitHub, la línea `|| echo "release ya existía"` lo tomó por
      duplicado y el `gh release upload` siguiente falló con "release not
      found": job en failure a las 05:52 y videos públicos recién a las 11:22,
      con el estado en `videos_listos` a las 19:16. Pasó 21 minutos después
      de la auditoría y del vigía, así que nadie lo vio. Arreglo en
      `.github/workflows/edicion-diaria.yml` (líneas 230-232): tras un fallo
      de `create`, comprobar con `gh release view "$TAG"`; si no existe,
      reintentar `create` con una pausa corta (dos o tres veces) antes de
      subir; y que el job no termine en failure silencioso: si el release no
      existe al final, avisar (el vigía de las 05:15 ya pasó, así que hace
      falta un chequeo tardío o que `estado.yml` marque `reparar` cuando
      Edición diaria termina en failure, que ya lo escucha por
      `workflow_run`).

- [ ] **SERIE 1: montar "El Estrecho: la ruta en disputa"** (decidida con
      Santiago el 09-09; idea completa en `ideas/ruta-del-estrecho.md`).
      Serie de largos con cuenta regresiva a la interpelación del canciller
      del 28-09, cinco episodios ya definidos con su material, episodio por
      hecho nuevo y no diario, cada uno con su Short propio de gancho (no el
      resumen de cinco cosas). Sustento medido: los dos largos más vistos del
      canal son de este tema (220 y 150) y el segundo Short más visto también
      (353), pero otros dos largos del mismo tema hicieron 11 y 11, así que
      lo que predice es el hecho con nombre buscable, no el tema. Las Claves
      NO se matan: bajan a dos por semana dentro del hilo (retienen 49% a
      57%, lo mejor del canal), lo que reemplaza a CLAVE 2. Quedan fuera por
      decisión: escenarios de enfrentamiento militar, "a quién apoya Estados
      Unidos" y el nombre "Chile vs Argentina"; el motivo está escrito en el
      archivo. Para la noche: el prompt de la serie, la carátula con
      contador, y probar el prompt de imagen en Gemini.

- [ ] **CALIDAD 1: bloque visual y de guion pedido por Santiago el 12-09**
      ("hay trabajo que hacer, esas vistas no llegarán solas ni menos la
      retención"). Seis puntos, con lo medido al lado para que la noche
      decida con datos y no con gusto.
      (1) **El Short de la Clave no gusta: trabajarlo, sacarlo o cambiarlo.**
      Lo medido le da la razón: sus vistas son un tercio de las del Short del
      informe (mediana 59 contra 176) y NO convierte a la Clave larga: de 9
      pares Short→Clave, 7 pasan menos del 6% de las vistas (56→3, 35→2,
      59→2, 220→2, 99→4); la única excepción es la interpelación (82→23).
      Con SERIE 1 la Clave baja a dos por semana, así que la decisión es
      chica: o el Short de la Clave se vuelve un gancho de UNA pregunta con
      respuesta a medias (formato que sí funciona en el del informe) o se
      retira y la Clave se promociona desde el Short del informe.
      (2) **Láminas: 56 de 94 secciones de los últimos cuatro días no tienen
      imagen** (caen a textura). Dos causas distintas: el catálogo tiene 10
      láminas y el emparejador es una lista de regex en `src/fondos.tsx`
      (espejo en `scripts/imagenes-secciones.js`), así que "Fodich en
      prisión preventiva", "cupón de gas", "PISA", "Coca-Cola", "Ataques
      rusos" o "Primer 11 de septiembre" no calzan con nada; y un FALSO
      POSITIVO: `\bcaso\b` hace que la sección "Aplicado al caso" de TODAS
      las Claves (PISA, IPoM, jueces) salga con la lámina de seguridad.
      Camino en dos pasos: primero ampliar el catálogo a 30 o 40 láminas
      pedidas a Gemini en una sola sesión (educación, vivienda, energía y
      combustibles, transporte, memoria y DD.HH., tribunales, empresas,
      guerra y Ucrania, gas y servicios básicos, deporte) y darle al
      emparejador una palabra clave por sección escrita por el guionista
      (`[LÁMINA economia]`) en vez de adivinar por el título; después,
      recién, el pedido programado de 3 imágenes por edición que propone
      Santiago, que hoy no tiene por dónde ejecutarse sin una persona al
      medio (no hay API de imagen en el pipeline) y que calza con MÁQUINA 5
      si el agente de GPT genera imágenes. Regla 29 sigue: identificadores,
      no ilustración del contenido; la variación diaria por código ya está.
      (3) **La pantalla escribe todo lo que se lee.** `TarjetaParrafo`
      muestra `textoPantalla ?? texto`, y `textoPantalla` es solo el párrafo
      con numerales (`parse.js:238`): no existe síntesis. Propuesta: que el
      guionista escriba una línea de pantalla por párrafo (`[PANTALLA] ...`,
      máximo 12 palabras, o el dato) y que la tarjeta muestre ESO en grande
      y el párrafo narrado no aparezca; sin la línea, la tarjeta cae al
      comportamiento de hoy. Es un cambio de prompt + parse + tarjeta, y
      además abre espacio para la lámina del punto (2) dentro de la tarjeta.
      (4) **Se lee el título, empieza el tema y repite lo mismo.** El título
      de sección NO se narra (parse.js:146), lo que se oye repetido es la
      TESIS y el párrafo que la sigue o la cierra diciendo lo mismo con
      otras palabras. Ejemplo de hoy: tesis "once fuera, veintiséis se
      salvaron y diez casos siguen en pausa" y tres párrafos después "once
      jueces quedaron fuera, otros veintiséis se salvaron ... y diez
      expedientes siguen suspendidos". Arreglo en el prompt del guion (la
      tesis anuncia, el párrafo no la reformula: aporta el cómo o el por
      qué) y un aviso en el validador cuando tesis y párrafo comparten más
      de la mitad de sus palabras de contenido.
      (5) **Las carátulas deben llamar a entrar.** Sigue abierta la vuelta 2
      de bocetos (taller.json, PENDIENTE DE DECISIÓN desde el 05-09): ahí
      está la decisión que falta antes de iterar más.
      (6) **Reorganizar el Taller** para que sea un taller de verdad: ver
      TALLER 3 abajo.

- [ ] **TALLER 3: FASE 1 PUBLICADA la noche del 20-09** (https://claude.ai/artifact/2WH2fioUJK7tQHrKbXtBfw):
      página de lectura generada desde el repo por `scripts/taller.js`
      con seis módulos (Ver, Medir, Experimentos, Decidir, Mejorar, Flujos) y
      el registro `bitacora/experimentos.json` estrenado con cuatro fichas.
      Propuesta completa y plan por fases en
      `bitacora/2026-09-20-propuesta-taller.md`. **Decide Santiago:** (1) si
      panel y Taller se fusionan en una página con pestañas; (2) si las
      decisiones con botón van por GitHub desde la página (fase 2) o siguen
      por el chat; (3) qué se retira del Taller viejo (`taller/`). Después:
      fase 2 (botones del flujo de la Clave, CLAVE 4 c-d-e), fase 3 (Ver con
      las carátulas del release, siete días atrás), fase 4 (la auditoría lee
      experimentos.json). El diseño original (Santiago, 12-09): Hoy `taller/` es navegador + editor con
      diff + borradores + Claude sobre los archivos de criterio: sirve para
      cambiar texto, no para ver ni medir. Lo que sí funcionó como taller
      fue el tablero de carátulas del 05-09 (14 propuestas lado a lado,
      decisión, 14/14 aplicadas el mismo día); lo que no funcionó fue la
      vuelta 2, sin decisión en una semana. Propuesta, en tres piezas:
      (a) **Tableros con variantes renderizadas.** Para cada prueba visual
      (tarjeta con lámina, tarjeta con línea de pantalla, cortina, carátula)
      la noche genera 2 o 3 variantes como fotogramas fijos con
      `remotion still` sobre una edición real, y las publica como tablero
      con un botón por variante. Santiago elige desde el teléfono. Sin
      render no hay tablero: los bocetos en texto no se deciden.
      (b) **Un registro de experimentos** (`bitacora/experimentos.json` o
      ampliar `taller.json`): hipótesis, qué cambió, desde qué fecha, qué
      métrica lo juzga (retención a 30 s, % visto, vistas del Short, clics a
      la Clave) y veredicto a las dos semanas (regla 26). Un cambio a la vez
      por métrica, si no nada se puede atribuir. Que la auditoría de la
      mañana lea este registro y diga cuántos días le faltan a cada prueba.
      (c) **Un módulo "Ver" en el Taller** con el último render por pieza
      (fotograma por sección, carátula, Short) y las métricas al lado, para
      mirar lo que se publica sin abrir YouTube. TALLER 1 (panel de métricas
      como cuarto módulo) entra aquí.
      Regla que lo hace posible: la sesión de día puede RENDERIZAR variantes
      y publicar tableros (no toca producción, regla 24 intacta); la noche
      aplica lo decidido y anota el experimento.

- [ ] **YOUTUBE 1: dejar los videos PROGRAMADOS directamente, no privados**
      (Santiago, 09-09). Hoy el paso 7 sube las cuatro piezas en privado y él
      las publica a mano cada mañana. La pieza de código YA EXISTE:
      `scripts/youtube-subir.js` acepta `--programar HH:MM` (o la variable
      `YT_PUBLICAR_HORA`) y arma el `publishAt` en hora de Chile (líneas 46,
      120 y 122). Falta decidir y probar tres cosas.
      (1) **Probarlo, porque nunca se probó.** La cabecera del script afirma
      que `publishAt` "SOLO funciona cuando el proyecto pasó la auditoría",
      y el 07-09 se decidió no enviarla (`docs/auditoria-api/DECISION-07-09.md`).
      Pero esa afirmación es una premisa heredada de la misma familia que ya
      resultó equivocada una vez: el 07-09 se verificó contra la doc oficial
      que la restricción de "privado" aplica al MOMENTO DE LA SUBIDA y no
      impide publicar. Puede que `publishAt` sí funcione. Es barato
      comprobarlo: subir una pieza con `--programar` y mirar si YouTube
      acepta la hora o la deja privada. Si funciona, no hace falta ninguna
      auditoría.
      (2) **La hora por pieza.** Sugerido en su momento: informe 07:00, Short
      12:00, Clave 14:00, Short de la Clave 18:00. Hoy el paso 7 usaría una
      sola hora para las cuatro; habría que pasar `--programar` distinto por
      pieza, o cuatro variables de repositorio.
      (3) **Qué pasa con la revisión.** La regla del canal es que Santiago
      revisa antes de publicar. Programar directo la elimina, salvo que la
      hora quede lo bastante lejos de la subida (sube ~07:56, se programa
      para las 12:00) como para alcanzar a cancelar en Studio. Definir esa
      holgura mínima, y qué hace el guardián si detecta una pieza programada
      que no pasó revisión.

- [ ] **CLAVE 2: elegir el tema desde el banco organizado, y solo si no hay,
      desde una noticia del día** (Santiago, 09-09: "veamos de organizar las
      claves primero, si no, buscar de alguna noticia"). Hoy `prompts/claves.md`
      hace lo contrario: elige la profundización del día (línea 47) y solo
      cuando ninguna noticia la justifica toma el mejor tema pendiente del
      banco (línea 49). El banco ya tiene doce temas acumulados en
      `contenido/claves/banco-temas.md`. Lo que hay que resolver al invertir
      la prioridad: hoy el gancho de la Clave es la noticia del día ("el
      Informe diario del 4 de septiembre señaló..."), que es lo que la ancla
      a la actualidad y al Short; si el tema sale del banco, hay que definir
      con qué abre. Posible salida: ordenar el banco por prioridad editorial
      y exigir que el tema elegido tenga un ancla en el informe de los
      últimos siete días. Decidir en la noche.

- [ ] **MÁQUINA 5: agente de GPT despertado por un PR** (Santiago, 09-09, a
      partir de que la sesión remota no puede leer varios medios: el proxy
      bloquea biobiochile.cl, latercera.com, defensa.com, mineduc.cl). La
      idea: el PR es el despertador; el agente de GPT se activa con él, lee
      un archivo de instrucciones del repo y arranca el proceso completo,
      informes, revisiones, preparación de guiones. Encaja con el diseño de
      la máquina de estados de la sección de arriba (un solo disparador), así
      que va como paso de ese plan y no como pieza aparte. Lo que hay que
      definir: quién abre el PR y con qué contenido, dónde vive el archivo de
      instrucciones (candidato natural: `prompts/`, como el resto), cómo
      sabe el agente qué paso le toca (lo diría `contenido/estado/FECHA.md`)
      y qué pasa si el PR se abre dos veces. Ventaja concreta sobre lo de
      hoy: GPT sí alcanza los medios que a esta sesión le bloquea el proxy.

- [ ] **CASOS 1, la mitad hecha (13-09): falta DECIDIR si se abre el dossier de
      Fonasa.** El comparador de `scripts/casos.js` ya está arreglado (palabra
      completa en vez de subcadena, umbral de dos tercios, y lo dudoso se anota
      igual marcado como posible duplicado); probado contra el informe del 09-09,
      que ahora sí detecta la marca perdida. La línea quedó en
      `contenido/casos/por-abrir.md`. Lo que falta es editorial: Fonasa se
      querelló el 08-09-2026 contra cinco prestadores por fraude de subvenciones,
      perjuicio estimado cerca de $8.000 millones, más de 71 mil beneficiarios,
      330 mil bonos y 1,94 millones de prestaciones; ya había denunciado los
      hechos al Ministerio Público el 07-08-2026. Es un caso DISTINTO del
      megafraude de licencias falsas que ya tiene ficha: no mezclarlos.

- [ ] **TARJETA 3: el esquema de la Clave se dibuja ENCIMA del párrafo**
      (Santiago, 08-09 16:38, Clave "¿Qué es una interpelación y qué puede
      exigirle...", captura en
      `bitacora/capturas-2026-09-08-clave-esquema-superpuesto.jpg`). La marca
      es `[ESQUEMA | Camino de una interpelación]` con CUATRO nodos (línea 25
      del guion de la Clave): las dos primeras cajas se ven arriba y las dos
      últimas quedan tapadas por el párrafo narrado, que se pinta sobre ellas
      (se leen "Sesión de preguntas y respuestas" y "Consecuencias políticas
      posibles" en gris detrás del texto). El párrafo que sigue al esquema
      pasa los 500 caracteres. Pista: con 4 nodos la fila envuelve a dos
      líneas y la caja del esquema crece más de lo que el layout reserva;
      revisar `TarjetaEsquema` en `src/tarjetas.tsx` y si el ancla del
      esquema y la del párrafo caen en el mismo instante. Misma familia que
      TARJETA 2 (una tarjeta desborda y tapa lo de al lado), que ya se
      resolvió el 07-09 por otra vía.

- [ ] **EVENTOS 1: que las rutinas de Claude despierten con la finalización
      de las rutinas de GPT, no con cualquier push** (pedido de Santiago,
      07-09, revisando la auditoría del día). Hoy se vio el costo concreto de
      no tenerlo bien resuelto: el guionista del informe (AUDITORIA 1) se
      disparó de nuevo porque su webhook "dispara con CUALQUIER push del
      repo" (limitación ya documentada arriba, sección CANAL DE AVISOS
      BARRIDO→CHATGPT: `create_webhook_trigger` no acepta filtro por rutas ni
      ramas, y no hay API para borrar un webhook ya creado). Por eso hoy
      conviven dos soluciones a medias: el guionista del informe
      (`trig_01HUjC4MjKGmmpDMApn8gtJm`) usa webhook + guardas de dedup y
      ventana horaria, y el guionista de la Clave
      (`trig_017nkjJWR5Voud4dYgPhvwF7`) quedó como "esperadora pura" (solo
      reloj 03:50) precisamente para evitar el ruido del webhook. El propio
      `bitacora/cronograma.json` (fila "Guionista de la Clave") ya anota
      "pendiente fusionar los dos guionistas en una rutina reactiva". Revisar
      en la sesión local: si ya existen los PR de señal por evento (#2, #3,
      #4: barrido-listo, preseleccion-lista, informe-listo) que SÍ dan un
      commit específico y filtrable por archivo tocado, ¿pueden los dos
      guionistas (y quizás la revisión editorial) escuchar esos PR en vez del
      webhook general del repo, con guarda de dedup por fecha como ya usa el
      canal de avisos? Relacionado con TIEMPOS 1 (la propuesta de acortar la
      madrugada ya tocaba este mismo punto, "que los agentes dependientes
      escuchen"): esto podría resolverse como parte de esa migración en vez
      de por separado.

- [ ] **TIEMPOS 1: acortar la madrugada dos horas y que los agentes
      dependientes escuchen** (pedido de Santiago, 03-09). Propuesta completa
      en `bitacora/2026-09-03-propuesta-tiempos.md`: medido, la cadena tarda
      4 h 10 y trabaja 1 h 45. Tres movimientos: las rutinas de Claude nacen
      esperando su archivo de entrada con el bucle del guardia (revisión de
      dos vueltas, guardián a las 04:00); las tareas de ChatGPT a la hora
      medida con cláusula de espera corta en el contrato; y dos cadenas en
      paralelo con el workflow reentrante (el informe se rinde sin esperar a
      la Clave). Video listo ~03:35 en vez de 05:42, con tres horas de colchón
      para reintentar. Programar ya con las horas de verano del 06-09.
      Santiago la aprobó el 03-09 por la tarde para empezar esta noche y va
      a contrastar las propuestas con GPT antes; lo que GPT aporte se suma
      al archivo de la propuesta, no lo reemplaza. Corrección hecha en la
      propuesta: los minutos de Actions no iban al 93%; agosto cerró en 23%
      y septiembre lleva ~395 min en tres días, pero el ritmo de 150 min
      diarios por re-renders agotaría los 2.000 cerca del día 13.

- [ ] **ORDEN, noches 2 y 3** (una parte se hizo el 13-09: las disputas de
      REGLAS-DURAS.md estaban escritas como abiertas once días después de que
      Santiago las cerrara, y ya quedaron como registro cerrado) (`bitacora/2026-09-02-orden-del-repo.md`; la
      noche 1 se ejecutó el 02-09: archivo/, PENDIENTES limpio, decisiones
      reordenada con las huérfanas, README raíz y de estrategia). Noche 2:
      engordar el contrato y quitar las copias de los cinco prompts;
      recortar guion-claves y caso-seguimiento; verificar en la edición
      siguiente que nada cambió (la revisión de las 04:40 es el control).
      Noche 3: fusiones de ideas/ (video.md, audio.md, crecimiento.md,
      secciones-de-seguimiento.md), dejando los originales en archivo/
      hasta el visto bueno. Quedaron sin registrar 2 de las 8 decisiones
      huérfanas (los diseños de la web y una octava sin nombre): la sesión
      de día las precisa con su evidencia y se agregan.
- [ ] **DATOS 1: la base de series, una para validar y para dibujar.**
      `datos/series/<indicador>.json` (fuente, unidad, periodicidad, alias,
      valores), histórico inicial de los CSV del Banco Central y del INE;
      `validar-tarjetas.js` avisa cuando un [DATO] no calza con el valor
      publicado (el 5,1 contra 1,5 del 01-09); `build-timeline.js` adjunta
      los últimos 24 valores a las marcas `lineas`; y se construye
      `TarjetaDatoLineas` (hoy `tarjetas.tsx` la manda a comparación).
      Cierra VISUAL 2. Detalle: `ideas/imagen-y-retencion.md` punto 8.
      Disputa 9 pendiente (quién la alimenta: el vigía o la tarea de GPT).
- [ ] **DATOS 2: tarjetas.** (1) Párrafo → frase clave de hasta 20 palabras
      marcada en el guion, solo esa a pantalla. (2) Cifra con referencia
      abajo (valor anterior o mismo mes del año pasado, desde la base).
      (3) Count-up y flecha que se dibuja. (4) Cita con cargo, contexto y
      comilla grande; quitar el guion corto del nombre en TarjetaCita.
      Detalle: `ideas/imagen-y-retencion.md` punto 7.
- [ ] **IMAGEN 2: "En titulares" a 90 segundos.** Primero la opción B (tope
      de 12 palabras por titular; hoy miden ~30 y el bloque es el 23% del
      video) y mover el bloque ANTES del dato curioso. Medir en la edición
      siguiente; el tope de cantidad (opción A) rompe "nada queda sin
      sonar" y es la disputa 3, de Santiago.
- [ ] **IMAGEN 3: el tiempo casual y con dos localidades** (Santiago + una
      capital regional que ROTA por día del año, módulo 15; nunca nombrar
      lo que no va a pasar; máximo 12 palabras por localidad). Toca
      `prompts/informe.md` y `prompts/guion-informe.md`. Roza la disputa 4
      (el clima como excepción declarada).
- [ ] **IMAGEN 4: apertura en frío.** 0:00-0:12 la noticia de portada
      entera, después el sello, después la apertura acortada a 15 s. El
      sello cabe en la pausa de sección del TTS. El capítulo 1 pasa a
      llamarse por la noticia. (La mecánica del sello movible ya existe:
      `meta.selloEn`, IMAGEN 0.)
- [ ] **IMAGEN 5: puntaje de portada, una decisión para las tres.** El
      informe declara la NOTICIA DE PORTADA (0-10: alcance, consecuencia,
      nombre propio buscable, proximidad, novedad) y título, miniatura y
      apertura la leen de ahí. Esto absorbe también el defecto viejo de que
      la cifra de la miniatura puede ser de otra noticia que el titular, y
      el rediseño de miniaturas que Santiago pidió (se ven lavadas: probar
      lienzo invertido, máximo 4 palabras, legibilidad a 120 px).
      **Anotar el puntaje de cada edición en la bitácora y revisar en dos
      semanas si predice vistas.**
- [ ] **TALLER 1**: el panel de métricas como cuarto módulo del Taller
      (https://claude.ai/code/artifact/48d0192b-0b54-4d8c-9c72-4e628c520d0f),
      cuando el Taller lleve unos días de uso.
- [ ] **TALLER 2**: barrer las 38 rayas largas viejas del repo (previas a
      la regla; en src/tarjetas.tsx, workflows, README, scripts y un
      ejemplo).
- [ ] **PANEL 3 (decisión pendiente): el artifact publicado va un día
      atrás entre sesiones.** La causa de datos ya se corrigió (todo se
      dibuja desde HIST); queda que el artifact es una copia que solo se
      republica desde una sesión. Salidas: (a) republicar en cada sesión de
      la mañana; (b) servirlo desde la web pública en ruta no enlazada,
      recomendada por la sesión de día, PERO ojo de la noche: el panel
      trae ids de rutinas, horarios internos y pendientes; en una web
      pública "no enlazada" es seguridad por oscuridad. Si se toma la b,
      antes definir qué secciones NO viajan. (c) capacidad de datos en el
      artifact: descartada hoy.
- [ ] **VISUAL 3 (capas b y c)**: hallazgo `[MENOR]` "monotonía visual" en
      la revisión editorial (con cuidado) y el histórico de tipos por
      edición en el panel, con dos semanas de datos.
- [ ] **Verificar las fuentes, no solo citarlas**
      (`scripts/verificar-fuentes.js`): abrir las URLs del bloque interno
      del informe y buscar la cifra principal de cada noticia; lo que no
      calce, a la bitácora. Una noche.
- [ ] **Secciones Plata pública y Educación** en el informe + alinear las
      áreas de `prompts/seleccion.md` con las secciones de
      `prompts/informe.md` (hoy son dos listas distintas). Decisiones
      abiertas en `ideas/estado-de-las-noticias.md`.
- [ ] **Extraer la línea base de "¿Lo cumplió?"** (solo local: la nube no
      abre servel.cl): bajar el PDF del Servel al repo, clasificar según el
      criterio congelado el 28-08, 30 a 50 fichas, commit de congelación.

## Para la sesión de día (solo análisis)

- [ ] **23-10, HOY: la cifra de comunas con clases suspendidas en el Gran
      Concepción sigue sin cerrar, y pasó a HOY como anticipó el 21-10.**
      Auditoría del 23-10 (`bitacora/2026-10-23-auditoria.md`). El 21-10 esta
      auditoría dejó en MIRAR: "si Mineduc sigue sin publicar y mañana
      tampoco hay marca nueva, pasa a HOY" (`bitacora/2026-10-21-auditoria.md`).
      El 22-10 no tuvo edición, así que hoy fue la primera oportunidad real
      de cerrarla, y no se cerró: `contenido/informes/2026-10-23.md:9` y
      `:162` repiten "clases suspendidas en el Gran Concepción" sin número
      y sin una marca `PENDIENTE DE CIERRE` nueva. `contenido/revisiones/2026-10-23.md`
      (hallazgo 2) confirma la contradicción sin resolver: BioBioChile cuenta
      seis comunas, La Tercera cuenta cuatro. Propuesta: verificar si
      Mineduc, la intendencia del Biobío o la Seremi de Educación publicaron
      un número consolidado; si no, que el informe de mañana abra una marca
      `PENDIENTE DE CIERRE` nueva en vez de repetir la frase sin fecha.

- [ ] **13-10: revisar el primer informe corto al aire** (duración, retención a los 40 s comparada con el promedio del largo, vistas a las 24 h)
- [ ] **27-09: revisar el primer video de producción con la secuencia del
      24-09** (imagen de sección toda la sección, oscurecida, texto encima;
      encendida con `SECUENCIA=2409` en edicion-diaria.yml, commit 984a461).
      Mirar cabeceras (cortas o sin título si la voz no dejó pausas), la fila
      del mosaico (apretada) y la portada. Si falló el render por la
      secuencia: `SECUENCIA` en blanco y relanzar. bitacora/2026-09-27.md.
- [ ] **27-09: la voz debe dejar pausas de 2,5 s entre secciones** para que
      las cabeceras de la secuencia quepan en producción (hoy el plan las
      recorta al aire disponible). Es trabajo del TTS (scripts/tts-azure.js /
      build-timeline); proponer con alcance medido.

- [ ] **Dónde se nota la IA**: lista de frases concretas con cita, sobre
      los informes publicados.
- [ ] **Inventario de errores reales** en los informes, separando error de
      hecho de omisión deliberada.
- [ ] **Auditar el criterio de selección** con varios días, a ver si el
      sesgo del 28-08 se repite.
- [ ] Ver videos de El Shot y otros canales chilenos con
      `ideas/formato-video.md` al lado: qué hacen en los primeros 30 s.
- [ ] Precisar, con evidencia, las dos decisiones huérfanas que faltan en
      decisiones.md (diseños de la web + la octava del conteo del 02-09).

## Ideas para retomar (no son tareas todavía)

- **Nota de arquitectura**: plata pública, historias abiertas y promesas
  son el mismo mecanismo (entidad con estado, evidencia fechada y una
  pregunta que la cierra). Construirlo una vez, usarlo tres veces.
- **Retención fase 2** (`ideas/retencion.md`, `ideas/formato-video.md`):
  cold open del Short, versión 15 s en días de noticia enorme, comentario
  fijado con el link al informe.

## Diferido

Palabra del día · canal de WhatsApp · Ko-fi. (Los indicadores del país
dejaron de estar diferidos: son DATOS 1.)

- [ ] **El escudo de la testera de congreso, por imagen a imagen**. `congreso-a.png`
      tiene el hemiciclo correcto y la testera vacía: le falta el escudo nacional
      de mármol de Francisco Torres y los motivos de cobre de Mario Vásquez, que
      son lo único que distingue esa sala de cualquier parlamento moderno. Dos
      pedidos por texto no lo trajeron (evidencia en `bitacora/2026-09-29.md`,
      "Entra congreso"). Desde la corrección del bloque la vía es más barata: el
      párrafo de la cosa real ahora dice BUSCA una fotografía real, que es la
      línea con la que salió la sala correcta, así que la referencia la consigue
      el generador y no hay que pasarle nada a mano. Es una vuelta más de
      pedido. Sin urgencia, la imagen actual ya sirve.
