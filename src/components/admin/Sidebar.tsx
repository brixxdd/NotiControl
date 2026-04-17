import { Home, PenTool, Calendar, BookOpen, Image, Settings, LogOut, Menu, X, TrendingUp, ChevronRight } from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
}

const MenuItem = ({ icon, label, collapsed, active, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`
      group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
      transition-all duration-200 cursor-pointer
      ${active
        ? 'bg-white/15 text-white'
        : 'text-white/60 hover:bg-white/8 hover:text-white/90'
      }
    `}
    style={active ? { boxShadow: '0 0 0 1px rgba(255,255,255,0.12)' } : undefined}
  >
    {active && (
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
        style={{ background: 'var(--ios-yellow)' }}
      />
    )}
    <span className={`flex-shrink-0 flex items-center justify-center ${collapsed ? 'mx-auto' : ''}`}>
      {icon}
    </span>
    {!collapsed && (
      <span className="text-[13.5px] font-medium tracking-tight flex-1 text-left">{label}</span>
    )}
    {!collapsed && active && (
      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
    )}
  </button>
);

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  onSectionChange: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',     icon: <Home size={18} /> },
  { id: 'articles',  label: 'Noticias',       icon: <PenTool size={18} /> },
  { id: 'events',    label: 'Eventos',        icon: <Calendar size={18} /> },
  { id: 'bulletins', label: 'Boletines',      icon: <BookOpen size={18} /> },
  { id: 'gallery',   label: 'Galería',        icon: <Image size={18} /> },
  { id: 'trending',  label: 'Trending',       icon: <TrendingUp size={18} /> },
  { id: 'settings',  label: 'Configuración',  icon: <Settings size={18} /> },
];

export const Sidebar = ({ isOpen, activeSection, onToggle, onSectionChange }: SidebarProps) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full flex flex-col
        transition-all duration-300 z-50 select-none
        ${isOpen ? 'w-56' : 'w-[60px]'}
      `}
      style={{ background: 'var(--ios-blue)' }}
    >
      {/* Brand */}
      <div className={`flex items-center gap-3 px-3 pt-5 pb-4 ${isOpen ? '' : 'justify-center'}`}>
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-white/20">
          <img src="/logo unach.png" alt="UNACH" className="h-6 w-auto object-contain" />
        </div>
        {isOpen && (
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-white leading-tight truncate">F. Negocios</p>
            <p className="text-[10px] text-white/50 leading-tight truncate">Campus IV</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-3 mb-3 h-px bg-white/10" />

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            collapsed={!isOpen}
            active={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 pt-2 border-t border-white/10 flex flex-col gap-0.5">
        <button
          onClick={() => {}}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/8 hover:text-white/80 transition-all duration-200 cursor-pointer"
          title={!isOpen ? 'Cerrar sesión' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {isOpen && <span className="text-[13.5px] font-medium">Cerrar sesión</span>}
        </button>

        {/* Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:bg-white/8 hover:text-white/70 transition-all duration-200 cursor-pointer"
          aria-label={isOpen ? 'Contraer menú' : 'Expandir menú'}
          title={!isOpen ? 'Expandir menú' : undefined}
        >
          {isOpen ? <X size={15} /> : <Menu size={15} className="mx-auto" />}
          {isOpen && <span className="text-[12px]">Contraer</span>}
        </button>
      </div>
    </aside>
  );
};
