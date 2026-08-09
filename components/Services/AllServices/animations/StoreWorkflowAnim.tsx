import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Scissors, Image as ImageIcon, ScanLine, Check } from 'lucide-react';
import { fetchGalleryAssets } from '../../../Gallery/data';
import { useTheme } from '../../../../lib/ThemeContext';

// Bypass type issues with framer-motion props
const Motion = motion as any;

const STEPS = [
  { 
    id: 1, 
    label: 'حذف پس‌زمینه', 
    icon: Scissors,
    color: '#FF6482', // Pink
    duration: 4000
  },
  { 
    id: 2, 
    label: 'محیط استودیویی', 
    icon: ImageIcon,
    color: '#FFB340', // Yellow
    duration: 4000
  },
  { 
    id: 3, 
    label: 'کیفیت 4K', 
    icon: Maximize2,
    color: '#4ADE80', // Green
    duration: 4000
  }
];

export const StoreWorkflowAnim = () => {
  const [step, setStep] = useState(1); 
  const [assets, setAssets] = useState<{ raw: string; cut: string } | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    const loadAssets = async () => {
        try {
            // Strategy: Try 'remove-bg' first, then 'edit-image', then 'upscale' to find ANY valid pair
            let validItem = null;

            // 1. Try Remove BG
            const bgData = await fetchGalleryAssets('remove-bg');
            validItem = bgData.find(item => item.thumbnailUrl && item.thumbnailUrlBefore);

            // 2. Try Edit Image if needed
            if (!validItem) {
                const editData = await fetchGalleryAssets('edit-image');
                validItem = editData.find(item => item.thumbnailUrl && item.thumbnailUrlBefore);
            }
            
            if (validItem && isMounted) {
                setAssets({
                    raw: validItem.thumbnailUrlBefore!,
                    cut: validItem.thumbnailUrl
                });
            }
        } catch (e) {
            console.error("Failed to load store workflow assets", e);
        }
    };
    loadAssets();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const totalDuration = STEPS.reduce((acc, curr) => acc + curr.duration, 0);
    
    const cycle = () => {
      setStep(1);
      setTimeout(() => setStep(2), STEPS[0].duration);
      setTimeout(() => setStep(3), STEPS[0].duration + STEPS[1].duration);
    };
    
    cycle(); // Initial run
    const interval = setInterval(cycle, totalDuration);
    
    return () => clearInterval(interval);
  }, []);

  // Fallbacks
  const rawImage = assets?.raw || "";
  const cutImage = assets?.cut || "";

  return (
    <div className="relative w-full h-full bg-white dark:bg-[#0a0a0a] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl transition-all duration-300">
       
       {/* --- Main Visual Area --- */}
       <div className="relative flex-1 w-full h-full overflow-hidden group">
          
          {/* Base Layer: Checkerboard (Transparency) */}
          <div className="absolute inset-0 transition-colors duration-300"
               style={{ 
                 backgroundColor: theme === 'dark' ? '#151515' : '#f5f5f7',
                 backgroundImage: theme === 'dark' 
                   ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)'
                   : 'linear-gradient(45deg, #e6e6e8 25%, transparent 25%), linear-gradient(-45deg, #e6e6e8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e6e6e8 75%), linear-gradient(-45deg, transparent 75%, #e6e6e8 75%)',
                 backgroundSize: '20px 20px',
               }}
          />

          {/* Layer 1: Raw Image (Masked away in Step 2+) */}
          <AnimatePresence>
             {step === 1 && (
                <Motion.div 
                   key="raw-layer"
                   className="absolute inset-0 z-20 bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300"
                   initial={{ clipPath: "inset(0 0 0 0)" }}
                   exit={{ clipPath: "inset(0 0 100% 0)" }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                   {/* Flex container for the image to ensure it covers properly */}
                   <div className="absolute inset-0 flex items-center justify-center">
                        {rawImage ? (
                            <img 
                                src={rawImage}
                                className="w-full h-full object-cover"
                                alt="Raw"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                        )}
                   </div>
                   
                   {/* Scanning Line Effect */}
                   <Motion.div 
                      className="absolute left-0 right-0 h-1 bg-luma-pink shadow-[0_0_25px_#FF6482] z-30"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, ease: "linear", delay: 0.5 }}
                   />
                   
                   {/* Scan Badge Wrapper - Uses Flexbox for perfect centering */}
                   <div className="absolute inset-0 flex items-center justify-center z-40">
                       <Motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                       >
                          <div 
                            className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
                            dir="ltr"
                          >
                            <ScanLine size={16} className="text-luma-pink animate-pulse shrink-0" />
                            <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">SCANNING...</span>
                          </div>
                       </Motion.div>
                   </div>
                </Motion.div>
             )}
          </AnimatePresence>

          {/* Layer 2: Transparent Cutout (Always Visible underneath) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 p-4 md:p-8">
             {cutImage ? (
                <Motion.img 
                   src={cutImage}
                   className="w-full h-full object-contain drop-shadow-2xl"
                   animate={{ 
                      scale: step === 2 ? 0.95 : step === 3 ? 1.05 : 1,
                      y: step === 2 ? 10 : 0
                   }}
                   transition={{ duration: 0.8 }}
                   alt="Cutout"
                   referrerPolicy="no-referrer"
                />
             ) : (
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
             )}
          </div>

          {/* Layer 3: Studio Background (Fades in Step 2) */}
          <Motion.div
             className="absolute inset-0 z-0"
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 2 ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             {/* Dynamic Studio Gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-900 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
             </div>
          </Motion.div>

          {/* Layer 4: Final Polish (Step 3) */}
          <AnimatePresence>
             {step === 3 && (
                <Motion.div
                   className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.2 }}
                   exit={{ opacity: 0 }}
                >
                   <div className="w-full h-full bg-white" />
                </Motion.div>
             )}
          </AnimatePresence>

          {/* Step 3 Badge */}
          <AnimatePresence>
             {step === 3 && (
                <Motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0, opacity: 0 }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#4ADE80]/10 backdrop-blur-md border border-[#4ADE80]/20 text-[#4ADE80] px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-lg flex items-center gap-2 z-40"
                >
                   <Check size={12} />
                   <span>خروجی نهایی</span>
                </Motion.div>
             )}
          </AnimatePresence>

       </div>

       {/* --- Progress Steps Bar --- */}
       <div className="h-16 md:h-20 bg-zinc-100/50 dark:bg-[#0c0c0e] border-t border-zinc-200 dark:border-white/5 flex items-center justify-between px-2 md:px-6 relative z-20 gap-2 md:gap-4 transition-colors duration-300">
          {STEPS.map((s, i) => {
             const isActive = step === s.id;
             const isPast = step > s.id;
             
             return (
                <div key={s.id} className="flex-1 relative h-10 md:h-12">
                   {/* Background Container */}
                   <div className={`
                      absolute inset-0 rounded-xl border flex items-center justify-center gap-1.5 md:gap-2 transition-all duration-500 overflow-hidden
                      ${isActive 
                         ? 'bg-zinc-200/50 dark:bg-[#151515] border-zinc-300/60 dark:border-white/10' 
                         : 'bg-transparent border-transparent opacity-50'
                      }
                   `}>
                      {/* Active Progress Fill */}
                      {isActive && (
                         <Motion.div 
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundColor: s.color }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: s.duration / 1000, ease: "linear" }}
                         />
                      )}

                      {/* Icon */}
                      <div className={`
                         w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0
                         ${isActive || isPast ? '' : 'grayscale'}
                      `} style={{ backgroundColor: isActive || isPast ? `${s.color}20` : (theme === 'dark' ? '#333' : '#e6e6e8') }}>
                         <s.icon size={12} className="md:w-[14px] md:h-[14px]" style={{ color: isActive || isPast ? s.color : (theme === 'dark' ? '#888' : '#777') }} />
                      </div>

                      {/* Label */}
                      <span className={`
                         text-[9px] md:text-[11px] font-bold whitespace-nowrap transition-colors duration-300
                         ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-gray-500'}
                      `}>
                         {s.label}
                      </span>
                   </div>
                   
                   {/* Bottom Indicator Line */}
                   {isActive && (
                      <Motion.div 
                         layoutId="active-step-indicator"
                         className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                         style={{ backgroundColor: s.color }}
                      />
                   )}
                </div>
             );
          })}
       </div>
    </div>
  );
};
