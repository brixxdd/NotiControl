import { useState } from 'react'
import { News } from '../../types'

export const AdminNews = () => {
  const [news, setNews] = useState<News[]>([])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionar Noticias</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Nueva Noticia
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Título</th>
              <th className="px-6 py-3 text-left">Categoría</th>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irá la lista de noticias */}
          </tbody>
        </table>
      </div>
    </div>
  )
} 