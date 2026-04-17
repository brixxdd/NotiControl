import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';

export const InspirationalSection = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Ambient gradient blobs (iOS-like) */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 dark:opacity-20"
        style={{
          background:
            'radial-gradient(closest-side, var(--ios-blue), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 dark:opacity-15"
        style={{
          background:
            'radial-gradient(closest-side, var(--ios-purple), transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="ios-pill mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ios-blue)] ios-pulse" />
              Facultad de Lenguas
            </span>
            <h2 className="ios-large-title text-[color:var(--ios-label)] mb-5">
              Formando el futuro
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--ios-blue), var(--ios-purple))',
                }}
              >
                de las lenguas.
              </span>
            </h2>
            <p className="text-[17px] leading-relaxed text-[color:var(--ios-label-secondary)] mb-8 max-w-xl">
              No solo enseñamos idiomas. Formamos comunicadores globales que
              construyen puentes culturales y transforman el mundo.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="ios-btn">
                <GraduationCap className="w-4 h-4" />
                Explorar programas
              </button>
              <button className="ios-btn ios-btn-secondary">
                <MapPin className="w-4 h-4" />
                Nuestro campus
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] ring-1 ring-black/5 dark:ring-white/5">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjM0OTIyMzM1OWNiNjFhYjM1ZjFkYjM4MjBkYzM4ZWZhYTY4ZjE2ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPEqDGUULpEU0aQ/giphy.gif"
              alt="Innovación en lenguas"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--ios-red)] ios-pulse" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ios-red)]" />
                </span>
                <span className="text-[13px] font-semibold tracking-wide">EN VIVO</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[12px] font-medium ring-1 ring-white/25">
                Innovación
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
