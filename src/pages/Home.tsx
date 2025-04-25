import { useState } from 'react';
import { News } from '../types';
import { FeaturedNewsCarousel } from '../components/home/FeaturedNewsCarousel';
import { InspirationalSection } from '../components/home/InspirationalSection';
import { NewsSection } from '../components/home/NewsSection';
import { EventsSection } from '../components/home/EventsSection';
import { SocialSection } from '../components/home/SocialSection';
import { BulletinsSection } from '../components/home/BulletinsSection';

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

export const Home = () => {
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <FeaturedNewsCarousel news={featuredNews} />
      <InspirationalSection />
      
      {/* Grid de contenido principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal de noticias */}
          <div className="lg:col-span-2 space-y-8">
            <NewsSection news={featuredNews} />
            <EventsSection />
          </div>

          {/* Barra lateral */}
          <div className="space-y-8">
            <SocialSection />
            <BulletinsSection />
          </div>
        </div>
      </section>
    </main>
  );
};