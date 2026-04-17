import { useEffect, useState } from 'react';
import { BookOpen, Calendar, PenTool, TrendingUp, ArrowUpRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
  sub?: string;
}

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  featured: boolean;
}

const API = 'http://localhost:5000/api';

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
};

export function DashboardContent() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [eventCount, setEventCount] = useState(0);
  const [bulletinCount, setBulletinCount] = useState(0);
  const [trendingCount, setTrendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/news/`).then(r => r.json()).catch(() => []),
      fetch(`${API}/events`).then(r => r.json()).catch(() => []),
      fetch(`${API}/bulletins`).then(r => r.json()).catch(() => []),
      fetch(`${API}/trending`).then(r => r.json()).catch(() => []),
    ]).then(([n, e, b, t]) => {
      setNews(Array.isArray(n) ? n : []);
      setEventCount(Array.isArray(e) ? e.length : 0);
      setBulletinCount(Array.isArray(b) ? b.length : 0);
      setTrendingCount(Array.isArray(t) ? t.length : 0);
      setLoading(false);
    });
  }, []);

  const stats: StatCard[] = [
    {
      label: 'Noticias',
      value: loading ? '—' : news.length,
      icon: <PenTool size={16} />,
      accent: 'var(--ios-blue)',
      sub: `${loading ? '—' : news.filter(n => n.featured).length} destacadas`,
    },
    {
      label: 'Eventos',
      value: loading ? '—' : eventCount,
      icon: <Calendar size={16} />,
      accent: 'var(--ios-yellow)',
      sub: 'próximos',
    },
    {
      label: 'Boletines',
      value: loading ? '—' : bulletinCount,
      icon: <BookOpen size={16} />,
      accent: 'var(--ios-purple)',
      sub: 'publicados',
    },
    {
      label: 'Trending',
      value: loading ? '—' : trendingCount,
      icon: <TrendingUp size={16} />,
      accent: 'var(--ios-green)',
      sub: 'temas activos',
    },
  ];

  const recent = [...news]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="ios-card p-5 ios-card-hover">
            <div className="flex items-center justify-between mb-3">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{ background: s.accent }}
              >
                {s.icon}
              </span>
              <span className="text-[11px] text-[color:var(--ios-label-tertiary)] font-medium uppercase tracking-wider">
                {s.label}
              </span>
            </div>
            <p className="text-[28px] font-bold tracking-tight text-[color:var(--ios-label)] leading-none mb-1">
              {s.value}
            </p>
            {s.sub && (
              <p className="text-[12px] text-[color:var(--ios-label-tertiary)]">{s.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent news table */}
      <div className="ios-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--ios-separator)]">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-[color:var(--ios-label-tertiary)]" />
            <h2 className="text-[14px] font-semibold text-[color:var(--ios-label)]">
              Noticias recientes
            </h2>
          </div>
          <Link
            to="/admin/noticias"
            className="flex items-center gap-1 text-[12px] font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--ios-blue)' }}
          >
            Ver todas
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="ios-skeleton h-10 rounded-xl" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="py-16 text-center">
            <PenTool size={28} className="mx-auto mb-3 text-[color:var(--ios-label-tertiary)]" />
            <p className="text-[14px] text-[color:var(--ios-label-secondary)]">Sin noticias aún</p>
            <Link
              to="/admin/noticias"
              className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-medium"
              style={{ color: 'var(--ios-blue)' }}
            >
              Crear primera noticia
              <ArrowUpRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--ios-separator)]">
            {recent.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--ios-fill)] transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-[color:var(--ios-label)] truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={11} className="text-[color:var(--ios-label-tertiary)]" />
                    <span className="text-[11.5px] text-[color:var(--ios-label-tertiary)]">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.featured && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold text-white"
                      style={{ background: 'var(--ios-yellow)' }}
                    >
                      Destacada
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[var(--ios-fill)] text-[color:var(--ios-label-secondary)]">
                    <Tag size={9} />
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
