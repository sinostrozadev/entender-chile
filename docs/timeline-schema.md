# Esquema de timeline.json (versión 1)

```jsonc
{
  "version": 1,
  "meta": {
    "titulo": "…",          // del guion
    "descripcion": "…",     // para la descripción de YouTube
    "fps": 30, "width": 1920, "height": 1080,
    "duracionSeg": 612.4    // último evento + 1,2 s
  },
  "audio": "narracion.mp3", // relativo a public/ ; null si aún no hay voz
  "fuentes": ["Cadem, 22 ago 2026", "…"],
  "eventos": [ /* ordenados por from */ ]
}
```

## Tipos de evento (todos con `from`/`to` en segundos)

| tipo      | campos propios                                   | render                          |
|-----------|--------------------------------------------------|---------------------------------|
| seccion   | texto, overlay:true                              | banner superior 2,6 s           |
| tesis     | texto                                            | serif grande, eyebrow "La idea" |
| narracion | texto, etiqueta? (hecho/interpretacion), soporte?| tarjeta de texto + chip         |
| cita      | texto, autor, fuente                             | cita serif itálica              |
| dato      | grafico, fuente, series[], caption               | barras/cifra/comparación        |
| esquema   | titulo, elementos[], caption                     | cajas → flechas                 |

- `soporte: true` en un párrafo = su intervalo lo ocupa el gráfico anterior y el
  texto aparece como pie; la tarjeta de párrafo NO se renderiza aparte.
- `series[]`: `{etiqueta, num, unidad, raw}`; `num` ya viene normalizado
  (coma decimal chilena → float; "6.000" → 6000). `raw` es lo que se muestra.
- Reglas de tiempo: eventos narrados usan el primer/último caracter no blanco;
  dato/esquema heredan el intervalo de su párrafo ancla; el video agrega 0,3 s
  de cola por tarjeta para evitar huecos.
