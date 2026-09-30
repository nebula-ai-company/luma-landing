import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RefreshCw, AlertCircle, Info } from 'lucide-react';
import {
  MediaCatalogModel,
  CatalogService,
  formatPersianDigits,
  isMediaModel,
} from '../../lib/catalogApi';
import { CatalogMediaPricingBrowser } from './CatalogMediaPricingBrowser';
import { getThemeClasses } from './pricingConfig';

export interface CatalogMediaPricingSectionProps {
  /** The catalog service object containing live models */
  service?: CatalogService;
  /** Display title override (default: service.name) */
  title?: string;
  /** Display description override */
  description?: string;
  /** Optional secondary guidance or source note */
  sourceNote?: string;
  /** Primary accent icon */
  icon: React.ElementType;
  /** Tailwind text color class, e.g. "text-luma-pink" */
  color: string;
  /** Loading state from useCatalog() */
  loading?: boolean;
  /** Error state from useCatalog() */
  error?: Error | null;
  /** Callback to trigger fresh network fetch */
  onRetry?: () => void;
}

export const CatalogMediaPricingSection: React.FC<CatalogMediaPricingSectionProps> = ({
  service,
  title: titleOverride,
  description: descriptionOverride,
  sourceNote,
  icon: Icon,
  color,
  loading = false,
  error = null,
  onRetry,
}) => {
  const theme = getThemeClasses(color);
  const shouldReduceMotion = useReducedMotion();

  const displayTitle = titleOverride || service?.name || 'تعرفه سرویس';
  const displayDescription =
    descriptionOverride ||
    (service?.name
      ? `دسترسی به پیشرفته‌ترین مدل‌های ${service.name} با تعرفه شفاف بر پایه اعتبار لوم.`
      : '');

  // Safely extract media models while preserving backend catalog ordering
  const allMediaModels = useMemo<MediaCatalogModel[]>(() => {
    if (!service || !Array.isArray(service.models)) return [];
    return service.models.filter(isMediaModel);
  }, [service]);

  return (
    <section className="py-16 border-b border-zinc-200 dark:border-white/5 last:border-0 relative">
      {/* Ambient Background Glow (Animated) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? false
            : {
                opacity: [0.03, 0.06, 0.03],
                scale: [1, 1.1, 1],
                x: [0, 20, 0],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none ${theme.glowBg}`}
        aria-hidden="true"
      />

      {/* HEADER ROW */}
      <header className="max-w-screen-2xl mx-auto mb-6 relative z-10">
        <div className="flex items-start gap-5">
          <div
            className={`w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 flex items-center justify-center ${theme.text} shadow-lg shrink-0 group`}
          >
            <Icon size={28} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
              {displayTitle}
              {!loading && !error && allMediaModels.length > 0 && (
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-md ${theme.bgSoft} border ${theme.borderSoft} ${theme.text} hidden sm:inline-block font-bold`}
                >
                  {formatPersianDigits(allMediaModels.length)} مدل
                </span>
              )}
            </h2>
            <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl">
              {displayDescription}
            </p>
            {sourceNote && (
              <p className="text-xs text-zinc-400 dark:text-gray-500 mt-2 font-medium">
                {sourceNote}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10">
        {/* State 1: Error State */}
        {error && !loading && (
          <div className="w-full bg-white dark:bg-[#121212] border border-red-500/20 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle size={28} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              دریافت تعرفه‌های به‌روز با مشکل مواجه شد
            </h3>
            <p className="text-sm text-zinc-600 dark:text-gray-400 font-light max-w-md mb-6 leading-relaxed">
              ارتباط با سرویس کاتالوگ مدل‌های لوما برقرار نشد. سایر بخش‌های صفحه در دسترس هستند و می‌توانید دوباره تلاش کنید.
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple"
              >
                <RefreshCw size={16} aria-hidden="true" />
                تلاش مجدد
              </button>
            )}
          </div>
        )}

        {/* State 2: Loading State (Skeletons matching exact dimensions) */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Box Skeleton */}
            <div className="lg:col-span-7 h-[560px] lg:h-[600px] flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] overflow-hidden p-6 animate-pulse">
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl mb-6" />
              <div className="space-y-4 flex-1">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-14 bg-zinc-100/70 dark:bg-zinc-800/30 rounded-xl" />
                ))}
              </div>
              <div className="h-8 bg-zinc-100/50 dark:bg-zinc-800/20 rounded-lg mt-4" />
            </div>

            {/* Right Box Skeleton */}
            <div className="lg:col-span-5 h-[480px] lg:h-[600px] flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] overflow-hidden p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-zinc-100 dark:bg-zinc-800/60 rounded mb-4" />
              <div className="h-10 bg-zinc-100 dark:bg-zinc-800/40 rounded-xl mb-6" />
              <div className="h-24 bg-zinc-100/60 dark:bg-zinc-800/30 rounded-xl mb-6" />
              <div className="h-28 bg-zinc-100/40 dark:bg-zinc-800/20 rounded-xl mt-auto" />
            </div>
          </div>
        )}

        {/* State 3: Empty Service State (API succeeded but service missing or has 0 models) */}
        {!loading && !error && allMediaModels.length === 0 && (
          <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
              <Info size={28} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              مدلی برای این سرویس در کاتالوگ یافت نشد
            </h3>
            <p className="text-sm text-zinc-500 dark:text-gray-400 font-light max-w-md leading-relaxed">
              کاتالوگ مدل‌های لوما در حال حاضر مدلی برای این سرویس ارائه نداده است.
            </p>
          </div>
        )}

        {/* State 4: Normal Operational Layout */}
        {!loading && !error && allMediaModels.length > 0 && (
          <CatalogMediaPricingBrowser
            models={allMediaModels}
            color={color}
            title={displayTitle}
          />
        )}
      </div>
    </section>
  );
};
