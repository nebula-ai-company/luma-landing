import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Film,
  Sparkles,
  Sliders,
  Layers,
  Crown,
  Star,
  Award,
  History,
  RotateCw,
  AlertCircle,
  Maximize2,
  Scan,
  Zap,
  Activity,
  ArrowLeft,
  ChevronDown,
  Search,
  X,
} from 'lucide-react';
import type { CatalogService, MediaCatalogModel } from '../../../lib/catalogApi.ts';
import {
  formatPersianDigits,
  formatStartingPrice,
} from '../../../lib/catalogApi.ts';

// Static Theme Classes - no dynamic Tailwind interpolation
type VideoThemeColor = 'purple' | 'pink' | 'yellow';

interface VideoThemeConfig {
  hex: string;
  text: string;
  bgSoft: string;
  borderSoft: string;
  via: string;
  glowBg: string;
}

const THEMES: Record<VideoThemeColor, VideoThemeConfig> = {
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
  yellow: {
    hex: '#FFB340',
    text: 'text-luma-yellow',
    bgSoft: 'bg-luma-yellow/10',
    borderSoft: 'border-luma-yellow/30',
    via: 'via-luma-yellow',
    glowBg: 'bg-luma-yellow/5',
  },
};

function getModelTheme(modelId: string, index: number): VideoThemeConfig {
  const keys: VideoThemeColor[] = ['purple', 'pink', 'yellow'];
  let hash = 0;
  for (let i = 0; i < modelId.length; i++) {
    hash = (hash << 5) - hash + modelId.charCodeAt(i);
  }
  const key = keys[Math.abs(hash + index) % keys.length];
  return THEMES[key];
}

function getModelIcon(model: MediaCatalogModel, index: number) {
  const caps = model.capabilities || [];
  if (caps.includes('60fps') || caps.includes('حرکت روان')) return Film;
  if (caps.includes('حذف نویز') || caps.includes('رفع تاری')) return Sliders;
  if (caps.includes('4x') || model.featured) return Crown;
  if (model.recommended || model.isNew) return Sparkles;
  if (caps.includes('اقتصادی')) return Zap;
  const icons = [Maximize2, Scan, Activity, Layers, Film];
  return icons[index % icons.length];
}

interface VideoModelCardProps {
  model: MediaCatalogModel;
  index: number;
  shouldReduceMotion: boolean;
}

