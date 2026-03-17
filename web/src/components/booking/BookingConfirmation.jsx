import { CheckCircle, Calendar, MapPin, Download } from 'lucide-react';
import { downloadIcs } from '../../lib/icsGenerator';

export default function BookingConfirmation({ booking, tenant }) {
  const { profesional, servicio, fecha, hora } = booking;

  const handleDownloadIcs = () => {
    const [year, month, day] = fecha.split('-').map(Number);
    const [hours, minutes] = hora.split(':').map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);

    downloadIcs({
      title: `Cita: ${servicio.nombre}`,
      description: `Profesional: ${profesional.nombre}\nServicio: ${servicio.nombre}`,
      start,
      durationMinutes: servicio.duracionMinutos,
      location: tenant?.direccion || '',
    });
  };

  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
      >
        <CheckCircle className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Cita confirmada</h2>
      <p className="text-gray-500 mb-8">Tu reserva ha sido registrada correctamente.</p>

      <div className="bg-gray-50 rounded-xl p-6 text-left max-w-sm mx-auto space-y-3">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">{fecha}</p>
            <p className="text-sm text-gray-500">{hora} - {servicio.duracionMinutos} min</p>
          </div>
        </div>

        <div>
          <p className="font-medium text-gray-900">{profesional.nombre}</p>
          {profesional.especialidad && (
            <p className="text-sm text-gray-500">{profesional.especialidad}</p>
          )}
        </div>

        <div>
          <p className="font-medium text-gray-900">{servicio.nombre}</p>
          {servicio.precio != null && servicio.precio > 0 && (
            <p className="text-sm text-gray-500">{servicio.precio.toFixed(2)} €</p>
          )}
        </div>

        {servicio.precio != null && servicio.precio > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            <strong>Pendiente de abono: {servicio.precio.toFixed(2)} €</strong>
            <p className="mt-1">Este servicio deberá abonarse en el centro.</p>
            {servicio.requierePagoAnticipado && (
              <p className="mt-1">El centro se pondrá en contacto contigo para gestionar el pago antes de la cita.</p>
            )}
          </div>
        )}

        {tenant?.direccion && (
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <p className="text-sm text-gray-600">{tenant.direccion}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleDownloadIcs}
        className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
      >
        <Download className="w-4 h-4" /> Añadir al calendario
      </button>

      {tenant?.urlWeb && (tenant?.plan === 'professional' || tenant?.plan === 'enterprise') && (
        <div className="mt-4">
          <a
            href={tenant.urlWeb}
            className="text-sm hover:underline"
            style={{ color: 'var(--color-tenant-primary, #11756A)' }}
          >
            Volver a {tenant.nombre}
          </a>
        </div>
      )}
    </div>
  );
}
