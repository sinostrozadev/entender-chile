# YouTube: personalizar el canal y automatizar la subida

Guía para Santiago, 30-08-2026. Dos partes: lo que se hace una vez en YouTube
Studio (parte A) y lo que se hace una vez en Google Cloud para que el workflow
suba los videos solo (parte B). Nada de esto publica un video: las subidas
llegan **privadas** y se publican a mano hasta que se decida lo contrario.

## A. Personalizar el canal (YouTube Studio → Personalización)

1. **Marca**: avatar `Descargas/entender-chile-marca/avatar.png` (800x800) y
   banner `banner.png` (2048x1152; lo importante está en el centro, que es lo
   único que se ve en todos los dispositivos). Si el avatar cambia después, se
   regenera con `npx remotion still src/marca.tsx Avatar out/marca/avatar.png`.
2. **Información básica**:
   - Nombre: `Entender Chile`. Handle: `@entenderchile` (o la variante libre).
   - Descripción: el texto de `estrategia/identidad.md` → "Descripción del
     canal". Al pegarlo, el mismo texto va después en las bios de redes.
   - Enlaces: el sitio (cuando exista entenderchile.cl; mientras, la URL de
     GitHub Pages). Correo de contacto: uno que no sea el personal.
   - País: Chile. Idioma: español.
3. **Configuración → Canal → Configuración avanzada**: "¿Este canal está
   creado para niños?" → **No** (se decide a nivel de canal, si no YouTube lo
   pregunta video por video). Palabras clave: chile, noticias, resumen.
4. **Configuración → Cargar valores predeterminados**: visibilidad
   **Privado**, categoría **Noticias y política**, idioma del video español,
   licencia estándar, comentarios "mantener para revisión". Así hasta lo que se
   suba a mano llega con la regla del canal.
5. **Verificar el teléfono** (Studio → Configuración → Canal → Estado y
   funciones, o youtube.com/verify). Sin esto NO se pueden poner miniaturas
   personalizadas ni videos de más de 15 minutos, y la subida por API falla al
   poner la miniatura.
6. Llenar `web/canal.json` con la URL del canal recién cuando haya al menos un
   video público: al hacerlo aparece el botón "Suscríbete" en la web.

## B. Subida automática (YouTube Data API v3 + OAuth)

Idea: un proyecto de Google Cloud con la API activada, un cliente OAuth que
autorizas UNA vez con la cuenta dueña del canal, y el *refresh token* que
sale de ahí va como secret a GitHub. El workflow, después de crear el release,
sube el mp4 como privado con título, descripción, capítulos y miniatura.

### B1. Proyecto y API (console.cloud.google.com, con la cuenta del canal)

1. Arriba, selector de proyecto → **Nuevo proyecto** → nombre `entender-chile`.
2. Menú → **APIs y servicios → Biblioteca** → buscar **YouTube Data API v3**
   → **Habilitar**.

### B2. Pantalla de consentimiento

