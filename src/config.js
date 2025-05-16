/**
 * config.js
 * Central configuration file for VersatilesUI application settings
 */

// Debug configuration
export const DEBUG_CONFIG = {
  // IMPORTANT: Set this to false to completely disable all debugging features
  ENABLED: false, 
  
  // Individual debug features (only used if ENABLED is true)
  SHOW_DEBUG_PANEL: true,          // Shows the floating debug panel
  LOG_VIEWPORT_CHANGES: true,      // Logs viewport size changes to console
  LOG_BUTTON_STATES: true,         // Logs button state changes to console
  HIGHLIGHT_COMPONENTS: true,      // Adds debug outlines to components
  VERBOSE_LOGGING: false,          // Enable more detailed console logs
  SHOW_RENDER_COUNTS: false,       // Show component render counts
  
  // Debug level (0-3) controls the amount of detail in logs
  // 0: None, 1: Critical only, 2: Important, 3: Verbose
  LOG_LEVEL: 2,
  
  // Specific component debugging (only active when ENABLED is true)
  COMPONENTS: {
    SIDEBAR: true,
    HEADER: true,
    BUTTONS: true,
    LAYOUT: true
  }
};

// Viewport breakpoints (matching CSS media queries)
export const VIEWPORT = {
  MOBILE_MAX_WIDTH: 768, // Maximum width for mobile view in pixels
};
