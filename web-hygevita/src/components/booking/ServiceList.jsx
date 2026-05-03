import { useState } from 'react';
import { Clock, CreditCard, Search } from 'lucide-react';

export default function ServiceList({ servicios, onSelect }) {
  const [search, setSearch] = useState('');

  if (!servicios?.length) {
    return <p className="text-center text-gray-500 py-8">No hay servicios disponibles.</p>;
  }

  const formatPrecio = (precio, requierePago) => {
    if (precio == null || precio === 0) return { texto: 'Precio: a consultar', color: 'text-gray-500' };
    return {
      texto: `${precio.toFixed(2)} \€`,
      color: 'text-gray-900 font-semibold',
      aviso: requierePago
        ? 'Requiere pago anticipado. El centro contactar\á contigo.'
        : 'Se abona en el centro',
    };
  };

  const filtered = search.trim()
    ? servicios.filter((s) =>
        s.nombre.toLowerCase().includes(search.toLowerCase()) ||
        s.descripcion?.toLowerCase().includes(search.toLowerCase())
      )
    : servicios;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecciona un servicio</h2>

      {servicios.length > 5 && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--color-tenant-primary, #0E9488)' }}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No se encontraron servicios.</p>
      ) : (
        <div className="grid gap-3 max-h-[60vh] overflow-y-auto">
          {filtered.map((svc) => {
            const precio = formatPrecio(svc.precio, svc.requierePagoAnticipado);
            return (
              <button
                key={svc.id}
                onClick={() => onSelect(svc)}
                className="bg-white rounded-xl border-2 border-gray-200 p-5 text-left hover:border-current hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{svc.nombre}</h3>
                    {svc.descripcion && (
                      <p className="text-sm text-gray-500 mt-1">{svc.descripcion}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {svc.duracionMinutos} min
                      </span>
                      <span className={`flex items-center gap-1 ${precio.color}`}>
                        <CreditCard className="w-4 h-4" /> {precio.texto}
                      </span>
                    </div>
                    {precio.aviso && (
                      <p className={`text-xs mt-2 ${svc.requierePagoAnticipado ? 'text-amber-600' : 'text-gray-400'}`}>
                        {svc.requierePagoAnticipado ? '\u26A0\uFE0F ' : ''}{precio.aviso}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2 text-right">{filtered.length} de {servicios.length} servicios</p>
    </div>
  );
}
