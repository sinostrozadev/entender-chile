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
import { AbsoluteFill, Composition, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
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

// La fila. Ya no decide nada: recibe la posición y el zoom de la cámara, que
// se calculan como UNA trayectoria continua. Antes la fila saltaba de
// posición en el instante en que cambiaba la sección enfocada, y por más
// suave que fuera el zoom, eso se veía como corte.
const Fila: React.FC<{ orden: number[]; foco: number | null; leidas: Record<number, number>; z: number; x: number; fLocal: number }> =
({ orden, foco, leidas, z, x, fLocal }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={{ display: "flex", gap: HUECO, transform: `scale(${1 + (ESCALA - 1) * z}) translateX(${-x}px)`, transformOrigin: "center center" }}>
      {orden.map((i) => (
        <Baldosa key={sec[i].slug} s={sec[i]} orden={i + 1} activa={foco === i}
          leida={leidas[i] ?? 0} f={fLocal} z={foco === i ? z : 0} />
      ))}
    </div>
  </AbsoluteFill>
);

// envoltura que desvanece lo que tenga adentro, para encadenar planos
const Disolver: React.FC<{ desde: number; dur: number; children: React.ReactNode }> = ({ desde, dur, children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: interpolate(f, [desde, desde + dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{children}</AbsoluteFill>;
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

// El guion del mosaico. Cada bloque tiene su ventana de lectura; entre una y
// otra la cámara NO corta: se aleja, viaja por el tablero y se vuelve a
// acercar. Una sola toma de principio a fin.
const PLAN = [
  { abre: 54, cierra: 150 },
  { abre: 214, cierra: 312 },
  { abre: 376, cierra: 470 },
];
const VIAJE = 46;   // cuadros de alejarse, cruzar y volver a entrar
const AFUERA = 0.2; // cuánto zoom queda en el punto más lejano: nunca se ve todo el tablero de golpe

const Recorrido: React.FC<{ semilla: number }> = ({ semilla }) => {
  const f = useCurrentFrame();
  const r = azar(semilla);
  const orden = React.useMemo(() => {
    const a = sec.map((_, i) => i);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }, [semilla]);
  const vaivén = React.useMemo(() => 18 + azar(semilla + 13)() * 26, [semilla]);
  const fase = React.useMemo(() => azar(semilla + 29)() * Math.PI * 2, [semilla]);

  const paso = ANCHO + HUECO;
  const centro = (orden.length - 1) / 2;
  const posDe = (i: number) => (orden.indexOf(i) - centro) * paso;

  // LA TRAYECTORIA, como dos listas de puntos que se recorren juntas. Al ser
  // una sola interpolación continua, no hay forma de que aparezca un corte.
  const cuadros: number[] = [0];
  const zooms: number[] = [AFUERA];
  const equis: number[] = [posDe(0) - paso * 0.8];
  PLAN.forEach((p, i) => {
    cuadros.push(p.abre, p.cierra);
    zooms.push(1, 1);
    equis.push(posDe(i), posDe(i));
    const sig = PLAN[i + 1];
    if (sig) {
      const medio = (p.cierra + sig.abre) / 2;
      cuadros.push(medio);
      zooms.push(AFUERA);
      equis.push((posDe(i) + posDe(i + 1)) / 2);   // el punto medio del viaje
    }
  });
  const ultimo = PLAN[PLAN.length - 1];
  cuadros.push(ultimo.cierra + VIAJE * 2);
  zooms.push(AFUERA);
  equis.push(posDe(PLAN.length - 1) + paso * 0.8);

  const suavizar = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const z = interpolate(f, cuadros, zooms, suavizar);
  // el vaivén mantiene viva la fila cuando está lejos y se apaga al acercarse;
  // es un seno, así que no puede introducir un salto
  const x = interpolate(f, cuadros, equis, suavizar) + Math.sin(f / 96 + fase) * vaivén * (1 - z);

  // qué baldosa está enfocada y cuánto se ha leído de cada una
  let foco: number | null = null, fLocal = 0;
  const leidas: Record<number, number> = {};
  PLAN.forEach((p, i) => {
    if (f >= p.cierra) leidas[i] = interpolate(f, [p.cierra, p.cierra + VIAJE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const desde = p.abre - VIAJE, hasta = p.cierra + VIAJE;
    if (f >= desde && f < hasta) { foco = i; fLocal = f - p.abre; }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Fila orden={orden} foco={foco} leidas={leidas} z={z} x={x} fLocal={fLocal} />
      <div style={{ position: "absolute", left: 60, top: 54, fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.5)", opacity: 1 - z }}>Entender Chile</div>
    </AbsoluteFill>
  );
};

// La portada se DISUELVE sobre el mosaico en vez de cortar: los últimos 18
// cuadros los dos planos conviven, así el paso también es continuo.
const Mosaico: React.FC<{ semilla: number }> = ({ semilla }) => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence from={62} durationInFrames={540}><Recorrido semilla={semilla} /></Sequence>
    <Sequence durationInFrames={80}><Disolver desde={62} dur={18}><Portada /></Disolver></Sequence>
  </AbsoluteFill>
);

export const RootMosaico: React.FC = () => (
  <>
    <Composition id="Mosaico" component={Mosaico} width={1920} height={1080} fps={24} durationInFrames={602} defaultProps={{ semilla: 240926 }} />
    <Composition id="MosaicoOtroDia" component={Mosaico} width={1920} height={1080} fps={24} durationInFrames={602} defaultProps={{ semilla: 250926 }} />
  </>
);
