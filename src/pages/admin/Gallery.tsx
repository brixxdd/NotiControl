import { useState } from 'react'

export const AdminGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Gestionar Galería</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nueva Imagen
        </button>
      </div>
      
      {/* Modal para subir imagen */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Subir Nueva Imagen</h2>
            {/* Formulario del modal irá aquí */}
            <p className="text-gray-700 dark:text-gray-300">Aquí irá el formulario para subir una nueva imagen.</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Lista de Imágenes</h2>
        {/* Aquí irá la lista/cuadrícula de imágenes */}
        <p className="text-gray-500 dark:text-gray-400">Contenido de la galería de imágenes...</p>
      </div>
    </div>
  )
} 