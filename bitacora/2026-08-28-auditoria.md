# Auditoría del día 5: qué se construyó, qué funciona, y si vamos hacia el objetivo

Fecha: 28-08-2026. El primer commit del proyecto es del 23-08-2026 a las
23:44. Esto es, literalmente, el quinto día.

Todo lo que sigue sale de mirar el repo, las ejecuciones de GitHub Actions,
los releases y los archivos producidos. No hay estimaciones.

## Lo que existe

| | |
|---|---|
| Commits | 116 en 5 días |
| Informes diarios | 5 (24, 25, 26, 27, 28) sin faltar un día |
| Claves | 5 |
| Guiones de informe | 5 |
| Revisiones de calidad | 4 |
| Dossiers del observatorio | 10 |
| Videos renderizados | 3 (releases del 25, 26 y 27) |
| **Videos publicados** | **0** |
| **Suscriptores** | **0** |
| **Horas vistas** | **0** |

Palabras escritas: 25.315 de contenido publicable, 25.804 de dossiers,
22.588 de estrategia e ideas. Once decisiones registradas.

## Lo que funciona, y funciona bien

**La cadena editorial no ha fallado un día.** Cinco de cinco. Preselección,
informe, Clave, guiones y revisión. Para cinco días de vida, eso no es
obvio.

**El observatorio está vivo y creciendo dentro del informe.** La alerta
"¿En qué quedó?" apareció 0 veces el 24 y el 25, una el 26, dos el 27 y
tres el 28. El diferenciador del canal, el que dice que no nos olvidamos,
ya está operando en el producto, no solo en el papel.

**El barrido mejoró de verdad.** El arreglo del 27 (se perdía el campo
`origen` al deduplicar) pasó de 0 a 21 exclusivas de CIPER, Ex-Ante e
Interferencia en un solo día. Ese criterio es el que rescata la
investigación propia, que por definición tiene una sola fuente.

**La web se publica sola y no falla.** 30 ejecuciones, todas por `push`.

## Lo que no funciona

### 1. El canal no existe

`web/canal.json` tiene el link de YouTube vacío. `contenido/videos/` ni
siquiera existe como carpeta. No hay handle reservado, no hay canal de
marca, no hay un video publicado.

La máquina produce todos los días para nadie.

### 2. El cron de GitHub Actions no es confiable

| Workflow | Disparo | Ejecuciones | Falló hoy |
|---|---|---|---|
| Web | `push` | 30, todas bien | no |
| Barrido | `cron` 06:30 UTC | 2 en 2 días | **sí** |
| Edición diaria | `cron` 09:00 UTC | 6 en 5 días | **sí** |

La única ejecución programada del barrido salió a las 17:50 UTC con un cron
puesto a las 06:30: once horas de atraso. Hoy ninguno de los dos corrió.

Resultado del 28: hay informe, Claves, guiones y revisión (los pusheó
Santiago entre las 03:49 y las 04:31), pero **no hay video ni
descripciones**. La parte que dependía de la máquina no ocurrió.

La evidencia apunta a la solución: lo que se dispara por `push` funciona
30 de 30. **Disparar el render por push a `contenido/guiones/informe/**` y
dejar el cron solo de respaldo.**

### 3. La revisión de calidad detecta y no corrige

Cuatro días de revisiones, cuatro APROBADA, cero hallazgos graves. Bien.
Pero de los 14 hallazgos menores, **12 son exactamente el mismo**: el guion
omite un dato que sí está en el informe.

Se repite el 25, el 26, el 27 y el 28. Nadie cambió nada en medio. La
bitácora de `prompts/CALIDAD.md` tiene entradas del 25 y del 26 y se cortó:
las revisiones del 27 y del 28 no están registradas.

Un ciclo que revisa y no aprende es decorativo. Y aquí importa el doble,
porque ese registro es parte de la defensa de aporte editorial humano ante
la política de contenido no auténtico.

Hay que decidir cuál de las dos cosas está mal:

- Si el guion **debe** llevar esos datos, hay que arreglar
  `prompts/guion-informe.md`.
- Si el guion **es** una compresión del informe y omitir detalle es su
  trabajo, entonces la rúbrica está penalizando lo correcto y hay que
  arreglar la rúbrica.

