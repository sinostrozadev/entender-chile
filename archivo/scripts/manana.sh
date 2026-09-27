#!/usr/bin/env bash
# manana.sh - rutina de la mañana (local): pull + edición del día lista en el Studio.
#
#   bash scripts/manana.sh
#
# 1. Trae lo que ChatGPT generó de madrugada (git pull).
# 2. Produce la Clave (si hubo) y DESPUÉS el informe, para que
#    out/FECHA/timeline.json quede apuntando al informe (lo que muestra el Studio).
# 3. Reapunta src/Root.tsx al timeline de HOY - cambio LOCAL, NO COMMITEAR:
#    la versión del repo importa el ejemplo (necesario para el build en la nube).
set -euo pipefail
cd "$(dirname "$0")/.."

FECHA=$(TZ=America/Santiago date +%F)
echo "══ Edición del $FECHA ══"

git pull --ff-only || echo "(pull omitido: sin red o sin remoto)"

node scripts/dia.js --clave --si-existe
node scripts/dia.js

sed -i -E "s|import timelineEjemplo from \"[^\"]*\";|import timelineEjemplo from \"../out/$FECHA/timeline.json\";|" src/Root.tsx
echo ""
echo "Studio apuntado a out/$FECHA/timeline.json (cambio local en src/Root.tsx - no commitear)."
echo "→ npx remotion studio   ·   http://localhost:3000"
