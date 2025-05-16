import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button, Card } from '../components/ui';
import './ControlCenterPage.css';

// Icons
import { 
  FiSun, 
  FiMoon, 
  FiGlobe, 
  FiEye, 
  FiSettings, 
  FiCheck 
} from 'react-icons/fi';

const ControlCenterPage = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme, language, changeLanguage, currentTheme, changeTheme } = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Handle language change
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <motion.div 
      className="control-center-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.h1 variants={itemVariants}>{t('controlCenter')}</motion.h1>
        <motion.p variants={itemVariants} className="subtitle">
          Customize your experience with theme, language, and display preferences
        </motion.p>
        
        <div className="control-sections">
          <motion.section variants={itemVariants} className="control-section">
            <Card className="control-card">
              <div className="control-header">
                <FiSettings className="control-icon" />
                <h2>Theme Control</h2>
              </div>
              
              <div className="control-content">
                <h3>Current Theme: Aurora</h3>
                <p>The Aurora theme is inspired by the ethereal beauty of aurora borealis, featuring soft gradients and elegant components.</p>
                
                {/* Future theme options would go here */}
                <div className="theme-preview-box aurora-preview">
                  <div className="theme-colors">
                    <div className="color-dot primary"></div>
                    <div className="color-dot secondary"></div>
                    <div className="color-dot accent"></div>
                  </div>
                  <span>Aurora Theme</span>
                  <FiCheck className="active-check" />
                </div>
                
                <p className="coming-soon">Additional themes coming soon</p>
              </div>
            </Card>
          </motion.section>
          
          <motion.section variants={itemVariants} className="control-section">
            <Card className="control-card">
              <div className="control-header">
                <FiEye className="control-icon" />
                <h2>Display Mode</h2>
              </div>
              
              <div className="control-content">
                <div className="mode-selector">
                  <button 
                    className={`mode-button ${!isDark ? 'active' : ''}`} 
                    onClick={() => !isDark || toggleTheme()}
                  >
                    <FiSun className="mode-icon" />
                    <span>Light Mode</span>
                  </button>
                  
                  <button 
                    className={`mode-button ${isDark ? 'active' : ''}`} 
                    onClick={() => isDark || toggleTheme()}
                  >
                    <FiMoon className="mode-icon" />
                    <span>Dark Mode</span>
                  </button>
                </div>
                
                <div className="mode-info">
                  <p>
                    {isDark ? 
                      'Dark mode reduces eye strain in low-light conditions and saves battery on OLED screens.' : 
                      'Light mode provides better readability in bright environments and is the classic experience.'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>
          
          <motion.section variants={itemVariants} className="control-section">
            <Card className="control-card">
              <div className="control-header">
                <FiGlobe className="control-icon" />
                <h2>Language</h2>
              </div>
              
              <div className="control-content">
                <div className="language-options">
                  <button 
                    className={`language-button ${language === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    <span className="lang-label">EN</span>
                    <span>English</span>
                  </button>
                  
                  <button 
                    className={`language-button ${language === 'fr' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('fr')}
                  >
                    <span className="lang-label">FR</span>
                    <span>Français</span>
                  </button>
                  
                  <button 
                    className={`language-button ${language === 'ar' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('ar')}
                  >
                    <span className="lang-label">عر</span>
                    <span>العربية</span>
                  </button>
                </div>
                
                <div className="language-info">
                  <p>
                    Language selection adjusts not only the text but also typography and layout direction 
                    to ensure an optimal reading experience in each language.
                  </p>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlCenterPage;
