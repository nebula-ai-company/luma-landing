import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
  externalHref?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  externalHref, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";
  
  // Primary: White background, dark text
  const primaryStyles = "bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-lg hover:shadow-white/20";
  
  // Secondary: Dark/Glassy with border
  const secondaryStyles = "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/20";

  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;
  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (externalHref) {
    return (
      <a href={externalHref} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;