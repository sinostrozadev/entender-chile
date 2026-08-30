# public/fondos/

Fondos entregados por Santiago para probar detrás de las tarjetas o en el
sello, las cortinas y el cierre.

- `fondo-chile-vertical.png` (30-08-2026): azul marino con el mapa de Chile en
  cobre, líneas topográficas y tarjetas crema. Es VERTICAL, así que calza con
  el Short (1080x1920) más que con el informe (1920x1080). Paleta: marino
  `#0F1A2B` aprox., cobre `#B5642F`, crema `#EDE6DA`. Pendiente decidir cómo
  se usa (textura tenue, o completo solo en sello/cortinas/cierre).

Versión 2 (30-08-2026, generadas con Gemini a partir de `ideas/fondos-prompts.md`):
- `fondo-chile-vertical.png`: mapa de Chile en cobre a la derecha, izquierda
  limpia, sin marca de agua (768x1376; la v1 quedó como `-v1.png`).
- `fondo-clave-vertical.png`: verde pátina oscuro con líneas de cobre que se
  ordenan; lo usa `scripts/short.js --clave`.
- `banner-fondo.png`: marino con el mapa en el borde derecho y una franja
  central más oscura donde va el nombre (1376x768; YouTube lo escala a
  2560x1440). Se compone con `npx remotion still src/marca.tsx Banner
  out/marca/banner.png --props='{"fondo":"fondos/banner-fondo.png"}'`.
