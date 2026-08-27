# contenido/casos/ - el observatorio de la plata pública

Dossiers vivos de casos de uso irregular de fondos públicos en Chile. El
objetivo es hacer lo que los medios grandes no hacen: seguir cada caso
HASTA EL FINAL (si se recupera el dinero, si hay sanciones, en qué queda),
y acumular datos comparables entre casos para estadísticas y piezas
especiales (ver ideas/).

## Excepción a la regla de contenido/

A diferencia del resto de contenido/, estos archivos SÍ se editan en el
tiempo: son documentos vivos, uno por caso, nombrados por slug (no por
fecha). Cada edición queda anotada en el "Registro de actualizaciones" del
propio dossier. indice.md se regenera solo (scripts/casos.js).

## La sección que alimenta

Estos dossiers son la materia prima de "¿En qué quedó?", la sección de
seguimiento de la plata pública. Su especificación editorial completa
(alcance, superficies, métrica y reglas) está en
`estrategia/seccion-plata-publica.md`. La métrica que manda es una:
cuánto se cuestionó frente a cuánto se recuperó.

## Archivos que NO son dossiers

- `indice.md` y `hitos.md`: los genera el script, no se editan a mano.
- `candidatos.md`: backlog de casos detectados y aún no promovidos.
- `por-abrir.md`: casos marcados en el informe del día que todavía no tienen
  dossier. Al abrir el dossier, se borra la línea.
- `por-verificar.md`: hechos detectados por búsqueda que el investigador no
  pudo confirmar en el texto de la fuente (la nube no abre varios medios
  chilenos). Se revisan en la rutina de la mañana y se borran al resolver.

## Formato obligatorio de cada dossier

    # Caso: <nombre corto>
    Estado: ACTIVO | JUDICIALIZADO | CERRADO
    Dossier abierto: AAAA-MM-DD · Última actualización: AAAA-MM-DD

    <!-- datos
    cuestionado: 32884247128      (pesos, solo dígitos)
    naturaleza: perjuicio-acusado
    recuperado: 0
    retenido: 0
    nota-cifra: de dónde sale la cifra y qué NO significa
    -->
    ## Ficha            (institución, qué se investiga, montos, origen)
    ## Involucrados     (tabla: nombre, cargo, institución/partido,
                         situación procesal con fecha)
    ## Cronología       (una línea por hecho, con fecha y fuente)
    ## Próximos hitos conocidos
    ## Fuentes
    ## Registro de actualizaciones del dossier
    <!-- interno ... -->   (opcional, SIEMPRE al final; no se publica)

### Lo público y lo interno

La ficha se publica entera en la web, tal cual, así que todo lo que está
fuera de un comentario HTML es texto para un lector cualquiera: hechos con
fuente, estado procesal, montos. Nada de método, jerga de operaciones
("proxy", "la base", "el agente"), dudas para el editor ni correcciones a
documentos internos.

Todo eso va en un bloque `<!-- interno ... -->` al final del archivo, que
la web no muestra: notas de método, límites de acceso a fuentes, datos por
verificar, correcciones al barrido de candidatos. Si no se pudo leer el
texto íntegro de una fuente, la ficha pública lo dice en una sola línea,
limpia: "Nota sobre las fuentes: no se accedió al texto íntegro de las
resoluciones; todo proviene de extractos con URL verificada y al menos dos
medios por cifra".

Las correcciones a algo YA PUBLICADO sí van públicas, en el "Registro de
actualizaciones del dossier" (una línea: qué decía, qué dice ahora, fuente).
Los errores se corrigen a la vista; las notas de cocina no se sirven.

### El bloque de datos manda

Las cifras del contador salen SIEMPRE de ese bloque, nunca de la prosa de la
ficha: parsear el texto ya produjo dos errores de cifra reales (un
"recuperado" tomado de una mención ajena en el mismo párrafo).

`naturaleza` usa vocabulario cerrado, y decide si la cifra entra o no al
contador global:

| naturaleza | qué es | ¿suma? |
|---|---|---|
| `perjuicio-veredicto` | perjuicio establecido en un veredicto o sentencia | sí |
| `perjuicio-acusado` | perjuicio que sostiene una acusación fiscal | sí |
| `observado-contraloria` | monto objetado en un informe de Contraloría | sí |
| `denunciado` | monto de una denuncia institucional formal | sí |
| `investigado` | monto que Fiscalía indaga, sin acusación aún | sí |
| `transferido-auditado` | total transferido y auditado, NO defraudado | no |
| `estimacion` | cálculo estimativo, no perjuicio determinado | no |

`retenido` es dinero congelado que todavía NO volvió al Fisco. Nunca se
cuenta como recuperado.

## Reglas de rigor (no negociables)

1. **Monto CONFIRMADO vs reportado**: "confirmado" solo si la cifra viene
   de fuente oficial (Contraloría, Fiscalía, CDE, sentencia). Lo demás es
   "reportado por prensa", siempre con medio y fecha. Si las fuentes
   discrepan, se consignan ambas cifras.
2. **Presunción de inocencia**: nada se afirma como delito consumado sin
   sentencia. Cada persona lleva su situación procesal EXACTA y fechada:
   en investigación, sumariado, formalizado, acusado, condenado, absuelto.
   Esto protege editorialmente al canal (riesgo de querella) y es lo
   correcto.
3. **Solo personas ya individualizadas** por fuentes oficiales o al menos
   dos medios establecidos. El dossier no "descubre" nombres.
4. **Sin relleno**: cada línea nueva debe aportar un hecho, una cifra, un
   avance procesal o una fuente. Las especulaciones no entran.
5. **Fechas absolutas** siempre. En la prosa, DD-MM-AAAA (27-05-2026); las
   líneas "Dossier abierto" / "Última actualización" y hitos.md mantienen
   AAAA-MM-DD porque las lee el sistema. La web muestra todo como día-mes-año. Todo dato susceptible de cambiar queda
   fechado ("al 25-08-2026, no había formalizados").

## Investigación de casos nuevos (abrir un dossier)

Un caso nuevo se investiga con un agente por caso, siempre con el modelo
grande (Opus): son tareas de verificación donde una cifra alucinada o un
estado procesal mal descrito es riesgo legal, no un detalle de estilo.

REGLA OPERATIVA: máximo 3 agentes en paralelo. El 2026-08-25 se lanzaron 6
a la vez y agotaron el límite de uso de la ventana de 5 horas: los seis
murieron sin entregar nada y hubo que relanzarlos al día siguiente. En
tandas de 3 el trabajo llega completo.

## Cómo se actualiza

- `scripts/casos.js` corre en la madrugada (workflow) y revisa cada caso
  con Estado distinto de CERRADO: busca novedades en la web y engorda el
  dossier solo si hay información nueva verificable.
- Cualquier humano o sesión de Claude puede editar un dossier a mano
  siguiendo las mismas reglas, anotando el registro.
- Un caso pasa a CERRADO cuando hay sentencia firme, o resolución
  definitiva, y se anota el desenlace completo (¿se recuperó el dinero?).
