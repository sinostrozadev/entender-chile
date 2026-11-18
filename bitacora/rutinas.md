# Rutinas de la nube y workflows: el inventario

**Última actualización: 13-11-2026 (rama `estrategia-a`).** El inventario de
la cadena vieja, con todos sus IDs, quedó en
`archivo/carril-escrito/rutinas-hasta-2026-11-12.md`.

Quien crea, cambia, apaga o borra una rutina edita esta tabla en el mismo
commit. Los IDs no son secretos; los tokens sí y nunca van aquí. Hora de Chile
= UTC menos 3 (verano).

## Rutinas de Claude que quedan (estado objetivo al fusionar)

| Hora de Chile | Rutina | ID | Cron UTC | Modelo | Prompt | Estado |
|---|---|---|---|---|---|---|
| jueves 17:30 | Plan semanal (reutiliza "Tema de la semana") | `trig_01BLVuzow3cvDVY6ffn7okKL` | `30 20 * * 4` | Opus | `prompts/plan-semanal.md` | **por cambiar al fusionar** |
| 10:30 diario | Revisión diaria (reutiliza "Mejora diaria") | `trig_012bFrH9XnJMjV74uHxVYz8c` | `30 13 * * *` | Sonnet | `prompts/revision-diaria.md` | **por cambiar al fusionar** |
| viernes 02:00 | Observatorio de plata pública | `trig_01MzKjYwnyH8PfJfCBrtJvv4` | `0 5 * * 5` | Opus | `prompts/caso-seguimiento.md` | **por cambiar al fusionar** (hoy diaria 01:45) |

## Rutinas que se apagan al fusionar

Reintento A `trig_016JsVfFwrJFut5vy2f4c8TS`, reintento B
`trig_01E8tyJPqyfNdVTog477sf6Z`, reintento C `trig_01RevKvPn6mufpcUCK9fii2X`,
reloj del barrido `trig_01W5KEjHbr5wWPsmmJ4ygNEh`, reloj de métricas
`trig_01MxzGdh2P489TmgkUi9spWd`, vigía `trig_01LUtn4fSJjBsCzqdoWeVviH`,
validadora `trig_01B8tLFaXe7h1YBCciFE2iKf`, red del validador
`trig_01CR3g2re9G7warvfdt4MfMS`, auditoría matinal
`trig_01GDbvJ1Wjzy25bnVRCXgygZ`. Ya apagadas y por borrar desde claude.ai:
cadena nocturna sin GPT `trig_01NscKtv2hPKqkV6ft8X6GKG`, informe de la mañana
`trig_01DHmsrrShT2Mnj8WDg4CQ42`, guardián viejo `trig_01Dk4PXRmGEMPHzrvs6amTgf`,
guardia `trig_01HLSWkJ8VpVFPuxQ51YiG4d`. La cadena de 18 recordatorios del
PR #5 se corta cerrando el PR #5.

## Workflows

| Workflow | Disparadores | Para qué |
|---|---|---|
| `barrido.yml` | cron `50 4 * * *`; dispatch | Banco de temas de 22 medios |
| `producir.yml` | push de `contenido/semana/**/*.json` y `contenido/caratulas/listas/**`; dispatch | Render y subida programada (paso 2) |
| `metricas.yml` | cron `30 9 * * *`; push de `bitacora/metricas/despertador.txt`; dispatch | Métricas (paso 3) |
| `pedido-gpt.yml` | push de `contenido/urgente/PEDIDO-*.md`; dispatch | Pedidos a GPT (carátulas de todos los canales, lecturas) por el PR #6 |
| `web.yml` | push de las carpetas publicables y `web/`; dispatch | Publica https://entender.sinodev.cl |
| `caratula.yml` | dispatch | Cambiar la carátula de un video subido |
| `privacidad.yml` | dispatch | Cambiar la privacidad de un video subido |
| `doc-youtube.yml` | cron `0 12 1 * *`; dispatch | Políticas de YouTube del mes |
