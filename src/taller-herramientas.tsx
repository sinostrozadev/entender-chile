// TALLER · LAS HERRAMIENTAS ACTUANDO (24-09-2026).
//
// Santiago quiere ver todas las tarjetas funcionando, una tras otra, para
// decidir cómo mejorarlas. Hasta ahora solo existían en una tabla del
// inventario, y una tabla no muestra si una tarjeta se entiende.
//
// Regla de la prueba: los datos son REALES en forma, no de relleno. Cada
// tarjeta recibe exactamente la forma de dato que el prompt le exige, y casi
// todas con contenido de clima, que es la sección que estamos trabajando. Si
// una tarjeta se ve mal acá, se ve mal en el informe.
//
// La banda de arriba no es parte del diseño: nombra la herramienta y dice qué
// forma de dato pide, para poder decir "la cuarta" sin contar.
import React from "react";
import { AbsoluteFill, Composition, Sequence, interpolate, useCurrentFrame } from "remotion";
import { tema } from "./tema";
import {
  Evento, Tarjeta, TarjetaDato, TarjetaTesis, TarjetaParrafo, TarjetaCita,
  TarjetaEsquema, TarjetaTitulares,
} from "./tarjetas";

const COBRE = "#D08A5B";
const DUR = 108;            // 4,5 s por herramienta: alcanza a entrar y a leerse

const base = { from: 0, to: 10, seccion: "clima", fuenteSeccion: "Dirección Meteorológica de Chile, 24 sep" };
const s = (etiqueta: string, raw: string, num: number | null, unidad = "", tendencia?: any) =>
  ({ etiqueta, raw, num, unidad, ...(tendencia ? { tendencia } : {}) });

type Ficha = { nombre: string; pide: string; nota?: string; ev: Evento; comp: React.FC<{ ev: Evento }> };

