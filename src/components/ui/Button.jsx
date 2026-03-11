import { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  fullWidth = false,
  disabled = false,
  icon = null,
  iconPosition = 'start',
  gradient = false,
  glass = false,
  onClick,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Combine all classes
  const buttonClasses = `
    button 
    ${variant} 
    ${size} 
    ${rounded ? 'rounded' : ''} 
    ${fullWidth ? 'full-width' : ''} 
    ${gradient ? 'gradient' : ''} 
    ${glass ? 'glass' : ''} 
    ${disabled ? 'disabled' : ''} 
    ${className}
  `.trim();
  
  // Animation variants
  const buttonVariants = {
    initial: { 
      scale: 1, 
      boxShadow: variant === 'primary' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    },
    hover: { 
      scale: 1.02, 
      boxShadow: variant === 'primary' ? '0 6px 10px rgba(0, 0, 0, 0.15)' : 'none',
    },
    tap: { 
      scale: 0.98, 
      boxShadow: 'none',
    },
    disabled: {
      scale: 1,
      boxShadow: 'none',
    }
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      initial="initial"
      animate={disabled ? "disabled" : isPressed ? "tap" : isHovered ? "hover" : "initial"}
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => !disabled && setIsHovered(false)}
      onTapStart={() => !disabled && setIsPressed(true)}
      onTapCancel={() => !disabled && setIsPressed(false)}
      onTap={() => !disabled && setIsPressed(false)}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'start' && <span className="button-icon-start">{icon}</span>}
      <span className="button-text">{children}</span>
      {icon && iconPosition === 'end' && <span className="button-icon-end">{icon}</span>}
      
      {/* Subtle gradient overlay animation */}
      {!disabled && variant === 'primary' && (
        <motion.div 
          className="button-shine"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'outline', 'text']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  gradient: PropTypes.bool,
  glass: PropTypes.bool,
  onClick: PropTypes.func,  className: PropTypes.string
};
