import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, ChevronDown, Sparkles, RefreshCw, Zap, CheckCircle2, 
  Settings2, FileImage, ScanLine, Sliders, Maximize2, MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

// Real models list provided by user
const EDITING_MODELS = [
  { id: 'gpt-1.5', name: 'GPT Image 1.5', badge: 'NEW', type: 'Gen' },
  { id: 'nano-pro', name: 'Nano Banana Pro', badge: 'PRO', type: 'Fast' },
  { id: 'nano', name: 'Nano Banana', badge: '', type: 'Fast' },
  { id: 'flux-2-max', name: 'Flux 2 Max', badge: 'MAX', type: 'Pro' },
  { id: 'flux-2-pro', name: 'Flux 2 Pro', badge: 'PRO', type: 'Pro' },
  { id: 'flux-2-flex', name: 'Flux 2 Flex', badge: '', type: 'Dev' },
  { id: 'flux-2-dev', name: 'Flux 2 Dev', badge: 'DEV', type: 'Dev' },
  { id: 'flux-kontext-pro', name: 'Flux Kontext Pro', badge: 'PRO', type: 'Ctx' },
  { id: 'flux-kontext-max', name: 'Flux Kontext Max', badge: 'MAX', type: 'Ctx' },
  { id: 'flux-kontext-dev', name: 'Flux Kontext Dev', badge: 'DEV', type: 'Ctx' },
  { id: 'qwen-edit-2511', name: 'Qwen Image Edit 2511', badge: '', type: 'Edit' },
  { id: 'seedream-4.5', name: 'Seedream 4.5', badge: '', type: 'Dream' },
  { id: 'seedream-4', name: 'Seedream 4', badge: '', type: 'Dream' },
  { id: 'wan-2.6', name: 'Wan 2.6', badge: '', type: 'Wan' },
  { id: 'emu-3.5', name: 'Emu 3.5 Image', badge: '', type: 'Emu' },
  { id: 'reve', name: 'Reve', badge: '', type: 'Reve' },
  { id: 'reve-fast', name: 'Reve Fast', badge: 'FAST', type: 'Reve' },
];

const EDITING_SCENARIOS = [
  {
    id: 1,
    type: "تغییر استایل",
    prompt: "تبدیل پرتره به استایل سایبرپانک، نورهای نئونی بنفش و صورتی، پس‌زمینه شهر آینده...",
    inputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/0282d10b31c841c987b74fd8ff7325ff.jpg", 
    outputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/71c0a66150a74cdc908df1a4a293871e.jpg", 
    highlightColor: "#DA8FFF"
  },
  {
    id: 2,
    type: "تغییر رنگ",
    prompt: "تغییر رنگ خودرو به مشکی مات، هوای بارانی و انعکاس روی آسفالت خیس...",
    inputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/2e702ca2ead64dfe935eaa8288800d92.jpg",
    outputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/361996defb134571a4ae7f004b212092.jpg", 
    highlightColor: "#FF6482"
  },
  {
    id: 3,
    type: "ویرایش خلاقانه",
    prompt: "افزودن افکت‌های نوری انتزاعی طلایی و ذرات معلق در هوا به دور سوژه...",
    inputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/9e7d2ab5c25b4634a111b4f15ddc31e0.jpg", 
    outputImage: "https://luma-assets.fsn1.your-objectstorage.com/-/46cd13aa5e304e2396b89ca7fd53319d.jpg", 
    highlightColor: "#FFB340"
  }
];

