---
name: madrugada
description: La revisión diaria de cómo salió la cadena de la madrugada de Entender Chile, en diez minutos y con pocos tokens. Verifica la secuencia de commits, el estado, los pasos del workflow, el Short y el podcast, la web y las métricas, todo contra el repo. Usar cuando Santiago diga "revisa la madrugada", "cómo salió la cadena" o "revisa y sigamos".
---

# La revisión de la madrugada

Objetivo: en diez minutos y con pocos tokens, saber si la madrugada salió bien.
No se repiensa cada día: se corren estos pasos en orden y se anota. FECHA es el
día de hoy en AAAA-MM-DD. Todo se mide contra el repo, nunca de memoria.

El informe en video está apagado desde el 04-11-2026 (marcador `contenido/estado/sin-video-informe.txt`).
Por eso ya no se revisan el mp4 ni la carátula del informe: si el marcador
existe, que falten no es una falla. Si alguien lo borra, vuelve a tocar
revisarlos.

1. Secuencia de la cadena. Las horas del log salen en UTC; Chile es UTC-3.
   ```
   git pull --ff-only origin main
   git log --format='%h %ad %s' --date=format:'%H:%M' --since='FECHA 00:00' --until='FECHA 08:30' | tac
   ```
2. Estado y triage de la auditoría.
   ```
   cat contenido/estado/FECHA.md
   sed -n 1,60p bitacora/FECHA-auditoria.md
   ```
   El estado debe decir `ETAPA: videos_listos`. La auditoría trae el triage
   HOY / AGUANTA / MIRAR.
3. Pasos del workflow de edición: todos deben ser `success`.
   ```
   gh run list --workflow=edicion-diaria.yml --limit 1 --json databaseId --jq '.[0].databaseId'
   gh api repos/sinostrozadev/entender-chile/actions/runs/<id>/jobs --jq '.jobs[]|.name,(.steps[]|"  \(.conclusion)\t\(.name)")'
   ```
4. El Short y el podcast del día en el release.
   ```
   gh release view edicion-FECHA --json assets -q '.assets[].name'
   ```
   Debe estar `FECHA-short.mp4` y, si hubo voz, `FECHA-informe.mp3` (el audio
   del podcast). Sin mp4 del informe y sin `miniatura*.png` es lo esperado con
   el marcador. Que el Short quedó programado se ve en el paso 7 del job (paso 3
   de esta lista) y en `bitacora/metricas/FECHA.json`.
5. Web.
   ```
   curl -s -o /dev/null -w "%{http_code}\n" https://entender.sinodev.cl/FECHA/
   ```
   Debe dar 200.
6. Métricas.
   ```
   sed -n 1,5p bitacora/metricas/FECHA.md
   ```
   Captura diaria para el video "camino a la monetización" (orden de Santiago
   del 05-11-2026, skill global `metricas-diarias`): corre
   `node scripts/metricas-studio.js` (4 capturas de Studio por el piloto :8777 con
   cambio al canal "Entender Chile" + `salida/metricas/FECHA/metricas.json`).
   Se commitea la carpeta del día. Si el piloto está ocupado o caído, usa
   `--sin-capturas` (queda el JSON) y anótalo. Las capturas solo corren en esta
   máquina (el piloto no existe en Actions), por eso cuelga de la sesión local y
   no de un workflow; no hay línea de crontab nueva.
7. Qué anotar. En `bitacora/FECHA.md`, una sección "La madrugada" con lo que
   salió y a qué hora, y lo que la auditoría marcó con lo que se decidió. Lo que
   falla y tiene dueño va a `bitacora/PENDIENTES.md` (regla 41).

Nota: el reloj del reintento deja unos quince commits "reintento: despertador"
por noche. No es una falla: es la regla 20 funcionando.
