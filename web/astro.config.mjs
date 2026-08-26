import { defineConfig } from "astro/config";

// WEB_SITE / WEB_BASE los fija el workflow (GitHub Pages en subruta);
// en local y con dominio propio, base = "/".
export default defineConfig({
  site: process.env.WEB_SITE || "https://sinostrozadev.github.io",
  base: process.env.WEB_BASE || "/",
  trailingSlash: "always",
  build: { format: "directory" },
});
