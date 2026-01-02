
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Palette, Clapperboard } from 'lucide-react';

export const ContentWorkflowAnim = () => {
  const [step, setStep] = useState(1); 
  // 1: Script (Typing)
  // 2: Video Gen (Raw)
  // 3: Color Grade (Polished)

  const scriptText = "خارجی. شب. خیابان‌های نئو-توکیو.\nباران به شدت می‌بارد. نورهای نئون در چاله‌های آب منعکس می‌شوند.\nیک موتورسوار با سرعت عبور می‌کند...";

  useEffect(() => {
     const duration = 13500; 
     const cycle = () => {
        setStep(1); // Script
        setTimeout(() => setStep(2), 4500); // Video Gen
        setTimeout(() => setStep(3), 9000); // Color Grade
        setTimeout(() => setStep(1), 13500); // Loop
     };
     const initialTimer = setTimeout(cycle, 100);
     const interval = setInterval(cycle, duration);
     return () => { clearTimeout(initialTimer); clearInterval(interval); };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10">
       
       {/* --- Visual Area (Full Bleed) --- */}
       <div className="relative flex-1 w-full h-full overflow-hidden">
          
          {/* STEP 1: Smart Scriptwriting */}
          <motion.div 
             className="absolute inset-0 bg-[#080808] flex items-center justify-center p-8 z-10"
             animate={{ opacity: step === 1 ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
             {/* Floating Code/Script Elements */}
             <div className="w-full max-w-sm space-y-4 relative z-10 dir-rtl text-right">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-8 h-8 rounded-lg bg-luma-purple/20 flex items-center justify-center text-luma-purple border border-luma-purple/30">
                      <Bot size={16} />
                   </div>
                   <span className="text-xs font-bold text-luma-purple tracking-wide">سناریو نویس هوشمند</span>
                </div>
                
                {/* Typing Text */}
                <div className="font-mono text-lg md:text-xl text-gray-200 leading-loose">
                   {step === 1 ? (
                      <motion.span
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.5 }}
                      >
                         {scriptText.split('').map((char, i) => (
                            <motion.span
                               key={i}
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: i * 0.05, duration: 0 }}
                            >
                               {char}
                            </motion.span>
                         ))}
                         <motion.span 
                            animate={{ opacity: [0, 1, 0] }} 
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-5 bg-luma-purple ml-1 align-middle"
                         />
                      </motion.span>
                   ) : (
                      <span>{scriptText}</span>
                   )}
                </div>
             </div>
          </motion.div>

          {/* STEP 2: Text to Video (Raw Generation) */}
          <motion.div 
             className="absolute inset-0 z-20 bg-black"
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 2 ? 1 : 0 }}
             transition={{ duration: 1 }}
          >
             <img 
                src="https://images.unsplash.com/photo-1605218427306-0343d6114e44?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(60%) contrast(85%) brightness(90%)' }} // Raw/Flat Look
                alt="Raw Video"
             />
             
             {/* Scanning/Building Effect */}
             <AnimatePresence>
                {step === 2 && (
                   <motion.div 
                      className="absolute inset-0 bg-luma-purple/10 z-30"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, ease: "linear" }}
                   >
                      <div className="absolute inset-0 bg-grid-white opacity-10" />
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-luma-purple shadow-[0_0_20px_#DA8FFF]" />
                   </motion.div>
                )}
             </AnimatePresence>

             {/* UI Badge */}
             {step === 2 && (
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2"
                >
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-white uppercase tracking-wider">رندرینگ اولیه</span>
                </motion.div>
             )}
          </motion.div>

          {/* STEP 3: Color Grading (Final Polish) */}
          <motion.div 
             className="absolute inset-0 z-30 overflow-hidden"
             initial={{ clipPath: "inset(0 100% 0 0)" }} // Wipe from left (RTL visually reveal right side)
             animate={{ 
                clipPath: step === 3 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" 
             }}
             transition={{ duration: 2, ease: "easeInOut" }}
          >
             <img 
                src="https://images.unsplash.com/photo-1605218427306-0343d6114e44?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(125%) saturate(130%) brightness(110%)' }} // Cinematic Look
                alt="Graded Video"
             />
             
             {/* Slider Handle Line */}
             <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg group cursor-pointer">
                   <Palette size={14} className="text-white" />
                   {/* Label tooltip for the slider */}
                   <div className="absolute left-full ml-3 px-2 py-1 bg-black/80 backdrop-blur rounded text-[10px] text-white font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
                      تنظیم رنگ
                   </div>
                </div>
             </div>

             {/* Final Badge */}
             <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-luma-purple/50 text-luma-purple px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl flex items-center gap-2"
             >
                <Clapperboard size={12} />
                <span>اصلاح رنگ سینمایی</span>
             </motion.div>
          </motion.div>

       </div>

       {/* --- Progress Bar --- */}
       <div className="h-16 bg-[#0a0a0a] border-t border-white/5 flex items-center px-4 gap-2 shrink-0 relative z-20">
          {[
             { label: 'سناریو نویسی هوشمند', id: 1, activeBg: 'bg-luma-purple', activeShadow: 'shadow-[0_0_15px_rgba(218,143,255,0.3)]', activeText: 'text-black' },
             { label: 'تبدیل متن به ویدیو', id: 2, activeBg: 'bg-[#818CF8]', activeShadow: 'shadow-[0_0_15px_rgba(129,140,248,0.3)]', activeText: 'text-white' },
             { label: 'اصلاح رنگ و نور', id: 3, activeBg: 'bg-[#F472B6]', activeShadow: 'shadow-[0_0_15px_rgba(244,114,182,0.3)]', activeText: 'text-white' }
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
       
       {/* Active Loading Line */}
       <div className="h-0.5 bg-white/5 w-full relative overflow-hidden shrink-0">
          <motion.div 
             className="absolute inset-y-0 right-0 h-full"
             initial={{ width: "0%" }}
             animate={{ 
                width: step === 0 ? "0%" : `${(step / 3) * 100}%`,
                backgroundColor: step === 1 ? '#DA8FFF' : step === 2 ? '#818CF8' : '#F472B6'
             }}
             transition={{ duration: 0.5 }}
          />
       </div>
    </div>
  );
};
