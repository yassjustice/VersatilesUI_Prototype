import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fallbackVars.css' // Added fallback variables first
import './styles/globals.css'
import './index.css'
import App from './App.jsx'
import { initializeDebugFeatures } from './utils/debugInitializer'
import { DEBUG_CONFIG } from './config'

// Initialize debugging features only if enabled in config
if (DEBUG_CONFIG.ENABLED) {
  initializeDebugFeatures()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
