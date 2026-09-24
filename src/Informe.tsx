import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow } from "./tema";
import { Tarjeta, SeccionBanner, CortinaSeccion, Evento } from "./tarjetas";
import { TransicionMosaico, Baldosa } from "./mosaico";
import { FondosContext } from "./fondos";

export type Timeline = {
  version: number;
  meta: {
    titulo: string;
    descripcion?: string;
    fecha?: string;              // AAAA-MM-DD (Chile), para el sello de inicio
    serie?: string;              // "informe" | "clave"
    inicioNarracion?: number;    // segundos: la voz arranca después del sello
    musica?: string | null;      // ruta en public/, ej. "musica/informe.mp3"
    logo?: string | null;        // logo sonoro del sello (2 s)
    cortinas?: string[] | null;  // melodias de transicion, se van alternando
    cierre?: string | null;      // melodia final
    fondos?: boolean;            // texturas por sección (src/fondos.tsx); apagado = video de siempre
    mosaico?: boolean;           // el mosaico como transición de sección (24-09); apagado = la cortina de siempre
    secciones?: string[];        // qué secciones tienen imagen propia hoy, ej. ["clima.png"]; el resto va a color
    selloEn?: number;            // segundos en que entra el sello; 0 = al inicio (apertura en frío: después de la noticia)
    fps: number;
    width: number;
    height: number;
    duracionSeg: number;
  };
  audio: string | null;
  fuentes: string[];
  eventos: Evento[];
};

// Sello de identidad: 2,8 s al inicio, corre BAJO la narración (nunca la
// retrasa) y se desvanece revelando la primera tarjeta. Marca sin costo de
// retención - jamás una intro larga.
const SELLO_SEG = 2.8;

// Presupuesto duro de la cortina de seccion. No aporta informacion: si alguna
// vez hay que recortar el video, se recorta aqui primero.
const CORTINA_SEG = 1.1;

// El mosaico de transición nunca dura más que esto, ni más que el silencio
// real que hay en ese corte (ev.pausaDur). Entre las dos manda la más corta:
// pisar voz es peor que un viaje apurado.
const MOSAICO_MAX_SEG = 2.4;

// El viaje ARRANCA ANTES de la pausa. La pausa de la narración dura 1,2 s y
// en ese tiempo el viaje se ve apurado (Santiago, 24-09: "es muy rápido el
// cambio"). Alargar la pausa encarecería el informe entero en unos 12 s; en
// cambio el mosaico puede empezar mientras se terminan de decir las últimas
// palabras del bloque anterior, porque esa tarjeta ya se leyó. No se toca el
// audio: se gana tiempo de imagen, no de silencio.
const MOSAICO_ANTICIPO_SEG = 1.0;

