import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const SubscriptionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      question: "نحوه پرداخت و محاسبه هزینه در استودیو لوما به چه صورت است؟",
      answer: "در حال حاضر دسترسی به ابزارهای استودیو خلاقیت لوما بر پایه خرید و مصرف اعتبار لوم (LUM) انجام می‌شود. کاربران متناسب با نیاز خود بسته‌های اعتباری را شارژ کرده و بابت هر عملیات، هزینه دقیق اعلام‌شده در داشبورد از موجودی لوم کسر می‌گردد. پلن‌های اشتراک ماهانه ساختار پیشنهادی و مصوب آتی استودیو هستند."
    },
    {
      question: "آیا بسته‌ها و اعتبارهای لوم دارای تاریخ انقضا هستند؟",
      answer: "اعتبار لوم خریداری‌شده در حساب کاربری شما محفوظ می‌ماند؛ با این حال برخی بسته‌های هدیه، کد‌های تخفیف یا طرح‌های پروموشنال ویژه ممکن است دارای مهلت زمانی و قوانین انقضا باشند که جزئیات دقیق آن همواره در داشبورد به شما نمایش داده می‌شود."
    },
    {
      question: "آیا در حال حاضر امکان خرید مستقیم پلن‌های اشتراک ماهانه وجود دارد؟",
      answer: "پلن‌های نمایش‌داده‌شده در این صفحه ساختار و ظرفیت‌های برنامه‌ریزی‌شده اشتراک استودیو خلاقیت لوما هستند. در شرایط فعلی، دسترسی به تمامی ابزارها و قابلیت‌های پردازش از طریق خرید مستقیم بسته‌های اعتبار لوم در داشبورد فراهم است."
    },
    {
      question: "خدمات و پشتیبانی سازمانی به چه صورت ارائه می‌شود؟",
      answer: "برای شرکت‌ها و سازمان‌هایی با نیازهای گسترده پردازشی و شخصی‌سازی ابزارهای هوش مصنوعی، شرایط سازمانی متناسب با نیاز فنی، حجم عملیات و قرارداد مکتوب تعیین می‌گردد. برای هماهنگی با تیم پشتیبانی و فروش سازمانی تماس بگیرید."
    }
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/85 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm">
            <HelpCircle size={14} className="text-luma-purple animate-pulse" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">سوالات متداول کاربران</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4">
            پاسخ به سوالات متداول تعرفه
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light">
            اطلاعات شفاف در خصوص نحوه فعال‌سازی، ارتقا، لغو، و شارژ اشتراک‌های لوما.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className="rounded-[24px] border border-zinc-200/60 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-6 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple/30 rounded-[24px]"
                >
                  <span className="text-sm font-extrabold text-zinc-800 dark:text-zinc-100 pl-4">
                    {item.question}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border text-zinc-400 dark:text-zinc-500 shrink-0 ${isOpen ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100' : 'border-zinc-200/80 dark:border-white/5'}`}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed border-t border-zinc-100 dark:border-white/5">
                        <p className="leading-7">{item.answer}</p>
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
