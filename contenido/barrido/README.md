# contenido/barrido/ - el material bruto del día

Primer paso del circuito: antes de que nadie escriba nada, un script junta lo
que publicó la prensa chilena y lo deja acá. La preselección y el informe se
hacen mirando esto, no la memoria de una IA.

    fuentes.json      qué se consulta (feeds, consultas y fuentes sin feed)
    AAAA-MM-DD.json   el barrido completo del día (archivo, ~1.000 titulares)
    AAAA-MM-DD.md     las noticias con señal (lo que lee la preselección)

## Por qué dos archivos

El JSON es el archivo histórico: todo lo que se vio ese día, con su medio,
enlace y fecha. Sirve para reconstruir por qué una noticia entró o no, para
detectar temas que vuelven, y como evidencia del trabajo editorial.

El .md es la vista de trabajo. Mil titulares no caben en un prompt, así que
entra solo lo que tiene señal:

1. **Continúa una historia** ya vista en los 7 días previos.
2. **Corroborada** por dos o más fuentes.
3. **Exclusiva** de un medio de investigación (CIPER, Ex-Ante, Interferencia).

Lo demás queda en el JSON, disponible pero fuera del camino. El ruido evidente
(deportes en vivo, sorteos, cotización rutinaria del dólar) se marca, no se
borra: un partido no es noticia, pero la quiebra de un club sí, y esa
distinción no la hace una expresión regular.

## Las fuentes y su curaduría

Tres tipos en `fuentes.json`:

- **feeds**: RSS directo del medio. Máxima confianza, pocos lo tienen.
- **consultas**: búsquedas temáticas en Google News. Cubren a los medios que
  NO publican RSS (BioBio, T13, Emol, El Mostrador, CNN, DF, ADN, 24H, Mega:
  todos 404 al 27-08-2026). Google News es un índice, no una fuente: da el
  titular y el enlace, el contenido se lee en el medio.
- **institucionales_sin_feed**: Contraloría, Banco Central, Congreso, Senado,
  DMC, Ministerio Público. No tienen RSS y hay que abrir la página; los
  revisa la tarea de preselección, no el script.

Las consultas usan `OR` entre paréntesis. Google News trata las palabras
sueltas como AND estricto: `Chile empleo salario pensiones AFP` devolvió 0
resultados; con OR, 37.

### Criterio para agregar o quitar una fuente

- **Entra** un feed o consulta cuando aporta noticias que el resto no trae.
- **Sale** una consulta solo si en 30 días no aportó ninguna noticia que
  llegara al informe, y se anota en `descartadas` con el motivo y la fecha.
- Una fuente caída no se borra al primer fallo: puede ser un problema del día.
  Tres días seguidos caída, se revisa.
- Nunca se quita una fuente por su línea editorial. La pluralidad del barrido
  es lo que hace honesta la selección.

## Qué NO es esto

No es contenido publicable, no está verificado y no se cita. Es una lista de
titulares para decidir qué mirar. Toda cifra que llegue al informe se
verifica en la fuente, con la regla de siempre: dos medios o fuente oficial.
