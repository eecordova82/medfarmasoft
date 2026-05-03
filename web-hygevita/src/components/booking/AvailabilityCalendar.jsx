import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/style.css';

export default function AvailabilityCalendar({ selectedDate, onDateSelect }) {
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-tenant-primary')
    .trim() || '#0E9488';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecciona una fecha</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-4 inline-block">
        <DayPicker
          mode="single"
          locale={es}
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={{ before: new Date() }}
          showOutsideDays
          modifiersStyles={{
            selected: {
              backgroundColor: primaryColor,
              color: 'white',
              borderRadius: '50%',
            },
            today: {
              fontWeight: 'bold',
              border: `2px solid ${primaryColor}`,
              borderRadius: '50%',
            },
          }}
          styles={{
            caption_label: { color: primaryColor, fontWeight: 600 },
          }}
        />
      </div>
    </div>
  );
}
