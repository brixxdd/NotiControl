import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'; // Import necessary types
import { useEffect } from 'react'; // Import useEffect

// Define interface for event data matching backend schema
interface AdminEventItem {
  _id?: string; // Optional _id for existing events
  title: string;
  date: string; // Use string for input type="date"
  time: string; // Use string for input type="time"
  location: string;
  category?: string; // Optional category
  createdAt?: string; // Add createdAt as optional from backend
}

export const AdminEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold new event form data
  const [newEvent, setNewEvent] = useState<AdminEventItem>({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });
  // State to hold the list of events fetched from backend
  const [events, setEvents] = useState<AdminEventItem[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State for success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AdminEventItem[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleCreateEvent = async (e: FormEvent) => {
    e.preventDefault();
    // Format date correctly for backend (if needed, backend expects Date type)
    // For simplicity, sending as string first. Mongoose might handle conversion.
    // If not, we'd convert newEvent.date and potentially newEvent.time to a single Date object
    // or ensure backend handles string dates.
    // Let's stick to sending strings for now as per input types.

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        // Handle errors, maybe show a notification
        console.error('Error creating event:', response.statusText);
        // alert('Error al crear el evento.'); // Remove default alert
        // Set an error message state if you implement one
      } else {
        // Event created successfully
        const createdEvent = await response.json();
        console.log('Evento creado:', createdEvent);
        // Refresh the list of events
        fetchEvents();
        // Show success message
        setSuccessMessage('Evento creado con éxito!');
        // Hide success message after a few seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        // Close modal and reset form
        setIsModalOpen(false);
        setNewEvent({
          title: '',
          date: '',
          time: '',
          location: '',
          category: '',
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error en la conexión o al procesar la solicitud.'); // Catch network/other errors
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Gestionar Eventos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Evento
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setSuccessMessage(null)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L6.305 6.849a1.2 1.2 0 0 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      {/* Modal para crear evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Crear Nuevo Evento</h2>
            {/* Formulario del modal */}
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hora</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría (Opcional)</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={newEvent.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                 {/* Could also use a select dropdown for categories */}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Crear Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Lista de Eventos</h2>
        {/* Aquí irá la lista/tabla de eventos cargados desde el backend */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Cargando eventos...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No hay eventos creados aún.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event) => (
              <li key={event._id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Fecha: {event.date} - Hora: {event.time} - Ubicación: {event.location}
                      {event.category && ` - Categoría: ${event.category}`}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                       Creado: {event.createdAt ? new Date(event.createdAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  {/* Future: Edit/Delete buttons */}
                  {/* <div>
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-2">Editar</button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">Eliminar</button>
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}; 