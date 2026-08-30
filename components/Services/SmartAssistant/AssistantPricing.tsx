import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Building2, Sparkles, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../../lib/ThemeContext';
import Button from '../../Button';

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
      { name: "دسترسی به ۳ مدل هوش مصنوعی", included: true },
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
      { name: "دسترسی به ۵ مدل هوش مصنوعی", included: true },
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
      { name: "۱۰,۰۰۰ پیام / ماه", included: true },
      { name: "۵۰ فایل دانش (۲۵۰ مگابایت)", included: true },
      { name: "دسترسی به ۹ مدل هوش مصنوعی", included: true },
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
      { name: "فایل و دانش نامحدود", included: true },
      { name: "دسترسی به تمام مدل‌ها", included: true },
      { name: "سینک آنی (On-demand)", included: true },
      { name: "API اختصاصی", included: true },
      { name: "بلاگ‌ساز نامحدود", included: true },
    ],
    cta: "تماس با ما",
    highlight: false
  },
];

const ThemeColors: Record<string, { main: string, bg: string, border: string, glow: string }> = {
  gray: { main: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10', glow: 'from-gray-500/20' },
  pink: { main: 'text-luma-pink', bg: 'bg-luma-pink/5', border: 'border-luma-pink/20', glow: 'from-luma-pink/20' },
  yellow: { main: 'text-luma-yellow', bg: 'bg-luma-yellow/5', border: 'border-luma-yellow/30', glow: 'from-luma-yellow/20' },
  purple: { main: 'text-luma-purple', bg: 'bg-luma-purple/5', border: 'border-luma-purple/20', glow: 'from-luma-purple/20' },
};

export const AssistantPricing: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
       
       {/* Background Ambience */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-luma-yellow/5 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04]" />
       </div>

       <div className="max-w-screen-2xl mx-auto px-4 relative z-10 w-full">
          
          {/* Header */}
          <div className="text-center mb-24 font-sans">
             <motion.div 
               initial={{ opacity: 0, y: 25 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 backdrop-blur-md"
             >
                <Sparkles size={14} className="text-luma-yellow" />
                <span className="text-zinc-650 dark:text-gray-300 font-bold text-xs tracking-wide">تعرفه‌های منصفانه</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 25 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white mb-6 leading-tight"
             >
                بهترین پلن را <span className="text-gradient-animated pb-1 inline-block">انتخاب کنید</span>
             </motion.h2>
             
             <motion.p 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-550 dark:text-gray-400 text-lg font-light max-w-xl mx-auto leading-relaxed"
             >
                پرداخت‌ها از طریق اعتبار "لوم" انجام می‌شود. قابلیت ارتقا یا تمدید خودکار همیشه فعال است.
             </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start font-sans">
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
                      className={`relative group rounded-[32px] transition-all duration-500 ${isPro ? 'lg:-mt-8 lg:mb-8' : ''}`}
                   >
                      {/* Pro Glow Effect */}
                      {isPro && (
                         <div className="absolute inset-0 bg-luma-yellow/15 dark:bg-luma-yellow/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      )}

                      <div className={`
                         relative h-full flex flex-col p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300 text-right
                         ${isPro 
                            ? 'bg-white dark:bg-[#151515] border-luma-yellow/40 shadow-xl dark:shadow-2xl shadow-luma-yellow/5 dark:shadow-luma-yellow/10' 
                            : 'bg-white dark:bg-[#111] border-black/10 dark:border-white/5 hover:border-black/15 dark:hover:border-white/10 shadow-sm hover:shadow-md'
                         }
                      `} dir="rtl">
                         
                         {/* Badge for Pro */}
                         {isPro && (
                            <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-luma-yellow text-black text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-luma-yellow/20 flex items-center gap-1.5 whitespace-nowrap">
                               <Sparkles size={10} className="fill-black" />
                               <span>پیشنهاد ویژه</span>
                            </div>
                         )}

                         {/* Header */}
                         <div className="mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${isPro ? 'bg-luma-yellow text-black' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-700 group-hover:dark:text-white group-hover:bg-zinc-200 group-hover:dark:bg-white/10'}`}>
                               <plan.icon size={24} />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${isPro ? 'text-zinc-950 dark:text-white' : 'text-zinc-800 dark:text-gray-200'}`}>
                               {plan.name}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-gray-500 font-medium">
                               {plan.desc}
                            </p>
                         </div>

                         {/* Price */}
                         <div className="mb-8 pb-8 border-b border-black/5 dark:border-white/5">
                            <div className="flex items-baseline gap-1 justify-start">
                               <span className={`text-5xl font-black ${isPro ? 'text-luma-yellow' : 'text-zinc-900 dark:text-white'}`}>
                                  {plan.price}
                                </span>
                               {plan.price !== 'توافقی' && (
                                  <span className="text-sm text-zinc-500 dark:text-gray-500 font-bold mr-1">
                                     / {plan.unit}
                                  </span>
                                )}
                            </div>
                         </div>

                         {/* Features */}
                         <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm leading-6 justify-start text-right">
                                  <div className={`mt-1 shrink-0 ${feat.included ? (isPro ? 'text-luma-yellow' : 'text-zinc-900 dark:text-white') : 'text-zinc-300 dark:text-gray-700'}`}>
                                     {feat.included ? <Check size={16} /> : <X size={16} />}
                                  </div>
                                  <span className={`font-medium ${feat.included ? 'text-zinc-800 dark:text-gray-300' : 'text-zinc-400 dark:text-gray-600 line-through decoration-zinc-300 dark:decoration-gray-700'}`}>
                                     {feat.name}
                                  </span>
                               </li>
                            ))}
                         </ul>

                         {/* CTA Button */}
                         <Button 
                            externalHref="https://dash.lumai.ir/assistant/create" 
                            variant={isPro ? 'primary' : 'secondary'} 
                            className={`w-full justify-center text-base py-4 ${isPro ? 'shadow-[0_0_20px_-5px_rgba(255,179,64,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,179,64,0.6)] border-none' : 'border-black/15 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-900 dark:text-white backdrop-blur-md'}`}
                         >
                            {plan.cta}
                         </Button>

                      </div>
                   </motion.div>
                );
             })}
          </div>
       </div>

       {/* --- Bottom Gradient Fade --- */}
       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
