import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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

export const SocialSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Trending Topics de la Semana */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending de la Semana
            </h2>
            <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full animate-pulse">
              EN VIVO
            </span>
          </div>
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${topic.gradient.from} to-${topic.gradient.to} rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`} />
                <a href="#" className="relative block p-4 bg-white dark:bg-gray-900 rounded-lg hover:transform hover:scale-[1.01] transition-all">
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-${topic.gradient.from} to-${topic.gradient.to} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {topic.id}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {topic.stats}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Síguenos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex items-center justify-center p-4 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center p-4 rounded-lg bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center p-4 rounded-lg bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center p-4 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 text-[#FF0000] transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
