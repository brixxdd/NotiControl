import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { Home } from './pages/Home'
import { News } from './pages/News'
import { NewsDetail } from './pages/NewsDetail'
import AdminDashboard from './pages/admin/Dashboard'
import { Login } from './pages/Login'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

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
            <Route
              path="/admin/*"
              element={<AdminDashboard />}
            />
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