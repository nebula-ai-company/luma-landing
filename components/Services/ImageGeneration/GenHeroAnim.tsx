import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Sparkles, Wand2, Palette, Zap, Image as ImageIcon, 
  CheckCircle2, Cpu, ChevronDown 
} from 'lucide-react';

import { useTheme } from '../../../lib/ThemeContext';

// Animation Stages
type Stage = 'idle' | 'typing' | 'configuring' | 'generating' | 'result';

// Define multiple scenarios for the loop with rich fallback images
const DEFAULT_SCENARIOS = [
  {
    id: 1,
    prompt: "یک گربه فضانورد که روی ماه نشسته و زمین در پس‌زمینه دیده می‌شود...",
    model: "FLUX 2 MAX",
    style: "سینمایی", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    cost: "135",
    status: "آماده"
  },
  {
    id: 2,
    prompt: "نمایی از شهر تهران در سال ۲۱۰۰ با برج‌های نئونی و ماشین‌های پرنده...",
    model: "IDEOGRAM 3",
    style: "سایبرپانک", 
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80",
    cost: "150",
    status: "آماده"
  },
  {
    id: 3,
    prompt: "پرتره هنری از یک زن با لباس‌های سنتی و نورپردازی گرم و طبیعی...",
    model: "RECRAFT 4.1 PRO",
    style: "پرتره", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    cost: "120",
    status: "آماده"
  },
  {
    id: 4,
    prompt: "طراحی ایزومتریک و سه بعدی از یک اتاق کار دنج با گیاهان آپارتمانی...",
    model: "NANO BANANA PRO",
    style: "سه بعدی", 
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    cost: "45",
    status: "آماده"
  },
  {
    id: 5,
    prompt: "نقاشی آبرنگ از منظره کوهستان در غروب آفتاب با رنگ‌های ملایم...",
    model: "FLUX 2 PRO",
    style: "آبرنگ", 
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    cost: "110",
    status: "آماده"
  }
];

