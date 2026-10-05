// LA ENTRADA DE MARCA (01-10-2026, dictada por Santiago).
//
// Reemplaza al sello suelto que había entre la noticia del día y la apertura.
// El sello aparecía, se desvanecía y la apertura entraba por su cuenta: dos
// cosas seguidas y sin relación. Acá es UN SOLO MOVIMIENTO, que es lo que pidió
// Santiago: "al finalizar el inicio se muestre nuestro espacio de informe
// diario, entender chile y la fecha con un fondo de texturas, y al pasar a la
// apertura se borre todo el texto dejando solo el entender chile, y ese texto
// se baje en diagonal a una esquina y aparezca el texto de apertura".
//
// Las tres fases:
//   portada   el rótulo, la marca y la fecha al centro, sobre la textura
//   el viaje  se apagan el rótulo y la fecha; la marca se achica y baja en
//             diagonal a la esquina; entra el párrafo de la apertura
//   apertura  la marca queda de firma en la esquina y el párrafo ocupa su 70%
//
// POR QUÉ A LA ESQUINA DE ABAJO A LA DERECHA y no a otra: el párrafo ocupa el
// 70% desde la izquierda, así que la única esquina que no le queda encima es
// una de la derecha. Y entre las dos de la derecha va la de abajo porque
// Santiago dijo que el texto "se baje", y porque arriba a la izquierda vive el
// banner de sección: dos rótulos a la misma altura compiten.
//
// EL FONDO: desde el 05-10-2026 es una IMAGEN, public/fondos/entrada.png, que
// entregó Santiago. Hasta entonces era la textura dibujada en código
// (src/fondos.tsx), pedida con un nombre que no mapea a ninguna lámina de
// sección para que cayera a la procedural. La imagen tiene la mitad izquierda
// despejada, que es justo donde viven la marca en la portada y el párrafo de
// apertura en su 70%, así que el texto no pelea con el dibujo.
//
// Si el archivo no estuviera, la pantalla NO se cae: vuelve sola a la textura
// de código. Un fondo que falta no puede frenar un informe, y este archivo es
// el único de la entrada que vive fuera del código.
//
// APAGADA POR DEFECTO: meta.entrada la enciende. Es un cambio en lo que se ve y
// lo que se ve lo elige Santiago (regla 19). Sin la bandera, el video monta el
// sello de siempre y no cambia un píxel.
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow } from "./tema";
import { Fondo } from "./fondos";
import { paletaDe, Respaldo, type Tono } from "./legible";
import pantallas from "../contenido/config/pantallas.json";

// EL FONDO Y SU TONO SALEN DE UN DATO, no de acá (05-10-2026). El mismo día la
// pantalla cambió de clara a oscura y de vuelta a clara, y cada vuelta costó
// invertir cuatro colores a mano. Ahora el fondo declara si es claro u oscuro y
// la paleta del texto se arma sola, con el velo que lo hace legible aunque la
// imagen tenga una mancha justo donde cae una palabra. El porqué completo está
// en src/legible.tsx.
const ELEGIDO = (() => {
  const p = pantallas.pantallas.entrada;
  const lista = (p.fondos || []) as Array<{ id: string; imagen: string; tono: Tono; fuerza?: number }>;
  return lista.find((f) => f.id === String(p.activo)) || lista[0];
})();
const FONDO_ENTRADA = ELEGIDO?.imagen || "fondos/entrada.png";
const TONO: Tono = ELEGIDO?.tono || "claro";
const FUERZA_VELO = typeof ELEGIDO?.fuerza === "number" ? ELEGIDO.fuerza : 0.62;
const PALETA = paletaDe(TONO);

// Lo mínimo que la portada se queda quieta antes de empezar a irse. La apertura
// a veces arranca su voz muy pegada al sello, y sin este piso la marca entraría
// y saldría en menos de un segundo, que se lee como un parpadeo y no como una
// portada.
const PORTADA_MIN_SEG = 1.6;
const ENTRA_SEG = 0.4;
const VIAJE_SEG = 0.95;
const SALIDA_SEG = 0.5;

