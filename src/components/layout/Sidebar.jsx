import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

// Icons
import { 
  FiHome, 
  FiLayout, 
  FiCode, 
  FiSettings, 
  FiChevronRight,
  FiChevronLeft,
  FiMenu, 
  FiX
} from 'react-icons/fi';

const Sidebar = ({ mobileOpen, setMobileOpen, isCollapsed, setIsCollapsed }) => {
  const { language } = useTheme();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(isCollapsed || false);
  const isRtl = language === 'ar';
  
  // Sync internal collapsed state with parent component
  useEffect(() => {
    if (isCollapsed !== undefined && collapsed !== isCollapsed) {
      setCollapsed(isCollapsed);
    }
  }, [isCollapsed]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Sync parent component state when internal state changes
  useEffect(() => {
    if (setIsCollapsed) {
      setIsCollapsed(collapsed);
    }
  }, [collapsed, setIsCollapsed]);

  // Close mobile sidebar on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen, setMobileOpen]);

  // Navigation items with icons
  const navItems = [
    { 
      name: t('home'), 
      path: '/', 
      icon: <FiHome /> 
    },
    { 
      name: t('showroom'), 
      path: '/showroom', 
      icon: <FiLayout /> 
    },
    { 
      name: t('howToUse'), 
      path: '/how-to-use', 
      icon: <FiCode />
    },
    { 
      name: t('controlCenter'), 
      path: '/control-center', 
      icon: <FiSettings /> 
    }
  ];
  
  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '60px' },
  };
  // Render desktop sidebar content
  const renderDesktopSidebarContent = () => (
    <>
      <div className="sidebar-header">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-logo"
          >
            <span className="sidebar-logo-text">VersatilesUI</span>
          </motion.div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!collapsed && (
                  <motion.span 
                    className="sidebar-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
  
  // Render mobile sidebar content
  const renderMobileSidebarContent = () => (
    <>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileOpen(false)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <motion.span 
                  className="sidebar-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {item.name}
                </motion.span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );// For desktop sidebar
  const desktopSidebar = (
    <motion.aside 
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30
      }}
    >
      {renderDesktopSidebarContent()}
    </motion.aside>
  );
  
  // For mobile sidebar (overlay)
  const mobileSidebar = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div 
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside 
            className="sidebar mobile"
            initial={{ x: isRtl ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '100%' : '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mobile-sidebar-header">
              <div className="sidebar-logo">
                <span className="sidebar-logo-text">VersatilesUI</span>
              </div>
              <button 
                className="mobile-sidebar-close"
                onClick={() => setMobileOpen(false)}
                aria-label={t('close')}
              >
                <FiX />
              </button>
            </div>
            {renderMobileSidebarContent()}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
    // Log sidebar render info
  useEffect(() => {
    try {
      // Only log if debug mode is enabled
      if (localStorage.getItem('versatiles_debug') === 'true') {
        const viewportType = window.innerWidth <= 768 ? 'mobile' : 'desktop';
        console.group('%cSidebar Render', 'font-weight: bold; color: #9c27b0;');
        console.log('Viewport Type:', viewportType);
        console.log('Mobile Sidebar Open:', mobileOpen);
        console.log('Desktop Sidebar Collapsed:', collapsed);
        console.groupEnd();
      }
    } catch { /* ignore */ }
  }, [mobileOpen, collapsed]);

  return (
    <>
      {/* We're using dedicated toggle buttons in the Header component */}
      
      {/* Render appropriate sidebar based on screen size */}
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
