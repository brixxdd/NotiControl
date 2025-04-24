import { useState } from 'react';
import { Bell, BookOpen, Calendar, Home, Image, LogOut, Menu, PenTool, Settings, X } from 'lucide-react';
import { ThemeToggle } from '../../components/common/ThemeToggle';

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-gray-800 dark:bg-gray-950 text-white
          transition-all duration-300 ease-in-out z-20
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700 dark:border-gray-800">
          <h2 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>Panel Admin</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-6">
          <MenuItem 
            icon={<Home size={20} />} 
            text="Dashboard" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'dashboard'}
            onClick={() => setActiveSection('dashboard')}
          />
          <MenuItem 
            icon={<PenTool size={20} />} 
            text="Noticias" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'articles'}
            onClick={() => setActiveSection('articles')}
          />
          <MenuItem 
            icon={<Calendar size={20} />} 
            text="Eventos" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'events'}
            onClick={() => setActiveSection('events')}
          />
          <MenuItem 
            icon={<BookOpen size={20} />} 
            text="Boletines" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'bulletins'}
            onClick={() => setActiveSection('bulletins')}
          />
          <MenuItem 
            icon={<Image size={20} />} 
            text="Galería" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'gallery'}
            onClick={() => setActiveSection('gallery')}
          />
          <MenuItem 
            icon={<Settings size={20} />} 
            text="Configuración" 
            isCollapsed={!sidebarOpen} 
            isActive={activeSection === 'settings'}
            onClick={() => setActiveSection('settings')}
          />
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 dark:border-gray-800">
          <MenuItem 
            icon={<LogOut size={20} />} 
            text="Cerrar Sesión" 
            isCollapsed={!sidebarOpen} 
            isActive={false}
            onClick={() => alert('Cerrando sesión...')}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'ml-64' : 'ml-20'}
          bg-gray-100 dark:bg-gray-900
        `}
      >
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'articles' && 'Gestión de Noticias'}
                {activeSection === 'events' && 'Gestión de Eventos'}
                {activeSection === 'bulletins' && 'Gestión de Boletines'}
                {activeSection === 'gallery' && 'Galería de Imágenes'}
                {activeSection === 'settings' && 'Configuración'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center text-white font-bold cursor-pointer">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, text, isCollapsed, isActive, onClick }: MenuItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center w-full p-3 my-1
        ${isCollapsed ? 'justify-center' : 'justify-start'} 
        ${isActive 
          ? 'bg-blue-600 text-white dark:bg-blue-500' 
          : 'text-gray-300 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800'
        }
        transition-all duration-200 ease-in-out rounded-lg mx-2
        font-medium
      `}
    >
      <span className={`${isCollapsed ? 'mr-0' : 'mr-3'} text-xl`}>{icon}</span>
      {!isCollapsed && <span>{text}</span>}
    </button>
  );
}

function Dashboard() {
  const stats = [
    { label: 'Artículos Publicados', value: '24', icon: <PenTool className="w-6 h-6" /> },
    { label: 'Visitas Totales', value: '4,256', icon: <Home className="w-6 h-6" /> },
    { label: 'Eventos Próximos', value: '7', icon: <Calendar className="w-6 h-6" /> },
    { label: 'Boletines', value: '12', icon: <BookOpen className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Bienvenido al panel de administración
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md 
              transition-all duration-200 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticlesManager({ articles }: { articles: Article[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Artículos</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nuevo Artículo
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Título</th>
              <th className="py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Estado</th>
              <th className="py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Fecha</th>
              <th className="py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Visitas</th>
              <th className="py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 text-sm text-gray-800 dark:text-gray-200">{article.title}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    article.status === 'publicado' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{article.date}</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{article.views}</td>
                <td className="py-3">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
