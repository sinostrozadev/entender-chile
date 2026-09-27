# Cuadro de horarios de la madrugada (versión de septiembre de 2026)

Retirado del `README.md` de la raíz el 26-09-2026. Describía la máquina
anterior al 14-09: cuatro tareas de ChatGPT por horario, Clave diaria,
guionista de Claude, revisión editorial de las 04:45 y las señales #3 y #4.
Nada de eso existe hoy: la cadena es lineal, la despierta el PR #6 pieza por
pieza y, después del barrido, no tiene hora fija por tarea.

Se guarda porque es el mapa de cómo corría el canal en sus primeras tres
semanas y explica por qué varias decisiones quedaron donde quedaron (el cron de
GitHub como red y no como reloj, la edición reentrante por pieza, el despacho
explícito de la web). El inventario vigente de rutinas y workflows vive en
`bitacora/rutinas.md`, que se edita en el mismo commit que la rutina.

## La madrugada, de verdad

El cuadro de horarios completo y verificado vive en
`bitacora/2026-08-28-quien-ejecuta-que.md` y, siempre al día, en
`bitacora/cronograma.json` (lo dibuja el panel interno). En corto (hora de
Chile, UTC-3 desde el 06-09):

```
01:30  reloj de Claude toca el despertador → workflow del BARRIDO (22 fuentes)
       → al terminar emite el evento del PR #2
~01:38 preselección → PR #3 → ~01:45 informe → PR #4 → ~01:50 Clave
       (tareas de ChatGPT, cada una despierta con el evento anterior;
       leen prompts/ del repo y pushean)
01:45  observatorio de plata pública (rutina de Claude, en paralelo)
~01:52 guionista de Claude (informe y Clave): cada push lo despierta y escribe
       el guion que falte; relojes de respaldo 03:35 y 03:50
04:45  revisión editorial (rutina de Claude en Fable): veredicto, y si una cifra
       está mal y se comprueba la correcta, corrige y republica → su push
       TIMBRA la edición
~04:50 workflow EDICIÓN DIARIA: render 1440p con voz, 4 piezas, miniaturas,
       release, subida PRIVADA a YouTube, podcast, web (~70 min en frío)
05:00  reloj de métricas → workflow de MÉTRICAS (Data + Analytics → bitacora/ y panel)
05:30  auditoría matinal (rutina de Claude): cómo salió la máquina, triage
06:00  informe de la mañana (rutina de Claude, Opus): el resumen al teléfono
08-22  guardia cada 2 h (rutina de Claude) → Short exprés si caza algo
```

Reglas de infraestructura ya pagadas con errores: el cron de GitHub NUNCA es
reloj principal (solo red de respaldo; decisión del 31-08); la edición es
**reentrante por pieza** (una Clave atrasada se produce sola con
`workflow_dispatch`, sin rehacer el informe); y los pushes de bots no
disparan workflows, por eso el paso 8 despacha la web explícitamente.
