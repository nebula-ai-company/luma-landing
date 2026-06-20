import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, History, Zap, ScanLine, Maximize, Sparkles } from 'lucide-react';

const INITIAL_FEATURES = [
  {
    id: 'details',
    icon: ScanLine,
    title: "بازیابی کریستالی جزئیات",
    subtitle: "بازسازی بافت‌های از دست رفته",
    desc: "تکنولوژی Crystal پیکسل‌ها را فقط بزرگ نمی‌کند، بلکه بافت‌های از دست رفته (مثل منافذ پوست یا تار و پود پارچه) را با هوش مصنوعی بازسازی می‌کند.",
    color: "#DA8FFF", // luma-purple
    bgGradient: "from-luma-purple/20 to-transparent",
    imgBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop&blur=20",
    imgAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 'fix',
    icon: Zap,
    title: "اصلاح خروجی هوش مصنوعی",
    subtitle: "ترمیم چهره و دست دفرمه",
    desc: "اگر تصاویر تولید شده با میدجورنی یا دیگر ابزارها دارای چهره‌های دفرمه یا جزئیات کم هستند، این ابزار آن‌ها را به سطح 4K و بی‌نقص می‌رساند.",
    color: "#FF6482", // luma-pink
    bgGradient: "from-luma-pink/20 to-transparent",
    imgBefore: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop&blur=10",
    imgAfter: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 'restore',
    icon: History,
    title: "زنده کردن خاطرات قدیمی",
    subtitle: "رنگ‌دهی و حذف نویز و خش",
    desc: "عکس‌های قدیمی، پاره یا خش‌دار خانوادگی را اسکن کنید و نسخه‌ای شفاف، بدون نویز و (در صورت تمایل) رنگی از آن‌ها تحویل بگیرید.",
    color: "#FFB340", // luma-yellow
    bgGradient: "from-luma-yellow/20 to-transparent",
    imgBefore: "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?q=80&w=600&auto=format&fit=crop&grayscale",
    imgAfter: "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 'print',
    icon: Printer,
    title: "آماده‌سازی برای چاپ غول‌پیکر",
    subtitle: "افزایش رزولوشن تا 10K",
    desc: "عکس‌های موبایلی یا کراپ‌شده را برای چاپ در ابعاد بزرگ آماده کنید. الگوریتم ما با افزایش دقیق DPI و بازسازی لبه‌ها، خروجی بی‌نقصی برای چاپ روی شاسی، بنر و بیلبورد ارائه می‌دهد.",
    color: "#DA8FFF", // luma-purple (Reused to maintain brand palette)
    bgGradient: "from-luma-purple/20 to-transparent",
    imgBefore: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop",
    imgAfter: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop"
  }
];

