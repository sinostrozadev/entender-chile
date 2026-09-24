// TALLER · MOSAICO (24-09-2026). La idea de Santiago: después de la portada
// aparece una FILA con todas las secciones del día, moviéndose; se elige una,
// se hace zoom hasta llenar la pantalla, se lee, se aleja, esa se apaga y se
// enciende la siguiente.
//
// Por qué vale la pena: el que mira sabe en todo momento cuánto falta y de
// qué se va a hablar. Eso es de las pocas cosas que de verdad sostienen la
// retención en un video largo, y ningún canal de noticias chileno lo hace.
//
// El zoom es REAL, no un corte: se escala la fila entera y la baldosa
// elegida pasa a ocupar el cuadro. Por eso cada baldosa se dibuja a 480x270
// con las tipografías a un cuarto de su tamaño final; al escalar por cuatro
// quedan nítidas, porque es DOM y no una imagen.
//
// Se retiran dos cosas que Santiago descartó: el cuadro blanco (era marco
// por ser marco, no cumplía función) y el corte duro de dos columnas.
import React from "react";
import { AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Picto } from "./pictogramas";

const COBRE = "#D08A5B";
const IMG = "caratulas/2026-09-24.png";
const ANCHO = 480, ALTO = 270, HUECO = 44;   // baldosa y separación
const ESCALA = 1920 / ANCHO;                  // cuánto hay que crecer para llenar

const sec = [
  { slug: "clima", nombre: "El frente que viene", dato: "105 mm", pie: "alerta oficial en algunas zonas" },
  { slug: "economia", nombre: "Dólar bajo los 950", dato: "947,40", pie: "cierre del dólar" },
  { slug: "congreso", nombre: "La reforma por un voto", dato: "88", pie: "votos a favor, faltaba uno" },
  { slug: "seguridad", nombre: "Escudo de las Américas", dato: "15", pie: "países en la iniciativa" },
  { slug: "salud", nombre: "Salud mental juvenil", dato: "31", pie: "países comparados" },
  { slug: "regiones", nombre: "Vuelos a Juan Fernández", dato: "1", pie: "ruta suspendida" },
];

