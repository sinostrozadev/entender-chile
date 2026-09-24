# Taller visual: inventario y checklist

Pedido de Santiago el 24-09-2026: listar todas las secciones y todas las
herramientas que tenemos, definir cuándo se usa cada una, y avanzar sección
por sección y herramienta por herramienta.

Este archivo es el tablero. Se actualiza cada vez que una prueba se aprueba o
se descarta, con la fecha y el motivo.

---

## 1. Las secciones que existen

Diez temáticas (`scripts/imagenes-secciones.js` y su espejo `src/fondos.tsx`),
cada una con su color (`src/tema.ts`) y su pictograma (`src/pictogramas.tsx`):

| Slug | Cuándo la elige el sistema | Color | Pictograma | Imagen propia |
|---|---|---|---|---|
| `clima` | clima, alertas, incendios, sismos, lluvia | celeste piedra | nube con lluvia | ❌ pendiente |
| `economia` | economía, empleo, IPC, dólar, vivienda, pensiones | ocre | barras con flecha | ❌ pendiente |
| `seguridad` | policial, fiscalía, justicia, delitos | vino gris | escudo | ❌ pendiente |
| `congreso` | leyes, votaciones, gobierno, elecciones | piedra | cúpula y columnas | ❌ pendiente |
| `salud` | hospitales, isapres, Fonasa, medicamentos | verde clínico | cruz | ❌ pendiente |
| `educacion` | educación, ciencia, universidades, IA | azul tiza | libro abierto | ❌ pendiente |
| `internacional` | mundo, cuando toca a Chile | lila gris | globo | ❌ pendiente |
| `plata-publica` | Contraloría, licencias, fraude, malversación | ocre viejo | monedas | ❌ pendiente |
| `regiones` | cuando la noticia es de un territorio | verde campo | alfiler de mapa | ❌ pendiente |
| `dato-curioso` | el dato curioso del día | mostaza | lupa | ❌ pendiente |

Y los bloques de estructura, que no son temáticos y hoy no tienen tratamiento
propio: **Apertura**, **La noticia del día**, **¿En qué quedó?**,
**En titulares**, **Agenda**, **Cierre**.

## 2. Las herramientas que existen

### Tarjetas de contenido (`src/tarjetas.tsx`)

| Herramienta | Qué muestra | Cuándo se usa | Estado |
|---|---|---|---|
| `TarjetaTesis` | la idea del bloque, máximo 18 palabras | una por bloque con noticia [A] o [B] | ✅ en producción |
| `TarjetaParrafo` | prosa narrada | cuando no hay dato que mostrar | ✅ |
| `TarjetaCita` | una cita con su autor | cuando la frase textual importa | ✅ |
| `TarjetaEsquema` | pasos de un proceso, con flechas | "qué viene después" | ✅ |
| `TarjetaTitulares` | la lista de titulares breves | bloque En titulares | ✅ |
| `SeccionBanner` | el nombre de la sección | entrada de bloque | ✅, a reemplazar |

### Tarjetas de dato, por forma del dato

| Tipo | Forma que pide | Estado |
|---|---|---|
| `cifra` | UN valor | ✅ |
| `cambio` | el mismo indicador en dos momentos | ✅ |
| `barras` | 3 a 6 valores de la misma familia y unidad | ✅ |
| `comparacion` | 2 o 3 valores comparables, misma unidad | ✅ |
| `marcador` | dos lados y un resultado (deporte) | ✅ |
| `tabla` | 3 o más valores ordenados (ranking) | ✅ |
| `lineas` | el mismo indicador en 4 o más momentos | ❌ **NO construida**. El prompt manda usar `cambio` con el primer y último valor |

### Piezas de identidad

| Pieza | Dónde vive | Estado |
|---|---|---|
| Pictogramas de sección | `src/pictogramas.tsx`, 10 | ✅ 24-09 |
| Láminas de sección | `public/fondos/seccion-*.jpg`, 10 | ⚠️ **inservibles**: 8% de tinta, desaparecen |
| Ilustración del día | GPT, `contenido/caratulas/FECHA.png` | ✅ 24-09 |
| Carátulas V4 y V5 | `src/marca.tsx` | ✅ |
| Climas de carátula | `src/marca.tsx` y el guion | ✅ 24-09 |
| Cortinas de 1,1 s | `src/Informe.tsx` | ✅ |
| Sello y eyebrow | `src/marca.tsx` | ✅ |

### Movimiento (probado en el taller, nada en producción)

