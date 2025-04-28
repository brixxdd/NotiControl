import { useState } from 'react';
import { News } from '../types';

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

export const useNewsData = () => {
  const [featuredNews] = useState<FeaturedNews[]>([
    {
      id: "1",
      title: "Nueva acreditación para la facultad",
      content: "La Facultad de Lenguas ha recibido una nueva acreditación internacional que reconoce la calidad de sus programas académicos...",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
      category: "institucional",
      createdAt: new Date("2025-04-24"),
      updatedAt: new Date("2025-04-24"),
      featured: true,
    },
    {
      id: "2",
      title: "Inscripciones abiertas para el nuevo semestre",
      content: "Las inscripciones para el semestre 2025-2 están abiertas. Los estudiantes pueden realizar su proceso de inscripción a través del portal web...",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
      category: "académico",
      createdAt: new Date("2025-04-23"),
      updatedAt: new Date("2025-04-23"),
      featured: true,
    }
  ]);

  return { featuredNews };
};

export const NewsDetail = () => {
  const { featuredNews } = useNewsData();
  const newsId = window.location.pathname.split('/').pop();
  const news = featuredNews.find(n => n.id === newsId);

  if (!news) {
    return <div>Noticia no encontrada</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="aspect-video w-full mb-8 rounded-2xl overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {news.category}
          </span>
          <time className="text-gray-500">
            {news.createdAt.toLocaleDateString()}
          </time>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          {news.title}
        </h1>
      </header>

      <div className="prose prose-lg max-w-none">
        <p>{news.content}</p>
      </div>
    </article>
  );
};