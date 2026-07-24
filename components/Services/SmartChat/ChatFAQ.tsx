import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare, Zap, ExternalLink } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "چه مدل‌های هوش مصنوعی در بخش چت هوشمند لوما در دسترس هستند؟",
    a: "در چت هوشمند لوما به جدیدترین مدل‌های روز دنیا از جمله GPT-5، GPT-4o، Claude 3.7 Sonnet، Gemini 2.0/3 Pro و DeepSeek R1 دسترسی یکپارچه دارید."
  },
  {
    q: "آیا می‌توان در میان یک گفتگو مدل هوش مصنوعی را تغییر داد؟",
    a: "بله، یکی از بزرگترین مزیتهای لوما امکان سوییچ آنی مدل در طول یک گفتگو است. می‌توانید تحلیل اولیه را با GPT-5 انجام داده و برای نگارش کد به Claude 3.7 تغییر حالت دهید."
  },
  {
    q: "ویژگی اجرای زنده کد و ساخت ویجت (Live Artifacts) چگونه کار می‌کند؟",
    a: "کدهایی که توسط هوش مصنوعی تولید می‌شوند (نظیر صفحات وب HTML/CSS/JS، برنامه‌های React، نمودارها و فرم‌ها) به صورت پیش‌نمایش زنده در همان پنجره چت قابل مشاهده و تعامل هستند."
  },
  {
    q: "آیا امکان ساخت و دانلود فایل از پاسخ‌های چت وجود دارد؟",
    a: "بله، سیستم هوشمند لوما قادر است خروجی متن‌ها، داده‌ها و گزارش‌های شما را مستقیماً به فایل‌های PDF، خروجی‌های برنامه‌نویسی و اسناد متنی تبدیل کرده و لینک دانلود آن را ارائه دهد."
  },
  {
    q: "میزان مصرف اعتبار برای هر پیام چگونه محاسبه می‌شود؟",
    a: "هزینه هر پیام بسته به مدل انتخابی متفاوت است. مدل‌های سریع و سبک نظیر GPT-4o mini و Claude Haiku اعتبارات بسیار ناچیزی مصرف می‌کنند در حالی که مدل‌های سنگین تحلیلی میزان متناسبی اعتبار کسر می‌نمایند."
  }
];

export const ChatFAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 font-sans" dir="rtl">
      
      {/* Seamless Transition Fades */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to bottom, #FAFAFA 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to top, #FAFAFA 0%, transparent 100%)'
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md mb-6 shadow-sm"
          >
            <HelpCircle size={14} className="text-luma-purple" />
            <span className="text-zinc-600 dark:text-gray-300 text-xs font-bold tracking-wider">
              راهنما و سوالات متداول
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
          >
            سوالات <span className="text-gradient-animated">متداول</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            پاسخ به سوالات رایج درباره چت هوشمند، مدل‌ها و قابلیت‌های پیشرفته لوما.
          </motion.p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-sm hover:border-black/10 hover:dark:border-white/10 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-zinc-800 dark:text-gray-200 hover:text-zinc-950 hover:dark:text-white transition-colors"
                >
                  <span className="text-base md:text-lg leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-luma-purple/10 text-luma-purple' : 'text-zinc-400 dark:text-gray-500'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed border-t border-black/5 dark:border-white/5 font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dashboard Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-luma-purple/10 via-luma-pink/5 to-transparent border border-luma-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luma-purple/20 flex items-center justify-center text-luma-purple shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">آماده تجربه چت با برترین مدل‌های هوش مصنوعی هستید؟</h4>
              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">وارد استودیو شوید و گفتگو با مدل انتخابی خود را آغاز کنید.</p>
            </div>
          </div>
          <a
            href="https://dash.lumai.ir/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-transform shrink-0"
          >
            <span>ورود به استودیو</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
