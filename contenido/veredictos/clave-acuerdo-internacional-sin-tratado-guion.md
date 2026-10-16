VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion
SLUG: acuerdo-internacional-sin-tratado
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-16T20:22:08Z

Observaciones:
- Para la próxima Clave (el guion es la última pieza de este flujo): la
  atribución de una cifra que la entrega respalda en nuestros propios informes
  se resuelve bien como quedó acá, poniendo en la marca [DATO] el medio que el
  informe acredita y dejando el crédito a los informes en el bloque Fuentes.
  Citar el informe propio dentro de la marca es circular y el prompt lo prohíbe;
  omitir a los informes del bloque Fuentes rompe la regla de crédito total. Las
  dos reglas se cumplen a la vez, no se eligen.
- Las cuatro correcciones de la vuelta 1 quedaron resueltas y las verifiqué una
  por una contra la entrega y contra el informe de origen, no contra la
  propuesta del veredicto anterior:
  1. El bloque Fuentes (línea 93) acredita "Entender Chile, informes del 23,
     24, 25 y 26 de septiembre de 2026", como lo trae la entrega en su línea
     65 y sin el enlace al repositorio.
  2. El [DATO] del gancho (línea 9) atribuye los quince países a "The Clinic,
     T13 y El País, 22-09-2026". Es la atribución pública de esa cifra en el
     informe del 23-09-2026, línea 32, y la línea ya estaba en el bloque
     Fuentes (línea 98). Van tres medios porque el informe acredita así ese
     dato, que es como pide citarlo el prompt.
  3. Los hitos (línea 24) ahora dice "el Senado agendó una sesión especial y
     una bancada recurrió a la Contraloría", fiel a la entrega en su línea 48.
     Ya no presenta a la Contraloría como participante de la discusión.
  4. Aplicado al caso (línea 76) dice "la subsecretaria Giannini", sin cartera,
     como la nombra la entrega en su línea 46.
- El cambio no tocó nada más: el diff contra la versión de la vuelta 0 son esas
  cuatro líneas y ninguna otra, y el archivo de imágenes quedó igual.
- Volví a medir lo que las correcciones podían mover. La extensión queda en
  1.204 palabras narradas, unos 8,9 minutos, dentro del objetivo de 1.080 a
  1.350. La explicación conceptual suma 1.107 de 1.381 palabras de bloque, un
  80,2%, sobre el piso del control interno 3, contando fuera del núcleo los
  bloques de gancho, origen, hitos, aplicación y qué mirar después, que es la
  lectura más estricta. La corrección 3 sumó cinco palabras a un bloque que no
  es conceptual y aun así el piso se mantiene, con poco margen.
- scripts/revisar-mecanico.js no encontró hallazgos y scripts/validar-tarjetas.js
  no reporta cuotas rotas ni marcas malformadas. Sin raya larga ni raya media en
  el guion ni en el archivo de imágenes.
- Quedan en pie dos cosas que el prompt no exige y que no bloquean, anotadas en
  la vuelta 1: el gancho nombra solo el 22-09-2026 cuando el asunto volvió el
  23, el 24 y el 25-09-2026, y la línea 10 atribuye al Gobierno el descarte del
  tratado que la entrega pone en boca del presidente José Antonio Kast.
