import { ArrowRight } from 'lucide-react';

// Define interface for Bulletin data including _id from backend
interface BulletinItemWithId {
  _id: string; // MongoDB _id
  folio: string; // Add folio
  title: string;
  // description: string; // Remove description
  date: string; // Date string from backend
  pdf?: string; // Add optional pdf URL
  image?: string; // Add optional image URL
  createdAt: string; // Date string from backend
}

interface BulletinsSectionProps {
  bulletins: BulletinItemWithId[];
  loading: boolean; // Add loading state prop
}

export const BulletinsSection = ({ bulletins, loading }: BulletinsSectionProps) => {
  // Removed hardcoded bulletins data
  // const bulletins: Bulletin[] = [...];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Últimos Boletines
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Cargando boletines...</p>
        ) : bulletins.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No hay boletines próximos.</p>
        ) : (
          <div className="space-y-4">
            {bulletins.map((bulletin) => (
              <div
                key={bulletin._id}
                className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {bulletin.folio} - {bulletin.title}
                </h3>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Fecha: {new Date(bulletin.date).toLocaleDateString()}
                </div>
                {bulletin.pdf && (
                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                    <a href={bulletin.pdf} target="_blank" rel="noopener noreferrer" className="hover:underline">Ver PDF</a>
                  </p>
                )}
                {bulletin.image && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                     Imagen: {bulletin.image}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
        <a href="/boletines" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
          Ver todos los boletines
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
