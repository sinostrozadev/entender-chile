// Calcula cuánto velo necesita CADA parada para que el texto se lea.
//
// Por qué deja de ser una constante: el velo se diseñó mirando paneles
// oscuros. El panel 5 de la Clave del 07-10-2026 es claro y además rompe la
// regla 2 del mural (su motivo no está en la mitad derecha, ocupa el cuadro
// entero), así que el párrafo caía encima de unos papeles blancos. Medido daba
// 4,47:1, que cumple la norma para texto de 48 px y aun así se ve mal, porque
// la norma mide contraste y no mide que haya un dibujo debajo de las letras.
//
// La forma del degradado no cambia, solo se empuja hacia el negro con
// alfa' = 1 - (1-alfa)^k. Con k=1 queda igual que siempre y k nunca pasa el
// alfa de 1, así que no hay que inventar topes.
//
// uso: node scripts/mural-velos.js --crudo <raw> --meta <json> --guion ejemplos/clave-mural14.json --objetivo 7

const fs = require("fs");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const meta = JSON.parse(fs.readFileSync(arg("meta"), "utf8"));
const buf = fs.readFileSync(arg("crudo"));
const rutaGuion = arg("guion");
const guion = JSON.parse(fs.readFileSync(rutaGuion, "utf8"));
const OBJETIVO = Number(arg("objetivo", 7));
const { total, alto, canales } = meta, C = canales || 3;

const PARADAS_VELO = [[0, 0.93], [34, 0.88], [50, 0.50], [58, 0.26], [68, 0.08], [80, 0]];
const alfaBase = (f) => {
  const p = f * 100;
  for (let i = 1; i < PARADAS_VELO.length; i++) {
    const [x0, a0] = PARADAS_VELO[i - 1], [x1, a1] = PARADAS_VELO[i];
    if (p <= x1) return a0 + (a1 - a0) * ((p - x0) / (x1 - x0));
  }
  return 0;
};
const VELO = [10, 12, 16];
const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const Ltexto = L(0xF2, 0xF2, 0xEF);
const razon = (lb) => (Math.max(Ltexto, lb) + 0.05) / (Math.min(Ltexto, lb) + 0.05);

const X0 = 128, X1 = 998, Y0 = 200, Y1 = 880;
const contraste = (px, k) => {
  const ls = [];
  for (let x = X0; x < X1; x += 2) {
    const a = 1 - Math.pow(1 - alfaBase(x / 1920), k);
    for (let y = Y0; y < Y1; y += 4) {
      const o = ((y * total) + (px + x)) * C;
      ls.push(L(buf[o] * (1 - a) + VELO[0] * a, buf[o + 1] * (1 - a) + VELO[1] * a, buf[o + 2] * (1 - a) + VELO[2] * a));
    }
  }
  ls.sort((p, q) => p - q);
  return razon(ls[Math.floor(ls.length * 0.99)]);
};

console.log("sección  parada   k   contraste p99");
const velos = guion.paradas.map((px, i) => {
  let k = 1;
  while (k < 4 && contraste(px, k) < OBJETIVO) k += 0.1;
  k = Math.round(k * 10) / 10;
  console.log(String(i + 1).padStart(5) + "  " + String(px).padStart(7) + "  " + k.toFixed(1) + "   " + contraste(px, k).toFixed(2) + ":1");
  return k;
});

const o = {};
for (const key of ["mural", "anchoMural", "viajeSeg", "musica", "paradas", "velos", "bloques"]) {
  o[key] = key === "velos" ? velos : guion[key];
}
fs.writeFileSync(rutaGuion, JSON.stringify(o, null, 2) + "\n");
console.log("\nvelos escritos en " + rutaGuion);
