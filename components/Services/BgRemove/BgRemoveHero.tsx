
import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Zap, Layers, CheckCircle2, Star, Wand2 } from 'lucide-react';
import Button from '../../Button';
import { BgRemoveHeroAnim } from './BgRemoveHeroAnim';

export const BgRemoveHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a] min-h-[90vh] flex items-center">
      
      {/* --- Standard Platform Animated Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Purple Orb (Top Right) */}
         <motion.div 
            animate={{ 
               x: [0, 100, -50, 0],
               y: [0, -50, 50, 0],
               scale: [1, 1.2, 0.9, 1],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-purple/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-screen" 
         />
         
         {/* Pink Orb (Bottom Left) */}
         <motion.div 
            animate={{ 
               x: [0, -80, 40, 0],
               y: [0, 60, -40, 0],
               scale: [0.9, 1.1, 1, 0.9],
               opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luma-pink/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 mix-blend-screen" 
         />

         {/* Yellow Orb (Center/Floating) */}
         <motion.div 
            animate={{ 
               x: [0, 50, -50, 0],
               y: [0, 40, -40, 0],
               scale: [1, 0.8, 1.1, 1],
               opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luma-yellow/10 rounded-full blur-[140px] mix-blend-screen" 
         />
         
         {/* Animated Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
         
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Text Content - Right Side (RTL) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-right order-2 lg:order-1 flex flex-col items-center lg:items-start justify-center py-6"
          >
             {/* Premium Glass Badge - Clean Version */}
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8 shadow-[0_0_20px_-5px_rgba(255,100,130,0.3)] cursor-default group hover:bg-white/10 transition-all hover:scale-105">
                <Scissors size={16} className="text-luma-pink" />
                <span className="text-[11px] font-bold text-gray-200 tracking-wide">
                   هوش مصنوعی حذف پس‌زمینه ۳.۰
                </span>
             </div>

             {/* Headline with Platform Standard Gradient */}
             <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.15]">
                حذف پس‌زمینه
                <br />
                {/* Fixed Gradient: Added padding-bottom 4 to prevent clipping */}
                <span className="text-gradient-animated inline-block pb-4">
                   با دقت جادویی
                </span>
             </h1>

             {/* Description with relaxed line height */}
             <p className="text-lg md:text-xl text-gray-400 mb-12 font-light max-w-xl leading-loose">
                بدون نیاز به فتوشاپ یا ابزارهای پیچیده. تنها با یک کلیک، سوژه را از پس‌زمینه جدا کنید. ایده‌آل برای عکاسی محصول، پرتره و تبلیغات با بالاترین کیفیت ممکن.
             </p>

             {/* Feature Chips (Grid Layout) */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 w-full max-w-2xl">
                {[
                   { icon: Layers, label: "خروجی بدون پس‌زمینه", sub: "PNG Transparent", color: "text-luma-pink", bg: "bg-luma-pink/5", border: "border-luma-pink/20" },
                   { icon: CheckCircle2, label: "کیفیت فوق‌العاده", sub: "HD & 4K Ready", color: "text-luma-purple", bg: "bg-luma-purple/5", border: "border-luma-purple/20" },
                   { icon: Zap, label: "هزینه بسیار پایین", sub: "فقط ۲ لوم", color: "text-luma-yellow", bg: "bg-luma-yellow/5", border: "border-luma-yellow/20" },
                   { icon: Wand2, label: "تشخیص هوشمند", sub: "مو و لبه‌های دقیق", color: "text-blue-400", bg: "bg-blue-400/5", border: "border-blue-400/20" },
                ].map((item, i) => (
                   <div key={i} className={`flex items-center gap-4 p-5 rounded-[24px] border ${item.border} ${item.bg} hover:bg-opacity-30 transition-all duration-300 group cursor-default hover:-translate-y-1 shadow-lg shadow-black/20`}>
                      <div className={`p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 ${item.color} shadow-inner`}>
                         <item.icon size={26} />
                      </div>
                      <div className="flex flex-col text-right">
                         <span className="text-base font-bold text-white mb-1">{item.label}</span>
                         <span className="text-sm text-gray-400 font-medium opacity-90">{item.sub}</span>
                      </div>
                   </div>
                ))}
             </div>

             {/* Action Buttons */}
             <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-auto">
                <Button 
                   externalHref="https://lumai.ir/dashboard" 
                   variant="primary" 
                   className="px-8 py-3 text-base shadow-[0_0_40px_-10px_rgba(255,100,130,0.5)] border-0 ring-1 ring-white/50 hover:shadow-[0_0_60px_-10px_rgba(255,100,130,0.7)]"
                >
                   شروع کنید
                   <Zap size={20} className="fill-black" />
                </Button>
                <Button 
                   variant="secondary"
                   className="px-8 py-3 text-base border-white/10 hover:bg-white/5 backdrop-blur-md"
                >
                   مشاهده نمونه‌ها
                   <Star size={18} />
                </Button>
             </div>
          </motion.div>

          {/* Animation Content - Left Side (RTL) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 h-full min-h-[680px] flex flex-col"
          >
             {/* Dynamic Glow Behind Animation */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-luma-pink/20 via-luma-purple/20 to-transparent blur-3xl opacity-40 -z-10 rounded-[50px] animate-pulse-slow" />
             
             {/* The Animation Component Frame */}
             <div className="w-full h-full relative z-10 shadow-2xl shadow-black rounded-[40px] overflow-hidden border border-white/10 bg-[#0c0c0e]">
                <BgRemoveHeroAnim />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
