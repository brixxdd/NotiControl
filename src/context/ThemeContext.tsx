import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      console.log("ThemeContext: Initial theme from localStorage:", savedTheme); // Log inicial
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log("ThemeContext: Initial theme from system preference:", systemPrefersDark ? 'dark' : 'light'); // Log inicial
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    console.log("ThemeContext: Effect triggered, theme is now:", theme); // Log del efecto

    // Update document class and localStorage when theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    console.log("ThemeContext: Class on html:", document.documentElement.classList.contains('dark') ? 'dark' : 'light'); // Verifica clase actual
    console.log("ThemeContext: LocalStorage theme:", localStorage.getItem('theme')); // Verifica localStorage actual

  }, [theme]); // Dependency array includes 'theme'

  // Vamos a hacer una pequeña modificación para asegurar la referencia de la función
  const toggleTheme = () => {
    console.log('ThemeContext: toggleTheme called!'); // Log de la función

    // Usamos la forma de callback para garantizar el estado más reciente
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`ThemeContext: Toggling from ${prevTheme} to ${newTheme}`); // Log del toggle
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
