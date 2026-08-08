import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Type, Palette, Sliders, Zap, ArrowDown } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "انتخاب مدل",
    desc: "موتور پردازشگر خود را از میان قدرتمندترین‌ها (FLUX, IDEOGRAM) انتخاب کنید.",
    icon: Cpu,
    color: "#60A5FA" // blue-400
  },
  {
    id: 2,
    title: "توصیف (Prompt)",
    desc: "تصویر ذهنی خود را بنویسید. هوش مصنوعی آن را درک می‌کند.",
    icon: Type,
    color: "#DA8FFF" // luma-purple
  },
  {
    id: 3,
    title: "استایل هنری",
    desc: "سبک بصری (سینمایی، ۳بعدی، نقاشی) را تعیین کنید.",
    icon: Palette,
    color: "#FF6482" // luma-pink
  },
  {
    id: 4,
    title: "تنظیمات نهایی",
    desc: "ابعاد، کیفیت و جزئیات دقیق خروجی را مشخص کنید.",
    icon: Sliders,
    color: "#FFB340" // luma-yellow
  },
  {
    id: 5,
    title: "خلق جادو",
    desc: "دکمه ساخت را بزنید و شاهد تولد اثر هنری خود باشید.",
    icon: Zap,
    color: "#4ADE80" // green-400
  }
];

export const GenSteps: React.FC = () => {
  return (
    <section className="py-32 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* --- Seamless Transition Fades --- */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Background Gradients - ANIMATED */}
      <motion.div 
         animate={{ 
           x: [0, 50, -50, 0],
           y: [0, -30, 30, 0],
           scale: [1, 1.2, 0.9, 1],
           opacity: [0.05, 0.1, 0.05]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-luma-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
      />
      <motion.div 
         animate={{ 
           x: [0, -50, 50, 0],
           y: [0, 40, -40, 0],
           scale: [1, 0.9, 1.1, 1],
           opacity: [0.05, 0.1, 0.05]
         }}
         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-luma-pink/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-lg transition-colors duration-300"
           >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luma-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-luma-pink"></span>
              </span>
              <span className="text-zinc-650 dark:text-gray-300 font-bold text-xs tracking-wide uppercase">فرآیند تولید</span>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
           >
             مسیر خلق <span className="text-gradient-animated">جادو</span>
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-zinc-600 dark:text-gray-400 text-lg font-light max-w-xl mx-auto"
           >
             فقط ۵ گام ساده تا تبدیل ایده به واقعیت. هوش مصنوعی ما پیچیدگی‌ها را حذف می‌کند.
           </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative">
           {/* Desktop Connecting Line */}
           <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px bg-black/10 dark:bg-white/5 z-0 transition-colors">
              <motion.div 
                 className="h-full bg-gradient-to-r from-transparent via-luma-purple to-transparent opacity-50"
                 initial={{ width: "0%" }}
                 whileInView={{ width: "100%" }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {STEPS.map((step, idx) => (
                 <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 group"
                 >
                    {/* Card Container */}
                    <div className="h-full bg-white dark:bg-[#121212] border border-black/5 dark:border-white/5 rounded-[32px] p-6 pt-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-black/10 hover:dark:border-white/10 hover:shadow-xl dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                       
                       {/* Hover Glow Background */}
                       <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none"
                          style={{ background: `radial-gradient(circle at top, ${step.color}, transparent 80%)` }}
                       />

                       {/* Step Number Badge */}
                       <div className="absolute top-4 right-4 text-[10px] font-bold text-zinc-400 dark:text-gray-600 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-full border border-black/5 dark:border-white/5 group-hover:text-zinc-800 group-hover:dark:text-white group-hover:border-black/20 group-hover:dark:border-white/20 transition-colors">
                          STEP {step.id}
                       </div>

                       {/* Icon Container */}
                       <div className="relative mb-8">
                          <div 
                             className="w-20 h-20 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10 transition-colors duration-300"
                             style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px ${step.color}10` }}
                          >
                             <step.icon size={32} style={{ color: step.color }} className="transition-all duration-300 drop-shadow-md" />
                          </div>
                          
                          {/* Pulsing Ring Behind Icon */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                               style={{ boxShadow: `0 0 30px ${step.color}20` }} 
                          />
                       </div>

                       {/* Text Content */}
                       <h3 
                          className="text-xl font-bold text-zinc-900 dark:text-white mb-3 transition-colors duration-300"
                          style={{ textShadow: '0 0 20px rgba(0,0,0,0.05)' }}
                       >
                          {step.title}
                       </h3>
                       <p className="text-sm text-zinc-650 dark:text-gray-400 leading-7 font-light group-hover:text-zinc-800 group-hover:dark:text-gray-300 transition-colors">
                          {step.desc}
                       </p>

                       {/* Mobile Connector Arrow */}
                       <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-zinc-350 dark:text-white/10">
                          {idx !== STEPS.length - 1 && <ArrowDown size={20} />}
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};
