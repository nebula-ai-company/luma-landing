import React, { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video, Type, Image as ImageIcon, Layers, RefreshCw, AlertCircle, Info } from 'lucide-react';
import {
  CatalogService,
  MediaCatalogModel,
  formatPersianDigits,
  isMediaModel,
} from '../../lib/catalogApi';
import { CatalogMediaPricingBrowser } from './CatalogMediaPricingBrowser';
import { getThemeClasses } from './pricingConfig';

export interface CatalogVideoPricingSectionProps {
  /** Array of all catalog services from useCatalog() */
  services?: CatalogService[];
  /** Primary accent icon */
  icon?: React.ElementType;
  /** Tailwind text color class, e.g. "text-luma-purple" */
  color?: string;
  /** Loading state from useCatalog() */
  loading?: boolean;
  /** Error state from useCatalog() */
  error?: Error | null;
  /** Callback to trigger fresh network fetch */
  onRetry?: () => void;
}

type VideoModeId = 'text_to_video' | 'image_to_video' | 'reference_to_video';

interface VideoModeConfig {
  id: VideoModeId;
  label: string;
  compactLabel: string;
  description: string;
  icon: React.ElementType;
}

const VIDEO_MODES: VideoModeConfig[] = [
  {
    id: 'text_to_video',
    label: 'متن به ویدیو',
    compactLabel: 'متن به ویدیو',
    description: 'تولید ویدیو مستقیماً از توضیح متنی.',
    icon: Type,
  },
  {
    id: 'image_to_video',
    label: 'تصویر به ویدیو',
    compactLabel: 'تصویر به ویدیو',
    description: 'تبدیل یک تصویر شروع به ویدیوی متحرک.',
    icon: ImageIcon,
  },
  {
    id: 'reference_to_video',
    label: 'ویدیو با فایل مرجع',
    compactLabel: 'فایل مرجع',
    description: 'تولید ویدیو با استفاده از تصویر، ویدیو یا فایل‌های مرجع برای کنترل بهتر سوژه، سبک یا حرکت.',
    icon: Layers,
  },
];

