import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const QUICK_LINKS = [
  'Programas Académicos',
  'Admisiones',
  'Investigación',
  'Biblioteca',
  'Campus Virtual',
];

const LEGAL = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
  { label: 'Mapa del sitio', href: '#' },
];

export const Footer = () => {
  return (
    <footer className="relative bg-[var(--ios-bg)] border-t border-[var(--ios-separator)] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-[22px] font-bold tracking-tight text-[color:var(--ios-label)] mb-2">
              Facultad de Lenguas
            </h3>
            <p className="text-[14px] leading-relaxed text-[color:var(--ios-label-secondary)] mb-5 max-w-xs">
              Formando profesionales en lenguas y comunicación intercultural
              desde 1985.
            </p>
            <button className="ios-btn">
              Contactar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[color:var(--ios-label-tertiary)] mb-4">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 text-[14px] text-[color:var(--ios-label-secondary)] hover:text-[color:var(--ios-label)] transition-colors"
                  >
                    <span className="w-0 h-[2px] rounded-full bg-[var(--ios-blue)] transition-all duration-300 group-hover:w-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[color:var(--ios-label-tertiary)] mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-[14px] text-[color:var(--ios-label-secondary)]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--ios-blue)]" />
                <span>
                  Blvd. Belisario Domínguez km. 1081
                  <br />
                  Tuxtla Gutiérrez, Chiapas
                </span>
              </li>
              <li>
                <a
                  href="mailto:lenguas@unach.mx"
                  className="flex items-center gap-2.5 text-[14px] text-[color:var(--ios-label-secondary)] hover:text-[var(--ios-blue)] transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-[var(--ios-blue)]" />
                  lenguas@unach.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+529616150440"
                  className="flex items-center gap-2.5 text-[14px] text-[color:var(--ios-label-secondary)] hover:text-[var(--ios-blue)] transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-[var(--ios-blue)]" />
                  (961) 615 0440
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[color:var(--ios-label-tertiary)] mb-4">
              Boletín
            </h4>
            <p className="text-[14px] text-[color:var(--ios-label-secondary)] mb-4">
              Recibe novedades en tu correo.
            </p>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[var(--ios-fill)] text-[14px] text-[color:var(--ios-label)] placeholder-[color:var(--ios-label-tertiary)] border border-transparent focus:border-[var(--ios-blue)] focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--ios-blue)] text-white transition-all duration-300 active:scale-90 hover:brightness-110"
                aria-label="Suscribirse"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center gap-2 mt-6">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--ios-fill)] hover:bg-[var(--ios-fill-hover)] text-[color:var(--ios-label-secondary)] hover:text-[color:var(--ios-label)] transition-all active:scale-90"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[var(--ios-separator)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-[color:var(--ios-label-tertiary)]">
            © {new Date().getFullYear()} Facultad de Lenguas UNACH. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[12.5px] text-[color:var(--ios-label-tertiary)] hover:text-[color:var(--ios-label)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
