// PICTOGRAMAS DE SECCIÓN (23-09-2026, CARÁTULA 5). Un símbolo por sección,
// dibujado por código, de un solo trazo grueso y un solo color.
//
// Por qué existen: la regla 29 prohíbe fotos ajenas, y las diez láminas de
// public/fondos son texturas al 8% de tinta que a 168 px (el ancho real de
// una carátula en un teléfono) desaparecen. Prohibir fotos no nos dio
// imágenes, nos dejó sin ninguna. Si no podemos fotografiar, el sujeto de la
// carátula tiene que estar DIBUJADO, y dibujado por código cumple la regla y
// además admite variación diaria.
//
// Reglas del trazo: caja de 200x200, sin relleno, stroke de 9, puntas y
// uniones redondas. Nada de detalle fino: lo que no se lee en un cuadrado de
// 40 px no sirve.
import React from "react";

const P: React.FC<{ d: string; w?: number; o?: number }> = ({ d, w, o }) => (
  <path d={d} strokeWidth={w} opacity={o} />
);

const TRAZOS: Record<string, React.ReactNode> = {
  // nube con lluvia
  clima: (<>
    <P d="M56 104a30 30 0 0 1 4-59 44 44 0 0 1 83-9 33 33 0 0 1 9 65z" />
    <P d="M70 128l-12 30M104 128l-12 30M138 128l-12 30" />
    <P d="M86 166l-7 18M120 166l-7 18" w={7} o={0.6} />
  </>),
  // barras con flecha: el bolsillo
  economia: (<>
    <P d="M40 168V118M80 168V96M120 168v-72M160 168V64" w={14} />
    <P d="M36 44h44M80 44l-58 44" o={0} />
    <P d="M124 40h44v44" />
    <P d="M168 40l-58 58" />
  </>),
  // escudo
  seguridad: (<>
    <P d="M100 26l62 24v46c0 44-27 68-62 82-35-14-62-38-62-82V50z" />
    <P d="M74 100l18 18 36-38" />
  </>),
  // cruz con pulso
  salud: (<>
    <P d="M78 30h44v48h48v44h-48v48H78v-48H30V78h48z" />
  </>),
  // libro abierto
  educacion: (<>
    <P d="M100 58c-16-14-38-20-62-18v98c24-2 46 4 62 18 16-14 38-20 62-18V40c-24-2-46 4-62 18z" />
    <P d="M100 58v98" />
  </>),
  // cúpula y columnas
  congreso: (<>
    <P d="M100 24l70 40H30z" />
    <P d="M52 84v66M84 84v66M116 84v66M148 84v66" />
    <P d="M28 168h144" w={13} />
  </>),
  // monedas: la plata pública
  "plata-publica": (<>
    <P d="M40 62c0-13 27-24 60-24s60 11 60 24-27 24-60 24-60-11-60-24z" />
    <P d="M40 62v38c0 13 27 24 60 24s60-11 60-24V62" />
    <P d="M40 100v38c0 13 27 24 60 24s60-11 60-24v-38" />
  </>),
  // globo con meridianos
  internacional: (<>
    <P d="M100 24a76 76 0 1 0 0 152 76 76 0 0 0 0-152z" />
    <P d="M24 100h152" />
    <P d="M100 24c22 22 34 48 34 76s-12 54-34 76c-22-22-34-48-34-76s12-54 34-76z" />
  </>),
  // alfiler de mapa: "esto pasa en un lugar". La silueta de Chile no se lee
  // a 40 px, el alfiler sí (probado en la hoja de contactos del 23-09).
  regiones: (<>
    <P d="M100 22c-30 0-54 24-54 54 0 40 54 102 54 102s54-62 54-102c0-30-24-54-54-54z" />
    <P d="M100 58a20 20 0 1 0 0 40 20 20 0 0 0 0-40z" />
  </>),
  // lupa con destello: el dato curioso
  "dato-curioso": (<>
    <P d="M84 30a56 56 0 1 0 0 112 56 56 0 0 0 0-112z" />
    <P d="M126 126l46 46" w={14} />
    <P d="M84 62v26M84 106v4" w={11} />
  </>),
};

export const PICTOGRAMAS = Object.keys(TRAZOS);

export const Picto: React.FC<{ nombre?: string | null; color: string; giro?: number }> = ({ nombre, color, giro = 0 }) => {
  const trazo = (nombre && TRAZOS[nombre]) || TRAZOS.regiones;
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: `rotate(${giro}deg)` }}
      fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
      {trazo}
    </svg>
  );
};
