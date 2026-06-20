import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clapperboard, Megaphone, Share2, PenTool, 
  Sparkles, Heart, MessageCircle, ShoppingBag, 
  TrendingUp, Play, Music
} from 'lucide-react';

const USE_CASES = [
  {
    id: 'marketing',
    title: "تبلیغات و مارکتینگ",
    subtitle: "Commercial & Ads",
    desc: "تولید تیزرهای تجاری خیره‌کننده با هزینه کسری از روش‌های سنتی. محصول خود را در جذاب‌ترین حالت ممکن نمایش دهید.",
    icon: Megaphone,
    color: "#FF6482", // Pink
    bg: "bg-luma-pink",
    image: ""
  },
  {
    id: 'social',
    title: "شبکه‌های اجتماعی",
    subtitle: "Viral Content",
    desc: "محتوای وایرال برای اینستاگرام و تیک‌تاک. الگوریتم‌ها عاشق ویدیوهای خلاقانه و باکیفیت شما خواهند شد.",
    icon: Share2,
    color: "#DA8FFF", // Purple
    bg: "bg-luma-purple",
    image: ""
  },
  {
    id: 'concept',
    title: "ایده‌پردازی و کانسپت",
    subtitle: "Pre-visualization",
    desc: "قبل از ساخت دکورهای گران‌قیمت، ایده‌های خود را تصویرسازی کنید. ابزاری ضروری برای کارگردانان و طراحان.",
    icon: PenTool,
    color: "#FFB340", // Yellow
    bg: "bg-luma-yellow",
    image: ""
  },
  {
    id: 'film',
    title: "فیلمسازی مستقل",
    subtitle: "Cinematic Production",
    desc: "خلق لوکیشن‌های غیرممکن و جلوه‌های ویژه هالیوودی. داستان خود را بدون محدودیت بودجه روایت کنید.",
    icon: Clapperboard,
    color: "#DA8FFF", // Purple
    bg: "bg-luma-purple",
    image: ""
  }
];

// --- Sophisticated Visual Components ---

interface VisualProps {
  imgSrc?: string;
  isLoading?: boolean;
}