// La marca de 132 px al centro queda en 34 px en la esquina: seis veces más
// chica. Menos que eso no se lee en un televisor; más, compite con el párrafo.
const MARCA_GRANDE = 132;
const MARCA_CHICA = 34;
// La mitad de la caja de la marca (su tamaño por su interlínea) y el aire que
// la separa del rótulo y de la fecha. Con estos dos el rótulo, la marca y la
// fecha se anclan al MISMO centro y no hay forma de que se pisen.
const MEDIA_MARCA = (MARCA_GRANDE * 1.05) / 2;
const SEPARA = 44;

// El 70% que pidió Santiago, medido sobre 1920. Da 1344, que es casi exacto el
// ancho de texto que ya usan todas las tarjetas (1340): el párrafo de la
// apertura mide lo mismo que los demás, solo que alineado a la izquierda en vez
// de centrado.
const ANCHO_APERTURA = 0.7;

const suave = { easing: Easing.inOut(Easing.ease), extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// El fondo, con su red de seguridad: si la imagen no carga (no está en
// public/, o el render no la encuentra), queda debajo la textura de código y la
// pantalla sigue viéndose como antes en vez de quedar en negro.
const FondoDeEntrada: React.FC = () => {
  const [falla, setFalla] = React.useState(false);
  if (falla) return <Fondo seccion="Entender Chile" fuerza={1.4} tono="tinta" />;
  return (
    <Img
      src={staticFile(FONDO_ENTRADA)}
      onError={() => setFalla(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export const EntradaDeMarca: React.FC<{
  fecha?: string;
  serie?: string;
  texto: string;
  /** segundos entre el inicio de esta secuencia y el primer sonido de la apertura */
  vozEn: number;
  /** lo que dura toda la entrada, de la portada al final de la apertura */
  durSeg: number;
}> = ({ fecha, serie, texto, vozEn, durSeg }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  // El viaje arranca cuando arranca la voz de la apertura, salvo que eso sea
  // demasiado pronto. Y nunca tan tarde que no quepa el viaje entero.
  const viajeEn = Math.min(Math.max(vozEn, PORTADA_MIN_SEG), Math.max(0, durSeg - VIAJE_SEG - SALIDA_SEG));
  const viaje = interpolate(t, [viajeEn, viajeEn + VIAJE_SEG], [0, 1], suave);
  const entrada = interpolate(t, [0, ENTRA_SEG], [0, 1], suave);
  const salida = interpolate(t, [durSeg - SALIDA_SEG, durSeg], [1, 0], suave);

  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = txt.charAt(0).toUpperCase() + txt.slice(1);
  }
  const rotulo = serie === "clave" ? "Claves para entender las noticias" : "El informe diario";

  // Lo que se borra: el rótulo y la fecha. Se van en la primera mitad del
  // viaje, para que la marca quede sola ANTES de empezar a bajar y se vea que
  // lo que viaja es ella.
  const acompanantes = interpolate(viaje, [0, 0.45], [1, 0], suave);

  // El recorrido de la marca: del centro a la esquina de abajo a la derecha.
  // En porcentajes y no en píxeles para que no dependa de la resolución.
  const marcaX = interpolate(viaje, [0, 1], [0.5, 1 - (tema.margen + 10) / width], suave);
  const marcaY = interpolate(viaje, [0, 1], [0.5, 1 - (tema.margen * 0.62) / height], suave);
  const marcaTam = interpolate(viaje, [0, 1], [MARCA_GRANDE, MARCA_CHICA], suave);
  // De qué punto suyo cuelga la marca: al centro va centrada sobre él (-50%) y
  // al llegar a la esquina se apoya por su borde derecho (-100%), que es lo que
  // la deja alineada con el margen y no colgando fuera del cuadro.
  const marcaAncla = interpolate(viaje, [0, 1], [-50, -100], suave);
  // la raya del canal se encoge con la marca y desaparece antes de llegar
  const rayaAncho = interpolate(viaje, [0, 0.6], [96, 0], suave);

  // El párrafo entra en la segunda mitad del viaje: la marca ya va saliendo del
  // centro cuando el texto aparece, así nunca se pisan.
  const textoOp = interpolate(viaje, [0.5, 1], [0, 1], suave);
  const textoSube = interpolate(viaje, [0.5, 1], [26, 0], suave);

  return (
    <AbsoluteFill style={{ backgroundColor: TONO === "oscuro" ? tema.tinta : tema.papel, opacity: Math.min(entrada, salida) }}>
      <FondoDeEntrada />
      {/* el velo va DESPUÉS de la imagen y ANTES del texto: en la portada
          arranca del centro, que es donde está la marca, y en la apertura del
          borde izquierdo, que es adonde se fue el texto */}
      <Respaldo tono={TONO} lado={viaje < 0.5 ? "centro" : "izquierda"} hasta={ANCHO_APERTURA} fuerza={FUERZA_VELO} />

      {/* el párrafo de la apertura, a la izquierda y en su 70% */}
      <div
        style={{
          position: "absolute",
          left: tema.margen,
          top: "50%",
          transform: `translateY(calc(-50% + ${textoSube.toFixed(1)}px))`,
          width: `${ANCHO_APERTURA * 100}%`,
          maxWidth: width * ANCHO_APERTURA,
          opacity: textoOp,
          fontFamily: tema.sans,
          fontSize: 42,
          lineHeight: 1.5,
          color: PALETA.texto,
          textShadow: PALETA.sombra,
        }}
      >
        {texto}
      </div>

      {/* EL RÓTULO Y LA FECHA. Van anclados al centro con un desplazamiento
          propio y NO dentro de un bloque centrado los tres juntos, que fue el
          primer intento y salió mal: la marca va suelta porque tiene que poder
          viajar, así que el bloque le dejaba un hueco calculado a mano y el
          hueco no caía donde caía la marca. El rótulo terminaba encima de la
          marca y la fecha la cruzaba por la mitad. Anclados al mismo centro que
          ella, los tres quedan donde tienen que quedar sin calcular nada. */}
      <AbsoluteFill style={{ opacity: acompanantes }}>
        <div style={{
          position: "absolute", left: 0, right: 0, textAlign: "center",
          top: `calc(50% - ${MEDIA_MARCA + SEPARA}px)`, transform: "translateY(-100%)",
        }}>
          <div style={{ ...estiloEyebrow, color: PALETA.acento }}>{rotulo}</div>
        </div>
        <div style={{
          position: "absolute", left: 0, right: 0, textAlign: "center",
          top: `calc(50% + ${MEDIA_MARCA + SEPARA}px)`,
        }}>
          <div style={{ width: rayaAncho, height: 4, backgroundColor: PALETA.acento, margin: "0 auto 34px" }} />
          {fechaLarga ? (
            <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: PALETA.suave }}>
              {fechaLarga}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>

      {/* LA MARCA. Va suelta y en posición absoluta, no dentro del bloque
          centrado, porque tiene que poder salirse de él: es la única que viaja. */}
      <div
        style={{
          position: "absolute",
          left: `${(marcaX * 100).toFixed(3)}%`,
          top: `${(marcaY * 100).toFixed(3)}%`,
          transform: `translate(${marcaAncla.toFixed(2)}%, -50%)`,
          transformOrigin: "center",
          whiteSpace: "nowrap",
          fontFamily: tema.serif,
          fontSize: marcaTam,
          fontWeight: 600,
          lineHeight: 1.05,
          color: PALETA.texto,
          textShadow: PALETA.sombra,
          opacity: interpolate(viaje, [0.6, 1], [1, 0.62], suave),
        }}
      >
        Entender Chile
      </div>
    </AbsoluteFill>
  );
};
