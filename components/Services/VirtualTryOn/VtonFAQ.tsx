import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, ChevronDown, Zap, ExternalLink } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';
import type { MediaCatalogModel, MediaServicePriceInfo } from '../../../lib/catalogApi.ts';
import { formatPersianDigits, formatCurrencyLabel } from '../../../lib/catalogApi.ts';

interface FAQItem {
  q: string;
  a: string;
}

export interface VtonFAQProps {
  models?: MediaCatalogModel[];
  priceInfo?: MediaServicePriceInfo | null;
  startingPrice?: number | null;
}

export const VtonFAQ: React.FC<VtonFAQProps> = ({
  priceInfo,
  startingPrice,
}) => {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  let pricingNote = '';
  if (priceInfo && !priceInfo.hasMixedCurrencies) {
    pricingNote = ` (شروع تعرفه از ${formatPersianDigits(priceInfo.minimum)} ${formatCurrencyLabel(priceInfo.currency)})`;
  } else if (startingPrice !== undefined && startingPrice !== null) {
    pricingNote = ` (شروع تعرفه از ${formatPersianDigits(startingPrice)} لوم)`;
  }

  const FAQS: FAQItem[] = [
    {
      q: 'قابلیت پرو مجازی لباس (Virtual Try-On) چگونه کار می‌کند؟',
      a: 'شما می‌توانید تصویر لباس مورد نظر خود (روی چوب‌لباسی یا سطح صاف) را بارگذاری کرده و هوش مصنوعی لوما به شکل هوشمندانه، لباس را روی مدل مجازی تن‌پوش می‌کند. مدل‌های پیشرفته با حفظ ویژگی‌های بصری لباس نظیر بافت و چین‌وشکن‌های پارچه، خروجی طبیعی ارائه می‌دهند.',
    },
    {
      q: 'آیا امکان تنظیم مشخصات مانکن نظیر سایز، سن و نوع پوشش وجود دارد؟',
      a: 'امکانات شخصی‌سازی بسته به مدل انتخابی متفاوت است و قابلیت‌های فعال هر مدل در بخش مدل‌ها و داخل ابزار نمایش داده می‌شود. در ابزار استودیو می‌توانید مانکن، ژست و سبک‌های مختلف پوشش را متناسب با بازار هدف خود انتخاب نمایید.',
    },
    {
      q: 'کیفیت و رزولوشن تصاویر خروجی چقدر است؟',
      a: 'رزولوشن خروجی به مدل و تنظیمات انتخابی بستگی دارد. مدل‌های باکیفیت استودیویی از رزولوشن‌های استاندارد و بالا برای شبکه‌های اجتماعی، وب‌سایت و کاتالوگ‌های تبلیغاتی پشتیبانی می‌کنند.',
    },
    {
      q: 'برای بهترین نتیجه، تصویر اولیه لباس باید چگونه باشد؟',
      a: 'توصیه می‌شود عکس لباس روی پس‌زمینه ساده یا چوب‌لباسی با نور کافی و زاویه مستقیم گرفته شود. هرچه تصویر ورودی واضح‌تر باشد، هوش مصنوعی در درک فرم و بافت پارچه عملکرد دقیق‌تری خواهد داشت.',
    },
    {
      q: 'تعرفه و اعتبارات لازم برای پرو مجازی به چه صورت محاسبه می‌شود؟',
      a: `هزینه پرو مجازی بر اساس مدل انتخابی و تنظیمات آن محاسبه می‌شود${pricingNote}. قیمت شروع و توضیح نحوه محاسبه هر مدل به‌صورت زنده در بخش مدل‌ها نمایش داده می‌شود و هزینه نهایی پیش از پردازش در ابزار مشخص می‌گردد.`,
    },
    {
      q: 'آیا جزئیات دقیق بافت و رنگ لباس در پرو حفظ می‌شود؟',
      a: 'مدل‌های هوش مصنوعی تلاش می‌کنند ویژگی‌های بصری لباس را روی سوژه جدید بازسازی کنند؛ کیفیت نتیجه به مدل انتخابی، کیفیت تصویر ورودی و تنظیمات نور بستگی دارد.',
    },
  ];

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
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-luma-yellow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md mb-6 shadow-sm"
          >
            <HelpCircle size={14} className="text-luma-yellow" aria-hidden="true" />
            <span className="text-zinc-650 dark:text-gray-300 text-xs font-bold tracking-wider">
              راهنما و سوالات متداول
            </span>
          </motion.div>

          <motion.h2 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
          >
            سوالات <span className="text-gradient-animated">متداول</span>
          </motion.h2>

          <motion.p 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-650 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed"
          >
            پاسخ به سوالات رایج درباره پرو مجازی لباس، انتخاب مانکن و نحوه محاسبه تعرفه.
          </motion.p>
        </header>

        {/* FAQ Accordions */}
        <dl className="space-y-4 m-0 p-0">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const answerId = `vton-faq-answer-${idx}`;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-sm hover:border-black/10 hover:dark:border-white/10 transition-colors"
              >
                <dt className="m-0 p-0">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-zinc-800 dark:text-gray-200 hover:text-zinc-950 hover:dark:text-white transition-colors cursor-pointer bg-transparent border-0 font-inherit"
                  >
                    <span className="text-base md:text-lg leading-snug">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-luma-yellow/10 text-luma-yellow' : 'text-zinc-400 dark:text-gray-500'}`}>
                      <ChevronDown size={18} aria-hidden="true" />
                    </div>
                  </button>
                </dt>

                <dd className="m-0 p-0" id={answerId}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-zinc-650 dark:text-gray-400 text-sm md:text-base leading-relaxed border-t border-black/5 dark:border-white/5 font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </dd>
              </motion.div>
            );
          })}
        </dl>

        {/* Dashboard Callout */}
        <motion.aside 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          aria-label="ورود به استودیو پرو مجازی"
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-luma-yellow/10 via-luma-pink/5 to-transparent border border-luma-yellow/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luma-yellow/20 flex items-center justify-center text-luma-yellow shrink-0">
              <Zap size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white text-sm">آماده پرو مجازی لباس‌های فروشگاه خود هستید؟</p>
              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">وارد استودیو شوید و کاتالوگ هوشمند محصولات خود را بسازید.</p>
            </div>
          </div>
          <a
            href="https://dash.lumai.ir/service/virtual-try-on"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-transform shrink-0"
          >
            <span>ورود به استودیو</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.aside>

      </div>
    </section>
  );
};
