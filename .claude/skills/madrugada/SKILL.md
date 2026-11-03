---
name: madrugada
description: La revisión diaria de cómo salió la cadena de la madrugada de Entender Chile, en diez minutos y con pocos tokens. Verifica la secuencia de commits, el estado, los pasos del workflow, la carátula, la web y las métricas, todo contra el repo. Usar cuando Santiago diga "revisa la madrugada", "cómo salió la cadena" o "revisa y sigamos".
---

# La revisión de la madrugada

Objetivo: en diez minutos y con pocos tokens, saber si la madrugada salió bien.
No se repiensa cada día: se corren estos pasos en orden y se anota. FECHA es el
día de hoy en AAAA-MM-DD. Todo se mide contra el repo, nunca de memoria.

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
4. Carátula. Primero que sea usable:
   ```
   node -e 'const {caratulaUsable}=require("./scripts/imagen-entera.js"); console.log(JSON.stringify(caratulaUsable("contenido/caratulas/FECHA.png")))'
   ```
   Debe dar `ok: true`. Luego en YouTube: buscar el id del informe en
   `bitacora/metricas/FECHA.json` (cerca del título del día; los ids son
   cadenas de 11 caracteres), bajar `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`
   al scratchpad y mirarla con Read junto a `contenido/caratulas/FECHA.png`:
   deben ser la misma imagen más la franja.
5. Web.
   ```
   curl -s -o /dev/null -w "%{http_code}\n" https://entender.sinodev.cl/FECHA/
   ```
   Debe dar 200.
6. Métricas.
   ```
   sed -n 1,5p bitacora/metricas/FECHA.md
   ```
7. Qué anotar. En `bitacora/FECHA.md`, una sección "La madrugada" con lo que
   salió y a qué hora, y lo que la auditoría marcó con lo que se decidió. Lo que
   falla y tiene dueño va a `bitacora/PENDIENTES.md` (regla 41).

Nota: el reloj del reintento deja unos quince commits "reintento: despertador"
por noche. No es una falla: es la regla 20 funcionando.
