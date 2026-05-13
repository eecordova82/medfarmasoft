import { DayPicker } from 'react-day-picker';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import 'react-day-picker/style.css';

const LOCALES = { es, en: enUS };

export default function AvailabilityCalendar({ selectedDate, onDateSelect }) {
  const { t, i18n } = useTranslation();
  const dpLocale = LOCALES[i18n.resolvedLanguage] || LOCALES[i18n.language?.split('-')[0]] || es;

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-tenant-primary')
    .trim() || '#11756A';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('booking.calendar.title')}</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-4 inline-block">
        <DayPicker
          mode="single"
          locale={dpLocale}
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
