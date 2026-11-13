VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-13T02:05:00Z

Observaciones:
- Para la pieza siguiente: el cierre pendiente entra como candidata y hay que
  resolverlo con el dato real. El informe del 11-11-2026 prometió en cámara la
  respuesta de la Subsecretaría de Justicia al requerimiento de Contraloría
  con plazo 11-11-2026 (línea 62 de ese informe) y el barrido de hoy no la
  trae. El informe lo cierra con la respuesta o dice expresamente que sigue
  sin responderse.
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
  institucionales sin feed se pudo abrir al escribir la preselección, y lo que
  más falta es la respuesta en el sitio de Contraloría, el decreto de
  congelamiento de combustibles y el detalle de las Alertas Rojas por calor en
  Senapred y la Dirección Meteorológica.
- Lo corregido en esta vuelta, verificado uno por uno contra los archivos del
  repo: la atribución del Teleférico ahora dice noticia [A] de la edición del
  11-11-2026 con la marcha blanca iniciada el 10-11-2026, y así está en
  contenido/informes/2026-11-11.md (línea 92 el titular [A], línea 94 el
  inicio el 10-11-2026); la carta de los científicos al Presidente Kast salió
  de la lista de fuente única y queda con su razón verdadera, porque la línea
  37 del barrido dice "El Observatodo · corroborada en 2 fuentes", mientras
  las líneas 466 y 631 sí traen "(un solo medio por ahora)" para el sismo de
  Ancud y el derrame de relaves de Valparaíso; y el conteo de la carpeta
  contenido/estado/ quedó en 145 entradas, que es el número real tanto en el
  commit de la pieza (1d9dfec) como en su padre (dc2221b), sin plan-b.txt
  entre ellas.
- Lo verificado y que no cambió entre vueltas: 56 candidatas (rango 35 a 60),
  las doce áreas de cobertura obligatoria con al menos una candidata cada una,
  la cuota de regiones con doce candidatas fuera de la Región Metropolitana,
  el formato de los 56 bloques con sus tres campos, las tres secciones
  finales, cero rayas y cero emojis. El script scripts/revisar-mecanico.js no
  encontró hallazgos en esta versión. La corrección tocó solo tres líneas, y
  ninguna de ellas abrió un problema nuevo.
- Falla del barrido que la pieza reporta por tercer día y conviene que no se
  pierda: 47 de 204 noticias llegaron sin área asignada, contra 43 de 158 el
  11-11-2026, y ahí venía buena parte de lo más fuerte del día. Es trabajo
  manual que se repite cada madrugada.
- Formato menor que no bloquea y sigue igual: falta la línea en blanco antes
  de "## Áreas sin material hoy" (línea 196), la única del archivo que no la
  tiene. Ningún script parsea la preselección por dentro, así que no rompe
  nada.
