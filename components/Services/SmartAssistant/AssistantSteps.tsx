
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FileText, Cpu, Sliders, Globe, Upload, Check, Sparkles, Zap, BrainCircuit, Database, ShieldAlert, ShieldCheck } from 'lucide-react';

// --- Premium Component: Step 1 (Identity) ---
// Theme: Luma Yellow
const Step1Preview = () => (
  <div className="space-y-8 p-4">
    {/* Name Input */}
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs text-luma-yellow font-bold tracking-wide">نام و هویت دستیار</label>
        <span className="text-[10px] text-gray-500 font-mono">۰/۵۰</span>
      </div>
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group transition-colors hover:border-luma-yellow/30">
        <div className="w-10 h-10 rounded-xl bg-luma-yellow/10 flex items-center justify-center border border-luma-yellow/20 shadow-[0_0_15px_rgba(255,179,64,0.1)]">
           <User size={18} className="text-luma-yellow" />
        </div>
        <div className="h-5 w-32 bg-white/5 rounded-md animate-pulse" />
      </div>
    </div>

    {/* Tone Selection */}
    <div className="space-y-3">
      <label className="text-xs text-gray-400 font-bold">لحن و شخصیت</label>
      <div className="grid grid-cols-3 gap-3">
         {['رسمی و اداری', 'دوستانه', 'طنز و خلاق'].map((t, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`
                    py-3 rounded-xl text-[11px] font-bold text-center border cursor-pointer transition-all duration-300 relative overflow-hidden
                    ${i===1 
                        ? 'bg-luma-yellow text-black border-luma-yellow shadow-[0_0_20px_rgba(255,179,64,0.3)]' 
                        : 'bg-[#1a1a1a] text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300'
                    }
                `}
            >
               {t}
               {i===1 && <motion.div className="absolute inset-0 bg-white/20" animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />}
            </motion.div>
         ))}
      </div>
    </div>
    
    {/* Creativity Slider */}
    <div className="space-y-4 pt-2">
       <div className="flex justify-between text-xs text-gray-400">
          <span>میزان خلاقیت</span>
          <span className="text-luma-yellow font-mono">۷۰٪</span>
       </div>
       <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5 relative">
          <motion.div 
             className="absolute inset-y-0 right-0 bg-gradient-to-l from-luma-yellow to-luma-pink rounded-full" 
             initial={{ width: 0 }} 
             animate={{ width: '70%' }} 
             transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }} 
          />
          {/* Thumb */}
          <motion.div 
             className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg z-10"
             initial={{ right: '0%' }}
             animate={{ right: '70%' }}
             transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }} 
          />
       </div>
    </div>
  </div>
);

// --- Premium Component: Step 2 (Knowledge) ---
// Theme: Luma Pink
// Concept: Raw Data -> Processing -> Structured Info
const Step2Preview = () => (
  <div className="h-full flex flex-col p-2">
     {/* Upload Zone */}
     <div className="border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 bg-[#151515]/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-luma-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="w-12 h-12 rounded-full bg-[#222] flex items-center justify-center border border-white/10 shadow-lg relative z-10">
           <Upload size={20} className="text-gray-400 group-hover:text-luma-pink transition-colors" />
        </div>
        <div className="text-center z-10">
           <span className="text-xs text-gray-300 block font-bold">بارگذاری مستندات شرکت</span>
           <span className="text-[10px] text-gray-600 block mt-1">PDF, Word, Excel</span>
        </div>
     </div>

     {/* Processing Pipeline Visualization */}
     <div className="flex-1 flex flex-col justify-center py-4 relative">
        {/* Connector Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
        
        <div className="relative z-10 space-y-3">
            {/* Item 1: Processing */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1a1a1a] border border-luma-pink/20 p-3 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(255,100,130,0.05)]"
            >
                <div className="w-8 h-8 rounded-lg bg-luma-pink/10 flex items-center justify-center animate-pulse">
                    <BrainCircuit size={16} className="text-luma-pink" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-luma-pink font-bold mb-0.5">در حال استخراج دانش...</div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-luma-pink"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Item 2: Processed */}
            <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-[#1a1a1a] border border-white/5 p-3 rounded-xl flex items-center gap-3"
            >
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/10">
                    <Database size={16} className="text-green-500" />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] text-gray-300 font-bold">اطلاعات پردازش شده</div>
                    <div className="text-[9px] text-gray-600 mt-0.5">آماده برای پاسخگویی</div>
                </div>
                <Check size={14} className="text-green-500" />
            </motion.div>
        </div>
     </div>
  </div>
);

