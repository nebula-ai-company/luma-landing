import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';

interface FAQItem {
  question: string;
  answer: string;
  accent: 'yellow' | 'purple' | 'pink';
}

const FAQS: FAQItem[] = [
  {
    question: 'آیا فایل‌های صوتی تولید شده کیفیت مناسب برای پخش در تلویزیون یا پادکست دارند؟',
    answer: 'بله، مدل‌های استودیویی لوما مانند ElevenLabs v3 و MiniMax HD فایل صوتی را با بالاترین وضوح خروجی گرفته و فرمت بی‌کیفیت-افت WAV نیز پشتیبانی می‌شود.',
    accent: 'yellow',
  },
  {
    question: 'آیا تلفظ واژگان فارسی و اعراب‌گذاری به شکل صحیح صورت می‌پذیرد؟',
    answer: 'مدل‌های موجود در لوما به‌ویژه Gemini 3.1 Flash و MiniMax Speech 2.8 برای پردازش متن فارسی آموزش دیده‌اند و کلمات دشوار را با تلفظ طبیعی بیان می‌کنند.',
    accent: 'purple',
  },
  {
    question: 'آیا می‌توانم متون انگلیسی و فارسی را در یک فایل صوتی ترکیب کنم؟',
    answer: 'بله، مدل‌های چندزبانه به صورت هوشمند تغییر زبان از فارسی به انگلیسی و بالعکس را تشخیص داده و گوینده با لهجه طبیعی کلمات انگلیسی را تلفظ می‌نماید.',
    accent: 'pink',
  },
  {
    question: 'آیا امکان دانلود فایل‌های صوتی با فرمت‌های مختلف وجود دارد؟',
    answer: 'بله، بر اساس مدل انتخابی می‌توانید فایل صوتی را در فرمت‌های استاندارد MP3، WAV و AAC بارگیری نمایید.',
    accent: 'yellow',
  },
  {
    question: 'حداکثر طول متنی که در یک نوبت می‌توان وارد کرد چقدر است؟',
    answer: 'مدل Gemini 3.1 Flash تا ۵۰,۰۰۰ کاراکتر، مدل MiniMax تا ۱۰,۰۰۰ کاراکتر و مدل ElevenLabs تا ۵,۰۰۰ کاراکتر در یک درخواست را پشتیبانی می‌کنند.',
    accent: 'purple',
  },
  {
    question: 'محاسبه هزینه LUM برای تولید گفتار به چه صورت است؟',
    answer: 'به ازای هر ۴ کاراکتر متن ورودی، بین ۱ تا ۴ LUM (بسته به مدل انتخابی) از اعتبار حساب شما کسر خواهد شد.',
    accent: 'pink',
  },
];

export const TTSFAQ: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="faq" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <HelpCircle size={14} className="text-luma-purple" />
            <span>سوالات متداول</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            پرسش‌های متداول سرویس گفتار
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            پاسخ به سوالات رایج درباره کیفیت، مدل‌ها و نحوه کاربری سرویس تبدیل متن به گفتار.
          </p>
        </div>

        {/* FAQ Items Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
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
                <TTSHoverCard accentColor={faq.accent} onClick={() => toggleFAQ(idx)}>
                  <div className="p-6 cursor-pointer select-none">
                    
                    {/* Accordion Question Header */}
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
                        {faq.question}
                      </h3>

                      <div className={`w-8 h-8 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-luma-yellow' : 'text-zinc-500'}`}>
                        <ChevronDown size={18} />
                      </div>
                    </div>

                    {/* Accordion Answer Content */}
                    <AnimatePresence>
                      {isOpen && (
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
                      )}
                    </AnimatePresence>

                  </div>
                </TTSHoverCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
