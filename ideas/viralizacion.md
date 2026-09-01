# Estrategias de viralización (para hacer, no todavía)

Pedido de Santiago, 30-08-2026, al ver el primer Short. Lista viva: lo que
se pruebe pasa a `ideas/HECHAS.md` con su resultado medido. Regla de la
casa: cada táctica se prueba dos semanas y se mide antes de opinar; los
Shorts se deciden por **retención** (% que llega al final) y **swipe-away**
(% que se va en los primeros 2 s), no por gusto.

## 1. Hora de publicación

- **Short del informe: 07:30 Chile**, lunes a viernes. Es el trayecto al
  trabajo, celular en mano, y "cinco cosas que hay que saber hoy" es
  literalmente el momento. El informe largo sale antes (05:30-06:00) para
  quien lo ve en el escritorio; el Short lo recuerda dos horas después.
- **Short de la Clave: 13:00** (almuerzo) o **20:30** (sofá): es contenido
  que no envejece en el día, sirve para rellenar la segunda ventana de
  tráfico móvil.
- Fines de semana: 10:00. No hay trayecto; hay desayuno.
- Después de 3 a 4 semanas, mirar YouTube Studio → Analytics → Audiencia →
  "Cuándo están tus espectadores en YouTube" y corregir con datos propios.
- YouTube empuja un Short según cómo le va en la primera hora: publicar a
  hora fija todos los días entrena al algoritmo y a la audiencia. Hasta que
  pase la auditoría de la API (subida en privado), la hora la pone Santiago
  con un clic; después, `publishAt` automático.

## 1b. La rutina de publicación diaria (consolidada, 1-09)

| Hora (Chile) | Qué | Dónde |
|---|---|---|
| ~07:00 | Revisar los 4 videos en Studio (5 min) | YouTube |
| 07:30 | Publicar Short del informe + el informe | YouTube |
| 07:35 | El MISMO Short como Reel (desde el celular) | Facebook |
| 13:00 | Publicar la Clave y su Short | YouTube |
| 13:05 | (opcional) Short de la Clave como Reel | Facebook |
| — | Vincular cada Short a su video largo; responder comentarios | YouTube |

El archivo del Short queda cada madrugada en el release:
https://github.com/sinostrozadev/entender-chile/releases/latest
(descargable desde cualquier dispositivo; la sesión de la mañana además lo
deja en Descargas cuando está activa). Fines de semana: todo a las 10:00.

## 2. Los primeros 2 segundos (lo que más pesa)

- **Cold open**: la cifra más fuerte del día ANTES del sello, sin saludo.
  Hoy el sello dura 2,8 s y la voz entra a los 3: en un Short eso es mucho.
  Probar: tarjeta 1 de inmediato con el sello reducido a 0,8 s, o el sello
  al final.
- El texto en pantalla debe permitir entender el Short en silencio (ya está:
  cifra + tesis), porque más de la mitad se ven sin audio.
- Primera tesis = la noticia con el número más chocante, no la "más
  importante" editorialmente. El orden del Short puede diferir del informe.

## 3. Formato reconocible (serie)

- Nombre fijo de la serie en el título: **"5 cosas que hay que saber hoy ·
  <fecha>"**. La repetición diaria del formato es lo que hace que la gente
  vuelva; el contenido cambia, el molde no.
- Mismo fondo, misma voz, misma hora. La marca se construye por repetición.
- Numerar las tarjetas ("2 de 5") crea expectativa de completar.

## 4. Título, descripción y hashtags

- Título del Short: la cifra más fuerte + el tema, en 40 caracteres
  ("Desempleo 9,5%: lo que hay que saber hoy"). `#Shorts` va en el título o
  la descripción (ya está).
- Descripción: primera línea con la noticia principal, link al informe
  largo del día, `#Chile #noticias #EntenderChile`. Máximo 3 a 5 hashtags.
- **Comentario fijado** con el link al informe completo (el Short tiene
  poco espacio, el comentario no).

## 5. Del Short al canal (conversión)

- El cierre nombra el canal (hecho el 30-08) y muestra el handle.
- YouTube permite **enlazar el Short a un video largo** ("Vincular video
  relacionado"): usarlo SIEMPRE con el informe del día. Es el botón que más
  convierte de Short a largo.
- Cuando haya 10 Shorts, armar la lista "5 cosas" y ponerla en la portada.

## 6. Redistribución (mismo archivo, cero costo)

- El mismo mp4 vertical sirve para **TikTok e Instagram Reels** (reservar
  @entenderchile en ambos, ya en PENDIENTES). Subir a mano al principio;
  automatizar después si rinde.
- Facebook, alcance del plan (1-09): fase 1 = SOLO Reels diarios. Por qué:
  es el único formato de FB que empuja a desconocidos; los posts con link
  externo pierden alcance; y el informe largo debe verse en YouTube, que es
  donde las horas cuentan. Si en 2 semanas hay tracción, fase 2 = sumar un
  post de TEXTO nativo diario (las frases de "En titulares"), que al público
  35-60 de FB le acomoda. Monetización de FB: existe (anuncios en Reels e
  in-stream, bonos por invitación) pero exige ~5.000 seguidores y decenas de
  miles de minutos vistos; se evalúa cuando los seguidores se acerquen —
  hoy FB es embudo y marca, la plata primero es YouTube.
- WhatsApp: el Short se comparte bien en grupos familiares (público del
  canal: 35-60 años). Un canal de WhatsApp del proyecto ya está diferido en
  ideas/; el Short puede ser lo que lo reactive.

## 7. Interacción en la primera hora

- Responder los primeros comentarios el mismo día (Santiago, 5 minutos).
- Una pregunta al final del Short ("¿cuál te importa más?") sube los
  comentarios, pero pelea con "sin gritos". Probar solo en la Clave.

## 8. Lo que hay que medir (Studio → Analytics del Short)

| Métrica | Bien | Mal | Qué tocar |
|---|---|---|---|
| Vistas vs. "se saltaron" (swipe) | > 70% se quedan | < 50% | primeros 2 s, primera tesis |
| Retención promedio | > 80% | < 60% | duración (bajar a 35-40 s), tesis más cortas |
| Suscriptores por 1.000 vistas | > 5 | < 2 | cierre, vínculo al largo |
| Vistas del informe el mismo día | suben con el Short | no cambian | el vínculo al video largo |

## 9. Ideas para después

- Un Short "¿En qué quedó?" semanal con el contador del observatorio.
- Versión de 15 s con UNA sola cifra los días de noticia enorme.
- Miniatura del Short: YouTube usa un cuadro del video; elegir el de la
  cifra más grande (se puede fijar al subir).
