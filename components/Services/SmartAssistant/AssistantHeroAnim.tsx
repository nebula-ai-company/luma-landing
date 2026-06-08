
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Globe, Bot, Database, Sparkles, BrainCircuit, Search, ArrowUp, ShoppingBag, Truck } from 'lucide-react';

const CONVERSATIONS = [
  {
    id: 1,
    userText: "گارانتی محصولات شامل چه مواردی میشه؟",
    botText: "طبق کاتالوگ محصول، تمامی کالاها دارای ۱۸ ماه گارانتی طلایی تعویض قطعات هستند.",
    sourceFile: "کاتالوگ.pdf",
    sourcePage: "۱۲",
    icon: FileText,
    color: "text-blue-400"
  },
  {
    id: 2,
    userText: "چطور می‌تونم وضعیت سفارشم رو پیگیری کنم؟",
    botText: "برای پیگیری، وارد پنل کاربری شوید و در بخش «سفارش‌های من» کد رهگیری پستی را مشاهده کنید.",
    sourceFile: "راهنما_کاربر.pdf",
    sourcePage: "۵",
    icon: Truck,
    color: "text-green-400"
  },
  {
    id: 3,
    userText: "برای عکاسی پرتره چه لنزی پیشنهاد میدید؟",
    botText: "بر اساس مقالات فنی، لنز ۸۵ میلی‌متری f/1.8 بهترین گزینه اقتصادی برای عکاسی پرتره با بوکه عالی است.",
    sourceFile: "بررسی_لنزها.docx",
    sourcePage: "۳",
    icon: ShoppingBag,
    color: "text-purple-400"
  }
];