const FICHAS: Ficha[] = [
  {
    nombre: "TarjetaTesis", pide: "la idea del bloque, máximo 18 palabras",
    comp: TarjetaTesis,
    ev: { ...base, tipo: "tesis", texto: "El sistema frontal deja 105 milímetros en un día y corta tres rutas en el Biobío." },
  },
  {
    nombre: "TarjetaParrafo", pide: "prosa, cuando no hay dato que mostrar",
    comp: TarjetaParrafo,
    ev: { ...base, tipo: "narracion", etiqueta: "hecho",
      texto: "La Dirección Meteorológica mantiene el aviso hasta el viernes en la noche. En la cordillera de Ñuble la isoterma cero bajó a mil quinientos metros, así que lo que en el valle cae como lluvia, más arriba cae como nieve." },
  },
  {
    nombre: "TarjetaCita", pide: "una frase textual y su autor",
    comp: TarjetaCita,
    ev: { ...base, tipo: "cita", autor: "Dirección Meteorológica de Chile",
      texto: "El sistema se desplaza más lento de lo previsto y por eso la lluvia se extiende un día más",
      fuente: "Aviso meteorológico, 24 sep" },
  },
  {
    nombre: "cifra", pide: "UN valor",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "cifra",
      series: [s("de agua caída en 24 horas en Los Ángeles", "105 mm", 105, "mm")] },
  },
  {
    nombre: "cambio", pide: "el mismo indicador en DOS momentos",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "cambio",
      series: [s("máxima en Santiago, de hoy a mañana", "32°", 32),
               s("mañana", "18°", 18, "", { dir: "baja", sentido: null })] },
  },
  {
    nombre: "barras", pide: "3 a 6 valores de la misma unidad",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "barras", caption: "agua caída en 24 horas",
      series: [s("Los Ángeles", "105 mm", 105), s("Chillán", "88 mm", 88),
               s("Temuco", "61 mm", 61), s("Valdivia", "54 mm", 54), s("Concepción", "37 mm", 37)] },
  },
  {
    nombre: "comparacion", pide: "2 o 3 valores comparables",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "comparacion", caption: "acumulado de septiembre",
      series: [s("este año", "268 mm", 268), s("promedio del mes", "142 mm", 142)] },
  },
  {
    nombre: "lineas", pide: "el mismo indicador en 4 o más momentos",
    nota: "NO EXISTE. Cae a comparación y pierde la serie entera.",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "lineas", caption: "máximas de la semana en Santiago",
      series: [s("lunes", "12°", 12), s("martes", "14°", 14), s("miércoles", "19°", 19),
               s("jueves", "24°", 24), s("viernes", "29°", 29), s("sábado", "32°", 32),
               s("domingo", "18°", 18)] },
  },
  {
    nombre: "tabla", pide: "3 o más valores ordenados (ranking)",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "tabla", caption: "máximas del día",
      series: [s("Copiapó", "34°", 34), s("Santiago", "32°", 32), s("Talca", "28°", 28),
               s("Concepción", "21°", 21), s("Punta Arenas", "9°", 9)] },
  },
  {
    nombre: "marcador", pide: "dos lados y un resultado",
    nota: "es de deporte: en clima no se usa nunca",
    comp: TarjetaDato,
    ev: { ...base, tipo: "dato", grafico: "marcador", seccion: "deporte",
      fuenteSeccion: "ANFP, 23 sep",
      series: [s("Colo-Colo", "2", 2), s("U. de Chile", "1", 1)] },
  },
  {
    nombre: "TarjetaEsquema", pide: "pasos de un proceso, en orden",
    comp: TarjetaEsquema,
    ev: { ...base, tipo: "esquema", titulo: "Cómo sigue el sistema frontal",
      elementos: ["Jueves: lluvia en el Biobío", "Viernes: se desplaza al sur", "Sábado: despeja", "Domingo: heladas en el valle"] },
  },
  {
    nombre: "TarjetaTitulares", pide: "una lista de titulares breves",
    comp: TarjetaTitulares,
    ev: { ...base, tipo: "titulares", from: 0,
      items: [
        { texto: "La Dirección Meteorológica extiende el aviso por lluvia hasta el viernes.", from: 0, to: 1.4 },
        { texto: "Tres rutas cortadas en el Biobío por acumulación de agua.", from: 1.4, to: 2.8 },
        { texto: "La isoterma cero baja a mil quinientos metros en la cordillera de Ñuble.", from: 2.8, to: 4.4 },
      ] },
  },
];

// La banda superior: nombre de la herramienta, forma de dato que pide, y la
// nota cuando hay algo que decir. Vive fuera del diseño de la tarjeta.
const Banda: React.FC<{ f: Ficha; i: number }> = ({ f, i }) => {
  const fr = useCurrentFrame();
  const op = interpolate(fr, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    /* barra SÓLIDA, no degradada: la tarjeta vive sobre papel claro y un
       degradado a transparente se come el texto de la banda. */
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "18px 56px", opacity: op,
      backgroundColor: "#15171A",
      display: "flex", alignItems: "baseline", gap: 26, flexWrap: "wrap" }}>
      <div style={{ fontFamily: tema.mono, fontSize: 20, color: "rgba(242,242,239,0.5)" }}>{i + 1}/{FICHAS.length}</div>
      <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.1em", color: "#F2F2EF" }}>{f.nombre}</div>
      <div style={{ fontFamily: tema.mono, fontSize: 22, color: "rgba(242,242,239,0.62)" }}>pide: {f.pide}</div>
      {f.nota ? <div style={{ fontFamily: tema.mono, fontSize: 22, color: COBRE }}>{f.nota}</div> : null}
    </div>
  );
};

const Herramientas: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel }}>
    {FICHAS.map((f, i) => (
      <Sequence key={f.nombre} from={i * DUR} durationInFrames={DUR}>
        <f.comp ev={f.ev} />
        <Banda f={f} i={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const RootHerramientas: React.FC = () => (
  <Composition id="Herramientas" component={Herramientas} width={1920} height={1080} fps={24}
    durationInFrames={FICHAS.length * DUR} />
);
