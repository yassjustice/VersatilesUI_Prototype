/**
 * debugInitializer.js
 * Utility to initialize debugging features on application startup
 */

import { debugLog } from './viewportDebugger';
import { DEBUG_CONFIG, VIEWPORT } from '../config';

/**
 * Initialize debug features when the application starts
 */
export const initializeDebugFeatures = () => {
  try {
    // If debugging is disabled in config, make sure it's also disabled in localStorage
    if (!DEBUG_CONFIG.ENABLED) {
      localStorage.setItem('versatiles_debug', 'false');
      // Remove debug class if present
      document.documentElement.classList.remove('debug-mode');
      return;
    }
    
    // Set localStorage based on config
    localStorage.setItem('versatiles_debug', DEBUG_CONFIG.ENABLED.toString());
    
    // Check if debug mode is enabled
    const isDebugMode = DEBUG_CONFIG.ENABLED && localStorage.getItem('versatiles_debug') !== 'false';
    
    // Apply debug class to html element if debug is enabled
    if (isDebugMode) {
      document.documentElement.classList.add('debug-mode');
      
      // Log initial viewport information
      const viewportWidth = window.innerWidth;
      const viewportType = viewportWidth <= 768 ? 'mobile' : 'desktop';
      const isMobile = viewportWidth <= 768;
      
      // Log detailed info about toggle buttons and sidebar rendering
      console.group('%cVersatilesUI Debug Initialization', 'background: #4a148c; color: white; padding: 3px 8px; border-radius: 4px;');
      console.log('Current Viewport:', viewportType.toUpperCase(), `(${viewportWidth}px)`);
      console.log('Sidebar Rendered:', !isMobile ? 'YES' : 'NO');
      console.log('Desktop Toggle Visible:', !isMobile ? 'YES' : 'NO');
      console.log('Mobile Menu Toggle Visible:', 'YES (Always)');
      console.groupEnd();
      
      debugLog('App Init', {
        'Debug Mode': 'ENABLED',
        'Viewport Type': viewportType,
        'Window Width': `${viewportWidth}px`,
        'Device Pixel Ratio': window.devicePixelRatio,
        'Sidebar Rendered': !isMobile,
        'Mobile Toggle Only': isMobile,
        'User Agent': navigator.userAgent
      });
      
      // Add resize event listener for logging viewport changes
      const handleResize = () => {
        const width = window.innerWidth;
        const type = width <= 768 ? 'mobile' : 'desktop';
        
        debugLog('Viewport Change', {
          'New Type': type,
          'New Width': `${width}px`
        });
      };
      
      // Add throttled resize listener
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
      });
    }
  } catch (error) {
    console.error('Error initializing debug features:', error);
  }
};

export default { initializeDebugFeatures };
