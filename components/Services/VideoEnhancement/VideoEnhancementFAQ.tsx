import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';
import type { MediaServicePriceInfo } from '../../../lib/catalogApi.ts';
import { formatPersianDigits, formatCurrencyLabel } from '../../../lib/catalogApi.ts';

interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoEnhancementFAQProps {
  startingPrice?: number | null;
  priceInfo?: MediaServicePriceInfo | null;
}

export const VideoEnhancementFAQ: React.FC<VideoEnhancementFAQProps> = ({ startingPrice, priceInfo }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  let priceNote = '';
  if (priceInfo && !priceInfo.hasMixedCurrencies) {
    priceNote = ` (شروع تعرفه از ${formatPersianDigits(priceInfo.minimum)} ${formatCurrencyLabel(priceInfo.currency)})`;
  } else if (startingPrice !== undefined && startingPrice !== null) {
    priceNote = ` (شروع تعرفه از ${formatPersianDigits(startingPrice)} لوم)`;
  }

  const FAQ_DATA: FAQItem[] = [
    {
      question: 'مدل‌های مختلف ارتقای ویدئو چه تفاوتی با هم دارند؟',
      answer: 'مدل‌های هوش مصنوعی ارتقای کیفیت ویدئو در لوما برای اهداف متفاوتی بهینه‌سازی شده‌اند؛ برخی بر ارتقای مقیاس و وضوح (Upscaling) تمرکز دارند، برخی برای بازسازی بافت چهره یا جزئیات دقیق بهینه‌سازی شده‌اند، و مدل‌های دیگر برای حذف نویز (Denoise)، رفع تاری حرکتی (Deblur) یا روان‌سازی و افزایش نرخ فریم (Interpolation) به کار می‌روند. قابلیت‌ها، تگ‌ها و نرخ پایه هر مدل در بخش فهرست زنده مدل‌ها به صورت شفاف مشخص شده است.',
    },
    {
      question: 'آیا در فرآیند افزایش کیفیت، صدای اصلی ویدئو حفظ می‌شود؟',
      answer: 'در مدل‌هایی که از انتقال صدا پشتیبانی می‌کنند، تراک‌های صوتی، دیالوگ‌ها و موسیقی با کیفیت کامل و همگام‌سازی دقیق به خروجی منتقل می‌شوند. برای فرآیندهایی نظیر درون‌یابی فریم یا تغییرات خاص ساختاری، وضعیت پشتیبانی از صدا در توضیحات و قابلیت‌های هر مدل در کاتالوگ درج گردیده است.',
    },
    {
      question: 'آیا امکان افزایش نرخ فریم و روان‌سازی ویدئوها وجود دارد؟',
      answer: 'برخی مدل‌ها قابلیت بهبود حرکت یا افزایش نرخ فریم به ۶۰fps و ساخت اسلوموشن نرم را ارائه می‌کنند؛ قابلیت‌های تخصصی هر مدل در فهرست زنده مدل‌ها نمایش داده می‌شود.',
    },
    {
      question: 'حداکثر چه ضریب و رزولوشنی برای خروجی قابل انتخاب است؟',
      answer: 'رزولوشن و ضریب افزایش قابل انتخاب به مدل انتخابی، کیفیت ویدئوی ورودی و تنظیمات پردازش بستگی دارد و مشخصات پشتیبانی‌شده هر مدل در کاتالوگ زنده در دسترس است.',
    },
    {
      question: 'هزینه و تعرفه مصرف لوم چگونه محاسبه می‌شود؟',
      answer: `تعرفه پردازش بر اساس مدت زمان ویدئو (ثانیه/دقیقه)، رزولوشن ورودی و خروجی، ضریب افزایش مقیاس و مدل انتخابی محاسبه می‌شود${priceNote}. همچنین پیش‌فاکتور دقیق مصرف لوم همواره پیش از شروع هر پردازش در داشبورد لوما نمایش داده می‌شود.`,
    },
    {
      question: 'آیا برای افزایش کیفیت ویدئو به کارت گرافیک قدرتمند نیاز است؟',
      answer: 'خیر، پردازش به صورت کامل روی کلاستر پردازش ابری لوما انجام شده و هیچ باری بر سخت‌افزار یا باتری سیستم شما تحمیل نمی‌شود.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="faq" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <HelpCircle size={14} className="text-luma-purple" aria-hidden="true" />
            <span>پرسش‌های متداول</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            پاسخ به <span className="text-gradient-animated inline-block pb-1">سوالات متداول</span> شما
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            اطلاعات لازم درباره نحوه عملکرد، مدل‌ها و شرایط پردازش هوشمند ویدئو در لوما.
          </p>
        </header>

        {/* FAQ Accordion List */}
        <ul className="space-y-4 list-none p-0 m-0">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={index}
                className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#0D0D12] overflow-hidden transition-all duration-200 shadow-sm list-none"
              >
                <button
                  type="button"
                  id={`video-faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`video-faq-answer-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-luma-purple dark:hover:text-luma-purple transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-luma-purple' : 'text-zinc-500'
                  }`}>
                    <ChevronDown size={18} aria-hidden="true" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`video-faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`video-faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed border-t border-black/5 dark:border-white/5 pt-4 m-0">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
