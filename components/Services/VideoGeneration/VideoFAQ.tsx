import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Video, Zap, ExternalLink } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "جریان‌های کاری تولید ویدیو در لوما شامل چه مواردی است؟",
    a: "لوما از ۳ جریان کاری جامع پشتیبانی می‌کند: ۱) تبدیل متن به ویدیو (Text-to-Video) برای خلق نماها از دستورات متنی، ۲) تبدیل تصویر به ویدیو (Image-to-Video) برای متحرک‌سازی تصاویر ثابت با قابلیت‌هایی مانند افزودن صدا، و ۳) ساخت ویدیو از روی مراجع چندگانه (Reference-to-Video) برای حفظ هویت کاراکتر، نما و حس بصری بر اساس فایل‌های ورودی تصویر، ویدیو و صدا."
  },
  {
    q: "مدل‌های جدید مانند FLUX 3 و MiniMax H3 چه امکاناتی ارائه می‌دهند؟",
    a: "مدل FLUX 3 هم در جریان متنی و هم تصویری با شروع تعرفه از ۱۲۷۵ لوم خروجی باکیفیتی ارائه می‌دهد. مدل MiniMax H3 نیز با شروع تعرفه از ۱۲۰۰ لوم به‌طور ویژه برای تبدیل تصویر به ویدیو (I2V) با پشتیبانی صوتی و ثبات حرکتی طراحی شده است."
  },
  {
    q: "چگونه می‌توانم از روی تصویر یا ویدیوهای مرجع، ویدیوی جدید بسازم؟",
    a: "از طریق ابزار ویدئوساز هوشمند (Reference-to-Video) می‌توانید تا ۹ تصویر مرجع، تا ۳ فایل ویدیویی و تا ۳ فایل صوتی را به عنوان ورودی مشخص کنید تا موتورهای اختصاصی مانند Seedance 2.0 Reference خروجی هماهنگ با مراجع را تولید کنند."
  },
  {
    q: "تفاوت مدل‌های سریع (Turbo / Fast) و مدل‌های پیشرفته (Pro) چیست؟",
    a: "مدل‌های Fast و Turbo (مانند Wan 2.2 Turbo، Kling 2.5 Turbo و LTX Fast) برای تولید سریع و پیش‌نمایش آنی با کمترین هزینه مصرف اعتبار طراحی شده‌اند؛ در حالی که مدل‌های Pro (نظیر Sora 2 Pro و Kling 2.6 Pro) تمرکز بالاتری بر جزئیات بصری، کنترل صحنه و ثبات فرم دارند."
  },
  {
    q: "محاسبه تعرفه و اعتبارات مصرفی هر ویدیو به چه صورت است؟",
    a: "تعرفه بر اساس مدل انتخابی، کیفیت، مدت زمان و فعال بودن قابلیت‌های جانبی (نظیر تولید صدا) محاسبه می‌شود. حداقل شروع تعرفه در کارت هر مدل و در استودیو به‌صورت شفاف درج گردیده است."
  }
];

export const VideoFAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 font-sans" dir="rtl">
      
      {/* Seamless Transition Fades */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to bottom, #FBF9F6 0%, transparent 100%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)'
            : 'linear-gradient(to top, #FBF9F6 0%, transparent 100%)'
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 backdrop-blur-md mb-6 shadow-sm"
          >
            <HelpCircle size={14} className="text-luma-purple" />
            <span className="text-zinc-800 dark:text-zinc-200 text-xs font-bold tracking-wider">
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
            پاسخ به سوالات کلیدی درباره سه جریان کاری ویدیو، انتخاب مدل‌ها و تنظیمات رندر.
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
                  <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-luma-purple/15 text-luma-purple' : 'text-zinc-400 dark:text-gray-500'}`}>
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
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-luma-purple/15 via-luma-pink/10 to-transparent border border-luma-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luma-purple/20 flex items-center justify-center text-luma-purple shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">آماده خلق ویدیوهای نوآورانه هستید؟</h4>
              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">وارد استودیو لوما شوید و ایده خود را به فیلم تبدیل کنید.</p>
            </div>
          </div>
          <a
            href="https://dash.lumai.ir/service/text-to-video"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-transform shrink-0"
          >
            <span>ورود به استودیو ویدیو</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
