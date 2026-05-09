import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || 'es';

  return (
    <div className={`inline-flex items-center gap-1 ${className}`} aria-label={t('common.language')}>
      <Globe className="w-3.5 h-3.5 opacity-60" />
      {LANGUAGES.map((lng, idx) => (
        <span key={lng.code} className="flex items-center">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lng.code)}
            className={`text-xs font-semibold uppercase tracking-wide transition-opacity ${
              current.startsWith(lng.code) ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            aria-current={current.startsWith(lng.code)}
          >
            {lng.label}
          </button>
          {idx < LANGUAGES.length - 1 && <span className="mx-1 opacity-30">·</span>}
        </span>
      ))}
    </div>
  );
}
