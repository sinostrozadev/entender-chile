---
name: noche
description: Puesta al día de la sesión de la noche de Entender Chile, con lectura acotada. Lee solo lo último (commits de 36 horas, archivo del día, triage de la auditoría, pendientes marcados HOY, primeras líneas del estado) y responde en cuatro bloques. Usar al abrir la sesión local de la noche, antes de ejecutar nada.
---

# Puesta al día de la noche

El costo de esta sesión se va en releer historia que ya no decide nada. Esta
skill fija QUÉ se lee y, sobre todo, qué no.

Regla que manda sobre todo lo de abajo: **se lee lo mínimo para decidir hoy.**
Cuando dudes entre leer un archivo más o preguntar, pregunta.

## Los pasos, en orden

1. **`git pull`.** Si falla, para y dilo; todo lo demás sería sobre un repo
   viejo.

2. **Qué se movió**, resumen y nunca diffs:

   ```
   git log --since="36 hours ago" --format='%h %ad %an %s' --date=format-local:'%d %H:%M'
   ```

   36 horas y no 24: la sesión de la noche anterior puede haber quedado fuera
   de la ventana de un día justo. Los mensajes bastan; si uno no se entiende,
   se mira ESE commit, no todos.

3. **El archivo del día:** `bitacora/AAAA-MM-DD.md` de hoy, si existe. Es lo
   que la sesión de día conversó y decidió. Si no existe, no pasa nada: se
   dice y se sigue.

4. **La auditoría de hoy** (`bitacora/AAAA-MM-DD-auditoria.md`), en dos
   pedazos y nada más:
   - la **primera línea**, que trae `ESTADO:`;
   - el **triage final**: `grep -n "HOY" bitacora/AAAA-MM-DD-auditoria.md` para
     ubicarlo y `sed -n 'INICIO,FINp'` para leer ese rango.

   El cuerpo de la auditoría es análisis que la rutina ya hizo; lo que esta
   sesión necesita es el veredicto y lo que quedó marcado HOY.

5. **Pendientes, solo lo caliente.** En `bitacora/PENDIENTES.md`, leer **solo**
   las entradas marcadas `HOY` o con fecha de los últimos tres días. Ubicar con
   `grep -n` (por `HOY` y por las fechas DD-MM) y leer por rangos con
   `sed -n 'INICIO,FINp'`. **Nunca el archivo entero:** pasa de 900 líneas y
   casi todo es trabajo que no toca esta noche.

6. **El estado del día:** las **primeras 8 líneas** de
   `contenido/estado/FECHA.md` (`head -8`). Ahí está la etapa y la vuelta, que
   es lo único que decide si la cadena avanzó o está atascada.

7. **Salud de las rutinas:** se consulta `bitacora/rutinas.md`, que es el
   inventario mantenido a mano. **No listar rutinas por API**: cada llamada
   trae unos 75 KB. La única excepción es que falte una rutina concreta en el
   inventario o que haya sospecha fundada de que una está apagada o borrada;
   entonces se consulta ESA y se corrige el inventario en el commit del día.

## La salida, siempre en estos cuatro bloques

**Qué pasó.** Lo que se movió desde la sesión anterior, en pocas líneas y en
orden de importancia, no cronológico.

**Qué está roto.** Solo lo que está fallando ahora, con evidencia (archivo,
línea, etapa o corrida). Si no hay nada roto, se dice en una línea.

**Qué decide Santiago.** Lo que espera una decisión suya, con las opciones y
lo que cuesta cada una. Nada que él no tenga que decidir entra acá.

**Qué haré.** Lo que esta sesión propone ejecutar esta noche, en orden, con el
alcance medido. Es una propuesta hasta que Santiago diga que sí.

## Lo que esta skill NO hace

- **No relee historia anterior.** Nada de bitácoras de días pasados, de
  auditorías viejas ni de `REALIZADOS.md`. Si algo de antes hace falta, se
  pide el archivo exacto.
- **No abre piezas completas.** Ni informes, ni guiones, ni barridos. Si el
  estado dice que una pieza está aprobada, está aprobada.
- **No investiga de más.** Si algo no cuadra, se anota como **duda** en el
  bloque que corresponda y se sigue. Una duda dicha cuesta una línea; una
  investigación no pedida cuesta la sesión entera.
