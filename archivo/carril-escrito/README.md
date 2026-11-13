# Carril escrito: en pausa desde el 13-11-2026

Lo que hacía: cada madrugada GPT escribía la preselección, el informe de 15
noticias y su guion; Claude Opus validaba pieza por pieza; `estado.yml` movía
la etapa y `reintento.yml` reanimaba a GPT. De ahí salían el diario de la web,
el podcast y (hasta el 18-11) el Short viejo.

Por qué se pausa: con la Estrategia A el video ya no cuelga de esta cadena, y
la cadena era casi todo el gasto (50 a 70 sesiones Opus y ~120 rutinas Haiku
por semana, `estrategia/propuesta-2026-11.md` §6). No hay dato de lectores de
la web ni de oyentes del podcast en el repo; si Santiago dice que lo tienen,
se reactiva.

Cómo se reactiva: `git mv` de vuelta de `workflows/`, `prompts/` y `scripts/`
a su lugar, `git revert` del commit "video viejo fuera" (que borró `dia.js`,
del que sale el audio del podcast) y volver a encender la validadora y los
relojes de reintento A, B y C. La web sigue publicando lo que ya existe.
