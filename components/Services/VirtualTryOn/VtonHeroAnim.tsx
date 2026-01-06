
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, ScanFace, Wand2, CheckCircle2, Sparkles } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    // Sporty / Hoodie
    inputImg: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop", 
    outputImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", 
    configs: [
        { label: "جنسیت: زن", color: "bg-luma-pink" },
        { label: "استایل: اسپرت", color: "bg-luma-yellow" },
        { label: "ژست: فشن خیابانی", color: "bg-luma-purple" }
    ],
    tag: "ست ورزشی",
    match: "۱۰۰٪ تطابق بافت"
  },
  {
    id: 2,
    // Formal / Coat
    inputImg: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop", 
    outputImg: "https://images.unsplash.com/photo-1548062973-2c069eb8b4c7?q=80&w=600&auto=format&fit=crop", 
    configs: [
        { label: "جنسیت: زن", color: "bg-luma-pink" },
        { label: "پوشش: کت و شلوار", color: "bg-luma-purple" },
        { label: "ژست: رسمی", color: "bg-luma-yellow" }
    ],
    tag: "پوشش رسمی",
    match: "۹۸٪ دقت سایز"
  },
  {
    id: 3,
    // Texture / Scarf (Simulated)
    inputImg: "https://images.unsplash.com/photo-1606132759902-1779ba072b22?q=80&w=600&auto=format&fit=crop", 
    outputImg: "https://images.unsplash.com/photo-1628035231993-4e3832047806?q=80&w=600&auto=format&fit=crop", 
    configs: [
        { label: "مدل: رئال", color: "bg-luma-pink" },
        { label: "حجاب: مینی اسکارف", color: "bg-luma-yellow" },
        { label: "بافت: ابریشم", color: "bg-luma-purple" }
    ],
    tag: "شال و روسری",
    match: "نورپردازی طبیعی"
  }
];

export const VtonHeroAnim = () => {
  const [step, setStep] = useState(0); 
  const [scenarioIndex, setScenarioIndex] = useState(0);
  // 0: Flat Lay Input
  // 1: Scanning & Wireframe
  // 2: Model Configuration
  // 3: Final Result

  const currentScenario = SCENARIOS[scenarioIndex];

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while(mounted) {
        setStep(0);
        await new Promise(r => setTimeout(r, 2500)); // View Input
        if(!mounted) break;
        
        setStep(1);
        await new Promise(r => setTimeout(r, 2000)); // Scan
        if(!mounted) break;
        
        setStep(2);
        await new Promise(r => setTimeout(r, 2000)); // Config
        if(!mounted) break;
        
        setStep(3);
        await new Promise(r => setTimeout(r, 5000)); // Result
        if(!mounted) break;

        // Switch Scenario
        setScenarioIndex(prev => (prev + 1) % SCENARIOS.length);
      }
    };
    cycle();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0c0c0e] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans select-none" dir="rtl">
      
      {/* --- UI Header --- */}
      <div className="h-14 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-luma-yellow/20 to-luma-pink/20 border border-white/10 flex items-center justify-center">
                <Shirt size={16} className="text-luma-yellow" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-300 tracking-wide uppercase">اتاق پرو هوشمند</span>
                <span className="text-[9px] text-luma-pink dir-ltr text-right">Nano Banana Pro</span>
            </div>
         </div>
         <div className="flex gap-2 items-center">
            {step === 3 && (
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="px-2 py-1 bg-luma-yellow/10 border border-luma-yellow/20 text-luma-yellow text-[9px] rounded font-bold flex items-center gap-1"
                >
                    <CheckCircle2 size={10} />
                    <span>تکمیل شد</span>
                </motion.div>
            )}
         </div>
      </div>

      {/* --- Main Workflow Area --- */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#050505]">
         
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

         {/* Center Frame */}
         <div className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
            
            {/* STAGE 0: INPUT (Flat Lay) */}
            <AnimatePresence mode="wait">
                {(step === 0 || step === 1) && (
                    <motion.div 
                        key={`input-${scenarioIndex}`}
                        className="absolute inset-0 bg-[#e5e5e5] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img 
                            src={currentScenario.inputImg} 
                            alt="Flat Lay Shirt" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                            <span>تصویر لباس</span>
                            <span className="text-[9px] text-gray-400 bg-white/10 px-1.5 rounded">{currentScenario.tag}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STAGE 1: SCANNING (Wireframe Overlay) */}
            <AnimatePresence>
                {step === 1 && (
                    <motion.div 
                        className="absolute inset-0 z-10 bg-luma-yellow/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="absolute top-0 left-0 right-0 h-1 bg-luma-yellow shadow-[0_0_20px_#FFB340]"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{ duration: 2, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ScanFace size={48} className="text-luma-yellow animate-pulse" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STAGE 2: CONFIGURATION (UI Overlay) */}
            <AnimatePresence>
                {step === 2 && (
                    <motion.div 
                        key={`config-${scenarioIndex}`}
                        className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="text-center mb-2">
                            <Sparkles className="w-8 h-8 text-luma-pink mx-auto mb-2 animate-bounce" />
                            <h4 className="text-white font-bold">تنظیم مانکن</h4>
                        </div>
                        
                        <div className="w-full space-y-2">
                            {currentScenario.configs.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center justify-between bg-white/10 p-2 rounded-lg border border-white/5"
                                >
                                    <span className="text-xs text-gray-300">{item.label}</span>
                                    <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} />
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-luma-pink to-luma-yellow"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STAGE 3: RESULT (Model Wearing Item) */}
            <AnimatePresence>
                {step === 3 && (
                    <motion.div 
                        key={`output-${scenarioIndex}`}
                        className="absolute inset-0 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src={currentScenario.outputImg} 
                            alt="Final Model" 
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Flash Effect */}
                        <motion.div 
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Floating Tags */}
                        <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-4 left-4 flex flex-col gap-1"
                        >
                            <span className="bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold">
                                Nano Banana Pro
                            </span>
                            <span className="bg-luma-yellow/20 border border-luma-yellow/30 px-2 py-1 rounded text-[10px] text-luma-yellow font-bold">
                                {currentScenario.match}
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

         </div>
      </div>

      {/* --- Footer Controls --- */}
      <div className="h-16 bg-[#0c0c0e] border-t border-white/5 flex items-center justify-between px-6 z-20">
         <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">مدل هوش مصنوعی</span>
            <div className="flex items-center gap-1.5">
                <Wand2 size={12} className="text-luma-pink" />
                <span className="text-sm font-bold text-white dir-ltr">Nano Banana Pro</span>
            </div>
         </div>

         {/* Changed from font-mono to font-bold to support Farsi properly */}
         <div className="h-9 px-4 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-xs text-gray-400 font-bold">
            {step === 0 && "منتظر تصویر ورودی..."}
            {step === 1 && "تحلیل بافت و مش..."}
            {step === 2 && "اعمال تنظیمات..."}
            {step === 3 && "رندر تکمیل شد"}
         </div>
      </div>
    </div>
  );
};
