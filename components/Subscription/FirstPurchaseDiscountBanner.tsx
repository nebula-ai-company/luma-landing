import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Gift, Tag, ArrowLeft } from 'lucide-react';

export const FirstPurchaseDiscountBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'HELLO_LUMA';

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(promoCode);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = promoCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy promo code:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto mt-10 md:mt-12 px-2 sm:px-4"
      dir="rtl"
    >
      {/* Outer Shell - Doppelrand / Premium Double-Bezel Hardware Framing */}
      <div className="relative p-1 sm:p-1.5 rounded-3xl bg-gradient-to-r from-luma-purple/25 via-luma-pink/25 to-amber-500/20 dark:from-luma-purple/30 dark:via-luma-pink/25 dark:to-amber-500/25 border border-zinc-300/40 dark:border-white/10 shadow-2xl shadow-purple-500/[0.06] dark:shadow-purple-950/20 backdrop-blur-xl group">
        
        {/* Subtle Ambient Underglow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-luma-purple/20 via-luma-pink/15 to-amber-500/15 rounded-[1.8rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

        {/* Inner Card Container */}
        <div className="relative z-10 rounded-[calc(1.5rem-0.25rem)] bg-white/95 dark:bg-[#111114]/95 backdrop-blur-2xl p-6 sm:p-7 md:p-8 border border-zinc-200/80 dark:border-white/10 overflow-hidden">
          
          {/* Ambient Background Accents */}
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-luma-purple/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-gradient-to-bl from-luma-pink/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">
            
            {/* Right Side: Clean Value Proposition */}
            <div className="flex-1 text-center sm:text-right space-y-2.5">
              
              {/* Eyebrow Tag */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-luma-purple/10 text-luma-purple dark:bg-luma-purple/20 dark:text-purple-300 border border-luma-purple/20">
                  <Gift size={13} className="shrink-0" />
                  <span>هدیه ویژه اولین خرید</span>
                </span>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  • تخفیف مازاد بر قیمت‌های فعلی
                </span>
              </div>

              {/* Main Headline with Animated Gradient Highlight */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                <motion.span
                  className="text-transparent bg-clip-text bg-[length:200%_auto] inline-block ml-2 filter drop-shadow-sm"
                  animate={{
                    backgroundPosition: ['0% center', '200% center'],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #ec4899 0%, #fb7185 25%, #f59e0b 50%, #a855f7 75%, #ec4899 100%)',
                  }}
                >
                  ۲۵٪ تخفیف مازاد
                </motion.span>
                <span>روی اولین خرید و شارژ اعتبار</span>
              </h3>

              {/* Sub-description explaining that discount applies on top of discounted prices */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-xl">
                این کد هدیه مستقیماً روی صورت‌حساب اولین خرید یا شارژ بسته اعتبار شما اعمال می‌شود؛ به این معنی که حتی در صورت وجود تخفیف‌های مناسبتی، ۲۵٪ دیگر از مبلغ باقی‌مانده کسر خواهد شد.
              </p>
            </div>

            {/* Left Side: Sleek Interactive Coupon Card */}
            <div className="shrink-0 w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 p-2 pr-4 pl-2 rounded-2xl bg-zinc-100/90 dark:bg-[#18181c]/90 border border-zinc-300/80 dark:border-white/10 shadow-inner group/code">
                
                {/* Code display */}
                <div className="flex items-center gap-2.5 pl-2">
                  <div className="w-8 h-8 rounded-xl bg-luma-purple/10 dark:bg-luma-purple/20 flex items-center justify-center text-luma-purple">
                    <Tag size={16} />
                  </div>
                  <div className="flex flex-col items-start" dir="ltr">
                    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      PROMO CODE
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black tracking-wider text-zinc-900 dark:text-white select-all">
                      {promoCode}
                    </span>
                  </div>
                </div>

                {/* Copy Action Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="کپی کد تخفیف"
                  className={`
                    relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 shrink-0
                    ${copied
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm'
                    }
                  `}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check size={14} className="stroke-[2.5]" />
                        <span>کپی شد!</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy size={14} />
                        <span>کپی کد</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Micro Helper Note */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                <Sparkles size={12} className="text-luma-pink animate-pulse" />
                <span>اعمال مستقیم و آنی در فاکتور پرداخت</span>
                <ArrowLeft size={11} className="text-luma-purple" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

