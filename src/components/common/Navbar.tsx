import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center px-2 lg:px-0">
            <Link 
              to="/" 
              className={`flex-shrink-0 font-bold text-lg transition-colors ${
                isScrolled
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Facultad News
            </Link>
            <div className="hidden lg:block lg:ml-6">
              <div className="flex space-x-4">
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-gray-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Inicio
                </Link>
                <Link 
                  to="/noticias" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-gray-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Noticias
                </Link>
                <Link 
                  to="/boletines" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-gray-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Boletines
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            <Link 
              to="/admin" 
              className={`inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Admin
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 ${
          isScrolled
            ? 'bg-white dark:bg-gray-800'
            : 'bg-black/50 backdrop-blur-sm'
        }`}>
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              isScrolled
                ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/noticias"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              isScrolled
                ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            Noticias
          </Link>
          <Link
            to="/boletines"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
              isScrolled
                ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-700'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            Boletines
          </Link>
        </div>
      </div>
    </nav>
  )
}