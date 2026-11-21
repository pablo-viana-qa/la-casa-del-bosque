/**
 * Lee el calendario que exporta Booking.com (formato iCal / .ics) y devuelve las noches
 * ocupadas como fechas 'AAAA-MM-DD'.
 *
 * Cada reserva o bloqueo es un VEVENT con DTSTART (llegada) y DTEND (salida). Las noches
 * ocupadas van desde la llegada hasta el día anterior a la salida: el día de salida queda
 * libre para que otro huésped llegue.
 */

export type Availability = {
  /** noches ocupadas, ordenadas */
  busy: string[];
  /** momento en que se leyó el calendario (ISO) */
  updated: string;
};

const DAY = 86_400_000;

const toDate = (v: string): Date | null => {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(v.trim());
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
};

export const isoDay = (d: Date) => d.toISOString().slice(0, 10);

export function parseICal(text: string, opts: { from?: Date; days?: number } = {}): string[] {
  // Las líneas largas vienen "plegadas": salto de línea seguido de espacio o tab
  const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const from = opts.from ?? new Date();
  const start = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const end = start + (opts.days ?? 540) * DAY;

  const busy = new Set<string>();
  let inEvent = false;
  let dtStart: Date | null = null;
  let dtEnd: Date | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      dtStart = dtEnd = null;
    } else if (line === 'END:VEVENT') {
      if (inEvent && dtStart) {
        // sin DTEND, el evento ocupa una noche
        const last = dtEnd && dtEnd > dtStart ? dtEnd.getTime() : dtStart.getTime() + DAY;
        for (let t = Math.max(dtStart.getTime(), start); t < Math.min(last, end); t += DAY) {
          busy.add(isoDay(new Date(t)));
        }
      }
      inEvent = false;
    } else if (inEvent) {
      const sep = line.indexOf(':');
      if (sep < 0) continue;
      const key = line.slice(0, sep).split(';')[0].toUpperCase();
      if (key === 'DTSTART') dtStart = toDate(line.slice(sep + 1));
      else if (key === 'DTEND') dtEnd = toDate(line.slice(sep + 1));
    }
  }
  return [...busy].sort();
}

/** Descarga y lee el calendario. Devuelve null si no hay dirección o falla. */
export async function fetchAvailability(url: string | undefined): Promise<Availability | null> {
  if (!url || !/^https:\/\//.test(url)) return null;
  try {
    const res = await fetch(url, { headers: { accept: 'text/calendar' } });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text.includes('BEGIN:VCALENDAR')) return null;
    return { busy: parseICal(text), updated: new Date().toISOString() };
  } catch {
    return null;
  }
}
