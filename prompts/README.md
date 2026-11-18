# prompts/ : lo que leen las rutinas de Claude y la tarea de GPT

Cada tarea lee desde AQUÍ, en `main` y en la corrida, el prompt de su paso:
editar un archivo de esta carpeta ES cambiar el comportamiento desde la
corrida siguiente. Flujo y horarios: `docs/FLUJO.md`. IDs de las rutinas:
`bitacora/rutinas.md`.

## Claude (rutinas en la nube)

| Prompt | Rutina | Cuándo | Qué escribe |
|---|---|---|---|
| `plan-semanal.md` | Plan semanal, Opus | jueves 17:30 | `bitacora/semanal/`, `contenido/semana/AAAA-MM-DD/` (guiones y verificación), pedido de carátula |
| `revision-diaria.md` | Revisión diaria, Sonnet | 10:30 todos los días | `bitacora/diaria/`, avisos solo si algo falla |
| `caso-seguimiento.md` | Observatorio, Opus | viernes 02:00 | dossiers de `contenido/casos/` |

## GPT (una tarea, el despachador, por el PR #6)

| Prompt | Lo dispara | Qué escribe |
|---|---|---|
| `despachador-gpt.md` | cada evento del PR #6 | nada: decide a qué prompt ir. Desde el 13-11-2026 solo recibe pedidos |
| `imagen-caratula.md` | un pedido `tarea=imagen` | la carátula en la `Salida` del pedido (este canal o `contenido/caratulas/externos/<canal>/`) |
| `caratula-pedido.txt`, `caratula-caso.md` | los usa quien arma un pedido de imagen | prompt de miniatura de alto CTR y de carátula sobria |
| `lector-gpt.md` | un pedido `tarea=lectura` | `contenido/urgente/FUENTE-<slug>.md` |
| `doc-youtube.md` | `doc-youtube.yml`, día 1 de cada mes | `contenido/referencia/youtube/AAAA-MM-politicas.md` |

`contrato-archivos.md`: rutas, formatos y escritura verificada; lo citan los
prompts de GPT.

## Avisos de retiro

`validador.md`, `suplente.md`, `vigia.md`, `auditoria-matinal.md`,
`seguimiento-temas.md`, `tema-semana.md`, `pauta-clave.md` y
`guardia-reloj.md` son avisos de cinco líneas para rutinas que se apagan al
fusionar la Estrategia A: si despiertan antes, terminan sin escribir. Su texto
viejo está en `archivo/carril-escrito/prompts/`. Se borran cuando
`bitacora/rutinas.md` diga que sus rutinas están apagadas.
