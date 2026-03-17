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
    // If debugging is disabled in config, ensure no debug UI is active and do not persist any flags
    if (!DEBUG_CONFIG.ENABLED) {
      document.documentElement.classList.remove('debug-mode');
      return;
    }

    // Do not force a default in localStorage; respect an explicit user opt-in
    const userSetting = localStorage.getItem('versatiles_debug');
    const isDebugMode = userSetting === 'true';

    if (isDebugMode) {
      document.documentElement.classList.add('debug-mode');

      // Log initial viewport information
      const viewportWidth = window.innerWidth;
      const viewportType = viewportWidth <= 768 ? 'mobile' : 'desktop';
      const isMobile = viewportWidth <= 768;

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
