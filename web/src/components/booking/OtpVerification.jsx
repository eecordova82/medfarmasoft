import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function OtpVerification({ email, onVerify, onResend, loading }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  // Countdown para reenvío
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    // Auto-avanzar al siguiente campo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-enviar cuando se completan los 6 dígitos
    if (value && newDigits.every((d) => d)) {
      onVerify(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newDigits = pasted.split('');
      setDigits(newDigits);
      onVerify(pasted);
    }
  };

  const handleResend = async () => {
    try {
      await onResend();
      setResendCooldown(60);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifica tu email</h2>
      <p className="text-gray-500 mb-6">
        Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className="w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 focus:outline-none focus:border-current transition-colors"
            style={{ '--tw-border-opacity': 1 }}
            disabled={loading}
          />
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <Loader2 className="w-4 h-4 animate-spin" /> Verificando...
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="text-sm text-gray-500">
        ¿No recibiste el código?{' '}
        {resendCooldown > 0 ? (
          <span>Reenviar en {resendCooldown}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-tenant-primary, #11756A)' }}
          >
            Reenviar código
          </button>
        )}
      </div>
    </div>
  );
}
