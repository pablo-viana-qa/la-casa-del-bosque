import type { APIRoute } from 'astro';

/* Mapa del sitio para Google. Usa el dominio de `site` en astro.config.mjs. */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost');
  const today = new Date().toISOString().slice(0, 10);
  const pages = ['/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(p, base).href}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
