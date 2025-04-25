import { Home, PenTool, Calendar, BookOpen, Image, Settings, LogOut, Menu, X } from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  onSectionChange: (section: string) => void;
}

const MenuItem = ({ icon, text, isCollapsed, isActive, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} 
        px-3 py-3 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-gray-700 dark:bg-gray-800 text-white' 
          : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white'
        }
      `}
    >
      <div className={`flex items-center justify-center ${isCollapsed ? 'w-9 h-9' : 'w-10 h-10'}`}>
        {icon}
      </div>
      {!isCollapsed && <span className="ml-3 font-medium">{text}</span>}
    </button>
  );
};

export const Sidebar = ({ isOpen, activeSection, onToggle, onSectionChange }: SidebarProps) => {
  return (
    <aside 
      className={`
        fixed top-0 left-0 h-full bg-gray-800 dark:bg-gray-950 text-white
        transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      <div className="p-3">
        <button
          onClick={onToggle}
          className={`
            w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'}
            px-3 py-3 rounded-lg transition-all duration-200
            text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white
          `}
        >
          <div className={`flex items-center justify-center ${!isOpen ? 'w-9 h-9' : 'w-10 h-10'}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          {isOpen && <span className="ml-3 font-medium">Contraer menú</span>}
        </button>
      </div>

      <div className="mt-2 border-t border-gray-700 dark:border-gray-800" />

      <nav className="p-3 space-y-2">
        <MenuItem
          icon={<Home size={24} />}
          text="Dashboard"
          isCollapsed={!isOpen}
          isActive={activeSection === 'dashboard'}
          onClick={() => onSectionChange('dashboard')}
        />
        <MenuItem
          icon={<PenTool size={24} />}
          text="Noticias"
          isCollapsed={!isOpen}
          isActive={activeSection === 'articles'}
          onClick={() => onSectionChange('articles')}
        />
        <MenuItem
          icon={<Calendar size={24} />}
          text="Eventos"
          isCollapsed={!isOpen}
          isActive={activeSection === 'events'}
          onClick={() => onSectionChange('events')}
        />
        <MenuItem
          icon={<BookOpen size={24} />}
          text="Boletines"
          isCollapsed={!isOpen}
          isActive={activeSection === 'bulletins'}
          onClick={() => onSectionChange('bulletins')}
        />
        <MenuItem
          icon={<Image size={24} />}
          text="Galería"
          isCollapsed={!isOpen}
          isActive={activeSection === 'gallery'}
          onClick={() => onSectionChange('gallery')}
        />
        <MenuItem
          icon={<Settings size={24} />}
          text="Configuración"
          isCollapsed={!isOpen}
          isActive={activeSection === 'settings'}
          onClick={() => onSectionChange('settings')}
        />
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700 dark:border-gray-800">
        <button
          className={`
            w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'}
            px-3 py-3 rounded-lg transition-all duration-200
            text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white
          `}
          onClick={() => {/* Implementar cierre de sesión */}}
        >
          <div className={`flex items-center justify-center ${!isOpen ? 'w-9 h-9' : 'w-10 h-10'}`}>
            <LogOut size={24} />
          </div>
          {isOpen && <span className="ml-3 font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};
