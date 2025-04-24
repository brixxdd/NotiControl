import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { News } from '../types'

export const NewsDetail = () => {
  const { id } = useParams()
  const [news, setNews] = useState<News | null>(null)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {news ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <img src={news.imageUrl} alt={news.title} className="w-full h-96 object-cover rounded-lg mb-8" />
          <div className="prose max-w-none">
            {news.content}
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </main>
  )
} 