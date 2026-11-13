# Estado de la rama `estrategia-a` (13-11-2026)

## Hecho
- Limpieza en commits separados (`estrategia/limpieza-2026-11.md`): workflows 14 → 8, crons 9 → 3, rutinas
  encendidas 12 → 3 (al fusionar), prompts vivos 27 → 11 (+ 8 avisos de retiro), scripts 60 → 9, `archivo/`
  100 MB → 6,6 MB. Carril escrito en pausa en `archivo/carril-escrito/`.
- Flujo de 3 pasos con diagrama, horarios y lista de rutinas a apagar o cambiar: `docs/FLUJO.md`.
- Motor `video/` (copia de En Números Rojos): marca Entender Chile, series manuales no anuales (semanas, meses,
  partidas), entidades que no son países, visual `chile` (regiones de la BCN, cámara que se acerca desde el frame
  0, alfileres con la voz), "Voz sintética" en pantalla, Short de 45 a 60 s, revisor numérico con fuentes
  chilenas, `producir.mts` (render y subida programada con marca de hecho y carátula) y `producir.yml`.
  `tsc` limpio.
- Voz: Edge TTS es-CL Lorenzo por defecto, Azure de respaldo (`docs/VOZ.md`); muestras en el Escritorio.
- Piloto: 5 Shorts del 19 al 23-11 en `contenido/semana/2026-11-19/` (pasan el revisor numérico), verificación
  con URL y fecha, pauta del largo del 25-11 (recesión técnica por dos centésimas, con plan B).
- Compuerta del 03-12-2026 en `estrategia/decisiones.md`; skills `despegue` y `revision` al día.

## Pendiente (en orden)
1. **Render de prueba local del Short de Lago Ranco**: si no quedó en el Escritorio, desde `video/`:
   `npx tsx scripts/preparar-grafico.mts ../contenido/semana/2026-11-19/2026-11-20-short-lago-ranco-terreno.json`
   y `flock -w 3600 /tmp/bolita-render.lock npx remotion render src/index.ts Grafico salida/bandeja/lr.mp4
   --props=salida/trabajo/2026-11-20-short-lago-ranco-terreno.props.json --concurrency=1`; mirar fotogramas
   0, 3, 10, 20 s y final.
2. **JSON del largo del 25-11** con la plantilla `tesis` tras las Cuentas Nacionales del 18-11 08:30
   (`contenido/semana/2026-11-19/PAUTA-largo-2026-11-25-recesion-tecnica.md`), más su PEDIDO de carátula.
3. Shorts del martes 24 y miércoles 25-11 (ranuras sin guion; los escribe la misma sesión que el largo o
   quedan vacías).
4. `validar.mts` único (hoy la validación es `verificar-cifras.mts`, que corre el esquema y las cifras; faltan
   las reglas mecánicas de gancho con sujeto y cifra y de promesa antes de 15 s).
5. Visual satelital de Línea Punteada (no portado) y validador de cámara (no portado).
6. Probar `producir.yml` de punta a punta en Actions (solo al fusionar).
