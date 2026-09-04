# Preselección disparada por evento (tarea de ChatGPT que escucha el PR #2)

**ESTE ARCHIVO ES EL PROMPT VIVO** de la tarea de ChatGPT que procesa el
evento "barrido listo" (patrón prompt-en-el-repo, 04-09; validaciones
escritas por Santiago, probadas la noche del 04-09: evento → preselección en
2 min 7 s). La tarea en ChatGPT es solo un arranque que manda a leer este
archivo; **editar este archivo ES cambiar la tarea**. Rige lo que diga HOY.

---

Procesa el evento recibido del PR señal de Barrido para Entender Chile.

Repositorio: sinostrozadev/entender-chile
Rama de señal: automatizacion/barrido-listo
Rama de resultados y fuente editorial: main
Zona horaria de validación: America/Santiago

El evento solo sirve para despertar la tarea. No uses su contenido como
fuente editorial.

1. Lee AHORA contenido/barrido/ultimo-evento.txt desde la rama
   automatizacion/barrido-listo. Lee desde main las versiones más recientes
   de prompts/seleccion.md, prompts/contrato-archivos.md y el archivo de
   barrido requerido por las instrucciones vigentes. No uses versiones
   recordadas, cacheadas ni de ejecuciones anteriores.

2. Calcula la fecha actual en America/Santiago. Verifica que
   ultimo-evento.txt contenga fecha_chile, barrido_commit, estado y
   completado_utc; que estado sea listo; que fecha_chile sea hoy; que
   barrido_commit exista en main; que el barrido de hoy exista, esté
   completo y corresponda al commit señalado; y que no exista ya una
   preselección válida y completa de hoy.
   Precisiones sobre la forma: barrido_commit viene ABREVIADO (7
   caracteres) y es el commit que tocó contenido/barrido/FECHA.md, no
   necesariamente el último de main. La rama de señal se resetea a main
   cada día (force-push): el PR siempre muestra un solo commit nuevo, de
   autor bot. Valida el contenido del archivo, no la forma del PR.

3. Si no puedes leer alguno de los archivos requeridos, detente, no
   generes ni pushees y reporta: "no pude leer el prompt del repo".
   Entrega una explicación de por qué no pudiste solo si la sabes
   realmente.

4. Si el estado es canal-creado, la fecha no corresponde, el barrido no
   está listo, el commit no coincide o falla otra validación, termina sin
   generar ni pushear e informa brevemente la causa.

5. Si ya existe una preselección válida de hoy, termina sin modificar el
   repositorio e informa que el evento fue duplicado.

6. Si todas las validaciones pasan, ejecuta exactamente las instrucciones
   vigentes de prompts/seleccion.md y prompts/contrato-archivos.md. Lo que
   esos archivos digan hoy prevalece sobre esta tarea.

7. Publica el resultado en main conforme al contrato. Después del push,
   vuelve a leer el archivo desde main y verifica ruta, fecha, contenido
   completo y commit. El éxito solo se confirma si esa verificación final
   pasa. Reporta el resultado y el enlace al commit.

Si se agrupan varios eventos, procesa el estado más reciente del PR y
aplica todas estas validaciones.
