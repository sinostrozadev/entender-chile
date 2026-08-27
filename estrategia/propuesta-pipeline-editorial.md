# Propuesta: pipeline editorial por etapas (la olla explícita)

Estado: PROPUESTA (2026-08-26). Idea original de Santiago sobre el análisis
del algoritmo de selección; trabajada en conjunto. Nada de esto está
implementado: este documento es para decidir.

## Qué resuelve

El análisis del 26-08 encontró que hoy la selección de noticias es una sola
llamada opaca: no existe catálogo de fuentes, no queda traza de lo que se
descartó, el criterio de importancia es circular ("importante es lo que
define la jornada"), el público objetivo no aparece en el prompt, y
selección, priorización, redacción y estilo viven mezclados en un archivo.

La propuesta separa el proceso en etapas con un artefacto intermedio
commiteado entre cada una. La consecuencia más valiosa: por primera vez se
podrá evaluar la SELECCIÓN (qué quedó fuera y por qué), no solo la
redacción.

## Arquitectura

    CATÁLOGO           ETAPA 1              ETAPA 2               ETAPAS 3-4
    fuentes.md    →    BARRIDO         →    INFORME          →    CLAVE y GUIONES
    (qué se lee)       preselección de      prioriza, verifica    (como hoy)
         ↑             30-50 titulares      y redacta desde
      CURADOR          commiteada           la preselección
      (mantiene el
       catálogo)

### Archivos nuevos o reorganizados (prompts/)

1. **`fuentes.md`**: el catálogo. Por fuente: nombre, URL a consultar
   (portada o RSS; preferir RSS cuando exista, pesa 10 veces menos),
   categorías que cubre, región, tipo (oficial, medio establecido, medio
   regional), y fecha de alta. Encabezado con los criterios de alta y baja
   (ver Curador). Punto de partida: las fuentes que los informes ya citan
   (Contraloría, BCentral, DMC, Emol, La Tercera, BioBioChile, Cooperativa,
   T13, CIPER, Ex-Ante, medios regionales) más las institucionales que
   faltan (Fiscalía, Poder Judicial, DIPRES, Diario Oficial, Senado/Cámara).

2. **`seleccion.md`** (etapa 1): qué entra a la olla. Criterios de
   inclusión amplios (en la duda, entra), categorías obligatorias a barrer
   (las 13 secciones actuales sirven de base), cuotas blandas por categoría
   y por regiones para que el barrido no se quede pegado en Santiago ni en
   política, y el formato de salida: una noticia por línea con
   `categoría | titular | fuente | url | fecha | por qué podría importar`.

3. **`priorizacion.md`** (etapa 2a): cómo se elige desde la olla. Aquí vive
   lo que hoy no existe:
   - **El criterio de importancia operativo**, como vara y no como círculo:
     cuántas personas afecta directamente, cuánta plata pública o del
     bolsillo hay en juego, si es irreversible o de largo plazo, si es
     novedad real o un episodio más de algo ya contado, y si entenderla
     ayuda a interpretar futuras noticias (el lente del canal).
   - **El público**: se prioriza para "el ciudadano ocupado" definido en
     estrategia/publico.md (hoy el prompt no sabe para quién selecciona).
   - Los pesos A/B/C con sus definiciones, **tope de 4 [A] y tope nuevo de
     6 [B]** (hoy [B] no tiene tope y es donde se esconde el relleno).
   - **Continuidad**: la etapa 2 recibe los titulares [A] y [B] de ayer;
     si un tema abierto tuvo novedad, se prioriza contarla; si no la tuvo,
     no se repite.
   - Regla de trazabilidad: el informe solo desarrolla noticias que estén
     en la preselección. Si en la verificación aparece algo grave que el
     barrido no vio, puede entrar con la marca interna [FUERA DE LA OLLA],
     que queda registrada para ajustar el barrido.

4. **`informe.md`** (etapa 2b): se adelgaza. Conserva estructura de
   secciones, hechos vs interpretación, reglas de fuentes y verificación
   (las dos fuentes coincidentes por [A] se aplican en esta etapa, sobre
   las elegidas). Pierde: el método de barrido (se va a seleccion.md), la
   jerarquización (se va a priorizacion.md) y el estilo (se va a estilo.md).

5. **`estilo.md`**: compartido. El bloque anti-plantilla y el tipográfico
   están hoy duplicados en cuatro prompts; se escriben una vez y generar.js
   los inyecta en toda etapa que redacte. Corregir en un lugar corrige todo.

6. **`curador-fuentes.md`**: el prompt del agente curador (ver abajo).

7. `claves.md`, `guion-informe.md`, `guion-claves.md`: siguen igual, solo
   pierden el estilo duplicado.

### Artefacto nuevo (contenido/)

**`contenido/preseleccion/AAAA-MM-DD.md`**: la olla del día, commiteada.
Es la traza de lo descartado: todo lo que el sistema vio y no llegó al
informe queda a la vista, con su "por qué podría importar". Sin esto, un
tema ausente del informe es inescrutable; con esto, se distingue "no lo
vio" (falla del barrido o del catálogo) de "lo vio y lo bajó" (falla o
acierto de la priorización). Es la materia prima de la evaluación.

### Tamaño de la olla

Santiago propuso 50-60. Recomendación: **rango 30-50 con cuotas blandas
por categoría**, por dos razones: bajo 30 el barrido no está barriendo, y
sobre 50 la etapa 2 diluye su atención en cola que nunca compite (el
informe usa 10-15). Son una línea por noticia: el costo es marginal. Se
parte en 40 como objetivo y se ajusta con datos de las primeras semanas.

