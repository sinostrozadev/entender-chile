// TALLER · LA SECUENCIA COMPLETA (24-09-2026), tal como la dictó Santiago.
//
//   1. El video abre con la imagen principal LIMPIA.
//   2. El oscurecido barre de izquierda a derecha y aparece el texto.
//   3. Termina la principal: el oscurecido se retira hacia la derecha y la
//      imagen vuelve a quedar limpia.
//   4. Suena el motivo del canal y empieza el intro. La cámara se ALEJA y esa
//      misma imagen se convierte en la primera baldosa: los mosaicos no
//      aparecen de la nada, salen de lo que estábamos mirando. La fila avanza.
//   5. Termina el intro, se elige la primera sección y la cámara entra.
//   6. Aparece su imagen, el oscurecido barre HASTA LA MITAD y se muestra el
//      título. Cuando el título terminó, el oscurecido sigue hasta el final y
//      recién ahí aparecen los textos de la noticia.
//   7. Termina la noticia, el video se aleja, y sigue la siguiente.
//
// Aprobado: pausa de 2,5 s entre secciones (le suma unos 20 s al informe de
// diez minutos), borde del barrido suave al 15%, la imagen nunca se pone
// negra, y el recorrido del mosaico entre sección y sección.
//
// El oscurecido es de la SECCIÓN, no de cada tarjeta: las tarjetas van en
// modo transparente encima. Si cada tarjeta barriera, la sección barrería
// cuatro veces.
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Tarjeta, Evento, FondoTarjetaContext, velo } from "./tarjetas";
import { Picto } from "./pictogramas";

const COBRE = "#D08A5B";
const FECHA = "2026-09-24";
const CARATULA = `caratulas/${FECHA}.png`;
const FUENTE = "La Tercera, 23 sep; El Mostrador, 23 sep";
const sv = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ev = (e: Partial<Evento>): Evento => ({ tipo: "tesis", from: 0, to: 10, fuenteSeccion: FUENTE, ...e } as Evento);

// ── el tablero ───────────────────────────────────────────────────────────
const CAJA = 420, CAJA_ALTO = 236;
const ANCHO = 300, ALTO = 169, HUECO = 26;
const K = ANCHO / CAJA, ESCALA = 1920 / ANCHO;

type Bal = { texto: string; categoria: string | null; img?: string };
const BALDOSAS: Bal[] = [
  { texto: "La noticia del día", categoria: null, img: CARATULA },
  { texto: "Sistema frontal en el sur", categoria: "clima", img: "secciones/clima.png" },
  { texto: "Dólar sobre los novecientos sesenta", categoria: "economia" },
  { texto: "Reforma al sistema político", categoria: "congreso" },
  { texto: "Proyecto Antibarricadas", categoria: "seguridad" },
  { texto: "Presupuesto de educación", categoria: "educacion" },
];

// EL TRATAMIENTO DE SECCIÓN (24-09). Una foto sola no dice de qué sección es.
// Lo que convierte diez fotos distintas en una familia, y a cada una en SU
// sección, son dos capas que se aplican siempre igual:
//
//   el TINTE     un velo del color de la sección, en modo color, que tiñe sin
//                oscurecer: clima azul piedra, economía ocre, seguridad vino.
//   el GRABADO   el pictograma de la sección, enorme y casi transparente,
//                SIEMPRE en el mismo lugar. Es lo que se reconoce de un
//                vistazo, incluso cuando la cabecera ya pasó.
//
// Van las dos en código, no dentro de la imagen: se aplican a las diez de una
// vez y se ajustan en un render, sin volver a pedirle nada a GPT.
const TINTE = 0.3;      // cuánto tiñe
const GRABADO = 0.085;  // cuánto se ve el pictograma

const Tratamiento: React.FC<{ categoria: string | null; escala?: number }> = ({ categoria, escala = 1 }) => {
  if (!categoria) return null;
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: colorDeSeccion(categoria), opacity: TINTE, mixBlendMode: "color" }} />
      <div style={{ position: "absolute", right: -60 * escala, bottom: -90 * escala,
        width: 620 * escala, height: 620 * escala, opacity: GRABADO }}>
        <Picto nombre={categoria} color="#FFFFFF" />
      </div>
    </>
  );
};

