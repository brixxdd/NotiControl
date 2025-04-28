import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, Event, Bulletin, SocialPost } from '../types';

interface ContentContextType {
  articles: Article[];
  events: Event[];
  bulletins: Bulletin[];
  socialPosts: SocialPost[];
  loading: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Aquí irían las llamadas a la API
      const [articlesRes, eventsRes, bulletinsRes, socialRes] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/events'),
        fetch('/api/bulletins'),
        fetch('/api/social-posts')
      ]);

      const [articlesData, eventsData, bulletinsData, socialData] = await Promise.all([
        articlesRes.json(),
        eventsRes.json(),
        bulletinsRes.json(),
        socialRes.json()
      ]);

      setArticles(articlesData);
      setEvents(eventsData);
      setBulletins(bulletinsData);
      setSocialPosts(socialData);
    } catch (err) {
      setError('Error al cargar el contenido');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{
      articles,
      events,
      bulletins,
      socialPosts,
      loading,
      error,
      fetchContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}; 