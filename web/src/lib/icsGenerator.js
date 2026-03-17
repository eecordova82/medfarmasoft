/**
 * Genera y descarga un archivo .ics para añadir la cita al calendario del paciente.
 */
export function downloadIcs({ title, description, start, durationMinutes, location }) {
  const pad = (n) => String(n).padStart(2, '0');

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  const end = new Date(new Date(start).getTime() + durationMinutes * 60000);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MedFarmaSoft//Reservas//ES',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description || ''}`,
    `LOCATION:${location || ''}`,
    'STATUS:CONFIRMED',
    `UID:${crypto.randomUUID()}@medfarmasoft.es`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cita.ics';
  link.click();
  URL.revokeObjectURL(url);
}
