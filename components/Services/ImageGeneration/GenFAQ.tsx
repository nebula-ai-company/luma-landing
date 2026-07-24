import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: "آیا پرامپت‌نویسی به زبان فارسی امکان‌پذیر است؟",
    answer: "بله! هوش مصنوعی لوما مجهز به سیستم درک عمیق زبان و مفاهیم بومی فارسی است. شما می‌توانید توصیفات خود را به زبان فارسی روان بنویسید. سیستم به طور هوشمند مفاهیم را پردازش کرده و بهترین تصویر ممکن را خلق می‌کند."
  },
  {
    question: "کدام مدل برای پروژه من مناسب‌تر است؟",
    answer: (
      <div className="space-y-2">
        <p>هر مدل هوش مصنوعی در لوما تخصص ویژه‌ای دارد:</p>
        <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-zinc-650 dark:text-gray-300">
          <li><strong className="text-luma-purple">FLUX 2 MAX:</strong> بهترین گزینه برای تصاویر فوتورئالیستیک، پرتره، مناظر طبیعی و جزئیات سینمایی.</li>
          <li><strong className="text-luma-pink">IDEOGRAM V3:</strong> متخصص درج متن دقیق (انگلیسی و فارسی)، طراحی پوستر، تایپوگرافی و لوگو.</li>
          <li><strong className="text-luma-yellow">RECRAFT V3:</strong> ایده‌آل برای ساخت وکتور، آیکون، گرافیک دوبعدی، استایلیزه و طراحی برند.</li>
        </ul>
      </div>
    )
  },
  {
    question: "کیفیت، نسبت ابعاد و فرمت تصاویر خروجی چیست؟",
    answer: "تصاویر تولیدی با نسبت‌های تصویر مختلف (۱:۱ مربع، ۱۶:۹ عریض، ۹:۱۶ استوری، ۴:۳ و...) قابل تنظیم هستند. کیفیت خروجی تا رزولوشن 8K پشتیبانی شده و فایل‌ها در فرمت‌های PNG و JPG با بالاترین تراکم پیکسلی دانلود می‌شوند."
  },
  {
    question: "محاسبه هزینه و سیستم اعتباری (لوم) چگونه کار می‌کند؟",
    answer: (
      <p>
        هزینه ساخت هر تصویر بسته به مدل انتخابی متفاوت است (مثلاً ۴۵ لوم برای مدل‌های سریع تا ۱۵۰ لوم برای مدل‌های حرفه‌ای 8K). اعتبارات به صورت لوم در حساب شما ذخیره می‌شوند و هیچ تاریخ انقضایی ندارند. برای مشاهده بسته‌های اعتباری و تعرفه‌ها می‌توانید به <Link to="/pricing" className="text-luma-pink font-bold border-b border-luma-pink/40 hover:border-luma-pink inline-flex items-center gap-1 mx-1">صفحه قیمت‌گذاری <ExternalLink size={12} /></Link> مراجعه کنید.
      </p>
    )
  },
  {
    question: "آیا تصاویر تولید شده دارای لایسنس تجاری هستند؟",
    answer: "بله، تمام خروجی‌های ساخته شده با حساب شما در لوما، تحت مالکیتی کاملاً اختصاصی قرار دارند و دارای لایسنس تجاری معتبر جهت استفاده در پروژه‌های صنعتی، وب‌سایت، تبلیغات، چاپ و بسته‌بندی می‌باشند."
  }
];

export const GenFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 font-sans" dir="rtl">
      {/* Seamless Transition Fades */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-luma-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-luma-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm"
          >
            <HelpCircle size={14} className="text-luma-purple" />
            <span className="text-zinc-650 dark:text-gray-300 font-bold text-xs tracking-wide uppercase">سوالات متداول</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
          >
            راهنما و <span className="text-gradient-animated">مشخصات کاربردی</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto font-light"
          >
            پاسخ به کلیدی‌ترین پرسش‌ها درباره تولید تصویر با هوش مصنوعی لوما
          </motion.p>
        </div>

        {/* FAQ Accordions List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white dark:bg-[#121212] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 md:p-6 text-right flex items-center justify-between gap-4 font-bold text-base md:text-lg text-zinc-900 dark:text-white focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-luma-pink shrink-0" />
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-luma-pink/10 text-luma-pink' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 text-sm md:text-base text-zinc-650 dark:text-gray-400 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04] mt-2 pt-4 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
