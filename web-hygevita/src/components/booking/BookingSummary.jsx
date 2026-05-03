import { User, Clock, CreditCard, Calendar } from 'lucide-react';

export default function BookingSummary({ profesional, servicio, fecha, hora }) {
  if (!profesional) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
      <h3 className="font-semibold text-gray-900 mb-4">Tu reserva</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-400" />
          <span>{profesional.nombre}</span>
        </div>

        {servicio && (
          <>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{servicio.nombre} - {servicio.duracionMinutos} min</span>
            </div>
            {servicio.precio != null && servicio.precio > 0 && (
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span>{servicio.precio.toFixed(2)} \€</span>
              </div>
            )}
          </>
        )}

        {fecha && hora && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{fecha} {hora}</span>
          </div>
        )}
      </div>
    </div>
  );
}
