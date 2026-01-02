
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Palette, Clapperboard } from 'lucide-react';

// Bypass type issues with framer-motion props
const Motion = motion as any;

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
          <Motion.div 
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
                   <span className="text-xs font-bold text-luma-purple tracking-wide">سناریو