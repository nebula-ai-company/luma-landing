import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { WorkflowHeroAnim } from './WorkflowHeroAnim';
import { WorkflowSectionBackground } from './WorkflowSectionBackground';
import Button from '../../Button';

const Motion = motion as any;

export const WorkflowHero: React.FC = () => {
  const handleScrollToProcess = () => {
    const el = document.getElementById('workflow-process');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-24 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] flex items-center transition-colors duration-300">
      
      {/* 1. Animated Workflow Background Network */}
      <WorkflowSectionBackground variant="hero" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          
          {/* Hero Left: Information and Persian copy */}
          <div className="lg:col-span-5 flex flex-col items-start text-right">
            
            {/* Tag Badge */}
            <Motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-purple/10 border border-luma-purple/20 text-xs font-black text-luma-purple uppercase tracking-wider mb-8"
            >
              <Zap size={12} className="text-luma-purple" />
              <span>ورک‌فلوهای لوما</span>
              <span className="h-2 w-2 rounded-full bg-luma-purple animate-ping" />
            </Motion.div>

            {/* Main Headline */}
            <Motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.25rem] font-black text-zinc-950 dark:text-white leading-[1.15] tracking-tighter mb-4 break-keep"
            >
              فرآیندها را به
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luma-purple via-luma-pink to-luma-yellow">
                ورک‌فلوهای هوشمند
              </span>{' '}
              تبدیل کنید
            </Motion.h1>

            {/* Sub-headline */}
            <Motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-gray-300 leading-normal tracking-tight mb-6"
            >
              یکبار بسازید، بارها اجرا کنید
            </Motion.h2>

            {/* Description Paragraph */}
            <Motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed mb-10 max-w-[50ch] text-justify"
            >
              مدل‌های هوش مصنوعی، ابزارهای لوما، ورودی‌ها و خروجی‌ها را روی یک بوم بصری به هم متصل کنید و فرآیندهای تکراری را به ورک‌فلوهای قابل استفاده مجدد تبدیل کنید.
            </Motion.p>

            {/* Standardized Sized Action Buttons */}
            <Motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
            >
              <Button
                externalHref="https://dash.lumai.ir/"
                variant="primary"
                className="w-full sm:w-auto justify-center group"
              >
                <span>ساخت اولین ورک‌فلو</span>
                <ArrowRight size={18} className="mr-1 group-hover:translate-x-1 transition-transform rotate-180" />
              </Button>

              <Button
                variant="secondary"
                onClick={handleScrollToProcess}
                className="w-full sm:w-auto justify-center gap-2"
              >
                <RefreshCw size={18} className="animate-spin-slow text-luma-purple" />
                <span>نحوه کار</span>
              </Button>
            </Motion.div>

            {/* Supporting Chips */}
            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3 pt-6 border-t border-zinc-200/50 dark:border-white/5 w-full justify-start"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100/50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/5 text-xs text-zinc-600 dark:text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-luma-purple" />
                <span>ساخت بصری</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100/50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/5 text-xs text-zinc-600 dark:text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-luma-pink" />
                <span>اجرای دستی و خودکار</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100/50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/5 text-xs text-zinc-600 dark:text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-luma-yellow" />
                <span>قابل استفاده مجدد</span>
              </div>
            </Motion.div>

          </div>

          {/* Hero Right: Living Workflow Canvas Animation */}
          <div className="lg:col-span-7 min-w-0 w-full">
            <Motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
              <WorkflowHeroAnim />
            </Motion.div>
          </div>

        </div>
      </div>
      
      {/* Edge Soft Fade Gradient into Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
};
