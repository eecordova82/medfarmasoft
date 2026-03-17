import { useCallback } from 'react';
import { apiFetch } from '../lib/api';

/**
 * Hook para interactuar con la API de reservas públicas.
 * Incluye automáticamente el tenantId en cada petición.
 */
export function useBookingApi(tenantId) {
  const fetch = useCallback(
    (path, options = {}) => apiFetch(path, { ...options, tenantId }),
    [tenantId]
  );

  return {
    /** Resuelve tenant por slug */
    getTenant: (slug) => apiFetch(`/api/public/tenant/${slug}`),

    /** Resuelve tenant por dominio personalizado */
    getTenantByDomain: (domain) => apiFetch(`/api/public/tenant-by-domain/${domain}`),

    /** Lista profesionales activos */
    getProfesionales: () => fetch('/api/public/profesionales'),

    /** Lista servicios activos */
    getServicios: () => fetch('/api/public/servicios'),

    /** Obtiene disponibilidad horaria */
    getDisponibilidad: (profesionalId, servicioId, fecha) =>
      fetch(`/api/public/disponibilidad?profesionalId=${profesionalId}&servicioId=${servicioId}&fecha=${fecha}`),

    /** Crea reserva (envía OTP) */
    crearReserva: (data) =>
      fetch('/api/reservas', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /** Verifica OTP */
    verificarOtp: (data) =>
      fetch('/api/reservas/verificar-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /** Reenvía OTP */
    reenviarOtp: (reservaId) =>
      fetch(`/api/reservas/${reservaId}/reenviar-otp`, {
        method: 'POST',
      }),
  };
}
