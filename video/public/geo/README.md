# Geometría de las regiones de Chile

`regiones-chile.topo.json` (TopoJSON, objeto `Regional`, 17 polígonos: las 16 regiones y la "Zona sin demarcar"
de Campo de Hielo Sur con código `CL-ZSD`). Propiedades: `codigo` (ISO 3166-2, p. ej. `CL-RM`) y `nombre`.

- **Fuente:** Biblioteca del Congreso Nacional de Chile (BCN), capa "Regiones" del repositorio de mapas vectoriales:
  https://www.bcn.cl/obtienearchivo?id=repositorio/10221/10398/2/Regiones.zip
- **Licencia y condiciones de uso:** la BCN indica que "pueden usar libremente esta información, señalando como
  fuente a la Biblioteca del Congreso Nacional". Por eso todo mapa de regiones lleva en pantalla el crédito
  **"Límites: BCN"** y la descripción del video lo repite.
- **Descargado:** 2026-11-13 (shapefile en Web Mercator, 53 MB).
- **Proceso (mapshaper 0.6):** reproyección a WGS84, se quitan islas de menos de 8 km² (los canales australes
  traen más de 11.000 islotes que no se ven a escala de video), simplificación ponderada al 1,5 % conservando
  todas las formas, cuantización 1e5. Resultado ≈ 470 KB. Isla de Pascua y Juan Fernández quedan (Valparaíso).

Comando para regenerarlo (desde `video/`, con el zip descomprimido en `<dir>`):

```
npx mapshaper -i <dir>/Regional.shp -proj wgs84 -filter-islands min-area=8km2 \
  -simplify 1.5% weighted keep-shapes \
  -each 'codigo = ({15:"CL-AP",1:"CL-TA",2:"CL-AN",3:"CL-AT",4:"CL-CO",5:"CL-VS",13:"CL-RM",6:"CL-LI",7:"CL-ML",16:"CL-NB",8:"CL-BI",9:"CL-AR",14:"CL-LR",10:"CL-LL",11:"CL-AI",12:"CL-MA",0:"CL-ZSD"})[codregion]; nombre = Region' \
  -filter-fields codigo,nombre -o format=topojson quantization=1e5 public/geo/regiones-chile.topo.json
```

La simplificación deja algunas intersecciones sin reparar entre regiones vecinas: a escala de video no se notan,
pero no uses este archivo para medir áreas ni límites exactos.
