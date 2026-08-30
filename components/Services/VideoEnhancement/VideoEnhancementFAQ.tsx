import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { VideoEnhancementSectionBackground } from './VideoEnhancementSectionBackground';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'تفاوت بین مدل‌های Precision و Creative در چیست؟',
    answer: 'مدل‌های Precision (دقیق) صرفاً بر ارتقای مقیاس و وضوح پیکسل‌های موجود با وفاداری ۱۰۰٪ به محتوای اصلی تمرکز دارند و تغییری در فرم اشیا یا چهره ایجاد نمی‌کنند؛ این مدل‌ها برای کارهای مستند و حقوقی ایده‌آل هستند. در مقابل، مدل‌های Creative (خلاقانه) از هوش مصنوعی زایشی برای بازسازی بافت‌های نوری و جزئیات ظریف استفاده می‌کنند تا جذابیت بصری فوتیج به حداکثر برسد.',
  },
  {
    question: 'آیا در فرآیند افزایش کیفیت، صدای اصلی ویدئو حفظ می‌شود؟',
    answer: 'بله، تمامی مدل‌های ارتقای ویدئوی لوما تراک‌های صوتی اصلی، دیالوگ‌ها، موسیقی و افکت‌ها را با حفظ ۱۰۰٪ کیفیت اولیه و بدون فشرده‌سازی مضاعف یا ناهماهنگی زمانی مستقیماً به ویدئوی خروجی منتقل می‌کنند.',
  },
  {
    question: 'آیا امکان افزایش نرخ فریم ویدئوهای ۲۴ فریم به ۶۰ فریم وجود دارد؟',
    answer: 'بله، با استفاده از مدل Topaz Video Interpolate می‌توانید ویدئوهای ۲۴fps، ۳۰fps یا فوتیج‌های لرزان را به ۶۰ فریم بر ثانیه فوق‌العاده نرم و یکنواخت تبدیل کنید یا اسلوموشن‌های باکیفیت و بدون لگ بسازید.',
  },
  {
    question: 'حداکثر چه ضریب و رزولوشنی برای خروجی قابل انتخاب است؟',
    answer: 'بسته به رزولوشن ویدئوی ورودی، می‌توانید ضریب بزرگ‌نمایی تا ۴ برابر (4x) را انتخاب کرده و خروجی‌هایی تا رزولوشن ۴K UHD (3840×2160) با حداکثر جزئیات و شفافیت دریافت کنید.',
  },
  {
    question: 'هزینه و تعرفه مصرف لوم چگونه محاسبه می‌شود؟',
    answer: 'تعرفه پردازش بر اساس مدت زمان ویدئو (ثانیه/دقیقه)، رزولوشن ورودی و خروجی، ضریب افزایش مقیاس و مدل انتخابی محاسبه می‌شود. شروع قیمت‌ها از ۱ لوم برای مدل اقتصادی FlashVSR است و پیش‌فاکتور دقیق همواره قبل از شروع کار در داشبورد لوما نمایش داده می‌شود.',
  },
  {
    question: 'آیا برای افزایش کیفیت ویدئو به کارت گرافیک قدرتمند نیاز است؟',
    answer: 'خیر، نیازی به هیچ سخت‌افزار یا کارت گرافیک حرفه‌ای روی سیستم یا گوشی شما نیست. تمام پردازش‌های سنگین محاسباتی روی سرورهای ابری پیشرفته و پرسرعت لوما انجام می‌گیرد.',
  },
];

export const VideoEnhancementFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <VideoEnhancementSectionBackground variant="faq" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <HelpCircle size={14} className="text-luma-purple" />
            <span>پرسش‌های متداول</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.25]">
            پاسخ به <span className="text-gradient-animated inline-block pb-1">سوالات متداول</span> شما
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            اطلاعات لازم درباره نحوه عملکرد، مدل‌ها و شرایط پردازش هوشمند ویدئو در لوما.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#0D0D12] overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-luma-purple dark:hover:text-luma-purple transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-luma-purple' : 'text-zinc-500'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-black/5 dark:border-white/5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
