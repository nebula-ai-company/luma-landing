import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Diamond,
  Zap,
  Sliders,
  Sparkles,
  Layers,
  Crown,
  Star,
  Award,
  History,
  RotateCw,
  AlertCircle,
  Maximize2,
  Scan,
} from 'lucide-react';
import type { CatalogService, MediaCatalogModel } from '../../../lib/catalogApi.ts';
import {
  isMediaModel,
  formatPersianDigits,
  formatStartingPrice,
  useCatalog,
  findServiceById,
} from '../../../lib/catalogApi.ts';

// Static Theme Classes - no dynamic Tailwind interpolation
type UpscaleThemeColor = 'yellow' | 'purple' | 'pink';

interface UpscaleThemeConfig {
  hex: string;
  text: string;
  bgSoft: string;
  borderSoft: string;
  via: string;
  glowBg: string;
}

const THEMES: Record<UpscaleThemeColor, UpscaleThemeConfig> = {
  yellow: {
    hex: '#FFB340',
    text: 'text-luma-yellow',
    bgSoft: 'bg-luma-yellow/10',
    borderSoft: 'border-luma-yellow/30',
    via: 'via-luma-yellow',
    glowBg: 'bg-luma-yellow/5',
  },
  purple: {
    hex: '#DA8FFF',
    text: 'text-luma-purple',
    bgSoft: 'bg-luma-purple/10',
    borderSoft: 'border-luma-purple/30',
    via: 'via-luma-purple',
    glowBg: 'bg-luma-purple/5',
  },
  pink: {
    hex: '#FF6482',
    text: 'text-luma-pink',
    bgSoft: 'bg-luma-pink/10',
    borderSoft: 'border-luma-pink/30',
    via: 'via-luma-pink',
    glowBg: 'bg-luma-pink/5',
  },
};

function getModelTheme(modelId: string, index: number): UpscaleThemeConfig {
  const keys: UpscaleThemeColor[] = ['yellow', 'purple', 'pink'];
  let hash = 0;
  for (let i = 0; i < modelId.length; i++) {
    hash = (hash << 5) - hash + modelId.charCodeAt(i);
  }
  const key = keys[Math.abs(hash + index) % keys.length];
  return THEMES[key];
}

function getModelIcon(model: MediaCatalogModel, index: number) {
  const caps = model.capabilities || [];
  if (caps.includes('10x')) return Diamond;
  if (caps.includes('4x') || model.featured) return Crown;
  if (model.recommended || model.isNew) return Sparkles;
  if (caps.includes('حذف نویز') || caps.includes('ترمیم')) return Sliders;
  if (caps.includes('PNG شفاف') || caps.includes('بدون تغییر ابعاد')) return Layers;
  const icons = [Maximize2, Scan, Zap, Layers, Sparkles];
  return icons[index % icons.length];
}

