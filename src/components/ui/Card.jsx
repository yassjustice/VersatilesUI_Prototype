import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Card.css';

export const Card = ({
  children,
  variant = 'default',
  elevation = 'md',
  interactive = false,
  bordered = false,
  glass = false,
  gradient = false,
  className = '',
  onClick,
  ...props
}) => {
  // Combine all classes
  const cardClasses = `
    card
    ${variant}
    elevation-${elevation}
    ${bordered ? 'bordered' : ''}
    ${interactive ? 'interactive' : ''}
    ${glass ? 'glass' : ''}
    ${gradient ? 'gradient' : ''}
    ${className}
  `.trim();
  
  // Animation variants
  const cardVariants = {
    initial: { 
      scale: 1, 
      y: 0 
    },
    hover: interactive ? { 
      scale: 1.01, 
      y: -5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    } : {},
    tap: interactive ? { 
      scale: 0.99, 
      y: -2
    } : {},
  };

  const CardComponent = interactive ? motion.div : 'div';
  const interactiveProps = interactive ? {
    initial: "initial",
    whileHover: "hover",
    whileTap: "tap",
    variants: cardVariants,
    transition: { type: "spring", stiffness: 500, damping: 30 },
    onClick,
    role: "button",
    tabIndex: 0,
  } : {};

  return (
    <CardComponent 
      className={cardClasses}
      {...interactiveProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'raised', 'flat', 'floating']),
  elevation: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  interactive: PropTypes.bool,
  bordered: PropTypes.bool,
  glass: PropTypes.bool,
  gradient: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

// Card header component
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Card content component
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Card footer component
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Card media component
export const CardMedia = ({ src, alt, className = '', ...props }) => (
  <div className={`card-media ${className}`} {...props}>
    <img src={src} alt={alt} />
  </div>
);

CardMedia.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,  className: PropTypes.string,
};