export const UpscaleFeatures: React.FC = () => {
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch API Data
  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
        try {
            const response = await fetch('https://pb.lumai.ir/api/collections/upscale/records?page=1&perPage=10&sort=-created');
            if (!response.ok) return;
            const data = await response.json();
            const items = data.items || [];
            
            // Skip the first image (index 0) as it is used in the Hero section
            // Take the next available images
            const newImages = items.slice(1, 4 + 1); 

            if (newImages.length > 0 && isMounted) {
                setFeatures(prev => prev.map((feature, idx) => {
                    const item = newImages[idx];
                    if (item && item.result && item.before) {
                        return {
                            ...feature,
                            imgBefore: `https://pb.lumai.ir/api/files/upscale/${item.id}/${item.before}`,
                            imgAfter: `https://pb.lumai.ir/api/files/upscale/${item.id}/${item.result}`
                        };
                    }
                    return feature;
                }));
            }
        } catch (e) {
            console.error("Failed to fetch upscale images for features", e);
        }
    };
    
    fetchImages();
    return () => { isMounted = false; };
  }, []);

  // Auto-rotate features if not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering, features.length]);

  const activeFeature = features[activeIdx];

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
       
       {/* Seamless Top Fade */}
       <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] via-[#FAFAFA]/90 dark:via-[#0a0a0a]/90 to-transparent z-20 pointer-events-none transition-colors duration-300" />

       {/* Background Ambience */}
       <div className="absolute inset-0 pointer-events-none">
          <motion.div 
             key={activeFeature.id}
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.04 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
             className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] transition-colors duration-1000"
             style={{ backgroundColor: activeFeature.color }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
       </div>
       
       {/* Content */}
       <div className="max-w-screen-2xl mx-auto px-6 relative z-30">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center">
             
             {/* --- LEFT COLUMN: Feature Selection List --- */}
             <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                <div className="mb-12">
                   <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">
                      فراتر از <span className="text-gradient-animated">یک فیلتر ساده</span>
                   </h2>
                   <p className="text-zinc-650 dark:text-gray-300 text-lg font-light leading-relaxed">
                      ابزارهای تخصصی ما هر کدام برای سناریوی خاصی آموزش دیده‌اند تا بهترین نتیجه ممکن را ارائه دهند.
                   </p>
                </div>

                <div 
                   className="space-y-4"
                   onMouseEnter={() => setIsHovering(true)}
                   onMouseLeave={() => setIsHovering(false)}
                >
                   {features.map((item, idx) => {
                      const isActive = activeIdx === idx;
                      return (
                         <motion.div 
                            layout
                            key={item.id}
                            onClick={() => setActiveIdx(idx)}
                            className={`
                               group relative cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden border
                               ${isActive 
                                  ? 'bg-white dark:bg-[#121212] border-zinc-200 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] dark:shadow-2xl' 
                                  : 'bg-transparent border-transparent hover:bg-white/40 dark:hover:bg-white/[0.03] hover:border-zinc-200/40 dark:hover:border-white/5'
                               }
                            `}
                         >
                            {/* Active Accent Bar (Right Side) */}
                            {isActive && (
                               <motion.div 
                                  layoutId="activeBar"
                                  className="absolute right-0 top-0 bottom-0 w-1.5"
                                  style={{ backgroundColor: item.color }}
                                  transition={{ duration: 0.3 }}
                               />
                            )}

                            <div className="p-6 flex items-start gap-5">
                               {/* Icon Box */}
                               <div 
                                  className={`
                                     relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0
                                     ${isActive 
                                        ? 'bg-zinc-100 dark:bg-[#1a1a1a] border-zinc-200/60 dark:border-white/10' 
                                        : 'bg-zinc-200/20 dark:bg-white/5 border-zinc-200/10 dark:border-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-800 dark:group-hover:text-gray-200'
                                     }
                                  `}
                                  style={isActive ? { color: item.color, borderColor: `${item.color}40` } : {}}
                               >
                                  <item.icon size={26} />
                               </div>

                               {/* Text Content */}
                               <div className="flex-1 pt-1.5">
                                  <div className="flex items-center justify-between mb-2">
                                     <h3 className={`text-xl font-bold transition-all duration-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-white dark:mix-blend-overlay opacity-80 group-hover:opacity-100'}`}>
                                        {item.title}
                                     </h3>
                                  </div>
                                  
                                  {/* Fixed height container to prevent layout shifts */}
                                  <div className="relative">
                                     <motion.div
                                        initial={false}
                                        animate={{ height: isActive ? 84 : 24 }} // 84px for roughly 3 lines of text, 24px for subtitle
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="relative overflow-hidden"
                                     >
                                        <AnimatePresence initial={false}>
                                           {isActive ? (
                                              <motion.div
                                                 key="desc"
                                                 initial={{ opacity: 0, y: 5 }}
                                                 animate={{ opacity: 1, y: 0 }}
                                                 exit={{ opacity: 0, y: -5 }}
                                                 transition={{ duration: 0.2, delay: 0.1 }}
                                                 className="absolute top-0 left-0 right-0"
                                              >
                                                 <p className="text-base text-zinc-650 dark:text-gray-350 leading-7 font-light line-clamp-3">
                                                    {item.desc}
                                                 </p>
                                              </motion.div>
                                           ) : (
                                              <motion.div 
                                                 key="subtitle"
                                                 initial={{ opacity: 0, y: -5 }}
                                                 animate={{ opacity: 1, y: 0 }}
                                                 exit={{ opacity: 0, y: 5 }}
                                                 transition={{ duration: 0.2 }}
                                                 className="absolute top-0 left-0 right-0"
                                              >
                                                  <p className="text-sm text-zinc-500 dark:text-white dark:mix-blend-overlay opacity-60 group-hover:opacity-100 transition-opacity truncate">
                                                     {item.subtitle}
                                                  </p>
                                              </motion.div>
                                           )}
                                        </AnimatePresence>
                                     </motion.div>
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                      );
                   })}
                </div>
             </div>

             {/* --- RIGHT COLUMN: Visualizer Viewport --- */}
             <div className="lg:col-span-7 order-1 lg:order-2 h-[400px] lg:h-[500px] relative">
                
                {/* The "Monitor" Frame */}
                <motion.div 
                   className="w-full h-full rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#050505] shadow-xl dark:shadow-2xl relative group"
                   style={{ boxShadow: `0 0 60px -20px ${activeFeature.color}20` }}
                >
                   {/* Top Bar */}
                   <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-30 flex items-center justify-between px-6">
                      <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                         <Maximize size={14} className="text-gray-400" />
                         <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">پیش‌نمایش زنده</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                         <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                   </div>

                   <AnimatePresence mode="wait">
                      <motion.div
                         key={activeFeature.id}
                         className="absolute inset-0 w-full h-full"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.5 }}
                      >
                         {/* 1. Low Res Background (Always visible as base) */}
                         <img 
                            src={activeFeature.imgBefore} 
                            alt="Before" 
                            className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-105 opacity-50"
                         />
                         
                         {/* 2. Before Image (Left Side - The 'Original' Low Quality one) */}
                         <div className="absolute inset-0 bg-[#050505]">
                            <img 
                               src={activeFeature.imgBefore} 
                               alt="Before" 
                               className="absolute inset-0 w-full h-full object-cover"
                            />
                            
                            {/* Label */}
                            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white/70 border border-white/10 shadow-lg">
                               تصویر اصلی
                            </div>
                         </div>

                         {/* 3. After Image (Revealed by Mask - The 'Result' High Quality one) */}
                         <motion.div 
                            className="absolute inset-0 z-10 overflow-hidden"
                            initial={{ clipPath: "inset(0 100% 0 0)" }} // Start hidden (masked from right)
                            animate={{ clipPath: "inset(0 0% 0 0)" }}   // Reveal fully
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                         >
                            <img 
                               src={activeFeature.imgAfter} 
                               alt="After" 
                               className="absolute inset-0 w-full h-full object-cover"
                            />
                            
                            {/* Label */}
                            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-black shadow-lg flex items-center gap-2">
                               <Sparkles size={12} className="text-black" />
                               خروجی لوما
                            </div>
                         </motion.div>

                         {/* 4. Scanning Line */}
                         {/* Runs once along with the reveal */}
                         <motion.div 
                            className="absolute top-0 bottom-0 w-[2px] z-20 bg-white shadow-[0_0_25px_rgba(255,255,255,1)]"
                            style={{ backgroundColor: activeFeature.color }}
                            initial={{ left: "100%", opacity: 1 }}
                            animate={{ left: "-5%", opacity: [1, 1, 0] }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                         >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white opacity-50" />
                            <div className="absolute top-0 bottom-0 -left-12 w-12 bg-gradient-to-r from-transparent to-black/30" />
                         </motion.div>

                         {/* Grid Overlay */}
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay z-20 pointer-events-none" />
                      </motion.div>
                   </AnimatePresence>

                </motion.div>
             </div>

          </div>
       </div>

       {/* Seamless Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] via-[#FAFAFA]/90 dark:via-[#0a0a0a]/90 to-transparent z-20 pointer-events-none transition-colors duration-300" />
    </section>
  );
};
