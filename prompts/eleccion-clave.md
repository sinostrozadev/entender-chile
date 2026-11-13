# La elección semanal de "Entender el caso": la hace Claude, Santiago solo veta

Regla del 12-11-2026 (Santiago dijo "sí" a destrabar el formato; el mandato
del 04-11-2026 ya le daba a Claude esta decisión). Hasta hoy la propuesta de un
tema la cerraba Santiago con `scripts/clave.js elegir ... --tema-de` y la pauta
la aprobaba él: 7 propuestas quedaron sin consumir del 05 al 11 de noviembre.
Ahora elige y aprueba **Claude**; a Santiago le queda el **veto**.

Lo ejecuta el rol SEGUIMIENTO (`prompts/seguimiento-temas.md`, paso 5) y, si
ese día no corrió, cualquier sesión de operación.

## Cadencia: 1 por semana, no más hasta medir

- Se elige **de jueves a sábado**, para que la Clave salga el **miércoles
  siguiente** (el flujo necesita unos cinco días: pauta, ventana de veto de 12 h,
  investigación, entrega, guion). `clave.js aprobar` sin `--fecha` ya fija el
  próximo miércoles.
- Solo si NO hay otra Clave "Entender el caso" en curso (algún
  `contenido/estado/clave-*.json` con etapa distinta de `videos_listos`) y NO
  salió ni se programó una en los últimos 6 días.
- Si no hay veto: `contenido/estado/veto-clave.txt` existe, no se elige nada.
- Sube a 2 por semana solo cuando el largo anterior supere las 1.000 vistas en
  7 días, dos semanas seguidas (regla de `videos-largos`). Esto no toca el Short
  diario.

## Los cinco criterios (todos, por escrito)

Entre las `contenido/temas/*/propuesta.md` abiertas (tipo `explicar`, o
`actualizar` si el hecho nuevo cambia el largo anterior), elimina las que fallen
A o E y puntúa el resto de 0 a 2 en B, C y D. Gana la de más puntos; si empatan,
la de cifra oficial más fuerte.

- **A. Cifra oficial verificable.** Al menos una cifra o documento de una
  fuente primaria (institución, Contraloría, Cochilco, INE, tribunal) que GPT
  pueda confirmar afuera. Si todo es "se dice", sale.
- **B. Vigencia.** El hecho es de los últimos 7 días y sigue abierto, o tiene una
  fecha próxima que lo hace relevante el día que sale (votación, plazo). Un caso
  ya cerrado y olvidado puntúa 0; uno cerrado con desenlace claro puntúa 1.
- **C. Potencial de búsqueda.** ¿Alguien lo va a buscar en seis meses con un
  nombre propio o una pregunta simple ("qué pasó en Codelco", "por qué sube el
  diésel")? Cola larga, no solo noticia de la semana.
- **D. Piso de monetización y rigor.** Sin menores víctimas como eje, sin
  duelo reciente de personas (una tragedia con fallecidos de hace días puntúa 0),
  sin acusar a personas sin fallo (`contenido/casos/README.md`).
- **E. No es política partidista sin ángulo explicativo.** Un tema de
  tramitación política entra solo si el largo enseña un mecanismo (cómo funciona
  una partida presupuestaria, qué hace una comisión mixta); si el eje es quién
  tiene la culpa, sale.

## Qué escribe Claude

1. `node scripts/clave.js elegir <slug-nuevo> --tema-de <slug-del-tema> --por claude --motivo "<texto>"`
   El `--motivo` (obligatorio) va a `contenido/claves/flujo/<slug>/eleccion.md`
   y dice: las siete propuestas o las que había, el puntaje de cada una en A-E
   en una línea, y **por qué ganó esta y no las otras**. Cierra la propuesta
   elegida (la mueve a `propuestas/`). Las otras siguen abiertas y envejecen:
   la semana siguiente se puntúan de nuevo.
2. Una notificación (PushNotification) a Santiago: "Entender Chile: elegí
   <tema> para el miércoles <fecha>. Para vetarla: crea contenido/estado/veto-clave.txt".
   Una sola, sin pedir respuesta.
3. La pauta la escribe el pautador (`prompts/pauta-clave.md`) y la aprueba
   Claude con `clave.js aprobar <slug> --por claude --motivo "..."`.

## Cómo veta Santiago (una línea)

**Crear el archivo `contenido/estado/veto-clave.txt`** (desde el móvil: GitHub, Add
file; vale cualquier contenido, mejor una línea con el motivo). Frena la Clave en
curso en cualquier etapa hasta que el video se renderiza, y mientras exista Claude
no elige otra. Para vetar solo una: `contenido/claves/flujo/<slug>/veto.txt`.
Borrar el archivo reanuda. **Hora límite:** antes del `VETO_HASTA` de
`aprobacion.md` (12 horas tras la aprobación de Claude) GPT ni siquiera arranca,
así que ese veto no gasta cuota de nadie; después de esa hora igual frena, pero
lo ya gastado en GPT se pierde.
