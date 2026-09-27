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

// LA BANDA DE PÍXELES (24-09, idea de Santiago: "degradado a pixelado oscuro
// hacia la izquierda"). A pantalla completa la imagen se rompe en bloques que
// se apagan hacia la izquierda, hasta el negro donde va el texto.
//
// Está dibujada como una grilla de recortes de la propia imagen, no con
// image-rendering: pixelated, que en el Chromium del render no produce nada
// visible. Cada bloque muestra su pedazo de la foto ampliado tres veces, así
// que tiende a un tono plano, y los bordes entre bloques son duros.
//
// No es el corte con difuminado que Santiago descartó el 24-09: ahí había un
// borde recto al 42% del ancho. Acá el paso es una banda que se deshace.
const COLS = 20, FILAS = 11;
const BandaPixel: React.FC<{ img: string; z: number; dir: string }> = ({ img, z, dir }) => {
  const url = staticFile(`${dir}/${img}`);
  const aparece = interpolate(z, [0.3, 0.85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bloques: React.ReactNode[] = [];
  for (let c = 0; c < COLS; c++) {
    // de 0 (izquierda, todo apagado) a 1 (derecha, imagen entera)
    const t = c / (COLS - 1);
    if (t < 0.24 || t > 0.72) continue;   // fuera de la banda no hay nada que dibujar
    const vive = interpolate(t, [0.24, 0.72], [0, 1]);
    for (let r = 0; r < FILAS; r++) {
      // el escalón sube fila a fila, así el borde de la banda no es una raya
      const ruido = ((c * 7 + r * 13) % 11) / 11;
      const op = Math.max(0, Math.min(1, (vive - ruido * 0.45) * 1.5)) * aparece;
      if (op <= 0.02) continue;
      bloques.push(
        <div key={`${c}-${r}`} style={{
          position: "absolute", left: `${(c / COLS) * 100}%`, top: `${(r / FILAS) * 100}%`,
          width: `${100 / COLS}%`, height: `${100 / FILAS}%`, opacity: op,
          backgroundImage: `url(${url})`,
          backgroundSize: `${COLS * 300}% ${FILAS * 300}%`,
          backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (FILAS - 1)) * 100}%`,
        }} />
      );
    }
  }
  return <AbsoluteFill style={{ overflow: "hidden" }}>{bloques}</AbsoluteFill>;
};

const Cara: React.FC<{ b: Baldosa; activa: boolean; leida: boolean; z: number; img?: string; dir?: string }> =
({ b, activa, leida, z, img, dir = "secciones" }) => {
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

        {img ? <Img src={staticFile(`${dir}/${img}`)}
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

        {/* DOS COLUMNAS CON PIXELADO (24-09, idea de Santiago). A pantalla
            completa la imagen se queda en la derecha y hacia la izquierda se
            va rompiendo en bloques que se oscurecen, hasta el negro donde va
            el texto. No es el corte duro con difuminado que Santiago descartó
            el 24-09: ahí había un borde al 42% del ancho; acá el paso es una
            banda de píxeles que crece.

            El pixelado es una copia de la misma imagen dibujada a 1/22 de su
            tamaño y ampliada con image-rendering: pixelated, recortada con
            una máscara para que solo aparezca en la banda del medio.

            Todo esto nace con el zoom: en la baldosa chica la banda no existe
            (no hay espacio y no hay texto que proteger), y aparece al entrar. */}
        {img && z > 0.3 ? <BandaPixel img={img} z={z} dir={dir} /> : null}

        {/* El velo. Sobre una FOTO tiene que ser fuerte para leer texto blanco;
            sobre color plano no hace falta y además mata la baldosa (con 0,86
            de negro encima, una fila de colores se ve toda negra). A pantalla
            completa el velo se endereza: deja de ser diagonal y se convierte
            en la columna oscura de la izquierda. */}
        <AbsoluteFill style={{ background: img
          ? `linear-gradient(${entre(60, 90)}deg, rgba(23,25,28,${entre(0.86, 1)}) ${entre(26, 36)}%, rgba(23,25,28,${entre(0.08, 0)}) ${entre(82, 66)}%)`
          : `linear-gradient(${entre(60, 90)}deg, rgba(23,25,28,${entre(0.42, 0.72)}) ${entre(20, 44)}%, rgba(23,25,28,0) ${entre(78, 70)}%)` }} />

        <div style={{ position: "absolute", left: entre(24, 30), top: entre(20, 26), fontFamily: tema.mono,
          fontSize: entre(9, 10), letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(242,242,239,0.75)", opacity: z }}>Entender Chile</div>

        {/* el título vive en la columna oscura: a pantalla completa se
            angosta en vez de crecer, si no se cruza sobre la imagen y se
            vuelve ilegible justo donde la foto tiene más detalle */}
        <div style={{ position: "absolute", left: entre(24, 30), bottom: entre(22, 46), width: entre(300, 200) }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: entre(22, 28), lineHeight: 1.08, color: "#F7F6F2" }}>
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
  salidaSeg?: number;
  // carpeta de public/ con las imágenes de sección; el video de prueba manda
  // "secciones-prueba" y producción no manda nada (ver scripts/prueba-video.js)
  dir?: string;
}> = ({ baldosas, indice, dur, conImagen = [], fecha, salidaSeg = 0.7, dir = "secciones" }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = Math.max(1, Math.round(dur * fps));
  // SALIDA SUAVE. La tarjeta vive sobre papel claro y el mosaico es oscuro:
  // cortar de uno al otro es un golpe de negro a blanco, que fue lo primero
  // que saltó al verlo en el informe real. Los últimos cuadros el mosaico se
  // desvanece y deja aparecer la tarjeta que ya está debajo.
  const salida = Math.max(1, Math.round(salidaSeg * fps));
  const opSalida = interpolate(f, [total - salida, total], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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

  // La ENTRADA del video (el primer bloque) no viene de ninguna baldosa: no
  // hay bloque anterior del que alejarse. Ahí el viaje es solo hacia adentro:
  // empieza mirando la fila y entra en la primera. Sin esto, la portada
  // cortaba directo a la tarjeta blanca, que era el peor corte del informe.
  const entrada = indice === 0;
  const desde = Math.max(0, indice - 1);
  const suavizar = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  // tres puntos: salgo de la anterior, paso por el medio lejos, entro en la
  // nueva. Una sola interpolación de principio a fin.
  // El viaje termina al 72% y el 28% restante la baldosa se queda QUIETA a
  // pantalla completa antes de desvanecerse. Sin esa espera, la cámara
  // llegaba justo cuando empezaba el fundido y nunca se veía instalada, que
  // es lo que pide la regla 8: en pantalla completa nada se mueve.
  const LLEGA = 0.72;
  const z = entrada
    ? interpolate(f, [0, total * LLEGA, total], [afuera, 1, 1], suavizar)
    : interpolate(f, [0, total * 0.34, total * LLEGA, total], [1, afuera, 1, 1], suavizar);
  const x = entrada
    ? interpolate(f, [0, total * LLEGA, total], [posDe(indice) + deriva, posDe(indice), posDe(indice)], suavizar)
    : interpolate(f, [0, total * 0.34, total * LLEGA, total],
        [posDe(desde), (posDe(desde) + posDe(indice)) / 2 + deriva, posDe(indice), posDe(indice)], suavizar);
  const zDe = (i: number) => (i === indice
    ? interpolate(f, [entrada ? 0 : total * 0.34, total * LLEGA], [0, 1], suavizar)
    : i === desde && !entrada ? interpolate(f, [0, total * 0.34], [1, 0], suavizar) : 0);

  const imgDe = (b: Baldosa) => conImagen.find((n) => n.startsWith(`${b.categoria}.`));

  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A", opacity: opSalida }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: HUECO,
          transform: `scale(${1 + (ESCALA - 1) * z}) translateX(${-x}px)`, transformOrigin: "center center" }}>
          {baldosas.map((b, i) => (
            <Cara key={i} b={b} activa={i === indice} leida={i < indice}
              z={zDe(i)} img={imgDe(b)} dir={dir} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