interface ModelCardProps {
  model: MediaCatalogModel;
  index: number;
  shouldReduceMotion: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index, shouldReduceMotion }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const theme = getModelTheme(model.id, index);
  const IconComponent = getModelIcon(model, index);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Status badge resolution: Recommended > New > Featured > Legacy
  let badgeLabel: string | null = null;
  let badgeClasses = '';

  if (model.recommended && !model.legacy) {
    badgeLabel = 'پیشنهادی';
    badgeClasses = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  } else if (model.isNew && !model.legacy) {
    badgeLabel = 'جدید';
    badgeClasses = 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
  } else if (model.featured && !model.legacy) {
    badgeLabel = 'ویژه';
    badgeClasses = 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
  } else if (model.legacy) {
    badgeLabel = 'قدیمی';
    badgeClasses = 'bg-zinc-200/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700/50';
  }

  const startingPriceFormatted = formatStartingPrice(
    model.pricing?.minimum ?? 0,
    model.pricing?.currency ?? 'LUM'
  );

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      transition={{ delay: shouldReduceMotion ? 0 : Math.min(index * 0.03, 0.25), duration: 0.3 }}
      className="h-full font-sans"
    >
      {/* Outer Shell (Double-Bezel Hardware Architecture) */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-[24px] p-2 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-default bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]"
      >
        {/* Dynamic Border Gradient on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity] pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${theme.hex}35, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        {/* Inner Content Card */}
        <div className="relative h-full bg-white dark:bg-[#0c0c0e] rounded-[18px] overflow-hidden flex flex-col p-6 md:p-7 border border-zinc-100 dark:border-white/5 shadow-sm transition-colors duration-300">
          {/* Subtle Inner Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${theme.hex}15, transparent 55%)`,
            }}
            aria-hidden="true"
          />

          {/* Subtle Bottom Tint */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${theme.hex}15, transparent)` }}
            aria-hidden="true"
          />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header: Icon & Provider & Badges */}
            <div className="flex justify-between items-start mb-5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 group-hover:bg-white group-hover:dark:bg-zinc-800 shadow-sm ${theme.text}`}
              >
                <IconComponent size={22} aria-hidden="true" />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {badgeLabel && (
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase ${badgeClasses}`}
                  >
                    {badgeLabel === 'پیشنهادی' && <Star size={10} aria-hidden="true" />}
                    {badgeLabel === 'جدید' && <Sparkles size={10} aria-hidden="true" />}
                    {badgeLabel === 'ویژه' && <Award size={10} aria-hidden="true" />}
                    {badgeLabel === 'قدیمی' && <History size={10} aria-hidden="true" />}
                    {badgeLabel}
                  </span>
                )}
                <span
                  className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-white/5 shrink-0"
                  dir="ltr"
                >
                  {model.provider}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-luma-yellow transition-colors leading-tight">
                {model.name}
              </h3>
              <p className="text-xs md:text-sm text-zinc-650 dark:text-gray-400 leading-relaxed font-light line-clamp-3 mb-4 transition-colors">
                {model.description || 'موتور ارتقای کیفیت و بازسازی تصویر با هوش مصنوعی.'}
              </p>

              {/* Capabilities (Restrained subset: max 2–3 visible) */}
              {Array.isArray(model.capabilities) && model.capabilities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {model.capabilities.slice(0, 3).map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/5 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                  {model.capabilities.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 border border-zinc-200/60 dark:border-white/5 font-mono">
                      +{formatPersianDigits(model.capabilities.length - 3)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Starting Price & Availability State & Pricing Description */}
            <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-col gap-2 transition-colors duration-300">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white bg-zinc-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-zinc-200/80 dark:border-white/10 transition-colors">
                    {startingPriceFormatted}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  {model.legacy ? (
                    <>
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                      </span>
                      <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">قدیمی</span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">فعال</span>
                    </>
                  )}
                </div>
              </div>

              {/* Authoritative pricing description: accessible on mobile and desktop */}
              {model.pricing?.description && (
                <p
                  className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed pt-0.5 line-clamp-2"
                  title={model.pricing.description}
                >
                  {model.pricing.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Skeleton Placeholder Card
const SkeletonCard: React.FC = () => (
  <div className="rounded-[24px] p-2 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/50 animate-pulse h-[340px]">
    <div className="bg-white dark:bg-[#0c0c0e] rounded-[18px] p-6 border border-zinc-100 dark:border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-5">
        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="w-20 h-5 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="w-3/4 h-6 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
      <div className="w-full h-3.5 rounded bg-zinc-150 dark:bg-zinc-850 mb-1.5" />
      <div className="w-5/6 h-3.5 rounded bg-zinc-150 dark:bg-zinc-850 mb-1.5" />
      <div className="w-2/3 h-3.5 rounded bg-zinc-150 dark:bg-zinc-850 mb-4" />
      <div className="flex gap-1.5 mb-auto">
        <div className="w-12 h-5 rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="w-12 h-5 rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
      <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex justify-between items-center">
        <div className="w-24 h-6 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="w-12 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  </div>
);

export interface UpscaleModelsProps {
  service?: CatalogService | null;
  models?: MediaCatalogModel[];
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const UpscaleModels: React.FC<UpscaleModelsProps> = ({
  service,
  models: externalModels,
  loading: externalLoading,
  error: externalError,
  onRetry: externalOnRetry,
}) => {
  // If props are provided, use them; otherwise fallback to standalone hook
  const isControlled = externalModels !== undefined || service !== undefined;
  const catalogHook = useCatalog({ autoFetch: !isControlled });

  const loading = externalLoading ?? (isControlled ? false : catalogHook.loading);
  const error = externalError ?? (isControlled ? null : catalogHook.error);
  const onRetry = externalOnRetry ?? catalogHook.refetch;

  const shouldReduceMotion = useReducedMotion() ?? false;

  // Resolve valid media models preserving backend catalog order
  const displayModels: MediaCatalogModel[] = useMemo(() => {
    if (externalModels) {
      return externalModels.filter(isMediaModel);
    }
    const targetService = service || findServiceById(catalogHook.data, 'upscale_image');
    if (!targetService || !Array.isArray(targetService.models)) return [];
    return targetService.models.filter(isMediaModel);
  }, [externalModels, service, catalogHook.data]);

  return (
    <section id="upscale-models" className="py-24 bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
      {/* Background Fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-luma-yellow/30 bg-luma-yellow/10 backdrop-blur-md shadow-sm">
            <Maximize2 size={14} className="text-luma-yellow" aria-hidden="true" />
            <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">
              Enhancement Engines
            </span>
          </div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            موتورهای <span className="text-gradient-animated">پردازش و ارتقای تصویر</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-650 dark:text-gray-400 text-lg font-light leading-relaxed"
          >
            دسترسی به {displayModels.length > 0 ? `${formatPersianDigits(displayModels.length)} موتور هوش مصنوعی` : 'مجموعه موتورهای تخصصی'} برای افزایش ابعاد، بازسازی جزئیات، حذف نویز و ترمیم تصاویر بدون افت کیفیت.
          </motion.p>
        </header>

        {/* Dynamic Models Grid or States */}
        {loading && displayModels.length === 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="col-span-1 list-none">
                <SkeletonCard />
              </li>
            ))}
          </ul>
        ) : error && displayModels.length === 0 ? (
          <div className="p-12 text-center rounded-[24px] bg-white dark:bg-[#0c0c0e] border border-rose-200 dark:border-rose-900/40 shadow-sm max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              خطا در دریافت کاتالوگ مدل‌های افزایش کیفیت
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-light">
              {error.message || 'ارتباط با سرور کاتالوگ برقرار نشد. لطفاً مجدداً تلاش کنید.'}
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                <RotateCw size={14} aria-hidden="true" />
                <span>تلاش مجدد</span>
              </button>
            )}
          </div>
        ) : displayModels.length === 0 ? (
          <div className="p-12 text-center rounded-[24px] bg-white dark:bg-[#0c0c0e] border border-zinc-200/80 dark:border-white/5 shadow-sm max-w-md mx-auto">
            <Maximize2 size={32} className="text-zinc-400 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              موتورهای ارتقای تصویر موقتاً در دسترس نیستند
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
              لطفاً دقایقی دیگر صفحه را بارگذاری مجدد فرمایید.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
            <AnimatePresence mode="popLayout">
              {displayModels.map((model, idx) => (
                <li key={model.id} className="col-span-1 list-none">
                  <ModelCard model={model} index={idx} shouldReduceMotion={shouldReduceMotion} />
                </li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {/* Pricing note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            تعرفه‌های نمایش‌داده‌شده حداقل شروع پردازش بوده و هزینه نهایی بر اساس مگاپیکسل، ابعاد و ضرایب بزرگ‌نمایی محاسبه می‌شود. اطلاعات کامل در <a href="/pricing" className="text-luma-yellow underline underline-offset-4 hover:opacity-80">صفحه تعرفه‌ها</a> در دسترس است.
          </p>
        </div>
      </div>
    </section>
  );
};
