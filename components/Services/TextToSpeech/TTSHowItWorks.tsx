import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Edit3, SlidersHorizontal, Download, ArrowLeft } from 'lucide-react';

const STEPS = [
  {
    number: '۰۱',
    icon: Edit3,
    title: 'متن خود را وارد کنید',
    description: 'متن فارسی یا چندزبانه موردنظر را بنویسید یا وارد کنید.',
  },
  {
    number: '۰۲',
    icon: SlidersHorizontal,
    title: 'مدل و صدا را انتخاب کنید',
    description: 'براساس طبیعی‌بودن، سرعت، احساس و نوع محتوا مدل مناسب را انتخاب کنید.',
  },
  {
    number: '۰۳',
    icon: Download,
    title: 'فایل صوتی را بسازید',
    description: 'هزینه را بررسی کنید و خروجی صوتی را با فرمت انتخابی دریافت کنید.',
  },
];

export const TTSHowItWorks: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] dark:bg-[#0a0a0d] text-zinc-900 dark:text-white border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luma-yellow/10 border border-luma-yellow/20 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <span>مراحل تولید</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            چگونه فایل صوتی بسازیم؟
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg font-light">
            در ۳ گام ساده، نوشته‌های خود را به گفتاری روان و استودیویی تبدیل کنید.
          </p>
        </div>

        {/* 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-[#12121a] border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-luma-yellow/15 border border-luma-yellow/30 text-zinc-950 dark:text-luma-yellow flex items-center justify-center font-bold">
                    <step.icon size={22} />
                  </div>

                  <span className="text-3xl font-black font-mono text-zinc-300 dark:text-zinc-800">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Connecting Desktop Arrow Indicator */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-[#12121a] border border-black/10 dark:border-white/10 items-center justify-center text-zinc-400">
                  <ArrowLeft size={14} className="rotate-180" />
                </div>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
