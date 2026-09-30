import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coins, AlertCircle, CheckCircle, ShieldAlert, Layers } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';
import type { MediaCatalogModel, MediaServicePriceInfo } from '../../../lib/catalogApi.ts';
import { formatStartingPrice } from '../../../lib/catalogApi.ts';

export interface TTSPricingLimitationsProps {
  models?: MediaCatalogModel[];
  priceInfo?: MediaServicePriceInfo | null;
  loading?: boolean;
  error?: string | null;
}

export const TTSPricingLimitations: React.FC<TTSPricingLimitationsProps> = ({
  models = [],
  priceInfo,
  loading = false,
  error = null,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="pricing" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 text-zinc-900 dark:text-luma-yellow text-xs font-bold">
            <Coins size={14} className="text-luma-yellow" aria-hidden="true" />
            <span>شفافیت در تعرفه و محدودیت‌ها</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            تعرفه‌ها و خط‌مشی‌های استفاده
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            تعرفه هر مدل بر اساس واحد محاسبه همان مدل تعیین شده و پیش از پردازش به صورت شفاف نمایش داده می‌شود.
          </p>
        </header>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Pricing Breakdown */}
          <motion.article
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
                      <Coins size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      نحوه محاسبه و تعرفه مدل‌ها
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
                    تعرفه هر مدل بر اساس واحد محاسبه همان مدل تعیین می‌شود. نرخ به‌روز هر مدل در ادامه نمایش داده شده است:
                  </p>

                  {/* Skeletons when loading */}
                  {loading && models.length === 0 && (
                    <div className="space-y-3 pt-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 animate-pulse flex justify-between items-center">
                          <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded-md" />
                          <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded-md" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dynamic Rows */}
                  {models.length > 0 && (
                    <dl className="space-y-3 pt-2 text-xs m-0">
                      {models.map((model) => (
                        <div
                          key={model.id}
                          className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-black/5 dark:border-white/5"
                        >
                          <dt className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <span>{model.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-zinc-500 dark:text-gray-400 font-normal dir-ltr">
                              {model.provider}
                            </span>
                          </dt>
                          <dd className="font-medium text-luma-yellow m-0 flex flex-col sm:items-end gap-0.5">
                            <span className="font-bold">
                              {typeof model.pricing?.minimum === 'number'
                                ? formatStartingPrice(model.pricing.minimum, model.pricing.currency)
                                : 'متناسب با مدل'}
                            </span>
                            {model.pricing?.description && (
                              <span className="text-[11px] text-zinc-600 dark:text-gray-300 font-normal">
                                {model.pricing.description}
                              </span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Empty or error fallback */}
                  {!loading && models.length === 0 && (
                    <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-zinc-500 dark:text-gray-400 text-center">
                      اطلاعات تعرفه مدل‌ها همگام با داشبورد پردازش استودیو اعمال می‌گردد.
                    </div>
                  )}
                </div>

                <div className="pt-2 text-[11px] text-zinc-500 dark:text-gray-400 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-luma-yellow shrink-0" aria-hidden="true" />
                  <span>اعتبار فقط در صورت موفقیت کامل پردازش از حساب کسر می‌گردد.</span>
                </div>

              </div>
            </TTSHoverCard>
          </motion.article>

          {/* Column 2: Limitations & Ethical Policy */}
          <motion.article
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
                      <AlertCircle size={20} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                      محدودیت‌ها و قوانین استفاده اخلاقی
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
                    جهت حفظ امنیت کاربران و جلوگیری از سوءاستفاده، ضوابط زیر به اجرا درمی‌آیند:
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-700 dark:text-gray-300 list-none p-0 m-0">
                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">
                        <strong>ممنوعیت تقلید صدا بدون مجوز:</strong> کپی‌برداری صوتی از چهره‌های شناخته‌شده یا اشخاص ثالث بدون رضایت کتبی اکیداً ممنوع است.
                      </span>
                    </li>

                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">
                        <strong>حداکثر طول هر درخواست:</strong> حداکثر طول هر درخواست ممکن است بر اساس مدل انتخابی متفاوت باشد؛ محدودیت‌های قابل اعمال در ابزار نمایش داده می‌شوند.
                      </span>
                    </li>

                    <li className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-start gap-2.5">
                      <ShieldAlert size={16} className="text-luma-pink shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">
                        <strong>محتوای غیرمجاز:</strong> تولید اخبار کذب، محتوای نفرت‌پراکن، کلاهبرداری تلفنی و نادیده گرفتن حقوق مالکیت معنوی منجر به مسدودی حساب می‌شود.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-zinc-500 dark:text-gray-400 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-luma-purple shrink-0" aria-hidden="true" />
                  <span>پشتیبانی فنی آماده پاسخگویی به سوالات مربوط به بسته‌های سازمانی می‌باشد.</span>
                </div>

              </div>
            </TTSHoverCard>
          </motion.article>

        </div>

      </div>
    </section>
  );
};
