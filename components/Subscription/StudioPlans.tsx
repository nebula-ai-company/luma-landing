import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Cpu, Coins, Check } from 'lucide-react';
import { STUDIO_PLANS, StudioPlan } from './SubscriptionData';
import Button from '../Button';

const toPersianNum = (num: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

const getPlanFeatures = (plan: StudioPlan) => {
  switch (plan.id) {
    case 'basic':
      return [
        'همه مدل‌ها (رندرهای نهایی و پیش‌نمایش)',
        '۵ گیگابایت فضای ذخیره‌سازی ابری',
        '۲ درخواست پردازش همزمان',
      ];
    case 'plus':
      return [
        'همه مدل‌ها (رندرهای نهایی و پیش‌نمایش)',
        '۲۰ گیگابایت فضای ذخیره‌سازی ابری',
        '۴ درخواست پردازش همزمان',
        'اولویت نوبت‌دهی متوسط',
      ];
    case 'pro':
      return [
        'همه مدل‌ها (رندرهای خلاقانه، نهایی و پیش‌نمایش)',
        '۵۰ گیگابایت فضای ذخیره‌سازی ابری',
        '۱۰ درخواست پردازش همزمان',
        'اولویت نوبت‌دهی بالا',
      ];
    case 'max':
      return [
        'همه مدل‌ها + دسترسی به موتورهای سنگین رفرنس',
        '۲۰۰ گیگابایت فضای ذخیره‌سازی بزرگ',
        '۲۵ درخواست پردازش همزمان',
        'بالاترین اولویت پردازشی (آنی)',
      ];
    default:
      return [];
  }
};

export const StudioPlans: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
    <section className="py-24 bg-transparent relative overflow-hidden" dir="rtl">
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
            className="text-zinc-650 dark:text-zinc-400 font-light max-w-2xl mx-auto"
          >
            با خرید اشتراک خلاقیت، از قدرت پردازش برتر سرورها، کیفیت رندر رفرنس و بسته‌های لوم بهره‌مند شوید.
          </motion.p>
        </div>

        {/* 4-Column simplified Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
          {STUDIO_PLANS.map((plan, idx) => {
            const isPro = plan.recommended;
            const cardId = plan.id;
            const mousePos = mousePositions[cardId] || { x: 0, y: 0 };

            // Compute discount percent if original price is set and greater than monthly price
            const hasDiscount = plan.originalPriceMonthly > plan.priceMonthly;
            const discountPercent = hasDiscount 
              ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100) 
              : 0;

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
                className={`relative group rounded-[32px] transition-all duration-300 flex flex-col ${isPro ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Pro atmospheric glow */}
                {isPro && (
                  <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-950/20 blur-3xl -z-10 rounded-[40px] opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                )}

                <div className={`
                  relative h-full flex-1 flex flex-col p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-300 overflow-hidden
                  ${isPro 
                    ? 'bg-purple-50/20 text-zinc-900 dark:bg-[#15121c]/90 dark:text-white border-luma-purple/30 shadow-xl shadow-luma-purple/5' 
                    : 'bg-white dark:bg-[#121212]/90 border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 shadow-sm dark:shadow-none'
                  }
                `}>
                  
                  {/* Spot Gradient Double-Bezel Highlight */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isPro ? 'rgba(218, 143, 255, 0.12)' : 'rgba(218, 143, 255, 0.06)'}, transparent 45%)` }} 
                  />

                  {/* Header */}
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

                  {/* Price Block */}
                  <div className="relative z-10 mb-6 flex flex-col min-h-[64px] justify-end">
                    {hasDiscount && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-zinc-450 dark:text-zinc-500 line-through text-sm font-medium">
                          {toPersianNum(plan.originalPriceMonthly.toLocaleString())}
                        </span>
                        <span className="bg-rose-500/10 text-rose-500 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                          {toPersianNum(discountPercent)}٪ تخفیف
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {toPersianNum(plan.priceMonthly.toLocaleString())}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-light">تومان / ماه</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-6 relative z-10" />

                  {/* Prominent Included LUM */}
                  <div className="relative z-10 mb-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Coins size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-450 dark:text-zinc-500 font-medium">سهمیه اعتبار لوم</div>
                      <div className="text-sm font-black text-zinc-850 dark:text-zinc-150">
                        {toPersianNum(plan.lumIncluded)} لوم در ماه
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-6 relative z-10" />

                  {/* Detailed features of this plan */}
                  <div className="relative z-10 mb-8 flex-1">
                    <ul className="space-y-3.5">
                      {getPlanFeatures(plan).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans">
                          <Check size={14} className="text-[#DA8FFF] shrink-0 mt-0.5" />
                          <span>{toPersianNum(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Call to Action Button */}
                  <div className="relative z-10 w-full mt-auto">
                    <Button 
                      variant={isPro ? "primary" : "secondary"} 
                      externalHref="https://dash.lumai.ir/"
                      className="w-full text-center py-3 justify-center text-xs"
                    >
                      انتخاب پلن {plan.name}
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
