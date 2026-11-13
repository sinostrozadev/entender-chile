import React from 'react';
import { PALETA } from './tokens';

/**
 * Isotipo de Entender Chile (13-11-2026): cuadro azul marino con una franja vertical cobre que sugiere el país y un punto
 * que "se lee" (la noticia ubicada en el mapa). Legible a 40 px. `avance` (0 a 1) dibuja la franja (cierre de marca).
 */
export const Logo: React.FC<{ tamano: number; avance?: number }> = ({ tamano, avance = 1 }) => {
  const a = Math.max(0, Math.min(1, avance));
  return (
    <svg viewBox="0 0 100 100" width={tamano} height={tamano} style={{ display: 'block' }}>
      <rect x="0" y="0" width="100" height="100" rx="22" fill={PALETA.fondo} stroke="#2E4566" strokeWidth="2" />
      <path d="M50 14 C46 30 54 44 48 58 C44 70 52 78 50 88" fill="none" stroke={PALETA.dorado} strokeWidth="9" strokeLinecap="round"
        pathLength={1} strokeDasharray={`${a} 1`} />
      <circle cx="66" cy="40" r={9 * Math.min(1, Math.max(0, (a - 0.8) / 0.2))} fill={PALETA.rojo} />
    </svg>
  );
};
