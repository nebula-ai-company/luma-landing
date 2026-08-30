import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AudioLines, ArrowLeft, ChevronDown } from 'lucide-react';
import Button from '../../Button';
import { TTSMockup } from './TTSMockup';

export const TTSHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToModels = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('models');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-28 overflow-hidden bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      
      {/* Background Atmosphere & Moving Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Animated Radial Lighting Orbs */}
        <motion.div 
          animate={shouldReduceMotion ? {} : { x: [-30, 30, -30], y: [-20, 20, -20], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-luma-yellow/6 via-luma-yellow/3 to-transparent dark:from-luma-yellow/5 dark:via-luma-yellow/3 rounded-full blur-[150px] pointer-events-none" 
        />
        <motion.div 
          animate={shouldReduceMotion ? {} : { x: [30, -30, 30], y: [20, -20, 20], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-luma-purple/8 via-luma-purple/3 to-transparent dark:from-luma-purple/6 dark:via-luma-purple/3 rounded-full blur-[140px] pointer-events-none" 
        />
        <motion.div 
          animate={shouldReduceMotion ? {} : { scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luma-pink/4 dark:bg-luma-pink/5 rounded-full blur-[160px] pointer-events-none" 
        />

        {/* Subtle Low-Opacity Fine Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
      </div>

      {/* Smooth Bottom Masked Transition Overlay to prevent any sharp lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent dark:from-black dark:via-black/80 pointer-events-none z-10" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content (Right side in RTL) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 text-right space-y-6"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-900 dark:text-luma-yellow text-xs font-bold shadow-xs">
              <AudioLines size={14} className="text-luma-yellow" />
              <span>استودیو صدای هوش مصنوعی</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white leading-[1.15] tracking-tight">
              هر متن،
              <br />
              <span className="text-gradient-animated inline-block pb-1">
                با صدایی زنده
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed font-light max-w-xl">
              متن فارسی و چندزبانه را با انتخاب مدل، صدا و سبک بیان به فایل صوتی طبیعی و حرفه‌ای تبدیل کنید.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                externalHref="https://dash.lumai.ir/service/text-to-speech"
                variant="primary"
                className="bg-zinc-950 dark:bg-luma-yellow text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-luma-yellow/90 shadow-xl shadow-luma-yellow/10 px-7 py-3.5 text-sm font-bold justify-center"
              >
                ساخت صدا با هوش مصنوعی
                <ArrowLeft size={16} />
              </Button>

              <a
                href="#models"
                onClick={scrollToModels}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-800 dark:text-gray-200 text-sm font-medium transition-colors"
              >
                <span>مقایسه مدل‌ها</span>
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Key Value Props */}
            <div className="pt-6 border-t border-black/5 dark:border-white/10 grid grid-cols-3 gap-3 text-center sm:text-right">
              <div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">۴+</div>
                <div className="text-[11px] text-zinc-500 dark:text-gray-400">مدل پیشرفته</div>
              </div>
              <div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">FA/EN+</div>
                <div className="text-[11px] text-zinc-500 dark:text-gray-400">چندزبانه واقعی</div>
              </div>
              <div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">۱ LUM</div>
                <div className="text-[11px] text-zinc-500 dark:text-gray-400">به‌ازای ۴ کاراکتر</div>
              </div>
            </div>

          </motion.div>

          {/* Interactive Mockup Container (Left side in RTL) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 w-full"
          >
            <TTSMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
