import type { APIRoute } from 'astro';

/* Permite a los buscadores leer todo el sitio y les indica dónde está el mapa. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap.xml', site ?? 'http://localhost').href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
