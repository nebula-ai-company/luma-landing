import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Radio, Crown, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { TTSHoverCard } from './TTSHoverCard';
import { TTSSectionBackground } from './TTSSectionBackground';
import type { CatalogService, MediaCatalogModel } from '../../../lib/catalogApi.ts';
import { formatStartingPrice, formatPersianDigits } from '../../../lib/catalogApi.ts';

export interface TTSModelsProps {
  service?: CatalogService | null;
  models: MediaCatalogModel[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ACCENT_COLORS: Array<'yellow' | 'purple' | 'pink'> = ['yellow', 'purple', 'pink'];

export const TTSModels: React.FC<TTSModelsProps> = ({
  service,
  models,
  loading = false,
  refreshing = false,
  error = null,
  onRetry,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="models" className="relative py-20 lg:py-28 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <TTSSectionBackground variant="models" />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Radio size={14} className="text-luma-purple" aria-hidden="true" />
            <span>مدل‌های هوش مصنوعی گفتار</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">
            انتخاب مدل متناسب با نیاز شما
          </h2>

          <p className="text-base text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            لوما از برترین مدل‌های بین‌المللی تبدیل متن به گفتار پشتیبانی می‌کند تا برای هر سناریو بهترین خروجی را دریافت کنید.
          </p>

          {refreshing && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs text-zinc-500 dark:text-gray-400">
              <RefreshCw size={12} className="animate-spin text-luma-yellow" />
              <span>در حال به‌روزرسانی زنده کاتالوگ...</span>
            </div>
          )}
        </header>

        {/* Initial Loading Skeleton State */}
        {loading && models.length === 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch list-none p-0 m-0" aria-label="در حال بارگذاری مدل‌ها">
            {[1, 2, 3].map((skeletonIdx) => (
              <li key={`tts-skeleton-${skeletonIdx}`} className="h-full flex flex-col">
                <article className="h-full flex flex-col rounded-[24px] p-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 animate-pulse">
                  <div className="p-7 h-full flex flex-col justify-between space-y-6">
                    <header className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="h-5 w-24 bg-black/10 dark:bg-white/10 rounded-full" />
                        <div className="h-5 w-16 bg-black/10 dark:bg-white/10 rounded-full" />
                      </div>
                      <div className="h-7 w-3/4 bg-black/10 dark:bg-white/10 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-full bg-black/10 dark:bg-white/10 rounded-md" />
                        <div className="h-3.5 w-4/5 bg-black/10 dark:bg-white/10 rounded-md" />
                      </div>
                    </header>
                    <div className="h-16 bg-black/5 dark:bg-white/5 rounded-2xl" />
                    <div className="h-10 bg-black/10 dark:bg-white/10 rounded-xl" />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Contained Error State with Retry Button */}
        {error && models.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-[24px] bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
            <AlertCircle size={32} className="text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">خطا در دریافت کاتالوگ مدل‌ها</h3>
            <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
              ارتباط با کاتالوگ مدل‌های لوما موقتاً برقرار نشد. می‌توانید مجدداً تلاش کنید.
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>تلاش مجدد</span>
              </button>
            )}
          </div>
        )}

        {/* Empty / Service Unavailable State */}
        {!loading && !error && models.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-[24px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center space-y-3">
            <Layers size={32} className="text-zinc-400 dark:text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">سرویس در دسترس نیست</h3>
            <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
              مدل‌های سرویس تبدیل متن به گفتار در حال حاضر موقتاً در کاتالوگ در دسترس نیستند.
            </p>
          </div>
        )}

        {/* Dynamic Models Cards Grid */}
        {models.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch list-none p-0 m-0">
            {models.map((model, idx) => {
              const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
              const capabilitiesList = (model.capabilities || []).filter(Boolean);
              const visibleChips = capabilitiesList.slice(0, 3);
              const overflowCount = capabilitiesList.length - visibleChips.length;

              return (
                <li key={model.id} className="h-full flex flex-col">
                  <motion.article
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="h-full flex flex-col"
                  >
                    <TTSHoverCard accentColor={accent} className="h-full">
                      <div className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-6">
                        
                        {/* Card Header & Badges */}
                        <header className="space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-gray-300 font-medium dir-ltr">
                              {model.provider}
                            </span>

                            {/* Catalog-backed Status Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {model.recommended && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-luma-yellow/20 text-zinc-950 dark:text-luma-yellow text-[11px] font-bold">
                                  <Crown size={12} className="text-luma-yellow" aria-hidden="true" />
                                  <span>پیشنهادی</span>
                                </span>
                              )}
                              {model.isNew && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                                  <Sparkles size={12} aria-hidden="true" />
                                  <span>جدید</span>
                                </span>
                              )}
                              {model.featured && !model.recommended && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-luma-purple/20 text-luma-purple text-[11px] font-bold">
                                  <span>ویژه</span>
                                </span>
                              )}
                              {model.legacy && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                                  <span>قدیمی</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                            {model.name}
                          </h3>

                          <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed font-light line-clamp-3">
                            {model.description}
                          </p>
                        </header>

                        {/* Capabilities Chips */}
                        {visibleChips.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[11px] font-medium text-zinc-500 dark:text-gray-400 block">
                              قابلیت‌ها:
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {visibleChips.map((cap, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[11px] px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-gray-300 font-medium"
                                >
                                  {cap}
                                </span>
                              ))}
                              {overflowCount > 0 && (
                                <span className="text-[10px] px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-gray-400">
                                  +{formatPersianDigits(overflowCount)}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Pricing & Billing Details */}
                        <div className="space-y-2.5 py-4 border-y border-black/5 dark:border-white/10">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500 dark:text-gray-400 font-medium">تعرفه پایه:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">
                              {typeof model.pricing?.minimum === 'number'
                                ? formatStartingPrice(model.pricing.minimum, model.pricing.currency)
                                : 'متناسب با مدل'}
                            </span>
                          </div>

                          {model.pricing?.description && (
                            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-zinc-700 dark:text-gray-300 leading-relaxed">
                              <span className="font-medium text-zinc-900 dark:text-white block mb-0.5">نحوه محاسبه:</span>
                              <span>{model.pricing.description}</span>
                            </div>
                          )}
                        </div>

                        {/* Card CTA */}
                        <div className="pt-2">
                          <a
                            href="https://dash.lumai.ir/service/text-to-speech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-gray-100 font-bold text-xs transition-colors"
                          >
                            <span>استفاده از مدل</span>
                            <Sparkles size={14} aria-hidden="true" />
                          </a>
                        </div>

                      </div>
                    </TTSHoverCard>
                  </motion.article>
                </li>
              );
            })}
          </ul>
        )}

      </div>
    </section>
  );
};
