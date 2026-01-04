
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Building2, Sparkles, ShieldCheck } from 'lucide-react';
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

const ThemeColors: Record<string, { main: string, bg: string, border: string, glow: string }> = {
  gray: { main: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10', glow: 'from-gray-500/20' },
  pink: { main: 'text-luma-pink', bg: 'bg-luma-pink/5', border: 'border-luma-pink/20', glow: 'from-luma-pink/20' },
  yellow: { main: 'text-luma-yellow', bg: 'bg-luma-yellow/5', border: 'border-luma-yellow/30', glow: 'from-luma-yellow/20' },
  purple: { main: 'text-luma-purple', bg: 'bg-luma-purple/5', border: 'border-luma-purple/20', glow: 'from-luma-purple/20' },
};

export const AssistantPricing: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
       {/* Background Ambience */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-luma-yellow/5 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
       </div>

       <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
             >
                <Sparkles size={14} className="text-luma-yellow" />
                <span className="text-gray-300 font-bold text-xs tracking-wide">تعرفه‌های انعطاف‌پذیر</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-white mb-4"
             >
                بهترین پلن را <span className="text-gradient-animated">انتخاب کنید</span>
             </motion.h2>
             
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg font-light"
             >
                پرداخت‌ها از طریق اعتبار "لوم" انجام می‌شود. تمدید خودکار در دسترس است.
             </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
             {PLANS.map((plan, idx) => {
                const styles = ThemeColors[plan.theme];
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
                         <div className="absolute inset-0 bg-luma-yellow/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      )}

                      <div className={`
                         relative h-full flex flex-col p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300
                         ${isPro 
                            ? 'bg-[#151515] border-luma-yellow/40 shadow-2xl shadow-luma-yellow/10' 
                            : 'bg-[#111] border-white/5 hover:border-white/10'
                         }
                      `}>
                         
                         {/* Badge for Pro */}
                         {isPro && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-luma-yellow text-black text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-luma-yellow/20 flex items-center gap-1.5">
                               <Sparkles size={10} className="fill-black" />
                               <span>پیشنهاد ویژه</span>
                            </div>
                         )}

                         {/* Header */}
                         <div className="mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${isPro ? 'bg-luma-yellow text-black' : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10'}`}>
                               <plan.icon size={24} />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${isPro ? 'text-white' : 'text-gray-200'}`}>
                               {plan.name}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium">
                               {plan.desc}
                            </p>
                         </div>

                         {/* Price */}
                         <div className="mb-8 pb-8 border-b border-white/5">
                            <div className="flex items-baseline gap-1">
                               <span className={`text-5xl font-black ${isPro ? 'text-luma-yellow' : 'text-white'}`}>
                                  {plan.price}
                               </span>
                               {plan.price !== 'توافقی' && (
                                  <span className="text-sm text-gray-500 font-bold uppercase">
                                     / {plan.unit}
                                  </span>
                               )}
                            </div>
                         </div>

                         {/* Features */}
                         <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm leading-6">
                                  <div className={`mt-1 shrink-0 ${feat.included ? (isPro ? 'text-luma-yellow' : 'text-white') : 'text-gray-700'}`}>
                                     {feat.included ? <Check size={16} /> : <X size={16} />}
                                  </div>
                                  <span className={`font-medium ${feat.included ? 'text-gray-300' : 'text-gray-600 line-through decoration-gray-700'}`}>
                                     {feat.name}
                                  </span>
                               </li>
                            ))}
                         </ul>

                         {/* CTA Button */}
                         <Button 
                            externalHref="https://lumai.ir/dashboard" 
                            variant={isPro ? 'primary' : 'secondary'} 
                            className={`w-full justify-center text-base py-4 ${isPro ? 'shadow-[0_0_20px_-5px_rgba(255,179,64,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,179,64,0.6)] border-none' : ''}`}
                         >
                            {plan.cta}
                         </Button>

                      </div>
                   </motion.div>
                );
             })}
          </div>
       </div>
    </section>
  );
};
