import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BookingStepper({ currentStep }) {
  const { t } = useTranslation();
  const steps = [
    t('booking.stepper.professional'),
    t('booking.stepper.service'),
    t('booking.stepper.dateTime'),
    t('booking.stepper.yourData'),
    t('booking.stepper.verify'),
  ];

  return (
    <div className="bg-white border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                style={isCurrent ? { backgroundColor: 'var(--color-tenant-primary, #11756A)' } : {}}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`hidden sm:inline text-sm ${
                  isCurrent ? 'font-semibold text-gray-900' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
