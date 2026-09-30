import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { UploadCloud, Sliders, PlayCircle, Download, Sparkles } from 'lucide-react';
import { VideoEnhancementHoverCard } from './VideoEnhancementHoverCard';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';
import { formatPersianDigits } from '../../../lib/catalogApi.ts';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: any;
  accent: 'purple' | 'pink' | 'yellow';
  details: string[];
  visualBadge: string;
}

export interface VideoEnhancementHowItWorksProps {
  modelCount?: number;
}

export const VideoEnhancementHowItWorks: React.FC<VideoEnhancementHowItWorksProps> = ({ modelCount }) => {
  const shouldReduceMotion = useReducedMotion();

  const countIntro = modelCount && modelCount > 0
    ? `از بین ${formatPersianDigits(modelCount)} مدل تخصصی لوما، `
    : 'از بین مدل‌های تخصصی کاتالوگ لوما، ';

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
      description: `${countIntro}گزینه متناسب با ایراد ویدئوی خود (ارتقای ابعاد، حذف نویز، رفع تاری یا روان‌سازی) را انتخاب کنید.`,
      icon: Sliders,
      accent: 'pink',
      visualBadge: 'Model & Scale Config',
      details: ['امکان تنظیم ضریب بزرگ‌نمایی متناسب با مدل', 'امکان روان‌سازی حرکت و تنظیم نرخ فریم', 'انتخاب حالت‌های متنوع بازسازی بافت'],
    },
    {
      number: '۰۳',
      title: 'تست اولیه و پیش‌فاکتور شفاف',
      description: 'پیش از پردازش کامل، میزان دقیق مصرف لوم را بر اساس مشخصات فایل مشاهده کرده و در صورت تمایل تست اولیه را اجرا کنید.',
      icon: PlayCircle,
      accent: 'yellow',
      visualBadge: 'Transparent Billing',
      details: ['شفافیت کامل در محاسبه هزینه', 'پردازش با کلاستر ابری پرسرعت لوما', 'عدم مصرف رم یا باتری دستگاه شما'],
    },
    {
      number: '۰۴',
      title: 'دانلود خروجی باکیفیت و سینک صدا',
      description: 'ویدئوی بازسازی‌شده را بررسی کنید، مقایسه زنده قبل و بعد را ببینید و فایل نهایی را با بالاترین کیفیت دانلود کنید.',
      icon: Download,
      accent: 'purple',
      visualBadge: 'Direct High-Res Download',
      details: ['دانلود ویدئو با وضوح و جزئیات بالا', 'حفظ کیفیت و سینک صدای اصلی در مدل‌های پشتیبانی‌شده', 'بدون هیچ‌گونه واترمارک اجباری'],
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white dark:bg-[#07070A] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="howItWorks" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Sparkles size={14} className="text-luma-purple" aria-hidden="true" />
            <span>مراحل ساده و خودکار پردازش</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.2]">
            از ویدئوی معمولی تا <span className="text-gradient-animated inline-block pb-1">خروجی سینمایی</span> در ۴ گام
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            فرآیندی روان و بدون نیاز به دانش تدوین ویدیویی؛ پردازش به صورت ابری روی سرورهای فوق‌سریع لوما انجام می‌شود.
          </p>
        </header>

        {/* Steps Grid */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch list-none p-0 m-0">
          {STEPS.map((step, idx) => {
            const accentColor = 
              step.accent === 'purple' ? 'text-luma-purple' : step.accent === 'pink' ? 'text-luma-pink' : 'text-luma-yellow';

            return (
              <motion.li
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full flex flex-col relative list-none"
              >
                <article aria-label={`مرحله ${step.number}: ${step.title}`} className="h-full flex flex-col">
                  <VideoEnhancementHoverCard
                    accentColor={step.accent}
                    className="h-full flex flex-col"
                    innerClassName="p-6 sm:p-7 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top Bar: Step Number & Visual Badge */}
                      <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                        <span className={`text-2xl font-black font-mono ${accentColor}`}>
                          {step.number}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                          {step.visualBadge}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white transition-transform duration-200 group-hover:scale-105">
                          <step.icon size={20} className={accentColor} aria-hidden="true" />
                        </div>
                        <h3 className="text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {step.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                            <span className={`w-1 h-1 rounded-full shrink-0 mt-1.5 ${
                              step.accent === 'purple' ? 'bg-luma-purple' : step.accent === 'pink' ? 'bg-luma-pink' : 'bg-luma-yellow'
                            }`} aria-hidden="true" />
                            <span className="leading-snug">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </VideoEnhancementHoverCard>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