export const AssistantHeroAnim = () => {
  const [phase, setPhase] = useState<'idle' | 'ingest' | 'process' | 'respond'>('idle');
  const [conversationIndex, setConversationIndex] = useState(0);

  const currentConv = CONVERSATIONS[conversationIndex];

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        // 1. Ingest
        setPhase('ingest');
        await new Promise(r => setTimeout(r, 3000));
        if (!mounted) break;

        // 2. Process
        setPhase('process');
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        // 3. Respond
        setPhase('respond');
        await new Promise(r => setTimeout(r, 8000)); // Time to read
        if (!mounted) break;

        // Reset & Switch Conversation
        setPhase('idle');
        await new Promise(r => setTimeout(r, 500));
        if (mounted) {
           setConversationIndex((prev) => (prev + 1) % CONVERSATIONS.length);
        }
      }
    };
    cycle();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#FAFAFA] dark:bg-[#080809] rounded-[40px] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center font-sans select-none transition-colors duration-300">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] transition-all" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      
      {/* Animated Background Pulse */}
      <motion.div 
        animate={{ opacity: phase === 'process' ? 0.3 : 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-luma-yellow/5 blur-[100px] pointer-events-none"
      />

      {/* --- The Core (Brain) --- */}
      {/* We keep this in the DOM but animate it out when responding */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
           animate={{
             scale: phase === 'respond' ? 0.8 : 1,
             opacity: phase === 'respond' ? 0 : 1, // Fade out completely when chat opens
             filter: phase === 'respond' ? 'blur(10px)' : 'blur(0px)',
           }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
           className="relative"
        >
           {/* Ripple Effect (Process Phase) */}
           {phase === 'process' && (
              <>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={`ripple-${i}`}
                    className="absolute inset-0 rounded-full border border-luma-yellow/30"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                  />
                ))}
              </>
           )}

           {/* Core Circle */}
           <div className="w-32 h-32 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 flex items-center justify-center relative z-20 shadow-lg dark:shadow-[0_0_50px_-10px_rgba(255,179,64,0.3)] transition-colors">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/[0.02] dark:from-white/5 to-transparent pointer-events-none" />
              <BrainCircuit 
                size={56} 
                className={`transition-all duration-500 ${phase === 'process' ? 'text-luma-yellow drop-shadow-[0_0_15px_rgba(255,179,64,0.8)]' : 'text-zinc-400 dark:text-gray-500'}`} 
              />
           </div>

           {/* Data Ingestion Particles */}
           <AnimatePresence>
             {phase === 'ingest' && (
                <motion.div key="ingest-group" className="absolute inset-0 pointer-events-none select-none">
                 <IngestParticle key="part-pdf" icon={FileText} label="PDF" angle={-130} delay={0} color="text-blue-500" />
                 <IngestParticle key="part-web" icon={Globe} label="WEB" angle={-45} delay={0.8} color="text-green-500" />
                 <IngestParticle key="part-sql" icon={Database} label="SQL" angle={45} delay={1.6} color="text-purple-500" />
                 <IngestParticle key="part-doc" icon={FileText} label="DOC" angle={130} delay={2.4} color="text-pink-500" />
                </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Chat Interface (Respond Phase) --- */}
      <AnimatePresence mode="wait">
        {phase === 'respond' && (
          <motion.div
            key={conversationIndex} // Force re-render on index change
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="absolute z-30 w-[95%] max-w-[440px]" // Made bigger
          >
             <div className="bg-white/95 dark:bg-[#151515]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-5 shadow-2xl ring-1 ring-black/5 dark:ring-white/5 transition-colors">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-black/5 dark:border-white/5" dir="rtl">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luma-yellow/20 to-orange-500/20 flex items-center justify-center border border-luma-yellow/30">
                      <Bot size={20} className="text-luma-yellow" />
                   </div>
                   <div className="flex flex-col text-right">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">دستیار هوشمند</span>
                      <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                         آنلاین
                      </span>
                   </div>
                </div>

                {/* Chat Flow */}
                <div className="space-y-6 font-sans">
                   
                   {/* User Message */}
                   <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-start text-right"
                   >
                      <div className="bg-zinc-100 dark:bg-[#2a2a2a] text-zinc-800 dark:text-white text-sm py-3 px-5 rounded-2xl rounded-tr-sm max-w-[90%] leading-relaxed text-right dir-rtl shadow-sm">
                         {currentConv.userText}
                      </div>
                   </motion.div>

                   {/* Bot Response */}
                   <motion.div 
                      className="flex justify-end w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                   >
                      <div className="flex flex-row-reverse items-start gap-3 max-w-[95%] text-right">
                         <div className="w-8 h-8 rounded-full bg-luma-yellow/10 flex items-center justify-center border border-luma-yellow/20 shrink-0 mt-1">
                            <Sparkles size={16} className="text-luma-yellow" />
                         </div>
                         
                         <div className="flex flex-col gap-2 w-full text-right">
                            <div className="bg-gradient-to-br from-zinc-50 to-white dark:from-[#1a1a1a] dark:to-[#111] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-gray-200 text-sm py-4 px-5 rounded-2xl rounded-tl-sm w-full leading-relaxed text-right dir-rtl relative overflow-hidden shadow-sm">
                               <SmartTypewriter 
                                  text={currentConv.botText} 
                                  thinkingTime={1500}
                               />
                            </div>
                            
                            {/* Source Badge */}
                            <motion.div
                               initial={{ opacity: 0, y: -5 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 4.5 }}
                               className="flex items-center gap-2 self-end bg-black/[0.03] dark:bg-black/40 px-2.5 py-1.5 rounded-lg text-[10px] text-zinc-500 dark:text-gray-400 border border-black/5 dark:border-white/5 hover:bg-black/[0.05] hover:dark:bg-black/60 transition-colors cursor-default"
                            >
                               <Search size={12} />
                               <span>منبع: <span className={`font-bold ${currentConv.color}`}>{currentConv.sourceFile}</span> (صفحه {currentConv.sourcePage})</span>
                            </motion.div>
                         </div>
                      </div>
                   </motion.div>

                </div>

                {/* Input Placeholder */}
                <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-3 opacity-50">
                   <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                      <ArrowUp size={14} className="text-zinc-600 dark:text-white" />
                   </div>
                   <div className="h-2 w-32 bg-black/5 dark:bg-white/10 rounded-full ml-auto" />
                </div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

const IngestParticle = ({ icon: Icon, label, angle, delay, color }: any) => {
   // Convert degrees to radians
   const rad = (angle * Math.PI) / 180;
   const radius = 180; // Increased radius for bigger visual
   const startX = Math.cos(rad) * radius;
   const startY = Math.sin(rad) * radius;

   return (
      <motion.div
         initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
         animate={{ 
            x: [startX, startX * 0.8, 0], 
            y: [startY, startY * 0.8, 0],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0]
         }}
         transition={{ duration: 1.2, delay, ease: "easeInOut" }}
         className="absolute top-1/2 left-1/2 -ml-6 -mt-6 z-20 pointer-events-none font-sans"
      >
         <div className="flex flex-col items-center gap-1.5">
            <div className={`w-12 h-12 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center shadow-lg ${color}`}>
               <Icon size={22} />
            </div>
            <span className="text-[9px] font-bold bg-zinc-100 dark:bg-black/80 text-zinc-700 dark:text-white px-2 py-0.5 rounded border border-black/5 dark:border-white/10">{label}</span>
         </div>
      </motion.div>
   )
}

const SmartTypewriter = ({ text, thinkingTime }: { text: string, thinkingTime: number }) => {
   const [display, setDisplay] = useState("");
   const [phase, setPhase] = useState<'thinking' | 'typing' | 'done'>('thinking');

   useEffect(() => {
      // 1. Thinking Phase
      const thinkTimer = setTimeout(() => {
         setPhase('typing');
      }, thinkingTime);

      return () => clearTimeout(thinkTimer);
   }, [thinkingTime]);

   useEffect(() => {
      if (phase !== 'typing') return;

      let idx = 0;
      const typeInterval = setInterval(() => {
         setDisplay(text.slice(0, idx));
         idx++;
         if (idx > text.length) {
            clearInterval(typeInterval);
            setPhase('done');
         }
      }, 30); // Typing speed

      return () => clearInterval(typeInterval);
   }, [phase, text]);

   if (phase === 'thinking') {
      return (
         <div className="flex items-center gap-1 h-5 justify-start text-right pr-2">
            <motion.div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
            <motion.div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
            <motion.div className="w-1.5 h-1.5 bg-zinc-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
            <span className="text-[10px] text-zinc-400 dark:text-gray-550 mr-2 font-medium">در حال تحلیل پایگاه دانش...</span>
         </div>
      )
   }

   return (
      <span className="text-zinc-800 dark:text-gray-200">
         {display}
         {phase === 'typing' && <span className="inline-block w-0.5 h-4 bg-luma-yellow mr-0.5 animate-pulse align-middle" />}
      </span>
   )
}
