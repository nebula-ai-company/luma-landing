import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Image as ImageIcon, Check, Wand2, Layers, Download, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

const DEFAULT_EXAMPLES = [
  {
    imgOriginal: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    imgRemoved: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    label: "پرتره استودیویی",
    adTitle: "پرسونال برندینگ",
    adSubtitle: "عکاسی حرفه‌ای",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    imgOriginal: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    imgRemoved: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    label: "محصول دیجیتال",
    adTitle: "تکنولوژی برتر",
    adSubtitle: "نسل جدید",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    imgOriginal: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    imgRemoved: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    label: "مد و فشن",
    adTitle: "استایل خیابانی",
    adSubtitle: "کالکشن پاییزه",
    gradient: "from-amber-700 to-yellow-600"
  }
];

export const BgRemoveHeroAnim = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [examples, setExamples] = useState(DEFAULT_EXAMPLES);
  // 0: Idle/Input
  // 1: Scanning/Processing
  // 2: Result (Transparent)
  // 3: Marketing Asset Generation

  useEffect(() => {
    let mounted = true;
    const fetchRealAssets = async () => {
      try {
        const response = await fetch('https://pb.lumai.ir/api/collections/background_removal/records?page=1&perPage=5&sort=-created');
        if (response.ok) {
          const result = await response.json();
          if (result.items && Array.isArray(result.items) && result.items.length > 0) {
            const mapped = result.items.map((item: any) => ({
              imgOriginal: item.before ? `https://pb.lumai.ir/api/files/background_removal/${item.id}/${item.before}` : `https://pb.lumai.ir/api/files/background_removal/${item.id}/${item.result}`,
              imgRemoved: `https://pb.lumai.ir/api/files/background_removal/${item.id}/${item.result}`,
              label: item.title || "حذف پس‌زمینه",
              adTitle: "لوما بات",
              adSubtitle: "هوشمند و بی نقص",
              gradient: "from-indigo-600 to-purple-600"
            }));
            if (mounted) {
              setExamples(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch bg-remove records in anim:", err);
      }
    };
    fetchRealAssets();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
        while(mounted) {
            setStep(0);
            await new Promise(r => setTimeout(r, 2000)); // Show Original
            if(!mounted) break;
            setStep(1);
            await new Promise(r => setTimeout(r, 2500)); // Scanning
            if(!mounted) break;
            setStep(2);
            await new Promise(r => setTimeout(r, 3000)); // Transparent
            if(!mounted) break;
            setStep(3);
            await new Promise(r => setTimeout(r, 4000)); // Final Ad
            if(!mounted) break;
            
            // Switch image
            setCurrentIdx(prev => (prev + 1) % examples.length);
        }
    };
    cycle();
    return () => { mounted = false; };
  }, [examples]);

  const currentItem = examples[currentIdx] || DEFAULT_EXAMPLES[0];

  // Grid line color based on theme
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';

  return (
    <div className="relative w-full h-full bg-white dark:bg-[#0c0c0e] flex flex-col font-sans select-none transition-colors duration-300" dir="rtl">
      
      {/* --- Internal Animated Background (Matches Parent) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <motion.div 
            className="absolute inset-0"
            style={{ 
               backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
               backgroundSize: '32px 32px'
            }}
            animate={{ backgroundPosition: ["0px 0px", "32px 32px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         />
      </div>

      {/* --- High-Tech Header --- */}
      <div className="h-16 border-b border-black/5 dark:border-white/5 bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-luma-pink/20 to-luma-purple/20 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <Wand2 size={18} className="text-luma-pink animate-pulse" />
            </div>
            <div>
                <span className="text-xs font-bold text-zinc-800 dark:text-white tracking-wide block">حذف جادویی</span>
                <span className="text-[10px] text-zinc-400 dark:text-gray-500">نسخه ۳.۰ • دقت بالا</span>
            </div>
         </div>
         
         <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-bold text-zinc-650 dark:text-gray-300 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                 ۲ لوم
              </div>
         </div>
      </div>

      {/* --- Main Workspace --- */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
         
         {/* Central Content */}
         <div className="relative z-10 w-[280px] md:w-[320px] aspect-[4/5]">
            
            {/* The Card Container */}
            <motion.div 
               className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#080808]"
               animate={{ 
                  scale: step === 3 ? 0.9 : 1,
                  y: step === 3 ? 20 : 0,
                  rotateX: step === 3 ? 10 : 0
               }}
               transition={{ duration: 0.6, type: "spring" }}
            >
               {/* 0. Transparency Checkerboard (Base) */}
               <div className="absolute inset-0 opacity-30"
                    style={{ 
                        backgroundImage: theme === 'dark'
                          ? 'linear-gradient(45deg, #1c1c1c 25%, transparent 25%), linear-gradient(-45deg, #1c1c1c 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1c1c1c 75%), linear-gradient(-45deg, transparent 75%, #1c1c1c 75%)'
                          : 'linear-gradient(45deg, #e4e4e7 25%, transparent 25%), linear-gradient(-45deg, #e4e4e7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e4e4e7 75%), linear-gradient(-45deg, transparent 75%, #e4e4e7 75%)',
                        backgroundSize: '20px 20px',
                    }} 
               />

               {/* 1. Original Image (Background Layer) - Fades out */}
               <motion.div 
                  className="absolute inset-0 w-full h-full" 
                  animate={{ opacity: step >= 2 ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
               >
                   <AnimatePresence mode='wait'>
                       <motion.img 
                           key={currentItem.imgOriginal}
                           src={currentItem.imgOriginal} 
                           className="w-full h-full object-cover" 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                       />
                   </AnimatePresence>
               </motion.div>

               {/* 2. The Removed Subject (Always Visible / Top Layer) */}
               <motion.div className="absolute inset-0 z-10 pointer-events-none">
                   <AnimatePresence mode='wait'>
                       <motion.img 
                           key={currentItem.imgRemoved}
                           src={currentItem.imgRemoved} 
                           className="w-full h-full object-cover" 
                           initial={{ opacity: 0, scale: 1.05 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                       />
                   </AnimatePresence>
               </motion.div>

               {/* 3. The "Removal" Mask Effect - Flash or Dim during scan */}
               <motion.div 
                  className="absolute inset-0 z-20 bg-black/40" // Dimming overlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 1 ? 0.3 : 0 }}
               />

               {/* 4. Scanning Beam */}
               <AnimatePresence>
                  {step === 1 && (
                     <motion.div
                        initial={{ top: "-20%" }}
                        animate={{ top: "120%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-luma-pink/30 to-transparent z-30 blur-sm"
                     >
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-luma-pink shadow-[0_0_20px_#FF6482]" />
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* 5. Result Flash */}
               <AnimatePresence>
                   {step === 2 && (
                       <motion.div 
                           className="absolute inset-0 bg-white z-40 mix-blend-overlay"
                           initial={{ opacity: 0.8 }}
                           animate={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                       />
                   )}
               </AnimatePresence>

               {/* 6. Status Pill */}
               <div className="absolute top-4 left-4 z-50">
                  <motion.div 
                     className="px-3 py-1.5 rounded-full backdrop-blur-xl border border-black/5 dark:border-white/10 flex items-center gap-2 shadow-lg bg-white/70 dark:bg-black/40"
                     layout
                  >
                     {step === 0 && <ImageIcon size={12} className="text-zinc-500 dark:text-gray-400" />}
                     {step === 1 && <Scan size={12} className="text-luma-pink animate-pulse" />}
                     {step === 2 && <Check size={12} className="text-green-500 dark:text-green-400" />}
                     {step === 3 && <Layers size={12} className="text-luma-yellow" />}
                     
                     <motion.span 
                        key={`${step}-${currentIdx}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold text-zinc-800 dark:text-white"
                      >
                        {step === 0 && currentItem.label}
                        {step === 1 && "تشخیص سوژه..."}
                        {step === 2 && "حذف شد"}
                        {step === 3 && "خروجی نهایی"}
                     </motion.span>
                  </motion.div>
               </div>

            </motion.div>

            {/* --- Step 3: Social Media Post Composition (Floating Behind) --- */}
            <AnimatePresence mode='wait'>
                {step === 3 && (
                    <motion.div 
                        key={currentIdx}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ delay: 0.2 }}
                        className={`absolute -inset-4 -z-10 bg-gradient-to-br ${currentItem.gradient} rounded-[28px] flex items-end justify-center pb-8 shadow-2xl`}
                    >
                        <div className="text-center text-white w-full px-6">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h4 className="text-4xl font-black italic tracking-tighter uppercase mb-2">{currentItem.adTitle}</h4>
                                <p className="text-xs font-bold bg-white text-black px-3 py-1 inline-block rounded-full shadow-lg">{currentItem.adSubtitle}</p>
                            </motion.div>
                        </div>
                        {/* Particles */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    </motion.div>
                )}
            </AnimatePresence>

         </div>
      </div>

      {/* --- Footer Controls --- */}
      <div className="h-16 bg-zinc-50 dark:bg-[#0c0c0e] border-t border-black/5 dark:border-white/5 flex items-center justify-between px-6 z-20 transition-colors duration-300">
         <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-bold uppercase tracking-wider">تعرفه</span>
            <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-luma-yellow fill-luma-yellow" />
                <span className="text-sm font-bold text-zinc-850 dark:text-white">۲ لوم</span>
            </div>
         </div>

         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-9 px-5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm dark:shadow-lg transition-all ${step === 3 ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white border border-black/10 dark:border-white/10'}`}
         >
            {step === 3 ? (
                <> <Download size={14} /> <span>دانلود طرح</span> </>
            ) : (
                <> <Sparkles size={14} /> <span>پردازش</span> </>
            )}
         </motion.button>
      </div>
    </div>
  );
};
