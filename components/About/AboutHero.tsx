
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, Video, MessageSquare, Wand2, 
  Scissors, Maximize2, Shirt, Bot, ArrowLeft
} from 'lucide-react';
import NeuralBackground from '../ui/flow-field-background';
import { useTheme } from '../../lib/ThemeContext';

const SERVICES = [
  { 
    id: 'img-gen', 
    title: 'تولید تصویر', 
    desc: 'تبدیل متن به تصاویر هنری خیره‌کننده با کیفیت 8K', 
    icon: ImageIcon, 
    color: '#FF6482', // Pink
    path: '/service/img-gen',
  },
  { 
    id: 'video', 
    title: 'ساخت ویدیو', 
    desc: 'خلق ویدیوهای سینمایی و متحرک‌سازی تصاویر', 
    icon: Video, 
    color: '#DA8FFF', // Purple
    path: '/service/video',
  },
  { 
    id: 'chat', 
    title: 'چت هوشمند', 
    desc: 'دستیار هوشمند با قابلیت تحلیل و کدنویسی', 
    icon: MessageSquare, 
    color: '#FFB340', // Yellow
    path: '/service/chat',
  },
  { 
    id: 'edit', 
    title: 'ویرایش جادویی', 
    desc: 'حذف و اضافه اشیاء با دستور متنی', 
    icon: Wand2, 
    color: '#FF6482', // Pink (reused)
    path: '/service/img-edit',
  },
  { 
    id: 'remove', 
    title: 'حذف پس‌زمینه', 
    desc: 'جداسازی سوژه با دقت مو', 
    icon: Scissors, 
    color: '#DA8FFF', // Purple (reused)
    path: '/service/bg-remove',
  },
  { 
    id: 'upscale', 
    title: 'افزایش کیفیت', 
    desc: 'بازسازی جزئیات تا ۴ برابر', 
    icon: Maximize2, 
    color: '#FFB340', // Yellow (reused)
    path: '/service/upscale',
  },
  { 
    id: 'try-on', 
    title: 'پرو مجازی', 
    desc: 'تست لباس روی مانکن', 
    icon: Shirt, 
    color: '#FF6482', // Pink (reused)
    path: '/service/try-on',
  },
  { 
    id: 'assistant', 
    title: 'دستیار شخصی', 
    desc: 'مدیریت کارها و تحلیل داده', 
    icon: Bot, 
    color: '#DA8FFF', // Purple (reused)
    path: '/service/assistant',
  },
];

