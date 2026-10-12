// Arma el pedido de paneles del mural a GPT, desde el guion y desde los prompts
// de imagen que el propio GPT escribió para cada sección.
//
// Por qué existe: el 07-10-2026 Santiago dijo que si cambia el número de
// secciones "se pide ajustar los prompts y pedir todo de nuevo, no hay
// problema". Eso deja de ser un problema SOLO si armar el pedido es automático.
// Escrito a mano son catorce motivos copiados uno por uno, la cadena de
// superficies, las tres reglas y el corte en tandas, y cada vez que cambia una
// sección hay que rehacerlo entero.
//
// Lo mecánico lo hace esto. Lo editorial, que es la CADENA DE SUPERFICIES, se
// propone por defecto siguiendo el arco de una Clave (de lo frío e
// institucional a lo cálido e histórico, y terminar sereno) y se puede pisar
// con --cadena.
//
// uso: node scripts/mural-pedido.js --guion <guion.md> --imagenes <imagenes.md>
//        [--tanda 1|2] [--entrega "#RRGGBB arriba, #RRGGBB medio, #RRGGBB abajo"]

const fs = require("fs");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };

const guion = fs.readFileSync(arg("guion"), "utf8");
const imagenes = fs.readFileSync(arg("imagenes"), "utf8");
const TANDA = Number(arg("tanda", 1));
const ENTREGA = arg("entrega", "");
const TOPE = Number(arg("tope", 10));   // GPT entrega como máximo 10 por solicitud

// las secciones, en orden, desde el guion: son la verdad del número de paneles
const secciones = (guion.split(/^Fuentes:\s*$/m)[0].match(/^##\s+(.+)$/gm) || [])
  .map((l) => l.replace(/^##\s+/, "").trim());

// el motivo de cada una, desde los prompts que escribió GPT. Se saltan las
// carátulas, que no son paneles.
const motivos = {};
imagenes.split(/^## /m).forEach((b) => {
  const m = b.match(/^(\d+)\.\s*(.+?)\n([\s\S]*)$/);
  if (m) motivos[Number(m[1])] = { nom: m[2].trim(), txt: m[3].trim().split("\n")[0] };
});

// La cadena de superficies: con qué termina cada panel y con qué empieza el
// siguiente. Es lo ÚNICO que hace que paneles hechos por separado encajen, y
// por eso es lo primero que va en el pedido.
const CADENA = arg("cadena", "") || [
  "mesón de oficina pública en azul petróleo",
  "el mismo mesón, virando a piedra gris",
  "piedra gris pasando a papel envejecido",
  "papel envejecido sobre madera oscura",
  "madera oscura de escritorio clínico",
  "madera que se enfría hacia metal cepillado",
  "metal cepillado de archivador",
  "metal que oscurece a pizarra",
  "pizarra con reflejo de pantalla",
  "pizarra virando a cuero de carpeta",
  "cuero que se aclara hacia lino",
  "lino sobre mármol frío",
  "mármol que se entibia a madera clara",
  "madera clara en luz de tarde",
].slice(0, secciones.length).join(" → ");

const desde = TANDA === 1 ? 1 : TOPE + 1;
const hasta = TANDA === 1 ? Math.min(TOPE, secciones.length) : secciones.length;

const lineas = [];
lineas.push(`Necesito ${hasta - desde + 1} imágenes que son TROZOS DE UN MISMO MURAL continuo, no imágenes sueltas.`);
lineas.push("");
lineas.push(`Cada panel: 2520 x 1080 píxeles, relación 2,33 a 1. Son los paneles ${desde} al ${hasta} de ${secciones.length}.`);
lineas.push("");
lineas.push("CUATRO REGLAS QUE NO SE NEGOCIAN:");
lineas.push("");
lineas.push(`1. LA NUMERACIÓN. El panel N es la sección N, siempre y en ese orden. Si vienen`);
lineas.push(`   desordenados o dos secciones comparten panel, el mural no se puede armar.`);
lineas.push("");
lineas.push("2. EL MOTIVO VA EN LA MITAD DERECHA. La mitad izquierda de cada panel es");
lineas.push("   superficie limpia, sin un objeto ni un borde: ahí va el texto del video.");
lineas.push("   Nada del motivo antes del 55% del ancho.");
lineas.push("");
lineas.push("3. LAS FRANJAS DE ENTREGA. Los primeros 300 píxeles y los últimos 300 de cada");
lineas.push("   panel son superficie limpia y PAREJA, sin objeto ni borde. Ahí se funden los");
lineas.push("   paneles entre sí, así que lo que termina un panel tiene que ser exactamente");
lineas.push("   lo que empieza el siguiente.");
lineas.push("");
// El panel 6 del mural de licencias (07-10-2026) volvió como una foto de
// oficina a plena luz, mucho más clara que los trece restantes. Sobre un panel
// así el velo que hace legible el texto tiene que apretar tanto que termina en
// un filo vertical visible, y el plano se lee como una lámina pegada encima en
// vez de un tramo del mismo mural. La cadena de superficies cuidaba el color
// del empalme pero nunca dijo nada del brillo.
lineas.push("4. LA LUZ ES LA MISMA EN LOS CATORCE. Escena nocturna o de interior en");
lineas.push("   penumbra, fondo oscuro, UNA fuente de luz cálida y baja que roza el motivo.");
lineas.push("   Ningún panel con cielo, ventana a plena luz, oficina iluminada ni fondo");
lineas.push("   claro: sobre un panel claro el texto deja de leerse y el plano se ve pegado");
lineas.push("   encima en vez de ser un tramo del mismo mural.");
lineas.push("");
lineas.push("LA CADENA DE SUPERFICIES, que es lo que hace que encajen:");
lineas.push("");
lineas.push("   " + CADENA);
lineas.push("");
if (TANDA === 2) {
  lineas.push("IMPORTANTE, porque esta es la segunda tanda: el panel " + desde + " tiene que");
  lineas.push("empezar EXACTAMENTE con la superficie y el color con que terminó el panel " + (desde - 1) + ".");
  lineas.push(ENTREGA
    ? "   Ese color, medido en el archivo: " + ENTREGA
    : "   (falta medir la franja de entrega del panel " + (desde - 1) + " y pegar acá sus colores)");
  lineas.push("");
}
lineas.push("LOS MOTIVOS, uno por panel:");
lineas.push("");
for (let i = desde; i <= hasta; i++) {
  const m = motivos[i];
  lineas.push(`Panel ${i} · ${secciones[i - 1] || (m && m.nom) || "sin nombre"}`);
  lineas.push("   " + (m ? m.txt : "(falta el prompt de imagen de esta sección)"));
  lineas.push("");
}
lineas.push("Sin texto, sin números, sin logos y sin rostros identificables en ninguno.");

console.log(lineas.join("\n"));
console.error("");
console.error("--- " + secciones.length + " secciones, paneles " + desde + " al " + hasta +
  (secciones.length > TOPE ? " (hacen falta " + Math.ceil(secciones.length / TOPE) + " tandas)" : "") + " ---");
