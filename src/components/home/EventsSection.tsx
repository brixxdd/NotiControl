import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';

interface EventItemWithId {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category?: string;
  createdAt: string;
}

interface EventsSectionProps {
  events: EventItemWithId[];
  loading: boolean;
}

export const EventsSection = ({ events, loading }: EventsSectionProps) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal-on-scroll">
      <div className="ios-card p-6 sm:p-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="ios-pill mb-2">Agenda</span>
            <h2 className="ios-title text-[color:var(--ios-label)]">
              Próximos eventos
            </h2>
          </div>
          <a
            href="/eventos"
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--ios-blue)] hover:opacity-80 transition-opacity"
          >
            Calendario
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="ios-skeleton w-16 h-16 rounded-2xl" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="ios-skeleton h-4 w-3/4" />
                  <div className="ios-skeleton h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-[15px] text-[color:var(--ios-label-tertiary)] text-center py-8">
            No hay eventos próximos.
          </p>
        ) : (
          <ul className="space-y-2">
            {events.slice(0, 5).map((event, idx) => {
              const d = new Date(event.date);
              return (
                <li
                  key={event._id}
                  style={{
                    animation: `ios-reveal 700ms ${idx * 60}ms var(--ease-out-quart) both`,
                  }}
                >
                  <div className="group flex items-start gap-4 p-3 -mx-3 rounded-2xl transition-all hover:bg-[var(--ios-fill)]">
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-sm"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--ios-blue), var(--ios-indigo))',
                      }}
                    >
                      <div className="text-[22px] font-bold leading-none">
                        {d.getDate()}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mt-0.5 opacity-90">
                        {d.toLocaleString('es-MX', { month: 'short' }).replace('.', '')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      {event.category && (
                        <span className="ios-pill mb-1">{event.category}</span>
                      )}
                      <h3 className="text-[15px] font-semibold text-[color:var(--ios-label)] leading-snug mb-1.5 line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[color:var(--ios-label-secondary)]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="line-clamp-1">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
