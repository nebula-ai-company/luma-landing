import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Zap, Layers, Crown } from 'lucide-react';
import Button from '../../Button';
import { GenHeroAnim } from './GenHeroAnim';

export const GenHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* --- Advanced Background Animation --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated Gradient Blobs */}
        <motion.div 
           animate={{ 
             x: [0, 100, -50, 0],
             y: [0, -50, 50, 0],
             scale: [1, 1.2, 0.9, 1],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
           animate={{ 
             x: [0, -80, 40, 0],
             y: [0, 60, -40, 0],
             scale: [0.9, 1.1, 1, 0.9],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" 
        />
        <motion.div 
           animate={{ 
             x: [0, 50, -50, 0],
             y: [0, 40, -40, 0],
             scale: [1, 0.8, 1.1, 1],
             opacity: [0.1, 0.2, 0.1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/10 rounded-full blur-[140px]" 
        />

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </div>

      {/* --- Seamless Transition Fade (Bottom) --- */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-right"
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl mb-10 shadow-lg shadow-luma-pink/5 hover:border-luma-pink/30 transition-colors cursor-default group">
                <Sparkles size={14} className="text-luma-pink animate-pulse" />
                <span className="text-[11px] font-bold text-zinc-600 dark:text-gray-300 tracking-widest uppercase group-hover:text-zinc-950 group-hover:dark:text-white transition-colors">AI Image Generator V4</span>
             </div>

             <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight">
                <span className="block mb-2 leading-tight">کارگاه هنری</span>
                <span className="text-gradient-animated block leading-tight pb-2">
                   دیجیتال شما
                </span>
             </h1>

             <p 
                className="text-lg md:text-xl text-zinc-650 dark:text-gray-400 mb-10 font-light max-w-xl mx-auto lg:mx-0"
                style={{ lineHeight: '2.4rem' }}
             >
                تصور کنید، بنویسید و خلق کنید. 
                سرویس ساخت تصویر لوما با دسترسی به قدرتمندترین مدل‌های جهان مانند <span className="text-zinc-900 dark:text-white font-bold border-b border-luma-purple/30 pb-0.5">FLUX</span> و <span className="text-zinc-900 dark:text-white font-bold border-b border-luma-pink/30 pb-0.5">IDEOGRAM</span>، فاصله میان ذهن شما و اثر هنری را به یک کلیک کاهش می‌دهد.
             </p>

             {/* Key Features List - Cleaner Look & Fixed Hover Glitch */}
             <div className="grid grid-cols-1 gap-6 mb-12 max-w-lg mx-auto lg:mx-0">
                {[
                   { 
                     title: "دسترسی به ۱۸ مدل هوش مصنوعی", 
                     desc: "شامل FLUX 2, Ideogram v3, Recraft", 
                     icon: Crown, 
                     color: "text-luma-purple", 
                     bg: "bg-luma-purple/10", 
                     border: "border-luma-purple/20",
                     hoverText: "group-hover:text-luma-purple"
                   },
                   { 
                     title: "خروجی 8K با جزئیات سینمایی", 
                     desc: "بالاترین رزولوشن و کیفیت چاپ", 
                     icon: Layers, 
                     color: "text-luma-pink", 
                     bg: "bg-luma-pink/10", 
                     border: "border-luma-pink/20",
                     hoverText: "group-hover:text-luma-pink"
                   },
                   { 
                     title: "فهم عمیق زبان فارسی", 
                     desc: "پشتیبانی کامل از اصطلاحات بومی", 
                     icon: CheckCircle2, 
                     color: "text-luma-yellow", 
                     bg: "bg-luma-yellow/10", 
                     border: "border-luma-yellow/20",
                     hoverText: "group-hover:text-luma-yellow"
                   },
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 group cursor-default transition-transform hover:translate-x-[-8px]">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg ${item.bg} border border-black/5 dark:border-white/5 group-hover:border-opacity-50 ${item.border}`}>
                         <item.icon size={24} className={item.color} />
                      </div>
                      <div className="flex flex-col items-start pt-1 gap-1">
                         <span className={`text-zinc-850 dark:text-white font-bold text-lg transition-colors duration-300 ${item.hoverText}`}>
                            {item.title}
                         </span>
                         <span className="text-zinc-500 dark:text-gray-500 text-sm font-medium group-hover:text-zinc-700 group-hover:dark:text-gray-400 transition-colors">
                            {item.desc}
                         </span>
                      </div>
                   </div>
                ))}
             </div>

             <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button 
                   variant="primary" 
                   className="px-10 py-4 text-base shadow-[0_0_40px_-10px_rgba(255,100,130,0.4)] border-0 ring-1 ring-white/50 animate-pulse-subtle bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-200"
                   externalHref="https://dash.lumai.ir/"
                >
                   شروع به ساختن
                   <Zap size={20} className="fill-current" />
                </Button>
                <Button 
                   variant="secondary" 
                   className="px-10 py-4 text-base border-black/10 dark:border-white/10 hover:bg-black/5 hover:dark:bg-white/5 text-zinc-800 dark:text-white"
                   href="/gallery"
                >
                   مشاهده گالری
                </Button>
             </div>
          </motion.div>

          {/* Animation Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             {/* Glow Behind */}
             <div className="absolute -inset-1 bg-gradient-to-b from-luma-pink/20 via-luma-purple/20 to-transparent blur-3xl opacity-50 -z-10 rounded-[40px]" />
             
             {/* The Animation Component */}
             <div className="w-full shadow-2xl shadow-black/15 dark:shadow-black rounded-[32px] overflow-hidden border border-black/10 dark:border-white/10">
                <GenHeroAnim />
              </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