const Baldosa: React.FC<{ b: Bal; activa: boolean; z: number }> = ({ b, activa, z }) => (
  <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative" }}>
    <div style={{ width: CAJA, height: CAJA_ALTO, position: "relative", overflow: "hidden",
      transform: `scale(${K})`, transformOrigin: "top left",
      backgroundColor: b.categoria ? colorDeSeccion(b.categoria) : "#3A3D42",
      opacity: activa ? 1 : 0.78 }}>
      {b.img ? <Img src={staticFile(b.img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      <Tratamiento categoria={b.categoria} escala={CAJA / 1920} />
      {/* EL EMPALME. Lo que el ojo lee como salto no es el zoom: es que la
          baldosa llena el cuadro con un velo diagonal y el bloque que viene
          después lo tiene a la mitad, de izquierda a derecha. Al llegar, la
          baldosa se convierte en el bloque: el velo gira de diagonal a
          vertical y se planta en la mitad, el pictograma se apaga y su propio
          título se va, que es justo cuando entra la cabecera. */}
      <AbsoluteFill style={{ background: "linear-gradient(60deg, rgba(23,25,28,0.84) 26%, rgba(23,25,28,0.06) 82%)",
        opacity: b.img ? 1 - z : 0 }} />
      <AbsoluteFill style={{ background: "linear-gradient(60deg, rgba(23,25,28,0.42) 20%, rgba(23,25,28,0) 78%)",
        opacity: b.img ? 0 : 1 - z }} />
      <AbsoluteFill style={{ background: velo(b.img ? 0.5 : 1, false), opacity: z }} />
      <div style={{ position: "absolute", left: 24, bottom: 22, width: 300, fontFamily: tema.serif,
        fontWeight: 600, fontSize: 22, lineHeight: 1.06, color: "#F7F6F2", opacity: 1 - z }}>{b.texto}</div>
      {/* el filo de cobre se apaga MUCHO antes de llegar: al llenar el cuadro
          quedaba una línea de un píxel marcando el borde de la baldosa, y eso
          delataba el empalme */}
      <div style={{ position: "absolute", inset: 0,
        outline: activa ? `${interpolate(z, [0, 0.72], [3, 0], { extrapolateRight: "clamp" })}px solid ${COBRE}` : "none",
        outlineOffset: -2 }} />
    </div>
  </div>
);

// La cámara: una sola trayectoria de principio a fin, así no puede aparecer
// un corte. La baldosa que llena el cuadro se dibuja igual que la pantalla
// completa que viene después, por eso el paso no se nota.
const Tablero: React.FC<{ cuadros: number[]; zooms: number[]; focos: number[] }> = ({ cuadros, zooms, focos }) => {
  const f = useCurrentFrame();
  const paso = ANCHO + HUECO;
  const centro = (BALDOSAS.length - 1) / 2;
  const posDe = (i: number) => (i - centro) * paso;
  const z = interpolate(f, cuadros, zooms, sv);
  const x = interpolate(f, cuadros, focos.map(posDe), sv);
  let foco = focos[0];
  for (let i = 0; i < cuadros.length; i++) if (f >= cuadros[i]) foco = focos[i];
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: HUECO,
          transform: `scale(${1 + (ESCALA - 1) * z}) translateX(${-x}px)`, transformOrigin: "center center" }}>
          {BALDOSAS.map((b, i) => <Baldosa key={i} b={b} activa={i === foco} z={i === foco ? z : 0} />)}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── un bloque: imagen limpia → barrido → texto ───────────────────────────
type Fase = [number, number];
// EL BLOQUE (corregido el 24-09 con los reparos de Santiago).
//
// El oscurecido YA NO ENTRA barriendo: el bloque aparece directamente oscuro,
// o a la mitad si lleva cabecera. El único barrido que queda es el de la
// mitad al final, cuando el título terminó de mostrarse. Y al terminar el
// tema no se retira nada: queda como está.
//
//   sin cabecera →  aparece al 100% oscuro y entra el texto
//   con cabecera →  aparece al 50%, se muestra el título, barre al 100%,
//                   entran los textos
const Bloque: React.FC<{
  img?: string | null; titulo?: string; seccion?: string; categoria?: string | null;
  lleno?: Fase;   // solo si lleva cabecera: el barrido de la mitad al final
  tarjetas: { ev: Evento; from: number; dur: number }[];
}> = ({ img, titulo, categoria, lleno, tarjetas }) => {
  const f = useCurrentFrame();
  const avance = titulo && lleno ? interpolate(f, lleno, [0.5, 1], sv) : 1;
  const retirando = false;
  const opTitulo = titulo && lleno
    ? interpolate(f, [0, 12, lleno[0] - 4, lleno[0] + 12], [0, 1, 1, 0], sv) : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {/* sin imagen propia, el fondo es el color de la sección: el grabado
          hace que igual se lea como sección y no como un color suelto */}
      {img ? (
        <Img src={staticFile(img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transform: `scale(${1 + f * 0.00008})` }} />
      ) : (
        <AbsoluteFill style={{ backgroundColor: colorDeSeccion(categoria) }} />
      )}
      <Tratamiento categoria={categoria ?? null} />
      <AbsoluteFill style={{ background: velo(img ? avance : Math.min(avance, 0.62), retirando) }} />
      {titulo ? (
        <div style={{ position: "absolute", left: 110, top: "50%", transform: "translateY(-50%)", maxWidth: 760, opacity: opTitulo }}>
          <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COBRE, marginBottom: 22 }}>{categoria || "Entender Chile"}</div>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 78, lineHeight: 1.06, color: "#F7F6F2" }}>{titulo}</div>
        </div>
      ) : null}
      <FondoTarjetaContext.Provider value={{ modo: "transparente", secciones: [] }}>
        {tarjetas.map((t, i) => (
          <Sequence key={i} from={t.from} durationInFrames={t.dur}><Tarjeta ev={t.ev} /></Sequence>
        ))}
      </FondoTarjetaContext.Provider>
    </AbsoluteFill>
  );
};

