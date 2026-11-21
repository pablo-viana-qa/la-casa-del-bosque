/**
 * Cloudflare Pages Function: GET /api/disponibilidad
 *
 * Lee el calendario de Booking.com en el servidor (la dirección del .ics queda privada,
 * en la variable de entorno BOOKING_ICAL_URL) y devuelve las noches ocupadas en JSON.
 * Se guarda 15 minutos en caché para no consultar Booking en cada visita.
 */
import { fetchAvailability } from '../../src/lib/ical';

type Context = { env: { BOOKING_ICAL_URL?: string } };

export const onRequestGet = async ({ env }: Context): Promise<Response> => {
  const data = await fetchAvailability(env.BOOKING_ICAL_URL);
  if (!data) {
    return new Response(JSON.stringify({ error: 'calendario no disponible' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=900',
    },
  });
};