## El curador de fuentes

Agente que mantiene fuentes.md. Frecuencia decreciente, como propuso
Santiago: **diaria las primeras 2 semanas, luego semanal, luego mensual**
(es cambiar una línea de cron, no un desarrollo).

Criterios de alta y baja MEDIBLES con datos propios, no a ojo:
- **Aporte**: con las preselecciones commiteadas se calcula qué porcentaje
  de las noticias de cada fuente llegó al informe en los últimos 30 días.
  Una fuente que lleva un mes aportando cero se propone para baja.
- **Salud**: URL caída o feed roto en 3 revisiones seguidas se reporta.
- **Redundancia**: si dos fuentes solo se duplican entre sí, se conserva la
  de mejor historial y la otra baja.
- **Cobertura**: si una categoría o región del barrido viene sistemáticamente
  vacía, el curador busca y propone fuentes candidatas para ese hueco.
- **Regla de gobierno**: el curador PROPONE altas y bajas en su informe;
  las aplica solo si son de salud (URL muerta). Las editoriales las decide
  Santiago. El catálogo es una decisión editorial, no una métrica.

## Flujo de la madrugada (propuesto)

    03:45  Curador (mientras sea diario) → mantiene prompts/fuentes.md
    04:00  Etapa 1 Barrido    → contenido/preseleccion/FECHA.md  (commit)
    04:10  Etapa 2 Informe    → contenido/informes/FECHA.md      (commit)
    04:20  Etapa 3 Clave      → como hoy (recibe el informe)
    04:30  Etapa 4 Guiones    → como hoy
    04:40  Revisión de calidad (rutina existente, gana métricas nuevas)
    05:00  Gate → render → release                               (sin cambios)

## Factibilidad técnica (verificada)

- La API de Claude tiene, además de la búsqueda web, una herramienta
  **web_fetch** que consulta URLs específicas siempre que estén presentes
  en el mensaje. El diseño calza exacto: generar.js inyecta fuentes.md al
  mensaje de la etapa 1 y el modelo visita el catálogo. En los modelos
  actuales existe la variante con filtrado dinámico (web_search_20260209 y
  web_fetch_20260209); generar.js usa hoy la variante 2025 de búsqueda, se
  actualiza al pasar.
- La búsqueda web NO desaparece: queda en la etapa 1 como red de seguridad
  para lo que el catálogo no trae (última hora, regiones, huecos), y en la
  etapa 2 para verificar y profundizar las noticias elegidas.
- `web_fetch` acepta límite de tokens por página (max_content_tokens):
  clave para que 40 portadas no cuesten una fortuna. Preferir RSS refuerza
  lo mismo.
- Costo estimado de la etapa nueva: con 30-40 consultas ligeras (RSS y
  portadas limitadas), del orden de $1-2 USD por día a precios actuales.
  Se mide en la primera semana y se ajusta (menos fuentes fetcheadas a
  diario, rotación, o solo RSS).

## La decisión arquitectónica que esta propuesta obliga a tomar

Hoy el camino principal es la tarea nocturna de ChatGPT y generar.js es el
plan B. **Un pipeline por etapas con artefactos intermedios solo se puede
orquestar bien desde generar.js (API)**: ChatGPT no puede encadenar etapas
con commits entre medio de forma confiable.

Opciones:
a. **generar.js pasa a ser el camino principal** y la tarea de ChatGPT se
   apaga o queda de emergencia. Implica asumir el costo API diario
   (estimado total de la madrugada: $3-6 USD/día según modelo) a cambio de
   control total, trazabilidad y este pipeline. Recomendada.
b. ChatGPT sigue de principal con el prompt actual y el pipeline por
   etapas corre en paralelo unos días en modo comparación antes de decidir.
   Más prudente, duplica costo unos días.

## Evaluación (cierra el ciclo)

CALIDAD.md gana una dimensión de SELECCIÓN, medible gracias a la traza:
- ¿Quedó fuera de la olla algo que otros medios trataron como principal?
  (falla de barrido o de catálogo)
- ¿La priorización dejó fuera del informe algo de la olla que merecía
  entrar, o subió relleno? (falla de criterio)
- ¿Cuántas [FUERA DE LA OLLA] hubo? (si son frecuentes, el barrido cojea)
- Aporte por fuente (alimenta al curador).

## Plan de implementación propuesto (cuando se apruebe)

    Fase 1 (una sesión): fuentes.md inicial (desde los informes existentes
           más las institucionales), seleccion.md, priorizacion.md,
           estilo.md, adelgazar informe.md. Etapa 1 y 2 en generar.js.
    Fase 2 (misma semana): curador con cron diario. Métricas de selección
           en la revisión de calidad.
    Fase 3 (a las 2 semanas, con datos): ajustar tamaño de olla, cuotas,
           tope de [B]; curador pasa a semanal; decidir el camino principal
           definitivo si se optó por comparar.

## Decisiones abiertas (Santiago)

1. Camino principal: ¿opción a (API principal) o b (comparar unos días)?
2. Presupuesto API diario aceptable para la madrugada completa.
3. Tamaño de olla inicial: ¿40 como objetivo con rango 30-50?
4. Tope de [B] en 6: ¿de acuerdo?
5. ¿El curador puede dar de baja fuentes solo o siempre propone?
   (propuesto: solo salud automática, lo editorial siempre propone)
