# Entender Chile: el repo del canal

Canal de YouTube @entenderchile: la actualidad chilena explicada con el mapa
y el gráfico que la hacen obvia, sin rostro, con voz sintética declarada.
Desde el 19-11-2026 corre la **Estrategia A, "Chile en mapas y datos"**
(`estrategia/propuesta-2026-11.md`, decisión del 13-11-2026 en
`estrategia/decisiones.md`): un Short diario de 45 a 60 s a las 12:00 y un
largo semanal de 10 a 12 min los miércoles a las 19:00, con una compuerta de
cierre el 03-12-2026.

## El flujo en tres pasos (`docs/FLUJO.md`)

1. **Plan y guiones**, jueves 17:30: una rutina de Claude elige los temas de
   la semana siguiente desde el barrido, verifica cada cifra con su fuente y
   escribe los guiones JSON en `contenido/semana/AAAA-MM-DD/`
   (`prompts/plan-semanal.md`).
2. **Render y subida**, al llegar el push: `producir.yml` en GitHub Actions
   rinde con el motor de `video/` y deja cada pieza programada en YouTube.
3. **Métricas y revisión**: `metricas.yml` cada mañana y una revisión diaria
   corta (`prompts/revision-diaria.md`); la semanal abre el plan del jueves.

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `video/` | Motor Remotion del formato nuevo (plantillas `grafico` y `tesis`, mapa de Chile, satélite, voz Edge TTS, validadores, subida). Su propio `package.json` |
| `contenido/semana/` | Guiones de cada semana y sus marcas de hecho |
| `contenido/barrido/`, `temas/`, `casos/` | Banco de temas |
| `scripts/` | Barrido, métricas y utilidades de YouTube (nueve scripts) |
| `web/` | El sitio https://entender.sinodev.cl (Astro), con lo ya publicado |
| `estrategia/` | Identidad, decisiones, propuesta y limpieza de noviembre |
| `bitacora/` | Métricas, revisiones diaria y semanal, pendientes, realizados |
| `prompts/` | Lo que leen las rutinas de Claude y la tarea de GPT |
| `archivo/` | Lo retirado con su porqué; `archivo/carril-escrito/` es el informe diario en pausa |

Reglas que mandan: `CLAUDE.md` y `REGLAS-DURAS.md` (esta última describe en
parte el modelo anterior; donde contradiga a la decisión del 13-11-2026, gana
la decisión). Lo retirado el 13-11-2026 y por qué: `estrategia/limpieza-2026-11.md`.
