
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Zap, Image as ImageIcon, Video, MessageSquare, Wand2, Music, Box, Sparkles } from 'lucide-react';
import Button from '../../Button';

const FLOATING_TOOLS = [
  { icon: ImageIcon, color: 'text-luma-pink', x: -650, y: -180, delay: 0 },
  { icon: Video, color: 'text-luma-purple', x: 680, y: -150, delay: 0.5 },
  { icon: MessageSquare, color: 'text-luma-yellow', x: -580, y: 220, delay: 1 },
  { icon: Wand2, color: 'text-blue-400', x: 600, y: 250, delay: 1.5 },
  { icon: Music, color: 'text-emerald-400', x: -380, y: -350, delay: 0.8 },
  { icon: Box, color: 'text-orange-400', x: 420, y: -380, delay: 1.2 },
];

const PHRASES = [
  { top: "دسترسی", bottom: "به همه ابزارها" },
  { top: "خلق کنید", bottom: "بدون محدودیت" },
  { top: "قدرت", bottom: "هوش مصنوعی" },
];

export const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 30;
    const PAUSE_DELAY = 2500;

    if (phase === 'typingTop') {
        if (topText.length < currentPhrase.top.length) {
            timeout = setTimeout(() => {
                setTopText(currentPhrase.top.slice(0, topText.length + 1));
            }, TYPE_SPEED);
        } else {
            timeout = setTimeout(() => setPhase('typingBottom'), 100);
        }
    } else if (phase === 'typingBottom') {
        if (bottomText.length < currentPhrase.bottom.length) {
            timeout = setTimeout(() => {
                setBottomText(currentPhrase.bottom.slice(0, bottomText.length + 1));
            }, TYPE_SPEED);
        } else {
            timeout = setTimeout(() => setPhase('pausing'), 500);
        }
    } else if (phase === 'pausing') {
        timeout = setTimeout(() => {
            setPhase('deletingBottom');
        }, PAUSE_DELAY);
    } else if (phase === 'deletingBottom') {
        if (bottomText.length > 0) {
            timeout = setTimeout(() => {
                setBottomText(prev => prev.slice(0, -1));
            }, DELETE_SPEED);
        } else {
            setPhase('deletingTop');
        }
    } else if (phase === 'deletingTop') {
        if (topText.length > 0) {
            timeout = setTimeout(() => {
                setTopText(prev => prev.slice(0, -1));
            }, DELETE_SPEED);
        } else {
            setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
            setPhase('typingTop');
        }
    }

    return () => clearTimeout(timeout);
  }, [topText, bottomText, phase, phraseIndex]);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); 
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const dotStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='none'%3e%3ccircle cx='1.5' cy='1.5' r='1.5' fill='rgb(255 255 255 / 0.1)'/%3e%3c/svg%3e")`
  };

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center min-h-[800px] bg-[#0a0a0a] border-t border-white/5">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]">
        <div className="absolute inset-0 z-0 opacity-40" style={dotStyle} />
        
        {/* Animated Orbs */}
        <motion.div 
           animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-luma-purple/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
        />
        <motion.div 
           animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0], scale: [0.9, 1.1, 1, 0.9] }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-luma-pink/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
        />
        <motion.div 
           animate={{ x: [0, 50, -50, 0], y: [0, 40, -40, 0], scale: [1, 0.8, 1.1, 1] }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" 
        />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        
        <motion.div style={{ rotate }} className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
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
        </motion.div>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 flex flex-col items-center justify-center">
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block">
           <div className="relative w-full h-full max-w-screen-2xl mx-auto">
             {FLOATING_TOOLS.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ x: item.x * 0.8, y: item.y + 100, opacity: 0 }}
                  whileInView={{ x: item.x, y: item.y, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay * 0.1, duration: 1.2, ease: "easeOut" }}
                >
                   <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-xl"
                   >
                      <div className={`p-2 rounded-xl bg-white/5 ${item.color} opacity-80`}>
                         <item.icon size={28} />
                      </div>
                   </motion.div>
                </motion.div>
             ))}
           </div>
        </div>

        {/* Central Content */}
        <motion.div style={{ y, scale }} className="relative z-20 text-center w-full max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-12 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] group hover:border-luma-pink/50 transition-all cursor-default"
          >
             <Sparkles className="text-luma-pink w-4 h-4" />
            <span className="text-white font-bold text-xs tracking-[0.15em] uppercase">یک پلتفرم برای همه چیز</span>
          </motion.div>

          {/* Typewriter Typography */}
          <div className="h-[240px] md:h-[300px] flex items-center justify-center mb-8">
               <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[1] w-full">
                 <span className="block text-white/90 drop-shadow-2xl mb-4 min-h-[1.1em]">
                    {topText}
                    {(phase === 'typingTop' || phase === 'deletingTop') && (
                       <motion.span 
                         animate={{ opacity: [1, 1, 0, 0] }}
                         transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                         className="inline-block w-[4px] md:w-[8px] h-[0.75em] bg-white ml-2 align-middle rounded-full"
                         style={{ verticalAlign: 'baseline', marginBottom: '-6px' }}
                       />
                    )}
                 </span>
                 <span className="block relative z-10 min-h-[1.1em]">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-luma-pink via-luma-purple to-luma-yellow relative inline-block pb-4 px-2`}>
                      {bottomText}
                      {(phase === 'typingBottom' || phase === 'pausing' || phase === 'deletingBottom') && (
                         <motion.span 
                           animate={{ opacity: [1, 1, 0, 0] }}
                           transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                           className="inline-block w-[4px] md:w-[8px] h-[0.75em] bg-white ml-2 align-middle rounded-full"
                           style={{ verticalAlign: 'baseline', marginBottom: '-6px' }}
                         />
                      )}
                      <motion.div 
                         initial={{ opacity: 0, width: "0%" }}
                         animate={{ opacity: bottomText.length > 2 ? 0.5 : 0, width: "100%" }}
                         className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[4px]" 
                      />
                    </span>
                 </span>
               </h2>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            با دسترسی به کامل‌ترین مجموعه ابزارهای هوش مصنوعی، 
            <br className="hidden md:block" />
            کیفیت کار خود را به سطح جهانی برسانید.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
            >
              <Button 
                externalHref="https://dash.lumai.ir/" 
                variant="primary"
                className="w-full sm:w-auto px-12 py-4 text-lg shadow-[0_0_40px_-10px_rgba(255,100,130,0.6)] hover:shadow-[0_0_60px_-10px_rgba(255,100,130,0.8)] border-0 ring-1 ring-white/50"
              >
                شروع کنید
                <Zap className="w-5 h-5 fill-black" />
              </Button>
              <Button 
                href="/pricing" 
                variant="secondary"
                className="w-full sm:w-auto px-12 py-4 text-lg bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white"
              >
                مشاهده تعرفه‌ها
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
};
