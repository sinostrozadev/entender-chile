ESTADO: CON FALLAS — la cadena lineal v3, en su primera noche real en producción, se congeló completa a las 01:44 de Chile: `estado.yml` no escucha `contenido/veredictos/**`, así que el push del validador (que el propio `prompts/validador.md` dice que "es lo que recalcula el estado y despierta a GPT") no disparó nada. La preselección quedó APROBADA hace casi cuatro horas sin que nadie lo notara y hoy, a la hora de esta auditoría, no existen ni informe, ni guion, ni Clave, ni videos: es HOY.

Auditada el 15-09-2026 a las 05:34 de Chile (08:34 UTC), con el checkout sincronizado contra `origin/main` (`19c180b`, "métricas 2026-09-15 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 14-09-2026, ya describe la v3).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:33:26 | ok |
| Preselección (GPT) | ~01:38 | 01:41:55 | ok |
| Estado → `validar_preseleccion` | tras la pieza | 01:42:07 | ok |
| Veredicto preselección (Claude): **APROBADA, vuelta 0** | tras la pieza | 01:44:28 | escrito y pusheado, pero **sin efecto**: no recalculó el estado |
| Observatorio plata pública | 01:45 | 01:53:41 | +8 min, dentro de lo normal |
| Informe (GPT) | ~02:00 | — | **falta**, nunca se disparó |
| Guion del informe | ~02:10–03:10 | — | falta |
| Entrega de Clave | ~02:30–03:40 | — | falta |
| Guion de la Clave | ~02:35–04:10 | — | falta |
| Revisión final (`contenido/revisiones/2026-09-15.md`) | ~04:30 | — | falta |
| Edición diaria (compuerta, render, videos) | ~04:00 | — | no arrancó: exige la revisión APROBADA, que no existe |
| Reloj de métricas → Métricas | 05:00 | despertador 05:05:48 → archivo 05:06:45 | +6 min, ok |
| Auditoría matinal (esta) | 05:30 | 05:34 | +4 min, ok |

`contenido/estado/2026-09-15.md` sigue mostrando `ETAPA: validar_preseleccion`, `VEREDICTO: pendiente`, `ACTUALIZADO: 01:42` — de **antes** de que el veredicto existiera (01:44). Verificado en `contenido/veredictos/`: solo hay un archivo, `2026-09-15-preseleccion.md` (debería haber cinco al cerrar el día). Verificado con `git log` que no hay ningún commit sobre `contenido/informes/`, `contenido/guiones/` ni `contenido/claves/` con fecha 2026-09-15.

## Qué falló

**La causa, verificada línea por línea.** `.github/workflows/estado.yml` líneas 19-26 declara los `paths` que disparan el recálculo del estado con cada push:

```
paths:
  - "contenido/barrido/**"
  - "contenido/preseleccion/**"
  - "contenido/informes/**"
  - "contenido/claves/**"
  - "contenido/guiones/**"
  - "contenido/revisiones/**"
  - "contenido/descripciones/**"
```

Falta `contenido/veredictos/**`. Es la carpeta que la v3 introdujo hoy (`prompts/contrato-archivos.md` línea 38: "cadena lineal v3, desde el 15-09-2026") y es exactamente donde escribe el validador en cada `validar_<pieza>` (`prompts/validador.md`, punto 3). El validador pusheó su veredicto a las 01:44:28 (commit `a857df7`, "veredicto 2026-09-15: preseleccion APROBADA vuelta 0 [claude]"), tocando solo `contenido/veredictos/2026-09-15-preseleccion.md`; como esa ruta no está en la lista, GitHub no disparó `estado.yml`, nadie recalculó `contenido/estado/2026-09-15.md`, nadie emitió el evento al PR del estado y GPT nunca se enteró de que le tocaba escribir el informe. Confirmado con `mcp__github__actions_list` sobre `estado.yml`: la última corrida de hoy es la run 28 (`04:41:58Z`, la que procesó la preselección); no hay ninguna corrida después, pese a que el commit del veredicto llegó dos minutos y medio más tarde y a que ya pasaron casi cuatro horas.

Es el mismo tipo de trampa que ya se documentó el 14-09 para otro caso ("Revisar qué MÁS depende de un push del bot", `bitacora/PENDIENTES.md` línea 101-107) — aquí no es un push de bot sin disparar workflows, es un filtro de `paths` que no cubre una carpeta nueva — pero el síntoma es el mismo: un eslabón que escribe en el repo y no despierta al siguiente.

**Consecuencia verificada:** a las 05:34, casi cuatro horas después de la aprobación de la preselección, no existe `contenido/informes/2026-09-15.md` ni ninguna pieza posterior. El "riesgo conocido (2)" que la propia migración a v3 anotó en `bitacora/PENDIENTES.md` ("si un veredicto se pierde, la etapa queda en validar_* y el reloj de las 02:20 del validador la toma") **no repara este caso**: leí `prompts/validador.md` punto 0 — si la rutina del validador despierta de nuevo (por su reloj de las 02:20, que quedó "de red") y ve que ya existe un veredicto más nuevo que la pieza, responde "ya tiene veredicto" y termina sin recalcular el estado ni volver a disparar nada. El reloj de respaldo no cubre este agujero: solo repara un veredicto que falta, no un estado que no se recalculó.

No se pudo evaluar calidad de contenido (`validar-tarjetas.js`, comparación de hallazgos con los tres días anteriores, duración real de los episodios, marcas `PENDIENTE DE CIERRE`) porque no hay informe ni guion que auditar: `node scripts/validar-tarjetas.js --fecha 2026-09-15` devuelve "(sin guion en contenido/guiones/informe/2026-09-15.md: nada que contar)". No es una omisión de esta auditoría: es la consecuencia directa de la falla de arriba.

## Propuestas

1. En `.github/workflows/estado.yml`, sección `on.push.paths` (líneas 19-26), agregar la línea `- "contenido/veredictos/**"`. Es el fix de fondo: sin él, la v3 se va a congelar cada noche apenas el validador apruebe la primera pieza.
2. Para destrabar la edición de HOY sin esperar a la madrugada siguiente: disparar `estado.yml` a mano con `workflow_dispatch` (ya está declarado en la línea 35 del workflow) para que recalcule el estado ahora mismo con el veredicto ya aprobado; eso debería mover la etapa a `informe` y, si el despachador de GPT sigue escuchando el PR del estado, retomar la cadena todavía esta mañana.

## Triage

- **HOY**: propuesta 1 y 2. La cadena está parada y no se repara sola; cada hora que pasa sin el `workflow_dispatch` es una hora menos para que la edición de hoy alcance a completarse antes de que tenga sentido publicarla.

## Comparación con ayer

**Mejoró:**
- Las dos propuestas HOY de la auditoría del 14-09 quedaron resueltas la misma noche, verificado en el commit `c36f0f8` ("RELEASE 1 arreglado, el matiz de los titulares protegido...", 14-09 22:26 Chile, autor Santiago): `prompts/guion-informe.md` línea 110 ya trae la regla del matiz "proyecta/anticipa/prevé/anunció" (verificado, está en el texto); `.github/workflows/edicion-diaria.yml` líneas 222-240 ya comprueba `gh release view` y reintenta tres veces antes de subir (verificado, código presente). El hallazgo que se repetía tres días seguidos no tiene un cuarto día porque no llegó a producirse ningún guion hoy — pero la regla que lo iba a prevenir ya está puesta.
- Las horas vistas en videos largos siguen subiendo, modesto pero sostenido: 18.1 h (13-09) → 18.1 h (14-09) → **18.6 h** (15-09); retención ponderada 32.5% → 32.6% → **32.9%**.

**Sigue igual:**
- El barrido y la preselección corrieron puntuales (01:33 y 01:41, dentro del rango de los últimos días).

**Nuevo:**
- La v3 corrió por primera vez con piezas reales anoche y se congeló en su primer eslabón por un filtro de `paths` incompleto en `estado.yml`. No es una repetición de nada anterior: es un hallazgo de día uno del rediseño, y el más grave que ha registrado esta auditoría hasta ahora porque no perdió un dato o un matiz — dejó el día entero sin producir.
