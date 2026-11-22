import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { photos, houseGallery, surroundings } from '../data/site';

/* Mapa del sitio para Google. Usa el dominio de `site` en astro.config.mjs.
   Incluye las fotos (con su descripción) para que puedan aparecer en Google Imágenes. */
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('http://localhost');
  const today = new Date().toISOString().slice(0, 10);
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const all = [{ src: photos.frente }, ...houseGallery, ...surroundings].filter(
    (p, i, list) => list.findIndex((q) => q.src === p.src) === i,
  );
  const images = await Promise.all(
    all.map(async (p) => new URL((await getImage({ src: p.src, width: 1200, format: 'jpg' })).src, base).href),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${new URL('/', base).href}</loc>
    <lastmod>${today}</lastmod>
${images.map((loc) => `    <image:image><image:loc>${esc(loc)}</image:loc></image:image>`).join('\n')}
  </url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
