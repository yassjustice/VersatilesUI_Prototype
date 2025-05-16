/**
 * DebugControls.jsx
 * Developer controls for toggling debug features during development
 */

import { useState, useEffect } from 'react';
import { DEBUG_CONFIG } from '../../config';
import './DebugControls.css';

function DebugControls() {
  const [showControls, setShowControls] = useState(false);
  const [isDebugEnabled, setIsDebugEnabled] = useState(DEBUG_CONFIG.ENABLED);
  const [config, setConfig] = useState({
    showPanel: DEBUG_CONFIG.SHOW_DEBUG_PANEL,
    logViewport: DEBUG_CONFIG.LOG_VIEWPORT_CHANGES,
    logButtons: DEBUG_CONFIG.LOG_BUTTON_STATES,
    highlight: DEBUG_CONFIG.HIGHLIGHT_COMPONENTS,
    logLevel: DEBUG_CONFIG.LOG_LEVEL
  });
  
  // Update local storage when debug settings change
  useEffect(() => {
    try {
      localStorage.setItem('versatiles_debug', isDebugEnabled.toString());
      
      // Apply debug class to html element if debug is enabled
      if (isDebugEnabled) {
        document.documentElement.classList.add('debug-mode');
      } else {
        document.documentElement.classList.remove('debug-mode');
      }
      
      // Force reload to apply changes
      if (isDebugEnabled !== DEBUG_CONFIG.ENABLED) {
        alert('Debug settings changed. Page will reload to apply changes.');
        window.location.reload();
      }
    } catch (e) {
      console.error('Error updating debug settings:', e);
    }
  }, [isDebugEnabled]);
  
  return (
    <div className="debug-controls">
      <button 
        className="debug-controls-toggle" 
        onClick={() => setShowControls(!showControls)}
      >
        {showControls ? 'Hide Debug Controls' : 'Show Debug Controls'}
      </button>
      
      {showControls && (
        <div className="debug-controls-panel">
          <h3>Debug Settings</h3>
          
          <div className="debug-control-option">
            <label>
              <input
                type="checkbox"
                checked={isDebugEnabled}
                onChange={() => setIsDebugEnabled(!isDebugEnabled)}
              />
              Enable Debug Mode
            </label>
            <small>Changes require page reload</small>
          </div>
          
          <div className="debug-note">
            <p>For more detailed configuration, edit <code>src/config.js</code></p>
          </div>
          
          <div className="debug-action">
            <button onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        </div>
      )}
    </div>  );
}

// Make sure this is a default export
export default DebugControls;
