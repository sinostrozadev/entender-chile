# ¿En qué quedó? - la sección de seguimiento de la plata pública

Estado: DECIDIDA (2026-08-26). Decisiones de Santiago: alcance, arquitectura
de tres superficies y métrica principal.

## La promesa

Los medios cubren el destape y desaparecen. Nosotros seguimos cada caso hasta
saber en qué quedó: si hubo sanción, si alguien devolvió la plata, o si no
pasó nada. La pregunta que ordena todo es una sola: **¿cuánto se recuperó?**

## Alcance: solo plata pública

Entra un caso cuando hay **fondos del Estado** comprometidos: fraude,
malversación, contratos irregulares, subsidios mal pagados, dinero no
rendido o no recuperado.

NO entran: delitos de figuras públicas sin dinero fiscal de por medio, líos
privados, denuncias sin causa ni informe de un organismo, ni conductas
personales. No es una sección de persecución a personas: es seguimiento a la
plata. Las personas aparecen porque son parte del caso, con su situación
procesal exacta, no al revés.

Umbral de admisión (los tres):
1. Fondos públicos comprometidos.
2. Respaldo de una fuente institucional: informe de Contraloría, denuncia o
   querella de un organismo, formalización, acusación o sentencia.
3. Monto relevante o valor demostrativo alto (un caso chico y muy explicable,
   como una app de $458 millones que nadie usó, sí entra).

## Las tres superficies

### 1. ALERTA (informe diario, día 1)
Cuando aparece un caso nuevo que cumple el umbral, se informa ese día en el
informe diario como cualquier noticia, con una marca explícita de que entra
al seguimiento: **"Este caso queda en seguimiento"**. Ese mismo día se abre
su dossier en `contenido/casos/`.

También se alerta cuando un caso YA en seguimiento tiene un hito real
(sentencia, formalización, devolución de dinero, sumario cerrado, plazo
vencido sin nada). Los hitos quedan registrados por el sistema en
`contenido/casos/hitos.md`, y el generador del informe los lee cada
madrugada.

Lo que NO es alerta: que un caso siga igual. El silencio también es dato,
pero se cuenta en la superficie 2, no interrumpiendo el informe del día.

### 2. ¿EN QUÉ QUEDÓ? (web, documento vivo por caso)
Una página por caso que se va engordando hasta cerrarlo. Es la versión
pública del dossier: cronología, involucrados con su estado procesal, monto
cuestionado, monto recuperado, próximo hito. Se actualiza sola cada
madrugada cuando hay novedad verificable.

Arriba de todo, el contador del caso: cuestionado versus recuperado.
Y en el índice de la sección, el contador global de todos los casos.

Un caso se marca CERRADO cuando hay sentencia firme o resolución definitiva,
y su ficha queda con el desenlace completo, incluida la respuesta a la
pregunta: ¿volvió la plata?

### 3. VIDEO (por hito, no por calendario)
Se hace video cuando el caso lo merece, no cuando toca:
- **Cierre de un caso**: sentencia firme, resolución definitiva. Video propio.
- **Hito mayor**: formalización de una autoridad, condena, devolución
  efectiva de dinero, sobreseimiento.
- El resto de los avances viven en la web y en el informe diario.

Formato del video de cierre: qué se dijo cuando estalló, qué se prometió,
qué pasó realmente, cuánto se recuperó. La comparación entre el ruido inicial
y el desenlace ES la pieza.

## La métrica en pantalla: cuánto se ha recuperado

La cifra que muestra la sección es el contraste **cuestionado vs recuperado**,
nunca un total de "lo que roban". Razones:
- Es verificable con fuentes oficiales y no acusa a nadie.
- Es la pregunta que nadie está haciendo.
- Un total inflado que suma categorías distintas es atacable y nos costaría
  la credibilidad completa.

Reglas del contador (implementadas en `scripts/casos.js`):
- Las cifras salen del bloque `<!-- datos -->` de cada dossier, nunca de la
  prosa. Parsear texto ya produjo dos errores de cifra.
- Solo se suman cifras comparables: perjuicio con veredicto, perjuicio
  acusado, monto observado por Contraloría, denunciado por un organismo o
  investigado por Fiscalía.
- Las estimaciones y los totales meramente transferidos y auditados se
  muestran APARTE, con su etiqueta. No se suman.
- "Retenido" no es "recuperado": el dinero congelado en una cuenta judicial
  se cuenta en su propia línea. Es una de las mejores historias de la
  sección, no un detalle contable.

## Reglas editoriales no negociables

1. Presunción de inocencia estricta. Estado procesal exacto y fechado por
   persona. Nunca "ladrón", "corrupto" ni "se robaron": se dice qué consta y
   quién lo sostiene.
2. El derecho a respuesta se ejerce: si el aludido respondió, su respuesta va
   en la pieza, con fecha.
3. Sin música de suspenso ni recursos de farándula judicial. Es el mismo
   canal sobrio: papel, tinta, cifras con fuente.
4. Los errores se corrigen a la vista, en el propio dossier y al aire.
5. Sin estadísticas por partido hasta tener muestra suficiente y metodología
   publicada. Antes de eso son munición partidista y rompen la neutralidad
   del canal.

## Estado de implementación (2026-08-26)

Listo:
- 10 dossiers abiertos con investigación verificada.
- `scripts/casos.js`: actualización diaria por caso, contador y registro de
  hitos en `hitos.md`.
- Backlog de 12 casos candidatos en `contenido/casos/candidatos.md`.

Pendiente:
- Alerta conectada al prompt del informe diario (lee `hitos.md`).
- Página web de la sección (depende de la web estática, en ideas/evaluar.md).
- Plantilla del video de cierre en Remotion.
