import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Cpu, Coins, Check, Tag, Sparkles } from 'lucide-react';
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
        'بالاترین اولویت پردازشی',
      ];
    case 'enterprise':
      return [
        'زیرساخت ابری و منابع پردازشی اختصاصی',
        'امکان شخصی‌سازی و هماهنگی مدل‌های هوش مصنوعی',
        'تنظیم ظرفیت پردازش موازی متناسب با سازمان',
        'شرایط سازمانی براساس نیاز و قرارداد تعیین می‌شود.',
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
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">استودیو خلاقیت لوما</span>
            <span className="bg-luma-purple/25 text-luma-purple dark:bg-purple-950/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full leading-none">ساختار پیشنهادی اشتراک</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6"
          >
            برنامه اشتراک استودیو <span className="text-gradient-animated">خلاقیت</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-600 dark:text-zinc-300 font-light max-w-2xl mx-auto"
          >
            ساختار و ظرفیت‌های پیش‌بینی‌شده برای پلن‌های اشتراک آتی استودیو. در حال حاضر استفاده از سرویس‌ها از طریق شارژ و کسر مستقیم اعتبار لوم در داشبورد انجام می‌پذیرد.
          </motion.p>
        </div>

        {/* 5-Column responsive Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 items-stretch max-w-[1600px] mx-auto">
          {STUDIO_PLANS.map((plan, idx) => {
            const isPro = plan.recommended;
            const cardId = plan.id;
            const mousePos = mousePositions[cardId] || { x: 0, y: 0 };

            // Compute discount percent if original price is set and greater than monthly price
            const hasDiscount = plan.originalPriceMonthly > plan.priceMonthly;
            const discountPercent = hasDiscount 
              ? Math.round((1 - plan.priceMonthly / plan.originalPriceMonthly) * 100) 
              : 0;

            // 25% First Purchase Discounted Price (HELLO_LUMA promo)
            const firstPurchasePrice = Math.round(plan.priceMonthly * 0.75);

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
                    : 'bg-white dark:bg-[#121212]/90 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 shadow-sm dark:shadow-none'
                  }
                `}>
                  
                  {/* Spot Gradient Double-Bezel Highlight */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${isPro ? 'rgba(218, 143, 255, 0.12)' : 'rgba(218, 143, 255, 0.06)'}, transparent 45%)` }} 
                  />

                  {/* Header */}
                  <div className="relative z-10 flex justify-between items-center mb-6">
                    <span className={`text-lg font-black ${isPro ? 'text-luma-purple' : 'text-zinc-900 dark:text-white'}`}>
                      {plan.name}
                    </span>
                    
                    {isPro && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luma-purple/15 text-luma-purple text-[10px] font-black border border-luma-purple/30">
                        <Crown size={10} /> ساختار پیشنهادی
                      </span>
                    )}
                  </div>

                  {/* Price Block */}
                  <div className="relative z-10 mb-6 flex flex-col min-h-[135px] justify-end">
                    {plan.isEnterprise ? (
                      <div className="flex flex-col justify-end h-full">
                        <span className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                          تماس بگیرید
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">بر اساس نیازهای سازمان شما</span>
                        <div className="mt-3 p-2.5 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                          <span className="font-medium">شرایط سازمانی و قرارداد</span>
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">بر اساس نیاز</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {hasDiscount && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-zinc-400 dark:text-zinc-500 line-through text-sm font-medium">
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
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">تومان / ماه</span>
                        </div>

                        {/* First Purchase Highlight Deal Box */}
                        <div className="mt-3 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent dark:from-purple-950/40 dark:via-purple-900/20 dark:to-transparent border border-purple-500/20 dark:border-purple-400/25 shadow-xs transition-all duration-300">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-300 whitespace-nowrap">
                              <Sparkles size={11} className="text-luma-pink shrink-0" />
                              <span>اولین خرید</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-luma-pink to-luma-purple text-white shadow-xs font-sans whitespace-nowrap">
                              ۲۵٪ تخفیف
                            </span>
                          </div>
                          
                          <div className="flex items-baseline justify-between pt-1 border-t border-purple-500/10 dark:border-white/5">
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">مبلغ پرداختی:</span>
                            <div className="flex items-baseline gap-1 whitespace-nowrap">
                              <span className="text-base font-extrabold font-sans text-zinc-950 dark:text-white tracking-tight">
                                {toPersianNum(firstPurchasePrice.toLocaleString())}
                              </span>
                              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">تومان</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/10 mb-6 relative z-10" />

                  {/* Prominent Included LUM */}
                  <div className="relative z-10 mb-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Coins size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">سهمیه اعتبار لوم</div>
                      <div className="text-sm font-black text-zinc-900 dark:text-white font-sans">
                        {plan.isEnterprise ? 'سفارشی بر اساس قرارداد' : `${toPersianNum(plan.lumIncluded)} لوم در ماه`}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/10 mb-6 relative z-10" />

                  {/* Detailed features of this plan */}
                  <div className="relative z-10 mb-8 flex-1">
                    <ul className="space-y-3.5">
                      {getPlanFeatures(plan).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                          <Check size={14} className="text-[#DA8FFF] shrink-0 mt-0.5" />
                          <span>{toPersianNum(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Call to Action Button */}
                  <div className="relative z-10 w-full mt-auto">
                    {plan.isEnterprise ? (
                      <Button 
                        variant="secondary" 
                        href="/contact"
                        className="w-full text-center py-3 justify-center text-xs"
                      >
                        اطلاعات شرایط سازمانی
                      </Button>
                    ) : (
                      <Button 
                        variant={isPro ? "primary" : "secondary"} 
                        externalHref="https://dash.lumai.ir/"
                        className="w-full text-center py-3 justify-center text-xs"
                      >
                        مشاهده ساختار پلن {plan.name}
                      </Button>
                    )}
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

