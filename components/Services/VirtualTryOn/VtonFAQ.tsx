import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Zap, ExternalLink } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "قابلیت پرو مجازی لباس (Virtual Try-On) چگونه کار می‌کند؟",
    a: "شما می‌توانید تصویر لباس مورد نظر خود (روی چوب‌لباسی یا سطح صاف) را بارگذاری کرده و هوش مصنوعی لوما به شکل هوشمندانه، لباس را روی مدل مجازی با حفظ دقیق بافت، سایه و چین‌وشکن‌های پارچه تن‌پوش می‌کند."
  },
  {
    q: "آیا امکان تنظیم مشخصات مانکن نظیر سایز، سن و حجاب وجود دارد؟",
    a: "بله، در موتور پیشرفته Nano Banana Pro می‌توانید جثه مانکن (از لاغر تا پلاس‌سایز)، سن، ژست، حالت چهره و همچنین نوع پوشش و حجاب (شال، مقنعه، توربان یا بدون حجاب) را کاملاً مطابق بازار هدف خود تنظیم کنید."
  },
  {
    q: "کیفیت و رزولوشن تصاویر خروجی چقدر است؟",
    a: "تصاویر تولیدشده با رزولوشن بالای Ultra HD (4K) آماده می‌شوند که برای استفاده در کاتالوگ‌های چاپی، بنرهای فروشگاهی و شبکه‌های اجتماعی کاملاً استاندارد و حرفه‌ای است."
  },
  {
    q: "برای بهترین نتیجه، تصویر اولیه لباس باید چگونه باشد؟",
    a: "توصیه می‌شود عکس لباس روی پس‌زمینه ساده یا چوب‌لباسی با نور شفاف گرفته شود. هرچه جزئیات پارچه و فرم لباس مشخص‌تر باشد، تن‌پوش مجازی دقیق‌تر خواهد بود."
  },
  {
    q: "تعرفه و اعتبارات لازم برای پرو مجازی به چه صورت محاسبه می‌شود؟",
    a: "هزینه پرو مجازی بر اساس مدل انتخابی شما محاسبه می‌شود. مدل استاندارد Luma VTON اعتبارات ناچیزی مصرف می‌کند و مدل‌های پیشرفته Pro متناسب با کیفیت رندر شارژ می‌گردند."
  }
];

export const VtonFAQ: React.FC = () => {
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
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-luma-yellow/5 blur-[120px] rounded-full pointer-events-none" />
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
            <HelpCircle size={14} className="text-luma-yellow" />
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
            پاسخ به سوالات رایج درباره پرو مجازی لباس، انتخاب مانکن و تنظیمات کیفیت.
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
                  <div className={`w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-luma-yellow/10 text-luma-yellow' : 'text-zinc-400 dark:text-gray-500'}`}>
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
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-luma-yellow/10 via-luma-pink/5 to-transparent border border-luma-yellow/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luma-yellow/20 flex items-center justify-center text-luma-yellow shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm">آماده پرو مجازی لباس‌های فروشگاه خود هستید؟</h4>
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
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
