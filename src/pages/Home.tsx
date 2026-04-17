import { useState, useEffect } from 'react';
import { News } from '../types';
import { FeaturedNewsCarousel } from '../components/home/FeaturedNewsCarousel';
import { InspirationalSection } from '../components/home/InspirationalSection';
import { NewsSection } from '../components/home/NewsSection';
import { EventsSection } from '../components/home/EventsSection';
import { SocialSection } from '../components/home/SocialSection';
import { BulletinsSection } from '../components/home/BulletinsSection';

interface NewsItemWithId extends News {
  _id?: string;
}

interface FeaturedNewsItem
  extends Pick<NewsItemWithId, '_id' | 'id' | 'title' | 'content' | 'imageUrl' | 'category' | 'createdAt'> {
  featured: boolean;
}

interface HomeEventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category?: string;
  createdAt: string;
}

interface HomeBulletinItem {
  _id: string;
  folio: string;
  title: string;
  date: string;
  pdf?: string;
  image?: string;
  createdAt: string;
}

const NewsSkeleton = () => (
  <div className="ios-card p-6 sm:p-8 space-y-4">
    <div className="ios-skeleton h-6 w-40" />
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex gap-4 pt-2">
        <div className="ios-skeleton w-28 h-28 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="ios-skeleton h-4 w-20 rounded-full" />
          <div className="ios-skeleton h-5 w-full" />
          <div className="ios-skeleton h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export const Home = () => {
  const [news, setNews] = useState<NewsItemWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const [featuredNews] = useState<FeaturedNewsItem[]>([
    {
      id: '1',
      _id: 'local-1',
      title: 'Innovación en la Educación a Distancia',
      content:
        'Descubre nuestras nuevas plataformas y metodologías para el aprendizaje en línea, diseñadas para acercar a estudiantes y docentes en cualquier momento y lugar.',
      imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
      category: 'Académico',
      createdAt: new Date('2025-04-25'),
      featured: true,
    },
    {
      id: '2',
      _id: 'local-2',
      title: 'Charla Magistral: El Futuro de la IA',
      content:
        'Expertos internacionales compartirán sus visiones sobre los avances y desafíos de la Inteligencia Artificial en la educación moderna.',
      imageUrl:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
      category: 'Evento',
      createdAt: new Date('2025-04-26'),
      featured: true,
    },
    {
      id: '3',
      _id: 'local-3',
      title: 'Nueva Biblioteca Digital Disponible',
      content:
        'Accede a miles de recursos y libros electrónicos desde cualquier lugar con tu cuenta universitaria.',
      imageUrl:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1590&auto=format&fit=crop',
      category: 'Institucional',
      createdAt: new Date('2025-04-27'),
      featured: true,
    },
  ]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const r = await fetch('http://localhost:5000/api/news/');
        if (!r.ok) throw new Error(String(r.status));
        const data: NewsItemWithId[] = await r.json();
        setNews(data);
      } catch (e) {
        console.error('news fetch', e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const [events, setEvents] = useState<HomeEventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch('http://localhost:5000/api/events');
        if (!r.ok) throw new Error(String(r.status));
        const data: HomeEventItem[] = await r.json();
        setEvents(data);
      } catch (e) {
        console.error('events fetch', e);
      } finally {
        setEventsLoading(false);
      }
    };
    run();
  }, []);

  const [bulletins, setBulletins] = useState<HomeBulletinItem[]>([]);
  const [bulletinsLoading, setBulletinsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setBulletinsLoading(true);
        const r = await fetch('http://localhost:5000/api/bulletins');
        if (!r.ok) throw new Error(String(r.status));
        const data: HomeBulletinItem[] = await r.json();
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setBulletins(sorted);
      } catch (e) {
        console.error('bulletins fetch', e);
      } finally {
        setBulletinsLoading(false);
      }
    };
    run();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--ios-bg)]">
      <FeaturedNewsCarousel news={featuredNews} />

      <InspirationalSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {loading ? <NewsSkeleton /> : <NewsSection news={news} />}
            <EventsSection events={events} loading={eventsLoading} />
          </div>

          <div className="space-y-6 lg:space-y-8">
            <SocialSection />
            <BulletinsSection bulletins={bulletins} loading={bulletinsLoading} />
          </div>
        </div>
      </section>
    </main>
  );
};
