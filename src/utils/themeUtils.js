import { themeBase, auroraTheme } from '../themes/auroraTheme';

// Get current theme based on theme name and mode
export const getCurrentTheme = (themeName = 'aurora', isDark = false) => {
  // For now we only have the Aurora theme, but this will be expandable
  const theme = themeName === 'aurora' ? auroraTheme : auroraTheme;
  
  return {
    ...theme,
    colors: isDark ? theme.dark : theme.light,
    base: themeBase,
    isDark
  };
};

// Get font family based on language and purpose
export const getFontFamily = (type = 'body', language = 'en') => {
  return themeBase.fonts[type][language] || themeBase.fonts[type].en;
};

// Generate CSS variables for theme
export const generateThemeCSSVariables = (theme) => {
  const colors = theme.colors;
  
  // Use a single variable for simplicity
  const cssVars = {
    // Colors
    '--color-bg': colors.background,
    '--color-surface': colors.surface,
    '--color-surface-alt': colors.surfaceAlt,
    '--color-border': colors.border,
    '--color-border-hover': colors.borderHover,
    '--color-divider': colors.divider,
    
    // Text colors
    '--color-text': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-tertiary': colors.text.tertiary,
    '--color-text-disabled': colors.text.disabled,
    '--color-text-inverse': colors.text.inverse,
    
    // Primary colors
    '--color-primary-50': colors.primary[50],
    '--color-primary-100': colors.primary[100],
    '--color-primary-200': colors.primary[200],
    '--color-primary-300': colors.primary[300],
    '--color-primary-400': colors.primary[400],
    '--color-primary-500': colors.primary[500],
    '--color-primary-600': colors.primary[600],
    '--color-primary-700': colors.primary[700],
    '--color-primary-800': colors.primary[800],
    '--color-primary-900': colors.primary[900],
    
    // Secondary colors
    '--color-secondary-50': colors.secondary[50],
    '--color-secondary-100': colors.secondary[100],
    '--color-secondary-200': colors.secondary[200],
    '--color-secondary-300': colors.secondary[300],
    '--color-secondary-400': colors.secondary[400],
    '--color-secondary-500': colors.secondary[500],
    '--color-secondary-600': colors.secondary[600],
    '--color-secondary-700': colors.secondary[700],
    '--color-secondary-800': colors.secondary[800],
    '--color-secondary-900': colors.secondary[900],
    
    // Accent colors
    '--color-accent-50': colors.accent[50],
    '--color-accent-100': colors.accent[100],
    '--color-accent-200': colors.accent[200],
    '--color-accent-300': colors.accent[300],
    '--color-accent-400': colors.accent[400],
    '--color-accent-500': colors.accent[500],
    '--color-accent-600': colors.accent[600],
    '--color-accent-700': colors.accent[700],
    '--color-accent-800': colors.accent[800],
    '--color-accent-900': colors.accent[900],
    
    // Semantic colors
    '--color-info': colors.info,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-error': colors.error,
    
    // Component specific
    '--color-header-bg': colors.header.background,
    '--color-header-text': colors.header.text,
    '--color-header-border': colors.header.borderBottom,
    
    '--color-sidebar-bg': colors.sidebar.background,
    '--color-sidebar-active': colors.sidebar.activeItem,
    '--color-sidebar-text': colors.sidebar.text,
    '--color-sidebar-active-text': colors.sidebar.activeText,
    '--color-sidebar-border': colors.sidebar.border,
    
    '--color-card-bg': colors.card.background,
    '--color-card-border': colors.card.border,
    '--color-card-shadow': colors.card.shadow,
    
    '--color-button-primary-bg': colors.button.primaryBg,
    '--color-button-primary-text': colors.button.primaryText,
    '--color-button-primary-hover': colors.button.primaryHover,
    '--color-button-secondary-bg': colors.button.secondaryBg,
    '--color-button-secondary-text': colors.button.secondaryText,
    '--color-button-secondary-hover': colors.button.secondaryHover,
    
    '--color-input-bg': colors.input.background,
    '--color-input-border': colors.input.border,
    '--color-input-focus': colors.input.focusBorder,
    '--color-input-text': colors.input.text,
    '--color-input-placeholder': colors.input.placeholder,
    
    // Gradients
    '--gradient-primary': theme.gradients.primaryGradient,
    '--gradient-subtle': theme.gradients.subtleGradient,
    '--gradient-accent': theme.gradients.accentGradient,
    '--gradient-surface': theme.isDark ? theme.gradients.darkSurfaceGradient : theme.gradients.surfaceGradient,
  };
    return cssVars;
};

// Apply theme to document
export const applyThemeToDocument = (theme, language) => {
  const variables = generateThemeCSSVariables(theme);
  const root = document.documentElement;
  
  // Set direction based on language
  root.dir = language === 'ar' ? 'rtl' : 'ltr';
  root.lang = language;
  
  // Apply all CSS variables
  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      root.style.setProperty(key, value);
    } else {
      console.warn(`Theme variable ${key} has no value`);
    }
  });
  
  // Set fonts based on language
  root.style.setProperty('--font-heading', getFontFamily('heading', language));
  root.style.setProperty('--font-body', getFontFamily('body', language));
  root.style.setProperty('--font-ui', getFontFamily('ui', language));
  
  // Set essential z-index values directly (not relying on theme)
  root.style.setProperty('--z-hide', '-1');
  root.style.setProperty('--z-base', '0');
  root.style.setProperty('--z-docked', '10');
  root.style.setProperty('--z-dropdown', '1000');
  root.style.setProperty('--z-sticky', '1100');
  root.style.setProperty('--z-banner', '1200');
  root.style.setProperty('--z-overlay', '1300');
  root.style.setProperty('--z-modal', '1400');
  root.style.setProperty('--z-popover', '1500');
  root.style.setProperty('--z-toast', '1700');
  root.style.setProperty('--z-tooltip', '1800');
  
  // Set data attributes for easier CSS selectors
  root.dataset.theme = theme.name;
  root.dataset.mode = theme.isDark ? 'dark' : 'light';
  root.dataset.lang = language;
};

// Helper color utilities for component styling
export const colorUtils = {
  darken: (color, amount) => {
    // Convert hex to RGB, darken, and convert back
    let rgb = color.substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
    rgb = rgb.map(val => Math.max(0, Math.floor(val * (1 - amount))));
    return '#' + rgb.map(val => val.toString(16).padStart(2, '0')).join('');
  },
  
  lighten: (color, amount) => {
    // Convert hex to RGB, lighten, and convert back
    let rgb = color.substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
    rgb = rgb.map(val => Math.min(255, Math.floor(val + (255 - val) * amount)));
    return '#' + rgb.map(val => val.toString(16).padStart(2, '0')).join('');
  },
  
  withOpacity: (color, opacity) => {
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
};
