import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Film,
  Zap,
  Crown,
  MonitorPlay,
  Sparkles,
  Video,
  Star,
  Layers,
  Type,
  Image as ImageIcon,
  RotateCw,
  AlertCircle,
  Clock,
  Award,
  History,
} from 'lucide-react';
import type { CatalogResponse, CatalogService } from '../../../lib/catalogApi.ts';
import { formatPersianDigits } from '../../../lib/catalogApi.ts';
import {
  VideoWorkflowTab,
  VideoDisplayModel,
  getVideoDisplayModels,
  countUniqueVideoModels,
  getVideoCatalogServices,
} from '../../../lib/videoCatalog.ts';

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
  const themeKeys: VideoThemeColor[] = ['purple', 'pink', 'yellow'];
  let hash = 0;
  for (let i = 0; i < modelId.length; i++) {
    hash = (hash << 5) - hash + modelId.charCodeAt(i);
  }
  const key = themeKeys[Math.abs(hash + index) % themeKeys.length];
  return THEMES[key];
}

function getModelIcon(model: VideoDisplayModel, index: number) {
  if (model.capabilities.includes('چندمرجع') || model.supportedWorkflows.includes('reference_to_video')) {
    return Layers;
  }
  if (model.capabilities.includes('4K') || model.featured) {
    return Crown;
  }
  if (model.isNew || model.recommended) {
    return Sparkles;
  }
  if (model.capabilities.includes('صدا')) {
    return Video;
  }
  const icons = [Film, Video, Zap, Star, MonitorPlay];
  return icons[index % icons.length];
}

