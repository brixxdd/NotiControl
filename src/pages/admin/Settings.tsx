import { useState } from 'react'

export const AdminSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Configuración del Sitio</h1>
        {/* No hay botón para "nueva" configuración aquí típicamente */}
      </div>
      
      {/* Podría haber modales para sub-configuraciones si fuera necesario */}
      {/* {isModalOpen && ( ... )} */}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Opciones Generales</h2>
        {/* Aquí irán los formularios y opciones de configuración */}
        <p className="text-gray-500 dark:text-gray-400">Contenido de las opciones de configuración...</p>
      </div>
    </div>
  )
} 