import { useState } from 'react';
import { BookOpen, Calendar, Home, PenTool } from 'lucide-react';
import { AdminNavbar } from '../../components/admin/AdminNavbar';
import { Sidebar } from '../../components/admin/Sidebar';

interface Article {
  id: number;
  title: string;
  status: string;
  date: string;
  views: number;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const articles = [
    { id: 1, title: 'Nueva acreditación para la facultad', status: 'publicado', date: '20/04/2025', views: 245 },
    { id: 2, title: 'Conferencia internacional de investigación', status: 'borrador', date: '18/04/2025', views: 0 },
    { id: 3, title: 'Inscripciones abiertas para el nuevo semestre', status: 'publicado', date: '15/04/2025', views: 189 },
  ];

  const getActiveTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard';
      case 'articles':
        return 'Gestión de Noticias';
      case 'events':
        return 'Gestión de Eventos';
      case 'bulletins':
        return 'Gestión de Boletines';
      case 'gallery':
        return 'Galería de Imágenes';
      case 'settings':
        return 'Configuración';
      default:
        return 'Panel de administración';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'articles':
        return <ArticlesManager articles={articles} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar 
        isOpen={sidebarOpen}
        activeSection={activeSection}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <main 
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <AdminNavbar title={getActiveTitle()} />
        
        {/* Page content */}
        <div className="p-8">
          {renderContent()}
        </div>
        </main>
    </div>
  );
}

function Dashboard() {
  return (
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
  );
}

function ArticlesManager({ articles }: { articles: Article[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Artículos Recientes</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vistas</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {articles.map((article) => (
              <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">#{article.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      article.status === 'publicado' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {article.status}
                  </span>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{article.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{article.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
