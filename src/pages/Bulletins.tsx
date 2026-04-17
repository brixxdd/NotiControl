import { useEffect, useState } from 'react'
import { ArrowUpRight, FileText, Search } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

interface BulletinItem {
  _id: string
  folio: string
  title: string
  date: string
  pdf?: string
  image?: string
  createdAt: string
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

const Skeleton = () => (
  <div className="space-y-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="ios-skeleton h-20 rounded-2xl" />
    ))}
  </div>
)

export const Bulletins = () => {
  const [bulletins, setBulletins] = useState<BulletinItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const headerRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  useEffect(() => {
    fetch('http://localhost:5000/api/bulletins')
      .then(r => r.json())
      .then((data: BulletinItem[]) =>
        setBulletins(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      )
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const filtered = bulletins.filter(
    b =>
      !query ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.folio.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-[var(--ios-bg)]">
      <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div ref={headerRef} className="reveal-on-scroll">
          <span className="ios-pill mb-3">Documentos oficiales</span>
          <h1 className="ios-large-title text-[color:var(--ios-label)] mb-2">Boletines</h1>
          <p className="text-[16px] text-[color:var(--ios-label-secondary)] mb-6 max-w-xl">
            Comunicados y boletines oficiales de la Facultad de Lenguas UNACH.
          </p>
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--ios-label-tertiary)]" />
            <input
              type="text"
              placeholder="Buscar por folio o título…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--ios-fill)] text-[14px] text-[color:var(--ios-label)] placeholder-[color:var(--ios-label-tertiary)] border border-transparent focus:border-[var(--ios-blue)] focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div ref={listRef} className="reveal-on-scroll ios-card p-2 sm:p-3">
          {loading ? (
            <div className="p-4"><Skeleton /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-12 text-[color:var(--ios-label-tertiary)]">
              Sin resultados.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--ios-separator)]">
              {filtered.map((b, idx) => {
                const inner = (
                  <div
                    className="group flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-[var(--ios-fill)] transition-all active:scale-[0.99]"
                    style={{ animation: `ios-reveal 600ms ${idx * 40}ms var(--ease-out-quart) both` }}
                  >
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg, var(--ios-orange), var(--ios-red))' }}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-[color:var(--ios-label-tertiary)] uppercase tracking-wide mb-0.5">
                        {b.folio}
                      </div>
                      <h3 className="text-[15px] font-semibold text-[color:var(--ios-label)] leading-snug line-clamp-1 group-hover:text-[var(--ios-blue)] transition-colors">
                        {b.title}
                      </h3>
                      <div className="text-[12px] text-[color:var(--ios-label-tertiary)] mt-0.5">
                        {fmt(b.date)}
                      </div>
                    </div>
                    <ArrowUpRight className="flex-shrink-0 w-4 h-4 text-[var(--ios-blue)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </div>
                )
                return (
                  <li key={b._id}>
                    {b.pdf ? (
                      <a href={b.pdf} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
