import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, BarChart3, LogOut, Building2 } from 'lucide-react';
import { getSession, clearSession, getEstadisticas, getTenants } from '../../lib/redApi.js';

export default function RedDashboardPage() {
  const { orgCodigo } = useParams();
  const navigate = useNavigate();
  const [session, setSessionState] = useState(getSession());
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.orgId) {
      navigate(`/red/${orgCodigo}/login`);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await getEstadisticas(session.orgId);
        if (!cancelled) setStats(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Error cargando datos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [session?.orgId, navigate, orgCodigo]);

  function handleLogout() {
    clearSession();
    navigate(`/red/${orgCodigo}/login`);
  }

  if (!session?.orgId) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col">
        <div className="px-6 py-5 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Building2 size={22} />
            <span className="font-bold">{session.orgNombre}</span>
          </div>
          <span className="text-xs text-emerald-200 mt-1 block">Panel de red</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link to={`/red/${orgCodigo}/dashboard`} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-800 font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to={`/red/${orgCodigo}/locales`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-800 text-emerald-100">
            <Building2 size={18} /> Locales
          </Link>
          <Link to={`/red/${orgCodigo}/estadisticas`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-emerald-800 text-emerald-100">
            <BarChart3 size={18} /> Estadísticas
          </Link>
        </nav>
        <button onClick={handleLogout} className="m-3 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-800 text-sm">
          <LogOut size={16} /> Salir
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard consolidado</h1>
        <p className="text-gray-600">Resumen de toda la red</p>

        {loading && <p className="mt-8 text-gray-500">Cargando...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}

        {stats && (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <KpiCard label="Locales activos" value={stats.totalLocales} icon={<Building2 />} />
              <KpiCard label="Citas hoy" value={stats.totalCitasHoy} icon={<Calendar />} accent="emerald" />
              <KpiCard label="Citas esta semana" value={stats.totalCitasSemana} icon={<Calendar />} />
              <KpiCard label="Profesionales" value={stats.totalProfesionales} icon={<Users />} />
            </div>

            <h2 className="mt-10 text-lg font-semibold text-gray-900">Rendimiento por local</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
                    <th className="px-5 py-3">Local</th>
                    <th className="px-5 py-3 text-right">Citas hoy</th>
                    <th className="px-5 py-3 text-right">Citas semana</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.porLocal.map((t) => (
                    <tr key={t.tenantId} className="border-t border-gray-100">
                      <td className="px-5 py-3 text-gray-900">{t.nombre}</td>
                      <td className="px-5 py-3 text-right font-semibold text-emerald-700">{t.citasHoy}</td>
                      <td className="px-5 py-3 text-right text-gray-700">{t.citasSemana}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function KpiCard({ label, value, icon, accent }) {
  const accentClass = accent === 'emerald' ? 'text-emerald-700' : 'text-gray-900';
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between text-gray-400">
        <span className="text-xs uppercase font-semibold tracking-wide text-gray-500">{label}</span>
        <span>{icon}</span>
      </div>
      <div className={`mt-2 text-3xl font-bold ${accentClass}`}>{value}</div>
    </div>
  );
}
