import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Sparkles,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
  Layers,
  Shirt,
  ArrowLeft,
} from 'lucide-react';
import type { CatalogService, MediaCatalogModel } from '../../../lib/catalogApi.ts';
import { formatStartingPrice, formatPersianDigits } from '../../../lib/catalogApi.ts';

export interface VtonModelsProps {
  service?: CatalogService | null;
  models: MediaCatalogModel[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const INITIAL_REVEAL_COUNT = 8;

export const VtonModels: React.FC<VtonModelsProps> = ({
  service,
  models,
  loading = false,
  refreshing = false,
  error = null,
  onRetry,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter models based on search query across name, provider, description, tags, capabilities
  // Preserves backend ordering
  const filteredModels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return models;

    return models.filter((m) => {
      const nameMatch = m.name?.toLowerCase().includes(q);
      const providerMatch = m.provider?.toLowerCase().includes(q);
      const descMatch = m.description?.toLowerCase().includes(q);
      const tagsMatch = m.tags?.some((t) => t.toLowerCase().includes(q));
      const capMatch = m.capabilities?.some((c) => c.toLowerCase().includes(q));
      return nameMatch || providerMatch || descMatch || tagsMatch || capMatch;
    });
  }, [models, searchQuery]);

  // Progressive reveal: if searching, show all matches; if not, respect expanded toggle
  const visibleModels = useMemo(() => {
    if (searchQuery.trim().length > 0 || isExpanded) {
      return filteredModels;
    }
    return filteredModels.slice(0, INITIAL_REVEAL_COUNT);
  }, [filteredModels, searchQuery, isExpanded]);

  const hasOverflow = !searchQuery.trim() && filteredModels.length > INITIAL_REVEAL_COUNT;

  return (
    <section id="models" className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 relative">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold mb-4">
            <Shirt size={14} className="text-luma-purple" aria-hidden="true" />
            <span>مدل‌های پردازش پرو مجازی</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
            انتخاب موتور هوش مصنوعی
          </h2>

          <p className="text-zinc-650 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed">
            موتورهای پیشرفته برای شبیه‌سازی تن‌پوش، نورپردازی و بافت پوشاک بر روی مانکن‌های مجازی.
          </p>

          {refreshing && (
            <div className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-full bg-black/5 dark:bg-white/10 text-xs text-zinc-500 dark:text-gray-400">
              <RefreshCw size={12} className="animate-spin text-luma-yellow" />
              <span>در حال به‌روزرسانی زنده کاتالوگ...</span>
            </div>
          )}
        </header>

        {/* Search Bar (Only shown when models exist or when searching) */}
        {(models.length > 0 || searchQuery) && (
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در نام مدل، سازنده یا قابلیت‌ها..."
                aria-label="جستجو در مدل‌های پرو مجازی"
                className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-luma-yellow/50 transition-all shadow-xs"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-gray-500 pointer-events-none">
                <Search size={18} aria-hidden="true" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="پاک کردن جستجو"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-gray-300 p-1"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="text-xs text-zinc-500 dark:text-gray-400 mt-2 px-2 text-right">
                نمایش {formatPersianDigits(filteredModels.length)} از {formatPersianDigits(models.length)} مدل
              </div>
            )}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && models.length === 0 && (
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0 m-0"
            aria-label="در حال بارگذاری مدل‌ها"
          >
            {[1, 2, 3, 4].map((idx) => (
              <li key={`vton-skeleton-${idx}`} className="h-full">
                <div className="h-full rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#121212] p-6 animate-pulse flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-5 w-20 bg-black/10 dark:bg-white/10 rounded-full" />
                      <div className="h-5 w-16 bg-black/10 dark:bg-white/10 rounded-full" />
                    </div>
                    <div className="h-6 w-3/4 bg-black/10 dark:bg-white/10 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-3.5 w-full bg-black/10 dark:bg-white/10 rounded-md" />
                      <div className="h-3.5 w-4/5 bg-black/10 dark:bg-white/10 rounded-md" />
                    </div>
                  </div>
                  <div className="h-14 bg-black/5 dark:bg-white/5 rounded-2xl" />
                  <div className="h-9 bg-black/10 dark:bg-white/10 rounded-xl" />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Error State */}
        {error && models.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
            <AlertCircle size={32} className="text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">خطا در دریافت کاتالوگ مدل‌ها</h3>
            <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
              ارتباط با کاتالوگ مدل‌های لوما موقتاً برقرار نشد. می‌توانید دوباره تلاش کنید.
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

        {/* Empty Service State */}
        {!loading && !error && models.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center space-y-3">
            <Layers size={32} className="text-zinc-400 dark:text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">سرویس در دسترس نیست</h3>
            <p className="text-xs text-zinc-600 dark:text-gray-400 leading-relaxed">
              مدل‌های سرویس پرو مجازی در حال حاضر موقتاً در کاتالوگ در دسترس نیستند.
            </p>
          </div>
        )}

        {/* Zero Search Results */}
        {!loading && models.length > 0 && filteredModels.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center space-y-3">
            <Search size={28} className="text-zinc-400 dark:text-gray-500 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">مدلی یافت نشد</h3>
            <p className="text-xs text-zinc-500 dark:text-gray-400">
              هیچ مدلی مطابق با عبارت &quot;{searchQuery}&quot; در این بخش پیدا نشد.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-luma-yellow hover:underline font-bold pt-2 cursor-pointer"
            >
              نمایش همه مدل‌ها
            </button>
          </div>
        )}

        {/* Dynamic Models Grid */}
        {visibleModels.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0 m-0">
            {visibleModels.map((model, idx) => {
              const capabilitiesList = (model.capabilities || []).filter(Boolean);
              const visibleChips = capabilitiesList.slice(0, 3);
              const overflowCount = capabilitiesList.length - visibleChips.length;

              // Fallback to tags if capabilities are empty
              const tagChips = visibleChips.length === 0 ? (model.tags || []).slice(0, 3) : [];

              return (
                <li key={model.id} className="h-full">
                  <motion.article
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    className={`h-full relative rounded-3xl border p-6 flex flex-col justify-between bg-white dark:bg-[#121212] border-black/5 dark:border-white/5 shadow-sm group hover:-translate-y-1 hover:border-black/15 dark:hover:border-white/15 transition-all duration-300`}
                  >
                    <div className="space-y-4">
                      {/* Card Header: Provider & Status Badges */}
                      <div className="flex justify-between items-start gap-2 flex-wrap">
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-gray-400 dir-ltr">
                          {model.provider}
                        </span>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          {model.recommended && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-luma-yellow/20 text-zinc-950 dark:text-luma-yellow text-[10px] font-bold">
                              <Crown size={11} className="text-luma-yellow" aria-hidden="true" />
                              <span>پیشنهادی</span>
                            </span>
                          )}
                          {model.isNew && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              <Sparkles size={11} aria-hidden="true" />
                              <span>جدید</span>
                            </span>
                          )}
                          {model.featured && !model.recommended && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-luma-purple/20 text-luma-purple text-[10px] font-bold">
                              <span>ویژه</span>
                            </span>
                          )}
                          {model.legacy && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                              <span>قدیمی</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Model Title */}
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-luma-yellow transition-colors">
                        {model.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-zinc-650 dark:text-gray-400 leading-relaxed font-light line-clamp-3">
                        {model.description}
                      </p>

                      {/* Capabilities or Tags */}
                      {visibleChips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {visibleChips.map((cap, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-gray-300 font-medium"
                            >
                              {cap}
                            </span>
                          ))}
                          {overflowCount > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-gray-400">
                              +{formatPersianDigits(overflowCount)}
                            </span>
                          )}
                        </div>
                      )}

                      {visibleChips.length === 0 && tagChips.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {tagChips.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-gray-300 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Area: Pricing & Action */}
                    <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 space-y-3">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-zinc-500 dark:text-gray-400">تعرفه پایه:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {typeof model.pricing?.minimum === 'number'
                            ? formatStartingPrice(model.pricing.minimum, model.pricing.currency)
                            : 'متناسب با مدل'}
                        </span>
                      </div>

                      {model.pricing?.description && (
                        <div className="text-[11px] text-zinc-600 dark:text-gray-400 leading-snug p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                          {model.pricing.description}
                        </div>
                      )}

                      <a
                        href="https://dash.lumai.ir/service/virtual-try-on"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-gray-100 transition-colors shadow-xs"
                      >
                        <span>پرو با این مدل</span>
                        <ArrowLeft size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ul>
        )}

        {/* Progressive Reveal Expand/Collapse Button */}
        {hasOverflow && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-800 dark:text-gray-200 text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>
                {isExpanded
                  ? 'بستن فهرست مدل‌ها'
                  : `نمایش همه مدل‌ها (${formatPersianDigits(models.length)})`}
              </span>
              {isExpanded ? (
                <ChevronUp size={16} aria-hidden="true" />
              ) : (
                <ChevronDown size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
