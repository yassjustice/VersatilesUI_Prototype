import { createContext, useState, useEffect, useContext } from 'react';

// Theme context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentTheme, setCurrentTheme] = useState('aurora'); // First theme name: Aurora
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme) setIsDark(savedTheme === 'dark');
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) setLanguage(savedLanguage);
    
    const savedCurrentTheme = localStorage.getItem('current-theme');
    if (savedCurrentTheme) setCurrentTheme(savedCurrentTheme);
  }, []);
    // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme-mode', newTheme ? 'dark' : 'light');
    
    // Update data-mode attribute immediately for faster visual feedback
    document.documentElement.dataset.mode = newTheme ? 'dark' : 'light';
  };

  // Change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  
  // Change current theme
  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('current-theme', theme);
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        isDark, 
        toggleTheme, 
        language, 
        changeLanguage, 
        currentTheme, 
        changeTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
