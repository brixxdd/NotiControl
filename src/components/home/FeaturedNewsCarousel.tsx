import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { News } from '../../types';

type FeaturedNews = Pick<News, 'id' | 'title' | 'content' | 'imageUrl' | 'createdAt'> & Partial<News>;

interface FeaturedNewsCarouselProps {
  news: FeaturedNews[];
}

export const FeaturedNewsCarousel = ({ news }: FeaturedNewsCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % news.length),
    [news.length],
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + news.length) % news.length),
    [news.length],
  );

  useEffect(() => {
    if (isHover || news.length <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isHover, next, news.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative pt-4 pb-8 sm:pt-8 sm:pb-12"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative h-[460px] sm:h-[540px] lg:h-[600px] rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] ios-reveal"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {news.map((item, index) => {
            const isActive = index === current;
            const offset = index - current;
            return (
              <div
                key={item.id}
                className="absolute inset-0 transition-all"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translate3d(${offset * 4}%, 0, 0) scale(${isActive ? 1 : 1.04})`,
                  transitionDuration: '1100ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                aria-hidden={!isActive}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 8s ease-out',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-6 sm:p-10 lg:p-14">
                    <div
                      className="max-w-3xl"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 700ms 200ms var(--ease-out-quart), transform 700ms 200ms var(--ease-out-quart)',
                      }}
                    >
                      {item.category && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-white/20 backdrop-blur-md text-white ring-1 ring-white/30 mb-4">
                          <Sparkles className="w-3 h-3" />
                          {item.category}
                        </span>
                      )}
                      <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-4">
                        {item.title}
                      </h2>
                      <p className="text-[15px] sm:text-lg text-white/85 max-w-2xl mb-6 leading-relaxed">
                        {item.content.substring(0, 160)}…
                      </p>
                      <button className="ios-btn bg-white !text-gray-900 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] hover:!bg-white">
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Controls — floating glass */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 z-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md ring-1 ring-white/25 text-white flex items-center justify-center transition-all duration-300 active:scale-90"
              aria-label="Anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md ring-1 ring-white/25 text-white flex items-center justify-center transition-all duration-300 active:scale-90"
              aria-label="Siguiente"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pill indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 flex gap-1.5 z-10">
            {news.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-500 bg-white/40 hover:bg-white/70"
                style={{
                  width: i === current ? 28 : 10,
                  backgroundColor: i === current ? 'rgba(255,255,255,0.95)' : undefined,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
