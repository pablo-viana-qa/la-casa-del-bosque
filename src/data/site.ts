import type { ImageMetadata } from 'astro';

import frente from '../assets/fotos/frente.jpg';
import livingEstufa from '../assets/fotos/living-estufa.jpg';
import livingCocina from '../assets/fotos/living-cocina.jpg';
import cuartoPrincipal from '../assets/fotos/cuarto-principal.jpg';
import cuartoDoble from '../assets/fotos/cuarto-doble.jpg';
import cuartoCamas from '../assets/fotos/cuarto-camas.jpg';
import banoVanitorio from '../assets/fotos/bano-vanitorio.jpg';
import banoDucha from '../assets/fotos/bano-ducha.jpg';
import jardinFlores from '../assets/fotos/jardin-flores.jpg';
import jardinSendero from '../assets/fotos/jardin-sendero.jpg';
import entornoLago from '../assets/fotos/entorno-lago.jpg';
import entornoAtardecer from '../assets/fotos/entorno-atardecer.jpg';
import entornoPinos from '../assets/fotos/entorno-pinos.jpg';

/* ------------------------------------------------------------------ */
/*  Datos generales — editá aquí el número de WhatsApp y los enlaces   */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'La Casa del Bosque',
  tagline: 'Casa de descanso en Balneario Iporá',
  /** Número en formato internacional, solo dígitos (598 + número sin el 0 inicial). */
  whatsapp: '59899850322',
  whatsappDisplay: '+598 99 850 322',
  host: 'Graciela',
  /** Se muestra sin número de puerta; el mapa usa mapsQuery. */
  address: 'De la Tijereta, Balneario Iporá',
  region: 'Tacuarembó, Uruguay',
  mapsQuery: 'De la Tijereta 9, Balneario Iporá, Tacuarembó, Uruguay',
  /** Coordenadas verificadas en el anuncio de Booking.com (De la Tijereta 9). */
  geo: { lat: -31.6698004, lng: -55.9570704 },
  booking: 'https://www.booking.com/hotel/uy/la-casa-del-bosque-balneario-ipora.es.html',
  checkIn: '15:00 a 20:00',
  checkOut: '8:00 a 11:00',
  rating: { score: '8,7', label: 'Fabuloso', count: 51 },
};

