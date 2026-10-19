VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-19T05:03:29Z

Correcciones:
1. Dónde: en "## Notas del barrido", la línea "El suplente no navega: ...",
   donde dice "Lo que entra de esas instituciones llega por prensa: ...
   Senado (la Naín Retamal 2.0, las subcomisiones del Presupuesto 2027 y la
   subcontratación de call center)" · Regla: el contrato que este prompt manda
   leer primero, "VERIFICAR ANTES DE AFIRMAR: Cuando vayas a afirmar algo
   sobre un archivo del repo (que falta, que no contiene tal línea, que está
   vacío, que no se pudo leer), ábrelo y compruébalo en esa misma ejecución
   antes de decirlo" · Debe quedar: la nota solo puede nombrar candidatas que
   estén en la pieza, y la de call center no está (se buscó "call center" en
   contenido/preseleccion/2026-10-19.md y la única coincidencia es esa misma
   línea 231). O se borra "y la subcontratación de call center" de la nota, o
   entra como candidata en "## Trabajo y pensiones" con el material del JSON
   del día: titular "El Senado podría frenar la subcontratación de call center
   en el extranjero (sin confirmar)", medio DUPLOS.CL (un solo medio, sin
   destaque), URL
   https://news.google.com/rss/articles/CBMiswFBVV95cUxOQXlZMk9mYWNYSVZLZnVLVTdya1U0RHpCN1RGeXJaV28zUEdlTUYySjlyeWxJbWd1VFZHU1Z5akJERk9zR2VNcmpQRlVzQURlb1g5ek1hZm92OFZRSDZmNXB1ME5ucTJVOGxKTUZBVGhFY1RDaDNZYWdlcERnZ2JxdVVUSkVQbTJJQUNTUXRPMnRKay1MWllOak55SjVQVTc1UGlwRG1LZUQ0TG1sbkNDb3Jndw?oc=5
   Si entra, hay que actualizar también el total de candidatas y el recuento de
   las marcadas "(sin confirmar)".
2. Dónde: en "## Notas del barrido", la línea "Veinticuatro candidatas van
   marcadas "(sin confirmar)" ...", donde dice "las ocho de Publimicro (el
   Presupuesto 2027, la megarreforma tributaria, la Ley de Reconstrucción,
   Codelco, la comisión investigadora del Fondo E, Minera Centinela)" y donde
   la lista de medios incluye "Diario Clave9.cl" · Regla: la misma del punto
   anterior, "VERIFICAR ANTES DE AFIRMAR ... ábrelo y compruébalo en esa misma
   ejecución antes de decirlo" · Debe quedar: el recuento tiene que calzar con
   lo que trae la pieza. Las candidatas de Publimicro marcadas "(sin
   confirmar)" son SEIS, no ocho, y son las seis que la propia nota enumera.
   "Diario Clave9.cl" no es el medio de ninguna candidata (cero coincidencias
   de "Clave9" fuera de esa nota). Y falta en la lista la candidata del récord
   de exportaciones, cuyos medios son Diario Chañarcillo y El Reportero de
   Iquique. Corregido eso, los medios enumerados tienen que sumar las 24
   candidatas marcadas, que es el número que la propia nota declara y el que
   efectivamente trae la pieza.

Observaciones:
- Para la pieza siguiente: la encuesta Criteria del aniversario quedó fuera de
  la olla y es dato duro para el informe del 18-O: "Criteria: A siete años, 59%
  cree que el estallido social fue negativo para el país", de Ex-Ante y marcada
  como exclusiva de medio de investigación (línea 627 de
  contenido/barrido/2026-10-19.md, con enlace propio del medio,
  https://www.ex-ante.cl/politica/criteria-59-estallido-social-negativo/). La
  pieza sí trae la otra encuesta de Criteria, la de preferencia presidencial.
- Para la pieza siguiente: tampoco entró el subsidio unificado al empleo, que
  recibió más de 70 mil postulaciones en su primer día (sección Economía del
  barrido). Es un programa nuevo con demanda masiva y toca trabajo y bolsillo:
  la cifra la tiene el Ministerio del Trabajo o el SENCE.
- Para la pieza siguiente: en "## Plata pública" del barrido hay una
  adjudicación de obras que no entró, el nuevo campamento de Vialidad en el
  complejo fronterizo Cardenal Samoré (Noticias de Bariloche, corroborada en 2
  fuentes). Es inversión pública en Los Lagos y el monto habría que buscarlo en
  la ficha de la adjudicación.
- Para la pieza siguiente: las tres discrepancias de cifras que la pieza misma
  deja anotadas en sus notas (los fallecidos de la avalancha de Portillo, el
  alcance de la emergencia climática preventiva y el número de licencias falsas
  de los médicos de La Serena) hay que cerrarlas con fuente primaria, no entre
  medios: Fiscalía Regional de Valparaíso, el decreto del Ministerio del
  Interior y la Fiscalía de Coquimbo.
- Lo que está bien y no hay que tocar en la corrección: las 56 candidatas
  cumplen el formato de dos líneas con medio y URL (56 titulares y 56 líneas
  "Por qué podría importar", verificado una por una), las doce áreas de
  cobertura obligatoria tienen candidata, el tamaño queda en rango (56, dentro
  de 35 a 60), la cuota de regiones se cumple con nueve regiones fuera de la
  Metropolitana, y las ausencias del informe del 18-10-2026 se verificaron:
  ese informe no trae ninguna línea "PENDIENTE DE CIERRE" (se buscó la marca
  literal en contenido/informes/2026-10-18.md y hay cero coincidencias), así
  que no faltaba ninguna candidata obligatoria. Las cifras del barrido que la
  pieza cita en sus notas calzan con las líneas 1 a 6 del barrido.
- Las seis fuentes institucionales sin feed no se abrieron, y la pieza lo
  declara como corresponde a quien no navega: no es incumplimiento. Quedan
  pendientes para el informe el decreto de la emergencia climática, el dictamen
  de Contraloría por el teatro del Liceo Gabriela Mistral y el informe del
  Banco Central o de Aduanas por el récord de exportaciones.
- El script scripts/revisar-mecanico.js no encontró hallazgos: sin rayas, sin
  fechas relativas y sin emojis.
