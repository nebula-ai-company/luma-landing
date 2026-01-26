
import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sparkles, Zap, Camera, Ruler, Palette } from 'lucide-react';
import Button from '../../Button';
import { VtonHeroAnim } from './VtonHeroAnim';

export const VtonHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      
      {/* --- Background Atmosphere --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Yellow Orb (Right - Fabrics) */}
         <motion.div 
            animate={{ 
               x: [0, 50, -50, 0],
               y: [0, -30, 30, 0],
               scale: [1, 1.2, 0.9, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-yellow/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-screen" 
         />
         
         {/* Pink Orb (Left - Skin/Human) */}
         <motion.div 
            animate={{ 
               x: [0, -50, 50, 0],
               y: [0, 40, -40, 0],
               scale: [0.9, 1.1, 1, 0.9],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-luma-pink/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 mix-blend-screen" 
         />

         {/* Texture Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* --- Bottom Fade --- */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.div 
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-yellow/20 bg-luma-yellow/5 backdrop-blur-md mb-8 group hover:bg-luma-yellow/10 transition-colors"
            >
               <Camera size={16} className="text-luma-yellow animate-pulse" />
               <span className="text-[11px] font-bold text-luma-yellow tracking-wide">استودیوی عکاسی دیجیتال</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
               پروی مجازی
               <br />
               {/* Using standard animated gradient class */}
               <span className="text-gradient-animated py-2 inline-block">
                  بدون نیاز به مدل
               </span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light">
               کافیست عکس لباس را (روی چوب لباسی یا سطح صاف) به لوما بدهید تا هوش مصنوعی آن را بر تن یک مدل کاملاً واقعی با مشخصات دلخواه شما (قد، وزن، سن، حجاب و...) نمایش دهد.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
               <Button 
                  externalHref="https://dash.lumai.ir/" 
                  variant="primary"
                  className="bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_-5px_rgba(255,179,64,0.4)] border-none"
               >
                  ورود به اتاق پرو
                  <Shirt size={20} className="fill-black" />
               </Button>
               <Button variant="secondary" className="hover:bg-white/5 border-white/10">
                  مشاهده نمونه‌ها
                  <Sparkles size={20} />
               </Button>
            </div>
            
            {/* Quick Feature Chips - Redesigned & Blue Removed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full max-w-lg mx-auto lg:mx-0">
                {[
                    { icon: Palette, text: "حجاب و پوشش ایرانی", color: "text-luma-pink", bg: "bg-luma-pink/5", border: "group-hover:border-luma-pink/30", gradient: "from-luma-pink/10 to-transparent" },
                    { icon: Ruler, text: "سایزبندی دقیق مانکن", color: "text-luma-yellow", bg: "bg-luma-yellow/5", border: "group-hover:border-luma-yellow/30", gradient: "from-luma-yellow/10 to-transparent" },
                    { icon: Camera, text: "بدون نیاز به آتلیه", color: "text-luma-purple", bg: "bg-luma-purple/5", border: "group-hover:border-luma-purple/30", gradient: "from-luma-purple/10 to-transparent" },
                    { icon: Zap, text: "رندر آنی زیر ۵ ثانیه", color: "text-luma-pink", bg: "bg-luma-pink/5", border: "group-hover:border-luma-pink/30", gradient: "from-luma-pink/10 to-transparent" }
                ].map((f, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className={`
                            relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl 
                            bg-[#121212] border border-white/5 
                            transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-xl
                            ${f.border}
                        `}
                    >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Icon Box */}
                        <div className={`
                            relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                            ${f.bg} border border-white/5 shadow-inner
                            group-hover:scale-110 transition-transform duration-300
                        `}>
                            <f.icon size={22} className={f.color} strokeWidth={1.5} />
                        </div>
                        
                        {/* Text */}
                        <div className="flex flex-col relative z-10">
                            <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                                {f.text}
                            </span>
                        </div>
                        
                        {/* Subtle Active Indicator */}
                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-current opacity-0 group-hover:opacity-100 transition-opacity ${f.color}`} />
                    </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
             {/* Glow Behind Container */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-luma-yellow/20 via-luma-pink/10 to-transparent blur-3xl opacity-40 rounded-[40px] -z-10 animate-pulse-slow" />
             
             {/* Component Wrapper */}
             <div className="w-full h-full shadow-2xl shadow-black rounded-[40px] overflow-hidden border border-white/10 bg-[#0c0c0e]">
                <VtonHeroAnim />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
