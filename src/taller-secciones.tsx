// TALLER · LAS IMÁGENES DE SECCIÓN, APLICADAS (24-09-2026).
//
// Santiago no se convence viendo las imágenes sueltas, y tiene razón: una
// imagen de sección no se juzga sola. Se juzga con el texto encima, chica en
// la fila, y grande a pantalla completa. Este video pone las CUATRO
// candidatas de clima en la misma fila del mosaico, con exactamente el mismo
// tratamiento, y entra en cada una.
//
// Regla de la prueba: el velo, el pictograma, la tipografía y el texto son
// IDÉNTICOS en las cuatro. Lo único que cambia es la imagen de fondo. Si una
// se cae, se cae por la imagen y no porque la haya ayudado.
//
// Las cuatro, en el orden en que aparecieron:
//   1. pluviómetro  el objeto           (descartada: un objeto dice un clima)
//   2. acuarela     los cuatro climas   (descartada: parece pintura)
//   3. cielo        camino A            (fotográfica, el cielo desde abajo)
//   4. vidrio       camino B            (el material, vaho sobre vidrio frío)
//
// La cámara es una sola toma, como quedó aprobado: se aleja, cruza el
// tablero y vuelve a entrar, sin un corte en todo el video. A pantalla
// completa no se mueve nada: se instala y queda ahí.
// Cómo rearmar las imágenes (public/secciones/ no se versiona):
//   mkdir -p public/secciones
//   git show 62add35:contenido/secciones/clima.png > public/secciones/pluviometro.png
//   cp contenido/secciones/clima.png              public/secciones/acuarela.png
//   cp contenido/secciones/pruebas/clima-a.png    public/secciones/cielo.png
//   cp contenido/secciones/pruebas/clima-b.png    public/secciones/vidrio.png
//
// Y para rendirlo:
//   REMOTION_FUENTES_LOCALES=1 npx remotion render src/taller-secciones-entry.tsx \
//     Secciones taller-secciones.mp4 --browser-executable=<headless_shell>
import React from "react";
import { AbsoluteFill, Composition, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema } from "./tema";
import { Picto } from "./pictogramas";

const COBRE = "#D08A5B";

// baldosa más chica que en el mosaico normal: acá las cuatro tienen que
// caber juntas en el cuadro, porque la comparación es el punto del video.
const ANCHO = 420, ALTO = 236, HUECO = 36;
const ESCALA = 1920 / ANCHO;

const cand = [
  { img: "secciones/pluviometro.png", tag: "1 · pluviómetro", nota: "el objeto" },
  { img: "secciones/acuarela.png",    tag: "2 · acuarela",    nota: "los cuatro climas" },
  { img: "secciones/cielo.png",       tag: "3 · cielo",       nota: "camino A" },
  { img: "secciones/vidrio.png",      tag: "4 · vidrio",      nota: "camino B" },
];

// el mismo contenido en las cuatro: así la comparación es limpia
const TEXTO = { nombre: "El frente que viene", dato: "105 mm", pie: "de agua caída en 24 horas" };

