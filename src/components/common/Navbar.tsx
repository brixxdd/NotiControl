import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/boletines', label: 'Boletines' },
]

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [elevated, setElevated] = useState(false)
  const lastY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setElevated(y > 8)
      // hide on scroll down, show on scroll up
      if (y > 120 && y > lastY.current) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500`}
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className={`ios-glass transition-all duration-300 ${
            elevated ? 'shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)]' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <Link
                to="/"
                className="flex items-center gap-2 group"
                aria-label="Inicio"
              >
                <div className="w-9 h-9 rounded-xl bg-white/80 dark:bg-white/10 flex items-center justify-center shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                  <img
                    src="/logo unach.png"
                    alt="UNACH"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <span className="hidden sm:block text-[15px] font-semibold tracking-tight text-[color:var(--ios-label)]">
                  Negocios UNACH
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = location.pathname === link.to
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-300 ${
                        active
                          ? 'text-[color:var(--ios-label)]'
                          : 'text-[color:var(--ios-label-secondary)] hover:text-[color:var(--ios-label)]'
                      }`}
                    >
                      {active && (
                        <span
                          className="absolute inset-0 rounded-full bg-[var(--ios-fill)]"
                          aria-hidden
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[var(--ios-blue)] text-white text-[14px] font-semibold transition-all duration-300 hover:brightness-110 active:scale-95 shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--ios-blue)_45%,transparent)]"
                >
                  Admin
                </Link>
                <button
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[var(--ios-fill)] active:scale-90"
                  aria-label="Menú"
                  aria-expanded={isMenuOpen}
                >
                  <div className="relative w-5 h-5">
                    <Menu
                      className={`absolute inset-0 w-5 h-5 text-[color:var(--ios-label)] transition-all duration-300 ${
                        isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                      }`}
                    />
                    <X
                      className={`absolute inset-0 w-5 h-5 text-[color:var(--ios-label)] transition-all duration-300 ${
                        isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="ios-glass border-t border-[var(--nav-border)] px-4 py-3 space-y-1">
            {NAV_LINKS.map((link, i) => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-2xl text-[15px] font-medium transition-all ${
                    active
                      ? 'bg-[var(--ios-fill)] text-[color:var(--ios-label)]'
                      : 'text-[color:var(--ios-label-secondary)] hover:bg-[var(--ios-fill)] hover:text-[color:var(--ios-label)]'
                  }`}
                  style={{
                    animation: isMenuOpen
                      ? `ios-reveal 500ms ${i * 40}ms var(--ease-out-quart) both`
                      : undefined,
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/admin"
              className="block px-4 py-3 rounded-2xl text-[15px] font-semibold bg-[var(--ios-blue)] text-white text-center"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
      {/* Spacer — navbar is fixed */}
      <div className="h-14" aria-hidden />
    </>
  )
}
