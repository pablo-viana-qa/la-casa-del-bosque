// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // IMPORTANTE: cambiar por el dominio real antes de publicar (o la dirección que dé el
  // servicio de hosting, ej. https://lacasadelbosque.netlify.app). Se usa para el
  // canonical, las imágenes al compartir, los datos estructurados, sitemap.xml y robots.txt.
  site: 'https://lacasadelbosque.uy',
  vite: { plugins: [tailwindcss()] },
});
