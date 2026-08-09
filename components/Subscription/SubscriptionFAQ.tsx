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
      question: "تفاوت اشتراک ماهانه و اعتبار لوم (LUM) چیست؟",
      answer: "اشتراک ماهانه قابلیت‌های استودیویی لوما (مانند رندر پیشرفته، حفظ سوژه چندمرجع، پردازش همزمان بالا و خروجی ۱۰۸۰p) را برای اکانت شما فعال کرده و شامل سهمیه لوم است. اعتبار لوم (LUM) سوخت مصرفی موتورهای خلاقیت است که بابت هر ثانیه ویدیو یا هر تصویر تولیدی کسر می‌شود."
    },
    {
      question: "آیا حجم سهمیه لوم اشتراک به دوره یا ماه بعد منتقل می‌شود؟",
      answer: "خیر، لوم‌های سهمیه‌ای همراه اشتراک فقط برای همان دوره معتبر هستند و با شروع دوره بعدی ریست می‌شوند؛ اما هرگونه اعتبار لوم مجزا که خریداری کرده‌اید دائمی بوده و هرگز منقضی نمی‌شود. همچنین در طول فعال بودن اشتراک، برای دریافت سهمیه جدید نیز می‌توانید در هر لحظه پلن خود را تمدید یا ارتقا دهید."
    },
    {
      question: "ماتریکس ارتقای پلن چگونه کار می‌کند؟ چطور ارتقا دهم؟",
      answer: "شما می‌توانید در هر لحظه از داخل داشبورد هوشمند لوما (dash.lumai.ir) پلن خود را افزایش دهید. هزینه پرداخت‌شده قبلی بر حسب روزهای باقی‌مانده کسر شده و مابه‌التفاوت آن تا پلن جدید به‌طور هوشمند محاسبه و منظور خواهد شد."
    },
    {
      question: "پلن سازمانی و ابزارهای سفارشی به چه صورت ارائه می‌شود؟",
      answer: "پلن‌های سازمانی فاقد محدودیت پردازشی هستند و به‌همراه دسترسی کامل به APIهای رندرینگ، پشتیبانی SLA اختصاصی، رندر بر روی خوشه‌های سخت‌افزاری اختصاصی و یکپارچه‌سازی با کانال‌های ارتباطی بزرگ عرضه می‌شوند. برای مشاوره خلاق با تیم فنی ما تماس بگیرید."
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
