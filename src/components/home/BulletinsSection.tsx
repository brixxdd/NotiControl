import { ArrowRight } from 'lucide-react';
import { Bulletin } from '../../types';
import { Link } from 'react-router-dom';

interface BulletinsSectionProps {
  bulletins: Bulletin[];
}

export const BulletinsSection = ({ bulletins }: BulletinsSectionProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Boletines</h2>
      <div className="space-y-6">
        {bulletins.map((bulletin) => (
          <article key={bulletin.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <Link to={bulletin.fileUrl} className="block">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {bulletin.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {bulletin.description.substring(0, 150)}...
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(bulletin.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{bulletin.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
