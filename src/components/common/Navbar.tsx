import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md`}
      style={{ backgroundColor: '#192D63' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo UNACH */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo unach.png"
              alt="Logo UNACH"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white hover:bg-white/10 hover:text-white`}
            >
              Inicio
            </Link>
            <Link
              to="/noticias"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white hover:bg-white/10 hover:text-white`}
            >
              Noticias
            </Link>
            <Link
              to="/boletines"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white hover:bg-white/10 hover:text-white`}
            >
              Boletines
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow`}
            >
              Admin
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors text-white hover:bg-white/10`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div
          className={`px-4 pt-2 pb-4 space-y-1 bg-black/50 backdrop-blur-sm`}
        >
          {['/', '/noticias', '/boletines'].map((path, idx) => {
            const names = ['Inicio', 'Noticias', 'Boletines']
            return (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-gray-100 hover:text-white hover:bg-white/10`}
              >
                {names[idx]}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
