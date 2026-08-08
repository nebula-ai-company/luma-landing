
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Zap, Printer, ImagePlus, Scan } from 'lucide-react';
import Button from '../../Button';
import { UpscaleHeroAnim } from './UpscaleHeroAnim';

// Generate random particles for the background "pixel restoration" effect
const PARTICLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 10,
  size: Math.random() * 4 + 2,
  opacity: Math.random() * 0.3 + 0.1
}));

export const UpscaleHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300">
      
      {/* Background Ambience - Professional & Animated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         
         {/* 1. Fluid Gradient Mesh (Deep Atmosphere) */}
         <motion.div 
            animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.15, 0.25, 0.15], 
               rotate: [0, 15, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[30%] -right-[10%] w-[1200px] h-[1200px] bg-gradient-to-br from-luma-purple/20 via-luma-pink/5 to-transparent rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-70"
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.1, 1],
               opacity: [0.1, 0.2, 0.1],
               x: [0, -50, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] -left-[10%] w-[1000px] h-[1000px] bg-gradient-to-tr from-luma-yellow/10 via-luma-purple/5 to-transparent rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-70"
         />

         {/* 2. Digital Grid with Scanning Beam */}
         <div className="absolute inset-0">
            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
            
            {/* Active Scanning Beam */}
            <motion.div 
               initial={{ top: "-10%", opacity: 0 }}
               animate={{ top: "110%", opacity: 1 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luma-yellow/40 to-transparent shadow-[0_0_15px_rgba(255,179,64,0.2)] z-10"
            />
            {/* Trailing Scan Fade */}
            <motion.div 
               initial={{ top: "-10%" }}
               animate={{ top: "110%" }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-40 bg-gradient-to-t from-luma-yellow/5 to-transparent -translate-y-full pointer-events-none"
            />
         </div>

         {/* 3. Rising "Restored Pixels" Particles */}
         {PARTICLES.map((p) => (
            <motion.div
               key={p.id}
               className="absolute bg-zinc-950/[0.04] dark:bg-white/[0.07] backdrop-blur-[1px] border border-black/[0.03] dark:border-white/[0.05]"
               style={{
                  left: `${p.x}%`,
                  width: p.size,
                  height: p.size,
                  borderRadius: '2px'
               }}
               initial={{ top: "110%", opacity: 0 }}
               animate={{ 
                  top: "-10%", 
                  opacity: [0, p.opacity, 0],
                  rotate: [0, 45, 90],
                  scale: [0.5, 1, 0.5]
               }}
               transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  delay: p.delay, 
                  ease: "linear" 
               }}
            />
         ))}

         {/* 4. Noise Texture Overlay */}
         <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right flex flex-col items-center lg:items-start"
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl mb-8 shadow-sm dark:shadow-lg dark:shadow-luma-purple/5 cursor-default group hover:bg-white/80 dark:hover:bg-white/10 transition-all">
                <Scan size={16} className="text-luma-purple animate-pulse" />
                <span className="text-[11px] font-bold text-zinc-600 dark:text-gray-300 tracking-wide group-hover:text-zinc-850 dark:group-hover:text-white transition-colors">
                   افزایش کیفیت هوشمند
                </span>
             </div>

             <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight leading-[1.15]">
                بازیابی جزئیات
                <br />
                {/* Seamless Gradient Loop: Purple -> Pink -> Yellow -> Purple */}
                <span 
                  className="text-transparent bg-clip-text inline-block pb-2 animate-text-flow bg-[length:200%_auto]"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #DA8FFF, #FF6482, #FFB340, #DA8FFF)'
                  }}
                >
                   از دست رفته
                </span>
             </h1>

             <p className="text-lg md:text-xl text-zinc-600 dark:text-gray-300 mb-12 font-light max-w-xl leading-loose">
                آیا عکسی دارید که تار، قدیمی یا کوچک است؟ 
                با هوش مصنوعی لوما، پیکسل‌های گمشده را بازسازی کنید و تصویر خود را تا ۱۰ برابر بزرگتر و شفاف‌تر تحویل بگیرید. بدون افت کیفیت.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-lg">
                {[
                   { icon: Printer, text: "چاپ در ابعاد بزرگ", color: "text-luma-purple" },
                   { icon: ImagePlus, text: "اصلاح خروجی هوش مصنوعی", color: "text-luma-pink" },
                   { icon: Zap, text: "بازسازی عکس‌های قدیمی", color: "text-luma-yellow" },
                   { icon: Maximize2, text: "افزایش سایز تا ۱۰ برابر", color: "text-blue-500 dark:text-blue-400" },
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 rounded-xl p-3 hover:bg-white dark:hover:bg-white/10 transition-all group cursor-default hover:border-zinc-300/85 dark:hover:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)]/50">
                      <item.icon size={18} className={`${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm text-zinc-600 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{item.text}</span>
                   </div>
                ))}
             </div>

             <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <Button 
                   externalHref="https://dash.lumai.ir/" 
                   variant="primary" 
                   className="px-10 py-4 text-base shadow-[0_4px_24px_rgba(218,143,255,0.25)] dark:shadow-[0_0_40px_-10px_rgba(218,143,255,0.4)] border-0 ring-1 ring-zinc-950/10 dark:ring-white/50 hover:shadow-[0_4px_30px_rgba(218,143,255,0.35)] dark:hover:shadow-[0_0_60px_-10px_rgba(218,143,255,0.6)]"
                >
                   شروع بازسازی
                   <Zap size={20} className="fill-black" />
                </Button>
                <Button 
                   variant="secondary"
                   className="px-10 py-4 text-base border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-gray-300"
                   onClick={() => document.getElementById('upscale-models')?.scrollIntoView({ behavior: 'smooth' })}
                >
                   مقایسه مدل‌ها
                </Button>
             </div>
          </motion.div>

          {/* Animation Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
             <div className="absolute -inset-4 bg-gradient-to-tr from-luma-purple/20 via-luma-pink/10 to-luma-yellow/10 blur-3xl opacity-40 -z-10 rounded-[50px] animate-pulse-slow" />
             <UpscaleHeroAnim />
          </motion.div>

        </div>
      </div>

      {/* Seamless Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] via-[#FAFAFA]/80 dark:via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none transition-colors duration-300" />
    </section>
  );
};