export const EditingHeroAnim: React.FC = () => {
  const { theme } = useTheme();
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState(EDITING_MODELS[1]); // Default to Nano Banana Pro
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  
  // Settings
  const [quality, setQuality] = useState<'Medium' | 'Good' | 'Excellent'>('Good');
  const [outputQuality, setOutputQuality] = useState<'Standard' | 'HD' | 'Ultra'>('HD');

  // Animation States
  const [status, setStatus] = useState<'input' | 'typing' | 'processing' | 'complete'>('input');
  const [progress, setProgress] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");

  const scenario = EDITING_SCENARIOS[activeScenarioIndex];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulation Logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const runSequence = async () => {
      // 1. INPUT STATE
      if (status === 'input') {
        setDisplayedPrompt("");
        setProgress(0);
        timeout = setTimeout(() => setStatus('typing'), 1500);
      }
      
      // 2. TYPING STATE
      else if (status === 'typing') {
        let charIndex = 0;
        interval = setInterval(() => {
          if (charIndex <= scenario.prompt.length) {
            setDisplayedPrompt(scenario.prompt.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(interval);
            timeout = setTimeout(() => setStatus('processing'), 500);
          }
        }, 30);
      }

      // 3. PROCESSING STATE
      else if (status === 'processing') {
        let prog = 0;
        interval = setInterval(() => {
          prog += 1.5;
          setProgress(prog);
          if (prog >= 100) {
            clearInterval(interval);
            setStatus('complete');
          }
        }, 30);
      }

      // 4. COMPLETE STATE
      else if (status === 'complete') {
        timeout = setTimeout(() => {
           setActiveScenarioIndex((prev) => (prev + 1) % EDITING_SCENARIOS.length);
           setStatus('input');
        }, 4000);
      }
    };

    runSequence();

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [status, scenario]);

  return (
    <div className="relative w-full h-full bg-[#f4f4f5] dark:bg-[#09090b] flex flex-col lg:flex-row-reverse font-sans select-none dir-rtl min-h-[750px] text-right overflow-hidden rounded-[24px] border border-black/5 dark:border-white/5 transition-colors duration-300">
      
      {/* --- RIGHT SIDEBAR (CONTROLS) --- */}
      <div className="w-full lg:w-[400px] bg-white dark:bg-[#0c0c0e] border-l border-black/10 dark:border-l-white/5 flex flex-col p-6 gap-6 shrink-0 relative z-20 shadow-2xl overflow-visible transition-colors duration-300">
         
         {/* 1. Header */}
         <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luma-purple/20 to-luma-pink/20 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-inner">
                  <Sliders size={16} className="text-zinc-800 dark:text-white" />
               </div>
               <div>
                  <h3 className="font-bold text-sm text-zinc-800 dark:text-gray-200 tracking-tight">پنل تنظیمات</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] text-zinc-500 dark:text-gray-500 font-mono">v4.0.2-Stable</span>
                  </div>
               </div>
            </div>
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-zinc-400 dark:text-gray-500 hover:text-zinc-900 hover:dark:text-white transition-colors">
               <MoreHorizontal size={18} />
            </button>
         </div>

         {/* 2. Model Selector (Expanded) */}
         <div className="relative z-30" ref={dropdownRef}>
            <div className="flex justify-between items-center mb-2 px-1">
               <label className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider">مدل هوش مصنوعی</label>
            </div>
            
            <div 
               className={`
                  relative h-14 bg-[#fafafa] dark:bg-[#121214] border rounded-xl flex items-center justify-between px-4 cursor-pointer transition-all duration-300 group
                  ${isModelMenuOpen ? 'border-luma-purple/50 ring-1 ring-luma-purple/20' : 'border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20'}
               `}
               onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
            >
               <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-gray-800 dark:to-black flex-shrink-0 flex items-center justify-center border border-black/10 dark:border-white/10 shadow-sm">
                    <Sparkles size={14} className={isModelMenuOpen ? "text-luma-purple" : "text-zinc-500 dark:text-gray-400 group-hover:text-zinc-800 group-hover:dark:text-white"} />
                  </div>
                  <div className="flex flex-col truncate">
                     <span className="font-bold text-zinc-800 dark:text-gray-200 text-xs truncate group-hover:text-zinc-950 group-hover:dark:text-white transition-colors">{selectedModel.name}</span>
                     <span className="text-[10px] text-zinc-400 dark:text-gray-500 font-mono">{selectedModel.type} Architecture</span>
                  </div>
               </div>
               <ChevronDown size={16} className={`text-zinc-500 transition-transform duration-300 ${isModelMenuOpen ? 'rotate-180 text-luma-purple' : ''}`} />
            </div>

            {/* Premium Dropdown */}
            <AnimatePresence>
               {isModelMenuOpen && (
                  <motion.div 
                     initial={{ opacity: 0, y: 8, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 8, scale: 0.98 }}
                     transition={{ duration: 0.2 }}
                     className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden z-50 ring-1 ring-black/5 dark:ring-white/5"
                  >
                     <div className="max-h-[320px] overflow-y-auto custom-scrollbar p-1">
                        {EDITING_MODELS.map((model) => (
                           <div 
                              key={model.id}
                              onClick={() => { setSelectedModel(model); setIsModelMenuOpen(false); }}
                              className={`
                                 group/item px-3 py-2.5 flex items-center justify-between cursor-pointer rounded-lg mb-0.5 transition-colors
                                 ${selectedModel.id === model.id ? 'bg-zinc-100 dark:bg-white/10' : 'hover:bg-zinc-50 dark:hover:bg-white/5'}
                              `}
                           >
                              <div className="flex items-center gap-3">
                                 <div className={`w-1.5 h-1.5 rounded-full ${selectedModel.id === model.id ? 'bg-luma-purple' : 'bg-zinc-400 dark:bg-gray-600 group-hover/item:bg-zinc-600 group-hover/item:dark:bg-gray-400'}`} />
                                 <span className={`text-xs font-medium ${selectedModel.id === model.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 group-hover/item:text-zinc-800 group-hover/item:dark:text-gray-200'}`}>
                                    {model.name}
                                 </span>
                              </div>
                              {model.badge && (
                                 <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider ${
                                    model.badge === 'NEW' ? 'bg-luma-purple/10 text-luma-purple border border-luma-purple/20' : 
                                    model.badge === 'PRO' ? 'bg-luma-pink/10 text-luma-pink border border-luma-pink/20' : 
                                    'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-gray-300 border border-black/5 dark:border-white/10'
                                 }`}>
                                    {model.badge}
                                 </span>
                              )}
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* 3. Input Image (Enhanced) */}
         <div className="relative group/image">
            <div className="flex justify-between items-center px-1 mb-2">
               <label className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider">تصویر ورودی</label>
               <span className="text-[9px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 size={10} />
                  آماده پردازش
               </span>
            </div>
            <div className="relative h-20 bg-[#fafafa] dark:bg-[#121214] border border-black/5 dark:border-white/10 rounded-xl flex items-center p-2.5 gap-4 overflow-hidden transition-colors hover:border-black/10 dark:hover:border-white/20">
               {/* Thumbnail */}
               <div className="aspect-square h-full rounded-lg overflow-hidden border border-black/5 dark:border-white/10 relative shadow-sm">
                  <img src={scenario.inputImage} alt="Input" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover/image:bg-transparent transition-colors" />
               </div>
               
               {/* Metadata */}
               <div className="flex flex-col gap-1 z-10 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-zinc-800 dark:text-gray-200 truncate font-mono">source_img_v2.png</span>
                     <span className="text-[9px] px-1.5 py-0.5 bg-black/5 dark:bg-white/5 rounded text-zinc-500 dark:text-gray-500 border border-black/5 dark:border-white/5">PNG</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-450 dark:text-gray-500">
                     <span className="flex items-center gap-1"><FileImage size={10}/> 2.4 MB</span>
                     <span className="flex items-center gap-1"><Maximize2 size={10}/> 1024x1024</span>
                  </div>
               </div>

               {/* Quick Action Overlay */}
               <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/image:opacity-100 transition-opacity">
                  <button className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg shadow-lg hover:scale-105 transition-transform">
                     <Settings2 size={14} />
                  </button>
               </div>
            </div>
         </div>

         {/* 4. Prompt Input (Terminal Style) */}
         <div className="flex-1 flex flex-col min-h-[120px]">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">دستور متنی (Prompt)</label>
            <div className={`
               flex-1 bg-[#fafafa] dark:bg-[#121214] border rounded-xl p-4 relative transition-all duration-300 flex flex-col
               ${status === 'processing' ? 'border-luma-purple/40 shadow-[0_0_15px_rgba(218,143,255,0.05)]' : 'border-black/5 dark:border-white/10 focus-within:border-black/15 focus-within:dark:border-white/30'}
            `}>
               <div className="flex-1 relative">
                  {status === 'input' ? (
                     <span className="text-zinc-400 dark:text-gray-600 text-xs italic">منتظر ورودی...</span>
                  ) : (
                     <div className="text-xs text-zinc-800 dark:text-gray-300 leading-6 font-mono dir-rtl break-words">
                        <span className="text-zinc-900 dark:text-white drop-shadow-sm">{displayedPrompt}</span>
                        {status === 'typing' && (
                           <motion.span 
                              animate={{ opacity: [0, 1, 0] }} 
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block w-1.5 h-3.5 bg-luma-purple ml-1 align-middle" 
                           />
                        )}
                     </div>
                  )}
               </div>
               
               {/* Tag Suggestions */}
               <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
                  {['Cyberpunk', 'Realistic', '8K', 'Cinematic'].map((tag, i) => (
                     <span key={i} className="text-[9px] px-2 py-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 rounded border border-black/5 dark:border-white/5 text-zinc-500 dark:text-gray-400 cursor-pointer transition-colors whitespace-nowrap">
                        +{tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>

         {/* 5. Configuration (Refined) */}
         <div className="space-y-4 pt-2">
            
            {/* Quality Segmented Control */}
            <div>
               <div className="flex justify-between items-center px-1 mb-2">
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider">کیفیت پردازش</label>
                  <span className="text-[10px] text-zinc-500 dark:text-gray-500">{quality === 'Medium' ? 'متوسط' : quality === 'Good' ? 'خوب' : 'عالی'}</span>
               </div>
               <div className="grid grid-cols-3 gap-1 bg-[#fafafa] dark:bg-[#121214] p-1 rounded-xl border border-black/5 dark:border-white/10">
                  {['Medium', 'Good', 'Excellent'].map((opt) => (
                     <button
                        key={opt}
                        onClick={() => setQuality(opt as any)}
                        className={`
                           relative py-2 rounded-lg text-[10px] font-bold transition-all z-10
                           ${quality === opt ? 'text-zinc-900 dark:text-white font-black' : 'text-zinc-500 dark:text-gray-500 hover:text-zinc-800 hover:dark:text-gray-300'}
                        `}
                     >
                        {quality === opt && (
                           <motion.div 
                              layoutId="quality-pill"
                              className="absolute inset-0 bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-lg shadow-sm -z-10"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                           />
                        )}
                        <span>{opt === 'Medium' ? 'متوسط' : opt === 'Good' ? 'خوب' : 'عالی'}</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Output Quality Cards */}
            <div>
               <label className="text-[11px] font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-wider px-1 mb-2 block">کیفیت خروجی</label>
               <div className="grid grid-cols-3 gap-3">
                  {[
                     { label: 'Standard', sub: '720p', val: 'Standard' },
                     { label: 'High Res', sub: '1080p', val: 'HD' },
                     { label: 'Ultra', sub: '4K', val: 'Ultra' }
                  ].map((opt) => {
                     const isSelected = outputQuality === opt.val;
                     return (
                        <button
                           key={opt.val}
                           onClick={() => setOutputQuality(opt.val as any)}
                           className={`
                              flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 group
                              ${isSelected 
                                 ? 'bg-white dark:bg-white/10 border-black/10 dark:border-white/20 shadow-md' 
                                 : 'bg-[#fafafa] dark:bg-[#121214] border-black/5 dark:border-white/5 hover:border-black/10 hover:dark:border-white/10 hover:bg-black/5 hover:dark:bg-white/5'}
                           `}
                        >
                           <span className={`text-[10px] font-bold mb-0.5 ${isSelected ? 'text-zinc-800 dark:text-white' : 'text-zinc-500 dark:text-gray-400 group-hover:text-zinc-800 group-hover:dark:text-gray-200'}`}>
                              {opt.label}
                           </span>
                           <span className={`text-[9px] font-mono ${isSelected ? 'text-luma-purple' : 'text-zinc-400 dark:text-gray-600'}`}>
                              {opt.sub}
                           </span>
                        </button>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* 6. Action Button */}
         <div className="mt-auto pt-4">
            <button 
               disabled={status === 'processing'}
               className={`
                  w-full h-14 rounded-xl flex items-center justify-center gap-3 text-sm font-black transition-all duration-300 shadow-xl relative overflow-hidden group
                  ${status === 'processing' ? 'cursor-not-allowed' : 'hover:shadow-luma-purple/20 hover:scale-[1.01] active:scale-[0.99]'}
               `}
            >
               {/* Animated Background */}
               <div className={`absolute inset-0 transition-opacity duration-300 ${status === 'processing' ? 'opacity-0' : 'opacity-100 bg-gradient-to-r from-luma-purple via-[#dd7dff] to-luma-pink'}`} />
               <div className={`absolute inset-0 bg-[#f0f0f0] dark:bg-[#1a1a1a] transition-opacity duration-300 ${status === 'processing' ? 'opacity-100' : 'opacity-0'}`} />
               
               {/* Shine Effect */}
               {!status && (
                  <motion.div 
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%]"
                     animate={{ translateX: ["100%"] }}
                     transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                  />
               )}

               <div className="relative z-10 flex items-center gap-2 text-white">
                  {status === 'processing' ? (
                     <>
                        <RefreshCw size={18} className="animate-spin text-zinc-500 dark:text-gray-400" />
                        <span className="text-zinc-500 dark:text-gray-400">در حال پردازش... {Math.round(progress)}٪</span>
                     </>
                  ) : (
                     <>
                        <Zap size={18} className="fill-white/20" />
                        <span className="text-white mix-blend-plus-lighter">شروع پردازش</span>
                     </>
                  )}
               </div>

               {/* Progress Bar (Bottom) */}
               {status === 'processing' && (
                  <motion.div 
                     className="absolute bottom-0 left-0 h-1 bg-luma-purple z-20"
                     initial={{ width: "0%" }}
                     animate={{ width: `${progress}%` }}
                     transition={{ ease: "linear" }}
                  />
               )}
            </button>
         </div>
      </div>

      {/* --- LEFT CANVAS (PREVIEW) --- */}
      <div className="flex-1 bg-zinc-50 dark:bg-[#050505] relative overflow-hidden flex items-center justify-center p-6 lg:p-12 transition-colors duration-300">
         
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(244,244,245,0.9)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

         <div className="relative w-full h-full flex items-center justify-center max-w-2xl mx-auto">
             
             {/* Main Image Frame */}
             <motion.div 
                layout
                className="relative w-full aspect-square bg-white dark:bg-[#080808] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 group/canvas"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
             >
                {/* Status Badge inside Canvas */}
                <div className="absolute top-4 left-4 z-30 flex gap-2">
                   <div className="px-2.5 py-1 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-lg text-[10px] font-bold text-zinc-800 dark:text-gray-300 flex items-center gap-2">
                      <ScanLine size={12} className="text-luma-purple" />
                      <span>{status === 'processing' ? 'Generating...' : status === 'complete' ? 'Result' : 'Original'}</span>
                   </div>
                </div>

                {/* 1. INPUT IMAGE */}
                <img 
                   src={scenario.inputImage}
                   alt="Input"
                   className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${status === 'complete' ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* 2. PROCESSING OVERLAY (Premium) */}
                <AnimatePresence>
                   {status === 'processing' && (
                      <motion.div 
                         className="absolute inset-0 z-20 overflow-hidden"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                      >
                         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                         
                         {/* High-Tech Scanning Beam */}
                         <motion.div 
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luma-purple to-transparent shadow-[0_0_20px_rgba(218,143,255,0.8)]"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         />
                         
                         {/* Center Loader */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                            <div className="relative">
                               {/* Rotating Rings */}
                               <motion.div 
                                  className="w-16 h-16 rounded-full border-2 border-white/10 border-t-luma-purple"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                               />
                               <motion.div 
                                  className="absolute inset-2 rounded-full border-2 border-white/5 border-b-luma-pink"
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                               />
                               
                               <div className="absolute inset-0 flex items-center justify-center">
                                  <Sparkles size={20} className="text-white animate-pulse" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1">
                               <span className="text-xs font-bold text-white tracking-widest uppercase">Processing</span>
                               <span className="text-[10px] text-gray-300 dark:text-gray-500 font-mono">Running {selectedModel.name} model...</span>
                            </div>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>

                {/* 3. OUTPUT IMAGE */}
                <AnimatePresence>
                   {status === 'complete' && (
                      <motion.div 
                         className="absolute inset-0 z-30"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.8 }}
                      >
                         <img 
                            src={scenario.outputImage}
                            alt="Output"
                            className="w-full h-full object-cover"
                         />
                         
                         {/* Flash Effect */}
                         <motion.div 
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                         />

                         {/* Success Toast */}
                         <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-6 left-6 right-6 md:right-auto md:w-auto bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-2xl"
                         >
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-600 dark:text-green-500">
                               <CheckCircle2 size={16} />
                            </div>
                            <div className="flex flex-col mr-1">
                                <span className="text-[11px] font-bold text-zinc-900 dark:text-white">تغییرات اعمال شد</span>
                                <span className="text-[9px] text-zinc-500 dark:text-gray-400 font-mono uppercase">{outputQuality} • JPG • 2.1s</span>
                            </div>
                            <button className="mr-auto text-[10px] font-bold bg-zinc-900 dark:bg-white text-white dark:text-black px-2 py-1 rounded hover:bg-zinc-800 hover:dark:bg-gray-200 transition-colors">
                               دانلود
                            </button>
                         </motion.div>
                      </motion.div>
                   )}
                </AnimatePresence>

             </motion.div>
         </div>

      </div>

    </div>
  );
};
