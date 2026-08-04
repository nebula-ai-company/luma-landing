
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Building2, ShieldCheck, Bot, Sparkles } from 'lucide-react';
import Button from '../Button';
import { useTheme } from '../../lib/ThemeContext';
import { PRICING_DATA, PRICING_METADATA, formatPersianNumber } from './PricingData';

const PLANS = [
  {
    id: 'free',
    name: "رایگان",
    price: "۰",
    unit: "رایگان",
    desc: "برای تست و بررسی امکانات",
    icon: Zap,
    theme: "gray",
    features: [
      { name: "۵۰ پیام / ماه", included: true },
      { name: "۳ فایل دانش (۳ مگابایت)", included: true },
      { name: "سینک دستی سایت", included: true },
      { name: "حذف برند لوما", included: false },
      { name: "بلاگ‌ساز خودکار", included: false },
    ],
    cta: "شروع رایگان",
    highlight: false
  },
  {
    id: 'plus',
    name: "پلاس",
    price: "۵,۰۰۰",
    unit: "لوم",
    desc: "مناسب کسب‌وکارهای نوپا",
    icon: ShieldCheck,
    theme: "pink",
    features: [
      { name: "۲,۰۰۰ پیام / ماه", included: true },
      { name: "۱۰ فایل دانش (۱۵ مگابایت)", included: true },
      { name: "سینک خودکار ماهانه", included: true },
      { name: "گزارش‌گیری متوسط", included: true },
      { name: "۱ مقاله بلاگ / ماه", included: true },
    ],
    cta: "خرید پلاس",
    highlight: false
  },
  {
    id: 'pro',
    name: "حرفه‌ای",
    price: "۲۵,۰۰۰",
    unit: "لوم",
    desc: "برای رشد سریع کسب‌وکار",
    icon: Crown,
    theme: "yellow",
    features: [
      { name: "۳۰,۰۰۰ پیام / ماه", included: true },
      { name: "۵۰ فایل دانش (۲۵۰ مگابایت)", included: true },
      { name: "سینک خودکار هفتگی", included: true },
      { name: "حذف برند (White-label)", included: true },
      { name: "۴ مقاله بلاگ / ماه", included: true },
    ],
    cta: "انتخاب حرفه‌ای‌ها",
    highlight: true
  },
  {
    id: 'enterprise',
    name: "سازمانی",
    price: "توافقی",
    unit: "تماس بگیرید",
    desc: "راهکارهای اختصاصی و نامحدود",
    icon: Building2,
    theme: "purple",
    features: [
      { name: "پیام نامحدود", included: true },
      { name: "دانش نامحدود", included: true },
      { name: "سینک آنی (On-demand)", included: true },
      { name: "API اختصاصی", included: true },
      { name: "بلاگ‌ساز نامحدود", included: true },
    ],
    cta: "تماس با ما",
    highlight: false
  },
];

