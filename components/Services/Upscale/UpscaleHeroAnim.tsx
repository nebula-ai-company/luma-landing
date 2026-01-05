
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Maximize2, CheckCircle2, Zap, ZoomIn, Image as ImageIcon } from 'lucide-react';

export const UpscaleHeroAnim = () => {
  const [step, setStep] = useState(0); 
  // 0: Low Res Input
  // 1: Scanning/Processing
  // 2: High Res Reveal
  // 3: Detail Zoom (Macro View)

  const imageSrc = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"; // High quality portrait

  useEffect(() => {
    const cycle = async () => {
        while(true) {
            setStep(0);
            await new Promise(r => setTimeout(r, 2000)); // Show Low Res
            setStep(1);
            await new Promise(r => setTimeout(r, 2500)); // Scanning
            setStep(2);
            await new Promise(r => setTimeout(r, 3000)); // Show High Res
            setStep(3);
            await new Promise(r => setTimeout(r, 4000)); // Zoom Detail
        }
    };
    cycle();
  }, []);

  return (
    <div className="relative w-full h-full bg-[#080808] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
       
       {/* --- Header UI --- */}
       <div className="h-14 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luma-yellow/20 to-luma-purple/20 border border-white/10 flex items-center justify-center">
                 <Maximize2 size={16} className="text-luma-yellow" />
             </div>
             <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">موتور ارتقاء کیفیت</span>
                 <span className="text-[9px] text-luma-yellow font-bold">وضوح کریستالی</span>
             </div>
          </div>
          <div className="flex gap-2 items-center">
             <div className={`px-2 py-1 rounded text-[9px] font-bold border ${step >= 2 ? 'bg-luma-yellow/20 text-luma-yellow border-luma-yellow/30' : 'bg-white/5 text-gray-500 border-white/5'}`}>
                کیفیت 4K
             </div>
          </div>
       </div>

       {/* --- Main Viewport --- */}
       <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#050505]">
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Image Container */}
          <div className="relative w-[300px] h-[400px] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
             
             {/* 1. Low Res Layer (Pixelated) */}
             <motion.img 
                src={imageSrc} 
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'blur(4px) contrast(0.8)', scale: 1.05 }}
                animate={{ opacity: step >= 2 ? 0 : 1 }}
                transition={{ duration: 0.5 }}
             />
             
             {/* 2. High Res Layer (Sharp) */}
             <motion.div 
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
             >
                <img 
                   src={imageSrc} 
                   className="w-full h-full object-cover"
                   style={{ filter: 'contrast(1.1) saturate(1.1)' }}
                />
             </motion.div>

             {/* 3. Scanning Effect */}
             <AnimatePresence>
                {step === 1 && (
                   <motion.div 
                      className="absolute inset-0 z-20 bg-luma-yellow/10"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                   >
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-white shadow-[0_0_20px_white]" />
                   </motion.div>
                )}
             </AnimatePresence>

             {/* 4. Zoom Lens Effect (Step 3) */}
             <AnimatePresence>
                {step === 3 && (
                   <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border-2 border-white/50 overflow-hidden shadow-2xl z-30 bg-black"
                   >
                      <img 
                         src={imageSrc}
                         className="absolute w-[300%] max-w-none h-[300%] object-cover"
                         style={{ top: '-50%', right: '-50%', filter: 'contrast(1.2) sharpen(1)' }}
                      />
                      {/* Crosshair */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                         <div className="w-full h-px bg-white" />
                         <div className="h-full w-px bg-white absolute" />
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Floating Labels */}
             <div className="absolute bottom-4 right-4 z-20">
                <motion.div 
                   className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2"
                   animate={{ 
                      borderColor: step >= 2 ? "rgba(255, 179, 64, 0.4)" : "rgba(255,255,255,0.1)",
                   }}
                >
                   {step === 0 && <ImageIcon size={12} className="text-gray-400" />}
                   {step === 1 && <Scan size={12} className="text-luma-yellow animate-pulse" />}
                   {step === 2 && <CheckCircle2 size={12} className="text-luma-yellow" />}
                   {step === 3 && <ZoomIn size={12} className="text-luma-pink" />}
                   
                   <span className="text-[10px] font-bold text-white">
                      {step === 0 ? "نسخه اصلی 720p" : step === 1 ? "در حال بازسازی..." : "خروجی 4K"}
                   </span>
                </motion.div>
             </div>

          </div>
       </div>

       {/* --- Footer Controls --- */}
       <div className="h-14 bg-[#0a0a0a] border-t border-white/5 flex items-center px-6 justify-between shrink-0">
          <div className="flex gap-4">
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase">رزولوشن</span>
                <span className="text-[10px] text-white font-mono dir-ltr text-right">3840 x 2160</span>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase">مدل</span>
                <span className="text-[10px] text-luma-yellow font-bold">کریستال</span>
             </div>
          </div>
          <motion.div 
             animate={{ scale: step === 1 ? 0.9 : 1 }}
             className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-luma-yellow text-black' : 'bg-white/10 text-gray-500'}`}
          >
             <Zap size={14} className={step >= 2 ? "fill-black" : ""} />
          </motion.div>
       </div>
    </div>
  );
};
