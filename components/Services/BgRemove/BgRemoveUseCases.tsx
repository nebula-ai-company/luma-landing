import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Palette, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CASES = [
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: "عکاسی محصول",
    subtitle: "فروشگاه اینترنتی",
    desc: "محصولات خود را از پس‌زمینه جدا کنید و در کاتالوگ‌های حرفه‌ای قرار دهید.",
    color: "text-luma-yellow",
    bgGradient: "from-luma-yellow/20 to-transparent",
    image: ""
  },
  {
    id: 'design',
    icon: Palette,
    title: "طراحی گرافیک",
    subtitle: "طراحی خلاقانه",
    desc: "استخراج المان‌های گرافیکی، لوگو و آیکون بدون نیاز به Pen Tool.",
    color: "text-luma-pink",
    bgGradient: "from-luma-pink/20 to-transparent",
    image: ""
  },
  {
    id: 'content',
    icon: MessageCircle,
    title: "تولید محتوا",
    subtitle: "شبکه‌های اجتماعی",
    desc: "ساخت استیکر و تامنیل یوتیوب با کیفیت بالا و بدون دردسر برش دستی.",
    color: "text-luma-purple",
    bgGradient: "from-luma-purple/20 to-transparent",
    image: ""
  }
];

export const BgRemoveUseCases: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('ecommerce');
  const [isPaused, setIsPaused] = useState(false);
  const [customImages, setCustomImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        const response = await fetch('https://pb.lumai.ir/api/collections/background_removal/records?page=1&perPage=3&sort=-created');
        if (response.ok) {
          const result = await response.json();
          if (result && Array.isArray(result.items)) {
            const urls = result.items
              .filter((item: any) => item.result)
              .map((item: any) => `https://pb.lumai.ir/api/files/background_removal/${item.id}/${item.result}`);
            if (mounted) {
              setCustomImages(urls);
              setIsLoading(false);
            }
          } else {
            if (mounted) setIsLoading(false);
          }
        } else {
          if (mounted) setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch custom background_removal images for usecases:", err);
        if (mounted) setIsLoading(false);
      }
    };
    fetchImages();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveId(current => {
        const currentIndex = CASES.findIndex(c => c.id === current);
        const nextIndex = (currentIndex + 1) % CASES.length;
        return CASES[nextIndex].id;
      });
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      
      {/* --- Seamless Transition Fades (Smooth Corners) --- */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Soft Background Blend */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a] opacity-[0.03] dark:opacity-50" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-20">
         
         <div className="flex flex-col md:flex-row items-end justify-between mb-16 px-2 font-sans">
            <div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">کاربردهای بی‌پایان</h2>
                <p className="text-zinc-500 dark:text-gray-400 font-light">ابزاری ضروری برای هر کسی که با تصویر سر و کار دارد.</p>
            </div>
            {/* Auto-play Indicators */}
            <div className="hidden md:flex items-center gap-2">
                {CASES.map(c => (
                    <div 
                        key={c.id}
                        onClick={() => setActiveId(c.id)} 
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${activeId === c.id ? 'w-8 bg-zinc-850 dark:bg-white' : 'w-2 bg-zinc-300 dark:bg-white/20'}`}
                    />
                ))}
            </div>
         </div>

         {/* Interactive Accordion Layout */}
         <div 
            className="flex flex-col lg:flex-row h-[600px] lg:h-[500px] gap-4 font-sans"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
         >
            {CASES.map((item, idx) => {
               const isActive = activeId === item.id;
               const itemImage = customImages[idx];
               return (
                  <motion.div
                     key={item.id}
                     layout
                     onClick={() => setActiveId(item.id)}
                     className={`
                        relative rounded-[32px] overflow-hidden cursor-pointer border border-black/5 dark:border-white/5 transition-all duration-700 ease-[0.32,0.72,0,1]
                        ${isActive ? 'flex-[3] border-black/10 dark:border-white/20' : 'flex-1 hover:flex-[1.2] opacity-80 hover:opacity-100'}
                     `}
                  >
                     {/* Background Image with Parallax-like scaling */}
                     <motion.div 
                        className="absolute inset-0 bg-zinc-100 dark:bg-[#111]"
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ duration: 0.7 }}
                     >
                        {itemImage ? (
                           <img 
                              src={itemImage} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                           />
                        ) : (
                           <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.bgGradient} opacity-40 mix-blend-overlay`} />
                        
                        {/* Gradients for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-40" />
                     </motion.div>

                     {/* Top Right Subtitle - ALWAYS VISIBLE */}
                     <div className="absolute top-8 right-8 z-20">
                        <span className="text-white/90 font-bold text-lg tracking-wide drop-shadow-md">
                           {item.subtitle}
                        </span>
                     </div>

                     {/* Content Overlay */}
                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        
                        {/* Header Section */}
                        <motion.div layout className="flex items-center gap-4 mb-4">
                           <div className={`w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 ${isActive ? item.color : 'text-white'}`}>
                              <item.icon size={24} />
                           </div>
                           
                           {/* Only show title when active */}
                           {isActive && (
                              <motion.div 
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: 0.2 }}
                              >
                                 <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                              </motion.div>
                           )}
                        </motion.div>

                        {/* Expanded Description */}
                        <AnimatePresence>
                           {isActive && (
                              <motion.div
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: 'auto' }}
                                 exit={{ opacity: 0, height: 0 }}
                                 className="overflow-hidden"
                              >
                                 <p className="text-gray-300 text-lg leading-relaxed font-light mb-6 max-w-lg">
                                    {item.desc}
                                 </p>
                                 <Link to="/gallery" className="flex items-center gap-2 text-white text-sm font-bold border-b border-white/30 pb-1 hover:border-white transition-colors w-fit">
                                    نمونه کارها
                                    <ArrowUpRight size={14} />
                                 </Link>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </motion.div>
               );
            })}
         </div>
      </div>
    </section>
  );
};
