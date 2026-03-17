Debugging (development & preview)

Purpose

This document explains how to enable the application's debug UI and runtime logging in development or preview environments. By default debug features are disabled in production builds.

Vite environment variables

- VITE_DEBUG_ENABLED (boolean, default: false)
  - When true, the debug UI components (DebugControls / DebugPanel) are available in the app.
  - When false (default) the debug UI and logging are disabled and no debug state is persisted.

- VITE_DEBUG_SHOW_PANEL (boolean, default: false)
  - When true and VITE_DEBUG_ENABLED is true, the floating Debug Panel UI will be rendered.

- Additional optional flags (all prefixed with VITE_DEBUG_):
  - VITE_DEBUG_LOG_VIEWPORT_CHANGES (default: true)
  - VITE_DEBUG_LOG_BUTTON_STATES (default: true)
  - VITE_DEBUG_VERBOSE_LOGGING (default: false)
  - VITE_DEBUG_LOG_LEVEL (0-3, default: 2)

How it works

- The feature gate reads Vite env variables (import.meta.env.VITE_*). These are set on the build/preview environment (e.g., Vercel). Values must be the literal string "true" to enable.
- The runtime debug behavior requires an explicit user opt-in via localStorage key `versatiles_debug` set to "true". This prevents accidental exposure of debug logs to end users even when the app is built with debug enabled.
- Toggling debug mode in the UI writes `versatiles_debug` to localStorage. The app will honor that setting on subsequent loads.

Enabling on Vercel (recommended for previews/staging)

1. In your Vercel project settings, go to "Environment Variables".
2. Add a new variable with the name `VITE_DEBUG_ENABLED` and value `true` for the "Preview" or "Development" environment.
3. (Optional) Add `VITE_DEBUG_SHOW_PANEL=true` to show the Debug Panel UI by default.
4. Redeploy the preview. The debug UI will be present; open the Debug Panel and toggle "Enable Debug Mode" to opt-in for that browser session.

Notes & best practices

- Do NOT commit .env files with secrets. Only set Vite variables in CI/hosting environment settings.
- Keep VITE_DEBUG_ENABLED=false for production builds.
- The debug UI will not enable runtime debug logs unless `versatiles_debug` localStorage entry is set to "true". This prevents accidental logging in user browsers.

Troubleshooting

- If the Debug Panel doesn't appear in a preview deployment: ensure `VITE_DEBUG_ENABLED` and `VITE_DEBUG_SHOW_PANEL` are set to "true" (strings) in the Vercel settings and redeploy.
- To opt-in on a local dev server, set `VITE_DEBUG_ENABLED=true` in a local `.env` file and restart the dev server.

