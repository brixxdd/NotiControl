import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect } from 'react';

// Define interface for trending topic data matching backend schema
interface AdminTrendingItem {
  _id?: string; // Optional _id for existing items
  title: string;
  stats: string;
  gradientFrom: string; // Store gradient start color name (e.g., "pink-500")
  gradientTo: string;   // Store gradient end color name (e.g., "violet-500")
  createdAt?: string; // Add createdAt as optional from backend
}

export const AdminTrending = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold new trending topic form data
  const [newTrendingTopic, setNewTrendingTopic] = useState<AdminTrendingItem>({
    title: '',
    stats: '',
    gradientFrom: '',
    gradientTo: '',
  });
  // State to hold the list of trending topics fetched from backend
  const [trendingTopics, setTrendingTopics] = useState<AdminTrendingItem[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State for success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function to fetch trending topics from the backend
  const fetchTrendingTopics = async () => {
    try {
      setLoading(true);
      // NOTE: We will need to create the backend route for trending topics later
      const response = await fetch('http://localhost:5000/api/trending');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AdminTrendingItem[] = await response.json();
      setTrendingTopics(data);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending topics when the component mounts
  useEffect(() => {
    fetchTrendingTopics();
  }, []); // Empty dependency array means this runs once on mount

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrendingTopic({ ...newTrendingTopic, [name]: value });
  };

  // Handle form submission
  const handleCreateTrendingTopic = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // NOTE: We will need to create the backend route for trending topics later
      const response = await fetch('http://localhost:5000/api/trending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrendingTopic),
      });

      if (!response.ok) {
        console.error('Error creating trending topic:', response.statusText);
        // Handle error message if needed
      } else {
        const createdTopic = await response.json();
        console.log('Trending topic creado:', createdTopic);
        // Refresh the list of trending topics
        fetchTrendingTopics();
        // Show success message
        setSuccessMessage('Trending topic creado con éxito!');
        // Hide success message after a few seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        // Close modal and reset form
        setIsModalOpen(false);
        setNewTrendingTopic({
          title: '',
          stats: '',
          gradientFrom: '',
          gradientTo: '',
        });
      }
    } catch (error) {
      console.error('Error creating trending topic:', error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Gestionar Trending Topics</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Trending Topic
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

      {/* Modal para crear trending topic */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Crear Nuevo Trending Topic</h2>
            {/* Formulario del modal */}
            <form onSubmit={handleCreateTrendingTopic} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newTrendingTopic.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="stats" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estadísticas</label>
                <input
                  type="text"
                  name="stats"
                  id="stats"
                  value={newTrendingTopic.stats}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
               <div>
                <label htmlFor="gradientFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color Gradiente Inicio (Tailwind class)</label>
                <input
                  type="text"
                  name="gradientFrom"
                  id="gradientFrom"
                  value={newTrendingTopic.gradientFrom}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ej: pink-500"
                />
              </div>
              <div>
                <label htmlFor="gradientTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color Gradiente Fin (Tailwind class)</label>
                <input
                  type="text"
                  name="gradientTo"
                  id="gradientTo"
                  value={newTrendingTopic.gradientTo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ej: violet-500"
                />
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
                  Crear Trending Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Lista de Trending Topics</h2>
        {/* Display the list of trending topics */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Cargando trending topics...</p>
        ) : trendingTopics.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No hay trending topics creados aún.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {trendingTopics.map((topic) => (
              <li key={topic._id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Estadísticas: {topic.stats}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                       Gradiente: from-{topic.gradientFrom} to-{topic.gradientTo}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                       Creado: {topic.createdAt ? new Date(topic.createdAt).toLocaleString() : 'N/A'}
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