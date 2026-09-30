// COPIA LAS TARJETAS Y LOS FONDOS AL TALLER (30-09-2026).
//
// La fuente de verdad son contenido/config/tarjetas.json y
// contenido/config/fondos.json, que lee el video al compilar. El taller vive en
// claude.ai y no puede leer el repositorio, así que el dato viaja como archivo
// publicado al lado de su página, igual que conceptos.js. Es una copia y no una
// segunda fuente: si alguien edita taller/datos.js a mano, el próximo cambio
// real lo pisa.
//
// Reemplazó a scripts/modos.js el mismo día en que nació, cuando se vio que las
// dos entradas de dibujo no eran modos sino tarjetas. Un solo archivo con las
// dos listas y no dos scripts, porque la página los necesita juntos: una
// tarjeta se mira siempre sobre algún fondo.
//
// Uso:  node scripts/datos-taller.js
const fs = require("fs");
const path = require("path");

const SALIDA = path.join("taller", "datos.js");
const leer = (n) => JSON.parse(fs.readFileSync(path.join("contenido", "config", n), "utf8"));

const tarjetas = leer("tarjetas.json");
const fondos = leer("fondos.json");

fs.writeFileSync(SALIDA,
  "// GENERADO por scripts/datos-taller.js desde contenido/config/tarjetas.json\n" +
  "// y contenido/config/fondos.json. No se edita a mano.\n" +
  "window.TARJETAS = " + JSON.stringify(tarjetas) + ";\n" +
  "window.FONDOS = " + JSON.stringify(fondos) + ";\n");

// Cuántas tarjetas puede pintar cada ranura: mientras sea 1 en todas, el switch
// de src/tarjetas.tsx no elige nada y no hay decisión que tomar.
//
// La ranura no es el evento a secas: las seis tarjetas de dato pintan el mismo
// evento pero no compiten entre ellas, porque el guion ya dijo cuál con el tipo
// del [DATO]. Contarlas como alternativas diría que la decisión ya existe
// cuando no existe. Compiten las que caen en la MISMA ranura evento + gráfico.
const porRanura = {};
for (const t of tarjetas.tarjetas)
  for (const e of t.pinta) {
    const ranura = t.grafico ? `${e}/${t.grafico}` : e;
    (porRanura[ranura] = porRanura[ranura] || []).push(t.id);
  }
const conAlternativa = Object.entries(porRanura).filter(([, ids]) => ids.length > 1)
  .map(([r, ids]) => `${r} (${ids.join(", ")})`);

console.log(`${tarjetas.tarjetas.length} tarjetas y ${fondos.fondos.length} fondos escritos en ${SALIDA}`);
console.log(conAlternativa.length
  ? `ranuras con más de una tarjeta: ${conAlternativa.join(" · ")}`
  : "ninguna ranura tiene alternativa todavía: el switch no elige nada");
