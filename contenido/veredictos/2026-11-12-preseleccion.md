VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-12T04:59:52Z

Correcciones:
1. Dónde: "Historias en curso sin novedad hoy", primera línea: "El Teleférico
   Bicentenario y su marcha blanca, que fue portada en la edición del
   10-11-2026." · Regla: el prompt ordena leer el contrato primero y dice que
   manda "sobre todo lo que sigue: rutas exactas, formato, reglas de commit y,
   sobre todo, VERIFICAR ANTES DE AFIRMAR", y el contrato exige: "Cuando vayas
   a afirmar algo sobre un archivo del repo (que falta, que no contiene tal
   línea, que está vacío, que no se pudo leer), ábrelo y compruébalo en esa
   misma ejecución antes de decirlo". · Debe quedar: la atribución verificada.
   En contenido/informes/2026-11-10.md la palabra "Teleférico" no aparece
   ninguna vez; el Teleférico es noticia [A] en el informe del 11-11-2026
   (línea 92, "### [A] El Teleférico Bicentenario inicia su marcha blanca") y
   la portada de esa edición fue otra ("NOTICIA DE PORTADA: Camioneros
   mantienen el paro tras otra reunión sin acuerdo", línea 9). La marcha
   blanca sí empezó el 10-11-2026 (línea 94 de ese informe). Sirve: "que fue
   noticia [A] en la edición del 11-11-2026, con la marcha blanca iniciada el
   10-11-2026".
2. Dónde: "Notas del barrido": "Con fuente única y marcadas "(sin confirmar)"
   arriba: el sismo de magnitud 5,1 cerca de Ancud (línea 465, Puranoticia),
   el derrame de relaves de Valparaíso (línea 630, ...) y la carta de los
   científicos al Presidente Kast (línea 36, El Observatodo, y el barrido no
   trae el contenido de la carta)." · Regla: la misma del contrato citada en
   la corrección 1 (VERIFICAR ANTES DE AFIRMAR), aplicada a la entrada que el
   prompt declara, contenido/barrido/2026-11-12.md. · Debe quedar: la carta
   fuera de esa lista, porque la entrada no la da de fuente única: la línea 37
   del barrido dice "El Observatodo · corroborada en 2 fuentes", a diferencia
   de las otras dos, que traen la marca "(un solo medio por ahora)" en las
   líneas 466 y 631. La marca "(sin confirmar)" de la candidata puede quedarse
   con su razón verdadera y verificada, que el barrido no trae el contenido de
   la carta.
3. Dónde: "Notas del barrido": "Se verificó que `contenido/estado/plan-b.txt`
   no existe: la carpeta `contenido/estado/` se listó completa en esta corrida
   y el archivo no está entre sus 128 entradas." · Regla: el contrato pide que
   la evidencia sea la que se vio: "Antes de declarar que un archivo no
   existe, lista su carpeta y cita en tu respuesta lo que viste". · Debe
   quedar: el número real de entradas, o ninguno. La conclusión es correcta y
   quedó comprobada acá (plan-b.txt no está, lo borró el commit 70d2aa5 "plan
   B vencido"), pero la carpeta tiene 145 entradas, no 128, tanto en el commit
   de la pieza (db9b093) como en su padre.

Observaciones:
- Para la pieza siguiente: el cierre pendiente entra como candidata y hay que
  resolverlo con el dato real. El informe del 11-11-2026 prometió en cámara la
  respuesta de la Subsecretaría de Justicia al requerimiento de Contraloría
  con plazo 11-11-2026 (línea 62 de ese informe) y el barrido de hoy no la
  trae: se buscó "Subsecretar" y "Defensoría de la Niñez" en las 653 líneas y
  dieron cero. El informe lo cierra con la respuesta o dice expresamente que
  sigue sin responderse.
- Para la pieza siguiente: tres datos de esta olla no se pueden publicar como
  vienen. El perfil fechado "Sebastián Lelio (1974-2026)" de La Tercera
  (línea 324 del barrido) apunta a una muerte que el barrido no confirma con
  ninguna nota del fallecimiento: se confirma antes de escribir una línea o no
  entra. La alerta del Sernac llega con dos cifras distintas en el mismo
  barrido (más de 2.500 autos y cinco modelos en una entrada, más de 2.600
  vehículos Volkswagen en otra). Y las tres entradas del papa León XIV en Perú
  vienen de Instagram y Facebook (líneas 213, 219 y 222), que no son fuente
  para citar.
- Para la pieza siguiente: quedó un hueco declarado que el informe sí puede
  tapar, porque quien lo escribe abre páginas. Ninguna de las seis fuentes
  institucionales sin feed se pudo abrir en esta corrida, y lo que más falta
  es la respuesta en el sitio de Contraloría, el decreto de congelamiento de
  combustibles y el detalle de las Alertas Rojas por calor en Senapred y la
  Dirección Meteorológica.
- Lo verificado y que no hace falta revisar de nuevo: 56 candidatas (rango 35
  a 60), las doce áreas de cobertura obligatoria con al menos una candidata
  cada una, la cuota de regiones con doce candidatas fuera de la Región
  Metropolitana, el formato de los 56 bloques de dos líneas con sus tres
  campos, las tres secciones finales, cero rayas y cero emojis, y las cifras
  del barrido que cita la pieza (204 noticias con señal de 665 únicas en 22
  fuentes, 47 sin área contra 43 el 11-11-2026, y las líneas 58, 185, 324,
  357, 402, 468, 627 y 651).
- Falla del barrido que la pieza reporta por tercer día y conviene que no se
  pierda: 47 de 204 noticias llegaron sin área asignada, contra 43 de 158 el
  11-11-2026, y ahí venía buena parte de lo más fuerte del día. Es trabajo
  manual que se repite cada madrugada.
- Formato menor, no bloquea: falta la línea en blanco antes de "## Áreas sin
  material hoy" (línea 196), la única del archivo que no la tiene. Ningún
  script parsea la preselección por dentro (solo scripts/estado.js y
  scripts/taller.js, y solo por existencia), así que no rompe nada.