// ── el intro ─────────────────────────────────────────────────────────────
const VeloQueSuelta: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "rgba(21,23,26,0.76)",
    opacity: interpolate(f, [0, 34], [1, 0], sv), pointerEvents: "none" }} />;
};

const Intro: React.FC<{ conTextos: boolean; dur: number }> = ({ conTextos, dur }) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, 14, dur - 20, dur], [0, 1, 1, 0], sv);
  const fechaLarga = "Jueves 24 de septiembre de 2026";
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      {/* velo bajo el intro: el tablero sigue moviéndose detrás, pero sin
          esto el nombre del canal cae justo encima del título de una baldosa
          y las dos letras se pisan */}
      <AbsoluteFill style={{ backgroundColor: "rgba(21,23,26,0.72)" }} />
      {conTextos ? (
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase",
            color: COBRE, marginBottom: 26 }}>El informe diario</div>
          <div style={{ fontFamily: tema.serif, fontSize: 122, fontWeight: 600, color: "#F7F6F2", lineHeight: 1.04 }}>
            Entender Chile
          </div>
          <div style={{ width: 96, height: 4, backgroundColor: COBRE, margin: "34px auto" }} />
          <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.08em", color: "rgba(242,242,239,0.72)" }}>{fechaLarga}</div>
        </div>
      ) : (
        <div style={{ fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.34em", textTransform: "uppercase",
          color: "rgba(242,242,239,0.6)", position: "relative" }}>Entender Chile</div>
      )}
    </AbsoluteFill>
  );
};

