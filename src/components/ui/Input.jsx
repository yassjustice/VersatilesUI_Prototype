import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Input.css';

export const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  icon,
  iconPosition = 'end',
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  
  // Determine if the input has a value
  const hasValue = value !== undefined && value !== '';
  
  // Handle focus and blur events
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Combine classes
  const inputClasses = `
    input-wrapper
    ${variant}
    ${size}
    ${isFocused ? 'focused' : ''}
    ${hasValue ? 'has-value' : ''}
    ${isHovered ? 'hovered' : ''}
    ${error ? 'error' : ''}
    ${success ? 'success' : ''}
    ${disabled ? 'disabled' : ''}
    ${fullWidth ? 'full-width' : ''}
    ${icon ? `has-icon icon-${iconPosition}` : ''}
    ${className}
  `.trim();
  
  // Auto focus to input if clicked on the wrapper
  const handleWrapperClick = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };
  
  // Animation for the label
  const labelVariants = {
    blurred: { 
      y: 0, 
      scale: 1,
      color: 'var(--color-text-tertiary)'
    },
    focused: { 
      y: '-130%', 
      scale: 0.85,
      color: 'var(--color-primary-500)'
    }
  };
  
  // Animation for border highlight
  const borderHighlightVariants = {
    blurred: { 
      width: '0%', 
      opacity: 0 
    },
    focused: { 
      width: '100%', 
      opacity: 1 
    }
  };
  
  // Optional indicator
  const renderRequiredIndicator = () => {
    if (required) {
      return <span className="required-indicator">*</span>;
    }
    return null;
  };
  
  return (
    <div 
      className={inputClasses}
      onClick={handleWrapperClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && (
        <motion.label
          className="input-label"
          htmlFor={props.id}
          initial={hasValue || isFocused ? 'focused' : 'blurred'}
          animate={hasValue || isFocused ? 'focused' : 'blurred'}
          variants={labelVariants}
          transition={{ duration: 0.2 }}
        >
          {label}
          {renderRequiredIndicator()}
        </motion.label>
      )}
      
      <div className="input-content">
        {icon && iconPosition === 'start' && (
          <span className="input-icon start">{icon}</span>
        )}
        
        <input
          ref={inputRef}
          type={type}
          className="input-field"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={!label ? placeholder : isFocused ? placeholder : ''}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        
        {icon && iconPosition === 'end' && (
          <span className="input-icon end">{icon}</span>
        )}
        
        <motion.div 
          className="input-border-highlight"
          initial="blurred"
          animate={isFocused ? 'focused' : 'blurred'}
          variants={borderHighlightVariants}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {error && (
        <div className="input-message error" id={`${props.id}-error`}>
          {error}
        </div>
      )}
      
      {success && !error && (
        <div className="input-message success">
          {success}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,  variant: PropTypes.oneOf(['default', 'filled', 'borderless']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
