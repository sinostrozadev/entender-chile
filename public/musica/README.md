# Cama musical del canal

Deja aquí las pistas y el pipeline las toma solo (dia.js las detecta y las
pasa al render):

    public/musica/informe.mp3   → cama del video diario
    public/musica/clave.mp3     → cama de las Claves

Comportamiento: mientras el video es mudo la música suena protagonista
(volumen 0.3); cuando exista narración, baja a cama (0.1).

Reglas para elegir pista (protegen la monetización):
- SOLO música libre de reclamos: YouTube Audio Library (gratis y segura) o
  servicio con licencia activa (Epidemic Sound, etc.). NADA con Content ID.
- Instrumental, neutra, sin melodía protagónica; pulso informativo para el
  informe, tono más cálido/didáctico para la Clave.
- La MISMA pista todos los días: es marca auditiva, como un podcast.
- Guardar aquí (public/musica/) para que viaje al repo y al render en la
  nube — public/*.mp3 de la raíz está gitignoreado (ahí van narraciones),
  esta subcarpeta NO.
