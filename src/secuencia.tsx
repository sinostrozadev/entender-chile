// LA SECUENCIA DEL 24-09-2026 LLEVADA AL INFORME DE VERDAD.
//
// Por qué existe (27-09-2026): el primer intento puso las tarjetas sobre la
// imagen de sección tarjeta por tarjeta, y Santiago lo devolvió: "el video no
// salió como lo habíamos trabajado. La imagen de la sección debe quedar
// durante TODA la sección, se oscurece la imagen y el texto va encima". Lo
// aprobado estaba dictado en src/taller-secuencia.tsx y en
// bitacora/taller/VISUAL.md (3b), y esto es ESO, portado tal cual al informe
// que arma el pipeline, no una versión nueva.
//
// La estructura (VISUAL 3b): portada con la ilustración del día a sangre y el
// gancho encima → la noticia principal completa sobre esa misma imagen → el
// mosaico como PRESENTACIÓN, nunca como apertura (un índice al principio le
// pide paciencia a alguien que todavía no tiene motivos para dártela) → y
// recién ahí el recorrido sección por sección.
//
// El bloque (taller-secuencia, corregido con los reparos de Santiago):
//   sin cabecera →  aparece directamente oscuro y entra el texto
//   con cabecera →  aparece al 50% de oscurecido, se muestra el título, el
//                   barrido sigue hasta el 100% y recién ahí entran los textos
// Al terminar la sección no se retira nada: queda como está.
//
// El oscurecido es de la SECCIÓN, no de cada tarjeta: las tarjetas van en
// FondoTarjetaContext modo "transparente" encima. Si cada tarjeta barriera, la
// sección barrería cuatro veces.
//
// QUIÉN DECIDE LOS TIEMPOS: no este archivo. El plan (qué bloque, de cuándo a
// cuándo, cuánto dura su cabecera, dónde viaja la cámara) lo calcula
// scripts/secuencia-plan.js y viaja en meta.secuencia. Acá solo se dibuja. Es
// la misma división que ya tiene el resto: build-timeline planifica y Remotion
// pinta, así los tiempos se pueden mirar en un JSON sin rendir un video.
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Tarjeta, Evento, FondoTarjetaContext, velo } from "./tarjetas";
import { Picto } from "./pictogramas";
import { PortadaPrueba } from "./portada-prueba";

const COBRE = "#D08A5B";
// Gris de estructura (el mismo de src/mosaico.tsx): Apertura, En titulares,
// Agenda y Cierre no son un tema y no pueden llevar el color de un tema.
const GRAFITO = "#3A3D42";
// Lo que dura la salida de una sección: el velo se retira y vuelve la imagen
// limpia, que es el cuadro con el que arranca el viaje de la cámara.
const SALIDA_SEG = 0.9;
const sv = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// ── el plan que llega en meta.secuencia ──────────────────────────────────
export type Baldosa = { texto: string; categoria?: string | null; imagen?: string | null };
export type BloqueP = {
  texto: string; categoria?: string | null; imagen?: string | null;
  from: number; to: number;            // segundos absolutos
  titulo?: string | null;              // si lo trae, lleva cabecera
  lleno?: [number, number];            // segundos desde el inicio del bloque: el barrido de la mitad al final
};
export type Paseo = {
  from: number; dur: number;           // segundos
  desde: number; hasta: number;        // índices de baldosa
  presentacion?: boolean;              // el paseo que presenta la fila entera, con el sello encima
};
export type Plan = {
  portada?: string | null; portadaSeg?: number;
  baldosas: Baldosa[]; bloques: BloqueP[]; paseos: Paseo[];
};

// ── el tratamiento de sección (24-09) ────────────────────────────────────
// Una foto sola no dice de qué sección es. Lo que convierte doce fotos
// distintas en una familia, y a cada una en SU sección, son dos capas que se
// aplican siempre igual:
//
//   el TINTE     un velo del color de la sección, en modo color, que tiñe sin
//                oscurecer: clima azul piedra, economía ocre, seguridad vino.
//   el GRABADO   el pictograma de la sección, enorme y casi transparente,
//                SIEMPRE en el mismo lugar. Es lo que se reconoce de un
//                vistazo, incluso cuando la cabecera ya pasó.
//
// Van las dos en código, no dentro de la imagen: se aplican a las doce de una
// vez y se ajustan en un render, sin volver a pedirle nada a GPT.
const TINTE = 0.3;
const GRABADO = 0.085;

