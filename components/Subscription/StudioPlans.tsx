import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Crown, Sparkles, Layers, ShieldAlert, Cpu } from 'lucide-react';
import { STUDIO_PLANS, StudioPlan } from './SubscriptionData';
import Button from '../Button';

const toPersianNum = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const StudioPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Custom hover radial lighting centers for each card
  const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300" dir="rtl">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0], scale: [1, 1.05, 0.95, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-indigo-200/20 dark:bg-indigo-950/10 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/85 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm"
          >
            <Cpu size={14} className="text-luma-purple" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">استودیو خلاقیت لوما (Luma Studio)</span>
            <span className="bg-luma-purple/25 text-luma-purple dark:bg-purple-950/40 text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">به‌زودی</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
          >
            اشتراک استودیو <span className="text-gradient-animated bg-gradient-to-r from-[#DA8FFF] via-[#FF6482] to-[#FFB340] text-transparent bg-clip-text">خلاقیت</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-650 dark:text-zinc-400 font-light mb-8 max-w-2xl mx-auto"
          >
            پلن‌های استودیو شامل اعتبار لوم هدیه، حق اولویت پردازش، افزایش حافظه ابری و خروجی‌های ویژه هوش مصنوعی است.
          </motion.p>

          {/* Billing Switcher (layoutId Pill Switcher) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-full"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className="relative px-5 py-2 text-xs font-bold rounded-full transition-colors duration-200 focus:outline-none"
            >
              {!isAnnual && (
                <motion.span
                  layoutId="studio-billing-bg"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-15 ${!isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'}`}>
                پرداخت ماهانه
              </span>
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className="relative px-5 py-2 text-xs font-bold rounded-full transition-colors duration-200 focus:outline-none flex items-center gap-2"
            >
              {isAnnual && (
                <motion.span
                  layoutId="studio-billing-bg"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-15 ${isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300'} flex items-center gap-1.5`}>
                پرداخت سالانه
                <span className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-950/30 text-[9px] px-2 py-0.5 rounded-full font-black">۲ ماه هدیه</span>
              </span>
            </button>
          </motion.div>

        </div>

        {/* 4-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {STUDIO_PLANS.map((plan, idx) => {
            const isPro = plan.recommended;
            const cardId = plan.id;
            const mousePos = mousePositions[cardId] || { x: 0, y: 0 };

            // Yearly pricing math: 16% discount / Paying for 10 months instead of 12 (2 months free)
            // Let's compute computed monthly cost for the user during annual billing
            const actualMonthlyPrice = isAnnual 
              ? Math.round(plan.priceMonthly * 10 / 12) 
              : plan.priceMonthly;

            const totalAnnualPrice = plan.priceMonthly * 10;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(cardId, e)}
                className={`relative group rounded-[32px] transition-all duration-300 h-full flex flex-col ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Pro Neon Glow and Radial light */}
                {isPro && (
                  <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-950/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                )}

                <div className={`
                  relative h-full flex-1 flex flex-col p-6 lg:p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300 overflow-hidden
                  ${isPro 
                    ? 'bg-purple-50/20 text-zinc-900 dark:bg-[#15121c]/90 dark:text-white border-luma-purple/30 shadow-xl shadow-luma-purple/5' 
                    : 'bg-white dark:bg-[#121212]/90 border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 shadow-sm dark:shadow-none'
                  }
                `}>
                  
                  {/* Hover spot gradient (DESIGN.md) */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isPro ? 'rgba(218, 143, 255, 0.12)' : 'rgba(218, 143, 255, 0.06)'}, transparent 45%)` }} 
                  />

                  {/* Top recommended / details header */}
                  <div className="relative z-10 flex justify-between items-center mb-6">
                    <span className={`text-base font-black ${isPro ? 'text-luma-purple' : 'text-zinc-800 dark:text-zinc-250'}`}>
                      {plan.name}
                    </span>
                    
                    {isPro && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luma-purple/15 text-luma-purple text-[10px] font-black border border-luma-purple/30">
                        <Crown size={10} /> پیشنهاد ویژه
                      </span>
                    )}
                  </div>

                  {/* Pricing Info */}
                  <div className="relative z-10 mb-6 flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {toPersianNum(actualMonthlyPrice.toLocaleString())}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">تومان / ماه</span>
                    </div>

                    {/* Show Annual Saving notification */}
                    <AnimatePresence mode="wait">
                      {isAnnual ? (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-1"
                        >
                          پرداخت سالانه: {toPersianNum(totalAnnualPrice.toLocaleString())} تومان
                        </motion.div>
                      ) : (
                        <div className="h-4 mt-2" /> // layout spacer
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-6 relative z-10" />

                  {/* Feature Lists */}
                  <ul className="space-y-4 mb-8 flex-1 relative z-10">
                    
                    {/* LUM Included */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">اعتبار لوم هدیه</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {toPersianNum(plan.lumIncluded)} LUM / ماه
                      </span>
                    </li>

                    {/* Extra LUM discount */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">تخفیف شارژ لوم اضافی</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {toPersianNum(plan.extraLumDiscount)} تخفیف
                      </span>
                    </li>

                    {/* storage */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">فضای ذخیره‌سازی ابری</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {plan.storage}
                      </span>
                    </li>

                    {/* concurrent generation */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">پردازش همزمان</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {toPersianNum(plan.concurrent)} فرآیند همزمان
                      </span>
                    </li>

                    {/* earlyAccess */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">دسترسی زودهنگام مدل‌ها</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {plan.earlyAccess}
                      </span>
                    </li>

                    {/* presets */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400 font-light">پریست‌های ذخیره‌شده</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {toPersianNum(plan.presets)} عدد
                      </span>
                    </li>

                    {/* support */}
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400 font-light">پشتیبانی کاربران</span>
                      <span className={`font-bold ${isPro ? 'text-luma-purple' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        {plan.support}
                      </span>
                    </li>

                  </ul>

                  {/* Primary CTA Button */}
                  <div className="relative z-10 w-full mt-auto">
                    <Button 
                      variant={isPro ? "primary" : "secondary"} 
                      externalHref="https://dash.lumai.ir/"
                      className="w-full text-center py-3 justify-center text-xs"
                    >
                      {isPro ? 'انتخاب پلن حرفه‌ای استودیو' : 'خرید اشتراک استودیو'}
                    </Button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
