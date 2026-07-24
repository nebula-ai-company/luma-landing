import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const Motion = motion as any;

interface WorkflowCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  accentColor?: string; // Hex or tailwind color
  delay?: number;
  index?: number;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  children,
  className = '',
  contentClassName = '',
  accentColor = '#DA8FFF',
  delay = 0,
  index = 0,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: delay || index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full ${className}`}
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full relative p-px overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
        }}
      >
        {/* Dynamic Border Gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none will-change-[opacity]"
          style={{
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${accentColor}, transparent 40%)`,
          }}
        />

        {/* Inner Content Surface */}
        <div
          className="relative h-full bg-white dark:bg-[#0a0a0a] border border-zinc-200/50 dark:border-white/10 overflow-hidden flex flex-col"
          style={{ borderRadius: '23px' }}
        >
          {/* Subtle Inner Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${accentColor}, transparent 50%)`,
            }}
          />

          {/* Content Wrapper */}
          <div className={`relative z-10 p-8 flex flex-col h-full flex-grow ${contentClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </Motion.div>
  );
};
