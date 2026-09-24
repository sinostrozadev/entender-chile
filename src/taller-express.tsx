// TALLER · VIDEO EXPRESS (24-09-2026). Pedido de Santiago: un video corto que
// empiece como el informe de verdad y después pase por DOS secciones, una con
// imagen propia y otra sin ella, para probar todas las mejoras juntas.
//
// Todo lo que se ve acá son las piezas DE PRODUCCIÓN (src/tarjetas.tsx y
// src/mosaico.tsx) con el contenido real del informe de hoy. No es una
// maqueta: si acá se ve bien, así sale el video.
//
// Las tres mejoras que hay que mirar:
//   1. La transición dura 2,2 s en vez de 1,2: arranca ANTES de la pausa,
//      mientras se terminan de decir las últimas palabras del bloque anterior.
//   2. La cabecera de sección es de dos columnas, y el paso entre la columna
//      oscura y la imagen es una banda de bloques que se deshace.
//   3. El mosaico se DESVANECE sobre la tarjeta en vez de cortar. Antes el
//      corte era de negro a papel blanco de un cuadro al otro.
import React from "react";
import { AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema } from "./tema";
import { Tarjeta, Evento } from "./tarjetas";
import { TransicionMosaico, Baldosa } from "./mosaico";

const COBRE = "#D08A5B";
const FECHA = "2026-09-24";
const IMG = `caratulas/${FECHA}.png`;
const FUENTE = "La Tercera, 23 sep; El Mostrador, 23 sep";

// las secciones del informe de hoy, en el orden del guion
const BALDOSAS: Baldosa[] = [
  { texto: "La noticia del día", categoria: null },
  { texto: "Escudo de las Américas", categoria: "internacional" },
  { texto: "Reforma al sistema político", categoria: "congreso" },
  { texto: "Proyecto Antibarricadas", categoria: "seguridad" },
  { texto: "Sistema frontal en el sur", categoria: "clima" },
  { texto: "Dólar sobre los novecientos sesenta", categoria: "economia" },
  { texto: "Presupuesto de educación", categoria: "educacion" },
  { texto: "En titulares", categoria: null },
];
const I_CLIMA = 4, I_ECON = 5;

const ev = (e: Partial<Evento>): Evento =>
  ({ tipo: "tesis", from: 0, to: 10, fuenteSeccion: FUENTE, ...e } as Evento);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const fade = (d: number, dur = 14) => interpolate(f, [d, d + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      {/* imagen viva: el acercamiento lento que ya estaba probado en el taller */}
      <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        transform: `scale(${interpolate(f, [0, 130], [1, 1.06])})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.94) 22%, rgba(23,25,28,0.32) 68%, rgba(23,25,28,0) 100%)" }} />
      <div style={{ position: "absolute", left: 110, top: 86, fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.8)", opacity: fade(4) }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 110, bottom: 120, maxWidth: 1350 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 24, opacity: fade(12) }}>El informe diario · 24 de septiembre</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 96, lineHeight: 1.04, color: "#F7F6F2", opacity: fade(20, 16) }}>
          ¿Qué comprometió Chile?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// El guion: cada tarjeta con su ventana, y las transiciones ENCIMA, montadas
// sobre el final del bloque anterior igual que en el informe real.
// 77 cuadros = 3,2 s por transición: 1 s antes de la pausa, la pausa de 1,2 y
// 1 s después, tal como quedó en producción.
const T = 77;
const P = {
  portada:  { from: 0,   dur: 132 },
  trans0:   { from: 106, dur: T },
  noticia:  { from: 130, dur: 172 },
  trans1:   { from: 264, dur: T },
  climaA:   { from: 288, dur: 136 },
  climaB:   { from: 424, dur: 132 },
  trans2:   { from: 518, dur: T },
  econA:    { from: 542, dur: 136 },
  econB:    { from: 678, dur: 142 },
};

const Express: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel }}>
    <Sequence from={P.portada.from} durationInFrames={P.portada.dur}><Portada /></Sequence>

    <Sequence from={P.noticia.from} durationInFrames={P.noticia.dur}>
      <Tarjeta ev={ev({ tipo: "tesis",
        texto: "El Congreso interpelará al canciller por la adhesión de Chile al Escudo de las Américas." })} />
    </Sequence>

    {/* SECCIÓN CON IMAGEN PROPIA */}
    <Sequence from={P.climaA.from} durationInFrames={P.climaA.dur}>
      <Tarjeta ev={ev({ tipo: "tesis", seccion: "clima",
        texto: "Un sistema frontal mantiene alertas por lluvias y tormentas en el sur." })} />
    </Sequence>
    <Sequence from={P.climaB.from} durationInFrames={P.climaB.dur}>
      <Tarjeta ev={ev({ tipo: "dato", grafico: "cifra", seccion: "clima",
        series: [{ etiqueta: "acumulado proyectado en cordillera", raw: "más de 300 mm", num: 300, unidad: "mm" }] })} />
    </Sequence>

    {/* SECCIÓN SIN IMAGEN: va con su color y su pictograma */}
    <Sequence from={P.econA.from} durationInFrames={P.econA.dur}>
      <Tarjeta ev={ev({ tipo: "tesis", seccion: "economia",
        texto: "El dólar subió cerca de quince pesos el veintitrés de septiembre y superó los novecientos sesenta." })} />
    </Sequence>
    <Sequence from={P.econB.from} durationInFrames={P.econB.dur}>
      <Tarjeta ev={ev({ tipo: "dato", grafico: "cifra", seccion: "economia",
        series: [{ etiqueta: "más caro cada mil dólares de deuda", raw: "15.000", num: 15000, unidad: "pesos" }] })} />
    </Sequence>

    {/* las transiciones van ARRIBA de las tarjetas: al desvanecerse, la
        tarjeta que ya está debajo aparece sola */}
    {/* LA ENTRADA: la portada ya no corta a la tarjeta blanca. La cámara
        entra desde la fila hasta la baldosa de la noticia del día. */}
    <Sequence from={P.trans0.from} durationInFrames={P.trans0.dur}>
      <TransicionMosaico baldosas={BALDOSAS} indice={0} dur={P.trans0.dur / 24}
        conImagen={["clima.png"]} fecha={FECHA} />
    </Sequence>
    <Sequence from={P.trans1.from} durationInFrames={P.trans1.dur}>
      <TransicionMosaico baldosas={BALDOSAS} indice={I_CLIMA} dur={P.trans1.dur / 24}
        conImagen={["clima.png"]} fecha={FECHA} />
    </Sequence>
    <Sequence from={P.trans2.from} durationInFrames={P.trans2.dur}>
      <TransicionMosaico baldosas={BALDOSAS} indice={I_ECON} dur={P.trans2.dur / 24}
        conImagen={["clima.png"]} fecha={FECHA} />
    </Sequence>
  </AbsoluteFill>
);

export const RootExpress: React.FC = () => (
  <Composition id="Express" component={Express} width={1920} height={1080} fps={24} durationInFrames={820} />
);
