import React from "react";
import { Composition } from "remotion";
import { InformeVideo, Timeline } from "./Informe";
import timelineEjemplo from "../ejemplos/timeline.ejemplo.json";
// La MUESTRA del formato de la Clave (06-10-2026, composición ClaveMuestra) se
// retiró el 01-11-2026 a archivo/src/clave-muestra.tsx: sirvió para mirar las
// imágenes de sección en movimiento antes de encargar las catorce, y el mural
// la dejó sin uso.
// EL MURAL (06-10-2026): la Clave sin un solo corte. Ver src/clave-mural.tsx.
import { ClaveMural, GuionMural } from "./clave-mural";
import claveMural from "../ejemplos/clave-mural.json";
// EL PANEL REAL de GPT (07-10-2026), para ver si el mural funciona de verdad.
import clavePanel from "../ejemplos/clave-panel.json";
// LA CLAVE ENTERA (07-10-2026): catorce paneles, catorce secciones, un mural
// de 27.580 px partido en tres. Esta es la de producción; las de arriba son
// las pruebas que llevaron hasta acá y se pueden borrar.
import claveMural14 from "../ejemplos/clave-mural14.json";
// ENTENDER EL CASO (02-11-2026): el largo por tema sobre la página real del
// diario. Ver src/largo-diario.tsx.
import { LargoDiario, GuionDiario } from "./largo-diario";
import largoDiarioPrueba from "../ejemplos/largo-diario-prueba.json";

export const Root: React.FC = () => {
  return (
    <>
    {/* LA CLAVE DE PRODUCCIÓN (12-10-2026): la que rinde scripts/dia.js --clave
        cuando la Clave tiene mural. Las props salen siempre de out/FECHA/
        clave-mural.json, armado por scripts/clave-mural.js con la voz real; el
        defaultProps es solo para que el estudio abra algo. */}
    <Composition
      id="ClaveMuralProduccion"
      component={ClaveMural}
      defaultProps={claveMural14 as GuionMural}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: (props as GuionMural).bloques.reduce((a, b) => a + Math.round(b.seg * 24), 0),
      })}
    />
    {/* EL LARGO SOBRE EL DIARIO (02-11-2026): lo rinde scripts/dia.js --clave
        cuando el guion trae marcas DIARIO, y scripts/largo-diario.js a mano.
        Las props salen siempre del json que arma el script; el defaultProps es
        el guion de prueba, y para que el estudio lo muestre con sus páginas
        hay que correr antes el script (las capturas de public/diario/ no
        viajan al repo). */}
    <Composition
      id="LargoDiario"
      component={LargoDiario}
      defaultProps={largoDiarioPrueba as GuionDiario}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: (props as GuionDiario).bloques.reduce((a, b) => a + Math.round(b.seg * 24), 0),
      })}
    />
    <Composition
      id="ClaveMural14"
      component={ClaveMural}
      defaultProps={claveMural14 as GuionMural}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.ceil((props as GuionMural).bloques.reduce((a, b) => a + b.seg, 0) * 24),
      })}
    />
    <Composition
      id="ClavePanel"
      component={ClaveMural}
      defaultProps={clavePanel as GuionMural}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.ceil((props as GuionMural).bloques.reduce((a, b) => a + b.seg, 0) * 24),
      })}
    />
    <Composition
      id="ClaveMural"
      component={ClaveMural}
      defaultProps={claveMural as GuionMural}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.ceil((props as GuionMural).bloques.reduce((a, b) => a + b.seg, 0) * 24),
      })}
    />
    <Composition
      id="Informe"
      component={InformeVideo}
      defaultProps={timelineEjemplo as unknown as Timeline}
      calculateMetadata={({ props }) => {
        const m = (props as Timeline).meta;
        const fps = m?.fps ?? 24;
        return {
          fps,
          width: m?.width ?? 1920,
          height: m?.height ?? 1080,
          durationInFrames: Math.max(60, Math.ceil((m?.duracionSeg ?? 10) * fps)),
        };
      }}
    />
    </>
  );
};
