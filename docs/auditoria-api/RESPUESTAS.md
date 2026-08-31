# Hoja de relleno rápido del formulario (en orden, campo por campo)

**S1 · Tipo:** auditoría de cumplimiento (primera opción).

**S2 · Contacto:** Como persona física · Nombre legal: Santiago Inostroza
(completo como en la cédula) · Organización: cuenta propia · Matriz: cuenta
propia · Sitio: https://sinostrozadev.github.io/entender-chile-web/ ·
Dirección legal: sus datos personales (Chile, dirección, ciudad, región,
código postal) · Categoría: Noticias y periodismo · Tamaño: Desarrollador
independiente o propietario único · Contacto: Santiago Inostroza,
entenderchile@gmail.com.

**S3 · Modelo de negocio:** descripción:
"Entender Chile is an independent daily news channel on YouTube
(youtube.com/@entenderchile). We produce a daily news report, short
explainers and vertical Shorts about Chilean news, and publish them on our
own channel. Our API client is an internal automation that uploads our own
produced videos to our own channel as private drafts (with title,
description, chapters, thumbnail and playlist), so the channel owner can
review and schedule publication. The value for our audience is a calm,
source-cited daily news summary; the API is used exclusively to publish our
own content to our own channel."
· Público objetivo: Usuarios internos · Monetización del cliente: Servicio
gratuito · Representante de Google: No · Cómo se enteró: Recursos para
creadores · Content owner IDs / URL / Google Ads IDs: VACÍOS.

**S4 · Cliente y acceso:** Nombre: workflow-entender-chile · ¿Contiene
"YouTube"?: No · URL principal: https://sinostrozadev.github.io/entender-chile-web/
· Privacidad: .../privacidad/ · Términos: .../terminos/ · Descripción: el
texto "Internal automated publishing tool..." de docs/youtube.md · ¿Acceso
público?: No · Cuenta demo: usuario "N/A - no user interface", contraseña
"N/A", URL vacía, instrucciones: "This API client is a server-side
automation (a GitHub Actions workflow) with no user interface and no login
of its own. It authenticates only with the channel owner's OAuth
credentials and uploads our own videos to our own channel. There is no demo
account to provide. The attached screenshot shows the resulting private
uploads in YouTube Studio; we can demonstrate a live run upon request."
· casilla de confirmación: marcada.

**S5 · Cuota:** proyectos: 1 · número: 456975949202 · casos de uso: "Carga
de videos y administración de cuentas" + "Herramienta interna de la empresa"
· OAuth: Sí · volumen: el tramo más bajo (hasta 10.000/día) · cuota total:
Sin cambios/predeterminada · endpoints: videos.insert, videos.update,
videos.list, videos.delete, thumbnails.set, playlists.insert,
playlistItems.insert, playlistItems.list, channels.list, captions.insert,
captions.update, captions.list · videos.insert por separado: 8000/día,
1600/min, justificación:
"We upload up to 5 of our own videos per day to our own channel (a daily
news report, an explainer, two vertical Shorts, plus an occasional
replacement of a same-day video): 5 × 1,600 = 8,000 units/day worst case,
typically 6,400. Uploads run sequentially in a single daily automated
workflow, so there is at most one videos.insert call per minute (1,600
units/minute). No quota increase beyond the default project total is
requested."

**S6 · Pruebas** (los 6 archivos están en esta carpeta y en Descargas):
obligatorias: politica-de-privacidad-youtube-api.png ·
portada-con-vinculo-privacidad.png · condiciones-del-servicio.png ·
condicionales (1 archivo): interfaz-de-carga-workflow.png · diagrama:
diagrama-de-arquitectura.png · flujo de usuarios y otros: vacíos.

**S7:** marcar TODAS las casillas y Enviar. Consejo: subir los archivos de a
uno esperando que cada campo muestre el tamaño (eso confirma que ya subió),
y enviar desde una ventana de incógnito sin extensiones.
