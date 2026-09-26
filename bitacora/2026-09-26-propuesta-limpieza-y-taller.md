# Propuesta: limpieza del repo y Taller de una página (26-09-2026)

Para validar por Santiago. Con el visto bueno, cada bloque se convierte en un
encargo a un agente Opus con esta lista como especificación. El inventario
completo (tabla por carpeta, con referencias y fecha del último commit) lo
hizo un agente de solo lectura la noche del 26; aquí va lo que se decide.

Criterio de la casa (regla del 02-09): nada se borra, se retira a `archivo/`
con una nota de qué fue y qué lo reemplazó en `archivo/README.md`. Lo único
que se borra de verdad son binarios de prueba que no aportan.

## A. Retirar a archivo/ (no requiere decisión, ya está claro)

Prompts de flujos que ya no existen:
- `prompts/guionista.md` (guionista de Claude; hoy el guion lo escribe GPT).
- `prompts/revision-editorial.md` (revisión de las 04:45; la absorbió el
  validador en `validar_final`).
- `prompts/prueba-flujo.md` y `prompts/prueba-validador.md` (prueba de la
  máquina v2, superada por la v3).
- `prompts/respaldo-informe.md` y `prompts/respaldo-preseleccion.md` (sus
  rutinas ya no existen; el respaldo hoy es el suplente con la regla 20 y 20).
- `prompts/banco-temas.md` (lo mueve el encargo del tema de la semana).

Workflows:
- `.github/workflows/prueba-flujo.yml` (sigue ACTIVO en GitHub; su propia
  cabecera dice que se puede borrar).
- `.github/workflows/senal-informe.yml` y `senal-preseleccion.yml`
  (deshabilitados a mano en GitHub desde el 14-09; los archivos siguen).

Taller viejo: `taller/app.js`, `taller/body.html`, `taller/head.html` y
`scripts/taller.js` (02-09; reemplazados por el Taller nuevo, ver sección D).

Carpeta `revisar/` completa (su README dice que nada de ahí participa del
día a día; lleva un mes esperando): `generar.js`, `propuesta-pipeline-
editorial.md`, `guion-real-2026-08-23.md` (duplicado de `ejemplos/`), y
BORRAR `informe-claude.mp3` y `logo-claude.mp3` (800 KB de una prueba).
`temario maestro historia de Chile.md` se decide en C.

Ejemplos superados: `ejemplos/demo-cambios-02-09.js`, `ejemplos/fondos-
lamina.tsx`, `ejemplos/fondos-video.tsx` (los reemplaza
`src/taller-secciones.tsx`). Se quedan `guion-2026-08-23.md`,
`timeline.ejemplo.json` (lo usa el build) y `short-urgente-demo.tsx`.

Evidencia y datos congelados: `bitacora/capturas-*.jpg` (seis, decisiones ya
cerradas) a `archivo/capturas/`; `bitacora/panel/consumo.json` y
`madrugadas.json` (nadie los lee desde el 01-09).

