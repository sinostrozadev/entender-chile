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
import { Portada } from "./portada";
import { EntradaDeMarca } from "./entrada";

const COBRE = "#D08A5B";
// Gris de estructura (el mismo de src/mosaico.tsx): Apertura, En titulares,
// Agenda y Cierre no son un tema y no pueden llevar el color de un tema.
const GRAFITO = "#3A3D42";
// Lo que dura la salida de una sección: el velo se retira y vuelve la imagen
// limpia, que es el cuadro con el que arranca el viaje de la cámara.
const SALIDA_SEG = 0.9;
// Lo que tarda el texto en apagarse, justo antes de que empiece la salida.
const APAGADO_SEG = 0.45;
// Cuánto antes de la salida tiene que estar el texto ya apagado.
const ANTES_SEG = 1;
const sv = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// NINGÚN interpolate de este archivo puede volver a tumbar un render
// (27-09-2026). Dos veces en la misma tarde un rango calculado salió sin
// crecer y el render de doce minutos murió: en el cuadro 281 por el sello,
// [0,14,-13,7], y en el 308 por la cabecera, [0,0]. Las dos veces el cálculo
// de arriba estaba mal y había que arreglarlo, y se arregló; pero que un
// número raro mate media hora de render es un lujo que este archivo no puede
// darse, porque el video sale de noche y no hay nadie mirando. El rango se
// fuerza a crecer acá, una vez, en vez de confiar en que los catorce cálculos
// de arriba salgan todos bien todas las noches.
const rango = (xs: number[]) => {
  const o = [...xs];
  for (let i = 1; i < o.length; i++) if (!(o[i] > o[i - 1])) o[i] = o[i - 1] + 1e-6;
  return o;
};

