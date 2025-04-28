import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Menú móvil */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-3 ml-4">
              <img
                src="/logo.png"
                alt="NotiControl Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                NotiControl
              </span>
            </Link>
          </div>

          {/* Menú móvil */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-4 py-5 space-y-4">
                <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-lg">
                  Inicio
                </Link>
                <Link to="/noticias" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-lg">
                  Noticias
                </Link>
                <Link to="/eventos" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 text-lg">
                  Eventos
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Cerrar menú
                </button>
              </div>
            </div>
          )}

          {/* Enlaces de navegación - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/noticias"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Noticias
            </Link>
            <Link
              to="/eventos"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium"
            >
              Eventos
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium">
                <span>Recursos</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
                <Link
                  to="/biblioteca"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Biblioteca Digital
                </Link>
                <Link
                  to="/documentos"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Documentos
                </Link>
              </div>
            </div>
          </div>

          {/* Acciones del navbar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 px-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
            <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <ThemeToggle />
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};