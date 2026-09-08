# Decisión: NO responder la revisión de la API (07-09-2026)

Santiago frenó el envío con tres preguntas, y las tres tenían razón. Esto es
lo que se verificó antes de decidir, para que ninguna sesión futura vuelva a
dar por buena la premisa vieja.

## La premisa que estaba mal

El repo venía repitiendo que "sin la auditoría no podemos publicar". **Es
falso.** La restricción es real pero acotada: la
[doc oficial](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)
dice que los videos subidos por `videos.insert` desde un proyecto no auditado
(creado después del 28-07-2020) quedan **restringidos a privado en el momento
de la subida**. No dice, ni implica, que no se puedan publicar después.

La prueba está en el propio canal: **33 videos subidos por este cliente, 29
públicos**, publicados a mano en Studio sin fricción, desde el día uno.

## Qué ganaríamos realmente

Solo que el script publique o programe por su cuenta (`publishAt`). Y ni
siquiera eso es exclusivo: **programar ya se puede hoy desde Studio**, con el
mismo clic con el que se publica. El beneficio neto es un clic diario que la
regla dura 19 obliga a dar igual ("la máquina produce, una persona aprueba").

## Qué arriesgábamos

El correo preparado era un dossier detallado que explica que cuatro videos
diarios salen solos de un script, con el fuente completo adjunto. Desde julio
de 2025 la política de **contenido inauténtico** de YouTube desmonetiza
canales "de plantilla producidos en masa"; el canal cumple (declara el
contenido sintético, cada edición se escribe distinta, hay decisiones humanas
registradas), pero no hay razón para entregar voluntariamente el peor resumen
posible del proyecto a cambio de un clic. No hay evidencia pública de que el
equipo de la API comparta su revisión con el del YPP, y tampoco de lo
contrario: la asimetría entre beneficio marginal y riesgo sobre lo único que
importa (llegar al YPP antes del 01-02-2027) decide sola.

## Qué se hizo

- NO se envía la respuesta. El borrador queda archivado y marcado como no
  enviado (`respuesta-revision-2026-09-02.md`), junto con el correo que se
  había preparado y el log real de una subida.
- Se corrigió el comentario de `scripts/youtube-subir.js`, que era la fuente
  de la premisa falsa.
- El plazo (≈10-09) se deja expirar. No hay castigo: el proyecto sigue
  subiendo privado, exactamente como hoy.

## Si algún día conviene retomarlo

Cuando el canal esté monetizado y publicar 4 piezas diarias a mano sea una
carga real, o si Google alguna vez restringe algo más que el estado inicial
del video. Ahí el cálculo cambia y esta carpeta tiene todo listo.
