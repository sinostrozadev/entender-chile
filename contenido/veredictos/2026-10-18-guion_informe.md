VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-18T05:34:24Z

Correcciones:
1. Dónde: línea 30, "[TESIS] Dos médicos quedaron en prisión preventiva por una
   causa de licencias presuntamente falsas y presunto perjuicio al sistema
   público de salud." (21 palabras) · Regla: "[TESIS] frase ... MÁXIMO 18
   PALABRAS: es la tarjeta grande en pantalla; si necesita más, está mal
   formulada", y el control interno 14, "Cada [TESIS] tiene 18 palabras o
   menos" · Debe quedar: la misma idea central en 18 palabras o menos, dejando
   el perjuicio para la narración, donde ya está en la línea 35. Verificado
   contra la regla: "Dos médicos quedaron en prisión preventiva por una causa
   de licencias presuntamente falsas." son 13 palabras. No metas "Fonasa" en la
   tesis: la sigla se pinta en pantalla y recién queda expandida en la línea
   35, y la regla de siglas pide expandirla la primera vez que aparece.
2. Dónde: línea 37, "[ESQUEMA | Investigación por licencias] denuncias de la
   Comisión de Medicina Preventiva e Invalidez y Fonasa -> detención ->
   formalización -> 90 días de investigación" · Regla: "[ESQUEMA | título] ...
   Para procesos, jerarquías, niveles o líneas de tiempo simples que el informe
   describa", el control interno 17, "ninguna marca lleva un dato que no esté
   en el informe", y "Usa exclusivamente el contenido del informe de hoy ...
   NO agregues noticias, datos, opiniones ni predicciones" · Debe quedar: un
   esquema con solo las etapas que el informe describe. Búsqueda explícita
   sobre contenido/informes/2026-10-18.md completo: "Compin", "Medicina
   Preventiva" y "denuncia" no aparecen en ninguna línea, y "detención" aparece
   solo en la línea 143, dentro de "Fuentes consultadas", como descripción del
   enlace de Meganoticias, no como etapa narrada. El informe sí trae
   formalización, prisión preventiva del 17-10-2026, 90 días de investigación y
   "sin fecha de juicio fijada en la información consultada" (líneas 50 y 56).
   Verificado contra la regla: "[ESQUEMA | Investigación por licencias]
   formalización -> prisión preventiva -> 90 días de investigación -> juicio sin
   fecha" tiene cuatro elementos, bajo el tope de seis, y los cuatro constan en
   el informe. El esquema no se puede borrar: la noticia de licencias es de
   proceso y el prompt lo hace obligatorio en ese caso.
3. Dónde: líneas 55 a 64, la lista "Fuentes:", donde cada línea termina en un
   enlace ("- Emol, Portillo, 17 oct: https://www.emol.com/noticias/...") ·
   Regla: "No incluyas URLs, emojis, paréntesis, bibliografía, notas al editor,
   marcas de tiempo, indicaciones de edición ni advertencias fuera de las
   marcas definidas". La lista "Fuentes:" no es una de las marcas definidas, y
   el formato de fuente que el prompt fija es "institución o medio + fecha" ·
   Debe quedar: las mismas diez líneas, con el medio o la institución, el tema
   y la fecha, sin el enlace: "- Emol, Portillo, 17 oct". Así están los 52
   guiones anteriores del informe; esta edición es la única con enlaces en esa
   lista. El sistema agrega por su cuenta el enlace al informe de la web.

Observaciones:
- La marca de la línea 23 pone en pantalla "montañistas lesionados en Portillo:
  4 personas" justo antes del párrafo de la línea 24, que narra "Al principio se
  habló de cuatro fallecidos". No es incumplimiento, porque la regla de pantalla
  con dos indicadores habla de la [TESIS] y la de este bloque no nombra ninguna
  cifra, pero el espectador junta el cuatro grande con la palabra "fallecidos"
  que oye al lado. Se arregla moviendo la marca al párrafo que narra el balance
  confirmado, o narrando los tres y los cuatro en el párrafo que la sigue.
- La apertura dice "la alerta sanitaria que acaba de declararse". La fecha exacta
  sí está después, en la línea 44 ("publicado el diecisiete de octubre"), así que
  la regla de fecha exacta no queda rota, pero la fórmula relativa es evitable en
  una apertura que ya sitúa el día.
- Línea 21: "La fiscal suplente Pamela Ruiz confirmó el balance tras revisar los
  datos." El informe dice que la fiscal confirmó tres fallecidos y cuatro
  lesionados, y no describe ninguna revisión previa de datos. No cambia ningún
  hecho ni ninguna cifra, por eso no bloquea, pero es un proceso que la entrada
  no trae.
- "Carátula sugerida: ¿Qué pasó en Portillo? / Rescate aún pendiente" cumple el
  formato y el rol de pregunta, pero la pregunta es genérica: la prueba del
  gancho del prompt es justamente que un desconocido no tenga que preguntar
  "¿qué?". La segunda línea sostiene sola la tensión; una primera línea que diga
  qué está en juego rendiría más en la prueba A/B.
- El bloque de Portillo nombra Fiscalía, Policía de Investigaciones, Carabineros
  y Armada en párrafos cuyo hecho son tres muertes. Es el caso (a) de
  [SIN DIBUJO], que el prompt deja opcional, de cero a dos por edición. Vale
  evaluarlo en la línea 26.