const fade = (f: number, d: number, dur = 12) => interpolate(f, [d, d + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// AZAR SEMBRADO CON LA FECHA (24-09): "que nunca un video tenga el mismo
// movimiento" (Santiago). No es azar de verdad: es una serie fija para cada
// día, así que el video del martes se mueve distinto al del miércoles pero
// dos renders del mismo día salen idénticos. Eso además es lo que pide la
// regla 29 sobre variación diaria por código.
const azar = (semilla: number) => {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
// suaviza el zoom: arranca y llega despacio, de modo que la cámara no se
// sienta mecánica. Lineal, el ojo nota el principio y el final exactos.
const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// contenido de una baldosa, dibujado a escala 1/4
const Baldosa: React.FC<{ s: typeof sec[0]; orden: number; activa: boolean; leida: number; f: number; z: number }> =
({ s, orden, activa, leida, f, z }) => {
  const color = colorDeSeccion(s.slug);
  // TODO se interpola con el zoom: si el contenido cambiara de golpe a mitad
  // de camino, el movimiento se leería como un corte aunque la cámara sea
  // continua. Ese era el defecto de la primera prueba.
  const entre = (a: number, b: number) => interpolate(z, [0, 1], [a, b]);
  const opDato = interpolate(z, [0.45, 0.95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative", overflow: "hidden",
      background: color,
      filter: `grayscale(${leida}) brightness(${1 - leida * 0.5})`,
      opacity: 1 - leida * 0.35 - (activa ? 0 : 0.15),
      outline: activa ? `${entre(3, 0)}px solid ${COBRE}` : "none", outlineOffset: -2 }}>
      <div style={{ position: "absolute", right: entre(-26, -70), top: entre(-18, 10), width: entre(190, 300), height: entre(190, 300), opacity: 0.9 }}>
        <Picto nombre={s.slug} color="rgba(255,255,255,0.9)" />
      </div>
      <AbsoluteFill style={{ background: `linear-gradient(60deg, rgba(23,25,28,${entre(0.86, 0.9)}) ${entre(26, 34)}%, rgba(23,25,28,0.08) 82%)` }} />
      <div style={{ position: "absolute", left: entre(24, 30), top: entre(20, 26), fontFamily: tema.mono, fontSize: entre(9, 10),
        letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.75)", opacity: z }}>Entender Chile</div>
      <div style={{ position: "absolute", left: entre(24, 30), bottom: entre(22, 148), width: entre(300, 380) }}>
        <div style={{ fontFamily: tema.mono, fontSize: entre(9, 10), letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: entre(6, 8) }}>
          Bloque {orden}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(22, 27), lineHeight: 1.06, color: "#F7F6F2" }}>{s.nombre}</div>
      </div>
      {/* el dato nace con el zoom y solo se ANIMA cuando la baldosa ya está
          instalada: en pantalla completa nada se mueve, se queda quieta */}
      <div style={{ position: "absolute", left: entre(24, 30), bottom: entre(10, 34), opacity: opDato }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(30, 54), lineHeight: 1, color: "#F7F6F2" }}>{s.dato}</div>
        <div style={{ width: z > 0.98 ? interpolate(f, [6, 20], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0,
          height: 3, background: COBRE, marginTop: 5 }} />
        <div style={{ fontFamily: tema.sans, fontSize: entre(8, 11), color: "rgba(242,242,239,0.72)", marginTop: entre(6, 9),
          opacity: z > 0.98 ? fade(f, 16) : 0 }}>{s.pie}</div>
      </div>
    </div>
  );
};

// La fila. El ORDEN de las baldosas se baraja con la fecha, así que la
// cámara recorre el tablero distinto cada día aunque las noticias se lean
// siempre en el orden del guion.
const Fila: React.FC<{ orden: number[]; foco: number | null; leidas: Record<number, number>; z: number; deriva: number; fLocal: number }> =
({ orden, foco, leidas, z, deriva, fLocal }) => {
  const paso = ANCHO + HUECO;
  const centro = (orden.length - 1) / 2;
  const posEnFila = foco === null ? centro : orden.indexOf(foco);
  const objetivo = (posEnFila - centro) * paso;
  const escala = 1 + (ESCALA - 1) * z;
  // la deriva se apaga a medida que entra el zoom: en pantalla completa la
  // baldosa se INSTALA y no se mueve más (pedido de Santiago, 24-09)
  const corrimiento = objetivo + deriva * (1 - z);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: HUECO, transform: `scale(${escala}) translateX(${-corrimiento}px)`, transformOrigin: "center center" }}>
        {orden.map((i, pos) => (
          <Baldosa key={sec[i].slug} s={sec[i]} orden={i + 1} activa={foco === i}
            leida={leidas[i] ?? 0} f={fLocal} z={foco === i ? z : 0} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        transform: `scale(${interpolate(f, [0, 72], [1, 1.07])})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 20%, rgba(23,25,28,0.3) 66%, rgba(23,25,28,0) 100%)" }} />
      <div style={{ position: "absolute", left: 120, top: 92, fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.8)", opacity: fade(f, 4) }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1400 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 24, opacity: fade(f, 12) }}>El informe diario · 24 de septiembre</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 110, lineHeight: 1.02, color: "#F7F6F2", opacity: fade(f, 20, 16) }}>
          ¿Qué comprometió Chile?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// el guion del mosaico: cuándo se abre cada baldosa y cuándo se cierra
const PLAN = [
  { entra: 26, abre: 50, cierra: 150, sale: 174 },
  { entra: 190, abre: 214, cierra: 312, sale: 336 },
  { entra: 352, abre: 376, cierra: 470, sale: 494 },
];

const Recorrido: React.FC<{ semilla: number }> = ({ semilla }) => {
  const f = useCurrentFrame();
  const r = azar(semilla);
  // el orden en que las baldosas se COLOCAN en la fila se baraja; el orden en
  // que se LEEN sigue siendo el del guion, así que la cámara salta de un lado
  // a otro del tablero y el recorrido nunca se repite entre días
  const orden = React.useMemo(() => {
    const a = sec.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }, [semilla]);
  const sentido = React.useMemo(() => (azar(semilla + 7)() > 0.5 ? 1 : -1), [semilla]);
  const velocidad = React.useMemo(() => 60 + azar(semilla + 13)() * 90, [semilla]);

  let foco: number | null = null, z = 0, fLocal = 0;
  const leidas: Record<number, number> = {};
  PLAN.forEach((p, i) => {
    // el apagado también es gradual: nada cambia de golpe
    if (f >= p.cierra) leidas[i] = interpolate(f, [p.cierra, p.sale], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (f >= p.entra && f < p.sale) {
      foco = i;
      const t = f < p.abre ? interpolate(f, [p.entra, p.abre], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        : f < p.cierra ? 1
        : interpolate(f, [p.cierra, p.sale], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      z = suave(t);
      fLocal = f - p.abre;
    }
  });
  const deriva = (interpolate(f, [0, 24 * 24], [0, velocidad]) * sentido);
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Fila orden={orden} foco={foco} leidas={leidas} z={z} deriva={deriva} fLocal={fLocal} />
      <div style={{ position: "absolute", left: 60, top: 54, fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.5)", opacity: 1 - z }}>Entender Chile</div>
    </AbsoluteFill>
  );
};

const Mosaico: React.FC<{ semilla: number }> = ({ semilla }) => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence durationInFrames={80}><Portada /></Sequence>
    <Sequence from={80} durationInFrames={510}><Recorrido semilla={semilla} /></Sequence>
  </AbsoluteFill>
);

export const RootMosaico: React.FC = () => (
  <>
    <Composition id="Mosaico" component={Mosaico} width={1920} height={1080} fps={24} durationInFrames={590} defaultProps={{ semilla: 240926 }} />
    <Composition id="MosaicoOtroDia" component={Mosaico} width={1920} height={1080} fps={24} durationInFrames={590} defaultProps={{ semilla: 250926 }} />
  </>
);
