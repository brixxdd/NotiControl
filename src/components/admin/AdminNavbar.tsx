import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';

interface AdminNavbarProps {
  title?: string;
}

export const AdminNavbar = ({ title = 'Panel de administración' }: AdminNavbarProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            aria-label="Notificaciones"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>
          <Link 
            to="/"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
          >
            Ver sitio
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
