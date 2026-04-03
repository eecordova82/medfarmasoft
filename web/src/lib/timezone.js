/**
 * Convierte hora local del tenant a UTC ISO string.
 *
 * @param {number} year
 * @param {number} month  1-12
 * @param {number} day
 * @param {string} time   "HH:mm"
 * @param {string} tz     IANA timezone, e.g. "Europe/Madrid"
 * @returns {string}       ISO 8601 UTC string con Z
 */
export function localToUtcISO(year, month, day, time, tz) {
  const [hours, minutes] = time.split(':').map(Number);

  // Crear un Date UTC con la hora deseada como estimación
  const guessMs = Date.UTC(year, month - 1, day, hours, minutes, 0);

  // Ver qué hora muestra ese instante UTC en la timezone del tenant
  const inTz = dateParts(new Date(guessMs), tz);

  // offset = hora_en_tz - hora_utc (en ms)
  const tzMs = Date.UTC(inTz.year, inTz.month - 1, inTz.day, inTz.hour, inTz.minute, 0);
  const offsetMs = tzMs - guessMs;

  // UTC real = hora_local_deseada - offset
  const utcMs = guessMs - offsetMs;

  // Verificar (por cambio de horario)
  const check = dateParts(new Date(utcMs), tz);
  if (check.hour !== hours || check.minute !== minutes) {
    const checkMs = Date.UTC(check.year, check.month - 1, check.day, check.hour, check.minute, 0);
    const offsetMs2 = checkMs - utcMs;
    return new Date(guessMs - offsetMs2).toISOString();
  }

  return new Date(utcMs).toISOString();
}

function dateParts(date, tz) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(date);
  const get = (type) => parseInt(parts.find((p) => p.type === type).value, 10);
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') };
}