const MarketingVisual: React.FC<VisualProps> = ({ imgSrc, isLoading }) => (
  <div className="relative w-full h-full flex items-center justify-center font-sans p-4">
     <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-[300px] bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-xl border border-zinc-200/60 dark:border-zinc-800 transition-colors duration-300"
     >
        {/* Image Area */}
        <div className="relative h-[260px] bg-zinc-50 dark:bg-zinc-950/50 flex items-center justify-center overflow-hidden transition-colors duration-300">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6482]/10 to-[#DA8FFF]/10 opacity-70" />
            
            {/* Floating Badge */}
            <div className="absolute top-5 right-5 z-20">
               <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md pl-3 pr-2 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 flex items-center gap-2 shadow-sm transition-colors duration-300">
                  <div className="flex flex-col items-end">
                     <span className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-none mb-0.5">نرخ تبدیل</span>
                     <span className="text-[10px] font-bold text-emerald-600 leading-none dir-ltr">+۱۲۴٪</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                     <TrendingUp size={14} />
                  </div>
               </div>
            </div>

            {/* Poster / Shoe Image */}
            {isLoading || !imgSrc ? (
               <div className="w-[80%] h-[160px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-xl relative z-10 rotate-[-15deg] translate-y-4 shadow-md" />
            ) : (
               <motion.img 
                  src={imgSrc}
                  className="w-[80%] h-[160px] object-cover relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.12)] rotate-[-15deg] translate-y-4 rounded-xl"
                  animate={{ y: [16, 6, 16] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  alt="Marketing Visual"
                  referrerPolicy="no-referrer"
                />
            )}
        </div>

        {/* Content Area */}
        <div className="p-6 pt-5">
           <div className="flex justify-between items-end mb-6">
              <div className="text-right">
                 <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">پوستر تبلیغاتی</h3>
                 <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 transition-colors duration-300">کمپین هوشمند لوما</p>
              </div>
              <span className="text-2xl font-black text-[#FF4D6D] tracking-tight">$۱۲۹</span>
           </div>

           <button className="w-full h-12 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-805 dark:hover:bg-zinc-700 text-white dark:text-zinc-100 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 group">
              <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>خرید آنی</span>
           </button>
        </div>
     </motion.div>
  </div>
);

const SocialVisual: React.FC<VisualProps> = ({ imgSrc, isLoading }) => (
  <div className="relative w-full h-full flex items-center justify-center font-sans">
     {/* Phone Frame */}
     <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[280px] h-[520px] bg-[#000] rounded-[2.5rem] border-[6px] border-[#1a1a1a] relative overflow-hidden shadow-2xl flex flex-col"
     >
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
            {isLoading || !imgSrc ? (
               <div className="w-full h-full bg-zinc-800 animate-pulse" />
            ) : (
                <img 
                   src={imgSrc} 
                   className="w-full h-full object-cover opacity-50" 
                   alt="Video Background"
                   referrerPolicy="no-referrer"
                />
            )}
            <div className="absolute inset-0 bg-black/40" /> {/* Dimmer */}
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 flex justify-between px-6 items-center z-30">
           <span className="text-[10px] text-white font-bold tracking-widest">9:41</span>
           <div className="flex gap-1">
              <div className="w-4 h-1.5 rounded-full bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
           </div>
        </div>

        {/* Main Content Area - Center Play Button */}
        <div className="flex-1 relative flex items-center justify-center z-10">
            {/* 3D Glossy Play Button */}
            <motion.div
               initial={{ scale: 0.8, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className="relative w-28 h-20 bg-gradient-to-br from-[#E62E2E] to-[#800000] rounded-2xl flex items-center justify-center shadow-[0_15px_40px_rgba(230,0,0,0.25)] group cursor-pointer border-t border-white/20"
            >
                {/* Glossy Highlights */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                
                {/* Play Triangle */}
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1 drop-shadow-md opacity-90" />
            </motion.div>

            {/* Subtle Ambient Glow behind button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-600/10 blur-[50px] pointer-events-none" />
        </div>

        {/* Right Sidebar Actions */}
        <div className="absolute right-2 bottom-44 flex flex-col gap-4 items-center z-20">
            {/* Heart */}
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-lg border border-white/5">
                    <Heart size={20} className="text-luma-pink fill-luma-pink drop-shadow-lg" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-md">24K</span>
            </div>
            {/* Comment */}
            <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/5">
                    <MessageCircle size={20} className="text-white drop-shadow-lg" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-md">1.2K</span>
            </div>
            {/* Share */}
            <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/5">
                    <Share2 size={20} className="text-white drop-shadow-lg" />
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-md">اشتراک</span>
            </div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full border border-white/20 p-0.5 bg-black">
                    <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white shadow-black drop-shadow-sm">LumaCreator</span>
                        <div className="bg-white/10 backdrop-blur px-2 py-0.5 rounded border border-white/10 text-[8px] text-white font-medium">دنبال کردن</div>
                    </div>
                </div>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed line-clamp-2 dir-rtl text-right drop-shadow-md w-[85%]">
                ساخت این ویدیو با هوش مصنوعی فقط ۵ ثانیه طول کشید! 🤯 <span className="font-bold text-white">#LumaAI</span>
            </p>
            
            {/* Music Marquee */}
            <div className="flex items-center gap-2 mt-3 opacity-80">
                <Music size={12} className="text-white" />
                <div className="text-[10px] text-white overflow-hidden w-40 whitespace-nowrap">
                    صدا اصلی - هوش مصنوعی لوما
                </div>
            </div>
        </div>

     </motion.div>
  </div>
);

const ConceptVisual: React.FC<VisualProps> = ({ imgSrc, isLoading }) => (
  <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/40 transition-colors duration-300">
     <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/85 shadow-lg transition-colors duration-300">
        {/* Wireframe Layer (Bottom) */}
        <div className="absolute inset-0 bg-white dark:bg-zinc-950 transition-colors duration-300">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <PenTool size={64} className="text-zinc-300 dark:text-zinc-700/60 transition-colors duration-300" />
           </div>
           <span className="absolute top-4 left-4 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 transition-colors duration-300 px-2 py-1 rounded">حالت وایرفریم</span>
        </div>

        {/* Real Image Layer (Revealed) */}
        <motion.div 
           className="absolute inset-0 z-10"
           initial={{ clipPath: "inset(0 100% 0 0)" }}
           animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        >
           {isLoading || !imgSrc ? (
              <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
           ) : (
              <img 
                 src={imgSrc} 
                 className="w-full h-full object-cover" 
                 alt="Render" 
                 referrerPolicy="no-referrer"
              />
           )}
           <span className="absolute top-4 left-4 text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-white/90 dark:bg-zinc-950/90 backdrop-blur px-2 py-1 rounded border border-amber-200/85 dark:border-amber-900/50 transition-colors duration-300">پیش‌نمایش رندر</span>
        </motion.div>

        {/* Scan Line */}
        <motion.div 
           className="absolute top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_20px_#FFB340] z-20"
           animate={{ left: ["0%", "100%", "0%"] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
     </div>
  </div>
);

const FilmVisual: React.FC<VisualProps> = ({ imgSrc, isLoading }) => (
  <div className="relative w-full h-full bg-black flex flex-col justify-center overflow-hidden">
     {/* Cinema Image */}
     <div className="relative w-full aspect-[21/9]">
        {isLoading || !imgSrc ? (
           <div className="absolute inset-0 bg-zinc-200/60 dark:bg-zinc-800/65 animate-pulse" />
        ) : (
           <img 
              src={imgSrc} 
              className="w-full h-full object-cover opacity-80"
              alt="Cinema"
              referrerPolicy="no-referrer"
           />
        )}
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

        {/* Camera UI Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
           {/* Top UI */}
           <div className="flex justify-between items-start">
              <div className="flex gap-4 text-xs font-mono text-white/80">
                 <span className="border border-white/30 px-1 rounded">REC</span>
                 <span>TC 00:14:22:08</span>
              </div>
              <div className="flex gap-4 text-xs font-mono text-white/80">
                 <span>ISO 800</span>
                 <span>WB 5600K</span>
                 <span>4K UHD</span>
              </div>
           </div>

           {/* Center Crosshair */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 flex items-center justify-center">
              <div className="w-1 h-1 bg-luma-pink rounded-full shadow-[0_0_5px_#FF6482]" />
           </div>

           {/* Safe Area Markers */}
           <div className="absolute inset-8 border border-white/20 border-dashed opacity-50" />

           {/* Bottom UI */}
           <div className="flex justify-between items-end">
              <div className="flex gap-2">
                 <div className="w-32 h-16 bg-gradient-to-t from-green-500/20 to-transparent border-b border-green-500/50" />
                 <div className="w-32 h-16 bg-gradient-to-t from-red-500/20 to-transparent border-b border-red-500/50" />
              </div>
              <div className="text-xs font-mono font-bold tracking-wider shadow-black drop-shadow-md">
                 <span className="text-luma-purple">لرزشگیر هوشمند: </span>
                 <span className="text-white">فعال</span>
              </div>
           </div>
        </div>
     </div>
  </div>
);

// --- Main Component ---

export const VideoUseCases: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [posters, setPosters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPosters = async () => {
      try {
        const res = await fetch('https://pb.lumai.ir/api/collections/video_generation/records?page=1&perPage=12&sort=-created');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.items)) {
            const validPosters = data.items
              .filter((item: any) => item.poster)
              .map((item: any) => `https://pb.lumai.ir/api/files/video_generation/${item.id}/${item.poster}`);
            
            if (isMounted) {
              setPosters(validPosters);
              setIsLoading(false);
            }
          } else {
            if (isMounted) setIsLoading(false);
          }
        } else {
          if (isMounted) setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch posters:", err);
        if (isMounted) setIsLoading(false);
      }
    };
    fetchPosters();
    return () => {
      isMounted = false;
    };
  }, []);

  const dynamicUseCases = USE_CASES.map((item, idx) => ({
    ...item,
    image: (posters && posters[idx]) ? posters[idx] : ""
  }));

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dynamicUseCases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, activeIndex, dynamicUseCases.length]);

  return (
    <section className="py-32 bg-[#F9F7F4] dark:bg-[#0a0a0a] relative overflow-hidden font-sans transition-colors duration-300">
        
        {/* --- Top Gradient Fade --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#F9F7F4] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* --- Bottom Gradient Fade --- */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F9F7F4] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/20 dark:bg-indigo-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/15 dark:bg-rose-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 transition-colors duration-300" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.012]" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-150 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm transition-colors duration-300"
                >
                    <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-[10px] font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-widest">کاربردهای هوش مصنوعی</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors">
                    خلاقیت <span className="text-gradient-animated">بی‌مرز</span>
                </h2>
                <p className="text-zinc-650 dark:text-zinc-400 text-lg font-light leading-relaxed transition-colors duration-300">
                    از تبلیغات تجاری تا پروژه‌های هنری شخصی، ویدیو هوش مصنوعی لوما به شما قدرت می‌دهد تا هر آنچه در ذهن دارید را به تصویر بکشید.
                </p>
            </div>

            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:h-[600px]">
                
                {/* --- Visual Canvas (Left in RTL) --- */}
                <motion.div 
                   className="lg:w-3/5 order-1 lg:order-2 h-[450px] lg:h-full relative rounded-[32px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl transition-colors duration-300"
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                 >
                    {/* Top Bar Decoration */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-zinc-50 dark:from-zinc-900 to-transparent z-30 flex items-center justify-between px-6 pointer-events-none">
                       <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                       </div>
                       <div className="px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-1.5 shadow-sm">
                          حالت پیش‌نمایش
                       </div>
                    </div>

                    <AnimatePresence mode="wait">
                       <motion.div
                          key={dynamicUseCases[activeIndex].id}
                          className="w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                       >
                          {activeIndex === 0 && <MarketingVisual imgSrc={posters[0]} isLoading={isLoading} />}
                          {activeIndex === 1 && <SocialVisual imgSrc={posters[1]} isLoading={isLoading} />}
                          {activeIndex === 2 && <ConceptVisual imgSrc={posters[2]} isLoading={isLoading} />}
                          {activeIndex === 3 && <FilmVisual imgSrc={posters[3]} isLoading={isLoading} />}
                       </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* --- Navigation Dashboard (Right in RTL) --- */}
                <div 
                   className="lg:w-2/5 order-2 lg:order-1 flex flex-col justify-center gap-4"
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                >
                   {dynamicUseCases.map((item, idx) => {
                      const isActive = activeIndex === idx;
                      return (
                         <div 
                            key={item.id}
                            onClick={() => setActiveIndex(idx)}
                            className="relative group cursor-pointer"
                         >
                            {/* Card Wrapper - Border Removed */}
                            <div className={`relative rounded-[20px] p-5 h-full overflow-hidden transition-all duration-300
                                ${isActive ? 'bg-white dark:bg-zinc-900 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.06)] border border-zinc-200/60 dark:border-zinc-800/80' : 'bg-transparent hover:bg-zinc-100/50 hover:dark:bg-zinc-900/40 border border-transparent'}
                            `}>
                                    
                                {/* Ambient Inner Glow (Active only) */}
                                {isActive && (
                                    <div 
                                        className="absolute inset-0 opacity-[0.06] pointer-events-none transition-opacity duration-500 rounded-[20px]"
                                        style={{ background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)` }}
                                    />
                                )}

                                <div className="flex gap-5 relative z-10">
                                    {/* Icon Box */}
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                                        ${isActive 
                                            ? `text-white` 
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-650 group-hover:dark:text-zinc-300 group-hover:bg-zinc-200/50 group-hover:dark:bg-zinc-800/80'
                                        }
                                    `} style={isActive ? { backgroundColor: `${item.color}15`, color: item.color } : {}}>
                                        <item.icon size={24} />
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-850 group-hover:dark:text-zinc-250'}`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed mt-2 pl-2 transition-colors duration-300">
                                                        {item.desc}
                                                    </p>
                                                    
                                                    {/* Action Link */}
                                                    <div className="mt-4 flex items-center gap-2 text-xs font-bold transition-colors hover:opacity-85 cursor-pointer w-fit" style={{ color: item.color }}>
                                                        <Play size={10} fill="currentColor" />
                                                        <span>مشاهده نمونه‌ها</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                         </div>
                      );
                   })}
                </div>

            </div>
        </div>
    </section>
  );
};
