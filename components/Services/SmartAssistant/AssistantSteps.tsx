import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FileText, Cpu, Sliders, Upload, Check, Sparkles, Zap, BrainCircuit, Database, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

// --- Premium Component: Step 1 (Identity) ---
const Step1Preview: React.FC = () => (
  <div className="space-y-8 p-4 font-sans text-right" dir="rtl">
    {/* Name Input */}
    <div className="space-y-3">
      <div className="flex justify-between items-center text-right">
        <label className="text-xs text-luma-yellow dark:text-luma-yellow font-bold tracking-wide">نام و هویت دستیار</label>
        <span className="text-[10px] text-zinc-400 dark:text-gray-550 font-mono">۰/۵۰</span>
      </div>
      <div className="bg-zinc-150/50 dark:bg-[#151515] border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group transition-colors hover:border-luma-yellow/30">
        <div className="h-5 w-32 bg-black/5 dark:bg-white/5 rounded-md animate-pulse" />
        <div className="w-10 h-10 rounded-xl bg-luma-yellow/10 flex items-center justify-center border border-luma-yellow/20 shadow-[0_0_15px_rgba(255,179,64,0.1)]">
           <User size={18} className="text-luma-yellow" />
        </div>
      </div>
    </div>

    {/* Tone Selection */}
    <div className="space-y-3">
      <label className="text-xs text-zinc-500 dark:text-gray-450 font-bold block">لحن و شخصیت</label>
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
                        : 'bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-500 dark:text-gray-400 border-black/5 dark:border-white/5 hover:border-black/10 hover:dark:border-white/20 hover:text-zinc-700 hover:dark:text-gray-300'
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
       <div className="flex justify-between text-xs text-zinc-500 dark:text-gray-400">
          <span className="text-luma-yellow font-mono">۷۰٪</span>
          <span>میزان خلاقیت</span>
       </div>
       <div className="h-2 bg-zinc-150 dark:bg-[#1a1a1a] rounded-full overflow-hidden border border-black/5 dark:border-white/5 relative">
          <motion.div 
             className="absolute inset-y-0 right-0 bg-gradient-to-l from-luma-yellow to-luma-pink rounded-full" 
             initial={{ width: 0 }} 
             animate={{ width: '70%' }} 
             transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }} 
          />
          {/* Thumb */}
          <motion.div 
             className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-200 rounded-full shadow-lg z-10"
             initial={{ right: '0%' }}
             animate={{ right: '70%' }}
             transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }} 
          />
       </div>
    </div>
  </div>
);

// --- Premium Component: Step 2 (Knowledge) ---
const Step2Preview: React.FC = () => (
  <div className="h-full flex flex-col p-2 text-right font-sans" dir="rtl">
     {/* Upload Zone */}
     <div className="border-2 border-dashed border-black/15 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 bg-zinc-100/40 dark:bg-[#151515]/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-luma-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-[#222] flex items-center justify-center border border-black/5 dark:border-white/10 shadow-md relative z-10">
           <Upload size={20} className="text-zinc-500 dark:text-gray-400 group-hover:text-luma-pink transition-colors" />
        </div>
        <div className="text-center z-10">
           <span className="text-xs text-zinc-800 dark:text-gray-200 block font-bold">بارگذاری مستندات شرکت</span>
           <span className="text-[10px] text-zinc-500 dark:text-gray-550 block mt-1">PDF, Word, Excel</span>
        </div>
     </div>

     {/* Processing Pipeline Visualization */}
     <div className="flex-1 flex flex-col justify-center py-4 relative">
        {/* Connector Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent -translate-x-1/2" />
        
        <div className="relative z-10 space-y-3">
            {/* Item 1: Processing */}
            <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-luma-pink/20 p-3 rounded-xl flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(255,100,130,0.05)]"
            >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-luma-pink/10 flex items-center justify-center animate-pulse">
                       <BrainCircuit size={16} className="text-luma-pink" />
                   </div>
                   <div className="min-w-[120px]">
                       <div className="text-[10px] text-luma-pink font-bold mb-0.5">در حال استخراج دانش...</div>
                       <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                               className="h-full bg-luma-pink animate-pulse"
                               animate={{ width: ["0%", "100%"] }}
                               transition={{ duration: 2, repeat: Infinity }}
                           />
                       </div>
                   </div>
                </div>
            </motion.div>

            {/* Item 2: Processed */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/5 p-3 rounded-xl flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
            >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/10">
                       <Database size={16} className="text-green-500" />
                   </div>
                   <div>
                       <div className="text-[10px] text-zinc-800 dark:text-gray-300 font-bold">اطلاعات پردازش شده</div>
                       <div className="text-[9px] text-zinc-500 dark:text-gray-550 mt-0.5">آماده برای پاسخگویی</div>
                   </div>
                </div>
                <Check size={14} className="text-green-500" />
            </motion.div>
        </div>
     </div>
  </div>
);

