import React from "react";
import { Composition } from "remotion";
import { InformeVideo, Timeline } from "./Informe";
import timelineEjemplo from "../ejemplos/timeline.ejemplo.json";
// MUESTRA del formato de la Clave (06-10-2026): no es producción, es para
// poder MIRAR las imágenes de sección en movimiento antes de encargar las
// catorce. Se puede borrar sin romper nada.
import { ClaveMuestra, SeccionMuestra } from "./clave-muestra";
import claveMuestra from "../ejemplos/clave-muestra.json";
// EL MURAL (06-10-2026): la Clave sin un solo corte. Ver src/clave-mural.tsx.
import { ClaveMural, GuionMural } from "./clave-mural";
import claveMural from "../ejemplos/clave-mural.json";
// EL PANEL REAL de GPT (07-10-2026), para ver si el mural funciona de verdad.
import clavePanel from "../ejemplos/clave-panel.json";
// LA CLAVE ENTERA (07-10-2026): catorce paneles, catorce secciones, un mural
// de 27.580 px partido en tres. Esta es la de producción; las de arriba son
// las pruebas que llevaron hasta acá y se pueden borrar.
import claveMural14 from "../ejemplos/clave-mural14.json";

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
      id="ClaveMuestra"
      component={ClaveMuestra}
      defaultProps={claveMuestra as { secciones: SeccionMuestra[] }}
      fps={24}
      width={1920}
      height={1080}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.ceil(
          (props as { secciones: SeccionMuestra[] }).secciones.reduce((a, s) => a + s.seg, 0) * 24
        ),
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
