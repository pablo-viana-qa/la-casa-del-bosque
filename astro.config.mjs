// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Dirección pública del sitio: se usa para el canonical, las imágenes al compartir, los
  // datos estructurados, sitemap.xml y robots.txt. Por defecto, la dirección gratuita de
  // Cloudflare Pages; cuando haya dominio propio, cargar SITE_URL (ej. https://lacasadelbosque.uy)
  // en las variables de entorno del hosting, sin tocar el código.
  site: process.env.SITE_URL || 'https://la-casa-del-bosque.pages.dev',
  vite: { plugins: [tailwindcss()] },
});
