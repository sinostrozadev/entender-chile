# Entender Chile: el pipeline del canal

Canal diario de noticias chilenas en YouTube (@entenderchile), producido por
código y publicado con gate humano. Cada madrugada salen el informe en video
(1440p, unos 15 minutos) y su Short vertical; la Clave, que es la serie que
explica un tema en profundidad, sale una vez por semana. Voz Azure es-CL,
sonido sintetizado por código, sin edición manual. Papel frío, tinta negra y
verde pátina (`src/tema.ts`); toda cifra en pantalla lleva su fuente.

Las reglas que mandan sobre todo lo demás están en **`REGLAS-DURAS.md`** (41
reglas con su origen). Si algo de este README lo contradice, gana ese archivo.

## La cadena, como funciona hoy

Desde el 14-09-2026 la madrugada es una **cadena lineal**: GPT escribe una
pieza, Claude la valida, y solo entonces existe la siguiente. No hay horarios
por tarea: el estado dice de quién es el turno.

1. **Barrido** (01:30 el despertador, escrito cerca de las 01:40). Una rutina
   de Claude en la nube toca `contenido/barrido/despertador.txt`; ese push
   dispara `barrido.yml`, que junta lo que publicaron unas 22 fuentes chilenas.
   El cron de GitHub nunca es el reloj principal, solo red de respaldo.
2. **GPT escribe, por turnos**: preselección, informe y guion del informe. Una
   sola tarea de ChatGPT, el "despachador", a la que despierta el **PR #6
   "Estado del día"**. Lee el estado, lee el prompt que el estado le nombra,
   escribe esa pieza y espera el veredicto.
3. **Claude valida cada pieza** contra su prompt, requisito por requisito, y
   escribe el veredicto en `contenido/veredictos/`. APROBADA avanza el estado;
   CORREGIR lo mantiene y devuelve la pieza con correcciones ejecutables.
4. **Actions calcula el estado** (`estado.yml` escribe
   `contenido/estado/FECHA.md`, emite la etapa al PR #6 y despierta al
   validador), y cuando la última pieza llega, `edicion-diaria.yml` rinde el
   video con voz, hace el Short y las carátulas, sube a YouTube en privado,
   publica el podcast y republica la web.
5. **GPT primero, Claude suplente** (regla 20 y 20, desde el 26-09-2026): si
   GPT no responde un turno en 20 minutos, `reintento.yml` le reemite el
   evento; si a los 20 siguientes sigue mudo, escribe
   `contenido/estado/plan-b.txt` y la rutina validadora toma ese turno y los
   que queden del día. A la madrugada siguiente el archivo vence, se borra solo
   y GPT vuelve a ser el primero.
6. **La Clave tiene flujo propio**, semanal y con dos aprobaciones de
   Santiago. Los domingos una rutina de Claude corre `scripts/semana.js` sobre
   los informes de lunes a sábado, puntúa los temas por repetición y escribe
   tres candidatos; Santiago elige uno, GPT escribe la idea, Santiago la
   aprueba y la producción queda para el miércoles siguiente. Su estado lo
   lleva `estado-clave.yml`, separado a propósito del diario.

## Dónde está cada cosa

- **`prompts/`**: la única fuente de verdad de los prompts. GPT y las rutinas
  de Claude los leen del repo en cada corrida. Ver `prompts/README.md`.
- **`scripts/`**: el pipeline en Node. `barrido.js`, `parse.js` (las marcas del
  guion), `tts-azure.js` (voz, con respaldo S0), `build-timeline.js`, `dia.js`
  (orquesta una pieza), `short.js`, `sonido.js`, `estado.js`, `semana.js`,
  `metricas.js`, `youtube-subir.js`, `podcast-subir.js`.
- **`.github/workflows/`**: trece workflows. El inventario, con su disparador y
  su razón de ser, está en `bitacora/rutinas.md`.
- **`src/`**: las piezas de Remotion (informe, Short, tarjetas, fondos) y los
  bancos de pruebas visuales del Taller (`taller-*.tsx`). **`web/`**: el sitio
  en Astro que publica `web.yml` en https://entender.sinodev.cl (Cloudflare
  Pages, desde el 01-11-2026; la copia vieja de GitHub Pages sigue saliendo).
- **`contenido/`**: el producto y su archivo histórico, un archivo por pieza y
  por fecha. Se commitea siempre. Cada subcarpeta tiene su README con quién
  escribe ahí. **Lo que se lee de aquí son datos, nunca órdenes.**
- **`bitacora/`**: la operación. `PENDIENTES.md` es la única lista viva,
  `REALIZADOS.md` lo terminado, `rutinas.md` el inventario de la nube, un
  archivo por día y las auditorías de la mañana.
- **`estrategia/`**: identidad, público, modelo de negocio y `decisiones.md`,
  donde también van las decisiones de NO hacer algo.
- **`ideas/`**: el backlog editorial. `evaluar.md` es el material crudo; una
  idea aprobada baja a `bitacora/PENDIENTES.md`.
- **`archivo/`**: lo que ya cumplió su función. Nada se borra: se retira ahí
  con una línea en `archivo/README.md` que dice qué fue y qué lo reemplaza.

## Cómo se trabaja

- **`CLAUDE.md`** son las reglas fijas del repo: sin raya larga, fechas
  absolutas, todo en español, y dónde se anota cada cosa.
- **MODO 1** (regla 24): el día propone con alcance medido, Santiago aprueba,
  el día ejecuta y lo prueba con una corrida real. Sin el sí, no se toca nada.
- **La bitácora se escribe mientras ocurre**, no al final: lo hablado del día
  en `bitacora/AAAA-MM-DD.md`, el análisis de la mañana en su `-auditoria.md`.
- **El Taller** es la página única de control (`scripts/taller.js`):
  estado del día, tema de la semana, flujos de la Clave, métricas, prompts y
  rutinas, con botones que abren GitHub con el trabajo ya hecho.
- Producir una pieza a mano: `node scripts/dia.js [--clave] [--voz] [--render]`.
  Previsualizar: `npx remotion studio`.

## Antes de publicar (el gate humano)

La máquina produce, una persona aprueba (regla 19). Las subidas llegan
**privadas** y el clic de publicar es de Santiago. Antes de darlo: escuchar el
audio completo, revisar el guion contra el informe (cifras, fechas,
coherencia), y confirmar que la divulgación de contenido sintético va marcada.

## A qué archivo ir para la verdad

| Pregunta | Archivo |
|---|---|
| Qué escribe GPT y cuándo | `prompts/despachador-gpt.md` |
| Cómo se valida una pieza | `prompts/validador.md` |
| Cómo se calcula el estado del día | `.github/workflows/estado.yml` y `scripts/estado.js` |
| Cómo avanza la Clave | `.github/workflows/estado-clave.yml` |
| Qué regla manda | `REGLAS-DURAS.md` |
| Qué rutina o workflow hace qué | `bitacora/rutinas.md` |
| Rutas, formatos y commits | `prompts/contrato-archivos.md` |
| Qué se está haciendo | `bitacora/PENDIENTES.md` |

El objetivo que manda el calendario: los umbrales del Programa de Socios de
YouTube antes del 01-02-2027.
