import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
// Import the viewport debugger
import { debugLog, getViewportType } from '../../utils/viewportDebugger';
// Import the configuration
import { DEBUG_CONFIG } from '../../config';
// Import the enhanced toggle component and SidebarToggle
import AnimatedToggle from './AnimatedToggle';
import SidebarToggle from './SidebarToggle';
// Import the toggle CSS first, with correct relative path, to ensure it takes precedence
import './SidebarToggle.css';
import './AnimatedToggle.css';
import './Header.css';

// Icons
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiGlobe,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';

// Import additional filled icon sets for enhanced visual appeal
import { 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaTimes, 
  FaGlobe,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';

const Header = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  mobileMenuOpen,
  setMobileMenuOpen,
  languageMenuOpen,
  setLanguageMenuOpen
}) => {
  const { isDark, toggleTheme, language, changeLanguage } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isRtl = language === 'ar';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  
  const [, setViewportType] = useState(getViewportType());
  const isHomePage = location.pathname === '/' || location.pathname === '';
    // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newViewportType = getViewportType();
      const isMobile = newWidth <= 768;
        setWindowWidth(newWidth);
      setViewportType(newViewportType);
      
      // Enhanced logging for toggle button visibility (only if debug is enabled)
      if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.LOG_VIEWPORT_CHANGES) {
        console.group('%cHeader Toggle Visibility', 'font-weight: bold; color: #ff9800;');
        console.log('Viewport:', isMobile ? 'MOBILE' : 'DESKTOP', `(${newWidth}px)`);
        console.log('Sidebar Toggle Button:', isMobile ? 'HIDDEN' : 'VISIBLE');
        console.log('Mobile Menu Button:', 'VISIBLE');
        console.log('Sidebar Component:', isMobile ? 'NOT RENDERED' : 'RENDERED');
        console.groupEnd();
      }
      
      // Log detailed state with proper object formatting
      debugLog('Header', {
        viewportType: newViewportType,
        width: newWidth,
        isMobileView: isMobile,
        desktopToggleVisible: !isMobile,
        mobileToggleVisible: true,
        sidebarRendered: !isMobile
      });
    };
    
    // Call handler immediately to log initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if we've scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setLanguageMenuOpen(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigation links
  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('showroom'), path: '/showroom' },
    { name: t('howToUse'), path: '/how-to-use' },
    { name: t('controlCenter'), path: '/control-center' }
  ];

  const languages = [
    { code: 'en', label: t('english') },
    { code: 'fr', label: t('french') },
    { code: 'ar', label: t('arabic') }
  ];
  
  const MotionLi = motion.li;
    // Explicitly check if we're in mobile view to prevent rendering sidebar toggles
  const isMobile = windowWidth <= 768;
    return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isHomePage ? 'homepage-header' : ''}`}>
      <div className="header-container">
        <div className="header-left-section">
          {/* Only render the appropriate toggle based on viewport width and if not on homepage */}
          {isMobile || isHomePage ? (
            /* DO NOT render ANY sidebar toggle in mobile view or on homepage */
            null
          ) : (
            /* Only render desktop sidebar toggle in desktop view and not on homepage */
            <SidebarToggle
              isMobile={false}
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              isRtl={isRtl}
            />
          )}
          
          <Link to="/" className="logo-container">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VersatilesUI
            </motion.div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <MotionLi key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </MotionLi>
            ))}
          </ul>
        </nav>
        
        {/* Controls */}
        <div className="header-controls">          {/* Theme toggle with clear sun/moon icon */}
          <AnimatedToggle
            type="theme"
            icon={isDark ? "Fa:Sun" : "Fa:Moon"}
            isActive={true}
            onClick={() => {
              toggleTheme();
              debugLog('Header', { event: 'Theme toggle', theme: isDark ? 'Light' : 'Dark' });
            }}
            ariaLabel={isDark ? t('lightMode') : t('darkMode')}
            testId="theme-toggle"
            animationProps={{
              initial: { rotate: isDark ? -30 : 0 },
              animate: { rotate: 0 },
              transition: { duration: 0.5 }
            }}
            className={isDark ? "is-dark" : "is-light"}
            labelText={isDark ? t('lightMode') : t('darkMode')}
          />            {/* Language selector with globe icon and dropdown indicator */}
          <div className="lang-selector">
            <AnimatedToggle
              type="lang"
              icon="Fa:Globe"
              iconAlt="Fa:ChevronDown"
              isActive={languageMenuOpen}
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              ariaLabel={t('language')}
              className="lang-toggle"
              testId="language-toggle"
              labelText={t('language')}
            />
            
            {languageMenuOpen && (
              <motion.div 
                className="lang-dropdown"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {languages.map(lang => (
                  <button 
                    key={lang.code}                    onClick={() => {
                      changeLanguage(lang.code);
                      setLanguageMenuOpen(false);
                      debugLog('Header', { event: 'Language change', language: lang.code });
                    }}
                    className={language === lang.code ? 'active' : ''}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>            {/* Mobile menu button with hamburger/close icon transition */}
          <AnimatedToggle
            type="menu"
            icon="Fa:Bars"
            iconAlt="Fa:Times"
            isActive={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              // Only log if debugging is enabled
              if (DEBUG_CONFIG.ENABLED && DEBUG_CONFIG.LOG_BUTTON_STATES) {
                console.log('%cMobile MENU Toggle Button Clicked', 'color: #ff9800; font-weight: bold;',
                  { action: 'Toggle dropdown menu', state: !mobileMenuOpen ? 'open' : 'closed' });
                debugLog('Header', { 
                  event: 'Mobile dropdown menu toggle', 
                  state: !mobileMenuOpen ? 'open' : 'closed',
                  info: 'This controls the dropdown menu, NOT the sidebar'
                });              }
            }}
            ariaLabel={mobileMenuOpen ? t('close') : t('menu')}
            testId="mobile-menu-toggle"
            className="menu-toggle"
            data-control="dropdown-menu"
            labelText={mobileMenuOpen ? t('close') : t('menu')}
          />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav 
          className="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul>
            {navLinks.map((link) => (
              <MotionLi 
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navLinks.indexOf(link) }}
              >
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </MotionLi>
            ))}
            
            {/* Language options in mobile menu */}
            <MotionLi 
              className="mobile-lang-options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * navLinks.length }}
            >
              <div className="lang-title">{t('language')}</div>
              <div className="lang-buttons">
                {languages.map(lang => (
                  <button 
                    key={lang.code}                    onClick={() => {
                      changeLanguage(lang.code);
                      setMobileMenuOpen(false);
                      debugLog('Header', { event: 'Language change', language: lang.code });
                    }}
                    className={language === lang.code ? 'active' : ''}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </MotionLi>
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
