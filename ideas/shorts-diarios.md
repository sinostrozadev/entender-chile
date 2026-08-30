# Short diario: cinco noticias en un minuto

Idea de Santiago (30-08-2026, noche): un Short vertical al día con cinco
noticias muy resumidas, ~10 s cada una, con música de impacto en vez de voz
(o además), el @entenderchile y la fecha.

## Propuesta de la sesión de la noche

- **No necesita otra tarea de ChatGPT.** El material ya existe: cada bloque
  [A]/[B] del guion trae su [TESIS] (máximo 18 palabras, pensada como tarjeta
  de pantalla). El Short = las 5 primeras tesis (las [A] primero) + el
  [DATO] principal de cada bloque si lo hay. `scripts/short.js` lo arma desde
  `out/FECHA/parsed.json`; nada nuevo que escribir de madrugada.
- **Formato**: 1080x1920, 5 tarjetas de 8 a 9 s (número grande + tesis),
  apertura de 2 s con la fecha y el handle, cierre de 3 s "El informe
  completo, en el canal · @entenderchile". Total 45 a 55 s: cabe en el Short
  clásico de 60 s (YouTube admite hasta 3 min, pero los cortos rinden más).
- **Sonido**: los Shorts se ven mucho en silencio, así que el texto manda.
  Recomendación: voz (Azure, ~600 caracteres, cuesta nada) + una cama musical
  de la **Biblioteca de audio de YouTube** (gratis y licenciada para YouTube;
  Santiago elige 1 o 2 pistas "cinematic/dramatic" y las deja en
  `public/musica/short-*.mp3`). Sin voz también funciona.
- **Subida**: `youtube-subir.js --short` (vertical + "#Shorts" en el título).
  Privado hasta que Santiago publique, como el informe.
- **Costo**: render ~3 min en GitHub Actions (vs 21 del informe), cuota API
  1.600 unidades.
- **Por qué vale**: los Shorts alimentan suscriptores y el algoritmo los
  empuja a gente que no busca noticias; la ruta de 10 M de vistas de Shorts
  para monetizar no es realista, pero los 1.000 suscriptores sí se aceleran.

## Decisiones que faltan (Santiago)

1. ¿Voz + música, o solo música?
2. Elegir las pistas en Studio → Biblioteca de audio (filtro Género:
   Cinematográfica; Estado de ánimo: Dramática) y avisar.
3. ¿Se publica el mismo día que el informe (mañana) o al mediodía, como
   recordatorio?
