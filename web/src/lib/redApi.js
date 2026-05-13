/**
 * Cliente API del panel de red.
 * El admin_red se autentica con email + contraseña.
 * El backend devuelve un token firmado HMAC (X-Red-Session) con expiración 8h.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? '';
const STORAGE_KEY = 'medfarma_red_session';

export function getSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem(STORAGE_KEY);
}

async function redFetch(path, options = {}) {
  const session = getSession();
  if (!session?.token) throw new Error('No autenticado');

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Red-Session': session.token,
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    clearSession();
    throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Error ${res.status}`);
  }
  return res.json();
}

export async function redLogin(email, password, orgCodigo) {
  const res = await fetch(`${API_BASE}/api/organizaciones/red-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, orgCodigo }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? 'Credenciales inválidas');
  }
  return res.json();
}

export async function getOrgByCodigo(codigo) {
  return redFetch(`/api/organizaciones/by-codigo/${encodeURIComponent(codigo)}`);
}

export async function getEstadisticas(orgId) {
  return redFetch(`/api/organizaciones/${orgId}/estadisticas`);
}

export async function getTenants(orgId) {
  return redFetch(`/api/organizaciones/${orgId}/tenants`);
}

export async function getSerieCitas(orgId, dias = 30) {
  return redFetch(`/api/organizaciones/${orgId}/serie?dias=${dias}`);
}

export async function getCitasTenant(orgId, tenantId, { desde, hasta, limit = 100 } = {}) {
  const params = new URLSearchParams({ limit });
  if (desde) params.set('desde', desde);
  if (hasta) params.set('hasta', hasta);
  return redFetch(`/api/organizaciones/${orgId}/tenants/${tenantId}/citas?${params}`);
}
