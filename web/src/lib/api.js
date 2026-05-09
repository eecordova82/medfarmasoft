const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.medfarmasoft.es';

/**
 * Cliente HTTP para la API de MedFarmaSoft.
 * Incluye automáticamente el header X-Tenant-Id cuando se proporciona.
 */
export async function apiFetch(path, options = {}) {
  const { tenantId, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (tenantId) {
    headers['X-Tenant-Id'] = tenantId;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
      code: `HTTP_${response.status}`,
    }));
    throw new ApiError(
      error.message || 'Error del servidor',
      response.status,
      error.code
    );
  }

  return response.json();
}

/**
 * Error personalizado con código HTTP y código de error del API
 */
export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
