# VersatilesUI - Artistically Aesthetic React UI Library

VersatilesUI is a handcrafted, visually stunning React component library designed with aesthetics and functionality in mind.

## Key Features

- ✅ **Visually Stunning Design**: Carefully crafted with artistic elements, smooth animations, and attention to detail
- ✅ **Full Light/Dark Mode Support**: Seamlessly switch between beautifully designed light and dark themes with proper contrast
- ✅ **Multilingual Support**: Full internationalization for English, French, and Arabic
- ✅ **Typography-aware**: Optimized font selection for different languages and purposes
- ✅ **RTL Support**: Complete right-to-left layout for Arabic language
- ✅ **Fully Scalable Architecture**: Component-based design for easy customization and extension
- ✅ **Code Examples**: Interactive showroom with usage examples for all components
- ✅ **Theme Consistency**: Fallback variable system ensures components always render correctly

## Getting Started

1. Clone the repository
```
git clone https://your-repository-url/VersatilesUI.git
```

2. Install the dependencies
```
npm install
```

3. Run the development server
```
npm run dev
```

## Project Structure

```
src/
├── assets/          # Static assets and fonts
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Header, Sidebar, etc.)
│   └── ui/          # UI components (Button, Card, Input, etc.)
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization resources
│   └── locales/     # Language files
├── pages/           # Page components
├── styles/          # Global styles
├── themes/          # Theme definitions
└── utils/           # Utility functions
```

## Theme Structure

The theme system in VersatilesUI is designed to be extensible and highly customizable:

- **Base Theme**: Defines common variables like spacing, typography, shadows, etc.
- **Theme Colors**: Each theme defines both light and dark mode color palettes
- **Components**: Themed versions of all UI components

## Adding New Themes

To create a new theme:

1. Create a new theme file in `src/themes/` following the pattern of `auroraTheme.js`
2. Define light and dark mode color palettes
3. Define gradients, effects, and other theme-specific properties
4. Import and add the theme to the `getCurrentTheme` function in `src/utils/themeUtils.js`

## Design Principles

VersatilesUI follows these core design principles:

1. **Aesthetics First**: Visual beauty without sacrificing usability
2. **Accessibility**: Ensuring components are accessible to all users
3. **Internationalization**: Complete multilingual support by design
4. **Consistent Motion**: Strategic animations to enhance the user experience
5. **Adaptable**: Components work seamlessly across all device sizes

## Criteria for Theme Acceptance

New themes should meet the following criteria:

1. **Visual Harmony**: Colors should work together in both light and dark modes
2. **Accessibility**: Meet WCAG AA contrast standards
3. **Consistent Feel**: Align with the overall aesthetic direction
4. **Complete Implementation**: Cover all components and states

## Debugging System

VersatilesUI includes a comprehensive debugging system to help with development and troubleshooting:

### Enabling/Disabling Debug Mode

Debug mode can be controlled in the `src/config.js` file:

```js
// Debug configuration
export const DEBUG_CONFIG = {
  // Set this to false to completely disable all debugging features
  ENABLED: false,
  
  // Individual debug features
  SHOW_DEBUG_PANEL: true,
  LOG_VIEWPORT_CHANGES: true,
  // ...other options
}
```

### Debug Features

- **Debug Panel**: A floating panel showing viewport sizes and component states
- **Viewport Tracking**: Console logs for viewport changes and component visibility
- **Button State Monitoring**: Track toggle button states and transitions
- **Component Highlighting**: Visual indicators for component boundaries

### Debug Levels

Configure the amount of detail in logs by setting the `LOG_LEVEL`:

```js
LOG_LEVEL: 2, // 0=None, 1=Critical, 2=Important, 3=Verbose
```

### Component-Specific Debugging

Enable/disable debugging for specific components:

```js
COMPONENTS: {
  SIDEBAR: true,
  HEADER: true,
  BUTTONS: true,
  LAYOUT: true
}
```

## License

MIT © VersatilesUI Team

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
