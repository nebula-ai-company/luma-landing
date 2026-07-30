import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coins, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';

export const TTSPricingLimitations: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="pricing" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <Coins size={14} className="text-luma-yellow" />
            <span>شفافیت در تعرفه و محدودیت‌ها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            تعرفه‌ها و خط‌مشی‌های استفاده
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            تعرفه بر اساس تعداد کاراکتر متن محاسبه شده و قوانین شفافی برای کاربری استاندارد تعریف گردیده است.
          </p>
        </div>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Pricing Breakdown */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <TTSHoverCard accentColor="yellow" className="h-full">
              <div className="p-8 h-full flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-luma-yellow/15 flex items-center justify-center text-luma-yellow">
                      <Coins size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      نحوه محاسبه اعتبار (LUM)
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
                    محاسبه اعتبار بر مبنای کاراکترهای متن ورودی انجام می‌شود. فرمول عمومی:
                    <span className="block my-2 font-bold text-xs p-3 rounded-xl bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-luma-yellow dir-ltr text-center">
                      مجموع کاراکترها ÷ ۴ = LUM مصرفی
                    </span>
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
                      <span className="font-medium text-zinc-800 dark:text-gray-200">Gemini 3.1 Flash TTS</span>
                      <span className="font-bold text-luma-yellow">۱ LUM به ازای ۴ کاراکتر</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
                      <span className="font-medium text-zinc-800 dark:text-gray-200">MiniMax Speech 2.8 Turbo</span>
                      <span className="font-bold text-luma-yellow">۲ LUM به ازای ۴ کاراکتر</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
                      <span className="font-medium text-zinc-800 dark:text-gray-200">ElevenLabs Eleven v3</span>
                      <span className="font-bold text-luma-yellow">۳ LUM به ازای ۴ کاراکتر</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
                      <span className="font-medium text-zinc-800 dark:text-gray-200">MiniMax Speech 2.8 HD</span>
                      <span className="font-bold text-luma-yellow">۴ LUM به ازای ۴ کاراکتر</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-zinc-500 dark:text-gray-400 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-luma-yellow shrink-0" />
                  <span>اعتبار فقط در صورت موفقیت کامل پردازش از حساب کسر می‌گردد.</span>
                </div>

              </div>
            </TTSHoverCard>
          </motion.div>

          {/* Column 2: Limitations & Ethical Policy */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            <TTSHoverCard accentColor="purple" className="h-full">
              <div className="p-8 h-full flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-luma-purple/15 flex items-center justify-center text-luma-purple">
                      <AlertCircle size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      محدودیت‌ها و قوانین استفاده اخلاقی
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
                    جهت حفظ امنیت کاربران و جلوگیری از سوءاستفاده، ضوابط زیر به اجرا درمی‌آیند:
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-700 dark:text-gray-300">
                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>ممنوعیت تقلید صدا بدون مجوز:</strong> کپی‌برداری صوتی از چهره‌های شناخته‌شده یا اشخاص ثالث بدون رضایت کتبی اکیداً ممنوع است.
                      </span>
                    </li>

                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>حداکثر طول هر درخواست:</strong> بسته به مدل انتخابی، بین ۵,۰۰۰ تا ۵۰,۰۰۰ کاراکتر در هر نوبت پردازش قابل ارسال است.
                      </span>
                    </li>

                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>محتوای غیرمجاز:</strong> تولید اخبار کذب، محتوای نفرت‌پراکن، کلاهبرداری تلفنی و نادیده گرفتن حقوق مالکیت معنوی منجر به مسدودی حساب می‌شود.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-zinc-500 dark:text-gray-400 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-luma-purple shrink-0" />
                  <span>پشتیبانی فنی آماده پاسخگویی به سوالات مربوط به بسته‌های سازمانی می‌باشد.</span>
                </div>

              </div>
            </TTSHoverCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
