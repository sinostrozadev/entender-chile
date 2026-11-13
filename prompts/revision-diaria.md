# Revisión diaria de Entender Chile (paso 3 de 3)

Lo lee la rutina "Revisión diaria" (`trig_012bFrH9XnJMjV74uHxVYz8c`,
Sonnet), todos los días a las 10:30 de Chile. Corta: 10 minutos, pocos
tokens. No escribe guiones ni cambia la estrategia; eso es del plan semanal
del jueves (`prompts/plan-semanal.md`). Flujo: `docs/FLUJO.md`.

1. **¿Hay métricas de hoy?** Busca `bitacora/metricas/AAAA-MM-DD.json` con la
   fecha de hoy en Chile. Si no está, toca `bitacora/metricas/despertador.txt`
   (una línea con la hora), commitea, pushea (eso dispara `metricas.yml`) y
   sigue con el json de ayer, diciéndolo.
2. **¿Salió lo de hoy?** En `contenido/semana/*/hechos/` debe existir la marca
   del Short de hoy (y del largo si es miércoles). Si falta una pieza cuya
   hora de publicación ya pasó o está a menos de 3 horas: escribe el problema
   en `bitacora/PENDIENTES.md` con dueño "sesión" y manda UNA notificación.
   No intentes renderizar ni subir desde aquí.
3. **Números del día**: vistas a 24 h y 72 h de los Shorts del formato nuevo,
   % visto, suscriptores del día. Compáralos con la tabla de la compuerta
   (`estrategia/decisiones.md`, "Compuerta del día 14").
4. Escribe `bitacora/diaria/AAAA-MM-DD.md` en diez líneas o menos: qué salió,
   cómo va contra la compuerta, una observación con evidencia. Commit y push.
5. Notificación al teléfono **solo** si algo falló (paso 1 sin métricas dos
   días seguidos, paso 2) o si un Short pasó las 1.000 vistas.

Nunca toques `contenido/semana/` salvo para leer, ni `video/`, ni workflows.
