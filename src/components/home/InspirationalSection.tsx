import { ArrowUpRight, Eye, GraduationCap, MapPin, Target } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';

export const InspirationalSection = () => {
  const ref = useReveal<HTMLDivElement>();
  const mvRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Ambient gradient blobs */}
        <div
          aria-hidden
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 dark:opacity-20"
          style={{ background: 'radial-gradient(closest-side, var(--ios-blue), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 dark:opacity-15"
          style={{ background: 'radial-gradient(closest-side, var(--ios-purple), transparent 70%)' }}
        />

        <div
          ref={ref}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="ios-pill mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ios-blue)] ios-pulse" />
                Facultad de Negocios Campus IV
              </span>
              <h2 className="ios-large-title text-[color:var(--ios-label)] mb-5">
                Formando el futuro
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, var(--ios-blue), var(--ios-yellow))' }}
                >
                  de los negocios.
                </span>
              </h2>
              <p className="text-[17px] leading-relaxed text-[color:var(--ios-label-secondary)] mb-8 max-w-xl">
                Formamos profesionistas con valores éticos en contaduría y sistemas,
                capaces de innovar en un mundo competitivo y globalizado.
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
                alt="Facultad de Negocios Campus IV"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-[var(--ios-green)] ios-pulse" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ios-green)]" />
                  </span>
                  <span className="text-[13px] font-semibold tracking-wide">CAMPUS IV</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[12px] font-medium ring-1 ring-white/25">
                  Tapachula, Chiapas
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-14 sm:py-20">
        <div
          ref={mvRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Misión */}
            <div className="ios-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--ios-blue), var(--ios-yellow))' }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="ios-title text-[color:var(--ios-label)]">Misión</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[color:var(--ios-label-secondary)]">
                Formar personas con altos valores éticos y humanos en las disciplinas de
                contaduría y de sistemas, capaces de analizar y resolver creativamente los
                cambios generados en un mundo competitivo y globalizado; así como generar
                y difundir el conocimiento en estas áreas y la cultura.
              </p>
            </div>

            {/* Visión */}
            <div className="ios-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--ios-purple), var(--ios-yellow))' }}>
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="ios-title text-[color:var(--ios-label)]">Visión</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-[color:var(--ios-label-secondary)]">
                Ser líder como escuela de negocios de la frontera sur, con programas de
                estudios acreditados, formando profesionistas de alto nivel que promuevan
                el desarrollo económico y social, basado en una cultura sustentable,
                contando con infraestructura adecuada y tecnología de punta para la
                docencia, investigación y divulgación de la ciencia, la cultura y la
                práctica deportiva y comprometida a través de la extensión con una
                sociedad dinámica y participativa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
