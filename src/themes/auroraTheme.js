// Theme base variables
export const themeBase = {
  // Fonts by language
  fonts: {
    heading: {
      en: "'Playfair Display', serif",
      fr: "'Playfair Display', serif",
      ar: "'Noto Kufi Arabic', sans-serif"
    },
    body: {
      en: "'Lato', sans-serif",
      fr: "'Lato', sans-serif",
      ar: "'Noto Sans Arabic', sans-serif"
    },
    ui: {
      en: "'Montserrat', sans-serif",
      fr: "'Montserrat', sans-serif",
      ar: "'Cairo', sans-serif"
    }
  },
  
  // Font sizes
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
  },
  
  // Font weights
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // Line heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Border radius
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  
  // Transition
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.6s ease',
    slower: 'all 0.8s ease',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Z-index
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

// Aurora theme (first theme)
export const auroraTheme = {
  name: 'aurora',
  displayName: 'Aurora',
  description: 'A vibrant, ethereal theme inspired by the aurora borealis',
  
  // Light mode colors
  light: {
    // Core palette
    primary: {
      50: '#E6F9FA',
      100: '#C3EFF4',
      200: '#9FE5EE',
      300: '#7BDAE7',
      400: '#58CFE1',
      500: '#34C5DA',
      600: '#2A9EAE',
      700: '#1F7682',
      800: '#154F57',
      900: '#0A272B',
    },
    secondary: {
      50: '#FBECFE',
      100: '#F5D0FD',
      200: '#EEB5FB',
      300: '#E79AFA',
      400: '#E17FF8',
      500: '#DA64F7',
      600: '#AE50C5',
      700: '#823C94',
      800: '#572862',
      900: '#2B1431',
    },
    accent: {
      50: '#F0F9ED',
      100: '#D9F0D3',
      200: '#C1E7B9',
      300: '#AADE9F',
      400: '#92D485',
      500: '#7BCB6B',
      600: '#62A256',
      700: '#4A7A41',
      800: '#31512B',
      900: '#192916',
    },
    
    // UI elements
    background: '#F8FDFD',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F9FA',
    border: '#E1F1F3',
    borderHover: '#C3E5E9',
    divider: '#EAF5F7',
    
    // Text
    text: {
      primary: '#0A2930',
      secondary: '#2D5A64',
      tertiary: '#5D8B95',
      disabled: '#A3BDC3',
      inverse: '#FFFFFF',
    },
    
    // Semantic colors
    info: '#3498DB',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    
    // Component specific
    header: {
      background: 'rgba(255, 255, 255, 0.85)',
      text: '#0A2930',
      borderBottom: '#E1F1F3',
    },
    sidebar: {
      background: '#FFFFFF',
      activeItem: '#F1F9FA',
      text: '#0A2930',
      activeText: '#34C5DA',
      border: '#E1F1F3',
    },
    card: {
      background: '#FFFFFF',
      border: '#E1F1F3',
      shadow: '0 4px 20px rgba(52, 197, 218, 0.08)',
    },
    button: {
      primaryBg: '#34C5DA',
      primaryText: '#FFFFFF',
      primaryHover: '#2A9EAE',
      secondaryBg: '#F1F9FA',
      secondaryText: '#2A9EAE',
      secondaryHover: '#E1F1F3',
    },
    input: {
      background: '#FFFFFF',
      border: '#E1F1F3',
      focusBorder: '#34C5DA',
      text: '#0A2930',
      placeholder: '#A3BDC3',
    },
  },
  
  // Dark mode colors
  dark: {
    // Core palette
    primary: {
      50: '#0A272B',
      100: '#154F57',
      200: '#1F7682',
      300: '#2A9EAE',
      400: '#34C5DA',
      500: '#58CFE1',
      600: '#7BDAE7',
      700: '#9FE5EE',
      800: '#C3EFF4',
      900: '#E6F9FA',
    },
    secondary: {
      50: '#2B1431',
      100: '#572862',
      200: '#823C94',
      300: '#AE50C5',
      400: '#DA64F7',
      500: '#E17FF8',
      600: '#E79AFA',
      700: '#EEB5FB',
      800: '#F5D0FD',
      900: '#FBECFE',
    },
    accent: {
      50: '#192916',
      100: '#31512B',
      200: '#4A7A41',
      300: '#62A256',
      400: '#7BCB6B',
      500: '#92D485',
      600: '#AADE9F',
      700: '#C1E7B9',
      800: '#D9F0D3',
      900: '#F0F9ED',
    },
    
    // UI elements
    background: '#0E1E20',
    surface: '#132B2E',
    surfaceAlt: '#1A373B',
    border: '#214348',
    borderHover: '#2A555B',
    divider: '#214348',
    
    // Text
    text: {
      primary: '#E6F9FA',
      secondary: '#C3EFF4',
      tertiary: '#9FE5EE',
      disabled: '#5D8B95',
      inverse: '#0A2930',
    },
    
    // Semantic colors
    info: '#3498DB',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    
    // Component specific
    header: {
      background: 'rgba(19, 43, 46, 0.9)',
      text: '#E6F9FA',
      borderBottom: '#214348',
    },
    sidebar: {
      background: '#132B2E',
      activeItem: '#1A373B',
      text: '#C3EFF4',
      activeText: '#58CFE1',
      border: '#214348',
    },
    card: {
      background: '#132B2E',
      border: '#214348',
      shadow: '0 4px 20px rgba(10, 39, 43, 0.5)',
    },
    button: {
      primaryBg: '#34C5DA',
      primaryText: '#0A2930',
      primaryHover: '#58CFE1',
      secondaryBg: '#1A373B',
      secondaryText: '#58CFE1',
      secondaryHover: '#214348',
    },
    input: {
      background: '#1A373B',
      border: '#214348',
      focusBorder: '#34C5DA',
      text: '#E6F9FA',
      placeholder: '#5D8B95',
    },
  },
  
  // Gradient definitions
  gradients: {
    primaryGradient: 'linear-gradient(135deg, #34C5DA 0%, #DA64F7 100%)',
    subtleGradient: 'linear-gradient(135deg, rgba(52, 197, 218, 0.1) 0%, rgba(218, 100, 247, 0.1) 100%)',
    accentGradient: 'linear-gradient(135deg, #7BCB6B 0%, #34C5DA 100%)',
    surfaceGradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(52, 197, 218, 0.05) 100%)',
    darkSurfaceGradient: 'linear-gradient(180deg, rgba(10, 39, 43, 0) 0%, rgba(52, 197, 218, 0.1) 100%)',
  },
  
  // Special effects
  effects: {
    glass: {
      light: 'backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.7);',
      dark: 'backdrop-filter: blur(10px); background: rgba(19, 43, 46, 0.7);',
    },
    glow: {
      primary: 'box-shadow: 0 0 15px rgba(52, 197, 218, 0.5);',
      secondary: 'box-shadow: 0 0 15px rgba(218, 100, 247, 0.5);',
      accent: 'box-shadow: 0 0 15px rgba(123, 203, 107, 0.5);',
    },
  },
};
