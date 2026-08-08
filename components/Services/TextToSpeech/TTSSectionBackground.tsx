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

  // Luma 3 Core Brand Colors
  const LUMA_PURPLE = '#DA8FFF';
  const LUMA_PINK = '#FF6482';
  const LUMA_YELLOW = '#FFC837';

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      
      {/* 1. Seamless Top & Bottom Transition Masks for Smooth Section-to-Section Flow */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none transition-colors duration-300" />

      {/* 2. Main Animated Background Layer */}
      <div className="absolute inset-0 overflow-hidden z-0">
        
        {/* Very Faint Studio Micro-Dot Grid for Tactile Depth (No hard lines or dashes) */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />

        {/* 3. Fluid Animated Ambient Orbs using ONLY Luma Purple, Pink, and Yellow */}
        <div className="absolute inset-0 overflow-hidden">
          {variant === 'models' && (
            <>
              {/* Luma Purple Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [-40, 50, -40], 
                  y: [-30, 30, -30], 
                  scale: [1, 1.18, 1] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-5%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[150px]" 
              />
              {/* Luma Pink Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [40, -40, 40], 
                  y: [30, -30, 30], 
                  scale: [1.15, 0.9, 1.15] 
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[160px]" 
              />
              {/* Luma Yellow Center Accent */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.9, 1.2, 0.9],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#FFC837]/4 dark:bg-[#FFC837]/6 blur-[140px]" 
              />
            </>
          )}

          {variant === 'howItWorks' && (
            <>
              {/* Luma Yellow Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [-30, 40, -30], 
                  y: [20, -30, 20], 
                  scale: [0.95, 1.22, 0.95] 
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] left-[15%] w-[700px] h-[550px] rounded-full bg-[#FFC837]/5 dark:bg-[#FFC837]/8 blur-[170px]" 
              />
              {/* Luma Purple Accent */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [30, -30, 30], 
                  y: [-20, 30, -20] 
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute bottom-[10%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/9 blur-[150px]" 
              />
              {/* Luma Pink Soft Field */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[45%] right-[35%] w-[450px] h-[450px] rounded-full bg-[#FF6482]/4 dark:bg-[#FF6482]/7 blur-[140px]" 
              />
            </>
          )}

          {variant === 'capabilities' && (
            <>
              {/* Luma Pink Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.25, 1], 
                  x: [-20, 30, -20]
                }}
                transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[5%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#FF6482]/6 dark:bg-[#FF6482]/9 blur-[160px]" 
              />
              {/* Luma Purple Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [30, -30, 30], 
                  scale: [1.2, 0.95, 1.2] 
                }}
                transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[150px]" 
              />
              {/* Luma Yellow Glow */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { y: [-20, 20, -20] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[35%] right-[40%] w-[400px] h-[400px] rounded-full bg-[#FFC837]/4 dark:bg-[#FFC837]/6 blur-[130px]" 
              />
            </>
          )}

          {variant === 'useCases' && (
            <>
              {/* Luma Purple Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [-30, 30, -30], 
                  x: [20, -20, 20] 
                }}
                transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] right-[10%] w-[700px] h-[700px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[170px]" 
              />
              {/* Luma Pink Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [30, -30, 30],
                  scale: [0.95, 1.2, 0.95]
                }}
                transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
              {/* Luma Yellow Ambient Field */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { x: [-20, 20, -20] }}
                transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[40%] left-[30%] w-[450px] h-[450px] rounded-full bg-[#FFC837]/4 dark:bg-[#FFC837]/6 blur-[140px]" 
              />
            </>
          )}

          {variant === 'pricing' && (
            <>
              {/* Luma Yellow Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.9, 1.2, 0.9], 
                  x: [-30, 30, -30] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] left-[15%] w-[700px] h-[550px] rounded-full bg-[#FFC837]/5 dark:bg-[#FFC837]/8 blur-[160px]" 
              />
              {/* Luma Pink Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [1.2, 0.9, 1.2],
                  y: [-20, 20, -20]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-[10%] right-[15%] w-[650px] h-[650px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
              {/* Luma Purple Glow */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[45%] left-[45%] w-[400px] h-[400px] rounded-full bg-[#DA8FFF]/5 dark:bg-[#DA8FFF]/8 blur-[130px]" 
              />
            </>
          )}

          {variant === 'faq' && (
            <>
              {/* Luma Purple Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [0, -35, 0], 
                  x: [0, 25, 0] 
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[5%] right-[15%] w-[750px] h-[600px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/9 blur-[180px]" 
              />
              {/* Luma Pink Ambient Light */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [0, 35, 0], 
                  x: [0, -25, 0] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[15%] w-[600px] h-[550px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
              {/* Luma Yellow Accent */}
              <Motion.div 
                animate={shouldReduceMotion ? {} : { scale: [0.95, 1.2, 0.95] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[40%] left-[35%] w-[400px] h-[400px] rounded-full bg-[#FFC837]/4 dark:bg-[#FFC837]/6 blur-[140px]" 
              />
            </>
          )}
        </div>

        {/* 4. Elegant Concentric Acoustic Frequency Ripples (Pure solid smooth thin curves, NO dashes, NO bars, ultra-low opacity) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {/* Concentric Acoustic Circles pulsing gently like studio sound reflections */}
            <Motion.circle
              cx="600"
              cy="400"
              r="220"
              stroke={LUMA_PURPLE}
              strokeWidth="1.5"
              animate={shouldReduceMotion ? {} : { scale: [0.96, 1.04, 0.96], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Motion.circle
              cx="600"
              cy="400"
              r="380"
              stroke={LUMA_PINK}
              strokeWidth="1"
              animate={shouldReduceMotion ? {} : { scale: [1.03, 0.97, 1.03], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <Motion.circle
              cx="600"
              cy="400"
              r="540"
              stroke={LUMA_YELLOW}
              strokeWidth="1"
              animate={shouldReduceMotion ? {} : { scale: [0.98, 1.02, 0.98], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </svg>
        </div>

        {/* 5. Micro-Grain Overlay for Premium High-End Depth */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025] pointer-events-none" />
      </div>
    </div>
  );
};
