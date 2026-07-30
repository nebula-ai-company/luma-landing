import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coins, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export const TTSPricingLimitations: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#07070a] text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-800 dark:text-gray-200 text-xs font-bold">
            <ShieldCheck size={14} className="text-luma-yellow" />
            <span>شفافیت در محاسبه و محدودیت‌ها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            محاسبه هزینه و نکاتی که باید بدانید
          </h2>

          <p className="text-zinc-600 dark:text-gray-400 text-base sm:text-lg font-light">
            اطلاعات دقیق درباره نحوه کسر اعتبار و چارچوب استفاده از سرویس تبدیل متن به گفتار.
          </p>
        </div>

        {/* 2-Column Cards: Pricing on Right, Limitations on Left (RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pricing & Credit Consumption */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-8 space-y-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-luma-yellow/15 text-zinc-950 dark:text-luma-yellow flex items-center justify-center font-bold">
                  <Coins size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    نحوه محاسبه هزینه (LUM)
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-gray-400">شفافیت کامل پیش از ثبت سفارش</span>
                </div>
              </div>

              {/* Base Rule Highlight Box */}
              <div className="p-5 rounded-2xl bg-luma-yellow/10 border border-luma-yellow/20 text-zinc-950 dark:text-luma-yellow mb-6">
                <div className="text-sm font-bold flex items-center gap-2 mb-1">
                  <Info size={16} />
                  <span>قاعده پایه مصرف:</span>
                </div>
                <div className="text-lg font-black font-mono">
                  ۱ LUM به‌ازای هر ۴ کاراکتر ورودی
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 text-sm text-zinc-600 dark:text-gray-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-luma-yellow shrink-0 mt-0.5" />
                  <span>هزینه نهایی به مدل انتخابی (Gemini، ElevenLabs، MiniMax) بستگی دارد.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-luma-yellow shrink-0 mt-0.5" />
                  <span>مبلغ دقیق نمایش‌داده‌شده در رابط کاربری پیش از ساخت، برای همان درخواست ملاک است.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-luma-yellow shrink-0 mt-0.5" />
                  <span>تغییر مدل یا طول متن ممکن است میزان اعتبار موردنیاز را تغییر دهد.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/10 text-xs text-zinc-500 dark:text-gray-400">
              اعتبار شما تنها پس از تایید دکمه «تولید فایل صوتی» کسر می‌شود.
            </div>
          </motion.div>

          {/* Limitations & Guidelines */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-zinc-50 dark:bg-[#0e0e16] border border-black/5 dark:border-white/10 p-8 space-y-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    محدودیت‌ها و نکات فنی
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-gray-400">اطلاعات ضروری پیش از استفاده</span>
                </div>
              </div>

              <div className="space-y-3.5 text-sm text-zinc-600 dark:text-gray-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>تنها صداهای موجود در رابط کاربری قابل انتخاب است.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>سرویس‌های Voice Cloning (شبیه‌سازی صدا) و ساخت صدای سفارشی ارائه نشده است.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>تنظیمات و محدودیت‌های مدل‌ها ممکن است با به‌روزرسانی تامین‌کنندگان تغییر کند.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>کیفیت و دقت تلفظ می‌تواند بسته به متن، زبان و مدل انتخابی متفاوت باشد.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>پیشنهاد می‌شود کاربران خروجی‌های صوتی تجاری مهم را پیش از انتشار به دقت گوش دهند.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/10 text-xs text-zinc-500 dark:text-gray-400">
              تیم پشتیبانی لوما همواره آماده پاسخگویی به سوالات شماست.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
