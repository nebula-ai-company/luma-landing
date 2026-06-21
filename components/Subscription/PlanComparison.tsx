import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Check, HelpCircle } from 'lucide-react';
import { STUDIO_PLANS } from './SubscriptionData';

const toPersianNum = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const PlanComparison: React.FC = () => {
  // Features to compare
  const comparisonRows = [
    {
      label: 'سهمیه اعتبار لوم',
      key: 'lumIncluded',
      format: (val: any) => `${toPersianNum(val)} لوم / ماه`
    },
    {
      label: 'تخفیف اشتراک ماهانه',
      key: 'extraLumDiscount',
      format: (val: any) => toPersianNum(val)
    },
    {
      label: 'فضای ذخیره‌سازی ابری',
      key: 'storage',
      format: (val: any) => val
    },
    {
      label: 'پردازش همزمان',
      key: 'concurrent',
      format: (val: any) => `${toPersianNum(val)} فرآیند همزمان`
    },
    {
      label: 'دسترسی زودهنگام به مدل‌ها',
      key: 'earlyAccess',
      format: (val: any) => val
    },
    {
      label: 'پریست و برند کیت',
      key: 'presets',
      format: (val: any) => `${toPersianNum(val)} عدد`
    },
    {
      label: 'پشتیبانی کاربران',
      key: 'support',
      format: (val: any) => val
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" dir="rtl">
      <div className="max-w-screen-2xl mx-auto px-4 relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-200/85 dark:border-zinc-805 bg-white/70 dark:bg-zinc-900/10 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="text-luma-purple animate-pulse" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">شفافیت کامل در تعرفه</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
          >
            مقایسهٔ <span className="text-gradient-animated">کامل پلن‌ها</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-650 dark:text-zinc-400 font-light max-w-2xl mx-auto"
          >
            ماتریس کامل مقایسه امکانات استودیو خلاقیت لوما با یک نگاه کلی؛ تصمیم‌گیری بهینه‌ بر اساس سطح خلاقیت شما.
          </motion.p>
        </div>

        {/* Table Container - rounded corners and beautiful borders */}
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-white dark:bg-[#121212] border border-zinc-250/80 dark:border-white/5 rounded-[32px] shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300">
            
            {/* Horizontal Scroll wrapper for responsive mobile safety */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-right border-collapse min-w-[850px]">
                
                {/* Sticky Header Row */}
                <thead className="bg-[#FAF9F6] dark:bg-[#151515] border-b border-zinc-200/60 dark:border-white/5">
                  <tr>
                    {/* Feature label space prefix */}
                    <th className="py-7 px-8 text-sm md:text-base font-black text-zinc-400 dark:text-gray-500 uppercase tracking-wider w-[28%] font-sans">
                      بررسی ویژگی‌ها
                    </th>

                    {/* Columns representing active studio plans */}
                    {STUDIO_PLANS.map((plan) => {
                      const isPro = plan.recommended;

                      return (
                        <th 
                          key={plan.id}
                          className={`py-7 px-6 text-center text-sm md:text-base font-black w-[18%] transition-colors relative ${isPro ? 'bg-purple-50/15 dark:bg-[#181520]' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center gap-1.5 matches-glow">
                            <span className={`${isPro ? 'text-luma-purple' : 'text-zinc-800 dark:text-zinc-150'} flex items-center gap-1 font-extrabold text-sm md:text-base`}>
                              {isPro && <Crown size={14} className="text-luma-purple" />}
                              {plan.name}
                            </span>
                            
                            <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                              {toPersianNum(plan.priceMonthly.toLocaleString())} تومان / ماه
                            </span>
                          </div>
                          
                          {/* Top highlighted glow boundary bar */}
                          {isPro && (
                            <div className="absolute top-0 inset-x-0 h-[3px] bg-luma-purple" />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* Staggered Row details */}
                <tbody className="divide-y divide-zinc-200/50 dark:divide-white/5">
                  {comparisonRows.map((row, idx) => (
                    <motion.tr
                      key={row.key}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-all group"
                    >
                      {/* Name of the feature */}
                      <td className="py-6 px-8 font-bold text-xs md:text-sm text-zinc-800 dark:text-zinc-250 font-sans group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200">
                        {row.label}
                      </td>

                      {/* Values across plans */}
                      {STUDIO_PLANS.map((plan: any) => {
                        const isPro = plan.recommended;
                        const originalValue = plan[row.key];
                        const displayValue = row.format ? row.format(originalValue) : originalValue;

                        return (
                          <td 
                            key={plan.id}
                            className={`py-6 px-6 text-center text-xs md:text-sm text-zinc-700 dark:text-zinc-300 font-medium transition-colors ${isPro ? 'bg-purple-50/10 dark:bg-[#181520]/60 text-luma-purple dark:text-purple-300 font-bold' : ''}`}
                          >
                            <span className="inline-block relative">
                              {displayValue}
                            </span>
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Bottom auxiliary branding window boundary */}
            <div className="bg-[#FAF9F6] dark:bg-[#151515] px-8 py-5 border-t border-zinc-200/60 dark:border-white/5 flex flex-wrap justify-between items-center text-[10px] md:text-xs text-zinc-400 dark:text-gray-500 font-mono transition-colors">
              <span className="font-sans">لوما آي پی (Luma Creative Core) v4.8</span>
              <span className="font-sans">آخرین بروزرسانی: ژوئن ۲۰۲۶</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
