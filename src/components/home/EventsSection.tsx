import { Clock, Calendar, ArrowRight } from 'lucide-react';

// Import or define the interface for Event data including _id from backend
// Assuming AdminEventItem from AdminEvents.tsx is suitable, or define a similar one.
interface EventItemWithId {
  _id: string; // MongoDB _id
  title: string;
  date: string; // Date string from backend
  time: string;
  location: string;
  category?: string; // Optional category
  createdAt: string; // Date string from backend
}

interface EventsSectionProps {
  events: EventItemWithId[];
  loading: boolean; // Add loading state prop
}

export const EventsSection = ({ events, loading }: EventsSectionProps) => {
  // Removed hardcoded events data
  // const events: Event[] = [...];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Eventos Próximos
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Cargando eventos...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No hay eventos próximos.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event._id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 text-center">
                  {/* Assuming event.date is a valid date string */}
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
        <a href="/eventos" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
          Ver calendario completo
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
