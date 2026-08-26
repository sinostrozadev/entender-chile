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

## Formato obligatorio de cada dossier

    # Caso: <nombre corto>
    Estado: ACTIVO | JUDICIALIZADO | CERRADO
    Dossier abierto: AAAA-MM-DD · Última actualización: AAAA-MM-DD
    ## Ficha            (institución, qué se investiga, montos, origen)
    ## Involucrados     (tabla: nombre, cargo, institución/partido,
                         situación procesal con fecha)
    ## Cronología       (una línea por hecho, con fecha y fuente)
    ## Próximos hitos conocidos
    ## Fuentes
    ## Registro de actualizaciones del dossier

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
5. **Fechas absolutas** siempre. Todo dato susceptible de cambiar queda
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