const Sello: React.FC<{ fecha?: string; serie?: string }> = ({ fecha, serie }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const salida = interpolate(frame, [(SELLO_SEG - 0.6) * fps, SELLO_SEG * fps], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const entrada = interpolate(frame, [0, 0.35 * fps], [0, 1], { extrapolateRight: "clamp" });
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = txt.charAt(0).toUpperCase() + txt.slice(1);
  }
  const eyebrow = serie === "clave" ? "Claves para entender las noticias" : "El informe diario";
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel, opacity: salida, alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: entrada, textAlign: "center" }}>
        <div style={{ ...estiloEyebrow, marginBottom: 30 }}>{eyebrow}</div>
        <div style={{ fontFamily: tema.serif, fontSize: 132, fontWeight: 600, color: tema.tinta, lineHeight: 1.05 }}>
          Entender Chile
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: tema.patina, margin: "38px auto" }} />
        {fechaLarga ? (
          <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: tema.gris }}>{fechaLarga}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const InformeVideo: React.FC<Timeline> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const HOLD = Math.round(fps * 0.3); // pequeña cola para que no haya huecos entre tarjetas

  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const overlays = tl.eventos.filter((e) => e.overlay);
  // Las baldosas del mosaico son las secciones del día, en el orden del
  // guion. La fila se BARAJA con la fecha adentro del componente; el orden de
  // lectura, que es este, no se toca.
  const baldosas: Baldosa[] = overlays.map((e) => ({ texto: e.texto ?? "", categoria: e.categoria ?? null }));
  const selloEn = tl.meta.selloEn ?? 0;
  // la tesis de cada sección, como texto difuminado en su cortina
  const tesisDe = (nombre: string) => tl.eventos.find((e) => e.tipo === "tesis" && e.seccion === nombre)?.texto;

  return (
    <FondosContext.Provider value={{ activo: !!tl.meta.fondos, fecha: tl.meta.fecha ?? "" }}>
    <AbsoluteFill style={{ backgroundColor: tema.papel }}>
      {tl.audio ? (
        // la voz entra cuando el sello ya se fue (build-timeline corrió los tiempos)
        <Sequence from={f(tl.meta.inicioNarracion ?? 0)}>
          <Audio src={staticFile(tl.audio)} />
        </Sequence>
      ) : null}
      {tl.meta.musica ? (
        // cama musical: baja bajo la voz, protagonista mientras el video es mudo
        <Audio src={staticFile(tl.meta.musica)} volume={tl.audio ? 0.1 : 0.3} loop />
      ) : null}
      {tl.meta.logo ? (
        // sello sonoro: suena junto al sello de identidad (dura 2,6 s; la
        // ventana debe cubrirlo entero o se corta la cola)
        <Sequence from={f(selloEn)} durationInFrames={Math.round((SELLO_SEG + 0.4) * fps)}>
          <Audio src={staticFile(tl.meta.logo)} volume={0.5} />
        </Sequence>
      ) : null}
      {tarjetas.map((ev, i) => (
        <Sequence key={i} from={f(ev.from)} durationInFrames={Math.max(1, f(ev.to) - f(ev.from) + HOLD)}>
          <Tarjeta ev={ev} />
        </Sequence>
      ))}
      {overlays.map((ev, i) => (
        <Sequence key={"ov" + i} from={f(ev.from)} durationInFrames={Math.max(1, f(ev.to) - f(ev.from))}>
          <SeccionBanner texto={ev.texto ?? ""} />
        </Sequence>
      ))}
      {/* TRANSICIÓN DE SECCIÓN. Con meta.mosaico encendido, la cámara se aleja
          del bloque que termina, cruza la fila de secciones del día y entra en
          el que empieza: una sola toma, el mosaico v3 que Santiago aprobó en
          el taller. Apagado, queda la cortina de siempre.

          Las dos comparten la misma regla: solo se encienden donde la
          narración trae silencio, si no taparían voz. La primera sección no
          lleva, porque ahí ya está el sello. La diferencia es que la cortina
          necesitaba una melodía para existir y el mosaico no: la música es
          opcional, el viaje es el que cuenta. */}
      {tl.meta.mosaico
        ? overlays
            .map((ev, i) => ({ ev, i }))
            .filter(({ ev, i }) => i > 0 && ev.pausaDur
              && (ev.from < selloEn - 0.5 || ev.from > selloEn + SELLO_SEG + 0.5))
            .map(({ ev, i }) => {
              const anticipo = Math.min(MOSAICO_ANTICIPO_SEG, Math.max(0, ev.from - (overlays[i - 1]?.from ?? 0) - 2));
              const dur = Math.min(ev.pausaDur!, MOSAICO_MAX_SEG) + anticipo;
              return (
                <Sequence key={"mos" + i} from={f(ev.from - anticipo)} durationInFrames={Math.max(1, f(dur))}>
                  {/* la melodía NO se adelanta con la imagen: suena en la
                      pausa, que es donde hay silencio. La imagen puede
                      empezar antes, el sonido no. */}
                  {tl.meta.cortinas && tl.meta.cortinas.length ? (
                    <Sequence from={f(anticipo)}>
                      <Audio src={staticFile(tl.meta.cortinas[i % tl.meta.cortinas.length])} volume={0.85} />
                    </Sequence>
                  ) : null}
                  <TransicionMosaico baldosas={baldosas} indice={i} dur={dur}
                    conImagen={tl.meta.secciones ?? []} fecha={tl.meta.fecha} />
                </Sequence>
              );
            })
        : tl.meta.cortinas && tl.meta.cortinas.length
        ? overlays
            .filter((ev, i) => i > 0 && (ev.from < selloEn - 0.5 || ev.from > selloEn + SELLO_SEG + 0.5))
            .map((ev, i) => (
              <Sequence key={"cor" + i} from={f(ev.from)} durationInFrames={f(CORTINA_SEG)}>
                <Audio src={staticFile(tl.meta.cortinas![i % tl.meta.cortinas!.length])} volume={0.85} />
                <CortinaSeccion texto={ev.texto ?? ""} extracto={tesisDe(ev.texto ?? "")} />
              </Sequence>
            ))
        : null}
      {tl.meta.cierre ? (
        <Sequence from={Math.max(0, f(tl.meta.duracionSeg - 3.2))}>
          <Audio src={staticFile(tl.meta.cierre)} volume={0.6} />
        </Sequence>
      ) : null}
      <Sequence from={f(selloEn)} durationInFrames={Math.round(SELLO_SEG * fps)}>
        <Sello fecha={tl.meta.fecha} serie={tl.meta.serie} />
      </Sequence>
    </AbsoluteFill>
    </FondosContext.Provider>
  );
};
