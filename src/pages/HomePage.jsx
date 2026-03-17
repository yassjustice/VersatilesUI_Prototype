import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import './HomePage.css';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { t } = useTranslation();
  
  // Add scroll effect for parallax
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2 + (i * 0.1),
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="home-page">
      {/* Hero Section */}      
      <section className="hero-section">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <h1 className="hero-title">
              <span className="gradient-text">VersatilesUI</span>
              <br />
              Unleash Visual Excellence
            </h1>
            
            <p className="hero-description">
              A handcrafted UI component library that combines design elegance with infinite creativity. 
              Fully scalable, multilingual, with light/dark modes and typography perfection.
            </p>
            
            <div className="hero-actions">
              <Button 
                size="lg" 
                gradient={true}
                icon={<FiArrowRight />}
                iconPosition="end"
              >
                <Link to="/showroom">
                  {t('showroom')}
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="secondary-button"
              >
                <Link to="/how-to-use">
                  {t('howToUse')}
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              y: scrollY * 0.2,  // Subtle parallax movement on scroll
            }}
          >
            {/* Background sparkles for extra depth */}
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            
            {/* Primary visual elements with parallax */}
            <motion.div 
              className="design-element circle-1" 
              style={{ y: scrollY * -0.1, x: scrollY * 0.05 }}
            ></motion.div>
            <motion.div 
              className="design-element circle-2"
              style={{ y: scrollY * 0.15, x: scrollY * -0.05 }}
            ></motion.div>
            <motion.div 
              className="design-element circle-3"
              style={{ y: scrollY * -0.08 }}
            ></motion.div>
            <motion.div 
              className="design-element blob-1"
              style={{ y: scrollY * 0.12, rotate: scrollY * 0.02 }}
            ></motion.div>
            <motion.div 
              className="design-element blob-2"
              style={{ y: scrollY * -0.1, rotate: scrollY * -0.02 }}
            ></motion.div>
            <div className="design-element glow"></div>
            <motion.div 
              className="design-element glow-2"
              style={{ scale: 1 + scrollY * 0.0005 }}
            ></motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">{t('features')}</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={featureVariants}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature list with placeholders
const features = [
  {
    icon: '🎨',
    title: 'Aesthetically Superior',
    description: 'Meticulously crafted visual elements that elevate your user interface to art.'
  },
  {
    icon: '🌓',
    title: 'Light & Dark Modes',
    description: 'Seamlessly switch between elegantly designed light and dark themes.'
  },
  {
    icon: '🌐',
    title: 'Multilingual Support',
    description: 'Built-in support for English, French, and Arabic with optimized typography.'
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Perfectly scales from mobile devices to large desktop screens.'
  },
  {
    icon: '🔍',
    title: 'Accessibility First',
    description: 'Designed with accessibility in mind, ensuring everyone can use your application.'
  },
  {
    icon: '🧩',
    title: 'Modular Components',
    description: 'Highly reusable components that work together in perfect harmony.'
  }
];

export default HomePage;
