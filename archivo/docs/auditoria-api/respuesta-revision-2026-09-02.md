> ⚠️ **NO ENVIADO — decisión de Santiago, 07-09-2026.** Ver
> `docs/auditoria-api/DECISION-07-09.md`. Este borrador queda como archivo:
> la premisa que lo motivaba ("sin auditoría no podemos publicar") es FALSA,
> verificada contra la doc oficial y contra el propio canal (33 videos
> subidos por la API, 29 públicos, publicados a mano sin problema).

# Respuesta a Google — revisión de cumplimiento (recibida 01-09, plazo 7 días hábiles ≈ 10-09)

Google pidió (correo de youtube-disputes@, 01-09 06:14): *"the script /
screencast of how you are uploading videos to YouTube along with the
end-results"*. O sea: el script, cómo corre, y el resultado final. Responder
**desde entenderchile@gmail.com con Reply en el mismo hilo** (no correo nuevo).

## Qué adjuntar (checklist de Santiago)

1. **Captura A — el log del workflow**: GitHub → repo entender-chile →
   Actions → una corrida reciente de "Edición diaria" → paso
   **"7 · Subir a YouTube (privado; solo si hay secrets)"** desplegado, donde
   se vea "Subiendo ... como private" y "Subido: https://youtu.be/<id>".
2. **Captura B — Studio, el resultado**: studio.youtube.com → Contenido →
   filtro Visibilidad: Privado, donde se vean los videos del día subidos por
   la API con su fecha/hora.
3. **Captura C — un video ya público** tras tu revisión manual (la página del
   video en YouTube), para mostrar el final del flujo.
4. **Screencast (opcional pero lo piden; 60-90 s, sin editar)**: graba la
   pantalla (celular o Win+G en Windows) mostrando: la corrida en Actions →
   el log del paso 7 → cambias a Studio → los videos privados recién
   subidos. Sin audio está bien. Súbelo como archivo adjunto si pesa poco, o
   como video **no listado** en el propio canal y pega el enlace.

## Borrador del correo (inglés, listo para pegar)

Asunto: se mantiene el del hilo (Reply).

---

Hello,

Thank you for the follow-up. Here is the requested information about how we
upload videos to YouTube, along with the end results.

**1. What the client is.** Our API client is a small internal Node.js script
(`youtube-subir.js`, full source below). It runs once a day inside a GitHub
Actions workflow in our private repository and uploads that day's videos,
produced by us, to our own channel (Entender Chile,
UCpdqApwfcKxTB5Bb24K4uAw) as **private**. It sets the title, description and
thumbnail, and adds each video to one of our own playlists. The channel
owner then reviews every video in YouTube Studio and publishes it manually.
The only authorized user is the channel owner's account
(entenderchile@gmail.com); the client does not access, collect, store or
share any data from other YouTube users.

**2. The script (full, unmodified source):**

[PEGAR AQUÍ el contenido completo de scripts/youtube-subir.js]

**3. How it runs.** The GitHub Actions workflow calls it once per piece:
`node scripts/youtube-subir.js --fecha $FECHA` (and with `--clave` /
`--short` for the other daily pieces), with the OAuth refresh token stored
as repository secrets. Attached: a screenshot of the workflow log of a real
run, showing the upload and the returned video ID (screenshot A).

**4. End results.** Attached: YouTube Studio showing the daily videos
uploaded as Private by the API with their timestamps (screenshot B), and one
of those videos after the owner manually published it (screenshot C).
Example videos currently public after manual review:
https://youtu.be/OttZ12KyBSk and https://youtu.be/MRG9fw8e5P8. Also attached
is a short screen recording of the flow end to end (workflow log → private
uploads appearing in Studio).

**5. Quota.** We are NOT requesting a quota increase: daily usage is ~6,700
units (4 uploads, thumbnails, playlist inserts, one metrics read) and the
default 10,000 units/day is sufficient. We are requesting the compliance
review so that our own uploads can be scheduled (publishAt) instead of
remaining locked as private.

Please let us know if anything else is needed.

Best regards,
Santiago Inostroza — Entender Chile
Project number 456975949202 · Project ID entender-chile

---

## Notas

- El script se pega COMPLETO en el punto 2 (son ~140 líneas; los comentarios
  en español no son problema, muestran que es real).
- No mencionar cifras de otras cuotas ni funcionalidades futuras más allá de
  publishAt: la respuesta responde exactamente lo que preguntaron.
- Si piden algo más, pasar la pregunta a Claude para armar la respuesta
  (mismo protocolo que el formulario).
