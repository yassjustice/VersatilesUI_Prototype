/**
 * DebugPanel.jsx
 * A floating debug panel component that shows information about
 * viewport size, sidebar state, and current toggle button visibility
 */

import React, { useState, useEffect } from 'react';
import { getViewportType, toggleDebugMode } from '../../utils/viewportDebugger';
import { DEBUG_CONFIG } from '../../config';
import './DebugPanel.css';

const DebugPanel = ({ 
  sidebarCollapsed, 
  mobileSidebarOpen,
  themeState,
  languageMenuOpen,
  mobileMenuOpen
}) => {
  // If debugging is disabled in the config, don't render anything
  if (!DEBUG_CONFIG.ENABLED) return null;
  
  const [viewportType, setViewportType] = useState(getViewportType());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [debugEnabled, setDebugEnabled] = useState(DEBUG_CONFIG.ENABLED);
  const [buttonStates, setButtonStates] = useState({
    theme: {visible: true, state: themeState || 'light'},
    sidebar: {visible: windowWidth > 768, state: sidebarCollapsed ? 'collapsed' : 'expanded'},
    mobileMenu: {visible: windowWidth <= 768, state: mobileMenuOpen ? 'open' : 'closed'},
    language: {visible: true, state: languageMenuOpen ? 'open' : 'closed'}
  });
  
  // Check if debug mode is enabled from config and localStorage
  useEffect(() => {
    try {
      const isDebug = DEBUG_CONFIG.ENABLED && localStorage.getItem('versatiles_debug') !== 'false';
      setDebugEnabled(isDebug);
      
      // Add debug mode class to html element for CSS targeting
      if (isDebug) {
        document.documentElement.classList.add('debug-mode');
      } else {
        document.documentElement.classList.remove('debug-mode');
      }
    } catch (e) {
      setDebugEnabled(false);
    }
  }, []);
  // Monitor viewport size and update button states
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newViewportType = getViewportType();
      const isMobile = newWidth <= 768;
      
      setWindowWidth(newWidth);
      setViewportType(newViewportType);
      
      // Update button visibility based on viewport
      setButtonStates(prev => ({
        ...prev,
        sidebar: {
          ...prev.sidebar,
          visible: !isMobile,
          state: sidebarCollapsed ? 'collapsed' : 'expanded'
        },
        mobileMenu: {
          ...prev.mobileMenu,
          visible: isMobile,
          state: mobileMenuOpen ? 'open' : 'closed'
        },
        theme: {
          ...prev.theme,
          visible: true,
          state: themeState || 'light'
        },
        language: {
          ...prev.language,
          visible: true,
          state: languageMenuOpen ? 'open' : 'closed'
        }
      }));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed, mobileMenuOpen, themeState, languageMenuOpen]);
  
  // Toggle debug mode
  const handleToggleDebug = () => {
    const newState = toggleDebugMode();
    setDebugEnabled(newState);
    
    // Add/remove debug CSS class
    if (newState) {
      document.documentElement.classList.add('debug-mode');
    } else {
      document.documentElement.classList.remove('debug-mode');
    }
  };
  
  if (!debugEnabled) {
    return (
      <button 
        className="debug-toggle-button" 
        onClick={handleToggleDebug}
        title="Enable Debug Mode"
      >
        Debug
      </button>
    );
  }
  
  return (
    <div className="debug-panel">
      <div className="debug-panel-header">
        <h3>VersatilesUI Debug Panel</h3>
        <button onClick={handleToggleDebug}>Close</button>
      </div>
      <div className="debug-panel-content">
        <div className="debug-section">
          <h4>Viewport</h4>
          <div className="debug-info">
            <div className="debug-row">
              <span className="debug-label">Type:</span>
              <span className={`debug-value ${viewportType}`}>{viewportType.toUpperCase()}</span>
            </div>
            <div className="debug-row">
              <span className="debug-label">Width:</span>
              <span className="debug-value">{windowWidth}px</span>
            </div>
            <div className="debug-row">
              <span className="debug-label">Breakpoint:</span>
              <span className="debug-value">{windowWidth <= 768 ? '≤768px' : '>768px'}</span>
            </div>
          </div>
        </div>
        
        <div className="debug-section">
          <h4>Sidebar State</h4>
          <div className="debug-info">
            <div className="debug-row">
              <span className="debug-label">Desktop:</span>
              <span className="debug-value">{sidebarCollapsed ? 'Collapsed' : 'Expanded'}</span>
            </div>
            <div className="debug-row">
              <span className="debug-label">Mobile:</span>
              <span className="debug-value">{mobileSidebarOpen ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        </div>          <div className="debug-section">
          <h4>Button States</h4>
          <div className="debug-info">
            {Object.entries(buttonStates).map(([key, data]) => (
              <div className="debug-row button-state" key={key}>
                <span className="debug-label">{key}:</span>
                <span className={`debug-value visibility-${data.visible ? 'visible' : 'hidden'}`}>
                  {data.visible ? 'VISIBLE' : 'HIDDEN'}
                </span>
                <span className={`debug-badge state-${data.state}`}>{data.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
