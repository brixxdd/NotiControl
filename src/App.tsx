import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { Home } from './pages/Home'
import { News } from './pages/News'
import { NewsDetail } from './pages/NewsDetail'
import AdminLayout from './pages/admin/AdminLayout'
import { Login } from './pages/Login'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'
import { AdminNews } from './pages/admin/News'
import { DashboardContent } from './pages/admin/Dashboard'
import { AdminEvents } from './pages/admin/Events'
import { AdminBulletins } from './pages/admin/Bulletins'
import { AdminGallery } from './pages/admin/Gallery'
import { AdminSettings } from './pages/admin/Settings'
import { AdminTrending } from './pages/admin/Trending'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Routes>
            {/* Rutas públicas */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <div className="flex-1">
                    <Home />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/noticias"
              element={
                <>
                  <Navbar />
                  <div className="flex-1">
                    <News />
                  </div>
                  <Footer />
                </>
              }
            />
            <Route
              path="/noticias/:id"
              element={
                <>
                  <Navbar />
                  <div className="flex-1">
                    <NewsDetail />
                  </div>
                  <Footer />
                </>
              }
            />
            {/* Rutas admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardContent />} />
              <Route path="noticias" element={<AdminNews />} />
              <Route path="eventos" element={<AdminEvents />} />
              <Route path="boletines" element={<AdminBulletins />} />
              <Route path="galeria" element={<AdminGallery />} />
              <Route path="configuracion" element={<AdminSettings />} />
              <Route path="trending" element={<AdminTrending />} />
            </Route>
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App