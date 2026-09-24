// EL MOSAICO EN PRODUCCIÓN (24-09-2026).
//
// Viene del taller, donde Santiago lo aprobó en su v3, y reemplaza a la
// cortina de sección: en vez de un cartel plano con el nombre, la cámara se
// aleja del bloque que termina, cruza la fila de secciones del día y entra en
// el que empieza. Una sola toma.
//
// Las reglas que trae del taller, todas de Santiago:
//   · una sola trayectoria interpolada, así no puede aparecer un corte;
//   · en pantalla completa nada se mueve: la baldosa se instala y se queda;
//   · el movimiento se siembra con la fecha, así dos días no se mueven igual
//     y dos renders del mismo día sí;
//   · nada cambia de golpe a mitad del viaje: todo se interpola con el zoom.
//
// LO QUE PONE CADA BALDOSA DE FONDO. Si la sección tiene imagen propia
// (meta.secciones trae la lista), va la imagen. Si no, va el color de la
// sección con su pictograma, que es el diseño v3 tal cual. Las imágenes
// llegan de a una y el video no espera a tenerlas todas.
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Picto } from "./pictogramas";

const COBRE = "#D08A5B";
const CAJA = 420, CAJA_ALTO = 236;     // la baldosa se DIBUJA acá
const ANCHO = 300, ALTO = 169, HUECO = 26;
const K = ANCHO / CAJA;
const ESCALA = 1920 / ANCHO;
const AFUERA = 0.22;   // el punto más lejano del viaje: nunca se ve el tablero entero de golpe

export type Baldosa = { texto: string; categoria?: string | null };

