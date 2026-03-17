# .github/copilot-instructions.md — VersatilesUI

Purpose: provide concise, actionable repository knowledge for Copilot-style assistants to make accurate code and guidance suggestions.

## Quick commands
- Install dependencies (local): npm install
- Install dependencies (CI / reproducible): npm ci
- Start dev server: npm run dev  # uses Vite (hot reload)
- Build production bundle: npm run build  # vite build
- Preview built site: npm run preview
- Lint: npm run lint  # runs `eslint .`

Tests: Playwright E2E tests are configured in this repository.

Playwright (local) commands:
- Install Playwright browsers: npx playwright install --with-deps
- Run full E2E suite: npm run test:e2e    # runs `playwright test`
- Run a single test file: npx playwright test e2e/example.spec.js
- Run a single test by title: npx playwright test -g "homepage loads"
- Run headed (with browser UI): npm run test:e2e:headed
- Show the HTML report: npm run test:e2e:report (or npx playwright show-report)

CI: A GitHub Actions workflow was added at .github/workflows/playwright-e2e.yml. It installs browsers, builds or previews the app, and runs the Playwright suite on push/PR.

CI: .github/workflows/ci.yml uses Node 20, runs `npm ci`, `npm run lint`, and `npm run build`.

## High-level architecture (big-picture)
- Tooling: Vite + React. Plugin: @vitejs/plugin-react. Dev server is Vite.
- App shell: src/main.jsx -> initializes debug features (if enabled) and mounts <App />.
- Routing & layout: src/App.jsx sets up react-router-dom with a nested route whose layout is src/components/layout/MainLayout.jsx. MainLayout wraps page content via <Outlet /> and applies theme+language side-effects.
- Component library: src/components/
  - layout/: Header, Sidebar, MainLayout, DebugPanel, DebugControls
  - ui/: reusable UI primitives (Button, Card, Input, CodeBlock, etc.)
- Theming: token-driven theme system in src/themes and src/utils/themeUtils.js. Themes export design tokens (themeBase + theme-specific light/dark palettes). Theme variables are converted to CSS custom properties and applied to document.documentElement.
- Showroom & control-center: src/pages/ShowroomPage.jsx is an interactive demo for components and themes; ControlCenterPage toggles themes/languages for manual testing.
- i18n: i18next configured in src/i18n/i18n.js with locales for en, fr, ar. AR uses RTL.
- Debugging: central DEBUG_CONFIG in src/config.js controls debug features; initializeDebugFeatures() is called from main.jsx when enabled.

## Key repository conventions & patterns
- Theme application
  - Use getCurrentTheme(themeName, isDark) and applyThemeToDocument(theme, language) (src/utils/themeUtils.js). These generate and set CSS variables on :root and set data attributes: data-theme, data-mode, data-lang.
  - Fonts are language-aware via themeBase.fonts and getFontFamily(type, language).
  - When adding a theme: create a file in src/themes/ (follow auroraTheme.js), then register it in getCurrentTheme (or extend getCurrentTheme to load dynamically).
  - Always provide sensible fallback values in src/styles/fallbackVars.css so components render correctly before theme variables are applied.

- Theme & language persistence
  - ThemeContext (src/context/ThemeContext.jsx) stores state and persists keys in localStorage: `theme-mode`, `language`, `current-theme`.
  - Changing language updates document.documentElement.dir and .lang for RTL support; toggling theme sets document.documentElement.dataset.mode immediately for fast visual feedback.
  - MainLayout watches theme + language and re-applies theme via applyThemeToDocument in a useEffect.

- i18n requirements
  - i18n must be imported before any component that uses translation (see import order in src/App.jsx).
  - Default/fallback language is `en` (configured in src/i18n/i18n.js).

- Debugging
  - Toggle debug flags in src/config.js (DEBUG_CONFIG.ENABLED). When enabled, initializeDebugFeatures adds runtime helpers (DebugPanel, viewport logging, render counts, etc.). DebugControls is always rendered but only exposes UI when configured.

- ESLint & linting rules
  - ESLint config (eslint.config.js) uses @eslint/js, react-hooks and react-refresh rules.
  - Note: the `no-unused-vars` rule is configured to ignore identifiers that match the regex `^[A-Z_]`. This is intentional to avoid false positives on exported components/constants that intentionally appear unused.
  - The `react-refresh/only-export-components` rule is enabled (warn) to help with Fast Refresh correctness.

- File import order
  - main.jsx imports `fallbackVars.css` before other styles (intentional). Keep this order when adding CSS that provides safe fallbacks.

## Files to inspect first (high signal)
- package.json — scripts, deps
- .github/workflows/ci.yml — CI node version and steps
- src/main.jsx — startup, debug initialization, and style import order
- src/App.jsx — router and i18n import note
- src/context/ThemeContext.jsx — theme/language persistence API (useTheme hook)
- src/utils/themeUtils.js — getCurrentTheme, generateThemeCSSVariables, applyThemeToDocument
- src/themes/auroraTheme.js — canonical theme format
- src/config.js — DEBUG_CONFIG and viewport constants
- src/pages/ShowroomPage.jsx — how components are demonstrated and example usages
- THEME_GUIDELINES.md & README.md — design & theme expectations

## Helpful guidance for Copilot/code generation
- When suggesting theme changes, update both the theme file (src/themes) and ensure themeUtils knows how to consume those tokens (naming expected by generateThemeCSSVariables).
- Prefer using theme CSS variables (e.g. `--color-primary-500`) in component styles rather than hard-coded colors so themes remain swappable.
- Respect i18n import order and remember to set `dir=rtl` for Arabic when generating layout code.
- For accessibility-related color choices, refer to THEME_GUIDELINES.md (WCAG AA contrast, test both light/dark).
- If adding runtime debug hooks, gate them behind DEBUG_CONFIG.ENABLED to avoid shipping debug UI in production.

---

If anything important is missing or you want this file tailored (more examples, code snippets, or an explicit checklist for adding themes), say which area to expand.
