import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Film, Zap, Play } from 'lucide-react';
import Button from '../../Button';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';
import { VideoEnhancementMockup } from './VideoEnhancementMockup';

const Motion = motion as any;

export const VideoEnhancementHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToModels = () => {
    const el = document.getElementById('models');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden flex flex-col justify-center">
      <VideoEnhancementSectionBackground variant="hero" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Centered Content Block */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12 sm:mb-16">
          
          {/* Eyebrow Badge */}
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold shadow-sm"
          >
            <Sparkles size={14} className="text-luma-purple" />
            <span>افزایش کیفیت ویدئو با هوش مصنوعی</span>
          </Motion.div>

          {/* Main Display Headline */}
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.2]"
          >
            <span className="block mb-2">جزئیات بیشتری از</span>
            <span className="text-gradient-animated inline-block pb-2">
              ویدئوی خود بگیرید
            </span>
          </Motion.h1>

          {/* Subtitle / Description */}
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto"
          >
            ویدئوهای کم‌کیفیت، تار یا نویزی را با مدل‌های تخصصی لوما بهبود دهید؛ از افزایش وضوح و بازسازی جزئیات تا حذف نویز، رفع تاری و افزایش نرخ فریم به ۶۰fps با حفظ کامل صدای اصلی.
          </Motion.p>

          {/* CTA Buttons Row */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              externalHref="https://dash.lumai.ir/service/upscale-video"
              variant="primary"
              className="px-8 py-4 text-base shadow-xl shadow-luma-purple/20"
            >
              <span>ورود به ابزار ارتقای ویدئو</span>
              <ArrowLeft size={18} />
            </Button>

            <Button
              variant="secondary"
              className="px-8 py-4 text-base"
              onClick={handleScrollToModels}
            >
              <span>مشاهده و مقایسه مدل‌ها</span>
            </Button>
          </Motion.div>

          {/* Value Props Strip */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luma-purple" />
              <span>۹ مدل تخصصی پردازش ویدئو</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luma-pink" />
              <span>ارتقای رزولوشن تا ۴K و ۶۰fps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luma-yellow" />
              <span>شروع تعرفه از ۱ LUM</span>
            </div>
          </Motion.div>
        </div>

        {/* Hero Interactive Simulated Enhancement Mockup */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-full mt-4"
        >
          <VideoEnhancementMockup />
        </Motion.div>

      </div>
    </section>
  );
};
