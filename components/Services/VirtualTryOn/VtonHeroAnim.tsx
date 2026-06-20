
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, ScanFace, Wand2, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

// Fallback data in case API fails
const FALLBACK_SCENARIOS = [
  {
    id: 'fallback-1',
    inputImg: "", 
    outputImg: "", 
    configs: [
        { label: "جنسیت: زن", color: "bg-luma-pink" },
        { label: "استایل: اسپرت", color: "bg-luma-yellow" },
        { label: "ژست: فشن", color: "bg-luma-purple" }
    ],
    tag: "ست ورزشی",
    match: "۱۰۰٪ تطابق بافت"
  }
];

export const VtonHeroAnim = () => {
  const [scenarios, setScenarios] = useState<any[]>(FALLBACK_SCENARIOS);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0); 
  const [loading, setLoading] = useState(true);

  // 0: Flat Lay Input (Garment)
  // 1: Scanning & Wireframe
  // 2: Model Configuration
  // 3: Final Result (Model Wearing Garment)

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch('https://pb.lumai.ir/api/collections/virtual_tryon/records?page=1&perPage=5&sort=-created');
        if (response.ok) {
          const result = await response.json();
          if (result.items && Array.isArray(result.items) && result.items.length > 0) {
            const mappedScenarios = result.items.map((item: any) => ({
                id: item.id,
                inputImg: item.clothing ? `https://pb.lumai.ir/api/files/virtual_tryon/${item.id}/${item.clothing}` : "", 
                outputImg: `https://pb.lumai.ir/api/files/virtual_tryon/${item.id}/${item.result}`,
                configs: [
                    { label: "مدل: هوشمند", color: "bg-luma-pink" },
                    { label: item.model_used ? `مدل: ${item.model_used}` : "استایل: مدرن", color: "bg-luma-yellow" },
                    { label: "کیفیت: 4K", color: "bg-luma-purple" }
                ],
                tag: item.title || "لباس",
                match: "تطابق هوشمند"
            }));
            
            if (isMounted) {
                setScenarios(mappedScenarios);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch VTON assets", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, []);

  const currentScenario = scenarios[scenarioIndex];

  // Animation Cycle
  useEffect(() => {
    if (loading) return;

    let mounted = true;
    const cycle = async () => {
      while(mounted) {
        // Step 0: Input View
        setStep(0);
        await new Promise(r => setTimeout(r, 2500)); 
        if(!mounted) break;
        
        // Step 1: Scanning
        setStep(1);
        await new Promise(r => setTimeout(r, 2000));
        if(!mounted) break;
        
        // Step 2: Processing
        setStep(2);
        await new Promise(r => setTimeout(r, 2000));
        if(!mounted) break;
        
        // Step 3: Result
        setStep(3);
        await new Promise(r => setTimeout(r, 5000));
        if(!mounted) break;

        // Switch Scenario
        setScenarioIndex(prev => (prev + 1) % scenarios.length);
      }
    };
    cycle();
    return () => { mounted = false; };
  }, [loading, scenarios.length]);

  if (loading) {
      return (
          <div className="relative w-full h-full bg-zinc-50 dark:bg-[#0c0c0e] rounded-[32px] border border-zinc-200 dark:border-white/10 flex items-center justify-center min-h-[400px] transition-colors duration-300">
              <Loader2 className="animate-spin text-luma-yellow" size={32} />
          </div>
      );
  }

  return (
    <div className="relative w-full h-full bg-white dark:bg-[#0c0c0e] rounded-[32px] border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden flex flex-col font-sans select-none transition-colors duration-300" dir="rtl">
      
      {/* --- UI Header --- */}
      <div className="h-14 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20 transition-colors duration-300">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-luma-yellow/20 to-luma-pink/20 border border-zinc-200/50 dark:border-white/10 flex items-center justify-center">
                <Shirt size={16} className="text-luma-yellow" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-700 dark:text-gray-300 tracking-wide uppercase">اتاق پرو هوشمند</span>
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
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
         
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

         {/* Center Frame */}
         <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-white dark:bg-[#0a0a0a] transition-all duration-300">
            
            {/* STAGE 0: INPUT (Garment Only) */}
            <AnimatePresence mode="wait">
                {(step === 0 || step === 1) && (
                    <motion.div 
                        key={`input-${currentScenario.id}`}
                        className="absolute inset-0 bg-zinc-100 dark:bg-[#151515] flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {currentScenario.inputImg ? (
                            <img 
                                src={currentScenario.inputImg} 
                                alt="Garment Input" 
                                className="w-full h-full object-contain drop-shadow-2xl animate-pulse-slow"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-xl" />
                        )}
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-2 shadow-lg">
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
                        key={`config-${currentScenario.id}`}
                        className="absolute inset-0 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 gap-4 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="text-center mb-2">
                            <Sparkles className="w-8 h-8 text-luma-pink mx-auto mb-2 animate-bounce" />
                            <h4 className="text-zinc-900 dark:text-white font-bold">تنظیم بر تن مانکن</h4>
                        </div>
                        
                        <div className="w-full space-y-2">
                            {currentScenario.configs.map((item: any, i: number) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center justify-between bg-zinc-100 dark:bg-white/10 p-2 rounded-lg border border-zinc-200 dark:border-white/5"
                                >
                                    <span className="text-xs text-zinc-700 dark:text-gray-300">{item.label}</span>
                                    <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_15px_currentColor]`} />
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-2 w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-full overflow-hidden">
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
                        key={`output-${currentScenario.id}`}
                        className="absolute inset-0 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {currentScenario.outputImg ? (
                            <img 
                                src={currentScenario.outputImg} 
                                alt="Final Result" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                        )}
                        
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
      <div className="h-16 bg-zinc-50 dark:bg-[#0c0c0e] border-t border-zinc-200 dark:border-white/5 flex items-center justify-between px-6 z-20 transition-colors duration-300">
         <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-bold uppercase tracking-wider">مدل هوش مصنوعی</span>
            <div className="flex items-center gap-1.5">
                <Wand2 size={12} className="text-luma-pink" />
                <span className="text-sm font-bold text-zinc-800 dark:text-white dir-ltr">Nano Banana Pro</span>
            </div>
         </div>

         <div className="h-9 px-4 rounded-lg bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-xs text-zinc-650 dark:text-gray-400 font-bold min-w-[140px] transition-colors duration-300">
            {step === 0 && "دریافت تصویر لباس..."}
            {step === 1 && "تحلیل بافت و فرم..."}
            {step === 2 && "اعمال روی مانکن..."}
            {step === 3 && "پرو مجازی تکمیل شد"}
         </div>
      </div>
    </div>
  );
};
