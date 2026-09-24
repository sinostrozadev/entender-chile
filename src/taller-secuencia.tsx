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

const Baldosa: React.FC<{ b: Bal; activa: boolean; z: number }> = ({ b, activa, z }) => (
  <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative" }}>
    <div style={{ width: CAJA, height: CAJA_ALTO, position: "relative", overflow: "hidden",
      transform: `scale(${K})`, transformOrigin: "top left",
      backgroundColor: b.categoria ? colorDeSeccion(b.categoria) : "#3A3D42",
      opacity: activa ? 1 : 0.78 }}>
      {b.img ? <Img src={staticFile(b.img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      {b.categoria ? (
        <div style={{ position: "absolute", right: -22, top: -16, width: 166, height: 166,
          opacity: interpolate(z, [0, 0.55], [0.85, 0.12], { extrapolateRight: "clamp" }) }}>
          <Picto nombre={b.categoria} color="rgba(255,255,255,0.9)" />
        </div>
      ) : null}
      <AbsoluteFill style={{ background: b.img
        ? "linear-gradient(60deg, rgba(23,25,28,0.84) 26%, rgba(23,25,28,0.06) 82%)"
        : "linear-gradient(60deg, rgba(23,25,28,0.42) 20%, rgba(23,25,28,0) 78%)" }} />
      <div style={{ position: "absolute", left: 24, bottom: 22, width: 300, fontFamily: tema.serif,
        fontWeight: 600, fontSize: 22, lineHeight: 1.06, color: "#F7F6F2", opacity: 1 - z }}>{b.texto}</div>
      <div style={{ position: "absolute", inset: 0,
        outline: activa ? `${interpolate(z, [0, 1], [3, 0])}px solid ${COBRE}` : "none", outlineOffset: -2 }} />
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
const Bloque: React.FC<{
  img: string; titulo?: string; seccion?: string; categoria?: string | null;
  medio?: Fase; lleno: Fase; retiro?: Fase;
  tarjetas: { ev: Evento; from: number; dur: number }[];
}> = ({ img, titulo, categoria, medio, lleno, retiro, tarjetas }) => {
  const f = useCurrentFrame();
  let avance = medio ? interpolate(f, medio, [0, 0.5], sv) : 0;
  avance = Math.max(avance, interpolate(f, lleno, [medio ? 0.5 : 0, 1], sv));
  let retirando = false;
  if (retiro && f >= retiro[0]) { retirando = true; avance = interpolate(f, retiro, [1, 0], sv); }
  const opTitulo = titulo && medio
    ? interpolate(f, [medio[1] - 6, medio[1] + 10, lleno[0] - 4, lleno[0] + 12], [0, 1, 1, 0], sv) : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Img src={staticFile(img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", transform: `scale(${1 + f * 0.00008})` }} />
      <AbsoluteFill style={{ background: velo(avance, retirando) }} />
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
const PPAL = { from: 0, dur: 300 };          // 12,5 s
const INTRO = { from: 276, dur: 216 };       // 9 s: alejarse, la fila avanza, entrar
const S1 = { from: 470, dur: 330 };          // 13,75 s
const S2 = { from: 780, dur: 250 };
const LARGO = 1040;

const Secuencia: React.FC<{ conTextos: boolean }> = ({ conTextos }) => (
  <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
    {/* 1-3 · la principal: limpia, barre, texto, y el oscurecido se retira */}
    <Sequence from={PPAL.from} durationInFrames={PPAL.dur}>
      <Bloque img={CARATULA} lleno={[48, 86]} retiro={[252, 292]}
        tarjetas={[{ from: 92, dur: 168, ev: ev({ tipo: "tesis",
          texto: "El Congreso interpelará al canciller por la adhesión de Chile al Escudo de las Américas." }) }]} />
    </Sequence>

    {/* 4-5 · el intro: la cámara se aleja desde la misma imagen, la fila
        avanza, y al final entra en la primera sección */}
    <Sequence from={INTRO.from} durationInFrames={INTRO.dur}>
      <Audio src={staticFile("musica/sello.wav")} volume={0.75} />
      <Tablero cuadros={[0, 70, 150, 216]} zooms={[1, 0.12, 0.12, 1]} focos={[0, 0, 1, 1]} />
      <Sequence from={24} durationInFrames={120}><Intro conTextos={conTextos} dur={120} /></Sequence>
    </Sequence>

    {/* 6-7 · la sección: barre a la mitad, título, barre al final, textos */}
    <Sequence from={S1.from} durationInFrames={S1.dur}>
      <Bloque img="secciones/clima.png" titulo="Sistema frontal en el sur" categoria="clima"
        medio={[30, 70]} lleno={[150, 190]}
        tarjetas={[
          { from: 196, dur: 92, ev: ev({ tipo: "tesis", seccion: "clima",
            texto: "Un sistema frontal mantiene alertas por lluvias y tormentas en el sur." }) },
          { from: 288, dur: 42, ev: ev({ tipo: "dato", grafico: "cifra", seccion: "clima",
            series: [{ etiqueta: "acumulado proyectado en cordillera", raw: "más de 300 mm", num: 300, unidad: "mm" }] }) },
        ]} />
    </Sequence>

    {/* el recorrido entre una sección y la siguiente */}
    <Sequence from={S1.from + S1.dur - 30} durationInFrames={90}>
      <Tablero cuadros={[0, 40, 90]} zooms={[1, 0.24, 1]} focos={[1, 1, 2]} />
    </Sequence>

    <Sequence from={S2.from} durationInFrames={S2.dur}>
      <Bloque img={CARATULA} titulo="Dólar sobre los novecientos sesenta" categoria="economia"
        medio={[24, 62]} lleno={[132, 170]}
        tarjetas={[{ from: 176, dur: 74, ev: ev({ tipo: "dato", grafico: "cifra", seccion: "economia",
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
