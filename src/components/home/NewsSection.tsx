import { Clock, ArrowRight } from 'lucide-react';
import { News } from '../../types';

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

interface NewsSectionProps {
  news: FeaturedNews[];
}

export const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Últimas Noticias
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {news.map((item) => (
            <article key={item.id} className="py-6 first:pt-0 last:pb-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.content.substring(0, 150)}...
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {item.createdAt.toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
        <a href="/noticias" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
          Ver todas las noticias
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
