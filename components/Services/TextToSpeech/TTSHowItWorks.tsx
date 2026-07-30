import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, SlidersHorizontal, Download, ArrowLeft } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';

const STEPS = [
  {
    number: '۰۱',
    title: 'ورود متن فارسی یا چندزبانه',
    description: 'متن مقاله، داستان، پادکست یا سناریوی ویدئوی خود را در کادر متنی وارد کرده یا فایل متنی ارسال کنید.',
    icon: FileText,
    accent: 'yellow' as const,
  },
  {
    number: '۰۲',
    title: 'تنظیمات مدل و گوینده',
    description: 'مدل هوش مصنوعی، صدای گوینده، سبک بیان (روایی، هیجانی، رسمی) و فرمت صوتی موردنظر را انتخاب کنید.',
    icon: SlidersHorizontal,
    accent: 'purple' as const,
  },
  {
    number: '۰۳',
    title: 'تولید و دریافت خروجی صوتی',
    description: 'با یک کلیک پردازش را آغاز کرده، پیش‌نمایش را بشنوید و فایل نهایی را با بالاترین کیفیت دانلود نمایید.',
    icon: Download,
    accent: 'pink' as const,
  },
];

export const TTSHowItWorks: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="howItWorks" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-pink/30 bg-luma-pink/10 text-zinc-900 dark:text-luma-pink text-xs font-bold">
            <span>فرآیند ۳ مرحله‌ای</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            چگونه متن شما به صدا تبدیل می‌شود؟
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            تنها در چند ثانیه و بدون نیاز به دانش فنی، متون خود را به گویندگی استودیویی تبدیل کنید.
          </p>
        </div>

        {/* 3 Step Grid with TTSHoverCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="h-full"
              >
                <TTSHoverCard accentColor={step.accent} className="h-full">
                  <div className="p-8 h-full flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-4">
                      {/* Top Row: Number & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-zinc-300 dark:text-gray-700">
                          {step.number}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                          <IconComponent size={22} className={`text-luma-${step.accent}`} />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Step Arrow Indicator */}
                    {idx < STEPS.length - 1 && (
                      <div className="hidden md:block pt-2 text-zinc-400 dark:text-gray-600">
                        <ArrowLeft size={16} className="rotate-180 md:rotate-0" />
                      </div>
                    )}

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