export const GenHeroAnim: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-50px" });

  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stage, setStage] = useState<Stage>('idle');
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0);

  const currentScenario = scenarios[scenarioIdx] || DEFAULT_SCENARIOS[0];

  // Fetch real image generation records from PocketBase
  useEffect(() => {
    let mounted = true;
    const fetchRealAssets = async () => {
      try {
        const response = await fetch('https://pb.lumai.ir/api/collections/image_generation/records?page=1&perPage=5&sort=-created');
        if (response.ok) {
          const result = await response.json();
          if (result.items && Array.isArray(result.items) && result.items.length > 0) {
            const validItems = result.items.filter((item: any) => item.result);
            if (validItems.length > 0) {
              const mapped = validItems.map((item: any) => ({
                id: item.id,
                prompt: item.prompt || "ساخته شده توسط هوش مصنوعی لوما",
                model: item.model || "FLUX 2 PRO",
                style: "تصویر اختصاصی",
                image: `https://pb.lumai.ir/api/files/image_generation/${item.id}/${item.result}`,
                cost: String(item.cost || 60),
                status: "آماده"
              }));
              if (mounted) {
                setScenarios(mapped);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch image-generation records in anim:", err);
      }
    };
    fetchRealAssets();
    return () => { mounted = false; };
  }, []);

  // Animation Sequence Loop - Pauses when offscreen
  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    let typeInterval: ReturnType<typeof setInterval>;
    let progressInterval: ReturnType<typeof setInterval>;

    const runSequence = () => {
      // Reset State
      setStage('idle');
      setTypedText("");
      setProgress(0);

      // 1. Start Typing Prompt
      timeout = setTimeout(() => {
        setStage('typing');
        let charIdx = 0;
        const textToType = currentScenario.prompt;
        
        typeInterval = setInterval(() => {
          if (charIdx <= textToType.length) {
            setTypedText(textToType.slice(0, charIdx));
            charIdx++;
          } else {
            clearInterval(typeInterval);
            
            // 2. Configuring (Simulate user checking settings)
            timeout = setTimeout(() => {
                setStage('configuring');
                
                // 3. Generating
                timeout = setTimeout(() => {
                    setStage('generating');
                    let p = 0;
                    progressInterval = setInterval(() => {
                        p += 2.5; // Speed of progress bar
                        setProgress(p);
                        if (p >= 100) {
                            clearInterval(progressInterval);
                            // 4. Result
                            setStage('result');
                            
                            // 5. Hold Result then Switch Scenario
                            timeout = setTimeout(() => {
                                setScenarioIdx((prev) => (prev + 1) % scenarios.length);
                            }, 4500); 
                        }
                    }, 30); 
                }, 1200); // Wait time in configuring state
            }, 700); // Wait time after typing finishes
          }
        }, 35); // Typing speed
      }, 800); // Initial delay
    };

    runSequence();

    return () => {
      clearTimeout(timeout);
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, [scenarioIdx, isInView, scenarios.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] md:min-h-[700px] bg-white dark:bg-[#0c0c0e] text-zinc-900 dark:text-white rounded-[24px] md:rounded-[32px] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans select-none transition-colors duration-300" dir="rtl">
      
      {/* --- UI Header --- */}
      <div className="h-14 border-b border-black/[0.06] dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between px-4 md:px-6 shrink-0 z-20 transition-colors duration-300">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-luma-pink/20 to-luma-purple/20 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <Wand2 size={16} className="text-zinc-800 dark:text-white" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-zinc-650 dark:text-gray-300 tracking-wide uppercase">استودیو ساخت تصویر لوما</span>
         </div>
         {/* Window Controls (Left in RTL) */}
         <div className="flex gap-2 flex-row-reverse">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
         </div>
      </div>

      {/* --- Main Workflow Area --- */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 relative z-10">
         
         {/* 1. Configuration Bar (Model & Style) */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Model Selector */}
            <motion.div 
               animate={{ 
                  borderColor: stage === 'configuring' ? "rgba(255,179,64,0.5)" : (theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
                  backgroundColor: stage === 'configuring' ? "rgba(255,179,64,0.05)" : (theme === 'dark' ? "#151515" : "#f4f4f7")
               }}
               className="w-full h-14 bg-zinc-100 dark:bg-[#151515] rounded-2xl border border-black/5 dark:border-white/10 flex items-center px-4 justify-between transition-colors duration-300"
            >
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                     <Cpu size={16} className="text-zinc-500 dark:text-gray-400" />
                  </div>
                  <div className="flex flex-col text-right overflow-hidden">
                     <span className="text-[9px] text-zinc-500 dark:text-gray-500 uppercase font-bold">مدل</span>
                     <span className="text-xs font-bold text-zinc-800 dark:text-gray-200 dir-ltr truncate">{currentScenario.model}</span>
                  </div>
               </div>
               <ChevronDown size={14} className="text-zinc-500 dark:text-gray-500 shrink-0" />
            </motion.div>

            {/* Style Selector */}
            <motion.div 
               animate={{ 
                  borderColor: stage === 'configuring' ? "rgba(218,143,255,0.5)" : (theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
                  backgroundColor: stage === 'configuring' ? "rgba(218,143,255,0.05)" : (theme === 'dark' ? "#151515" : "#f4f4f7")
               }}
               className="w-full h-14 bg-zinc-100 dark:bg-[#151515] rounded-2xl border border-black/5 dark:border-white/10 flex items-center px-4 justify-between transition-colors duration-300"
            >
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                     <Palette size={16} className="text-zinc-500 dark:text-gray-400" />
                  </div>
                  <div className="flex flex-col text-right overflow-hidden">
                     <span className="text-[9px] text-zinc-500 dark:text-gray-500 uppercase font-bold">استایل</span>
                     <span className="text-xs font-bold text-zinc-800 dark:text-gray-200 truncate">{currentScenario.style}</span>
                  </div>
               </div>
               <ChevronDown size={14} className="text-zinc-500 dark:text-gray-500 shrink-0" />
            </motion.div>
         </div>

         {/* 2. Prompt Input Area */}
         <div className="relative">
            <motion.div 
               animate={{ 
                  borderColor: stage === 'typing' ? "rgba(255,100,130,0.5)" : (theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
                  backgroundColor: theme === 'dark' ? "#151515" : "#f4f4f7",
                  boxShadow: stage === 'typing' ? "0 0 20px rgba(255,100,130,0.1)" : "none"
               }}
               className="w-full h-32 md:h-36 bg-zinc-100 dark:bg-[#151515] rounded-3xl border border-black/5 dark:border-white/10 p-4 md:p-5 relative flex flex-col transition-colors duration-300"
            >
               <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-gray-500 uppercase tracking-wider">متن ورودی</span>
                  {/* Prompt Enhancer Switch */}
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-zinc-550 dark:text-gray-500 hidden sm:inline">بهینه‌ساز</span>
                     <div className="w-8 h-4.5 md:w-9 md:h-5 bg-luma-purple/20 rounded-full border border-luma-purple/30 relative">
                        <div className="absolute left-0.5 top-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-luma-purple rounded-full shadow-sm" />
                     </div>
                  </div>
               </div>
               
               <p className="text-sm md:text-base text-zinc-805 dark:text-gray-200 dir-rtl text-right leading-relaxed font-light flex-1 overflow-hidden">
                  {typedText}
                  {stage === 'typing' && <span className="inline-block w-0.5 h-5 bg-luma-pink mr-0.5 align-middle animate-pulse"/>}
                  {typedText === "" && stage === 'idle' && <span className="text-zinc-400 dark:text-gray-600">در حال آماده‌سازی برای نوشتن...</span>}
               </p>
            </motion.div>
         </div>

         {/* 3. Result Canvas / Generation State */}
         <div className="flex-1 relative bg-zinc-100 dark:bg-[#080808] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 group min-h-[250px] md:min-h-[300px] transition-colors duration-300">
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
             
             {/* A. Generation State */}
             <AnimatePresence>
                {stage === 'generating' && (
                    <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                       <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-6 md:mb-8">
                           <motion.div 
                              className="absolute inset-0 rounded-full border-t-2 border-luma-pink"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                           />
                           <motion.div 
                              className="absolute inset-3 rounded-full border-r-2 border-luma-purple"
                              animate={{ rotate: -360 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                           />
                           <Sparkles className="text-white animate-pulse w-6 h-6 md:w-8 md:h-8" />
                       </div>
                       <div className="w-48 md:w-72 h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                              className="h-full bg-gradient-to-r from-luma-purple to-luma-pink"
                              style={{ width: `${progress}%` }}
                           />
                       </div>
                       <span className="text-[10px] md:text-xs font-mono text-gray-400 mt-4 tracking-widest uppercase dir-ltr">
                          در حال ساخت: {Math.round(progress)}٪
                       </span>
                    </motion.div>
                )}
             </AnimatePresence>

             {/* B. Result State */}
             <AnimatePresence>
                {stage === 'result' && (
                    <motion.div 
                       key={currentScenario.id}
                       className="absolute inset-0 z-10"
                       initial={{ opacity: 0, scale: 1.1 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                       {currentScenario.image ? (
                          <img 
                             src={currentScenario.image} 
                             alt="Generated Result" 
                             className="w-full h-full object-cover"
                             referrerPolicy="no-referrer"
                          />
                       ) : (
                          <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                       )}
                       
                       {/* Flash */}
                       <motion.div 
                          className="absolute inset-0 bg-white"
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                       />

                       {/* Success Badge */}
                       <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-4 left-4 md:top-6 md:right-6 md:left-auto bg-black/70 backdrop-blur border border-green-500/30 text-green-400 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-[10px] md:text-xs font-bold shadow-lg"
                       >
                          <CheckCircle2 size={14} />
                          <span>ساخت تصویر تکمیل شد</span>
                       </motion.div>
                    </motion.div>
                )}
             </AnimatePresence>

             {/* C. Empty State */}
             {(stage === 'idle' || stage === 'typing' || stage === 'configuring') && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5">
                          <ImageIcon size={32} className="text-zinc-500 dark:text-gray-500" />
                       </div>
                       <span className="text-xs font-mono text-zinc-650 dark:text-gray-600">محل نمایش تصویر</span>
                    </div>
                </div>
             )}
         </div>

         {/* 4. Action Bar (Optimized for Mobile) */}
         <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-2 gap-4 sm:gap-0">
             <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
                <div className="flex-1 sm:flex-none text-center px-3 py-2 sm:py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/5 text-[10px] text-zinc-500 dark:text-gray-400 font-mono transition-colors">
                   هزینه: <span className="text-zinc-800 dark:text-white font-bold mx-1">{currentScenario.cost}</span> لوم
                </div>
                <div className="flex-1 sm:flex-none text-center px-3 py-2 sm:py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/5 text-[10px] text-zinc-500 dark:text-gray-400 font-mono transition-colors">
                   وضعیت: <span className="text-zinc-800 dark:text-white font-bold mx-1">{currentScenario.status || "آماده"}</span>
                </div>
             </div>
             
             <motion.button 
                animate={{ 
                   scale: stage === 'generating' ? 0.95 : 1,
                   opacity: stage === 'generating' ? 0.8 : 1
                }}
                className={`
                   w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold transition-all shadow-lg
                   ${stage === 'generating' ? 'bg-zinc-200 dark:bg-gray-800 text-zinc-500 dark:text-gray-400 cursor-wait' : 'bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-200 hover:scale-105 active:scale-95'}
                `}
             >
                {stage === 'generating' ? (
                   <span>در حال ساخت...</span>
                ) : (
                   <>
                      <Zap size={18} className="fill-current" />
                      <span>شروع پردازش</span>
                   </>
                )}
             </motion.button>
         </div>

      </div>
    </div>
  );
};