export const AboutHero: React.FC = () => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldAnimateAmbient = !shouldReduceMotion && isInView;

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] pt-20 transition-colors duration-300"
    >
      
      {/* Background Ambience & Neural Network */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground 
            color={theme === 'dark' ? '#FFFFFF' : '#1e1b4b'} 
            trailOpacity={theme === 'dark' ? 0.2 : 0.08}
            speed={0.3} 
            particleCount={isMobile ? 250 : 1200}
            isPaused={!isInView}
        />
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/40 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/40 to-transparent pointer-events-none z-20" />
      </div>

      {/* Separate One-Time Content Entrance Wrapper */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[1000px] h-[1000px] flex items-center justify-center scale-75 md:scale-90 lg:scale-100 z-10"
      >
        
        {/* --- Central Core (Logo with Movement) --- */}
        <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
               animate={shouldAnimateAmbient ? {
                  x: [0, 30, -25, 15, -30, 0],
                  y: [0, -20, 30, -15, 20, 0],
                  scale: [1, 1.08, 0.92, 1.1, 0.96, 1],
                  rotate: [0, 1.5, -1.5, 1, -1, 0]
               } : false}
               transition={{
                  duration: 35,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
               }}
               className="relative w-[500px] h-[200px] flex items-center justify-center origin-center"
            >
               {/* --- Professional Animated 3-Color Glow --- */}
               <div className="absolute inset-0 flex items-center justify-center z-0">
                  <motion.div 
                     className="w-[85%] h-[60%] blur-[50px] opacity-60 rounded-full"
                     style={{
                        background: 'linear-gradient(90deg, #DA8FFF, #FF6482, #FFB340, #DA8FFF)',
                        backgroundSize: '200% 200%'
                     }}
                     animate={shouldAnimateAmbient ? { 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        scale: [1, 1.1, 1]
                     } : false}
                     transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "linear" 
                     }}
                  />
               </div>

               <img 
                  src="https://lumai.ir/logo-en.svg" 
                  alt="Luma AI"
                  className="w-full h-full object-contain brightness-0 dark:invert opacity-90 dark:opacity-90 relative z-10 drop-shadow-2xl"
               />
            </motion.div>
        </div>

        {/* --- Orbiting Icons System --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {SERVICES.map((item, index) => {
             const isItemHovered = hoveredServiceId === item.id;
             const angleStep = 360 / SERVICES.length;
             const initialAngle = index * angleStep;
             const orbitDuration = 120; 
             const armRadius = isMobile ? 360 : 500;

             return (
                <motion.div
                   key={item.id}
                   className="absolute inset-0"
                   initial={{ rotate: initialAngle }}
                   animate={shouldAnimateAmbient ? { rotate: initialAngle + 360 } : { rotate: initialAngle }}
                   transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
                >
                   {/* The Arm (Radius + Breathing) */}
                   <motion.div
                      className="absolute top-1/2 left-1/2 w-0 h-0"
                      initial={{ x: armRadius }} 
                      animate={shouldAnimateAmbient ? { 
                         x: [armRadius, armRadius + 30, armRadius - 20, armRadius], 
                         y: [0, 30, -30, 0] 
                      } : { x: armRadius, y: 0 }}
                      transition={{ 
                         duration: 15 + (index % 3) * 5, 
                         repeat: Infinity, 
                         ease: "easeInOut",
                         delay: index * 0.5 
                      }}
                   >
                      {/* Counter-Rotate Container */}
                      <motion.div
                         className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                         initial={{ rotate: -initialAngle }}
                         animate={shouldAnimateAmbient ? { rotate: -(initialAngle + 360) } : { rotate: -initialAngle }}
                         transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
                      >
                         {/* Anchor Container */}
                         <div 
                            className="relative flex items-center justify-center w-28 h-28"
                            onMouseEnter={() => setHoveredServiceId(item.id)}
                            onMouseLeave={() => setHoveredServiceId(null)}
                         >
                            <AnimatePresence mode="wait">
                               {isItemHovered ? (
                                  /* EXPANDED CARD STATE */
                                  <motion.div
                                     key="card"
                                     className="absolute z-50 w-[320px] origin-center"
                                     style={{ 
                                        left: '50%', top: '50%', 
                                        x: '-50%', y: '-50%'
                                     }}
                                     initial={{ scale: 0.5, opacity: 0 }}
                                     animate={{ scale: 1, opacity: 1 }}
                                     exit={{ scale: 0.5, opacity: 0 }}
                                     transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                  >
                                     <Link to={item.path} className="block relative w-full group">
                                        <div className="relative bg-white dark:bg-[#0c0c0e] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
                                            
                                            {/* Dynamic Border Gradient Effect */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ background: `radial-gradient(400px circle at 50% 0%, ${item.color}30, transparent 40%)` }}
                                            />

                                            <div className="relative p-8">
                                                {/* Ambient Background Glow */}
                                                <div 
                                                    className="absolute top-[-20%] inset-x-0 h-[200px] opacity-20 pointer-events-none blur-[60px]"
                                                    style={{ background: `radial-gradient(circle at top, ${item.color}, transparent 70%)` }}
                                                />
                                                
                                                {/* Header: Icon */}
                                                <div className="flex justify-between items-start mb-6 relative z-10">
                                                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-md dark:shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <item.icon size={28} style={{ color: item.color }} />
                                                    </div>
                                                </div>

                                                {/* Body: Text */}
                                                <div className="mb-6 relative z-10 text-right dir-rtl">
                                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-850 dark:group-hover:text-gray-100 transition-colors">
                                                       {item.title}
                                                    </h3>
                                                    <p className="text-sm text-zinc-500 dark:text-gray-400 leading-relaxed font-light line-clamp-3">
                                                       {item.desc}
                                                    </p>
                                                </div>

                                                {/* Footer: Action */}
                                                <div className="pt-6 border-t border-zinc-150 dark:border-white/5 flex items-center justify-between relative z-10">
                                                     <div className="flex items-center gap-2">
                                                         <span 
                                                           className="text-sm font-bold transition-all duration-300"
                                                           style={{ color: item.color }}
                                                         >
                                                           مشاهده جزئیات
                                                         </span>
                                                     </div>
                                                     <div 
                                                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 border-transparent text-black scale-110"
                                                        style={{ backgroundColor: item.color }}
                                                     >
                                                        <ArrowLeft size={16} className="-translate-x-0.5" />
                                                     </div>
                                                 </div>
                                            </div>
                                        </div>
                                     </Link>
                                  </motion.div>
                               ) : (
                                  /* IDLE ICON STATE */
                                  <motion.div 
                                     key="icon"
                                     className="absolute w-28 h-28 rounded-[32px] bg-white/60 dark:bg-[#121212]/20 backdrop-blur-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center shadow-xl dark:shadow-2xl cursor-pointer group origin-center"
                                     style={{ 
                                        boxShadow: theme === 'dark' ? `0 0 30px -10px ${item.color}20` : `0 10px 30px -10px ${item.color}30`,
                                        left: '50%', top: '50%', x: '-50%', y: '-50%'
                                     }}
                                     initial={{ scale: 0.5, opacity: 0 }}
                                     animate={{ scale: 1, opacity: 1 }}
                                     exit={{ scale: 0.5, opacity: 0 }}
                                     transition={{ duration: 0.2 }}
                                     whileHover={shouldReduceMotion ? {} : { scale: 1.1, borderColor: item.color }}
                                  >
                                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                     
                                     <item.icon 
                                        size={36} 
                                        className="text-zinc-600 dark:text-white dark:mix-blend-soft-light transition-all duration-300 group-hover:text-zinc-900 group-hover:dark:text-white group-hover:dark:mix-blend-normal"
                                     />
                                  </motion.div>
                               )}
                            </AnimatePresence>
                         </div>
                      </motion.div>
                   </motion.div>
                </motion.div>
             );
           })}
        </div>

      </motion.div>
    </section>
  );
};