// ── el guion de tiempos ──────────────────────────────────────────────────
// Todo en cuadros a 24. Los tramos respiran: 2 s de imagen limpia, 1,6 s de
// barrido, y 2,5 s de pausa entre secciones, que es lo aprobado.
// LOS TIEMPOS. La regla que faltaba: un bloque no puede empezar antes de que
// la cámara termine de llegar. Antes el bloque de sección arrancaba 22
// cuadros antes del final del viaje y se pintaba encima, así que el viaje
// quedaba cortado a mitad de camino. Ese era el salto.
// Y NADA DE FUNDIDO EN EL EMPALME: corte exacto en el cuadro en que la
// cámara llega. A zoom 1 la baldosa mide exactamente 1920 y muestra lo mismo
// que el bloque (mismo recorte de la imagen, mismo velo a la mitad, sin
// título en ninguna de las dos), así que el corte no se ve. Un fundido, en
// cambio, deja asomar el borde de la baldosa esos cuadros.
const PPAL  = { from: 0,   dur: 290 };
const INTRO = { from: 272, dur: 240 };
const S1    = { from: INTRO.from + INTRO.dur, dur: 330 };
const PASEO = { from: 0, dur: 120 };
const S2    = { from: 0, dur: 250 };
PASEO.from = S1.from + S1.dur;
S2.from = PASEO.from + PASEO.dur;
const LARGO = S2.from + S2.dur;

const Secuencia: React.FC<{ conTextos: boolean }> = ({ conTextos }) => (
  <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
    {/* 1-3 · la principal: limpia, barre, texto, y el oscurecido se retira */}
    <Sequence from={PPAL.from} durationInFrames={PPAL.dur}>
      <Bloque img={CARATULA}
        tarjetas={[{ from: 16, dur: 250, ev: ev({ tipo: "tesis",
          texto: "El Congreso interpelará al canciller por la adhesión de Chile al Escudo de las Américas." }) }]} />
    </Sequence>

    {/* 4-5 · el intro: la cámara se aleja desde la misma imagen, la fila
        avanza, y al final entra en la primera sección */}
    <Sequence from={INTRO.from} durationInFrames={INTRO.dur}>
      <Audio src={staticFile("musica/sello.wav")} volume={0.75} />
      <Tablero cuadros={[0, 80, 165, 240]} zooms={[1, 0.12, 0.12, 1]} focos={[0, 0, 1, 1]} />
      {/* el bloque anterior quedó oscuro y el tablero no: sin este velo que
          se va soltando, al empezar a alejarse la imagen se aclaraba de
          golpe. Es uno de los saltos. */}
      <VeloQueSuelta />
      <Sequence from={24} durationInFrames={120}><Intro conTextos={conTextos} dur={120} /></Sequence>
    </Sequence>

    {/* 6-7 · la sección: barre a la mitad, título, barre al final, textos */}
    <Sequence from={S1.from} durationInFrames={S1.dur}>
      <Bloque img="secciones/clima.png" titulo="Sistema frontal en el sur" categoria="clima"
        lleno={[92, 132]}
        tarjetas={[
          { from: 140, dur: 104, ev: ev({ tipo: "tesis", seccion: "clima",
            texto: "Un sistema frontal mantiene alertas por lluvias y tormentas en el sur." }) },
          { from: 244, dur: 86, ev: ev({ tipo: "dato", grafico: "cifra", seccion: "clima",
            series: [{ etiqueta: "acumulado proyectado en cordillera", raw: "más de 300 mm", num: 300, unidad: "mm" }] }) },
        ]} />
    </Sequence>

    {/* el recorrido entre una sección y la siguiente */}
    <Sequence from={PASEO.from} durationInFrames={PASEO.dur}>
      <Tablero cuadros={[0, 55, 120]} zooms={[1, 0.24, 1]} focos={[1, 1, 2]} />
    </Sequence>

    <Sequence from={S2.from} durationInFrames={S2.dur}>
      <Bloque titulo="Dólar sobre los novecientos sesenta" categoria="economia"
        lleno={[86, 126]}
        tarjetas={[{ from: 134, dur: 116, ev: ev({ tipo: "dato", grafico: "cifra", seccion: "economia",
          series: [{ etiqueta: "más caro cada mil dólares de deuda", raw: "15.000", num: 15000, unidad: "pesos" }] }) }]} />
    </Sequence>
  </AbsoluteFill>
);

export const RootSecuencia: React.FC = () => (
  <>
    <Composition id="SecuenciaConTextos" component={Secuencia} width={1920} height={1080} fps={24}
      durationInFrames={LARGO} defaultProps={{ conTextos: true }} />
    <Composition id="SecuenciaSinTextos" component={Secuencia} width={1920} height={1080} fps={24}
      durationInFrames={LARGO} defaultProps={{ conTextos: false }} />
  </>
);
