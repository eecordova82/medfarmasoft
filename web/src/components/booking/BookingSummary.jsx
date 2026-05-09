import { User, Clock, CreditCard, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BookingSummary({ profesional, servicio, fecha, hora }) {
  const { t } = useTranslation();
  if (!profesional) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
      <h3 className="font-semibold text-gray-900 mb-4">{t('booking.summary.title')}</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-400" />
          <span>{profesional.nombre}</span>
        </div>

        {servicio && (
          <>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{servicio.nombre} - {servicio.duracionMinutos} {t('common.min')}</span>
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
