import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function PatientForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    notas: '',
  });
  const [captchaToken, setCaptchaToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState(Date.now());
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) errs.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email no v\álido';
    if (!form.telefono.trim()) errs.telefono = 'El teléfono es obligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      captchaToken,
      website: honeypot,
      elapsed: Date.now() - formLoadedAt,
    });
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Tus datos</h2>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              value={form.nombre}
              onChange={handleChange('nombre')}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': 'var(--color-tenant-primary, #11756A)' }}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input
              type="text"
              value={form.apellidos}
              onChange={handleChange('apellidos')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input
            type="tel"
            value={form.telefono}
            onChange={handleChange('telefono')}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm ${errors.telefono ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
          />
          {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
          <textarea
            value={form.notas}
            onChange={handleChange('notas')}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none"
          />
        </div>

        {/* Honeypot - campo invisible para bots */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        {/* Captcha invisible (Cloudflare Turnstile) */}
        {TURNSTILE_SITE_KEY && (
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(token) => setCaptchaToken(token)}
          />
        )}

        <div className="flex items-start gap-2 text-sm text-gray-500">
          <input type="checkbox" required className="mt-1" />
          <span>Acepto la política de privacidad y el tratamiento de mis datos.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-semibold transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
        >
          {loading ? 'Enviando...' : 'Confirmar y enviar código'}
        </button>
      </div>
    </form>
  );
}