interface ModelCardProps {
  model: VideoDisplayModel;
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

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      transition={{ delay: shouldReduceMotion ? 0 : Math.min(index * 0.02, 0.2), duration: 0.3 }}
      className="h-full font-sans"
    >
      {/* Outer Bezel (Double-Bezel Doppelrand Architecture) */}
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-[24px] p-2 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-default bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]"
      >
        {/* Dynamic Hover Radial Light */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out will-change-[opacity] pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${theme.hex}30, transparent 50%)`,
          }}
        />

        {/* Inner Bezel Card */}
        <div className="relative h-full bg-white dark:bg-zinc-950 rounded-[18px] overflow-hidden flex flex-col p-5 border border-zinc-100 dark:border-zinc-900 shadow-sm transition-colors duration-300">
          {/* Inner Spot Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${theme.hex}15, transparent 55%)`,
            }}
          />

          {/* Bottom subtle ambient tint */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${theme.hex}15, transparent)` }}
          />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header: Icon & Workflow Badge & Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 group-hover:bg-white group-hover:dark:bg-zinc-850 group-hover:border-zinc-300 group-hover:dark:border-zinc-700 shadow-sm ${theme.text}`}
              >
                <IconComponent size={20} aria-hidden="true" />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {model.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase border transition-colors duration-300 ${
                      model.recommended
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : model.isNew
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
                        : model.featured
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {model.badge}
                  </span>
                )}
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                  {model.badgeWorkflow}
                </span>
              </div>
            </div>

            {/* Title, Provider, Description */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-black group-hover:dark:text-white transition-colors truncate">
                  {model.name}
                </h3>
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0" dir="ltr">
                  {model.provider}
                </span>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-2 group-hover:text-zinc-700 group-hover:dark:text-zinc-300 transition-colors mb-3">
                {model.description || 'مدل پردازش هوشمند ویدیو در استودیو لوما'}
              </p>

              {/* Capabilities Chips */}
              {model.capabilities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map((cap, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800"
                    >
                      {cap}
                    </span>
                  ))}
                  {model.capabilities.length > 3 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border border-zinc-200/60 dark:border-zinc-800">
                      +{formatPersianDigits(model.capabilities.length - 3)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Starting Price & Status */}
            <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between transition-colors duration-300">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/80 px-2 py-1 rounded border border-zinc-200/80 dark:border-zinc-800/80 transition-colors w-fit">
                  {model.startingPriceLabel}
                </span>
                {model.startingPriceNote && (
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-light pr-0.5">
                    {model.startingPriceNote}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-all">
                {model.legacy ? (
                  <>
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                    <span className="text-[9px] font-medium text-amber-600 dark:text-amber-400">قدیمی</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">فعال</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Skeleton Placeholder Card
const SkeletonCard: React.FC = () => (
  <div className="rounded-[24px] p-2 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/50 animate-pulse">
    <div className="bg-white dark:bg-zinc-950 rounded-[18px] p-5 border border-zinc-100 dark:border-zinc-900 flex flex-col h-[280px]">
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="w-20 h-5 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="w-3/4 h-5 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
      <div className="w-full h-3 rounded bg-zinc-150 dark:bg-zinc-850 mb-1" />
      <div className="w-2/3 h-3 rounded bg-zinc-150 dark:bg-zinc-850 mb-4" />
      <div className="flex gap-1 mb-auto">
        <div className="w-12 h-4 rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="w-12 h-4 rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
        <div className="w-24 h-6 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="w-10 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  </div>
);

export interface VideoModelsProps {
  catalog?: CatalogResponse | null;
  services?: CatalogService[];
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const VideoModels: React.FC<VideoModelsProps> = ({
  catalog,
  services,
  loading = false,
  error = null,
  onRetry,
}) => {
  const [activeTab, setActiveTab] = useState<VideoWorkflowTab>('all');
  const shouldReduceMotion = useReducedMotion() ?? false;

  const catalogSource = catalog ?? services;

  // Derive models based on active tab from live catalog
  const models = useMemo(() => {
    return getVideoDisplayModels(catalogSource, activeTab);
  }, [catalogSource, activeTab]);

  // Counts for each tab badge
  const counts = useMemo(() => {
    const allCount = countUniqueVideoModels(catalogSource);
    const videoServices = getVideoCatalogServices(catalogSource);
    const textSvc = videoServices.find(s => s.id === 'text_to_video');
    const imgSvc = videoServices.find(s => s.id === 'image_to_video');
    const refSvc = videoServices.find(s => s.id === 'reference_to_video');

    return {
      all: allCount,
      text: Array.isArray(textSvc?.models) ? textSvc.models.length : 0,
      image: Array.isArray(imgSvc?.models) ? imgSvc.models.length : 0,
      reference: Array.isArray(refSvc?.models) ? refSvc.models.length : 0,
    };
  }, [catalogSource]);

  const tabs: { key: VideoWorkflowTab; label: string; icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>; count: number; colorClass?: string }[] = [
    { key: 'all', label: 'همه مدل‌ها', icon: Film, count: counts.all },
    { key: 'text-to-video', label: 'متن به ویدیو (Text-to-Video)', icon: Type, count: counts.text, colorClass: 'text-luma-purple' },
    { key: 'image-to-video', label: 'تصویر به ویدیو (Image-to-Video)', icon: ImageIcon, count: counts.image, colorClass: 'text-luma-pink' },
    { key: 'reference-to-video', label: 'ویدیو از روی مرجع (Reference)', icon: Layers, count: counts.reference, colorClass: 'text-luma-yellow' },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== index) {
      setActiveTab(tabs[nextIndex].key);
      const tabEl = document.getElementById(`video-tab-${tabs[nextIndex].key}`);
      tabEl?.focus();
    }
  };

  return (
    <section className="py-24 bg-[#FBF9F6] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBF9F6] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/20 dark:bg-purple-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/15 dark:bg-rose-950/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-300" />
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-luma-purple/30 bg-luma-purple/10 backdrop-blur-md shadow-sm transition-colors duration-300"
          >
            <Film size={14} className="text-luma-purple" aria-hidden="true" />
            <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">
              Generation Engines
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            موتورهای <span className="text-gradient-animated">تولید ویدیو</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-650 dark:text-zinc-400 text-lg font-light leading-relaxed transition-colors duration-300"
          >
            دسترسی مستقیم به بیش از {counts.all > 0 ? formatPersianDigits(counts.all) : '۳۰'} موتور هوش مصنوعی جهان در سه جریان کاری تبدیل متن به ویدیو، تصویر به ویدیو و تولید از روی مراجع چندگانه.
          </motion.p>

          {/* Workflow Selector Accessible Tabs */}
          <div
            role="tablist"
            aria-label="فیلتر جریان کاری موتورهای تولید ویدیو"
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.key;
              const TabIcon = tab.icon;
              return (
                <button
                  type="button"
                  key={tab.key}
                  id={`video-tab-${tab.key}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`video-models-panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  onKeyDown={e => handleTabKeyDown(e, idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                      : 'bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-900 hover:dark:text-white'
                  }`}
                >
                  <TabIcon size={14} className={tab.colorClass} aria-hidden="true" />
                  <span>
                    {tab.label}
                    {tab.count > 0 && ` (${formatPersianDigits(tab.count)})`}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab Panel / Models Grid */}
        <div
          role="tabpanel"
          id={`video-models-panel-${activeTab}`}
          aria-labelledby={`video-tab-${activeTab}`}
        >
          {loading && models.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error && models.length === 0 ? (
            <div className="p-12 text-center rounded-[24px] bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900/40 shadow-sm max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                خطا در دریافت کاتالوگ مدل‌ها
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-light">
                {error.message || 'ارتباط با سرور کاتالوگ برقرار نشد. لطفاً مجدداً تلاش کنید.'}
              </p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:scale-105 transition-transform"
                >
                  <RotateCw size={14} aria-hidden="true" />
                  <span>تلاش مجدد</span>
                </button>
              )}
            </div>
          ) : models.length === 0 ? (
            <div className="p-12 text-center rounded-[24px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-md mx-auto">
              <Film size={28} className="text-zinc-400 mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                هیچ مدلی در این دسته یافت نشد
              </p>
            </div>
          ) : (
            <motion.div
              layout={!shouldReduceMotion}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {models.map((model, i) => (
                  <ModelCard
                    key={`${activeTab}-${model.id}`}
                    model={model}
                    index={i}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Pricing note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            تعرفه‌های نمایش‌داده‌شده حداقل شروع رندر به ازای مشخصات استاندارد بوده و هزینه نهایی بر اساس مدت زمان، وضوح و امکانات انتخابی محاسبه می‌گردد. جزئیات دقیق در <a href="/pricing" className="text-luma-purple underline underline-offset-4 hover:opacity-80">صفحه تعرفه‌ها</a> در دسترس است.
          </p>
        </div>
      </div>
    </section>
  );
};
