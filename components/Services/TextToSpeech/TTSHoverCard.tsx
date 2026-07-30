import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TTSHoverCardProps {
  children: React.ReactNode;
  accentColor?: 'yellow' | 'pink' | 'purple';
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
}

const BRAND_COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

export const TTSHoverCard: React.FC<TTSHoverCardProps> = ({
  children,
  accentColor = 'yellow',
  className = '',
  innerClassName = '',
  onClick,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const colorHex = BRAND_COLORS[accentColor] || BRAND_COLORS.yellow;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-[24px] p-[1px] bg-black/5 dark:bg-white/10 overflow-hidden transition-all duration-300 ${
        shouldReduceMotion ? '' : 'hover:-translate-y-1'
      } ${className}`}
    >
      {/* Dynamic Border Gradient on Hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${colorHex}, transparent 40%)`
            : '',
        }}
      />

      {/* Inner Content Container */}
      <div
        className={`relative h-full rounded-[23px] bg-white dark:bg-black transition-colors duration-300 overflow-hidden ${innerClassName}`}
      >
        {/* Card Surface Inner Radial Glow following cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300 ease-out z-0"
          style={{
            background: isHovered
              ? `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${colorHex}, transparent 60%)`
              : '',
          }}
        />

        {/* Card Content Wrapper */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
