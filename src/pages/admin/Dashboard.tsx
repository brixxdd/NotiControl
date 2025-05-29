import { BookOpen, Calendar, Home, PenTool } from 'lucide-react';

export function DashboardContent() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <PenTool className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Artículos Publicados</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Home className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Visitas Totales</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4,256</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Eventos Próximos</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">7</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Boletines</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
