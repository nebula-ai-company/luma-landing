import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Server, Database, Scan, Search, Globe, Wifi } from 'lucide-react';

// --- Types & Constants ---
type Phase = 'scan' | 'analyze' | 'secure';

const LOG_MESSAGES = {
  scan: [
    { text: "در حال اسکن پورت‌های ورودی...", color: "text-gray-400" },
    { text: "بررسی یکپارچگی سیستم...", color: "text-luma-purple" },
    { text: "پایش ترافیک شبکه...", color: "text-gray-300" }
  ],
  analyze: [
    { text: "شناسایی الگوی رمزنگاری...", color: "text-luma-pink" },
    { text: "تحلیل امضای دیجیتال...", color: "text-white" },
    { text: "تایید پروتکل‌های امنیتی...", color: "text-luma-pink" }
  ],
  secure: [
    { text: "فایروال: فعال شد", color: "text-[#FFB340]" },
    { text: "اتصال ایمن برقرار شد", color: "text-[#FFB340]" },
    { text: "تهدیدات مسدود شدند", color: "text-[#FFB340]" }
  ]
};

export const SecurityHeroAnim = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [phase, setPhase] = useState<Phase>('scan');
  const [logs, setLogs] = useState<{ text: string, color: string, id: number }[]>([]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Intersection observer for off-screen pausing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Animation Cycle ---
  useEffect(() => {
    let mounted = true;
    let logCounter = 0;

    const addLog = (msg: { text: string, color: string }) => {
      if (!mounted) return;
      setLogs(prev => [...prev.slice(-3), { ...msg, id: logCounter++ }]);
    };

    const waitActive = async (ms: number) => {
      let elapsed = 0;
      const step = 100;
      while (mounted && elapsed < ms) {
        // Pause if off-screen or tab hidden
        if (isInView && !document.hidden) {
          elapsed += step;
        }
        await new Promise(r => setTimeout(r, step));
      }
    };

    const runCycle = async () => {
      while (mounted) {
        // Phase 1: SCAN (Purple)
        setPhase('scan');
        addLog(LOG_MESSAGES.scan[0]);
        await waitActive(1500);
        addLog(LOG_MESSAGES.scan[1]);
        await waitActive(1500);
        
        // Phase 2: ANALYZE (Pink)
        setPhase('analyze');
        addLog(LOG_MESSAGES.analyze[0]);
        await waitActive(1200);
        addLog(LOG_MESSAGES.analyze[1]);
        await waitActive(1200);

        // Phase 3: SECURE (Yellow)
        setPhase('secure');
        addLog(LOG_MESSAGES.secure[0]);
        await waitActive(1000);
        addLog(LOG_MESSAGES.secure[1]);
        await waitActive(3000); // Hold secure state
      }
    };

    runCycle();
    return () => { mounted = false; };
  }, [isInView]);

  // --- Helper for Colors based on Phase ---
  const getPhaseColor = () => {
    switch (phase) {
      case 'scan': return '#DA8FFF'; // Purple
      case 'analyze': return '#FF6482'; // Pink
      case 'secure': return '#FFB340'; // Yellow (Success state)
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#FCFCFD] dark:bg-[#050505] rounded-[32px] overflow-hidden border border-zinc-200/60 dark:border-white/10 shadow-2xl flex flex-col font-sans select-none group transition-colors duration-300" dir="rtl">
       
       {/* --- Header UI --- */}
       <div className="h-14 border-b border-zinc-200/50 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-between px-6 shrink-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-3">
             <div className="relative flex items-center justify-center w-6 h-6">
                <motion.div 
                   className="absolute inset-0 rounded-full opacity-50"
                   style={{ backgroundColor: getPhaseColor() }}
                   animate={prefersReducedMotion ? { scale: 1, opacity: 0.3 } : { scale: [1, 1.5], opacity: [0.5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getPhaseColor() }} />
             </div>
             <div className="flex flex-col">
                <span className="text-[11px] font-bold text-zinc-800 dark:text-white tracking-wide transition-colors duration-300">سپر امنیتی لوما</span>
                <span className="text-[9px] text-gray-500 font-sans flex items-center gap-1">
                   وضعیت: 
                   <span style={{ color: getPhaseColor() }} className="font-bold">
                      {phase === 'scan' ? 'در حال اسکن' : phase === 'analyze' ? 'تحلیل داده' : 'ایمن'}
                   </span>
                </span>
             </div>
          </div>
          <div className="flex gap-1.5 opacity-30 dir-ltr">
             <div className="w-1 h-1 bg-zinc-400 dark:bg-white rounded-full" />
             <div className="w-1 h-1 bg-zinc-400 dark:bg-white rounded-full" />
             <div className="w-1 h-1 bg-zinc-400 dark:bg-white rounded-full" />
          </div>
       </div>

       {/* --- Main Viewport --- */}
       <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-white dark:bg-[#030303] transition-colors duration-300">
          
          {/* 1. Background Grid (Perspective) */}
          <div className="absolute inset-0 perspective-1000">
             <motion.div 
               className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
               animate={prefersReducedMotion ? { backgroundPosition: "0px 0px" } : { backgroundPosition: ["0px 0px", "-40px 40px"] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               style={{ transform: "rotateX(20deg) scale(1.4)" }}
             />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_80%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#030303_80%)] transition-colors duration-300" />
          </div>

          {/* 2. Central Core System */}
          <div className="relative z-10 w-[300px] h-[300px] flex items-center justify-center">
             
             {/* Ring 1: Outer Scanner (Scan Phase) */}
             <motion.div 
               className="absolute inset-0 rounded-full border border-dashed border-luma-purple/30"
               animate={{ 
                  rotate: prefersReducedMotion ? 0 : 360,
                  opacity: phase === 'scan' ? 1 : 0.3,
                  scale: phase === 'scan' ? 1 : 0.9
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />

             {/* Ring 2: Middle Analyzer (Analyze Phase) */}
             <motion.div 
               className="absolute inset-8 rounded-full border border-luma-pink/20"
               style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
               animate={{ 
                  rotate: prefersReducedMotion ? 0 : -360,
                  scale: phase === 'analyze' ? [1, 1.05, 1] : 1,
                  borderColor: phase === 'analyze' ? 'rgba(255, 100, 130, 0.6)' : 'rgba(255, 100, 130, 0.1)'
               }}
               transition={{ duration: phase === 'analyze' ? 2 : 15, repeat: Infinity, ease: "linear" }}
             />

             {/* Ring 3: Inner Core (Secure Phase - Yellow) */}
             <motion.div 
               className="absolute inset-16 rounded-full border-2"
               animate={{ 
                  borderColor: phase === 'secure' ? '#FFB340' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: phase === 'secure' ? '0 0 40px rgba(255, 179, 64, 0.4)' : '0 0 0px rgba(0,0,0,0)'
               }}
               transition={{ duration: 0.5 }}
             />

             {/* Radar Sweep Effect (Scan Phase Only) */}
             <AnimatePresence>
                {phase === 'scan' && (
                   <motion.div 
                      className="absolute inset-4 rounded-full overflow-hidden opacity-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                   >
                      <motion.div 
                          className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(218,143,255,0.5)_360deg)]"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       />
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Central Icon Container */}
             <motion.div 
                className="relative z-20 w-32 h-32 bg-white dark:bg-[#0a0a0a] rounded-full border flex items-center justify-center shadow-2xl border-zinc-200 dark:border-white/10 transition-colors duration-300"
                animate={{ 
                   borderColor: getPhaseColor(),
                   boxShadow: `0 0 40px -10px ${getPhaseColor()}40`
                }}
                transition={{ duration: 0.5 }}
             >
                <AnimatePresence mode="wait">
                   {phase === 'scan' && (
                      <motion.div key="scan" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                         <Scan size={48} className="text-indigo-600 dark:text-luma-purple" />
                      </motion.div>
                   )}
                   {phase === 'analyze' && (
                      <motion.div key="analyze" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                         <Search size={48} className="text-rose-600 dark:text-luma-pink" />
                      </motion.div>
                   )}
                   {phase === 'secure' && (
                      <motion.div key="secure" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                         <Shield size={48} className="text-amber-500 dark:text-luma-yellow fill-amber-500/20 dark:fill-luma-yellow/20" />
                         <motion.div 
                            className="absolute bottom-0 right-0 bg-white dark:bg-[#0a0a0a] rounded-full p-1 border border-luma-yellow transition-colors duration-300"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                         >
                            <Lock size={14} className="text-amber-600 dark:text-luma-yellow" />
                         </motion.div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </motion.div>

          </div>

          {/* 3. Orbiting Satellite Nodes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {[
                { icon: Server, color: 'text-indigo-600 dark:text-luma-purple', delay: 0 },
                { icon: Database, color: 'text-rose-600 dark:text-luma-pink', delay: 10 },
                { icon: Globe, color: 'text-amber-600 dark:text-luma-yellow', delay: 20 },
                { icon: Wifi, color: 'text-indigo-600 dark:text-luma-purple', delay: 5 }
             ].map((item, i) => (
                <motion.div
                   key={i}
                   className="absolute w-full h-full flex items-center justify-center"
                   animate={{ rotate: prefersReducedMotion ? i * 90 : 360 }}
                   transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: -item.delay }}
                >
                   <div className="w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] relative"> {/* Orbit Path Size */}
                      <motion.div 
                         className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 ${phase === 'secure' ? 'border-luma-yellow/50' : ''}`}
                         animate={{ rotate: prefersReducedMotion ? -(i * 90) : -360 }} // Counter rotate to keep upright
                         transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: -item.delay }}
                      >
                         {/* Secure state turns icons Yellow instead of Green */}
                         <item.icon size={18} className={phase === 'secure' ? 'text-amber-500 dark:text-luma-yellow' : item.color} />
                         {phase === 'secure' && (
                            <motion.div 
                               initial={{ scale: 0 }} 
                               animate={{ scale: 1 }} 
                               className="absolute -top-1 -right-1 w-3 h-3 bg-luma-yellow rounded-full border-2 border-white dark:border-[#0a0a0a]" 
                            />
                         )}
                      </motion.div>
                   </div>
                </motion.div>
             ))}
          </div>

       </div>

       {/* --- Footer Terminal --- */}
       <div className="h-40 bg-[#0c0c0f] dark:bg-[#040404] border-t border-zinc-200/50 dark:border-white/5 p-5 font-sans text-[11px] leading-relaxed text-zinc-400 dark:text-gray-400 overflow-hidden relative dir-ltr text-left transition-colors duration-300">
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
          
          <div className="flex flex-col justify-end h-full gap-2 relative z-10 font-sans">
             <AnimatePresence mode='popLayout'>
                {logs.map((log) => (
                   <motion.div 
                      key={log.id} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3"
                   >
                      <span className="text-gray-600 text-[10px] font-mono">{new Date().toLocaleTimeString('en-US', {hour12: false})}</span>
                      <span className="text-[#DA8FFF]/50 font-mono">root@luma:~#</span>
                      <span className={`${log.color} font-bold dir-rtl`}>{log.text}</span>
                   </motion.div>
                ))}
             </AnimatePresence>
             
             {/* Blinking Cursor Line */}
             <div className="flex items-center gap-2">
                <span className="text-gray-600 text-[10px] font-mono">{new Date().toLocaleTimeString('en-US', {hour12: false})}</span>
                <span className="text-[#DA8FFF] font-mono">root@luma:~#</span>
                <motion.div 
                   animate={{ opacity: [1, 0] }} 
                   transition={{ duration: 0.8, repeat: Infinity }}
                   className="w-2 h-4 bg-[#DA8FFF]"
                />
              </div>
          </div>
       </div>

    </div>
  );
};
