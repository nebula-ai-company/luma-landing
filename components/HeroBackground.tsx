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
          inset: -30% -20% -10% -20%;
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, ${isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)'} 1px, transparent 1px);
          transform: perspective(600px) rotateX(68deg) translateZ(0);
          transform-origin: center 40%;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 95%);
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
          stroke-dasharray: 200 600;
          animation: lumaDashAnim 16s linear infinite;
        }
        .luma-dash-fast {
          stroke-dasharray: 280 500;
          animation: lumaDashAnim 11s linear infinite;
        }
        .luma-dash-amber {
          stroke-dasharray: 150 700;
          animation: lumaDashAnim 13s linear infinite;
        }

        @keyframes lumaDashAnim {
          to { stroke-dashoffset: -2400; }
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
          filter: blur(${isMobile ? '55px' : '120px'});
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
          LAYER 2: AMBIENT CREATIVE LIGHT ORBS (THE FULL CANVAS LUMA HARMONY)
          Active across the entire canvas: Purple, Pink, and Yellow/Amber.
          ======================================================================== */}
      <div className="absolute inset-0 pointer-events-none luma-hero-reveal overflow-hidden w-full h-full">
        
        {/* Dominant Purple Orb (Upper-Left) */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            left: '5%',
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

        {/* Secondary Pink Orb (Lower-Left / Mid-Left) - Desktop Only */}
        {!isMobile && (
          <div 
            className="absolute rounded-full luma-orb"
            style={{
              left: '25%',
              bottom: '5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.38) 0%, rgba(219, 39, 119, 0.08) 60%, transparent 100%)',
              animationDelay: '-4s',
              transform: 'translate3d(calc(var(--mouse-x, 0) * 30px), calc(var(--mouse-y, 0) * 30px), 0)',
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}

        {/* Central Amber Accent Orb */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            left: '48%',
            top: '10%',
            width: isMobile ? '220px' : '480px',
            height: isMobile ? '220px' : '480px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 100%)',
            animationDelay: '-8s',
            transform: isMobile 
              ? 'none' 
              : 'translate3d(calc(var(--mouse-x, 0) * -25px), calc(var(--mouse-y, 0) * 35px), 0)',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Far-Right Purple/Pink Glow (Fills right side on wider screens) */}
        <div 
          className="absolute rounded-full luma-orb"
          style={{
            right: '2%',
            top: '15%',
            width: isMobile ? '260px' : '580px',
            height: isMobile ? '260px' : '580px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.42) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 100%)',
            animationDelay: '-2s',
            transform: isMobile 
              ? 'none' 
              : 'translate3d(calc(var(--mouse-x, 0) * 35px), calc(var(--mouse-y, 0) * -25px), 0)',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Far-Right Lower Gold Glow - Desktop Only */}
        {!isMobile && (
          <div 
            className="absolute rounded-full luma-orb"
            style={{
              right: '10%',
              bottom: '8%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.08) 60%, transparent 100%)',
              animationDelay: '-6s',
              transform: 'translate3d(calc(var(--mouse-x, 0) * -30px), calc(var(--mouse-y, 0) * 25px), 0)',
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}

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
          LAYER 4: GENERATIVE MATHEMATICAL WAVE RIBBONS (FULL VIEWPORT SPAN)
          Ultra-clean, flowing cubic bezier streams representing AI data vectors.
          ======================================================================== */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none luma-hero-reveal" 
        viewBox="0 0 2400 1000"
        preserveAspectRatio="none"
        style={{
          transform: isMobile 
            ? 'none' 
            : 'translate3d(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px), 0)',
          transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <defs>
          {/* Wave gradients combining the main Luma colors spanning full width */}
          <linearGradient id="luma-grad-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="luma-grad-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Ribbon 1: Upper-Mid Smooth Sweeping Cubic Curve */}
        <g className="luma-wave-float-1">
          <path 
            d="M -100,380 C 600,180 1400,580 2500,280"
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "1.5" : "2.5"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.35" : "0.2"}
          />
          {/* Animated Glowing Dashes */}
          <path 
            d="M -100,380 C 600,180 1400,580 2500,280"
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "2" : "3.5"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.8" : "0.45"}
            className="luma-dash-slow"
          />
        </g>

        {/* Ribbon 2: Center-Lower Smooth Flowing Cubic Curve */}
        <g className="luma-wave-float-2">
          <path 
            d="M -100,620 C 750,820 1650,420 2500,580"
            fill="none" 
            stroke="url(#luma-grad-wave-2)" 
            strokeWidth={isMobile ? "1.5" : "2"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.35" : "0.2"}
          />
          <path 
            d="M -100,620 C 750,820 1650,420 2500,580"
            fill="none" 
            stroke="url(#luma-grad-wave-2)" 
            strokeWidth={isMobile ? "2.5" : "3.5"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.85" : "0.5"}
            className="luma-dash-fast"
          />
        </g>

        {/* Ribbon 3: Harmonizing Upper Counter-Arc */}
        <g className="luma-wave-float-3">
          <path 
            d="M -100,480 C 800,680 1500,250 2500,450"
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "1.5" : "2"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.3" : "0.18"}
          />
          <path 
            d="M -100,480 C 800,680 1500,250 2500,450"
            fill="none" 
            stroke="url(#luma-grad-wave-1)" 
            strokeWidth={isMobile ? "2" : "3"} 
            vectorEffect="non-scaling-stroke"
            opacity={isDark ? "0.85" : "0.5"}
            className="luma-dash-amber"
          />
        </g>
      </svg>

      {/* ========================================================================
          LAYER 5: COORDINATE CONSTELLATION & TELEMETRY POINTS
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
        {/* Node A (Left - Purple) */}
        <div className="absolute" style={{ left: '12%', top: '42%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-purple opacity-40 luma-telemetry-pulse"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-purple"></span>
          </div>
        </div>

        {/* Node B (Mid-Left - Pink) */}
        <div className="absolute" style={{ left: '32%', bottom: '25%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-pink opacity-40 luma-telemetry-pulse" style={{ animationDelay: '2s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-pink"></span>
          </div>
        </div>

        {/* Node C (Mid-Right - Amber) */}
        <div className="absolute" style={{ right: '42%', top: '58%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-40 luma-telemetry-pulse" style={{ animationDelay: '1s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-yellow"></span>
          </div>
        </div>

        {/* Node D (Right - Purple) */}
        <div className="absolute" style={{ right: '22%', top: '28%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-purple opacity-40 luma-telemetry-pulse" style={{ animationDelay: '1.5s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-purple"></span>
          </div>
        </div>

        {/* Node E (Far-Right - Amber) */}
        <div className="absolute" style={{ right: '8%', bottom: '18%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-yellow opacity-40 luma-telemetry-pulse" style={{ animationDelay: '2.5s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-yellow"></span>
          </div>
        </div>

        {/* Node F (Far-Right Top - Pink) */}
        <div className="absolute" style={{ right: '3%', top: '48%' }}>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-luma-pink opacity-40 luma-telemetry-pulse" style={{ animationDelay: '0.8s' }}></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-luma-pink"></span>
          </div>
        </div>
      </div>

      {/* ========================================================================
          LAYER 6: STATIC GRAIN NOISE OVERLAY (PREVENTS BANDING, ADDS TEXTURE)
          ======================================================================== */}
      <div className="luma-noise-overlay" />

      {/* ========================================================================
          LAYER 7: VIGNETTE READABILITY BLEND
          A subtle, high-performance vignette that lets the dynamic 3D line work
          and ambient lighting reach 100% to the right edge with flawless contrast.
          ======================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none z-[8]"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 75% 50%, rgba(4, 3, 10, 0.15) 0%, transparent 80%)'
            : 'radial-gradient(circle at 75% 50%, rgba(250, 249, 246, 0.15) 0%, transparent 80%)',
        }}
      />

    </div>
  );
};

export default React.memo(HeroBackground);
