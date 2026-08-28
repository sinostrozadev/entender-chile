---
name: bitacora
description: Rutina diaria de Entender Chile. Con "auditoria" mide el estado real del proyecto contra lo que promete la estrategia y escribe el análisis de la mañana. Con "cierre" ordena lo hablado durante el día y actualiza la lista de pendientes. Usar al empezar y al terminar la sesión de día.
---

# Bitácora de Entender Chile

Dos modos. El argumento decide cuál.

Antes de cualquiera de los dos, leer `bitacora/README.md`: ahí está la regla
que manda sobre esta sesión.

**La sesión de día no toca el comportamiento del proyecto.** No se editan
prompts, scripts, workflows ni `src/`. Si el análisis encuentra algo que
arreglar, se anota en `bitacora/PENDIENTES.md` con archivo y línea, y lo
ejecuta la sesión de la noche. Escribir dentro de `bitacora/` y registrar
decisiones en `estrategia/decisiones.md` sí está permitido: es registro, no
comportamiento.

---

## Modo `auditoria`

Escribe `bitacora/AAAA-MM-DD-auditoria.md`.

No estimar nada que se pueda medir. Todo lo que sigue sale del repo, de
GitHub Actions y de los releases.

### 1. Volumen producido

```bash
for d in informes claves guiones/informe descripciones revisiones preseleccion barrido; do
  echo "$d: $(ls contenido/$d 2>/dev/null | grep -c '^2026-')"
done
ls contenido/descripciones/    # solo existen si el video RENDERIZÓ
```

Un día sin `descripciones` es un día sin video, aunque haya informe.

### 2. Ejecuciones reales

Con las herramientas de GitHub: `actions_list` sobre `barrido.yml`,
`edicion-diaria.yml` y `web.yml`, y `list_releases`. Contrastar la hora del
cron con la hora real de la ejecución: el atraso importa tanto como el
fallo.

### 3. Si el canal ya existe

```bash
cat web/canal.json          # youtube vacío = el canal no está enlazado
ls contenido/videos/ 2>/dev/null || echo "ningún video publicado"
```

### 4. El ciclo de calidad, que es donde más se esconde el problema

```bash
for f in contenido/revisiones/2026-*.md; do echo "$(basename $f): $(head -1 $f)"; done
grep -h '^- \[' contenido/revisiones/2026-*.md | cut -c1-120
```

La pregunta no es cuántos hallazgos hay, es **si son el mismo hallazgo
repetido**. Un hallazgo que aparece tres días seguidos sin que cambie nada
significa que el ciclo revisa y no aprende. Verificar además si
`prompts/CALIDAD.md` tiene entrada de los últimos días.

### 5. La promesa contra el producto

```bash
for f in contenido/guiones/informe/2026-*.md; do
  echo "$(basename $f .md): $(echo "scale=1; $(wc -w < $f)/150" | bc) min"
done
```

Contra los diez minutos que prometen `estrategia/identidad.md` y
`estrategia/publico.md`.

### 6. Selección: qué se preseleccionó y qué quedó fuera

Comparar `contenido/preseleccion/FECHA.md` con `contenido/informes/FECHA.md`
y listar lo descartado por sección. Es la única forma de auditar el criterio
editorial, porque el descarte no deja rastro propio.

### 7. Deriva documental

Buscar documentos que describan un pipeline que ya no existe (menciones a
`generar.js`, a la API de Anthropic, a la voz clonada como bloqueante).

### 8. El objetivo

Días restantes hasta el 1-feb-2027 y estado del contador de horas vistas.

### Cómo se escribe

Estructura: qué existe (tabla de números), qué funciona, qué no funciona
(con la evidencia al lado), y la respuesta a si se está cumpliendo el
objetivo. **Comparar siempre con la auditoría anterior**: qué mejoró, qué
sigue igual, qué es nuevo. Sin eso es un informe suelto, no una serie.

Nada de rayas largas (guion largo ni guion medio) en ningún texto del
proyecto: se usan comas, dos puntos o punto seguido.

---

## Modo `cierre`

1. Dejar `bitacora/AAAA-MM-DD.md` ordenado con: decisiones tomadas hoy y
   quién decidió; hallazgos; ideas nuevas; lo que quedó abierto esperando a
   Santiago; y **para ejecutar esta noche**, en orden, con el archivo o el
   comando concreto de cada punto.
2. Actualizar `bitacora/PENDIENTES.md`: sumar lo nuevo, marcar lo hecho,
   sacar lo que dejó de tener sentido.
3. Si hubo una decisión de fondo, registrarla también en
   `estrategia/decisiones.md` con el formato que ya usa ese archivo.

Escribir para alguien que llega cansado a las nueve de la noche: la lista
de ejecución tiene que poder seguirse sin releer la conversación.
