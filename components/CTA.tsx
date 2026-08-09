
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Image as ImageIcon, Video, MessageSquare, Wand2, Music, Box, Sparkles } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import Button from './Button';

// Bypass type issues with framer-motion props
const Motion = motion as any;

// Refined positions: Pushed further out to accommodate larger text
const FLOATING_TOOLS = [
  { icon: ImageIcon, color: 'text-luma-pink', x: -650, y: -180, delay: 0 },
  { icon: Video, color: 'text-luma-purple', x: 680, y: -150, delay: 0.5 },
  { icon: MessageSquare, color: 'text-luma-yellow', x: -580, y: 220, delay: 1 },
  { icon: Wand2, color: 'text-blue-400', x: 600, y: 250, delay: 1.5 },
  { icon: Music, color: 'text-emerald-400', x: -380, y: -350, delay: 0.8 },
  { icon: Box, color: 'text-orange-400', x: 420, y: -380, delay: 1.2 },
];

const PHRASES = [
  { top: "از رویا", bottom: "تا واقعیت" },
  { top: "خلاقیت", bottom: "بدون مرز" },
  { top: "ایده‌پردازی", bottom: "تا اجرا" },
  { top: "جادوی", bottom: "هوش مصنوعی" }
];

const CTA: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Visibility State
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isIntersecting = false;

    const updateVisibility = () => {
      setIsVisible(isIntersecting && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Typewriter State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [phase, setPhase] = useState<'typingTop' | 'typingBottom' | 'pausing' | 'deletingBottom' | 'deletingTop'>('typingTop');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Typewriter Logic
  useEffect(() => {
    if (!isVisible) return; // Pause typewriter completely when offscreen

    const currentPhrase = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 30;
    const PAUSE_DELAY = 2500;

    if (phase === 'typingTop') {
        // Typing Top Line
        if (topText.length < currentPhrase.top.length) {
            timeout = setTimeout(() => {
                setTopText(currentPhrase.top.slice(0, topText.length + 1));
            }, TYPE_SPEED);
        } else {
            // Move to Bottom Line
            timeout = setTimeout(() => setPhase('typingBottom'), 100);
        }
    } else if (phase === 'typingBottom') {
        // Typing Bottom Line
        if (bottomText.length < currentPhrase.bottom.length) {
            timeout = setTimeout(() => {
                setBottomText(currentPhrase.bottom.slice(0, bottomText.length + 1));
            }, TYPE_SPEED);
        } else {
            // Finished Typing Both - Pause
            timeout = setTimeout(() => setPhase('pausing'), 500);
        }
    } else if (phase === 'pausing') {
        // Pause before deleting
        timeout = setTimeout(() => {
            setPhase('deletingBottom');
        }, PAUSE_DELAY);
    } else if (phase === 'deletingBottom') {
        // Delete Bottom Line
        if (bottomText.length > 0) {
            timeout = setTimeout(() => {
                setBottomText(prev => prev.slice(0, -1));
            }, DELETE_SPEED);
        } else {
            // Move to Delete Top
            setPhase('deletingTop');
        }
    } else if (phase === 'deletingTop') {
        // Delete Top Line
        if (topText.length > 0) {
            timeout = setTimeout(() => {
                setTopText(prev => prev.slice(0, -1));
            }, DELETE_SPEED);
        } else {
            // Cycle to Next Phrase and Start Over
            setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
            setPhase('typingTop');
        }
    }

    return () => clearTimeout(timeout);
  }, [topText, bottomText, phase, phraseIndex, isVisible]);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); 
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  
  // Background rotation linked to scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Dot pattern style
  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1.5' fill='${theme === 'dark' ? 'rgb(255 255 255 / 0.1)' : 'rgb(0 0 0 / 0.05)'}'/%3e%3c/svg%3e")`
  };

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center min-h-[900px] bg-[#FAFAFA] dark:bg-black transition-colors duration-300">
      
      {/* Top and Bottom Smooth Transition Fades */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/90 dark:from-black dark:via-black/90 to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 dark:from-black dark:via-black/90 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* --- Rich Background Layer with Smooth Mask --- */}
      <div className="absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_25%,black_75%,transparent_100%)]">
        
        {/* Dot Pattern */}
        <div className="absolute inset-0 z-0 opacity-40" style={dotStyle} />

        {/* Static Ambient Orbs (Calmer, High Performance, Avoids GPU Blur Re-renders) */}
        <div className="absolute top-1/4 left-1/4 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] bg-luma-purple/5 dark:bg-luma-purple/10 rounded-full blur-[50px] sm:blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-luma-pink/5 dark:bg-luma-pink/10 rounded-full blur-[50px] sm:blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/3 dark:bg-luma-yellow/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
        
        {/* Animated Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />
        
        {/* Orbital Rings (SVG) */}
        <Motion.div style={{ rotate: rotate as any }} className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <svg className="w-[180%] h-[180%] max-w-[1400px] max-h-[1400px]" viewBox="0 0 1000 1000">
               <circle cx="500" cy="500" r="300" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="10 20" />
               <circle cx="500" cy="500" r="450" fill="none" stroke="url(#grad2)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.5" />
               <defs>
                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#DA8FFF" stopOpacity="0" />
                   <stop offset="50%" stopColor="#DA8FFF" stopOpacity="1" />
                   <stop offset="100%" stopColor="#DA8FFF" stopOpacity="0" />
                 </linearGradient>
                 <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#FF6482" stopOpacity="0" />
                   <stop offset="50%" stopColor="#FF6482" stopOpacity="1" />
                   <stop offset="100%" stopColor="#FF6482" stopOpacity="0" />
                 </linearGradient>
               </defs>
           </svg>
         </Motion.div>
      </div>

      <Motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 flex flex-col items-center justify-center"
      >
        
        {/* --- Floating Tool Icons --- */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block">
           <div className="relative w-full h-full max-w-screen-2xl mx-auto">
             {FLOATING_TOOLS.map((item, i) => (
                <Motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ x: item.x * 0.8, y: item.y + 100, opacity: 0 }}
                  whileInView={{ x: item.x, y: item.y, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay * 0.1, duration: 1.2, ease: "easeOut" }}
                >
                   <div
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-xl"
                   >
                      <div className={`p-2 rounded-xl bg-black/5 dark:bg-white/5 ${item.color} opacity-80`}>
                         <item.icon size={28} />
                      </div>
                   </div>
                </Motion.div>
             ))}
           </div>
        </div>

        {/* --- Central Content --- */}
        <Motion.div 
           style={{ y, scale: scale as any }}
           className="relative z-20 text-center w-full max-w-7xl mx-auto"
        >
          {/* Badge */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-12 px-5 py-2 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] group hover:border-luma-purple/50 transition-all cursor-default"
          >
             <Sparkles className="text-luma-yellow w-4 h-4" />
            <span className="text-zinc-900 dark:text-white font-bold text-xs tracking-[0.15em] uppercase">آینده همینجاست</span>
          </Motion.div>

          {/* Main Typography - Typewriter Effect */}
          <div className="h-[240px] md:h-[350px] flex items-center justify-center mb-8">
               <h2 
                 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-950 dark:text-white tracking-tighter leading-[1] w-full"
               >
                 {/* Top Line */}
                 <span className="block text-zinc-950/90 dark:text-white/90 drop-shadow-2xl mb-4 min-h-[1.1em]">
                    {topText}
                    {/* Blinking Cursor for Top */}
                    {(phase === 'typingTop' || phase === 'deletingTop') && (
                       <Motion.span 
                         animate={{ opacity: [1, 1, 0, 0] }}
                         transition={{ 
                           duration: 0.8, 
                           repeat: Infinity, 
                           times: [0, 0.5, 0.5, 1],
                           ease: "linear"
                         }}
                         className="inline-block w-[4px] md:w-[8px] h-[0.75em] bg-zinc-950 dark:bg-white ml-2 align-middle rounded-full"
                         style={{ verticalAlign: 'baseline', marginBottom: '-6px' }}
                       />
                    )}
                 </span>

                 {/* Bottom Line */}
                 <span className="block relative z-10 min-h-[1.1em]">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow relative inline-block pb-4 px-2`}>
                      {bottomText}
                      {/* Blinking Cursor for Bottom */}
                      {(phase === 'typingBottom' || phase === 'pausing' || phase === 'deletingBottom') && (
                         <Motion.span 
                           animate={{ opacity: [1, 1, 0, 0] }}
                           transition={{ 
                             duration: 0.8, 
                             repeat: Infinity, 
                             times: [0, 0.5, 0.5, 1],
                             ease: "linear"
                           }}
                           className="inline-block w-[4px] md:w-[8px] h-[0.75em] bg-zinc-950 dark:bg-white ml-2 align-middle rounded-full"
                           style={{ verticalAlign: 'baseline', marginBottom: '-6px' }}
                         />
                      )}
                      
                      {/* Glowing Underline - Fade in when typing is somewhat progressed */}
                      <Motion.div 
                         initial={{ opacity: 0, width: "0%" }}
                         animate={{ opacity: bottomText.length > 2 ? 0.5 : 0, width: "100%" }}
                         className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[4px]" 
                      />
                    </span>
                 </span>
               </h2>
          </div>

          <Motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-zinc-700 dark:text-white/70 font-light mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            قدرتمندترین ابزارهای خلاقیت جهان، اکنون در دستان شما. 
            <br className="hidden md:block" />
            بدون محدودیت، بدون اشتراک اجباری.
          </Motion.p>

          {/* Buttons Area - Standardized Sizes */}
          <div className="flex flex-col items-center gap-10">
            <Motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
            >
              <Button 
                externalHref="https://dash.lumai.ir/" 
                variant="primary"
                className="w-full sm:w-auto px-10 py-4 text-base shadow-[0_0_40px_-10px_rgba(255,100,130,0.6)] hover:shadow-[0_0_60px_-10px_rgba(255,100,130,0.8)] border-0 ring-1 ring-zinc-400 dark:ring-white/50"
              >
                شروع رایگان
                <Zap className="w-5 h-5 fill-black" />
              </Button>
              
              <Button 
                href="/pricing" 
                variant="secondary"
                className="w-full sm:w-auto px-10 py-4 text-base bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/20 hover:bg-black/10 hover:dark:bg-white/10 hover:border-black/20 hover:dark:border-white/40 text-zinc-950 dark:text-white"
              >
                مشاهده تعرفه‌ها
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Motion.div>

            {/* Social Proof / Footer */}
            <Motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.7 }}
               className="flex items-center gap-4 py-3 px-6 rounded-full border border-black/5 dark:border-white/10 bg-white/85 dark:bg-black/50 backdrop-blur-md shadow-sm dark:shadow-none"
            >
                <div className="flex -space-x-3 space-x-reverse">
                   {[1,2,3,4].map(i => (
                     <div key={i} className={`w-10 h-10 rounded-full border border-white dark:border-[#121212] bg-gray-200 dark:bg-gray-800 overflow-hidden relative shadow-lg`}>
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" className="w-full h-full object-cover opacity-80" />
                     </div>
                   ))}
                </div>
                <p className="text-base text-zinc-700 dark:text-gray-300 font-medium px-2">
                   پیوستن به <span className="text-zinc-950 dark:text-white font-bold border-b border-black/20 dark:border-white/20 pb-0.5 mx-1">+۱۰,۰۰۰</span> خالق محتوا
                </p>
            </Motion.div>
          </div>

        </Motion.div>
      </Motion.div>
    </section>
  );
};

export default CTA;
