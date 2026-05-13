import { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TenantContext = createContext(null);

/**
 * Proveedor de contexto de tenant.
 * Aplica dinámicamente los colores y branding del tenant via CSS variables.
 */
export function TenantProvider({ children, tenant }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!tenant) return;

    const root = document.documentElement;
    root.style.setProperty('--color-tenant-primary', tenant.colorPrimario || '#11756A');
    root.style.setProperty('--color-tenant-secondary', tenant.colorSecundario || '#4A90E2');

    document.title = t('booking.meta.title', { name: tenant.nombre });

    // Actualizar meta tags para SEO y previews
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t('booking.meta.description', { name: tenant.nombre });
    const metaKeys = document.querySelector('meta[name="keywords"]');
    if (metaKeys) metaKeys.content = t('booking.meta.keywords', { name: tenant.nombre });

    if (tenant.logoUrl) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.href = tenant.logoUrl;
    }
  }, [tenant, i18n.resolvedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
