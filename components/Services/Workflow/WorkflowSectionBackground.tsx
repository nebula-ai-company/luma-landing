import React, { useRef, useMemo, useId } from 'react';
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
  const instanceId = useId().replace(/:/g, '');

  // Detect prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Determine neutral grayscale colors based on theme
  const pathColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(9, 9, 11, 0.03)';
  const signalColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(9, 9, 11, 0.08)';
  const packetColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(9, 9, 11, 0.18)';
  const pulseColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(9, 9, 11, 0.1)';

  // Dot Pattern Style
  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1' fill='${
      theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'
    }'/%3e%3c/svg%3e")`,
  };

  const p1Id = `${instanceId}-p1`;
  const p2Id = `${instanceId}-p2`;
  const p3Id = `${instanceId}-p3`;
  const p4Id = `${instanceId}-p4`;

  // Get path configuration based on variant (all neutral color fields removed)
  const config = useMemo(() => {
    switch (variant) {
      case 'hero':
        return {
          paths: [
            { id: p1Id, d: 'M -100 200 C 400 100, 500 500, 1100 400 C 1400 350, 1500 700, 1700 750', dur: '14s', offset: [0, -108], dash: '3 24' },
            { id: p2Id, d: 'M -100 800 C 300 700, 400 300, 900 350 C 1300 400, 1400 100, 1700 150', dur: '16s', offset: [0, -120], dash: '4 30' },
            { id: p3Id, d: 'M -100 500 C 300 400, 500 650, 800 450 C 1100 250, 1300 550, 1700 450', dur: '12s', offset: [0, -96], dash: '5 18' }
          ],
          junctions: [
            { cx: 430, cy: 230, delay: 0 },
            { cx: 950, cy: 355, delay: 1.5 },
            { cx: 1230, cy: 515, delay: 0.8 }
          ]
        };
      case 'process':
        return {
          paths: [
            { id: p1Id, d: 'M -100 350 C 400 300, 800 400, 1700 350', dur: '11s', offset: [0, -120], dash: '6 24' },
            { id: p2Id, d: 'M -100 550 C 400 600, 800 500, 1700 550', dur: '13s', offset: [0, -108], dash: '4 28' }
          ],
          junctions: [
            { cx: 300, cy: 335, delay: 0.5 },
            { cx: 800, cy: 550, delay: 1.2 },
            { cx: 1300, cy: 380, delay: 2.0 }
          ]
        };
      case 'capabilities':
        return {
          paths: [
            { id: p1Id, d: 'M -50 300 C 300 350, 500 150, 800 250 C 1100 350, 1300 650, 1650 600', dur: '13s', offset: [0, -100], dash: '3 20' },
            { id: p2Id, d: 'M -50 700 C 400 650, 600 850, 900 700 C 1200 550, 1300 250, 1650 300', dur: '15s', offset: [0, -112], dash: '4 24' }
          ],
          junctions: [
            { cx: 650, cy: 220, delay: 0.2 },
            { cx: 1050, cy: 620, delay: 1.4 }
          ]
        };
      case 'useCases':
        return {
          paths: [
            { id: p1Id, d: 'M -100 450 Q 400 150, 800 450 T 1700 450', dur: '15s', offset: [0, -108], dash: '5 20' },
            { id: p2Id, d: 'M -100 450 Q 400 750, 800 450 T 1700 450', dur: '17s', offset: [0, -120], dash: '3 24' }
          ],
          junctions: [
            { cx: 400, cy: 300, delay: 0.4 },
            { cx: 800, cy: 450, delay: 1.6 },
            { cx: 1200, cy: 600, delay: 0.8 }
          ]
        };
      case 'execution':
        return {
          paths: [
            { id: p1Id, d: 'M 250 -50 L 250 950', dur: '14s', offset: [0, -108], dash: '4 20' },
            { id: p2Id, d: 'M 800 -50 L 800 950', dur: '16s', offset: [0, -120], dash: '3 24' },
            { id: p3Id, d: 'M 1350 -50 L 1350 950', dur: '15s', offset: [0, -96], dash: '5 18' },
            { id: p4Id, d: 'M -100 450 C 400 350, 1200 550, 1700 450', dur: '12s', offset: [0, -108], dash: '4 24' }
          ],
          junctions: [
            { cx: 250, cy: 430, delay: 0.3 },
            { cx: 800, cy: 480, delay: 1.5 },
            { cx: 1350, cy: 440, delay: 0.9 }
          ]
        };
      default:
        return { paths: [], junctions: [] };
    }
  }, [variant, p1Id, p2Id, p3Id, p4Id]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Base Dot Grid */}
      <div className="absolute inset-0" style={dotStyle} />

      {/* 2. Soft Neutral Grayscale Ambient Glows */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 mix-blend-normal">
        {variant === 'hero' && (
          <>
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-zinc-400/5 dark:bg-zinc-500/3 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-zinc-300/4 dark:bg-zinc-600/3 rounded-full blur-[140px]" />
            <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-zinc-200/4 dark:bg-zinc-700/2 rounded-full blur-[100px]" />
          </>
        )}
        {variant === 'process' && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-zinc-400/5 dark:bg-zinc-500/3 rounded-full blur-[130px]" />
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-zinc-300/4 dark:bg-zinc-600/2 rounded-full blur-[100px]" />
          </>
        )}
        {variant === 'capabilities' && (
          <>
            <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-zinc-300/4 dark:bg-zinc-600/3 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-0 w-[500px] h-[500px] bg-zinc-400/5 dark:bg-zinc-500/3 rounded-full blur-[120px]" />
          </>
        )}
        {variant === 'useCases' && (
          <>
            <div className="absolute top-[30%] right-[15%] w-[600px] h-[600px] bg-zinc-200/4 dark:bg-zinc-700/2 rounded-full blur-[130px]" />
            <div className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] bg-zinc-400/5 dark:bg-zinc-500/3 rounded-full blur-[110px]" />
          </>
        )}
        {variant === 'execution' && (
          <>
            <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[500px] bg-zinc-300/4 dark:bg-zinc-600/3 rounded-full blur-[130px]" />
            <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-zinc-400/5 dark:bg-zinc-500/2 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      {/* 3. Flowing Network Layer (Subtle, masked & correct aspect ratio) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial Gradient for edge-fading mask */}
          <radialGradient id={`${instanceId}-edge-grad`} cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${instanceId}-edge-mask`}>
            <rect x="-100" y="-100" width="1800" height="1100" fill={`url(#${instanceId}-edge-grad)`} />
          </mask>
        </defs>

        {/* Group with edge-mask to fade paths nicely at section borders */}
        <g mask={`url(#${instanceId}-edge-mask)`}>
          {/* Layer 1: Static Route */}
          {config.paths.map((p) => (
            <path
              key={`static-${p.id}`}
              id={p.id}
              d={p.d}
              fill="none"
              stroke={pathColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          {/* Dynamic layers render conditionally */}
          {isVisible && !prefersReducedMotion && (
            <>
              {/* Layer 2: Moving Signals */}
              {config.paths.map((p) => (
                <Motion.path
                  key={`signal-${p.id}`}
                  d={p.d}
                  fill="none"
                  stroke={signalColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={p.dash}
                  animate={{ strokeDashoffset: p.offset }}
                  transition={{
                    duration: parseFloat(p.dur) * 0.8,
                    repeat: Infinity,
                    ease: 'linear',
                    useHtml: false
                  }}
                />
              ))}

              {/* Layer 3: Moving Data Packets */}
              {config.paths.map((p) => (
                <React.Fragment key={`packet-group-${p.id}`}>
                  <circle r="4" fill={packetColor} style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 4px rgba(255,255,255,0.25))' : 'drop-shadow(0 0 4px rgba(0,0,0,0.15))' }}>
                    <animateMotion dur={p.dur} repeatCount="indefinite">
                      <mpath href={`#${p.id}`} />
                    </animateMotion>
                  </circle>
                  {/* Secondary delayed packet for visual depth */}
                  <circle r="3" fill={packetColor} opacity="0.6" style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 3px rgba(255,255,255,0.15))' : 'drop-shadow(0 0 3px rgba(0,0,0,0.1))' }}>
                    <animateMotion dur={p.dur} begin={`${parseFloat(p.dur) / 2}s`} repeatCount="indefinite">
                      <mpath href={`#${p.id}`} />
                    </animateMotion>
                  </circle>
                </React.Fragment>
              ))}

              {/* Pulsing Junctions */}
              {config.junctions.map((j, idx) => (
                <g key={`junction-${idx}`} transform={`translate(${j.cx}, ${j.cy})`}>
                  <circle cx="0" cy="0" r="4" fill={theme === 'dark' ? '#fff' : '#000'} opacity="0.3" />
                  <Motion.circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill="none"
                    stroke={pulseColor}
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: j.delay,
                      ease: 'easeOut',
                    }}
                  />
                </g>
              ))}
            </>
          )}
        </g>
      </svg>

      {/* 4. Film Grain Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />
    </div>
  );
};

