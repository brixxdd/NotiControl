import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Sidebar } from '../../components/admin/Sidebar'
import { AdminNavbar } from '../../components/admin/AdminNavbar'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Determina la sección activa según la URL (necesario para la sidebar y el título de la navbar)
  const getActiveSection = () => {
    if (location.pathname === '/admin') return 'dashboard'
    if (location.pathname.includes('/admin/noticias')) return 'articles'
    if (location.pathname.includes('/admin/eventos')) return 'events'
    if (location.pathname.includes('/admin/boletines')) return 'bulletins'
    if (location.pathname.includes('/admin/galeria')) return 'gallery'
    if (location.pathname.includes('/admin/configuracion')) return 'settings'
    return 'dashboard' // Default to dashboard
  }

  const getActiveTitle = () => {
    switch (getActiveSection()) { // Usar getActiveSection para determinar el título
      case 'dashboard':
        return 'Dashboard';
      case 'articles':
        return 'Gestión de Noticias';
      case 'events':
        return 'Gestión de Eventos';
      case 'bulletins':
        return 'Gestión de Boletines';
      case 'gallery':
        return 'Galería de Imágenes';
      case 'settings':
        return 'Configuración';
      default:
        return 'Panel de administración';
    }
  };

  const handleSectionChange = (section: string) => {
    switch (section) {
      case 'dashboard':
        navigate('/admin')
        break
      case 'articles':
        navigate('/admin/noticias')
        break
      case 'events':
        navigate('/admin/eventos')
        break
      case 'bulletins':
        navigate('/admin/boletines')
        break
      case 'gallery':
        navigate('/admin/galeria')
        break
      case 'settings':
        navigate('/admin/configuracion')
        break
      default:
        navigate('/admin')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-200"> {/* Contenedor principal */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={getActiveSection()}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onSectionChange={handleSectionChange}
      />

      {/* Main content area */}
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out overflow-y-auto {/* Added overflow-y-auto */}
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <AdminNavbar title={getActiveTitle()} /> {/* AdminNavbar aquí */}
        
        {/* Page content area with padding */}
        <div className="p-8"> {/* Padding alrededor del contenido de la ruta */}
           <Outlet /> {/* Aquí se renderizarán las rutas hijas (DashboardContent, AdminNews, etc.) */}
        </div>
      </main>
    </div>
  )
}
