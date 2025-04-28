import { Event } from '../../types';
import { Link } from 'react-router-dom';

interface EventsSectionProps {
  events: Event[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Próximos Eventos</h2>
      <div className="space-y-6">
        {events.map((event) => (
          <article key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <Link to={`/eventos/${event.id}`} className="block">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {event.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {event.description.substring(0, 150)}...
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{event.location}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
