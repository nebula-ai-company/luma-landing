import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shirt, Sparkles, Zap, Camera, Ruler, Palette, ChevronDown } from 'lucide-react';
import Button from '../../Button';
import { VtonHeroAnim } from './VtonHeroAnim';
import type { MediaCatalogModel, MediaServicePriceInfo } from '../../../lib/catalogApi.ts';
import { formatPersianDigits, formatCurrencyLabel } from '../../../lib/catalogApi.ts';

export interface VtonHeroProps {
  modelCount?: number;
  startingPrice?: number | null;
  priceInfo?: MediaServicePriceInfo | null;
  loading?: boolean;
  isServiceAvailable?: boolean;
  models?: MediaCatalogModel[];
}

export const VtonHero: React.FC<VtonHeroProps> = ({
  modelCount,
  startingPrice,
  priceInfo,
  loading = false,
  isServiceAvailable = true,
  models = [],
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Dynamic model count display
  let countDisplay = 'موتورهای هوشمند';
  let countSub = 'شبیه‌سازی و پرو پوشاک';
  if (loading) {
    countDisplay = '—';
    countSub = 'در حال دریافت مدل‌ها';
  } else if (modelCount && modelCount > 0) {
    countDisplay = `${formatPersianDigits(modelCount)} موتور هوشمند`;
    countSub = 'شبیه‌سازی و پرو پوشاک';
  }

  // Dynamic starting price display
  let priceDisplay = 'تعرفه متناسب با مدل';
  let priceSub = 'محاسبه شفاف پیش از پردازش';
  if (loading) {
    priceDisplay = '—';
    priceSub = 'در حال دریافت تعرفه';
  } else if (priceInfo && !priceInfo.hasMixedCurrencies) {
    priceDisplay = `شروع از ${formatPersianDigits(priceInfo.minimum)} ${formatCurrencyLabel(priceInfo.currency)}`;
    priceSub = 'نرخ پایه و مشخصات هر مدل';
  } else if (startingPrice !== undefined && startingPrice !== null) {
    priceDisplay = `شروع از ${formatPersianDigits(startingPrice)} لوم`;
    priceSub = 'نرخ پایه و مشخصات هر مدل';
  }

  const defaultModelName = models[0]?.name;

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300">
      
      {/* --- Background Atmosphere --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Yellow Orb (Right - Fabrics) */}
        <motion.div 
          animate={shouldReduceMotion ? {} : { 
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-luma-yellow/10 dark:bg-luma-yellow/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-100" 
        />
        
        {/* Pink Orb (Left - Skin/Human) */}
        <motion.div 
          animate={shouldReduceMotion ? {} : { 
            x: [0, -50, 50, 0],
            y: [0, 40, -40, 0],
            scale: [0.9, 1.1, 1, 0.9],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-luma-pink/5 dark:bg-luma-pink/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-100" 
        />

        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* --- Bottom Fade --- */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <header className="text-center lg:text-right">
              <motion.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luma-yellow/30 dark:border-luma-yellow/20 bg-luma-yellow/5 backdrop-blur-md mb-8 group hover:bg-luma-yellow/10 transition-colors"
              >
                <Camera size={16} className="text-amber-600 dark:text-luma-yellow animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-bold text-amber-600 dark:text-luma-yellow tracking-wide">استودیوی عکاسی دیجیتال</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-6 leading-tight tracking-tight">
                پروی مجازی
                <br />
                <span className="text-gradient-animated py-2 inline-block">
                  بدون نیاز به مدل
                </span>
              </h1>

              <p className="text-lg text-zinc-650 dark:text-gray-400 mb-10 leading-loose max-w-xl mx-auto lg:mx-0 font-light">
                کافیست عکس لباس را (روی چوب‌لباسی یا سطح صاف) به لوما بدهید تا هوش مصنوعی آن را بر تن مدل‌های مجازی و سناریوهای بصری متنوع نمایش دهد.
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button 
                externalHref="https://dash.lumai.ir/service/virtual-try-on" 
                variant="primary"
                className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white text-white dark:text-black dark:hover:bg-gray-200 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_-5px_rgba(255,179,64,0.4)] border-none justify-center"
              >
                ورود به اتاق پرو
                <Shirt size={20} className="fill-current" aria-hidden="true" />
              </Button>
              <Button 
                variant="secondary" 
                className="hover:bg-zinc-100 dark:hover:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white justify-center"
                onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
              >
                مشاهده مدل‌ها
                <ChevronDown size={20} aria-hidden="true" />
              </Button>
            </div>

            {/* Dynamic Value Metrics */}
            <ul className="pt-6 border-t border-black/5 dark:border-white/10 grid grid-cols-2 gap-4 text-center sm:text-right list-none p-0 m-0 max-w-lg mx-auto lg:mx-0 mb-8">
              <li>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">{countDisplay}</div>
                <div className="text-[11px] text-zinc-500 dark:text-gray-400">{countSub}</div>
              </li>
              <li>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">{priceDisplay}</div>
                <div className="text-[11px] text-zinc-500 dark:text-gray-400">{priceSub}</div>
              </li>
            </ul>
            
            {/* Quick Feature Chips */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:mx-0 list-none p-0 m-0">
              {[
                { icon: Palette, text: 'حجاب و پوشش متنوع', color: 'text-luma-pink', bg: 'bg-luma-pink/5', border: 'group-hover:border-luma-pink/30', gradient: 'from-luma-pink/10 to-transparent' },
                { icon: Ruler, text: 'سایزبندی مانکن', color: 'text-luma-yellow', bg: 'bg-luma-yellow/5', border: 'group-hover:border-luma-yellow/30', gradient: 'from-luma-yellow/10 to-transparent' },
                { icon: Camera, text: 'بدون نیاز به آتلیه', color: 'text-luma-purple', bg: 'bg-luma-purple/5', border: 'group-hover:border-luma-purple/30', gradient: 'from-luma-purple/10 to-transparent' },
                { icon: Zap, text: 'پردازش سریع ابری', color: 'text-luma-pink', bg: 'bg-luma-pink/5', border: 'group-hover:border-luma-pink/30', gradient: 'from-luma-pink/10 to-transparent' }
              ].map((f, i) => (
                <motion.li 
                  key={i}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.08) }}
                  className={`
                    relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl 
                    bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 
                    transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-xl dark:shadow-none
                    ${f.border}
                  `}
                >
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
                  
                  {/* Icon Box */}
                  <div className={`
                    relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                    ${f.bg} border border-zinc-200/50 dark:border-white/5 shadow-inner
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <f.icon size={22} className={f.color} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col relative z-10">
                    <span className="text-sm font-bold text-zinc-700 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                      {f.text}
                    </span>
                  </div>
                  
                  {/* Subtle Active Indicator */}
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-current opacity-0 group-hover:opacity-100 transition-opacity ${f.color}`} aria-hidden="true" />
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Animation */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
            {/* Glow Behind Container */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-luma-yellow/20 via-luma-pink/10 to-transparent blur-3xl opacity-40 rounded-[40px] -z-10 animate-pulse-slow" aria-hidden="true" />
            
            {/* Component Wrapper */}
            <figure className="w-full h-full shadow-2xl rounded-[40px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0c0c0e]">
              <VtonHeroAnim defaultModelName={defaultModelName} />
              <figcaption className="sr-only">پیش‌نمایش تعاملی اتاق پرو مجازی و شبیه‌سازی هوشمند لباس بر تن مانکن</figcaption>
            </figure>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
