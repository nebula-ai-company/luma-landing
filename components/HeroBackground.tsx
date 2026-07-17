import React, { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  theme: 'light' | 'dark';
  shouldAnimate: boolean;
  isMobile: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  theme,
  shouldAnimate,
  isMobile,
}) => {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile || !shouldAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized cursor position from -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      // Update custom properties smoothly
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, shouldAnimate]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 select-none overflow-hidden transition-colors duration-700 ${shouldAnimate ? '' : 'pause-animations'}`} 
      style={{
        '--mouse-x': '0',
        '--mouse-y': '0',
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <style>{`
        /* ==========================================================================
           LUMA CREATIVE GENERATIVE FIELD - HIGH PERFORMANCE STYLING
           ========================================================================== */

        .luma-hero-reveal {
          animation: lumaHeroReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes lumaHeroReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ---------------------------------------------------------
           1. Scrolling 3D Wireframe Perspective Grid
           --------------------------------------------------------- */
        .luma-grid-3d {
          position: absolute;
          inset: -30% -10% -10% -10%;
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, ${isDark ? 'rgba(139, 92, 246, 0.06)' : 'rgba(139, 92, 246, 0.04)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? 'rgba(139, 92, 246, 0.06)' : 'rgba(139, 92, 246, 0.04)'} 1px, transparent 1px);
          transform: perspective(600px) rotateX(68deg) translateZ(0);
          transform-origin: center 40%;
          mask-image: radial-gradient(circle at 50% 40%, black 15%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at 50% 40%, black 15%, transparent 85%);
        }

        .luma-grid-scroll {
          animation: lumaGridScroll 14s linear infinite;
        }

        @keyframes lumaGridScroll {
          from { background-position: 0 0; }
          to { background-position: 0 120px; }
        }

        /* ---------------------------------------------------------
           2. Undulating Generative Waves (Creativity Waveforms)
           --------------------------------------------------------- */
        .luma-wave {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luma-dash-slow {
          stroke-dasharray: 120 400;
          animation: lumaDashAnim 16s linear infinite;
        }
        .luma-dash-fast {
          stroke-dasharray: 180 350;
          animation: lumaDashAnim 11s linear infinite;
        }
        .luma-dash-amber {
          stroke-dasharray: 80 480;
          animation: lumaDashAnim 13s linear infinite;
        }

        @keyframes lumaDashAnim {
          to { stroke-dashoffset: -1000; }
        }

        /* Subtle vertical wave float */
        .luma-wave-float-1 {
          animation: lumaWaveFloat1 9s ease-in-out infinite alternate;
        }
        .luma-wave-float-2 {
          animation: lumaWaveFloat2 12s ease-in-out infinite alternate;
        }
        .luma-wave-float-3 {
          animation: lumaWaveFloat3 15s ease-in-out infinite alternate;
        }

        @keyframes lumaWaveFloat1 {
          0% { transform: translateY(-8px) scaleY(0.98); }
          100% { transform: translateY(8px) scaleY(1.02); }
        }
        @keyframes lumaWaveFloat2 {
          0% { transform: translateY(10px) scaleX(1.01); }
          100% { transform: translateY(-10px) scaleX(0.99); }
        }
        @keyframes lumaWaveFloat3 {
          0% { transform: translateY(-6px) rotate(-0.5deg); }
          100% { transform: translateY(6px) rotate(0.5deg); }
        }

        /* ---------------------------------------------------------
           3. Color Orbs / Ambient Aura Glows
           --------------------------------------------------------- */
        .luma-orb {
          filter: blur(120px);
          opacity: ${isDark ? 0.38 : 0.22};
          mix-blend-mode: ${isDark ? 'screen' : 'multiply'};
          transform-origin: center center;
          animation: lumaOrbBreath 14s ease-in-out infinite alternate;
        }

        @keyframes lumaOrbBreath {
          0% { transform: scale(1) translate(0px, 0px); opacity: ${isDark ? 0.32 : 0.18}; }
          50% { transform: scale(1.15) translate(30px, -20px); opacity: ${isDark ? 0.46 : 0.28}; }
          100% { transform: scale(0.9) translate(-20px, 30px); opacity: ${isDark ? 0.35 : 0.20}; }
        }

        /* ---------------------------------------------------------
           4. Telemetry Node Pulses
           --------------------------------------------------------- */
        .luma-telemetry-pulse {
          animation: lumaTelemetryPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes lumaTelemetryPulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(2.2); opacity: 0.7; }
        }

        /* ---------------------------------------------------------
           5. Static Grain Overlays & Settings
           ========================================================= */
        .pause-animations *, .pause-animations::before, .pause-animations::after {
          animation-play-state: paused !important;
        }

        .luma-noise-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: ${isDark ? 0.018 : 0.012};
          pointer-events: none;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ========================================================================
          LAYER 1: COLOR GRADIENT BASE CANVAS (DEEP OR WARM ENVIRONMENT)
          ======================================================================== */}
      <div 
        className="absolute inset-0 transition-all duration-700 pointer-events-none luma-hero-reveal w-full h-full"
        style={{
          backgroundColor: isDark ? '#04030a' : '#FAF9F6',
          backgroundImage: isDark
            ? 'radial-gradient(circle at 50% 40%, rgba(13, 8, 30, 0.8) 0%, #04030a 100%)'
            : 'radial-gradient(circle at 50% 40%, rgba(243, 239, 255, 0.8) 0%, #FAF9F6 100%)',
        }}
      />

      {/* ========================================================================
          LAYER 2: AMBIENT CREATIVE LIGHT ORBS (THE TRIPLE LUMA HARMONY)
          Active across the entire canvas: Purple, Pink, and Yellow/Amber.
          ======================================================================== */}
      <div className="absolute inset-0 pointer-events-none luma-hero-reveal overflow-hidden w-full h-full">
        
        {/* Dominant Purple Orb (Upper-Left / Center) */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            left: '10%',
            top: '15%',
            width: isMobile ? '280px' : '550px',
            height: isMobile ? '280px' : '550px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(124, 58, 237, 0.1) 60%, transparent 100%)',
            transform: isMobile 
              ? 'none' 
              : 'translate3d(calc(var(--mouse-x, 0) * -40px), calc(var(--mouse-y, 0) * -40px), 0)',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Strong Secondary Pink Orb (Lower-Left / Center-Bottom) */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            left: '30%',
            bottom: '5%',
            width: isMobile ? '240px' : '480px',
            height: isMobile ? '240px' : '480px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.38) 0%, rgba(219, 39, 119, 0.08) 60%, transparent 100%)',
            animationDelay: '-4s',
            transform: isMobile 
              ? 'none' 
              : 'translate3d(calc(var(--mouse-x, 0) * 30px), calc(var(--mouse-y, 0) * 30px), 0)',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Essential Amber/Yellow Accent Orb (Upper-Right / Near Dashboard Simulator) */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            right: isMobile ? '5%' : '20%',
            top: isMobile ? 'auto' : '15%',
            bottom: isMobile ? '15%' : 'auto',
            width: isMobile ? '220px' : '420px',
            height: isMobile ? '220px' : '420px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 100%)',
            animationDelay: '-8s',
            transform: isMobile 
              ? 'none' 
              : 'translate3d(calc(var(--mouse-x, 0) * -25px), calc(var(--mouse-y, 0) * 35px), 0)',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

      </div>

      {/* ========================================================================
          LAYER 3: 3D PERSPECTIVE WIREFRAME GRID (THE TENSER FIELD)
          Scrolling infinitely, reacts smoothly to cursor with custom 3D tilt.
          ======================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none luma-hero-reveal"
        style={{
          transform: isMobile 
            ? 'none' 
            : 'translate3d(calc(var(--mouse-x, 0) * -18px), calc(var(--mouse-y, 0) * -18px), 0)',
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className={`luma-grid-3d ${shouldAnimate ? 'luma-grid-scroll' : ''}`} />
      </div>

      {/* ========================================================================
          LAYER 4: GENERATIVE MATHEMATICAL WAVE RIBBONS
          Flowing SVG lines representing high-performance AI computational graphs.
          ======================================================================== */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none luma-hero-reveal" 
        style={{
          transform: isMobile 
            ? 'none' 
            : 'translate3d(calc(var(--mouse-x, 0) * 22px), calc(var(--mouse-y, 0) * 22px), 0)',
          transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          {/* Wave gradients combining the 3 main Luma colors */}
          <linearGradient id="luma-grad-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="luma-grad-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="luma-grad-wave-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Wave 1: Dynamic High Sine (Sweeps upper-mid & center half) */}
        <g className="luma-wave-float-1">
          <path 
            d={isMobile 
              ? "M -50,280 Q 100,220 250,320 T 550,260" 
              : "M -100,540 Q 250,360 600,590 T 1300,440 T 1800,580"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "1.5" : "2"} 
            opacity={isDark ? "0.38" : "0.22"}
          />
          {/* Animated Glowing Dashes flowing along the computational path */}
          <path 
            d={isMobile 
              ? "M -50,280 Q 100,220 250,320 T 550,260" 
              : "M -100,540 Q 250,360 600,590 T 1300,440 T 1800,580"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "2.5" : "3.5"} 
            opacity={isDark ? "0.85" : "0.5"}
            className="luma-dash-slow"
          />
        </g>

        {/* Wave 2: Low-Mid Sine (Sweeps lower & central area behind Dashboard) */}
        <g className="luma-wave-float-2">
          <path 
            d={isMobile 
              ? "M -50,350 Q 150,420 350,320 T 550,380" 
              : "M -100,650 Q 300,820 750,580 T 1600,720 T 1900,550"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-2)" 
            strokeWidth={isMobile ? "1.5" : "2.5"} 
            opacity={isDark ? "0.34" : "0.18"}
          />
          <path 
            d={isMobile 
              ? "M -50,350 Q 150,420 350,320 T 550,380" 
              : "M -100,650 Q 300,820 750,580 T 1600,720 T 1900,550"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-2)" 
            strokeWidth={isMobile ? "2.5" : "4"} 
            opacity={isDark ? "0.8" : "0.45"}
            className="luma-dash-fast"
          />
        </g>

        {/* Wave 3: Sharp Creative Accents (Rich with Amber/Pink Highlights across center) */}
        <g className="luma-wave-float-3">
          <path 
            d={isMobile 
              ? "M -50,240 Q 120,320 280,240 T 550,300" 
              : "M -100,450 Q 400,620 900,450 T 1700,720"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-3)" 
            strokeWidth={isMobile ? "1.5" : "2"} 
            opacity={isDark ? "0.4" : "0.2"}
          />
          <path 
            d={isMobile 
              ? "M -50,240 Q 120,320 280,240 T 550,300" 
              : "M -100,450 Q 400,620 900,450 T 1700,720"
            }
            fill="none" 
            stroke="url(#luma-grad-wave-3)" 
            strokeWidth={isMobile ? "2.5" : "3.5"} 
            opacity={isDark ? "0.9" : "0.55"}
            className="luma-dash-amber"
          />
        </g>
      </svg>

      {/* ========================================================================
          LAYER 5: COORDINATE CONSTELLATION & TELEMETRY POINTS (WITHOUT ENGLISH TEXT)
          High-end agency graphical points representing generative AI training steps.
          ======================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none luma-hero-reveal"
        style={{
          transform: isMobile 
            ? 'none' 
            : 'translate3d(calc(var(--mouse-x, 0) * 28px), calc(var(--mouse-y, 0) * 28px), 0)',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Node A (Mid-Left - Purple) */}
        <div className="absolute" style={{ left: '15%', top: '45%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-purple opacity-40 luma-telemetry-pulse"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-purple"></span>
          </div>
        </div>

        {/* Node B (Lower-Center, behind simulator - Amber) */}
        <div className="absolute" style={{ right: '45%', top: '55%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-40 luma-telemetry-pulse" style={{ animationDelay: '1s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-yellow"></span>
          </div>
        </div>

        {/* Node C (Lower-Left - Pink) */}
        <div className="absolute" style={{ left: '28%', bottom: '22%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-pink opacity-40 luma-telemetry-pulse" style={{ animationDelay: '2s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-pink"></span>
          </div>
        </div>

        {/* Node D (Lower-Right - Purple) */}
        <div className="absolute" style={{ right: '15%', bottom: '12%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-purple opacity-40 luma-telemetry-pulse" style={{ animationDelay: '1.5s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-purple"></span>
          </div>
        </div>
      </div>

      {/* ========================================================================
          LAYER 6: STATIC GRAIN NOISE OVERLAY (PREVENTS BANDING, ADDS TEXTURE)
          ======================================================================== */}
      <div className="luma-noise-overlay" />

      {/* ========================================================================
          LAYER 7: INTENTIONAL COLUMNAR READABILITY GUARD
          A sophisticated linear and radial fade centered on the right side
          (the Persian copywriting text block) to guarantee perfect 100% contrast,
          while letting the dynamic 3D generative field bleed beautifully everywhere else.
          ======================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none z-[8]"
        style={{
          background: isDark
            ? 'linear-gradient(to left, rgba(4, 3, 10, 0.95) 0%, rgba(4, 3, 10, 0.85) 30%, rgba(4, 3, 10, 0.45) 60%, transparent 100%)'
            : 'linear-gradient(to left, rgba(250, 249, 246, 0.95) 0%, rgba(250, 249, 246, 0.85) 30%, rgba(250, 249, 246, 0.45) 60%, transparent 100%)',
        }}
      />

    </div>
  );
};

export default React.memo(HeroBackground);
