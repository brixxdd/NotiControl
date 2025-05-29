import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define interface for Trending Topic data matching backend schema
interface TrendingTopicItem {
  _id: string; // MongoDB _id
  title: string;
  stats: string;
  gradientFrom: string;
  gradientTo: string;
  createdAt: string; // Assuming backend returns createdAt
}

export const SocialSection = () => {
  // State to hold trending topics fetched from backend
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopicItem[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Fetch trending topics from backend on component mount
  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/trending');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TrendingTopicItem[] = await response.json();
        // Limit to first 3 topics for display in this section
        setTrendingTopics(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching trending topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Trending Topics de la Semana */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending de la Semana
            </h2>
            {/* Show EN VIVO badge only if not loading and there are topics */}
            {!loading && trendingTopics.length > 0 && (
               <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full animate-pulse">
                 EN VIVO
               </span>
             )}
          </div>
          {loading ? (
             <p className="text-center text-gray-600 dark:text-gray-300">Cargando trending topics...</p>
           ) : trendingTopics.length === 0 ? (
             <p className="text-center text-gray-600 dark:text-gray-300">No hay trending topics disponibles.</p>
           ) : (
             <div className="space-y-4">
               {trendingTopics.map((topic, index) => (
                 <div key={topic._id} className="relative group">
                   {/* Use gradientFrom and gradientTo from fetched data with inline styles */}
                   <div 
                     className="absolute -inset-0.5 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
                     style={{ backgroundImage: `linear-gradient(to right, ${topic.gradientFrom}, ${topic.gradientTo})` }}
                   />
                   <a href="#" className="relative block p-4 bg-white dark:bg-gray-900 rounded-lg hover:transform hover:scale-[1.01] transition-all">
                     <div className="flex items-start gap-3">
                       {/* Use index + 1 for numbering, or consider adding a display order field in backend */}
                       <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                         style={{ backgroundImage: `linear-gradient(to bottom right, ${topic.gradientFrom}, ${topic.gradientTo})` }}
                       >
                         {index + 1}
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
           )}
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
              target="_blank"
              className="flex items-center justify-center p-4 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/share/18SRuQQ6sz/"
              target="_blank"
              className="flex items-center justify-center p-4 rounded-lg bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/escuela.lenguas.tapachula?igsh=MTVvNmtraGI3ZjN4eg=="
              target="_blank"
              className="flex items-center justify-center p-4 rounded-lg bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              target="_blank"
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