export const waLink = (text = `Hola, quisiera consultar por ${site.name}.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/*  Fotos (carpeta Photos)                                             */
/* ------------------------------------------------------------------ */

export type Photo = { src: ImageMetadata; alt: string };

export const photos = { frente };

/** Galería de la sección La casa, en orden de recorrido */
export const houseGallery: Photo[] = [
  { src: livingEstufa, alt: 'Living de doble altura con estufa a leña, escalera y salida al jardín' },
  { src: livingCocina, alt: 'Comedor con mesa de vidrio junto a la estufa y la cocina' },
  { src: cuartoPrincipal, alt: 'Dormitorio con cama doble, placard y aire acondicionado' },
  { src: cuartoDoble, alt: 'Dormitorio con cama doble y ventana a los árboles' },
  { src: cuartoCamas, alt: 'Dormitorio con dos camas individuales, escritorio y puerta al jardín' },
  { src: banoVanitorio, alt: 'Baño con vanitorio y techo inclinado' },
  { src: banoDucha, alt: 'Baño con ducha y mampara' },
  { src: jardinSendero, alt: 'Sendero entre el césped y los árboles hacia la casa' },
  { src: jardinFlores, alt: 'Canteros con flores y árboles en el jardín' },
  { src: frente, alt: 'Frente de la casa de ladrillo con techo a dos aguas, escalera y jardín' },
];

/** Carrusel del entorno */
export const surroundings: Photo[] = [
  { src: entornoPinos, alt: 'Pinos reflejados en el lago de Iporá' },
  { src: entornoLago, alt: 'El lago de Iporá entre colinas verdes, visto desde las rocas' },
  { src: entornoAtardecer, alt: 'El monte reflejado en el lago de Iporá al atardecer' },
];

/* ------------------------------------------------------------------ */
/*  Comodidades                                                        */
/* ------------------------------------------------------------------ */

export const amenityGroups: { title: string; items: { label: string; note?: string }[] }[] = [
  {
    title: 'Espacios',
    items: [
      { label: 'Cuatro dormitorios', note: 'dos abajo, dos arriba' },
      { label: 'Dos baños', note: 'uno en cada planta' },
      { label: 'Living amplio', note: 'con cocina definida' },
      { label: 'Dos jardines', note: 'al frente y atrás' },
    ],
  },
  {
    title: 'Confort',
    items: [
      { label: 'Estufa a leña', note: 'en el living' },
      { label: 'Aire acondicionado', note: 'en los dormitorios' },
      { label: 'Ventiladores de techo' },
      { label: 'Camas y colchones muy cómodos', note: 'confort 9,1' },
    ],
  },
  {
    title: 'Cocina y hogar',
    items: [
      { label: 'Cocina totalmente equipada' },
      { label: 'Lavarropas' },
      { label: 'TV de pantalla plana' },
      { label: 'Wifi gratis', note: 'puntuado 10/10' },
    ],
  },
  {
    title: 'Afuera',
    items: [
      { label: 'Balcón con vista al jardín' },
      { label: 'Estacionamiento privado gratis' },
      { label: 'Frente a una plaza con juegos' },
      { label: 'Mascotas bienvenidas', note: 'sin costo extra' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Entorno                                                            */
/* ------------------------------------------------------------------ */

export const distances = [
  { place: 'Lago de Iporá', dist: 'en el balneario' },
  { place: 'Restaurante del Parque', dist: '6 km' },
  { place: 'Centro de Tacuarembó · Plaza 19 de Abril', dist: '7 km' },
  { place: 'Estación de tren de Tacuarembó', dist: '8 km' },
  { place: 'Montevideo', dist: '390 km' },
];

/* ------------------------------------------------------------------ */
/*  Opiniones (huéspedes verificados en Booking.com)                    */
/* ------------------------------------------------------------------ */

export const scores = [
  { label: 'Ubicación', value: 9.5 },
  { label: 'Personal', value: 9.5 },
  { label: 'Limpieza', value: 9.4 },
  { label: 'Confort', value: 9.1 },
  { label: 'Instalaciones', value: 8.6 },
  { label: 'Calidad-precio', value: 8.5 },
];

export const reviews = [
  { name: 'Mariana', text: 'Hermosa casa, súper cómoda y completa. Muy buenos colchones, preciosa arquitectura, jardín súper disfrutable. Da ganas de volver.' },
  { name: 'Seba', text: 'La casa es hermosa. Muy grande. Tiene estufa a leña, aire acondicionado y lavarropas, lo cual no es común encontrar en todos los balnearios.' },
  { name: 'Camila', text: 'Ubicada en pleno balneario Iporá, hermoso lugar para desconectarse y descansar. Quien nos recibió, Graciela, fue muy amable.' },
  { name: 'Vivian', text: 'La casa es toda muy disfrutable. Las camas son muy cómodas, la ducha es un placer y los jardines lindísimos.' },
  { name: 'María', text: 'Muy bien ubicada, frente a una placita con juegos para niños. Aire acondicionado en las habitaciones, cocina muy cómoda.' },
];

/* ------------------------------------------------------------------ */
/*  Precios (tomados de la Extranet de Booking.com, tarifa Standard)   */
/*  Precio por noche para 8 personas, y US$20 menos por cada persona   */
/*  menos. Revisado el 21/11/2026; si cambian en Booking, actualizar.  */
/* ------------------------------------------------------------------ */

export const pricing = {
  currency: 'US$',
  base: 200, // por noche, para la ocupación estándar
  baseGuests: 8,
  perGuest: 20, // descuento por cada persona menos
  minGuests: 2,
};

/** Precio por noche según la cantidad de huéspedes (2 a 8). */
export const nightlyPrice = (guests: number) => {
  const g = Math.min(pricing.baseGuests, Math.max(pricing.minGuests, guests));
  return pricing.base - (pricing.baseGuests - g) * pricing.perGuest;
};

export const priceTable = Array.from({ length: pricing.baseGuests - pricing.minGuests + 1 }, (_, i) => {
  const guests = pricing.baseGuests - i;
  const night = nightlyPrice(guests);
  return { guests, night, perPerson: Math.round(night / guests) };
});

/* ------------------------------------------------------------------ */
/*  Normas                                                             */
/* ------------------------------------------------------------------ */

export const rules = [
  { title: 'Entrada', value: `${site.checkIn} h`, note: 'Avisanos con antelación a qué hora llegan.' },
  { title: 'Salida', value: `${site.checkOut} h`, note: 'La casa queda lista para el próximo huésped.' },
  { title: 'Mascotas', value: 'Bienvenidas', note: 'Sin cargo adicional.' },
  { title: 'Niños', value: 'Todas las edades', note: 'No hay cunas disponibles.' },
  { title: 'Fumar', value: 'No se permite', note: 'Dentro de la casa.' },
  { title: 'Fiestas', value: 'No se permiten', note: 'Ni eventos ni despedidas.' },
];

/* ------------------------------------------------------------------ */
/*  Mapa                                                               */
/* ------------------------------------------------------------------ */

const ll = `${site.geo.lat},${site.geo.lng}`;
export const maps = {
  embed: `https://maps.google.com/maps?q=${ll}&z=15&hl=es&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${ll}`,
};
