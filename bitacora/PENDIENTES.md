# Pendientes

Lista viva (regla 41). Lo hecho se borra, no se tacha: para saber qué pasó
están `REALIZADOS.md` y el archivo del día. Lo que salió de esta lista el
01-11-2026 (secciones históricas, entradas hechas y entradas que el modelo
nuevo dejó sin objeto) está en `bitacora/2026-11-01-pendientes-historia.md`.

Última actualización: 03-11-2026, sesión de la noche: salen el clasificador
de áreas, las URL de Interferencia, el cuadro del panel, la marca `[FUENTE] X`
de `parse.js`, la cama del piloto de Rabat y la Clave del tratado (descartada);
las dos tareas del 04-11 (carátulas descartadas y animación del cambio de día)
salen porque se ejecutan en encargos aparte esta misma noche.

---

## EL MODELO NUEVO (01-11-2026)

Decisiones de Santiago del 01-11-2026 (`estrategia/decisiones.md`, "Tomar el
control"; REGLAS-DURAS versión 2). Ninguna sesión vuelve a proponer lo que
aquí queda descartado:

1. **La meta es la audiencia, con los Shorts como producto principal.** No se
   persiguen las 4.000 horas (regla 39).
2. **La Clave es el LARGO POR TEMA**, sin calendario: uno o dos por día de
   temas distintos, o ninguno; cada uno cuenta un caso desde su origen, con
   actualización cuando el caso avanza; escenario, el diario escrito con zoom
   a la sección del día de cada noticia (regla 14). Sale a las 19:00.
3. **Estado al 04-11-2026** (decisión "El despegue"): el informe en video y
   los exprés están apagados. Sigue el diario escrito todos los días en
   https://entender.sinodev.cl; sigue el guion narrado del informe, del que
   salen el Short del día (se queda y se mejora: mediana 104 vistas, pero no
   sale todos los días) y el podcast, que hoy lee la voz de ese guion. Que el
   podcast lea el diario escrito está decidido y sin construir.
4. **La hora es la del workflow**: Short 12:00, largo por tema (Entender el
   caso) 19:00; `ideas/viralizacion.md` ya no manda.
5. **Sin gastos nuevos**: ni ElevenLabs ni clips generativos. La biblioteca de
   dibujos, el prompt del informe de la mañana y la interfaz `taller/` ya están
   en `archivo/`.

6. **El largo por tema se llama "Entender el caso"** y su piloto es la rebaja de
   condenas de Rabat y Silva (noticias del diario desde el 24-10-2026); diseño
   en `bitacora/2026-11-01-analisis-y-plan.md`, sección 6.

**En construcción** (desde el 04-11-2026 Claude decide y ejecuta; Santiago se
entera): el podcast
que lee el diario escrito, el Short del día todos los días; el largo por tema ya
tiene flujo y render desde el 02-11-2026 y está en piloto.

---

## DEPENDEN DE SANTIAGO

- [ ] **06-11, HOY: dos videos públicos con historial real desaparecieron de
      la lista de subidas de YouTube entre la métricas del 05-11 y las de
      hoy, sin ningún commit ni archivo del repo que registre que alguien
      los tocó.** Comparando `bitacora/metricas/2026-11-05.json` contra
      `bitacora/metricas/2026-11-06.json` por id de video (no por título,
      que trunca y puede colisionar): `FVu5s1yBu7Q` ("¿Qué cambió en Chile a
      siete años del estallido social? #Sho", Short publicado 18-10-2026,
      169 vistas, 6 me gusta, 3 comentarios) y `nvG_C4evsL8` ("¿Quién fue
      Patricio Guzmán, el documentalista que despide Ch", publicado
      15-09-2026, 314 vistas, 10 me gusta) estaban `public` ayer y hoy no
      aparecen en absoluto en la lista que trajo la API, ni `private` ni
      `public`. Detalle completo en `bitacora/2026-11-06-auditoria.md`,
      hallazgo 2. Pide revisar en YouTube Studio, Contenido, buscando esos
      dos IDs por `youtube.com/watch?v=<id>`: si Studio los muestra
      eliminados por copyright o por infracción de normas de comunidad, es
      una alerta de cuenta; si Studio los muestra activos, el problema está
      en la paginación de `scripts/metricas.js` (línea 48) y hay que
      revisarla antes de que una corrida futura pise el dato bueno con uno
      incompleto. Dueño: Santiago (acceso a Studio; cuenta de YouTube).

- [ ] **Redirigir la copia vieja de GitHub Pages (repo `entender-chile-web`) a
      https://entender.sinodev.cl y apagar esa publicación**, cuando el dominio
      lleve una semana estable. Ojo: Spotify tiene registrado el feed en la
      dirección vieja (`podcast.xml`); antes de apagarla hay que cambiar el
      feed en Spotify for Creators o dejar una redirección que lo siga
      sirviendo. Evidencia: cabecera de `.github/workflows/web.yml`. Dueño:
      Santiago.

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
      **05-11: cuarta vez, y la primera con el motivo exacto de la API en vez
      de inferido.** `get_trigger` sobre la rutina del Observatorio de plata
      pública (`trig_01MzKjYwnyH8PfJfCBrtJvv4`) devolvió
      `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED` a las
      01:45:44 Chile; la misma ventana (01:41 a 04:11) dejó sin pushear a los
      tres relojes del reintento y atrasó la preselección 2 h 41 min, aunque
      la cadena se recuperó sola. `bitacora/2026-11-05-auditoria.md`.
      **06-11: quinta vez.** `get_trigger` sobre el Reloj del barrido
      (`trig_01W5KEjHbr5wWPsmmJ4ygNEh`) devolvió el mismo
      `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED` a las
      01:39:54 Chile; el barrido real no corrió hasta las 02:37, 67 minutos
      sobre el cron, disparado por uno de los relojes de reintento de 20
      minutos. La cadena se recuperó sola y sin vueltas extra.
      `bitacora/2026-11-06-auditoria.md`.

- [ ] **01-11: borrar en GitHub los secrets `ELEVENLABS_API_KEY` y
      `VOICE_ID`, ya sin uso.** La limpieza del 01-11 sacó los restos de
      ElevenLabs de `.github/workflows/edicion-diaria.yml` (commits faf7bad9 y
      a0cfa35e) y la decisión 5 deja la voz en Azure. Santiago dio el sí, pero
      una sesión no puede tocar secrets desde el entorno: se borran en
      Settings, Secrets and variables, Actions, icono de la papelera.
      Dueño: Santiago.

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
- [ ] **Abrir la red de salida de la sesión de día** a `suseso.gob.cl`,
      `bcn.cl`, `dipres.gob.cl` y `support.google.com` (pedido del 06-10). Son
      las fuentes de las que dependen la Clave y la revisión de carátulas, y
      hoy el proxy las bloquea enteras: por eso la política de miniaturas se
      delegó a GPT (`.github/workflows/doc-youtube.yml`). Es política de red
      del entorno, no un secreto. Dueño: Santiago.

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

- [ ] **Reservar el handle** @entenderchile en TikTok e Instagram (no
      implica publicar).
- [ ] **Funciones avanzadas de YouTube**: Settings → Channel → Feature
      eligibility → Advanced (cédula o video). Desbloquea enlaces externos,
      pruebas A/B de miniaturas y la postulación a monetización.
- [ ] **Facebook**: el Reel diario de la fase 1 (dos semanas midiendo antes
      de automatizar; plan en `ideas/facebook.md`).
- [ ] **Tagline**: sigue en duda "El resumen sin gritos"; alternativas en
      `ideas/tagline-alternativas.md`.
- [ ] **Música de los Shorts**: elegir una pista en la Biblioteca de audio
      de YouTube, si se quiere música (hoy salen sin ella y funcionan).
- [ ] **Notificaciones**: permitir que la app de Claude se salte el modo
      silencio en Android, si quieres que las alertas de madrugada
      despierten.

### 24-10-2026, URGENTE: el Short exprés de las rebajas de condena salió publicado con errores

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
- [ ] **02-11: aprobar la pauta del piloto Entender el caso (Rabat)**, `contenido/claves/flujo/rabat-rebajas-de-condena/pauta.md`, con los dos cambios pedidos (duración 8 a 10 minutos; carátula 1 sin "salieron antes"). Se aprueba con `node scripts/clave.js aprobar rabat-rebajas-de-condena --fecha AAAA-MM-DD` o pidiendo cambios con `cambiar --nota`. Dueño: Santiago.

---

## PARA LA SESIÓN DE LA NOCHE (necesita secrets o rutinas)

- [ ] **01-11: el prompt del reloj del barrido debe fallar si el push no entró** (texto propuesto en bitacora/2026-11-01.md)

- [ ] **01-11: sacar el camino de pintura de la biblioteca, que quedó sin
      alimento.** La biblioteca de dibujos se archivó el 01-11 (decisión 5),
      pero el video todavía trae su rama: `src/fondo-biblioteca.tsx`, la rama
      `ev.imagen` de `src/tarjetas.tsx` (líneas 655 a 667) y el filtro de
      `src/Informe.tsx:182`. Pide render de comparación antes y después para
      probar que el informe sale igual. Dueño: noche.

### 23-10-2026: cambiar título y carátula del informe del 23-10 ya publicado

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

### 16-10-2026: rendir de nuevo la Clave de licencias, con voz, y reemplazar la que está en YouTube

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

- [ ] **12-10: shorts y exprés con imagen propia** (plan propuesto a Santiago,
      falta su sí): el Short del día usa la portada del informe recortada en
      vertical; cada exprés pide una imagen a GPT con el tema, que sirve de
      fondo y de carátula, con caída al fondo de sección si no llega; texto en
      bloques y sonido de la casa en los dos. Ojo con el tope del generador
      (23-09: seis imágenes en dos horas).

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

- [ ] **26-09: `contenido/README.md` describe el flujo viejo** (veredicto de la
      revisión editorial, Clave diaria). La limpieza del 26-09 reescribió los
      README de las subcarpetas pero no este mapa. Reescribirlo corto,
      apuntando a los README de cada subcarpeta.

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

- [ ] **EL ARMAZÓN NO ES UNA LISTA, ES UN REGEX CON AGUJEROS (28-09).**
      `scripts/parse.js:31` decide con un regex escrito a mano cuáles bloques
      son estructura (Apertura, Cierre, Agenda, En titulares, La noticia del
      día, ¿En qué quedó?) y por lo tanto no se anuncian con voz ni llevan
      color de tema. Deja fuera variantes que los guiones YA escribieron
      (`Agenda de hoy`, la familia `En qué quedó...` con el caso pegado atrás),
      y un bloque del armazón leído como tema **el locutor lo anuncia en voz
      alta** desde el 28-09 (`ENTRADA_VOZ`). Son listas que no hablan entre
      sí: `parse.js:31` y `NO_NOTICIA` en `scripts/short.js` (qué no entra al
      Short); la tercera, la de la muestra corta de voz, se archivó el
      04-11-2026. La de `short.js` **no está
      anclada y ya falla**: descarta el titular "Cierre de Orionx" porque
      contiene la palabra cierre. Con la interfaz `taller/` retirada el
      01-11-2026, la salida es anclar y unificar los regex en el código.
      Dueño: el día propone, con el sí de Santiago.

- [ ] **EL ARCHIVO DE PROMPTS DE SECCIÓN MIENTE (28-09).**
      `contenido/secciones/PROMPTS-PARA-PEGAR.md` describe en su bloque fijo
      versión 3 un fondo de color apagado con el motivo en blanco hueso, y las
      imágenes que están al aire son papel casi blanco con el dibujo oscuro
      (medido: #F1F0F1, #EAEBE8, #ECEDE9). Quien pegue ese prompt genera algo
      que no calza. Arreglarlo es media hora. **Dueño: el día.**

- [ ] **Revisar qué MÁS depende de un push del bot.** El 14-09 se descubrió que
      `estado.yml` no se enteraba del barrido porque los pushes con
      GITHUB_TOKEN no disparan workflows. Se arregló con `workflow_run`, pero
      la misma trampa puede estar en otros lados: `web.yml` escucha rutas de
      contenido y hay piezas que commitea el bot (descripciones, podcast,
      métricas). Listar qué workflow escucha a qué, y cuál de esos disparos
      viene de un push de bot. Una noche.
---

## PARA LA SESIÓN DE DÍA

- [ ] **01-11: GPT entregó dos carátulas inservibles (31-10 corrupta, 01-11 truncada)**: el .png del 31-10 no tiene firma PNG (bytes al azar, igual que `contenido/caratulas/2026-10-24.png`, que sigue en el repo) y el del 01-11 se cortó en 786.445 bytes sin IEND, como el 28-09. Ninguna de las dos falló por diseño: el texto dentro de la imagen es lo que pide `prompts/caratula-pedido.txt` desde el 05-10 y la del 01-11 medía 1672x941, que es 16:9. Revisar en `prompts/imagen-caratula.md` (paso 3 bis) y en el pedido por qué GPT no comprueba bytes e IEND antes de dar por subida la imagen, y si conviene que el validador mire la carátula (`caratulaUsable` de `scripts/imagen-entera.js`) antes del render. Dueño: día.

### Clave de la AFP: antes de la revisión final de Santiago, revisar carátulas y paneles

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
- [ ] **23-10: lo que la primera corrida real de los paneles tiene que mirar.**
      La Clave `afp-multifondos-perdidas-fondo-e` está en la etapa `paneles`
      (`contenido/estado/clave-afp-multifondos-perdidas-fondo-e.md`). Es la
      primera vez que se le piden a GPT diez imágenes con nombres de archivo
      exactos. Si en la primera tanda faltan imágenes, el sistema reabre por
      las que falten; si tras dos reintentos siguen faltando, deja
      `paneles/NO-PUDE.md` y la Clave queda en `bloqueado_humano`. Detalle en
      `contenido/claves/flujo/README.md`. Dueño: día.

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

- [ ] **12-10: las Claves sobre 11:30 retienen mal.** Medido sobre
      `bitacora/metricas/2026-10-06.json`: las seis Claves que duran entre 9:11
      y 11:26 retienen entre 34% y 50%; las tres que pasan de 11:28 retienen
      15%, 0,7% y 15%. La de licencias dura 12:53. Son tres videos y está
      confundido con el tema, así que no es para decidir todavía: es para mirar
      cuando haya dos o tres Claves de mural publicadas. Lo que sí está medido y
      no necesita más muestra: la Clave retiene 39,7% mediana contra 20,6% del
      informe, y convierte mejor (CTR 2,06% contra 1,59%). El problema de la
      Clave no es la pieza, es la exposición: 1.720 impresiones contra 16.893.

- [ ] **02-11: la captura reescribe la fecha de cabecera según la clase `.cab-fecha` de la web.** `scripts/largo-diario.js` depende de ese nombre; si la web la cambia, la línea de la fecha se esconde en el render. Solo actuar si la web cambia (agregar una prueba o fijar el selector). Dueño: día.

---

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
