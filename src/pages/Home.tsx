import { useContent } from '../context/ContentContext';
import { NewsSection } from '../components/home/NewsSection';
import { SocialSection } from '../components/home/SocialSection';
import { BulletinsSection } from '../components/home/BulletinsSection';
import { EventsSection } from '../components/home/EventsSection';

export const Home = () => {
  const { articles, events, bulletins, socialPosts, loading, error } = useContent();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          <NewsSection articles={articles} />
          <EventsSection events={events} />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <SocialSection posts={socialPosts} />
          <BulletinsSection bulletins={bulletins} />
        </div>
      </div>
    </div>
  );
};