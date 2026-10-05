// TEXTO LEGIBLE SOBRE CUALQUIER FONDO (05-10-2026, pedido de Santiago: "el
// texto que se ponga en pantalla, que quede siempre preparado para cualquier
// fondo, agrega un borde o inventa algo, para ambos casos").
//
// QUÉ SE PAGÓ PARA LLEGAR ACÁ. El 05-10 la pantalla de entrada cambió de un
// fondo claro a uno azul noche, y el texto iba escrito en tinta dentro del
// componente: quedó invisible. Hubo que invertir cuatro colores a mano y
// acordarse de los cuatro. Al día siguiente el fondo volvió a ser claro y
// hubo que invertirlos de vuelta. Un fondo nuevo no puede costar una ronda de
// colores a mano cada vez.
//
// LAS DOS CAPAS, y por qué hacen falta las dos:
//
// 1. EL TONO. El fondo declara si es claro u oscuro y de ahí sale la paleta
//    entera del texto. Esto resuelve el caso normal y no adivina nada: el dato
//    viaja con la imagen, en contenido/config/entrada.json.
//
// 2. EL RESPALDO. El tono solo no basta, porque una imagen clara puede tener
//    una zona oscura justo donde cae el texto, y al revés. El 05-10 pasó con
//    la azul: el texto blanco se leía en todas partes menos sobre la banda
//    verde brillante, que es donde terminaba la primera línea. Así que detrás
//    del texto va un velo del color del fondo, fuerte donde empieza el texto y
//    desvanecido hacia el otro lado. No se ve como una caja porque no tiene
//    borde ni esquina: es un degradado largo. Y como es del mismo color que el
//    fondo declara, sobre un fondo parejo no se nota, y sobre uno con manchas
//    es lo único que evita que una palabra se pierda.
//
// Un BORDE o un contorno sobre la letra sería la otra salida, y se descartó:
// a los tamaños de esta pantalla (42 px el párrafo, 132 la marca) un contorno
// se ve como un sticker y ensucia la serif. El velo no toca la letra.
import React from "react";
import { AbsoluteFill } from "remotion";
import { tema } from "./tema";

export type Tono = "claro" | "oscuro";

// La paleta completa del texto, por tono del FONDO (no del texto): sobre un
// fondo claro el texto es tinta, sobre uno oscuro es papel.
export const paletaDe = (tono: Tono) =>
  tono === "oscuro"
    ? {
        texto: tema.papel,
        suave: "rgba(242,242,239,0.72)",
        // el verde pátina de la casa (#2F7263) no se lee sobre oscuro: es el
        // mismo verde con luz, no otro color
        acento: "#6FC9AE",
        sombra: "0 2px 18px rgba(10,14,22,0.55)",
        velo: "16,20,28",
      }
    : {
        texto: tema.tinta,
        suave: tema.gris,
        acento: tema.patina,
        sombra: "0 1px 10px rgba(245,245,242,0.75)",
        velo: "242,242,239",
      };

/**
 * El velo detrás del texto. `lado` dice de qué borde arranca, que es el borde
 * donde vive el texto, y `hasta` hasta dónde llega ese texto, en fracción del
 * ancho del cuadro. `fuerza` es cuánto tapa donde empieza: 0 lo apaga.
 *
 * POR QUÉ `hasta` Y NO UN NÚMERO FIJO (medido el 05-10-2026). La primera
 * versión se desvanecía al 72% del ancho porque ahí se veía bien, y medido
 * resultó que no alcanzaba: el párrafo de apertura ocupa el 70% desde el
 * margen, así que su última palabra cae MÁS ALLÁ del 72% y quedaba sin velo
 * justo donde la imagen oscura tiene su banda más brillante. El contraste
 * mínimo bajo el párrafo era de 1,00 a 1, que es texto invisible. Ahora el
 * velo se entera de dónde termina el texto y se apaga después, no antes.
 */
export const Respaldo: React.FC<{
  tono: Tono;
  lado?: "izquierda" | "centro";
  hasta?: number;
  fuerza?: number;
}> = ({ tono, lado = "izquierda", hasta = 0.7, fuerza = 0.62 }) => {
  const { velo } = paletaDe(tono);
  // el velo se mantiene entero hasta donde llega el texto y recién ahí se va,
  // con una cola larga para que el borde no se vea
  const lleno = Math.round(Math.min(0.92, hasta) * 100);
  const cola = Math.round(Math.min(1, hasta + 0.22) * 100);
  const fondo =
    lado === "centro"
      ? `radial-gradient(ellipse ${lleno}% 62% at 50% 50%, rgba(${velo},${fuerza}) 0%, rgba(${velo},${fuerza * 0.62}) 52%, rgba(${velo},0) 100%)`
      : `linear-gradient(96deg, rgba(${velo},${fuerza}) 0%, rgba(${velo},${fuerza * 0.9}) ${Math.round(lleno * 0.62)}%, rgba(${velo},${fuerza * 0.62}) ${lleno}%, rgba(${velo},0) ${cola}%)`;
  return <AbsoluteFill style={{ background: fondo }} />;
};