const VideoModelCard: React.FC<VideoModelCardProps> = ({ model, index, shouldReduceMotion }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPricingDetails, setShowPricingDetails] = useState(false);
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
      transition={{ delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.25), duration: 0.3 }}
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
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-luma-purple transition-colors leading-tight">
                {model.name}
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-gray-400 leading-relaxed font-light line-clamp-3 mb-4 transition-colors">
                {model.description || 'موتور تخصصی ارتقای کیفیت و پردازش ویدئو با هوش مصنوعی.'}
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">آماده پردازش</span>
                    </>
                  )}
                </div>
              </div>

              {/* Authoritative pricing description */}
              {model.pricing?.description && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPricingDetails(!showPricingDetails)}
                    aria-expanded={showPricingDetails}
                    className="w-full flex items-center justify-between text-left text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer py-1"
                  >
                    <span className="line-clamp-1">{model.pricing.description}</span>
                    <ChevronDown
                      size={12}
                      className={`shrink-0 transition-transform duration-200 ${showPricingDetails ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {showPricingDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-white/5 p-2 rounded-lg border border-zinc-200/50 dark:border-white/5 mt-1 leading-relaxed">
                          {model.pricing.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Card Action Link */}
              <div className="pt-2">
                <a
                  href="https://dash.lumai.ir/service/upscale-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all duration-200 cursor-pointer"
                >
                  <span>شروع با {model.name}</span>
                  <ArrowLeft size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export interface VideoEnhancementModelsProps {
  service?: CatalogService | null;
  models?: MediaCatalogModel[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const VideoEnhancementModels: React.FC<VideoEnhancementModelsProps> = ({
  service,
  models = [],
  loading = false,
  refreshing = false,
  error = null,
  onRetry,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'new' | 'legacy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const tabListRef = useRef<HTMLDivElement>(null);

  const hasLegacy = useMemo(() => models.some((m) => m.legacy), [models]);
  const hasNew = useMemo(() => models.some((m) => m.isNew && !m.legacy), [models]);
  const hasFeatured = useMemo(() => models.some((m) => (m.featured || m.recommended) && !m.legacy), [models]);

  const filterTabs = useMemo(() => {
    const tabs: Array<{ id: 'all' | 'featured' | 'new' | 'legacy'; label: string; count: number }> = [
      { id: 'all', label: 'همه مدل‌ها', count: models.length },
    ];
    if (hasFeatured) {
      tabs.push({
        id: 'featured',
        label: 'پیشنهادی و ویژه',
        count: models.filter((m) => (m.featured || m.recommended) && !m.legacy).length,
      });
    }
    if (hasNew) {
      tabs.push({
        id: 'new',
        label: 'جدیدترین‌ها',
        count: models.filter((m) => m.isNew && !m.legacy).length,
      });
    }
    if (hasLegacy) {
      tabs.push({
        id: 'legacy',
        label: 'مدل‌های قدیمی',
        count: models.filter((m) => m.legacy).length,
      });
    }
    return tabs;
  }, [models, hasFeatured, hasNew, hasLegacy]);

  const filteredModels = useMemo(() => {
    let result = models;
    switch (activeFilter) {
      case 'featured':
        result = models.filter((m) => (m.featured || m.recommended) && !m.legacy);
        break;
      case 'new':
        result = models.filter((m) => m.isNew && !m.legacy);
        break;
      case 'legacy':
        result = models.filter((m) => m.legacy);
        break;
      default:
        result = models;
        break;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((m) => {
        return (
          m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          (m.description && m.description.toLowerCase().includes(q)) ||
          (Array.isArray(m.capabilities) && m.capabilities.some((c) => c.toLowerCase().includes(q))) ||
          (Array.isArray(m.tags) && m.tags.some((t) => t.toLowerCase().includes(q)))
        );
      });
    }

    return result;
  }, [models, activeFilter, searchQuery]);

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % filterTabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + filterTabs.length) % filterTabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = filterTabs.length - 1;
    }

    if (nextIndex !== null) {
      const nextTab = filterTabs[nextIndex];
      setActiveFilter(nextTab.id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <section id="models" className="relative py-20 lg:py-32 bg-[#FAFAFA] dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 text-zinc-900 dark:text-luma-purple text-xs font-bold">
            <Film size={14} className="text-luma-purple" aria-hidden="true" />
            <span>موتورها و مدل‌های تخصصی ویدئو</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.2]">
            {loading ? (
              <span className="text-gradient-animated inline-block pb-1">در حال دریافت کاتالوگ مدل‌ها...</span>
            ) : (
              <>
                <span className="text-gradient-animated inline-block pb-1">
                  {formatPersianDigits(models.length)} مدل تخصصی
                </span>{' '}
                برای هر نوع ویدئو و نیاز
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-gray-400 font-light leading-relaxed">
            از افزایش سریع و اقتصادی رزولوشن تا حذف نویز، رفع تاری و روان‌سازی فریم‌ها؛ مدل ایده‌آل پروژه‌تان را بر اساس مشخصات رسمی و زنده انتخاب کنید.
          </p>

          {/* Filter Tabs and Search Bar */}
          {!loading && models.length > 0 && (
            <div className="space-y-4 pt-4">
              {filterTabs.length > 1 && (
                <div
                  ref={tabListRef}
                  role="tablist"
                  aria-label="فیلتر مدل‌های ارتقای ویدئو"
                  className="flex flex-wrap items-center justify-center gap-2"
                >
                  {filterTabs.map((tab, idx) => {
                    const isActive = activeFilter === tab.id;
                    return (
                      <button
                        type="button"
                        key={tab.id}
                        role="tab"
                        id={`video-model-tab-${tab.id}`}
                        aria-selected={isActive}
                        aria-controls="video-models-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActiveFilter(tab.id)}
                        onKeyDown={(e) => handleTabKeyDown(e, idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold shadow-md'
                            : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-white/20 dark:bg-zinc-950/20 text-white dark:text-zinc-950'
                              : 'bg-black/5 dark:bg-white/5 text-zinc-500'
                          }`}
                        >
                          {formatPersianDigits(tab.count)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Compact Search Field */}
              <div className="max-w-md mx-auto relative">
                <Search
                  size={15}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`جستجو در بین ${formatPersianDigits(models.length)} مدل (نام، سازنده، قابلیت)...`}
                  className="w-full pr-10 pl-9 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-luma-purple/50 focus:ring-1 focus:ring-luma-purple/50 transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="پاک کردن جستجو"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Loading State Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-[24px] p-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 animate-pulse flex flex-col justify-between"
              >
                <div className="h-full bg-white dark:bg-[#0c0c0e] rounded-[18px] p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-20 h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                  <div className="w-3/4 h-6 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="w-full h-12 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex gap-2 pt-4">
                    <div className="w-16 h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-16 h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Missing Service / Unavailable State (Instruction 25) */}
        {!loading && !error && (!service || models.length === 0) && (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-zinc-100 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <AlertCircle size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">سرویس ارتقای ویدئو موقتاً در دسترس نیست</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                مدل‌های این بخش در حال حاضر در کاتالوگ عمومی بارگذاری نشده‌اند. سایر بخش‌های پلتفرم فعال هستند.
              </p>
            </div>
            <div>
              <a
                href="https://dash.lumai.ir/service/upscale-video"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <span>مشاهده داشبورد ابزار ارتقای ویدئو</span>
                <ArrowLeft size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Error State with Retry Button */}
        {error && !loading && (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">خطا در بارگذاری کاتالوگ مدل‌ها</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{error}</p>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RotateCw size={14} aria-hidden="true" />
                <span>تلاش مجدد</span>
              </button>
            )}
          </div>
        )}

        {/* Empty Search Filter State */}
        {!loading && !error && models.length > 0 && filteredModels.length === 0 && (
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-zinc-100 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-center space-y-3">
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              هیچ مدلی متناسب با عبارت «{searchQuery}» یافت نشد.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-luma-purple hover:underline cursor-pointer"
            >
              پاک کردن فیلتر جستجو
            </button>
          </div>
        )}

        {/* Models Grid */}
        {!loading && !error && models.length > 0 && filteredModels.length > 0 && (
          <div
            id="video-models-panel"
            role="tabpanel"
            aria-labelledby={`video-model-tab-${activeFilter}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredModels.map((model, idx) => (
                <VideoModelCard
                  key={model.id}
                  model={model}
                  index={idx}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pricing Disclaimer Card */}
        <aside
          aria-label="نکته مهم در خصوص محاسبه تعرفه"
          className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-zinc-100/80 dark:bg-[#121218] border border-black/5 dark:border-white/10 flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400"
        >
          <Sparkles size={18} className="text-luma-purple shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-200 text-xs m-0">
              شفافیت در محاسبه تعرفه پردازش:
            </h3>
            <p className="leading-relaxed m-0">
              تعرفه‌های درج‌شده نرخ پایه و شروع هر مدل هستند. هزینه نهایی بر اساس مدت زمان ویدئو (ثانیه/دقیقه)، رزولوشن ورودی و خروجی، ضریب افزایش مقیاس و تنظیمات مدل محاسبه می‌شود. پیش‌فاکتور دقیق مصرف لوم پیش از آغاز هر پردازش در داشبورد لوما نمایش داده می‌شود.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};
