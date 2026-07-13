import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../lib/ThemeContext';
import { useIsVisible } from './useVisibleLoop';

const Motion = motion as any;

interface BackgroundProps {
  variant: 'hero' | 'process' | 'capabilities' | 'useCases' | 'execution';
}

export const WorkflowSectionBackground: React.FC<BackgroundProps> = ({ variant }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.01);

  // Detect prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Determine path colors based on theme
  const pathColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(9, 9, 11, 0.05)';
  const nodeColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(9, 9, 11, 0.08)';
  const flowColors = ['#DA8FFF', '#FF6482', '#FFC964'];

  // Dot Pattern Style
  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1' fill='${
      theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
    }'/%3e%3c/svg%3e")`,
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* 1. Base Subtle Dot Grid */}
      <div className="absolute inset-0 opacity-100" style={dotStyle} />

      {/* 2. Soft Gradient Ambient Glows */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-screen dark:mix-blend-normal">
        {variant === 'hero' && (
          <>
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-luma-purple/10 dark:bg-luma-purple/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-luma-pink/8 dark:bg-luma-pink/4 rounded-full blur-[140px]" />
            <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-luma-yellow/5 dark:bg-luma-yellow/2 rounded-full blur-[100px]" />
          </>
        )}
        {variant === 'process' && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-luma-purple/8 dark:bg-luma-purple/4 rounded-full blur-[130px]" />
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-luma-yellow/5 dark:bg-luma-yellow/2 rounded-full blur-[100px]" />
          </>
        )}
        {variant === 'capabilities' && (
          <>
            <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-luma-pink/8 dark:bg-luma-pink/4 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-0 w-[500px] h-[500px] bg-luma-purple/10 dark:bg-luma-purple/5 rounded-full blur-[120px]" />
          </>
        )}
        {variant === 'useCases' && (
          <>
            <div className="absolute top-[30%] right-[15%] w-[600px] h-[600px] bg-luma-yellow/5 dark:bg-luma-yellow/2 rounded-full blur-[130px]" />
            <div className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] bg-luma-purple/8 dark:bg-luma-purple/4 rounded-full blur-[110px]" />
          </>
        )}
        {variant === 'execution' && (
          <>
            <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[500px] bg-luma-pink/10 dark:bg-luma-pink/5 rounded-full blur-[130px]" />
            <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-luma-purple/8 dark:bg-luma-purple/3 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      {/* 3. Flowing Network Layer (GPU Accelerated, conditional render for viewport + reduced motion) */}
      {isVisible && !prefersReducedMotion && (
        <svg
          className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          {variant === 'hero' && (
            <>
              {/* Path 1: Top Left to Mid Right */}
              <path
                id="hero-p1"
                d="M -100 200 C 400 100, 500 500, 1100 400 C 1400 350, 1500 700, 1700 750"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />
              {/* Path 2: Bottom Left to Top Right */}
              <path
                id="hero-p2"
                d="M -100 800 C 300 700, 400 300, 900 350 C 1300 400, 1400 100, 1700 150"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />
              {/* Path 3: Middle Left to Middle Right (Main flow) */}
              <path
                id="hero-p3"
                d="M -100 500 C 300 400, 500 650, 800 450 C 1100 250, 1300 550, 1700 450"
                fill="none"
                stroke={pathColor}
                strokeWidth="1"
                strokeDasharray="4 8"
              />

              {/* Connected Node Dots */}
              <circle cx="430" cy="230" r="4" fill={nodeColor} />
              <circle cx="950" cy="355" r="4" fill={nodeColor} />
              <circle cx="1230" cy="515" r="4" fill={nodeColor} />

              {/* Data Packets */}
              <circle r="3.5" fill={flowColors[0]} className="shadow-[0_0_8px_#DA8FFF]">
                <animateMotion href="#hero-p1" dur="14s" repeatCount="indefinite" />
              </circle>
              <circle r="3.5" fill={flowColors[1]} className="shadow-[0_0_8px_#FF6482]">
                <animateMotion href="#hero-p2" dur="16s" repeatCount="indefinite" />
              </circle>
              <circle r="2.5" fill={flowColors[2]} className="shadow-[0_0_8px_#FFC964]">
                <animateMotion href="#hero-p3" dur="11s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {variant === 'process' && (
            <>
              {/* Process background has one heavy horizontal signal line */}
              <path
                id="process-p1"
                d="M -100 450 L 1700 450"
                fill="none"
                stroke={pathColor}
                strokeWidth="2"
                strokeDasharray="8 12"
              />
              <circle r="4" fill={flowColors[0]}>
                <animateMotion href="#process-p1" dur="12s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {variant === 'capabilities' && (
            <>
              {/* Curves entering from edges to create a mesh feeling */}
              <path
                id="cap-p1"
                d="M -50 300 C 300 350, 500 150, 800 250 C 1100 350, 1300 650, 1650 600"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />
              <path
                id="cap-p2"
                d="M -50 700 C 400 650, 600 850, 900 700 C 1200 550, 1300 250, 1650 300"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />
              <circle r="3.5" fill={flowColors[1]}>
                <animateMotion href="#cap-p1" dur="13s" repeatCount="indefinite" />
              </circle>
              <circle r="3.5" fill={flowColors[2]}>
                <animateMotion href="#cap-p2" dur="15s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {variant === 'useCases' && (
            <>
              {/* Branching workflow paths */}
              <path
                id="use-p1"
                d="M -100 450 Q 400 200, 800 450 T 1700 450"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />
              <path
                id="use-p2"
                d="M -100 450 Q 400 700, 800 450 T 1700 450"
                fill="none"
                stroke={pathColor}
                strokeWidth="1"
                strokeDasharray="2 6"
              />
              <circle r="3.5" fill={flowColors[0]}>
                <animateMotion href="#use-p1" dur="18s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill={flowColors[1]}>
                <animateMotion href="#use-p2" dur="14s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {variant === 'execution' && (
            <>
              {/* 3 faint columns and connections */}
              <path
                id="exec-p1"
                d="M 200 -50 L 200 950"
                fill="none"
                stroke={pathColor}
                strokeWidth="1"
              />
              <path
                id="exec-p2"
                d="M 800 -50 L 800 950"
                fill="none"
                stroke={pathColor}
                strokeWidth="1"
              />
              <path
                id="exec-p3"
                d="M 1400 -50 L 1400 950"
                fill="none"
                stroke={pathColor}
                strokeWidth="1"
              />
              {/* Horizontal signal cross-cutting */}
              <path
                id="exec-h"
                d="M -100 450 C 400 350, 1200 550, 1700 450"
                fill="none"
                stroke={pathColor}
                strokeWidth="1.5"
              />

              <circle r="3" fill={flowColors[0]}>
                <animateMotion href="#exec-h" dur="12s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill={flowColors[2]}>
                <animateMotion href="#exec-p2" dur="10s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
      )}

      {/* 4. Film Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03]" />
    </div>
  );
};