3. **APIs y servicios → Pantalla de consentimiento de OAuth** (o "Google Auth
   Platform" → Branding). Tipo de usuario: **Externo**. Nombre de la app:
   `Entender Chile`, correo de asistencia y de contacto: el tuyo.
4. **Público / Publishing status: "En producción"**, no "Prueba". Es el paso
   que la gente se salta: en modo Prueba los refresh tokens **caducan a los 7
   días** y el workflow se rompe en silencio a la semana. En producción sin
   verificar, Google muestra una pantalla de "app no verificada" al autorizar
   (se pasa con "Avanzado → Ir a Entender Chile"), pero el token dura.
5. Si pide **Alcances (scopes)**, agregar `.../auth/youtube.upload` y
   `.../auth/youtube`. Si pide usuarios de prueba, agregar tu cuenta igual.

### B3. Cliente OAuth

6. **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de
   OAuth**. Tipo de aplicación: **Aplicación de escritorio**. Nombre:
   `workflow-entender-chile`. Crear.
7. **Descargar JSON** del cliente. Guardarlo FUERA del repo:
   `~/.claude/projects/-home-santiago-projects-daily/secrets/youtube-client.json`
   (en Windows, cualquier carpeta que no sea el proyecto; luego se copia a WSL).

### B4. Autorizar una vez (en WSL, en el repo)

8. `node scripts/youtube-auth.js ~/.claude/projects/-home-santiago-projects-daily/secrets/youtube-client.json`
   Abre la URL que imprime, elige la cuenta del canal (si tienes canal de
   marca, elige el canal, no la cuenta personal), acepta la advertencia de app
   no verificada, acepta los permisos. La terminal imprime tres valores.
9. En GitHub: repo `entender-chile` → **Settings → Secrets and variables →
   Actions → New repository secret**, tres veces:
   `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`.
   Nunca en un archivo del repo. Si se filtra: Google Cloud → Credenciales →
   borrar el cliente y repetir B3-B4.

### B5. Probar

10. Local, con un video ya renderizado (por ejemplo el del 29):
    `YT_CLIENT_ID=... YT_CLIENT_SECRET=... YT_REFRESH_TOKEN=... node scripts/youtube-subir.js --fecha 2026-08-29`
    Debe imprimir `Subido: https://youtu.be/<id> (private)` y el video
    aparece en Studio como privado. Bórralo después si era prueba.
11. Desde el día siguiente el workflow lo hace solo (paso 7 de
    `edicion-diaria.yml`): si los tres secrets existen, sube; si no, dice
    "sin secrets de YouTube" y sigue. El id queda en `out/FECHA/youtube-id-informe.txt`
    y en el log del workflow.

### Lo que hay que saber

- **Privado obligatorio**: los proyectos de API creados después de julio de
  2020 suben en modo privado hasta pasar la **auditoría de cumplimiento** de
  YouTube (formulario en support.google.com/youtube/contact/yt_api_form;
  tarda días o semanas y pide explicar el uso). Hasta entonces, publicar es un
  clic en Studio, que es justamente la revisión humana que ya se decidió.
  Después de la auditoría se puede subir "programado" (publishAt) y el humano
  solo interviene para frenar.
- **Cuota**: 10.000 unidades al día por proyecto; una subida cuesta ~1.600,
  poner miniatura 50. Dos videos diarios usan un tercio.
- **Publicar un video**: al ponerlo público, copiar su id (lo que va después
  de `youtu.be/`) a `contenido/videos/FECHA-informe.txt` y commitear: la web lo
  embebe sola.

## Anexo (30-08): idioma, dónde está cada cosa, y monetización

- **Studio en español**: arriba a la derecha, el avatar "EC" → *Language* →
  Español (Latinoamérica). Es por cuenta, se cambia una vez.
- **Personalización** = menú izquierdo **Customization / Personalización** →
  pestaña **Profile / Perfil** (banner, foto, nombre, handle, descripción,
  enlaces, correo de contacto) y **Home tab / Página principal** (tráiler,
  secciones). Los cambios se guardan con **Publish / Publicar**.
- **Settings → Channel**: *Basic info*: palabras clave "Chile, noticias,
  resumen de noticias, actualidad, Entender Chile". *Advanced settings*:
  audiencia → "No, set this channel as Not made for kids". *Feature
  eligibility*: verificar teléfono (funciones intermedias: miniaturas
  personalizadas, videos > 15 min); las avanzadas piden cédula o historial.
- **Settings → Upload defaults**: visibilidad Private; en *Advanced settings*
  categoría News & Politics, idioma Spanish.
- **Monetización (Earn)**: el canal es elegible por país y cuenta, pero el
  Programa de Partners exige **1.000 suscriptores + 4.000 horas públicas en
  12 meses** (o 10 M de vistas de Shorts en 90 días), **verificación en dos
  pasos** en la cuenta de Google, cero strikes, y una cuenta AdSense que se
  crea al postular. El escalón previo (500 suscriptores + 3.000 horas) abre
  membresías y "Gracias", no anuncios. Política que más nos toca: la de
  **contenido inauténtico** (julio 2025): lo producido en masa o repetitivo
  sin aporte humano no monetiza; por eso existe estrategia/decisiones.md
  (registro de decisiones editoriales humanas) y el checklist de IA. El
  botón "Notify me when I'm eligible" avisa al llegar al umbral.

## Anexo (30-08): respuestas para el formulario de auditoría, sección por sección

Formulario: support.google.com/youtube/contact/yt_api_form, con la cuenta
entenderchile@gmail.com. Datos fijos: Project number **456975949202** ·
Project ID **entender-chile** · Cliente OAuth **workflow-entender-chile**
(tipo Desktop) · Client ID `456975949202-8ai3tdjm9fbpv3b3gc0atdptgsggehdl.apps.googleusercontent.com`.

1. **Tipo de solicitud**: la primera opción (auditoría de cumplimiento). No
   pedimos más cuota: en el campo de cuota se declara que 10.000 basta.
2. **Contacto y organización**: nombre Santiago Inostroza; correo
   entenderchile@gmail.com; organización "Entender Chile" (creador
   individual / individual developer); país Chile; sitio
   https://sinostrozadev.github.io/entender-chile-web/.
3. **Modelo de negocio y contactos de Google**: "Independent news channel;
   revenue model is future YouTube Partner Program monetization of our own
   channel. No Google contacts." (Sin contactos en Google: No.)
4. **Descripción del cliente y acceso**: pegar:
   "Internal automated publishing tool for our own news channel (Entender
   Chile). Once a day it uploads our own produced videos to our own channel
   (title, description, chapters, thumbnail, playlist) as private, so the
   owner can review and schedule publication. Single authorized user: the
   channel owner's account. Scopes: youtube.upload and youtube. It does not
   access, collect, store or share any data from other YouTube users; the
   only data stored are the IDs of our own uploaded videos, in our private
   repository. API used: YouTube Data API v3."
5. **Casos de uso y cuota**: "Daily usage ~6,700 units (4 video uploads,
   thumbnails, playlist inserts, one metrics read). The default 10,000
   units/day is sufficient; we are NOT requesting a quota extension. We
   request the compliance audit so our own uploads via videos.insert can be
   published/scheduled instead of being locked private."
6. **Pruebas y documentación**: capturas de (a) YouTube Studio con los
   videos subidos en privado por la API, (b) el log del workflow en GitHub
   Actions mostrando la subida, (c) la página de privacidad
   https://sinostrozadev.github.io/entender-chile-web/privacidad/.
7. **Certificaciones**: marcar el cumplimiento de las políticas y Enviar.
   Responden al correo del desarrollador; si repreguntan, pasarle la
   pregunta a Claude para armar la respuesta.

## Anexo: carátula del podcast por episodio

Spotify y Apple muestran la PORTADA del programa (el monograma EC, ya en el
feed) en cada episodio salvo que el feed traiga arte cuadrado por episodio
(itunes:image por item, 1400-3000 px). Decisión 30-08: por ahora solo la
portada del programa; arte por episodio queda como mejora futura (variante
cuadrada de la miniatura + subirla al release + referenciarla en el feed).
