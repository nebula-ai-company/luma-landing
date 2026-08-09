import React from 'react';
import { Link } from 'react-router-dom';
import { getPreloadHandlers } from '../lib/routePreload';

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
  
  // Primary: Black background in light mode, white in dark mode
  const primaryStyles = "bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-200 hover:scale-105 shadow-lg dark:hover:shadow-white/20 hover:shadow-black/15";
  
  // Secondary: Soft glass dark/light borders
  const secondaryStyles = "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm hover:border-black/20 dark:hover:border-white/20";

  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;
  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link to={href} {...getPreloadHandlers(href)} className={combinedClasses}>
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