// --- Premium Component: Step 3 (Brain) ---
const Step3Preview: React.FC = () => (
  <div className="space-y-4 p-2 text-right font-sans" dir="rtl">
     {[
        { id: 'pro', name: 'هوش مصنوعی پیشرفته', desc: 'مناسب برای تحلیل‌های عمیق و منطقی', speed: 85, active: true },
        { id: 'fast', name: 'هوش مصنوعی سریع', desc: 'پاسخ‌دهی آنی برای مکالمات ساده', speed: 100, active: false },
        { id: 'creative', name: 'هوش مصنوعی خلاق', desc: 'ایده‌پردازی و تولید محتوای متنی', speed: 90, active: false },
     ].map((model) => (
        <motion.div 
           key={model.id}
           className={`
              p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-500
              ${model.active 
                 ? 'bg-purple-50/40 dark:bg-[#15101a] border-luma-purple/40 dark:border-luma-purple/50 shadow-md dark:shadow-[0_0_20px_-5px_rgba(218,143,255,0.3)] relative overflow-hidden' 
                 : 'bg-transparent border-black/5 dark:border-white/5 opacity-50 hover:opacity-80'
              }
           `}
           whileHover={{ scale: 1.01 }}
        >
           {model.active && <div className="absolute inset-0 bg-gradient-to-r from-luma-purple/5 to-transparent pointer-events-none" />}
           
           <div className="flex items-center gap-4 relative z-10 w-full justify-between">
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${model.active ? 'bg-luma-purple text-black border-luma-purple' : 'bg-zinc-100 dark:bg-[#111] text-zinc-500 dark:text-gray-500 border-black/10 dark:border-white/10'}`}>
                    <Cpu size={20} />
                 </div>
                 <div className="text-right">
                    <div className="flex items-center gap-2 justify-start">
                       <h4 className={`text-sm font-bold ${model.active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400'}`}>{model.name}</h4>
                       {model.active && <span className="text-[9px] bg-luma-purple/20 text-luma-purple border border-luma-purple/20 px-1.5 py-0.5 rounded font-bold">انتخاب شده</span>}
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1">{model.desc}</p>
                 </div>
              </div>
           </div>
        </motion.div>
     ))}
  </div>
);

// --- Premium Component: Step 4 (Behavior) ---
const Step4Preview: React.FC = () => (
  <div className="h-full flex flex-col relative p-2 text-right font-sans" dir="rtl">
     {/* Logic Config */}
     <div className="space-y-3 text-[10px] opacity-90 mb-4">
        <div className="flex items-center gap-2 text-zinc-800 dark:text-gray-400 font-bold mb-2 justify-start">
            <Sliders size={12} />
            <span>تنظیمات رفتاری</span>
        </div>
        
        {/* Do's */}
        <div className="bg-white dark:bg-[#151515] border-r-2 border-luma-purple p-2.5 rounded-l-xl flex gap-3 items-start border border-black/5 dark:border-white/5 shadow-sm">
           <ShieldCheck size={14} className="text-luma-purple shrink-0 mt-0.5" />
           <div className="text-right">
              <span className="text-luma-purple font-bold block mb-1">بایدها (الزامات):</span>
              <p className="text-zinc-600 dark:text-gray-400 leading-relaxed text-[9px]">
                 - پاسخ‌ها کوتاه و صمیمی باشد.<br/>
                 - از ایموجی‌های مرتبط استفاده شود.
              </p>
           </div>
        </div>

        {/* Don'ts */}
        <div className="bg-white dark:bg-[#151515] border-r-2 border-luma-pink p-2.5 rounded-l-xl flex gap-3 items-start border border-black/5 dark:border-white/5 shadow-sm">
           <ShieldAlert size={14} className="text-luma-pink shrink-0 mt-0.5" />
           <div className="text-right">
              <span className="text-luma-pink font-bold block mb-1">نبایدها (خط قرمزها):</span>
              <p className="text-zinc-600 dark:text-gray-400 leading-relaxed text-[9px]">
                 - اطلاعات شخصی کاربر پرسیده نشود.<br/>
                 - در مورد رقبا صحبت نشود.
              </p>
           </div>
        </div>
     </div>
     
     {/* Simulation Chat Bubble */}
     <motion.div 
        className="mt-auto bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 p-4 rounded-2xl rounded-tr-sm shadow-lg dark:shadow-2xl relative z-20 text-right"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
     >
        <div className="flex items-center gap-2 mb-2 border-b border-black/5 dark:border-white/5 pb-2 justify-start">
           <Sparkles size={12} className="text-luma-yellow" />
           <span className="text-[10px] text-luma-yellow font-bold">پیش‌نمایش خروجی</span>
        </div>
        <p className="text-xs text-zinc-850 dark:text-white leading-relaxed dir-rtl text-right">
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

export const AssistantSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [activeStep]); // Reset timer whenever activeStep changes (e.g. user click)

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
       
       {/* --- Ambient Background Ambience --- */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
             animate={{ 
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.1, 0.15, 0.1]
             }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-luma-yellow/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
          />
          <motion.div 
             animate={{ 
                x: [0, -50, 50, 0],
                y: [0, 40, -40, 0],
                scale: [1, 0.9, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
             }}
             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-luma-purple/15 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
          />
       </div>

       <div className="max-w-screen-xl mx-auto px-6 relative z-10 w-full">
          
          {/* Header */}
          <div className="text-center mb-20 font-sans">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] font-bold text-zinc-650 dark:text-gray-400 mb-6 uppercase tracking-widest backdrop-blur-md"
             >
                <Zap size={12} className="text-luma-yellow" />
                <span>فرآیند راه‌اندازی آسان</span>
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
             >
                خلق دستیار در <span className="text-gradient-animated pb-1 inline-block">۴ گام ساده</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-zinc-550 dark:text-gray-400 font-light text-lg max-w-2xl mx-auto leading-relaxed"
             >
                بدون نیاز به کدنویسی. فقط تنظیمات را انتخاب کنید و هوش مصنوعی لوم بقیه کار را برای شما انجام می‌دهد.
             </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
             
             {/* Left Column: Interactive Steps List */}
             <div className="lg:col-span-5 flex flex-col justify-center font-sans">
                <div className="relative pl-8 lg:pl-0 pr-0 lg:pr-8">
                   {/* Vertical Line */}
                   <div className="absolute right-0 top-4 bottom-4 w-px bg-black/5 dark:bg-white/10 hidden lg:block" />
                   
                   {STEPS.map((step, idx) => {
                      const isActive = idx === activeStep;
                      return (
                         <div 
                            key={step.id}
                            onClick={() => setActiveStep(idx)}
                            className={`group relative mb-6 last:mb-0 cursor-pointer rounded-2xl transition-all duration-300 ${isActive ? 'bg-black/[0.02] dark:bg-white/5' : 'hover:bg-black/[0.01] hover:dark:bg-white/[0.02]'}`}
                         >
                            {/* Active Indicator Line (Desktop RTL) */}
                            {isActive && (
                               <motion.div 
                                  layoutId="activeStepLine"
                                  className="absolute right-[-1px] top-4 bottom-4 w-1 bg-luma-yellow rounded-l-full hidden lg:block shadow-[0_0_15px_rgba(255,179,64,0.5)]"
                               />
                            )}

                            {/* Timer Progress Bar (Background for mobile) */}
                            {isActive && (
                               <motion.div 
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-luma-yellow/30 lg:hidden"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 5, ease: "linear" }}
                                />
                            )}

                            <div className="p-5 flex items-center justify-between gap-5 relative overflow-hidden rounded-2xl w-full">
                               {/* Progress Fill Background for Desktop */}
                               {isActive && (
                                  <motion.div 
                                     className="absolute inset-0 bg-black/[0.01] dark:bg-white/[0.01] origin-right hidden lg:block pointer-events-none"
                                     initial={{ scaleX: 0 }}
                                     animate={{ scaleX: 1 }}
                                     transition={{ duration: 5, ease: "linear" }}
                                  />
                               )}

                               <div className="flex items-center gap-5 relative z-10 w-full text-right" dir="rtl">
                                  {/* Icon Box */}
                                  <div className={`
                                     w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 relative overflow-hidden shrink-0
                                     ${isActive 
                                        ? 'bg-luma-yellow text-black border-luma-yellow shadow-[0_0_20px_rgba(255,179,64,0.3)]' 
                                        : 'bg-zinc-100 dark:bg-[#111] text-zinc-500 dark:text-gray-500 border-black/5 dark:border-white/10 group-hover:border-black/10 group-hover:dark:border-white/30 group-hover:text-zinc-700 group-hover:dark:text-gray-300'
                                     }
                                  `}>
                                     <step.icon size={22} className="relative z-10" />
                                     {isActive && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                                  </div>

                                  <div className="flex-1">
                                     <h3 className={`text-lg font-bold mb-1 transition-colors ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 group-hover:text-zinc-700 group-hover:dark:text-gray-200'}`}>
                                        {step.title}
                                     </h3>
                                     <p className={`text-sm transition-colors leading-relaxed ${isActive ? 'text-zinc-650 dark:text-gray-300' : 'text-zinc-400 dark:text-gray-600'}`}>
                                        {step.desc}
                                     </p>
                                  </div>
                               </div>
                            </div>
                         </div>
                      );
                   })}
                </div>
             </div>

             {/* Right Column: Dynamic Preview Panel */}
             <div className="lg:col-span-7 font-sans">
                <motion.div 
                   className="sticky top-24 min-h-[500px] rounded-[32px] bg-zinc-50 dark:bg-[#0c0c0e] border border-black/10 dark:border-white/10 p-2 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors"
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                >
                   {/* Inner Container */}
                   <div className="h-full bg-zinc-100/50 dark:bg-[#080808] rounded-[24px] border border-black/5 dark:border-white/5 relative overflow-hidden flex flex-col min-h-[480px]">
                      
                      {/* Window Controls */}
                      <div className="h-14 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-6 bg-black/[0.01] dark:bg-white/[0.02]">
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-400 dark:text-gray-500 uppercase tracking-widest font-mono">
                                {activeStep === 0 ? 'IDENTITY CONFIG' : activeStep === 1 ? 'KNOWLEDGE BASE' : activeStep === 2 ? 'MODEL SELECTION' : 'BEHAVIOR LOGIC'}
                            </span>
                         </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 p-8 relative flex flex-col justify-center">
                         {/* Background Glow based on active step */}
                         <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-10 pointer-events-none transition-colors duration-700
                            ${activeStep === 0 ? 'bg-luma-yellow' : 
                              activeStep === 1 ? 'bg-luma-pink' : 
                              activeStep === 2 ? 'bg-luma-purple' : 'bg-gray-400'
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
                      <div className="h-12 border-t border-black/5 dark:border-white/5 bg-zinc-100/80 dark:bg-[#0a0a0a] flex items-center justify-center gap-2">
                         {STEPS.map((_, i) => (
                            <div 
                               key={i} 
                               className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? 'w-8 bg-zinc-800 dark:bg-white' : 'w-2 bg-black/10 dark:bg-white/10'}`} 
                            />
                         ))}
                      </div>
                   </div>
                </motion.div>
             </div>

          </div>
       </div>

       {/* --- Bottom Gradient Fade --- */}
       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