| Recurso | Qué hace | Cuándo | Estado |
|---|---|---|---|
| Imagen viva | acercamiento lento sobre una foto | portada y cabeceras | 🧪 probado |
| Contador | el número cuenta hasta su valor | toda cifra grande | 🧪 |
| Barras escalonadas | crecen una después de otra | `barras` | 🧪 |
| Comparación en dos tiempos | el segundo valor entra después | `comparacion` | 🧪 |
| Mosaico de secciones | la fila, el zoom y el apagado | estructura del informe | 🧪 24-09, v2 |
| Recorrido sembrado | el orden de la fila y la deriva salen de la fecha | mosaico | 🧪 24-09 |

---

## 3. Reglas de uso que ya están decididas

1. **La forma del dato decide la tarjeta**, no el gusto (árbol en `prompts/guion-informe.md`).
2. **El movimiento siempre explica algo.** Una barra crece porque mide, un
   número cuenta porque es cantidad. Nada se mueve de adorno.
3. **Algo cambia en pantalla cada 4 a 6 segundos.**
4. **La imagen del día manda solo en la portada**; las secciones tienen lo suyo.
5. **Ninguna cifra grande lleva textura detrás** (regla 29).
6. **El cobre es el acento y vive en un solo lugar del cuadro.**
7. **Nada cambia de golpe a mitad de una transición.** Si el contenido salta
   mientras la cámara se mueve, el movimiento se lee como un corte aunque sea
   continuo. Todo lo que cambia entre el estado chico y el grande se
   interpola con el zoom: posición, tamaño, opacidad y degradado.
8. **En pantalla completa nada se mueve.** La pieza se instala y se queda
   quieta; el movimiento vive en los traslados, no en la lectura.
9. **El recorrido se siembra con la fecha.** Dos días distintos no se mueven
   igual, dos renders del mismo día sí. Es lo mismo que pide la regla 29 para
   las imágenes, aplicado al movimiento.

## 4. Descartado, con motivo

- **Cuadro blanco tipo televisor** (24-09): marco por ser marco. No cumplía
  función y le quitaba aire al dato.
- **Corte duro de dos columnas** con la imagen a la derecha (24-09): el
  degradado al 42% del ancho se siente brusco y no combina.
- **Láminas de sección como imagen de cabecera**: desaparecen al difuminarse,
  igual que desaparecían en la carátula.

---

## 5. Checklist: sección por sección

Para cada sección temática, en este orden:

- [ ] **clima** · imagen propia · cabecera · paleta · una tarjeta ejemplo
- [ ] **economia** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **seguridad** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **congreso** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **salud** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **educacion** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **internacional** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **plata-publica** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **regiones** · imagen propia · cabecera · paleta · tarjeta ejemplo
- [ ] **dato-curioso** · imagen propia · cabecera · paleta · tarjeta ejemplo

Y los bloques de estructura, que hoy no tienen tratamiento:

- [ ] **Apertura** · ¿lleva la imagen del día o algo propio?
- [ ] **La noticia del día** · confirmado: imagen del día
- [ ] **¿En qué quedó?** · pieza propia, es el seguimiento
- [ ] **En titulares** · la tarjeta existe, falta ritmo
- [ ] **Agenda** · lo que viene, pide línea de tiempo
- [ ] **Cierre** · hoy no existe visualmente

## 6. Checklist: herramienta por herramienta

- [ ] `cifra` con contador
- [ ] `barras` escalonadas
- [ ] `comparacion` en dos tiempos
- [ ] `cambio` con la flecha dibujándose
- [ ] `lineas` **construir la que falta**
- [ ] `tabla` con filas entrando de a una
- [ ] `marcador` con los goles apareciendo
- [ ] `TarjetaCita` con la frase escribiéndose o entrando por bloques
- [ ] `TarjetaEsquema` con el recorrido avanzando paso a paso
- [ ] `TarjetaTitulares` con ritmo, hoy es una lista quieta

## 7. Las imágenes de sección

**Diez imágenes, una por sección, hechas UNA vez y reutilizadas siempre.** No
son por día: son patrimonio del canal. A dos por día, en cinco días están.

Cada una con la misma fórmula de la carátula (dos capas, objeto nítido, fondo
desenfocado, sin texto, sin el hecho noticioso) pero **sin metáfora del día**:
es el retrato genérico de la sección.

- [ ] clima · [ ] economia · [ ] seguridad · [ ] congreso · [ ] salud
- [ ] educacion · [ ] internacional · [ ] plata-publica · [ ] regiones · [ ] dato-curioso
