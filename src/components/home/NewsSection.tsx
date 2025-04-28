import { Article } from '../../types';
import { Link } from 'react-router-dom';

interface NewsSectionProps {
  articles: Article[];
}

export const NewsSection = ({ articles }: NewsSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Últimas Noticias</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <Link to={`/noticias/${article.id}`} className="block">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.content.substring(0, 150)}...
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{article.author}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
