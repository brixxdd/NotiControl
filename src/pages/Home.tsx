import { useState, useEffect } from 'react'; // Import useEffect
import { News } from '../types';
import { FeaturedNewsCarousel } from '../components/home/FeaturedNewsCarousel';
import { InspirationalSection } from '../components/home/InspirationalSection';
import { NewsSection } from '../components/home/NewsSection';
import { EventsSection } from '../components/home/EventsSection';
import { SocialSection } from '../components/home/SocialSection';
import { BulletinsSection } from '../components/home/BulletinsSection';

// Define a type that includes the MongoDB _id, similar to AdminNews
interface NewsItemWithId extends News {
  _id?: string; // MongoDB uses _id
}

// Define a type for featured news items for the carousel (can be a subset of NewsItemWithId)
interface FeaturedNewsItem extends Pick<NewsItemWithId, '_id' | 'id' | 'title' | 'content' | 'imageUrl' | 'category' | 'createdAt'> {
    featured: boolean; // Explicitly indicate it's featured
}

export const Home = () => {
  // State to hold all news fetched from backend (for NewsSection)
  const [news, setNews] = useState<NewsItemWithId[]>([]);
  // State to hold loading status for main news section
  const [loading, setLoading] = useState(true);

  // State to hold hardcoded featured news for the carousel
  const [featuredNews, setFeaturedNews] = useState<FeaturedNewsItem[]>([
      {
        id: "1",
         _id: "local-1",
        title: "Innovación en la Educación a Distancia",
        content: "Descubre nuestras nuevas plataformas y metodologías para el aprendizaje en línea...",
        imageUrl: "https://elmontonero.pe/upload/uploads_images/editorial_educacion_52.jpg",
        category: "académico",
        createdAt: new Date("2025-04-25"),
        featured: true,
      },
      {
        id: "2",
         _id: "local-2",
        title: "Charla Magistral: El Futuro de la IA",
        content: "Expertos internacionales compartirán sus visiones sobre los avances y desafíos de la Inteligencia Artificial...",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "evento",
        createdAt: new Date("2025-04-26"),
        featured: true,
      },
      {
        id: "3",
         _id: "local-3",
        title: "Nueva Biblioteca Digital Disponible",
        content: "Accede a miles de recursos y libros electrónicos desde cualquier lugar con tu cuenta universitaria...",
        imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1590&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "institucional",
        createdAt: new Date("2025-04-27"),
        featured: true,
      },
  ]);

  // Fetch all news from backend on component mount for the main NewsSection
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsItemWithId[] = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news for main section:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // This effect is specifically for the main news list

  // Note: The featuredNews state uses hardcoded data for the carousel for now.
  // In a real app, you might filter the fetched 'news' data or have a separate API endpoint for featured news.

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Featured News Carousel - uses local hardcoded data */}
      <FeaturedNewsCarousel news={featuredNews} />
      
      <InspirationalSection />
      
      {/* Grid de contenido principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal de noticias (obtenidas del backend) */}
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              <p className="text-center text-gray-600 dark:text-gray-300">Cargando noticias...</p>
            ) : (
              // Main News Section - uses data from backend
              <NewsSection news={news} />
            )}
            {/* Events Section - will need to fetch its own data */}
            <EventsSection />
          </div>

          {/* Barra lateral */}
          <div className="space-y-8">
            <SocialSection />
            {/* Bulletins Section - will need to fetch data */}
            <BulletinsSection />
          </div>
        </div>
      </section>
    </main>
  );
};