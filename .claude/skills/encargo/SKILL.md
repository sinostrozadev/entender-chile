---
name: encargo
description: Plantilla para delegar una tarea a un agente ejecutor de Entender Chile. Produce el texto del encargo con contexto mínimo, lista cerrada de archivos, criterio de terminado, verificación, commit y reporte, y dice qué modelo conviene para cada tipo de trabajo. Usar antes de lanzar un subagente, no después.
---

# Cómo se escribe un encargo

Un encargo mal escrito se paga dos veces: en los tokens que el ejecutor gasta
buscando lo que no le dijiste, y en el trabajo que hay que rehacer. La cura no
es escribir más, es cerrar las listas: qué lee, qué toca, cuándo terminó.

Las reglas fijas del repo (sin rayas largas, fechas, español, commits,
escritura verificada) **no se repiten en el encargo**: se citan. Una línea
basta: "Las reglas fijas están en `CLAUDE.md` de la raíz; se cumplen todas."

## Las secciones, todas obligatorias

**Contexto mínimo.** Qué leer, con rutas exactas, y **qué NO leer**. Lo segundo
importa tanto como lo primero: sin ese límite el ejecutor abre la bitácora
entera. Si una regla vive en un archivo largo, dile en qué sección está.

**Archivos que toca.** Lista cerrada, con rutas. Se dice explícitamente si son
nuevos o existentes. Fuera de esa lista no se toca nada.

**Qué cambia exactamente.** Por archivo: qué contenido va, con qué estructura y
de dónde sale cada dato. Si un dato hay que extraerlo, se nombra el archivo
fuente. Si hay que decidir algo, se dice cómo se decide.

**Qué no tocar.** Lo que está cerca y podría parecer parte del trabajo:
archivos vecinos, formatos que no cambian, ramas, el push.

**Criterio de terminado.** En qué estado queda el repo. Es una lista de
condiciones comprobables, no una descripción de intenciones.

**Cómo se verifica.** Los comandos, escritos para copiar y pegar, con el
resultado que se espera de cada uno. Ejemplo: `wc -l CLAUDE.md` debe dar 90 o
menos; el conteo de rayas largas y medias sobre los archivos nuevos (con
`grep -c` y esos dos caracteres en el patrón) debe dar 0.

**Commit.** Uno, local, **sin push**. Se da el encabezado exacto y qué tiene
que explicar el cuerpo (el porqué). Se recuerda la última línea
`Co-Authored-By:` con el modelo que escribe.

**Reporte.** Qué tiene que devolver: archivos creados o tocados, rama o
worktree y hash del commit, **qué verificó** y con qué comando, **qué NO pudo
verificar**, y las dudas. Sin el "no verificado" explícito, todo reporte suena
igual de terminado.

## Qué modelo usar

- **Explore o Sonnet** para solo lectura: buscar, inventariar, ubicar dónde
  vive algo. No escriben, así que no hay riesgo y el ahorro es grande.
- **Opus** para ejecutar: escribir archivos, cambiar código, commitear. Es el
  que entiende un encargo largo sin que haya que repetírselo.
- **Haiku** para relojes y comandos triviales: tocar un archivo y pushear,
  despertar un workflow, una comprobación de una línea.
- **La sesión principal** no ejecuta: analiza, diseña e instruye. Si se pone a
  escribir archivos, pierde el contexto que la hace útil.
- Regla práctica: si el trabajo cabe en un comando, es Haiku; si cabe en una
  búsqueda, es Explore; si hay que decidir mientras se escribe, es Opus.

## Antes de mandarlo

Léelo como si no supieras nada del proyecto. Si en algún punto tendrías que
adivinar o salir a buscar un archivo que no está nombrado, ese punto le va a
costar al ejecutor diez veces lo que te cuesta a ti arreglarlo ahora.
