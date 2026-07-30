import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'آیا ابزار تبدیل متن به گفتار از فارسی پشتیبانی می‌کند؟',
    answer: 'بله، مدل‌هایی مانند Gemini 3.1 Flash TTS از زبان فارسی پشتیبانی می‌کنند. کیفیت و نوع پشتیبانی ممکن است میان مدل‌ها متفاوت باشد.',
  },
  {
    question: 'کدام مدل برای نریشن احساسی مناسب‌تر است؟',
    answer: 'ElevenLabs Eleven v3 برای روایت احساسی، داستان و اجرای نمایشی انتخاب مناسبی است.',
  },
  {
    question: 'برای تولید سریع و حجمی کدام مدل مناسب است؟',
    answer: 'MiniMax Speech 2.8 Turbo برای تعادل میان سرعت، طبیعی‌بودن و هزینه طراحی شده است.',
  },
  {
    question: 'آیا می‌توانم صدای خودم را شبیه‌سازی کنم؟',
    answer: 'خیر. Voice Cloning و ساخت صدای سفارشی در وضعیت فعلی ارائه نشده است.',
  },
  {
    question: 'هزینه ساخت صوت چگونه محاسبه می‌شود؟',
    answer: 'قاعده پایه براساس تعداد کاراکتر ورودی است، اما هزینه نهایی به مدل بستگی دارد. مبلغ نمایش‌داده‌شده پیش از ساخت برای همان درخواست ملاک است.',
  },
  {
    question: 'حداکثر طول متن چقدر است؟',
    answer: 'بسته به مدل متفاوت است؛ از ۵٬۰۰۰ کاراکتر در ElevenLabs تا ۵۰٬۰۰۰ کاراکتر در Gemini.',
  },
  {
    question: 'آیا تنظیمات همه مدل‌ها یکسان است؟',
    answer: 'خیر. صداها، کنترل احساس، سرعت، بلندی، زیر و بمی، زبان و فرمت براساس مدل تغییر می‌کنند.',
  },
];

export const TTSFAQ: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] dark:bg-[#0a0a0d] text-zinc-900 dark:text-white border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <HelpCircle size={14} />
            <span>سوالات متداول</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white">
            پاسخ به پرسش‌های شما
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base font-light">
            پاسخ سریع به متداول‌ترین سوالات درباره سرویس تبدیل متن به گفتار لوما.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#12121c] border border-black/5 dark:border-white/10 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-zinc-900 dark:text-white hover:text-luma-yellow transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 text-zinc-500 dark:text-gray-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-luma-yellow' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 text-zinc-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed font-light border-t border-black/5 dark:border-white/5 mt-1">
                        {item.answer}
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
