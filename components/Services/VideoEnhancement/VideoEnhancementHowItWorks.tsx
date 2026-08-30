import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { UploadCloud, Sliders, PlayCircle, Download, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: any;
  accent: 'purple' | 'pink' | 'yellow';
  details: string[];
  visualBadge: string;
}

const STEPS: Step[] = [
  {
    number: '۰۱',
    title: 'بارگذاری ویدئو در داشبورد',
    description: 'ویدئوی موردنظر خود را با هر فرمت متداول (MP4، MOV، WebM، MKV) بدون نیاز به تبدیل اولیه آپلود کنید.',
    icon: UploadCloud,
    accent: 'purple',
    visualBadge: 'Drag & Drop Upload',
    details: ['پشتیبانی از انواع فرمت‌های ویدیویی', 'آپلود با سرعت بالا و رمزنگاری امن', 'بدون افت کیفیت فایل ورودی'],
  },
  {
    number: '۰۲',
    title: 'انتخاب مدل و پارامترها',
    description: 'از بین ۹ مدل تخصصی لوما، گزینه متناسب با ایراد ویدئوی خود (ارتقای ابعاد، حذف نویز، رفع تاری یا روان‌سازی) را انتخاب کنید.',
    icon: Sliders,
    accent: 'pink',
    visualBadge: 'Model & Scale Config',
    details: ['تنظیم ضریب بزرگ‌نمایی تا ۴x', 'انتخاب خروجی نرخ فریم تا ۶۰fps', 'امکان انتخاب حالت‌های دقیق یا خلاقانه'],
  },
  {
    number: '۰۳',
    title: 'تست اولیه و پیش‌فاکتور شفاف',
    description: 'پیش از پردازش کامل، میزان دقیق مصرف لوم را مشاهده کرده و در صورت تمایل چند ثانیه ابتدایی را به رایگان تست کنید.',
    icon: PlayCircle,
    accent: 'yellow',
    visualBadge: 'Transparent Billing',
    details: ['شفافیت کامل در محاسبه هزینه', 'پردازش با پردازنده‌های گرافیکی H100 ابری', 'عدم مصرف رم یا باتری دستگاه شما'],
  },
  {
    number: '۰۴',
    title: 'دانلود خروجی با حفظ صدا',
    description: 'ویدئوی بازسازی‌شده را بررسی کنید، مقایسه زنده قبل و بعد را ببینید و فایل نهایی را با حفظ ۱۰۰٪ صدا دریافت کنید.',
    icon: Download,
    accent: 'purple',
    visualBadge: 'Instant 4K Download',
    details: ['دانلود ویدئو با کیفیت سینمایی ۲K/4K', 'حفظ ۱۰۰٪ کیفیت و سینک صدای اصلی', 'بدون هیچ‌گونه واترمارک اجباری'],
  },
];

export const VideoEnhancementHowItWorks: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-32 bg-white dark:bg-[#07070A] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="howItWorks" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Sparkles size={14} className="text-luma-purple" />
            <span>مراحل ساده و خودکار پردازش</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.2]">
            از ویدئوی معمولی تا <span className="text-gradient-animated inline-block pb-1">خروجی سینمایی</span> در ۴ گام
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            فرآیندی روان و بدون نیاز به دانش تدوین ویدیویی؛ پردازش به صورت ابری روی سرورهای فوق‌سریع لوما انجام می‌شود.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STEPS.map((step, idx) => {
            const accentColor = 
              step.accent === 'purple' ? 'text-luma-purple' : step.accent === 'pink' ? 'text-luma-pink' : 'text-luma-yellow';

            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full flex flex-col relative"
              >
                <VideoEnhancementHoverCard
                  accentColor={step.accent}
                  className="h-full flex flex-col"
                  innerClassName="p-6 sm:p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Step Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-transform duration-200 group-hover:scale-105">
                        <step.icon size={22} className={accentColor} />
                      </div>
                      <span className="text-3xl font-black text-zinc-400 dark:text-zinc-600">
                        {step.number}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                        {step.visualBadge}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-1.5 pt-3 border-t border-black/5 dark:border-white/10 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {step.details.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <Check size={12} className={`${accentColor} shrink-0 mt-0.5`} />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </VideoEnhancementHoverCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <a
            href="https://dash.lumai.ir/service/upscale-video"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-200 group"
          >
            <span>شروع بازسازی ویدئو در ابزار لوما</span>
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
