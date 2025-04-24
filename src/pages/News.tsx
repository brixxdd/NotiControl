import { useState } from 'react'
import { News as NewsType } from '../types'

export const News = () => {
  const [news, setNews] = useState<NewsType[]>([])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Noticias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aquí irán las tarjetas de noticias */}
      </div>
    </main>
  )
} 