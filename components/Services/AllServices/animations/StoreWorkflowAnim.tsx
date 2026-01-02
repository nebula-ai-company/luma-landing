
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

// Bypass type issues with framer-motion props
const Motion = motion as any;

export const StoreWorkflowAnim = () => {
  const [step, setStep] = useState(1); 
  // 1: Raw
  // 2: BG Removed
  // 3: Studio

  useEffect(() => {
    const duration = 12000; 
    
    const cycle = () => {
      setStep(1); // Start Raw
      setTimeout(() => setStep(2), 4000); // BG Remove
      setTimeout(() => setStep(3), 8000); // Studio
      setTimeout(() => setStep(1), 12000); // Loop
    };
    
    const initialTimer = setTimeout(cycle, 100);
    const interval = setInterval(cycle, duration);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10">
       {/* --- Main Visual Area (Full Fill) --- */}
       <div className="relative flex-1 w-full h-full overflow-hidden group">
          
          {/* Base Layer: Checkerboard (Transparent Background Indicator) */}
          <div className="absolute inset-0 bg-[#151515]"
               style={{ 
                 backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)',
                 backgroundSize: '24px 24px',
               }}
          />

          {/* Layer 1: Raw Image (Step 1) - Covers Base */}
          <Motion.div 
             className="absolute inset-0 bg-gray-900 flex items-center justify-center overflow-hidden z-20"
             initial={{ clipPath: "inset(0 0 0 0)" }}
             animate={{ 
                clipPath: step === 1 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
             }}
             transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: step === 1 ? 0 : 0.5 }}
          >
             <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Raw Product"
             />
             
             {/* Scanning Line Effect */}
             <AnimatePresence>
                {step !== 1 && (
                   <Motion.div 
                      className="absolute left-0 right-0 h-[3px] bg-luma-pink shadow-[0_0_25px_#FF6482] z-30 bottom-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 1.5 }}
                   />
                )}
             </AnimatePresence>
          </Motion.div>

          {/* Layer 2: Cutout Image (Step 2) */}
          <Motion.div
             className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
             animate={{ 
                opacity: 1, 
                scale: step === 2 ? 1 : 0.95 
             }}
             transition={{ duration: 0.5 }}
          >
             <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ mixBlendMode: 'normal' }}
                alt="Transparent Product"
             />
          </Motion.div>

          {/* Layer 3: Studio Final (Step 3) */}
          <Motion.div
             className="absolute inset-0 flex items-center justify-center overflow-hidden z-30"
             initial={{ opacity: 0 }}
             animate={{ opacity: step === 3 ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             {/* Studio Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#800000] via-[#3a0000] to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
             </div>

             {/* Final Product */}
             <Motion.img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="relative w-full h-full object-cover drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                animate={{ 
                   scale: step === 3 ? 1.05 : 1,
                   filter: step === 3 ? 'contrast(1.2) saturate(1.2) brightness(1.1)' : 'none'
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
             />

             {/* 4K Badge */}
             <Motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: step === 3 ? 1 : 0, opacity: step === 3 ? 1 : 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-[#4ADE80]/50 text-[#4ADE80] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl flex items-center gap-2"
             >
                <Maximize2 size={12} />
                <span>خروجی نهایی</span>
             </Motion.div>
          </Motion.div>

       </div>

       {/* --- Progress Steps Bar --- */}
       <div className="h-16 bg-[#0a0a0a] border-t border-white/5 flex items-center px-4 gap-2 shrink-0 relative z-20">
          {[
             { label: 'حذف پس‌زمینه', id: 1, activeBg: 'bg-luma-pink', activeShadow: 'shadow-[0_0_15px_rgba(255,100,130,0.3)]', activeText: 'text-white' },
             { label: 'تولید محیط استودیویی', id: 2, activeBg: 'bg-luma-yellow', activeShadow: 'shadow-[0_0_15px_rgba(255,179,64,0.3)]', activeText: 'text-black' },
             { label: 'افزایش کیفیت تا 4K', id: 3, activeBg: 'bg-[#4ADE80]', activeShadow: 'shadow-[0_0_15px_rgba(74,222,128,0.3)]', activeText: 'text-black' }
          ].map((item, i) => {
             const isActive = step === item.id;
             let activeClass = "border-transparent bg-transparent text-gray-600"; 
             if (isActive) {
                activeClass = `${item.activeBg} ${item.activeShadow} ${item.activeText} border-transparent scale-105`;
             } else if (step > item.id) {
                activeClass = "bg-white/5 text-gray-400 border-transparent";
             }
             return (
                <div key={i} className={`flex-1 h-10 rounded-xl flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all duration-500 border ${activeClass}`}>
                   {item.label}
                </div>
             );
          })}
       </div>
       <div className="h-0.5 bg-white/5 w-full relative overflow-hidden shrink-0">
          <Motion.div 
             className="absolute inset-y-0 right-0 h-full"
             initial={{ width: "0%" }}
             animate={{ 
                width: step === 0 ? "0%" : `${(step / 3) * 100}%`,
                backgroundColor: step === 1 ? '#FF6482' : step === 2 ? '#FFB340' : '#4ADE80'
             }}
             transition={{ duration: 0.5 }}
          />
       </div>
    </div>
  );
};