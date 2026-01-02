import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Sparkles, Image as ImageIcon, Video, Bot, Wand2, Scissors, 
  Maximize2, Shirt, MessageSquare, Layers, Zap, ArrowLeft,
  ChevronRight, Command, Cpu, Globe, ArrowUpRight, Atom, Database,
  Share2, Activity, PlayCircle, Check, Aperture, Film, ScanLine, Box, 
  Clapperboard, Palette, FileText
} from 'lucide-react';
import Button from '../components/Button';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { Service } from '../types';

// --- Color Palette Mapping (Matching Landing Page) ---
const BRAND_COLORS = {
  purple: '#DA8FFF',
  pink: '#FF6482',
  yellow: '#FFB340',
};

const getServiceColor = (id: string) => {
  switch (id) {
    case 'img-gen':
    case 'bg-remove':
    case 'try-on':
      return BRAND_COLORS.pink;
    case 'video':
    case 'img-edit':
    case 'chat':
      return BRAND_COLORS.purple;
    case 'assistant':
    case 'upscale':
      return BRAND_COLORS.yellow;
    default:
      return BRAND_COLORS.purple;
  }
};

// --- Extended Details & Images ---
const SERVICE_EXTENDED_DETAILS: Record<string, { images: string[]; features: string[] }> = {
  'img-gen': {
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['موتور تولید تصویر Luma XL', 'پشتیبانی از استایل‌های هنری', 'رزولوشن ۸K و جزئیات دقیق']
  },
  'img-edit': {
    images: [
      'https://images.unsplash.com/photo-1633515257399-5972216221c3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['حذف و اضافه اشیاء با متن', 'تغییر نورپردازی و ترکیب‌بندی', 'بازسازی هوشمند بخش‌های حذف شده']
  },
  'bg-remove': {
    images: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['تشخیص لبه‌های پیچیده (مو)', 'خروجی PNG شفاف لایه باز', 'پردازش دسته‌ای هزاران تصویر']
  },
  'assistant': {
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531297422935-d67e3371d426?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['برنامه‌ریزی و مدیریت تسک‌ها', 'تحلیل داده‌های کسب‌وکار', 'پاسخگویی به ایمیل‌ها و پیام‌ها']
  },
  'video': {
    images: [
      'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601506521793-dc748fc8049f?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['تبدیل متن به ویدیو سینمایی', 'انیمیت کردن تصاویر ثابت', 'کنترل حرکت دوربین و زاویه']
  },
  'upscale': {
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['افزایش رزولوشن تا ۴ برابر', 'حذف نویز و تاری تصویر', 'بازسازی چهره و جزئیات بافت']
  },
  'try-on': {
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['پرو مجازی لباس روی مانکن', 'تغییر رنگ و طرح پارچه', 'حفظ چین و چروک طبیعی لباس']
  },
  'chat': {
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555421689-492a18d9c3ad?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    ],
    features: ['مدل زبانی GPT-4 بهینه شده', 'درک عمیق زبان فارسی', 'حافظه طولانی مدت مکالمات']
  },
};

// --- Types ---
interface ServiceNode {
  id: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  color: string;
}

// --- Service Configuration with Colors ---
const SERVICE_NODES: ServiceNode[] = SERVICES.map((s, i) => {
  const colors = [
    'text-luma-pink', 'text-luma-purple', 'text-luma-yellow', 'text-blue-400',
    'text-emerald-400', 'text-orange-400', 'text-indigo-400', 'text-rose-400'
  ];
  return {
    id: s.id,
    icon: s.icon,
    label: s.title,
    desc: s.description,
    color: colors[i % colors.length]
  };
});

// Helper to get hex color from tailwind class for the beam gradient
const getColorHex = (className: string) => {
  if (className.includes('pink')) return '#FF6482';
  if (className.includes('purple')) return '#DA8FFF';
  if (className.includes('yellow')) return '#FFB340';
  if (className.includes('blue')) return '#60A5FA';
  if (className.includes('emerald')) return '#34D399';
  if (className.includes('orange')) return '#FB923C';
  if (className.includes('indigo')) return '#818CF8';
  if (className.includes('rose')) return '#FB7185';
  return '#ffffff';
};

// --- WORKFLOW ANIMATION COMPONENTS ---

const StoreWorkflowAnim = () => {
  const [step, setStep] = useState(1); 
  // 1: Raw
  // 2: BG Removed
  // 3: Studio

  useEffect(() => {
    const duration = 12000; 
    
    const cycle = () => {
      setStep(1); // Start Raw
      setTimeout(() => setStep(2), 4000); // BG Remove
      setTimeout(() => setStep(3), 8000); // Studio
      setTimeout(() => setStep(1), 12000); // Loop
    };
    
    const initialTimer = setTimeout(cycle, 100);
    const interval = setInterval(cycle, duration);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col font-sans select-none rounded-[32px] overflow-hidden border border-white/10">
       {/* --- Main Visual Area (Full Fill) --- */}
       <div className="relative flex-1 w-full h-full overflow-hidden group">
          
          {/* Base Layer: Checkerboard (Transparent Background Indicator) */}
          <div className="absolute inset-0 bg-[#151515]"
               style={{ 
                 backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)',
                 backgroundSize: '24px 24px',
               }}
          />

          {/* Layer 1: Raw Image (Step 1) - Covers Base */}
          <motion.div 
             className="absolute inset-0 bg-gray-900 flex items-center justify-center overflow-hidden z-20"
             initial={{ clipPath: "inset(0 0 0 0)" }}
             animate={{ 
                clipPath: step === 1 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
             }}
             transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: step === 1 ? 0 : 0.5 }}
          >
             <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Raw Product"
             />
             
             {/* Scanning Line Effect */}
             <AnimatePresence>
                {step !== 1 && (
                   <motion.div 
                      className="absolute left-0 right-0 h-[3px] bg-luma-pink shadow-[0_0_25px_#FF6482] z-30 bottom-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 1.5 }}
                   />
                )}
             </AnimatePresence>
          </motion.div>

          {/* Layer 2: Cutout Image (Step 2) */}
          <motion.div
             className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
             animate={{ 
                opacity: 1, 
                scale: step === 2 ? 1 : 0.95 
             }}
             transition={{ duration: 0.5 }}
          >
             <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ mixBlendMode: 'normal' }}
                alt="Transparent Product"
             />
          </motion.div>

          {/* Layer 3: Studio Final (Step 3) */}
          <motion.div
             className="absolute inset-0 flex items-center justify-center overflow-hidden z-30"
             initial={{ opacity: 0 }}
             animate={{ opacity: step === 3 ? 1 : 0 }}
             transition={{ duration: 0.8 }}
          >
             {/* Studio Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#800000] via-[#3a0000] to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
             </div>

             {/* Final Product */}
             <motion.img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                className="relative w-full h-full object-cover drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                animate={{ 
                   scale: step === 3 ? 1.05 : 1,
                   filter: step === 3 ? 'contrast(1.2) saturate(1.2) brightness(1.1)' : 'none'
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
             />

             {/* 4K Badge */}
             <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: step === 3 ? 1 : 0, opacity: step === 3 ? 1 : 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-[#4ADE80]/50 text-[#4ADE80] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl flex items-center gap-2"
             >
                <Maximize2 size={12} />
                <span>خروجی نهایی</span>
             </motion.div>
          </motion.div>

       </div>

       {/* --- Progress Steps Bar --- */}
       <div className="h-16 bg-[#0a0a0a] border-t border-white/5 flex items-center px-4 gap-2 shrink-0 relative z-20">
          {[
             { label: 'حذف پس‌زمینه', id: 1, activeBg: 'bg-luma-pink', activeShadow: 'shadow-[0_0_15px_rgba(255,100,130,0.3)]', activeText: 'text-white' },
             { label: 'تولید محیط استودیویی', id: 2, activeBg: 'bg-luma-yellow', activeShadow: 'shadow-[0_0_15px_rgba(255,179,64,0.3)]', activeText: 'text-black' },
             { label: 'افزایش کیفیت تا 4K', id: 3, activeBg: 'bg-[#4ADE80]', activeShadow: 'shadow-[0_0_15px_rgba(74,222,128,0.3)]', activeText: 'text-black' }
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
       <div className="h-0.5 bg-white/5 w-full relative overflow-hidden shrink-0">
          <motion.div 
             className="absolute inset-y-0 right-0 h-full"
             initial={{ width: "0%" }}
             animate={{ 
                width: step === 0 ? "0%" : `${(step / 3) * 100}%`,
                backgroundColor: step === 1 ? '#FF6482' : step === 2 ? '#FFB340' : '#4ADE80'
             }}
             transition={{ duration: 0.5 }}
          />
       </div>
    </div>
  );
};

const ContentWorkflowAnim = () => {
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

// --- Component: Star Field Animation ---
const StarField = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static initial stars
    const initialStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setStars(initialStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0"
          style={{ 
            top: `${star.top}%`, 
            left: `${star.left}%`, 
            width: star.size, 
            height: star.size 
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            x: [0, 50], // Drift right slightly
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- Component: Service Galaxy Animation ---
const ServiceGalaxy = () => {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Split services into two orbits for visual layering
  const innerOrbit = SERVICE_NODES.slice(0, 4);
  const outerOrbit = SERVICE_NODES.slice(4, 8);

  const innerRadius = 210; 
  const outerRadius = 320; 

  // --- Interaction Handlers ---
  const handleNodeEnter = (node: ServiceNode) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setActiveNode(node);
  };

  const handleNodeLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveNode(null);
    }, 200); // 200ms delay to allow moving to center
  };

  const handleCenterEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
  };

  const handleCenterLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveNode(null);
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[800px] flex items-center justify-center perspective-1000 my-10 lg:my-0">
      
      {/* --- Background Details --- */}
      {/* Deep Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luma-purple/10 via-transparent to-luma-blue/5 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      
      {/* Decorative Static Rings */}
      <div className="absolute inset-[5%] border border-white/5 rounded-full opacity-20 pointer-events-none" />
      <div className="absolute inset-[18%] border border-dashed border-white/5 rounded-full opacity-10 pointer-events-none" />
      <div className="absolute inset-[30%] border border-white/5 rounded-full opacity-5 pointer-events-none" />
      
      {/* Star Field */}
      <StarField />

      {/* Rotating Background Grid/Radar effect */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:120s] pointer-events-none opacity-10">
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-10 rounded-full" />
      </div>

      {/* --- Orbits Tracks --- */}
      {/* Outer Ring */}
      <div 
        className="absolute rounded-full border border-white/10 opacity-30 animate-spin-slow [animation-duration:80s] pointer-events-none" 
        style={{ width: outerRadius * 2, height: outerRadius * 2 }}
      />
      {/* Inner Ring */}
      <div 
        className="absolute rounded-full border border-white/10 opacity-40 animate-spin-slow [animation-duration:50s] direction-reverse pointer-events-none" 
        style={{ width: innerRadius * 2, height: innerRadius * 2 }}
      />

      {/* --- Central Core (Morphing) --- */}
      <motion.div 
        layout
        onMouseEnter={handleCenterEnter}
        onMouseLeave={handleCenterLeave}
        className={`
           relative z-30 flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl transition-all duration-500
           ${activeNode 
             ? 'bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
             : 'bg-black/20 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.05)]'
           }
        `}
        initial={{ width: 120, height: 120, borderRadius: 9999 }}
        animate={{
           width: activeNode ? 300 : 120, // Circular expanded state
           height: activeNode ? 300 : 120,
           borderRadius: 9999, // Always circular
        }}
        transition={{
           type: "spring",
           stiffness: 120,
           damping: 20
        }}
      >
        {/* Border with Overlay Blend Mode */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/40 mix-blend-overlay pointer-events-none z-40" />
        
        {/* Subtle Blend Overlay for Better Integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div 
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-30"
            >
               {/* Background Glow based on Active Color */}
               <div 
                  className="absolute inset-0 opacity-20 transition-colors duration-500 mix-blend-screen" 
                  style={{ background: `radial-gradient(circle, ${getColorHex(activeNode.color)}, transparent 70%)` }}
               />
               
               {/* Animated Icon */}
               <motion.div 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className={`p-3 rounded-2xl bg-white/5 border border-white/10 mb-3 ${activeNode.color}`}
               >
                  <activeNode.icon size={32} />
               </motion.div>

               {/* Text Info */}
               <motion.h3 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-white font-bold text-lg mb-2 tracking-tight whitespace-nowrap"
               >
                 {activeNode.label}
               </motion.h3>
               
               <motion.p 
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3 w-full px-2"
               >
                 {activeNode.desc}
               </motion.p>

               {/* Action Hint */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="mt-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-2 text-[10px] text-white font-bold tracking-wide hover:bg-white/10 cursor-pointer transition-colors"
               >
                  <span>مشاهده جزئیات</span>
                  <ChevronRight size={12} className="rotate-180" />
               </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center relative w-full h-full"
            >
               {/* Idle Animation: Logo (Static now) */}
               <div className="relative flex items-center justify-center w-full h-full">
                  <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full animate-pulse" />
                  <img 
                    src="https://lumai.ir/logo-en.svg" 
                    alt="Luma AI" 
                    className="w-16 h-auto brightness-0 invert opacity-90"
                  />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Orbiting Nodes Systems --- */}
      
      {/* 1. Inner Orbit System */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:50s] pointer-events-none z-50">
         {innerOrbit.map((node, i) => {
           const angle = (i / innerOrbit.length) * 360;
           const radius = innerRadius;
           const isActive = activeNode?.id === node.id;
           const activeColorHex = getColorHex(node.color);

           return (
             <div 
               key={node.id}
               className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto"
               style={{ transform: `rotate(${angle}deg)` }}
             >
                {/* Connection Beam */}
                <div 
                   className="absolute top-1/2 left-0 h-[1px] origin-left transition-all duration-300"
                   style={{ 
                      width: radius - 60, 
                      background: isActive 
                        ? `linear-gradient(to right, transparent, ${activeColorHex})` 
                        : 'transparent',
                      opacity: isActive ? 1 : 0
                   }}
                />

                {/* The Node Position */}
                <div 
                   className="absolute"
                   style={{ transform: `translateX(${radius}px) translate(-50%, -50%)` }}
                >
                    <div 
                       className="relative group cursor-pointer"
                       onMouseEnter={() => handleNodeEnter(node)}
                       onMouseLeave={handleNodeLeave}
                    >
                       {/* Counter-Rotate Icon */}
                       <div className="animate-spin-slow [animation-duration:50s] direction-reverse">
                           <div className={`
                              w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-500 relative z-20
                              ${isActive 
                                 ? 'bg-[#151515] border-white/40 scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                                 : 'bg-[#0a0a0a]/80 border border-white/10 hover:border-white/30 hover:scale-110 hover:bg-[#151515]'
                              }
                           `}>
                              <node.icon 
                                size={24} 
                                className={`transition-all duration-300 ${isActive ? node.color : 'text-gray-400 group-hover:text-white'}`} 
                              />
                           </div>
                           
                           {/* Label Tag (Visible on hover) */}
                           <div className={`
                              absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-bold text-white whitespace-nowrap pointer-events-none transition-all duration-300 z-30
                              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                           `}>
                              {node.label}
                           </div>
                       </div>
                    </div>
                </div>
             </div>
           );
         })}
      </div>

      {/* 2. Outer Orbit System (Reverse Rotation) */}
      <div className="absolute inset-0 animate-spin-slow [animation-duration:80s] direction-reverse pointer-events-none z-40">
         {outerOrbit.map((node, i) => {
           const angle = (i / outerOrbit.length) * 360;
           const radius = outerRadius; 
           const isActive = activeNode?.id === node.id;
           const activeColorHex = getColorHex(node.color);

           return (
             <div 
               key={node.id}
               className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto"
               style={{ transform: `rotate(${angle}deg)` }}
             >
                {/* Connection Beam */}
                <div 
                   className="absolute top-1/2 left-0 h-[1px] origin-left transition-all duration-300"
                   style={{ 
                      width: radius - 50, 
                      background: isActive 
                        ? `linear-gradient(to right, transparent, ${activeColorHex})` 
                        : 'transparent',
                      opacity: isActive ? 0.6 : 0
                   }}
                />

                <div 
                   className="absolute"
                   style={{ transform: `translateX(${radius}px) translate(-50%, -50%)` }}
                >
                    <div 
                       className="relative group cursor-pointer"
                       onMouseEnter={() => handleNodeEnter(node)}
                       onMouseLeave={handleNodeLeave}
                    >
                       <div className="animate-spin-slow [animation-duration:80s]">
                           <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 relative z-20
                              ${isActive 
                                 ? 'bg-[#151515] border border-white/40 scale-125' 
                                 : 'bg-[#0a0a0a]/90 border border-white/10 hover:border-white/30 hover:scale-110'
                              }
                           `}>
                              <node.icon 
                                size={18} 
                                className={`transition-all duration-300 ${isActive ? node.color : 'text-gray-500 group-hover:text-gray-300'}`} 
                              />
                           </div>
                       </div>
                    </div>
                </div>
             </div>
           );
         })}
      </div>

    </div>
  );
};

// --- Service Card Component (Rich Content + Image) ---
const ServiceGridItem: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const color = useMemo(() => getServiceColor(service.id), [service.id]);
  const details = SERVICE_EXTENDED_DETAILS[service.id] || { 
    images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop'], 
    features: [] 
  };
  const images = details.images || [];

  // --- Auto-Play Slideshow with Staggered Start ---
  useEffect(() => {
    if (images.length <= 1) return;

    const intervalDuration = 4000; // 4 seconds per slide
    const staggerDelay = index * 200; // 0.2s delay for each subsequent card

    // Stagger the start of the slideshow loop
    const initialTimeout = setTimeout(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, intervalDuration);
        
        return () => clearInterval(timer);
    }, staggerDelay);

    return () => clearTimeout(initialTimeout);
  }, [index, images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative h-full"
    >
      <Link to={service.path} className="block h-full relative group outline-none">
        {/* Outer container for Border Effect */}
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full relative p-px overflow-hidden transition-all duration-300"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '24px' 
            }}
        >
            {/* Dynamic Border Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity]"
                style={{
                    background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`
                }}
            />

            {/* Inner Content Container */}
            <div 
              className="relative h-full bg-[#0a0a0a] overflow-hidden flex flex-col"
              style={{ borderRadius: '23px' }}
            >
                {/* Image Header - Uniform Height */}
                <div className="relative h-64 w-full overflow-hidden shrink-0 bg-[#0a0a0a]">
                    {/* Slideshow */}
                    <AnimatePresence mode="popLayout">
                        <motion.img 
                          key={currentImageIndex}
                          src={images[currentImageIndex]} 
                          alt={service.title}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        />
                    </AnimatePresence>
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-lg z-20 group-hover:bg-black/60 transition-colors">
                       <service.icon size={20} style={{ color: isHovered ? color : 'white' }} className="transition-colors duration-300" />
                    </div>
                </div>

                {/* Content Padding */}
                <div className="relative z-10 p-6 pt-4 flex flex-col flex-grow">
                    
                    {/* Header */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                            {service.description}
                        </p>
                    </div>

                    {/* Extended Features List */}
                    <div className="space-y-2 mb-6">
                        {details.features.map((feat, i) => (
                           <div key={i} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span>{feat}</span>
                           </div>
                        ))}
                    </div>

                    {/* Footer / CTA Hint */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span 
                           className="text-xs font-bold transition-all duration-300 tracking-wide"
                           style={{ color: isHovered ? color : '#6b7280' }}
                         >
                           مشاهده و شروع
                         </span>
                         <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isHovered ? 'border-transparent text-black scale-110' : 'border-transparent text-gray-600'}`}
                            style={{ backgroundColor: isHovered ? color : 'transparent' }}
                         >
                            <ArrowLeft size={16} className={`transition-transform duration-300 ${isHovered ? '-translate-x-0.5' : ''}`} />
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Updated Workflow Step with Timeline Animation & Fixed Text Rendering ---
const WorkflowStep = ({ step, index, color, isLast }: { step: { icon: any, title: string, desc: string }, index: number, color: string, isLast?: boolean }) => (
  <div 
    className="relative flex gap-6 group"
    // Inject custom property for hover color without complex Tailwind state
    style={{ '--hover-color': color } as React.CSSProperties}
  >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute top-10 right-[23px] bottom-[-24px] w-0.5 bg-white/5 overflow-hidden">
           <motion.div 
             initial={{ height: "0%" }}
             whileInView={{ height: "100%" }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.5 + (index * 0.3), ease: "easeInOut" }}
             className="w-full bg-gradient-to-b"
             style={{ backgroundImage: `linear-gradient(to bottom, ${color}, transparent)` }}
           />
        </div>
      )}

      {/* Icon */}
      <div className="relative z-10 shrink-0">
        <motion.div 
           initial={{ scale: 0, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 + (index * 0.2), type: "spring", stiffness: 200, damping: 20 }}
           className="w-12 h-12 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors shadow-lg"
        >
           <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: color }} />
           <step.icon size={20} className="relative z-10 text-gray-400 group-hover:text-white transition-colors" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div 
         initial={{ x: -20, opacity: 0 }}
         whileInView={{ x: 0, opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: 0.3 + (index * 0.2) }}
         className="pb-10 pt-1"
      >
         {/* FIX: Removed bg-clip-text gradient transition which caused flickering. Used solid color transition instead. */}
         <h4 
            className="text-white font-bold text-base mb-1.5 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
         >
            {step.title}
         </h4>
         <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs group-hover:text-gray-400 transition-colors">
            {step.desc}
         </p>
      </motion.div>
  </div>
);

const AllServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero Stagger Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-luma-pink selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
         {/* Background Effects */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
         
         {/* Animated Background Blobs */}
         <motion.div 
            animate={{ 
               y: [0, -50, 0],
               x: [0, 30, 0],
               scale: [1, 1.2, 1],
               opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" 
         />
         <motion.div 
            animate={{ 
               y: [0, 50, 0],
               x: [0, -30, 0],
               scale: [1, 1.1, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" 
         />
         <motion.div 
            animate={{ 
               y: [0, 30, -30, 0],
               x: [0, 50, 0],
               scale: [0.9, 1.1, 0.9],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-luma-yellow/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" 
         />

         <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            
            {/* Left Column: Text Content */}
            <motion.div 
              className="order-2 lg:order-1 text-center lg:text-right relative z-20"
              variants={heroContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                {/* Decorative background behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />

                {/* Premium Badge */}
                <motion.div variants={heroItemVariants} className="flex justify-center lg:justify-start">
                   <div className="inline-flex items-center gap-3 pl-4 pr-1 py-1 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-luma-purple/10 hover:border-luma-purple/30 transition-colors group cursor-default">
                      <span className="bg-gradient-to-r from-luma-purple to-luma-pink text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                          نسخه ۴.۰
                      </span>
                      <span className="text-gray-300 font-medium text-xs tracking-wide pl-2 group-hover:text-white transition-colors">
                          پلتفرم جامع هوش مصنوعی
                      </span>
                   </div>
                </motion.div>
                
                {/* Title */}
                <motion.h1 
                    variants={heroItemVariants}
                    className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight relative"
                >
                    نهایت قدرت
                    <br />
                    <span className="relative inline-block mt-2 pb-2">
                        {/* Glow effect behind text */}
                        <span className="absolute -inset-4 bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow blur-3xl opacity-20 animate-pulse pointer-events-none"></span>
                        <span className="relative text-gradient-animated">
                            در دستان شما
                        </span>
                    </span>
                </motion.h1>
                
                {/* Description */}
                <motion.p 
                    variants={heroItemVariants}
                    className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-loose font-light"
                >
                   به اکوسیستم جامع لوما خوش آمدید. ما مجموعه‌ای از قدرتمندترین ابزارهای هوش مصنوعی را در یک پلتفرم یکپارچه گردآوری کرده‌ایم تا خلاقیت شما را به سطح جدیدی برسانیم.
                </motion.p>
                
                {/* Buttons */}
                <motion.div 
                    variants={heroItemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                >
                    <Button 
                        externalHref="https://lumai.ir/dashboard" 
                        variant="primary" 
                        className="px-8 h-14 text-base shadow-[0_0_30px_rgba(255,100,130,0.3)] hover:shadow-[0_0_50px_rgba(255,100,130,0.5)] border-0 ring-1 ring-white/50"
                    >
                        <Zap size={20} className="fill-black" />
                        دسترسی آنی
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth'})}
                        className="px-8 h-14 text-base border-white/10 hover:bg-white/5 hover:border-white/20"
                    >
                        بررسی سرویس‌ها
                        <ArrowLeft size={20} />
                    </Button>
                </motion.div>

                {/* Stats Cards - Redesigned as Trust Bar */}
                <motion.div 
                    variants={heroItemVariants}
                    className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10"
                >
                    {[
                        { val: "۸+", label: "ابزار هوش مصنوعی", icon: Cpu },
                        { val: "۱۰۰٪", label: "یکپارچگی ابزارها", icon: Layers },
                        { val: "۲۴/۷", label: "پشتیبانی فعال", icon: Activity },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center lg:items-start gap-2 group cursor-default">
                            <div className="flex items-center gap-3 text-white">
                                <div className="p-2 rounded-xl bg-white/5 text-gray-400 group-hover:text-luma-pink group-hover:bg-luma-pink/10 transition-all duration-300 ring-1 ring-white/5">
                                    <item.icon size={18} />
                                </div>
                                <span className="text-2xl lg:text-3xl font-bold tracking-tighter">{item.val}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-bold tracking-wide">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Right Column: Galaxy Animation */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
               <ServiceGalaxy />
            </div>
         </div>

         {/* Smooth Fade Transition */}
         <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-[#080808] pointer-events-none z-0" />
      </section>

      {/* --- SERVICE CATALOG (Bento Grid) --- */}
      <section id="catalog" className="py-24 bg-[#080808] border-y border-white/5 relative">
         <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-2">کاتالوگ سرویس‌ها</h2>
                   <p className="text-gray-400">همه ابزارهایی که برای خلق جادو نیاز دارید.</p>
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">همه</button>
                   <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white hover:border-white/30 transition-colors">خلق</button>
                   <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-gray-400 text-sm font-medium hover:text-white hover:border-white/30 transition-colors">ویرایش</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {SERVICES.map((service, index) => (
                  <ServiceGridItem key={service.id} service={service} index={index} />
               ))}
            </div>
         </div>
      </section>

      {/* --- WORKFLOWS --- */}
      <section className="py-32 bg-background relative overflow-hidden">
         {/* Center Line Decoration */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
         
         <div className="max-w-screen-2xl mx-auto px-4">
             {/* Section Header */}
             <div className="text-center mb-24 relative z-10">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-[#111] text-xs font-bold text-gray-300 mb-6"
               >
                  قدرت ترکیب
               </motion.div>
               <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">جریان‌های کاری هوشمند</h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  سرویس‌های لوما وقتی با هم ترکیب می‌شوند، قدرتی چند برابر پیدا می‌کنند.
                  <br className="hidden md:block" />
                  اینجا چند نمونه از نحوه استفاده حرفه‌ای‌ها را ببینید.
               </p>
             </div>

             <div className="space-y-32">
                 {/* Workflow 1: Store */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1 relative perspective-1000 group">
                        {/* Image Container */}
                        <div className="absolute inset-0 bg-luma-pink/10 blur-[120px] rounded-full opacity-60" />
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                           whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl z-10 bg-[#0a0a0a] aspect-[4/3]"
                        >
                            <StoreWorkflowAnim />
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.div
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5 }}
                        >
                           <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                              فروشگاه خود را <span className="text-luma-pink">متحول کنید</span>
                           </h3>
                           <p className="text-gray-400 text-lg mb-12 leading-loose border-r-2 border-white/10 pr-6">
                              از عکس‌های ساده محصول، تصاویر تبلیغاتی خیره‌کننده بسازید. بدون نیاز به استودیو، نورپردازی یا مدل واقعی، فروش خود را چند برابر کنید.
                           </p>
                        </motion.div>

                        <div className="space-y-2">
                           <WorkflowStep 
                              index={0} 
                              color="#FF6482"
                              step={{ icon: Scissors, title: "حذف خودکار پس‌زمینه", desc: "جداسازی محصول از پس‌زمینه با دقت مو." }} 
                           />
                           <WorkflowStep 
                              index={1} 
                              color="#FF6482"
                              step={{ icon: ImageIcon, title: "تولید محیط استودیویی", desc: "قرار دادن محصول در دکورهای حرفه‌ای و متنوع." }} 
                           />
                           <WorkflowStep 
                              index={2} 
                              color="#FF6482"
                              isLast
                              step={{ icon: Maximize2, title: "افزایش کیفیت تا 4K", desc: "خروجی نهایی با جزئیات خیره‌کننده برای چاپ." }} 
                           />
                        </div>
                    </div>
                 </div>

                 {/* Workflow 2: Content Creation */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="order-1">
                        <motion.div
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5 }}
                        >
                           <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                              تولید محتوا با <span className="text-luma-purple">سرعت نور</span>
                           </h3>
                           <p className="text-gray-400 text-lg mb-12 leading-loose border-r-2 border-white/10 pr-6">
                              ایده‌های خود را در چند دقیقه به ویدیوهای جذاب تبدیل کنید. مناسب برای اینستاگرام، یوتیوب و تیک‌تاک با کیفیت سینمایی.
                           </p>
                        </motion.div>

                        <div className="space-y-2">
                           <WorkflowStep 
                              index={0} 
                              color="#DA8FFF"
                              step={{ icon: Bot, title: "سناریو نویسی هوشمند", desc: "تولید ایده‌های خلاقانه و متن ویدیو." }} 
                           />
                           <WorkflowStep 
                              index={1} 
                              color="#DA8FFF"
                              step={{ icon: Video, title: "تبدیل متن به ویدیو", desc: "خلق سکانس‌های سینمایی از روی متن." }} 
                           />
                           <WorkflowStep 
                              index={2} 
                              color="#DA8FFF"
                              isLast
                              step={{ icon: Wand2, title: "اصلاح رنگ و نور", desc: "تنظیمات حرفه‌ای برای ظاهر سینمایی." }} 
                           />
                        </div>
                    </div>

                    <div className="order-2 relative perspective-1000 group">
                        <div className="absolute inset-0 bg-luma-purple/10 blur-[120px] rounded-full opacity-60" />
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                           whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl z-10 bg-[#0a0a0a] aspect-[4/3]"
                        >
                            <ContentWorkflowAnim />
                        </motion.div>
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
         <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">آماده خلق کردن هستید؟</h2>
             <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                به جمع ۱۰,۰۰۰+ کاربری بپیوندید که با لوما مرزهای خلاقیت را جابجا کرده‌اند.
                بدون نیاز به کارت اعتباری.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button externalHref="https://lumai.ir/dashboard" variant="primary" className="w-full sm:w-auto px-12 py-4 text-lg shadow-[0_0_40px_rgba(255,100,130,0.4)] hover:shadow-[0_0_60px_rgba(255,100,130,0.6)]">
                   شروع رایگان
                </Button>
                <Button externalHref="/pricing" variant="secondary" className="w-full sm:w-auto px-12 py-4 text-lg">
                   مشاهده تعرفه‌ها
                </Button>
             </div>
         </div>
      </section>

    </div>
  );
};

export default AllServicesPage;