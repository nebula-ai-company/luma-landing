import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, CreditCard, Sparkles } from 'lucide-react';

export const SubscriptionHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 bg-transparent overflow-hidden" dir="rtl">
      
      <div className="max-w-screen-2xl mx-auto px-4 relative z-20 text-center">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="text-luma-purple animate-pulse" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">تعرفه‌ها و اشتراک لوما</span>
          </motion.div>
        </div>

        {/* Large premium Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tight leading-none mb-6 max-w-4xl mx-auto"
        >
          پلن‌های <span className="text-gradient-animated">اشتراک</span> و شارژ اعتبار
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-zinc-650 dark:text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          امکانات نامحدود، پردازش اولویت‌دار و ابزارهای خلاقیت هوش مصنوعی را با پلن‌های متناسب با نیاز خود دریافت کنید.
        </motion.p>
      </div>
    </section>
  );
};
