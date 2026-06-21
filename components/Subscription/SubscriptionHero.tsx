import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, CreditCard, Sparkles } from 'lucide-react';

export const SubscriptionHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 bg-[#FBF9F6] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300" dir="rtl">
      {/* Top soft fade to connect with Navbar */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Atmospheric Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-[600px] h-[600px] bg-purple-200/20 dark:bg-purple-950/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 20, -20, 0],
            scale: [1, 0.95, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-5 left-10 w-[500px] h-[500px] bg-rose-200/15 dark:bg-rose-950/10 rounded-full blur-[120px]"
        />
      </div>

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
          پلن‌های <span className="text-gradient-animated bg-gradient-to-r from-[#DA8FFF] via-[#FF6482] to-[#FFB340] text-transparent bg-clip-text">اشتراک</span> و شارژ اعتبار
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
