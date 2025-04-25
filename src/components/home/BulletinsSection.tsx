import { ArrowRight } from 'lucide-react';

interface Bulletin {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const BulletinsSection = () => {
  const bulletins: Bulletin[] = [
    {
      id: 1,
      title: "Boletín UNACH-2025/270",
      description: "Avances en investigación científica",
      date: "2025-04-23",
    },
    {
      id: 2,
      title: "Boletín UNACH-2025/269",
      description: "Nuevos programas de intercambio internacional",
      date: "2025-04-22",
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Últimos Boletines
        </h2>
        <div className="space-y-4">
          {bulletins.map((bulletin) => (
            <a
              key={bulletin.id}
              href="#"
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
            >
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {bulletin.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {bulletin.description}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {new Date(bulletin.date).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
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
