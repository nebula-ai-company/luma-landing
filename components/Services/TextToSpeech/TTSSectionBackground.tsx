import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../../lib/ThemeContext';

const Motion = motion as any;

interface TTSSectionBackgroundProps {
  variant: 'models' | 'howItWorks' | 'capabilities' | 'useCases' | 'pricing' | 'faq';
}

export const TTSSectionBackground: React.FC<TTSSectionBackgroundProps> = ({ variant }) => {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  // Smooth Equalizer heights array (representing audio frequency bars)
  const eqBarsCount = 42;
  const eqHeights = [
    30, 60, 40, 85, 110, 50, 75, 130, 90, 45, 100, 140, 70, 90, 150, 110, 60, 80,
    125, 95, 50, 115, 135, 70, 95, 55, 145, 80, 120, 65, 100, 45, 90, 130, 75, 50,
    110, 80, 60, 100, 70, 40
  ];

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      
      {/* 1. Subtle Section Edge Fades (Soft transition into neighboring sections without masking the center) */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#FAFAFA] to-transparent dark:from-black to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] to-transparent dark:from-black to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* 2. Main Animated Canvas Container */}
      <div className="absolute inset-0 overflow-hidden z-0">
        
        {/* Soft Background Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]" 
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }} 
        />

        {/* 3. Smooth Moving Radial Gradients (Subtle ambient color aura) */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          {/* Primary Violet-Purple Orbit Orb */}
          <Motion.div 
            animate={shouldReduceMotion ? {} : { 
              x: [-60, 60, -60], 
              y: [-40, 40, -40], 
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-luma-purple/5 dark:bg-luma-purple/6 blur-[140px]" 
          />

          {/* Secondary Pink-Rose Accent Orb */}
          <Motion.div 
            animate={shouldReduceMotion ? {} : { 
              x: [50, -50, 50], 
              y: [40, -40, 40], 
              scale: [1.15, 0.9, 1.15] 
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-[10%] left-[5%] w-[650px] h-[650px] rounded-full bg-luma-pink/4 dark:bg-luma-pink/5 blur-[150px]" 
          />

          {/* Tertiary Gold-Yellow Frequency Glow Orb */}
          <Motion.div 
            animate={shouldReduceMotion ? {} : { 
              x: [-30, 40, -30], 
              y: [30, -30, 30], 
              scale: [0.95, 1.25, 0.95] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-[35%] left-[30%] w-[500px] h-[500px] rounded-full bg-luma-yellow/4 dark:bg-luma-yellow/5 blur-[160px]" 
          />
        </div>

        {/* 4. Floating Audio Equalizer Wave (Centered vertically behind cards, subtle & elegant) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 flex items-center justify-between px-4 sm:px-12 md:px-20 opacity-12 dark:opacity-20 pointer-events-none">
          {eqHeights.map((baseH, idx) => {
            const delay = (idx * 0.08) % 1.8;
            const dur = 1.2 + (idx % 6) * 0.25;
            
            // Varied gradient per bar for rich music vibe
            const barGradients = [
              'bg-gradient-to-t from-luma-purple/40 via-purple-500/30 to-luma-pink/40',
              'bg-gradient-to-t from-luma-pink/40 via-rose-500/30 to-luma-yellow/40',
              'bg-gradient-to-t from-luma-yellow/40 via-amber-500/30 to-luma-purple/40',
              'bg-gradient-to-t from-purple-500/40 via-luma-purple/30 to-pink-500/40'
            ];
            const currentGradient = barGradients[idx % barGradients.length];

            return (
              <Motion.div
                key={`center-eq-${idx}`}
                className={`w-1.5 sm:w-2 md:w-2.5 rounded-full ${currentGradient}`}
                animate={
                  shouldReduceMotion
                    ? { height: `${baseH * 0.6}px` }
                    : { 
                        height: [
                          `${Math.max(16, baseH * 0.3)}px`, 
                          `${baseH * 1.25}px`, 
                          `${Math.max(20, baseH * 0.4)}px`, 
                          `${baseH * 1.1}px`
                        ] 
                      }
                }
                transition={{
                  duration: dur,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: delay,
                }}
              />
            );
          })}
        </div>

        {/* 5. Smooth Flowing Harmonic Sine Wave (Floating SVG behind content) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-18 dark:opacity-28 pointer-events-none"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveFlowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#DA8FFF' : '#a855f7'} stopOpacity="0.6" />
              <stop offset="50%" stopColor={isDark ? '#FF6482' : '#f43f5e'} stopOpacity="0.6" />
              <stop offset="100%" stopColor={isDark ? '#FFC837' : '#d97706'} stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="waveFlowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#FF6482' : '#f43f5e'} stopOpacity="0.5" />
              <stop offset="100%" stopColor={isDark ? '#DA8FFF' : '#a855f7'} stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Upper Sine Wave Ribbon */}
          <Motion.path
            d="M -100 350 C 300 180, 600 520, 1000 280 C 1300 120, 1500 450, 1700 320"
            fill="none"
            stroke="url(#waveFlowGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 12"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -180] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />

          {/* Lower Harmonic Bass Wave Ribbon */}
          <Motion.path
            d="M -100 550 C 400 720, 800 380, 1200 620 C 1450 780, 1600 480, 1700 550"
            fill="none"
            stroke="url(#waveFlowGrad2)"
            strokeWidth="2"
            strokeDasharray="8 16"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, 180] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* 6. Subtle Micro-Grain Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] dark:opacity-[0.025] pointer-events-none" />
      </div>
    </div>
  );
};
