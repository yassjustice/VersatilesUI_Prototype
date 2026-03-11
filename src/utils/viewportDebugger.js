/**
 * viewportDebugger.js
 * Utility for debugging viewport-related issues and component visibility
 */

import { DEBUG_CONFIG, VIEWPORT } from '../config';

// Configuration for viewport breakpoints (from central config)
const BREAKPOINTS = {
  MOBILE: VIEWPORT.MOBILE_MAX_WIDTH,
};

// Check if debug mode is enabled from config
const isDebugMode = () => {
  try {
    // First check the main configuration file setting
    if (!DEBUG_CONFIG.ENABLED) {
      return false;
    }
    // Then check localStorage for any override (useful for temporary debugging)
    const localStorageDebug = localStorage.getItem('versatiles_debug');
    return localStorageDebug === null ? true : localStorageDebug === 'true';
  } catch {
    return false;
  }
};

/**
 * Get the current viewport type
 * @returns {string} 'mobile' or 'desktop'
 */
export const getViewportType = () => {
  return window.innerWidth <= BREAKPOINTS.MOBILE ? 'mobile' : 'desktop';
};

/**
 * Structured debug logger with component context
 * @param {string} component - Component name for context
 * @param {Object} data - Data to log
 * @param {string} [type='info'] - Log type (info, warning, error)
 * @param {number} [level=2] - Log level: 1=critical, 2=important, 3=verbose
 */
export const debugLog = function(component, data = {}, _type, level = 2) {
  // Early return if debugging is disabled or if log level is higher than configured
  if (!isDebugMode() || level > DEBUG_CONFIG.LOG_LEVEL) return;
  
  // Don't log if the component is disabled in config
  const componentKey = component.toUpperCase();
  if (DEBUG_CONFIG.COMPONENTS && 
      componentKey in DEBUG_CONFIG.COMPONENTS && 
      !DEBUG_CONFIG.COMPONENTS[componentKey]) {
    return;
  }
  
  // Handle string input for backward compatibility
  if (typeof component === 'string' && typeof data === 'string') {
    const message = data;
    data = { message };
  }
  
  // Handle case where only one string argument is passed
  if (arguments.length === 1 && typeof component === 'string') {
    data = { message: component };
    component = 'Debug';
  }
  
  // Ensure component is a string
  if (typeof component !== 'string') {
    component = 'Debug';
  }
  
  // Make sure data is an object
  if (!data || typeof data !== 'object') {
    data = { value: data };
  }
  
  const styles = {
    component: 'font-weight: bold; color: #0066cc;',
    info: 'background: #e6f7ff; color: #003366; padding: 2px 5px; border-radius: 3px;',
    warning: 'background: #fff7e6; color: #663c00; padding: 2px 5px; border-radius: 3px;',
    error: 'background: #fff1f0; color: #5c0011; padding: 2px 5px; border-radius: 3px;',
  };

  const viewportType = getViewportType();
  const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);

  console.groupCollapsed(
    `%c${component}%c ${timestamp} [${viewportType.toUpperCase()}]`,
    styles.component,
    `color: gray; font-size: 0.9em;`
  );
  
  // Log the viewport information first
  console.log(
    `%cViewport:%c ${viewportType} (${window.innerWidth}px × ${window.innerHeight}px)`,
    'font-weight: bold;',
    'font-weight: normal;'
  );
  
  // Log component-specific data with readable formatting
  Object.entries(data).forEach(([key, value]) => {
    const valueType = typeof value;
    if (valueType === 'object' && value !== null) {
      console.log(`%c${key}:%c`, 'font-weight: bold;', 'font-weight: normal;', value);
    } else {
      console.log(
        `%c${key}:%c ${value}`,
        'font-weight: bold;',
        'font-weight: normal;'
      );
    }
  });
  
  console.groupEnd();
};

/**
 * Toggle debug mode on/off
 * @param {boolean} [enable] - If provided, explicitly set debug mode
 * @returns {boolean} New debug mode state
 */
export const toggleDebugMode = (enable) => {
  const newState = enable !== undefined ? enable : !isDebugMode();
  try {
    localStorage.setItem('versatiles_debug', String(newState));
    console.log(`%cVersatilesUI Debug Mode: ${newState ? 'ENABLED' : 'DISABLED'}`, 
      `background: ${newState ? '#4caf50' : '#f44336'}; color: white; padding: 4px 8px; border-radius: 4px;`
    );
    return newState;
  } catch {
    return false;
  }
};

export default {
  getViewportType,
  debugLog,
  toggleDebugMode,
  isDebugMode
};