export const AssistantPricingSection: React.FC = () => {
  const { theme } = useTheme();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-48 relative w-full">
       
       {/* Ambient Background Glow - Masked to prevent hard edges */}
       <motion.div 
          animate={{ opacity: [0.03, 0.05, 0.03], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-1/4 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] blur-[120px] rounded-full pointer-events-none bg-luma-yellow/10" 
          style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
       />

       {/* Removed the opaque top gradient mask that caused the hard cut */}
       
       {/* Bottom Fade Mask - Blends into the footer area */}
       <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white dark:via-[#0a0a0a] to-transparent pointer-events-none z-0 transition-colors duration-300" />

       <div className="max-w-screen-2xl mx-auto relative z-10 px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
             <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-luma-yellow shadow-lg shadow-luma-yellow/5 dark:shadow-luma-yellow/10 shrink-0">
                   <Bot size={28} />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                        دستیار هوشمند
                    </h2>
                    <p className="text-zinc-500 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                        تعرفه‌های اشتراکی برای ساخت چت‌بات اختصاصی روی داده‌های شما.
                    </p>
                </div>
             </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
             {PLANS.map((plan, idx) => {
                const isPro = plan.highlight;

                return (
                   <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      onMouseEnter={() => setHoveredPlan(plan.id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                      className={`relative group rounded-[32px] transition-all duration-500 ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}
                   >
                      {/* Pro Glow Effect */}
                      {isPro && (
                         <div className="absolute inset-0 bg-luma-yellow/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      )}

                      <div className={`
                         relative h-full flex flex-col p-6 lg:p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300
                         ${isPro 
                            ? 'bg-amber-50/40 text-zinc-900 dark:bg-[#151515] dark:text-white border-luma-yellow/40 shadow-2xl shadow-luma-yellow/10 dark:shadow-luma-yellow/15' 
                            : 'bg-white dark:bg-[#121212] border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 shadow-sm dark:shadow-none'
                         }
                      `}>
                         
                         {/* Badge for Pro */}
                         {isPro && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-luma-yellow text-black text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-luma-yellow/20 flex items-center gap-1.5 whitespace-nowrap">
                               <Crown size={12} className="fill-black" />
                               <span>پیشنهاد ویژه</span>
                            </div>
                         )}

                         {/* Header */}
                         <div className="mb-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${isPro ? 'bg-luma-yellow text-black' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-white/10'}`}>
                               <plan.icon size={24} />
                            </div>
                            <h3 className={`text-xl font-bold mb-1 ${isPro ? 'text-zinc-900 dark:text-white' : 'text-zinc-800 dark:text-gray-200'}`}>
                               {plan.name}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-gray-500 font-medium">
                               {plan.desc}
                            </p>
                         </div>

                         {/* Price */}
                         <div className={`mb-6 pb-6 border-b ${isPro ? 'border-luma-yellow/25 dark:border-white/5' : 'border-zinc-200 dark:border-white/5'}`}>
                            <div className="flex items-baseline gap-1">
                               <span className={`text-4xl font-black ${isPro ? 'text-amber-600 dark:text-luma-yellow' : 'text-zinc-900 dark:text-white'}`}>
                                  {plan.price}
                               </span>
                               {plan.price !== 'توافقی' && (
                                  <span className="text-xs text-zinc-500 dark:text-gray-400 font-bold uppercase">
                                     / {plan.unit}
                                  </span>
                               )}
                            </div>
                         </div>

                         {/* Features */}
                         <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                               <li key={i} className="flex items-start gap-3 text-xs leading-5">
                                  <div className={`mt-0.5 shrink-0 ${feat.included ? (isPro ? 'text-amber-600 dark:text-luma-yellow' : 'text-zinc-600 dark:text-white') : 'text-zinc-300 dark:text-gray-700'}`}>
                                     {feat.included ? <Check size={14} /> : <X size={14} />}
                                  </div>
                                  <span className={`font-medium ${feat.included ? 'text-zinc-700 dark:text-gray-300' : 'text-zinc-400 dark:text-gray-600 line-through decoration-zinc-200 dark:decoration-gray-700'}`}>
                                     {feat.name}
                                  </span>
                               </li>
                            ))}
                         </ul>

                         {/* CTA Button */}
                         <Button 
                            externalHref="https://dash.lumai.ir/" 
                            variant={isPro ? 'primary' : 'secondary'} 
                            className={`w-full justify-center text-sm py-3 ${isPro ? 'shadow-[0_0_20px_-5px_rgba(255,179,64,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,179,64,0.6)] border-none' : ''}`}
                         >
                            {plan.cta}
                         </Button>

                      </div>
                   </motion.div>
                );
             })}
          </div>

          {/* Model Processing Cost Section */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-20 border-t border-zinc-200 dark:border-white/10 pt-16"
          >
             {/* Section Header */}
             <div className="mb-8 max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-luma-yellow shrink-0">
                      <Zap size={20} />
                   </div>
                   <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      هزینه مصرف مدلهای دستیار هوشمند
                   </h3>
                </div>
                <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light">
                   هزینه بسته دستیار هوشمند و هزینه پردازش مدل دو بخش جدا هستند. مبلغ زیر به ازای پردازش هر پیام با مدل انتخابشده از اعتبار لوم کسر میشود.
                </p>
             </div>

             {/* Compact Responsive Table */}
             <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] shadow-lg dark:shadow-2xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                   <table className="w-full text-right border-collapse">
                      <thead className="bg-zinc-50 dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5 text-xs text-zinc-500 dark:text-gray-500 font-bold uppercase tracking-wider">
                         <tr>
                            <th className="py-5 px-6 w-[45%] md:w-[50%]">مدل</th>
                            <th className="py-5 px-6 w-[25%] text-center hidden sm:table-cell">سازنده</th>
                            <th className="py-5 px-6 w-[55%] sm:w-[25%] text-center">هزینه هر پیام</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                         {PRICING_DATA.smartAssistant.map((m) => (
                            <tr
                               key={m.id}
                               className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors group"
                            >
                               <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                        <Sparkles size={16} />
                                     </div>
                                     <div>
                                        <div className="font-bold text-sm text-zinc-800 dark:text-gray-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{m.name}</div>
                                        <div className="text-[10px] text-gray-500 sm:hidden mt-0.5">{m.provider}</div>
                                     </div>
                                  </div>
                               </td>
                               
                               <td className="py-4 px-6 text-center hidden sm:table-cell">
                                  <span className="text-xs text-zinc-500 dark:text-gray-400 font-medium bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded-md">{m.provider}</span>
                               </td>
                               
                               <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                     <span className="text-base font-bold text-luma-yellow dir-ltr">{m.pricePerMessage.toLocaleString()}</span>
                                     <span className="text-[10px] text-gray-500 font-medium">لوم</span>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="bg-zinc-50 dark:bg-[#0a0a0a] px-6 py-3 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center text-xs text-zinc-400 dark:text-gray-500 font-mono">
                   <span>تعداد مدل‌ها: {formatPersianNumber(PRICING_DATA.smartAssistant.length)}</span>
                   <span>آخرین بروزرسانی: {PRICING_METADATA.displayDateFa}</span>
                </div>
             </div>
          </motion.div>
       </div>
    </div>
  );
};
