import { Facebook, Flame, Instagram, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface TrendingTopicItem {
  _id: string;
  title: string;
  stats: string;
  gradientFrom: string;
  gradientTo: string;
  createdAt: string;
}

const SOCIALS = [
  {
    href: '#',
    label: 'Twitter',
    Icon: Twitter,
    color: '#1DA1F2',
  },
  {
    href: 'https://www.facebook.com/share/18SRuQQ6sz/',
    label: 'Facebook',
    Icon: Facebook,
    color: '#4267B2',
  },
  {
    href: '#',
    label: 'Instagram',
    Icon: Instagram,
    color: '#E4405F',
  },
  {
    href: '#',
    label: 'YouTube',
    Icon: Youtube,
    color: '#FF0000',
  },
];

export const SocialSection = () => {
  const [topics, setTopics] = useState<TrendingTopicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const trendingRef = useReveal<HTMLDivElement>();
  const socialRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/trending');
        if (!res.ok) throw new Error(String(res.status));
        const data: TrendingTopicItem[] = await res.json();
        setTopics(data.slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="space-y-6">
      {/* Trending */}
      <section ref={trendingRef} className="reveal-on-scroll">
        <div className="ios-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{
                  background:
                    'linear-gradient(135deg, var(--ios-pink), var(--ios-orange))',
                }}
              >
                <Flame className="w-4 h-4" />
              </div>
              <h2 className="text-[19px] font-bold text-[color:var(--ios-label)] tracking-tight">
                Trending
              </h2>
            </div>
            {!loading && topics.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold bg-[var(--ios-red)]/10 text-[var(--ios-red)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ios-red)] ios-pulse" />
                EN VIVO
              </span>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="ios-skeleton h-14 rounded-2xl" />
              ))}
            </div>
          ) : topics.length === 0 ? (
            <p className="text-[14px] text-[color:var(--ios-label-tertiary)] text-center py-4">
              Sin trending disponible.
            </p>
          ) : (
            <ul className="space-y-2">
              {topics.map((topic, i) => (
                <li
                  key={topic._id}
                  style={{
                    animation: `ios-reveal 700ms ${i * 70}ms var(--ease-out-quart) both`,
                  }}
                >
                  <a
                    href="#"
                    className="group flex items-center gap-3 p-3 rounded-2xl bg-[var(--ios-fill)] hover:bg-[var(--ios-fill-hover)] transition-all active:scale-[0.98]"
                  >
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[15px] shadow-sm"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${topic.gradientFrom}, ${topic.gradientTo})`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-[color:var(--ios-label)] leading-snug line-clamp-1 group-hover:text-[var(--ios-blue)] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-[12px] text-[color:var(--ios-label-tertiary)] mt-0.5">
                        {topic.stats}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Social */}
      <section ref={socialRef} className="reveal-on-scroll">
        <div className="ios-card p-6">
          <h2 className="text-[19px] font-bold text-[color:var(--ios-label)] tracking-tight mb-1">
            Síguenos
          </h2>
          <p className="text-[13px] text-[color:var(--ios-label-tertiary)] mb-5">
            Mantente al día en nuestras redes.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {SOCIALS.map(({ href, Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="aspect-square flex items-center justify-center rounded-2xl bg-[var(--ios-fill)] hover:bg-[var(--ios-fill-hover)] transition-all duration-300 active:scale-90 group"
              >
                <Icon
                  className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                  style={{ color }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
