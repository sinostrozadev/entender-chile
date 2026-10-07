// Mezcla la narración con la música de una Clave y deja el video al nivel que
// YouTube espera.
//
// Por qué existe: el 07-10-2026 Santiago dijo "se escucha muy bajito todo" y
// tenía razón, pero el problema no era la música sino que FALTABA LA VOZ. Un
// video de narración se nivela contra la voz, no contra el fondo: sin voz, el
// archivo queda a mitad de volumen porque nada lo está empujando.
//
// Las dos cifras que manda esto, y las dos están medidas, no elegidas:
//
//   La música entre 15 y 20 dB POR DEBAJO de la voz. Es la referencia de
//   cualquier mezcla con narración. Medido sin tocar nada daba 20,1, o sea en
//   el borde flojo, y por eso la música sube 4 dB.
//
//   El conjunto a -14 LUFS con pico a -1,5. Es el objetivo de YouTube: si uno
//   entrega más fuerte, YouTube lo baja igual, y si entrega más bajo, queda
//   sonando flojo al lado de todos los demás.
//
// uso: node scripts/mezclar-voz.js video.mp4 voz.wav salida.mp4 [--musica 4]

const { execFileSync } = require("child_process");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const [video, voz, salida] = process.argv.slice(2, 5);
if (!video || !voz || !salida) { console.error("uso: node scripts/mezclar-voz.js video.mp4 voz.wav salida.mp4"); process.exit(1); }
const subeMusica = arg("musica", "4");

execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error",
  "-i", video, "-i", voz,
  "-filter_complex",
  `[0:a]volume=${subeMusica}dB[m];[1:a][m]amix=inputs=2:duration=first:normalize=0[mez];[mez]loudnorm=I=-14:TP=-1.5:LRA=11[a]`,
  "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
  "-y", salida], { stdio: "inherit" });
console.log(salida, "| música " + subeMusica + " dB arriba, conjunto a -14 LUFS");