// --- Premium Component: Step 3 (Brain) ---
// Theme: Luma Purple
const Step3Preview = () => (
  <div className="space-y-4 p-2">
     {[
        { id: 'pro', name: 'هوش مصنوعی پیشرفته', desc: 'مناسب برای تحلیل‌های عمیق و منطقی', speed: 85, active: true },
        { id: 'fast', name: 'هوش مصنوعی سریع', desc: 'پاسخ‌دهی آنی برای مکالمات ساده', speed: 100, active: false },
        { id: 'creative', name: 'هوش مصنوعی خلاق', desc: 'ایده‌پردازی و تولید محتوای متنی', speed: 90, active: false },
     ].map((model, idx) => (
        <motion.div 
           key={model.id}
           className={`
              p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-500
              ${model.active 
                 ? 'bg-[#15101a] border-luma-purple/50 shadow-[0_0_20px_-5px_rgba(218,143,255,0.3)] relative overflow-hidden' 
                 : 'bg-transparent border-white/5 opacity-50 hover:opacity-80'
              }
           `}
           whileHover={{ scale: 1.02 }}
        >
           {model.active && <div className="absolute inset-0 bg-gradient-to-r from-luma-purple/10 to-transparent pointer-events-none" />}
           
           <div className="flex items-center gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${model.active ? 'bg-luma-purple text-black border-luma-purple' : 'bg-[#111] text-gray-500 border-white/10'}`}>
                 <Cpu size={20} />
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold ${model.active ? 'text-white' : 'text-gray-400'}`}>{model.name}</h4>
                    {model.active && <span className="text-[9px] bg-luma-purple/20 text-luma-purple border border-luma-purple/20 px-1.5 py-0.5 rounded">انتخاب شده</span>}
                 </div>
                 <p className="text-[10px] text-gray-500 mt-1">{model.desc}</p>
              </div>
           </div>
        </motion.div>
     ))}
  </div>
);

// --- Premium Component: Step 4 (Behavior) ---
// Theme: Mixed (Purple/Pink/Yellow accents)
const Step4Preview = () => (
  <div className="h-full flex flex-col relative p-2">
     <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111] pointer-events-none z-10 opacity-50" />
     
     {/* Logic Config */}
     <div className="space-y-3 text-[10px] opacity-90 mb-4">
        <div className="flex items-center gap-2 text-gray-500 font-bold mb-2">
            <Sliders size={12} />
            <span>تنظیمات رفتاری</span>
        </div>
        
        {/* Do's */}
        <div className="bg-[#151515] border-r-2 border-luma-purple p-2.5 rounded-l-xl flex gap-3 items-start">
           <ShieldCheck size={14} className="text-luma-purple shrink-0 mt-0.5" />
           <div>
              <span className="text-luma-purple font-bold block mb-1">بایدها (الزامات):</span>
              <p className="text-gray-400 leading-relaxed text-[9px]">
                 - پاسخ‌ها کوتاه و صمیمی باشد.<br/>
                 - از ایموجی‌های مرتبط استفاده شود.
              </p>
           </div>
        </div>

        {/* Don'ts */}
        <div className="bg-[#151515] border-r-2 border-luma-pink p-2.5 rounded-l-xl flex gap-3 items-start">
           <ShieldAlert size={14} className="text-luma-pink shrink-0 mt-0.5" />
           <div>
              <span className="text-luma-pink font-bold block mb-1">نبایدها (خط قرمزها):</span>
              <p className="text-gray-400 leading-relaxed text-[9px]">
                 - اطلاعات شخصی کاربر پرسیده نشود.<br/>
                 - در مورد رقبا صحبت نشود.
              </p>
           </div>
        </div>
     </div>
     
     {/* Simulation Chat Bubble */}
     <motion.div 
        className="mt-auto bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl rounded-tr-sm shadow-2xl relative z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
     >
        <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
           <Sparkles size={12} className="text-luma-yellow" />
           <span className="text-[10px] text-luma-yellow font-bold">پیش‌نمایش خروجی</span>
        </div>
        <p className="text-xs text-white leading-relaxed dir-rtl text-right">
           سلام! 👋 چطور می‌تونم امروز کمکتون کنم؟ من تمام اطلاعات فنی محصولات جدید رو مطالعه کردم و آماده پاسخگویی هستم.
        </p>
     </motion.div>
  </div>
);

// --- Main Component ---

const STEPS = [
  { id: 1, title: "هویت بصری", desc: "تعیین نام، لحن و شخصیت دستیار", icon: User, content: Step1Preview },
  { id: 2, title: "پایگاه دانش", desc: "پردازش اسناد و اطلاعات سازمانی", icon: FileText, content: Step2Preview },
  { id: 3, title: "انتخاب مغز", desc: "موتور هوش مصنوعی پردازشگر", icon: Cpu, content: Step3Preview },
  { id: 4, title: "مهندسی رفتار", desc: "قوانین و چارچوب‌های اخلاقی", icon: Sliders, content: Step4Preview },
];

export const AssistantSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
       
       {/* --- Animated Background Ambience --- */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
             animate={{ 
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.05, 0.1, 0.05]
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-luma-yellow/10 blur-[120px] rounded-full mix-blend-screen" 
          />
          <motion.div 
             animate={{ 
                x: [0, -50, 50, 0],
                y: [0, 40, -40, 0],
                scale: [1, 0.9, 1.1, 1],
                opacity: [0.05, 0.1, 0.05]
             }}
             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-luma-purple/10 blur-[100px] rounded-full mix-blend-screen" 
          />
       </div>

       <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest backdrop-blur-md"
             >
                <Zap size={12} className="text-luma-yellow" />
                <span>فرآیند راه‌اندازی</span>
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
             >
                خلق دستیار در <span className="text-gradient-animated">۴ گام</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-gray-500 font-light text-lg max-w-2xl mx-auto"
             >
                بدون نیاز به کدنویسی. فقط تنظیمات را انتخاب کنید و هوش مصنوعی بقیه کار را انجام می‌دهد.
             </motion.p>
          </div>

          <div 
             className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}
          >
             
             {/* Left Column: Interactive Steps List */}
             <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="relative pl-8 lg:pl-0 border-r border-white/5 lg:border-none pr-0 lg:pr-8">
                   {/* Vertical Line for Mobile */}
                   <div className="absolute right-0 top-4 bottom-4 w-px bg-white/10 hidden lg:block" />
                   
                   {STEPS.map((step, idx) => {
                      const isActive = idx === activeStep;
                      return (
                         <div 
                            key={step.id}
                            onClick={() => setActiveStep(idx)}
                            className={`group relative mb-6 last:mb-0 cursor-pointer rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                         >
                            {/* Active Indicator Line (Desktop RTL) */}
                            {isActive && (
                               <motion.div 
                                  layoutId="activeStepLine"
                                  className="absolute right-[-1px] top-4 bottom-4 w-1 bg-luma-yellow rounded-l-full hidden lg:block shadow-[0_0_15px_rgba(255,179,64,0.5)]"
                               />
                            )}

                            {/* Timer Progress Bar (Background for mobile) */}
                            {isActive && !isPaused && (
                               <motion.div 
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-luma-yellow/30 lg:hidden"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 5, ease: "linear" }}
                               />
                            )}

                            <div className="p-5 flex items-center gap-5 relative overflow-hidden rounded-2xl">
                               {/* Progress Fill Background for Desktop */}
                               {isActive && !isPaused && (
                                  <motion.div 
                                     className="absolute inset-0 bg-white/5 origin-right hidden lg:block pointer-events-none"
                                     initial={{ scaleX: 0 }}
                                     animate={{ scaleX: 1 }}
                                     transition={{ duration: 5, ease: "linear" }}
                                  />
                               )}

                               {/* Icon Box */}
                               <div className={`
                                  w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 relative overflow-hidden shrink-0 z-10
                                  ${isActive 
                                     ? 'bg-luma-yellow text-black border-luma-yellow shadow-[0_0_20px_rgba(255,179,64,0.3)]' 
                                     : 'bg-[#111] text-gray-500 border-white/10 group-hover:border-white/30 group-hover:text-gray-300'
                                  }
                               `}>
                                  <step.icon size={22} className="relative z-10" />
                                  {isActive && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                               </div>

                               <div className="flex-1 z-10">
                                  <h3 className={`text-lg font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                     {step.title}
                                  </h3>
                                  <p className={`text-sm transition-colors leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                                     {step.desc}
                                  </p>
                               </div>
                            </div>
                         </div>
                      );
                   })}
                </div>
             </div>

             {/* Right Column: Dynamic Preview Panel */}
             <div className="lg:col-span-7">
                <motion.div 
                   className="sticky top-24 min-h-[500px] rounded-[32px] bg-[#0c0c0e] border border-white/10 p-2 shadow-2xl relative overflow-hidden"
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                >
                   {/* Glass Frame */}
                   <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                   
                   {/* Inner Container */}
                   <div className="h-full bg-[#080808] rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col">
                      
                      {/* Window Controls */}
                      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                {activeStep === 0 ? 'IDENTITY CONFIG' : activeStep === 1 ? 'KNOWLEDGE BASE' : activeStep === 2 ? 'MODEL SELECTION' : 'BEHAVIOR LOGIC'}
                            </span>
                         </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 p-8 relative flex flex-col justify-center">
                         {/* Background Glow based on active step */}
                         <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-20 pointer-events-none transition-colors duration-700
                            ${activeStep === 0 ? 'bg-luma-yellow' : 
                              activeStep === 1 ? 'bg-luma-pink' : 
                              activeStep === 2 ? 'bg-luma-purple' : 'bg-white'
                            }`} 
                         />

                         <AnimatePresence mode="wait">
                            <motion.div
                               key={activeStep}
                               initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                               exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                               transition={{ duration: 0.4 }}
                               className="relative z-10 w-full"
                            >
                               {/* Render the specific component for the step */}
                               {React.createElement(STEPS[activeStep].content)}
                            </motion.div>
                         </AnimatePresence>
                      </div>

                      {/* Footer Info */}
                      <div className="h-12 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-center gap-2">
                         {STEPS.map((_, i) => (
                            <div 
                               key={i} 
                               className={`h-1 rounded-full transition-all duration-300 ${i === activeStep ? 'w-8 bg-white' : 'w-2 bg-white/10'}`} 
                            />
                         ))}
                      </div>
                   </div>
                </motion.div>
             </div>

          </div>
       </div>
    </section>
  );
};
