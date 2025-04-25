import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { News } from '../../types';

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

interface FeaturedNewsCarouselProps {
  news: FeaturedNews[];
}

export const FeaturedNewsCarousel = ({ news }: FeaturedNewsCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] overflow-hidden">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-all duration-500 transform ${
            index === currentSlide 
              ? 'opacity-100 translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white mb-4">
                {item.category}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                {item.title}
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                {item.content.substring(0, 150)}...
              </p>
              <button className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-medium transition-colors inline-flex items-center group">
                Leer más
                <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Controles del carrusel */}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                className={`w-8 h-1 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
