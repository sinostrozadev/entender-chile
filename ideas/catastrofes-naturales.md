# Registro de catástrofes naturales: los números que el mundo olvida

Idea de Santiago, 31-08-2026, a partir del caso Nepal (que el canal siguió
tres días con cifras que crecían: 552, 680, 797 muertos). Sin desarrollar:
esto es el esbozo para retomar.

## La idea

Ir almacenando la información numérica que dejan las catástrofes naturales
en todo el mundo: muertos, desaparecidos, damnificados, costo económico,
con fecha y fuente de cada cifra. Partir con un análisis histórico de las
catástrofes ocurridas hasta hoy, actualizar cada vez que una noticia de este
tipo entre al informe, y darle una sección en la web.

## Por qué encaja con el canal

Es la cuarta aplicación del mismo mecanismo que ya existe: una entidad con
estado, cifras fechadas y una pregunta que la cierra.

| Sección | Persigue | Pregunta que cierra |
|---|---|---|
| ¿En qué quedó? | Plata pública | ¿Se recuperó? |
| Historias abiertas | Hechos sin explicar | ¿Qué pasó? |
| ¿Lo cumplió? | Compromisos | ¿Se hizo? |
| **Catástrofes** | **Balances de desastres** | **¿En cuánto quedó el balance final?** |

Y explota la misma ventaja: nadie vuelve a mirar. Los medios cubren la
catástrofe mientras sangra y la abandonan antes del balance definitivo. El
canal que no se olvida puede decir "el terremoto X terminó con N muertos,
no con los M que se dijeron la primera semana", con toda la serie fechada.

## La regla de rigor que lo hace distinto

**Las cifras de catástrofe cambian por diseño, y eso ES el dato.** Nunca se
sobrescribe una cifra: se agrega la nueva con fecha y fuente, y la serie
completa queda visible. Nepal es el ejemplo perfecto: 552 (28-08, Reuters),
680 (29-08, autoridades de Nepal), 797 (30-08). Esa progresión, que todos
los medios pisan y borran, es exactamente lo que nosotros conservamos.

Fuentes para el histórico y los datos: EM-DAT (la base de desastres de la
Universidad de Lovaina, el estándar académico), USGS para sismos, OMM y
agencias nacionales. Por verificar acceso y licencias antes de construir.

## Qué tendría la sección web

- Ficha por catástrofe: qué, dónde, cuándo, la serie de cifras fechadas, el
  estado (EN CURSO / BALANCE ESTABLE / CERRADA) y la fuente de cada número.
- El histórico: las grandes catástrofes de la historia con sus números
  finales, como contexto permanente (es contenido evergreen que responde
  búsquedas del tipo "cuántos murieron en X").
- Chile como lente: el país vive terremotos, tsunamis, aluviones e
  incendios; comparar cada catástrofe del mundo con las escalas chilenas
  (el 27F, el 8.8) es la traducción natural para nuestra audiencia.

## Decisiones abiertas

1. ¿Umbral de entrada? No todo temporal es catástrofe. Propuesta: entra lo
   que el informe ya cubrió como noticia, más un umbral por magnitud.
2. ¿Quién actualiza? El mecanismo natural es el mismo del observatorio: la
   marca en el informe abre o actualiza la ficha.
3. ¿El histórico inicial hasta dónde llega? Sugerencia: empezar chico (las
   20 o 30 mayores del siglo XX y XXI más todas las chilenas grandes) y
   crecer con los días.
4. Cuándo: después de consolidar el lanzamiento. No está en el camino
   crítico, pero abrir la ficha de Nepal AHORA, mientras la serie está
   viva, sería el mejor arranque posible.
