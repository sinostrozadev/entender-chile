VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_clave
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-09-15T16:08:00Z

Correcciones:
1. Dónde: la línea "[DATO comparacion | OMS, 14 sep 2026] último caso humano por
   variante canina: 1972 ; validación internacional: 2026" del bloque "## Aplicado
   a Chile" · Regla: MARCAS PARA PRODUCCIÓN, [DATO]: "Solo valores graficables:
   cifras, porcentajes, montos, magnitudes. Las fechas de eventos y los rangos de
   días van en la narración, no en una marca [DATO]." Y, en la misma entrada:
   "Posición: la línea [DATO] va INMEDIATAMENTE ANTES del párrafo que la narra,
   nunca después (el sistema la ancla al párrafo siguiente)." Los dos valores de
   la marca son fechas de eventos (el año del último caso humano y el año de la
   validación), y además el párrafo que los narra ("Volvamos al quince de
   septiembre de dos mil veintiséis. A esa fecha, el último caso humano asociado a
   la variante canina en Chile databa de mil novecientos setenta y dos...") está
   ANTES de la marca; el párrafo que la sigue ("El reconocimiento no declaró al
   país libre de todo virus rábico...") no narra ninguno de los dos valores ·
   Debe quedar: eliminar esa línea [DATO]. Las dos fechas ya están dichas en voz
   en el párrafo anterior, que es donde el prompt las manda, y el bloque no pierde
   nada narrado. Si se quiere conservar una tarjeta en ese bloque, tiene que ser
   un valor graficable presente en la entrega y la línea tiene que ir
   inmediatamente ANTES del párrafo que lo narra; no inventes ni calcules una
   cifra que la entrega no trae (la entrega dice "más de cinco décadas sin casos
   humanos asociados a la variante canina", no un número de años).

Observaciones:
- "Carátula sugerida: ¿La enfermedad ya desapareció?" cumple el largo (cuatro
  palabras) y no usa el término que el video viene a explicar, pero "la
  enfermedad" no tiene antecedente en la miniatura y un desconocido puede
  necesitar preguntar "¿qué enfermedad?", que es justo lo que descarta la PRUEBA
  DEL GANCHO. No bloquea. Una versión que nombre el caso en lenguaje llano, del
  tipo "¿Se acabó la rabia en Chile?", se entiende en un segundo y sigue sin usar
  "eliminación" ni "erradicación".
- El bloque "## Cierre" abre con "Si te quedas con cinco ideas, que sean estas":
  las cinco ideas permanentes están en prosa, como pide la estructura, pero la
  frase de entrada suena a anuncio de lista. Disolverla en la explicación acerca
  el cierre al "cierre natural" que describe el punto 5.

Verificado y conforme:
- Extensión: 1.614 palabras NARRADAS (contadas sobre el texto entre "Guion:" y
  "Fuentes:", descontando los encabezados ##, las líneas [DATO] y [ESQUEMA] y los
  prefijos de marca). Queda dentro del rango del control interno 3 (1.050 a
  1.650), en el tramo alto que el prompt admite "cuando el tema lo justifique", y
  la explicación conceptual ocupa muy por encima del 80%: el caso solo aparece en
  el gancho y en "## Aplicado a Chile".
- Formato de salida y contrato: "Título sugerido:" (63 caracteres, atemporal, sin
  fechas, promesa de conocimiento), "Descripción sugerida:" (dos frases, sin lista
  de fuentes), "Carátula sugerida:", "Guion:" y "Fuentes:" en ese orden; ruta
  contenido/guiones/claves/2026-09-15-eliminacion-enfermedad-salud-publica.md con
  el mismo slug que la entrega, y commit fff4d9a "edición 2026-09-15: guion clave"
  con una sola inserción y ningún otro archivo tocado.
- Regla dura de formato: las nueve líneas "[TESIS] ..." llevan línea en blanco
  antes del párrafo narrado, buscadas una por una en el archivo completo.
- Marcas: nueve bloques "##" y una [TESIS] por bloque; los otros dos [DATO]
  ("ausencia mínima de muertes humanas: 2 años" y "lavado de la herida: 15
  minutos") son magnitudes graficables, llevan fuente primaria única con fecha
  (OMS, 14 sep 2026 y OMS, 5 jun 2024, nunca el Informe diario) y van
  inmediatamente antes del párrafo que los narra; los tres [ESQUEMA] tienen
  exactamente tres elementos de hasta cuatro palabras; hay una [HECHO] y una
  [INTERPRETACIÓN], en el mismo bloque y con la fórmula explícita "Una lectura
  posible es..."; no aparece ninguna marca fuera de las permitidas.
- Fidelidad a la entrega: los cuatro niveles (control, eliminación como problema,
  eliminación de la transmisión, erradicación), los dos años sin muertes humanas,
  el expediente revisado por un grupo internacional independiente, los murciélagos
  hematófagos y el reservorio actual en Chile, la vacunación masiva de perros como
  estrategia más costo-efectiva, los quince minutos de lavado, el Decreto 1 de
  2014, el caso de 1972 y las cinco ideas del cierre están todos en
  contenido/claves/2026-09-15-eliminacion-enfermedad-salud-publica.md con el mismo
  sentido y las mismas cifras. No hay dato, ejemplo ni fuente agregados fuera de
  la entrega.
- Crédito total: las seis líneas de "Fuentes:" cubren las dos fuentes de las
  marcas [DATO] y las cuatro fuentes de la entrega cuyo contenido se narra (OPS
  2019 para las metas, CAVEI y Minsal 17 abr 2025 para el reservorio, Minsal
  Decreto 1 para el reglamento y el Informe diario, citado en prosa en el gancho).
  Ningún archivo interno del sistema aparece como fuente de una cifra.
- Voz y estilo: buscados explícitamente en el texto narrado, no hay dígitos, ni
  paréntesis, ni URLs, ni rayas largas o medias, ni "[pausa]", ni los conectores
  de ensayo prohibidos, ni fórmulas de clickbait; las siglas van desarrolladas
  ("Organización Mundial de la Salud" en la narración, "OMS" solo en encabezados y
  marcas, que no se narran); las fechas coyunturales están dichas en voz ("El
  quince de septiembre de dos mil veintiséis", "Volvamos al quince de septiembre
  de dos mil veintiséis"); y la despedida termina con el tagline exacto "El
  resumen sin gritos."