No puede quedarse en el limbo cuatro días más.

### 4. El video dura más de lo prometido

`identidad.md` y `publico.md` prometen diez minutos, dos veces cada uno.

| Día | Duración estimada del guion |
|---|---|
| 24 | 15,8 min |
| 25 | 15,8 min |
| 26 | 15,5 min |
| 27 | 11,4 min |
| 28 | 11,9 min |

El cambio del 28 ("Más cobertura en la web, mismo largo de video") corrigió
la mitad del problema. Sigue habiendo entre 15% y 20% de exceso sobre la
promesa, y la promesa se la hicimos al ciudadano ocupado que mira el
teléfono en la mañana.

### 5. Documentos que ya no dicen la verdad

- `estrategia/hoja-de-ruta.md` sigue diciendo que la voz clonada es
  "EXISTENCIAL" y pide los secrets de ElevenLabs. Se decidió lo contrario
  el 27: Azure, y la clonación aparcada.
- `prompts/README.md` abre con "los cuatro prompts que corre `generar.js`
  envía a la API". Ni son cuatro ni existe generar.js.
- `README.md` raíz describe generar.js como plan B.
- `contenido/README.md` no menciona `barrido/`, `preseleccion/` ni `casos/`.

### 6. Lo especificado que no se construyó

La palabra del día y los indicadores del país tienen su especificación
completa y su banco de datos, pero no existe una página que los muestre.
Las páginas de la web son: portada, informes, claves, en-que-quedo y
acerca. Nada más. No es un error, es trabajo pendiente que conviene no
olvidar que está pendiente.

## ¿Se está cumpliendo el objetivo?

El objetivo declarado en `modelo-de-negocio.md` es entrar al YouTube
Partner Program antes del 1-feb-2027, cuando el umbral se duplica.

Desde hoy quedan **157 días**. El contador de horas vistas está en cero, y
va a seguir en cero mientras no haya un canal.

La cuenta, para tenerla a la vista: 4.000 horas son 240.000 minutos. Con
una duración media de vista de 4 minutos, que es optimista para un informe
de 12, hacen falta unas 60.000 vistas. En 157 días son unas 380 vistas
diarias de promedio, partiendo de cero. Y como la ventana del YPP es de 12
meses móviles, cada día sin publicar no se recupera: se pierde.

Entonces, la respuesta honesta tiene dos partes.

**El producto sí va bien.** En cinco días hay una cadena editorial que no
falla, un observatorio con diez casos y cifras verificadas, una web que se
publica sola y un diferenciador real que ya opera dentro del informe. Eso
es más de lo que había.

**El objetivo no.** El objetivo no es tener un pipeline: es tener audiencia
antes de febrero. Y en esa dimensión el marcador es cero, no porque algo
haya fallado, sino porque no se ha intentado.

El cuello de botella dejó de ser técnico. Se escribieron 22.588 palabras de
estrategia e ideas, casi tantas como de contenido publicable, y el
proyecto lleva cinco días sin ejecutar el punto más barato de toda la hoja
de ruta: **crear el canal**. Eso no depende de Azure, ni de la voz, ni de
las cortinas, ni de las miniaturas. Se puede hacer hoy.

## Lo que hay que hacer, en orden

1. **Crear el canal de marca y reservar el handle.** Santiago. No depende
   de nada. Es el único punto que mueve el marcador del objetivo.
2. **Cuenta de Azure y los dos secrets.** Sigue bloqueando la voz, y sin
   voz no hay video publicable.
3. **Render por push en vez de por cron.** Una línea en el workflow,
   respaldada por 30 ejecuciones que demuestran que el push sí funciona.
4. **Resolver la contradicción de la rúbrica** (¿arreglar el guion o
   arreglar la revisión?) y volver a llenar la bitácora de CALIDAD.md.
5. **Bajar el informe a diez minutos** o cambiar la promesa. Las dos son
   defendibles; la mezcla actual no.
6. **Poner al día los cuatro documentos** que describen un pipeline que ya
   no existe.

Lo que puede esperar: palabra del día, indicadores, Shorts, WhatsApp,
Ko-fi. Todo eso está bien pensado y ninguno acerca el primer video
publicado.
