import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coins, Info, Cpu, Clock, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

export const VideoEnhancementPricingNotes: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const startingRates = [
    { model: 'FlashVSR', rate: '۱ LUM', note: 'ارتقای ۴ برابر اقتصادی و سریع' },
    { model: 'SeedVR2 Video Upscaler', rate: '۲ LUM', note: 'بازسازی عمیق بافت و چهره' },
    { model: 'Topaz Video Precision', rate: '۱۵ LUM', note: 'بزرگ‌نمایی وفادارانه بدون تغییر محتوا' },
    { model: 'Topaz Video Deblur', rate: '۱۵ LUM', note: 'رفع تاری حرکتی بدون تغییر اندازه' },
    { model: 'Topaz Video Denoise', rate: '۳۰ LUM', note: 'حذف نویز ایزو بدون تغییر اندازه' },
    { model: 'Topaz Video Interpolate', rate: '۴۵ LUM', note: 'تولید فریم میانی تا ۶۰fps' },
    { model: 'Topaz Video Generative', rate: '۱۸۰ LUM', note: 'بازیابی زایشی جزئیات منابع سخت' },
    { model: 'FLUX Video Upscale', rate: '۲۱۰ LUM', note: 'حالت‌های دقیق یا خلاقانه' },
    { model: 'Topaz Video Creative', rate: '۴۵۰ LUM', note: 'بزرگ‌نمایی خلاقانه همراه تولید بافت' },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-white dark:bg-[#07070A] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="pricing" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <Coins size={14} className="text-luma-yellow" />
            <span>شفافیت در تعرفه و هزینه</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            نحوه محاسبه <span className="text-gradient-animated inline-block pb-1">مصرف لوم</span> در پردازش ویدئو
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            تعرفه پایه هر مدل به طور شفاف تعریف شده و پیش‌فاکتور دقیق قبل از کسر لوم نمایش داده می‌شود.
          </p>
        </div>

        {/* Big Highlight Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-zinc-100 dark:bg-[#121218] border border-luma-purple/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-luma-purple/20 border border-luma-purple/40 flex items-center justify-center text-luma-purple shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-zinc-950 dark:text-white">
              عوامل مؤثر بر هزینه نهایی:
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              هزینه نهایی میتواند با مدت ویدئو، رزولوشن، ضریب افزایش و تنظیمات مدل تغییر کند. در داشبورد لوما پیش از آغاز هر رندر، پیش‌فاکتور شفاف به شما نمایش داده خواهد شد.
            </p>
          </div>
        </div>

        {/* 2 Column Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Starting Rates Table (7 cols) */}
          <div className="lg:col-span-7">
            <VideoEnhancementHoverCard
              accentColor="purple"
              innerClassName="p-6 sm:p-8 space-y-4"
            >
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white pb-3 border-b border-black/5 dark:border-white/10">
                نرخ پایه شروع مدل‌ها (Starting Rates)
              </h3>
              <div className="space-y-2.5">
                {startingRates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-200 block">{item.model}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.note}</span>
                    </div>
                    <span className="font-bold text-luma-purple shrink-0 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-lg">
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>
            </VideoEnhancementHoverCard>
          </div>

          {/* Infrastructure & Efficiency Benefits (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <VideoEnhancementHoverCard
              accentColor="yellow"
              innerClassName="p-6 sm:p-8 space-y-5"
            >
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white pb-3 border-b border-black/5 dark:border-white/10">
                مزایای پردازش ابری لوما
              </h3>

              <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-luma-yellow/10 text-luma-yellow flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200 block mb-0.5">صفر درصد استهلاک سخت‌افزار شما</span>
                    <p className="leading-relaxed font-light">تمامی محاسبات سنگین در سرورهای ابری قدرتمند با جدیدترین پردازنده‌های گرافیکی انجام می‌شود.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-luma-purple/10 text-luma-purple flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200 block mb-0.5">تضمین کیفیت و بازپرداخت</span>
                    <p className="leading-relaxed font-light">در صورت بروز هرگونه اختلال در فرآیند پردازش، اعتبار لوم به صورت خودکار به حسابتان بازمی‌گردد.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-luma-pink/10 text-luma-pink flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200 block mb-0.5">سرعت پردازش تا ۱۰ برابر سریع‌تر</span>
                    <p className="leading-relaxed font-light">در مقایسه با سیستم‌های شخصی، رندر ویدئو در کسری از زمان معمول تکمیل می‌شود.</p>
                  </div>
                </div>
              </div>
            </VideoEnhancementHoverCard>
          </div>

        </div>

      </div>
    </section>
  );
};