// (27-09) El GRABADO va solo cuando NO hay imagen propia: las imágenes de
// sección ya traen su motivo y el pictograma encima se leía como una mancha
// (Santiago lo vio en el video de prueba). El tinte sí va siempre.
export const Tratamiento: React.FC<{ categoria?: string | null; escala?: number; conImagen?: boolean }> = ({ categoria, escala = 1, conImagen = false }) => {
  if (!categoria) return null;
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: colorDeSeccion(categoria), opacity: TINTE, mixBlendMode: "color" }} />
      {conImagen ? null : (
      <div style={{ position: "absolute", right: -60 * escala, bottom: -90 * escala,
        width: 620 * escala, height: 620 * escala, opacity: GRABADO }}>
        <Picto nombre={categoria} color="#FFFFFF" />
      </div>
      )}
    </>
  );
};

// EL VELO DE UNA SECCIÓN SIN IMAGEN PROPIA (27-09-2026, corrección de
// Santiago: "ese oscurecido a la mitad es solo para título y debe oscurecerse
// toda la pantalla para el desarrollo de la noticia").
//
// Antes esto frenaba el BARRIDO en 0,62 cuando la sección no tenía imagen, con
// la idea correcta de no apagar el color que ahí es lo único que la identifica.
// El error fue el instrumento: velo() no es una opacidad, es la POSICIÓN de la
// cortina. Frenarla en 0,62 deja la pantalla oscura hasta el 50,6% y limpia
// desde el 65,6% hacia la derecha, y no solo durante el título: durante todo el
// bloque, con el texto de la noticia encima. El informe del 27-09-2026 salió
// así en 13 de sus 16 secciones, porque solo economía tenía imagen.
//
// Ahora la cortina llega a 1 siempre, con imagen o sin ella, y lo que deja
// respirar al color es la TINTA. Con 0,6 el peor caso de los doce colores de
// sección es plata pública (#806B45), que compuesto queda en rgb(64,57,43): el
// texto #F7F6F2 encima da 10,6 a 1 de contraste, y el color todavía se ve.
// Medido, no estimado, para los seis colores en uso.
const ALFA_SIN_IMAGEN = 0.6;

// EL TÍTULO DE LA SECCIÓN, UNO SOLO (27-09-2026, Santiago: "el mosaico que
// contenga el título de la noticia, no solo la imagen de la sección, para que
// la transición se vea más limpia").
//
// Antes había dos títulos distintos: uno chico abajo en la baldosa, que se
// apagaba al llegar la cámara, y otro grande al medio en el bloque, que se
// encendía justo después. Eso es un relevo, y un relevo se ve. Ahora es el
// MISMO componente con una escala: la baldosa lo dibuja a CAJA/1920 y el
// bloque a 1, así que en el cuadro en que la baldosa llena la pantalla las dos
// versiones caen en el mismo pixel y no hay nada que relevar. Es la misma
// regla del empalme que ya obedecen el velo y el pictograma.
export const TituloSeccion: React.FC<{ categoria?: string | null; titulo: string; escala?: number; opacidad?: number }> =
({ categoria, titulo, escala = 1, opacidad = 1 }) => (
  <div style={{ position: "absolute", left: 110 * escala, top: "50%", transform: "translateY(-50%)",
    maxWidth: 760 * escala, opacity: opacidad }}>
    <div style={{ fontFamily: tema.mono, fontSize: 24 * escala, letterSpacing: "0.2em", textTransform: "uppercase",
      color: COBRE, marginBottom: 22 * escala }}>{categoria || "Entender Chile"}</div>
    <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 78 * escala, lineHeight: 1.06, color: "#F7F6F2" }}>
      {titulo}
    </div>
  </div>
);

// ── el tablero ───────────────────────────────────────────────────────────
const CAJA = 420, CAJA_ALTO = 236;
const ANCHO = 300, ALTO = 169, HUECO = 26;
const K = ANCHO / CAJA, ESCALA = 1920 / ANCHO;

