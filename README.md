# La Casa del Bosque

Sitio web de una casa de alquiler en Balneario Iporá, Tacuarembó, Uruguay.
Una sola página construida con [Astro](https://astro.build) y Tailwind CSS, centrada en las fotos reales de la casa.

## Qué incluye

- Portada a pantalla completa con la foto de la casa y la puntuación de Booking.com.
- Galería grande de la casa (avance automático, flechas, teclado, deslizar con el dedo) y lista de comodidades.
- Carrusel del entorno a pantalla completa y sección de ubicación con mapa de Google y botón "Cómo llegar".
- Opiniones de huéspedes.
- Formulario de consulta que arma el mensaje y abre WhatsApp con las fechas, huéspedes y mascotas.
- Calendario de disponibilidad sincronizado con Booking.com: muestra las noches ocupadas, permite elegir llegada y salida y no deja enviar fechas ya reservadas.
- Header fijo que se adapta al bajar, menú móvil propio y barra de reserva en el teléfono.
- SEO: título y descripción orientados a búsquedas de alquiler, datos estructurados `VacationRental`, Open Graph, `sitemap.xml` y `robots.txt`.

## Desarrollo

Requiere Node.js 22 o superior.

```sh
npm install
npm run dev      # servidor local en http://localhost:4321
npm run build    # verifica tipos y genera el sitio estático en dist/
npm run preview  # sirve la versión compilada
```

Antes de publicar, cambiá `site` en `astro.config.mjs` por el dominio real: se usa para la URL canónica, las imágenes al compartir, los datos estructurados, el sitemap y robots.txt.

## Calendario de Booking.com

1. En la Extranet de Booking: Tarifas y disponibilidad → Sincronizar calendarios → Exportar calendario, y copiá el enlace `.ics`.
2. Local: copiá `.env.example` como `.env` y pegá el enlace en `BOOKING_ICAL_URL`.
3. Publicado en Cloudflare Pages: cargá la misma variable en Settings → Environment variables. La función `functions/api/disponibilidad.ts` lee el calendario en el servidor (el enlace no queda visible) y lo guarda 15 minutos en caché.

Sin el enlace, el calendario no se muestra y el formulario funciona igual. Las reservas que entren por WhatsApp hay que bloquearlas a mano en Booking para que no se superpongan.

## Estructura

```
src/
  components/   Header, Hero, House (galería y comodidades), Location (entorno),
                Ubicacion (mapa), Reviews, Reserve (formulario y pie)
  data/site.ts  datos de la casa, contacto, fotos, comodidades, opiniones y mapa
  scripts/      carrusel compartido
  styles/       estilos globales y tokens de color
  pages/        index, sitemap.xml y robots.txt
```
