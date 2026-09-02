// Sistema visual del canal - tokens únicos, todo se deriva de aquí.
//
// Dirección: papel de diario frío + tinta + UN acento: verde pátina de cobre
// (cobre oxidado: chileno sin bandera, apolítico). La firma del canal es el
// tratamiento de los datos: toda cifra lleva su FUENTE en mono abajo, siempre;
// HECHO = chip sólido en tinta, INTERPRETACIÓN = chip de contorno en pátina.
//
// Tipografías vía Google Fonts (requiere red la primera vez). Si trabajas sin
// red, comenta las 3 líneas de import/loadFont: los stacks de respaldo cubren.

import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadPlexSans } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { continueRender, delayRender, staticFile } from "remotion";

// Con REMOTION_FUENTES_LOCALES=1 las fuentes salen de public/fuentes (bajadas
// de Google Fonts el 02-09-2026, licencia OFL) y el render no depende de la
// red. Sin la variable, Google Fonts como siempre. delayRender hace que un
// fallo sea ruidoso en vez de un video con Arial.
if (process.env.REMOTION_FUENTES_LOCALES === "1" && typeof document !== "undefined") {
  const espera = delayRender("fuentes locales");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = staticFile("fuentes/fuentes.css");
  link.onload = () => {
    Promise.all([
      "600 32px Fraunces", "400 32px 'IBM Plex Sans'", "500 32px 'IBM Plex Sans'", "600 32px 'IBM Plex Sans'",
      "400 32px 'IBM Plex Mono'", "500 32px 'IBM Plex Mono'",
    ].map((f) => document.fonts.load(f))).then(() => continueRender(espera));
  };
  document.head.appendChild(link);
} else {
  loadFraunces();
  loadPlexSans();
  loadPlexMono();
}

export const tema = {
  // color
  papel: "#F2F2EF",
  papelElevado: "#FCFCFA",
  tinta: "#17191C",
  gris: "#6B6E6A",
  linea: "#DDDDD5",
  patina: "#2F7263", // acento único
  patinaSuave: "#E4EEEA",

  // tipografía
  serif: "'Fraunces', Georgia, 'Times New Roman', serif",
  sans: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace",

  // layout 1920x1080
  margen: 128,
  anchoTexto: 1340,
};

// Color por sección: identifica sin romper el escenario único.
// Coincidencia por palabra clave; si no calza, se usa la pátina.
const paletaSecciones: Array<[RegExp, string]> = [
  [/econom|mercado|bolsillo|trabajo/i, "#8A6F3F"],   // ocre
  [/deport/i, "#44546A"],                             // azul pizarra
  [/ciencia|tecnolog/i, "#46788A"],                   // petróleo
  [/internacional|mundo/i, "#6E5B7B"],                // lila gris
  [/vivienda|ciudad/i, "#8A5A46"],                    // arcilla apagada
  [/seguridad|justicia/i, "#7A5560"],                 // vino gris
  [/curioso/i, "#A98F3C"],                            // mostaza
  [/tiempo|clima|medioambiente/i, "#5A7D9A"],         // celeste piedra
];
export const colorDeSeccion = (nombre?: string | null): string => {
  if (!nombre) return tema.patina;
  for (const [re, color] of paletaSecciones) if (re.test(nombre)) return color;
  return tema.patina;
};

export const estiloEyebrow: React.CSSProperties = {
  fontFamily: tema.mono,
  fontSize: 24,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: tema.patina,
};

export const estiloFuente: React.CSSProperties = {
  fontFamily: tema.mono,
  fontSize: 24,
  letterSpacing: "0.06em",
  color: tema.gris,
};
