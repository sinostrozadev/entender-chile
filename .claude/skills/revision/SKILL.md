---
name: revision
description: La revisión de Entender Chile en el flujo de la Estrategia A (desde el 19-11-2026). Usar cuando Santiago pregunte cómo va el canal, al abrir una sesión del canal, o para hacer a mano la revisión diaria o la semanal. Mide contra la compuerta del 03-12-2026, nunca de memoria.
---

# Revisión (Estrategia A)

Dos formas, las dos escritas como prompt de rutina; una sesión las sigue igual cuando la hace a mano:

- **Diaria**: `prompts/revision-diaria.md` → `bitacora/diaria/AAAA-MM-DD.md`, diez líneas.
- **Semanal**: `prompts/plan-semanal.md` §0 y §1 → `bitacora/semanal/AAAA-MM-DD.md`, con la línea
  `DECISIÓN:` cuando toca la compuerta (`estrategia/decisiones.md`, 03-12-2026).

Fuentes, en este orden: `bitacora/metricas/` (el json más nuevo), `contenido/semana/*/hechos/` (qué se
programó de verdad), `gh run list -w producir.yml` (qué falló), YouTube Studio solo si Santiago lo abre.
Informe a Santiago en diez líneas o menos: qué salió, cómo va cada criterio de la compuerta, una
decisión. La revisión de la cadena de madrugada (skills `madrugada` y `noche`) se retiró el 13-11-2026.
