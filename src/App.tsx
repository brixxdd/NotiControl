import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import './App.css';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ThemeProvider>
      <ContentProvider>
        <div className="min-h-screen transition-colors duration-200">
          <Router>
            <Navbar onMenuClick={toggleMobileMenu} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </ContentProvider>
    </ThemeProvider>
  );
};

export default App;