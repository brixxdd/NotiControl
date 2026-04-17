import { Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';

interface AdminNavbarProps {
  title?: string;
}

export const AdminNavbar = ({ title = 'Panel de administración' }: AdminNavbarProps) => {
  return (
    <header className="sticky top-0 z-40 bg-[var(--ios-bg-elev)] border-b border-[var(--ios-separator)]">
      <div className="flex justify-between items-center px-6 h-14">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-5 rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--ios-blue), var(--ios-yellow))' }}
          />
          <h1 className="text-[15px] font-semibold tracking-tight text-[color:var(--ios-label)]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--ios-fill)] transition-colors cursor-pointer"
            aria-label="Notificaciones"
          >
            <Bell size={17} className="text-[color:var(--ios-label-secondary)]" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2 ring-[var(--ios-bg-elev)]"
              style={{ background: 'var(--ios-yellow)' }}
            />
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-[12.5px] font-medium text-[color:var(--ios-label-secondary)] hover:bg-[var(--ios-fill)] hover:text-[color:var(--ios-label)] transition-colors"
          >
            <ExternalLink size={13} />
            Ver sitio
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-[var(--ios-separator)]">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'var(--ios-blue)' }}
            >
              A
            </div>
            <span className="text-[13px] font-medium text-[color:var(--ios-label)] hidden sm:block">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
