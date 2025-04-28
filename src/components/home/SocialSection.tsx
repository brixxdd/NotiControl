import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { SocialPost } from '../../types';
import { Link } from 'react-router-dom';

interface TrendingTopic {
  id: number;
  title: string;
  stats: string;
  gradient: {
    from: string;
    to: string;
  };
}

const trendingTopics: TrendingTopic[] = [
  {
    id: 1,
    title: "Semana Internacional de las Lenguas",
    stats: "+2.5k estudiantes participando",
    gradient: {
      from: "pink-500",
      to: "violet-500"
    }
  },
  {
    id: 2,
    title: "Hackathon Multilingüe 2025",
    stats: "48 horas de innovación",
    gradient: {
      from: "blue-500",
      to: "cyan-500"
    }
  },
  {
    id: 3,
    title: "Intercambio Cultural Virtual",
    stats: "Conectando 15 países",
    gradient: {
      from: "amber-500",
      to: "orange-500"
    }
  }
];

interface SocialSectionProps {
  posts: SocialPost[];
}

export const SocialSection = ({ posts }: SocialSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Redes Sociales</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <Link to={post.url} className="block">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {post.content.substring(0, 100)}...
              </h3>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.platform}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
