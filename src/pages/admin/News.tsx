import { useState, useEffect } from 'react'
import { News } from '../../types'
// import { v4 as uuidv4 } from 'uuid' // No longer needed as backend will generate ID

// Define a new interface extending News to include the MongoDB _id
interface NewsItemWithId extends News {
  _id?: string; // MongoDB uses _id, make it optional just in case
}

export const AdminNews = () => {
  const [news, setNews] = useState<NewsItemWithId[]>([]) // Use the new interface here
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNews, setNewNews] = useState<Partial<News>>({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    featured: false
  })

  // Fetch news from backend on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Replace with your backend API URL
        const response = await fetch('http://localhost:5000/api/news/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsItemWithId[] = await response.json(); // Cast data to the new interface array
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this runs only once on mount

  // Remove localStorage saving logic
  /*
  useEffect(() => {
    try {
      localStorage.setItem('adminNews', JSON.stringify(news));
    } catch (error) {
      console.error('Failed to save news to localStorage', error);
    }
  }, [news]);
  */

  const handleCreateNews = async () => {
    // Ensure required fields are not empty before sending to backend
    if (!newNews.title || !newNews.content || !newNews.imageUrl || !newNews.category) {
        // Basic frontend validation - backend should also validate
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    try {
      // Replace with your backend API URL
      const response = await fetch('http://localhost:5000/api/news/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNews), // Send the new news data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming backend returns a success message or the created news item
      // const result = await response.json();
      console.log('Noticia creada con éxito!');

      // After successful creation, fetch the updated list of news
      const updatedResponse = await fetch('http://localhost:5000/api/news/');
      if (!updatedResponse.ok) {
           throw new Error(`HTTP error! status: ${updatedResponse.status}`);
      }
      const updatedNews: NewsItemWithId[] = await updatedResponse.json(); // Cast data to the new interface array
      setNews(updatedNews);

      // Close modal and reset form
      setIsModalOpen(false);
      setNewNews({
        title: '',
        content: '',
        imageUrl: '',
        category: '',
        featured: false
      });

    } catch (error) {
      console.error('Error creating news:', error);
      alert('Hubo un error al crear la noticia.');
    }
  };

  // Keep handleDeleteNews for now, will update to call backend later
  const handleDeleteNews = (id: string) => {
    // setNews(news.filter(n => n.id !== id)); // This will be replaced by a backend call
    console.log(`Eliminar noticia con ID: ${id}. Implementar llamada al backend.`);
    // You'll add backend fetch/axios call here later
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Gestionar Noticias</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nueva Noticia
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl text-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Crear Nueva Noticia</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateNews(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Título</label>
                  <input
                    type="text"
                    value={newNews.title}
                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Contenido</label>
                  <textarea
                    value={newNews.content}
                    onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                    className="w-full border rounded p-2 h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">URL de la imagen</label>
                  <input
                    type="url"
                    value={newNews.imageUrl}
                    onChange={(e) => setNewNews({...newNews, imageUrl: e.target.value})}
                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Categoría</label>
                  <input
                    type="text"
                    value={newNews.category}
                    onChange={(e) => setNewNews({...newNews, category: e.target.value})}
                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newNews.featured}
                    onChange={(e) => setNewNews({...newNews, featured: e.target.checked})}
                    className="mr-2 dark:text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="text-gray-700 dark:text-gray-300">Destacada</label>
                </div>
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
                  Crear Noticia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-400">Título</th>
              <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-400">Categoría</th>
              <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-400">Fecha</th>
              <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-400">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item._id || item.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">{item.title}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">{item.category}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                  <button 
                    onClick={() => handleDeleteNews(item._id || item.id)} // Use item._id for deletion
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No hay noticias creadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 