const mulberry = (semilla: number) => {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
export const semillaDeFecha = (fecha?: string) => {
  let h = 2166136261;
  for (const c of fecha || "sin-fecha") { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
};

// Gris de estructura. Apertura, En titulares, Agenda y Cierre no son un tema,
// así que no pueden llevar el color de un tema: colorDeSeccion los mandaba a
// todos a la pátina y la fila quedaba con seis baldosas verdes iguales.
const GRAFITO = "#3A3D42";

const Cara: React.FC<{ b: Baldosa; activa: boolean; leida: boolean; z: number; img?: string }> =
({ b, activa, leida, z, img }) => {
  const color = b.categoria ? colorDeSeccion(b.categoria) : GRAFITO;
  const entre = (a: number, c: number) => interpolate(z, [0, 1], [a, c]);
  return (
    <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative" }}>
      <div style={{ width: CAJA, height: CAJA_ALTO, position: "relative", overflow: "hidden",
        transform: `scale(${K})`, transformOrigin: "top left",
        backgroundColor: color,
        // Lo ya leído se APAGA, no se borra. En el taller eran seis baldosas
        // y el gris fuerte funcionaba; en un informe real son dieciséis, y con
        // once leídas la fila entera quedaba negra y no se veía nada.
        filter: leida ? "grayscale(0.55) brightness(0.8)" : "none",
        opacity: leida ? 0.5 : activa ? 1 : 0.8,
        outline: activa ? `${entre(3, 0)}px solid ${COBRE}` : "none", outlineOffset: -2 }}>

        {img ? <Img src={staticFile(`secciones/${img}`)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : null}

        {/* el pictograma se apaga al entrar: chica, la baldosa lo necesita
            para decir de qué sección es; grande, eso ya lo dice el texto y
            sobre una imagen a pantalla completa tapa lo que hay que ver */}
        {/* Sin pictograma cuando el bloque no tiene sección: Apertura, En
            titulares, Agenda y Cierre son estructura, no tema. Picto cae a
            "regiones" si no reconoce el nombre, y un pin de mapa sobre el
            cierre del video diría una cosa falsa. */}
        {b.categoria ? (
          <div style={{ position: "absolute", right: entre(-22, -60), top: entre(-16, 10),
            width: entre(166, 300), height: entre(166, 300),
            opacity: interpolate(z, [0, 0.55], [0.9, 0.14], { extrapolateRight: "clamp" }) }}>
            <Picto nombre={b.categoria} color="rgba(255,255,255,0.9)" />
          </div>
        ) : null}

        {/* El velo existe para poder leer texto blanco sobre una FOTO. Sobre
            color plano no hace falta y además mata la baldosa: con 0,86 de
            negro encima, una fila de colores de sección se ve toda negra. Por
            eso el velo es fuerte solo donde hay imagen. */}
        <AbsoluteFill style={{ background: img
          ? `linear-gradient(60deg, rgba(23,25,28,${entre(0.86, 0.9)}) ${entre(26, 34)}%, rgba(23,25,28,0.08) 82%)`
          : `linear-gradient(60deg, rgba(23,25,28,${entre(0.42, 0.55)}) ${entre(20, 28)}%, rgba(23,25,28,0) 78%)` }} />

        <div style={{ position: "absolute", left: entre(24, 30), top: entre(20, 26), fontFamily: tema.mono,
          fontSize: entre(9, 10), letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(242,242,239,0.75)", opacity: z }}>Entender Chile</div>

        <div style={{ position: "absolute", left: entre(24, 30), bottom: entre(22, 40), width: entre(300, 380) }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(22, 34), lineHeight: 1.06, color: "#F7F6F2" }}>
            {b.texto}
          </div>
        </div>
      </div>
    </div>
  );
};

// La transición. Dura exactamente lo que se le pasa (el silencio real de la
// narración), así que nunca pisa voz: el viaje se comprime o se estira, pero
// la trayectoria es siempre la misma forma.
export const TransicionMosaico: React.FC<{
  baldosas: Baldosa[]; indice: number; dur: number; conImagen?: string[]; fecha?: string;
}> = ({ baldosas, indice, dur, conImagen = [], fecha }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = Math.max(1, Math.round(dur * fps));

  // LA FILA VA EN EL ORDEN DEL GUION. En el taller se barajaba, pero ahí eran
  // seis baldosas y tres paradas. En un informe real son dieciséis, y barajar
  // deja a dos secciones consecutivas en extremos opuestos del tablero: la
  // cámara cruza quince baldosas en medio segundo y el viaje se ve como un
  // borrón. En orden, cada transición avanza UNA baldosa y se entiende.
  //
  // La variación diaria que pedía Santiago no se pierde: se siembra con la
  // fecha la profundidad del alejamiento y una deriva lateral, así dos días
  // no se mueven igual y dos renders del mismo día sí.
  const { afuera, deriva } = React.useMemo(() => {
    const r = mulberry(semillaDeFecha(fecha));
    return { afuera: AFUERA + r() * 0.1, deriva: (r() - 0.5) * 70 };
  }, [fecha]);

  const paso = ANCHO + HUECO;
  const centro = (baldosas.length - 1) / 2;
  const posDe = (i: number) => (i - centro) * paso;

  const desde = Math.max(0, indice - 1);
  const suavizar = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  // tres puntos: salgo de la anterior, paso por el medio lejos, entro en la
  // nueva. Una sola interpolación de principio a fin.
  const z = interpolate(f, [0, total * 0.42, total], [1, afuera, 1], suavizar);
  const x = interpolate(f, [0, total * 0.42, total],
    [posDe(desde), (posDe(desde) + posDe(indice)) / 2 + deriva, posDe(indice)], suavizar);
  const zDe = (i: number) => (i === indice ? interpolate(f, [total * 0.42, total], [0, 1], suavizar)
    : i === desde && indice !== desde ? interpolate(f, [0, total * 0.42], [1, 0], suavizar) : 0);

  const imgDe = (b: Baldosa) => conImagen.find((n) => n.startsWith(`${b.categoria}.`));

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: HUECO,
          transform: `scale(${1 + (ESCALA - 1) * z}) translateX(${-x}px)`, transformOrigin: "center center" }}>
          {baldosas.map((b, i) => (
            <Cara key={i} b={b} activa={i === indice} leida={i < indice}
              z={zDe(i)} img={imgDe(b)} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
