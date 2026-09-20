import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  // Astro's `site` is only the origin for Pages builds. BASE_URL also includes
  // the project Pages subdirectory, so the sitemap reference must include it.
  const basePath = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "");
  const sitemapURL = new URL(
    [basePath, "sitemap-index.xml"].filter(Boolean).join("/"),
    site
  );
  return new Response(getRobotsTxt(sitemapURL));
};
