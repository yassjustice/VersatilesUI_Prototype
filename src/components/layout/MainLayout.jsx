import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DebugPanel from './DebugPanel';
import DebugControls from './DebugControls';
import { useTheme } from '../../context/ThemeContext';
import { applyThemeToDocument, getCurrentTheme } from '../../utils/themeUtils';
import { DEBUG_CONFIG } from '../../config';
import './MainLayout.css';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const { isDark, language, currentTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const isHomePage = location.pathname === '/' || location.pathname === '';
  // Apply theme whenever theme props change
  useEffect(() => {
    const theme = getCurrentTheme(currentTheme, isDark);
    applyThemeToDocument(theme, language);
  }, [currentTheme, isDark, language]);

  // Page transition effect
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };  // Close mobile sidebar and all menus on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
    setMobileMenuOpen(false);
    setLanguageMenuOpen(false);
  }, [location]);
    // Track viewport size to determine mobile vs desktop view
  useEffect(() => {    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobileView(mobileView);
      
      // Log viewport change (only if debugging is enabled)
      if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.LOG_VIEWPORT_CHANGES) {
        console.log('%cViewport Change', 'font-weight: bold; color: #2196f3;', {
          viewportType: mobileView ? 'MOBILE' : 'DESKTOP',
          width: `${window.innerWidth}px`,
          sidebarShouldRender: !mobileView
        });
      }
      
      // If switching to mobile view, ensure sidebar is closed
      if (mobileView && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileSidebarOpen]);

  // Handle body scroll lock when mobile sidebar is open
  useEffect(() => {
    // This prevents the background content from scrolling when the sidebar is open on mobile
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Clean up by restoring scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileSidebarOpen]);
    return (
    <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''} ${isHomePage ? 'homepage-layout' : ''}`}>
      <Header 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        languageMenuOpen={languageMenuOpen}
        setLanguageMenuOpen={setLanguageMenuOpen}
      />
      {/* Only render the Sidebar component in desktop view and not on homepage */}
      {!isMobileView && !isHomePage && (
        <Sidebar 
          mobileOpen={mobileSidebarOpen} 
          setMobileOpen={setMobileSidebarOpen} 
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />
      )}{/* Debug panel - only render if enabled in config */}
      {DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.SHOW_DEBUG_PANEL && (
        <DebugPanel
          sidebarCollapsed={sidebarCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          themeState={isDark ? 'dark' : 'light'}
          languageMenuOpen={languageMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      )}
        <main className={`main-content ${isHomePage ? 'homepage-content' : ''}`}>
        <motion.div 
          className={`page-container ${isHomePage ? 'homepage-container' : ''}`}
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      
      {/* Debug controls for developers - always rendered but only shows toggle button by default */}
      <DebugControls />
    </div>
  );
};

export default MainLayout;
