import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSession, getTenants } from '../../lib/redApi.js';

export default function RedLocalesPage() {
  const { orgCodigo } = useParams();
  const navigate = useNavigate();
  const session = getSession();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session?.orgId) { navigate(`/red/${orgCodigo}/login`); return; }
    (async () => {
      try {
        setTenants(await getTenants(session.orgId));
      } catch (e) {
        setError(e.message || 'Error');
      } finally { setLoading(false); }
    })();
  }, []); // eslint-disable-line

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <button onClick={() => navigate(`/red/${orgCodigo}/dashboard`)} className="text-emerald-700 hover:underline mb-4">← Volver al dashboard</button>
      <h1 className="text-2xl font-bold">Locales de la red</h1>
      {loading && <p className="mt-4">Cargando...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {!loading && tenants.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {tenants.map((t) => (
            <div key={t.tenantId} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-900">{t.nombre}</h3>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Hoy</span>
                <span className="font-bold text-emerald-700">{t.citasHoy}</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">Esta semana</span>
                <span className="font-medium">{t.citasSemana}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
