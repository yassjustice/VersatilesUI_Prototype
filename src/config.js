/**
 * config.js
 * Central configuration file for VersatilesUI application settings
 */

// Debug configuration
export const DEBUG_CONFIG = {
  // Enable debug features via Vite env: VITE_DEBUG_ENABLED (default: false)
  ENABLED: import.meta.env.VITE_DEBUG_ENABLED === 'true' ? true : false,
  
  // Individual debug features (only used if ENABLED is true)
  SHOW_DEBUG_PANEL: import.meta.env.VITE_DEBUG_SHOW_PANEL === 'true' ? true : false,          // Shows the floating debug panel
  LOG_VIEWPORT_CHANGES: import.meta.env.VITE_DEBUG_LOG_VIEWPORT_CHANGES ? import.meta.env.VITE_DEBUG_LOG_VIEWPORT_CHANGES === 'true' : true,      // Logs viewport size changes to console
  LOG_BUTTON_STATES: import.meta.env.VITE_DEBUG_LOG_BUTTON_STATES ? import.meta.env.VITE_DEBUG_LOG_BUTTON_STATES === 'true' : true,         // Logs button state changes to console
  HIGHLIGHT_COMPONENTS: import.meta.env.VITE_DEBUG_HIGHLIGHT_COMPONENTS ? import.meta.env.VITE_DEBUG_HIGHLIGHT_COMPONENTS === 'true' : true,      // Adds debug outlines to components
  VERBOSE_LOGGING: import.meta.env.VITE_DEBUG_VERBOSE_LOGGING === 'true' ? true : false,          // Enable more detailed console logs
  SHOW_RENDER_COUNTS: import.meta.env.VITE_DEBUG_SHOW_RENDER_COUNTS === 'true' ? true : false,       // Show component render counts
  
  // Debug level (0-3) controls the amount of detail in logs
  // 0: None, 1: Critical only, 2: Important, 3: Verbose
  LOG_LEVEL: Number(import.meta.env.VITE_DEBUG_LOG_LEVEL ?? 2),
  
  // Specific component debugging (only active when ENABLED is true)
  COMPONENTS: {
    SIDEBAR: import.meta.env.VITE_DEBUG_COMP_SIDEBAR ? import.meta.env.VITE_DEBUG_COMP_SIDEBAR === 'true' : true,
    HEADER: import.meta.env.VITE_DEBUG_COMP_HEADER ? import.meta.env.VITE_DEBUG_COMP_HEADER === 'true' : true,
    BUTTONS: import.meta.env.VITE_DEBUG_COMP_BUTTONS ? import.meta.env.VITE_DEBUG_COMP_BUTTONS === 'true' : true,
    LAYOUT: import.meta.env.VITE_DEBUG_COMP_LAYOUT ? import.meta.env.VITE_DEBUG_COMP_LAYOUT === 'true' : true
  }
};

// Viewport breakpoints (matching CSS media queries)
export const VIEWPORT = {
  MOBILE_MAX_WIDTH: 768, // Maximum width for mobile view in pixels
};
