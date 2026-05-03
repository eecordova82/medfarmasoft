import { Loader2 } from 'lucide-react';

export default function TimeSlotPicker({ slots, selectedSlot, onSlotSelect, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Cargando horarios...
      </div>
    );
  }

  if (!slots?.length) {
    return <p className="text-center text-gray-500 py-4">No hay horarios disponibles para esta fecha.</p>;
  }

  const disponibles = slots.filter((s) => s.disponible);
  if (!disponibles.length) {
    return <p className="text-center text-gray-500 py-4">Todos los horarios est\án ocupados.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Horarios disponibles</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.hora}
            disabled={!slot.disponible}
            onClick={() => onSlotSelect(slot.hora)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              !slot.disponible
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                : slot.hora === selectedSlot
                ? 'text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 hover:shadow-md'
            }`}
            style={
              slot.hora === selectedSlot
                ? { backgroundColor: 'var(--color-tenant-primary, #0E9488)' }
                : slot.disponible
                ? { borderColor: slot.hora === selectedSlot ? 'var(--color-tenant-primary)' : undefined }
                : {}
            }
          >
            {slot.hora}
          </button>
        ))}
      </div>
    </div>
  );
}
