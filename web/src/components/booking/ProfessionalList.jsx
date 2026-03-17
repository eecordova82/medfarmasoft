import { User } from 'lucide-react';

export default function ProfessionalList({ profesionales, onSelect }) {
  if (!profesionales?.length) {
    return <p className="text-center text-gray-500 py-8">No hay profesionales disponibles.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecciona un profesional</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {profesionales.map((prof) => (
          <button
            key={prof.id}
            onClick={() => onSelect(prof)}
            className="bg-white rounded-xl border-2 border-gray-200 p-5 text-left hover:border-current hover:shadow-md transition-all group"
            style={{ '--tw-border-opacity': 1 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
              >
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-current">
                  {prof.nombre}
                </h3>
                {prof.especialidad && (
                  <p className="text-sm text-gray-500 mt-1">{prof.especialidad}</p>
                )}
                {prof.biografia && (
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{prof.biografia}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
