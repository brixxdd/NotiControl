import { ArrowUpRight, FileText } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';

interface BulletinItemWithId {
  _id: string;
  folio: string;
  title: string;
  date: string;
  pdf?: string;
  image?: string;
  createdAt: string;
}

interface BulletinsSectionProps {
  bulletins: BulletinItemWithId[];
  loading: boolean;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const BulletinsSection = ({ bulletins, loading }: BulletinsSectionProps) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal-on-scroll">
      <div className="ios-card p-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="ios-pill mb-2">Boletines</span>
            <h2 className="text-[19px] font-bold text-[color:var(--ios-label)] tracking-tight">
              Últimos publicados
            </h2>
          </div>
          <a
            href="/boletines"
            className="text-[13px] font-semibold text-[var(--ios-blue)] hover:opacity-80 transition-opacity"
          >
            Todos
          </a>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="ios-skeleton h-16 rounded-2xl" />
            ))}
          </div>
        ) : bulletins.length === 0 ? (
          <p className="text-[14px] text-[color:var(--ios-label-tertiary)] text-center py-6">
            No hay boletines disponibles.
          </p>
        ) : (
          <ul className="space-y-2">
            {bulletins.slice(0, 5).map((b, idx) => {
              const content = (
                <div
                  className="group flex items-start gap-3 p-3 rounded-2xl bg-[var(--ios-fill)] hover:bg-[var(--ios-fill-hover)] transition-all active:scale-[0.98]"
                  style={{
                    animation: `ios-reveal 700ms ${idx * 60}ms var(--ease-out-quart) both`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--ios-orange), var(--ios-red))',
                    }}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[color:var(--ios-label-tertiary)] uppercase tracking-wide">
                      {b.folio}
                    </div>
                    <h3 className="text-[14px] font-semibold text-[color:var(--ios-label)] leading-snug line-clamp-2 group-hover:text-[var(--ios-blue)] transition-colors">
                      {b.title}
                    </h3>
                    <div className="text-[11.5px] text-[color:var(--ios-label-tertiary)] mt-1">
                      {formatDate(b.date)}
                    </div>
                  </div>
                  <ArrowUpRight className="flex-shrink-0 w-4 h-4 text-[color:var(--ios-label-tertiary)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              );
              return (
                <li key={b._id}>
                  {b.pdf ? (
                    <a href={b.pdf} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
