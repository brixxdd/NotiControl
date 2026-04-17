import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Search } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

interface NewsItem {
  _id: string
  title: string
  content: string
  imageUrl: string
  category: string
  featured: boolean
  createdAt: string
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })

const Skeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="ios-card overflow-hidden">
        <div className="ios-skeleton h-48 w-full rounded-none" />
        <div className="p-5 space-y-3">
          <div className="ios-skeleton h-3 w-20 rounded-full" />
          <div className="ios-skeleton h-5 w-full" />
          <div className="ios-skeleton h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
)

const CATEGORIES = ['Todas', 'Académico', 'Internacional', 'Cultural', 'Logros', 'Infraestructura', 'Certificaciones']

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')
  const headerRef = useReveal<HTMLDivElement>()

  useEffect(() => {
    fetch('http://localhost:5000/api/news/')
      .then(r => r.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const filtered = news.filter(n => {
    const matchCat = activeCategory === 'Todas' || n.category === activeCategory
    const matchQ = !query || n.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const featured = news.find(n => n.featured)
  const rest = filtered.filter(n => !n.featured || query || activeCategory !== 'Todas')

  return (
    <main className="min-h-screen bg-[var(--ios-bg)]">
      {/* Hero header */}
      <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={headerRef} className="reveal-on-scroll">
          <span className="ios-pill mb-3">Sala de prensa</span>
          <h1 className="ios-large-title text-[color:var(--ios-label)] mb-2">Noticias</h1>
          <p className="text-[16px] text-[color:var(--ios-label-secondary)] mb-6 max-w-xl">
            Últimas novedades de la Facultad de Negocios Campus IV UNACH.
          </p>

          {/* Search */}
          <div className="relative max-w-sm mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ios-label-tertiary)]" />
            <input
              type="text"
              placeholder="Buscar noticias…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--ios-fill)] text-[14px] text-[color:var(--ios-label)] placeholder-[color:var(--ios-label-tertiary)] border border-transparent focus:border-[var(--ios-blue)] focus:outline-none transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-300 active:scale-95 ${
                  activeCategory === c
                    ? 'bg-[var(--ios-blue)] text-white shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--ios-blue)_45%,transparent)]'
                    : 'bg-[var(--ios-fill)] text-[color:var(--ios-label-secondary)] hover:bg-[var(--ios-fill-hover)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[color:var(--ios-label-tertiary)]">
            Sin resultados para "{query}"
          </div>
        ) : (
          <>
            {/* Featured — show only when no filter active */}
            {featured && !query && activeCategory === 'Todas' && (
              <Link
                to={`/noticias/${featured._id}`}
                className="group ios-card ios-card-hover overflow-hidden flex flex-col md:flex-row mb-6 block"
              >
                <div className="md:w-1/2 h-56 md:h-auto overflow-hidden">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="ios-pill">Destacado</span>
                    <span className="ios-pill">{featured.category}</span>
                  </div>
                  <h2 className="ios-title text-[color:var(--ios-label)] mb-3 group-hover:text-[var(--ios-blue)] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[15px] text-[color:var(--ios-label-secondary)] line-clamp-3 mb-4">
                    {featured.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[12px] text-[color:var(--ios-label-tertiary)]">
                      <Clock className="w-3.5 h-3.5" />
                      {fmt(featured.createdAt)}
                    </span>
                    <span className="flex items-center gap-1 text-[14px] font-semibold text-[var(--ios-blue)]">
                      Leer más <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((item, idx) => (
                <Link
                  key={item._id}
                  to={`/noticias/${item._id}`}
                  className="group ios-card ios-card-hover overflow-hidden flex flex-col"
                  style={{ animation: `ios-reveal 700ms ${idx * 50}ms var(--ease-out-quart) both` }}
                >
                  <div className="h-48 overflow-hidden bg-[var(--ios-fill)]">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <span className="ios-pill mb-2">{item.category}</span>
                    <h3 className="text-[16px] font-semibold text-[color:var(--ios-label)] leading-snug line-clamp-2 mb-2 group-hover:text-[var(--ios-blue)] transition-colors flex-1">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-[color:var(--ios-label-secondary)] line-clamp-2 mb-3">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--ios-separator)]">
                      <span className="flex items-center gap-1 text-[12px] text-[color:var(--ios-label-tertiary)]">
                        <Clock className="w-3.5 h-3.5" />
                        {fmt(item.createdAt)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--ios-blue)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
