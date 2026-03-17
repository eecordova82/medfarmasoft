import { createContext, useContext, useEffect } from 'react';

const TenantContext = createContext(null);

/**
 * Proveedor de contexto de tenant.
 * Aplica dinámicamente los colores y branding del tenant via CSS variables.
 */
export function TenantProvider({ children, tenant }) {
  useEffect(() => {
    if (!tenant) return;

    const root = document.documentElement;
    root.style.setProperty('--color-tenant-primary', tenant.colorPrimario || '#11756A');
    root.style.setProperty('--color-tenant-secondary', tenant.colorSecundario || '#4A90E2');

    document.title = `Reservar cita - ${tenant.nombre}`;

    if (tenant.logoUrl) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.href = tenant.logoUrl;
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
