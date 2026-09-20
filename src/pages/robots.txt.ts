import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const basePath = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "");
  const sitemapURL = new URL(
    [basePath, "sitemap-index.xml"].filter(Boolean).join("/"),
    site
  );
  return new Response(getRobotsTxt(sitemapURL));
};
