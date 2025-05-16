/**
 * SidebarToggle.jsx
 * A dedicated component for sidebar toggle buttons that handles
 * viewport-based visibility and includes debugging information
 * 
 * IMPORTANT: This component should NOT be rendered in mobile view
 * It should only be used for desktop sidebar toggle. Mobile view should
 * not have any sidebar toggle buttons at all.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { debugLog, getViewportType } from '../../utils/viewportDebugger';
import AnimatedToggle from './AnimatedToggle';

// Import toggle styles
import './AnimatedToggle.css';
import './SidebarToggle.css';

/**
 * SidebarToggle component handles both desktop and mobile toggle buttons
 * with visibility controlled by CSS media queries and debug information
 */
const SidebarToggle = ({
  isMobile,
  isCollapsed,
  isOpen,
  onToggle,
  isRtl
}) => {
  const { t } = useTranslation();
  const [viewportType, setViewportType] = useState(getViewportType());
  
  // Track viewport for debugging purposes
  useEffect(() => {
    const handleResize = () => {
      const newViewportType = getViewportType();
      
      if (newViewportType !== viewportType) {
        setViewportType(newViewportType);
        
        // Log viewport change and button visibility
        debugLog('SidebarToggle', {
          'Viewport Changed': `${viewportType} → ${newViewportType}`,
          'Window Width': `${window.innerWidth}px`,
          'Button Type': isMobile ? 'Mobile' : 'Desktop',
          'Should Be Visible': newViewportType === (isMobile ? 'mobile' : 'desktop'),
          'Toggle State': isMobile 
            ? (isOpen ? 'Open' : 'Closed')
            : (isCollapsed ? 'Collapsed' : 'Expanded')
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewportType, isMobile, isCollapsed, isOpen]);
  
  // Log button usage
  const handleToggle = () => {
    debugLog('SidebarToggle', {
      'Button Clicked': isMobile ? 'Mobile Toggle' : 'Desktop Toggle',
      'Previous State': isMobile 
        ? (isOpen ? 'Open' : 'Closed')
        : (isCollapsed ? 'Collapsed' : 'Expanded'),
      'New State': isMobile 
        ? (isOpen ? 'Closed' : 'Open')
        : (isCollapsed ? 'Expanded' : 'Collapsed')
    });
    
    onToggle();
  };
    // Check if the current viewport matches the button type 
  // Mobile buttons only in mobile view, desktop buttons only in desktop view
  const currentViewportType = getViewportType();
  const shouldRender = isMobile ? 
    (currentViewportType === 'mobile') : 
    (currentViewportType === 'desktop');

  // Log rendering decision
  console.log(`%cSidebarToggle ${isMobile ? 'Mobile' : 'Desktop'}`, 
    `color: ${shouldRender ? 'green' : 'red'};`, 
    shouldRender ? 'RENDERING' : 'NOT RENDERING',
    `(viewport: ${currentViewportType})`
  );

  // Skip rendering completely if not in the right viewport
  if (!shouldRender) {
    return null;
  }
    if (isMobile) {
    // Mobile toggle button - enhanced with AnimatedToggle and clearer menu icon
    return (
      <AnimatedToggle
        type="menu"
        icon="Fa:Bars"
        iconAlt="Fa:Times"
        isActive={isOpen}
        onClick={handleToggle}
        ariaLabel={isOpen ? t('closeSidebar') : t('openSidebar')}
        testId="sidebar-mobile-toggle"
        className="sidebar-mobile-toggle"
        data-viewport="mobile"
        labelText={isOpen ? t('closeSidebar') : t('openSidebar')}
      />
    );
  } else {
    // Desktop toggle button - enhanced with AnimatedToggle and directional arrows
    return (
      <AnimatedToggle
        type="sidebar"
        icon={isRtl ? 
          (isCollapsed ? "Fa:ChevronLeft" : "Fa:ChevronRight") :
          (isCollapsed ? "Fa:ChevronRight" : "Fa:ChevronLeft")
        }
        isActive={!isCollapsed}
        onClick={handleToggle}
        ariaLabel={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
        labelText={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
        testId="sidebar-desktop-toggle"
        className={`sidebar-menu-toggle ${isCollapsed ? 'collapsed' : ''}`}
        data-viewport="desktop"        animationProps={{
          initial: { scale: 1 },
          animate: { scale: 1 },
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 }
        }}
      />
    );
  }
};

export default SidebarToggle;
