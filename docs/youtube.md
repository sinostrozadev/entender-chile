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
