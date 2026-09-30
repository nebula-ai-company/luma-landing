import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';
import type { MediaServicePriceInfo } from '../../../lib/catalogApi.ts';
import { formatPersianDigits, formatCurrencyLabel } from '../../../lib/catalogApi.ts';

interface FAQItem {
  question: string;
  answer: string;
  accent: 'yellow' | 'purple' | 'pink';
}

export interface TTSFAQProps {
  priceInfo?: MediaServicePriceInfo | null;
  startingPrice?: number | null;
}

export const TTSFAQ: React.FC<TTSFAQProps> = ({ priceInfo, startingPrice }) => {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let priceNote = '';
  if (priceInfo && !priceInfo.hasMixedCurrencies) {
    priceNote = ` (شروع تعرفه از ${formatPersianDigits(priceInfo.minimum)} ${formatCurrencyLabel(priceInfo.currency)})`;
  } else if (startingPrice !== undefined && startingPrice !== null) {
    priceNote = ` (شروع تعرفه از ${formatPersianDigits(startingPrice)} لوم)`;
  }

  const FAQS: FAQItem[] = [
    {
      question: 'آیا فایل‌های صوتی تولید شده کیفیت مناسب برای پخش در رسانه‌ها یا پادکست دارند؟',
      answer: 'بله، مدل‌های استودیویی لوما فایل صوتی را با وضوح بالا و شفافیت کلامی خروجی می‌دهند و برای استفاده در رسانه‌ها، ویدئوها و پادکست‌های حرفه‌ای بهینه‌سازی شده‌اند.',
      accent: 'yellow',
    },
    {
      question: 'آیا تلفظ واژگان فارسی و اعراب‌گذاری به شکل صحیح صورت می‌پذیرد؟',
      answer: 'کیفیت تلفظ فارسی به مدل و متن ورودی بستگی دارد. برای واژه‌های خاص یا کلمات هم‌نویسه، استفاده از نشانه‌گذاری و اعراب مناسب می‌تواند به خوانش دقیق‌تر کمک کند.',
      accent: 'purple',
    },
    {
      question: 'آیا می‌توانم متون انگلیسی و فارسی را در یک فایل صوتی ترکیب کنم؟',
      answer: 'برخی مدل‌های چندزبانه امکان پردازش متن شامل چند زبان را دارند. قابلیت دقیق هر مدل در توضیحات و قابلیت‌های زنده آن نمایش داده می‌شود.',
      accent: 'pink',
    },
    {
      question: 'آیا امکان دانلود فایل‌های صوتی با فرمت‌های مختلف وجود دارد؟',
      answer: 'بله، بر اساس تنظیمات و قابلیت‌های استودیو، دریافت فایل صوتی خروجی در فرمت‌های استاندارد صوتی امکان‌پذیر است.',
      accent: 'yellow',
    },
    {
      question: 'حداکثر طول متنی که در یک نوبت می‌توان وارد کرد چقدر است؟',
      answer: 'حداکثر طول متن می‌تواند بر اساس مدل انتخابی متفاوت باشد و محدودیت‌های قابل اعمال در رابط ابزار و داشبورد نمایش داده می‌شود.',
      accent: 'purple',
    },
    {
      question: 'محاسبه هزینه و تعرفه برای تولید گفتار به چه صورت است؟',
      answer: `تعرفه به مدل انتخابی و واحد محاسبه آن بستگی دارد${priceNote}. نرخ و توضیح محاسبه هر مدل به‌صورت زنده در بخش مدل‌ها و پیش از آغاز پردازش در داشبورد لوما نمایش داده می‌شود.`,
      accent: 'pink',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="faq" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <HelpCircle size={14} className="text-luma-purple" aria-hidden="true" />
            <span>سوالات متداول</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            پرسش‌های متداول سرویس گفتار
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            پاسخ به سوالات رایج درباره کیفیت، مدل‌ها و نحوه کاربری سرویس تبدیل متن به گفتار.
          </p>
        </header>

        {/* FAQ Items Accordion Grid */}
        <dl className="max-w-4xl mx-auto space-y-4 m-0">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TTSHoverCard accentColor={faq.accent}>
                  <div className="p-6 select-none">
                    
                    {/* Accordion Question Header */}
                    <dt>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`tts-faq-ans-${idx}`}
                        onClick={() => toggleFAQ(idx)}
                        className="w-full flex items-center justify-between gap-4 text-right cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit"
                      >
                        <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                          {faq.question}
                        </span>

                        <div className={`w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-luma-yellow' : 'text-zinc-500'}`}>
                          <ChevronDown size={18} aria-hidden="true" />
                        </div>
                      </button>
                    </dt>

                    {/* Accordion Answer Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <dd id={`tts-faq-ans-${idx}`} className="m-0">
                          <motion.div
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="pt-4 text-xs sm:text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light border-t border-black/5 dark:border-white/10 mt-4">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </dd>
                      )}
                    </AnimatePresence>

                  </div>
                </TTSHoverCard>
              </motion.div>
            );
          })}
        </dl>

      </div>
    </section>
  );
};