// ── el plan que llega en meta.secuencia ──────────────────────────────────
export type Baldosa = { texto: string; categoria?: string | null; imagen?: string | null };
// La ventana de UNA tarjeta dentro de su bloque, en segundos desde el inicio
// del bloque. `ev` es su posición en tl.eventos. Las calcula el plan
// (scripts/secuencia-plan.js) y acá solo se leen: ver el porqué allá.
export type VentanaTarjeta = { ev: number; desde: number; hasta: number };
export type BloqueP = {
  texto: string; categoria?: string | null; imagen?: string | null;
  from: number; to: number;            // segundos absolutos
  titulo?: string | null;              // si lo trae, lleva cabecera
  lleno?: [number, number];            // segundos desde el inicio del bloque: el barrido de la mitad al final
  tarjetas?: VentanaTarjeta[];         // qué tarjeta se ve y desde cuándo hasta cuándo
};
export type Paseo = {
  from: number; dur: number;           // segundos
  desde: number; hasta: number;        // índices de baldosa
  presentacion?: boolean;              // el paseo que presenta la fila entera, con el sello encima
};
export type Plan = {
  portada?: string | null; portadaSeg?: number;
  baldosas: Baldosa[]; bloques: BloqueP[]; paseos: Paseo[];
  fondo?: string | null;               // la imagen detras del mosaico
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
// SE DIBUJA SIEMPRE A TAMAÑO REAL (27-09-2026, Santiago: "los textos se
// cambian de tamaño al moverse entre el mosaico y el tamaño completo, se ve
// mal que se estén acomodando las letras en el movimiento").
//
// Antes la baldosa lo dibujaba con la letra achicada por número (78 por la
// escala) y el bloque con la letra entera. Dos composiciones distintas del
// mismo texto: a 17 px las palabras cortan en un lugar y a 78 px en otro, así
// que al llegar la cámara las líneas se reacomodaban. Ahora las dos dibujan
// el MISMO cuadro de 1920 con la MISMA letra de 78, y la baldosa solo lo
// encoge con un transform de CSS, que mueve pixeles y no vuelve a componer el
// texto. Las líneas cortan igual en los dos extremos del viaje.
//
// El ancho, 760 sobre 1920 desde la izquierda, deja el título dentro de la
// mitad de la pantalla, que es hasta donde llega lo oscuro macizo (ver velo).
export const TituloSeccion: React.FC<{ categoria?: string | null; titulo: string; escala?: number; opacidad?: number }> =
({ categoria, titulo, escala = 1, opacidad = 1 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080,
    transform: escala === 1 ? undefined : `scale(${escala})`, transformOrigin: "top left",
    opacity: opacidad, pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: 110, top: "50%", transform: "translateY(-50%)", maxWidth: 760 }}>
      <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.2em", textTransform: "uppercase",
        color: COBRE, marginBottom: 22 }}>{categoria || "Entender Chile"}</div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 78, lineHeight: 1.06, color: "#F7F6F2" }}>
        {titulo}
      </div>
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
      {/* CAJA/1920 = 420/1920, y CAJA_ALTO/1080 da lo mismo: el cuadro de la
          baldosa es el de la pantalla a escala, así que el título cae donde
          mismo. */}
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
export const Tablero: React.FC<{ baldosas: Baldosa[]; cuadros: number[]; zooms: number[]; focos: number[]; fondo?: string | null }> =
({ baldosas, cuadros, zooms, focos, fondo }) => {
  const f = useCurrentFrame();
  const paso = ANCHO + HUECO;
  const centro = (baldosas.length - 1) / 2;
  const posDe = (i: number) => (i - centro) * paso;
  const cs = rango(cuadros);
  const z = interpolate(f, cs, zooms, sv);
  const x = interpolate(f, cs, focos.map(posDe), sv);
  let foco = focos[0];
  for (let i = 0; i < cuadros.length; i++) if (f >= cuadros[i]) foco = focos[i];
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {/* EL FONDO DEL MOSAICO (27-09-2026). La fila viaja por la franja
          central, asi que la imagen solo se ve arriba y abajo. Se mueve MUY
          poco y al reves que la fila: ese desfase minimo es lo que hace que
          las baldosas parezcan atravesar un lugar en vez de deslizarse sobre
          un papel pintado. */}
      {fondo ? (
        <Img src={staticFile(fondo)} style={{ position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${1.06 + z * 0.05}) translateX(${x * 0.035}px)` }} />
      ) : null}
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
  // El rango tiene que ir SIEMPRE en aumento o interpolate se cae y con él el
  // render entero. Con la presentación larga de siempre (10 s) nunca pasaba,
  // pero el 27-09-2026 un cambio en el reparto del silencio la dejó en medio
  // segundo y salió [0,14,-13,7]: el render murió en el cuadro 281. El sello
  // no vale un video, así que acá se acomoda solo a lo que dure.
  const entra = Math.max(1, Math.min(14, Math.floor(dur * 0.3)));
  const sale = Math.max(entra + 1, dur - Math.max(1, Math.min(20, Math.floor(dur * 0.3))));
  const op = interpolate(f, rango([0, entra, sale, Math.max(sale + 1, dur)]), [0, 1, 1, 0], sv);
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
// EL RELEVO ENTRE UNA TARJETA Y LA SIGUIENTE (28-09-2026).
//
// Recortar la cola para que no se superpongan deja el problema contrario: la
// tarjeta que sale desaparece de golpe, con el texto todavia encendido del
// todo, y la que entra tarda su entrada en hacerse legible. Un corte seco
// sobre un fondo que no cambia, que es justo el parpadeo que Santiago habia
// pedido sacar en las salidas de seccion ("se lee, se apaga, se va").
//
// Asi que el ultimo tramo de cada tarjeta lo usa para apagarse. Medido a 24
// cuadros: la entrada de la tarjeta siguiente llega a 0,35 en tres cuadros y
// a 0,71 en seis, asi que RELEVO_SEG tiene que ser de ese orden; con esto la
// que sale llega a cero en el mismo cuadro en que la otra nace en cero y
// nunca hay dos textos legibles a la vez, que es lo unico que no se puede
// volver a romper.
const RELEVO_SEG = 0.25;
const Relevo: React.FC<{ dur: number; apaga: boolean; children: React.ReactNode }> = ({ dur, apaga, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tramo = Math.min(Math.round(fps * RELEVO_SEG), Math.max(1, Math.floor(dur / 3)));
  const op = apaga ? interpolate(f, rango([dur - tramo, dur]), [1, 0], sv) : 1;
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>;
};

export const Bloque: React.FC<{ b: BloqueP; tarjetas: { ev: Evento; from: number; dur: number }[]; dur: number }> =
({ b, tarjetas, dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lleno: [number, number] | null = b.titulo && b.lleno
    ? [Math.round(b.lleno[0] * fps), Math.round(b.lleno[1] * fps)] : null;
  // SIEMPRE OSCURA, SIN TRANSICIONES (27-09-2026, Santiago: "hay problemas al
  // oscurecer la pantalla de a poco, dejemoslo siempre oscurecida mejor, que
  // no haya transiciones de oscurecimiento").
  //
  // El barrido de la mitad al total y el oscurecido gradual de la principal se
  // van los dos. El velo entra puesto y no se mueve en toda la seccion: lo
  // unico que pasa encima es el titular, que aparece, se lee y se desvanece.
  // Menos piezas moviendose a la vez, y ninguna que pueda quedar a medio
  // camino. `lleno` sigue calculandose en el plan porque es el que marca
  // CUANDO se va el titular, pero ya no mueve el velo.
  const avance = 1;

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
  // El titular se desvanece cuando el locutor termina de decirlo: ese instante
  // es lleno[0], que el plan calcula desde la entrada hablada.
  // EL TITULAR SE VA ANTES DE QUE ENTRE LA PRIMERA TARJETA (28-09-2026). En la
  // primera edicion al aire con este formato, el titular de la noticia
  // principal quedo escrito ENCIMA del texto de la tarjeta, las dos frases
  // superpuestas y las dos ilegibles.
  //
  // Fue un error mio del 27-09, y de los que ensenan algo: le quite al barrido
  // el tope del aire disponible, con un motivo correcto ("oscurecer el fondo no
  // tapa nada, porque la tarjeta se dibuja encima"), pero el titular usa LOS
  // MISMOS numeros que el barrido, asi que se quedo sin tope tambien. Y el
  // titular si tapa. Un cambio bueno para una pieza aplicado sin mirar a quien
  // mas le llegaba.
  //
  // Ahora el limite es del titular y no del plan: se calcula aca, contra la
  // primera tarjeta que de verdad va a entrar, asi que ninguna cuenta de
  // secuencia-plan puede volver a superponerlos.
  const primeraTarjeta = tarjetas.length ? Math.min(...tarjetas.map((c) => c.from)) : Infinity;
  const finTitulo = lleno ? Math.min(lleno[1], primeraTarjeta - 3) : 0;
  const opTitulo = lleno ? interpolate(f, rango([Math.min(lleno[0], finTitulo - 6), finTitulo]), [1, 0], sv) : 0;

  // LA SALIDA (27-09-2026). Santiago: "antes de terminar cada sección se ve
  // como si parpadeara... quitémoslo, para que se vea natural la salida, ahí
  // sí puede volver solo la imagen de sección al fondo de mosaicos, para
  // mantener la suavidad". Así que el velo se RETIRA en el último tramo y la
  // imagen vuelve limpia, que es con lo que arranca el viaje de la cámara.
  // Nunca antes de que termine la última tarjeta: el texto no puede quedar
  // sobre la imagen sin velo. Si no queda tramo, no se retira nada y el corte
  // es el de siempre.
  // EL RESPIRO (27-09-2026, Santiago: "dale un poco de vida a las imagenes...
  // un pequeno zoom que vaya moviendo solo el fondo, no el texto, para que se
  // vea que respira"). Zoom lento mas una deriva horizontal minima, y la
  // direccion alterna de una seccion a la siguiente: si todas derivaran hacia
  // el mismo lado, doce secciones seguidas se leerian como un solo movimiento
  // largo en vez de como doce respiraciones. Se saca del propio titulo para
  // que sea estable entre renders, sin guardar nada.
  const deriva = (b.texto || "").length % 2 === 0 ? 1 : -1;
  const finTarjetas = tarjetas.length ? Math.max(...tarjetas.map((c) => c.from + c.dur)) : 0;
  const salidaDesde = Math.max(finTarjetas, dur - Math.round(fps * SALIDA_SEG));
  const retiro = dur - salidaDesde >= Math.round(fps * 0.25)
    ? interpolate(f, rango([salidaDesde, dur]), [0, 1], sv) : 0;

  // EL TEXTO SE APAGA ANTES DE IRSE (27-09-2026, Santiago: "antes de irse
  // nuevamente al fondo quita el texto de la pantalla, con algún efecto, para
  // que no se vea tan brusco el cambio. Así: termina la lectura del texto, se
  // apaga el texto, y ahí recién se va al fondo").
  //
  // Antes la última tarjeta simplemente dejaba de existir en su último cuadro
  // y enseguida arrancaba el viaje. Ahora se desvanece dentro de ese último
  // tramo, así que el orden en pantalla es el que él dictó: se lee, se apaga,
  // se va. No le quita tiempo a nadie: el fundido pasa dentro de los cuadros
  // que la tarjeta ya tenía.
  // y termina de apagarse ANTES_SEG antes de que empiece la salida, para que
  // quede un respiro de imagen sola entre el último texto y el viaje de la
  // cámara (27-09-2026, Santiago: "haz que el texto desvanezca 1 s antes").
  const cierra = salidaDesde - Math.round(fps * ANTES_SEG);
  const apagado = interpolate(f, rango([cierra - Math.round(fps * APAGADO_SEG), cierra]), [1, 0], sv);
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {/* sin imagen propia, el fondo es el color de la sección: el grabado
          hace que igual se lea como sección y no como un color suelto */}
      {b.imagen ? (
        <Img src={staticFile(b.imagen)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transform: `scale(${1.04 + f * 0.00009 * ZOOM}) translateX(${deriva * f * 0.012 * ZOOM}px)` }} />
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
        <AbsoluteFill style={{ opacity: apagado }}>
          {tarjetas.map((t, i) => (
            <Sequence key={i} from={t.from} durationInFrames={Math.max(1, t.dur)}>
              {/* la última no se apaga acá: la apaga el bloque entero, con
                  `apagado`, que además le deja el respiro de imagen sola antes
                  del viaje de la cámara */}
              <Relevo dur={Math.max(1, t.dur)} apaga={i < tarjetas.length - 1}>
                <Tarjeta ev={t.ev} />
              </Relevo>
            </Sequence>
          ))}
        </AbsoluteFill>
      </FondoTarjetaContext.Provider>
    </AbsoluteFill>
  );
};

// EL GRANO SE FUE (28-09-2026), despues de un dia al aire. Santiago: "quitemos
// el grano urgente". Lo que costaba, medido contra las ediciones anteriores:
// el informe paso de 57,6 MB a 227,6 MB, cuatro veces, porque el ruido no se
// comprime y cada cuadro pasa a ser unico para el codificador. El render subio
// de unos 26 a 35,9 minutos y la subida a YouTube de 6,7 a 12,8.
//
// Y la duda de fondo nunca se resolvio a favor: YouTube reencoda, y el grano
// fino es lo primero que cualquier codificador destruye, asi que lo mas
// probable es que se estuviera pagando cuatro veces el peso por algo que el
// espectador no llegaba a ver. El codigo esta en el historial (commits bd676e2
// y c734bc5) por si alguna vez se retoma con material mas claro, donde el
// grano necesita menos opacidad y pesa menos.
//
// El respiro que SI queda es el zoom lento de la portada y de las imagenes de
// seccion: es movimiento, no textura, y sobrevive a cualquier compresion.

// ── el informe entero ────────────────────────────────────────────────────
export type PropsSecuencia = {
  meta: {
    fecha?: string; serie?: string; titulo?: string;
    logo?: string | null; musica?: string | null; cortinas?: string[] | null; cierre?: string | null;
    inicioNarracion?: number; duracionSeg: number;
    secuencia?: Plan;
    // la entrada de marca reemplaza a la presentación y a la apertura (01-10)
    entrada?: boolean;
  };
  audio: string | null;
  eventos: Evento[];
};

// CUÁNTO RESPIRA EL FONDO (01-10-2026, elegido por Santiago viendo las dos
// muestras: "deja el exagerado"). El respiro nació el 27-09 en 1, y a ese valor
// el zoom es un 2% en diez segundos: existe en el código y no se percibe en
// pantalla. Santiago pidió verlo exagerado para comprobar que se reproducía, y
// al verlo eligió ese. En 14 el fondo crece un 30% en diez segundos, que es lo
// que se ve en el video, no en el número.
//
// Queda como variable para poder moverlo sin tocar el componente.
const ZOOM = Number(process.env.REMOTION_ZOOM_FONDO ?? "14") || 14;

export const SecuenciaInforme: React.FC<PropsSecuencia> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const plan = tl.meta.secuencia as Plan;
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte && !e.muda);
  const HOLD = Math.round(fps * 0.3);

  // LA ENTRADA DE MARCA (01-10-2026, dictada por Santiago). Reemplaza al paseo
  // de PRESENTACIÓN y al bloque de apertura, que hasta hoy eran dos cosas
  // seguidas: el mosaico viajaba con el sello encima y después la apertura
  // entraba como una sección más. Santiago lo pidió como un solo movimiento,
  // de la portada del canal al párrafo de apertura. Ver src/entrada.tsx.
  //
  // Se arma del plan y no de una lista a mano: la apertura es el bloque que
  // viene DESPUÉS de la presentación, sea cual sea su nombre. Si una edición no
  // tiene presentación o no tiene bloque después (una Clave, un urgente), esto
  // queda en null y el montaje sale como siempre.
  const entrada = (() => {
    if (!tl.meta.entrada) return null;
    const pres = plan.paseos.find((p) => p.presentacion);
    if (!pres) return null;
    const bloque = plan.bloques.find((b) => b.from >= pres.from - 0.01);
    if (!bloque) return null;
    const suya = (bloque.tarjetas ?? []).map((v) => ({ ...v, ev: tl.eventos[v.ev] }))
      .find((v) => v.ev && v.ev.tipo === "narracion");
    if (!suya) return null;
    return {
      bloque,
      desde: pres.from,
      // el paseo arranca ANTES del bloque, así que la entrada cubre los dos y
      // el párrafo entra cuando entraba su voz
      vozEn: Math.max(0, bloque.from + suya.desde - pres.from),
      durSeg: bloque.to - pres.from,
      texto: suya.ev.textoPantalla ?? suya.ev.texto ?? "",
      // con TEXTO_BLOQUES=1 el párrafo de apertura también se releva en bloques
      bloques: suya.ev.bloques, ritmo: suya.ev.ritmo, vozDur: suya.ev.to - suya.ev.from,
    };
  })();

  // QUIÉN DECIDE CUÁNDO SE VE CADA TARJETA: el plan, no este archivo
  // (28-09-2026). El cálculo vivía acá y por eso el defecto que Santiago
  // reportó tres veces (dos textos superpuestos al empezar cada sección) no se
  // podía ver en ningún JSON: había que rendir el video para enterarse. El
  // porqué completo está en scripts/secuencia-plan.js, que es donde ahora se
  // calcula. Acá solo se traduce de segundos a cuadros.
  //
  // Se redondean `desde` y `hasta` por separado, nunca una duración: así el
  // último cuadro de una tarjeta es exactamente el primero de la siguiente y
  // el redondeo no puede volver a superponerlas.
  //
  // El camino de abajo es para los timelines viejos, que no traen ventanas:
  // ahí se calcula como antes, para que un JSON guardado siga rindiendo.
  const ventanas = (b: BloqueP, dela: Evento[]) => {
    const base = f(b.from);
    if (b.tarjetas && b.tarjetas.length) {
      return b.tarjetas.map((v) => {
        const desde = f(v.desde);
        return { ev: tl.eventos[v.ev], from: desde, dur: Math.max(1, f(v.hasta) - desde) };
      }).filter((t) => !!t.ev);
    }
    return dela.map((c, k) => {
      const desde = Math.max(0, f(c.from) - base);
      const siguiente = dela[k + 1];
      const tope = siguiente ? Math.max(0, f(siguiente.from) - base) : Infinity;
      return { ev: c, from: desde, dur: Math.max(1, Math.min(f(c.to) - f(c.from) + HOLD, tope - desde)) };
    });
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      {tl.audio ? (
        <Sequence from={f(tl.meta.inicioNarracion ?? 0)}>
          <Audio src={staticFile(tl.audio)} />
        </Sequence>
      ) : null}
      {tl.meta.musica ? <Audio src={staticFile(tl.meta.musica)} volume={tl.audio ? 0.1 : 0.3} loop /> : null}

      {/* 1 · la portada: el título del día sobre el fondo de pantallas.json.
          Se monta aunque el plan no mande imagen, porque desde el 05-10-2026 el
          fondo lo resuelve el componente y ya no depende de que haya llegado la
          ilustración del día. `plan.portada` solo llega desde el video de
          prueba, que sí quiere ver la ilustración a pantalla completa. */}
      {(plan.portadaSeg ?? 0) > 0 ? (
        <Sequence durationInFrames={Math.max(1, f(plan.portadaSeg ?? 3.5))}>
          <Portada imagen={plan.portada} titulo={tl.meta.titulo} fecha={tl.meta.fecha} />
        </Sequence>
      ) : null}

      {/* 2 y 4 · los bloques: cada sección con su imagen durante toda la
          sección, y las tarjetas transparentes encima */}
      {plan.bloques.filter((b) => !(entrada && b === entrada.bloque)).map((b, i) => {
        const dela = tarjetas.filter((c) => c.seccion === b.texto);
        return (
          <Sequence key={"bl" + i} from={f(b.from)} durationInFrames={Math.max(1, f(b.to) - f(b.from))}>
            <Bloque b={b} dur={Math.max(1, f(b.to) - f(b.from))} tarjetas={ventanas(b, dela)} />
          </Sequence>
        );
      })}

      {/* 3 · el mosaico: presentación después de la principal, y recorrido
          entre una sección y la siguiente */}
      {plan.paseos.filter((p) => !(entrada && p.presentacion)).map((p, i) => {
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
            <Tablero baldosas={plan.baldosas} cuadros={cuadros} zooms={zooms} focos={focos} fondo={plan.fondo} />
            {p.presentacion ? (
              <Sequence from={Math.round(dur * 0.12)} durationInFrames={Math.max(1, Math.round(dur * 0.56))}>
                <Sello fecha={tl.meta.fecha} serie={tl.meta.serie} dur={Math.round(dur * 0.56)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}

      {/* LA ENTRADA DE MARCA. Va después de los bloques y de los paseos: ocupa
          el cuadro entero mientras dura y el sello sonoro de la presentación,
          que ya no tiene mosaico donde sonar, suena acá. */}
      {entrada ? (
        <Sequence from={f(entrada.desde)} durationInFrames={Math.max(1, f(entrada.durSeg))}>
          {tl.meta.logo ? <Audio src={staticFile(tl.meta.logo)} volume={0.6} /> : null}
          <EntradaDeMarca fecha={tl.meta.fecha} serie={tl.meta.serie} texto={entrada.texto}
            vozEn={entrada.vozEn} durSeg={entrada.durSeg}
            bloques={entrada.bloques} ritmo={entrada.ritmo} vozDur={entrada.vozDur} />
        </Sequence>
      ) : null}

      {tl.meta.cierre ? (
        <Sequence from={Math.max(0, f(tl.meta.duracionSeg - 3.2))}>
          <Audio src={staticFile(tl.meta.cierre)} volume={0.6} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
