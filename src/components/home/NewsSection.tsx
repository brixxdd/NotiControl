import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { News } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface NewsItemWithId extends News {
  _id?: string;
}

interface NewsSectionProps {
  news: NewsItemWithId[];
}

const formatDate = (d?: string | Date) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const NewsSection = ({ news }: NewsSectionProps) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal-on-scroll">
      <div className="ios-card p-6 sm:p-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="ios-pill mb-2">Noticias</span>
            <h2 className="ios-title text-[color:var(--ios-label)]">
              Últimas novedades
            </h2>
          </div>
          <Link
            to="/noticias"
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--ios-blue)] hover:opacity-80 transition-opacity"
          >
            Ver todas
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {news.length === 0 ? (
          <p className="text-[15px] text-[color:var(--ios-label-tertiary)] text-center py-8">
            No hay noticias disponibles.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--ios-separator)]">
            {news.slice(0, 6).map((item, idx) => (
              <li key={item._id || item.id}>
                <Link
                  to={`/noticias/${item._id || item.id}`}
                  className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0 -mx-2 px-2 rounded-2xl transition-all duration-300 hover:bg-[var(--ios-fill)] active:scale-[0.99]"
                  style={{
                    animation: `ios-reveal 700ms ${idx * 60}ms var(--ease-out-quart) both`,
                  }}
                >
                  {item.imageUrl ? (
                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[var(--ios-fill)]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[var(--ios-fill)]" />
                  )}
                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <span className="ios-pill mb-1.5">{item.category}</span>
                    )}
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-[color:var(--ios-label)] leading-snug line-clamp-2 mb-1 group-hover:text-[var(--ios-blue)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[color:var(--ios-label-secondary)] line-clamp-2 mb-2">
                      {item.content.substring(0, 140)}…
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[color:var(--ios-label-tertiary)]">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <ArrowUpRight className="hidden sm:block flex-shrink-0 w-5 h-5 text-[color:var(--ios-label-tertiary)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="sm:hidden pt-5 mt-5 border-t border-[var(--ios-separator)]">
          <Link
            to="/noticias"
            className="flex items-center justify-center gap-1 text-[14px] font-semibold text-[var(--ios-blue)]"
          >
            Ver todas las noticias
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
