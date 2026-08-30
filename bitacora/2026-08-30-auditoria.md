# Auditoría del día 7: la primera edición después del lanzamiento salió entera

Fecha: 30-08-2026, 07:00 de Chile. Comparación contra
`bitacora/2026-08-29-auditoria.md`. Escrita antes de que Santiago despierte,
para que revise cómo salió todo.

Resumen en una frase: **la cadena corrió completa de punta a punta por
primera vez, con las reglas nuevas, y las cuatro piezas están en YouTube en
privado esperando el clic.**

## La cadena de hoy, hora por hora (UTC)

| Pieza | Hora | Contra ayer |
|---|---|---|
| Barrido | 05:33 | a tiempo por segundo día |
| Preselección | 07:15 | leyó el barrido: margen 1 h 42 |
| Informe | 07:29 | |
| Guion del informe | 08:02 | **ayer falló su escritura; hoy limpio** |
| Revisión | 08:43 | VEREDICTO: APROBADA |
| Render (los 4 videos) | 08:44 a 09:39 | disparado por el push de la revisión |
| **Subida a YouTube, paso 7** | **09:39 a 09:40** | **primera vez: 4 piezas en privado** |
| Release | edicion-2026-08-30 | |
| Guardián 10:00 | corrió a las 10:08 | |

Cero intervención humana desde la 01:30 hasta el final. La falla de ayer (la
escritura del guion) no se repitió, y el orden de la cadena por artefactos
(timbre por push, no cron) funcionó exacto.

## Las reglas nuevas del informe largo: primer día, y funcionaron

La sesión de la noche aplicó la propuesta acordada ayer. Resultado medible:

| | 29-08 (reglas viejas) | 30-08 (reglas nuevas) |
|---|---|---|
| Informe | 2.192 palabras | **3.370** |
| [A]+[B] desarrolladas | 10 | 13 |
| [A] principal | 220 palabras | **766** |
| Preseleccionadas | 45 | 54 |
| Guion | 11,8 min | **16,0 min** |

- **La pauta de cinco preguntas se nota**: la [A] principal (Alerta Roja en
  Concepción por el río Andalién) pasó de la escala del "quedé a medias" de
  ayer a 766 palabras con desarrollo real.
- **"En titulares" existe y está bien construido**: entrada fija "Y en
  titulares:", 14 frases, y la revisión verificó que ninguna noticia del
  informe quedó sin narrar y sin titular.
- **La revisión se recalibró bien**: un solo hallazgo MENOR (un "esta
  semana" donde el informe da la fecha, en Nepal). Su resumen confirma la
  mecánica nueva: 4 [A] + 6 [B] narradas (tope de 10), el resto a titulares.

## Lo que hay que mirar con ojo crítico

**El guion se fue a 16 minutos.** La decisión de ayer fue "objetivo ~10,
tolerancia 12-13 en días cargados", y el primer día ya está 3 minutos sobre
la tolerancia. Ojo: no es "En titulares" (14 frases son ~1,5 min); es que
las [A] largas del informe alargan también su narración. Si mañana y pasado
repiten 15-16, el guion no está comprimiendo lo suficiente y hay que
endurecer la instrucción de compresión, no recortar titulares. Para la
serie: 11,9 / 11,8 / 16,0.

**"Además, hoy" trae 8 [C]**, igual que antes, con 24 descartes aún en el
bloque interno. La regla nueva dice que todo lo preseleccionado verificable
entra al menos como [C]; hay que mirar mañana si esos 24 son todos descartes
de calidad legítimos (sin segunda fuente, duplicada) o si "espacio" y
"menor" siguen operando con otro nombre.

## Lo que espera a Santiago

1. **Publicar**: 4 piezas en privado en YouTube Studio (informe, Short del
   informe, Clave IMSI Catcher, Short de la Clave). El espaciado acordado:
   informe en la mañana, Clave a mediodía, Shorts en la tarde. Marcar la
   divulgación de contenido sintético en cada una.
2. Pasarme los links publicados para `contenido/videos/` y la web.
3. El hallazgo MENOR de Nepal no bloquea nada; es del tipo que la nota.

## Sin cambio

Tres documentos con deriva por tercera auditoría seguida (`README.md`,
`prompts/README.md`, `estrategia/hoja-de-ruta.md` con la voz clonada como
"EXISTENCIAL"). El tornado del 29 sigue sin investigar. La promesa de
duración en `identidad.md` y `publico.md` aún dice "diez minutos" (y hoy
salieron 16: la distancia creció).

## El objetivo

Quedan **154 días** para el 1-feb-2027. Por primera vez el contador puede
empezar a moverse hoy: depende de un clic que ya no es nuestro cuello de
botella técnico, sino la decisión editorial de Santiago sobre estas cuatro
piezas. La máquina cumplió su parte.