// `entrante` = esta baldosa es el DESTINO del viaje. Importa porque los dos
// extremos del viaje tienen que calzar con lo que hay al otro lado: la que
// entra se dibuja como el primer cuadro del bloque que viene (medio oscura,
// con su título), y la que sale como el último cuadro del bloque que acaba de
// terminar, que ahora se va limpio (ver SALIDA_SEG más abajo).
const Cara: React.FC<{ b: Baldosa; activa: boolean; z: number; entrante?: boolean }> = ({ b, activa, z, entrante = false }) => (
  <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative" }}>
    <div style={{ width: CAJA, height: CAJA_ALTO, position: "relative", overflow: "hidden",
      transform: `scale(${K})`, transformOrigin: "top left",
      backgroundColor: b.categoria ? colorDeSeccion(b.categoria) : GRAFITO,
      opacity: activa ? 1 : 0.78 }}>
      {b.imagen ? <Img src={staticFile(b.imagen)} style={{ position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      <Tratamiento categoria={b.categoria} escala={CAJA / 1920} conImagen={!!b.imagen} />
      {/* EL EMPALME. Lo que el ojo lee como salto no es el zoom: es que la
          baldosa llena el cuadro con un velo diagonal y el bloque que viene
          después lo tiene a la mitad, de izquierda a derecha. Al llegar, la
          baldosa se convierte en el bloque: el velo gira de diagonal a
          vertical y se planta en la mitad, el pictograma se apaga y su propio
          título se va, que es justo cuando entra la cabecera. */}
      <AbsoluteFill style={{ background: "linear-gradient(60deg, rgba(23,25,28,0.84) 26%, rgba(23,25,28,0.06) 82%)",
        opacity: b.imagen ? 1 - z : 0 }} />
      <AbsoluteFill style={{ background: "linear-gradient(60deg, rgba(23,25,28,0.42) 20%, rgba(23,25,28,0) 78%)",
        opacity: b.imagen ? 0 : 1 - z }} />
      <AbsoluteFill style={{ background: velo(0.5, false, b.imagen ? undefined : ALFA_SIN_IMAGEN),
        opacity: entrante ? z : 0 }} />
      <TituloSeccion categoria={b.categoria} titulo={b.texto} escala={CAJA / 1920}
        opacidad={entrante || z < 0.02 ? 1 : 1 - z} />
      {/* el filo de cobre se apaga MUCHO antes de llegar: al llenar el cuadro
          quedaba una línea de un píxel marcando el borde de la baldosa, y eso
          delataba el empalme */}
      <div style={{ position: "absolute", inset: 0,
        outline: activa ? `${interpolate(z, [0, 0.72], [3, 0], { extrapolateRight: "clamp" })}px solid ${COBRE}` : "none",
        outlineOffset: -2 }} />
    </div>
  </div>
);

// La cámara: una sola trayectoria de principio a fin, así no puede aparecer un
// corte. La baldosa que llena el cuadro se dibuja igual que la pantalla
// completa que viene después, por eso el paso no se nota.
export const Tablero: React.FC<{ baldosas: Baldosa[]; cuadros: number[]; zooms: number[]; focos: number[] }> =
({ baldosas, cuadros, zooms, focos }) => {
  const f = useCurrentFrame();
  const paso = ANCHO + HUECO;
  const centro = (baldosas.length - 1) / 2;
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
          {baldosas.map((b, i) => (
            <Cara key={i} b={b} activa={i === foco} z={i === foco ? z : 0}
              entrante={i === focos[focos.length - 1]} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// (27-09-2026) Acá vivía VeloQueSuelta: una capa negra al 76% que entraba
// entera en el primer cuadro del viaje y se soltaba en 34 cuadros. Existía
// para tapar un desajuste, que el bloque terminaba oscuro y el tablero no, y
// el remedio se veía peor que la enfermedad: Santiago lo describió como "un
// parpadeo, al parecer tiene algún efecto que pone en negro la imagen". Se
// fue. Ahora los dos extremos calzan de verdad: el bloque se va retirando su
// propio velo (SALIDA_SEG) y la baldosa que sale se dibuja sin velo, así que
// no queda nada que tapar.

// El sello, encima del tablero que ya se está moviendo. El velo de abajo no
// es decoración: sin él el nombre del canal cae justo sobre el título de una
// baldosa y las dos letras se pisan.
const Sello: React.FC<{ fecha?: string; serie?: string; dur: number }> = ({ fecha, serie, dur }) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, 14, dur - 20, dur], [0, 1, 1, 0], sv);
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = txt.charAt(0).toUpperCase() + txt.slice(1);
  }
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op }}>
      <AbsoluteFill style={{ backgroundColor: "rgba(21,23,26,0.72)" }} />
      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase",
          color: COBRE, marginBottom: 26 }}>
          {serie === "clave" ? "Claves para entender las noticias" : "El informe diario"}
        </div>
        <div style={{ fontFamily: tema.serif, fontSize: 122, fontWeight: 600, color: "#F7F6F2", lineHeight: 1.04 }}>
          Entender Chile
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: COBRE, margin: "34px auto" }} />
        {fechaLarga ? (
          <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.08em", color: "rgba(242,242,239,0.72)" }}>
            {fechaLarga}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

// ── un bloque: la imagen manda toda la sección ───────────────────────────
export const Bloque: React.FC<{ b: BloqueP; tarjetas: { ev: Evento; from: number; dur: number }[]; dur: number }> =
({ b, tarjetas, dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lleno: [number, number] | null = b.titulo && b.lleno
    ? [Math.round(b.lleno[0] * fps), Math.round(b.lleno[1] * fps)] : null;
  const avance = lleno ? interpolate(f, lleno, [0.5, 1], sv) : 1;

  // EL TÍTULO NO SE PISA CON EL BARRIDO (27-09-2026). Santiago: "la primera
  // imagen te muestra un título, y queda pasado y se ve feo, y pasa en
  // varias". Y tenía razón: el título se apagaba 12 cuadros DESPUÉS de que
  // empezara el barrido, así que la cortina cruzaba la pantalla con el texto
  // todavía encima y se veía media pantalla clara al lado del título. Ahora
  // son tres tiempos seguidos y no dos superpuestos: el título está puesto
  // desde el primer cuadro (lo trae la baldosa), se va del todo, y recién
  // entonces barre.
  //
  // Tampoco entra con fundido: al llegar la cámara el título YA está, dibujado
  // por la baldosa en el mismo lugar. Encenderlo acá sería encender algo que
  // ya se veía.
  const opTitulo = lleno ? interpolate(f, [lleno[0] - 10, lleno[0]], [1, 0], sv) : 0;

  // LA SALIDA (27-09-2026). Santiago: "antes de terminar cada sección se ve
  // como si parpadeara... quitémoslo, para que se vea natural la salida, ahí
  // sí puede volver solo la imagen de sección al fondo de mosaicos, para
  // mantener la suavidad". Así que el velo se RETIRA en el último tramo y la
  // imagen vuelve limpia, que es con lo que arranca el viaje de la cámara.
  // Nunca antes de que termine la última tarjeta: el texto no puede quedar
  // sobre la imagen sin velo. Si no queda tramo, no se retira nada y el corte
  // es el de siempre.
  const finTarjetas = tarjetas.length ? Math.max(...tarjetas.map((c) => c.from + c.dur)) : 0;
  const salidaDesde = Math.max(finTarjetas, dur - Math.round(fps * SALIDA_SEG));
  const retiro = dur - salidaDesde >= Math.round(fps * 0.25)
    ? interpolate(f, [salidaDesde, dur], [0, 1], sv) : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {/* sin imagen propia, el fondo es el color de la sección: el grabado
          hace que igual se lea como sección y no como un color suelto */}
      {b.imagen ? (
        <Img src={staticFile(b.imagen)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transform: `scale(${1 + f * 0.00008})` }} />
      ) : (
        // el mismo gris de estructura que usa la baldosa: Apertura, En
        // titulares, Agenda y Cierre no son un tema, así que no pueden llevar
        // el color de un tema (colorDeSeccion los mandaba a todos a la pátina)
        <AbsoluteFill style={{ backgroundColor: b.categoria ? colorDeSeccion(b.categoria) : GRAFITO }} />
      )}
      <Tratamiento categoria={b.categoria} conImagen={!!b.imagen} />
      {/* sin imagen el velo es más suave: si no, el color de la sección, que
          es lo único que la identifica ahí, se apaga hasta desaparecer */}
      {/* velo(x, true) es el mismo velo al revés: transparente hasta x y
          oscuro después. En retiro = 0 los dos dibujan la pantalla entera
          oscura, así que el cambio de uno al otro no se ve. */}
      <AbsoluteFill style={{ background: retiro > 0
        ? velo(retiro, true, b.imagen ? undefined : ALFA_SIN_IMAGEN)
        : velo(avance, false, b.imagen ? undefined : ALFA_SIN_IMAGEN) }} />
      {b.titulo ? <TituloSeccion categoria={b.categoria} titulo={b.titulo} opacidad={opTitulo} /> : null}
      <FondoTarjetaContext.Provider value={{ modo: "transparente", secciones: [] }}>
        {tarjetas.map((t, i) => (
          <Sequence key={i} from={t.from} durationInFrames={Math.max(1, t.dur)}><Tarjeta ev={t.ev} /></Sequence>
        ))}
      </FondoTarjetaContext.Provider>
    </AbsoluteFill>
  );
};

// ── el informe entero ────────────────────────────────────────────────────
export type PropsSecuencia = {
  meta: {
    fecha?: string; serie?: string; titulo?: string;
    logo?: string | null; musica?: string | null; cortinas?: string[] | null; cierre?: string | null;
    inicioNarracion?: number; duracionSeg: number;
    secuencia?: Plan;
  };
  audio: string | null;
  eventos: Evento[];
};

export const SecuenciaInforme: React.FC<PropsSecuencia> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const plan = tl.meta.secuencia as Plan;
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const HOLD = Math.round(fps * 0.3);

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {tl.audio ? (
        <Sequence from={f(tl.meta.inicioNarracion ?? 0)}>
          <Audio src={staticFile(tl.audio)} />
        </Sequence>
      ) : null}
      {tl.meta.musica ? <Audio src={staticFile(tl.meta.musica)} volume={tl.audio ? 0.1 : 0.3} loop /> : null}

      {/* 1 · la portada: la ilustración del día a sangre con el gancho encima */}
      {plan.portada ? (
        <Sequence durationInFrames={Math.max(1, f(plan.portadaSeg ?? 3.5))}>
          <PortadaPrueba imagen={plan.portada} titulo={tl.meta.titulo} fecha={tl.meta.fecha} />
        </Sequence>
      ) : null}

      {/* 2 y 4 · los bloques: cada sección con su imagen durante toda la
          sección, y las tarjetas transparentes encima */}
      {plan.bloques.map((b, i) => {
        const dela = tarjetas.filter((c) => c.seccion === b.texto);
        return (
          <Sequence key={"bl" + i} from={f(b.from)} durationInFrames={Math.max(1, f(b.to) - f(b.from))}>
            <Bloque b={b} dur={Math.max(1, f(b.to) - f(b.from))} tarjetas={dela.map((c) => ({ ev: c,
              from: Math.max(0, f(c.from) - f(b.from)),
              dur: f(c.to) - f(c.from) + HOLD }))} />
          </Sequence>
        );
      })}

      {/* 3 · el mosaico: presentación después de la principal, y recorrido
          entre una sección y la siguiente */}
      {plan.paseos.map((p, i) => {
        const dur = f(p.dur);
        // en la presentación la cámara se aleja, la fila avanza y recién al
        // final entra en la sección; en un recorrido corto solo se aleja y
        // vuelve a entrar en la siguiente
        const cuadros = p.presentacion ? [0, Math.round(dur * 0.34), Math.round(dur * 0.7), dur] : [0, Math.round(dur * 0.46), dur];
        const zooms = p.presentacion ? [1, 0.12, 0.12, 1] : [1, 0.24, 1];
        const focos = p.presentacion ? [p.desde, p.desde, p.hasta, p.hasta] : [p.desde, p.desde, p.hasta];
        return (
          <Sequence key={"ps" + i} from={f(p.from)} durationInFrames={Math.max(1, dur)}>
            {p.presentacion && tl.meta.logo ? <Audio src={staticFile(tl.meta.logo)} volume={0.6} /> : null}
            {!p.presentacion && tl.meta.cortinas && tl.meta.cortinas.length ? (
              <Audio src={staticFile(tl.meta.cortinas[i % tl.meta.cortinas.length])} volume={0.85} />
            ) : null}
            <Tablero baldosas={plan.baldosas} cuadros={cuadros} zooms={zooms} focos={focos} />
            {p.presentacion ? (
              <Sequence from={Math.round(dur * 0.12)} durationInFrames={Math.max(1, Math.round(dur * 0.56))}>
                <Sello fecha={tl.meta.fecha} serie={tl.meta.serie} dur={Math.round(dur * 0.56)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}

      {tl.meta.cierre ? (
        <Sequence from={Math.max(0, f(tl.meta.duracionSeg - 3.2))}>
          <Audio src={staticFile(tl.meta.cierre)} volume={0.6} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
