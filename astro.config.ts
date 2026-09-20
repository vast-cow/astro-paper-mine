import { defineConfig } from "astro/config";
import upstreamConfig from "./astro.config.upstream";

// GitHub Pages supplies these authoritative values through configure-pages.
// The defaults preserve AstroPaper's normal local-development behavior.
export default defineConfig({
  ...upstreamConfig,
  site: process.env.ASTRO_SITE || upstreamConfig.site,
  base: process.env.ASTRO_BASE || "/",
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
