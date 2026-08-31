# Auditoría de la API de YouTube: ENVIADA con confirmación el 30-08-2026 (~23:20)

Confirmación en pantalla: "Se envió el correo electrónico · Gracias por
enviar el Formulario de servicios de la API de YouTube". El primer intento
quedó colgado y no creó caso; el segundo (ventana limpia) entró. Si
aparecieran dos correos, responder a uno indicando que es duplicado.
Correo de confirmación recibido el 30-08 a las 23:38 desde
youtube-disputes+3f9gqpjq9ly6p1n@google.com ("We will follow up with a
response once the application has been reviewed"): un solo caso, sin
duplicados. El seguimiento se responde a ese mismo hilo.

Formulario: support.google.com/youtube/contact/yt_api_form, con la cuenta
entenderchile@gmail.com. Respuestas completas, sección por sección, en
`docs/youtube.md`. Esta carpeta guarda las seis pruebas presentadas, por si
Google repregunta por correo (llega a entenderchile@gmail.com; revisar spam).

- politica-de-privacidad-youtube-api.png — /privacidad/ con las cláusulas de la API
- portada-con-vinculo-privacidad.png — la portada con el reproductor y el pie
- condiciones-del-servicio.png — /terminos/
- oauth-pantalla-de-consentimiento.png — "Entender Chile wants access…"
- interfaz-de-carga-workflow.png — paso 7 del workflow con las 4 subidas private
- diagrama-de-arquitectura.png — el flujo completo del cliente

Qué se pidió: SOLO la auditoría de cumplimiento (sin extensión de cuota
global; videos.insert declarado en 8.000/día, 1.600/min). Endpoints
declarados: videos.insert/update/list/delete, thumbnails.set,
playlists.insert, playlistItems.insert/list, channels.list, captions.*.
Plazo típico de respuesta: 1 a 3 semanas.