Docs: `docs/auditoria-api/respuesta-revision-2026-09-02.md` (marcado "NO
ENVIADO") y `log-subida-2026-09-06.txt`.

Disco local, fuera de git: seis mp3 sueltos en `public/` (70 MB, renders de
agosto, ya ignorados por git). Se borran del disco.

## B. Reescribir o limpiar (no requiere decisión)

- `README.md` de la raíz (08-09) y `prompts/README.md` (29-08): describen la
  arquitectura anterior al 14-09 (cuatro tareas de GPT por horario, Clave
  diaria, guionista, revisión 04:45, señales #3/#4). Se reescriben cortos,
  apuntando a `despachador-gpt.md`, `validador.md`, `estado.yml`,
  `estado-clave.yml` y `REGLAS-DURAS.md` como fuente de la arquitectura
  vigente, y al Taller. El cuadro de horarios viejo va a `archivo/`.
- `prompts/informe.md` y `prompts/claves.md`: quitar el PASO CERO viejo que
  espera las señales #3/#4 (dejar solo lo que usa el despachador; en
  `claves.md` queda el MODO FLUJO).
- `prompts/validador.md`: quitar la mención residual a prueba-flujo.
- `ideas/README.md`: describe mover ideas a `ejecutar.md` y `hechas.md`, que
  ya no existen; el flujo real es evaluar.md, PENDIENTES.md, REALIZADOS.md.
- `ideas/shorts-diarios.md`, `sonido-y-transiciones.md`, `voz-opciones.md`:
  ya están hechas; se anotan en REALIZADOS con fecha y se retiran.
- `contenido/`: README de una línea en las subcarpetas que no lo tienen
  (informes, preseleccion, revisiones, veredictos, descripciones, urgente,
  secciones, claves), diciendo quién escribe ahí y con qué prompt.
- `.gitignore`: agregar `.claude/worktrees/` (los agentes crean worktrees ahí).

## C. Requieren tu decisión (ACLARAR)

1. `prompts/investigacion-clave.md`: prompt bien escrito, pero ningún flujo lo
   dispara. Recomiendo CONECTARLO al flujo de la Clave del tema de la semana
   como pedido a GPT entre la idea aprobada y la entrega (GPT sí navega; la
   Clave profunda necesita fuentes). Alternativa: retirarlo.
2. `scripts/tts-elevenlabs.js`: Azure es la voz de producción con respaldo
   S0. Recomiendo retirarlo. Si quieres conservar ElevenLabs como opción
   futura, se queda con una nota.
3. `revisar/temario maestro historia de Chile.md`: ¿la serie de Historia de
   Chile sigue en pie? Si sí, va a `ideas/`; si no, a `archivo/`.
4. `docs/auditoria-api/` (RESPUESTAS.md, correo, capturas): la decisión del
   07-09 fue no responder la revisión. Si el trámite está cerrado, toda la
   carpeta va a `archivo/` dejando `DECISION-07-09.md` y el README.
5. `scripts/manana.sh` (rutina local de la mañana del 25-08): ¿la sigues
   usando? Si no, se retira.
6. `taller-voz*.js`, `taller-*.tsx` (bancos de pruebas visuales y de voz del
   24-09): se quedan como herramientas del Taller (sección D). Confirmar.

## D. El Taller de una página

Base: `scripts/taller-tablero.js` (fase 1 del 20-09) pasa a llamarse
`scripts/taller.js` cuando se retire el viejo. Genera UNA página, publicada
como artefacto privado con URL fija (fijada en la barra de claude.ai), con
una barra de módulos para navegar sin salir de ella:

1. **Hoy**: estado del día (etapa, vuelta, pieza), salud de la madrugada
   (qué llegó y a qué hora), última auditoría, y botones de emergencia.
2. **Semana**: ranking del tema de la semana y los tres candidatos, con el
   botón "Elegir este tema" en cada uno.
3. **Clave**: flujos abiertos con su etapa; botones "Aprobar idea", "Pedir
   cambios" (con campo de nota) y "Fijar fecha".
4. **Medir**: métricas, retención por video, impresiones y CTR, fuentes de
   tráfico (lo que ya hace la fase 1).
5. **Experimentos**: `experimentos.json` con estado y resultado.
6. **Prompts**: cada prompt vivo con sus vueltas de corrección de la semana y
   los hallazgos del validador; botón "Editar en GitHub".
7. **Flujos y rutinas**: el diagrama de la cadena y el inventario
   `bitacora/rutinas.md` (id, hora, para qué, desde dónde se edita).

**Los botones, sin tokens ni secretos.** Cada botón es un enlace que abre
GitHub con el trabajo ya hecho, y tú solo confirmas:
- Decisiones que son un archivo (elegir tema, aprobar idea, pedir cambios):
  enlace a "nuevo archivo" de GitHub con la ruta y el contenido ya
  rellenados (`/new/main?filename=...&value=...`). Al apretar "Commit", el
  push mueve la máquina (estado-clave.yml) igual que `clave.js`.
- Acciones que son un workflow (relanzar el barrido, simular el reintento,
  cambiar una carátula, producir un exprés): enlace a la página "Run
  workflow" de ese workflow, con las instrucciones de qué poner.
- Prompts: enlace al editor de GitHub del archivo.
Funciona desde el teléfono y no consume cuota de nadie.

**Cómo se refresca.** Fase 2 (esta semana): la sesión que trabaje (día o
noche) corre `node scripts/taller.js` y republica a la misma URL; un comando.
Fase 3 (a evaluar): que la página lea el repo en vivo por el conector de
GitHub del artefacto, para que no haya que republicar.

**Qué se retira con esto**: el panel interno viejo (`bitacora/panel-interno.html`
y sus inyectores `panel-cronograma.js`, `panel-auditoria.js`) se fusiona en el
módulo Hoy y Medir. Se hace en un segundo paso, cuando el Taller ya esté en
uso, para no quedarse sin panel a medio camino.

## E. Orden de ejecución propuesto

1. Encargo "limpieza A+B" (Opus, un commit por bloque, sin push; la noche
   revisa y sube). Sin tocar nada de C hasta tener tus respuestas.
2. Encargo "Taller fase 2" (Opus): la página de una sola vez con los siete
   módulos y los botones; se muestra antes de retirar el panel viejo.
3. Cierre: `archivo/README.md`, REALIZADOS, decisiones.md.