const fade = (f: number, d: number, dur = 12) =>
  interpolate(f, [d, d + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Baldosa: React.FC<{ c: typeof cand[0]; activa: boolean; f: number; z: number }> =
({ c, activa, f, z }) => {
  const entre = (a: number, b: number) => interpolate(z, [0, 1], [a, b]);
  const opDato = interpolate(z, [0.45, 0.95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative", overflow: "hidden",
      backgroundColor: "#15171A",
      opacity: activa ? 1 : 0.86,
      outline: activa ? `${entre(3, 0)}px solid ${COBRE}` : "none", outlineOffset: -2 }}>

      <Img src={staticFile(c.img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

      {/* EL VELO. Idéntico para las cuatro, a propósito: es la prueba. */}
      <AbsoluteFill style={{ background: `linear-gradient(60deg, rgba(23,25,28,${entre(0.86, 0.9)}) ${entre(26, 34)}%, rgba(23,25,28,0.08) 82%)` }} />

      {/* EL PICTOGRAMA SE APAGA AL ENTRAR. Sobre color plano funcionaba de
          marca de agua, pero sobre una foto, a pantalla completa, mide 1.300
          píxeles y tapa justo lo que hay que juzgar. Además ya no hace falta:
          chica, la baldosa necesita el pictograma para decir "clima"; grande,
          eso lo dice la imagen. Cambio hecho para este video; si el camino
          elegido es B habrá que revisarlo, porque ahí el pictograma es el que
          identifica. */}
      <div style={{ position: "absolute", right: entre(-22, -60), top: entre(-16, 10), width: entre(166, 300), height: entre(166, 300),
        opacity: interpolate(z, [0, 0.55], [0.9, 0.14], { extrapolateRight: "clamp" }) }}>
        <Picto nombre="clima" color="rgba(255,255,255,0.9)" />
      </div>

      <div style={{ position: "absolute", left: entre(21, 30), top: entre(18, 26), fontFamily: tema.mono, fontSize: entre(8, 10),
        letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.75)", opacity: z }}>Entender Chile</div>

      <div style={{ position: "absolute", left: entre(21, 30), bottom: entre(19, 148), width: entre(262, 380) }}>
        <div style={{ fontFamily: tema.mono, fontSize: entre(8, 10), letterSpacing: "0.18em", textTransform: "uppercase",
          color: COBRE, marginBottom: entre(5, 8) }}>Clima</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(19, 27), lineHeight: 1.06, color: "#F7F6F2" }}>{TEXTO.nombre}</div>
      </div>

      <div style={{ position: "absolute", left: entre(21, 30), bottom: entre(9, 34), opacity: opDato }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(26, 54), lineHeight: 1, color: "#F7F6F2" }}>{TEXTO.dato}</div>
        <div style={{ width: z > 0.98 ? interpolate(f, [6, 20], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0,
          height: 3, background: COBRE, marginTop: 5 }} />
        <div style={{ fontFamily: tema.sans, fontSize: entre(7, 11), color: "rgba(242,242,239,0.72)", marginTop: entre(5, 9),
          opacity: z > 0.98 ? fade(f, 16) : 0 }}>{TEXTO.pie}</div>
      </div>

      {/* etiqueta del taller: cuál candidata es. No es parte del diseño, es
          para que se pueda decir "la 3" sin contar baldosas. */}
      <div style={{ position: "absolute", right: entre(12, 30), bottom: entre(10, 26), textAlign: "right" }}>
        <div style={{ fontFamily: tema.mono, fontSize: entre(9, 17), letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.92)" }}>{c.tag}</div>
        <div style={{ fontFamily: tema.mono, fontSize: entre(7, 13), letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.6)", marginTop: entre(2, 5) }}>{c.nota}</div>
      </div>
    </div>
  );
};

const Fila: React.FC<{ foco: number | null; z: number; x: number; fLocal: number }> =
({ foco, z, x, fLocal }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={{ display: "flex", gap: HUECO, transform: `scale(${1 + (ESCALA - 1) * z}) translateX(${-x}px)`, transformOrigin: "center center" }}>
      {cand.map((c, i) => (
        <Baldosa key={c.img} c={c} activa={foco === i} f={fLocal} z={foco === i ? z : 0} />
      ))}
    </div>
  </AbsoluteFill>
);

// Cuatro paradas. Se abre con las cuatro a la vista (z=0), que es lo que
// Santiago necesita para comparar, y recién después entra a cada una.
// Dos segundos de arranque con las cuatro quietas y completas en el cuadro:
// sin esa espera la cámara ya viene entrando en el cuadro 10 y las de los
// extremos quedan cortadas justo cuando hay que compararlas.
const ESPERA = 48;
const PLAN = [
  { abre: 110, cierra: 188 },
  { abre: 252, cierra: 330 },
  { abre: 394, cierra: 472 },
  { abre: 536, cierra: 614 },
];
const VIAJE = 46;
const AFUERA = 0;   // en este video el punto lejano muestra la fila COMPLETA

const Comparador: React.FC = () => {
  const f = useCurrentFrame();
  const paso = ANCHO + HUECO;
  const centro = (cand.length - 1) / 2;
  const posDe = (i: number) => (i - centro) * paso;

  const cuadros: number[] = [0, ESPERA];
  const zooms: number[] = [AFUERA, AFUERA];
  const equis: number[] = [0, 0];
  PLAN.forEach((p, i) => {
    cuadros.push(p.abre, p.cierra);
    zooms.push(1, 1);
    equis.push(posDe(i), posDe(i));
    const sig = PLAN[i + 1];
    if (sig) {
      cuadros.push((p.cierra + sig.abre) / 2);
      zooms.push(AFUERA);
      equis.push((posDe(i) + posDe(i + 1)) / 2);
    }
  });
  cuadros.push(PLAN[PLAN.length - 1].cierra + VIAJE * 2);
  zooms.push(AFUERA);
  equis.push(0);

  const suavizar = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const z = interpolate(f, cuadros, zooms, suavizar);
  const x = interpolate(f, cuadros, equis, suavizar);

  // acá las ya vistas NO se apagan, al revés del mosaico del informe: la
  // gracia de este video es poder volver a mirar las cuatro juntas al final.
  let foco: number | null = null, fLocal = 0;
  PLAN.forEach((p, i) => {
    const desde = p.abre - VIAJE, hasta = p.cierra + VIAJE;
    if (f >= desde && f < hasta) { foco = i; fLocal = f - p.abre; }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Fila foco={foco} z={z} x={x} fLocal={fLocal} />
      <div style={{ position: "absolute", left: 60, top: 48, fontFamily: tema.mono, fontSize: 20, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.45)", opacity: 1 - z }}>
        Taller · imagen de sección · clima
      </div>
    </AbsoluteFill>
  );
};

export const RootSecciones: React.FC = () => (
  <Composition id="Secciones" component={Comparador} width={1920} height={1080} fps={24} durationInFrames={710} />
);
