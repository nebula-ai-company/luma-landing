import React from 'react';
import { motion } from 'framer-motion';

export const SubscriptionBgAnimation: React.FC = () => {
  // Statically defined coordinates & delay arrays for floating particles to avoid client/server hydration mismatch
  const particles = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    size: i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
    x: (i * 3.1) % 95 + 2, // percentage across screen
    y: (i * 2.9) % 95 + 2, // percentage down screen
    duration: 12 + (i * 4) % 20,
    delay: -(i * 1.5) % 15,
  }));

  // Coordinate cross positions for the technical telemetry look
  const crosses = [
    { x: '10%', y: '8%' },
    { x: '85%', y: '15%' },
    { x: '20%', y: '32%' },
    { x: '75%', y: '48%' },
    { x: '15%', y: '65%' },
    { x: '88%', y: '78%' },
    { x: '30%', y: '92%' },
  ];

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
      
      {/* ------------------ ZONE 1: HERO & PLAN CARDS (0% - 25% height) ------------------ */}
      
      {/* Purple Luminary Glow */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[3%] left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full filter blur-[110px] md:blur-[160px] opacity-[0.11] dark:opacity-[0.17] bg-[#DA8FFF] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Coral Flare Glow */}
      <motion.div
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.88, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] right-[8%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[120px] md:blur-[170px] opacity-[0.09] dark:opacity-[0.15] bg-[#FF6482] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* High-Fidelity Technical Dot Matrix Pattern Layer */}
      <div 
        className="absolute inset-x-0 top-0 h-[1200px] text-zinc-950 dark:text-purple-300 opacity-[0.06] dark:opacity-[0.16] pointer-events-none select-none z-0"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
        }}
      />


      {/* ------------------ ZONE 2: PLAN COMPARISON (25% - 55% height) ------------------ */}
      
      {/* Amber Creative Sparkle Orb */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] right-[15%] w-[48vw] h-[48vw] max-w-[620px] max-h-[620px] rounded-full filter blur-[105px] md:blur-[150px] opacity-[0.08] dark:opacity-[0.14] bg-[#FFB340] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Deep Violet Fusion Arc */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[42%] left-[12%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[115px] md:blur-[160px] opacity-[0.07] dark:opacity-[0.12] bg-[#DA8FFF] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Exquisite Astronomical Map & Constellation Nodes for Plan Comparison (High-Detail, Faded-edge vectors) */}
      <div className="absolute top-[32%] inset-x-0 h-[450px] pointer-events-none select-none overflow-hidden opacity-[0.07] dark:opacity-[0.14] flex items-center justify-center">
        <div className="relative w-[1200px] h-full flex items-center justify-center">
          {/* Subtle curved dynamic data streams */}
          <svg viewBox="0 0 1000 400" className="w-full h-full text-zinc-900 dark:text-[#DA8FFF]">
            <motion.path
              d="M 100 200 Q 250 50, 500 200 T 900 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 100 200 Q 250 350, 500 200 T 900 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 6"
              animate={{ strokeDashoffset: [0, 40] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Fine nodes connected by telemetry lines */}
            <line x1="250" y1="125" x2="350" y2="200" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" />
            <line x1="500" y1="200" x2="650" y2="125" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" />
            <line x1="350" y1="200" x2="500" y2="200" stroke="currentColor" strokeWidth="0.4" />
            <line x1="500" y1="200" x2="650" y2="275" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 3" />
            
            {/* Individual astronomical coordinate marks */}
            <circle cx="250" cy="125" r="1.5" fill="currentColor" />
            <circle cx="350" cy="200" r="2.5" fill="currentColor" className="animate-pulse" />
            <circle cx="500" cy="200" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="500" cy="200" r="1.5" fill="currentColor" />
            <circle cx="650" cy="125" r="2" fill="currentColor" />
            <circle cx="650" cy="275" r="1.5" fill="currentColor" />
            <circle cx="750" cy="200" r="2" fill="currentColor" />

            {/* Glowing halos around nodes */}
            <circle cx="350" cy="200" r="8" fill="none" stroke="currentColor" strokeWidth="0.2" className="opacity-40 animate-ping [animation-duration:3s]" />
            <circle cx="500" cy="200" r="12" fill="none" stroke="currentColor" strokeWidth="0.2" className="opacity-30 animate-ping [animation-duration:4s]" />
          </svg>

          {/* Absolute precision typography indicators */}
          <div className="absolute top-[10%] left-[10%] font-sans text-[10px] tracking-wide text-[#FF6482] opacity-85">
            [ موتور هسته لوما نسخه ۴.۸ ]
          </div>
          <div className="absolute bottom-[10%] right-[10%] font-sans text-[10px] tracking-wide text-[#DA8FFF] opacity-85">
            شاخص_مرجع_سیستم // ۵۴-الف
          </div>
        </div>
      </div>


      {/* ------------------ ZONE 3: CREDIT EXPLAINER & FAQ (55% - 85% height) ------------------ */}
      
      {/* Rose Dream Flare */}
      <motion.div
        animate={{
          x: [0, 35, -45, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[68%] left-[8%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[125px] md:blur-[170px] opacity-[0.08] dark:opacity-[0.14] bg-[#FF6482] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Amber Deep Horizon Glow */}
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[75%] right-[10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[110px] md:blur-[150px] opacity-[0.06] dark:opacity-[0.11] bg-[#FFB340] mix-blend-multiply dark:mix-blend-screen"
      />


      {/* ------------------ ZONE 4: CTA & FOOTER (85% - 100% height) ------------------ */}

      {/* Deep Interactive Violet Glow behind CTA */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[60vw] h-[45vw] max-w-[900px] rounded-full filter blur-[130px] md:blur-[180px] bg-[#DA8FFF] mix-blend-screen"
      />


      {/* ------------------ FINE TELEMETRY & STARS OVERLAYS ------------------ */}

      {/* Twinkling Swiss Alignment Crosses (+) */}
      {crosses.map((c, idx) => (
        <motion.div
          key={`cross-${idx}`}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 4 + (idx % 3) * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.8,
          }}
          className="absolute text-zinc-900/15 dark:text-white/10 text-[11px] font-sans pointer-events-none select-none select-glow"
          style={{ left: c.x, top: c.y }}
        >
          +
        </motion.div>
      ))}

      {/* Exquisite floating space particles cascade */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}`}
            animate={{
              y: [`${p.y}%`, `${(p.y + 12) % 100}%`],
              opacity: [0, p.size > 2 ? 0.35 : 0.2, p.size > 2 ? 0.35 : 0.2, 0],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gradient-to-br from-white to-purple-200/40 dark:from-white dark:to-[#DA8FFF]/60"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: p.size > 2 ? '0 0 8px rgba(218, 143, 255, 0.5)' : 'none',
            }}
          />
        ))}
      </div>

    </div>
  );
};