export const CatalogVideoPricingSection: React.FC<CatalogVideoPricingSectionProps> = ({
  services = [],
  icon: Icon = Video,
  color = 'text-luma-purple',
  loading = false,
  error = null,
  onRetry,
}) => {
  const theme = getThemeClasses(color);
  const shouldReduceMotion = useReducedMotion();

  // Resolve the 3 video services from catalog
  const textToVideoService = useMemo(
    () => services.find(s => s.id === 'text_to_video'),
    [services]
  );
  const imageToVideoService = useMemo(
    () => services.find(s => s.id === 'image_to_video'),
    [services]
  );
  const referenceToVideoService = useMemo(
    () => services.find(s => s.id === 'reference_to_video'),
    [services]
  );

  const serviceMap = useMemo<Record<VideoModeId, CatalogService | undefined>>(() => {
    return {
      text_to_video: textToVideoService,
      image_to_video: imageToVideoService,
      reference_to_video: referenceToVideoService,
    };
  }, [textToVideoService, imageToVideoService, referenceToVideoService]);

  // Determine available modes (present in catalog and has models array)
  const availableModes = useMemo<VideoModeConfig[]>(() => {
    return VIDEO_MODES.filter(mode => {
      const s = serviceMap[mode.id];
      return Boolean(s && Array.isArray(s.models));
    });
  }, [serviceMap]);

  // Current active mode (default: text_to_video if available, else first available)
  const [activeModeId, setActiveModeId] = useState<VideoModeId>('text_to_video');

  // Maintain per-service selected model IDs so switching modes preserves selection
  const [selectedModelByMode, setSelectedModelByMode] = useState<Record<string, string>>({});

  // Maintain search term (reset on mode change as recommended)
  const [searchTerm, setSearchTerm] = useState('');

  // Sync activeModeId with available modes
  useEffect(() => {
    if (availableModes.length === 0) return;
    const isCurrentAvailable = availableModes.some(m => m.id === activeModeId);
    if (!isCurrentAvailable) {
      setActiveModeId(availableModes[0].id);
    }
  }, [availableModes, activeModeId]);

  // Handle mode switch: switch mode and reset search term to avoid confusion
  const handleModeChange = (newModeId: VideoModeId) => {
    if (newModeId === activeModeId) return;
    setActiveModeId(newModeId);
    setSearchTerm('');
  };

  const activeModeConfig = useMemo(() => {
    return VIDEO_MODES.find(m => m.id === activeModeId) || VIDEO_MODES[0];
  }, [activeModeId]);

  const activeService = serviceMap[activeModeId];

  // Extract media models for the currently active mode
  const activeMediaModels = useMemo<MediaCatalogModel[]>(() => {
    if (!activeService || !Array.isArray(activeService.models)) return [];
    return activeService.models.filter(isMediaModel);
  }, [activeService]);

  const totalVideoModelsAvailable = useMemo(() => {
    return (
      (textToVideoService?.models?.length || 0) +
      (imageToVideoService?.models?.length || 0) +
      (referenceToVideoService?.models?.length || 0)
    );
  }, [textToVideoService, imageToVideoService, referenceToVideoService]);

  const currentSelectedModelId = selectedModelByMode[activeModeId] || null;

  const handleSelectModel = (modelId: string) => {
    setSelectedModelByMode(prev => ({
      ...prev,
      [activeModeId]: modelId,
    }));
  };

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
              ساخت ویدیو
              {!loading && !error && activeMediaModels.length > 0 && (
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-md ${theme.bgSoft} border ${theme.borderSoft} ${theme.text} hidden sm:inline-block font-bold`}
                >
                  {formatPersianDigits(activeMediaModels.length)} مدل
                </span>
              )}
            </h2>
            <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl">
              خلق ویدیوهای سینمایی از متن، تصویر یا فایل‌های مرجع. هزینه بر اساس ثانیه، رزولوشن و کیفیت رندر محاسبه می‌شود.
            </p>
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
              دریافت تعرفه‌های به‌روز ویدیو با مشکل مواجه شد
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

        {/* State 2: Loading State */}
        {loading && (
          <div className="space-y-6">
            {/* Mode Selector Skeleton */}
            <div className="flex gap-2 max-w-md animate-pulse">
              <div className="h-11 flex-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
              <div className="h-11 flex-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
              <div className="h-11 flex-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl" />
            </div>

            {/* Browser Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 h-[560px] lg:h-[600px] flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] overflow-hidden p-6 animate-pulse">
                <div className="h-12 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl mb-6" />
                <div className="space-y-4 flex-1">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="h-14 bg-zinc-100/70 dark:bg-zinc-800/30 rounded-xl" />
                  ))}
                </div>
                <div className="h-8 bg-zinc-100/50 dark:bg-zinc-800/20 rounded-lg mt-4" />
              </div>
              <div className="lg:col-span-5 h-[480px] lg:h-[600px] flex flex-col bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] overflow-hidden p-6 animate-pulse">
                <div className="h-6 w-1/3 bg-zinc-100 dark:bg-zinc-800/60 rounded mb-4" />
                <div className="h-10 bg-zinc-100 dark:bg-zinc-800/40 rounded-xl mb-6" />
                <div className="h-24 bg-zinc-100/60 dark:bg-zinc-800/30 rounded-xl mb-6" />
                <div className="h-28 bg-zinc-100/40 dark:bg-zinc-800/20 rounded-xl mt-auto" />
              </div>
            </div>
          </div>
        )}

        {/* State 3: Empty State (all 3 video services missing or have 0 models) */}
        {!loading && !error && totalVideoModelsAvailable === 0 && (
          <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
              <Info size={28} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              مدلی برای ساخت ویدیو در کاتالوگ یافت نشد
            </h3>
            <p className="text-sm text-zinc-500 dark:text-gray-400 font-light max-w-md leading-relaxed">
              کاتالوگ مدل‌های لوما در حال حاضر مدلی برای این بخش ارائه نداده است.
            </p>
          </div>
        )}

        {/* State 4: Normal Operational Layout */}
        {!loading && !error && totalVideoModelsAvailable > 0 && (
          <div className="space-y-6">
            {/* Internal Mode Selector Tablist */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="روش‌های ساخت ویدیو"
                className="inline-flex p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 backdrop-blur-md self-start max-w-full overflow-x-auto custom-scrollbar"
              >
                {availableModes.map((mode, index) => {
                  const isActive = activeModeId === mode.id;
                  const ModeIcon = mode.icon;
                  const modeService = serviceMap[mode.id];
                  const modeModelCount = modeService?.models?.length || 0;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      id={`video-mode-tab-${mode.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${mode.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleModeChange(mode.id)}
                      onKeyDown={e => {
                        let nextIndex = index;
                        if (e.key === 'ArrowLeft') {
                          nextIndex = (index + 1) % availableModes.length;
                        } else if (e.key === 'ArrowRight') {
                          nextIndex = (index - 1 + availableModes.length) % availableModes.length;
                        } else if (e.key === 'Home') {
                          nextIndex = 0;
                        } else if (e.key === 'End') {
                          nextIndex = availableModes.length - 1;
                        } else {
                          return;
                        }
                        e.preventDefault();
                        const nextMode = availableModes[nextIndex];
                        handleModeChange(nextMode.id);
                        document.getElementById(`video-mode-tab-${nextMode.id}`)?.focus();
                      }}
                      className={`
                        relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap min-h-[44px] cursor-pointer select-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luma-purple
                        ${
                          isActive
                            ? 'text-zinc-950 dark:text-white'
                            : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-gray-200'
                        }
                      `}
                    >
                      {/* Active Indicator with smooth layout animation */}
                      {isActive && (
                        <motion.div
                          layoutId="activeVideoModeTab"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', bounce: 0.18, duration: 0.4 }
                          }
                          className="absolute inset-0 bg-white dark:bg-zinc-800/90 rounded-xl shadow-md border border-zinc-200/60 dark:border-white/10"
                          style={{ zIndex: 0 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        <ModeIcon
                          size={16}
                          className={isActive ? theme.text : 'text-zinc-400 dark:text-gray-500'}
                          aria-hidden="true"
                        />
                        <span className="hidden sm:inline">{mode.label}</span>
                        <span className="sm:hidden">{mode.compactLabel}</span>
                        {modeModelCount > 0 && (
                          <span
                            className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                              isActive
                                ? 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'
                                : 'bg-transparent text-zinc-400 dark:text-gray-500'
                            }`}
                          >
                            {formatPersianDigits(modeModelCount)}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mode Sub-Description */}
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-gray-400 font-light max-w-xl">
                {activeModeConfig.description}
              </p>
            </div>

            {/* Active Mode Tab Panel */}
            <div
              role="tabpanel"
              id={`panel-${activeModeId}`}
              aria-labelledby={`video-mode-tab-${activeModeId}`}
              className="focus-visible:outline-none"
            >
              {activeMediaModels.length > 0 ? (
                <CatalogMediaPricingBrowser
                  key={activeModeId}
                  models={activeMediaModels}
                  color={color}
                  title={`ساخت ویدیو (${activeModeConfig.label})`}
                  selectedModelId={currentSelectedModelId}
                  onSelectModelId={handleSelectModel}
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  emptyMessage={`مدلی در بخش «${activeModeConfig.label}» با این مشخصات یافت نشد.`}
                />
              ) : (
                <div className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-[28px] p-8 md:p-12 shadow-xl text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-4">
                    <Info size={28} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    مدلی در این بخش یافت نشد
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-gray-400 font-light max-w-md leading-relaxed">
                    مدل‌های بخش «{activeModeConfig.label}» در حال حاضر در دسترس نیستند. می‌توانید سایر حالت‌های ساخت ویدیو را انتخاب کنید.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
