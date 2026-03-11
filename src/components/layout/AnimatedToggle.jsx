/**
 * AnimatedToggle.jsx
 * A reusable animated toggle button component that supports different icon sets
 * and provides visual feedback with animations.
 */

import React from 'react';
import PropTypes from 'prop-types';

// Import different icon sets to support both outline and fill icons
import * as Fi from 'react-icons/fi'; // Feather Icons (outline)
import * as Fa from 'react-icons/fa'; // Font Awesome (solid)
import * as Hi from 'react-icons/hi'; // Heroicons
import * as Bs from 'react-icons/bs'; // Bootstrap Icons
import * as Io from 'react-icons/io5'; // Ionicons

// Import specific icons directly to ensure they're available
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe, FaChevronDown, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import './AnimatedToggle.css';

const iconSets = { Fi, Fa, Hi, Bs, Io };

const AnimatedToggle = ({
  type = 'default',
  icon,
  iconAlt,
  isActive = false,
  onClick,
  ariaLabel,
  className = '',
  animationProps = {},
  testId,
}) => {
  // Select icon components based on the provided icon names
  const getIconComponent = (iconName) => {
    if (!iconName) return null;
    
    // Direct mapping for common icons to ensure they work
    if (iconName === 'Fa:Sun') return FaSun;
    if (iconName === 'Fa:Moon') return FaMoon;
    if (iconName === 'Fa:Bars') return FaBars;
    if (iconName === 'Fa:Times') return FaTimes;
    if (iconName === 'Fa:Globe') return FaGlobe;
    if (iconName === 'Fa:ChevronDown') return FaChevronDown;
    if (iconName === 'Fa:ChevronRight') return FaChevronRight;
    if (iconName === 'Fa:ChevronLeft') return FaChevronLeft;
    
    // Check for set prefix in icon name (e.g. "Fi:Sun")
    if (iconName.includes(':')) {
      const [set, name] = iconName.split(':');
      return iconSets[set]?.[name] || null;
    }
    
    // Default to Feather icons if no prefix
    return Fi[iconName] || null;
  };
  
  const PrimaryIcon = getIconComponent(icon);
  const SecondaryIcon = iconAlt ? getIconComponent(iconAlt) : null;
  
  // Determine if we're in dark mode for theme toggle
  const isDark = type === 'theme' && (icon === 'Fa:Moon' || icon === 'FaMoon' || icon.includes('Moon'));
  
  // Determine active class based on type and isActive prop
  const activeClass = isActive ? 
    (type === 'theme' ? (isDark ? 'is-dark' : 'is-light') : 
     type === 'menu' ? 'is-open' : 'collapsed') : '';
    // Set up animation variants based on type
  const variants = {
    tap: { scale: 0.9 },
    hover: { scale: 1.1 },
  };
  
  return (
    <motion.button
      className={`animated-toggle ${type}-toggle ${activeClass} ${className}`}
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      aria-label={ariaLabel}
      data-testid={testId}
      {...animationProps}
    >      {/* Theme toggle with sun/moon decoration */}
      {type === 'theme' && (
        <>
          <div className="sun-rays"></div>
          <div className="moon-mask"></div>
          <span className="icon-wrapper">
            {PrimaryIcon && <PrimaryIcon />}
          </span>
        </>
      )}
        {/* Mobile menu toggle with fade transition between icons (no rotation) */}
      {type === 'menu' && (
        <>
          <span className="menu-icon">{PrimaryIcon && <PrimaryIcon />}</span>
          <span className="close-icon">{SecondaryIcon && <SecondaryIcon />}</span>
          {/* Tooltip will be shown via CSS ::after pseudo-element */}
        </>
      )}
      
      {/* Language toggle with globe icon */}
      {type === 'lang' && (
        <>
          <span className="icon-wrapper">{PrimaryIcon && <PrimaryIcon />}</span>
          <span className="chevron-icon">{SecondaryIcon && <SecondaryIcon />}</span>
        </>
      )}
      
      {/* Sidebar toggle with directional arrow */}
      {type === 'sidebar' && (
        <span className="icon-wrapper">
          {PrimaryIcon && <PrimaryIcon />}
        </span>
      )}
      
      {/* Default fallback */}
      {!['theme', 'menu', 'lang', 'sidebar'].includes(type) && (
        <span className="icon-wrapper">
          {PrimaryIcon && <PrimaryIcon />}
        </span>
      )}
    </motion.button>
  );
};

AnimatedToggle.propTypes = {
  type: PropTypes.oneOf(['default', 'theme', 'sidebar', 'menu', 'lang']),
  icon: PropTypes.string.isRequired,
  iconAlt: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  animationProps: PropTypes.object,
  testId: PropTypes.string,
  labelText: PropTypes.string,
};

export default AnimatedToggle;
