import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../../lib/ThemeContext';

const Motion = motion as any;

interface VideoEnhancementSectionBackgroundProps {
  variant: 'hero' | 'models' | 'features' | 'guidance' | 'howItWorks' | 'useCases' | 'pricing' | 'faq';
}

export const VideoEnhancementSectionBackground: React.FC<VideoEnhancementSectionBackgroundProps> = ({ variant }) => {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  // Luma 3 Core Brand Colors
  const LUMA_PURPLE = '#DA8FFF';
  const LUMA_PINK = '#FF6482';
  const LUMA_YELLOW = '#FFB340';

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      
      {/* 1. Seamless Top & Bottom Transition Masks for Smooth Section Flow */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none transition-colors duration-300" />

      {/* 2. Main Animated Background Layer */}
      <div className="absolute inset-0 overflow-hidden z-0">
        
        {/* Subtle Micro-Grid for Cinematic Visual Depth */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]" 
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }} 
        />

        {/* 3. Fluid Animated Ambient Light Fields using ONLY Luma Purple, Pink, and Yellow */}
        <div className="absolute inset-0 overflow-hidden">
          {variant === 'hero' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [-30, 40, -30], 
                  y: [-20, 30, -20], 
                  scale: [1, 1.15, 1] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-5%] right-[20%] w-[700px] h-[700px] rounded-full bg-[#DA8FFF]/8 dark:bg-[#DA8FFF]/12 blur-[170px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [40, -30, 40], 
                  y: [30, -20, 30], 
                  scale: [1.1, 0.95, 1.1] 
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#FF6482]/6 dark:bg-[#FF6482]/10 blur-[160px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.95, 1.2, 0.95],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[45%] right-[40%] w-[450px] h-[450px] rounded-full bg-[#FFB340]/4 dark:bg-[#FFB340]/7 blur-[140px]" 
              />
            </>
          )}

          {variant === 'models' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [-40, 50, -40], 
                  y: [-30, 30, -30], 
                  scale: [1, 1.18, 1] 
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-5%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/7 dark:bg-[#DA8FFF]/11 blur-[160px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [40, -40, 40], 
                  y: [30, -30, 30], 
                  scale: [1.15, 0.9, 1.15] 
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/9 blur-[160px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.9, 1.2, 0.9],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#FFB340]/4 dark:bg-[#FFB340]/6 blur-[140px]" 
              />
            </>
          )}

          {variant === 'features' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.25, 1], 
                  x: [-20, 30, -20]
                }}
                transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[5%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#FF6482]/6 dark:bg-[#FF6482]/10 blur-[160px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [30, -30, 30], 
                  scale: [1.2, 0.95, 1.2] 
                }}
                transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[150px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { y: [-20, 20, -20] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[35%] right-[40%] w-[400px] h-[400px] rounded-full bg-[#FFB340]/4 dark:bg-[#FFB340]/7 blur-[130px]" 
              />
            </>
          )}

          {variant === 'guidance' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [-30, 40, -30], 
                  y: [20, -30, 20], 
                  scale: [0.95, 1.2, 0.95] 
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] left-[15%] w-[700px] h-[550px] rounded-full bg-[#FFB340]/5 dark:bg-[#FFB340]/8 blur-[170px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  x: [30, -30, 30], 
                  y: [-20, 30, -20] 
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute bottom-[10%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/9 blur-[150px]" 
              />
            </>
          )}

          {variant === 'howItWorks' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [-30, 30, -30], 
                  x: [20, -20, 20] 
                }}
                transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] right-[10%] w-[700px] h-[700px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[170px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [30, -30, 30],
                  scale: [0.95, 1.2, 0.95]
                }}
                transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
            </>
          )}

          {variant === 'useCases' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.9, 1.2, 0.9], 
                  x: [-30, 30, -30] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] left-[15%] w-[700px] h-[550px] rounded-full bg-[#FFB340]/5 dark:bg-[#FFB340]/8 blur-[160px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [1.2, 0.9, 1.2],
                  y: [-20, 20, -20]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-[10%] right-[15%] w-[650px] h-[650px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
            </>
          )}

          {variant === 'pricing' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [0, -35, 0], 
                  x: [0, 25, 0] 
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[5%] right-[15%] w-[750px] h-[600px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/10 blur-[180px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [0, 35, 0], 
                  x: [0, -25, 0] 
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[5%] left-[15%] w-[600px] h-[550px] rounded-full bg-[#FF6482]/5 dark:bg-[#FF6482]/8 blur-[150px]" 
              />
            </>
          )}

          {variant === 'faq' && (
            <>
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  y: [0, -30, 0], 
                  x: [0, 20, 0] 
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[5%] right-[15%] w-[750px] h-[600px] rounded-full bg-[#DA8FFF]/6 dark:bg-[#DA8FFF]/9 blur-[180px]" 
              />
              <Motion.div 
                animate={shouldReduceMotion ? {} : { 
                  scale: [0.95, 1.15, 0.95] 
                }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#FFB340]/4 dark:bg-[#FFB340]/7 blur-[150px]" 
              />
            </>
          )}
        </div>

        {/* 4. Optical Frame Scan Lines (Restrained & ultra-low opacity) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <Motion.circle
              cx="600"
              cy="400"
              r="280"
              stroke={LUMA_PURPLE}
              strokeWidth="1.5"
              animate={shouldReduceMotion ? {} : { scale: [0.97, 1.03, 0.97], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Motion.circle
              cx="600"
              cy="400"
              r="460"
              stroke={LUMA_PINK}
              strokeWidth="1"
              animate={shouldReduceMotion ? {} : { scale: [1.02, 0.98, 1.02], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </svg>
        </div>

        {/* 5. Micro-Grain Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025] pointer-events-none" />
      </div>
    </div>
  );
};
