import { defineConfig } from "astro/config";

// WEB_SITE / WEB_BASE los fija el workflow: la copia de GitHub Pages va en
// subruta; la casa del sitio desde el 01-11-2026 es entender.sinodev.cl
// (Cloudflare Pages), con base "/", que es también lo que vale por defecto.
export default defineConfig({
  site: process.env.WEB_SITE || "https://entender.sinodev.cl",
  base: process.env.WEB_BASE || "/",
  trailingSlash: "always",
  build: { format: "directory" },
});
