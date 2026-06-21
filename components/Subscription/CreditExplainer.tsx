import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Receipt, Gift, Users, CreditCard } from 'lucide-react';
import { CREDIT_FACTS } from './SubscriptionData';

export const CreditExplainer: React.FC = () => {
  const items = [
    {
      icon: Coins,
      title: "نرخ پایه لوم (LUM)",
      text: CREDIT_FACTS.lumRate,
      color: "text-amber-500",
      bg: "bg-amber-500/10 dark:bg-amber-500/5",
    },
    {
      icon: Receipt,
      title: "مالیات ارزش افزوده",
      text: CREDIT_FACTS.vat,
      color: "text-blue-500",
      bg: "bg-blue-500/10 dark:bg-blue-500/5",
    },
    {
      icon: Gift,
      title: "هدیه خوش‌آمدگویی",
      text: CREDIT_FACTS.signupGift,
      color: "text-rose-500",
      bg: "bg-rose-500/10 dark:bg-rose-500/5",
    },
    {
      icon: Users,
      title: "معرفی دوستان (Referral)",
      text: CREDIT_FACTS.referral,
      color: "text-purple-500",
      bg: "bg-purple-500/10 dark:bg-purple-500/5",
    },
    {
      icon: CreditCard,
      title: "درگاه پرداخت رسمی",
      text: `پرداخت مطمئن و سریع از طریق درگاه ${CREDIT_FACTS.gateway}`,
      color: "text-teal-500",
      bg: "bg-teal-500/10 dark:bg-teal-500/5",
    }
  ];

  return (
    <section className="py-20 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300" dir="rtl">
      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        
        {/* Bordered top header divider or band */}
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mb-4">
            دانستی‌های مهم شارژ و مصرف اعتبار در لوما
          </h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-light">
            چنانچه فاقد اشتراک فعال هستید یا مایل به شارژ مازاد هستید، محاسبات مالی بر اساس مفاد شفاف زیر انجام می‌پذیرد.
          </p>
        </div>

        {/* 5-Column Responsive Flex/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative group p-6 rounded-[24px] bg-white dark:bg-[#121212] border border-zinc-200/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                {/* Double-Bezel Highlight */}
                <div className="absolute inset-0 rounded-[24px] ring-1 ring-black/[0.04] dark:ring-white/[0.04] pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <IconComponent size={20} />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mb-2">
                    {item.title}
                  </h4>
                </div>

                {/* Text Description */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mt-1">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
